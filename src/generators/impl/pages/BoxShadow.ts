import { add } from '../../../functions/figma';
import { LayoutFrame, Text } from '../../../interop/figma';
import IGenerator, { AssetMap } from '../../IGenerator';

export default <IGenerator<PageNode>>{
  async generate(RunKey: string, assets: AssetMap): Promise<PageNode> {
    const page = figma.createPage();
    page.name = `TW/${RunKey}/BoxShadow`;

    const wrapper = LayoutFrame({
      containerPadding: { horizontal: 32, vertical: 32 },
      itemSpacing: 32,
      direction: 'column',
      width: 'wrap',
      height: 'wrap',
      horizPlacement: 'center',
      vertPlacement: 'min',
    });
    wrapper.fillStyleId = assets.colors['slate.100'].id;

    let _inner;
    for (const [k, v] of Object.entries(assets.effects)) {
      const frame = LayoutFrame({
        containerPadding: 0,
        width: 256,
        height: 128,
        horizPlacement: 'center',
        vertPlacement: 'center',
        itemSpacing: 0,
        direction: 'column',
        cornerRadius: 8,
      });
      frame.effectStyleId = v.id;
      frame.fillStyleId = assets.colors['slate.100'].id;
      frame.name = `shadow/${k}`;

      add(frame, Text(`shadow-${k}`, 16));

      if (k === 'inner') {
        _inner = frame;
      } else {
        add(wrapper, frame);
      }
    }

    // we move inner to the top as a special case since it doesn't look good if it touches another
    // shadow.
    wrapper.insertChild(0, _inner);

    return add(page, wrapper);
  },
};
