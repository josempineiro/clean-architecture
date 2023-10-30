import { Doc, DocUtils, DocWithChildren } from '@/docs/domain/entities/doc';

describe('DocUtils', () => {
  it('should create a Doc entity', () => {
    const doc: Doc = DocUtils.create({ name: 'Sample Doc', path: '/sample-doc' });
    expect(doc._type).toBe('Doc');
    expect(doc.name).toBe('Sample Doc');
    expect(doc.path).toBe('/sample-doc');
  });

  it('should check if an entity is a Doc', () => {
    const doc: Doc = DocUtils.create({ name: 'Sample Doc', path: '/sample-doc' });
    const isDoc = DocUtils.is(doc);
    expect(isDoc).toBe(true);
  });

  it('should build hierarchy for given docs', () => {
    const docs: Doc[] = [
      { _type: 'Doc', name: 'Child Doc', path: 'parent-doc/child-doc' },
      { _type: 'Doc', name: 'Grand Child Doc', path: 'parent-doc/child-doc/grand-child-doc' },
      { _type: 'Doc', name: 'Parent Doc', path: 'parent-doc' },
    ];

    const hierarchy: DocWithChildren[] = DocUtils.buildHierarchy(docs);

    // Validate the hierarchy structure here based on the input docs.
    // For example:

    expect(hierarchy.length).toBe(1);
    expect(hierarchy[0].children.length).toBe(1);
    expect(hierarchy[0].children[0].children.length).toBe(1);   
     expect(hierarchy).toStrictEqual([{
      _type: 'Doc',
      name: 'Parent Doc',
      path: 'parent-doc',
      children: [{
        _type: 'Doc',
        name: 'Child Doc',
        path: 'parent-doc/child-doc',
        children: [{
          _type: 'Doc',
          name: 'Grand Child Doc',
          path: 'parent-doc/child-doc/grand-child-doc',
          children: [],
        }],
      }],
    }]);
  });
});
