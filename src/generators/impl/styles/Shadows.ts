import { BOX_SHADOW } from '../../../interop/tw';
import IGenerator, { StyleMap } from '../../IGenerator';

export default <IGenerator<StyleMap<EffectStyle>>>{
  generate(runkey: string): StyleMap<EffectStyle> {

    const map: StyleMap<EffectStyle> = {};
    for (const [k, v] of Object.entries(BOX_SHADOW)) {
      // We need to do some manual processing here. It's gross, but gets the job done. We don't
      // have access to window/document/etc to create a node and run style computations on.
      const styles: Effect[] = v.split(',')
        .map(style => {
          let css = style.trim();
          const isInset = css.startsWith('inset');
          if (isInset) {
            css = css.substring(6); // "inset" + whitespace
          }

          // box-shadow: <offset-sx> | <offset-y> | <blur-radius> | <spread-radius> | <color>;
          const [offsetX, offsetY, blurRadius, spreadRadius, ...rgb] = css.split(' ');
          const [r, g, b, , a] = rgb.join(' ').substring(4).split(' ');
          const rgba = {
            r: parseFloat(r) / 255,
            g: parseFloat(g) / 255,
            b: parseFloat(b) / 255,
            a: parseFloat(a),
          };

          return {
            type: isInset ? 'INNER_SHADOW' : 'DROP_SHADOW',
            color: rgba,
            offset: { x: parseFloat(offsetX), y: parseFloat(offsetY) },
            radius: parseFloat(blurRadius),
            spread: parseFloat(spreadRadius),
            blendMode: 'NORMAL',
            visible: true,
          } as Effect;
        });

      const es = figma.createEffectStyle();
      es.name = `TW/${runkey}/Shadow/${k.toLowerCase()}`;
      es.effects = styles;

      map[k.toLowerCase()] = es;
    }

    return map;
  },
};
