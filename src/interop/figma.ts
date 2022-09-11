export type Padding = number | { top: number, right: number, bottom: number, left: number } | { horizontal: number, vertical: number };
export type AutoSize = 'wrap' | 'auto' | number;
export type AxisPlacement = 'min' | 'center' | 'max';

export type HvAxis = {
  align: {
    horiz: 'primaryAxisAlignItems' | 'counterAxisAlignItems',
    vert: 'primaryAxisAlignItems' | 'counterAxisAlignItems',
  },
  sizing: {
    horiz: 'primaryAxisSizingMode' | 'counterAxisSizingMode',
    vert: 'primaryAxisSizingMode' | 'counterAxisSizingMode',
  },
}

// Figma doesn't use "horiz" or "vert" as their axis, they use "primary" and "counter", with the
// primary axis corresponding to the layout mode. Meaning, if your layout mode is vertical, then
// your primary axis is also vertical. Confusing at first, I know, it's not like horizontal doesn't
// suddenly mean horizontal when your layout is different, but hey, i'm just a developer.
export const hvKeys: Record<FrameNode['layoutMode'], HvAxis> = {
  'HORIZONTAL': {
    align: {
      horiz: 'primaryAxisAlignItems',
      vert: 'counterAxisAlignItems',
    },
    sizing: {
      horiz: 'primaryAxisSizingMode',
      vert: 'counterAxisSizingMode',
    },
  },
  'VERTICAL': {
    align: {
      horiz: 'counterAxisAlignItems',
      vert: 'primaryAxisAlignItems',
    },
    sizing: {
      horiz: 'counterAxisSizingMode',
      vert: 'primaryAxisSizingMode',
    },
  },
  'NONE': {
    align: {
      horiz: null,
      vert: null,
    },
    sizing: {
      horiz: null,
      vert: null,
    },
  },
};

export type LayoutFrameProps = {
  direction: 'row' | 'column',
  itemSpacing: number,
  containerPadding: Padding,
  width: AutoSize,
  height: AutoSize,
  horizPlacement: AxisPlacement,
  vertPlacement: AxisPlacement,
}

export function LayoutFrame({
  direction,
  itemSpacing,
  containerPadding,
  width,
  height,
  horizPlacement,
  vertPlacement,
}: LayoutFrameProps) {
  const frame = figma.createFrame();

  frame.layoutMode = direction === 'row' ? 'HORIZONTAL' : 'VERTICAL';
  frame.itemSpacing = itemSpacing;

  const _hv = hvKeys[frame.layoutMode];

  if (typeof containerPadding === 'number') {
    frame.horizontalPadding = containerPadding;
    frame.verticalPadding = containerPadding;
  } else if ('top' in containerPadding) {
    frame.paddingTop = containerPadding.top;
    frame.paddingRight = containerPadding.right;
    frame.paddingBottom = containerPadding.bottom;
    frame.paddingLeft = containerPadding.left;
  } else {
    frame.horizontalPadding = containerPadding.horizontal;
    frame.verticalPadding = containerPadding.vertical;
  }

  if (typeof width === 'number') {
    frame.resizeWithoutConstraints(width, frame.height);
  } else {
    frame[_hv.sizing.horiz] = width === 'auto' ? 'FIXED' : 'AUTO';
  }

  if (typeof height === 'number') {
    frame.resizeWithoutConstraints(frame.width, height);
  } else {
    frame[_hv.sizing.vert] = height === 'auto' ? 'FIXED' : 'AUTO';
  }

  switch (horizPlacement) {
    case 'min': {
      frame[_hv.align.horiz] = 'MIN';
      break;
    }
    case 'max': {
      frame[_hv.align.horiz] = 'MAX';
      break;
    }
    case 'center': {
      frame[_hv.align.horiz] = 'CENTER';
      break;
    }
  }

  switch (vertPlacement) {
    case 'min': {
      frame[_hv.align.vert] = 'MIN';
      break;
    }
    case 'max': {
      frame[_hv.align.vert] = 'MAX';
      break;
    }
    case 'center': {
      frame[_hv.align.vert] = 'CENTER';
      break;
    }
  }

  return frame;
}

export function Text(text: string): TextNode {
  const node = figma.createText();
  node.characters = text;

  return node;
}

export type NewCubeProps = {
  width: number,
  height: number,
  rounding?: number,
  fills?: RectangleNode['fills']
}

export function Cube({
  width,
  height,
  fills,
  rounding = 0,
}: NewCubeProps): RectangleNode {
  const node = figma.createRectangle();
  node.resizeWithoutConstraints(width, height);
  node.cornerRadius = rounding;

  if (fills != null) {
    node.fills = fills;
  }

  return node;
}


type RGB = { r: number, g: number, b: number }

// https://stackoverflow.com/a/5624139
export function hexToRgb(hex): RGB {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  } : null;
}

// https://stackoverflow.com/a/47355187
export function cssToRgb(colorName: string): RGB {
  // https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fillstyle

  // @ts-expect-error: This runs in a document environment, but we're transpiling from node.
  const _ctx = document.createElement('canvas').getContext('2d');
  _ctx.fillStyle = colorName;
  return hexToRgb(_ctx.fillStyle);
}
