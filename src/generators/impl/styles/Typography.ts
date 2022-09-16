import { cap } from '../../../functions/strings';
import { fromCss } from '../../../interop/figma';
import { FONT_SIZES, FONT_WEIGHTS } from '../../../interop/tw';
import IGenerator, { AssetMap, StyleMap } from '../../IGenerator';

const WEIGHT_MAP: Record<keyof typeof FONT_WEIGHTS, string> = {
  thin: 'Thin',
  extralight: 'Extra Light',
  light: 'Light',
  normal: 'Regular',
  medium: 'Medium',
  semibold: 'Semi Bold',
  bold: 'Bold',
  extrabold: 'Extra Bold',
  black: 'Black',
};

export default <IGenerator<StyleMap<TextStyle>>>{
  async generate(RunKey, assets, onProgress): Promise<StyleMap<TextStyle>> {
    onProgress({
      module: 'styles.typography',
      stage: 'init',

      current: 0,
      total: 1,
    });

    const weights = Object.keys(FONT_WEIGHTS);
    const sizes = Object.entries(FONT_SIZES);

    for (const weight of weights) {
      const figmaWeight = WEIGHT_MAP[weight];
      if (!figmaWeight) {
        console.warn('[TW] No corresponding figma weight registered for tailwind weight "%s".', weight);
        continue;
      }

      // We wrap the size for() in a try/catch to avoid a situation where a certain font weight
      // combination is invalid and we try to load it 16 times. We'll just bail out of the entire
      // weight if needed and try the rest.
      // This is more of a problem for when we add an option to customize the font-family.
      try {
        for (const [key, size] of sizes) {
          const lh = fromCss(size.lineHeight, true);

          await figma.loadFontAsync({
            family: 'Inter',
            style: figmaWeight,
          });
          await figma.loadFontAsync({
            family: 'Inter',
            style: figmaWeight === 'Regular' ? 'Italic' : `${figmaWeight} Italic`,
          });

          const ts = figma.createTextStyle();
          ts.name = `TW/${RunKey}/${cap(weight)}/${key}`;
          ts.fontName = {
            family: 'Inter',
            style: figmaWeight,
          };
          ts.description = `text-${key} font-${weight}`;
          ts.fontSize = fromCss(size.fontSize, false);
          ts.lineHeight = {
            unit: lh.unit === 'px' ? 'PIXELS' : 'PERCENT',
            value: lh.value,
          };

          const tsItal = figma.createTextStyle();
          tsItal.name = `TW/${RunKey}/${cap(weight)}-italic/${key}`;
          tsItal.fontName = {
            family: 'Inter',
            style: figmaWeight === 'Regular' ? 'Italic' : `${figmaWeight} Italic`,
          };
          tsItal.description = `text-${key} font-${weight} font-italic`;
          tsItal.fontSize = fromCss(size.fontSize, false);
          tsItal.lineHeight = {
            unit: lh.unit === 'px' ? 'PIXELS' : 'PERCENT',
            value: lh.value,
          };
        }
      } catch (e) {
        console.error('[TW] Failed to load a font. Skipping weight.', e);
      }
    }

    return null;
  },
};
