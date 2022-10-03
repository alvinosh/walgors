(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();let m;const N=new Array(32).fill(void 0);N.push(void 0,null,!0,!1);function Ze(t){return N[t]}let te=N.length;function ut(t){t<36||(N[t]=te,te=t)}function _t(t){const e=Ze(t);return ut(t),e}const Ge=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});Ge.decode();let he=new Uint8Array;function ne(){return he.byteLength===0&&(he=new Uint8Array(m.memory.buffer)),he}function je(t,e){return Ge.decode(ne().subarray(t,t+e))}let me=new Int32Array;function ye(){return me.byteLength===0&&(me=new Int32Array(m.memory.buffer)),me}function dt(t,e){return ne().subarray(t/1,t/1+e)}function re(t,e){if(!(t instanceof e))throw new Error(`expected instance of ${e.name}`);return t.ptr}function ht(t){return()=>{throw new Error(`${t} is not defined`)}}function mt(t){te===N.length&&N.push(N.length+1);const e=te;return te=N[e],N[e]=t,e}let Oe=0;const ge=new TextEncoder("utf-8"),gt=typeof ge.encodeInto=="function"?function(t,e){return ge.encodeInto(t,e)}:function(t,e){const n=ge.encode(t);return e.set(n),{read:t.length,written:n.length}};function wt(t,e,n){if(n===void 0){const i=ge.encode(t),f=e(i.length);return ne().subarray(f,f+i.length).set(i),Oe=i.length,f}let l=t.length,r=e(l);const o=ne();let s=0;for(;s<l;s++){const i=t.charCodeAt(s);if(i>127)break;o[r+s]=i}if(s!==l){s!==0&&(t=t.slice(s)),r=n(r,l,l=s+t.length*3);const i=ne().subarray(r+s,r+l);s+=gt(t,i).written}return Oe=s,r}const p=Object.freeze({Empty:0,0:"Empty",Path:1,1:"Path",Wall:2,2:"Wall",Start:3,3:"Start",End:4,4:"End",Open:5,5:"Open",Closed:6,6:"Closed"});class se{static __wrap(e){const n=Object.create(se.prototype);return n.ptr=e,n}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();m.__wbg_astar_free(e)}static new(e){re(e,W);const n=m.astar_new(e.ptr);return se.__wrap(n)}do_path(e){return re(e,W),m.astar_do_path(this.ptr,e.ptr)!==0}tick(e){return re(e,W),m.astar_tick(this.ptr,e.ptr)!==0}}class ie{static __wrap(e){const n=Object.create(ie.prototype);return n.ptr=e,n}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();m.__wbg_maze_free(e)}static new(e){re(e,W);const n=m.maze_new(e.ptr);return ie.__wrap(n)}tick(e){return re(e,W),m.maze_tick(this.ptr,e.ptr)!==0}}class W{static __wrap(e){const n=Object.create(W.prototype);return n.ptr=e,n}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();m.__wbg_world_free(e)}get width(){return m.__wbg_get_world_width(this.ptr)>>>0}set width(e){m.__wbg_set_world_width(this.ptr,e)}get height(){return m.__wbg_get_world_height(this.ptr)>>>0}set height(e){m.__wbg_set_world_height(this.ptr,e)}get start(){return m.__wbg_get_world_start(this.ptr)>>>0}set start(e){m.__wbg_set_world_start(this.ptr,e)}get end(){return m.__wbg_get_world_end(this.ptr)>>>0}set end(e){m.__wbg_set_world_end(this.ptr,e)}static new(e,n,l,r,o,s,i){const f=m.world_new(e,n,l,r,o,s,i);return W.__wrap(f)}dist(e,n){return m.world_dist(this.ptr,e,n)}set_start(e){m.world_set_start(this.ptr,e)}set_end(e){m.world_set_end(this.ptr,e)}set_empty(e){m.world_set_empty(this.ptr,e)}set_wall(e){m.world_set_wall(this.ptr,e)}set_open(e){m.world_set_open(this.ptr,e)}set_closed(e){m.world_set_closed(this.ptr,e)}set_path(e){m.world_set_path(this.ptr,e)}clear(){m.world_clear(this.ptr)}fill(e){m.world_fill(this.ptr,e)}get_width(){return m.__wbg_get_world_width(this.ptr)>>>0}get_height(){return m.__wbg_get_world_height(this.ptr)>>>0}get_world(){try{const r=m.__wbindgen_add_to_stack_pointer(-16);m.world_get_world(r,this.ptr);var e=ye()[r/4+0],n=ye()[r/4+1],l=dt(e,n).slice();return m.__wbindgen_free(e,n*1),l}finally{m.__wbindgen_add_to_stack_pointer(16)}}}async function pt(t,e){if(typeof Response=="function"&&t instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(t,e)}catch(l){if(t.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",l);else throw l}const n=await t.arrayBuffer();return await WebAssembly.instantiate(n,e)}else{const n=await WebAssembly.instantiate(t,e);return n instanceof WebAssembly.Instance?{instance:n,module:t}:n}}function yt(){const t={};return t.wbg={},t.wbg.__wbg_random_3b8f4e8b8d62bcb3=typeof Math.random=="function"?Math.random:ht("Math.random"),t.wbg.__wbg_new_abda76e883ba8a5f=function(){const e=new Error;return mt(e)},t.wbg.__wbg_stack_658279fe44541cf6=function(e,n){const l=Ze(n).stack,r=wt(l,m.__wbindgen_malloc,m.__wbindgen_realloc),o=Oe;ye()[e/4+1]=o,ye()[e/4+0]=r},t.wbg.__wbg_error_f851667af71bcfc6=function(e,n){try{console.error(je(e,n))}finally{m.__wbindgen_free(e,n)}},t.wbg.__wbindgen_object_drop_ref=function(e){_t(e)},t.wbg.__wbindgen_throw=function(e,n){throw new Error(je(e,n))},t}function bt(t,e){return m=t.exports,Je.__wbindgen_wasm_module=e,me=new Int32Array,he=new Uint8Array,m}async function Je(t){typeof t>"u"&&(t=new URL("/walgors/assets/wasm_bg.73fb752a.wasm",self.location));const e=yt();(typeof t=="string"||typeof Request=="function"&&t instanceof Request||typeof URL=="function"&&t instanceof URL)&&(t=fetch(t));const{instance:n,module:l}=await pt(await t,e);return bt(n,l)}function S(){}const Qe=t=>t;function xe(t){return t()}function Ne(){return Object.create(null)}function F(t){t.forEach(xe)}function $e(t){return typeof t=="function"}function V(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function vt(t){return Object.keys(t).length===0}function kt(t,...e){if(t==null)return S;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function et(t,e,n){t.$$.on_destroy.push(kt(e,n))}const tt=typeof window<"u";let Et=tt?()=>window.performance.now():()=>Date.now(),Me=tt?t=>requestAnimationFrame(t):S;const G=new Set;function nt(t){G.forEach(e=>{e.c(t)||(G.delete(e),e.f())}),G.size!==0&&Me(nt)}function Ct(t){let e;return G.size===0&&Me(nt),{promise:new Promise(n=>{G.add(e={c:t,f:n})}),abort(){G.delete(e)}}}function v(t,e){t.appendChild(e)}function rt(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function St(t){const e=k("style");return Ot(rt(t),e),e.sheet}function Ot(t,e){return v(t.head||t,e),e.sheet}function O(t,e,n){t.insertBefore(e,n||null)}function C(t){t.parentNode.removeChild(t)}function lt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function k(t){return document.createElement(t)}function J(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function Re(t){return document.createTextNode(t)}function Q(){return Re(" ")}function At(){return Re("")}function M(t,e,n,l){return t.addEventListener(e,n,l),()=>t.removeEventListener(e,n,l)}function h(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function zt(t){return Array.from(t.childNodes)}function y(t,e,n){t.classList[n?"add":"remove"](e)}function Lt(t,e,{bubbles:n=!1,cancelable:l=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,l,e),r}const be=new Map;let ve=0;function Pt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Mt(t,e){const n={stylesheet:St(e),rules:{}};return be.set(t,n),n}function Te(t,e,n,l,r,o,s,i=0){const f=16.666/l;let a=`{
`;for(let E=0;E<=1;E+=f){const z=e+(n-e)*o(E);a+=E*100+`%{${s(z,1-z)}}
`}const d=a+`100% {${s(n,1-n)}}
}`,c=`__svelte_${Pt(d)}_${i}`,u=rt(t),{stylesheet:g,rules:w}=be.get(u)||Mt(u,t);w[c]||(w[c]=!0,g.insertRule(`@keyframes ${c} ${d}`,g.cssRules.length));const b=t.style.animation||"";return t.style.animation=`${b?`${b}, `:""}${c} ${l}ms linear ${r}ms 1 both`,ve+=1,c}function Rt(t,e){const n=(t.style.animation||"").split(", "),l=n.filter(e?o=>o.indexOf(e)<0:o=>o.indexOf("__svelte")===-1),r=n.length-l.length;r&&(t.style.animation=l.join(", "),ve-=r,ve||Wt())}function Wt(){Me(()=>{ve||(be.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&C(e)}),be.clear())})}let We;function le(t){We=t}function ke(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(l=>l.call(this,e))}const ee=[],qe=[],we=[],Ie=[],jt=Promise.resolve();let Ae=!1;function Nt(){Ae||(Ae=!0,jt.then(st))}function x(t){we.push(t)}const Ee=new Set;let ue=0;function st(){const t=We;do{for(;ue<ee.length;){const e=ee[ue];ue++,le(e),Tt(e.$$)}for(le(null),ee.length=0,ue=0;qe.length;)qe.pop()();for(let e=0;e<we.length;e+=1){const n=we[e];Ee.has(n)||(Ee.add(n),n())}we.length=0}while(ee.length);for(;Ie.length;)Ie.pop()();Ae=!1,Ee.clear(),le(t)}function Tt(t){if(t.fragment!==null){t.update(),F(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(x)}}let $;function qt(){return $||($=Promise.resolve(),$.then(()=>{$=null})),$}function Ce(t,e,n){t.dispatchEvent(Lt(`${e?"intro":"outro"}${n}`))}const pe=new Set;let T;function It(){T={r:0,c:[],p:T}}function Ft(){T.r||F(T.c),T=T.p}function A(t,e){t&&t.i&&(pe.delete(t),t.i(e))}function j(t,e,n,l){if(t&&t.o){if(pe.has(t))return;pe.add(t),T.c.push(()=>{pe.delete(t),l&&(n&&t.d(1),l())}),t.o(e)}else l&&l()}const Ut={duration:0};function Fe(t,e,n,l){let r=e(t,n),o=l?0:1,s=null,i=null,f=null;function a(){f&&Rt(t,f)}function d(u,g){const w=u.b-o;return g*=Math.abs(w),{a:o,b:u.b,d:w,duration:g,start:u.start,end:u.start+g,group:u.group}}function c(u){const{delay:g=0,duration:w=300,easing:b=Qe,tick:E=S,css:z}=r||Ut,U={start:Et()+g,b:u};u||(U.group=T,T.r+=1),s||i?i=U:(z&&(a(),f=Te(t,o,u,w,g,b,z)),u&&E(0,1),s=d(U,w),x(()=>Ce(t,u,"start")),Ct(L=>{if(i&&L>i.start&&(s=d(i,w),i=null,Ce(t,s.b,"start"),z&&(a(),f=Te(t,o,s.b,s.duration,0,b,r.css))),s){if(L>=s.end)E(o=s.b,1-o),Ce(t,s.b,"end"),i||(s.b?a():--s.group.r||F(s.group.c)),s=null;else if(L>=s.start){const B=L-s.start;o=s.a+s.d*b(B/s.duration),E(o,1-o)}}return!!(s||i)}))}return{run(u){$e(r)?qt().then(()=>{r=r(),c(u)}):c(u)},end(){a(),s=i=null}}}function Y(t){t&&t.c()}function q(t,e,n,l){const{fragment:r,on_mount:o,on_destroy:s,after_update:i}=t.$$;r&&r.m(e,n),l||x(()=>{const f=o.map(xe).filter($e);s?s.push(...f):F(f),t.$$.on_mount=[]}),i.forEach(x)}function I(t,e){const n=t.$$;n.fragment!==null&&(F(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Bt(t,e){t.$$.dirty[0]===-1&&(ee.push(t),Nt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function D(t,e,n,l,r,o,s,i=[-1]){const f=We;le(t);const a=t.$$={fragment:null,ctx:null,props:o,update:S,not_equal:r,bound:Ne(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(f?f.$$.context:[])),callbacks:Ne(),dirty:i,skip_bound:!1,root:e.target||f.$$.root};s&&s(a.root);let d=!1;if(a.ctx=n?n(t,e.props||{},(c,u,...g)=>{const w=g.length?g[0]:u;return a.ctx&&r(a.ctx[c],a.ctx[c]=w)&&(!a.skip_bound&&a.bound[c]&&a.bound[c](w),d&&Bt(t,c)),u}):[],a.update(),d=!0,F(a.before_update),a.fragment=l?l(a.ctx):!1,e.target){if(e.hydrate){const c=zt(e.target);a.fragment&&a.fragment.l(c),c.forEach(C)}else a.fragment&&a.fragment.c();e.intro&&A(t.$$.fragment),q(t,e.target,e.anchor,e.customElement),st()}le(f)}class X{$destroy(){I(this,1),this.$destroy=S}$on(e,n){const l=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return l.push(n),()=>{const r=l.indexOf(n);r!==-1&&l.splice(r,1)}}$set(e){this.$$set&&!vt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Z=[];function it(t,e=S){let n;const l=new Set;function r(i){if(V(t,i)&&(t=i,n)){const f=!Z.length;for(const a of l)a[1](),Z.push(a,t);if(f){for(let a=0;a<Z.length;a+=2)Z[a][0](Z[a+1]);Z.length=0}}}function o(i){r(i(t))}function s(i,f=S){const a=[i,f];return l.add(a),l.size===1&&(n=e(r)||S),i(t),()=>{l.delete(a),l.size===0&&(n(),n=null)}}return{set:r,update:o,subscribe:s}}const ze=it(p.Start),H=it();function Ue(t,e,n){const l=t.slice();return l[4]=e[n],l}function Be(t){let e,n,l,r,o=t[4].name+"",s,i,f,a;function d(){return t[3](t[4])}return{c(){e=k("li"),n=k("div"),l=Q(),r=k("p"),s=Re(o),i=Q(),h(n,"class","icon "+t[4].class+" svelte-u9p6u"),h(r,"class","svelte-u9p6u"),h(e,"class","option svelte-u9p6u"),y(e,"active",t[4].cell===t[0])},m(c,u){O(c,e,u),v(e,n),v(e,l),v(e,r),v(r,s),v(e,i),f||(a=M(e,"click",d),f=!0)},p(c,u){t=c,u&3&&y(e,"active",t[4].cell===t[0])},d(c){c&&C(e),f=!1,a()}}}function Ht(t){let e,n=t[1],l=[];for(let r=0;r<n.length;r+=1)l[r]=Be(Ue(t,n,r));return{c(){e=k("ul");for(let r=0;r<l.length;r+=1)l[r].c();h(e,"class","container svelte-u9p6u")},m(r,o){O(r,e,o);for(let s=0;s<l.length;s+=1)l[s].m(e,null)},p(r,[o]){if(o&7){n=r[1];let s;for(s=0;s<n.length;s+=1){const i=Ue(r,n,s);l[s]?l[s].p(i,o):(l[s]=Be(i),l[s].c(),l[s].m(e,null))}for(;s<l.length;s+=1)l[s].d(1);l.length=n.length}},i:S,o:S,d(r){r&&C(e),lt(l,r)}}}function Yt(t,e,n){let l;et(t,ze,i=>n(0,l=i));let r=[{name:"Eraser",cell:p.Empty,class:"eraser"},{name:"Start",cell:p.Start,class:"start"},{name:"End",cell:p.End,class:"end"},{name:"Wall",cell:p.Wall,class:"wall"}];const o=i=>{ze.set(i)};return[l,r,o,i=>{o(i.cell)}]}class Vt extends X{constructor(e){super(),D(this,e,Yt,Ht,V,{})}}var R;(function(t){t[t.RESET=0]="RESET",t[t.STEP=1]="STEP",t[t.PAUSE=2]="PAUSE",t[t.PLAY=3]="PLAY"})(R||(R={}));function He(t,{delay:e=0,duration:n=400,easing:l=Qe}={}){const r=+getComputedStyle(t).opacity;return{delay:e,duration:n,easing:l,css:o=>`opacity: ${o*r}`}}function Dt(t){let e,n,l,r,o,s;return{c(){e=k("div"),h(e,"class","cell svelte-10rczmj"),h(e,"style",n=`
    width: ${t[1]}px;
    height:  ${t[1]}px;
  `),y(e,"empty",t[0]===p.Empty),y(e,"path",t[0]===p.Path),y(e,"wall",t[0]===p.Wall),y(e,"start",t[0]===p.Start),y(e,"end",t[0]===p.End),y(e,"open",t[0]===p.Open),y(e,"closed",t[0]===p.Closed),y(e,"animate",t[0]!==p.Empty)},m(i,f){O(i,e,f),r=!0,o||(s=[M(e,"click",t[3]),M(e,"mouseover",t[4]),M(e,"focus",t[5])],o=!0)},p(i,[f]){(!r||f&2&&n!==(n=`
    width: ${i[1]}px;
    height:  ${i[1]}px;
  `))&&h(e,"style",n),(!r||f&1)&&y(e,"empty",i[0]===p.Empty),(!r||f&1)&&y(e,"path",i[0]===p.Path),(!r||f&1)&&y(e,"wall",i[0]===p.Wall),(!r||f&1)&&y(e,"start",i[0]===p.Start),(!r||f&1)&&y(e,"end",i[0]===p.End),(!r||f&1)&&y(e,"open",i[0]===p.Open),(!r||f&1)&&y(e,"closed",i[0]===p.Closed),(!r||f&1)&&y(e,"animate",i[0]!==p.Empty)},i(i){r||(x(()=>{l||(l=Fe(e,He,{},!0)),l.run(1)}),r=!0)},o(i){l||(l=Fe(e,He,{},!1)),l.run(0),r=!1},d(i){i&&C(e),i&&l&&l.end(),o=!1,F(s)}}}function Xt(t,e,n){let{cell:l}=e,{size:r=10}=e,{idx:o}=e;function s(a){ke.call(this,t,a)}function i(a){ke.call(this,t,a)}function f(a){ke.call(this,t,a)}return t.$$set=a=>{"cell"in a&&n(0,l=a.cell),"size"in a&&n(1,r=a.size),"idx"in a&&n(2,o=a.idx)},[l,r,o,s,i,f]}class Kt extends X{constructor(e){super(),D(this,e,Xt,Dt,V,{cell:0,size:1,idx:2})}}function Ye(t,e,n){const l=t.slice();return l[24]=e[n],l[26]=n,l}function Ve(t){let e,n;function l(){return t[7](t[26])}function r(){return t[8](t[26])}return e=new Kt({props:{cell:t[24],idx:t[26],size:Le}}),e.$on("click",l),e.$on("mouseover",r),{c(){Y(e.$$.fragment)},m(o,s){q(e,o,s),n=!0},p(o,s){t=o;const i={};s&8&&(i.cell=t[24]),e.$set(i)},i(o){n||(A(e.$$.fragment,o),n=!0)},o(o){j(e.$$.fragment,o),n=!1},d(o){I(e,o)}}}function Zt(t){let e,n,l,r,o;x(t[6]);let s=t[3],i=[];for(let a=0;a<s.length;a+=1)i[a]=Ve(Ye(t,s,a));const f=a=>j(i[a],1,1,()=>{i[a]=null});return{c(){e=k("div");for(let a=0;a<i.length;a+=1)i[a].c();h(e,"class","container svelte-oqozf9"),h(e,"style",n=`
  grid-template-columns:repeat(${t[2].get_width()}, auto);
  grid-template-rows:repeat(${t[2].get_height()}, auto);
`)},m(a,d){O(a,e,d);for(let c=0;c<i.length;c+=1)i[c].m(e,null);l=!0,r||(o=[M(window,"mousedown",t[4]),M(window,"mouseup",t[4]),M(window,"mousemove",t[4]),M(window,"resize",t[6])],r=!0)},p(a,[d]){if(d&40){s=a[3];let c;for(c=0;c<s.length;c+=1){const u=Ye(a,s,c);i[c]?(i[c].p(u,d),A(i[c],1)):(i[c]=Ve(u),i[c].c(),A(i[c],1),i[c].m(e,null))}for(It(),c=s.length;c<i.length;c+=1)f(c);Ft()}(!l||d&4&&n!==(n=`
  grid-template-columns:repeat(${a[2].get_width()}, auto);
  grid-template-rows:repeat(${a[2].get_height()}, auto);
`))&&h(e,"style",n)},i(a){if(!l){for(let d=0;d<s.length;d+=1)A(i[d]);l=!0}},o(a){i=i.filter(Boolean);for(let d=0;d<i.length;d+=1)j(i[d]);l=!1},d(a){a&&C(e),lt(i,a),r=!1,F(o)}}}const Le=60,_e=2;function Gt(t,e,n){let l;et(t,ze,_=>n(15,l=_));let r=W.new(10,10,1,1,8,8,!0),o=ie.new(r),s=r.get_world(),i,f=!1,a=!1,d=!1;function c(_,P,ot,at,ct,ft){n(2,r=W.new(_,P,ot,at,ct,ft,!0)),o=ie.new(r),n(3,s=r.get_world()),u()}function u(){o.tick(r),n(3,s=r.get_world()),requestAnimationFrame(()=>u())}function g(){f=!1,a=!1,d=!0,i=void 0,r.clear(),n(3,s=r.get_world())}function w(){for(g(),i=se.new(r);!i.tick(r););n(3,s=r.get_world()),a=!0,i=void 0,n(3,s=r.get_world())}function b(_=!1){i==null&&(r.clear(),i=se.new(r)),_&&!a&&i.tick(r)&&(a=!0),n(3,s=r.get_world());let P=!1;!d&&!a&&!_&&(P=i.tick(r),P?a=!0:requestAnimationFrame(()=>b()))}function E(){b(!0)}function z(){d=!0}function U(){d=!1}let L=0,B=0;const oe=_=>{f=((_.buttons!==void 0?_.buttons:_.which)&1)===1};H.subscribe(_=>{switch(_){case R.RESET:g();break;case R.PLAY:U(),b();break;case R.PAUSE:z();break;case R.STEP:E();break}});const K=(_,P)=>{if(!(P&&!f)){switch(l){case p.Start:r.set_start(_);break;case p.End:r.set_end(_);break;case p.Wall:r.set_wall(_);break;case p.Empty:r.set_empty(_);break}a&&w(),n(3,s=r.get_world())}};function ae(){n(0,L=window.innerHeight),n(1,B=window.innerWidth)}const ce=_=>{K(_,!1)},fe=_=>{K(_,!0)};return t.$$.update=()=>{if(t.$$.dirty&3){let _=Math.ceil(B/Le),P=Math.ceil(L/Le);_>=1&&P>=1&&c(_,P,_e-1,_e-1,_-_e,P-_e)}},[L,B,r,s,oe,K,ae,ce,fe]}class Jt extends X{constructor(e){super(),D(this,e,Gt,Zt,V,{})}}const de=parseFloat;function Pe(t,e=";"){let n;if(Array.isArray(t))n=t.filter(l=>l);else{n=[];for(const l in t)t[l]&&n.push(`${l}:${t[l]}`)}return n.join(e)}function Qt(t,e,n,l){let r,o;const s="1em";let i,f,a,d="-.125em";const c="visible";return l&&(a="center",o="1.25em"),n&&(r=n),e&&(e=="lg"?(f="1.33333em",i=".75em",d="-.225em"):e=="xs"?f=".75em":e=="sm"?f=".875em":f=e.replace("x","em")),Pe([Pe({float:r,width:o,height:s,"line-height":i,"font-size":f,"text-align":a,"vertical-align":d,"transform-origin":"center",overflow:c}),t])}function xt(t,e,n,l,r,o=1,s="",i=""){let f=1,a=1;return r&&(r=="horizontal"?f=-1:r=="vertical"?a=-1:f=a=-1),Pe([`translate(${de(e)*o}${s},${de(n)*o}${s})`,`scale(${f*de(t)},${a*de(t)})`,l&&`rotate(${l}${i})`]," ")}function De(t){let e,n,l,r,o,s,i,f;function a(u,g){return typeof u[10][4]=="string"?en:$t}let d=a(t),c=d(t);return{c(){e=J("svg"),n=J("g"),l=J("g"),c.c(),h(l,"transform",t[12]),h(n,"transform",r="translate("+t[10][0]/2+" "+t[10][1]/2+")"),h(n,"transform-origin",o=t[10][0]/4+" 0"),h(e,"id",s=t[1]||void 0),h(e,"class",i="svelte-fa "+t[0]+" svelte-1cj2gr0"),h(e,"style",t[11]),h(e,"viewBox",f="0 0 "+t[10][0]+" "+t[10][1]),h(e,"aria-hidden","true"),h(e,"role","img"),h(e,"xmlns","http://www.w3.org/2000/svg"),y(e,"pulse",t[4]),y(e,"spin",t[3])},m(u,g){O(u,e,g),v(e,n),v(n,l),c.m(l,null)},p(u,g){d===(d=a(u))&&c?c.p(u,g):(c.d(1),c=d(u),c&&(c.c(),c.m(l,null))),g&4096&&h(l,"transform",u[12]),g&1024&&r!==(r="translate("+u[10][0]/2+" "+u[10][1]/2+")")&&h(n,"transform",r),g&1024&&o!==(o=u[10][0]/4+" 0")&&h(n,"transform-origin",o),g&2&&s!==(s=u[1]||void 0)&&h(e,"id",s),g&1&&i!==(i="svelte-fa "+u[0]+" svelte-1cj2gr0")&&h(e,"class",i),g&2048&&h(e,"style",u[11]),g&1024&&f!==(f="0 0 "+u[10][0]+" "+u[10][1])&&h(e,"viewBox",f),g&17&&y(e,"pulse",u[4]),g&9&&y(e,"spin",u[3])},d(u){u&&C(e),c.d()}}}function $t(t){let e,n,l,r,o,s,i,f,a,d;return{c(){e=J("path"),s=J("path"),h(e,"d",n=t[10][4][0]),h(e,"fill",l=t[6]||t[2]||"currentColor"),h(e,"fill-opacity",r=t[9]!=!1?t[7]:t[8]),h(e,"transform",o="translate("+t[10][0]/-2+" "+t[10][1]/-2+")"),h(s,"d",i=t[10][4][1]),h(s,"fill",f=t[5]||t[2]||"currentColor"),h(s,"fill-opacity",a=t[9]!=!1?t[8]:t[7]),h(s,"transform",d="translate("+t[10][0]/-2+" "+t[10][1]/-2+")")},m(c,u){O(c,e,u),O(c,s,u)},p(c,u){u&1024&&n!==(n=c[10][4][0])&&h(e,"d",n),u&68&&l!==(l=c[6]||c[2]||"currentColor")&&h(e,"fill",l),u&896&&r!==(r=c[9]!=!1?c[7]:c[8])&&h(e,"fill-opacity",r),u&1024&&o!==(o="translate("+c[10][0]/-2+" "+c[10][1]/-2+")")&&h(e,"transform",o),u&1024&&i!==(i=c[10][4][1])&&h(s,"d",i),u&36&&f!==(f=c[5]||c[2]||"currentColor")&&h(s,"fill",f),u&896&&a!==(a=c[9]!=!1?c[8]:c[7])&&h(s,"fill-opacity",a),u&1024&&d!==(d="translate("+c[10][0]/-2+" "+c[10][1]/-2+")")&&h(s,"transform",d)},d(c){c&&C(e),c&&C(s)}}}function en(t){let e,n,l,r;return{c(){e=J("path"),h(e,"d",n=t[10][4]),h(e,"fill",l=t[2]||t[5]||"currentColor"),h(e,"transform",r="translate("+t[10][0]/-2+" "+t[10][1]/-2+")")},m(o,s){O(o,e,s)},p(o,s){s&1024&&n!==(n=o[10][4])&&h(e,"d",n),s&36&&l!==(l=o[2]||o[5]||"currentColor")&&h(e,"fill",l),s&1024&&r!==(r="translate("+o[10][0]/-2+" "+o[10][1]/-2+")")&&h(e,"transform",r)},d(o){o&&C(e)}}}function tn(t){let e,n=t[10][4]&&De(t);return{c(){n&&n.c(),e=At()},m(l,r){n&&n.m(l,r),O(l,e,r)},p(l,[r]){l[10][4]?n?n.p(l,r):(n=De(l),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},i:S,o:S,d(l){n&&n.d(l),l&&C(e)}}}function nn(t,e,n){let{class:l=""}=e,{id:r=""}=e,{style:o=""}=e,{icon:s}=e,{size:i=""}=e,{color:f=""}=e,{fw:a=!1}=e,{pull:d=""}=e,{scale:c=1}=e,{translateX:u=0}=e,{translateY:g=0}=e,{rotate:w=""}=e,{flip:b=!1}=e,{spin:E=!1}=e,{pulse:z=!1}=e,{primaryColor:U=""}=e,{secondaryColor:L=""}=e,{primaryOpacity:B=1}=e,{secondaryOpacity:oe=.4}=e,{swapOpacity:K=!1}=e,ae,ce,fe;return t.$$set=_=>{"class"in _&&n(0,l=_.class),"id"in _&&n(1,r=_.id),"style"in _&&n(13,o=_.style),"icon"in _&&n(14,s=_.icon),"size"in _&&n(15,i=_.size),"color"in _&&n(2,f=_.color),"fw"in _&&n(16,a=_.fw),"pull"in _&&n(17,d=_.pull),"scale"in _&&n(18,c=_.scale),"translateX"in _&&n(19,u=_.translateX),"translateY"in _&&n(20,g=_.translateY),"rotate"in _&&n(21,w=_.rotate),"flip"in _&&n(22,b=_.flip),"spin"in _&&n(3,E=_.spin),"pulse"in _&&n(4,z=_.pulse),"primaryColor"in _&&n(5,U=_.primaryColor),"secondaryColor"in _&&n(6,L=_.secondaryColor),"primaryOpacity"in _&&n(7,B=_.primaryOpacity),"secondaryOpacity"in _&&n(8,oe=_.secondaryOpacity),"swapOpacity"in _&&n(9,K=_.swapOpacity)},t.$$.update=()=>{t.$$.dirty&16384&&n(10,ae=s&&s.icon||[0,0,"",[],""]),t.$$.dirty&237568&&n(11,ce=Qt(o,i,d,a)),t.$$.dirty&8126464&&n(12,fe=xt(c,u,g,w,b,512))},[l,r,f,E,z,U,L,B,oe,K,ae,ce,fe,o,s,i,a,d,c,u,g,w,b]}class Se extends X{constructor(e){super(),D(this,e,nn,tn,V,{class:0,id:1,style:13,icon:14,size:15,color:2,fw:16,pull:17,scale:18,translateX:19,translateY:20,rotate:21,flip:22,spin:3,pulse:4,primaryColor:5,secondaryColor:6,primaryOpacity:7,secondaryOpacity:8,swapOpacity:9})}}var Xe={prefix:"fas",iconName:"pause",icon:[320,512,[9208],"f04c","M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"]},rn={prefix:"fas",iconName:"arrow-rotate-right",icon:[512,512,[8635,"arrow-right-rotate","arrow-rotate-forward","redo"],"f01e","M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"]},ln={prefix:"fas",iconName:"arrow-rotate-left",icon:[512,512,[8634,"arrow-left-rotate","arrow-rotate-back","arrow-rotate-backward","undo"],"f0e2","M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"]},Ke={prefix:"fas",iconName:"play",icon:[384,512,[9654],"f04b","M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"]};function sn(t){let e,n,l,r,o,s,i,f,a,d,c,u,g;return r=new Se({props:{style:"font-size: 2rem; color: #ff6363; cursor: pointer;",icon:ln}}),i=new Se({props:{style:"font-size: 2rem; color: #ff6363; cursor: pointer;",icon:t[0]?Xe:Ke}}),d=new Se({props:{style:"font-size: 2rem; color: #ff6363; cursor: pointer;",icon:rn}}),{c(){e=k("div"),n=k("div"),l=k("div"),Y(r.$$.fragment),o=Q(),s=k("div"),Y(i.$$.fragment),f=Q(),a=k("div"),Y(d.$$.fragment),h(l,"class","icon svelte-1m6qc18"),h(s,"class","icon svelte-1m6qc18"),h(a,"class","icon svelte-1m6qc18"),h(n,"class","buttons svelte-1m6qc18"),h(e,"class","container svelte-1m6qc18")},m(w,b){O(w,e,b),v(e,n),v(n,l),q(r,l,null),v(n,o),v(n,s),q(i,s,null),v(n,f),v(n,a),q(d,a,null),c=!0,u||(g=[M(l,"click",t[4]),M(s,"click",t[5]),M(a,"click",t[6])],u=!0)},p(w,[b]){const E={};b&1&&(E.icon=w[0]?Xe:Ke),i.$set(E)},i(w){c||(A(r.$$.fragment,w),A(i.$$.fragment,w),A(d.$$.fragment,w),c=!0)},o(w){j(r.$$.fragment,w),j(i.$$.fragment,w),j(d.$$.fragment,w),c=!1},d(w){w&&C(e),I(r),I(i),I(d),u=!1,F(g)}}}function on(t,e,n){let l=!1;const r=()=>{H.set(null),H.set(R.RESET)},o=()=>{H.set(null),l?H.set(R.PAUSE):H.set(R.PLAY),n(0,l=!l)},s=()=>{H.set(null),H.set(R.STEP)};return[l,r,o,s,()=>r(),()=>o(),()=>s()]}class an extends X{constructor(e){super(),D(this,e,on,sn,V,{})}}function cn(t){let e,n,l,r,o,s,i,f,a,d;return n=new Jt({}),s=new Vt({}),a=new an({}),{c(){e=k("div"),Y(n.$$.fragment),l=Q(),r=k("div"),o=k("div"),Y(s.$$.fragment),i=Q(),f=k("div"),Y(a.$$.fragment),h(e,"class","fixed world svelte-4561as"),h(o,"class","selector svelte-4561as"),h(f,"class","toolbar svelte-4561as"),h(r,"class","fixed window svelte-4561as")},m(c,u){O(c,e,u),q(n,e,null),O(c,l,u),O(c,r,u),v(r,o),q(s,o,null),v(r,i),v(r,f),q(a,f,null),d=!0},p:S,i(c){d||(A(n.$$.fragment,c),A(s.$$.fragment,c),A(a.$$.fragment,c),d=!0)},o(c){j(n.$$.fragment,c),j(s.$$.fragment,c),j(a.$$.fragment,c),d=!1},d(c){c&&C(e),I(n),c&&C(l),c&&C(r),I(s),I(a)}}}class fn extends X{constructor(e){super(),D(this,e,null,cn,V,{})}}function un(t){let e,n,l;return n=new fn({}),{c(){e=k("main"),Y(n.$$.fragment)},m(r,o){O(r,e,o),q(n,e,null),l=!0},p:S,i(r){l||(A(n.$$.fragment,r),l=!0)},o(r){j(n.$$.fragment,r),l=!1},d(r){r&&C(e),I(n)}}}class _n extends X{constructor(e){super(),D(this,e,null,un,V,{})}}const dn=async()=>{const t=performance.now();await Je();const e=performance.now();return console.log(`Call to wasm init took ${e-t} milliseconds`),new _n({target:document.getElementById("app")})};dn();