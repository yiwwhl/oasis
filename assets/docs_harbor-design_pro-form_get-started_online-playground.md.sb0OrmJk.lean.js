import{d as N,h as A,j as O,I as P,o as F,c as L,m as M}from"./chunks/framework.p9WlfK8B.js";const U="_stackblitzWrapper_1o57f_1",C={stackblitzWrapper:U},R=500,k=20,q=300,W="https://stackblitz.com",w=["angular-cli","create-react-app","html","javascript","node","polymer","typescript","vue"],H=["project","search","ports","settings"],K=["light","dark"],V=["editor","preview"],E={clickToLoad:e=>u("ctl",e),devToolsHeight:e=>S("devtoolsheight",e),forceEmbedLayout:e=>u("embed",e),hideDevTools:e=>u("hidedevtools",e),hideExplorer:e=>u("hideExplorer",e),hideNavigation:e=>u("hideNavigation",e),openFile:e=>j("file",e),showSidebar:e=>z("showSidebar",e),sidebarView:e=>m("sidebarView",e,H),startScript:e=>j("startScript",e),terminalHeight:e=>S("terminalHeight",e),theme:e=>m("theme",e,K),view:e=>m("view",e,V),zenMode:e=>u("zenMode",e)};function I(e={}){const t=Object.entries(e).map(([n,r])=>r!=null&&E.hasOwnProperty(n)?E[n](r):"").filter(Boolean);return t.length?`?${t.join("&")}`:""}function u(e,t){return t===!0?`${e}=1`:""}function z(e,t){return typeof t=="boolean"?`${e}=${t?"1":"0"}`:""}function S(e,t){if(typeof t=="number"&&!Number.isNaN(t)){const n=Math.min(100,Math.max(0,t));return`${e}=${encodeURIComponent(Math.round(n))}`}return""}function m(e,t="",n=[]){return n.includes(t)?`${e}=${encodeURIComponent(t)}`:""}function j(e,t){return(Array.isArray(t)?t:[t]).filter(r=>typeof r=="string"&&r.trim()!=="").map(r=>`${e}=${encodeURIComponent(r)}`).join("&")}function T(){return Math.random().toString(36).slice(2,6)+Math.random().toString(36).slice(2,6)}function f(e,t){return`${$(t)}${e}${I(t)}`}function _(e,t){const n={forceEmbedLayout:!0};return t&&typeof t=="object"&&Object.assign(n,t),`${$(n)}${e}${I(n)}`}function $(e={}){return(typeof e.origin=="string"?e.origin:W).replace(/\/$/,"")}function g(e,t,n){if(!t||!e||!e.parentNode)throw new Error("Invalid Element");e.id&&(t.id=e.id),e.className&&(t.className=e.className),B(t,n),e.replaceWith(t)}function y(e){if(typeof e=="string"){const t=document.getElementById(e);if(!t)throw new Error(`Could not find element with id '${e}'`);return t}else if(e instanceof HTMLElement)return e;throw new Error(`Invalid element: ${e}`)}function b(e){return e&&e.newWindow===!1?"_self":"_blank"}function B(e,t={}){const n=Object.hasOwnProperty.call(t,"height")?`${t.height}`:`${q}`,r=Object.hasOwnProperty.call(t,"width")?`${t.width}`:void 0;e.setAttribute("height",n),r?e.setAttribute("width",r):e.setAttribute("style","width:100%;")}class x{constructor(t){this.pending={},this.port=t,this.port.onmessage=this.messageListener.bind(this)}request({type:t,payload:n}){return new Promise((r,o)=>{const s=T();this.pending[s]={resolve:r,reject:o},this.port.postMessage({type:t,payload:{...n,__reqid:s}})})}messageListener(t){var a;if(typeof((a=t.data.payload)==null?void 0:a.__reqid)!="string")return;const{type:n,payload:r}=t.data,{__reqid:o,__success:s,__error:c}=r;this.pending[o]&&(s?this.pending[o].resolve(this.cleanResult(r)):this.pending[o].reject(c?`${n}: ${c}`:n),delete this.pending[o])}cleanResult(t){const n={...t};return delete n.__reqid,delete n.__success,delete n.__error,Object.keys(n).length?n:null}}class G{constructor(t,n){this.editor={openFile:r=>this._rdc.request({type:"SDK_OPEN_FILE",payload:{path:r}}),setCurrentFile:r=>this._rdc.request({type:"SDK_SET_CURRENT_FILE",payload:{path:r}}),setTheme:r=>this._rdc.request({type:"SDK_SET_UI_THEME",payload:{theme:r}}),setView:r=>this._rdc.request({type:"SDK_SET_UI_VIEW",payload:{view:r}}),showSidebar:(r=!0)=>this._rdc.request({type:"SDK_TOGGLE_SIDEBAR",payload:{visible:r}})},this.preview={origin:"",getUrl:()=>this._rdc.request({type:"SDK_GET_PREVIEW_URL",payload:{}}).then(r=>(r==null?void 0:r.url)??null),setUrl:(r="/")=>{if(typeof r!="string"||!r.startsWith("/"))throw new Error(`Invalid argument: expected a path starting with '/', got '${r}'`);return this._rdc.request({type:"SDK_SET_PREVIEW_URL",payload:{path:r}})}},this._rdc=new x(t),Object.defineProperty(this.preview,"origin",{value:typeof n.previewOrigin=="string"?n.previewOrigin:null,writable:!1})}applyFsDiff(t){const n=r=>r!==null&&typeof r=="object";if(!n(t)||!n(t.create))throw new Error("Invalid diff object: expected diff.create to be an object.");if(!Array.isArray(t.destroy))throw new Error("Invalid diff object: expected diff.destroy to be an array.");return this._rdc.request({type:"SDK_APPLY_FS_DIFF",payload:t})}getDependencies(){return this._rdc.request({type:"SDK_GET_DEPS_SNAPSHOT",payload:{}})}getFsSnapshot(){return this._rdc.request({type:"SDK_GET_FS_SNAPSHOT",payload:{}})}}const p=[];class J{constructor(t){this.id=T(),this.element=t,this.pending=new Promise((n,r)=>{const o=({data:i,ports:d})=>{(i==null?void 0:i.action)==="SDK_INIT_SUCCESS"&&i.id===this.id&&(this.vm=new G(d[0],i.payload),n(this.vm),c())},s=()=>{var i;(i=this.element.contentWindow)==null||i.postMessage({action:"SDK_INIT",id:this.id},"*")};function c(){window.clearInterval(l),window.removeEventListener("message",o)}window.addEventListener("message",o),s();let a=0;const l=window.setInterval(()=>{if(this.vm){c();return}if(a>=k){c(),r("Timeout: Unable to establish a connection with the StackBlitz VM"),p.forEach((i,d)=>{i.id===this.id&&p.splice(d,1)});return}a++,s()},R)}),p.push(this)}}const X=e=>{const t=e instanceof Element?"element":"id";return p.find(n=>n[t]===e)??null};function Y(e,t){const n=document.createElement("input");return n.type="hidden",n.name=e,n.value=t,n}function Q(e){return e.replace(/\[/g,"%5B").replace(/\]/g,"%5D")}function v({template:e,title:t,description:n,dependencies:r,files:o,settings:s}){if(!w.includes(e)){const i=w.map(d=>`'${d}'`).join(", ");console.warn(`Unsupported project.template: must be one of ${i}`)}const c=[],a=(i,d,D="")=>{c.push(Y(i,typeof d=="string"?d:D))};a("project[title]",t),typeof n=="string"&&n.length>0&&a("project[description]",n),a("project[template]",e,"javascript"),r&&(e==="node"?console.warn("Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template."):a("project[dependencies]",JSON.stringify(r))),s&&a("project[settings]",JSON.stringify(s)),Object.entries(o).forEach(([i,d])=>{a(`project[files][${Q(i)}]`,d)});const l=document.createElement("form");return l.method="POST",l.setAttribute("style","display:none!important;"),l.append(...c),l}function Z(e,t){const n=v(e);return n.action=_("/run",t),n.id="sb_run",`<!doctype html>
<html>
<head><title></title></head>
<body>
  ${n.outerHTML}
  <script>document.getElementById('${n.id}').submit();<\/script>
</body>
</html>`}function ee(e,t){const n=v(e);n.action=f("/run",t),n.target=b(t),document.body.appendChild(n),n.submit(),document.body.removeChild(n)}function h(e){return e!=null&&e.contentWindow?(X(e)??new J(e)).pending:Promise.reject("Provided element is not an iframe.")}function te(e,t){ee(e,t)}function ne(e,t){const n=f(`/edit/${e}`,t),r=b(t);window.open(n,r)}function re(e,t){const n=f(`/github/${e}`,t),r=b(t);window.open(n,r)}function oe(e,t,n){var c;const r=y(e),o=Z(t,n),s=document.createElement("iframe");return g(r,s,n),(c=s.contentDocument)==null||c.write(o),h(s)}function ie(e,t,n){const r=y(e),o=document.createElement("iframe");return o.src=_(`/edit/${t}`,n),g(r,o,n),h(o)}function se(e,t,n){const r=y(e),o=document.createElement("iframe");return o.src=_(`/github/${t}`,n),g(r,o,n),h(o)}const ce={connect:h,embedGithubProject:se,embedProject:oe,embedProjectId:ie,openGithubProject:re,openProject:te,openProjectId:ne},ae=N({setup(){const e=A();return O(()=>{ce.embedProjectId(e.value,"proform",{forceEmbedLayout:!0,openFile:"src/App.tsx"})}),()=>P("div",{class:C.stackblitzWrapper,ref:e},null)}}),ue=JSON.parse('{"title":"","description":"","frontmatter":{"layout":"page"},"headers":[],"relativePath":"docs/harbor-design/pro-form/get-started/online-playground.md","filePath":"docs/harbor-design/pro-form/get-started/online-playground.md"}'),de={name:"docs/harbor-design/pro-form/get-started/online-playground.md"},pe=Object.assign(de,{setup(e){return(t,n)=>(F(),L("div",null,[P(M(ae))]))}});export{ue as __pageData,pe as default};
