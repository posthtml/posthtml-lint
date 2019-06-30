declare module 'posthtml' {
  export interface INode {
    tag?: string;
    attrs?: {
      id?: string;
      class?: string;
      target?: string;
      href?: string;
      rel?: string;
    };
    content?: Array<NodeContentItem>;
  }

  export type Match = string | RegExp;

  export type NodeContentItem = INode | string;

  export interface IMatcher {
    tag?: Match;
    attrs?: {
      id?: Match;
      class?: Match;
      target?: Match;
      href?: Match;
      rel?: Match;
    };
    content?: IMatcher[];
  }

  export interface ITree {
    match: (
      matcher: IMatcher | IMatcher[],
      node: (node: INode) => INode
    ) => void;
    walk: (node: (node: INode) => INode) => void;
  }

  export default function(): any;
}
