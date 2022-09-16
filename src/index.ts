import { buildAssetMap, generate } from './generators';
import * as Generators from './generators';
import { AssetMap } from './generators/IGenerator';

(async function TW() {
  const RunKey = String(Date.now());

  try {
    // Install our fonts
    // TODO: We should instead find whatever the default font is for the file. I believe it's only
    //       Inter here because I'm testing this in an existing document where Inter was previously
    //       used.
    await Promise.all([
      figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    ]);

    // Run the generation. This builds the asset map and then runs all the generators.
    await generate(RunKey);
  } catch (e) {
    console.error('[TW] Run Failed', e);

    const rethrow: any = new Error('[TW] Run failed');
    rethrow.RunKey = RunKey;
    rethrow.cause = e;

    throw e;
  } finally {
    figma.closePlugin();
  }
})();
