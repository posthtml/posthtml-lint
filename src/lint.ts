import { ITree } from 'posthtml';
import HtmlLinter, { defaultOptions, IOptions } from './HtmlLinter';

function lint(options: IOptions = defaultOptions) {
  return function plugin(tree: ITree) {
    return new HtmlLinter({ options }).lint(tree);
  };
}

export { lint };
