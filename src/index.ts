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

    // Build our AssetMap
    const am: AssetMap = {} as any; // as any since we're buiding this piecemeal.

    am.colors = Generators.SColors.generate(RunKey, am);
    am.effects = Generators.SShadows.generate(RunKey, am);

    // Run all the generators
    Generators.PColors.generate(RunKey, am);
    Generators.PBoxShadow.generate(RunKey, am);
  } catch (e) {
    const rethrow: any = new Error('[TW] Run failed');
    rethrow.runKey = RunKey;
    rethrow.cause = e;

    console.error(rethrow);

    throw e;
  } finally {
    figma.closePlugin();
  }
})();
