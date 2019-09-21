import { PostHTML } from 'posthtml';
import HtmlLinter, { defaultOptions, IOptions } from './HtmlLinter';

function lint(options: IOptions = defaultOptions) {
  return function plugin(tree: PostHTML.Node) {
    return new HtmlLinter({ options }).lint(tree);
  };
}

export { lint };
