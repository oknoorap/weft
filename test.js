import test from 'ava'
import weft from './index'

test.before(() => {
  if (!process.env.API_KEY) {
    throw new Error('Need an API Key')
  }
})

weft.apiKey(process.env.API_KEY)

test('apikey is set', t => {
  const apiKey = weft.apiKey()
  t.not(apiKey, '')
})

const list = weft.list()
test('list of fonts request should be succeed', async t => {
  await list.then(result => {
    t.true(Array.isArray(result))
    t.true(result.length > 0)
    result.forEach(item => {
      t.is(typeof item.family, 'string')
    })
  })
})

const trendingFonts = weft.list({}, weft.sortBy.TRENDING)
test('list of trending fonts request should be succeed', async t => {
  await trendingFonts.then(result => {
    t.true(Array.isArray(result))
    t.true(result.length > 0)
  })
})

const listWithFields = weft.list({
  category: true,
  files: true,
  lastModified: true,
  subsets: true,
  variants: true,
  version: true
})
test('list of fonts request with complete fields should be succeed', async t => {
  await listWithFields.then(result => {
    result.forEach(item => {
      t.true(Array.isArray(item.variants))
      t.true(Array.isArray(item.subsets))
      t.is(typeof item.family, 'string')
      t.is(typeof item.category, 'string')
      t.is(typeof item.lastModified, 'string')
      t.is(typeof item.files, 'object')
    })
  })
})

const viewFonts = weft.view('Open Sans')
test('"Open Sans" properties font should be valid', async t => {
  await viewFonts.then(result => {
    t.is(result.family, 'Open Sans')
    t.is(result.category, 'sans-serif')
    t.true(result.variants.includes('italic'))
    t.true(result.subsets.includes('greek-ext'))
  })
})

const searchFonts = weft.search('open')
test('Search "Open Sans" should be exists', async t => {
  await searchFonts.then(result => {
    let found = false
    result.forEach(item => {
      if (item.family.toLowerCase() === 'open sans') {
        found = true
      }
    })
    t.true(found)
  })
})

const searchFontsWithOptions = weft.search('mont', {
  fields: {
    subsets: true,
    variants: true
  },
  sortBy: weft.sortBy.TRENDING,
  subsets: {
    vietnamese: true
  },
  variants: {
    black: true
  }
})
test('Search "Montserrat" with search criteria subset: vietnamese, variant: black should be exists', async t => {
  await searchFontsWithOptions.then(result => {
    let found = false
    let hasSubset = false
    let hasVariant = false

    result.forEach(item => {
      if (item.family.toLowerCase() === 'montserrat') {
        found = true
        hasSubset = item.subsets.includes('vietnamese')
        hasVariant = item.variants.includes('900')
      }
    })

    t.true(found)
    t.true(hasSubset)
    t.true(hasVariant)
  })
})

test('embed url should be valid', t => {
  t.is(weft.embedUrl('Montserrat', {
    subsets: {
      vietnamese: true
    },
    variants: {
      italic: true,
      bold: true
    }
  }), 'https://fonts.googleapis.com/css?family=Montserrat:400i,700&subset=vietnamese')
})
