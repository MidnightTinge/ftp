export type Padding = number | { top: number, right: number, bottom: number, left: number } | { horizontal: number, vertical: number };
export type Radii = number | { topLeft: number, topRight: number, bottomRight: number, bottomLeft: number };
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
  cornerRadius?: Radii,
  width: AutoSize,
  height: AutoSize,
  horizPlacement: AxisPlacement,
  vertPlacement: AxisPlacement,
}

/**
 * Create a new auto-layout frame.
 */
export function LayoutFrame({
  direction,
  itemSpacing,
  containerPadding,
  cornerRadius,
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

  if (cornerRadius != null) {
    if (typeof cornerRadius === 'number') {
      frame.cornerRadius = cornerRadius;
    } else {
      frame.topLeftRadius = cornerRadius.topLeft;
      frame.topRightRadius = cornerRadius.topRight;
      frame.bottomRightRadius = cornerRadius.bottomRight;
      frame.bottomLeftRadius = cornerRadius.bottomLeft;
    }
  }

  if (typeof width === 'number') {
    frame[_hv.sizing.horiz] = 'FIXED';
    frame.resizeWithoutConstraints(width, frame.height);
  } else {
    frame[_hv.sizing.horiz] = width === 'auto' ? 'FIXED' : 'AUTO';
  }

  if (typeof height === 'number') {
    frame[_hv.sizing.vert] = 'FIXED';
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

/**
 * Create a new text node.
 */
export function Text(text: string, size?: number): TextNode {
  const node = figma.createText();
  node.characters = text;
  node.fontSize = size ?? node.fontSize;

  return node;
}

export type NewCubeProps = {
  width: number,
  height: number,
  rounding?: number,
  fills?: RectangleNode['fills']
}

/**
 * Create a new cube. This is biased towards our color previews for {@link PColors}
 */
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

export const ONE_REM = 16;
const RE_NUMERIC = /^-?[0-9](?:\.[0-9]+)?$/;

export function fromCss(rem: string, extended?: true): { value: number, unit: 'percent' | 'px' };
export function fromCss(rem: string, extended?: false): number;
export function fromCss(rem: string, extended: boolean = false) {
  if (RE_NUMERIC.test(rem)) {
    const parsed = parseFloat(rem);

    if (extended) {
      // we got a value like "1.3", convert to 130%
      return {
        value: parsed * 100,
        unit: 'percent',
      };
    }

    // we can't return a percent here so convert it relative to rem
    return parsed * ONE_REM;
  }

  const [val] = /^-?[0-9](?:\.[0-9]+)?/.exec(rem);
  const parsed = parseFloat(val);
  if (!isNaN(parsed)) {
    if (extended) {
      return {
        value: parsed * ONE_REM,
        unit: 'px',
      };
    }

    return parsed * ONE_REM;
  }

  if (extended) {
    return {
      value: 0,
      unit: 'px',
    };
  }

  return 0;
}


type RGB = { r: number, g: number, b: number }

/**
 * Convert a hex string to RGB. The returned RGB are in float notation (e.g. 1.0 instead of 255) to
 * match figma's system.
 *
 * https://stackoverflow.com/a/5624139
 */
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
