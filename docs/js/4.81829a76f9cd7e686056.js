webpackJsonp([4],{109:function(e,t,s){"use strict";var n=s(28),r=s(41);t.a={data:function(){return{docs:{}}},created:function(){this.fetchGetDocs()},methods:{fetchGetDocs:function(){var e=this;Object(r.b)("docs.get",{access_token:this.$store.state.vk.token}).then(function(t){t.body.response?(e.docs=t.body.response,e.$store.state.vk.user.counters.docs=t.body.response.count):n.x.create.negative({html:t.body.error.error_msg})},function(e){n.x.create.negative({html:"Error from VK"})})}}}},110:function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement;return(e._self._c||t)("span",[e._v(e._s(e.docs))])},r=[],o={render:n,staticRenderFns:r};t.a=o},96:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(109),r=s(110),o=s(40),c=o(n.a,r.a,!1,null,null,null);t.default=c.exports}});