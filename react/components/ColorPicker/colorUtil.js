const COLOR_CONSTS = {
  RGB_MAX_VALUE: 255,
}

const COLOR_FORMAT = {
  HSV: 'hsv',
  RGB: 'rgb',
  HEX: 'hex',
}

/** Convert RGB to HSV format */
const rgbTohsv = rgb => {
  const { r, g, b, a } = rgb
  const rAux = r / COLOR_CONSTS.RGB_MAX_VALUE
  const gAux = g / COLOR_CONSTS.RGB_MAX_VALUE
  const bAux = b / COLOR_CONSTS.RGB_MAX_VALUE
  const cMax = Math.max(rAux, gAux, bAux)
  const cMin = Math.min(rAux, gAux, bAux)
  const theta = cMax - cMin

  let h, s
  // Calcule Hue
  if (theta === 0) {
    h = 0
  } else {
    if (cMax === rAux) h = ((gAux - bAux) / theta) % 6
    else if (cMax === gAux) h = (bAux - rAux) / theta + 2
    else h = (rAux - gAux) / theta + 4
  }

  h = Math.round(h * 60)

  // Calcule Saturation
  if (cMax === 0) {
    s = 0
  } else {
    s = parseFloat((theta / cMax).toFixed(2))
  }

  // Calcule Value
  const v = parseFloat(cMax.toFixed(2))

  return {
    h,
    s,
    v,
    a,
  }
}

/** Convert RGB to Hex*/
const rgbTohex = rgb => {
  const { r, g, b } = rgb
  let rString = r.toString(16).toUpperCase()
  let gString = g.toString(16).toUpperCase()
  let bString = b.toString(16).toUpperCase()

  if (rString.length < 2) {
    rString = `0${rString}`
  }

  if (gString.length < 2) {
    gString = `0${gString}`
  }

  if (bString.length < 2) {
    bString = `0${bString}`
  }

  const hex = `#${rString}${gString}${bString}`

  return hex
}

/** Convert HSV to RGB */
const hsvToRgb = hsv => {
  const { h, s, v, a } = hsv
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c

  let rAux, gAux, bAux

  if (h >= 0 && h < 60) {
    rAux = c
    gAux = x
    bAux = 0
  } else if (h >= 60 && h < 120) {
    rAux = x
    gAux = c
    bAux = 0
  } else if (h >= 120 && h < 180) {
    rAux = 0
    gAux = c
    bAux = x
  } else if (h >= 180 && h < 240) {
    rAux = 0
    gAux = x
    bAux = c
  } else if (h >= 240 && h < 300) {
    rAux = x
    gAux = 0
    bAux = c
  } else {
    rAux = c
    gAux = 0
    bAux = x
  }

  const r = Math.round((rAux + m) * COLOR_CONSTS.RGB_MAX_VALUE)
  const g = Math.round((gAux + m) * COLOR_CONSTS.RGB_MAX_VALUE)
  const b = Math.round((bAux + m) * COLOR_CONSTS.RGB_MAX_VALUE)

  return {
    r,
    g,
    b,
    a,
  }
}

/** Convert HSV to Hex */
const hsvTohex = hsv => {
  const rgb = hsvToRgb(hsv)
  return rgbTohex(rgb)
}

/** Convert Hex to RGB */
const hexTorgb = hex => {
  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)
  return {
    r,
    g,
    b,
    a: 1,
  }
}

/** Convert Hex to HSV */
const hexTohsv = hex => {
  const rgb = hexTorgb(hex)
  return rgbTohsv(rgb)
}

const validHex = hex => {
  return /(^#[0-9A-F]{6}$)/i.test(hex)
}

/** Get color format */
const colorFormat = color => {
  if (validHex(color)) return COLOR_FORMAT.HEX
  else if ('h' in color && 's' in color && 'v' in color) return COLOR_FORMAT.HSV
  else if ('r' in color && 'g' in color && 'b' in color) return COLOR_FORMAT.RGB
}

/** Convert Any format suported(RGB, HSV and HEX) to RGB */
const anyTorgb = color => {
  const format = colorFormat(color)
  switch (format) {
    case COLOR_FORMAT.HEX:
      return hexTorgb(color)
    case COLOR_FORMAT.HSV:
      return hsvToRgb(color)
    case COLOR_FORMAT.RGB:
      return color
    default:
      return
  }
}

/** Convert Any format suported(RGB, HSV and HEX) to HSV */
const anyTohsv = color => {
  const format = colorFormat(color)
  switch (format) {
    case COLOR_FORMAT.HEX:
      return hexTohsv(color)
    case COLOR_FORMAT.HSV:
      return color
    case COLOR_FORMAT.RGB:
      return rgbTohsv(color)
    default:
      return
  }
}

/** Convert Any format suported(RGB, HSV and HEX) to HEX */
const anyTohex = color => {
  const format = colorFormat(color)
  switch (format) {
    case COLOR_FORMAT.HEX:
      return color
    case COLOR_FORMAT.HSV:
      return hsvTohex(color)
    case COLOR_FORMAT.RGB:
      return rgbTohex(color)
    default:
      return
  }
}

export default {
  rgb: {
    to: {
      hsv: rgbTohsv,
      hex: rgbTohex,
    },
  },
  hsv: {
    to: {
      rgb: hsvToRgb,
      hex: hsvTohex,
    },
  },
  hex: {
    to: {
      rgb: hexTorgb,
      hsv: hexTohsv,
    },
  },
  any: {
    to: {
      rgb: anyTorgb,
      hsv: anyTohsv,
      hex: anyTohex,
    },
  },
  validateHex: validHex,
}
