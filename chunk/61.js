(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{"114":function(e,n,t){"use strict";t.r(n),t.d(n,"taro_rich_text_core",(function(){return a}));var i=t(6),o=t(29),a=function(){function r(e){var n=this;Object(o.g)(this,e),this.renderNode=function(e){if("type"in e&&"text"===e.type)return(e.text||"").replace(/&nbsp;/g," ");if("name"in e&&e.name){var t=e.name,a=e.attrs,c=e.children,u={},s=[];if(a&&"object"===Object(i.a)(a)){var p=function f(e){var n=a[e];if("style"===e&&"string"==typeof n){var t=n.split(";").map((function(e){return e.trim()})).filter((function(e){return e})),i={};return t.forEach((function(e){if(e){var n=/(.+): *(.+)/g.exec(e);if(n){var t=n[1],o=n[2],a=t.replace(/-([a-z])/g,(function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return e[1].toUpperCase()}));i[a]=o}}})),Object.keys(i).length&&(u.style=i),"continue"}u[e]=n};for(var l in a)p(l)}return c&&c.length&&(s=c.map((function(e){return n.renderNode(e)}))),Object(o.e)(t,u,s)}return null}}return r.prototype.render=function(){var e=this.nodes,n=this.renderNode;return Array.isArray(e)?Object(o.e)(o.a,null,e.map((function(e){return n(e)}))):Object(o.e)(o.a,{"innerHTML":e})},r}()}}]);