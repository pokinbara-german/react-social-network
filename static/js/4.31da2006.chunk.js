(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[4],{302:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var s=a(39),i=a(0),n=a(286),c=a(2),r=function(e){var t=Object(i.useRef)(null),a=Object(i.useState)(!0),r=Object(s.a)(a,2),o=r[0],d=r[1];return Object(i.useEffect)((function(){o&&setTimeout((function(){var e;null===(e=t.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"end"})}),500)}),[e.messages,o]),Object(c.jsxs)(n.a,{style:{height:e.height,overflowY:"auto",width:"100%"},onScroll:function(e){var t=e.currentTarget;t.scrollHeight-t.scrollTop===t.clientHeight?!o&&d(!0):o&&d(!1)},children:[e.messages,Object(c.jsx)("li",{ref:t})]})}},305:function(e,t,a){"use strict";var s=a(1),i=a(4),n=a(18),c=a(0),r=(a(3),a(5)),o=a(7),d=a(8),l=c.forwardRef((function(e,t){var a=e.classes,n=e.className,o=e.component,l=void 0===o?"div":o,u=e.disableGutters,b=void 0!==u&&u,j=e.fixed,p=void 0!==j&&j,h=e.maxWidth,m=void 0===h?"lg":h,g=Object(i.a)(e,["classes","className","component","disableGutters","fixed","maxWidth"]);return c.createElement(l,Object(s.a)({className:Object(r.a)(a.root,n,p&&a.fixed,b&&a.disableGutters,!1!==m&&a["maxWidth".concat(Object(d.a)(String(m)))]),ref:t},g))}));t.a=Object(o.a)((function(e){return{root:Object(n.a)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",paddingLeft:e.spacing(2),paddingRight:e.spacing(2),display:"block"},e.breakpoints.up("sm"),{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}),disableGutters:{paddingLeft:0,paddingRight:0},fixed:Object.keys(e.breakpoints.values).reduce((function(t,a){var s=e.breakpoints.values[a];return 0!==s&&(t[e.breakpoints.up(a)]={maxWidth:s}),t}),{}),maxWidthXs:Object(n.a)({},e.breakpoints.up("xs"),{maxWidth:Math.max(e.breakpoints.values.xs,444)}),maxWidthSm:Object(n.a)({},e.breakpoints.up("sm"),{maxWidth:e.breakpoints.values.sm}),maxWidthMd:Object(n.a)({},e.breakpoints.up("md"),{maxWidth:e.breakpoints.values.md}),maxWidthLg:Object(n.a)({},e.breakpoints.up("lg"),{maxWidth:e.breakpoints.values.lg}),maxWidthXl:Object(n.a)({},e.breakpoints.up("xl"),{maxWidth:e.breakpoints.values.xl})}}),{name:"MuiContainer"})(l)},309:function(e,t,a){"use strict";var s=a(20),i=a(21);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a(0)),c=(0,s(a(22)).default)(n.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),"ChevronLeft");t.default=c},316:function(e,t,a){"use strict";a.r(t);var s=a(15),i=a(61),n=a(0),c=a(75),r=a(286),o=a(121),d=a(291),l=a(186),u=a(188),b=a(305),j=a(107),p=a(2),h=function(){var e=Object(l.a)((function(e){return Object(u.a)({helperText:Object(i.a)({display:"flex",flexGrow:1,alignItems:"center",justifyContent:"center"},e.breakpoints.down("xs"),{display:"none"})})}))();return Object(p.jsx)(b.a,{className:e.helperText,children:Object(p.jsx)(j.a,{variant:"h4",color:"textSecondary",children:"Please click on user name to start dialog"})})},m=a(60),g=a(124),x=a(125),f=a(302),O=a(292),v=a(309),k=a.n(v),W=a(23),w=a(16),y=Object(l.a)((function(e){return Object(u.a)({messages:{flexGrow:1,width:"20%",margin:e.spacing(3)},goBackButtonWrapper:Object(i.a)({},e.breakpoints.up("sm"),{display:"none"})})})),I=function(e){var t,a=Object(s.d)(m.d),i=Object(s.d)(m.e),n=Object(s.d)(m.l),r=null===(t=Object(s.d)(m.m))||void 0===t?void 0:t.small,l=y(),u=Object(W.g)(),b=i.filter((function(t){return t.id===e.currentDialogId?t:void 0})),j=b.length?b[0].photos.small:null,h=a.map((function(e){var t=e.senderId===n,a=t?e.viewed?x.a.textWithOk(e.body):x.a.textWithWait(e.body):x.a.onlyText(e.body);return Object(p.jsx)(o.a,{postId:e.id,action:a,avatar:t?r||null:j,userName:"",rightSided:t},"Message"+e.id)}));return Object(p.jsxs)("div",{className:l.messages,children:[Object(p.jsxs)("div",{className:l.goBackButtonWrapper,children:[Object(p.jsx)(O.a,{onClick:function(){u.push("/".concat(Object(w.b)(w.c.dialogs.id)))},children:Object(p.jsx)(k.a,{})}),Object(p.jsx)(d.a,{})]}),Object(p.jsx)(f.a,{messages:h,height:"70vh"}),Object(p.jsx)(d.a,{}),Object(p.jsx)(g.a,{blockWidth:"30ch",sendMessage:c.f,buttonText:"Send",minTextLength:2})]})},N=a(132),L=function(e){var t=Object(s.c)(),a=e.match.params.userId?parseInt(e.match.params.userId):0,b=Object(l.a)((function(e){return Object(u.a)({dialogsWrapper:{display:"flex",margin:e.spacing(-3)},dialogs:Object(i.a)({display:"flex"},e.breakpoints.down("xs"),{display:a?"none":"flex",width:"100%"}),dialogsItems:{height:"90vh",overflowY:"auto",flexGrow:1,"& > li > div":{flexGrow:1}}})}))(),j=e.dialogsPage.userList.map((function(e){var t=e.newMessagesCount>0?Object(p.jsx)(N.a,{count:e.newMessagesCount,inCorner:!0}):void 0;return Object(p.jsx)(o.a,{postId:String(e.id),avatar:e.photos.small,userName:e.userName,userId:e.id,primaryLink:e.id!==a,action:t},"User"+e.id)}));return Object(n.useEffect)((function(){a&&(t(c.b.chatChanged(a)),t(Object(c.d)(a)))}),[a,t]),Object(n.useEffect)((function(){t(Object(c.c)())}),[]),Object(p.jsxs)("div",{className:b.dialogsWrapper,children:[Object(p.jsxs)("div",{className:b.dialogs,children:[Object(p.jsx)(r.a,{className:b.dialogsItems,children:j}),Object(p.jsx)(d.a,{orientation:"vertical"})]}),a?Object(p.jsx)(I,{currentDialogId:a}):Object(p.jsx)(h,{})]})},M=a(141);t.default=Object(s.b)((function(e){return{dialogsPage:e.dialogsPage}}),{})(Object(W.h)(Object(M.a)(L)))}}]);
//# sourceMappingURL=4.31da2006.chunk.js.map