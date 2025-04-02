import{R as U,x as qr,_ as en,u as h,d as N,D as tn,F as rn,T as ot,y as Ee,k as yr,A as nn,c as sn}from"./client.By9c5E1B.js";function on(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var it={exports:{}},Kt;function an(){return Kt||(Kt=1,function(e,t){(function(r,n){e.exports=n()})(self,()=>(()=>{var r,n,s={d:(o,a)=>{for(var c in a)s.o(a,c)&&!s.o(o,c)&&Object.defineProperty(o,c,{enumerable:!0,get:a[c]})},o:(o,a)=>Object.prototype.hasOwnProperty.call(o,a)},i={};s.d(i,{default:()=>u}),function(o){o.StreamContextItem="stream-context-item",o.SaveItems="save-items",o.ComponentRegistered="component-registered",o.ActivateThemes="themes",o.ThemesActivated="themes-activated",o.SetComponentData="set-component-data"}(r||(r={})),function(o){o.Component="component"}(n||(n={}));const u=new class{constructor(){this.component={activeThemes:[],acceptsThemes:!0},this.sentMessages=[],this.messageQueue=[],this.subscriptions=[],this.generateNotePreview=!0}initialize(o={}){if(this.contentWindow)throw"Cannot initialize mediator more than once";this.contentWindow=window,this.coallesedSavingDelay=o.debounceSave!==void 0?o.debounceSave:250,this.registerMessageHandler(),this.postMessage(r.StreamContextItem,{},a=>{const{item:c}=a;(!this.lastStreamedItem||this.lastStreamedItem.uuid!==c.uuid)&&this.pendingSaveTimeout&&(clearTimeout(this.pendingSaveTimeout),this.performSavingOfItems(this.pendingSaveParams),this.pendingSaveTimeout=void 0,this.pendingSaveParams=void 0),this.lastStreamedItem=c,this.lastStreamedItem.isMetadataUpdate||this.subscriptions.forEach(l=>{l(this.text,this.meta)})})}subscribe(o){return this.subscriptions.push(o),this.lastStreamedItem&&setTimeout(()=>{o(this.text,this.meta)}),()=>{const a=this.subscriptions.indexOf(o);a>=0&&this.subscriptions.splice(a,1)}}get text(){var o,a;return this.checkNoteExists(),((a=(o=this.lastStreamedItem)===null||o===void 0?void 0:o.content)===null||a===void 0?void 0:a.text)||""}get meta(){var o;return this.checkNoteExists(),!((o=this.lastStreamedItem)===null||o===void 0)&&o.content?this.lastStreamedItem.content.appData[this.lastStreamedItem.content.editorIdentifier]:{}}get extensionMeta(){return this.component.data}get locked(){var o,a;return this.checkNoteExists(),(a=(o=this.lastStreamedItem)===null||o===void 0?void 0:o.content)===null||a===void 0?void 0:a.appData["org.standardnotes.sn"].locked}get preview(){var o,a;return this.checkNoteExists(),(a=(o=this.lastStreamedItem)===null||o===void 0?void 0:o.content)===null||a===void 0?void 0:a.preview_plain}set text(o){this.checkNoteExists(),this.lastStreamedItem.content.text=o,this.saveNote(this.lastStreamedItem)}set preview(o){this.checkNoteExists(),this.generateNotePreview=!1,this.lastStreamedItem.content.preview_plain=o}set meta(o){this.checkNoteExists(),this.lastStreamedItem.content.appData[this.lastStreamedItem.content.editorIdentifier]=o,this.saveNote(this.lastStreamedItem)}set extensionMeta(o){this.component.data=o,this.postMessage(r.SetComponentData,{componentData:o})}registerMessageHandler(){this.messageHandler=o=>{if(document.referrer&&new URL(document.referrer).origin!==new URL(o.origin).origin)return;const{data:a}=o,c=(l=>{if(typeof l!="string")return!1;try{const d=JSON.parse(l),p=Object.prototype.toString.call(d);return p==="[object Object]"||p==="[object Array]"}catch{return!1}})(a)?JSON.parse(a):a;c&&this.handleMessage(c)},this.contentWindow.document.addEventListener("message",this.messageHandler,!1),this.contentWindow.addEventListener("message",this.messageHandler,!1)}handleMessage(o){var a,c;switch(o.action){case r.ComponentRegistered:this.component.sessionKey=o.sessionKey,o.componentData&&(this.component.data=o.componentData),this.onReady(o.data);break;case r.ActivateThemes:this.activateThemes(o.data.themes);break;default:{if(!o.original)return;const l=(a=this.sentMessages)===null||a===void 0?void 0:a.filter(d=>{var p;return d.messageId===((p=o.original)===null||p===void 0?void 0:p.messageId)})[0];if(!l)return;(c=l==null?void 0:l.callback)===null||c===void 0||c.call(l,o.data);break}}}onReady(o){this.component.environment=o.environment,this.component.platform=o.platform,this.component.uuid=o.uuid;for(const a of this.messageQueue)this.postMessage(a.action,a.data,a.callback);this.messageQueue=[],this.activateThemes(o.activeThemeUrls||[]),this.postMessage(r.ThemesActivated,{})}get isRunningInDesktopApplication(){return this.component.environment==="desktop"}get isRunningInMobileApplication(){return this.component.environment==="mobile"}get isRunningInBrowser(){return this.component.environment==="web"}postMessage(o,a,c){if(!this.component.sessionKey)return void this.messageQueue.push({action:o,data:a,api:n.Component,callback:c});const l={action:o,data:a,messageId:this.generateUUID(),sessionKey:this.component.sessionKey,api:n.Component},d=JSON.parse(JSON.stringify(l));let p;d.callback=c,this.sentMessages.push(d),p=this.isRunningInMobileApplication?JSON.stringify(l):l,this.contentWindow.parent.postMessage(p,"*")}activateThemes(o=[]){if(!this.component.acceptsThemes)return;const{activeThemes:a}=this.component;if(a&&a.sort().toString()==o.sort().toString())return;let c=o;const l=[];for(const d of a)o.includes(d)?c=c.filter(p=>p!==d):l.push(d);for(const d of l)this.deactivateTheme(d);this.component.activeThemes=o;for(const d of c){if(!d)continue;const p=d.endsWith("/org.standardnotes.theme-focus/index.css")?"https://app.standardnotes.com/components/assets/org.standardnotes.theme-focus/index.css":d,f=this.contentWindow.document.createElement("link");f.id=btoa(d),f.href=p,f.type="text/css",f.rel="stylesheet",f.media="screen,print",f.className="custom-theme",this.contentWindow.document.getElementsByTagName("head")[0].appendChild(f)}this.onThemesChangeCallback&&this.onThemesChangeCallback()}themeElementForUrl(o){return Array.from(this.contentWindow.document.getElementsByClassName("custom-theme")).slice().find(a=>a.id==btoa(o))}deactivateTheme(o){const a=this.themeElementForUrl(o);a&&a.parentNode&&(a.setAttribute("disabled","true"),a.parentNode.removeChild(a))}generateUUID(){return crypto.randomUUID()}get platform(){return this.component.platform}get environment(){return this.component.environment}performSavingOfItems({items:o,callback:a}){this.generateNotePreview&&(o[0].content.preview_plain=((l,d=50)=>l.length<=d?l:l.substring(0,d)+"...")(o[0].content.text));const c=[];for(const l of o)c.push(this.jsonObjectForItem(l));this.postMessage(r.SaveItems,{items:c},()=>{a==null||a()})}saveNote(o,a){const c=[o];if(this.pendingSaveItems||(this.pendingSaveItems=[]),this.coallesedSavingDelay){this.pendingSaveTimeout&&clearTimeout(this.pendingSaveTimeout);const l=c.map(p=>p.uuid),d=this.pendingSaveItems.filter(p=>!l.includes(p.uuid));this.pendingSaveItems=d.concat(c),this.pendingSaveParams={items:this.pendingSaveItems,callback:a},this.pendingSaveTimeout=setTimeout(()=>{this.performSavingOfItems(this.pendingSaveParams),this.pendingSaveItems=[],this.pendingSaveTimeout=void 0,this.pendingSaveParams=null},this.coallesedSavingDelay)}else this.performSavingOfItems({items:c,callback:a})}jsonObjectForItem(o){const a=Object.assign({},o);return a.children=null,a.parent=null,a}checkNoteExists(){if(!this.lastStreamedItem)throw"Trying to interact with note before it is received from Standard Notes. Use subscribe function."}};return i.default})())}(it)),it.exports}var cn=an();const V=on(cn);var j=function(){return j=Object.assign||function(t){for(var r,n=1,s=arguments.length;n<s;n++){r=arguments[n];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},j.apply(this,arguments)};function Ie(e,t,r){if(r||arguments.length===2)for(var n=0,s=t.length,i;n<s;n++)(i||!(n in t))&&(i||(i=Array.prototype.slice.call(t,0,n)),i[n]=t[n]);return e.concat(i||Array.prototype.slice.call(t))}var B="-ms-",Ce="-moz-",F="-webkit-",vr="comm",Ve="rule",_t="decl",un="@import",xr="@keyframes",ln="@layer",br=Math.abs,$t=String.fromCharCode,vt=Object.assign;function dn(e,t){return P(e,0)^45?(((t<<2^P(e,0))<<2^P(e,1))<<2^P(e,2))<<2^P(e,3):0}function kr(e){return e.trim()}function Q(e,t){return(e=t.exec(e))?e[0]:e}function S(e,t,r){return e.replace(t,r)}function Pe(e,t,r){return e.indexOf(t,r)}function P(e,t){return e.charCodeAt(t)|0}function he(e,t,r){return e.slice(t,r)}function G(e){return e.length}function wr(e){return e.length}function Ae(e,t){return t.push(e),e}function hn(e,t){return e.map(t).join("")}function Gt(e,t){return e.filter(function(r){return!Q(r,t)})}var Qe=1,pe=1,Sr=0,W=0,$=0,ye="";function Xe(e,t,r,n,s,i,u,o){return{value:e,root:t,parent:r,type:n,props:s,children:i,line:Qe,column:pe,length:u,return:"",siblings:o}}function te(e,t){return vt(Xe("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function ce(e){for(;e.root;)e=te(e.root,{children:[e]});Ae(e,e.siblings)}function pn(){return $}function fn(){return $=W>0?P(ye,--W):0,pe--,$===10&&(pe=1,Qe--),$}function K(){return $=W<Sr?P(ye,W++):0,pe++,$===10&&(pe=1,Qe++),$}function ae(){return P(ye,W)}function je(){return W}function Ze(e,t){return he(ye,e,t)}function xt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function gn(e){return Qe=pe=1,Sr=G(ye=e),W=0,[]}function mn(e){return ye="",e}function at(e){return kr(Ze(W-1,bt(e===91?e+2:e===40?e+1:e)))}function yn(e){for(;($=ae())&&$<33;)K();return xt(e)>2||xt($)>3?"":" "}function vn(e,t){for(;--t&&K()&&!($<48||$>102||$>57&&$<65||$>70&&$<97););return Ze(e,je()+(t<6&&ae()==32&&K()==32))}function bt(e){for(;K();)switch($){case e:return W;case 34:case 39:e!==34&&e!==39&&bt($);break;case 40:e===41&&bt(e);break;case 92:K();break}return W}function xn(e,t){for(;K()&&e+$!==57;)if(e+$===84&&ae()===47)break;return"/*"+Ze(t,W-1)+"*"+$t(e===47?e:K())}function bn(e){for(;!xt(ae());)K();return Ze(e,W)}function kn(e){return mn(ze("",null,null,null,[""],e=gn(e),0,[0],e))}function ze(e,t,r,n,s,i,u,o,a){for(var c=0,l=0,d=u,p=0,f=0,y=0,w=1,M=1,E=1,A=0,C="",I=s,T=i,D=n,v=C;M;)switch(y=A,A=K()){case 40:if(y!=108&&P(v,d-1)==58){Pe(v+=S(at(A),"&","&\f"),"&\f",br(c?o[c-1]:0))!=-1&&(E=-1);break}case 34:case 39:case 91:v+=at(A);break;case 9:case 10:case 13:case 32:v+=yn(y);break;case 92:v+=vn(je()-1,7);continue;case 47:switch(ae()){case 42:case 47:Ae(wn(xn(K(),je()),t,r,a),a);break;default:v+="/"}break;case 123*w:o[c++]=G(v)*E;case 125*w:case 59:case 0:switch(A){case 0:case 125:M=0;case 59+l:E==-1&&(v=S(v,/\f/g,"")),f>0&&G(v)-d&&Ae(f>32?Ht(v+";",n,r,d-1,a):Ht(S(v," ","")+";",n,r,d-2,a),a);break;case 59:v+=";";default:if(Ae(D=Ut(v,t,r,c,l,s,o,C,I=[],T=[],d,i),i),A===123)if(l===0)ze(v,t,D,D,I,i,d,o,T);else switch(p===99&&P(v,3)===110?100:p){case 100:case 108:case 109:case 115:ze(e,D,D,n&&Ae(Ut(e,D,D,0,0,s,o,C,s,I=[],d,T),T),s,T,d,o,n?I:T);break;default:ze(v,D,D,D,[""],T,0,o,T)}}c=l=f=0,w=E=1,C=v="",d=u;break;case 58:d=1+G(v),f=y;default:if(w<1){if(A==123)--w;else if(A==125&&w++==0&&fn()==125)continue}switch(v+=$t(A),A*w){case 38:E=l>0?1:(v+="\f",-1);break;case 44:o[c++]=(G(v)-1)*E,E=1;break;case 64:ae()===45&&(v+=at(K())),p=ae(),l=d=G(C=v+=bn(je())),A++;break;case 45:y===45&&G(v)==2&&(w=0)}}return i}function Ut(e,t,r,n,s,i,u,o,a,c,l,d){for(var p=s-1,f=s===0?i:[""],y=wr(f),w=0,M=0,E=0;w<n;++w)for(var A=0,C=he(e,p+1,p=br(M=u[w])),I=e;A<y;++A)(I=kr(M>0?f[A]+" "+C:S(C,/&\f/g,f[A])))&&(a[E++]=I);return Xe(e,t,r,s===0?Ve:o,a,c,l,d)}function wn(e,t,r,n){return Xe(e,t,r,vr,$t(pn()),he(e,2,-2),0,n)}function Ht(e,t,r,n,s){return Xe(e,t,r,_t,he(e,0,n),he(e,n+1,-1),n,s)}function Ar(e,t,r){switch(dn(e,t)){case 5103:return F+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return F+e+e;case 4789:return Ce+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return F+e+Ce+e+B+e+e;case 5936:switch(P(e,t+11)){case 114:return F+e+B+S(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return F+e+B+S(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return F+e+B+S(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return F+e+B+e+e;case 6165:return F+e+B+"flex-"+e+e;case 5187:return F+e+S(e,/(\w+).+(:[^]+)/,F+"box-$1$2"+B+"flex-$1$2")+e;case 5443:return F+e+B+"flex-item-"+S(e,/flex-|-self/g,"")+(Q(e,/flex-|baseline/)?"":B+"grid-row-"+S(e,/flex-|-self/g,""))+e;case 4675:return F+e+B+"flex-line-pack"+S(e,/align-content|flex-|-self/g,"")+e;case 5548:return F+e+B+S(e,"shrink","negative")+e;case 5292:return F+e+B+S(e,"basis","preferred-size")+e;case 6060:return F+"box-"+S(e,"-grow","")+F+e+B+S(e,"grow","positive")+e;case 4554:return F+S(e,/([^-])(transform)/g,"$1"+F+"$2")+e;case 6187:return S(S(S(e,/(zoom-|grab)/,F+"$1"),/(image-set)/,F+"$1"),e,"")+e;case 5495:case 3959:return S(e,/(image-set\([^]*)/,F+"$1$`$1");case 4968:return S(S(e,/(.+:)(flex-)?(.*)/,F+"box-pack:$3"+B+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+F+e+e;case 4200:if(!Q(e,/flex-|baseline/))return B+"grid-column-align"+he(e,t)+e;break;case 2592:case 3360:return B+S(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,s){return t=s,Q(n.props,/grid-\w+-end/)})?~Pe(e+(r=r[t].value),"span",0)?e:B+S(e,"-start","")+e+B+"grid-row-span:"+(~Pe(r,"span",0)?Q(r,/\d+/):+Q(r,/\d+/)-+Q(e,/\d+/))+";":B+S(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return Q(n.props,/grid-\w+-start/)})?e:B+S(S(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return S(e,/(.+)-inline(.+)/,F+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(G(e)-1-t>6)switch(P(e,t+1)){case 109:if(P(e,t+4)!==45)break;case 102:return S(e,/(.+:)(.+)-([^]+)/,"$1"+F+"$2-$3$1"+Ce+(P(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Pe(e,"stretch",0)?Ar(S(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return S(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,s,i,u,o,a,c){return B+s+":"+i+c+(u?B+s+"-span:"+(o?a:+a-+i)+c:"")+e});case 4949:if(P(e,t+6)===121)return S(e,":",":"+F)+e;break;case 6444:switch(P(e,P(e,14)===45?18:11)){case 120:return S(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+F+(P(e,14)===45?"inline-":"")+"box$3$1"+F+"$2$3$1"+B+"$2box$3")+e;case 100:return S(e,":",":"+B)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return S(e,"scroll-","scroll-snap-")+e}return e}function Ke(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function Sn(e,t,r,n){switch(e.type){case ln:if(e.children.length)break;case un:case _t:return e.return=e.return||e.value;case vr:return"";case xr:return e.return=e.value+"{"+Ke(e.children,n)+"}";case Ve:if(!G(e.value=e.props.join(",")))return""}return G(r=Ke(e.children,n))?e.return=e.value+"{"+r+"}":""}function An(e){var t=wr(e);return function(r,n,s,i){for(var u="",o=0;o<t;o++)u+=e[o](r,n,s,i)||"";return u}}function Cn(e){return function(t){t.root||(t=t.return)&&e(t)}}function En(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case _t:e.return=Ar(e.value,e.length,r);return;case xr:return Ke([te(e,{value:S(e.value,"@","@"+F)})],n);case Ve:if(e.length)return hn(r=e.props,function(s){switch(Q(s,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":ce(te(e,{props:[S(s,/:(read-\w+)/,":"+Ce+"$1")]})),ce(te(e,{props:[s]})),vt(e,{props:Gt(r,n)});break;case"::placeholder":ce(te(e,{props:[S(s,/:(plac\w+)/,":"+F+"input-$1")]})),ce(te(e,{props:[S(s,/:(plac\w+)/,":"+Ce+"$1")]})),ce(te(e,{props:[S(s,/:(plac\w+)/,B+"input-$1")]})),ce(te(e,{props:[s]})),vt(e,{props:Gt(r,n)});break}return""})}}var In={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},z={},fe=typeof process<"u"&&z!==void 0&&(z.REACT_APP_SC_ATTR||z.SC_ATTR)||"data-styled",Cr="active",Er="data-styled-version",qe="6.1.16",Ot=`/*!sc*/
`,Ge=typeof window<"u"&&"HTMLElement"in window,Dn=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&z!==void 0&&z.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&z.REACT_APP_SC_DISABLE_SPEEDY!==""?z.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&z.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&z!==void 0&&z.SC_DISABLE_SPEEDY!==void 0&&z.SC_DISABLE_SPEEDY!==""&&z.SC_DISABLE_SPEEDY!=="false"&&z.SC_DISABLE_SPEEDY),Mn={},et=Object.freeze([]),ge=Object.freeze({});function Ir(e,t,r){return r===void 0&&(r=ge),e.theme!==r.theme&&e.theme||t||r.theme}var Dr=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),Fn=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Tn=/(^-|-$)/g;function Yt(e){return e.replace(Fn,"-").replace(Tn,"")}var Bn=/(a)(d)/gi,Oe=52,Jt=function(e){return String.fromCharCode(e+(e>25?39:97))};function kt(e){var t,r="";for(t=Math.abs(e);t>Oe;t=t/Oe|0)r=Jt(t%Oe)+r;return(Jt(t%Oe)+r).replace(Bn,"$1-$2")}var ct,Mr=5381,de=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},Fr=function(e){return de(Mr,e)};function Tr(e){return kt(Fr(e)>>>0)}function _n(e){return e.displayName||e.name||"Component"}function ut(e){return typeof e=="string"&&!0}var Br=typeof Symbol=="function"&&Symbol.for,_r=Br?Symbol.for("react.memo"):60115,$n=Br?Symbol.for("react.forward_ref"):60112,On={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Rn={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},$r={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Nn=((ct={})[$n]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},ct[_r]=$r,ct);function Vt(e){return("type"in(t=e)&&t.type.$$typeof)===_r?$r:"$$typeof"in e?Nn[e.$$typeof]:On;var t}var Pn=Object.defineProperty,jn=Object.getOwnPropertyNames,Qt=Object.getOwnPropertySymbols,zn=Object.getOwnPropertyDescriptor,Ln=Object.getPrototypeOf,Xt=Object.prototype;function Or(e,t,r){if(typeof t!="string"){if(Xt){var n=Ln(t);n&&n!==Xt&&Or(e,n,r)}var s=jn(t);Qt&&(s=s.concat(Qt(t)));for(var i=Vt(e),u=Vt(t),o=0;o<s.length;++o){var a=s[o];if(!(a in Rn||r&&r[a]||u&&a in u||i&&a in i)){var c=zn(t,a);try{Pn(e,a,c)}catch{}}}}return e}function me(e){return typeof e=="function"}function Rt(e){return typeof e=="object"&&"styledComponentId"in e}function ie(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function wt(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function De(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function St(e,t,r){if(r===void 0&&(r=!1),!r&&!De(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=St(e[n],t[n]);else if(De(t))for(var n in t)e[n]=St(e[n],t[n]);return e}function Nt(e,t){Object.defineProperty(e,"toString",{value:t})}function Me(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Wn=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,s=n.length,i=s;t>=i;)if((i<<=1)<0)throw Me(16,"".concat(t));this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var u=s;u<i;u++)this.groupSizes[u]=0}for(var o=this.indexOfGroup(t+1),a=(u=0,r.length);u<a;u++)this.tag.insertRule(o,r[u])&&(this.groupSizes[t]++,o++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),s=n+r;this.groupSizes[t]=0;for(var i=n;i<s;i++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],s=this.indexOfGroup(t),i=s+n,u=s;u<i;u++)r+="".concat(this.tag.getRule(u)).concat(Ot);return r},e}(),Le=new Map,Ue=new Map,We=1,Re=function(e){if(Le.has(e))return Le.get(e);for(;Ue.has(We);)We++;var t=We++;return Le.set(e,t),Ue.set(t,e),t},Kn=function(e,t){We=t+1,Le.set(e,t),Ue.set(t,e)},Gn="style[".concat(fe,"][").concat(Er,'="').concat(qe,'"]'),Un=new RegExp("^".concat(fe,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Hn=function(e,t,r){for(var n,s=r.split(","),i=0,u=s.length;i<u;i++)(n=s[i])&&e.registerName(t,n)},Yn=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(Ot),s=[],i=0,u=n.length;i<u;i++){var o=n[i].trim();if(o){var a=o.match(Un);if(a){var c=0|parseInt(a[1],10),l=a[2];c!==0&&(Kn(l,c),Hn(e,l,a[3]),e.getTag().insertRules(c,s)),s.length=0}else s.push(o)}}},Zt=function(e){for(var t=document.querySelectorAll(Gn),r=0,n=t.length;r<n;r++){var s=t[r];s&&s.getAttribute(fe)!==Cr&&(Yn(e,s),s.parentNode&&s.parentNode.removeChild(s))}};function Jn(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Rr=function(e){var t=document.head,r=e||t,n=document.createElement("style"),s=function(o){var a=Array.from(o.querySelectorAll("style[".concat(fe,"]")));return a[a.length-1]}(r),i=s!==void 0?s.nextSibling:null;n.setAttribute(fe,Cr),n.setAttribute(Er,qe);var u=Jn();return u&&n.setAttribute("nonce",u),r.insertBefore(n,i),n},Vn=function(){function e(t){this.element=Rr(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,s=0,i=n.length;s<i;s++){var u=n[s];if(u.ownerNode===r)return u}throw Me(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),Qn=function(){function e(t){this.element=Rr(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Xn=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),qt=Ge,Zn={isServer:!Ge,useCSSOMInjection:!Dn},He=function(){function e(t,r,n){t===void 0&&(t=ge),r===void 0&&(r={});var s=this;this.options=j(j({},Zn),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&Ge&&qt&&(qt=!1,Zt(this)),Nt(this,function(){return function(i){for(var u=i.getTag(),o=u.length,a="",c=function(d){var p=function(E){return Ue.get(E)}(d);if(p===void 0)return"continue";var f=i.names.get(p),y=u.getGroup(d);if(f===void 0||!f.size||y.length===0)return"continue";var w="".concat(fe,".g").concat(d,'[id="').concat(p,'"]'),M="";f!==void 0&&f.forEach(function(E){E.length>0&&(M+="".concat(E,","))}),a+="".concat(y).concat(w,'{content:"').concat(M,'"}').concat(Ot)},l=0;l<o;l++)c(l);return a}(s)})}return e.registerId=function(t){return Re(t)},e.prototype.rehydrate=function(){!this.server&&Ge&&Zt(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(j(j({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,s=r.target;return r.isServer?new Xn(s):n?new Vn(s):new Qn(s)}(this.options),new Wn(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(Re(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(Re(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(Re(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),qn=/&/g,es=/^\s*\/\/.*$/gm;function Nr(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=Nr(r.children,t)),r})}function ts(e){var t,r,n,s=ge,i=s.options,u=i===void 0?ge:i,o=s.plugins,a=o===void 0?et:o,c=function(p,f,y){return y.startsWith(r)&&y.endsWith(r)&&y.replaceAll(r,"").length>0?".".concat(t):p},l=a.slice();l.push(function(p){p.type===Ve&&p.value.includes("&")&&(p.props[0]=p.props[0].replace(qn,r).replace(n,c))}),u.prefix&&l.push(En),l.push(Sn);var d=function(p,f,y,w){f===void 0&&(f=""),y===void 0&&(y=""),w===void 0&&(w="&"),t=w,r=f,n=new RegExp("\\".concat(r,"\\b"),"g");var M=p.replace(es,""),E=kn(y||f?"".concat(y," ").concat(f," { ").concat(M," }"):M);u.namespace&&(E=Nr(E,u.namespace));var A=[];return Ke(E,An(l.concat(Cn(function(C){return A.push(C)})))),A};return d.hash=a.length?a.reduce(function(p,f){return f.name||Me(15),de(p,f.name)},Mr).toString():"",d}var rs=new He,At=ts(),Pr=U.createContext({shouldForwardProp:void 0,styleSheet:rs,stylis:At});Pr.Consumer;U.createContext(void 0);function Ct(){return qr(Pr)}var ns=function(){function e(t,r){var n=this;this.inject=function(s,i){i===void 0&&(i=At);var u=n.name+i.hash;s.hasNameForId(n.id,u)||s.insertRules(n.id,u,i(n.rules,u,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Nt(this,function(){throw Me(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=At),this.name+t.hash},e}(),ss=function(e){return e>="A"&&e<="Z"};function er(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;ss(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var jr=function(e){return e==null||e===!1||e===""},zr=function(e){var t,r,n=[];for(var s in e){var i=e[s];e.hasOwnProperty(s)&&!jr(i)&&(Array.isArray(i)&&i.isCss||me(i)?n.push("".concat(er(s),":"),i,";"):De(i)?n.push.apply(n,Ie(Ie(["".concat(s," {")],zr(i),!1),["}"],!1)):n.push("".concat(er(s),": ").concat((t=s,(r=i)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in In||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function re(e,t,r,n){if(jr(e))return[];if(Rt(e))return[".".concat(e.styledComponentId)];if(me(e)){if(!me(i=e)||i.prototype&&i.prototype.isReactComponent||!t)return[e];var s=e(t);return re(s,t,r,n)}var i;return e instanceof ns?r?(e.inject(r,n),[e.getName(n)]):[e]:De(e)?zr(e):Array.isArray(e)?Array.prototype.concat.apply(et,e.map(function(u){return re(u,t,r,n)})):[e.toString()]}function Lr(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(me(r)&&!Rt(r))return!1}return!0}var os=Fr(qe),is=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&Lr(t),this.componentId=r,this.baseHash=de(os,r),this.baseStyle=n,He.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var s=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))s=ie(s,this.staticRulesId);else{var i=wt(re(this.rules,t,r,n)),u=kt(de(this.baseHash,i)>>>0);if(!r.hasNameForId(this.componentId,u)){var o=n(i,".".concat(u),void 0,this.componentId);r.insertRules(this.componentId,u,o)}s=ie(s,u),this.staticRulesId=u}else{for(var a=de(this.baseHash,n.hash),c="",l=0;l<this.rules.length;l++){var d=this.rules[l];if(typeof d=="string")c+=d;else if(d){var p=wt(re(d,t,r,n));a=de(a,p+l),c+=p}}if(c){var f=kt(a>>>0);r.hasNameForId(this.componentId,f)||r.insertRules(this.componentId,f,n(c,".".concat(f),void 0,this.componentId)),s=ie(s,f)}}return s},e}(),Pt=U.createContext(void 0);Pt.Consumer;var lt={};function as(e,t,r){var n=Rt(e),s=e,i=!ut(e),u=t.attrs,o=u===void 0?et:u,a=t.componentId,c=a===void 0?function(I,T){var D=typeof I!="string"?"sc":Yt(I);lt[D]=(lt[D]||0)+1;var v="".concat(D,"-").concat(Tr(qe+D+lt[D]));return T?"".concat(T,"-").concat(v):v}(t.displayName,t.parentComponentId):a,l=t.displayName,d=l===void 0?function(I){return ut(I)?"styled.".concat(I):"Styled(".concat(_n(I),")")}(e):l,p=t.displayName&&t.componentId?"".concat(Yt(t.displayName),"-").concat(t.componentId):t.componentId||c,f=n&&s.attrs?s.attrs.concat(o).filter(Boolean):o,y=t.shouldForwardProp;if(n&&s.shouldForwardProp){var w=s.shouldForwardProp;if(t.shouldForwardProp){var M=t.shouldForwardProp;y=function(I,T){return w(I,T)&&M(I,T)}}else y=w}var E=new is(r,p,n?s.componentStyle:void 0);function A(I,T){return function(D,v,_){var R=D.attrs,Y=D.componentStyle,Z=D.defaultProps,k=D.foldedComponentIds,g=D.styledComponentId,x=D.target,O=U.useContext(Pt),Fe=Ct(),rt=D.shouldForwardProp||Fe.shouldForwardProp,Lt=Ir(v,O,Z)||ge,J=function(Be,be,_e){for(var ke,se=j(j({},be),{className:void 0,theme:_e}),st=0;st<Be.length;st+=1){var $e=me(ke=Be[st])?ke(se):ke;for(var ee in $e)se[ee]=ee==="className"?ie(se[ee],$e[ee]):ee==="style"?j(j({},se[ee]),$e[ee]):$e[ee]}return be.className&&(se.className=ie(se.className,be.className)),se}(R,v,Lt),Te=J.as||x,xe={};for(var q in J)J[q]===void 0||q[0]==="$"||q==="as"||q==="theme"&&J.theme===Lt||(q==="forwardedAs"?xe.as=J.forwardedAs:rt&&!rt(q,Te)||(xe[q]=J[q]));var Wt=function(Be,be){var _e=Ct(),ke=Be.generateAndInjectStyles(be,_e.styleSheet,_e.stylis);return ke}(Y,J),nt=ie(k,g);return Wt&&(nt+=" "+Wt),J.className&&(nt+=" "+J.className),xe[ut(Te)&&!Dr.has(Te)?"class":"className"]=nt,_&&(xe.ref=_),en(Te,xe)}(C,I,T)}A.displayName=d;var C=U.forwardRef(A);return C.attrs=f,C.componentStyle=E,C.displayName=d,C.shouldForwardProp=y,C.foldedComponentIds=n?ie(s.foldedComponentIds,s.styledComponentId):"",C.styledComponentId=p,C.target=n?s.target:e,Object.defineProperty(C,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(I){this._foldedDefaultProps=n?function(T){for(var D=[],v=1;v<arguments.length;v++)D[v-1]=arguments[v];for(var _=0,R=D;_<R.length;_++)St(T,R[_],!0);return T}({},s.defaultProps,I):I}}),Nt(C,function(){return".".concat(C.styledComponentId)}),i&&Or(C,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),C}function tr(e,t){for(var r=[e[0]],n=0,s=t.length;n<s;n+=1)r.push(t[n],e[n+1]);return r}var rr=function(e){return Object.assign(e,{isCss:!0})};function Wr(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(me(e)||De(e))return rr(re(tr(et,Ie([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?re(n):rr(re(tr(n,t)))}function Et(e,t,r){if(r===void 0&&(r=ge),!t)throw Me(1,t);var n=function(s){for(var i=[],u=1;u<arguments.length;u++)i[u-1]=arguments[u];return e(t,r,Wr.apply(void 0,Ie([s],i,!1)))};return n.attrs=function(s){return Et(e,t,j(j({},r),{attrs:Array.prototype.concat(r.attrs,s).filter(Boolean)}))},n.withConfig=function(s){return Et(e,t,j(j({},r),s))},n}var Kr=function(e){return Et(as,e)},m=Kr;Dr.forEach(function(e){m[e]=Kr(e)});var cs=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=Lr(t),He.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,s){var i=s(wt(re(this.rules,r,n,s)),""),u=this.componentId+t;n.insertRules(u,u,i)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,s){t>2&&He.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,s)},e}();function us(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=Wr.apply(void 0,Ie([e],t,!1)),s="sc-global-".concat(Tr(JSON.stringify(n))),i=new cs(n,s),u=function(a){var c=Ct(),l=U.useContext(Pt),d=U.useRef(c.styleSheet.allocateGSInstance(s)).current;return c.styleSheet.server&&o(d,a,c.styleSheet,l,c.stylis),U.useLayoutEffect(function(){if(!c.styleSheet.server)return o(d,a,c.styleSheet,l,c.stylis),function(){return i.removeStyles(d,c.styleSheet)}},[d,a,c.styleSheet,l,c.stylis]),null};function o(a,c,l,d,p){if(i.isStatic)i.renderStyles(a,Mn,l,p);else{var f=j(j({},c),{theme:Ir(c,d,u.defaultProps)});i.renderStyles(a,f,l,p)}}return U.memo(u)}const ls=e=>e.split(`
`).filter(r=>r.trim()!=="").map(ds),ds=e=>{let t=e,r=!1,n,s,i,u="";if(t.startsWith("x ")){r=!0,t=t.substring(2);const f=/^(\d{4}-\d{2}-\d{2})\s+/.exec(t);f&&(n=new Date(f[1]),t=t.substring(f[0].length))}const o=/^\(([A-Z])\)\s+/.exec(t);o&&(s=o[1],t=t.substring(o[0].length));const a=/^(\d{4}-\d{2}-\d{2})\s+/.exec(t);a&&(i=new Date(a[1]),t=t.substring(a[0].length)),u=t;const c=hs(t),l=ps(t),d=fs(t);let p=u;return c.forEach(f=>{p=p.replace(new RegExp(`\\s\\+${f}\\b`,"g"),"")}),l.forEach(f=>{p=p.replace(new RegExp(`\\s@${f}\\b`,"g"),"")}),Object.entries(d).forEach(([f,y])=>{p=p.replace(new RegExp(`\\s${f}:${y}\\b`,"g"),"")}),p=p.trim(),{raw:e,completed:r,completionDate:n,priority:s,creationDate:i,description:p,projects:c,contexts:l,metadata:d}},hs=e=>{const t=e.match(/\s\+([^\s]+)/g);return t?t.map(r=>r.trim().substring(1)):[]},ps=e=>{const t=e.match(/\s@([^\s]+)/g);return t?t.map(r=>r.trim().substring(1)):[]},fs=e=>{const t=e.match(/\s([^\s:]+):([^\s:]+)/g);return t?t.reduce((r,n)=>{const[s,i]=n.trim().split(":");return{...r,[s]:i}},{}):{}},nr=e=>e.toISOString().split("T")[0],jt=e=>{const t=[];e.completed&&(t.push("x"),e.completionDate&&t.push(nr(e.completionDate))),!e.completed&&e.priority&&t.push(`(${e.priority})`),e.creationDate&&t.push(nr(e.creationDate));let{description:r}=e;e.projects.forEach(s=>{r=r.replace(` +${s}`,"")}),e.contexts.forEach(s=>{r=r.replace(` @${s}`,"")}),Object.entries(e.metadata).forEach(([s,i])=>{r=r.replace(` ${s}:${i}`,"")}),t.push(r.trim());const n=[...e.projects.map(s=>`+${s}`),...e.contexts.map(s=>`@${s}`),...Object.entries(e.metadata).map(([s,i])=>`${s}:${i}`)];return[...t,...n].join(" ")},gs=e=>e.map(jt).join(`
`),ms=m.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;

  @media (min-width: 769px) {
    margin-left: 250px;
  }
`,tt=m.button`
  background-color: var(--sn-stylekit-info-color);
  color: var(--sn-stylekit-info-contrast-color);
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: var(--sn-stylekit-info-color-darkened);
  }

  &:disabled {
    background-color: var(--sn-stylekit-passive-color-3);
    color: var(--sn-stylekit-passive-color-1);
    cursor: not-allowed;
  }
`,ys=m(tt)`
  background-color: var(--sn-stylekit-contrast-background-color);
  color: var(--sn-stylekit-foreground-color);

  &:hover {
    background-color: var(--sn-stylekit-secondary-background-color);
  }
`,vs=m.main`
  flex: 1;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`,xs=m.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${e=>e.isOpen?"block":"none"};

  @media (min-width: 769px) {
    display: none;
  }
`,bs=()=>h("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[h("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),h("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),h("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]}),ks=m.aside`
  width: ${e=>e.isOpen?"250px":"0"};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--sn-stylekit-contrast-background-color, #2a2a2a);
  transition:
    width 0.3s ease,
    transform 0.3s ease;
  overflow-x: hidden;
  z-index: 1000;
  box-shadow: ${e=>e.isOpen?"0 0 10px rgba(0, 0, 0, 0.2)":"none"};
  /* On mobile, sidebar slides in from left */
  @media (max-width: 768px) {
    width: 250px;
    transform: ${e=>e.isOpen?"translateX(0)":"translateX(-100%)"};
  }
`,ws=m.div`
  width: 250px;
  padding: 20px;
  padding-top: 75px;
`,Ss=m.div`
  flex: 1;
  overflow-y: auto;
  background-color: var(--sn-stylekit-editor-background-color);
  border: 1px solid var(--sn-stylekit-border-color);
  border-radius: 4px;
`,dt=m.div`
  margin-bottom: 24px;
`,ht=m.h3`
  font-size: 14px;
  font-weight: 500;
  color: var(--sn-stylekit-passive-color-1);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,we=m.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: ${e=>e.active?"var(--sn-stylekit-contrast-background-color)":"transparent"};
  color: ${e=>e.active?"var(--sn-stylekit-info-color)":"var(--sn-stylekit-foreground-color)"};
  font-weight: ${e=>e.active?"500":"normal"};

  &:hover {
    background-color: var(--sn-stylekit-contrast-background-color);
  }
`,Se=m.span`
  background-color: var(--sn-stylekit-passive-color-4);
  color: var(--sn-stylekit-passive-color-1);
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 12px;
  margin-left: auto;
`,As=m.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
  opacity: ${e=>e.completed?.6:1};

  &:hover {
    background-color: var(--sn-stylekit-contrast-background-color);
  }
`,Cs=m.input`
  margin-right: 12px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`,Es=m.div`
  flex: 1;
`,Is=m.div`
  font-size: 15px;
  margin-bottom: 4px;
  color: var(--sn-stylekit-foreground-color);
  text-decoration: ${e=>e.completed?"line-through":"none"};
`,Ds=m.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 12px;
`,Ms=m.span`
  background-color: ${e=>{switch(e.priority){case"A":return"var(--sn-stylekit-danger-color)";case"B":return"var(--sn-stylekit-warning-color)";case"C":return"var(--sn-stylekit-info-color)";default:return"var(--sn-stylekit-passive-color-3)"}}};
  color: ${e=>e.priority==="A"?"white":"black"};
  border-radius: 3px;
  padding: 2px 6px;
  font-weight: 500;
`,Fs=m.span`
  background-color: var(--sn-stylekit-accessory-tint-color-5);
  color: white;
  border-radius: 3px;
  padding: 2px 6px;
`,Ts=m.span`
  background-color: var(--sn-stylekit-accessory-tint-color-4);
  color: white;
  border-radius: 3px;
  padding: 2px 6px;
`,Bs=m.span`
  background-color: var(--sn-stylekit-passive-color-4);
  color: var(--sn-stylekit-passive-color-0);
  border-radius: 3px;
  padding: 2px 6px;
`,sr=m.span`
  color: var(--sn-stylekit-passive-color-1);
  font-size: 12px;
`,_s=m.div`
  display: grid;
  /* Mobile layout (menu + search + add button) */
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 0 16px;

  @media (min-width: 769px) {
    /* Desktop layout (search + add button) */
    grid-template-columns: 1fr auto;
  }
`,$s=m(tt)`
  justify-content: center;
  height: 44px;
  white-space: nowrap;
`,Os=m.button`
  background: var(--sn-stylekit-info-color, #4a90e2);
  color: white;
  border: none;
  border-radius: 4px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: var(--sn-stylekit-info-color-hover, #3a80d2);
  }

  /* Hide on desktop */
  @media (min-width: 769px) {
    display: none;
  }
`,Rs=m.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  color: var(--sn-stylekit-passive-color-1);
`,Ns=m.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: var(--sn-stylekit-passive-color-3);
`,Ps=m.p`
  font-size: 16px;
  margin-bottom: 16px;
`,js=m.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,zs=m.div`
  background-color: var(--sn-stylekit-background-color);
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`,Ls=m.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Ws=m.h2`
  font-size: 18px;
  font-weight: 500;
`,Ks=m.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--sn-stylekit-passive-color-1);

  &:hover {
    color: var(--sn-stylekit-foreground-color);
  }
`,Gs=m.div`
  padding: 20px;
`,Us=m.div`
  padding: 16px 20px;
  border-top: 1px solid var(--sn-stylekit-border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,ue=m.div`
  margin-bottom: 16px;
`,le=m.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--sn-stylekit-foreground-color);
`,or=m.input`
  width: 100%;
  padding: 10px 12px;
  background-color: var(--sn-stylekit-contrast-background-color, #2a2a2a);
  color: var(--sn-stylekit-foreground-color, #ffffff);
  border: 1px solid var(--sn-stylekit-border-color);
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--sn-stylekit-info-color);
  }
`,pt=m.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`,ir=m.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`,ar=m.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--sn-stylekit-border-color);
  background-color: var(--sn-stylekit-contrast-background-color, #2a2a2a);
  color: var(--sn-stylekit-foreground-color, #ffffff);
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--sn-stylekit-info-color);
  }
`,ft=m.button`
  background-color: var(--sn-stylekit-contrast-background-color);
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: var(--sn-stylekit-secondary-background-color);
  }
`,gt=m.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background-color: var(--sn-stylekit-contrast-background-color);
  border-radius: 4px;
  font-size: 14px;
`,mt=m.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: var(--sn-stylekit-passive-color-1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;

  &:hover {
    color: var(--sn-stylekit-danger-color);
  }
`,Hs=m.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 8px;
  margin-top: 8px;
  width: 100%;
`,Ys=m.input`
  min-width: 0; /* Critical to prevent overflow */
  padding: 8px 12px;
  border: 1px solid var(--sn-stylekit-border-color);
  background-color: var(--sn-stylekit-contrast-background-color, #2a2a2a);
  color: var(--sn-stylekit-foreground-color, #ffffff);
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--sn-stylekit-info-color);
  }
`,Js=m.input`
  min-width: 0; /* Critical to prevent overflow */
  padding: 8px 12px;
  border: 1px solid var(--sn-stylekit-border-color);
  background-color: var(--sn-stylekit-contrast-background-color, #2a2a2a);
  color: var(--sn-stylekit-foreground-color, #ffffff);
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--sn-stylekit-info-color);
  }
`,Vs=m.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`,cr=m.button`
  background: none;
  border: none;
  color: var(--sn-stylekit-passive-color-1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;

  &:hover {
    background-color: var(--sn-stylekit-secondary-background-color);
    color: var(--sn-stylekit-foreground-color);
  }
`,Qs=m.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--sn-stylekit-border-color);
  border-radius: 4px;
  font-size: 14px;
  background-color: var(--sn-stylekit-background-color);
  color: var(--sn-stylekit-foreground-color);
  appearance: none; /* Remove default arrow */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2372767e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
  padding-right: 30px;

  &:focus {
    outline: none;
    border-color: var(--sn-stylekit-info-color);
  }

  option {
    background-color: var(--sn-stylekit-background-color);
    color: var(--sn-stylekit-foreground-color);
  }

  /* For Firefox */
  @-moz-document url-prefix() {
    color: var(--sn-stylekit-foreground-color);
    background-color: var(--sn-stylekit-background-color);
  }
`,Xs=m.div`
  position: relative;
  width: 100%;
  margin: 16px 0;
`,Zs=m.input`
  width: 100%;
  padding: 12px 16px 12px 42px;
  background-color: var(--sn-stylekit-contrast-background-color, #2a2a2a);
  color: var(--sn-stylekit-foreground-color, #ffffff);
  border: 1px solid var(--sn-stylekit-border-color, #3a3a3a);
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: var(--sn-stylekit-info-color, #4a90e2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &::placeholder {
    color: var(--sn-stylekit-foreground-color, #888888);
  }
`,qs=m.div`
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: var(--sn-stylekit-foreground-color, #888888);
  pointer-events: none;
  transition: color 0.2s ease;
`,eo=m.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  display: "flex";
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: var(--sn-stylekit-foreground-color, #888888);
  color: var(--sn-stylekit-contrast-background-color, #2a2a2a);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--sn-stylekit-contrast-foreground-color, #ffffff);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--sn-stylekit-info-color, #4a90e2);
  }
`,to=({onSave:e,onCancel:t,editContext:r})=>{const[n,s]=N((r==null?void 0:r.item.description)??""),[i,u]=N((r==null?void 0:r.item.priority)??""),[o,a]=N((r==null?void 0:r.item.projects)??[]),[c,l]=N((r==null?void 0:r.item.contexts)??[]),[d,p]=N((r==null?void 0:r.item.metadata)??{}),[f,y]=N(""),[w,M]=N(""),[E,A]=N(""),[C,I]=N(""),T=()=>{E.trim()&&C.trim()&&(p({...d,[E.trim()]:C.trim()}),A(""),I(""))},D=g=>{const x={...d};delete x[g],p(x)},v=()=>{if(!n.trim())return;const g={raw:"",completed:!1,description:n.trim(),priority:i||void 0,creationDate:new Date,projects:o,contexts:c,metadata:d};g.raw=jt(g),e(g,r==null?void 0:r.index)},_=()=>{f.trim()&&!o.includes(f.trim())&&(a([...o,f.trim()]),y(""))},R=()=>{w.trim()&&!c.includes(w.trim())&&(l([...c,w.trim()]),M(""))},Y=g=>{a(o.filter(x=>x!==g))},Z=g=>{l(c.filter(x=>x!==g))},k=g=>{const x=d;d.due=g.target.value,p(x)};return h(js,{children:h(zs,{children:[h(Ls,{children:[h(Ws,{children:r?"Edit Task":"Add New Task"}),h(Ks,{onClick:t,children:"×"})]}),h(Gs,{children:[h(ue,{children:[h(le,{children:"Task Description"}),h(or,{value:n,onChange:g=>{s(g.target.value)},placeholder:"What needs to be done?",autoFocus:!0})]}),h(ue,{children:[h(le,{children:"Priority"}),h(Qs,{value:i,onChange:g=>{u(g.target.value)},children:[h("option",{value:"",children:"No Priority"}),["A","B","C","D","E"].map(g=>h("option",{value:g,children:["Priority ",g]},g))]})]}),h(ue,{children:[h(le,{children:"Projects"}),h(pt,{children:o.map(g=>h(gt,{children:["+",g,h(mt,{onClick:()=>{Y(g)},children:"×"})]},g))}),h(ir,{children:[h(ar,{value:f,onChange:g=>{y(g.target.value)},placeholder:"Add project...",onKeyDown:g=>{g.key==="Enter"&&_()}}),h(ft,{onClick:_,children:"Add"})]})]}),h(ue,{children:[h(le,{children:"Contexts"}),h(pt,{children:c.map(g=>h(gt,{children:["@",g,h(mt,{onClick:()=>{Z(g)},children:"×"})]},g))}),h(ir,{children:[h(ar,{value:w,onChange:g=>{M(g.target.value)},placeholder:"Add context...",onKeyDown:g=>{g.key==="Enter"&&R()}}),h(ft,{onClick:R,children:"Add"})]})]}),h(ue,{children:[h(le,{children:"Due Date"}),h(or,{type:"date",onChange:k,value:d.due})]}),h(ue,{children:[h(le,{children:"Metadata"}),h(pt,{children:Object.entries(d).map(([g,x])=>h(gt,{children:[g,":",x,h(mt,{onClick:()=>{D(g)},children:"×"})]},g))}),h(Hs,{children:[h(Ys,{value:E,onChange:g=>{A(g.target.value)},placeholder:"Key"}),h(Js,{value:C,onChange:g=>{I(g.target.value)},placeholder:"Value",onKeyDown:g=>{g.key==="Enter"&&T()}}),h(ft,{onClick:T,children:"Add"})]})]})]}),h(Us,{children:[h(ys,{onClick:t,children:"Cancel"}),h(tt,{onClick:v,disabled:n=="",children:r?"Update Task":"Add Task"})]})]})})},ur="todo_txt_search_input",ro=({value:e,onChange:t})=>h(Xs,{children:[h(Zs,{id:ur,type:"text",placeholder:"Search...",value:e,onChange:s=>{t(s.target.value)}}),h(qs,{children:h("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[h("circle",{cx:"11",cy:"11",r:"8"}),h("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]})}),h(eo,{onClick:()=>{t(""),document.getElementById(ur).focus()},"aria-label":"Clear search",children:"×"})]});function X(e){return Array.isArray?Array.isArray(e):Hr(e)==="[object Array]"}function no(e){if(typeof e=="string")return e;let t=e+"";return t=="0"&&1/e==-1/0?"-0":t}function so(e){return e==null?"":no(e)}function H(e){return typeof e=="string"}function Gr(e){return typeof e=="number"}function oo(e){return e===!0||e===!1||io(e)&&Hr(e)=="[object Boolean]"}function Ur(e){return typeof e=="object"}function io(e){return Ur(e)&&e!==null}function L(e){return e!=null}function yt(e){return!e.trim().length}function Hr(e){return e==null?e===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}const ao="Incorrect 'index' type",co=e=>`Invalid value for key ${e}`,uo=e=>`Pattern length exceeds max of ${e}.`,lo=e=>`Missing ${e} property in key`,ho=e=>`Property 'weight' in key '${e}' must be a positive integer`,lr=Object.prototype.hasOwnProperty;class po{constructor(t){this._keys=[],this._keyMap={};let r=0;t.forEach(n=>{let s=Yr(n);this._keys.push(s),this._keyMap[s.id]=s,r+=s.weight}),this._keys.forEach(n=>{n.weight/=r})}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function Yr(e){let t=null,r=null,n=null,s=1,i=null;if(H(e)||X(e))n=e,t=dr(e),r=It(e);else{if(!lr.call(e,"name"))throw new Error(lo("name"));const u=e.name;if(n=u,lr.call(e,"weight")&&(s=e.weight,s<=0))throw new Error(ho(u));t=dr(u),r=It(u),i=e.getFn}return{path:t,id:r,weight:s,src:n,getFn:i}}function dr(e){return X(e)?e:e.split(".")}function It(e){return X(e)?e.join("."):e}function fo(e,t){let r=[],n=!1;const s=(i,u,o)=>{if(L(i))if(!u[o])r.push(i);else{let a=u[o];const c=i[a];if(!L(c))return;if(o===u.length-1&&(H(c)||Gr(c)||oo(c)))r.push(so(c));else if(X(c)){n=!0;for(let l=0,d=c.length;l<d;l+=1)s(c[l],u,o+1)}else u.length&&s(c,u,o+1)}};return s(e,H(t)?t.split("."):t,0),n?r:r[0]}const go={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},mo={isCaseSensitive:!1,ignoreDiacritics:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1},yo={location:0,threshold:.6,distance:100},vo={useExtendedSearch:!1,getFn:fo,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};var b={...mo,...go,...yo,...vo};const xo=/[^ ]+/g;function bo(e=1,t=3){const r=new Map,n=Math.pow(10,t);return{get(s){const i=s.match(xo).length;if(r.has(i))return r.get(i);const u=1/Math.pow(i,.5*e),o=parseFloat(Math.round(u*n)/n);return r.set(i,o),o},clear(){r.clear()}}}class zt{constructor({getFn:t=b.getFn,fieldNormWeight:r=b.fieldNormWeight}={}){this.norm=bo(r,3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach((r,n)=>{this._keysMap[r.id]=n})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,H(this.docs[0])?this.docs.forEach((t,r)=>{this._addString(t,r)}):this.docs.forEach((t,r)=>{this._addObject(t,r)}),this.norm.clear())}add(t){const r=this.size();H(t)?this._addString(t,r):this._addObject(t,r)}removeAt(t){this.records.splice(t,1);for(let r=t,n=this.size();r<n;r+=1)this.records[r].i-=1}getValueForItemAtKeyId(t,r){return t[this._keysMap[r]]}size(){return this.records.length}_addString(t,r){if(!L(t)||yt(t))return;let n={v:t,i:r,n:this.norm.get(t)};this.records.push(n)}_addObject(t,r){let n={i:r,$:{}};this.keys.forEach((s,i)=>{let u=s.getFn?s.getFn(t):this.getFn(t,s.path);if(L(u)){if(X(u)){let o=[];const a=[{nestedArrIndex:-1,value:u}];for(;a.length;){const{nestedArrIndex:c,value:l}=a.pop();if(L(l))if(H(l)&&!yt(l)){let d={v:l,i:c,n:this.norm.get(l)};o.push(d)}else X(l)&&l.forEach((d,p)=>{a.push({nestedArrIndex:p,value:d})})}n.$[i]=o}else if(H(u)&&!yt(u)){let o={v:u,n:this.norm.get(u)};n.$[i]=o}}}),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function Jr(e,t,{getFn:r=b.getFn,fieldNormWeight:n=b.fieldNormWeight}={}){const s=new zt({getFn:r,fieldNormWeight:n});return s.setKeys(e.map(Yr)),s.setSources(t),s.create(),s}function ko(e,{getFn:t=b.getFn,fieldNormWeight:r=b.fieldNormWeight}={}){const{keys:n,records:s}=e,i=new zt({getFn:t,fieldNormWeight:r});return i.setKeys(n),i.setIndexRecords(s),i}function Ne(e,{errors:t=0,currentLocation:r=0,expectedLocation:n=0,distance:s=b.distance,ignoreLocation:i=b.ignoreLocation}={}){const u=t/e.length;if(i)return u;const o=Math.abs(n-r);return s?u+o/s:o?1:u}function wo(e=[],t=b.minMatchCharLength){let r=[],n=-1,s=-1,i=0;for(let u=e.length;i<u;i+=1){let o=e[i];o&&n===-1?n=i:!o&&n!==-1&&(s=i-1,s-n+1>=t&&r.push([n,s]),n=-1)}return e[i-1]&&i-n>=t&&r.push([n,i-1]),r}const oe=32;function So(e,t,r,{location:n=b.location,distance:s=b.distance,threshold:i=b.threshold,findAllMatches:u=b.findAllMatches,minMatchCharLength:o=b.minMatchCharLength,includeMatches:a=b.includeMatches,ignoreLocation:c=b.ignoreLocation}={}){if(t.length>oe)throw new Error(uo(oe));const l=t.length,d=e.length,p=Math.max(0,Math.min(n,d));let f=i,y=p;const w=o>1||a,M=w?Array(d):[];let E;for(;(E=e.indexOf(t,y))>-1;){let v=Ne(t,{currentLocation:E,expectedLocation:p,distance:s,ignoreLocation:c});if(f=Math.min(v,f),y=E+l,w){let _=0;for(;_<l;)M[E+_]=1,_+=1}}y=-1;let A=[],C=1,I=l+d;const T=1<<l-1;for(let v=0;v<l;v+=1){let _=0,R=I;for(;_<R;)Ne(t,{errors:v,currentLocation:p+R,expectedLocation:p,distance:s,ignoreLocation:c})<=f?_=R:I=R,R=Math.floor((I-_)/2+_);I=R;let Y=Math.max(1,p-R+1),Z=u?d:Math.min(p+R,d)+l,k=Array(Z+2);k[Z+1]=(1<<v)-1;for(let x=Z;x>=Y;x-=1){let O=x-1,Fe=r[e.charAt(O)];if(w&&(M[O]=+!!Fe),k[x]=(k[x+1]<<1|1)&Fe,v&&(k[x]|=(A[x+1]|A[x])<<1|1|A[x+1]),k[x]&T&&(C=Ne(t,{errors:v,currentLocation:O,expectedLocation:p,distance:s,ignoreLocation:c}),C<=f)){if(f=C,y=O,y<=p)break;Y=Math.max(1,2*p-y)}}if(Ne(t,{errors:v+1,currentLocation:p,expectedLocation:p,distance:s,ignoreLocation:c})>f)break;A=k}const D={isMatch:y>=0,score:Math.max(.001,C)};if(w){const v=wo(M,o);v.length?a&&(D.indices=v):D.isMatch=!1}return D}function Ao(e){let t={};for(let r=0,n=e.length;r<n;r+=1){const s=e.charAt(r);t[s]=(t[s]||0)|1<<n-r-1}return t}const Ye=String.prototype.normalize?e=>e.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g,""):e=>e;class Vr{constructor(t,{location:r=b.location,threshold:n=b.threshold,distance:s=b.distance,includeMatches:i=b.includeMatches,findAllMatches:u=b.findAllMatches,minMatchCharLength:o=b.minMatchCharLength,isCaseSensitive:a=b.isCaseSensitive,ignoreDiacritics:c=b.ignoreDiacritics,ignoreLocation:l=b.ignoreLocation}={}){if(this.options={location:r,threshold:n,distance:s,includeMatches:i,findAllMatches:u,minMatchCharLength:o,isCaseSensitive:a,ignoreDiacritics:c,ignoreLocation:l},t=a?t:t.toLowerCase(),t=c?Ye(t):t,this.pattern=t,this.chunks=[],!this.pattern.length)return;const d=(f,y)=>{this.chunks.push({pattern:f,alphabet:Ao(f),startIndex:y})},p=this.pattern.length;if(p>oe){let f=0;const y=p%oe,w=p-y;for(;f<w;)d(this.pattern.substr(f,oe),f),f+=oe;if(y){const M=p-oe;d(this.pattern.substr(M),M)}}else d(this.pattern,0)}searchIn(t){const{isCaseSensitive:r,ignoreDiacritics:n,includeMatches:s}=this.options;if(t=r?t:t.toLowerCase(),t=n?Ye(t):t,this.pattern===t){let w={isMatch:!0,score:0};return s&&(w.indices=[[0,t.length-1]]),w}const{location:i,distance:u,threshold:o,findAllMatches:a,minMatchCharLength:c,ignoreLocation:l}=this.options;let d=[],p=0,f=!1;this.chunks.forEach(({pattern:w,alphabet:M,startIndex:E})=>{const{isMatch:A,score:C,indices:I}=So(t,w,M,{location:i+E,distance:u,threshold:o,findAllMatches:a,minMatchCharLength:c,includeMatches:s,ignoreLocation:l});A&&(f=!0),p+=C,A&&I&&(d=[...d,...I])});let y={isMatch:f,score:f?p/this.chunks.length:1};return f&&s&&(y.indices=d),y}}class ne{constructor(t){this.pattern=t}static isMultiMatch(t){return hr(t,this.multiRegex)}static isSingleMatch(t){return hr(t,this.singleRegex)}search(){}}function hr(e,t){const r=e.match(t);return r?r[1]:null}class Co extends ne{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const r=t===this.pattern;return{isMatch:r,score:r?0:1,indices:[0,this.pattern.length-1]}}}class Eo extends ne{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const n=t.indexOf(this.pattern)===-1;return{isMatch:n,score:n?0:1,indices:[0,t.length-1]}}}class Io extends ne{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const r=t.startsWith(this.pattern);return{isMatch:r,score:r?0:1,indices:[0,this.pattern.length-1]}}}class Do extends ne{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const r=!t.startsWith(this.pattern);return{isMatch:r,score:r?0:1,indices:[0,t.length-1]}}}class Mo extends ne{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const r=t.endsWith(this.pattern);return{isMatch:r,score:r?0:1,indices:[t.length-this.pattern.length,t.length-1]}}}class Fo extends ne{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const r=!t.endsWith(this.pattern);return{isMatch:r,score:r?0:1,indices:[0,t.length-1]}}}class Qr extends ne{constructor(t,{location:r=b.location,threshold:n=b.threshold,distance:s=b.distance,includeMatches:i=b.includeMatches,findAllMatches:u=b.findAllMatches,minMatchCharLength:o=b.minMatchCharLength,isCaseSensitive:a=b.isCaseSensitive,ignoreDiacritics:c=b.ignoreDiacritics,ignoreLocation:l=b.ignoreLocation}={}){super(t),this._bitapSearch=new Vr(t,{location:r,threshold:n,distance:s,includeMatches:i,findAllMatches:u,minMatchCharLength:o,isCaseSensitive:a,ignoreDiacritics:c,ignoreLocation:l})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class Xr extends ne{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let r=0,n;const s=[],i=this.pattern.length;for(;(n=t.indexOf(this.pattern,r))>-1;)r=n+i,s.push([n,r-1]);const u=!!s.length;return{isMatch:u,score:u?0:1,indices:s}}}const Dt=[Co,Xr,Io,Do,Fo,Mo,Eo,Qr],pr=Dt.length,To=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,Bo="|";function _o(e,t={}){return e.split(Bo).map(r=>{let n=r.trim().split(To).filter(i=>i&&!!i.trim()),s=[];for(let i=0,u=n.length;i<u;i+=1){const o=n[i];let a=!1,c=-1;for(;!a&&++c<pr;){const l=Dt[c];let d=l.isMultiMatch(o);d&&(s.push(new l(d,t)),a=!0)}if(!a)for(c=-1;++c<pr;){const l=Dt[c];let d=l.isSingleMatch(o);if(d){s.push(new l(d,t));break}}}return s})}const $o=new Set([Qr.type,Xr.type]);class Oo{constructor(t,{isCaseSensitive:r=b.isCaseSensitive,ignoreDiacritics:n=b.ignoreDiacritics,includeMatches:s=b.includeMatches,minMatchCharLength:i=b.minMatchCharLength,ignoreLocation:u=b.ignoreLocation,findAllMatches:o=b.findAllMatches,location:a=b.location,threshold:c=b.threshold,distance:l=b.distance}={}){this.query=null,this.options={isCaseSensitive:r,ignoreDiacritics:n,includeMatches:s,minMatchCharLength:i,findAllMatches:o,ignoreLocation:u,location:a,threshold:c,distance:l},t=r?t:t.toLowerCase(),t=n?Ye(t):t,this.pattern=t,this.query=_o(this.pattern,this.options)}static condition(t,r){return r.useExtendedSearch}searchIn(t){const r=this.query;if(!r)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:s,ignoreDiacritics:i}=this.options;t=s?t:t.toLowerCase(),t=i?Ye(t):t;let u=0,o=[],a=0;for(let c=0,l=r.length;c<l;c+=1){const d=r[c];o.length=0,u=0;for(let p=0,f=d.length;p<f;p+=1){const y=d[p],{isMatch:w,indices:M,score:E}=y.search(t);if(w){if(u+=1,a+=E,n){const A=y.constructor.type;$o.has(A)?o=[...o,...M]:o.push(M)}}else{a=0,u=0,o.length=0;break}}if(u){let p={isMatch:!0,score:a/u};return n&&(p.indices=o),p}}return{isMatch:!1,score:1}}}const Mt=[];function Ro(...e){Mt.push(...e)}function Ft(e,t){for(let r=0,n=Mt.length;r<n;r+=1){let s=Mt[r];if(s.condition(e,t))return new s(e,t)}return new Vr(e,t)}const Je={AND:"$and",OR:"$or"},Tt={PATH:"$path",PATTERN:"$val"},Bt=e=>!!(e[Je.AND]||e[Je.OR]),No=e=>!!e[Tt.PATH],Po=e=>!X(e)&&Ur(e)&&!Bt(e),fr=e=>({[Je.AND]:Object.keys(e).map(t=>({[t]:e[t]}))});function Zr(e,t,{auto:r=!0}={}){const n=s=>{let i=Object.keys(s);const u=No(s);if(!u&&i.length>1&&!Bt(s))return n(fr(s));if(Po(s)){const a=u?s[Tt.PATH]:i[0],c=u?s[Tt.PATTERN]:s[a];if(!H(c))throw new Error(co(a));const l={keyId:It(a),pattern:c};return r&&(l.searcher=Ft(c,t)),l}let o={children:[],operator:i[0]};return i.forEach(a=>{const c=s[a];X(c)&&c.forEach(l=>{o.children.push(n(l))})}),o};return Bt(e)||(e=fr(e)),n(e)}function jo(e,{ignoreFieldNorm:t=b.ignoreFieldNorm}){e.forEach(r=>{let n=1;r.matches.forEach(({key:s,norm:i,score:u})=>{const o=s?s.weight:null;n*=Math.pow(u===0&&o?Number.EPSILON:u,(o||1)*(t?1:i))}),r.score=n})}function zo(e,t){const r=e.matches;t.matches=[],L(r)&&r.forEach(n=>{if(!L(n.indices)||!n.indices.length)return;const{indices:s,value:i}=n;let u={indices:s,value:i};n.key&&(u.key=n.key.src),n.idx>-1&&(u.refIndex=n.idx),t.matches.push(u)})}function Lo(e,t){t.score=e.score}function Wo(e,t,{includeMatches:r=b.includeMatches,includeScore:n=b.includeScore}={}){const s=[];return r&&s.push(zo),n&&s.push(Lo),e.map(i=>{const{idx:u}=i,o={item:t[u],refIndex:u};return s.length&&s.forEach(a=>{a(i,o)}),o})}class ve{constructor(t,r={},n){this.options={...b,...r},this.options.useExtendedSearch,this._keyStore=new po(this.options.keys),this.setCollection(t,n)}setCollection(t,r){if(this._docs=t,r&&!(r instanceof zt))throw new Error(ao);this._myIndex=r||Jr(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(t){L(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=()=>!1){const r=[];for(let n=0,s=this._docs.length;n<s;n+=1){const i=this._docs[n];t(i,n)&&(this.removeAt(n),n-=1,s-=1,r.push(i))}return r}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:r=-1}={}){const{includeMatches:n,includeScore:s,shouldSort:i,sortFn:u,ignoreFieldNorm:o}=this.options;let a=H(t)?H(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return jo(a,{ignoreFieldNorm:o}),i&&a.sort(u),Gr(r)&&r>-1&&(a=a.slice(0,r)),Wo(a,this._docs,{includeMatches:n,includeScore:s})}_searchStringList(t){const r=Ft(t,this.options),{records:n}=this._myIndex,s=[];return n.forEach(({v:i,i:u,n:o})=>{if(!L(i))return;const{isMatch:a,score:c,indices:l}=r.searchIn(i);a&&s.push({item:i,idx:u,matches:[{score:c,value:i,norm:o,indices:l}]})}),s}_searchLogical(t){const r=Zr(t,this.options),n=(o,a,c)=>{if(!o.children){const{keyId:d,searcher:p}=o,f=this._findMatches({key:this._keyStore.get(d),value:this._myIndex.getValueForItemAtKeyId(a,d),searcher:p});return f&&f.length?[{idx:c,item:a,matches:f}]:[]}const l=[];for(let d=0,p=o.children.length;d<p;d+=1){const f=o.children[d],y=n(f,a,c);if(y.length)l.push(...y);else if(o.operator===Je.AND)return[]}return l},s=this._myIndex.records,i={},u=[];return s.forEach(({$:o,i:a})=>{if(L(o)){let c=n(r,o,a);c.length&&(i[a]||(i[a]={idx:a,item:o,matches:[]},u.push(i[a])),c.forEach(({matches:l})=>{i[a].matches.push(...l)}))}}),u}_searchObjectList(t){const r=Ft(t,this.options),{keys:n,records:s}=this._myIndex,i=[];return s.forEach(({$:u,i:o})=>{if(!L(u))return;let a=[];n.forEach((c,l)=>{a.push(...this._findMatches({key:c,value:u[l],searcher:r}))}),a.length&&i.push({idx:o,item:u,matches:a})}),i}_findMatches({key:t,value:r,searcher:n}){if(!L(r))return[];let s=[];if(X(r))r.forEach(({v:i,i:u,n:o})=>{if(!L(i))return;const{isMatch:a,score:c,indices:l}=n.searchIn(i);a&&s.push({score:c,key:t,value:i,idx:u,norm:o,indices:l})});else{const{v:i,n:u}=r,{isMatch:o,score:a,indices:c}=n.searchIn(i);o&&s.push({score:a,key:t,value:i,norm:u,indices:c})}return s}}ve.version="7.1.0";ve.createIndex=Jr;ve.parseIndex=ko;ve.config=b;ve.parseQuery=Zr;Ro(Oo);const gr=(e,t)=>{t=t??[];const r=t.indexOf(e);return r===-1?[...t,e]:(t.splice(r,1),t)},mr=(e,t)=>t==null||t.length==0?!0:t.every(r=>e.includes(r)),Ko=tn(({todos:e,searchText:t,onFiltered:r},n)=>{const[s,i]=N({state:"active"});rn(n,()=>({clearFilters:()=>i({})}));const u=ot(()=>{const c=new Set;return e.forEach(l=>{l.projects.forEach(d=>c.add(d))}),Array.from(c)},[e]),o=ot(()=>{const c=new Set;return e.forEach(l=>{l.contexts.forEach(d=>c.add(d))}),Array.from(c)},[e]),a=ot(()=>{let c=e,l;return t!=""&&(l=new ve(e,{keys:["raw"],shouldSort:!0}),c=l.search(t).map(d=>d.item)),c.filter(d=>!(s.state==="active"&&d.completed||s.state==="completed"&&!d.completed||!mr(d.projects,s.projects)||!mr(d.contexts,s.contexts)))},[e,t,s]);return Ee(()=>{r(a,s)},[a,r,s]),console.log(s),h(yr,{children:[h(dt,{children:[h(ht,{children:"Filters"}),h(we,{active:s.state==="active",onClick:()=>{i(c=>({...c,state:c.state==="active"?void 0:"active"}))},children:["Active",h(Se,{children:e.filter(c=>!c.completed).length})]}),h(we,{active:s.state==="completed",onClick:()=>{i(c=>({...c,state:c.state==="completed"?void 0:"completed"}))},children:["Completed",h(Se,{children:e.filter(c=>c.completed).length})]}),h(we,{active:s.state==null,onClick:()=>{i(c=>{const l={...c};return l.state=void 0,l})},children:["All Tasks",h(Se,{children:e.length})]})]}),u.length>0&&h(dt,{children:[h(ht,{children:"Projects"}),u.map(c=>{var l;return h(we,{active:(l=s.projects)==null?void 0:l.includes(c),onClick:()=>{console.log("ayo???",c),i(d=>({...d,projects:gr(c,d.projects)}))},children:["+",c,h(Se,{children:e.filter(d=>d.projects.includes(c)).length})]},c)})]}),o.length>0&&h(dt,{children:[h(ht,{children:"Contexts"}),o.map(c=>{var l;return h(we,{active:(l=s.contexts)==null?void 0:l.includes(c),onClick:()=>{i(d=>(d.contexts=gr(c,d.contexts),d))},children:["@",c,h(Se,{children:e.filter(d=>d.contexts.includes(c)).length})]},c)})]})]})}),Go=us`
  * {
    box-sizing: border-box;
  }
`,Uo=({fileContents:e,onFileChanged:t,editingDisabled:r,isMobile:n,initialFilters:s,onFiltered:i})=>{const[u,o]=N(n||window.innerWidth>768),[a,c]=N(ls(e)),[l,d]=N(!1),[p,f]=N(null),[y,w]=N(""),[M,E]=N(a),A=nn(null);Ee(()=>{t(gs(a))},[t,a]);const C=()=>{window.innerWidth<=768&&o(!1)};Ee(()=>{if(n)return;const k=()=>{o(window.innerWidth>768)};return window.addEventListener("resize",k),()=>{window.removeEventListener("resize",k)}},[n]);const I=(k,g)=>{if(g!=null){const x=[...a];x[g]=k,c(x)}else{const x=[k,...a];c(x)}d(!1)},T=()=>{f(null),d(!1)},D=k=>{const g=[...a],x=a.findIndex(O=>O===M[k]);if(x!==-1){const O={...g[x]};O.completed=!O.completed,O.completed?O.completionDate=new Date:O.completionDate=void 0,O.raw=jt(O),g[x]=O,c(g)}},v=()=>{f(null),d(!0)},_=k=>{const g=a.findIndex(x=>x===M[k]);g!==-1&&(f(g),d(!0))},R=k=>{const g=a.findIndex(x=>x===M[k]);if(g!==-1){const x=[...a];x.splice(g,1),c(x)}},Y=k=>k?k.toISOString().split("T")[0]:"";return h(yr,{children:[h(Go,{}),h(ms,{children:[h(ks,{isOpen:u,children:h(ws,{children:h(Ko,{todos:a,onFiltered:(k,g)=>{E(k),i(g)},searchText:y,initialFilters:s,ref:A})})}),h(xs,{isOpen:u&&window.innerWidth<=768,onClick:C}),h(vs,{children:[h(_s,{children:[h(Os,{onClick:()=>{o(!u)},children:h(bs,{})}),h(ro,{value:y,onChange:w}),!r&&h($s,{onClick:v,children:h("span",{children:"+ Add Task"})})]}),h(Ss,{children:M.length===0?h(Rs,{children:[h(Ns,{children:"📝"}),h(Ps,{children:"No tasks match your current filters"}),h(tt,{onClick:()=>{var k;(k=A.current)==null||k.clearFilters(),w("")},children:"Clear filters"})]}):M.map((k,g)=>h(As,{completed:k.completed,children:[!r&&h(Cs,{type:"checkbox",checked:k.completed,onChange:()=>{D(g)}}),h(Es,{children:[h(Is,{completed:k.completed,children:k.description}),h(Ds,{children:[k.priority&&h(Ms,{priority:k.priority,children:["Priority ",k.priority]}),k.completionDate&&h(sr,{children:["Completed: ",Y(k.completionDate)]}),k.projects.map(x=>h(Fs,{children:["+",x]},x)),k.contexts.map(x=>h(Ts,{children:["@",x]},x)),Object.entries(k.metadata).map(([x,O])=>h(Bs,{children:[x,":",O]},x)),k.creationDate&&h(sr,{children:["Created: ",Y(k.creationDate)]})]})]}),!r&&h(Vs,{children:[h(cr,{onClick:()=>{_(g)},children:"✏️"}),h(cr,{onClick:()=>{R(g)},children:"🗑️"})]})]},g))})]})]}),l&&h(to,{onSave:I,onCancel:T,editContext:p!=null?{index:p,item:a[p]}:void 0})]})},Ho=()=>{var s;const[e,t]=N(V.text),[r,n]=N(((s=V.meta)==null?void 0:s.lastUsedFilters)??{});return Ee(()=>{V.text=e},[e]),Ee(()=>{V.meta={...V.meta??{},lastUsedFilters:r}},[r]),h(Uo,{fileContents:e,onFileChanged:t,editingDisabled:V.locked,isMobile:V.isRunningInMobileApplication,initialFilters:r,onFiltered:n})},Yo=sn(document.getElementById("root")),Jo=()=>{Yo.render(h(U.StrictMode,{children:h(Ho,{})}))};V.initialize({debounceSave:400});V.subscribe(()=>{Jo()});
