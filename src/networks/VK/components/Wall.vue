<template>
  <div id="wall">
    <div class="main-config block">
      <attr-section name="vk.wall.main_config.h2" />
      <attr-input name="vk.wall.main_config.owner_id.name" :model.sync="main.owner_id" :process="process"
                  info="vk.wall.main_config.owner_id.info" />
      <attr-select name="vk.wall.main_config.filter.name" :html="main.filter.html" :obj="main.filter" size="large"
                   :process="process" />
      <attr-count name="vk.wall.main_config.count.name" :model.sync="main.count" :process="process" />
      <!--<attr-radio-button name="vk.wall.main_config.is_delete_posts.name" :obj="main.isDeletePosts"-->
                         <!--:html="main.isDeletePosts.html" :process="process" />-->
    </div>

    <div class="wall-config block">
      <attr-section name="vk.wall.wall_config.h2" :reverse.sync="wall.reverse" :process="process" can-reverse />
      <attr-tag :obj="wall.ids" :push="pushNumber" :link-tag="getLinkPost" :process="process" />
      <attr-tag :obj="wall.fromIds" :push="pushNumber" :link-tag="getLinkPage" :process="process"
                info="vk.wall.wall_config.from_ids.info" />
      <attr-tag :obj="wall.texts" :push="pushString" :process="process" compare />
      <attr-checkbox :obj="wall.attachments" :html="html.attachments" :process="process" compare />
      <attr-indicators :obj="wall.indicators" :process="process" only-numbers compare />
      <!--TODO Date-->
    </div>

    <template v-if="!main.isDeletePosts.value">
      <div class="comments-config block">
        <attr-section name="vk.wall.comments_config.h2" :reverse.sync="comments.reverse" :process="process" can-reverse />
        <attr-tag :obj="comments.fromIds" :push="pushNumber" :link-tag="getLinkPage" :process="process"
                  info="vk.wall.comments_config.from_ids.info" />
        <attr-tag :obj="comments.texts" :push="pushString" :process="process" />
        <attr-checkbox :obj="comments.attachments" :html="html.attachments" :process="process" compare />
        <attr-indicators :obj="comments.indicators" :process="process" compare />
        <!--TODO Date-->
      </div>
    </template>

    <attr-action :process="process" :loading="loading" canPreview @start="doStart" @preview="doPreview" @stop="doStop" />
    <attr-result :data="result" />
  </div>
</template>

<script>
import AttrRadioButton from '../../../components/attributes/RadioButton'
import AttrIndicators from '../../../components/attributes/Indicators'
import AttrCheckbox from '../../../components/attributes/Checkbox'
import AttrSection from '../../../components/attributes/Section'
import AttrResult from '../../../components/attributes/Result'
import AttrAction from '../../../components/attributes/Action'
import AttrSelect from '../../../components/attributes/Select'
import AttrInput from '../../../components/attributes/Input'
import AttrCount from '../../../components/attributes/Count'
import AttrTag from '../../../components/attributes/Tag'
import VK from '../VK'

const SLEEP_DELETE_MIN = 1500
const SLEEP_DELETE_MAX = 2500

const SLEEP_GET_MIN = 500
const SLEEP_GET_MAX = 1500

const MAX_COUNT_WALL_API = VK.prototype.COUNT_WALL
// const MAX_COUNT_WALL_COMMENTS_API = VK.prototype.COUNT_WALL_COMMENTS

