(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"195":function(e,t,n){},"207":function(e,t,n){"use strict";n.r(t);var c=n(9),o=n(2),a=n(128),s=n(132),r=n(129),i=(n(195),n(35)),l=["转换为大写","转换为小写"];t.default=function Index(){var e=Object(o.useState)(0),t=Object(c.a)(e,2),n=t[0],u=t[1],j=Object(o.useState)(""),b=Object(c.a)(j,2),d=b[0],p=b[1],O=Object(o.useState)(""),C=Object(c.a)(O,2),f=C[0],h=C[1],x=function reset(){h("")};return Object(i.jsxs)(a.h,{"className":"case-conversion","children":[Object(i.jsx)(s.i,{"title":"英文大小写转换"}),Object(i.jsx)(s.j,{"range":l,"selectorChecked":l[n],"onChange":function onChange(e){var t=e.index,n=void 0===t?0:t;x(),u(parseInt(n))}}),Object(i.jsx)(s.l,{"style":"margin-top:-10px","placeholder":"请输入待转换文本...","onInput":function onInput(e){var t=e.content;p(t)},"onClickClear":function onClickClear(){x()}}),Object(i.jsx)(s.b,{"name":"转换","backgroundColor":"#1E90FF","onClick":function doConver(){if(d){for(var e=/[a-zA-Z]/,t="",c=0;c<d.length-1;c++)e.test(d[c])?t+=0===n?d[c].toLocaleUpperCase():d[c].toLocaleLowerCase():t+=d[c];h(t)}else Object(r.j)("请输入待转换文本")}}),Object(o.useMemo)((function(){return Object(i.jsx)(s.l,{"placeholder":"无","disabled":!0,"isHidePasteBtn":!0,"isHideClearBtn":!0,"currentValue":f})}),[f])]})}}}]);