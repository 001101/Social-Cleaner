(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{ccP7:function(e,t,n){"use strict";n.r(t);var i={props:{obj:{type:Object,required:!0},name:{type:String,required:!0},html:{type:Array,required:!0},info:{type:String,required:!1},size:{type:String,required:!1,default:"normal"},process:{type:Boolean,required:!1}},data:function(){return{input:this.model}},watch:{input:function(){this.$emit("update:model",this.input)}}},r=n("KHd+"),a=Object(r.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"block__attr"},[n("p",[e._v(e._s(e.$t(e.name)))]),e._v(" "),n("at-select",{attrs:{disabled:e.process,size:e.size},model:{value:e.obj.value,callback:function(t){e.$set(e.obj,"value",t)},expression:"obj.value"}},e._l(e.html,function(t){return n("at-option",{key:t.val,attrs:{value:t.val}},[e._v("\n      "+e._s(e.$t(t.name))+"\n    ")])})),e._v(" "),e.info?n("small",[e._v(e._s(e.$t(e.info)))]):e._e()],1)},[],!1,null,null,null);t.default=a.exports}}]);
//# sourceMappingURL=16.9042bd2e35efadf44280.js.map