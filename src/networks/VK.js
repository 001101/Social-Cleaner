import { sleep, randomInteger } from '../heplers/methods'
import * as colors from '../heplers/colors'
import * as icons from '../heplers/icons'
import { addLog } from '../heplers/logs'
import store from '../store'
import Vue from 'vue'

const network = class VK {
  /* | -----------------------------------------------------------------------------
   * | API
   * | -----------------------------------------------------------------------------
   * |
   */
  /**
   * Send request to VK.
   */
  static async send (method, params = [], rnd = { min: 0, max: 0 }) {
    params.v = this.prototype.version

    if (!params.access_token) {
      params.access_token = store.state.vk.token
    }

    const result = await Vue.http.jsonp(this.prototype.urlApi + method, {
      params: params
    })

    if (rnd.max > 0 && rnd.min <= rnd.max) {
      await sleep(randomInteger(rnd.min, rnd.max))
    }

    return result
  }
  /**
   * @see https://vk.com/dev/wall.get
   */
  static async fetchWallGet (
    ownerId = store.state.vk.user.id,
    filter = 'all',
    count = this.prototype.COUNT_WALL_POSTS,
    offset = 0,
    sleepMin = 0,
    sleepMax = sleepMin
  ) {
    const result = await this.send('wall.get', {
      owner_id: ownerId,
      filter: filter,
      count: count,
      offset: offset
    }, { min: sleepMin, max: sleepMax })

    return result
  }
  /**
   * @see https://vk.com/dev/wall.delete
   */
  static async fetchWallDelete (postId, ownerId = store.state.vk.user.id, sleepMin = 0, sleepMax = sleepMin) {
    const result = await this.send('wall.delete', {
      owner_id: ownerId,
      post_id: postId
    }, { min: sleepMin, max: sleepMax })

    return result
  }
  /**
   * @see https://vk.com/dev/users.get
   */
  static async fetchUsersGet (userIds = store.state.vk.user.id, fields = '', sleepMin = 0, sleepMax = sleepMin) {
    const result = await this.send('users.get', {
      user_ids: userIds,
      fields: fields
    }, { min: sleepMin, max: sleepMax })

    return result
  }
  /**
   * @see https://vk.com/dev/groups.getById
   */
  static async fetchGroupsGetById (groupIds, fields = '', sleepMin = 0, sleepMax = sleepMin) {
    const result = await this.send('groups.getById', {
      group_ids: groupIds,
      fields: fields
    }, { min: sleepMin, max: sleepMax })

    return result
  }
  /**
   * @see https://vk.com/dev/status.get
   */
  static async fetchStatusGet (id = store.state.vk.user.id, sleepMin = 0, sleepMax = sleepMin) {
    const result = await this.send('status.get', {
      user_id: id
    }, { min: sleepMin, max: sleepMax })

    return result
  }
  /**
   * @see https://vk.com/dev/status.set
   */
  static async fetchStatusSet (text = '', group_id = null, sleepMin = 0, sleepMax = sleepMin) {
    const result = await this.send('status.set', {
      text: text,
      group_id: group_id
    }, { min: sleepMin, max: sleepMax })

    return result
  }

  /* | -----------------------------------------------------------------------------
   * | LINKS
   * | -----------------------------------------------------------------------------
   * |
   */
  /**
   * @see https://vk.com/dev/objects/post
   */
  static getLinkWall (item) {
    return `${this.prototype.url}wall${item.from_id}_${item.id}`
  }
  /**
   * Returns a link to a user or community page.
   *
   * @param {int|string} id
   *
   * @return string
   */
  static getLinkPage (id) {
    if (typeof id === 'number') {
      id = id.toString()
    }

    if (id.charAt(0) === '-') {
      return this.getLinkGroup(id.slice(1))
    }

    return this.getLinkUser(id)
  }
  static getLinkUser (id = store.state.vk.user.id) {
    return `${this.prototype.url}id${id}`
  }
  static getLinkGroup (id) {
    return `${this.prototype.url}public${id}`
  }
}

/* | -----------------------------------------------------------------------------
 * | Important properties
 * | -----------------------------------------------------------------------------
 * |
 */
network.prototype.off = false
network.prototype.disabled = false
network.prototype.name = 'Vkontakte'
network.prototype.to = '/vk'
network.prototype.domain = 'vk.com'
network.prototype.icon = 'fa-vk'
network.prototype.url = 'https://vk.com/'
network.prototype.urlApi = 'https://api.vk.com/method/'
network.prototype.sections = [
  { name: 'vk.sections.token', to: 'vk-token', icon: icons.TOKEN },
  { name: 'vk.sections.wall', val: 'wall', to: 'vk-wall', icon: icons.WALL },
  { name: 'vk.sections.status', val: 'status', to: 'vk-status', icon: icons.STATUS },
  { name: 'vk.sections.docs', val: 'docs', to: 'vk-docs', icon: icons.DOCS }
]

/* | -----------------------------------------------------------------------------
 * | Important methods
 * | -----------------------------------------------------------------------------
 * |
 */
network.prototype.logs = (req, next) => {
  const urlSplit = req.url.split('/')
  const method = urlSplit[urlSplit.length - 1]

  // Hide params from logs
  const params = []
  Object.keys(req.params).forEach(key => {
    const param = req.params[key]
    switch (key) {
      case 'access_token':
        params.push({ key: key, value: param.substr(0, 3) + '***' + param.substr(-3) })
        break
      case 'method':
        break
      default:
        params.push({ key: key, value: param })
    }
  })

  addLog(this.default, method, { method: method, params: params }, colors.INFO)

  next(res => {
    if (res.status >= 200 && res.status < 300) {
      addLog(this.default, method, res.body, res.body.error ? colors.ERROR : colors.SUCCESS)
      if (res.body.error) {
        Vue.prototype.$Notify.error({ title: res.body.error.error_msg || 'Error', message: method })
      }
    } else {
      addLog(this.default, method, 'Server error', colors.ERROR)
      Vue.prototype.$Notify.error({ title: 'Server error', message: method })
    }
  })
}

/* | -----------------------------------------------------------------------------
 * | Other
 * | -----------------------------------------------------------------------------
 * |
 */
// API params
network.prototype.clientId = 6244330
network.prototype.version = '5.76'
network.prototype.urlRedirect = 'https://oauth.vk.com/blank.html'

// Information about methods
network.prototype.COUNT_WALL_POSTS = 100

export default network
