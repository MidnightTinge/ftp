export type StyleMap<STYLE extends BaseStyle> = Record<string, STYLE>

export type ProgressReport = {
  module: string,
  stage: string,
  substage?: string,

  current: number,
  total: number,
}

export type ProgressObserver = (report: ProgressReport) => void;

export type AssetMap = {
  colors: StyleMap<PaintStyle>,
  effects: StyleMap<EffectStyle>,
  gradients: StyleMap<PaintStyle>,
  typography: StyleMap<TextStyle>,
}

export default interface IGenerator<U = undefined> {
  generate(RunKey: string, assets: AssetMap, onProgress: ProgressObserver): Promise<U>;
}
