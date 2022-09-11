import { AssetMap, PageGenerator } from '../../PageGenerator';

export default class BoxShadow extends PageGenerator {
  constructor() {
    super('pages.boxShadow');
  }

  generate(runkey: string, assets: AssetMap): PageNode {
    const page = figma.createPage();
    page.name = `TW/${runkey}/BoxShadow`;

    // TW.theme.boxShadow.

    return page;
  }
}
