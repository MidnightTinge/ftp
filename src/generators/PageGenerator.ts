import { Generator } from './Generator';
import { StyleMap } from './StyleGenerator';

export type AssetMap = {
  colors: StyleMap<PaintStyle>,
  effects: StyleMap<EffectStyle>,
}

/**
 * A generator that is meant to create new figma pages. These are typically used for previews, and
 * are always generated after the entire {@link StyleGenerator style generators} bloc finish.
 */
export abstract class PageGenerator extends Generator<PageNode> {
  abstract generate(runkey: string, assets: AssetMap): PageNode
}
