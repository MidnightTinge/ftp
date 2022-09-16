import { AssetMap, ProgressObserver } from './IGenerator';

import PBoxShadow from './impl/pages/BoxShadow';
import PColors from './impl/pages/Colors';

import SColors from './impl/styles/Colors';
import SShadows from './impl/styles/Shadows';
import STypography from './impl/styles/Typography';

function noop() {
  // stub
}

export async function buildAssetMap(RunKey: string, observer: ProgressObserver): Promise<AssetMap> {
  observer = observer ?? noop;

  const map: AssetMap = {} as any; // as any since we're building this piecemeal

  map.colors = await SColors.generate(RunKey, map, observer);
  map.effects = await SShadows.generate(RunKey, map, observer);
  map.typography = await STypography.generate(RunKey, map, observer);

  return map;
}

export async function generate(RunKey: string, observer?: ProgressObserver) {
  observer = observer ?? noop;

  const assetMap = await buildAssetMap(RunKey, observer);

  await PColors.generate(RunKey, assetMap, observer);
  await PBoxShadow.generate(RunKey, assetMap, observer);
}

export {
  PBoxShadow,
  PColors,

  SColors,
  SShadows,
};
