export type StyleMap<STYLE extends BaseStyle> = Record<string, STYLE>

export type AssetMap = {
  colors: StyleMap<PaintStyle>,
  effects: StyleMap<EffectStyle>,
  gradients: StyleMap<PaintStyle>,
}

export default interface IGenerator<U = undefined> {
  generate(runkey: string, assets: AssetMap): U;
}
