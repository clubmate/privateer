(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ld="185",d_=0,af=1,f_=2,Ha=1,p_=2,ka=3,Gn=0,sn=1,Kt=2,nn=0,Wr=1,qt=2,of=3,lf=4,K0=5,Qn=100,m_=101,g_=102,__=103,v_=104,Ba=200,x_=201,M_=202,S_=203,ou=204,lu=205,cu=206,y_=207,hu=208,b_=209,E_=210,T_=211,w_=212,A_=213,R_=214,uu=0,du=1,fu=2,Kr=3,pu=4,mu=5,gu=6,_u=7,Y0=0,C_=1,P_=2,yi=0,cd=1,hd=2,ud=3,uc=4,dd=5,fd=6,pd=7,cf="attached",L_="detached",Z0=300,Js=301,Yr=302,Cc=303,Pc=304,dc=306,Wn=1e3,Mi=1001,Ql=1002,Ht=1003,Q0=1004,za=1005,Pt=1006,Hl=1007,$i=1008,bn=1009,J0=1010,j0=1011,qa=1012,md=1013,Ei=1014,Vn=1015,cn=1016,gd=1017,_d=1018,Zr=1020,eg=35902,tg=35899,ng=1021,ig=1022,Ln=1023,Qi=1026,_s=1027,vd=1028,xd=1029,js=1030,Md=1031,Sd=1033,Gl=33776,Wl=33777,Xl=33778,ql=33779,vu=35840,xu=35841,Mu=35842,Su=35843,yu=36196,bu=37492,Eu=37496,Tu=37488,wu=37489,Jl=37490,Au=37491,Ru=37808,Cu=37809,Pu=37810,Lu=37811,Iu=37812,Du=37813,Nu=37814,Uu=37815,Fu=37816,Ou=37817,ku=37818,Bu=37819,zu=37820,Vu=37821,Hu=36492,Gu=36494,Wu=36495,Xu=36283,qu=36284,jl=36285,$u=36286,$a=2300,Ka=2301,Lc=2302,hf=2303,uf=2400,df=2401,ff=2402,I_=2500,D_=0,sg=1,Ku=2,N_=3200,ec=0,U_=1,ms="",_t="srgb",Nn="srgb-linear",tc="linear",ct="srgb",cr=7680,pf=519,F_=512,O_=513,k_=514,yd=515,B_=516,z_=517,bd=518,V_=519,Yu=35044,H_=35048,mf="300 es",Si=2e3,Ya=2001;function G_(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function W_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Za(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function X_(){const s=Za("canvas");return s.style.display="block",s}const gf={};function nc(...s){const e="THREE."+s.shift();console.log(e,...s)}function rg(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Re(...s){s=rg(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Oe(...s){s=rg(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function Xr(...s){const e=s.join(" ");e in gf||(gf[e]=!0,Re(...s))}function q_(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const $_={[uu]:du,[fu]:gu,[pu]:_u,[Kr]:mu,[du]:uu,[gu]:fu,[_u]:pu,[mu]:Kr};class ir{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let _f=1234567;const Ga=Math.PI/180,Qr=180/Math.PI;function ei(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(fn[s&255]+fn[s>>8&255]+fn[s>>16&255]+fn[s>>24&255]+"-"+fn[e&255]+fn[e>>8&255]+"-"+fn[e>>16&15|64]+fn[e>>24&255]+"-"+fn[t&63|128]+fn[t>>8&255]+"-"+fn[t>>16&255]+fn[t>>24&255]+fn[n&255]+fn[n>>8&255]+fn[n>>16&255]+fn[n>>24&255]).toLowerCase()}function Ze(s,e,t){return Math.max(e,Math.min(t,s))}function Ed(s,e){return(s%e+e)%e}function K_(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Y_(s,e,t){return s!==e?(t-s)/(e-s):0}function Wa(s,e,t){return(1-t)*s+t*e}function Z_(s,e,t,n){return Wa(s,e,1-Math.exp(-t*n))}function Q_(s,e=1){return e-Math.abs(Ed(s,e*2)-e)}function J_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function j_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function ev(s,e){return s+Math.floor(Math.random()*(e-s+1))}function tv(s,e){return s+Math.random()*(e-s)}function nv(s){return s*(.5-Math.random())}function iv(s){s!==void 0&&(_f=s);let e=_f+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function sv(s){return s*Ga}function rv(s){return s*Qr}function av(s){return(s&s-1)===0&&s!==0}function ov(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function lv(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function cv(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*p,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*p,o*c);break;case"ZYZ":s.set(l*p,l*f,o*h,o*c);break;default:Re("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Jn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ht(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Td={DEG2RAD:Ga,RAD2DEG:Qr,generateUUID:ei,clamp:Ze,euclideanModulo:Ed,mapLinear:K_,inverseLerp:Y_,lerp:Wa,damp:Z_,pingpong:Q_,smoothstep:J_,smootherstep:j_,randInt:ev,randFloat:tv,randFloatSpread:nv,seededRandom:iv,degToRad:sv,radToDeg:rv,isPowerOfTwo:av,ceilPowerOfTwo:ov,floorPowerOfTwo:lv,setQuaternionFromProperEuler:cv,normalize:ht,denormalize:Jn};class Se{static{Se.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class tt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[a+0],f=r[a+1],p=r[a+2],_=r[a+3];if(u!==_||l!==d||c!==f||h!==p){let m=l*d+c*f+h*p+u*_;m<0&&(d=-d,f=-f,p=-p,_=-_,m=-m);let g=1-o;if(m<.9995){const b=Math.acos(m),E=Math.sin(b);g=Math.sin(g*b)/E,o=Math.sin(o*b)/E,l=l*g+d*o,c=c*g+f*o,h=h*g+p*o,u=u*g+_*o}else{l=l*g+d*o,c=c*g+f*o,h=h*g+p*o,u=u*g+_*o;const b=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=b,c*=b,h*=b,u*=b}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-o*f,e[t+2]=c*p+h*f+o*d-l*u,e[t+3]=h*p-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),p=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Re("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class S{static{S.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ic.copy(this).projectOnVector(e),this.sub(Ic)}reflect(e){return this.sub(Ic.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ic=new S,vf=new tt;class ze{static{ze.prototype.isMatrix3=!0}constructor(e,t,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],_=i[0],m=i[3],g=i[6],b=i[1],E=i[4],M=i[7],w=i[2],A=i[5],C=i[8];return r[0]=a*_+o*b+l*w,r[3]=a*m+o*E+l*A,r[6]=a*g+o*M+l*C,r[1]=c*_+h*b+u*w,r[4]=c*m+h*E+u*A,r[7]=c*g+h*M+u*C,r[2]=d*_+f*b+p*w,r[5]=d*m+f*E+p*A,r[8]=d*g+f*M+p*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Xr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Dc.makeScale(e,t)),this}rotate(e){return Xr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Dc.makeRotation(-e)),this}translate(e,t){return Xr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Dc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Dc=new ze,xf=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mf=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hv(){const s={enabled:!0,workingColorSpace:Nn,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ct&&(i.r=Yi(i.r),i.g=Yi(i.g),i.b=Yi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ct&&(i.r=qr(i.r),i.g=qr(i.g),i.b=qr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ms?tc:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Xr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Xr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Nn]:{primaries:e,whitePoint:n,transfer:tc,toXYZ:xf,fromXYZ:Mf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:_t},outputColorSpaceConfig:{drawingBufferColorSpace:_t}},[_t]:{primaries:e,whitePoint:n,transfer:ct,toXYZ:xf,fromXYZ:Mf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:_t}}}),s}const $e=hv();function Yi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function qr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let hr;class uv{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{hr===void 0&&(hr=Za("canvas")),hr.width=e.width,hr.height=e.height;const i=hr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=hr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Za("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Yi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Yi(t[n]/255)*255):t[n]=Yi(t[n]);return{data:t,width:e.width,height:e.height}}else return Re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let dv=0;class wd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:dv++}),this.uuid=ei(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Nc(i[a].image)):r.push(Nc(i[a]))}else r=Nc(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Nc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?uv.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Re("Texture: Unable to serialize Texture."),{})}let fv=0;const Uc=new S;class Zt extends ir{constructor(e=Zt.DEFAULT_IMAGE,t=Zt.DEFAULT_MAPPING,n=Mi,i=Mi,r=Pt,a=$i,o=Ln,l=bn,c=Zt.DEFAULT_ANISOTROPY,h=ms){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fv++}),this.uuid=ei(),this.name="",this.source=new wd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Uc).x}get height(){return this.source.getSize(Uc).y}get depth(){return this.source.getSize(Uc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Re(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Z0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wn:e.x=e.x-Math.floor(e.x);break;case Mi:e.x=e.x<0?0:1;break;case Ql:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wn:e.y=e.y-Math.floor(e.y);break;case Mi:e.y=e.y<0?0:1;break;case Ql:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=Z0;Zt.DEFAULT_ANISOTROPY=1;class ft{static{ft.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],_=l[2],m=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,M=(f+1)/2,w=(g+1)/2,A=(h+d)/4,C=(u+_)/4,x=(p+m)/4;return E>M&&E>w?E<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(E),i=A/n,r=C/n):M>w?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=A/i,r=x/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=C/r,i=x/r),this.set(n,i,r,t),this}let b=Math.sqrt((m-p)*(m-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-p)/b,this.y=(u-_)/b,this.z=(d-h)/b,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pv extends ir{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},r=new Zt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Pt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new wd(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hn extends pv{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ag extends Zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class mv extends Zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ye{static{ye.prototype.isMatrix4=!0}constructor(e,t,n,i,r,a,o,l,c,h,u,d,f,p,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,u,d,f,p,_,m)}set(e,t,n,i,r,a,o,l,c,h,u,d,f,p,_,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ye().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,i=1/ur.setFromMatrixColumn(e,0).length(),r=1/ur.setFromMatrixColumn(e,1).length(),a=1/ur.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,p=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d+_*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,p=o*h,_=o*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=p*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(gv,e,_v)}lookAt(e,t,n){const i=this.elements;return Tn.subVectors(e,t),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),ns.crossVectors(n,Tn),ns.lengthSq()===0&&(Math.abs(n.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),ns.crossVectors(n,Tn)),ns.normalize(),vo.crossVectors(Tn,ns),i[0]=ns.x,i[4]=vo.x,i[8]=Tn.x,i[1]=ns.y,i[5]=vo.y,i[9]=Tn.y,i[2]=ns.z,i[6]=vo.z,i[10]=Tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],_=n[6],m=n[10],g=n[14],b=n[3],E=n[7],M=n[11],w=n[15],A=i[0],C=i[4],x=i[8],T=i[12],L=i[1],P=i[5],I=i[9],k=i[13],q=i[2],O=i[6],X=i[10],B=i[14],Q=i[3],J=i[7],re=i[11],le=i[15];return r[0]=a*A+o*L+l*q+c*Q,r[4]=a*C+o*P+l*O+c*J,r[8]=a*x+o*I+l*X+c*re,r[12]=a*T+o*k+l*B+c*le,r[1]=h*A+u*L+d*q+f*Q,r[5]=h*C+u*P+d*O+f*J,r[9]=h*x+u*I+d*X+f*re,r[13]=h*T+u*k+d*B+f*le,r[2]=p*A+_*L+m*q+g*Q,r[6]=p*C+_*P+m*O+g*J,r[10]=p*x+_*I+m*X+g*re,r[14]=p*T+_*k+m*B+g*le,r[3]=b*A+E*L+M*q+w*Q,r[7]=b*C+E*P+M*O+w*J,r[11]=b*x+E*I+M*X+w*re,r[15]=b*T+E*k+M*B+w*le,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],_=e[7],m=e[11],g=e[15],b=l*f-c*d,E=o*f-c*u,M=o*d-l*u,w=a*f-c*h,A=a*d-l*h,C=a*u-o*h;return t*(_*b-m*E+g*M)-n*(p*b-m*w+g*A)+i*(p*E-_*w+g*C)-r*(p*M-_*A+m*C)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],_=e[13],m=e[14],g=e[15],b=t*o-n*a,E=t*l-i*a,M=t*c-r*a,w=n*l-i*o,A=n*c-r*o,C=i*c-r*l,x=h*_-u*p,T=h*m-d*p,L=h*g-f*p,P=u*m-d*_,I=u*g-f*_,k=d*g-f*m,q=b*k-E*I+M*P+w*L-A*T+C*x;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/q;return e[0]=(o*k-l*I+c*P)*O,e[1]=(i*I-n*k-r*P)*O,e[2]=(_*C-m*A+g*w)*O,e[3]=(d*A-u*C-f*w)*O,e[4]=(l*L-a*k-c*T)*O,e[5]=(t*k-i*L+r*T)*O,e[6]=(m*M-p*C-g*E)*O,e[7]=(h*C-d*M+f*E)*O,e[8]=(a*I-o*L+c*x)*O,e[9]=(n*L-t*I-r*x)*O,e[10]=(p*A-_*M+g*b)*O,e[11]=(u*M-h*A-f*b)*O,e[12]=(o*T-a*P-l*x)*O,e[13]=(t*P-n*T+i*x)*O,e[14]=(_*E-p*w-m*b)*O,e[15]=(h*w-u*E+d*b)*O,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,p=r*u,_=a*h,m=a*u,g=o*u,b=l*c,E=l*h,M=l*u,w=n.x,A=n.y,C=n.z;return i[0]=(1-(_+g))*w,i[1]=(f+M)*w,i[2]=(p-E)*w,i[3]=0,i[4]=(f-M)*A,i[5]=(1-(d+g))*A,i[6]=(m+b)*A,i[7]=0,i[8]=(p+E)*C,i[9]=(m-b)*C,i[10]=(1-(d+_))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ur.set(i[0],i[1],i[2]).length();const o=ur.set(i[4],i[5],i[6]).length(),l=ur.set(i[8],i[9],i[10]).length();r<0&&(a=-a),Xn.copy(this);const c=1/a,h=1/o,u=1/l;return Xn.elements[0]*=c,Xn.elements[1]*=c,Xn.elements[2]*=c,Xn.elements[4]*=h,Xn.elements[5]*=h,Xn.elements[6]*=h,Xn.elements[8]*=u,Xn.elements[9]*=u,Xn.elements[10]*=u,t.setFromRotationMatrix(Xn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,r,a,o=Si,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let p,_;if(l)p=r/(a-r),_=a*r/(a-r);else if(o===Si)p=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Ya)p=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Si,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let p,_;if(l)p=1/(a-r),_=a/(a-r);else if(o===Si)p=-2/(a-r),_=-(a+r)/(a-r);else if(o===Ya)p=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ur=new S,Xn=new ye,gv=new S(0,0,0),_v=new S(1,1,1),ns=new S,vo=new S,Tn=new S,Sf=new ye,yf=new tt;class ni{constructor(e=0,t=0,n=0,i=ni.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yf.setFromEuler(this),this.setFromQuaternion(yf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ni.DEFAULT_ORDER="XYZ";class og{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let vv=0;const bf=new S,dr=new tt,Ri=new ye,xo=new S,da=new S,xv=new S,Mv=new tt,Ef=new S(1,0,0),Tf=new S(0,1,0),wf=new S(0,0,1),Af={type:"added"},Sv={type:"removed"},fr={type:"childadded",child:null},Fc={type:"childremoved",child:null};class Fe extends ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vv++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Fe.DEFAULT_UP.clone();const e=new S,t=new ni,n=new tt,i=new S(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ye},normalMatrix:{value:new ze}}),this.matrix=new ye,this.matrixWorld=new ye,this.matrixAutoUpdate=Fe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new og,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return dr.setFromAxisAngle(e,t),this.quaternion.multiply(dr),this}rotateOnWorldAxis(e,t){return dr.setFromAxisAngle(e,t),this.quaternion.premultiply(dr),this}rotateX(e){return this.rotateOnAxis(Ef,e)}rotateY(e){return this.rotateOnAxis(Tf,e)}rotateZ(e){return this.rotateOnAxis(wf,e)}translateOnAxis(e,t){return bf.copy(e).applyQuaternion(this.quaternion),this.position.add(bf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ef,e)}translateY(e){return this.translateOnAxis(Tf,e)}translateZ(e){return this.translateOnAxis(wf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?xo.copy(e):xo.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),da.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(da,xo,this.up):Ri.lookAt(xo,da,this.up),this.quaternion.setFromRotationMatrix(Ri),i&&(Ri.extractRotation(i.matrixWorld),dr.setFromRotationMatrix(Ri),this.quaternion.premultiply(dr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Oe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Af),fr.child=e,this.dispatchEvent(fr),fr.child=null):Oe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sv),Fc.child=e,this.dispatchEvent(Fc),Fc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Af),fr.child=e,this.dispatchEvent(fr),fr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(da,e,xv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(da,Mv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Fe.DEFAULT_UP=new S(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Yt extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yv={type:"move"};class Oc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new S,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new S),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new S,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new S,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),g=this._getHandJoint(c,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(yv)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Yt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const lg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},is={h:0,s:0,l:0},Mo={h:0,s:0,l:0};function kc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class te{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=$e.workingColorSpace){if(e=Ed(e,1),t=Ze(t,0,1),n=Ze(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=kc(a,r,e+1/3),this.g=kc(a,r,e),this.b=kc(a,r,e-1/3)}return $e.colorSpaceToWorking(this,i),this}setStyle(e,t=_t){function n(r){r!==void 0&&parseFloat(r)<1&&Re("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Re("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_t){const n=lg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yi(e.r),this.g=Yi(e.g),this.b=Yi(e.b),this}copyLinearToSRGB(e){return this.r=qr(e.r),this.g=qr(e.g),this.b=qr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_t){return $e.workingToColorSpace(pn.copy(this),e),Math.round(Ze(pn.r*255,0,255))*65536+Math.round(Ze(pn.g*255,0,255))*256+Math.round(Ze(pn.b*255,0,255))}getHexString(e=_t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(pn.copy(this),t);const n=pn.r,i=pn.g,r=pn.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(pn.copy(this),t),e.r=pn.r,e.g=pn.g,e.b=pn.b,e}getStyle(e=_t){$e.workingToColorSpace(pn.copy(this),e);const t=pn.r,n=pn.g,i=pn.b;return e!==_t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(is),this.setHSL(is.h+e,is.s+t,is.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(is),e.getHSL(Mo);const n=Wa(is.h,Mo.h,t),i=Wa(is.s,Mo.s,t),r=Wa(is.l,Mo.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const pn=new te;te.NAMES=lg;class fc extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const qn=new S,Ci=new S,Bc=new S,Pi=new S,pr=new S,mr=new S,Rf=new S,zc=new S,Vc=new S,Hc=new S,Gc=new ft,Wc=new ft,Xc=new ft;class zn{constructor(e=new S,t=new S,n=new S){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),qn.subVectors(e,t),i.cross(qn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){qn.subVectors(i,t),Ci.subVectors(n,t),Bc.subVectors(e,t);const a=qn.dot(qn),o=qn.dot(Ci),l=qn.dot(Bc),c=Ci.dot(Ci),h=Ci.dot(Bc),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,p=(a*h-o*l)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,Pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Pi.x),l.addScaledVector(a,Pi.y),l.addScaledVector(o,Pi.z),l)}static getInterpolatedAttribute(e,t,n,i,r,a){return Gc.setScalar(0),Wc.setScalar(0),Xc.setScalar(0),Gc.fromBufferAttribute(e,t),Wc.fromBufferAttribute(e,n),Xc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Gc,r.x),a.addScaledVector(Wc,r.y),a.addScaledVector(Xc,r.z),a}static isFrontFacing(e,t,n,i){return qn.subVectors(n,t),Ci.subVectors(e,t),qn.cross(Ci).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qn.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),qn.cross(Ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return zn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return zn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return zn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return zn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return zn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;pr.subVectors(i,n),mr.subVectors(r,n),zc.subVectors(e,n);const l=pr.dot(zc),c=mr.dot(zc);if(l<=0&&c<=0)return t.copy(n);Vc.subVectors(e,i);const h=pr.dot(Vc),u=mr.dot(Vc);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(pr,a);Hc.subVectors(e,r);const f=pr.dot(Hc),p=mr.dot(Hc);if(p>=0&&f<=p)return t.copy(r);const _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(mr,o);const m=h*p-f*u;if(m<=0&&u-h>=0&&f-p>=0)return Rf.subVectors(r,i),o=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(Rf,o);const g=1/(m+_+d);return a=_*g,o=d*g,t.copy(n).addScaledVector(pr,a).addScaledVector(mr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ji{constructor(e=new S(1/0,1/0,1/0),t=new S(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint($n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint($n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=$n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,$n):$n.fromBufferAttribute(r,a),$n.applyMatrix4(e.matrixWorld),this.expandByPoint($n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),So.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),So.copy(n.boundingBox)),So.applyMatrix4(e.matrixWorld),this.union(So)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$n),$n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fa),yo.subVectors(this.max,fa),gr.subVectors(e.a,fa),_r.subVectors(e.b,fa),vr.subVectors(e.c,fa),ss.subVectors(_r,gr),rs.subVectors(vr,_r),Rs.subVectors(gr,vr);let t=[0,-ss.z,ss.y,0,-rs.z,rs.y,0,-Rs.z,Rs.y,ss.z,0,-ss.x,rs.z,0,-rs.x,Rs.z,0,-Rs.x,-ss.y,ss.x,0,-rs.y,rs.x,0,-Rs.y,Rs.x,0];return!qc(t,gr,_r,vr,yo)||(t=[1,0,0,0,1,0,0,0,1],!qc(t,gr,_r,vr,yo))?!1:(bo.crossVectors(ss,rs),t=[bo.x,bo.y,bo.z],qc(t,gr,_r,vr,yo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Li=[new S,new S,new S,new S,new S,new S,new S,new S],$n=new S,So=new Ji,gr=new S,_r=new S,vr=new S,ss=new S,rs=new S,Rs=new S,fa=new S,yo=new S,bo=new S,Cs=new S;function qc(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Cs.fromArray(s,r);const o=i.x*Math.abs(Cs.x)+i.y*Math.abs(Cs.y)+i.z*Math.abs(Cs.z),l=e.dot(Cs),c=t.dot(Cs),h=n.dot(Cs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Wt=new S,Eo=new Se;let bv=0;class at extends ir{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bv++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Yu,this.updateRanges=[],this.gpuType=Vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Eo.fromBufferAttribute(this,t),Eo.applyMatrix3(e),this.setXY(t,Eo.x,Eo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix3(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Jn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Jn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Jn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Jn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),r=ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Yu&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class cg extends at{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class hg extends at{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class vt extends at{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Ev=new Ji,pa=new S,$c=new S;class wi{constructor(e=new S,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ev.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pa.subVectors(e,this.center);const t=pa.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(pa,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($c.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pa.copy(e.center).add($c)),this.expandByPoint(pa.copy(e.center).sub($c))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Tv=0;const Fn=new ye,Kc=new Fe,xr=new S,wn=new Ji,ma=new Ji,en=new S;class xt extends ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tv++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(G_(e)?hg:cg)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Fn.makeRotationFromQuaternion(e),this.applyMatrix4(Fn),this}rotateX(e){return Fn.makeRotationX(e),this.applyMatrix4(Fn),this}rotateY(e){return Fn.makeRotationY(e),this.applyMatrix4(Fn),this}rotateZ(e){return Fn.makeRotationZ(e),this.applyMatrix4(Fn),this}translate(e,t,n){return Fn.makeTranslation(e,t,n),this.applyMatrix4(Fn),this}scale(e,t,n){return Fn.makeScale(e,t,n),this.applyMatrix4(Fn),this}lookAt(e){return Kc.lookAt(e),Kc.updateMatrix(),this.applyMatrix4(Kc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xr).negate(),this.translate(xr.x,xr.y,xr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new vt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ji);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new S(-1/0,-1/0,-1/0),new S(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];wn.setFromBufferAttribute(r),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Oe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new S,1/0);return}if(e){const n=this.boundingSphere.center;if(wn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ma.setFromBufferAttribute(o),this.morphTargetsRelative?(en.addVectors(wn.min,ma.min),wn.expandByPoint(en),en.addVectors(wn.max,ma.max),wn.expandByPoint(en)):(wn.expandByPoint(ma.min),wn.expandByPoint(ma.max))}wn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)en.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(en));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)en.fromBufferAttribute(o,c),l&&(xr.fromBufferAttribute(e,c),en.add(xr)),i=Math.max(i,n.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Oe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Oe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new at(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new S,l[x]=new S;const c=new S,h=new S,u=new S,d=new Se,f=new Se,p=new Se,_=new S,m=new S;function g(x,T,L){c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,L),d.fromBufferAttribute(r,x),f.fromBufferAttribute(r,T),p.fromBufferAttribute(r,L),h.sub(c),u.sub(c),f.sub(d),p.sub(d);const P=1/(f.x*p.y-p.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(P),o[x].add(_),o[T].add(_),o[L].add(_),l[x].add(m),l[T].add(m),l[L].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let x=0,T=b.length;x<T;++x){const L=b[x],P=L.start,I=L.count;for(let k=P,q=P+I;k<q;k+=3)g(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const E=new S,M=new S,w=new S,A=new S;function C(x){w.fromBufferAttribute(i,x),A.copy(w);const T=o[x];E.copy(T),E.sub(w.multiplyScalar(w.dot(T))).normalize(),M.crossVectors(A,T);const P=M.dot(l[x])<0?-1:1;a.setXYZW(x,E.x,E.y,E.z,P)}for(let x=0,T=b.length;x<T;++x){const L=b[x],P=L.start,I=L.count;for(let k=P,q=P+I;k<q;k+=3)C(e.getX(k+0)),C(e.getX(k+1)),C(e.getX(k+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new at(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new S,r=new S,a=new S,o=new S,l=new S,c=new S,h=new S,u=new S;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)en.fromBufferAttribute(e,t),en.normalize(),e.setXYZ(t,en.x,en.y,en.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,p=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let g=0;g<h;g++)d[p++]=c[f++]}return new at(d,h,u)}if(this.index===null)return Re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xt,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ug{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Yu,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const vn=new S;class Qa{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.applyMatrix4(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.applyNormalMatrix(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.transformDirection(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Jn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Jn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Jn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Jn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),r=ht(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){nc("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new at(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Qa(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){nc("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let wv=0;class Hn extends ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wv++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=Wr,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ou,this.blendDst=lu,this.blendEquation=Qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=Kr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cr,this.stencilZFail=cr,this.stencilZPass=cr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Re(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Wr&&(n.blending=this.blending),this.side!==Gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ou&&(n.blendSrc=this.blendSrc),this.blendDst!==lu&&(n.blendDst=this.blendDst),this.blendEquation!==Qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Kr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==cr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==cr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==cr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new te().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Se().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Se().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class er extends Hn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Mr;const ga=new S,Sr=new S,yr=new S,br=new Se,_a=new Se,dg=new ye,To=new S,va=new S,wo=new S,Cf=new Se,Yc=new Se,Pf=new Se;class Jr extends Fe{constructor(e=new er){if(super(),this.isSprite=!0,this.type="Sprite",Mr===void 0){Mr=new xt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ug(t,5);Mr.setIndex([0,1,2,0,2,3]),Mr.setAttribute("position",new Qa(n,3,0,!1)),Mr.setAttribute("uv",new Qa(n,2,3,!1))}this.geometry=Mr,this.material=e,this.center=new Se(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Oe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Sr.setFromMatrixScale(this.matrixWorld),dg.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),yr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Sr.multiplyScalar(-yr.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Ao(To.set(-.5,-.5,0),yr,a,Sr,i,r),Ao(va.set(.5,-.5,0),yr,a,Sr,i,r),Ao(wo.set(.5,.5,0),yr,a,Sr,i,r),Cf.set(0,0),Yc.set(1,0),Pf.set(1,1);let o=e.ray.intersectTriangle(To,va,wo,!1,ga);if(o===null&&(Ao(va.set(-.5,.5,0),yr,a,Sr,i,r),Yc.set(0,1),o=e.ray.intersectTriangle(To,wo,va,!1,ga),o===null))return;const l=e.ray.origin.distanceTo(ga);l<e.near||l>e.far||t.push({distance:l,point:ga.clone(),uv:zn.getInterpolation(ga,To,va,wo,Cf,Yc,Pf,new Se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ao(s,e,t,n,i,r){br.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(_a.x=r*br.x-i*br.y,_a.y=i*br.x+r*br.y):_a.copy(br),s.copy(e),s.x+=_a.x,s.y+=_a.y,s.applyMatrix4(dg)}const Ro=new S,Lf=new S;class Av extends Fe{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Ro.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(Ro);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){Ro.setFromMatrixPosition(e.matrixWorld),Lf.setFromMatrixPosition(this.matrixWorld);const n=Ro.distanceTo(Lf)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let a=t[i].distance;if(t[i].object.visible&&(a-=a*t[i].hysteresis),n>=a)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,r=n.length;i<r;i++){const a=n[i];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}}const Ii=new S,Zc=new S,Co=new S,as=new S,Qc=new S,Po=new S,Jc=new S;class pc{constructor(e=new S,t=new S(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ii)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ii.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ii.copy(this.origin).addScaledVector(this.direction,t),Ii.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Zc.copy(e).add(t).multiplyScalar(.5),Co.copy(t).sub(e).normalize(),as.copy(this.origin).sub(Zc);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Co),o=as.dot(this.direction),l=-as.dot(Co),c=as.lengthSq(),h=Math.abs(1-a*a);let u,d,f,p;if(h>0)if(u=a*l-o,d=a*o-l,p=r*h,u>=0)if(d>=-p)if(d<=p){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Zc).addScaledVector(Co,d),f}intersectSphere(e,t){Ii.subVectors(e.center,this.origin);const n=Ii.dot(this.direction),i=Ii.dot(Ii)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ii)!==null}intersectTriangle(e,t,n,i,r){Qc.subVectors(t,e),Po.subVectors(n,e),Jc.crossVectors(Qc,Po);let a=this.direction.dot(Jc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;as.subVectors(this.origin,e);const l=o*this.direction.dot(Po.crossVectors(as,Po));if(l<0)return null;const c=o*this.direction.dot(Qc.cross(as));if(c<0||l+c>a)return null;const h=-o*as.dot(Jc);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ot extends Hn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=Y0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const If=new ye,Ps=new pc,Lo=new wi,Df=new S,Io=new S,Do=new S,No=new S,jc=new S,Uo=new S,Nf=new S,Fo=new S;class Me extends Fe{constructor(e=new xt,t=new Ot){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){Uo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(jc.fromBufferAttribute(u,e),a?Uo.addScaledVector(jc,h):Uo.addScaledVector(jc.sub(t),h))}t.add(Uo)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Lo.copy(n.boundingSphere),Lo.applyMatrix4(r),Ps.copy(e.ray).recast(e.near),!(Lo.containsPoint(Ps.origin)===!1&&(Ps.intersectSphere(Lo,Df)===null||Ps.origin.distanceToSquared(Df)>(e.far-e.near)**2))&&(If.copy(r).invert(),Ps.copy(e.ray).applyMatrix4(If),!(n.boundingBox!==null&&Ps.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ps)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const m=d[p],g=a[m.materialIndex],b=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=b,w=E;M<w;M+=3){const A=o.getX(M),C=o.getX(M+1),x=o.getX(M+2);i=Oo(this,g,e,n,c,h,u,A,C,x),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){const b=o.getX(m),E=o.getX(m+1),M=o.getX(m+2);i=Oo(this,a,e,n,c,h,u,b,E,M),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,_=d.length;p<_;p++){const m=d[p],g=a[m.materialIndex],b=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=b,w=E;M<w;M+=3){const A=M,C=M+1,x=M+2;i=Oo(this,g,e,n,c,h,u,A,C,x),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){const b=m,E=m+1,M=m+2;i=Oo(this,a,e,n,c,h,u,b,E,M),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Rv(s,e,t,n,i,r,a,o){let l;if(e.side===sn?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===Gn,o),l===null)return null;Fo.copy(o),Fo.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Fo);return c<t.near||c>t.far?null:{distance:c,point:Fo.clone(),object:s}}function Oo(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,Io),s.getVertexPosition(l,Do),s.getVertexPosition(c,No);const h=Rv(s,e,t,n,Io,Do,No,Nf);if(h){const u=new S;zn.getBarycoord(Nf,Io,Do,No,u),i&&(h.uv=zn.getInterpolatedAttribute(i,o,l,c,u,new Se)),r&&(h.uv1=zn.getInterpolatedAttribute(r,o,l,c,u,new Se)),a&&(h.normal=zn.getInterpolatedAttribute(a,o,l,c,u,new S),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new S,materialIndex:0};zn.getNormal(Io,Do,No,d.normal),h.face=d,h.barycoord=u}return h}const xa=new ft,Uf=new ft,Ff=new ft,Cv=new ft,Of=new ye,ko=new S,eh=new wi,kf=new ye,th=new pc;class Pv extends Me{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=cf,this.bindMatrix=new ye,this.bindMatrixInverse=new ye,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ji),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ko),this.boundingBox.expandByPoint(ko)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new wi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ko),this.boundingSphere.expandByPoint(ko)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),eh.copy(this.boundingSphere),eh.applyMatrix4(i),e.ray.intersectsSphere(eh)!==!1&&(kf.copy(i).invert(),th.copy(e.ray).applyMatrix4(kf),!(this.boundingBox!==null&&th.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,th)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ft,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===cf?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===L_?this.bindMatrixInverse.copy(this.bindMatrix).invert():Re("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Uf.fromBufferAttribute(i.attributes.skinIndex,e),Ff.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(xa.copy(t),t.set(0,0,0,0)):(xa.set(...t,1),t.set(0,0,0)),xa.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const a=Ff.getComponent(r);if(a!==0){const o=Uf.getComponent(r);Of.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Cv.copy(xa).applyMatrix4(Of),a)}}return t.isVector4&&(t.w=xa.w),t.applyMatrix4(this.bindMatrixInverse)}}class fg extends Fe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class so extends Zt{constructor(e=null,t=1,n=1,i,r,a,o,l,c=Ht,h=Ht,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Bf=new ye,Lv=new ye;class Ad{constructor(e=[],t=[]){this.uuid=ei(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Re("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ye)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ye;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Lv;Bf.multiplyMatrices(o,t[r]),Bf.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Ad(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new so(t,e,e,Ln,Vn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(Re("Skeleton: No bone found with UUID:",r),a=new fg),this.bones.push(a),this.boneInverses.push(new ye().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Ks extends at{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Er=new ye,zf=new ye,Bo=[],Vf=new Ji,Iv=new ye,Ma=new Me,Sa=new wi;class Rd extends Me{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ks(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Iv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ji),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Er),Vf.copy(e.boundingBox).applyMatrix4(Er),this.boundingBox.union(Vf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new wi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Er),Sa.copy(e.boundingSphere).applyMatrix4(Er),this.boundingSphere.union(Sa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ma.geometry=this.geometry,Ma.material=this.material,Ma.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Sa.copy(this.boundingSphere),Sa.applyMatrix4(n),e.ray.intersectsSphere(Sa)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Er),zf.multiplyMatrices(n,Er),Ma.matrixWorld=zf,Ma.raycast(e,Bo);for(let a=0,o=Bo.length;a<o;a++){const l=Bo[a];l.instanceId=r,l.object=this,t.push(l)}Bo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ks(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new so(new Float32Array(i*this.count),i,this.count,vd,Vn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const nh=new S,Dv=new S,Nv=new ze;class Gs{constructor(e=new S(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=nh.subVectors(n,t).cross(Dv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(nh),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Nv.getNormalMatrix(e),i=this.coplanarPoint(nh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ls=new wi,Uv=new Se(.5,.5),zo=new S;class Cd{constructor(e=new Gs,t=new Gs,n=new Gs,i=new Gs,r=new Gs,a=new Gs){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Si,n=!1){const i=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],_=r[9],m=r[10],g=r[11],b=r[12],E=r[13],M=r[14],w=r[15];if(i[0].setComponents(c-a,f-h,g-p,w-b).normalize(),i[1].setComponents(c+a,f+h,g+p,w+b).normalize(),i[2].setComponents(c+o,f+u,g+_,w+E).normalize(),i[3].setComponents(c-o,f-u,g-_,w-E).normalize(),n)i[4].setComponents(l,d,m,M).normalize(),i[5].setComponents(c-l,f-d,g-m,w-M).normalize();else if(i[4].setComponents(c-l,f-d,g-m,w-M).normalize(),t===Si)i[5].setComponents(c+l,f+d,g+m,w+M).normalize();else if(t===Ya)i[5].setComponents(l,d,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ls.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ls.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ls)}intersectsSprite(e){Ls.center.set(0,0,0);const t=Uv.distanceTo(e.center);return Ls.radius=.7071067811865476+t,Ls.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ls)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(zo.x=i.normal.x>0?e.max.x:e.min.x,zo.y=i.normal.y>0?e.max.y:e.min.y,zo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(zo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ja extends Hn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ic=new S,sc=new S,Hf=new ye,ya=new pc,Vo=new wi,ih=new S,Gf=new S;class ja extends Fe{constructor(e=new xt,t=new Ja){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)ic.fromBufferAttribute(t,i-1),sc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ic.distanceTo(sc);e.setAttribute("lineDistance",new vt(n,1))}else Re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vo.copy(n.boundingSphere),Vo.applyMatrix4(i),Vo.radius+=r,e.ray.intersectsSphere(Vo)===!1)return;Hf.copy(i).invert(),ya.copy(e.ray).applyMatrix4(Hf);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=f,m=p-1;_<m;_+=c){const g=h.getX(_),b=h.getX(_+1),E=Ho(this,e,ya,l,g,b,_);E&&t.push(E)}if(this.isLineLoop){const _=h.getX(p-1),m=h.getX(f),g=Ho(this,e,ya,l,_,m,p-1);g&&t.push(g)}}else{const f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let _=f,m=p-1;_<m;_+=c){const g=Ho(this,e,ya,l,_,_+1,_);g&&t.push(g)}if(this.isLineLoop){const _=Ho(this,e,ya,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ho(s,e,t,n,i,r,a){const o=s.geometry.attributes.position;if(ic.fromBufferAttribute(o,i),sc.fromBufferAttribute(o,r),t.distanceSqToSegment(ic,sc,ih,Gf)>n)return;ih.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(ih);if(!(c<e.near||c>e.far))return{distance:c,point:Gf.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const Wf=new S,Xf=new S;class Pd extends ja{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Wf.fromBufferAttribute(t,i),Xf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Wf.distanceTo(Xf);e.setAttribute("lineDistance",new vt(n,1))}else Re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Fv extends ja{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class mc extends Hn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const qf=new ye,Zu=new pc,Go=new wi,Wo=new S;class ro extends Fe{constructor(e=new xt,t=new mc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Go.copy(n.boundingSphere),Go.applyMatrix4(i),Go.radius+=r,e.ray.intersectsSphere(Go)===!1)return;qf.copy(i).invert(),Zu.copy(e.ray).applyMatrix4(qf);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=d,_=f;p<_;p++){const m=c.getX(p);Wo.fromBufferAttribute(u,m),$f(Wo,m,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let p=d,_=f;p<_;p++)Wo.fromBufferAttribute(u,p),$f(Wo,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function $f(s,e,t,n,i,r,a){const o=Zu.distanceSqToPoint(s);if(o<t){const l=new S;Zu.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class pg extends Zt{constructor(e=[],t=Js,n,i,r,a,o,l,c,h){super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class un extends Zt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class tr extends Zt{constructor(e,t,n=Ei,i,r,a,o=Ht,l=Ht,c,h=Qi,u=1){if(h!==Qi&&h!==_s)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new wd(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ov extends tr{constructor(e,t=Ei,n=Js,i,r,a=Ht,o=Ht,l,c=Qi){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class mg extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Sn extends xt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new vt(c,3)),this.setAttribute("normal",new vt(h,3)),this.setAttribute("uv",new vt(u,2));function p(_,m,g,b,E,M,w,A,C,x,T){const L=M/C,P=w/x,I=M/2,k=w/2,q=A/2,O=C+1,X=x+1;let B=0,Q=0;const J=new S;for(let re=0;re<X;re++){const le=re*P-k;for(let ge=0;ge<O;ge++){const Je=ge*L-I;J[_]=Je*b,J[m]=le*E,J[g]=q,c.push(J.x,J.y,J.z),J[_]=0,J[m]=0,J[g]=A>0?1:-1,h.push(J.x,J.y,J.z),u.push(ge/C),u.push(1-re/x),B+=1}}for(let re=0;re<x;re++)for(let le=0;le<C;le++){const ge=d+le+O*re,Je=d+le+O*(re+1),pt=d+(le+1)+O*(re+1),je=d+(le+1)+O*re;l.push(ge,Je,je),l.push(Je,pt,je),Q+=6}o.addGroup(f,Q,T),f+=Q,d+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class sr extends xt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let p=0;const _=[],m=n/2;let g=0;b(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new vt(u,3)),this.setAttribute("normal",new vt(d,3)),this.setAttribute("uv",new vt(f,2));function b(){const M=new S,w=new S;let A=0;const C=(t-e)/n;for(let x=0;x<=r;x++){const T=[],L=x/r,P=L*(t-e)+e;for(let I=0;I<=i;I++){const k=I/i,q=k*l+o,O=Math.sin(q),X=Math.cos(q);w.x=P*O,w.y=-L*n+m,w.z=P*X,u.push(w.x,w.y,w.z),M.set(O,C,X).normalize(),d.push(M.x,M.y,M.z),f.push(k,1-L),T.push(p++)}_.push(T)}for(let x=0;x<i;x++)for(let T=0;T<r;T++){const L=_[T][x],P=_[T+1][x],I=_[T+1][x+1],k=_[T][x+1];(e>0||T!==0)&&(h.push(L,P,k),A+=3),(t>0||T!==r-1)&&(h.push(P,I,k),A+=3)}c.addGroup(g,A,0),g+=A}function E(M){const w=p,A=new Se,C=new S;let x=0;const T=M===!0?e:t,L=M===!0?1:-1;for(let I=1;I<=i;I++)u.push(0,m*L,0),d.push(0,L,0),f.push(.5,.5),p++;const P=p;for(let I=0;I<=i;I++){const q=I/i*l+o,O=Math.cos(q),X=Math.sin(q);C.x=T*X,C.y=m*L,C.z=T*O,u.push(C.x,C.y,C.z),d.push(0,L,0),A.x=O*.5+.5,A.y=X*.5*L+.5,f.push(A.x,A.y),p++}for(let I=0;I<i;I++){const k=w+I,q=P+I;M===!0?h.push(q,q+1,k):h.push(q+1,q,k),x+=3}c.addGroup(g,x,M===!0?1:2),g+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ld extends sr{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ld(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ti extends xt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],p=[],_=[],m=[];for(let g=0;g<h;g++){const b=g*d-a;for(let E=0;E<c;E++){const M=E*u-r;p.push(M,-b,0),_.push(0,0,1),m.push(E/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let b=0;b<o;b++){const E=b+c*g,M=b+c*(g+1),w=b+1+c*(g+1),A=b+1+c*g;f.push(E,M,A),f.push(M,w,A)}this.setIndex(f),this.setAttribute("position",new vt(p,3)),this.setAttribute("normal",new vt(_,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ti(e.width,e.height,e.widthSegments,e.heightSegments)}}class Id extends xt{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=e;const d=(t-e)/i,f=new S,p=new Se;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const g=r+m/n*a;f.x=u*Math.cos(g),f.y=u*Math.sin(g),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let _=0;_<i;_++){const m=_*(n+1);for(let g=0;g<n;g++){const b=g+m,E=b,M=b+n+1,w=b+n+2,A=b+1;o.push(E,M,A),o.push(M,w,A)}}this.setIndex(o),this.setAttribute("position",new vt(l,3)),this.setAttribute("normal",new vt(c,3)),this.setAttribute("uv",new vt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Id(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Dn extends xt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new S,d=new S,f=[],p=[],_=[],m=[];for(let g=0;g<=n;g++){const b=[],E=g/n,M=a+E*o,w=e*Math.cos(M),A=Math.sqrt(e*e-w*w);let C=0;g===0&&a===0?C=.5/t:g===n&&l===Math.PI&&(C=-.5/t);for(let x=0;x<=t;x++){const T=x/t,L=i+T*r;u.x=-A*Math.cos(L),u.y=w,u.z=A*Math.sin(L),p.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(T+C,1-E),b.push(c++)}h.push(b)}for(let g=0;g<n;g++)for(let b=0;b<t;b++){const E=h[g][b+1],M=h[g][b],w=h[g+1][b],A=h[g+1][b+1];(g!==0||a>0)&&f.push(E,M,A),(g!==n-1||l<Math.PI)&&f.push(M,w,A)}this.setIndex(f),this.setAttribute("position",new vt(p,3)),this.setAttribute("normal",new vt(_,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class eo extends xt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],h=[],u=[],d=new S,f=new S,p=new S;for(let _=0;_<=n;_++){const m=a+_/n*o;for(let g=0;g<=i;g++){const b=g/i*r;f.x=(e+t*Math.cos(m))*Math.cos(b),f.y=(e+t*Math.cos(m))*Math.sin(b),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(b),d.y=e*Math.sin(b),p.subVectors(f,d).normalize(),h.push(p.x,p.y,p.z),u.push(g/i),u.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=i;m++){const g=(i+1)*_+m-1,b=(i+1)*(_-1)+m-1,E=(i+1)*(_-1)+m,M=(i+1)*_+m;l.push(g,b,M),l.push(b,E,M)}this.setIndex(l),this.setAttribute("position",new vt(c,3)),this.setAttribute("normal",new vt(h,3)),this.setAttribute("uv",new vt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new eo(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function jr(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];if(Kf(i))i.isRenderTargetTexture?(Re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(Kf(i[0])){const r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function xn(s){const e={};for(let t=0;t<s.length;t++){const n=jr(s[t]);for(const i in n)e[i]=n[i]}return e}function Kf(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function kv(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function gg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const vi={clone:jr,merge:xn};var Bv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Et extends Hn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bv,this.fragmentShader=zv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=jr(e.uniforms),this.uniformsGroups=kv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new te().setHex(i.value);break;case"v2":this.uniforms[n].value=new Se().fromArray(i.value);break;case"v3":this.uniforms[n].value=new S().fromArray(i.value);break;case"v4":this.uniforms[n].value=new ft().fromArray(i.value);break;case"m3":this.uniforms[n].value=new ze().fromArray(i.value);break;case"m4":this.uniforms[n].value=new ye().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class _g extends Et{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Qe extends Hn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ec,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class si extends Qe{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new te(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new te(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new te(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Vv extends Hn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ec,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Hv extends Hn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=N_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Gv extends Hn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Xo(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Wv(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Yf(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function Xv(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class ia{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class qv extends ia{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:uf,endingEnd:uf}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case df:r=e,o=2*t-n;break;case ff:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case df:a=e,l=2*n-t;break;case ff:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),_=p*p,m=_*p,g=-d*m+2*d*_-d*p,b=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*p+1,E=(-1-f)*m+(1.5+f)*_+.5*p,M=f*m-f*_;for(let w=0;w!==o;++w)r[w]=g*a[h+w]+b*a[c+w]+E*a[l+w]+M*a[u+w];return r}}class $v extends ia{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}}class Kv extends ia{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Yv extends ia{interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){const p=(n-t)/(i-t),_=1-p;for(let m=0;m!==o;++m)r[m]=a[c+m]*_+a[l+m]*p;return r}const d=o*2,f=e-1;for(let p=0;p!==o;++p){const _=a[c+p],m=a[l+p],g=f*d+p*2,b=u[g],E=u[g+1],M=e*d+p*2,w=h[M],A=h[M+1];let C=(n-t)/(i-t),x,T,L,P,I;for(let k=0;k<8;k++){x=C*C,T=x*C,L=1-C,P=L*L,I=P*L;const O=I*t+3*P*C*b+3*L*x*w+T*i-n;if(Math.abs(O)<1e-10)break;const X=3*P*(b-t)+6*L*C*(w-b)+3*x*(i-w);if(Math.abs(X)<1e-10)break;C=C-O/X,C=Math.max(0,Math.min(1,C))}r[p]=I*_+3*P*C*E+3*L*x*A+T*m}return r}}class ri{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Xo(t,this.TimeBufferType),this.values=Xo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Xo(e.times,Array),values:Xo(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Kv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new $v(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Yv(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case $a:t=this.InterpolantFactoryMethodDiscrete;break;case Ka:t=this.InterpolantFactoryMethodLinear;break;case Lc:t=this.InterpolantFactoryMethodSmooth;break;case hf:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Re("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $a;case this.InterpolantFactoryMethodLinear:return Ka;case this.InterpolantFactoryMethodSmooth:return Lc;case this.InterpolantFactoryMethodBezier:return hf}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Oe("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(Oe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){Oe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Oe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&W_(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){Oe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Lc,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){const _=t[u+p];if(_!==t[d+p]||_!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}ri.prototype.ValueTypeName="";ri.prototype.TimeBufferType=Float32Array;ri.prototype.ValueBufferType=Float32Array;ri.prototype.DefaultInterpolation=Ka;class sa extends ri{constructor(e,t,n){super(e,t,n)}}sa.prototype.ValueTypeName="bool";sa.prototype.ValueBufferType=Array;sa.prototype.DefaultInterpolation=$a;sa.prototype.InterpolantFactoryMethodLinear=void 0;sa.prototype.InterpolantFactoryMethodSmooth=void 0;class vg extends ri{constructor(e,t,n,i){super(e,t,n,i)}}vg.prototype.ValueTypeName="color";class to extends ri{constructor(e,t,n,i){super(e,t,n,i)}}to.prototype.ValueTypeName="number";class Zv extends ia{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)tt.slerpFlat(r,0,a,c-o,a,c,l);return r}}class no extends ri{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Zv(this.times,this.values,this.getValueSize(),e)}}no.prototype.ValueTypeName="quaternion";no.prototype.InterpolantFactoryMethodSmooth=void 0;class ra extends ri{constructor(e,t,n){super(e,t,n)}}ra.prototype.ValueTypeName="string";ra.prototype.ValueBufferType=Array;ra.prototype.DefaultInterpolation=$a;ra.prototype.InterpolantFactoryMethodLinear=void 0;ra.prototype.InterpolantFactoryMethodSmooth=void 0;class rc extends ri{constructor(e,t,n,i){super(e,t,n,i)}}rc.prototype.ValueTypeName="vector";class Qv{constructor(e="",t=-1,n=[],i=I_){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=ei(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(jv(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(ri.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=Wv(l);l=Yf(l,1,h),c=Yf(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new to(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Jv(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return to;case"vector":case"vector2":case"vector3":case"vector4":return rc;case"color":return vg;case"quaternion":return no;case"bool":case"boolean":return sa;case"string":return ra}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function jv(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Jv(s.type);if(s.times===void 0){const t=[],n=[];Xv(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Ki={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Zf(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Zf(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Zf(s){try{const e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class ex{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const tx=new ex;class aa{constructor(e){this.manager=e!==void 0?e:tx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}aa.DEFAULT_MATERIAL_NAME="__DEFAULT";const Di={};class nx extends Error{constructor(e,t){super(e),this.response=t}}class xg extends aa{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ki.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Di[e]!==void 0){Di[e].push({onLoad:t,onProgress:n,onError:i});return}Di[e]=[],Di[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Re("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Di[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let _=0;const m=new ReadableStream({start(g){b();function b(){u.read().then(({done:E,value:M})=>{if(E)g.close();else{_+=M.byteLength;const w=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let A=0,C=h.length;A<C;A++){const x=h[A];x.onProgress&&x.onProgress(w)}g.enqueue(M),b()}},E=>{g.error(E)})}}});return new Response(m)}else throw new nx(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Ki.add(`file:${e}`,c);const h=Di[e];delete Di[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Di[e];if(h===void 0)throw this.manager.itemError(e),c;delete Di[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Tr=new WeakMap;class ix extends aa{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ki.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=Tr.get(a);u===void 0&&(u=[],Tr.set(a,u)),u.push({onLoad:t,onError:i})}return a}const o=Za("img");function l(){h(),t&&t(this);const u=Tr.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}Tr.delete(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),Ki.remove(`image:${e}`);const d=Tr.get(this)||[];for(let f=0;f<d.length;f++){const p=d[f];p.onError&&p.onError(u)}Tr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ki.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class sx extends aa{constructor(e){super(e)}load(e,t,n,i){const r=new Zt,a=new ix(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class gc extends Fe{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new te(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class rx extends gc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new te(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const sh=new ye,Qf=new S,Jf=new S;class Dd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.mapType=bn,this.map=null,this.mapPass=null,this.matrix=new ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cd,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Qf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Qf),Jf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Jf),t.updateMatrixWorld(),sh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sh,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ya||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(sh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const qo=new S,$o=new tt,ci=new S;class Mg extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ye,this.projectionMatrix=new ye,this.projectionMatrixInverse=new ye,this.coordinateSystem=Si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(qo,$o,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qo,$o,ci.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(qo,$o,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qo,$o,ci.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const os=new S,jf=new Se,ep=new Se;class ln extends Mg{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ga*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qr*2*Math.atan(Math.tan(Ga*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(os.x,os.y).multiplyScalar(-e/os.z),os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(os.x,os.y).multiplyScalar(-e/os.z)}getViewSize(e,t){return this.getViewBounds(e,jf,ep),t.subVectors(ep,jf)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ga*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class ax extends Dd{constructor(){super(new ln(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Qr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ox extends gc{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new ax}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class lx extends Dd{constructor(){super(new ln(90,1,.5,500)),this.isPointLightShadow=!0}}class rr extends gc{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new lx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class ao extends Mg{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class cx extends Dd{constructor(){super(new ao(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Nd extends gc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new cx}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Xa{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const rh=new WeakMap;class hx extends aa{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Re("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Re("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ki.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{rh.has(a)===!0?(i&&i(rh.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){Ki.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e)}).catch(function(c){i&&i(c),rh.set(l,c),Ki.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Ki.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const wr=-90,Ar=1;class Sg extends Fe{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ln(wr,Ar,e,t);i.layers=this.layers,this.add(i);const r=new ln(wr,Ar,e,t);r.layers=this.layers,this.add(r);const a=new ln(wr,Ar,e,t);a.layers=this.layers,this.add(a);const o=new ln(wr,Ar,e,t);o.layers=this.layers,this.add(o);const l=new ln(wr,Ar,e,t);l.layers=this.layers,this.add(l);const c=new ln(wr,Ar,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Si)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ya)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class ux extends ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class dx{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=fx.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function fx(){this._document.hidden===!1&&this.reset()}const Ud="\\[\\]\\.:\\/",px=new RegExp("["+Ud+"]","g"),Fd="[^"+Ud+"]",mx="[^"+Ud.replace("\\.","")+"]",gx=/((?:WC+[\/:])*)/.source.replace("WC",Fd),_x=/(WCOD+)?/.source.replace("WCOD",mx),vx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fd),xx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fd),Mx=new RegExp("^"+gx+_x+vx+xx+"$"),Sx=["material","materials","bones","map"];class yx{constructor(e,t,n){const i=n||ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ut{constructor(e,t,n){this.path=t,this.parsedPath=n||ut.parseTrackName(t),this.node=ut.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ut.Composite(e,t,n):new ut(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(px,"")}static parseTrackName(e){const t=Mx.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Sx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=ut.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Re("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Oe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Oe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Oe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Oe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Oe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Oe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Oe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;Oe("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Oe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Oe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ut.Composite=yx;ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ut.prototype.GetterByBindingType=[ut.prototype._getValue_direct,ut.prototype._getValue_array,ut.prototype._getValue_arrayElement,ut.prototype._getValue_toArray];ut.prototype.SetterByBindingTypeAndVersioning=[[ut.prototype._setValue_direct,ut.prototype._setValue_direct_setNeedsUpdate,ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_array,ut.prototype._setValue_array_setNeedsUpdate,ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_arrayElement,ut.prototype._setValue_arrayElement_setNeedsUpdate,ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_fromArray,ut.prototype._setValue_fromArray_setNeedsUpdate,ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class ac{constructor(e){this.value=e}clone(){return new ac(this.value.clone===void 0?this.value:this.value.clone())}}class yg{static{yg.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}}function tp(s,e,t,n){const i=bx(n);switch(t){case ng:return s*e;case vd:return s*e/i.components*i.byteLength;case xd:return s*e/i.components*i.byteLength;case js:return s*e*2/i.components*i.byteLength;case Md:return s*e*2/i.components*i.byteLength;case ig:return s*e*3/i.components*i.byteLength;case Ln:return s*e*4/i.components*i.byteLength;case Sd:return s*e*4/i.components*i.byteLength;case Gl:case Wl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Xl:case ql:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case xu:case Su:return Math.max(s,16)*Math.max(e,8)/4;case vu:case Mu:return Math.max(s,8)*Math.max(e,8)/2;case yu:case bu:case Tu:case wu:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Eu:case Jl:case Au:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ru:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Cu:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Pu:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Lu:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Iu:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Du:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Nu:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Uu:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Fu:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ou:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case ku:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Bu:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case zu:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Vu:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Hu:case Gu:case Wu:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Xu:case qu:return Math.ceil(s/4)*Math.ceil(e/4)*8;case jl:case $u:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function bx(s){switch(s){case bn:case J0:return{byteLength:1,components:1};case qa:case j0:case cn:return{byteLength:2,components:1};case gd:case _d:return{byteLength:2,components:4};case Ei:case md:case Vn:return{byteLength:4,components:1};case eg:case tg:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ld}}));typeof window<"u"&&(window.__THREE__?Re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ld);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function bg(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Ex(s){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],_=u[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const _=u[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var Tx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wx=`#ifdef USE_ALPHAHASH
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
#endif`,Ax=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Px=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lx=`#ifdef USE_AOMAP
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
#endif`,Ix=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Dx=`#ifdef USE_BATCHING
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
#endif`,Nx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ux=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ox=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,kx=`#ifdef USE_IRIDESCENCE
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
#endif`,Bx=`#ifdef USE_BUMPMAP
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
#endif`,zx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Vx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Xx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,qx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$x=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Kx=`#define PI 3.141592653589793
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
} // validated`,Yx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Zx=`vec3 transformedNormal = objectNormal;
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
#endif`,Qx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,eM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tM="gl_FragColor = linearToOutputTexel( gl_FragColor );",nM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,iM=`#ifdef USE_ENVMAP
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
#endif`,sM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,rM=`#ifdef USE_ENVMAP
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
#endif`,aM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,oM=`#ifdef USE_ENVMAP
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
#endif`,lM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,uM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dM=`#ifdef USE_GRADIENTMAP
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
}`,fM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gM=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,_M=`#ifdef USE_ENVMAP
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
#endif`,vM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,MM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,SM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yM=`PhysicalMaterial material;
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
#endif`,bM=`uniform sampler2D dfgLUT;
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
}`,EM=`
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
#endif`,TM=`#if defined( RE_IndirectDiffuse )
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
#endif`,wM=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,AM=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,RM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,CM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,PM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,LM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,IM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,DM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,NM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,UM=`#if defined( USE_POINTS_UV )
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
#endif`,FM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,OM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,BM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,VM=`#ifdef USE_MORPHTARGETS
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
#endif`,HM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,GM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,WM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,XM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$M=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,KM=`#ifdef USE_NORMALMAP
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
#endif`,YM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ZM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,QM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,JM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,eS=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,iS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,aS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,oS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hS=`float getShadowMask() {
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
}`,uS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dS=`#ifdef USE_SKINNING
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
#endif`,fS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pS=`#ifdef USE_SKINNING
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
#endif`,mS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_S=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,xS=`#ifdef USE_TRANSMISSION
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
#endif`,MS=`#ifdef USE_TRANSMISSION
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
#endif`,SS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ES=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const TS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wS=`uniform sampler2D t2D;
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
}`,AS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,RS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,CS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,PS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,LS=`#include <common>
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
}`,IS=`#if DEPTH_PACKING == 3200
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
}`,DS=`#define DISTANCE
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
}`,NS=`#define DISTANCE
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
}`,US=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,FS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,OS=`uniform float scale;
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
}`,kS=`uniform vec3 diffuse;
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
}`,BS=`#include <common>
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
}`,zS=`uniform vec3 diffuse;
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
}`,VS=`#define LAMBERT
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
}`,HS=`#define LAMBERT
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
}`,GS=`#define MATCAP
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
}`,WS=`#define MATCAP
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
}`,XS=`#define NORMAL
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
}`,qS=`#define NORMAL
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
}`,$S=`#define PHONG
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
}`,KS=`#define PHONG
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
}`,YS=`#define STANDARD
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
}`,ZS=`#define STANDARD
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
}`,QS=`#define TOON
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
}`,JS=`#define TOON
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
}`,jS=`uniform float size;
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
}`,ey=`uniform vec3 diffuse;
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
}`,ty=`#include <common>
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
}`,ny=`uniform vec3 color;
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
}`,iy=`uniform float rotation;
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
}`,sy=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:Tx,alphahash_pars_fragment:wx,alphamap_fragment:Ax,alphamap_pars_fragment:Rx,alphatest_fragment:Cx,alphatest_pars_fragment:Px,aomap_fragment:Lx,aomap_pars_fragment:Ix,batching_pars_vertex:Dx,batching_vertex:Nx,begin_vertex:Ux,beginnormal_vertex:Fx,bsdfs:Ox,iridescence_fragment:kx,bumpmap_pars_fragment:Bx,clipping_planes_fragment:zx,clipping_planes_pars_fragment:Vx,clipping_planes_pars_vertex:Hx,clipping_planes_vertex:Gx,color_fragment:Wx,color_pars_fragment:Xx,color_pars_vertex:qx,color_vertex:$x,common:Kx,cube_uv_reflection_fragment:Yx,defaultnormal_vertex:Zx,displacementmap_pars_vertex:Qx,displacementmap_vertex:Jx,emissivemap_fragment:jx,emissivemap_pars_fragment:eM,colorspace_fragment:tM,colorspace_pars_fragment:nM,envmap_fragment:iM,envmap_common_pars_fragment:sM,envmap_pars_fragment:rM,envmap_pars_vertex:aM,envmap_physical_pars_fragment:_M,envmap_vertex:oM,fog_vertex:lM,fog_pars_vertex:cM,fog_fragment:hM,fog_pars_fragment:uM,gradientmap_pars_fragment:dM,lightmap_pars_fragment:fM,lights_lambert_fragment:pM,lights_lambert_pars_fragment:mM,lights_pars_begin:gM,lights_toon_fragment:vM,lights_toon_pars_fragment:xM,lights_phong_fragment:MM,lights_phong_pars_fragment:SM,lights_physical_fragment:yM,lights_physical_pars_fragment:bM,lights_fragment_begin:EM,lights_fragment_maps:TM,lights_fragment_end:wM,lightprobes_pars_fragment:AM,logdepthbuf_fragment:RM,logdepthbuf_pars_fragment:CM,logdepthbuf_pars_vertex:PM,logdepthbuf_vertex:LM,map_fragment:IM,map_pars_fragment:DM,map_particle_fragment:NM,map_particle_pars_fragment:UM,metalnessmap_fragment:FM,metalnessmap_pars_fragment:OM,morphinstance_vertex:kM,morphcolor_vertex:BM,morphnormal_vertex:zM,morphtarget_pars_vertex:VM,morphtarget_vertex:HM,normal_fragment_begin:GM,normal_fragment_maps:WM,normal_pars_fragment:XM,normal_pars_vertex:qM,normal_vertex:$M,normalmap_pars_fragment:KM,clearcoat_normal_fragment_begin:YM,clearcoat_normal_fragment_maps:ZM,clearcoat_pars_fragment:QM,iridescence_pars_fragment:JM,opaque_fragment:jM,packing:eS,premultiplied_alpha_fragment:tS,project_vertex:nS,dithering_fragment:iS,dithering_pars_fragment:sS,roughnessmap_fragment:rS,roughnessmap_pars_fragment:aS,shadowmap_pars_fragment:oS,shadowmap_pars_vertex:lS,shadowmap_vertex:cS,shadowmask_pars_fragment:hS,skinbase_vertex:uS,skinning_pars_vertex:dS,skinning_vertex:fS,skinnormal_vertex:pS,specularmap_fragment:mS,specularmap_pars_fragment:gS,tonemapping_fragment:_S,tonemapping_pars_fragment:vS,transmission_fragment:xS,transmission_pars_fragment:MS,uv_pars_fragment:SS,uv_pars_vertex:yS,uv_vertex:bS,worldpos_vertex:ES,background_vert:TS,background_frag:wS,backgroundCube_vert:AS,backgroundCube_frag:RS,cube_vert:CS,cube_frag:PS,depth_vert:LS,depth_frag:IS,distance_vert:DS,distance_frag:NS,equirect_vert:US,equirect_frag:FS,linedashed_vert:OS,linedashed_frag:kS,meshbasic_vert:BS,meshbasic_frag:zS,meshlambert_vert:VS,meshlambert_frag:HS,meshmatcap_vert:GS,meshmatcap_frag:WS,meshnormal_vert:XS,meshnormal_frag:qS,meshphong_vert:$S,meshphong_frag:KS,meshphysical_vert:YS,meshphysical_frag:ZS,meshtoon_vert:QS,meshtoon_frag:JS,points_vert:jS,points_frag:ey,shadow_vert:ty,shadow_frag:ny,sprite_vert:iy,sprite_frag:sy},de={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new S},probesMax:{value:new S},probesResolution:{value:new S}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},_i={basic:{uniforms:xn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:xn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new te(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:xn([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:xn([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:xn([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new te(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:xn([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:xn([de.points,de.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:xn([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:xn([de.common,de.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:xn([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:xn([de.sprite,de.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:xn([de.common,de.displacementmap,{referencePosition:{value:new S},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:xn([de.lights,de.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};_i.physical={uniforms:xn([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Ko={r:0,b:0,g:0},ry=new ye,Eg=new ze;Eg.set(-1,0,0,0,1,0,0,0,1);function ay(s,e,t,n,i,r){const a=new te(0);let o=i===!0?0:1,l,c,h=null,u=0,d=null;function f(b){let E=b.isScene===!0?b.background:null;if(E&&E.isTexture){const M=b.backgroundBlurriness>0;E=e.get(E,M)}return E}function p(b){let E=!1;const M=f(b);M===null?m(a,o):M&&M.isColor&&(m(M,1),E=!0);const w=s.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(b,E){const M=f(E);M&&(M.isCubeTexture||M.mapping===dc)?(c===void 0&&(c=new Me(new Sn(1,1,1),new Et({name:"BackgroundCubeMaterial",uniforms:jr(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(ry.makeRotationFromEuler(E.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Eg),c.material.toneMapped=$e.getTransfer(M.colorSpace)!==ct,(h!==M||u!==M.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,d=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Me(new Ti(2,2),new Et({name:"BackgroundMaterial",uniforms:jr(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=$e.getTransfer(M.colorSpace)!==ct,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,d=s.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,E){b.getRGB(Ko,gg(s)),t.buffers.color.setClear(Ko.r,Ko.g,Ko.b,E,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,E=1){a.set(b),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:p,addToRenderList:_,dispose:g}}function oy(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(P,I,k,q,O){let X=!1;const B=u(P,q,k,I);r!==B&&(r=B,c(r.object)),X=f(P,q,k,O),X&&p(P,q,k,O),O!==null&&e.update(O,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,M(P,I,k,q),O!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return s.createVertexArray()}function c(P){return s.bindVertexArray(P)}function h(P){return s.deleteVertexArray(P)}function u(P,I,k,q){const O=q.wireframe===!0;let X=n[I.id];X===void 0&&(X={},n[I.id]=X);const B=P.isInstancedMesh===!0?P.id:0;let Q=X[B];Q===void 0&&(Q={},X[B]=Q);let J=Q[k.id];J===void 0&&(J={},Q[k.id]=J);let re=J[O];return re===void 0&&(re=d(l()),J[O]=re),re}function d(P){const I=[],k=[],q=[];for(let O=0;O<t;O++)I[O]=0,k[O]=0,q[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:k,attributeDivisors:q,object:P,attributes:{},index:null}}function f(P,I,k,q){const O=r.attributes,X=I.attributes;let B=0;const Q=k.getAttributes();for(const J in Q)if(Q[J].location>=0){const le=O[J];let ge=X[J];if(ge===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(ge=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(ge=P.instanceColor)),le===void 0||le.attribute!==ge||ge&&le.data!==ge.data)return!0;B++}return r.attributesNum!==B||r.index!==q}function p(P,I,k,q){const O={},X=I.attributes;let B=0;const Q=k.getAttributes();for(const J in Q)if(Q[J].location>=0){let le=X[J];le===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(le=P.instanceColor));const ge={};ge.attribute=le,le&&le.data&&(ge.data=le.data),O[J]=ge,B++}r.attributes=O,r.attributesNum=B,r.index=q}function _(){const P=r.newAttributes;for(let I=0,k=P.length;I<k;I++)P[I]=0}function m(P){g(P,0)}function g(P,I){const k=r.newAttributes,q=r.enabledAttributes,O=r.attributeDivisors;k[P]=1,q[P]===0&&(s.enableVertexAttribArray(P),q[P]=1),O[P]!==I&&(s.vertexAttribDivisor(P,I),O[P]=I)}function b(){const P=r.newAttributes,I=r.enabledAttributes;for(let k=0,q=I.length;k<q;k++)I[k]!==P[k]&&(s.disableVertexAttribArray(k),I[k]=0)}function E(P,I,k,q,O,X,B){B===!0?s.vertexAttribIPointer(P,I,k,O,X):s.vertexAttribPointer(P,I,k,q,O,X)}function M(P,I,k,q){_();const O=q.attributes,X=k.getAttributes(),B=I.defaultAttributeValues;for(const Q in X){const J=X[Q];if(J.location>=0){let re=O[Q];if(re===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(re=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(re=P.instanceColor)),re!==void 0){const le=re.normalized,ge=re.itemSize,Je=e.get(re);if(Je===void 0)continue;const pt=Je.buffer,je=Je.type,K=Je.bytesPerElement,ie=je===s.INT||je===s.UNSIGNED_INT||re.gpuType===md;if(re.isInterleavedBufferAttribute){const ee=re.data,Ie=ee.stride,Ne=re.offset;if(ee.isInstancedInterleavedBuffer){for(let De=0;De<J.locationSize;De++)g(J.location+De,ee.meshPerAttribute);P.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let De=0;De<J.locationSize;De++)m(J.location+De);s.bindBuffer(s.ARRAY_BUFFER,pt);for(let De=0;De<J.locationSize;De++)E(J.location+De,ge/J.locationSize,je,le,Ie*K,(Ne+ge/J.locationSize*De)*K,ie)}else{if(re.isInstancedBufferAttribute){for(let ee=0;ee<J.locationSize;ee++)g(J.location+ee,re.meshPerAttribute);P.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ee=0;ee<J.locationSize;ee++)m(J.location+ee);s.bindBuffer(s.ARRAY_BUFFER,pt);for(let ee=0;ee<J.locationSize;ee++)E(J.location+ee,ge/J.locationSize,je,le,ge*K,ge/J.locationSize*ee*K,ie)}}else if(B!==void 0){const le=B[Q];if(le!==void 0)switch(le.length){case 2:s.vertexAttrib2fv(J.location,le);break;case 3:s.vertexAttrib3fv(J.location,le);break;case 4:s.vertexAttrib4fv(J.location,le);break;default:s.vertexAttrib1fv(J.location,le)}}}}b()}function w(){T();for(const P in n){const I=n[P];for(const k in I){const q=I[k];for(const O in q){const X=q[O];for(const B in X)h(X[B].object),delete X[B];delete q[O]}}delete n[P]}}function A(P){if(n[P.id]===void 0)return;const I=n[P.id];for(const k in I){const q=I[k];for(const O in q){const X=q[O];for(const B in X)h(X[B].object),delete X[B];delete q[O]}}delete n[P.id]}function C(P){for(const I in n){const k=n[I];for(const q in k){const O=k[q];if(O[P.id]===void 0)continue;const X=O[P.id];for(const B in X)h(X[B].object),delete X[B];delete O[P.id]}}}function x(P){for(const I in n){const k=n[I],q=P.isInstancedMesh===!0?P.id:0,O=k[q];if(O!==void 0){for(const X in O){const B=O[X];for(const Q in B)h(B[Q].object),delete B[Q];delete O[X]}delete k[q],Object.keys(k).length===0&&delete n[I]}}}function T(){L(),a=!0,r!==i&&(r=i,c(r.object))}function L(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:T,resetDefaultState:L,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function ly(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function cy(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==Ln&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const x=C===cn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==bn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Vn&&!x)}function l(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Re("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Re("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),b=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),w=s.getParameter(s.MAX_SAMPLES),A=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:M,maxSamples:w,samples:A}}function hy(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Gs,o=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,g=s.get(u);if(!i||p===null||p.length===0||r&&!m)r?h(null):c();else{const b=r?0:n,E=b*4;let M=g.clippingState||null;l.value=M,M=h(p,d,E,f);for(let w=0;w!==E;++w)M[w]=t[w];g.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,p!==!0||m===null){const g=f+_*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<g)&&(m=new Float32Array(g));for(let E=0,M=f;E!==_;++E,M+=4)a.copy(u[E]).applyMatrix4(b,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const vs=4,np=[.125,.215,.35,.446,.526,.582],Ws=20,uy=256,ba=new ao,ip=new te;let ah=null,oh=0,lh=0,ch=!1;const dy=new S;class ea{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){const{size:a=256,position:o=dy}=r;ah=this._renderer.getRenderTarget(),oh=this._renderer.getActiveCubeFace(),lh=this._renderer.getActiveMipmapLevel(),ch=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ap(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ah,oh,lh),this._renderer.xr.enabled=ch,e.scissorTest=!1,Rr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Js||e.mapping===Yr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ah=this._renderer.getRenderTarget(),oh=this._renderer.getActiveCubeFace(),lh=this._renderer.getActiveMipmapLevel(),ch=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:cn,format:Ln,colorSpace:Nn,depthBuffer:!1},i=sp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sp(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=fy(r)),this._blurMaterial=my(r,e,t),this._ggxMaterial=py(r,e,t)}return i}_compileMaterial(e){const t=new Me(new xt,e);this._renderer.compile(t,ba)}_sceneToCubeUV(e,t,n,i,r){const l=new ln(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(ip),u.toneMapping=yi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Me(new Sn,new Ot({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let g=!1;const b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,g=!0):(m.color.copy(ip),g=!0);for(let E=0;E<6;E++){const M=E%3;M===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):M===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const w=this._cubeSize;Rr(i,M*w,E>2?w:0,w,w),u.setRenderTarget(i),g&&u.render(_,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=b}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Js||e.mapping===Yr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ap()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rp());const r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Rr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ba)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=0+c*1.25,f=u*d,{_lodMax:p}=this,_=this._sizeLods[n],m=3*_*(n>p-vs?n-p+vs:0),g=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,Rr(r,m,g,3*_,2*_),i.setRenderTarget(r),i.render(o,ba),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,Rr(e,m,g,3*_,2*_),i.setRenderTarget(e),i.render(o,ba)}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Oe("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[i];u.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ws-1),_=r/p,m=isFinite(r)?1+Math.floor(h*_):Ws;m>Ws&&Re(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ws}`);const g=[];let b=0;for(let C=0;C<Ws;++C){const x=C/_,T=Math.exp(-x*x/2);g.push(T),C===0?b+=T:C<m&&(b+=2*T)}for(let C=0;C<g.length;C++)g[C]=g[C]/b;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=g,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:E}=this;d.dTheta.value=p,d.mipInt.value=E-n;const M=this._sizeLods[i],w=3*M*(i>E-vs?i-E+vs:0),A=4*(this._cubeSize-M);Rr(t,w,A,3*M,2*M),l.setRenderTarget(t),l.render(u,ba)}}function fy(s){const e=[],t=[],n=[];let i=s;const r=s-vs+1+np.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-vs?l=np[a-s+vs-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,_=3,m=2,g=1,b=new Float32Array(_*p*f),E=new Float32Array(m*p*f),M=new Float32Array(g*p*f);for(let A=0;A<f;A++){const C=A%3*2/3-1,x=A>2?0:-1,T=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];b.set(T,_*p*A),E.set(d,m*p*A);const L=[A,A,A,A,A,A];M.set(L,g*p*A)}const w=new xt;w.setAttribute("position",new at(b,_)),w.setAttribute("uv",new at(E,m)),w.setAttribute("faceIndex",new at(M,g)),n.push(new Me(w,null)),i>vs&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function sp(s,e,t){const n=new hn(s,e,t);return n.texture.mapping=dc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Rr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function py(s,e,t){return new Et({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:uy,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:_c(),fragmentShader:`

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
		`,blending:nn,depthTest:!1,depthWrite:!1})}function my(s,e,t){const n=new Float32Array(Ws),i=new S(0,1,0);return new Et({name:"SphericalGaussianBlur",defines:{n:Ws,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:_c(),fragmentShader:`

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
		`,blending:nn,depthTest:!1,depthWrite:!1})}function rp(){return new Et({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_c(),fragmentShader:`

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
		`,blending:nn,depthTest:!1,depthWrite:!1})}function ap(){return new Et({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:nn,depthTest:!1,depthWrite:!1})}function _c(){return`

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
	`}class Od extends hn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new pg(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Sn(5,5,5),r=new Et({name:"CubemapFromEquirect",uniforms:jr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:sn,blending:nn});r.uniforms.tEquirect.value=t;const a=new Me(i,r),o=t.minFilter;return t.minFilter===$i&&(t.minFilter=Pt),new Sg(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}function gy(s){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){const f=d.mapping;if(f===Cc||f===Pc)if(e.has(d)){const p=e.get(d).texture;return o(p,d.mapping)}else{const p=d.image;if(p&&p.height>0){const _=new Od(p.height);return _.fromEquirectangularTexture(s,d),e.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,p=f===Cc||f===Pc,_=f===Js||f===Yr;if(p||_){let m=t.get(d);const g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new ea(s)),m=p?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const b=d.image;return p&&b&&b.height>0||_&&b&&l(b)?(n===null&&(n=new ea(s)),m=p?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,f){return f===Cc?d.mapping=Js:f===Pc&&(d.mapping=Yr),d}function l(d){let f=0;const p=6;for(let _=0;_<p;_++)d[_]!==void 0&&f++;return f===p}function c(d){const f=d.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(d){const f=d.target;f.removeEventListener("dispose",h);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function _y(s){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Xr("WebGLRenderer: "+n+" extension not supported."),i}}}function vy(s,e,t,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,p=u.attributes.position;let _=0;if(p===void 0)return;if(f!==null){const b=f.array;_=f.version;for(let E=0,M=b.length;E<M;E+=3){const w=b[E+0],A=b[E+1],C=b[E+2];d.push(w,A,A,C,C,w)}}else{const b=p.array;_=p.version;for(let E=0,M=b.length/3-1;E<M;E+=3){const w=E+0,A=E+1,C=E+2;d.push(w,A,A,C,C,w)}}const m=new(p.count>=65535?hg:cg)(d,1);m.version=_;const g=r.get(u);g&&e.remove(g),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function xy(s,e,t){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){s.drawElements(n,d,r,u*a),t.update(d,n,1)}function c(u,d,f){f!==0&&(s.drawElementsInstanced(n,d,r,u*a,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let _=0;for(let m=0;m<f;m++)_+=d[m];t.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function My(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:Oe("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Sy(s,e,t){const n=new WeakMap,i=new ft;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let L=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",L)};var f=L;d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let M=0;p===!0&&(M=1),_===!0&&(M=2),m===!0&&(M=3);let w=o.attributes.position.count*M,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const C=new Float32Array(w*A*4*u),x=new ag(C,w,A,u);x.type=Vn,x.needsUpdate=!0;const T=M*4;for(let P=0;P<u;P++){const I=g[P],k=b[P],q=E[P],O=w*A*4*P;for(let X=0;X<I.count;X++){const B=X*T;p===!0&&(i.fromBufferAttribute(I,X),C[O+B+0]=i.x,C[O+B+1]=i.y,C[O+B+2]=i.z,C[O+B+3]=0),_===!0&&(i.fromBufferAttribute(k,X),C[O+B+4]=i.x,C[O+B+5]=i.y,C[O+B+6]=i.z,C[O+B+7]=0),m===!0&&(i.fromBufferAttribute(q,X),C[O+B+8]=i.x,C[O+B+9]=i.y,C[O+B+10]=i.z,C[O+B+11]=q.itemSize===4?i.w:1)}}d={count:u,texture:x,size:new Se(w,A)},n.set(o,d),o.addEventListener("dispose",L)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let p=0;for(let m=0;m<c.length;m++)p+=c[m];const _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function yy(s,e,t,n,i){let r=new WeakMap;function a(c){const h=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const by={[cd]:"LINEAR_TONE_MAPPING",[hd]:"REINHARD_TONE_MAPPING",[ud]:"CINEON_TONE_MAPPING",[uc]:"ACES_FILMIC_TONE_MAPPING",[fd]:"AGX_TONE_MAPPING",[pd]:"NEUTRAL_TONE_MAPPING",[dd]:"CUSTOM_TONE_MAPPING"};function Ey(s,e,t,n,i,r){const a=new hn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,depthTexture:i?new tr(e,t):void 0}),o=new hn(e,t,{type:cn,depthBuffer:!1,stencilBuffer:!1}),l=new xt;l.setAttribute("position",new vt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new vt([0,2,0,0,2,0],2));const c=new _g({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new Me(l,c),u=new ao(-1,1,1,-1,0,1);let d=null,f=null,p=!1,_,m=null,g=[],b=!1;this.setSize=function(E,M){a.setSize(E,M),o.setSize(E,M);for(let w=0;w<g.length;w++){const A=g[w];A.setSize&&A.setSize(E,M)}},this.setEffects=function(E){g=E,b=g.length>0&&g[0].isRenderPass===!0;const M=a.width,w=a.height;for(let A=0;A<g.length;A++){const C=g[A];C.setSize&&C.setSize(M,w)}},this.begin=function(E,M){if(p||E.toneMapping===yi&&g.length===0)return!1;if(m=M,M!==null){const w=M.width,A=M.height;(a.width!==w||a.height!==A)&&this.setSize(w,A)}return b===!1&&E.setRenderTarget(a),_=E.toneMapping,E.toneMapping=yi,!0},this.hasRenderPass=function(){return b},this.end=function(E,M){E.toneMapping=_,p=!0;let w=a,A=o;for(let C=0;C<g.length;C++){const x=g[C];if(x.enabled!==!1&&(x.render(E,A,w,M),x.needsSwap!==!1)){const T=w;w=A,A=T}}if(d!==E.outputColorSpace||f!==E.toneMapping){d=E.outputColorSpace,f=E.toneMapping,c.defines={},$e.getTransfer(d)===ct&&(c.defines.SRGB_TRANSFER="");const C=by[f];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,E.setRenderTarget(m),E.render(h,u),m=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Tg=new Zt,Qu=new tr(1,1),wg=new ag,Ag=new mv,Rg=new pg,op=[],lp=[],cp=new Float32Array(16),hp=new Float32Array(9),up=new Float32Array(4);function oa(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=op[i];if(r===void 0&&(r=new Float32Array(i),op[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Qt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Jt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function vc(s,e){let t=lp[e];t===void 0&&(t=new Int32Array(e),lp[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Ty(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function wy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;s.uniform2fv(this.addr,e),Jt(t,e)}}function Ay(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Qt(t,e))return;s.uniform3fv(this.addr,e),Jt(t,e)}}function Ry(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;s.uniform4fv(this.addr,e),Jt(t,e)}}function Cy(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Qt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Jt(t,e)}else{if(Qt(t,n))return;up.set(n),s.uniformMatrix2fv(this.addr,!1,up),Jt(t,n)}}function Py(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Qt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Jt(t,e)}else{if(Qt(t,n))return;hp.set(n),s.uniformMatrix3fv(this.addr,!1,hp),Jt(t,n)}}function Ly(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Qt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Jt(t,e)}else{if(Qt(t,n))return;cp.set(n),s.uniformMatrix4fv(this.addr,!1,cp),Jt(t,n)}}function Iy(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Dy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;s.uniform2iv(this.addr,e),Jt(t,e)}}function Ny(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Qt(t,e))return;s.uniform3iv(this.addr,e),Jt(t,e)}}function Uy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;s.uniform4iv(this.addr,e),Jt(t,e)}}function Fy(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Oy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;s.uniform2uiv(this.addr,e),Jt(t,e)}}function ky(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Qt(t,e))return;s.uniform3uiv(this.addr,e),Jt(t,e)}}function By(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;s.uniform4uiv(this.addr,e),Jt(t,e)}}function zy(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Qu.compareFunction=t.isReversedDepthBuffer()?bd:yd,r=Qu):r=Tg,t.setTexture2D(e||r,i)}function Vy(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Ag,i)}function Hy(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Rg,i)}function Gy(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||wg,i)}function Wy(s){switch(s){case 5126:return Ty;case 35664:return wy;case 35665:return Ay;case 35666:return Ry;case 35674:return Cy;case 35675:return Py;case 35676:return Ly;case 5124:case 35670:return Iy;case 35667:case 35671:return Dy;case 35668:case 35672:return Ny;case 35669:case 35673:return Uy;case 5125:return Fy;case 36294:return Oy;case 36295:return ky;case 36296:return By;case 35678:case 36198:case 36298:case 36306:case 35682:return zy;case 35679:case 36299:case 36307:return Vy;case 35680:case 36300:case 36308:case 36293:return Hy;case 36289:case 36303:case 36311:case 36292:return Gy}}function Xy(s,e){s.uniform1fv(this.addr,e)}function qy(s,e){const t=oa(e,this.size,2);s.uniform2fv(this.addr,t)}function $y(s,e){const t=oa(e,this.size,3);s.uniform3fv(this.addr,t)}function Ky(s,e){const t=oa(e,this.size,4);s.uniform4fv(this.addr,t)}function Yy(s,e){const t=oa(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Zy(s,e){const t=oa(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Qy(s,e){const t=oa(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Jy(s,e){s.uniform1iv(this.addr,e)}function jy(s,e){s.uniform2iv(this.addr,e)}function e1(s,e){s.uniform3iv(this.addr,e)}function t1(s,e){s.uniform4iv(this.addr,e)}function n1(s,e){s.uniform1uiv(this.addr,e)}function i1(s,e){s.uniform2uiv(this.addr,e)}function s1(s,e){s.uniform3uiv(this.addr,e)}function r1(s,e){s.uniform4uiv(this.addr,e)}function a1(s,e,t){const n=this.cache,i=e.length,r=vc(t,i);Qt(n,r)||(s.uniform1iv(this.addr,r),Jt(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Qu:a=Tg;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function o1(s,e,t){const n=this.cache,i=e.length,r=vc(t,i);Qt(n,r)||(s.uniform1iv(this.addr,r),Jt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Ag,r[a])}function l1(s,e,t){const n=this.cache,i=e.length,r=vc(t,i);Qt(n,r)||(s.uniform1iv(this.addr,r),Jt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Rg,r[a])}function c1(s,e,t){const n=this.cache,i=e.length,r=vc(t,i);Qt(n,r)||(s.uniform1iv(this.addr,r),Jt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||wg,r[a])}function h1(s){switch(s){case 5126:return Xy;case 35664:return qy;case 35665:return $y;case 35666:return Ky;case 35674:return Yy;case 35675:return Zy;case 35676:return Qy;case 5124:case 35670:return Jy;case 35667:case 35671:return jy;case 35668:case 35672:return e1;case 35669:case 35673:return t1;case 5125:return n1;case 36294:return i1;case 36295:return s1;case 36296:return r1;case 35678:case 36198:case 36298:case 36306:case 35682:return a1;case 35679:case 36299:case 36307:return o1;case 35680:case 36300:case 36308:case 36293:return l1;case 36289:case 36303:case 36311:case 36292:return c1}}class u1{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Wy(t.type)}}class d1{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=h1(t.type)}}class f1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const hh=/(\w+)(\])?(\[|\.)?/g;function dp(s,e){s.seq.push(e),s.map[e.id]=e}function p1(s,e,t){const n=s.name,i=n.length;for(hh.lastIndex=0;;){const r=hh.exec(n),a=hh.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){dp(t,c===void 0?new u1(o,s,e):new d1(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new f1(o),dp(t,u)),t=u}}}class $l{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);p1(o,l,this)}const i=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function fp(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const m1=37297;let g1=0;function _1(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const pp=new ze;function v1(s){$e._getMatrix(pp,$e.workingColorSpace,s);const e=`mat3( ${pp.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(s)){case tc:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return Re("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function mp(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+_1(s.getShaderSource(e),o)}else return r}function x1(s,e){const t=v1(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const M1={[cd]:"Linear",[hd]:"Reinhard",[ud]:"Cineon",[uc]:"ACESFilmic",[fd]:"AgX",[pd]:"Neutral",[dd]:"Custom"};function S1(s,e){const t=M1[e];return t===void 0?(Re("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Yo=new S;function y1(){$e.getLuminanceCoefficients(Yo);const s=Yo.x.toFixed(4),e=Yo.y.toFixed(4),t=Yo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function b1(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Va).join(`
`)}function E1(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function T1(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Va(s){return s!==""}function gp(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function _p(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const w1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ju(s){return s.replace(w1,R1)}const A1=new Map;function R1(s,e){let t=Ge[e];if(t===void 0){const n=A1.get(e);if(n!==void 0)t=Ge[n],Re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ju(t)}const C1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vp(s){return s.replace(C1,P1)}function P1(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function xp(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}const L1={[Ha]:"SHADOWMAP_TYPE_PCF",[ka]:"SHADOWMAP_TYPE_VSM"};function I1(s){return L1[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const D1={[Js]:"ENVMAP_TYPE_CUBE",[Yr]:"ENVMAP_TYPE_CUBE",[dc]:"ENVMAP_TYPE_CUBE_UV"};function N1(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":D1[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const U1={[Yr]:"ENVMAP_MODE_REFRACTION"};function F1(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":U1[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const O1={[Y0]:"ENVMAP_BLENDING_MULTIPLY",[C_]:"ENVMAP_BLENDING_MIX",[P_]:"ENVMAP_BLENDING_ADD"};function k1(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":O1[s.combine]||"ENVMAP_BLENDING_NONE"}function B1(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function z1(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=I1(t),c=N1(t),h=F1(t),u=k1(t),d=B1(t),f=b1(t),p=E1(r),_=i.createProgram();let m,g,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Va).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Va).join(`
`),g.length>0&&(g+=`
`)):(m=[xp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Va).join(`
`),g=[xp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yi?"#define TONE_MAPPING":"",t.toneMapping!==yi?Ge.tonemapping_pars_fragment:"",t.toneMapping!==yi?S1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,x1("linearToOutputTexel",t.outputColorSpace),y1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Va).join(`
`)),a=Ju(a),a=gp(a,t),a=_p(a,t),o=Ju(o),o=gp(o,t),o=_p(o,t),a=vp(a),o=vp(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===mf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===mf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const E=b+m+a,M=b+g+o,w=fp(i,i.VERTEX_SHADER,E),A=fp(i,i.FRAGMENT_SHADER,M);i.attachShader(_,w),i.attachShader(_,A),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(P){if(s.debug.checkShaderErrors){const I=i.getProgramInfoLog(_)||"",k=i.getShaderInfoLog(w)||"",q=i.getShaderInfoLog(A)||"",O=I.trim(),X=k.trim(),B=q.trim();let Q=!0,J=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,w,A);else{const re=mp(i,w,"vertex"),le=mp(i,A,"fragment");Oe("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+re+`
`+le)}else O!==""?Re("WebGLProgram: Program Info Log:",O):(X===""||B==="")&&(J=!1);J&&(P.diagnostics={runnable:Q,programLog:O,vertexShader:{log:X,prefix:m},fragmentShader:{log:B,prefix:g}})}i.deleteShader(w),i.deleteShader(A),x=new $l(i,_),T=T1(i,_)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=i.getProgramParameter(_,m1)),L},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=g1++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=A,this}let V1=0;class H1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new G1(e),t.set(e,n)),n}}class G1{constructor(e){this.id=V1++,this.code=e,this.usedTimes=0}}function W1(s){return s===js||s===Jl||s===jl}function X1(s,e,t,n,i,r){const a=new og,o=new H1,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return l.add(x),x===0?"uv":`uv${x}`}function _(x,T,L,P,I,k){const q=P.fog,O=I.geometry,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,Q=e.get(x.envMap||X,B),J=Q&&Q.mapping===dc?Q.image.height:null,re=f[x.type];x.precision!==null&&(d=n.getMaxPrecision(x.precision),d!==x.precision&&Re("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const le=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ge=le!==void 0?le.length:0;let Je=0;O.morphAttributes.position!==void 0&&(Je=1),O.morphAttributes.normal!==void 0&&(Je=2),O.morphAttributes.color!==void 0&&(Je=3);let pt,je,K,ie;if(re){const be=_i[re];pt=be.vertexShader,je=be.fragmentShader}else{pt=x.vertexShader,je=x.fragmentShader;const be=o.getVertexShaderStage(x),Dt=o.getFragmentShaderStage(x);o.update(x,be,Dt),K=be.id,ie=Dt.id}const ee=s.getRenderTarget(),Ie=s.state.buffers.depth.getReversed(),Ne=I.isInstancedMesh===!0,De=I.isBatchedMesh===!0,bt=!!x.map,He=!!x.matcap,ot=!!Q,et=!!x.aoMap,Ye=!!x.lightMap,Tt=!!x.bumpMap&&x.wireframe===!1,Rt=!!x.normalMap,It=!!x.displacementMap,kt=!!x.emissiveMap,Mt=!!x.metalnessMap,wt=!!x.roughnessMap,N=x.anisotropy>0,jt=x.clearcoat>0,it=x.dispersion>0,R=x.iridescence>0,v=x.sheen>0,F=x.transmission>0,z=N&&!!x.anisotropyMap,W=jt&&!!x.clearcoatMap,ne=jt&&!!x.clearcoatNormalMap,oe=jt&&!!x.clearcoatRoughnessMap,$=R&&!!x.iridescenceMap,Y=R&&!!x.iridescenceThicknessMap,ce=v&&!!x.sheenColorMap,we=v&&!!x.sheenRoughnessMap,ae=!!x.specularMap,se=!!x.specularColorMap,Ee=!!x.specularIntensityMap,Pe=F&&!!x.transmissionMap,ke=F&&!!x.thicknessMap,D=!!x.gradientMap,he=!!x.alphaMap,Z=x.alphaTest>0,ue=!!x.alphaHash,me=!!x.extensions;let j=yi;x.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(j=s.toneMapping);const Ae={shaderID:re,shaderType:x.type,shaderName:x.name,vertexShader:pt,fragmentShader:je,defines:x.defines,customVertexShaderID:K,customFragmentShaderID:ie,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:De,batchingColor:De&&I._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&I.instanceColor!==null,instancingMorph:Ne&&I.morphTexture!==null,outputColorSpace:ee===null?s.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:bt,matcap:He,envMap:ot,envMapMode:ot&&Q.mapping,envMapCubeUVHeight:J,aoMap:et,lightMap:Ye,bumpMap:Tt,normalMap:Rt,displacementMap:It,emissiveMap:kt,normalMapObjectSpace:Rt&&x.normalMapType===U_,normalMapTangentSpace:Rt&&x.normalMapType===ec,packedNormalMap:Rt&&x.normalMapType===ec&&W1(x.normalMap.format),metalnessMap:Mt,roughnessMap:wt,anisotropy:N,anisotropyMap:z,clearcoat:jt,clearcoatMap:W,clearcoatNormalMap:ne,clearcoatRoughnessMap:oe,dispersion:it,iridescence:R,iridescenceMap:$,iridescenceThicknessMap:Y,sheen:v,sheenColorMap:ce,sheenRoughnessMap:we,specularMap:ae,specularColorMap:se,specularIntensityMap:Ee,transmission:F,transmissionMap:Pe,thicknessMap:ke,gradientMap:D,opaque:x.transparent===!1&&x.blending===Wr&&x.alphaToCoverage===!1,alphaMap:he,alphaTest:Z,alphaHash:ue,combine:x.combine,mapUv:bt&&p(x.map.channel),aoMapUv:et&&p(x.aoMap.channel),lightMapUv:Ye&&p(x.lightMap.channel),bumpMapUv:Tt&&p(x.bumpMap.channel),normalMapUv:Rt&&p(x.normalMap.channel),displacementMapUv:It&&p(x.displacementMap.channel),emissiveMapUv:kt&&p(x.emissiveMap.channel),metalnessMapUv:Mt&&p(x.metalnessMap.channel),roughnessMapUv:wt&&p(x.roughnessMap.channel),anisotropyMapUv:z&&p(x.anisotropyMap.channel),clearcoatMapUv:W&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:ne&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:Y&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:we&&p(x.sheenRoughnessMap.channel),specularMapUv:ae&&p(x.specularMap.channel),specularColorMapUv:se&&p(x.specularColorMap.channel),specularIntensityMapUv:Ee&&p(x.specularIntensityMap.channel),transmissionMapUv:Pe&&p(x.transmissionMap.channel),thicknessMapUv:ke&&p(x.thicknessMap.channel),alphaMapUv:he&&p(x.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Rt||N),vertexNormals:!!O.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!O.attributes.uv&&(bt||he),fog:!!q,useFog:x.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||O.attributes.normal===void 0&&Rt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ie,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:Je,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:j,decodeVideoTexture:bt&&x.map.isVideoTexture===!0&&$e.getTransfer(x.map.colorSpace)===ct,decodeVideoTextureEmissive:kt&&x.emissiveMap.isVideoTexture===!0&&$e.getTransfer(x.emissiveMap.colorSpace)===ct,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Kt,flipSided:x.side===sn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:me&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&x.extensions.multiDraw===!0||De)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ae.vertexUv1s=l.has(1),Ae.vertexUv2s=l.has(2),Ae.vertexUv3s=l.has(3),l.clear(),Ae}function m(x){const T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(const L in x.defines)T.push(L),T.push(x.defines[L]);return x.isRawShaderMaterial===!1&&(g(T,x),b(T,x),T.push(s.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function g(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function b(x,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function E(x){const T=f[x.type];let L;if(T){const P=_i[T];L=vi.clone(P.uniforms)}else L=x.uniforms;return L}function M(x,T){let L=h.get(T);return L!==void 0?++L.usedTimes:(L=new z1(s,T,x,i),c.push(L),h.set(T,L)),L}function w(x){if(--x.usedTimes===0){const T=c.indexOf(x);c[T]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function A(x){o.remove(x)}function C(){o.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:E,acquireProgram:M,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:C}}function q1(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function $1(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Mp(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Sp(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,p,_,m,g){let b=s[e];return b===void 0?(b={id:d.id,object:d,geometry:f,material:p,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:m,group:g},s[e]=b):(b.id=d.id,b.object=d,b.geometry=f,b.material=p,b.materialVariant=a(d),b.groupOrder=_,b.renderOrder=d.renderOrder,b.z=m,b.group=g),e++,b}function l(d,f,p,_,m,g){const b=o(d,f,p,_,m,g);p.transmission>0?n.push(b):p.transparent===!0?i.push(b):t.push(b)}function c(d,f,p,_,m,g){const b=o(d,f,p,_,m,g);p.transmission>0?n.unshift(b):p.transparent===!0?i.unshift(b):t.unshift(b)}function h(d,f,p){t.length>1&&t.sort(d||$1),n.length>1&&n.sort(f||Mp),i.length>1&&i.sort(f||Mp),p&&(t.reverse(),n.reverse(),i.reverse())}function u(){for(let d=e,f=s.length;d<f;d++){const p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:u,sort:h}}function K1(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Sp,s.set(n,[a])):i>=r.length?(a=new Sp,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Y1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new S,color:new te};break;case"SpotLight":t={position:new S,direction:new S,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new S,color:new te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new S,skyColor:new te,groundColor:new te};break;case"RectAreaLight":t={color:new te,position:new S,halfWidth:new S,halfHeight:new S};break}return s[e.id]=t,t}}}function Z1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Q1=0;function J1(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function j1(s){const e=new Y1,t=Z1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new S);const i=new S,r=new ye,a=new ye;function o(c){let h=0,u=0,d=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,p=0,_=0,m=0,g=0,b=0,E=0,M=0,w=0,A=0,C=0;c.sort(J1);for(let T=0,L=c.length;T<L;T++){const P=c[T],I=P.color,k=P.intensity,q=P.distance;let O=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===js?O=P.shadow.map.texture:O=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=I.r*k,u+=I.g*k,d+=I.b*k;else if(P.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(P.sh.coefficients[X],k);C++}else if(P.isDirectionalLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const B=P.shadow,Q=t.get(P);Q.shadowIntensity=B.intensity,Q.shadowBias=B.bias,Q.shadowNormalBias=B.normalBias,Q.shadowRadius=B.radius,Q.shadowMapSize=B.mapSize,n.directionalShadow[f]=Q,n.directionalShadowMap[f]=O,n.directionalShadowMatrix[f]=P.shadow.matrix,b++}n.directional[f]=X,f++}else if(P.isSpotLight){const X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(I).multiplyScalar(k),X.distance=q,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,n.spot[_]=X;const B=P.shadow;if(P.map&&(n.spotLightMap[w]=P.map,w++,B.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[_]=B.matrix,P.castShadow){const Q=t.get(P);Q.shadowIntensity=B.intensity,Q.shadowBias=B.bias,Q.shadowNormalBias=B.normalBias,Q.shadowRadius=B.radius,Q.shadowMapSize=B.mapSize,n.spotShadow[_]=Q,n.spotShadowMap[_]=O,M++}_++}else if(P.isRectAreaLight){const X=e.get(P);X.color.copy(I).multiplyScalar(k),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=X,m++}else if(P.isPointLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){const B=P.shadow,Q=t.get(P);Q.shadowIntensity=B.intensity,Q.shadowBias=B.bias,Q.shadowNormalBias=B.normalBias,Q.shadowRadius=B.radius,Q.shadowMapSize=B.mapSize,Q.shadowCameraNear=B.camera.near,Q.shadowCameraFar=B.camera.far,n.pointShadow[p]=Q,n.pointShadowMap[p]=O,n.pointShadowMatrix[p]=P.shadow.matrix,E++}n.point[p]=X,p++}else if(P.isHemisphereLight){const X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(k),X.groundColor.copy(P.groundColor).multiplyScalar(k),n.hemi[g]=X,g++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const x=n.hash;(x.directionalLength!==f||x.pointLength!==p||x.spotLength!==_||x.rectAreaLength!==m||x.hemiLength!==g||x.numDirectionalShadows!==b||x.numPointShadows!==E||x.numSpotShadows!==M||x.numSpotMaps!==w||x.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=p,n.hemi.length=g,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=M+w-A,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,x.directionalLength=f,x.pointLength=p,x.spotLength=_,x.rectAreaLength=m,x.hemiLength=g,x.numDirectionalShadows=b,x.numPointShadows=E,x.numSpotShadows=M,x.numSpotMaps=w,x.numLightProbes=C,n.version=Q1++)}function l(c,h){let u=0,d=0,f=0,p=0,_=0;const m=h.matrixWorldInverse;for(let g=0,b=c.length;g<b;g++){const E=c[g];if(E.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),u++}else if(E.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const M=n.rectArea[p];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),p++}else if(E.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function yp(s){const e=new j1(s),t=[],n=[],i=[];function r(d){u.camera=d,t.length=0,n.length=0,i.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){i.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function eb(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new yp(s),e.set(i,[o])):r>=a.length?(o=new yp(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const tb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nb=`uniform sampler2D shadow_pass;
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
}`,ib=[new S(1,0,0),new S(-1,0,0),new S(0,1,0),new S(0,-1,0),new S(0,0,1),new S(0,0,-1)],sb=[new S(0,-1,0),new S(0,-1,0),new S(0,0,1),new S(0,0,-1),new S(0,-1,0),new S(0,-1,0)],bp=new ye,Ea=new S,uh=new S;function rb(s,e,t){let n=new Cd;const i=new Se,r=new Se,a=new ft,o=new Hv,l=new Gv,c={},h=t.maxTextureSize,u={[Gn]:sn,[sn]:Gn,[Kt]:Kt},d=new Et({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:tb,fragmentShader:nb}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new xt;p.setAttribute("position",new at(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Me(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ha;let g=this.type;this.render=function(A,C,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===p_&&(Re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ha);const T=s.getRenderTarget(),L=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),I=s.state;I.setBlending(nn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const k=g!==this.type;k&&C.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(O=>O.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,O=A.length;q<O;q++){const X=A[q],B=X.shadow;if(B===void 0){Re("WebGLShadowMap:",X,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;i.copy(B.mapSize);const Q=B.getFrameExtents();i.multiply(Q),r.copy(B.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Q.x),i.x=r.x*Q.x,B.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Q.y),i.y=r.y*Q.y,B.mapSize.y=r.y));const J=s.state.buffers.depth.getReversed();if(B.camera._reversedDepth=J,B.map===null||k===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===ka){if(X.isPointLight){Re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new hn(i.x,i.y,{format:js,type:cn,minFilter:Pt,magFilter:Pt,generateMipmaps:!1}),B.map.texture.name=X.name+".shadowMap",B.map.depthTexture=new tr(i.x,i.y,Vn),B.map.depthTexture.name=X.name+".shadowMapDepth",B.map.depthTexture.format=Qi,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Ht,B.map.depthTexture.magFilter=Ht}else X.isPointLight?(B.map=new Od(i.x),B.map.depthTexture=new Ov(i.x,Ei)):(B.map=new hn(i.x,i.y),B.map.depthTexture=new tr(i.x,i.y,Ei)),B.map.depthTexture.name=X.name+".shadowMap",B.map.depthTexture.format=Qi,this.type===Ha?(B.map.depthTexture.compareFunction=J?bd:yd,B.map.depthTexture.minFilter=Pt,B.map.depthTexture.magFilter=Pt):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Ht,B.map.depthTexture.magFilter=Ht);B.camera.updateProjectionMatrix()}const re=B.map.isWebGLCubeRenderTarget?6:1;for(let le=0;le<re;le++){if(B.map.isWebGLCubeRenderTarget)s.setRenderTarget(B.map,le),s.clear();else{le===0&&(s.setRenderTarget(B.map),s.clear());const ge=B.getViewport(le);a.set(r.x*ge.x,r.y*ge.y,r.x*ge.z,r.y*ge.w),I.viewport(a)}if(X.isPointLight){const ge=B.camera,Je=B.matrix,pt=X.distance||ge.far;pt!==ge.far&&(ge.far=pt,ge.updateProjectionMatrix()),Ea.setFromMatrixPosition(X.matrixWorld),ge.position.copy(Ea),uh.copy(ge.position),uh.add(ib[le]),ge.up.copy(sb[le]),ge.lookAt(uh),ge.updateMatrixWorld(),Je.makeTranslation(-Ea.x,-Ea.y,-Ea.z),bp.multiplyMatrices(ge.projectionMatrix,ge.matrixWorldInverse),B._frustum.setFromProjectionMatrix(bp,ge.coordinateSystem,ge.reversedDepth)}else B.updateMatrices(X);n=B.getFrustum(),M(C,x,B.camera,X,this.type)}B.isPointLightShadow!==!0&&this.type===ka&&b(B,x),B.needsUpdate=!1}g=this.type,m.needsUpdate=!1,s.setRenderTarget(T,L,P)};function b(A,C){const x=e.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new hn(i.x,i.y,{format:js,type:cn})),d.uniforms.shadow_pass.value=A.map.depthTexture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(C,null,x,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(C,null,x,f,_,null)}function E(A,C,x,T){let L=null;const P=x.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)L=P;else if(L=x.isPointLight===!0?l:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const I=L.uuid,k=C.uuid;let q=c[I];q===void 0&&(q={},c[I]=q);let O=q[k];O===void 0&&(O=L.clone(),q[k]=O,C.addEventListener("dispose",w)),L=O}if(L.visible=C.visible,L.wireframe=C.wireframe,T===ka?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:u[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,x.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const I=s.properties.get(L);I.light=x}return L}function M(A,C,x,T,L){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&L===ka)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,A.matrixWorld);const k=e.update(A),q=A.material;if(Array.isArray(q)){const O=k.groups;for(let X=0,B=O.length;X<B;X++){const Q=O[X],J=q[Q.materialIndex];if(J&&J.visible){const re=E(A,J,T,L);A.onBeforeShadow(s,A,C,x,k,re,Q),s.renderBufferDirect(x,null,k,re,A,Q),A.onAfterShadow(s,A,C,x,k,re,Q)}}}else if(q.visible){const O=E(A,q,T,L);A.onBeforeShadow(s,A,C,x,k,O,null),s.renderBufferDirect(x,null,k,O,A,null),A.onAfterShadow(s,A,C,x,k,O,null)}}const I=A.children;for(let k=0,q=I.length;k<q;k++)M(I[k],C,x,T,L)}function w(A){A.target.removeEventListener("dispose",w);for(const x in c){const T=c[x],L=A.target.uuid;L in T&&(T[L].dispose(),delete T[L])}}}function ab(s,e){function t(){let D=!1;const he=new ft;let Z=null;const ue=new ft(0,0,0,0);return{setMask:function(me){Z!==me&&!D&&(s.colorMask(me,me,me,me),Z=me)},setLocked:function(me){D=me},setClear:function(me,j,Ae,be,Dt){Dt===!0&&(me*=be,j*=be,Ae*=be),he.set(me,j,Ae,be),ue.equals(he)===!1&&(s.clearColor(me,j,Ae,be),ue.copy(he))},reset:function(){D=!1,Z=null,ue.set(-1,0,0,0)}}}function n(){let D=!1,he=!1,Z=null,ue=null,me=null;return{setReversed:function(j){if(he!==j){const Ae=e.get("EXT_clip_control");j?Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.ZERO_TO_ONE_EXT):Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.NEGATIVE_ONE_TO_ONE_EXT),he=j;const be=me;me=null,this.setClear(be)}},getReversed:function(){return he},setTest:function(j){j?ee(s.DEPTH_TEST):Ie(s.DEPTH_TEST)},setMask:function(j){Z!==j&&!D&&(s.depthMask(j),Z=j)},setFunc:function(j){if(he&&(j=$_[j]),ue!==j){switch(j){case uu:s.depthFunc(s.NEVER);break;case du:s.depthFunc(s.ALWAYS);break;case fu:s.depthFunc(s.LESS);break;case Kr:s.depthFunc(s.LEQUAL);break;case pu:s.depthFunc(s.EQUAL);break;case mu:s.depthFunc(s.GEQUAL);break;case gu:s.depthFunc(s.GREATER);break;case _u:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ue=j}},setLocked:function(j){D=j},setClear:function(j){me!==j&&(me=j,he&&(j=1-j),s.clearDepth(j))},reset:function(){D=!1,Z=null,ue=null,me=null,he=!1}}}function i(){let D=!1,he=null,Z=null,ue=null,me=null,j=null,Ae=null,be=null,Dt=null;return{setTest:function(St){D||(St?ee(s.STENCIL_TEST):Ie(s.STENCIL_TEST))},setMask:function(St){he!==St&&!D&&(s.stencilMask(St),he=St)},setFunc:function(St,ai,oi){(Z!==St||ue!==ai||me!==oi)&&(s.stencilFunc(St,ai,oi),Z=St,ue=ai,me=oi)},setOp:function(St,ai,oi){(j!==St||Ae!==ai||be!==oi)&&(s.stencilOp(St,ai,oi),j=St,Ae=ai,be=oi)},setLocked:function(St){D=St},setClear:function(St){Dt!==St&&(s.clearStencil(St),Dt=St)},reset:function(){D=!1,he=null,Z=null,ue=null,me=null,j=null,Ae=null,be=null,Dt=null}}}const r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d={},f=new WeakMap,p=[],_=null,m=!1,g=null,b=null,E=null,M=null,w=null,A=null,C=null,x=new te(0,0,0),T=0,L=!1,P=null,I=null,k=null,q=null,O=null;const X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,Q=0;const J=s.getParameter(s.VERSION);J.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(J)[1]),B=Q>=1):J.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),B=Q>=2);let re=null,le={};const ge=s.getParameter(s.SCISSOR_BOX),Je=s.getParameter(s.VIEWPORT),pt=new ft().fromArray(ge),je=new ft().fromArray(Je);function K(D,he,Z,ue){const me=new Uint8Array(4),j=s.createTexture();s.bindTexture(D,j),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ae=0;Ae<Z;Ae++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(he,0,s.RGBA,1,1,ue,0,s.RGBA,s.UNSIGNED_BYTE,me):s.texImage2D(he+Ae,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,me);return j}const ie={};ie[s.TEXTURE_2D]=K(s.TEXTURE_2D,s.TEXTURE_2D,1),ie[s.TEXTURE_CUBE_MAP]=K(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[s.TEXTURE_2D_ARRAY]=K(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ie[s.TEXTURE_3D]=K(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(s.DEPTH_TEST),a.setFunc(Kr),Tt(!1),Rt(af),ee(s.CULL_FACE),et(nn);function ee(D){h[D]!==!0&&(s.enable(D),h[D]=!0)}function Ie(D){h[D]!==!1&&(s.disable(D),h[D]=!1)}function Ne(D,he){return d[D]!==he?(s.bindFramebuffer(D,he),d[D]=he,D===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=he),D===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=he),!0):!1}function De(D,he){let Z=p,ue=!1;if(D){Z=f.get(he),Z===void 0&&(Z=[],f.set(he,Z));const me=D.textures;if(Z.length!==me.length||Z[0]!==s.COLOR_ATTACHMENT0){for(let j=0,Ae=me.length;j<Ae;j++)Z[j]=s.COLOR_ATTACHMENT0+j;Z.length=me.length,ue=!0}}else Z[0]!==s.BACK&&(Z[0]=s.BACK,ue=!0);ue&&s.drawBuffers(Z)}function bt(D){return _!==D?(s.useProgram(D),_=D,!0):!1}const He={[Qn]:s.FUNC_ADD,[m_]:s.FUNC_SUBTRACT,[g_]:s.FUNC_REVERSE_SUBTRACT};He[__]=s.MIN,He[v_]=s.MAX;const ot={[Ba]:s.ZERO,[x_]:s.ONE,[M_]:s.SRC_COLOR,[ou]:s.SRC_ALPHA,[E_]:s.SRC_ALPHA_SATURATE,[hu]:s.DST_COLOR,[cu]:s.DST_ALPHA,[S_]:s.ONE_MINUS_SRC_COLOR,[lu]:s.ONE_MINUS_SRC_ALPHA,[b_]:s.ONE_MINUS_DST_COLOR,[y_]:s.ONE_MINUS_DST_ALPHA,[T_]:s.CONSTANT_COLOR,[w_]:s.ONE_MINUS_CONSTANT_COLOR,[A_]:s.CONSTANT_ALPHA,[R_]:s.ONE_MINUS_CONSTANT_ALPHA};function et(D,he,Z,ue,me,j,Ae,be,Dt,St){if(D===nn){m===!0&&(Ie(s.BLEND),m=!1);return}if(m===!1&&(ee(s.BLEND),m=!0),D!==K0){if(D!==g||St!==L){if((b!==Qn||w!==Qn)&&(s.blendEquation(s.FUNC_ADD),b=Qn,w=Qn),St)switch(D){case Wr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case qt:s.blendFunc(s.ONE,s.ONE);break;case of:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case lf:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Oe("WebGLState: Invalid blending: ",D);break}else switch(D){case Wr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case qt:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case of:Oe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lf:Oe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Oe("WebGLState: Invalid blending: ",D);break}E=null,M=null,A=null,C=null,x.set(0,0,0),T=0,g=D,L=St}return}me=me||he,j=j||Z,Ae=Ae||ue,(he!==b||me!==w)&&(s.blendEquationSeparate(He[he],He[me]),b=he,w=me),(Z!==E||ue!==M||j!==A||Ae!==C)&&(s.blendFuncSeparate(ot[Z],ot[ue],ot[j],ot[Ae]),E=Z,M=ue,A=j,C=Ae),(be.equals(x)===!1||Dt!==T)&&(s.blendColor(be.r,be.g,be.b,Dt),x.copy(be),T=Dt),g=D,L=!1}function Ye(D,he){D.side===Kt?Ie(s.CULL_FACE):ee(s.CULL_FACE);let Z=D.side===sn;he&&(Z=!Z),Tt(Z),D.blending===Wr&&D.transparent===!1?et(nn):et(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const ue=D.stencilWrite;o.setTest(ue),ue&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),kt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ee(s.SAMPLE_ALPHA_TO_COVERAGE):Ie(s.SAMPLE_ALPHA_TO_COVERAGE)}function Tt(D){P!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),P=D)}function Rt(D){D!==d_?(ee(s.CULL_FACE),D!==I&&(D===af?s.cullFace(s.BACK):D===f_?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ie(s.CULL_FACE),I=D}function It(D){D!==k&&(B&&s.lineWidth(D),k=D)}function kt(D,he,Z){D?(ee(s.POLYGON_OFFSET_FILL),(q!==he||O!==Z)&&(q=he,O=Z,a.getReversed()&&(he=-he),s.polygonOffset(he,Z))):Ie(s.POLYGON_OFFSET_FILL)}function Mt(D){D?ee(s.SCISSOR_TEST):Ie(s.SCISSOR_TEST)}function wt(D){D===void 0&&(D=s.TEXTURE0+X-1),re!==D&&(s.activeTexture(D),re=D)}function N(D,he,Z){Z===void 0&&(re===null?Z=s.TEXTURE0+X-1:Z=re);let ue=le[Z];ue===void 0&&(ue={type:void 0,texture:void 0},le[Z]=ue),(ue.type!==D||ue.texture!==he)&&(re!==Z&&(s.activeTexture(Z),re=Z),s.bindTexture(D,he||ie[D]),ue.type=D,ue.texture=he)}function jt(){const D=le[re];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function it(){try{s.compressedTexImage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function R(){try{s.compressedTexImage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function v(){try{s.texSubImage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function F(){try{s.texSubImage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function z(){try{s.compressedTexSubImage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function W(){try{s.compressedTexSubImage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function ne(){try{s.texStorage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function oe(){try{s.texStorage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function $(){try{s.texImage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function Y(){try{s.texImage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function ce(D){return u[D]!==void 0?u[D]:s.getParameter(D)}function we(D,he){u[D]!==he&&(s.pixelStorei(D,he),u[D]=he)}function ae(D){pt.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),pt.copy(D))}function se(D){je.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),je.copy(D))}function Ee(D,he){let Z=c.get(he);Z===void 0&&(Z=new WeakMap,c.set(he,Z));let ue=Z.get(D);ue===void 0&&(ue=s.getUniformBlockIndex(he,D.name),Z.set(D,ue))}function Pe(D,he){const ue=c.get(he).get(D);l.get(he)!==ue&&(s.uniformBlockBinding(he,ue,D.__bindingPointIndex),l.set(he,ue))}function ke(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},re=null,le={},d={},f=new WeakMap,p=[],_=null,m=!1,g=null,b=null,E=null,M=null,w=null,A=null,C=null,x=new te(0,0,0),T=0,L=!1,P=null,I=null,k=null,q=null,O=null,pt.set(0,0,s.canvas.width,s.canvas.height),je.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ee,disable:Ie,bindFramebuffer:Ne,drawBuffers:De,useProgram:bt,setBlending:et,setMaterial:Ye,setFlipSided:Tt,setCullFace:Rt,setLineWidth:It,setPolygonOffset:kt,setScissorTest:Mt,activeTexture:wt,bindTexture:N,unbindTexture:jt,compressedTexImage2D:it,compressedTexImage3D:R,texImage2D:$,texImage3D:Y,pixelStorei:we,getParameter:ce,updateUBOMapping:Ee,uniformBlockBinding:Pe,texStorage2D:ne,texStorage3D:oe,texSubImage2D:v,texSubImage3D:F,compressedTexSubImage2D:z,compressedTexSubImage3D:W,scissor:ae,viewport:se,reset:ke}}function ob(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Se,h=new WeakMap,u=new Set;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,v){return p?new OffscreenCanvas(R,v):Za("canvas")}function m(R,v,F){let z=1;const W=it(R);if((W.width>F||W.height>F)&&(z=F/Math.max(W.width,W.height)),z<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ne=Math.floor(z*W.width),oe=Math.floor(z*W.height);d===void 0&&(d=_(ne,oe));const $=v?_(ne,oe):d;return $.width=ne,$.height=oe,$.getContext("2d").drawImage(R,0,0,ne,oe),Re("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+ne+"x"+oe+")."),$}else return"data"in R&&Re("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),R;return R}function g(R){return R.generateMipmaps}function b(R){s.generateMipmap(R)}function E(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(R,v,F,z,W,ne=!1){if(R!==null){if(s[R]!==void 0)return s[R];Re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let oe;z&&(oe=e.get("EXT_texture_norm16"),oe||Re("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=v;if(v===s.RED&&(F===s.FLOAT&&($=s.R32F),F===s.HALF_FLOAT&&($=s.R16F),F===s.UNSIGNED_BYTE&&($=s.R8),F===s.UNSIGNED_SHORT&&oe&&($=oe.R16_EXT),F===s.SHORT&&oe&&($=oe.R16_SNORM_EXT)),v===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&($=s.R8UI),F===s.UNSIGNED_SHORT&&($=s.R16UI),F===s.UNSIGNED_INT&&($=s.R32UI),F===s.BYTE&&($=s.R8I),F===s.SHORT&&($=s.R16I),F===s.INT&&($=s.R32I)),v===s.RG&&(F===s.FLOAT&&($=s.RG32F),F===s.HALF_FLOAT&&($=s.RG16F),F===s.UNSIGNED_BYTE&&($=s.RG8),F===s.UNSIGNED_SHORT&&oe&&($=oe.RG16_EXT),F===s.SHORT&&oe&&($=oe.RG16_SNORM_EXT)),v===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&($=s.RG8UI),F===s.UNSIGNED_SHORT&&($=s.RG16UI),F===s.UNSIGNED_INT&&($=s.RG32UI),F===s.BYTE&&($=s.RG8I),F===s.SHORT&&($=s.RG16I),F===s.INT&&($=s.RG32I)),v===s.RGB_INTEGER&&(F===s.UNSIGNED_BYTE&&($=s.RGB8UI),F===s.UNSIGNED_SHORT&&($=s.RGB16UI),F===s.UNSIGNED_INT&&($=s.RGB32UI),F===s.BYTE&&($=s.RGB8I),F===s.SHORT&&($=s.RGB16I),F===s.INT&&($=s.RGB32I)),v===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&($=s.RGBA8UI),F===s.UNSIGNED_SHORT&&($=s.RGBA16UI),F===s.UNSIGNED_INT&&($=s.RGBA32UI),F===s.BYTE&&($=s.RGBA8I),F===s.SHORT&&($=s.RGBA16I),F===s.INT&&($=s.RGBA32I)),v===s.RGB&&(F===s.UNSIGNED_SHORT&&oe&&($=oe.RGB16_EXT),F===s.SHORT&&oe&&($=oe.RGB16_SNORM_EXT),F===s.UNSIGNED_INT_5_9_9_9_REV&&($=s.RGB9_E5),F===s.UNSIGNED_INT_10F_11F_11F_REV&&($=s.R11F_G11F_B10F)),v===s.RGBA){const Y=ne?tc:$e.getTransfer(W);F===s.FLOAT&&($=s.RGBA32F),F===s.HALF_FLOAT&&($=s.RGBA16F),F===s.UNSIGNED_BYTE&&($=Y===ct?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT&&oe&&($=oe.RGBA16_EXT),F===s.SHORT&&oe&&($=oe.RGBA16_SNORM_EXT),F===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function w(R,v){let F;return R?v===null||v===Ei||v===Zr?F=s.DEPTH24_STENCIL8:v===Vn?F=s.DEPTH32F_STENCIL8:v===qa&&(F=s.DEPTH24_STENCIL8,Re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ei||v===Zr?F=s.DEPTH_COMPONENT24:v===Vn?F=s.DEPTH_COMPONENT32F:v===qa&&(F=s.DEPTH_COMPONENT16),F}function A(R,v){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ht&&R.minFilter!==Pt?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function C(R){const v=R.target;v.removeEventListener("dispose",C),T(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&u.delete(v)}function x(R){const v=R.target;v.removeEventListener("dispose",x),P(v)}function T(R){const v=n.get(R);if(v.__webglInit===void 0)return;const F=R.source,z=f.get(F);if(z){const W=z[v.__cacheKey];W.usedTimes--,W.usedTimes===0&&L(R),Object.keys(z).length===0&&f.delete(F)}n.remove(R)}function L(R){const v=n.get(R);s.deleteTexture(v.__webglTexture);const F=R.source,z=f.get(F);delete z[v.__cacheKey],a.memory.textures--}function P(R){const v=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(v.__webglFramebuffer[z]))for(let W=0;W<v.__webglFramebuffer[z].length;W++)s.deleteFramebuffer(v.__webglFramebuffer[z][W]);else s.deleteFramebuffer(v.__webglFramebuffer[z]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[z])}else{if(Array.isArray(v.__webglFramebuffer))for(let z=0;z<v.__webglFramebuffer.length;z++)s.deleteFramebuffer(v.__webglFramebuffer[z]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let z=0;z<v.__webglColorRenderbuffer.length;z++)v.__webglColorRenderbuffer[z]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[z]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const F=R.textures;for(let z=0,W=F.length;z<W;z++){const ne=n.get(F[z]);ne.__webglTexture&&(s.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(F[z])}n.remove(R)}let I=0;function k(){I=0}function q(){return I}function O(R){I=R}function X(){const R=I;return R>=i.maxTextures&&Re("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),I+=1,R}function B(R){const v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function Q(R,v){const F=n.get(R);if(R.isVideoTexture&&N(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&F.__version!==R.version){const z=R.image;if(z===null)Re("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)Re("WebGLRenderer: Texture marked for update but image is incomplete");else{Ie(F,R,v);return}}else R.isExternalTexture&&(F.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+v)}function J(R,v){const F=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&F.__version!==R.version){Ie(F,R,v);return}else R.isExternalTexture&&(F.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+v)}function re(R,v){const F=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&F.__version!==R.version){Ie(F,R,v);return}t.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+v)}function le(R,v){const F=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&F.__version!==R.version){Ne(F,R,v);return}t.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+v)}const ge={[Wn]:s.REPEAT,[Mi]:s.CLAMP_TO_EDGE,[Ql]:s.MIRRORED_REPEAT},Je={[Ht]:s.NEAREST,[Q0]:s.NEAREST_MIPMAP_NEAREST,[za]:s.NEAREST_MIPMAP_LINEAR,[Pt]:s.LINEAR,[Hl]:s.LINEAR_MIPMAP_NEAREST,[$i]:s.LINEAR_MIPMAP_LINEAR},pt={[F_]:s.NEVER,[V_]:s.ALWAYS,[O_]:s.LESS,[yd]:s.LEQUAL,[k_]:s.EQUAL,[bd]:s.GEQUAL,[B_]:s.GREATER,[z_]:s.NOTEQUAL};function je(R,v){if(v.type===Vn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Pt||v.magFilter===Hl||v.magFilter===za||v.magFilter===$i||v.minFilter===Pt||v.minFilter===Hl||v.minFilter===za||v.minFilter===$i)&&Re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,ge[v.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,ge[v.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,ge[v.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,Je[v.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,Je[v.minFilter]),v.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,pt[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ht||v.minFilter!==za&&v.minFilter!==$i||v.type===Vn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");s.texParameterf(R,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function K(R,v){let F=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",C));const z=v.source;let W=f.get(z);W===void 0&&(W={},f.set(z,W));const ne=B(v);if(ne!==R.__cacheKey){W[ne]===void 0&&(W[ne]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,F=!0),W[ne].usedTimes++;const oe=W[R.__cacheKey];oe!==void 0&&(W[R.__cacheKey].usedTimes--,oe.usedTimes===0&&L(v)),R.__cacheKey=ne,R.__webglTexture=W[ne].texture}return F}function ie(R,v,F){return Math.floor(Math.floor(R/F)/v)}function ee(R,v,F,z){const ne=R.updateRanges;if(ne.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,v.width,v.height,F,z,v.data);else{ne.sort((we,ae)=>we.start-ae.start);let oe=0;for(let we=1;we<ne.length;we++){const ae=ne[oe],se=ne[we],Ee=ae.start+ae.count,Pe=ie(se.start,v.width,4),ke=ie(ae.start,v.width,4);se.start<=Ee+1&&Pe===ke&&ie(se.start+se.count-1,v.width,4)===Pe?ae.count=Math.max(ae.count,se.start+se.count-ae.start):(++oe,ne[oe]=se)}ne.length=oe+1;const $=t.getParameter(s.UNPACK_ROW_LENGTH),Y=t.getParameter(s.UNPACK_SKIP_PIXELS),ce=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,v.width);for(let we=0,ae=ne.length;we<ae;we++){const se=ne[we],Ee=Math.floor(se.start/4),Pe=Math.ceil(se.count/4),ke=Ee%v.width,D=Math.floor(Ee/v.width),he=Pe,Z=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,ke),t.pixelStorei(s.UNPACK_SKIP_ROWS,D),t.texSubImage2D(s.TEXTURE_2D,0,ke,D,he,Z,F,z,v.data)}R.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,$),t.pixelStorei(s.UNPACK_SKIP_PIXELS,Y),t.pixelStorei(s.UNPACK_SKIP_ROWS,ce)}}function Ie(R,v,F){let z=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(z=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(z=s.TEXTURE_3D);const W=K(R,v),ne=v.source;t.bindTexture(z,R.__webglTexture,s.TEXTURE0+F);const oe=n.get(ne);if(ne.version!==oe.__version||W===!0){if(t.activeTexture(s.TEXTURE0+F),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const Z=$e.getPrimaries($e.workingColorSpace),ue=v.colorSpace===ms?null:$e.getPrimaries(v.colorSpace),me=v.colorSpace===ms||Z===ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment);let Y=m(v.image,!1,i.maxTextureSize);Y=jt(v,Y);const ce=r.convert(v.format,v.colorSpace),we=r.convert(v.type);let ae=M(v.internalFormat,ce,we,v.normalized,v.colorSpace,v.isVideoTexture);je(z,v);let se;const Ee=v.mipmaps,Pe=v.isVideoTexture!==!0,ke=oe.__version===void 0||W===!0,D=ne.dataReady,he=A(v,Y);if(v.isDepthTexture)ae=w(v.format===_s,v.type),ke&&(Pe?t.texStorage2D(s.TEXTURE_2D,1,ae,Y.width,Y.height):t.texImage2D(s.TEXTURE_2D,0,ae,Y.width,Y.height,0,ce,we,null));else if(v.isDataTexture)if(Ee.length>0){Pe&&ke&&t.texStorage2D(s.TEXTURE_2D,he,ae,Ee[0].width,Ee[0].height);for(let Z=0,ue=Ee.length;Z<ue;Z++)se=Ee[Z],Pe?D&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,se.width,se.height,ce,we,se.data):t.texImage2D(s.TEXTURE_2D,Z,ae,se.width,se.height,0,ce,we,se.data);v.generateMipmaps=!1}else Pe?(ke&&t.texStorage2D(s.TEXTURE_2D,he,ae,Y.width,Y.height),D&&ee(v,Y,ce,we)):t.texImage2D(s.TEXTURE_2D,0,ae,Y.width,Y.height,0,ce,we,Y.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Pe&&ke&&t.texStorage3D(s.TEXTURE_2D_ARRAY,he,ae,Ee[0].width,Ee[0].height,Y.depth);for(let Z=0,ue=Ee.length;Z<ue;Z++)if(se=Ee[Z],v.format!==Ln)if(ce!==null)if(Pe){if(D)if(v.layerUpdates.size>0){const me=tp(se.width,se.height,v.format,v.type);for(const j of v.layerUpdates){const Ae=se.data.subarray(j*me/se.data.BYTES_PER_ELEMENT,(j+1)*me/se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,j,se.width,se.height,1,ce,Ae)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,se.width,se.height,Y.depth,ce,se.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Z,ae,se.width,se.height,Y.depth,0,se.data,0,0);else Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?D&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,se.width,se.height,Y.depth,ce,we,se.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Z,ae,se.width,se.height,Y.depth,0,ce,we,se.data)}else{Pe&&ke&&t.texStorage2D(s.TEXTURE_2D,he,ae,Ee[0].width,Ee[0].height);for(let Z=0,ue=Ee.length;Z<ue;Z++)se=Ee[Z],v.format!==Ln?ce!==null?Pe?D&&t.compressedTexSubImage2D(s.TEXTURE_2D,Z,0,0,se.width,se.height,ce,se.data):t.compressedTexImage2D(s.TEXTURE_2D,Z,ae,se.width,se.height,0,se.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?D&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,se.width,se.height,ce,we,se.data):t.texImage2D(s.TEXTURE_2D,Z,ae,se.width,se.height,0,ce,we,se.data)}else if(v.isDataArrayTexture)if(Pe){if(ke&&t.texStorage3D(s.TEXTURE_2D_ARRAY,he,ae,Y.width,Y.height,Y.depth),D)if(v.layerUpdates.size>0){const Z=tp(Y.width,Y.height,v.format,v.type);for(const ue of v.layerUpdates){const me=Y.data.subarray(ue*Z/Y.data.BYTES_PER_ELEMENT,(ue+1)*Z/Y.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ue,Y.width,Y.height,1,ce,we,me)}v.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,ce,we,Y.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ae,Y.width,Y.height,Y.depth,0,ce,we,Y.data);else if(v.isData3DTexture)Pe?(ke&&t.texStorage3D(s.TEXTURE_3D,he,ae,Y.width,Y.height,Y.depth),D&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,ce,we,Y.data)):t.texImage3D(s.TEXTURE_3D,0,ae,Y.width,Y.height,Y.depth,0,ce,we,Y.data);else if(v.isFramebufferTexture){if(ke)if(Pe)t.texStorage2D(s.TEXTURE_2D,he,ae,Y.width,Y.height);else{let Z=Y.width,ue=Y.height;for(let me=0;me<he;me++)t.texImage2D(s.TEXTURE_2D,me,ae,Z,ue,0,ce,we,null),Z>>=1,ue>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in s){const Z=s.canvas;if(Z.hasAttribute("layoutsubtree")||Z.setAttribute("layoutsubtree","true"),Y.parentNode!==Z){Z.appendChild(Y),u.add(v),Z.onpaint=ue=>{const me=ue.changedElements;for(const j of u)me.includes(j.image)&&(j.needsUpdate=!0)},Z.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,Y);else{const me=s.RGBA,j=s.RGBA,Ae=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,me,j,Ae,Y)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ee.length>0){if(Pe&&ke){const Z=it(Ee[0]);t.texStorage2D(s.TEXTURE_2D,he,ae,Z.width,Z.height)}for(let Z=0,ue=Ee.length;Z<ue;Z++)se=Ee[Z],Pe?D&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,ce,we,se):t.texImage2D(s.TEXTURE_2D,Z,ae,ce,we,se);v.generateMipmaps=!1}else if(Pe){if(ke){const Z=it(Y);t.texStorage2D(s.TEXTURE_2D,he,ae,Z.width,Z.height)}D&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ce,we,Y)}else t.texImage2D(s.TEXTURE_2D,0,ae,ce,we,Y);g(v)&&b(z),oe.__version=ne.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function Ne(R,v,F){if(v.image.length!==6)return;const z=K(R,v),W=v.source;t.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+F);const ne=n.get(W);if(W.version!==ne.__version||z===!0){t.activeTexture(s.TEXTURE0+F);const oe=$e.getPrimaries($e.workingColorSpace),$=v.colorSpace===ms?null:$e.getPrimaries(v.colorSpace),Y=v.colorSpace===ms||oe===$?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);const ce=v.isCompressedTexture||v.image[0].isCompressedTexture,we=v.image[0]&&v.image[0].isDataTexture,ae=[];for(let j=0;j<6;j++)!ce&&!we?ae[j]=m(v.image[j],!0,i.maxCubemapSize):ae[j]=we?v.image[j].image:v.image[j],ae[j]=jt(v,ae[j]);const se=ae[0],Ee=r.convert(v.format,v.colorSpace),Pe=r.convert(v.type),ke=M(v.internalFormat,Ee,Pe,v.normalized,v.colorSpace),D=v.isVideoTexture!==!0,he=ne.__version===void 0||z===!0,Z=W.dataReady;let ue=A(v,se);je(s.TEXTURE_CUBE_MAP,v);let me;if(ce){D&&he&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ue,ke,se.width,se.height);for(let j=0;j<6;j++){me=ae[j].mipmaps;for(let Ae=0;Ae<me.length;Ae++){const be=me[Ae];v.format!==Ln?Ee!==null?D?Z&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae,0,0,be.width,be.height,Ee,be.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae,ke,be.width,be.height,0,be.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae,0,0,be.width,be.height,Ee,Pe,be.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae,ke,be.width,be.height,0,Ee,Pe,be.data)}}}else{if(me=v.mipmaps,D&&he){me.length>0&&ue++;const j=it(ae[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ue,ke,j.width,j.height)}for(let j=0;j<6;j++)if(we){D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ae[j].width,ae[j].height,Ee,Pe,ae[j].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,ke,ae[j].width,ae[j].height,0,Ee,Pe,ae[j].data);for(let Ae=0;Ae<me.length;Ae++){const Dt=me[Ae].image[j].image;D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae+1,0,0,Dt.width,Dt.height,Ee,Pe,Dt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae+1,ke,Dt.width,Dt.height,0,Ee,Pe,Dt.data)}}else{D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ee,Pe,ae[j]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,ke,Ee,Pe,ae[j]);for(let Ae=0;Ae<me.length;Ae++){const be=me[Ae];D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae+1,0,0,Ee,Pe,be.image[j]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ae+1,ke,Ee,Pe,be.image[j])}}}g(v)&&b(s.TEXTURE_CUBE_MAP),ne.__version=W.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function De(R,v,F,z,W,ne){const oe=r.convert(F.format,F.colorSpace),$=r.convert(F.type),Y=M(F.internalFormat,oe,$,F.normalized,F.colorSpace),ce=n.get(v),we=n.get(F);if(we.__renderTarget=v,!ce.__hasExternalTextures){const ae=Math.max(1,v.width>>ne),se=Math.max(1,v.height>>ne);W===s.TEXTURE_3D||W===s.TEXTURE_2D_ARRAY?t.texImage3D(W,ne,Y,ae,se,v.depth,0,oe,$,null):t.texImage2D(W,ne,Y,ae,se,0,oe,$,null)}t.bindFramebuffer(s.FRAMEBUFFER,R),wt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,z,W,we.__webglTexture,0,Mt(v)):(W===s.TEXTURE_2D||W>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,z,W,we.__webglTexture,ne),t.bindFramebuffer(s.FRAMEBUFFER,null)}function bt(R,v,F){if(s.bindRenderbuffer(s.RENDERBUFFER,R),v.depthBuffer){const z=v.depthTexture,W=z&&z.isDepthTexture?z.type:null,ne=w(v.stencilBuffer,W),oe=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;wt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Mt(v),ne,v.width,v.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,Mt(v),ne,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,ne,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,oe,s.RENDERBUFFER,R)}else{const z=v.textures;for(let W=0;W<z.length;W++){const ne=z[W],oe=r.convert(ne.format,ne.colorSpace),$=r.convert(ne.type),Y=M(ne.internalFormat,oe,$,ne.normalized,ne.colorSpace);wt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Mt(v),Y,v.width,v.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,Mt(v),Y,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,Y,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function He(R,v,F){const z=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const W=n.get(v.depthTexture);if(W.__renderTarget=v,(!W.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),z){if(W.__webglInit===void 0&&(W.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),W.__webglTexture===void 0){W.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture),je(s.TEXTURE_CUBE_MAP,v.depthTexture);const ce=r.convert(v.depthTexture.format),we=r.convert(v.depthTexture.type);let ae;v.depthTexture.format===Qi?ae=s.DEPTH_COMPONENT24:v.depthTexture.format===_s&&(ae=s.DEPTH24_STENCIL8);for(let se=0;se<6;se++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,ae,v.width,v.height,0,ce,we,null)}}else Q(v.depthTexture,0);const ne=W.__webglTexture,oe=Mt(v),$=z?s.TEXTURE_CUBE_MAP_POSITIVE_X+F:s.TEXTURE_2D,Y=v.depthTexture.format===_s?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(v.depthTexture.format===Qi)wt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Y,$,ne,0,oe):s.framebufferTexture2D(s.FRAMEBUFFER,Y,$,ne,0);else if(v.depthTexture.format===_s)wt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Y,$,ne,0,oe):s.framebufferTexture2D(s.FRAMEBUFFER,Y,$,ne,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ot(R){const v=n.get(R),F=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){const z=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),z){const W=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,z.removeEventListener("dispose",W)};z.addEventListener("dispose",W),v.__depthDisposeCallback=W}v.__boundDepthTexture=z}if(R.depthTexture&&!v.__autoAllocateDepthBuffer)if(F)for(let z=0;z<6;z++)He(v.__webglFramebuffer[z],R,z);else{const z=R.texture.mipmaps;z&&z.length>0?He(v.__webglFramebuffer[0],R,0):He(v.__webglFramebuffer,R,0)}else if(F){v.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[z]),v.__webglDepthbuffer[z]===void 0)v.__webglDepthbuffer[z]=s.createRenderbuffer(),bt(v.__webglDepthbuffer[z],R,!1);else{const W=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ne=v.__webglDepthbuffer[z];s.bindRenderbuffer(s.RENDERBUFFER,ne),s.framebufferRenderbuffer(s.FRAMEBUFFER,W,s.RENDERBUFFER,ne)}}else{const z=R.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),bt(v.__webglDepthbuffer,R,!1);else{const W=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ne=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ne),s.framebufferRenderbuffer(s.FRAMEBUFFER,W,s.RENDERBUFFER,ne)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function et(R,v,F){const z=n.get(R);v!==void 0&&De(z.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&ot(R)}function Ye(R){const v=R.texture,F=n.get(R),z=n.get(v);R.addEventListener("dispose",x);const W=R.textures,ne=R.isWebGLCubeRenderTarget===!0,oe=W.length>1;if(oe||(z.__webglTexture===void 0&&(z.__webglTexture=s.createTexture()),z.__version=v.version,a.memory.textures++),ne){F.__webglFramebuffer=[];for(let $=0;$<6;$++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[$]=[];for(let Y=0;Y<v.mipmaps.length;Y++)F.__webglFramebuffer[$][Y]=s.createFramebuffer()}else F.__webglFramebuffer[$]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let $=0;$<v.mipmaps.length;$++)F.__webglFramebuffer[$]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(oe)for(let $=0,Y=W.length;$<Y;$++){const ce=n.get(W[$]);ce.__webglTexture===void 0&&(ce.__webglTexture=s.createTexture(),a.memory.textures++)}if(R.samples>0&&wt(R)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let $=0;$<W.length;$++){const Y=W[$];F.__webglColorRenderbuffer[$]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[$]);const ce=r.convert(Y.format,Y.colorSpace),we=r.convert(Y.type),ae=M(Y.internalFormat,ce,we,Y.normalized,Y.colorSpace,R.isXRRenderTarget===!0),se=Mt(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,se,ae,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+$,s.RENDERBUFFER,F.__webglColorRenderbuffer[$])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),bt(F.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ne){t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture),je(s.TEXTURE_CUBE_MAP,v);for(let $=0;$<6;$++)if(v.mipmaps&&v.mipmaps.length>0)for(let Y=0;Y<v.mipmaps.length;Y++)De(F.__webglFramebuffer[$][Y],R,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Y);else De(F.__webglFramebuffer[$],R,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);g(v)&&b(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let $=0,Y=W.length;$<Y;$++){const ce=W[$],we=n.get(ce);let ae=s.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ae=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ae,we.__webglTexture),je(ae,ce),De(F.__webglFramebuffer,R,ce,s.COLOR_ATTACHMENT0+$,ae,0),g(ce)&&b(ae)}t.unbindTexture()}else{let $=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&($=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture($,z.__webglTexture),je($,v),v.mipmaps&&v.mipmaps.length>0)for(let Y=0;Y<v.mipmaps.length;Y++)De(F.__webglFramebuffer[Y],R,v,s.COLOR_ATTACHMENT0,$,Y);else De(F.__webglFramebuffer,R,v,s.COLOR_ATTACHMENT0,$,0);g(v)&&b($),t.unbindTexture()}R.depthBuffer&&ot(R)}function Tt(R){const v=R.textures;for(let F=0,z=v.length;F<z;F++){const W=v[F];if(g(W)){const ne=E(R),oe=n.get(W).__webglTexture;t.bindTexture(ne,oe),b(ne),t.unbindTexture()}}}const Rt=[],It=[];function kt(R){if(R.samples>0){if(wt(R)===!1){const v=R.textures,F=R.width,z=R.height;let W=s.COLOR_BUFFER_BIT;const ne=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,oe=n.get(R),$=v.length>1;if($)for(let ce=0;ce<v.length;ce++)t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ce,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ce,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const Y=R.texture.mipmaps;Y&&Y.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let ce=0;ce<v.length;ce++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(W|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(W|=s.STENCIL_BUFFER_BIT)),$){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,oe.__webglColorRenderbuffer[ce]);const we=n.get(v[ce]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,we,0)}s.blitFramebuffer(0,0,F,z,0,0,F,z,W,s.NEAREST),l===!0&&(Rt.length=0,It.length=0,Rt.push(s.COLOR_ATTACHMENT0+ce),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Rt.push(ne),It.push(ne),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,It)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Rt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),$)for(let ce=0;ce<v.length;ce++){t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ce,s.RENDERBUFFER,oe.__webglColorRenderbuffer[ce]);const we=n.get(v[ce]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ce,s.TEXTURE_2D,we,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const v=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function Mt(R){return Math.min(i.maxSamples,R.samples)}function wt(R){const v=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function N(R){const v=a.render.frame;h.get(R)!==v&&(h.set(R,v),R.update())}function jt(R,v){const F=R.colorSpace,z=R.format,W=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||F!==Nn&&F!==ms&&($e.getTransfer(F)===ct?(z!==Ln||W!==bn)&&Re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Oe("WebGLTextures: Unsupported texture color space:",F)),v}function it(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=k,this.getTextureUnits=q,this.setTextureUnits=O,this.setTexture2D=Q,this.setTexture2DArray=J,this.setTexture3D=re,this.setTextureCube=le,this.rebindTextures=et,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=Tt,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=ot,this.setupFrameBufferTexture=De,this.useMultisampledRTT=wt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function lb(s,e){function t(n,i=ms){let r;const a=$e.getTransfer(i);if(n===bn)return s.UNSIGNED_BYTE;if(n===gd)return s.UNSIGNED_SHORT_4_4_4_4;if(n===_d)return s.UNSIGNED_SHORT_5_5_5_1;if(n===eg)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===tg)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===J0)return s.BYTE;if(n===j0)return s.SHORT;if(n===qa)return s.UNSIGNED_SHORT;if(n===md)return s.INT;if(n===Ei)return s.UNSIGNED_INT;if(n===Vn)return s.FLOAT;if(n===cn)return s.HALF_FLOAT;if(n===ng)return s.ALPHA;if(n===ig)return s.RGB;if(n===Ln)return s.RGBA;if(n===Qi)return s.DEPTH_COMPONENT;if(n===_s)return s.DEPTH_STENCIL;if(n===vd)return s.RED;if(n===xd)return s.RED_INTEGER;if(n===js)return s.RG;if(n===Md)return s.RG_INTEGER;if(n===Sd)return s.RGBA_INTEGER;if(n===Gl||n===Wl||n===Xl||n===ql)if(a===ct)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Gl)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Wl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ql)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Gl)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Wl)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ql)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===vu||n===xu||n===Mu||n===Su)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===vu)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xu)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Mu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Su)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===yu||n===bu||n===Eu||n===Tu||n===wu||n===Jl||n===Au)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===yu||n===bu)return a===ct?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Eu)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Tu)return r.COMPRESSED_R11_EAC;if(n===wu)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Jl)return r.COMPRESSED_RG11_EAC;if(n===Au)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ru||n===Cu||n===Pu||n===Lu||n===Iu||n===Du||n===Nu||n===Uu||n===Fu||n===Ou||n===ku||n===Bu||n===zu||n===Vu)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ru)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Cu)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Pu)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Lu)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Iu)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Du)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Nu)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Uu)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fu)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ou)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ku)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Bu)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===zu)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Vu)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Hu||n===Gu||n===Wu)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Hu)return a===ct?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Gu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xu||n===qu||n===jl||n===$u)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Xu)return r.COMPRESSED_RED_RGTC1_EXT;if(n===qu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===jl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$u)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const cb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hb=`
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

}`;class ub{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new mg(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Et({vertexShader:cb,fragmentShader:hb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Me(new Ti(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class db extends ir{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null;const _=typeof XRWebGLBinding<"u",m=new ub,g={},b=t.getContextAttributes();let E=null,M=null;const w=[],A=[],C=new Se;let x=null;const T=new ln;T.viewport=new ft;const L=new ln;L.viewport=new ft;const P=[T,L],I=new ux;let k=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ie=w[K];return ie===void 0&&(ie=new Oc,w[K]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(K){let ie=w[K];return ie===void 0&&(ie=new Oc,w[K]=ie),ie.getGripSpace()},this.getHand=function(K){let ie=w[K];return ie===void 0&&(ie=new Oc,w[K]=ie),ie.getHandSpace()};function O(K){const ie=A.indexOf(K.inputSource);if(ie===-1)return;const ee=w[ie];ee!==void 0&&(ee.update(K.inputSource,K.frame,c||a),ee.dispatchEvent({type:K.type,data:K.inputSource}))}function X(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",B);for(let K=0;K<w.length;K++){const ie=A[K];ie!==null&&(A[K]=null,w[K].disconnect(ie))}k=null,q=null,m.reset();for(const K in g)delete g[K];e.setRenderTarget(E),f=null,d=null,u=null,i=null,M=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&Re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(E=e.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",X),i.addEventListener("inputsourceschange",B),b.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Ie=null,Ne=null;b.depth&&(Ne=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=b.stencil?_s:Qi,Ie=b.stencil?Zr:Ei);const De={colorFormat:t.RGBA8,depthFormat:Ne,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(De),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new hn(d.textureWidth,d.textureHeight,{format:Ln,type:bn,depthTexture:new tr(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ee={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,ee),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new hn(f.framebufferWidth,f.framebufferHeight,{format:Ln,type:bn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),je.setContext(i),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function B(K){for(let ie=0;ie<K.removed.length;ie++){const ee=K.removed[ie],Ie=A.indexOf(ee);Ie>=0&&(A[Ie]=null,w[Ie].disconnect(ee))}for(let ie=0;ie<K.added.length;ie++){const ee=K.added[ie];let Ie=A.indexOf(ee);if(Ie===-1){for(let De=0;De<w.length;De++)if(De>=A.length){A.push(ee),Ie=De;break}else if(A[De]===null){A[De]=ee,Ie=De;break}if(Ie===-1)break}const Ne=w[Ie];Ne&&Ne.connect(ee)}}const Q=new S,J=new S;function re(K,ie,ee){Q.setFromMatrixPosition(ie.matrixWorld),J.setFromMatrixPosition(ee.matrixWorld);const Ie=Q.distanceTo(J),Ne=ie.projectionMatrix.elements,De=ee.projectionMatrix.elements,bt=Ne[14]/(Ne[10]-1),He=Ne[14]/(Ne[10]+1),ot=(Ne[9]+1)/Ne[5],et=(Ne[9]-1)/Ne[5],Ye=(Ne[8]-1)/Ne[0],Tt=(De[8]+1)/De[0],Rt=bt*Ye,It=bt*Tt,kt=Ie/(-Ye+Tt),Mt=kt*-Ye;if(ie.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Mt),K.translateZ(kt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ne[10]===-1)K.projectionMatrix.copy(ie.projectionMatrix),K.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const wt=bt+kt,N=He+kt,jt=Rt-Mt,it=It+(Ie-Mt),R=ot*He/N*wt,v=et*He/N*wt;K.projectionMatrix.makePerspective(jt,it,R,v,wt,N),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function le(K,ie){ie===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ie.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;let ie=K.near,ee=K.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(ee=m.depthFar)),I.near=L.near=T.near=ie,I.far=L.far=T.far=ee,(k!==I.near||q!==I.far)&&(i.updateRenderState({depthNear:I.near,depthFar:I.far}),k=I.near,q=I.far),I.layers.mask=K.layers.mask|6,T.layers.mask=I.layers.mask&-5,L.layers.mask=I.layers.mask&-3;const Ie=K.parent,Ne=I.cameras;le(I,Ie);for(let De=0;De<Ne.length;De++)le(Ne[De],Ie);Ne.length===2?re(I,T,L):I.projectionMatrix.copy(T.projectionMatrix),ge(K,I,Ie)};function ge(K,ie,ee){ee===null?K.matrix.copy(ie.matrixWorld):(K.matrix.copy(ee.matrixWorld),K.matrix.invert(),K.matrix.multiply(ie.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ie.projectionMatrix),K.projectionMatrixInverse.copy(ie.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Qr*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(K){return g[K]};let Je=null;function pt(K,ie){if(h=ie.getViewerPose(c||a),p=ie,h!==null){const ee=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let Ie=!1;ee.length!==I.cameras.length&&(I.cameras.length=0,Ie=!0);for(let He=0;He<ee.length;He++){const ot=ee[He];let et=null;if(f!==null)et=f.getViewport(ot);else{const Tt=u.getViewSubImage(d,ot);et=Tt.viewport,He===0&&(e.setRenderTargetTextures(M,Tt.colorTexture,Tt.depthStencilTexture),e.setRenderTarget(M))}let Ye=P[He];Ye===void 0&&(Ye=new ln,Ye.layers.enable(He),Ye.viewport=new ft,P[He]=Ye),Ye.matrix.fromArray(ot.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(ot.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(et.x,et.y,et.width,et.height),He===0&&(I.matrix.copy(Ye.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Ie===!0&&I.cameras.push(Ye)}const Ne=i.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const He=u.getDepthInformation(ee[0]);He&&He.isValid&&He.texture&&m.init(He,i.renderState)}if(Ne&&Ne.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let He=0;He<ee.length;He++){const ot=ee[He].camera;if(ot){let et=g[ot];et||(et=new mg,g[ot]=et);const Ye=u.getCameraImage(ot);et.sourceTexture=Ye}}}}for(let ee=0;ee<w.length;ee++){const Ie=A[ee],Ne=w[ee];Ie!==null&&Ne!==void 0&&Ne.update(Ie,ie,c||a)}Je&&Je(K,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),p=null}const je=new bg;je.setAnimationLoop(pt),this.setAnimationLoop=function(K){Je=K},this.dispose=function(){}}}const fb=new ye,Cg=new ze;Cg.set(-1,0,0,0,1,0,0,0,1);function pb(s,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,gg(s)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function i(m,g,b,E,M){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),d(m,g),g.isMeshPhysicalMaterial&&f(m,g,M)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),_(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,b,E):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===sn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===sn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const b=e.get(g),E=b.envMap,M=b.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(fb.makeRotationFromEuler(M)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Cg),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,b,E){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*b,m.scale.value=E*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,b){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===sn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){const b=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function mb(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,w){const A=w.program;n.uniformBlockBinding(M,A)}function c(M,w){let A=i[M.id];A===void 0&&(m(M),A=h(M),i[M.id]=A,M.addEventListener("dispose",b));const C=w.program;n.updateUBOMapping(M,C);const x=e.render.frame;r[M.id]!==x&&(d(M),r[M.id]=x)}function h(M){const w=u();M.__bindingPointIndex=w;const A=s.createBuffer(),C=M.__size,x=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,A),s.bufferData(s.UNIFORM_BUFFER,C,x),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,w,A),A}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Oe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const w=i[M.id],A=M.uniforms,C=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let x=0,T=A.length;x<T;x++){const L=A[x];if(Array.isArray(L))for(let P=0,I=L.length;P<I;P++)f(L[P],x,P,C);else f(L,x,0,C)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(M,w,A,C){if(_(M,w,A,C)===!0){const x=M.__offset,T=M.value;if(Array.isArray(T)){let L=0;for(let P=0;P<T.length;P++){const I=T[P],k=g(I);p(I,M.__data,L),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(L+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(T,M.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,x,M.__data)}}function p(M,w,A){typeof M=="number"||typeof M=="boolean"?w[0]=M:M.isMatrix3?(w[0]=M.elements[0],w[1]=M.elements[1],w[2]=M.elements[2],w[3]=0,w[4]=M.elements[3],w[5]=M.elements[4],w[6]=M.elements[5],w[7]=0,w[8]=M.elements[6],w[9]=M.elements[7],w[10]=M.elements[8],w[11]=0):ArrayBuffer.isView(M)?w.set(new M.constructor(M.buffer,M.byteOffset,w.length)):M.toArray(w,A)}function _(M,w,A,C){const x=M.value,T=w+"_"+A;if(C[T]===void 0)return typeof x=="number"||typeof x=="boolean"?C[T]=x:ArrayBuffer.isView(x)?C[T]=x.slice():C[T]=x.clone(),!0;{const L=C[T];if(typeof x=="number"||typeof x=="boolean"){if(L!==x)return C[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(L.equals(x)===!1)return L.copy(x),!0}}return!1}function m(M){const w=M.uniforms;let A=0;const C=16;for(let T=0,L=w.length;T<L;T++){const P=Array.isArray(w[T])?w[T]:[w[T]];for(let I=0,k=P.length;I<k;I++){const q=P[I],O=Array.isArray(q.value)?q.value:[q.value];for(let X=0,B=O.length;X<B;X++){const Q=O[X],J=g(Q),re=A%C,le=re%J.boundary,ge=re+le;A+=le,ge!==0&&C-ge<J.storage&&(A+=C-ge),q.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=A,A+=J.storage}}}const x=A%C;return x>0&&(A+=C-x),M.__size=A,M.__cache={},this}function g(M){const w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?Re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(w.boundary=16,w.storage=M.byteLength):Re("WebGLRenderer: Unsupported uniform value type.",M),w}function b(M){const w=M.target;w.removeEventListener("dispose",b);const A=a.indexOf(w.__bindingPointIndex);a.splice(A,1),s.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function E(){for(const M in i)s.deleteBuffer(i[M]);a=[],i={},r={}}return{bind:l,update:c,dispose:E}}const gb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let hi=null;function _b(){return hi===null&&(hi=new so(gb,16,16,js,cn),hi.name="DFG_LUT",hi.minFilter=Pt,hi.magFilter=Pt,hi.wrapS=Mi,hi.wrapT=Mi,hi.generateMipmaps=!1,hi.needsUpdate=!0),hi}class vb{constructor(e={}){const{canvas:t=X_(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=bn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const _=f,m=new Set([Sd,Md,xd]),g=new Set([bn,Ei,qa,Zr,gd,_d]),b=new Uint32Array(4),E=new Int32Array(4),M=new S;let w=null,A=null;const C=[],x=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let P=!1,I=null,k=null,q=null,O=null;this._outputColorSpace=_t;let X=0,B=0,Q=null,J=-1,re=null;const le=new ft,ge=new ft;let Je=null;const pt=new te(0);let je=0,K=t.width,ie=t.height,ee=1,Ie=null,Ne=null;const De=new ft(0,0,K,ie),bt=new ft(0,0,K,ie);let He=!1;const ot=new Cd;let et=!1,Ye=!1;const Tt=new ye,Rt=new S,It=new ft,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Mt=!1;function wt(){return Q===null?ee:1}let N=n;function jt(y,U){return t.getContext(y,U)}try{const y={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ld}`),t.addEventListener("webglcontextlost",Dt,!1),t.addEventListener("webglcontextrestored",St,!1),t.addEventListener("webglcontextcreationerror",ai,!1),N===null){const U="webgl2";if(N=jt(U,y),N===null)throw jt(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(y){throw Oe("WebGLRenderer: "+y.message),y}let it,R,v,F,z,W,ne,oe,$,Y,ce,we,ae,se,Ee,Pe,ke,D,he,Z,ue,me,j;function Ae(){it=new _y(N),it.init(),ue=new lb(N,it),R=new cy(N,it,e,ue),v=new ab(N,it),R.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),k=N.createFramebuffer(),q=N.createFramebuffer(),O=N.createFramebuffer(),F=new My(N),z=new q1,W=new ob(N,it,v,z,R,ue,F),ne=new gy(L),oe=new Ex(N),me=new oy(N,oe),$=new vy(N,oe,F,me),Y=new yy(N,$,oe,me,F),D=new Sy(N,R,W),Ee=new hy(z),ce=new X1(L,ne,it,R,me,Ee),we=new pb(L,z),ae=new K1,se=new eb(it),ke=new ay(L,ne,v,Y,p,l),Pe=new rb(L,Y,R),j=new mb(N,F,R,v),he=new ly(N,it,F),Z=new xy(N,it,F),F.programs=ce.programs,L.capabilities=R,L.extensions=it,L.properties=z,L.renderLists=ae,L.shadowMap=Pe,L.state=v,L.info=F}Ae(),_!==bn&&(T=new Ey(_,t.width,t.height,o,i,r));const be=new db(L,N);this.xr=be,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const y=it.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=it.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(y){y!==void 0&&(ee=y,this.setSize(K,ie,!1))},this.getSize=function(y){return y.set(K,ie)},this.setSize=function(y,U,G=!0){if(be.isPresenting){Re("WebGLRenderer: Can't change size while VR device is presenting.");return}K=y,ie=U,t.width=Math.floor(y*ee),t.height=Math.floor(U*ee),G===!0&&(t.style.width=y+"px",t.style.height=U+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(K*ee,ie*ee).floor()},this.setDrawingBufferSize=function(y,U,G){K=y,ie=U,ee=G,t.width=Math.floor(y*G),t.height=Math.floor(U*G),this.setViewport(0,0,y,U)},this.setEffects=function(y){if(_===bn){Oe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let U=0;U<y.length;U++)if(y[U].isOutputPass===!0){Re("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(le)},this.getViewport=function(y){return y.copy(De)},this.setViewport=function(y,U,G,V){y.isVector4?De.set(y.x,y.y,y.z,y.w):De.set(y,U,G,V),v.viewport(le.copy(De).multiplyScalar(ee).round())},this.getScissor=function(y){return y.copy(bt)},this.setScissor=function(y,U,G,V){y.isVector4?bt.set(y.x,y.y,y.z,y.w):bt.set(y,U,G,V),v.scissor(ge.copy(bt).multiplyScalar(ee).round())},this.getScissorTest=function(){return He},this.setScissorTest=function(y){v.setScissorTest(He=y)},this.setOpaqueSort=function(y){Ie=y},this.setTransparentSort=function(y){Ne=y},this.getClearColor=function(y){return y.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(y=!0,U=!0,G=!0){let V=0;if(y){let H=!1;if(Q!==null){const pe=Q.texture.format;H=m.has(pe)}if(H){const pe=Q.texture.type,ve=g.has(pe),fe=ke.getClearColor(),Te=ke.getClearAlpha(),Ce=fe.r,Ve=fe.g,We=fe.b;ve?(b[0]=Ce,b[1]=Ve,b[2]=We,b[3]=Te,N.clearBufferuiv(N.COLOR,0,b)):(E[0]=Ce,E[1]=Ve,E[2]=We,E[3]=Te,N.clearBufferiv(N.COLOR,0,E))}else V|=N.COLOR_BUFFER_BIT}U&&(V|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(V|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&N.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),I=y},this.dispose=function(){t.removeEventListener("webglcontextlost",Dt,!1),t.removeEventListener("webglcontextrestored",St,!1),t.removeEventListener("webglcontextcreationerror",ai,!1),ke.dispose(),ae.dispose(),se.dispose(),z.dispose(),ne.dispose(),Y.dispose(),me.dispose(),j.dispose(),ce.dispose(),be.dispose(),be.removeEventListener("sessionstart",Qd),be.removeEventListener("sessionend",Jd),As.stop()};function Dt(y){y.preventDefault(),nc("WebGLRenderer: Context Lost."),P=!0}function St(){nc("WebGLRenderer: Context Restored."),P=!1;const y=F.autoReset,U=Pe.enabled,G=Pe.autoUpdate,V=Pe.needsUpdate,H=Pe.type;Ae(),F.autoReset=y,Pe.enabled=U,Pe.autoUpdate=G,Pe.needsUpdate=V,Pe.type=H}function ai(y){Oe("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function oi(y){const U=y.target;U.removeEventListener("dispose",oi),r_(U)}function r_(y){a_(y),z.remove(y)}function a_(y){const U=z.get(y).programs;U!==void 0&&(U.forEach(function(G){ce.releaseProgram(G)}),y.isShaderMaterial&&ce.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,G,V,H,pe){U===null&&(U=kt);const ve=H.isMesh&&H.matrixWorld.determinantAffine()<0,fe=c_(y,U,G,V,H);v.setMaterial(V,ve);let Te=G.index,Ce=1;if(V.wireframe===!0){if(Te=$.getWireframeAttribute(G),Te===void 0)return;Ce=2}const Ve=G.drawRange,We=G.attributes.position;let Le=Ve.start*Ce,dt=(Ve.start+Ve.count)*Ce;pe!==null&&(Le=Math.max(Le,pe.start*Ce),dt=Math.min(dt,(pe.start+pe.count)*Ce)),Te!==null?(Le=Math.max(Le,0),dt=Math.min(dt,Te.count)):We!=null&&(Le=Math.max(Le,0),dt=Math.min(dt,We.count));const Bt=dt-Le;if(Bt<0||Bt===1/0)return;me.setup(H,V,fe,G,Te);let Nt,mt=he;if(Te!==null&&(Nt=oe.get(Te),mt=Z,mt.setIndex(Nt)),H.isMesh)V.wireframe===!0?(v.setLineWidth(V.wireframeLinewidth*wt()),mt.setMode(N.LINES)):mt.setMode(N.TRIANGLES);else if(H.isLine){let dn=V.linewidth;dn===void 0&&(dn=1),v.setLineWidth(dn*wt()),H.isLineSegments?mt.setMode(N.LINES):H.isLineLoop?mt.setMode(N.LINE_LOOP):mt.setMode(N.LINE_STRIP)}else H.isPoints?mt.setMode(N.POINTS):H.isSprite&&mt.setMode(N.TRIANGLES);if(H.isBatchedMesh)if(it.get("WEBGL_multi_draw"))mt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const dn=H._multiDrawStarts,_e=H._multiDrawCounts,En=H._multiDrawCount,st=Te?oe.get(Te).bytesPerElement:1,Un=z.get(V).currentProgram.getUniforms();for(let li=0;li<En;li++)Un.setValue(N,"_gl_DrawID",li),mt.render(dn[li]/st,_e[li])}else if(H.isInstancedMesh)mt.renderInstances(Le,Bt,H.count);else if(G.isInstancedBufferGeometry){const dn=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,_e=Math.min(G.instanceCount,dn);mt.renderInstances(Le,Bt,_e)}else mt.render(Le,Bt)};function Zd(y,U,G){y.transparent===!0&&y.side===Kt&&y.forceSinglePass===!1?(y.side=sn,y.needsUpdate=!0,_o(y,U,G),y.side=Gn,y.needsUpdate=!0,_o(y,U,G),y.side=Kt):_o(y,U,G)}this.compile=function(y,U,G=null){G===null&&(G=y),A=se.get(G),A.init(U),x.push(A),G.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(A.pushLight(H),H.castShadow&&A.pushShadow(H))}),y!==G&&y.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(A.pushLight(H),H.castShadow&&A.pushShadow(H))}),A.setupLights();const V=new Set;return y.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const pe=H.material;if(pe)if(Array.isArray(pe))for(let ve=0;ve<pe.length;ve++){const fe=pe[ve];Zd(fe,G,H),V.add(fe)}else Zd(pe,G,H),V.add(pe)}),A=x.pop(),V},this.compileAsync=function(y,U,G=null){const V=this.compile(y,U,G);return new Promise(H=>{function pe(){if(V.forEach(function(ve){z.get(ve).currentProgram.isReady()&&V.delete(ve)}),V.size===0){H(y);return}setTimeout(pe,10)}it.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Ac=null;function o_(y){Ac&&Ac(y)}function Qd(){As.stop()}function Jd(){As.start()}const As=new bg;As.setAnimationLoop(o_),typeof self<"u"&&As.setContext(self),this.setAnimationLoop=function(y){Ac=y,be.setAnimationLoop(y),y===null?As.stop():As.start()},be.addEventListener("sessionstart",Qd),be.addEventListener("sessionend",Jd),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){Oe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;I!==null&&I.renderStart(y,U);const G=be.enabled===!0&&be.isPresenting===!0,V=T!==null&&(Q===null||G)&&T.begin(L,Q);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(be.cameraAutoUpdate===!0&&be.updateCamera(U),U=be.getCamera()),y.isScene===!0&&y.onBeforeRender(L,y,U,Q),A=se.get(y,x.length),A.init(U),A.state.textureUnits=W.getTextureUnits(),x.push(A),Tt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ot.setFromProjectionMatrix(Tt,Si,U.reversedDepth),Ye=this.localClippingEnabled,et=Ee.init(this.clippingPlanes,Ye),w=ae.get(y,C.length),w.init(),C.push(w),be.enabled===!0&&be.isPresenting===!0){const ve=L.xr.getDepthSensingMesh();ve!==null&&Rc(ve,U,-1/0,L.sortObjects)}Rc(y,U,0,L.sortObjects),w.finish(),L.sortObjects===!0&&w.sort(Ie,Ne,U.reversedDepth),Mt=be.enabled===!1||be.isPresenting===!1||be.hasDepthSensing()===!1,Mt&&ke.addToRenderList(w,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),et===!0&&Ee.beginShadows();const H=A.state.shadowsArray;if(Pe.render(H,y,U),et===!0&&Ee.endShadows(),(V&&T.hasRenderPass())===!1){const ve=w.opaque,fe=w.transmissive;if(A.setupLights(),U.isArrayCamera){const Te=U.cameras;if(fe.length>0)for(let Ce=0,Ve=Te.length;Ce<Ve;Ce++){const We=Te[Ce];ef(ve,fe,y,We)}Mt&&ke.render(y);for(let Ce=0,Ve=Te.length;Ce<Ve;Ce++){const We=Te[Ce];jd(w,y,We,We.viewport)}}else fe.length>0&&ef(ve,fe,y,U),Mt&&ke.render(y),jd(w,y,U)}Q!==null&&B===0&&(W.updateMultisampleRenderTarget(Q),W.updateRenderTargetMipmap(Q)),V&&T.end(L),y.isScene===!0&&y.onAfterRender(L,y,U),me.resetDefaultState(),J=-1,re=null,x.pop(),x.length>0?(A=x[x.length-1],W.setTextureUnits(A.state.textureUnits),et===!0&&Ee.setGlobalState(L.clippingPlanes,A.state.camera)):A=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,I!==null&&I.renderEnd()};function Rc(y,U,G,V){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)G=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLightProbeGrid)A.pushLightProbeGrid(y);else if(y.isLight)A.pushLight(y),y.castShadow&&A.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||ot.intersectsSprite(y)){V&&It.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Tt);const ve=Y.update(y),fe=y.material;fe.visible&&w.push(y,ve,fe,G,It.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||ot.intersectsObject(y))){const ve=Y.update(y),fe=y.material;if(V&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),It.copy(y.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),It.copy(ve.boundingSphere.center)),It.applyMatrix4(y.matrixWorld).applyMatrix4(Tt)),Array.isArray(fe)){const Te=ve.groups;for(let Ce=0,Ve=Te.length;Ce<Ve;Ce++){const We=Te[Ce],Le=fe[We.materialIndex];Le&&Le.visible&&w.push(y,ve,Le,G,It.z,We)}}else fe.visible&&w.push(y,ve,fe,G,It.z,null)}}const pe=y.children;for(let ve=0,fe=pe.length;ve<fe;ve++)Rc(pe[ve],U,G,V)}function jd(y,U,G,V){const{opaque:H,transmissive:pe,transparent:ve}=y;A.setupLightsView(G),et===!0&&Ee.setGlobalState(L.clippingPlanes,G),V&&v.viewport(le.copy(V)),H.length>0&&go(H,U,G),pe.length>0&&go(pe,U,G),ve.length>0&&go(ve,U,G),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function ef(y,U,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[V.id]===void 0){const Le=it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[V.id]=new hn(1,1,{generateMipmaps:!0,type:Le?cn:bn,minFilter:$i,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace})}const pe=A.state.transmissionRenderTarget[V.id],ve=V.viewport||le;pe.setSize(ve.z*L.transmissionResolutionScale,ve.w*L.transmissionResolutionScale);const fe=L.getRenderTarget(),Te=L.getActiveCubeFace(),Ce=L.getActiveMipmapLevel();L.setRenderTarget(pe),L.getClearColor(pt),je=L.getClearAlpha(),je<1&&L.setClearColor(16777215,.5),L.clear(),Mt&&ke.render(G);const Ve=L.toneMapping;L.toneMapping=yi;const We=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),A.setupLightsView(V),et===!0&&Ee.setGlobalState(L.clippingPlanes,V),go(y,G,V),W.updateMultisampleRenderTarget(pe),W.updateRenderTargetMipmap(pe),it.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let dt=0,Bt=U.length;dt<Bt;dt++){const Nt=U[dt],{object:mt,geometry:dn,material:_e,group:En}=Nt;if(_e.side===Kt&&mt.layers.test(V.layers)){const st=_e.side;_e.side=sn,_e.needsUpdate=!0,tf(mt,G,V,dn,_e,En),_e.side=st,_e.needsUpdate=!0,Le=!0}}Le===!0&&(W.updateMultisampleRenderTarget(pe),W.updateRenderTargetMipmap(pe))}L.setRenderTarget(fe,Te,Ce),L.setClearColor(pt,je),We!==void 0&&(V.viewport=We),L.toneMapping=Ve}function go(y,U,G){const V=U.isScene===!0?U.overrideMaterial:null;for(let H=0,pe=y.length;H<pe;H++){const ve=y[H],{object:fe,geometry:Te,group:Ce}=ve;let Ve=ve.material;Ve.allowOverride===!0&&V!==null&&(Ve=V),fe.layers.test(G.layers)&&tf(fe,U,G,Te,Ve,Ce)}}function tf(y,U,G,V,H,pe){y.onBeforeRender(L,U,G,V,H,pe),y.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),H.onBeforeRender(L,U,G,V,y,pe),H.transparent===!0&&H.side===Kt&&H.forceSinglePass===!1?(H.side=sn,H.needsUpdate=!0,L.renderBufferDirect(G,U,V,H,y,pe),H.side=Gn,H.needsUpdate=!0,L.renderBufferDirect(G,U,V,H,y,pe),H.side=Kt):L.renderBufferDirect(G,U,V,H,y,pe),y.onAfterRender(L,U,G,V,H,pe)}function _o(y,U,G){U.isScene!==!0&&(U=kt);const V=z.get(y),H=A.state.lights,pe=A.state.shadowsArray,ve=H.state.version,fe=ce.getParameters(y,H.state,pe,U,G,A.state.lightProbeGridArray),Te=ce.getProgramCacheKey(fe);let Ce=V.programs;V.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?U.environment:null,V.fog=U.fog;const Ve=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;V.envMap=ne.get(y.envMap||V.environment,Ve),V.envMapRotation=V.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,Ce===void 0&&(y.addEventListener("dispose",oi),Ce=new Map,V.programs=Ce);let We=Ce.get(Te);if(We!==void 0){if(V.currentProgram===We&&V.lightsStateVersion===ve)return sf(y,fe),We}else fe.uniforms=ce.getUniforms(y),I!==null&&y.isNodeMaterial&&I.build(y,G,fe),y.onBeforeCompile(fe,L),We=ce.acquireProgram(fe,Te),Ce.set(Te,We),V.uniforms=fe.uniforms;const Le=V.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Le.clippingPlanes=Ee.uniform),sf(y,fe),V.needsLights=u_(y),V.lightsStateVersion=ve,V.needsLights&&(Le.ambientLightColor.value=H.state.ambient,Le.lightProbe.value=H.state.probe,Le.directionalLights.value=H.state.directional,Le.directionalLightShadows.value=H.state.directionalShadow,Le.spotLights.value=H.state.spot,Le.spotLightShadows.value=H.state.spotShadow,Le.rectAreaLights.value=H.state.rectArea,Le.ltc_1.value=H.state.rectAreaLTC1,Le.ltc_2.value=H.state.rectAreaLTC2,Le.pointLights.value=H.state.point,Le.pointLightShadows.value=H.state.pointShadow,Le.hemisphereLights.value=H.state.hemi,Le.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Le.spotLightMatrix.value=H.state.spotLightMatrix,Le.spotLightMap.value=H.state.spotLightMap,Le.pointShadowMatrix.value=H.state.pointShadowMatrix),V.lightProbeGrid=A.state.lightProbeGridArray.length>0,V.currentProgram=We,V.uniformsList=null,We}function nf(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=$l.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function sf(y,U){const G=z.get(y);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.batchingColor=U.batchingColor,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.instancingMorph=U.instancingMorph,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function l_(y,U){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;M.setFromMatrixPosition(U.matrixWorld);for(let G=0,V=y.length;G<V;G++){const H=y[G];if(H.texture!==null&&H.boundingBox.containsPoint(M))return H}return null}function c_(y,U,G,V,H){U.isScene!==!0&&(U=kt),W.resetTextureUnits();const pe=U.fog,ve=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?U.environment:null,fe=Q===null?L.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:$e.workingColorSpace,Te=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ce=ne.get(V.envMap||ve,Te),Ve=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,We=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Le=!!G.morphAttributes.position,dt=!!G.morphAttributes.normal,Bt=!!G.morphAttributes.color;let Nt=yi;V.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Nt=L.toneMapping);const mt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,dn=mt!==void 0?mt.length:0,_e=z.get(V),En=A.state.lights;if(et===!0&&(Ye===!0||y!==re)){const yt=y===re&&V.id===J;Ee.setState(V,y,yt)}let st=!1;V.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==En.state.version||_e.outputColorSpace!==fe||H.isBatchedMesh&&_e.batching===!1||!H.isBatchedMesh&&_e.batching===!0||H.isBatchedMesh&&_e.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&_e.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&_e.instancing===!1||!H.isInstancedMesh&&_e.instancing===!0||H.isSkinnedMesh&&_e.skinning===!1||!H.isSkinnedMesh&&_e.skinning===!0||H.isInstancedMesh&&_e.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&_e.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&_e.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&_e.instancingMorph===!1&&H.morphTexture!==null||_e.envMap!==Ce||V.fog===!0&&_e.fog!==pe||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==Ee.numPlanes||_e.numIntersection!==Ee.numIntersection)||_e.vertexAlphas!==Ve||_e.vertexTangents!==We||_e.morphTargets!==Le||_e.morphNormals!==dt||_e.morphColors!==Bt||_e.toneMapping!==Nt||_e.morphTargetsCount!==dn||!!_e.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(st=!0):(st=!0,_e.__version=V.version);let Un=_e.currentProgram;st===!0&&(Un=_o(V,U,H),I&&V.isNodeMaterial&&I.onUpdateProgram(V,Un,_e));let li=!1,ji=!1,or=!1;const gt=Un.getUniforms(),zt=_e.uniforms;if(v.useProgram(Un.program)&&(li=!0,ji=!0,or=!0),V.id!==J&&(J=V.id,ji=!0),_e.needsLights){const yt=l_(A.state.lightProbeGridArray,H);_e.lightProbeGrid!==yt&&(_e.lightProbeGrid=yt,ji=!0)}if(li||re!==y){v.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),gt.setValue(N,"projectionMatrix",y.projectionMatrix),gt.setValue(N,"viewMatrix",y.matrixWorldInverse);const ts=gt.map.cameraPosition;ts!==void 0&&ts.setValue(N,Rt.setFromMatrixPosition(y.matrixWorld)),R.logarithmicDepthBuffer&&gt.setValue(N,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&gt.setValue(N,"isOrthographic",y.isOrthographicCamera===!0),re!==y&&(re=y,ji=!0,or=!0)}if(_e.needsLights&&(En.state.directionalShadowMap.length>0&&gt.setValue(N,"directionalShadowMap",En.state.directionalShadowMap,W),En.state.spotShadowMap.length>0&&gt.setValue(N,"spotShadowMap",En.state.spotShadowMap,W),En.state.pointShadowMap.length>0&&gt.setValue(N,"pointShadowMap",En.state.pointShadowMap,W)),H.isSkinnedMesh){gt.setOptional(N,H,"bindMatrix"),gt.setOptional(N,H,"bindMatrixInverse");const yt=H.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),gt.setValue(N,"boneTexture",yt.boneTexture,W))}H.isBatchedMesh&&(gt.setOptional(N,H,"batchingTexture"),gt.setValue(N,"batchingTexture",H._matricesTexture,W),gt.setOptional(N,H,"batchingIdTexture"),gt.setValue(N,"batchingIdTexture",H._indirectTexture,W),gt.setOptional(N,H,"batchingColorTexture"),H._colorsTexture!==null&&gt.setValue(N,"batchingColorTexture",H._colorsTexture,W));const es=G.morphAttributes;if((es.position!==void 0||es.normal!==void 0||es.color!==void 0)&&D.update(H,G,Un),(ji||_e.receiveShadow!==H.receiveShadow)&&(_e.receiveShadow=H.receiveShadow,gt.setValue(N,"receiveShadow",H.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&U.environment!==null&&(zt.envMapIntensity.value=U.environmentIntensity),zt.dfgLUT!==void 0&&(zt.dfgLUT.value=_b()),ji){if(gt.setValue(N,"toneMappingExposure",L.toneMappingExposure),_e.needsLights&&h_(zt,or),pe&&V.fog===!0&&we.refreshFogUniforms(zt,pe),we.refreshMaterialUniforms(zt,V,ee,ie,A.state.transmissionRenderTarget[y.id]),_e.needsLights&&_e.lightProbeGrid){const yt=_e.lightProbeGrid;zt.probesSH.value=yt.texture,zt.probesMin.value.copy(yt.boundingBox.min),zt.probesMax.value.copy(yt.boundingBox.max),zt.probesResolution.value.copy(yt.resolution)}$l.upload(N,nf(_e),zt,W)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&($l.upload(N,nf(_e),zt,W),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&gt.setValue(N,"center",H.center),gt.setValue(N,"modelViewMatrix",H.modelViewMatrix),gt.setValue(N,"normalMatrix",H.normalMatrix),gt.setValue(N,"modelMatrix",H.matrixWorld),V.uniformsGroups!==void 0){const yt=V.uniformsGroups;for(let ts=0,lr=yt.length;ts<lr;ts++){const rf=yt[ts];j.update(rf,Un),j.bind(rf,Un)}}return Un}function h_(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function u_(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(y,U,G){const V=z.get(y);V.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),z.get(y.texture).__webglTexture=U,z.get(y.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:G,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,U){const G=z.get(y);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(y,U=0,G=0){Q=y,X=U,B=G;let V=null,H=!1,pe=!1;if(y){const fe=z.get(y);if(fe.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(N.FRAMEBUFFER,fe.__webglFramebuffer),le.copy(y.viewport),ge.copy(y.scissor),Je=y.scissorTest,v.viewport(le),v.scissor(ge),v.setScissorTest(Je),J=-1;return}else if(fe.__webglFramebuffer===void 0)W.setupRenderTarget(y);else if(fe.__hasExternalTextures)W.rebindTextures(y,z.get(y.texture).__webglTexture,z.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Ve=y.depthTexture;if(fe.__boundDepthTexture!==Ve){if(Ve!==null&&z.has(Ve)&&(y.width!==Ve.image.width||y.height!==Ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(y)}}const Te=y.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(pe=!0);const Ce=z.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ce[U])?V=Ce[U][G]:V=Ce[U],H=!0):y.samples>0&&W.useMultisampledRTT(y)===!1?V=z.get(y).__webglMultisampledFramebuffer:Array.isArray(Ce)?V=Ce[G]:V=Ce,le.copy(y.viewport),ge.copy(y.scissor),Je=y.scissorTest}else le.copy(De).multiplyScalar(ee).floor(),ge.copy(bt).multiplyScalar(ee).floor(),Je=He;if(G!==0&&(V=k),v.bindFramebuffer(N.FRAMEBUFFER,V)&&v.drawBuffers(y,V),v.viewport(le),v.scissor(ge),v.setScissorTest(Je),H){const fe=z.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,fe.__webglTexture,G)}else if(pe){const fe=U;for(let Te=0;Te<y.textures.length;Te++){const Ce=z.get(y.textures[Te]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Te,Ce.__webglTexture,G,fe)}}else if(y!==null&&G!==0){const fe=z.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,fe.__webglTexture,G)}J=-1},this.readRenderTargetPixels=function(y,U,G,V,H,pe,ve,fe=0){if(!(y&&y.isWebGLRenderTarget)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=z.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ve!==void 0&&(Te=Te[ve]),Te){v.bindFramebuffer(N.FRAMEBUFFER,Te);try{const Ce=y.textures[fe],Ve=Ce.format,We=Ce.type;if(y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!R.textureFormatReadable(Ve)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!R.textureTypeReadable(We)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-V&&G>=0&&G<=y.height-H&&N.readPixels(U,G,V,H,ue.convert(Ve),ue.convert(We),pe)}finally{const Ce=Q!==null?z.get(Q).__webglFramebuffer:null;v.bindFramebuffer(N.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(y,U,G,V,H,pe,ve,fe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=z.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ve!==void 0&&(Te=Te[ve]),Te)if(U>=0&&U<=y.width-V&&G>=0&&G<=y.height-H){v.bindFramebuffer(N.FRAMEBUFFER,Te);const Ce=y.textures[fe],Ve=Ce.format,We=Ce.type;if(y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!R.textureFormatReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!R.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Le=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Le),N.bufferData(N.PIXEL_PACK_BUFFER,pe.byteLength,N.STREAM_READ),N.readPixels(U,G,V,H,ue.convert(Ve),ue.convert(We),0);const dt=Q!==null?z.get(Q).__webglFramebuffer:null;v.bindFramebuffer(N.FRAMEBUFFER,dt);const Bt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await q_(N,Bt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Le),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,pe),N.deleteBuffer(Le),N.deleteSync(Bt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,U=null,G=0){const V=Math.pow(2,-G),H=Math.floor(y.image.width*V),pe=Math.floor(y.image.height*V),ve=U!==null?U.x:0,fe=U!==null?U.y:0;W.setTexture2D(y,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,ve,fe,H,pe),v.unbindTexture()},this.copyTextureToTexture=function(y,U,G=null,V=null,H=0,pe=0){let ve,fe,Te,Ce,Ve,We,Le,dt,Bt;const Nt=y.isCompressedTexture?y.mipmaps[pe]:y.image;if(G!==null)ve=G.max.x-G.min.x,fe=G.max.y-G.min.y,Te=G.isBox3?G.max.z-G.min.z:1,Ce=G.min.x,Ve=G.min.y,We=G.isBox3?G.min.z:0;else{const zt=Math.pow(2,-H);ve=Math.floor(Nt.width*zt),fe=Math.floor(Nt.height*zt),y.isDataArrayTexture?Te=Nt.depth:y.isData3DTexture?Te=Math.floor(Nt.depth*zt):Te=1,Ce=0,Ve=0,We=0}V!==null?(Le=V.x,dt=V.y,Bt=V.z):(Le=0,dt=0,Bt=0);const mt=ue.convert(U.format),dn=ue.convert(U.type);let _e;U.isData3DTexture?(W.setTexture3D(U,0),_e=N.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(W.setTexture2DArray(U,0),_e=N.TEXTURE_2D_ARRAY):(W.setTexture2D(U,0),_e=N.TEXTURE_2D),v.activeTexture(N.TEXTURE0),v.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),v.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),v.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);const En=v.getParameter(N.UNPACK_ROW_LENGTH),st=v.getParameter(N.UNPACK_IMAGE_HEIGHT),Un=v.getParameter(N.UNPACK_SKIP_PIXELS),li=v.getParameter(N.UNPACK_SKIP_ROWS),ji=v.getParameter(N.UNPACK_SKIP_IMAGES);v.pixelStorei(N.UNPACK_ROW_LENGTH,Nt.width),v.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Nt.height),v.pixelStorei(N.UNPACK_SKIP_PIXELS,Ce),v.pixelStorei(N.UNPACK_SKIP_ROWS,Ve),v.pixelStorei(N.UNPACK_SKIP_IMAGES,We);const or=y.isDataArrayTexture||y.isData3DTexture,gt=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){const zt=z.get(y),es=z.get(U),yt=z.get(zt.__renderTarget),ts=z.get(es.__renderTarget);v.bindFramebuffer(N.READ_FRAMEBUFFER,yt.__webglFramebuffer),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,ts.__webglFramebuffer);for(let lr=0;lr<Te;lr++)or&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,z.get(y).__webglTexture,H,We+lr),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,z.get(U).__webglTexture,pe,Bt+lr)),N.blitFramebuffer(Ce,Ve,ve,fe,Le,dt,ve,fe,N.DEPTH_BUFFER_BIT,N.NEAREST);v.bindFramebuffer(N.READ_FRAMEBUFFER,null),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(H!==0||y.isRenderTargetTexture||z.has(y)){const zt=z.get(y),es=z.get(U);v.bindFramebuffer(N.READ_FRAMEBUFFER,q),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,O);for(let yt=0;yt<Te;yt++)or?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,zt.__webglTexture,H,We+yt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,zt.__webglTexture,H),gt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,es.__webglTexture,pe,Bt+yt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,es.__webglTexture,pe),H!==0?N.blitFramebuffer(Ce,Ve,ve,fe,Le,dt,ve,fe,N.COLOR_BUFFER_BIT,N.NEAREST):gt?N.copyTexSubImage3D(_e,pe,Le,dt,Bt+yt,Ce,Ve,ve,fe):N.copyTexSubImage2D(_e,pe,Le,dt,Ce,Ve,ve,fe);v.bindFramebuffer(N.READ_FRAMEBUFFER,null),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else gt?y.isDataTexture||y.isData3DTexture?N.texSubImage3D(_e,pe,Le,dt,Bt,ve,fe,Te,mt,dn,Nt.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(_e,pe,Le,dt,Bt,ve,fe,Te,mt,Nt.data):N.texSubImage3D(_e,pe,Le,dt,Bt,ve,fe,Te,mt,dn,Nt):y.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,pe,Le,dt,ve,fe,mt,dn,Nt.data):y.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,pe,Le,dt,Nt.width,Nt.height,mt,Nt.data):N.texSubImage2D(N.TEXTURE_2D,pe,Le,dt,ve,fe,mt,dn,Nt);v.pixelStorei(N.UNPACK_ROW_LENGTH,En),v.pixelStorei(N.UNPACK_IMAGE_HEIGHT,st),v.pixelStorei(N.UNPACK_SKIP_PIXELS,Un),v.pixelStorei(N.UNPACK_SKIP_ROWS,li),v.pixelStorei(N.UNPACK_SKIP_IMAGES,ji),pe===0&&U.generateMipmaps&&N.generateMipmap(_e),v.unbindTexture()},this.initRenderTarget=function(y){z.get(y).__webglFramebuffer===void 0&&W.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?W.setTextureCube(y,0):y.isData3DTexture?W.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?W.setTexture2DArray(y,0):W.setTexture2D(y,0),v.unbindTexture()},this.resetState=function(){X=0,B=0,Q=null,v.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}class xb{constructor(e){this.target=e,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("contextmenu",this.onContextMenu),document.addEventListener("pointerlockchange",this.onPointerLockChange)}held=new Set;pressed=new Set;released=new Set;mouseDX=0;mouseDY=0;buttons=new Set;buttonsPressed=new Set;locked=!1;dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("contextmenu",this.onContextMenu),document.removeEventListener("pointerlockchange",this.onPointerLockChange)}isDown(e){return this.held.has(e)}wasPressed(e){return this.pressed.has(e)}wasReleased(e){return this.released.has(e)}isMouseDown(e=0){return this.buttons.has(e)}wasMousePressed(e=0){return this.buttonsPressed.has(e)}get pointerLocked(){return this.locked}consumeMouseDelta(e){return e.x=this.mouseDX,e.y=this.mouseDY,this.mouseDX=0,this.mouseDY=0,e}requestPointerLock(){if(this.locked)return;const e=this.target.requestPointerLock();e&&typeof e.catch=="function"&&e.catch(()=>{})}exitPointerLock(){this.locked&&document.exitPointerLock()}endFrame(){this.pressed.clear(),this.released.clear(),this.buttonsPressed.clear()}onKeyDown=e=>{e.repeat||(this.held.add(e.code),this.pressed.add(e.code)),e.code==="Tab"&&e.preventDefault()};onKeyUp=e=>{this.held.delete(e.code),this.released.add(e.code)};onBlur=()=>{this.held.clear(),this.buttons.clear(),this.buttonsPressed.clear(),this.mouseDX=0,this.mouseDY=0};onMouseMove=e=>{this.locked&&(this.mouseDX+=e.movementX,this.mouseDY+=e.movementY)};onMouseDown=e=>{this.buttons.has(e.button)||this.buttonsPressed.add(e.button),this.buttons.add(e.button)};onContextMenu=e=>{e.preventDefault()};onMouseUp=e=>{this.buttons.delete(e.button)};onPointerLockChange=()=>{this.locked=document.pointerLockElement===this.target,this.locked||(this.mouseDX=0,this.mouseDY=0)}}const Ta=1/120,Mb=.25;class Sb{frameDelta=0;elapsed=0;alpha=0;last=performance.now()/1e3;accumulator=0;tick(e){const t=performance.now()/1e3,n=Math.min(t-this.last,Mb);for(this.last=t,this.frameDelta=n,this.accumulator+=n;this.accumulator>=Ta;)this.accumulator-=Ta,this.elapsed+=Ta,e(Ta);return this.alpha=this.accumulator/Ta,n}}function ls(s,e,t){let n=Math.imul(s,374761393)+Math.imul(e,668265263)+Math.imul(t,1274126177);return n=n^n>>>13,n=Math.imul(n,1274126177),n=n^n>>>16,(n>>>0)/4294967295}function dh(s){return s*s*(3-2*s)}function Is(s,e,t){return s+(e-s)*t}function kd(s,e,t){const n=Math.floor(s),i=Math.floor(e),r=Math.floor(t),a=dh(s-n),o=dh(e-i),l=dh(t-r),c=ls(n,i,r),h=ls(n+1,i,r),u=ls(n,i+1,r),d=ls(n+1,i+1,r),f=ls(n,i,r+1),p=ls(n+1,i,r+1),_=ls(n,i+1,r+1),m=ls(n+1,i+1,r+1),g=Is(c,h,a),b=Is(u,d,a),E=Is(f,p,a),M=Is(_,m,a);return Is(Is(g,b,o),Is(E,M,o),l)}function Ys(s,e,t,n=4,i=.5,r=2){let a=0,o=1,l=0,c=s,h=e,u=t;for(let d=0;d<n;d++)a+=kd(c,h,u)*o,l+=o,o*=i,c*=r,h*=r,u*=r;return a/l}function yb(s,e,t){return 1-Math.abs(kd(s,e,t)*2-1)}function bb(s,e,t,n=4,i=.5,r=2.13){let a=0,o=1,l=0,c=s,h=e,u=t;for(let d=0;d<n;d++)a+=yb(c,h,u)*o,l+=o,o*=i,c*=r,h*=r,u*=r;return a/l}function xc(s){let e=s>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const Ep=new Map;function Bd(s){const e=Ep.get(s);if(e)return e;const t=s<=0?Eb():Tb(Bd(s-1));return Ep.set(s,t),t}function Eb(){const s=(1+Math.sqrt(5))/2,e=[-1,s,0,1,s,0,-1,-s,0,1,-s,0,0,-1,s,0,1,s,0,-1,-s,0,1,-s,s,0,-1,s,0,1,-s,0,-1,-s,0,1],t=new Float32Array(e.length);for(let i=0;i<e.length;i+=3){const r=Math.hypot(e[i],e[i+1],e[i+2]);t[i]=e[i]/r,t[i+1]=e[i+1]/r,t[i+2]=e[i+2]/r}const n=Uint32Array.from([0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1]);return{dirs:t,index:n}}function Tb(s){const e=s.index.length/3,t=s.dirs.length/3,n=t+e*3/2,i=new Float32Array(n*3);i.set(s.dirs);const r=new Uint32Array(e*4*3),a=new Map;let o=t;const l=(h,u)=>{const d=h<u?h*1048576+u:u*1048576+h,f=a.get(d);if(f!==void 0)return f;const p=i[h*3]+i[u*3],_=i[h*3+1]+i[u*3+1],m=i[h*3+2]+i[u*3+2],g=Math.hypot(p,_,m),b=o++;return i[b*3]=p/g,i[b*3+1]=_/g,i[b*3+2]=m/g,a.set(d,b),b};let c=0;for(let h=0;h<e;h++){const u=s.index[h*3],d=s.index[h*3+1],f=s.index[h*3+2],p=l(u,d),_=l(d,f),m=l(f,u);r[c++]=u,r[c++]=p,r[c++]=m,r[c++]=p,r[c++]=d,r[c++]=_,r[c++]=m,r[c++]=_,r[c++]=f,r[c++]=p,r[c++]=_,r[c++]=m}return{dirs:i,index:r}}const Tp=1.85;function wb(s,e,t){const n=Math.max(t-Math.abs(s-e),0)/t;return Math.max(s,e)+n*n*t*.25}class wp{id;sharp;ax;ay;az;lobes;lobeCount;cutN;cutD;cutCount;craterDir;craterCos;craterDepth;craterRim;craterCount;fineFrom;midAmp;midFreq;bumpAmp;bumpFreq;ridgeAmp;ridgeFreq;grainAmp;mottleFreq;octaves=3;chipAmp=.055;chipFreq;seed;norm=1;smallest=1;constructor(e,t,n=!1){this.id=e,this.seed=t%97*13.37+4.2;const i=xc(t*7919+13),r=(d,f)=>d+(f-d)*i(),a=(d,f)=>Math.floor(r(d,f+.999));this.sharp=e==="shard"||e==="splinter";let o=0,l=0,c=[.18,.5],h=0;switch(this.bumpFreq=r(1.4,2.2),this.ridgeFreq=r(3.4,5.6),this.bumpAmp=.14,this.ridgeAmp=.1,this.grainAmp=.03,e){case"splinter":this.ax=1,this.ay=r(.3,.44),this.az=r(.26,.4),this.bumpAmp=.17,this.ridgeAmp=.16,o=a(3,5),l=a(1,3),c=[.14,.3];break;case"slab":this.ax=1,this.ay=r(.34,.46),this.az=r(.72,.95),this.bumpAmp=.19,o=a(1,3),l=a(4,8),c=[.16,.42];break;case"binary":this.ax=1,this.ay=r(.8,.95),this.az=r(.8,.95),this.bumpAmp=.12,h=2,l=a(4,8),c=[.14,.36];break;case"shard":this.ax=1,this.ay=r(.72,.95),this.az=r(.66,.9),this.bumpAmp=.05,this.ridgeAmp=.04,o=a(7,10),l=a(1,3),c=[.12,.28];break;default:this.ax=1,this.ay=r(.82,.98),this.az=r(.78,.96),this.bumpAmp=.16,this.ridgeAmp=.14,l=a(9,15),c=[.14,.55],o=a(0,1);break}if(this.lobeCount=h,this.lobes=new Float64Array(h*4),h===2){const d=r(-1,1),f=r(-1,1),p=r(-1,1),_=Math.hypot(d,f,p)||1,m=r(.4,.52),g=r(.36,.5),b=r(.6,.7),E=r(.5,.64);this.lobes.set([d/_*m,f/_*m,p/_*m,b],0),this.lobes.set([-d/_*g,-f/_*g,-p/_*g,E],4)}this.cutCount=o,this.cutN=new Float64Array(o*3),this.cutD=new Float64Array(o);for(let d=0;d<o;d++){const f=r(-1,1),p=r(-1,1),_=r(-1,1),m=Math.hypot(f,p,_)||1;this.cutN.set([f/m,p/m,_/m],d*3),this.cutD[d]=e==="shard"?r(.55,.8):r(.52,.86)}const u=n?a(9,16):0;this.fineFrom=l,l+=u,this.craterCount=l,this.craterDir=new Float64Array(l*3),this.craterCos=new Float64Array(l),this.craterDepth=new Float64Array(l),this.craterRim=new Float64Array(l);for(let d=0;d<l;d++){const f=r(-1,1),p=r(-1,1),_=r(-1,1),m=Math.hypot(f,p,_)||1;this.craterDir.set([f/m,p/m,_/m],d*3);const g=d<this.fineFrom?r(c[0],c[1]):r(.09,.17);this.craterCos[d]=Math.cos(g),this.craterDepth[d]=g*r(.24,.42),this.craterRim[d]=g*r(.03,.09)}this.midAmp=n?r(.025,.045):0,this.midFreq=r(6,9.5),n&&(this.grainAmp*=.28,this.octaves=2,this.chipAmp=.03,this.ridgeAmp*=.35),this.mottleFreq=r(1.6,2.6),this.chipFreq=r(6,9),this.measure()}get minRadius(){return this.smallest}radius(e,t,n){return this.raw(e,t,n)*this.norm}mottle(e,t,n){const i=this.mottleFreq,r=this.seed;return Ys(e*i-r*1.3,t*i+r,n*i-r*.4,3)}cavity(e,t,n){return this.craterPair(e,t,n),this.lastCavity}ejecta(e,t,n){return this.craterPair(e,t,n),this.lastEjecta}craterPair(e,t,n){let i=0,r=0;for(let a=0;a<this.craterCount;a++){const o=e*this.craterDir[a*3]+t*this.craterDir[a*3+1]+n*this.craterDir[a*3+2],l=this.craterCos[a],c=1-(1-l)*Tp;if(o<=c)continue;const h=(1-o)/(1-l);if(h<1){o>l&&(i+=(1-h*h)*(this.craterDepth[a]/.12));continue}const d=1-(h-1)/(Tp-1);r+=d*d*(this.craterDepth[a]/.3)}this.lastCavity=Math.min(i,1),this.lastEjecta=Math.min(r,1)}lastCavity=0;lastEjecta=0;samples=null;sampleCount=0;sampleUpTo(e,t,n){if(this.sampleCount>=t)return t;if(!this.samples||this.samples.length<t*4){const a=new Float32Array(t*4);this.samples&&a.set(this.samples.subarray(0,this.sampleCount*4)),this.samples=a}const i=this.samples,r=Math.min(t,this.sampleCount+n);for(let a=this.sampleCount;a<r;a++){const o=e[a*3],l=e[a*3+1],c=e[a*3+2];this.craterPair(o,l,c),i[a*4]=this.radius(o,l,c),i[a*4+1]=this.lastCavity,i[a*4+2]=this.mottle(o,l,c),i[a*4+3]=this.lastEjecta}return this.sampleCount=r,r}get sampleData(){return this.samples??new Float32Array(0)}releaseSamples(){this.samples=null,this.sampleCount=0}raw(e,t,n){let i;if(this.lobeCount>0){i=0;for(let c=0;c<this.lobeCount;c++)i=wb(i,this.lobe(c,e,t,n),.12)}else{const c=e/this.ax,h=t/this.ay,u=n/this.az;i=1/Math.sqrt(c*c+h*h+u*u)}const r=this.seed,a=this.bumpFreq,o=this.octaves;if(i*=1+(Ys(e*a+r,t*a+r*1.7,n*a-r,o)-.5)*2*this.bumpAmp,this.ridgeAmp>0){const c=this.ridgeFreq;i*=1+(bb(e*c-r,t*c+r,n*c+r*.5,o)-.55)*this.ridgeAmp}if(this.midAmp>0){const c=this.midFreq;i*=1+(Ys(e*c+r*.7,t*c-r,n*c+r,2)-.5)*2*this.midAmp}for(let c=0;c<this.cutCount;c++){const h=e*this.cutN[c*3]+t*this.cutN[c*3+1]+n*this.cutN[c*3+2];if(h<=.001)continue;const u=this.cutD[c]/h;u<i&&(i=u)}if(this.cutCount>0){const c=this.chipFreq;i*=1+(Ys(e*c+r*.3,t*c-r*1.1,n*c+r*.9,2)-.5)*this.chipAmp}let l=0;for(let c=0;c<this.craterCount;c++){const h=e*this.craterDir[c*3]+t*this.craterDir[c*3+1]+n*this.craterDir[c*3+2],u=this.craterCos[c],d=1-(1-u)*1.4;if(h<=d)continue;const f=(1-h)/(1-u);if(f<1){const _=1-f*f;l-=this.craterDepth[c]*_*Math.sqrt(_)}const p=(f-1)*2.6;l+=this.craterRim[c]*Math.exp(-p*p)}return i*=1+l,i*=1+(kd(e*21+r,t*21-r,n*21+r*2)-.5)*this.grainAmp,i}lobe(e,t,n,i){const r=this.lobes[e*4],a=this.lobes[e*4+1],o=this.lobes[e*4+2],l=this.lobes[e*4+3],c=t*r+n*a+i*o,h=c*c-(r*r+a*a+o*o)+l*l;return h<=0?0:c+Math.sqrt(h)}measure(){const{dirs:e}=Bd(4);let t=0,n=1/0;for(let i=0;i<e.length;i+=3){const r=this.raw(e[i],e[i+1],e[i+2]);r>t&&(t=r),r<n&&(n=r)}this.norm=t>0?1/(t*1.015):1,this.smallest=n*this.norm}}function Ap(s,e){const t=new Pg(s,e);return t.advance(1/0),t.finish()}class Pg{constructor(e,t){this.shape=e,this.detail=t,this.sphere=Bd(t),this.points=this.sphere.dirs.length/3,this.position=new Float32Array(this.points*3),this.rockDetail=new Float32Array(this.points*3),this.normal=new Float32Array(this.points*3)}sphere;points;position;rockDetail;normal;phase=0;cursor=0;get done(){return this.phase===3}advance(e){let t=e;for(;t>0&&this.phase<3;)this.phase===0?t-=this.sample(t):this.phase===1?t-=this.accumulate(t):t-=this.normalize(t)}finish(){this.done||this.advance(1/0);let e=new xt;if(e.setAttribute("position",new at(this.position,3)),e.setAttribute("aRockDetail",new at(this.rockDetail,3)),e.setAttribute("normal",new at(this.normal,3)),e.setIndex(new at(this.sphere.index,1)),this.shape.sharp&&this.detail<=3){const t=e.toNonIndexed();e.dispose(),e=t,e.computeVertexNormals()}return e.computeBoundingSphere(),e}sample(e){const t=this.shape.sampleUpTo(this.sphere.dirs,this.points,e),n=this.sphere.dirs,i=this.shape.sampleData;for(let a=this.cursor;a<t;a++){const o=i[a*4];this.position[a*3]=n[a*3]*o,this.position[a*3+1]=n[a*3+1]*o,this.position[a*3+2]=n[a*3+2]*o,this.rockDetail[a*3]=i[a*4+1],this.rockDetail[a*3+1]=i[a*4+2],this.rockDetail[a*3+2]=i[a*4+3]}const r=t-this.cursor;return this.cursor=t,this.cursor>=this.points&&(this.phase=1,this.cursor=0),Math.max(r,1)}accumulate(e){const t=this.sphere.index,n=t.length/3,i=Math.min(n,this.cursor+e),r=this.position,a=this.normal;for(let l=this.cursor;l<i;l++){const c=t[l*3]*3,h=t[l*3+1]*3,u=t[l*3+2]*3,d=r[h]-r[c],f=r[h+1]-r[c+1],p=r[h+2]-r[c+2],_=r[u]-r[c],m=r[u+1]-r[c+1],g=r[u+2]-r[c+2],b=f*g-p*m,E=p*_-d*g,M=d*m-f*_;a[c]+=b,a[c+1]+=E,a[c+2]+=M,a[h]+=b,a[h+1]+=E,a[h+2]+=M,a[u]+=b,a[u+1]+=E,a[u+2]+=M}const o=i-this.cursor;return this.cursor=i,this.cursor>=n&&(this.phase=2,this.cursor=0),Math.max(o,1)}normalize(e){const t=Math.min(this.points,this.cursor+e),n=this.normal;for(let r=this.cursor;r<t;r++){const a=n[r*3],o=n[r*3+1],l=n[r*3+2],c=Math.sqrt(a*a+o*o+l*l)||1;n[r*3]=a/c,n[r*3+1]=o/c,n[r*3+2]=l/c}const i=t-this.cursor;return this.cursor=t,this.cursor>=this.points&&(this.phase=3),Math.max(i,1)}}const ii={rock:{id:"rock",name:"Taubes Gestein",code:"TAB",good:"ore",frequency:30,tonsPerCubicMeter:.004,hardness:.45,rock:6971993,vein:5656649,veinEmissive:!1},iron:{id:"iron",name:"Eisenerz",code:"FE",good:"ore",frequency:26,tonsPerCubicMeter:.022,hardness:.5,rock:7032892,vein:11036218,veinEmissive:!1},ice:{id:"ice",name:"Wassereis",code:"H2O",good:"water",frequency:16,tonsPerCubicMeter:.03,hardness:.22,rock:8096918,vein:13166320,veinEmissive:!1},copper:{id:"copper",name:"Kupfererz",code:"CU",good:"copper",frequency:12,tonsPerCubicMeter:.016,hardness:.55,rock:6249038,vein:3120250,veinEmissive:!1},silicon:{id:"silicon",name:"Siliziumerz",code:"SI",good:"silicon",frequency:9,tonsPerCubicMeter:.014,hardness:.62,rock:7171440,vein:12172484,veinEmissive:!1},platinum:{id:"platinum",name:"Platinerz",code:"PT",good:"platinum",frequency:4,tonsPerCubicMeter:.008,hardness:.8,rock:5197138,vein:14473416,veinEmissive:!1},crystal:{id:"crystal",name:"Resonanzkristall",code:"KRS",good:"crystal",frequency:2,tonsPerCubicMeter:.006,hardness:1,rock:4012626,vein:9400296,veinEmissive:!0}},Rp=Object.keys(ii),Xi={pebble:{id:"pebble",name:"Geroell",minRadius:2,maxRadius:6,frequency:40,landable:!1},small:{id:"small",name:"Brocken",minRadius:6,maxRadius:20,frequency:34,landable:!1},medium:{id:"medium",name:"Felsen",minRadius:20,maxRadius:60,frequency:18,landable:!1},large:{id:"large",name:"Grossfelsen",minRadius:60,maxRadius:150,frequency:6,landable:!1},huge:{id:"huge",name:"Planetoid",minRadius:150,maxRadius:420,frequency:2,landable:!0}},Ab=Object.keys(Xi);function Rb(s,e){return 1.3333333333333333*Math.PI*s*s*s*ii[e].tonsPerCubicMeter}const Cb=[{scale:.014,near:1400,far:6e3,strength:.2,sizeFrom:45,sizeTo:110},{scale:.04,near:700,far:2600,strength:.22,sizeFrom:14,sizeTo:40},{scale:.09,near:400,far:1100,strength:.26,sizeFrom:0,sizeTo:0},{scale:.33,near:110,far:320,strength:.3,sizeFrom:0,sizeTo:0},{scale:1.3,near:30,far:95,strength:.3,sizeFrom:0,sizeTo:0}],Pb=.55,Lb=160,Ib=480,Db=.42,Nb=.17,Ub=.55,Fb=220,Ob=760,kb=4.5,Bb=13,zb=.8,Vb=.012,Hb=.2,Gb={iron:.55,copper:.5,platinum:.75,silicon:.2},Wb={rock:.22,iron:.68,ice:.8,copper:.64,silicon:.6,platinum:.58,crystal:.72},Xb={ice:.42,crystal:.55,platinum:.8},qb={ice:1},$b=.035,Kb=.07,wa=new te,Zo=new te;function Yb(){const s=new Qe({color:16777215,roughness:.95,metalness:0}),e={value:new S(0,0,1)},t={value:new te(16774112).multiplyScalar(Hb)};return Object.assign(s,{rockSun:e,rockRim:t}),s.onBeforeCompile=n=>{n.uniforms.uRockSun=e,n.uniforms.uRockRim=t,n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
        attribute vec3 aRockDetail;   // x: Mulde, y: Flecken, z: Auswurf
        attribute vec3 aRock;
        attribute vec3 aVein;
        attribute vec4 aRockMod;      // Aderstaerke, Leuchten, Rauheit, Metall
        attribute float aRockFrost;
        varying vec3 vRockBase;
        varying vec3 vRockVein;
        varying vec4 vRockMod;
        varying vec3 vRockPos;
        varying vec3 vRockDir;
        varying float vRockSeed;
        varying float vRockCavity;
        varying float vRockSize;
        varying float vRockFrostAmount;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        float cavity = aRockDetail.x;
        float ejecta = aRockDetail.z;
        // Grossflaeckige Helligkeitsflecken — Fels ist nie einfarbig.
        float mottle = 0.70 + aRockDetail.y * 0.42;
        // In den Mulden liegt Schutt: dunkler, und er deckt die Adern zu.
        vRockBase = aRock * mottle * (1.0 - cavity * 0.20);
        // Auswurfdecke: der Staub eines Einschlags ist heller als der Fels und
        // entsaettigt, weil er aus zertruemmertem Material aller Lagen besteht.
        // Bewusst zurueckhaltend — als Andeutung liest sich das als Hof, zu
        // deutlich als Nebelschwaden auf dem Gestein.
        float ejectaLum = dot(vRockBase, vec3(0.299, 0.587, 0.114));
        vRockBase = mix(vRockBase, mix(vRockBase, vec3(ejectaLum), 0.30) * 1.35, ejecta * 0.65);
        vRockVein = aVein;
        // Adern liegen unter Schutt und Auswurf begraben.
        vRockMod = vec4(
          aRockMod.x * (1.0 - cavity * 0.7) * (1.0 - ejecta * 0.45),
          aRockMod.yzw);
        vRockCavity = cavity;
        vRockFrostAmount = aRockFrost;
        float rockScale = length(modelMatrix[0].xyz);
        #ifdef USE_INSTANCING
          rockScale *= length(instanceMatrix[0].xyz);
        #endif
        // Umrissradius in Metern. Der Shader entscheidet daran, welche
        // Reliefstufen ueberhaupt zu diesem Brocken passen.
        vRockSize = rockScale;
        // Ortsfest am Brocken und in Metern: die Koernung dreht sich mit und
        // ist auf dem Geroell so gross wie auf dem Planetoiden.
        vRockPos = transformed * rockScale;
        // Richtung im Brockensystem: darauf sitzt das Adernmuster, damit es
        // unabhaengig von der Brockengroesse gleich viele Baender hat.
        vRockDir = normalize(transformed);
        // Jede Instanz bekommt ihr eigenes Muster. Der Versatz kommt aus der
        // Instanzlage — die ist feldlokal und wandert nicht mit dem
        // verschobenen Ursprung, das Muster bleibt also stehen.
        vRockSeed = 0.0;
        #ifdef USE_INSTANCING
          vRockSeed = dot(instanceMatrix[3].xyz, vec3(0.317, 0.113, 0.271));
        #endif`),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
        uniform vec3 uRockSun;
        uniform vec3 uRockRim;
        varying vec3 vRockBase;
        varying vec3 vRockVein;
        varying vec4 vRockMod;
        varying vec3 vRockPos;
        varying vec3 vRockDir;
        varying float vRockSeed;
        varying float vRockCavity;
        varying float vRockSize;
        varying float vRockFrostAmount;

        float rockHash(vec3 p) {
          p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        float rockNoise(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(rockHash(i), rockHash(i + vec3(1,0,0)), f.x),
                mix(rockHash(i + vec3(0,1,0)), rockHash(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(rockHash(i + vec3(0,0,1)), rockHash(i + vec3(1,0,1)), f.x),
                mix(rockHash(i + vec3(0,1,1)), rockHash(i + vec3(1,1,1)), f.x), f.y), f.z);
        }

        /**
         * Adernmaske: duenne Baender dort, wo das Rauschen seine Mitte
         * kreuzt. Im Fragment gerechnet, nicht je Vertex — auf einem Brocken
         * mit 320 Dreiecken wuerden aus Adern sonst Polygonflecken.
         */
        float rockVeinMask(vec3 dir, float seed) {
          vec3 p = dir * ${kb.toFixed(2)} + seed;
          // Gestaucht in eine Richtung: Adern ziehen sich, statt zu tupfen.
          p.y *= 0.4;
          float n = rockNoise(p) * 0.62 + rockNoise(p * 2.3) * 0.38;
          float band = 1.0 - min(abs(n - 0.5) * ${Bb.toFixed(1)}, 1.0);
          return band * band;
        }

        /**
         * Anstieg des Rauschens — analytisch, nicht abgetastet.
         *
         * **Warum das der groesste Posten des ganzen Shaders war:** die
         * Vorgaengerfassung hat das Rauschen viermal ausgewertet (Wert plus
         * drei Vorwaertsdifferenzen). Jede Auswertung sind acht Hashes, macht
         * zweiunddreissig je Oktave — bei fuenf Oktaven einhundertsechzig
         * Hashes je Bildpunkt, nur fuer das Relief.
         *
         * Dabei ist der Gradient von Wertrauschen in geschlossener Form
         * bekannt: dieselben acht Eckwerte, aus denen der Wert entsteht,
         * liefern auch die Ableitung. Acht Hashes statt zweiunddreissig, und
         * das Rauschfeld bleibt dasselbe — es ist derselbe Hash auf demselben
         * Gitter, nur anders ausgewertet.
         *
         * Nebenbei wird der Gradient dadurch *richtig*: die Differenz lief
         * ueber eine halbe Gitterzelle und nur nach vorn, glaettete also die
         * Neigung und verschob sie um eine Viertelzelle.
         */
        vec3 rockGradient(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          // Glaettung und ihre Ableitung — dieselbe Kurve wie in rockNoise.
          vec3 u = f * f * (3.0 - 2.0 * f);
          vec3 du = 6.0 * f * (1.0 - f);

          float a = rockHash(i);
          float b = rockHash(i + vec3(1, 0, 0));
          float c = rockHash(i + vec3(0, 1, 0));
          float d = rockHash(i + vec3(1, 1, 0));
          float e = rockHash(i + vec3(0, 0, 1));
          float g = rockHash(i + vec3(1, 0, 1));
          float h = rockHash(i + vec3(0, 1, 1));
          float k = rockHash(i + vec3(1, 1, 1));

          float k1 = b - a;
          float k2 = c - a;
          float k3 = e - a;
          float k4 = a - b - c + d;
          float k5 = a - c - e + h;
          float k6 = a - b - e + g;
          float k7 = -a + b + c - d + e - g - h + k;

          return du * vec3(
            k1 + k4 * u.y + k6 * u.z + k7 * u.y * u.z,
            k2 + k4 * u.x + k5 * u.z + k7 * u.z * u.x,
            k3 + k5 * u.y + k6 * u.x + k7 * u.x * u.y);
        }`).replace("#include <color_fragment>",`#include <color_fragment>
        float veinMask = clamp(rockVeinMask(vRockDir, vRockSeed) * vRockMod.x, 0.0, 1.0);
        // Ausgefranst: eine glatte Maske liest sich als Anstrich. Erz sitzt in
        // Spalten und Koernern, also frisst feines Rauschen die Raender an.
        veinMask *= 0.45 + 1.0 * rockNoise(vRockPos * ${zb.toFixed(2)});
        vec3 rockColor = mix(vRockBase, vRockVein, veinMask);
        diffuseColor.rgb *= rockColor;
        float rockDist = length(vViewPosition);
        float rockDust = 1.0 - smoothstep(${Lb.toFixed(1)}, ${Ib.toFixed(1)}, rockDist);
        if (rockDust > 0.01) {
          diffuseColor.rgb *= 1.0 + rockDust * ${Db.toFixed(2)}
            * (rockNoise(vRockPos * ${Pb.toFixed(2)}) - 0.5);
        }`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
        roughnessFactor = mix(vRockMod.z, vRockMod.z * 0.6, veinMask);
        // Streuung in der Rauheit: erst dadurch wandern beim Taumeln
        // Glanzflecken ueber die Flanke, statt dass alles gleich stumpf bleibt.
        //
        // Die Klammer ist nicht Sparsamkeit, sondern Buchhaltung: jenseits von
        // GLOSS_FAR ist rockGloss exakt null, das Rauschen wird also mit null
        // multipliziert — und trotzdem ausgewertet. Auf jedem Fernbrocken sind
        // das acht Hashes fuer ein Ergebnis, das feststeht.
        float rockGloss = 1.0 - smoothstep(${Fb.toFixed(1)}, ${Ob.toFixed(1)}, rockDist);
        if (rockGloss > 0.01) {
          roughnessFactor = clamp(
            roughnessFactor * (1.0 + rockGloss * ${Ub.toFixed(2)}
              * (rockNoise(vRockPos * ${Nb.toFixed(2)}) - 0.5)),
            0.06, 1.0);
        }`).replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
        metalnessFactor = vRockMod.w * veinMask;`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
        // Relief in der Normale — die Geometrie bleibt unberuehrt. Nur der
        // Anteil tangential zur Flaeche kippt die Normale; der radiale wuerde
        // sie bloss verkuerzen.
        vec3 rockGrad = vec3(0.0);
${Cb.map(i=>{const r=i.sizeTo>i.sizeFrom?`
          fade *= smoothstep(${i.sizeFrom.toFixed(1)}, ${i.sizeTo.toFixed(1)}, vRockSize);`:"";return`        {
          float fade = 1.0 - smoothstep(${i.near.toFixed(1)}, ${i.far.toFixed(1)}, rockDist);${r}
          if (fade > 0.01) rockGrad += (fade * ${i.strength.toFixed(2)}) * rockGradient(vRockPos * ${i.scale.toFixed(3)});
        }`}).join(`
`)}
        rockGrad -= dot(rockGrad, normal) * normal;
        normal = normalize(normal - rockGrad);

        // Reif auf der Sonnenseite. Erst hier, weil die Normale davor noch
        // nicht steht — und ohne Normale gibt es keine Sonnenseite.
        if (vRockFrostAmount > 0.001) {
          float rockLit = max(dot(normal, uRockSun), 0.0);
          float rockFrost = vRockFrostAmount * pow(rockLit, 1.6);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.80, 0.89, 0.96), rockFrost * 0.55);
          roughnessFactor = mix(roughnessFactor, 0.20, rockFrost * 0.7);
        }`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
        totalEmissiveRadiance += vRockVein * (veinMask * vRockMod.y)
          + rockColor * ${Vb.toFixed(3)};

        // Gegenlichtsaum: streifend getroffener Staub ueber der Kante streut
        // nach vorn. Nur bei Gegenlicht, sonst leuchtete jeder Umriss.
        vec3 rockView = normalize(vViewPosition);
        float rockEdge = pow(1.0 - clamp(dot(normal, rockView), 0.0, 1.0), 3.5);
        float rockBack = clamp(-dot(rockView, uRockSun), 0.0, 1.0);
        totalEmissiveRadiance += uRockRim * rockEdge * rockBack * rockBack
          * (0.35 + 0.65 * rockColor);`).replace("#include <aomap_fragment>",`#include <aomap_fragment>
        // Muldentiefe als Verdeckung, nicht als Farbe. Eine dunklere *Farbe*
        // in der Mulde bleibt gleich dunkel, egal wo die Sonne steht; eine
        // Mulde nimmt aber Licht weg, und zwar vor allem das ringsum
        // einfallende. Deshalb trifft es das indirekte Licht voll und das
        // direkte nur zu einem Drittel.
        float rockAo = 1.0 - vRockCavity * 0.75;
        reflectedLight.indirectDiffuse *= rockAo;
        reflectedLight.indirectSpecular *= rockAo * rockAo;
        float rockDirectAo = mix(1.0, rockAo, 0.35);
        reflectedLight.directDiffuse *= rockDirectAo;
        reflectedLight.directSpecular *= rockDirectAo;`)},s.customProgramCacheKey=()=>"privateer-rock",s}function Zb(s,e,t=1.6){s.envMap=e,s.envMapIntensity=t,s.needsUpdate=!0}class fh{mesh;rock;vein;mod;frost;matrix=new ye;scaleVector=new S;constructor(e,t,n){this.rock=new Ks(new Float32Array(n*3),3),this.vein=new Ks(new Float32Array(n*3),3),this.mod=new Ks(new Float32Array(n*4),4),this.frost=new Ks(new Float32Array(n),1),e.setAttribute("aRock",this.rock),e.setAttribute("aVein",this.vein),e.setAttribute("aRockMod",this.mod),e.setAttribute("aRockFrost",this.frost),this.mesh=new Rd(e,t,n),this.mesh.name="RockBatch",this.mesh.castShadow=!0,this.mesh.receiveShadow=!0}setTransform(e,t,n,i){this.scaleVector.set(i,i,i),this.matrix.compose(t,n,this.scaleVector),this.mesh.setMatrixAt(e,this.matrix)}hide(e){this.matrix.makeScale(0,0,0),this.mesh.setMatrixAt(e,this.matrix)}setMineral(e,t,n,i=0){const r=ii[t];wa.setHex(r.rock).multiplyScalar(n),i!==0&&wa.offsetHSL(i*$b,i*Kb,0),Zo.setHex(r.vein),this.rock.setXYZ(e,wa.r,wa.g,wa.b),this.vein.setXYZ(e,Zo.r,Zo.g,Zo.b),this.mod.setXYZW(e,Wb[t],r.veinEmissive?.5:0,Xb[t]??.95,Gb[t]??0),this.frost.setX(e,qb[t]??0),this.rock.needsUpdate=!0,this.vein.needsUpdate=!0,this.mod.needsUpdate=!0,this.frost.needsUpdate=!0}flush(){this.mesh.instanceMatrix.needsUpdate=!0}dispose(){this.mesh.geometry.dispose(),this.mesh.dispose()}}const Qb={count:420,innerRadius:260,outerRadius:4500,minRadius:2,maxRadius:420,seed:4711,respawnDelay:25,maxDrift:6},Jb=1.15,jb=1.03,ph=Xi.large.minRadius,eE=14;function Cp(s){const e=s/eE;return 1+Math.floor(e*e)}const mh=[{size:"pebble",variants:5,detail:2},{size:"small",variants:8,detail:3},{size:"medium",variants:6,detail:4}],tE=[4,2],nE=[5,3],Pp=8,Lp=.12,iE=6,sE=3.2,Ip=1.7,rE=6e3,Dp=new S,Np=new S;class aE extends Av{grow=null;trigger=0;whenClose(e,t){this.trigger=e,this.grow=t}update(e){if(this.grow&&(Dp.setFromMatrixPosition(e.matrixWorld),Np.setFromMatrixPosition(this.matrixWorld),Dp.distanceTo(Np)<this.trigger)){const t=this.grow;this.grow=null,t()}super.update(e)}}function Up(s,e){const t=s==="huge"||s==="large"?["cratered","binary","cratered","slab"]:s==="medium"?["cratered","slab","splinter","binary","shard"]:["shard","splinter","slab","shard","splinter","cratered"];return t[Math.min(Math.floor(e*t.length),t.length-1)]}function Fp(s){let e=0;for(const n of Rp)e+=ii[n].frequency;let t=s*e;for(const n of Rp)if(t-=ii[n].frequency,t<=0)return n;return"rock"}const ui=new S,rn=new S,Ds=new S,Aa=new S,Ns=new S,gh=new S,Op=new S,kp=new S,Bp=new S,zp=new S,Ni=new tt,Vp=new ni;class oE extends Yt{count;options;rng;material;positions=[];rotations=[];axes=[];spins=[];velocities=[];radii=[];sizes=[];shapes=[];minerals=[];mined=[];generations=[];hitpoints=[];maxHitpoints=[];respawn=[];parts=[];slots=[];nodes=[];shades=[];tints=[];layer=0;moving=[];soloIndices=[];pending=[];hit={index:-1,point:new S,distance:0,radius:0};lastSurface=0;lastLocalRadius=0;constructor(e={}){super();const t={...Qb,...e};this.options=t,this.count=t.count,this.name="AsteroidField",this.rng=xc(t.seed),this.material=Yb(),this.drawSizes(),this.placeAll(),this.buildMeshes(),this.writeAll()}drawSizes(){const e=this.options,t=Ab.filter(i=>Xi[i].maxRadius>=e.minRadius&&Xi[i].minRadius<=e.maxRadius),n=t.reduce((i,r)=>i+Xi[r].frequency,0);for(let i=0;i<this.count;i++){this.sizes.push(this.drawSize(t,n)),this.radii.push(this.drawRadius(this.sizes[i])),this.minerals.push(Fp(this.rng())),this.mined.push(0),this.generations.push(0);const r=Cp(this.radii[i]);this.hitpoints.push(r),this.maxHitpoints.push(r),this.respawn.push(0),this.positions.push(new S),this.rotations.push(new tt),this.axes.push(new S),this.spins.push(0),this.velocities.push(new S),this.parts.push([]),this.slots.push(0),this.nodes.push(null),this.spinAndDrift(i)}}drawSize(e,t){let n=this.rng()*t;for(const i of e)if(n-=Xi[i].frequency,n<=0)return i;return e[e.length-1]??"pebble"}drawRadius(e){const t=this.options,n=Xi[e],i=Math.max(n.minRadius,t.minRadius),r=Math.min(n.maxRadius,t.maxRadius),a=.04+.96*Math.pow(this.rng(),1.35);return Math.max(i,Math.min(r,i+(r-i)*a))}spinAndDrift(e){const t=this.rng,n=this.options,i=1/(1+this.radii[e]/40);this.axes[e].set(t()*2-1,t()*2-1,t()*2-1).normalize(),this.spins[e]=(t()*2-1)*.28*i,Vp.set(t()*Math.PI*2,t()*Math.PI*2,t()*Math.PI*2),this.rotations[e].setFromEuler(Vp),this.velocities[e].set(t()*2-1,(t()*2-1)*.4,t()*2-1).normalize().multiplyScalar(n.maxDrift*Math.pow(t(),1.5)*i)}placeAll(){const e=[...Array(this.count).keys()].sort((n,i)=>this.radii[i]-this.radii[n]),t=[];for(const n of e){const i=this.radii[n]>=ph?60:12;for(let r=0;r<i&&(this.samplePosition(n),!this.isClear(n,t));r++);t.push(n)}}samplePosition(e){const t=this.options,n=this.rng,i=this.radii[e],r=i>=ph,a=Math.min(Math.max(t.innerRadius,i*1.7+140),Math.max(t.outerRadius*.85,t.innerRadius)),o=r?Math.max(a,t.outerRadius*.78):Math.max(a,t.outerRadius),l=n()*2-1,c=n()*Math.PI*2,h=Math.sqrt(Math.max(0,1-l*l));ui.set(Math.cos(c)*h,l*.42,Math.sin(c)*h).normalize();const u=r?Math.pow(n(),.6):Math.cbrt(n());this.positions[e].copy(ui).multiplyScalar(a+(o-a)*u)}isClear(e,t){const n=this.positions[e],i=this.radii[e];for(const r of t){const a=i+this.radii[r],o=a+Math.max(8,a*.12);if(n.distanceToSquared(this.positions[r])<o*o)return!1}return!0}buildMeshes(){const e=this.options.seed,t=mh.map((o,l)=>{const c=[];for(let h=0;h<o.variants;h++)c.push(new wp(Up(o.size,h/o.variants),e*(31+l*16)+h*17+3));return c}),n=[],i=new Map;for(let o=0;o<this.count;o++){if(this.radii[o]>=ph){n.push(-1);continue}const l=Math.max(mh.findIndex(d=>d.size===this.sizes[o]),0),c=t[l],h=Math.min(Math.floor(this.rng()*c.length),c.length-1),u=l*100+h;n.push(u),i.set(u,(i.get(u)??0)+1),this.shapes[o]=c[h]}const r=new Map,a=new Map;for(const[o,l]of i){const c=Math.floor(o/100),h=t[c][o%100],u=new fh(Ap(h,mh[c].detail),this.material,l);u.mesh.frustumCulled=!1,r.set(o,u),this.moving.push(u),this.add(u.mesh)}for(const o of t)for(const l of o)l.releaseSamples();for(let o=0;o<this.count;o++){const l=n[o];if(l<0){this.buildSolo(o);continue}const c=a.get(l)??0;a.set(l,c+1),this.parts[o]=[r.get(l)],this.slots[o]=c}}buildSolo(e){const t=this.sizes[e]==="huge",n=new wp(Up(this.sizes[e],this.rng()),this.options.seed*131+e*7+61,!0);this.shapes[e]=n;const i=new aE;i.name="Asteroid";const r=t?nE:tE,a=[];for(let o=0;o<r.length;o++){const l=new fh(Ap(n,r[o]),this.material,1);l.setTransform(0,Aa.set(0,0,0),Ni.identity(),1),l.flush(),a.push(l),i.addLevel(l.mesh,o===0?0:this.radii[e]*Pp,Lp)}if(this.parts[e]=a,this.slots[e]=0,this.nodes[e]=i,this.soloIndices.push(e),this.add(i),t){const o=this.radii[e];i.whenClose(o*sE,()=>this.growFine(e))}else n.releaseSamples()}growFine(e){this.nodes[e]&&this.pending.push({index:e,build:new Pg(this.shapes[e],iE)})}advanceBuilds(){const e=this.pending[0];e&&(e.build.advance(rE),e.build.done&&(this.pending.shift(),this.attachFine(e.index,e.build)))}attachFine(e,t){const n=this.nodes[e];if(!n)return;const i=new fh(t.finish(),this.material,1);i.setTransform(0,Aa.set(0,0,0),Ni.identity(),1),i.flush(),i.setMineral(0,this.minerals[e],this.shades[e],this.tints[e]),i.mesh.layers.set(this.layer),this.parts[e].push(i);const r=n.levels[0];r&&(r.distance=this.radii[e]*Ip),n.addLevel(i.mesh,0,Lp),this.shapes[e].releaseSamples()}writeAll(){for(let e=0;e<this.count;e++)this.writeAppearance(e),this.writeTransform(e);for(const e of this.moving)e.flush()}writeAppearance(e){const t=.55+this.rng()*.45,n=this.rng()*2-1;this.shades[e]=t,this.tints[e]=n;for(const i of this.parts[e])i.setMineral(this.slots[e],this.minerals[e],t,n)}writeTransform(e){const t=this.nodes[e],n=this.hitpoints[e]>0;if(t){t.visible=n,t.position.copy(this.positions[e]),t.quaternion.copy(this.rotations[e]),t.scale.setScalar(this.radii[e]);return}const i=this.parts[e][0];if(i){if(!n){i.hide(this.slots[e]);return}i.setTransform(this.slots[e],this.positions[e],this.rotations[e],this.radii[e])}}setLayer(e){this.layer=e,this.traverse(t=>t.layers.set(e))}setEnvironment(e){Zb(this.material,e)}setSunViewDirection(e){this.material.rockSun.value.copy(e)}findShadowFocus(e,t){let n=-1,i=t;const r=this.position.x-e.x,a=this.position.y-e.y,o=this.position.z-e.z;for(const l of this.soloIndices){if(this.hitpoints[l]<=0)continue;const c=this.positions[l],h=c.x+r,u=c.y+a,d=c.z+o,f=Math.max(Math.sqrt(h*h+u*u+d*d)-this.radii[l],0);f>=i||(i=f,n=l)}return n}update(e){this.advanceBuilds();for(let t=0;t<this.count;t++){if(this.hitpoints[t]<=0){this.respawn[t]-=e,this.respawn[t]<=0&&this.reseed(t);continue}Ni.setFromAxisAngle(this.axes[t],this.spins[t]*e),this.rotations[t].premultiply(Ni).normalize(),this.drift(t,e),this.writeTransform(t)}for(const t of this.moving)t.flush()}drift(e,t){const n=this.positions[e],i=this.velocities[e];n.addScaledVector(i,t);const r=this.options.outerRadius*Jb,a=n.length();if(a<=r||a===0)return;ui.copy(n).divideScalar(a);const o=i.dot(ui);o>0&&i.addScaledVector(ui,-2*o)}reseed(e){this.radii[e]=this.drawRadius(this.sizes[e]),this.samplePosition(e),this.spinAndDrift(e),this.hitpoints[e]=Cp(this.radii[e]),this.maxHitpoints[e]=this.hitpoints[e],this.respawn[e]=0,this.minerals[e]=Fp(this.rng()),this.mined[e]=0,this.generations[e]=this.generations[e]+1,this.retuneLevels(e),this.writeAppearance(e),this.writeTransform(e)}retuneLevels(e){const t=this.nodes[e];if(!t)return;const n=this.radii[e],i=t.levels,r=i.length-1;for(let a=0;a<i.length;a++)a===0?i[a].distance=0:a===r?i[a].distance=n*Pp:i[a].distance=n*Ip}isAlive(e){return this.hitpoints[e]>0}getIntegrity(e){return Math.max(this.hitpoints[e]/this.maxHitpoints[e],0)}getVelocity(e,t){return t.copy(this.velocities[e])}getRadius(e){return this.radii[e]}getCenter(e,t){return t.copy(this.positions[e]).add(this.position)}getOrientation(e,t){return t.copy(this.rotations[e])}getMineral(e){return this.minerals[e]??"rock"}getSizeClass(e){return this.sizes[e]??"pebble"}isLandable(e){return Xi[this.getSizeClass(e)].landable}getGeneration(e){return this.generations[e]??0}getTotalTons(e){return Rb(this.getRadius(e),this.getMineral(e))}getRemainingTons(e){return this.isAlive(e)?Math.max(this.getTotalTons(e)-(this.mined[e]??0),0):0}mine(e,t){const n=this.getRemainingTons(e),i=Math.min(Math.max(t,0),n);return this.mined[e]=(this.mined[e]??0)+i,i}damage(e,t){if(this.hitpoints[e]<=0||(this.hitpoints[e]-=t,this.hitpoints[e]>0))return!1;this.hitpoints[e]=0,this.respawn[e]=this.options.respawnDelay,this.writeTransform(e);for(const n of this.parts[e])n.flush();return!0}sampleSurface(e,t,n){if(!this.isAlive(e))return!1;this.getCenter(e,Aa),ui.copy(t).sub(Aa);const i=ui.length();if(i<1e-4)return!1;ui.divideScalar(i);const r=this.shapes[e],a=this.radii[e];Ni.copy(this.rotations[e]).invert(),rn.copy(ui).applyQuaternion(Ni),n.point.copy(Aa).addScaledVector(ui,r.radius(rn.x,rn.y,rn.z)*a),Ns.set(0,0,1),Math.abs(rn.z)>.9&&Ns.set(1,0,0),Ns.crossVectors(Ns,rn).normalize(),gh.crossVectors(rn,Ns).normalize();const o=.03;return this.surfacePoint(r,rn,Ns,o,Op),this.surfacePoint(r,rn,Ns,-o,kp),this.surfacePoint(r,rn,gh,o,Bp),this.surfacePoint(r,rn,gh,-o,zp),n.normal.crossVectors(Op.sub(kp),Bp.sub(zp)),n.normal.lengthSq()<1e-14&&n.normal.copy(rn),n.normal.normalize(),n.normal.dot(rn)<0&&n.normal.negate(),n.normal.applyQuaternion(this.rotations[e]),!0}surfacePoint(e,t,n,i,r){return r.copy(t).addScaledVector(n,i).normalize(),r.multiplyScalar(e.radius(r.x,r.y,r.z))}hitSegment(e,t,n,i=0){let r=n,a=-1,o=0;const l=this.position.x-e.x,c=this.position.y-e.y,h=this.position.z-e.z,u=t.x,d=t.y,f=t.z;for(let p=0;p<this.count;p++){if(this.hitpoints[p]<=0)continue;const _=this.positions[p],m=_.x+l,g=_.y+c,b=_.z+h,E=m*u+g*d+b*f,M=this.radii[p]*jb+i;if(E<-M||E>r+M)continue;const w=m*m+g*g+b*b-E*E;if(w>M*M)continue;const A=Math.sqrt(M*M-w),C=Math.min(E+A,r);if(C<=0)continue;const x=Math.max(E-A,0);if(x>C)continue;const T=this.march(p,e,t,x,C,i);T<0||(r=T,a=p,o=this.lastLocalRadius)}return a<0?null:(this.hit.index=a,this.hit.distance=r,this.hit.radius=o,this.hit.point.copy(t).multiplyScalar(r).add(e),this.hit)}march(e,t,n,i,r,a){const o=this.shapes[e],l=this.radii[e];Ni.copy(this.rotations[e]).invert(),rn.copy(t).sub(this.position).sub(this.positions[e]).applyQuaternion(Ni).divideScalar(l),Ds.copy(n).applyQuaternion(Ni);const c=a/l,h=i/l,u=r/l;if(this.depth(o,h,c)<=0)return this.lastLocalRadius=this.lastSurface*l,i;const d=28,f=(u-h)/d;if(f<=0)return-1;for(let p=1;p<=d;p++){if(this.depth(o,h+f*p,c)>0)continue;let _=h+f*(p-1),m=h+f*p;for(let g=0;g<12;g++){const b=(_+m)*.5;this.depth(o,b,c)>0?_=b:m=b}return this.depth(o,m,c),this.lastLocalRadius=this.lastSurface*l,m*l}return-1}depth(e,t,n){const i=rn.x+Ds.x*t,r=rn.y+Ds.y*t,a=rn.z+Ds.z*t,o=Math.sqrt(i*i+r*r+a*a);return o<1e-6?(this.lastSurface=e.radius(Ds.x,Ds.y,Ds.z),-1):(this.lastSurface=e.radius(i/o,r/o,a/o),o-(this.lastSurface+n))}dispose(){const e=new Set;for(const t of this.parts)for(const n of t)e.has(n)||(e.add(n),n.dispose());this.material.dispose()}}const lE={count:7e3,extent:260,size:.15,seed:90210},cE=.06,Hp=.2,hE=.92,uE=`
  uniform float uSize;
  uniform float uHalf;
  uniform float uScale;
  uniform vec3 uCenter;
  varying float vFade;

  void main() {
    // Der Umschlag steht hier und nicht auf der CPU. Dieselbe Formel — GLSL
    // rechnet mod() ebenfalls als x - y*floor(x/y) —, aber das Lagefeld bleibt
    // dadurch unveraendert: statt 84 Kilobyte je Bild geht ein einziger
    // Vektor zur GPU. Die Genauigkeit aendert sich nicht, das Attribut war
    // ohnehin schon float32.
    float span = uHalf * 2.0;
    vec3 world = uCenter - uHalf + mod(position - uCenter + uHalf, span);
    vec4 view = viewMatrix * vec4(world, 1.0);
    float dist = length(view.xyz);
    // Innen aufblenden, aussen ausblenden: der Umschlagrand liegt im
    // ausgeblendeten Bereich und ist damit unsichtbar.
    vFade = smoothstep(uHalf * ${cE}, uHalf * ${Hp}, dist)
          * (1.0 - smoothstep(uHalf * ${Hp}, uHalf * ${hE}, dist));
    gl_Position = projectionMatrix * view;
    // Groessenabnahme mit der Entfernung, aber nie unter einen Bildpunkt:
    // Koerner unterhalb der Pixelgroesse flimmern nur noch.
    gl_PointSize = max(uScale * uSize / max(dist, 0.001), 1.0);
  }
`,dE=`
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFade;

  void main() {
    // Rundes Korn mit weichem Rand — ein Quadrat verraet sofort, dass hier
    // Punkte gezeichnet werden.
    vec2 d = gl_PointCoord - vec2(0.5);
    float r = dot(d, d);
    if (r > 0.25) discard;
    float soft = 1.0 - smoothstep(0.06, 0.25, r);
    gl_FragColor = vec4(uColor, uOpacity * vFade * soft);
    #include <colorspace_fragment>
  }
`;class fE extends ro{half;array;constructor(e={}){const t={...lE,...e},n=xc(t.seed),i=new Float32Array(t.count*3);for(let a=0;a<i.length;a++)i[a]=(n()-.5)*t.extent;const r=new xt;r.setAttribute("position",new at(i,3)),r.boundingSphere=null,super(r,new Et({uniforms:{uSize:{value:t.size},uHalf:{value:t.extent*.5},uCenter:{value:new S},uScale:{value:300},uColor:{value:new te(.62,.6,.56)},uOpacity:{value:.5}},vertexShader:uE,fragmentShader:dE,transparent:!0,depthWrite:!1,blending:qt})),this.name="AsteroidDust",this.frustumCulled=!1,this.half=t.extent*.5,this.array=i}setViewportHeight(e,t){const n=e/(2*Math.tan(t*Math.PI/360));this.material.uniforms.uScale.value=n}update(e){this.material.uniforms.uCenter.value.copy(e)}wrapped(e,t){const n=this.material.uniforms.uCenter.value,i=this.half,r=i*2,a=this.array;return t.set(_h(a[e*3],n.x,i,r),_h(a[e*3+1],n.y,i,r),_h(a[e*3+2],n.z,i,r))}dispose(){this.geometry.dispose(),this.material.dispose()}}function _h(s,e,t,n){const i=s-e+t;return e-t+i-Math.floor(i/n)*n}const pE=2.2,Kl=100;function Gp(s){return Math.tan(s*Math.PI/180)*Kl}function mE(s){const e=s.sunColor??new te(16774112),t=s.sunRadiance??26,n=s.planetColor??new te(5073807),i=s.planetAngularRadius??15,r=new fc;r.background=s.skyColor??new te(329485);const a=new Me(new Dn(Gp(pE),16,12),new Ot({color:new te(e.r*t,e.g*t,e.b*t),toneMapped:!1}));a.name="EnvSun",a.position.copy(s.sunDirection).normalize().multiplyScalar(Kl),r.add(a);const o=new Me(new Dn(Gp(i),32,24),new Qe({color:n,roughness:1,metalness:0}));o.name="EnvPlanet",o.position.copy(s.planetDirection).normalize().multiplyScalar(Kl),r.add(o);const l=new Nd(e,3.2);return l.name="EnvSunLight",l.position.copy(s.sunDirection).normalize().multiplyScalar(Kl*4),l.target=o,r.add(l),r}function gE(s){s.traverse(e=>{const t=e;t.geometry&&t.geometry.dispose();const n=t.material;n&&!Array.isArray(n)&&n.dispose()})}function _E(s,e){const t=mE(e),n=new ea(s),i=n.fromScene(t,.015).texture;return n.dispose(),gE(t),i}const Ra=1024,Qo=512;function Ui(s,e,t,n){return s.copy(e).lerp(t,Math.min(1,Math.max(0,n)))}function vE(s){const e=document.createElement("canvas");e.width=Ra,e.height=Qo;const t=e.getContext("2d"),n=t.createImageData(Ra,Qo),i=n.data,r=new te(335946),a=new te(871034),o=new te(1933219),l=new te(12100209),c=new te(3107636),h=new te(7166514),u=new te(6051664),d=new te(15265522),f=new te,p=new te,_=s*13.37;for(let g=0;g<Qo;g++){const b=(.5-(g+.5)/Qo)*Math.PI,E=Math.cos(b),M=Math.sin(b);for(let w=0;w<Ra;w++){const A=(w+.5)/Ra*Math.PI*2,C=E*Math.cos(A),x=M,T=E*Math.sin(A),L=Ys(C*2.1+_,x*2.1+_,T*2.1+_,6,.52),P=Ys(C*3.4-_,x*3.4+_,T*3.4-_,3,.5);L<.47?Ui(p,r,a,(L-.36)/.11):L<.5?Ui(p,a,o,(L-.47)/.03):L<.52?Ui(p,o,l,(L-.5)/.02):L<.62?(Ui(f,h,c,P*1.4-.2),Ui(p,l,f,(L-.52)/.06)):L<.72?(Ui(f,h,c,P*1.4-.2),Ui(p,f,u,(L-.62)/.1)):Ui(p,u,d,(L-.72)/.08);const I=(Math.abs(b)-1.02)/.32+(P-.5)*.55;I>0&&(f.copy(p),Ui(p,f,d,I));const k=(g*Ra+w)*4;i[k]=Math.round(p.r*255),i[k+1]=Math.round(p.g*255),i[k+2]=Math.round(p.b*255),i[k+3]=255}}t.putImageData(n,0,0);const m=new un(e);return m.colorSpace=_t,m.anisotropy=4,m}function xE(s){const n=document.createElement("canvas");n.width=768,n.height=384;const i=n.getContext("2d"),r=i.createImageData(768,384),a=r.data,o=s*7.77+51.3;for(let c=0;c<384;c++){const h=(.5-(c+.5)/384)*Math.PI,u=Math.cos(h),d=Math.sin(h);for(let f=0;f<768;f++){const p=(f+.5)/768*Math.PI*2,_=u*Math.cos(p),m=u*Math.sin(p),g=Ys(_*3+o,d*7+o,m*3+o,5,.55),b=Math.max(0,Math.min(1,(g-.5)/.22))**1.4,E=(c*768+f)*4;a[E]=255,a[E+1]=255,a[E+2]=255,a[E+3]=Math.round(b*235)}}i.putImageData(r,0,0);const l=new un(n);return l.colorSpace=_t,l.anisotropy=4,l}class ME extends Yt{radius;clouds;constructor(e){super(),this.name="Planet",this.radius=e.radius,this.position.copy(e.position);const t=new Me(new Dn(e.radius,128,64),new Qe({map:vE(e.seed),roughness:.92,metalness:0}));t.name="PlanetSurface",this.add(t),this.clouds=new Me(new Dn(e.radius*1.012,96,48),new Qe({map:xE(e.seed),transparent:!0,depthWrite:!1,roughness:1,metalness:0})),this.clouds.name="PlanetClouds",this.add(this.clouds);const n=new Me(new Dn(e.radius*1.045,96,48),new Et({uniforms:{uColor:new ac(new te(7320831)),uSunDir:new ac(e.sunDirection.clone().normalize())},vertexShader:`
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
        `,transparent:!0,blending:qt,side:sn,depthWrite:!1}));n.name="PlanetAtmosphere",this.add(n)}update(e){this.rotation.y+=e*.0025,this.clouds.rotation.y+=e*.0011}}const vh=2e6;class SE extends ro{constructor(e=6e3,t=1337){const n=new Float32Array(e*3),i=new Float32Array(e*3),r=new Float32Array(e);let a=t>>>0;const o=()=>(a=Math.imul(a,1664525)+1013904223>>>0,a/4294967296);for(let h=0;h<e;h++){const u=o()*2-1,d=o()*Math.PI*2,f=Math.sqrt(Math.max(0,1-u*u));n[h*3+0]=Math.cos(d)*f*vh,n[h*3+1]=u*vh,n[h*3+2]=Math.sin(d)*f*vh;const p=Math.pow(o(),2.2),_=.25+p*1.35,m=o()*2-1,g=Math.max(0,m),b=Math.max(0,-m);i[h*3+0]=_*(1+g*.25-b*.22),i[h*3+1]=_*(1-Math.abs(m)*.06),i[h*3+2]=_*(1-g*.35+b*.2),r[h]=1+p*2.6}const l=new xt;l.setAttribute("position",new at(n,3)),l.setAttribute("aColor",new at(i,3)),l.setAttribute("aSize",new at(r,1));const c=new Et({uniforms:{uPixelRatio:{value:1}},vertexShader:`
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
      `,transparent:!0,blending:qt,depthWrite:!1});super(l,c),this.name="Starfield",this.frustumCulled=!1,this.renderOrder=-1e3,this.matrixAutoUpdate=!0}setPixelRatio(e){this.material.uniforms.uPixelRatio.value=e}update(e){this.position.copy(e)}}const xh=15e5,Mh=2048,Wp=4,Xp=1.35;function qp(s,e){const t=document.createElement("canvas");t.width=s,t.height=s;const n=t.getContext("2d"),i=n.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);for(const[a,o]of e)i.addColorStop(a,o);n.fillStyle=i,n.fillRect(0,0,s,s);const r=new un(t);return r.colorSpace=_t,r}const Sh=new S;class yE extends Yt{direction;light;lightTarget;constructor(e=new S(.42,.24,-1).normalize(),t=new te(16774112)){super(),this.name="Sun",this.direction=e.clone().normalize();const n=this.direction.clone().multiplyScalar(xh),i=new Jr(new er({map:qp(256,[[0,"rgba(255,255,255,1)"],[.28,"rgba(255,247,220,1)"],[.46,"rgba(255,214,140,0.55)"],[1,"rgba(255,180,90,0)"]]),color:16777215,blending:qt,transparent:!0,depthWrite:!1}));i.name="SunCore",i.position.copy(n),i.scale.setScalar(xh*.055),this.add(i);const r=new Jr(new er({map:qp(256,[[0,"rgba(255,242,215,0.9)"],[.1,"rgba(255,224,170,0.35)"],[.3,"rgba(255,194,115,0.09)"],[.65,"rgba(255,160,70,0.015)"],[1,"rgba(255,150,60,0)"]]),color:16777215,blending:qt,transparent:!0,depthWrite:!1}));r.name="SunHalo",r.position.copy(n),r.scale.setScalar(xh*.28),this.add(r);const a=new Fe;a.name="SunLightTarget",this.add(a),this.lightTarget=a,this.light=new Nd(t,3.2),this.light.name="SunLight",this.light.position.copy(this.direction).multiplyScalar(1e3),this.light.target=a,this.light.castShadow=!1,this.light.shadow.mapSize.set(Mh,Mh),this.light.shadow.bias=-6e-4,this.add(this.light);const o=new rx(1585743,525828,.18);o.name="SpaceFill",this.add(o)}update(e){this.position.copy(e)}focusShadow(e,t){Sh.copy(e).sub(this.position),this.lightTarget.position.copy(Sh),this.light.position.copy(Sh).addScaledVector(this.direction,t*Wp);const n=t*Xp,i=this.light.shadow.camera;i.left=-n,i.right=n,i.top=n,i.bottom=-n,i.near=t*.5,i.far=t*(Wp+Xp+1),i.updateProjectionMatrix(),this.light.shadow.normalBias=Math.max(.05,n*2/Mh*2.5),this.light.castShadow=!0}clearShadow(){this.light.castShadow&&(this.light.castShadow=!1,this.lightTarget.position.set(0,0,0),this.light.position.copy(this.direction).multiplyScalar(1e3))}}const Jo=-4.6,Fi=-.4,On=1.45,Kn=1.95,Oi=2.6,di=.75,mn=2.1,jo=5.8,Yn=1.7,At=2.3,cs=1,el=2,Vt=.08,bE=new Sn(1,1,1);function qe(s,e,t,n){const i=new Me(bE,e);return i.name=s,i.scale.set(t[0],t[1],t[2]),i.position.set(n[0],n[1],n[2]),i}function EE(){const s=new Fe;s.name="ShipInterior";const e=new Qe({color:6975606,roughness:.62,metalness:.38}),t=new Qe({color:2830389,roughness:.88,metalness:.12}),n=new Qe({color:4673109,roughness:.75,metalness:.25}),i=new Qe({color:1843236,roughness:.5,metalness:.5}),r=new Qe({color:3817287,roughness:.85,metalness:.05}),a=new Qe({color:2304046,roughness:.95,metalness:0}),o=new Qe({color:529178,emissive:3787007,emissiveIntensity:1.2,roughness:.4}),l=new Qe({color:1708550,emissive:16753710,emissiveIntensity:1,roughness:.4}),c=new Qe({color:398106,emissive:2792150,emissiveIntensity:1.2,roughness:.6}),h=new si({color:11195647,transparent:!0,opacity:.09,roughness:.03,metalness:0,ior:1.45,clearcoat:1,clearcoatRoughness:.02,depthWrite:!1,side:Kt}),u=new Ot({color:16711935,wireframe:!0}),d=(I,k,q)=>qe(I,u,k,q),f=Fi-Jo,p=(Jo+Fi)/2,_=Oi-Fi,m=(Fi+Oi)/2,g=jo-Oi,b=(Oi+jo)/2;s.add(qe("CockpitFloor",t,[On*2,Vt,f],[0,-Vt/2,p])),s.add(qe("CockpitSillL",e,[.1,.62,f],[-On-.05,.31,p])),s.add(qe("CockpitSillR",e,[.1,.62,f],[On+.05,.31,p])),s.add(qe("CockpitNosePanel",e,[On*2+.2,.62,.1],[0,.31,Jo-.05]));const E=new Me(new Dn(1,48,24,0,Math.PI*2,0,Math.PI/2),h);E.name="Canopy",E.scale.set(On+.07,1.34,f/2+.02),E.position.set(0,.6,p),E.renderOrder=2,s.add(E);const M=new eo(1,.022,8,40,Math.PI);[-1.15,-3.3].forEach((I,k)=>{const q=new Me(M,i);q.name=`CanopyRib${k}`,q.scale.set(On+.09,1.36,1),q.position.set(0,.6,I),s.add(q)});const w=(On*2-cs)/2;s.add(qe("CockpitRearWallL",e,[w,mn,Vt],[-1.95/2,mn/2,Fi])),s.add(qe("CockpitRearWallR",e,[w,mn,Vt],[(cs+w)/2,mn/2,Fi])),s.add(qe("CockpitRearLintel",e,[cs,mn-el,Vt],[0,(mn+el)/2,Fi])),s.add(qe("SeatBase",r,[.5,.42,.55],[0,.21,-.95])),s.add(qe("SeatPan",a,[.62,.1,.62],[0,.47,-.95]));const A=qe("SeatBack",a,[.62,.86,.12],[0,.95,-.62]);A.rotation.x=.13,s.add(A),s.add(qe("SeatHeadrest",a,[.34,.24,.12],[0,1.46,-.55])),s.add(qe("SeatArmL",r,[.09,.08,.45],[-.37,.62,-.92])),s.add(qe("SeatArmR",r,[.09,.08,.45],[.37,.62,-.92])),s.add(qe("ConsoleBody",e,[1.7,.52,.55],[0,.26,-2.05]));const C=qe("ConsoleTop",i,[1.66,.06,.62],[0,.58,-2]);C.rotation.x=.42,s.add(C);for(let I=-1;I<=1;I++){const k=qe(`ConsolePanel${I+2}`,I===0?o:l,[.44,.02,.3],[I*.55,.62,-1.99]);k.rotation.x=.42,s.add(k)}for(const I of[-1,1]){const k=qe(I<0?"ConsoleSideL":"ConsoleSideR",e,[.5,.55,1.3],[I*1.15,.275,-1.7]);s.add(k),s.add(qe(I<0?"ConsoleSideLampL":"ConsoleSideLampR",c,[.36,.02,1],[I*1.15,.56,-1.7]))}s.add(qe("CorridorFloor",t,[di*2+.2,Vt,_],[0,-Vt/2,m])),s.add(qe("CorridorCeiling",n,[di*2+.2,Vt,_],[0,mn+Vt/2,m])),s.add(qe("CorridorWallL",e,[Vt,mn,_],[-di,mn/2,m])),s.add(qe("CorridorWallR",e,[Vt,mn,_],[di,mn/2,m])),s.add(qe("CorridorStripL",c,[.05,.02,_-.4],[-di+.06,.02,m])),s.add(qe("CorridorStripR",c,[.05,.02,_-.4],[di-.06,.02,m]));const x=(Yn*2-cs)/2;s.add(qe("CabinFloor",t,[Yn*2,Vt,g],[0,-Vt/2,b])),s.add(qe("CabinCeiling",n,[Yn*2,Vt,g],[0,At+Vt/2,b])),s.add(qe("CabinWallL",e,[Vt,At,g],[-Yn,At/2,b])),s.add(qe("CabinWallR",e,[Vt,At,g],[Yn,At/2,b])),s.add(qe("CabinWallRear",e,[Yn*2,At,Vt],[0,At/2,jo])),s.add(qe("CabinFrontWallL",e,[x,At,Vt],[-2.2/2,At/2,Oi])),s.add(qe("CabinFrontWallR",e,[x,At,Vt],[(cs+x)/2,At/2,Oi])),s.add(qe("CabinFrontLintel",e,[cs,At-el,Vt],[0,(At+el)/2,Oi])),s.add(qe("Bunk",a,[.78,.42,1.95],[-1.2,.21,4.35])),s.add(qe("BunkLamp",c,[.06,.02,1.6],[-.79,.44,4.35])),s.add(qe("Locker",e,[.6,1.8,.5],[1.3,.9,3.2])),s.add(qe("LockerPanel",o,[.02,.24,.3],[.99,1.3,3.2])),s.add(qe("Crate",i,[.6,.6,.6],[1.25,.3,5.3]));const T=[["LightCockpit",10405119,3,[0,1.6,-2.3],9],["LightConsole",6277375,1.4,[0,.95,-1.75],3],["LightCorridor",16766624,2.2,[0,1.8,1.1],7],["LightCabin",13624575,4,[0,2,4.2],9]];for(const[I,k,q,O,X]of T){const B=new rr(k,q,X,2);B.name=I,B.position.set(O[0],O[1],O[2]),s.add(B)}const L=new Fe;L.name="Seat_Pilot",L.position.set(0,1.22,-.95),s.add(L);const P=new Fe;return P.name="Stand_Pilot",P.position.set(0,0,-.15),s.add(P),s.add(d("COL_Floor_Cockpit",[On*2+.2,.1,f],[0,-.05,p])),s.add(d("COL_Floor_Corridor",[di*2,.1,_],[0,-.05,m])),s.add(d("COL_Floor_Cabin",[Yn*2,.1,g],[0,-.05,b])),s.add(d("COL_Ceiling_Cockpit",[On*2+.2,.1,f],[0,Kn+.05,p])),s.add(d("COL_Ceiling_Corridor",[di*2,.1,_],[0,mn+.05,m])),s.add(d("COL_Ceiling_Cabin",[Yn*2,.1,g],[0,At+.05,b])),s.add(d("COL_Wall_Cockpit_L",[.1,Kn,f],[-On-.05,Kn/2,p])),s.add(d("COL_Wall_Cockpit_R",[.1,Kn,f],[On+.05,Kn/2,p])),s.add(d("COL_Wall_Cockpit_Front",[On*2+.2,Kn,.1],[0,Kn/2,Jo-.05])),s.add(d("COL_Wall_CockpitRear_L",[w,Kn,.1],[-1.95/2,Kn/2,Fi])),s.add(d("COL_Wall_CockpitRear_R",[w,Kn,.1],[(cs+w)/2,Kn/2,Fi])),s.add(d("COL_Wall_Corridor_L",[.1,mn,_],[-di,mn/2,m])),s.add(d("COL_Wall_Corridor_R",[.1,mn,_],[di,mn/2,m])),s.add(d("COL_Wall_CabinFront_L",[x,At,.1],[-2.2/2,At/2,Oi])),s.add(d("COL_Wall_CabinFront_R",[x,At,.1],[(cs+x)/2,At/2,Oi])),s.add(d("COL_Wall_Cabin_L",[.1,At,g],[-Yn,At/2,b])),s.add(d("COL_Wall_Cabin_R",[.1,At,g],[Yn,At/2,b])),s.add(d("COL_Wall_Cabin_Rear",[Yn*2,At,.1],[0,At/2,jo])),s.add(d("COL_Seat",[.66,1.6,.8],[0,.8,-.9])),s.add(d("COL_Console",[1.7,.66,.62],[0,.33,-2.03])),s.add(d("COL_Console_L",[.5,.58,1.3],[-1.15,.29,-1.7])),s.add(d("COL_Console_R",[.5,.58,1.3],[1.15,.29,-1.7])),s.add(d("COL_Bunk",[.78,.44,1.95],[-1.2,.22,4.35])),s.add(d("COL_Locker",[.6,1.8,.5],[1.3,.9,3.2])),s.add(d("COL_Crate",[.62,.62,.62],[1.25,.31,5.3])),s}const $p="Seat_Pilot",Kp="Stand_Pilot",TE="COL_";class wE extends Fe{interior;seat;stand;colliders=[];interiorListeners=new Set;constructor(e=EE()){super(),this.name="Ship",this.interior=e,this.seat=e,this.stand=e,this.setInterior(e)}setInterior(e){this.interior.parent===this&&this.remove(this.interior),this.interior=e,this.add(e);const t=e.getObjectByName($p),n=e.getObjectByName(Kp);if(!t)throw new Error(`ShipInterior: Marker "${$p}" fehlt`);if(!n)throw new Error(`ShipInterior: Marker "${Kp}" fehlt`);this.seat=t,this.stand=n,this.refreshColliders();for(const i of this.interiorListeners)i(e)}refreshColliders(){this.colliders=[],this.interior.traverse(e=>{e instanceof Me&&e.name.startsWith(TE)&&(e.visible=!1,this.colliders.push(e))})}onInteriorChange(e){return this.interiorListeners.add(e),e(this.interior),()=>{this.interiorListeners.delete(e)}}getInterior(){return this.interior}getSeatPilot(){return this.seat}getStandPilot(){return this.stand}getCollisionMeshes(){return this.colliders}}function AE(){return{main:0,lateral:0,vertical:0,pitch:0,yaw:0,roll:0,afterburner:!1}}const RE={mass:15e3,mainThrust:12e4,retroThrust:6e4,lateralThrust:52500,verticalThrust:45e3,afterburnerFactor:4,pitchAccel:2.4,yawAccel:2,rollAccel:3.2,maxAngularVelocity:1.5,angularBrakeFactor:1.35,maxSetSpeed:500,maxSpeed:850,setSpeedStep:10,setSpeedRate:60,arcade:{turnRate:1.25,rollRate:2.2,turnSmoothing:.07,grip:.25,accel:70,brake:110,strafeSpeed:60,boostSpeed:780,boostAccel:160}},yh=["arcade","assist","newton"],Yp={thrust:1,topSpeed:1,torque:1,yawBias:0,afterburner:!0},bh=.5,tl=.01;function tn(s,e,t){return s<e?e:s>t?t:s}class CE{constructor(e,t={}){this.ship=e,this.params={...RE,...t}}velocity=new S;angularVelocity=new S;inputs=AE();mode="arcade";setSpeed=0;fullStopActive=!1;arcadeSpeed=0;params;damage={...Yp};invQuat=new tt;stepQuat=new tt;axis=new S;rotStep=new S;velLocal=new S;accelLocal=new S;velTarget=new S;getParams(){return this.params}setDamage(e){this.damage={...Yp,...e}}getDamage(){return this.damage}get assistEnabled(){return this.mode!=="newton"}get isArcade(){return this.mode==="arcade"}getSpeed(){return this.velocity.length()}getForwardSpeed(){return this.axis.set(0,0,-1).applyQuaternion(this.ship.quaternion),this.velocity.dot(this.axis)}get fullStop(){return this.fullStopActive}adjustSetSpeed(e){e!==0&&(this.fullStopActive=!1),this.setSpeed=tn(this.setSpeed+e,0,this.params.maxSetSpeed)}setSetSpeed(e){this.setSpeed=tn(e,0,this.params.maxSetSpeed)}requestFullStop(){this.setSpeed=0,this.fullStopActive=!0}cancelFullStop(){this.fullStopActive=!1}cycleMode(){const e=yh[(yh.indexOf(this.mode)+1)%yh.length];return this.setMode(e),this.mode}setMode(e){e!==this.mode&&(this.mode=e,this.fullStopActive=!1,e==="arcade"&&(this.arcadeSpeed=Math.max(this.getForwardSpeed(),0),this.setSpeed=tn(this.arcadeSpeed,0,this.params.maxSetSpeed)))}clearInputs(){const e=this.inputs;e.main=0,e.lateral=0,e.vertical=0,e.pitch=0,e.yaw=0,e.roll=0,e.afterburner=!1}update(e){if(this.mode==="arcade"){this.integrateArcadeRotation(e),this.integrateArcadeTranslation(e);return}this.integrateRotation(e),this.integrateTranslation(e)}integrateArcadeRotation(e){const t=this.params.arcade,n=this.inputs,i=this.angularVelocity,r=t.turnRate*this.damage.torque,a=t.rollRate*this.damage.torque,o=1-Math.exp(-e/Math.max(t.turnSmoothing,1e-4));i.x+=(tn(n.pitch,-1,1)*r-i.x)*o,i.y+=(-tn(n.yaw,-1,1)*r-i.y)*o,i.z+=(-tn(n.roll,-1,1)*a-i.z)*o,this.applyRotationStep(e)}applyRotationStep(e){const t=this.angularVelocity;this.rotStep.set(t.x,t.y+this.damage.yawBias,t.z);const n=this.rotStep.length(),i=n*e;i<=1e-9||(this.axis.copy(this.rotStep).divideScalar(n),this.stepQuat.setFromAxisAngle(this.axis,i),this.ship.quaternion.multiply(this.stepQuat).normalize())}integrateArcadeTranslation(e){const t=this.params,n=t.arcade,i=this.inputs,r=this.damage,a=i.afterburner&&r.afterburner;a&&(this.fullStopActive=!1);const o=a?n.boostSpeed*r.topSpeed:this.fullStopActive?0:this.setSpeed*r.topSpeed,l=a?n.boostAccel*r.thrust:o>this.arcadeSpeed?n.accel*r.thrust:n.brake*r.thrust,c=o-this.arcadeSpeed;this.arcadeSpeed+=tn(c,-l*e,l*e),this.fullStopActive&&Math.abs(this.arcadeSpeed)<bh&&(this.arcadeSpeed=0,this.fullStopActive=!1),this.velTarget.set(tn(i.lateral,-1,1)*n.strafeSpeed*r.torque,tn(i.vertical,-1,1)*n.strafeSpeed*r.torque,-this.arcadeSpeed),this.velTarget.applyQuaternion(this.ship.quaternion);const h=1-Math.exp(-e/Math.max(n.grip,1e-4));this.velocity.lerp(this.velTarget,h);const u=t.maxSpeed*r.topSpeed,d=this.velocity.length();d>u&&this.velocity.multiplyScalar(u/d),this.ship.position.addScaledVector(this.velocity,e)}integrateRotation(e){const t=this.params,n=this.inputs,i=this.angularVelocity,r=this.damage.torque;i.x=this.stepAxis(i.x,tn(n.pitch,-1,1),t.pitchAccel*r,e),i.y=this.stepAxis(i.y,-tn(n.yaw,-1,1),t.yawAccel*r,e),i.z=this.stepAxis(i.z,-tn(n.roll,-1,1),t.rollAccel*r,e);const a=i.length();a>t.maxAngularVelocity&&i.multiplyScalar(t.maxAngularVelocity/a),this.applyRotationStep(e)}stepAxis(e,t,n,i){if(Math.abs(t)>tl)return e+t*n*i;if(!this.assistEnabled)return e;const r=n*this.params.angularBrakeFactor*i;return Math.abs(e)<=r?0:e-Math.sign(e)*r}integrateTranslation(e){const t=this.params,n=this.inputs,i=this.damage,r=t.mainThrust/t.mass*i.thrust,a=t.retroThrust/t.mass*i.thrust,o=t.lateralThrust/t.mass*i.torque,l=t.verticalThrust/t.mass*i.torque,c=n.afterburner&&i.afterburner;c&&(this.fullStopActive=!1),this.invQuat.copy(this.ship.quaternion).invert(),this.velLocal.copy(this.velocity).applyQuaternion(this.invQuat);const h=this.accelLocal.set(0,0,0),u=this.fullStopActive,d=u||this.assistEnabled,f=u?0:-this.setSpeed*i.topSpeed;if(Math.abs(n.lateral)>tl?h.x=tn(n.lateral,-1,1)*o:d&&(h.x=tn((0-this.velLocal.x)/e,-o,o)),Math.abs(n.vertical)>tl?h.y=tn(n.vertical,-1,1)*l:d&&(h.y=tn((0-this.velLocal.y)/e,-l,l)),c)h.z=-r*t.afterburnerFactor;else if(this.assistEnabled||u)h.z=tn((f-this.velLocal.z)/e,-r,a);else if(Math.abs(n.main)>tl){const m=tn(n.main,-1,1);h.z=m>0?-m*r:-m*a}u&&this.velocity.lengthSq()<bh*bh&&(this.velocity.set(0,0,0),h.set(0,0,0),this.fullStopActive=!1),h.applyQuaternion(this.ship.quaternion),this.velocity.addScaledVector(h,e);const p=t.maxSpeed*i.topSpeed,_=this.velocity.length();_>p&&this.velocity.multiplyScalar(p/_),this.ship.position.addScaledVector(this.velocity,e)}}function Zp(s,e){if(e===D_)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Ku||e===sg){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Ku)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function PE(s){const e=new Map,t=new Map,n=s.clone();return Lg(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Lg(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)Lg(s.children[n],e.children[n],t)}class Ig extends aa{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new UE(t)}),this.register(function(t){return new FE(t)}),this.register(function(t){return new XE(t)}),this.register(function(t){return new qE(t)}),this.register(function(t){return new $E(t)}),this.register(function(t){return new kE(t)}),this.register(function(t){return new BE(t)}),this.register(function(t){return new zE(t)}),this.register(function(t){return new VE(t)}),this.register(function(t){return new NE(t)}),this.register(function(t){return new HE(t)}),this.register(function(t){return new OE(t)}),this.register(function(t){return new WE(t)}),this.register(function(t){return new GE(t)}),this.register(function(t){return new IE(t)}),this.register(function(t){return new Qp(t,Ke.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Qp(t,Ke.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new KE(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=Xa.extractUrlBase(e);a=Xa.resolveURL(c,this.path)}else a=Xa.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new xg(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Dg){try{a[Ke.KHR_BINARY_GLTF]=new YE(e)}catch(u){i&&i(u);return}r=JSON.parse(a[Ke.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new lT(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case Ke.KHR_MATERIALS_UNLIT:a[u]=new DE;break;case Ke.KHR_DRACO_MESH_COMPRESSION:a[u]=new ZE(r,this.dracoLoader);break;case Ke.KHR_TEXTURE_TRANSFORM:a[u]=new QE;break;case Ke.KHR_MESH_QUANTIZATION:a[u]=new JE;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function LE(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Gt(s,e,t){const n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const Ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class IE{constructor(e){this.parser=e,this.name=Ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new te(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Nn);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Nd(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new rr(h),c.distance=u;break;case"spot":c=new ox(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),gi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class DE{constructor(){this.name=Ke.KHR_MATERIALS_UNLIT}getMaterialType(){return Ot}extendParams(e,t,n){const i=[];e.color=new te(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Nn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,_t))}return Promise.all(i)}}class NE{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=Gt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class UE{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?si:null}extendMaterialParams(e,t){const n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Se(r,r)}return Promise.all(i)}}class FE{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?si:null}extendMaterialParams(e,t){const n=Gt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class OE{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?si:null}extendMaterialParams(e,t){const n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class kE{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SHEEN}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?si:null}extendMaterialParams(e,t){const n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(t.sheenColor=new te(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Nn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,_t)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class BE{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?si:null}extendMaterialParams(e,t){const n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class zE{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_VOLUME}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?si:null}extendMaterialParams(e,t){const n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const r=n.attenuationColor||[1,1,1];return t.attenuationColor=new te().setRGB(r[0],r[1],r[2],Nn),Promise.all(i)}}class VE{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IOR}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?si:null}extendMaterialParams(e,t){const n=Gt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class HE{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?si:null}extendMaterialParams(e,t){const n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const r=n.specularColorFactor||[1,1,1];return t.specularColor=new te().setRGB(r[0],r[1],r[2],Nn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,_t)),Promise.all(i)}}class GE{constructor(e){this.parser=e,this.name=Ke.EXT_MATERIALS_BUMP}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?si:null}extendMaterialParams(e,t){const n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}}class WE{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?si:null}extendMaterialParams(e,t){const n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class XE{constructor(e){this.parser=e,this.name=Ke.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class qE{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class $E{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class Qp{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class KE{constructor(e){this.name=Ke.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==kn.TRIANGLES&&c.mode!==kn.TRIANGLE_STRIP&&c.mode!==kn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const p of u){const _=new ye,m=new S,g=new tt,b=new S(1,1,1),E=new Rd(p.geometry,p.material,d);for(let M=0;M<d;M++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,M),l.SCALE&&b.fromBufferAttribute(l.SCALE,M),E.setMatrixAt(M,_.compose(m,g,b));for(const M in l)if(M==="_COLOR_0"){const w=l[M];E.instanceColor=new Ks(w.array,w.itemSize,w.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&p.geometry.setAttribute(M,l[M]);Fe.prototype.copy.call(E,p),this.parser.assignFinalMaterial(E),f.push(E)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Dg="glTF",Ca=12,Jp={JSON:1313821514,BIN:5130562};class YE{constructor(e){this.name=Ke.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ca),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Dg)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Ca,r=new DataView(e,Ca);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===Jp.JSON){const c=new Uint8Array(e,Ca+a,o);this.content=n.decode(c)}else if(l===Jp.BIN){const c=Ca+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class ZE{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ke.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=ju[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=ju[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=$r[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const p in f.attributes){const _=f.attributes[p],m=l[p];m!==void 0&&(_.normalized=m)}u(f)},o,c,Nn,d)})})}}class QE{constructor(){this.name=Ke.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class JE{constructor(){this.name=Ke.KHR_MESH_QUANTIZATION}}class Ng extends ia{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*c,_=p-c,m=-2*f+3*d,g=f-d,b=1-m,E=g-d+u;for(let M=0;M!==o;M++){const w=a[_+M+o],A=a[_+M+l]*h,C=a[p+M+o],x=a[p+M]*h;r[M]=b*w+E*A+m*C+g*x}return r}}const jE=new tt;class eT extends Ng{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return jE.fromArray(r).normalize().toArray(r),r}}const kn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},$r={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},jp={9728:Ht,9729:Pt,9984:Q0,9985:Hl,9986:za,9987:$i},em={33071:Mi,33648:Ql,10497:Wn},Eh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ju={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},hs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},tT={CUBICSPLINE:void 0,LINEAR:Ka,STEP:$a},Th={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function nT(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Qe({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Gn})),s.DefaultMaterial}function Us(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function gi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function iT(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function sT(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function rT(s){let e;const t=s.extensions&&s.extensions[Ke.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+wh(t.attributes):e=s.indices+":"+wh(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+wh(s.targets[n]);return e}function wh(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function ed(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function aT(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const oT=new ye;class lT{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new LE,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new sx(this.options.manager):this.textureLoader=new hx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new xg(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Us(r,o,i),gi(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ke.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(Xa.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=Eh[i.type],o=$r[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new at(c,a,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=Eh[i.type],c=$r[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let _,m;if(f&&f!==u){const g=Math.floor(d/f),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count;let E=t.cache.get(b);E||(_=new c(o,g*f,i.count*f/h),E=new ug(_,f/h),t.cache.add(b,E)),m=new Qa(E,l,d%f/h,p)}else o===null?_=new c(i.count*l):_=new c(o,d,i.count*l),m=new at(_,l,p);if(i.sparse!==void 0){const g=Eh.SCALAR,b=$r[i.sparse.indices.componentType],E=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,w=new b(a[1],E,i.sparse.count*g),A=new c(a[2],M,i.sparse.count*l);o!==null&&(m=new at(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,x=w.length;C<x;C++){const T=w[C];if(m.setX(T,A[C*l]),l>=2&&m.setY(T,A[C*l+1]),l>=3&&m.setZ(T,A[C*l+2]),l>=4&&m.setW(T,A[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=p}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=jp[d.magFilter]||Pt,h.minFilter=jp[d.minFilter]||$i,h.wrapS=em[d.wrapS]||Wn,h.wrapT=em[d.wrapT]||Wn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Ht&&h.minFilter!==Pt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(_){const m=new Zt(_);m.needsUpdate=!0,d(m)}),t.load(Xa.resolveURL(u,r.path),p,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),gi(u,a),u.userData.mimeType=a.mimeType||aT(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Ke.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Ke.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[Ke.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new mc,Hn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Ja,Hn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Qe}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[Ke.KHR_MATERIALS_UNLIT]){const u=i[Ke.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new te(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Nn),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,_t)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Kt);const h=r.alphaMode||Th.OPAQUE;if(h===Th.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Th.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Ot&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Se(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Ot&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Ot){const u=r.emissiveFactor;o.emissive=new te().setRGB(u[0],u[1],u[2],Nn)}return r.emissiveTexture!==void 0&&a!==Ot&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,_t)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),gi(u,r),t.associations.set(u,{materials:e}),r.extensions&&Us(i,u,r),u})}createUniqueName(e){const t=ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[Ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return tm(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=rT(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[Ke.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=tm(new xt,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?nT(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,p=h.length;f<p;f++){const _=h[f],m=a[f];let g;const b=c[f];if(m.mode===kn.TRIANGLES||m.mode===kn.TRIANGLE_STRIP||m.mode===kn.TRIANGLE_FAN||m.mode===void 0)g=r.isSkinnedMesh===!0?new Pv(_,b):new Me(_,b),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),m.mode===kn.TRIANGLE_STRIP?g.geometry=Zp(g.geometry,sg):m.mode===kn.TRIANGLE_FAN&&(g.geometry=Zp(g.geometry,Ku));else if(m.mode===kn.LINES)g=new Pd(_,b);else if(m.mode===kn.LINE_STRIP)g=new ja(_,b);else if(m.mode===kn.LINE_LOOP)g=new Fv(_,b);else if(m.mode===kn.POINTS)g=new ro(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&sT(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),gi(g,r),m.extensions&&Us(i,g,m),t.assignFinalMaterial(g),u.push(g)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Us(i,u[0],r),u[0];const d=new Yt;r.extensions&&Us(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new ln(Td.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ao(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),gi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new ye;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Ad(o,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],p=i.samplers[f.sampler],_=f.target,m=_.node,g=i.parameters!==void 0?i.parameters[p.input]:p.input,b=i.parameters!==void 0?i.parameters[p.output]:p.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",g)),l.push(this.getDependency("accessor",b)),c.push(p),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],p=u[2],_=u[3],m=u[4],g=[];for(let E=0,M=d.length;E<M;E++){const w=d[E],A=f[E],C=p[E],x=_[E],T=m[E];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();const L=n._createAnimationTracks(w,A,C,x,T);if(L)for(let P=0;P<L.length;P++)g.push(L[P])}const b=new Qv(r,void 0,g);return gi(b,i),b})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,oT)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){const f=h.userData.pivot,p=u[0];h.pivot=new S().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new fg:c.length>1?h=new Yt:c.length===1?h=c[0]:h=new Fe,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),gi(h,r),r.extensions&&Us(n,h,r),r.matrix!==void 0){const u=new ye;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new Yt;n.name&&(r.name=i.createUniqueName(n.name)),gi(r,n),n.extensions&&Us(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++){const d=l[h];d.parent!==null?r.add(PE(d)):r.add(d)}const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Hn||d instanceof Zt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}hs[r.path]===hs.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let h;switch(hs[r.path]){case hs.weights:h=to;break;case hs.rotation:h=no;break;case hs.translation:case hs.scale:h=rc;break;default:switch(n.itemSize){case 1:h=to;break;case 2:case 3:default:h=rc;break}break}const u=i.interpolation!==void 0?tT[i.interpolation]:Ka,d=this._getArrayFromAccessor(n);for(let f=0,p=l.length;f<p;f++){const _=new h(l[f]+"."+hs[r.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),a.push(_)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=ed(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof no?eT:Ng;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function cT(s,e,t){const n=e.attributes,i=new Ji;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new S(l[0],l[1],l[2]),new S(c[0],c[1],c[2])),o.normalized){const h=ed($r[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new S,l=new S;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){const _=ed($r[d.componentType]);l.multiplyScalar(_)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new wi;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function tm(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(const a in n){const o=ju[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return $e.workingColorSpace!==Nn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${$e.workingColorSpace}" not supported.`),gi(s,e),cT(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?iT(s,e.targets,t):s})}const In=256,nm={ink:"#ffffff",dim:"#4e4e4e",base:"#7d7d7d"};function hT(s){const e=document.createElement("canvas");e.width=In,e.height=In;const t=e.getContext("2d");if(!t)throw new Error("2D-Context fuer Screen-Textur nicht verfuegbar");return t.fillStyle=s.base,t.fillRect(0,0,In,In),[e,t]}function uT(s){s.fillStyle="rgba(0,0,0,0.16)";for(let e=0;e<In;e+=6)s.fillRect(0,e,In,2)}function dT(s,e){const t=In/2;s.strokeStyle=e.dim,s.lineWidth=2;for(const i of[30,60,90,118])s.beginPath(),s.arc(t,t,i,0,Math.PI*2),s.stroke();s.beginPath(),s.moveTo(t,8),s.lineTo(t,In-8),s.moveTo(8,t),s.lineTo(In-8,t),s.stroke();const n=s.createLinearGradient(t,t,In,40);n.addColorStop(0,"rgba(255,255,255,0.6)"),n.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=n,s.beginPath(),s.moveTo(t,t),s.arc(t,t,118,-1.2,-.5),s.closePath(),s.fill(),s.fillStyle=e.ink;for(const[i,r,a]of[[168,84,5],[96,150,4],[190,176,3],[70,78,3]])s.beginPath(),s.arc(i,r,a,0,Math.PI*2),s.fill()}function fT(s,e){const t=["PWR","SHD","FUEL","ENG","CARGO","O2"],n=[.92,.74,.61,.88,.35,.97];s.font="bold 20px monospace",s.textBaseline="middle",t.forEach((i,r)=>{const a=28+r*38;s.fillStyle=e.dim,s.fillText(i,12,a),s.fillRect(96,a-10,148,20),s.fillStyle=e.ink,s.fillRect(96,a-10,148*n[r],20)})}function pT(s,e){const t=["NAV LINK  OK","JUMP DRV  IDLE","","SECTOR   TROJA-4","BEARING  114.6","RANGE    8.42 KM","","CARGO    12 / 40 T","CREDITS  4 180"];s.font="19px monospace",s.textBaseline="top",t.forEach((n,i)=>{s.fillStyle=i<2?e.ink:e.dim,s.fillText(n,14,14+i*26)}),s.fillStyle=e.ink,s.fillRect(14,14+t.length*26,14,18)}function mT(s,e){s.strokeStyle=e.dim,s.lineWidth=3;for(let t=0;t<9;t++){const n=20+t*26,i=t%2===0?96:56;s.beginPath(),s.moveTo(In/2-i,n),s.lineTo(In/2+i,n),s.stroke()}s.strokeStyle=e.ink,s.lineWidth=5,s.beginPath(),s.moveTo(28,150),s.lineTo(In-28,122),s.stroke()}const gT={radar:dT,bars:fT,text:pT,ladder:mT};function _T(s){const[e,t]=hT(nm);gT[s](t,nm),uT(t);const n=new un(e);return n.colorSpace=_t,n.magFilter=Pt,n.anisotropy=4,n.flipY=!1,n}const ta=2,nt=512,im=new Map;function vT(s,e){const t=`${s}:${e}`,n=im.get(t);if(n)return n;const i=new Float32Array(s*s);for(let r=0;r<i.length;r++){const a=Math.sin(r%s*127.1+Math.floor(r/s)*311.7+e*74.7)*43758.5453;i[r]=a-Math.floor(a)}return im.set(t,i),i}function xT(s,e,t,n){const i=vT(t,n),r=Math.floor(s),a=Math.floor(e),o=s-r,l=e-a,c=(r%t+t)%t,h=(a%t+t)%t,u=(c+1)%t,d=(h+1)%t,f=i[h*t+c],p=i[h*t+u],_=i[d*t+c],m=i[d*t+u],g=o*o*(3-2*o),b=l*l*(3-2*l);return(f*(1-g)+p*g)*(1-b)+(_*(1-g)+m*g)*b}function td(s,e,t,n,i){let r=0,a=.5,o=0,l=1;for(let c=0;c<t;c++)r+=xT(s*l,e*l,Math.max(2,Math.round(n*l)),i+c)*a,o+=a,a*=.5,l*=2;return r/o}function nl(s,e){const t=nt/e,n=s%t;return Math.min(n,t-n)}function MT(s){const e=new Float32Array(nt*nt),t=s==="grate"?16:2,n=nt/8;for(let i=0;i<nt;i++)for(let r=0;r<nt;r++){let o=.55+(td(r/24,i/24,4,nt/24,s==="worn"?7:3)-.5)*(s==="worn"?.12:.06);const l=Math.min(nl(r,t),nl(i,t));if(s==="grate"){const c=nt/t,h=r%c-c/2,u=i%c-c/2,d=Math.hypot(h,u)/(c*.36);d<1&&(o-=(1-d*d)*.55)}else if(l<3&&(o-=(1-l/3)*.22),l<4){const h=nl(r,t)<nl(i,t)?i:r,u=Math.abs(h%n-n/2);u<1.6&&(o+=(1-u/1.6)*.16)}if(s==="worn"){const c=td((r+i*.35)/3,i/90,2,nt/3,21);c>.8&&(o-=(c-.8)*.5)}e[i*nt+r]=Math.min(Math.max(o,0),1)}return e}function Ah(s,e){const t=document.createElement("canvas");t.width=nt,t.height=nt;const n=t.getContext("2d");if(!n)throw new Error("2D-Context fuer Oberflaechentextur nicht verfuegbar");n.putImageData(new ImageData(s,nt,nt),0,0);const i=new un(t);return i.wrapS=Wn,i.wrapT=Wn,i.anisotropy=8,e&&(i.colorSpace=_t),i}function oc(s){const e=MT(s),t=new Uint8ClampedArray(nt*nt*4),n=new Uint8ClampedArray(nt*nt*4),i=new Uint8ClampedArray(nt*nt*4),r=s==="grate"?4:2.2;for(let a=0;a<nt;a++)for(let o=0;o<nt;o++){const l=a*nt+o,c=e[l],h=td(o/60,a/60,3,nt/60,s==="worn"?11:5),u=.78+c*.2+(h-.5)*.18,d=Math.round(Math.min(Math.max(u,0),1)*255);t[l*4]=d,t[l*4+1]=d,t[l*4+2]=d,t[l*4+3]=255;const f=.86+(1-c)*.18+(h-.5)*.16,p=Math.round(Math.min(Math.max(f,0),1)*255);n[l*4]=p,n[l*4+1]=p,n[l*4+2]=p,n[l*4+3]=255;const _=e[a*nt+(o-1+nt)%nt],m=e[a*nt+(o+1)%nt],g=e[(a-1+nt)%nt*nt+o],b=e[(a+1)%nt*nt+o],E=(_-m)*r,M=(g-b)*r,w=Math.hypot(E,M,1);i[l*4]=Math.round((E/w*.5+.5)*255),i[l*4+1]=Math.round((M/w*.5+.5)*255),i[l*4+2]=Math.round(1/w*.5*255+127.5),i[l*4+3]=255}return{map:Ah(t,!0),roughnessMap:Ah(n,!1),normalMap:Ah(i,!1)}}const ST=[[[0,2.14,-4.3],.95,2.1,16764826,.05],[[0,2.14,-2.1],1,2.1,16767152,.05],[[0,1.94,.1],.42,1.9,16765600,.04],[[0,2.14,2.05],.85,2.1,11127039,.04]],yT=2.2,bT=`
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
`,ET=`
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
`;function TT(s){for(const[e,t,n,i,r]of ST){const a=new Ld(t,n,24,1,!0),o=new Et({uniforms:{uColor:{value:new te(i)},uStrength:{value:r},uNearFade:{value:yT}},vertexShader:bT,fragmentShader:ET,transparent:!0,depthWrite:!1,blending:qt,side:sn}),l=new Me(a,o);l.name="LightShaft",l.position.set(e[0],e[1]-n/2,e[2]),l.castShadow=!1,l.receiveShadow=!1,s.add(l)}}const sm="ShipInterior",Ug="Glass",wT=["Seat_Pilot","Stand_Pilot"],AT=[["Light_Bay_Aft",16764826,1.15,[0,2.05,-4.3],6],["Light_Bay_Fore",16767152,1.3,[0,2.05,-2.1],6],["Light_Bench",10474751,.16,[-1.25,1.45,-1.85],2.2],["Light_Bunk",16758903,.14,[-1.75,1.35,-3.55],2],["Light_Corridor",16765600,1,[0,1.86,.1],4.5],["Light_Cr_Screen",16756316,.1,[-.45,1.35,.35],1.3],["Light_Cockpit",11127039,1.05,[0,2.05,2.05],7],["Light_Console",16756832,.4,[0,1.3,3.85],2.6]],RT=1.25,CT=new Set(["Light_Cockpit","Light_Corridor","Light_Bay_Fore"]),rm=1024,PT={Paint_Beige:"panel",Paint_Olive:"panel",Paint_Worn:"worn",Metal_Bare:"worn",Metal_Dark:"panel",Metal_Rust:"worn",Floor_Tread:"grate",Hazard:"worn"},am=.55,om=[.137,.081],LT={Paint_Beige:{color:9076584,metalness:.04,roughness:.62},Paint_Olive:{color:5198914,metalness:.05,roughness:.68},Paint_Worn:{color:7235158,metalness:.07,roughness:.78},Metal_Bare:{color:9146261,metalness:.9,roughness:.42},Metal_Dark:{color:3356218,metalness:.85,roughness:.55},Metal_Rust:{color:8013094,metalness:.08,roughness:.9},Floor_Tread:{color:4868678,metalness:.8,roughness:.55},Rubber_Black:{color:1710618,metalness:0,roughness:.94},Fabric_Seat:{color:3814443,metalness:0,roughness:.95},Hazard:{color:12818986,metalness:0,roughness:.62}},IT={SM_Screen_MFD0:"bars",SM_Screen_MFD1:"radar",SM_Screen_MFD2:"text",SM_Screen_Overhead:"ladder",SM_Screen_Corridor:"text",SM_Screen_Bench:"bars"},Fg=.0015,DT=1e-4,lm=.01,NT=4,UT=new S(0,1.15,0),Og=1,kg=.6,FT={Screen_Amber:.34,Screen_Green:.3,Lamp_Warm:.22,Lamp_Red:.4};function OT(s){for(const[e,t,n,i,r]of AT){const a=new rr(t,n,r,RT);a.name=e,a.position.set(i[0],i[1],i[2]),CT.has(e)&&(a.castShadow=!0,a.shadow.mapSize.set(rm,rm),a.shadow.camera.near=.1,a.shadow.camera.far=r,a.shadow.bias=-.002,a.shadow.normalBias=.035,a.shadow.autoUpdate=!1,a.shadow.needsUpdate=!0),s.add(a)}}function kT(s,e){const t=new Set;s.traverse(n=>{if(!(n instanceof Me))return;const i=Array.isArray(n.material)?n.material:[n.material];for(const r of i){if(!r||t.has(r))continue;t.add(r);const a=r.name===Ug;if(r.side=a?Kt:Gn,a&&(r.depthWrite=!1),r instanceof Qe){e&&(r.envMap=e,r.envMapIntensity=a?kg:Og);const o=FT[r.name];o!==void 0&&(r.emissiveIntensity*=o)}r.needsUpdate=!0}})}const Ut=new S,xs=new S;function Bg(s,e){const t=s.geometry.getAttribute("normal");if(!t||t.count===0)return null;e.fromBufferAttribute(t,0).normalize();for(let i=1;i<t.count;i++)if(Ut.fromBufferAttribute(t,i).normalize(),e.dot(Ut)<.999)return null;s.geometry.computeBoundingBox();const n=s.geometry.boundingBox;return n&&(n.getCenter(Ut),e.dot(Ut.subVectors(UT,Ut))<0&&e.negate()),e}function BT(s){s.traverse(e=>{if(!(e instanceof Me)||e.name.startsWith("COL_")||!Bg(e,xs))return;e.position.addScaledVector(xs,Fg);const t=Array.isArray(e.material)?e.material:[e.material];for(const n of t)n.side=Kt})}function zT(s){const e=[];s.traverse(n=>{!(n instanceof Me)||n.name.startsWith("COL_")||(n.geometry.computeBoundingBox(),n.geometry.boundingBox&&e.push(n))});const t=n=>(n.getSize(Ut),Math.max(Ut.x,1e-4)*Math.max(Ut.y,1e-4)*Math.max(Ut.z,1e-4));for(let n=0;n<NT;n++){const i=e.map(o=>o.geometry.boundingBox.clone().translate(o.position)),r=new Map,a=(o,l,c)=>{let h=r.get(o);h||r.set(o,h=new Map);let u=h.get(l);u||h.set(l,u=new Set),u.add(c)};for(let o=0;o<e.length;o++)for(let l=o+1;l<e.length;l++)for(let c=0;c<3;c++)if(!(cm(i[o],i[l],(c+1)%3)<lm)&&!(cm(i[o],i[l],(c+2)%3)<lm))for(const[h,u]of[["min",-1],["max",1]]){const d=i[o][h].getComponent(c),f=i[l][h].getComponent(c);Math.abs(d-f)>DT||a(t(i[o])<=t(i[l])?o:l,c,u)}if(r.size===0)return;for(const[o,l]of r)for(const[c,h]of l){if(h.size!==1)continue;const u=e[o].position;u.setComponent(c,u.getComponent(c)+[...h][0]*Fg)}}}function cm(s,e,t){return Math.min(s.max.getComponent(t),e.max.getComponent(t))-Math.max(s.min.getComponent(t),e.min.getComponent(t))}function VT(s,e){const t=s.geometry,n=t.getAttribute("position"),i=Math.abs(e.y)>.85?new S(0,0,Math.sign(e.y)):new S(0,1,0),r=new S().crossVectors(i,e).normalize(),a=new S().crossVectors(r,e).normalize();let o=1/0,l=-1/0,c=1/0,h=-1/0;for(let p=0;p<n.count;p++){Ut.fromBufferAttribute(n,p);const _=Ut.dot(r),m=Ut.dot(a);o=Math.min(o,_),l=Math.max(l,_),c=Math.min(c,m),h=Math.max(h,m)}const u=Math.max(l-o,1e-6),d=Math.max(h-c,1e-6),f=new Float32Array(n.count*2);for(let p=0;p<n.count;p++)Ut.fromBufferAttribute(n,p),f[p*2]=(Ut.dot(r)-o)/u,f[p*2+1]=(Ut.dot(a)-c)/d;t.setAttribute("uv",new at(f,2))}function HT(s){s.traverse(e=>{!(e instanceof Me)||e.name.startsWith("COL_")||(e.castShadow=!0,e.receiveShadow=!0)})}function GT(s){const e=new Set;s.traverse(t=>{if(!(t instanceof Me)||t.name.startsWith("COL_"))return;const n=Array.isArray(t.material)?t.material:[t.material];for(const i of n){if(!i||e.has(i))continue;e.add(i);const r=LT[i.name];!r||!(i instanceof Qe)||(i.color.setHex(r.color),i.metalness=r.metalness,i.roughness=r.roughness,i.needsUpdate=!0)}})}function WT(s){const e=s.geometry;if(e.getAttribute("uv"))return;const t=e.getAttribute("position"),n=e.getAttribute("normal");if(!t||!n)return;const i=new Float32Array(t.count*2);for(let r=0;r<t.count;r++){Ut.fromBufferAttribute(t,r),xs.fromBufferAttribute(n,r);const a=Math.abs(xs.x),o=Math.abs(xs.y),l=Math.abs(xs.z);let c,h;a>=o&&a>=l?(c=Ut.z,h=Ut.y):o>=l?(c=Ut.x,h=Ut.z):(c=Ut.x,h=Ut.y),i[r*2]=c/ta+om[0],i[r*2+1]=h/ta+om[1]}e.setAttribute("uv",new at(i,2))}function XT(s){const e=new Map,t=i=>{let r=e.get(i);return r||e.set(i,r=oc(i)),r},n=new Set;s.traverse(i=>{if(!(i instanceof Me)||i.name.startsWith("COL_"))return;WT(i);const r=Array.isArray(i.material)?i.material:[i.material];for(const a of r){if(!a||n.has(a))continue;n.add(a);const o=PT[a.name];if(o===void 0||!(a instanceof Qe))continue;const l=t(o);a.map=l.map,a.roughnessMap=l.roughnessMap,a.normalMap=l.normalMap,a.normalScale.set(am,am),a.needsUpdate=!0}})}function qT(s){for(const[e,t]of Object.entries(IT)){const n=s.getObjectByName(e);if(!(n instanceof Me))continue;const i=Array.isArray(n.material)?n.material[0]:n.material;if(!(i instanceof Qe))continue;const r=Bg(n,xs);VT(n,r??xs.set(0,1,0));const a=i.clone();a.name=`${i.name}_${e}`,a.emissiveMap=_T(t),a.side=r?Kt:Gn,a.emissiveIntensity=i.emissiveIntensity*1.15,a.needsUpdate=!0,n.material=a}}function $T(s){s.traverse(e=>{const t=e;t.shadow&&(t.shadow.needsUpdate=!0)})}function KT(s,e){const t=new Set;s.traverse(n=>{if(!(n instanceof Me))return;const i=Array.isArray(n.material)?n.material:[n.material];for(const r of i)!r||t.has(r)||!(r instanceof Qe)||(t.add(r),r.envMap=e,r.envMapIntensity=r.name===Ug?kg:Og,r.needsUpdate=!0)})}async function YT(s,e=null){const n=await new Ig().loadAsync(s),i=n.scene.getObjectByName(sm)??n.scene;i.name=sm,i.removeFromParent(),i.rotation.y=Math.PI;for(const r of wT){const a=i.getObjectByName(r);a&&(a.rotation.y=Math.PI)}return kT(i,e),GT(i),zT(i),BT(i),XT(i),qT(i),HT(i),OT(i),TT(i),i}function ZT(){const s=new fc,e=(n,i,r,a,o)=>{const l=new Me(new Ti(n,i),new Ot({color:r,side:Kt}));return l.position.set(a[0],a[1],a[2]),l.rotation.set(o[0],o[1],o[2]),l},t=new Me(new Sn(8,5,11),new Ot({color:new te(.035,.04,.05),side:sn}));s.add(t),s.add(e(8,11,new te(.015,.016,.02),[0,-2.45,0],[-Math.PI/2,0,0]));for(const n of[-1.7,1.7])s.add(e(.7,8,new te(1.35,1.15,.9),[n,2.45,0],[Math.PI/2,0,0]));return s.add(e(3.4,1.4,new te(.22,.5,.85),[0,-.2,-5.4],[0,0,0])),s.add(e(3.4,1.6,new te(.09,.08,.07),[0,.4,5.4],[0,0,0])),s}const QT=256;function JT(s,e,t){const n=new Od(QT,{type:cn}),i=new Sg(.05,60,n);for(const o of i.children)o.layers.set(0);i.position.copy(t),i.updateMatrixWorld(!0),e.add(i),i.update(s,e),e.remove(i);const r=new ea(s),a=r.fromCubemap(n.texture).texture;return r.dispose(),n.dispose(),a}const An={speedUp:"KeyW",speedDown:"KeyS",rollLeft:"KeyA",rollRight:"KeyD",strafeLeft:"KeyQ",strafeRight:"KeyE",up:"ShiftLeft",down:"ControlLeft",fullStop:"KeyX",mode:"KeyV",afterburner:"Tab"},jT={pixelsToFullDeflection:300,deadzone:.06,responseExponent:1.6,repeatDelay:.3,degreesPerPixel:.08,aimSmoothing:.035,invertPitch:!0};class ew{constructor(e,t,n={}){this.input=e,this.flight=t,this.options={...jT,...n}}options;offset=new Se;mouseDelta={x:0,y:0};aimRate=new Se;holdTime=new Map;enabled=!0;get isEnabled(){return this.enabled}enable(){this.enabled||(this.enabled=!0,this.holdTime.clear())}disable(){this.enabled&&(this.enabled=!1,this.offset.set(0,0),this.aimRate.set(0,0),this.flight.clearInputs(),this.holdTime.clear())}getMouseOffset(){return this.offset}update(e){if(!this.enabled)return;this.updateMouse(e),this.updateSetSpeed(e);const t=this.flight.inputs;t.roll=this.axis(An.rollRight,An.rollLeft),t.lateral=this.axis(An.strafeRight,An.strafeLeft),t.vertical=this.axis(An.up,An.down),t.afterburner=this.input.isDown(An.afterburner),t.main=this.flight.assistEnabled?0:this.axis(An.speedUp,An.speedDown),this.input.wasPressed(An.mode)&&this.flight.cycleMode(),this.input.wasPressed(An.fullStop)&&this.flight.requestFullStop(),(t.lateral!==0||t.vertical!==0||t.main!==0)&&this.flight.cancelFullStop()}updateMouse(e){const t=this.flight.inputs;if(!this.input.pointerLocked){this.offset.set(0,0),t.pitch=0,t.yaw=0;return}this.input.consumeMouseDelta(this.mouseDelta),this.flight.isArcade?this.updateArcadeAim(e):this.updateVirtualStick()}updateArcadeAim(e){const t=Math.max(e,.001),n=1-Math.exp(-t/Math.max(this.options.aimSmoothing,1e-4));this.aimRate.x+=(this.mouseDelta.x/t-this.aimRate.x)*n,this.aimRate.y+=(this.mouseDelta.y/t-this.aimRate.y)*n;const i=this.flight.getParams().arcade.turnRate,r=Td.degToRad(this.options.degreesPerPixel)/i,a=hm(this.aimRate.x*r,-1,1),o=hm(this.aimRate.y*r,-1,1),l=this.flight.inputs;l.yaw=a,l.pitch=this.options.invertPitch?o:-o,this.offset.set(a,o)}updateVirtualStick(){const e=1/this.options.pixelsToFullDeflection;this.offset.x+=this.mouseDelta.x*e,this.offset.y+=this.mouseDelta.y*e;const t=this.offset.length();t>1&&this.offset.multiplyScalar(1/t);const{deadzone:n,responseExponent:i}=this.options,r=Math.min(t,1);let a=0;r>n&&(a=Math.pow((r-n)/(1-n),i)/r);const o=this.flight.inputs;o.yaw=this.offset.x*a,o.pitch=(this.options.invertPitch?this.offset.y:-this.offset.y)*a}updateSetSpeed(e){const t=this.stepFor(An.speedUp,e)-this.stepFor(An.speedDown,e);t!==0&&this.flight.assistEnabled&&this.flight.adjustSetSpeed(t)}stepFor(e,t){const n=this.flight.getParams();let i=this.input.wasPressed(e)?n.setSpeedStep:0;if(this.input.isDown(e)){const r=(this.holdTime.get(e)??0)+t;this.holdTime.set(e,r),r>this.options.repeatDelay&&(i+=n.setSpeedRate*t)}else this.holdTime.set(e,0);return i}axis(e,t){return(this.input.isDown(e)?1:0)-(this.input.isDown(t)?1:0)}}function hm(s,e,t){return s<e?e:s>t?t:s}const um=new ye,Rh=new ye,tw=new S,il=new tt,sl=new S,rl=new S;class nw{boxes=[];get obbs(){return this.boxes}rebuild(e,t){this.boxes.length=0,t.updateMatrixWorld(!0),um.copy(t.matrixWorld).invert();for(const n of e){const i=n.geometry;i.boundingBox||i.computeBoundingBox();const r=i.boundingBox;if(!r)continue;Rh.multiplyMatrices(um,n.matrixWorld),Rh.decompose(tw,il,sl);const a=r.getCenter(new S).applyMatrix4(Rh),o=r.getSize(new S),l=new S(o.x*.5*Math.abs(sl.x),o.y*.5*Math.abs(sl.y),o.z*.5*Math.abs(sl.z)),c=[new S(1,0,0).applyQuaternion(il),new S(0,1,0).applyQuaternion(il),new S(0,0,1).applyQuaternion(il)],h=new S(Math.abs(c[0].x)*l.x+Math.abs(c[1].x)*l.y+Math.abs(c[2].x)*l.z,Math.abs(c[0].y)*l.x+Math.abs(c[1].y)*l.y+Math.abs(c[2].y)*l.z,Math.abs(c[0].z)*l.x+Math.abs(c[1].z)*l.y+Math.abs(c[2].z)*l.z);this.boxes.push({center:a,half:l,axes:c,min:a.clone().sub(h),max:a.clone().add(h)})}}}function iw(s,e,t,n){rl.subVectors(e,s.center);const i=rl.dot(s.axes[0]),r=rl.dot(s.axes[1]),a=rl.dot(s.axes[2]),o=Math.min(Math.max(i,-s.half.x),s.half.x),l=Math.min(Math.max(r,-s.half.y),s.half.y),c=Math.min(Math.max(a,-s.half.z),s.half.z),h=i-o,u=r-l,d=a-c,f=h*h+u*u+d*d;if(f>1e-12){if(f>=t*t)return!1;const E=Math.sqrt(f),M=t-E;return n.set(0,0,0),n.addScaledVector(s.axes[0],h/E),n.addScaledVector(s.axes[1],u/E),n.addScaledVector(s.axes[2],d/E),n.multiplyScalar(M),!0}let p=0,_=s.half.x-Math.abs(i),m=i>=0?1:-1;const g=s.half.y-Math.abs(r);g<_&&(p=1,_=g,m=r>=0?1:-1);const b=s.half.z-Math.abs(a);return b<_&&(p=2,_=b,m=a>=0?1:-1),n.copy(s.axes[p]).multiplyScalar(m*(_+t)),!0}const Ch=1.7,Gi=.3,al={forward:"KeyW",back:"KeyS",left:"KeyA",right:"KeyD"},dm=2.5,sw=16,rw=22,aw=9.81,fm=.0022,pm=89*Math.PI/180,mm=5,ow=4,gm=1e-4,_m=new ni(0,0,0,"YXZ");class lw{constructor(e,t){this.input=e,this.ship=t;const n=Ch-Gi;for(let i=0;i<mm;i++){const r=i/(mm-1);this.sphereHeights.push(Gi+r*(n-Gi))}}position=new S;velocity=new S;yaw=0;pitch=0;grounded=!1;collider=new nw;mouseDelta={x:0,y:0};push=new S;sphere=new S;sphereHeights=[];rebuildCollision(){this.collider.rebuild(this.ship.getCollisionMeshes(),this.ship)}get colliderCount(){return this.collider.obbs.length}reset(e,t,n=0){this.position.copy(e),this.velocity.set(0,0,0),this.yaw=t,this.pitch=n,this.grounded=!1}updateLook(){this.input.consumeMouseDelta(this.mouseDelta),this.input.pointerLocked&&(this.yaw-=this.mouseDelta.x*fm,this.pitch-=this.mouseDelta.y*fm,this.pitch=Math.min(Math.max(this.pitch,-pm),pm))}update(e){this.integrateVelocity(e),this.position.x+=this.velocity.x*e,this.position.z+=this.velocity.z*e,this.resolve(!0),this.position.y+=this.velocity.y*e,this.grounded=!1,this.resolve(!1)}getEyePosition(e){return e.set(this.position.x,this.position.y+Ch,this.position.z)}getQuaternion(e){return _m.set(this.pitch,this.yaw,0,"YXZ"),e.setFromEuler(_m)}integrateVelocity(e){const t=(this.input.isDown(al.forward)?1:0)-(this.input.isDown(al.back)?1:0),n=(this.input.isDown(al.right)?1:0)-(this.input.isDown(al.left)?1:0),i=Math.sin(this.yaw),r=Math.cos(this.yaw);let a=-i*t+r*n,o=-r*t-i*n;const l=Math.hypot(a,o);l>1&&(a/=l,o/=l);const c=a*dm,h=o*dm,u=(l>0?sw:rw)*e,d=c-this.velocity.x,f=h-this.velocity.z,p=Math.hypot(d,f);p<=u||p===0?(this.velocity.x=c,this.velocity.z=h):(this.velocity.x+=d/p*u,this.velocity.z+=f/p*u),this.velocity.y=Math.max(this.velocity.y-aw*e,-20)}resolve(e){const t=this.collider.obbs;if(t.length!==0)for(let n=0;n<ow;n++){let i=!1;const r=this.position.x-Gi,a=this.position.x+Gi,o=this.position.y,l=this.position.y+Ch,c=this.position.z-Gi,h=this.position.z+Gi;for(const u of t)if(!(u.max.x<r||u.min.x>a)&&!(u.max.y<o||u.min.y>l)&&!(u.max.z<c||u.min.z>h))for(const d of this.sphereHeights){if(this.sphere.set(this.position.x,this.position.y+d,this.position.z),!iw(u,this.sphere,Gi,this.push))continue;const f=Math.abs(this.push.x),p=Math.abs(this.push.y),_=Math.abs(this.push.z);(p>=f&&p>=_)!==e&&(i=!0,e?this.slideOut():this.stepOut())}if(!i)break}}slideOut(){const e=Math.hypot(this.push.x,this.push.z);if(e<1e-9)return;const t=this.push.x/e,n=this.push.z/e;this.position.x+=t*(e+gm),this.position.z+=n*(e+gm);const i=this.velocity.x*t+this.velocity.z*n;i<0&&(this.velocity.x-=i*t,this.velocity.z-=i*n)}stepOut(){this.position.y+=this.push.y,this.push.y>0?(this.grounded=!0,this.velocity.y<0&&(this.velocity.y=0)):this.velocity.y>0&&(this.velocity.y=0)}}const cw=1.4,zg=1.2;class Vg{items=[];add(e){return this.items.push(e),()=>this.remove(e)}remove(e){const t=this.items.indexOf(e);t>=0&&this.items.splice(t,1)}clear(){this.items.length=0}get count(){return this.items.length}findNearest(e){let t=null,n=1/0;for(const i of this.items){if(i.enabled&&!i.enabled())continue;const r=this.distanceTo(e,i),a=i.range??cw;r>a||r>=n||(t=i,n=r)}return t}distanceTo(e,t){const n=e.x-t.position.x,i=e.y+zg-t.position.y,r=e.z-t.position.z;return Math.sqrt(n*n+i*i+r*r)}}function hw(s){return typeof s.label=="function"?s.label():s.label}const vm="KeyF",uw=1.5,dw=.5,fw=3.5,xm="F — AUFSTEHEN",pw="F — HINSETZEN",Mm="WASD — GEHEN · MAUS — UMSEHEN",Pa=new ye,ol=new ye,ll=new S,Ph=new S,Sm=new ni(0,0,0,"YXZ");class mw{mode="seated";blend=1;blendPos=new S;blendQuat=new tt;infoTimer=0;seatLocal=new S;input;ship;camera;seated;walk;hud;interactables;constructor(e){this.input=e.input,this.ship=e.ship,this.camera=e.camera,this.seated=e.seated,this.walk=e.walk,this.hud=e.hud,this.interactables=e.interactables,this.refreshInterior()}getMode(){return this.mode}get isWalking(){return this.mode==="walking"}refreshInterior(){this.walk.rebuildCollision(),this.localPosition(this.ship.getSeatPilot(),this.seatLocal),this.mode==="seated"?(this.attachToSeat(),this.blend=1):(this.localPosition(this.ship.getStandPilot(),ll),this.walk.reset(ll,this.walk.yaw,this.walk.pitch))}update(e){this.blend<1&&(this.blend=Math.min(this.blend+e/dw,1)),this.mode==="seated"?this.updateSeated():this.updateWalking(e)}fixedUpdate(e){this.mode==="walking"&&this.walk.update(e)}updateCamera(){const e=gw(this.blend);this.mode==="walking"?(this.walk.getEyePosition(this.camera.position),this.walk.getQuaternion(this.camera.quaternion)):(this.camera.position.set(0,0,0),this.camera.quaternion.identity()),e<1&&(this.camera.position.lerp(this.blendPos,1-e),this.camera.quaternion.slerp(this.blendQuat,1-e))}updateSeated(){if(this.input.wasPressed(vm)){this.standUp();return}this.hud.showPrompt(xm)}updateWalking(e){this.walk.updateLook();const t=this.seatDistance(),n=this.interactables?.findNearest(this.walk.position)??null,i=n?this.interactables.distanceTo(this.walk.position,n):1/0,r=t<uw&&t<=i,a=r?null:n;if(this.input.wasPressed(vm)){if(r){this.sitDown();return}if(a){a.activate();return}}this.infoTimer>0&&(this.infoTimer-=e),r?this.hud.showPrompt(pw):a?this.hud.showPrompt(hw(a)):this.infoTimer>0?this.hud.showPrompt(Mm):this.hud.hidePrompt()}seatDistance(){const e=this.walk.position.x-this.seatLocal.x,t=this.walk.position.z-this.seatLocal.z;return Math.hypot(e,t)}standUp(){this.seated.disable(),this.localMatrix(this.ship.getSeatPilot(),ol),ol.decompose(this.blendPos,this.blendQuat,Ph),Sm.setFromQuaternion(this.blendQuat,"YXZ"),this.localPosition(this.ship.getStandPilot(),ll),this.walk.rebuildCollision(),this.walk.reset(ll,Sm.y,0),this.ship.add(this.camera),this.camera.scale.set(1,1,1),this.mode="walking",this.blend=0,this.infoTimer=fw,this.hud.setMode("walking"),this.hud.showPrompt(Mm)}sitDown(){Pa.compose(this.camera.position,this.camera.quaternion,Ph.set(1,1,1)),this.localMatrix(this.ship.getSeatPilot(),ol),Pa.premultiply(ol.invert()),Pa.decompose(this.blendPos,this.blendQuat,Ph),this.ship.getSeatPilot().add(this.camera),this.camera.position.copy(this.blendPos),this.camera.quaternion.copy(this.blendQuat),this.camera.scale.set(1,1,1),this.mode="seated",this.blend=0,this.seated.enable(),this.hud.setMode("seated"),this.hud.showPrompt(xm)}attachToSeat(){this.ship.getSeatPilot().add(this.camera),this.camera.position.set(0,0,0),this.camera.quaternion.identity(),this.camera.scale.set(1,1,1)}localMatrix(e,t){return this.ship.updateMatrixWorld(!0),t.copy(this.ship.matrixWorld).invert().multiply(e.matrixWorld),t}localPosition(e,t){return this.localMatrix(e,Pa),t.setFromMatrixPosition(Pa)}}function gw(s){const e=Math.min(Math.max(s,0),1);return e*e*(3-2*e)}const _w={arcade:"ARCADE",assist:"NEWTON · ASSIST",newton:"NEWTON · FREI"},Hg={arcade:"ARCADE",assist:"ASSIST",newton:"NEWTON"},Gg=.35,vw=.6;class xw{root;helper;damage;prompt;hint;speedValue;setValue;barFill;barSet;hullValue;killsValue;targetValue;assistChip;burnChip;mode="seated";helperOn=!1;lastSpeed=-1;lastSet=-1;lastMode="";lastKills=-1;lastHull=-1;lastTarget="";lastBurn=null;lastLocked=null;lastDamage=-1;constructor(e=document.body){this.root=document.createElement("div"),this.root.className="hud",this.root.innerHTML=`
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

      <div class="hud__keys hud__keys--flight">MAUS/LEER&nbsp;FEUERN &middot; RECHTSKLICK&nbsp;ZIEL+SCAN &middot; T&nbsp;ZIEL &middot; R&nbsp;SCAN &middot; M&nbsp;FOERDERN &middot; W/S&nbsp;SET&nbsp;SPEED &middot; A/D&nbsp;ROLL &middot; Q/E&nbsp;STRAFE &middot; SHIFT/CTRL&nbsp;LIFT &middot; X&nbsp;FULL&nbsp;STOP &middot; TAB&nbsp;BURN &middot; V&nbsp;FLUGMODUS &middot; G&nbsp;ANDOCKEN &middot; L&nbsp;LANDEN &middot; C&nbsp;AUSSENANSICHT &middot; H&nbsp;HILFSANZEIGE &middot; ESC&nbsp;MENUE&nbsp;ZU &middot; F&nbsp;AUFSTEHEN</div>
      <div class="hud__keys hud__keys--walk">W/A/S/D&nbsp;GEHEN &middot; MAUS&nbsp;UMSEHEN &middot; F&nbsp;HINSETZEN,&nbsp;REPARIEREN,&nbsp;WERKZEUG,&nbsp;FRACHT &middot; ESC&nbsp;PANEL&nbsp;ZU</div>
      <div class="hud__damage"></div>
      <div class="hud__prompt" hidden></div>
      <div class="hud__hint" hidden>KLICKEN ZUM STEUERN</div>
    `,e.appendChild(this.root),this.helper=this.require(".hud__helper"),this.damage=this.require(".hud__damage"),this.prompt=this.require(".hud__prompt"),this.hint=this.require(".hud__hint"),this.speedValue=this.require("[data-speed]"),this.setValue=this.require("[data-set]"),this.barFill=this.require("[data-fill]"),this.barSet=this.require("[data-setmark]"),this.hullValue=this.require("[data-hull]"),this.killsValue=this.require("[data-kills]"),this.targetValue=this.require("[data-target]"),this.assistChip=this.require("[data-assist]"),this.burnChip=this.require("[data-burn]"),window.addEventListener("keydown",this.onKeyDown)}dispose(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}setMode(e){this.mode!==e&&(this.mode=e,this.root.classList.toggle("hud--walking",e==="walking"),this.applyHelper())}getMode(){return this.mode}showPrompt(e){this.prompt.textContent!==e&&(this.prompt.textContent=e),this.prompt.hidden&&(this.prompt.hidden=!1)}hidePrompt(){this.prompt.hidden||(this.prompt.hidden=!0)}setHelperVisible(e){this.helperOn=e,this.applyHelper()}isHelperVisible(){return this.helperOn}update(e){const t=Math.max(0,1-e.sinceImpact/vw);Math.abs(t-this.lastDamage)>.01&&(this.lastDamage=t,this.damage.style.opacity=t.toFixed(3)),this.lastLocked!==e.pointerLocked&&(this.lastLocked=e.pointerLocked,this.hint.hidden=e.pointerLocked),this.helperOn&&this.mode==="seated"&&this.updateHelper(e)}updateHelper(e){const t=Math.round(e.speed);if(t!==this.lastSpeed){this.lastSpeed=t,this.speedValue.textContent=`${t} M/S`;const l=Math.min(e.speed/Math.max(e.maxSetSpeed,1),1)*100;this.barFill.style.width=`${l.toFixed(1)}%`}const n=Math.round(e.setSpeed);if(n!==this.lastSet){this.lastSet=n,this.setValue.textContent=`${n} M/S`;const l=n/Math.max(e.maxSetSpeed,1)*100;this.barSet.style.left=`${l.toFixed(1)}%`}const i=e.fullStop?"FULL STOP":_w[e.mode];i!==this.lastMode&&(this.lastMode=i,this.assistChip.textContent=i,this.assistChip.classList.toggle("is-on",!e.fullStop&&e.mode!=="newton"),this.assistChip.classList.toggle("is-warn",e.fullStop));const r=Math.round(e.hull*100);r!==this.lastHull&&(this.lastHull=r,this.hullValue.textContent=`${r}%`,this.hullValue.classList.toggle("is-warn",e.hull<Gg)),e.kills!==this.lastKills&&(this.lastKills=e.kills,this.killsValue.textContent=`${e.kills}`);const a=e.target,o=a?`${a.distance>=1e3?`${(a.distance/1e3).toFixed(2)} KM`:`${Math.round(a.distance)} M`} · ${Math.round(a.integrity*100)}%`:"--";o!==this.lastTarget&&(this.lastTarget=o,this.targetValue.textContent=o),e.afterburner!==this.lastBurn&&(this.lastBurn=e.afterburner,this.burnChip.textContent=e.afterburner?"AFTERBURNER":"AB",this.burnChip.classList.toggle("is-warn",e.afterburner))}applyHelper(){this.helper.hidden=!this.helperOn||this.mode==="walking",this.helper.hidden||(this.lastSpeed=-1,this.lastSet=-1,this.lastMode="",this.lastKills=-1,this.lastHull=-1,this.lastTarget="",this.lastBurn=null)}onKeyDown=e=>{e.code!=="KeyH"||e.repeat||this.setHelperVisible(!this.helperOn)};require(e){const t=this.root.querySelector(e);if(!t)throw new Error(`HUD: Element "${e}" fehlt`);return t}}const Mw=48;function Sw(){const e=document.createElement("canvas");e.width=128,e.height=128;const t=e.getContext("2d");if(!t)throw new Error("2D-Context fuer Effekt-Textur nicht verfuegbar");const n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,0.75)"),n.addColorStop(.6,"rgba(255,255,255,0.18)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,128,128),new un(e)}const yw=new S,ym=new S;class bw extends Yt{puffs=[];next=0;constructor(){super(),this.name="Effects",this.frustumCulled=!1;const e=Sw();for(let t=0;t<Mw;t++){const n=new Jr(new er({map:e,blending:qt,depthWrite:!1,transparent:!0,opacity:0}));n.visible=!1,this.add(n),this.puffs.push({sprite:n,life:0,duration:1,velocity:new S,startSize:1,endSize:1})}}spawnImpact(e,t){this.spawn(e,null,.16,t*.5,t*1.8,12580095)}spawnExplosion(e,t,n){this.spawn(e,n,.22,t*2.2,t*4.5,16777215),this.spawn(e,n,.9,t*1.2,t*7,16760944);const i=9;for(let r=0;r<i;r++){const a=r/i*Math.PI*2,o=(r%3-1)*.7;ym.set(Math.cos(a),o,Math.sin(a)).normalize().multiplyScalar(t*(3.5+r%3)).add(n),this.spawn(e,ym,.7+r%3*.15,t*.6,t*.15,16752720)}}update(e){for(const t of this.puffs){if(t.life<=0)continue;if(t.life-=e,t.life<=0){t.sprite.visible=!1,t.sprite.material.opacity=0;continue}const n=1-t.life/t.duration;t.sprite.position.addScaledVector(t.velocity,e);const i=t.startSize+(t.endSize-t.startSize)*n;t.sprite.scale.set(i,i,1),t.sprite.material.opacity=Math.pow(1-n,1.8)}}shift(e){for(const t of this.puffs)t.life>0&&t.sprite.position.sub(e)}spawn(e,t,n,i,r,a){const o=this.puffs[this.next];this.next=(this.next+1)%this.puffs.length,o.sprite.position.copy(e),o.sprite.visible=!0,o.sprite.material.color.setHex(a),o.sprite.material.opacity=1,o.sprite.scale.set(i,i,1),o.velocity.copy(t??yw),o.duration=n,o.life=n,o.startSize=i,o.endSize=r}}const Ew={boltSpeed:1100,fireInterval:.14,range:2600,damage:1,convergence:900,ports:[[-1.28,-.15,-4.3],[1.28,-.15,-4.3]]},bm={reload:1,activeGuns:1/0},Em=64,Tw=26,Tm=1.1,wm=new ye,cl=new tt,ww=new S(1,1,1),Fs=new S,hl=new S,Am=new S,Lh=new S,Rm=new ye().makeScale(0,0,0),Aw=new S(0,1,0);class Rw{constructor(e,t,n={}){this.asteroids=e,this.effects=t,this.params={...Ew,...n};const i=new Sn(Tm,Tm,Tw),r=new Ot({color:10353919,blending:qt,depthWrite:!1,transparent:!0});this.mesh=new Rd(i,r,Em),this.mesh.name="Bolts",this.mesh.frustumCulled=!1;for(let a=0;a<Em;a++)this.bolts.push({position:new S,velocity:new S,remaining:0}),this.mesh.setMatrixAt(a,Rm);this.mesh.instanceMatrix.needsUpdate=!0}mesh;kills=0;sinceHit=1/0;bolts=[];params;damage={...bm};cooldown=0;nextPort=0;triggerHeld=!1;getParams(){return this.params}setDamage(e){this.damage={...bm,...e}}getDamage(){return this.damage}getActiveGuns(){return Math.max(0,Math.min(this.damage.activeGuns,this.params.ports.length))}setTrigger(e){this.triggerHeld=e}getTimeSinceHit(){return this.sinceHit}update(e,t,n){this.sinceHit+=e,this.cooldown-=e,this.triggerHeld&&this.cooldown<=0&&this.getActiveGuns()>0&&(this.fire(t,n),this.cooldown=this.params.fireInterval*this.damage.reload);for(let i=0;i<this.bolts.length;i++){const r=this.bolts[i];if(r.remaining<=0)continue;const a=r.velocity.length(),o=a*e;Fs.copy(r.velocity).divideScalar(Math.max(a,1e-6));const l=this.asteroids.hitSegment(r.position,Fs,o);if(l){this.asteroids.damage(l.index,this.params.damage)?(this.effects.spawnExplosion(l.point,l.radius,Fs.clone().multiplyScalar(3)),this.kills++):this.effects.spawnImpact(l.point,Math.min(l.radius,6)),this.sinceHit=0,this.retire(i,r);continue}if(r.position.addScaledVector(r.velocity,e),r.remaining-=o,r.remaining<=0){this.retire(i,r);continue}this.writeMatrix(i,r)}this.mesh.instanceMatrix.needsUpdate=!0}shift(e){for(const t of this.bolts)t.remaining>0&&t.position.sub(e)}fire(e,t){const n=this.bolts.findIndex(a=>a.remaining<=0);if(n<0)return;const i=this.params.ports[this.nextPort%this.getActiveGuns()];this.nextPort++,hl.set(i[0],i[1],i[2]).applyQuaternion(e.quaternion).add(e.position),Lh.set(0,0,-1).applyQuaternion(e.quaternion),Am.copy(e.position).addScaledVector(Lh,this.params.convergence),Fs.subVectors(Am,hl).normalize();const r=this.bolts[n];r.position.copy(hl),r.velocity.copy(Fs).multiplyScalar(this.params.boltSpeed).add(t),r.remaining=this.params.range,this.writeMatrix(n,r),this.effects.spawnImpact(hl,1.6)}writeMatrix(e,t){Fs.copy(t.velocity).normalize(),cl.setFromUnitVectors(Lh.set(0,0,-1),Fs),Number.isFinite(cl.x)||cl.setFromAxisAngle(Aw,0),wm.compose(t.position,cl,ww),this.mesh.setMatrixAt(e,wm)}retire(e,t){t.remaining=0,this.mesh.setMatrixAt(e,Rm)}}const Cw={range:3e3,cone:Math.PI/5,aimCone:Math.PI/36,dropRange:4e3};function Pw(s,e,t,n,i,r){const a=Lw.subVectors(s,t),o=Iw.subVectors(e,n),l=o.lengthSq()-i*i,c=2*a.dot(o),h=a.lengthSq();let u=-1;if(Math.abs(l)<1e-6)Math.abs(c)>1e-6&&(u=-h/c);else{const d=c*c-4*l*h;if(d>=0){const f=Math.sqrt(d),p=(-c-f)/(2*l),_=(-c+f)/(2*l);p>0?u=_>0?Math.min(p,_):p:_>0&&(u=_)}}return u<=0||!Number.isFinite(u)?r.copy(s):r.copy(o).multiplyScalar(u).add(s)}const Lw=new S,Iw=new S,us=new S,Ih=new S,Cr=new S;class Dw{index=-1;candidates=[];scores=[];params;info={index:-1,position:new S,velocity:new S,lead:new S,distance:0,radius:0,integrity:1};constructor(e={}){this.params={...Cw,...e}}getParams(){return this.params}getIndex(){return this.index}clear(){this.index=-1}acquire(e,t,n){const i=e.hitSegment(t,n,this.params.range);if(i)return this.index=i.index,this.index;const r=Math.cos(this.params.aimCone),a=this.params.range;let o=-1,l=r;for(let c=0;c<e.count;c++){if(!e.isAlive(c))continue;e.getCenter(c,us),Cr.subVectors(us,t);const h=Cr.lengthSq();if(h>a*a||h<1e-6)continue;const u=Cr.dot(n)/Math.sqrt(h);u<=l||(l=u,o=c)}return o>=0&&(this.index=o),o}cycle(e,t,n){const i=Math.cos(this.params.cone),r=this.params.range,a=this.candidates,o=this.scores;let l=0;for(let h=0;h<e.count;h++){if(!e.isAlive(h))continue;e.getCenter(h,us),Cr.subVectors(us,t);const u=Cr.lengthSq();if(u>r*r||u<1e-6)continue;const d=Cr.dot(n)/Math.sqrt(u);d<i||(a[l]=h,o[l]=d,l++)}if(l===0)return this.index=-1,-1;for(let h=1;h<l;h++){const u=a[h],d=o[h];let f=h-1;for(;f>=0&&o[f]<d;)a[f+1]=a[f],o[f+1]=o[f],f--;a[f+1]=u,o[f+1]=d}let c=-1;for(let h=0;h<l;h++)if(a[h]===this.index){c=h;break}return this.index=a[(c+1)%l],this.index}update(e,t,n,i){if(this.index<0)return null;if(!e.isAlive(this.index))return this.index=-1,null;e.getCenter(this.index,us);const r=us.distanceTo(t);if(r>this.params.dropRange)return this.index=-1,null;e.getVelocity(this.index,Ih);const a=this.info;return a.index=this.index,a.position.copy(us),a.velocity.copy(Ih),a.distance=r,a.radius=e.getRadius(this.index),a.integrity=e.getIntegrity(this.index),Pw(us,Ih,t,n,i,a.lead),a}}const Nw={radius:4.5,restitution:.35,tangentialKeep:.8,minImpactSpeed:8,lethalImpactSpeed:450,ramSpeedPerHit:45,repairRate:.015,repairDelay:8},Cm=new S,Pr=new S,ki=new S,Dh=new S,Nh=new S,Pm=new tt;class Uw{constructor(e,t=null,n={}){this.asteroids=e,this.effects=t,this.params={...Nw,...n}}integrity=1;sinceImpact=1/0;params;previous=new S;hasPrevious=!1;exemptIndex=-1;getParams(){return this.params}setExemptIndex(e){this.exemptIndex=e}shift(e){this.previous.sub(e)}repair(){this.integrity=1}update(e,t,n){if(this.sinceImpact+=e,this.sinceImpact>this.params.repairDelay&&this.integrity<1&&(this.integrity=Math.min(this.integrity+this.params.repairRate*e,1)),!this.hasPrevious)return this.previous.copy(t.position),this.hasPrevious=!0,null;Pr.subVectors(t.position,this.previous);const i=Pr.length();this.previous.copy(t.position);const r=Math.max(i,1e-4);i>1e-6?Pr.divideScalar(i):Pr.set(0,0,1),Cm.copy(t.position).addScaledVector(Pr,-i);const a=this.asteroids.hitSegment(Cm,Pr,r,this.params.radius);if(!a||a.index===this.exemptIndex)return null;this.asteroids.getCenter(a.index,Dh),ki.subVectors(a.point,Dh);const o=ki.length();o<1e-6?ki.set(0,1,0):ki.divideScalar(o);const l=a.radius+this.params.radius;t.position.copy(Dh).addScaledVector(ki,l),this.previous.copy(t.position);const c=n.dot(ki),h=c<0?-c:0;c<0&&(Nh.copy(n).addScaledVector(ki,-c),n.copy(Nh).multiplyScalar(this.params.tangentialKeep).addScaledVector(ki,-c*this.params.restitution));const u=h<=this.params.minImpactSpeed?0:Math.min((h-this.params.minImpactSpeed)/this.params.lethalImpactSpeed,1);this.integrity=Math.max(this.integrity-u,0),this.sinceImpact=0;const d=Math.max(1,Math.round(h/this.params.ramSpeedPerHit)),f=this.asteroids.damage(a.index,d);this.effects&&(f?this.effects.spawnExplosion(a.point,a.radius,Nh.set(0,0,0)):this.effects.spawnImpact(a.point,Math.min(a.radius,8))),Pm.copy(t.quaternion).invert();const p=ki.clone().negate().applyQuaternion(Pm);return{speed:h,damage:u,destroyed:f,direction:p}}}const Fw={decay:1.4,maxOffset:.16,maxRoll:.05,frequency:22};class Ow{trauma=0;time=0;params;constructor(e={}){this.params={...Fw,...e}}getTrauma(){return this.trauma}add(e){this.trauma=Td.clamp(this.trauma+e,0,1)}reset(){this.trauma=0,this.time=0}update(e){this.time+=e,this.trauma=Math.max(this.trauma-this.params.decay*e,0)}applyTo(e){if(this.trauma<=0)return;const t=this.trauma*this.trauma,n=this.time*this.params.frequency,i=Uh(n,0)*t*this.params.maxOffset,r=Uh(n,17.3)*t*this.params.maxOffset,a=Uh(n,41.7)*t*this.params.maxRoll;e.translateX(i),e.translateY(r),e.rotateZ(a)}}function Uh(s,e){return Math.sin(s+e)*.6+Math.sin(s*1.7+e*1.3)*.3+Math.sin(s*2.9+e*.7)*.1}const kw="SM_Screen_MFD1",Bi=256,Lm=15,Bw=1.4;function zw(s,e,t){return(s+Math.min(e,t)*Bw)%(Math.PI*2)}const Vw={range:2500,maxContacts:48};function Hw(s,e,t){return t.x=s.x/e,t.y=-s.z/e,t.radius=Math.hypot(t.x,t.y),t}const La=new S,Im=new S,Dm=new tt,ul={x:0,y:0,radius:0};class Gw{texture;canvas;ctx;params;contacts=[];contactCount=0;sinceRefresh=1/0;sweep=0;constructor(e={}){this.params={...Vw,...e},this.canvas=document.createElement("canvas"),this.canvas.width=Bi,this.canvas.height=Bi;const t=this.canvas.getContext("2d");if(!t)throw new Error("2D-Context fuer das Radar nicht verfuegbar");this.ctx=t,this.texture=new un(this.canvas),this.texture.magFilter=Pt,this.texture.flipY=!1,this.drawFrame()}attachTo(e){const t=e.getObjectByName(kw);if(!(t instanceof Me))return!1;const n=Array.isArray(t.material)?t.material[0]:t.material;return n instanceof Qe?(n.emissiveMap=this.texture,n.needsUpdate=!0,!0):!1}update(e,t){this.sinceRefresh+=e,!(this.sinceRefresh<1/Lm)&&(this.sweep=zw(this.sweep,this.sinceRefresh,2/Lm),this.sinceRefresh=0,this.collect(t),this.drawFrame(),this.texture.needsUpdate=!0)}collect(e){this.contactCount=0,Dm.copy(e.orientation).invert();const{asteroids:t}=e;for(let n=0;n<t.count;n++){if(!t.isAlive(n)||(t.getCenter(n,Im),La.subVectors(Im,e.origin),La.lengthSq()>this.params.range*this.params.range*2.25)||(La.applyQuaternion(Dm),Hw(La,this.params.range,ul),ul.radius>1))continue;const i=this.contacts[this.contactCount]??(this.contacts[this.contactCount]={x:0,y:0,height:0,size:0,locked:!1});i.x=ul.x,i.y=ul.y,i.height=Math.max(Math.min(La.y/this.params.range,1),-1),i.size=t.getRadius(n),i.locked=n===e.targetIndex,this.contactCount++}if(this.contactCount>this.params.maxContacts){const n=this.contacts.slice(0,this.contactCount);n.sort((i,r)=>i.x*i.x+i.y*i.y-(r.x*r.x+r.y*r.y));for(let i=0;i<n.length;i++)this.contacts[i]=n[i];this.contactCount=this.params.maxContacts}}drawFrame(){const e=this.ctx,t=Bi/2,n=Bi/2-12;e.fillStyle="#0a2b33",e.fillRect(0,0,Bi,Bi),e.strokeStyle="#2f8ea3",e.lineWidth=2;for(const r of[.33,.66,1])e.beginPath(),e.arc(t,t,n*r,0,Math.PI*2),e.stroke();e.beginPath(),e.moveTo(t,t-n),e.lineTo(t,t+n),e.moveTo(t-n,t),e.lineTo(t+n,t),e.stroke();const i=e.createLinearGradient(t,t,t+Math.cos(this.sweep)*n,t+Math.sin(this.sweep)*n);i.addColorStop(0,"rgba(180,255,255,0.35)"),i.addColorStop(1,"rgba(180,255,255,0)"),e.fillStyle=i,e.beginPath(),e.moveTo(t,t),e.arc(t,t,n,this.sweep-.45,this.sweep),e.closePath(),e.fill(),e.fillStyle="#eaffff",e.beginPath(),e.moveTo(t,t-9),e.lineTo(t-6,t+7),e.lineTo(t+6,t+7),e.closePath(),e.fill();for(let r=0;r<this.contactCount;r++){const a=this.contacts[r],o=t+a.x*n,l=t-a.y*n,c=Math.max(2,Math.min(7,2+a.size/9));e.strokeStyle=a.locked?"#ffd27a":"#7fd8e8",e.lineWidth=1.5,e.beginPath(),e.moveTo(o,l),e.lineTo(o,l-a.height*14),e.stroke(),e.fillStyle=a.locked?"#ffc14d":"#bff0ff",e.beginPath(),e.arc(o,l,c,0,Math.PI*2),e.fill(),a.locked&&(e.strokeStyle="#ffc14d",e.lineWidth=2,e.strokeRect(o-c-5,l-c-5,(c+5)*2,(c+5)*2))}e.fillStyle="#8fdcea",e.font="bold 18px monospace",e.textAlign="center",e.fillText(`${(this.params.range/1e3).toFixed(1)} KM`,t,Bi-8),e.fillStyle="rgba(0,0,0,0.16)";for(let r=0;r<Bi;r+=6)e.fillRect(0,r,Bi,2)}}const Xs=.64,qs=.78,zd={bin:.62,crate:.66,barrels:.86,case:.5},_n={ore:{id:"ore",name:"Erz",code:"ORE",volumePerTon:.13,container:"bin",basePrice:22,color:7031340,accent:12818986,hazard:!1},water:{id:"water",name:"Wasser",code:"H2O",volumePerTon:.16,container:"barrels",basePrice:8,color:3104628,accent:9426152,hazard:!1},food:{id:"food",name:"Nahrung",code:"NUT",volumePerTon:.2,container:"crate",basePrice:15,color:8155464,accent:14207370,hazard:!1},parts:{id:"parts",name:"Ersatzteile",code:"PRT",volumePerTon:.18,container:"crate",basePrice:46,color:4870976,accent:10465420,hazard:!1},electronics:{id:"electronics",name:"Elektronik",code:"ELC",volumePerTon:.155,container:"case",basePrice:118,color:2896184,accent:6744831,hazard:!1},contraband:{id:"contraband",name:"Kontrabande",code:"---",volumePerTon:.165,container:"crate",basePrice:240,color:2367775,accent:11809834,hazard:!0},copper:{id:"copper",name:"Kupfererz",code:"CU",volumePerTon:.135,container:"bin",basePrice:58,color:5128502,accent:3120250,hazard:!1},silicon:{id:"silicon",name:"Siliziumerz",code:"SI",volumePerTon:.145,container:"bin",basePrice:74,color:5921374,accent:12172484,hazard:!1},platinum:{id:"platinum",name:"Platinerz",code:"PT",volumePerTon:.105,container:"case",basePrice:410,color:4144450,accent:14473416,hazard:!1},crystal:{id:"crystal",name:"Resonanzkristall",code:"KRS",volumePerTon:.19,container:"case",basePrice:690,color:3223106,accent:9400296,hazard:!1}},Ww=Object.keys(_n);function lc(s){return Object.prototype.hasOwnProperty.call(_n,s)}function Xw(s){return Xs*qs*zd[s.container]/s.volumePerTon}function qw(s,e){return e<=0?0:Math.ceil(e/Xw(s)-1e-9)}const $w=40,Kw=2400,Vd=15e3,Fh=.001;function dl(s){return Math.round(s*1e6)/1e6}class $s extends Error{constructor(e){super(e),this.name="CargoError"}}class Yw{capacity;credits;entries=new Map;listeners=new Set;constructor(e={}){this.capacity=e.capacity??$w,this.credits=e.credits??Kw}getCapacity(){return this.capacity}getUsedCapacity(){let e=0;for(const t of this.entries.values())e+=t.tons;return dl(e)}getFreeCapacity(){return dl(this.capacity-this.getUsedCapacity())}getTons(e){return this.entries.get(e)?.tons??0}getAveragePrice(e){const t=this.entries.get(e);return!t||t.tons<=0?0:t.spent/t.tons}getManifest(){const e=[];for(const[t,n]of this.entries)n.tons<=0||e.push({good:t,tons:n.tons,avgPrice:n.spent/n.tons});return e}getCredits(){return this.credits}getPurchaseValue(){let e=0;for(const t of this.entries.values())e+=t.spent;return e}getCargoMass(){return this.getUsedCapacity()*1e3}getShipMass(e=Vd){return e+this.getCargoMass()}getLoadFactor(){return this.capacity>0?this.getUsedCapacity()/this.capacity:0}checkAdd(e,t){if(!lc(e))return`Unbekannte Ware "${e}"`;if(!Number.isFinite(t)||t<=0)return"Menge muss groesser als 0 sein";const n=this.getFreeCapacity();return t>n+Fh?`Laderaum voll: noch ${Ft(n)} t frei, ${Ft(t)} t angefordert`:null}canAdd(e,t){return this.checkAdd(e,t)===null}checkRemove(e,t){if(!lc(e))return`Unbekannte Ware "${e}"`;if(!Number.isFinite(t)||t<=0)return"Menge muss groesser als 0 sein";const n=this.getTons(e);if(t>n+Fh){const i=_n[e].name;return`Nur ${Ft(n)} t ${i} an Bord, ${Ft(t)} t angefordert`}return null}canRemove(e,t){return this.checkRemove(e,t)===null}add(e,t,n=_n[e]?.basePrice??0){const i=this.checkAdd(e,t);if(i)throw new $s(i);const r=this.entries.get(e)??{tons:0,spent:0};r.tons=dl(r.tons+t),r.spent+=t*n,this.entries.set(e,r),this.emit()}remove(e,t){const n=this.checkRemove(e,t);if(n)throw new $s(n);const i=this.entries.get(e);if(!i)return 0;const r=Math.min(t,i.tons),a=r/i.tons;return i.spent-=i.spent*a,i.tons=dl(i.tons-r),i.tons<Fh&&this.entries.delete(e),this.emit(),r}buy(e,t,n=_n[e]?.basePrice??0){const i=this.checkAdd(e,t);if(i)throw new $s(i);const r=t*n;if(r>this.credits)throw new $s(`Zu wenig Guthaben: ${Math.round(r)} Cr noetig, ${Math.round(this.credits)} Cr vorhanden`);return this.credits-=r,this.add(e,t,n),r}sell(e,t,n=_n[e]?.basePrice??0){const i=this.checkRemove(e,t);if(i)throw new $s(i);const a=this.remove(e,t)*n;return this.credits+=a,a}setCredits(e){this.credits=e,this.emit()}addCredits(e){this.credits+=e,this.emit()}clear(){this.entries.size!==0&&(this.entries.clear(),this.emit())}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}emit(){for(const e of this.listeners)e()}}function Ft(s){const e=Math.round(s*10)/10;return Number.isInteger(e)?String(e):e.toFixed(1)}const fl=new S,Nm=new S,Um=new S,Fm=new S,Oh=new S,kh=180/Math.PI;function Zw(s){fl.set(0,0,-1).applyQuaternion(s),Nm.set(0,1,0).applyQuaternion(s),Um.set(1,0,0).applyQuaternion(s);const e=Math.asin(Math.max(-1,Math.min(1,fl.y)))*kh,t=(Math.atan2(fl.x,-fl.z)*kh+360)%360,n=-Math.atan2(Um.y,Nm.y)*kh;return{pitch:e,bearing:t,roll:n}}const Om=2e4;function Wg(s){const e=Math.floor(s.x/Om),t=Math.floor(s.z/Om),n=String.fromCharCode(65+(e%26+26)%26),i=(t%100+100)%100;return`TROJA ${n}-${i.toString().padStart(2,"0")}`}function Qw(s,e,t,n){Oh.subVectors(s,t);const i=Oh.length();return i<.001?0:(Fm.subVectors(e,n),-Fm.dot(Oh)/i)}function Jw(s){return!s||s.targetIndex<0?"FREI":s.mineral?ii[s.mineral].name.toUpperCase():"UNBEKANNT"}function jw(s){return s?s.scanProgress>0&&s.scanProgress<1?{text:`SCAN ${Math.round(s.scanProgress*100)}%`,fill:s.scanProgress}:s.beamActive?{text:`FOERDERUNG ${s.rate.toFixed(2)} T/S`,fill:s.batchProgress}:{text:s.message,fill:0}:{text:"",fill:0}}function eA(s){return s>=1e3?`${(s/1e3).toFixed(2)} KM`:`${Math.round(s)} M`}function Zi(s,e){return e>0?Math.max(0,Math.min(1,s/e)):0}function tA(s,e,t){const n=Zi(s,e);return n<=0?0:Math.max(1,Math.min(t,Math.ceil(n*t)))}const Ue={bg:"#111111",well:"#222222",grid:"#3d3d3d",dim:"#9a9a9a",ink:"#d8d8d8",band:"#c4c4c4",hot:"#ffffff"};function nr(s,e,t=""){s.ctx.font=`${t} ${e}px ui-monospace, Menlo, monospace`}function lt(s,e,t,n,i=13,r=Ue.dim){const a=s.ctx;nr(s,i,"bold"),"letterSpacing"in a&&(a.letterSpacing="2px"),a.fillStyle=r,a.textBaseline="alphabetic",a.fillText(e,t,n),"letterSpacing"in a&&(a.letterSpacing="0px")}function on(s,e,t,n,i,r="left",a=Ue.hot){const o=s.ctx;nr(s,i,"bold"),o.textAlign=r,o.textBaseline="alphabetic",o.shadowColor="rgba(255,255,255,0.45)",o.shadowBlur=i*.1,o.fillStyle=a,o.fillText(e,t,n),o.shadowBlur=0,o.textAlign="left"}function oo(s,e,t=""){const n=s.ctx,i=Math.round(s.h*.115);n.fillStyle=Ue.band,n.fillRect(0,0,s.w,i);const r=n;return nr(s,i*.6,"bold"),"letterSpacing"in r&&(r.letterSpacing="3px"),n.fillStyle=Ue.bg,n.textBaseline="middle",n.fillText(e,8,i*.55),t&&(n.textAlign="right",n.fillText(t,s.w-8,i*.55),n.textAlign="left"),"letterSpacing"in r&&(r.letterSpacing="0px"),n.textBaseline="alphabetic",i}function Hd(s,e,t,n,i,r=!1){const a=s.ctx;a.fillStyle=r?Ue.ink:Ue.well,a.fillRect(e,t,n,i),a.strokeStyle=r?Ue.hot:Ue.grid,a.lineWidth=1,a.strokeRect(e+.5,t+.5,n-1,i-1)}function jn(s,e,t,n,i,r,a=20,o=-1){const l=s.ctx,c=2,h=(n-c*(a-1))/a,u=tA(r,1,a);for(let d=0;d<a;d++)l.fillStyle=d<u?Ue.hot:Ue.well,l.fillRect(e+d*(h+c),t,h,i);if(o>=0){const d=Math.round(e+Math.max(0,Math.min(1,o))*n);l.fillStyle=Ue.ink,l.fillRect(d-1,t-4,2,i+8)}}function Yl(s,e,t,n,i,r,a){Hd(s,e,t,n,i,a);const o=s.ctx;nr(s,i*.5,"bold"),o.fillStyle=a?Ue.bg:Ue.dim,o.textAlign="center",o.textBaseline="middle",o.fillText(r,e+n/2,t+i*.56),o.textAlign="left",o.textBaseline="alphabetic"}function Zs(s,e,t,n,i,r){Hd(s,e,t,n,i);const a=s.ctx;nr(s,i*.32,"bold"),a.fillStyle=Ue.grid,a.fillText(r,e+6,t+i*.42),nr(s,i*.42,"bold"),a.fillText("- - -",e+6,t+i*.85)}function lo(s){const e=s.ctx;e.fillStyle=Ue.bg,e.fillRect(0,0,s.w,s.h);const t=e.createRadialGradient(s.w/2,s.h*.42,0,s.w/2,s.h*.42,s.w*.75);t.addColorStop(0,"rgba(255,255,255,0.07)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,s.w,s.h)}function co(s){const e=s.ctx;e.fillStyle="rgba(0,0,0,0.20)";for(let r=0;r<s.h;r+=4)e.fillRect(0,r,s.w,2);const t=s.t*.18%1*(s.h+40)-20,n=e.createLinearGradient(0,t-18,0,t+18);n.addColorStop(0,"rgba(255,255,255,0)"),n.addColorStop(.5,"rgba(255,255,255,0.05)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,t-18,s.w,36);const i=e.createRadialGradient(s.w/2,s.h/2,s.h*.35,s.w/2,s.h/2,s.w*.72);i.addColorStop(0,"rgba(0,0,0,0)"),i.addColorStop(1,"rgba(0,0,0,0.45)"),e.fillStyle=i,e.fillRect(0,0,s.w,s.h)}function cc(s,e=1.6){return s*e%1<.5?1:0}const nA=(s,e)=>{lo(s);const t=oo(s,"ANTRIEB",Hg[e.mode]),n=12;lt(s,"GESCHW",n,t+22),on(s,`${Math.round(e.speed)}`,n-2,t+75,54);const i=s.ctx.measureText(`${Math.round(e.speed)}`).width;lt(s,"M/S",n+i+8,t+75,15,Ue.ink),lt(s,"SOLL",s.w-n-100,t+22),on(s,`${Math.round(e.setSpeed)}`,s.w-n,t+55,30,"right",Ue.ink),lt(s,`MAX ${Math.round(e.maxSetSpeed)}`,s.w-n-100,t+75,12),jn(s,n,t+87,s.w-n*2,12,Zi(e.speed,e.maxSetSpeed),24,Zi(e.setSpeed,e.maxSetSpeed));const r=t+107,a=(s.w-n*2-16)/3;Yl(s,n,r,a,24,"BRENNER",e.afterburner&&cc(s.t,4)>0),Yl(s,n+a+8,r,a,24,"STOP",e.fullStop),Yl(s,n+(a+8)*2,r,a,24,"ASSIST",e.mode!=="newton");const o=r+32,l=(s.w-n*2-8)/2;Zs(s,n,o,l,s.h-o-8,"TRIEBWERK"),Zs(s,n+l+8,o,l,s.h-o-8,"TANK"),co(s)},iA=(s,e)=>{lo(s);const t=e.target,n=e.mining??null,i=oo(s,"ZIEL",t?Jw(n):"FREI"),r=12,a=Math.round(s.h*.68),o=Math.round((s.w-r*2-12)/2);if(t){lt(s,`BROCKEN ${t.index.toString().padStart(3,"0")}`,r,i+20);const c=eA(t.distance),[h,u]=c.split(" ");on(s,h,r-2,i+64,40);const d=s.ctx.measureText(h).width;lt(s,u,r+d+8,i+64,15,Ue.ink);const f=Qw(t.position,t.velocity,e.position,e.velocity);lt(s,"NAEHERUNG",s.w-r-112,i+20),on(s,`${f>=0?"+":""}${Math.round(f)}`,s.w-r,i+52,26,"right",Ue.ink);const p=i+83;lt(s,"VORRAT",r,p,11),on(s,n?`${Ft(n.remainingTons)} T`:"- - -",r+o,p,16,"right",Ue.ink),jn(s,r,p+4,o,8,n?Zi(n.remainingTons,n.totalTons):0,12);const _=r+o+12;lt(s,"INTEGRITAET",_,p,11),on(s,`${Math.round(t.integrity*100)}%`,s.w-r,p,16,"right",Ue.ink),jn(s,_,p+4,o,8,t.integrity,12);const m=i+111,g=jw(n),b=n!==null&&!n.beamActive&&n.scanProgress<=0&&n.message!=="BEREIT";lt(s,g.text,r,m,12,b&&cc(s.t,2)>0?Ue.hot:Ue.ink),n&&on(s,`LADUNG ${Ft(n.cargoUsed)}/${Ft(n.cargoCapacity)} T`,s.w-r,m,13,"right",Ue.dim),jn(s,r,m+4,s.w-r*2,6,g.fill,32)}else{lt(s,"KEIN ZIEL",r,i+38,17),lt(s,"T ERFASST DEN NAECHSTEN BROCKEN",r,i+58,11,Ue.grid),lt(s,"R SCANNT  ·  M FOERDERT",r,i+74,11,Ue.grid);const c=r+s.t*.5%1*(s.w-r*2);s.ctx.fillStyle=Ue.grid,s.ctx.fillRect(r,i+88,s.w-r*2,1),s.ctx.fillStyle=Ue.ink,s.ctx.fillRect(c-12,i+86,24,4),n&&(lt(s,"LADERAUM",r,i+118,11),on(s,`${Ft(n.cargoUsed)} / ${Ft(n.cargoCapacity)} T`,s.w-r,i+118,16,"right",Ue.ink),jn(s,r,i+124,s.w-r*2,8,Zi(n.cargoUsed,n.cargoCapacity),20))}s.ctx.fillStyle=Ue.grid,s.ctx.fillRect(r,a+4,s.w-r*2,1);const l=e.hull<Gg||e.sinceImpact<1.2;lt(s,"EIGENE HUELLE",r,a+30),jn(s,r,a+38,s.w-r*2-126,14,e.hull,14),on(s,`${Math.round(e.hull*100)}%`,s.w-r-70,a+52,22,"right",Ue.ink),Yl(s,s.w-r-64,a+36,64,20,"SCHADEN",l&&cc(s.t,2)>0),lt(s,`ABSCHUESSE ${e.kills}`,r,s.h-12,13,Ue.ink),co(s)},sA=(s,e)=>{lo(s);const t=oo(s,"KURS",Wg(e.position)),n=s.ctx,i=Zw(e.orientation),r=54,a=t+52,o=40;n.save(),n.beginPath(),n.arc(r,a,o,0,Math.PI*2),n.clip(),n.fillStyle=Ue.bg,n.fillRect(r-o,a-o,o*2,o*2),n.translate(r,a),n.rotate(-i.roll*Math.PI/180),n.translate(0,i.pitch*1.1),n.fillStyle="rgba(255,255,255,0.10)",n.fillRect(-o*2,0,o*4,o*3),n.strokeStyle=Ue.hot,n.lineWidth=2,n.beginPath(),n.moveTo(-o*2,0),n.lineTo(o*2,0),n.stroke(),n.strokeStyle=Ue.grid,n.lineWidth=1;for(const h of[-30,-20,-10,10,20,30]){const u=h*1.1,d=h%20===0?20:11;n.beginPath(),n.moveTo(-d,u),n.lineTo(d,u),n.stroke()}n.restore(),n.strokeStyle=Ue.dim,n.lineWidth=2,n.beginPath(),n.arc(r,a,o,0,Math.PI*2),n.stroke(),n.strokeStyle=Ue.hot,n.lineWidth=2,n.beginPath(),n.moveTo(r-14,a),n.lineTo(r-5,a),n.moveTo(r+5,a),n.lineTo(r+14,a),n.moveTo(r,a-4),n.lineTo(r,a+4),n.stroke(),lt(s,"PEILUNG",112,t+22),on(s,`${Math.round(i.bearing).toString().padStart(3,"0")}`,112,t+66,44),lt(s,"LAGE",s.w-12-92,t+22),on(s,`${i.pitch>=0?"+":""}${i.pitch.toFixed(0)}`,s.w-12,t+44,22,"right",Ue.ink),lt(s,"ROLL",s.w-12-92,t+66),on(s,`${i.roll>=0?"+":""}${i.roll.toFixed(0)}`,s.w-12,t+88,22,"right",Ue.ink);const l=s.h-34,c=s.w/70;n.fillStyle=Ue.grid,n.fillRect(0,l,s.w,1);for(let h=Math.ceil(i.bearing-35);h<=i.bearing+35;h++){if(h%5!==0)continue;const u=s.w/2+(h-i.bearing)*c,d=(h%10+10)%10===0;n.fillStyle=d?Ue.ink:Ue.dim,n.fillRect(u,l,1,d?10:5),d&&(nr(s,12,"bold"),n.fillStyle=Ue.dim,n.textAlign="center",n.fillText(`${(h%360+360)%360}`,u,l+24),n.textAlign="left")}n.fillStyle=Ue.hot,n.beginPath(),n.moveTo(s.w/2,l-2),n.lineTo(s.w/2-6,l-12),n.lineTo(s.w/2+6,l-12),n.closePath(),n.fill(),co(s)},Xg=(s,e)=>{lo(s);const t=oo(s,"SCHIFF",cc(s.t,.5)>0?"AKTIV":""),n=12;lt(s,"GESCHWINDIGKEIT",n,t+26),on(s,`${Math.round(e.speed)}`,n-2,t+73,48);const i=s.ctx.measureText(`${Math.round(e.speed)}`).width;lt(s,"M/S",n+i+8,t+73,14,Ue.ink),lt(s,`SOLL ${Math.round(e.setSpeed)}`,s.w-n-96,t+73,14,Ue.dim),jn(s,n,t+81,s.w-n*2,10,Zi(e.speed,e.maxSetSpeed),20,Zi(e.setSpeed,e.maxSetSpeed)),lt(s,"MODUS",n,t+111),lt(s,e.fullStop?"FULL STOP":Hg[e.mode],s.w-n-104,t+111,15,Ue.hot),lt(s,"HUELLE",n,t+139),jn(s,n,t+145,s.w-n*2-62,12,e.hull,14),on(s,`${Math.round(e.hull*100)}%`,s.w-n,t+157,18,"right",Ue.ink),lt(s,"SEKTOR",n,t+181),lt(s,Wg(e.position),s.w-n-136,t+181,14,Ue.ink);const r=e.mining??null;r?(lt(s,"LADUNG",n,s.h-40,11),on(s,`${Ft(r.cargoUsed)} / ${Ft(r.cargoCapacity)} T`,s.w-n,s.h-40,16,"right",Ue.ink),jn(s,n,s.h-34,s.w-n*2,10,Zi(r.cargoUsed,r.cargoCapacity),20)):Zs(s,n,s.h-36,s.w-n*2,28,"FRACHT / DOCK"),co(s)},qg=(s,e)=>{lo(s);const t=oo(s,"WERKBANK"),n=10;lt(s,"HUELLE",n,t+24),on(s,`${Math.round(e.hull*100)}%`,n-2,t+66,42),jn(s,n,t+76,s.w-n*2,12,e.hull,14);const i=(s.w-n*2-8)/2,r=t+96,a=(s.h-r-n-8)/2,o=e.mining??null;o?(Hd(s,n,r,i,a),lt(s,"FRACHT",n+6,r+16,11),on(s,`${Ft(o.cargoUsed)} T`,n+i-6,r+16,16,"right",Ue.ink),lt(s,`FREI ${Ft(o.cargoFree)} T`,n+6,r+32,11),jn(s,n+6,r+a-14,i-12,8,Zi(o.cargoUsed,o.cargoCapacity),14)):Zs(s,n,r,i,a,"FRACHT"),Zs(s,n+i+8,r,i,a,"TEILE"),Zs(s,n,r+a+8,i,a,"REPARATUR"),Zs(s,n+i+8,r+a+8,i,a,"ENERGIE"),co(s)},km=.5,rA=[{mesh:"SM_Screen_MFD2",width:384,height:216,hz:12,normal:[0,1,0],right:[-1,0,0],draw:nA},{mesh:"SM_Screen_MFD0",width:384,height:216,hz:12,normal:[0,1,0],right:[-1,0,0],draw:iA},{mesh:"SM_Screen_Overhead",width:400,height:160,hz:8,normal:[0,-1,0],right:[-1,0,0],draw:sA},{mesh:"SM_Screen_Corridor",width:352,height:256,hz:5,normal:[1,0,0],right:[0,0,-1],draw:Xg},{mesh:"SM_Screen_Bench",width:320,height:232,hz:3,normal:[1,0,0],right:[0,0,-1],draw:qg}];function aA(s,e,t){const n=s.geometry.getAttribute("position"),i=new S().crossVectors(t,e).normalize();let r=1/0,a=-1/0,o=1/0,l=-1/0;const c=new S;for(let f=0;f<n.count;f++){c.fromBufferAttribute(n,f);const p=c.dot(t),_=c.dot(i);r=Math.min(r,p),a=Math.max(a,p),o=Math.min(o,_),l=Math.max(l,_)}const h=Math.max(a-r,1e-6),u=Math.max(l-o,1e-6),d=new Float32Array(n.count*2);for(let f=0;f<n.count;f++)c.fromBufferAttribute(n,f),d[f*2]=(c.dot(t)-r)/h,d[f*2+1]=(c.dot(i)-o)/u;s.geometry.setAttribute("uv",new at(d,2))}const Bm=1.45;class oA{panels=[];time=0;attachTo(e){this.dispose();for(const t of rA){const n=e.getObjectByName(t.mesh);if(!(n instanceof Me))continue;const i=Array.isArray(n.material)?n.material[0]:n.material;if(!(i instanceof Qe))continue;aA(n,new S(...t.normal).normalize(),new S(...t.right).normalize());const r=document.createElement("canvas");r.width=t.width,r.height=t.height;const a=r.getContext("2d");if(!a)throw new Error(`2D-Context fuer ${t.mesh} nicht verfuegbar`);const o=new un(r);o.colorSpace=_t,o.magFilter=Pt,o.anisotropy=8,o.flipY=!1,i.emissiveMap=o,i.emissiveIntensity*=Bm,i.needsUpdate=!0,this.panels.push({def:t,paint:{ctx:a,w:t.width,h:t.height,t:0},texture:o,material:i,baseEmissive:i.emissiveIntensity,originalEmissive:i.emissiveIntensity/Bm,since:1/0})}return this.panels.length}update(e,t){this.time+=e;let n=null,i=1;for(const r of this.panels){r.since+=e;const a=r.since*this.rateOf(r,t);a>=i&&(i=a,n=r),r.material.emissiveIntensity=r.baseEmissive*lA(this.time,r.def.hz)}n&&(n.paint.t=this.time,n.since=0,n.def.draw(n.paint,t),n.texture.needsUpdate=!0)}rateOf(e,t){const n=e.def.hz;return t.external||(e.def.draw===Xg||e.def.draw===qg)!==t.walking?Math.min(n,km):n}dispose(){for(const e of this.panels)e.material.emissiveIntensity=e.originalEmissive,e.texture.dispose();this.panels.length=0}}function lA(s,e){return 1+Math.sin(s*(7.3+e*.7))*.018+Math.sin(s*(19.1+e*1.3))*.012}const Zl=2.4,nd=.76,cA=.1,hA=.95,uA=46,dA=8,fA=1,pA=.18,mA=.03,gA=.14,zm=new te(.22,.84,.54),Bh=new te(.96,.54,.18),pl=new te(.32,.78,.62);function _A(s,e,t,n){const i=Math.tan(t*Math.PI/360);return n.set(nd*s*i,-nd*e*i,-1).normalize()}function vA(s,e,t=Zl){const n=2*s*t/Math.max(e,1);return Math.max(cA,Math.min(hA,n))}function xA(s,e=uA,t=dA){return s<=e-t?1:s>=e?0:(e-s)/t}function MA(s,e,t){const n=Math.min(1,Math.max(0,(t-s)/(e-s)));return n*n*(3-2*n)}function la(s){const e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d");if(!t)throw new Error("2D-Context fuer das Scheiben-HUD nicht verfuegbar");return t.strokeStyle="#ffffff",t.fillStyle="#ffffff",t.lineCap="round",[e,t]}function ca(s){const e=new un(s);return e.anisotropy=4,e}function SA(){const[s,e]=la(256),t=128;e.lineWidth=5,e.beginPath(),e.arc(t,t,34,0,Math.PI*2),e.stroke();for(const[n,i]of[[0,-1],[0,1],[-1,0],[1,0]])e.beginPath(),e.moveTo(t+n*62,t+i*62),e.lineTo(t+n*104,t+i*104),e.stroke();return e.beginPath(),e.arc(t,t,3,0,Math.PI*2),e.fill(),ca(s)}function yA(){const[s,e]=la(64);return e.lineWidth=9,e.beginPath(),e.moveTo(8,56),e.lineTo(8,8),e.lineTo(56,8),e.stroke(),ca(s)}function bA(){const[s,e]=la(128),t=64;return e.lineWidth=6,e.setLineDash([9,7]),e.beginPath(),e.arc(t,t,38,0,Math.PI*2),e.stroke(),e.setLineDash([]),e.beginPath(),e.arc(t,t,6,0,Math.PI*2),e.fill(),ca(s)}function EA(){const[s,e]=la(128),t=64;e.lineWidth=6,e.beginPath(),e.arc(t,t,26,0,Math.PI*2),e.stroke(),e.beginPath(),e.arc(t,t,5,0,Math.PI*2),e.fill();for(const[n,i]of[[0,-1],[-1,0],[1,0]])e.beginPath(),e.moveTo(t+n*26,t+i*26),e.lineTo(t+n*52,t+i*52),e.stroke();return ca(s)}function TA(){const[s,e]=la(128),t=64;e.lineWidth=5,e.globalAlpha=.85,e.beginPath(),e.arc(t,t,26,0,Math.PI*2),e.stroke(),e.beginPath(),e.moveTo(t-15,t-15),e.lineTo(t+15,t+15),e.moveTo(t+15,t-15),e.lineTo(t-15,t+15),e.stroke();for(const[n,i]of[[0,-1],[-1,0],[1,0],[0,1]])e.beginPath(),e.moveTo(t+n*26,t+i*26),e.lineTo(t+n*48,t+i*48),e.stroke();return ca(s)}function wA(){const[s,e]=la(128),t=64;return e.lineWidth=7,e.beginPath(),e.arc(t,t,34,0,Math.PI*2),e.stroke(),ca(s)}function AA(){const s=[],e=16*Math.PI/180,t=8;for(let i=0;i<4;i++){const r=i*Math.PI/2;for(let a=0;a<t;a++){const o=r-e+2*e/t*a,l=r-e+2*e/t*(a+1);s.push(Math.cos(o),Math.sin(o),0,Math.cos(l),Math.sin(l),0)}}const n=new xt;return n.setAttribute("position",new vt(s,3)),n}function RA(){const s=new xt,e=new vt(new Float32Array(6),3);return e.setUsage(H_),s.setAttribute("position",e),s}function $g(s,e,t=1){return new Ot({map:s,color:e,transparent:!0,opacity:t,blending:qt,depthTest:!1,depthWrite:!1,fog:!1})}function Lr(s,e,t,n=1){const i=new Me(new Ti(e,e),$g(s,t,n));return i.renderOrder=900,i.frustumCulled=!1,i}function CA(s){return!s||s.targetIndex<0?"":s.scanProgress>0&&s.scanProgress<1?`SCAN ${Math.round(s.scanProgress*100)}%`:s.beamActive&&s.mineral?`${ii[s.mineral].code} +${Ft(s.sessionTons)} T`:s.mineral?ii[s.mineral].name.toUpperCase():"UNBEKANNT"}const ml=new S,gl=new S,Rn=new S,Vm=new S,zh=new S,Ir=new tt,Hm=new ye,_l=new tt,Gm=new ye,PA=new S(0,1,0);class LA{group=new Yt;crosshair;cursor;stem;limit;prograde;retrograde;lead;targetGroup=new Yt;corners=[];labelMesh;labelCanvas;labelCtx;labelTexture;lastLabel="";constructor(){this.group.name="GlassHud",this.group.renderOrder=900,this.crosshair=Lr(SA(),.24,pl,.9),this.cursor=Lr(wA(),.075,pl,.9),this.prograde=Lr(EA(),.15,zm,.9),this.retrograde=Lr(TA(),.15,zm,.55),this.lead=Lr(bA(),.11,Bh,.95),this.stem=new ja(RA(),new Ja({color:pl,transparent:!0,opacity:.55,blending:qt,depthTest:!1,depthWrite:!1})),this.stem.renderOrder=899,this.stem.frustumCulled=!1,this.limit=new Pd(AA(),new Ja({color:pl,transparent:!0,opacity:.22,blending:qt,depthTest:!1,depthWrite:!1})),this.limit.renderOrder=899,this.limit.frustumCulled=!1;const e=yA();for(let n=0;n<4;n++){const i=Lr(e,.055,Bh,.95);i.rotation.z=-n*Math.PI/2,this.corners.push(i),this.targetGroup.add(i)}this.labelCanvas=document.createElement("canvas"),this.labelCanvas.width=256,this.labelCanvas.height=96;const t=this.labelCanvas.getContext("2d");if(!t)throw new Error("2D-Context fuer die Zielschrift nicht verfuegbar");this.labelCtx=t,this.labelTexture=new un(this.labelCanvas),this.labelMesh=new Me(new Ti(.3,.1125),$g(this.labelTexture,Bh,.95)),this.labelMesh.renderOrder=901,this.labelMesh.frustumCulled=!1,this.targetGroup.add(this.labelMesh),this.targetGroup.visible=!1,this.group.add(this.limit,this.stem,this.crosshair,this.cursor,this.prograde,this.retrograde,this.lead,this.targetGroup),this.group.traverse(n=>n.layers.set(0))}dispose(){this.group.traverse(e=>{if(e instanceof Me||e instanceof ja){e.geometry.dispose();const t=e.material;Array.isArray(t)?t.forEach(n=>n.dispose()):t.dispose()}}),this.group.removeFromParent()}update(e){if(this.group.visible=!e.walking&&!e.external,e.walking||e.external)return;const t=e.camera;t.getWorldPosition(gl),Hm.copy(this.group.matrixWorld).invert(),ml.copy(gl).applyMatrix4(Hm),this.group.getWorldQuaternion(Ir).invert(),t.getWorldQuaternion(_l),zh.set(0,0,-1).applyQuaternion(_l).applyQuaternion(Ir),this.place(this.crosshair,Rn.set(0,0,-1));const n=Math.max(0,1-e.sinceHit/pA);this.crosshair.scale.setScalar(1+n*.22),this.crosshair.material.opacity=.9,this.updateCursor(e,t),this.updateMarkers(e),this.updateTarget(e),this.group.updateMatrixWorld(!0)}place(e,t){e.position.copy(t).multiplyScalar(Zl).add(ml),Gm.lookAt(ml,e.position,PA),e.quaternion.setFromRotationMatrix(Gm)}angleToView(e){return Math.acos(Math.max(-1,Math.min(1,e.dot(zh))))*180/Math.PI}updateCursor(e,t){const n=e.pointerLocked&&e.mode!=="arcade";this.limit.visible=n,n&&(this.place(this.limit,Vm.copy(zh)),this.limit.scale.setScalar(Zl*nd*Math.tan(t.fov*Math.PI/360)));const i=e.mouseOffset,r=Math.min(1,Math.hypot(i.x,i.y)),a=MA(mA,gA,r),o=e.pointerLocked&&a>.01;if(this.cursor.visible=o,this.stem.visible=o,!o)return;this.cursor.material.opacity=.9*a,this.stem.material.opacity=.55*a,_A(i.x,i.y,t.fov,Rn),t.getWorldQuaternion(_l),Rn.applyQuaternion(_l).applyQuaternion(Ir),this.place(this.cursor,Rn);const l=this.stem.geometry.getAttribute("position"),c=this.crosshair.position,h=this.cursor.position;l.setXYZ(0,c.x,c.y,c.z),l.setXYZ(1,h.x,h.y,h.z),l.needsUpdate=!0,this.stem.geometry.computeBoundingSphere()}updateMarkers(e){if(e.speed<fA){this.prograde.visible=!1,this.retrograde.visible=!1;return}Rn.copy(e.velocity).normalize().applyQuaternion(Ir),this.showMarker(this.prograde,Rn,.9),this.showMarker(this.retrograde,Rn.multiplyScalar(-1),.5)}showMarker(e,t,n){const i=xA(this.angleToView(t))*n;e.visible=i>.02,e.visible&&(e.material.opacity=i,this.place(e,t))}updateTarget(e){const t=e.target;if(!t){this.targetGroup.visible=!1,this.lead.visible=!1;return}Rn.subVectors(t.position,gl).normalize().applyQuaternion(Ir);const n=this.angleToView(Rn)<88;if(this.targetGroup.visible=n,n){this.place(this.targetGroup,Rn);const r=vA(t.radius,t.distance)*.5,a=[[-r,r],[r,r],[r,-r],[-r,-r]];this.corners.forEach((o,l)=>{const[c,h]=a[l];o.position.set(c,h,0)}),this.labelMesh.position.set(0,-r-.06,0),this.updateLabel(t.distance,t.integrity,e.mining??null)}Rn.subVectors(t.lead,gl).normalize().applyQuaternion(Ir);const i=Vm.copy(Rn).multiplyScalar(Zl).add(ml).distanceTo(this.targetGroup.position);this.lead.visible=n&&i>.012,this.lead.visible&&this.place(this.lead,Rn)}updateLabel(e,t,n){const i=e>=1e3?`${(e/1e3).toFixed(2)} KM`:`${Math.round(e/5)*5} M`,r=Math.round(t*10),a=CA(n),o=`${i}  ${r}  ${a}`;if(o===this.lastLabel)return;this.lastLabel=o;const l=this.labelCtx;l.clearRect(0,0,256,96),l.fillStyle="#ffffff",l.font="bold 30px ui-monospace, Menlo, monospace",l.textAlign="center",l.textBaseline="middle",l.fillText(i,128,18),l.font="bold 22px ui-monospace, Menlo, monospace",l.fillText(`${"|".repeat(r)}${".".repeat(10-r)}`,128,48),a&&(l.font="bold 20px ui-monospace, Menlo, monospace",l.fillText(a,128,78)),this.labelTexture.needsUpdate=!0}}const Qs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ts{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const IA=new ao(-1,1,1,-1,0,1);class DA extends xt{constructor(){super(),this.setAttribute("position",new vt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new vt([0,2,0,0,2,0],2))}}const NA=new DA;class Mc{constructor(e){this._mesh=new Me(NA,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,IA)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class UA extends Ts{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Et?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=vi.clone(e.uniforms),this.material=new Et({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Mc(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Wm extends Ts{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class FA extends Ts{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class OA{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Se);this._width=n.width,this._height=n.height,t=new hn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:cn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new UA(Qs),this.copyPass.material.blending=nn,this.timer=new dx}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Wm!==void 0&&(a instanceof Wm?n=!0:a instanceof FA&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Se);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Vh extends Ts{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new te}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const vl={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Se},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new ye},cameraProjectionMatrixInverse:{value:new ye},cameraWorldMatrix:{value:new ye},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new S(-1,-1,-1)},sceneBoxMax:{value:new S(1,1,1)}},vertexShader:`

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
		}`},xl={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Hh={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function kA(s=5){const e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=BA(e),n=t.length,i=new Uint8Array(n*4);for(let a=0;a<n;++a){const o=t[a],l=2*Math.PI*o/n,c=new S(Math.cos(l),Math.sin(l),0).normalize();i[a*4]=(c.x*.5+.5)*255,i[a*4+1]=(c.y*.5+.5)*255,i[a*4+2]=127,i[a*4+3]=255}const r=new so(i,e,e);return r.wrapS=Wn,r.wrapT=Wn,r.needsUpdate=!0,r}function BA(s){const e=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),t=e*e,n=Array(t).fill(0);let i=Math.floor(e/2),r=e-1;for(let a=1;a<=t;){if(i===-1&&r===e?(r=e-2,i=0):(r===e&&(r=0),i<0&&(i=e-1)),n[i*e+r]!==0){r-=2,i++;continue}else n[i*e+r]=a++;r++,i--}return n}const Ml={defines:{SAMPLES:16,SAMPLE_VECTORS:Kg(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Se},cameraProjectionMatrixInverse:{value:new ye},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Kg(s,e,t){const n=zA(s,e,t);let i="vec3[SAMPLES](";for(let r=0;r<s;r++){const a=n[r];i+=`vec3(${a.x}, ${a.y}, ${a.z})${r<s-1?",":")"}`}return i}function zA(s,e,t){const n=[];for(let i=0;i<s;i++){const r=2*Math.PI*e*i/s,a=Math.pow(i/(s-1),t);n.push(new S(Math.cos(r),Math.sin(r),a))}return n}class VA{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,i,r;const a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,u=(l+c)*h,d=l-u,f=c-u,p=e-d,_=t-f;let m,g;p>_?(m=1,g=0):(m=0,g=1);const b=p-m+h,E=_-g+h,M=p-1+2*h,w=_-1+2*h,A=l&255,C=c&255,x=this.perm[A+this.perm[C]]%12,T=this.perm[A+m+this.perm[C+g]]%12,L=this.perm[A+1+this.perm[C+1]]%12;let P=.5-p*p-_*_;P<0?n=0:(P*=P,n=P*P*this._dot(this.grad3[x],p,_));let I=.5-b*b-E*E;I<0?i=0:(I*=I,i=I*I*this._dot(this.grad3[T],b,E));let k=.5-M*M-w*w;return k<0?r=0:(k*=k,r=k*k*this._dot(this.grad3[L],M,w)),70*(n+i+r)}noise3d(e,t,n){let i,r,a,o;const c=(e+t+n)*.3333333333333333,h=Math.floor(e+c),u=Math.floor(t+c),d=Math.floor(n+c),f=1/6,p=(h+u+d)*f,_=h-p,m=u-p,g=d-p,b=e-_,E=t-m,M=n-g;let w,A,C,x,T,L;b>=E?E>=M?(w=1,A=0,C=0,x=1,T=1,L=0):b>=M?(w=1,A=0,C=0,x=1,T=0,L=1):(w=0,A=0,C=1,x=1,T=0,L=1):E<M?(w=0,A=0,C=1,x=0,T=1,L=1):b<M?(w=0,A=1,C=0,x=0,T=1,L=1):(w=0,A=1,C=0,x=1,T=1,L=0);const P=b-w+f,I=E-A+f,k=M-C+f,q=b-x+2*f,O=E-T+2*f,X=M-L+2*f,B=b-1+3*f,Q=E-1+3*f,J=M-1+3*f,re=h&255,le=u&255,ge=d&255,Je=this.perm[re+this.perm[le+this.perm[ge]]]%12,pt=this.perm[re+w+this.perm[le+A+this.perm[ge+C]]]%12,je=this.perm[re+x+this.perm[le+T+this.perm[ge+L]]]%12,K=this.perm[re+1+this.perm[le+1+this.perm[ge+1]]]%12;let ie=.6-b*b-E*E-M*M;ie<0?i=0:(ie*=ie,i=ie*ie*this._dot3(this.grad3[Je],b,E,M));let ee=.6-P*P-I*I-k*k;ee<0?r=0:(ee*=ee,r=ee*ee*this._dot3(this.grad3[pt],P,I,k));let Ie=.6-q*q-O*O-X*X;Ie<0?a=0:(Ie*=Ie,a=Ie*Ie*this._dot3(this.grad3[je],q,O,X));let Ne=.6-B*B-Q*Q-J*J;return Ne<0?o=0:(Ne*=Ne,o=Ne*Ne*this._dot3(this.grad3[K],B,Q,J)),32*(i+r+a+o)}noise4d(e,t,n,i){const r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,u,d,f,p;const _=(e+t+n+i)*l,m=Math.floor(e+_),g=Math.floor(t+_),b=Math.floor(n+_),E=Math.floor(i+_),M=(m+g+b+E)*c,w=m-M,A=g-M,C=b-M,x=E-M,T=e-w,L=t-A,P=n-C,I=i-x,k=T>L?32:0,q=T>P?16:0,O=L>P?8:0,X=T>I?4:0,B=L>I?2:0,Q=P>I?1:0,J=k+q+O+X+B+Q,re=a[J][0]>=3?1:0,le=a[J][1]>=3?1:0,ge=a[J][2]>=3?1:0,Je=a[J][3]>=3?1:0,pt=a[J][0]>=2?1:0,je=a[J][1]>=2?1:0,K=a[J][2]>=2?1:0,ie=a[J][3]>=2?1:0,ee=a[J][0]>=1?1:0,Ie=a[J][1]>=1?1:0,Ne=a[J][2]>=1?1:0,De=a[J][3]>=1?1:0,bt=T-re+c,He=L-le+c,ot=P-ge+c,et=I-Je+c,Ye=T-pt+2*c,Tt=L-je+2*c,Rt=P-K+2*c,It=I-ie+2*c,kt=T-ee+3*c,Mt=L-Ie+3*c,wt=P-Ne+3*c,N=I-De+3*c,jt=T-1+4*c,it=L-1+4*c,R=P-1+4*c,v=I-1+4*c,F=m&255,z=g&255,W=b&255,ne=E&255,oe=o[F+o[z+o[W+o[ne]]]]%32,$=o[F+re+o[z+le+o[W+ge+o[ne+Je]]]]%32,Y=o[F+pt+o[z+je+o[W+K+o[ne+ie]]]]%32,ce=o[F+ee+o[z+Ie+o[W+Ne+o[ne+De]]]]%32,we=o[F+1+o[z+1+o[W+1+o[ne+1]]]]%32;let ae=.6-T*T-L*L-P*P-I*I;ae<0?h=0:(ae*=ae,h=ae*ae*this._dot4(r[oe],T,L,P,I));let se=.6-bt*bt-He*He-ot*ot-et*et;se<0?u=0:(se*=se,u=se*se*this._dot4(r[$],bt,He,ot,et));let Ee=.6-Ye*Ye-Tt*Tt-Rt*Rt-It*It;Ee<0?d=0:(Ee*=Ee,d=Ee*Ee*this._dot4(r[Y],Ye,Tt,Rt,It));let Pe=.6-kt*kt-Mt*Mt-wt*wt-N*N;Pe<0?f=0:(Pe*=Pe,f=Pe*Pe*this._dot4(r[ce],kt,Mt,wt,N));let ke=.6-jt*jt-it*it-R*R-v*v;return ke<0?p=0:(ke*=ke,p=ke*ke*this._dot4(r[we],jt,it,R,v)),27*(h+u+d+f+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,i){return e[0]*t+e[1]*n+e[2]*i}_dot4(e,t,n,i,r){return e[0]*t+e[1]*n+e[2]*i+e[3]*r}}class Bn extends Ts{constructor(e,t,n=512,i=512,r,a,o){super(),this.width=n,this.height=i,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=kA(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new hn(this.width,this.height,{type:cn}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Et({defines:Object.assign({},vl.defines),uniforms:vi.clone(vl.uniforms),vertexShader:vl.vertexShader,fragmentShader:vl.fragmentShader,blending:nn,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Vv,this.normalMaterial.blending=nn,this.pdMaterial=new Et({defines:Object.assign({},Ml.defines),uniforms:vi.clone(Ml.uniforms),vertexShader:Ml.vertexShader,fragmentShader:Ml.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Et({defines:Object.assign({},xl.defines),uniforms:vi.clone(xl.uniforms),vertexShader:xl.vertexShader,fragmentShader:xl.fragmentShader,blending:nn}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Et({uniforms:vi.clone(Qs.uniforms),vertexShader:Qs.vertexShader,fragmentShader:Qs.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:hu,blendDst:Ba,blendEquation:Qn,blendSrcAlpha:cu,blendDstAlpha:Ba,blendEquationAlpha:Qn}),this.blendMaterial=new Et({uniforms:vi.clone(Hh.uniforms),vertexShader:Hh.vertexShader,fragmentShader:Hh.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:K0,blendSrc:hu,blendDst:Ba,blendEquation:Qn,blendSrcAlpha:cu,blendDstAlpha:Ba,blendEquationAlpha:Qn}),this._fsQuad=new Mc(null),this._originalClearColor=new te,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new tr,this.depthTexture.format=_s,this.depthTexture.type=Zr,this.normalRenderTarget=new hn(this.width,this.height,{minFilter:Ht,magFilter:Ht,type:cn,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const n=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Kg(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Bn.OUTPUT.Off:break;case Bn.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=nn,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Bn.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=nn,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Bn.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=nn,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Bn.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case Bn.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=nn,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Bn.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=nn,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,n,i,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,i,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,r=t.clearAlpha||r,i!=null&&(e.setClearColor(i),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(n){(n.isPoints||n.isLine||n.isLine2)&&n.visible&&(n.visible=!1,t.push(n))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){const t=new VA,n=e*e*4,i=new Uint8Array(n);for(let a=0;a<e;a++)for(let o=0;o<e;o++){const l=a,c=o;i[(a*e+o)*4]=(t.noise(l,c)*.5+.5)*255,i[(a*e+o)*4+1]=(t.noise(l+e,c)*.5+.5)*255,i[(a*e+o)*4+2]=(t.noise(l,c+e)*.5+.5)*255,i[(a*e+o)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}const r=new so(i,e,e,Ln,bn);return r.wrapS=Wn,r.wrapT=Wn,r.needsUpdate=!0,r}}Bn.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const HA={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new te(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class na extends Ts{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new Se(e.x,e.y):new Se(256,256),this.clearColor=new te(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new hn(r,a,{type:cn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new hn(r,a,{type:cn});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new hn(r,a,{type:cn});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),a=Math.round(a/2)}const o=HA;this.highPassUniforms=vi.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Et({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Se(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new S(1,1,1),new S(1,1,1),new S(1,1,1),new S(1,1,1),new S(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=vi.clone(Qs.uniforms),this.blendMaterial=new Et({uniforms:this.copyUniforms,vertexShader:Qs.vertexShader,fragmentShader:Qs.fragmentShader,premultipliedAlpha:!0,blending:qt,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new te,this._oldClearAlpha=1,this._basic=new Ot,this._fsQuad=new Mc(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new Se(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=na.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=na.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new Et({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Se(.5,.5)},direction:{value:new Se(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Et({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}na.BlurDirectionX=new Se(1,0);na.BlurDirectionY=new Se(0,1);const Sl={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class GA extends Ts{constructor(){super(),this.isOutputPass=!0,this.uniforms=vi.clone(Sl.uniforms),this.material=new _g({name:Sl.name,uniforms:this.uniforms,vertexShader:Sl.vertexShader,fragmentShader:Sl.fragmentShader}),this._fsQuad=new Mc(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},$e.getTransfer(this._outputColorSpace)===ct&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===cd?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===hd?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ud?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===uc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===fd?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===pd?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===dd&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const ar=1,Yg=2,WA=.75,XA=.42,qA=.5,$A=4,KA={radius:.45,distanceExponent:1.6,thickness:.6,scale:1,samples:16,distanceFallOff:1,screenSpaceRadius:!1},YA=.85,ZA={radius:.5,distanceExponent:1.4,thickness:12,scale:1,samples:8,distanceFallOff:1,screenSpaceRadius:!0},QA=.6;class Xm extends Bn{constructor(e,t,n,i){super(e,t,n,i),this.needsSwap=!1}render(e,t,n,i=0,r=!1){const a=this;if(this.renderToScreen||typeof a._renderPass!="function"||!a.blendMaterial){a.output=Bn.OUTPUT.Default,super.render(e,t,n,i,r);return}a.output=Bn.OUTPUT.Off,super.render(e,t,n,i,r),a.blendMaterial.uniforms.intensity.value=a.blendIntensity,a.blendMaterial.uniforms.tDiffuse.value=a.pdRenderTarget.texture,a._renderPass(e,a.blendMaterial,n)}}class JA extends Ts{armed=!1;constructor(){super(),this.needsSwap=!1}arm(){this.armed=!0}render(e){this.armed&&(this.armed=!1,e.shadowMap.needsUpdate=!0)}}function jA(s,e,t,n,i){const r=s.getDrawingBufferSize(new Se),a=new hn(r.x,r.y,{type:cn,samples:$A}),o=new OA(s,a);o.setPixelRatio(s.getPixelRatio());const l=r.clone();o.addPass(new Vh(e,i));const c=new JA;o.addPass(c);const h=new Vh(e,n);h.clear=!1,h.clearDepth=!0,o.addPass(h);const u=o.passes.length;let d=null;const f=new Vh(e,t);f.clear=!1,f.clearDepth=!0,o.addPass(f);const p=new Xm(e,t,r.x,r.y);return p.blendIntensity=YA,p.updateGtaoMaterial(KA),o.addPass(p),o.addPass(new na(new Se(r.x,r.y),XA,qA,WA)),o.addPass(new GA),{render:()=>o.render(),setAmbientOcclusion:_=>{p.enabled=_},setWorldAmbientOcclusion:_=>{if(!d){if(!_)return;d=new Xm(e,n,r.x,r.y),d.blendIntensity=QA,d.updateGtaoMaterial(ZA),d.setSize(l.x,l.y),o.insertPass(d,u)}d.enabled=_},requestShadowUpdate:()=>c.arm(),setSize:(_,m)=>{o.setPixelRatio(s.getPixelRatio()),o.setSize(_,m),l.set(_,m).multiplyScalar(s.getPixelRatio())},dispose:()=>{o.dispose(),a.dispose()}}}const eR=460,tR=.1,nR=.3,iR=.09,qm=4,Gh=256,$m=384,Km={far:"rgba(102, 234, 255, 0.72)","in-range":"rgba(102, 234, 255, 0.95)",cleared:"rgba(255, 179, 71, 1)"};function Ym(s,e){const t=document.createElement("canvas");t.width=s,t.height=e;const n=new un(t);return n.colorSpace=_t,n.minFilter=Pt,n.generateMipmaps=!1,{sprite:new Jr(new er({map:n,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1})),canvas:t}}class sR extends Fe{frame;frameCanvas;label;labelCanvas;drawnMode="";drawnText="";constructor(){super(),this.name="ApproachMarker",this.frustumCulled=!1;const e=Ym(Gh,Gh);this.frame=e.sprite,this.frameCanvas=e.canvas;const t=Ym($m,$m/qm);this.label=t.sprite,this.labelCanvas=t.canvas;for(const n of[this.frame,this.label])n.frustumCulled=!1,n.renderOrder=5,this.add(n);this.visible=!1}update(e,t,n,i){if(this.visible=e!=="hidden",!this.visible)return;const r=Math.min(Math.max(eR,t*tR),t*nR);this.frame.scale.set(r,r,1);const a=Math.max(t*iR,r*.42),o=a/qm;this.label.scale.set(a,o,1),this.label.center.set(.5,.5+r*.58/o),e!==this.drawnMode&&(this.drawFrame(e),this.drawnMode=e,this.drawnText="");const l=`${n}  ${rR(t)}
${i}`;l!==this.drawnText&&(this.drawLabel(e,l),this.drawnText=l)}drawFrame(e){if(e==="hidden")return;const t=this.frameCanvas.getContext("2d");if(!t)return;const n=Gh;t.clearRect(0,0,n,n);const i=Km[e],r=14,a=52;t.strokeStyle=i,t.lineWidth=5,t.lineCap="square";for(const[l,c,h,u]of[[r,r,1,1],[n-r,r,-1,1],[r,n-r,1,-1],[n-r,n-r,-1,-1]])t.beginPath(),t.moveTo(l+h*a,c),t.lineTo(l,c),t.lineTo(l,c+u*a),t.stroke();t.lineWidth=3,t.globalAlpha=.6;for(const[l,c,h,u]of[[n/2,r,n/2,r+16],[n/2,n-r,n/2,n-r-16],[r,n/2,r+16,n/2],[n-r,n/2,n-r-16,n/2]])t.beginPath(),t.moveTo(l,c),t.lineTo(h,u),t.stroke();t.globalAlpha=1;const o=this.frame.material.map;o&&(o.needsUpdate=!0)}drawLabel(e,t){if(e==="hidden")return;const n=this.labelCanvas.getContext("2d");if(!n)return;const i=this.labelCanvas.width,r=this.labelCanvas.height;n.clearRect(0,0,i,r);const a=Km[e],[o="",l=""]=t.split(`
`);n.textAlign="center",n.textBaseline="middle",n.fillStyle=a,Zm(n,o,600,78,i,r*.33),n.globalAlpha=.78,Zm(n,l,500,58,i,r*.72),n.globalAlpha=1;const c=this.label.material.map;c&&(c.needsUpdate=!0)}}function Zm(s,e,t,n,i,r){const a="ui-monospace, 'DejaVu Sans Mono', monospace",o=i*.92;let l=n;s.font=`${t} ${l}px ${a}`;const c=s.measureText(e).width;c>o&&(l=Math.max(Math.floor(l*o/c),12),s.font=`${t} ${l}px ${a}`),s.fillText(e,i/2,r)}function rR(s){return s>=1e3?`${(s/1e3).toFixed(1)} KM`:`${Math.round(s/50)*50} M`}const aR=240,oR=200,gn=62,zi=102,Vi=22,fi=32,ds=40,Ia=new S(0,46,80),lR={name:"MERIDIAN-7",sector:"TRIDENT-RAND",bay:"C-3"},Zg=new Sn(1,1,1),cR=new sr(1,1,1,16),hR=new sr(1,1,1,6),Dr=new Dn(1,12,8);function Nr(s,e,t){return new Qe({color:s,roughness:e,metalness:t})}function qi(s,e=1){return new Ot({color:s,toneMapped:!1,transparent:e<1,opacity:e})}const xe={plate:Nr(7169884,.85,.35),plateDark:Nr(3946804,.9,.3),plateLight:Nr(9274999,.78,.4),rust:Nr(7817518,.95,.15),steel:Nr(10131084,.45,.9),solar:Nr(1450300,.3,.7),glowAmber:qi(16754253),glowAmberSoft:qi(14254635,.55),glowGreen:qi(3538822),glowRed:qi(16723746),glowWhite:qi(16774109),window:qi(16763514,.9)};function Wi(s,e,t,n,i,r){const a=new Me(e,t);return a.scale.set(n[0],n[1],n[2]),a.position.set(i[0],i[1],i[2]),r&&a.rotation.set(r[0],r[1],r[2]),s.add(a),a}function Xe(s,e,t,n,i){return Wi(s,Zg,e,t,n,i)}function Da(s,e,t,n,i,r){return Wi(s,cR,e,[t,n,t],i,r)}function Ur(s,e,t,n,i){const r=new Me(hR,e),a=t.distanceTo(n);return r.scale.set(i,a,i),r.position.copy(t).add(n).multiplyScalar(.5),r.quaternion.setFromUnitVectors(uR,ps.copy(n).sub(t).divideScalar(a||1)),s.add(r),r}const uR=new S(0,1,0),ps=new S;class dR extends Fe{info;dockPoint;marker;radius=oR;ring=new Fe;beacons=[];guides=[];bayLight;time=0;constructor(e={},t=8231){super(),this.name="Station",this.info={...lR,...e};const n=xc(t);this.buildCore(n),this.buildRing(n),this.buildArms(n),this.buildSolar(),this.buildMast(),this.bayLight=this.buildBay(),this.add(this.ring),this.dockPoint=new Fe,this.dockPoint.name="DockPoint",this.dockPoint.position.copy(Ia),this.add(this.dockPoint),this.marker=new sR,this.marker.position.set(0,gn*.35,0),this.add(this.marker)}placeAt(e,t=0){this.position.copy(e),ps.copy(e).negate(),ps.y=0,ps.lengthSq()<1e-6&&ps.set(0,0,1),ps.normalize();const n=Math.atan2(ps.x,ps.z)+t*Math.PI/180;return this.rotation.set(.07,n,-.05),this.updateMatrixWorld(!0),this}setLayer(e){this.traverse(t=>t.layers.set(e)),this.bayLight.layers.enableAll()}update(e){this.time+=e,this.ring.rotation.y=this.time/aR%1*Math.PI*2;for(const i of this.beacons){const r=(this.time+i.phase)%i.period/i.period;i.object.visible=r<i.duty}const n=this.time*3.4%(8+2.5);for(const i of this.guides)i.object.visible=Math.abs(n-i.index)<1.1}shift(e){this.position.sub(e)}getDockPosition(e){return this.dockPoint.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.dockPoint.matrixWorld)}getDockQuaternion(e){return this.dockPoint.getWorldQuaternion(e)}getDockAxis(e){return e.set(0,0,1).applyQuaternion(this.dockPoint.getWorldQuaternion(Qm)).normalize()}getDockUp(e){return e.set(0,1,0).applyQuaternion(this.dockPoint.getWorldQuaternion(Qm)).normalize()}buildCore(e){const t=new Fe;t.name="Core",this.add(t),Da(t,xe.plate,24,92,[0,-74,0]),Da(t,xe.plateDark,28,68,[0,0,0]),Da(t,xe.plate,22,92,[0,74,0]);for(const[n,i]of[[-120,25],[-28,26],[28,29],[120,23]]){const r=new Me(new eo(i,2.6,6,24),xe.steel);r.position.set(0,n,0),r.rotation.x=Math.PI/2,t.add(r)}for(let n=0;n<8;n++){const i=n/8*Math.PI*2;Xe(t,xe.steel,[2.5,66,5],[Math.sin(i)*29,0,Math.cos(i)*29],[0,i,0])}for(let n=0;n<16;n++){const i=e()*Math.PI*2,r=(e()*2-1)*110,a=Math.abs(r)<34?28.4:24.4,o=e()<.35?xe.rust:e()<.5?xe.plateLight:xe.plateDark;Xe(t,o,[6+e()*12,5+e()*16,1],[Math.sin(i)*a,r,Math.cos(i)*a],[0,i,0])}for(let n=0;n<3;n++){const i=-96+n*18;for(let r=0;r<18;r++){const a=r/18*Math.PI*2+n*.08;e()<.25||Xe(t,xe.window,[1.4,2.4,.6],[Math.sin(a)*24.3,i,Math.cos(a)*24.3],[0,a,0])}}for(let n=0;n<7;n++){const i=n/7*Math.PI*2+.4,r=-40+e()*40,a=e()<.4?xe.plateLight:e()<.5?xe.rust:xe.plate,o=16+e()*14;Xe(t,a,[11,11,o],[Math.sin(i)*36,r,Math.cos(i)*36],[0,i,0]),Xe(t,xe.steel,[1.6,13,1.6],[Math.sin(i)*31,r,Math.cos(i)*31],[0,i,0])}}buildRing(e){this.ring.name="HabitatRing",this.ring.position.y=-34;const t=new Me(new eo(150,11,8,64),xe.plate);t.rotation.x=Math.PI/2,this.ring.add(t);for(let n=0;n<4;n++){const i=n/4*Math.PI*2,r=new S(Math.sin(i),0,Math.cos(i));Xe(this.ring,xe.plateDark,[7,7,120],[r.x*90,0,r.z*90],[0,i,0]);for(const a of[-1,1])Ur(this.ring,xe.steel,new S(r.x*30,a*9,r.z*30),new S(r.x*142,0,r.z*142),1.3)}for(let n=0;n<10;n++){const i=n/10*Math.PI*2+.15,r=new S(Math.sin(i),0,Math.cos(i)),a=150;Xe(this.ring,n%3===0?xe.plateLight:xe.plate,[26,15,15],[r.x*a,9,r.z*a],[0,i,0]);for(let o=-1;o<=1;o++)e()<.2||Xe(this.ring,xe.window,[5,2,.6],[r.x*(a+7.8)+Math.cos(i)*o*7,9,r.z*(a+7.8)-Math.sin(i)*o*7],[0,i,0])}}buildArms(e){const t=new Fe;t.name="DockingArms",t.position.y=24,this.add(t);for(const n of[-1,1]){const i=n*168;Xe(t,xe.plateDark,[148,8,10],[n*96,0,0]);for(let o=0;o<5;o++){const l=n*(30+o*28),c=n*(30+(o+1)*28);Ur(t,xe.steel,new S(l,-4,0),new S(c,-16,0),1.1),Ur(t,xe.steel,new S(c,-4,0),new S(l,-16,0),1.1)}Xe(t,xe.steel,[8,26,8],[n*100,-14,0]);for(const o of[-15,15])Xe(t,xe.plate,[26,6,7],[i,0,o]),Xe(t,xe.steel,[6,14,5],[i,8,o]);for(let o=0;o<3;o++){const l=e()<.4?xe.rust:e()<.5?xe.plateLight:xe.plateDark;Xe(t,l,[12,12,24],[n*(60+o*30),13,e()*10-5])}const r=n<0?xe.glowRed:xe.glowGreen,a=new Fe;a.position.set(i+n*8,0,0),t.add(a),Wi(a,Dr,r,[3,3,3],[0,0,0]),Wi(a,Dr,n<0?qi(16723746,.18):qi(3538822,.18),[9,9,9],[0,0,0]),this.beacons.push({object:a,period:n<0?2.4:1.9,phase:n<0?0:.6,duty:.3})}}buildSolar(){const e=new Fe;e.name="SolarWings",e.position.y=-118,this.add(e);for(const t of[-1,1]){Xe(e,xe.steel,[110,3,3],[t*78,0,0]);for(const n of[-30,30]){const i=new Fe;i.position.set(t*104,0,n),i.rotation.z=t*.22,e.add(i),Xe(i,xe.solar,[88,.8,44],[0,0,0]),Xe(i,xe.steel,[90,1.6,2],[0,0,22]),Xe(i,xe.steel,[90,1.6,2],[0,0,-22]);for(const r of[-22,0,22])Xe(i,xe.plateDark,[1.5,1.2,44],[r,0,0]);Ur(e,xe.steel,new S(t*62,0,0),new S(t*96,0,n*.9),1.2)}}}buildMast(){const e=new Fe;e.name="Mast",e.position.y=120,this.add(e),Da(e,xe.steel,2.5,46,[0,23,0]);for(let n=0;n<4;n++){const i=n/4*Math.PI*2;Ur(e,xe.steel,new S(Math.sin(i)*12,0,Math.cos(i)*12),new S(0,34,0),.7),Xe(e,xe.steel,[.8,14,.8],[Math.sin(i)*6,40,Math.cos(i)*6],[.3,i,0])}const t=new Me(new Dn(15,16,10,0,Math.PI*2,0,Math.PI*.32),xe.plateLight);t.position.set(26,6,0),t.rotation.set(.9,0,-.6),e.add(t),Da(e,xe.steel,1.2,20,[17,2,0],[0,0,-.7]);for(const n of[0,.16]){const i=new Fe;i.position.set(0,48,0),e.add(i),Wi(i,Dr,xe.glowWhite,[2.4,2.4,2.4],[0,0,0]),Wi(i,Dr,qi(16774109,.16),[8,8,8],[0,0,0]),this.beacons.push({object:i,period:2.8,phase:n,duty:.03})}}buildBay(){const e=new Fe;e.name="DockingBay",this.add(e);const t=(zi+Vi)/2,n=zi-Vi,i=ds+44;Xe(e,xe.plate,[72,5,n],[0,ds-2.5,t]),Xe(e,xe.plate,[72,5,n],[0,i+2.5,t]),Xe(e,xe.plateDark,[5,49,n],[-fi-2.5,gn,t]),Xe(e,xe.plateDark,[5,49,n],[fi+2.5,gn,t]),Xe(e,xe.plate,[72,49,5],[0,gn,Vi-2.5]);for(let o=0;o<7;o++){const l=-24+o*8;Xe(e,xe.glowAmberSoft,[2.6,22,.8],[l,gn+2,Vi+.7]),Xe(e,xe.plateDark,[4.6,24,1.4],[l+4,gn+2,Vi+1.6])}Xe(e,xe.plateLight,[34,1.2,1],[0,gn+17,Vi+1.4]),Xe(e,xe.plateLight,[1.2,9,1],[0,gn+21,Vi+1.4]);for(const o of[-1,1]){Xe(e,xe.plateLight,[1.2,7,1],[o*16,gn+20,Vi+1.4]),Xe(e,xe.glowAmberSoft,[.8,2.2,n-12],[o*(fi-.6),gn+14,t]),Xe(e,xe.glowAmberSoft,[.8,2.2,n-12],[o*(fi-.6),gn-8,t]);for(let l=0;l<4;l++){const c=Vi+12+l*18;Xe(e,xe.steel,[3,3,14],[o*(fi-3),gn+19,c]),Xe(e,xe.plateDark,[5,9,5],[o*(fi-4),ds+6,c])}}Xe(e,xe.plateLight,[76,4,26],[0,i+8,zi+10],[-.34,0,0]),Xe(e,xe.plateLight,[76,4,26],[0,ds-8,zi+10],[.34,0,0]);for(const o of[-1,1])Xe(e,xe.plateLight,[4,52,26],[o*(fi+9),gn,zi+10],[0,-o*.34,0]);for(let o=0;o<5;o++){const l=-1+o/4*2;for(const h of[-1,1]){const u=new Fe;u.position.set(h*(fi+4),gn+l*22,zi+2),e.add(u),Wi(u,Dr,xe.glowGreen,[1.5,1.5,1.5],[0,0,0]),this.beacons.push({object:u,period:1.6,phase:o*.05,duty:.55})}const c=new Fe;c.position.set(l*26,i+4,zi+2),e.add(c),Wi(c,Dr,xe.glowRed,[1.5,1.5,1.5],[0,0,0]),this.beacons.push({object:c,period:1.6,phase:.8+o*.05,duty:.55})}const r=8;for(let o=0;o<r;o++){const l=zi-6-o/(r-1)*(n-16);for(const c of[-1,1]){const h=new Fe;h.position.set(c*(fi-5),ds+.6,l),e.add(h),Wi(h,Zg,xe.glowGreen,[4,.5,2],[0,0,0]),this.guides.push({object:h,index:o})}}Xe(e,xe.plateDark,[34,3,46],[0,ds+1.5,Ia.z-4]);for(const o of[-1,1]){for(const l of[-16,16])Xe(e,xe.steel,[4,7,6],[o*15,ds+6,Ia.z-4+l]);Ur(e,xe.steel,new S(o*(fi-1),gn+10,Ia.z),new S(o*18,ds+8,Ia.z),1.4)}for(let o=0;o<3;o++)Xe(e,xe.plateLight,[3,12,1],[-8+o*8,i+12,zi-1]);const a=new rr(16756841,1300,340,2);return a.position.set(0,gn+12,t),e.add(a),a}}const Qm=new tt,fR={cleared:"FREIGABE ERTEILT",docking:"ANDOCKMANOEVER",undocking:"ABLEGEMANOEVER"};class pR{root;line;progress;progressLabel;progressValue;progressFill;lastText="";lastValue="";constructor(e=document.body){this.root=document.createElement("div"),this.root.className="stncomms",this.line=document.createElement("div"),this.line.className="stncomms__line",this.line.hidden=!0,this.progress=document.createElement("div"),this.progress.className="stncomms__progress",this.progress.hidden=!0;const t=document.createElement("div");t.className="stncomms__progress-row",this.progressLabel=document.createElement("span"),this.progressValue=document.createElement("span"),t.append(this.progressLabel,this.progressValue);const n=document.createElement("div");n.className="stncomms__progress-bar",this.progressFill=document.createElement("i"),n.append(this.progressFill),this.progress.append(t,n),this.root.append(this.line,this.progress),e.append(this.root)}showMessage(e,t){this.line.textContent=e,this.line.classList.toggle("is-bad",!t),this.line.hidden=!1,this.lastText=e}update(e){!e.showMessage&&!this.line.hidden?(this.line.hidden=!0,this.lastText=""):e.showMessage&&this.line.hidden&&this.lastText&&(this.line.hidden=!1);const t=fR[e.state];if(this.progress.hidden=t===void 0,t===void 0)return;this.progressLabel.textContent=t;const n=e.state==="cleared"?`${Math.round(e.distance)} M · ${Math.round(e.speed)} M/S`:`${Math.round(e.progress*100)} %`;n!==this.lastValue&&(this.progressValue.textContent=n,this.lastValue=n);const i=e.state==="cleared"?0:e.progress;this.progressFill.style.width=`${(i*100).toFixed(1)}%`}dispose(){this.root.remove()}}const Jm=[1,5,25];function Be(s,e,t){const n=document.createElement(s);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n}function Zn(s,e){s.textContent!==e&&(s.textContent=e)}function Wh(s,e){s.disabled!==e&&(s.disabled=e)}function yl(s){return s.toLocaleString("de-DE")}class mR{trade;deps;root;creditsValue;services;tbody;holdValue;holdFill;manifest;status;amountButtons=[];goodRows=new Map;serviceRows=new Map;amount=Jm[0];open_=!1;constructor(e,t=document.body){this.deps=e,this.trade=e.trade,this.root=Be("div","stn"),this.root.hidden=!0;const n=Be("div","stn__frame");this.root.append(n);const i=Be("header","stn__head");i.append(Be("div","stn__title",e.info.name),Be("div","stn__sub",`SEKTOR ${e.info.sector} · ANDOCKBUCHT ${e.info.bay}`));const r=Be("div","stn__credits");r.append(Be("span",void 0,"CREDITS")),this.creditsValue=Be("b",void 0,"0"),r.append(this.creditsValue),i.append(r),n.append(i);const a=Be("div","stn__body");n.append(a);const o=Be("section","stn__section");o.append(Be("div","stn__legend","WERFT UND VERSORGUNG")),this.services=Be("div","stn__services"),o.append(this.services),a.append(o);const l=Be("section","stn__section");l.append(Be("div","stn__legend","WARENBOERSE")),l.append(this.buildAmountSelector());const c=Be("table","stn__table"),h=Be("thead"),u=Be("tr");for(const E of["WARE","KAUF","VERKAUF","VORRAT","AN BORD",""])u.append(Be("th",void 0,E));h.append(u),this.tbody=Be("tbody"),c.append(h,this.tbody),l.append(c),a.append(l);const d=Be("footer","stn__foot"),f=Be("div","stn__hold");this.holdValue=Be("b",void 0,"0 / 0 T");const p=Be("div");p.append(document.createTextNode("LADERAUM  "),this.holdValue);const _=Be("div","stn__bar");this.holdFill=Be("i"),_.append(this.holdFill),this.manifest=Be("div",void 0,""),f.append(p,_,this.manifest),this.status=Be("div","stn__status","");const m=Be("div","stn__actions"),g=Be("button","stn__primary","ABLEGEN [G]");g.type="button",g.addEventListener("click",()=>{this.deps.onUndock()?this.close():this.setStatus({ok:!1,message:"ABLEGEN NICHT MOEGLICH"})});const b=Be("button",void 0,"SCHLIESSEN [ESC]");b.type="button",b.addEventListener("click",()=>this.close()),m.append(g,b),d.append(f,this.status,m),n.append(d),t.append(this.root),window.addEventListener("keydown",this.onKeyDown)}get isOpen(){return this.open_}open(){this.open_||(this.open_=!0,this.root.hidden=!1,this.setStatus({ok:!0,message:"KLAMMERN VERRIEGELT"}),this.refresh())}close(){this.open_&&(this.open_=!1,this.root.hidden=!0,this.deps.onClose())}refresh(){Zn(this.creditsValue,yl(this.trade.getCredits())),this.refreshServices(),this.refreshGoods(),this.refreshHold()}dispose(){window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}buildAmountSelector(){const e=Be("div","stn__amounts");e.append(Be("span",void 0,"MENGE"));for(const t of Jm){const n=Be("button","stn__mini",`${t} T`);n.type="button",n.addEventListener("click",()=>{this.amount=t;for(const i of this.amountButtons)i.classList.toggle("is-active",i===n)}),n.classList.toggle("is-active",t===this.amount),this.amountButtons.push(n),e.append(n)}return e}buildServiceRow(e){const t=Be("div","stn__service"),n=Be("span","stn__service-name",""),i=Be("span","stn__service-price",""),r=Be("div","stn__bar"),a=Be("i");r.append(a);const o=Be("button",void 0,"");return o.type="button",o.addEventListener("click",()=>this.setStatus(this.trade.useService(e))),t.append(n,i,r,o),this.services.append(t),{root:t,name:n,price:i,bar:r,fill:a,button:o}}buildGoodRow(e,t){const n=Be("tr");n.append(Be("td","stn__good",t));const i=Be("td"),r=Be("td"),a=Be("td"),o=Be("td","stn__onboard"),l=Be("td"),c=Be("button","stn__mini","KAUFEN");c.type="button",c.addEventListener("click",()=>this.setStatus(this.trade.buy(e,this.amount)));const h=Be("button","stn__mini","VERKAUFEN");return h.type="button",h.addEventListener("click",()=>{const u=this.heldTons(e);this.setStatus(this.trade.sell(e,Math.min(this.amount,Math.floor(u))))}),l.append(c,h),n.append(i,r,a,o,l),this.tbody.append(n),{buyPrice:i,sellPrice:r,stock:a,onboard:o,buy:c,sell:h}}refreshServices(){const e=this.trade.getCredits();for(const t of this.trade.getServices()){let n=this.serviceRows.get(t.id);n||(n=this.buildServiceRow(t.id),this.serviceRows.set(t.id,n));const i=Math.round(t.level*100);Zn(n.name,`${t.name}  ${i} %`),Zn(n.price,t.level>=1?"VOLL":`${yl(t.price)} CR`),n.fill.style.width=`${i}%`,n.bar.classList.toggle("is-low",t.level<.35),Zn(n.button,t.action),Wh(n.button,t.level>=1||t.price>e)}}heldTons(e){return this.trade.getManifest().find(t=>t.id===e)?.tons??0}refreshGoods(){const e=this.trade.getCredits(),t=this.trade.getCapacity(),n=t.total-t.used,i=new Map(this.trade.getManifest().map(r=>[r.id,r.tons]));for(const r of this.trade.getGoods()){let a=this.goodRows.get(r.id);a||(a=this.buildGoodRow(r.id,r.name),this.goodRows.set(r.id,a));const o=i.get(r.id)??0;Zn(a.buyPrice,yl(r.buyPrice)),Zn(a.sellPrice,yl(r.sellPrice)),Zn(a.stock,`${r.stock} T`),Zn(a.onboard,`${Ft(o)} T`),a.onboard.classList.toggle("is-zero",o===0),Wh(a.buy,r.stock<this.amount||n<this.amount||r.buyPrice*this.amount>e),Wh(a.sell,o<1)}}refreshHold(){const{used:e,total:t}=this.trade.getCapacity();Zn(this.holdValue,`${Ft(e)} / ${t} T`),this.holdFill.style.width=`${t>0?e/t*100:0}%`;const n=this.trade.getManifest(),i=n.length?n.map(r=>`${Ft(r.tons)} T ${r.name}`).join("  ·  "):"LEER";Zn(this.manifest,i)}setStatus(e){Zn(this.status,e.message),this.status.classList.toggle("is-bad",!e.ok),this.status.classList.toggle("is-good",e.ok)}onKeyDown=e=>{!this.open_||e.code!=="Escape"||(e.preventDefault(),this.close())}}const Sc={rangeIn:3e3,rangeOut:3400,clearanceRange:1500,clearanceExpire:2400,clearanceSpeed:100,maxNoseAngle:35*Math.PI/180,maxCorridorAngle:60*Math.PI/180,clearanceHold:1.6,approachHold:420,minDockDuration:8,maxDockDuration:12,dockDurationPerMeter:1/250,undockDuration:8,undockDistance:620},gR="FREIGABE ERTEILT — BUCHT OFFEN";function Xh(s){return Math.round(s*180/Math.PI)}function _R(s,e=Sc){return s.distance>e.clearanceRange?{granted:!1,reason:"range",message:`AUSSER REICHWEITE (${Math.round(s.distance)} M, MAX ${e.clearanceRange} M)`}:s.corridorAngle>e.maxCorridorAngle?{granted:!1,reason:"corridor",message:`ANFLUGKORRIDOR VERLASSEN (${Xh(s.corridorAngle)} GRAD ABSEITS)`}:s.noseAngle>e.maxNoseAngle?{granted:!1,reason:"angle",message:`ANFLUGWINKEL (${Xh(s.noseAngle)} GRAD, MAX ${Xh(e.maxNoseAngle)} GRAD)`}:s.speed>e.clearanceSpeed?{granted:!1,reason:"speed",message:`ZU SCHNELL (${Math.round(s.speed)} M/S, MAX ${e.clearanceSpeed} M/S)`}:{granted:!0,message:gR}}class vR{constructor(e=Sc){this.params=e}currentState="far";hold=0;progressValue=0;durationValue=0;lastMessage="";get state(){return this.currentState}get progress(){return this.progressValue}get duration(){return this.durationValue}get message(){return this.lastMessage}get controlsShip(){const e=this.currentState;return e==="docking"||e==="docked"||e==="undocking"}update(e,t){switch(this.currentState){case"far":t.distance<this.params.rangeIn&&(this.currentState="in-range");break;case"in-range":t.distance>this.params.rangeOut&&(this.currentState="far");break;case"cleared":if(t.distance>this.params.clearanceExpire){this.currentState="in-range",this.lastMessage="FREIGABE VERFALLEN";break}this.hold-=e,this.hold<=0&&(this.currentState="docking",this.progressValue=0,this.durationValue=this.dockDurationFor(t.distance),this.lastMessage="AUTOPILOT UEBERNIMMT");break;case"docking":this.progressValue=Math.min(this.progressValue+e/this.durationValue,1),this.progressValue>=1&&(this.currentState="docked",this.lastMessage="ANGEDOCKT");break;case"docked":break;case"undocking":this.progressValue=Math.min(this.progressValue+e/this.durationValue,1),this.progressValue>=1&&(this.currentState="far",this.progressValue=0,this.durationValue=0,this.lastMessage="ABGELEGT — STEUERUNG FREI");break}return this.currentState}requestClearance(e){if(this.currentState==="cleared")return this.currentState="in-range",this.lastMessage="ANFLUG ABGEBROCHEN",{granted:!1,reason:"state",message:this.lastMessage};if(this.currentState!=="far"&&this.currentState!=="in-range")return this.lastMessage="KEINE FREIGABE MOEGLICH",{granted:!1,reason:"state",message:this.lastMessage};const t=_R(e,this.params);return this.lastMessage=t.message,t.granted&&(this.currentState="cleared",this.hold=this.params.clearanceHold),t}requestUndock(){return this.currentState!=="docked"?!1:(this.currentState="undocking",this.progressValue=0,this.durationValue=this.params.undockDuration,this.lastMessage="ABLEGEMANOEVER",!0)}reset(){this.currentState="far",this.progressValue=0,this.durationValue=0,this.hold=0}dockDurationFor(e){const t=this.params,n=t.minDockDuration+e*t.dockDurationPerMeter;return Math.min(Math.max(n,t.minDockDuration),t.maxDockDuration)}}function hc(s){return s<0?0:s>1?1:s}function xR(s,e){const t=hc(s),n=Math.min(Math.max(e,0),1.2);return hc(n*t+(3-2*n)*t*t+(n-2)*t*t*t)}function MR(s){const e=hc(s);return e*e*(3-2*e)}const jm=new ye,bl=new S,Na=new S,SR=new S;function Qg(s,e,t){return bl.copy(s).normalize().negate(),Na.copy(e).normalize(),Math.abs(Na.dot(bl))>.99&&(Math.abs(bl.y)<.9?Na.set(0,1,0):Na.set(1,0,0)),jm.lookAt(bl,SR,Na),t.setFromRotationMatrix(jm)}function yR(s,e,t,n,i,r=Sc){const a=s.position.distanceTo(e.position),o=Math.min(r.approachHold,Math.max(a*.65,60)),l=e.position.clone().addScaledVector(t,o),c=.5*(a+s.position.distanceTo(l)+l.distanceTo(e.position)),h=c>.001?i*n/c:0;return{start:{position:s.position.clone(),quaternion:s.quaternion.clone()},control:l,end:{position:e.position.clone(),quaternion:e.quaternion.clone()},duration:n,entryRate:h,alignStart:0,alignEnd:.7}}function bR(s,e,t,n=Sc){const i=s.position.clone().addScaledVector(e,n.undockDistance),r=Qg(e,t,new tt);return{start:{position:s.position.clone(),quaternion:s.quaternion.clone()},control:s.position.clone().addScaledVector(e,n.undockDistance*.5),end:{position:i,quaternion:r},duration:n.undockDuration,entryRate:0,alignStart:.45,alignEnd:1}}function id(s,e,t,n){const i=xR(e,s.entryRate),r=1-i;t.copy(s.start.position).multiplyScalar(r*r).addScaledVector(s.control,2*r*i).addScaledVector(s.end.position,i*i);const a=Math.max(s.alignEnd-s.alignStart,1e-4),o=MR((hc(e)-s.alignStart)/a);n.copy(s.start.quaternion).slerp(s.end.quaternion,o)}function Jg(s,e){s.start.position.sub(e),s.control.sub(e),s.end.position.sub(e)}const ER="KeyG",Fr=4.5,Os=new S,El=new tt,ks=new S,TR=new S,e0=new S,t0=new S,qh=new S,$h=new S,Kh=new tt;function n0(s,e){return Math.acos(Math.min(Math.max(s.dot(e),-1),1))}class wR{machine=new vR;panel;ship;flight;station;input;comms=new pR;sample={distance:1/0,speed:0,noseAngle:0,corridorAngle:0};path=null;previousState="far";messageTimer=0;constructor(e){this.ship=e.ship,this.flight=e.flight,this.station=e.station,this.input=e.input,this.panel=new mR({trade:e.trade,info:e.station.info,onUndock:()=>this.machine.requestUndock(),onClose:()=>this.input.requestPointerLock()})}update(e){this.station.update(e),this.measure(),this.input.wasPressed(ER)&&this.handleKey();const t=this.machine.update(e,this.sample);t!==this.previousState&&(this.onStateChange(this.previousState,t),this.previousState=t),this.machine.controlsShip&&this.driveShip(),this.messageTimer>0&&(this.messageTimer-=e),this.updateDisplays()}shift(e){this.station.shift(e),this.path&&Jg(this.path,e)}get isAutopilot(){return this.machine.controlsShip}dispose(){this.panel.dispose(),this.comms.dispose()}measure(){this.station.getDockPosition(Os),this.station.getDockAxis(ks),this.sample.distance=this.ship.position.distanceTo(Os),this.sample.speed=this.flight.getSpeed(),t0.set(0,0,-1).applyQuaternion(this.ship.quaternion),this.sample.noseAngle=n0(t0,TR.copy(ks).negate()),qh.copy(this.ship.position).sub(Os),qh.lengthSq()<1e-4?this.sample.corridorAngle=0:this.sample.corridorAngle=n0(qh.normalize(),ks)}handleKey(){if(this.machine.state==="docked"){this.machine.requestUndock();return}const e=this.machine.requestClearance(this.sample);this.comms.showMessage(e.granted?e.message:`ANDOCKKONTROLLE: ${e.message}`,e.granted),this.messageTimer=Fr}onStateChange(e,t){t==="docking"?this.beginDocking():t==="docked"?(this.panel.open(),this.input.exitPointerLock(),this.comms.showMessage(`ANGEDOCKT — BUCHT ${this.station.info.bay}`,!0),this.messageTimer=Fr):t==="undocking"?(this.beginUndocking(),this.panel.close()):e==="undocking"?this.releaseShip():t==="in-range"&&e==="cleared"&&(this.comms.showMessage(`ANDOCKKONTROLLE: ${this.machine.message}`,!1),this.messageTimer=Fr)}beginDocking(){this.station.getDockPosition(Os),this.station.getDockQuaternion(El),this.station.getDockAxis(ks),this.path=yR({position:this.ship.position,quaternion:this.ship.quaternion},{position:Os,quaternion:El},ks,this.machine.duration,this.flight.getSpeed(),this.machine.params),this.comms.showMessage("AUTOPILOT — ANFLUG LAEUFT",!0),this.messageTimer=Fr}beginUndocking(){this.station.getDockPosition(Os),this.station.getDockQuaternion(El),this.station.getDockAxis(ks),this.station.getDockUp(e0),this.path=bR({position:Os,quaternion:El},ks,e0,this.machine.params),this.comms.showMessage("ABLEGEN — KLAMMERN GELOEST",!0),this.messageTimer=Fr}releaseShip(){this.path=null,this.flight.velocity.set(0,0,0),this.flight.angularVelocity.set(0,0,0),this.flight.setSetSpeed(0),this.flight.cancelFullStop(),this.flight.clearInputs(),this.comms.showMessage("STEUERUNG FREI",!0),this.messageTimer=Fr}driveShip(){if(this.machine.state==="docked")this.station.getDockPosition($h),this.station.getDockQuaternion(Kh);else if(this.path)id(this.path,this.machine.progress,$h,Kh);else return;this.ship.position.copy($h),this.ship.quaternion.copy(Kh),this.flight.velocity.set(0,0,0),this.flight.angularVelocity.set(0,0,0),this.flight.setSetSpeed(0),this.flight.cancelFullStop(),this.flight.clearInputs()}updateDisplays(){const e=this.machine.state,t=e==="far"?"far":e==="in-range"?"in-range":e==="cleared"?"cleared":"hidden",n=e==="far"?`HANDELSPOSTEN ${this.station.info.sector}`:e==="in-range"?"G — FREIGABE ANFORDERN":"FREIGABE ERTEILT · ANFLUG FREI";this.station.marker.update(t,this.sample.distance,this.station.info.name,n),this.comms.update({state:e,progress:this.machine.progress,distance:this.sample.distance,speed:this.sample.speed,showMessage:this.messageTimer>0}),this.panel.isOpen&&this.panel.refresh()}}const AR=1.35,RR=.82,CR={ore:180,water:240,food:90,parts:46,electronics:24,contraband:6,copper:12,silicon:8,platinum:0,crystal:0},i0=34,s0=620,r0=940;function a0(s){return Math.round(_n[s].basePrice*AR)}function o0(s){return Math.round(_n[s].basePrice*RR)}function l0(s){return s.toUpperCase()}function PR(s){const{hold:e,getHull:t,setHull:n}=s,i={...CR};let r=.62,a=.45;function o(c,h){return Math.round((1-c)*h)}function l(c){return c<=0?{ok:!1,message:"NICHTS ZU TUN"}:c>e.getCredits()?{ok:!1,message:`ZU WENIG CREDITS — ${c} CR NOETIG`}:(e.addCredits(-c),null)}return{getCredits:()=>e.getCredits(),getCapacity:()=>({used:e.getUsedCapacity(),total:e.getCapacity()}),getManifest:()=>e.getManifest().map(c=>({id:c.good,name:_n[c.good].name.toUpperCase(),tons:c.tons,averagePrice:Math.round(c.avgPrice)})),getGoods:()=>Ww.map(c=>({id:c,name:_n[c].name.toUpperCase(),buyPrice:a0(c),sellPrice:o0(c),stock:i[c]})),buy(c,h){if(!lc(c))return{ok:!1,message:"WARE UNBEKANNT"};const u=Math.floor(h);if(u<=0)return{ok:!1,message:"MENGE UNGUELTIG"};if(i[c]<u)return{ok:!1,message:`NUR ${i[c]} T VORRAETIG`};const d=a0(c);try{e.buy(c,u,d)}catch(f){if(f instanceof $s)return{ok:!1,message:l0(f.message)};throw f}return i[c]-=u,{ok:!0,message:`${u} T ${_n[c].name.toUpperCase()} GELADEN — ${d*u} CR`}},sell(c,h){if(!lc(c))return{ok:!1,message:"WARE UNBEKANNT"};const u=Math.floor(h);if(u<=0)return{ok:!1,message:"MENGE UNGUELTIG"};const d=o0(c);let f;try{f=e.sell(c,u,d)}catch(p){if(p instanceof $s)return{ok:!1,message:l0(p.message)};throw p}return i[c]+=u,{ok:!0,message:`${u} T ${_n[c].name.toUpperCase()} VERKAUFT — ${f} CR`}},getServices:()=>[{id:"hull",name:"HUELLE",level:t(),price:Math.round((1-t())*100*i0),action:"REPARIEREN"},{id:"fuel",name:"TREIBSTOFF",level:r,price:o(r,s0),action:"TANKEN"},{id:"ammo",name:"MUNITION",level:a,price:o(a,r0),action:"FASSEN"}],useService(c){if(c==="hull"){const h=1-t(),u=l(Math.round(h*100*i0));return u||(n(1),{ok:!0,message:"HUELLE INSTANDGESETZT"})}if(c==="fuel"){const h=l(o(r,s0));return h||(r=1,{ok:!0,message:"TANKS VOLL"})}if(c==="ammo"){const h=l(o(a,r0));return h||(a=1,{ok:!0,message:"MAGAZINE VOLL"})}return{ok:!1,message:"DIENST UNBEKANNT"}}}}const xi=[{id:"engine",code:"TRW",name:"TRIEBWERK",weight:1.3,exposure:[0,0,1],symmetric:!1,impairedAt:.65,failedAt:.12},{id:"thrusters",code:"DUE",name:"MANOEVRIERDUESEN",weight:1.1,exposure:[1,0,0],symmetric:!0,impairedAt:.7,failedAt:.12},{id:"weapons",code:"WAF",name:"BORDKANONEN",weight:.9,exposure:[0,0,-1],symmetric:!1,impairedAt:.7,failedAt:.15},{id:"generator",code:"GEN",name:"GENERATOR",weight:1,exposure:[0,0,0],symmetric:!1,impairedAt:.6,failedAt:.12},{id:"lifeSupport",code:"LEB",name:"LEBENSERHALTUNG",weight:.8,exposure:[0,1,0],symmetric:!1,impairedAt:.6,failedAt:.2},{id:"sensors",code:"SEN",name:"SENSORIK",weight:.7,exposure:[0,0,-1],symmetric:!1,impairedAt:.6,failedAt:.25},{id:"lighting",code:"LIC",name:"BELEUCHTUNG",weight:1,exposure:[0,0,0],symmetric:!1,impairedAt:.8,failedAt:.15}],Or=xi.map(s=>s.id),LR={damageScale:1.8,minDamage:.004,directionGain:2,shieldAbsorb:.35,oxygenSeconds:210,oxygenRecovery:.06,maxYawBias:.11};function pi(s){return s<0?0:s>1?1:s}class Ms{oxygen=1;health=new Map;params;random;driftSign=1;constructor(e={}){this.random=e.random??Math.random,this.params={...LR,...e.params};for(const t of xi)this.health.set(t.id,1);this.driftSign=this.random()<.5?-1:1}getParams(){return this.params}static definition(e){const t=xi.find(n=>n.id===e);if(!t)throw new Error(`Unbekanntes System: ${e}`);return t}getHealth(e){return this.health.get(e)??1}getStatus(e){const t=Ms.definition(e),n=this.getHealth(e);return n<=t.failedAt?"failed":n<t.impairedAt?"impaired":"ok"}isFailed(e){return this.getStatus(e)==="failed"}isImpaired(e){return this.getStatus(e)!=="ok"}get anyDamaged(){return Or.some(e=>this.getHealth(e)<1)}get anyImpaired(){return Or.some(e=>this.isImpaired(e))}get anyFailed(){return Or.some(e=>this.isFailed(e))}worst(){let e=Or[0];for(const t of Or)this.getHealth(t)<this.getHealth(e)&&(e=t);return e}damage(e,t){t<=0||(this.health.set(e,pi(this.getHealth(e)-t)),e==="thrusters"&&(this.driftSign=this.random()<.5?-1:1))}repair(e,t){t<=0||this.health.set(e,pi(this.getHealth(e)+t))}repairAll(){for(const e of Or)this.health.set(e,1);this.oxygen=1}applyImpact(e,t){const n=this.params;if(e<n.minDamage)return[];const i=1-n.shieldAbsorb*this.getHealth("generator"),r=pi(e*n.damageScale*i);if(r<n.minDamage)return[];const a=r>.25?3:r>.1?2:1,o=[.6,.28,.12].slice(0,a),l=o.reduce((u,d)=>u+d,0),c=xi.map(u=>({def:u,weight:u.weight*(1+n.directionGain*IR(u,t))})),h=[];for(let u=0;u<a&&c.length>0;u++){const d=DR(c,this.random()),f=c[d].def;c.splice(d,1);const p=r*o[u]/l;this.health.set(f.id,pi(this.getHealth(f.id)-p)),h.push({id:f.id,amount:p})}return h.some(u=>u.id==="thrusters")&&(this.driftSign=this.random()<.5?-1:1),h}update(e){const t=this.getHealth("lifeSupport"),n=Ms.definition("lifeSupport");if(t>=n.impairedAt){this.oxygen=pi(this.oxygen+this.params.oxygenRecovery*e);return}const i=pi((n.impairedAt-t)/Math.max(n.impairedAt,.001));this.oxygen=pi(this.oxygen-i*e/this.params.oxygenSeconds)}getOxygenSeconds(){const e=this.getHealth("lifeSupport"),t=Ms.definition("lifeSupport");if(e>=t.impairedAt)return 1/0;const n=pi((t.impairedAt-e)/Math.max(t.impairedAt,.001));return n<=0?1/0:this.oxygen*this.params.oxygenSeconds/n}getFlightDamage(){const e=this.getHealth("engine"),t=this.getHealth("thrusters"),n=this.isFailed("engine"),i=this.isFailed("thrusters"),r=n?.12:.35+.65*e,a=n?.15:.3+.7*e,o=i?.25:.4+.6*t,l=Ms.definition("thrusters"),c=t>=l.impairedAt?0:(l.impairedAt-t)/l.impairedAt*this.params.maxYawBias*this.driftSign;return{thrust:r,topSpeed:a,torque:o,yawBias:c,afterburner:!this.isFailed("generator")}}getWeaponDamage(){const e=this.getHealth("weapons"),t=this.getStatus("weapons");return{reload:1+(1-e)*1.8,activeGuns:t==="failed"?0:t==="impaired"?1:2}}get sensorsOnline(){return!this.isFailed("sensors")}getLightLevel(){const e=this.getHealth("lighting"),t=.55+.45*this.getHealth("generator");return this.isFailed("lighting")?0:pi((.35+.65*e)*t)}getFlicker(){return pi((1-this.getHealth("lighting"))*1.2)}get emergencyLighting(){return this.isFailed("lighting")||this.isFailed("generator")}getRepairSpeed(){return .45+.55*this.getHealth("generator")}}function IR(s,e){const[t,n,i]=s.exposure;if(t===0&&n===0&&i===0)return 0;const r=t*e.x+n*e.y+i*e.z;return s.symmetric?Math.abs(r):Math.max(r,0)}function DR(s,e){let t=0;for(const i of s)t+=i.weight;if(t<=0)return 0;let n=e*t;for(let i=0;i<s.length;i++)if(n-=s[i].weight,n<=0)return i;return s.length-1}const Ua=new S(.55,1.185,4.35),NR=-.44,c0=.44,h0=.16,Yh=512,Zh=192,Tl=4,UR=2,FR={ok:["#0c2412","#6fd587"],impaired:["#3a2a06","#ffc247"],failed:["#3d0d07","#ff6a52"]};class OR{group=new Yt;canvas;ctx;texture=null;caution=null;signature="";time=0;constructor(){this.group.name="DamageAnnunciator",this.canvas=typeof document>"u"?null:document.createElement("canvas"),this.canvas&&(this.canvas.width=Yh,this.canvas.height=Zh),this.ctx=this.canvas?.getContext("2d")??null}attach(e){if(this.detach(),!this.canvas)return;this.texture=new un(this.canvas),this.texture.colorSpace=_t,this.group.position.copy(Ua),this.group.rotation.set(NR,Math.PI,0,"YXZ");const t=new Me(new Ti(c0,h0),new Qe({color:328965,emissive:new te(16777215),emissiveMap:this.texture,emissiveIntensity:1,roughness:.4,metalness:0,side:Kt}));t.position.z=.026,this.group.add(t);const n=new Me(new Sn(c0+.03,h0+.03,.05),new Qe({color:2500909,metalness:.8,roughness:.5}));n.castShadow=!0,this.group.add(n);const i=new Me(new Sn(.06,.1,.05),new Qe({color:3816770,metalness:.85,roughness:.55}));i.position.set(Ua.x,1.085,Ua.z+.015),this.caution=new rr(16725016,0,2,1.25),this.caution.name="Damage_MasterCaution",this.caution.position.set(Ua.x,1.42,Ua.z-.25),this.caution.visible=!1,e.add(this.group,i,this.caution);for(const r of[this.group,i,this.caution])r.traverse(a=>a.layers.set(0))}detach(){this.group.removeFromParent(),this.group.clear(),this.caution?.removeFromParent(),this.caution=null,this.texture?.dispose(),this.texture=null,this.signature=""}update(e,t){this.time+=e;const n=Math.floor(this.time*UR*2)%2===0;if(this.caution){const i=t.anyFailed,r=i||t.anyImpaired;if(this.caution.visible=r,r){const a=.5+.5*Math.sin(this.time*(i?9:3.5));this.caution.intensity=(i?.45:.2)*a,this.caution.color.setHex(i?16725016:16753706)}}this.draw(t,n)}draw(e,t){const n=this.ctx;if(!n||!this.texture)return;const i=e.getOxygenSeconds(),r=Number.isFinite(i)?kR(i):"OK",a=xi.map(u=>e.getStatus(u.id)),o=a.some(u=>u==="failed"),l=`${a.join("")}|${r}|${o&&t}`;if(l===this.signature)return;this.signature=l;const c=Yh/Tl,h=Zh/2;n.fillStyle="#08090a",n.fillRect(0,0,Yh,Zh);for(let u=0;u<Tl*2;u++){const d=u%Tl*c,f=Math.floor(u/Tl)*h,p=u===xi.length;if(u>xi.length)continue;const _=p?r==="OK"?"ok":i<90?"failed":"impaired":a[u],m=p?"O2":xi[u].code,g=p?r:`${Math.round(e.getHealth(xi[u].id)*100)}%`,[b,E]=FR[_],M=_==="failed"&&!t;n.fillStyle=M?"#120303":b,n.fillRect(d+4,f+4,c-8,h-8),n.fillStyle=M?"#5a1c14":E,n.font='bold 42px "Courier New", monospace',n.textAlign="center",n.textBaseline="middle",n.fillText(m,d+c/2,f+h/2-16),n.font='bold 28px "Courier New", monospace',n.fillText(g,d+c/2,f+h/2+24)}this.texture.needsUpdate=!0}}function kR(s){const e=Math.max(0,Math.min(Math.round(s),5999));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}const BR=/^SM_Lamp\d+_Diffuser$/,zR="Light_",VR="Lamp_Red",HR="Lamp_Warm",GR="LightShaft",WR=1.4,XR=3.2,u0=.3,qR=2;class $R{constructor(e=Math.random){this.random=e}lamps=[];accents=[];emergency=null;warm=null;shafts=[];reflective=[];time=0;attach(e){this.lamps.length=0,this.accents.length=0,this.reflective.length=0,this.shafts.length=0,this.emergency=null,this.warm=null,e.updateMatrixWorld(!0);const t=[];e.traverse(r=>{r instanceof rr&&r.name.startsWith(zR)&&t.push(r)});const n=new Set,i=new Set;e.traverse(r=>{if(!(r instanceof Me))return;if(r.name===GR){const c=KR(r);c&&this.shafts.push({uniform:c,base:c.value,position:d0(r),lamp:null});return}const a=YR(r);if(a&&!i.has(a)&&(i.add(a),a.name===VR&&!this.emergency&&(this.emergency={material:a,base:a.emissiveIntensity}),a.name===HR&&!this.warm&&(this.warm={material:a,base:a.emissiveIntensity}),a.envMapIntensity>0&&this.reflective.push({material:a,base:a.envMapIntensity})),!BR.test(r.name)||!a)return;const o=a.clone();o.name=`${a.name}_${r.name}`,r.material=o;const l=ZR(r,t,n);l&&n.add(l),this.lamps.push({material:o,baseEmissive:o.emissiveIntensity,light:l,baseIntensity:l?l.intensity:0,seed:this.random()*Math.PI*2,outage:0,value:1,position:d0(r)})});for(const r of t)n.has(r)||this.accents.push({light:r,base:r.intensity});for(const r of this.shafts){let a=null,o=qR;for(const l of this.lamps){const c=r.position.distanceTo(l.position);c>=o||(a=l,o=c)}r.lamp=a}}update(e,t,n,i){this.time+=e;for(const a of this.lamps){let o=t;if(a.outage>0)a.outage-=e,o=0;else if(n>0){const l=.5+.5*Math.sin(this.time*11.3+a.seed)*Math.sin(this.time*3.7+a.seed);o=t*(1-n*.55*l);const c=Math.min(n*Math.min(e,.1)*2.5,.3);this.random()<c&&(a.outage=.04+this.random()*.22)}a.value=o,a.material.emissiveIntensity=a.baseEmissive*o,a.light&&(a.light.intensity=a.baseIntensity*o)}for(const a of this.accents)a.light.intensity=a.base*t;for(const a of this.shafts)a.uniform.value=a.base*(a.lamp?a.lamp.value:t);this.warm&&(this.warm.material.emissiveIntensity=this.warm.base*t);const r=u0+(1-u0)*t;for(const a of this.reflective)a.material.envMapIntensity=a.base*r;this.emergency&&(this.emergency.material.emissiveIntensity=this.emergency.base*(i?XR:1))}}function d0(s){s.geometry.computeBoundingBox();const e=s.geometry.boundingBox;return(e?e.getCenter(new S):new S).applyMatrix4(s.matrixWorld)}function KR(s){const n=(Array.isArray(s.material)?s.material[0]:s.material)?.uniforms?.uStrength;return n&&typeof n.value=="number"?n:null}function YR(s){const e=Array.isArray(s.material)?s.material:[s.material];for(const t of e)if(t instanceof Qe)return t;return null}function ZR(s,e,t){s.geometry.computeBoundingBox();const n=s.geometry.boundingBox;if(!n)return null;let i=null,r=WR;for(const a of e){if(t.has(a))continue;const o=n.distanceToPoint(a.position);o>=r||(i=a,r=o)}return i}const QR={base:2.5,perUnit:9,abortRange:1.9,withoutTool:.5};class JR{constructor(e,t={}){this.systems=e,this.params={...QR,...t}}toolInHand=!1;job=null;progress=0;startHealth=1;duration=1;lastEnd=null;params;getParams(){return this.params}getJob(){return this.job}isActive(e){return e===void 0?this.job!==null:this.job===e}getProgress(){return this.job?this.progress:0}getLastEnd(){return this.lastEnd}start(e){return this.systems.getHealth(e)>=1||this.job===e?!1:(this.job=e,this.progress=0,this.startHealth=this.systems.getHealth(e),this.duration=this.params.base+(1-this.startHealth)*this.params.perUnit,!0)}cancel(e="cancelled"){this.job&&(this.lastEnd={id:this.job,reason:e,age:0},this.job=null,this.progress=0)}update(e,t){this.lastEnd&&(this.lastEnd.age+=e);const n=this.job;if(!n)return;if(t===null||t>this.params.abortRange){this.cancel("aborted");return}const i=this.systems.getRepairSpeed()*(this.toolInHand?1:this.params.withoutTool),r=e*i/Math.max(this.duration,.001);this.progress+=r,this.systems.repair(n,(1-this.startHealth)*r),this.progress>=1&&(this.systems.repair(n,1),this.progress=1,this.cancel("done"))}}const jR=[{id:"lighting",position:[.695,1.4,.45],facing:[-1,0,0],size:[.34,.46]},{id:"lifeSupport",position:[-.695,1.45,-.35],facing:[1,0,0],size:[.38,.34]},{id:"engine",position:[-.05,1.42,-5.17],facing:[0,0,1],size:[.8,.62],range:1.7},{id:"thrusters",position:[1.615,1.45,-3.25],facing:[-1,0,0],size:[.4,.44]},{id:"generator",position:[-1.615,1.45,-4.93],facing:[1,0,0],size:[.4,.5]},{id:"weapons",position:[1.575,1.34,2.32],facing:[-1,0,0],size:[.36,.44]},{id:"sensors",position:[-1.575,1.38,2.32],facing:[1,0,0],size:[.34,.42]}],e2=new S(-1.42,1.42,-1.86),t2="SM_Bench_Tool2",Gr=.06,wl={ok:3111482,impaired:16753706,failed:16723742},f0={ok:.25,impaired:1.9,failed:2.4},p0={ok:0,impaired:1.1,failed:2.6},m0={ok:.14,impaired:.6,failed:.8},n2=3.4,i2={ok:0,impaired:1.15,failed:2},s2={ok:0,impaired:7,failed:40},r2=new tt,gs=new S,Qh=new S,kr=new S,g0=new ye,Br=new te,a2=new te(16777215);function o2(s){if(typeof document>"u")return null;const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d");if(!t)return null;t.fillStyle="#151719",t.fillRect(0,0,e.width,e.height),t.strokeStyle="#5a5f66",t.lineWidth=6,t.strokeRect(8,8,e.width-16,e.height-16),t.fillStyle="#d8d2c2",t.font='bold 62px "Courier New", monospace',t.textAlign="center",t.textBaseline="middle",t.fillText(s,e.width/2,e.height/2+4,e.width-48);const n=new un(e);return n.colorSpace=_t,n}class l2{constructor(e,t,n=0){this.area=t,this.offsetY=n,this.count=e,this.positions=new Float32Array(e*3),this.velocity=new Float32Array(e*3),this.life=new Float32Array(e);for(let a=0;a<e;a++)this.positions[a*3+1]=-999;const i=new xt;i.setAttribute("position",new at(this.positions,3));const r=new mc({color:16738836,size:.02,sizeAttenuation:!0,transparent:!0,opacity:.85,blending:qt,depthWrite:!1});this.points=new ro(i,r),this.points.name="RepairPanel_Sparks",this.points.frustumCulled=!1}points;life;velocity;positions;count;pending=0;update(e,t,n,i){this.pending+=t*e;for(let r=0;r<this.count;r++){if(this.life[r]>0){if(this.life[r]-=e,this.life[r]<=0){this.positions[r*3+1]=-999;continue}for(let a=0;a<3;a++)this.velocity[r*3+a]+=n.getComponent(a)*2.6*e,this.positions[r*3+a]+=this.velocity[r*3+a]*e;continue}this.pending<1||(this.pending-=1,this.spawn(r,i,n))}this.points.geometry.getAttribute("position").needsUpdate=!0}spawn(e,t,n){const[i,r]=this.area;this.positions[e*3]=(t()-.5)*i,this.positions[e*3+1]=this.offsetY+(t()-.5)*r,this.positions[e*3+2]=Gr/2+.01;const a=.3+t()*.8;this.velocity[e*3]=(t()-.5)*1.1+n.x*a,this.velocity[e*3+1]=(t()-.5)*.5+n.y*a,this.velocity[e*3+2]=.35+t()*1.3+n.z*a,this.life[e]=.16+t()*.34}}class c2{constructor(e,t,n,i=Math.random){this.systems=e,this.repair=t,this.interactables=n,this.random=i,this.root.name="RepairPanels"}panels=[];root=new Yt;toolTaken=!1;toolMesh=null;toolDetach=null;time=0;getPanels(){return this.panels}attach(e){this.detach(),e.add(this.root),e.updateMatrix();for(const t of jR){const n=this.build(t),[i,r,a]=t.position;n.local.copy(gs.set(i,r,a).applyMatrix4(e.matrix)),this.root.add(n.group),this.register(n,t.range),this.panels.push(n)}this.attachTool(e),this.root.traverse(t=>t.layers.set(0))}detach(){for(const e of this.panels)e.detach?.();this.panels.length=0,this.toolDetach?.(),this.toolDetach=null,this.toolMesh=null,this.root.clear(),this.root.removeFromParent()}update(e,t){this.time+=e;const n=this.repair.getJob();let i=null;if(n&&t){const r=this.panels.find(a=>a.id===n);r&&(i=u2(t,r.local))}this.repair.update(e,i);for(const r of this.panels){const a=this.systems.getStatus(r.id),o=this.repair.isActive(r.id),l=o?.35+.65*(.5+.5*Math.sin(this.time*14)):p0[a]===0?1:.35+.65*(.5+.5*Math.sin(this.time*p0[a]*Math.PI*2));Br.setHex(o?10474751:wl[a]),r.status.emissive.copy(Br),r.status.color.copy(Br).multiplyScalar(.25),r.status.emissiveIntensity=(o?2.6:f0[a])*l,r.label&&(r.label.emissiveIntensity=o?.7:m0[a],r.label.emissive.copy(Br).lerp(a2,.5)),r.housing.emissive.copy(Br),r.housing.emissiveIntensity=o?.14:a==="ok"?0:.1*l;const c=a!=="ok"||o;r.light.visible=c,c&&(r.light.color.copy(Br),r.light.intensity=(o?1.1:i2[a])*l),r.sparks.update(e,o?6:s2[a],r.gravity,this.random)}}build(e){const[t,n]=e.size,i=new Yt,r=Ms.definition(e.id);i.name=`RepairPanel_${e.id}`,i.position.set(e.position[0],e.position[1],e.position[2]),i.quaternion.copy(h2(e));const a=new Qe({color:2895667,metalness:.85,roughness:.5,emissive:new te(wl.ok),emissiveIntensity:0}),o=new Me(new Sn(t,n,Gr),a);o.castShadow=!0,o.receiveShadow=!0,i.add(o);const l=new Me(new Sn(t+.05,n+.05,Gr*.6),new Qe({color:8225416,metalness:.9,roughness:.45}));l.position.z=-Gr*.25,l.castShadow=!0,l.receiveShadow=!0,i.add(l);const c=new Qe({color:662029,emissive:new te(wl.ok),emissiveIntensity:f0.ok,roughness:.35,metalness:0,side:Kt}),h=new Me(new Ti(t*.76,Math.min(n*.24,.085)),c);h.position.set(0,n*.26,Gr/2+.002),i.add(h);const u=o2(r.name);let d=null;if(u){d=new Qe({map:u,emissiveMap:u,emissive:new te(16777215),emissiveIntensity:m0.ok,roughness:.7,metalness:0});const m=new Me(new Ti(t*.84,Math.min(n*.3,.095)),d);m.position.set(0,-n*.16,Gr/2+.002),i.add(m)}const f=new rr(wl.failed,0,n2,1.25);f.name=`RepairPanel_${e.id}_Glow`,f.position.set(0,0,.28),f.visible=!1,i.add(f);const p=new l2(40,[t*.5,n*.06],n*.16);i.add(p.points);const _=new S(0,-1,0).applyQuaternion(i.quaternion.clone().invert());return{id:e.id,group:i,status:c,housing:a,label:d,light:f,sparks:p,gravity:_,local:new S,detach:null}}register(e,t){const n=Ms.definition(e.id),i={position:e.local,label:()=>this.labelFor(e.id,n.name),enabled:()=>this.systems.getHealth(e.id)<1||this.repair.isActive(e.id),activate:()=>{this.repair.isActive(e.id)?this.repair.cancel():this.repair.start(e.id)}};t!==void 0&&(i.range=t),e.detach=this.interactables.add(i)}labelFor(e,t){if(this.repair.isActive(e))return`F — REPARATUR ${Math.round(this.repair.getProgress()*100)}%  (ABBRECHEN)`;const n=Math.round(this.systems.getHealth(e)*100),i=this.toolTaken?"":" — OHNE WERKZEUG LANGSAM";return`F — ${t} REPARIEREN (${n}%)${i}`}attachTool(e){this.toolMesh=e.getObjectByName(t2)??null,this.toolTaken=!1,this.repair.toolInHand=!1,this.toolMesh&&(this.toolMesh.visible=!0),gs.copy(e2).applyMatrix4(e.matrix);const t=gs.clone();this.toolDetach=this.interactables.add({position:t,label:()=>this.toolTaken?"F — WERKZEUG ZURUECKLEGEN":"F — WERKZEUG NEHMEN",range:1.1,activate:()=>{this.toolTaken=!this.toolTaken,this.repair.toolInHand=this.toolTaken,this.toolMesh&&(this.toolMesh.visible=!this.toolTaken)}})}}function h2(s){gs.set(s.facing[0],s.facing[1],s.facing[2]).normalize();const e=s.up;return e?kr.set(e[0],e[1],e[2]):Math.abs(gs.y)>.95?kr.set(0,0,-1):kr.set(0,1,0),Qh.crossVectors(kr,gs).normalize(),kr.crossVectors(gs,Qh).normalize(),g0.makeBasis(Qh,kr,gs),r2.setFromRotationMatrix(g0)}function u2(s,e){const t=s.x-e.x,n=s.y+zg-e.y,i=s.z-e.z;return Math.sqrt(t*t+n*n+i*i)}class d2{systems;repair;panels;lights;annunciator=new OR;deps;constructor(e){this.deps=e;const t=e.random??Math.random;this.systems=new Ms({random:t}),this.repair=new JR(this.systems),this.panels=new c2(this.systems,this.repair,e.interactables,t),this.lights=new $R(t),this.pushFactors()}attachInterior(e){this.panels.attach(e),this.lights.attach(e),this.annunciator.attach(e)}fixedUpdate(e,t){t&&(this.systems.applyImpact(t.damage,t.direction),this.pushFactors()),this.systems.update(e)}update(e,t){this.pushFactors(),this.systems.sensorsOnline||this.deps.targeting.clear(),this.panels.update(e,t),this.lights.update(e,this.systems.getLightLevel(),this.systems.getFlicker(),this.systems.emergencyLighting),this.annunciator.update(e,this.systems)}reset(){this.repair.cancel(),this.systems.repairAll(),this.pushFactors()}getHudState(){return{systems:xi.map(e=>({id:e.id,code:e.code,name:e.name,health:this.systems.getHealth(e.id),status:this.systems.getStatus(e.id)})),oxygen:this.systems.oxygen,oxygenSeconds:this.systems.getOxygenSeconds(),anyImpaired:this.systems.anyImpaired,anyFailed:this.systems.anyFailed,repairing:this.repair.getJob(),repairProgress:this.repair.getProgress()}}pushFactors(){this.deps.flight.setDamage(this.systems.getFlightDamage()),this.deps.weapons.setDamage(this.systems.getWeaponDamage())}}const f2=15;function Ct(s,e,t){const n=document.createElement(s);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n}function Al(s){return`${Math.round(s).toLocaleString("de-DE")} Cr`}class p2{constructor(e){this.hold=e,this.build(),document.body.appendChild(this.root),this.unsubscribe=this.hold.onChange(()=>{this.open&&this.render()}),this.onKeyDown=t=>{t.code==="Escape"&&this.open&&this.hide()},window.addEventListener("keydown",this.onKeyDown)}root=Ct("div","cargo");body=Ct("tbody");empty=Ct("div","cargo__empty","LADERAUM LEER");totals=Ct("div","cargo__totals");bar=Ct("div","cargo__bar");barFill=Ct("i");table=Ct("table","cargo__table");open=!1;unsubscribe;onKeyDown;get isOpen(){return this.open}show(){this.open=!0,this.render(),this.root.hidden=!1}hide(){this.open=!1,this.root.hidden=!0}toggle(){this.open?this.hide():this.show()}dispose(){this.unsubscribe(),window.removeEventListener("keydown",this.onKeyDown),this.root.remove()}build(){this.root.hidden=!0;const e=Ct("div","cargo__title");e.append(Ct("span",void 0,"FRACHTMANIFEST"),Ct("span",void 0,"LADERAUM"));const t=Ct("thead"),n=Ct("tr");for(const i of["WARE","TONNEN","EK / T","WERT"])n.appendChild(Ct("th",void 0,i));t.appendChild(n),this.table.append(t,this.body),this.bar.appendChild(this.barFill),this.root.append(e,this.table,this.empty,this.totals,this.bar),this.root.appendChild(Ct("div","cargo__hint","F / ESC — SCHLIESSEN"))}render(){const e=this.hold.getManifest();this.body.replaceChildren();for(const a of e){const o=_n[a.good],l=Ct("tr"),c=Ct("td"),h=Ct("span","cargo__chip");h.style.background=`#${o.color.toString(16).padStart(6,"0")}`,c.append(h,document.createTextNode(`${o.name} (${o.code})`)),l.append(c,Ct("td",void 0,Ft(a.tons)),Ct("td",void 0,a.avgPrice>0?Al(a.avgPrice):"EIGEN"),Ct("td",void 0,a.avgPrice>0?Al(a.avgPrice*a.tons):"—")),this.body.appendChild(l)}const t=e.length>0;this.table.hidden=!t,this.empty.hidden=t;const n=this.hold.getUsedCapacity(),i=this.hold.getCapacity(),r=this.hold.getLoadFactor();this.totals.replaceChildren(this.line("BELEGT",`${Ft(n)} / ${i} t`),this.line("FREI",`${Ft(this.hold.getFreeCapacity())} t`),this.line("EINSTAND",Al(this.hold.getPurchaseValue())),this.line("GUTHABEN",Al(this.hold.getCredits())),this.line("MASSE",`${Ft(f2+n)} t`)),this.barFill.style.width=`${Math.min(r,1)*100}%`,this.bar.classList.toggle("is-full",r>.9)}line(e,t){const n=Ct("div","cargo__row");return n.append(Ct("span",void 0,e),Ct("span",void 0,t)),n}}const m2={color:9146261,metalness:.9,roughness:.42},g2={color:3356218,metalness:.85,roughness:.55},_2={color:1710618,metalness:0,roughness:.94},Rl=.05,v2=.17,Cl=.004;function x2(s){const e=s.getAttribute("position"),t=s.getAttribute("normal");if(!e||!t)return;const n=new Float32Array(e.count*2);for(let i=0;i<e.count;i++){const r=e.getX(i),a=e.getY(i),o=e.getZ(i),l=Math.abs(t.getX(i)),c=Math.abs(t.getY(i)),h=Math.abs(t.getZ(i));let u,d;l>=c&&l>=h?(u=o,d=a):c>=h?(u=r,d=o):(u=r,d=a),n[i*2]=u/ta,n[i*2+1]=d/ta}s.setAttribute("uv",new at(n,2))}function M2(s){const n=document.createElement("canvas");n.width=256,n.height=64;const i=n.getContext("2d");if(!i)throw new Error("CargoCrates: 2D-Kontext nicht verfuegbar");const r=`#${new te(s.accent).getHexString()}`;if(i.clearRect(0,0,256,64),s.hazard){i.fillStyle=r,i.fillRect(0,10,256,44),i.fillStyle="rgba(12,10,9,0.92)";for(let o=-64;o<256;o+=34)i.beginPath(),i.moveTo(o,54),i.lineTo(o+17,54),i.lineTo(o+17+22,10),i.lineTo(o+22,10),i.closePath(),i.fill()}else{i.fillStyle="rgba(16,16,15,0.9)",i.fillRect(76,8,104,48),i.strokeStyle=r,i.lineWidth=3,i.strokeRect(76,8,104,48),i.fillStyle=r,i.font="bold 30px ui-monospace, Menlo, monospace",i.textAlign="center",i.textBaseline="middle",i.fillText(s.code,128,64/2+1),i.fillStyle="rgba(190,185,175,0.55)";for(let o=0;o<5;o++)i.fillRect(20+o*8,26,3,12),i.fillRect(196+o*8,26,3,12)}const a=new un(n);return a.colorSpace=_t,a.anisotropy=4,a}class S2{geometries=new Map;goodMaterials=new Map;prototypes=new Map;shared;disposables=[];panel;worn;environment=null;constructor(){this.panel=oc("panel"),this.worn=oc("worn");for(const e of[this.panel,this.worn])this.disposables.push(e.map,e.roughnessMap,e.normalMap);this.shared={steel:this.metal("Cargo_Steel",m2,this.worn),dark:this.metal("Cargo_Dark",g2,this.panel),rubber:this.metal("Cargo_Rubber",_2,null)}}setEnvironment(e){if(!(!e||e===this.environment)){this.environment=e;for(const t of this.allMaterials())t.envMap=e,t.needsUpdate=!0}}create(e){let t=this.prototypes.get(e.id);return t||(t=this.build(e),this.prototypes.set(e.id,t)),t.clone(!0)}dispose(){for(const e of this.geometries.values())e.dispose();for(const e of this.goodMaterials.values())for(const t of Object.values(e))t.dispose();for(const e of Object.values(this.shared))e.dispose();for(const e of this.disposables)e.dispose();this.geometries.clear(),this.goodMaterials.clear(),this.prototypes.clear()}box(e,t,n){return this.cachedBox(`b:${e}:${t}:${n}`,e,t,n,!0)}plainBox(e,t,n){return this.cachedBox(`p:${e}:${t}:${n}`,e,t,n,!1)}cachedBox(e,t,n,i,r){let a=this.geometries.get(e);return a||(a=new Sn(t,n,i),r&&x2(a),this.geometries.set(e,a)),a}cylinder(e,t,n=16){const i=`c:${e.toFixed(4)}:${t.toFixed(4)}:${n}`;let r=this.geometries.get(i);return r||(r=new sr(e,e,t,n),this.geometries.set(i,r)),r}metal(e,t,n){const i=new Qe({name:e,color:t.color,metalness:t.metalness,roughness:t.roughness,envMap:this.environment});return n&&(i.map=n.map,i.roughnessMap=n.roughnessMap,i.normalMap=n.normalMap,i.normalScale.set(.55,.55)),i}materialsFor(e){let t=this.goodMaterials.get(e.id);if(t)return t;const n=this.metal(`Cargo_Paint_${e.id}`,{color:e.color,metalness:.05,roughness:.66},this.panel),i=this.metal(`Cargo_Trim_${e.id}`,{color:new te(e.color).multiplyScalar(.55).getHex(),metalness:.35,roughness:.58},this.worn),r=this.metal(`Cargo_Accent_${e.id}`,{color:e.accent,metalness:0,roughness:.55},null),a=M2(e);this.disposables.push(a);const o=new Qe({name:`Cargo_Label_${e.id}`,map:a,transparent:!0,alphaTest:.5,metalness:0,roughness:.72,envMap:this.environment});return t={paint:n,trim:i,accent:r,label:o},this.goodMaterials.set(e.id,t),t}*allMaterials(){yield*Object.values(this.shared);for(const e of this.goodMaterials.values())yield*Object.values(e)}mesh(e,t,n=0,i=0,r=0){const a=new Me(e,t);return a.position.set(n,i,r),a.castShadow=!0,a.receiveShadow=!0,a}addCorners(e,t,n,i,r=0){const a=this.box(Rl,n,Rl),o=t/2-Rl/2-r,l=i/2-Rl/2-r;for(const c of[-1,1])for(const h of[-1,1])e.add(this.mesh(a,this.shared.steel,c*o,n/2,h*l))}addLabel(e,t,n,i,r){const a=this.materialsFor(t),o=this.plainBox(n+Cl*2,v2,i+Cl*2);e.add(this.mesh(o,a.label,0,r,0))}build(e){const t=zd[e.container],n=new Yt;return n.name=`Cargo_${e.id}`,{bin:()=>this.buildBin(n,e,t),crate:()=>this.buildCrate(n,e,t),barrels:()=>this.buildBarrels(n,e,t),case:()=>this.buildCase(n,e,t)}[e.container](),n}buildBin(e,t,n){const i=this.materialsFor(t),r=Xs,a=qs,o=n-.11;e.add(this.mesh(this.box(r-.1,.05,a-.1),this.shared.dark,0,.025,0)),e.add(this.mesh(this.box(r-.06,o,a-.06),i.paint,0,.05+o/2,0));for(const l of[.34,.68]){const c=.05+o*l;e.add(this.mesh(this.box(r-.04,.035,a-.04),i.trim,0,c,0))}e.add(this.mesh(this.box(r,.06,a),this.shared.dark,0,n-.03,0)),this.addCorners(e,r,n-.06,a),this.addLabel(e,t,r-.06,a-.06,.05+o*.88)}buildCrate(e,t,n){const i=this.materialsFor(t),r=Xs,a=qs,o=n-.05;e.add(this.mesh(this.box(r-.05,o,a-.05),i.paint,0,o/2,0)),e.add(this.mesh(this.box(r,.05,a),i.trim,0,n-.025,0));const l=this.box(.09,o+.06,a+Cl*2);e.add(this.mesh(l,this.shared.rubber,0,(o+.06)/2,0)),this.addCorners(e,r,o,a),this.addLabel(e,t,r-.05,a-.05,o*.42)}buildBarrels(e,t,n){const i=this.materialsFor(t),r=.09,a=n-r,o=.145;e.add(this.mesh(this.box(Xs,r,qs),this.shared.dark,0,r/2,0));const l=this.cylinder(o,a),c=this.cylinder(o+.008,.035),h=this.cylinder(o*.72,.02);for(const u of[-1,1])for(const d of[-1,1]){const f=u*.16,p=d*.19;e.add(this.mesh(l,i.paint,f,r+a/2,p));for(const _ of[.28,.72])e.add(this.mesh(c,i.accent,f,r+a*_,p));e.add(this.mesh(h,this.shared.steel,f,r+a-.01,p))}this.addLabel(e,t,Xs-.08,qs-.08,r*.55)}buildCase(e,t,n){const i=this.materialsFor(t),r=Xs,a=qs,o=n-.06;e.add(this.mesh(this.box(r-.04,o,a-.04),i.paint,0,o/2,0)),e.add(this.mesh(this.box(r,.06,a),this.shared.dark,0,n-.03,0)),e.add(this.mesh(this.box(r-.02,.04,a-.02),this.shared.steel,0,o-.02,0));const l=this.box(.1,.05,a+Cl*2);for(const c of[-1,1])e.add(this.mesh(l,i.accent,c*.17,o-.09,0));this.addCorners(e,r,o,a,.01),this.addLabel(e,t,r-.04,a-.04,o*.42)}}const jg=[{id:"S0",x:1.08,z:-4.76,headroom:2,aisle:!1},{id:"P0",x:-1.08,z:-4.76,headroom:2,aisle:!1},{id:"C0",x:0,z:-4.76,headroom:2,aisle:!1},{id:"S1",x:1.08,z:-3.9,headroom:2,aisle:!1},{id:"P1",x:-1.08,z:-3.9,headroom:2,aisle:!1},{id:"S2",x:1.08,z:-3.04,headroom:2,aisle:!1},{id:"P2",x:-1.08,z:-3.04,headroom:1.4,aisle:!1},{id:"S3",x:1.08,z:-2.18,headroom:1.4,aisle:!1},{id:"A0",x:-.4,z:-3.9,headroom:1.4,aisle:!0},{id:"A1",x:-.4,z:-3.04,headroom:1.4,aisle:!0},{id:"A2",x:-.4,z:-2.18,headroom:1.4,aisle:!0}],y2=.03,_0=.015;function Jh(s){const e=Math.sin(s*127.1)*43758.5453;return(e-Math.floor(e))*2-1}function v0(s,e=jg){const t=[],n=new Set;let i=0,r=0,a=0,o=0;for(const c of s){const h=_n[c.good];if(!h||c.tons<=0)continue;const u=zd[h.container],d=qw(h,c.tons);a>0&&(r++,a=0,o=0);for(let f=0;f<d;f++){for(;r<e.length&&a+u>e[r].headroom+1e-6;)r++,a=0,o=0;if(r>=e.length){i+=d-f;break}const p=e[r],_=r*17+o*3+1;n.add(p.id),t.push({good:c.good,slot:p.id,level:o,x:p.x+Jh(_)*_0,z:p.z+Jh(_+.5)*_0,y:a,yaw:Jh(_+1.5)*y2,width:Xs,depth:qs,height:u}),a+=u,o++}}let l=0;for(const c of e)c.aisle&&n.has(c.id)&&l++;return{units:t,overflow:i,slotsUsed:n.size,aisleSlotsUsed:l}}const b2=-1.45,E2=1.45,T2=-5.2,w2=-1.2,jh={maxX:-.9,minZ:-2.4,maxZ:-1.3},eu=.05,A2=1.6;function x0(s,e,t,n){if(s<b2+t||s>E2-t||e<T2+t||e>w2-t||s<jh.maxX+t&&e>jh.minZ-t&&e<jh.maxZ+t)return!1;for(const i of n){const r=i.width/2+t,a=i.depth/2+t;if(Math.abs(s-i.x)<r&&Math.abs(e-i.z)<a)return!1}return!0}function R2(s,e,t,n){if(x0(s,e,t,n))return null;for(let i=eu;i<=A2;i+=eu){const r=Math.max(8,Math.round(2*Math.PI*i/eu));for(let a=0;a<r;a++){const o=a/r*Math.PI*2,l=s+Math.cos(o)*i,c=e+Math.sin(o)*i;if(x0(l,c,t,n))return{x:l,z:c}}}return null}const M0="OFF_",C2="CargoStacks",P2="COL_Cargo_",sd=1.15,L2=new S(0,sd,-2);class I2{anchors=[new S,new S];hold;options;factory=new S2;group=new Yt;colliderGeometries=[];colliderMaterial=new Ot({visible:!1});interior=null;plan=v0([]);unsubscribe=null;constructor(e){this.hold=e.hold,this.options=e,this.group.name=C2,this.updateAnchors(),this.unsubscribe=this.hold.onChange(()=>this.rebuild())}attach(e){this.interior!==e&&(this.interior=e,N2(e),e.add(this.group),this.rebuild())}getPlan(){return this.plan}get crateCount(){return this.plan.units.length}rebuild(){if(this.plan=v0(this.hold.getManifest()),this.updateAnchors(),!!this.interior){this.clearGroup(),this.factory.setEnvironment(D2(this.interior));for(const e of this.plan.units){const t=_n[e.good],n=this.factory.create(t);n.position.set(e.x,e.y,e.z),n.rotation.y=e.yaw,n.name=`Cargo_${e.slot}_${e.level}`,this.group.add(n);const i=new Sn(e.width,e.height,e.depth);this.colliderGeometries.push(i);const r=new Me(i,this.colliderMaterial);r.name=`${P2}${e.slot}_${e.level}`,r.position.set(e.x,e.y+e.height/2,e.z),r.rotation.y=e.yaw,r.visible=!1,this.group.add(r)}this.group.traverse(e=>e.layers.set(0)),this.group.updateMatrixWorld(!0),this.options.onCollidersChanged?.(),this.options.onGeometryChanged?.()}}dispose(){this.unsubscribe?.(),this.unsubscribe=null,this.clearGroup(),this.group.removeFromParent(),this.colliderMaterial.dispose(),this.factory.dispose(),this.interior=null}clearGroup(){this.group.clear();for(const e of this.colliderGeometries)e.dispose();this.colliderGeometries.length=0}updateAnchors(){const e=new Set(this.plan.units.map(r=>r.slot)),t=jg.filter(r=>e.has(r.id));if(t.length===0){for(const r of this.anchors)tu(L2,r);return}let n=t[0],i=t[0];for(const r of t)r.z>n.z&&(n=r),r.z<i.z&&(i=r);tu(new S(n.x,sd,n.z),this.anchors[0]),tu(new S(i.x,sd,i.z),this.anchors[1])}}function D2(s){let e=null;return s.traverse(t=>{if(e||!(t instanceof Me)||t.name.startsWith("COL_"))return;const n=Array.isArray(t.material)?t.material:[t.material];for(const i of n){const r=i.envMap;if(r){e=r;return}}}),e}function tu(s,e){return e.set(-s.x,s.y,-s.z)}function N2(s){const e=[];s.traverse(t=>{/^SM_Crate\d/.test(t.name)?(t.visible=!1,e.push(t)):t.name.startsWith("COL_Crate")&&e.push(t)});for(const t of e)t.name.startsWith(M0)||(t.name=M0+t.name)}function S0(s,e,t=Vd){const n=e.getShipMass(t);return s.getParams().mass=n,n}function U2(s,e,t=Vd){return S0(s,e,t),e.onChange(()=>S0(s,e,t))}const F2=1.7,O2=[["ore",6],["parts",4]];function k2(s){const{ship:e,walk:t,flight:n,renderer:i}=s,r=new Yw(s),a=s.interactables??new Vg,o=new I2({hold:r,onCollidersChanged:()=>{e.refreshColliders(),t.rebuildCollision(),l()},onGeometryChanged:()=>{i.shadowMap.needsUpdate=!0}});function l(){const f=o.getPlan().units;if(f.length===0)return;const p=R2(-t.position.x,-t.position.z,Gi,f);p&&(t.position.x=-p.x,t.position.z=-p.z,t.velocity.x=0,t.velocity.z=0)}const c=e.onInteriorChange(f=>o.attach(f)),h=U2(n,r),u=new p2(r),d=o.anchors.map(f=>a.add({position:f,range:F2,label:()=>{if(u.isOpen)return"F — MANIFEST SCHLIESSEN";const p=r.getUsedCapacity();return p>0?`F — FRACHTMANIFEST · ${Ft(p)} T`:"F — FRACHTMANIFEST · LEER"},activate:()=>u.toggle()}));for(const[f,p]of s.initialLoad??O2)r.add(f,p);return{hold:r,visuals:o,panel:u,interactables:a,load:(f,p)=>r.add(f,p),unload:(f,p)=>r.remove(f,p),fill:f=>{if(f){r.add(f,r.getFreeCapacity());return}const p=Object.keys(_n);for(const _ of p){const m=r.getFreeCapacity();if(m<=.001)break;r.add(_,Math.min(m,r.getCapacity()/p.length))}},clear:()=>r.clear(),dispose:()=>{for(const f of d)f();c(),h(),u.dispose(),o.dispose()}}}const Bs=.001,e_={scanRange:1500,scanTime:2.4,beamRange:600,spinUp:.8,baseRate:.2,hardnessFloor:.2,chunkTons:.5};function B2(s,e=1,t=e_){const n=ii[s].hardness;return t.baseRate/(t.hardnessFloor+n)*e}const Pl=new S;function z2(s){return(e,t,n)=>{Pl.subVectors(t,e);const i=Pl.length();if(i<.001)return!0;Pl.divideScalar(i);const r=s.hitSegment(e,Pl,i);return!r||r.index===n}}const y0=new S;class V2{field;hold;getYieldBonus;lineOfSight;params;scans=new Map;beamHeld=!1;scanning=!1;scanTimer=0;scanIndex=-1;scanMessage=null;charge=0;pending=0;pendingMineral=null;sample={point:new S,normal:new S};status={phase:"idle",targetIndex:-1,mineral:null,scanned:!1,scanProgress:0,distance:0,targetRadius:0,beamRange:0,remainingTons:0,totalTons:0,sessionTons:0,batchProgress:0,rate:0,bonus:1,beamActive:!1,charge:0,hitPoint:new S,hitNormal:new S(0,1,0),hasHit:!1,deliveries:0,sinceDelivery:1/0,message:"BEREIT",cargoUsed:0,cargoFree:0,cargoCapacity:0};constructor(e){this.field=e.field,this.hold=e.hold,this.getYieldBonus=e.getYieldBonus??(()=>1),this.lineOfSight=e.lineOfSight??null,this.params={...e_,...e.params},this.status.beamRange=this.params.beamRange}requestScan(){this.scanning=!this.scanning,this.scanTimer=0,this.scanIndex=-1}beginScan(e){this.isScanned(e)||(this.scanning=!0,this.scanTimer=0,this.scanIndex=-1)}setBeam(e){this.beamHeld=e}isScanned(e){if(e<0)return!1;const t=this.scans.get(e);return t!==void 0&&t===this.field.getGeneration(e)}getKnownMineral(e){return this.isScanned(e)?this.field.getMineral(e):null}remember(e){e<0||this.scans.set(e,this.field.getGeneration(e))}getScanCount(){let e=0;for(const t of this.scans.keys())this.isScanned(t)&&e++;return e}getStatus(){return this.status}update(e,t,n){const i=this.status;i.sinceDelivery+=e,i.bonus=this.bonus(),i.cargoCapacity=this.hold.getCapacity(),i.cargoUsed=this.hold.getUsedCapacity(),i.cargoFree=this.hold.getFreeCapacity(),this.scanMessage=null;const r=t>=0&&this.field.isAlive(t)?t:-1;if(r!==i.targetIndex&&(this.flush(),this.scanIndex>=0&&this.cancelScan(),i.sessionTons=0,i.targetIndex=r),r<0){this.idle(e,"KEIN ZIEL");return}this.field.getCenter(r,y0);const a=this.field.getRadius(r),o=Math.max(y0.distanceTo(n)-a,0);i.distance=o,i.targetRadius=a,i.mineral=this.getKnownMineral(r),i.scanned=i.mineral!==null,i.remainingTons=this.field.getRemainingTons(r),i.totalTons=this.field.getTotalTons(r),i.hasHit=this.field.sampleSurface(r,n,this.sample),i.hasHit&&(i.hitPoint.copy(this.sample.point),i.hitNormal.copy(this.sample.normal)),this.stepScan(e,r,o),this.stepBeam(e,r,o,n),!i.beamActive&&this.scanMessage&&(i.message=this.scanMessage)}shift(e){this.status.hitPoint.sub(e)}bonus(){const e=this.getYieldBonus();return Number.isFinite(e)&&e>0?e:1}cancelScan(){this.scanning=!1,this.scanTimer=0,this.scanIndex=-1,this.status.scanProgress=0}idle(e,t){const n=this.status;this.cancelScan(),this.cool(e),n.phase="idle",n.scanProgress=0,n.beamActive=!1,n.rate=0,n.hasHit=!1,n.mineral=null,n.scanned=!1,n.distance=0,n.remainingTons=0,n.totalTons=0,n.targetRadius=0,n.batchProgress=0,n.message=t}stepScan(e,t,n){const i=this.status;if(!this.scanning){i.scanProgress=0;return}if(this.scanIndex=t,n>this.params.scanRange){this.scanMessage="SCAN AUSSER REICHWEITE";return}this.scanTimer+=e,i.scanProgress=Math.min(this.scanTimer/this.params.scanTime,1),!(this.scanTimer<this.params.scanTime)&&(this.cancelScan(),this.remember(t),i.mineral=this.field.getMineral(t),i.scanned=!0,i.scanProgress=1)}stepBeam(e,t,n,i){const r=this.status,a=this.scanning;if(!this.beamHeld){this.cool(e),this.flush(),r.beamActive=!1,r.rate=0,r.phase=a?"scan":"idle",r.message=a?"SCAN LAEUFT":this.readyMessage(t,n);return}const o=this.blocker(t,n,i);if(o){this.cool(e),this.flush(),r.beamActive=!1,r.rate=0,r.phase=a?"scan":"idle",r.message=o;return}const l=this.field.getMineral(t);this.charge=Math.min(1,this.charge+e/this.params.spinUp);const c=B2(l,this.bonus(),this.params)*this.charge,h=this.hold.getFreeCapacity()-this.pending,u=Math.min(c*e,Math.max(h,0)),d=this.field.mine(t,u);if(d>0)for(this.pendingMineral!==l&&this.flush(),this.pendingMineral=l,this.pending+=d,r.sessionTons+=d;this.pending>=this.params.chunkTons&&this.deliver(this.params.chunkTons););r.phase="mine",r.charge=this.charge,r.beamActive=!0,r.rate=c,r.remainingTons=this.field.getRemainingTons(t),r.batchProgress=Math.min(this.pending/this.params.chunkTons,1),r.message="FOERDERUNG LAEUFT"}blocker(e,t,n){return t>this.params.beamRange?"AUSSER REICHWEITE":this.status.hasHit?this.lineOfSight&&!this.lineOfSight(n,this.status.hitPoint,e)?"SICHT VERSTELLT":this.field.getRemainingTons(e)<=Bs?"BROCKEN ERSCHOEPFT":this.hold.getFreeCapacity()-this.pending<=Bs?"LADERAUM VOLL":null:"KEIN AUFTREFFPUNKT"}readyMessage(e,t){return this.field.getRemainingTons(e)<=Bs?"BROCKEN ERSCHOEPFT":this.hold.getFreeCapacity()<=Bs?"LADERAUM VOLL":t>this.params.beamRange?"ANFLIEGEN":"BEREIT"}cool(e){this.charge=Math.max(0,this.charge-e/this.params.spinUp*2),this.status.charge=this.charge}flush(){this.pending>Bs&&this.deliver(this.pending),this.pending<=Bs&&(this.pending=0),this.status.batchProgress=Math.min(this.pending/this.params.chunkTons,1)}deliver(e){const t=this.pendingMineral;if(!t)return this.pending=0,!1;const n=Math.min(e,this.pending,this.hold.getFreeCapacity()),i=Math.floor(n*100)/100;return i<=Bs?!1:(this.pending-=i,this.hold.add(ii[t].good,i,0),this.status.deliveries++,this.status.sinceDelivery=0,this.remember(this.status.targetIndex),!0)}}const nu=[0,-.85,-4.6],Ll=new te(2.2,1.05,.38),H2=new te(1.4,.45,.12),G2=new te(.5,1.6,2.4),b0=.16,E0=.5,W2=.28,X2=64,q2=.06,$2=.16,K2=.75;function Y2(){const e=document.createElement("canvas");e.width=128,e.height=128;const t=e.getContext("2d");if(!t)throw new Error("2D-Context fuer den Foerderstrahl nicht verfuegbar");const n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.3,"rgba(255,255,255,0.7)"),n.addColorStop(.65,"rgba(255,255,255,0.15)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,128,128),new un(e)}function Z2(){const s=document.createElement("canvas");s.width=4,s.height=64;const e=s.getContext("2d");if(!e)throw new Error("2D-Context fuer den Foerderstrahl nicht verfuegbar");const t=e.createLinearGradient(0,0,0,64);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.25,"rgba(255,255,255,0.55)"),t.addColorStop(.55,"rgba(255,255,255,0.42)"),t.addColorStop(1,"rgba(255,255,255,1)"),e.fillStyle=t,e.fillRect(0,0,4,64),new un(s)}function T0(s,e,t){const n=new sr(1,W2,1,12,1,!0);n.translate(0,.5,0);const i=new Ot({map:s,color:e,transparent:!0,opacity:t,blending:qt,depthWrite:!1,depthTest:!0}),r=new Me(n,i);return r.frustumCulled=!1,r.visible=!1,r}function Il(s,e,t){const n=new Jr(new er({map:s,color:e,blending:qt,depthWrite:!1,transparent:!0,opacity:0}));return n.scale.setScalar(t),n.visible=!1,n}const Dl=new S,Fa=new S,w0=new tt,Q2=new S(0,1,0),fs=new S,Oa=new S,Nl=new S,iu=new S,A0=new te;function J2(s){return 1+Math.sin(s*37.1)*.1+Math.sin(s*91.7)*.06}class j2 extends Yt{constructor(e=null){super(),this.impacts=e,this.name="MiningBeam",this.frustumCulled=!1;const t=Z2();this.halo=T0(t,H2,.34),this.core=T0(t,Ll,.95),this.add(this.halo,this.core);const n=Y2();this.muzzleGlow=Il(n,Ll,1.6),this.impactGlow=Il(n,Ll,6),this.impactHeat=Il(n,16777215,12),this.add(this.muzzleGlow,this.impactGlow,this.impactHeat);for(let i=0;i<X2;i++){const r=Il(n,16777215,1);this.add(r),this.puffs.push({sprite:r,mode:"dust",life:0,duration:1,start:new S,velocity:new S,startSize:1,endSize:1,swing:new S})}}core;halo;muzzleGlow;impactGlow;impactHeat;puffs=[];time=0;dustTimer=0;chunkTimer=0;next=0;lastDeliveries=0;thump=0;update(e,t,n){this.time+=e,this.thump=Math.max(0,this.thump-e*3.2),Dl.set(nu[0],nu[1],nu[2]).applyMatrix4(n.matrixWorld);const i=t.phase==="scan"&&t.scanProgress>0,r=(t.beamActive||i)&&t.hasHit;t.deliveries!==this.lastDeliveries&&(this.lastDeliveries=t.deliveries,this.onDelivery(t,Dl)),r?this.drawBeam(e,t,Dl):this.hideBeam(),this.updatePuffs(e,Dl)}shift(e){for(const t of this.puffs)t.life<=0||(t.sprite.position.sub(e),t.start.sub(e))}mineralColor(e){return e.mineral?A0.setHex(ii[e.mineral].vein):A0.setHex(14206888)}drawBeam(e,t,n){const i=t.beamActive,r=i?Math.max(t.charge,.15):.5;if(fs.copy(t.hitPoint),i){this.surfaceAxes(t.hitNormal);const d=.9*r;fs.addScaledVector(Oa,Math.sin(this.time*11.3)*d).addScaledVector(Nl,Math.sin(this.time*7.9+1.7)*d),fs.addScaledVector(t.hitNormal,-Math.min(2.5,t.targetRadius*.12))}Fa.subVectors(fs,n);const a=Fa.length();if(a<.001){this.hideBeam();return}Fa.divideScalar(a),w0.setFromUnitVectors(Q2,Fa);const o=i?J2(this.time):.8+Math.sin(this.time*5)*.2,l=i?b0:b0*.45,c=i?E0:E0*.3,h=i?Ll:G2;for(const[d,f,p]of[[this.core,l,.95],[this.halo,c,.34]]){d.visible=!0,d.position.copy(n),d.quaternion.copy(w0);const _=f*r*o*(1+a/900);d.scale.set(_,a,_);const m=d.material;m.color.copy(h),m.opacity=p*r*(i?o:.7)}this.muzzleGlow.visible=!0,this.muzzleGlow.position.copy(n).addScaledVector(Fa,.6),this.muzzleGlow.material.color.copy(h),this.muzzleGlow.material.opacity=(.5+this.thump)*r,this.muzzleGlow.scale.setScalar(1.4+this.thump*2.6);const u=Math.max(3,a*.02)*r;this.impactGlow.visible=!0,this.impactGlow.position.copy(fs),this.impactGlow.material.color.copy(h),this.impactGlow.material.opacity=(i?.85:.35)*r*o,this.impactGlow.scale.setScalar(u*(i?1.1:.5)),this.impactHeat.visible=i,i&&(this.impactHeat.position.copy(fs),this.impactHeat.material.color.copy(this.mineralColor(t)),this.impactHeat.material.opacity=.5*r*(.8+Math.sin(this.time*9)*.2),this.impactHeat.scale.setScalar(u*2.4)),i&&(this.dustTimer-=e,this.dustTimer<=0&&(this.dustTimer=q2,this.spawnDust(fs,t)),this.chunkTimer-=e,this.chunkTimer<=0&&(this.chunkTimer=$2,this.spawnChunk(fs,t,1)))}hideBeam(){this.core.visible=!1,this.halo.visible=!1,this.muzzleGlow.visible=!1,this.impactGlow.visible=!1,this.impactHeat.visible=!1}onDelivery(e,t){if(this.thump=1,!!e.hasHit){for(let n=0;n<5;n++)this.spawnChunk(e.hitPoint,e,1.4);this.impacts?.spawnImpact(t,1.2)}}surfaceAxes(e){Oa.set(e.z,e.x,-e.y).normalize(),Nl.crossVectors(e,Oa).normalize()}spawnDust(e,t){const n=this.take();n.mode="dust",n.duration=.8+this.next%3*.15,n.life=n.duration,n.startSize=.8,n.endSize=5.5,n.start.copy(e),n.sprite.position.copy(e),this.surfaceAxes(t.hitNormal);const i=this.time*5.1;n.velocity.copy(t.hitNormal).multiplyScalar(3.5).addScaledVector(Oa,Math.cos(i)*2.2).addScaledVector(Nl,Math.sin(i)*2.2),n.sprite.material.color.copy(this.mineralColor(t)).multiplyScalar(.7),n.sprite.material.opacity=.5,n.sprite.visible=!0}spawnChunk(e,t,n){const i=this.take();i.mode="chunk",i.duration=K2,i.life=i.duration,i.startSize=1.5*n,i.endSize=.4*n,i.start.copy(e),i.sprite.position.copy(e),this.surfaceAxes(t.hitNormal);const r=this.time*8.7+this.next;i.swing.copy(Oa).multiplyScalar(Math.cos(r)*14*n).addScaledVector(Nl,Math.sin(r)*14*n).addScaledVector(t.hitNormal,6),i.sprite.material.color.copy(this.mineralColor(t)),i.sprite.material.opacity=.95,i.sprite.visible=!0}take(){const e=this.puffs[this.next];return this.next=(this.next+1)%this.puffs.length,e}updatePuffs(e,t){for(const n of this.puffs){if(n.life<=0)continue;if(n.life-=e,n.life<=0){n.sprite.visible=!1,n.sprite.material.opacity=0;continue}const i=1-n.life/n.duration;if(n.mode==="dust")n.sprite.position.addScaledVector(n.velocity,e),n.sprite.material.opacity=.5*Math.pow(1-i,1.6);else{const a=i*i*(3-2*i);iu.copy(n.start).lerp(t,a),iu.addScaledVector(n.swing,Math.sin(i*Math.PI)*(1-a*.5)),n.sprite.position.copy(iu),n.sprite.material.opacity=.95*Math.min(1,(1-i)*3)}const r=n.startSize+(n.endSize-n.startSize)*i;n.sprite.scale.setScalar(r)}}}const R0="ShipExterior",C0="Glass",eC={Hull_Paint:{color:9274481,metalness:.04,roughness:.64},Hull_Panel:{color:8090982,metalness:.05,roughness:.72},Hull_Olive:{color:4936e3,metalness:.05,roughness:.68},Metal_Bare:{color:9146261,metalness:.9,roughness:.42},Metal_Dark:{color:3093046,metalness:.85,roughness:.55},Metal_Rust:{color:7158304,metalness:.1,roughness:.9},Rubber_Black:{color:1250067,metalness:0,roughness:.92},Hazard:{color:12487188,metalness:0,roughness:.62},Marking:{color:12433577,metalness:0,roughness:.7}},tC={Hull_Paint:"panel",Hull_Panel:"panel",Hull_Olive:"panel",Metal_Bare:"worn",Metal_Dark:"panel",Metal_Rust:"worn",Hazard:"worn",Marking:"worn"},P0=.8,L0=[.211,.043],nC=1,iC=1.6;function rd(s){return s<0?0:s>1?1:s}function sC(s){return s.assistEnabled?s.maxSetSpeed>0?rd(s.setSpeed/s.maxSetSpeed):0:rd(Math.max(s.main,0))}function rC(s,e){const t=.9+s*3.4;return e?t+4:t}function aC(s,e,t=0){const n=((s+t)%e+e)%e,i=r=>Math.max(0,1-Math.abs(n-r)/.06);return Math.min(1,i(0)+i(.2))}const oC=["Thruster_0","Thruster_1","Thruster_2","Thruster_3"],lC=[{marker:"Nav_Port",mesh:"SM_Lamp_NavPort",color:16720920,kind:"steady",phase:0},{marker:"Nav_Star",mesh:"SM_Lamp_NavStar",color:2883418,kind:"steady",phase:0},{marker:"Beacon_Top",mesh:"SM_Lamp_BeaconTop",color:16777215,kind:"strobe",phase:0},{marker:"Beacon_Belly",mesh:"SM_Lamp_BeaconBelly",color:16777215,kind:"strobe",phase:.9},{marker:"Beacon_Tail",mesh:"SM_Lamp_BeaconTail",color:16773328,kind:"strobe",phase:1.4}],cC=1.7,hC="Nozzle_Glow";class uC extends Fe{thrusters=[];lamps=[];glow=[];time=0;constructor(e){super(),this.name="ShipExterior",this.visible=!1,this.add(e),this.collectThrusters(e),this.collectLamps(e),this.collectGlow(e)}setVisible(e){this.visible=e}update(e,t){if(!this.visible)return;this.time+=e;const n=t.getParams(),i=sC({assistEnabled:t.assistEnabled,setSpeed:t.setSpeed,maxSetSpeed:n.maxSetSpeed,main:t.inputs.main,afterburner:t.inputs.afterburner}),r=t.inputs.afterburner,a=rC(i,r),o=i>.01||r;for(const l of this.glow)l.emissiveIntensity=.1+i*2+(r?1.6:0);for(const l of this.thrusters){if(l.plume.visible=o,!o)continue;const c=1+.07*Math.sin(this.time*37+l.phase)+.04*Math.sin(this.time*61.7+l.phase*2.3);l.plume.scale.set(c,c,a*c);const h=l.plume.material;h.opacity=rd(.3+i*.38+(r?.2:0)),r?h.color.setRGB(.86,.92,1):h.color.setRGB(1,.94,.86)}for(const l of this.lamps){const c=l.spec.kind==="steady"?.75+.25*Math.sin(this.time*2.1):aC(this.time,cC,l.spec.phase);l.material.emissiveIntensity=l.baseIntensity*(.12+c*1.6),l.halo.material.opacity=.12+c*.88,l.halo.scale.setScalar(l.halo.userData.size*(.7+c*.6))}}collectThrusters(e){e.updateMatrix();for(const[t,n]of oC.entries()){const i=e.getObjectByName(n);if(!i)continue;const r=i.position.clone().applyMatrix4(e.matrix),a=Math.abs(i.scale.x)||.5,o=new Me(dC(a),fC());o.position.copy(r),o.frustumCulled=!1,o.layers.set(0),this.add(o),this.thrusters.push({plume:o,phase:t*1.7})}}collectGlow(e){const t=new Set;e.traverse(n=>{if(!(n instanceof Me))return;const i=Array.isArray(n.material)?n.material:[n.material];for(const r of i)!r||t.has(r)||(t.add(r),r.name===hC&&r instanceof Qe&&(r.toneMapped=!1,this.glow.push(r)))})}collectLamps(e){e.updateMatrix();for(const t of lC){const n=e.getObjectByName(t.mesh),i=e.getObjectByName(t.marker);if(!(n instanceof Me)||!i)continue;const r=Array.isArray(n.material)?n.material[0]:n.material;if(!(r instanceof Qe))continue;const a=r.clone();a.name=`${r.name}_${t.mesh}`,a.emissive=new te(t.color),a.toneMapped=!1,n.material=a;const o=(Math.abs(i.scale.x)||.15)*6,l=new Jr(new er({map:pC(),color:new te(t.color),transparent:!0,blending:qt,depthWrite:!1,toneMapped:!1}));l.position.copy(i.position).applyMatrix4(e.matrix),l.userData.size=o,l.scale.setScalar(o),l.layers.set(0),this.add(l),this.lamps.push({material:a,halo:l,spec:t,baseIntensity:1.4})}}}function dC(s,e=16){const t=[[[0,1,[1,.84,.58,.8]],[.22,.92,[1,.52,.16,.62]],[.6,.55,[1,.28,.06,.3]],[1,.06,[.8,.14,.03,0]]],[[0,.52,[1,.98,.92,.95]],[.16,.44,[1,.9,.7,.7]],[.42,.16,[1,.6,.25,0]]]],n=[],i=[],r=[];for(const o of t){const l=n.length/3;for(const[c,h,u]of o)for(let d=0;d<e;d++){const f=d/e*Math.PI*2;n.push(Math.cos(f)*s*h,Math.sin(f)*s*h,c),i.push(...u)}for(let c=0;c<o.length-1;c++)for(let h=0;h<e;h++){const u=l+c*e+h,d=l+c*e+(h+1)%e,f=u+e,p=d+e;r.push(u,d,p,u,p,f)}}const a=new xt;return a.setAttribute("position",new at(new Float32Array(n),3)),a.setAttribute("color",new at(new Float32Array(i),4)),a.setIndex(r),a}function fC(){return new Ot({vertexColors:!0,transparent:!0,blending:qt,depthWrite:!1,side:Kt,toneMapped:!1})}let Ul=null;function pC(){if(Ul)return Ul;const s=64,e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d"),n=t.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,0.55)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,s,s),Ul=new un(e),Ul}function mC(s){const e=new fc,t=new Me(new Dn(50,16,12),new Ot({color:658708,side:sn}));e.add(t);const n=new Me(new Dn(6,16,12),new Ot({color:16774370}));n.position.copy(s).normalize().multiplyScalar(40),e.add(n);const i=new Me(new Dn(20,12,10),new Ot({color:1846074}));return i.position.copy(s).normalize().multiplyScalar(-40),e.add(i),e}const zs=new S,Fl=new S;function gC(s){const e=s.geometry;if(e.getAttribute("uv"))return;const t=e.getAttribute("position"),n=e.getAttribute("normal");if(!t||!n)return;const i=new Float32Array(t.count*2);for(let r=0;r<t.count;r++){zs.fromBufferAttribute(t,r),Fl.fromBufferAttribute(n,r);const a=Math.abs(Fl.x),o=Math.abs(Fl.y),l=Math.abs(Fl.z);let c,h;a>=o&&a>=l?(c=zs.z,h=zs.y):o>=l?(c=zs.x,h=zs.z):(c=zs.x,h=zs.y),i[r*2]=c/ta+L0[0],i[r*2+1]=h/ta+L0[1]}e.setAttribute("uv",new at(i,2))}function _C(s,e){const t=new Map,n=r=>{let a=t.get(r);return a||t.set(r,a=oc(r)),a},i=new Set;s.traverse(r=>{if(!(r instanceof Me))return;r.layers.set(0),r.layers.enable(ar),r.castShadow=!0,r.receiveShadow=!0,gC(r);const a=Array.isArray(r.material)?r.material:[r.material];for(const o of a){if(!o||i.has(o)||!(o instanceof Qe))continue;i.add(o);const l=eC[o.name];l&&(o.color.setHex(l.color),o.metalness=l.metalness,o.roughness=l.roughness);const c=tC[o.name];if(c!==void 0){const h=n(c);o.map=h.map,o.roughnessMap=h.roughnessMap,o.normalMap=h.normalMap,o.normalScale.set(P0,P0)}o.name===C0?(o.transparent=!0,o.opacity=.24,o.side=Kt,o.metalness=0,o.roughness=.04,o.color.setHex(2898498)):o.side=Gn,e&&(o.envMap=e,o.envMapIntensity=o.name===C0?iC:nC),o.needsUpdate=!0}})}async function vC(s,e,t=new S(.8,.3,-.1)){const i=await new Ig().loadAsync(s),r=i.scene.getObjectByName(R0)??i.scene;r.name=R0,r.removeFromParent(),r.rotation.y=Math.PI,r.updateMatrix();const a=new ea(e),o=a.fromScene(mC(t),.04).texture;return a.dispose(),_C(r,o),new uC(r)}const xC="KeyC",MC={offset:[0,4.3,18.5],speedPull:4.5,speedReference:420,positionTau:.26,orientationTau:.38,maxLagAngle:.3,lookAhead:7,lookLift:1.3};function I0(s,e){return s>0?e>0?1-Math.exp(-e/s):0:1}function SC(s){return s<0?0:s>1?1:s}function yC(s,e){return s.offset[2]+s.speedPull*SC(e/s.speedReference)}function D0(s,e,t,n,i){return i.set(t.offset[0],t.offset[1],yC(t,n)),i.applyQuaternion(e),i.add(s)}function bC(s,e,t,n){return n.set(0,t.lookLift,-t.lookAhead),n.applyQuaternion(e),n.add(s)}const N0=new ye;function EC(s,e,t,n){return N0.lookAt(s,e,t),n.setFromRotationMatrix(N0)}function TC(s,e,t){return t?"cockpit":e?s==="cockpit"?"chase":"cockpit":s}const U0=new S,F0=new S,O0=new S;class wC{position=new S;rotation=new tt;lag=new tt;params;started=!1;constructor(e={}){this.params={...MC,...e}}get initialized(){return this.started}reset(e,t,n=0){this.lag.copy(t),D0(e,this.lag,this.params,n,this.position),this.aim(e,t),this.started=!0}step(e,t,n,i){if(!this.started){this.reset(t,n,i);return}this.lag.slerp(n,I0(this.params.orientationTau,e)),this.clampLag(n),D0(t,this.lag,this.params,i,U0),this.position.lerp(U0,I0(this.params.positionTau,e)),this.aim(t,n)}clampLag(e){const t=this.lag.angleTo(e);t>this.params.maxLagAngle&&this.lag.rotateTowards(e,t-this.params.maxLagAngle)}aim(e,t){bC(e,t,this.params,F0),O0.set(0,1,0).applyQuaternion(this.lag),EC(this.position,F0,O0,this.rotation)}}const k0=new ye,B0=new ye,z0=new ye,su=new ye,V0=new S(1,1,1);class AC{constructor(e,t){this.ship=e,this.camera=t}mode="cockpit";state=new wC;getMode(){return this.mode}get isChasing(){return this.mode==="chase"}update(e,t){const n=this.mode;return this.mode=TC(this.mode,t.toggle,t.walking),this.mode!=="chase"?this.mode:(n!=="chase"?this.state.reset(this.ship.position,this.ship.quaternion,t.speed):this.state.step(e,this.ship.position,this.ship.quaternion,t.speed),this.applyToCamera(),this.mode)}applyToCamera(){const e=this.ship.getSeatPilot();k0.compose(this.ship.position,this.ship.quaternion,this.ship.scale),B0.copy(this.ship.matrixWorld).invert().multiply(e.matrixWorld),z0.multiplyMatrices(k0,B0),su.compose(this.state.position,this.state.rotation,V0.set(1,1,1)),su.premultiply(z0.invert()),su.decompose(this.camera.position,this.camera.quaternion,V0),this.camera.scale.set(1,1,1)}}const RC={cleared:"LANDEFREIGABE",descending:"SINKFLUG",landed:"AUFGESETZT",ascending:"ABHEBEN"};class CC{root;line;progress;progressLabel;progressValue;progressFill;lastText="";lastValue="";constructor(e=document.body){this.root=document.createElement("div"),this.root.className="lndcomms",this.line=document.createElement("div"),this.line.className="lndcomms__line",this.line.hidden=!0,this.progress=document.createElement("div"),this.progress.className="lndcomms__progress",this.progress.hidden=!0;const t=document.createElement("div");t.className="lndcomms__progress-row",this.progressLabel=document.createElement("span"),this.progressValue=document.createElement("span"),t.append(this.progressLabel,this.progressValue);const n=document.createElement("div");n.className="lndcomms__progress-bar",this.progressFill=document.createElement("i"),n.append(this.progressFill),this.progress.append(t,n),this.root.append(this.line,this.progress),e.append(this.root)}showMessage(e,t){this.line.textContent=e,this.line.classList.toggle("is-bad",!t),this.line.hidden=!1,this.lastText=e}update(e){!e.showMessage&&!this.line.hidden?(this.line.hidden=!0,this.lastText=""):e.showMessage&&this.line.hidden&&this.lastText&&(this.line.hidden=!1);const t=RC[e.state];if(this.progress.hidden=t===void 0,t===void 0)return;this.progressLabel.textContent=t;const n=e.state==="cleared"?`${Math.round(e.altitude)} M · ${Math.round(e.speed)} M/S`:e.state==="landed"?"L — ABHEBEN":`${Math.round(e.progress*100)} %`;n!==this.lastValue&&(this.progressValue.textContent=n,this.lastValue=n);const i=e.state==="cleared"?0:e.state==="landed"?1:e.progress;this.progressFill.style.width=`${(i*100).toFixed(1)}%`}dispose(){this.root.remove()}}const PC=new S(0,0,1),LC={"in-range":new te(6744831),cleared:new te(16757575),descending:new te(16757575)},IC=16,DC=.03,NC=70;class UC extends Fe{ring;needle;orientation=new tt;pulse=0;constructor(){super(),this.name="LandingMarker",this.frustumCulled=!1,this.ring=new Me(new Id(.82,1,56),new Ot({transparent:!0,depthWrite:!1,toneMapped:!1})),this.ring.frustumCulled=!1,this.ring.renderOrder=4;const e=new xt;e.setAttribute("position",new at(new Float32Array([0,0,0,0,0,NC]),3)),this.needle=new Pd(e,new Ja({transparent:!0,depthWrite:!1,toneMapped:!1})),this.needle.frustumCulled=!1,this.needle.renderOrder=4,this.add(this.ring,this.needle),this.visible=!1}update(e,t,n,i,r){if(t==="hidden"){this.visible=!1;return}this.visible=!0,this.pulse+=e;const a=LC[t];this.orientation.setFromUnitVectors(PC,i),this.quaternion.copy(this.orientation),this.position.copy(n).addScaledVector(i,.6);const o=Math.max(IC,r*DC);this.ring.scale.set(o,o,1);const l=t==="descending"?5:2.2,c=.55+.45*Math.sin(this.pulse*l);this.ring.material.color.copy(a),this.ring.material.opacity=t==="in-range"?.45*c+.2:.55*c+.35,this.needle.material.color.copy(a),this.needle.material.opacity=this.ring.material.opacity*.6}dispose(){this.ring.geometry.dispose(),this.ring.material.dispose(),this.needle.geometry.dispose(),this.needle.material.dispose()}}const Ol=220,FC=3.2;class OC extends Fe{points;positions;velocities;ages;alive=0;constructor(){super(),this.name="LandingDust",this.frustumCulled=!1,this.positions=new Float32Array(Ol*3),this.velocities=new Float32Array(Ol*3),this.ages=new Float32Array(Ol);const e=new xt;e.setAttribute("position",new at(this.positions,3)),this.points=new ro(e,new mc({color:12562068,size:.9,sizeAttenuation:!0,transparent:!0,opacity:0,depthWrite:!1,blending:qt,toneMapped:!1})),this.points.frustumCulled=!1,this.add(this.points),this.visible=!1}burst(e=1){const t=Math.min(Math.max(e,.2),1);this.alive=Math.round(Ol*t);for(let n=0;n<this.alive;n++){const i=Math.random()*Math.PI*2,r=Math.random()*3.5;this.positions[n*3]=Math.cos(i)*r,this.positions[n*3+1]=-.4,this.positions[n*3+2]=Math.sin(i)*r;const a=(1.5+Math.random()*5.5)*t;this.velocities[n*3]=Math.cos(i)*a,this.velocities[n*3+1]=(.4+Math.random()*1.6)*t,this.velocities[n*3+2]=Math.sin(i)*a,this.ages[n]=Math.random()*.25}this.visible=this.alive>0,this.points.material.opacity=.85}update(e){if(this.alive===0)return;let t=0;for(let i=0;i<this.alive;i++){this.ages[i]+=e,t=Math.max(t,this.ages[i]);const r=1-.45*e;for(let a=0;a<3;a++)this.velocities[i*3+a]*=r,this.positions[i*3+a]+=this.velocities[i*3+a]*e}const n=Math.min(t/FC,1);this.points.material.opacity=.85*(1-n)*(1-n),this.points.geometry.attributes.position.needsUpdate=!0,n>=1&&(this.alive=0,this.visible=!1)}dispose(){this.points.geometry.dispose(),this.points.material.dispose()}}const ho={rangeIn:1400,rangeOut:1700,clearanceAltitude:700,clearanceExpire:1100,clearanceSpeed:90,clearanceHold:1.4,approachHold:220,minDescentDuration:6,maxDescentDuration:12,descentDurationPerMeter:1/70,liftoffDuration:5,liftoffHeight:260,hullHeight:1.9,landedYieldBonus:2.5};function kC(){return{hasTarget:!1,landable:!1,hasSurface:!1,altitude:1/0,speed:0,sizeName:""}}const BC="LANDEFREIGABE — SINKFLUG EINGELEITET";function zC(s,e=ho){return s.hasTarget?s.landable?s.hasSurface?s.altitude>e.clearanceAltitude?{granted:!1,reason:"range",message:`ZU WEIT (${Math.round(s.altitude)} M UEBER GRUND, MAX ${e.clearanceAltitude} M)`}:s.speed>e.clearanceSpeed?{granted:!1,reason:"speed",message:`ZU SCHNELL (${Math.round(s.speed)} M/S, MAX ${e.clearanceSpeed} M/S)`}:{granted:!0,message:BC}:{granted:!1,reason:"surface",message:"KEIN LANDEPLATZ — OBERFLAECHE UNKLAR"}:{granted:!1,reason:"landable",message:`KEIN LANDEPLATZ — ${s.sizeName?s.sizeName.toUpperCase():"BROCKEN"} ZU KLEIN`}:{granted:!1,reason:"target",message:"KEIN ZIEL ERFASST (T)"}}class VC{constructor(e=ho){this.params=e}currentState="far";hold=0;progressValue=0;durationValue=0;lastMessage="";get state(){return this.currentState}get progress(){return this.progressValue}get duration(){return this.durationValue}get message(){return this.lastMessage}get controlsShip(){const e=this.currentState;return e==="descending"||e==="landed"||e==="ascending"}get isLanded(){return this.currentState==="landed"}get holdsSite(){return this.controlsShip}update(e,t){switch(this.currentState){case"far":t.hasTarget&&t.landable&&t.altitude<this.params.rangeIn&&(this.currentState="in-range");break;case"in-range":(!t.hasTarget||!t.landable||t.altitude>this.params.rangeOut)&&(this.currentState="far");break;case"cleared":if(!t.hasTarget||!t.landable){this.currentState="far",this.lastMessage="LANDEFREIGABE VERFALLEN — ZIEL VERLOREN";break}if(t.altitude>this.params.clearanceExpire){this.currentState="in-range",this.lastMessage="LANDEFREIGABE VERFALLEN";break}this.hold-=e,this.hold<=0&&(this.currentState="descending",this.progressValue=0,this.durationValue=this.descentDurationFor(t.altitude),this.lastMessage="AUTOPILOT UEBERNIMMT");break;case"descending":this.progressValue=Math.min(this.progressValue+e/this.durationValue,1),this.progressValue>=1&&(this.currentState="landed",this.lastMessage="AUFGESETZT");break;case"landed":break;case"ascending":this.progressValue=Math.min(this.progressValue+e/this.durationValue,1),this.progressValue>=1&&(this.currentState="far",this.progressValue=0,this.durationValue=0,this.lastMessage="ABGEHOBEN — STEUERUNG FREI");break}return this.currentState}requestLanding(e){if(this.currentState==="cleared")return this.currentState="in-range",this.lastMessage="SINKFLUG ABGEBROCHEN",{granted:!1,reason:"state",message:this.lastMessage};if(this.currentState!=="far"&&this.currentState!=="in-range")return this.lastMessage="MANOEVER LAEUFT",{granted:!1,reason:"state",message:this.lastMessage};const t=zC(e,this.params);return this.lastMessage=t.message,t.granted&&(this.currentState="cleared",this.hold=this.params.clearanceHold),t}requestLiftoff(){return this.currentState!=="landed"?!1:(this.currentState="ascending",this.progressValue=0,this.durationValue=this.params.liftoffDuration,this.lastMessage="ABHEBEN",!0)}abort(e=""){this.currentState="far",this.progressValue=0,this.durationValue=0,this.hold=0,e&&(this.lastMessage=e)}descentDurationFor(e){const t=this.params,n=t.minDescentDuration+Math.max(e,0)*t.descentDurationPerMeter;return Math.min(Math.max(n,t.minDescentDuration),t.maxDescentDuration)}}const Cn=new S,Hi=new S,HC=new S,H0=new ye,GC=new S;function WC(s,e,t,n){return Cn.copy(s.normal).normalize(),n.position.copy(s.point).addScaledVector(Cn,t),Hi.set(0,0,-1).applyQuaternion(e),Hi.addScaledVector(Cn,-Hi.dot(Cn)),Hi.lengthSq()<1e-8&&(Hi.set(0,1,0).addScaledVector(Cn,-Cn.y),Hi.lengthSq()<1e-8&&Hi.set(1,0,0).addScaledVector(Cn,-Cn.x)),Hi.normalize(),Qg(Hi,Cn,n.quaternion),n}function XC(s,e,t,n,i,r=ho){const a=s.position.distanceTo(e.position),o=Math.min(r.approachHold,Math.max(a*.6,20)),l=e.position.clone().addScaledVector(Cn.copy(t).normalize(),o),c=.5*(a+s.position.distanceTo(l)+l.distanceTo(e.position)),h=c>.001?i*n/c:0;return{start:{position:s.position.clone(),quaternion:s.quaternion.clone()},control:l,end:{position:e.position.clone(),quaternion:e.quaternion.clone()},duration:n,entryRate:h,alignStart:0,alignEnd:.75}}function qC(s,e,t=ho){Cn.copy(e).normalize();const n=s.position.clone().addScaledVector(Cn,t.liftoffHeight);return{start:{position:s.position.clone(),quaternion:s.quaternion.clone()},control:s.position.clone().addScaledVector(Cn,t.liftoffHeight*.5),end:{position:n,quaternion:s.quaternion.clone()},duration:t.liftoffDuration,entryRate:0,alignStart:0,alignEnd:1}}function ru(s,e,t){const n=s;if(typeof n.getOrientation=="function")return n.getOrientation(e,t);const i=s;return typeof i.getMatrixAt=="function"?(i.getMatrixAt(e,H0),H0.decompose(HC,t,GC),t.normalize()):t.identity()}class $C{localPosition=new S;localQuaternion=new tt;inverse=new tt;captured=!1;get isSet(){return this.captured}capture(e,t,n,i){this.inverse.copy(t).invert(),this.localPosition.subVectors(n,e).applyQuaternion(this.inverse),this.localQuaternion.copy(this.inverse).multiply(i),this.captured=!0}apply(e,t,n,i){n.copy(this.localPosition).applyQuaternion(t).add(e),i.copy(t).multiply(this.localQuaternion)}clear(){this.captured=!1}}const KC="KeyL",zr=4.5,YC=.5,ZC=.22,Vr=new S,Hr=new tt,Vs=new S,Hs=new S,kl=new tt;class QC{machine;visuals=new Fe;ship;flight;field;input;getTargetIndex;isWalking;setCollisionExempt;onImpulse;params;comms=new CC;marker=new UC;dust=new OC;sample=kC();surface={point:new S,normal:new S};touchdown={position:new S,quaternion:new tt};anchor=new $C;path=null;holdDistance=0;site=-1;siteGeneration=-1;exempt=-1;previousState="far";messageTimer=0;hintText="";constructor(e){this.ship=e.ship,this.flight=e.flight,this.field=e.field,this.input=e.input,this.getTargetIndex=e.getTargetIndex,this.isWalking=e.isWalking??(()=>!1),this.setCollisionExempt=e.setCollisionExempt??(()=>{}),this.onImpulse=e.onImpulse??(()=>{}),this.params={...ho,...e.params},this.machine=new VC(this.params),this.visuals.name="Landing",this.visuals.add(this.marker,this.dust)}isLanded(){return this.machine.isLanded}getLandedIndex(){return this.machine.isLanded?this.site:-1}getYieldBonus(){return this.machine.isLanded?this.params.landedYieldBonus:1}get isAutopilot(){return this.machine.controlsShip}update(e){this.measure(),!this.isWalking()&&this.input.wasPressed(KC)&&this.handleKey();const t=this.machine.update(e,this.sample);t!==this.previousState&&(this.onStateChange(this.previousState,t),this.previousState=t),this.machine.holdsSite&&!this.siteIsValid()?(this.machine.abort(),this.previousState=this.machine.state,this.releaseShip("LANDEPLATZ VERLOREN — STEUERUNG FREI")):this.machine.controlsShip&&this.driveShip(),this.updateExemption(),this.messageTimer>0&&(this.messageTimer-=e),this.updateVisuals(e),this.updateDisplays()}shift(e){this.path&&Jg(this.path,e)}dispose(){this.comms.dispose(),this.marker.dispose(),this.dust.dispose()}measure(){const e=this.machine.holdsSite?this.site:this.getTargetIndex(),t=this.sample;if(t.hasTarget=e>=0&&e<this.field.count&&this.field.isAlive(e),!t.hasTarget){t.landable=!1,t.hasSurface=!1,t.altitude=1/0,t.sizeName="",t.speed=this.flight.getSpeed(),this.machine.holdsSite||(this.site=-1);return}this.machine.holdsSite||(this.site=e),t.landable=this.field.isLandable(e),t.sizeName=Xi[this.field.getSizeClass(e)].name,t.hasSurface=this.field.sampleSurface(e,this.ship.position,this.surface),t.altitude=t.hasSurface?this.ship.position.distanceTo(this.surface.point):1/0,t.speed=this.flight.getSpeed()}siteIsValid(){return this.site<0||this.site>=this.field.count||!this.field.isAlive(this.site)?!1:this.field.getGeneration(this.site)===this.siteGeneration}handleKey(){if(this.machine.state==="landed"){this.machine.requestLiftoff();return}const e=this.machine.requestLanding(this.sample);this.comms.showMessage(e.granted?e.message:`LANDEANFORDERUNG: ${e.message}`,e.granted),this.messageTimer=zr,this.hintText=""}onStateChange(e,t){t==="descending"?this.beginDescent():t==="landed"?this.onTouchdown():t==="ascending"?this.beginAscent():e==="ascending"?this.releaseShip():t==="in-range"&&e==="cleared"&&this.messageTimer<=0&&(this.comms.showMessage(`LANDEANFORDERUNG: ${this.machine.message}`,!1),this.messageTimer=zr)}beginDescent(){this.siteGeneration=this.field.getGeneration(this.site),this.field.sampleSurface(this.site,this.ship.position,this.surface),WC(this.surface,this.ship.quaternion,this.params.hullHeight,this.touchdown),this.field.getCenter(this.site,Vr),ru(this.field,this.site,Hr),this.anchor.capture(Vr,Hr,this.touchdown.position,this.touchdown.quaternion),this.path=XC({position:this.ship.position,quaternion:this.ship.quaternion},this.touchdown,this.surface.normal,this.machine.duration,this.flight.getSpeed(),this.params),this.holdDistance=this.path.control.distanceTo(this.touchdown.position),this.comms.showMessage("AUTOPILOT — SINKFLUG LAEUFT",!0),this.messageTimer=zr}onTouchdown(){this.path=null,this.dust.burst(1),this.onImpulse(YC),this.comms.showMessage("AUFGESETZT — L HEBT WIEDER AB",!0),this.messageTimer=zr}beginAscent(){Vs.set(0,1,0).applyQuaternion(this.ship.quaternion),this.path=qC({position:this.ship.position.clone(),quaternion:this.ship.quaternion.clone()},Vs,this.params),this.anchor.clear(),this.dust.burst(.55),this.onImpulse(ZC),this.comms.showMessage("ABHEBEN — LANDESTUETZEN EINGEFAHREN",!0),this.messageTimer=zr}releaseShip(e="STEUERUNG FREI"){this.path=null,this.anchor.clear(),this.site=-1,this.siteGeneration=-1,this.flight.velocity.set(0,0,0),this.flight.angularVelocity.set(0,0,0),this.flight.setSetSpeed(0),this.flight.cancelFullStop(),this.flight.clearInputs(),this.comms.showMessage(e,!0),this.messageTimer=zr}driveShip(){const e=this.machine.state;if(e==="landed")this.field.getCenter(this.site,Vr),ru(this.field,this.site,Hr),this.anchor.apply(Vr,Hr,Hs,kl);else if(this.path&&e==="descending")this.field.getCenter(this.site,Vr),ru(this.field,this.site,Hr),this.anchor.apply(Vr,Hr,this.touchdown.position,this.touchdown.quaternion),Vs.set(0,1,0).applyQuaternion(this.touchdown.quaternion),this.path.end.position.copy(this.touchdown.position),this.path.end.quaternion.copy(this.touchdown.quaternion),this.path.control.copy(this.touchdown.position).addScaledVector(Vs,this.holdDistance),id(this.path,this.machine.progress,Hs,kl);else if(this.path)id(this.path,this.machine.progress,Hs,kl);else return;this.ship.position.copy(Hs),this.ship.quaternion.copy(kl),this.flight.velocity.set(0,0,0),this.flight.angularVelocity.set(0,0,0),this.flight.setSetSpeed(0),this.flight.cancelFullStop(),this.flight.clearInputs()}updateExemption(){const e=this.machine.holdsSite?this.site:-1;e!==this.exempt&&(this.exempt=e,this.setCollisionExempt(e))}updateVisuals(e){const t=this.machine.state,n=t==="in-range"?"in-range":t==="cleared"?"cleared":t==="descending"?"descending":"hidden";n==="descending"?(Vs.set(0,1,0).applyQuaternion(this.touchdown.quaternion),Hs.copy(this.touchdown.position).addScaledVector(Vs,-this.params.hullHeight),this.marker.update(e,n,Hs,Vs,this.ship.position.distanceTo(Hs))):n!=="hidden"&&this.sample.hasSurface?this.marker.update(e,n,this.surface.point,this.surface.normal,this.sample.altitude):this.marker.update(e,"hidden",this.surface.point,this.surface.normal,0),this.anchor.isSet&&(this.dust.position.copy(this.ship.position),this.dust.quaternion.copy(this.ship.quaternion)),this.dust.update(e)}updateDisplays(){const e=this.machine.state,t=e==="in-range"&&this.messageTimer<=0&&!this.isWalking();if(t){const i=`L — LANDEN · ${Math.round(this.sample.altitude/10)*10} M UEBER GRUND`;i!==this.hintText&&(this.comms.showMessage(i,!0),this.hintText=i)}else this.hintText&&(this.hintText="");this.comms.update({state:e,progress:this.machine.progress,altitude:Number.isFinite(this.sample.altitude)?this.sample.altitude:0,speed:this.sample.speed,showMessage:this.messageTimer>0||t})}}const t_=document.getElementById("app");if(!t_)throw new Error("#app fehlt in index.html");const Lt=new vb({antialias:!1,powerPreference:"high-performance"});Lt.setPixelRatio(Math.min(window.devicePixelRatio,2));Lt.setSize(window.innerWidth,window.innerHeight);Lt.toneMapping=uc;Lt.toneMappingExposure=1;Lt.shadowMap.enabled=!0;Lt.shadowMap.type=Ha;Lt.shadowMap.autoUpdate=!1;t_.appendChild(Lt.domElement);const Ai=new fc,Mn=new ln(65,window.innerWidth/window.innerHeight,.05,3e3);Mn.rotation.order="YXZ";Mn.layers.set(0);const Pn=new ln(65,window.innerWidth/window.innerHeight,1,3e4);Pn.layers.set(ar);Ai.add(Pn);const Ss=new ln(65,window.innerWidth/window.innerHeight,5e3,5e6);Ss.layers.set(Yg);Ai.add(Ss);const yc=jA(Lt,Ai,Mn,Pn,Ss),ti=new yE(new S(.8,.3,-.1).normalize()),uo=new SE(6500);uo.setPixelRatio(Lt.getPixelRatio());const fo=new ME({radius:22e4,position:new S(-.34,-.13,-.93).normalize().multiplyScalar(85e4),seed:12,sunDirection:ti.direction}),Xt=new oE;Xt.setLayer(ar);const n_=_E(Lt,{sunDirection:ti.direction,planetDirection:fo.position.clone().normalize(),planetAngularRadius:Math.asin(220/850)*180/Math.PI});Xt.setEnvironment(n_);const ha=new fE;ha.setViewportHeight(window.innerHeight,Pn.fov);const rt=new wE,ws=new bw,bi=new Rw(Xt,ws),ys=new Dw,Es=new Uw(Xt,ws),io=new Ow,Gd=new Gw,Wd=new oA,Xd=new LA;rt.add(Xd.group);Ai.add(uo,ti,fo,Xt,ha,rt,bi.mesh,ws);for(const s of[Xt,ha,bi.mesh,ws])s.traverse(e=>e.layers.set(ar));for(const s of[uo,ti,fo])s.traverse(e=>e.layers.set(Yg));ti.light.layers.enableAll();rt.getSeatPilot().add(Mn);const an=new xb(Lt.domElement);Lt.domElement.addEventListener("mousedown",()=>an.requestPointerLock());const $t=new CE(rt),bc=new ew(an,$t),qd=new xw,Ec=new lw(an,rt),Tc=new Vg,$d=k2({ship:rt,walk:Ec,flight:$t,renderer:Lt,interactables:Tc}),bs=new V2({field:Xt,hold:$d.hold,lineOfSight:z2(Xt),getYieldBonus:()=>ua.getYieldBonus()}),po=new j2(ws);Ai.add(po);po.traverse(s=>s.layers.set(ar));const mo=new dR;mo.placeAt(new S(.36,.1,-.93).normalize().multiplyScalar(13400),24);Ai.add(mo);mo.setLayer(ar);const i_=PR({hold:$d.hold,getHull:()=>Es.integrity,setHull:s=>{Es.integrity=s}}),Kd=new wR({ship:rt,flight:$t,station:mo,input:an,trade:i_}),JC=new AC(rt,Mn);let ad=null;vC("./models/ship-exterior.glb",Lt,ti.direction).then(s=>{ad=s,rt.add(s),console.info("Aussenrumpf geladen — C schaltet die Aussenansicht um")}).catch(s=>{console.warn("Aussenrumpf-GLB nicht geladen, Aussenansicht bleibt aus:",s)});let od=!1;function jC(s){od=JC.update(s,{walking:yn.isWalking,speed:$t.getSpeed(),toggle:an.wasPressed(xC)})==="chase",ad?.setVisible(od),ad?.update(s,$t)}const wc=new d2({flight:$t,weapons:bi,targeting:ys,interactables:Tc}),yn=new mw({input:an,ship:rt,camera:Mn,seated:bc,walk:Ec,hud:qd,interactables:Tc}),ua=new QC({ship:rt,flight:$t,field:Xt,input:an,getTargetIndex:()=>ys.getIndex(),isWalking:()=>yn.isWalking,setCollisionExempt:s=>Es.setExemptIndex(s),onImpulse:s=>io.add(s)});Ai.add(ua.visuals);ua.visuals.traverse(s=>s.layers.set(ar));const s_=new ea(Lt),eP=s_.fromScene(ZT(),.02).texture;s_.dispose();YT("./models/ship-interior.glb",eP).then(s=>{rt.setInterior(s),Gd.attachTo(s),Wd.attachTo(s),wc.attachInterior(s),yn.refreshInterior(),Yd=!0,console.info(`Innenraum geladen: ${rt.getCollisionMeshes().length} COL_-Meshes`)}).catch(s=>{console.warn("Innenraum-GLB nicht geladen, Placeholder bleibt aktiv:",s)});let Yd=!1;const G0=new S;function tP(){Yd=!1;const s=rt.getInterior();$T(s),Lt.shadowMap.needsUpdate=!0,G0.set(0,1.5,0).applyMatrix4(rt.matrixWorld),KT(s,JT(Lt,Ai,G0))}const W0=1e4,mi=new S;function nP(){rt.position.lengthSq()<W0*W0||(mi.copy(rt.position),rt.position.set(0,0,0),fo.position.sub(mi),Xt.position.sub(mi),bi.shift(mi),ws.shift(mi),Es.shift(mi),bs.shift(mi),po.shift(mi),Kd.shift(mi),ua.shift(mi))}const iP=2500,sP=.2;let au=0;const X0=new S,q0=new tt,$0=new S;function rP(s){q0.copy(Pn.quaternion).invert(),X0.copy(ti.direction).applyQuaternion(q0),Xt.setSunViewDirection(X0);const e=Xt.findShadowFocus(rt.position,iP);if(e<0){ti.clearShadow();return}Xt.getCenter(e,$0),ti.focusShadow($0,Xt.getRadius(e)),au-=s,!(au>0)&&(au=sP,yc.requestShadowUpdate())}const Bl=new Sb,zl=new S,aP=new S,Vl=new S;function oP(s){$t.update(s),yn.fixedUpdate(s),bi.update(s,rt,$t.velocity);const e=Es.update(s,rt,$t.velocity);e&&io.add(.25+e.damage*3),wc.fixedUpdate(s,e),nP()}function lP(s){Xt.update(s),fo.update(s),Kd.update(s),ua.update(s);const e=ys.update(Xt,rt.position,$t.velocity,bi.getParams().boltSpeed);bs.update(s,ys.getIndex(),rt.position),ws.update(s),Gd.update(s,{origin:rt.position,orientation:rt.quaternion,asteroids:Xt,targetIndex:ys.getIndex()}),yn.updateCamera(),jC(s),io.update(s),io.applyTo(Mn),Ai.updateMatrixWorld(),Mn.matrixWorld.decompose(Pn.position,Pn.quaternion,aP),Pn.updateMatrixWorld(),Ss.position.copy(Pn.position),Ss.quaternion.copy(Pn.quaternion),Ss.updateMatrixWorld(),po.update(s,bs.getStatus(),rt),Mn.getWorldPosition(zl),uo.update(zl),ti.update(zl),rP(s),ha.update(zl);const t={camera:Mn,position:rt.position,orientation:rt.quaternion,velocity:$t.velocity,speed:$t.getSpeed(),setSpeed:$t.setSpeed,maxSetSpeed:$t.getParams().maxSetSpeed,mode:$t.mode,fullStop:$t.fullStop,afterburner:$t.inputs.afterburner,walking:yn.isWalking,external:od,pointerLocked:an.pointerLocked,mouseOffset:bc.getMouseOffset(),kills:bi.kills,sinceHit:bi.getTimeSinceHit(),target:e,hull:Es.integrity,sinceImpact:Es.sinceImpact,mining:bs.getStatus()};Wd.update(s,t),Xd.update(t),yc.render(),Yd&&tP(),qd.update(t)}Lt.setAnimationLoop(()=>{if(bc.update(Bl.frameDelta),yn.update(Bl.frameDelta),!yn.isWalking&&an.wasPressed("KeyT")&&(Vl.set(0,0,-1).applyQuaternion(rt.quaternion),ys.cycle(Xt,rt.position,Vl)),!yn.isWalking&&an.wasMousePressed(2)){Vl.set(0,0,-1).applyQuaternion(rt.quaternion);const e=ys.acquire(Xt,rt.position,Vl);e>=0&&bs.beginScan(e)}!yn.isWalking&&an.wasPressed("KeyR")&&bs.requestScan(),bs.setBeam(!yn.isWalking&&an.isDown("KeyM")),bi.setTrigger(!yn.isWalking&&an.pointerLocked&&(an.isMouseDown(0)||an.isDown("Space"))),wc.update(Bl.frameDelta,yn.isWalking?Ec.position:null);const s=Bl.tick(oP);lP(s),an.endFrame()});window.addEventListener("resize",()=>{Mn.aspect=window.innerWidth/window.innerHeight,Mn.updateProjectionMatrix(),Pn.aspect=Mn.aspect,Pn.updateProjectionMatrix(),Ss.aspect=Mn.aspect,Ss.updateProjectionMatrix(),Lt.setPixelRatio(Math.min(window.devicePixelRatio,2)),Lt.setSize(window.innerWidth,window.innerHeight),yc.setSize(window.innerWidth,window.innerHeight),uo.setPixelRatio(Lt.getPixelRatio()),ha.setViewportHeight(window.innerHeight,Pn.fov)});Object.assign(window,{__privateer:{ship:rt,flight:$t,seated:bc,walk:Ec,player:yn,hud:qd,camera:Mn,input:an,scene:Ai,weapons:bi,effects:ws,asteroids:Xt,targeting:ys,hull:Es,shake:io,radar:Gd,post:yc,renderer:Lt,displays:Wd,glass:Xd,cargo:$d,station:mo,docking:Kd,trade:i_,damage:wc,interactables:Tc,mining:bs,miningBeam:po,landing:ua,dust:ha,sun:ti,spaceEnvironment:n_}});
//# sourceMappingURL=index-DVFu3NpF.js.map
