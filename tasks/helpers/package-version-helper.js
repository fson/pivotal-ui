import {map} from 'event-stream';
import promisify from 'es6-promisify';
import path from 'path';
import through from 'through2';

const exec = promisify(require('child_process').exec);
const read = promisify(require('vinyl-file').read);

function packageNameOf(component) {
  if (component.match(/src\/pivotal-ui\/components\//)) {
    return `pui-css-${path.basename(component)}`;
  }
  else if (component.match(/src\/pivotal-ui-react\//)) {
    return `pui-react-${path.basename(component)}`;
  }
  else {
    console.error(`Unknown component ${component}`);
    throw new Error(`Unknown component ${component}`);
  }
}

async function componentsDependentOn(component) {
  const command = `git grep --files-with-matches ${packageNameOf(component)} src/pivotal-ui-react/*/package.json src/pivotal-ui/components/*/package.json`;
  try {
    return (await exec(command)).trim().split('\n')
      .map((filename) => path.dirname(filename) + path.sep);
  }
  catch(error) {
    if (error.code === 1) { // git grep returns no results
      return [];
    }
    throw error;
  }
}

export function componentsToUpdate() {
  const componentsToLookThrough = [];
  const componentsToUpdate = {};

  return through.obj(
    function(componentWithChanges, encoding, callback) {
      componentsToLookThrough.push(componentWithChanges.toString());
      componentsToUpdate[componentWithChanges] = [];
      callback();
    },

    async function(callback) {
      try {
        let component;
        while (Boolean(component = componentsToLookThrough.shift())) {
          for (const dependentComponent of (await componentsDependentOn(component))) {
            if (!componentsToUpdate[dependentComponent]) {
              componentsToLookThrough.push(dependentComponent);
              componentsToUpdate[dependentComponent] = [];
            }
            componentsToUpdate[dependentComponent].push(packageNameOf(component));
          }
        }

        for (component of Object.keys(componentsToUpdate)) {
          this.push({
            component: component,
            dependencies: componentsToUpdate[component]
          });
        }
        callback();
      }
      catch(error) {
        callback(error);
      }
    }
  )
}

export function updatePackageJsons(version) {
  return map(async ({component, dependencies}, callback) => {
    try {
      const packageJsonPath = path.join(component, 'package.json');
      const packageJsonFile = await read(packageJsonPath);
      const packageJsonContents = JSON.parse(packageJsonFile.contents.toString());

      packageJsonContents.version = version;
      for (let dependency of dependencies) {
        packageJsonContents.dependencies[dependency] = version;
      }

      packageJsonFile.contents = new Buffer(JSON.stringify(packageJsonContents, null, 2));
      callback(null, packageJsonFile);
    } catch(error) {
      callback(error);
    }
  });
}
