/*
  These are uncategorized for now.
  TODO: Cleanup before v1
 */



export function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.substring(1);
}

export function capStrict(s: string): string {
  return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
}

export function title(s: string): string {
  return s.split(' ').map(capStrict).join(' ');
}

export function add<T extends ChildrenMixin>(node: T, ...nodes: SceneNode[]): T {
  nodes.forEach(x => node.appendChild(x));

  return node;
}
