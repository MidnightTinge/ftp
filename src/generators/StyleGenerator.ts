import { Generator } from './Generator';

export type StyleMap<STYLE extends BaseStyle> = Record<string, STYLE>

/**
 * A generator that creates and returns usable Figma styles matching tailwind styles. This is used
 * for things like {@link SColors colors} and {@link SShadows shadows}.
 */
export default abstract class StyleGenerator<U extends BaseStyle> extends Generator<StyleMap<U>> {}
