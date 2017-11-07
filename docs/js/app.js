webpackJsonp([10],{42:function(t,e,n){"use strict";var o=n(7),s=n(13),a=n(88),i=n(89);o.a.use(s.a),e.a=new s.a.Store({modules:{vk:a.a,templates:i.a}})},50:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(51),s=n.n(o),a=n(7),i=n(13),r=n(83),c=n(29),u=n(85),l=n(42),f=n(92),m=(n.n(f),n(94));n.n(m);n(75),n(77),n(80),a.a.config.productionTip=!1,a.a.use(c.y),a.a.use(i.a),a.a.use(r.a),n(90),a.a.http.interceptor.before=function(t,e){t.emulateJSON=!0,t.emulateHTTP=!0,e(function(t){var e=t.body;if("string"==typeof t.body)try{e=JSON.parse(t.body)}catch(t){return console.log("Error: Response is not JSON format")}else if("object"!==s()(t.body))return console.log("Error: Response format");t.url.indexOf("api.vk.com")>-1&&e.error&&5===e.error.error_code&&l.a.state.vk.user&&(l.a.dispatch("exit"),u.a.push({name:"vk-token"}))})},c.y.start(function(){new a.a({el:"#q-app",router:u.a,store:l.a,render:function(t){return t(n(96).default)}})})},75:function(t,e){},79:function(t,e){},80:function(t,e){},84:function(t,e){},85:function(t,e,n){"use strict";function o(t){return function(){return n(87)("./"+t+".vue")}}var s=n(7),a=n(86);s.a.use(a.a);var i=new a.a({mode:"history",scrollBehavior:function(){return{y:0}},routes:[{path:"/",name:"dashboard",component:o("Dashboard")},{path:"/vk",name:"vk-dashboard",component:o("vk/Dashboard"),children:[{path:"token",name:"vk-token",component:o("vk/Token")},{path:"friends",name:"vk-friends",component:o("vk/Friends")},{path:"wall",name:"vk-wall",component:o("vk/Wall")},{path:"docs",name:"vk-docs",component:o("vk/Docs")}]},{path:"*",name:"error404",component:o("Error404")}]});i.beforeResolve(function(t,e,n){n()}),e.a=i},87:function(t,e,n){function o(t){var e=s[t];return e?n.e(e[1]).then(function(){return n(e[0])}):Promise.reject(new Error("Cannot find module '"+t+"'."))}var s={"./Dashboard.vue":[103,8],"./Error404.vue":[104,2],"./vk/Dashboard.vue":[105,1],"./vk/Docs.vue":[106,5],"./vk/Friends.vue":[107,4],"./vk/Token.vue":[108,3],"./vk/Wall.vue":[109,0],"./vk/templates/LeftSide.vue":[99,7],"./vk/templates/RightSide.vue":[100,6]};o.keys=function(){return Object.keys(s)},o.id=87,t.exports=o},88:function(t,e,n){"use strict";var o=n(7),s=n(13);o.a.use(s.a);var a={token:null,user:{},access:{friends:!1,photos:!1,video:!1,status:!1,messages:!1,wall:!1,docs:!1,groups:!1},log:[]},i={VK_SET_TOKEN:function(t,e){t.token=e},VK_CLEAR_TOKEN:function(t){t.token=null},VK_SET_PERMISSIONS:function(t,e){t.access.friends=!!(2&e),t.access.photos=!!(4&e),t.access.video=!!(16&e),t.access.status=!!(1024&e),t.access.messages=!!(4096&e),t.access.wall=!!(8192&e),t.access.docs=!!(1311072&e),t.access.groups=!!(262144&e)},VK_CLEAR_PERMISSIONS:function(t){t.access.friends=!1,t.access.photos=!1,t.access.video=!1,t.access.status=!1,t.access.messages=!1,t.access.wall=!1,t.access.docs=!1,t.access.groups=!1},VK_SET_USER:function(t,e){t.user=e},VK_CLEAR_USER:function(t){t.user={}},VK_ADD_LOG:function(t,e){t.log.unshift(e)},VK_CLEAR_LOG:function(t){t.log=[]},VK_COUNTER_USER_DECREMENT:function(t,e){var n=t.user.counters[e];o.a.set(t.user.counters,e,n&&n>0?--n:0)},VK_SET_USER_COUNTER:function(t,e){o.a.set(t.user.counters,e.key,e.val)}},r={vkSetToken:function(t,e){(0,t.commit)("VK_SET_TOKEN",e)},vkSetPermissions:function(t,e){(0,t.commit)("VK_SET_PERMISSIONS",e)},vkSetUser:function(t,e){(0,t.commit)("VK_SET_USER",e)},vkCounterUserDecrement:function(t,e){(0,t.commit)("VK_COUNTER_USER_DECREMENT",e)},vkSetUserCounter:function(t,e){(0,t.commit)("VK_SET_USER_COUNTER",e)},vkAddLog:function(t,e){(0,t.commit)("VK_ADD_LOG",e)},vkExit:function(t){var e=t.commit;e("VK_CLEAR_TOKEN"),e("VK_CLEAR_USER"),e("VK_CLEAR_PERMISSIONS"),e("VK_CLEAR_LOG")}};e.a={state:a,mutations:i,actions:r}},89:function(t,e,n){"use strict";var o=n(7),s=n(13);o.a.use(s.a);var a={subTitle:"",leftSide:null,rightSide:null},i={SET_SUB_TITLE:function(t,e){t.subTitle=e},CLEAR_SUB_TITLE:function(t){t.subTitle=""},SET_LEFT_SIDE:function(t,e){t.leftSide=e},CLEAR_LEFT_SIDE:function(t){t.leftSide=null},SET_RIGHT_SIDE:function(t,e){t.rightSide=e},CLEAR_RIGHT_SIDE:function(t){t.rightSide=null}},r={setTemplateSubTitle:function(t,e){(0,t.commit)("SET_SUB_TITLE",e)},clearTemplateSubTitle:function(t){(0,t.commit)("CLEAR_SUB_TITLE")},setTemplateLeftSide:function(t,e){(0,t.commit)("SET_LEFT_SIDE",e)},clearTemplateLeftSide:function(t){(0,t.commit)("CLEAR_LEFT_SIDE")},setTemplateRightSide:function(t,e){(0,t.commit)("SET_RIGHT_SIDE",e)},clearTemplateRightSide:function(t){(0,t.commit)("CLEAR_RIGHT_SIDE")}};e.a={state:a,mutations:i,actions:r}},91:function(t,e){},93:function(t,e){},95:function(t,e){},96:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(97),s=n(98),a=n(41),i=a(o.a,s.a,!1,null,null,null);e.default=i.exports},97:function(t,e,n){"use strict";var o=n(29);e.a={components:{QLayout:o.l,QToolbar:o.v,QToolbarTitle:o.w,QSearch:o.r,QTabs:o.u,QRouteTab:o.p,QBtn:o.b,QIcon:o.f,QItemSide:o.j,QItemMain:o.i,QSideLink:o.s,QListHeader:o.n,QScrollArea:o.q,QList:o.m,QChip:o.c,QItem:o.h,QItemTile:o.k},methods:{linkGithub:function(){return window.open("https://github.com/Alexeykhr/Social-Cleaner","_blank")},linkVk:function(){return this.$router.push({name:"vk-dashboard"})},linkBasic:function(){return this.$router.push({name:"dashboard"})}}}},98:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-layout",{ref:"layout",attrs:{id:"q-app",view:"hHh LpR fff","right-breakpoint":1100}},[n("q-toolbar",{attrs:{slot:"header"},slot:"header"},[n("q-btn",{attrs:{flat:"",disabled:!t.$store.state.templates.leftSide},on:{click:function(e){t.$refs.layout.toggleLeft()}}},[n("q-icon",{attrs:{name:"menu"}})],1),t._v(" "),n("q-toolbar-title",[t._v("\n      Social Cleaner\n      "),t.$store.state.templates.subTitle?n("span",{attrs:{slot:"subtitle"},slot:"subtitle"},[t._v("\n        "+t._s(t.$store.state.templates.subTitle)+"\n      ")]):t._e()]),t._v(" "),n("q-btn",{attrs:{flat:""},nativeOn:{click:function(e){t.linkBasic(e)}}},[n("q-icon",{attrs:{name:"home"}})],1),t._v(" "),n("q-btn",{attrs:{flat:""},nativeOn:{click:function(e){t.linkVk(e)}}},[n("q-icon",{attrs:{name:"fa-vk"}})],1),t._v(" "),n("q-btn",{attrs:{flat:"",disabled:!t.$store.state.templates.rightSide},on:{click:function(e){t.$refs.layout.toggleRight()}}},[n("q-icon",{attrs:{name:"menu"}})],1)],1),t._v(" "),t.$store.state.templates.leftSide?n("div",{attrs:{slot:"left"},slot:"left"},[n("keep-alive",[n(t.$store.state.templates.leftSide,{tag:"component"})],1)],1):t._e(),t._v(" "),t.$store.state.templates.rightSide?n("div",{attrs:{slot:"right"},slot:"right"},[n("keep-alive",[n(t.$store.state.templates.rightSide,{tag:"component"})],1)],1):t._e(),t._v(" "),n("router-view"),t._v(" "),n("q-toolbar",{attrs:{slot:"footer"},slot:"footer"},[n("q-toolbar-title",[n("q-btn",{attrs:{flat:""},nativeOn:{click:function(e){t.linkGithub(e)}}},[n("q-icon",{attrs:{name:"fa-github"}})],1)],1)],1)],1)},s=[],a={render:o,staticRenderFns:s};e.a=a}},[50]);