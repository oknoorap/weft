const apiUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?'
const fontUrl = 'https://fonts.googleapis.com/css?'
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
    value: 100
  },
  thinItalic: {
    value: 100,
    italic: true
  },
  extraLight: {
    value: 200
  },
  extraLightItalic: {
    value: 200,
    italic: true
  },
  light: {
    value: 300
  },
  lightItalic: {
    value: 300,
    italic: true
  },
  regular: {
    value: 400
  },
  italic: {
    value: 400,
    italic: true
  },
  medium: {
    value: 500
  },
  mediumItalic: {
    value: 500,
    italic: true
  },
  semiBold: {
    value: 600
  },
  semiBoldItalic: {
    value: 600,
    italic: true
  },
  bold: {
    value: 700
  },
  boldItalic: {
    value: 700,
    italic: true
  },
  extraBold: {
    value: 800
  },
  extraBoldItalic: {
    value: 800,
    italic: true
  },
  black: {
    value: 900
  },
  blackItalic: {
    value: 900,
    italic: true
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
