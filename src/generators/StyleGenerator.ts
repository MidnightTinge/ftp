import { Generator } from './Generator';

export type StyleMap<STYLE extends BaseStyle> = Record<string, STYLE>

export default abstract class StyleGenerator<U extends BaseStyle> extends Generator<StyleMap<U>> {}
