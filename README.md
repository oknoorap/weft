# :santa: weft
NodeJS API Wrapper for Google Web Fonts

## Installation
Using NPM  
`npm install weft --save`

Using Yarn  
`yarn add weft`

## Usage

```javascript
const weft = require('weft')

// Set API Key
weft.apiKey(/* Your API_KEY here */)

// See current API Key
console.log(weft.apiKey())

// Display Google Fonts Complete List
weft.list().then(result => {
  console.log(result)
})

/**
 * Display Google Fonts With Custom Fields
 * See fields and sortBy on API section below
 */
weft.list(fields, sortBy).then(result => {
  console.log(result)
})

// View Open Sans Info
weft.view('Open Sans').then(result => {
  console.log(result)
})

/**
 * Search fonts
 * See options on API section below
 */
weft.search('monts', options).then(result => {
  console.log(result)
})

// Get font URL
console.log(weft.embedUrl('Montserrat', options))
```

## API

Table of Contents
=================

  * [Sort By Constant](##weftsortby)
  * [Categories Constant](#weftcategories)
  * [Set or Get API Key](#weftapikey-key-string--)
  * [Get Font List](##weftlist-fields-object---sortby-string--weftsortbyalpha)
  * [View Font Information](#weftview-fontname-string)
  * [Search Font With Criteria](#weftsearch-query-string---options-object--)
  * [Get Embed URL](#weftembedurl-fontname-string---options-object--)

### `weft.sortBy`
> Constant variables of sorting list.

| Key | Value |
| --- | --- |
| **ALPHA** | `alpha` |
| **DATE** | `date` |
| **SYLE** | `style` |
| **TRENDING** | `trending` |
| **POPULAR** | `popularity` |

**Example**
```javascript
weft.list(options, weft.sortBy.TRENDING)
```

### `weft.categories`
> Constant variables of categories.

| Key | Value |
| --- | --- |
| **ALL** | Empty |
| **SERIF** | `serif` |
| **SANS_SERIF** | `sans-serif` |
| **DISPLAY** | `display`,
| **HANDWRITING** | `handwriting` |
| **MONOSPACE** | `monospace` |

### `weft.apiKey (key: string = '')`
> Set or Get API Key. If you leave `key` empty, it will be used as getter.

### `weft.list (fields?: object = '', sortBy?: string = weft.sortBy.ALPHA)`
> Get Google Fonts list. The first argument `fields` is to see or hide result from Google Fonts API. The second argument is sorting function.

**Default Fields**

| Key | Description | Default Value |
| --- | --- | --- |
| `category` | Font category | `false` |
| `files` | File list from Google Server | `false` |
| `family` | Font Family Name | `true` |
| `lastModified` | Last modified date | `false` |
| `subsets` | Font Subsets | `false` |
| `variants` | Font Variants | `false` |
| `version` | Font Version | `false` |

**Example**
```javascript
// Get font family and font variants
const yoFields = {
  category: false,
  files: false,
  family: true,
  lastModified: false,
  subsets: false,
  variants: true,
  version: false
}

weft.list(yoFields).then(result => {
  // Pssst, hey kids wanna see result?
})
```

### `weft.view (fontName: string)`
> View individual font information.

### `weft.search (query: string = '', options?: object = {})`
> Search font with criteria. `query` can be empty.

**Default Options**
```javascript
 {
  fields: {
    // See default fields on weft.list section above
  },
  category: weft.categories.ALL,
  sortBy: weft.sortBy.TRENDING,
  subsets: {
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
  },
  variants: {
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
})
```

### `weft.embedUrl (fontName: string = '', options?: object = {})`
> Get Google Fonts Embed URL

## License
MIT © [oknoorap](https://github.com/oknoorap)
