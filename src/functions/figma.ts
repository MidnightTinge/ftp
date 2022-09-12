/**
 * Add one or more nodes to another, returning the parent node.
 *
 * @param parent The node that gets {@link children} appended to its node tree.
 * @param children The children nodes to add to {@code parent}
 */
export function add<T extends ChildrenMixin>(parent: T, ...children: SceneNode[]): T {
  children.forEach(x => parent.appendChild(x));

  return parent;
}
