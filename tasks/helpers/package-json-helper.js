import {map} from 'event-stream';
import path from 'path';
import File from 'vinyl';

export default function(packageTemplate) {
  return () => {
    return map(async (packageJsonOverridesFile, callback) => {
      try {
        const name = path.basename(path.dirname(packageJsonOverridesFile.path));
        const finalContents = packageTemplate(name, JSON.parse(packageJsonOverridesFile.contents.toString()));
        callback(null, new File({
          contents: new Buffer(finalContents),
          path: path.join(name, 'package.json')
        }));
      }
      catch(e) {
        if (e instanceof SyntaxError) {
          console.error('SyntaxError in one of your package.json files. Godspeed.');
        } else {
          console.error(e);
        }
        callback(e);
      }
    });
  };
}
