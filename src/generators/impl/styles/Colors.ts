import { cap } from '../../../functions/strings';
import { hexToRgb } from '../../../interop/figma';
import { COLORS } from '../../../interop/tw';
import StyleGenerator, { StyleMap } from '../../StyleGenerator';

/**
 * Generates figma colors for all the tailwind colors and makes them usable locally in the document.
 *
 * @see PColors
 */
export default class Colors extends StyleGenerator<PaintStyle> {
  constructor() {
    super('styles.colors');
  }

  generate(runkey: string): StyleMap<PaintStyle> {
    const STYLES: StyleMap<PaintStyle> = {};

    for (const [k, v] of Object.entries(COLORS)) {
      const H = cap(k);
      if (typeof v === 'string') { // e.g. { "black": "#000" }
        const ps = figma.createPaintStyle();
        ps.name = `TW/${runkey}/${H}`;
        ps.paints = [{
          type: 'SOLID',
          blendMode: 'NORMAL',
          visible: v !== 'transparent',
          color: (
            v === 'transparent'
              ? { r: 0, g: 0, b: 0 }
              : v.startsWith('#')
                ? hexToRgb(v)
                : { r: 0, g: 0, b: 0 }
          ),
        }];
        STYLES[k] = ps;
      } else {
        // Our current key (`k`) would be something like "red"
        for (const [cK, cV] of Object.entries(v)) {
          const T = cap(cK);
          // Our child key (`cK`) would be something like "300"
          const ps = figma.createPaintStyle();
          ps.name = `TW/${runkey}/${H}/${T}`;
          ps.paints = [{
            type: 'SOLID',
            blendMode: 'NORMAL',
            color: hexToRgb(cV),
          }];

          // STYLES['red.300'] = ps
          STYLES[`${k}.${cK}`] = ps;
        }
      }
    }

    return STYLES;
  }
}
