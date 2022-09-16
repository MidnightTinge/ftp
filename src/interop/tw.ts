type TWCOLORKEY = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type TWCOLOR = string | Record<TWCOLORKEY, string>

import _config from '../generated/tw.cfg.json';

// we destructure these to remove them from the final object
const { transparent, current, inherit, ...colors } = _config.theme.colors;
const { none, ...boxShadow } = _config.theme.boxShadow;

const fontSizes =
  Object.entries(_config.theme.fontSize as unknown as Record<string, [string, { lineHeight: string }]>)
    .reduce((holder, [key, [fontSize, { lineHeight }]]) => {
      holder[key] = { fontSize, lineHeight };
      return holder;
    }, {});
const fontWeights = _config.theme.fontWeight;

export const COLORS: Record<string, TWCOLOR> = colors;
export const BOX_SHADOW: Record<string, string> = boxShadow;
export const FONT_SIZES: Record<string, { fontSize: string, lineHeight: string }> = fontSizes;
export const FONT_WEIGHTS = fontWeights;
