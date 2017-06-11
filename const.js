const apiUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?'
const fontUrl = '://fonts.googleapis.com/css?'
const defaultFields = {
  category: false,
  files: false,
  family: true,
  lastModified: false,
  subsets: false,
  variants: false,
  version: false
}

const defaultSubsets = {
  latin: false,
  latinExtended: false,
  sinhala: false,
  greek: false,
  hebrew: false,
  vietnamese: false,
  cyrillic: false,
  cyrillicExtended: false,
  devanagari: false,
  arabic: false,
  khmer: false,
  tamil: false,
  greekExtended: false,
  thai: false,
  bengali: false,
  gujarati: false,
  oriya: false,
  malayalam: false,
  gurmukhi: false,
  kannada: false,
  telugu: false,
  myanmar: false
}

const defaultVariants = {
  thin: false,
  thinItalic: false,
  extraLight: false,
  extraLightItalic: false,
  light: false,
  lightItalic: false,
  regular: false,
  italic: false,
  medium: false,
  mediumItalic: false,
  semiBold: false,
  semiBoldItalic: false,
  bold: false,
  boldItalic: false,
  extraBold: false,
  extraBoldItalic: false,
  black: false,
  blackItalic: false
}

const variant = {
  thin: {
    value: 100,
    name: 'Thin'
  },
  thinItalic: {
    value: 100,
    italic: true,
    name: 'Thin Italic'
  },
  extraLight: {
    value: 200,
    name: 'Extra Light'
  },
  extraLightItalic: {
    value: 200,
    italic: true,
    name: 'Extra Light Italic'
  },
  light: {
    value: 300,
    name: 'Light'
  },
  lightItalic: {
    value: 300,
    italic: true,
    name: 'Light Italic'
  },
  regular: {
    value: 400,
    alias: 'regular',
    name: 'Regular'
  },
  italic: {
    value: 400,
    italic: true,
    alias: 'italic',
    name: 'Italic'
  },
  medium: {
    value: 500,
    name: 'Medium'
  },
  mediumItalic: {
    value: 500,
    italic: true,
    name: 'Medium Italic'
  },
  semiBold: {
    value: 600,
    name: 'Semi Bold'
  },
  semiBoldItalic: {
    value: 600,
    italic: true,
    name: 'Semi Bold Italic'
  },
  bold: {
    value: 700,
    name: 'Bold'
  },
  boldItalic: {
    value: 700,
    italic: true,
    name: 'Bold Italic'
  },
  extraBold: {
    value: 800,
    name: 'Extra Bold'
  },
  extraBoldItalic: {
    value: 800,
    italic: true,
    name: 'Extra Bold Italic'
  },
  black: {
    value: 900,
    name: 'Black'
  },
  blackItalic: {
    value: 900,
    italic: true,
    name: 'Black Italic'
  }
}

const sortBy = {
  ALPHA: 'alpha',
  DATE: 'date',
  SYLE: 'style',
  TRENDING: 'trending',
  POPULAR: 'popularity'
}

const categories = {
  ALL: '',
  SERIF: 'serif',
  SANS_SERIF: 'sans-serif',
  DISPLAY: 'display',
  HANDWRITING: 'handwriting',
  MONOSPACE: 'monospace'
}

module.exports = {
  apiUrl,
  fontUrl,
  defaultFields,
  defaultSubsets,
  defaultVariants,
  categories,
  variant,
  sortBy
}
