export default {
  methods: {
    /* | -----------------------------------------------------------------------------
     * | Check.
     * | -----------------------------------------------------------------------------
     * |
     * | null  - config is off
     * | false - no matches found
     * | true  - matches found
     * |
     */
    /**
     * @param {array} items - {obj, method, param}
     * @param {boolean} reverse
     *
     * @return object - {result(bool), index(number)}
     */
    checkFinal (items, reverse = false) {
      let onlyNull = true

      for (const [index, item] of items.entries()) {
        const result = item.method(item.obj, item.param)

        if (result === null) {
          continue
        }

        onlyNull = false

        if (!result) {
          return { result: reverse, index: index }
        }
      }

      return { result: reverse ? onlyNull : !onlyNull, index: null }
    },
    /**
     * @param {object} obj - {items, compareAll}
     * @param {number} need
     *
     * @return {boolean|null}
     */
    checkNumber (obj, need) {
      const compareAll = obj.compareAll
      const items = obj.items
      const len = items.length

      if (!len) {
        return null
      }

      if (compareAll) {
        for (let i = 0; i < items; i++) {
          if (items[i] !== need) {
            return false
          }
        }
        return true
      }

      return items.includes(need)
    },
    /**
     * @param {object} obj - {items, compareAll}
     * @param {string} need
     *
     * @return {boolean|null}
     */
    checkText (obj, need) {
      const compareAll = obj.compareAll
      const items = obj.items
      const len = items.length

      if (!len) {
        return null
      }

      need = need.toLowerCase().trim()

      for (let i = 0; i < len; i++) {
        const isFind = need.indexOf(items[i]) !== -1

        if (compareAll && !isFind) {
          return false
        }
        if (!compareAll && isFind) {
          return true
        }
      }

      return compareAll
    },
    /**
     * @param {object} obj - {items, compareAll}
     * @param {string} need
     *
     * @return {boolean|null}
     */
    checkTextFull (obj, need) {
      const compareAll = obj.compareAll
      const items = obj.items
      const len = items.length

      if (!len) {
        return null
      }

      need = need.toLowerCase().trim()

      for (let i = 0; i < len; i++) {
        const isFind = need === items[i]

        if (compareAll && !isFind) {
          return false
        }
        if (!compareAll && isFind) {
          return true
        }
      }

      return compareAll
    },
    /**
     * @param {object} obj - {items(state, count), compareAll}
     * @param {array} need
     *
     * @return {boolean|null}
     */
    checkIndicators (obj, need) {
      // Start delete items, who disabled or "need" is undefined
      let deleteIndex = []

      const items = obj.items.filter((item, index) => {
        const isValidate = item.state !== 0 && typeof need[index] !== 'undefined'
        if (!isValidate) {
          deleteIndex.push(index)
        }
        return isValidate
      })

      if (items.length < 1) {
        return null
      }

      for (let i = deleteIndex.length - 1; i >= 0; i--) {
        need.splice(deleteIndex[i], 1)
      }

      // Check every item
      const results = items.map((item, index) => {
        return this.checkIndicator(item, need[index])
      })

      for (let i = 0; i < results.length; i++) {
        if (obj.compareAll && !results[i]) {
          return false
        }
        if (!obj.compareAll && results[i]) {
          return true
        }
      }

      return obj.compareAll
    },
    /**
     * @param {object} obj - {state, count}
     * @param {number} need
     *
     * @return {boolean}
     */
    checkIndicator (obj, need) {
      const count = parseInt(obj.count)

      switch (obj.state) {
        case -1:
          return need < count
        case 1:
          return need > count
        default:
          return false
      }
    },
    /**
     * @param {object} obj - {name, items[], compareAll}
     * @param {array|undefined} need
     *
     * @return {boolean|null}
     */
    checkCheckbox (obj, need) {
      const len = obj.items.length

      if (!len) {
        return null
      }

      if (typeof need === 'undefined') {
        return false
      }

      for (let i = 0; i < len; i++) {
        const include = need.includes(obj.items[i])

        if (obj.compareAll && !include) {
          return false
        }
        if (!obj.compareAll && include) {
          return true
        }
      }

      return obj.compareAll
    }
  }
}
