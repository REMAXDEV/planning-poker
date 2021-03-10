(this["webpackJsonpplanning-poker"]=this["webpackJsonpplanning-poker"]||[]).push([[0],{21:function(e,t,n){"use strict";var s=n(24),a=n(25),c=new(function(){function e(t){Object(s.a)(this,e),this.client=t}return Object(a.a)(e,[{key:"log",value:function(e){this.client.log(e)}}]),e}())({prod:!0,log:function(e){this.prod||console.log(e)}});t.a=c},49:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),c=n(14),i=n.n(c),r=n(7),o=n(18);function l(e){return e.split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.substring(1)})).join(" ")}function u(e){return(e||"").trim().toLowerCase()}var d="myName",m="trackCheating",h=Object(o.b)({name:"user",initialState:{userName:localStorage.getItem(d)||"",trackCheating:!!localStorage.getItem(m)},reducers:{setUserName:function(e,t){var n=u(t.payload);localStorage.setItem(d,n),e.userName=n},setTrackCheating:function(e,t){localStorage.setItem(m,t.payload),e.trackCheating=t.payload}}}),j=h.actions,b=j.setUserName,f=j.setTrackCheating,p=h.reducer,x=n(33),O="room",v=Object(o.b)({name:"session",initialState:{sessionName:localStorage.getItem(O)||"",confetti:!1,data:{showPoints:0,players:{}}},reducers:{setSessionName:function(e,t){var n=u(t.payload);localStorage.setItem(O,n),e.sessionName=n},setData:function(e,t){e.data=Object(x.a)(Object(x.a)({},e.data),t.payload)},setConfetti:function(e,t){e.confetti=!!t.payload}}}),g=v.actions,N=g.setSessionName,y=g.setData,k=g.setConfetti,_=v.reducer,w=Object(o.a)({devTools:!1,reducer:{user:p,session:_}}),S=n(22),C=n(5),P=(n(49),n(2));var I=function(){var e=Object(r.c)((function(e){return e.user.userName}));return Object(P.jsx)("nav",{className:"navbar navbar-dark bg-dark __header",children:Object(P.jsxs)("div",{className:"container-fluid",children:[Object(P.jsxs)("a",{className:"navbar-brand",href:"#/",title:"Back To Sign In Page",children:[Object(P.jsx)("img",{src:"img/favicon-192x192.png",alt:"logo",className:"d-inline-block align-top me-2 __header__logo"}),"Planning Poker"]}),Object(P.jsxs)("div",{className:"navbar-text",children:[Object(P.jsx)("img",{className:"__header__profile",alt:"profile",src:"img/profile.svg"}),Object(P.jsx)("span",{className:"ms-1",children:l(e)||"Guest"})]})]})})},A=n(15);var D=function(){var e=Object(r.b)(),t=Object(C.f)(),n=Object(r.c)((function(e){return e.session.sessionName})),a=Object(r.c)((function(e){return e.user.userName})),c=Object(s.useState)(n),i=Object(A.a)(c,2),o=i[0],l=i[1],d=Object(s.useState)(a),m=Object(A.a)(d,2),h=m[0],j=m[1];return Object(P.jsxs)("div",{className:"py-5",children:[Object(P.jsx)("h1",{className:"mb-5 text-center text-white",children:"Sign In"}),Object(P.jsxs)("form",{className:"w-50 mx-auto text-light",onSubmit:function(n){n.preventDefault(),o&&h&&(e(b(h)),t.push("/".concat(o)))},children:[Object(P.jsxs)("div",{className:"mb-3",children:[Object(P.jsx)("label",{htmlFor:"room",className:"form-label",children:"Session Name"}),Object(P.jsx)("input",{type:"text",className:"form-control",required:!0,id:"session_name",name:"session_name",placeholder:"e.g. avengers/fantastic4...",value:o,onChange:function(e){return l(u(e.target.value))}})]}),Object(P.jsxs)("div",{className:"mb-4",children:[Object(P.jsx)("label",{htmlFor:"username",className:"form-label",children:"Your Nickname"}),Object(P.jsx)("input",{type:"text",className:"form-control",required:!0,id:"user_name",name:"user_name",placeholder:"Please pick a unique nickname...",value:h,onChange:function(e){return j(u(e.target.value))}})]}),Object(P.jsxs)("div",{children:[Object(P.jsx)("button",{type:"submit",className:"btn btn-primary px-4",children:"Join Session"}),Object(P.jsx)("span",{className:"me-2 ms-3",children:"OR"}),Object(P.jsx)("a",{className:"text-primary",href:"#/".concat(o,"?observer"),children:"Join As Observer"})]})]})]})};var L=n(24),F=n(25),T=n(32),V=(n(54),n(21)),B=new(function(){function e(t){Object(L.a)(this,e),T.a.initializeApp(t),this.db=T.a.database(),this.sessionName="",this.userName="",V.a.log("new FirebaseClient()")}return Object(F.a)(e,[{key:"signIn",value:function(e,t){var n=this;(console.info("DB connected"),this.online(),this.sessionName=e,this.userName=t,this.userName)&&(this.setPoint(0),this.db.ref(".info/connected").on("value",(function(e){if(!0===e.val()){var t=n.db.ref(n.sessionName+"/players/"+n.userName+"/connected");t.onDisconnect().remove(),t.set(!0)}})))}},{key:"setPoint",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n={"/point":e,"/connected":!0,"/cheated":t};this.db.ref(this.sessionName+"/players/"+this.userName).update(n).catch(this.errorHandler)}},{key:"clearVotes",value:function(){var e=this;this.db.ref(this.sessionName).once("value").then((function(t){var n=t.val(),s={time:(new Date).toISOString(),showPoints:0,players:{}};for(var a in n.players)s.players[a]={point:0,cheated:!1,connected:!!n.players[a].connected};e.db.ref(e.sessionName).set(s).catch(e.errorHandler)})).catch(this.errorHandler)}},{key:"showVotes",value:function(){this.db.ref(this.sessionName+"/showPoints").set(1).catch(this.errorHandler)}},{key:"deletePlayer",value:function(e){e&&this.db.ref(this.sessionName+"/players/"+e).remove().catch(this.errorHandler)}},{key:"attachListener",value:function(e){this.db.ref(this.sessionName).off(),this.db.ref(this.sessionName).on("value",e),console.info("Watching session: "+this.sessionName)}},{key:"detachListener",value:function(){this.db.ref(this.sessionName).off(),this.db.ref(".info/connected").off(),console.info("Detach listener: "+this.sessionName)}},{key:"online",value:function(){this.db.goOnline()}},{key:"offline",value:function(){console.info("DB disconnected"),this.db.goOffline()}},{key:"errorHandler",value:function(e){console.error(e)}}]),e}())({apiKey:"AIzaSyAW076Ai3lOBhONLt8pKfUA0jedjf5A7RY",authDomain:"planning-poker-remax.firebaseapp.com",databaseURL:"https://planning-poker-remax.firebaseio.com",projectId:"planning-poker-remax",storageBucket:"planning-poker-remax.appspot.com",messagingSenderId:"1050364771989",appId:"1:1050364771989:web:a5c621b239496dfaf9e59c"}),H=n(65);n(56);function E(e){var t=e.name,n=e.player,s=e.showPoints;V.a.log("Player render()");var a="none";n.connected?s?a="front":0!==n.point&&(a="back"):a="offline";var c=Object(r.c)((function(e){return e.user})),i=s&&n.cheated&&n.connected;return Object(P.jsxs)("div",{className:"text-center __player",onContextMenu:function(e){var n;e.preventDefault(),n=t,window.confirm('Remove player "'+n+'" ?')&&B.deletePlayer(n)},children:[Object(P.jsx)("div",{className:"mx-auto __player__container",children:Object(P.jsxs)("div",{className:"__player__container__warpper",children:[Object(P.jsx)(H.a,{in:"offline"===a,unmountOnExit:!0,exit:!1,timeout:300,classNames:"card",children:Object(P.jsx)("img",{src:"img/offline.png"})}),Object(P.jsx)(H.a,{in:"back"===a,unmountOnExit:!0,exit:!1,timeout:300,classNames:"card",children:Object(P.jsx)("img",{src:"img/back.png"})}),Object(P.jsx)(H.a,{in:"front"===a,unmountOnExit:!0,exit:!1,timeout:300,classNames:"card",children:Object(P.jsx)("img",{src:"img/".concat(n.point,".png")})}),c.trackCheating&&i&&Object(P.jsx)("img",{src:"img/cheat.gif",width:"62",title:"Vote has been changed. It's magic!"})]})}),Object(P.jsx)("div",{className:"".concat(c.userName===t?"text-warning":""," __player__name"),children:l(t)})]})}function J(e,t){return JSON.stringify(e)===JSON.stringify(t)}var U=a.a.memo(E,J);n(57);var R=function(e){var t=e.players,n=e.showPoints,s=Object.keys(t).map((function(e){return Object(P.jsx)(U,{name:e,player:t[e],showPoints:n},e)})),a="sm";return s.length>=9&&s.length<=10?a="md":s.length>=11&&(a="lg"),Object(P.jsx)("div",{className:"w-100 h-100 d-flex flex-wrap justify-content-around align-items-center mx-auto __table--".concat(a),children:s})},q=(n(58),[.5,1,2,3,5,8,13,-1]);function z(e){var t=e.userPoint,n=e.showPoints,s=q.map((function(e){return Object(P.jsx)("a",{className:"__cards__card ".concat(t===e?"__cards__card--active":""),onClick:function(){return B.setPoint(e,t!==e&&n)},onContextMenu:function(){},children:Object(P.jsx)("img",{className:"position-relative",src:"img/".concat(e,".png"),alt:e})},e)}));return Object(P.jsx)("div",{className:"d-flex justify-content-center __cards",children:s})}var M=a.a.memo(z);function Y(){return Object(P.jsx)("div",{className:"d-flex justify-content-center",children:Object(P.jsx)("div",{className:"spinner-border",role:"status",children:Object(P.jsx)("span",{className:"visually-hidden",children:"Loading..."})})})}var K=a.a.memo(Y),W=(n(59),a.a.lazy((function(){return Promise.all([n.e(2),n.e(4)]).then(n.bind(null,197))})));var G=function(e){var t=e.match,n=e.location,a=Object(r.b)(),c=Object(C.f)(),i=u(t.params.sessionName),o=0===n.search.indexOf("?observer"),d=Object(s.useState)(!1),m=Object(A.a)(d,2),h=m[0],j=m[1],b=Object(s.useState)(null),p=Object(A.a)(b,2),x=p[0],O=p[1],v=Object(s.useState)(!1),g=Object(A.a)(v,2),_=g[0],w=g[1],S=Object(r.c)((function(e){return e.session.data})),I=Object(r.c)((function(e){return o?"":e.user.userName})),D=Object(r.c)((function(e){return e.user.trackCheating}));return Object(s.useEffect)((function(){if(i&&(I||o))return a(N(i)),B.signIn(i,I),B.attachListener((function(e){console.log("Session data updated");var t=e.val();a(y(t));var n,s=!!t.showPoints||(n=t.players,0===Object.values(n).filter((function(e){return 0===e.point})).length);j(s),O(function(e,t){return e&&e[t]?e[t].point:null}(t.players,I)),s&&function(e){var t=Object.values(e).filter((function(e){return e.connected&&e.point>=0}));return t.length>=2&&t[0].point>0&&t.every((function(e){return e.point===t[0].point}))}(t.players)&&(a(k(!0)),window.setTimeout((function(){return a(k(!1))}),5e3))})),function(){B.detachListener(),B.offline()};c.push("/")}),[a,c,i,I,o]),Object(P.jsxs)("div",{className:"__room",style:{backgroundImage:"url(".concat("/planning-poker","/img/poker-desk.jpg)")},children:[Object(P.jsxs)("div",{className:"d-flex align-items-center justify-content-center __room__session",children:[Object(P.jsx)("h1",{className:"text-white mb-0",children:l(i)}),Object(P.jsx)("div",{className:"ms-3 d-none",children:Object(P.jsxs)("select",{className:"form-select form-select-sm bg-light text-center",defaultValue:"Standard",children:[Object(P.jsx)("option",{value:"Standard",children:"Standard"}),Object(P.jsx)("option",{value:"Cheater",children:"Cheater"})]})})]}),Object(P.jsx)("div",{className:"mx-auto __room__table",children:Object(P.jsx)(R,{players:S.players||{},showPoints:h})}),!o&&Object(P.jsxs)("div",{className:"row",children:[Object(P.jsx)("div",{className:"col-2",children:Object(P.jsx)("button",{className:"btn btn-secondary w-100",onClick:function(){return B.clearVotes()},children:"Clear Votes"})}),Object(P.jsx)("div",{className:"col-8",children:Object(P.jsx)(M,{userPoint:x,showPoints:h})}),Object(P.jsx)("div",{className:"col-2",children:Object(P.jsx)("button",{className:"btn btn-secondary w-100",onClick:function(){return B.showVotes()},children:"Show Votes"})})]}),o&&Object(P.jsx)("div",{className:"mt-4 pt-5",children:Object(P.jsx)("h4",{className:"text-center text-light --with-dash",children:"You are an observer of this session"})}),Object(P.jsxs)("div",{className:"mt-5 text-secondary text-center",children:[Object(P.jsx)("h4",{className:"--with-dash",children:"Setting & Help"}),Object(P.jsxs)("div",{className:"d-flex justify-content-center",children:[Object(P.jsxs)("div",{className:"form-check form-switch mx-2",children:[Object(P.jsx)("input",{className:"form-check-input",type:"checkbox",id:"checkboxAnalytics",checked:_,onChange:function(e){return w(e.target.checked)}}),Object(P.jsx)("label",{className:"form-check-label",htmlFor:"checkboxAnalytics",children:"Show analytics"})]}),Object(P.jsxs)("div",{className:"form-check form-switch mx-2",children:[Object(P.jsx)("input",{className:"form-check-input",type:"checkbox",id:"checkboxCheating",checked:D,onChange:function(e){return a(f(e.target.checked))}}),Object(P.jsx)("label",{className:"form-check-label",htmlFor:"checkboxCheating",children:"Track cheating"})]}),Object(P.jsxs)("div",{children:[Object(P.jsx)("span",{className:"ms-2 me-3",children:"|"}),"To remove a player, right click the name"]})]})]}),_&&Object(P.jsx)(s.Suspense,{fallback:Object(P.jsx)(K,{}),children:Object(P.jsxs)("div",{className:"mt-5 text-secondary ",children:[Object(P.jsx)("h4",{className:"text-center --with-dash",children:"Analytics"}),Object(P.jsx)(W,{sessionName:i})]})})]})},Q=n(37);var X=function(e,t){return function(){return Object(r.c)((function(e){var n=e;return t.split(".").forEach((function(e){return n=n[e]})),n}))?Object(P.jsx)(e,{}):null}};n(60);var Z=X((function(){var e=Object(Q.a)(Array(20).keys()).map((function(e){return Object(P.jsx)("div",{className:"__confetti__piece"},e)}));return Object(P.jsx)("div",{className:"__confetti",children:e})}),"session.confetti");n(61);var $=function(){return Object(P.jsx)("div",{className:"mx-auto shadow position-relative __app",children:Object(P.jsxs)(S.a,{children:[Object(P.jsx)(I,{}),Object(P.jsx)("div",{className:"position-relative",children:Object(P.jsxs)(C.c,{children:[Object(P.jsx)(C.a,{path:"/",exact:!0,component:D}),Object(P.jsx)(C.a,{path:"/:sessionName",component:G})]})}),Object(P.jsx)(Z,{})]})})},ee=function(e){e&&e instanceof Function&&n.e(5).then(n.bind(null,196)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),s(e),a(e),c(e),i(e)}))};n(62);i.a.render(Object(P.jsx)(a.a.StrictMode,{children:Object(P.jsx)(r.a,{store:w,children:Object(P.jsx)($,{})})}),document.getElementById("root")),ee()}},[[63,1,3]]]);
//# sourceMappingURL=main.8aa4e8fd.chunk.js.map