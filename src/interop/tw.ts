type TWCOLORKEY = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type TWCOLOR = string | Record<TWCOLORKEY, string>

import _config from '../generated/tw.cfg.json';

// we destructure these to remove them from the final object
const { transparent, current, inherit, ...colors } = _config.theme.colors;
const { none, ...boxShadow } = _config.theme.boxShadow;

export const COLORS: Record<string, TWCOLOR> = colors;
export const BOX_SHADOW: Record<string, string> = boxShadow;
