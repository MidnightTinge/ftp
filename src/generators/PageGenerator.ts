import { Generator } from './Generator';
import { StyleMap } from './StyleGenerator';

export type AssetMap = {
  colors: StyleMap<PaintStyle>,
  effects: StyleMap<EffectStyle>,
}

export abstract class PageGenerator extends Generator<PageNode> {
  abstract generate(runkey: string, assets: AssetMap): PageNode
}
