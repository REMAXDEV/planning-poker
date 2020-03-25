(function(t){function e(e){for(var o,s,c=e[0],i=e[1],l=e[2],m=0,p=[];m<c.length;m++)s=c[m],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&p.push(a[s][0]),a[s]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o]);u&&u(e);while(p.length)p.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,c=1;c<n.length;c++){var i=n[c];0!==a[i]&&(o=!1)}o&&(r.splice(e--,1),t=s(s.s=n[0]))}return t}var o={},a={app:0},r=[];function s(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=o,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(n,o,function(e){return t[e]}.bind(null,o));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/planning-poker/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],i=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=i;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"17eb":function(t,e,n){"use strict";var o=n("a699"),a=n.n(o);a.a},"5c0b":function(t,e,n){"use strict";var o=n("9c0c"),a=n.n(o);a.a},"9c0c":function(t,e,n){},a699:function(t,e,n){},c583:function(t,e,n){},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("a026"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mx-auto bg-light shadow-sm",attrs:{id:"app"}},[n("header-component"),n("router-view")],1)},r=[],s=n("d4ec"),c=n("2caf"),i=n("262e"),l=n("9ab4"),u=n("60a3"),m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",{staticClass:"navbar navbar-dark bg-dark"},[n("router-link",{staticClass:"navbar-brand",attrs:{to:"/"}},[n("img",{staticClass:"d-inline-block align-top mr-2",attrs:{src:"img/logo.png"}}),t._v(" Planning Poker ")])],1)},p=[],f=function(t){Object(i["a"])(n,t);var e=Object(c["a"])(n);function n(){return Object(s["a"])(this,n),e.apply(this,arguments)}return n}(u["c"]);f=Object(l["__decorate"])([u["a"]],f);var b=f,d=b,h=n("2877"),v=Object(h["a"])(d,m,p,!1,null,"2d5bbbf2",null),y=v.exports,_=function(t){Object(i["a"])(n,t);var e=Object(c["a"])(n);function n(){return Object(s["a"])(this,n),e.apply(this,arguments)}return n}(u["c"]);_=Object(l["__decorate"])([Object(u["a"])({components:{HeaderComponent:y}})],_);var g=_,j=g,O=(n("5c0b"),Object(h["a"])(j,a,r,!1,null,null,null)),w=O.exports,k=n("8c4f"),C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"p-5"},[n("h1",{staticClass:"mb-4 text-center"},[t._v("Sign In")]),n("form",{on:{submit:t.onSubmit}},[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"exampleInputEmail1"}},[t._v("Session Name")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.room,expression:"room"}],staticClass:"form-control",attrs:{type:"text",placeholder:"e.g. remax/motto..."},domProps:{value:t.room},on:{input:function(e){e.target.composing||(t.room=e.target.value)}}})]),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"exampleInputPassword1"}},[t._v("Your Name")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.myName,expression:"myName"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.myName},on:{input:function(e){e.target.composing||(t.myName=e.target.value)}}})]),t._m(0)])])},P=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mt-4"},[n("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Join Session")])])}],x=(n("498a"),n("bee2")),N=function(t){Object(i["a"])(n,t);var e=Object(c["a"])(n);function n(){var t;return Object(s["a"])(this,n),t=e.apply(this,arguments),t.room="",t.myName="",t}return Object(x["a"])(n,[{key:"mounted",value:function(){this.myName=localStorage.getItem("myName")||"",this.room=localStorage.getItem("room")||""}},{key:"onSubmit",value:function(t){t.preventDefault(),this.myName=this.myName.toLowerCase().trim(),this.room=this.room.toLowerCase().trim(),this.myName&&localStorage.setItem("myName",this.myName),this.room&&(localStorage.setItem("room",this.room),this.$router.push("/"+this.room))}}]),n}(u["c"]);N=Object(l["__decorate"])([u["a"]],N);var S=N,I=S,$=Object(h["a"])(I,C,P,!1,null,"12c12bc6",null),L=$.exports,E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"p-5"},[n("h1",{staticClass:"mb-4 text-center"},[t._v(t._s(t._f("nameFilter")(t.myName)))]),n("div",{staticClass:"mb-4"},[n("poker-component",{staticClass:"justify-content-center",attrs:{currentPoint:t.myPoint},on:{onPoint:t.point}})],1),n("players-component",{staticClass:"table text-center mb-5 bg-light w-auto mx-auto shadow-sm",attrs:{players:t.players,showPoints:t.showPoints,myName:t.myName}}),n("div",{staticClass:"row mb-5"},[n("div",{staticClass:"col"},[n("button",{staticClass:"btn btn-lg btn-block btn-danger",on:{click:t.clearVotes}},[t._v("Clear Votes")])]),n("div",{staticClass:"col"},[n("button",{staticClass:"btn btn-lg btn-block btn-primary",on:{click:t.showVotes}},[t._v("Show Votes")])])]),t._m(0)],1)},V=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text-secondary text-center"},[n("p",[n("span",{staticClass:"badge badge-secondary"},[t._v("Tips")]),t._v(" To delete a player, right click its name.")])])}],A=(n("4de4"),n("07ac"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"btn-toolbar",attrs:{role:"toolbar"}},[n("div",{staticClass:"btn-group mr-2",attrs:{role:"group"}},t._l(t.points,(function(e,o){return n("button",{key:o,class:["btn",t.currentPoint==e?"btn-primary":"btn-outline-primary"],attrs:{type:"button"},on:{click:function(n){return t.select(e)}}},[t._v(" "+t._s(e)+" ")])})),0),n("div",{staticClass:"btn-group",attrs:{role:"group"}},[n("button",{class:["btn",-1==t.currentPoint?"btn-secondary":"btn-outline-secondary"],attrs:{type:"button"},on:{click:function(e){return t.select(-1)}}},[t._v(" ? ")])])])}),D=[],H=function(t){Object(i["a"])(n,t);var e=Object(c["a"])(n);function n(){var t;return Object(s["a"])(this,n),t=e.apply(this,arguments),t.points=[.5,1,2,3,5,8,13],t}return Object(x["a"])(n,[{key:"select",value:function(t){this.$emit("onPoint",t)}}]),n}(u["c"]);Object(l["__decorate"])([Object(u["b"])()],H.prototype,"currentPoint",void 0),H=Object(l["__decorate"])([u["a"]],H);var M=H,F=M,T=(n("edcd"),Object(h["a"])(F,A,D,!1,null,"3caaecba",null)),z=T.exports,U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",[t._m(0),n("tbody",{class:{"table-success":t.showPoints}},t._l(t.players,(function(e,o){return n("tr",{key:o,class:{"table-warning":0==e.point}},[n("td",{on:{contextmenu:function(e){return t.deletePlayer(e,o)}}},[t._v(t._s(t._f("nameFilter")(o)))]),n("td",[e.connected?[t.showPoints||0==e.point?t.showPoints?t._e():n("font-awesome-icon",{staticClass:"text-secondary",attrs:{icon:"ellipsis-h",size:"lg"}}):n("font-awesome-icon",{staticClass:"text-success",attrs:{icon:"check-circle",size:"lg"}}),o!==t.myName&&!t.showPoints||0==e.point?t._e():[t._v(" "+t._s(e.point>0?e.point:"?")+" ")]]:n("font-awesome-icon",{staticClass:"text-danger",attrs:{icon:"wifi",title:"User disconnected."}})],2)])})),0)])},J=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",{staticClass:"thead-dark"},[n("tr",[n("th",{attrs:{scope:"col"}},[t._v("Player")]),n("th",{attrs:{scope:"col"}},[t._v("Point")])])])}],B=n("59ca"),K=(n("66ce"),function(){function t(e){Object(s["a"])(this,t),this.db=null,this.room="",this.player="",B["initializeApp"](e),this.db=B["database"](),console.info("new FirebaseService")}return Object(x["a"])(t,[{key:"signIn",value:function(t,e){var n=this;this.room=t.toLowerCase(),this.player=e.toLowerCase();var o=this.db.ref(".info/connected");o.on("value",(function(t){if(!0===t.val()){var e=n.db.ref(n.room+"/players/"+n.player+"/connected");e.onDisconnect().set(!1),e.set(!0)}}))}},{key:"setPoint",value:function(t){this.db.ref(this.room+"/players/"+this.player+"/point").set(t).catch(this.errorHandler)}},{key:"clearVotes",value:function(){var t=this;this.db.ref(this.room).once("value").then((function(e){var n=e.val(),o={};for(var a in n.players)o[a]={point:0,connected:n.players[a].connected};t.db.ref(t.room).set({showPoints:0,players:o}).catch(t.errorHandler)})).catch(this.errorHandler)}},{key:"showVotes",value:function(){this.db.ref(this.room+"/showPoints").set(1).catch(this.errorHandler)}},{key:"watch",value:function(t){this.db.ref(this.room).on("value",t),console.info("Connect to: "+this.room)}},{key:"deletePlayer",value:function(t){this.db.ref(this.room+"/players/"+t.toLocaleLowerCase()).remove().catch(this.errorHandler)}},{key:"detachListener",value:function(){this.db.ref(this.room).off(),this.db.ref(".info/connected").off(),console.info("Disconnect from: "+this.room)}},{key:"errorHandler",value:function(t){console.error(t)}}]),t}()),R=new K({apiKey:"AIzaSyAW076Ai3lOBhONLt8pKfUA0jedjf5A7RY",authDomain:"planning-poker-remax.firebaseapp.com",databaseURL:"https://planning-poker-remax.firebaseio.com",projectId:"planning-poker-remax",storageBucket:"planning-poker-remax.appspot.com",messagingSenderId:"1050364771989",appId:"1:1050364771989:web:a5c621b239496dfaf9e59c"}),W=R;n("a15b"),n("d81d"),n("ac1f"),n("1276");function Y(t){return t.split(" ").map((function(t){return t.charAt(0).toUpperCase()+t.substring(1)})).join(" ")}var G=function(t){Object(i["a"])(n,t);var e=Object(c["a"])(n);function n(){return Object(s["a"])(this,n),e.apply(this,arguments)}return Object(x["a"])(n,[{key:"deletePlayer",value:function(t,e){t.preventDefault(),confirm('Delete player "'+e+'" ?')&&W.deletePlayer(e)}}]),n}(u["c"]);Object(l["__decorate"])([Object(u["b"])()],G.prototype,"players",void 0),Object(l["__decorate"])([Object(u["b"])()],G.prototype,"showPoints",void 0),Object(l["__decorate"])([Object(u["b"])()],G.prototype,"myName",void 0),G=Object(l["__decorate"])([Object(u["a"])({components:{},filters:{nameFilter:Y}})],G);var q=G,Q=q,X=(n("17eb"),Object(h["a"])(Q,U,J,!1,null,"14667608",null)),Z=X.exports,tt=function(t){Object(i["a"])(n,t);var e=Object(c["a"])(n);function n(){var t;return Object(s["a"])(this,n),t=e.apply(this,arguments),t.room="",t.myName="",t.myPoint=0,t.showPoints=!1,t.players={},t}return Object(x["a"])(n,[{key:"created",value:function(){if(this.room=this.$route.params.room.toLowerCase(),this.myName=localStorage.getItem("myName")||"",!this.myName){var t=prompt("Welcome! May I have your name?");t?(localStorage.setItem("myName",t.toLowerCase()),this.myName=t):this.myName="Guest"}W.signIn(this.room,this.myName)}},{key:"mounted",value:function(){var t=this;W.watch((function(e){var n=e.val();t.players=n.players,t.myPoint=t.players[t.myName].point,t.showPoints=1==n.showPoints||0===Object.values(t.players).filter((function(t){return 0==t.point})).length})),this.point(0)}},{key:"point",value:function(t){W.setPoint(t)}},{key:"clearVotes",value:function(){W.clearVotes()}},{key:"showVotes",value:function(){W.showVotes()}},{key:"beforeDestroy",value:function(){W.detachListener()}}]),n}(u["c"]);tt=Object(l["__decorate"])([Object(u["a"])({components:{PokerComponent:z,PlayersComponent:Z},filters:{nameFilter:Y}})],tt);var et=tt,nt=et,ot=Object(h["a"])(nt,E,V,!1,null,"55b78d77",null),at=ot.exports;o["a"].use(k["a"]);var rt=[{path:"/",name:"Signin",component:L},{path:"/:room",name:"Main",component:at}],st=new k["a"]({routes:rt}),ct=st,it=n("2f62");o["a"].use(it["a"]);var lt=new it["a"].Store({state:{},mutations:{},actions:{},modules:{}}),ut=n("ecee"),mt=n("c074"),pt=n("ad3d");ut["c"].add(mt["c"]),ut["c"].add(mt["a"]),ut["c"].add(mt["b"]),ut["c"].add(mt["d"]),o["a"].component("font-awesome-icon",pt["a"]),o["a"].config.productionTip=!1,new o["a"]({router:ct,store:lt,render:function(t){return t(w)}}).$mount("#app")},edcd:function(t,e,n){"use strict";var o=n("c583"),a=n.n(o);a.a}});
//# sourceMappingURL=app.2e359f15.js.map