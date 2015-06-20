import {readArray, writeArray} from 'event-stream';
import path from 'path';
import {componentsToUpdate, updatePackageJsons} from '../../tasks/helpers/package-version-helper';

describe('componentsToUpdate', function() {
  let result;

  function getComponentsToUpdate(componentsWithChanges, callback) {
    const componentsToUpdateStream = readArray(componentsWithChanges)
      .pipe(componentsToUpdate());

    componentsToUpdateStream.on('error', (error) => {
      console.error(error);
      callback(error);
    });

    componentsToUpdateStream.pipe(writeArray((err, data) => {
      result = data;
      callback();
    }));
  }

  describe('input: a component with no dependents', () => {
    beforeEach(done => {
      getComponentsToUpdate([
        'src/pivotal-ui-react/alerts/'
      ], done);
    });

    it('outputs itself only', () => {
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/alerts/',
        dependencies: []
      }));
      expect(result.length).toEqual(1);
    });
  });

  describe('input: a component with only react dependents', () => {
    beforeEach(done => {
      getComponentsToUpdate([
        'src/pivotal-ui-react/media/'
      ], done);
    });

    it('outputs itself and all dependents', () => {
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/media/',
        dependencies: []
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/alerts/',
        dependencies: ['pui-react-media']
      }));
      expect(result.length).toEqual(2);
    });
  });

  describe('input: 2 or more components that have a common dependent', () => {
    beforeEach(done => {
      getComponentsToUpdate([
        'src/pivotal-ui-react/dropdowns/',
        'src/pivotal-ui-react/iconography/'
      ], done);
    });

    it('outputs itself and all dependents, no duplicates', () => {
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/dropdowns/',
        dependencies: []
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/iconography/',
        dependencies: []
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/notifications/',
        dependencies: ['pui-react-dropdowns', 'pui-react-iconography']
      }));
      expect(result.length).toEqual(3);
    });
  });

  describe('input: a component with css and react dependents', () => {
    beforeEach(done => {
      getComponentsToUpdate([
        'src/pivotal-ui/components/links/'
      ], done);
    });

    it('outputs itself and all dependents, and dependents of dependents', () => {
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui/components/links/',
        dependencies: []
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui/components/back-to-top/',
        dependencies: ['pui-css-links']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/back-to-top/',
        dependencies: ['pui-css-back-to-top']
      }));
      expect(result.length).toEqual(3);
    });
  });

  describe('input: kitchen sink', () => {
    beforeEach(done => {
      getComponentsToUpdate([
        'src/pivotal-ui-react/alerts/',
        'src/pivotal-ui-react/back-to-top/',
        'src/pivotal-ui-react/grids/',
        'src/pivotal-ui-react/notifications/',
        'src/pivotal-ui-react/radio-group/',
        'src/pivotal-ui-react/ribbons/',
        'src/pivotal-ui-react/search-input/',
        'src/pivotal-ui/components/colors/',
        'src/pivotal-ui/components/dropdowns/',
        'src/pivotal-ui/components/iconography/',
      ], done);
    });

    it('outputs itself and all dependents, and dependents of dependents', () => {
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui/components/colors/',
        dependencies: []
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui/components/dropdowns/',
        dependencies: []
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/grids/',
        dependencies: []
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/radio-group/',
        dependencies: []
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/ribbons/',
        dependencies: []
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui/components/iconography/',
        dependencies: []
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui/components/back-to-top/',
        dependencies: ['pui-css-iconography']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui/components/code/',
        dependencies: ['pui-css-iconography']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui/components/lists/',
        dependencies: ['pui-css-iconography']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui/components/spinners/',
        dependencies: ['pui-css-iconography']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/alerts/',
        dependencies: ['pui-css-iconography']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/collapse/',
        dependencies: ['pui-css-iconography']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/dropdowns/',
        dependencies: ['pui-css-dropdowns', 'pui-css-iconography']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/iconography/',
        dependencies: ['pui-css-iconography']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/search-input/',
        dependencies: ['pui-css-iconography']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/sortable-table/',
        dependencies: ['pui-css-iconography']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/back-to-top/',
        dependencies: ['pui-css-back-to-top']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/draggable-list/',
        dependencies: ['pui-css-lists']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/lists/',
        dependencies: ['pui-css-lists']
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/notifications/',
        dependencies: ['pui-react-dropdowns', 'pui-react-iconography']
      }));
      expect(result.length).toEqual(20);
    });
  });
});

describe('updatePackageJsons', () => {
  let result;
  const version = '1.10.10';

  beforeEach(done => {
    const updatePackageJsonsStream = readArray(['src/pivotal-ui/components/back-to-top/'])
      .pipe(componentsToUpdate())
      .pipe(updatePackageJsons(version));

    updatePackageJsonsStream.on('error', (error) => {
      console.error(error);
      callback(error);
    });

    updatePackageJsonsStream.pipe(writeArray((err, data) => {
      result = {};
      for (let file of data) {
        const key = path.relative(process.cwd(), file.path);
        result[key] = JSON.parse(file.contents.toString());
      }
      done();
    }));
  });

  it("updates each package marked to update", () => {
    expect(Object.keys(result).length).toEqual(2);
    expect(Object.keys(result)).toEqual(jasmine.arrayContaining([
      'src/pivotal-ui-react/back-to-top/package.json',
      'src/pivotal-ui/components/back-to-top/package.json'
    ]));
  });

  it("updates each packages' version and the versions of its relevent dependencies", () => {
    expect(result['src/pivotal-ui-react/back-to-top/package.json'].version).toEqual(version);

    expect(result['src/pivotal-ui-react/back-to-top/package.json'].version).toEqual(version);
    expect(result['src/pivotal-ui-react/back-to-top/package.json'].dependencies['pui-css-back-to-top']).toEqual(version);
  });
});
