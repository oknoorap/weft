const qs = require('querystring')
const axios = require('axios')
const merge = require('lodash.merge')
const Fuse = require('fuse.js')
const {
  apiUrl,
  fontUrl,
  defaultFields,
  defaultSubsets,
  defaultVariants,
  categories,
  variant,
  sortBy
} = require('./const')

const arrayContainsArray = (superset, subset) => {
  return subset.every(value => superset.indexOf(value) >= 0)
}

const extend = (source, modifier) => {
  return merge(merge({}, source), modifier)
}

class Weft {
  constructor() {
    this.$apiKey = ''
    this.sortBy = sortBy
    this.categories = categories

    this.variants = {}
    for (const i in variant) {
      if (Object.prototype.hasOwnProperty.call(variant, i)) {
        let key = variant[i].alias || variant[i].value
        let mini = variant[i].value

        if (i !== 'italic' && variant[i].italic) {
          key += 'italic'
          mini += 'i'
        }

        this.variants[key] = variant[i]
        this.variants[key].camelcase = i
        this.variants[key].mini = mini
      }
    }

    return this
  }

  apiKey(apiKey) {
    if (!apiKey) {
      return this.$apiKey
    }
    this.$apiKey = apiKey
  }

  buildQuery(fields, sort = 'alpha') {
    // Always set family to be true
    fields.family = true

    const fieldItems = []
    for (const key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key) && fields[key] === true) {
        fieldItems.push(key)
      }
    }

    const query = qs.stringify({
      sort,
      fields: `items(${fieldItems.join(',')})`,
      key: this.$apiKey
    })

    return apiUrl + query
  }

  list(fields = {}, sortBy = 'alpha') {
    const requestUrl = this.buildQuery(extend(defaultFields, fields), sortBy)
    return new Promise((resolve, reject) => {
      axios.get(requestUrl).then(response => {
        const {data} = response
        if (data.items) {
          data.items = data.items.map(item => {
            if (item.variants) {
              item.variantsFormat = item.variants.map(key => {
                const format = this.variants[key]
                format.key = key
                return format
              })
            }
            return item
          })
          resolve(data.items)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  view(fontName, fields = {}) {
    if (!fontName) {
      throw new Error('Font name is missing')
    }

    const defaultFields = extend({
      category: true,
      files: true,
      lastModified: true,
      subsets: true,
      variants: true,
      version: true
    }, fields)

    return new Promise((resolve, reject) => {
      this.list(defaultFields).then(result => {
        const filteredFont = result.filter(item => item.family.toLowerCase() === fontName.toLowerCase())
        if (filteredFont.length > 0) {
          resolve(filteredFont[0])
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  search(query = '', options = {}) {
    options.fields = extend(defaultFields, options.fields)
    options.subsets = extend(defaultSubsets, options.subsets)
    options.variants = extend(defaultVariants, options.variants)

    const _options = ({
      sortBy: this.sortBy.ALPHA,
      category: this.categories.ALL
    }, options)

    const fields = {
      category: true,
      subsets: true,
      variants: true
    }

    return new Promise((resolve, reject) => {
      this.list(fields).then(items => {
        let result = items
        if (query && query.length > 0) {
          result = new Fuse(items, {
            shouldSort: true,
            threshold: 0.4,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ['family']
          }).search(query)
        }

        const searchCriteria = result.filter(item => {
          let matchCategory = true
          let matchSubset = true
          let matchVariant = true

          if (_options.category) {
            matchCategory = _options.category === item.category
          }

          if (_options.subsets) {
            const _subsets = []

            for (const key in _options.subsets) {
              if (Object.prototype.hasOwnProperty.call(_options.subsets, key) &&
                _options.subsets[key] === true) {
                _subsets.push(key.toLowerCase().replace('extended', '-ext'))
              }
            }

            if (_subsets.length > 0) {
              matchSubset = arrayContainsArray(item.subsets, _subsets)
            }
          }

          if (_options.variants) {
            const _variants = []

            for (const key in _options.variants) {
              if (Object.prototype.hasOwnProperty.call(_options.variants, key) &&
                _options.variants[key] === true) {
                let val = variant[key].value
                if (variant[key].italic) {
                  val += 'italic'
                }
                _variants.push((val).toString())
              }
            }

            if (_variants.length > 0) {
              matchVariant = arrayContainsArray(item.variants, _variants)
            }
          }

          return matchCategory && matchSubset && matchVariant
        })

        if (searchCriteria.length > 0) {
          resolve(searchCriteria.map(item => {
            const itemByFields = {}

            if (_options.fields) {
              for (const key in _options.fields) {
                if (Object.prototype.hasOwnProperty.call(_options.fields, key) &&
                  _options.fields[key]) {
                  itemByFields[key] = item[key]
                }
              }
            }

            return itemByFields
          }))
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  embedUrl(fontName, options = {}, subsets = '') {
    let _options
    let skip = false
    const query = {}

    if (typeof options === 'string' && typeof subsets === 'string') {
      skip = true
      query.family = fontName

      if (options.length > 0) {
        query.family += ':' + options
      }

      if (subsets.length > 0) {
        query.subset = subsets
      }
    } else {
      _options = extend({
        subsets: extend(defaultSubsets, options.subsets),
        variants: extend(defaultSubsets, options.variants)
      }, options)
    }

    if (!skip && _options.variants) {
      const _variants = []
      for (const key in _options.variants) {
        if (Object.prototype.hasOwnProperty.call(_options.variants, key) &&
          _options.variants[key]) {
          let val = variant[key].value
          if (variant[key].italic) {
            val += 'i'
          }
          _variants.push((val).toString())
        }
      }

      query.family = fontName

      if (_variants.length > 0) {
        const fontFamily = {}
        fontFamily[fontName] = _variants.join(',')

        query.family = qs.stringify(fontFamily, ';', ':', {
          encodeURIComponent: string => string
        })
      }
    }

    if (!skip && _options.subsets) {
      const _subsets = []
      for (const key in _options.subsets) {
        if (Object.prototype.hasOwnProperty.call(_options.subsets, key) &&
          _options.subsets[key]) {
          _subsets.push((key).toLowerCase().replace('extended', 'ext'))
        }
      }

      if (_subsets.length > 0) {
        query.subset = _subsets.join(',')
      }
    }

    return fontUrl + qs.stringify(query, null, null, {
      encodeURIComponent: str => {
        return str
      }
    })
  }
}

module.exports = new Weft()
