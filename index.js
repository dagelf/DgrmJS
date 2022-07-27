!function(){"use strict";function t(t,e){if(!t)return null;let i;for(const s of t)e&&!e(s)||(i=s);return i}function e(t,e){for(const i of t)if(!e||e(i))return i;return null}function i(t,e){if(!t)return!1;for(const i of t)if(!e||e(i))return!0;return!1}function s(t,e){if(!t.stateHas(e)){const i=t.stateGet();t.update({state:i.add(e)})}}function n(t,e){if(t.stateHas(e)){const n=t.stateGet();t.update({state:(i=n,s=e,i.delete(s),i)})}var i,s}class o{constructor(t){this.o=t}add(t,e){const i=this.o.append("path",{templateKey:"path",start:{position:o.h(t),dir:t.dir},end:{position:o.h(e),dir:e.dir?e.dir:o.p(t.dir)},startConnector:t,endConnector:e});return s(e,"connected"),o.u(t.shape,i),o.u(e.shape,i),i}replaceEnd(t,e){const a=t.end;t.update({end:{position:o.h(e),dir:e.dir?e.dir:t.end.dir},endConnector:e}),a.shape!==e.shape&&(t.start.shape!==a.shape&&a.shape.connectedPaths.delete(t),o.u(e.shape,t)),i(a.shape.connectedPaths,(t=>t.start===a||t.end===a))||n(a,"connected"),s(e,"connected")}updatePosition(t){if(!i(t.connectedPaths))return;const e=t.positionGet();for(const i of t.connectedPaths)i.update({start:i.start.shape===t?{position:{x:e.x+i.start.innerPosition.x,y:e.y+i.start.innerPosition.y}}:null,end:i.end.shape===t?{position:{x:e.x+i.end.innerPosition.x,y:e.y+i.end.innerPosition.y}}:null})}del(t){switch(t.type){case"shape":this.v(t);break;case"path":this.g(t)}}g(t){t.end.shape.connectedPaths.delete(t),i(t.end.shape.connectedPaths,(e=>e.end===t.end))||n(t.end,"connected"),t.start.shape.connectedPaths.delete(t),t.end.shape.connectable&&this.o.delete(t.end.shape),this.o.delete(t)}v(t){if(this.o.delete(t),i(t.connectedPaths))for(const e of t.connectedPaths)this.g(e)}static u(t,e){t.connectedPaths||(t.connectedPaths=new Set),t.connectedPaths.add(e)}static h(t){const e=t.shape.positionGet();return{x:e.x+t.innerPosition.x,y:e.y+t.innerPosition.y}}static p(t){switch(t){case"bottom":return"top";case"top":return"bottom";case"left":return"right";case"right":return"left"}}}class a extends EventTarget{constructor(t,e,i){super(),this.o=t.on("pointermove",this).on("pointerdown",this).on("pointerup",this).on("pointerenter",this).on("canvasleave",this),this.m=e,this.k=i(this)}on(t,e){return this.addEventListener(t,e),this}add(t,e){let i;switch(t){case"shape":i=this.o.append("shape",e);break;case"path":i=this.m.add(h(e.start),h(e.end))}return this.dispatch("add",i),i}shapeUpdate(t,e){t.update(e),(e.position||e.connectors)&&this.m.updatePosition(t)}del(t){this.selected=null,this.m.del(t)}handleEvent(t){switch(t.type){case"canvasleave":case"pointermove":this.C&&this.$(this.C,t);break;case"pointerdown":this.C=t.detail.target,this.$(this.C,t);break;case"pointerup":this.C&&this.$(this.C,t),this.C=null;break;case"pointerenter":this.C&&(this.M&&this.$(this.C,{type:"pointerleave",detail:{target:this.M,enterTo:t.detail.target}}),this.$(this.C,t)),this.M=t.detail.target}}$(t,e){this.k.get(t.type).process(t,e)}set activeElement(t){this.C=t}set selected(t){t!==this.H&&(this.H&&this.$(this.H,{type:"unselect"}),this.H=t,t&&(this.dispatch("select",t),s(t,"selected")))}get selected(){return this.H}dispatch(t,e){return this.dispatchEvent(new CustomEvent(t,{cancelable:!0,detail:{target:e}}))}}function h(t){return t.type?t:t.shape.connectors.get(t.key)}function r(t,i,s){let n=e(t.transform.baseVal,(t=>t.type===i));return n||(n=(t.ownerSVGElement||s).createSVGTransform(),t.transform.baseVal.appendItem(n)),n}function c(t,e,i){r(t,SVGTransform.SVG_TRANSFORM_TRANSLATE,i).setTranslate(e.x,e.y)}function d(t){const e=r(t,SVGTransform.SVG_TRANSFORM_TRANSLATE).matrix;return{x:e.e,y:e.f}}function l(t,e,i){t.innerHTML=function(t,e,i){return t.split("\n").map(((t,s)=>`<tspan x="${e}" dy="${0===s?".4em":`${i}px`}" ${0===t.length?'visibility="hidden"':""}>${0===t.length?".":function(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}(t).replaceAll(" ","&nbsp;")}</tspan>`)).join("")}(e,t.x?.baseVal[0]?.value??0,i.lineHeight),null!=i.verticalMiddle&&(t.y.baseVal[0].value=i.verticalMiddle-t.getBBox().height/2)}function p(t,e,i){t.has(i)?e.classList.add(i):e.classList.remove(i)}class u{constructor({svgEl:t,start:e,end:i,startConnector:s,endConnector:n}){this.type="path",this.svgEl=t,this._=t.querySelector('[data-key="path"]'),this.L=t.querySelector('[data-key="outer"]'),this.H=t.querySelector('[data-key="selected"]'),this.V=t.querySelector('[data-key="arrow"]'),this.S=new Set,this.T={},this.P={},this.update({start:e,end:i,startConnector:s,endConnector:n})}stateHas(t){return this.S.has(t)}stateGet(){return new Set(this.S)}update(t){if(t.start&&Object.assign(this.T,t.start),t.end&&(Object.assign(this.P,t.end),this.D()),(t.start||t.end)&&this.O(),t.endConnector&&this.end!==t.endConnector&&(this.end&&n(this.end,"selected"),this.end=t.endConnector,this.svgEl.parentNode.appendChild(this.svgEl)),t.startConnector&&(this.start=t.startConnector),t.state){this.S=t.state;for(const e of["selected","disabled"])p(this.S,this.svgEl,e),t.state.has(e)?s(this.end.shape.connectable?this.end.shape:this.end,e):n(this.end.shape.connectable?this.end.shape:this.end,e)}}O(){const t=u.U(70,this.T,this.P);this._.setAttribute("d",t),this.L.setAttribute("d",t),this.H.setAttribute("d",t)}D(){c(this.V,this.P.position),function(t,e,i){r(t,SVGTransform.SVG_TRANSFORM_ROTATE,i).setRotate(e,0,0)}(this.V,"right"===this.P.dir?180:"left"===this.P.dir?0:"bottom"===this.P.dir?270:90)}dispose(){this._=null,this.L=null,this.H=null,this.V=null}static U(t,e,i){return`M ${e.position.x} ${e.position.y} C ${u.A(e.dir,e.position.x,t)} ${u.j(e.dir,e.position.y,t)}, ${u.A(i.dir,i.position.x,t)} ${u.j(i.dir,i.position.y,t)}, ${i.position.x} ${i.position.y}`}static A(t,e,i){return"right"===t||"left"===t?"right"===t?e+i:e-i:e}static j(t,e,i){return"right"===t||"left"===t?e:"bottom"===t?e+i:e-i}}function f(t){const e=t.svgCanvas.ownerSVGElement.getElementsByTagName("defs")[0].querySelector(`[data-templ='${t.createParams.templateKey}']`).cloneNode(!0);return t.svgCanvas.append(e),new u({svgEl:e,start:t.createParams.start,end:t.createParams.end,startConnector:t.createParams.startConnector,endConnector:t.createParams.endConnector})}class v{constructor({svgEl:t,type:e=null,connectable:i=null,defaultInConnector:s=null}){this.S=new Set,this.svgEl=t,this.type=e||"shape",this.connectable=i,this.defaultInConnector=s,this.connectors=new Map}stateHas(t){return this.S.has(t)}stateGet(){return new Set(this.S)}positionGet(){return d(this.svgEl)}update(t){if(t.position&&c(this.svgEl,t.position),t.props&&v.G(this.svgEl,t.props),t.connectors&&Object.keys(t.connectors).forEach((e=>{const i=t.connectors[e],s=this.connectors.get(e);i.innerPosition&&(s.innerPosition=i.innerPosition),i.dir&&(s.dir=i.dir)})),t.state){this.S=t.state;for(const t of["selected","hovered","disabled"])p(this.S,this.svgEl,t);this.connectors?.forEach((e=>{t.state.has("hovered")||n(e,"hovered")}))}}static G(t,e){Object.keys(e).forEach((i=>{const s="root"===i?t:t.querySelector(`[data-key='${i}'`);Object.keys(e[i]).forEach((t=>{if("textContent"===t)l(s,e[i][t]?.toString(),g(s));else s.setAttribute(t,e[i][t].toString())}))}))}}function g(t){return{lineHeight:parseInt(t.getAttribute("data-line-height")),verticalMiddle:t.hasAttribute("data-vertical-middle")?parseInt(t.getAttribute("data-vertical-middle")):null}}class m extends EventTarget{constructor(t,e){super(),this.B=e,this.R=t,this.R.addEventListener("pointermove",this),this.R.addEventListener("pointerdown",this),this.R.addEventListener("pointerup",this),this.R.addEventListener("pointerleave",this),this.I=new WeakMap,this.F=t.querySelector('[data-key="canvas"]'),this.canvas=new v({svgEl:this.F,type:"canvas"}),this.I.set(this.F,this.canvas)}append(t,e){return this.B(t,{svgCanvas:this.F,svgElemToPresenterObj:this.I,createParams:e})}delete(t){if(t.dispose&&t.dispose(),this.I.delete(t.svgEl),"shape"===t.type){for(const e of t.connectors)this.I.delete(e[1].svgEl);t.defaultInConnector&&this.I.delete(t.defaultInConnector.svgEl)}t.svgEl.remove()}on(t,e){return this.addEventListener(t,e),this}handleEvent(t){switch(t.type){case"pointermove":0===t.movementX&&0===t.movementY||(this.K(t),this.X(t,"pointermove",null));break;case"pointerdown":case"pointerup":this.X(t,t.type,m.N(t,!0));break;case"pointerleave":this.dispatchEvent(new CustomEvent("canvasleave"))}}K(t){const e=m.N(t,!1);e!==this.J&&(e&&this.X(t,"pointerenter",e),this.J=e)}static N(t,i){const s=document.elementsFromPoint(t.clientX,t.clientY);return i?e(s,(t=>t.hasAttribute("data-evt-z-index")&&!t.hasAttribute("data-evt-no-click")))??(s[0].hasAttribute("data-evt-no-click")?s[1]:s[0]):e(s,(t=>t.hasAttribute("data-evt-z-index")))??s[0]}X(t,e,i){let s=null;i&&(s=this.I.get(i===this.R||i.ownerSVGElement!==this.R?this.F:i),s||(s=this.I.get(i.closest("[data-connect]"))),s||(s=this.I.get(i.closest("[data-templ]")))),this.dispatchEvent(new CustomEvent(e,{detail:{target:s,clientX:t.clientX,clientY:t.clientY}}))}}class w{constructor({svgEl:t,connectorType:e,shape:i,key:s,innerPosition:n,dir:o}){this.svgEl=t,this.S=new Set,this.type="connector",this.connectorType=e,this.shape=i,this.key=s,this.innerPosition=n,this.dir=o}stateHas(t){return this.S.has(t)}stateGet(){return new Set(this.S)}update(t){this.S=t.state;for(const t of["connected","hovered","selected"])p(this.S,this.svgEl,t);t.state.has("hovered")&&s(this.shape,"hovered")}}function x(t,e){const i=t.ownerSVGElement.getElementsByTagName("defs")[0].querySelector(`[data-templ='${e.templateKey}']`).cloneNode(!0);return t.append(i),new v({svgEl:i})}function y(t,e){return new w({svgEl:t,connectorType:"in"===t.getAttribute("data-connect")?"in":"out",shape:e,key:t.getAttribute("data-key"),innerPosition:b(t),dir:t.getAttribute("data-connect-dir")})}function b(t){if(!t.getAttribute("data-connect-point"))return null;const e=t.getAttribute("data-connect-point").split(",");return{x:parseFloat(e[0]),y:parseFloat(e[1])}}class k{constructor(t,e){this.Y=t,this.m=e}process(e,i){switch(i.type){case"pointermove":switch(e.connectorType){case"out":{const t=this.Y.add("shape",E(e));this.Y.add("path",{start:e,end:t.defaultInConnector}),this.Y.activeElement=t;break}case"in":{const i="path"===this.Y.selected?.type&&this.Y.selected.end===e?this.Y.selected:t(e.shape.connectedPaths,(t=>t.end===e));if(!this.Y.dispatch("disconnect",i))return;const s=this.Y.add("shape",E(e));this.m.replaceEnd(i,s.defaultInConnector),this.Y.activeElement=s}}break;case"pointerup":if("in"!==e.connectorType)return;this.Y.selected=t(e.shape.connectedPaths,(t=>t.end===e))}}}function E(t){const e=t.shape.positionGet(),i=t.innerPosition;return{templateKey:"connect-end",position:{x:e.x+i.x,y:e.y+i.y},postionIsIntoCanvas:!0}}const C=Symbol(0);class ${constructor(t,e){this.Y=t,this.m=e}process(t,i){switch(i.type){case"pointermove":if(!t[C]){this.Y.selected=null,z(t,!0);const e=t.positionGet();t[C]={x:e.x-i.detail.clientX,y:e.y-i.detail.clientY}}this.Y.shapeUpdate(t,{position:{x:t[C].x+i.detail.clientX,y:t[C].y+i.detail.clientY}});break;case"pointerup":if(!t[C])return void(this.Y.selected=M(t));if(t.connectable&&"in"===i.detail.target.connectorType){const s=e(t.connectedPaths);if(!this.Y.dispatch("connect",s))return;this.m.replaceEnd(s,i.detail.target),this.Y.del(t),n(s,"disabled"),t=null}this.Z(t);break;case"unselect":n(M(t),"selected");break;case"canvasleave":this.Z(t);break;case"pointerenter":t.connectable&&["connector","shape"].includes(i.detail.target.type)&&(s(i.detail.target,"hovered"),this.q("shape"===i.detail.target.type?i.detail.target:i.detail.target.shape));break;case"pointerleave":if(!t.connectable)return;switch(i.detail.target.type){case"shape":i.detail.enterTo?.shape!==i.detail.target&&this.q(null);break;case"connector":i.detail.target?.shape!==i.detail.enterTo?this.q(i.detail.target.shape):n(i.detail.target,"hovered")}}}Z(t){t&&(z(t,!1),delete t[C]),this.q(null),this.Y.activeElement=null}q(t){this.M&&this.M!==t&&n(this.M,"hovered"),this.M=t}}function z(t,e){!function(t,e,i){(i?s:n)(t,e)}(M(t),"disabled",e)}function M(t){return t.connectable?e(t.connectedPaths):t}class H{constructor(t){this.Y=t}process(t,e){switch(e.type){case"pointerup":this.Y.selected=t;break;case"unselect":n(t,"selected")}}}function _(t,e){const i=new m(t,(function(t,i){switch(t){case"shape":return function(t,e){if(!t.createParams.postionIsIntoCanvas){const e=d(t.svgCanvas);t.createParams.position.x-=e.x,t.createParams.position.y-=e.y}const i=e?e("shape",t):x(t.svgCanvas,t.createParams);return t.svgElemToPresenterObj.set(i.svgEl,i),function(t,e){e.connectable="true"===e.svgEl.getAttribute("data-connectable"),b(e.svgEl)&&(e.defaultInConnector=y(e.svgEl,e)),e.svgEl.querySelectorAll("[data-connect]").forEach((i=>{const s=y(i,e);t.set(i,s),e.connectors.set(s.key,s)})),t.set(e.svgEl,e)}(t.svgElemToPresenterObj,i),i.update(t.createParams),i}(i,e);case"path":{const t=e?e("path",i):f(i);return i.svgElemToPresenterObj.set(t.svgEl,t),t}}})),s=new o(i);return new a(i,s,(t=>{const e=new $(t,s);return new Map([["shape",e],["canvas",e],["connector",new k(t,s)],["path",new H(t)]])}))}class L{constructor(t){this.svgElement=t,this.type=t.type,this.svgEl=this.svgElement.svgEl,this.svgElement.svgEl.addEventListener("pointerdown",this),this.svgElement.svgEl.addEventListener("pointerup",this),this.svgElement.svgEl.addEventListener("click",this)}update(t){t.state&&this.W&&(this.W=!1,this.onEditLeave()),t.state&&(this.tt=!1),this.svgElement.update(t)}dispose(){this.W&&this.onEditLeave(),this.svgElement.dispose&&this.svgElement.dispose()}handleEvent(t){if(!t.target.hasAttribute("data-evt-no-click")&&document.elementFromPoint(t.clientX,t.clientY)===t.target)if("click"!==t.type){if(!this.W)switch(t.type){case"pointerdown":this.tt=this.svgElement.stateGet().has("selected");break;case"pointerup":this.tt&&(this.W=!0,this.onEdit(t))}}else this.onClick(t,this.W)}onEdit(t){}onEditLeave(){}onClick(t,e){}}class V extends L{constructor(t){super(t),this.connectable=this.svgElement.connectable,this.defaultInConnector=this.svgElement.defaultInConnector,this.connectors=this.svgElement.connectors}stateHas(t){return this.svgElement.stateHas(t)}stateGet(){return this.svgElement.stateGet()}positionGet(){return this.svgElement.positionGet()}update(t){t.state&&this.W&&(this.W=!1,this.onEditLeave()),super.update(t)}}function S(t,e,i,s,n){const o=t.getBBox(),a=o.width+20;e.width.baseVal.value=a+2*s+2,e.x.baseVal.value=o.x-s-("center"===n?10:0),e.height.baseVal.value=o.height+2*s+3,e.y.baseVal.value=o.y-s,i.style.width=`${a}px`,i.style.height=`${o.height}px`}function T(t,e,i,s,n){let o;switch(i.tagName){case"tspan":o=t.querySelector(`[data-text-for=${i.parentElement.getAttribute("data-key")}]`);break;case"text":o=t.querySelector(`[data-text-for=${i.getAttribute("data-key")}]`);break;default:i.getAttribute("data-text-for")&&(o=i)}if(!o)return;o.classList.remove("empty");const a=o.getAttribute("data-text-for"),h=t.querySelector(`[data-key=${a}]`);return function(t,e,i,s,n){const o=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),a=document.createElement("textarea");a.style.caretColor=t.getAttribute("fill"),a.value=i,a.oninput=function(){l(t,a.value,e),S(t,o,a,r,h.textAlign),s(a.value)},a.onblur=function(){n(a.value)},a.onpointerdown=function(t){t.stopImmediatePropagation()},o.appendChild(a),t.parentElement.appendChild(o);const h=getComputedStyle(a),r=parseInt(h.padding)+parseInt(h.borderWidth);return S(t,o,a,r,h.textAlign),a.focus(),o}(h,g(h),e[a]?.textContent.toString(),(t=>{s(h,{[a]:{textContent:t}})}),(t=>{t?o.classList.remove("empty"):o.classList.add("empty"),n()}))}class P extends V{constructor(t,e){super(t),this.et=Object.assign({},e)}on(t,e){return this.it||(this.it=[]),this.it.push({t:t,l:e}),this.svgEl.addEventListener(t,e),this}dispose(){this.it?.forEach((t=>this.svgElement.svgEl.removeEventListener(t.t,t.l))),super.dispose()}update(t){var e,i;t.props&&Object.assign(this.et,t.props),t.state&&t.state.has("selected")&&!this.stateGet().has("selected")&&(e=this.svgEl,i=this.et,e.querySelectorAll("[data-text-for]").forEach((t=>{i[t.getAttribute("data-text-for")]?.textContent||t.classList.add("empty")}))),super.update(t)}onClick(t,e){e&&this.st(t)}onEditLeave(){this.nt()}st(t){this.ot||(this.ot=T(this.svgEl,this.et,t.target,((t,e)=>{Object.assign(this.et,e),this.onTextChange(t,e)}),(t=>{this.nt()})))}onTextChange(t,e){this.svgEl.dispatchEvent(new CustomEvent("txtUpd",{detail:{target:this,props:e}}))}nt(){this.ot&&!this.ht&&(this.ht=!0,this.ot.remove(),this.ot=null,this.ht=!1)}}class D extends P{onEdit(t){this.svgEl.classList.add("edit"),this.rt()}onEditLeave(){super.onEditLeave(),this.svgEl.classList.remove("edit"),this.ct()}rt(){this.dt=U(),this.dt.onclick=t=>{this.ct(),this.svgEl.dispatchEvent(new CustomEvent("del",{detail:{target:this}}))},this.panelUpdPos(),document.body.append(this.dt)}panelUpdPos(){if(!this.dt)return;const t=this.svgEl.getBoundingClientRect();this.dt.style.top=window.scrollY+t.top-35+"px",this.dt.style.left=`${t.left+10}px`}ct(){this.dt&&(this.dt.remove(),this.dt=null)}}class O extends L{get end(){return this.svgElement.end}get start(){return this.svgElement.start}stateHas(t){return this.svgElement.stateHas(t)}stateGet(){return this.svgElement.stateGet()}on(t,e){return this.it||(this.it=[]),this.it.push({t:t,l:e}),this.svgElement.svgEl.addEventListener(t,e),this}dispose(){this.it?.forEach((t=>this.svgElement.svgEl.removeEventListener(t.t,t.l))),super.dispose()}onEdit(t){this.dt=U(),this.dt.style.top=t.clientY-55+"px",this.dt.style.left=t.clientX-20+"px",this.dt.onclick=t=>{this.ct(),this.svgEl.dispatchEvent(new CustomEvent("del",{detail:{target:this}}))},document.body.append(this.dt)}onEditLeave(){this.ct()}ct(){this.dt&&(this.dt.remove(),this.dt=null)}}function U(){const t=document.createElement("div");return t.style.cssText="position: fixed; padding: 10px;\tbox-shadow: 0px 0px 58px 2px rgb(34 60 80 / 20%); border-radius: 16px; background-color: rgba(255,255,255, .9);",t.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" fill="rgba(52,71,103,1)"/></svg>',t}function A(t,e=0){const i=t.x-e,s=t.x+t.width+e,n=t.y-e,o=t.y+t.height+e;return[{x:i,y:n},{x:s,y:n},{x:i,y:o},{x:s,y:o}]}function j(t,e,i){return i<=t?t:t+Math.ceil((i-t)/e)*e}class G extends D{constructor(t,e,i){super(e,i),this.Y=t,this.lt=60}update(t){super.update(t),void 0!==t.props?.text?.textContent&&this.ut(this.svgEl.querySelector('[data-key="text"]'))}onTextChange(t,e){super.onTextChange(t,e),this.ut(t)}ut(t){let e=0;for(const i of t.getElementsByTagName("tspan"))for(const t of A(i.getBBox())){const i=t.x**2+t.y**2;i>e&&(e=i)}const i=j(60,20,Math.sqrt(e));i!==this.lt&&(this.lt=i,this.ft(i),this.panelUpdPos())}ft(t){const e=-1*t,i={right:{cx:t},left:{cx:e},bottom:{cy:t},top:{cy:e}},s={right:{innerPosition:{x:t,y:0}},left:{innerPosition:{x:e,y:0}},bottom:{innerPosition:{x:0,y:t}},top:{innerPosition:{x:0,y:e}}};this.Y.shapeUpdate(this,{props:{main:{r:t},outer:{r:t+20},outright:i.right,outleft:i.left,outbottom:i.bottom,outtop:i.top,inright:i.right,inleft:i.left,inbottom:i.bottom,intop:i.top},connectors:{outright:s.right,outleft:s.left,outbottom:s.bottom,outtop:s.top,inright:s.right,inleft:s.left,inbottom:s.bottom,intop:s.top}})}}class B extends D{constructor(t,e,i){super(e,i),this.Y=t,this.vt=150,this.gt=150,this.wt=50,this.xt=50}update(t){super.update(t),void 0!==t.props?.text?.textContent&&this.ut(this.svgEl.querySelector('[data-key="text"]'))}onTextChange(t,e){super.onTextChange(t,e),this.ut(t)}ut(t){let e=0;for(const i of t.getElementsByTagName("tspan")){const t=i.getBBox().width+4;t>e&&(e=t)}const i=j(this.gt,40,e),s=j(this.xt,20,t.getBBox().height+4);i===this.vt&&s===this.wt||(this.vt=i,this.wt=s,this.ft(i,s),this.panelUpdPos())}ft(t,e){const i=R(this.gt,this.xt,t,e),s={r:{cx:t+i.x,cy:e/2+i.y},l:{cx:i.x,cy:e/2+i.y},b:{cx:t/2+i.x,cy:e+i.y},t:{cx:t/2+i.x,cy:i.y}},n={right:{innerPosition:{x:s.r.cx,y:s.r.cy}},left:{innerPosition:{x:s.l.cx,y:s.l.cy}},bottom:{innerPosition:{x:s.b.cx,y:s.b.cy}},top:{innerPosition:{x:s.t.cx,y:s.t.cy}}};this.Y.shapeUpdate(this,{props:{main:i,outer:R(this.gt,this.xt,t+40,e+40),outright:s.r,outleft:s.l,outbottom:s.b,outtop:s.t,inright:s.r,inleft:s.l,inbottom:s.b,intop:s.t},connectors:{outright:n.right,outleft:n.left,outbottom:n.bottom,outtop:n.top,inright:n.right,inleft:n.left,inbottom:n.bottom,intop:n.top}})}}function R(t,e,i,s){return{y:(e-s)/2,x:(t-i)/2,width:i,height:s}}function I(t,e,i){const s=t.ownerSVGElement.createSVGPoint();return s.x=e,s.y=i,t.isPointInFill(s)||t.isPointInStroke(s)}class F extends D{constructor(t,e,i){super(e,i),this.Y=t,this.yt=120}update(t){super.update(t),void 0!==t.props?.text?.textContent&&this.ut(this.svgEl.querySelector('[data-key="text"]'))}onTextChange(t,e){super.onTextChange(t,e),this.ut(t)}ut(t){this.bt||(this.bt=function(t,e){const i=t.querySelector(`[data-key="${e}"]`),s=i.cloneNode(!1);return s.style.fill="transparent",s.style.stroke="transparent",s.removeAttribute("data-key"),t.insertBefore(s,i),s}(this.svgEl,"main"));const e=function(t,e,i,s){let n=i;if(s(n)){do{n+=e}while(s(n));return n}if(t===n)return null;do{n-=e}while(t<=n&&!s(n));return n+=e,i!==n?n:null}(120,40,this.yt,(e=>(this.bt.setAttribute("d",X(120,70,e)),function(t,e,s=0){return i(t.getElementsByTagName("tspan"),(t=>{const i=t.getBBox(),n=i.x-s,o=i.x+i.width+s,a=i.y-s,h=i.y+i.height+s;return!(I(e,n,a)&&I(e,o,a)&&I(e,n,h)&&I(e,o,h))}))}(t,this.bt))));e&&(this.yt=e,this.ft(e),this.panelUpdPos())}ft(t){const e={d:X(120,70,t)},i=K(120,70,t+16),s={left:{cx:i.l.x},right:{cx:i.r.x},top:{cy:i.t.y},bottom:{cy:i.b.y}},n={left:{innerPosition:i.l},right:{innerPosition:i.r},top:{innerPosition:i.t},bottom:{innerPosition:i.b}};this.Y.shapeUpdate(this,{props:{main:e,outer:{d:X(120,70,t+80)},border:e,outleft:s.left,outright:s.right,outtop:s.top,outbottom:s.bottom,inleft:s.left,inright:s.right,intop:s.top,inbottom:s.bottom},connectors:{outleft:n.left,outright:n.right,outtop:n.top,outbottom:n.bottom,inleft:n.left,inright:n.right,intop:n.top,inbottom:n.bottom}})}onEditLeave(){super.onEditLeave(),this.bt&&(this.bt.remove(),this.bt=null)}}function K(t,e,i){const s=(i-t)/2,n=-1*s;return{l:{x:n,y:e/2},t:{x:t/2,y:n},r:{x:t+s,y:e/2},b:{x:t/2,y:e+s}}}function X(t,e,i){const s=K(t,e,i);return`M${s.l.x} ${s.l.y} L${s.t.x} ${s.t.y} L${s.r.x} ${s.r.y} L${s.b.x} ${s.b.y} Z`}async function N(t,e,i){return function(t,e,i){let s,n;const o=J(t,e);if(o)s=new DataView(t,0,o.byteOffset-8),n=new DataView(t,o.byteOffset+o.byteLength+4);else{const e=t.byteLength-12;s=new DataView(t,0,e),n=new DataView(t,e)}const a=new DataView(new ArrayBuffer(8));return a.setUint32(0,i.length),a.setUint32(4,e),new Blob([s,a,i,new Uint32Array([0]),n],{type:"image/png"})}(await t.arrayBuffer(),Y(e),i)}function J(t,e){const i=new DataView(t,8);let s,n=0,o=i.getUint32(4);for(;1229278788!==o;){if(s=i.getUint32(n),o===e)return new DataView(t,n+16,s);n=n+12+s,o=i.getUint32(n+4)}return null}function Y(t){return new DataView((new TextEncoder).encode(t).buffer).getUint32(0)}function Z(t,e,i){const s=t.cloneNode(!0);s.querySelectorAll(".selected").forEach((t=>t.classList.remove("selected")));const n=function(t,e){let i;for(const s of t.querySelectorAll(e)){i||(i={top:1/0,left:1/0,bottom:-1/0,right:-1/0});const t=s.getBoundingClientRect();t.top<i.top&&(i.top=t.top),t.left<i.left&&(i.left=t.left),t.right>i.right&&(i.right=t.right),t.bottom>i.bottom&&(i.bottom=t.bottom)}return i?{x:i.left,y:i.top,height:i.bottom-i.top,width:i.right-i.left}:null}(t,'[data-key="canvas"]'),o=s.querySelector('[data-key="canvas"]'),a=d(o);c(o,{x:-1*n.x+a.x+15,y:-1*n.y+a.y+15}),function(t,e,i,s){const n=new Image;n.width=e.width*i*window.devicePixelRatio,n.height=e.height*i*window.devicePixelRatio,n.onload=function(){const t=document.createElement("canvas");t.width=n.width,t.height=n.height,t.style.width=`${n.width}px`,t.style.height=`${n.height}px`;const i=t.getContext("2d");i.imageSmoothingEnabled=!1,i.drawImage(n,e.x,e.y,e.width,e.height,0,0,n.width,n.height),URL.revokeObjectURL(n.src),t.toBlob(s,"image/png")},t.width.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,n.width),t.height.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,n.height),n.src=URL.createObjectURL(new Blob([(new XMLSerializer).serializeToString(t)],{type:"image/svg+xml;charset=utf-8"}))}(s,{x:0,y:0,height:n.height+30,width:n.width+30},3,i?async function(t){e(await N(t,"dgRm",(new TextEncoder).encode(i)))}:e)}async function q(t){const e=await async function(t,e){return J(await t.arrayBuffer(),Y(e))}(t,"dgRm");return e?(new TextDecoder).decode(e):null}const W={pngCreate(t){const e=this.dataGet();e?Z(this.svg,t,JSON.stringify(e)):t(null)},async pngLoad(t){const e=await q(t);return!!e&&(this.dataSet(JSON.parse(e)),!0)}};class Q extends EventTarget{constructor(t,e){super(),this.svg=t,this.kt=new Map,this.Y=e.on("add",this)}handleEvent(t){switch(t.type){case"add":t.detail.target instanceof D?t.detail.target.on("txtUpd",this).on("del",this):t.detail.target instanceof O&&t.detail.target.on("del",this);break;case"txtUpd":this.kt.get(t.detail.target).detail=t.detail.props.text.textContent;break;case"del":this.Et(t.detail.target)}}Et(t){this.Y.del(t),"shape"===t.type&&this.kt.delete(t)}shapeAdd(t){const e=this.Y.add("shape",t);return this.kt.set(e,{templateKey:t.templateKey,detail:t.props.text?.textContent}),this.dispatchEvent(new CustomEvent("shapeAdd",{cancelable:!0,detail:e})),e}shapeUpdate(t,e){this.Y.shapeUpdate(t,e)}set activeElement(t){this.Y.activeElement=t}clear(){for(const t of this.kt)this.Et(t[0])}dataGet(){if(!i(this.kt))return null;const t={s:[],c:[]},e=new Map;for(const i of this.kt){const s=i[0].positionGet();s.x=Math.trunc(s.x),s.y=Math.trunc(s.y),i[1].position=s,e.set(i[0],t.s.push(i[1])-1)}const s=new Set;for(const n of this.kt)if(i(n[0].connectedPaths))for(const i of n[0].connectedPaths)!s.has(i)&&i.end.key&&(s.add(i),t.c.push({s:{i:e.get(i.start.shape),c:i.start.key},e:{i:e.get(i.end.shape),c:i.end.key}}));return 0===s.size&&delete t.c,t}dataSet(t){if(this.clear(),!(t.s&&t.s.length>0))return;const e=[];for(const i of t.s){const t=this.shapeAdd({templateKey:i.templateKey,position:i.position,props:{text:{textContent:i.detail}}});e.push(t)}if(t.c&&t.c.length>0)for(const i of t.c)this.Y.add("path",{start:{shape:e[i.s.i],key:i.s.c},end:{shape:e[i.e.i],key:i.e.c}})}on(t,e){return this.addEventListener(t,e),this}}Object.assign(Q.prototype,W);const tt="https://dgrm.boyko.tech/api";class et extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML='<style>.menu{overflow-x:auto;padding:0;position:fixed;bottom:15px;left:50%;transform:translateX(-50%);box-shadow:0 0 58px 2px rgba(34,60,80,.2);border-radius:16px;background-color:rgba(255,255,255,.9)}.content{white-space:nowrap;display:flex}[data-cmd]{cursor:pointer}.menu svg{height:42px;display:inline-block;padding:15px 10px;stroke:#344767;stroke-width:2px;fill:#fff;width:42px;min-width:42px}.menu .big{width:62px;min-width:62px}@media only screen and (max-width:700px){.menu{width:100%;border-radius:0;bottom:0;display:flex;flex-direction:column}.content{align-self:center}}</style><div id="menu" class="menu" style="touch-action:none"><div class="content"><svg data-cmd="shapeAdd" data-cmd-arg="circle" style="padding-left:20px"><circle r="20" cx="21" cy="21"></circle></svg> <svg data-cmd="shapeAdd" data-cmd-arg="rect" class="big"><rect x="1" y="1" width="60" height="40" rx="15" ry="15"></rect></svg> <svg data-cmd="shapeAdd" data-cmd-arg="rhomb" class="big"><g transform="translate(1,1)"><path d="M0 20 L30 0 L60 20 L30 40 Z" stroke-width="2" stroke-linejoin="round"></path></g></svg> <svg data-cmd="shapeAdd" data-cmd-arg="text"><text x="5" y="40" font-size="52px" fill="#344767" stroke-width="0">T</text></svg></div></div>';const e=t.getElementById("menu");e.querySelectorAll('[data-cmd="shapeAdd"]').forEach((t=>t.addEventListener("pointerdown",this))),e.addEventListener("pointerleave",this),e.addEventListener("pointerup",this),e.addEventListener("pointermove",this)}init(t){this.Ct=new it(t)}handleEvent(t){switch(t.type){case"pointerdown":this.$t=!1,this.zt=!1,this.Mt=t.currentTarget.getAttribute("data-cmd-arg"),this.Ht=document.elementFromPoint(t.clientX,t.clientY),this.J=this.Ht;break;case"pointerup":this.$t=!1,this.zt=!1,this.Mt=null,this.Ct.pointerUpMobile();break;case"pointermove":this._t(t),!this.$t&&this.zt&&this.Ct.shapeMoveMobile({clientX:t.clientX,clientY:t.clientY});break;case"pointerleave":this.$t=!0,this.Lt(t)}}_t(t){if(!this.Mt)return;const e=document.elementFromPoint(t.clientX,t.clientY);e!==this.J&&(this.Ht===this.J&&this.Lt(t),this.J=e)}Lt(t){this.Mt&&(this.Ct.shapeDragOut({shape:this.Mt,clientX:t.clientX,clientY:t.clientY}),this.Mt=null,this.zt=!0)}}customElements.define("ap-menu-shape",et);class it{constructor(t){this.Y=t}shapeDragOut(t){const e=this.Y.svg.querySelector(`[data-templ='${t.shape}']`).getAttribute("data-center").split(",");this.Vt={x:parseFloat(e[0]),y:parseFloat(e[1])},this.St=this.Y.shapeAdd({templateKey:t.shape,position:{x:t.clientX-this.Vt.x,y:t.clientY-this.Vt.y},props:{text:{textContent:"Title"}}}),this.Y.activeElement=this.St;const i=this.St.positionGet();this.Tt={x:t.clientX-this.Vt.x-i.x,y:t.clientY-this.Vt.y-i.y}}shapeMoveMobile(t){this.Y.shapeUpdate(this.St,{position:{x:t.clientX-this.Vt.x-this.Tt.x,y:t.clientY-this.Vt.y-this.Tt.y}})}pointerUpMobile(){this.St&&(this.Y.activeElement=null)}}let st;function nt(t,e){t?(st||(st=document.createElement("div"),st.style.cssText="z-index: 2; position: fixed; left: 0; top: 0; width:100%; height:100%; background: #fff; opacity: 0",st.innerHTML="<style>@keyframes blnk{0%{opacity:0}50%{opacity:.7}100%{opacity:0}}.blnk{animation:blnk 1.6s linear infinite}</style>",document.body.append(st)),e?st.classList.add("blnk"):st.classList.remove("blnk")):!t&&st&&(st.remove(),st=null)}class ot extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML='<style>.menu{position:fixed;top:15px;left:15px;cursor:pointer}.options{position:fixed;padding:15px;box-shadow:0 0 58px 2px rgb(34 60 80 / 20%);border-radius:16px;background-color:rgba(255,255,255,.9);top:0;left:0;z-index:1}.options a,.options div{color:#0d6efd;cursor:pointer;margin:10px 0;display:flex;align-items:center;line-height:25px;text-decoration:none}.options a svg,.options div svg{margin-right:10px}.load svg{animation:rot 1.2s linear infinite}@keyframes rot{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}</style><svg data-cmd="menu" class="menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgba(52,71,103,1)"/></svg><div class="options" style="visibility:hidden"><div data-cmd="menu" style="margin:0 0 15px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgba(52,71,103,1)"/></svg></div><div data-cmd="new"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 2.003V2h10.998C20.55 2 21 2.455 21 2.992v18.016a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V8l6-5.997zM5.83 8H9V4.83L5.83 8zM11 4v5a1 1 0 0 1-1 1H5v10h14V4h-8z" fill="rgba(52,71,103,1)"/></svg>New diagram</div><div data-cmd="open"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 21a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2H20a1 1 0 0 1 1 1v3h-2V7h-7.414l-2-2H4v11.998L5.5 11h17l-2.31 9.243a1 1 0 0 1-.97.757H3zm16.938-8H7.062l-1.5 6h12.876l1.5-6z" fill="rgba(52,71,103,1)"/></svg>Open diagram image</div><div data-cmd="save"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z" fill="rgba(52,71,103,1)"/></svg>Save diagram image</div><div data-cmd="link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 0 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414zm6.718 6.011l-1.414-1.414a5 5 0 1 0-7.071-7.071l-.354.354a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 0 1 9.9 9.9z" fill="rgba(52,71,103,1)"/></svg>Copy link to diagram</div><a href="/donate.html" target="_blank" style="margin-bottom:0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" fill="rgba(255,66,77,1)"/></svg>Donate</a></div>',t.querySelectorAll("[data-cmd]").forEach((t=>t.addEventListener("click",this))),this.Pt=t.querySelector(".options")}init(t){this.Y=t,this.Y.svg.addEventListener("dragover",(t=>{t.preventDefault()})),this.Y.svg.addEventListener("drop",(async e=>{e.preventDefault(),1===e.dataTransfer?.items?.length&&"file"===e.dataTransfer.items[0].kind&&"image/png"===e.dataTransfer.items[0].type&&await t.pngLoad(e.dataTransfer.items[0].getAsFile())||this.Dt()}))}async handleEvent(t){switch(t.currentTarget.getAttribute("data-cmd")){case"new":this.Y.clear();break;case"open":!function(t,e){const i=document.createElement("input");i.type="file",i.multiple=!1,i.accept=t,i.onchange=async function(){e(i.files?.length?i.files[0]:null)},i.click(),i.remove()}(".png",(async t=>{await this.Y.pngLoad(t)||this.Dt()}));break;case"save":this.Y.pngCreate((t=>{t?function(t,e){const i=document.createElement("a");i.download=e,i.href=URL.createObjectURL(t),i.click(),URL.revokeObjectURL(i.href),i.remove()}(t,"dgrm.png"):alert("Diagram is empty")}));break;case"link":{const e=this.Y.dataGet();if(!e)return void alert("Diagram is empty");const i=t.currentTarget;this.Ot(i,!0);const s=function(){const t=new Uint8Array(4);window.crypto.getRandomValues(t);const e=new Date;return`${e.getUTCFullYear()}${(e.getUTCMonth()+1).toString().padStart(2,"0")}${Array.from(t,(t=>t.toString(16).padStart(2,"0"))).join("")}`}(),n=new URL(window.location.href);n.searchParams.set("k",s),await navigator.clipboard.writeText(n.toString()),await async function(t,e){return await fetch(`${tt}/${t}`,{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(e)})}(s,e),this.Ot(i,!1),alert("Link to diagram copied to clipboard");break}}this.Ut()}Ot(t,e){nt(e),e?t.classList.add("load"):t.classList.remove("load")}Ut(){this.Pt.style.visibility="visible"===this.Pt.style.visibility?"hidden":"visible"}Dt(){alert("File cannot be read. Use the exact image file you got from the application.")}}customElements.define("ap-file-options",ot);const at=document.getElementById("diagram"),ht=new Q(at,function(t){const e=_(t,((t,i)=>{switch(t){case"shape":{const t=x(i.svgCanvas,i.createParams);switch(i.createParams.templateKey){case"circle":return new G(e,t,i.createParams.props);case"rhomb":return new F(e,t,i.createParams.props);case"rect":return new B(e,t,i.createParams.props);case"connect-end":return t;case"text":return new D(t,i.createParams.props)}break}case"path":return new O(f(i))}}));return e}(at)).on("shapeAdd",(function(){document.getElementById("tip")?.remove()}));document.getElementById("file-options").init(ht),document.getElementById("menu-shape").init(ht);let rt=new URL(window.location.href);rt.searchParams.get("k")?(nt(!0,!0),async function(t){return(await fetch(`${tt}/${t}`)).json()}(rt.searchParams.get("k")).then((t=>{rt.searchParams.delete("k"),ht.dataSet(t),history.replaceState(null,null,rt),nt(!1),rt=null}))):rt=null}();
