import { Entity, EntityUtils } from '@/core/domain'

export interface Doc extends Entity {
  name: string,
  path: string,
}

export interface DocWithChildren extends Doc {
  children: Array<DocWithChildren>;
}

function buildHierarchy(docs: Array<Doc>) {
  const docsWithChildren: Array<DocWithChildren> = [];

  docs.forEach((doc) => {

    const parentSlugs = doc.path.split('/');
    let currentNode = docsWithChildren;

    parentSlugs.slice(0, parentSlugs.length - 1).forEach((parentSlug, index, parentSlugs) => {
      let existingNode = currentNode.find(node => node.path === parentSlugs.slice(0, index + 1).join('/'));
      if (!existingNode) {
        const newNode = {
          ...DocUtils.create({
            path: parentSlugs.slice(0, index + 1).join('/'),
          }),
          children: [],
        }
        currentNode.push(newNode);
        existingNode = newNode;
      }

      currentNode = existingNode.children;
    });
    const existingNode = currentNode.find(node => node.path === doc.path);
    if (existingNode) {
      existingNode.name = doc.name;
      existingNode.path = doc.path;
    } else {
      currentNode.push({
        children: [],
        ...DocUtils.create({
          name: doc.name,
          path: doc.path,
        })
      });
    }
  });

  return docsWithChildren;
}
interface DocEntityUtils extends EntityUtils<Doc> {
  buildHierarchy: (docs: Doc[]) => DocWithChildren[]
  isDocWithChildren: (entity: any) => entity is DocWithChildren
}

export const DocUtils: DocEntityUtils = {
  getId: (doc: Doc): string => {
    return doc.path
  },
  create: (doc: Partial<Doc>): Doc => {
    return {
      _type: 'Doc',
      name: '',
      path: '',
      ...doc,
    }
  },
  buildHierarchy,
  is: (entity: any): entity is Doc => {
    return entity._type === 'Doc'
  },
  isDocWithChildren: (entity: any): entity is DocWithChildren => {
    return entity._type === 'Doc' && Array.isArray(entity.children) && entity.children.length > 0
  }
}