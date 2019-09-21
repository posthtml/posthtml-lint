import { PostHTML } from 'posthtml';

function emptyNodeContent(content: PostHTML.ContentMatcher[]) {
  if (content.length === 0) {
    return true;
  }

  return !!content
    .filter(item => typeof item === 'string')
    .filter(item => !(item as string).trim().replace(/\n/g, '').length).length;
}

export { emptyNodeContent };
