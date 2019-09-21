import { PostHTML } from 'posthtml';
import { selfClosingTags } from './constants';
import { emptyNodeContent } from './utils/emptyNodeContent';

class HtmlLinter {
  private tree!: PostHTML.Node;
  private options!: IOptions;
  private errors: any = {}; // TODO: define errors interface

  constructor(props: IHtmlLinterProps) {
    this.options = props.options;
  }

  public lint = (tree: PostHTML.Node) => {
    this.tree = tree;

    Object.keys(this.options).forEach(option => {
      if (this.options[option as Options]) {
        this[option as Options].call(this);
      }
    });

    this.printError();

    return this.tree;
  };

  protected noDuplicateIds() {
    const ids: IIds = {};
    const idsMap: IIdsNodeMap = {};

    this.tree.match({ attrs: { id: new RegExp(/\S+/) } }, node => {
      const { id } = (node as INodeMatchId).attrs;

      if (Object(ids).hasOwnProperty(id)) {
        ids[id] += 1;
        idsMap[id] = [...idsMap[id], node];
      } else {
        ids[id] = 1;
        idsMap[id] = [node];
      }

      return node;
    });

    this.errors.duplicateIds = {
      ids,
      idsMap
    };
  }

  protected noDuplicateTags() {
    const tags: ITags = {
      html: 0,
      head: 0,
      title: 0,
      body: 0
    };

    this.tree.match({ tag: new RegExp(/^(html|head|title|body)/g) }, node => {
      const { tag } = node as INodeMatchDuplicate;
      tags[tag] += 1;

      return node;
    });

    this.errors.duplicateTags = tags;
  }

  protected noEmptyTags() {
    const emptyMap: IEmptyMap = {};

    this.tree.match({ tag: new RegExp(/\S+/) }, node => {
      const { tag, content } = node;

      const notSelfClosing = !selfClosingTags.includes(tag);

      const isEmpty =
        content === undefined ||
        (content && emptyNodeContent(content as PostHTML.ContentMatcher[]));

      if (notSelfClosing && isEmpty) {
        if (Object(emptyMap).hasOwnProperty(tag)) {
          emptyMap[tag] = [
            ...emptyMap[tag],
            {
              node
            }
          ] as any;
        } else {
          emptyMap[tag] = [
            {
              node
            }
          ] as any;
        }
      }

      return node;
    });

    this.errors.emptyTags = emptyMap;
  }

  protected noMissingAttributes() {
    const attrsMap: IAttrsNodeMap = {
      a: [],
      img: [],
      input: []
    };

    this.tree.match({ tag: new RegExp(/^(a|img|input)/g) }, node => {
      const { tag, attrs } = node as INodeMatchAttrs;
      const required = requiredAttributesMap[tag as Tags];

      const missing = required.filter(
        key => !Object(attrs).hasOwnProperty(key)
      );

      if (missing.length > 0) {
        attrsMap[tag] = [
          ...attrsMap[tag],
          {
            node,
            missing
          }
        ];
      }

      return node;
    });

    this.errors.missingAttributes = attrsMap;
  }

  protected printError() {
    process.stdout.write(`${JSON.stringify(this.errors, null, 2)}\n`);
  }
}

interface IHtmlLinterProps {
  options: IOptions;
}

export const defaultOptions = {
  noDuplicateIds: true,
  noDuplicateTags: true,
  noEmptyTags: true,
  noMissingAttributes: true
};

type Tags = 'a' | 'img' | 'input';

type NodeAttributeKey = 'href' | 'src' | 'alt' | 'type';

type RequiredAttributes = { [K in Tags]: NodeAttributeKey[] };

const requiredAttributesMap: RequiredAttributes = {
  a: ['href'],
  img: ['src', 'alt'],
  input: ['type']
};

type IAttrsNodeMap = {
  [K in Tags]: Array<{
    node: PostHTML.Node;
    missing: NodeAttributeKey[];
  }>;
};

interface IEmptyMap {
  // TODO: define tag type
  [tag: string]: Array<{
    node: PostHTML.Node[];
  }>;
}

type OptionToggle = boolean;
// TODO: add option toggle with whitelist of values

type Options =
  | 'noDuplicateIds'
  | 'noDuplicateTags'
  | 'noEmptyTags'
  | 'noMissingAttributes';

export type IOptions = {
  [K in Options]: OptionToggle;
};

interface INodeMatchAttrs {
  tag: Tags;
  attrs: {
    href?: string;
    src?: string;
    alt?: string;
    type?: string;
  };
}

interface INodeTag extends PostHTML.Node {
  tag: string;
}

interface IIds {
  [id: string]: number;
}

interface IIdsNodeMap {
  [id: string]: PostHTML.Node[];
}

interface INodeMatchId extends PostHTML.Node {
  attrs: {
    id: string;
  };
}

interface ITags {
  html: number;
  head: number;
  title: number;
  body: number;
}

type ExclusiveTag = 'html' | 'head' | 'title' | 'body';

interface INodeMatchDuplicate extends PostHTML.Node {
  tag: ExclusiveTag;
}

export default HtmlLinter;
