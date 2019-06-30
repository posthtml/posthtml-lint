import { NodeContentItem } from 'posthtml';

function emptyNodeContent(content: NodeContentItem[]) {
  return !content
    .filter((item: NodeContentItem) => typeof item === 'string')
    .filter(item => (item as string).trim().length);
}

export { emptyNodeContent };
