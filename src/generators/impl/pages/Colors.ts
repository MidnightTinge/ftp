import { add, cap } from '../../../functions';
import { Cube, LayoutFrame, Text } from '../../../interop/figma';
import { COLORS } from '../../../interop/tw';
import { AssetMap, PageGenerator } from '../../PageGenerator';

export default class Colors extends PageGenerator {
  constructor() {
    super('pages.colors');
  }

  generate(runkey: string, { colors: paints }: AssetMap): PageNode {
    const page = figma.createPage();
    page.name = `TW/${runkey}/Colors`;

    const pageWrapper = LayoutFrame({
      direction: 'column',
      itemSpacing: 10,
      containerPadding: 10,
      width: 'wrap',
      height: 'wrap',
      horizPlacement: 'min',
      vertPlacement: 'center',
    });
    pageWrapper.name = 'Colors';

    for (const [k, v] of Object.entries(COLORS)) {
      if (typeof v !== 'string') {
        const H = cap(k);

        const colorWrapper = LayoutFrame({
          direction: 'column',
          itemSpacing: 10,
          containerPadding: 10,
          width: 'wrap',
          height: 'wrap',
          horizPlacement: 'min',
          vertPlacement: 'min',
        });
        colorWrapper.name = `${H}Wrapper`;
        const wrapperTitle = Text(H);
        const colorsRow = LayoutFrame({
          direction: 'row',
          itemSpacing: 10,
          containerPadding: 10,
          width: 'wrap',
          height: 'wrap',
          vertPlacement: 'min',
          horizPlacement: 'min',
        });
        wrapperTitle.name = `${H}Title`;
        colorsRow.name = `${H}Colors`;

        add(colorWrapper,
          wrapperTitle,
          colorsRow,
        );

        // NOTE: We don't care about the value or using Object#entires here since we're coloring the
        //       cubes with paint styles, thus linking them to their TW value.
        for (const cK of Object.keys(v)) {
          const T = cap(cK);

          const colorCol = LayoutFrame({
            direction: 'column',
            itemSpacing: 10,
            containerPadding: 10,
            horizPlacement: 'center',
            vertPlacement: 'center',
            width: 'wrap',
            height: 'wrap',
          });
          colorCol.name = `${H}${T}Wrapper`;

          const colorCube = Cube({
            width: 50,
            height: 50,
            rounding: 8,
          });
          const ps = paints[`${k}.${cK}`];
          if (ps != null) {
            colorCube.fillStyleId = ps.id;
          }
          colorCube.name = `${H}${T}Cube`;

          add(colorsRow,
            add(colorCol,
              colorCube,
              Text(T),
            ),
          );
        }

        add(pageWrapper,
          colorWrapper,
        );
      }
    }

    add(page, pageWrapper);

    return page;
  }
}
