import { NodeContentItem } from 'posthtml';

function emptyNodeContent(content: NodeContentItem[]) {
  if (content.length === 0) {
    return true;
  }

  return !!content
    .filter((item: NodeContentItem) => typeof item === 'string')
    .filter(item => !(item as string).trim().replace(/\n/g, '').length).length;
}

export { emptyNodeContent };
