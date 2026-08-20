(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const au="185",P0=0,rd=1,L0=2,Jo=1,pm=2,la=3,Un=0,jt=1,Gt=2,Jt=0,_r=1,pn=2,ad=3,od=4,mm=5,Wn=100,I0=101,D0=102,N0=103,U0=104,ca=200,F0=201,O0=202,B0=203,sh=204,rh=205,ah=206,k0=207,oh=208,z0=209,V0=210,H0=211,G0=212,W0=213,X0=214,lh=0,ch=1,hh=2,Sr=3,uh=4,dh=5,fh=6,ph=7,gm=0,q0=1,K0=2,fi=0,ou=1,lu=2,cu=3,Sl=4,hu=5,uu=6,du=7,ld="attached",$0="detached",_m=300,Rs=301,yr=302,Fl=303,Ol=304,yl=306,Fn=1e3,hi=1001,ol=1002,zt=1003,xm=1004,ha=1005,Ct=1006,Qo=1007,Ui=1008,_n=1009,vm=1010,Mm=1011,ma=1012,fu=1013,gi=1014,In=1015,nn=1016,pu=1017,mu=1018,br=1020,Sm=35902,ym=35899,bm=1021,Em=1022,En=1023,ki=1026,is=1027,gu=1028,_u=1029,Cs=1030,xu=1031,vu=1033,jo=33776,el=33777,tl=33778,nl=33779,mh=35840,gh=35841,_h=35842,xh=35843,vh=36196,Mh=37492,Sh=37496,yh=37488,bh=37489,ll=37490,Eh=37491,Th=37808,wh=37809,Ah=37810,Rh=37811,Ch=37812,Ph=37813,Lh=37814,Ih=37815,Dh=37816,Nh=37817,Uh=37818,Fh=37819,Oh=37820,Bh=37821,kh=36492,zh=36494,Vh=36495,Hh=36283,Gh=36284,cl=36285,Wh=36286,ga=2300,_a=2301,Bl=2302,cd=2303,hd=2400,ud=2401,dd=2402,Y0=2500,Z0=0,Tm=1,Xh=2,J0=3200,hl=0,Q0=1,ts="",ft="srgb",wn="srgb-linear",ul="linear",rt="srgb",ks=7680,fd=519,j0=512,eg=513,tg=514,Mu=515,ng=516,ig=517,Su=518,sg=519,qh=35044,pd="300 es",ui=2e3,xa=2001;function rg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ag(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function va(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function og(){const s=va("canvas");return s.style.display="block",s}const md={};function dl(...s){const e="THREE."+s.shift();console.log(e,...s)}function wm(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Re(...s){s=wm(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Ue(...s){s=wm(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function xr(...s){const e=s.join(" ");e in md||(md[e]=!0,Re(...s))}function lg(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const cg={[lh]:ch,[hh]:fh,[uh]:ph,[Sr]:dh,[ch]:lh,[fh]:hh,[ph]:uh,[dh]:Sr};class Ds{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let gd=1234567;const da=Math.PI/180,Er=180/Math.PI;function qn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[s&255]+an[s>>8&255]+an[s>>16&255]+an[s>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function Ze(s,e,t){return Math.max(e,Math.min(t,s))}function yu(s,e){return(s%e+e)%e}function hg(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function ug(s,e,t){return s!==e?(t-s)/(e-s):0}function fa(s,e,t){return(1-t)*s+t*e}function dg(s,e,t,n){return fa(s,e,1-Math.exp(-t*n))}function fg(s,e=1){return e-Math.abs(yu(s,e*2)-e)}function pg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function mg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function gg(s,e){return s+Math.floor(Math.random()*(e-s+1))}function _g(s,e){return s+Math.random()*(e-s)}function xg(s){return s*(.5-Math.random())}function vg(s){s!==void 0&&(gd=s);let e=gd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Mg(s){return s*da}function Sg(s){return s*Er}function yg(s){return(s&s-1)===0&&s!==0}function bg(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Eg(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Tg(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*p,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*p,o*c);break;case"ZYZ":s.set(l*p,l*f,o*h,o*c);break;default:Re("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Xn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function at(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const bu={DEG2RAD:da,RAD2DEG:Er,generateUUID:qn,clamp:Ze,euclideanModulo:yu,mapLinear:hg,inverseLerp:ug,lerp:fa,damp:dg,pingpong:fg,smoothstep:pg,smootherstep:mg,randInt:gg,randFloat:_g,randFloatSpread:xg,seededRandom:vg,degToRad:Mg,radToDeg:Sg,isPowerOfTwo:yg,ceilPowerOfTwo:bg,floorPowerOfTwo:Eg,setQuaternionFromProperEuler:Tg,normalize:at,denormalize:Xn};class Me{static{Me.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class mt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[a+0],f=r[a+1],p=r[a+2],v=r[a+3];if(u!==v||l!==d||c!==f||h!==p){let g=l*d+c*f+h*p+u*v;g<0&&(d=-d,f=-f,p=-p,v=-v,g=-g);let m=1-o;if(g<.9995){const S=Math.acos(g),E=Math.sin(S);m=Math.sin(m*S)/E,o=Math.sin(o*S)/E,l=l*m+d*o,c=c*m+f*o,h=h*m+p*o,u=u*m+v*o}else{l=l*m+d*o,c=c*m+f*o,h=h*m+p*o,u=u*m+v*o;const S=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=S,c*=S,h*=S,u*=S}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-o*f,e[t+2]=c*p+h*f+o*d-l*u,e[t+3]=h*p-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),p=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Re("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{static{b.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_d.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_d.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return kl.copy(this).projectOnVector(e),this.sub(kl)}reflect(e){return this.sub(kl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const kl=new b,_d=new mt;class ke{static{ke.prototype.isMatrix3=!0}constructor(e,t,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],v=i[0],g=i[3],m=i[6],S=i[1],E=i[4],M=i[7],w=i[2],A=i[5],R=i[8];return r[0]=a*v+o*S+l*w,r[3]=a*g+o*E+l*A,r[6]=a*m+o*M+l*R,r[1]=c*v+h*S+u*w,r[4]=c*g+h*E+u*A,r[7]=c*m+h*M+u*R,r[2]=d*v+f*S+p*w,r[5]=d*g+f*E+p*A,r[8]=d*m+f*M+p*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=u*v,e[1]=(i*c-h*n)*v,e[2]=(o*n-i*a)*v,e[3]=d*v,e[4]=(h*t-i*l)*v,e[5]=(i*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return xr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(zl.makeScale(e,t)),this}rotate(e){return xr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(zl.makeRotation(-e)),this}translate(e,t){return xr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(zl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const zl=new ke,xd=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vd=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wg(){const s={enabled:!0,workingColorSpace:wn,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===rt&&(i.r=Bi(i.r),i.g=Bi(i.g),i.b=Bi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(i.r=vr(i.r),i.g=vr(i.g),i.b=vr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ts?ul:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return xr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return xr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[wn]:{primaries:e,whitePoint:n,transfer:ul,toXYZ:xd,fromXYZ:vd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ft},outputColorSpaceConfig:{drawingBufferColorSpace:ft}},[ft]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:xd,fromXYZ:vd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ft}}}),s}const Ke=wg();function Bi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function vr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let zs;class Ag{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{zs===void 0&&(zs=va("canvas")),zs.width=e.width,zs.height=e.height;const i=zs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=zs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=va("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Bi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Bi(t[n]/255)*255):t[n]=Bi(t[n]);return{data:t,width:e.width,height:e.height}}else return Re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Rg=0;class Eu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Rg++}),this.uuid=qn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Vl(i[a].image)):r.push(Vl(i[a]))}else r=Vl(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Vl(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Ag.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Re("Texture: Unable to serialize Texture."),{})}let Cg=0;const Hl=new b;class Xt extends Ds{constructor(e=Xt.DEFAULT_IMAGE,t=Xt.DEFAULT_MAPPING,n=hi,i=hi,r=Ct,a=Ui,o=En,l=_n,c=Xt.DEFAULT_ANISOTROPY,h=ts){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cg++}),this.uuid=qn(),this.name="",this.source=new Eu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Me(0,0),this.repeat=new Me(1,1),this.center=new Me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Hl).x}get height(){return this.source.getSize(Hl).y}get depth(){return this.source.getSize(Hl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Re(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_m)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fn:e.x=e.x-Math.floor(e.x);break;case hi:e.x=e.x<0?0:1;break;case ol:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fn:e.y=e.y-Math.floor(e.y);break;case hi:e.y=e.y<0?0:1;break;case ol:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=_m;Xt.DEFAULT_ANISOTROPY=1;class ct{static{ct.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,M=(f+1)/2,w=(m+1)/2,A=(h+d)/4,R=(u+v)/4,_=(p+g)/4;return E>M&&E>w?E<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(E),i=A/n,r=R/n):M>w?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=A/i,r=_/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=R/r,i=_/r),this.set(n,i,r,t),this}let S=Math.sqrt((g-p)*(g-p)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(g-p)/S,this.y=(u-v)/S,this.z=(d-h)/S,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Pg extends Ds{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},r=new Xt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Eu(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sn extends Pg{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Am extends Xt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=zt,this.minFilter=zt,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Lg extends Xt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=zt,this.minFilter=zt,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Se{static{Se.prototype.isMatrix4=!0}constructor(e,t,n,i,r,a,o,l,c,h,u,d,f,p,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,u,d,f,p,v,g)}set(e,t,n,i,r,a,o,l,c,h,u,d,f,p,v,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Se().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Vs.setFromMatrixColumn(e,0).length(),r=1/Vs.setFromMatrixColumn(e,1).length(),a=1/Vs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,p=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,p=c*h,v=c*u;t[0]=d+v*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,p=c*h,v=c*u;t[0]=d-v*o,t[4]=-a*u,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,p=o*h,v=o*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,p=o*l,v=o*c;t[0]=l*h,t[4]=v-d*u,t[8]=p*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-v*u}else if(e.order==="XZY"){const d=a*l,f=a*c,p=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=a*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ig,e,Dg)}lookAt(e,t,n){const i=this.elements;return vn.subVectors(e,t),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Wi.crossVectors(n,vn),Wi.lengthSq()===0&&(Math.abs(n.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Wi.crossVectors(n,vn)),Wi.normalize(),Ba.crossVectors(vn,Wi),i[0]=Wi.x,i[4]=Ba.x,i[8]=vn.x,i[1]=Wi.y,i[5]=Ba.y,i[9]=vn.y,i[2]=Wi.z,i[6]=Ba.z,i[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],S=n[3],E=n[7],M=n[11],w=n[15],A=i[0],R=i[4],_=i[8],T=i[12],P=i[1],L=i[5],I=i[9],B=i[13],q=i[2],O=i[6],X=i[10],k=i[14],J=i[3],Q=i[7],re=i[11],le=i[15];return r[0]=a*A+o*P+l*q+c*J,r[4]=a*R+o*L+l*O+c*Q,r[8]=a*_+o*I+l*X+c*re,r[12]=a*T+o*B+l*k+c*le,r[1]=h*A+u*P+d*q+f*J,r[5]=h*R+u*L+d*O+f*Q,r[9]=h*_+u*I+d*X+f*re,r[13]=h*T+u*B+d*k+f*le,r[2]=p*A+v*P+g*q+m*J,r[6]=p*R+v*L+g*O+m*Q,r[10]=p*_+v*I+g*X+m*re,r[14]=p*T+v*B+g*k+m*le,r[3]=S*A+E*P+M*q+w*J,r[7]=S*R+E*L+M*O+w*Q,r[11]=S*_+E*I+M*X+w*re,r[15]=S*T+E*B+M*k+w*le,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],v=e[7],g=e[11],m=e[15],S=l*f-c*d,E=o*f-c*u,M=o*d-l*u,w=a*f-c*h,A=a*d-l*h,R=a*u-o*h;return t*(v*S-g*E+m*M)-n*(p*S-g*w+m*A)+i*(p*E-v*w+m*R)-r*(p*M-v*A+g*R)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],v=e[13],g=e[14],m=e[15],S=t*o-n*a,E=t*l-i*a,M=t*c-r*a,w=n*l-i*o,A=n*c-r*o,R=i*c-r*l,_=h*v-u*p,T=h*g-d*p,P=h*m-f*p,L=u*g-d*v,I=u*m-f*v,B=d*m-f*g,q=S*B-E*I+M*L+w*P-A*T+R*_;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/q;return e[0]=(o*B-l*I+c*L)*O,e[1]=(i*I-n*B-r*L)*O,e[2]=(v*R-g*A+m*w)*O,e[3]=(d*A-u*R-f*w)*O,e[4]=(l*P-a*B-c*T)*O,e[5]=(t*B-i*P+r*T)*O,e[6]=(g*M-p*R-m*E)*O,e[7]=(h*R-d*M+f*E)*O,e[8]=(a*I-o*P+c*_)*O,e[9]=(n*P-t*I-r*_)*O,e[10]=(p*A-v*M+m*S)*O,e[11]=(u*M-h*A-f*S)*O,e[12]=(o*T-a*L-l*_)*O,e[13]=(t*L-n*T+i*_)*O,e[14]=(v*E-p*w-g*S)*O,e[15]=(h*w-u*E+d*S)*O,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,p=r*u,v=a*h,g=a*u,m=o*u,S=l*c,E=l*h,M=l*u,w=n.x,A=n.y,R=n.z;return i[0]=(1-(v+m))*w,i[1]=(f+M)*w,i[2]=(p-E)*w,i[3]=0,i[4]=(f-M)*A,i[5]=(1-(d+m))*A,i[6]=(g+S)*A,i[7]=0,i[8]=(p+E)*R,i[9]=(g-S)*R,i[10]=(1-(d+v))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Vs.set(i[0],i[1],i[2]).length();const o=Vs.set(i[4],i[5],i[6]).length(),l=Vs.set(i[8],i[9],i[10]).length();r<0&&(a=-a),On.copy(this);const c=1/a,h=1/o,u=1/l;return On.elements[0]*=c,On.elements[1]*=c,On.elements[2]*=c,On.elements[4]*=h,On.elements[5]*=h,On.elements[6]*=h,On.elements[8]*=u,On.elements[9]*=u,On.elements[10]*=u,t.setFromRotationMatrix(On),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,r,a,o=ui,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let p,v;if(l)p=r/(a-r),v=a*r/(a-r);else if(o===ui)p=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===xa)p=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=ui,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let p,v;if(l)p=1/(a-r),v=a/(a-r);else if(o===ui)p=-2/(a-r),v=-(a+r)/(a-r);else if(o===xa)p=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Vs=new b,On=new Se,Ig=new b(0,0,0),Dg=new b(1,1,1),Wi=new b,Ba=new b,vn=new b,Md=new Se,Sd=new mt;class $n{constructor(e=0,t=0,n=0,i=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Md.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Md,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Sd.setFromEuler(this),this.setFromQuaternion(Sd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";class Rm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ng=0;const yd=new b,Hs=new mt,vi=new Se,ka=new b,kr=new b,Ug=new b,Fg=new mt,bd=new b(1,0,0),Ed=new b(0,1,0),Td=new b(0,0,1),wd={type:"added"},Og={type:"removed"},Gs={type:"childadded",child:null},Gl={type:"childremoved",child:null};class Be extends Ds{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ng++}),this.uuid=qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Be.DEFAULT_UP.clone();const e=new b,t=new $n,n=new mt,i=new b(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Se},normalMatrix:{value:new ke}}),this.matrix=new Se,this.matrixWorld=new Se,this.matrixAutoUpdate=Be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hs.setFromAxisAngle(e,t),this.quaternion.multiply(Hs),this}rotateOnWorldAxis(e,t){return Hs.setFromAxisAngle(e,t),this.quaternion.premultiply(Hs),this}rotateX(e){return this.rotateOnAxis(bd,e)}rotateY(e){return this.rotateOnAxis(Ed,e)}rotateZ(e){return this.rotateOnAxis(Td,e)}translateOnAxis(e,t){return yd.copy(e).applyQuaternion(this.quaternion),this.position.add(yd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bd,e)}translateY(e){return this.translateOnAxis(Ed,e)}translateZ(e){return this.translateOnAxis(Td,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ka.copy(e):ka.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(kr,ka,this.up):vi.lookAt(ka,kr,this.up),this.quaternion.setFromRotationMatrix(vi),i&&(vi.extractRotation(i.matrixWorld),Hs.setFromRotationMatrix(vi),this.quaternion.premultiply(Hs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ue("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wd),Gs.child=e,this.dispatchEvent(Gs),Gs.child=null):Ue("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Og),Gl.child=e,this.dispatchEvent(Gl),Gl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wd),Gs.child=e,this.dispatchEvent(Gs),Gs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,e,Ug),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,Fg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Be.DEFAULT_UP=new b(0,1,0);Be.DEFAULT_MATRIX_AUTO_UPDATE=!0;Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class tn extends Be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Bg={type:"move"};class Wl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bg)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new tn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Cm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xi={h:0,s:0,l:0},za={h:0,s:0,l:0};function Xl(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class se{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ke.workingColorSpace){if(e=yu(e,1),t=Ze(t,0,1),n=Ze(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Xl(a,r,e+1/3),this.g=Xl(a,r,e),this.b=Xl(a,r,e-1/3)}return Ke.colorSpaceToWorking(this,i),this}setStyle(e,t=ft){function n(r){r!==void 0&&parseFloat(r)<1&&Re("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Re("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ft){const n=Cm[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=vr(e.r),this.g=vr(e.g),this.b=vr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ft){return Ke.workingToColorSpace(on.copy(this),e),Math.round(Ze(on.r*255,0,255))*65536+Math.round(Ze(on.g*255,0,255))*256+Math.round(Ze(on.b*255,0,255))}getHexString(e=ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(on.copy(this),t);const n=on.r,i=on.g,r=on.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=ft){Ke.workingToColorSpace(on.copy(this),e);const t=on.r,n=on.g,i=on.b;return e!==ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Xi),this.setHSL(Xi.h+e,Xi.s+t,Xi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Xi),e.getHSL(za);const n=fa(Xi.h,za.h,t),i=fa(Xi.s,za.s,t),r=fa(Xi.l,za.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new se;se.NAMES=Cm;class Tu extends Be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Bn=new b,Mi=new b,ql=new b,Si=new b,Ws=new b,Xs=new b,Ad=new b,Kl=new b,$l=new b,Yl=new b,Zl=new ct,Jl=new ct,Ql=new ct;class Ln{constructor(e=new b,t=new b,n=new b){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Bn.subVectors(e,t),i.cross(Bn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Bn.subVectors(i,t),Mi.subVectors(n,t),ql.subVectors(e,t);const a=Bn.dot(Bn),o=Bn.dot(Mi),l=Bn.dot(ql),c=Mi.dot(Mi),h=Mi.dot(ql),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,p=(a*h-o*l)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,Si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Si.x),l.addScaledVector(a,Si.y),l.addScaledVector(o,Si.z),l)}static getInterpolatedAttribute(e,t,n,i,r,a){return Zl.setScalar(0),Jl.setScalar(0),Ql.setScalar(0),Zl.fromBufferAttribute(e,t),Jl.fromBufferAttribute(e,n),Ql.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Zl,r.x),a.addScaledVector(Jl,r.y),a.addScaledVector(Ql,r.z),a}static isFrontFacing(e,t,n,i){return Bn.subVectors(n,t),Mi.subVectors(e,t),Bn.cross(Mi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bn.subVectors(this.c,this.b),Mi.subVectors(this.a,this.b),Bn.cross(Mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ln.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return Ln.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;Ws.subVectors(i,n),Xs.subVectors(r,n),Kl.subVectors(e,n);const l=Ws.dot(Kl),c=Xs.dot(Kl);if(l<=0&&c<=0)return t.copy(n);$l.subVectors(e,i);const h=Ws.dot($l),u=Xs.dot($l);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Ws,a);Yl.subVectors(e,r);const f=Ws.dot(Yl),p=Xs.dot(Yl);if(p>=0&&f<=p)return t.copy(r);const v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Xs,o);const g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return Ad.subVectors(r,i),o=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(Ad,o);const m=1/(g+v+d);return a=v*m,o=d*m,t.copy(n).addScaledVector(Ws,a).addScaledVector(Xs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class zi{constructor(e=new b(1/0,1/0,1/0),t=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,kn):kn.fromBufferAttribute(r,a),kn.applyMatrix4(e.matrixWorld),this.expandByPoint(kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Va.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Va.copy(n.boundingBox)),Va.applyMatrix4(e.matrixWorld),this.union(Va)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,kn),kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zr),Ha.subVectors(this.max,zr),qs.subVectors(e.a,zr),Ks.subVectors(e.b,zr),$s.subVectors(e.c,zr),qi.subVectors(Ks,qs),Ki.subVectors($s,Ks),hs.subVectors(qs,$s);let t=[0,-qi.z,qi.y,0,-Ki.z,Ki.y,0,-hs.z,hs.y,qi.z,0,-qi.x,Ki.z,0,-Ki.x,hs.z,0,-hs.x,-qi.y,qi.x,0,-Ki.y,Ki.x,0,-hs.y,hs.x,0];return!jl(t,qs,Ks,$s,Ha)||(t=[1,0,0,0,1,0,0,0,1],!jl(t,qs,Ks,$s,Ha))?!1:(Ga.crossVectors(qi,Ki),t=[Ga.x,Ga.y,Ga.z],jl(t,qs,Ks,$s,Ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const yi=[new b,new b,new b,new b,new b,new b,new b,new b],kn=new b,Va=new zi,qs=new b,Ks=new b,$s=new b,qi=new b,Ki=new b,hs=new b,zr=new b,Ha=new b,Ga=new b,us=new b;function jl(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){us.fromArray(s,r);const o=i.x*Math.abs(us.x)+i.y*Math.abs(us.y)+i.z*Math.abs(us.z),l=e.dot(us),c=t.dot(us),h=n.dot(us);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Ht=new b,Wa=new Me;let kg=0;class vt extends Ds{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qh,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Wa.fromBufferAttribute(this,t),Wa.applyMatrix3(e),this.setXY(t,Wa.x,Wa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix3(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xn(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xn(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xn(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qh&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Pm extends vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Lm extends vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Mt extends vt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const zg=new zi,Vr=new b,ec=new b;class xi{constructor(e=new b,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):zg.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vr.subVectors(e,this.center);const t=Vr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Vr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ec.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vr.copy(e.center).add(ec)),this.expandByPoint(Vr.copy(e.center).sub(ec))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Vg=0;const Rn=new Se,tc=new Be,Ys=new b,Mn=new zi,Hr=new zi,Yt=new b;class Ut extends Ds{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vg++}),this.uuid=qn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rg(e)?Lm:Pm)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Rn.makeRotationFromQuaternion(e),this.applyMatrix4(Rn),this}rotateX(e){return Rn.makeRotationX(e),this.applyMatrix4(Rn),this}rotateY(e){return Rn.makeRotationY(e),this.applyMatrix4(Rn),this}rotateZ(e){return Rn.makeRotationZ(e),this.applyMatrix4(Rn),this}translate(e,t,n){return Rn.makeTranslation(e,t,n),this.applyMatrix4(Rn),this}scale(e,t,n){return Rn.makeScale(e,t,n),this.applyMatrix4(Rn),this}lookAt(e){return tc.lookAt(e),tc.updateMatrix(),this.applyMatrix4(tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ys).negate(),this.translate(Ys.x,Ys.y,Ys.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Mt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Mn.setFromBufferAttribute(r),this.morphTargetsRelative?(Yt.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(Yt),Yt.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(Yt)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ue('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(e){const n=this.boundingSphere.center;if(Mn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Hr.setFromBufferAttribute(o),this.morphTargetsRelative?(Yt.addVectors(Mn.min,Hr.min),Mn.expandByPoint(Yt),Yt.addVectors(Mn.max,Hr.max),Mn.expandByPoint(Yt)):(Mn.expandByPoint(Hr.min),Mn.expandByPoint(Hr.max))}Mn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Yt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Yt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Yt.fromBufferAttribute(o,c),l&&(Ys.fromBufferAttribute(e,c),Yt.add(Ys)),i=Math.max(i,n.distanceToSquared(Yt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ue('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ue("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new vt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new b,l[_]=new b;const c=new b,h=new b,u=new b,d=new Me,f=new Me,p=new Me,v=new b,g=new b;function m(_,T,P){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,P),d.fromBufferAttribute(r,_),f.fromBufferAttribute(r,T),p.fromBufferAttribute(r,P),h.sub(c),u.sub(c),f.sub(d),p.sub(d);const L=1/(f.x*p.y-p.x*f.y);isFinite(L)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(L),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(L),o[_].add(v),o[T].add(v),o[P].add(v),l[_].add(g),l[T].add(g),l[P].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let _=0,T=S.length;_<T;++_){const P=S[_],L=P.start,I=P.count;for(let B=L,q=L+I;B<q;B+=3)m(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const E=new b,M=new b,w=new b,A=new b;function R(_){w.fromBufferAttribute(i,_),A.copy(w);const T=o[_];E.copy(T),E.sub(w.multiplyScalar(w.dot(T))).normalize(),M.crossVectors(A,T);const L=M.dot(l[_])<0?-1:1;a.setXYZW(_,E.x,E.y,E.z,L)}for(let _=0,T=S.length;_<T;++_){const P=S[_],L=P.start,I=P.count;for(let B=L,q=L+I;B<q;B+=3)R(e.getX(B+0)),R(e.getX(B+1)),R(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new b,r=new b,a=new b,o=new b,l=new b,c=new b,h=new b,u=new b;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Yt.fromBufferAttribute(e,t),Yt.normalize(),e.setXYZ(t,Yt.x,Yt.y,Yt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,p=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new vt(d,h,u)}if(this.index===null)return Re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ut,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Im{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=qh,this.updateRanges=[],this.version=0,this.uuid=qn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const un=new b;class Ma{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyMatrix4(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyNormalMatrix(e),this.setXYZ(t,un.x,un.y,un.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.transformDirection(e),this.setXYZ(t,un.x,un.y,un.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Xn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Xn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Xn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Xn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){dl("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ma(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){dl("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Hg=0;class Nn extends Ds{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hg++}),this.uuid=qn(),this.name="",this.type="Material",this.blending=_r,this.side=Un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sh,this.blendDst=rh,this.blendEquation=Wn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new se(0,0,0),this.blendAlpha=0,this.depthFunc=Sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ks,this.stencilZFail=ks,this.stencilZPass=ks,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Re(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_r&&(n.blending=this.blending),this.side!==Un&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==sh&&(n.blendSrc=this.blendSrc),this.blendDst!==rh&&(n.blendDst=this.blendDst),this.blendEquation!==Wn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Sr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ks&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ks&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ks&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new se().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Me().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Me().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Tr extends Nn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new se(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Zs;const Gr=new b,Js=new b,Qs=new b,js=new Me,Wr=new Me,Dm=new Se,Xa=new b,Xr=new b,qa=new b,Rd=new Me,nc=new Me,Cd=new Me;class Sa extends Be{constructor(e=new Tr){if(super(),this.isSprite=!0,this.type="Sprite",Zs===void 0){Zs=new Ut;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Im(t,5);Zs.setIndex([0,1,2,0,2,3]),Zs.setAttribute("position",new Ma(n,3,0,!1)),Zs.setAttribute("uv",new Ma(n,2,3,!1))}this.geometry=Zs,this.material=e,this.center=new Me(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ue('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Js.setFromMatrixScale(this.matrixWorld),Dm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Qs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Js.multiplyScalar(-Qs.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Ka(Xa.set(-.5,-.5,0),Qs,a,Js,i,r),Ka(Xr.set(.5,-.5,0),Qs,a,Js,i,r),Ka(qa.set(.5,.5,0),Qs,a,Js,i,r),Rd.set(0,0),nc.set(1,0),Cd.set(1,1);let o=e.ray.intersectTriangle(Xa,Xr,qa,!1,Gr);if(o===null&&(Ka(Xr.set(-.5,.5,0),Qs,a,Js,i,r),nc.set(0,1),o=e.ray.intersectTriangle(Xa,qa,Xr,!1,Gr),o===null))return;const l=e.ray.origin.distanceTo(Gr);l<e.near||l>e.far||t.push({distance:l,point:Gr.clone(),uv:Ln.getInterpolation(Gr,Xa,Xr,qa,Rd,nc,Cd,new Me),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ka(s,e,t,n,i,r){js.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Wr.x=r*js.x-i*js.y,Wr.y=i*js.x+r*js.y):Wr.copy(js),s.copy(e),s.x+=Wr.x,s.y+=Wr.y,s.applyMatrix4(Dm)}const bi=new b,ic=new b,$a=new b,$i=new b,sc=new b,Ya=new b,rc=new b;class bl{constructor(e=new b,t=new b(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bi.copy(this.origin).addScaledVector(this.direction,t),bi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ic.copy(e).add(t).multiplyScalar(.5),$a.copy(t).sub(e).normalize(),$i.copy(this.origin).sub(ic);const r=e.distanceTo(t)*.5,a=-this.direction.dot($a),o=$i.dot(this.direction),l=-$i.dot($a),c=$i.lengthSq(),h=Math.abs(1-a*a);let u,d,f,p;if(h>0)if(u=a*l-o,d=a*o-l,p=r*h,u>=0)if(d>=-p)if(d<=p){const v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ic).addScaledVector($a,d),f}intersectSphere(e,t){bi.subVectors(e.center,this.origin);const n=bi.dot(this.direction),i=bi.dot(bi)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,bi)!==null}intersectTriangle(e,t,n,i,r){sc.subVectors(t,e),Ya.subVectors(n,e),rc.crossVectors(sc,Ya);let a=this.direction.dot(rc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;$i.subVectors(this.origin,e);const l=o*this.direction.dot(Ya.crossVectors($i,Ya));if(l<0)return null;const c=o*this.direction.dot(sc.cross($i));if(c<0||l+c>a)return null;const h=-o*$i.dot(rc);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wt extends Nn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=gm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pd=new Se,ds=new bl,Za=new xi,Ld=new b,Ja=new b,Qa=new b,ja=new b,ac=new b,eo=new b,Id=new b,to=new b;class Te extends Be{constructor(e=new Ut,t=new Wt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){eo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(ac.fromBufferAttribute(u,e),a?eo.addScaledVector(ac,h):eo.addScaledVector(ac.sub(t),h))}t.add(eo)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Za.copy(n.boundingSphere),Za.applyMatrix4(r),ds.copy(e.ray).recast(e.near),!(Za.containsPoint(ds.origin)===!1&&(ds.intersectSphere(Za,Ld)===null||ds.origin.distanceToSquared(Ld)>(e.far-e.near)**2))&&(Pd.copy(r).invert(),ds.copy(e.ray).applyMatrix4(Pd),!(n.boundingBox!==null&&ds.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ds)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=a[g.materialIndex],S=Math.max(g.start,f.start),E=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let M=S,w=E;M<w;M+=3){const A=o.getX(M),R=o.getX(M+1),_=o.getX(M+2);i=no(this,m,e,n,c,h,u,A,R,_),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const S=o.getX(g),E=o.getX(g+1),M=o.getX(g+2);i=no(this,a,e,n,c,h,u,S,E,M),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=a[g.materialIndex],S=Math.max(g.start,f.start),E=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let M=S,w=E;M<w;M+=3){const A=M,R=M+1,_=M+2;i=no(this,m,e,n,c,h,u,A,R,_),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const S=g,E=g+1,M=g+2;i=no(this,a,e,n,c,h,u,S,E,M),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function Gg(s,e,t,n,i,r,a,o){let l;if(e.side===jt?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===Un,o),l===null)return null;to.copy(o),to.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(to);return c<t.near||c>t.far?null:{distance:c,point:to.clone(),object:s}}function no(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,Ja),s.getVertexPosition(l,Qa),s.getVertexPosition(c,ja);const h=Gg(s,e,t,n,Ja,Qa,ja,Id);if(h){const u=new b;Ln.getBarycoord(Id,Ja,Qa,ja,u),i&&(h.uv=Ln.getInterpolatedAttribute(i,o,l,c,u,new Me)),r&&(h.uv1=Ln.getInterpolatedAttribute(r,o,l,c,u,new Me)),a&&(h.normal=Ln.getInterpolatedAttribute(a,o,l,c,u,new b),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new b,materialIndex:0};Ln.getNormal(Ja,Qa,ja,d.normal),h.face=d,h.barycoord=u}return h}const qr=new ct,Dd=new ct,Nd=new ct,Wg=new ct,Ud=new Se,io=new b,oc=new xi,Fd=new Se,lc=new bl;class Xg extends Te{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ld,this.bindMatrix=new Se,this.bindMatrixInverse=new Se,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new zi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,io),this.boundingBox.expandByPoint(io)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new xi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,io),this.boundingSphere.expandByPoint(io)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),oc.copy(this.boundingSphere),oc.applyMatrix4(i),e.ray.intersectsSphere(oc)!==!1&&(Fd.copy(i).invert(),lc.copy(e.ray).applyMatrix4(Fd),!(this.boundingBox!==null&&lc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,lc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ct,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ld?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===$0?this.bindMatrixInverse.copy(this.bindMatrix).invert():Re("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Dd.fromBufferAttribute(i.attributes.skinIndex,e),Nd.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(qr.copy(t),t.set(0,0,0,0)):(qr.set(...t,1),t.set(0,0,0)),qr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const a=Nd.getComponent(r);if(a!==0){const o=Dd.getComponent(r);Ud.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Wg.copy(qr).applyMatrix4(Ud),a)}}return t.isVector4&&(t.w=qr.w),t.applyMatrix4(this.bindMatrixInverse)}}class Nm extends Be{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Ca extends Xt{constructor(e=null,t=1,n=1,i,r,a,o,l,c=zt,h=zt,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Od=new Se,qg=new Se;class wu{constructor(e=[],t=[]){this.uuid=qn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Re("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Se)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Se;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:qg;Od.multiplyMatrices(o,t[r]),Od.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new wu(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Ca(t,e,e,En,In);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(Re("Skeleton: No bone found with UUID:",r),a=new Nm),this.bones.push(a),this.boneInverses.push(new Se().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Kh extends vt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const er=new Se,Bd=new Se,so=[],kd=new zi,Kg=new Se,Kr=new Te,$r=new xi;class Au extends Te{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Kh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Kg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,er),kd.copy(e.boundingBox).applyMatrix4(er),this.boundingBox.union(kd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,er),$r.copy(e.boundingSphere).applyMatrix4(er),this.boundingSphere.union($r)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Kr.geometry=this.geometry,Kr.material=this.material,Kr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$r.copy(this.boundingSphere),$r.applyMatrix4(n),e.ray.intersectsSphere($r)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,er),Bd.multiplyMatrices(n,er),Kr.matrixWorld=Bd,Kr.raycast(e,so);for(let a=0,o=so.length;a<o;a++){const l=so[a];l.instanceId=r,l.object=this,t.push(l)}so.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Kh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ca(new Float32Array(i*this.count),i,this.count,gu,In));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const cc=new b,$g=new b,Yg=new ke;class Ss{constructor(e=new b(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=cc.subVectors(n,t).cross($g.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(cc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Yg.getNormalMatrix(e),i=this.coplanarPoint(cc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fs=new xi,Zg=new Me(.5,.5),ro=new b;class Ru{constructor(e=new Ss,t=new Ss,n=new Ss,i=new Ss,r=new Ss,a=new Ss){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ui,n=!1){const i=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],v=r[9],g=r[10],m=r[11],S=r[12],E=r[13],M=r[14],w=r[15];if(i[0].setComponents(c-a,f-h,m-p,w-S).normalize(),i[1].setComponents(c+a,f+h,m+p,w+S).normalize(),i[2].setComponents(c+o,f+u,m+v,w+E).normalize(),i[3].setComponents(c-o,f-u,m-v,w-E).normalize(),n)i[4].setComponents(l,d,g,M).normalize(),i[5].setComponents(c-l,f-d,m-g,w-M).normalize();else if(i[4].setComponents(c-l,f-d,m-g,w-M).normalize(),t===ui)i[5].setComponents(c+l,f+d,m+g,w+M).normalize();else if(t===xa)i[5].setComponents(l,d,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),fs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fs)}intersectsSprite(e){fs.center.set(0,0,0);const t=Zg.distanceTo(e.center);return fs.radius=.7071067811865476+t,fs.applyMatrix4(e.matrixWorld),this.intersectsSphere(fs)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(ro.x=i.normal.x>0?e.max.x:e.min.x,ro.y=i.normal.y>0?e.max.y:e.min.y,ro.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ro)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Cu extends Nn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const fl=new b,pl=new b,zd=new Se,Yr=new bl,ao=new xi,hc=new b,Vd=new b;class ya extends Be{constructor(e=new Ut,t=new Cu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)fl.fromBufferAttribute(t,i-1),pl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=fl.distanceTo(pl);e.setAttribute("lineDistance",new Mt(n,1))}else Re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ao.copy(n.boundingSphere),ao.applyMatrix4(i),ao.radius+=r,e.ray.intersectsSphere(ao)===!1)return;zd.copy(i).invert(),Yr.copy(e.ray).applyMatrix4(zd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let v=f,g=p-1;v<g;v+=c){const m=h.getX(v),S=h.getX(v+1),E=oo(this,e,Yr,l,m,S,v);E&&t.push(E)}if(this.isLineLoop){const v=h.getX(p-1),g=h.getX(f),m=oo(this,e,Yr,l,v,g,p-1);m&&t.push(m)}}else{const f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let v=f,g=p-1;v<g;v+=c){const m=oo(this,e,Yr,l,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=oo(this,e,Yr,l,p-1,f,p-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function oo(s,e,t,n,i,r,a){const o=s.geometry.attributes.position;if(fl.fromBufferAttribute(o,i),pl.fromBufferAttribute(o,r),t.distanceSqToSegment(fl,pl,hc,Vd)>n)return;hc.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(hc);if(!(c<e.near||c>e.far))return{distance:c,point:Vd.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const Hd=new b,Gd=new b;class Jg extends ya{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Hd.fromBufferAttribute(t,i),Gd.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Hd.distanceTo(Gd);e.setAttribute("lineDistance",new Mt(n,1))}else Re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qg extends ya{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Pu extends Nn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Wd=new Se,$h=new bl,lo=new xi,co=new b;class Lu extends Be{constructor(e=new Ut,t=new Pu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),lo.copy(n.boundingSphere),lo.applyMatrix4(i),lo.radius+=r,e.ray.intersectsSphere(lo)===!1)return;Wd.copy(i).invert(),$h.copy(e.ray).applyMatrix4(Wd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=d,v=f;p<v;p++){const g=c.getX(p);co.fromBufferAttribute(u,g),Xd(co,g,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let p=d,v=f;p<v;p++)co.fromBufferAttribute(u,p),Xd(co,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Xd(s,e,t,n,i,r,a){const o=$h.distanceSqToPoint(s);if(o<t){const l=new b;$h.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Um extends Xt{constructor(e=[],t=Rs,n,i,r,a,o,l,c,h){super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class gn extends Xt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ps extends Xt{constructor(e,t,n=gi,i,r,a,o=zt,l=zt,c,h=ki,u=1){if(h!==ki&&h!==is)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Eu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class jg extends Ps{constructor(e,t=gi,n=Rs,i,r,a=zt,o=zt,l,c=ki){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Fm extends Xt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class mn extends Ut{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Mt(c,3)),this.setAttribute("normal",new Mt(h,3)),this.setAttribute("uv",new Mt(u,2));function p(v,g,m,S,E,M,w,A,R,_,T){const P=M/R,L=w/_,I=M/2,B=w/2,q=A/2,O=R+1,X=_+1;let k=0,J=0;const Q=new b;for(let re=0;re<X;re++){const le=re*L-B;for(let ge=0;ge<O;ge++){const Je=ge*P-I;Q[v]=Je*S,Q[g]=le*E,Q[m]=q,c.push(Q.x,Q.y,Q.z),Q[v]=0,Q[g]=0,Q[m]=A>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(ge/R),u.push(1-re/_),k+=1}}for(let re=0;re<_;re++)for(let le=0;le<R;le++){const ge=d+le+O*re,Je=d+le+O*(re+1),ht=d+(le+1)+O*(re+1),Qe=d+(le+1)+O*re;l.push(ge,Je,Qe),l.push(Je,ht,Qe),J+=6}o.addGroup(f,J,T),f+=J,d+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Pr extends Ut{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let p=0;const v=[],g=n/2;let m=0;S(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Mt(u,3)),this.setAttribute("normal",new Mt(d,3)),this.setAttribute("uv",new Mt(f,2));function S(){const M=new b,w=new b;let A=0;const R=(t-e)/n;for(let _=0;_<=r;_++){const T=[],P=_/r,L=P*(t-e)+e;for(let I=0;I<=i;I++){const B=I/i,q=B*l+o,O=Math.sin(q),X=Math.cos(q);w.x=L*O,w.y=-P*n+g,w.z=L*X,u.push(w.x,w.y,w.z),M.set(O,R,X).normalize(),d.push(M.x,M.y,M.z),f.push(B,1-P),T.push(p++)}v.push(T)}for(let _=0;_<i;_++)for(let T=0;T<r;T++){const P=v[T][_],L=v[T+1][_],I=v[T+1][_+1],B=v[T][_+1];(e>0||T!==0)&&(h.push(P,L,B),A+=3),(t>0||T!==r-1)&&(h.push(L,I,B),A+=3)}c.addGroup(m,A,0),m+=A}function E(M){const w=p,A=new Me,R=new b;let _=0;const T=M===!0?e:t,P=M===!0?1:-1;for(let I=1;I<=i;I++)u.push(0,g*P,0),d.push(0,P,0),f.push(.5,.5),p++;const L=p;for(let I=0;I<=i;I++){const q=I/i*l+o,O=Math.cos(q),X=Math.sin(q);R.x=T*X,R.y=g*P,R.z=T*O,u.push(R.x,R.y,R.z),d.push(0,P,0),A.x=O*.5+.5,A.y=X*.5*P+.5,f.push(A.x,A.y),p++}for(let I=0;I<i;I++){const B=w+I,q=L+I;M===!0?h.push(q,q+1,B):h.push(q+1,q,B),_+=3}c.addGroup(m,_,M===!0?1:2),m+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Iu extends Pr{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Iu(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Du extends Ut{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new Mt(r,3)),this.setAttribute("normal",new Mt(r.slice(),3)),this.setAttribute("uv",new Mt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const E=new b,M=new b,w=new b;for(let A=0;A<t.length;A+=3)f(t[A+0],E),f(t[A+1],M),f(t[A+2],w),l(E,M,w,S)}function l(S,E,M,w){const A=w+1,R=[];for(let _=0;_<=A;_++){R[_]=[];const T=S.clone().lerp(M,_/A),P=E.clone().lerp(M,_/A),L=A-_;for(let I=0;I<=L;I++)I===0&&_===A?R[_][I]=T:R[_][I]=T.clone().lerp(P,I/L)}for(let _=0;_<A;_++)for(let T=0;T<2*(A-_)-1;T++){const P=Math.floor(T/2);T%2===0?(d(R[_][P+1]),d(R[_+1][P]),d(R[_][P])):(d(R[_][P+1]),d(R[_+1][P+1]),d(R[_+1][P]))}}function c(S){const E=new b;for(let M=0;M<r.length;M+=3)E.x=r[M+0],E.y=r[M+1],E.z=r[M+2],E.normalize().multiplyScalar(S),r[M+0]=E.x,r[M+1]=E.y,r[M+2]=E.z}function h(){const S=new b;for(let E=0;E<r.length;E+=3){S.x=r[E+0],S.y=r[E+1],S.z=r[E+2];const M=g(S)/2/Math.PI+.5,w=m(S)/Math.PI+.5;a.push(M,1-w)}p(),u()}function u(){for(let S=0;S<a.length;S+=6){const E=a[S+0],M=a[S+2],w=a[S+4],A=Math.max(E,M,w),R=Math.min(E,M,w);A>.9&&R<.1&&(E<.2&&(a[S+0]+=1),M<.2&&(a[S+2]+=1),w<.2&&(a[S+4]+=1))}}function d(S){r.push(S.x,S.y,S.z)}function f(S,E){const M=S*3;E.x=e[M+0],E.y=e[M+1],E.z=e[M+2]}function p(){const S=new b,E=new b,M=new b,w=new b,A=new Me,R=new Me,_=new Me;for(let T=0,P=0;T<r.length;T+=9,P+=6){S.set(r[T+0],r[T+1],r[T+2]),E.set(r[T+3],r[T+4],r[T+5]),M.set(r[T+6],r[T+7],r[T+8]),A.set(a[P+0],a[P+1]),R.set(a[P+2],a[P+3]),_.set(a[P+4],a[P+5]),w.copy(S).add(E).add(M).divideScalar(3);const L=g(w);v(A,P+0,S,L),v(R,P+2,E,L),v(_,P+4,M,L)}}function v(S,E,M,w){w<0&&S.x===1&&(a[E]=S.x-1),M.x===0&&M.z===0&&(a[E]=w/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function m(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Du(e.vertices,e.indices,e.radius,e.detail)}}class Nu extends Du{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Nu(e.radius,e.detail)}}class _i extends Ut{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const S=m*d-a;for(let E=0;E<c;E++){const M=E*u-r;p.push(M,-S,0),v.push(0,0,1),g.push(E/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<o;S++){const E=S+c*m,M=S+c*(m+1),w=S+1+c*(m+1),A=S+1+c*m;f.push(E,M,A),f.push(M,w,A)}this.setIndex(f),this.setAttribute("position",new Mt(p,3)),this.setAttribute("normal",new Mt(v,3)),this.setAttribute("uv",new Mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _i(e.width,e.height,e.widthSegments,e.heightSegments)}}class Kn extends Ut{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new b,d=new b,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const S=[],E=m/n,M=a+E*o,w=e*Math.cos(M),A=Math.sqrt(e*e-w*w);let R=0;m===0&&a===0?R=.5/t:m===n&&l===Math.PI&&(R=-.5/t);for(let _=0;_<=t;_++){const T=_/t,P=i+T*r;u.x=-A*Math.cos(P),u.y=w,u.z=A*Math.sin(P),p.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(T+R,1-E),S.push(c++)}h.push(S)}for(let m=0;m<n;m++)for(let S=0;S<t;S++){const E=h[m][S+1],M=h[m][S],w=h[m+1][S],A=h[m+1][S+1];(m!==0||a>0)&&f.push(E,M,A),(m!==n-1||l<Math.PI)&&f.push(M,w,A)}this.setIndex(f),this.setAttribute("position",new Mt(p,3)),this.setAttribute("normal",new Mt(v,3)),this.setAttribute("uv",new Mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ba extends Ut{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],h=[],u=[],d=new b,f=new b,p=new b;for(let v=0;v<=n;v++){const g=a+v/n*o;for(let m=0;m<=i;m++){const S=m/i*r;f.x=(e+t*Math.cos(g))*Math.cos(S),f.y=(e+t*Math.cos(g))*Math.sin(S),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),d.x=e*Math.cos(S),d.y=e*Math.sin(S),p.subVectors(f,d).normalize(),h.push(p.x,p.y,p.z),u.push(m/i),u.push(v/n)}}for(let v=1;v<=n;v++)for(let g=1;g<=i;g++){const m=(i+1)*v+g-1,S=(i+1)*(v-1)+g-1,E=(i+1)*(v-1)+g,M=(i+1)*v+g;l.push(m,S,M),l.push(S,E,M)}this.setIndex(l),this.setAttribute("position",new Mt(c,3)),this.setAttribute("normal",new Mt(h,3)),this.setAttribute("uv",new Mt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ba(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function wr(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];if(qd(i))i.isRenderTargetTexture?(Re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(qd(i[0])){const r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function dn(s){const e={};for(let t=0;t<s.length;t++){const n=wr(s[t]);for(const i in n)e[i]=n[i]}return e}function qd(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function e_(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Om(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const oi={clone:wr,merge:dn};var t_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,n_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wt extends Nn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=t_,this.fragmentShader=n_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wr(e.uniforms),this.uniformsGroups=e_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new se().setHex(i.value);break;case"v2":this.uniforms[n].value=new Me().fromArray(i.value);break;case"v3":this.uniforms[n].value=new b().fromArray(i.value);break;case"v4":this.uniforms[n].value=new ct().fromArray(i.value);break;case"m3":this.uniforms[n].value=new ke().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Se().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Bm extends wt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class je extends Nn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hl,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Yn extends je{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Me(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new se(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new se(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new se(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class i_ extends Nn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hl,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class s_ extends Nn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=J0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class r_ extends Nn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function ho(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function a_(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Kd(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function o_(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class Lr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class l_ extends Lr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:hd,endingEnd:hd}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case ud:r=e,o=2*t-n;break;case dd:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ud:a=e,l=2*n-t;break;case dd:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),v=p*p,g=v*p,m=-d*g+2*d*v-d*p,S=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*p+1,E=(-1-f)*g+(1.5+f)*v+.5*p,M=f*g-f*v;for(let w=0;w!==o;++w)r[w]=m*a[h+w]+S*a[c+w]+E*a[l+w]+M*a[u+w];return r}}class c_ extends Lr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}}class h_ extends Lr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class u_ extends Lr{interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){const p=(n-t)/(i-t),v=1-p;for(let g=0;g!==o;++g)r[g]=a[c+g]*v+a[l+g]*p;return r}const d=o*2,f=e-1;for(let p=0;p!==o;++p){const v=a[c+p],g=a[l+p],m=f*d+p*2,S=u[m],E=u[m+1],M=e*d+p*2,w=h[M],A=h[M+1];let R=(n-t)/(i-t),_,T,P,L,I;for(let B=0;B<8;B++){_=R*R,T=_*R,P=1-R,L=P*P,I=L*P;const O=I*t+3*L*R*S+3*P*_*w+T*i-n;if(Math.abs(O)<1e-10)break;const X=3*L*(S-t)+6*P*R*(w-S)+3*_*(i-w);if(Math.abs(X)<1e-10)break;R=R-O/X,R=Math.max(0,Math.min(1,R))}r[p]=I*v+3*L*R*E+3*P*_*A+T*g}return r}}class Zn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ho(t,this.TimeBufferType),this.values=ho(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ho(e.times,Array),values:ho(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new h_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new c_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new l_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new u_(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ga:t=this.InterpolantFactoryMethodDiscrete;break;case _a:t=this.InterpolantFactoryMethodLinear;break;case Bl:t=this.InterpolantFactoryMethodSmooth;break;case cd:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Re("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ga;case this.InterpolantFactoryMethodLinear:return _a;case this.InterpolantFactoryMethodSmooth:return Bl;case this.InterpolantFactoryMethodBezier:return cd}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Ue("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(Ue("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){Ue("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ue("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&ag(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){Ue("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Bl,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){const v=t[u+p];if(v!==t[d+p]||v!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Zn.prototype.ValueTypeName="";Zn.prototype.TimeBufferType=Float32Array;Zn.prototype.ValueBufferType=Float32Array;Zn.prototype.DefaultInterpolation=_a;class Ir extends Zn{constructor(e,t,n){super(e,t,n)}}Ir.prototype.ValueTypeName="bool";Ir.prototype.ValueBufferType=Array;Ir.prototype.DefaultInterpolation=ga;Ir.prototype.InterpolantFactoryMethodLinear=void 0;Ir.prototype.InterpolantFactoryMethodSmooth=void 0;class km extends Zn{constructor(e,t,n,i){super(e,t,n,i)}}km.prototype.ValueTypeName="color";class Ea extends Zn{constructor(e,t,n,i){super(e,t,n,i)}}Ea.prototype.ValueTypeName="number";class d_ extends Lr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)mt.slerpFlat(r,0,a,c-o,a,c,l);return r}}class Ta extends Zn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new d_(this.times,this.values,this.getValueSize(),e)}}Ta.prototype.ValueTypeName="quaternion";Ta.prototype.InterpolantFactoryMethodSmooth=void 0;class Dr extends Zn{constructor(e,t,n){super(e,t,n)}}Dr.prototype.ValueTypeName="string";Dr.prototype.ValueBufferType=Array;Dr.prototype.DefaultInterpolation=ga;Dr.prototype.InterpolantFactoryMethodLinear=void 0;Dr.prototype.InterpolantFactoryMethodSmooth=void 0;class ml extends Zn{constructor(e,t,n,i){super(e,t,n,i)}}ml.prototype.ValueTypeName="vector";class f_{constructor(e="",t=-1,n=[],i=Y0){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=qn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(m_(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(Zn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=a_(l);l=Kd(l,1,h),c=Kd(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Ea(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function p_(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ea;case"vector":case"vector2":case"vector3":case"vector4":return ml;case"color":return km;case"quaternion":return Ta;case"bool":case"boolean":return Ir;case"string":return Dr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function m_(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=p_(s.type);if(s.times===void 0){const t=[],n=[];o_(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Fi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&($d(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!$d(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function $d(s){try{const e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class g_{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const __=new g_;class Nr{constructor(e){this.manager=e!==void 0?e:__,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Nr.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ei={};class x_ extends Error{constructor(e,t){super(e),this.response=t}}class zm extends Nr{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Fi.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Ei[e]!==void 0){Ei[e].push({onLoad:t,onProgress:n,onError:i});return}Ei[e]=[],Ei[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Re("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Ei[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let v=0;const g=new ReadableStream({start(m){S();function S(){u.read().then(({done:E,value:M})=>{if(E)m.close();else{v+=M.byteLength;const w=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:f});for(let A=0,R=h.length;A<R;A++){const _=h[A];_.onProgress&&_.onProgress(w)}m.enqueue(M),S()}},E=>{m.error(E)})}}});return new Response(g)}else throw new x_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Fi.add(`file:${e}`,c);const h=Ei[e];delete Ei[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Ei[e];if(h===void 0)throw this.manager.itemError(e),c;delete Ei[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const tr=new WeakMap;class v_ extends Nr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Fi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=tr.get(a);u===void 0&&(u=[],tr.set(a,u)),u.push({onLoad:t,onError:i})}return a}const o=va("img");function l(){h(),t&&t(this);const u=tr.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}tr.delete(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),Fi.remove(`image:${e}`);const d=tr.get(this)||[];for(let f=0;f<d.length;f++){const p=d[f];p.onError&&p.onError(u)}tr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Fi.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class M_ extends Nr{constructor(e){super(e)}load(e,t,n,i){const r=new Xt,a=new v_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class El extends Be{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new se(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class S_ extends El{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new se(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const uc=new Se,Yd=new b,Zd=new b;class Uu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Me(512,512),this.mapType=_n,this.map=null,this.mapPass=null,this.matrix=new Se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ru,this._frameExtents=new Me(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Yd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yd),Zd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zd),t.updateMatrixWorld(),uc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===xa||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(uc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const uo=new b,fo=new mt,ei=new b;class Vm extends Be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Se,this.projectionMatrix=new Se,this.projectionMatrixInverse=new Se,this.coordinateSystem=ui,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(uo,fo,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(uo,fo,ei.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(uo,fo,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(uo,fo,ei.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Yi=new b,Jd=new Me,Qd=new Me;class en extends Vm{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Er*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(da*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Er*2*Math.atan(Math.tan(da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z),Yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z)}getViewSize(e,t){return this.getViewBounds(e,Jd,Qd),t.subVectors(Qd,Jd)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(da*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class y_ extends Uu{constructor(){super(new en(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Er*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class b_ extends El{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.target=new Be,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new y_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class E_ extends Uu{constructor(){super(new en(90,1,.5,500)),this.isPointLightShadow=!0}}class Ns extends El{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new E_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Pa extends Vm{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class T_ extends Uu{constructor(){super(new Pa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hm extends El{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.target=new Be,this.shadow=new T_}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class pa{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const dc=new WeakMap;class w_ extends Nr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Re("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Re("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Fi.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{dc.has(a)===!0?(i&&i(dc.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){Fi.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e)}).catch(function(c){i&&i(c),dc.set(l,c),Fi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Fi.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const nr=-90,ir=1;class Gm extends Be{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new en(nr,ir,e,t);i.layers=this.layers,this.add(i);const r=new en(nr,ir,e,t);r.layers=this.layers,this.add(r);const a=new en(nr,ir,e,t);a.layers=this.layers,this.add(a);const o=new en(nr,ir,e,t);o.layers=this.layers,this.add(o);const l=new en(nr,ir,e,t);l.layers=this.layers,this.add(l);const c=new en(nr,ir,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===ui)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===xa)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class A_ extends en{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class R_{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=C_.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function C_(){this._document.hidden===!1&&this.reset()}const Fu="\\[\\]\\.:\\/",P_=new RegExp("["+Fu+"]","g"),Ou="[^"+Fu+"]",L_="[^"+Fu.replace("\\.","")+"]",I_=/((?:WC+[\/:])*)/.source.replace("WC",Ou),D_=/(WCOD+)?/.source.replace("WCOD",L_),N_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ou),U_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ou),F_=new RegExp("^"+I_+D_+N_+U_+"$"),O_=["material","materials","bones","map"];class B_{constructor(e,t,n){const i=n||ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ot{constructor(e,t,n){this.path=t,this.parsedPath=n||ot.parseTrackName(t),this.node=ot.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ot.Composite(e,t,n):new ot(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(P_,"")}static parseTrackName(e){const t=F_.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);O_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=ot.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Re("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ue("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ue("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ue("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ue("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ue("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;Ue("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ot.Composite=B_;ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ot.prototype.GetterByBindingType=[ot.prototype._getValue_direct,ot.prototype._getValue_array,ot.prototype._getValue_arrayElement,ot.prototype._getValue_toArray];ot.prototype.SetterByBindingTypeAndVersioning=[[ot.prototype._setValue_direct,ot.prototype._setValue_direct_setNeedsUpdate,ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_array,ot.prototype._setValue_array_setNeedsUpdate,ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_arrayElement,ot.prototype._setValue_arrayElement_setNeedsUpdate,ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_fromArray,ot.prototype._setValue_fromArray_setNeedsUpdate,ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class gl{constructor(e){this.value=e}clone(){return new gl(this.value.clone===void 0?this.value:this.value.clone())}}class Wm{static{Wm.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}}function jd(s,e,t,n){const i=k_(n);switch(t){case bm:return s*e;case gu:return s*e/i.components*i.byteLength;case _u:return s*e/i.components*i.byteLength;case Cs:return s*e*2/i.components*i.byteLength;case xu:return s*e*2/i.components*i.byteLength;case Em:return s*e*3/i.components*i.byteLength;case En:return s*e*4/i.components*i.byteLength;case vu:return s*e*4/i.components*i.byteLength;case jo:case el:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case tl:case nl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case gh:case xh:return Math.max(s,16)*Math.max(e,8)/4;case mh:case _h:return Math.max(s,8)*Math.max(e,8)/2;case vh:case Mh:case yh:case bh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Sh:case ll:case Eh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Th:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case wh:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Ah:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Rh:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Ch:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Ph:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Lh:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Ih:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Dh:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Nh:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Uh:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Fh:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Oh:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Bh:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case kh:case zh:case Vh:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Hh:case Gh:return Math.ceil(s/4)*Math.ceil(e/4)*8;case cl:case Wh:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function k_(s){switch(s){case _n:case vm:return{byteLength:1,components:1};case ma:case Mm:case nn:return{byteLength:2,components:1};case pu:case mu:return{byteLength:2,components:4};case gi:case fu:case In:return{byteLength:4,components:1};case Sm:case ym:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:au}}));typeof window<"u"&&(window.__THREE__?Re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=au);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Xm(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function z_(s){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],v=u[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const v=u[f];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var V_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,H_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,G_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,W_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,X_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,q_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,K_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,$_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Y_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Z_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,J_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Q_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,j_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ex=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,tx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,nx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ix=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ax=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ox=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,lx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,cx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,hx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ux=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,dx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,fx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,px=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_x="gl_FragColor = linearToOutputTexel( gl_FragColor );",xx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Mx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Sx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,yx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ex=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ax=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Cx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Px=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ix=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Dx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Nx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ux=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ox=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,kx=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Vx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Hx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gx=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Wx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$x=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Jx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ev=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,sv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,av=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ov=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,hv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,uv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,_v=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Ev=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Tv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,wv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Av=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Lv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Iv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Nv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Uv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Fv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ov=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Vv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$v=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Yv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Zv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Jv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Qv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,eM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,nM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,aM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,lM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,cM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,dM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_M=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,MM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:V_,alphahash_pars_fragment:H_,alphamap_fragment:G_,alphamap_pars_fragment:W_,alphatest_fragment:X_,alphatest_pars_fragment:q_,aomap_fragment:K_,aomap_pars_fragment:$_,batching_pars_vertex:Y_,batching_vertex:Z_,begin_vertex:J_,beginnormal_vertex:Q_,bsdfs:j_,iridescence_fragment:ex,bumpmap_pars_fragment:tx,clipping_planes_fragment:nx,clipping_planes_pars_fragment:ix,clipping_planes_pars_vertex:sx,clipping_planes_vertex:rx,color_fragment:ax,color_pars_fragment:ox,color_pars_vertex:lx,color_vertex:cx,common:hx,cube_uv_reflection_fragment:ux,defaultnormal_vertex:dx,displacementmap_pars_vertex:fx,displacementmap_vertex:px,emissivemap_fragment:mx,emissivemap_pars_fragment:gx,colorspace_fragment:_x,colorspace_pars_fragment:xx,envmap_fragment:vx,envmap_common_pars_fragment:Mx,envmap_pars_fragment:Sx,envmap_pars_vertex:yx,envmap_physical_pars_fragment:Dx,envmap_vertex:bx,fog_vertex:Ex,fog_pars_vertex:Tx,fog_fragment:wx,fog_pars_fragment:Ax,gradientmap_pars_fragment:Rx,lightmap_pars_fragment:Cx,lights_lambert_fragment:Px,lights_lambert_pars_fragment:Lx,lights_pars_begin:Ix,lights_toon_fragment:Nx,lights_toon_pars_fragment:Ux,lights_phong_fragment:Fx,lights_phong_pars_fragment:Ox,lights_physical_fragment:Bx,lights_physical_pars_fragment:kx,lights_fragment_begin:zx,lights_fragment_maps:Vx,lights_fragment_end:Hx,lightprobes_pars_fragment:Gx,logdepthbuf_fragment:Wx,logdepthbuf_pars_fragment:Xx,logdepthbuf_pars_vertex:qx,logdepthbuf_vertex:Kx,map_fragment:$x,map_pars_fragment:Yx,map_particle_fragment:Zx,map_particle_pars_fragment:Jx,metalnessmap_fragment:Qx,metalnessmap_pars_fragment:jx,morphinstance_vertex:ev,morphcolor_vertex:tv,morphnormal_vertex:nv,morphtarget_pars_vertex:iv,morphtarget_vertex:sv,normal_fragment_begin:rv,normal_fragment_maps:av,normal_pars_fragment:ov,normal_pars_vertex:lv,normal_vertex:cv,normalmap_pars_fragment:hv,clearcoat_normal_fragment_begin:uv,clearcoat_normal_fragment_maps:dv,clearcoat_pars_fragment:fv,iridescence_pars_fragment:pv,opaque_fragment:mv,packing:gv,premultiplied_alpha_fragment:_v,project_vertex:xv,dithering_fragment:vv,dithering_pars_fragment:Mv,roughnessmap_fragment:Sv,roughnessmap_pars_fragment:yv,shadowmap_pars_fragment:bv,shadowmap_pars_vertex:Ev,shadowmap_vertex:Tv,shadowmask_pars_fragment:wv,skinbase_vertex:Av,skinning_pars_vertex:Rv,skinning_vertex:Cv,skinnormal_vertex:Pv,specularmap_fragment:Lv,specularmap_pars_fragment:Iv,tonemapping_fragment:Dv,tonemapping_pars_fragment:Nv,transmission_fragment:Uv,transmission_pars_fragment:Fv,uv_pars_fragment:Ov,uv_pars_vertex:Bv,uv_vertex:kv,worldpos_vertex:zv,background_vert:Vv,background_frag:Hv,backgroundCube_vert:Gv,backgroundCube_frag:Wv,cube_vert:Xv,cube_frag:qv,depth_vert:Kv,depth_frag:$v,distance_vert:Yv,distance_frag:Zv,equirect_vert:Jv,equirect_frag:Qv,linedashed_vert:jv,linedashed_frag:eM,meshbasic_vert:tM,meshbasic_frag:nM,meshlambert_vert:iM,meshlambert_frag:sM,meshmatcap_vert:rM,meshmatcap_frag:aM,meshnormal_vert:oM,meshnormal_frag:lM,meshphong_vert:cM,meshphong_frag:hM,meshphysical_vert:uM,meshphysical_frag:dM,meshtoon_vert:fM,meshtoon_frag:pM,points_vert:mM,points_frag:gM,shadow_vert:_M,shadow_frag:xM,sprite_vert:vM,sprite_frag:MM},de={common:{diffuse:{value:new se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new b},probesMax:{value:new b},probesResolution:{value:new b}},points:{diffuse:{value:new se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new se(16777215)},opacity:{value:1},center:{value:new Me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},ai={basic:{uniforms:dn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:dn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new se(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:dn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new se(0)},specular:{value:new se(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:dn([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:dn([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new se(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:dn([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:dn([de.points,de.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:dn([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:dn([de.common,de.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:dn([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:dn([de.sprite,de.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:dn([de.common,de.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:dn([de.lights,de.fog,{color:{value:new se(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};ai.physical={uniforms:dn([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new se(0)},specularColor:{value:new se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const po={r:0,b:0,g:0},SM=new Se,qm=new ke;qm.set(-1,0,0,0,1,0,0,0,1);function yM(s,e,t,n,i,r){const a=new se(0);let o=i===!0?0:1,l,c,h=null,u=0,d=null;function f(S){let E=S.isScene===!0?S.background:null;if(E&&E.isTexture){const M=S.backgroundBlurriness>0;E=e.get(E,M)}return E}function p(S){let E=!1;const M=f(S);M===null?g(a,o):M&&M.isColor&&(g(M,1),E=!0);const w=s.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function v(S,E){const M=f(E);M&&(M.isCubeTexture||M.mapping===yl)?(c===void 0&&(c=new Te(new mn(1,1,1),new wt({name:"BackgroundCubeMaterial",uniforms:wr(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(SM.makeRotationFromEuler(E.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(qm),c.material.toneMapped=Ke.getTransfer(M.colorSpace)!==rt,(h!==M||u!==M.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,d=s.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Te(new _i(2,2),new wt({name:"BackgroundMaterial",uniforms:wr(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(M.colorSpace)!==rt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,d=s.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function g(S,E){S.getRGB(po,Om(s)),t.buffers.color.setClear(po.r,po.g,po.b,E,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,E=1){a.set(S),o=E,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,g(a,o)},render:p,addToRenderList:v,dispose:m}}function bM(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(L,I,B,q,O){let X=!1;const k=u(L,q,B,I);r!==k&&(r=k,c(r.object)),X=f(L,q,B,O),X&&p(L,q,B,O),O!==null&&e.update(O,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,M(L,I,B,q),O!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return s.createVertexArray()}function c(L){return s.bindVertexArray(L)}function h(L){return s.deleteVertexArray(L)}function u(L,I,B,q){const O=q.wireframe===!0;let X=n[I.id];X===void 0&&(X={},n[I.id]=X);const k=L.isInstancedMesh===!0?L.id:0;let J=X[k];J===void 0&&(J={},X[k]=J);let Q=J[B.id];Q===void 0&&(Q={},J[B.id]=Q);let re=Q[O];return re===void 0&&(re=d(l()),Q[O]=re),re}function d(L){const I=[],B=[],q=[];for(let O=0;O<t;O++)I[O]=0,B[O]=0,q[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:q,object:L,attributes:{},index:null}}function f(L,I,B,q){const O=r.attributes,X=I.attributes;let k=0;const J=B.getAttributes();for(const Q in J)if(J[Q].location>=0){const le=O[Q];let ge=X[Q];if(ge===void 0&&(Q==="instanceMatrix"&&L.instanceMatrix&&(ge=L.instanceMatrix),Q==="instanceColor"&&L.instanceColor&&(ge=L.instanceColor)),le===void 0||le.attribute!==ge||ge&&le.data!==ge.data)return!0;k++}return r.attributesNum!==k||r.index!==q}function p(L,I,B,q){const O={},X=I.attributes;let k=0;const J=B.getAttributes();for(const Q in J)if(J[Q].location>=0){let le=X[Q];le===void 0&&(Q==="instanceMatrix"&&L.instanceMatrix&&(le=L.instanceMatrix),Q==="instanceColor"&&L.instanceColor&&(le=L.instanceColor));const ge={};ge.attribute=le,le&&le.data&&(ge.data=le.data),O[Q]=ge,k++}r.attributes=O,r.attributesNum=k,r.index=q}function v(){const L=r.newAttributes;for(let I=0,B=L.length;I<B;I++)L[I]=0}function g(L){m(L,0)}function m(L,I){const B=r.newAttributes,q=r.enabledAttributes,O=r.attributeDivisors;B[L]=1,q[L]===0&&(s.enableVertexAttribArray(L),q[L]=1),O[L]!==I&&(s.vertexAttribDivisor(L,I),O[L]=I)}function S(){const L=r.newAttributes,I=r.enabledAttributes;for(let B=0,q=I.length;B<q;B++)I[B]!==L[B]&&(s.disableVertexAttribArray(B),I[B]=0)}function E(L,I,B,q,O,X,k){k===!0?s.vertexAttribIPointer(L,I,B,O,X):s.vertexAttribPointer(L,I,B,q,O,X)}function M(L,I,B,q){v();const O=q.attributes,X=B.getAttributes(),k=I.defaultAttributeValues;for(const J in X){const Q=X[J];if(Q.location>=0){let re=O[J];if(re===void 0&&(J==="instanceMatrix"&&L.instanceMatrix&&(re=L.instanceMatrix),J==="instanceColor"&&L.instanceColor&&(re=L.instanceColor)),re!==void 0){const le=re.normalized,ge=re.itemSize,Je=e.get(re);if(Je===void 0)continue;const ht=Je.buffer,Qe=Je.type,$=Je.bytesPerElement,ne=Qe===s.INT||Qe===s.UNSIGNED_INT||re.gpuType===fu;if(re.isInterleavedBufferAttribute){const ee=re.data,Ie=ee.stride,Ne=re.offset;if(ee.isInstancedInterleavedBuffer){for(let De=0;De<Q.locationSize;De++)m(Q.location+De,ee.meshPerAttribute);L.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let De=0;De<Q.locationSize;De++)g(Q.location+De);s.bindBuffer(s.ARRAY_BUFFER,ht);for(let De=0;De<Q.locationSize;De++)E(Q.location+De,ge/Q.locationSize,Qe,le,Ie*$,(Ne+ge/Q.locationSize*De)*$,ne)}else{if(re.isInstancedBufferAttribute){for(let ee=0;ee<Q.locationSize;ee++)m(Q.location+ee,re.meshPerAttribute);L.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ee=0;ee<Q.locationSize;ee++)g(Q.location+ee);s.bindBuffer(s.ARRAY_BUFFER,ht);for(let ee=0;ee<Q.locationSize;ee++)E(Q.location+ee,ge/Q.locationSize,Qe,le,ge*$,ge/Q.locationSize*ee*$,ne)}}else if(k!==void 0){const le=k[J];if(le!==void 0)switch(le.length){case 2:s.vertexAttrib2fv(Q.location,le);break;case 3:s.vertexAttrib3fv(Q.location,le);break;case 4:s.vertexAttrib4fv(Q.location,le);break;default:s.vertexAttrib1fv(Q.location,le)}}}}S()}function w(){T();for(const L in n){const I=n[L];for(const B in I){const q=I[B];for(const O in q){const X=q[O];for(const k in X)h(X[k].object),delete X[k];delete q[O]}}delete n[L]}}function A(L){if(n[L.id]===void 0)return;const I=n[L.id];for(const B in I){const q=I[B];for(const O in q){const X=q[O];for(const k in X)h(X[k].object),delete X[k];delete q[O]}}delete n[L.id]}function R(L){for(const I in n){const B=n[I];for(const q in B){const O=B[q];if(O[L.id]===void 0)continue;const X=O[L.id];for(const k in X)h(X[k].object),delete X[k];delete O[L.id]}}}function _(L){for(const I in n){const B=n[I],q=L.isInstancedMesh===!0?L.id:0,O=B[q];if(O!==void 0){for(const X in O){const k=O[X];for(const J in k)h(k[J].object),delete k[J];delete O[X]}delete B[q],Object.keys(B).length===0&&delete n[I]}}}function T(){P(),a=!0,r!==i&&(r=i,c(r.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:g,disableUnusedAttributes:S}}function EM(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function TM(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==En&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const _=R===nn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==_n&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==In&&!_)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Re("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Re("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),S=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),w=s.getParameter(s.MAX_SAMPLES),A=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:M,maxSamples:w,samples:A}}function wM(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Ss,o=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,m=s.get(u);if(!i||p===null||p.length===0||r&&!g)r?h(null):c();else{const S=r?0:n,E=S*4;let M=m.clippingState||null;l.value=M,M=h(p,d,E,f);for(let w=0;w!==E;++w)M[w]=t[w];m.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=l.value,p!==!0||g===null){const m=f+v*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,M=f;E!==v;++E,M+=4)a.copy(u[E]).applyMatrix4(S,o),a.normal.toArray(g,M),g[M+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}const ss=4,ef=[.125,.215,.35,.446,.526,.582],ys=20,AM=256,Zr=new Pa,tf=new se;let fc=null,pc=0,mc=0,gc=!1;const RM=new b;class wa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){const{size:a=256,position:o=RM}=r;fc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(fc,pc,mc),this._renderer.xr.enabled=gc,e.scissorTest=!1,sr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Rs||e.mapping===yr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:nn,format:En,colorSpace:wn,depthBuffer:!1},i=nf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nf(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=CM(r)),this._blurMaterial=LM(r,e,t),this._ggxMaterial=PM(r,e,t)}return i}_compileMaterial(e){const t=new Te(new Ut,e);this._renderer.compile(t,Zr)}_sceneToCubeUV(e,t,n,i,r){const l=new en(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(tf),u.toneMapping=fi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Te(new mn,new Wt({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let m=!1;const S=e.background;S?S.isColor&&(g.color.copy(S),e.background=null,m=!0):(g.color.copy(tf),m=!0);for(let E=0;E<6;E++){const M=E%3;M===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):M===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const w=this._cubeSize;sr(i,M*w,E>2?w:0,w,w),u.setRenderTarget(i),m&&u.render(v,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Rs||e.mapping===yr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=rf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sf());const r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;sr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Zr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=0+c*1.25,f=u*d,{_lodMax:p}=this,v=this._sizeLods[n],g=3*v*(n>p-ss?n-p+ss:0),m=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,sr(r,g,m,3*v,2*v),i.setRenderTarget(r),i.render(o,Zr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,sr(e,g,m,3*v,2*v),i.setRenderTarget(e),i.render(o,Zr)}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ue("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[i];u.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ys-1),v=r/p,g=isFinite(r)?1+Math.floor(h*v):ys;g>ys&&Re(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ys}`);const m=[];let S=0;for(let R=0;R<ys;++R){const _=R/v,T=Math.exp(-_*_/2);m.push(T),R===0?S+=T:R<g&&(S+=2*T)}for(let R=0;R<m.length;R++)m[R]=m[R]/S;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:E}=this;d.dTheta.value=p,d.mipInt.value=E-n;const M=this._sizeLods[i],w=3*M*(i>E-ss?i-E+ss:0),A=4*(this._cubeSize-M);sr(t,w,A,3*M,2*M),l.setRenderTarget(t),l.render(u,Zr)}}function CM(s){const e=[],t=[],n=[];let i=s;const r=s-ss+1+ef.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-ss?l=ef[a-s+ss-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,v=3,g=2,m=1,S=new Float32Array(v*p*f),E=new Float32Array(g*p*f),M=new Float32Array(m*p*f);for(let A=0;A<f;A++){const R=A%3*2/3-1,_=A>2?0:-1,T=[R,_,0,R+2/3,_,0,R+2/3,_+1,0,R,_,0,R+2/3,_+1,0,R,_+1,0];S.set(T,v*p*A),E.set(d,g*p*A);const P=[A,A,A,A,A,A];M.set(P,m*p*A)}const w=new Ut;w.setAttribute("position",new vt(S,v)),w.setAttribute("uv",new vt(E,g)),w.setAttribute("faceIndex",new vt(M,m)),n.push(new Te(w,null)),i>ss&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function nf(s,e,t){const n=new sn(s,e,t);return n.texture.mapping=yl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function sr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function PM(s,e,t){return new wt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:AM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Tl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Jt,depthTest:!1,depthWrite:!1})}function LM(s,e,t){const n=new Float32Array(ys),i=new b(0,1,0);return new wt({name:"SphericalGaussianBlur",defines:{n:ys,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Jt,depthTest:!1,depthWrite:!1})}function sf(){return new wt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Jt,depthTest:!1,depthWrite:!1})}function rf(){return new wt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jt,depthTest:!1,depthWrite:!1})}function Tl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Bu extends sn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Um(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new mn(5,5,5),r=new wt({name:"CubemapFromEquirect",uniforms:wr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:Jt});r.uniforms.tEquirect.value=t;const a=new Te(i,r),o=t.minFilter;return t.minFilter===Ui&&(t.minFilter=Ct),new Gm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}function IM(s){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){const f=d.mapping;if(f===Fl||f===Ol)if(e.has(d)){const p=e.get(d).texture;return o(p,d.mapping)}else{const p=d.image;if(p&&p.height>0){const v=new Bu(p.height);return v.fromEquirectangularTexture(s,d),e.set(d,v),d.addEventListener("dispose",c),o(v.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,p=f===Fl||f===Ol,v=f===Rs||f===yr;if(p||v){let g=t.get(d);const m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new wa(s)),g=p?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const S=d.image;return p&&S&&S.height>0||v&&S&&l(S)?(n===null&&(n=new wa(s)),g=p?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function o(d,f){return f===Fl?d.mapping=Rs:f===Ol&&(d.mapping=yr),d}function l(d){let f=0;const p=6;for(let v=0;v<p;v++)d[v]!==void 0&&f++;return f===p}function c(d){const f=d.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(d){const f=d.target;f.removeEventListener("dispose",h);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function DM(s){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&xr("WebGLRenderer: "+n+" extension not supported."),i}}}function NM(s,e,t,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,p=u.attributes.position;let v=0;if(p===void 0)return;if(f!==null){const S=f.array;v=f.version;for(let E=0,M=S.length;E<M;E+=3){const w=S[E+0],A=S[E+1],R=S[E+2];d.push(w,A,A,R,R,w)}}else{const S=p.array;v=p.version;for(let E=0,M=S.length/3-1;E<M;E+=3){const w=E+0,A=E+1,R=E+2;d.push(w,A,A,R,R,w)}}const g=new(p.count>=65535?Lm:Pm)(d,1);g.version=v;const m=r.get(u);m&&e.remove(m),r.set(u,g)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function UM(s,e,t){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){s.drawElements(n,d,r,u*a),t.update(d,n,1)}function c(u,d,f){f!==0&&(s.drawElementsInstanced(n,d,r,u*a,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let v=0;for(let g=0;g<f;g++)v+=d[g];t.update(v,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function FM(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:Ue("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function OM(s,e,t){const n=new WeakMap,i=new ct;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let P=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",P)};var f=P;d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let M=0;p===!0&&(M=1),v===!0&&(M=2),g===!0&&(M=3);let w=o.attributes.position.count*M,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const R=new Float32Array(w*A*4*u),_=new Am(R,w,A,u);_.type=In,_.needsUpdate=!0;const T=M*4;for(let L=0;L<u;L++){const I=m[L],B=S[L],q=E[L],O=w*A*4*L;for(let X=0;X<I.count;X++){const k=X*T;p===!0&&(i.fromBufferAttribute(I,X),R[O+k+0]=i.x,R[O+k+1]=i.y,R[O+k+2]=i.z,R[O+k+3]=0),v===!0&&(i.fromBufferAttribute(B,X),R[O+k+4]=i.x,R[O+k+5]=i.y,R[O+k+6]=i.z,R[O+k+7]=0),g===!0&&(i.fromBufferAttribute(q,X),R[O+k+8]=i.x,R[O+k+9]=i.y,R[O+k+10]=i.z,R[O+k+11]=q.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new Me(w,A)},n.set(o,d),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const v=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function BM(s,e,t,n,i){let r=new WeakMap;function a(c){const h=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const kM={[ou]:"LINEAR_TONE_MAPPING",[lu]:"REINHARD_TONE_MAPPING",[cu]:"CINEON_TONE_MAPPING",[Sl]:"ACES_FILMIC_TONE_MAPPING",[uu]:"AGX_TONE_MAPPING",[du]:"NEUTRAL_TONE_MAPPING",[hu]:"CUSTOM_TONE_MAPPING"};function zM(s,e,t,n,i,r){const a=new sn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,depthTexture:i?new Ps(e,t):void 0}),o=new sn(e,t,{type:nn,depthBuffer:!1,stencilBuffer:!1}),l=new Ut;l.setAttribute("position",new Mt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Mt([0,2,0,0,2,0],2));const c=new Bm({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new Te(l,c),u=new Pa(-1,1,1,-1,0,1);let d=null,f=null,p=!1,v,g=null,m=[],S=!1;this.setSize=function(E,M){a.setSize(E,M),o.setSize(E,M);for(let w=0;w<m.length;w++){const A=m[w];A.setSize&&A.setSize(E,M)}},this.setEffects=function(E){m=E,S=m.length>0&&m[0].isRenderPass===!0;const M=a.width,w=a.height;for(let A=0;A<m.length;A++){const R=m[A];R.setSize&&R.setSize(M,w)}},this.begin=function(E,M){if(p||E.toneMapping===fi&&m.length===0)return!1;if(g=M,M!==null){const w=M.width,A=M.height;(a.width!==w||a.height!==A)&&this.setSize(w,A)}return S===!1&&E.setRenderTarget(a),v=E.toneMapping,E.toneMapping=fi,!0},this.hasRenderPass=function(){return S},this.end=function(E,M){E.toneMapping=v,p=!0;let w=a,A=o;for(let R=0;R<m.length;R++){const _=m[R];if(_.enabled!==!1&&(_.render(E,A,w,M),_.needsSwap!==!1)){const T=w;w=A,A=T}}if(d!==E.outputColorSpace||f!==E.toneMapping){d=E.outputColorSpace,f=E.toneMapping,c.defines={},Ke.getTransfer(d)===rt&&(c.defines.SRGB_TRANSFER="");const R=kM[f];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,E.setRenderTarget(g),E.render(h,u),g=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Km=new Xt,Yh=new Ps(1,1),$m=new Am,Ym=new Lg,Zm=new Um,af=[],of=[],lf=new Float32Array(16),cf=new Float32Array(9),hf=new Float32Array(4);function Ur(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=af[i];if(r===void 0&&(r=new Float32Array(i),af[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function qt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Kt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function wl(s,e){let t=of[e];t===void 0&&(t=new Int32Array(e),of[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function VM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function HM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;s.uniform2fv(this.addr,e),Kt(t,e)}}function GM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(qt(t,e))return;s.uniform3fv(this.addr,e),Kt(t,e)}}function WM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;s.uniform4fv(this.addr,e),Kt(t,e)}}function XM(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Kt(t,e)}else{if(qt(t,n))return;hf.set(n),s.uniformMatrix2fv(this.addr,!1,hf),Kt(t,n)}}function qM(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Kt(t,e)}else{if(qt(t,n))return;cf.set(n),s.uniformMatrix3fv(this.addr,!1,cf),Kt(t,n)}}function KM(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Kt(t,e)}else{if(qt(t,n))return;lf.set(n),s.uniformMatrix4fv(this.addr,!1,lf),Kt(t,n)}}function $M(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function YM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;s.uniform2iv(this.addr,e),Kt(t,e)}}function ZM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;s.uniform3iv(this.addr,e),Kt(t,e)}}function JM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;s.uniform4iv(this.addr,e),Kt(t,e)}}function QM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function jM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;s.uniform2uiv(this.addr,e),Kt(t,e)}}function eS(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;s.uniform3uiv(this.addr,e),Kt(t,e)}}function tS(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;s.uniform4uiv(this.addr,e),Kt(t,e)}}function nS(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Yh.compareFunction=t.isReversedDepthBuffer()?Su:Mu,r=Yh):r=Km,t.setTexture2D(e||r,i)}function iS(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Ym,i)}function sS(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Zm,i)}function rS(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||$m,i)}function aS(s){switch(s){case 5126:return VM;case 35664:return HM;case 35665:return GM;case 35666:return WM;case 35674:return XM;case 35675:return qM;case 35676:return KM;case 5124:case 35670:return $M;case 35667:case 35671:return YM;case 35668:case 35672:return ZM;case 35669:case 35673:return JM;case 5125:return QM;case 36294:return jM;case 36295:return eS;case 36296:return tS;case 35678:case 36198:case 36298:case 36306:case 35682:return nS;case 35679:case 36299:case 36307:return iS;case 35680:case 36300:case 36308:case 36293:return sS;case 36289:case 36303:case 36311:case 36292:return rS}}function oS(s,e){s.uniform1fv(this.addr,e)}function lS(s,e){const t=Ur(e,this.size,2);s.uniform2fv(this.addr,t)}function cS(s,e){const t=Ur(e,this.size,3);s.uniform3fv(this.addr,t)}function hS(s,e){const t=Ur(e,this.size,4);s.uniform4fv(this.addr,t)}function uS(s,e){const t=Ur(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function dS(s,e){const t=Ur(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function fS(s,e){const t=Ur(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function pS(s,e){s.uniform1iv(this.addr,e)}function mS(s,e){s.uniform2iv(this.addr,e)}function gS(s,e){s.uniform3iv(this.addr,e)}function _S(s,e){s.uniform4iv(this.addr,e)}function xS(s,e){s.uniform1uiv(this.addr,e)}function vS(s,e){s.uniform2uiv(this.addr,e)}function MS(s,e){s.uniform3uiv(this.addr,e)}function SS(s,e){s.uniform4uiv(this.addr,e)}function yS(s,e,t){const n=this.cache,i=e.length,r=wl(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),Kt(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Yh:a=Km;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function bS(s,e,t){const n=this.cache,i=e.length,r=wl(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),Kt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Ym,r[a])}function ES(s,e,t){const n=this.cache,i=e.length,r=wl(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),Kt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Zm,r[a])}function TS(s,e,t){const n=this.cache,i=e.length,r=wl(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),Kt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||$m,r[a])}function wS(s){switch(s){case 5126:return oS;case 35664:return lS;case 35665:return cS;case 35666:return hS;case 35674:return uS;case 35675:return dS;case 35676:return fS;case 5124:case 35670:return pS;case 35667:case 35671:return mS;case 35668:case 35672:return gS;case 35669:case 35673:return _S;case 5125:return xS;case 36294:return vS;case 36295:return MS;case 36296:return SS;case 35678:case 36198:case 36298:case 36306:case 35682:return yS;case 35679:case 36299:case 36307:return bS;case 35680:case 36300:case 36308:case 36293:return ES;case 36289:case 36303:case 36311:case 36292:return TS}}class AS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=aS(t.type)}}class RS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wS(t.type)}}class CS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const _c=/(\w+)(\])?(\[|\.)?/g;function uf(s,e){s.seq.push(e),s.map[e.id]=e}function PS(s,e,t){const n=s.name,i=n.length;for(_c.lastIndex=0;;){const r=_c.exec(n),a=_c.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){uf(t,c===void 0?new AS(o,s,e):new RS(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new CS(o),uf(t,u)),t=u}}}class il{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);PS(o,l,this)}const i=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function df(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const LS=37297;let IS=0;function DS(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const ff=new ke;function NS(s){Ke._getMatrix(ff,Ke.workingColorSpace,s);const e=`mat3( ${ff.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(s)){case ul:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Re("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function pf(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+DS(s.getShaderSource(e),o)}else return r}function US(s,e){const t=NS(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const FS={[ou]:"Linear",[lu]:"Reinhard",[cu]:"Cineon",[Sl]:"ACESFilmic",[uu]:"AgX",[du]:"Neutral",[hu]:"Custom"};function OS(s,e){const t=FS[e];return t===void 0?(Re("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const mo=new b;function BS(){Ke.getLuminanceCoefficients(mo);const s=mo.x.toFixed(4),e=mo.y.toFixed(4),t=mo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function kS(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ua).join(`
`)}function zS(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function VS(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function ua(s){return s!==""}function mf(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gf(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const HS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zh(s){return s.replace(HS,WS)}const GS=new Map;function WS(s,e){let t=Ge[e];if(t===void 0){const n=GS.get(e);if(n!==void 0)t=Ge[n],Re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Zh(t)}const XS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _f(s){return s.replace(XS,qS)}function qS(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function xf(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const KS={[Jo]:"SHADOWMAP_TYPE_PCF",[la]:"SHADOWMAP_TYPE_VSM"};function $S(s){return KS[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const YS={[Rs]:"ENVMAP_TYPE_CUBE",[yr]:"ENVMAP_TYPE_CUBE",[yl]:"ENVMAP_TYPE_CUBE_UV"};function ZS(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":YS[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const JS={[yr]:"ENVMAP_MODE_REFRACTION"};function QS(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":JS[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const jS={[gm]:"ENVMAP_BLENDING_MULTIPLY",[q0]:"ENVMAP_BLENDING_MIX",[K0]:"ENVMAP_BLENDING_ADD"};function ey(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":jS[s.combine]||"ENVMAP_BLENDING_NONE"}function ty(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function ny(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=$S(t),c=ZS(t),h=QS(t),u=ey(t),d=ty(t),f=kS(t),p=zS(r),v=i.createProgram();let g,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ua).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ua).join(`
`),m.length>0&&(m+=`
`)):(g=[xf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ua).join(`
`),m=[xf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fi?"#define TONE_MAPPING":"",t.toneMapping!==fi?Ge.tonemapping_pars_fragment:"",t.toneMapping!==fi?OS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,US("linearToOutputTexel",t.outputColorSpace),BS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ua).join(`
`)),a=Zh(a),a=mf(a,t),a=gf(a,t),o=Zh(o),o=mf(o,t),o=gf(o,t),a=_f(a),o=_f(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===pd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===pd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const E=S+g+a,M=S+m+o,w=df(i,i.VERTEX_SHADER,E),A=df(i,i.FRAGMENT_SHADER,M);i.attachShader(v,w),i.attachShader(v,A),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function R(L){if(s.debug.checkShaderErrors){const I=i.getProgramInfoLog(v)||"",B=i.getShaderInfoLog(w)||"",q=i.getShaderInfoLog(A)||"",O=I.trim(),X=B.trim(),k=q.trim();let J=!0,Q=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(J=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,w,A);else{const re=pf(i,w,"vertex"),le=pf(i,A,"fragment");Ue("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+O+`
`+re+`
`+le)}else O!==""?Re("WebGLProgram: Program Info Log:",O):(X===""||k==="")&&(Q=!1);Q&&(L.diagnostics={runnable:J,programLog:O,vertexShader:{log:X,prefix:g},fragmentShader:{log:k,prefix:m}})}i.deleteShader(w),i.deleteShader(A),_=new il(i,v),T=VS(i,v)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(v,LS)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=IS++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=A,this}let iy=0;class sy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new ry(e),t.set(e,n)),n}}class ry{constructor(e){this.id=iy++,this.code=e,this.usedTimes=0}}function ay(s){return s===Cs||s===ll||s===cl}function oy(s,e,t,n,i,r){const a=new Rm,o=new sy,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function v(_,T,P,L,I,B){const q=L.fog,O=I.geometry,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?L.environment:null,k=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,J=e.get(_.envMap||X,k),Q=J&&J.mapping===yl?J.image.height:null,re=f[_.type];_.precision!==null&&(d=n.getMaxPrecision(_.precision),d!==_.precision&&Re("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const le=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ge=le!==void 0?le.length:0;let Je=0;O.morphAttributes.position!==void 0&&(Je=1),O.morphAttributes.normal!==void 0&&(Je=2),O.morphAttributes.color!==void 0&&(Je=3);let ht,Qe,$,ne;if(re){const ye=ai[re];ht=ye.vertexShader,Qe=ye.fragmentShader}else{ht=_.vertexShader,Qe=_.fragmentShader;const ye=o.getVertexShaderStage(_),Lt=o.getFragmentShaderStage(_);o.update(_,ye,Lt),$=ye.id,ne=Lt.id}const ee=s.getRenderTarget(),Ie=s.state.buffers.depth.getReversed(),Ne=I.isInstancedMesh===!0,De=I.isBatchedMesh===!0,St=!!_.map,He=!!_.matcap,st=!!J,et=!!_.aoMap,Ye=!!_.lightMap,yt=!!_.bumpMap&&_.wireframe===!1,At=!!_.normalMap,Pt=!!_.displacementMap,Ft=!!_.emissiveMap,gt=!!_.metalnessMap,bt=!!_.roughnessMap,N=_.anisotropy>0,$t=_.clearcoat>0,nt=_.dispersion>0,C=_.iridescence>0,x=_.sheen>0,F=_.transmission>0,z=N&&!!_.anisotropyMap,W=$t&&!!_.clearcoatMap,te=$t&&!!_.clearcoatNormalMap,oe=$t&&!!_.clearcoatRoughnessMap,K=C&&!!_.iridescenceMap,Y=C&&!!_.iridescenceThicknessMap,ce=x&&!!_.sheenColorMap,we=x&&!!_.sheenRoughnessMap,ae=!!_.specularMap,ie=!!_.specularColorMap,be=!!_.specularIntensityMap,Pe=F&&!!_.transmissionMap,Fe=F&&!!_.thicknessMap,D=!!_.gradientMap,he=!!_.alphaMap,Z=_.alphaTest>0,ue=!!_.alphaHash,me=!!_.extensions;let j=fi;_.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(j=s.toneMapping);const Ae={shaderID:re,shaderType:_.type,shaderName:_.name,vertexShader:ht,fragmentShader:Qe,defines:_.defines,customVertexShaderID:$,customFragmentShaderID:ne,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:De,batchingColor:De&&I._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&I.instanceColor!==null,instancingMorph:Ne&&I.morphTexture!==null,outputColorSpace:ee===null?s.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Ke.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:St,matcap:He,envMap:st,envMapMode:st&&J.mapping,envMapCubeUVHeight:Q,aoMap:et,lightMap:Ye,bumpMap:yt,normalMap:At,displacementMap:Pt,emissiveMap:Ft,normalMapObjectSpace:At&&_.normalMapType===Q0,normalMapTangentSpace:At&&_.normalMapType===hl,packedNormalMap:At&&_.normalMapType===hl&&ay(_.normalMap.format),metalnessMap:gt,roughnessMap:bt,anisotropy:N,anisotropyMap:z,clearcoat:$t,clearcoatMap:W,clearcoatNormalMap:te,clearcoatRoughnessMap:oe,dispersion:nt,iridescence:C,iridescenceMap:K,iridescenceThicknessMap:Y,sheen:x,sheenColorMap:ce,sheenRoughnessMap:we,specularMap:ae,specularColorMap:ie,specularIntensityMap:be,transmission:F,transmissionMap:Pe,thicknessMap:Fe,gradientMap:D,opaque:_.transparent===!1&&_.blending===_r&&_.alphaToCoverage===!1,alphaMap:he,alphaTest:Z,alphaHash:ue,combine:_.combine,mapUv:St&&p(_.map.channel),aoMapUv:et&&p(_.aoMap.channel),lightMapUv:Ye&&p(_.lightMap.channel),bumpMapUv:yt&&p(_.bumpMap.channel),normalMapUv:At&&p(_.normalMap.channel),displacementMapUv:Pt&&p(_.displacementMap.channel),emissiveMapUv:Ft&&p(_.emissiveMap.channel),metalnessMapUv:gt&&p(_.metalnessMap.channel),roughnessMapUv:bt&&p(_.roughnessMap.channel),anisotropyMapUv:z&&p(_.anisotropyMap.channel),clearcoatMapUv:W&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:te&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:Y&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:we&&p(_.sheenRoughnessMap.channel),specularMapUv:ae&&p(_.specularMap.channel),specularColorMapUv:ie&&p(_.specularColorMap.channel),specularIntensityMapUv:be&&p(_.specularIntensityMap.channel),transmissionMapUv:Pe&&p(_.transmissionMap.channel),thicknessMapUv:Fe&&p(_.thicknessMap.channel),alphaMapUv:he&&p(_.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(At||N),vertexNormals:!!O.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!O.attributes.uv&&(St||he),fog:!!q,useFog:_.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||O.attributes.normal===void 0&&At===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ie,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:Je,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:j,decodeVideoTexture:St&&_.map.isVideoTexture===!0&&Ke.getTransfer(_.map.colorSpace)===rt,decodeVideoTextureEmissive:Ft&&_.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(_.emissiveMap.colorSpace)===rt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Gt,flipSided:_.side===jt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:me&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&_.extensions.multiDraw===!0||De)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ae.vertexUv1s=l.has(1),Ae.vertexUv2s=l.has(2),Ae.vertexUv3s=l.has(3),l.clear(),Ae}function g(_){const T=[];if(_.shaderID?T.push(_.shaderID):(T.push(_.customVertexShaderID),T.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)T.push(P),T.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(m(T,_),S(T,_),T.push(s.outputColorSpace)),T.push(_.customProgramCacheKey),T.join()}function m(_,T){_.push(T.precision),_.push(T.outputColorSpace),_.push(T.envMapMode),_.push(T.envMapCubeUVHeight),_.push(T.mapUv),_.push(T.alphaMapUv),_.push(T.lightMapUv),_.push(T.aoMapUv),_.push(T.bumpMapUv),_.push(T.normalMapUv),_.push(T.displacementMapUv),_.push(T.emissiveMapUv),_.push(T.metalnessMapUv),_.push(T.roughnessMapUv),_.push(T.anisotropyMapUv),_.push(T.clearcoatMapUv),_.push(T.clearcoatNormalMapUv),_.push(T.clearcoatRoughnessMapUv),_.push(T.iridescenceMapUv),_.push(T.iridescenceThicknessMapUv),_.push(T.sheenColorMapUv),_.push(T.sheenRoughnessMapUv),_.push(T.specularMapUv),_.push(T.specularColorMapUv),_.push(T.specularIntensityMapUv),_.push(T.transmissionMapUv),_.push(T.thicknessMapUv),_.push(T.combine),_.push(T.fogExp2),_.push(T.sizeAttenuation),_.push(T.morphTargetsCount),_.push(T.morphAttributeCount),_.push(T.numDirLights),_.push(T.numPointLights),_.push(T.numSpotLights),_.push(T.numSpotLightMaps),_.push(T.numHemiLights),_.push(T.numRectAreaLights),_.push(T.numDirLightShadows),_.push(T.numPointLightShadows),_.push(T.numSpotLightShadows),_.push(T.numSpotLightShadowsWithMaps),_.push(T.numLightProbes),_.push(T.shadowMapType),_.push(T.toneMapping),_.push(T.numClippingPlanes),_.push(T.numClipIntersection),_.push(T.depthPacking)}function S(_,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function E(_){const T=f[_.type];let P;if(T){const L=ai[T];P=oi.clone(L.uniforms)}else P=_.uniforms;return P}function M(_,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new ny(s,T,_,i),c.push(P),h.set(T,P)),P}function w(_){if(--_.usedTimes===0){const T=c.indexOf(_);c[T]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function A(_){o.remove(_)}function R(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:E,acquireProgram:M,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:R}}function ly(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function cy(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function vf(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Mf(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,p,v,g,m){let S=s[e];return S===void 0?(S={id:d.id,object:d,geometry:f,material:p,materialVariant:a(d),groupOrder:v,renderOrder:d.renderOrder,z:g,group:m},s[e]=S):(S.id=d.id,S.object=d,S.geometry=f,S.material=p,S.materialVariant=a(d),S.groupOrder=v,S.renderOrder=d.renderOrder,S.z=g,S.group=m),e++,S}function l(d,f,p,v,g,m){const S=o(d,f,p,v,g,m);p.transmission>0?n.push(S):p.transparent===!0?i.push(S):t.push(S)}function c(d,f,p,v,g,m){const S=o(d,f,p,v,g,m);p.transmission>0?n.unshift(S):p.transparent===!0?i.unshift(S):t.unshift(S)}function h(d,f,p){t.length>1&&t.sort(d||cy),n.length>1&&n.sort(f||vf),i.length>1&&i.sort(f||vf),p&&(t.reverse(),n.reverse(),i.reverse())}function u(){for(let d=e,f=s.length;d<f;d++){const p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:u,sort:h}}function hy(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Mf,s.set(n,[a])):i>=r.length?(a=new Mf,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function uy(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new b,color:new se};break;case"SpotLight":t={position:new b,direction:new b,color:new se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new b,color:new se,distance:0,decay:0};break;case"HemisphereLight":t={direction:new b,skyColor:new se,groundColor:new se};break;case"RectAreaLight":t={color:new se,position:new b,halfWidth:new b,halfHeight:new b};break}return s[e.id]=t,t}}}function dy(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let fy=0;function py(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function my(s){const e=new uy,t=dy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new b);const i=new b,r=new Se,a=new Se;function o(c){let h=0,u=0,d=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,S=0,E=0,M=0,w=0,A=0,R=0;c.sort(py);for(let T=0,P=c.length;T<P;T++){const L=c[T],I=L.color,B=L.intensity,q=L.distance;let O=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Cs?O=L.shadow.map.texture:O=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=I.r*B,u+=I.g*B,d+=I.b*B;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],B);R++}else if(L.isDirectionalLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const k=L.shadow,J=t.get(L);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,n.directionalShadow[f]=J,n.directionalShadowMap[f]=O,n.directionalShadowMatrix[f]=L.shadow.matrix,S++}n.directional[f]=X,f++}else if(L.isSpotLight){const X=e.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(I).multiplyScalar(B),X.distance=q,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[v]=X;const k=L.shadow;if(L.map&&(n.spotLightMap[w]=L.map,w++,k.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[v]=k.matrix,L.castShadow){const J=t.get(L);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,n.spotShadow[v]=J,n.spotShadowMap[v]=O,M++}v++}else if(L.isRectAreaLight){const X=e.get(L);X.color.copy(I).multiplyScalar(B),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=X,g++}else if(L.isPointLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const k=L.shadow,J=t.get(L);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,J.shadowCameraNear=k.camera.near,J.shadowCameraFar=k.camera.far,n.pointShadow[p]=J,n.pointShadowMap[p]=O,n.pointShadowMatrix[p]=L.shadow.matrix,E++}n.point[p]=X,p++}else if(L.isHemisphereLight){const X=e.get(L);X.skyColor.copy(L.color).multiplyScalar(B),X.groundColor.copy(L.groundColor).multiplyScalar(B),n.hemi[m]=X,m++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const _=n.hash;(_.directionalLength!==f||_.pointLength!==p||_.spotLength!==v||_.rectAreaLength!==g||_.hemiLength!==m||_.numDirectionalShadows!==S||_.numPointShadows!==E||_.numSpotShadows!==M||_.numSpotMaps!==w||_.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=M+w-A,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,_.directionalLength=f,_.pointLength=p,_.spotLength=v,_.rectAreaLength=g,_.hemiLength=m,_.numDirectionalShadows=S,_.numPointShadows=E,_.numSpotShadows=M,_.numSpotMaps=w,_.numLightProbes=R,n.version=fy++)}function l(c,h){let u=0,d=0,f=0,p=0,v=0;const g=h.matrixWorldInverse;for(let m=0,S=c.length;m<S;m++){const E=c[m];if(E.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(g),u++}else if(E.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(g),f++}else if(E.isRectAreaLight){const M=n.rectArea[p];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),a.identity(),r.copy(E.matrixWorld),r.premultiply(g),a.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),p++}else if(E.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),d++}else if(E.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Sf(s){const e=new my(s),t=[],n=[],i=[];function r(d){u.camera=d,t.length=0,n.length=0,i.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){i.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function gy(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new Sf(s),e.set(i,[o])):r>=a.length?(o=new Sf(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const _y=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,vy=[new b(1,0,0),new b(-1,0,0),new b(0,1,0),new b(0,-1,0),new b(0,0,1),new b(0,0,-1)],My=[new b(0,-1,0),new b(0,-1,0),new b(0,0,1),new b(0,0,-1),new b(0,-1,0),new b(0,-1,0)],yf=new Se,Jr=new b,xc=new b;function Sy(s,e,t){let n=new Ru;const i=new Me,r=new Me,a=new ct,o=new s_,l=new r_,c={},h=t.maxTextureSize,u={[Un]:jt,[jt]:Un,[Gt]:Gt},d=new wt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Me},radius:{value:4}},vertexShader:_y,fragmentShader:xy}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new Ut;p.setAttribute("position",new vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Te(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jo;let m=this.type;this.render=function(A,R,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;this.type===pm&&(Re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Jo);const T=s.getRenderTarget(),P=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),I=s.state;I.setBlending(Jt),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const B=m!==this.type;B&&R.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(O=>O.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,O=A.length;q<O;q++){const X=A[q],k=X.shadow;if(k===void 0){Re("WebGLShadowMap:",X,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const J=k.getFrameExtents();i.multiply(J),r.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/J.x),i.x=r.x*J.x,k.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/J.y),i.y=r.y*J.y,k.mapSize.y=r.y));const Q=s.state.buffers.depth.getReversed();if(k.camera._reversedDepth=Q,k.map===null||B===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===la){if(X.isPointLight){Re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new sn(i.x,i.y,{format:Cs,type:nn,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),k.map.texture.name=X.name+".shadowMap",k.map.depthTexture=new Ps(i.x,i.y,In),k.map.depthTexture.name=X.name+".shadowMapDepth",k.map.depthTexture.format=ki,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=zt,k.map.depthTexture.magFilter=zt}else X.isPointLight?(k.map=new Bu(i.x),k.map.depthTexture=new jg(i.x,gi)):(k.map=new sn(i.x,i.y),k.map.depthTexture=new Ps(i.x,i.y,gi)),k.map.depthTexture.name=X.name+".shadowMap",k.map.depthTexture.format=ki,this.type===Jo?(k.map.depthTexture.compareFunction=Q?Su:Mu,k.map.depthTexture.minFilter=Ct,k.map.depthTexture.magFilter=Ct):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=zt,k.map.depthTexture.magFilter=zt);k.camera.updateProjectionMatrix()}const re=k.map.isWebGLCubeRenderTarget?6:1;for(let le=0;le<re;le++){if(k.map.isWebGLCubeRenderTarget)s.setRenderTarget(k.map,le),s.clear();else{le===0&&(s.setRenderTarget(k.map),s.clear());const ge=k.getViewport(le);a.set(r.x*ge.x,r.y*ge.y,r.x*ge.z,r.y*ge.w),I.viewport(a)}if(X.isPointLight){const ge=k.camera,Je=k.matrix,ht=X.distance||ge.far;ht!==ge.far&&(ge.far=ht,ge.updateProjectionMatrix()),Jr.setFromMatrixPosition(X.matrixWorld),ge.position.copy(Jr),xc.copy(ge.position),xc.add(vy[le]),ge.up.copy(My[le]),ge.lookAt(xc),ge.updateMatrixWorld(),Je.makeTranslation(-Jr.x,-Jr.y,-Jr.z),yf.multiplyMatrices(ge.projectionMatrix,ge.matrixWorldInverse),k._frustum.setFromProjectionMatrix(yf,ge.coordinateSystem,ge.reversedDepth)}else k.updateMatrices(X);n=k.getFrustum(),M(R,_,k.camera,X,this.type)}k.isPointLightShadow!==!0&&this.type===la&&S(k,_),k.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(T,P,L)};function S(A,R){const _=e.update(v);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new sn(i.x,i.y,{format:Cs,type:nn})),d.uniforms.shadow_pass.value=A.map.depthTexture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(R,null,_,d,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(R,null,_,f,v,null)}function E(A,R,_,T){let P=null;const L=_.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)P=L;else if(P=_.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const I=P.uuid,B=R.uuid;let q=c[I];q===void 0&&(q={},c[I]=q);let O=q[B];O===void 0&&(O=P.clone(),q[B]=O,R.addEventListener("dispose",w)),P=O}if(P.visible=R.visible,P.wireframe=R.wireframe,T===la?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:u[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,_.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const I=s.properties.get(P);I.light=_}return P}function M(A,R,_,T,P){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&P===la)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,A.matrixWorld);const B=e.update(A),q=A.material;if(Array.isArray(q)){const O=B.groups;for(let X=0,k=O.length;X<k;X++){const J=O[X],Q=q[J.materialIndex];if(Q&&Q.visible){const re=E(A,Q,T,P);A.onBeforeShadow(s,A,R,_,B,re,J),s.renderBufferDirect(_,null,B,re,A,J),A.onAfterShadow(s,A,R,_,B,re,J)}}}else if(q.visible){const O=E(A,q,T,P);A.onBeforeShadow(s,A,R,_,B,O,null),s.renderBufferDirect(_,null,B,O,A,null),A.onAfterShadow(s,A,R,_,B,O,null)}}const I=A.children;for(let B=0,q=I.length;B<q;B++)M(I[B],R,_,T,P)}function w(A){A.target.removeEventListener("dispose",w);for(const _ in c){const T=c[_],P=A.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function yy(s,e){function t(){let D=!1;const he=new ct;let Z=null;const ue=new ct(0,0,0,0);return{setMask:function(me){Z!==me&&!D&&(s.colorMask(me,me,me,me),Z=me)},setLocked:function(me){D=me},setClear:function(me,j,Ae,ye,Lt){Lt===!0&&(me*=ye,j*=ye,Ae*=ye),he.set(me,j,Ae,ye),ue.equals(he)===!1&&(s.clearColor(me,j,Ae,ye),ue.copy(he))},reset:function(){D=!1,Z=null,ue.set(-1,0,0,0)}}}function n(){let D=!1,he=!1,Z=null,ue=null,me=null;return{setReversed:function(j){if(he!==j){const Ae=e.get("EXT_clip_control");j?Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.ZERO_TO_ONE_EXT):Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.NEGATIVE_ONE_TO_ONE_EXT),he=j;const ye=me;me=null,this.setClear(ye)}},getReversed:function(){return he},setTest:function(j){j?ee(s.DEPTH_TEST):Ie(s.DEPTH_TEST)},setMask:function(j){Z!==j&&!D&&(s.depthMask(j),Z=j)},setFunc:function(j){if(he&&(j=cg[j]),ue!==j){switch(j){case lh:s.depthFunc(s.NEVER);break;case ch:s.depthFunc(s.ALWAYS);break;case hh:s.depthFunc(s.LESS);break;case Sr:s.depthFunc(s.LEQUAL);break;case uh:s.depthFunc(s.EQUAL);break;case dh:s.depthFunc(s.GEQUAL);break;case fh:s.depthFunc(s.GREATER);break;case ph:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ue=j}},setLocked:function(j){D=j},setClear:function(j){me!==j&&(me=j,he&&(j=1-j),s.clearDepth(j))},reset:function(){D=!1,Z=null,ue=null,me=null,he=!1}}}function i(){let D=!1,he=null,Z=null,ue=null,me=null,j=null,Ae=null,ye=null,Lt=null;return{setTest:function(_t){D||(_t?ee(s.STENCIL_TEST):Ie(s.STENCIL_TEST))},setMask:function(_t){he!==_t&&!D&&(s.stencilMask(_t),he=_t)},setFunc:function(_t,Jn,Qn){(Z!==_t||ue!==Jn||me!==Qn)&&(s.stencilFunc(_t,Jn,Qn),Z=_t,ue=Jn,me=Qn)},setOp:function(_t,Jn,Qn){(j!==_t||Ae!==Jn||ye!==Qn)&&(s.stencilOp(_t,Jn,Qn),j=_t,Ae=Jn,ye=Qn)},setLocked:function(_t){D=_t},setClear:function(_t){Lt!==_t&&(s.clearStencil(_t),Lt=_t)},reset:function(){D=!1,he=null,Z=null,ue=null,me=null,j=null,Ae=null,ye=null,Lt=null}}}const r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d={},f=new WeakMap,p=[],v=null,g=!1,m=null,S=null,E=null,M=null,w=null,A=null,R=null,_=new se(0,0,0),T=0,P=!1,L=null,I=null,B=null,q=null,O=null;const X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,J=0;const Q=s.getParameter(s.VERSION);Q.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(Q)[1]),k=J>=1):Q.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),k=J>=2);let re=null,le={};const ge=s.getParameter(s.SCISSOR_BOX),Je=s.getParameter(s.VIEWPORT),ht=new ct().fromArray(ge),Qe=new ct().fromArray(Je);function $(D,he,Z,ue){const me=new Uint8Array(4),j=s.createTexture();s.bindTexture(D,j),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ae=0;Ae<Z;Ae++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(he,0,s.RGBA,1,1,ue,0,s.RGBA,s.UNSIGNED_BYTE,me):s.texImage2D(he+Ae,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,me);return j}const ne={};ne[s.TEXTURE_2D]=$(s.TEXTURE_2D,s.TEXTURE_2D,1),ne[s.TEXTURE_CUBE_MAP]=$(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[s.TEXTURE_2D_ARRAY]=$(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ne[s.TEXTURE_3D]=$(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(s.DEPTH_TEST),a.setFunc(Sr),yt(!1),At(rd),ee(s.CULL_FACE),et(Jt);function ee(D){h[D]!==!0&&(s.enable(D),h[D]=!0)}function Ie(D){h[D]!==!1&&(s.disable(D),h[D]=!1)}function Ne(D,he){return d[D]!==he?(s.bindFramebuffer(D,he),d[D]=he,D===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=he),D===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=he),!0):!1}function De(D,he){let Z=p,ue=!1;if(D){Z=f.get(he),Z===void 0&&(Z=[],f.set(he,Z));const me=D.textures;if(Z.length!==me.length||Z[0]!==s.COLOR_ATTACHMENT0){for(let j=0,Ae=me.length;j<Ae;j++)Z[j]=s.COLOR_ATTACHMENT0+j;Z.length=me.length,ue=!0}}else Z[0]!==s.BACK&&(Z[0]=s.BACK,ue=!0);ue&&s.drawBuffers(Z)}function St(D){return v!==D?(s.useProgram(D),v=D,!0):!1}const He={[Wn]:s.FUNC_ADD,[I0]:s.FUNC_SUBTRACT,[D0]:s.FUNC_REVERSE_SUBTRACT};He[N0]=s.MIN,He[U0]=s.MAX;const st={[ca]:s.ZERO,[F0]:s.ONE,[O0]:s.SRC_COLOR,[sh]:s.SRC_ALPHA,[V0]:s.SRC_ALPHA_SATURATE,[oh]:s.DST_COLOR,[ah]:s.DST_ALPHA,[B0]:s.ONE_MINUS_SRC_COLOR,[rh]:s.ONE_MINUS_SRC_ALPHA,[z0]:s.ONE_MINUS_DST_COLOR,[k0]:s.ONE_MINUS_DST_ALPHA,[H0]:s.CONSTANT_COLOR,[G0]:s.ONE_MINUS_CONSTANT_COLOR,[W0]:s.CONSTANT_ALPHA,[X0]:s.ONE_MINUS_CONSTANT_ALPHA};function et(D,he,Z,ue,me,j,Ae,ye,Lt,_t){if(D===Jt){g===!0&&(Ie(s.BLEND),g=!1);return}if(g===!1&&(ee(s.BLEND),g=!0),D!==mm){if(D!==m||_t!==P){if((S!==Wn||w!==Wn)&&(s.blendEquation(s.FUNC_ADD),S=Wn,w=Wn),_t)switch(D){case _r:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pn:s.blendFunc(s.ONE,s.ONE);break;case ad:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case od:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ue("WebGLState: Invalid blending: ",D);break}else switch(D){case _r:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case ad:Ue("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case od:Ue("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ue("WebGLState: Invalid blending: ",D);break}E=null,M=null,A=null,R=null,_.set(0,0,0),T=0,m=D,P=_t}return}me=me||he,j=j||Z,Ae=Ae||ue,(he!==S||me!==w)&&(s.blendEquationSeparate(He[he],He[me]),S=he,w=me),(Z!==E||ue!==M||j!==A||Ae!==R)&&(s.blendFuncSeparate(st[Z],st[ue],st[j],st[Ae]),E=Z,M=ue,A=j,R=Ae),(ye.equals(_)===!1||Lt!==T)&&(s.blendColor(ye.r,ye.g,ye.b,Lt),_.copy(ye),T=Lt),m=D,P=!1}function Ye(D,he){D.side===Gt?Ie(s.CULL_FACE):ee(s.CULL_FACE);let Z=D.side===jt;he&&(Z=!Z),yt(Z),D.blending===_r&&D.transparent===!1?et(Jt):et(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const ue=D.stencilWrite;o.setTest(ue),ue&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ft(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ee(s.SAMPLE_ALPHA_TO_COVERAGE):Ie(s.SAMPLE_ALPHA_TO_COVERAGE)}function yt(D){L!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),L=D)}function At(D){D!==P0?(ee(s.CULL_FACE),D!==I&&(D===rd?s.cullFace(s.BACK):D===L0?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ie(s.CULL_FACE),I=D}function Pt(D){D!==B&&(k&&s.lineWidth(D),B=D)}function Ft(D,he,Z){D?(ee(s.POLYGON_OFFSET_FILL),(q!==he||O!==Z)&&(q=he,O=Z,a.getReversed()&&(he=-he),s.polygonOffset(he,Z))):Ie(s.POLYGON_OFFSET_FILL)}function gt(D){D?ee(s.SCISSOR_TEST):Ie(s.SCISSOR_TEST)}function bt(D){D===void 0&&(D=s.TEXTURE0+X-1),re!==D&&(s.activeTexture(D),re=D)}function N(D,he,Z){Z===void 0&&(re===null?Z=s.TEXTURE0+X-1:Z=re);let ue=le[Z];ue===void 0&&(ue={type:void 0,texture:void 0},le[Z]=ue),(ue.type!==D||ue.texture!==he)&&(re!==Z&&(s.activeTexture(Z),re=Z),s.bindTexture(D,he||ne[D]),ue.type=D,ue.texture=he)}function $t(){const D=le[re];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function nt(){try{s.compressedTexImage2D(...arguments)}catch(D){Ue("WebGLState:",D)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(D){Ue("WebGLState:",D)}}function x(){try{s.texSubImage2D(...arguments)}catch(D){Ue("WebGLState:",D)}}function F(){try{s.texSubImage3D(...arguments)}catch(D){Ue("WebGLState:",D)}}function z(){try{s.compressedTexSubImage2D(...arguments)}catch(D){Ue("WebGLState:",D)}}function W(){try{s.compressedTexSubImage3D(...arguments)}catch(D){Ue("WebGLState:",D)}}function te(){try{s.texStorage2D(...arguments)}catch(D){Ue("WebGLState:",D)}}function oe(){try{s.texStorage3D(...arguments)}catch(D){Ue("WebGLState:",D)}}function K(){try{s.texImage2D(...arguments)}catch(D){Ue("WebGLState:",D)}}function Y(){try{s.texImage3D(...arguments)}catch(D){Ue("WebGLState:",D)}}function ce(D){return u[D]!==void 0?u[D]:s.getParameter(D)}function we(D,he){u[D]!==he&&(s.pixelStorei(D,he),u[D]=he)}function ae(D){ht.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),ht.copy(D))}function ie(D){Qe.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),Qe.copy(D))}function be(D,he){let Z=c.get(he);Z===void 0&&(Z=new WeakMap,c.set(he,Z));let ue=Z.get(D);ue===void 0&&(ue=s.getUniformBlockIndex(he,D.name),Z.set(D,ue))}function Pe(D,he){const ue=c.get(he).get(D);l.get(he)!==ue&&(s.uniformBlockBinding(he,ue,D.__bindingPointIndex),l.set(he,ue))}function Fe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},re=null,le={},d={},f=new WeakMap,p=[],v=null,g=!1,m=null,S=null,E=null,M=null,w=null,A=null,R=null,_=new se(0,0,0),T=0,P=!1,L=null,I=null,B=null,q=null,O=null,ht.set(0,0,s.canvas.width,s.canvas.height),Qe.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ee,disable:Ie,bindFramebuffer:Ne,drawBuffers:De,useProgram:St,setBlending:et,setMaterial:Ye,setFlipSided:yt,setCullFace:At,setLineWidth:Pt,setPolygonOffset:Ft,setScissorTest:gt,activeTexture:bt,bindTexture:N,unbindTexture:$t,compressedTexImage2D:nt,compressedTexImage3D:C,texImage2D:K,texImage3D:Y,pixelStorei:we,getParameter:ce,updateUBOMapping:be,uniformBlockBinding:Pe,texStorage2D:te,texStorage3D:oe,texSubImage2D:x,texSubImage3D:F,compressedTexSubImage2D:z,compressedTexSubImage3D:W,scissor:ae,viewport:ie,reset:Fe}}function by(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Me,h=new WeakMap,u=new Set;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,x){return p?new OffscreenCanvas(C,x):va("canvas")}function g(C,x,F){let z=1;const W=nt(C);if((W.width>F||W.height>F)&&(z=F/Math.max(W.width,W.height)),z<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const te=Math.floor(z*W.width),oe=Math.floor(z*W.height);d===void 0&&(d=v(te,oe));const K=x?v(te,oe):d;return K.width=te,K.height=oe,K.getContext("2d").drawImage(C,0,0,te,oe),Re("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+te+"x"+oe+")."),K}else return"data"in C&&Re("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),C;return C}function m(C){return C.generateMipmaps}function S(C){s.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(C,x,F,z,W,te=!1){if(C!==null){if(s[C]!==void 0)return s[C];Re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let oe;z&&(oe=e.get("EXT_texture_norm16"),oe||Re("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=x;if(x===s.RED&&(F===s.FLOAT&&(K=s.R32F),F===s.HALF_FLOAT&&(K=s.R16F),F===s.UNSIGNED_BYTE&&(K=s.R8),F===s.UNSIGNED_SHORT&&oe&&(K=oe.R16_EXT),F===s.SHORT&&oe&&(K=oe.R16_SNORM_EXT)),x===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(K=s.R8UI),F===s.UNSIGNED_SHORT&&(K=s.R16UI),F===s.UNSIGNED_INT&&(K=s.R32UI),F===s.BYTE&&(K=s.R8I),F===s.SHORT&&(K=s.R16I),F===s.INT&&(K=s.R32I)),x===s.RG&&(F===s.FLOAT&&(K=s.RG32F),F===s.HALF_FLOAT&&(K=s.RG16F),F===s.UNSIGNED_BYTE&&(K=s.RG8),F===s.UNSIGNED_SHORT&&oe&&(K=oe.RG16_EXT),F===s.SHORT&&oe&&(K=oe.RG16_SNORM_EXT)),x===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&(K=s.RG8UI),F===s.UNSIGNED_SHORT&&(K=s.RG16UI),F===s.UNSIGNED_INT&&(K=s.RG32UI),F===s.BYTE&&(K=s.RG8I),F===s.SHORT&&(K=s.RG16I),F===s.INT&&(K=s.RG32I)),x===s.RGB_INTEGER&&(F===s.UNSIGNED_BYTE&&(K=s.RGB8UI),F===s.UNSIGNED_SHORT&&(K=s.RGB16UI),F===s.UNSIGNED_INT&&(K=s.RGB32UI),F===s.BYTE&&(K=s.RGB8I),F===s.SHORT&&(K=s.RGB16I),F===s.INT&&(K=s.RGB32I)),x===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&(K=s.RGBA8UI),F===s.UNSIGNED_SHORT&&(K=s.RGBA16UI),F===s.UNSIGNED_INT&&(K=s.RGBA32UI),F===s.BYTE&&(K=s.RGBA8I),F===s.SHORT&&(K=s.RGBA16I),F===s.INT&&(K=s.RGBA32I)),x===s.RGB&&(F===s.UNSIGNED_SHORT&&oe&&(K=oe.RGB16_EXT),F===s.SHORT&&oe&&(K=oe.RGB16_SNORM_EXT),F===s.UNSIGNED_INT_5_9_9_9_REV&&(K=s.RGB9_E5),F===s.UNSIGNED_INT_10F_11F_11F_REV&&(K=s.R11F_G11F_B10F)),x===s.RGBA){const Y=te?ul:Ke.getTransfer(W);F===s.FLOAT&&(K=s.RGBA32F),F===s.HALF_FLOAT&&(K=s.RGBA16F),F===s.UNSIGNED_BYTE&&(K=Y===rt?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT&&oe&&(K=oe.RGBA16_EXT),F===s.SHORT&&oe&&(K=oe.RGBA16_SNORM_EXT),F===s.UNSIGNED_SHORT_4_4_4_4&&(K=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(K=s.RGB5_A1)}return(K===s.R16F||K===s.R32F||K===s.RG16F||K===s.RG32F||K===s.RGBA16F||K===s.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function w(C,x){let F;return C?x===null||x===gi||x===br?F=s.DEPTH24_STENCIL8:x===In?F=s.DEPTH32F_STENCIL8:x===ma&&(F=s.DEPTH24_STENCIL8,Re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===gi||x===br?F=s.DEPTH_COMPONENT24:x===In?F=s.DEPTH_COMPONENT32F:x===ma&&(F=s.DEPTH_COMPONENT16),F}function A(C,x){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==zt&&C.minFilter!==Ct?Math.log2(Math.max(x.width,x.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?x.mipmaps.length:1}function R(C){const x=C.target;x.removeEventListener("dispose",R),T(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&u.delete(x)}function _(C){const x=C.target;x.removeEventListener("dispose",_),L(x)}function T(C){const x=n.get(C);if(x.__webglInit===void 0)return;const F=C.source,z=f.get(F);if(z){const W=z[x.__cacheKey];W.usedTimes--,W.usedTimes===0&&P(C),Object.keys(z).length===0&&f.delete(F)}n.remove(C)}function P(C){const x=n.get(C);s.deleteTexture(x.__webglTexture);const F=C.source,z=f.get(F);delete z[x.__cacheKey],a.memory.textures--}function L(C){const x=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(x.__webglFramebuffer[z]))for(let W=0;W<x.__webglFramebuffer[z].length;W++)s.deleteFramebuffer(x.__webglFramebuffer[z][W]);else s.deleteFramebuffer(x.__webglFramebuffer[z]);x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer[z])}else{if(Array.isArray(x.__webglFramebuffer))for(let z=0;z<x.__webglFramebuffer.length;z++)s.deleteFramebuffer(x.__webglFramebuffer[z]);else s.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&s.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let z=0;z<x.__webglColorRenderbuffer.length;z++)x.__webglColorRenderbuffer[z]&&s.deleteRenderbuffer(x.__webglColorRenderbuffer[z]);x.__webglDepthRenderbuffer&&s.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const F=C.textures;for(let z=0,W=F.length;z<W;z++){const te=n.get(F[z]);te.__webglTexture&&(s.deleteTexture(te.__webglTexture),a.memory.textures--),n.remove(F[z])}n.remove(C)}let I=0;function B(){I=0}function q(){return I}function O(C){I=C}function X(){const C=I;return C>=i.maxTextures&&Re("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),I+=1,C}function k(C){const x=[];return x.push(C.wrapS),x.push(C.wrapT),x.push(C.wrapR||0),x.push(C.magFilter),x.push(C.minFilter),x.push(C.anisotropy),x.push(C.internalFormat),x.push(C.format),x.push(C.type),x.push(C.generateMipmaps),x.push(C.premultiplyAlpha),x.push(C.flipY),x.push(C.unpackAlignment),x.push(C.colorSpace),x.join()}function J(C,x){const F=n.get(C);if(C.isVideoTexture&&N(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&F.__version!==C.version){const z=C.image;if(z===null)Re("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)Re("WebGLRenderer: Texture marked for update but image is incomplete");else{Ie(F,C,x);return}}else C.isExternalTexture&&(F.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+x)}function Q(C,x){const F=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&F.__version!==C.version){Ie(F,C,x);return}else C.isExternalTexture&&(F.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+x)}function re(C,x){const F=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&F.__version!==C.version){Ie(F,C,x);return}t.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+x)}function le(C,x){const F=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&F.__version!==C.version){Ne(F,C,x);return}t.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+x)}const ge={[Fn]:s.REPEAT,[hi]:s.CLAMP_TO_EDGE,[ol]:s.MIRRORED_REPEAT},Je={[zt]:s.NEAREST,[xm]:s.NEAREST_MIPMAP_NEAREST,[ha]:s.NEAREST_MIPMAP_LINEAR,[Ct]:s.LINEAR,[Qo]:s.LINEAR_MIPMAP_NEAREST,[Ui]:s.LINEAR_MIPMAP_LINEAR},ht={[j0]:s.NEVER,[sg]:s.ALWAYS,[eg]:s.LESS,[Mu]:s.LEQUAL,[tg]:s.EQUAL,[Su]:s.GEQUAL,[ng]:s.GREATER,[ig]:s.NOTEQUAL};function Qe(C,x){if(x.type===In&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Ct||x.magFilter===Qo||x.magFilter===ha||x.magFilter===Ui||x.minFilter===Ct||x.minFilter===Qo||x.minFilter===ha||x.minFilter===Ui)&&Re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,ge[x.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,ge[x.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,ge[x.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,Je[x.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,Je[x.minFilter]),x.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,ht[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===zt||x.minFilter!==ha&&x.minFilter!==Ui||x.type===In&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function $(C,x){let F=!1;C.__webglInit===void 0&&(C.__webglInit=!0,x.addEventListener("dispose",R));const z=x.source;let W=f.get(z);W===void 0&&(W={},f.set(z,W));const te=k(x);if(te!==C.__cacheKey){W[te]===void 0&&(W[te]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,F=!0),W[te].usedTimes++;const oe=W[C.__cacheKey];oe!==void 0&&(W[C.__cacheKey].usedTimes--,oe.usedTimes===0&&P(x)),C.__cacheKey=te,C.__webglTexture=W[te].texture}return F}function ne(C,x,F){return Math.floor(Math.floor(C/F)/x)}function ee(C,x,F,z){const te=C.updateRanges;if(te.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,x.width,x.height,F,z,x.data);else{te.sort((we,ae)=>we.start-ae.start);let oe=0;for(let we=1;we<te.length;we++){const ae=te[oe],ie=te[we],be=ae.start+ae.count,Pe=ne(ie.start,x.width,4),Fe=ne(ae.start,x.width,4);ie.start<=be+1&&Pe===Fe&&ne(ie.start+ie.count-1,x.width,4)===Pe?ae.count=Math.max(ae.count,ie.start+ie.count-ae.start):(++oe,te[oe]=ie)}te.length=oe+1;const K=t.getParameter(s.UNPACK_ROW_LENGTH),Y=t.getParameter(s.UNPACK_SKIP_PIXELS),ce=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,x.width);for(let we=0,ae=te.length;we<ae;we++){const ie=te[we],be=Math.floor(ie.start/4),Pe=Math.ceil(ie.count/4),Fe=be%x.width,D=Math.floor(be/x.width),he=Pe,Z=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,Fe),t.pixelStorei(s.UNPACK_SKIP_ROWS,D),t.texSubImage2D(s.TEXTURE_2D,0,Fe,D,he,Z,F,z,x.data)}C.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,K),t.pixelStorei(s.UNPACK_SKIP_PIXELS,Y),t.pixelStorei(s.UNPACK_SKIP_ROWS,ce)}}function Ie(C,x,F){let z=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(z=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(z=s.TEXTURE_3D);const W=$(C,x),te=x.source;t.bindTexture(z,C.__webglTexture,s.TEXTURE0+F);const oe=n.get(te);if(te.version!==oe.__version||W===!0){if(t.activeTexture(s.TEXTURE0+F),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const Z=Ke.getPrimaries(Ke.workingColorSpace),ue=x.colorSpace===ts?null:Ke.getPrimaries(x.colorSpace),me=x.colorSpace===ts||Z===ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment);let Y=g(x.image,!1,i.maxTextureSize);Y=$t(x,Y);const ce=r.convert(x.format,x.colorSpace),we=r.convert(x.type);let ae=M(x.internalFormat,ce,we,x.normalized,x.colorSpace,x.isVideoTexture);Qe(z,x);let ie;const be=x.mipmaps,Pe=x.isVideoTexture!==!0,Fe=oe.__version===void 0||W===!0,D=te.dataReady,he=A(x,Y);if(x.isDepthTexture)ae=w(x.format===is,x.type),Fe&&(Pe?t.texStorage2D(s.TEXTURE_2D,1,ae,Y.width,Y.height):t.texImage2D(s.TEXTURE_2D,0,ae,Y.width,Y.height,0,ce,we,null));else if(x.isDataTexture)if(be.length>0){Pe&&Fe&&t.texStorage2D(s.TEXTURE_2D,he,ae,be[0].width,be[0].height);for(let Z=0,ue=be.length;Z<ue;Z++)ie=be[Z],Pe?D&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,ie.width,ie.height,ce,we,ie.data):t.texImage2D(s.TEXTURE_2D,Z,ae,ie.width,ie.height,0,ce,we,ie.data);x.generateMipmaps=!1}else Pe?(Fe&&t.texStorage2D(s.TEXTURE_2D,he,ae,Y.width,Y.height),D&&ee(x,Y,ce,we)):t.texImage2D(s.TEXTURE_2D,0,ae,Y.width,Y.height,0,ce,we,Y.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Pe&&Fe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,he,ae,be[0].width,be[0].height,Y.depth);for(let Z=0,ue=be.length;Z<ue;Z++)if(ie=be[Z],x.format!==En)if(ce!==null)if(Pe){if(D)if(x.layerUpdates.size>0){const me=jd(ie.width,ie.height,x.format,x.type);for(const j of x.layerUpdates){const Ae=ie.data.subarray(j*me/ie.data.BYTES_PER_ELEMENT,(j+1)*me/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,j,ie.width,ie.height,1,ce,Ae)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,ie.width,ie.height,Y.depth,ce,ie.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Z,ae,ie.width,ie.height,Y.depth,0,ie.data,0,0);else Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?D&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,ie.width,ie.height,Y.depth,ce,we,ie.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Z,ae,ie.width,ie.height,Y.depth,0,ce,we,ie.data)}else{Pe&&Fe&&t.texStorage2D(s.TEXTURE_2D,he,ae,be[0].width,be[0].height);for(let Z=0,ue=be.length;Z<ue;Z++)ie=be[Z],x.format!==En?ce!==null?Pe?D&&t.compressedTexSubImage2D(s.TEXTURE_2D,Z,0,0,ie.width,ie.height,ce,ie.data):t.compressedTexImage2D(s.TEXTURE_2D,Z,ae,ie.width,ie.height,0,ie.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?D&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,ie.width,ie.height,ce,we,ie.data):t.texImage2D(s.TEXTURE_2D,Z,ae,ie.width,ie.height,0,ce,we,ie.data)}else if(x.isDataArrayTexture)if(Pe){if(Fe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,he,ae,Y.width,Y.height,Y.depth),D)if(x.layerUpdates.size>0){const Z=jd(Y.width,Y.height,x.format,x.type);for(const ue of x.layerUpdates){const me=Y.data.subarray(ue*Z/Y.data.BYTES_PER_ELEMENT,(ue+1)*Z/Y.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ue,Y.width,Y.height,1,ce,we,me)}x.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,ce,we,Y.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ae,Y.width,Y.height,Y.depth,0,ce,we,Y.data);else if(x.isData3DTexture)Pe?(Fe&&t.texStorage3D(s.TEXTURE_3D,he,ae,Y.width,Y.height,Y.depth),D&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,ce,we,Y.data)):t.texImage3D(s.TEXTURE_3D,0,ae,Y.width,Y.height,Y.depth,0,ce,we,Y.data);else if(x.isFramebufferTexture){if(Fe)if(Pe)t.texStorage2D(s.TEXTURE_2D,he,ae,Y.width,Y.height);else{let Z=Y.width,ue=Y.height;for(let me=0;me<he;me++)t.texImage2D(s.TEXTURE_2D,me,ae,Z,ue,0,ce,we,null),Z>>=1,ue>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in s){const Z=s.canvas;if(Z.hasAttribute("layoutsubtree")||Z.setAttribute("layoutsubtree","true"),Y.parentNode!==Z){Z.appendChild(Y),u.add(x),Z.onpaint=ue=>{const me=ue.changedElements;for(const j of u)me.includes(j.image)&&(j.needsUpdate=!0)},Z.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,Y);else{const me=s.RGBA,j=s.RGBA,Ae=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,me,j,Ae,Y)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(be.length>0){if(Pe&&Fe){const Z=nt(be[0]);t.texStorage2D(s.TEXTURE_2D,he,ae,Z.width,Z.height)}for(let Z=0,ue=be.length;Z<ue;Z++)ie=be[Z],Pe?D&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,ce,we,ie):t.texImage2D(s.TEXTURE_2D,Z,ae,ce,we,ie);x.generateMipmaps=!1}else if(Pe){if(Fe){const Z=nt(Y);t.texStorage2D(s.TEXTURE_2D,he,ae,Z.width,Z.height)}D&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ce,we,Y)}else t.texImage2D(s.TEXTURE_2D,0,ae,ce,we,Y);m(x)&&S(z),oe.__version=te.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function Ne(C,x,F){if(x.image.length!==6)return;const z=$(C,x),W=x.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+F);const te=n.get(W);if(W.version!==te.__version||z===!0){t.activeTexture(s.TEXTURE0+F);const oe=Ke.getPrimaries(Ke.workingColorSpace),K=x.colorSpace===ts?null:Ke.getPrimaries(x.colorSpace),Y=x.colorSpace===ts||oe===K?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);const ce=x.isCompressedTexture||x.image[0].isCompressedTexture,we=x.image[0]&&x.image[0].isDataTexture,ae=[];for(let j=0;j<6;j++)!ce&&!we?ae[j]=g(x.image[j],!0,i.maxCubemapSize):ae[j]=we?x.image[j].image:x.image[j],ae[j]=$t(x,ae[j]);const ie=ae[0],be=r.convert(x.format,x.colorSpace),Pe=r.convert(x.type),Fe=M(x.internalFormat,be,Pe,x.normalized,x.colorSpace),D=x.isVideoTexture!==!0,he=te.__version===void 0||z===!0,Z=W.dataReady;let ue=A(x,ie);Qe(s.TEXTURE_CUBE_MAP,x);let me;if(ce){D&&he&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ue,Fe,ie.width,ie.height);for(let j=0;j<6;j++){me=ae[j].mipmaps;for(let Ae=0;Ae<me.length;Ae++){const ye=me[Ae];x.format!==En?be!==null?D?Z&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae,0,0,ye.width,ye.height,be,ye.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae,Fe,ye.width,ye.height,0,ye.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae,0,0,ye.width,ye.height,be,Pe,ye.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae,Fe,ye.width,ye.height,0,be,Pe,ye.data)}}}else{if(me=x.mipmaps,D&&he){me.length>0&&ue++;const j=nt(ae[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ue,Fe,j.width,j.height)}for(let j=0;j<6;j++)if(we){D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ae[j].width,ae[j].height,be,Pe,ae[j].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Fe,ae[j].width,ae[j].height,0,be,Pe,ae[j].data);for(let Ae=0;Ae<me.length;Ae++){const Lt=me[Ae].image[j].image;D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae+1,0,0,Lt.width,Lt.height,be,Pe,Lt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae+1,Fe,Lt.width,Lt.height,0,be,Pe,Lt.data)}}else{D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,be,Pe,ae[j]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Fe,be,Pe,ae[j]);for(let Ae=0;Ae<me.length;Ae++){const ye=me[Ae];D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae+1,0,0,be,Pe,ye.image[j]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae+1,Fe,be,Pe,ye.image[j])}}}m(x)&&S(s.TEXTURE_CUBE_MAP),te.__version=W.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function De(C,x,F,z,W,te){const oe=r.convert(F.format,F.colorSpace),K=r.convert(F.type),Y=M(F.internalFormat,oe,K,F.normalized,F.colorSpace),ce=n.get(x),we=n.get(F);if(we.__renderTarget=x,!ce.__hasExternalTextures){const ae=Math.max(1,x.width>>te),ie=Math.max(1,x.height>>te);W===s.TEXTURE_3D||W===s.TEXTURE_2D_ARRAY?t.texImage3D(W,te,Y,ae,ie,x.depth,0,oe,K,null):t.texImage2D(W,te,Y,ae,ie,0,oe,K,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),bt(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,z,W,we.__webglTexture,0,gt(x)):(W===s.TEXTURE_2D||W>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,z,W,we.__webglTexture,te),t.bindFramebuffer(s.FRAMEBUFFER,null)}function St(C,x,F){if(s.bindRenderbuffer(s.RENDERBUFFER,C),x.depthBuffer){const z=x.depthTexture,W=z&&z.isDepthTexture?z.type:null,te=w(x.stencilBuffer,W),oe=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;bt(x)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,gt(x),te,x.width,x.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,gt(x),te,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,te,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,oe,s.RENDERBUFFER,C)}else{const z=x.textures;for(let W=0;W<z.length;W++){const te=z[W],oe=r.convert(te.format,te.colorSpace),K=r.convert(te.type),Y=M(te.internalFormat,oe,K,te.normalized,te.colorSpace);bt(x)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,gt(x),Y,x.width,x.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,gt(x),Y,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,Y,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function He(C,x,F){const z=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const W=n.get(x.depthTexture);if(W.__renderTarget=x,(!W.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),z){if(W.__webglInit===void 0&&(W.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),W.__webglTexture===void 0){W.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture),Qe(s.TEXTURE_CUBE_MAP,x.depthTexture);const ce=r.convert(x.depthTexture.format),we=r.convert(x.depthTexture.type);let ae;x.depthTexture.format===ki?ae=s.DEPTH_COMPONENT24:x.depthTexture.format===is&&(ae=s.DEPTH24_STENCIL8);for(let ie=0;ie<6;ie++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ae,x.width,x.height,0,ce,we,null)}}else J(x.depthTexture,0);const te=W.__webglTexture,oe=gt(x),K=z?s.TEXTURE_CUBE_MAP_POSITIVE_X+F:s.TEXTURE_2D,Y=x.depthTexture.format===is?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(x.depthTexture.format===ki)bt(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Y,K,te,0,oe):s.framebufferTexture2D(s.FRAMEBUFFER,Y,K,te,0);else if(x.depthTexture.format===is)bt(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Y,K,te,0,oe):s.framebufferTexture2D(s.FRAMEBUFFER,Y,K,te,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function st(C){const x=n.get(C),F=C.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==C.depthTexture){const z=C.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),z){const W=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,z.removeEventListener("dispose",W)};z.addEventListener("dispose",W),x.__depthDisposeCallback=W}x.__boundDepthTexture=z}if(C.depthTexture&&!x.__autoAllocateDepthBuffer)if(F)for(let z=0;z<6;z++)He(x.__webglFramebuffer[z],C,z);else{const z=C.texture.mipmaps;z&&z.length>0?He(x.__webglFramebuffer[0],C,0):He(x.__webglFramebuffer,C,0)}else if(F){x.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[z]),x.__webglDepthbuffer[z]===void 0)x.__webglDepthbuffer[z]=s.createRenderbuffer(),St(x.__webglDepthbuffer[z],C,!1);else{const W=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,te=x.__webglDepthbuffer[z];s.bindRenderbuffer(s.RENDERBUFFER,te),s.framebufferRenderbuffer(s.FRAMEBUFFER,W,s.RENDERBUFFER,te)}}else{const z=C.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=s.createRenderbuffer(),St(x.__webglDepthbuffer,C,!1);else{const W=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,te=x.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,te),s.framebufferRenderbuffer(s.FRAMEBUFFER,W,s.RENDERBUFFER,te)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function et(C,x,F){const z=n.get(C);x!==void 0&&De(z.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&st(C)}function Ye(C){const x=C.texture,F=n.get(C),z=n.get(x);C.addEventListener("dispose",_);const W=C.textures,te=C.isWebGLCubeRenderTarget===!0,oe=W.length>1;if(oe||(z.__webglTexture===void 0&&(z.__webglTexture=s.createTexture()),z.__version=x.version,a.memory.textures++),te){F.__webglFramebuffer=[];for(let K=0;K<6;K++)if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[K]=[];for(let Y=0;Y<x.mipmaps.length;Y++)F.__webglFramebuffer[K][Y]=s.createFramebuffer()}else F.__webglFramebuffer[K]=s.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let K=0;K<x.mipmaps.length;K++)F.__webglFramebuffer[K]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(oe)for(let K=0,Y=W.length;K<Y;K++){const ce=n.get(W[K]);ce.__webglTexture===void 0&&(ce.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&bt(C)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let K=0;K<W.length;K++){const Y=W[K];F.__webglColorRenderbuffer[K]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[K]);const ce=r.convert(Y.format,Y.colorSpace),we=r.convert(Y.type),ae=M(Y.internalFormat,ce,we,Y.normalized,Y.colorSpace,C.isXRRenderTarget===!0),ie=gt(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,ie,ae,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+K,s.RENDERBUFFER,F.__webglColorRenderbuffer[K])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),St(F.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(te){t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture),Qe(s.TEXTURE_CUBE_MAP,x);for(let K=0;K<6;K++)if(x.mipmaps&&x.mipmaps.length>0)for(let Y=0;Y<x.mipmaps.length;Y++)De(F.__webglFramebuffer[K][Y],C,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+K,Y);else De(F.__webglFramebuffer[K],C,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);m(x)&&S(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let K=0,Y=W.length;K<Y;K++){const ce=W[K],we=n.get(ce);let ae=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ae=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ae,we.__webglTexture),Qe(ae,ce),De(F.__webglFramebuffer,C,ce,s.COLOR_ATTACHMENT0+K,ae,0),m(ce)&&S(ae)}t.unbindTexture()}else{let K=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(K=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(K,z.__webglTexture),Qe(K,x),x.mipmaps&&x.mipmaps.length>0)for(let Y=0;Y<x.mipmaps.length;Y++)De(F.__webglFramebuffer[Y],C,x,s.COLOR_ATTACHMENT0,K,Y);else De(F.__webglFramebuffer,C,x,s.COLOR_ATTACHMENT0,K,0);m(x)&&S(K),t.unbindTexture()}C.depthBuffer&&st(C)}function yt(C){const x=C.textures;for(let F=0,z=x.length;F<z;F++){const W=x[F];if(m(W)){const te=E(C),oe=n.get(W).__webglTexture;t.bindTexture(te,oe),S(te),t.unbindTexture()}}}const At=[],Pt=[];function Ft(C){if(C.samples>0){if(bt(C)===!1){const x=C.textures,F=C.width,z=C.height;let W=s.COLOR_BUFFER_BIT;const te=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,oe=n.get(C),K=x.length>1;if(K)for(let ce=0;ce<x.length;ce++)t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ce,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ce,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const Y=C.texture.mipmaps;Y&&Y.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let ce=0;ce<x.length;ce++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(W|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(W|=s.STENCIL_BUFFER_BIT)),K){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,oe.__webglColorRenderbuffer[ce]);const we=n.get(x[ce]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,we,0)}s.blitFramebuffer(0,0,F,z,0,0,F,z,W,s.NEAREST),l===!0&&(At.length=0,Pt.length=0,At.push(s.COLOR_ATTACHMENT0+ce),C.depthBuffer&&C.resolveDepthBuffer===!1&&(At.push(te),Pt.push(te),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Pt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,At))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),K)for(let ce=0;ce<x.length;ce++){t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ce,s.RENDERBUFFER,oe.__webglColorRenderbuffer[ce]);const we=n.get(x[ce]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ce,s.TEXTURE_2D,we,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const x=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[x])}}}function gt(C){return Math.min(i.maxSamples,C.samples)}function bt(C){const x=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function N(C){const x=a.render.frame;h.get(C)!==x&&(h.set(C,x),C.update())}function $t(C,x){const F=C.colorSpace,z=C.format,W=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||F!==wn&&F!==ts&&(Ke.getTransfer(F)===rt?(z!==En||W!==_n)&&Re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ue("WebGLTextures: Unsupported texture color space:",F)),x}function nt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=B,this.getTextureUnits=q,this.setTextureUnits=O,this.setTexture2D=J,this.setTexture2DArray=Q,this.setTexture3D=re,this.setTextureCube=le,this.rebindTextures=et,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=Ft,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=De,this.useMultisampledRTT=bt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Ey(s,e){function t(n,i=ts){let r;const a=Ke.getTransfer(i);if(n===_n)return s.UNSIGNED_BYTE;if(n===pu)return s.UNSIGNED_SHORT_4_4_4_4;if(n===mu)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Sm)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===ym)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===vm)return s.BYTE;if(n===Mm)return s.SHORT;if(n===ma)return s.UNSIGNED_SHORT;if(n===fu)return s.INT;if(n===gi)return s.UNSIGNED_INT;if(n===In)return s.FLOAT;if(n===nn)return s.HALF_FLOAT;if(n===bm)return s.ALPHA;if(n===Em)return s.RGB;if(n===En)return s.RGBA;if(n===ki)return s.DEPTH_COMPONENT;if(n===is)return s.DEPTH_STENCIL;if(n===gu)return s.RED;if(n===_u)return s.RED_INTEGER;if(n===Cs)return s.RG;if(n===xu)return s.RG_INTEGER;if(n===vu)return s.RGBA_INTEGER;if(n===jo||n===el||n===tl||n===nl)if(a===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===jo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===el)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===tl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===nl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===jo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===el)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===tl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===nl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===mh||n===gh||n===_h||n===xh)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===mh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===gh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_h)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===vh||n===Mh||n===Sh||n===yh||n===bh||n===ll||n===Eh)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===vh||n===Mh)return a===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Sh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===yh)return r.COMPRESSED_R11_EAC;if(n===bh)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ll)return r.COMPRESSED_RG11_EAC;if(n===Eh)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Th||n===wh||n===Ah||n===Rh||n===Ch||n===Ph||n===Lh||n===Ih||n===Dh||n===Nh||n===Uh||n===Fh||n===Oh||n===Bh)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Th)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===wh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ah)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Rh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ch)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ph)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Lh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ih)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Dh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Nh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Uh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Fh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Oh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Bh)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===kh||n===zh||n===Vh)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===kh)return a===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Vh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Hh||n===Gh||n===cl||n===Wh)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Hh)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Gh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===cl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Wh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===br?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const Ty=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ay{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Fm(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new wt({vertexShader:Ty,fragmentShader:wy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Te(new _i(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ry extends Ds{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null;const v=typeof XRWebGLBinding<"u",g=new Ay,m={},S=t.getContextAttributes();let E=null,M=null;const w=[],A=[],R=new Me;let _=null;const T=new en;T.viewport=new ct;const P=new en;P.viewport=new ct;const L=[T,P],I=new A_;let B=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ne=w[$];return ne===void 0&&(ne=new Wl,w[$]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function($){let ne=w[$];return ne===void 0&&(ne=new Wl,w[$]=ne),ne.getGripSpace()},this.getHand=function($){let ne=w[$];return ne===void 0&&(ne=new Wl,w[$]=ne),ne.getHandSpace()};function O($){const ne=A.indexOf($.inputSource);if(ne===-1)return;const ee=w[ne];ee!==void 0&&(ee.update($.inputSource,$.frame,c||a),ee.dispatchEvent({type:$.type,data:$.inputSource}))}function X(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",k);for(let $=0;$<w.length;$++){const ne=A[$];ne!==null&&(A[$]=null,w[$].disconnect(ne))}B=null,q=null,g.reset();for(const $ in m)delete m[$];e.setRenderTarget(E),f=null,d=null,u=null,i=null,M=null,Qe.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(E=e.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",X),i.addEventListener("inputsourceschange",k),S.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Ie=null,Ne=null;S.depth&&(Ne=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=S.stencil?is:ki,Ie=S.stencil?br:gi);const De={colorFormat:t.RGBA8,depthFormat:Ne,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(De),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new sn(d.textureWidth,d.textureHeight,{format:En,type:_n,depthTexture:new Ps(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ee={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,ee),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new sn(f.framebufferWidth,f.framebufferHeight,{format:En,type:_n,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Qe.setContext(i),Qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function k($){for(let ne=0;ne<$.removed.length;ne++){const ee=$.removed[ne],Ie=A.indexOf(ee);Ie>=0&&(A[Ie]=null,w[Ie].disconnect(ee))}for(let ne=0;ne<$.added.length;ne++){const ee=$.added[ne];let Ie=A.indexOf(ee);if(Ie===-1){for(let De=0;De<w.length;De++)if(De>=A.length){A.push(ee),Ie=De;break}else if(A[De]===null){A[De]=ee,Ie=De;break}if(Ie===-1)break}const Ne=w[Ie];Ne&&Ne.connect(ee)}}const J=new b,Q=new b;function re($,ne,ee){J.setFromMatrixPosition(ne.matrixWorld),Q.setFromMatrixPosition(ee.matrixWorld);const Ie=J.distanceTo(Q),Ne=ne.projectionMatrix.elements,De=ee.projectionMatrix.elements,St=Ne[14]/(Ne[10]-1),He=Ne[14]/(Ne[10]+1),st=(Ne[9]+1)/Ne[5],et=(Ne[9]-1)/Ne[5],Ye=(Ne[8]-1)/Ne[0],yt=(De[8]+1)/De[0],At=St*Ye,Pt=St*yt,Ft=Ie/(-Ye+yt),gt=Ft*-Ye;if(ne.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(gt),$.translateZ(Ft),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ne[10]===-1)$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const bt=St+Ft,N=He+Ft,$t=At-gt,nt=Pt+(Ie-gt),C=st*He/N*bt,x=et*He/N*bt;$.projectionMatrix.makePerspective($t,nt,C,x,bt,N),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function le($,ne){ne===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ne.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let ne=$.near,ee=$.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(ee=g.depthFar)),I.near=P.near=T.near=ne,I.far=P.far=T.far=ee,(B!==I.near||q!==I.far)&&(i.updateRenderState({depthNear:I.near,depthFar:I.far}),B=I.near,q=I.far),I.layers.mask=$.layers.mask|6,T.layers.mask=I.layers.mask&-5,P.layers.mask=I.layers.mask&-3;const Ie=$.parent,Ne=I.cameras;le(I,Ie);for(let De=0;De<Ne.length;De++)le(Ne[De],Ie);Ne.length===2?re(I,T,P):I.projectionMatrix.copy(T.projectionMatrix),ge($,I,Ie)};function ge($,ne,ee){ee===null?$.matrix.copy(ne.matrixWorld):($.matrix.copy(ee.matrixWorld),$.matrix.invert(),$.matrix.multiply(ne.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Er*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(I)},this.getCameraTexture=function($){return m[$]};let Je=null;function ht($,ne){if(h=ne.getViewerPose(c||a),p=ne,h!==null){const ee=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let Ie=!1;ee.length!==I.cameras.length&&(I.cameras.length=0,Ie=!0);for(let He=0;He<ee.length;He++){const st=ee[He];let et=null;if(f!==null)et=f.getViewport(st);else{const yt=u.getViewSubImage(d,st);et=yt.viewport,He===0&&(e.setRenderTargetTextures(M,yt.colorTexture,yt.depthStencilTexture),e.setRenderTarget(M))}let Ye=L[He];Ye===void 0&&(Ye=new en,Ye.layers.enable(He),Ye.viewport=new ct,L[He]=Ye),Ye.matrix.fromArray(st.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(st.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(et.x,et.y,et.width,et.height),He===0&&(I.matrix.copy(Ye.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Ie===!0&&I.cameras.push(Ye)}const Ne=i.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const He=u.getDepthInformation(ee[0]);He&&He.isValid&&He.texture&&g.init(He,i.renderState)}if(Ne&&Ne.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let He=0;He<ee.length;He++){const st=ee[He].camera;if(st){let et=m[st];et||(et=new Fm,m[st]=et);const Ye=u.getCameraImage(st);et.sourceTexture=Ye}}}}for(let ee=0;ee<w.length;ee++){const Ie=A[ee],Ne=w[ee];Ie!==null&&Ne!==void 0&&Ne.update(Ie,ne,c||a)}Je&&Je($,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),p=null}const Qe=new Xm;Qe.setAnimationLoop(ht),this.setAnimationLoop=function($){Je=$},this.dispose=function(){}}}const Cy=new Se,Jm=new ke;Jm.set(-1,0,0,0,1,0,0,0,1);function Py(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Om(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,S,E,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,M)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,S,E):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===jt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===jt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const S=e.get(m),E=S.envMap,M=S.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(Cy.makeRotationFromEuler(M)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Jm),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,S,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*S,g.scale.value=E*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,S){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===jt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const S=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Ly(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,w){const A=w.program;n.uniformBlockBinding(M,A)}function c(M,w){let A=i[M.id];A===void 0&&(g(M),A=h(M),i[M.id]=A,M.addEventListener("dispose",S));const R=w.program;n.updateUBOMapping(M,R);const _=e.render.frame;r[M.id]!==_&&(d(M),r[M.id]=_)}function h(M){const w=u();M.__bindingPointIndex=w;const A=s.createBuffer(),R=M.__size,_=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,A),s.bufferData(s.UNIFORM_BUFFER,R,_),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,w,A),A}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Ue("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const w=i[M.id],A=M.uniforms,R=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let _=0,T=A.length;_<T;_++){const P=A[_];if(Array.isArray(P))for(let L=0,I=P.length;L<I;L++)f(P[L],_,L,R);else f(P,_,0,R)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(M,w,A,R){if(v(M,w,A,R)===!0){const _=M.__offset,T=M.value;if(Array.isArray(T)){let P=0;for(let L=0;L<T.length;L++){const I=T[L],B=m(I);p(I,M.__data,P),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(P+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(T,M.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,_,M.__data)}}function p(M,w,A){typeof M=="number"||typeof M=="boolean"?w[0]=M:M.isMatrix3?(w[0]=M.elements[0],w[1]=M.elements[1],w[2]=M.elements[2],w[3]=0,w[4]=M.elements[3],w[5]=M.elements[4],w[6]=M.elements[5],w[7]=0,w[8]=M.elements[6],w[9]=M.elements[7],w[10]=M.elements[8],w[11]=0):ArrayBuffer.isView(M)?w.set(new M.constructor(M.buffer,M.byteOffset,w.length)):M.toArray(w,A)}function v(M,w,A,R){const _=M.value,T=w+"_"+A;if(R[T]===void 0)return typeof _=="number"||typeof _=="boolean"?R[T]=_:ArrayBuffer.isView(_)?R[T]=_.slice():R[T]=_.clone(),!0;{const P=R[T];if(typeof _=="number"||typeof _=="boolean"){if(P!==_)return R[T]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(P.equals(_)===!1)return P.copy(_),!0}}return!1}function g(M){const w=M.uniforms;let A=0;const R=16;for(let T=0,P=w.length;T<P;T++){const L=Array.isArray(w[T])?w[T]:[w[T]];for(let I=0,B=L.length;I<B;I++){const q=L[I],O=Array.isArray(q.value)?q.value:[q.value];for(let X=0,k=O.length;X<k;X++){const J=O[X],Q=m(J),re=A%R,le=re%Q.boundary,ge=re+le;A+=le,ge!==0&&R-ge<Q.storage&&(A+=R-ge),q.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=A,A+=Q.storage}}}const _=A%R;return _>0&&(A+=R-_),M.__size=A,M.__cache={},this}function m(M){const w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?Re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(w.boundary=16,w.storage=M.byteLength):Re("WebGLRenderer: Unsupported uniform value type.",M),w}function S(M){const w=M.target;w.removeEventListener("dispose",S);const A=a.indexOf(w.__bindingPointIndex);a.splice(A,1),s.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function E(){for(const M in i)s.deleteBuffer(i[M]);a=[],i={},r={}}return{bind:l,update:c,dispose:E}}const Iy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ti=null;function Dy(){return ti===null&&(ti=new Ca(Iy,16,16,Cs,nn),ti.name="DFG_LUT",ti.minFilter=Ct,ti.magFilter=Ct,ti.wrapS=hi,ti.wrapT=hi,ti.generateMipmaps=!1,ti.needsUpdate=!0),ti}class Ny{constructor(e={}){const{canvas:t=og(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=_n}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const v=f,g=new Set([vu,xu,_u]),m=new Set([_n,gi,ma,br,pu,mu]),S=new Uint32Array(4),E=new Int32Array(4),M=new b;let w=null,A=null;const R=[],_=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let L=!1,I=null,B=null,q=null,O=null;this._outputColorSpace=ft;let X=0,k=0,J=null,Q=-1,re=null;const le=new ct,ge=new ct;let Je=null;const ht=new se(0);let Qe=0,$=t.width,ne=t.height,ee=1,Ie=null,Ne=null;const De=new ct(0,0,$,ne),St=new ct(0,0,$,ne);let He=!1;const st=new Ru;let et=!1,Ye=!1;const yt=new Se,At=new b,Pt=new ct,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gt=!1;function bt(){return J===null?ee:1}let N=n;function $t(y,U){return t.getContext(y,U)}try{const y={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${au}`),t.addEventListener("webglcontextlost",Lt,!1),t.addEventListener("webglcontextrestored",_t,!1),t.addEventListener("webglcontextcreationerror",Jn,!1),N===null){const U="webgl2";if(N=$t(U,y),N===null)throw $t(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(y){throw Ue("WebGLRenderer: "+y.message),y}let nt,C,x,F,z,W,te,oe,K,Y,ce,we,ae,ie,be,Pe,Fe,D,he,Z,ue,me,j;function Ae(){nt=new DM(N),nt.init(),ue=new Ey(N,nt),C=new TM(N,nt,e,ue),x=new yy(N,nt),C.reversedDepthBuffer&&d&&x.buffers.depth.setReversed(!0),B=N.createFramebuffer(),q=N.createFramebuffer(),O=N.createFramebuffer(),F=new FM(N),z=new ly,W=new by(N,nt,x,z,C,ue,F),te=new IM(P),oe=new z_(N),me=new bM(N,oe),K=new NM(N,oe,F,me),Y=new BM(N,K,oe,me,F),D=new OM(N,C,W),be=new wM(z),ce=new oy(P,te,nt,C,me,be),we=new Py(P,z),ae=new hy,ie=new gy(nt),Fe=new yM(P,te,x,Y,p,l),Pe=new Sy(P,Y,C),j=new Ly(N,F,C,x),he=new EM(N,nt,F),Z=new UM(N,nt,F),F.programs=ce.programs,P.capabilities=C,P.extensions=nt,P.properties=z,P.renderLists=ae,P.shadowMap=Pe,P.state=x,P.info=F}Ae(),v!==_n&&(T=new zM(v,t.width,t.height,o,i,r));const ye=new Ry(P,N);this.xr=ye,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const y=nt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=nt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(y){y!==void 0&&(ee=y,this.setSize($,ne,!1))},this.getSize=function(y){return y.set($,ne)},this.setSize=function(y,U,G=!0){if(ye.isPresenting){Re("WebGLRenderer: Can't change size while VR device is presenting.");return}$=y,ne=U,t.width=Math.floor(y*ee),t.height=Math.floor(U*ee),G===!0&&(t.style.width=y+"px",t.style.height=U+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set($*ee,ne*ee).floor()},this.setDrawingBufferSize=function(y,U,G){$=y,ne=U,ee=G,t.width=Math.floor(y*G),t.height=Math.floor(U*G),this.setViewport(0,0,y,U)},this.setEffects=function(y){if(v===_n){Ue("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let U=0;U<y.length;U++)if(y[U].isOutputPass===!0){Re("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(le)},this.getViewport=function(y){return y.copy(De)},this.setViewport=function(y,U,G,V){y.isVector4?De.set(y.x,y.y,y.z,y.w):De.set(y,U,G,V),x.viewport(le.copy(De).multiplyScalar(ee).round())},this.getScissor=function(y){return y.copy(St)},this.setScissor=function(y,U,G,V){y.isVector4?St.set(y.x,y.y,y.z,y.w):St.set(y,U,G,V),x.scissor(ge.copy(St).multiplyScalar(ee).round())},this.getScissorTest=function(){return He},this.setScissorTest=function(y){x.setScissorTest(He=y)},this.setOpaqueSort=function(y){Ie=y},this.setTransparentSort=function(y){Ne=y},this.getClearColor=function(y){return y.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(y=!0,U=!0,G=!0){let V=0;if(y){let H=!1;if(J!==null){const pe=J.texture.format;H=g.has(pe)}if(H){const pe=J.texture.type,xe=m.has(pe),fe=Fe.getClearColor(),Ee=Fe.getClearAlpha(),Ce=fe.r,Ve=fe.g,We=fe.b;xe?(S[0]=Ce,S[1]=Ve,S[2]=We,S[3]=Ee,N.clearBufferuiv(N.COLOR,0,S)):(E[0]=Ce,E[1]=Ve,E[2]=We,E[3]=Ee,N.clearBufferiv(N.COLOR,0,E))}else V|=N.COLOR_BUFFER_BIT}U&&(V|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(V|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&N.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),I=y},this.dispose=function(){t.removeEventListener("webglcontextlost",Lt,!1),t.removeEventListener("webglcontextrestored",_t,!1),t.removeEventListener("webglcontextcreationerror",Jn,!1),Fe.dispose(),ae.dispose(),ie.dispose(),z.dispose(),te.dispose(),Y.dispose(),me.dispose(),j.dispose(),ce.dispose(),ye.dispose(),ye.removeEventListener("sessionstart",Ju),ye.removeEventListener("sessionend",Qu),cs.stop()};function Lt(y){y.preventDefault(),dl("WebGLRenderer: Context Lost."),L=!0}function _t(){dl("WebGLRenderer: Context Restored."),L=!1;const y=F.autoReset,U=Pe.enabled,G=Pe.autoUpdate,V=Pe.needsUpdate,H=Pe.type;Ae(),F.autoReset=y,Pe.enabled=U,Pe.autoUpdate=G,Pe.needsUpdate=V,Pe.type=H}function Jn(y){Ue("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Qn(y){const U=y.target;U.removeEventListener("dispose",Qn),b0(U)}function b0(y){E0(y),z.remove(y)}function E0(y){const U=z.get(y).programs;U!==void 0&&(U.forEach(function(G){ce.releaseProgram(G)}),y.isShaderMaterial&&ce.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,G,V,H,pe){U===null&&(U=Ft);const xe=H.isMesh&&H.matrixWorld.determinantAffine()<0,fe=A0(y,U,G,V,H);x.setMaterial(V,xe);let Ee=G.index,Ce=1;if(V.wireframe===!0){if(Ee=K.getWireframeAttribute(G),Ee===void 0)return;Ce=2}const Ve=G.drawRange,We=G.attributes.position;let Le=Ve.start*Ce,lt=(Ve.start+Ve.count)*Ce;pe!==null&&(Le=Math.max(Le,pe.start*Ce),lt=Math.min(lt,(pe.start+pe.count)*Ce)),Ee!==null?(Le=Math.max(Le,0),lt=Math.min(lt,Ee.count)):We!=null&&(Le=Math.max(Le,0),lt=Math.min(lt,We.count));const Ot=lt-Le;if(Ot<0||Ot===1/0)return;me.setup(H,V,fe,G,Ee);let It,ut=he;if(Ee!==null&&(It=oe.get(Ee),ut=Z,ut.setIndex(It)),H.isMesh)V.wireframe===!0?(x.setLineWidth(V.wireframeLinewidth*bt()),ut.setMode(N.LINES)):ut.setMode(N.TRIANGLES);else if(H.isLine){let rn=V.linewidth;rn===void 0&&(rn=1),x.setLineWidth(rn*bt()),H.isLineSegments?ut.setMode(N.LINES):H.isLineLoop?ut.setMode(N.LINE_LOOP):ut.setMode(N.LINE_STRIP)}else H.isPoints?ut.setMode(N.POINTS):H.isSprite&&ut.setMode(N.TRIANGLES);if(H.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))ut.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const rn=H._multiDrawStarts,_e=H._multiDrawCounts,xn=H._multiDrawCount,it=Ee?oe.get(Ee).bytesPerElement:1,An=z.get(V).currentProgram.getUniforms();for(let jn=0;jn<xn;jn++)An.setValue(N,"_gl_DrawID",jn),ut.render(rn[jn]/it,_e[jn])}else if(H.isInstancedMesh)ut.renderInstances(Le,Ot,H.count);else if(G.isInstancedBufferGeometry){const rn=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,_e=Math.min(G.instanceCount,rn);ut.renderInstances(Le,Ot,_e)}else ut.render(Le,Ot)};function Zu(y,U,G){y.transparent===!0&&y.side===Gt&&y.forceSinglePass===!1?(y.side=jt,y.needsUpdate=!0,Oa(y,U,G),y.side=Un,y.needsUpdate=!0,Oa(y,U,G),y.side=Gt):Oa(y,U,G)}this.compile=function(y,U,G=null){G===null&&(G=y),A=ie.get(G),A.init(U),_.push(A),G.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(A.pushLight(H),H.castShadow&&A.pushShadow(H))}),y!==G&&y.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(A.pushLight(H),H.castShadow&&A.pushShadow(H))}),A.setupLights();const V=new Set;return y.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const pe=H.material;if(pe)if(Array.isArray(pe))for(let xe=0;xe<pe.length;xe++){const fe=pe[xe];Zu(fe,G,H),V.add(fe)}else Zu(pe,G,H),V.add(pe)}),A=_.pop(),V},this.compileAsync=function(y,U,G=null){const V=this.compile(y,U,G);return new Promise(H=>{function pe(){if(V.forEach(function(xe){z.get(xe).currentProgram.isReady()&&V.delete(xe)}),V.size===0){H(y);return}setTimeout(pe,10)}nt.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Nl=null;function T0(y){Nl&&Nl(y)}function Ju(){cs.stop()}function Qu(){cs.start()}const cs=new Xm;cs.setAnimationLoop(T0),typeof self<"u"&&cs.setContext(self),this.setAnimationLoop=function(y){Nl=y,ye.setAnimationLoop(y),y===null?cs.stop():cs.start()},ye.addEventListener("sessionstart",Ju),ye.addEventListener("sessionend",Qu),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){Ue("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;I!==null&&I.renderStart(y,U);const G=ye.enabled===!0&&ye.isPresenting===!0,V=T!==null&&(J===null||G)&&T.begin(P,J);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ye.enabled===!0&&ye.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(ye.cameraAutoUpdate===!0&&ye.updateCamera(U),U=ye.getCamera()),y.isScene===!0&&y.onBeforeRender(P,y,U,J),A=ie.get(y,_.length),A.init(U),A.state.textureUnits=W.getTextureUnits(),_.push(A),yt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),st.setFromProjectionMatrix(yt,ui,U.reversedDepth),Ye=this.localClippingEnabled,et=be.init(this.clippingPlanes,Ye),w=ae.get(y,R.length),w.init(),R.push(w),ye.enabled===!0&&ye.isPresenting===!0){const xe=P.xr.getDepthSensingMesh();xe!==null&&Ul(xe,U,-1/0,P.sortObjects)}Ul(y,U,0,P.sortObjects),w.finish(),P.sortObjects===!0&&w.sort(Ie,Ne,U.reversedDepth),gt=ye.enabled===!1||ye.isPresenting===!1||ye.hasDepthSensing()===!1,gt&&Fe.addToRenderList(w,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),et===!0&&be.beginShadows();const H=A.state.shadowsArray;if(Pe.render(H,y,U),et===!0&&be.endShadows(),(V&&T.hasRenderPass())===!1){const xe=w.opaque,fe=w.transmissive;if(A.setupLights(),U.isArrayCamera){const Ee=U.cameras;if(fe.length>0)for(let Ce=0,Ve=Ee.length;Ce<Ve;Ce++){const We=Ee[Ce];ed(xe,fe,y,We)}gt&&Fe.render(y);for(let Ce=0,Ve=Ee.length;Ce<Ve;Ce++){const We=Ee[Ce];ju(w,y,We,We.viewport)}}else fe.length>0&&ed(xe,fe,y,U),gt&&Fe.render(y),ju(w,y,U)}J!==null&&k===0&&(W.updateMultisampleRenderTarget(J),W.updateRenderTargetMipmap(J)),V&&T.end(P),y.isScene===!0&&y.onAfterRender(P,y,U),me.resetDefaultState(),Q=-1,re=null,_.pop(),_.length>0?(A=_[_.length-1],W.setTextureUnits(A.state.textureUnits),et===!0&&be.setGlobalState(P.clippingPlanes,A.state.camera)):A=null,R.pop(),R.length>0?w=R[R.length-1]:w=null,I!==null&&I.renderEnd()};function Ul(y,U,G,V){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)G=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLightProbeGrid)A.pushLightProbeGrid(y);else if(y.isLight)A.pushLight(y),y.castShadow&&A.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||st.intersectsSprite(y)){V&&Pt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(yt);const xe=Y.update(y),fe=y.material;fe.visible&&w.push(y,xe,fe,G,Pt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||st.intersectsObject(y))){const xe=Y.update(y),fe=y.material;if(V&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Pt.copy(y.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),Pt.copy(xe.boundingSphere.center)),Pt.applyMatrix4(y.matrixWorld).applyMatrix4(yt)),Array.isArray(fe)){const Ee=xe.groups;for(let Ce=0,Ve=Ee.length;Ce<Ve;Ce++){const We=Ee[Ce],Le=fe[We.materialIndex];Le&&Le.visible&&w.push(y,xe,Le,G,Pt.z,We)}}else fe.visible&&w.push(y,xe,fe,G,Pt.z,null)}}const pe=y.children;for(let xe=0,fe=pe.length;xe<fe;xe++)Ul(pe[xe],U,G,V)}function ju(y,U,G,V){const{opaque:H,transmissive:pe,transparent:xe}=y;A.setupLightsView(G),et===!0&&be.setGlobalState(P.clippingPlanes,G),V&&x.viewport(le.copy(V)),H.length>0&&Fa(H,U,G),pe.length>0&&Fa(pe,U,G),xe.length>0&&Fa(xe,U,G),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function ed(y,U,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[V.id]===void 0){const Le=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[V.id]=new sn(1,1,{generateMipmaps:!0,type:Le?nn:_n,minFilter:Ui,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}const pe=A.state.transmissionRenderTarget[V.id],xe=V.viewport||le;pe.setSize(xe.z*P.transmissionResolutionScale,xe.w*P.transmissionResolutionScale);const fe=P.getRenderTarget(),Ee=P.getActiveCubeFace(),Ce=P.getActiveMipmapLevel();P.setRenderTarget(pe),P.getClearColor(ht),Qe=P.getClearAlpha(),Qe<1&&P.setClearColor(16777215,.5),P.clear(),gt&&Fe.render(G);const Ve=P.toneMapping;P.toneMapping=fi;const We=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),A.setupLightsView(V),et===!0&&be.setGlobalState(P.clippingPlanes,V),Fa(y,G,V),W.updateMultisampleRenderTarget(pe),W.updateRenderTargetMipmap(pe),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let lt=0,Ot=U.length;lt<Ot;lt++){const It=U[lt],{object:ut,geometry:rn,material:_e,group:xn}=It;if(_e.side===Gt&&ut.layers.test(V.layers)){const it=_e.side;_e.side=jt,_e.needsUpdate=!0,td(ut,G,V,rn,_e,xn),_e.side=it,_e.needsUpdate=!0,Le=!0}}Le===!0&&(W.updateMultisampleRenderTarget(pe),W.updateRenderTargetMipmap(pe))}P.setRenderTarget(fe,Ee,Ce),P.setClearColor(ht,Qe),We!==void 0&&(V.viewport=We),P.toneMapping=Ve}function Fa(y,U,G){const V=U.isScene===!0?U.overrideMaterial:null;for(let H=0,pe=y.length;H<pe;H++){const xe=y[H],{object:fe,geometry:Ee,group:Ce}=xe;let Ve=xe.material;Ve.allowOverride===!0&&V!==null&&(Ve=V),fe.layers.test(G.layers)&&td(fe,U,G,Ee,Ve,Ce)}}function td(y,U,G,V,H,pe){y.onBeforeRender(P,U,G,V,H,pe),y.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),H.onBeforeRender(P,U,G,V,y,pe),H.transparent===!0&&H.side===Gt&&H.forceSinglePass===!1?(H.side=jt,H.needsUpdate=!0,P.renderBufferDirect(G,U,V,H,y,pe),H.side=Un,H.needsUpdate=!0,P.renderBufferDirect(G,U,V,H,y,pe),H.side=Gt):P.renderBufferDirect(G,U,V,H,y,pe),y.onAfterRender(P,U,G,V,H,pe)}function Oa(y,U,G){U.isScene!==!0&&(U=Ft);const V=z.get(y),H=A.state.lights,pe=A.state.shadowsArray,xe=H.state.version,fe=ce.getParameters(y,H.state,pe,U,G,A.state.lightProbeGridArray),Ee=ce.getProgramCacheKey(fe);let Ce=V.programs;V.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?U.environment:null,V.fog=U.fog;const Ve=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;V.envMap=te.get(y.envMap||V.environment,Ve),V.envMapRotation=V.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,Ce===void 0&&(y.addEventListener("dispose",Qn),Ce=new Map,V.programs=Ce);let We=Ce.get(Ee);if(We!==void 0){if(V.currentProgram===We&&V.lightsStateVersion===xe)return id(y,fe),We}else fe.uniforms=ce.getUniforms(y),I!==null&&y.isNodeMaterial&&I.build(y,G,fe),y.onBeforeCompile(fe,P),We=ce.acquireProgram(fe,Ee),Ce.set(Ee,We),V.uniforms=fe.uniforms;const Le=V.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Le.clippingPlanes=be.uniform),id(y,fe),V.needsLights=C0(y),V.lightsStateVersion=xe,V.needsLights&&(Le.ambientLightColor.value=H.state.ambient,Le.lightProbe.value=H.state.probe,Le.directionalLights.value=H.state.directional,Le.directionalLightShadows.value=H.state.directionalShadow,Le.spotLights.value=H.state.spot,Le.spotLightShadows.value=H.state.spotShadow,Le.rectAreaLights.value=H.state.rectArea,Le.ltc_1.value=H.state.rectAreaLTC1,Le.ltc_2.value=H.state.rectAreaLTC2,Le.pointLights.value=H.state.point,Le.pointLightShadows.value=H.state.pointShadow,Le.hemisphereLights.value=H.state.hemi,Le.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Le.spotLightMatrix.value=H.state.spotLightMatrix,Le.spotLightMap.value=H.state.spotLightMap,Le.pointShadowMatrix.value=H.state.pointShadowMatrix),V.lightProbeGrid=A.state.lightProbeGridArray.length>0,V.currentProgram=We,V.uniformsList=null,We}function nd(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=il.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function id(y,U){const G=z.get(y);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.batchingColor=U.batchingColor,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.instancingMorph=U.instancingMorph,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function w0(y,U){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;M.setFromMatrixPosition(U.matrixWorld);for(let G=0,V=y.length;G<V;G++){const H=y[G];if(H.texture!==null&&H.boundingBox.containsPoint(M))return H}return null}function A0(y,U,G,V,H){U.isScene!==!0&&(U=Ft),W.resetTextureUnits();const pe=U.fog,xe=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?U.environment:null,fe=J===null?P.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Ke.workingColorSpace,Ee=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ce=te.get(V.envMap||xe,Ee),Ve=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,We=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Le=!!G.morphAttributes.position,lt=!!G.morphAttributes.normal,Ot=!!G.morphAttributes.color;let It=fi;V.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(It=P.toneMapping);const ut=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,rn=ut!==void 0?ut.length:0,_e=z.get(V),xn=A.state.lights;if(et===!0&&(Ye===!0||y!==re)){const xt=y===re&&V.id===Q;be.setState(V,y,xt)}let it=!1;V.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==xn.state.version||_e.outputColorSpace!==fe||H.isBatchedMesh&&_e.batching===!1||!H.isBatchedMesh&&_e.batching===!0||H.isBatchedMesh&&_e.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&_e.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&_e.instancing===!1||!H.isInstancedMesh&&_e.instancing===!0||H.isSkinnedMesh&&_e.skinning===!1||!H.isSkinnedMesh&&_e.skinning===!0||H.isInstancedMesh&&_e.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&_e.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&_e.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&_e.instancingMorph===!1&&H.morphTexture!==null||_e.envMap!==Ce||V.fog===!0&&_e.fog!==pe||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==be.numPlanes||_e.numIntersection!==be.numIntersection)||_e.vertexAlphas!==Ve||_e.vertexTangents!==We||_e.morphTargets!==Le||_e.morphNormals!==lt||_e.morphColors!==Ot||_e.toneMapping!==It||_e.morphTargetsCount!==rn||!!_e.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,_e.__version=V.version);let An=_e.currentProgram;it===!0&&(An=Oa(V,U,H),I&&V.isNodeMaterial&&I.onUpdateProgram(V,An,_e));let jn=!1,Vi=!1,Os=!1;const dt=An.getUniforms(),Bt=_e.uniforms;if(x.useProgram(An.program)&&(jn=!0,Vi=!0,Os=!0),V.id!==Q&&(Q=V.id,Vi=!0),_e.needsLights){const xt=w0(A.state.lightProbeGridArray,H);_e.lightProbeGrid!==xt&&(_e.lightProbeGrid=xt,Vi=!0)}if(jn||re!==y){x.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),dt.setValue(N,"projectionMatrix",y.projectionMatrix),dt.setValue(N,"viewMatrix",y.matrixWorldInverse);const Gi=dt.map.cameraPosition;Gi!==void 0&&Gi.setValue(N,At.setFromMatrixPosition(y.matrixWorld)),C.logarithmicDepthBuffer&&dt.setValue(N,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&dt.setValue(N,"isOrthographic",y.isOrthographicCamera===!0),re!==y&&(re=y,Vi=!0,Os=!0)}if(_e.needsLights&&(xn.state.directionalShadowMap.length>0&&dt.setValue(N,"directionalShadowMap",xn.state.directionalShadowMap,W),xn.state.spotShadowMap.length>0&&dt.setValue(N,"spotShadowMap",xn.state.spotShadowMap,W),xn.state.pointShadowMap.length>0&&dt.setValue(N,"pointShadowMap",xn.state.pointShadowMap,W)),H.isSkinnedMesh){dt.setOptional(N,H,"bindMatrix"),dt.setOptional(N,H,"bindMatrixInverse");const xt=H.skeleton;xt&&(xt.boneTexture===null&&xt.computeBoneTexture(),dt.setValue(N,"boneTexture",xt.boneTexture,W))}H.isBatchedMesh&&(dt.setOptional(N,H,"batchingTexture"),dt.setValue(N,"batchingTexture",H._matricesTexture,W),dt.setOptional(N,H,"batchingIdTexture"),dt.setValue(N,"batchingIdTexture",H._indirectTexture,W),dt.setOptional(N,H,"batchingColorTexture"),H._colorsTexture!==null&&dt.setValue(N,"batchingColorTexture",H._colorsTexture,W));const Hi=G.morphAttributes;if((Hi.position!==void 0||Hi.normal!==void 0||Hi.color!==void 0)&&D.update(H,G,An),(Vi||_e.receiveShadow!==H.receiveShadow)&&(_e.receiveShadow=H.receiveShadow,dt.setValue(N,"receiveShadow",H.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&U.environment!==null&&(Bt.envMapIntensity.value=U.environmentIntensity),Bt.dfgLUT!==void 0&&(Bt.dfgLUT.value=Dy()),Vi){if(dt.setValue(N,"toneMappingExposure",P.toneMappingExposure),_e.needsLights&&R0(Bt,Os),pe&&V.fog===!0&&we.refreshFogUniforms(Bt,pe),we.refreshMaterialUniforms(Bt,V,ee,ne,A.state.transmissionRenderTarget[y.id]),_e.needsLights&&_e.lightProbeGrid){const xt=_e.lightProbeGrid;Bt.probesSH.value=xt.texture,Bt.probesMin.value.copy(xt.boundingBox.min),Bt.probesMax.value.copy(xt.boundingBox.max),Bt.probesResolution.value.copy(xt.resolution)}il.upload(N,nd(_e),Bt,W)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(il.upload(N,nd(_e),Bt,W),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&dt.setValue(N,"center",H.center),dt.setValue(N,"modelViewMatrix",H.modelViewMatrix),dt.setValue(N,"normalMatrix",H.normalMatrix),dt.setValue(N,"modelMatrix",H.matrixWorld),V.uniformsGroups!==void 0){const xt=V.uniformsGroups;for(let Gi=0,Bs=xt.length;Gi<Bs;Gi++){const sd=xt[Gi];j.update(sd,An),j.bind(sd,An)}}return An}function R0(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function C0(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(y,U,G){const V=z.get(y);V.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),z.get(y.texture).__webglTexture=U,z.get(y.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:G,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,U){const G=z.get(y);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(y,U=0,G=0){J=y,X=U,k=G;let V=null,H=!1,pe=!1;if(y){const fe=z.get(y);if(fe.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(N.FRAMEBUFFER,fe.__webglFramebuffer),le.copy(y.viewport),ge.copy(y.scissor),Je=y.scissorTest,x.viewport(le),x.scissor(ge),x.setScissorTest(Je),Q=-1;return}else if(fe.__webglFramebuffer===void 0)W.setupRenderTarget(y);else if(fe.__hasExternalTextures)W.rebindTextures(y,z.get(y.texture).__webglTexture,z.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Ve=y.depthTexture;if(fe.__boundDepthTexture!==Ve){if(Ve!==null&&z.has(Ve)&&(y.width!==Ve.image.width||y.height!==Ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(y)}}const Ee=y.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(pe=!0);const Ce=z.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ce[U])?V=Ce[U][G]:V=Ce[U],H=!0):y.samples>0&&W.useMultisampledRTT(y)===!1?V=z.get(y).__webglMultisampledFramebuffer:Array.isArray(Ce)?V=Ce[G]:V=Ce,le.copy(y.viewport),ge.copy(y.scissor),Je=y.scissorTest}else le.copy(De).multiplyScalar(ee).floor(),ge.copy(St).multiplyScalar(ee).floor(),Je=He;if(G!==0&&(V=B),x.bindFramebuffer(N.FRAMEBUFFER,V)&&x.drawBuffers(y,V),x.viewport(le),x.scissor(ge),x.setScissorTest(Je),H){const fe=z.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,fe.__webglTexture,G)}else if(pe){const fe=U;for(let Ee=0;Ee<y.textures.length;Ee++){const Ce=z.get(y.textures[Ee]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ee,Ce.__webglTexture,G,fe)}}else if(y!==null&&G!==0){const fe=z.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,fe.__webglTexture,G)}Q=-1},this.readRenderTargetPixels=function(y,U,G,V,H,pe,xe,fe=0){if(!(y&&y.isWebGLRenderTarget)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=z.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&xe!==void 0&&(Ee=Ee[xe]),Ee){x.bindFramebuffer(N.FRAMEBUFFER,Ee);try{const Ce=y.textures[fe],Ve=Ce.format,We=Ce.type;if(y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!C.textureFormatReadable(Ve)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(We)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-V&&G>=0&&G<=y.height-H&&N.readPixels(U,G,V,H,ue.convert(Ve),ue.convert(We),pe)}finally{const Ce=J!==null?z.get(J).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(y,U,G,V,H,pe,xe,fe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=z.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&xe!==void 0&&(Ee=Ee[xe]),Ee)if(U>=0&&U<=y.width-V&&G>=0&&G<=y.height-H){x.bindFramebuffer(N.FRAMEBUFFER,Ee);const Ce=y.textures[fe],Ve=Ce.format,We=Ce.type;if(y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!C.textureFormatReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Le=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Le),N.bufferData(N.PIXEL_PACK_BUFFER,pe.byteLength,N.STREAM_READ),N.readPixels(U,G,V,H,ue.convert(Ve),ue.convert(We),0);const lt=J!==null?z.get(J).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,lt);const Ot=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await lg(N,Ot,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Le),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,pe),N.deleteBuffer(Le),N.deleteSync(Ot),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,U=null,G=0){const V=Math.pow(2,-G),H=Math.floor(y.image.width*V),pe=Math.floor(y.image.height*V),xe=U!==null?U.x:0,fe=U!==null?U.y:0;W.setTexture2D(y,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,xe,fe,H,pe),x.unbindTexture()},this.copyTextureToTexture=function(y,U,G=null,V=null,H=0,pe=0){let xe,fe,Ee,Ce,Ve,We,Le,lt,Ot;const It=y.isCompressedTexture?y.mipmaps[pe]:y.image;if(G!==null)xe=G.max.x-G.min.x,fe=G.max.y-G.min.y,Ee=G.isBox3?G.max.z-G.min.z:1,Ce=G.min.x,Ve=G.min.y,We=G.isBox3?G.min.z:0;else{const Bt=Math.pow(2,-H);xe=Math.floor(It.width*Bt),fe=Math.floor(It.height*Bt),y.isDataArrayTexture?Ee=It.depth:y.isData3DTexture?Ee=Math.floor(It.depth*Bt):Ee=1,Ce=0,Ve=0,We=0}V!==null?(Le=V.x,lt=V.y,Ot=V.z):(Le=0,lt=0,Ot=0);const ut=ue.convert(U.format),rn=ue.convert(U.type);let _e;U.isData3DTexture?(W.setTexture3D(U,0),_e=N.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(W.setTexture2DArray(U,0),_e=N.TEXTURE_2D_ARRAY):(W.setTexture2D(U,0),_e=N.TEXTURE_2D),x.activeTexture(N.TEXTURE0),x.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),x.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),x.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);const xn=x.getParameter(N.UNPACK_ROW_LENGTH),it=x.getParameter(N.UNPACK_IMAGE_HEIGHT),An=x.getParameter(N.UNPACK_SKIP_PIXELS),jn=x.getParameter(N.UNPACK_SKIP_ROWS),Vi=x.getParameter(N.UNPACK_SKIP_IMAGES);x.pixelStorei(N.UNPACK_ROW_LENGTH,It.width),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,It.height),x.pixelStorei(N.UNPACK_SKIP_PIXELS,Ce),x.pixelStorei(N.UNPACK_SKIP_ROWS,Ve),x.pixelStorei(N.UNPACK_SKIP_IMAGES,We);const Os=y.isDataArrayTexture||y.isData3DTexture,dt=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){const Bt=z.get(y),Hi=z.get(U),xt=z.get(Bt.__renderTarget),Gi=z.get(Hi.__renderTarget);x.bindFramebuffer(N.READ_FRAMEBUFFER,xt.__webglFramebuffer),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,Gi.__webglFramebuffer);for(let Bs=0;Bs<Ee;Bs++)Os&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,z.get(y).__webglTexture,H,We+Bs),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,z.get(U).__webglTexture,pe,Ot+Bs)),N.blitFramebuffer(Ce,Ve,xe,fe,Le,lt,xe,fe,N.DEPTH_BUFFER_BIT,N.NEAREST);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(H!==0||y.isRenderTargetTexture||z.has(y)){const Bt=z.get(y),Hi=z.get(U);x.bindFramebuffer(N.READ_FRAMEBUFFER,q),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,O);for(let xt=0;xt<Ee;xt++)Os?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Bt.__webglTexture,H,We+xt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Bt.__webglTexture,H),dt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Hi.__webglTexture,pe,Ot+xt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Hi.__webglTexture,pe),H!==0?N.blitFramebuffer(Ce,Ve,xe,fe,Le,lt,xe,fe,N.COLOR_BUFFER_BIT,N.NEAREST):dt?N.copyTexSubImage3D(_e,pe,Le,lt,Ot+xt,Ce,Ve,xe,fe):N.copyTexSubImage2D(_e,pe,Le,lt,Ce,Ve,xe,fe);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else dt?y.isDataTexture||y.isData3DTexture?N.texSubImage3D(_e,pe,Le,lt,Ot,xe,fe,Ee,ut,rn,It.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(_e,pe,Le,lt,Ot,xe,fe,Ee,ut,It.data):N.texSubImage3D(_e,pe,Le,lt,Ot,xe,fe,Ee,ut,rn,It):y.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,pe,Le,lt,xe,fe,ut,rn,It.data):y.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,pe,Le,lt,It.width,It.height,ut,It.data):N.texSubImage2D(N.TEXTURE_2D,pe,Le,lt,xe,fe,ut,rn,It);x.pixelStorei(N.UNPACK_ROW_LENGTH,xn),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,it),x.pixelStorei(N.UNPACK_SKIP_PIXELS,An),x.pixelStorei(N.UNPACK_SKIP_ROWS,jn),x.pixelStorei(N.UNPACK_SKIP_IMAGES,Vi),pe===0&&U.generateMipmaps&&N.generateMipmap(_e),x.unbindTexture()},this.initRenderTarget=function(y){z.get(y).__webglFramebuffer===void 0&&W.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?W.setTextureCube(y,0):y.isData3DTexture?W.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?W.setTexture2DArray(y,0):W.setTexture2D(y,0),x.unbindTexture()},this.resetState=function(){X=0,k=0,J=null,x.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}class Uy{constructor(e){this.target=e,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),document.addEventListener("pointerlockchange",this.onPointerLockChange)}held=new Set;pressed=new Set;released=new Set;mouseDX=0;mouseDY=0;buttons=new Set;locked=!1;dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("mouseup",this.onMouseUp),document.removeEventListener("pointerlockchange",this.onPointerLockChange)}isDown(e){return this.held.has(e)}wasPressed(e){return this.pressed.has(e)}wasReleased(e){return this.released.has(e)}isMouseDown(e=0){return this.buttons.has(e)}get pointerLocked(){return this.locked}consumeMouseDelta(e){return e.x=this.mouseDX,e.y=this.mouseDY,this.mouseDX=0,this.mouseDY=0,e}requestPointerLock(){if(this.locked)return;const e=this.target.requestPointerLock();e&&typeof e.catch=="function"&&e.catch(()=>{})}exitPointerLock(){this.locked&&document.exitPointerLock()}endFrame(){this.pressed.clear(),this.released.clear()}onKeyDown=e=>{e.repeat||(this.held.add(e.code),this.pressed.add(e.code)),e.code==="Tab"&&e.preventDefault()};onKeyUp=e=>{this.held.delete(e.code),this.released.add(e.code)};onBlur=()=>{this.held.clear(),this.buttons.clear(),this.mouseDX=0,this.mouseDY=0};onMouseMove=e=>{this.locked&&(this.mouseDX+=e.movementX,this.mouseDY+=e.movementY)};onMouseDown=e=>{this.buttons.add(e.button)};onMouseUp=e=>{this.buttons.delete(e.button)};onPointerLockChange=()=>{this.locked=document.pointerLockElement===this.target,this.locked||(this.mouseDX=0,this.mouseDY=0)}}const Qr=1/120,Fy=.25;class Oy{frameDelta=0;elapsed=0;alpha=0;last=performance.now()/1e3;accumulator=0;tick(e){const t=performance.now()/1e3,n=Math.min(t-this.last,Fy);for(this.last=t,this.frameDelta=n,this.accumulator+=n;this.accumulator>=Qr;)this.accumulator-=Qr,this.elapsed+=Qr,e(Qr);return this.alpha=this.accumulator/Qr,n}}function Zi(s,e,t){let n=Math.imul(s,374761393)+Math.imul(e,668265263)+Math.imul(t,1274126177);return n=n^n>>>13,n=Math.imul(n,1274126177),n=n^n>>>16,(n>>>0)/4294967295}function vc(s){return s*s*(3-2*s)}function ps(s,e,t){return s+(e-s)*t}function sl(s,e,t){const n=Math.floor(s),i=Math.floor(e),r=Math.floor(t),a=vc(s-n),o=vc(e-i),l=vc(t-r),c=Zi(n,i,r),h=Zi(n+1,i,r),u=Zi(n,i+1,r),d=Zi(n+1,i+1,r),f=Zi(n,i,r+1),p=Zi(n+1,i,r+1),v=Zi(n,i+1,r+1),g=Zi(n+1,i+1,r+1),m=ps(c,h,a),S=ps(u,d,a),E=ps(f,p,a),M=ps(v,g,a);return ps(ps(m,S,o),ps(E,M,o),l)}function Jh(s,e,t,n=4,i=.5,r=2){let a=0,o=1,l=0,c=s,h=e,u=t;for(let d=0;d<n;d++)a+=sl(c,h,u)*o,l+=o,o*=i,c*=r,h*=r,u*=r;return a/l}function Qm(s){let e=s>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const By={count:420,innerRadius:220,outerRadius:4500,minRadius:2.5,maxRadius:50,seed:4711,respawnDelay:25,maxDrift:6},ky=1.15,zy=1.15,Vy=14;function bf(s){return 1+Math.floor(s/Vy)}function Hy(s){const e=new Nu(1,3),t=e.attributes.position,n=new b;for(let i=0;i<t.count;i++){n.fromBufferAttribute(t,i).normalize();const r=sl(n.x*1.7+s,n.y*1.7+s,n.z*1.7+s),a=sl(n.x*4.3-s,n.y*4.3+s,n.z*4.3-s),o=sl(n.x*9.1+s,n.y*9.1-s,n.z*9.1+s),l=.72+r*.46+a*.16+o*.07;t.setXYZ(i,n.x*l,n.y*l,n.z*l)}return t.needsUpdate=!0,e.computeVertexNormals(),e.computeBoundingSphere(),e}class Gy extends Au{positions=[];rotations=[];axes=[];speeds=[];velocities=[];scales=[];hitpoints=[];maxHitpoints=[];respawn=[];options;rng;color=new se;tmpMatrix=new Se;tmpQuat=new mt;tmpScale=new b;tmpVec=new b;hit={index:-1,point:new b,distance:0,radius:0};constructor(e={}){const t={...By,...e};super(Hy(t.seed),new je({color:16777215,roughness:.95,metalness:.08}),t.count),this.name="AsteroidField",this.frustumCulled=!1,this.options=t,this.rng=Qm(t.seed);const n=this.rng,i=this.color,r=new $n;for(let a=0;a<t.count;a++){const o=n()*2-1,l=n()*Math.PI*2,c=Math.sqrt(Math.max(0,1-o*o)),h=t.innerRadius+(t.outerRadius-t.innerRadius)*Math.cbrt(n());this.positions.push(new b(Math.cos(l)*c,o*.45,Math.sin(l)*c).multiplyScalar(h));const u=Math.pow(n(),2.6);this.scales.push(t.minRadius+(t.maxRadius-t.minRadius)*u),r.set(n()*Math.PI*2,n()*Math.PI*2,n()*Math.PI*2),this.rotations.push(new mt().setFromEuler(r)),this.axes.push(new b(n()*2-1,n()*2-1,n()*2-1).normalize()),this.speeds.push((n()*2-1)*.25);const d=.3+n()*.5,f=n()*.12;i.setRGB(d*(1+f),d*(1+f*.5),d*(1-f*.35)),this.setColorAt(a,i);const p=bf(this.scales[a]);this.hitpoints.push(p),this.maxHitpoints.push(p),this.respawn.push(0),this.velocities.push(new b(n()*2-1,(n()*2-1)*.4,n()*2-1).normalize().multiplyScalar(t.maxDrift*Math.pow(n(),1.5)))}this.writeMatrices(),this.instanceColor&&(this.instanceColor.needsUpdate=!0)}update(e){for(let t=0;t<this.count;t++){if(this.hitpoints[t]<=0){this.respawn[t]-=e,this.respawn[t]<=0&&this.reseed(t);continue}this.tmpQuat.setFromAxisAngle(this.axes[t],this.speeds[t]*e),this.rotations[t].premultiply(this.tmpQuat).normalize(),this.drift(t,e)}this.writeMatrices()}isAlive(e){return this.hitpoints[e]>0}getIntegrity(e){return Math.max(this.hitpoints[e]/this.maxHitpoints[e],0)}getVelocity(e,t){return t.copy(this.velocities[e])}getRadius(e){return this.scales[e]*zy}getCenter(e,t){return t.copy(this.positions[e]).add(this.position)}hitSegment(e,t,n,i=0){let r=n,a=-1;for(let o=0;o<this.count;o++){if(this.hitpoints[o]<=0)continue;this.tmpVec.copy(this.positions[o]).add(this.position).sub(e);const l=this.tmpVec.dot(t),c=this.getRadius(o)+i;if(l<-c||l>r+c)continue;const h=this.tmpVec.lengthSq()-l*l,u=c*c;if(h>u)continue;const d=Math.sqrt(u-h),f=l-d,p=f<0?0:f;p>r||(r=p,a=o)}return a<0?null:(this.hit.index=a,this.hit.distance=r,this.hit.radius=this.getRadius(a),this.hit.point.copy(t).multiplyScalar(r).add(e),this.hit)}damage(e,t){return this.hitpoints[e]<=0||(this.hitpoints[e]-=t,this.hitpoints[e]>0)?!1:(this.hitpoints[e]=0,this.respawn[e]=this.options.respawnDelay,this.tmpMatrix.makeScale(0,0,0),this.setMatrixAt(e,this.tmpMatrix),this.instanceMatrix.needsUpdate=!0,!0)}drift(e,t){const n=this.positions[e],i=this.velocities[e];n.addScaledVector(i,t);const r=this.options.outerRadius*ky,a=n.length();if(a<=r||a===0)return;this.tmpVec.copy(n).divideScalar(a);const o=i.dot(this.tmpVec);o>0&&i.addScaledVector(this.tmpVec,-2*o)}reseed(e){const t=this.options,n=this.rng,i=n()*2-1,r=n()*Math.PI*2,a=Math.sqrt(Math.max(0,1-i*i)),o=t.innerRadius+(t.outerRadius-t.innerRadius)*Math.cbrt(n());this.positions[e].set(Math.cos(r)*a,i*.45,Math.sin(r)*a).multiplyScalar(o);const l=Math.pow(n(),2.6);this.scales[e]=t.minRadius+(t.maxRadius-t.minRadius)*l,this.hitpoints[e]=bf(this.scales[e]),this.maxHitpoints[e]=this.hitpoints[e],this.respawn[e]=0,this.velocities[e].set(n()*2-1,(n()*2-1)*.4,n()*2-1).normalize().multiplyScalar(t.maxDrift*Math.pow(n(),1.5));const c=.3+n()*.5,h=n()*.12;this.color.setRGB(c*(1+h),c*(1+h*.5),c*(1-h*.35)),this.setColorAt(e,this.color),this.instanceColor&&(this.instanceColor.needsUpdate=!0)}writeMatrices(){for(let e=0;e<this.count;e++){if(this.hitpoints[e]<=0)continue;const t=this.scales[e];this.tmpScale.set(t,t,t),this.tmpMatrix.compose(this.positions[e],this.rotations[e],this.tmpScale),this.setMatrixAt(e,this.tmpMatrix)}this.instanceMatrix.needsUpdate=!0}}const jr=1024,go=512;function Ti(s,e,t,n){return s.copy(e).lerp(t,Math.min(1,Math.max(0,n)))}function Wy(s){const e=document.createElement("canvas");e.width=jr,e.height=go;const t=e.getContext("2d"),n=t.createImageData(jr,go),i=n.data,r=new se(335946),a=new se(871034),o=new se(1933219),l=new se(12100209),c=new se(3107636),h=new se(7166514),u=new se(6051664),d=new se(15265522),f=new se,p=new se,v=s*13.37;for(let m=0;m<go;m++){const S=(.5-(m+.5)/go)*Math.PI,E=Math.cos(S),M=Math.sin(S);for(let w=0;w<jr;w++){const A=(w+.5)/jr*Math.PI*2,R=E*Math.cos(A),_=M,T=E*Math.sin(A),P=Jh(R*2.1+v,_*2.1+v,T*2.1+v,6,.52),L=Jh(R*3.4-v,_*3.4+v,T*3.4-v,3,.5);P<.47?Ti(p,r,a,(P-.36)/.11):P<.5?Ti(p,a,o,(P-.47)/.03):P<.52?Ti(p,o,l,(P-.5)/.02):P<.62?(Ti(f,h,c,L*1.4-.2),Ti(p,l,f,(P-.52)/.06)):P<.72?(Ti(f,h,c,L*1.4-.2),Ti(p,f,u,(P-.62)/.1)):Ti(p,u,d,(P-.72)/.08);const I=(Math.abs(S)-1.02)/.32+(L-.5)*.55;I>0&&(f.copy(p),Ti(p,f,d,I));const B=(m*jr+w)*4;i[B]=Math.round(p.r*255),i[B+1]=Math.round(p.g*255),i[B+2]=Math.round(p.b*255),i[B+3]=255}}t.putImageData(n,0,0);const g=new gn(e);return g.colorSpace=ft,g.anisotropy=4,g}function Xy(s){const n=document.createElement("canvas");n.width=768,n.height=384;const i=n.getContext("2d"),r=i.createImageData(768,384),a=r.data,o=s*7.77+51.3;for(let c=0;c<384;c++){const h=(.5-(c+.5)/384)*Math.PI,u=Math.cos(h),d=Math.sin(h);for(let f=0;f<768;f++){const p=(f+.5)/768*Math.PI*2,v=u*Math.cos(p),g=u*Math.sin(p),m=Jh(v*3+o,d*7+o,g*3+o,5,.55),S=Math.max(0,Math.min(1,(m-.5)/.22))**1.4,E=(c*768+f)*4;a[E]=255,a[E+1]=255,a[E+2]=255,a[E+3]=Math.round(S*235)}}i.putImageData(r,0,0);const l=new gn(n);return l.colorSpace=ft,l.anisotropy=4,l}class qy extends tn{radius;clouds;constructor(e){super(),this.name="Planet",this.radius=e.radius,this.position.copy(e.position);const t=new Te(new Kn(e.radius,128,64),new je({map:Wy(e.seed),roughness:.92,metalness:0}));t.name="PlanetSurface",this.add(t),this.clouds=new Te(new Kn(e.radius*1.012,96,48),new je({map:Xy(e.seed),transparent:!0,depthWrite:!1,roughness:1,metalness:0})),this.clouds.name="PlanetClouds",this.add(this.clouds);const n=new Te(new Kn(e.radius*1.045,96,48),new wt({uniforms:{uColor:new gl(new se(7320831)),uSunDir:new gl(e.sunDirection.clone().normalize())},vertexShader:`
          #include <common>
          #include <logdepthbuf_pars_vertex>
          varying vec3 vNormalW;
          varying vec3 vPosW;
          void main() {
            vNormalW = normalize(mat3(modelMatrix) * normal);
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vPosW = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
            #include <logdepthbuf_vertex>
          }
        `,fragmentShader:`
          #include <common>
          #include <logdepthbuf_pars_fragment>
          uniform vec3 uColor;
          uniform vec3 uSunDir;
          varying vec3 vNormalW;
          varying vec3 vPosW;
          void main() {
            #include <logdepthbuf_fragment>
            vec3 v = normalize(cameraPosition - vPosW);
            vec3 n = normalize(vNormalW);
            float rim = pow(clamp(1.0 - abs(dot(v, n)), 0.0, 1.0), 3.0);
            float lit = clamp(dot(n, uSunDir) * 0.75 + 0.35, 0.0, 1.0);
            float a = rim * lit;
            gl_FragColor = vec4(uColor * a * 1.6, a);
          }
        `,transparent:!0,blending:pn,side:jt,depthWrite:!1}));n.name="PlanetAtmosphere",this.add(n)}update(e){this.rotation.y+=e*.0025,this.clouds.rotation.y+=e*.0011}}const Mc=2e6;class Ky extends Lu{constructor(e=6e3,t=1337){const n=new Float32Array(e*3),i=new Float32Array(e*3),r=new Float32Array(e);let a=t>>>0;const o=()=>(a=Math.imul(a,1664525)+1013904223>>>0,a/4294967296);for(let h=0;h<e;h++){const u=o()*2-1,d=o()*Math.PI*2,f=Math.sqrt(Math.max(0,1-u*u));n[h*3+0]=Math.cos(d)*f*Mc,n[h*3+1]=u*Mc,n[h*3+2]=Math.sin(d)*f*Mc;const p=Math.pow(o(),2.2),v=.25+p*1.35,g=o()*2-1,m=Math.max(0,g),S=Math.max(0,-g);i[h*3+0]=v*(1+m*.25-S*.22),i[h*3+1]=v*(1-Math.abs(g)*.06),i[h*3+2]=v*(1-m*.35+S*.2),r[h]=1+p*2.6}const l=new Ut;l.setAttribute("position",new vt(n,3)),l.setAttribute("aColor",new vt(i,3)),l.setAttribute("aSize",new vt(r,1));const c=new wt({uniforms:{uPixelRatio:{value:1}},vertexShader:`
        attribute vec3 aColor;
        attribute float aSize;
        uniform float uPixelRatio;
        varying vec3 vColor;
        void main() {
          vColor = aColor;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uPixelRatio;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          float a = smoothstep(0.5, 0.08, d);
          if (a <= 0.001) discard;
          gl_FragColor = vec4(vColor, a);
        }
      `,transparent:!0,blending:pn,depthWrite:!1});super(l,c),this.name="Starfield",this.frustumCulled=!1,this.renderOrder=-1e3,this.matrixAutoUpdate=!0}setPixelRatio(e){this.material.uniforms.uPixelRatio.value=e}update(e){this.position.copy(e)}}const Sc=15e5;function Ef(s,e){const t=document.createElement("canvas");t.width=s,t.height=s;const n=t.getContext("2d"),i=n.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);for(const[a,o]of e)i.addColorStop(a,o);n.fillStyle=i,n.fillRect(0,0,s,s);const r=new gn(t);return r.colorSpace=ft,r}class $y extends tn{direction;light;constructor(e=new b(.42,.24,-1).normalize(),t=new se(16774112)){super(),this.name="Sun",this.direction=e.clone().normalize();const n=this.direction.clone().multiplyScalar(Sc),i=new Sa(new Tr({map:Ef(256,[[0,"rgba(255,255,255,1)"],[.28,"rgba(255,247,220,1)"],[.46,"rgba(255,214,140,0.55)"],[1,"rgba(255,180,90,0)"]]),color:16777215,blending:pn,transparent:!0,depthWrite:!1}));i.name="SunCore",i.position.copy(n),i.scale.setScalar(Sc*.055),this.add(i);const r=new Sa(new Tr({map:Ef(256,[[0,"rgba(255,242,215,0.9)"],[.1,"rgba(255,224,170,0.35)"],[.3,"rgba(255,194,115,0.09)"],[.65,"rgba(255,160,70,0.015)"],[1,"rgba(255,150,60,0)"]]),color:16777215,blending:pn,transparent:!0,depthWrite:!1}));r.name="SunHalo",r.position.copy(n),r.scale.setScalar(Sc*.28),this.add(r);const a=new Be;a.name="SunLightTarget",this.add(a),this.light=new Hm(t,3.2),this.light.name="SunLight",this.light.position.copy(this.direction).multiplyScalar(1e3),this.light.target=a,this.add(this.light);const o=new S_(1585743,525828,.18);o.name="SpaceFill",this.add(o)}update(e){this.position.copy(e)}}const _o=-4.6,wi=-.4,Cn=1.45,zn=1.95,Ai=2.6,ni=.75,ln=2.1,xo=5.8,Vn=1.7,Et=2.3,Ji=1,vo=2,kt=.08,Yy=new mn(1,1,1);function qe(s,e,t,n){const i=new Te(Yy,e);return i.name=s,i.scale.set(t[0],t[1],t[2]),i.position.set(n[0],n[1],n[2]),i}function Zy(){const s=new Be;s.name="ShipInterior";const e=new je({color:6975606,roughness:.62,metalness:.38}),t=new je({color:2830389,roughness:.88,metalness:.12}),n=new je({color:4673109,roughness:.75,metalness:.25}),i=new je({color:1843236,roughness:.5,metalness:.5}),r=new je({color:3817287,roughness:.85,metalness:.05}),a=new je({color:2304046,roughness:.95,metalness:0}),o=new je({color:529178,emissive:3787007,emissiveIntensity:1.2,roughness:.4}),l=new je({color:1708550,emissive:16753710,emissiveIntensity:1,roughness:.4}),c=new je({color:398106,emissive:2792150,emissiveIntensity:1.2,roughness:.6}),h=new Yn({color:11195647,transparent:!0,opacity:.09,roughness:.03,metalness:0,ior:1.45,clearcoat:1,clearcoatRoughness:.02,depthWrite:!1,side:Gt}),u=new Wt({color:16711935,wireframe:!0}),d=(I,B,q)=>qe(I,u,B,q),f=wi-_o,p=(_o+wi)/2,v=Ai-wi,g=(wi+Ai)/2,m=xo-Ai,S=(Ai+xo)/2;s.add(qe("CockpitFloor",t,[Cn*2,kt,f],[0,-kt/2,p])),s.add(qe("CockpitSillL",e,[.1,.62,f],[-Cn-.05,.31,p])),s.add(qe("CockpitSillR",e,[.1,.62,f],[Cn+.05,.31,p])),s.add(qe("CockpitNosePanel",e,[Cn*2+.2,.62,.1],[0,.31,_o-.05]));const E=new Te(new Kn(1,48,24,0,Math.PI*2,0,Math.PI/2),h);E.name="Canopy",E.scale.set(Cn+.07,1.34,f/2+.02),E.position.set(0,.6,p),E.renderOrder=2,s.add(E);const M=new ba(1,.022,8,40,Math.PI);[-1.15,-3.3].forEach((I,B)=>{const q=new Te(M,i);q.name=`CanopyRib${B}`,q.scale.set(Cn+.09,1.36,1),q.position.set(0,.6,I),s.add(q)});const w=(Cn*2-Ji)/2;s.add(qe("CockpitRearWallL",e,[w,ln,kt],[-1.95/2,ln/2,wi])),s.add(qe("CockpitRearWallR",e,[w,ln,kt],[(Ji+w)/2,ln/2,wi])),s.add(qe("CockpitRearLintel",e,[Ji,ln-vo,kt],[0,(ln+vo)/2,wi])),s.add(qe("SeatBase",r,[.5,.42,.55],[0,.21,-.95])),s.add(qe("SeatPan",a,[.62,.1,.62],[0,.47,-.95]));const A=qe("SeatBack",a,[.62,.86,.12],[0,.95,-.62]);A.rotation.x=.13,s.add(A),s.add(qe("SeatHeadrest",a,[.34,.24,.12],[0,1.46,-.55])),s.add(qe("SeatArmL",r,[.09,.08,.45],[-.37,.62,-.92])),s.add(qe("SeatArmR",r,[.09,.08,.45],[.37,.62,-.92])),s.add(qe("ConsoleBody",e,[1.7,.52,.55],[0,.26,-2.05]));const R=qe("ConsoleTop",i,[1.66,.06,.62],[0,.58,-2]);R.rotation.x=.42,s.add(R);for(let I=-1;I<=1;I++){const B=qe(`ConsolePanel${I+2}`,I===0?o:l,[.44,.02,.3],[I*.55,.62,-1.99]);B.rotation.x=.42,s.add(B)}for(const I of[-1,1]){const B=qe(I<0?"ConsoleSideL":"ConsoleSideR",e,[.5,.55,1.3],[I*1.15,.275,-1.7]);s.add(B),s.add(qe(I<0?"ConsoleSideLampL":"ConsoleSideLampR",c,[.36,.02,1],[I*1.15,.56,-1.7]))}s.add(qe("CorridorFloor",t,[ni*2+.2,kt,v],[0,-kt/2,g])),s.add(qe("CorridorCeiling",n,[ni*2+.2,kt,v],[0,ln+kt/2,g])),s.add(qe("CorridorWallL",e,[kt,ln,v],[-ni,ln/2,g])),s.add(qe("CorridorWallR",e,[kt,ln,v],[ni,ln/2,g])),s.add(qe("CorridorStripL",c,[.05,.02,v-.4],[-ni+.06,.02,g])),s.add(qe("CorridorStripR",c,[.05,.02,v-.4],[ni-.06,.02,g]));const _=(Vn*2-Ji)/2;s.add(qe("CabinFloor",t,[Vn*2,kt,m],[0,-kt/2,S])),s.add(qe("CabinCeiling",n,[Vn*2,kt,m],[0,Et+kt/2,S])),s.add(qe("CabinWallL",e,[kt,Et,m],[-Vn,Et/2,S])),s.add(qe("CabinWallR",e,[kt,Et,m],[Vn,Et/2,S])),s.add(qe("CabinWallRear",e,[Vn*2,Et,kt],[0,Et/2,xo])),s.add(qe("CabinFrontWallL",e,[_,Et,kt],[-2.2/2,Et/2,Ai])),s.add(qe("CabinFrontWallR",e,[_,Et,kt],[(Ji+_)/2,Et/2,Ai])),s.add(qe("CabinFrontLintel",e,[Ji,Et-vo,kt],[0,(Et+vo)/2,Ai])),s.add(qe("Bunk",a,[.78,.42,1.95],[-1.2,.21,4.35])),s.add(qe("BunkLamp",c,[.06,.02,1.6],[-.79,.44,4.35])),s.add(qe("Locker",e,[.6,1.8,.5],[1.3,.9,3.2])),s.add(qe("LockerPanel",o,[.02,.24,.3],[.99,1.3,3.2])),s.add(qe("Crate",i,[.6,.6,.6],[1.25,.3,5.3]));const T=[["LightCockpit",10405119,3,[0,1.6,-2.3],9],["LightConsole",6277375,1.4,[0,.95,-1.75],3],["LightCorridor",16766624,2.2,[0,1.8,1.1],7],["LightCabin",13624575,4,[0,2,4.2],9]];for(const[I,B,q,O,X]of T){const k=new Ns(B,q,X,2);k.name=I,k.position.set(O[0],O[1],O[2]),s.add(k)}const P=new Be;P.name="Seat_Pilot",P.position.set(0,1.22,-.95),s.add(P);const L=new Be;return L.name="Stand_Pilot",L.position.set(0,0,-.15),s.add(L),s.add(d("COL_Floor_Cockpit",[Cn*2+.2,.1,f],[0,-.05,p])),s.add(d("COL_Floor_Corridor",[ni*2,.1,v],[0,-.05,g])),s.add(d("COL_Floor_Cabin",[Vn*2,.1,m],[0,-.05,S])),s.add(d("COL_Ceiling_Cockpit",[Cn*2+.2,.1,f],[0,zn+.05,p])),s.add(d("COL_Ceiling_Corridor",[ni*2,.1,v],[0,ln+.05,g])),s.add(d("COL_Ceiling_Cabin",[Vn*2,.1,m],[0,Et+.05,S])),s.add(d("COL_Wall_Cockpit_L",[.1,zn,f],[-Cn-.05,zn/2,p])),s.add(d("COL_Wall_Cockpit_R",[.1,zn,f],[Cn+.05,zn/2,p])),s.add(d("COL_Wall_Cockpit_Front",[Cn*2+.2,zn,.1],[0,zn/2,_o-.05])),s.add(d("COL_Wall_CockpitRear_L",[w,zn,.1],[-1.95/2,zn/2,wi])),s.add(d("COL_Wall_CockpitRear_R",[w,zn,.1],[(Ji+w)/2,zn/2,wi])),s.add(d("COL_Wall_Corridor_L",[.1,ln,v],[-ni,ln/2,g])),s.add(d("COL_Wall_Corridor_R",[.1,ln,v],[ni,ln/2,g])),s.add(d("COL_Wall_CabinFront_L",[_,Et,.1],[-2.2/2,Et/2,Ai])),s.add(d("COL_Wall_CabinFront_R",[_,Et,.1],[(Ji+_)/2,Et/2,Ai])),s.add(d("COL_Wall_Cabin_L",[.1,Et,m],[-Vn,Et/2,S])),s.add(d("COL_Wall_Cabin_R",[.1,Et,m],[Vn,Et/2,S])),s.add(d("COL_Wall_Cabin_Rear",[Vn*2,Et,.1],[0,Et/2,xo])),s.add(d("COL_Seat",[.66,1.6,.8],[0,.8,-.9])),s.add(d("COL_Console",[1.7,.66,.62],[0,.33,-2.03])),s.add(d("COL_Console_L",[.5,.58,1.3],[-1.15,.29,-1.7])),s.add(d("COL_Console_R",[.5,.58,1.3],[1.15,.29,-1.7])),s.add(d("COL_Bunk",[.78,.44,1.95],[-1.2,.22,4.35])),s.add(d("COL_Locker",[.6,1.8,.5],[1.3,.9,3.2])),s.add(d("COL_Crate",[.62,.62,.62],[1.25,.31,5.3])),s}const Tf="Seat_Pilot",wf="Stand_Pilot",Jy="COL_";class Qy extends Be{interior;seat;stand;colliders=[];interiorListeners=new Set;constructor(e=Zy()){super(),this.name="Ship",this.interior=e,this.seat=e,this.stand=e,this.setInterior(e)}setInterior(e){this.interior.parent===this&&this.remove(this.interior),this.interior=e,this.add(e);const t=e.getObjectByName(Tf),n=e.getObjectByName(wf);if(!t)throw new Error(`ShipInterior: Marker "${Tf}" fehlt`);if(!n)throw new Error(`ShipInterior: Marker "${wf}" fehlt`);this.seat=t,this.stand=n,this.refreshColliders();for(const i of this.interiorListeners)i(e)}refreshColliders(){this.colliders=[],this.interior.traverse(e=>{e instanceof Te&&e.name.startsWith(Jy)&&(e.visible=!1,this.colliders.push(e))})}onInteriorChange(e){return this.interiorListeners.add(e),e(this.interior),()=>{this.interiorListeners.delete(e)}}getInterior(){return this.interior}getSeatPilot(){return this.seat}getStandPilot(){return this.stand}getCollisionMeshes(){return this.colliders}}function jy(){return{main:0,lateral:0,vertical:0,pitch:0,yaw:0,roll:0,afterburner:!1}}const e1={mass:15e3,mainThrust:12e4,retroThrust:6e4,lateralThrust:52500,verticalThrust:45e3,afterburnerFactor:4,pitchAccel:2.4,yawAccel:2,rollAccel:3.2,maxAngularVelocity:1.5,angularBrakeFactor:1.35,maxSetSpeed:500,maxSpeed:850,setSpeedStep:10,setSpeedRate:60,arcade:{turnRate:1.25,rollRate:2.2,turnSmoothing:.07,grip:.25,accel:70,brake:110,strafeSpeed:60,boostSpeed:780,boostAccel:160}},yc=["arcade","assist","newton"],Af={thrust:1,topSpeed:1,torque:1,yawBias:0,afterburner:!0},bc=.5,Mo=.01;function Zt(s,e,t){return s<e?e:s>t?t:s}class t1{constructor(e,t={}){this.ship=e,this.params={...e1,...t}}velocity=new b;angularVelocity=new b;inputs=jy();mode="arcade";setSpeed=0;fullStopActive=!1;arcadeSpeed=0;params;damage={...Af};invQuat=new mt;stepQuat=new mt;axis=new b;rotStep=new b;velLocal=new b;accelLocal=new b;velTarget=new b;getParams(){return this.params}setDamage(e){this.damage={...Af,...e}}getDamage(){return this.damage}get assistEnabled(){return this.mode!=="newton"}get isArcade(){return this.mode==="arcade"}getSpeed(){return this.velocity.length()}getForwardSpeed(){return this.axis.set(0,0,-1).applyQuaternion(this.ship.quaternion),this.velocity.dot(this.axis)}get fullStop(){return this.fullStopActive}adjustSetSpeed(e){e!==0&&(this.fullStopActive=!1),this.setSpeed=Zt(this.setSpeed+e,0,this.params.maxSetSpeed)}setSetSpeed(e){this.setSpeed=Zt(e,0,this.params.maxSetSpeed)}requestFullStop(){this.setSpeed=0,this.fullStopActive=!0}cancelFullStop(){this.fullStopActive=!1}cycleMode(){const e=yc[(yc.indexOf(this.mode)+1)%yc.length];return this.setMode(e),this.mode}setMode(e){e!==this.mode&&(this.mode=e,this.fullStopActive=!1,e==="arcade"&&(this.arcadeSpeed=Math.max(this.getForwardSpeed(),0),this.setSpeed=Zt(this.arcadeSpeed,0,this.params.maxSetSpeed)))}clearInputs(){const e=this.inputs;e.main=0,e.lateral=0,e.vertical=0,e.pitch=0,e.yaw=0,e.roll=0,e.afterburner=!1}update(e){if(this.mode==="arcade"){this.integrateArcadeRotation(e),this.integrateArcadeTranslation(e);return}this.integrateRotation(e),this.integrateTranslation(e)}integrateArcadeRotation(e){const t=this.params.arcade,n=this.inputs,i=this.angularVelocity,r=t.turnRate*this.damage.torque,a=t.rollRate*this.damage.torque,o=1-Math.exp(-e/Math.max(t.turnSmoothing,1e-4));i.x+=(Zt(n.pitch,-1,1)*r-i.x)*o,i.y+=(-Zt(n.yaw,-1,1)*r-i.y)*o,i.z+=(-Zt(n.roll,-1,1)*a-i.z)*o,this.applyRotationStep(e)}applyRotationStep(e){const t=this.angularVelocity;this.rotStep.set(t.x,t.y+this.damage.yawBias,t.z);const n=this.rotStep.length(),i=n*e;i<=1e-9||(this.axis.copy(this.rotStep).divideScalar(n),this.stepQuat.setFromAxisAngle(this.axis,i),this.ship.quaternion.multiply(this.stepQuat).normalize())}integrateArcadeTranslation(e){const t=this.params,n=t.arcade,i=this.inputs,r=this.damage,a=i.afterburner&&r.afterburner;a&&(this.fullStopActive=!1);const o=a?n.boostSpeed*r.topSpeed:this.fullStopActive?0:this.setSpeed*r.topSpeed,l=a?n.boostAccel*r.thrust:o>this.arcadeSpeed?n.accel*r.thrust:n.brake*r.thrust,c=o-this.arcadeSpeed;this.arcadeSpeed+=Zt(c,-l*e,l*e),this.fullStopActive&&Math.abs(this.arcadeSpeed)<bc&&(this.arcadeSpeed=0,this.fullStopActive=!1),this.velTarget.set(Zt(i.lateral,-1,1)*n.strafeSpeed*r.torque,Zt(i.vertical,-1,1)*n.strafeSpeed*r.torque,-this.arcadeSpeed),this.velTarget.applyQuaternion(this.ship.quaternion);const h=1-Math.exp(-e/Math.max(n.grip,1e-4));this.velocity.lerp(this.velTarget,h);const u=t.maxSpeed*r.topSpeed,d=this.velocity.length();d>u&&this.velocity.multiplyScalar(u/d),this.ship.position.addScaledVector(this.velocity,e)}integrateRotation(e){const t=this.params,n=this.inputs,i=this.angularVelocity,r=this.damage.torque;i.x=this.stepAxis(i.x,Zt(n.pitch,-1,1),t.pitchAccel*r,e),i.y=this.stepAxis(i.y,-Zt(n.yaw,-1,1),t.yawAccel*r,e),i.z=this.stepAxis(i.z,-Zt(n.roll,-1,1),t.rollAccel*r,e);const a=i.length();a>t.maxAngularVelocity&&i.multiplyScalar(t.maxAngularVelocity/a),this.applyRotationStep(e)}stepAxis(e,t,n,i){if(Math.abs(t)>Mo)return e+t*n*i;if(!this.assistEnabled)return e;const r=n*this.params.angularBrakeFactor*i;return Math.abs(e)<=r?0:e-Math.sign(e)*r}integrateTranslation(e){const t=this.params,n=this.inputs,i=this.damage,r=t.mainThrust/t.mass*i.thrust,a=t.retroThrust/t.mass*i.thrust,o=t.lateralThrust/t.mass*i.torque,l=t.verticalThrust/t.mass*i.torque,c=n.afterburner&&i.afterburner;c&&(this.fullStopActive=!1),this.invQuat.copy(this.ship.quaternion).invert(),this.velLocal.copy(this.velocity).applyQuaternion(this.invQuat);const h=this.accelLocal.set(0,0,0),u=this.fullStopActive,d=u||this.assistEnabled,f=u?0:-this.setSpeed*i.topSpeed;if(Math.abs(n.lateral)>Mo?h.x=Zt(n.lateral,-1,1)*o:d&&(h.x=Zt((0-this.velLocal.x)/e,-o,o)),Math.abs(n.vertical)>Mo?h.y=Zt(n.vertical,-1,1)*l:d&&(h.y=Zt((0-this.velLocal.y)/e,-l,l)),c)h.z=-r*t.afterburnerFactor;else if(this.assistEnabled||u)h.z=Zt((f-this.velLocal.z)/e,-r,a);else if(Math.abs(n.main)>Mo){const g=Zt(n.main,-1,1);h.z=g>0?-g*r:-g*a}u&&this.velocity.lengthSq()<bc*bc&&(this.velocity.set(0,0,0),h.set(0,0,0),this.fullStopActive=!1),h.applyQuaternion(this.ship.quaternion),this.velocity.addScaledVector(h,e);const p=t.maxSpeed*i.topSpeed,v=this.velocity.length();v>p&&this.velocity.multiplyScalar(p/v),this.ship.position.addScaledVector(this.velocity,e)}}function Rf(s,e){if(e===Z0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Xh||e===Tm){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Xh)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function n1(s){const e=new Map,t=new Map,n=s.clone();return jm(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function jm(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)jm(s.children[n],e.children[n],t)}class e0 extends Nr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new o1(t)}),this.register(function(t){return new l1(t)}),this.register(function(t){return new _1(t)}),this.register(function(t){return new x1(t)}),this.register(function(t){return new v1(t)}),this.register(function(t){return new h1(t)}),this.register(function(t){return new u1(t)}),this.register(function(t){return new d1(t)}),this.register(function(t){return new f1(t)}),this.register(function(t){return new a1(t)}),this.register(function(t){return new p1(t)}),this.register(function(t){return new c1(t)}),this.register(function(t){return new g1(t)}),this.register(function(t){return new m1(t)}),this.register(function(t){return new s1(t)}),this.register(function(t){return new Cf(t,$e.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Cf(t,$e.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new M1(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=pa.extractUrlBase(e);a=pa.resolveURL(c,this.path)}else a=pa.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new zm(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===t0){try{a[$e.KHR_BINARY_GLTF]=new S1(e)}catch(u){i&&i(u);return}r=JSON.parse(a[$e.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new N1(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case $e.KHR_MATERIALS_UNLIT:a[u]=new r1;break;case $e.KHR_DRACO_MESH_COMPRESSION:a[u]=new y1(r,this.dracoLoader);break;case $e.KHR_TEXTURE_TRANSFORM:a[u]=new b1;break;case $e.KHR_MESH_QUANTIZATION:a[u]=new E1;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function i1(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Vt(s,e,t){const n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const $e={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class s1{constructor(e){this.parser=e,this.name=$e.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new se(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],wn);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Hm(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Ns(h),c.distance=u;break;case"spot":c=new b_(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),ri(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class r1{constructor(){this.name=$e.KHR_MATERIALS_UNLIT}getMaterialType(){return Wt}extendParams(e,t,n){const i=[];e.color=new se(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],wn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,ft))}return Promise.all(i)}}class a1{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=Vt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class o1{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Vt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Vt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Me(r,r)}return Promise.all(i)}}class l1{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Vt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Vt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class c1{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Vt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Vt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class h1{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SHEEN}getMaterialType(e){return Vt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Vt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(t.sheenColor=new se(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],wn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,ft)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class u1{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Vt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Vt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class d1{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_VOLUME}getMaterialType(e){return Vt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Vt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const r=n.attenuationColor||[1,1,1];return t.attenuationColor=new se().setRGB(r[0],r[1],r[2],wn),Promise.all(i)}}class f1{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IOR}getMaterialType(e){return Vt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Vt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class p1{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Vt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Vt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const r=n.specularColorFactor||[1,1,1];return t.specularColor=new se().setRGB(r[0],r[1],r[2],wn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,ft)),Promise.all(i)}}class m1{constructor(e){this.parser=e,this.name=$e.EXT_MATERIALS_BUMP}getMaterialType(e){return Vt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Vt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}}class g1{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Vt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Vt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class _1{constructor(e){this.parser=e,this.name=$e.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class x1{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class v1{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class Cf{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class M1{constructor(e){this.name=$e.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Pn.TRIANGLES&&c.mode!==Pn.TRIANGLE_STRIP&&c.mode!==Pn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const p of u){const v=new Se,g=new b,m=new mt,S=new b(1,1,1),E=new Au(p.geometry,p.material,d);for(let M=0;M<d;M++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,M),l.SCALE&&S.fromBufferAttribute(l.SCALE,M),E.setMatrixAt(M,v.compose(g,m,S));for(const M in l)if(M==="_COLOR_0"){const w=l[M];E.instanceColor=new Kh(w.array,w.itemSize,w.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&p.geometry.setAttribute(M,l[M]);Be.prototype.copy.call(E,p),this.parser.assignFinalMaterial(E),f.push(E)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const t0="glTF",ea=12,Pf={JSON:1313821514,BIN:5130562};class S1{constructor(e){this.name=$e.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ea),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==t0)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ea,r=new DataView(e,ea);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===Pf.JSON){const c=new Uint8Array(e,ea+a,o);this.content=n.decode(c)}else if(l===Pf.BIN){const c=ea+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class y1{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=$e.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=Qh[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=Qh[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Mr[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const p in f.attributes){const v=f.attributes[p],g=l[p];g!==void 0&&(v.normalized=g)}u(f)},o,c,wn,d)})})}}class b1{constructor(){this.name=$e.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class E1{constructor(){this.name=$e.KHR_MESH_QUANTIZATION}}class n0 extends Lr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*c,v=p-c,g=-2*f+3*d,m=f-d,S=1-g,E=m-d+u;for(let M=0;M!==o;M++){const w=a[v+M+o],A=a[v+M+l]*h,R=a[p+M+o],_=a[p+M]*h;r[M]=S*w+E*A+g*R+m*_}return r}}const T1=new mt;class w1 extends n0{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return T1.fromArray(r).normalize().toArray(r),r}}const Pn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Mr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Lf={9728:zt,9729:Ct,9984:xm,9985:Qo,9986:ha,9987:Ui},If={33071:hi,33648:ol,10497:Fn},Ec={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Qh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Qi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},A1={CUBICSPLINE:void 0,LINEAR:_a,STEP:ga},Tc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function R1(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new je({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Un})),s.DefaultMaterial}function ms(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ri(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function C1(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function P1(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function L1(s){let e;const t=s.extensions&&s.extensions[$e.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+wc(t.attributes):e=s.indices+":"+wc(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+wc(s.targets[n]);return e}function wc(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function jh(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function I1(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const D1=new Se;class N1{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new i1,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new M_(this.options.manager):this.textureLoader=new w_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new zm(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return ms(r,o,i),ri(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[$e.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(pa.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=Ec[i.type],o=Mr[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new vt(c,a,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=Ec[i.type],c=Mr[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let v,g;if(f&&f!==u){const m=Math.floor(d/f),S="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let E=t.cache.get(S);E||(v=new c(o,m*f,i.count*f/h),E=new Im(v,f/h),t.cache.add(S,E)),g=new Ma(E,l,d%f/h,p)}else o===null?v=new c(i.count*l):v=new c(o,d,i.count*l),g=new vt(v,l,p);if(i.sparse!==void 0){const m=Ec.SCALAR,S=Mr[i.sparse.indices.componentType],E=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,w=new S(a[1],E,i.sparse.count*m),A=new c(a[2],M,i.sparse.count*l);o!==null&&(g=new vt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let R=0,_=w.length;R<_;R++){const T=w[R];if(g.setX(T,A[R*l]),l>=2&&g.setY(T,A[R*l+1]),l>=3&&g.setZ(T,A[R*l+2]),l>=4&&g.setW(T,A[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Lf[d.magFilter]||Ct,h.minFilter=Lf[d.minFilter]||Ui,h.wrapS=If[d.wrapS]||Fn,h.wrapT=If[d.wrapT]||Fn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==zt&&h.minFilter!==Ct,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(v){const g=new Xt(v);g.needsUpdate=!0,d(g)}),t.load(pa.resolveURL(u,r.path),p,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),ri(u,a),u.userData.mimeType=a.mimeType||I1(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[$e.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[$e.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[$e.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Pu,Nn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Cu,Nn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return je}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[$e.KHR_MATERIALS_UNLIT]){const u=i[$e.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new se(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],wn),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,ft)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Gt);const h=r.alphaMode||Tc.OPAQUE;if(h===Tc.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Tc.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Wt&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Me(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Wt&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Wt){const u=r.emissiveFactor;o.emissive=new se().setRGB(u[0],u[1],u[2],wn)}return r.emissiveTexture!==void 0&&a!==Wt&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,ft)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),ri(u,r),t.associations.set(u,{materials:e}),r.extensions&&ms(i,u,r),u})}createUniqueName(e){const t=ot.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[$e.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Df(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=L1(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[$e.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Df(new Ut,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?R1(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,p=h.length;f<p;f++){const v=h[f],g=a[f];let m;const S=c[f];if(g.mode===Pn.TRIANGLES||g.mode===Pn.TRIANGLE_STRIP||g.mode===Pn.TRIANGLE_FAN||g.mode===void 0)m=r.isSkinnedMesh===!0?new Xg(v,S):new Te(v,S),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===Pn.TRIANGLE_STRIP?m.geometry=Rf(m.geometry,Tm):g.mode===Pn.TRIANGLE_FAN&&(m.geometry=Rf(m.geometry,Xh));else if(g.mode===Pn.LINES)m=new Jg(v,S);else if(g.mode===Pn.LINE_STRIP)m=new ya(v,S);else if(g.mode===Pn.LINE_LOOP)m=new Qg(v,S);else if(g.mode===Pn.POINTS)m=new Lu(v,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&P1(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),ri(m,r),g.extensions&&ms(i,m,g),t.assignFinalMaterial(m),u.push(m)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&ms(i,u[0],r),u[0];const d=new tn;r.extensions&&ms(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new en(bu.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Pa(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ri(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new Se;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new wu(o,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],p=i.samplers[f.sampler],v=f.target,g=v.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,S=i.parameters!==void 0?i.parameters[p.output]:p.output;v.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",S)),c.push(p),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],p=u[2],v=u[3],g=u[4],m=[];for(let E=0,M=d.length;E<M;E++){const w=d[E],A=f[E],R=p[E],_=v[E],T=g[E];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();const P=n._createAnimationTracks(w,A,R,_,T);if(P)for(let L=0;L<P.length;L++)m.push(P[L])}const S=new f_(r,void 0,m);return ri(S,i),S})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,D1)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){const f=h.userData.pivot,p=u[0];h.pivot=new b().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new Nm:c.length>1?h=new tn:c.length===1?h=c[0]:h=new Be,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),ri(h,r),r.extensions&&ms(n,h,r),r.matrix!==void 0){const u=new Se;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new tn;n.name&&(r.name=i.createUniqueName(n.name)),ri(r,n),n.extensions&&ms(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++){const d=l[h];d.parent!==null?r.add(n1(d)):r.add(d)}const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Nn||d instanceof Xt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}Qi[r.path]===Qi.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let h;switch(Qi[r.path]){case Qi.weights:h=Ea;break;case Qi.rotation:h=Ta;break;case Qi.translation:case Qi.scale:h=ml;break;default:switch(n.itemSize){case 1:h=Ea;break;case 2:case 3:default:h=ml;break}break}const u=i.interpolation!==void 0?A1[i.interpolation]:_a,d=this._getArrayFromAccessor(n);for(let f=0,p=l.length;f<p;f++){const v=new h(l[f]+"."+Qi[r.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),a.push(v)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=jh(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Ta?w1:n0;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function U1(s,e,t){const n=e.attributes,i=new zi;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new b(l[0],l[1],l[2]),new b(c[0],c[1],c[2])),o.normalized){const h=jh(Mr[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new b,l=new b;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){const v=jh(Mr[d.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new xi;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Df(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(const a in n){const o=Qh[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Ke.workingColorSpace!==wn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),ri(s,e),U1(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?C1(s,e.targets,t):s})}const Tn=256,Nf={ink:"#ffffff",dim:"#4e4e4e",base:"#7d7d7d"};function F1(s){const e=document.createElement("canvas");e.width=Tn,e.height=Tn;const t=e.getContext("2d");if(!t)throw new Error("2D-Context fuer Screen-Textur nicht verfuegbar");return t.fillStyle=s.base,t.fillRect(0,0,Tn,Tn),[e,t]}function O1(s){s.fillStyle="rgba(0,0,0,0.16)";for(let e=0;e<Tn;e+=6)s.fillRect(0,e,Tn,2)}function B1(s,e){const t=Tn/2;s.strokeStyle=e.dim,s.lineWidth=2;for(const i of[30,60,90,118])s.beginPath(),s.arc(t,t,i,0,Math.PI*2),s.stroke();s.beginPath(),s.moveTo(t,8),s.lineTo(t,Tn-8),s.moveTo(8,t),s.lineTo(Tn-8,t),s.stroke();const n=s.createLinearGradient(t,t,Tn,40);n.addColorStop(0,"rgba(255,255,255,0.6)"),n.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=n,s.beginPath(),s.moveTo(t,t),s.arc(t,t,118,-1.2,-.5),s.closePath(),s.fill(),s.fillStyle=e.ink;for(const[i,r,a]of[[168,84,5],[96,150,4],[190,176,3],[70,78,3]])s.beginPath(),s.arc(i,r,a,0,Math.PI*2),s.fill()}function k1(s,e){const t=["PWR","SHD","FUEL","ENG","CARGO","O2"],n=[.92,.74,.61,.88,.35,.97];s.font="bold 20px monospace",s.textBaseline="middle",t.forEach((i,r)=>{const a=28+r*38;s.fillStyle=e.dim,s.fillText(i,12,a),s.fillRect(96,a-10,148,20),s.fillStyle=e.ink,s.fillRect(96,a-10,148*n[r],20)})}function z1(s,e){const t=["NAV LINK  OK","JUMP DRV  IDLE","","SECTOR   TROJA-4","BEARING  114.6","RANGE    8.42 KM","","CARGO    12 / 40 T","CREDITS  4 180"];s.font="19px monospace",s.textBaseline="top",t.forEach((n,i)=>{s.fillStyle=i<2?e.ink:e.dim,s.fillText(n,14,14+i*26)}),s.fillStyle=e.ink,s.fillRect(14,14+t.length*26,14,18)}function V1(s,e){s.strokeStyle=e.dim,s.lineWidth=3;for(let t=0;t<9;t++){const n=20+t*26,i=t%2===0?96:56;s.beginPath(),s.moveTo(Tn/2-i,n),s.lineTo(Tn/2+i,n),s.stroke()}s.strokeStyle=e.ink,s.lineWidth=5,s.beginPath(),s.moveTo(28,150),s.lineTo(Tn-28,122),s.stroke()}const H1={radar:B1,bars:k1,text:z1,ladder:V1};function G1(s){const[e,t]=F1(Nf);H1[s](t,Nf),O1(t);const n=new gn(e);return n.colorSpace=ft,n.magFilter=Ct,n.anisotropy=4,n.flipY=!1,n}const Ar=2,tt=512,Uf=new Map;function W1(s,e){const t=`${s}:${e}`,n=Uf.get(t);if(n)return n;const i=new Float32Array(s*s);for(let r=0;r<i.length;r++){const a=Math.sin(r%s*127.1+Math.floor(r/s)*311.7+e*74.7)*43758.5453;i[r]=a-Math.floor(a)}return Uf.set(t,i),i}function X1(s,e,t,n){const i=W1(t,n),r=Math.floor(s),a=Math.floor(e),o=s-r,l=e-a,c=(r%t+t)%t,h=(a%t+t)%t,u=(c+1)%t,d=(h+1)%t,f=i[h*t+c],p=i[h*t+u],v=i[d*t+c],g=i[d*t+u],m=o*o*(3-2*o),S=l*l*(3-2*l);return(f*(1-m)+p*m)*(1-S)+(v*(1-m)+g*m)*S}function eu(s,e,t,n,i){let r=0,a=.5,o=0,l=1;for(let c=0;c<t;c++)r+=X1(s*l,e*l,Math.max(2,Math.round(n*l)),i+c)*a,o+=a,a*=.5,l*=2;return r/o}function So(s,e){const t=tt/e,n=s%t;return Math.min(n,t-n)}function q1(s){const e=new Float32Array(tt*tt),t=s==="grate"?16:2,n=tt/8;for(let i=0;i<tt;i++)for(let r=0;r<tt;r++){let o=.55+(eu(r/24,i/24,4,tt/24,s==="worn"?7:3)-.5)*(s==="worn"?.12:.06);const l=Math.min(So(r,t),So(i,t));if(s==="grate"){const c=tt/t,h=r%c-c/2,u=i%c-c/2,d=Math.hypot(h,u)/(c*.36);d<1&&(o-=(1-d*d)*.55)}else if(l<3&&(o-=(1-l/3)*.22),l<4){const h=So(r,t)<So(i,t)?i:r,u=Math.abs(h%n-n/2);u<1.6&&(o+=(1-u/1.6)*.16)}if(s==="worn"){const c=eu((r+i*.35)/3,i/90,2,tt/3,21);c>.8&&(o-=(c-.8)*.5)}e[i*tt+r]=Math.min(Math.max(o,0),1)}return e}function Ac(s,e){const t=document.createElement("canvas");t.width=tt,t.height=tt;const n=t.getContext("2d");if(!n)throw new Error("2D-Context fuer Oberflaechentextur nicht verfuegbar");n.putImageData(new ImageData(s,tt,tt),0,0);const i=new gn(t);return i.wrapS=Fn,i.wrapT=Fn,i.anisotropy=8,e&&(i.colorSpace=ft),i}function _l(s){const e=q1(s),t=new Uint8ClampedArray(tt*tt*4),n=new Uint8ClampedArray(tt*tt*4),i=new Uint8ClampedArray(tt*tt*4),r=s==="grate"?4:2.2;for(let a=0;a<tt;a++)for(let o=0;o<tt;o++){const l=a*tt+o,c=e[l],h=eu(o/60,a/60,3,tt/60,s==="worn"?11:5),u=.78+c*.2+(h-.5)*.18,d=Math.round(Math.min(Math.max(u,0),1)*255);t[l*4]=d,t[l*4+1]=d,t[l*4+2]=d,t[l*4+3]=255;const f=.86+(1-c)*.18+(h-.5)*.16,p=Math.round(Math.min(Math.max(f,0),1)*255);n[l*4]=p,n[l*4+1]=p,n[l*4+2]=p,n[l*4+3]=255;const v=e[a*tt+(o-1+tt)%tt],g=e[a*tt+(o+1)%tt],m=e[(a-1+tt)%tt*tt+o],S=e[(a+1)%tt*tt+o],E=(v-g)*r,M=(m-S)*r,w=Math.hypot(E,M,1);i[l*4]=Math.round((E/w*.5+.5)*255),i[l*4+1]=Math.round((M/w*.5+.5)*255),i[l*4+2]=Math.round(1/w*.5*255+127.5),i[l*4+3]=255}return{map:Ac(t,!0),roughnessMap:Ac(n,!1),normalMap:Ac(i,!1)}}const K1=[[[0,2.14,-4.3],.95,2.1,16764826,.05],[[0,2.14,-2.1],1,2.1,16767152,.05],[[0,1.94,.1],.42,1.9,16765600,.04],[[0,2.14,2.05],.85,2.1,11127039,.04]],$1=2.2,Y1=`
  varying vec3 vNormalView;
  varying vec3 vPositionView;
  varying float vHeight;

  void main() {
    // uv.y laeuft am Kegelmantel von unten (0) nach oben (1).
    vHeight = uv.y;
    vNormalView = normalize(normalMatrix * normal);
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vPositionView = viewPosition.xyz;
    gl_Position = projectionMatrix * viewPosition;
  }
`,Z1=`
  uniform vec3 uColor;
  uniform float uStrength;
  uniform float uNearFade;

  varying vec3 vNormalView;
  varying vec3 vPositionView;
  varying float vHeight;

  void main() {
    // Nach unten hin duenner werdender Strahl.
    float fade = pow(clamp(vHeight, 0.0, 1.0), 1.6);

    // Silhouette weich machen: flach getroffene Mantelflaechen bleiben hell,
    // die Kante zum Betrachter hin verschwindet.
    vec3 viewDirection = normalize(-vPositionView);
    float facing = abs(dot(normalize(vNormalView), viewDirection));
    float edge = smoothstep(0.0, 0.55, facing);

    // Nah an der Kamera ausblenden (siehe NEAR_FADE).
    float depth = smoothstep(0.0, uNearFade, -vPositionView.z);

    gl_FragColor = vec4(uColor, fade * edge * depth * uStrength);
  }
`;function J1(s){for(const[e,t,n,i,r]of K1){const a=new Iu(t,n,24,1,!0),o=new wt({uniforms:{uColor:{value:new se(i)},uStrength:{value:r},uNearFade:{value:$1}},vertexShader:Y1,fragmentShader:Z1,transparent:!0,depthWrite:!1,blending:pn,side:jt}),l=new Te(a,o);l.name="LightShaft",l.position.set(e[0],e[1]-n/2,e[2]),l.castShadow=!1,l.receiveShadow=!1,s.add(l)}}const Ff="ShipInterior",i0="Glass",Q1=["Seat_Pilot","Stand_Pilot"],j1=[["Light_Bay_Aft",16764826,1.15,[0,2.05,-4.3],6],["Light_Bay_Fore",16767152,1.3,[0,2.05,-2.1],6],["Light_Bench",10474751,.16,[-1.25,1.45,-1.85],2.2],["Light_Bunk",16758903,.14,[-1.75,1.35,-3.55],2],["Light_Corridor",16765600,1,[0,1.86,.1],4.5],["Light_Cr_Screen",16756316,.1,[-.45,1.35,.35],1.3],["Light_Cockpit",11127039,1.05,[0,2.05,2.05],7],["Light_Console",16756832,.4,[0,1.3,3.85],2.6]],eb=1.25,tb=new Set(["Light_Cockpit","Light_Corridor","Light_Bay_Fore"]),Of=1024,nb={Paint_Beige:"panel",Paint_Olive:"panel",Paint_Worn:"worn",Metal_Bare:"worn",Metal_Dark:"panel",Metal_Rust:"worn",Floor_Tread:"grate",Hazard:"worn"},Bf=.55,kf=[.137,.081],ib={Paint_Beige:{color:9076584,metalness:.04,roughness:.62},Paint_Olive:{color:5198914,metalness:.05,roughness:.68},Paint_Worn:{color:7235158,metalness:.07,roughness:.78},Metal_Bare:{color:9146261,metalness:.9,roughness:.42},Metal_Dark:{color:3356218,metalness:.85,roughness:.55},Metal_Rust:{color:8013094,metalness:.08,roughness:.9},Floor_Tread:{color:4868678,metalness:.8,roughness:.55},Rubber_Black:{color:1710618,metalness:0,roughness:.94},Fabric_Seat:{color:3814443,metalness:0,roughness:.95},Hazard:{color:12818986,metalness:0,roughness:.62}},sb={SM_Screen_MFD0:"bars",SM_Screen_MFD1:"radar",SM_Screen_MFD2:"text",SM_Screen_Overhead:"ladder",SM_Screen_Corridor:"text",SM_Screen_Bench:"bars"},s0=.0015,rb=1e-4,zf=.01,ab=4,ob=new b(0,1.15,0),r0=1,a0=.6,lb={Screen_Amber:.34,Screen_Green:.3,Lamp_Warm:.22,Lamp_Red:.4};function cb(s){for(const[e,t,n,i,r]of j1){const a=new Ns(t,n,r,eb);a.name=e,a.position.set(i[0],i[1],i[2]),tb.has(e)&&(a.castShadow=!0,a.shadow.mapSize.set(Of,Of),a.shadow.camera.near=.1,a.shadow.camera.far=r,a.shadow.bias=-.002,a.shadow.normalBias=.035),s.add(a)}}function hb(s,e){const t=new Set;s.traverse(n=>{if(!(n instanceof Te))return;const i=Array.isArray(n.material)?n.material:[n.material];for(const r of i){if(!r||t.has(r))continue;t.add(r);const a=r.name===i0;if(r.side=a?Gt:Un,a&&(r.depthWrite=!1),r instanceof je){e&&(r.envMap=e,r.envMapIntensity=a?a0:r0);const o=lb[r.name];o!==void 0&&(r.emissiveIntensity*=o)}r.needsUpdate=!0}})}const Dt=new b,rs=new b;function o0(s,e){const t=s.geometry.getAttribute("normal");if(!t||t.count===0)return null;e.fromBufferAttribute(t,0).normalize();for(let i=1;i<t.count;i++)if(Dt.fromBufferAttribute(t,i).normalize(),e.dot(Dt)<.999)return null;s.geometry.computeBoundingBox();const n=s.geometry.boundingBox;return n&&(n.getCenter(Dt),e.dot(Dt.subVectors(ob,Dt))<0&&e.negate()),e}function ub(s){s.traverse(e=>{if(!(e instanceof Te)||e.name.startsWith("COL_")||!o0(e,rs))return;e.position.addScaledVector(rs,s0);const t=Array.isArray(e.material)?e.material:[e.material];for(const n of t)n.side=Gt})}function db(s){const e=[];s.traverse(n=>{!(n instanceof Te)||n.name.startsWith("COL_")||(n.geometry.computeBoundingBox(),n.geometry.boundingBox&&e.push(n))});const t=n=>(n.getSize(Dt),Math.max(Dt.x,1e-4)*Math.max(Dt.y,1e-4)*Math.max(Dt.z,1e-4));for(let n=0;n<ab;n++){const i=e.map(o=>o.geometry.boundingBox.clone().translate(o.position)),r=new Map,a=(o,l,c)=>{let h=r.get(o);h||r.set(o,h=new Map);let u=h.get(l);u||h.set(l,u=new Set),u.add(c)};for(let o=0;o<e.length;o++)for(let l=o+1;l<e.length;l++)for(let c=0;c<3;c++)if(!(Vf(i[o],i[l],(c+1)%3)<zf)&&!(Vf(i[o],i[l],(c+2)%3)<zf))for(const[h,u]of[["min",-1],["max",1]]){const d=i[o][h].getComponent(c),f=i[l][h].getComponent(c);Math.abs(d-f)>rb||a(t(i[o])<=t(i[l])?o:l,c,u)}if(r.size===0)return;for(const[o,l]of r)for(const[c,h]of l){if(h.size!==1)continue;const u=e[o].position;u.setComponent(c,u.getComponent(c)+[...h][0]*s0)}}}function Vf(s,e,t){return Math.min(s.max.getComponent(t),e.max.getComponent(t))-Math.max(s.min.getComponent(t),e.min.getComponent(t))}function fb(s,e){const t=s.geometry,n=t.getAttribute("position"),i=Math.abs(e.y)>.85?new b(0,0,Math.sign(e.y)):new b(0,1,0),r=new b().crossVectors(i,e).normalize(),a=new b().crossVectors(r,e).normalize();let o=1/0,l=-1/0,c=1/0,h=-1/0;for(let p=0;p<n.count;p++){Dt.fromBufferAttribute(n,p);const v=Dt.dot(r),g=Dt.dot(a);o=Math.min(o,v),l=Math.max(l,v),c=Math.min(c,g),h=Math.max(h,g)}const u=Math.max(l-o,1e-6),d=Math.max(h-c,1e-6),f=new Float32Array(n.count*2);for(let p=0;p<n.count;p++)Dt.fromBufferAttribute(n,p),f[p*2]=(Dt.dot(r)-o)/u,f[p*2+1]=(Dt.dot(a)-c)/d;t.setAttribute("uv",new vt(f,2))}function pb(s){s.traverse(e=>{!(e instanceof Te)||e.name.startsWith("COL_")||(e.castShadow=!0,e.receiveShadow=!0)})}function mb(s){const e=new Set;s.traverse(t=>{if(!(t instanceof Te)||t.name.startsWith("COL_"))return;const n=Array.isArray(t.material)?t.material:[t.material];for(const i of n){if(!i||e.has(i))continue;e.add(i);const r=ib[i.name];!r||!(i instanceof je)||(i.color.setHex(r.color),i.metalness=r.metalness,i.roughness=r.roughness,i.needsUpdate=!0)}})}function gb(s){const e=s.geometry;if(e.getAttribute("uv"))return;const t=e.getAttribute("position"),n=e.getAttribute("normal");if(!t||!n)return;const i=new Float32Array(t.count*2);for(let r=0;r<t.count;r++){Dt.fromBufferAttribute(t,r),rs.fromBufferAttribute(n,r);const a=Math.abs(rs.x),o=Math.abs(rs.y),l=Math.abs(rs.z);let c,h;a>=o&&a>=l?(c=Dt.z,h=Dt.y):o>=l?(c=Dt.x,h=Dt.z):(c=Dt.x,h=Dt.y),i[r*2]=c/Ar+kf[0],i[r*2+1]=h/Ar+kf[1]}e.setAttribute("uv",new vt(i,2))}function _b(s){const e=new Map,t=i=>{let r=e.get(i);return r||e.set(i,r=_l(i)),r},n=new Set;s.traverse(i=>{if(!(i instanceof Te)||i.name.startsWith("COL_"))return;gb(i);const r=Array.isArray(i.material)?i.material:[i.material];for(const a of r){if(!a||n.has(a))continue;n.add(a);const o=nb[a.name];if(o===void 0||!(a instanceof je))continue;const l=t(o);a.map=l.map,a.roughnessMap=l.roughnessMap,a.normalMap=l.normalMap,a.normalScale.set(Bf,Bf),a.needsUpdate=!0}})}function xb(s){for(const[e,t]of Object.entries(sb)){const n=s.getObjectByName(e);if(!(n instanceof Te))continue;const i=Array.isArray(n.material)?n.material[0]:n.material;if(!(i instanceof je))continue;const r=o0(n,rs);fb(n,r??rs.set(0,1,0));const a=i.clone();a.name=`${i.name}_${e}`,a.emissiveMap=G1(t),a.side=r?Gt:Un,a.emissiveIntensity=i.emissiveIntensity*1.15,a.needsUpdate=!0,n.material=a}}function vb(s,e){const t=new Set;s.traverse(n=>{if(!(n instanceof Te))return;const i=Array.isArray(n.material)?n.material:[n.material];for(const r of i)!r||t.has(r)||!(r instanceof je)||(t.add(r),r.envMap=e,r.envMapIntensity=r.name===i0?a0:r0,r.needsUpdate=!0)})}async function Mb(s,e=null){const n=await new e0().loadAsync(s),i=n.scene.getObjectByName(Ff)??n.scene;i.name=Ff,i.removeFromParent(),i.rotation.y=Math.PI;for(const r of Q1){const a=i.getObjectByName(r);a&&(a.rotation.y=Math.PI)}return hb(i,e),mb(i),db(i),ub(i),_b(i),xb(i),pb(i),cb(i),J1(i),i}function Sb(){const s=new Tu,e=(n,i,r,a,o)=>{const l=new Te(new _i(n,i),new Wt({color:r,side:Gt}));return l.position.set(a[0],a[1],a[2]),l.rotation.set(o[0],o[1],o[2]),l},t=new Te(new mn(8,5,11),new Wt({color:new se(.035,.04,.05),side:jt}));s.add(t),s.add(e(8,11,new se(.015,.016,.02),[0,-2.45,0],[-Math.PI/2,0,0]));for(const n of[-1.7,1.7])s.add(e(.7,8,new se(1.35,1.15,.9),[n,2.45,0],[Math.PI/2,0,0]));return s.add(e(3.4,1.4,new se(.22,.5,.85),[0,-.2,-5.4],[0,0,0])),s.add(e(3.4,1.6,new se(.09,.08,.07),[0,.4,5.4],[0,0,0])),s}const yb=256;function bb(s,e,t){const n=new Bu(yb,{type:nn}),i=new Gm(.05,60,n);for(const o of i.children)o.layers.set(0);i.position.copy(t),i.updateMatrixWorld(!0),e.add(i),i.update(s,e),e.remove(i);const r=new wa(s),a=r.fromCubemap(n.texture).texture;return r.dispose(),n.dispose(),a}const Sn={speedUp:"KeyW",speedDown:"KeyS",rollLeft:"KeyQ",rollRight:"KeyE",strafeLeft:"KeyA",strafeRight:"KeyD",up:"ShiftLeft",down:"ControlLeft",fullStop:"KeyX",mode:"KeyV",afterburner:"Tab"},Eb={pixelsToFullDeflection:300,deadzone:.06,responseExponent:1.6,repeatDelay:.3,degreesPerPixel:.08,aimSmoothing:.035};class Tb{constructor(e,t,n={}){this.input=e,this.flight=t,this.options={...Eb,...n}}options;offset=new Me;mouseDelta={x:0,y:0};aimRate=new Me;holdTime=new Map;enabled=!0;get isEnabled(){return this.enabled}enable(){this.enabled||(this.enabled=!0,this.holdTime.clear())}disable(){this.enabled&&(this.enabled=!1,this.offset.set(0,0),this.aimRate.set(0,0),this.flight.clearInputs(),this.holdTime.clear())}getMouseOffset(){return this.offset}update(e){if(!this.enabled)return;this.updateMouse(e),this.updateSetSpeed(e);const t=this.flight.inputs;t.roll=this.axis(Sn.rollRight,Sn.rollLeft),t.lateral=this.axis(Sn.strafeRight,Sn.strafeLeft),t.vertical=this.axis(Sn.up,Sn.down),t.afterburner=this.input.isDown(Sn.afterburner),t.main=this.flight.assistEnabled?0:this.axis(Sn.speedUp,Sn.speedDown),this.input.wasPressed(Sn.mode)&&this.flight.cycleMode(),this.input.wasPressed(Sn.fullStop)&&this.flight.requestFullStop(),(t.lateral!==0||t.vertical!==0||t.main!==0)&&this.flight.cancelFullStop()}updateMouse(e){const t=this.flight.inputs;if(!this.input.pointerLocked){this.offset.set(0,0),t.pitch=0,t.yaw=0;return}this.input.consumeMouseDelta(this.mouseDelta),this.flight.isArcade?this.updateArcadeAim(e):this.updateVirtualStick()}updateArcadeAim(e){const t=Math.max(e,.001),n=1-Math.exp(-t/Math.max(this.options.aimSmoothing,1e-4));this.aimRate.x+=(this.mouseDelta.x/t-this.aimRate.x)*n,this.aimRate.y+=(this.mouseDelta.y/t-this.aimRate.y)*n;const i=this.flight.getParams().arcade.turnRate,r=bu.degToRad(this.options.degreesPerPixel)/i,a=Hf(this.aimRate.x*r,-1,1),o=Hf(-this.aimRate.y*r,-1,1),l=this.flight.inputs;l.yaw=a,l.pitch=o,this.offset.set(a,-o)}updateVirtualStick(){const e=1/this.options.pixelsToFullDeflection;this.offset.x+=this.mouseDelta.x*e,this.offset.y+=this.mouseDelta.y*e;const t=this.offset.length();t>1&&this.offset.multiplyScalar(1/t);const{deadzone:n,responseExponent:i}=this.options,r=Math.min(t,1);let a=0;r>n&&(a=Math.pow((r-n)/(1-n),i)/r);const o=this.flight.inputs;o.yaw=this.offset.x*a,o.pitch=-this.offset.y*a}updateSetSpeed(e){const t=this.stepFor(Sn.speedUp,e)-this.stepFor(Sn.speedDown,e);t!==0&&this.flight.assistEnabled&&this.flight.adjustSetSpeed(t)}stepFor(e,t){const n=this.flight.getParams();let i=this.input.wasPressed(e)?n.setSpeedStep:0;if(this.input.isDown(e)){const r=(this.holdTime.get(e)??0)+t;this.holdTime.set(e,r),r>this.options.repeatDelay&&(i+=n.setSpeedRate*t)}else this.holdTime.set(e,0);return i}axis(e,t){return(this.input.isDown(e)?1:0)-(this.input.isDown(t)?1:0)}}function Hf(s,e,t){return s<e?e:s>t?t:s}const Gf=new Se,Rc=new Se,wb=new b,yo=new mt,bo=new b,Eo=new b;class Ab{boxes=[];get obbs(){return this.boxes}rebuild(e,t){this.boxes.length=0,t.updateMatrixWorld(!0),Gf.copy(t.matrixWorld).invert();for(const n of e){const i=n.geometry;i.boundingBox||i.computeBoundingBox();const r=i.boundingBox;if(!r)continue;Rc.multiplyMatrices(Gf,n.matrixWorld),Rc.decompose(wb,yo,bo);const a=r.getCenter(new b).applyMatrix4(Rc),o=r.getSize(new b),l=new b(o.x*.5*Math.abs(bo.x),o.y*.5*Math.abs(bo.y),o.z*.5*Math.abs(bo.z)),c=[new b(1,0,0).applyQuaternion(yo),new b(0,1,0).applyQuaternion(yo),new b(0,0,1).applyQuaternion(yo)],h=new b(Math.abs(c[0].x)*l.x+Math.abs(c[1].x)*l.y+Math.abs(c[2].x)*l.z,Math.abs(c[0].y)*l.x+Math.abs(c[1].y)*l.y+Math.abs(c[2].y)*l.z,Math.abs(c[0].z)*l.x+Math.abs(c[1].z)*l.y+Math.abs(c[2].z)*l.z);this.boxes.push({center:a,half:l,axes:c,min:a.clone().sub(h),max:a.clone().add(h)})}}}function Rb(s,e,t,n){Eo.subVectors(e,s.center);const i=Eo.dot(s.axes[0]),r=Eo.dot(s.axes[1]),a=Eo.dot(s.axes[2]),o=Math.min(Math.max(i,-s.half.x),s.half.x),l=Math.min(Math.max(r,-s.half.y),s.half.y),c=Math.min(Math.max(a,-s.half.z),s.half.z),h=i-o,u=r-l,d=a-c,f=h*h+u*u+d*d;if(f>1e-12){if(f>=t*t)return!1;const E=Math.sqrt(f),M=t-E;return n.set(0,0,0),n.addScaledVector(s.axes[0],h/E),n.addScaledVector(s.axes[1],u/E),n.addScaledVector(s.axes[2],d/E),n.multiplyScalar(M),!0}let p=0,v=s.half.x-Math.abs(i),g=i>=0?1:-1;const m=s.half.y-Math.abs(r);m<v&&(p=1,v=m,g=r>=0?1:-1);const S=s.half.z-Math.abs(a);return S<v&&(p=2,v=S,g=a>=0?1:-1),n.copy(s.axes[p]).multiplyScalar(g*(v+t)),!0}const Cc=1.7,Ii=.3,To={forward:"KeyW",back:"KeyS",left:"KeyA",right:"KeyD"},Wf=2.5,Cb=16,Pb=22,Lb=9.81,Xf=.0022,qf=89*Math.PI/180,Kf=5,Ib=4,$f=1e-4,Yf=new $n(0,0,0,"YXZ");class Db{constructor(e,t){this.input=e,this.ship=t;const n=Cc-Ii;for(let i=0;i<Kf;i++){const r=i/(Kf-1);this.sphereHeights.push(Ii+r*(n-Ii))}}position=new b;velocity=new b;yaw=0;pitch=0;grounded=!1;collider=new Ab;mouseDelta={x:0,y:0};push=new b;sphere=new b;sphereHeights=[];rebuildCollision(){this.collider.rebuild(this.ship.getCollisionMeshes(),this.ship)}get colliderCount(){return this.collider.obbs.length}reset(e,t,n=0){this.position.copy(e),this.velocity.set(0,0,0),this.yaw=t,this.pitch=n,this.grounded=!1}updateLook(){this.input.consumeMouseDelta(this.mouseDelta),this.input.pointerLocked&&(this.yaw-=this.mouseDelta.x*Xf,this.pitch-=this.mouseDelta.y*Xf,this.pitch=Math.min(Math.max(this.pitch,-qf),qf))}update(e){this.integrateVelocity(e),this.position.x+=this.velocity.x*e,this.position.z+=this.velocity.z*e,this.resolve(!0),this.position.y+=this.velocity.y*e,this.grounded=!1,this.resolve(!1)}getEyePosition(e){return e.set(this.position.x,this.position.y+Cc,this.position.z)}getQuaternion(e){return Yf.set(this.pitch,this.yaw,0,"YXZ"),e.setFromEuler(Yf)}integrateVelocity(e){const t=(this.input.isDown(To.forward)?1:0)-(this.input.isDown(To.back)?1:0),n=(this.input.isDown(To.right)?1:0)-(this.input.isDown(To.left)?1:0),i=Math.sin(this.yaw),r=Math.cos(this.yaw);let a=-i*t+r*n,o=-r*t-i*n;const l=Math.hypot(a,o);l>1&&(a/=l,o/=l);const c=a*Wf,h=o*Wf,u=(l>0?Cb:Pb)*e,d=c-this.velocity.x,f=h-this.velocity.z,p=Math.hypot(d,f);p<=u||p===0?(this.velocity.x=c,this.velocity.z=h):(this.velocity.x+=d/p*u,this.velocity.z+=f/p*u),this.velocity.y=Math.max(this.velocity.y-Lb*e,-20)}resolve(e){const t=this.collider.obbs;if(t.length!==0)for(let n=0;n<Ib;n++){let i=!1;const r=this.position.x-Ii,a=this.position.x+Ii,o=this.position.y,l=this.position.y+Cc,c=this.position.z-Ii,h=this.position.z+Ii;for(const u of t)if(!(u.max.x<r||u.min.x>a)&&!(u.max.y<o||u.min.y>l)&&!(u.max.z<c||u.min.z>h))for(const d of this.sphereHeights){if(this.sphere.set(this.position.x,this.position.y+d,this.position.z),!Rb(u,this.sphere,Ii,this.push))continue;const f=Math.abs(this.push.x),p=Math.abs(this.push.y),v=Math.abs(this.push.z);(p>=f&&p>=v)!==e&&(i=!0,e?this.slideOut():this.stepOut())}if(!i)break}}slideOut(){const e=Math.hypot(this.push.x,this.push.z);if(e<1e-9)return;const t=this.push.x/e,n=this.push.z/e;this.position.x+=t*(e+$f),this.position.z+=n*(e+$f);const i=this.velocity.x*t+this.velocity.z*n;i<0&&(this.velocity.x-=i*t,this.velocity.z-=i*n)}stepOut(){this.position.y+=this.push.y,this.push.y>0?(this.grounded=!0,this.velocity.y<0&&(this.velocity.y=0)):this.velocity.y>0&&(this.velocity.y=0)}}const Nb=1.4,l0=1.2;class c0{items=[];add(e){return this.items.push(e),()=>this.remove(e)}remove(e){const t=this.items.indexOf(e);t>=0&&this.items.splice(t,1)}clear(){this.items.length=0}get count(){return this.items.length}findNearest(e){let t=null,n=1/0;for(const i of this.items){if(i.enabled&&!i.enabled())continue;const r=this.distanceTo(e,i),a=i.range??Nb;r>a||r>=n||(t=i,n=r)}return t}distanceTo(e,t){const n=e.x-t.position.x,i=e.y+l0-t.position.y,r=e.z-t.position.z;return Math.sqrt(n*n+i*i+r*r)}}function Ub(s){return typeof s.label=="function"?s.label():s.label}const Zf="KeyF",Fb=1.5,Ob=.5,Bb=3.5,Jf="F — AUFSTEHEN",kb="F — HINSETZEN",Qf="WASD — GEHEN · MAUS — UMSEHEN",ta=new Se,wo=new Se,Ao=new b,Pc=new b,jf=new $n(0,0,0,"YXZ");class zb{mode="seated";blend=1;blendPos=new b;blendQuat=new mt;infoTimer=0;seatLocal=new b;input;ship;camera;seated;walk;hud;interactables;constructor(e){this.input=e.input,this.ship=e.ship,this.camera=e.camera,this.seated=e.seated,this.walk=e.walk,this.hud=e.hud,this.interactables=e.interactables,this.refreshInterior()}getMode(){return this.mode}get isWalking(){return this.mode==="walking"}refreshInterior(){this.walk.rebuildCollision(),this.localPosition(this.ship.getSeatPilot(),this.seatLocal),this.mode==="seated"?(this.attachToSeat(),this.blend=1):(this.localPosition(this.ship.getStandPilot(),Ao),this.walk.reset(Ao,this.walk.yaw,this.walk.pitch))}update(e){this.blend<1&&(this.blend=Math.min(this.blend+e/Ob,1)),this.mode==="seated"?this.updateSeated():this.updateWalking(e)}fixedUpdate(e){this.mode==="walking"&&this.walk.update(e)}updateCamera(){const e=Vb(this.blend);this.mode==="walking"?(this.walk.getEyePosition(this.camera.position),this.walk.getQuaternion(this.camera.quaternion)):(this.camera.position.set(0,0,0),this.camera.quaternion.identity()),e<1&&(this.camera.position.lerp(this.blendPos,1-e),this.camera.quaternion.slerp(this.blendQuat,1-e))}updateSeated(){if(this.input.wasPressed(Zf)){this.standUp();return}this.hud.showPrompt(Jf)}updateWalking(e){this.walk.updateLook();const t=this.seatDistance(),n=this.interactables?.findNearest(this.walk.position)??null,i=n?this.interactables.distanceTo(this.walk.position,n):1/0,r=t<Fb&&t<=i,a=r?null:n;if(this.input.wasPressed(Zf)){if(r){this.sitDown();return}if(a){a.activate();return}}this.infoTimer>0&&(this.infoTimer-=e),r?this.hud.showPrompt(kb):a?this.hud.showPrompt(Ub(a)):this.infoTimer>0?this.hud.showPrompt(Qf):this.hud.hidePrompt()}seatDistance(){const e=this.walk.position.x-this.seatLocal.x,t=this.walk.position.z-this.seatLocal.z;return Math.hypot(e,t)}standUp(){this.seated.disable(),this.localMatrix(this.ship.getSeatPilot(),wo),wo.decompose(this.blendPos,this.blendQuat,Pc),jf.setFromQuaternion(this.blendQuat,"YXZ"),this.localPosition(this.ship.getStandPilot(),Ao),this.walk.rebuildCollision(),this.walk.reset(Ao,jf.y,0),this.ship.add(this.camera),this.camera.scale.set(1,1,1),this.mode="walking",this.blend=0,this.infoTimer=Bb,this.hud.setMode("walking"),this.hud.showPrompt(Qf)}sitDown(){ta.compose(this.camera.position,this.camera.quaternion,Pc.set(1,1,1)),this.localMatrix(this.ship.getSeatPilot(),wo),ta.premultiply(wo.invert()),ta.decompose(this.blendPos,this.blendQuat,Pc),this.ship.getSeatPilot().add(this.camera),this.camera.position.copy(this.blendPos),this.camera.quaternion.copy(this.blendQuat),this.camera.scale.set(1,1,1),this.mode="seated",this.blend=0,this.seated.enable(),this.hud.setMode("seated"),this.hud.showPrompt(Jf)}attachToSeat(){this.ship.getSeatPilot().add(this.camera),this.camera.position.set(0,0,0),this.camera.quaternion.identity(),this.camera.scale.set(1,1,1)}localMatrix(e,t){return this.ship.updateMatrixWorld(!0),t.copy(this.ship.matrixWorld).invert().multiply(e.matrixWorld),t}localPosition(e,t){return this.localMatrix(e,ta),t.setFromMatrixPosition(ta)}}function Vb(s){const e=Math.min(Math.max(s,0),1);return e*e*(3-2*e)}const Hb={arcade:"ARCADE",assist:"NEWTON · ASSIST",newton:"NEWTON · FREI"},h0={arcade:"ARCADE",assist:"ASSIST",newton:"NEWTON"},u0=.35,Gb=.6;class Wb{root;helper;damage;prompt;hint;speedValue;setValue;barFill;barSet;hullValue;killsValue;targetValue;assistChip;burnChip;mode="seated";helperOn=!1;lastSpeed=-1;lastSet=-1;lastMode="";lastKills=-1;lastHull=-1;lastTarget="";lastBurn=null;lastLocked=null;lastDamage=-1;constructor(e=document.body){this.root=document.createElement("div"),this.root.className="hud",this.root.innerHTML=`
      <div class="hud__helper" hidden>
        <div class="hud__panel">
          <div class="hud__row">
            <span class="hud__label">SPD</span>
            <span class="hud__value hud__value--big" data-speed>0 M/S</span>
          </div>
          <div class="hud__row">
            <span class="hud__label">SET</span>
            <span class="hud__value" data-set>0 M/S</span>
          </div>
          <div class="hud__bar">
            <div class="hud__bar-fill" data-fill></div>
            <div class="hud__bar-set" data-setmark></div>
          </div>
          <div class="hud__row">
            <span class="hud__label">HUELLE</span>
            <span class="hud__value" data-hull>100%</span>
          </div>
          <div class="hud__row">
            <span class="hud__label">ZIEL</span>
            <span class="hud__value" data-target>--</span>
          </div>
          <div class="hud__row">
            <span class="hud__label">KILLS</span>
            <span class="hud__value" data-kills>0</span>
          </div>
        </div>
        <div class="hud__status">
          <span class="hud__chip is-on" data-assist>ARCADE</span>
          <span class="hud__chip" data-burn>AB</span>
        </div>
      </div>

      <div class="hud__keys hud__keys--flight">MAUS/LEER FEUERN &middot; T ZIEL &middot; W/S SET SPEED &middot; Q/E ROLL &middot; A/D STRAFE &middot; SHIFT/CTRL LIFT &middot; X FULL STOP &middot; V FLUGMODUS &middot; TAB BURN &middot; H HILFSANZEIGE &middot; F AUFSTEHEN</div>
      <div class="hud__keys hud__keys--walk">W/A/S/D GEHEN &middot; MAUS UMSEHEN &middot; F AM SITZ HINSETZEN</div>
      <div class="hud__damage"></div>
      <div class="hud__prompt" hidden></div>
      <div class="hud__hint" hidden>KLICKEN ZUM STEUERN</div>
    `,e.appendChild(this.root),this.helper=this.require(".hud__helper"),this.damage=this.require(".hud__damage"),this.prompt=this.require(".hud__prompt"),this.hint=this.require(".hud__hint"),this.speedValue=this.require("[data-speed]"),this.setValue=this.require("[data-set]"),this.barFill=this.require("[data-fill]"),this.barSet=this.require("[data-setmark]"),this.hullValue=this.require("[data-hull]"),this.killsValue=this.require("[data-kills]"),this.targetValue=this.require("[data-target]"),this.assistChip=this.require("[data-assist]"),this.burnChip=this.require("[data-burn]"),window.addEventListener("keydown",this.onKeyDown)}dispose(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}setMode(e){this.mode!==e&&(this.mode=e,this.root.classList.toggle("hud--walking",e==="walking"),this.applyHelper())}getMode(){return this.mode}showPrompt(e){this.prompt.textContent!==e&&(this.prompt.textContent=e),this.prompt.hidden=!1}hidePrompt(){this.prompt.hidden=!0}setHelperVisible(e){this.helperOn=e,this.applyHelper()}isHelperVisible(){return this.helperOn}update(e){const t=Math.max(0,1-e.sinceImpact/Gb);Math.abs(t-this.lastDamage)>.01&&(this.lastDamage=t,this.damage.style.opacity=t.toFixed(3)),this.lastLocked!==e.pointerLocked&&(this.lastLocked=e.pointerLocked,this.hint.hidden=e.pointerLocked),this.helperOn&&this.mode==="seated"&&this.updateHelper(e)}updateHelper(e){const t=Math.round(e.speed);if(t!==this.lastSpeed){this.lastSpeed=t,this.speedValue.textContent=`${t} M/S`;const l=Math.min(e.speed/Math.max(e.maxSetSpeed,1),1)*100;this.barFill.style.width=`${l.toFixed(1)}%`}const n=Math.round(e.setSpeed);if(n!==this.lastSet){this.lastSet=n,this.setValue.textContent=`${n} M/S`;const l=n/Math.max(e.maxSetSpeed,1)*100;this.barSet.style.left=`${l.toFixed(1)}%`}const i=e.fullStop?"FULL STOP":Hb[e.mode];i!==this.lastMode&&(this.lastMode=i,this.assistChip.textContent=i,this.assistChip.classList.toggle("is-on",!e.fullStop&&e.mode!=="newton"),this.assistChip.classList.toggle("is-warn",e.fullStop));const r=Math.round(e.hull*100);r!==this.lastHull&&(this.lastHull=r,this.hullValue.textContent=`${r}%`,this.hullValue.classList.toggle("is-warn",e.hull<u0)),e.kills!==this.lastKills&&(this.lastKills=e.kills,this.killsValue.textContent=`${e.kills}`);const a=e.target,o=a?`${a.distance>=1e3?`${(a.distance/1e3).toFixed(2)} KM`:`${Math.round(a.distance)} M`} · ${Math.round(a.integrity*100)}%`:"--";o!==this.lastTarget&&(this.lastTarget=o,this.targetValue.textContent=o),e.afterburner!==this.lastBurn&&(this.lastBurn=e.afterburner,this.burnChip.textContent=e.afterburner?"AFTERBURNER":"AB",this.burnChip.classList.toggle("is-warn",e.afterburner))}applyHelper(){this.helper.hidden=!this.helperOn||this.mode==="walking",this.helper.hidden||(this.lastSpeed=-1,this.lastSet=-1,this.lastMode="",this.lastKills=-1,this.lastHull=-1,this.lastTarget="",this.lastBurn=null)}onKeyDown=e=>{e.code!=="KeyH"||e.repeat||this.setHelperVisible(!this.helperOn)};require(e){const t=this.root.querySelector(e);if(!t)throw new Error(`HUD: Element "${e}" fehlt`);return t}}const Xb=48;function qb(){const e=document.createElement("canvas");e.width=128,e.height=128;const t=e.getContext("2d");if(!t)throw new Error("2D-Context fuer Effekt-Textur nicht verfuegbar");const n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,0.75)"),n.addColorStop(.6,"rgba(255,255,255,0.18)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,128,128),new gn(e)}const Kb=new b,ep=new b;class $b extends tn{puffs=[];next=0;constructor(){super(),this.name="Effects",this.frustumCulled=!1;const e=qb();for(let t=0;t<Xb;t++){const n=new Sa(new Tr({map:e,blending:pn,depthWrite:!1,transparent:!0,opacity:0}));n.visible=!1,this.add(n),this.puffs.push({sprite:n,life:0,duration:1,velocity:new b,startSize:1,endSize:1})}}spawnImpact(e,t){this.spawn(e,null,.16,t*.5,t*1.8,12580095)}spawnExplosion(e,t,n){this.spawn(e,n,.22,t*2.2,t*4.5,16777215),this.spawn(e,n,.9,t*1.2,t*7,16760944);const i=9;for(let r=0;r<i;r++){const a=r/i*Math.PI*2,o=(r%3-1)*.7;ep.set(Math.cos(a),o,Math.sin(a)).normalize().multiplyScalar(t*(3.5+r%3)).add(n),this.spawn(e,ep,.7+r%3*.15,t*.6,t*.15,16752720)}}update(e){for(const t of this.puffs){if(t.life<=0)continue;if(t.life-=e,t.life<=0){t.sprite.visible=!1,t.sprite.material.opacity=0;continue}const n=1-t.life/t.duration;t.sprite.position.addScaledVector(t.velocity,e);const i=t.startSize+(t.endSize-t.startSize)*n;t.sprite.scale.set(i,i,1),t.sprite.material.opacity=Math.pow(1-n,1.8)}}shift(e){for(const t of this.puffs)t.life>0&&t.sprite.position.sub(e)}spawn(e,t,n,i,r,a){const o=this.puffs[this.next];this.next=(this.next+1)%this.puffs.length,o.sprite.position.copy(e),o.sprite.visible=!0,o.sprite.material.color.setHex(a),o.sprite.material.opacity=1,o.sprite.scale.set(i,i,1),o.velocity.copy(t??Kb),o.duration=n,o.life=n,o.startSize=i,o.endSize=r}}const Yb={boltSpeed:1100,fireInterval:.14,range:2600,damage:1,convergence:900,ports:[[-1.28,-.15,-4.3],[1.28,-.15,-4.3]]},tp={reload:1,activeGuns:1/0},np=64,Zb=26,ip=1.1,sp=new Se,Ro=new mt,Jb=new b(1,1,1),gs=new b,Co=new b,rp=new b,Lc=new b,ap=new Se().makeScale(0,0,0),Qb=new b(0,1,0);class jb{constructor(e,t,n={}){this.asteroids=e,this.effects=t,this.params={...Yb,...n};const i=new mn(ip,ip,Zb),r=new Wt({color:10353919,blending:pn,depthWrite:!1,transparent:!0});this.mesh=new Au(i,r,np),this.mesh.name="Bolts",this.mesh.frustumCulled=!1;for(let a=0;a<np;a++)this.bolts.push({position:new b,velocity:new b,remaining:0}),this.mesh.setMatrixAt(a,ap);this.mesh.instanceMatrix.needsUpdate=!0}mesh;kills=0;sinceHit=1/0;bolts=[];params;damage={...tp};cooldown=0;nextPort=0;triggerHeld=!1;getParams(){return this.params}setDamage(e){this.damage={...tp,...e}}getDamage(){return this.damage}getActiveGuns(){return Math.max(0,Math.min(this.damage.activeGuns,this.params.ports.length))}setTrigger(e){this.triggerHeld=e}getTimeSinceHit(){return this.sinceHit}update(e,t,n){this.sinceHit+=e,this.cooldown-=e,this.triggerHeld&&this.cooldown<=0&&this.getActiveGuns()>0&&(this.fire(t,n),this.cooldown=this.params.fireInterval*this.damage.reload);for(let i=0;i<this.bolts.length;i++){const r=this.bolts[i];if(r.remaining<=0)continue;const a=r.velocity.length()*e;gs.copy(r.velocity).divideScalar(Math.max(r.velocity.length(),1e-6));const o=this.asteroids.hitSegment(r.position,gs,a);if(o){this.asteroids.damage(o.index,this.params.damage)?(this.effects.spawnExplosion(o.point,o.radius,gs.clone().multiplyScalar(3)),this.kills++):this.effects.spawnImpact(o.point,Math.min(o.radius,6)),this.sinceHit=0,this.retire(i,r);continue}if(r.position.addScaledVector(r.velocity,e),r.remaining-=a,r.remaining<=0){this.retire(i,r);continue}this.writeMatrix(i,r)}this.mesh.instanceMatrix.needsUpdate=!0}shift(e){for(const t of this.bolts)t.remaining>0&&t.position.sub(e)}fire(e,t){const n=this.bolts.findIndex(a=>a.remaining<=0);if(n<0)return;const i=this.params.ports[this.nextPort%this.getActiveGuns()];this.nextPort++,e.updateMatrixWorld(),Co.set(i[0],i[1],i[2]).applyMatrix4(e.matrixWorld),Lc.set(0,0,-1).applyQuaternion(e.quaternion),rp.copy(e.position).addScaledVector(Lc,this.params.convergence),gs.subVectors(rp,Co).normalize();const r=this.bolts[n];r.position.copy(Co),r.velocity.copy(gs).multiplyScalar(this.params.boltSpeed).add(t),r.remaining=this.params.range,this.writeMatrix(n,r),this.effects.spawnImpact(Co,1.6)}writeMatrix(e,t){gs.copy(t.velocity).normalize(),Ro.setFromUnitVectors(Lc.set(0,0,-1),gs),Number.isFinite(Ro.x)||Ro.setFromAxisAngle(Qb,0),sp.compose(t.position,Ro,Jb),this.mesh.setMatrixAt(e,sp)}retire(e,t){t.remaining=0,this.mesh.setMatrixAt(e,ap)}}const eE={range:3e3,cone:Math.PI/5,dropRange:4e3};function tE(s,e,t,n,i,r){const a=nE.subVectors(s,t),o=iE.subVectors(e,n),l=o.lengthSq()-i*i,c=2*a.dot(o),h=a.lengthSq();let u=-1;if(Math.abs(l)<1e-6)Math.abs(c)>1e-6&&(u=-h/c);else{const d=c*c-4*l*h;if(d>=0){const f=Math.sqrt(d),p=(-c-f)/(2*l),v=(-c+f)/(2*l),g=[p,v].filter(m=>m>0);g.length>0&&(u=Math.min(...g))}}return u<=0||!Number.isFinite(u)?r.copy(s):r.copy(o).multiplyScalar(u).add(s)}const nE=new b,iE=new b,rr=new b,Ic=new b,Dc=new b;class sE{index=-1;params;info={index:-1,position:new b,velocity:new b,lead:new b,distance:0,radius:0,integrity:1};constructor(e={}){this.params={...eE,...e}}getParams(){return this.params}getIndex(){return this.index}clear(){this.index=-1}cycle(e,t,n){const i=[];for(let a=0;a<e.count;a++){if(!e.isAlive(a))continue;e.getCenter(a,rr),Dc.subVectors(rr,t);const o=Dc.length();if(o>this.params.range||o<.001)continue;const l=Dc.divideScalar(o).angleTo(n);l>this.params.cone||i.push({index:a,angle:l})}if(i.length===0)return this.index=-1,-1;i.sort((a,o)=>a.angle-o.angle);const r=i.findIndex(a=>a.index===this.index);return this.index=i[(r+1)%i.length].index,this.index}update(e,t,n,i){if(this.index<0)return null;if(!e.isAlive(this.index))return this.index=-1,null;e.getCenter(this.index,rr);const r=rr.distanceTo(t);if(r>this.params.dropRange)return this.index=-1,null;e.getVelocity(this.index,Ic);const a=this.info;return a.index=this.index,a.position.copy(rr),a.velocity.copy(Ic),a.distance=r,a.radius=e.getRadius(this.index),a.integrity=e.getIntegrity(this.index),tE(rr,Ic,t,n,i,a.lead),a}}const rE={radius:4.5,restitution:.35,tangentialKeep:.8,minImpactSpeed:8,lethalImpactSpeed:450,ramSpeedPerHit:45,repairRate:.015,repairDelay:8},op=new b,ar=new b,Ri=new b,Nc=new b,Uc=new b,lp=new mt;class aE{constructor(e,t=null,n={}){this.asteroids=e,this.effects=t,this.params={...rE,...n}}integrity=1;sinceImpact=1/0;params;previous=new b;hasPrevious=!1;getParams(){return this.params}shift(e){this.previous.sub(e)}repair(){this.integrity=1}update(e,t,n){if(this.sinceImpact+=e,this.sinceImpact>this.params.repairDelay&&this.integrity<1&&(this.integrity=Math.min(this.integrity+this.params.repairRate*e,1)),!this.hasPrevious)return this.previous.copy(t.position),this.hasPrevious=!0,null;ar.subVectors(t.position,this.previous);const i=ar.length();this.previous.copy(t.position);const r=Math.max(i,1e-4);i>1e-6?ar.divideScalar(i):ar.set(0,0,1),op.copy(t.position).addScaledVector(ar,-i);const a=this.asteroids.hitSegment(op,ar,r,this.params.radius);if(!a)return null;this.asteroids.getCenter(a.index,Nc),Ri.subVectors(a.point,Nc);const o=Ri.length();o<1e-6?Ri.set(0,1,0):Ri.divideScalar(o);const l=a.radius+this.params.radius;t.position.copy(Nc).addScaledVector(Ri,l),this.previous.copy(t.position);const c=n.dot(Ri),h=c<0?-c:0;c<0&&(Uc.copy(n).addScaledVector(Ri,-c),n.copy(Uc).multiplyScalar(this.params.tangentialKeep).addScaledVector(Ri,-c*this.params.restitution));const u=h<=this.params.minImpactSpeed?0:Math.min((h-this.params.minImpactSpeed)/this.params.lethalImpactSpeed,1);this.integrity=Math.max(this.integrity-u,0),this.sinceImpact=0;const d=Math.max(1,Math.round(h/this.params.ramSpeedPerHit)),f=this.asteroids.damage(a.index,d);this.effects&&(f?this.effects.spawnExplosion(a.point,a.radius,Uc.set(0,0,0)):this.effects.spawnImpact(a.point,Math.min(a.radius,8))),lp.copy(t.quaternion).invert();const p=Ri.clone().negate().applyQuaternion(lp);return{speed:h,damage:u,destroyed:f,direction:p}}}const oE={decay:1.4,maxOffset:.16,maxRoll:.05,frequency:22};class lE{trauma=0;time=0;params;constructor(e={}){this.params={...oE,...e}}getTrauma(){return this.trauma}add(e){this.trauma=bu.clamp(this.trauma+e,0,1)}reset(){this.trauma=0,this.time=0}update(e){this.time+=e,this.trauma=Math.max(this.trauma-this.params.decay*e,0)}applyTo(e){if(this.trauma<=0)return;const t=this.trauma*this.trauma,n=this.time*this.params.frequency,i=Fc(n,0)*t*this.params.maxOffset,r=Fc(n,17.3)*t*this.params.maxOffset,a=Fc(n,41.7)*t*this.params.maxRoll;e.translateX(i),e.translateY(r),e.rotateZ(a)}}function Fc(s,e){return Math.sin(s+e)*.6+Math.sin(s*1.7+e*1.3)*.3+Math.sin(s*2.9+e*.7)*.1}const cE="SM_Screen_MFD1",Ci=256,hE=15,uE={range:2500,maxContacts:48};function dE(s,e,t){return t.x=s.x/e,t.y=-s.z/e,t.radius=Math.hypot(t.x,t.y),t}const na=new b,cp=new b,hp=new mt,Po={x:0,y:0,radius:0};class fE{texture;canvas;ctx;params;contacts=[];sinceRefresh=1/0;sweep=0;constructor(e={}){this.params={...uE,...e},this.canvas=document.createElement("canvas"),this.canvas.width=Ci,this.canvas.height=Ci;const t=this.canvas.getContext("2d");if(!t)throw new Error("2D-Context fuer das Radar nicht verfuegbar");this.ctx=t,this.texture=new gn(this.canvas),this.texture.magFilter=Ct,this.texture.flipY=!1,this.drawFrame()}attachTo(e){const t=e.getObjectByName(cE);if(!(t instanceof Te))return!1;const n=Array.isArray(t.material)?t.material[0]:t.material;return n instanceof je?(n.emissiveMap=this.texture,n.needsUpdate=!0,!0):!1}update(e,t){this.sinceRefresh+=e,!(this.sinceRefresh<1/hE)&&(this.sinceRefresh=0,this.sweep=(this.sweep+e*1.4)%(Math.PI*2),this.collect(t),this.drawFrame(),this.texture.needsUpdate=!0)}collect(e){this.contacts.length=0,hp.copy(e.orientation).invert();const{asteroids:t}=e;for(let n=0;n<t.count;n++)t.isAlive(n)&&(t.getCenter(n,cp),na.subVectors(cp,e.origin),!(na.lengthSq()>this.params.range*this.params.range*2.25)&&(na.applyQuaternion(hp),dE(na,this.params.range,Po),!(Po.radius>1)&&this.contacts.push({x:Po.x,y:Po.y,height:Math.max(Math.min(na.y/this.params.range,1),-1),size:t.getRadius(n),locked:n===e.targetIndex})));this.contacts.length>this.params.maxContacts&&(this.contacts.sort((n,i)=>Math.hypot(n.x,n.y)-Math.hypot(i.x,i.y)),this.contacts.length=this.params.maxContacts)}drawFrame(){const e=this.ctx,t=Ci/2,n=Ci/2-12;e.fillStyle="#0a2b33",e.fillRect(0,0,Ci,Ci),e.strokeStyle="#2f8ea3",e.lineWidth=2;for(const r of[.33,.66,1])e.beginPath(),e.arc(t,t,n*r,0,Math.PI*2),e.stroke();e.beginPath(),e.moveTo(t,t-n),e.lineTo(t,t+n),e.moveTo(t-n,t),e.lineTo(t+n,t),e.stroke();const i=e.createLinearGradient(t,t,t+Math.cos(this.sweep)*n,t+Math.sin(this.sweep)*n);i.addColorStop(0,"rgba(180,255,255,0.35)"),i.addColorStop(1,"rgba(180,255,255,0)"),e.fillStyle=i,e.beginPath(),e.moveTo(t,t),e.arc(t,t,n,this.sweep-.45,this.sweep),e.closePath(),e.fill(),e.fillStyle="#eaffff",e.beginPath(),e.moveTo(t,t-9),e.lineTo(t-6,t+7),e.lineTo(t+6,t+7),e.closePath(),e.fill();for(const r of this.contacts){const a=t+r.x*n,o=t-r.y*n,l=Math.max(2,Math.min(7,2+r.size/9));e.strokeStyle=r.locked?"#ffd27a":"#7fd8e8",e.lineWidth=1.5,e.beginPath(),e.moveTo(a,o),e.lineTo(a,o-r.height*14),e.stroke(),e.fillStyle=r.locked?"#ffc14d":"#bff0ff",e.beginPath(),e.arc(a,o,l,0,Math.PI*2),e.fill(),r.locked&&(e.strokeStyle="#ffc14d",e.lineWidth=2,e.strokeRect(a-l-5,o-l-5,(l+5)*2,(l+5)*2))}e.fillStyle="#8fdcea",e.font="bold 18px monospace",e.textAlign="center",e.fillText(`${(this.params.range/1e3).toFixed(1)} KM`,t,Ci-8),e.fillStyle="rgba(0,0,0,0.16)";for(let r=0;r<Ci;r+=6)e.fillRect(0,r,Ci,2)}}const Lo=new b,up=new b,dp=new b,fp=new b,Oc=new b,Bc=180/Math.PI;function pE(s){Lo.set(0,0,-1).applyQuaternion(s),up.set(0,1,0).applyQuaternion(s),dp.set(1,0,0).applyQuaternion(s);const e=Math.asin(Math.max(-1,Math.min(1,Lo.y)))*Bc,t=(Math.atan2(Lo.x,-Lo.z)*Bc+360)%360,n=-Math.atan2(dp.y,up.y)*Bc;return{pitch:e,bearing:t,roll:n}}const pp=2e4;function d0(s){const e=Math.floor(s.x/pp),t=Math.floor(s.z/pp),n=String.fromCharCode(65+(e%26+26)%26),i=(t%100+100)%100;return`TROJA ${n}-${i.toString().padStart(2,"0")}`}function mE(s,e,t,n){Oc.subVectors(s,t);const i=Oc.length();return i<.001?0:(fp.subVectors(e,n),-fp.dot(Oc)/i)}function gE(s){return s>=1e3?`${(s/1e3).toFixed(2)} KM`:`${Math.round(s)} M`}function Aa(s,e){return e>0?Math.max(0,Math.min(1,s/e)):0}function _E(s,e,t){const n=Aa(s,e);return n<=0?0:Math.max(1,Math.min(t,Math.ceil(n*t)))}const ze={bg:"#111111",well:"#222222",grid:"#3d3d3d",dim:"#9a9a9a",ink:"#d8d8d8",band:"#c4c4c4",hot:"#ffffff"};function Ls(s,e,t=""){s.ctx.font=`${t} ${e}px ui-monospace, Menlo, monospace`}function Tt(s,e,t,n,i=13,r=ze.dim){const a=s.ctx;Ls(s,i,"bold"),"letterSpacing"in a&&(a.letterSpacing="2px"),a.fillStyle=r,a.textBaseline="alphabetic",a.fillText(e,t,n),"letterSpacing"in a&&(a.letterSpacing="0px")}function Dn(s,e,t,n,i,r="left",a=ze.hot){const o=s.ctx;Ls(s,i,"bold"),o.textAlign=r,o.textBaseline="alphabetic",o.shadowColor="rgba(255,255,255,0.45)",o.shadowBlur=i*.1,o.fillStyle=a,o.fillText(e,t,n),o.shadowBlur=0,o.textAlign="left"}function La(s,e,t=""){const n=s.ctx,i=Math.round(s.h*.115);n.fillStyle=ze.band,n.fillRect(0,0,s.w,i);const r=n;return Ls(s,i*.6,"bold"),"letterSpacing"in r&&(r.letterSpacing="3px"),n.fillStyle=ze.bg,n.textBaseline="middle",n.fillText(e,8,i*.55),t&&(n.textAlign="right",n.fillText(t,s.w-8,i*.55),n.textAlign="left"),"letterSpacing"in r&&(r.letterSpacing="0px"),n.textBaseline="alphabetic",i}function f0(s,e,t,n,i,r=!1){const a=s.ctx;a.fillStyle=r?ze.ink:ze.well,a.fillRect(e,t,n,i),a.strokeStyle=r?ze.hot:ze.grid,a.lineWidth=1,a.strokeRect(e+.5,t+.5,n-1,i-1)}function Rr(s,e,t,n,i,r,a=20,o=-1){const l=s.ctx,c=2,h=(n-c*(a-1))/a,u=_E(r,1,a);for(let d=0;d<a;d++)l.fillStyle=d<u?ze.hot:ze.well,l.fillRect(e+d*(h+c),t,h,i);if(o>=0){const d=Math.round(e+Math.max(0,Math.min(1,o))*n);l.fillStyle=ze.ink,l.fillRect(d-1,t-4,2,i+8)}}function rl(s,e,t,n,i,r,a){f0(s,e,t,n,i,a);const o=s.ctx;Ls(s,i*.5,"bold"),o.fillStyle=a?ze.bg:ze.dim,o.textAlign="center",o.textBaseline="middle",o.fillText(r,e+n/2,t+i*.56),o.textAlign="left",o.textBaseline="alphabetic"}function ws(s,e,t,n,i,r){f0(s,e,t,n,i);const a=s.ctx;Ls(s,i*.32,"bold"),a.fillStyle=ze.grid,a.fillText(r,e+6,t+i*.42),Ls(s,i*.42,"bold"),a.fillText("- - -",e+6,t+i*.85)}function Ia(s){const e=s.ctx;e.fillStyle=ze.bg,e.fillRect(0,0,s.w,s.h);const t=e.createRadialGradient(s.w/2,s.h*.42,0,s.w/2,s.h*.42,s.w*.75);t.addColorStop(0,"rgba(255,255,255,0.07)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,s.w,s.h)}function Da(s){const e=s.ctx;e.fillStyle="rgba(0,0,0,0.20)";for(let r=0;r<s.h;r+=4)e.fillRect(0,r,s.w,2);const t=s.t*.18%1*(s.h+40)-20,n=e.createLinearGradient(0,t-18,0,t+18);n.addColorStop(0,"rgba(255,255,255,0)"),n.addColorStop(.5,"rgba(255,255,255,0.05)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,t-18,s.w,36);const i=e.createRadialGradient(s.w/2,s.h/2,s.h*.35,s.w/2,s.h/2,s.w*.72);i.addColorStop(0,"rgba(0,0,0,0)"),i.addColorStop(1,"rgba(0,0,0,0.45)"),e.fillStyle=i,e.fillRect(0,0,s.w,s.h)}function ku(s,e=1.6){return s*e%1<.5?1:0}const xE=(s,e)=>{Ia(s);const t=La(s,"ANTRIEB",h0[e.mode]),n=12;Tt(s,"GESCHW",n,t+22),Dn(s,`${Math.round(e.speed)}`,n-2,t+75,54);const i=s.ctx.measureText(`${Math.round(e.speed)}`).width;Tt(s,"M/S",n+i+8,t+75,15,ze.ink),Tt(s,"SOLL",s.w-n-100,t+22),Dn(s,`${Math.round(e.setSpeed)}`,s.w-n,t+55,30,"right",ze.ink),Tt(s,`MAX ${Math.round(e.maxSetSpeed)}`,s.w-n-100,t+75,12),Rr(s,n,t+87,s.w-n*2,12,Aa(e.speed,e.maxSetSpeed),24,Aa(e.setSpeed,e.maxSetSpeed));const r=t+107,a=(s.w-n*2-16)/3;rl(s,n,r,a,24,"BRENNER",e.afterburner&&ku(s.t,4)>0),rl(s,n+a+8,r,a,24,"STOP",e.fullStop),rl(s,n+(a+8)*2,r,a,24,"ASSIST",e.mode!=="newton");const o=r+32,l=(s.w-n*2-8)/2;ws(s,n,o,l,s.h-o-8,"TRIEBWERK"),ws(s,n+l+8,o,l,s.h-o-8,"TANK"),Da(s)},vE=(s,e)=>{Ia(s);const t=e.target,n=La(s,"ZIEL",t?"ERFASST":"FREI"),i=12,r=Math.round(s.h*.6);if(t){Tt(s,`BROCKEN ${t.index.toString().padStart(3,"0")}`,i,n+20);const o=gE(t.distance),[l,c]=o.split(" ");Dn(s,l,i-2,n+68,44);const h=s.ctx.measureText(l).width;Tt(s,c,i+h+8,n+68,15,ze.ink);const u=mE(t.position,t.velocity,e.position,e.velocity);Tt(s,"NAEHERUNG",s.w-i-112,n+20),Dn(s,`${u>=0?"+":""}${Math.round(u)}`,s.w-i,n+56,28,"right",ze.ink),Tt(s,"INTEGRITAET",i,r-26),Rr(s,i,r-20,s.w-i*2-68,10,t.integrity,16),Dn(s,`${Math.round(t.integrity*100)}%`,s.w-i,r-10,18,"right",ze.ink)}else{Tt(s,"KEIN ZIEL",i,n+38,17),Tt(s,"T ERFASST DEN NAECHSTEN BROCKEN",i,n+60,11,ze.grid);const o=i+s.t*.5%1*(s.w-i*2);s.ctx.fillStyle=ze.grid,s.ctx.fillRect(i,n+78,s.w-i*2,1),s.ctx.fillStyle=ze.ink,s.ctx.fillRect(o-12,n+76,24,4)}s.ctx.fillStyle=ze.grid,s.ctx.fillRect(i,r+4,s.w-i*2,1);const a=e.hull<u0||e.sinceImpact<1.2;Tt(s,"EIGENE HUELLE",i,r+30),Rr(s,i,r+38,s.w-i*2-126,14,e.hull,14),Dn(s,`${Math.round(e.hull*100)}%`,s.w-i-70,r+52,22,"right",ze.ink),rl(s,s.w-i-64,r+36,64,20,"SCHADEN",a&&ku(s.t,2)>0),Tt(s,`ABSCHUESSE ${e.kills}`,i,s.h-12,13,ze.ink),Da(s)},ME=(s,e)=>{Ia(s);const t=La(s,"KURS",d0(e.position)),n=s.ctx,i=pE(e.orientation),r=54,a=t+52,o=40;n.save(),n.beginPath(),n.arc(r,a,o,0,Math.PI*2),n.clip(),n.fillStyle=ze.bg,n.fillRect(r-o,a-o,o*2,o*2),n.translate(r,a),n.rotate(-i.roll*Math.PI/180),n.translate(0,i.pitch*1.1),n.fillStyle="rgba(255,255,255,0.10)",n.fillRect(-o*2,0,o*4,o*3),n.strokeStyle=ze.hot,n.lineWidth=2,n.beginPath(),n.moveTo(-o*2,0),n.lineTo(o*2,0),n.stroke(),n.strokeStyle=ze.grid,n.lineWidth=1;for(const h of[-30,-20,-10,10,20,30]){const u=h*1.1,d=h%20===0?20:11;n.beginPath(),n.moveTo(-d,u),n.lineTo(d,u),n.stroke()}n.restore(),n.strokeStyle=ze.dim,n.lineWidth=2,n.beginPath(),n.arc(r,a,o,0,Math.PI*2),n.stroke(),n.strokeStyle=ze.hot,n.lineWidth=2,n.beginPath(),n.moveTo(r-14,a),n.lineTo(r-5,a),n.moveTo(r+5,a),n.lineTo(r+14,a),n.moveTo(r,a-4),n.lineTo(r,a+4),n.stroke(),Tt(s,"PEILUNG",112,t+22),Dn(s,`${Math.round(i.bearing).toString().padStart(3,"0")}`,112,t+66,44),Tt(s,"LAGE",s.w-12-92,t+22),Dn(s,`${i.pitch>=0?"+":""}${i.pitch.toFixed(0)}`,s.w-12,t+44,22,"right",ze.ink),Tt(s,"ROLL",s.w-12-92,t+66),Dn(s,`${i.roll>=0?"+":""}${i.roll.toFixed(0)}`,s.w-12,t+88,22,"right",ze.ink);const l=s.h-34,c=s.w/70;n.fillStyle=ze.grid,n.fillRect(0,l,s.w,1);for(let h=Math.ceil(i.bearing-35);h<=i.bearing+35;h++){if(h%5!==0)continue;const u=s.w/2+(h-i.bearing)*c,d=(h%10+10)%10===0;n.fillStyle=d?ze.ink:ze.dim,n.fillRect(u,l,1,d?10:5),d&&(Ls(s,12,"bold"),n.fillStyle=ze.dim,n.textAlign="center",n.fillText(`${(h%360+360)%360}`,u,l+24),n.textAlign="left")}n.fillStyle=ze.hot,n.beginPath(),n.moveTo(s.w/2,l-2),n.lineTo(s.w/2-6,l-12),n.lineTo(s.w/2+6,l-12),n.closePath(),n.fill(),Da(s)},SE=(s,e)=>{Ia(s);const t=La(s,"SCHIFF",ku(s.t,.5)>0?"AKTIV":""),n=12;Tt(s,"GESCHWINDIGKEIT",n,t+26),Dn(s,`${Math.round(e.speed)}`,n-2,t+73,48);const i=s.ctx.measureText(`${Math.round(e.speed)}`).width;Tt(s,"M/S",n+i+8,t+73,14,ze.ink),Tt(s,`SOLL ${Math.round(e.setSpeed)}`,s.w-n-96,t+73,14,ze.dim),Rr(s,n,t+81,s.w-n*2,10,Aa(e.speed,e.maxSetSpeed),20,Aa(e.setSpeed,e.maxSetSpeed)),Tt(s,"MODUS",n,t+111),Tt(s,e.fullStop?"FULL STOP":h0[e.mode],s.w-n-104,t+111,15,ze.hot),Tt(s,"HUELLE",n,t+139),Rr(s,n,t+145,s.w-n*2-62,12,e.hull,14),Dn(s,`${Math.round(e.hull*100)}%`,s.w-n,t+157,18,"right",ze.ink),Tt(s,"SEKTOR",n,t+181),Tt(s,d0(e.position),s.w-n-136,t+181,14,ze.ink),ws(s,n,s.h-36,s.w-n*2,28,"FRACHT / DOCK"),Da(s)},yE=(s,e)=>{Ia(s);const t=La(s,"WERKBANK"),n=10;Tt(s,"HUELLE",n,t+24),Dn(s,`${Math.round(e.hull*100)}%`,n-2,t+66,42),Rr(s,n,t+76,s.w-n*2,12,e.hull,14);const i=(s.w-n*2-8)/2,r=t+96,a=(s.h-r-n-8)/2;ws(s,n,r,i,a,"FRACHT"),ws(s,n+i+8,r,i,a,"TEILE"),ws(s,n,r+a+8,i,a,"REPARATUR"),ws(s,n+i+8,r+a+8,i,a,"ENERGIE"),Da(s)},bE=[{mesh:"SM_Screen_MFD2",width:384,height:216,hz:12,normal:[0,1,0],right:[-1,0,0],draw:xE},{mesh:"SM_Screen_MFD0",width:384,height:216,hz:12,normal:[0,1,0],right:[-1,0,0],draw:vE},{mesh:"SM_Screen_Overhead",width:400,height:160,hz:8,normal:[0,-1,0],right:[-1,0,0],draw:ME},{mesh:"SM_Screen_Corridor",width:352,height:256,hz:5,normal:[1,0,0],right:[0,0,-1],draw:SE},{mesh:"SM_Screen_Bench",width:320,height:232,hz:3,normal:[1,0,0],right:[0,0,-1],draw:yE}];function EE(s,e,t){const n=s.geometry.getAttribute("position"),i=new b().crossVectors(t,e).normalize();let r=1/0,a=-1/0,o=1/0,l=-1/0;const c=new b;for(let f=0;f<n.count;f++){c.fromBufferAttribute(n,f);const p=c.dot(t),v=c.dot(i);r=Math.min(r,p),a=Math.max(a,p),o=Math.min(o,v),l=Math.max(l,v)}const h=Math.max(a-r,1e-6),u=Math.max(l-o,1e-6),d=new Float32Array(n.count*2);for(let f=0;f<n.count;f++)c.fromBufferAttribute(n,f),d[f*2]=(c.dot(t)-r)/h,d[f*2+1]=(c.dot(i)-o)/u;s.geometry.setAttribute("uv",new vt(d,2))}const mp=1.45;class TE{panels=[];time=0;attachTo(e){this.dispose();for(const t of bE){const n=e.getObjectByName(t.mesh);if(!(n instanceof Te))continue;const i=Array.isArray(n.material)?n.material[0]:n.material;if(!(i instanceof je))continue;EE(n,new b(...t.normal).normalize(),new b(...t.right).normalize());const r=document.createElement("canvas");r.width=t.width,r.height=t.height;const a=r.getContext("2d");if(!a)throw new Error(`2D-Context fuer ${t.mesh} nicht verfuegbar`);const o=new gn(r);o.colorSpace=ft,o.magFilter=Ct,o.anisotropy=8,o.flipY=!1,i.emissiveMap=o,i.emissiveIntensity*=mp,i.needsUpdate=!0,this.panels.push({def:t,paint:{ctx:a,w:t.width,h:t.height,t:0},texture:o,material:i,baseEmissive:i.emissiveIntensity,originalEmissive:i.emissiveIntensity/mp,since:1/0})}return this.panels.length}update(e,t){this.time+=e;let n=null,i=1;for(const r of this.panels){r.since+=e;const a=r.since*r.def.hz;a>=i&&(i=a,n=r),r.material.emissiveIntensity=r.baseEmissive*wE(this.time,r.def.hz)}n&&(n.paint.t=this.time,n.since=0,n.def.draw(n.paint,t),n.texture.needsUpdate=!0)}dispose(){for(const e of this.panels)e.material.emissiveIntensity=e.originalEmissive,e.texture.dispose();this.panels.length=0}}function wE(s,e){return 1+Math.sin(s*(7.3+e*.7))*.018+Math.sin(s*(19.1+e*1.3))*.012}const al=2.4,tu=.76,AE=.1,RE=.95,CE=46,PE=8,LE=1,IE=.18,ia=new se(.55,2.1,1.35),kc=new se(2.4,1.35,.45);function DE(s,e,t,n){const i=Math.tan(t*Math.PI/360);return n.set(tu*s*i,-tu*e*i,-1).normalize()}function NE(s,e,t=al){const n=2*s*t/Math.max(e,1);return Math.max(AE,Math.min(RE,n))}function UE(s,e=CE,t=PE){return s<=e-t?1:s>=e?0:(e-s)/t}function Fr(s){const e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d");if(!t)throw new Error("2D-Context fuer das Scheiben-HUD nicht verfuegbar");return t.strokeStyle="#ffffff",t.fillStyle="#ffffff",t.lineCap="round",t.shadowColor="rgba(255,255,255,0.9)",t.shadowBlur=s*.05,[e,t]}function Or(s){const e=new gn(s);return e.anisotropy=4,e}function FE(){const[s,e]=Fr(256),t=128;e.lineWidth=5,e.beginPath(),e.arc(t,t,30,0,Math.PI*2),e.stroke(),e.globalAlpha=.55,e.lineWidth=3,e.beginPath(),e.arc(t,t,62,0,Math.PI*2),e.stroke(),e.globalAlpha=1,e.lineWidth=6;for(const[n,i]of[[0,-1],[0,1],[-1,0],[1,0]])e.beginPath(),e.moveTo(t+n*74,t+i*74),e.lineTo(t+n*116,t+i*116),e.stroke();return e.beginPath(),e.arc(t,t,4,0,Math.PI*2),e.fill(),Or(s)}function OE(){const[s,e]=Fr(64);return e.lineWidth=9,e.beginPath(),e.moveTo(8,56),e.lineTo(8,8),e.lineTo(56,8),e.stroke(),Or(s)}function BE(){const[s,e]=Fr(128),t=64;return e.lineWidth=6,e.setLineDash([9,7]),e.beginPath(),e.arc(t,t,38,0,Math.PI*2),e.stroke(),e.setLineDash([]),e.beginPath(),e.arc(t,t,6,0,Math.PI*2),e.fill(),Or(s)}function kE(){const[s,e]=Fr(128),t=64;e.lineWidth=6,e.beginPath(),e.arc(t,t,26,0,Math.PI*2),e.stroke(),e.beginPath(),e.arc(t,t,5,0,Math.PI*2),e.fill();for(const[n,i]of[[0,-1],[-1,0],[1,0]])e.beginPath(),e.moveTo(t+n*26,t+i*26),e.lineTo(t+n*52,t+i*52),e.stroke();return Or(s)}function zE(){const[s,e]=Fr(128),t=64;e.lineWidth=5,e.globalAlpha=.85,e.beginPath(),e.arc(t,t,26,0,Math.PI*2),e.stroke(),e.beginPath(),e.moveTo(t-15,t-15),e.lineTo(t+15,t+15),e.moveTo(t+15,t-15),e.lineTo(t-15,t+15),e.stroke();for(const[n,i]of[[0,-1],[-1,0],[1,0],[0,1]])e.beginPath(),e.moveTo(t+n*26,t+i*26),e.lineTo(t+n*48,t+i*48),e.stroke();return Or(s)}function VE(){const[s,e]=Fr(128),t=64;e.lineWidth=6,e.beginPath(),e.arc(t,t,20,0,Math.PI*2),e.stroke();for(const[n,i]of[[0,-1],[0,1],[-1,0],[1,0]])e.beginPath(),e.moveTo(t+n*32,t+i*32),e.lineTo(t+n*50,t+i*50),e.stroke();return Or(s)}function HE(s=96){const e=[];for(let n=0;n<=s;n++){const i=n/s*Math.PI*2;e.push(Math.cos(i),Math.sin(i),0)}const t=new Ut;return t.setAttribute("position",new Mt(e,3)),t}function p0(s,e,t=1){return new Wt({map:s,color:e,transparent:!0,opacity:t,blending:pn,depthTest:!1,depthWrite:!1,fog:!1})}function or(s,e,t,n=1){const i=new Te(new _i(e,e),p0(s,t,n));return i.renderOrder=900,i.frustumCulled=!1,i}const Io=new b,Do=new b,yn=new b,gp=new b,zc=new b,lr=new mt,_p=new Se,No=new mt,xp=new Se,GE=new b(0,1,0);class WE{group=new tn;crosshair;cursor;ring;prograde;retrograde;lead;targetGroup=new tn;corners=[];labelMesh;labelCanvas;labelCtx;labelTexture;lastLabel="";constructor(){this.group.name="GlassHud",this.group.renderOrder=900,this.crosshair=or(FE(),.34,ia),this.cursor=or(VE(),.13,ia,.8),this.prograde=or(kE(),.15,ia,.9),this.retrograde=or(zE(),.15,ia,.55),this.lead=or(BE(),.11,kc,.95);const e=new Cu({color:ia,transparent:!0,opacity:.16,blending:pn,depthTest:!1,depthWrite:!1});this.ring=new ya(HE(),e),this.ring.renderOrder=899,this.ring.frustumCulled=!1;const t=OE();for(let i=0;i<4;i++){const r=or(t,.055,kc,.95);r.rotation.z=-i*Math.PI/2,this.corners.push(r),this.targetGroup.add(r)}this.labelCanvas=document.createElement("canvas"),this.labelCanvas.width=256,this.labelCanvas.height=64;const n=this.labelCanvas.getContext("2d");if(!n)throw new Error("2D-Context fuer die Zielschrift nicht verfuegbar");this.labelCtx=n,this.labelTexture=new gn(this.labelCanvas),this.labelMesh=new Te(new _i(.3,.075),p0(this.labelTexture,kc,.95)),this.labelMesh.renderOrder=901,this.labelMesh.frustumCulled=!1,this.targetGroup.add(this.labelMesh),this.targetGroup.visible=!1,this.group.add(this.ring,this.crosshair,this.cursor,this.prograde,this.retrograde,this.lead,this.targetGroup),this.group.traverse(i=>i.layers.set(0))}dispose(){this.group.traverse(e=>{if(e instanceof Te||e instanceof ya){e.geometry.dispose();const t=e.material;Array.isArray(t)?t.forEach(n=>n.dispose()):t.dispose()}}),this.group.removeFromParent()}update(e){if(this.group.visible=!e.walking&&!e.external,e.walking||e.external)return;const t=e.camera;t.getWorldPosition(Do),_p.copy(this.group.matrixWorld).invert(),Io.copy(Do).applyMatrix4(_p),this.group.getWorldQuaternion(lr).invert(),t.getWorldQuaternion(No),zc.set(0,0,-1).applyQuaternion(No).applyQuaternion(lr),this.place(this.crosshair,yn.set(0,0,-1));const n=Math.max(0,1-e.sinceHit/IE);this.crosshair.scale.setScalar(1+n*.18),this.crosshair.material.opacity=.85+n*.15,this.updateCursor(e,t),this.updateMarkers(e),this.updateTarget(e),this.group.updateMatrixWorld(!0)}place(e,t){e.position.copy(t).multiplyScalar(al).add(Io),xp.lookAt(Io,e.position,GE),e.quaternion.setFromRotationMatrix(xp)}angleToView(e){return Math.acos(Math.max(-1,Math.min(1,e.dot(zc))))*180/Math.PI}updateCursor(e,t){const n=e.pointerLocked;if(this.cursor.visible=n,this.ring.visible=n,!n)return;DE(e.mouseOffset.x,e.mouseOffset.y,t.fov,yn),t.getWorldQuaternion(No),yn.applyQuaternion(No).applyQuaternion(lr),this.place(this.cursor,yn),this.place(this.ring,gp.copy(zc));const i=al*tu*Math.tan(t.fov*Math.PI/360);this.ring.scale.setScalar(i)}updateMarkers(e){if(e.speed<LE){this.prograde.visible=!1,this.retrograde.visible=!1;return}yn.copy(e.velocity).normalize().applyQuaternion(lr),this.showMarker(this.prograde,yn,.9),this.showMarker(this.retrograde,yn.multiplyScalar(-1),.5)}showMarker(e,t,n){const i=UE(this.angleToView(t))*n;e.visible=i>.02,e.visible&&(e.material.opacity=i,this.place(e,t))}updateTarget(e){const t=e.target;if(!t){this.targetGroup.visible=!1,this.lead.visible=!1;return}yn.subVectors(t.position,Do).normalize().applyQuaternion(lr);const n=this.angleToView(yn)<88;if(this.targetGroup.visible=n,n){this.place(this.targetGroup,yn);const r=NE(t.radius,t.distance)*.5,a=[[-r,r],[r,r],[r,-r],[-r,-r]];this.corners.forEach((o,l)=>{const[c,h]=a[l];o.position.set(c,h,0)}),this.labelMesh.position.set(0,-r-.06,0),this.updateLabel(t.distance,t.integrity)}yn.subVectors(t.lead,Do).normalize().applyQuaternion(lr);const i=gp.copy(yn).multiplyScalar(al).add(Io).distanceTo(this.targetGroup.position);this.lead.visible=n&&i>.012,this.lead.visible&&this.place(this.lead,yn)}updateLabel(e,t){const n=e>=1e3?`${(e/1e3).toFixed(2)} KM`:`${Math.round(e)} M`,i=Math.round(t*10),r=`${n}  ${"|".repeat(i)}${".".repeat(10-i)}`;if(r===this.lastLabel)return;this.lastLabel=r;const a=this.labelCtx;a.clearRect(0,0,256,64),a.fillStyle="#ffffff",a.shadowColor="rgba(255,255,255,0.8)",a.shadowBlur=6,a.font="bold 30px ui-monospace, Menlo, monospace",a.textAlign="center",a.textBaseline="middle",a.fillText(n,128,20),a.font="bold 22px ui-monospace, Menlo, monospace",a.fillText(`${"|".repeat(i)}${".".repeat(10-i)}`,128,48),this.labelTexture.needsUpdate=!0}}const As={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Us{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const XE=new Pa(-1,1,1,-1,0,1);class qE extends Ut{constructor(){super(),this.setAttribute("position",new Mt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Mt([0,2,0,0,2,0],2))}}const KE=new qE;class Al{constructor(e){this._mesh=new Te(KE,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,XE)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class $E extends Us{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof wt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=oi.clone(e.uniforms),this.material=new wt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Al(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class vp extends Us{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class YE extends Us{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ZE{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Me);this._width=n.width,this._height=n.height,t=new sn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:nn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new $E(As),this.copyPass.material.blending=Jt,this.timer=new R_}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}vp!==void 0&&(a instanceof vp?n=!0:a instanceof YE&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Me);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Mp extends Us{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new se}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const Uo={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Me},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Se},cameraProjectionMatrixInverse:{value:new Se},cameraWorldMatrix:{value:new Se},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new b(-1,-1,-1)},sceneBoxMax:{value:new b(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Fo={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Vc={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function JE(s=5){const e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=QE(e),n=t.length,i=new Uint8Array(n*4);for(let a=0;a<n;++a){const o=t[a],l=2*Math.PI*o/n,c=new b(Math.cos(l),Math.sin(l),0).normalize();i[a*4]=(c.x*.5+.5)*255,i[a*4+1]=(c.y*.5+.5)*255,i[a*4+2]=127,i[a*4+3]=255}const r=new Ca(i,e,e);return r.wrapS=Fn,r.wrapT=Fn,r.needsUpdate=!0,r}function QE(s){const e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=e*e,n=Array(t).fill(0);let i=Math.floor(e/2),r=e-1;for(let a=1;a<=t;){if(i===-1&&r===e?(r=e-2,i=0):(r===e&&(r=0),i<0&&(i=e-1)),n[i*e+r]!==0){r-=2,i++;continue}else n[i*e+r]=a++;r++,i--}return n}const Oo={defines:{SAMPLES:16,SAMPLE_VECTORS:m0(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Me},cameraProjectionMatrixInverse:{value:new Se},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function m0(s,e,t){const n=jE(s,e,t);let i="vec3[SAMPLES](";for(let r=0;r<s;r++){const a=n[r];i+=`vec3(${a.x}, ${a.y}, ${a.z})${r<s-1?",":")"}`}return i}function jE(s,e,t){const n=[];for(let i=0;i<s;i++){const r=2*Math.PI*e*i/s,a=Math.pow(i/(s-1),t);n.push(new b(Math.cos(r),Math.sin(r),a))}return n}class eT{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,i,r;const a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,u=(l+c)*h,d=l-u,f=c-u,p=e-d,v=t-f;let g,m;p>v?(g=1,m=0):(g=0,m=1);const S=p-g+h,E=v-m+h,M=p-1+2*h,w=v-1+2*h,A=l&255,R=c&255,_=this.perm[A+this.perm[R]]%12,T=this.perm[A+g+this.perm[R+m]]%12,P=this.perm[A+1+this.perm[R+1]]%12;let L=.5-p*p-v*v;L<0?n=0:(L*=L,n=L*L*this._dot(this.grad3[_],p,v));let I=.5-S*S-E*E;I<0?i=0:(I*=I,i=I*I*this._dot(this.grad3[T],S,E));let B=.5-M*M-w*w;return B<0?r=0:(B*=B,r=B*B*this._dot(this.grad3[P],M,w)),70*(n+i+r)}noise3d(e,t,n){let i,r,a,o;const c=(e+t+n)*.3333333333333333,h=Math.floor(e+c),u=Math.floor(t+c),d=Math.floor(n+c),f=1/6,p=(h+u+d)*f,v=h-p,g=u-p,m=d-p,S=e-v,E=t-g,M=n-m;let w,A,R,_,T,P;S>=E?E>=M?(w=1,A=0,R=0,_=1,T=1,P=0):S>=M?(w=1,A=0,R=0,_=1,T=0,P=1):(w=0,A=0,R=1,_=1,T=0,P=1):E<M?(w=0,A=0,R=1,_=0,T=1,P=1):S<M?(w=0,A=1,R=0,_=0,T=1,P=1):(w=0,A=1,R=0,_=1,T=1,P=0);const L=S-w+f,I=E-A+f,B=M-R+f,q=S-_+2*f,O=E-T+2*f,X=M-P+2*f,k=S-1+3*f,J=E-1+3*f,Q=M-1+3*f,re=h&255,le=u&255,ge=d&255,Je=this.perm[re+this.perm[le+this.perm[ge]]]%12,ht=this.perm[re+w+this.perm[le+A+this.perm[ge+R]]]%12,Qe=this.perm[re+_+this.perm[le+T+this.perm[ge+P]]]%12,$=this.perm[re+1+this.perm[le+1+this.perm[ge+1]]]%12;let ne=.6-S*S-E*E-M*M;ne<0?i=0:(ne*=ne,i=ne*ne*this._dot3(this.grad3[Je],S,E,M));let ee=.6-L*L-I*I-B*B;ee<0?r=0:(ee*=ee,r=ee*ee*this._dot3(this.grad3[ht],L,I,B));let Ie=.6-q*q-O*O-X*X;Ie<0?a=0:(Ie*=Ie,a=Ie*Ie*this._dot3(this.grad3[Qe],q,O,X));let Ne=.6-k*k-J*J-Q*Q;return Ne<0?o=0:(Ne*=Ne,o=Ne*Ne*this._dot3(this.grad3[$],k,J,Q)),32*(i+r+a+o)}noise4d(e,t,n,i){const r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,u,d,f,p;const v=(e+t+n+i)*l,g=Math.floor(e+v),m=Math.floor(t+v),S=Math.floor(n+v),E=Math.floor(i+v),M=(g+m+S+E)*c,w=g-M,A=m-M,R=S-M,_=E-M,T=e-w,P=t-A,L=n-R,I=i-_,B=T>P?32:0,q=T>L?16:0,O=P>L?8:0,X=T>I?4:0,k=P>I?2:0,J=L>I?1:0,Q=B+q+O+X+k+J,re=a[Q][0]>=3?1:0,le=a[Q][1]>=3?1:0,ge=a[Q][2]>=3?1:0,Je=a[Q][3]>=3?1:0,ht=a[Q][0]>=2?1:0,Qe=a[Q][1]>=2?1:0,$=a[Q][2]>=2?1:0,ne=a[Q][3]>=2?1:0,ee=a[Q][0]>=1?1:0,Ie=a[Q][1]>=1?1:0,Ne=a[Q][2]>=1?1:0,De=a[Q][3]>=1?1:0,St=T-re+c,He=P-le+c,st=L-ge+c,et=I-Je+c,Ye=T-ht+2*c,yt=P-Qe+2*c,At=L-$+2*c,Pt=I-ne+2*c,Ft=T-ee+3*c,gt=P-Ie+3*c,bt=L-Ne+3*c,N=I-De+3*c,$t=T-1+4*c,nt=P-1+4*c,C=L-1+4*c,x=I-1+4*c,F=g&255,z=m&255,W=S&255,te=E&255,oe=o[F+o[z+o[W+o[te]]]]%32,K=o[F+re+o[z+le+o[W+ge+o[te+Je]]]]%32,Y=o[F+ht+o[z+Qe+o[W+$+o[te+ne]]]]%32,ce=o[F+ee+o[z+Ie+o[W+Ne+o[te+De]]]]%32,we=o[F+1+o[z+1+o[W+1+o[te+1]]]]%32;let ae=.6-T*T-P*P-L*L-I*I;ae<0?h=0:(ae*=ae,h=ae*ae*this._dot4(r[oe],T,P,L,I));let ie=.6-St*St-He*He-st*st-et*et;ie<0?u=0:(ie*=ie,u=ie*ie*this._dot4(r[K],St,He,st,et));let be=.6-Ye*Ye-yt*yt-At*At-Pt*Pt;be<0?d=0:(be*=be,d=be*be*this._dot4(r[Y],Ye,yt,At,Pt));let Pe=.6-Ft*Ft-gt*gt-bt*bt-N*N;Pe<0?f=0:(Pe*=Pe,f=Pe*Pe*this._dot4(r[ce],Ft,gt,bt,N));let Fe=.6-$t*$t-nt*nt-C*C-x*x;return Fe<0?p=0:(Fe*=Fe,p=Fe*Fe*this._dot4(r[we],$t,nt,C,x)),27*(h+u+d+f+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,i){return e[0]*t+e[1]*n+e[2]*i}_dot4(e,t,n,i,r){return e[0]*t+e[1]*n+e[2]*i+e[3]*r}}class Gn extends Us{constructor(e,t,n=512,i=512,r,a,o){super(),this.width=n,this.height=i,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=JE(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new sn(this.width,this.height,{type:nn}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new wt({defines:Object.assign({},Uo.defines),uniforms:oi.clone(Uo.uniforms),vertexShader:Uo.vertexShader,fragmentShader:Uo.fragmentShader,blending:Jt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new i_,this.normalMaterial.blending=Jt,this.pdMaterial=new wt({defines:Object.assign({},Oo.defines),uniforms:oi.clone(Oo.uniforms),vertexShader:Oo.vertexShader,fragmentShader:Oo.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new wt({defines:Object.assign({},Fo.defines),uniforms:oi.clone(Fo.uniforms),vertexShader:Fo.vertexShader,fragmentShader:Fo.fragmentShader,blending:Jt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new wt({uniforms:oi.clone(As.uniforms),vertexShader:As.vertexShader,fragmentShader:As.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:oh,blendDst:ca,blendEquation:Wn,blendSrcAlpha:ah,blendDstAlpha:ca,blendEquationAlpha:Wn}),this.blendMaterial=new wt({uniforms:oi.clone(Vc.uniforms),vertexShader:Vc.vertexShader,fragmentShader:Vc.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:mm,blendSrc:oh,blendDst:ca,blendEquation:Wn,blendSrcAlpha:ah,blendDstAlpha:ca,blendEquationAlpha:Wn}),this._fsQuad=new Al(null),this._originalClearColor=new se,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new Ps,this.depthTexture.format=is,this.depthTexture.type=br,this.normalRenderTarget=new sn(this.width,this.height,{minFilter:zt,magFilter:zt,type:nn,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const n=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=m0(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Gn.OUTPUT.Off:break;case Gn.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Jt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Gn.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Jt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Gn.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Jt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Gn.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case Gn.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Jt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Gn.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Jt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,n,i,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,i,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,r=t.clearAlpha||r,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(n){(n.isPoints||n.isLine||n.isLine2)&&n.visible&&(n.visible=!1,t.push(n))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){const t=new eT,n=e*e*4,i=new Uint8Array(n);for(let a=0;a<e;a++)for(let o=0;o<e;o++){const l=a,c=o;i[(a*e+o)*4]=(t.noise(l,c)*.5+.5)*255,i[(a*e+o)*4+1]=(t.noise(l+e,c)*.5+.5)*255,i[(a*e+o)*4+2]=(t.noise(l,c+e)*.5+.5)*255,i[(a*e+o)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}const r=new Ca(i,e,e,En,_n);return r.wrapS=Fn,r.wrapT=Fn,r.needsUpdate=!0,r}}Gn.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const tT={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new se(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Cr extends Us{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new Me(e.x,e.y):new Me(256,256),this.clearColor=new se(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new sn(r,a,{type:nn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new sn(r,a,{type:nn});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new sn(r,a,{type:nn});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),a=Math.round(a/2)}const o=tT;this.highPassUniforms=oi.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new wt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Me(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=oi.clone(As.uniforms),this.blendMaterial=new wt({uniforms:this.copyUniforms,vertexShader:As.vertexShader,fragmentShader:As.fragmentShader,premultipliedAlpha:!0,blending:pn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new se,this._oldClearAlpha=1,this._basic=new Wt,this._fsQuad=new Al(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new Me(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Cr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Cr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new wt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Me(.5,.5)},direction:{value:new Me(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new wt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}Cr.BlurDirectionX=new Me(1,0);Cr.BlurDirectionY=new Me(0,1);const Bo={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class nT extends Us{constructor(){super(),this.isOutputPass=!0,this.uniforms=oi.clone(Bo.uniforms),this.material=new Bm({name:Bo.name,uniforms:this.uniforms,vertexShader:Bo.vertexShader,fragmentShader:Bo.fragmentShader}),this._fsQuad=new Al(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ke.getTransfer(this._outputColorSpace)===rt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ou?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===lu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===cu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Sl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===uu?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===du?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===hu&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const zu=1,g0=2,iT=.75,sT=.42,rT=.5,aT=4,oT={radius:.45,distanceExponent:1.6,thickness:.6,scale:1,samples:16,distanceFallOff:1,screenSpaceRadius:!1},lT=.85;function cT(s,e,t,n,i){const r=s.getDrawingBufferSize(new Me),a=new sn(r.x,r.y,{type:nn,samples:aT}),o=new ZE(s,a);o.setPixelRatio(s.getPixelRatio()),o.addPass(new Mp(e,i));for(const c of[n,t]){const h=new Mp(e,c);h.clear=!1,h.clearDepth=!0,o.addPass(h)}const l=new Gn(e,t,r.x,r.y);return l.output=Gn.OUTPUT.Default,l.blendIntensity=lT,l.updateGtaoMaterial(oT),o.addPass(l),o.addPass(new Cr(new Me(r.x,r.y),sT,rT,iT)),o.addPass(new nT),{render:()=>o.render(),setAmbientOcclusion:c=>{l.enabled=c},setSize:(c,h)=>{o.setPixelRatio(s.getPixelRatio()),o.setSize(c,h)},dispose:()=>{o.dispose(),a.dispose()}}}const hT=460,uT=.1,dT=.3,fT=.09,Sp=4,Hc=256,yp=1024,bp={far:"rgba(102, 234, 255, 0.72)","in-range":"rgba(102, 234, 255, 0.95)",cleared:"rgba(255, 179, 71, 1)"};function Ep(s,e){const t=document.createElement("canvas");t.width=s,t.height=e;const n=new gn(t);return n.colorSpace=ft,n.minFilter=Ct,n.generateMipmaps=!1,{sprite:new Sa(new Tr({map:n,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1})),canvas:t}}class pT extends Be{frame;frameCanvas;label;labelCanvas;drawnMode="";drawnText="";constructor(){super(),this.name="ApproachMarker",this.frustumCulled=!1;const e=Ep(Hc,Hc);this.frame=e.sprite,this.frameCanvas=e.canvas;const t=Ep(yp,yp/Sp);this.label=t.sprite,this.labelCanvas=t.canvas;for(const n of[this.frame,this.label])n.frustumCulled=!1,n.renderOrder=5,this.add(n);this.visible=!1}update(e,t,n,i){if(this.visible=e!=="hidden",!this.visible)return;const r=Math.min(Math.max(hT,t*uT),t*dT);this.frame.scale.set(r,r,1);const a=Math.max(t*fT,r*.42),o=a/Sp;this.label.scale.set(a,o,1),this.label.center.set(.5,.5+r*.58/o),e!==this.drawnMode&&(this.drawFrame(e),this.drawnMode=e,this.drawnText="");const l=`${n}  ${mT(t)}
${i}`;l!==this.drawnText&&(this.drawLabel(e,l),this.drawnText=l)}drawFrame(e){if(e==="hidden")return;const t=this.frameCanvas.getContext("2d");if(!t)return;const n=Hc;t.clearRect(0,0,n,n);const i=bp[e],r=14,a=52;t.strokeStyle=i,t.lineWidth=5,t.lineCap="square";for(const[l,c,h,u]of[[r,r,1,1],[n-r,r,-1,1],[r,n-r,1,-1],[n-r,n-r,-1,-1]])t.beginPath(),t.moveTo(l+h*a,c),t.lineTo(l,c),t.lineTo(l,c+u*a),t.stroke();t.lineWidth=3,t.globalAlpha=.6;for(const[l,c,h,u]of[[n/2,r,n/2,r+16],[n/2,n-r,n/2,n-r-16],[r,n/2,r+16,n/2],[n-r,n/2,n-r-16,n/2]])t.beginPath(),t.moveTo(l,c),t.lineTo(h,u),t.stroke();t.globalAlpha=1;const o=this.frame.material.map;o&&(o.needsUpdate=!0)}drawLabel(e,t){if(e==="hidden")return;const n=this.labelCanvas.getContext("2d");if(!n)return;const i=this.labelCanvas.width,r=this.labelCanvas.height;n.clearRect(0,0,i,r);const a=bp[e],[o="",l=""]=t.split(`
`);n.textAlign="center",n.textBaseline="middle",n.fillStyle=a,Tp(n,o,600,78,i,r*.33),n.globalAlpha=.78,Tp(n,l,500,58,i,r*.72),n.globalAlpha=1;const c=this.label.material.map;c&&(c.needsUpdate=!0)}}function Tp(s,e,t,n,i,r){const a="ui-monospace, 'DejaVu Sans Mono', monospace",o=i*.92;let l=n;s.font=`${t} ${l}px ${a}`;const c=s.measureText(e).width;c>o&&(l=Math.max(Math.floor(l*o/c),12),s.font=`${t} ${l}px ${a}`),s.fillText(e,i/2,r)}function mT(s){return s>=1e3?`${(s/1e3).toFixed(1)} KM`:`${Math.round(s/10)*10} M`}const gT=240,_T=200,cn=62,Pi=102,Li=22,ii=32,ji=40,sa=new b(0,46,80),xT={name:"MERIDIAN-7",sector:"TRIDENT-RAND",bay:"C-3"},_0=new mn(1,1,1),vT=new Pr(1,1,1,16),MT=new Pr(1,1,1,6),cr=new Kn(1,12,8);function hr(s,e,t){return new je({color:s,roughness:e,metalness:t})}function Ni(s,e=1){return new Wt({color:s,toneMapped:!1,transparent:e<1,opacity:e})}const ve={plate:hr(7169884,.85,.35),plateDark:hr(3946804,.9,.3),plateLight:hr(9274999,.78,.4),rust:hr(7817518,.95,.15),steel:hr(10131084,.45,.9),solar:hr(1450300,.3,.7),glowAmber:Ni(16754253),glowAmberSoft:Ni(14254635,.55),glowGreen:Ni(3538822),glowRed:Ni(16723746),glowWhite:Ni(16774109),window:Ni(16763514,.9)};function Di(s,e,t,n,i,r){const a=new Te(e,t);return a.scale.set(n[0],n[1],n[2]),a.position.set(i[0],i[1],i[2]),r&&a.rotation.set(r[0],r[1],r[2]),s.add(a),a}function Xe(s,e,t,n,i){return Di(s,_0,e,t,n,i)}function ra(s,e,t,n,i,r){return Di(s,vT,e,[t,n,t],i,r)}function ur(s,e,t,n,i){const r=new Te(MT,e),a=t.distanceTo(n);return r.scale.set(i,a,i),r.position.copy(t).add(n).multiplyScalar(.5),r.quaternion.setFromUnitVectors(ST,es.copy(n).sub(t).divideScalar(a||1)),s.add(r),r}const ST=new b(0,1,0),es=new b;class yT extends Be{info;dockPoint;marker;radius=_T;ring=new Be;beacons=[];guides=[];bayLight;time=0;constructor(e={},t=8231){super(),this.name="Station",this.info={...xT,...e};const n=Qm(t);this.buildCore(n),this.buildRing(n),this.buildArms(n),this.buildSolar(),this.buildMast(),this.bayLight=this.buildBay(),this.add(this.ring),this.dockPoint=new Be,this.dockPoint.name="DockPoint",this.dockPoint.position.copy(sa),this.add(this.dockPoint),this.marker=new pT,this.marker.position.set(0,cn*.35,0),this.add(this.marker)}placeAt(e,t=0){this.position.copy(e),es.copy(e).negate(),es.y=0,es.lengthSq()<1e-6&&es.set(0,0,1),es.normalize();const n=Math.atan2(es.x,es.z)+t*Math.PI/180;return this.rotation.set(.07,n,-.05),this.updateMatrixWorld(!0),this}setLayer(e){this.traverse(t=>t.layers.set(e)),this.bayLight.layers.enableAll()}update(e){this.time+=e,this.ring.rotation.y=this.time/gT%1*Math.PI*2;for(const i of this.beacons){const r=(this.time+i.phase)%i.period/i.period;i.object.visible=r<i.duty}const n=this.time*3.4%(8+2.5);for(const i of this.guides)i.object.visible=Math.abs(n-i.index)<1.1}shift(e){this.position.sub(e)}getDockPosition(e){return this.dockPoint.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.dockPoint.matrixWorld)}getDockQuaternion(e){return this.dockPoint.getWorldQuaternion(e)}getDockAxis(e){return e.set(0,0,1).applyQuaternion(this.dockPoint.getWorldQuaternion(wp)).normalize()}getDockUp(e){return e.set(0,1,0).applyQuaternion(this.dockPoint.getWorldQuaternion(wp)).normalize()}buildCore(e){const t=new Be;t.name="Core",this.add(t),ra(t,ve.plate,24,92,[0,-74,0]),ra(t,ve.plateDark,28,68,[0,0,0]),ra(t,ve.plate,22,92,[0,74,0]);for(const[n,i]of[[-120,25],[-28,26],[28,29],[120,23]]){const r=new Te(new ba(i,2.6,6,24),ve.steel);r.position.set(0,n,0),r.rotation.x=Math.PI/2,t.add(r)}for(let n=0;n<8;n++){const i=n/8*Math.PI*2;Xe(t,ve.steel,[2.5,66,5],[Math.sin(i)*29,0,Math.cos(i)*29],[0,i,0])}for(let n=0;n<16;n++){const i=e()*Math.PI*2,r=(e()*2-1)*110,a=Math.abs(r)<34?28.4:24.4,o=e()<.35?ve.rust:e()<.5?ve.plateLight:ve.plateDark;Xe(t,o,[6+e()*12,5+e()*16,1],[Math.sin(i)*a,r,Math.cos(i)*a],[0,i,0])}for(let n=0;n<3;n++){const i=-96+n*18;for(let r=0;r<18;r++){const a=r/18*Math.PI*2+n*.08;e()<.25||Xe(t,ve.window,[1.4,2.4,.6],[Math.sin(a)*24.3,i,Math.cos(a)*24.3],[0,a,0])}}for(let n=0;n<7;n++){const i=n/7*Math.PI*2+.4,r=-40+e()*40,a=e()<.4?ve.plateLight:e()<.5?ve.rust:ve.plate,o=16+e()*14;Xe(t,a,[11,11,o],[Math.sin(i)*36,r,Math.cos(i)*36],[0,i,0]),Xe(t,ve.steel,[1.6,13,1.6],[Math.sin(i)*31,r,Math.cos(i)*31],[0,i,0])}}buildRing(e){this.ring.name="HabitatRing",this.ring.position.y=-34;const t=new Te(new ba(150,11,8,64),ve.plate);t.rotation.x=Math.PI/2,this.ring.add(t);for(let n=0;n<4;n++){const i=n/4*Math.PI*2,r=new b(Math.sin(i),0,Math.cos(i));Xe(this.ring,ve.plateDark,[7,7,120],[r.x*90,0,r.z*90],[0,i,0]);for(const a of[-1,1])ur(this.ring,ve.steel,new b(r.x*30,a*9,r.z*30),new b(r.x*142,0,r.z*142),1.3)}for(let n=0;n<10;n++){const i=n/10*Math.PI*2+.15,r=new b(Math.sin(i),0,Math.cos(i)),a=150;Xe(this.ring,n%3===0?ve.plateLight:ve.plate,[26,15,15],[r.x*a,9,r.z*a],[0,i,0]);for(let o=-1;o<=1;o++)e()<.2||Xe(this.ring,ve.window,[5,2,.6],[r.x*(a+7.8)+Math.cos(i)*o*7,9,r.z*(a+7.8)-Math.sin(i)*o*7],[0,i,0])}}buildArms(e){const t=new Be;t.name="DockingArms",t.position.y=24,this.add(t);for(const n of[-1,1]){const i=n*168;Xe(t,ve.plateDark,[148,8,10],[n*96,0,0]);for(let o=0;o<5;o++){const l=n*(30+o*28),c=n*(30+(o+1)*28);ur(t,ve.steel,new b(l,-4,0),new b(c,-16,0),1.1),ur(t,ve.steel,new b(c,-4,0),new b(l,-16,0),1.1)}Xe(t,ve.steel,[8,26,8],[n*100,-14,0]);for(const o of[-15,15])Xe(t,ve.plate,[26,6,7],[i,0,o]),Xe(t,ve.steel,[6,14,5],[i,8,o]);for(let o=0;o<3;o++){const l=e()<.4?ve.rust:e()<.5?ve.plateLight:ve.plateDark;Xe(t,l,[12,12,24],[n*(60+o*30),13,e()*10-5])}const r=n<0?ve.glowRed:ve.glowGreen,a=new Be;a.position.set(i+n*8,0,0),t.add(a),Di(a,cr,r,[3,3,3],[0,0,0]),Di(a,cr,n<0?Ni(16723746,.18):Ni(3538822,.18),[9,9,9],[0,0,0]),this.beacons.push({object:a,period:n<0?2.4:1.9,phase:n<0?0:.6,duty:.3})}}buildSolar(){const e=new Be;e.name="SolarWings",e.position.y=-118,this.add(e);for(const t of[-1,1]){Xe(e,ve.steel,[110,3,3],[t*78,0,0]);for(const n of[-30,30]){const i=new Be;i.position.set(t*104,0,n),i.rotation.z=t*.22,e.add(i),Xe(i,ve.solar,[88,.8,44],[0,0,0]),Xe(i,ve.steel,[90,1.6,2],[0,0,22]),Xe(i,ve.steel,[90,1.6,2],[0,0,-22]);for(const r of[-22,0,22])Xe(i,ve.plateDark,[1.5,1.2,44],[r,0,0]);ur(e,ve.steel,new b(t*62,0,0),new b(t*96,0,n*.9),1.2)}}}buildMast(){const e=new Be;e.name="Mast",e.position.y=120,this.add(e),ra(e,ve.steel,2.5,46,[0,23,0]);for(let n=0;n<4;n++){const i=n/4*Math.PI*2;ur(e,ve.steel,new b(Math.sin(i)*12,0,Math.cos(i)*12),new b(0,34,0),.7),Xe(e,ve.steel,[.8,14,.8],[Math.sin(i)*6,40,Math.cos(i)*6],[.3,i,0])}const t=new Te(new Kn(15,16,10,0,Math.PI*2,0,Math.PI*.32),ve.plateLight);t.position.set(26,6,0),t.rotation.set(.9,0,-.6),e.add(t),ra(e,ve.steel,1.2,20,[17,2,0],[0,0,-.7]);for(const n of[0,.16]){const i=new Be;i.position.set(0,48,0),e.add(i),Di(i,cr,ve.glowWhite,[2.4,2.4,2.4],[0,0,0]),Di(i,cr,Ni(16774109,.16),[8,8,8],[0,0,0]),this.beacons.push({object:i,period:2.8,phase:n,duty:.03})}}buildBay(){const e=new Be;e.name="DockingBay",this.add(e);const t=(Pi+Li)/2,n=Pi-Li,i=ji+44;Xe(e,ve.plate,[72,5,n],[0,ji-2.5,t]),Xe(e,ve.plate,[72,5,n],[0,i+2.5,t]),Xe(e,ve.plateDark,[5,49,n],[-ii-2.5,cn,t]),Xe(e,ve.plateDark,[5,49,n],[ii+2.5,cn,t]),Xe(e,ve.plate,[72,49,5],[0,cn,Li-2.5]);for(let o=0;o<7;o++){const l=-24+o*8;Xe(e,ve.glowAmberSoft,[2.6,22,.8],[l,cn+2,Li+.7]),Xe(e,ve.plateDark,[4.6,24,1.4],[l+4,cn+2,Li+1.6])}Xe(e,ve.plateLight,[34,1.2,1],[0,cn+17,Li+1.4]),Xe(e,ve.plateLight,[1.2,9,1],[0,cn+21,Li+1.4]);for(const o of[-1,1]){Xe(e,ve.plateLight,[1.2,7,1],[o*16,cn+20,Li+1.4]),Xe(e,ve.glowAmberSoft,[.8,2.2,n-12],[o*(ii-.6),cn+14,t]),Xe(e,ve.glowAmberSoft,[.8,2.2,n-12],[o*(ii-.6),cn-8,t]);for(let l=0;l<4;l++){const c=Li+12+l*18;Xe(e,ve.steel,[3,3,14],[o*(ii-3),cn+19,c]),Xe(e,ve.plateDark,[5,9,5],[o*(ii-4),ji+6,c])}}Xe(e,ve.plateLight,[76,4,26],[0,i+8,Pi+10],[-.34,0,0]),Xe(e,ve.plateLight,[76,4,26],[0,ji-8,Pi+10],[.34,0,0]);for(const o of[-1,1])Xe(e,ve.plateLight,[4,52,26],[o*(ii+9),cn,Pi+10],[0,-o*.34,0]);for(let o=0;o<5;o++){const l=-1+o/4*2;for(const h of[-1,1]){const u=new Be;u.position.set(h*(ii+4),cn+l*22,Pi+2),e.add(u),Di(u,cr,ve.glowGreen,[1.5,1.5,1.5],[0,0,0]),this.beacons.push({object:u,period:1.6,phase:o*.05,duty:.55})}const c=new Be;c.position.set(l*26,i+4,Pi+2),e.add(c),Di(c,cr,ve.glowRed,[1.5,1.5,1.5],[0,0,0]),this.beacons.push({object:c,period:1.6,phase:.8+o*.05,duty:.55})}const r=8;for(let o=0;o<r;o++){const l=Pi-6-o/(r-1)*(n-16);for(const c of[-1,1]){const h=new Be;h.position.set(c*(ii-5),ji+.6,l),e.add(h),Di(h,_0,ve.glowGreen,[4,.5,2],[0,0,0]),this.guides.push({object:h,index:o})}}Xe(e,ve.plateDark,[34,3,46],[0,ji+1.5,sa.z-4]);for(const o of[-1,1]){for(const l of[-16,16])Xe(e,ve.steel,[4,7,6],[o*15,ji+6,sa.z-4+l]);ur(e,ve.steel,new b(o*(ii-1),cn+10,sa.z),new b(o*18,ji+8,sa.z),1.4)}for(let o=0;o<3;o++)Xe(e,ve.plateLight,[3,12,1],[-8+o*8,i+12,Pi-1]);const a=new Ns(16756841,1300,340,2);return a.position.set(0,cn+12,t),e.add(a),a}}const wp=new mt,bT={cleared:"FREIGABE ERTEILT",docking:"ANDOCKMANOEVER",undocking:"ABLEGEMANOEVER"};class ET{root;line;progress;progressLabel;progressValue;progressFill;lastText="";lastValue="";constructor(e=document.body){this.root=document.createElement("div"),this.root.className="stncomms",this.line=document.createElement("div"),this.line.className="stncomms__line",this.line.hidden=!0,this.progress=document.createElement("div"),this.progress.className="stncomms__progress",this.progress.hidden=!0;const t=document.createElement("div");t.className="stncomms__progress-row",this.progressLabel=document.createElement("span"),this.progressValue=document.createElement("span"),t.append(this.progressLabel,this.progressValue);const n=document.createElement("div");n.className="stncomms__progress-bar",this.progressFill=document.createElement("i"),n.append(this.progressFill),this.progress.append(t,n),this.root.append(this.line,this.progress),e.append(this.root)}showMessage(e,t){this.line.textContent=e,this.line.classList.toggle("is-bad",!t),this.line.hidden=!1,this.lastText=e}update(e){!e.showMessage&&!this.line.hidden?(this.line.hidden=!0,this.lastText=""):e.showMessage&&this.line.hidden&&this.lastText&&(this.line.hidden=!1);const t=bT[e.state];if(this.progress.hidden=t===void 0,t===void 0)return;this.progressLabel.textContent=t;const n=e.state==="cleared"?`${Math.round(e.distance)} M · ${Math.round(e.speed)} M/S`:`${Math.round(e.progress*100)} %`;n!==this.lastValue&&(this.progressValue.textContent=n,this.lastValue=n);const i=e.state==="cleared"?0:e.progress;this.progressFill.style.width=`${(i*100).toFixed(1)}%`}dispose(){this.root.remove()}}const Ap=[1,5,25];function Oe(s,e,t){const n=document.createElement(s);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n}function Hn(s,e){s.textContent!==e&&(s.textContent=e)}function Gc(s,e){s.disabled!==e&&(s.disabled=e)}function ko(s){return s.toLocaleString("de-DE")}class TT{trade;deps;root;creditsValue;services;tbody;holdValue;holdFill;manifest;status;amountButtons=[];goodRows=new Map;serviceRows=new Map;amount=Ap[0];open_=!1;constructor(e,t=document.body){this.deps=e,this.trade=e.trade,this.root=Oe("div","stn"),this.root.hidden=!0;const n=Oe("div","stn__frame");this.root.append(n);const i=Oe("header","stn__head");i.append(Oe("div","stn__title",e.info.name),Oe("div","stn__sub",`SEKTOR ${e.info.sector} · ANDOCKBUCHT ${e.info.bay}`));const r=Oe("div","stn__credits");r.append(Oe("span",void 0,"CREDITS")),this.creditsValue=Oe("b",void 0,"0"),r.append(this.creditsValue),i.append(r),n.append(i);const a=Oe("div","stn__body");n.append(a);const o=Oe("section","stn__section");o.append(Oe("div","stn__legend","WERFT UND VERSORGUNG")),this.services=Oe("div","stn__services"),o.append(this.services),a.append(o);const l=Oe("section","stn__section");l.append(Oe("div","stn__legend","WARENBOERSE")),l.append(this.buildAmountSelector());const c=Oe("table","stn__table"),h=Oe("thead"),u=Oe("tr");for(const E of["WARE","KAUF","VERKAUF","VORRAT","AN BORD",""])u.append(Oe("th",void 0,E));h.append(u),this.tbody=Oe("tbody"),c.append(h,this.tbody),l.append(c),a.append(l);const d=Oe("footer","stn__foot"),f=Oe("div","stn__hold");this.holdValue=Oe("b",void 0,"0 / 0 T");const p=Oe("div");p.append(document.createTextNode("LADERAUM  "),this.holdValue);const v=Oe("div","stn__bar");this.holdFill=Oe("i"),v.append(this.holdFill),this.manifest=Oe("div",void 0,""),f.append(p,v,this.manifest),this.status=Oe("div","stn__status","");const g=Oe("div","stn__actions"),m=Oe("button","stn__primary","ABLEGEN [G]");m.type="button",m.addEventListener("click",()=>{this.deps.onUndock()?this.close():this.setStatus({ok:!1,message:"ABLEGEN NICHT MOEGLICH"})});const S=Oe("button",void 0,"SCHLIESSEN [ESC]");S.type="button",S.addEventListener("click",()=>this.close()),g.append(m,S),d.append(f,this.status,g),n.append(d),t.append(this.root),window.addEventListener("keydown",this.onKeyDown)}get isOpen(){return this.open_}open(){this.open_||(this.open_=!0,this.root.hidden=!1,this.setStatus({ok:!0,message:"KLAMMERN VERRIEGELT"}),this.refresh())}close(){this.open_&&(this.open_=!1,this.root.hidden=!0,this.deps.onClose())}refresh(){Hn(this.creditsValue,ko(this.trade.getCredits())),this.refreshServices(),this.refreshGoods(),this.refreshHold()}dispose(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}buildAmountSelector(){const e=Oe("div","stn__amounts");e.append(Oe("span",void 0,"MENGE"));for(const t of Ap){const n=Oe("button","stn__mini",`${t} T`);n.type="button",n.addEventListener("click",()=>{this.amount=t;for(const i of this.amountButtons)i.classList.toggle("is-active",i===n)}),n.classList.toggle("is-active",t===this.amount),this.amountButtons.push(n),e.append(n)}return e}buildServiceRow(e){const t=Oe("div","stn__service"),n=Oe("span","stn__service-name",""),i=Oe("span","stn__service-price",""),r=Oe("div","stn__bar"),a=Oe("i");r.append(a);const o=Oe("button",void 0,"");return o.type="button",o.addEventListener("click",()=>this.setStatus(this.trade.useService(e))),t.append(n,i,r,o),this.services.append(t),{root:t,name:n,price:i,bar:r,fill:a,button:o}}buildGoodRow(e,t){const n=Oe("tr");n.append(Oe("td","stn__good",t));const i=Oe("td"),r=Oe("td"),a=Oe("td"),o=Oe("td","stn__onboard"),l=Oe("td"),c=Oe("button","stn__mini","KAUFEN");c.type="button",c.addEventListener("click",()=>this.setStatus(this.trade.buy(e,this.amount)));const h=Oe("button","stn__mini","VERKAUFEN");return h.type="button",h.addEventListener("click",()=>this.setStatus(this.trade.sell(e,this.amount))),l.append(c,h),n.append(i,r,a,o,l),this.tbody.append(n),{buyPrice:i,sellPrice:r,stock:a,onboard:o,buy:c,sell:h}}refreshServices(){const e=this.trade.getCredits();for(const t of this.trade.getServices()){let n=this.serviceRows.get(t.id);n||(n=this.buildServiceRow(t.id),this.serviceRows.set(t.id,n));const i=Math.round(t.level*100);Hn(n.name,`${t.name}  ${i} %`),Hn(n.price,t.level>=1?"VOLL":`${ko(t.price)} CR`),n.fill.style.width=`${i}%`,n.bar.classList.toggle("is-low",t.level<.35),Hn(n.button,t.action),Gc(n.button,t.level>=1||t.price>e)}}refreshGoods(){const e=this.trade.getCredits(),t=this.trade.getCapacity(),n=t.total-t.used,i=new Map(this.trade.getManifest().map(r=>[r.id,r.tons]));for(const r of this.trade.getGoods()){let a=this.goodRows.get(r.id);a||(a=this.buildGoodRow(r.id,r.name),this.goodRows.set(r.id,a));const o=i.get(r.id)??0;Hn(a.buyPrice,ko(r.buyPrice)),Hn(a.sellPrice,ko(r.sellPrice)),Hn(a.stock,`${r.stock} T`),Hn(a.onboard,`${o} T`),a.onboard.classList.toggle("is-zero",o===0),Gc(a.buy,r.stock<this.amount||n<this.amount||r.buyPrice*this.amount>e),Gc(a.sell,o<this.amount)}}refreshHold(){const{used:e,total:t}=this.trade.getCapacity();Hn(this.holdValue,`${e} / ${t} T`),this.holdFill.style.width=`${t>0?e/t*100:0}%`;const n=this.trade.getManifest(),i=n.length?n.map(r=>`${r.tons} T ${r.name}`).join("  ·  "):"LEER";Hn(this.manifest,i)}setStatus(e){Hn(this.status,e.message),this.status.classList.toggle("is-bad",!e.ok),this.status.classList.toggle("is-good",e.ok)}onKeyDown=e=>{!this.open_||e.code!=="Escape"||(e.preventDefault(),this.close())}}const Rl={rangeIn:3e3,rangeOut:3400,clearanceRange:1500,clearanceExpire:2400,clearanceSpeed:100,maxNoseAngle:35*Math.PI/180,maxCorridorAngle:60*Math.PI/180,clearanceHold:1.6,approachHold:420,minDockDuration:8,maxDockDuration:12,dockDurationPerMeter:1/250,undockDuration:8,undockDistance:620},wT="FREIGABE ERTEILT — BUCHT OFFEN";function Wc(s){return Math.round(s*180/Math.PI)}function AT(s,e=Rl){return s.distance>e.clearanceRange?{granted:!1,reason:"range",message:`AUSSER REICHWEITE (${Math.round(s.distance)} M, MAX ${e.clearanceRange} M)`}:s.corridorAngle>e.maxCorridorAngle?{granted:!1,reason:"corridor",message:`ANFLUGKORRIDOR VERLASSEN (${Wc(s.corridorAngle)} GRAD ABSEITS)`}:s.noseAngle>e.maxNoseAngle?{granted:!1,reason:"angle",message:`ANFLUGWINKEL (${Wc(s.noseAngle)} GRAD, MAX ${Wc(e.maxNoseAngle)} GRAD)`}:s.speed>e.clearanceSpeed?{granted:!1,reason:"speed",message:`ZU SCHNELL (${Math.round(s.speed)} M/S, MAX ${e.clearanceSpeed} M/S)`}:{granted:!0,message:wT}}class RT{constructor(e=Rl){this.params=e}currentState="far";hold=0;progressValue=0;durationValue=0;lastMessage="";get state(){return this.currentState}get progress(){return this.progressValue}get duration(){return this.durationValue}get message(){return this.lastMessage}get controlsShip(){const e=this.currentState;return e==="docking"||e==="docked"||e==="undocking"}update(e,t){switch(this.currentState){case"far":t.distance<this.params.rangeIn&&(this.currentState="in-range");break;case"in-range":t.distance>this.params.rangeOut&&(this.currentState="far");break;case"cleared":if(t.distance>this.params.clearanceExpire){this.currentState="in-range",this.lastMessage="FREIGABE VERFALLEN";break}this.hold-=e,this.hold<=0&&(this.currentState="docking",this.progressValue=0,this.durationValue=this.dockDurationFor(t.distance),this.lastMessage="AUTOPILOT UEBERNIMMT");break;case"docking":this.progressValue=Math.min(this.progressValue+e/this.durationValue,1),this.progressValue>=1&&(this.currentState="docked",this.lastMessage="ANGEDOCKT");break;case"docked":break;case"undocking":this.progressValue=Math.min(this.progressValue+e/this.durationValue,1),this.progressValue>=1&&(this.currentState="far",this.progressValue=0,this.durationValue=0,this.lastMessage="ABGELEGT — STEUERUNG FREI");break}return this.currentState}requestClearance(e){if(this.currentState==="cleared")return this.currentState="in-range",this.lastMessage="ANFLUG ABGEBROCHEN",{granted:!1,reason:"state",message:this.lastMessage};if(this.currentState!=="far"&&this.currentState!=="in-range")return this.lastMessage="KEINE FREIGABE MOEGLICH",{granted:!1,reason:"state",message:this.lastMessage};const t=AT(e,this.params);return this.lastMessage=t.message,t.granted&&(this.currentState="cleared",this.hold=this.params.clearanceHold),t}requestUndock(){return this.currentState!=="docked"?!1:(this.currentState="undocking",this.progressValue=0,this.durationValue=this.params.undockDuration,this.lastMessage="ABLEGEMANOEVER",!0)}reset(){this.currentState="far",this.progressValue=0,this.durationValue=0,this.hold=0}dockDurationFor(e){const t=this.params,n=t.minDockDuration+e*t.dockDurationPerMeter;return Math.min(Math.max(n,t.minDockDuration),t.maxDockDuration)}}function xl(s){return s<0?0:s>1?1:s}function CT(s,e){const t=xl(s),n=Math.min(Math.max(e,0),1.2);return xl(n*t+(3-2*n)*t*t+(n-2)*t*t*t)}function PT(s){const e=xl(s);return e*e*(3-2*e)}const Rp=new Se,zo=new b,aa=new b,LT=new b;function IT(s,e,t){return zo.copy(s).normalize().negate(),aa.copy(e).normalize(),Math.abs(aa.dot(zo))>.99&&(Math.abs(zo.y)<.9?aa.set(0,1,0):aa.set(1,0,0)),Rp.lookAt(zo,LT,aa),t.setFromRotationMatrix(Rp)}function DT(s,e,t,n,i,r=Rl){const a=s.position.distanceTo(e.position),o=Math.min(r.approachHold,Math.max(a*.65,60)),l=e.position.clone().addScaledVector(t,o),c=.5*(a+s.position.distanceTo(l)+l.distanceTo(e.position)),h=c>.001?i*n/c:0;return{start:{position:s.position.clone(),quaternion:s.quaternion.clone()},control:l,end:{position:e.position.clone(),quaternion:e.quaternion.clone()},duration:n,entryRate:h,alignStart:0,alignEnd:.7}}function NT(s,e,t,n=Rl){const i=s.position.clone().addScaledVector(e,n.undockDistance),r=IT(e,t,new mt);return{start:{position:s.position.clone(),quaternion:s.quaternion.clone()},control:s.position.clone().addScaledVector(e,n.undockDistance*.5),end:{position:i,quaternion:r},duration:n.undockDuration,entryRate:0,alignStart:.45,alignEnd:1}}function UT(s,e,t,n){const i=CT(e,s.entryRate),r=1-i;t.copy(s.start.position).multiplyScalar(r*r).addScaledVector(s.control,2*r*i).addScaledVector(s.end.position,i*i);const a=Math.max(s.alignEnd-s.alignStart,1e-4),o=PT((xl(e)-s.alignStart)/a);n.copy(s.start.quaternion).slerp(s.end.quaternion,o)}function FT(s,e){s.start.position.sub(e),s.control.sub(e),s.end.position.sub(e)}const OT="KeyG",dr=4.5,_s=new b,Vo=new mt,xs=new b,BT=new b,Cp=new b,Pp=new b,Xc=new b,qc=new b,Kc=new mt;function Lp(s,e){return Math.acos(Math.min(Math.max(s.dot(e),-1),1))}class kT{machine=new RT;panel;ship;flight;station;input;comms=new ET;sample={distance:1/0,speed:0,noseAngle:0,corridorAngle:0};path=null;previousState="far";messageTimer=0;constructor(e){this.ship=e.ship,this.flight=e.flight,this.station=e.station,this.input=e.input,this.panel=new TT({trade:e.trade,info:e.station.info,onUndock:()=>this.machine.requestUndock(),onClose:()=>this.input.requestPointerLock()})}update(e){this.station.update(e),this.measure(),this.input.wasPressed(OT)&&this.handleKey();const t=this.machine.update(e,this.sample);t!==this.previousState&&(this.onStateChange(this.previousState,t),this.previousState=t),this.machine.controlsShip&&this.driveShip(),this.messageTimer>0&&(this.messageTimer-=e),this.updateDisplays()}shift(e){this.station.shift(e),this.path&&FT(this.path,e)}get isAutopilot(){return this.machine.controlsShip}dispose(){this.panel.dispose(),this.comms.dispose()}measure(){this.station.getDockPosition(_s),this.station.getDockAxis(xs),this.sample.distance=this.ship.position.distanceTo(_s),this.sample.speed=this.flight.getSpeed(),Pp.set(0,0,-1).applyQuaternion(this.ship.quaternion),this.sample.noseAngle=Lp(Pp,BT.copy(xs).negate()),Xc.copy(this.ship.position).sub(_s),Xc.lengthSq()<1e-4?this.sample.corridorAngle=0:this.sample.corridorAngle=Lp(Xc.normalize(),xs)}handleKey(){if(this.machine.state==="docked"){this.machine.requestUndock();return}const e=this.machine.requestClearance(this.sample);this.comms.showMessage(e.granted?e.message:`ANDOCKKONTROLLE: ${e.message}`,e.granted),this.messageTimer=dr}onStateChange(e,t){t==="docking"?this.beginDocking():t==="docked"?(this.panel.open(),this.input.exitPointerLock(),this.comms.showMessage(`ANGEDOCKT — BUCHT ${this.station.info.bay}`,!0),this.messageTimer=dr):t==="undocking"?(this.beginUndocking(),this.panel.close()):e==="undocking"?this.releaseShip():t==="in-range"&&e==="cleared"&&(this.comms.showMessage(`ANDOCKKONTROLLE: ${this.machine.message}`,!1),this.messageTimer=dr)}beginDocking(){this.station.getDockPosition(_s),this.station.getDockQuaternion(Vo),this.station.getDockAxis(xs),this.path=DT({position:this.ship.position,quaternion:this.ship.quaternion},{position:_s,quaternion:Vo},xs,this.machine.duration,this.flight.getSpeed(),this.machine.params),this.comms.showMessage("AUTOPILOT — ANFLUG LAEUFT",!0),this.messageTimer=dr}beginUndocking(){this.station.getDockPosition(_s),this.station.getDockQuaternion(Vo),this.station.getDockAxis(xs),this.station.getDockUp(Cp),this.path=NT({position:_s,quaternion:Vo},xs,Cp,this.machine.params),this.comms.showMessage("ABLEGEN — KLAMMERN GELOEST",!0),this.messageTimer=dr}releaseShip(){this.path=null,this.flight.velocity.set(0,0,0),this.flight.angularVelocity.set(0,0,0),this.flight.setSetSpeed(0),this.flight.cancelFullStop(),this.flight.clearInputs(),this.comms.showMessage("STEUERUNG FREI",!0),this.messageTimer=dr}driveShip(){if(this.machine.state==="docked")this.station.getDockPosition(qc),this.station.getDockQuaternion(Kc);else if(this.path)UT(this.path,this.machine.progress,qc,Kc);else return;this.ship.position.copy(qc),this.ship.quaternion.copy(Kc),this.flight.velocity.set(0,0,0),this.flight.angularVelocity.set(0,0,0),this.flight.setSetSpeed(0),this.flight.cancelFullStop(),this.flight.clearInputs()}updateDisplays(){const e=this.machine.state,t=e==="far"?"far":e==="in-range"?"in-range":e==="cleared"?"cleared":"hidden",n=e==="far"?`HANDELSPOSTEN ${this.station.info.sector}`:e==="in-range"?"G — FREIGABE ANFORDERN":"FREIGABE ERTEILT · ANFLUG FREI";this.station.marker.update(t,this.sample.distance,this.station.info.name,n),this.comms.update({state:e,progress:this.machine.progress,distance:this.sample.distance,speed:this.sample.speed,showMessage:this.messageTimer>0}),this.panel.isOpen&&this.panel.refresh()}}const bs=.64,Es=.78,Vu={bin:.62,crate:.66,barrels:.86,case:.5},hn={ore:{id:"ore",name:"Erz",code:"ORE",volumePerTon:.13,container:"bin",basePrice:22,color:7031340,accent:12818986,hazard:!1},water:{id:"water",name:"Wasser",code:"H2O",volumePerTon:.16,container:"barrels",basePrice:8,color:3104628,accent:9426152,hazard:!1},food:{id:"food",name:"Nahrung",code:"NUT",volumePerTon:.2,container:"crate",basePrice:15,color:8155464,accent:14207370,hazard:!1},parts:{id:"parts",name:"Ersatzteile",code:"PRT",volumePerTon:.18,container:"crate",basePrice:46,color:4870976,accent:10465420,hazard:!1},electronics:{id:"electronics",name:"Elektronik",code:"ELC",volumePerTon:.155,container:"case",basePrice:118,color:2896184,accent:6744831,hazard:!1},contraband:{id:"contraband",name:"Kontrabande",code:"---",volumePerTon:.165,container:"crate",basePrice:240,color:2367775,accent:11809834,hazard:!0}},zT=Object.keys(hn);function vl(s){return Object.prototype.hasOwnProperty.call(hn,s)}function VT(s){return bs*Es*Vu[s.container]/s.volumePerTon}function HT(s,e){return e<=0?0:Math.ceil(e/VT(s)-1e-9)}const GT=40,WT=2400,Hu=15e3,$c=.001;function Ho(s){return Math.round(s*1e6)/1e6}class Ts extends Error{constructor(e){super(e),this.name="CargoError"}}class XT{capacity;credits;entries=new Map;listeners=new Set;constructor(e={}){this.capacity=e.capacity??GT,this.credits=e.credits??WT}getCapacity(){return this.capacity}getUsedCapacity(){let e=0;for(const t of this.entries.values())e+=t.tons;return Ho(e)}getFreeCapacity(){return Ho(this.capacity-this.getUsedCapacity())}getTons(e){return this.entries.get(e)?.tons??0}getAveragePrice(e){const t=this.entries.get(e);return!t||t.tons<=0?0:t.spent/t.tons}getManifest(){const e=[];for(const[t,n]of this.entries)n.tons<=0||e.push({good:t,tons:n.tons,avgPrice:n.spent/n.tons});return e}getCredits(){return this.credits}getPurchaseValue(){let e=0;for(const t of this.entries.values())e+=t.spent;return e}getCargoMass(){return this.getUsedCapacity()*1e3}getShipMass(e=Hu){return e+this.getCargoMass()}getLoadFactor(){return this.capacity>0?this.getUsedCapacity()/this.capacity:0}checkAdd(e,t){if(!vl(e))return`Unbekannte Ware "${e}"`;if(!Number.isFinite(t)||t<=0)return"Menge muss groesser als 0 sein";const n=this.getFreeCapacity();return t>n+$c?`Laderaum voll: noch ${Oi(n)} t frei, ${Oi(t)} t angefordert`:null}canAdd(e,t){return this.checkAdd(e,t)===null}checkRemove(e,t){if(!vl(e))return`Unbekannte Ware "${e}"`;if(!Number.isFinite(t)||t<=0)return"Menge muss groesser als 0 sein";const n=this.getTons(e);if(t>n+$c){const i=hn[e].name;return`Nur ${Oi(n)} t ${i} an Bord, ${Oi(t)} t angefordert`}return null}canRemove(e,t){return this.checkRemove(e,t)===null}add(e,t,n=hn[e]?.basePrice??0){const i=this.checkAdd(e,t);if(i)throw new Ts(i);const r=this.entries.get(e)??{tons:0,spent:0};r.tons=Ho(r.tons+t),r.spent+=t*n,this.entries.set(e,r),this.emit()}remove(e,t){const n=this.checkRemove(e,t);if(n)throw new Ts(n);const i=this.entries.get(e);if(!i)return 0;const r=Math.min(t,i.tons),a=r/i.tons;return i.spent-=i.spent*a,i.tons=Ho(i.tons-r),i.tons<$c&&this.entries.delete(e),this.emit(),r}buy(e,t,n=hn[e]?.basePrice??0){const i=this.checkAdd(e,t);if(i)throw new Ts(i);const r=t*n;if(r>this.credits)throw new Ts(`Zu wenig Guthaben: ${Math.round(r)} Cr noetig, ${Math.round(this.credits)} Cr vorhanden`);return this.credits-=r,this.add(e,t,n),r}sell(e,t,n=hn[e]?.basePrice??0){const i=this.checkRemove(e,t);if(i)throw new Ts(i);const a=this.remove(e,t)*n;return this.credits+=a,a}setCredits(e){this.credits=e,this.emit()}addCredits(e){this.credits+=e,this.emit()}clear(){this.entries.size!==0&&(this.entries.clear(),this.emit())}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}emit(){for(const e of this.listeners)e()}}function Oi(s){const e=Math.round(s*10)/10;return Number.isInteger(e)?String(e):e.toFixed(1)}const qT=1.35,KT=.82,$T={ore:180,water:240,food:90,parts:46,electronics:24,contraband:6},Ip=34,Dp=620,Np=940;function Up(s){return Math.round(hn[s].basePrice*qT)}function Fp(s){return Math.round(hn[s].basePrice*KT)}function Op(s){return s.toUpperCase()}function YT(s){const{hold:e,getHull:t,setHull:n}=s,i={...$T};let r=.62,a=.45;function o(c,h){return Math.round((1-c)*h)}function l(c){return c<=0?{ok:!1,message:"NICHTS ZU TUN"}:c>e.getCredits()?{ok:!1,message:`ZU WENIG CREDITS — ${c} CR NOETIG`}:(e.addCredits(-c),null)}return{getCredits:()=>e.getCredits(),getCapacity:()=>({used:e.getUsedCapacity(),total:e.getCapacity()}),getManifest:()=>e.getManifest().map(c=>({id:c.good,name:hn[c.good].name.toUpperCase(),tons:c.tons,averagePrice:Math.round(c.avgPrice)})),getGoods:()=>zT.map(c=>({id:c,name:hn[c].name.toUpperCase(),buyPrice:Up(c),sellPrice:Fp(c),stock:i[c]})),buy(c,h){if(!vl(c))return{ok:!1,message:"WARE UNBEKANNT"};const u=Math.floor(h);if(u<=0)return{ok:!1,message:"MENGE UNGUELTIG"};if(i[c]<u)return{ok:!1,message:`NUR ${i[c]} T VORRAETIG`};const d=Up(c);try{e.buy(c,u,d)}catch(f){if(f instanceof Ts)return{ok:!1,message:Op(f.message)};throw f}return i[c]-=u,{ok:!0,message:`${u} T ${hn[c].name.toUpperCase()} GELADEN — ${d*u} CR`}},sell(c,h){if(!vl(c))return{ok:!1,message:"WARE UNBEKANNT"};const u=Math.floor(h);if(u<=0)return{ok:!1,message:"MENGE UNGUELTIG"};const d=Fp(c);let f;try{f=e.sell(c,u,d)}catch(p){if(p instanceof Ts)return{ok:!1,message:Op(p.message)};throw p}return i[c]+=u,{ok:!0,message:`${u} T ${hn[c].name.toUpperCase()} VERKAUFT — ${f} CR`}},getServices:()=>[{id:"hull",name:"HUELLE",level:t(),price:Math.round((1-t())*100*Ip),action:"REPARIEREN"},{id:"fuel",name:"TREIBSTOFF",level:r,price:o(r,Dp),action:"TANKEN"},{id:"ammo",name:"MUNITION",level:a,price:o(a,Np),action:"FASSEN"}],useService(c){if(c==="hull"){const h=1-t(),u=l(Math.round(h*100*Ip));return u||(n(1),{ok:!0,message:"HUELLE INSTANDGESETZT"})}if(c==="fuel"){const h=l(o(r,Dp));return h||(r=1,{ok:!0,message:"TANKS VOLL"})}if(c==="ammo"){const h=l(o(a,Np));return h||(a=1,{ok:!0,message:"MAGAZINE VOLL"})}return{ok:!1,message:"DIENST UNBEKANNT"}}}}const li=[{id:"engine",code:"TRW",name:"TRIEBWERK",weight:1.3,exposure:[0,0,1],symmetric:!1,impairedAt:.65,failedAt:.12},{id:"thrusters",code:"DUE",name:"MANOEVRIERDUESEN",weight:1.1,exposure:[1,0,0],symmetric:!0,impairedAt:.7,failedAt:.12},{id:"weapons",code:"WAF",name:"BORDKANONEN",weight:.9,exposure:[0,0,-1],symmetric:!1,impairedAt:.7,failedAt:.15},{id:"generator",code:"GEN",name:"GENERATOR",weight:1,exposure:[0,0,0],symmetric:!1,impairedAt:.6,failedAt:.12},{id:"lifeSupport",code:"LEB",name:"LEBENSERHALTUNG",weight:.8,exposure:[0,1,0],symmetric:!1,impairedAt:.6,failedAt:.2},{id:"sensors",code:"SEN",name:"SENSORIK",weight:.7,exposure:[0,0,-1],symmetric:!1,impairedAt:.6,failedAt:.25},{id:"lighting",code:"LIC",name:"BELEUCHTUNG",weight:1,exposure:[0,0,0],symmetric:!1,impairedAt:.8,failedAt:.15}],fr=li.map(s=>s.id),ZT={damageScale:1.8,minDamage:.004,directionGain:2,shieldAbsorb:.35,oxygenSeconds:210,oxygenRecovery:.06,maxYawBias:.11};function si(s){return s<0?0:s>1?1:s}class as{oxygen=1;health=new Map;params;random;driftSign=1;constructor(e={}){this.random=e.random??Math.random,this.params={...ZT,...e.params};for(const t of li)this.health.set(t.id,1);this.driftSign=this.random()<.5?-1:1}getParams(){return this.params}static definition(e){const t=li.find(n=>n.id===e);if(!t)throw new Error(`Unbekanntes System: ${e}`);return t}getHealth(e){return this.health.get(e)??1}getStatus(e){const t=as.definition(e),n=this.getHealth(e);return n<=t.failedAt?"failed":n<t.impairedAt?"impaired":"ok"}isFailed(e){return this.getStatus(e)==="failed"}isImpaired(e){return this.getStatus(e)!=="ok"}get anyDamaged(){return fr.some(e=>this.getHealth(e)<1)}get anyImpaired(){return fr.some(e=>this.isImpaired(e))}get anyFailed(){return fr.some(e=>this.isFailed(e))}worst(){let e=fr[0];for(const t of fr)this.getHealth(t)<this.getHealth(e)&&(e=t);return e}damage(e,t){t<=0||(this.health.set(e,si(this.getHealth(e)-t)),e==="thrusters"&&(this.driftSign=this.random()<.5?-1:1))}repair(e,t){t<=0||this.health.set(e,si(this.getHealth(e)+t))}repairAll(){for(const e of fr)this.health.set(e,1);this.oxygen=1}applyImpact(e,t){const n=this.params;if(e<n.minDamage)return[];const i=1-n.shieldAbsorb*this.getHealth("generator"),r=si(e*n.damageScale*i);if(r<n.minDamage)return[];const a=r>.25?3:r>.1?2:1,o=[.6,.28,.12].slice(0,a),l=o.reduce((u,d)=>u+d,0),c=li.map(u=>({def:u,weight:u.weight*(1+n.directionGain*JT(u,t))})),h=[];for(let u=0;u<a&&c.length>0;u++){const d=QT(c,this.random()),f=c[d].def;c.splice(d,1);const p=r*o[u]/l;this.health.set(f.id,si(this.getHealth(f.id)-p)),h.push({id:f.id,amount:p})}return h.some(u=>u.id==="thrusters")&&(this.driftSign=this.random()<.5?-1:1),h}update(e){const t=this.getHealth("lifeSupport"),n=as.definition("lifeSupport");if(t>=n.impairedAt){this.oxygen=si(this.oxygen+this.params.oxygenRecovery*e);return}const i=si((n.impairedAt-t)/Math.max(n.impairedAt,.001));this.oxygen=si(this.oxygen-i*e/this.params.oxygenSeconds)}getOxygenSeconds(){const e=this.getHealth("lifeSupport"),t=as.definition("lifeSupport");if(e>=t.impairedAt)return 1/0;const n=si((t.impairedAt-e)/Math.max(t.impairedAt,.001));return n<=0?1/0:this.oxygen*this.params.oxygenSeconds/n}getFlightDamage(){const e=this.getHealth("engine"),t=this.getHealth("thrusters"),n=this.isFailed("engine"),i=this.isFailed("thrusters"),r=n?.12:.35+.65*e,a=n?.15:.3+.7*e,o=i?.25:.4+.6*t,l=as.definition("thrusters"),c=t>=l.impairedAt?0:(l.impairedAt-t)/l.impairedAt*this.params.maxYawBias*this.driftSign;return{thrust:r,topSpeed:a,torque:o,yawBias:c,afterburner:!this.isFailed("generator")}}getWeaponDamage(){const e=this.getHealth("weapons"),t=this.getStatus("weapons");return{reload:1+(1-e)*1.8,activeGuns:t==="failed"?0:t==="impaired"?1:2}}get sensorsOnline(){return!this.isFailed("sensors")}getLightLevel(){const e=this.getHealth("lighting"),t=.55+.45*this.getHealth("generator");return this.isFailed("lighting")?0:si((.35+.65*e)*t)}getFlicker(){return si((1-this.getHealth("lighting"))*1.2)}get emergencyLighting(){return this.isFailed("lighting")||this.isFailed("generator")}getRepairSpeed(){return .45+.55*this.getHealth("generator")}}function JT(s,e){const[t,n,i]=s.exposure;if(t===0&&n===0&&i===0)return 0;const r=t*e.x+n*e.y+i*e.z;return s.symmetric?Math.abs(r):Math.max(r,0)}function QT(s,e){let t=0;for(const i of s)t+=i.weight;if(t<=0)return 0;let n=e*t;for(let i=0;i<s.length;i++)if(n-=s[i].weight,n<=0)return i;return s.length-1}const oa=new b(.55,1.185,4.35),jT=-.44,Bp=.44,kp=.16,Yc=512,Zc=192,Go=4,ew=2,tw={ok:["#0c2412","#6fd587"],impaired:["#3a2a06","#ffc247"],failed:["#3d0d07","#ff6a52"]};class nw{group=new tn;canvas;ctx;texture=null;caution=null;signature="";time=0;constructor(){this.group.name="DamageAnnunciator",this.canvas=typeof document>"u"?null:document.createElement("canvas"),this.canvas&&(this.canvas.width=Yc,this.canvas.height=Zc),this.ctx=this.canvas?.getContext("2d")??null}attach(e){if(this.detach(),!this.canvas)return;this.texture=new gn(this.canvas),this.texture.colorSpace=ft,this.group.position.copy(oa),this.group.rotation.set(jT,Math.PI,0,"YXZ");const t=new Te(new _i(Bp,kp),new je({color:328965,emissive:new se(16777215),emissiveMap:this.texture,emissiveIntensity:1,roughness:.4,metalness:0,side:Gt}));t.position.z=.026,this.group.add(t);const n=new Te(new mn(Bp+.03,kp+.03,.05),new je({color:2500909,metalness:.8,roughness:.5}));n.castShadow=!0,this.group.add(n);const i=new Te(new mn(.06,.1,.05),new je({color:3816770,metalness:.85,roughness:.55}));i.position.set(oa.x,1.085,oa.z+.015),this.caution=new Ns(16725016,0,2,1.25),this.caution.name="Damage_MasterCaution",this.caution.position.set(oa.x,1.42,oa.z-.25),this.caution.visible=!1,e.add(this.group,i,this.caution);for(const r of[this.group,i,this.caution])r.traverse(a=>a.layers.set(0))}detach(){this.group.removeFromParent(),this.group.clear(),this.caution?.removeFromParent(),this.caution=null,this.texture?.dispose(),this.texture=null,this.signature=""}update(e,t){this.time+=e;const n=Math.floor(this.time*ew*2)%2===0;if(this.caution){const i=t.anyFailed,r=i||t.anyImpaired;if(this.caution.visible=r,r){const a=.5+.5*Math.sin(this.time*(i?9:3.5));this.caution.intensity=(i?.45:.2)*a,this.caution.color.setHex(i?16725016:16753706)}}this.draw(t,n)}draw(e,t){const n=this.ctx;if(!n||!this.texture)return;const i=e.getOxygenSeconds(),r=Number.isFinite(i)?iw(i):"OK",a=li.map(h=>e.getStatus(h.id)),o=`${a.join("")}|${r}|${t}`;if(o===this.signature)return;this.signature=o;const l=Yc/Go,c=Zc/2;n.fillStyle="#08090a",n.fillRect(0,0,Yc,Zc);for(let h=0;h<Go*2;h++){const u=h%Go*l,d=Math.floor(h/Go)*c,f=h===li.length;if(h>li.length)continue;const p=f?r==="OK"?"ok":i<90?"failed":"impaired":a[h],v=f?"O2":li[h].code,g=f?r:`${Math.round(e.getHealth(li[h].id)*100)}%`,[m,S]=tw[p],E=p==="failed"&&!t;n.fillStyle=E?"#120303":m,n.fillRect(u+4,d+4,l-8,c-8),n.fillStyle=E?"#5a1c14":S,n.font='bold 42px "Courier New", monospace',n.textAlign="center",n.textBaseline="middle",n.fillText(v,u+l/2,d+c/2-16),n.font='bold 28px "Courier New", monospace',n.fillText(g,u+l/2,d+c/2+24)}this.texture.needsUpdate=!0}}function iw(s){const e=Math.max(0,Math.min(Math.round(s),5999));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}const sw=/^SM_Lamp\d+_Diffuser$/,rw="Light_",aw="Lamp_Red",ow="Lamp_Warm",lw="LightShaft",cw=1.4,hw=3.2,zp=.3,uw=2;class dw{constructor(e=Math.random){this.random=e}lamps=[];accents=[];emergency=null;warm=null;shafts=[];reflective=[];time=0;attach(e){this.lamps.length=0,this.accents.length=0,this.reflective.length=0,this.shafts.length=0,this.emergency=null,this.warm=null,e.updateMatrixWorld(!0);const t=[];e.traverse(r=>{r instanceof Ns&&r.name.startsWith(rw)&&t.push(r)});const n=new Set,i=new Set;e.traverse(r=>{if(!(r instanceof Te))return;if(r.name===lw){const c=fw(r);c&&this.shafts.push({uniform:c,base:c.value,position:Vp(r),lamp:null});return}const a=pw(r);if(a&&!i.has(a)&&(i.add(a),a.name===aw&&!this.emergency&&(this.emergency={material:a,base:a.emissiveIntensity}),a.name===ow&&!this.warm&&(this.warm={material:a,base:a.emissiveIntensity}),a.envMapIntensity>0&&this.reflective.push({material:a,base:a.envMapIntensity})),!sw.test(r.name)||!a)return;const o=a.clone();o.name=`${a.name}_${r.name}`,r.material=o;const l=mw(r,t,n);l&&n.add(l),this.lamps.push({material:o,baseEmissive:o.emissiveIntensity,light:l,baseIntensity:l?l.intensity:0,seed:this.random()*Math.PI*2,outage:0,value:1,position:Vp(r)})});for(const r of t)n.has(r)||this.accents.push({light:r,base:r.intensity});for(const r of this.shafts){let a=null,o=uw;for(const l of this.lamps){const c=r.position.distanceTo(l.position);c>=o||(a=l,o=c)}r.lamp=a}}update(e,t,n,i){this.time+=e;for(const a of this.lamps){let o=t;if(a.outage>0)a.outage-=e,o=0;else if(n>0){const l=.5+.5*Math.sin(this.time*11.3+a.seed)*Math.sin(this.time*3.7+a.seed);o=t*(1-n*.55*l);const c=Math.min(n*Math.min(e,.1)*2.5,.3);this.random()<c&&(a.outage=.04+this.random()*.22)}a.value=o,a.material.emissiveIntensity=a.baseEmissive*o,a.light&&(a.light.intensity=a.baseIntensity*o)}for(const a of this.accents)a.light.intensity=a.base*t;for(const a of this.shafts)a.uniform.value=a.base*(a.lamp?a.lamp.value:t);this.warm&&(this.warm.material.emissiveIntensity=this.warm.base*t);const r=zp+(1-zp)*t;for(const a of this.reflective)a.material.envMapIntensity=a.base*r;this.emergency&&(this.emergency.material.emissiveIntensity=this.emergency.base*(i?hw:1))}}function Vp(s){s.geometry.computeBoundingBox();const e=s.geometry.boundingBox;return(e?e.getCenter(new b):new b).applyMatrix4(s.matrixWorld)}function fw(s){const n=(Array.isArray(s.material)?s.material[0]:s.material)?.uniforms?.uStrength;return n&&typeof n.value=="number"?n:null}function pw(s){const e=Array.isArray(s.material)?s.material:[s.material];for(const t of e)if(t instanceof je)return t;return null}function mw(s,e,t){s.geometry.computeBoundingBox();const n=s.geometry.boundingBox;if(!n)return null;let i=null,r=cw;for(const a of e){if(t.has(a))continue;const o=n.distanceToPoint(a.position);o>=r||(i=a,r=o)}return i}const gw={base:2.5,perUnit:9,abortRange:1.9,withoutTool:.5};class _w{constructor(e,t={}){this.systems=e,this.params={...gw,...t}}toolInHand=!1;job=null;progress=0;startHealth=1;duration=1;lastEnd=null;params;getParams(){return this.params}getJob(){return this.job}isActive(e){return e===void 0?this.job!==null:this.job===e}getProgress(){return this.job?this.progress:0}getLastEnd(){return this.lastEnd}start(e){return this.systems.getHealth(e)>=1||this.job===e?!1:(this.job=e,this.progress=0,this.startHealth=this.systems.getHealth(e),this.duration=this.params.base+(1-this.startHealth)*this.params.perUnit,!0)}cancel(e="cancelled"){this.job&&(this.lastEnd={id:this.job,reason:e,age:0},this.job=null,this.progress=0)}update(e,t){this.lastEnd&&(this.lastEnd.age+=e);const n=this.job;if(!n)return;if(t===null||t>this.params.abortRange){this.cancel("aborted");return}const i=this.systems.getRepairSpeed()*(this.toolInHand?1:this.params.withoutTool),r=e*i/Math.max(this.duration,.001);this.progress+=r,this.systems.repair(n,(1-this.startHealth)*r),this.progress>=1&&(this.systems.repair(n,1),this.progress=1,this.cancel("done"))}}const xw=[{id:"lighting",position:[.695,1.4,.45],facing:[-1,0,0],size:[.34,.46]},{id:"lifeSupport",position:[-.695,1.45,-.35],facing:[1,0,0],size:[.38,.34]},{id:"engine",position:[-.05,1.42,-5.17],facing:[0,0,1],size:[.8,.62],range:1.7},{id:"thrusters",position:[1.615,1.45,-3.25],facing:[-1,0,0],size:[.4,.44]},{id:"generator",position:[-1.615,1.45,-4.93],facing:[1,0,0],size:[.4,.5]},{id:"weapons",position:[1.575,1.34,2.32],facing:[-1,0,0],size:[.36,.44]},{id:"sensors",position:[-1.575,1.38,2.32],facing:[1,0,0],size:[.34,.42]}],vw=new b(-1.42,1.42,-1.86),Mw="SM_Bench_Tool2",gr=.06,Wo={ok:3111482,impaired:16753706,failed:16723742},Hp={ok:.25,impaired:1.9,failed:2.4},Gp={ok:0,impaired:1.1,failed:2.6},Wp={ok:.14,impaired:.6,failed:.8},Sw=3.4,yw={ok:0,impaired:1.15,failed:2},bw={ok:0,impaired:7,failed:40},Ew=new mt,ns=new b,Jc=new b,pr=new b,Xp=new Se,mr=new se,Tw=new se(16777215);function ww(s){if(typeof document>"u")return null;const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d");if(!t)return null;t.fillStyle="#151719",t.fillRect(0,0,e.width,e.height),t.strokeStyle="#5a5f66",t.lineWidth=6,t.strokeRect(8,8,e.width-16,e.height-16),t.fillStyle="#d8d2c2",t.font='bold 62px "Courier New", monospace',t.textAlign="center",t.textBaseline="middle",t.fillText(s,e.width/2,e.height/2+4,e.width-48);const n=new gn(e);return n.colorSpace=ft,n}class Aw{constructor(e,t,n=0){this.area=t,this.offsetY=n,this.count=e,this.positions=new Float32Array(e*3),this.velocity=new Float32Array(e*3),this.life=new Float32Array(e);for(let a=0;a<e;a++)this.positions[a*3+1]=-999;const i=new Ut;i.setAttribute("position",new vt(this.positions,3));const r=new Pu({color:16738836,size:.02,sizeAttenuation:!0,transparent:!0,opacity:.85,blending:pn,depthWrite:!1});this.points=new Lu(i,r),this.points.name="RepairPanel_Sparks",this.points.frustumCulled=!1}points;life;velocity;positions;count;pending=0;update(e,t,n,i){this.pending+=t*e;for(let r=0;r<this.count;r++){if(this.life[r]>0){if(this.life[r]-=e,this.life[r]<=0){this.positions[r*3+1]=-999;continue}for(let a=0;a<3;a++)this.velocity[r*3+a]+=n.getComponent(a)*2.6*e,this.positions[r*3+a]+=this.velocity[r*3+a]*e;continue}this.pending<1||(this.pending-=1,this.spawn(r,i,n))}this.points.geometry.getAttribute("position").needsUpdate=!0}spawn(e,t,n){const[i,r]=this.area;this.positions[e*3]=(t()-.5)*i,this.positions[e*3+1]=this.offsetY+(t()-.5)*r,this.positions[e*3+2]=gr/2+.01;const a=.3+t()*.8;this.velocity[e*3]=(t()-.5)*1.1+n.x*a,this.velocity[e*3+1]=(t()-.5)*.5+n.y*a,this.velocity[e*3+2]=.35+t()*1.3+n.z*a,this.life[e]=.16+t()*.34}}class Rw{constructor(e,t,n,i=Math.random){this.systems=e,this.repair=t,this.interactables=n,this.random=i,this.root.name="RepairPanels"}panels=[];root=new tn;toolTaken=!1;toolMesh=null;toolDetach=null;time=0;getPanels(){return this.panels}attach(e){this.detach(),e.add(this.root),e.updateMatrix();for(const t of xw){const n=this.build(t),[i,r,a]=t.position;n.local.copy(ns.set(i,r,a).applyMatrix4(e.matrix)),this.root.add(n.group),this.register(n,t.range),this.panels.push(n)}this.attachTool(e),this.root.traverse(t=>t.layers.set(0))}detach(){for(const e of this.panels)e.detach?.();this.panels.length=0,this.toolDetach?.(),this.toolDetach=null,this.toolMesh=null,this.root.clear(),this.root.removeFromParent()}update(e,t){this.time+=e;const n=this.repair.getJob();let i=null;if(n&&t){const r=this.panels.find(a=>a.id===n);r&&(i=Pw(t,r.local))}this.repair.update(e,i);for(const r of this.panels){const a=this.systems.getStatus(r.id),o=this.repair.isActive(r.id),l=o?.35+.65*(.5+.5*Math.sin(this.time*14)):Gp[a]===0?1:.35+.65*(.5+.5*Math.sin(this.time*Gp[a]*Math.PI*2));mr.setHex(o?10474751:Wo[a]),r.status.emissive.copy(mr),r.status.color.copy(mr).multiplyScalar(.25),r.status.emissiveIntensity=(o?2.6:Hp[a])*l,r.label&&(r.label.emissiveIntensity=o?.7:Wp[a],r.label.emissive.copy(mr).lerp(Tw,.5)),r.housing.emissive.copy(mr),r.housing.emissiveIntensity=o?.14:a==="ok"?0:.1*l;const c=a!=="ok"||o;r.light.visible=c,c&&(r.light.color.copy(mr),r.light.intensity=(o?1.1:yw[a])*l),r.sparks.update(e,o?6:bw[a],r.gravity,this.random)}}build(e){const[t,n]=e.size,i=new tn,r=as.definition(e.id);i.name=`RepairPanel_${e.id}`,i.position.set(e.position[0],e.position[1],e.position[2]),i.quaternion.copy(Cw(e));const a=new je({color:2895667,metalness:.85,roughness:.5,emissive:new se(Wo.ok),emissiveIntensity:0}),o=new Te(new mn(t,n,gr),a);o.castShadow=!0,o.receiveShadow=!0,i.add(o);const l=new Te(new mn(t+.05,n+.05,gr*.6),new je({color:8225416,metalness:.9,roughness:.45}));l.position.z=-gr*.25,l.castShadow=!0,l.receiveShadow=!0,i.add(l);const c=new je({color:662029,emissive:new se(Wo.ok),emissiveIntensity:Hp.ok,roughness:.35,metalness:0,side:Gt}),h=new Te(new _i(t*.76,Math.min(n*.24,.085)),c);h.position.set(0,n*.26,gr/2+.002),i.add(h);const u=ww(r.name);let d=null;if(u){d=new je({map:u,emissiveMap:u,emissive:new se(16777215),emissiveIntensity:Wp.ok,roughness:.7,metalness:0});const g=new Te(new _i(t*.84,Math.min(n*.3,.095)),d);g.position.set(0,-n*.16,gr/2+.002),i.add(g)}const f=new Ns(Wo.failed,0,Sw,1.25);f.name=`RepairPanel_${e.id}_Glow`,f.position.set(0,0,.28),f.visible=!1,i.add(f);const p=new Aw(40,[t*.5,n*.06],n*.16);i.add(p.points);const v=new b(0,-1,0).applyQuaternion(i.quaternion.clone().invert());return{id:e.id,group:i,status:c,housing:a,label:d,light:f,sparks:p,gravity:v,local:new b,detach:null}}register(e,t){const n=as.definition(e.id),i={position:e.local,label:()=>this.labelFor(e.id,n.name),enabled:()=>this.systems.getHealth(e.id)<1||this.repair.isActive(e.id),activate:()=>{this.repair.isActive(e.id)?this.repair.cancel():this.repair.start(e.id)}};t!==void 0&&(i.range=t),e.detach=this.interactables.add(i)}labelFor(e,t){if(this.repair.isActive(e))return`F — REPARATUR ${Math.round(this.repair.getProgress()*100)}%  (ABBRECHEN)`;const n=Math.round(this.systems.getHealth(e)*100),i=this.toolTaken?"":" — OHNE WERKZEUG LANGSAM";return`F — ${t} REPARIEREN (${n}%)${i}`}attachTool(e){this.toolMesh=e.getObjectByName(Mw)??null,this.toolTaken=!1,this.repair.toolInHand=!1,this.toolMesh&&(this.toolMesh.visible=!0),ns.copy(vw).applyMatrix4(e.matrix);const t=ns.clone();this.toolDetach=this.interactables.add({position:t,label:()=>this.toolTaken?"F — WERKZEUG ZURUECKLEGEN":"F — WERKZEUG NEHMEN",range:1.1,activate:()=>{this.toolTaken=!this.toolTaken,this.repair.toolInHand=this.toolTaken,this.toolMesh&&(this.toolMesh.visible=!this.toolTaken)}})}}function Cw(s){ns.set(s.facing[0],s.facing[1],s.facing[2]).normalize();const e=s.up;return e?pr.set(e[0],e[1],e[2]):Math.abs(ns.y)>.95?pr.set(0,0,-1):pr.set(0,1,0),Jc.crossVectors(pr,ns).normalize(),pr.crossVectors(ns,Jc).normalize(),Xp.makeBasis(Jc,pr,ns),Ew.setFromRotationMatrix(Xp)}function Pw(s,e){const t=s.x-e.x,n=s.y+l0-e.y,i=s.z-e.z;return Math.sqrt(t*t+n*n+i*i)}class Lw{systems;repair;panels;lights;annunciator=new nw;deps;constructor(e){this.deps=e;const t=e.random??Math.random;this.systems=new as({random:t}),this.repair=new _w(this.systems),this.panels=new Rw(this.systems,this.repair,e.interactables,t),this.lights=new dw(t),this.pushFactors()}attachInterior(e){this.panels.attach(e),this.lights.attach(e),this.annunciator.attach(e)}fixedUpdate(e,t){t&&(this.systems.applyImpact(t.damage,t.direction),this.pushFactors()),this.systems.update(e)}update(e,t){this.pushFactors(),this.systems.sensorsOnline||this.deps.targeting.clear(),this.panels.update(e,t),this.lights.update(e,this.systems.getLightLevel(),this.systems.getFlicker(),this.systems.emergencyLighting),this.annunciator.update(e,this.systems)}reset(){this.repair.cancel(),this.systems.repairAll(),this.pushFactors()}getHudState(){return{systems:li.map(e=>({id:e.id,code:e.code,name:e.name,health:this.systems.getHealth(e.id),status:this.systems.getStatus(e.id)})),oxygen:this.systems.oxygen,oxygenSeconds:this.systems.getOxygenSeconds(),anyImpaired:this.systems.anyImpaired,anyFailed:this.systems.anyFailed,repairing:this.repair.getJob(),repairProgress:this.repair.getProgress()}}pushFactors(){this.deps.flight.setDamage(this.systems.getFlightDamage()),this.deps.weapons.setDamage(this.systems.getWeaponDamage())}}const Iw=15;function Rt(s,e,t){const n=document.createElement(s);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n}function Xo(s){return`${Math.round(s).toLocaleString("de-DE")} Cr`}class Dw{constructor(e){this.hold=e,this.build(),document.body.appendChild(this.root),this.unsubscribe=this.hold.onChange(()=>{this.open&&this.render()}),this.onKeyDown=t=>{t.code==="Escape"&&this.open&&this.hide()},window.addEventListener("keydown",this.onKeyDown)}root=Rt("div","cargo");body=Rt("tbody");empty=Rt("div","cargo__empty","LADERAUM LEER");totals=Rt("div","cargo__totals");bar=Rt("div","cargo__bar");barFill=Rt("i");table=Rt("table","cargo__table");open=!1;unsubscribe;onKeyDown;get isOpen(){return this.open}show(){this.open=!0,this.render(),this.root.hidden=!1}hide(){this.open=!1,this.root.hidden=!0}toggle(){this.open?this.hide():this.show()}dispose(){this.unsubscribe(),window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}build(){this.root.hidden=!0;const e=Rt("div","cargo__title");e.append(Rt("span",void 0,"FRACHTMANIFEST"),Rt("span",void 0,"LADERAUM"));const t=Rt("thead"),n=Rt("tr");for(const i of["WARE","TONNEN","EK / T","WERT"])n.appendChild(Rt("th",void 0,i));t.appendChild(n),this.table.append(t,this.body),this.bar.appendChild(this.barFill),this.root.append(e,this.table,this.empty,this.totals,this.bar),this.root.appendChild(Rt("div","cargo__hint","F / ESC — SCHLIESSEN"))}render(){const e=this.hold.getManifest();this.body.replaceChildren();for(const a of e){const o=hn[a.good],l=Rt("tr"),c=Rt("td"),h=Rt("span","cargo__chip");h.style.background=`#${o.color.toString(16).padStart(6,"0")}`,c.append(h,document.createTextNode(`${o.name} (${o.code})`)),l.append(c,Rt("td",void 0,Oi(a.tons)),Rt("td",void 0,Xo(a.avgPrice)),Rt("td",void 0,Xo(a.avgPrice*a.tons))),this.body.appendChild(l)}const t=e.length>0;this.table.hidden=!t,this.empty.hidden=t;const n=this.hold.getUsedCapacity(),i=this.hold.getCapacity(),r=this.hold.getLoadFactor();this.totals.replaceChildren(this.line("BELEGT",`${Oi(n)} / ${i} t`),this.line("FREI",`${Oi(this.hold.getFreeCapacity())} t`),this.line("EINSTAND",Xo(this.hold.getPurchaseValue())),this.line("GUTHABEN",Xo(this.hold.getCredits())),this.line("MASSE",`${Oi(Iw+n)} t`)),this.barFill.style.width=`${Math.min(r,1)*100}%`,this.bar.classList.toggle("is-full",r>.9)}line(e,t){const n=Rt("div","cargo__row");return n.append(Rt("span",void 0,e),Rt("span",void 0,t)),n}}const Nw={color:9146261,metalness:.9,roughness:.42},Uw={color:3356218,metalness:.85,roughness:.55},Fw={color:1710618,metalness:0,roughness:.94},qo=.05,Ow=.17,Ko=.004;function Bw(s){const e=s.getAttribute("position"),t=s.getAttribute("normal");if(!e||!t)return;const n=new Float32Array(e.count*2);for(let i=0;i<e.count;i++){const r=e.getX(i),a=e.getY(i),o=e.getZ(i),l=Math.abs(t.getX(i)),c=Math.abs(t.getY(i)),h=Math.abs(t.getZ(i));let u,d;l>=c&&l>=h?(u=o,d=a):c>=h?(u=r,d=o):(u=r,d=a),n[i*2]=u/Ar,n[i*2+1]=d/Ar}s.setAttribute("uv",new vt(n,2))}function kw(s){const n=document.createElement("canvas");n.width=256,n.height=64;const i=n.getContext("2d");if(!i)throw new Error("CargoCrates: 2D-Kontext nicht verfuegbar");const r=`#${new se(s.accent).getHexString()}`;if(i.clearRect(0,0,256,64),s.hazard){i.fillStyle=r,i.fillRect(0,10,256,44),i.fillStyle="rgba(12,10,9,0.92)";for(let o=-64;o<256;o+=34)i.beginPath(),i.moveTo(o,54),i.lineTo(o+17,54),i.lineTo(o+17+22,10),i.lineTo(o+22,10),i.closePath(),i.fill()}else{i.fillStyle="rgba(16,16,15,0.9)",i.fillRect(76,8,104,48),i.strokeStyle=r,i.lineWidth=3,i.strokeRect(76,8,104,48),i.fillStyle=r,i.font="bold 30px ui-monospace, Menlo, monospace",i.textAlign="center",i.textBaseline="middle",i.fillText(s.code,128,64/2+1),i.fillStyle="rgba(190,185,175,0.55)";for(let o=0;o<5;o++)i.fillRect(20+o*8,26,3,12),i.fillRect(196+o*8,26,3,12)}const a=new gn(n);return a.colorSpace=ft,a.anisotropy=4,a}class zw{geometries=new Map;goodMaterials=new Map;prototypes=new Map;shared;disposables=[];panel;worn;environment=null;constructor(){this.panel=_l("panel"),this.worn=_l("worn");for(const e of[this.panel,this.worn])this.disposables.push(e.map,e.roughnessMap,e.normalMap);this.shared={steel:this.metal("Cargo_Steel",Nw,this.worn),dark:this.metal("Cargo_Dark",Uw,this.panel),rubber:this.metal("Cargo_Rubber",Fw,null)}}setEnvironment(e){if(!(!e||e===this.environment)){this.environment=e;for(const t of this.allMaterials())t.envMap=e,t.needsUpdate=!0}}create(e){let t=this.prototypes.get(e.id);return t||(t=this.build(e),this.prototypes.set(e.id,t)),t.clone(!0)}dispose(){for(const e of this.geometries.values())e.dispose();for(const e of this.goodMaterials.values())for(const t of Object.values(e))t.dispose();for(const e of Object.values(this.shared))e.dispose();for(const e of this.disposables)e.dispose();this.geometries.clear(),this.goodMaterials.clear(),this.prototypes.clear()}box(e,t,n){return this.cachedBox(`b:${e}:${t}:${n}`,e,t,n,!0)}plainBox(e,t,n){return this.cachedBox(`p:${e}:${t}:${n}`,e,t,n,!1)}cachedBox(e,t,n,i,r){let a=this.geometries.get(e);return a||(a=new mn(t,n,i),r&&Bw(a),this.geometries.set(e,a)),a}cylinder(e,t,n=16){const i=`c:${e.toFixed(4)}:${t.toFixed(4)}:${n}`;let r=this.geometries.get(i);return r||(r=new Pr(e,e,t,n),this.geometries.set(i,r)),r}metal(e,t,n){const i=new je({name:e,color:t.color,metalness:t.metalness,roughness:t.roughness,envMap:this.environment});return n&&(i.map=n.map,i.roughnessMap=n.roughnessMap,i.normalMap=n.normalMap,i.normalScale.set(.55,.55)),i}materialsFor(e){let t=this.goodMaterials.get(e.id);if(t)return t;const n=this.metal(`Cargo_Paint_${e.id}`,{color:e.color,metalness:.05,roughness:.66},this.panel),i=this.metal(`Cargo_Trim_${e.id}`,{color:new se(e.color).multiplyScalar(.55).getHex(),metalness:.35,roughness:.58},this.worn),r=this.metal(`Cargo_Accent_${e.id}`,{color:e.accent,metalness:0,roughness:.55},null),a=kw(e);this.disposables.push(a);const o=new je({name:`Cargo_Label_${e.id}`,map:a,transparent:!0,alphaTest:.5,metalness:0,roughness:.72,envMap:this.environment});return t={paint:n,trim:i,accent:r,label:o},this.goodMaterials.set(e.id,t),t}*allMaterials(){yield*Object.values(this.shared);for(const e of this.goodMaterials.values())yield*Object.values(e)}mesh(e,t,n=0,i=0,r=0){const a=new Te(e,t);return a.position.set(n,i,r),a.castShadow=!0,a.receiveShadow=!0,a}addCorners(e,t,n,i,r=0){const a=this.box(qo,n,qo),o=t/2-qo/2-r,l=i/2-qo/2-r;for(const c of[-1,1])for(const h of[-1,1])e.add(this.mesh(a,this.shared.steel,c*o,n/2,h*l))}addLabel(e,t,n,i,r){const a=this.materialsFor(t),o=this.plainBox(n+Ko*2,Ow,i+Ko*2);e.add(this.mesh(o,a.label,0,r,0))}build(e){const t=Vu[e.container],n=new tn;return n.name=`Cargo_${e.id}`,{bin:()=>this.buildBin(n,e,t),crate:()=>this.buildCrate(n,e,t),barrels:()=>this.buildBarrels(n,e,t),case:()=>this.buildCase(n,e,t)}[e.container](),n}buildBin(e,t,n){const i=this.materialsFor(t),r=bs,a=Es,o=n-.11;e.add(this.mesh(this.box(r-.1,.05,a-.1),this.shared.dark,0,.025,0)),e.add(this.mesh(this.box(r-.06,o,a-.06),i.paint,0,.05+o/2,0));for(const l of[.34,.68]){const c=.05+o*l;e.add(this.mesh(this.box(r-.04,.035,a-.04),i.trim,0,c,0))}e.add(this.mesh(this.box(r,.06,a),this.shared.dark,0,n-.03,0)),this.addCorners(e,r,n-.06,a),this.addLabel(e,t,r-.06,a-.06,.05+o*.88)}buildCrate(e,t,n){const i=this.materialsFor(t),r=bs,a=Es,o=n-.05;e.add(this.mesh(this.box(r-.05,o,a-.05),i.paint,0,o/2,0)),e.add(this.mesh(this.box(r,.05,a),i.trim,0,n-.025,0));const l=this.box(.09,o+.06,a+Ko*2);e.add(this.mesh(l,this.shared.rubber,0,(o+.06)/2,0)),this.addCorners(e,r,o,a),this.addLabel(e,t,r-.05,a-.05,o*.42)}buildBarrels(e,t,n){const i=this.materialsFor(t),r=.09,a=n-r,o=.145;e.add(this.mesh(this.box(bs,r,Es),this.shared.dark,0,r/2,0));const l=this.cylinder(o,a),c=this.cylinder(o+.008,.035),h=this.cylinder(o*.72,.02);for(const u of[-1,1])for(const d of[-1,1]){const f=u*.16,p=d*.19;e.add(this.mesh(l,i.paint,f,r+a/2,p));for(const v of[.28,.72])e.add(this.mesh(c,i.accent,f,r+a*v,p));e.add(this.mesh(h,this.shared.steel,f,r+a-.01,p))}this.addLabel(e,t,bs-.08,Es-.08,r*.55)}buildCase(e,t,n){const i=this.materialsFor(t),r=bs,a=Es,o=n-.06;e.add(this.mesh(this.box(r-.04,o,a-.04),i.paint,0,o/2,0)),e.add(this.mesh(this.box(r,.06,a),this.shared.dark,0,n-.03,0)),e.add(this.mesh(this.box(r-.02,.04,a-.02),this.shared.steel,0,o-.02,0));const l=this.box(.1,.05,a+Ko*2);for(const c of[-1,1])e.add(this.mesh(l,i.accent,c*.17,o-.09,0));this.addCorners(e,r,o,a,.01),this.addLabel(e,t,r-.04,a-.04,o*.42)}}const x0=[{id:"S0",x:1.08,z:-4.76,headroom:2,aisle:!1},{id:"P0",x:-1.08,z:-4.76,headroom:2,aisle:!1},{id:"C0",x:0,z:-4.76,headroom:2,aisle:!1},{id:"S1",x:1.08,z:-3.9,headroom:2,aisle:!1},{id:"P1",x:-1.08,z:-3.9,headroom:2,aisle:!1},{id:"S2",x:1.08,z:-3.04,headroom:2,aisle:!1},{id:"P2",x:-1.08,z:-3.04,headroom:1.4,aisle:!1},{id:"S3",x:1.08,z:-2.18,headroom:1.4,aisle:!1},{id:"A0",x:-.4,z:-3.9,headroom:1.4,aisle:!0},{id:"A1",x:-.4,z:-3.04,headroom:1.4,aisle:!0},{id:"A2",x:-.4,z:-2.18,headroom:1.4,aisle:!0}],Vw=.03,qp=.015;function Qc(s){const e=Math.sin(s*127.1)*43758.5453;return(e-Math.floor(e))*2-1}function Kp(s,e=x0){const t=[],n=new Set;let i=0,r=0,a=0,o=0;for(const c of s){const h=hn[c.good];if(!h||c.tons<=0)continue;const u=Vu[h.container],d=HT(h,c.tons);a>0&&(r++,a=0,o=0);for(let f=0;f<d;f++){for(;r<e.length&&a+u>e[r].headroom+1e-6;)r++,a=0,o=0;if(r>=e.length){i+=d-f;break}const p=e[r],v=r*17+o*3+1;n.add(p.id),t.push({good:c.good,slot:p.id,level:o,x:p.x+Qc(v)*qp,z:p.z+Qc(v+.5)*qp,y:a,yaw:Qc(v+1.5)*Vw,width:bs,depth:Es,height:u}),a+=u,o++}}let l=0;for(const c of e)c.aisle&&n.has(c.id)&&l++;return{units:t,overflow:i,slotsUsed:n.size,aisleSlotsUsed:l}}const Hw=-1.45,Gw=1.45,Ww=-5.2,Xw=-1.2,jc={maxX:-.9,minZ:-2.4,maxZ:-1.3},eh=.05,qw=1.6;function $p(s,e,t,n){if(s<Hw+t||s>Gw-t||e<Ww+t||e>Xw-t||s<jc.maxX+t&&e>jc.minZ-t&&e<jc.maxZ+t)return!1;for(const i of n){const r=i.width/2+t,a=i.depth/2+t;if(Math.abs(s-i.x)<r&&Math.abs(e-i.z)<a)return!1}return!0}function Kw(s,e,t,n){if($p(s,e,t,n))return null;for(let i=eh;i<=qw;i+=eh){const r=Math.max(8,Math.round(2*Math.PI*i/eh));for(let a=0;a<r;a++){const o=a/r*Math.PI*2,l=s+Math.cos(o)*i,c=e+Math.sin(o)*i;if($p(l,c,t,n))return{x:l,z:c}}}return null}const Yp="OFF_",$w="CargoStacks",Yw="COL_Cargo_",nu=1.15,Zw=new b(0,nu,-2);class Jw{anchors=[new b,new b];hold;options;factory=new zw;group=new tn;colliderGeometries=[];colliderMaterial=new Wt({visible:!1});interior=null;plan=Kp([]);unsubscribe=null;constructor(e){this.hold=e.hold,this.options=e,this.group.name=$w,this.updateAnchors(),this.unsubscribe=this.hold.onChange(()=>this.rebuild())}attach(e){this.interior!==e&&(this.interior=e,jw(e),e.add(this.group),this.rebuild())}getPlan(){return this.plan}get crateCount(){return this.plan.units.length}rebuild(){if(this.plan=Kp(this.hold.getManifest()),this.updateAnchors(),!!this.interior){this.clearGroup(),this.factory.setEnvironment(Qw(this.interior));for(const e of this.plan.units){const t=hn[e.good],n=this.factory.create(t);n.position.set(e.x,e.y,e.z),n.rotation.y=e.yaw,n.name=`Cargo_${e.slot}_${e.level}`,this.group.add(n);const i=new mn(e.width,e.height,e.depth);this.colliderGeometries.push(i);const r=new Te(i,this.colliderMaterial);r.name=`${Yw}${e.slot}_${e.level}`,r.position.set(e.x,e.y+e.height/2,e.z),r.rotation.y=e.yaw,r.visible=!1,this.group.add(r)}this.group.traverse(e=>e.layers.set(0)),this.group.updateMatrixWorld(!0),this.options.onCollidersChanged?.(),this.options.onGeometryChanged?.()}}dispose(){this.unsubscribe?.(),this.unsubscribe=null,this.clearGroup(),this.group.removeFromParent(),this.colliderMaterial.dispose(),this.factory.dispose(),this.interior=null}clearGroup(){this.group.clear();for(const e of this.colliderGeometries)e.dispose();this.colliderGeometries.length=0}updateAnchors(){const e=new Set(this.plan.units.map(r=>r.slot)),t=x0.filter(r=>e.has(r.id));if(t.length===0){for(const r of this.anchors)th(Zw,r);return}let n=t[0],i=t[0];for(const r of t)r.z>n.z&&(n=r),r.z<i.z&&(i=r);th(new b(n.x,nu,n.z),this.anchors[0]),th(new b(i.x,nu,i.z),this.anchors[1])}}function Qw(s){let e=null;return s.traverse(t=>{if(e||!(t instanceof Te)||t.name.startsWith("COL_"))return;const n=Array.isArray(t.material)?t.material:[t.material];for(const i of n){const r=i.envMap;if(r){e=r;return}}}),e}function th(s,e){return e.set(-s.x,s.y,-s.z)}function jw(s){const e=[];s.traverse(t=>{/^SM_Crate\d/.test(t.name)?(t.visible=!1,e.push(t)):t.name.startsWith("COL_Crate")&&e.push(t)});for(const t of e)t.name.startsWith(Yp)||(t.name=Yp+t.name)}function Zp(s,e,t=Hu){const n=e.getShipMass(t);return s.getParams().mass=n,n}function eA(s,e,t=Hu){return Zp(s,e,t),e.onChange(()=>Zp(s,e,t))}const tA=1.7,nA=[["ore",6],["parts",4]];function iA(s){const{ship:e,walk:t,flight:n,renderer:i}=s,r=new XT(s),a=s.interactables??new c0,o=new Jw({hold:r,onCollidersChanged:()=>{e.refreshColliders(),t.rebuildCollision(),l()},onGeometryChanged:()=>{i.shadowMap.needsUpdate=!0}});function l(){const f=o.getPlan().units;if(f.length===0)return;const p=Kw(-t.position.x,-t.position.z,Ii,f);p&&(t.position.x=-p.x,t.position.z=-p.z,t.velocity.x=0,t.velocity.z=0)}const c=e.onInteriorChange(f=>o.attach(f)),h=eA(n,r),u=new Dw(r),d=o.anchors.map(f=>a.add({position:f,range:tA,label:()=>{if(u.isOpen)return"F — MANIFEST SCHLIESSEN";const p=r.getUsedCapacity();return p>0?`F — FRACHTMANIFEST · ${Oi(p)} T`:"F — FRACHTMANIFEST · LEER"},activate:()=>u.toggle()}));for(const[f,p]of s.initialLoad??nA)r.add(f,p);return{hold:r,visuals:o,panel:u,interactables:a,load:(f,p)=>r.add(f,p),unload:(f,p)=>r.remove(f,p),fill:f=>{if(f){r.add(f,r.getFreeCapacity());return}const p=Object.keys(hn);for(const v of p){const g=r.getFreeCapacity();if(g<=.001)break;r.add(v,Math.min(g,r.getCapacity()/p.length))}},clear:()=>r.clear(),dispose:()=>{for(const f of d)f();c(),h(),u.dispose(),o.dispose()}}}const Jp="ShipExterior",Qp="Glass",sA={Hull_Paint:{color:9274481,metalness:.04,roughness:.64},Hull_Panel:{color:8090982,metalness:.05,roughness:.72},Hull_Olive:{color:4936e3,metalness:.05,roughness:.68},Metal_Bare:{color:9146261,metalness:.9,roughness:.42},Metal_Dark:{color:3093046,metalness:.85,roughness:.55},Metal_Rust:{color:7158304,metalness:.1,roughness:.9},Rubber_Black:{color:1250067,metalness:0,roughness:.92},Hazard:{color:12487188,metalness:0,roughness:.62},Marking:{color:12433577,metalness:0,roughness:.7}},rA={Hull_Paint:"panel",Hull_Panel:"panel",Hull_Olive:"panel",Metal_Bare:"worn",Metal_Dark:"panel",Metal_Rust:"worn",Hazard:"worn",Marking:"worn"},jp=.8,em=[.211,.043],aA=1,oA=1.6;function iu(s){return s<0?0:s>1?1:s}function lA(s){return s.assistEnabled?s.maxSetSpeed>0?iu(s.setSpeed/s.maxSetSpeed):0:iu(Math.max(s.main,0))}function cA(s,e){const t=.9+s*3.4;return e?t+4:t}function hA(s,e,t=0){const n=((s+t)%e+e)%e,i=r=>Math.max(0,1-Math.abs(n-r)/.06);return Math.min(1,i(0)+i(.2))}const uA=["Thruster_0","Thruster_1","Thruster_2","Thruster_3"],dA=[{marker:"Nav_Port",mesh:"SM_Lamp_NavPort",color:16720920,kind:"steady",phase:0},{marker:"Nav_Star",mesh:"SM_Lamp_NavStar",color:2883418,kind:"steady",phase:0},{marker:"Beacon_Top",mesh:"SM_Lamp_BeaconTop",color:16777215,kind:"strobe",phase:0},{marker:"Beacon_Belly",mesh:"SM_Lamp_BeaconBelly",color:16777215,kind:"strobe",phase:.9},{marker:"Beacon_Tail",mesh:"SM_Lamp_BeaconTail",color:16773328,kind:"strobe",phase:1.4}],fA=1.7,pA="Nozzle_Glow";class mA extends Be{thrusters=[];lamps=[];glow=[];time=0;constructor(e){super(),this.name="ShipExterior",this.visible=!1,this.add(e),this.collectThrusters(e),this.collectLamps(e),this.collectGlow(e)}setVisible(e){this.visible=e}update(e,t){if(!this.visible)return;this.time+=e;const n=t.getParams(),i=lA({assistEnabled:t.assistEnabled,setSpeed:t.setSpeed,maxSetSpeed:n.maxSetSpeed,main:t.inputs.main,afterburner:t.inputs.afterburner}),r=t.inputs.afterburner,a=cA(i,r),o=i>.01||r;for(const l of this.glow)l.emissiveIntensity=.1+i*2+(r?1.6:0);for(const l of this.thrusters){if(l.plume.visible=o,!o)continue;const c=1+.07*Math.sin(this.time*37+l.phase)+.04*Math.sin(this.time*61.7+l.phase*2.3);l.plume.scale.set(c,c,a*c);const h=l.plume.material;h.opacity=iu(.3+i*.38+(r?.2:0)),r?h.color.setRGB(.86,.92,1):h.color.setRGB(1,.94,.86)}for(const l of this.lamps){const c=l.spec.kind==="steady"?.75+.25*Math.sin(this.time*2.1):hA(this.time,fA,l.spec.phase);l.material.emissiveIntensity=l.baseIntensity*(.12+c*1.6),l.halo.material.opacity=.12+c*.88,l.halo.scale.setScalar(l.halo.userData.size*(.7+c*.6))}}collectThrusters(e){e.updateMatrix();for(const[t,n]of uA.entries()){const i=e.getObjectByName(n);if(!i)continue;const r=i.position.clone().applyMatrix4(e.matrix),a=Math.abs(i.scale.x)||.5,o=new Te(gA(a),_A());o.position.copy(r),o.frustumCulled=!1,o.layers.set(0),this.add(o),this.thrusters.push({plume:o,phase:t*1.7})}}collectGlow(e){const t=new Set;e.traverse(n=>{if(!(n instanceof Te))return;const i=Array.isArray(n.material)?n.material:[n.material];for(const r of i)!r||t.has(r)||(t.add(r),r.name===pA&&r instanceof je&&(r.toneMapped=!1,this.glow.push(r)))})}collectLamps(e){e.updateMatrix();for(const t of dA){const n=e.getObjectByName(t.mesh),i=e.getObjectByName(t.marker);if(!(n instanceof Te)||!i)continue;const r=Array.isArray(n.material)?n.material[0]:n.material;if(!(r instanceof je))continue;const a=r.clone();a.name=`${r.name}_${t.mesh}`,a.emissive=new se(t.color),a.toneMapped=!1,n.material=a;const o=(Math.abs(i.scale.x)||.15)*6,l=new Sa(new Tr({map:xA(),color:new se(t.color),transparent:!0,blending:pn,depthWrite:!1,toneMapped:!1}));l.position.copy(i.position).applyMatrix4(e.matrix),l.userData.size=o,l.scale.setScalar(o),l.layers.set(0),this.add(l),this.lamps.push({material:a,halo:l,spec:t,baseIntensity:1.4})}}}function gA(s,e=16){const t=[[[0,1,[1,.84,.58,.8]],[.22,.92,[1,.52,.16,.62]],[.6,.55,[1,.28,.06,.3]],[1,.06,[.8,.14,.03,0]]],[[0,.52,[1,.98,.92,.95]],[.16,.44,[1,.9,.7,.7]],[.42,.16,[1,.6,.25,0]]]],n=[],i=[],r=[];for(const o of t){const l=n.length/3;for(const[c,h,u]of o)for(let d=0;d<e;d++){const f=d/e*Math.PI*2;n.push(Math.cos(f)*s*h,Math.sin(f)*s*h,c),i.push(...u)}for(let c=0;c<o.length-1;c++)for(let h=0;h<e;h++){const u=l+c*e+h,d=l+c*e+(h+1)%e,f=u+e,p=d+e;r.push(u,d,p,u,p,f)}}const a=new Ut;return a.setAttribute("position",new vt(new Float32Array(n),3)),a.setAttribute("color",new vt(new Float32Array(i),4)),a.setIndex(r),a}function _A(){return new Wt({vertexColors:!0,transparent:!0,blending:pn,depthWrite:!1,side:Gt,toneMapped:!1})}let $o=null;function xA(){if($o)return $o;const s=64,e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d"),n=t.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,0.55)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,s,s),$o=new gn(e),$o}function vA(s){const e=new Tu,t=new Te(new Kn(50,16,12),new Wt({color:658708,side:jt}));e.add(t);const n=new Te(new Kn(6,16,12),new Wt({color:16774370}));n.position.copy(s).normalize().multiplyScalar(40),e.add(n);const i=new Te(new Kn(20,12,10),new Wt({color:1846074}));return i.position.copy(s).normalize().multiplyScalar(-40),e.add(i),e}const vs=new b,Yo=new b;function MA(s){const e=s.geometry;if(e.getAttribute("uv"))return;const t=e.getAttribute("position"),n=e.getAttribute("normal");if(!t||!n)return;const i=new Float32Array(t.count*2);for(let r=0;r<t.count;r++){vs.fromBufferAttribute(t,r),Yo.fromBufferAttribute(n,r);const a=Math.abs(Yo.x),o=Math.abs(Yo.y),l=Math.abs(Yo.z);let c,h;a>=o&&a>=l?(c=vs.z,h=vs.y):o>=l?(c=vs.x,h=vs.z):(c=vs.x,h=vs.y),i[r*2]=c/Ar+em[0],i[r*2+1]=h/Ar+em[1]}e.setAttribute("uv",new vt(i,2))}function SA(s,e){const t=new Map,n=r=>{let a=t.get(r);return a||t.set(r,a=_l(r)),a},i=new Set;s.traverse(r=>{if(!(r instanceof Te))return;r.layers.set(0),r.castShadow=!1,r.receiveShadow=!1,MA(r);const a=Array.isArray(r.material)?r.material:[r.material];for(const o of a){if(!o||i.has(o)||!(o instanceof je))continue;i.add(o);const l=sA[o.name];l&&(o.color.setHex(l.color),o.metalness=l.metalness,o.roughness=l.roughness);const c=rA[o.name];if(c!==void 0){const h=n(c);o.map=h.map,o.roughnessMap=h.roughnessMap,o.normalMap=h.normalMap,o.normalScale.set(jp,jp)}o.name===Qp?(o.transparent=!0,o.opacity=.24,o.side=Gt,o.metalness=0,o.roughness=.04,o.color.setHex(2898498)):o.side=Un,e&&(o.envMap=e,o.envMapIntensity=o.name===Qp?oA:aA),o.needsUpdate=!0}})}async function yA(s,e,t=new b(.8,.3,-.1)){const i=await new e0().loadAsync(s),r=i.scene.getObjectByName(Jp)??i.scene;r.name=Jp,r.removeFromParent(),r.rotation.y=Math.PI,r.updateMatrix();const a=new wa(e),o=a.fromScene(vA(t),.04).texture;return a.dispose(),SA(r,o),new mA(r)}const bA="KeyC",EA={offset:[0,4.3,18.5],speedPull:4.5,speedReference:420,positionTau:.26,orientationTau:.38,maxLagAngle:.3,lookAhead:7,lookLift:1.3};function tm(s,e){return s>0?e>0?1-Math.exp(-e/s):0:1}function TA(s){return s<0?0:s>1?1:s}function wA(s,e){return s.offset[2]+s.speedPull*TA(e/s.speedReference)}function nm(s,e,t,n,i){return i.set(t.offset[0],t.offset[1],wA(t,n)),i.applyQuaternion(e),i.add(s)}function AA(s,e,t,n){return n.set(0,t.lookLift,-t.lookAhead),n.applyQuaternion(e),n.add(s)}const im=new Se;function RA(s,e,t,n){return im.lookAt(s,e,t),n.setFromRotationMatrix(im)}function CA(s,e,t){return t?"cockpit":e?s==="cockpit"?"chase":"cockpit":s}const sm=new b,rm=new b,am=new b;class PA{position=new b;rotation=new mt;lag=new mt;params;started=!1;constructor(e={}){this.params={...EA,...e}}get initialized(){return this.started}reset(e,t,n=0){this.lag.copy(t),nm(e,this.lag,this.params,n,this.position),this.aim(e,t),this.started=!0}step(e,t,n,i){if(!this.started){this.reset(t,n,i);return}this.lag.slerp(n,tm(this.params.orientationTau,e)),this.clampLag(n),nm(t,this.lag,this.params,i,sm),this.position.lerp(sm,tm(this.params.positionTau,e)),this.aim(t,n)}clampLag(e){const t=this.lag.angleTo(e);t>this.params.maxLagAngle&&this.lag.rotateTowards(e,t-this.params.maxLagAngle)}aim(e,t){AA(e,t,this.params,rm),am.set(0,1,0).applyQuaternion(this.lag),RA(this.position,rm,am,this.rotation)}}const om=new Se,lm=new Se,cm=new Se,nh=new Se,hm=new b(1,1,1);class LA{constructor(e,t){this.ship=e,this.camera=t}mode="cockpit";state=new PA;getMode(){return this.mode}get isChasing(){return this.mode==="chase"}update(e,t){const n=this.mode;return this.mode=CA(this.mode,t.toggle,t.walking),this.mode!=="chase"?this.mode:(n!=="chase"?this.state.reset(this.ship.position,this.ship.quaternion,t.speed):this.state.step(e,this.ship.position,this.ship.quaternion,t.speed),this.applyToCamera(),this.mode)}applyToCamera(){const e=this.ship.getSeatPilot();om.compose(this.ship.position,this.ship.quaternion,this.ship.scale),lm.copy(this.ship.matrixWorld).invert().multiply(e.matrixWorld),cm.multiplyMatrices(om,lm),nh.compose(this.state.position,this.state.rotation,hm.set(1,1,1)),nh.premultiply(cm.invert()),nh.decompose(this.camera.position,this.camera.quaternion,hm),this.camera.scale.set(1,1,1)}}const v0=document.getElementById("app");if(!v0)throw new Error("#app fehlt in index.html");const Nt=new Ny({antialias:!0,powerPreference:"high-performance"});Nt.setPixelRatio(Math.min(window.devicePixelRatio,2));Nt.setSize(window.innerWidth,window.innerHeight);Nt.toneMapping=Sl;Nt.toneMappingExposure=1;Nt.shadowMap.enabled=!0;Nt.shadowMap.type=pm;Nt.shadowMap.autoUpdate=!1;v0.appendChild(Nt.domElement);const ls=new Tu,fn=new en(65,window.innerWidth/window.innerHeight,.05,3e3);fn.rotation.order="YXZ";fn.layers.set(0);const ci=new en(65,window.innerWidth/window.innerHeight,1,3e4);ci.layers.set(zu);ls.add(ci);const os=new en(65,window.innerWidth/window.innerHeight,5e3,5e6);os.layers.set(g0);ls.add(os);const Gu=cT(Nt,ls,fn,ci,os),Br=new $y(new b(.8,.3,-.1).normalize()),Na=new Ky(6500);Na.setPixelRatio(Nt.getPixelRatio());const Cl=new qy({radius:22e4,position:new b(-.34,-.13,-.93).normalize().multiplyScalar(85e4),seed:12,sunDirection:Br.direction}),pi=new Gy,pt=new Qy,Fs=new $b,mi=new jb(pi,Fs),Ra=new sE,Is=new aE(pi,Fs),Ml=new lE,Wu=new fE,Xu=new TE,qu=new WE;pt.add(qu.group);ls.add(Na,Br,Cl,pi,pt,mi.mesh,Fs);for(const s of[pi,mi.mesh,Fs])s.traverse(e=>e.layers.set(zu));for(const s of[Na,Br,Cl])s.traverse(e=>e.layers.set(g0));Br.light.layers.enableAll();pt.getSeatPilot().add(fn);const bn=new Uy(Nt.domElement);Nt.domElement.addEventListener("mousedown",()=>bn.requestPointerLock());const Qt=new t1(pt),Pl=new Tb(bn,Qt),Ku=new Wb,Ll=new Db(bn,pt),Il=new c0,M0=iA({ship:pt,walk:Ll,flight:Qt,renderer:Nt,interactables:Il}),Ua=new yT;Ua.placeAt(new b(.36,.1,-.93).normalize().multiplyScalar(13400),24);ls.add(Ua);Ua.setLayer(zu);const S0=YT({hold:M0.hold,getHull:()=>Is.integrity,setHull:s=>{Is.integrity=s}}),$u=new kT({ship:pt,flight:Qt,station:Ua,input:bn,trade:S0}),IA=new LA(pt,fn);let su=null;yA("./models/ship-exterior.glb",Nt,Br.direction).then(s=>{su=s,pt.add(s),console.info("Aussenrumpf geladen — C schaltet die Aussenansicht um")}).catch(s=>{console.warn("Aussenrumpf-GLB nicht geladen, Aussenansicht bleibt aus:",s)});let ru=!1;function DA(s){ru=IA.update(s,{walking:di.isWalking,speed:Qt.getSpeed(),toggle:bn.wasPressed(bA)})==="chase",su?.setVisible(ru),su?.update(s,Qt)}const Dl=new Lw({flight:Qt,weapons:mi,targeting:Ra,interactables:Il}),di=new zb({input:bn,ship:pt,camera:fn,seated:Pl,walk:Ll,hud:Ku,interactables:Il}),y0=new wa(Nt),NA=y0.fromScene(Sb(),.02).texture;y0.dispose();Mb("./models/ship-interior.glb",NA).then(s=>{pt.setInterior(s),Wu.attachTo(s),Xu.attachTo(s),Dl.attachInterior(s),di.refreshInterior(),Yu=!0,console.info(`Innenraum geladen: ${pt.getCollisionMeshes().length} COL_-Meshes`)}).catch(s=>{console.warn("Innenraum-GLB nicht geladen, Placeholder bleibt aktiv:",s)});let Yu=!1;const um=new b;function UA(){Yu=!1,Nt.shadowMap.needsUpdate=!0;const s=pt.getInterior();um.set(0,1.5,0).applyMatrix4(pt.matrixWorld),vb(s,bb(Nt,ls,um))}const dm=1e4,Ms=new b;function FA(){pt.position.lengthSq()<dm*dm||(Ms.copy(pt.position),pt.position.set(0,0,0),Cl.position.sub(Ms),pi.position.sub(Ms),mi.shift(Ms),Fs.shift(Ms),Is.shift(Ms),$u.shift(Ms))}const Zo=new Oy,ih=new b,OA=new b,fm=new b;function BA(s){Qt.update(s),di.fixedUpdate(s),mi.update(s,pt,Qt.velocity);const e=Is.update(s,pt,Qt.velocity);e&&Ml.add(.25+e.damage*3),Dl.fixedUpdate(s,e),Fs.update(s),FA()}function kA(s){pi.update(s),Cl.update(s),$u.update(s);const e=Ra.update(pi,pt.position,Qt.velocity,mi.getParams().boltSpeed);Wu.update(s,{origin:pt.position,orientation:pt.quaternion,asteroids:pi,targetIndex:Ra.getIndex()}),di.updateCamera(),DA(s),Ml.update(s),Ml.applyTo(fn),ls.updateMatrixWorld(),fn.matrixWorld.decompose(ci.position,ci.quaternion,OA),ci.updateMatrixWorld(),os.position.copy(ci.position),os.quaternion.copy(ci.quaternion),os.updateMatrixWorld(),fn.getWorldPosition(ih),Na.update(ih),Br.update(ih);const t={camera:fn,position:pt.position,orientation:pt.quaternion,velocity:Qt.velocity,speed:Qt.getSpeed(),setSpeed:Qt.setSpeed,maxSetSpeed:Qt.getParams().maxSetSpeed,mode:Qt.mode,fullStop:Qt.fullStop,afterburner:Qt.inputs.afterburner,walking:di.isWalking,external:ru,pointerLocked:bn.pointerLocked,mouseOffset:Pl.getMouseOffset(),kills:mi.kills,sinceHit:mi.getTimeSinceHit(),target:e,hull:Is.integrity,sinceImpact:Is.sinceImpact};Xu.update(s,t),qu.update(t),Gu.render(),Yu&&UA(),Ku.update(t)}Nt.setAnimationLoop(()=>{Pl.update(Zo.frameDelta),di.update(Zo.frameDelta),!di.isWalking&&bn.wasPressed("KeyT")&&(fm.set(0,0,-1).applyQuaternion(pt.quaternion),Ra.cycle(pi,pt.position,fm)),mi.setTrigger(!di.isWalking&&bn.pointerLocked&&(bn.isMouseDown(0)||bn.isDown("Space"))),Dl.update(Zo.frameDelta,di.isWalking?Ll.position:null);const s=Zo.tick(BA);kA(s),bn.endFrame()});window.addEventListener("resize",()=>{fn.aspect=window.innerWidth/window.innerHeight,fn.updateProjectionMatrix(),ci.aspect=fn.aspect,ci.updateProjectionMatrix(),os.aspect=fn.aspect,os.updateProjectionMatrix(),Nt.setPixelRatio(Math.min(window.devicePixelRatio,2)),Nt.setSize(window.innerWidth,window.innerHeight),Gu.setSize(window.innerWidth,window.innerHeight),Na.setPixelRatio(Nt.getPixelRatio())});Object.assign(window,{__privateer:{ship:pt,flight:Qt,seated:Pl,walk:Ll,player:di,hud:Ku,camera:fn,input:bn,scene:ls,weapons:mi,effects:Fs,asteroids:pi,targeting:Ra,hull:Is,shake:Ml,radar:Wu,post:Gu,renderer:Nt,displays:Xu,glass:qu,cargo:M0,station:Ua,docking:$u,trade:S0,damage:Dl,interactables:Il}});
//# sourceMappingURL=index-GEQYtUcr.js.map