export default {
  components: {
    AttrTag, AttrCheckbox, AttrCount, AttrInput, AttrSelect, AttrRadioButton, AttrIndicators, AttrResult, AttrAction, AttrSection
  },
  data () {
    return {
      main: {
        owner_id: '',
        filter: {
          value: 'all',
          html: [
            { name: 'vk.wall.main_config.filter.items[0]', val: 'all' },
            { name: 'vk.wall.main_config.filter.items[1]', val: 'suggests' },
            { name: 'vk.wall.main_config.filter.items[2]', val: 'postponed' },
            { name: 'vk.wall.main_config.filter.items[3]', val: 'owner' },
            { name: 'vk.wall.main_config.filter.items[4]', val: 'others' }
          ]
        },
        count: {
          min: '1',
          max: '20'
        },
        isDeletePosts: {
          value: 1,
          html: [
            { name: 'vk.wall.main_config.is_delete_posts.items[0]', val: 1 },
            { name: 'vk.wall.main_config.is_delete_posts.items[1]', val: 0 }
          ]
        }
      },
      wall: {
        ids: {
          name: 'vk.wall.wall_config.ids.name',
          input: '',
          items: [],
          compareAll: false
        },
        fromIds: {
          name: 'vk.wall.wall_config.from_ids.name',
          input: '',
          items: [],
          compareAll: false
        },
        texts: {
          name: 'vk.wall.wall_config.texts.name',
          input: '',
          items: [],
          compareAll: false
        },
        attachments: {
          name: 'vk.wall.wall_config.attachments.name',
          items: [],
          compareAll: true
        },
        indicators: {
          name: 'vk.wall.wall_config.indicators.name',
          items: [
            { name: 'vk.wall.wall_config.indicators.items[0]', icon: 'comment-o', state: 0, count: 0 },
            { name: 'vk.wall.wall_config.indicators.items[1]', icon: 'heart-o', state: 0, count: 0 },
            { name: 'vk.wall.wall_config.indicators.items[2]', icon: 'bullhorn', state: 0, count: 0 },
            { name: 'vk.wall.wall_config.indicators.items[3]', icon: 'eye', state: 0, count: 0 }
          ],
          compareAll: true
        },
        reverse: false
      },
      comments: {
        fromIds: {
          name: 'vk.wall.comments_config.from_ids.name',
          input: '',
          items: [],
          compareAll: false
        },
        texts: {
          name: 'vk.wall.comments_config.texts.name',
          input: '',
          items: [],
          compareAll: false
        },
        attachments: {
          name: 'vk.wall.comments_config.attachments.name',
          items: [],
          compareAll: true
        },
        indicators: {
          name: 'vk.wall.comments_config.indicators.name',
          items: [{
            name: 'vk.wall.comments_config.indicators.items[0]',
            icon: 'heart-o',
            state: 0,
            count: 0
          }],
          compareAll: false
        },
        reverse: false
      },
      html: {
        attachments: [
          { name: 'vk.wall.html.attachments[0]', val: 'photo' },
          { name: 'vk.wall.html.attachments[1]', val: 'video' },
          { name: 'vk.wall.html.attachments[2]', val: 'audio' },
          { name: 'vk.wall.html.attachments[3]', val: 'doc' },
          { name: 'vk.wall.html.attachments[4]', val: 'link' },
          { name: 'vk.wall.html.attachments[5]', val: 'note' },
          { name: 'vk.wall.html.attachments[6]', val: 'poll' },
          { name: 'vk.wall.html.attachments[7]', val: 'page' },
          { name: 'vk.wall.html.attachments[8]', val: 'photos_list' },
          { name: 'vk.wall.html.attachments[9]', val: 'market' },
          { name: 'vk.wall.html.attachments[10]', val: 'market_album' }
        ]
      },
      result: [],
      loading: false
    }
  },
  computed: {
    user () {
      return this.$store.state.networks.vk.user
    },
    process () {
      return this.$store.state.networks.vk.process
    },
    ownerId () {
      return this.main.owner_id ? '-' + this.main.owner_id : this.user.id
    }
  },
  methods: {
    /* | -----------------------------------------------------------------------------
     * | API
     * | -----------------------------------------------------------------------------
     * |
     */
    async fetchWallGet (count = VK.prototype.COUNT_WALL, offset = this.main.count.min - 1) {
      const res = await VK.fetchWallGet(
        this.ownerId,
        this.main.filter.value,
        count,
        offset,
        SLEEP_GET_MIN,
        SLEEP_GET_MAX
      )

      return res
    },
    async fetchWallDelete (id) {
      const res = await VK.fetchWallDelete(id, this.ownerId, SLEEP_DELETE_MIN, SLEEP_DELETE_MAX)

      return res
    },
    async fetchCommentsGet (id, count = VK.prototype.COUNT_WALL_COMMENTS, offset = this.main.count.min - 1) {
      const res = await VK.fetchWallGetComments(id, this.ownerId, count, offset, true, SLEEP_GET_MIN, SLEEP_GET_MAX)

      return res
    },
    async fetchCommentDelete (id) {
      const res = await VK.fetchWallDeleteComment(id, this.ownerId, SLEEP_GET_MIN, SLEEP_GET_MAX)

      return res
    },

    /* | -----------------------------------------------------------------------------
     * | Start / Stop
     * | -----------------------------------------------------------------------------
     * |
     */
    async doStart () {
      if (this.main.isDeletePosts.value) {
        await VK.doStartDefault(this, MAX_COUNT_WALL_API)
      } else {
        // TODO await this.doStartPosts
      }
    },
    async doPreview () {
      if (this.main.isDeletePosts.value) {
        await VK.doPreviewDefault(this, MAX_COUNT_WALL_API)
      } else {
        // TODO await this.doPreviewComments()
      }
    },
    doStop () {
      VK.doStopDefault()
    },

    /* | -----------------------------------------------------------------------------
     * | Callback
     * | -----------------------------------------------------------------------------
     * |
     */
    async callbackGet (...params) {
      let res

      if (this.main.isDeletePosts.value) {
        res = await this.fetchWallGet(...params)
      } else {
        // res = await this.fetchCommentsGet(...params)
      }

      return res
    },
    async callbackDelete (item) {
      let res

      if (this.main.isDeletePosts.value) {
        res = await this.fetchWallDelete(item.id)
      } else {
        // res = await this.fetchCommentDelete(item.id) // TODO Check item.id*
      }

      return res
    },
    callbackCheck (...params) {
      return this.main.isDeletePosts.value ? this.checkPost(...params) : this.checkComment(...params)
    },

    /* | -----------------------------------------------------------------------------
     * | Check
     * | -----------------------------------------------------------------------------
     * |
     */
    checkPost (post, pushResult = true) {
      const attachments = typeof post.attachments === 'undefined' ? undefined : post.attachments.map(attachment => {
        return attachment.type
      })

      // Views undefined in old posts
      const indicators = [
        typeof post.comments === 'undefined' ? undefined : post.comments.count,
        typeof post.likes === 'undefined' ? undefined : post.likes.count,
        typeof post.reposts === 'undefined' ? undefined : post.reposts.count,
        typeof post.views === 'undefined' ? undefined : post.views.count
      ]

      const items = [
        { obj: this.wall.ids, method: this.checkNumber, param: post.id },
        { obj: this.wall.fromIds, method: this.checkNumber, param: post.from_id },
        { obj: this.wall.texts, method: this.checkText, param: post.text },
        { obj: this.wall.attachments, method: this.checkCheckbox, param: attachments },
        { obj: this.wall.indicators, method: this.checkIndicators, param: indicators }
      ]

      const checked = this.checkFinal(items, this.wall.reverse)

      if (pushResult) {
        this.pushResult(this.result, `ID: ${post.id}`, VK.getLinkWall(this.ownerId, post.id), items, checked)
      }

      return checked.result
    },
    checkComment (comment, pushResult = true) {
      const attachments = typeof comment.attachments === 'undefined' ? undefined : comment.attachments.map(attachment => {
        return attachment.type
      })

      const items = [
        { obj: this.comments.fromIds, method: this.checkNumber, param: comment.from_id },
        { obj: this.comments.texts, method: this.checkText, param: comment.text },
        { obj: this.comments.attachments, method: this.checkCheckbox, param: attachments },
        { obj: this.comments.indicators, method: this.checkIndicators, param: [comment.likes.count] }
      ]

      const checked = this.checkFinal(items, this.comments.reverse)

      if (pushResult) {
        this.pushResult(this.result, comment.text, '', items, checked)
      }

      return checked.result
    },

    // TODO doStartComments
    // TODO Rewritten more simple!!
    // TODO Move to class*
    async doPreviewComments () {
      // const countLoop = this.getCountLoop(this.main.count, MAX_COUNT_WALL_API)
      //
      // for (let i = 0; i < countLoop; i++) {
      //   const offset = i * MAX_COUNT_WALL_API
      //   const leftItems = this.main.count.max - offset
      //   const res = await this.fetchWallGet(leftItems > MAX_COUNT_WALL_API ? MAX_COUNT_WALL_API : leftItems, offset)
      //
      //   if (res.ok && res.body.response && res.body.response.items.length) {
      //     const len = res.body.response.items.length
      //     for (let j = 0; j < len; j++) {
      //       const post = res.body.response.items[j]
      //
      //       // COMMENTS SECTION
      //       if (this.checkPost(post, false)) {
      //         const commentsLength = post.comments.count
      //         const countLoopComments = this.getCountLoop({ min: 1, max: commentsLength }, MAX_COUNT_WALL_COMMENTS_API)
      //
      //         for (let k = 0; k < countLoopComments; k++) {
      //           const offsetComments = k * MAX_COUNT_WALL_COMMENTS_API
      //           const leftItemsComments = commentsLength - offsetComments
      //           const resComments = await this.fetchCommentsGet(
      //             post.id,
      //             leftItemsComments > MAX_COUNT_WALL_COMMENTS_API ? MAX_COUNT_WALL_COMMENTS_API : leftItemsComments,
      //             offsetComments
      //           )
      //
      //           if (resComments.ok && resComments.body.response && resComments.body.response.items.length) {
      //             resComments.body.response.items.forEach(item => this.checkComment(item))
      //           } else {
      //             return this.stop()
      //           }
      //         }
      //       }
      //     }
      //   } else {
      //     return this.stop()
      //   }
      // }
    },

    /* | -----------------------------------------------------------------------------
     * | Links
     * | -----------------------------------------------------------------------------
     * |
     */
    getLinkPost (id) {
      return VK.getLinkWall(this.ownerId, id)
    },
    getLinkPage (id) {
      return VK.getLinkPage(id)
    }
  }
}
</script>
