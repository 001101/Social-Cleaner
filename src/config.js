import { ICON_TOKEN, ICON_WALL } from './heplers/logs'

export const version = require('../package').version

/* | ---------------------------------------------------------
 * | Social Networks
 * | ---------------------------------------------------------
 * |
 */

export const facebook = {
  name: 'Facebook',
  to: '/facebook',
  domain: 'facebook.com',
  url: 'https://facebook.com/',
  wallpaper: require('@/assets/twitter/wallpaper.jpg'),
  icon: 'fa-facebook',
  disabled: true
}

export const twitter = {
  name: 'Twitter',
  to: '/twitter',
  domain: 'twitter.com',
  url: 'https://twitter.com/',
  wallpaper: require('@/assets/facebook/wallpaper.jpg'),
  icon: 'fa-twitter',
  disabled: true
}

export const vk = {
  name: 'Vkontakte',
  to: '/vk',
  domain: 'vk.com',
  url: 'https://vk.com/',
  wallpaper: require('@/assets/vk/wallpaper.jpg'),
  icon: 'fa-vk',
  sections: [
    { name: 'Token', to: 'vk-token', icon: ICON_TOKEN },
    { name: 'Wall', to: 'vk-wall', icon: ICON_WALL }
  ]
}

export const networks = [
  facebook,
  twitter,
  vk
]