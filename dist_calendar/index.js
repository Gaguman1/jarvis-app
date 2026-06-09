/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 742:
/***/ ((module) => {

"use strict";
class JSBI extends Array{constructor(i,_){if(super(i),this.sign=_,Object.setPrototypeOf(this,JSBI.prototype),i>JSBI.__kMaxLength)throw new RangeError("Maximum BigInt size exceeded")}static BigInt(i){var _=Math.floor,t=Number.isFinite;if("number"==typeof i){if(0===i)return JSBI.__zero();if(JSBI.__isOneDigitInt(i))return 0>i?JSBI.__oneDigit(-i,!0):JSBI.__oneDigit(i,!1);if(!t(i)||_(i)!==i)throw new RangeError("The number "+i+" cannot be converted to BigInt because it is not an integer");return JSBI.__fromDouble(i)}if("string"==typeof i){const _=JSBI.__fromString(i);if(null===_)throw new SyntaxError("Cannot convert "+i+" to a BigInt");return _}if("boolean"==typeof i)return!0===i?JSBI.__oneDigit(1,!1):JSBI.__zero();if("object"==typeof i){if(i.constructor===JSBI)return i;const _=JSBI.__toPrimitive(i);return JSBI.BigInt(_)}throw new TypeError("Cannot convert "+i+" to a BigInt")}toDebugString(){const i=["BigInt["];for(const _ of this)i.push((_?(_>>>0).toString(16):_)+", ");return i.push("]"),i.join("")}toString(i=10){if(2>i||36<i)throw new RangeError("toString() radix argument must be between 2 and 36");return 0===this.length?"0":0==(i&i-1)?JSBI.__toStringBasePowerOfTwo(this,i):JSBI.__toStringGeneric(this,i,!1)}valueOf(){throw new Error("Convert JSBI instances to native numbers using `toNumber`.")}static toNumber(i){const _=i.length;if(0===_)return 0;if(1===_){const _=i.__unsignedDigit(0);return i.sign?-_:_}const t=i.__digit(_-1),e=JSBI.__clz30(t),n=30*_-e;if(1024<n)return i.sign?-Infinity:1/0;let g=n-1,o=t,s=_-1;const l=e+3;let r=32===l?0:o<<l;r>>>=12;const a=l-12;let u=12<=l?0:o<<20+l,d=20+l;for(0<a&&0<s&&(s--,o=i.__digit(s),r|=o>>>30-a,u=o<<a+2,d=a+2);0<d&&0<s;)s--,o=i.__digit(s),u|=30<=d?o<<d-30:o>>>30-d,d-=30;const h=JSBI.__decideRounding(i,d,s,o);if((1===h||0===h&&1==(1&u))&&(u=u+1>>>0,0===u&&(r++,0!=r>>>20&&(r=0,g++,1023<g))))return i.sign?-Infinity:1/0;const m=i.sign?-2147483648:0;return g=g+1023<<20,JSBI.__kBitConversionInts[JSBI.__kBitConversionIntHigh]=m|g|r,JSBI.__kBitConversionInts[JSBI.__kBitConversionIntLow]=u,JSBI.__kBitConversionDouble[0]}static unaryMinus(i){if(0===i.length)return i;const _=i.__copy();return _.sign=!i.sign,_}static bitwiseNot(i){return i.sign?JSBI.__absoluteSubOne(i).__trim():JSBI.__absoluteAddOne(i,!0)}static exponentiate(i,_){if(_.sign)throw new RangeError("Exponent must be positive");if(0===_.length)return JSBI.__oneDigit(1,!1);if(0===i.length)return i;if(1===i.length&&1===i.__digit(0))return i.sign&&0==(1&_.__digit(0))?JSBI.unaryMinus(i):i;if(1<_.length)throw new RangeError("BigInt too big");let t=_.__unsignedDigit(0);if(1===t)return i;if(t>=JSBI.__kMaxLengthBits)throw new RangeError("BigInt too big");if(1===i.length&&2===i.__digit(0)){const _=1+(0|t/30),e=i.sign&&0!=(1&t),n=new JSBI(_,e);n.__initializeDigits();const g=1<<t%30;return n.__setDigit(_-1,g),n}let e=null,n=i;for(0!=(1&t)&&(e=i),t>>=1;0!==t;t>>=1)n=JSBI.multiply(n,n),0!=(1&t)&&(null===e?e=n:e=JSBI.multiply(e,n));return e}static multiply(_,t){if(0===_.length)return _;if(0===t.length)return t;let i=_.length+t.length;30<=_.__clzmsd()+t.__clzmsd()&&i--;const e=new JSBI(i,_.sign!==t.sign);e.__initializeDigits();for(let n=0;n<_.length;n++)JSBI.__multiplyAccumulate(t,_.__digit(n),e,n);return e.__trim()}static divide(i,_){if(0===_.length)throw new RangeError("Division by zero");if(0>JSBI.__absoluteCompare(i,_))return JSBI.__zero();const t=i.sign!==_.sign,e=_.__unsignedDigit(0);let n;if(1===_.length&&32767>=e){if(1===e)return t===i.sign?i:JSBI.unaryMinus(i);n=JSBI.__absoluteDivSmall(i,e,null)}else n=JSBI.__absoluteDivLarge(i,_,!0,!1);return n.sign=t,n.__trim()}static remainder(i,_){if(0===_.length)throw new RangeError("Division by zero");if(0>JSBI.__absoluteCompare(i,_))return i;const t=_.__unsignedDigit(0);if(1===_.length&&32767>=t){if(1===t)return JSBI.__zero();const _=JSBI.__absoluteModSmall(i,t);return 0===_?JSBI.__zero():JSBI.__oneDigit(_,i.sign)}const e=JSBI.__absoluteDivLarge(i,_,!1,!0);return e.sign=i.sign,e.__trim()}static add(i,_){const t=i.sign;return t===_.sign?JSBI.__absoluteAdd(i,_,t):0<=JSBI.__absoluteCompare(i,_)?JSBI.__absoluteSub(i,_,t):JSBI.__absoluteSub(_,i,!t)}static subtract(i,_){const t=i.sign;return t===_.sign?0<=JSBI.__absoluteCompare(i,_)?JSBI.__absoluteSub(i,_,t):JSBI.__absoluteSub(_,i,!t):JSBI.__absoluteAdd(i,_,t)}static leftShift(i,_){return 0===_.length||0===i.length?i:_.sign?JSBI.__rightShiftByAbsolute(i,_):JSBI.__leftShiftByAbsolute(i,_)}static signedRightShift(i,_){return 0===_.length||0===i.length?i:_.sign?JSBI.__leftShiftByAbsolute(i,_):JSBI.__rightShiftByAbsolute(i,_)}static unsignedRightShift(){throw new TypeError("BigInts have no unsigned right shift; use >> instead")}static lessThan(i,_){return 0>JSBI.__compareToBigInt(i,_)}static lessThanOrEqual(i,_){return 0>=JSBI.__compareToBigInt(i,_)}static greaterThan(i,_){return 0<JSBI.__compareToBigInt(i,_)}static greaterThanOrEqual(i,_){return 0<=JSBI.__compareToBigInt(i,_)}static equal(_,t){if(_.sign!==t.sign)return!1;if(_.length!==t.length)return!1;for(let e=0;e<_.length;e++)if(_.__digit(e)!==t.__digit(e))return!1;return!0}static notEqual(i,_){return!JSBI.equal(i,_)}static bitwiseAnd(i,_){var t=Math.max;if(!i.sign&&!_.sign)return JSBI.__absoluteAnd(i,_).__trim();if(i.sign&&_.sign){const e=t(i.length,_.length)+1;let n=JSBI.__absoluteSubOne(i,e);const g=JSBI.__absoluteSubOne(_);return n=JSBI.__absoluteOr(n,g,n),JSBI.__absoluteAddOne(n,!0,n).__trim()}return i.sign&&([i,_]=[_,i]),JSBI.__absoluteAndNot(i,JSBI.__absoluteSubOne(_)).__trim()}static bitwiseXor(i,_){var t=Math.max;if(!i.sign&&!_.sign)return JSBI.__absoluteXor(i,_).__trim();if(i.sign&&_.sign){const e=t(i.length,_.length),n=JSBI.__absoluteSubOne(i,e),g=JSBI.__absoluteSubOne(_);return JSBI.__absoluteXor(n,g,n).__trim()}const e=t(i.length,_.length)+1;i.sign&&([i,_]=[_,i]);let n=JSBI.__absoluteSubOne(_,e);return n=JSBI.__absoluteXor(n,i,n),JSBI.__absoluteAddOne(n,!0,n).__trim()}static bitwiseOr(i,_){var t=Math.max;const e=t(i.length,_.length);if(!i.sign&&!_.sign)return JSBI.__absoluteOr(i,_).__trim();if(i.sign&&_.sign){let t=JSBI.__absoluteSubOne(i,e);const n=JSBI.__absoluteSubOne(_);return t=JSBI.__absoluteAnd(t,n,t),JSBI.__absoluteAddOne(t,!0,t).__trim()}i.sign&&([i,_]=[_,i]);let n=JSBI.__absoluteSubOne(_,e);return n=JSBI.__absoluteAndNot(n,i,n),JSBI.__absoluteAddOne(n,!0,n).__trim()}static asIntN(_,t){var i=Math.floor;if(0===t.length)return t;if(_=i(_),0>_)throw new RangeError("Invalid value: not (convertible to) a safe integer");if(0===_)return JSBI.__zero();if(_>=JSBI.__kMaxLengthBits)return t;const e=0|(_+29)/30;if(t.length<e)return t;const g=t.__unsignedDigit(e-1),o=1<<(_-1)%30;if(t.length===e&&g<o)return t;if(!((g&o)===o))return JSBI.__truncateToNBits(_,t);if(!t.sign)return JSBI.__truncateAndSubFromPowerOfTwo(_,t,!0);if(0==(g&o-1)){for(let n=e-2;0<=n;n--)if(0!==t.__digit(n))return JSBI.__truncateAndSubFromPowerOfTwo(_,t,!1);return t.length===e&&g===o?t:JSBI.__truncateToNBits(_,t)}return JSBI.__truncateAndSubFromPowerOfTwo(_,t,!1)}static asUintN(i,_){var t=Math.floor;if(0===_.length)return _;if(i=t(i),0>i)throw new RangeError("Invalid value: not (convertible to) a safe integer");if(0===i)return JSBI.__zero();if(_.sign){if(i>JSBI.__kMaxLengthBits)throw new RangeError("BigInt too big");return JSBI.__truncateAndSubFromPowerOfTwo(i,_,!1)}if(i>=JSBI.__kMaxLengthBits)return _;const e=0|(i+29)/30;if(_.length<e)return _;const g=i%30;if(_.length==e){if(0===g)return _;const i=_.__digit(e-1);if(0==i>>>g)return _}return JSBI.__truncateToNBits(i,_)}static ADD(i,_){if(i=JSBI.__toPrimitive(i),_=JSBI.__toPrimitive(_),"string"==typeof i)return"string"!=typeof _&&(_=_.toString()),i+_;if("string"==typeof _)return i.toString()+_;if(i=JSBI.__toNumeric(i),_=JSBI.__toNumeric(_),JSBI.__isBigInt(i)&&JSBI.__isBigInt(_))return JSBI.add(i,_);if("number"==typeof i&&"number"==typeof _)return i+_;throw new TypeError("Cannot mix BigInt and other types, use explicit conversions")}static LT(i,_){return JSBI.__compare(i,_,0)}static LE(i,_){return JSBI.__compare(i,_,1)}static GT(i,_){return JSBI.__compare(i,_,2)}static GE(i,_){return JSBI.__compare(i,_,3)}static EQ(i,_){for(;;){if(JSBI.__isBigInt(i))return JSBI.__isBigInt(_)?JSBI.equal(i,_):JSBI.EQ(_,i);if("number"==typeof i){if(JSBI.__isBigInt(_))return JSBI.__equalToNumber(_,i);if("object"!=typeof _)return i==_;_=JSBI.__toPrimitive(_)}else if("string"==typeof i){if(JSBI.__isBigInt(_))return i=JSBI.__fromString(i),null!==i&&JSBI.equal(i,_);if("object"!=typeof _)return i==_;_=JSBI.__toPrimitive(_)}else if("boolean"==typeof i){if(JSBI.__isBigInt(_))return JSBI.__equalToNumber(_,+i);if("object"!=typeof _)return i==_;_=JSBI.__toPrimitive(_)}else if("symbol"==typeof i){if(JSBI.__isBigInt(_))return!1;if("object"!=typeof _)return i==_;_=JSBI.__toPrimitive(_)}else if("object"==typeof i){if("object"==typeof _&&_.constructor!==JSBI)return i==_;i=JSBI.__toPrimitive(i)}else return i==_}}static NE(i,_){return!JSBI.EQ(i,_)}static DataViewGetBigInt64(i,_,t=!1){return JSBI.asIntN(64,JSBI.DataViewGetBigUint64(i,_,t))}static DataViewGetBigUint64(i,_,t=!1){const[e,n]=t?[4,0]:[0,4],g=i.getUint32(_+e,t),o=i.getUint32(_+n,t),s=new JSBI(3,!1);return s.__setDigit(0,1073741823&o),s.__setDigit(1,(268435455&g)<<2|o>>>30),s.__setDigit(2,g>>>28),s.__trim()}static DataViewSetBigInt64(i,_,t,e=!1){JSBI.DataViewSetBigUint64(i,_,t,e)}static DataViewSetBigUint64(i,_,t,e=!1){t=JSBI.asUintN(64,t);let n=0,g=0;if(0<t.length&&(g=t.__digit(0),1<t.length)){const i=t.__digit(1);g|=i<<30,n=i>>>2,2<t.length&&(n|=t.__digit(2)<<28)}const[o,s]=e?[4,0]:[0,4];i.setUint32(_+o,n,e),i.setUint32(_+s,g,e)}static __zero(){return new JSBI(0,!1)}static __oneDigit(i,_){const t=new JSBI(1,_);return t.__setDigit(0,i),t}__copy(){const _=new JSBI(this.length,this.sign);for(let t=0;t<this.length;t++)_[t]=this[t];return _}__trim(){let i=this.length,_=this[i-1];for(;0===_;)i--,_=this[i-1],this.pop();return 0===i&&(this.sign=!1),this}__initializeDigits(){for(let _=0;_<this.length;_++)this[_]=0}static __decideRounding(i,_,t,e){if(0<_)return-1;let n;if(0>_)n=-_-1;else{if(0===t)return-1;t--,e=i.__digit(t),n=29}let g=1<<n;if(0==(e&g))return-1;if(g-=1,0!=(e&g))return 1;for(;0<t;)if(t--,0!==i.__digit(t))return 1;return 0}static __fromDouble(i){JSBI.__kBitConversionDouble[0]=i;const _=2047&JSBI.__kBitConversionInts[JSBI.__kBitConversionIntHigh]>>>20,t=_-1023,e=(0|t/30)+1,n=new JSBI(e,0>i);let g=1048575&JSBI.__kBitConversionInts[JSBI.__kBitConversionIntHigh]|1048576,o=JSBI.__kBitConversionInts[JSBI.__kBitConversionIntLow];const s=20,l=t%30;let r,a=0;if(l<20){const i=s-l;a=i+32,r=g>>>i,g=g<<32-i|o>>>i,o<<=32-i}else if(l===20)a=32,r=g,g=o,o=0;else{const i=l-s;a=32-i,r=g<<i|o>>>32-i,g=o<<i,o=0}n.__setDigit(e-1,r);for(let _=e-2;0<=_;_--)0<a?(a-=30,r=g>>>2,g=g<<30|o>>>2,o<<=30):r=0,n.__setDigit(_,r);return n.__trim()}static __isWhitespace(i){return!!(13>=i&&9<=i)||(159>=i?32==i:131071>=i?160==i||5760==i:196607>=i?(i&=131071,10>=i||40==i||41==i||47==i||95==i||4096==i):65279==i)}static __fromString(i,_=0){let t=0;const e=i.length;let n=0;if(n===e)return JSBI.__zero();let g=i.charCodeAt(n);for(;JSBI.__isWhitespace(g);){if(++n===e)return JSBI.__zero();g=i.charCodeAt(n)}if(43===g){if(++n===e)return null;g=i.charCodeAt(n),t=1}else if(45===g){if(++n===e)return null;g=i.charCodeAt(n),t=-1}if(0===_){if(_=10,48===g){if(++n===e)return JSBI.__zero();if(g=i.charCodeAt(n),88===g||120===g){if(_=16,++n===e)return null;g=i.charCodeAt(n)}else if(79===g||111===g){if(_=8,++n===e)return null;g=i.charCodeAt(n)}else if(66===g||98===g){if(_=2,++n===e)return null;g=i.charCodeAt(n)}}}else if(16===_&&48===g){if(++n===e)return JSBI.__zero();if(g=i.charCodeAt(n),88===g||120===g){if(++n===e)return null;g=i.charCodeAt(n)}}if(0!=t&&10!==_)return null;for(;48===g;){if(++n===e)return JSBI.__zero();g=i.charCodeAt(n)}const o=e-n;let s=JSBI.__kMaxBitsPerChar[_],l=JSBI.__kBitsPerCharTableMultiplier-1;if(o>1073741824/s)return null;const r=s*o+l>>>JSBI.__kBitsPerCharTableShift,a=new JSBI(0|(r+29)/30,!1),u=10>_?_:10,h=10<_?_-10:0;if(0==(_&_-1)){s>>=JSBI.__kBitsPerCharTableShift;const _=[],t=[];let o=!1;do{let l=0,r=0;for(;;){let _;if(g-48>>>0<u)_=g-48;else if((32|g)-97>>>0<h)_=(32|g)-87;else{o=!0;break}if(r+=s,l=l<<s|_,++n===e){o=!0;break}if(g=i.charCodeAt(n),30<r+s)break}_.push(l),t.push(r)}while(!o);JSBI.__fillFromParts(a,_,t)}else{a.__initializeDigits();let t=!1,o=0;do{let r=0,b=1;for(;;){let s;if(g-48>>>0<u)s=g-48;else if((32|g)-97>>>0<h)s=(32|g)-87;else{t=!0;break}const l=b*_;if(1073741823<l)break;if(b=l,r=r*_+s,o++,++n===e){t=!0;break}g=i.charCodeAt(n)}l=30*JSBI.__kBitsPerCharTableMultiplier-1;const D=0|(s*o+l>>>JSBI.__kBitsPerCharTableShift)/30;a.__inplaceMultiplyAdd(b,r,D)}while(!t)}if(n!==e){if(!JSBI.__isWhitespace(g))return null;for(n++;n<e;n++)if(g=i.charCodeAt(n),!JSBI.__isWhitespace(g))return null}return a.sign=-1==t,a.__trim()}static __fillFromParts(_,t,e){let n=0,g=0,o=0;for(let s=t.length-1;0<=s;s--){const i=t[s],l=e[s];g|=i<<o,o+=l,30===o?(_.__setDigit(n++,g),o=0,g=0):30<o&&(_.__setDigit(n++,1073741823&g),o-=30,g=i>>>l-o)}if(0!==g){if(n>=_.length)throw new Error("implementation bug");_.__setDigit(n++,g)}for(;n<_.length;n++)_.__setDigit(n,0)}static __toStringBasePowerOfTwo(_,i){const t=_.length;let e=i-1;e=(85&e>>>1)+(85&e),e=(51&e>>>2)+(51&e),e=(15&e>>>4)+(15&e);const n=e,g=i-1,o=_.__digit(t-1),s=JSBI.__clz30(o);let l=0|(30*t-s+n-1)/n;if(_.sign&&l++,268435456<l)throw new Error("string too long");const r=Array(l);let a=l-1,u=0,d=0;for(let e=0;e<t-1;e++){const i=_.__digit(e),t=(u|i<<d)&g;r[a--]=JSBI.__kConversionChars[t];const o=n-d;for(u=i>>>o,d=30-o;d>=n;)r[a--]=JSBI.__kConversionChars[u&g],u>>>=n,d-=n}const h=(u|o<<d)&g;for(r[a--]=JSBI.__kConversionChars[h],u=o>>>n-d;0!==u;)r[a--]=JSBI.__kConversionChars[u&g],u>>>=n;if(_.sign&&(r[a--]="-"),-1!=a)throw new Error("implementation bug");return r.join("")}static __toStringGeneric(_,i,t){const e=_.length;if(0===e)return"";if(1===e){let e=_.__unsignedDigit(0).toString(i);return!1===t&&_.sign&&(e="-"+e),e}const n=30*e-JSBI.__clz30(_.__digit(e-1)),g=JSBI.__kMaxBitsPerChar[i],o=g-1;let s=n*JSBI.__kBitsPerCharTableMultiplier;s+=o-1,s=0|s/o;const l=s+1>>1,r=JSBI.exponentiate(JSBI.__oneDigit(i,!1),JSBI.__oneDigit(l,!1));let a,u;const d=r.__unsignedDigit(0);if(1===r.length&&32767>=d){a=new JSBI(_.length,!1),a.__initializeDigits();let t=0;for(let e=2*_.length-1;0<=e;e--){const i=t<<15|_.__halfDigit(e);a.__setHalfDigit(e,0|i/d),t=0|i%d}u=t.toString(i)}else{const t=JSBI.__absoluteDivLarge(_,r,!0,!0);a=t.quotient;const e=t.remainder.__trim();u=JSBI.__toStringGeneric(e,i,!0)}a.__trim();let h=JSBI.__toStringGeneric(a,i,!0);for(;u.length<l;)u="0"+u;return!1===t&&_.sign&&(h="-"+h),h+u}static __unequalSign(i){return i?-1:1}static __absoluteGreater(i){return i?-1:1}static __absoluteLess(i){return i?1:-1}static __compareToBigInt(i,_){const t=i.sign;if(t!==_.sign)return JSBI.__unequalSign(t);const e=JSBI.__absoluteCompare(i,_);return 0<e?JSBI.__absoluteGreater(t):0>e?JSBI.__absoluteLess(t):0}static __compareToNumber(i,_){if(JSBI.__isOneDigitInt(_)){const t=i.sign,e=0>_;if(t!==e)return JSBI.__unequalSign(t);if(0===i.length){if(e)throw new Error("implementation bug");return 0===_?0:-1}if(1<i.length)return JSBI.__absoluteGreater(t);const n=Math.abs(_),g=i.__unsignedDigit(0);return g>n?JSBI.__absoluteGreater(t):g<n?JSBI.__absoluteLess(t):0}return JSBI.__compareToDouble(i,_)}static __compareToDouble(i,_){if(_!==_)return _;if(_===1/0)return-1;if(_===-Infinity)return 1;const t=i.sign;if(t!==0>_)return JSBI.__unequalSign(t);if(0===_)throw new Error("implementation bug: should be handled elsewhere");if(0===i.length)return-1;JSBI.__kBitConversionDouble[0]=_;const e=2047&JSBI.__kBitConversionInts[JSBI.__kBitConversionIntHigh]>>>20;if(2047==e)throw new Error("implementation bug: handled elsewhere");const n=e-1023;if(0>n)return JSBI.__absoluteGreater(t);const g=i.length;let o=i.__digit(g-1);const s=JSBI.__clz30(o),l=30*g-s,r=n+1;if(l<r)return JSBI.__absoluteLess(t);if(l>r)return JSBI.__absoluteGreater(t);let a=1048576|1048575&JSBI.__kBitConversionInts[JSBI.__kBitConversionIntHigh],u=JSBI.__kBitConversionInts[JSBI.__kBitConversionIntLow];const d=20,h=29-s;if(h!==(0|(l-1)%30))throw new Error("implementation bug");let m,b=0;if(20>h){const i=d-h;b=i+32,m=a>>>i,a=a<<32-i|u>>>i,u<<=32-i}else if(20===h)b=32,m=a,a=u,u=0;else{const i=h-d;b=32-i,m=a<<i|u>>>32-i,a=u<<i,u=0}if(o>>>=0,m>>>=0,o>m)return JSBI.__absoluteGreater(t);if(o<m)return JSBI.__absoluteLess(t);for(let e=g-2;0<=e;e--){0<b?(b-=30,m=a>>>2,a=a<<30|u>>>2,u<<=30):m=0;const _=i.__unsignedDigit(e);if(_>m)return JSBI.__absoluteGreater(t);if(_<m)return JSBI.__absoluteLess(t)}if(0!==a||0!==u){if(0===b)throw new Error("implementation bug");return JSBI.__absoluteLess(t)}return 0}static __equalToNumber(i,_){var t=Math.abs;return JSBI.__isOneDigitInt(_)?0===_?0===i.length:1===i.length&&i.sign===0>_&&i.__unsignedDigit(0)===t(_):0===JSBI.__compareToDouble(i,_)}static __comparisonResultToBool(i,_){return 0===_?0>i:1===_?0>=i:2===_?0<i:3===_?0<=i:void 0}static __compare(i,_,t){if(i=JSBI.__toPrimitive(i),_=JSBI.__toPrimitive(_),"string"==typeof i&&"string"==typeof _)switch(t){case 0:return i<_;case 1:return i<=_;case 2:return i>_;case 3:return i>=_}if(JSBI.__isBigInt(i)&&"string"==typeof _)return _=JSBI.__fromString(_),null!==_&&JSBI.__comparisonResultToBool(JSBI.__compareToBigInt(i,_),t);if("string"==typeof i&&JSBI.__isBigInt(_))return i=JSBI.__fromString(i),null!==i&&JSBI.__comparisonResultToBool(JSBI.__compareToBigInt(i,_),t);if(i=JSBI.__toNumeric(i),_=JSBI.__toNumeric(_),JSBI.__isBigInt(i)){if(JSBI.__isBigInt(_))return JSBI.__comparisonResultToBool(JSBI.__compareToBigInt(i,_),t);if("number"!=typeof _)throw new Error("implementation bug");return JSBI.__comparisonResultToBool(JSBI.__compareToNumber(i,_),t)}if("number"!=typeof i)throw new Error("implementation bug");if(JSBI.__isBigInt(_))return JSBI.__comparisonResultToBool(JSBI.__compareToNumber(_,i),2^t);if("number"!=typeof _)throw new Error("implementation bug");return 0===t?i<_:1===t?i<=_:2===t?i>_:3===t?i>=_:void 0}__clzmsd(){return JSBI.__clz30(this.__digit(this.length-1))}static __absoluteAdd(_,t,e){if(_.length<t.length)return JSBI.__absoluteAdd(t,_,e);if(0===_.length)return _;if(0===t.length)return _.sign===e?_:JSBI.unaryMinus(_);let n=_.length;(0===_.__clzmsd()||t.length===_.length&&0===t.__clzmsd())&&n++;const g=new JSBI(n,e);let o=0,s=0;for(;s<t.length;s++){const i=_.__digit(s)+t.__digit(s)+o;o=i>>>30,g.__setDigit(s,1073741823&i)}for(;s<_.length;s++){const i=_.__digit(s)+o;o=i>>>30,g.__setDigit(s,1073741823&i)}return s<g.length&&g.__setDigit(s,o),g.__trim()}static __absoluteSub(_,t,e){if(0===_.length)return _;if(0===t.length)return _.sign===e?_:JSBI.unaryMinus(_);const n=new JSBI(_.length,e);let g=0,o=0;for(;o<t.length;o++){const i=_.__digit(o)-t.__digit(o)-g;g=1&i>>>30,n.__setDigit(o,1073741823&i)}for(;o<_.length;o++){const i=_.__digit(o)-g;g=1&i>>>30,n.__setDigit(o,1073741823&i)}return n.__trim()}static __absoluteAddOne(_,i,t=null){const e=_.length;null===t?t=new JSBI(e,i):t.sign=i;let n=1;for(let g=0;g<e;g++){const i=_.__digit(g)+n;n=i>>>30,t.__setDigit(g,1073741823&i)}return 0!=n&&t.__setDigitGrow(e,1),t}static __absoluteSubOne(_,t){const e=_.length;t=t||e;const n=new JSBI(t,!1);let g=1;for(let o=0;o<e;o++){const i=_.__digit(o)-g;g=1&i>>>30,n.__setDigit(o,1073741823&i)}if(0!=g)throw new Error("implementation bug");for(let g=e;g<t;g++)n.__setDigit(g,0);return n}static __absoluteAnd(_,t,e=null){let n=_.length,g=t.length,o=g;if(n<g){o=n;const i=_,e=n;_=t,n=g,t=i,g=e}let s=o;null===e?e=new JSBI(s,!1):s=e.length;let l=0;for(;l<o;l++)e.__setDigit(l,_.__digit(l)&t.__digit(l));for(;l<s;l++)e.__setDigit(l,0);return e}static __absoluteAndNot(_,t,e=null){const n=_.length,g=t.length;let o=g;n<g&&(o=n);let s=n;null===e?e=new JSBI(s,!1):s=e.length;let l=0;for(;l<o;l++)e.__setDigit(l,_.__digit(l)&~t.__digit(l));for(;l<n;l++)e.__setDigit(l,_.__digit(l));for(;l<s;l++)e.__setDigit(l,0);return e}static __absoluteOr(_,t,e=null){let n=_.length,g=t.length,o=g;if(n<g){o=n;const i=_,e=n;_=t,n=g,t=i,g=e}let s=n;null===e?e=new JSBI(s,!1):s=e.length;let l=0;for(;l<o;l++)e.__setDigit(l,_.__digit(l)|t.__digit(l));for(;l<n;l++)e.__setDigit(l,_.__digit(l));for(;l<s;l++)e.__setDigit(l,0);return e}static __absoluteXor(_,t,e=null){let n=_.length,g=t.length,o=g;if(n<g){o=n;const i=_,e=n;_=t,n=g,t=i,g=e}let s=n;null===e?e=new JSBI(s,!1):s=e.length;let l=0;for(;l<o;l++)e.__setDigit(l,_.__digit(l)^t.__digit(l));for(;l<n;l++)e.__setDigit(l,_.__digit(l));for(;l<s;l++)e.__setDigit(l,0);return e}static __absoluteCompare(_,t){const e=_.length-t.length;if(0!=e)return e;let n=_.length-1;for(;0<=n&&_.__digit(n)===t.__digit(n);)n--;return 0>n?0:_.__unsignedDigit(n)>t.__unsignedDigit(n)?1:-1}static __multiplyAccumulate(_,t,e,n){if(0===t)return;const g=32767&t,o=t>>>15;let s=0,l=0;for(let r,a=0;a<_.length;a++,n++){r=e.__digit(n);const i=_.__digit(a),t=32767&i,u=i>>>15,d=JSBI.__imul(t,g),h=JSBI.__imul(t,o),m=JSBI.__imul(u,g),b=JSBI.__imul(u,o);r+=l+d+s,s=r>>>30,r&=1073741823,r+=((32767&h)<<15)+((32767&m)<<15),s+=r>>>30,l=b+(h>>>15)+(m>>>15),e.__setDigit(n,1073741823&r)}for(;0!=s||0!==l;n++){let i=e.__digit(n);i+=s+l,l=0,s=i>>>30,e.__setDigit(n,1073741823&i)}}static __internalMultiplyAdd(_,t,e,g,o){let s=e,l=0;for(let n=0;n<g;n++){const i=_.__digit(n),e=JSBI.__imul(32767&i,t),g=JSBI.__imul(i>>>15,t),a=e+((32767&g)<<15)+l+s;s=a>>>30,l=g>>>15,o.__setDigit(n,1073741823&a)}if(o.length>g)for(o.__setDigit(g++,s+l);g<o.length;)o.__setDigit(g++,0);else if(0!==s+l)throw new Error("implementation bug")}__inplaceMultiplyAdd(i,_,t){t>this.length&&(t=this.length);const e=32767&i,n=i>>>15;let g=0,o=_;for(let s=0;s<t;s++){const i=this.__digit(s),_=32767&i,t=i>>>15,l=JSBI.__imul(_,e),r=JSBI.__imul(_,n),a=JSBI.__imul(t,e),u=JSBI.__imul(t,n);let d=o+l+g;g=d>>>30,d&=1073741823,d+=((32767&r)<<15)+((32767&a)<<15),g+=d>>>30,o=u+(r>>>15)+(a>>>15),this.__setDigit(s,1073741823&d)}if(0!=g||0!==o)throw new Error("implementation bug")}static __absoluteDivSmall(_,t,e=null){null===e&&(e=new JSBI(_.length,!1));let n=0;for(let g,o=2*_.length-1;0<=o;o-=2){g=(n<<15|_.__halfDigit(o))>>>0;const i=0|g/t;n=0|g%t,g=(n<<15|_.__halfDigit(o-1))>>>0;const s=0|g/t;n=0|g%t,e.__setDigit(o>>>1,i<<15|s)}return e}static __absoluteModSmall(_,t){let e=0;for(let n=2*_.length-1;0<=n;n--){const i=(e<<15|_.__halfDigit(n))>>>0;e=0|i%t}return e}static __absoluteDivLarge(i,_,t,e){const g=_.__halfDigitLength(),n=_.length,o=i.__halfDigitLength()-g;let s=null;t&&(s=new JSBI(o+2>>>1,!1),s.__initializeDigits());const l=new JSBI(g+2>>>1,!1);l.__initializeDigits();const r=JSBI.__clz15(_.__halfDigit(g-1));0<r&&(_=JSBI.__specialLeftShift(_,r,0));const a=JSBI.__specialLeftShift(i,r,1),u=_.__halfDigit(g-1);let d=0;for(let r,h=o;0<=h;h--){r=32767;const i=a.__halfDigit(h+g);if(i!==u){const t=(i<<15|a.__halfDigit(h+g-1))>>>0;r=0|t/u;let e=0|t%u;const n=_.__halfDigit(g-2),o=a.__halfDigit(h+g-2);for(;JSBI.__imul(r,n)>>>0>(e<<16|o)>>>0&&(r--,e+=u,!(32767<e)););}JSBI.__internalMultiplyAdd(_,r,0,n,l);let e=a.__inplaceSub(l,h,g+1);0!==e&&(e=a.__inplaceAdd(_,h,g),a.__setHalfDigit(h+g,32767&a.__halfDigit(h+g)+e),r--),t&&(1&h?d=r<<15:s.__setDigit(h>>>1,d|r))}if(e)return a.__inplaceRightShift(r),t?{quotient:s,remainder:a}:a;if(t)return s;throw new Error("unreachable")}static __clz15(i){return JSBI.__clz30(i)-15}__inplaceAdd(_,t,e){let n=0;for(let g=0;g<e;g++){const i=this.__halfDigit(t+g)+_.__halfDigit(g)+n;n=i>>>15,this.__setHalfDigit(t+g,32767&i)}return n}__inplaceSub(_,t,e){let n=0;if(1&t){t>>=1;let g=this.__digit(t),o=32767&g,s=0;for(;s<e-1>>>1;s++){const i=_.__digit(s),e=(g>>>15)-(32767&i)-n;n=1&e>>>15,this.__setDigit(t+s,(32767&e)<<15|32767&o),g=this.__digit(t+s+1),o=(32767&g)-(i>>>15)-n,n=1&o>>>15}const i=_.__digit(s),l=(g>>>15)-(32767&i)-n;n=1&l>>>15,this.__setDigit(t+s,(32767&l)<<15|32767&o);if(t+s+1>=this.length)throw new RangeError("out of bounds");0==(1&e)&&(g=this.__digit(t+s+1),o=(32767&g)-(i>>>15)-n,n=1&o>>>15,this.__setDigit(t+_.length,1073709056&g|32767&o))}else{t>>=1;let g=0;for(;g<_.length-1;g++){const i=this.__digit(t+g),e=_.__digit(g),o=(32767&i)-(32767&e)-n;n=1&o>>>15;const s=(i>>>15)-(e>>>15)-n;n=1&s>>>15,this.__setDigit(t+g,(32767&s)<<15|32767&o)}const i=this.__digit(t+g),o=_.__digit(g),s=(32767&i)-(32767&o)-n;n=1&s>>>15;let l=0;0==(1&e)&&(l=(i>>>15)-(o>>>15)-n,n=1&l>>>15),this.__setDigit(t+g,(32767&l)<<15|32767&s)}return n}__inplaceRightShift(_){if(0===_)return;let t=this.__digit(0)>>>_;const e=this.length-1;for(let n=0;n<e;n++){const i=this.__digit(n+1);this.__setDigit(n,1073741823&i<<30-_|t),t=i>>>_}this.__setDigit(e,t)}static __specialLeftShift(_,t,e){const g=_.length,n=new JSBI(g+e,!1);if(0===t){for(let t=0;t<g;t++)n.__setDigit(t,_.__digit(t));return 0<e&&n.__setDigit(g,0),n}let o=0;for(let s=0;s<g;s++){const i=_.__digit(s);n.__setDigit(s,1073741823&i<<t|o),o=i>>>30-t}return 0<e&&n.__setDigit(g,o),n}static __leftShiftByAbsolute(_,i){const t=JSBI.__toShiftAmount(i);if(0>t)throw new RangeError("BigInt too big");const e=0|t/30,n=t%30,g=_.length,o=0!==n&&0!=_.__digit(g-1)>>>30-n,s=g+e+(o?1:0),l=new JSBI(s,_.sign);if(0===n){let t=0;for(;t<e;t++)l.__setDigit(t,0);for(;t<s;t++)l.__setDigit(t,_.__digit(t-e))}else{let t=0;for(let _=0;_<e;_++)l.__setDigit(_,0);for(let o=0;o<g;o++){const i=_.__digit(o);l.__setDigit(o+e,1073741823&i<<n|t),t=i>>>30-n}if(o)l.__setDigit(g+e,t);else if(0!==t)throw new Error("implementation bug")}return l.__trim()}static __rightShiftByAbsolute(_,i){const t=_.length,e=_.sign,n=JSBI.__toShiftAmount(i);if(0>n)return JSBI.__rightShiftByMaximum(e);const g=0|n/30,o=n%30;let s=t-g;if(0>=s)return JSBI.__rightShiftByMaximum(e);let l=!1;if(e){if(0!=(_.__digit(g)&(1<<o)-1))l=!0;else for(let t=0;t<g;t++)if(0!==_.__digit(t)){l=!0;break}}if(l&&0===o){const i=_.__digit(t-1);0==~i&&s++}let r=new JSBI(s,e);if(0===o){r.__setDigit(s-1,0);for(let e=g;e<t;e++)r.__setDigit(e-g,_.__digit(e))}else{let e=_.__digit(g)>>>o;const n=t-g-1;for(let t=0;t<n;t++){const i=_.__digit(t+g+1);r.__setDigit(t,1073741823&i<<30-o|e),e=i>>>o}r.__setDigit(n,e)}return l&&(r=JSBI.__absoluteAddOne(r,!0,r)),r.__trim()}static __rightShiftByMaximum(i){return i?JSBI.__oneDigit(1,!0):JSBI.__zero()}static __toShiftAmount(i){if(1<i.length)return-1;const _=i.__unsignedDigit(0);return _>JSBI.__kMaxLengthBits?-1:_}static __toPrimitive(i,_="default"){if("object"!=typeof i)return i;if(i.constructor===JSBI)return i;if("undefined"!=typeof Symbol&&"symbol"==typeof Symbol.toPrimitive&&i[Symbol.toPrimitive]){const t=i[Symbol.toPrimitive](_);if("object"!=typeof t)return t;throw new TypeError("Cannot convert object to primitive value")}const t=i.valueOf;if(t){const _=t.call(i);if("object"!=typeof _)return _}const e=i.toString;if(e){const _=e.call(i);if("object"!=typeof _)return _}throw new TypeError("Cannot convert object to primitive value")}static __toNumeric(i){return JSBI.__isBigInt(i)?i:+i}static __isBigInt(i){return"object"==typeof i&&null!==i&&i.constructor===JSBI}static __truncateToNBits(i,_){const t=0|(i+29)/30,e=new JSBI(t,_.sign),n=t-1;for(let t=0;t<n;t++)e.__setDigit(t,_.__digit(t));let g=_.__digit(n);if(0!=i%30){const _=32-i%30;g=g<<_>>>_}return e.__setDigit(n,g),e.__trim()}static __truncateAndSubFromPowerOfTwo(_,t,e){var n=Math.min;const g=0|(_+29)/30,o=new JSBI(g,e);let s=0;const l=g-1;let a=0;for(const i=n(l,t.length);s<i;s++){const i=0-t.__digit(s)-a;a=1&i>>>30,o.__setDigit(s,1073741823&i)}for(;s<l;s++)o.__setDigit(s,0|1073741823&-a);let u=l<t.length?t.__digit(l):0;const d=_%30;let h;if(0==d)h=0-u-a,h&=1073741823;else{const i=32-d;u=u<<i>>>i;const _=1<<32-i;h=_-u-a,h&=_-1}return o.__setDigit(l,h),o.__trim()}__digit(_){return this[_]}__unsignedDigit(_){return this[_]>>>0}__setDigit(_,i){this[_]=0|i}__setDigitGrow(_,i){this[_]=0|i}__halfDigitLength(){const i=this.length;return 32767>=this.__unsignedDigit(i-1)?2*i-1:2*i}__halfDigit(_){return 32767&this[_>>>1]>>>15*(1&_)}__setHalfDigit(_,i){const t=_>>>1,e=this.__digit(t),n=1&_?32767&e|i<<15:1073709056&e|32767&i;this.__setDigit(t,n)}static __digitPow(i,_){let t=1;for(;0<_;)1&_&&(t*=i),_>>>=1,i*=i;return t}static __detectBigEndian(){return JSBI.__kBitConversionDouble[0]=-0,0!==JSBI.__kBitConversionInts[0]}static __isOneDigitInt(i){return(1073741823&i)===i}}JSBI.__kMaxLength=33554432,JSBI.__kMaxLengthBits=JSBI.__kMaxLength<<5,JSBI.__kMaxBitsPerChar=[0,0,32,51,64,75,83,90,96,102,107,111,115,119,122,126,128,131,134,136,139,141,143,145,147,149,151,153,154,156,158,159,160,162,163,165,166],JSBI.__kBitsPerCharTableShift=5,JSBI.__kBitsPerCharTableMultiplier=1<<JSBI.__kBitsPerCharTableShift,JSBI.__kConversionChars=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],JSBI.__kBitConversionBuffer=new ArrayBuffer(8),JSBI.__kBitConversionDouble=new Float64Array(JSBI.__kBitConversionBuffer),JSBI.__kBitConversionInts=new Int32Array(JSBI.__kBitConversionBuffer),JSBI.__kBitConversionIntHigh=JSBI.__detectBigEndian()?0:1,JSBI.__kBitConversionIntLow=JSBI.__detectBigEndian()?1:0,JSBI.__clz30=Math.clz32?function(i){return Math.clz32(i)-2}:function(i){return 0===i?30:0|29-(0|Math.log(i>>>0)/Math.LN2)},JSBI.__imul=Math.imul||function(i,_){return 0|i*_},module.exports=JSBI;
//# sourceMappingURL=jsbi-cjs.js.map


/***/ }),

/***/ 69:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/* eslint-disable max-depth, max-params, no-warning-comments, complexity */

const {randomUUID} = __nccwpck_require__(598);
// Load Temporal polyfill if not natively available
// TODO: Drop the polyfill branch once our minimum Node version ships Temporal
const Temporal = globalThis.Temporal || (__nccwpck_require__(645)/* .Temporal */ .fE);
// Ensure Temporal exists before loading rrule-temporal
globalThis.Temporal ??= Temporal;
const {RRuleTemporal} = __nccwpck_require__(589);
const {toText: toTextFunction} = __nccwpck_require__(813);
const tzUtil = __nccwpck_require__(610);
const {getDateKey} = __nccwpck_require__(516);

/**
 * Clone a Date object and preserve custom metadata (tz, dateOnly).
 * @param {Date} source - Source Date object with optional tz and dateOnly properties
 * @param {Date|number} newTime - New time value (defaults to source)
 * @returns {Date} Cloned Date with preserved metadata
 */
function cloneDateWithMeta(source, newTime = source) {
  const cloned = new Date(newTime);

  if (source?.tz) {
    cloned.tz = source.tz;
  }

  if (source?.dateOnly) {
    cloned.dateOnly = source.dateOnly;
  }

  return cloned;
}

/**
 * Extract string value from DURATION (handles {params, val} shape).
 * @param {string|object} duration - Duration value (string or object with val property)
 * @returns {string} Duration string
 */
function getDurationString(duration) {
  if (typeof duration === 'object' && duration?.val) {
    return String(duration.val);
  }

  return duration ? String(duration) : '';
}

/**
 * Store a recurrence override with dual-key strategy.
 * Uses both date-only (YYYY-MM-DD) and full ISO keys for DATE-TIME entries.
 * Implements RFC 5545 SEQUENCE logic: newer versions (higher SEQUENCE) replace older ones.
 * @param {Object} recurrences - Recurrences object to store in
 * @param {Date} recurrenceId - RECURRENCE-ID date value
 * @param {Object} recurrenceObject - Recurrence override data
 */
function storeRecurrenceOverride(recurrences, recurrenceId, recurrenceObject) {
  if (typeof recurrenceId.toISOString !== 'function') {
    console.warn(`[node-ical] Invalid recurrenceid (no toISOString): ${recurrenceId}`);
    return;
  }

  const dateKey = getDateKey(recurrenceId);
  const isoKey = recurrenceId.dateOnly === true ? null : recurrenceId.toISOString();

  // Check for existing override: prefer ISO key if available (more precise), fallback to date key
  // This handles both DATE-TIME (precise time) and DATE (date-only) recurrence IDs
  const existing = (isoKey && recurrences[isoKey]) || recurrences[dateKey];

  // Check SEQUENCE to determine which version to keep (RFC 5545)
  // Normalize SEQUENCE to number, default to 0 if invalid/missing
  if (existing !== undefined) {
    const existingSeq = Number.isFinite(existing.sequence) ? existing.sequence : 0;
    const newSeq = Number.isFinite(recurrenceObject.sequence) ? recurrenceObject.sequence : 0;

    if (newSeq < existingSeq) {
      // Older version - ignore it
      const key = isoKey || dateKey;
      console.warn(`[node-ical] Ignoring older RECURRENCE-ID override (SEQUENCE ${newSeq} < ${existingSeq}) for ${key}`);
      return;
    }
    // If newSeq >= existingSeq, continue and overwrite (newer or same version)
  }

  recurrences[dateKey] = recurrenceObject;

  // Also store with full ISO key for DATE-TIME entries (enables precise matching)
  if (isoKey) {
    recurrences[isoKey] = recurrenceObject;
  }
}

/**
 * Wrapper class to convert RRuleTemporal (Temporal.ZonedDateTime) to Date objects
 * This maintains backward compatibility while using rrule-temporal internally
 */
class RRuleCompatWrapper {
  constructor(rruleTemporal, dateOnly = false) {
    this._rrule = rruleTemporal;
    // VALUE=DATE events are anchored to UTC midnight in rrule-temporal.
    // Converting via epochMilliseconds shifts the date backwards in timezones
    // west of UTC; instead we use the ZonedDateTime calendar components directly.
    this._dateOnly = dateOnly;
  }

  static #temporalToDate(value) {
    if (value === undefined || value === null) {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map(item => RRuleCompatWrapper.#temporalToDate(item));
    }

    // Convert known Temporal instances to Date
    if (typeof value === 'object' && !(value instanceof Date) && typeof value.epochMilliseconds === 'number') {
      return new Date(value.epochMilliseconds);
    }

    return value;
  }

  #serializeOptions() {
    const raw = this._rrule.options();
    const converted = {};

    for (const [key, value] of Object.entries(raw)) {
      converted[key] = RRuleCompatWrapper.#temporalToDate(value);
    }

    // Map rrule-temporal `byDay` to legacy `byweekday`
    if (converted.byweekday === undefined && raw.byDay !== undefined) {
      converted.byweekday = RRuleCompatWrapper.#temporalToDate(raw.byDay);
    }

    return converted;
  }

  // Convert a ZonedDateTime to a JS Date.
  // For VALUE=DATE events the ZDT calendar components (year/month/day in UTC)
  // represent the intended calendar date; create a local-midnight Date so that
  // .toDateString() returns the correct day regardless of the host timezone.
  // Mark the result with dateOnly=true so that downstream helpers that
  // distinguish date-only from timed dates (e.g. createLocalDateFromUTC) also
  // use local getters rather than UTC getters.
  #zdtToDate(zdt) {
    if (this._dateOnly) {
      const d = new Date(zdt.year, zdt.month - 1, zdt.day, 0, 0, 0, 0);
      d.dateOnly = true;
      return d;
    }

    return new Date(zdt.epochMilliseconds);
  }

  between(after, before, inclusive = false) {
    const results = this._rrule.between(after, before, inclusive);
    return results.map(zdt => this.#zdtToDate(zdt));
  }

  all(iterator) {
    // If the caller supplied an iterator, wrap it so it receives a converted Date
    // rather than a raw Temporal.ZonedDateTime — keeping the public API consistent
    // with between() and matching the declared return type.
    const wrappedIterator = iterator
      ? (zdt, index) => iterator(this.#zdtToDate(zdt), index)
      : undefined;
    const results = this._rrule.all(wrappedIterator);
    return results.map(zdt => this.#zdtToDate(zdt));
  }

  before(date, inclusive = false) {
    const result = this._rrule.previous(date, inclusive);
    return result ? this.#zdtToDate(result) : undefined;
  }

  after(date, inclusive = false) {
    const result = this._rrule.next(date, inclusive);
    return result ? this.#zdtToDate(result) : undefined;
  }

  toText(locale) {
    return toTextFunction(this._rrule, locale);
  }

  // Delegate other methods
  toString() {
    return this._rrule.toString();
  }

  // Expose options as a property for compatibility with the old rrule.js API
  // (the wrapper hides the underlying method-based interface)
  get options() {
    return this.#serializeOptions();
  }

  // OrigOptions: the original options as passed to the constructor (before processing).
  // In rrule.js, this was used for toString() and clone() operations.
  // For rrule-temporal, options() already returns the unprocessed original options,
  // so origOptions and options are equivalent.
  get origOptions() {
    return this.#serializeOptions();
  }
}

/** **************
 *  A tolerant, minimal icalendar parser
 *  (http://tools.ietf.org/html/rfc5545)
 *
 *  <peterbraden@peterbraden.co.uk>
 * ************* */

// Unescape Text re RFC 4.3.11
const text = function (t = '') {
  return t
    .replaceAll(String.raw`\,`, ',') // Unescape escaped commas
    .replaceAll(String.raw`\;`, ';') // Unescape escaped semicolons
    .replaceAll(/\\[nN]/gv, '\n') // Replace escaped newlines with actual newlines
    .replaceAll('\\\\', '\\') // Unescape backslashes
    .replace(/^"(.*)"$/v, '$1'); // Remove surrounding double quotes, if present
};

const parseValue = function (value) {
  if (value === 'TRUE') {
    return true;
  }

  if (value === 'FALSE') {
    return false;
  }

  const number = Number(value);
  if (!Number.isNaN(number)) {
    return number;
  }

  // Remove quotes if found
  value = value.replace(/^"(.*)"$/v, '$1');

  return value;
};

const parseParameters = function (p) {
  const out = {};
  for (const element of p) {
    if (element.includes('=')) {
      const segs = element.split('=');

      out[segs[0]] = parseValue(segs.slice(1).join('='));
    }
  }

  // Sp is not defined in this scope, typo?
  // original code from peterbraden
  // return out || sp;
  return out;
};

const storeValueParameter = function (name) {
  return function (value, curr) {
    const current = curr[name];

    if (Array.isArray(current)) {
      current.push(value);
      return curr;
    }

    curr[name] = current === undefined ? value : [current, value];

    return curr;
  };
};

const storeParameter = function (name) {
  return function (value, parameters, curr) {
    const data = parameters && parameters.length > 0 && !(parameters.length === 1 && (parameters[0] === 'CHARSET=utf-8' || parameters[0] === 'VALUE=TEXT')) ? {params: parseParameters(parameters), val: text(value)} : text(value);

    return storeValueParameter(name)(data, curr);
  };
};

const addTZ = function (dt, parameters) {
  if (!dt) {
    return dt;
  }

  const p = parseParameters(parameters);
  if (parameters && p && p.TZID !== undefined) {
    let tzid = p.TZID.toString();
    // Remove surrounding quotes if found at the beginning and at the end of the string
    // (Occurs when parsing Microsoft Exchange events containing TZID with Windows standard format instead IANA)
    tzid = tzid.replace(/^"(.*)"$/v, '$1');
    return tzUtil.attachTz(dt, tzid);
  }

  if (dt.tz) {
    return tzUtil.attachTz(dt, dt.tz);
  }

  return dt;
};

function isDateOnly(value, parameters) {
  const dateOnly = ((parameters && parameters.includes('VALUE=DATE') && !parameters.includes('VALUE=DATE-TIME')) || /^\d{8}$/v.test(value) === true);
  return dateOnly;
}

const typeParameter = function (name) {
  // Typename is not used in this function?
  return function (value, parameters, curr) {
    const returnValue = isDateOnly(value, parameters) ? 'date' : 'date-time';
    return storeValueParameter(name)(returnValue, curr);
  };
};

// Find a VTIMEZONE block in the parser stack.  When tzid is given, only
// the block whose (quote-stripped) tzid matches is returned; without tzid
// the first VTIMEZONE found is returned (floating-DTSTART branch).
function findVtimezoneInStack(stack, tzid) {
  for (const item of (stack || [])) {
    for (const v of Object.values(item)) {
      if (!v || v.type !== 'VTIMEZONE') {
        continue;
      }

      if (!tzid) {
        return v;
      }

      const ids = Array.isArray(v.tzid) ? v.tzid : [v.tzid];
      if (ids.some(id => String(id).replace(/^"(.*)"$/v, '$1') === tzid)) {
        return v;
      }
    }
  }
}

const dateParameter = function (name) {
  return function (value, parameters, curr, stack) {
    // The regex from main gets confused by extra :
    const pi = parameters.indexOf('TZID=tzone');
    if (pi !== -1) {
      // Correct the parameters with the part on the value
      parameters[pi] = parameters[pi] + ':' + value.split(':')[0];
      // Get the date from the field, other code uses the value parameter
      value = value.split(':')[1];
    }

    let newDate = text(value);

    // Process 'VALUE=DATE' and EXDATE
    if (isDateOnly(value, parameters)) {
      // Just Date

      const comps = /^(\d{4})(\d{2})(\d{2}).*$/v.exec(value);
      if (comps !== null) {
        // No TZ info - assume same timezone as this computer
        newDate = new Date(comps[1], Number.parseInt(comps[2], 10) - 1, comps[3]);

        newDate.dateOnly = true;

        // Store as string - worst case scenario
        return storeValueParameter(name)(newDate, curr);
      }
    }

    // Typical RFC date-time format
    const comps = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/v.exec(value);
    if (comps !== null) {
      const year = Number.parseInt(comps[1], 10);
      const monthIndex = Number.parseInt(comps[2], 10) - 1;
      const day = Number.parseInt(comps[3], 10);
      const hour = Number.parseInt(comps[4], 10);
      const minute = Number.parseInt(comps[5], 10);
      const second = Number.parseInt(comps[6], 10);

      if (comps[7] === 'Z') {
        // GMT
        newDate = new Date(Date.UTC(year, monthIndex, day, hour, minute, second));
        tzUtil.attachTz(newDate, 'Etc/UTC');
      } else if (curr.type === 'STANDARD' || curr.type === 'DAYLIGHT') {
        // Inside a VTIMEZONE observance block the DTSTART is a plain local
        // wall-clock time that defines when the rule takes effect — it must
        // NOT trigger timezone resolution (which would look up the *enclosing*
        // VTIMEZONE and could crash on exotic years like 0001).
        newDate = new Date(year, monthIndex, day, hour, minute, second);
        newDate.setFullYear(year);
      } else {
        const fallbackWithStackTimezone = () => {
          const vTimezone = findVtimezoneInStack(stack);

          // If the VTIMEZONE contains multiple TZIDs (against RFC), use last one
          const normalizedTzId = vTimezone
            ? (Array.isArray(vTimezone.tzid) ? vTimezone.tzid.at(-1) : vTimezone.tzid)
            : null;

          if (!normalizedTzId) {
            return new Date(year, monthIndex, day, hour, minute, second);
          }

          let resolvedTzId = String(normalizedTzId).replace(/^"(.*)"$/v, '$1');

          // When a VTIMEZONE block is present, prefer its STANDARD/DAYLIGHT offset data over
          // a pure string-based TZID lookup.  This handles both well-known IANA names (where
          // the embedded rules may be more historically precise) and completely custom TZIDs
          // (e.g. Microsoft's "Customized Time Zone", "tzone://Microsoft/Custom") that
          // resolveTZID cannot look up at all.
          // Only replace resolvedTzId when resolution actually succeeds; otherwise keep the
          // original value so resolveTZID can make a best effort — never substitute the host
          // zone via guessLocalZone().
          if (vTimezone) {
            const resolved = tzUtil.resolveVTimezoneToIana(vTimezone, year);
            if (resolved.iana || resolved.offset) {
              resolvedTzId = resolved.iana || resolved.offset;
            }
          }

          const tzInfo = tzUtil.resolveTZID(resolvedTzId);
          const offsetString = typeof tzInfo.offset === 'string' ? tzInfo.offset : undefined;
          if (offsetString) {
            return tzUtil.parseWithOffset(value, offsetString);
          }

          if (tzInfo.iana) {
            return tzUtil.parseDateTimeInZone(value, tzInfo.iana);
          }

          return new Date(year, monthIndex, day, hour, minute, second);
        };

        if (parameters) {
          const parameterMap = parseParameters(parameters);
          let tz = parameterMap.TZID;

          const findTZIDIndex = () => {
            if (!Array.isArray(parameters)) {
              return -1;
            }

            return parameters.findIndex(parameter => typeof parameter === 'string' && parameter.toUpperCase().startsWith('TZID='));
          };

          let tzParameterIndex = findTZIDIndex();
          const setTZIDParameter = newTZID => {
            if (!Array.isArray(parameters)) {
              return;
            }

            const normalized = 'TZID=' + newTZID;
            if (tzParameterIndex >= 0) {
              parameters[tzParameterIndex] = normalized;
            } else {
              parameters.push(normalized);
              tzParameterIndex = parameters.length - 1;
            }
          };

          if (tz) {
            tz = tz.toString().replace(/^"(.*)"$/v, '$1');

            if (tz === 'tzone://Microsoft/Custom' || tz === '(no TZ description)' || tz.startsWith('Customized Time Zone') || tz.startsWith('tzone://Microsoft/')) {
              // Outlook and Exchange often emit custom TZID values (e.g. "Customized Time Zone")
              // together with a VTIMEZONE section that contains the real STANDARD/DAYLIGHT rules.
              // Try to match those rules to a known IANA zone so that recurring events that span
              // DST boundaries are handled correctly.  Falls back to guessLocalZone() when no
              // VTIMEZONE is present or its offsets cannot be resolved.
              const originalTz = tz;
              const stackVTimezone = findVtimezoneInStack(stack, originalTz);

              if (stackVTimezone) {
                const resolved = tzUtil.resolveVTimezoneToIana(stackVTimezone, year);
                // Only override when resolution succeeds; keep the original tz otherwise
                // so resolveTZID can make a best effort — never substitute guessLocalZone()
                if (resolved.iana || resolved.offset) {
                  tz = resolved.iana || resolved.offset;
                }
              } else {
                tz = tzUtil.guessLocalZone();
              }
            }

            const tzInfo = tzUtil.resolveTZID(tz);
            const resolvedTZID = tzInfo.iana || tzInfo.original || tz;
            setTZIDParameter(resolvedTZID);

            // Prefer an explicit numeric offset because it keeps DTSTART wall-time semantics accurate across DST transitions.
            const offsetString = typeof tzInfo.offset === 'string' ? tzInfo.offset : undefined;
            if (offsetString) {
              newDate = tzUtil.parseWithOffset(value, offsetString);
            } else if (tzInfo.iana) {
              newDate = tzUtil.parseDateTimeInZone(value, tzInfo.iana);
            } else {
              newDate = new Date(year, monthIndex, day, hour, minute, second);
            }

            // Make sure to correct the parameters if the TZID= is changed
            newDate = addTZ(newDate, parameters);
          } else {
            newDate = fallbackWithStackTimezone();
          }
        } else {
          newDate = fallbackWithStackTimezone();
        }
      }
    }

    // Store as string - worst case scenario
    return storeValueParameter(name)(newDate, curr);
  };
};

const geoParameter = function (name) {
  return function (value, parameters, curr) {
    storeParameter(value, parameters, curr);
    const parts = value.split(';');
    curr[name] = {lat: Number(parts[0]), lon: Number(parts[1])};
    return curr;
  };
};

const categoriesParameter = function (name) {
  return function (value, parameters, curr) {
    storeParameter(value, parameters, curr);
    if (curr[name] === undefined) {
      curr[name] = value ? value.split(',').map(s => s.trim()) : [];
    } else if (value) {
      curr[name] = curr[name].concat(value.split(',').map(s => s.trim()));
    }

    return curr;
  };
};

// EXDATE is an entry that represents exceptions to a recurrence rule (ex: "repeat every day except on 7/4").
// The EXDATE entry itself can also contain a comma-separated list, so we parse each date separately.
// Multiple EXDATE entries can exist in a calendar record.
//
// Storage strategy (RFC 5545 compliant):
// We create an object with the exception dates as keys and Date objects as values.
// - For VALUE=DATE (date-only): key is "YYYY-MM-DD"
// - For DATE-TIME: BOTH "YYYY-MM-DD" AND full ISO string keys are created
//
// This dual-key approach provides:
// 1. Backward compatibility: date-only lookups continue to work
// 2. Precision matching: events recurring multiple times per day can exclude specific instances
// 3. RFC 5545 compliance: supports both DATE and DATE-TIME exclusions
//
// Usage examples:
//   if (event.exdate?.['2024-01-15']) { ... }              // Check if any instance on this day is excluded
//   if (event.exdate?.['2024-01-15T14:00:00.000Z']) { ... } // Check specific time instance
//
// NOTE: We intentionally use date-based keys as the primary lookup because:
//   1. Floating times (without timezone) would create inconsistent ISO strings
//   2. DST transitions can affect exact time matching
//   3. Real-world calendar data often has mismatched times between RRULE and EXDATE
const exdateParameter = function (name) {
  return function (value, parameters, curr) {
    curr[name] ||= {};
    const dates = value ? value.split(',').map(s => s.trim()) : [];

    for (const entry of dates) {
      // Temporary container for dateParameter() to write to
      const temporaryContainer = {};
      dateParameter(name)(entry, parameters, temporaryContainer);

      const dateValue = temporaryContainer[name];
      if (!dateValue) {
        continue;
      }

      if (typeof dateValue.toISOString !== 'function') {
        console.warn(`[node-ical] Invalid exdate value (no toISOString): ${dateValue}`);
        continue;
      }

      const isoString = dateValue.toISOString();

      // For date-only events, use local date components to avoid UTC timezone shift
      // (e.g., 2024-07-15 midnight in UTC+2 would be 2024-07-14T22:00Z, giving wrong dateKey)
      const dateKey = getDateKey(dateValue);

      // Always store with date-only key for backward compatibility and simple lookups
      curr[name][dateKey] = dateValue;

      // For DATE-TIME entries, also store with full ISO string for precise matching
      // This enables excluding specific instances when events recur multiple times per day
      // Note: dateOnly is already set by dateParameter() which checks the raw value and parameters
      if (!dateValue.dateOnly) {
        curr[name][isoString] = dateValue;
      }
    }

    return curr;
  };
};

// RECURRENCE-ID is the ID of a specific recurrence within a recurrence rule.
// TODO:  It's also possible for it to have a range, like "THISANDPRIOR", "THISANDFUTURE".  This isn't currently handled.
const recurrenceParameter = function (name) {
  return dateParameter(name);
};

const addFBType = function (fb, parameters) {
  const p = parseParameters(parameters);

  if (parameters && p) {
    fb.type = p.FBTYPE || 'BUSY';
  }

  return fb;
};

const freebusyParameter = function (name) {
  return function (value, parameters, curr) {
    const fb = addFBType({}, parameters);
    curr[name] ||= [];
    curr[name].push(fb);

    storeParameter(value, parameters, fb);

    const parts = value.split('/');

    for (const [index, name] of ['start', 'end'].entries()) {
      dateParameter(name)(parts[index], parameters, fb);
    }

    return curr;
  };
};

// Default batch size for async parsing to prevent event loop blocking
const PARSE_BATCH_SIZE = 2000;

module.exports = {
  objectHandlers: {
    BEGIN(component, parameters, curr, stack) {
      stack.push(curr);

      return {type: component};
    },
    END(value, parameters, curr, stack) {
      // Original end function
      const originalEnd = function (component, parameters_, curr, stack) {
        // Prevents the need to search the root of the tree for the VCALENDAR object
        if (component === 'VCALENDAR') {
          // Preserve VCALENDAR string properties in a separate 'vcalendar' object
          // for easy access to calendar metadata
          // (X-WR-CALNAME, X-WR-CALDESC, X-WR-TIMEZONE, METHOD, etc.)
          let key;
          let object;
          const vcalendarProps = {};

          for (key in curr) {
            if (!Object.hasOwn(curr, key)) {
              continue;
            }

            object = curr[key];
            if (typeof object === 'string') {
              vcalendarProps[key] = object;
              delete curr[key];
            }
          }

          // Store VCALENDAR properties in a dedicated object for easy access
          if (Object.keys(vcalendarProps).length > 0) {
            curr.vcalendar = vcalendarProps;
          }

          return curr;
        }

        const par = stack.pop();

        if (!curr.end) { // RFC5545, 3.6.1
          // Calculate end date based on DURATION or default rules
          if (curr.duration === undefined) {
            // No DURATION: default end is same time (date-time) or +1 day (date-only)
            curr.end = curr.datetype === 'date-time'
              ? cloneDateWithMeta(curr.start)
              : cloneDateWithMeta(curr.start, tzUtil.utcAdd(curr.start, 1, 'days'));
          } else {
            const durationString = getDurationString(curr.duration);
            const durationParts = durationString.match(/-?\d{1,10}[WDHMS]/gv);

            if (durationParts && durationParts.length > 0) {
              // Valid DURATION: apply each component (W/D/H/M/S)
              const units = {
                W: 'weeks',
                D: 'days',
                H: 'hours',
                M: 'minutes',
                S: 'seconds',
              };
              const sign = durationString.startsWith('-') ? -1 : 1;

              let endTime = curr.start;
              for (const part of durationParts) {
                const value = Number.parseInt(part, 10) * sign;
                const unit = units[part.slice(-1)];
                endTime = tzUtil.utcAdd(endTime, value, unit);
              }

              curr.end = cloneDateWithMeta(curr.start, endTime);
            } else {
              // Malformed DURATION (e.g., "P", "PT", "") → treat as zero duration
              // Follows Postel's Law: be liberal in what you accept
              console.warn(`[node-ical] Ignoring malformed DURATION value: "${durationString}" – treating as zero duration`);
              curr.end = cloneDateWithMeta(curr.start);
            }
          }
        }

        if (curr.uid) {
          // If this is the first time we run into this UID, just save it.
          if (par[curr.uid] === undefined) {
            par[curr.uid] = curr;

            if (par.method) { // RFC5545, 3.2
              par[curr.uid].method = par.method;
            }
          } else if (curr.recurrenceid === undefined) {
            // If we have multiple ical entries with the same UID, it's either going to be a
            // modification to a recurrence (RECURRENCE-ID), and/or a significant modification
            // to the entry (SEQUENCE).

            // Special case: If existing entry is a RECURRENCE-ID override but current entry is the base series (has RRULE),
            // we should always accept the base series regardless of SEQUENCE, as they serve different purposes.
            // The RECURRENCE-ID will be stored separately in the recurrences array later.
            const existingIsRecurrence = par[curr.uid].recurrenceid !== undefined;
            // Note: This only detects RRULE-based series. RDATE-based recurring series
            // (without RRULE) will fall through to SEQUENCE comparison.
            const currentIsBaseSeries = curr.rrule !== undefined;

            if (existingIsRecurrence && currentIsBaseSeries) {
              // Existing is a recurrence override, current is the base series - always accept the base series
              // Note: The stale recurrenceid on par[curr.uid] will be cleaned up by the
              // existing recurrenceid-cleanup block below (after the recurrence-id handling section).
              for (const key in curr) {
                if (key !== null) {
                  par[curr.uid][key] = curr[key];
                }
              }
            } else {
              // Both are base series entries (no RECURRENCE-ID) - apply SEQUENCE logic
              // Check SEQUENCE to determine which version to keep (RFC 5545)
              // Normalize SEQUENCE to number, default to 0 if invalid/missing
              const existingSeq = Number.isFinite(par[curr.uid].sequence) ? par[curr.uid].sequence : 0;
              const newSeq = Number.isFinite(curr.sequence) ? curr.sequence : 0;

              if (newSeq < existingSeq) {
                // Older version - ignore it entirely
                console.warn(`[node-ical] Ignoring older event version (SEQUENCE ${newSeq} < ${existingSeq}) for UID ${curr.uid}`);
              } else {
                // Newer or same version - merge fields from the new record into the existing one
                for (const key in curr) {
                  if (key !== null) {
                    par[curr.uid][key] = curr[key];
                  }
                }
              }
            }
          }

          // If we have recurrence-id entries, list them as an array of recurrences keyed off of recurrence-id.
          // To use - as you're running through the dates of an rrule, you can try looking it up in the recurrences
          // array.  If it exists, then use the data from the calendar object in the recurrence instead of the parent
          // for that day.

          // NOTE:  Sometimes the RECURRENCE-ID record will show up *before* the record with the RRULE entry.  In that
          // case, what happens is that the RECURRENCE-ID record ends up becoming both the parent record and an entry
          // in the recurrences array, and then when we process the RRULE entry later it overwrites the appropriate
          // fields in the parent record.

          if (curr.recurrenceid !== undefined) {
            // Create a copy of the current object to save in our recurrences array.  (We *could* just do par = curr,
            // except for the case that we get the RECURRENCE-ID record before the RRULE record.  In that case, we
            // would end up with a shared reference that would cause us to overwrite *both* records at the point
            // that we try and fix up the parent record.)
            const recurrenceObject = {};
            let key;
            for (key in curr) {
              if (key !== null) {
                recurrenceObject[key] = curr[key];
              }
            }

            if (recurrenceObject.recurrences !== undefined) {
              delete recurrenceObject.recurrences;
            }

            // If we don't have an array to store recurrences in yet, create it.
            if (par[curr.uid].recurrences === undefined) {
              par[curr.uid].recurrences = {};
            }

            // Store the recurrence override with dual-key strategy (same as EXDATE)
            storeRecurrenceOverride(par[curr.uid].recurrences, curr.recurrenceid, recurrenceObject);
          }

          // One more specific fix - in the case that an RRULE entry shows up after a RECURRENCE-ID entry,
          // let's make sure to clear the recurrenceid off the parent field.
          if (curr.uid !== '__proto__'
            && par[curr.uid].rrule !== undefined
            && par[curr.uid].recurrenceid !== undefined) {
            delete par[curr.uid].recurrenceid;
          }
        } else if (component === 'VALARM' && (par.type === 'VEVENT' || par.type === 'VTODO')) {
          par.alarms ??= [];
          par.alarms.push(curr);
        } else {
          const id = randomUUID();
          par[id] = curr;

          if (par.method) { // RFC5545, 3.2
            par[id].method = par.method;
          }
        }

        return par;
      };

      // Recurrence rules are only valid for VEVENT, VTODO, and VJOURNAL.
      // More specifically, we need to filter the VCALENDAR type because we might end up with a defined rrule
      // due to the subtypes.

      if ((value === 'VEVENT' || value === 'VTODO' || value === 'VJOURNAL') && curr.rrule) {
        let rule = curr.rrule.replace('RRULE:', '');
        // Make sure the rrule starts with FREQ=
        rule = rule.slice(rule.lastIndexOf('FREQ='));
        // If no rule start date
        if (rule.includes('DTSTART') === false) {
          // This a whole day event
          if (curr.datetype === 'date') {
            const originalStart = curr.start;

            // Date-only: pass the wall-clock date from the local components directly,
            // no system-timezone offset compensation needed.
            const y = originalStart.getFullYear();
            const m = originalStart.getMonth();
            const d = originalStart.getDate();

            // Rebuild as local midnight so downstream RRULE string formatting is unaffected
            curr.start = new Date(y, m, d, 0, 0, 0, 0);

            // Preserve any metadata that was attached to the original Date instance.
            if (originalStart && originalStart.tz) {
              tzUtil.attachTz(curr.start, originalStart?.tz);
            }

            if (originalStart && originalStart.dateOnly === true) {
              curr.start.dateOnly = true;
            }
          }

          // If the date has an toISOString function
          if (curr.start && typeof curr.start.toISOString === 'function') {
            try {
              // If the original date has a TZID, add it
              // BUT: UTC (Etc/UTC, UTC, Etc/GMT) should use ISO format with Z, not TZID
              const isUtc = tzUtil.isUtcTimezone(curr.start.tz);

              // For date-only events (VALUE=DATE), we need to preserve that information
              // so rrule-temporal can properly validate UNTIL values.
              // Use local date components since dateOnly dates are created with local timezone
              // (see dateParameter where new Date(year, month, day) is used without UTC)
              if (curr.start.dateOnly) {
                // Format: YYYYMMDD using local date components
                const year = curr.start.getFullYear();
                const month = String(curr.start.getMonth() + 1).padStart(2, '0');
                const day = String(curr.start.getDate()).padStart(2, '0');
                rule += `;DTSTART;VALUE=DATE:${year}${month}${day}`;
              } else if (curr.start.tz && !isUtc) {
                const tzInfo = tzUtil.resolveTZID(curr.start.tz);
                const localStamp = tzUtil.formatDateForRrule(curr.start, tzInfo);
                const tzidLabel = tzInfo.iana || tzInfo.etc || tzInfo.original;

                if (localStamp && tzidLabel) {
                  // RFC5545 requires DTSTART to be expressed in local time when a TZID is present.
                  rule += `;DTSTART;TZID=${tzidLabel}:${localStamp}`;
                } else if (localStamp) {
                  // Fall back to a floating DTSTART (still without a trailing Z) if we lack a dependable TZ label.
                  rule += `;DTSTART=${localStamp}`;
                } else {
                  // Ultimate fallback: emit a UTC value (legacy behaviour) rather than crashing.
                  rule += `;DTSTART=${curr.start.toISOString().replaceAll('-', '').replaceAll(':', '')}`;
                }
              } else {
                rule += `;DTSTART=${curr.start.toISOString().replaceAll('-', '').replaceAll(':', '')}`;
              }

              rule = rule.replace(/\.\d{3}/v, '');
            } catch (error) { // This should not happen, issue #56
              throw new Error('ERROR when trying to convert to ISOString ' + error, {cause: error});
            }
          } else {
            throw new Error('No toISOString function in curr.start ' + curr.start);
          }
        }

        // Create RRuleTemporal with separate DTSTART and RRULE parameters
        if (curr.start) {
          // Extract RRULE segments while preserving everything except inline DTSTART
          // When rule contains DTSTART;TZID=..., splitting on ';' produces orphaned
          // TZID= and VALUE= segments that must also be filtered out
          let rruleOnly = rule.split(';')
            .filter(segment =>
              !segment.startsWith('DTSTART')
              && !segment.startsWith('VALUE=')
              && !segment.startsWith('TZID='))
            .join(';');

          // Normalize UNTIL for rrule-temporal 1.4.2+ compatibility:
          // - DATE-only DTSTART: UNTIL must also be DATE-only (strip time)
          // - DATE-TIME DTSTART: UNTIL must be UTC with Z suffix
          if (rruleOnly.includes('UNTIL=')) {
            const untilMatch = rruleOnly.match(/UNTIL=(\d{8})(T\d{6})?(Z)?/v);
            if (untilMatch) {
              const [, datePart, timePart, zSuffix] = untilMatch;

              if (curr.start.dateOnly) {
                // DATE-only: strip time from UNTIL
                if (timePart) {
                  rruleOnly = rruleOnly.replace(/UNTIL=\d{8}T\d{6}Z?/v, `UNTIL=${datePart}`);
                }
              } else if (timePart && !zSuffix) {
                // DATE-TIME without Z: convert to UTC if we have a timezone, otherwise just append Z
                let converted = false;
                if (curr.start.tz) {
                  try {
                    const tzInfo = tzUtil.resolveTZID(curr.start.tz);
                    const untilLocal = datePart + timePart;
                    let untilDateObject;

                    if (tzInfo.iana && tzUtil.isValidIana(tzInfo.iana)) {
                      untilDateObject = tzUtil.parseDateTimeInZone(untilLocal, tzInfo.iana);
                    } else if (Number.isFinite(tzInfo.offsetMinutes)) {
                      untilDateObject = tzUtil.parseWithOffset(untilLocal, tzInfo.offset);
                    }

                    if (untilDateObject) {
                      const untilUtc = untilDateObject.toISOString().replaceAll('-', '').replaceAll(':', '').replace(/\.\d{3}/v, '');
                      rruleOnly = rruleOnly.replace(/UNTIL=\d{8}T\d{6}/v, `UNTIL=${untilUtc}`);
                      converted = true;
                    }
                  } catch {
                    // Fall through to append Z
                  }
                }

                if (!converted) {
                  rruleOnly = rruleOnly.replace(/UNTIL=(\d{8}T\d{6})(?!Z)/v, 'UNTIL=$1Z');
                }
              }
            }
          }

          // For DATE-only events, we need to include DTSTART;VALUE=DATE in the rruleString
          // because rrule-temporal needs to know it's a DATE (not DATE-TIME) to validate UNTIL
          if (curr.start.dateOnly) {
            // Build DTSTART;VALUE=DATE:YYYYMMDD from curr.start
            // Use local getters (not UTC) to match dateParameter which creates Date with local components
            const year = curr.start.getFullYear();
            const month = String(curr.start.getMonth() + 1).padStart(2, '0');
            const day = String(curr.start.getDate()).padStart(2, '0');
            const dtstartString = `DTSTART;VALUE=DATE:${year}${month}${day}`;

            // Prepend DTSTART to rruleString
            const fullRruleString = `${dtstartString}\nRRULE:${rruleOnly}`;

            const rruleTemporal = new RRuleTemporal({
              rruleString: fullRruleString,
            });

            curr.rrule = new RRuleCompatWrapper(rruleTemporal, true /* dateOnly */);
          } else {
            // DATE-TIME events: convert curr.start (Date) to Temporal.ZonedDateTime
            const tzInfo = curr.start.tz ? tzUtil.resolveTZID(curr.start.tz) : undefined;
            let timeZone = 'UTC';
            if (tzInfo?.iana || tzInfo?.offset) {
              timeZone = tzInfo.iana || tzInfo.offset;
            } else if (tzInfo) {
              console.warn('[node-ical] TZID resolved to neither IANA nor UTC offset; falling back to UTC for DTSTART conversion.');
            }

            let dtstartTemporal;
            try {
              dtstartTemporal = Temporal.Instant.fromEpochMilliseconds(curr.start.getTime())
                .toZonedDateTimeISO(timeZone);
            } catch (error) {
              console.warn(`[node-ical] Failed to convert timezone "${timeZone}", falling back to UTC: ${error?.message ?? String(error)}`);
              dtstartTemporal = Temporal.Instant.fromEpochMilliseconds(curr.start.getTime())
                .toZonedDateTimeISO('UTC');
            }

            const rruleTemporal = new RRuleTemporal({
              rruleString: rruleOnly,
              dtstart: dtstartTemporal,
            });

            curr.rrule = new RRuleCompatWrapper(rruleTemporal, false /* dateOnly */);
          }
        }
      }

      return originalEnd.call(this, value, parameters, curr, stack);
    },
    SUMMARY: storeParameter('summary'),
    DESCRIPTION: storeParameter('description'),
    URL: storeParameter('url'),
    UID: storeParameter('uid'),
    LOCATION: storeParameter('location'),
    DTSTART(value, parameters, curr, stack, line) {
      // If already defined, this is a duplicate for this event
      if (curr.start === undefined) {
        curr = dateParameter('start')(value, parameters, curr, stack);
        return typeParameter('datetype')(value, parameters, curr);
      }

      throw new Error('duplicate DTSTART encountered, line=' + line);
    },
    DTEND(value, parameters, curr, stack, line) {
      // If already defined, this is a duplicate for this event
      if (curr.end === undefined) {
        return dateParameter('end')(value, parameters, curr, stack);
      }

      throw new Error('duplicate DTEND encountered, line=' + line);
    },
    DUE(value, parameters, curr, stack, line) {
      // If already defined, this is a duplicate for this event
      if (curr.due === undefined) {
        return dateParameter('due')(value, parameters, curr, stack);
      }

      throw new Error('duplicate DUE encountered, line=' + line);
    },
    EXDATE: exdateParameter('exdate'),
    CLASS: storeParameter('class'),
    TRANSP: storeParameter('transparency'),
    GEO: geoParameter('geo'),
    'PERCENT-COMPLETE': storeParameter('completion'),
    COMPLETED: dateParameter('completed'),
    CATEGORIES: categoriesParameter('categories'),
    FREEBUSY: freebusyParameter('freebusy'),
    DTSTAMP: dateParameter('dtstamp'),
    CREATED: dateParameter('created'),
    'LAST-MODIFIED': dateParameter('lastmodified'),
    'RECURRENCE-ID': recurrenceParameter('recurrenceid'),
    SEQUENCE(value, parameters, curr) {
      curr.sequence = parseValue(value);
      return curr;
    },
    RRULE(value, parameters, curr, stack, line) {
      curr.rrule = line;
      return curr;
    },
  },

  handleObject(name, value, parameters, ctx, stack, line) {
    if (this.objectHandlers[name]) {
      return this.objectHandlers[name](value, parameters, ctx, stack, line);
    }

    // Handling custom properties
    if (/X-(?:-|[0-9A-Za-z_])+/v.test(name) && stack.length > 0) {
      // Trimming the leading and perform storeParam
      name = name.slice(2);
      return storeParameter(name)(value, parameters, ctx, stack, line);
    }

    return storeParameter(name.toLowerCase())(value, parameters, ctx);
  },

  /**
   * Parse iCalendar lines into a structured object.
   * Supports both sync and async (batched) modes.
   *
   * @param {string[]} lines - Array of iCalendar lines
   * @param {number} [batchSize=0] - Lines per batch (0=sync mode, >0=async batching)
   * @param {Object} [ctx] - Context object (internal, created if not provided)
   * @param {Array} [stack] - Parser stack for nested components (internal)
   * @param {number} [startIndex=0] - Current position in lines array (internal)
   * @param {Function} [cb] - Callback for async mode: cb(error, data)
   * @returns {Object|undefined} Parsed calendar data (sync mode), undefined (async mode with callback)
   *
   * @example
   * // Sync mode (no batching)
   * const data = parseLines(lines);
   *
   * @example
   * // Async mode (with batching)
   * parseLines(lines, 2000, undefined, undefined, 0, (err, data) => { ... });
   */
  parseLines(lines, batchSize = 0, ctx, stack, startIndex = 0, cb) {
    ctx ||= {};
    stack ||= [];

    let parseError = null;
    let parseResult = null;

    try {
      const endIndex = batchSize > 0 ? Math.min(startIndex + batchSize, lines.length) : lines.length;

      for (let i = startIndex; i < endIndex; i++) {
        let l = lines[i];
        // Unfold : RFC#3.1
        while (lines[i + 1] && /[ \t]/v.test(lines[i + 1][0])) {
          l += lines[i + 1].slice(1);
          i++;
        }

        // Remove any double quotes in any tzid statement // except around (utc+hh:mm
        if (l.includes('TZID=') && !l.includes('"(')) {
          l = l.replaceAll('"', '');
        }

        const exp = /^((?:-|[0-9A-Za-z_])+)((?:;(?:-|[0-9A-Za-z_])+=(?:(?:"[^"]*")|[^":;]+))*):(.*)$/v;
        let kv = l.match(exp);

        if (kv === null) {
          // Invalid line - must have k&v
          continue;
        }

        kv = kv.slice(1);

        const value = kv.at(-1);
        const name = kv[0];
        const parameters = kv[1] ? kv[1].split(';').slice(1) : [];

        ctx = this.handleObject(name, value, parameters, ctx, stack, l) || {};
      }

      // Check if more batches needed
      if (batchSize > 0 && endIndex < lines.length) {
        // Async mode: schedule next batch
        setImmediate(() => {
          this.parseLines(lines, batchSize, ctx, stack, endIndex, cb);
        });
        return; // Exit early, callback will be invoked by recursive call
      }

      // Finished parsing - prepare result
      delete ctx.type;
      delete ctx.params;
      parseResult = ctx;
    } catch (error) {
      parseError = error;
    }

    // Call callback outside try-catch to prevent double-calling if cb throws
    if (cb) {
      if (parseError) {
        cb(parseError, {});
      } else {
        cb(null, parseResult);
      }
    } else if (parseError) {
      throw parseError;
    } else {
      return parseResult;
    }
  },

  /**
   * Parse an iCalendar string.
   *
   * @param {string} string - Raw iCalendar data (ICS format)
   * @param {Function} [cb] - Optional callback for async mode: cb(error, data)
   * @returns {Object|undefined} Parsed calendar data (sync) or undefined (async)
   *
   * @example
   * // Synchronous parsing
   * const data = ical.parseICS(icsString);
   *
   * @example
   * // Asynchronous parsing with callback
   * ical.parseICS(icsString, (err, data) => {
   *   if (err) console.error(err);
   *   else console.log(data);
   * });
   *
   * @todo for v1.0: Split into separate parseICS() (sync) and parseICSAsync() (Promise-based) functions.
   * The current dual-mode API (sync if no callback, async if callback) is an anti-pattern that
   * makes the function behavior unpredictable and harder to type correctly in TypeScript.
   */
  parseICS(string, cb) {
    const lines = string.split(/\r?\n/v);

    if (cb) {
      // Async mode: use batching to prevent event loop blocking
      setImmediate(() => {
        this.parseLines(lines, PARSE_BATCH_SIZE, undefined, undefined, 0, cb);
      });
    } else {
      // Sync mode: parse all at once (no batching)
      return this.parseLines(lines);
    }
  },
};


/***/ }),

/***/ 516:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";



// Load Temporal polyfill if not natively available
const Temporal = globalThis.Temporal || (__nccwpck_require__(645)/* .Temporal */ .fE);

const tzUtil = __nccwpck_require__(610);

/**
 * Construct a date-only key (YYYY-MM-DD) from a Date object.
 * For date-only events, uses local date components to avoid timezone shifts.
 * For date-time events with a timezone, uses Temporal to extract the calendar date
 * in the original timezone (avoids UTC shift, e.g. Exchange O365 RECURRENCE-ID
 * midnight-CET becoming previous day in UTC – see GitHub issue #459).
 * For date-time events without timezone, extracts the date from the ISO timestamp.
 * @param {Date} dateValue - Date object with optional dateOnly and tz properties
 * @returns {string} Date key in YYYY-MM-DD format
 */
function getDateKey(dateValue) {
  if (dateValue.dateOnly) {
    return `${dateValue.getFullYear()}-${String(dateValue.getMonth() + 1).padStart(2, '0')}-${String(dateValue.getDate()).padStart(2, '0')}`;
  }

  // When the Date carries timezone metadata, extract the calendar date in that timezone.
  // This prevents midnight-in-local-tz (e.g. 00:00 CET = 23:00 UTC the day before)
  // from being mapped to the wrong calendar day.
  // Temporal handles both IANA zones and fixed-offset strings (e.g. "+01:00") uniformly.
  if (dateValue.tz) {
    try {
      const resolved = tzUtil.resolveTZID(dateValue.tz);
      const tzId = resolved?.iana || resolved?.offset;
      if (resolved && !tzId) {
        console.warn(
          '[node-ical] Could not resolve TZID to an IANA name or UTC offset; falling back to UTC-based date key.',
          {tzid: dateValue.tz, resolved},
        );
      }

      if (tzId) {
        return Temporal.Instant.fromEpochMilliseconds(dateValue.getTime())
          .toZonedDateTimeISO(tzId)
          .toPlainDate()
          .toString();
      }
    } catch (error) {
      console.warn(`[node-ical] Failed to resolve timezone for date key (TZID="${dateValue.tz}"), falling back to UTC: ${error?.message ?? String(error)}`);
    }
  }

  return dateValue.toISOString().slice(0, 10);
}

module.exports = {getDateKey};


/***/ }),

/***/ 610:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Thin abstraction over Intl to centralize all timezone logic
// This simplifies swapping libraries later and is easy to mock in tests.

// Load Temporal polyfill if not natively available (mirrors ical.js)
const Temporal = globalThis.Temporal || (__nccwpck_require__(645)/* .Temporal */ .fE);
const windowsZones = __nccwpck_require__(706);

// Ensure polyfill is globally available for downstream modules
globalThis.Temporal ??= Temporal;

// Minimal alias map to emulate the subset of moment.tz.link behavior tests rely on
const aliasMap = new Map();

/**
 * Normalize a Windows timezone display label so that visually similar strings compare equally.
 * Collapses whitespace, trims the result, and lowercases the value for case-insensitive lookups.
 *
 * @param {string} label
 * @returns {string}
 */
function normalizeWindowsLabel(label) {
  return String(label)
    .replaceAll(/\s+/gv, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Build an index of normalized Windows timezone labels (and common variants) to their data entries.
 * This lets us resolve the canonical IANA identifier without relying on fuzzy substring matching.
 *
 * @param {Record<string, {iana: string[]}>} source
 * @returns {Map<string, {iana: string[]}>}
 */
function buildWindowsLabelIndex(source) {
  const index = new Map();

  const addVariant = (label, data) => {
    const normalized = normalizeWindowsLabel(label);
    if (!normalized || index.has(normalized)) {
      return;
    }

    index.set(normalized, data);
  };

  for (const [label, data] of Object.entries(source)) {
    addVariant(label, data);

    const withoutOffset = label.replace(/^\(utc[^\)]*\)\s*/iv, '').replace(/^\(gmt[^\)]*\)\s*/iv, '');
    if (withoutOffset !== label) {
      addVariant(withoutOffset, data);

      if (withoutOffset.includes(',')) {
        for (const segment of withoutOffset.split(',')) {
          addVariant(segment, data);
        }
      }
    }
  }

  return index;
}

const windowsLabelIndex = buildWindowsLabelIndex(windowsZones);

/**
 * Resolve a Windows/legacy timezone label to the canonical IANA identifier exported in windowsZones.json.
 *
 * @param {string} label
 * @returns {string|null}
 */
function mapWindowsZone(label) {
  const exact = windowsZones[label];
  if (exact && Array.isArray(exact.iana) && exact.iana.length > 0) {
    return exact.iana[0];
  }

  const normalized = normalizeWindowsLabel(label);
  const indexed = windowsLabelIndex.get(normalized);
  if (indexed && Array.isArray(indexed.iana) && indexed.iana.length > 0) {
    return indexed.iana[0];
  }

  if (label.includes(',')) {
    // Some feeds pass comma-separated display names; try each segment individually.
    for (const segment of label.split(',')) {
      const variant = windowsLabelIndex.get(normalizeWindowsLabel(segment));
      if (variant && Array.isArray(variant.iana) && variant.iana.length > 0) {
        return variant.iana[0];
      }
    }
  }

  return null;
}

function pad2(value) {
  return String(value).padStart(2, '0');
}

// Memoize IANA zone validity checks to avoid repeated Intl constructor throws
const validIanaCache = new Map();

/**
 * Convert textual UTC offsets ("+05:30", "UTC-4", "(UTC+02:00)") into signed minute counts.
 *
 * @param {string} offset
 * @returns {number|undefined}
 */
function offsetLabelToMinutes(offset) {
  if (!offset) {
    return undefined;
  }

  const trimmed = String(offset)
    .trim()
    .replace(/^\(?(?:utc|gmt)\)?\s*/iv, '')
    .replace(/\)$/v, '')
    .trim();
  const match = trimmed.match(/^([+\-])(\d{1,2})(?::?(\d{2}))?$/v);
  if (!match) {
    return undefined;
  }

  const [, sign, hoursPart, minutesPart] = match;
  const hours = Number(hoursPart);
  const minutes = minutesPart ? Number(minutesPart) : 0;
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return undefined;
  }

  // Minutes must be < 60; IANA/ICS max absolute offset is 14:00
  if (minutes >= 60) {
    return undefined;
  }

  if (hours > 14 || (hours === 14 && minutes !== 0)) {
    return undefined;
  }

  const total = (hours * 60) + minutes;
  return sign === '-' ? -total : total;
}

function minutesToOffset(totalMinutes) {
  if (!Number.isFinite(totalMinutes)) {
    return undefined;
  }

  const sign = totalMinutes < 0 ? '-' : '+';
  const absolute = Math.abs(totalMinutes);
  const hours = Math.floor(absolute / 60);
  const minutes = absolute % 60;
  return `${sign}${pad2(hours)}:${pad2(minutes)}`;
}

function minutesToEtcZone(totalMinutes) {
  if (!Number.isFinite(totalMinutes)) {
    return undefined;
  }

  if (totalMinutes === 0) {
    return 'Etc/GMT';
  }

  if (totalMinutes % 60 !== 0) {
    return undefined;
  }

  const hours = Math.abs(totalMinutes) / 60;
  const sign = totalMinutes > 0 ? '-' : '+'; // Etc/GMT zones invert sign
  return `Etc/GMT${sign}${hours}`;
}

/**
 * Interpret a TZID value (IANA, Windows display name, or offset label) and return structured metadata.
 *
 * @param {string} value
 * @returns {{original: string|undefined, iana: string|undefined, offset: string|undefined, offsetMinutes: number|undefined, etc: string|undefined}}
 */
function resolveTZID(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return {
      original: undefined,
      iana: undefined,
      offset: undefined,
      offsetMinutes: undefined,
      etc: undefined,
    };
  }

  let tz = value;
  if (tz === 'tzone://Microsoft/Custom' || tz.startsWith('Customized Time Zone') || tz.startsWith('tzone://Microsoft/')) {
    tz = guessLocalZone();
  }

  tz = tz.replace(/^"(.*)"$/v, '$1');
  const original = tz;

  if (tz && (tz.includes(' ') || tz.includes(','))) {
    const mapped = mapWindowsZone(tz);
    if (mapped) {
      tz = mapped;
    }
  }

  let offsetMinutes;
  if (tz && tz.startsWith('(')) {
    const offsetMatch = tz.match(/([+\-]\d{1,2}:\d{2})/v);
    if (offsetMatch) {
      offsetMinutes = offsetLabelToMinutes(offsetMatch[1]);
    }

    tz = null;
  }

  if (offsetMinutes === undefined && tz) {
    // Handle raw offset TZIDs like "UTC+02:00", "+0530", or "GMT-4" that skip the
    // Windows-style parentheses but still represent fixed offsets.
    const mins = offsetLabelToMinutes(tz);
    if (Number.isFinite(mins)) {
      offsetMinutes = mins;
      tz = null;
    }
  }

  const exact = findExactZoneMatch(tz);
  const iana = exact || (tz && isValidIana(tz) ? tz : undefined);
  const offset = minutesToOffset(offsetMinutes);
  const etc = minutesToEtcZone(offsetMinutes);

  return {
    original,
    iana,
    offset,
    offsetMinutes,
    etc,
  };
}

/**
 * Format a Date as a local wall-time string (`YYYYMMDDTHHmmss`) suitable for RRULE DTSTART emission.
 * Converts the UTC instant to the given timezone using Temporal, then formats the wall-clock fields.
 * Accepts either an IANA zone name (via `tzInfo.iana`) or a UTC-offset zone derived from
 * `tzInfo.offsetMinutes` (e.g. `+01:00`).
 *
 * @param {Date} date
 * @param {{iana?: string, offsetMinutes?: number}} tzInfo
 * @returns {string|undefined}
 */
function formatDateForRrule(date, tzInfo = {}) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return undefined;
  }

  const tzId
    = tzInfo.iana && isValidIana(tzInfo.iana)
      ? tzInfo.iana
      : (Number.isFinite(tzInfo.offsetMinutes)
        ? minutesToOffset(tzInfo.offsetMinutes)
        : undefined);

  if (!tzId) {
    return undefined;
  }

  const {year, month, day, hour, minute, second} = Temporal.Instant.fromEpochMilliseconds(date.getTime())
    .toZonedDateTimeISO(tzId);
  return `${year}${pad2(month)}${pad2(day)}T${pad2(hour)}${pad2(minute)}${pad2(second)}`;
}

/**
 * Attach non-enumerable timezone metadata to a Date instance so downstream consumers
 * can recover the originating TZID without leaking it into JSON/string output.
 *
 * @param {Date} date
 * @param {string|undefined} tzid
 * @returns {Date|undefined}
 */
function attachTz(date, tzid) {
  if (!date || !tzid) {
    return date;
  }

  const hasSameValue = date.tz === tzid;
  const isEnumerable = Object.prototype.propertyIsEnumerable.call(date, 'tz');
  if (!hasSameValue || isEnumerable) {
    Object.defineProperty(date, 'tz', {
      value: tzid,
      enumerable: false,
      configurable: true,
      writable: false,
    });
  }

  return date;
}

function resolveZone(zone) {
  if (!zone) {
    return zone;
  }

  return aliasMap.get(zone) || zone;
}

function guessLocalZone() {
  return new Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Return the full list of IANA time zone names known to the runtime.
 *
 * We depend on Node 20+, so `Intl.supportedValuesOf('timeZone')` is guaranteed
 * to exist and yields the canonical list without requiring extra guards.
 */
function getZoneNames() {
  return Intl.supportedValuesOf('timeZone');
}

function findExactZoneMatch(tz) {
  if (!tz) {
    return undefined;
  }

  const z = resolveZone(tz);
  return isValidIana(z) ? z : undefined;
}

function isValidIana(zone) {
  if (!zone) {
    return false;
  }

  // Normalize any aliases before validation so cache keys stay consistent
  const tz = resolveZone(zone);
  if (!tz) {
    return false;
  }

  // Memoized hits avoid repeated Intl constructor work and exception cost
  if (validIanaCache.has(tz)) {
    return validIanaCache.get(tz);
  }

  try {
    // Rely on Intl throwing for invalid timeZone identifiers
    // This is more portable across Node builds than Temporal alone
    new Intl.DateTimeFormat('en-US', {timeZone: tz}).format(new Date(0));
    validIanaCache.set(tz, true);
    return true;
  } catch {
    validIanaCache.set(tz, false);
    return false;
  }
}

function parseDateTimeInZone(yyyymmddThhmmss, zone) {
  // Interpret the provided local wall time in the given IANA zone
  // and return a JS Date in UTC representing that instant.
  const s = String(yyyymmddThhmmss);
  // Support basic and extended forms
  // Try extended first: YYYY-MM-DDTHH:mm:ss
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/v);
  let fields;
  if (m) {
    fields = {
      year: Number(m[1]),
      month: Number(m[2]),
      day: Number(m[3]),
      hour: Number(m[4]),
      minute: Number(m[5]),
      second: Number(m[6] || 0),
    };
  } else {
    // Basic form: YYYYMMDDTHHmmss or YYYYMMDDTHHmm
    m = s.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?$/v);
    if (m) {
      fields = {
        year: Number(m[1]),
        month: Number(m[2]),
        day: Number(m[3]),
        hour: Number(m[4]),
        minute: Number(m[5]),
        second: Number(m[6] || 0),
      };
    }
  }

  if (!fields) {
    return undefined;
  }

  const tz = resolveZone(zone);
  // Defensive: bail out early if the zone can't be resolved to a valid IANA identifier
  if (!isValidIana(tz)) {
    return undefined;
  }

  // Use Temporal to convert local wall-clock time in the given zone to a UTC instant.
  // For DST gaps (missing hour, e.g. spring-forward): moves to the first valid instant after
  // the gap ('later' behaves identically to 'compatible'/'earlier' here).
  // For DST folds (repeated hour, e.g. fall-back): picks the second (post-DST) occurrence,
  // matching the behaviour of the previous Intl-based convergeLocalInstant implementation.
  const epochMs = Temporal.PlainDateTime.from(fields)
    .toZonedDateTime(tz, {disambiguation: 'later'})
    .epochMilliseconds;

  return attachTz(new Date(epochMs), zone);
}

function parseWithOffset(yyyymmddThhmmss, offset) {
  // Offset like +hh:mm, -hh:mm, +hhmm, -hhmm, optionally prefixed by UTC/GMT
  const s = String(yyyymmddThhmmss);
  let m = s.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?$/v);
  // Some feeds emit extended ISO `YYYY-MM-DD[T ]HH:mm[:ss]` strings alongside numeric offsets.
  // Mirror parseDateTimeInZone by accepting that form too so we don't fall back to local Date semantics.
  m ||= s.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/v);

  if (!m) {
    return undefined;
  }

  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  const hour = Number(m[4]);
  const minute = Number(m[5]);
  const second = Number(m[6] || 0);
  const totalMinutes = offsetLabelToMinutes(offset);
  if (!Number.isFinite(totalMinutes)) {
    throw new TypeError('Invalid offset string: ' + offset);
  }

  const utcMs = Date.UTC(year, month - 1, day, hour, minute, second) - (totalMinutes * 60_000);
  const normalizedOffset = minutesToOffset(totalMinutes);
  // Preserve original offset metadata so downstream consumers can recover it
  return attachTz(new Date(utcMs), normalizedOffset);
}

function utcAdd(date, amount, unit) {
  if (!(date instanceof Date)) {
    return undefined;
  }

  const msPer = {
    weeks: 7 * 24 * 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,
    hours: 60 * 60 * 1000,
    minutes: 60 * 1000,
    seconds: 1000,
  };
  const factor = msPer[unit];
  if (!factor) {
    throw new Error('Unsupported unit: ' + unit);
  }

  return new Date(date.getTime() + (amount * factor));
}

function linkAlias(arg1, arg2) {
  // Support both linkAlias('Etc/Unknown|Etc/GMT') and linkAlias('Etc/Unknown','Etc/GMT')
  if (arg2 === undefined) {
    const [a, b] = String(arg1).split('|');
    if (a && b) {
      aliasMap.set(a, b);
    }

    return;
  }

  aliasMap.set(String(arg1), String(arg2));
}

// Memoize VTIMEZONE→IANA lookups keyed by "stdOffset|dstOffset|year"
const vtimezoneIanaCache = new Map();

/**
 * Pick the STANDARD or DAYLIGHT sub-component that applies to a given reference year.
 * A VTIMEZONE may carry multiple historic observance blocks (e.g. the US rule changed in 2007).
 * We want the block whose DTSTART year is the largest one that is ≤ refYear — i.e. the most
 * recent rule that has already come into effect.
 *
 * @param {Array} blocks - Array of STANDARD or DAYLIGHT components (all same type)
 * @param {number} refYear - The event year to look up the rule for
 * @returns {Object|undefined}
 */
function pickApplicableBlock(blocks, refYear) {
  if (blocks.length === 0) {
    return undefined;
  }

  if (blocks.length === 1) {
    return blocks[0];
  }

  // Sort descending by the DTSTART year of each observance block.
  // "start" is the parsed Date for the DTSTART field inside STANDARD/DAYLIGHT.
  const getYear = block => (block.start instanceof Date ? block.start.getFullYear() : 0);
  const sorted = [...blocks].toSorted((a, b) => getYear(b) - getYear(a));

  // Take the first block whose DTSTART year is ≤ refYear (most recent applicable rule).
  // Fall back to the oldest block if all blocks start after refYear (future-only rules).
  return sorted.find(b => getYear(b) <= refYear) ?? sorted.at(-1);
}

/**
 * Attempt to match a parsed VTIMEZONE (with STANDARD/DAYLIGHT sub-components) to a
 * known IANA timezone by comparing UTC offsets at two probe dates (January and July).
 *
 * This resolves Outlook's "Customized Time Zone" and similar Microsoft-generated
 * identifiers to a real IANA zone so that recurring events that span DST boundaries
 * are handled correctly by rrule-temporal.
 *
 * Return value shape — three possible cases:
 *
 *   1. IANA zone found (DST zone):  { iana: string, offset: string }
 *      Both fields are set; `offset` holds the STANDARD (winter) offset as a
 *      convenience for callers that prefer a fixed-offset representation.
 *
 *   2. Non-DST VTIMEZONE (no DAYLIGHT block):  { iana: string|undefined, offset: string }
 *      `offset` is always the raw fixed UTC offset (e.g. "-05:00").  `iana` is
 *      set to an Etc/GMT-style zone when one maps exactly, otherwise undefined.
 *
 *   3. DST zone but no IANA match:  { iana: undefined, offset: undefined }
 *      No reliable representation is available; callers should fall back to
 *      floating/local time rather than returning a confidently wrong offset.
 *
 * @param {Object} vTimezone - Parsed VTIMEZONE object (from the node-ical parser stack)
 * @param {number} year - Reference year used to select the applicable observance block
 *   and to probe the IANA database (DST boundaries can change historically).
 * @returns {{ iana: string|undefined, offset: string|undefined }}
 */
function resolveVTimezoneToIana(vTimezone, year) {
  if (!vTimezone || typeof vTimezone !== 'object') {
    return {iana: undefined, offset: undefined};
  }

  // Reject unusable year values before they can corrupt the cache key or cause
  // Temporal.Instant.from() to throw on a malformed ISO string.
  const yearNumber = Number(year);
  if (!Number.isFinite(yearNumber) || !Number.isInteger(yearNumber)) {
    return {iana: undefined, offset: undefined};
  }

  // Collect STANDARD and DAYLIGHT sub-components
  const components = Object.values(vTimezone).filter(v => v && typeof v === 'object' && typeof v.type === 'string' && (v.type === 'STANDARD' || v.type === 'DAYLIGHT'));

  if (components.length === 0) {
    return {iana: undefined, offset: undefined};
  }

  // When multiple observance blocks exist (e.g. US pre-/post-2007 DST rule change),
  // pick the one whose DTSTART year is the newest that is still ≤ the event year.
  const standard = pickApplicableBlock(components.filter(c => c.type === 'STANDARD'), yearNumber);
  const daylight = pickApplicableBlock(components.filter(c => c.type === 'DAYLIGHT'), yearNumber);

  const stdMins = standard ? offsetLabelToMinutes(standard.tzoffsetto) : undefined;
  const dstMins = daylight ? offsetLabelToMinutes(daylight.tzoffsetto) : undefined;

  // Need at least a STANDARD offset to do anything useful
  if (!Number.isFinite(stdMins)) {
    return {iana: undefined, offset: undefined};
  }

  const stdOffset = minutesToOffset(stdMins);

  // No DST component → fixed-offset zone; try Etc/GMT mapping or return raw offset
  if (!Number.isFinite(dstMins)) {
    const etc = minutesToEtcZone(stdMins);
    return {iana: etc || undefined, offset: stdOffset};
  }

  // Cache key: unique per offset pair and year (DST boundaries can change historically)
  const cacheKey = `${stdMins}|${dstMins}|${yearNumber}`;
  if (vtimezoneIanaCache.has(cacheKey)) {
    return vtimezoneIanaCache.get(cacheKey);
  }

  // Probe two dates: mid-January (winter in NH / summer in SH) and mid-July (inverse).
  // Clamp to 1970: IANA zone data is unreliable before then (DST wasn't widely observed),
  // and ISO 8601 requires a 4-digit year — years < 1000 would produce a malformed string
  // (e.g. "1-01-15T12:00:00Z") that Temporal.Instant.from() cannot parse.
  const probeYear = String(Math.max(yearNumber, 1970)).padStart(4, '0');
  const probeJan = Temporal.Instant.from(`${probeYear}-01-15T12:00:00Z`);
  const probeJul = Temporal.Instant.from(`${probeYear}-07-15T12:00:00Z`);

  for (const zone of getZoneNames()) {
    try {
      const janOffset = probeJan.toZonedDateTimeISO(zone).offsetNanoseconds / 60_000_000_000;
      const julOffset = probeJul.toZonedDateTimeISO(zone).offsetNanoseconds / 60_000_000_000;

      // Match: both probe offsets must equal one of {stdMins, dstMins} (in either order,
      // to handle both northern and southern hemisphere DST conventions)
      const offsets = new Set([stdMins, dstMins]);
      if (offsets.has(janOffset) && offsets.has(julOffset) && janOffset !== julOffset) {
        const result = {iana: zone, offset: stdOffset};
        vtimezoneIanaCache.set(cacheKey, result);
        return result;
      }
    } catch {
      // Skip zones that Temporal/Intl cannot resolve
    }
  }

  // No IANA zone matched both probe offsets.
  // Returning stdOffset here would be silently wrong for ~50 % of timestamps
  // (those that fall in the DST period).  Return undefined instead so callers
  // fall back to floating/local time rather than applying a confident wrong offset.
  // This path should be unreachable in practice because every real DST zone is
  // present in the Temporal/Intl database; the warning is here to surface any
  // exception quickly.
  console.warn(`[node-ical] resolveVTimezoneToIana: no IANA zone matched STD=${stdMins} DST=${dstMins} for year ${yearNumber}; falling back to floating time`);
  const fallback = {iana: undefined, offset: undefined};
  vtimezoneIanaCache.set(cacheKey, fallback);
  return fallback;
}

// Public API
module.exports = {
  guessLocalZone,
  getZoneNames,
  findExactZoneMatch,
  isValidIana,
  parseDateTimeInZone,
  parseWithOffset,
  utcAdd,
  linkAlias,
  resolveTZID,
  resolveVTimezoneToIana,
  formatDateForRrule,
  attachTz,
  isUtcTimezone,
};

// Expose some internals for testing
module.exports.__test__ = {
  isUtcTimezone,
};

function isUtcTimezone(tz) {
  if (!tz) {
    return false;
  }

  const tzLower = tz.toLowerCase();
  return tzLower === 'etc/utc' || tzLower === 'utc' || tzLower === 'etc/gmt';
}


/***/ }),

/***/ 168:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(24);
const ical = __nccwpck_require__(69);
const {getDateKey} = __nccwpck_require__(516);

/**
 * ICal event object.
 *
 * These two fields are always present:
 *  - type
 *  - params
 *
 * The rest of the fields may or may not be present depending on the input.
 * Do not assume any of these fields are valid and check them before using.
 * Most types are simply there as a general guide for IDEs and users.
 *
 * @typedef iCalEvent
 * @type {object}
 *
 * @property {string} type           - Type of event.
 * @property {Array} params          - Extra event parameters.
 *
 * @property {?object} start         - When this event starts.
 * @property {?object} end           - When this event ends.
 *
 * @property {?string} summary       - Event summary string.
 * @property {?string} description   - Event description.
 *
 * @property {?object} dtstamp       - DTSTAMP field of this event.
 *
 * @property {?object} created       - When this event was created.
 * @property {?object} lastmodified  - When this event was last modified.
 *
 * @property {?string} uid           - Unique event identifier.
 *
 * @property {?string} status        - Event status.
 *
 * @property {?string} sequence      - Event sequence.
 *
 * @property {?string} url           - URL of this event.
 *
 * @property {?string} location      - Where this event occurs.
 * @property {?{
 *     lat: number, lon: number
 * }} geo                            - Lat/lon location of this event.
 *
 * @property {?Array.<string>}       - Array of event catagories.
 */
/**
 * Object containing iCal events.
 * @typedef {Object.<string, iCalEvent>} iCalData
 */
/**
 * Callback for iCal parsing functions with error and iCal data as a JavaScript object.
 * @callback icsCallback
 * @param {Error} err
 * @param {iCalData} ics
 */
/**
 * A Promise that is undefined if a compatible callback is passed.
 * @typedef {(Promise.<iCalData>|undefined)} optionalPromise
 */

// utility to allow callbacks to be used for promises
function promiseCallback(fn, cb) {
  const promise = new Promise(fn);
  if (!cb) {
    return promise;
  }

  // Store result/error outside .then/.catch to avoid double-callback
  // if the user's callback throws (the thrown error would be caught by
  // the promise chain and trigger .catch, calling cb a second time)
  let callbackError = null;
  let callbackResult = null;
  let hasResult = false;

  promise
    .then(returnValue => {
      callbackResult = returnValue;
      hasResult = true;
    })
    .catch(error => {
      callbackError = error;
    })
    .finally(() => {
      if (callbackError) {
        cb(callbackError, null);
      } else if (hasResult) {
        cb(null, callbackResult);
      }
    });
}

// Sync functions
const sync = {};
// Async functions
const async = {};
// Auto-detect functions for backwards compatibility.
const autodetect = {};

/**
 * Download an iCal file from the web and parse it.
 *
 * @param {string} url                - URL of file to request.
 * @param {Object|icsCallback} [opts] - Options to pass to fetch(). Supports headers and any standard RequestInit fields.
 *                                      Alternatively you can pass the callback function directly.
 *                                      If no callback is provided a promise will be returned.
 * @param {icsCallback} [cb]          - Callback function.
 *                                      If no callback is provided a promise will be returned.
 *
 * @returns {optionalPromise} Promise is returned if no callback is passed.
 */
async.fromURL = function (url, options, cb) {
  // Normalize overloads: (url, cb) or (url, options, cb)
  if (typeof options === 'function' && cb === undefined) {
    cb = options;
    options = undefined;
  }

  return promiseCallback((resolve, reject) => {
    const fetchOptions = (options && typeof options === 'object') ? {...options} : {};

    fetch(url, fetchOptions)
      .then(response => {
        if (!response.ok) {
          // Mimic previous error style
          throw new Error(`${response.status} ${response.statusText}`);
        }

        return response.text();
      })
      .then(data => {
        ical.parseICS(data, (error, ics) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(ics);
        });
      })
      .catch(error => {
        reject(error);
      });
  }, cb);
};

/**
 * Load iCal data from a file and parse it.
 *
 * @param {string} filename   - File path to load.
 * @param {icsCallback} [cb]  - Callback function.
 *                              If no callback is provided a promise will be returned.
 *
 * @returns {optionalPromise} Promise is returned if no callback is passed.
 */
async.parseFile = function (filename, cb) {
  return promiseCallback((resolve, reject) => {
    fs.readFile(filename, 'utf8', (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      ical.parseICS(data, (error, ics) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(ics);
      });
    });
  }, cb);
};

/**
 * Parse iCal data from a string.
 *
 * @param {string} data       - String containing iCal data.
 * @param {icsCallback} [cb]  - Callback function.
 *                              If no callback is provided a promise will be returned.
 *
 * @returns {optionalPromise} Promise is returned if no callback is passed.
 */
async.parseICS = function (data, cb) {
  return promiseCallback((resolve, reject) => {
    ical.parseICS(data, (error, ics) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(ics);
    });
  }, cb);
};

/**
 * Load iCal data from a file and parse it.
 *
 * @param {string} filename   - File path to load.
 *
 * @returns {iCalData} Parsed iCal data.
 */
sync.parseFile = function (filename) {
  const data = fs.readFileSync(filename, 'utf8');
  return ical.parseICS(data);
};

/**
 * Parse iCal data from a string.
 *
 * @param {string} data - String containing iCal data.
 *
 * @returns {iCalData} Parsed iCal data.
 */
sync.parseICS = function (data) {
  return ical.parseICS(data);
};

/**
 * Load iCal data from a file and parse it.
 *
 * @param {string} filename   - File path to load.
 * @param {icsCallback} [cb]  - Callback function.
 *                              If no callback is provided this function runs synchronously.
 *
 * @returns {iCalData|undefined} Parsed iCal data or undefined if a callback is being used.
 */
autodetect.parseFile = function (filename, cb) {
  if (!cb) {
    return sync.parseFile(filename);
  }

  async.parseFile(filename, cb);
};

/**
 * Parse iCal data from a string.
 *
 * @param {string} data       - String containing iCal data.
 * @param {icsCallback} [cb]  - Callback function.
 *                              If no callback is provided this function runs synchronously.
 *
 * @returns {iCalData|undefined} Parsed iCal data or undefined if a callback is being used.
 */
autodetect.parseICS = function (data, cb) {
  if (!cb) {
    return sync.parseICS(data);
  }

  async.parseICS(data, cb);
};

/**
 * Generate date key for EXDATE/RECURRENCE-ID lookups from an RRULE-generated date.
 * RRULE-generated dates carry no .tz or .dateOnly metadata, so isFullDay must be
 * passed explicitly to decide between local-time and UTC-based key extraction.
 * (For parsed calendar dates that carry .tz/.dateOnly, use getDateKey directly.)
 * @param {Date} date - RRULE-generated Date (no .tz, no .dateOnly)
 * @param {boolean} isFullDay
 * @returns {string} Date key in YYYY-MM-DD format
 */
function generateDateKey(date, isFullDay) {
  if (isFullDay) {
    // Full-day events: use local getters — RRULE returns local-midnight dates
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  // Timed events: UTC date portion
  return date.toISOString().slice(0, 10);
}

/**
 * Copy timezone metadata (tz, dateOnly) from source Date to target Date.
 * @param {Date} target - Target Date object to copy metadata to
 * @param {Date} source - Source Date object to copy metadata from
 * @returns {Date} Target Date with copied metadata
 */
function copyDateMeta(target, source) {
  if (source?.tz) {
    target.tz = source.tz;
  }

  if (source?.dateOnly) {
    target.dateOnly = source.dateOnly;
  }

  return target;
}

/**
 * Create date from UTC components to avoid DST issues for full-day events.
 * This ensures that a DATE value of 20250107 stays as January 7th regardless of timezone.
 * For dateOnly events, uses local components (DATE values are timezone-independent).
 * @param {Date} utcDate - Date from RRULE (UTC midnight) or dateOnly event
 * @returns {Date} Date representing the same calendar day at local midnight
 */
function createLocalDateFromUTC(utcDate) {
  // For DATE-only events (dateOnly flag set), use local components
  // because DATE values represent calendar dates, not moments in time.
  // This prevents timezone-shift issues (e.g., 20260227 in CET being
  // stored as 2026-02-26T23:00:00Z and then wrongly extracted as Feb 26)
  if (utcDate?.dateOnly) {
    const year = utcDate.getFullYear();
    const month = utcDate.getMonth();
    const day = utcDate.getDate();
    return new Date(year, month, day, 0, 0, 0, 0);
  }

  // For regular full-day events from RRULE (no dateOnly flag),
  // extract UTC components to create the local date
  const year = utcDate.getUTCFullYear();
  const month = utcDate.getUTCMonth();
  const day = utcDate.getUTCDate();
  // Create date at midnight in local timezone with same calendar day
  return new Date(year, month, day, 0, 0, 0, 0);
}

/**
 * Get event duration in milliseconds.
 * @param {object} eventData - The event data (original or override)
 * @param {boolean} isFullDay - Whether this is a full-day event
 * @returns {number} Duration in milliseconds
 */
function getEventDurationMs(eventData, isFullDay) {
  if (eventData?.start && eventData?.end) {
    return new Date(eventData.end).getTime() - new Date(eventData.start).getTime();
  }

  if (isFullDay) {
    return 24 * 60 * 60 * 1000;
  }

  return 0;
}

/**
 * Calculate end time for an event instance
 * @param {Date} start - The start time of this specific instance
 * @param {object} eventData - The event data (original or override)
 * @param {boolean} isFullDay - Whether this is a full-day event
 * @param {number} [baseDurationMs] - Base duration (used when override lacks end)
 * @returns {Date} End time for this instance
 */
function calculateEndTime(start, eventData, isFullDay, baseDurationMs) {
  const durationMs = (eventData?.start && eventData?.end)
    ? getEventDurationMs(eventData, isFullDay)
    : (baseDurationMs ?? (isFullDay ? 24 * 60 * 60 * 1000 : 0));

  return new Date(start.getTime() + durationMs);
}

/**
 * Process a non-recurring event
 * @param {object} event
 * @param {object} options
 * @returns {Array} Array of event instances
 */
function processNonRecurringEvent(event, options) {
  const {from, to, expandOngoing} = options;
  const isFullDay = event.datetype === 'date' || Boolean(event.start?.dateOnly);
  const baseDurationMs = getEventDurationMs(event, isFullDay);

  // Ensure we have a proper Date object
  let eventStart = event.start instanceof Date ? event.start : new Date(event.start);

  // For full-day events, normalize to local calendar date to avoid timezone shifts
  if (isFullDay) {
    eventStart = createLocalDateFromUTC(eventStart);
  }

  const eventEnd = calculateEndTime(eventStart, event, isFullDay, baseDurationMs);

  // Check if event is within range
  const inRange = expandOngoing
    ? (eventEnd >= from && eventStart <= to)
    : (eventStart >= from && eventStart <= to);

  if (!inRange) {
    return [];
  }

  const instance = {
    start: eventStart,
    end: eventEnd,
    summary: event.summary || '',
    isFullDay,
    isRecurring: false,
    isOverride: false,
    event,
  };

  // Preserve timezone metadata
  copyDateMeta(instance.start, event.start);
  copyDateMeta(instance.end, event.end);

  return [instance];
}

/**
 * Check if a date is excluded by EXDATE rules.
 * @param {Date} date - The instance date to check
 * @param {object} event - The calendar event
 * @param {string} dateKey - Pre-computed date key
 * @param {boolean} isFullDay - Whether the event is a full-day event
 * @returns {boolean} True if the date is excluded
 */
function isExcludedByExdate(date, event, dateKey, isFullDay) {
  if (!event.exdate) {
    return false;
  }

  if (isFullDay) {
    // Full-day: compare by calendar date using timezone-aware formatting
    // (e.g., Exchange/O365 stores EXDATE as DATE-TIME with timezone, so we need
    // to extract the calendar date in the EXDATE's timezone, not host-local time)
    // Use Set to deduplicate — exdateParameter stores the same Date under both
    // a date-key and an ISO-string key, so Object.values() can yield duplicates.
    for (const exdateValue of new Set(Object.values(event.exdate))) {
      if (exdateValue instanceof Date && getDateKey(exdateValue) === dateKey) {
        return true;
      }
    }

    return false;
  }

  // For timed events:
  //   1. Prefer an exact ISO-string match — a DATE-TIME EXDATE is stored under
  //      both dateKey AND isoKey, so only checking isoKey ensures we don't
  //      accidentally exclude the 09:00 instance when only 14:00 is excluded.
  //   2. Fall back to dateKey only when the EXDATE itself is DATE-only (dateOnly
  //      is true), which by RFC 5545 intentionally excludes every instance on
  //      that calendar day regardless of time.
  return Boolean(event.exdate[date.toISOString()] || event.exdate[dateKey]?.dateOnly);
}

/**
 * Validate that from/to are proper Dates in the right order.
 * @param {Date} from
 * @param {Date} to
 */
function validateDateRange(from, to) {
  if (!(from instanceof Date) || Number.isNaN(from.getTime())) {
    throw new TypeError('options.from must be a valid Date object');
  }

  if (!(to instanceof Date) || Number.isNaN(to.getTime())) {
    throw new TypeError('options.to must be a valid Date object');
  }

  if (from > to) {
    throw new RangeError('options.from must be before or equal to options.to');
  }
}

/**
 * Compute the effective RRULE search window from the user-facing range.
 * For full-day events the upper bound is pushed to end-of-day so RRULE doesn't
 * skip the last day due to timezone offsets.
 * For expandOngoing mode the lower bound is moved back by the event duration.
 * @param {Date} from
 * @param {Date} to
 * @param {boolean} isFullDay
 * @param {boolean} expandOngoing
 * @param {number} baseDurationMs
 * @returns {{searchFrom: Date, searchTo: Date}}
 */
function adjustSearchRange(from, to, isFullDay, expandOngoing, baseDurationMs) {
  let searchFrom;
  let searchTo;

  if (isFullDay) {
    // VALUE=DATE occurrences are anchored to UTC midnight (rrule-temporal uses
    // tzid='UTC' for all date-only events).  Normalise the caller-supplied
    // local-midnight boundaries to their UTC-midnight equivalents so that
    // rrule.between() comparisons are host-TZ-independent.
    searchFrom = new Date(Date.UTC(from.getFullYear(), from.getMonth(), from.getDate()));
    searchTo = new Date(Date.UTC(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59, 999));
  } else {
    // Timed events: if `to` is exactly local midnight, extend to end of that day
    // so events starting at any time that day are included.
    const isMidnight = to.getHours() === 0 && to.getMinutes() === 0 && to.getSeconds() === 0;
    searchFrom = from;
    searchTo = isMidnight
      ? new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59, 999)
      : to;
  }

  if (expandOngoing) {
    searchFrom = new Date(searchFrom.getTime() - baseDurationMs);
  }

  return {searchFrom, searchTo};
}

/**
 * Build a single recurring event instance for an RRULE-generated date.
 * Returns null when the date is excluded by EXDATE.
 * @param {Date} date - RRULE-generated Date
 * @param {object} event - The base VEVENT
 * @param {boolean} isFullDay - Pre-computed full-day flag
 * @param {number} baseDurationMs - Pre-computed base duration
 * @param {{excludeExdates: boolean, includeOverrides: boolean}} options
 * @returns {object|null} Event instance or null if excluded
 */
function buildRecurringInstance(date, event, isFullDay, baseDurationMs, options) {
  const {excludeExdates, includeOverrides} = options;
  const dateKey = generateDateKey(date, isFullDay);

  if (excludeExdates && isExcludedByExdate(date, event, dateKey, isFullDay)) {
    return null;
  }

  // For timed events use only the precise ISO key: storeRecurrenceOverride (ical.js)
  // stores every DATE-TIME RECURRENCE-ID under both the ISO key and the date-only
  // key, so a miss on the ISO key unambiguously means "no override for this
  // specific instance".  Falling back to the date-only key would incorrectly apply
  // a different occurrence's override when two instances share the same calendar
  // date (e.g. BYHOUR=9,15).  Full-day events have no ISO key and use dateKey only.
  const isoKey = isFullDay ? null : date.toISOString();
  const overrideEvent = includeOverrides
    && (isoKey ? event.recurrences?.[isoKey] : event.recurrences?.[dateKey]);
  const isOverride = Boolean(overrideEvent);
  const instanceEvent = isOverride ? overrideEvent : event;

  // Override's own DTSTART takes priority over the RRULE-generated date
  let start = (isOverride && instanceEvent.start)
    ? (instanceEvent.start instanceof Date ? instanceEvent.start : new Date(instanceEvent.start))
    : date;

  // Normalise full-day dates to local calendar midnight to avoid DST shifts
  if (isFullDay) {
    start = createLocalDateFromUTC(start);
  }

  const end = calculateEndTime(start, instanceEvent, isFullDay, baseDurationMs);
  const instance = {
    start,
    end,
    summary: instanceEvent.summary || event.summary || '',
    isFullDay,
    isRecurring: true,
    isOverride,
    event: instanceEvent,
  };

  copyDateMeta(instance.start, isOverride ? instanceEvent.start : event.start);
  copyDateMeta(instance.end, instanceEvent.end || event.end);

  return instance;
}

/**
 * Check if an event instance is within the specified date range
 * @param {object} instance - Event instance with start, end, isFullDay
 * @param {Date} from - Range start
 * @param {Date} to - Range end
 * @param {boolean} expandOngoing - Whether to include ongoing events
 * @returns {boolean} Whether instance is in range
 */
function isInstanceInRange(instance, from, to, expandOngoing) {
  if (instance.isFullDay) {
    // For full-day events, compare calendar dates only (ignore time component)
    const instanceDate = new Date(instance.start.getFullYear(), instance.start.getMonth(), instance.start.getDate());
    const fromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const toDate = new Date(to.getFullYear(), to.getMonth(), to.getDate());
    const instanceEndDate = new Date(instance.end.getFullYear(), instance.end.getMonth(), instance.end.getDate());

    return expandOngoing
      ? (instanceEndDate >= fromDate && instanceDate <= toDate)
      : (instanceDate >= fromDate && instanceDate <= toDate);
  }

  // For timed events: use exact timestamp comparison
  return expandOngoing
    ? (instance.end >= from && instance.start <= to)
    : (instance.start >= from && instance.start <= to);
}

/**
 * Expand a recurring event into individual instances within a date range.
 * Handles RRULE expansion, EXDATE filtering, and RECURRENCE-ID overrides.
 * Also works for non-recurring events (returns single instance if within range).
 *
 * @param {object} event - The VEVENT object (with or without rrule)
 * @param {object} options - Expansion options
 * @param {Date} options.from - Start of date range (inclusive)
 * @param {Date} options.to - End of date range (inclusive)
 * @param {boolean} [options.includeOverrides=true] - Apply RECURRENCE-ID overrides
 * @param {boolean} [options.excludeExdates=true] - Filter out EXDATE exclusions
 * @param {boolean} [options.expandOngoing=false] - Include events that started before range but still ongoing
 * @returns {Array<{start: Date, end: Date, summary: string, isFullDay: boolean, isRecurring: boolean, isOverride: boolean, event: object}>} Sorted array of event instances
 */
function expandRecurringEvent(event, options) {
  const {
    from,
    to,
    includeOverrides = true,
    excludeExdates = true,
    expandOngoing = false,
  } = options;

  validateDateRange(from, to);

  // Handle non-recurring events
  if (!event.rrule) {
    return processNonRecurringEvent(event, {from, to, expandOngoing});
  }

  const isFullDay = event.datetype === 'date' || Boolean(event.start?.dateOnly);
  const baseDurationMs = getEventDurationMs(event, isFullDay);
  const {searchFrom, searchTo} = adjustSearchRange(from, to, isFullDay, expandOngoing, baseDurationMs);
  const dates = event.rrule.between(searchFrom, searchTo, true);
  const instances = [];

  for (const date of dates) {
    const instance = buildRecurringInstance(date, event, isFullDay, baseDurationMs, {excludeExdates, includeOverrides});
    if (instance && isInstanceInRange(instance, from, to, expandOngoing)) {
      instances.push(instance);
    }
  }

  return instances.toSorted((a, b) => a.start - b.start);
}

// Export api functions
module.exports = {
  // Autodetect
  fromURL: async.fromURL,
  parseFile: autodetect.parseFile,
  parseICS: autodetect.parseICS,
  // Sync
  sync,
  // Async
  async,
  // Recurring event expansion
  expandRecurringEvent,
  // Other backwards compat things
  objectHandlers: ical.objectHandlers,
  handleObject: ical.handleObject,
  parseLines: ical.parseLines,
};


/***/ }),

/***/ 598:
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ 24:
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ 946:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
var e=__nccwpck_require__(742);const t=e.BigInt(0),n=e.BigInt(1),r=e.BigInt(2),o=e.BigInt(10),i=e.BigInt(24),a=e.BigInt(60),s=e.BigInt(1e3),c=e.BigInt(1e6),d=e.BigInt(1e9),h=e.multiply(e.BigInt(3600),d),u=e.multiply(a,d),l=e.multiply(h,i);function m(t){return"bigint"==typeof t?e.BigInt(t.toString(10)):t}function f(n){return e.equal(e.remainder(n,r),t)}function y(n){return e.lessThan(n,t)?e.unaryMinus(n):n}function p(t,n){return e.lessThan(t,n)?-1:e.greaterThan(t,n)?1:0}function g(t,n){return{quotient:e.divide(t,n),remainder:e.remainder(t,n)}}var w,v;const b="slot-epochNanoSeconds",D="slot-iso-date",T="slot-iso-date-time",M="slot-time",E="slot-calendar",I="slot-date-brand",C="slot-year-month-brand",O="slot-month-day-brand",$="slot-time-zone",Y="slot-years",R="slot-months",S="slot-weeks",j="slot-days",k="slot-hours",N="slot-minutes",x="slot-seconds",L="slot-milliseconds",P="slot-microseconds",U="slot-nanoseconds",B="date",Z="ym",F="md",H="time",z="datetime",A="instant",q="original",W="timezone-canonical",_="timezone-original",J="calendar-id",G="locale",K="options",V=new WeakMap,X=Symbol.for("@@Temporal__GetSlots");(w=globalThis)[X]||(w[X]=function(e){return V.get(e)});const Q=globalThis[X],ee=Symbol.for("@@Temporal__CreateSlots");(v=globalThis)[ee]||(v[ee]=function(e){V.set(e,Object.create(null))});const te=globalThis[ee];function ne(e,...t){if(!e||"object"!=typeof e)return!1;const n=Q(e);return!!n&&t.every((e=>e in n))}function re(e,t){const n=Q(e)?.[t];if(void 0===n)throw new TypeError(`Missing internal slot ${t}`);return n}function oe(e,t,n){const r=Q(e);if(void 0===r)throw new TypeError("Missing slots for the given container");if(r[t])throw new TypeError(`${t} already has set`);r[t]=n}const ie={};function ae(e,t){Object.defineProperty(e.prototype,Symbol.toStringTag,{value:t,writable:!1,enumerable:!1,configurable:!0});const n=Object.getOwnPropertyNames(e);for(let t=0;t<n.length;t++){const r=n[t],o=Object.getOwnPropertyDescriptor(e,r);o.configurable&&o.enumerable&&(o.enumerable=!1,Object.defineProperty(e,r,o))}const r=Object.getOwnPropertyNames(e.prototype);for(let t=0;t<r.length;t++){const n=r[t],o=Object.getOwnPropertyDescriptor(e.prototype,n);o.configurable&&o.enumerable&&(o.enumerable=!1,Object.defineProperty(e.prototype,n,o))}se(t,e),se(`${t}.prototype`,e.prototype)}function se(e,t){const n=`%${e}%`;if(void 0!==ie[n])throw new Error(`intrinsic ${e} already exists`);ie[n]=t}function ce(e){return ie[e]}function de(e,t){let n=e;if(0===n)return{div:n,mod:n};const r=Math.sign(n);n=Math.abs(n);const o=Math.trunc(1+Math.log10(n));if(t>=o)return{div:0*r,mod:r*n};if(0===t)return{div:r*n,mod:0*r};const i=n.toPrecision(o);return{div:r*Number.parseInt(i.slice(0,o-t),10),mod:r*Number.parseInt(i.slice(o-t),10)}}function he(e,t,n){let r=e,o=n;if(0===r)return o;const i=Math.sign(r)||Math.sign(o);r=Math.abs(r),o=Math.abs(o);const a=r.toPrecision(Math.trunc(1+Math.log10(r)));if(0===o)return i*Number.parseInt(a+"0".repeat(t),10);const s=a+o.toPrecision(Math.trunc(1+Math.log10(o))).padStart(t,"0");return i*Number.parseInt(s,10)}function ue(e,t){const n="negative"===t;switch(e){case"ceil":return n?"zero":"infinity";case"floor":return n?"infinity":"zero";case"expand":return"infinity";case"trunc":return"zero";case"halfCeil":return n?"half-zero":"half-infinity";case"halfFloor":return n?"half-infinity":"half-zero";case"halfExpand":return"half-infinity";case"halfTrunc":return"half-zero";case"halfEven":return"half-even"}}function le(e,t,n,r,o){return"zero"===o?e:"infinity"===o?t:n<0?e:n>0?t:"half-zero"===o?e:"half-infinity"===o?t:r?e:t}class TimeDuration{constructor(t){this.totalNs=m(t),this.sec=e.toNumber(e.divide(this.totalNs,d)),this.subsec=e.toNumber(e.remainder(this.totalNs,d))}static validateNew(t,n){if(e.greaterThan(y(t),TimeDuration.MAX))throw new RangeError(`${n} of duration time units cannot exceed ${TimeDuration.MAX} s`);return new TimeDuration(t)}static fromEpochNsDiff(t,n){const r=e.subtract(m(t),m(n));return new TimeDuration(r)}static fromComponents(t,n,r,o,i,a){const l=e.add(e.add(e.add(e.add(e.add(e.BigInt(a),e.multiply(e.BigInt(i),s)),e.multiply(e.BigInt(o),c)),e.multiply(e.BigInt(r),d)),e.multiply(e.BigInt(n),u)),e.multiply(e.BigInt(t),h));return TimeDuration.validateNew(l,"total")}abs(){return new TimeDuration(y(this.totalNs))}add(t){return TimeDuration.validateNew(e.add(this.totalNs,t.totalNs),"sum")}add24HourDays(t){return TimeDuration.validateNew(e.add(this.totalNs,e.multiply(e.BigInt(t),l)),"sum")}addToEpochNs(t){return e.add(m(t),this.totalNs)}cmp(e){return p(this.totalNs,e.totalNs)}divmod(t){const{quotient:n,remainder:r}=g(this.totalNs,e.BigInt(t));return{quotient:e.toNumber(n),remainder:new TimeDuration(r)}}fdiv(n){const r=m(n),i=e.BigInt(r);let{quotient:a,remainder:s}=g(this.totalNs,i);const c=[];let d;const h=(e.lessThan(this.totalNs,t)?-1:1)*Math.sign(e.toNumber(r));for(;!e.equal(s,t)&&c.length<50;)s=e.multiply(s,o),({quotient:d,remainder:s}=g(s,i)),c.push(Math.abs(e.toNumber(d)));return h*Number(y(a).toString()+"."+c.join(""))}isZero(){return e.equal(this.totalNs,t)}round(o,i){const a=m(o);if(e.equal(a,n))return this;const{quotient:s,remainder:c}=g(this.totalNs,a),d=e.lessThan(this.totalNs,t)?"negative":"positive",h=e.multiply(y(s),a),u=e.add(h,a),l=p(y(e.multiply(c,r)),a),w=ue(i,d),v=e.equal(y(this.totalNs),h)?h:le(h,u,l,f(s),w),b="positive"===d?v:e.unaryMinus(v);return TimeDuration.validateNew(b,"rounding")}sign(){return this.cmp(new TimeDuration(t))}subtract(t){return TimeDuration.validateNew(e.subtract(this.totalNs,t.totalNs),"difference")}}TimeDuration.MAX=e.BigInt("9007199254740991999999999"),TimeDuration.ZERO=new TimeDuration(t);const me=/[A-Za-z._][A-Za-z._0-9+-]*/,fe=new RegExp(`(?:${/(?:[+-](?:[01][0-9]|2[0-3])(?::?[0-5][0-9])?)/.source}|(?:${me.source})(?:\\/(?:${me.source}))*)`),ye=/(?:[+-]\d{6}|\d{4})/,pe=/(?:0[1-9]|1[0-2])/,ge=/(?:0[1-9]|[12]\d|3[01])/,we=new RegExp(`(${ye.source})(?:-(${pe.source})-(${ge.source})|(${pe.source})(${ge.source}))`),ve=/(\d{2})(?::(\d{2})(?::(\d{2})(?:[.,](\d{1,9}))?)?|(\d{2})(?:(\d{2})(?:[.,](\d{1,9}))?)?)?/,be=/((?:[+-])(?:[01][0-9]|2[0-3])(?::?(?:[0-5][0-9])(?::?(?:[0-5][0-9])(?:[.,](?:\d{1,9}))?)?)?)/,De=new RegExp(`([zZ])|${be.source}?`),Te=/\[(!)?([a-z_][a-z0-9_-]*)=([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\]/g,Me=new RegExp([`^${we.source}`,`(?:(?:[tT]|\\s+)${ve.source}(?:${De.source})?)?`,`(?:\\[!?(${fe.source})\\])?`,`((?:${Te.source})*)$`].join("")),Ee=new RegExp([`^[tT]?${ve.source}`,`(?:${De.source})?`,`(?:\\[!?${fe.source}\\])?`,`((?:${Te.source})*)$`].join("")),Ie=new RegExp(`^(${ye.source})-?(${pe.source})(?:\\[!?${fe.source}\\])?((?:${Te.source})*)$`),Ce=new RegExp(`^(?:--)?(${pe.source})-?(${ge.source})(?:\\[!?${fe.source}\\])?((?:${Te.source})*)$`),Oe=/(\d+)(?:[.,](\d{1,9}))?/,$e=new RegExp(`(?:${Oe.source}H)?(?:${Oe.source}M)?(?:${Oe.source}S)?`),Ye=new RegExp(`^([+-])?P${/(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?/.source}(?:T(?!$)${$e.source})?$`,"i"),Re=864e5,Se=1e6*Re,je=6e10,ke=1e8*Re,Ne=xo(ke),xe=e.unaryMinus(Ne),Le=e.add(e.subtract(xe,l),n),Pe=e.subtract(e.add(Ne,l),n),Ue=146097*Re,Be=-271821,Ze=275760,Fe=Date.UTC(1847,0,1),He=["iso8601","hebrew","islamic","islamic-umalqura","islamic-tbla","islamic-civil","islamic-rgsa","islamicc","persian","ethiopic","ethioaa","ethiopic-amete-alem","coptic","chinese","dangi","roc","indian","buddhist","japanese","gregory"],ze=new Set(["ACT","AET","AGT","ART","AST","BET","BST","CAT","CNT","CST","CTT","EAT","ECT","IET","IST","JST","MIT","NET","NST","PLT","PNT","PRT","PST","SST","VST"]);function Ae(e){return"object"==typeof e&&null!==e||"function"==typeof e}function qe(e){if("bigint"==typeof e)throw new TypeError("Cannot convert BigInt to number");return Number(e)}function We(e){if("symbol"==typeof e)throw new TypeError("Cannot convert a Symbol value to a String");return String(e)}function _e(e){const t=qe(e);if(0===t)return 0;if(Number.isNaN(t)||t===1/0||t===-1/0)throw new RangeError("invalid number value");const n=Math.trunc(t);return 0===n?0:n}function Je(e,t){const n=_e(e);if(n<=0){if(void 0!==t)throw new RangeError(`property '${t}' cannot be a a number less than one`);throw new RangeError("Cannot convert a number less than one to a positive integer")}return n}function Ge(e){const t=qe(e);if(Number.isNaN(t))throw new RangeError("not a number");if(t===1/0||t===-1/0)throw new RangeError("infinity is out of range");if(!function(e){if("number"!=typeof e||Number.isNaN(e)||e===1/0||e===-1/0)return!1;const t=Math.abs(e);return Math.floor(t)===t}(t))throw new RangeError(`unsupported fractional value ${e}`);return 0===t?0:t}function Ke(e,t){return String(e).padStart(t,"0")}function Ve(e){if("string"!=typeof e)throw new TypeError(`expected a string, not ${String(e)}`);return e}function Xe(e,t){if(Ae(e)){const t=e?.toString();if("string"==typeof t||"number"==typeof t)return t;throw new TypeError("Cannot convert object to primitive value")}return e}const Qe=["era","eraYear","year","month","monthCode","day","hour","minute","second","millisecond","microsecond","nanosecond","offset","timeZone"],et={era:We,eraYear:_e,year:_e,month:Je,monthCode:function(e){const t=Ve(Xe(e));if(t.length<3||t.length>4||"M"!==t[0]||-1==="0123456789".indexOf(t[1])||-1==="0123456789".indexOf(t[2])||t[1]+t[2]==="00"&&"L"!==t[3]||"L"!==t[3]&&void 0!==t[3])throw new RangeError(`bad month code ${t}; must match M01-M99 or M00L-M99L`);return t},day:Je,hour:_e,minute:_e,second:_e,millisecond:_e,microsecond:_e,nanosecond:_e,offset:function(e){const t=Ve(Xe(e));return sr(t),t},timeZone:Bn},tt={hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0},nt=[["years","year","date"],["months","month","date"],["weeks","week","date"],["days","day","date"],["hours","hour","time"],["minutes","minute","time"],["seconds","second","time"],["milliseconds","millisecond","time"],["microseconds","microsecond","time"],["nanoseconds","nanosecond","time"]],rt=Object.fromEntries(nt.map((e=>[e[0],e[1]]))),ot=Object.fromEntries(nt.map((([e,t])=>[t,e]))),it=nt.map((([,e])=>e)),at={day:Se,hour:36e11,minute:6e10,second:1e9,millisecond:1e6,microsecond:1e3,nanosecond:1},st=["days","hours","microseconds","milliseconds","minutes","months","nanoseconds","seconds","weeks","years"],ct=Intl.DateTimeFormat,dt=new Map;function ht(e){const t=Ao(e);let n=dt.get(t);return void 0===n&&(n=new ct("en-us",{timeZone:t,hour12:!1,era:"short",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}),dt.set(t,n)),n}function ut(e){return ne(e,b)&&!ne(e,$,E)}function lt(e){return ne(e,Y,R,j,k,N,x,L,P,U)}function mt(e){return ne(e,I)}function ft(e){return ne(e,M)}function yt(e){return ne(e,T)}function pt(e){return ne(e,C)}function gt(e){return ne(e,O)}function wt(e){return ne(e,b,$,E)}function vt(e,t){if(!t(e))throw new TypeError("invalid receiver: method called with the wrong type of this-object")}function bt(e){if(ne(e,E)||ne(e,$))throw new TypeError("with() does not support a calendar or timeZone property");if(ft(e))throw new TypeError("with() does not accept Temporal.PlainTime, use withPlainTime() instead");if(void 0!==e.calendar)throw new TypeError("with() does not support a calendar property");if(void 0!==e.timeZone)throw new TypeError("with() does not support a timeZone property")}function Dt(e,t){return"never"===t||"auto"===t&&"iso8601"===e?"":`[${"critical"===t?"!":""}u-ca=${e}]`}function Tt(e){let t,n,r=!1;for(Te.lastIndex=0;n=Te.exec(e);){const{1:o,2:i,3:a}=n;if("u-ca"===i){if(void 0===t)t=a,r="!"===o;else if("!"===o||r)throw new RangeError(`Invalid annotations in ${e}: more than one u-ca present with critical flag`)}else if("!"===o)throw new RangeError(`Unrecognized annotation: !${i}=${a}`)}return t}function Mt(e){const t=Me.exec(e);if(!t)throw new RangeError(`invalid RFC 9557 string: ${e}`);const n=Tt(t[16]);let r=t[1];if("-000000"===r)throw new RangeError(`invalid RFC 9557 string: ${e}`);const o=+r,i=+(t[2]??t[4]??1),a=+(t[3]??t[5]??1),s=void 0!==t[6],c=+(t[6]??0),d=+(t[7]??t[10]??0);let h=+(t[8]??t[11]??0);60===h&&(h=59);const u=(t[9]??t[12]??"")+"000000000",l=+u.slice(0,3),m=+u.slice(3,6),f=+u.slice(6,9);let y,p=!1;t[13]?(y=void 0,p=!0):t[14]&&(y=t[14]);const g=t[15];return Ur(o,i,a,c,d,h,l,m,f),{year:o,month:i,day:a,time:s?{hour:c,minute:d,second:h,millisecond:l,microsecond:m,nanosecond:f}:"start-of-day",tzAnnotation:g,offset:y,z:p,calendar:n}}function Et(e){const t=Ee.exec(e);let n,r,o,i,a,s,c;if(t){c=Tt(t[10]),n=+(t[1]??0),r=+(t[2]??t[5]??0),o=+(t[3]??t[6]??0),60===o&&(o=59);const e=(t[4]??t[7]??"")+"000000000";if(i=+e.slice(0,3),a=+e.slice(3,6),s=+e.slice(6,9),t[8])throw new RangeError("Z designator not supported for PlainTime")}else{let t,d;if(({time:t,z:d,calendar:c}=Mt(e)),"start-of-day"===t)throw new RangeError(`time is missing in string: ${e}`);if(d)throw new RangeError("Z designator not supported for PlainTime");({hour:n,minute:r,second:o,millisecond:i,microsecond:a,nanosecond:s}=t)}if(Pr(n,r,o,i,a,s),/[tT ][0-9][0-9]/.test(e))return{hour:n,minute:r,second:o,millisecond:i,microsecond:a,nanosecond:s,calendar:c};try{const{month:t,day:n}=Ct(e);xr(1972,t,n)}catch{try{const{year:t,month:n}=It(e);xr(t,n,1)}catch{return{hour:n,minute:r,second:o,millisecond:i,microsecond:a,nanosecond:s,calendar:c}}}throw new RangeError(`invalid RFC 9557 time-only string ${e}; may need a T prefix`)}function It(e){const t=Ie.exec(e);let n,r,o,i;if(t){o=Tt(t[3]);let a=t[1];if("-000000"===a)throw new RangeError(`invalid RFC 9557 string: ${e}`);if(n=+a,r=+t[2],i=1,void 0!==o&&"iso8601"!==o)throw new RangeError("YYYY-MM format is only valid with iso8601 calendar")}else{let t;if(({year:n,month:r,calendar:o,day:i,z:t}=Mt(e)),t)throw new RangeError("Z designator not supported for PlainYearMonth")}return{year:n,month:r,calendar:o,referenceISODay:i}}function Ct(e){const t=Ce.exec(e);let n,r,o,i;if(t){if(o=Tt(t[3]),n=+t[1],r=+t[2],void 0!==o&&"iso8601"!==o)throw new RangeError("MM-DD format is only valid with iso8601 calendar")}else{let t;if(({month:n,day:r,calendar:o,year:i,z:t}=Mt(e)),t)throw new RangeError("Z designator not supported for PlainMonthDay")}return{month:n,day:r,calendar:o,referenceISOYear:i}}const Ot=new RegExp(`^${fe.source}$`,"i"),$t=new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])?)?/.source}$`);function Yt(e){const t=Wo.test(e)?"Seconds not allowed in offset time zone":"Invalid time zone";throw new RangeError(`${t}: ${e}`)}function Rt(e){return Ot.test(e)||Yt(e),$t.test(e)?{offsetMinutes:sr(e)/6e10}:{tzName:e}}function St(e,t,n,r){let o=e,i=t,a=n;switch(r){case"reject":xr(o,i,a);break;case"constrain":({year:o,month:i,day:a}=kr(o,i,a))}return{year:o,month:i,day:a}}function jt(e,t,n,r,o,i,a){let s=e,c=t,d=n,h=r,u=o,l=i;switch(a){case"reject":Pr(s,c,d,h,u,l);break;case"constrain":s=jr(s,0,23),c=jr(c,0,59),d=jr(d,0,59),h=jr(h,0,999),u=jr(u,0,999),l=jr(l,0,999)}return{hour:s,minute:c,second:d,millisecond:h,microsecond:u,nanosecond:l}}function kt(e){if(!Ae(e))throw new TypeError("invalid duration-like");const t={years:void 0,months:void 0,weeks:void 0,days:void 0,hours:void 0,minutes:void 0,seconds:void 0,milliseconds:void 0,microseconds:void 0,nanoseconds:void 0};let n=!1;for(let r=0;r<st.length;r++){const o=st[r],i=e[o];void 0!==i&&(n=!0,t[o]=Ge(i))}if(!n)throw new TypeError("invalid duration-like");return t}function Nt({years:e,months:t,weeks:n,days:r},o,i,a){return{years:e,months:a??t,weeks:i??n,days:o??r}}function xt(e,t){return{isoDate:e,time:t}}function Lt(e){return Ho(e,"overflow",["constrain","reject"],"constrain")}function Pt(e){return Ho(e,"disambiguation",["compatible","earlier","later","reject"],"compatible")}function Ut(e,t){return Ho(e,"roundingMode",["ceil","floor","expand","trunc","halfCeil","halfFloor","halfExpand","halfTrunc","halfEven"],t)}function Bt(e,t){return Ho(e,"offset",["prefer","use","ignore","reject"],t)}function Zt(e){return Ho(e,"calendarName",["auto","always","never","critical"],"auto")}function Ft(e){let t=e.roundingIncrement;if(void 0===t)return 1;const n=_e(t);if(n<1||n>1e9)throw new RangeError(`roundingIncrement must be at least 1 and at most 1e9, not ${t}`);return n}function Ht(e,t,n){const r=n?t:t-1;if(e>r)throw new RangeError(`roundingIncrement must be at least 1 and less than ${r}, not ${e}`);if(t%e!=0)throw new RangeError(`Rounding increment must divide evenly into ${t}`)}function zt(e){const t=e.fractionalSecondDigits;if(void 0===t)return"auto";if("number"!=typeof t){if("auto"!==We(t))throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`);return"auto"}const n=Math.floor(t);if(!Number.isFinite(n)||n<0||n>9)throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`);return n}function At(e,t){switch(e){case"minute":return{precision:"minute",unit:"minute",increment:1};case"second":return{precision:0,unit:"second",increment:1};case"millisecond":return{precision:3,unit:"millisecond",increment:1};case"microsecond":return{precision:6,unit:"microsecond",increment:1};case"nanosecond":return{precision:9,unit:"nanosecond",increment:1}}switch(t){case"auto":return{precision:t,unit:"nanosecond",increment:1};case 0:return{precision:t,unit:"second",increment:1};case 1:case 2:case 3:return{precision:t,unit:"millisecond",increment:10**(3-t)};case 4:case 5:case 6:return{precision:t,unit:"microsecond",increment:10**(6-t)};case 7:case 8:case 9:return{precision:t,unit:"nanosecond",increment:10**(9-t)};default:throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t}`)}}const qt=Symbol("~required~");function Wt(e,t,n,r,o=[]){let i=[];for(let e=0;e<nt.length;e++){const t=nt[e],r=t[1],o=t[2];"datetime"!==n&&n!==o||i.push(r)}i=i.concat(o);let a=r;a===qt?a=void 0:void 0!==a&&i.push(a);let s=[];s=s.concat(i);for(let e=0;e<i.length;e++){const t=i[e],n=ot[t];void 0!==n&&s.push(n)}let c=Ho(e,t,s,a);if(void 0===c&&r===qt)throw new RangeError(`${t} is required`);return c&&c in rt?rt[c]:c}function _t(e){const t=e.relativeTo;if(void 0===t)return{};let n,r,o,i,a,s="option",c=!1;if(Ae(t)){if(wt(t))return{zonedRelativeTo:t};if(mt(t))return{plainRelativeTo:t};if(yt(t))return{plainRelativeTo:pn(re(t,T).isoDate,re(t,E))};o=Nn(t);const e=tn(o,t,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond","offset","timeZone"],[]);({isoDate:n,time:r}=on(o,e,"constrain")),({offset:a,timeZone:i}=e),void 0===a&&(s="wall")}else{let e,d,h,u,l;if(({year:h,month:u,day:l,time:r,calendar:o,tzAnnotation:e,offset:a,z:d}=Mt(Ve(t))),e)i=Bn(e),d?s="exact":a||(s="wall"),c=!0;else if(d)throw new RangeError("Z designator not supported for PlainDate relativeTo; either remove the Z or add a bracketed time zone");o||(o="iso8601"),o=zo(o),n={year:h,month:u,day:l}}return void 0===i?{plainRelativeTo:pn(n,o)}:{zonedRelativeTo:$n(mn(n,r,s,"option"===s?sr(a):0,i,"compatible","reject",c),i,o)}}function Jt(e){return 0!==re(e,Y)?"year":0!==re(e,R)?"month":0!==re(e,S)?"week":0!==re(e,j)?"day":0!==re(e,k)?"hour":0!==re(e,N)?"minute":0!==re(e,x)?"second":0!==re(e,L)?"millisecond":0!==re(e,P)?"microsecond":"nanosecond"}function Gt(e,t){return it.indexOf(e)>it.indexOf(t)?t:e}function Kt(e){return"year"===e||"month"===e||"week"===e}function Vt(e){return Kt(e)||"day"===e?"date":"time"}function Xt(e){return ce("%calendarImpl%")(e)}function Qt(e){return ce("%calendarImpl%")(re(e,E))}function en(e,t,n="date"){const r=Object.create(null),o=Xt(e).isoToDate(t,{year:!0,monthCode:!0,day:!0});return r.monthCode=o.monthCode,"month-day"!==n&&"date"!==n||(r.day=o.day),"year-month"!==n&&"date"!==n||(r.year=o.year),r}function tn(e,t,n,r,o){const i=Xt(e).extraFields(n),a=n.concat(r,i),s=Object.create(null);let c=!1;a.sort();for(let e=0;e<a.length;e++){const n=a[e],r=t[n];if(void 0!==r)c=!0,s[n]=(0,et[n])(r);else if("partial"!==o){if(o.includes(n))throw new TypeError(`required property '${n}' missing or undefined`);s[n]=tt[n]}}if("partial"===o&&!c)throw new TypeError("no supported properties found");return s}function nn(e,t="complete"){const n=["hour","microsecond","millisecond","minute","nanosecond","second"];let r=!1;const o=Object.create(null);for(let i=0;i<n.length;i++){const a=n[i],s=e[a];void 0!==s?(o[a]=_e(s),r=!0):"complete"===t&&(o[a]=0)}if(!r)throw new TypeError("invalid time-like");return o}function rn(e,t){if(Ae(e)){if(mt(e))return Lt(Zo(t)),pn(re(e,D),re(e,E));if(wt(e)){const n=zn(re(e,$),re(e,b));return Lt(Zo(t)),pn(n.isoDate,re(e,E))}if(yt(e))return Lt(Zo(t)),pn(re(e,T).isoDate,re(e,E));const n=Nn(e);return pn(Ln(n,tn(n,e,["year","month","monthCode","day"],[],[]),Lt(Zo(t))),n)}let{year:n,month:r,day:o,calendar:i,z:a}=Mt(Ve(e));if(a)throw new RangeError("Z designator not supported for PlainDate");return i||(i="iso8601"),i=zo(i),Lt(Zo(t)),pn({year:n,month:r,day:o},i)}function on(e,t,n){return xt(Ln(e,t,n),jt(t.hour,t.minute,t.second,t.millisecond,t.microsecond,t.nanosecond,n))}function an(e,t){let n,r,o;if(Ae(e)){if(yt(e))return Lt(Zo(t)),wn(re(e,T),re(e,E));if(wt(e)){const n=zn(re(e,$),re(e,b));return Lt(Zo(t)),wn(n,re(e,E))}if(mt(e))return Lt(Zo(t)),wn(xt(re(e,D),{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),re(e,E));o=Nn(e);const i=tn(o,e,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond"],[]),a=Lt(Zo(t));({isoDate:n,time:r}=on(o,i,a))}else{let i,a,s,c;if(({year:a,month:s,day:c,time:r,calendar:o,z:i}=Mt(Ve(e))),i)throw new RangeError("Z designator not supported for PlainDateTime");"start-of-day"===r&&(r={deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),Ur(a,s,c,r.hour,r.minute,r.second,r.millisecond,r.microsecond,r.nanosecond),o||(o="iso8601"),o=zo(o),Lt(Zo(t)),n={year:a,month:s,day:c}}return wn(xt(n,r),o)}function sn(e){const t=ce("%Temporal.Duration%");if(lt(e))return new t(re(e,Y),re(e,R),re(e,S),re(e,j),re(e,k),re(e,N),re(e,x),re(e,L),re(e,P),re(e,U));if(!Ae(e))return function(e){const{years:t,months:n,weeks:r,days:o,hours:i,minutes:a,seconds:s,milliseconds:c,microseconds:d,nanoseconds:h}=function(e){const t=Ye.exec(e);if(!t)throw new RangeError(`invalid duration: ${e}`);if(t.every(((e,t)=>t<2||void 0===e)))throw new RangeError(`invalid duration: ${e}`);const n="-"===t[1]?-1:1,r=void 0===t[2]?0:_e(t[2])*n,o=void 0===t[3]?0:_e(t[3])*n,i=void 0===t[4]?0:_e(t[4])*n,a=void 0===t[5]?0:_e(t[5])*n,s=void 0===t[6]?0:_e(t[6])*n,c=t[7],d=t[8],h=t[9],u=t[10],l=t[11];let m=0,f=0,y=0;if(void 0!==c){if(d??h??u??l)throw new RangeError("only the smallest unit can be fractional");y=3600*_e((c+"000000000").slice(0,9))*n}else if(m=void 0===d?0:_e(d)*n,void 0!==h){if(u??l)throw new RangeError("only the smallest unit can be fractional");y=60*_e((h+"000000000").slice(0,9))*n}else f=void 0===u?0:_e(u)*n,void 0!==l&&(y=_e((l+"000000000").slice(0,9))*n);const p=y%1e3,g=Math.trunc(y/1e3)%1e3,w=Math.trunc(y/1e6)%1e3;return f+=Math.trunc(y/1e9)%60,m+=Math.trunc(y/6e10),zr(r,o,i,a,s,m,f,w,g,p),{years:r,months:o,weeks:i,days:a,hours:s,minutes:m,seconds:f,milliseconds:w,microseconds:g,nanoseconds:p}}(e);return new(ce("%Temporal.Duration%"))(t,n,r,o,i,a,s,c,d,h)}(Ve(e));const n={years:0,months:0,weeks:0,days:0,hours:0,minutes:0,seconds:0,milliseconds:0,microseconds:0,nanoseconds:0};let r=kt(e);for(let e=0;e<st.length;e++){const t=st[e],o=r[t];void 0!==o&&(n[t]=o)}return new t(n.years,n.months,n.weeks,n.days,n.hours,n.minutes,n.seconds,n.milliseconds,n.microseconds,n.nanoseconds)}function cn(e){let t;if(Ae(e)){if(ut(e)||wt(e))return Cn(re(e,b));t=Xe(e)}else t=e;const{year:n,month:r,day:o,time:i,offset:a,z:s}=function(e){const t=Mt(e);if(!t.z&&!t.offset)throw new RangeError("Temporal.Instant requires a time zone offset");return t}(Ve(t)),{hour:c=0,minute:d=0,second:h=0,millisecond:u=0,microsecond:l=0,nanosecond:m=0}="start-of-day"===i?{}:i,f=$r(n,r,o,c,d,h,u,l,m-(s?0:sr(a)));return Kr(f.isoDate),Cn(pr(f))}function dn(e,t){if(Ae(e)){if(gt(e))return Lt(Zo(t)),bn(re(e,D),re(e,E));let n;return ne(e,E)?n=re(e,E):(n=e.calendar,void 0===n&&(n="iso8601"),n=kn(n)),bn(Un(n,tn(n,e,["year","month","monthCode","day"],[],[]),Lt(Zo(t))),n)}let{month:n,day:r,referenceISOYear:o,calendar:i}=Ct(Ve(e));if(void 0===i&&(i="iso8601"),i=zo(i),Lt(Zo(t)),"iso8601"===i)return bn({year:1972,month:n,day:r},i);let a={year:o,month:n,day:r};return Lr(a),a=Un(i,en(i,a,"month-day"),"constrain"),bn(a,i)}function hn(e,t){let n;if(Ae(e)){if(ft(e))return Lt(Zo(t)),Tn(re(e,M));if(yt(e))return Lt(Zo(t)),Tn(re(e,T).time);if(wt(e)){const n=zn(re(e,$),re(e,b));return Lt(Zo(t)),Tn(n.time)}const{hour:r,minute:o,second:i,millisecond:a,microsecond:s,nanosecond:c}=nn(e);n=jt(r,o,i,a,s,c,Lt(Zo(t)))}else n=Et(Ve(e)),Lt(Zo(t));return Tn(n)}function un(e){return void 0===e?{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}:re(hn(e),M)}function ln(e,t){if(Ae(e)){if(pt(e))return Lt(Zo(t)),En(re(e,D),re(e,E));const n=Nn(e);return En(Pn(n,tn(n,e,["year","month","monthCode"],[],[]),Lt(Zo(t))),n)}let{year:n,month:r,referenceISODay:o,calendar:i}=It(Ve(e));void 0===i&&(i="iso8601"),i=zo(i),Lt(Zo(t));let a={year:n,month:r,day:o};return Hr(a),a=Pn(i,en(i,a,"year-month"),"constrain"),En(a,i)}function mn(t,n,r,o,i,a,s,c){if("start-of-day"===n)return _n(i,t);const d=xt(t,n);if("wall"===r||"ignore"===s)return An(i,d,a);if("exact"===r||"use"===s){const e=$r(t.year,t.month,t.day,n.hour,n.minute,n.second,n.millisecond,n.microsecond,n.nanosecond-o);Kr(e.isoDate);const r=pr(e);return Fr(r),r}Kr(t);const h=pr(d),u=Wn(i,d);for(let t=0;t<u.length;t++){const n=u[t],r=e.toNumber(e.subtract(h,n)),i=Eo(r,6e10,"halfExpand");if(r===o||c&&i===o)return n}if("reject"===s){const e=Hn(o),t=nr(d,"iso8601","auto");throw new RangeError(`Offset ${e} is invalid for ${t} in ${i}`)}return qn(u,i,d,a)}function fn(e,t){let n,r,o,i,a,s,c,d=!1,h="option";if(Ae(e)){if(wt(e)){const n=Zo(t);return Pt(n),Bt(n,"reject"),Lt(n),$n(re(e,b),re(e,$),re(e,E))}a=Nn(e);const d=tn(a,e,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond","offset","timeZone"],["timeZone"]);({offset:i,timeZone:o}=d),void 0===i&&(h="wall");const u=Zo(t);s=Pt(u),c=Bt(u,"reject");const l=Lt(u);({isoDate:n,time:r}=on(a,d,l))}else{let u,l,m,f,y;({year:m,month:f,day:y,time:r,tzAnnotation:u,offset:i,z:l,calendar:a}=function(e){const t=Mt(e);if(!t.tzAnnotation)throw new RangeError("Temporal.ZonedDateTime requires a time zone ID in brackets");return t}(Ve(e))),o=Bn(u),l?h="exact":i||(h="wall"),a||(a="iso8601"),a=zo(a),d=!0;const p=Zo(t);s=Pt(p),c=Bt(p,"reject"),Lt(p),n={year:m,month:f,day:y}}let u=0;return"option"===h&&(u=sr(i)),$n(mn(n,r,h,u,o,s,c,d),o,a)}function yn(e,t,n){Lr(t),te(e),oe(e,D,t),oe(e,E,n),oe(e,I,!0)}function pn(e,t){const n=ce("%Temporal.PlainDate%"),r=Object.create(n.prototype);return yn(r,e,t),r}function gn(e,t,n){Br(t),te(e),oe(e,T,t),oe(e,E,n)}function wn(e,t){const n=ce("%Temporal.PlainDateTime%"),r=Object.create(n.prototype);return gn(r,e,t),r}function vn(e,t,n){Lr(t),te(e),oe(e,D,t),oe(e,E,n),oe(e,O,!0)}function bn(e,t){const n=ce("%Temporal.PlainMonthDay%"),r=Object.create(n.prototype);return vn(r,e,t),r}function Dn(e,t){te(e),oe(e,M,t)}function Tn(e){const t=ce("%Temporal.PlainTime%"),n=Object.create(t.prototype);return Dn(n,e),n}function Mn(e,t,n){Hr(t),te(e),oe(e,D,t),oe(e,E,n),oe(e,C,!0)}function En(e,t){const n=ce("%Temporal.PlainYearMonth%"),r=Object.create(n.prototype);return Mn(r,e,t),r}function In(e,t){Fr(t),te(e),oe(e,b,t)}function Cn(e){const t=ce("%Temporal.Instant%"),n=Object.create(t.prototype);return In(n,e),n}function On(e,t,n,r){Fr(t),te(e),oe(e,b,t),oe(e,$,n),oe(e,E,r)}function $n(e,t,n="iso8601"){const r=ce("%Temporal.ZonedDateTime%"),o=Object.create(r.prototype);return On(o,e,t,n),o}function Yn(e){return Qe.filter((t=>void 0!==e[t]))}function Rn(e,t,n){const r=Yn(n),o=Xt(e).fieldKeysToIgnore(r),i=Object.create(null),a=Yn(t);for(let e=0;e<Qe.length;e++){let s;const c=Qe[e];a.includes(c)&&!o.includes(c)&&(s=t[c]),r.includes(c)&&(s=n[c]),void 0!==s&&(i[c]=s)}return i}function Sn(e,t,n,r){const o=Xt(e).dateAdd(t,n,r);return Lr(o),o}function jn(e,t,n,r){return Xt(e).dateUntil(t,n,r)}function kn(e){if(Ae(e)&&ne(e,E))return re(e,E);const t=Ve(e);try{return zo(t)}catch{}let n;try{({calendar:n}=Mt(t))}catch{try{({calendar:n}=Et(t))}catch{try{({calendar:n}=It(t))}catch{({calendar:n}=Ct(t))}}}return n||(n="iso8601"),zo(n)}function Nn(e){if(ne(e,E))return re(e,E);const{calendar:t}=e;return void 0===t?"iso8601":kn(t)}function xn(e,t){return zo(e)===zo(t)}function Ln(e,t,n){const r=Xt(e);r.resolveFields(t,"date");const o=r.dateToISO(t,n);return Lr(o),o}function Pn(e,t,n){const r=Xt(e);r.resolveFields(t,"year-month"),t.day=1;const o=r.dateToISO(t,n);return Hr(o),o}function Un(e,t,n){const r=Xt(e);r.resolveFields(t,"month-day");const o=r.monthDayToISOReferenceDate(t,n);return Lr(o),o}function Bn(e){if(Ae(e)&&wt(e))return re(e,$);const t=Ve(e);if("UTC"===t)return"UTC";const{tzName:n,offsetMinutes:r}=function(e){const{tzAnnotation:t,offset:n,z:r}=function(e){if(Ot.test(e))return{tzAnnotation:e,offset:void 0,z:!1};try{const{tzAnnotation:t,offset:n,z:r}=Mt(e);if(r||t||n)return{tzAnnotation:t,offset:n,z:r}}catch{}Yt(e)}(e);return t?Rt(t):r?Rt("UTC"):n?Rt(n):void 0}(t);if(void 0!==r)return mr(r);const o=hr(n);if(!o)throw new RangeError(`Unrecognized time zone ${n}`);return o.identifier}function Zn(e,t){if(e===t)return!0;const n=Rt(e).offsetMinutes,r=Rt(t).offsetMinutes;if(void 0===n&&void 0===r){const n=hr(t);if(!n)return!1;const r=hr(e);return!!r&&r.primaryIdentifier===n.primaryIdentifier}return n===r}function Fn(e,t){const n=Rt(e).offsetMinutes;return void 0!==n?6e10*n:lr(e,t)}function Hn(e){const t=e<0?"-":"+",n=Math.abs(e),r=Math.floor(n/36e11),o=Math.floor(n/6e10)%60,i=Math.floor(n/1e9)%60,a=n%1e9;return`${t}${Vn(r,o,i,a,0===i&&0===a?"minute":"auto")}`}function zn(e,t){const n=Fn(e,t);let{isoDate:{year:r,month:o,day:i},time:{hour:a,minute:s,second:c,millisecond:d,microsecond:h,nanosecond:u}}=gr(t);return $r(r,o,i,a,s,c,d,h,u+n)}function An(e,t,n){return qn(Wn(e,t),e,t,n)}function qn(t,n,r,o){const i=t.length;if(1===i)return t[0];if(i)switch(o){case"compatible":case"earlier":return t[0];case"later":return t[i-1];case"reject":throw new RangeError("multiple instants found")}if("reject"===o)throw new RangeError("multiple instants found");const a=pr(r),s=e.subtract(a,l);Fr(s);const c=Fn(n,s),d=e.add(a,l);Fr(d);const h=Fn(n,d)-c;switch(o){case"earlier":{const e=TimeDuration.fromComponents(0,0,0,0,0,-h),t=fo(r.time,e);return Wn(n,xt(Or(r.isoDate.year,r.isoDate.month,r.isoDate.day+t.deltaDays),t))[0]}case"compatible":case"later":{const e=TimeDuration.fromComponents(0,0,0,0,0,h),t=fo(r.time,e),o=Wn(n,xt(Or(r.isoDate.year,r.isoDate.month,r.isoDate.day+t.deltaDays),t));return o[o.length-1]}}}function Wn(t,n){if("UTC"===t)return Kr(n.isoDate),[pr(n)];const r=Rt(t).offsetMinutes;if(void 0!==r){const e=$r(n.isoDate.year,n.isoDate.month,n.isoDate.day,n.time.hour,n.time.minute-r,n.time.second,n.time.millisecond,n.time.microsecond,n.time.nanosecond);Kr(e.isoDate);const t=pr(e);return Fr(t),[t]}return Kr(n.isoDate),function(t,n){let r=pr(n),o=e.subtract(r,l);e.lessThan(o,xe)&&(o=r);let i=e.add(r,l);e.greaterThan(i,Ne)&&(i=r);const a=lr(t,o),s=lr(t,i),c=(a===s?[a]:[a,s]).map((o=>{const i=e.subtract(r,e.BigInt(o)),a=function(e,t){const{epochMilliseconds:n,time:{millisecond:r,microsecond:o,nanosecond:i}}=gr(t),{year:a,month:s,day:c,hour:d,minute:h,second:u}=br(e,n);return $r(a,s,c,d,h,u,r,o,i)}(t,i);if(0===jo(n,a))return Fr(i),i}));return c.filter((e=>void 0!==e))}(t,n)}function _n(t,n){const r=xt(n,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),o=Wn(t,r);if(o.length)return o[0];const i=pr(r),a=e.subtract(i,l);return Fr(a),wr(t,a)}function Jn(e){let t;return t=e<0||e>9999?(e<0?"-":"+")+Ke(Math.abs(e),6):Ke(e,4),t}function Gn(e){return Ke(e,2)}function Kn(e,t){let n;if("auto"===t){if(0===e)return"";n=Ke(e,9).replace(/0+$/,"")}else{if(0===t)return"";n=Ke(e,9).slice(0,t)}return`.${n}`}function Vn(e,t,n,r,o){let i=`${Gn(e)}:${Gn(t)}`;return"minute"===o||(i+=`:${Gn(n)}`,i+=Kn(r,o)),i}function Xn(e,t,n){let r=t;void 0===r&&(r="UTC");const o=re(e,b),i=nr(zn(r,o),"iso8601",n,"never");let a="Z";return void 0!==t&&(a=fr(Fn(r,o))),`${i}${a}`}function Qn(e,t){const n=re(e,Y),r=re(e,R),o=re(e,S),i=re(e,j),a=re(e,k),s=re(e,N),c=Mr(e);let d="";0!==n&&(d+=`${Math.abs(n)}Y`),0!==r&&(d+=`${Math.abs(r)}M`),0!==o&&(d+=`${Math.abs(o)}W`),0!==i&&(d+=`${Math.abs(i)}D`);let h="";0!==a&&(h+=`${Math.abs(a)}H`),0!==s&&(h+=`${Math.abs(s)}M`);const u=TimeDuration.fromComponents(0,0,re(e,x),re(e,L),re(e,P),re(e,U));u.isZero()&&!["second","millisecond","microsecond","nanosecond"].includes(Jt(e))&&"auto"===t||(h+=`${Math.abs(u.sec)}${Kn(Math.abs(u.subsec),t)}S`);let l=`${c<0?"-":""}P${d}`;return h&&(l=`${l}T${h}`),l}function er(e,t="auto"){const{year:n,month:r,day:o}=re(e,D);return`${Jn(n)}-${Gn(r)}-${Gn(o)}${Dt(re(e,E),t)}`}function tr({hour:e,minute:t,second:n,millisecond:r,microsecond:o,nanosecond:i},a){return Vn(e,t,n,1e6*r+1e3*o+i,a)}function nr(e,t,n,r="auto"){const{isoDate:{year:o,month:i,day:a},time:{hour:s,minute:c,second:d,millisecond:h,microsecond:u,nanosecond:l}}=e;return`${Jn(o)}-${Gn(i)}-${Gn(a)}T${Vn(s,c,d,1e6*h+1e3*u+l,n)}${Dt(t,r)}`}function rr(e,t="auto"){const{year:n,month:r,day:o}=re(e,D);let i=`${Gn(r)}-${Gn(o)}`;const a=re(e,E);"always"!==t&&"critical"!==t&&"iso8601"===a||(i=`${Jn(n)}-${i}`);const s=Dt(a,t);return s&&(i+=s),i}function or(e,t="auto"){const{year:n,month:r,day:o}=re(e,D);let i=`${Jn(n)}-${Gn(r)}`;const a=re(e,E);"always"!==t&&"critical"!==t&&"iso8601"===a||(i+=`-${Gn(o)}`);const s=Dt(a,t);return s&&(i+=s),i}function ir(e,t,n="auto",r="auto",o="auto",i=void 0){let a=re(e,b);if(i){const{unit:e,increment:t,roundingMode:n}=i;a=Io(a,t,e,n)}const s=re(e,$),c=Fn(s,a);let d=nr(zn(s,a),"iso8601",t,"never");return"never"!==o&&(d+=fr(c)),"never"!==r&&(d+=`[${"critical"===r?"!":""}${s}]`),d+=Dt(re(e,E),n),d}function ar(e){return $t.test(e)}function sr(e){const t=_o.exec(e);if(!t)throw new RangeError(`invalid time zone offset: ${e}; must match ±HH:MM[:SS.SSSSSSSSS]`);return("-"===t[1]?-1:1)*(1e9*(60*(60*+t[2]+ +(t[3]||0))+ +(t[4]||0))+ +((t[5]||0)+"000000000").slice(0,9))}let cr;const dr=Object.assign(Object.create(null),{"/":!0,"-":!0,_:!0});function hr(e){if(void 0===cr){const e=Intl.supportedValuesOf?.("timeZone");if(e){cr=new Map;for(let t=0;t<e.length;t++){const n=e[t];cr.set(Ao(n),n)}}else cr=null}const t=Ao(e);let n=cr?.get(t);if(n)return{identifier:n,primaryIdentifier:n};try{n=ht(e).resolvedOptions().timeZone}catch{return}if("antarctica/south_pole"===t&&(n="Antarctica/McMurdo"),ze.has(e))throw new RangeError(`${e} is a legacy time zone identifier from ICU. Use ${n} instead`);const r=[...t].map(((e,n)=>0===n||dr[t[n-1]]?e.toUpperCase():e)).join("").split("/");if(1===r.length)return"gb-eire"===t?{identifier:"GB-Eire",primaryIdentifier:n}:{identifier:t.length<=3||/[-0-9]/.test(t)?t.toUpperCase():r[0],primaryIdentifier:n};if("Etc"===r[0])return{identifier:`Etc/${["Zulu","Greenwich","Universal"].includes(r[1])?r[1]:r[1].toUpperCase()}`,primaryIdentifier:n};if("Us"===r[0])return{identifier:`US/${r[1]}`,primaryIdentifier:n};const o=new Map([["Act","ACT"],["Lhi","LHI"],["Nsw","NSW"],["Dar_Es_Salaam","Dar_es_Salaam"],["Port_Of_Spain","Port_of_Spain"],["Port-Au-Prince","Port-au-Prince"],["Isle_Of_Man","Isle_of_Man"],["Comodrivadavia","ComodRivadavia"],["Knox_In","Knox_IN"],["Dumontdurville","DumontDUrville"],["Mcmurdo","McMurdo"],["Denoronha","DeNoronha"],["Easterisland","EasterIsland"],["Bajanorte","BajaNorte"],["Bajasur","BajaSur"]]);return r[1]=o.get(r[1])??r[1],r.length>2&&(r[2]=o.get(r[2])??r[2]),{identifier:r.join("/"),primaryIdentifier:n}}function ur(e,t){const{year:n,month:r,day:o,hour:i,minute:a,second:s}=br(e,t);let c=t%1e3;return c<0&&(c+=1e3),1e6*(yr({isoDate:{year:n,month:r,day:o},time:{hour:i,minute:a,second:s,millisecond:c}})-t)}function lr(e,t){return ur(e,No(t,"floor"))}function mr(e){const t=e<0?"-":"+",n=Math.abs(e);return`${t}${Vn(Math.floor(n/60),n%60,0,0,"minute")}`}function fr(e){return mr(Eo(e,je,"halfExpand")/6e10)}function yr({isoDate:{year:e,month:t,day:n},time:{hour:r,minute:o,second:i,millisecond:a}}){const s=e%400,c=(e-s)/400,d=new Date;return d.setUTCHours(r,o,i,a),d.setUTCFullYear(s,t-1,n),d.getTime()+Ue*c}function pr(t){const n=yr(t),r=1e3*t.time.microsecond+t.time.nanosecond;return e.add(xo(n),e.BigInt(r))}function gr(t){let n=No(t,"trunc"),r=e.toNumber(e.remainder(t,c));r<0&&(r+=1e6,n-=1);const o=Math.floor(r/1e3)%1e3,i=r%1e3,a=new Date(n);return{epochMilliseconds:n,isoDate:{year:a.getUTCFullYear(),month:a.getUTCMonth()+1,day:a.getUTCDate()},time:{hour:a.getUTCHours(),minute:a.getUTCMinutes(),second:a.getUTCSeconds(),millisecond:a.getUTCMilliseconds(),microsecond:o,nanosecond:i}}}function wr(e,t){if("UTC"===e)return null;const n=No(t,"floor");if(n<Fe)return wr(e,xo(Fe));const r=Date.now(),o=Math.max(n,r)+366*Re*3;let i=n,a=ur(e,i),s=i,c=a;for(;a===c&&i<o;){if(s=i+2*Re*7,s>ke)return null;c=ur(e,s),a===c&&(i=s)}return a===c?null:xo(Jo((t=>ur(e,t)),i,s,a,c))}function vr(t,n){if("UTC"===t)return null;const r=No(n,"ceil"),o=Date.now(),i=o+366*Re*3;if(r>i){const n=vr(t,xo(i));if(null===n||e.lessThan(n,xo(o)))return n}if("Africa/Casablanca"===t||"Africa/El_Aaiun"===t){const e=Date.UTC(2088,0,1);if(e<r)return vr(t,xo(e))}let a=r-1;if(a<Fe)return null;let s=ur(t,a),c=a,d=s;for(;s===d&&a>Fe;){if(c=a-2*Re*7,c<Fe)return null;d=ur(t,c),s===d&&(a=c)}return s===d?null:xo(Jo((e=>ur(t,e)),c,a,d,s))}function br(e,t){return function(e){const t=e.split(/[^\w]+/);if(7!==t.length)throw new RangeError(`expected 7 parts in "${e}`);const n=+t[0],r=+t[1];let o=+t[2];const i=t[3];if("b"===i[0]||"B"===i[0])o=1-o;else if("a"!==i[0]&&"A"!==i[0])throw new RangeError(`Unknown era ${i} in "${e}`);const a="24"===t[4]?0:+t[4],s=+t[5],c=+t[6];if(!(Number.isFinite(o)&&Number.isFinite(n)&&Number.isFinite(r)&&Number.isFinite(a)&&Number.isFinite(s)&&Number.isFinite(c)))throw new RangeError(`Invalid number in "${e}`);return{year:o,month:n,day:r,hour:a,minute:s,second:c}}(ht(e).format(t))}function Dr(e){return void 0!==e&&!(e%4!=0||e%100==0&&e%400!=0)}function Tr(e,t){return{standard:[31,28,31,30,31,30,31,31,30,31,30,31],leapyear:[31,29,31,30,31,30,31,31,30,31,30,31]}[Dr(e)?"leapyear":"standard"][t-1]}function Mr(e){const t=[re(e,Y),re(e,R),re(e,S),re(e,j),re(e,k),re(e,N),re(e,x),re(e,L),re(e,P),re(e,U)];for(let e=0;e<t.length;e++){const n=t[e];if(0!==n)return n<0?-1:1}return 0}function Er(e){const t=["years","months","weeks","days"];for(let n=0;n<t.length;n++){const r=e[t[n]];if(0!==r)return r<0?-1:1}return 0}function Ir(e){const t=Er(e.date);return 0!==t?t:e.time.sign()}function Cr(e,t){let n=e,r=t;if(!Number.isFinite(n)||!Number.isFinite(r))throw new RangeError("infinity is out of range");return r-=1,n+=Math.floor(r/12),r%=12,r<0&&(r+=12),r+=1,{year:n,month:r}}function Or(e,t,n){let r=e,o=t,i=n;if(!Number.isFinite(i))throw new RangeError("infinity is out of range");({year:r,month:o}=Cr(r,o));const a=146097;if(Math.abs(i)>a){const e=Math.trunc(i/a);r+=400*e,i-=e*a}let s=0,c=o>2?r:r-1;for(;s=Dr(c)?366:365,i<-s;)r-=1,c-=1,i+=s;for(c+=1;s=Dr(c)?366:365,i>s;)r+=1,c+=1,i-=s;for(;i<1;)({year:r,month:o}=Cr(r,o-1)),i+=Tr(r,o);for(;i>Tr(r,o);)i-=Tr(r,o),({year:r,month:o}=Cr(r,o+1));return{year:r,month:o,day:i}}function $r(e,t,n,r,o,i,a,s,c){const d=Yr(r,o,i,a,s,c);return xt(Or(e,t,n+d.deltaDays),d)}function Yr(e,t,n,r,o,i){let a,s=e,c=t,d=n,h=r,u=o,l=i;({div:a,mod:l}=de(l,3)),u+=a,l<0&&(u-=1,l+=1e3),({div:a,mod:u}=de(u,3)),h+=a,u<0&&(h-=1,u+=1e3),d+=Math.trunc(h/1e3),h%=1e3,h<0&&(d-=1,h+=1e3),c+=Math.trunc(d/60),d%=60,d<0&&(c-=1,d+=60),s+=Math.trunc(c/60),c%=60,c<0&&(s-=1,c+=60);let m=Math.trunc(s/24);return s%=24,s<0&&(m-=1,s+=24),m+=0,s+=0,c+=0,d+=0,h+=0,u+=0,l+=0,{deltaDays:m,hour:s,minute:c,second:d,millisecond:h,microsecond:u,nanosecond:l}}function Rr(e,t){const n=Nt(e,0);if(0===Er(n))return e.days;const r=re(t,D),o=Sn(re(t,E),r,n,"constrain"),i=Gr(r.year,r.month-1,r.day),a=Gr(o.year,o.month-1,o.day)-i;return e.days+a}function Sr(e){return new(ce("%Temporal.Duration%"))(-re(e,Y),-re(e,R),-re(e,S),-re(e,j),-re(e,k),-re(e,N),-re(e,x),-re(e,L),-re(e,P),-re(e,U))}function jr(e,t,n){return Math.min(n,Math.max(t,e))}function kr(e,t,n){const r=jr(t,1,12);return{year:e,month:r,day:jr(n,1,Tr(e,r))}}function Nr(e,t,n){if(e<t||e>n)throw new RangeError(`value out of range: ${t} <= ${e} <= ${n}`)}function xr(e,t,n){Nr(t,1,12),Nr(n,1,Tr(e,t))}function Lr(e){Br(xt(e,{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}))}function Pr(e,t,n,r,o,i){Nr(e,0,23),Nr(t,0,59),Nr(n,0,59),Nr(r,0,999),Nr(o,0,999),Nr(i,0,999)}function Ur(e,t,n,r,o,i,a,s,c){xr(e,t,n),Pr(r,o,i,a,s,c)}function Br(t){const n=pr(t);(e.lessThan(n,Le)||e.greaterThan(n,Pe))&&Fr(n)}function Zr(e){pr(e)}function Fr(t){if(e.lessThan(t,xe)||e.greaterThan(t,Ne))throw new RangeError("date/time value is outside of supported range")}function Hr({year:e,month:t}){Nr(e,Be,Ze),e===Be?Nr(t,4,12):e===Ze&&Nr(t,1,9)}function zr(e,t,n,r,o,i,a,s,c,d){let h=0;const u=[e,t,n,r,o,i,a,s,c,d];for(let e=0;e<u.length;e++){const t=u[e];if(t===1/0||t===-1/0)throw new RangeError("infinite values not allowed as duration fields");if(0!==t){const e=t<0?-1:1;if(0!==h&&e!==h)throw new RangeError("mixed-sign values not allowed as duration fields");h=e}}if(Math.abs(e)>=2**32||Math.abs(t)>=2**32||Math.abs(n)>=2**32)throw new RangeError("years, months, and weeks must be < 2³²");const l=de(s,3),m=de(c,6),f=de(d,9),y=de(1e6*l.mod+1e3*m.mod+f.mod,9).div,p=86400*r+3600*o+60*i+a+l.div+m.div+f.div+y;if(!Number.isSafeInteger(p))throw new RangeError("total of duration time units cannot exceed 9007199254740991.999999999 s")}function Ar(e){return{date:{years:re(e,Y),months:re(e,R),weeks:re(e,S),days:re(e,j)},time:TimeDuration.fromComponents(re(e,k),re(e,N),re(e,x),re(e,L),re(e,P),re(e,U))}}function qr(e){const t=TimeDuration.fromComponents(re(e,k),re(e,N),re(e,x),re(e,L),re(e,P),re(e,U)).add24HourDays(re(e,j));return{date:{years:re(e,Y),months:re(e,R),weeks:re(e,S),days:0},time:t}}function Wr(e){const t=qr(e),n=Math.trunc(t.time.sec/86400);return zr(t.date.years,t.date.months,t.date.weeks,n,0,0,0,0,0,0),{...t.date,days:n}}function _r(e,t){const n=e.time.sign();let r=e.time.abs().subsec,o=0,i=0,a=e.time.abs().sec,s=0,c=0,d=0;switch(t){case"year":case"month":case"week":case"day":o=Math.trunc(r/1e3),r%=1e3,i=Math.trunc(o/1e3),o%=1e3,a+=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(a/60),a%=60,c=Math.trunc(s/60),s%=60,d=Math.trunc(c/24),c%=24;break;case"hour":o=Math.trunc(r/1e3),r%=1e3,i=Math.trunc(o/1e3),o%=1e3,a+=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(a/60),a%=60,c=Math.trunc(s/60),s%=60;break;case"minute":o=Math.trunc(r/1e3),r%=1e3,i=Math.trunc(o/1e3),o%=1e3,a+=Math.trunc(i/1e3),i%=1e3,s=Math.trunc(a/60),a%=60;break;case"second":o=Math.trunc(r/1e3),r%=1e3,i=Math.trunc(o/1e3),o%=1e3,a+=Math.trunc(i/1e3),i%=1e3;break;case"millisecond":o=Math.trunc(r/1e3),r%=1e3,i=he(a,3,Math.trunc(o/1e3)),o%=1e3,a=0;break;case"microsecond":o=he(a,6,Math.trunc(r/1e3)),r%=1e3,a=0;break;case"nanosecond":r=he(a,9,r),a=0}return new(ce("%Temporal.Duration%"))(e.date.years,e.date.months,e.date.weeks,e.date.days+n*d,n*c,n*s,n*a,n*i,n*o,n*r)}function Jr(e,t){return Er(e),t.sign(),{date:e,time:t}}function Gr(e,t,n){return yr({isoDate:{year:e,month:t+1,day:n},time:{hour:0,minute:0,second:0,millisecond:0}})/Re}function Kr({year:e,month:t,day:n}){if(Math.abs(Gr(e,t-1,n))>1e8)throw new RangeError("date/time value is outside the supported range")}function Vr(e,t){const n=t.hour-e.hour,r=t.minute-e.minute,o=t.second-e.second,i=t.millisecond-e.millisecond,a=t.microsecond-e.microsecond,s=t.nanosecond-e.nanosecond;return TimeDuration.fromComponents(n,r,o,i,a,s)}function Xr(e,t,n,r,o){let i=TimeDuration.fromEpochNsDiff(t,e);return i=$o(i,n,r,o),Jr({years:0,months:0,weeks:0,days:0},i)}function Qr(e,t,n,r){Zr(e),Zr(t);let o=Vr(e.time,t.time);const i=o.sign(),a=Ro(e.isoDate,t.isoDate);let s=t.isoDate;a===i&&(s=Or(s.year,s.month,s.day+i),o=o.add24HourDays(-i));const c=Gt("day",r),d=jn(n,e.isoDate,s,c);return r!==c&&(o=o.add24HourDays(d.days),d.days=0),Jr(d,o)}function eo(n,r,o,i,a){const s=e.subtract(r,n);if(e.equal(s,t))return{date:{years:0,months:0,weeks:0,days:0},time:TimeDuration.ZERO};const c=e.lessThan(s,t)?-1:1,d=zn(o,n),h=zn(o,r);let u,l=0,m=1===c?2:1,f=Vr(d.time,h.time);for(f.sign()===-c&&l++;l<=m;l++){u=xt(Or(h.isoDate.year,h.isoDate.month,h.isoDate.day-l*c),d.time);const e=An(o,u,"compatible");if(f=TimeDuration.fromEpochNsDiff(r,e),f.sign()!==-c)break}const y=Gt("day",a);return Jr(jn(i,d.isoDate,u.isoDate,y),f)}function to(t,n,r,o,i,a,s,c,d){let h,u,l,m,f=n;switch(c){case"year":{const e=Eo(f.date.years,s,"trunc");h=e,u=e+s*t,l={years:h,months:0,weeks:0,days:0},m={...l,years:u};break}case"month":{const e=Eo(f.date.months,s,"trunc");h=e,u=e+s*t,l=Nt(f.date,0,0,h),m=Nt(f.date,0,0,u);break}case"week":{const e=Nt(f.date,0,0),n=Sn(a,o.isoDate,e,"constrain"),r=jn(a,n,Or(n.year,n.month,n.day+f.date.days),"week"),i=Eo(f.date.weeks+r.weeks,s,"trunc");h=i,u=i+s*t,l=Nt(f.date,0,h),m=Nt(f.date,0,u);break}case"day":{const e=Eo(f.date.days,s,"trunc");h=e,u=e+s*t,l=Nt(f.date,h),m=Nt(f.date,u);break}}const y=Sn(a,o.isoDate,l,"constrain"),p=Sn(a,o.isoDate,m,"constrain");let g,w;const v=xt(y,o.time),b=xt(p,o.time);i?(g=An(i,v,"compatible"),w=An(i,b,"compatible")):(g=pr(v),w=pr(b));const D=TimeDuration.fromEpochNsDiff(r,g),T=TimeDuration.fromEpochNsDiff(w,g),M=ue(d,t<0?"negative":"positive"),E=D.add(D).abs().subtract(T.abs()).sign(),I=Math.abs(h)/s%2==0,C=D.isZero()?Math.abs(h):D.cmp(T)?le(Math.abs(h),Math.abs(u),E,I,M):Math.abs(u),O=new TimeDuration(e.add(e.multiply(T.totalNs,e.BigInt(h)),e.multiply(D.totalNs,e.BigInt(s*t)))).fdiv(T.totalNs),$=C===Math.abs(u);return f={date:$?m:l,time:TimeDuration.ZERO},{nudgeResult:{duration:f,nudgedEpochNs:$?w:g,didExpandCalendarUnit:$},total:O}}function no(t,n,r,o,i,a,s,c,d){let h=t;const u=Kt(c)||o&&"day"===c,l=Ir(h)<0?-1:1;let m;return u?({nudgeResult:m}=to(l,h,n,r,o,i,s,c,d)):m=o?function(t,n,r,o,i,a,s,c){let d=n;const h=Sn(i,r.isoDate,d.date,"constrain"),u=xt(h,r.time),l=xt(Or(h.year,h.month,h.day+t),r.time),m=An(o,u,"compatible"),f=An(o,l,"compatible"),y=TimeDuration.fromEpochNsDiff(f,m);if(y.sign()!==t)throw new RangeError("time zone returned inconsistent Instants");const p=e.BigInt(at[s]*a);let g=d.time.round(p,c);const w=g.subtract(y),v=w.sign()!==-t;let b,D;return v?(b=t,g=w.round(p,c),D=g.addToEpochNs(f)):(b=0,D=g.addToEpochNs(m)),{duration:Jr(Nt(d.date,d.date.days+b),g),nudgedEpochNs:D,didExpandCalendarUnit:v}}(l,h,r,o,i,s,c,d):function(t,n,r,o,i,a){let s=t;const c=s.time.add24HourDays(s.date.days),d=c.round(e.BigInt(o*at[i]),a),h=d.subtract(c),{quotient:u}=c.divmod(Se),{quotient:l}=d.divmod(Se),m=Math.sign(l-u)===c.sign(),f=h.addToEpochNs(n);let y=0,p=d;return"date"===Vt(r)&&(y=l,p=d.add(TimeDuration.fromComponents(24*-l,0,0,0,0,0))),{duration:{date:Nt(s.date,y),time:p},nudgedEpochNs:f,didExpandCalendarUnit:m}}(h,n,a,s,c,d),h=m.duration,m.didExpandCalendarUnit&&"week"!==c&&(h=function(e,t,n,r,o,i,a,s){let c=t;if(s===a)return c;const d=it.indexOf(a);for(let t=it.indexOf(s)-1;t>=d;t--){const s=it[t];if("week"===s&&"week"!==a)continue;let d;switch(s){case"year":d={years:c.date.years+e,months:0,weeks:0,days:0};break;case"month":{const t=c.date.months+e;d=Nt(c.date,0,0,t);break}case"week":{const t=c.date.weeks+e;d=Nt(c.date,0,t);break}}const h=xt(Sn(i,r.isoDate,d,"constrain"),r.time);let u;if(u=o?An(o,h,"compatible"):pr(h),p(n,u)===-e)break;c={date:d,time:TimeDuration.ZERO}}return c}(l,h,m.nudgedEpochNs,r,o,i,a,Gt(c,"day"))),h}function ro(e,t,n,r,o,i){return Kt(i)||r&&"day"===i?to(Ir(e)<0?-1:1,e,t,n,r,o,1,i,"trunc").total:Yo(e.time.add24HourDays(e.date.days),i)}function oo(e,t,n,r,o,i,a){if(0==jo(e,t))return{date:{years:0,months:0,weeks:0,days:0},time:TimeDuration.ZERO};Br(e),Br(t);const s=Qr(e,t,n,r);return"nanosecond"===i&&1===o?s:no(s,pr(t),e,null,n,r,o,i,a)}function io(e,t,n,r,o,i,a,s){if("time"===Vt(o))return Xr(e,t,i,a,s);const c=eo(e,t,n,r,o);return"nanosecond"===a&&1===i?c:no(c,t,zn(n,e),n,r,o,i,a,s)}function ao(e,t,n,r,o,i){const a=nt.reduce(((e,t)=>{const o=t[0],i=t[1],a=t[2];return"datetime"!==n&&a!==n||r.includes(i)||e.push(i,o),e}),[]);let s=Wt(t,"largestUnit",n,"auto");if(r.includes(s))throw new RangeError(`largestUnit must be one of ${a.join(", ")}, not ${s}`);const c=Ft(t);let d=Ut(t,"trunc");"since"===e&&(d=function(e){switch(e){case"ceil":return"floor";case"floor":return"ceil";case"halfCeil":return"halfFloor";case"halfFloor":return"halfCeil";default:return e}}(d));const h=Wt(t,"smallestUnit",n,o);if(r.includes(h))throw new RangeError(`smallestUnit must be one of ${a.join(", ")}, not ${h}`);const u=Gt(i,h);if("auto"===s&&(s=u),Gt(s,h)!==s)throw new RangeError(`largestUnit ${s} cannot be smaller than smallestUnit ${h}`);const l={hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[h];return void 0!==l&&Ht(c,l,!1),{largestUnit:s,roundingIncrement:c,roundingMode:d,smallestUnit:h}}function so(e,t,n,r){const o=cn(n),i=ao(e,Zo(r),"time",[],"nanosecond","second");let a=_r(Xr(re(t,b),re(o,b),i.roundingIncrement,i.smallestUnit,i.roundingMode),i.largestUnit);return"since"===e&&(a=Sr(a)),a}function co(e,t,n,r){const o=rn(n),i=re(t,E),a=re(o,E);if(!xn(i,a))throw new RangeError(`cannot compute difference between dates of ${i} and ${a} calendars`);const s=ao(e,Zo(r),"date",[],"day","day"),c=ce("%Temporal.Duration%"),d=re(t,D),h=re(o,D);if(0===Ro(d,h))return new c;let u={date:jn(i,d,h,s.largestUnit),time:TimeDuration.ZERO};if("day"!==s.smallestUnit||1!==s.roundingIncrement){const e=xt(d,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});u=no(u,pr(xt(h,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0})),e,null,i,s.largestUnit,s.roundingIncrement,s.smallestUnit,s.roundingMode)}let l=_r(u,"day");return"since"===e&&(l=Sr(l)),l}function ho(e,t,n,r){const o=an(n),i=re(t,E),a=re(o,E);if(!xn(i,a))throw new RangeError(`cannot compute difference between dates of ${i} and ${a} calendars`);const s=ao(e,Zo(r),"datetime",[],"nanosecond","day"),c=ce("%Temporal.Duration%"),d=re(t,T),h=re(o,T);if(0===jo(d,h))return new c;let u=_r(oo(d,h,i,s.largestUnit,s.roundingIncrement,s.smallestUnit,s.roundingMode),s.largestUnit);return"since"===e&&(u=Sr(u)),u}function uo(e,t,n,r){const o=hn(n),i=ao(e,Zo(r),"time",[],"nanosecond","hour");let a=Vr(re(t,M),re(o,M));a=$o(a,i.roundingIncrement,i.smallestUnit,i.roundingMode);let s=_r(Jr({years:0,months:0,weeks:0,days:0},a),i.largestUnit);return"since"===e&&(s=Sr(s)),s}function lo(e,t,n,r){const o=ln(n),i=re(t,E),a=re(o,E);if(!xn(i,a))throw new RangeError(`cannot compute difference between months of ${i} and ${a} calendars`);const s=ao(e,Zo(r),"date",["week","day"],"month","year"),c=ce("%Temporal.Duration%");if(0==Ro(re(t,D),re(o,D)))return new c;const d=en(i,re(t,D),"year-month");d.day=1;const h=Ln(i,d,"constrain"),u=en(i,re(o,D),"year-month");u.day=1;const l=Ln(i,u,"constrain");let m={date:Nt(jn(i,h,l,s.largestUnit),0,0),time:TimeDuration.ZERO};if("month"!==s.smallestUnit||1!==s.roundingIncrement){const e=xt(h,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});m=no(m,pr(xt(l,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0})),e,null,i,s.largestUnit,s.roundingIncrement,s.smallestUnit,s.roundingMode)}let f=_r(m,"day");return"since"===e&&(f=Sr(f)),f}function mo(t,n,r,o){const i=fn(r),a=re(n,E),s=re(i,E);if(!xn(a,s))throw new RangeError(`cannot compute difference between dates of ${a} and ${s} calendars`);const c=ao(t,Zo(o),"datetime",[],"nanosecond","hour"),d=re(n,b),h=re(i,b),u=ce("%Temporal.Duration%");let l;if("date"!==Vt(c.largestUnit))l=_r(Xr(d,h,c.roundingIncrement,c.smallestUnit,c.roundingMode),c.largestUnit);else{const t=re(n,$);if(!Zn(t,re(i,$)))throw new RangeError("When calculating difference between time zones, largestUnit must be 'hours' or smaller because day lengths can vary between time zones due to DST or time zone offset changes.");if(e.equal(d,h))return new u;l=_r(io(d,h,t,a,c.largestUnit,c.roundingIncrement,c.smallestUnit,c.roundingMode),"hour")}return"since"===t&&(l=Sr(l)),l}function fo({hour:e,minute:t,second:n,millisecond:r,microsecond:o,nanosecond:i},a){let s=n,c=i;return s+=a.sec,c+=a.subsec,Yr(e,t,s,r,o,c)}function yo(e,t){const n=t.addToEpochNs(e);return Fr(n),n}function po(e,t,n,r,o="constrain"){if(0===Er(r.date))return yo(e,r.time);const i=zn(t,e);return yo(An(t,xt(Sn(n,i.isoDate,r.date,o),i.time),"compatible"),r.time)}function go(e,t,n){let r=sn(n);"subtract"===e&&(r=Sr(r));const o=Gt(Jt(t),Jt(r));if(Kt(o))throw new RangeError("For years, months, or weeks arithmetic, use date arithmetic relative to a starting point");const i=qr(t),a=qr(r);return _r(Jr({years:0,months:0,weeks:0,days:0},i.time.add(a.time)),o)}function wo(e,t,n){let r=sn(n);"subtract"===e&&(r=Sr(r));const o=Jt(r);if("date"===Vt(o))throw new RangeError(`Duration field ${o} not supported by Temporal.Instant. Try Temporal.ZonedDateTime instead.`);const i=qr(r);return Cn(yo(re(t,b),i.time))}function vo(e,t,n,r){const o=re(t,E);let i=sn(n);"subtract"===e&&(i=Sr(i));const a=Wr(i),s=Lt(Zo(r));return pn(Sn(o,re(t,D),a,s),o)}function bo(e,t,n,r){let o=sn(n);"subtract"===e&&(o=Sr(o));const i=Lt(Zo(r)),a=re(t,E),s=qr(o),c=re(t,T),d=fo(c.time,s.time),h=Nt(s.date,d.deltaDays);return zr(h.years,h.months,h.weeks,h.days,0,0,0,0,0,0),wn(xt(Sn(a,c.isoDate,h,i),d),a)}function Do(e,t,n){let r=sn(n);"subtract"===e&&(r=Sr(r));const o=qr(r),{hour:i,minute:a,second:s,millisecond:c,microsecond:d,nanosecond:h}=fo(re(t,M),o.time);return Tn(jt(i,a,s,c,d,h,"reject"))}function To(e,t,n,r){let o=sn(n);"subtract"===e&&(o=Sr(o));const i=Lt(Zo(r)),a=Mr(o),s=re(t,E),c=en(s,re(t,D),"year-month");c.day=1;let d=Ln(s,c,"constrain");if(a<0){const e=Sn(s,d,{months:1},"constrain");d=Or(e.year,e.month,e.day-1)}const h=Wr(o);return Lr(d),En(Pn(s,en(s,Sn(s,d,h,i),"year-month"),i),s)}function Mo(e,t,n,r){let o=sn(n);"subtract"===e&&(o=Sr(o));const i=Lt(Zo(r)),a=re(t,$),s=re(t,E),c=Ar(o);return $n(po(re(t,b),a,s,c,i),a,s)}function Eo(e,t,n){const r=Math.trunc(e/t),o=e%t,i=e<0?"negative":"positive",a=Math.abs(r),s=a+1,c=Bo(Math.abs(2*o)-t),d=a%2==0,h=ue(n,i),u=0===o?a:le(a,s,c,d,h);return t*("positive"===i?u:-u)}function Io(o,i,a,s){const c=at[a]*i;return function(o,i,a){const s=m(o),c=m(i),d=e.divide(s,c),h=e.remainder(s,c),u=ue(a,"positive");let l,g;e.lessThan(s,t)?(l=e.subtract(d,n),g=d):(l=d,g=e.add(d,n));const w=p(y(e.multiply(h,r)),c)*(e.lessThan(s,t)?-1:1)+0,v=e.equal(h,t)?d:le(l,g,w,f(l),u);return e.multiply(v,c)}(o,e.BigInt(c),s)}function Co(e,t,n,r){Zr(e);const{year:o,month:i,day:a}=e.isoDate,s=Oo(e.time,t,n,r);return xt(Or(o,i,a+s.deltaDays),s)}function Oo({hour:e,minute:t,second:n,millisecond:r,microsecond:o,nanosecond:i},a,s,c){let d;switch(s){case"day":case"hour":d=1e3*(1e3*(1e3*(60*(60*e+t)+n)+r)+o)+i;break;case"minute":d=1e3*(1e3*(1e3*(60*t+n)+r)+o)+i;break;case"second":d=1e3*(1e3*(1e3*n+r)+o)+i;break;case"millisecond":d=1e3*(1e3*r+o)+i;break;case"microsecond":d=1e3*o+i;break;case"nanosecond":d=i}const h=at[s],u=Eo(d,h*a,c)/h;switch(s){case"day":return{deltaDays:u,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0};case"hour":return Yr(u,0,0,0,0,0);case"minute":return Yr(e,u,0,0,0,0);case"second":return Yr(e,t,u,0,0,0);case"millisecond":return Yr(e,t,n,u,0,0);case"microsecond":return Yr(e,t,n,r,u,0);case"nanosecond":return Yr(e,t,n,r,o,u);default:throw new Error(`Invalid unit ${s}`)}}function $o(t,n,r,o){const i=at[r];return t.round(e.BigInt(i*n),o)}function Yo(t,n){const r=at[n];return t.fdiv(e.BigInt(r))}function Ro(e,t){return e.year!==t.year?Bo(e.year-t.year):e.month!==t.month?Bo(e.month-t.month):e.day!==t.day?Bo(e.day-t.day):0}function So(e,t){return e.hour!==t.hour?Bo(e.hour-t.hour):e.minute!==t.minute?Bo(e.minute-t.minute):e.second!==t.second?Bo(e.second-t.second):e.millisecond!==t.millisecond?Bo(e.millisecond-t.millisecond):e.microsecond!==t.microsecond?Bo(e.microsecond-t.microsecond):e.nanosecond!==t.nanosecond?Bo(e.nanosecond-t.nanosecond):0}function jo(e,t){const n=Ro(e.isoDate,t.isoDate);return 0!==n?n:So(e.time,t.time)}function ko(e){const t=Lo(e);return void 0!==globalThis.BigInt?globalThis.BigInt(t.toString(10)):t}function No(t,n){const r=m(t),{quotient:o,remainder:i}=g(r,c);let a=e.toNumber(o);return"floor"===n&&e.toNumber(i)<0&&(a-=1),"ceil"===n&&e.toNumber(i)>0&&(a+=1),a}function xo(t){if(!Number.isInteger(t))throw new RangeError("epoch milliseconds must be an integer");return e.multiply(e.BigInt(t),c)}function Lo(t){let n=t;if("object"==typeof t){const e=t[Symbol.toPrimitive];e&&"function"==typeof e&&(n=e.call(t,"number"))}if("number"==typeof n)throw new TypeError("cannot convert number to bigint");return"bigint"==typeof n?e.BigInt(n.toString(10)):e.BigInt(n)}const Po=(()=>{let t=e.BigInt(Date.now()%1e6);return()=>{const n=Date.now(),r=e.BigInt(n),o=e.add(xo(n),t);return t=e.remainder(r,c),e.greaterThan(o,Ne)?Ne:e.lessThan(o,xe)?xe:o}})();function Uo(){return(new Intl.DateTimeFormat).resolvedOptions().timeZone}function Bo(e){return e<0?-1:e>0?1:e}function Zo(e){if(void 0===e)return Object.create(null);if(Ae(e)&&null!==e)return e;throw new TypeError("Options parameter must be an object, not "+(null===e?"null":typeof e))}function Fo(e,t){const n=Object.create(null);return n[e]=t,n}function Ho(e,t,n,r){let o=e[t];if(void 0!==o){if(o=We(o),!n.includes(o))throw new RangeError(`${t} must be one of ${n.join(", ")}, not ${o}`);return o}if(r===qt)throw new RangeError(`${t} option is required`);return r}function zo(e){const t=Ao(e);if(!He.includes(Ao(t)))throw new RangeError(`invalid calendar identifier ${t}`);switch(t){case"ethiopic-amete-alem":return"ethioaa";case"islamicc":return"islamic-civil"}return t}function Ao(e){let t="";for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);t+=r>=65&&r<=90?String.fromCharCode(r+32):String.fromCharCode(r)}return t}function qo(e){throw new TypeError(`Do not use built-in arithmetic operators with Temporal objects. When comparing, use ${"PlainMonthDay"===e?"Temporal.PlainDate.compare(obj1.toPlainDate(year), obj2.toPlainDate(year))":`Temporal.${e}.compare(obj1, obj2)`}, not obj1 > obj2. When coercing to strings, use \`\${obj}\` or String(obj), not '' + obj. When coercing to numbers, use properties or methods of the object, not \`+obj\`. When concatenating with strings, use \`\${str}\${obj}\` or str.concat(obj), not str + obj. In React, coerce to a string before rendering a Temporal object.`)}const Wo=new RegExp(`^${be.source}$`),_o=new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])(?::?([0-5][0-9])(?:[.,](\d{1,9}))?)?)?/.source}$`);function Jo(e,t,n,r=e(t),o=e(n)){let i=t,a=n,s=r,c=o;for(;a-i>1;){let t=Math.trunc((i+a)/2);const n=e(t);n===s?(i=t,s=n):n===c&&(a=t,c=n)}return a}function Go(e){return[...e]}function Ko(e,t){if("gregory"!==e&&"iso8601"!==e)return;const n=Xo[e];let r=t.year;const{dayOfWeek:o,dayOfYear:i,daysInYear:a}=n.isoToDate(t,{dayOfWeek:!0,dayOfYear:!0,daysInYear:!0}),s=n.getFirstDayOfWeek(),c=n.getMinimalDaysInFirstWeek();let d=(o+7-s)%7,h=(o-i+7001-s)%7,u=Math.floor((i-1+h)/7);if(7-h>=c&&++u,0==u)u=function(e,t,n,r){let o=(r-e-n+1)%7;o<0&&(o+=7);let i=Math.floor((n+o-1)/7);return 7-o>=t&&++i,i}(s,c,i+n.isoToDate(n.dateAdd(t,{years:-1},"constrain"),{daysInYear:!0}).daysInYear,o),r--;else if(i>=a-5){let e=(d+a-i)%7;e<0&&(e+=7),6-e>=c&&i+7-d>a&&(u=1,r++)}return{week:u,year:r}}function Vo(e,t,n,r,o){if(t!==o.year){if(e*(t-o.year)>0)return!0}else if(n!==o.month){if(e*(n-o.month)>0)return!0}else if(r!==o.day&&e*(r-o.day)>0)return!0;return!1}const Xo={};function Qo(e){if(!e.startsWith("M"))throw new RangeError(`Invalid month code: ${e}.  Month codes must start with M.`);const t=+e.slice(1);if(Number.isNaN(t))throw new RangeError(`Invalid month code: ${e}`);return t}function ei(e,t=!1){return`M${`${e}`.padStart(2,"0")}${t?"L":""}`}function ti(e,t=void 0,n=12){let{month:r,monthCode:o}=e;if(void 0===o){if(void 0===r)throw new TypeError("Either month or monthCode are required");"reject"===t&&Nr(r,1,n),"constrain"===t&&(r=jr(r,1,n)),o=ei(r)}else{const e=Qo(o);if(o!==ei(e))throw new RangeError(`Invalid month code: ${o}`);if(void 0!==r&&r!==e)throw new RangeError(`monthCode ${o} and month ${r} must match if both are present`);if(r=e,r<1||r>n)throw new RangeError(`Invalid monthCode: ${o}`)}return{...e,month:r,monthCode:o}}Xo.iso8601={resolveFields(e,t){if(("date"===t||"year-month"===t)&&void 0===e.year)throw new TypeError("year is required");if(("date"===t||"month-day"===t)&&void 0===e.day)throw new TypeError("day is required");Object.assign(e,ti(e))},dateToISO:(e,t)=>St(e.year,e.month,e.day,t),monthDayToISOReferenceDate(e,t){const{month:n,day:r}=St(e.year??1972,e.month,e.day,t);return{month:n,day:r,year:1972}},extraFields:()=>[],fieldKeysToIgnore(e){const t=new Set;for(let n=0;n<e.length;n++){const r=e[n];t.add(r),"month"===r?t.add("monthCode"):"monthCode"===r&&t.add("month")}return Go(t)},dateAdd(e,{years:t=0,months:n=0,weeks:r=0,days:o=0},i){let{year:a,month:s,day:c}=e;return a+=t,s+=n,({year:a,month:s}=Cr(a,s)),({year:a,month:s,day:c}=St(a,s,c,i)),c+=o+7*r,Or(a,s,c)},dateUntil(e,t,n){const r=-Ro(e,t);if(0===r)return{years:0,months:0,weeks:0,days:0};let o,i=0,a=0;if("year"===n||"month"===n){let s=t.year-e.year;for(0!==s&&(s-=r);!Vo(r,e.year+s,e.month,e.day,t);)i=s,s+=r;let c=r;for(o=Cr(e.year+i,e.month+c);!Vo(r,o.year,o.month,e.day,t);)a=c,c+=r,o=Cr(o.year,o.month+r);"month"===n&&(a+=12*i,i=0)}o=Cr(e.year+i,e.month+a);const s=kr(o.year,o.month,e.day);let c=0,d=Gr(t.year,t.month-1,t.day)-Gr(s.year,s.month-1,s.day);return"week"===n&&(c=Math.trunc(d/7),d%=7),{years:i,months:a,weeks:c,days:d}},isoToDate({year:e,month:t,day:n},r){const o={era:void 0,eraYear:void 0,year:e,month:t,day:n,daysInWeek:7,monthsInYear:12};if(r.monthCode&&(o.monthCode=ei(t)),r.dayOfWeek){const r=t+(t<3?10:-2),i=e-(t<3?1:0),a=Math.floor(i/100),s=i-100*a,c=(n+Math.floor(2.6*r-.2)+(s+Math.floor(s/4))+(Math.floor(a/4)-2*a))%7;o.dayOfWeek=c+(c<=0?7:0)}if(r.dayOfYear){let r=n;for(let n=t-1;n>0;n--)r+=Tr(e,n);o.dayOfYear=r}return r.weekOfYear&&(o.weekOfYear=Ko("iso8601",{year:e,month:t,day:n})),r.daysInMonth&&(o.daysInMonth=Tr(e,t)),(r.daysInYear||r.inLeapYear)&&(o.inLeapYear=Dr(e),o.daysInYear=o.inLeapYear?366:365),o},getFirstDayOfWeek:()=>1,getMinimalDaysInFirstWeek:()=>4};class OneObjectCache{constructor(e){if(this.map=new Map,this.calls=0,this.hits=0,this.misses=0,void 0!==e){let t=0;for(const n of e.map.entries()){if(++t>OneObjectCache.MAX_CACHE_ENTRIES)break;this.map.set(...n)}}}get(e){const t=this.map.get(e);return t&&(this.hits++,this.report()),this.calls++,t}set(e,t){this.map.set(e,t),this.misses++,this.report()}report(){}setObject(e){if(OneObjectCache.objectMap.get(e))throw new RangeError("object already cached");OneObjectCache.objectMap.set(e,this),this.report()}static getCacheForObject(e){let t=OneObjectCache.objectMap.get(e);return t||(t=new OneObjectCache,OneObjectCache.objectMap.set(e,t)),t}}function ni({isoYear:e,isoMonth:t,isoDay:n}){return`${Jn(e)}-${Gn(t)}-${Gn(n)}T00:00Z`}function ri(e,t){return{years:e.year-t.year,months:e.month-t.month,days:e.day-t.day}}OneObjectCache.objectMap=new WeakMap,OneObjectCache.MAX_CACHE_ENTRIES=1e3;class HelperBase{constructor(){this.eras=[],this.hasEra=!1,this.erasBeginMidYear=!1}getFormatter(){return void 0===this.formatter&&(this.formatter=new Intl.DateTimeFormat(`en-US-u-ca-${this.id}`,{day:"numeric",month:"numeric",year:"numeric",era:"short",timeZone:"UTC"})),this.formatter}getCalendarParts(e){let t=this.getFormatter(),n=new Date(e);if("-271821-04-19T00:00Z"===e){const e=t.resolvedOptions();t=new Intl.DateTimeFormat(e.locale,{...e,timeZone:"Etc/GMT+1"}),n=new Date("-271821-04-20T00:00Z")}try{return t.formatToParts(n)}catch(t){throw new RangeError(`Invalid ISO date: ${e}`)}}isoToCalendarDate(e,t){const{year:n,month:r,day:o}=e,i=JSON.stringify({func:"isoToCalendarDate",isoYear:n,isoMonth:r,isoDay:o,id:this.id}),a=t.get(i);if(a)return a;const s=ni({isoYear:n,isoMonth:r,isoDay:o}),c=this.getCalendarParts(s),d={};for(let e=0;e<c.length;e++){const{type:t,value:n}=c[e];if("year"!==t&&"relatedYear"!==t||(this.hasEra?d.eraYear=+n:d.year=+n),"month"===t){const e=/^([0-9]*)(.*?)$/.exec(n);if(!e||3!=e.length||!e[1]&&!e[2])throw new RangeError(`Unexpected month: ${n}`);if(d.month=e[1]?+e[1]:1,d.month<1)throw new RangeError(`Invalid month ${n} from ${s}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10527)`);if(d.month>13)throw new RangeError(`Invalid month ${n} from ${s}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10529)`);e[2]&&(d.monthExtra=e[2])}"day"===t&&(d.day=+n),this.hasEra&&"era"===t&&null!=n&&""!==n&&(d.era=n.split(" (")[0].normalize("NFD").replace(/[^-0-9 \p{L}]/gu,"").replace(/ /g,"-").toLowerCase())}if(this.hasEra&&void 0===d.eraYear)throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);if(this.hasEra){const e=this.eras.find((e=>d.era===e.genericName));e&&(d.era=e.code)}if(this.reviseIntlEra){const{era:t,eraYear:n}=this.reviseIntlEra(d,e);d.era=t,d.eraYear=n}this.checkIcuBugs&&this.checkIcuBugs(e);const h=this.adjustCalendarDate(d,t,"constrain",!0);if(void 0===h.year)throw new RangeError(`Missing year converting ${JSON.stringify(e)}`);if(void 0===h.month)throw new RangeError(`Missing month converting ${JSON.stringify(e)}`);if(void 0===h.day)throw new RangeError(`Missing day converting ${JSON.stringify(e)}`);return t.set(i,h),["constrain","reject"].forEach((n=>{const r=JSON.stringify({func:"calendarToIsoDate",year:h.year,month:h.month,day:h.day,overflow:n,id:this.id});t.set(r,e)})),h}validateCalendarDate(e){const{month:t,year:n,day:r,eraYear:o,monthCode:i,monthExtra:a}=e;if(void 0!==a)throw new RangeError("Unexpected `monthExtra` value");if(void 0===n&&void 0===o)throw new TypeError("year or eraYear is required");if(void 0===t&&void 0===i)throw new TypeError("month or monthCode is required");if(void 0===r)throw new RangeError("Missing day");if(void 0!==i){if("string"!=typeof i)throw new RangeError("monthCode must be a string, not "+typeof i);if(!/^M([01]?\d)(L?)$/.test(i))throw new RangeError(`Invalid monthCode: ${i}`)}if(this.hasEra&&void 0===e.era!=(void 0===e.eraYear))throw new TypeError("properties era and eraYear must be provided together")}adjustCalendarDate(e,t=void 0,n="constrain",r=!1){if("lunisolar"===this.calendarType)throw new RangeError("Override required for lunisolar calendars");let o=e;this.validateCalendarDate(o);const i=this.monthsInYear(o,t);let{month:a,monthCode:s}=o;return({month:a,monthCode:s}=ti(o,n,i)),{...o,month:a,monthCode:s}}regulateMonthDayNaive(e,t,n){const r=this.monthsInYear(e,n);let{month:o,day:i}=e;return"reject"===t?(Nr(o,1,r),Nr(i,1,this.maximumMonthLength(e))):(o=jr(o,1,r),i=jr(i,1,this.maximumMonthLength({...e,month:o}))),{...e,month:o,day:i}}calendarToIsoDate(e,t="constrain",n){const r=e;let o=this.adjustCalendarDate(e,n,t,!1);o=this.regulateMonthDayNaive(o,t,n);const{year:i,month:a,day:s}=o,c=JSON.stringify({func:"calendarToIsoDate",year:i,month:a,day:s,overflow:t,id:this.id});let d,h=n.get(c);if(h)return h;if(void 0!==r.year&&void 0!==r.month&&void 0!==r.day&&(r.year!==o.year||r.month!==o.month||r.day!==o.day)&&(d=JSON.stringify({func:"calendarToIsoDate",year:r.year,month:r.month,day:r.day,overflow:t,id:this.id}),h=n.get(d),h))return h;let u=this.estimateIsoDate({year:i,month:a,day:s});const l=e=>{let r=this.addDaysIso(u,e);if(o.day>this.minimumMonthLength(o)){let e=this.isoToCalendarDate(r,n);for(;e.month!==a||e.year!==i;){if("reject"===t)throw new RangeError(`day ${s} does not exist in month ${a} of year ${i}`);r=this.addDaysIso(r,-1),e=this.isoToCalendarDate(r,n)}}return r};let m=0,f=this.isoToCalendarDate(u,n),y=ri(o,f);if(0!==y.years||0!==y.months||0!==y.days){const e=365*y.years+30*y.months+y.days;u=this.addDaysIso(u,e),f=this.isoToCalendarDate(u,n),y=ri(o,f),0===y.years&&0===y.months?u=l(y.days):m=this.compareCalendarDates(o,f)}let p=8;for(;m;){u=this.addDaysIso(u,m*p);const e=f;f=this.isoToCalendarDate(u,n);const i=m;if(m=this.compareCalendarDates(o,f),m)if(y=ri(o,f),0===y.years&&0===y.months)u=l(y.days),m=0;else if(i&&m!==i)if(p>1)p/=2;else{if("reject"===t)throw new RangeError(`Can't find ISO date from calendar date: ${JSON.stringify({...r})}`);this.compareCalendarDates(f,e)>0&&(u=this.addDaysIso(u,-1)),m=0}}if(n.set(c,u),d&&n.set(d,u),void 0===o.year||void 0===o.month||void 0===o.day||void 0===o.monthCode||this.hasEra&&(void 0===o.era||void 0===o.eraYear))throw new RangeError("Unexpected missing property");return u}compareCalendarDates(e,t){return e.year!==t.year?Bo(e.year-t.year):e.month!==t.month?Bo(e.month-t.month):e.day!==t.day?Bo(e.day-t.day):0}regulateDate(e,t="constrain",n){const r=this.calendarToIsoDate(e,t,n);return this.isoToCalendarDate(r,n)}addDaysIso(e,t){return Or(e.year,e.month,e.day+t)}addDaysCalendar(e,t,n){const r=this.calendarToIsoDate(e,"constrain",n),o=this.addDaysIso(r,t);return this.isoToCalendarDate(o,n)}addMonthsCalendar(e,t,n,r){let o=e;const{day:i}=o;for(let e=0,n=Math.abs(t);e<n;e++){const{month:e}=o,n=o,a=t<0?-Math.max(i,this.daysInPreviousMonth(o,r)):this.daysInMonth(o,r),s=this.calendarToIsoDate(o,"constrain",r);let c=this.addDaysIso(s,a);if(o=this.isoToCalendarDate(c,r),t>0){const t=this.monthsInYear(n,r);for(;o.month-1!=e%t;)c=this.addDaysIso(c,-1),o=this.isoToCalendarDate(c,r)}o.day!==i&&(o=this.regulateDate({...o,day:i},"constrain",r))}if("reject"===n&&o.day!==i)throw new RangeError(`Day ${i} does not exist in resulting calendar month`);return o}addCalendar(e,{years:t=0,months:n=0,weeks:r=0,days:o=0},i,a){const{year:s,day:c,monthCode:d}=e,h=this.adjustCalendarDate({year:s+t,monthCode:d,day:c},a),u=this.addMonthsCalendar(h,n,i,a),l=o+7*r;return this.addDaysCalendar(u,l,a)}untilCalendar(e,t,n,r){let o=0,i=0,a=0,s=0;switch(n){case"day":o=this.calendarDaysUntil(e,t,r);break;case"week":{const n=this.calendarDaysUntil(e,t,r);o=n%7,i=(n-o)/7;break}case"month":case"year":{const i=this.compareCalendarDates(t,e);if(!i)return{years:0,months:0,weeks:0,days:0};const c=t.year-e.year,d=t.day-e.day;if("year"===n&&c){let n=0;t.monthCode>e.monthCode&&(n=1),t.monthCode<e.monthCode&&(n=-1),n||(n=Math.sign(d)),s=n*i<0?c-i:c}let h,u=s?this.addCalendar(e,{years:s},"constrain",r):e;do{a+=i,h=u,u=this.addMonthsCalendar(h,i,"constrain",r),u.day!==e.day&&(u=this.regulateDate({...u,day:e.day},"constrain",r))}while(this.compareCalendarDates(t,u)*i>=0);a-=i,o=this.calendarDaysUntil(h,t,r);break}}return{years:s,months:a,weeks:i,days:o}}daysInMonth(e,t){const{day:n}=e,r=this.maximumMonthLength(e),o=this.minimumMonthLength(e);if(o===r)return o;const i=n<=r-o?r:o,a=this.calendarToIsoDate(e,"constrain",t),s=this.addDaysIso(a,i),c=this.isoToCalendarDate(s,t),d=this.addDaysIso(s,-c.day);return this.isoToCalendarDate(d,t).day}daysInPreviousMonth(e,t){const{day:n,month:r,year:o}=e;let i={year:r>1?o:o-1,month:r,day:1};const a=r>1?r-1:this.monthsInYear(i,t);i={...i,month:a};const s=this.minimumMonthLength(i),c=this.maximumMonthLength(i);if(s===c)return c;const d=this.calendarToIsoDate(e,"constrain",t),h=this.addDaysIso(d,-n);return this.isoToCalendarDate(h,t).day}startOfCalendarYear(e){return{year:e.year,month:1,monthCode:"M01",day:1}}startOfCalendarMonth(e){return{year:e.year,month:e.month,day:1}}calendarDaysUntil(e,t,n){const r=this.calendarToIsoDate(e,"constrain",n),o=this.calendarToIsoDate(t,"constrain",n);return Gr(o.year,o.month-1,o.day)-Gr(r.year,r.month-1,r.day)}monthDaySearchStartYear(e,t){return 1972}monthDayFromFields(e,t,n){let r,o,i,a,s,{era:c,eraYear:d,year:h,month:u,monthCode:l,day:m}=e;if(void 0!==u&&void 0===h&&(!this.hasEra||void 0===c||void 0===d))throw new TypeError("when month is present, year (or era and eraYear) are required");(void 0===l||void 0!==h||this.hasEra&&void 0!==d)&&({monthCode:l,day:m}=this.isoToCalendarDate(this.calendarToIsoDate(e,t,n),n));const f={year:this.monthDaySearchStartYear(l,m),month:12,day:31},y=this.isoToCalendarDate(f,n),p=y.monthCode>l||y.monthCode===l&&y.day>=m?y.year:y.year-1;for(let e=0;e<20;e++){const c=this.adjustCalendarDate({day:m,monthCode:l,year:p-e},n),d=this.calendarToIsoDate(c,"constrain",n),h=this.isoToCalendarDate(d,n);if(({year:r,month:o,day:i}=d),h.monthCode===l&&h.day===m)return{month:o,day:i,year:r};if("constrain"===t){const e=this.maxLengthOfMonthCodeInAnyYear(h.monthCode);if(h.monthCode===l&&h.day===e&&m>e)return{month:o,day:i,year:r};(void 0===a||h.monthCode===a.monthCode&&h.day>a.day)&&(a=h,s=d)}}if("constrain"===t&&void 0!==s)return s;throw new RangeError(`No recent ${this.id} year with monthCode ${l} and day ${m}`)}getFirstDayOfWeek(){}getMinimalDaysInFirstWeek(){}}class HebrewHelper extends HelperBase{constructor(){super(...arguments),this.id="hebrew",this.calendarType="lunisolar",this.months={Tishri:{leap:1,regular:1,monthCode:"M01",days:30},Heshvan:{leap:2,regular:2,monthCode:"M02",days:{min:29,max:30}},Kislev:{leap:3,regular:3,monthCode:"M03",days:{min:29,max:30}},Tevet:{leap:4,regular:4,monthCode:"M04",days:29},Shevat:{leap:5,regular:5,monthCode:"M05",days:30},Adar:{leap:void 0,regular:6,monthCode:"M06",days:29},"Adar I":{leap:6,regular:void 0,monthCode:"M05L",days:30},"Adar II":{leap:7,regular:void 0,monthCode:"M06",days:29},Nisan:{leap:8,regular:7,monthCode:"M07",days:30},Iyar:{leap:9,regular:8,monthCode:"M08",days:29},Sivan:{leap:10,regular:9,monthCode:"M09",days:30},Tamuz:{leap:11,regular:10,monthCode:"M10",days:29},Av:{leap:12,regular:11,monthCode:"M11",days:30},Elul:{leap:13,regular:12,monthCode:"M12",days:29}}}inLeapYear(e){const{year:t}=e;return(7*t+1)%19<7}monthsInYear(e){return this.inLeapYear(e)?13:12}minimumMonthLength(e){return this.minMaxMonthLength(e,"min")}maximumMonthLength(e){return this.minMaxMonthLength(e,"max")}minMaxMonthLength(e,t){const{month:n,year:r}=e,o=this.getMonthCode(r,n),i=Object.entries(this.months).find((e=>e[1].monthCode===o));if(void 0===i)throw new RangeError(`unmatched Hebrew month: ${n}`);const a=i[1].days;return"number"==typeof a?a:a[t]}maxLengthOfMonthCodeInAnyYear(e){return["M04","M06","M08","M10","M12"].includes(e)?29:30}estimateIsoDate(e){const{year:t}=e;return{year:t-3760,month:1,day:1}}getMonthCode(e,t){return this.inLeapYear({year:e})?6===t?ei(5,!0):ei(t<6?t:t-1):ei(t)}adjustCalendarDate(e,t,n="constrain",r=!1){let{year:o,month:i,monthCode:a,day:s,monthExtra:c}=e;if(void 0===o)throw new TypeError("Missing property: year");if(r){if(c){const e=this.months[c];if(!e)throw new RangeError(`Unrecognized month from formatToParts: ${c}`);i=this.inLeapYear({year:o})?e.leap:e.regular}return a=this.getMonthCode(o,i),{year:o,month:i,day:s,monthCode:a}}if(this.validateCalendarDate(e),void 0===i)if(a.endsWith("L")){if("M05L"!==a)throw new RangeError(`Hebrew leap month must have monthCode M05L, not ${a}`);if(i=6,!this.inLeapYear({year:o})){if("reject"===n)throw new RangeError(`Hebrew monthCode M05L is invalid in year ${o} which is not a leap year`);i=6,a="M06"}}else{i=Qo(a),this.inLeapYear({year:o})&&i>=6&&i++;const e=this.monthsInYear({year:o});if(i<1||i>e)throw new RangeError(`Invalid monthCode: ${a}`)}else if("reject"===n?(Nr(i,1,this.monthsInYear({year:o})),Nr(s,1,this.maximumMonthLength({year:o,month:i}))):(i=jr(i,1,this.monthsInYear({year:o})),s=jr(s,1,this.maximumMonthLength({year:o,month:i}))),void 0===a)a=this.getMonthCode(o,i);else if(this.getMonthCode(o,i)!==a)throw new RangeError(`monthCode ${a} doesn't correspond to month ${i} in Hebrew year ${o}`);return{...e,day:s,month:i,monthCode:a,year:o}}}class IslamicBaseHelper extends HelperBase{constructor(){super(...arguments),this.calendarType="lunar",this.DAYS_PER_ISLAMIC_YEAR=354+11/30,this.DAYS_PER_ISO_YEAR=365.2425}inLeapYear(e,t){const n={year:e.year,month:1,monthCode:"M01",day:1},r={year:e.year+1,month:1,monthCode:"M01",day:1};return 355===this.calendarDaysUntil(n,r,t)}monthsInYear(){return 12}minimumMonthLength(){return 29}maximumMonthLength(){return 30}maxLengthOfMonthCodeInAnyYear(){return 30}estimateIsoDate(e){const{year:t}=this.adjustCalendarDate(e);return{year:Math.floor(t*this.DAYS_PER_ISLAMIC_YEAR/this.DAYS_PER_ISO_YEAR)+622,month:1,day:1}}}class IslamicHelper extends IslamicBaseHelper{constructor(){super(...arguments),this.id="islamic"}}class IslamicUmalquraHelper extends IslamicBaseHelper{constructor(){super(...arguments),this.id="islamic-umalqura"}}class IslamicTblaHelper extends IslamicBaseHelper{constructor(){super(...arguments),this.id="islamic-tbla"}}class IslamicCivilHelper extends IslamicBaseHelper{constructor(){super(...arguments),this.id="islamic-civil"}}class IslamicRgsaHelper extends IslamicBaseHelper{constructor(){super(...arguments),this.id="islamic-rgsa"}}class IslamicCcHelper extends IslamicBaseHelper{constructor(){super(...arguments),this.id="islamicc"}}class PersianHelper extends HelperBase{constructor(){super(...arguments),this.id="persian",this.calendarType="solar"}inLeapYear(e,t){return 30===this.daysInMonth({year:e.year,month:12,day:1},t)}monthsInYear(){return 12}minimumMonthLength(e){const{month:t}=e;return 12===t?29:t<=6?31:30}maximumMonthLength(e){const{month:t}=e;return 12===t?30:t<=6?31:30}maxLengthOfMonthCodeInAnyYear(e){return Qo(e)<=6?31:30}estimateIsoDate(e){const{year:t}=this.adjustCalendarDate(e);return{year:t+621,month:1,day:1}}}class IndianHelper extends HelperBase{constructor(){super(...arguments),this.id="indian",this.calendarType="solar",this.months={1:{length:30,month:3,day:22,leap:{length:31,month:3,day:21}},2:{length:31,month:4,day:21},3:{length:31,month:5,day:22},4:{length:31,month:6,day:22},5:{length:31,month:7,day:23},6:{length:31,month:8,day:23},7:{length:30,month:9,day:23},8:{length:30,month:10,day:23},9:{length:30,month:11,day:22},10:{length:30,month:12,day:22},11:{length:30,month:1,nextYear:!0,day:21},12:{length:30,month:2,nextYear:!0,day:20}},this.vulnerableToBceBug="10/11/-79 Saka"!==new Date("0000-01-01T00:00Z").toLocaleDateString("en-US-u-ca-indian",{timeZone:"UTC"})}inLeapYear(e){return oi(e.year+78)}monthsInYear(){return 12}minimumMonthLength(e){return this.getMonthInfo(e).length}maximumMonthLength(e){return this.getMonthInfo(e).length}maxLengthOfMonthCodeInAnyYear(e){const t=Qo(e);let n=this.months[t];return n=n.leap??n,n.length}getMonthInfo(e){const{month:t}=e;let n=this.months[t];if(void 0===n)throw new RangeError(`Invalid month: ${t}`);return this.inLeapYear(e)&&n.leap&&(n=n.leap),n}estimateIsoDate(e){const t=this.adjustCalendarDate(e),n=this.getMonthInfo(t);return Or(t.year+78+(n.nextYear?1:0),n.month,n.day+t.day-1)}checkIcuBugs(e){if(this.vulnerableToBceBug&&e.year<1)throw new RangeError(`calendar '${this.id}' is broken for ISO dates before 0001-01-01 (see https://bugs.chromium.org/p/v8/issues/detail?id=10529)`)}}function oi(e){return e%4==0&&(e%100!=0||e%400==0)}class GregorianBaseHelperFixedEpoch extends HelperBase{constructor(e,t){super(),this.calendarType="solar",this.id=e,this.isoEpoch=t}inLeapYear(e){const{year:t}=this.estimateIsoDate({month:1,day:1,year:e.year});return oi(t)}monthsInYear(){return 12}minimumMonthLength(e){const{month:t}=e;return 2===t?this.inLeapYear(e)?29:28:[4,6,9,11].indexOf(t)>=0?30:31}maximumMonthLength(e){return this.minimumMonthLength(e)}maxLengthOfMonthCodeInAnyYear(e){return[31,29,31,30,31,30,31,31,30,31,30,31][Qo(e)-1]}estimateIsoDate(e){const t=this.adjustCalendarDate(e);return St(t.year+this.isoEpoch.year,t.month+this.isoEpoch.month,t.day+this.isoEpoch.day,"constrain")}}class GregorianBaseHelper extends HelperBase{constructor(e,t){super(),this.hasEra=!0,this.calendarType="solar",this.id=e;const{eras:n,anchorEra:r}=function(e){let t,n=e;if(0===n.length)throw new RangeError("Invalid era data: eras are required");if(1===n.length&&n[0].reverseOf)throw new RangeError("Invalid era data: anchor era cannot count years backwards");if(1===n.length&&!n[0].code)throw new RangeError("Invalid era data: at least one named era is required");if(n.filter((e=>null!=e.reverseOf)).length>1)throw new RangeError("Invalid era data: only one era can count years backwards");n.forEach((e=>{if(e.isAnchor||!e.anchorEpoch&&!e.reverseOf){if(t)throw new RangeError("Invalid era data: cannot have multiple anchor eras");t=e,e.anchorEpoch={year:e.hasYearZero?0:1}}else if(!e.code)throw new RangeError("If era name is blank, it must be the anchor era")})),n=n.filter((e=>e.code)),n.forEach((e=>{const{reverseOf:t}=e;if(t){const r=n.find((e=>e.code===t));if(void 0===r)throw new RangeError(`Invalid era data: unmatched reverseOf era: ${t}`);e.reverseOf=r,e.anchorEpoch=r.anchorEpoch,e.isoEpoch=r.isoEpoch}void 0===e.anchorEpoch.month&&(e.anchorEpoch.month=1),void 0===e.anchorEpoch.day&&(e.anchorEpoch.day=1)})),n.sort(((e,t)=>{if(e.reverseOf)return 1;if(t.reverseOf)return-1;if(!e.isoEpoch||!t.isoEpoch)throw new RangeError("Invalid era data: missing ISO epoch");return t.isoEpoch.year-e.isoEpoch.year}));const r=n[n.length-1].reverseOf;if(r&&r!==n[n.length-2])throw new RangeError("Invalid era data: invalid reverse-sign era");return n.forEach(((e,t)=>{e.genericName="era"+(n.length-1-t)})),{eras:n,anchorEra:t||n[0]}}(t);this.anchorEra=r,this.eras=n}inLeapYear(e){const{year:t}=this.estimateIsoDate({month:1,day:1,year:e.year});return oi(t)}monthsInYear(){return 12}minimumMonthLength(e){const{month:t}=e;return 2===t?this.inLeapYear(e)?29:28:[4,6,9,11].indexOf(t)>=0?30:31}maximumMonthLength(e){return this.minimumMonthLength(e)}maxLengthOfMonthCodeInAnyYear(e){return[31,29,31,30,31,30,31,31,30,31,30,31][Qo(e)-1]}completeEraYear(e){const t=(t,n,r)=>{const o=e[t];if(null!=o&&o!=n&&!(r||[]).includes(o)){const e=r?.[0];throw new RangeError(`Input ${t} ${o} doesn't match calculated value ${e?`${n} (also called ${e})`:n}`)}},n=t=>{let n;const r={...e,year:t},o=this.eras.find(((e,o)=>{if(o===this.eras.length-1){if(e.reverseOf){if(t>0)throw new RangeError(`Signed year ${t} is invalid for era ${e.code}`);return n=e.anchorEpoch.year-t,!0}return n=t-e.anchorEpoch.year+(e.hasYearZero?0:1),!0}return this.compareCalendarDates(r,e.anchorEpoch)>=0&&(n=t-e.anchorEpoch.year+(e.hasYearZero?0:1),!0)}));if(!o)throw new RangeError(`Year ${t} was not matched by any era`);return{eraYear:n,era:o.code,eraNames:o.names}};let{year:r,eraYear:o,era:i}=e;if(null!=r){const e=n(r);({eraYear:o,era:i}=e),t("era",i,e?.eraNames),t("eraYear",o)}else{if(null==o)throw new RangeError("Either year or eraYear and era are required");{if(void 0===i)throw new RangeError("era and eraYear must be provided together");const e=this.eras.find((({code:e,names:t=[]})=>e===i||t.includes(i)));if(!e)throw new RangeError(`Era ${i} (ISO year ${o}) was not matched by any era`);r=e.reverseOf?e.anchorEpoch.year-o:o+e.anchorEpoch.year-(e.hasYearZero?0:1),t("year",r),({eraYear:o,era:i}=n(r))}}return{...e,year:r,eraYear:o,era:i}}adjustCalendarDate(e,t,n="constrain"){let r=e;const{month:o,monthCode:i}=r;return void 0===o&&(r={...r,month:Qo(i)}),this.validateCalendarDate(r),r=this.completeEraYear(r),super.adjustCalendarDate(r,t,n)}estimateIsoDate(e){const t=this.adjustCalendarDate(e),{year:n,month:r,day:o}=t,{anchorEra:i}=this;return St(n+i.isoEpoch.year-(i.hasYearZero?0:1),r,o,"constrain")}}class SameMonthDayAsGregorianBaseHelper extends GregorianBaseHelper{constructor(e,t){super(e,t)}isoToCalendarDate(e){const{year:t,month:n,day:r}=e,o=ei(n),i=t-this.anchorEra.isoEpoch.year+1;return this.completeEraYear({year:i,month:n,monthCode:o,day:r})}}const ii={inLeapYear(e){const{year:t}=e;return(t+1)%4==0},monthsInYear:()=>13,minimumMonthLength(e){const{month:t}=e;return 13===t?this.inLeapYear(e)?6:5:30},maximumMonthLength(e){return this.minimumMonthLength(e)},maxLengthOfMonthCodeInAnyYear:e=>"M13"===e?6:30};class OrthodoxBaseHelperFixedEpoch extends GregorianBaseHelperFixedEpoch{constructor(e,t){super(e,t),this.inLeapYear=ii.inLeapYear,this.monthsInYear=ii.monthsInYear,this.minimumMonthLength=ii.minimumMonthLength,this.maximumMonthLength=ii.maximumMonthLength,this.maxLengthOfMonthCodeInAnyYear=ii.maxLengthOfMonthCodeInAnyYear}}class OrthodoxBaseHelper extends GregorianBaseHelper{constructor(e,t){super(e,t),this.inLeapYear=ii.inLeapYear,this.monthsInYear=ii.monthsInYear,this.minimumMonthLength=ii.minimumMonthLength,this.maximumMonthLength=ii.maximumMonthLength,this.maxLengthOfMonthCodeInAnyYear=ii.maxLengthOfMonthCodeInAnyYear}}class EthioaaHelper extends OrthodoxBaseHelperFixedEpoch{constructor(){super("ethioaa",{year:-5492,month:7,day:17})}}class CopticHelper extends OrthodoxBaseHelper{constructor(){super("coptic",[{code:"coptic",isoEpoch:{year:284,month:8,day:29}},{code:"coptic-inverse",reverseOf:"coptic"}])}}class EthiopicHelper extends OrthodoxBaseHelper{constructor(){super("ethiopic",[{code:"ethioaa",names:["ethiopic-amete-alem","mundi"],isoEpoch:{year:-5492,month:7,day:17}},{code:"ethiopic",names:["incar"],isoEpoch:{year:8,month:8,day:27},anchorEpoch:{year:5501}}])}}class RocHelper extends SameMonthDayAsGregorianBaseHelper{constructor(){super("roc",[{code:"roc",names:["minguo"],isoEpoch:{year:1912,month:1,day:1}},{code:"roc-inverse",names:["before-roc"],reverseOf:"roc"}])}}class BuddhistHelper extends GregorianBaseHelperFixedEpoch{constructor(){super("buddhist",{year:-543,month:1,day:1})}}class GregoryHelper extends SameMonthDayAsGregorianBaseHelper{constructor(){super("gregory",[{code:"gregory",names:["ad","ce"],isoEpoch:{year:1,month:1,day:1}},{code:"gregory-inverse",names:["be","bce"],reverseOf:"gregory"}])}reviseIntlEra(e){let{era:t,eraYear:n}=e;return"b"===t&&(t="gregory-inverse"),"a"===t&&(t="gregory"),{era:t,eraYear:n}}getFirstDayOfWeek(){return 1}getMinimalDaysInFirstWeek(){return 1}}class JapaneseHelper extends SameMonthDayAsGregorianBaseHelper{constructor(){super("japanese",[{code:"reiwa",isoEpoch:{year:2019,month:5,day:1},anchorEpoch:{year:2019,month:5,day:1}},{code:"heisei",isoEpoch:{year:1989,month:1,day:8},anchorEpoch:{year:1989,month:1,day:8}},{code:"showa",isoEpoch:{year:1926,month:12,day:25},anchorEpoch:{year:1926,month:12,day:25}},{code:"taisho",isoEpoch:{year:1912,month:7,day:30},anchorEpoch:{year:1912,month:7,day:30}},{code:"meiji",isoEpoch:{year:1868,month:9,day:8},anchorEpoch:{year:1868,month:9,day:8}},{code:"japanese",names:["japanese","gregory","ad","ce"],isoEpoch:{year:1,month:1,day:1}},{code:"japanese-inverse",names:["japanese-inverse","gregory-inverse","bc","bce"],reverseOf:"japanese"}]),this.erasBeginMidYear=!0}reviseIntlEra(e,t){const{era:n,eraYear:r}=e,{year:o}=t;return this.eras.find((e=>e.code===n))?{era:n,eraYear:r}:o<1?{era:"japanese-inverse",eraYear:1-o}:{era:"japanese",eraYear:o}}}class ChineseBaseHelper extends HelperBase{constructor(){super(...arguments),this.calendarType="lunisolar"}inLeapYear(e,t){const n=this.getMonthList(e.year,t);return 13===Object.entries(n).length}monthsInYear(e,t){return this.inLeapYear(e,t)?13:12}minimumMonthLength(){return 29}maximumMonthLength(){return 30}maxLengthOfMonthCodeInAnyYear(e){return["M01L","M09L","M10L","M11L","M12L"].includes(e)?29:30}monthDaySearchStartYear(e,t){const n={M01L:[1651,1651],M02L:[1947,1765],M03L:[1966,1955],M04L:[1963,1944],M05L:[1971,1952],M06L:[1960,1941],M07L:[1968,1938],M08L:[1957,1718],M09L:[1832,1832],M10L:[1870,1870],M11L:[1814,1814],M12L:[1890,1890]}[e]??[1972,1972];return t<30?n[0]:n[1]}getMonthList(e,t){if(void 0===e)throw new TypeError("Missing year");const n=JSON.stringify({func:"getMonthList",calendarYear:e,id:this.id}),r=t.get(n);if(r)return r;const o=this.getFormatter(),i=(e,t)=>{const n=ni({isoYear:e,isoMonth:2,isoDay:1}),r=new Date(n);r.setUTCDate(t+1);const i=o.formatToParts(r),a=i.find((e=>"month"===e.type)).value,s=+i.find((e=>"day"===e.type)).value,c=i.find((e=>"relatedYear"===e.type));let d;if(void 0===c)throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);return d=+c.value,{calendarMonthString:a,calendarDay:s,calendarYearToVerify:d}};let a=17,{calendarMonthString:s,calendarDay:c,calendarYearToVerify:d}=i(e,a);"1"!==s&&(a+=29,({calendarMonthString:s,calendarDay:c}=i(e,a))),a-=c-5;const h={};let u,l,m=1,f=!1;do{({calendarMonthString:s,calendarDay:c,calendarYearToVerify:d}=i(e,a)),u&&(h[l].daysInMonth=u+30-c),d!==e?f=!0:(h[s]={monthIndex:m++},a+=30),u=c,l=s}while(!f);return h[l].daysInMonth=u+30-c,t.set(n,h),h}estimateIsoDate(e){const{year:t,month:n}=e;return{year:t,month:n>=12?12:n+1,day:1}}adjustCalendarDate(e,t,n="constrain",r=!1){let{year:o,month:i,monthExtra:a,day:s,monthCode:c}=e;if(void 0===o)throw new TypeError("Missing property: year");if(r){if(a&&"bis"!==a)throw new RangeError(`Unexpected leap month suffix: ${a}`);const e=ei(i,void 0!==a),n=`${i}${a||""}`,r=this.getMonthList(o,t)[n];if(void 0===r)throw new RangeError(`Unmatched month ${n} in Chinese year ${o}`);return i=r.monthIndex,{year:o,month:i,day:s,monthCode:e}}if(this.validateCalendarDate(e),void 0===i){const e=this.getMonthList(o,t);let r=c.replace(/^M|L$/g,(e=>"L"===e?"bis":""));"0"===r[0]&&(r=r.slice(1));let a=e[r];if(i=a&&a.monthIndex,void 0===i&&c.endsWith("L")&&"M13L"!=c&&"constrain"===n){const t=+c.replace(/^M0?|L$/g,"");a=e[t],a&&(i=a.monthIndex,c=ei(t))}if(void 0===i)throw new RangeError(`Unmatched month ${c} in Chinese year ${o}`)}else if(void 0===c){const e=this.getMonthList(o,t),r=Object.entries(e),a=r.length;"reject"===n?(Nr(i,1,a),Nr(s,1,this.maximumMonthLength())):(i=jr(i,1,a),s=jr(s,1,this.maximumMonthLength()));const d=r.find((e=>e[1].monthIndex===i));if(void 0===d)throw new RangeError(`Invalid month ${i} in Chinese year ${o}`);c=ei(+d[0].replace("bis",""),-1!==d[0].indexOf("bis"))}else{const e=this.getMonthList(o,t);let n=c.replace(/^M|L$/g,(e=>"L"===e?"bis":""));"0"===n[0]&&(n=n.slice(1));const r=e[n];if(!r)throw new RangeError(`Unmatched monthCode ${c} in Chinese year ${o}`);if(i!==r.monthIndex)throw new RangeError(`monthCode ${c} doesn't correspond to month ${i} in Chinese year ${o}`)}return{...e,year:o,month:i,monthCode:c,day:s}}}class ChineseHelper extends ChineseBaseHelper{constructor(){super(...arguments),this.id="chinese"}}class DangiHelper extends ChineseBaseHelper{constructor(){super(...arguments),this.id="dangi"}}class NonIsoCalendar{constructor(e){this.helper=e}extraFields(e){return this.helper.hasEra&&e.includes("year")?["era","eraYear"]:[]}resolveFields(e){if("lunisolar"!==this.helper.calendarType){const t=new OneObjectCache;ti(e,void 0,this.helper.monthsInYear({year:e.year??1972},t))}}dateToISO(e,t){const n=new OneObjectCache,r=this.helper.calendarToIsoDate(e,t,n);return n.setObject(r),r}monthDayToISOReferenceDate(e,t){const n=new OneObjectCache,r=this.helper.monthDayFromFields(e,t,n);return n.setObject(r),r}fieldKeysToIgnore(e){const t=new Set;for(let n=0;n<e.length;n++){const r=e[n];switch(t.add(r),r){case"era":t.add("eraYear"),t.add("year");break;case"eraYear":t.add("era"),t.add("year");break;case"year":t.add("era"),t.add("eraYear");break;case"month":t.add("monthCode"),this.helper.erasBeginMidYear&&(t.add("era"),t.add("eraYear"));break;case"monthCode":t.add("month"),this.helper.erasBeginMidYear&&(t.add("era"),t.add("eraYear"));break;case"day":this.helper.erasBeginMidYear&&(t.add("era"),t.add("eraYear"))}}return Go(t)}dateAdd(e,{years:t,months:n,weeks:r,days:o},i){const a=OneObjectCache.getCacheForObject(e),s=this.helper.isoToCalendarDate(e,a),c=this.helper.addCalendar(s,{years:t,months:n,weeks:r,days:o},i,a),d=this.helper.calendarToIsoDate(c,"constrain",a);return OneObjectCache.getCacheForObject(d)||new OneObjectCache(a).setObject(d),d}dateUntil(e,t,n){const r=OneObjectCache.getCacheForObject(e),o=OneObjectCache.getCacheForObject(t),i=this.helper.isoToCalendarDate(e,r),a=this.helper.isoToCalendarDate(t,o);return this.helper.untilCalendar(i,a,n,r)}isoToDate(e,t){const n=OneObjectCache.getCacheForObject(e),r=this.helper.isoToCalendarDate(e,n);if(t.dayOfWeek&&(r.dayOfWeek=Xo.iso8601.isoToDate(e,{dayOfWeek:!0}).dayOfWeek),t.dayOfYear){const e=this.helper.startOfCalendarYear(r),t=this.helper.calendarDaysUntil(e,r,n);r.dayOfYear=t+1}if(t.weekOfYear&&(r.weekOfYear=Ko(this.helper.id,e)),r.daysInWeek=7,t.daysInMonth&&(r.daysInMonth=this.helper.daysInMonth(r,n)),t.daysInYear){const e=this.helper.startOfCalendarYear(r),t=this.helper.addCalendar(e,{years:1},"constrain",n);r.daysInYear=this.helper.calendarDaysUntil(e,t,n)}return t.monthsInYear&&(r.monthsInYear=this.helper.monthsInYear(r,n)),t.inLeapYear&&(r.inLeapYear=this.helper.inLeapYear(r,n)),r}getFirstDayOfWeek(){return this.helper.getFirstDayOfWeek()}getMinimalDaysInFirstWeek(){return this.helper.getMinimalDaysInFirstWeek()}}for(const e of[HebrewHelper,PersianHelper,EthiopicHelper,EthioaaHelper,CopticHelper,ChineseHelper,DangiHelper,RocHelper,IndianHelper,BuddhistHelper,GregoryHelper,JapaneseHelper,IslamicHelper,IslamicUmalquraHelper,IslamicTblaHelper,IslamicCivilHelper,IslamicRgsaHelper,IslamicCcHelper]){const t=new e;Xo[t.id]=new NonIsoCalendar(t)}se("calendarImpl",(function(e){return Xo[e]}));const ai=Intl.DateTimeFormat;function si(e,t){let n=re(e,t);return"function"==typeof n&&(n=new ai(re(e,G),n(re(e,K))),function(e,t,n){const r=Q(e);if(void 0===r)throw new TypeError("Missing slots for the given container");if(void 0===r[t])throw new TypeError(`tried to reset ${t} which was not set`);r[t]=n}(e,t,n)),n}function ci(e){return ne(e,q)}class DateTimeFormatImpl{constructor(e=void 0,t=void 0){!function(e,t,n){const r=void 0!==n;let o;if(r){const e=["localeMatcher","calendar","numberingSystem","hour12","hourCycle","timeZone","weekday","era","year","month","day","dayPeriod","hour","minute","second","fractionalSecondDigits","timeZoneName","formatMatcher","dateStyle","timeStyle"];o=function(e){if(null==e)throw new TypeError(`Expected object not ${e}`);return Object(e)}(n);const t=Object.create(null);for(let n=0;n<e.length;n++){const r=e[n];Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r])}o=t}else o=Object.create(null);const i=new ai(t,o),a=i.resolvedOptions();if(te(e),r){const t=Object.assign(Object.create(null),a);for(const e in t)Object.prototype.hasOwnProperty.call(o,e)||delete t[e];t.hour12=o.hour12,t.hourCycle=o.hourCycle,oe(e,K,t)}else oe(e,K,o);oe(e,G,a.locale),oe(e,q,i),oe(e,W,a.timeZone),oe(e,J,a.calendar),oe(e,B,vi),oe(e,Z,gi),oe(e,F,wi),oe(e,H,pi),oe(e,z,bi),oe(e,A,Di);const s=r?o.timeZone:void 0;if(void 0===s)oe(e,_,a.timeZone);else{const t=We(s);if(t.startsWith("−"))throw new RangeError("Unicode minus (U+2212) is not supported in time zone offsets");oe(e,_,Bn(t))}}(this,e,t)}get format(){vt(this,ci);const e=ui.bind(this);return Object.defineProperties(e,{length:{value:1,enumerable:!1,writable:!1,configurable:!0},name:{value:"",enumerable:!1,writable:!1,configurable:!0}}),e}formatRange(e,t){return vt(this,ci),mi.call(this,e,t)}formatToParts(e,...t){return vt(this,ci),li.call(this,e,...t)}formatRangeToParts(e,t){return vt(this,ci),fi.call(this,e,t)}resolvedOptions(){return vt(this,ci),hi.call(this)}}"formatToParts"in ai.prototype||delete DateTimeFormatImpl.prototype.formatToParts,"formatRangeToParts"in ai.prototype||delete DateTimeFormatImpl.prototype.formatRangeToParts;const di=function(e=void 0,t=void 0){return new DateTimeFormatImpl(e,t)};function hi(){const e=re(this,q).resolvedOptions();return e.timeZone=re(this,_),e}function ui(e,...t){let n,r,o=$i(e,this);return o.formatter?(n=o.formatter,r=[No(o.epochNs,"floor")]):(n=re(this,q),r=[e,...t]),n.format(...r)}function li(e,...t){let n,r,o=$i(e,this);return o.formatter?(n=o.formatter,r=[No(o.epochNs,"floor")]):(n=re(this,q),r=[e,...t]),n.formatToParts(...r)}function mi(e,t){if(void 0===e||void 0===t)throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");const n=Ci(e),r=Ci(t);let o,i=[n,r];if(Ii(n)!==Ii(r))throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");if(Ii(n)){if(!Oi(n,r))throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");const{epochNs:e,formatter:t}=$i(n,this),{epochNs:a,formatter:s}=$i(r,this);t&&(o=t,i=[No(e,"floor"),No(a,"floor")])}return o||(o=re(this,q)),o.formatRange(...i)}function fi(e,t){if(void 0===e||void 0===t)throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");const n=Ci(e),r=Ci(t);let o,i=[n,r];if(Ii(n)!==Ii(r))throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");if(Ii(n)){if(!Oi(n,r))throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");const{epochNs:e,formatter:t}=$i(n,this),{epochNs:a,formatter:s}=$i(r,this);t&&(o=t,i=[No(e,"floor"),No(a,"floor")])}return o||(o=re(this,q)),o.formatRangeToParts(...i)}function yi(e={},t={}){const n=Object.assign({},e),r=["year","month","day","hour","minute","second","weekday","dayPeriod","timeZoneName","dateStyle","timeStyle"];for(let e=0;e<r.length;e++){const o=r[e];n[o]=o in t?t[o]:n[o],!1!==n[o]&&void 0!==n[o]||delete n[o]}return n}function pi(e){const t=yi(e,{year:!1,month:!1,day:!1,weekday:!1,timeZoneName:!1,dateStyle:!1});if("long"!==t.timeStyle&&"full"!==t.timeStyle||(delete t.timeStyle,Object.assign(t,{hour:"numeric",minute:"2-digit",second:"2-digit"})),!Mi(t)){if(Ei(e))throw new TypeError(`cannot format Temporal.PlainTime with options [${Object.keys(e)}]`);Object.assign(t,{hour:"numeric",minute:"numeric",second:"numeric"})}return t}function gi(e){const t={short:{year:"2-digit",month:"numeric"},medium:{year:"numeric",month:"short"},long:{year:"numeric",month:"long"},full:{year:"numeric",month:"long"}},n=yi(e,{day:!1,hour:!1,minute:!1,second:!1,weekday:!1,dayPeriod:!1,timeZoneName:!1,timeStyle:!1});if("dateStyle"in n&&n.dateStyle){const e=n.dateStyle;delete n.dateStyle,Object.assign(n,t[e])}if(!("year"in n||"month"in n||"era"in n)){if(Ei(e))throw new TypeError(`cannot format PlainYearMonth with options [${Object.keys(e)}]`);Object.assign(n,{year:"numeric",month:"numeric"})}return n}function wi(e){const t={short:{month:"numeric",day:"numeric"},medium:{month:"short",day:"numeric"},long:{month:"long",day:"numeric"},full:{month:"long",day:"numeric"}},n=yi(e,{year:!1,hour:!1,minute:!1,second:!1,weekday:!1,dayPeriod:!1,timeZoneName:!1,timeStyle:!1});if("dateStyle"in n&&n.dateStyle){const e=n.dateStyle;delete n.dateStyle,Object.assign(n,t[e])}if(!("month"in n)&&!("day"in n)){if(Ei(e))throw new TypeError(`cannot format PlainMonthDay with options [${Object.keys(e)}]`);Object.assign(n,{month:"numeric",day:"numeric"})}return n}function vi(e){const t=yi(e,{hour:!1,minute:!1,second:!1,dayPeriod:!1,timeZoneName:!1,timeStyle:!1});if(!Ti(t)){if(Ei(e))throw new TypeError(`cannot format PlainDate with options [${Object.keys(e)}]`);Object.assign(t,{year:"numeric",month:"numeric",day:"numeric"})}return t}function bi(e){const t=yi(e,{timeZoneName:!1});if(("long"===t.timeStyle||"full"===t.timeStyle)&&(delete t.timeStyle,Object.assign(t,{hour:"numeric",minute:"2-digit",second:"2-digit"}),t.dateStyle)){const e={short:{year:"numeric",month:"numeric",day:"numeric"},medium:{year:"numeric",month:"short",day:"numeric"},long:{year:"numeric",month:"long",day:"numeric"},full:{year:"numeric",month:"long",day:"numeric",weekday:"long"}};Object.assign(t,e[t.dateStyle]),delete t.dateStyle}if(!Mi(t)&&!Ti(t)){if(Ei(e))throw new TypeError(`cannot format PlainDateTime with options [${Object.keys(e)}]`);Object.assign(t,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})}return t}function Di(e){let t=e;return Mi(t)||Ti(t)||(t=Object.assign({},t,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})),t}function Ti(e){return"year"in e||"month"in e||"day"in e||"weekday"in e||"dateStyle"in e||"era"in e}function Mi(e){return"hour"in e||"minute"in e||"second"in e||"timeStyle"in e||"dayPeriod"in e||"fractionalSecondDigits"in e}function Ei(e){return Ti(e)||Mi(e)||"dateStyle"in e||"timeStyle"in e||"timeZoneName"in e}function Ii(e){return mt(e)||ft(e)||yt(e)||wt(e)||pt(e)||gt(e)||ut(e)}function Ci(e){return Ii(e)?e:qe(e)}function Oi(e,t){return!(!Ii(e)||!Ii(t)||ft(e)&&!ft(t)||mt(e)&&!mt(t)||yt(e)&&!yt(t)||wt(e)&&!wt(t)||pt(e)&&!pt(t)||gt(e)&&!gt(t)||ut(e)&&!ut(t))}function $i(e,t){if(ft(e)){const n={isoDate:{year:1970,month:1,day:1},time:re(e,M)};return{epochNs:An(re(t,W),n,"compatible"),formatter:si(t,H)}}if(pt(e)){const n=re(e,E),r=re(t,J);if(n!==r)throw new RangeError(`cannot format PlainYearMonth with calendar ${n} in locale with calendar ${r}`);const o=xt(re(e,D),{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});return{epochNs:An(re(t,W),o,"compatible"),formatter:si(t,Z)}}if(gt(e)){const n=re(e,E),r=re(t,J);if(n!==r)throw new RangeError(`cannot format PlainMonthDay with calendar ${n} in locale with calendar ${r}`);const o=xt(re(e,D),{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});return{epochNs:An(re(t,W),o,"compatible"),formatter:si(t,F)}}if(mt(e)){const n=re(e,E),r=re(t,J);if("iso8601"!==n&&n!==r)throw new RangeError(`cannot format PlainDate with calendar ${n} in locale with calendar ${r}`);const o=xt(re(e,D),{deltaDays:0,hour:12,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0});return{epochNs:An(re(t,W),o,"compatible"),formatter:si(t,B)}}if(yt(e)){const n=re(e,E),r=re(t,J);if("iso8601"!==n&&n!==r)throw new RangeError(`cannot format PlainDateTime with calendar ${n} in locale with calendar ${r}`);const o=re(e,T);return{epochNs:An(re(t,W),o,"compatible"),formatter:si(t,z)}}if(wt(e))throw new TypeError("Temporal.ZonedDateTime not supported in DateTimeFormat methods. Use toLocaleString() instead.");return ut(e)?{epochNs:re(e,b),formatter:si(t,A)}:{}}function Yi(e){const t=Object.create(null);return t.years=re(e,Y),t.months=re(e,R),t.weeks=re(e,S),t.days=re(e,j),t.hours=re(e,k),t.minutes=re(e,N),t.seconds=re(e,x),t.milliseconds=re(e,L),t.microseconds=re(e,P),t.nanoseconds=re(e,U),t}DateTimeFormatImpl.prototype.constructor=di,Object.defineProperty(di,"prototype",{value:DateTimeFormatImpl.prototype,writable:!1,enumerable:!1,configurable:!1}),di.supportedLocalesOf=ai.supportedLocalesOf,ae(di,"Intl.DateTimeFormat");const{format:Ri,formatToParts:Si}=Intl.DurationFormat?.prototype??Object.create(null);function ji(e){Intl.DurationFormat.prototype.resolvedOptions.call(this);const t=Yi(sn(e));return Ri.call(this,t)}Intl.DurationFormat?.prototype&&(Intl.DurationFormat.prototype.format=ji,Intl.DurationFormat.prototype.formatToParts=function(e){Intl.DurationFormat.prototype.resolvedOptions.call(this);const t=Yi(sn(e));return Si.call(this,t)});var ki=Object.freeze({__proto__:null,DateTimeFormat:di,ModifiedIntlDurationFormatPrototypeFormat:ji});class Instant{constructor(e){if(arguments.length<1)throw new TypeError("missing argument: epochNanoseconds is required");In(this,Lo(e))}get epochMilliseconds(){return vt(this,ut),No(re(this,b),"floor")}get epochNanoseconds(){return vt(this,ut),ko(e.BigInt(re(this,b)))}add(e){return vt(this,ut),wo("add",this,e)}subtract(e){return vt(this,ut),wo("subtract",this,e)}until(e,t=void 0){return vt(this,ut),so("until",this,e,t)}since(e,t=void 0){return vt(this,ut),so("since",this,e,t)}round(e){if(vt(this,ut),void 0===e)throw new TypeError("options parameter is required");const t="string"==typeof e?Fo("smallestUnit",e):Zo(e),n=Ft(t),r=Ut(t,"halfExpand"),o=Wt(t,"smallestUnit","time",qt);return Ht(n,{hour:24,minute:1440,second:86400,millisecond:864e5,microsecond:864e8,nanosecond:864e11}[o],!0),Cn(Io(re(this,b),n,o,r))}equals(t){vt(this,ut);const n=cn(t),r=re(this,b),o=re(n,b);return e.equal(e.BigInt(r),e.BigInt(o))}toString(e=void 0){vt(this,ut);const t=Zo(e),n=zt(t),r=Ut(t,"trunc"),o=Wt(t,"smallestUnit","time",void 0);if("hour"===o)throw new RangeError('smallestUnit must be a time unit other than "hour"');let i=t.timeZone;void 0!==i&&(i=Bn(i));const{precision:a,unit:s,increment:c}=At(o,n);return Xn(Cn(Io(re(this,b),c,s,r)),i,a)}toJSON(){return vt(this,ut),Xn(this,void 0,"auto")}toLocaleString(e=void 0,t=void 0){return vt(this,ut),new di(e,t).format(this)}valueOf(){qo("Instant")}toZonedDateTimeISO(e){vt(this,ut);const t=Bn(e);return $n(re(this,b),t,"iso8601")}static fromEpochMilliseconds(e){return Cn(xo(qe(e)))}static fromEpochNanoseconds(e){return Cn(Lo(e))}static from(e){return cn(e)}static compare(t,n){const r=cn(t),o=cn(n),i=re(r,b),a=re(o,b);return e.lessThan(i,a)?-1:e.greaterThan(i,a)?1:0}}ae(Instant,"Temporal.Instant");class PlainDate{constructor(e,t,n,r="iso8601"){const o=_e(e),i=_e(t),a=_e(n),s=zo(void 0===r?"iso8601":Ve(r));xr(o,i,a),yn(this,{year:o,month:i,day:a},s)}get calendarId(){return vt(this,mt),re(this,E)}get era(){return Ni(this,"era")}get eraYear(){return Ni(this,"eraYear")}get year(){return Ni(this,"year")}get month(){return Ni(this,"month")}get monthCode(){return Ni(this,"monthCode")}get day(){return Ni(this,"day")}get dayOfWeek(){return Ni(this,"dayOfWeek")}get dayOfYear(){return Ni(this,"dayOfYear")}get weekOfYear(){return Ni(this,"weekOfYear")?.week}get yearOfWeek(){return Ni(this,"weekOfYear")?.year}get daysInWeek(){return Ni(this,"daysInWeek")}get daysInMonth(){return Ni(this,"daysInMonth")}get daysInYear(){return Ni(this,"daysInYear")}get monthsInYear(){return Ni(this,"monthsInYear")}get inLeapYear(){return Ni(this,"inLeapYear")}with(e,t=void 0){if(vt(this,mt),!Ae(e))throw new TypeError("invalid argument");bt(e);const n=re(this,E);let r=en(n,re(this,D));return r=Rn(n,r,tn(n,e,["year","month","monthCode","day"],[],"partial")),pn(Ln(n,r,Lt(Zo(t))),n)}withCalendar(e){vt(this,mt);const t=kn(e);return pn(re(this,D),t)}add(e,t=void 0){return vt(this,mt),vo("add",this,e,t)}subtract(e,t=void 0){return vt(this,mt),vo("subtract",this,e,t)}until(e,t=void 0){return vt(this,mt),co("until",this,e,t)}since(e,t=void 0){return vt(this,mt),co("since",this,e,t)}equals(e){vt(this,mt);const t=rn(e);return 0===Ro(re(this,D),re(t,D))&&xn(re(this,E),re(t,E))}toString(e=void 0){return vt(this,mt),er(this,Zt(Zo(e)))}toJSON(){return vt(this,mt),er(this)}toLocaleString(e=void 0,t=void 0){return vt(this,mt),new di(e,t).format(this)}valueOf(){qo("PlainDate")}toPlainDateTime(e=void 0){vt(this,mt);const t=un(e);return wn(xt(re(this,D),t),re(this,E))}toZonedDateTime(e){let t,n;if(vt(this,mt),Ae(e)){const r=e.timeZone;void 0===r?t=Bn(e):(t=Bn(r),n=e.plainTime)}else t=Bn(e);const r=re(this,D);let o;return void 0===n?o=_n(t,r):(n=hn(n),o=An(t,xt(r,re(n,M)),"compatible")),$n(o,t,re(this,E))}toPlainYearMonth(){vt(this,mt);const e=re(this,E);return En(Pn(e,en(e,re(this,D)),"constrain"),e)}toPlainMonthDay(){vt(this,mt);const e=re(this,E);return bn(Un(e,en(e,re(this,D)),"constrain"),e)}static from(e,t=void 0){return rn(e,t)}static compare(e,t){const n=rn(e),r=rn(t);return Ro(re(n,D),re(r,D))}}function Ni(e,t){vt(e,mt);const n=re(e,D);return Qt(e).isoToDate(n,{[t]:!0})[t]}ae(PlainDate,"Temporal.PlainDate");class PlainDateTime{constructor(e,t,n,r=0,o=0,i=0,a=0,s=0,c=0,d="iso8601"){const h=_e(e),u=_e(t),l=_e(n),m=void 0===r?0:_e(r),f=void 0===o?0:_e(o),y=void 0===i?0:_e(i),p=void 0===a?0:_e(a),g=void 0===s?0:_e(s),w=void 0===c?0:_e(c),v=zo(void 0===d?"iso8601":Ve(d));Ur(h,u,l,m,f,y,p,g,w),gn(this,{isoDate:{year:h,month:u,day:l},time:{hour:m,minute:f,second:y,millisecond:p,microsecond:g,nanosecond:w}},v)}get calendarId(){return vt(this,yt),re(this,E)}get year(){return xi(this,"year")}get month(){return xi(this,"month")}get monthCode(){return xi(this,"monthCode")}get day(){return xi(this,"day")}get hour(){return Li(this,"hour")}get minute(){return Li(this,"minute")}get second(){return Li(this,"second")}get millisecond(){return Li(this,"millisecond")}get microsecond(){return Li(this,"microsecond")}get nanosecond(){return Li(this,"nanosecond")}get era(){return xi(this,"era")}get eraYear(){return xi(this,"eraYear")}get dayOfWeek(){return xi(this,"dayOfWeek")}get dayOfYear(){return xi(this,"dayOfYear")}get weekOfYear(){return xi(this,"weekOfYear")?.week}get yearOfWeek(){return xi(this,"weekOfYear")?.year}get daysInWeek(){return xi(this,"daysInWeek")}get daysInYear(){return xi(this,"daysInYear")}get daysInMonth(){return xi(this,"daysInMonth")}get monthsInYear(){return xi(this,"monthsInYear")}get inLeapYear(){return xi(this,"inLeapYear")}with(e,t=void 0){if(vt(this,yt),!Ae(e))throw new TypeError("invalid argument");bt(e);const n=re(this,E),r=re(this,T);let o={...en(n,r.isoDate),...r.time};return o=Rn(n,o,tn(n,e,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond"],"partial")),wn(on(n,o,Lt(Zo(t))),n)}withPlainTime(e=void 0){vt(this,yt);const t=un(e);return wn(xt(re(this,T).isoDate,t),re(this,E))}withCalendar(e){vt(this,yt);const t=kn(e);return wn(re(this,T),t)}add(e,t=void 0){return vt(this,yt),bo("add",this,e,t)}subtract(e,t=void 0){return vt(this,yt),bo("subtract",this,e,t)}until(e,t=void 0){return vt(this,yt),ho("until",this,e,t)}since(e,t=void 0){return vt(this,yt),ho("since",this,e,t)}round(e){if(vt(this,yt),void 0===e)throw new TypeError("options parameter is required");const t="string"==typeof e?Fo("smallestUnit",e):Zo(e),n=Ft(t),r=Ut(t,"halfExpand"),o=Wt(t,"smallestUnit","time",qt,["day"]),i={day:1,hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[o];Ht(n,i,1===i);const a=re(this,T);return wn(1===n&&"nanosecond"===o?a:Co(a,n,o,r),re(this,E))}equals(e){vt(this,yt);const t=an(e);return 0===jo(re(this,T),re(t,T))&&xn(re(this,E),re(t,E))}toString(e=void 0){vt(this,yt);const t=Zo(e),n=Zt(t),r=zt(t),o=Ut(t,"trunc"),i=Wt(t,"smallestUnit","time",void 0);if("hour"===i)throw new RangeError('smallestUnit must be a time unit other than "hour"');const{precision:a,unit:s,increment:c}=At(i,r),d=Co(re(this,T),c,s,o);return Br(d),nr(d,re(this,E),a,n)}toJSON(){return vt(this,yt),nr(re(this,T),re(this,E),"auto")}toLocaleString(e=void 0,t=void 0){return vt(this,yt),new di(e,t).format(this)}valueOf(){qo("PlainDateTime")}toZonedDateTime(e,t=void 0){vt(this,yt);const n=Bn(e),r=Pt(Zo(t));return $n(An(n,re(this,T),r),n,re(this,E))}toPlainDate(){return vt(this,yt),pn(re(this,T).isoDate,re(this,E))}toPlainTime(){return vt(this,yt),Tn(re(this,T).time)}static from(e,t=void 0){return an(e,t)}static compare(e,t){const n=an(e),r=an(t);return jo(re(n,T),re(r,T))}}function xi(e,t){vt(e,yt);const n=re(e,T).isoDate;return Qt(e).isoToDate(n,{[t]:!0})[t]}function Li(e,t){return vt(e,yt),re(e,T).time[t]}ae(PlainDateTime,"Temporal.PlainDateTime");class Duration{constructor(e=0,t=0,n=0,r=0,o=0,i=0,a=0,s=0,c=0,d=0){const h=void 0===e?0:Ge(e),u=void 0===t?0:Ge(t),l=void 0===n?0:Ge(n),m=void 0===r?0:Ge(r),f=void 0===o?0:Ge(o),y=void 0===i?0:Ge(i),p=void 0===a?0:Ge(a),g=void 0===s?0:Ge(s),w=void 0===c?0:Ge(c),v=void 0===d?0:Ge(d);zr(h,u,l,m,f,y,p,g,w,v),te(this),oe(this,Y,h),oe(this,R,u),oe(this,S,l),oe(this,j,m),oe(this,k,f),oe(this,N,y),oe(this,x,p),oe(this,L,g),oe(this,P,w),oe(this,U,v)}get years(){return vt(this,lt),re(this,Y)}get months(){return vt(this,lt),re(this,R)}get weeks(){return vt(this,lt),re(this,S)}get days(){return vt(this,lt),re(this,j)}get hours(){return vt(this,lt),re(this,k)}get minutes(){return vt(this,lt),re(this,N)}get seconds(){return vt(this,lt),re(this,x)}get milliseconds(){return vt(this,lt),re(this,L)}get microseconds(){return vt(this,lt),re(this,P)}get nanoseconds(){return vt(this,lt),re(this,U)}get sign(){return vt(this,lt),Mr(this)}get blank(){return vt(this,lt),0===Mr(this)}with(e){vt(this,lt);const t=kt(e),{years:n=re(this,Y),months:r=re(this,R),weeks:o=re(this,S),days:i=re(this,j),hours:a=re(this,k),minutes:s=re(this,N),seconds:c=re(this,x),milliseconds:d=re(this,L),microseconds:h=re(this,P),nanoseconds:u=re(this,U)}=t;return new Duration(n,r,o,i,a,s,c,d,h,u)}negated(){return vt(this,lt),Sr(this)}abs(){return vt(this,lt),new Duration(Math.abs(re(this,Y)),Math.abs(re(this,R)),Math.abs(re(this,S)),Math.abs(re(this,j)),Math.abs(re(this,k)),Math.abs(re(this,N)),Math.abs(re(this,x)),Math.abs(re(this,L)),Math.abs(re(this,P)),Math.abs(re(this,U)))}add(e){return vt(this,lt),go("add",this,e)}subtract(e){return vt(this,lt),go("subtract",this,e)}round(e){if(vt(this,lt),void 0===e)throw new TypeError("options parameter is required");const t=Jt(this),n="string"==typeof e?Fo("smallestUnit",e):Zo(e);let r=Wt(n,"largestUnit","datetime",void 0,["auto"]),{plainRelativeTo:o,zonedRelativeTo:i}=_t(n);const a=Ft(n),s=Ut(n,"halfExpand");let c=Wt(n,"smallestUnit","datetime",void 0),d=!0;c||(d=!1,c="nanosecond");const h=Gt(t,c);let u=!0;if(r||(u=!1,r=h),"auto"===r&&(r=h),!d&&!u)throw new RangeError("at least one of smallestUnit or largestUnit is required");if(Gt(r,c)!==r)throw new RangeError(`largestUnit ${r} cannot be smaller than smallestUnit ${c}`);const l={hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[c];if(void 0!==l&&Ht(a,l,!1),a>1&&"date"===Vt(c)&&r!==c)throw new RangeError("For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit");if(i){let e=Ar(this);const t=re(i,$),n=re(i,E),o=re(i,b);return e=io(o,po(o,t,n,e),t,n,r,a,c,s),"date"===Vt(r)&&(r="hour"),_r(e,r)}if(o){let e=qr(this);const t=fo({deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0},e.time),n=re(o,D),i=re(o,E),d=Sn(i,n,Nt(e.date,t.deltaDays),"constrain");return e=oo(xt(n,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),xt(d,t),i,r,a,c,s),_r(e,r)}if(Kt(t))throw new RangeError(`a starting point is required for ${t}s balancing`);if(Kt(r))throw new RangeError(`a starting point is required for ${r}s balancing`);let m=qr(this);if("day"===c){const{quotient:e,remainder:t}=m.time.divmod(Se);let n=m.date.days+e+Yo(t,"day");n=Eo(n,a,s),m=Jr({years:0,months:0,weeks:0,days:n},TimeDuration.ZERO)}else m=Jr({years:0,months:0,weeks:0,days:0},$o(m.time,a,c,s));return _r(m,r)}total(t){if(vt(this,lt),void 0===t)throw new TypeError("options argument is required");const n="string"==typeof t?Fo("unit",t):Zo(t);let{plainRelativeTo:r,zonedRelativeTo:o}=_t(n);const i=Wt(n,"unit","datetime",qt);if(o){const e=Ar(this),t=re(o,$),n=re(o,E),r=re(o,b);return function(e,t,n,r,o){return"time"===Vt(o)?Yo(TimeDuration.fromEpochNsDiff(t,e),o):ro(eo(e,t,n,r,o),t,zn(n,e),n,r,o)}(r,po(r,t,n,e),t,n,i)}if(r){const t=qr(this);let n=fo({deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0},t.time);const o=re(r,D),a=re(r,E),s=Sn(a,o,Nt(t.date,n.deltaDays),"constrain");return function(t,n,r,o){if(0==jo(t,n))return 0;Br(t),Br(n);const i=Qr(t,n,r,o);return"nanosecond"===o?e.toNumber(i.time.totalNs):ro(i,pr(n),t,null,r,o)}(xt(o,{deltaDays:0,hour:0,minute:0,second:0,millisecond:0,microsecond:0,nanosecond:0}),xt(s,n),a,i)}const a=Jt(this);if(Kt(a))throw new RangeError(`a starting point is required for ${a}s total`);if(Kt(i))throw new RangeError(`a starting point is required for ${i}s total`);return Yo(qr(this).time,i)}toString(e=void 0){vt(this,lt);const t=Zo(e),n=zt(t),r=Ut(t,"trunc"),o=Wt(t,"smallestUnit","time",void 0);if("hour"===o||"minute"===o)throw new RangeError('smallestUnit must be a time unit other than "hours" or "minutes"');const{precision:i,unit:a,increment:s}=At(o,n);if("nanosecond"===a&&1===s)return Qn(this,i);const c=Jt(this);let d=Ar(this);const h=$o(d.time,s,a,r);return d=Jr(d.date,h),Qn(_r(d,Gt(c,"second")),i)}toJSON(){return vt(this,lt),Qn(this,"auto")}toLocaleString(e=void 0,t=void 0){if(vt(this,lt),"function"==typeof Intl.DurationFormat){const n=new Intl.DurationFormat(e,t);return ji.call(n,this)}return console.warn("Temporal.Duration.prototype.toLocaleString() requires Intl.DurationFormat."),Qn(this,"auto")}valueOf(){qo("Duration")}static from(e){return sn(e)}static compare(t,n,r=void 0){const o=sn(t),i=sn(n),a=Zo(r),{plainRelativeTo:s,zonedRelativeTo:c}=_t(a);if(re(o,Y)===re(i,Y)&&re(o,R)===re(i,R)&&re(o,S)===re(i,S)&&re(o,j)===re(i,j)&&re(o,k)===re(i,k)&&re(o,N)===re(i,N)&&re(o,x)===re(i,x)&&re(o,L)===re(i,L)&&re(o,P)===re(i,P)&&re(o,U)===re(i,U))return 0;const d=Jt(o),h=Jt(i),u=Ar(o),l=Ar(i);if(c&&("date"===Vt(d)||"date"===Vt(h))){const t=re(c,$),n=re(c,E),r=re(c,b),o=po(r,t,n,u),i=po(r,t,n,l);return Bo(e.toNumber(e.subtract(o,i)))}let m=u.date.days,f=l.date.days;if(Kt(d)||Kt(h)){if(!s)throw new RangeError("A starting point is required for years, months, or weeks comparison");m=Rr(u.date,s),f=Rr(l.date,s)}const y=u.time.add24HourDays(m),p=l.time.add24HourDays(f);return y.cmp(p)}}ae(Duration,"Temporal.Duration");class PlainMonthDay{constructor(e,t,n="iso8601",r=1972){const o=_e(e),i=_e(t),a=zo(void 0===n?"iso8601":Ve(n)),s=_e(r);xr(s,o,i),vn(this,{year:s,month:o,day:i},a)}get monthCode(){return Pi(this,"monthCode")}get day(){return Pi(this,"day")}get calendarId(){return vt(this,gt),re(this,E)}with(e,t=void 0){if(vt(this,gt),!Ae(e))throw new TypeError("invalid argument");bt(e);const n=re(this,E);let r=en(n,re(this,D),"month-day");return r=Rn(n,r,tn(n,e,["year","month","monthCode","day"],[],"partial")),bn(Un(n,r,Lt(Zo(t))),n)}equals(e){vt(this,gt);const t=dn(e);return 0===Ro(re(this,D),re(t,D))&&xn(re(this,E),re(t,E))}toString(e=void 0){return vt(this,gt),rr(this,Zt(Zo(e)))}toJSON(){return vt(this,gt),rr(this)}toLocaleString(e=void 0,t=void 0){return vt(this,gt),new di(e,t).format(this)}valueOf(){qo("PlainMonthDay")}toPlainDate(e){if(vt(this,gt),!Ae(e))throw new TypeError("argument should be an object");const t=re(this,E);return pn(Ln(t,Rn(t,en(t,re(this,D),"month-day"),tn(t,e,["year"],[],[])),"constrain"),t)}static from(e,t=void 0){return dn(e,t)}}function Pi(e,t){vt(e,gt);const n=re(e,D);return Qt(e).isoToDate(n,{[t]:!0})[t]}function Ui(e){return zn(e,Po())}ae(PlainMonthDay,"Temporal.PlainMonthDay");const Bi={instant:()=>Cn(Po()),plainDateTimeISO:(e=Uo())=>wn(Ui(Bn(e)),"iso8601"),plainDateISO:(e=Uo())=>pn(Ui(Bn(e)).isoDate,"iso8601"),plainTimeISO:(e=Uo())=>Tn(Ui(Bn(e)).time),timeZoneId:()=>Uo(),zonedDateTimeISO:(e=Uo())=>{const t=Bn(e);return $n(Po(),t,"iso8601")},[Symbol.toStringTag]:"Temporal.Now"};Object.defineProperty(Bi,Symbol.toStringTag,{value:"Temporal.Now",writable:!1,enumerable:!1,configurable:!0});class PlainTime{constructor(e=0,t=0,n=0,r=0,o=0,i=0){const a=void 0===e?0:_e(e),s=void 0===t?0:_e(t),c=void 0===n?0:_e(n),d=void 0===r?0:_e(r),h=void 0===o?0:_e(o),u=void 0===i?0:_e(i);Pr(a,s,c,d,h,u),Dn(this,{hour:a,minute:s,second:c,millisecond:d,microsecond:h,nanosecond:u})}get hour(){return vt(this,ft),re(this,M).hour}get minute(){return vt(this,ft),re(this,M).minute}get second(){return vt(this,ft),re(this,M).second}get millisecond(){return vt(this,ft),re(this,M).millisecond}get microsecond(){return vt(this,ft),re(this,M).microsecond}get nanosecond(){return vt(this,ft),re(this,M).nanosecond}with(e,t=void 0){if(vt(this,ft),!Ae(e))throw new TypeError("invalid argument");bt(e);const n=nn(e,"partial"),r=nn(this);let{hour:o,minute:i,second:a,millisecond:s,microsecond:c,nanosecond:d}=Object.assign(r,n);const h=Lt(Zo(t));return({hour:o,minute:i,second:a,millisecond:s,microsecond:c,nanosecond:d}=jt(o,i,a,s,c,d,h)),new PlainTime(o,i,a,s,c,d)}add(e){return vt(this,ft),Do("add",this,e)}subtract(e){return vt(this,ft),Do("subtract",this,e)}until(e,t=void 0){return vt(this,ft),uo("until",this,e,t)}since(e,t=void 0){return vt(this,ft),uo("since",this,e,t)}round(e){if(vt(this,ft),void 0===e)throw new TypeError("options parameter is required");const t="string"==typeof e?Fo("smallestUnit",e):Zo(e),n=Ft(t),r=Ut(t,"halfExpand"),o=Wt(t,"smallestUnit","time",qt);return Ht(n,{hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[o],!1),Tn(Oo(re(this,M),n,o,r))}equals(e){vt(this,ft);const t=hn(e);return 0===So(re(this,M),re(t,M))}toString(e=void 0){vt(this,ft);const t=Zo(e),n=zt(t),r=Ut(t,"trunc"),o=Wt(t,"smallestUnit","time",void 0);if("hour"===o)throw new RangeError('smallestUnit must be a time unit other than "hour"');const{precision:i,unit:a,increment:s}=At(o,n);return tr(Oo(re(this,M),s,a,r),i)}toJSON(){return vt(this,ft),tr(re(this,M),"auto")}toLocaleString(e=void 0,t=void 0){return vt(this,ft),new di(e,t).format(this)}valueOf(){qo("PlainTime")}static from(e,t=void 0){return hn(e,t)}static compare(e,t){const n=hn(e),r=hn(t);return So(re(n,M),re(r,M))}}ae(PlainTime,"Temporal.PlainTime");class PlainYearMonth{constructor(e,t,n="iso8601",r=1){const o=_e(e),i=_e(t),a=zo(void 0===n?"iso8601":Ve(n)),s=_e(r);xr(o,i,s),Mn(this,{year:o,month:i,day:s},a)}get year(){return Zi(this,"year")}get month(){return Zi(this,"month")}get monthCode(){return Zi(this,"monthCode")}get calendarId(){return vt(this,pt),re(this,E)}get era(){return Zi(this,"era")}get eraYear(){return Zi(this,"eraYear")}get daysInMonth(){return Zi(this,"daysInMonth")}get daysInYear(){return Zi(this,"daysInYear")}get monthsInYear(){return Zi(this,"monthsInYear")}get inLeapYear(){return Zi(this,"inLeapYear")}with(e,t=void 0){if(vt(this,pt),!Ae(e))throw new TypeError("invalid argument");bt(e);const n=re(this,E);let r=en(n,re(this,D),"year-month");return r=Rn(n,r,tn(n,e,["year","month","monthCode"],[],"partial")),En(Pn(n,r,Lt(Zo(t))),n)}add(e,t=void 0){return vt(this,pt),To("add",this,e,t)}subtract(e,t=void 0){return vt(this,pt),To("subtract",this,e,t)}until(e,t=void 0){return vt(this,pt),lo("until",this,e,t)}since(e,t=void 0){return vt(this,pt),lo("since",this,e,t)}equals(e){vt(this,pt);const t=ln(e);return 0===Ro(re(this,D),re(t,D))&&xn(re(this,E),re(t,E))}toString(e=void 0){return vt(this,pt),or(this,Zt(Zo(e)))}toJSON(){return vt(this,pt),or(this)}toLocaleString(e=void 0,t=void 0){return vt(this,pt),new di(e,t).format(this)}valueOf(){qo("PlainYearMonth")}toPlainDate(e){if(vt(this,pt),!Ae(e))throw new TypeError("argument should be an object");const t=re(this,E);return pn(Ln(t,Rn(t,en(t,re(this,D),"year-month"),tn(t,e,["day"],[],[])),"constrain"),t)}static from(e,t=void 0){return ln(e,t)}static compare(e,t){const n=ln(e),r=ln(t);return Ro(re(n,D),re(r,D))}}function Zi(e,t){vt(e,pt);const n=re(e,D);return Qt(e).isoToDate(n,{[t]:!0})[t]}ae(PlainYearMonth,"Temporal.PlainYearMonth");const Fi=di.prototype.resolvedOptions;class ZonedDateTime{constructor(e,t,n="iso8601"){if(arguments.length<1)throw new TypeError("missing argument: epochNanoseconds is required");const r=Lo(e);let o=Ve(t);const{tzName:i,offsetMinutes:a}=Rt(o);if(void 0===a){const e=hr(i);if(!e)throw new RangeError(`unknown time zone ${i}`);o=e.identifier}else o=mr(a);On(this,r,o,zo(void 0===n?"iso8601":Ve(n)))}get calendarId(){return vt(this,wt),re(this,E)}get timeZoneId(){return vt(this,wt),re(this,$)}get year(){return zi(this,"year")}get month(){return zi(this,"month")}get monthCode(){return zi(this,"monthCode")}get day(){return zi(this,"day")}get hour(){return Ai(this,"hour")}get minute(){return Ai(this,"minute")}get second(){return Ai(this,"second")}get millisecond(){return Ai(this,"millisecond")}get microsecond(){return Ai(this,"microsecond")}get nanosecond(){return Ai(this,"nanosecond")}get era(){return zi(this,"era")}get eraYear(){return zi(this,"eraYear")}get epochMilliseconds(){return vt(this,wt),No(re(this,b),"floor")}get epochNanoseconds(){return vt(this,wt),ko(re(this,b))}get dayOfWeek(){return zi(this,"dayOfWeek")}get dayOfYear(){return zi(this,"dayOfYear")}get weekOfYear(){return zi(this,"weekOfYear")?.week}get yearOfWeek(){return zi(this,"weekOfYear")?.year}get hoursInDay(){vt(this,wt);const e=re(this,$),t=Hi(this).isoDate,n=Or(t.year,t.month,t.day+1),r=_n(e,t),o=_n(e,n);return Yo(TimeDuration.fromEpochNsDiff(o,r),"hour")}get daysInWeek(){return zi(this,"daysInWeek")}get daysInMonth(){return zi(this,"daysInMonth")}get daysInYear(){return zi(this,"daysInYear")}get monthsInYear(){return zi(this,"monthsInYear")}get inLeapYear(){return zi(this,"inLeapYear")}get offset(){return vt(this,wt),Hn(Fn(re(this,$),re(this,b)))}get offsetNanoseconds(){return vt(this,wt),Fn(re(this,$),re(this,b))}with(e,t=void 0){if(vt(this,wt),!Ae(e))throw new TypeError("invalid zoned-date-time-like");bt(e);const n=re(this,E),r=re(this,$),o=Fn(r,re(this,b)),i=Hi(this);let a={...en(n,i.isoDate),...i.time,offset:Hn(o)};a=Rn(n,a,tn(n,e,["year","month","monthCode","day"],["hour","minute","second","millisecond","microsecond","nanosecond","offset"],"partial"));const s=Zo(t),c=Pt(s),d=Bt(s,"prefer"),h=on(n,a,Lt(s)),u=sr(a.offset);return $n(mn(h.isoDate,h.time,"option",u,r,c,d,!1),r,n)}withPlainTime(e=void 0){vt(this,wt);const t=re(this,$),n=re(this,E),r=Hi(this).isoDate;let o;return o=void 0===e?_n(t,r):An(t,xt(r,re(hn(e),M)),"compatible"),$n(o,t,n)}withTimeZone(e){vt(this,wt);const t=Bn(e);return $n(re(this,b),t,re(this,E))}withCalendar(e){vt(this,wt);const t=kn(e);return $n(re(this,b),re(this,$),t)}add(e,t=void 0){return vt(this,wt),Mo("add",this,e,t)}subtract(e,t=void 0){return vt(this,wt),Mo("subtract",this,e,t)}until(e,t=void 0){return vt(this,wt),mo("until",this,e,t)}since(e,t=void 0){return vt(this,wt),mo("since",this,e,t)}round(t){if(vt(this,wt),void 0===t)throw new TypeError("options parameter is required");const n="string"==typeof t?Fo("smallestUnit",t):Zo(t),r=Ft(n),o=Ut(n,"halfExpand"),i=Wt(n,"smallestUnit","time",qt,["day"]),a={day:1,hour:24,minute:60,second:60,millisecond:1e3,microsecond:1e3,nanosecond:1e3}[i];if(Ht(r,a,1===a),"nanosecond"===i&&1===r)return $n(re(this,b),re(this,$),re(this,E));const s=re(this,$),c=re(this,b),d=Hi(this);let h;if("day"===i){const t=d.isoDate,n=Or(t.year,t.month,t.day+1),r=_n(s,t),i=_n(s,n),a=e.subtract(i,r);h=TimeDuration.fromEpochNsDiff(c,r).round(a,o).addToEpochNs(r)}else{const e=Co(d,r,i,o),t=Fn(s,c);h=mn(e.isoDate,e.time,"option",t,s,"compatible","prefer",!1)}return $n(h,s,re(this,E))}equals(t){vt(this,wt);const n=fn(t),r=re(this,b),o=re(n,b);return!!e.equal(e.BigInt(r),e.BigInt(o))&&!!Zn(re(this,$),re(n,$))&&xn(re(this,E),re(n,E))}toString(e=void 0){vt(this,wt);const t=Zo(e),n=Zt(t),r=zt(t),o=function(e){return Ho(e,"offset",["auto","never"],"auto")}(t),i=Ut(t,"trunc"),a=Wt(t,"smallestUnit","time",void 0);if("hour"===a)throw new RangeError('smallestUnit must be a time unit other than "hour"');const s=function(e){return Ho(e,"timeZoneName",["auto","never","critical"],"auto")}(t),{precision:c,unit:d,increment:h}=At(a,r);return ir(this,c,n,s,o,{unit:d,increment:h,roundingMode:i})}toLocaleString(e=void 0,t=void 0){vt(this,wt);const n=Zo(t),r=Object.create(null);if(function(e,t,n,r){if(null==t)return;const o=Reflect.ownKeys(t);for(let i=0;i<o.length;i++){const a=o[i];if(!n.some((e=>Object.is(e,a)))&&Object.prototype.propertyIsEnumerable.call(t,a)){const n=t[a];r,e[a]=n}}}(r,n,["timeZone"]),void 0!==n.timeZone)throw new TypeError("ZonedDateTime toLocaleString does not accept a timeZone option");if(void 0===r.year&&void 0===r.month&&void 0===r.day&&void 0===r.era&&void 0===r.weekday&&void 0===r.dateStyle&&void 0===r.hour&&void 0===r.minute&&void 0===r.second&&void 0===r.fractionalSecondDigits&&void 0===r.timeStyle&&void 0===r.dayPeriod&&void 0===r.timeZoneName&&(r.timeZoneName="short"),r.timeZone=re(this,$),ar(r.timeZone))throw new RangeError("toLocaleString does not currently support offset time zones");const o=new di(e,r),i=Fi.call(o).calendar,a=re(this,E);if("iso8601"!==a&&"iso8601"!==i&&!xn(i,a))throw new RangeError(`cannot format ZonedDateTime with calendar ${a} in locale with calendar ${i}`);return o.format(Cn(re(this,b)))}toJSON(){return vt(this,wt),ir(this,"auto")}valueOf(){qo("ZonedDateTime")}startOfDay(){vt(this,wt);const e=re(this,$);return $n(_n(e,Hi(this).isoDate),e,re(this,E))}getTimeZoneTransition(e){vt(this,wt);const t=re(this,$);if(void 0===e)throw new TypeError("options parameter is required");const n=Ho("string"==typeof e?Fo("direction",e):Zo(e),"direction",["next","previous"],qt);if(void 0===n)throw new TypeError("direction option is required");if(ar(t)||"UTC"===t)return null;const r=re(this,b),o="next"===n?wr(t,r):vr(t,r);return null===o?null:$n(o,t,re(this,E))}toInstant(){return vt(this,wt),Cn(re(this,b))}toPlainDate(){return vt(this,wt),pn(Hi(this).isoDate,re(this,E))}toPlainTime(){return vt(this,wt),Tn(Hi(this).time)}toPlainDateTime(){return vt(this,wt),wn(Hi(this),re(this,E))}static from(e,t=void 0){return fn(e,t)}static compare(t,n){const r=fn(t),o=fn(n),i=re(r,b),a=re(o,b);return e.lessThan(e.BigInt(i),e.BigInt(a))?-1:e.greaterThan(e.BigInt(i),e.BigInt(a))?1:0}}function Hi(e){return zn(re(e,$),re(e,b))}function zi(e,t){vt(e,wt);const n=Hi(e).isoDate;return Qt(e).isoToDate(n,{[t]:!0})[t]}function Ai(e,t){return vt(e,wt),Hi(e).time[t]}ae(ZonedDateTime,"Temporal.ZonedDateTime");var qi=Object.freeze({__proto__:null,Duration,Instant,Now:Bi,PlainDate,PlainDateTime,PlainMonthDay,PlainTime,PlainYearMonth,ZonedDateTime});const Wi=class LegacyDateImpl{toTemporalInstant(){return Cn(xo(Date.prototype.valueOf.call(this)))}}.prototype.toTemporalInstant,_i=[Instant,PlainDate,PlainDateTime,Duration,PlainMonthDay,PlainTime,PlainYearMonth,ZonedDateTime];for(const e of _i){const t=Object.getOwnPropertyDescriptor(e,"prototype");(t.configurable||t.enumerable||t.writable)&&(t.configurable=!1,t.enumerable=!1,t.writable=!1,Object.defineProperty(e,"prototype",t))}exports.Intl=ki,exports.Temporal=qi,exports.toTemporalInstant=Wi;
//# sourceMappingURL=index.cjs.map


/***/ }),

/***/ 589:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let _js_temporal_polyfill = __nccwpck_require__(946);
//#region src/RRuleTemporal.ts
const allowedFreq = [
	"YEARLY",
	"MONTHLY",
	"WEEKLY",
	"DAILY",
	"HOURLY",
	"MINUTELY",
	"SECONDLY"
];
const allowedWeekdays = [
	"MO",
	"TU",
	"WE",
	"TH",
	"FR",
	"SA",
	"SU"
];
const weekdayToIsoDay = {
	MO: 1,
	TU: 2,
	WE: 3,
	TH: 4,
	FR: 5,
	SA: 6,
	SU: 7
};
const allowedFreqSet = new Set(allowedFreq);
const allowedWeekdaysSet = new Set(allowedWeekdays);
const byDayTokenRegex = new RegExp(`^([+-]?\\d{1,2})?(${allowedWeekdays.join("|")})$`);
const byDayWeekdaySuffixRegex = new RegExp(`(${allowedWeekdays.join("|")})$`);
const MS_PER_SECOND = 1e3;
const MS_PER_DAY = 24 * (60 * (60 * MS_PER_SECOND));
const MS_PER_WEEK = 7 * MS_PER_DAY;
const GREGORIAN_MONTH_LENGTHS = [
	31,
	28,
	31,
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31
];
const GREGORIAN_WEEKDAY_OFFSETS = [
	0,
	3,
	2,
	5,
	0,
	3,
	5,
	1,
	4,
	6,
	2,
	4
];
const NS_PER_MILLISECOND = BigInt(1e6);
const NS_PER_SECOND = BigInt(1e9);
const NS_PER_MINUTE = BigInt(60) * NS_PER_SECOND;
const NS_PER_HOUR = BigInt(60) * NS_PER_MINUTE;
const NS_PER_DAY = BigInt(24) * NS_PER_HOUR;
const NS_PER_WEEK = BigInt(7) * NS_PER_DAY;
function addIsoDays(dayOfWeek, deltaDays) {
	return (dayOfWeek - 1 + deltaDays % 7 + 7) % 7 + 1;
}
function extractWeekdayToken(token) {
	const weekday = token.toUpperCase().match(byDayWeekdaySuffixRegex)?.[1];
	if (!weekday || !allowedWeekdaysSet.has(weekday)) return null;
	return weekday;
}
function parseByDayToken(token) {
	const m = token.toUpperCase().match(byDayTokenRegex);
	if (!m) return null;
	const ord = m[1] ? parseInt(m[1], 10) : 0;
	const weekday = m[2];
	if (!weekday || !allowedWeekdaysSet.has(weekday)) return null;
	return {
		ord,
		weekday
	};
}
function isIcsOpts(opts) {
	return typeof opts.rruleString === "string";
}
function mergeDateLists(parsedDates, suppliedDates) {
	const merged = [...parsedDates ?? [], ...suppliedDates ?? []];
	return merged.length > 0 ? merged : void 0;
}
/**
* Unfold lines according to RFC 5545 specification.
* Lines can be folded by inserting CRLF followed by a single linear white-space character.
* This function removes such folding by removing CRLF and the immediately following space/tab.
*/
function unfoldLine(foldedLine) {
	return foldedLine.replace(/\r?\n[ \t]/g, "");
}
/**
* Parse a single ICS date-time string into a Temporal.ZonedDateTime
*/
function parseIcsDateTime(dateStr, tzid, valueType) {
	const isDate = valueType === "DATE" || !dateStr.includes("T");
	const isoDate = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
	if (isDate) return _js_temporal_polyfill.Temporal.PlainDate.from(isoDate).toZonedDateTime({ timeZone: tzid });
	if (dateStr.endsWith("Z")) {
		const iso = `${isoDate}T${dateStr.slice(9, 15)}Z`;
		return _js_temporal_polyfill.Temporal.Instant.from(iso).toZonedDateTimeISO(tzid || "UTC");
	} else {
		const iso = `${isoDate}T${dateStr.slice(9)}`;
		return _js_temporal_polyfill.Temporal.PlainDateTime.from(iso).toZonedDateTime(tzid);
	}
}
/**
* Parse date values from EXDATE or RDATE lines
*/
function parseDateLines(lines, linePrefix, defaultTzid) {
	const dates = [];
	const regex = new RegExp(`^${linePrefix}(?:;VALUE=([^;]+))?(?:;TZID=([^:]+))?:(.+)`, "i");
	for (const line of lines) {
		const match = line.match(regex);
		if (match) {
			const [, valueType, tzid, dateValuesStr] = match;
			const timezone = tzid || defaultTzid;
			const dateValues = dateValuesStr.split(",");
			dates.push(...dateValues.map((dateValue) => parseIcsDateTime(dateValue, timezone, valueType)));
		}
	}
	return dates;
}
function parseNumberArray(val, sort = false) {
	const arr = val.split(",").map((n) => parseInt(n, 10));
	if (sort) return arr.sort((a, b) => a - b);
	return arr;
}
/**
* Parse BYMONTH values, supporting RFC 7529 leap-month tokens with an "L" suffix (e.g., "5L").
* Returns a heterogeneous array keeping original tokens for serialization.
*/
function parseByMonthArray(val) {
	return val.split(",").map((tok) => {
		const t = tok.trim();
		if (/^\d+L$/i.test(t)) return t.toUpperCase();
		const n = parseInt(t, 10);
		return Number.isFinite(n) ? n : t;
	});
}
/**
* Parse either a full ICS snippet or an RRULE line into ManualOpts.
*
* @param input - String containing a `DTSTART` line followed by `RRULE` and
*   optional `EXDATE`/`RDATE` lines. Can also be just an `RRULE:` line or
*   recurrence pattern without DTSTART (dtstart must be provided separately).
* @param targetTimezone - Optional IANA time zone identifier used when the
*   `DTSTART` line omits `TZID`. Floating times are interpreted in this zone
*   and the resulting `tzid` field in the returned options will be set to this
*   value. If `DTSTART` already specifies a `TZID` this parameter is ignored.
* @param dtstart - Optional DTSTART to use when input doesn't contain one.
*
* Examples:
* ```ts
* parseRRuleString(
*   `DTSTART:20240101T090000\nRRULE:FREQ=DAILY`,
*   'America/New_York'
* );
* // => opts.tzid === 'America/New_York'
*
* parseRRuleString(
*   `DTSTART;TZID=Europe/Paris:20240101T090000\nRRULE:FREQ=DAILY`
* );
* // => opts.tzid === 'Europe/Paris' (targetTimezone ignored)
*
* parseRRuleString(
*   `FREQ=DAILY;COUNT=5`,
*   'UTC',
*   Temporal.ZonedDateTime.from('2025-01-01T09:00:00[UTC]')
* );
* // => opts.dtstart from parameter
* ```
*/
function parseRRuleString(input, targetTimezone, dtstart, strict = false) {
	const unfoldedInput = unfoldLine(input).trim();
	let parsedDtstart;
	let tzid = targetTimezone;
	let dtstartValueType = "DATE-TIME";
	let dtstartHasTzid = false;
	let dtstartIsUtc = false;
	let rruleLine;
	let exDate = [];
	let rDate = [];
	if (/^DTSTART/im.test(unfoldedInput)) {
		const lines = unfoldedInput.split(/\s+/);
		const dtLine = lines.find((line) => line.match(/^DTSTART/i));
		const rrLine = lines.find((line) => line.match(/^RRULE:/i));
		const exLines = lines.filter((line) => line.match(/^EXDATE/i));
		const rLines = lines.filter((line) => line.match(/^RDATE/i));
		const dtMatch = dtLine.match(/DTSTART(?:;VALUE=([^;]+))?(?:;TZID=([^:]+))?:(.+)/i);
		if (!dtMatch) throw new Error("Invalid DTSTART in ICS snippet");
		const [, valueType, dtTzid, dtValue] = dtMatch;
		dtstartValueType = (valueType || (dtValue?.includes("T") ? "DATE-TIME" : "DATE")).toUpperCase() === "DATE" ? "DATE" : "DATE-TIME";
		dtstartHasTzid = Boolean(dtTzid);
		dtstartIsUtc = Boolean(dtValue?.endsWith("Z"));
		parsedDtstart = parseIcsDateTime(dtValue, dtTzid ?? targetTimezone ?? tzid ?? "UTC", dtstartValueType);
		tzid = dtTzid ?? parsedDtstart.timeZoneId ?? targetTimezone ?? tzid ?? "UTC";
		rruleLine = rrLine;
		exDate = parseDateLines(exLines, "EXDATE", tzid ?? "UTC");
		rDate = parseDateLines(rLines, "RDATE", tzid ?? "UTC");
	} else {
		parsedDtstart = dtstart;
		rruleLine = unfoldedInput;
		if (parsedDtstart) {
			tzid = parsedDtstart.timeZoneId;
			dtstartValueType = "DATE-TIME";
			dtstartHasTzid = true;
			dtstartIsUtc = parsedDtstart.timeZoneId === "UTC";
		}
	}
	const parts = rruleLine ? rruleLine.replace(/^RRULE:/i, "").split(";") : [];
	const opts = {
		dtstart: parsedDtstart,
		tzid,
		exDate: exDate.length > 0 ? exDate : void 0,
		rDate: rDate.length > 0 ? rDate : void 0
	};
	let pendingSkip;
	for (const part of parts) {
		const [key, val] = part.split("=");
		if (!key) continue;
		switch (key.toUpperCase()) {
			case "RSCALE":
				if (val) {
					opts.rscale = val.toUpperCase();
					if (pendingSkip && !opts.skip) {
						opts.skip = pendingSkip;
						pendingSkip = void 0;
					}
				}
				break;
			case "SKIP": {
				const v = (val || "").toUpperCase();
				if (![
					"OMIT",
					"BACKWARD",
					"FORWARD"
				].includes(v)) throw new Error(`Invalid SKIP value: ${val}`);
				if (opts.rscale) opts.skip = v;
				else pendingSkip = v;
				break;
			}
			case "FREQ":
				opts.freq = val.toUpperCase();
				break;
			case "INTERVAL":
				opts.interval = parseInt(val, 10);
				break;
			case "COUNT":
				opts.count = parseInt(val, 10);
				break;
			case "UNTIL": {
				const untilHasTime = val.includes("T");
				if (dtstartValueType === "DATE") {
					if (untilHasTime) throw new Error("UNTIL rule part MUST have the same value type as DTSTART");
					opts.until = parseIcsDateTime(val, tzid || "UTC", "DATE");
					break;
				}
				if (!untilHasTime) {
					if (strict) throw new Error("UNTIL rule part MUST have the same value type as DTSTART");
					const localEndOfDay = parseIcsDateTime(val, tzid || "UTC", "DATE").with({
						hour: 23,
						minute: 59,
						second: 59,
						millisecond: 0,
						microsecond: 0,
						nanosecond: 0
					});
					opts.until = dtstartHasTzid || dtstartIsUtc ? localEndOfDay.withTimeZone("UTC") : localEndOfDay;
					break;
				}
				if ((dtstartHasTzid || dtstartIsUtc) && !val.endsWith("Z")) throw new Error("UNTIL rule part MUST always be specified as a date with UTC time");
				opts.until = parseIcsDateTime(val, tzid || "UTC", "DATE-TIME");
				break;
			}
			case "BYHOUR":
				opts.byHour = parseNumberArray(val, true);
				break;
			case "BYMINUTE":
				opts.byMinute = parseNumberArray(val, true);
				break;
			case "BYSECOND":
				opts.bySecond = parseNumberArray(val, true);
				break;
			case "BYDAY":
				opts.byDay = val.split(",").map((token) => token.toUpperCase());
				break;
			case "BYMONTH":
				opts.byMonth = parseByMonthArray(val);
				break;
			case "BYMONTHDAY":
				opts.byMonthDay = parseNumberArray(val);
				break;
			case "BYYEARDAY":
				opts.byYearDay = parseNumberArray(val);
				break;
			case "BYWEEKNO":
				opts.byWeekNo = parseNumberArray(val);
				break;
			case "BYSETPOS":
				opts.bySetPos = parseNumberArray(val);
				break;
			case "WKST":
				opts.wkst = val?.toUpperCase();
				break;
		}
	}
	if (pendingSkip && !opts.rscale) throw new Error("SKIP MUST NOT be present unless RSCALE is present");
	if (pendingSkip && opts.rscale && !opts.skip) opts.skip = pendingSkip;
	return opts;
}
var RRuleTemporal = class RRuleTemporal {
	static {
		this.rscaleCalendarSupport = {};
	}
	/**
	* Normalize a ZonedDateTime to the polyfill implementation.
	* This prevents type mismatches when mixing native and polyfill Temporal objects.
	*/
	static normalizeToPolyfill(zdt) {
		return _js_temporal_polyfill.Temporal.ZonedDateTime.from(zdt.toString());
	}
	constructor(params) {
		let manual;
		if (isIcsOpts(params)) {
			const parsed = parseRRuleString(params.rruleString, params.tzid, params.dtstart, params.strict ?? false);
			if (!parsed.dtstart) throw new Error("dtstart is required - provide it either in rruleString or as a separate parameter");
			this.tzid = parsed.tzid ?? params.tzid ?? "UTC";
			this.originalDtstart = RRuleTemporal.normalizeToPolyfill(parsed.dtstart);
			manual = {
				...parsed,
				rDate: mergeDateLists(parsed.rDate, params.rDate),
				exDate: mergeDateLists(parsed.exDate, params.exDate),
				count: params.count ?? parsed.count,
				until: params.until ?? parsed.until,
				strict: params.strict,
				maxIterations: params.maxIterations,
				includeDtstart: params.includeDtstart,
				tzid: this.tzid
			};
		} else {
			manual = { ...params };
			if (typeof manual.dtstart === "string") throw new Error("Manual dtstart must be a ZonedDateTime");
			manual.tzid = manual.tzid || manual.dtstart.timeZoneId;
			this.tzid = manual.tzid;
			this.originalDtstart = RRuleTemporal.normalizeToPolyfill(manual.dtstart);
		}
		if (!manual.freq) throw new Error("RRULE must include FREQ");
		manual.interval = manual.interval ?? 1;
		if (manual.interval <= 0) throw new Error("Cannot create RRule: interval must be greater than 0");
		if (manual.until && !(manual.until instanceof _js_temporal_polyfill.Temporal.ZonedDateTime)) throw new Error("Manual until must be a ZonedDateTime");
		if (manual.until) manual.until = RRuleTemporal.normalizeToPolyfill(manual.until);
		this.opts = this.sanitizeOpts(manual);
		this.maxIterations = manual.maxIterations ?? 1e4;
		this.includeDtstart = manual.includeDtstart ?? false;
		this.parsedByDayTokens = this.buildParsedByDayTokens(this.opts.byDay);
		this.simpleByDayIsoDays = this.buildByDayIsoDays(this.parsedByDayTokens, false);
		this.allByDayIsoDays = this.buildByDayIsoDays(this.parsedByDayTokens, true);
		this.hasOrdinalByDay = this.parsedByDayTokens?.some((token) => token.ord !== 0) ?? false;
		this.canUseEpochMillisecondsPrecisionFlag = this.originalDtstart.microsecond === 0 && this.originalDtstart.nanosecond === 0 && (!this.opts.until || this.opts.until.microsecond === 0 && this.opts.until.nanosecond === 0);
		this.timeSlotOffsetsMs = this.buildTimeSlotOffsetsMs();
		this.numericByMonths = this.opts.byMonth?.filter((value) => typeof value === "number");
	}
	buildParsedByDayTokens(byDay) {
		if (!byDay?.length) return void 0;
		const tokens = byDay.map((tok) => {
			const parsed = parseByDayToken(tok);
			if (!parsed) return null;
			return {
				ord: parsed.ord,
				weekday: parsed.weekday,
				isoDay: weekdayToIsoDay[parsed.weekday]
			};
		}).filter((token) => token !== null);
		return tokens.length > 0 ? tokens : void 0;
	}
	buildByDayIsoDays(tokens, includeOrdinals) {
		if (!tokens?.length) return void 0;
		const isoDays = tokens.filter((token) => includeOrdinals || token.ord === 0).map((token) => token.isoDay);
		if (!isoDays.length) return void 0;
		return [...new Set(isoDays)].sort((a, b) => a - b);
	}
	sanitizeNumericArray(arr, min, max, allowZero = false, sort = false) {
		if (!arr) return void 0;
		const sanitized = arr.filter((n) => Number.isInteger(n) && n >= min && n <= max && (allowZero || n !== 0));
		if (sanitized.length === 0) return void 0;
		return sort ? sanitized.sort((a, b) => a - b) : sanitized;
	}
	sanitizeByDay(byDay) {
		const days = (byDay ?? []).filter((day) => Boolean(day) && typeof day === "string");
		const normalized = [];
		for (const day of days) {
			const token = day.toUpperCase();
			const parsed = parseByDayToken(token);
			if (!parsed) throw new Error(`Invalid BYDAY value: ${day}`);
			if (parsed.ord === 0 && /^[+-]?\d/.test(token)) throw new Error(`Invalid BYDAY value: ${day}`);
			normalized.push(token);
		}
		return normalized.length > 0 ? normalized : void 0;
	}
	enforceStrictRfc(opts) {
		if (!opts.strict) return;
		const freq = opts.freq;
		if (opts.byWeekNo && freq !== "YEARLY") throw new Error("BYWEEKNO MUST NOT be used unless FREQ=YEARLY");
		if (opts.byYearDay && [
			"DAILY",
			"WEEKLY",
			"MONTHLY"
		].includes(freq)) throw new Error("BYYEARDAY MUST NOT be used when FREQ is DAILY, WEEKLY, or MONTHLY");
		if (opts.byMonthDay && freq === "WEEKLY") throw new Error("BYMONTHDAY MUST NOT be used when FREQ is WEEKLY");
		const hasNumericByDay = (opts.byDay ?? []).some((day) => /^[+-]?\d/.test(day));
		if (hasNumericByDay && !["MONTHLY", "YEARLY"].includes(freq)) throw new Error("BYDAY with numeric value MUST NOT be used unless FREQ is MONTHLY or YEARLY");
		if (hasNumericByDay && freq === "YEARLY" && opts.byWeekNo) throw new Error("BYDAY with numeric value MUST NOT be used with FREQ=YEARLY when BYWEEKNO is present");
		const hasOtherBy = Boolean(opts.byDay || opts.byMonth || opts.byMonthDay || opts.byYearDay || opts.byWeekNo || opts.byHour || opts.byMinute || opts.bySecond);
		if (opts.bySetPos && !hasOtherBy) throw new Error("BYSETPOS MUST be used with another BYxxx rule part");
	}
	sanitizeOpts(opts) {
		if (!allowedFreqSet.has(opts.freq)) throw new Error(`Invalid FREQ value: ${opts.freq}`);
		opts.byDay = this.sanitizeByDay(opts.byDay);
		if (opts.wkst) {
			const wkst = opts.wkst.toUpperCase();
			if (!allowedWeekdaysSet.has(wkst)) throw new Error(`Invalid WKST value: ${opts.wkst}`);
			opts.wkst = wkst;
		}
		if (opts.byMonth) {
			const numeric = opts.byMonth.filter((v) => typeof v === "number");
			const stringy = opts.byMonth.filter((v) => typeof v === "string");
			const merged = [...this.sanitizeNumericArray(numeric, 1, 12, false, false) ?? [], ...stringy];
			opts.byMonth = merged.length > 0 ? merged : void 0;
		}
		if (opts.rscale && !opts.skip) opts.skip = "OMIT";
		opts.byMonthDay = this.sanitizeNumericArray(opts.byMonthDay, -31, 31, false, false);
		opts.byYearDay = this.sanitizeNumericArray(opts.byYearDay, -366, 366, false, false);
		opts.byWeekNo = this.sanitizeNumericArray(opts.byWeekNo, -53, 53, false, false);
		opts.byHour = this.sanitizeNumericArray(opts.byHour, 0, 23, true, true);
		opts.byMinute = this.sanitizeNumericArray(opts.byMinute, 0, 59, true, true);
		opts.bySecond = this.sanitizeNumericArray(opts.bySecond, 0, 59, true, true);
		if (opts.bySetPos) {
			if (opts.bySetPos.some((p) => p === 0)) throw new Error("bySetPos may not contain 0");
			opts.bySetPos = this.sanitizeNumericArray(opts.bySetPos, -Infinity, Infinity, false, false);
		}
		this.enforceStrictRfc(opts);
		return opts;
	}
	rawAdvance(zdt) {
		const { freq, interval } = this.opts;
		switch (freq) {
			case "DAILY": return zdt.add({ days: interval });
			case "WEEKLY": return zdt.add({ weeks: interval });
			case "MONTHLY": return zdt.add({ months: interval });
			case "YEARLY": return zdt.add({ years: interval });
			case "HOURLY": {
				const originalHour = zdt.hour;
				let next = zdt.add({ hours: interval });
				if (next.hour === originalHour && interval === 1) next = next.add({ hours: interval });
				return next;
			}
			case "MINUTELY": return zdt.add({ minutes: interval });
			case "SECONDLY": return zdt.add({ seconds: interval });
			default: throw new Error(`Unsupported FREQ: ${freq}`);
		}
	}
	/**  Expand one base ZonedDateTime into all BYHOUR × BYMINUTE × BYSECOND
	*  combinations, keeping chronological order. If the options are not
	*  present the original date is returned unchanged.
	*/
	expandByTime(base) {
		if (!this.opts.byHour && !this.opts.byMinute && !this.opts.bySecond) return [base];
		const hours = this.opts.byHour ?? [base.hour];
		const minutes = this.opts.byMinute ?? [base.minute];
		const seconds = this.opts.bySecond ?? [base.second];
		if (hours.length === 1 && minutes.length === 1 && seconds.length === 1) {
			const hour = hours[0];
			const minute = minutes[0];
			const second = seconds[0];
			if (hour === base.hour && minute === base.minute && second === base.second) return [base];
			return [base.with({
				hour,
				minute,
				second
			})];
		}
		const out = [];
		for (const h of hours) for (const m of minutes) for (const s of seconds) out.push(base.with({
			hour: h,
			minute: m,
			second: s
		}));
		return out.sort((a, b) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(a, b));
	}
	nextCandidateSameDate(zdt) {
		const { freq, interval = 1, byHour, byMinute, bySecond } = this.opts;
		if (freq === "HOURLY" && byHour && byHour.length === 1) return this.applyTimeOverride(zdt.add({ days: interval }));
		if (freq === "MINUTELY" && byMinute && byMinute.length === 1) return this.applyTimeOverride(zdt.add({ hours: interval }));
		if (bySecond && bySecond.length > 1) {
			const idx = bySecond.indexOf(zdt.second);
			if (idx !== -1 && idx < bySecond.length - 1) return zdt.with({ second: bySecond[idx + 1] });
		}
		if (freq === "MINUTELY" && byHour && byHour.length > 1 && !byMinute) {
			const next = zdt.add({ minutes: interval });
			if (byHour.includes(next.hour)) return next.with({ second: bySecond ? bySecond[0] : zdt.second });
			const nextHour = byHour.find((h) => h > zdt.hour) || byHour[0];
			if (nextHour && nextHour > zdt.hour) return zdt.with({
				hour: nextHour,
				minute: 0,
				second: bySecond ? bySecond[0] : zdt.second
			});
			return this.applyTimeOverride(zdt.add({ days: 1 }));
		}
		if (freq === "SECONDLY") {
			let candidate = zdt;
			if (bySecond && bySecond.length > 0) {
				const nextSecondInList = bySecond.find((s) => s > candidate.second);
				if (nextSecondInList !== void 0) return candidate.with({ second: nextSecondInList });
				candidate = candidate.with({ second: bySecond[0] }).add({ minutes: 1 });
			} else candidate = candidate.add({ seconds: interval });
			if (byMinute && byMinute.length > 0) {
				if (!byMinute.includes(candidate.minute) || candidate.minute === zdt.minute && candidate.second < zdt.second) {
					const nextMinuteInList = byMinute.find((m) => m > candidate.minute);
					if (nextMinuteInList !== void 0) return candidate.with({
						minute: nextMinuteInList,
						second: bySecond ? bySecond[0] : 0
					});
					candidate = candidate.with({
						minute: byMinute[0],
						second: bySecond ? bySecond[0] : 0
					}).add({ hours: 1 });
				}
			}
			if (byHour && byHour.length > 0) {
				if (!byHour.includes(candidate.hour) || candidate.hour === zdt.hour && candidate.minute < zdt.minute) {
					const nextHourInList = byHour.find((h) => h > candidate.hour);
					if (nextHourInList !== void 0) return candidate.with({
						hour: nextHourInList,
						minute: byMinute ? byMinute[0] : 0,
						second: bySecond ? bySecond[0] : 0
					});
					candidate = candidate.with({
						hour: byHour[0],
						minute: byMinute ? byMinute[0] : 0,
						second: bySecond ? bySecond[0] : 0
					}).add({ days: 1 });
				}
			}
			return candidate;
		}
		if (byMinute && byMinute.length > 1) {
			const idx = byMinute.indexOf(zdt.minute);
			if (idx !== -1 && idx < byMinute.length - 1) return zdt.with({
				minute: byMinute[idx + 1],
				second: bySecond ? bySecond[0] : zdt.second
			});
			if (freq === "MINUTELY" && idx === byMinute.length - 1) {
				if (byHour && byHour.length > 0) {
					const currentHourIdx = byHour.indexOf(zdt.hour);
					if (currentHourIdx !== -1 && currentHourIdx < byHour.length - 1) return zdt.with({
						hour: byHour[currentHourIdx + 1],
						minute: byMinute[0],
						second: bySecond ? bySecond[0] : zdt.second
					});
					else return this.applyTimeOverride(zdt.add({ days: 1 }));
				}
				return zdt.add({ hours: interval }).with({
					minute: byMinute[0],
					second: bySecond ? bySecond[0] : zdt.second
				});
			}
		}
		if (byHour && byHour.length > 1) {
			const idx = byHour.indexOf(zdt.hour);
			if (idx !== -1 && idx < byHour.length - 1) return zdt.with({
				hour: byHour[idx + 1],
				minute: byMinute ? byMinute[0] : zdt.minute,
				second: bySecond ? bySecond[0] : zdt.second
			});
		}
		if (freq === "HOURLY" && byHour && byHour.length > 1) return this.applyTimeOverride(zdt.add({ days: 1 }));
		return this.applyTimeOverride(this.rawAdvance(zdt));
	}
	applyTimeOverride(zdt) {
		const { byHour, byMinute, bySecond } = this.opts;
		let dt = zdt;
		if (byHour) dt = dt.with({ hour: byHour[0] });
		if (byMinute) dt = dt.with({ minute: byMinute[0] });
		if (bySecond) dt = dt.with({ second: bySecond[0] });
		return dt;
	}
	computeFirst() {
		let zdt = this.originalDtstart;
		if (this.opts.byWeekNo?.length && [
			"DAILY",
			"HOURLY",
			"MINUTELY",
			"SECONDLY"
		].includes(this.opts.freq)) {
			let targetWeek = this.opts.byWeekNo[0];
			let targetYear = zdt.year;
			while (targetYear <= zdt.year + 10) {
				const jan1 = zdt.with({
					year: targetYear,
					month: 1,
					day: 1
				});
				const dec31 = zdt.with({
					year: targetYear,
					month: 12,
					day: 31
				});
				let hasTargetWeek = false;
				if (targetWeek > 0) {
					let maxWeek = 52;
					if (jan1.dayOfWeek === 4 || dec31.dayOfWeek === 4) maxWeek = 53;
					hasTargetWeek = targetWeek <= maxWeek;
				} else {
					let maxWeek = 52;
					if (jan1.dayOfWeek === 4 || dec31.dayOfWeek === 4) maxWeek = 53;
					hasTargetWeek = -targetWeek <= maxWeek;
				}
				if (hasTargetWeek) {
					const firstThursday = jan1.add({ days: (4 - jan1.dayOfWeek + 7) % 7 });
					let weekStart;
					if (targetWeek > 0) weekStart = firstThursday.subtract({ days: 3 }).add({ weeks: targetWeek - 1 });
					else {
						const lastWeek = jan1.dayOfWeek === 4 || dec31.dayOfWeek === 4 ? 53 : 52;
						weekStart = firstThursday.subtract({ days: 3 }).add({ weeks: lastWeek + targetWeek });
					}
					if (this.opts.byDay?.length) {
						const dayMap = weekdayToIsoDay;
						const targetDays = this.opts.byDay.map((tok) => extractWeekdayToken(tok)).filter((day) => day !== null).map((day) => dayMap[day]).filter(Boolean);
						if (targetDays.length) {
							const firstCandidate = targetDays.map((dayOfWeek) => {
								const delta = (dayOfWeek - weekStart.dayOfWeek + 7) % 7;
								return weekStart.add({ days: delta });
							}).sort((a, b) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(a, b))[0];
							if (firstCandidate && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(firstCandidate, this.originalDtstart) >= 0) {
								zdt = firstCandidate;
								break;
							}
						}
					} else if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(weekStart, this.originalDtstart) >= 0) {
						zdt = weekStart;
						break;
					}
				}
				targetYear++;
			}
		}
		if (this.opts.byDay?.length && !this.opts.byWeekNo) {
			const dayMap = weekdayToIsoDay;
			if (this.opts.byDay.some((tok) => /^[+-]?\d/.test(tok)) && this.opts.byMonth && (this.opts.freq === "MINUTELY" || this.opts.freq === "SECONDLY")) {
				const months = this.opts.byMonth.filter((v) => typeof v === "number").sort((a, b) => a - b);
				let foundFirst = false;
				for (let year = zdt.year; year <= zdt.year + 10 && !foundFirst; year++) for (const month of months) {
					if (year === zdt.year && month < zdt.month) continue;
					const monthSample = zdt.with({
						year,
						month,
						day: 1
					});
					const monthlyOccs = this.generateMonthlyOccurrences(monthSample);
					for (const occ of monthlyOccs) if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(occ, zdt) >= 0) {
						if (!occ.toPlainDate().equals(zdt.toPlainDate())) zdt = this.applyTimeOverride(occ.with({
							hour: 0,
							minute: 0,
							second: 0
						}));
						else zdt = occ;
						foundFirst = true;
						break;
					}
					if (foundFirst) break;
				}
			} else {
				let deltas;
				const weekdayTokens = this.opts.byDay.map((tok) => extractWeekdayToken(tok)).filter((tok) => tok !== null);
				if ([
					"DAILY",
					"HOURLY",
					"MINUTELY",
					"SECONDLY"
				].includes(this.opts.freq) && weekdayTokens.length === this.opts.byDay.length) deltas = weekdayTokens.map((tok) => (dayMap[tok] - zdt.dayOfWeek + 7) % 7);
				else deltas = weekdayTokens.map((wdTok) => (dayMap[wdTok] - zdt.dayOfWeek + 7) % 7);
				if (deltas.length) zdt = zdt.add({ days: Math.min(...deltas) });
			}
		}
		const { byHour, byMinute, bySecond } = this.opts;
		if (this.opts.freq === "HOURLY" && !byHour && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(zdt.with({
			hour: 0,
			minute: 0,
			second: 0,
			microsecond: 0,
			nanosecond: 0
		}), this.originalDtstart) > 0) zdt = zdt.with({
			hour: 0,
			minute: 0,
			second: 0,
			microsecond: 0,
			nanosecond: 0
		});
		if (this.opts.freq === "MINUTELY" && !byMinute && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(zdt.with({
			hour: 0,
			minute: 0,
			second: 0,
			microsecond: 0,
			nanosecond: 0
		}), this.originalDtstart) > 0) zdt = zdt.with({
			hour: 0,
			minute: 0,
			second: 0,
			microsecond: 0,
			nanosecond: 0
		});
		if (this.opts.freq === "SECONDLY" && this.opts.byWeekNo?.length && !bySecond && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(zdt.with({
			hour: 0,
			minute: 0,
			second: 0,
			microsecond: 0,
			nanosecond: 0
		}), this.originalDtstart) > 0) zdt = zdt.with({
			hour: 0,
			minute: 0,
			second: 0,
			microsecond: 0,
			nanosecond: 0
		});
		if (byHour || byMinute || bySecond) {
			const candidates = this.expandByTime(zdt);
			for (const candidate of candidates) if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(candidate, this.originalDtstart) >= 0) return candidate;
			zdt = this.applyTimeOverride(this.rawAdvance(zdt));
		}
		return zdt;
	}
	matchesByDay(zdt) {
		const { byDay, freq } = this.opts;
		if (!byDay) return true;
		if (!this.hasOrdinalByDay) return this.simpleByDayIsoDays?.includes(zdt.dayOfWeek) ?? false;
		for (const token of this.parsedByDayTokens ?? []) {
			if (freq === "DAILY" && zdt.dayOfWeek === token.isoDay) return true;
			if (token.ord === 0) {
				if (zdt.dayOfWeek === token.isoDay) return true;
				continue;
			}
			const month = zdt.month;
			let dt = zdt.with({ day: 1 });
			const candidates = [];
			while (dt.month === month) {
				if (dt.dayOfWeek === token.isoDay) candidates.push(dt.day);
				dt = dt.add({ days: 1 });
			}
			if (candidates[token.ord > 0 ? token.ord - 1 : candidates.length + token.ord] === zdt.day) return true;
		}
		return false;
	}
	matchesByMonth(zdt) {
		const { byMonth } = this.opts;
		if (!byMonth) return true;
		const nums = byMonth.filter((v) => typeof v === "number");
		if (nums.length === 0) return true;
		return nums.includes(zdt.month);
	}
	matchesNumericConstraint(value, constraints, maxPositiveValue) {
		return constraints.some((c) => {
			return value === (c > 0 ? c : maxPositiveValue + c + 1);
		});
	}
	matchesByMonthDay(zdt) {
		const { byMonthDay } = this.opts;
		if (!byMonthDay) return true;
		const lastDay = zdt.with({ day: 1 }).add({ months: 1 }).subtract({ days: 1 }).day;
		return this.matchesNumericConstraint(zdt.day, byMonthDay, lastDay);
	}
	matchesByHour(zdt) {
		const { byHour } = this.opts;
		if (!byHour) return true;
		if (byHour.includes(zdt.hour)) return true;
		for (const h of byHour) if (zdt.with({ hour: h }).hour === zdt.hour) return true;
		return false;
	}
	matchesByMinute(zdt) {
		const { byMinute } = this.opts;
		if (!byMinute) return true;
		return byMinute.includes(zdt.minute);
	}
	matchesBySecond(zdt) {
		const { bySecond } = this.opts;
		if (!bySecond) return true;
		return bySecond.includes(zdt.second);
	}
	matchesAll(zdt) {
		return this.matchesByMonth(zdt) && this.matchesByWeekNo(zdt) && this.matchesByYearDay(zdt) && this.matchesByMonthDay(zdt) && this.matchesByDay(zdt) && this.matchesByHour(zdt) && this.matchesByMinute(zdt) && this.matchesBySecond(zdt);
	}
	matchesByYearDay(zdt) {
		const { byYearDay } = this.opts;
		if (!byYearDay) return true;
		const dayOfYear = zdt.dayOfYear;
		const last = zdt.with({
			month: 12,
			day: 31
		}).dayOfYear;
		return this.matchesNumericConstraint(dayOfYear, byYearDay, last);
	}
	getIsoWeekInfo(zdt) {
		const thursday = zdt.add({ days: 4 - zdt.dayOfWeek });
		const year = thursday.year;
		const jan1 = zdt.with({
			year,
			month: 1,
			day: 1
		});
		const firstThursday = jan1.add({ days: (4 - jan1.dayOfWeek + 7) % 7 });
		const diffDays = thursday.toPlainDate().since(firstThursday.toPlainDate()).days;
		return {
			week: Math.floor(diffDays / 7) + 1,
			year
		};
	}
	matchesByWeekNo(zdt) {
		const { byWeekNo } = this.opts;
		if (!byWeekNo) return true;
		const { week, year } = this.getIsoWeekInfo(zdt);
		const jan1 = zdt.with({
			year,
			month: 1,
			day: 1
		});
		const isLeapYear = jan1.inLeapYear;
		const lastWeek = jan1.dayOfWeek === 4 || isLeapYear && jan1.dayOfWeek === 3 ? 53 : 52;
		return byWeekNo.some((wn) => {
			if (wn > 0) return week === wn;
			else return week === lastWeek + wn + 1;
		});
	}
	options() {
		return this.opts;
	}
	cloneOptions() {
		const { byHour, byMinute, bySecond, byDay, byMonth, byMonthDay, byYearDay, byWeekNo, bySetPos, rDate, exDate, ...rest } = this.opts;
		return {
			...rest,
			byHour: byHour ? [...byHour] : void 0,
			byMinute: byMinute ? [...byMinute] : void 0,
			bySecond: bySecond ? [...bySecond] : void 0,
			byDay: byDay ? [...byDay] : void 0,
			byMonth: byMonth ? [...byMonth] : void 0,
			byMonthDay: byMonthDay ? [...byMonthDay] : void 0,
			byYearDay: byYearDay ? [...byYearDay] : void 0,
			byWeekNo: byWeekNo ? [...byWeekNo] : void 0,
			bySetPos: bySetPos ? [...bySetPos] : void 0,
			rDate: rDate ? [...rDate] : void 0,
			exDate: exDate ? [...exDate] : void 0
		};
	}
	cloneUpdateOptions(updates) {
		const cloned = {};
		if (Object.prototype.hasOwnProperty.call(updates, "byHour")) cloned.byHour = Array.isArray(updates.byHour) ? [...updates.byHour] : updates.byHour;
		if (Object.prototype.hasOwnProperty.call(updates, "byMinute")) cloned.byMinute = Array.isArray(updates.byMinute) ? [...updates.byMinute] : updates.byMinute;
		if (Object.prototype.hasOwnProperty.call(updates, "bySecond")) cloned.bySecond = Array.isArray(updates.bySecond) ? [...updates.bySecond] : updates.bySecond;
		if (Object.prototype.hasOwnProperty.call(updates, "byDay")) cloned.byDay = Array.isArray(updates.byDay) ? [...updates.byDay] : updates.byDay;
		if (Object.prototype.hasOwnProperty.call(updates, "byMonth")) cloned.byMonth = Array.isArray(updates.byMonth) ? [...updates.byMonth] : updates.byMonth;
		if (Object.prototype.hasOwnProperty.call(updates, "byMonthDay")) cloned.byMonthDay = Array.isArray(updates.byMonthDay) ? [...updates.byMonthDay] : updates.byMonthDay;
		if (Object.prototype.hasOwnProperty.call(updates, "byYearDay")) cloned.byYearDay = Array.isArray(updates.byYearDay) ? [...updates.byYearDay] : updates.byYearDay;
		if (Object.prototype.hasOwnProperty.call(updates, "byWeekNo")) cloned.byWeekNo = Array.isArray(updates.byWeekNo) ? [...updates.byWeekNo] : updates.byWeekNo;
		if (Object.prototype.hasOwnProperty.call(updates, "bySetPos")) cloned.bySetPos = Array.isArray(updates.bySetPos) ? [...updates.bySetPos] : updates.bySetPos;
		if (Object.prototype.hasOwnProperty.call(updates, "rDate")) cloned.rDate = Array.isArray(updates.rDate) ? [...updates.rDate] : updates.rDate;
		if (Object.prototype.hasOwnProperty.call(updates, "exDate")) cloned.exDate = Array.isArray(updates.exDate) ? [...updates.exDate] : updates.exDate;
		return cloned;
	}
	/**
	* Create a new {@link RRuleTemporal} instance with modified options while keeping the current one unchanged.
	*
	* @example
	* ```ts
	* const updated = rule.with({byMonthDay: [3]});
	* ```
	*/
	with(updates) {
		return new RRuleTemporal({
			...this.cloneOptions(),
			...updates,
			...this.cloneUpdateOptions(updates),
			tzid: updates.tzid ?? this.opts.tzid,
			dtstart: updates.dtstart ?? this.opts.dtstart
		});
	}
	addDtstartIfNeeded(dates, iterator) {
		if (this.includeDtstart && !this.matchesAll(this.originalDtstart)) {
			if (iterator && this.isExcluded(this.originalDtstart)) return true;
			if (iterator && !iterator(this.originalDtstart, dates.length)) return false;
			dates.push(this.originalDtstart);
			if (this.shouldBreakForCountLimit(dates.length)) return false;
		}
		return true;
	}
	canUseUtcLinearFastPath(iterator) {
		if (iterator || this.tzid !== "UTC" || this.opts.rscale || this.opts.rDate || this.opts.exDate) return false;
		if (this.opts.byMonth || this.opts.byMonthDay || this.opts.byYearDay || this.opts.byWeekNo || this.opts.bySetPos) return false;
		switch (this.opts.freq) {
			case "DAILY": return !this.opts.byHour && !this.opts.byMinute && !this.opts.bySecond && !this.hasOrdinalByDay;
			case "HOURLY":
			case "MINUTELY": return !this.opts.byDay && !this.opts.byHour && !this.opts.byMinute && !this.opts.bySecond;
			default: return false;
		}
	}
	canUseUtcWeeklyFastPath(iterator) {
		return !iterator && this.tzid === "UTC" && this.opts.freq === "WEEKLY" && !this.opts.rscale && !this.opts.rDate && !this.opts.exDate && !this.opts.byMonth && !this.opts.byMonthDay && !this.opts.byYearDay && !this.opts.byWeekNo && !this.opts.bySetPos && !this.opts.byHour && !this.opts.byMinute && !this.opts.bySecond && !this.hasOrdinalByDay;
	}
	canUseUtcMonthlyFastPath(iterator) {
		return !iterator && this.tzid === "UTC" && this.opts.freq === "MONTHLY" && !this.opts.rscale && !this.opts.rDate && !this.opts.exDate && !this.opts.byYearDay && !this.opts.byWeekNo && this.canUseEpochMillisecondsPrecisionFlag && !!(this.opts.byDay || this.opts.byMonthDay);
	}
	utcZdtFromEpochNanoseconds(epochNanoseconds) {
		return _js_temporal_polyfill.Temporal.Instant.fromEpochNanoseconds(epochNanoseconds).toZonedDateTimeISO("UTC");
	}
	utcZdtFromEpochMilliseconds(epochMilliseconds) {
		return _js_temporal_polyfill.Temporal.Instant.fromEpochMilliseconds(epochMilliseconds).toZonedDateTimeISO("UTC");
	}
	canUseUtcEpochMillisecondsPrecision() {
		return this.canUseEpochMillisecondsPrecisionFlag;
	}
	buildTimeSlotOffsetsMs() {
		if (!this.canUseEpochMillisecondsPrecisionFlag) return void 0;
		const hours = this.opts.byHour ?? [this.originalDtstart.hour];
		const minutes = this.opts.byMinute ?? [this.originalDtstart.minute];
		const seconds = this.opts.bySecond ?? [this.originalDtstart.second];
		const baseMilliseconds = this.originalDtstart.millisecond;
		const offsets = [];
		for (const hour of hours) for (const minute of minutes) for (const second of seconds) offsets.push(((hour * 60 + minute) * 60 + second) * MS_PER_SECOND + baseMilliseconds);
		return offsets;
	}
	findFirstMatchingDailyStep(startDayOfWeek, stepDays, allowedDays) {
		let dayOfWeek = startDayOfWeek;
		for (let steps = 0; steps < 7; steps++) {
			if (allowedDays.includes(dayOfWeek)) return steps;
			dayOfWeek = addIsoDays(dayOfWeek, stepDays);
		}
		return null;
	}
	allUtcFastPath(iterator) {
		if (this.canUseUtcLinearFastPath(iterator)) switch (this.opts.freq) {
			case "DAILY": return this._allUtcDailySimple();
			case "HOURLY": return this._allUtcFixedStepSimple(NS_PER_HOUR * BigInt(this.opts.interval));
			case "MINUTELY": return this._allUtcFixedStepSimple(NS_PER_MINUTE * BigInt(this.opts.interval));
		}
		if (this.canUseUtcMonthlyFastPath(iterator)) return this._allUtcMonthlyByDayOrMonthDay();
		if (this.canUseUtcWeeklyFastPath(iterator)) return this._allUtcWeeklySimple();
		return null;
	}
	_allUtcFixedStepSimple(stepNanoseconds) {
		const dates = [];
		if (!this.addDtstartIfNeeded(dates)) return dates;
		let iterationCount = 0;
		if (this.canUseUtcEpochMillisecondsPrecision()) {
			let currentMilliseconds = this.originalDtstart.epochMilliseconds;
			const stepMilliseconds = Number(stepNanoseconds / NS_PER_MILLISECOND);
			const untilMilliseconds = this.opts.until?.epochMilliseconds;
			while (true) {
				if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
				if (untilMilliseconds !== void 0 && currentMilliseconds > untilMilliseconds) break;
				dates.push(this.utcZdtFromEpochMilliseconds(currentMilliseconds));
				if (this.shouldBreakForCountLimit(dates.length)) break;
				currentMilliseconds += stepMilliseconds;
			}
			return dates;
		}
		let currentNanoseconds = this.originalDtstart.epochNanoseconds;
		const untilNanoseconds = this.opts.until?.epochNanoseconds;
		while (true) {
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			if (untilNanoseconds !== void 0 && currentNanoseconds > untilNanoseconds) break;
			dates.push(this.utcZdtFromEpochNanoseconds(currentNanoseconds));
			if (this.shouldBreakForCountLimit(dates.length)) break;
			currentNanoseconds += stepNanoseconds;
		}
		return dates;
	}
	_allUtcDailySimple() {
		const dates = [];
		if (!this.addDtstartIfNeeded(dates)) return dates;
		const stepDays = this.opts.interval;
		const allowedDays = this.simpleByDayIsoDays;
		let iterationCount = 0;
		if (this.canUseUtcEpochMillisecondsPrecision()) {
			const stepMilliseconds = stepDays * MS_PER_DAY;
			const untilMilliseconds = this.opts.until?.epochMilliseconds;
			let currentMilliseconds = this.originalDtstart.epochMilliseconds;
			let currentDayOfWeek = this.originalDtstart.dayOfWeek;
			if (allowedDays?.length) {
				const firstMatchingStep = this.findFirstMatchingDailyStep(currentDayOfWeek, stepDays, allowedDays);
				if (firstMatchingStep === null) return dates;
				currentMilliseconds += firstMatchingStep * stepMilliseconds;
				currentDayOfWeek = addIsoDays(currentDayOfWeek, firstMatchingStep * stepDays);
			}
			while (true) {
				if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
				if (untilMilliseconds !== void 0 && currentMilliseconds > untilMilliseconds) break;
				if (!allowedDays || allowedDays.includes(currentDayOfWeek)) {
					dates.push(this.utcZdtFromEpochMilliseconds(currentMilliseconds));
					if (this.shouldBreakForCountLimit(dates.length)) break;
				}
				currentMilliseconds += stepMilliseconds;
				currentDayOfWeek = addIsoDays(currentDayOfWeek, stepDays);
			}
			return dates;
		}
		const stepNanoseconds = BigInt(stepDays) * NS_PER_DAY;
		const untilNanoseconds = this.opts.until?.epochNanoseconds;
		let currentNanoseconds = this.originalDtstart.epochNanoseconds;
		let currentDayOfWeek = this.originalDtstart.dayOfWeek;
		if (allowedDays?.length) {
			const firstMatchingStep = this.findFirstMatchingDailyStep(currentDayOfWeek, stepDays, allowedDays);
			if (firstMatchingStep === null) return dates;
			currentNanoseconds += BigInt(firstMatchingStep) * stepNanoseconds;
			currentDayOfWeek = addIsoDays(currentDayOfWeek, firstMatchingStep * stepDays);
		}
		while (true) {
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			if (untilNanoseconds !== void 0 && currentNanoseconds > untilNanoseconds) break;
			if (!allowedDays || allowedDays.includes(currentDayOfWeek)) {
				dates.push(this.utcZdtFromEpochNanoseconds(currentNanoseconds));
				if (this.shouldBreakForCountLimit(dates.length)) break;
			}
			currentNanoseconds += stepNanoseconds;
			currentDayOfWeek = addIsoDays(currentDayOfWeek, stepDays);
		}
		return dates;
	}
	_allUtcWeeklySimple() {
		const dates = [];
		if (!this.addDtstartIfNeeded(dates)) return dates;
		const start = this.originalDtstart;
		const wkstDay = weekdayToIsoDay[extractWeekdayToken(this.opts.wkst || "MO") ?? "MO"] ?? 1;
		const dayOffsets = (this.opts.byDay ? [...this.allByDayIsoDays ?? []] : [start.dayOfWeek]).map((day) => (day - wkstDay + 7) % 7).sort((a, b) => a - b);
		const weekStartOffset = (start.dayOfWeek - wkstDay + 7) % 7;
		let iterationCount = 0;
		if (this.canUseUtcEpochMillisecondsPrecision()) {
			const startMilliseconds = start.epochMilliseconds;
			const untilMilliseconds = this.opts.until?.epochMilliseconds;
			const weekStepMilliseconds = this.opts.interval * MS_PER_WEEK;
			let weekStartMilliseconds = startMilliseconds - weekStartOffset * MS_PER_DAY;
			while (true) {
				if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
				for (const dayOffset of dayOffsets) {
					const occurrenceMilliseconds = weekStartMilliseconds + dayOffset * MS_PER_DAY;
					if (occurrenceMilliseconds < startMilliseconds) continue;
					if (untilMilliseconds !== void 0 && occurrenceMilliseconds > untilMilliseconds) return dates;
					dates.push(this.utcZdtFromEpochMilliseconds(occurrenceMilliseconds));
					if (this.shouldBreakForCountLimit(dates.length)) return dates;
				}
				weekStartMilliseconds += weekStepMilliseconds;
			}
		}
		const startNanoseconds = start.epochNanoseconds;
		const untilNanoseconds = this.opts.until?.epochNanoseconds;
		const weekStepNanoseconds = BigInt(this.opts.interval) * NS_PER_WEEK;
		let weekStartNanoseconds = startNanoseconds - BigInt(weekStartOffset) * NS_PER_DAY;
		while (true) {
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			for (const dayOffset of dayOffsets) {
				const occurrenceNanoseconds = weekStartNanoseconds + BigInt(dayOffset) * NS_PER_DAY;
				if (occurrenceNanoseconds < startNanoseconds) continue;
				if (untilNanoseconds !== void 0 && occurrenceNanoseconds > untilNanoseconds) return dates;
				dates.push(this.utcZdtFromEpochNanoseconds(occurrenceNanoseconds));
				if (this.shouldBreakForCountLimit(dates.length)) return dates;
			}
			weekStartNanoseconds += weekStepNanoseconds;
		}
	}
	hasSingleExpandedTimeSlot() {
		if (this.timeSlotOffsetsMs) return this.timeSlotOffsetsMs.length === 1;
		const hours = this.opts.byHour ?? [this.originalDtstart.hour];
		const minutes = this.opts.byMinute ?? [this.originalDtstart.minute];
		const seconds = this.opts.bySecond ?? [this.originalDtstart.second];
		return hours.length === 1 && minutes.length === 1 && seconds.length === 1;
	}
	buildMonthlyOccurrenceOnDay(monthStart, day) {
		const base = monthStart.day === day ? monthStart : monthStart.with({ day });
		return this.applyTimeOverride(base);
	}
	applyBySetPosToSortedList(list) {
		const { bySetPos } = this.opts;
		if (!bySetPos || !bySetPos.length || list.length === 0) return list;
		const out = [];
		const len = list.length;
		for (const pos of bySetPos) {
			const idx = pos > 0 ? pos - 1 : len + pos;
			if (idx >= 0 && idx < len) out.push(list[idx]);
		}
		return out;
	}
	generateMonthlyOccurrenceDays(sample) {
		const { byDay, byMonth, byMonthDay } = this.opts;
		const monthStart = sample.day === 1 ? sample : sample.with({ day: 1 });
		if (byMonth && !byMonth.includes(sample.month)) return [];
		const lastDay = monthStart.add({ months: 1 }).subtract({ days: 1 }).day;
		let byMonthDayHits = [];
		if (byMonthDay && byMonthDay.length > 0) {
			byMonthDayHits = byMonthDay.map((d) => d > 0 ? d : lastDay + d + 1).filter((d) => d >= 1 && d <= lastDay);
			byMonthDayHits = [...new Set(byMonthDayHits)].sort((a, b) => a - b);
		}
		if (!byDay && byMonthDay && byMonthDay.length > 0) return byMonthDayHits;
		if (!byDay) return [sample.day];
		const tokens = this.parsedByDayTokens;
		if (!tokens?.length) return [];
		const firstDayOfWeek = monthStart.dayOfWeek;
		const lastDayOfWeek = (firstDayOfWeek - 1 + lastDay - 1) % 7 + 1;
		const byDayHits = /* @__PURE__ */ new Set();
		for (const { ord, isoDay } of tokens) if (ord === 0) {
			let day = 1 + (isoDay - firstDayOfWeek + 7) % 7;
			while (day <= lastDay) {
				byDayHits.add(day);
				day += 7;
			}
		} else {
			let day;
			if (ord > 0) day = 1 + (isoDay - firstDayOfWeek + 7) % 7 + 7 * (ord - 1);
			else day = lastDay - (lastDayOfWeek - isoDay + 7) % 7 + 7 * (ord + 1);
			if (day >= 1 && day <= lastDay) byDayHits.add(day);
		}
		let finalDays = [...byDayHits].sort((a, b) => a - b);
		if (byMonthDay && byMonthDay.length > 0) {
			if (byMonthDayHits.length === 0) return [];
			const byMonthDayHitSet = new Set(byMonthDayHits);
			finalDays = finalDays.filter((d) => byMonthDayHitSet.has(d));
		}
		return finalDays;
	}
	generateMonthlyOccurrencesOptimizedBySetPos(sample) {
		if (!this.opts.bySetPos || !this.hasSingleExpandedTimeSlot()) return null;
		const monthStart = sample.day === 1 ? sample : sample.with({ day: 1 });
		const days = this.generateMonthlyOccurrenceDays(monthStart);
		if (days.length === 0) return [];
		const selectedDays = this.applyBySetPosToSortedList(days);
		if (selectedDays.length === 0) return [];
		return selectedDays.sort((a, b) => a - b).map((day) => this.buildMonthlyOccurrenceOnDay(monthStart, day));
	}
	isGregorianLeapYear(year) {
		return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	}
	daysInGregorianMonth(year, month) {
		if (month === 2 && this.isGregorianLeapYear(year)) return 29;
		return GREGORIAN_MONTH_LENGTHS[month - 1];
	}
	gregorianIsoDayOfWeek(year, month, day) {
		let adjustedYear = year;
		if (month < 3) adjustedYear -= 1;
		const sundayZero = (adjustedYear + Math.floor(adjustedYear / 4) - Math.floor(adjustedYear / 100) + Math.floor(adjustedYear / 400) + GREGORIAN_WEEKDAY_OFFSETS[month - 1] + day) % 7;
		return sundayZero === 0 ? 7 : sundayZero;
	}
	monthIndexToYearMonth(monthIndex) {
		const year = Math.floor(monthIndex / 12);
		return {
			year,
			month: monthIndex - year * 12 + 1
		};
	}
	generateMonthlyOccurrenceDaysUtc(year, month) {
		if (this.numericByMonths && this.numericByMonths.length > 0 && !this.numericByMonths.includes(month)) return [];
		const byMonthDay = this.opts.byMonthDay;
		const byDay = this.opts.byDay;
		const lastDay = this.daysInGregorianMonth(year, month);
		let byMonthDayHits = [];
		if (byMonthDay && byMonthDay.length > 0) {
			byMonthDayHits = byMonthDay.map((day) => day > 0 ? day : lastDay + day + 1).filter((day) => day >= 1 && day <= lastDay);
			byMonthDayHits = [...new Set(byMonthDayHits)].sort((a, b) => a - b);
		}
		if (!byDay && byMonthDay && byMonthDay.length > 0) return byMonthDayHits;
		if (!byDay) {
			const day = this.originalDtstart.day;
			return day >= 1 && day <= lastDay ? [day] : [];
		}
		const tokens = this.parsedByDayTokens;
		if (!tokens?.length) return [];
		const firstDayOfWeek = this.gregorianIsoDayOfWeek(year, month, 1);
		const lastDayOfWeek = addIsoDays(firstDayOfWeek, lastDay - 1);
		const byDayHits = /* @__PURE__ */ new Set();
		for (const { ord, isoDay } of tokens) if (ord === 0) {
			let day = 1 + (isoDay - firstDayOfWeek + 7) % 7;
			while (day <= lastDay) {
				byDayHits.add(day);
				day += 7;
			}
		} else {
			let day;
			if (ord > 0) day = 1 + (isoDay - firstDayOfWeek + 7) % 7 + 7 * (ord - 1);
			else day = lastDay - (lastDayOfWeek - isoDay + 7) % 7 + 7 * (ord + 1);
			if (day >= 1 && day <= lastDay) byDayHits.add(day);
		}
		let finalDays = [...byDayHits].sort((a, b) => a - b);
		if (byMonthDay && byMonthDay.length > 0) {
			if (byMonthDayHits.length === 0) return [];
			const byMonthDayHitSet = new Set(byMonthDayHits);
			finalDays = finalDays.filter((day) => byMonthDayHitSet.has(day));
		}
		return finalDays;
	}
	generateMonthlyOccurrenceEpochsUtc(year, month) {
		const days = this.generateMonthlyOccurrenceDaysUtc(year, month);
		if (days.length === 0) return [];
		const monthStartMs = Date.UTC(year, month - 1, 1, 0, 0, 0, 0);
		const timeSlotOffsets = this.timeSlotOffsetsMs ?? [0];
		if (this.opts.bySetPos && this.opts.bySetPos.length > 0) {
			if (timeSlotOffsets.length === 1) {
				const selectedDays = this.applyBySetPosToSortedList(days).sort((a, b) => a - b);
				const offset = timeSlotOffsets[0];
				return selectedDays.map((day) => monthStartMs + (day - 1) * MS_PER_DAY + offset);
			}
			const timestamps = [];
			for (const day of days) {
				const dayBase = monthStartMs + (day - 1) * MS_PER_DAY;
				for (const offset of timeSlotOffsets) timestamps.push(dayBase + offset);
			}
			return this.applyBySetPosToSortedList(timestamps).sort((a, b) => a - b);
		}
		const timestamps = [];
		for (const day of days) {
			const dayBase = monthStartMs + (day - 1) * MS_PER_DAY;
			for (const offset of timeSlotOffsets) timestamps.push(dayBase + offset);
		}
		return timestamps;
	}
	_allUtcMonthlyByDayOrMonthDay() {
		const dates = [];
		const startMilliseconds = this.originalDtstart.epochMilliseconds;
		const untilMilliseconds = this.opts.until?.epochMilliseconds;
		let iterationCount = 0;
		if (!this.addDtstartIfNeeded(dates)) return dates;
		let monthIndex = this.originalDtstart.year * 12 + (this.originalDtstart.month - 1);
		while (true) {
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			const { year, month } = this.monthIndexToYearMonth(monthIndex);
			const occurrenceEpochs = this.generateMonthlyOccurrenceEpochsUtc(year, month);
			for (const epochMilliseconds of occurrenceEpochs) {
				if (epochMilliseconds < startMilliseconds) continue;
				if (untilMilliseconds !== void 0 && epochMilliseconds > untilMilliseconds) return dates;
				dates.push(this.utcZdtFromEpochMilliseconds(epochMilliseconds));
				if (this.shouldBreakForCountLimit(dates.length)) return dates;
			}
			monthIndex += this.opts.interval;
		}
	}
	processOccurrences(occs, dates, start, iterator, extraFilters) {
		let shouldBreak = false;
		for (const occ of occs) {
			if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(occ, start) < 0) continue;
			if (this.opts.until && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(occ, this.opts.until) > 0) {
				shouldBreak = true;
				break;
			}
			if (extraFilters && !extraFilters(occ)) continue;
			if (iterator && this.isExcluded(occ)) continue;
			if (iterator && !iterator(occ, dates.length)) {
				shouldBreak = true;
				break;
			}
			dates.push(occ);
			if (this.shouldBreakForCountLimit(dates.length)) {
				shouldBreak = true;
				break;
			}
		}
		return { shouldBreak };
	}
	/**
	* Returns all occurrences of the rule.
	* @param iterator - An optional callback iterator function that can be used to filter or modify the occurrences.
	* @returns An array of Temporal.ZonedDateTime objects representing all occurrences of the rule.
	*/
	_allMonthlyByDayOrMonthDay(iterator) {
		const dates = [];
		let iterationCount = 0;
		const start = this.originalDtstart;
		if (!this.addDtstartIfNeeded(dates, iterator)) return this.applyCountLimitAndMergeRDates(dates, iterator);
		let monthCursor = start.with({ day: 1 });
		while (true) {
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			let occs = this.generateMonthlyOccurrencesOptimizedBySetPos(monthCursor);
			if (!occs) {
				occs = this.generateMonthlyOccurrences(monthCursor);
				occs = this.applyBySetPos(occs);
			}
			const { shouldBreak } = this.processOccurrences(occs, dates, start, iterator);
			if (shouldBreak) break;
			monthCursor = monthCursor.add({ months: this.opts.interval });
		}
		return this.applyCountLimitAndMergeRDates(dates, iterator);
	}
	_allWeekly(iterator) {
		const dates = [];
		let iterationCount = 0;
		const start = this.originalDtstart;
		if (!this.addDtstartIfNeeded(dates, iterator)) return this.applyCountLimitAndMergeRDates(dates, iterator);
		const dayMap = weekdayToIsoDay;
		const dows = this.opts.byDay ? [...this.allByDayIsoDays ?? []] : this.opts.byMonthDay && this.opts.byMonthDay.length > 0 ? [...Object.values(dayMap)] : [start.dayOfWeek];
		const firstOccurrence = dows.map((dw) => {
			const delta = (dw - start.dayOfWeek + 7) % 7;
			return start.add({ days: delta });
		}).reduce((a, b) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(a, b) <= 0 ? a : b);
		const wkstDay = dayMap[extractWeekdayToken(this.opts.wkst || "MO") ?? "MO"] ?? 1;
		const firstOccWeekOffset = (firstOccurrence.dayOfWeek - wkstDay + 7) % 7;
		let weekCursor = firstOccurrence.subtract({ days: firstOccWeekOffset });
		while (true) {
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			let occs = dows.flatMap((dw) => {
				const delta = (dw - wkstDay + 7) % 7;
				const sameDate = weekCursor.add({ days: delta });
				return this.expandByTime(sameDate);
			}).sort((a, b) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(a, b));
			occs = this.applyBySetPos(occs);
			const { shouldBreak } = this.processOccurrences(occs, dates, start, iterator, (occ) => this.matchesByMonth(occ) && this.matchesByMonthDay(occ));
			if (shouldBreak) break;
			weekCursor = weekCursor.add({ weeks: this.opts.interval });
		}
		return this.applyCountLimitAndMergeRDates(dates, iterator);
	}
	_allMonthlyByMonth(iterator) {
		const dates = [];
		let iterationCount = 0;
		const start = this.originalDtstart;
		if (!this.addDtstartIfNeeded(dates, iterator)) return this.applyCountLimitAndMergeRDates(dates, iterator);
		const months = this.opts.byMonth.filter((v) => typeof v === "number").sort((a, b) => a - b);
		let monthOffset = 0;
		let startMonthIndex = months.findIndex((m) => m >= start.month);
		if (startMonthIndex === -1) {
			startMonthIndex = 0;
			monthOffset = 1;
		}
		while (true) {
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			const monthIndex = startMonthIndex + monthOffset;
			const targetMonth = months[monthIndex % months.length];
			const yearsToAdd = Math.floor(monthIndex / months.length);
			const candidate = start.with({
				year: start.year + yearsToAdd,
				month: targetMonth
			});
			if (this.opts.until && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(candidate, this.opts.until) > 0) break;
			if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(candidate, start) >= 0) {
				if (iterator && this.isExcluded(candidate)) continue;
				if (iterator && !iterator(candidate, dates.length)) break;
				dates.push(candidate);
				if (this.shouldBreakForCountLimit(dates.length)) break;
			}
			monthOffset++;
		}
		return this.applyCountLimitAndMergeRDates(dates, iterator);
	}
	_allYearlyByMonth(iterator) {
		const dates = [];
		let iterationCount = 0;
		const start = this.originalDtstart;
		if (!this.addDtstartIfNeeded(dates, iterator)) return this.applyCountLimitAndMergeRDates(dates, iterator);
		const months = this.opts.byMonth.filter((v) => typeof v === "number").sort((a, b) => a - b);
		let yearOffset = 0;
		while (true) {
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			const year = start.year + yearOffset * this.opts.interval;
			for (const month of months) {
				let occ = start.with({
					year,
					month
				});
				occ = this.applyTimeOverride(occ);
				if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(occ, start) < 0) continue;
				if (this.opts.until && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(occ, this.opts.until) > 0) return this.applyCountLimitAndMergeRDates(dates, iterator);
				if (iterator && this.isExcluded(occ)) continue;
				if (iterator && !iterator(occ, dates.length)) return this.applyCountLimitAndMergeRDates(dates, iterator);
				dates.push(occ);
				if (this.shouldBreakForCountLimit(dates.length)) return this.applyCountLimitAndMergeRDates(dates, iterator);
			}
			yearOffset++;
		}
	}
	_allYearlyComplex(iterator) {
		const dates = [];
		let iterationCount = 0;
		const start = this.originalDtstart;
		if (!this.addDtstartIfNeeded(dates, iterator)) return this.applyCountLimitAndMergeRDates(dates, iterator);
		let yearCursor = start.with({
			month: 1,
			day: 1
		});
		while (true) {
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			const occs = this.generateYearlyOccurrences(yearCursor);
			const uniqueOccs = [];
			if (occs.length > 0) {
				uniqueOccs.push(occs[0]);
				for (let i = 1; i < occs.length; i++) if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(occs[i], occs[i - 1]) !== 0) uniqueOccs.push(occs[i]);
			}
			const { shouldBreak } = this.processOccurrences(uniqueOccs, dates, start, iterator);
			if (shouldBreak) break;
			const interval = this.opts.freq === "WEEKLY" ? 1 : this.opts.interval;
			yearCursor = yearCursor.add({ years: interval });
			if (this.opts.freq === "WEEKLY" && this.opts.until && yearCursor.year > this.opts.until.year) break;
		}
		return this.applyCountLimitAndMergeRDates(dates, iterator);
	}
	_allMinutelySecondlyComplex(iterator) {
		const dates = [];
		let iterationCount = 0;
		if (!this.addDtstartIfNeeded(dates, iterator)) return this.applyCountLimitAndMergeRDates(dates, iterator);
		let current = this.computeFirst();
		while (true) {
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			if (this.opts.until && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(current, this.opts.until) > 0) break;
			if (this.matchesAll(current)) {
				if (iterator && this.isExcluded(current)) {
					current = this.nextCandidateSameDate(current);
					continue;
				}
				if (iterator && !iterator(current, dates.length)) break;
				dates.push(current);
				if (this.shouldBreakForCountLimit(dates.length)) break;
				current = this.nextCandidateSameDate(current);
			} else current = this.findNextValidDate(current);
		}
		return this.applyCountLimitAndMergeRDates(dates, iterator);
	}
	_allMonthlyByWeekNo(iterator) {
		const dates = [];
		let iterationCount = 0;
		const start = this.originalDtstart;
		if (!this.addDtstartIfNeeded(dates, iterator)) return this.applyCountLimitAndMergeRDates(dates, iterator);
		let current = start;
		const weekNos = [...this.opts.byWeekNo].sort((a, b) => a - b);
		const interval = this.opts.interval;
		let monthsAdvanced = 0;
		let lastYearProcessed = -1;
		outer_loop: while (true) {
			if (this.shouldBreakForCountLimit(dates.length)) break;
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			const year = current.year;
			if (year !== lastYearProcessed && current.month >= start.month) {
				lastYearProcessed = year;
				for (const weekNo of weekNos) {
					const occs = this.generateOccurrencesForWeekInYear(year, weekNo);
					for (const occ of occs) if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(occ, start) >= 0) {
						if (iterator && this.isExcluded(occ)) continue;
						if (iterator && !iterator(occ, dates.length)) break outer_loop;
						dates.push(occ);
						if (this.shouldBreakForCountLimit(dates.length)) break outer_loop;
					}
				}
			}
			monthsAdvanced += interval;
			current = start.add({ months: monthsAdvanced });
			if (this.opts.until && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(current, this.opts.until) > 0) break;
		}
		return this.applyCountLimitAndMergeRDates(dates, iterator);
	}
	_allMonthlyByYearDay(iterator) {
		const dates = [];
		let iterationCount = 0;
		const start = this.originalDtstart;
		if (!this.addDtstartIfNeeded(dates, iterator)) return this.applyCountLimitAndMergeRDates(dates, iterator);
		let year = start.year;
		const yearDays = [...this.opts.byYearDay].sort((a, b) => a - b);
		const interval = this.opts.interval;
		const startMonthAbs = start.year * 12 + start.month;
		outer_loop: while (true) {
			if (this.shouldBreakForCountLimit(dates.length)) break;
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			const yearStart = start.with({
				year,
				month: 1,
				day: 1
			});
			const lastDayOfYear = yearStart.with({
				month: 12,
				day: 31
			}).dayOfYear;
			for (const yd of yearDays) {
				const dayNum = yd > 0 ? yd : lastDayOfYear + yd + 1;
				if (dayNum <= 0 || dayNum > lastDayOfYear) continue;
				const baseOcc = yearStart.add({ days: dayNum - 1 });
				for (const occ of this.expandByTime(baseOcc)) {
					if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(occ, start) < 0) continue;
					if (dates.some((d) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(d, occ) === 0)) continue;
					if ((occ.year * 12 + occ.month - startMonthAbs) % interval !== 0) continue;
					if (!this.matchesByMonth(occ)) continue;
					if (this.opts.until && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(occ, this.opts.until) > 0) break outer_loop;
					if (iterator && this.isExcluded(occ)) continue;
					if (iterator && !iterator(occ, dates.length)) break outer_loop;
					dates.push(occ);
					if (this.shouldBreakForCountLimit(dates.length)) break outer_loop;
				}
			}
			year++;
			if (this.opts.until && year > this.opts.until.year + 2) break;
			if (!this.opts.until && this.opts.count) {
				const yearsToScan = Math.ceil(this.opts.count / (this.opts.byYearDay.length || 1)) * interval + 5;
				if (year > start.year + yearsToScan) break;
			}
		}
		return this.applyCountLimitAndMergeRDates(dates, iterator);
	}
	_allDailyMinutelyHourlyWithBySetPos(iterator) {
		const dates = [];
		let iterationCount = 0;
		const start = this.originalDtstart;
		if (!this.addDtstartIfNeeded(dates, iterator)) return this.applyCountLimitAndMergeRDates(dates, iterator);
		let cursor;
		let duration;
		switch (this.opts.freq) {
			case "MINUTELY":
				cursor = start.with({
					second: 0,
					microsecond: 0,
					nanosecond: 0
				});
				duration = { minutes: this.opts.interval };
				break;
			case "HOURLY":
				cursor = start.with({
					minute: 0,
					second: 0,
					microsecond: 0,
					nanosecond: 0
				});
				duration = { hours: this.opts.interval };
				break;
			case "DAILY":
				cursor = start.with({
					hour: 0,
					minute: 0,
					second: 0,
					microsecond: 0,
					nanosecond: 0
				});
				duration = { days: this.opts.interval };
				break;
			default: return this.applyCountLimitAndMergeRDates(dates, iterator);
		}
		while (true) {
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			let periodOccs = this.expandByTime(cursor);
			periodOccs = periodOccs.filter((occ) => this.matchesAll(occ));
			periodOccs = this.applyBySetPos(periodOccs);
			const { shouldBreak } = this.processOccurrences(periodOccs, dates, start, iterator);
			if (shouldBreak) break;
			cursor = cursor.add(duration);
			if (this.opts.until && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(cursor, this.opts.until) > 0) break;
		}
		return this.applyCountLimitAndMergeRDates(dates, iterator);
	}
	_allFallback(iterator) {
		const dates = [];
		let iterationCount = 0;
		let current = this.computeFirst();
		if (this.includeDtstart && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(current, this.originalDtstart) > 0) if (iterator && this.isExcluded(this.originalDtstart)) {} else {
			if (iterator && !iterator(this.originalDtstart, dates.length)) return this.applyCountLimitAndMergeRDates(dates, iterator);
			dates.push(this.originalDtstart);
			if (this.shouldBreakForCountLimit(dates.length)) return this.applyCountLimitAndMergeRDates(dates, iterator);
		}
		while (true) {
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			if (this.opts.until && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(current, this.opts.until) > 0) break;
			if (this.matchesAll(current)) if (iterator && this.isExcluded(current)) {} else {
				if (iterator && !iterator(current, dates.length)) break;
				dates.push(current);
				if (this.shouldBreakForCountLimit(dates.length)) break;
			}
			current = this.nextCandidateSameDate(current);
		}
		return this.applyCountLimitAndMergeRDates(dates, iterator);
	}
	/**
	* Returns all occurrences of the rule.
	* @param iterator - An optional callback iterator function that can be used to filter or modify the occurrences.
	* @returns An array of Temporal.ZonedDateTime objects representing all occurrences of the rule.
	*/
	all(iterator) {
		if (this.opts.rscale && [
			"CHINESE",
			"HEBREW",
			"INDIAN"
		].includes(this.opts.rscale)) {
			if ([
				"YEARLY",
				"MONTHLY",
				"WEEKLY"
			].includes(this.opts.freq) || !!this.opts.byYearDay || !!this.opts.byWeekNo || this.opts.byMonthDay && this.opts.byMonthDay.length > 0) return this._allRscaleNonGregorian(iterator);
		}
		if (this.opts.byWeekNo && this.opts.byYearDay) {
			const yearStart = this.originalDtstart.with({
				month: 1,
				day: 1,
				hour: 0,
				minute: 0,
				second: 0,
				millisecond: 0
			});
			const yearDays = this.opts.byYearDay.map((yd) => {
				const lastDayOfYear = yearStart.with({
					month: 12,
					day: 31
				}).dayOfYear;
				return yd > 0 ? yd : lastDayOfYear + yd + 1;
			});
			let possibleDate = false;
			for (const yd of yearDays) {
				const date = yearStart.add({ days: yd - 1 });
				if (this.matchesByWeekNo(date)) {
					possibleDate = true;
					break;
				}
			}
			if (!possibleDate) return [];
		}
		if (!this.opts.count && !this.opts.until && !iterator) throw new Error("all() requires iterator when no COUNT/UNTIL");
		const utcFastPathDates = this.allUtcFastPath(iterator);
		if (utcFastPathDates) return utcFastPathDates;
		if (this.opts.freq === "MONTHLY" && (this.opts.byDay || this.opts.byMonthDay) && !this.opts.byWeekNo) return this._allMonthlyByDayOrMonthDay(iterator);
		if (this.opts.freq === "WEEKLY" && !(this.opts.byYearDay && this.opts.byYearDay.length > 0) && !(this.opts.byWeekNo && this.opts.byWeekNo.length > 0)) return this._allWeekly(iterator);
		if (this.opts.freq === "MONTHLY" && this.opts.byMonth && !this.opts.byDay && !this.opts.byMonthDay && !this.opts.byYearDay) return this._allMonthlyByMonth(iterator);
		if (this.opts.freq === "YEARLY" && this.opts.byMonth && !this.opts.byDay && !this.opts.byMonthDay && !this.opts.byYearDay && !this.opts.byWeekNo) return this._allYearlyByMonth(iterator);
		if (this.opts.freq === "YEARLY" && (this.opts.byDay || this.opts.byMonthDay || this.opts.byYearDay || this.opts.byWeekNo) || this.opts.freq === "WEEKLY" && this.opts.byYearDay && this.opts.byYearDay.length > 0 || this.opts.freq === "WEEKLY" && this.opts.byWeekNo && this.opts.byWeekNo.length > 0) return this._allYearlyComplex(iterator);
		if ((this.opts.freq === "MINUTELY" || this.opts.freq === "SECONDLY") && (this.opts.byMonth || this.opts.byWeekNo || this.opts.byYearDay || this.opts.byMonthDay || this.opts.byDay)) return this._allMinutelySecondlyComplex(iterator);
		if (this.opts.freq === "MONTHLY" && this.opts.byWeekNo && this.opts.byWeekNo.length > 0) return this._allMonthlyByWeekNo(iterator);
		if (this.opts.freq === "MONTHLY" && this.opts.byYearDay && this.opts.byYearDay.length > 0 && !this.opts.byDay && !this.opts.byMonthDay) return this._allMonthlyByYearDay(iterator);
		if (this.opts.rscale && this.opts.freq === "MONTHLY" && !this.opts.byDay && !this.opts.byMonthDay && !this.opts.byWeekNo && !this.opts.byYearDay) return this._allMonthlyRscaleSimple(iterator);
		if ((this.opts.freq === "MINUTELY" || this.opts.freq === "HOURLY" || this.opts.freq === "DAILY") && this.opts.bySetPos) return this._allDailyMinutelyHourlyWithBySetPos(iterator);
		return this._allFallback(iterator);
	}
	/**
	* RFC 7529: RSCALE present, simple monthly iteration with SKIP behavior.
	* Handles month-to-month stepping from DTSTART's year/month aiming for DTSTART's day-of-month.
	* Applies SKIP=OMIT (skip invalid months), BACKWARD (clamp to last day), FORWARD (first day of next month).
	*/
	_allMonthlyRscaleSimple(iterator) {
		const dates = [];
		let iterationCount = 0;
		const start = this.originalDtstart;
		const interval = this.opts.interval ?? 1;
		const targetDom = start.day;
		if (!this.addDtstartIfNeeded(dates, iterator)) return this.applyCountLimitAndMergeRDates(dates, iterator);
		let cursor = start.with({ day: 1 });
		while (true) {
			if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
			const lastDay = cursor.add({ months: 1 }).subtract({ days: 1 }).day;
			let occ = null;
			if (targetDom <= lastDay) occ = cursor.with({ day: targetDom });
			else {
				const skip = this.opts.skip || "OMIT";
				if (skip === "BACKWARD") occ = cursor.with({ day: lastDay });
				else if (skip === "FORWARD") occ = cursor.add({ months: 1 }).with({ day: 1 });
				else occ = null;
			}
			if (occ) {
				occ = occ.with({
					hour: start.hour,
					minute: start.minute,
					second: start.second
				});
				if (!(iterator && this.isExcluded(occ))) {
					if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(occ, start) >= 0) if (!iterator || iterator(occ, dates.length)) {
						dates.push(occ);
						if (this.shouldBreakForCountLimit(dates.length)) break;
					} else break;
				}
			}
			cursor = cursor.add({ months: interval });
			if (this.opts.until && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(cursor, this.opts.until) > 0) break;
		}
		return this.applyCountLimitAndMergeRDates(dates, iterator);
	}
	/**
	* Converts rDate entries to ZonedDateTime and merges with existing dates.
	* @param dates - Array of dates to merge with
	* @returns Merged and deduplicated array of dates
	*/
	mergeAndDeduplicateRDates(dates) {
		if (this.opts.rDate) dates.push(...this.opts.rDate);
		dates.sort((a, b) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(a, b));
		const dedup = [];
		for (const d of dates) if (dedup.length === 0 || _js_temporal_polyfill.Temporal.ZonedDateTime.compare(d, dedup[dedup.length - 1]) !== 0) dedup.push(d);
		return dedup;
	}
	/**
	* Checks if a date is in the exDate list.
	* @param date - Date to check
	* @returns True if the date is excluded
	*/
	isExcluded(date) {
		if (!this.opts.exDate || this.opts.exDate.length === 0) return false;
		return this.opts.exDate.some((exDate) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(date, exDate) === 0);
	}
	/**
	* Excludes exDate entries from the given array of dates.
	* @param dates - Array of dates to filter
	* @returns Filtered array with exDate entries removed
	*/
	excludeExDates(dates) {
		if (!this.opts.exDate || this.opts.exDate.length === 0) return dates;
		return dates.filter((date) => {
			return !this.isExcluded(date);
		});
	}
	/**
	* Applies count limit and merges rDates with the rule-generated dates.
	* @param dates - Array of dates generated by the rule
	* @param iterator - Optional iterator function
	* @returns Final array of dates after merging and applying count limit
	*/
	applyCountLimitAndMergeRDates(dates, iterator) {
		const merged = this.mergeAndDeduplicateRDates(dates);
		const excluded = this.excludeExDates(merged);
		const hasCountLimit = this.opts.count !== void 0;
		if (!hasCountLimit && !iterator) return excluded;
		let emitted = 0;
		const max = hasCountLimit ? this.opts.count : Infinity;
		const finalDates = [];
		for (const d of excluded) {
			if (emitted >= max) break;
			if (iterator && !iterator(d, emitted)) break;
			finalDates.push(d);
			emitted++;
		}
		return finalDates;
	}
	/**
	* Checks if the count limit should break the loop based on rDate presence.
	* @param matchCount - Current number of matches
	* @returns true if the loop should break
	*/
	shouldBreakForCountLimit(matchCount) {
		if (this.opts.count === void 0) return false;
		if (!this.opts.rDate) return matchCount >= this.opts.count;
		const rDateCount = this.opts.rDate.length;
		const targetRuleCount = Math.max(this.opts.count - rDateCount, 0);
		return matchCount >= targetRuleCount + Math.min(targetRuleCount, 10);
	}
	hasTimeOfDayBetween(startTime, endTime) {
		if (_js_temporal_polyfill.Temporal.PlainTime.compare(startTime, endTime) >= 0) return false;
		const base = this.originalDtstart;
		const hours = this.opts.byHour ?? [base.hour];
		const minutes = this.opts.byMinute ?? [base.minute];
		const seconds = this.opts.bySecond ?? [base.second];
		for (const hour of hours) for (const minute of minutes) for (const second of seconds) {
			const candidate = _js_temporal_polyfill.Temporal.PlainTime.from({
				hour,
				minute,
				second,
				millisecond: base.millisecond,
				microsecond: base.microsecond,
				nanosecond: base.nanosecond
			});
			if (_js_temporal_polyfill.Temporal.PlainTime.compare(candidate, startTime) >= 0 && _js_temporal_polyfill.Temporal.PlainTime.compare(candidate, endTime) < 0) return true;
		}
		return false;
	}
	/**
	* Returns all occurrences of the rule within a specified time window.
	* @param after - The start date or Temporal.ZonedDateTime object.
	* @param before - The end date or Temporal.ZonedDateTime object.
	* @param inc - Optional boolean flag to include the end date in the results.
	* @returns An array of Temporal.ZonedDateTime objects representing all occurrences of the rule within the specified time window.
	*/
	between(after, before, inc = false) {
		const startInst = after instanceof Date ? _js_temporal_polyfill.Temporal.Instant.from(after.toISOString()) : after.toInstant();
		const endInst = before instanceof Date ? _js_temporal_polyfill.Temporal.Instant.from(before.toISOString()) : before.toInstant();
		const startZdt = _js_temporal_polyfill.Temporal.Instant.from(startInst).toZonedDateTimeISO(this.tzid);
		const beforeZdt = _js_temporal_polyfill.Temporal.Instant.from(endInst).toZonedDateTimeISO(this.tzid);
		const tempOpts = { ...this.opts };
		if (!tempOpts.until || _js_temporal_polyfill.Temporal.ZonedDateTime.compare(beforeZdt, tempOpts.until) < 0) tempOpts.until = beforeZdt;
		if (tempOpts.count === void 0) {
			const interval = tempOpts.interval ?? 1;
			const aligned = startZdt.withPlainTime(this.originalDtstart.toPlainTime());
			let unit;
			switch (tempOpts.freq) {
				case "YEARLY":
					unit = "years";
					break;
				case "MONTHLY":
					unit = "months";
					break;
				case "WEEKLY":
					unit = "weeks";
					break;
				case "DAILY":
					unit = "days";
					break;
				case "HOURLY":
					unit = "hours";
					break;
				case "MINUTELY":
					unit = "minutes";
					break;
				default: unit = "seconds";
			}
			const dtstartNormalized = RRuleTemporal.normalizeToPolyfill(this.opts.dtstart);
			const startZdtNormalized = RRuleTemporal.normalizeToPolyfill(startZdt).withTimeZone(dtstartNormalized.timeZoneId);
			const alignedNormalized = RRuleTemporal.normalizeToPolyfill(aligned.withPlainTime(this.originalDtstart.toPlainTime())).withTimeZone(dtstartNormalized.timeZoneId);
			const diffAnchor = [
				"hours",
				"minutes",
				"seconds"
			].includes(unit) ? startZdtNormalized : alignedNormalized;
			const unitsBetween = dtstartNormalized.until(diffAnchor, { largestUnit: unit })[unit];
			let steps = Math.floor(unitsBetween / interval);
			const durationForJump = (jump) => {
				switch (unit) {
					case "years": return { years: jump };
					case "months": return { months: jump };
					case "weeks": return { weeks: jump };
					case "days": return { days: jump };
					case "hours": return { hours: jump };
					case "minutes": return { minutes: jump };
					default: return { seconds: jump };
				}
			};
			let candidate = RRuleTemporal.normalizeToPolyfill(this.opts.dtstart.add(durationForJump(steps * interval)));
			if (steps > 0 && [
				"years",
				"months",
				"weeks",
				"days"
			].includes(unit)) {
				if (candidate.toPlainDate().equals(startZdtNormalized.toPlainDate()) && _js_temporal_polyfill.Temporal.ZonedDateTime.compare(candidate, startZdtNormalized) > 0) {
					if (this.hasTimeOfDayBetween(startZdtNormalized.toPlainTime(), candidate.toPlainTime())) {
						steps -= 1;
						candidate = RRuleTemporal.normalizeToPolyfill(this.opts.dtstart.add(durationForJump(steps * interval)));
					}
				}
			}
			const dtstartForCompare = RRuleTemporal.normalizeToPolyfill(this.opts.dtstart);
			if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(candidate, dtstartForCompare) < 0) candidate = dtstartForCompare;
			tempOpts.dtstart = candidate;
		}
		return new RRuleTemporal(tempOpts).all().filter((date) => {
			const inst = date.toInstant();
			const afterStart = inc ? _js_temporal_polyfill.Temporal.Instant.compare(inst, startInst) >= 0 : _js_temporal_polyfill.Temporal.Instant.compare(inst, startInst) > 0;
			const beforeEnd = inc ? _js_temporal_polyfill.Temporal.Instant.compare(inst, endInst) <= 0 : _js_temporal_polyfill.Temporal.Instant.compare(inst, endInst) < 0;
			return afterStart && beforeEnd;
		});
	}
	/**
	* Convenience helper: true if the exact instant is an occurrence of the rule.
	* This checks full date-time equality (including time and time zone).
	*/
	matches(date) {
		return this.between(date, date, true).length > 0;
	}
	/**
	* Convenience helper: true if any occurrence falls on the given calendar day
	* in the rule's time zone. This ignores time-of-day granularity.
	*/
	occursOn(date) {
		const startOfDay = date.toZonedDateTime({
			timeZone: this.tzid,
			plainTime: _js_temporal_polyfill.Temporal.PlainTime.from("00:00")
		});
		const endOfDay = startOfDay.add({ days: 1 }).subtract({ nanoseconds: 1 });
		return this.between(startOfDay, endOfDay, true).length > 0;
	}
	/**
	* Returns the next occurrence of the rule after a specified date.
	* @param after - The start date or Temporal.ZonedDateTime object.
	* @param inc - Optional boolean flag to include occurrences on the start date.
	* @returns The next occurrence of the rule after the specified date or null if no occurrences are found.
	*/
	next(after = /* @__PURE__ */ new Date(), inc = false) {
		const afterInst = after instanceof Date ? _js_temporal_polyfill.Temporal.Instant.from(after.toISOString()) : after.toInstant();
		let result = null;
		this.all((occ) => {
			const inst = occ.toInstant();
			if (inc ? _js_temporal_polyfill.Temporal.Instant.compare(inst, afterInst) >= 0 : _js_temporal_polyfill.Temporal.Instant.compare(inst, afterInst) > 0) {
				if (!result || _js_temporal_polyfill.Temporal.ZonedDateTime.compare(occ, result) < 0) result = occ;
				return false;
			}
			return true;
		});
		return result;
	}
	/**
	* Returns the previous occurrence of the rule before a specified date.
	* @param before - The end date or Temporal.ZonedDateTime object.
	* @param inc - Optional boolean flag to include occurrences on the end date.
	* @returns The previous occurrence of the rule before the specified date or null if no occurrences are found.
	*/
	previous(before = /* @__PURE__ */ new Date(), inc = false) {
		const beforeInst = before instanceof Date ? _js_temporal_polyfill.Temporal.Instant.from(before.toISOString()) : before.toInstant();
		let prev = null;
		this.all((occ) => {
			const inst = occ.toInstant();
			if (inc ? _js_temporal_polyfill.Temporal.Instant.compare(inst, beforeInst) > 0 : _js_temporal_polyfill.Temporal.Instant.compare(inst, beforeInst) >= 0) return false;
			prev = occ;
			return true;
		});
		return prev;
	}
	toString() {
		const iso = this.originalDtstart.toString({ smallestUnit: "second" }).replace(/[-:]/g, "");
		const dtLine = `DTSTART;TZID=${this.tzid}:${iso.slice(0, 15)}`;
		const rule = [];
		const { freq, interval, count, until, byHour, byMinute, bySecond, byDay, byMonth, byMonthDay, bySetPos, byWeekNo, byYearDay, wkst, rDate, exDate } = this.opts;
		if (this.opts.rscale) rule.push(`RSCALE=${this.opts.rscale}`);
		if (this.opts.rscale && this.opts.skip) rule.push(`SKIP=${this.opts.skip}`);
		rule.push(`FREQ=${freq}`);
		if (interval !== 1) rule.push(`INTERVAL=${interval}`);
		if (count !== void 0) rule.push(`COUNT=${count}`);
		if (until) rule.push(`UNTIL=${this.formatIcsDateTime(until)}`);
		if (byHour) rule.push(`BYHOUR=${byHour.join(",")}`);
		if (byMinute) rule.push(`BYMINUTE=${byMinute.join(",")}`);
		if (bySecond) rule.push(`BYSECOND=${bySecond.join(",")}`);
		if (byDay) rule.push(`BYDAY=${byDay.join(",")}`);
		if (byMonth) rule.push(`BYMONTH=${byMonth.join(",")}`);
		if (byMonthDay) rule.push(`BYMONTHDAY=${byMonthDay.join(",")}`);
		if (bySetPos) rule.push(`BYSETPOS=${bySetPos.join(",")}`);
		if (byWeekNo) rule.push(`BYWEEKNO=${byWeekNo.join(",")}`);
		if (byYearDay) rule.push(`BYYEARDAY=${byYearDay.join(",")}`);
		if (wkst) rule.push(`WKST=${wkst}`);
		const lines = [dtLine, `RRULE:${rule.join(";")}`];
		if (rDate) lines.push(`RDATE:${this.joinDates(rDate)}`);
		if (exDate) lines.push(`EXDATE:${this.joinDates(exDate)}`);
		return lines.join("\n");
	}
	formatIcsDateTime(date) {
		return date.toInstant().toString().replace(/[-:]/g, "").slice(0, 15) + "Z";
	}
	joinDates(dates) {
		return dates.map((d) => this.formatIcsDateTime(d));
	}
	/**
	* Given any date in a month, return all the ZonedDateTimes in that month
	* matching your opts.byDay and opts.byMonth (or the single "same day" if no BYDAY).
	*/
	generateMonthlyOccurrences(sample) {
		const monthStart = sample.day === 1 ? sample : sample.with({ day: 1 });
		if (!this.opts.byDay && !this.opts.byMonthDay) return this.expandByTime(sample);
		const finalDays = this.generateMonthlyOccurrenceDays(monthStart);
		if (finalDays.length === 0) return [];
		return finalDays.map((d) => monthStart.with({ day: d })).flatMap((z) => this.expandByTime(z));
	}
	/**
	* Given any date in a year, return all ZonedDateTimes in that year matching
	* the BYDAY/BYMONTHDAY/BYMONTH constraints. Months default to DTSTART's month
	* if BYMONTH is not specified.
	*/
	generateYearlyOccurrences(sample) {
		const months = this.opts.byMonth ? this.opts.byMonth.filter((v) => typeof v === "number").sort((a, b) => a - b) : this.opts.byMonthDay || this.opts.byDay ? [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			12
		] : [this.originalDtstart.month];
		let occs = [];
		if (this.opts.byDay && this.opts.byDay.some((t) => /^[+-]?\d/.test(t)) && !this.opts.byMonth) {
			const dayMap = weekdayToIsoDay;
			for (const tok of this.opts.byDay) {
				const parsed = parseByDayToken(tok);
				if (!parsed || parsed.ord === 0) continue;
				const ord = parsed.ord;
				const wd = dayMap[parsed.weekday];
				let dt;
				if (ord > 0) {
					const jan1 = sample.with({
						month: 1,
						day: 1
					});
					const delta = (wd - jan1.dayOfWeek + 7) % 7;
					dt = jan1.add({ days: delta + 7 * (ord - 1) });
				} else {
					const dec31 = sample.with({
						month: 12,
						day: 31
					});
					const delta = (dec31.dayOfWeek - wd + 7) % 7;
					dt = dec31.subtract({ days: delta + 7 * (-ord - 1) });
				}
				occs.push(...this.expandByTime(dt));
			}
		} else if (!this.opts.byYearDay && !this.opts.byWeekNo) {
			occs = [];
			for (const m of months) {
				const monthSample = sample.with({
					month: m,
					day: 1
				});
				const monthOccs = this.generateMonthlyOccurrences(monthSample);
				if (monthOccs.length === 0 && this.opts.rscale && this.opts.byMonthDay && this.opts.byMonthDay.length > 0) {
					const lastDay = monthSample.add({ months: 1 }).subtract({ days: 1 }).day;
					const target = this.opts.byMonthDay[0];
					const absTarget = target > 0 ? target : lastDay + target + 1;
					if (absTarget > lastDay || absTarget <= 0) {
						const skip = this.opts.skip || "OMIT";
						if (skip === "BACKWARD") occs.push(...this.expandByTime(monthSample.with({ day: lastDay })));
						else if (skip === "FORWARD") {
							const nextMonth = monthSample.add({ months: 1 }).with({ day: 1 });
							occs.push(...this.expandByTime(nextMonth));
						}
					}
				} else occs.push(...monthOccs);
			}
		}
		if (this.opts.byYearDay) {
			const last = sample.with({
				month: 12,
				day: 31
			}).dayOfYear;
			for (const d of this.opts.byYearDay) {
				const dayNum = d > 0 ? d : last + d + 1;
				if (dayNum <= 0 || dayNum > last) continue;
				const dt = this.opts.freq === "MINUTELY" ? sample.with({
					month: 1,
					day: 1,
					hour: 0,
					minute: 0,
					second: 0,
					millisecond: 0
				}).add({ days: dayNum - 1 }) : sample.with({
					month: 1,
					day: 1
				}).add({ days: dayNum - 1 });
				if (!this.opts.byMonth || this.opts.byMonth.includes(dt.month)) occs.push(...this.expandByTime(dt));
			}
		}
		if (this.opts.byWeekNo) {
			const { lastWeek, firstWeekStart, tokens } = this.isoWeekByDay(sample);
			for (const weekNo of this.opts.byWeekNo) {
				if (weekNo > 0 && weekNo > lastWeek || weekNo < 0 && -weekNo > lastWeek) continue;
				const weekIndex = weekNo > 0 ? weekNo - 1 : lastWeek + weekNo;
				const weekStart = firstWeekStart.add({ weeks: weekIndex });
				occs.push(...this.addByDay(tokens, weekStart));
			}
		}
		occs = occs.sort((a, b) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(a, b));
		occs = this.applyBySetPos(occs);
		return occs;
	}
	addByDay(tokens, weekStart) {
		const dayMap = weekdayToIsoDay;
		const wkst = dayMap[this.opts.wkst || "MO"];
		const entries = [];
		for (const tok of tokens) {
			if (!tok) continue;
			const targetDow = dayMap[tok];
			const inst = weekStart.add({ days: (targetDow - wkst + 7) % 7 });
			if (!this.opts.byMonth || this.opts.byMonth.includes(inst.month)) entries.push(...this.expandByTime(inst));
		}
		return entries;
	}
	/**
	* Helper to find the next valid value from a sorted array
	*/
	findNextValidValue(currentValue, validValues, compare) {
		return validValues.find((v) => compare(v, currentValue) > 0) || null;
	}
	/**
	* Efficiently find the next valid date for MINUTELY and SECONDLY frequency by jumping over
	* large gaps when BYXXX constraints don't match.
	*/
	findNextValidDate(current) {
		if (this.opts.byWeekNo && this.opts.byYearDay) {
			const yearStart = current.with({
				month: 1,
				day: 1,
				hour: 0,
				minute: 0,
				second: 0,
				millisecond: 0
			});
			const yearDays = this.opts.byYearDay.map((yd) => {
				const lastDayOfYear = yearStart.with({
					month: 12,
					day: 31
				}).dayOfYear;
				return yd > 0 ? yd : lastDayOfYear + yd + 1;
			});
			for (const yd of yearDays) {
				const date = yearStart.add({ days: yd - 1 });
				if (this.matchesByWeekNo(date)) break;
			}
		}
		if (this.opts.byMonth) {
			const numericMonths = this.opts.byMonth.filter((v) => typeof v === "number");
			if (numericMonths.length && !numericMonths.includes(current.month)) {
				const months = [...numericMonths].sort((a, b) => a - b);
				const nextMonth = this.findNextValidValue(current.month, months, (a, b) => a - b);
				if (nextMonth) current = current.with({
					month: nextMonth,
					day: 1,
					hour: 0,
					minute: 0,
					second: 0
				});
				else current = current.add({ years: 1 }).with({
					month: months[0],
					day: 1,
					hour: 0,
					minute: 0,
					second: 0
				});
				current = this.applyTimeOverride(current);
				return current;
			}
		}
		if (this.opts.byWeekNo && !this.matchesByWeekNo(current)) {
			current = current.add({ weeks: 1 }).with({
				hour: 0,
				minute: 0,
				second: 0
			});
			current = this.applyTimeOverride(current);
			return current;
		}
		if (this.opts.byYearDay && !this.matchesByYearDay(current)) {
			const yearDays = [...this.opts.byYearDay].sort((a, b) => a - b);
			const currentYearDay = current.dayOfYear;
			const lastDayOfYear = current.with({
				month: 12,
				day: 31
			}).dayOfYear;
			let nextYearDay = yearDays.find((d) => {
				return (d > 0 ? d : lastDayOfYear + d + 1) > currentYearDay;
			});
			if (nextYearDay) {
				const dayNum = nextYearDay > 0 ? nextYearDay : lastDayOfYear + nextYearDay + 1;
				if (this.opts.freq === "MINUTELY" || this.opts.freq === "SECONDLY") current = current.with({
					month: 1,
					day: 1,
					hour: 0,
					minute: 0,
					second: 0,
					millisecond: 0
				}).add({ days: dayNum - 1 });
				else current = current.with({
					month: 1,
					day: 1
				}).add({ days: dayNum - 1 });
			} else {
				const nextYear = current.add({ years: 1 });
				const nextYearLastDay = nextYear.with({
					month: 12,
					day: 31
				}).dayOfYear;
				const firstYearDay = yearDays[0];
				if (firstYearDay !== void 0) {
					const dayNum = firstYearDay > 0 ? firstYearDay : nextYearLastDay + firstYearDay + 1;
					if (this.opts.freq === "MINUTELY" || this.opts.freq === "SECONDLY") current = nextYear.with({
						month: 1,
						day: 1,
						hour: 0,
						minute: 0,
						second: 0,
						millisecond: 0
					}).add({ days: dayNum - 1 });
					else current = nextYear.with({
						month: 1,
						day: 1
					}).add({ days: dayNum - 1 });
				}
			}
			current = this.applyTimeOverride(current);
			return current;
		}
		if (this.opts.byMonthDay && !this.matchesByMonthDay(current)) {
			const monthDays = [...this.opts.byMonthDay].sort((a, b) => a - b);
			const lastDayOfMonth = current.with({ day: 1 }).add({ months: 1 }).subtract({ days: 1 }).day;
			const currentDay = current.day;
			const validDays = monthDays.map((d) => d > 0 ? d : lastDayOfMonth + d + 1).filter((d) => d > 0 && d <= lastDayOfMonth).sort((a, b) => a - b);
			const nextDay = this.findNextValidValue(currentDay, validDays, (a, b) => a - b);
			if (nextDay) current = current.with({
				day: nextDay,
				hour: 0,
				minute: 0,
				second: 0
			});
			else {
				const nextMonth = current.add({ months: 1 }).with({ day: 1 });
				const nextMonthLastDay = nextMonth.add({ months: 1 }).subtract({ days: 1 }).day;
				const firstMonthDay = monthDays[0];
				if (firstMonthDay !== void 0) {
					const dayNum = firstMonthDay > 0 ? firstMonthDay : nextMonthLastDay + firstMonthDay + 1;
					current = nextMonth.with({
						day: Math.max(1, Math.min(dayNum, nextMonthLastDay)),
						hour: 0,
						minute: 0,
						second: 0
					});
				} else current = current.add({ months: 1 }).with({
					day: 1,
					hour: 0,
					minute: 0,
					second: 0
				});
			}
			current = this.applyTimeOverride(current);
			return current;
		}
		if (this.opts.byDay && !this.matchesByDay(current)) {
			const targetDays = this.allByDayIsoDays;
			if (!targetDays?.length) return this.applyTimeOverride(current.add({ days: 1 }).with({
				hour: 0,
				minute: 0,
				second: 0
			}));
			const nextDayOfWeek = this.findNextValidValue(current.dayOfWeek, targetDays, (a, b) => a - b);
			if (nextDayOfWeek) {
				const delta = (nextDayOfWeek - current.dayOfWeek + 7) % 7;
				current = current.add({ days: delta }).with({
					hour: 0,
					minute: 0,
					second: 0
				});
			} else {
				const delta = (targetDays[0] - current.dayOfWeek + 7) % 7;
				current = current.add({ days: delta + 7 }).with({
					hour: 0,
					minute: 0,
					second: 0
				});
			}
			current = this.applyTimeOverride(current);
			return current;
		}
		switch (this.opts.freq) {
			case "SECONDLY":
			case "MINUTELY":
				current = current.add({ days: 1 }).with({
					hour: 0,
					minute: 0,
					second: 0
				});
				break;
			case "HOURLY":
				current = current.add({ days: 1 }).with({
					hour: 0,
					minute: 0,
					second: 0
				});
				break;
			case "DAILY":
			case "WEEKLY":
				current = current.add({ months: 1 }).with({
					day: 1,
					hour: 0,
					minute: 0,
					second: 0
				});
				break;
			case "MONTHLY":
			case "YEARLY":
				current = current.add({ years: 1 }).with({
					month: 1,
					day: 1,
					hour: 0,
					minute: 0,
					second: 0
				});
				break;
		}
		return this.applyTimeOverride(current);
	}
	applyBySetPos(list) {
		const { bySetPos } = this.opts;
		if (!bySetPos || !bySetPos.length) return list;
		const sorted = [...list].sort((a, b) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(a, b));
		return this.applyBySetPosToSortedList(sorted).sort((a, b) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(a, b));
	}
	isoWeekByDay(sample) {
		const dayMap = weekdayToIsoDay;
		const wkst = dayMap[this.opts.wkst || "MO"];
		const jan1 = sample.with({
			month: 1,
			day: 1
		});
		const jan4 = sample.with({
			month: 1,
			day: 4
		});
		const delta = (jan4.dayOfWeek - wkst + 7) % 7;
		const firstWeekStart = jan4.subtract({ days: delta });
		const isLeapYear = jan1.inLeapYear;
		return {
			lastWeek: jan1.dayOfWeek === 4 || isLeapYear && jan1.dayOfWeek === 3 ? 53 : 52,
			firstWeekStart,
			tokens: this.opts.byDay?.length ? this.opts.byDay.map((tok) => extractWeekdayToken(tok)).filter((day) => day !== null) : [Object.entries(dayMap).find(([, d]) => d === this.originalDtstart.dayOfWeek)[0]]
		};
	}
	/**
	* Generate occurrences for a specific week number in a given year
	*/
	generateOccurrencesForWeekInYear(year, weekNo) {
		const occs = [];
		const sample = this.originalDtstart.with({
			year,
			month: 1,
			day: 1
		});
		const { lastWeek, firstWeekStart, tokens } = this.isoWeekByDay(sample);
		if (weekNo > 0 && weekNo > lastWeek || weekNo < 0 && -weekNo > lastWeek) return occs;
		const weekIndex = weekNo > 0 ? weekNo - 1 : lastWeek + weekNo;
		const weekStart = firstWeekStart.add({ weeks: weekIndex });
		occs.push(...this.addByDay(tokens, weekStart));
		return occs.sort((a, b) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(a, b));
	}
	getRscaleCalendarId() {
		return {
			GREGORIAN: "gregory",
			CHINESE: "chinese",
			HEBREW: "hebrew",
			INDIAN: "indian"
		}[this.opts.rscale?.toUpperCase() || ""] || null;
	}
	assertRscaleCalendarSupported(calId) {
		if (calId === "gregory" || calId === "iso8601") return;
		const cached = RRuleTemporal.rscaleCalendarSupport[calId];
		if (cached === true) return;
		if (cached === false) throw new Error(`RSCALE=${this.opts.rscale} is not supported by the current Temporal/Intl implementation`);
		let supported = true;
		try {
			const probe = _js_temporal_polyfill.Temporal.ZonedDateTime.from("2000-01-01T00:00:00+00:00[UTC]").withCalendar(calId);
			probe.year;
			probe.monthCode;
			probe.day;
		} catch {
			supported = false;
		}
		RRuleTemporal.rscaleCalendarSupport[calId] = supported;
		if (!supported) throw new Error(`RSCALE=${this.opts.rscale} is not supported by the current Temporal/Intl implementation`);
	}
	pad2(n) {
		return String(n).padStart(2, "0");
	}
	monthMatchesToken(monthCode, token) {
		if (typeof token === "number") return monthCode === `M${this.pad2(token)}`;
		if (/^\d+L$/i.test(token)) {
			const n = parseInt(token, 10);
			return monthCode === `M${this.pad2(n)}L`;
		}
		return false;
	}
	monthsOfYear(calId, year) {
		const out = [];
		for (let m = 1; m <= 20; m++) try {
			const d = _js_temporal_polyfill.Temporal.PlainDate.from({
				calendar: calId,
				year,
				month: m,
				day: 1
			});
			out.push(d);
		} catch {
			break;
		}
		return out;
	}
	startOfYear(calId, year) {
		return _js_temporal_polyfill.Temporal.PlainDate.from({
			calendar: calId,
			year,
			month: 1,
			day: 1
		});
	}
	endOfYear(calId, year) {
		return this.startOfYear(calId, year + 1).subtract({ days: 1 });
	}
	rscaleFirstWeekStart(calId, year, wkst) {
		const jan4 = _js_temporal_polyfill.Temporal.PlainDate.from({
			calendar: calId,
			year,
			month: 1,
			day: 4
		});
		const delta = (jan4.dayOfWeek - wkst + 7) % 7;
		return jan4.subtract({ days: delta });
	}
	rscaleLastWeekCount(calId, year, wkst) {
		const firstWeekStart = this.rscaleFirstWeekStart(calId, year, wkst);
		const diffDays = this.endOfYear(calId, year).since(firstWeekStart).days;
		return Math.floor(diffDays / 7) + 1;
	}
	lastDayOfMonth(pd) {
		return pd.with({ day: 1 }).add({ months: 1 }).subtract({ days: 1 }).day;
	}
	buildZdtFromPlainDate(pd) {
		const t = this.originalDtstart;
		return _js_temporal_polyfill.Temporal.PlainDateTime.from({
			calendar: pd.calendarId,
			year: pd.year,
			month: pd.month,
			day: pd.day,
			hour: t.hour,
			minute: t.minute,
			second: t.second
		}).toZonedDateTime(this.tzid);
	}
	rscaleMatchesByYearDay(calId, pd) {
		const list = this.opts.byYearDay;
		if (!list || list.length === 0) return true;
		const last = this.endOfYear(calId, pd.year).dayOfYear;
		return list.some((d) => d > 0 ? pd.dayOfYear === d : pd.dayOfYear === last + d + 1);
	}
	rscaleMatchesByWeekNo(calId, pd) {
		const list = this.opts.byWeekNo;
		if (!list || list.length === 0) return true;
		const wkst = weekdayToIsoDay[this.opts.wkst || "MO"];
		const weekYear = pd.subtract({ days: (pd.dayOfWeek - wkst + 7) % 7 }).add({ days: (4 - wkst + 7) % 7 }).year;
		const firstStart = this.rscaleFirstWeekStart(calId, weekYear, wkst);
		const lastWeek = this.rscaleLastWeekCount(calId, weekYear, wkst);
		const idx = Math.floor(pd.since(firstStart).days / 7) + 1;
		return list.some((wn) => wn > 0 ? idx === wn : idx === lastWeek + wn + 1);
	}
	rscaleMatchesByMonth(calId, pd) {
		const tokens = this.opts.byMonth;
		if (!tokens || tokens.length === 0) return true;
		return tokens.some((tok) => this.monthMatchesToken(pd.monthCode, tok));
	}
	rscaleMatchesByMonthDay(pd) {
		const list = this.opts.byMonthDay;
		if (!list || list.length === 0) return true;
		const last = pd.with({ day: 1 }).add({ months: 1 }).subtract({ days: 1 }).day;
		const value = pd.day;
		return list.some((d) => d > 0 ? value === d : value === last + d + 1);
	}
	rscaleMatchesByDayBasic(pd) {
		const byDay = this.opts.byDay;
		if (!byDay || byDay.length === 0) return true;
		const dayMap = weekdayToIsoDay;
		const tokens = byDay.map((tok) => extractWeekdayToken(tok)).filter((x) => x !== null);
		if (tokens.length === 0) return true;
		return tokens.some((wd) => dayMap[wd] === pd.dayOfWeek);
	}
	rscaleDateMatches(calId, pd) {
		return this.rscaleMatchesByMonth(calId, pd) && this.rscaleMatchesByYearDay(calId, pd) && this.rscaleMatchesByWeekNo(calId, pd) && this.rscaleMatchesByMonthDay(pd) && this.rscaleMatchesByDayBasic(pd);
	}
	applySkipForDay(calId, year, monthStart, targetDay) {
		const last = this.lastDayOfMonth(monthStart);
		const skip = this.opts.skip || "OMIT";
		if (targetDay >= 1 && targetDay <= last) return monthStart.with({ day: targetDay });
		if (skip === "BACKWARD") return monthStart.with({ day: last });
		if (skip === "FORWARD") return monthStart.add({ months: 1 }).with({ day: 1 });
		return null;
	}
	generateMonthlyOccurrencesRscale(calId, year, monthStart) {
		const occs = [];
		const byMonthDay = this.opts.byMonthDay;
		const byDay = this.opts.byDay;
		if (!byDay && !byMonthDay) {
			const targetDay = this.originalDtstart.withCalendar(calId).day;
			const pd = this.applySkipForDay(calId, year, monthStart, targetDay);
			if (pd) occs.push(this.buildZdtFromPlainDate(pd));
			return occs;
		}
		const addZ = (pd) => {
			occs.push(this.buildZdtFromPlainDate(pd));
		};
		const last = this.lastDayOfMonth(monthStart);
		const resolveDay = (d) => d > 0 ? d : last + d + 1;
		if (byMonthDay && byMonthDay.length > 0) for (const raw of byMonthDay) {
			const dayNum = resolveDay(raw);
			const pd = this.applySkipForDay(calId, year, monthStart, dayNum);
			if (pd) addZ(pd);
		}
		if (byDay && byDay.length > 0) {
			const dayMap = weekdayToIsoDay;
			const buckets = {};
			let cur = monthStart;
			while (cur.month === monthStart.month && cur.year === monthStart.year) {
				const wd = cur.dayOfWeek;
				(buckets[wd] ||= []).push(cur);
				cur = cur.add({ days: 1 });
			}
			for (const tok of byDay) {
				const parsed = parseByDayToken(tok);
				if (!parsed) continue;
				const ord = parsed.ord;
				const list = buckets[dayMap[parsed.weekday]] || [];
				if (list.length === 0) continue;
				if (ord === 0) for (const pd of list) addZ(pd);
				else {
					const pd = list[ord > 0 ? ord - 1 : list.length + ord];
					if (pd) addZ(pd);
				}
			}
		}
		return this.applyBySetPos(occs).sort((a, b) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(a, b));
	}
	_allRscaleNonGregorian(iterator) {
		const calId = this.getRscaleCalendarId();
		if (!calId) return this._allFallback(iterator);
		this.assertRscaleCalendarSupported(calId);
		const dates = [];
		let iterationCount = 0;
		const start = this.originalDtstart;
		const seed = start.withCalendar(calId);
		const interval = this.opts.interval ?? 1;
		if (!this.addDtstartIfNeeded(dates, iterator)) return this.applyCountLimitAndMergeRDates(dates, iterator);
		if (this.opts.freq === "YEARLY") {
			let yearOffset = 0;
			while (true) {
				if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
				const tgtYear = seed.year + yearOffset * interval;
				let occs = [];
				const monthsTokens = this.opts.byMonth;
				const months = this.monthsOfYear(calId, tgtYear);
				const dayMap = weekdayToIsoDay;
				const wkst = dayMap[this.opts.wkst || "MO"];
				if (this.opts.byWeekNo && this.opts.byWeekNo.length > 0) {
					const firstStart = this.rscaleFirstWeekStart(calId, tgtYear, wkst);
					const lastWeek = this.rscaleLastWeekCount(calId, tgtYear, wkst);
					const tokens = this.opts.byDay?.length ? this.opts.byDay.map((tok) => extractWeekdayToken(tok)).filter((day) => day !== null) : [Object.entries(dayMap).find(([, d]) => d === this.originalDtstart.dayOfWeek)[0]];
					for (const wn of this.opts.byWeekNo) {
						let idx = wn > 0 ? wn - 1 : lastWeek + wn;
						if (idx < 0 || idx >= lastWeek) continue;
						const weekStart = firstStart.add({ weeks: idx });
						for (const tok of tokens) {
							const targetDow = dayMap[tok];
							const pd = weekStart.add({ days: (targetDow - wkst + 7) % 7 });
							if (monthsTokens && monthsTokens.length > 0) {
								if (!monthsTokens.some((t) => this.monthMatchesToken(pd.monthCode, t))) continue;
							}
							if (this.opts.byYearDay && this.opts.byYearDay.length > 0) {
								const lastDay = this.endOfYear(calId, tgtYear).dayOfYear;
								if (!this.opts.byYearDay.some((d) => {
									const target = d > 0 ? d : lastDay + d + 1;
									return pd.dayOfYear === target;
								})) continue;
							}
							occs.push(this.buildZdtFromPlainDate(pd));
						}
					}
				} else if (this.opts.byYearDay && this.opts.byYearDay.length > 0) {
					const startOfYear = this.startOfYear(calId, tgtYear);
					const lastDay = this.endOfYear(calId, tgtYear).dayOfYear;
					for (const d of this.opts.byYearDay) {
						const target = d > 0 ? d : lastDay + d + 1;
						if (target < 1 || target > lastDay) continue;
						let pd = startOfYear.add({ days: target - 1 });
						if (monthsTokens && monthsTokens.length > 0) {
							if (!monthsTokens.some((t) => this.monthMatchesToken(pd.monthCode, t))) continue;
						}
						occs.push(this.buildZdtFromPlainDate(pd));
					}
				} else if (!monthsTokens || monthsTokens.length === 0) try {
					const pd = _js_temporal_polyfill.Temporal.PlainDate.from({
						calendar: calId,
						year: tgtYear,
						monthCode: seed.monthCode,
						day: seed.day
					});
					occs.push(this.buildZdtFromPlainDate(pd));
				} catch {
					const skip = this.opts.skip || "OMIT";
					if (skip === "FORWARD" || skip === "BACKWARD") {
						const mapped = seed.with({ year: tgtYear });
						const adjusted = skip === "BACKWARD" ? mapped.subtract({ days: 1 }) : mapped;
						occs.push(adjusted.withCalendar("iso8601"));
					}
				}
				else {
					const monthStarts = months.filter((m) => monthsTokens.some((tok) => this.monthMatchesToken(m.monthCode, tok)));
					for (const ms of monthStarts) occs.push(...this.generateMonthlyOccurrencesRscale(calId, tgtYear, ms));
				}
				if (occs.length > 0) {
					const sorted = occs.flatMap((z) => this.expandByTime(z)).sort((a, b) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(a, b));
					const { shouldBreak } = this.processOccurrences(sorted, dates, start, iterator);
					if (shouldBreak) break;
				}
				yearOffset++;
				if (this.opts.until && tgtYear > this.opts.until.withCalendar(calId).year) break;
			}
			return this.applyCountLimitAndMergeRDates(dates, iterator);
		}
		if (this.opts.freq === "WEEKLY") {
			const dayMap = weekdayToIsoDay;
			const wkst = dayMap[this.opts.wkst || "MO"];
			const tokens = this.opts.byDay?.length ? this.opts.byDay.map((tok) => extractWeekdayToken(tok)).filter((day) => day !== null) : [Object.entries(dayMap).find(([, d]) => d === this.originalDtstart.dayOfWeek)[0]];
			let weekStart = seed.toPlainDate().subtract({ days: (seed.dayOfWeek - wkst + 7) % 7 });
			while (true) {
				if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
				const occs = [];
				for (const tok of tokens) {
					const targetDow = dayMap[tok];
					const pd = weekStart.add({ days: (targetDow - wkst + 7) % 7 });
					if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(this.buildZdtFromPlainDate(pd), this.originalDtstart) < 0) continue;
					if (this.opts.byWeekNo && this.opts.byWeekNo.length > 0) {
						const weekYear = weekStart.add({ days: (4 - wkst + 7) % 7 }).year;
						const firstStart = this.rscaleFirstWeekStart(calId, weekYear, wkst);
						const lastWeek = this.rscaleLastWeekCount(calId, weekYear, wkst);
						const idx = Math.floor(pd.since(firstStart).days / 7) + 1;
						if (!this.opts.byWeekNo.some((wn) => wn > 0 ? idx === wn : idx === lastWeek + wn + 1)) continue;
					}
					if (this.opts.byYearDay && this.opts.byYearDay.length > 0) {
						const last = this.endOfYear(calId, pd.year).dayOfYear;
						if (!this.opts.byYearDay.some((d) => d > 0 ? pd.dayOfYear === d : pd.dayOfYear === last + d + 1)) continue;
					}
					const monthsTokens = this.opts.byMonth;
					if (monthsTokens && monthsTokens.length > 0) {
						if (!monthsTokens.some((t) => this.monthMatchesToken(pd.monthCode, t))) continue;
					}
					occs.push(this.buildZdtFromPlainDate(pd));
				}
				if (occs.length) {
					const sorted = occs.flatMap((z) => this.expandByTime(z)).sort((a, b) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(a, b));
					const { shouldBreak } = this.processOccurrences(sorted, dates, start, iterator);
					if (shouldBreak) return this.applyCountLimitAndMergeRDates(dates, iterator);
				}
				weekStart = weekStart.add({ weeks: this.opts.interval ?? 1 });
				if (this.opts.until) {
					const z = this.buildZdtFromPlainDate(weekStart.add({ days: 6 }));
					if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(z, this.opts.until) > 0) break;
				}
			}
			return this.applyCountLimitAndMergeRDates(dates, iterator);
		}
		if (this.opts.freq === "MONTHLY") {
			let cursor = seed.toPlainDate().with({ day: 1 });
			while (true) {
				if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
				const year = cursor.year;
				const monthStart = cursor;
				let proceed = true;
				const monthsTokens = this.opts.byMonth;
				if (monthsTokens && monthsTokens.length > 0) proceed = monthsTokens.some((tok) => this.monthMatchesToken(monthStart.monthCode, tok));
				if (proceed) {
					const sorted = this.generateMonthlyOccurrencesRscale(calId, year, monthStart).flatMap((z) => this.expandByTime(z)).sort((a, b) => _js_temporal_polyfill.Temporal.ZonedDateTime.compare(a, b));
					const { shouldBreak } = this.processOccurrences(sorted, dates, start, iterator);
					if (shouldBreak) break;
				}
				cursor = cursor.add({ months: this.opts.interval ?? 1 });
				if (this.opts.until) {
					const z = this.buildZdtFromPlainDate(cursor);
					if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(z, this.opts.until) > 0) break;
				}
			}
			return this.applyCountLimitAndMergeRDates(dates, iterator);
		}
		if (this.opts.freq === "DAILY") {
			let pd = seed.toPlainDate();
			while (true) {
				if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
				if (this.rscaleDateMatches(calId, pd)) {
					const base = this.buildZdtFromPlainDate(pd);
					let occs = this.expandByTime(base);
					occs = this.applyBySetPos(occs);
					const { shouldBreak } = this.processOccurrences(occs, dates, start, iterator);
					if (shouldBreak) break;
				}
				pd = pd.add({ days: this.opts.interval ?? 1 });
				if (this.opts.until) {
					const z = this.buildZdtFromPlainDate(pd);
					if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(z, this.opts.until) > 0) break;
				}
			}
			return this.applyCountLimitAndMergeRDates(dates, iterator);
		}
		if (this.opts.freq === "HOURLY" || this.opts.freq === "MINUTELY") {
			this.opts.freq;
			const unitMs = this.opts.freq === "HOURLY" ? 36e5 : 6e4;
			const interval = this.opts.interval ?? 1;
			let pd = seed.toPlainDate();
			const startInstantMs = this.originalDtstart.toInstant().epochMilliseconds;
			while (true) {
				if (++iterationCount > this.maxIterations) throw new Error(`Maximum iterations (${this.maxIterations}) exceeded in all()`);
				if (this.rscaleDateMatches(calId, pd)) {
					const base = this.buildZdtFromPlainDate(pd);
					let occs = this.expandByTime(base);
					occs = occs.filter((occ) => {
						const delta = occ.toInstant().epochMilliseconds - startInstantMs;
						return Math.floor(delta / unitMs) % interval === 0;
					});
					const { shouldBreak } = this.processOccurrences(occs, dates, start, iterator);
					if (shouldBreak) break;
				}
				pd = pd.add({ days: 1 });
				if (this.opts.until) {
					const z = this.buildZdtFromPlainDate(pd);
					if (_js_temporal_polyfill.Temporal.ZonedDateTime.compare(z, this.opts.until) > 0) break;
				}
			}
			return this.applyCountLimitAndMergeRDates(dates, iterator);
		}
		return this._allFallback(iterator);
	}
};
//#endregion
exports.RRuleTemporal = RRuleTemporal;
exports.allowedFreq = allowedFreq;
exports.allowedWeekdays = allowedWeekdays;
exports.weekdayToIsoDay = weekdayToIsoDay;


/***/ }),

/***/ 813:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_index = __nccwpck_require__(589);
let _js_temporal_polyfill = __nccwpck_require__(946);
//#region src/totext.ts
const en = {
	weekdayNames: [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday"
	],
	monthNames: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	units: {
		year: {
			singular: "year",
			plural: "years"
		},
		month: {
			singular: "month",
			plural: "months"
		},
		week: {
			singular: "week",
			plural: "weeks"
		},
		day: {
			singular: "day",
			plural: "days"
		},
		hour: {
			singular: "hour",
			plural: "hours"
		},
		minute: {
			singular: "minute",
			plural: "minutes"
		},
		second: {
			singular: "second",
			plural: "seconds"
		}
	},
	words: {
		every: "every",
		weekday: "weekday",
		on: "on",
		in: "in",
		on_the: "on the",
		day_of_month: "day of the month",
		day_of_year: "day of the year",
		in_week: "in week",
		at: "at",
		at_minute: "at minute",
		at_second: "at second",
		until: "until",
		for: "for",
		time: "time",
		times: "times",
		instance: "instance",
		week_starts_on: "week starts on",
		with: "with",
		additional_date: "additional date",
		additional_dates: "additional dates",
		excluding: "excluding",
		date: "date",
		dates: "dates",
		and: "and",
		last: "last",
		starting_from: "starting from"
	},
	ordinal: (n) => {
		const abs = Math.abs(n);
		const suffix = abs % 10 === 1 && abs % 100 !== 11 ? "st" : abs % 10 === 2 && abs % 100 !== 12 ? "nd" : abs % 10 === 3 && abs % 100 !== 13 ? "rd" : "th";
		return n < 0 ? `last` : `${abs}${suffix}`;
	}
};
const ALL_LOCALES = {
	en,
	de: {
		weekdayNames: [
			"Montag",
			"Dienstag",
			"Mittwoch",
			"Donnerstag",
			"Freitag",
			"Samstag",
			"Sonntag"
		],
		monthNames: [
			"Januar",
			"Februar",
			"März",
			"April",
			"Mai",
			"Juni",
			"Juli",
			"August",
			"September",
			"Oktober",
			"November",
			"Dezember"
		],
		units: {
			year: {
				singular: "Jahr",
				plural: "Jahre"
			},
			month: {
				singular: "Monat",
				plural: "Monate"
			},
			week: {
				singular: "Woche",
				plural: "Wochen"
			},
			day: {
				singular: "Tag",
				plural: "Tage"
			},
			hour: {
				singular: "Stunde",
				plural: "Stunden"
			},
			minute: {
				singular: "Minute",
				plural: "Minuten"
			},
			second: {
				singular: "Sekunde",
				plural: "Sekunden"
			}
		},
		words: {
			every: "jede/n/s",
			weekday: "Werktag",
			on: "am",
			in: "im",
			on_the: "am",
			day_of_month: "Tag des Monats",
			day_of_year: "Tag des Jahres",
			in_week: "in Kalenderwoche",
			at: "um",
			at_minute: "in Minute",
			at_second: "in Sekunde",
			until: "bis",
			for: "für",
			time: "Mal",
			times: "Mal",
			instance: "Vorkommen",
			week_starts_on: "Woche beginnt am",
			with: "mit",
			additional_date: "zusätzlichem Datum",
			additional_dates: "zusätzlichen Daten",
			excluding: "ohne",
			date: "Datum",
			dates: "Daten",
			and: "und",
			last: "letzter",
			starting_from: "beginnend am"
		},
		ordinal: (n) => {
			if (n < 0) return "letzten";
			return `${Math.abs(n)}.`;
		}
	},
	es: {
		weekdayNames: [
			"lunes",
			"martes",
			"miércoles",
			"jueves",
			"viernes",
			"sábado",
			"domingo"
		],
		monthNames: [
			"enero",
			"febrero",
			"marzo",
			"abril",
			"mayo",
			"junio",
			"julio",
			"agosto",
			"septiembre",
			"octubre",
			"noviembre",
			"diciembre"
		],
		units: {
			year: {
				singular: "año",
				plural: "años"
			},
			month: {
				singular: "mes",
				plural: "meses"
			},
			week: {
				singular: "semana",
				plural: "semanas"
			},
			day: {
				singular: "día",
				plural: "días"
			},
			hour: {
				singular: "hora",
				plural: "horas"
			},
			minute: {
				singular: "minuto",
				plural: "minutos"
			},
			second: {
				singular: "segundo",
				plural: "segundos"
			}
		},
		words: {
			every: "cada",
			weekday: "día de la semana",
			on: "en",
			in: "en",
			on_the: "el",
			day_of_month: "día del mes",
			day_of_year: "día del año",
			in_week: "en la semana",
			at: "a las",
			at_minute: "en el minuto",
			at_second: "en el segundo",
			until: "hasta",
			for: "durante",
			time: "vez",
			times: "veces",
			instance: "ocasión",
			week_starts_on: "la semana comienza el",
			with: "con",
			additional_date: "fecha adicional",
			additional_dates: "fechas adicionales",
			excluding: "excluyendo",
			date: "fecha",
			dates: "fechas",
			and: "y",
			last: "último",
			starting_from: "a partir de"
		},
		ordinal: (n) => n < 0 ? "último" : `${Math.abs(n)}º`
	},
	hi: {
		weekdayNames: [
			"सोमवार",
			"मंगलवार",
			"बुधवार",
			"गुरुवार",
			"शुक्रवार",
			"शनिवार",
			"रविवार"
		],
		monthNames: [
			"जनवरी",
			"फरवरी",
			"मार्च",
			"अप्रैल",
			"मई",
			"जून",
			"जुलाई",
			"अगस्त",
			"सितंबर",
			"अक्टूबर",
			"नवंबर",
			"दिसंबर"
		],
		units: {
			year: {
				singular: "साल",
				plural: "साल"
			},
			month: {
				singular: "महीना",
				plural: "महीने"
			},
			week: {
				singular: "सप्ताह",
				plural: "सप्ताह"
			},
			day: {
				singular: "दिन",
				plural: "दिन"
			},
			hour: {
				singular: "घंटा",
				plural: "घंटे"
			},
			minute: {
				singular: "मिनट",
				plural: "मिनट"
			},
			second: {
				singular: "सेकंड",
				plural: "सेकंड"
			}
		},
		words: {
			every: "हर",
			weekday: "सप्ताह का दिन",
			on: "को",
			in: "में",
			on_the: "को",
			day_of_month: "महीने का दिन",
			day_of_year: "साल का दिन",
			in_week: "सप्ताह",
			at: "पर",
			at_minute: "मिनट पर",
			at_second: "सेकंड पर",
			until: "तक",
			for: "के लिए",
			time: "बार",
			times: "बार",
			instance: "बार",
			week_starts_on: "सप्ताह शुरू होता है",
			with: "साथ",
			additional_date: "अतिरिक्त तारीख",
			additional_dates: "अतिरिक्त तारीखें",
			excluding: "को छोड़कर",
			date: "तारीख",
			dates: "तारीखें",
			and: "और",
			last: "आखिरी",
			starting_from: "से शुरू"
		},
		ordinal: (n) => n < 0 ? "आखिरी" : `${Math.abs(n)}वां`
	},
	yue: {
		weekdayNames: [
			"星期一",
			"星期二",
			"星期三",
			"星期四",
			"星期五",
			"星期六",
			"星期日"
		],
		monthNames: [
			"一月",
			"二月",
			"三月",
			"四月",
			"五月",
			"六月",
			"七月",
			"八月",
			"九月",
			"十月",
			"十一月",
			"十二月"
		],
		units: {
			year: {
				singular: "年",
				plural: "年"
			},
			month: {
				singular: "月",
				plural: "月"
			},
			week: {
				singular: "週",
				plural: "週"
			},
			day: {
				singular: "日",
				plural: "日"
			},
			hour: {
				singular: "小時",
				plural: "小時"
			},
			minute: {
				singular: "分鐘",
				plural: "分鐘"
			},
			second: {
				singular: "秒",
				plural: "秒"
			}
		},
		words: {
			every: "每",
			weekday: "平日",
			on: "在",
			in: "於",
			on_the: "在",
			day_of_month: "月的日子",
			day_of_year: "年的日子",
			in_week: "第",
			at: "在",
			at_minute: "在第",
			at_second: "在第",
			until: "直到",
			for: "共",
			time: "次",
			times: "次",
			instance: "次",
			week_starts_on: "星期開始於",
			with: "帶有",
			additional_date: "額外日期",
			additional_dates: "額外日期",
			excluding: "排除",
			date: "日期",
			dates: "日期",
			and: "和",
			last: "最後",
			starting_from: "由"
		},
		ordinal: (n) => n < 0 ? "最後" : `第${Math.abs(n)}`
	},
	ar: {
		weekdayNames: [
			"الاثنين",
			"الثلاثاء",
			"الأربعاء",
			"الخميس",
			"الجمعة",
			"السبت",
			"الأحد"
		],
		monthNames: [
			"يناير",
			"فبراير",
			"مارس",
			"أبريل",
			"مايو",
			"يونيو",
			"يوليو",
			"أغسطس",
			"سبتمبر",
			"أكتوبر",
			"نوفمبر",
			"ديسمبر"
		],
		units: {
			year: {
				singular: "سنة",
				plural: "سنوات"
			},
			month: {
				singular: "شهر",
				plural: "أشهر"
			},
			week: {
				singular: "أسبوع",
				plural: "أسابيع"
			},
			day: {
				singular: "يوم",
				plural: "أيام"
			},
			hour: {
				singular: "ساعة",
				plural: "ساعات"
			},
			minute: {
				singular: "دقيقة",
				plural: "دقائق"
			},
			second: {
				singular: "ثانية",
				plural: "ثواني"
			}
		},
		words: {
			every: "كل",
			weekday: "يوم من أيام الأسبوع",
			on: "في",
			in: "في",
			on_the: "في الـ",
			day_of_month: "يوم من الشهر",
			day_of_year: "يوم من السنة",
			in_week: "في الأسبوع",
			at: "عند",
			at_minute: "في الدقيقة",
			at_second: "في الثانية",
			until: "حتى",
			for: "لمدة",
			time: "مرة",
			times: "مرات",
			instance: "مرة",
			week_starts_on: "يبدأ الأسبوع يوم",
			with: "مع",
			additional_date: "تاريخ إضافي",
			additional_dates: "تواريخ إضافية",
			excluding: "باستثناء",
			date: "تاريخ",
			dates: "تواريخ",
			and: "و",
			last: "الأخير",
			starting_from: "ابتداءً من"
		},
		ordinal: (n) => {
			if (n < 0) return "الأخير";
			const abs = Math.abs(n);
			return {
				1: "الأول",
				2: "الثاني",
				3: "الثالث",
				4: "الرابع",
				5: "الخامس",
				6: "السادس",
				7: "السابع",
				8: "الثامن",
				9: "التاسع",
				10: "العاشر",
				11: "الحادي عشر",
				12: "الثاني عشر",
				13: "الثالث عشر"
			}[abs] || abs.toString();
		}
	},
	he: {
		weekdayNames: [
			"יום שני",
			"יום שלישי",
			"יום רביעי",
			"יום חמישי",
			"יום שישי",
			"יום שבת",
			"יום ראשון"
		],
		monthNames: [
			"ינואר",
			"פברואר",
			"מרץ",
			"אפריל",
			"מאי",
			"יוני",
			"יולי",
			"אוגוסט",
			"ספטמבר",
			"אוקטובר",
			"נובמבר",
			"דצמבר"
		],
		units: {
			year: {
				singular: "שנה",
				plural: "שנים"
			},
			month: {
				singular: "חודש",
				plural: "חודשים"
			},
			week: {
				singular: "שבוע",
				plural: "שבועות"
			},
			day: {
				singular: "יום",
				plural: "ימים"
			},
			hour: {
				singular: "שעה",
				plural: "שעות"
			},
			minute: {
				singular: "דקה",
				plural: "דקות"
			},
			second: {
				singular: "שניה",
				plural: "שניות"
			}
		},
		words: {
			every: "כל",
			weekday: "יום חול",
			on: "ב",
			in: "ב",
			on_the: "ב",
			day_of_month: "יום בחודש",
			day_of_year: "יום בשנה",
			in_week: "בשבוע",
			at: "בשעה",
			at_minute: "בדקה",
			at_second: "בשניה",
			until: "עד",
			for: "במשך",
			time: "פעם",
			times: "פעמים",
			instance: "פעם",
			week_starts_on: "שבוע מתחיל ב",
			with: "עם",
			additional_date: "תאריך נוסף",
			additional_dates: "תאריכים נוספים",
			excluding: "למעט",
			date: "תאריך",
			dates: "תאריכים",
			and: "ו",
			last: "אחרון",
			starting_from: "החל מ"
		},
		ordinal: (n) => {
			if (n < 0) return "אחרון";
			const abs = Math.abs(n);
			return {
				1: "ראשון",
				2: "שני",
				3: "שלישי",
				4: "רביעי",
				5: "חמישי",
				6: "שישי",
				7: "שביעי",
				8: "שמיני",
				9: "תשיעי",
				10: "עשירי",
				11: "אחד עשר",
				12: "שנים עשר",
				13: "שלושה עשר"
			}[abs] || abs.toString();
		}
	},
	zh: {
		weekdayNames: [
			"星期一",
			"星期二",
			"星期三",
			"星期四",
			"星期五",
			"星期六",
			"星期日"
		],
		monthNames: [
			"一月",
			"二月",
			"三月",
			"四月",
			"五月",
			"六月",
			"七月",
			"八月",
			"九月",
			"十月",
			"十一月",
			"十二月"
		],
		units: {
			year: {
				singular: "年",
				plural: "年"
			},
			month: {
				singular: "月",
				plural: "月"
			},
			week: {
				singular: "周",
				plural: "周"
			},
			day: {
				singular: "日",
				plural: "日"
			},
			hour: {
				singular: "小时",
				plural: "小时"
			},
			minute: {
				singular: "分钟",
				plural: "分钟"
			},
			second: {
				singular: "秒",
				plural: "秒"
			}
		},
		words: {
			every: "每",
			weekday: "工作日",
			on: "在",
			in: "在",
			on_the: "在",
			day_of_month: "月的日子",
			day_of_year: "年的日子",
			in_week: "第",
			at: "在",
			at_minute: "在第",
			at_second: "在第",
			until: "直到",
			for: "共",
			time: "次",
			times: "次",
			instance: "次",
			week_starts_on: "星期开始于",
			with: "带有",
			additional_date: "额外日期",
			additional_dates: "额外日期",
			excluding: "排除",
			date: "日期",
			dates: "日期",
			and: "和",
			last: "最后",
			starting_from: "从"
		},
		ordinal: (n) => n < 0 ? "最后" : `第${Math.abs(n)}`
	},
	fr: {
		weekdayNames: [
			"lundi",
			"mardi",
			"mercredi",
			"jeudi",
			"vendredi",
			"samedi",
			"dimanche"
		],
		monthNames: [
			"janvier",
			"février",
			"mars",
			"avril",
			"mai",
			"juin",
			"juillet",
			"août",
			"septembre",
			"octobre",
			"novembre",
			"décembre"
		],
		units: {
			year: {
				singular: "année",
				plural: "ans"
			},
			month: {
				singular: "mois",
				plural: "mois"
			},
			week: {
				singular: "semaine",
				plural: "semaines"
			},
			day: {
				singular: "jour",
				plural: "jours"
			},
			hour: {
				singular: "heure",
				plural: "heures"
			},
			minute: {
				singular: "minute",
				plural: "minutes"
			},
			second: {
				singular: "seconde",
				plural: "secondes"
			}
		},
		words: {
			every: "chaque",
			weekday: "jour de semaine",
			on: "le",
			in: "dans",
			on_the: "le",
			day_of_month: "jour du mois",
			day_of_year: "jour de l'année",
			in_week: "dans la semaine",
			at: "à",
			at_minute: "à la minute",
			at_second: "à la seconde",
			until: "jusqu'au",
			for: "pendant",
			time: "fois",
			times: "fois",
			instance: "occurrence",
			week_starts_on: "la semaine commence le",
			with: "avec",
			additional_date: "date supplémentaire",
			additional_dates: "dates supplémentaires",
			excluding: "en excluant",
			date: "date",
			dates: "dates",
			and: "et",
			last: "dernier",
			starting_from: "à partir du"
		},
		ordinal: (n) => {
			const abs = Math.abs(n);
			if (n < 0) return "dernier";
			if (abs === 1) return "1er";
			return `${abs}e`;
		}
	}
};
const env = typeof process !== "undefined" && process.env ? process.env.TOTEXT_LANGS : void 0;
const active = env ? env.split(",").map((s) => s.trim()).filter(Boolean) : Object.keys(ALL_LOCALES);
const LOCALES = {};
for (const l of active) if (ALL_LOCALES[l]) LOCALES[l] = ALL_LOCALES[l];
const workweekWeekdays = require_index.allowedWeekdays.slice(0, 5);
const byDayTokenRegex = new RegExp(`^([+-]?\\d+)?(${require_index.allowedWeekdays.join("|")})$`);
const weekdayIndexByToken = Object.fromEntries(require_index.allowedWeekdays.map((weekday, idx) => [weekday, idx]));
function defaultOrdinal(n) {
	const abs = Math.abs(n);
	const suffix = abs % 10 === 1 && abs % 100 !== 11 ? "st" : abs % 10 === 2 && abs % 100 !== 12 ? "nd" : abs % 10 === 3 && abs % 100 !== 13 ? "rd" : "th";
	return n < 0 ? `last` : `${abs}${suffix}`;
}
function ordinal(n, locale) {
	return locale.ordinal ? locale.ordinal(n) : defaultOrdinal(n);
}
function list(arr, mapFn = (x) => `${x}`, final) {
	const mapped = arr.map(mapFn);
	if (mapped.length === 1) return mapped[0];
	return mapped.slice(0, -1).join(", ") + ` ${final} ` + mapped[mapped.length - 1];
}
function formatByDayToken(tok, locale) {
	if (typeof tok === "number") return tok.toString();
	const m = tok.toUpperCase().match(byDayTokenRegex);
	if (!m) return tok;
	const ord = m[1] ? parseInt(m[1], 10) : 0;
	const idx = weekdayIndexByToken[m[2]];
	const name = locale.weekdayNames[idx];
	if (ord === 0) return name;
	if (ord === -1) return `${locale.words.last} ${name}`;
	return `${ordinal(ord, locale)} ${name}`;
}
function formatTime(zdt, locale, hour, minute, second) {
	const options = {
		hour: "numeric",
		timeZone: zdt.timeZoneId
	};
	if (second) options.second = "2-digit";
	if (second || minute) options.minute = "2-digit";
	const ruleTime = _js_temporal_polyfill.Temporal.PlainTime.from({
		hour,
		minute,
		second
	});
	let result;
	try {
		result = ruleTime.toLocaleString(locale, options);
	} catch {
		result = ruleTime.toLocaleString("en", options);
	}
	return result;
}
function weekdayTokenFromZdt(zdt) {
	return require_index.allowedWeekdays[zdt.dayOfWeek - 1];
}
function tzAbbreviation(zdt, locale) {
	const options = {
		timeZone: zdt.timeZoneId,
		timeZoneName: "short",
		hour: "numeric"
	};
	let formatter;
	try {
		formatter = new Intl.DateTimeFormat(locale, options);
	} catch {
		formatter = Intl.DateTimeFormat("en", options);
	}
	return formatter.formatToParts(new Date(zdt.epochMilliseconds)).find((p) => p.type === "timeZoneName")?.value || zdt.timeZoneId;
}
function formatLocalizedDate(zdt, locale) {
	try {
		return zdt.toLocaleString(locale, { dateStyle: "long" });
	} catch {
		return zdt.toLocaleString("en", { dateStyle: "long" });
	}
}
function toText(input, locale, options = {}) {
	const opts = (typeof input === "string" ? new require_index.RRuleTemporal({ rruleString: input }) : input).options();
	const resolvedLocale = locale ?? Intl.DateTimeFormat().resolvedOptions().locale;
	const lang = resolvedLocale.split("-")[0];
	const data = LOCALES[lang] || en;
	const dateLocale = LOCALES[lang] ? resolvedLocale : "en";
	const { freq, interval = 1, count, until, byDay, byHour, byMinute, bySecond, byMonth, byMonthDay, byYearDay, byWeekNo, bySetPos, wkst, rDate, exDate } = opts;
	const dayOrLarger = freq === "YEARLY" || freq === "MONTHLY" || freq === "WEEKLY" || freq === "DAILY";
	const hasExplicitTime = Boolean(byHour || byMinute || bySecond);
	const dtstartHasTime = opts.dtstart.hour !== 0 || opts.dtstart.minute !== 0 || opts.dtstart.second !== 0;
	const shouldDefaultTime = dayOrLarger && (hasExplicitTime || dtstartHasTime);
	const textByDay = byDay ?? (freq === "WEEKLY" ? [weekdayTokenFromZdt(opts.dtstart)] : void 0);
	const textByHour = byHour ?? (shouldDefaultTime ? [opts.dtstart.hour] : void 0);
	const textByMinute = textByHour ? byMinute ?? [opts.dtstart.minute] : byMinute;
	const textBySecond = textByHour ? bySecond ?? [opts.dtstart.second] : bySecond;
	const parts = [data.words.every];
	const baseKey = {
		YEARLY: "year",
		MONTHLY: "month",
		WEEKLY: "week",
		DAILY: "day",
		HOURLY: "hour",
		MINUTELY: "minute",
		SECONDLY: "second"
	}[freq];
	const base = data.units[baseKey];
	const daysNormalized = textByDay?.map((d) => d.toUpperCase());
	const isWeekdays = daysNormalized && daysNormalized.length === workweekWeekdays.length && workweekWeekdays.every((d) => daysNormalized.includes(d));
	const isEveryday = daysNormalized && daysNormalized.length === require_index.allowedWeekdays.length && require_index.allowedWeekdays.every((d) => daysNormalized.includes(d));
	if (freq === "WEEKLY" && interval === 1 && isWeekdays) parts.push(data.words.weekday);
	else if (freq === "WEEKLY" && interval === 1 && isEveryday) parts.push(data.units.day.singular);
	else if (interval !== 1) parts.push(interval.toString(), base.plural);
	else parts.push(base.singular);
	if (freq === "WEEKLY" && textByDay && !isWeekdays && !isEveryday) parts.push(data.words.on, list(textByDay, (t) => formatByDayToken(t, data), data.words.and));
	else if (textByDay && freq !== "WEEKLY") parts.push(data.words.on, list(textByDay, (t) => formatByDayToken(t, data), data.words.and));
	if (byMonth) parts.push(data.words.in, list(byMonth, (m) => data.monthNames[m - 1], data.words.and));
	if (byMonthDay) parts.push(data.words.on_the, list(byMonthDay, (d) => ordinal(d, data), data.words.and), data.words.day_of_month);
	if (byYearDay) parts.push(data.words.on_the, list(byYearDay, (d) => ordinal(d, data), data.words.and), data.words.day_of_year);
	if (byWeekNo) parts.push(data.words.in_week, list(byWeekNo, (n) => n.toString(), data.words.and));
	if (textByHour) {
		const minutes = textByMinute ?? [0];
		const seconds = textBySecond ?? [0];
		const times = textByHour.flatMap((h) => minutes.flatMap((m) => seconds.map((s) => formatTime(opts.dtstart, dateLocale, h, m, s))));
		parts.push(data.words.at, list(times, void 0, data.words.and));
		if (!options.excludeTzAbbreviation) parts.push(tzAbbreviation(opts.dtstart, dateLocale));
	}
	if (!textByHour && textByMinute) parts.push(data.words.at_minute, list(textByMinute, void 0, data.words.and));
	if (!textByHour && !textByMinute && textBySecond) parts.push(data.words.at_second, list(textBySecond, void 0, data.words.and));
	if (options.includeDtstart) parts.push(data.words.starting_from, formatLocalizedDate(opts.dtstart, dateLocale));
	if (until) parts.push(data.words.until, formatLocalizedDate(until, dateLocale));
	else if (count !== void 0) parts.push(data.words.for, count.toString(), count === 1 ? data.words.time : data.words.times);
	if (bySetPos) parts.push(data.words.on_the, list(bySetPos, (n) => ordinal(n, data), data.words.and), data.words.instance);
	if (wkst) {
		const wkName = formatByDayToken(wkst, data);
		parts.push(data.words.week_starts_on, wkName);
	}
	if (rDate && rDate.length) parts.push(data.words.with, `${rDate.length}`, rDate.length === 1 ? data.words.additional_date : data.words.additional_dates);
	if (exDate && exDate.length) parts.push(data.words.excluding, `${exDate.length}`, exDate.length === 1 ? data.words.date : data.words.dates);
	if (opts.rscale) {
		const rscale = opts.rscale;
		const skip = opts.skip;
		parts.push(`(RSCALE=${rscale}${skip ? `;SKIP=${skip}` : ""})`);
	}
	return parts.join(" ");
}
//#endregion
exports.toText = toText;


/***/ }),

/***/ 256:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


function createSlotClass(branding, construct, getters, methods, staticMethods, formatFunc) {
  function Class(...args) {
    if (!(this instanceof Class)) {
      throw new TypeError(internal.invalidCallingContext);
    }
    {
      const slots = construct(...args);
      setSlots(this, slots), dbg(this, slots, formatFunc);
    }
  }
  function bindMethod(method, methodName) {
    return Object.defineProperties((function(...args) {
      return method.call(this, getSpecificSlots(this), ...args);
    }), internal.createNameDescriptors(methodName));
  }
  function getSpecificSlots(obj) {
    const slots = getSlots(obj);
    if (!slots || slots.branding !== branding) {
      throw new TypeError(internal.invalidCallingContext);
    }
    return slots;
  }
  return Object.defineProperties(Class.prototype, {
    ...internal.createGetterDescriptors(internal.mapProps(bindMethod, getters)),
    ...internal.createPropDescriptors(internal.mapProps(bindMethod, methods)),
    ...internal.createStringTagDescriptors("Temporal." + branding)
  }), Object.defineProperties(Class, {
    ...internal.createPropDescriptors(staticMethods),
    ...internal.createNameDescriptors(branding)
  }), [ Class, slots => {
    const instance = Object.create(Class.prototype);
    return setSlots(instance, slots), dbg(instance, slots, formatFunc), instance;
  }, getSpecificSlots ];
}

function rejectInvalidBag(bag) {
  if (getSlots(bag) || void 0 !== bag.calendar || void 0 !== bag.timeZone) {
    throw new TypeError(internal.invalidBag);
  }
  return bag;
}

function dbg(instance, slots, formatSlots) {
  "dbg" === dbg.name && Object.defineProperty(instance, "_str_", {
    value: formatSlots(slots),
    writable: 0,
    enumerable: 0,
    configurable: 0
  });
}

function getCalendarIdFromBag(bag) {
  return extractCalendarIdFromBag(bag) || internal.isoCalendarId;
}

function extractCalendarIdFromBag(bag) {
  const {calendar: calendarArg} = bag;
  if (void 0 !== calendarArg) {
    return refineCalendarArg(calendarArg);
  }
}

function refineCalendarArg(arg) {
  if (internal.isObjectLike(arg)) {
    const {calendar: calendar} = getSlots(arg) || {};
    if (!calendar) {
      throw new TypeError(internal.invalidCalendar(arg));
    }
    return calendar;
  }
  return (arg => internal.resolveCalendarId(internal.parseCalendarId(internal.requireString(arg))))(arg);
}

function createCalendarGetters(methodNameMap) {
  const methods = {};
  for (const methodName in methodNameMap) {
    methods[methodName] = slots => {
      const {calendar: calendar} = slots;
      return internal.createNativeStandardOps(calendar)[methodName](slots);
    };
  }
  return methods;
}

function neverValueOf() {
  throw new TypeError(internal.forbiddenValueOf);
}

function refineTimeZoneArg(arg) {
  if (internal.isObjectLike(arg)) {
    const {timeZone: timeZone} = getSlots(arg) || {};
    if (!timeZone) {
      throw new TypeError(internal.invalidTimeZone(arg));
    }
    return timeZone;
  }
  return (arg => internal.resolveTimeZoneId(internal.parseTimeZoneId(internal.requireString(arg))))(arg);
}

function toDurationSlots(arg) {
  if (internal.isObjectLike(arg)) {
    const slots = getSlots(arg);
    return slots && slots.branding === internal.DurationBranding ? slots : internal.refineDurationBag(arg);
  }
  return internal.parseDuration(arg);
}

function refinePublicRelativeTo(relativeTo) {
  if (void 0 !== relativeTo) {
    if (internal.isObjectLike(relativeTo)) {
      const slots = getSlots(relativeTo) || {};
      switch (slots.branding) {
       case internal.ZonedDateTimeBranding:
       case internal.PlainDateBranding:
        return slots;

       case internal.PlainDateTimeBranding:
        return internal.createPlainDateSlots(slots);
      }
      const calendarId = getCalendarIdFromBag(relativeTo);
      return {
        ...internal.refineMaybeZonedDateTimeBag(refineTimeZoneArg, internal.queryNativeTimeZone, internal.createNativeStandardOps(calendarId), relativeTo),
        calendar: calendarId
      };
    }
    return internal.parseRelativeToSlots(relativeTo);
  }
}

function toPlainTimeSlots(arg, options) {
  if (internal.isObjectLike(arg)) {
    const slots = getSlots(arg) || {};
    switch (slots.branding) {
     case internal.PlainTimeBranding:
      return internal.refineOverflowOptions(options), slots;

     case internal.PlainDateTimeBranding:
      return internal.refineOverflowOptions(options), internal.createPlainTimeSlots(slots);

     case internal.ZonedDateTimeBranding:
      return internal.refineOverflowOptions(options), internal.zonedDateTimeToPlainTime(internal.queryNativeTimeZone, slots);
    }
    return internal.refinePlainTimeBag(arg, options);
  }
  const timeSlots = internal.parsePlainTime(arg);
  return internal.refineOverflowOptions(options), timeSlots;
}

function optionalToPlainTimeFields(timeArg) {
  return void 0 === timeArg ? void 0 : toPlainTimeSlots(timeArg);
}

function toPlainDateTimeSlots(arg, options) {
  if (internal.isObjectLike(arg)) {
    const slots = getSlots(arg) || {};
    switch (slots.branding) {
     case internal.PlainDateTimeBranding:
      return internal.refineOverflowOptions(options), slots;

     case internal.PlainDateBranding:
      return internal.refineOverflowOptions(options), internal.createPlainDateTimeSlots({
        ...slots,
        ...internal.isoTimeFieldDefaults
      });

     case internal.ZonedDateTimeBranding:
      return internal.refineOverflowOptions(options), internal.zonedDateTimeToPlainDateTime(internal.queryNativeTimeZone, slots);
    }
    return internal.refinePlainDateTimeBag(internal.createNativeStandardOps(getCalendarIdFromBag(arg)), arg, options);
  }
  const res = internal.parsePlainDateTime(arg);
  return internal.refineOverflowOptions(options), res;
}

function toPlainMonthDaySlots(arg, options) {
  if (internal.isObjectLike(arg)) {
    const slots = getSlots(arg);
    if (slots && slots.branding === internal.PlainMonthDayBranding) {
      return internal.refineOverflowOptions(options), slots;
    }
    const calendarIdMaybe = extractCalendarIdFromBag(arg), calendarId = calendarIdMaybe || internal.isoCalendarId;
    return internal.refinePlainMonthDayBag(internal.createNativeStandardOps(calendarId), !calendarIdMaybe, arg, options);
  }
  const res = internal.parsePlainMonthDay(internal.createNativeStandardOps, arg);
  return internal.refineOverflowOptions(options), res;
}

function toPlainYearMonthSlots(arg, options) {
  if (internal.isObjectLike(arg)) {
    const slots = getSlots(arg);
    return slots && slots.branding === internal.PlainYearMonthBranding ? (internal.refineOverflowOptions(options), 
    slots) : internal.refinePlainYearMonthBag(internal.createNativeStandardOps(getCalendarIdFromBag(arg)), arg, options);
  }
  const res = internal.parsePlainYearMonth(internal.createNativeStandardOps, arg);
  return internal.refineOverflowOptions(options), res;
}

function toPlainDateSlots(arg, options) {
  if (internal.isObjectLike(arg)) {
    const slots = getSlots(arg) || {};
    switch (slots.branding) {
     case internal.PlainDateBranding:
      return internal.refineOverflowOptions(options), slots;

     case internal.PlainDateTimeBranding:
      return internal.refineOverflowOptions(options), internal.createPlainDateSlots(slots);

     case internal.ZonedDateTimeBranding:
      return internal.refineOverflowOptions(options), internal.zonedDateTimeToPlainDate(internal.queryNativeTimeZone, slots);
    }
    return internal.refinePlainDateBag(internal.createNativeStandardOps(getCalendarIdFromBag(arg)), arg, options);
  }
  const res = internal.parsePlainDate(arg);
  return internal.refineOverflowOptions(options), res;
}

function toZonedDateTimeSlots(arg, options) {
  if (internal.isObjectLike(arg)) {
    const slots = getSlots(arg);
    if (slots && slots.branding === internal.ZonedDateTimeBranding) {
      return internal.refineZonedFieldOptions(options), slots;
    }
    const calendarId = getCalendarIdFromBag(arg);
    return internal.refineZonedDateTimeBag(refineTimeZoneArg, internal.queryNativeTimeZone, internal.createNativeStandardOps(calendarId), calendarId, arg, options);
  }
  return internal.parseZonedDateTime(arg, options);
}

function adaptDateMethods(methods) {
  return internal.mapProps((method => slots => method(slotsToIso(slots))), methods);
}

function slotsToIso(slots) {
  return internal.zonedEpochSlotsToIso(slots, internal.queryNativeTimeZone);
}

function toInstantSlots(arg) {
  if (internal.isObjectLike(arg)) {
    const slots = getSlots(arg);
    if (slots) {
      switch (slots.branding) {
       case internal.InstantBranding:
        return slots;

       case internal.ZonedDateTimeBranding:
        return internal.createInstantSlots(slots.epochNanoseconds);
      }
    }
  }
  return internal.parseInstant(arg);
}

function createFormatMethod(methodName) {
  return Object.defineProperties((function(...formattables) {
    const prepFormat = internalsMap.get(this), [format, ...rawFormattables] = prepFormat(methodName.includes("Range"), ...formattables);
    return format[methodName](...rawFormattables);
  }), internal.createNameDescriptors(methodName));
}

function createProxiedMethod(methodName) {
  return Object.defineProperties((function(...args) {
    return internalsMap.get(this).rawFormat[methodName](...args);
  }), internal.createNameDescriptors(methodName));
}

function createFormatPrepperForBranding(branding) {
  const config = classFormatConfigs[branding];
  if (!config) {
    throw new TypeError(internal.invalidFormatType(branding));
  }
  return internal.createFormatPrepper(config, internal.memoize(internal.createFormatForPrep), 1);
}

var internal = __nccwpck_require__(99);

const slotsMap = new WeakMap, getSlots = slotsMap.get.bind(slotsMap), setSlots = slotsMap.set.bind(slotsMap), yearMonthOnlyRefiners = {
  era: internal.requireStringOrUndefined,
  eraYear: internal.requireIntegerOrUndefined,
  year: internal.requireInteger,
  month: internal.requirePositiveInteger,
  daysInMonth: internal.requirePositiveInteger,
  daysInYear: internal.requirePositiveInteger,
  inLeapYear: internal.requireBoolean,
  monthsInYear: internal.requirePositiveInteger
}, monthOnlyRefiners = {
  monthCode: internal.requireString
}, dayOnlyRefiners = {
  day: internal.requirePositiveInteger
}, dateOnlyRefiners = {
  dayOfWeek: internal.requirePositiveInteger,
  dayOfYear: internal.requirePositiveInteger,
  weekOfYear: internal.requirePositiveIntegerOrUndefined,
  yearOfWeek: internal.requireIntegerOrUndefined,
  daysInWeek: internal.requirePositiveInteger
}, dateGetters = createCalendarGetters({
  ...yearMonthOnlyRefiners,
  ...monthOnlyRefiners,
  ...dayOnlyRefiners,
  ...dateOnlyRefiners
}), yearMonthGetters = createCalendarGetters({
  ...yearMonthOnlyRefiners,
  ...monthOnlyRefiners
}), monthDayGetters = createCalendarGetters({
  ...monthOnlyRefiners,
  ...dayOnlyRefiners
}), calendarIdGetters = {
  calendarId: slots => slots.calendar
}, durationGetters = internal.mapPropNames((propName => slots => slots[propName]), internal.durationFieldNamesAsc.concat("sign")), timeGetters = internal.mapPropNames(((_name, i) => slots => slots[internal.isoTimeFieldNamesAsc[i]]), internal.timeFieldNamesAsc), epochGetters = {
  epochMilliseconds: internal.getEpochMilli,
  epochNanoseconds: internal.getEpochNano
}, [Duration, createDuration, getDurationSlots] = createSlotClass(internal.DurationBranding, internal.constructDurationSlots, {
  ...durationGetters,
  blank: internal.getDurationBlank
}, {
  with: (slots, mod) => createDuration(internal.durationWithFields(slots, mod)),
  negated: slots => createDuration(internal.negateDuration(slots)),
  abs: slots => createDuration(internal.absDuration(slots)),
  add: (slots, otherArg, options) => createDuration(internal.addDurations(refinePublicRelativeTo, internal.createNativeStandardOps, internal.queryNativeTimeZone, 0, slots, toDurationSlots(otherArg), options)),
  subtract: (slots, otherArg, options) => createDuration(internal.addDurations(refinePublicRelativeTo, internal.createNativeStandardOps, internal.queryNativeTimeZone, 1, slots, toDurationSlots(otherArg), options)),
  round: (slots, options) => createDuration(internal.roundDuration(refinePublicRelativeTo, internal.createNativeStandardOps, internal.queryNativeTimeZone, slots, options)),
  total: (slots, options) => internal.totalDuration(refinePublicRelativeTo, internal.createNativeStandardOps, internal.queryNativeTimeZone, slots, options),
  toLocaleString(slots, locales, options) {
    return Intl.DurationFormat ? new Intl.DurationFormat(locales, options).format(this) : internal.formatDurationIso(slots);
  },
  toString: internal.formatDurationIso,
  toJSON: slots => internal.formatDurationIso(slots),
  valueOf: neverValueOf
}, {
  from: arg => createDuration(toDurationSlots(arg)),
  compare: (durationArg0, durationArg1, options) => internal.compareDurations(refinePublicRelativeTo, internal.createNativeStandardOps, internal.queryNativeTimeZone, toDurationSlots(durationArg0), toDurationSlots(durationArg1), options)
}, internal.formatDurationIso), classFormatConfigs = {
  Instant: internal.instantConfig,
  PlainDateTime: internal.dateTimeConfig,
  PlainDate: internal.dateConfig,
  PlainTime: internal.timeConfig,
  PlainYearMonth: internal.yearMonthConfig,
  PlainMonthDay: internal.monthDayConfig
}, prepInstantFormat = internal.createFormatPrepper(internal.instantConfig), prepZonedDateTimeFormat = internal.createFormatPrepper(internal.zonedConfig), prepPlainDateTimeFormat = internal.createFormatPrepper(internal.dateTimeConfig), prepPlainDateFormat = internal.createFormatPrepper(internal.dateConfig), prepPlainTimeFormat = internal.createFormatPrepper(internal.timeConfig), prepPlainYearMonthFormat = internal.createFormatPrepper(internal.yearMonthConfig), prepPlainMonthDayFormat = internal.createFormatPrepper(internal.monthDayConfig), [PlainTime, createPlainTime] = createSlotClass(internal.PlainTimeBranding, internal.constructPlainTimeSlots, timeGetters, {
  with(_slots, mod, options) {
    return createPlainTime(internal.plainTimeWithFields(this, rejectInvalidBag(mod), options));
  },
  add: (slots, durationArg) => createPlainTime(internal.movePlainTime(0, slots, toDurationSlots(durationArg))),
  subtract: (slots, durationArg) => createPlainTime(internal.movePlainTime(1, slots, toDurationSlots(durationArg))),
  until: (slots, otherArg, options) => createDuration(internal.diffPlainTimes(0, slots, toPlainTimeSlots(otherArg), options)),
  since: (slots, otherArg, options) => createDuration(internal.diffPlainTimes(1, slots, toPlainTimeSlots(otherArg), options)),
  round: (slots, options) => createPlainTime(internal.roundPlainTime(slots, options)),
  equals: (slots, other) => internal.plainTimesEqual(slots, toPlainTimeSlots(other)),
  toLocaleString(slots, locales, options) {
    const [format, epochMilli] = prepPlainTimeFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: internal.formatPlainTimeIso,
  toJSON: slots => internal.formatPlainTimeIso(slots),
  valueOf: neverValueOf
}, {
  from: (arg, options) => createPlainTime(toPlainTimeSlots(arg, options)),
  compare: (arg0, arg1) => internal.compareIsoTimeFields(toPlainTimeSlots(arg0), toPlainTimeSlots(arg1))
}, internal.formatPlainTimeIso), [PlainDateTime, createPlainDateTime] = createSlotClass(internal.PlainDateTimeBranding, internal.bindArgs(internal.constructPlainDateTimeSlots, internal.refineCalendarId), {
  ...calendarIdGetters,
  ...dateGetters,
  ...timeGetters
}, {
  with: (slots, mod, options) => createPlainDateTime(internal.plainDateTimeWithFields(internal.createNativeStandardOps, slots, rejectInvalidBag(mod), options)),
  withCalendar: (slots, calendarArg) => createPlainDateTime(internal.slotsWithCalendarId(slots, refineCalendarArg(calendarArg))),
  withPlainTime: (slots, plainTimeArg) => createPlainDateTime(internal.plainDateTimeWithPlainTime(slots, optionalToPlainTimeFields(plainTimeArg))),
  add: (slots, durationArg, options) => createPlainDateTime(internal.movePlainDateTime(internal.createNativeStandardOps, 0, slots, toDurationSlots(durationArg), options)),
  subtract: (slots, durationArg, options) => createPlainDateTime(internal.movePlainDateTime(internal.createNativeStandardOps, 1, slots, toDurationSlots(durationArg), options)),
  until: (slots, otherArg, options) => createDuration(internal.diffPlainDateTimes(internal.createNativeStandardOps, 0, slots, toPlainDateTimeSlots(otherArg), options)),
  since: (slots, otherArg, options) => createDuration(internal.diffPlainDateTimes(internal.createNativeStandardOps, 1, slots, toPlainDateTimeSlots(otherArg), options)),
  round: (slots, options) => createPlainDateTime(internal.roundPlainDateTime(slots, options)),
  equals: (slots, otherArg) => internal.plainDateTimesEqual(slots, toPlainDateTimeSlots(otherArg)),
  toZonedDateTime: (slots, timeZoneArg, options) => createZonedDateTime(internal.plainDateTimeToZonedDateTime(internal.queryNativeTimeZone, slots, refineTimeZoneArg(timeZoneArg), options)),
  toPlainDate: slots => createPlainDate(internal.createPlainDateSlots(slots)),
  toPlainTime: slots => createPlainTime(internal.createPlainTimeSlots(slots)),
  toLocaleString(slots, locales, options) {
    const [format, epochMilli] = prepPlainDateTimeFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: internal.formatPlainDateTimeIso,
  toJSON: slots => internal.formatPlainDateTimeIso(slots),
  valueOf: neverValueOf
}, {
  from: (arg, options) => createPlainDateTime(toPlainDateTimeSlots(arg, options)),
  compare: (arg0, arg1) => internal.compareIsoDateTimeFields(toPlainDateTimeSlots(arg0), toPlainDateTimeSlots(arg1))
}, internal.formatPlainDateTimeIso), [PlainMonthDay, createPlainMonthDay, getPlainMonthDaySlots] = createSlotClass(internal.PlainMonthDayBranding, internal.bindArgs(internal.constructPlainMonthDaySlots, internal.refineCalendarId), {
  ...calendarIdGetters,
  ...monthDayGetters
}, {
  with: (slots, mod, options) => createPlainMonthDay(internal.plainMonthDayWithFields(internal.createNativeStandardOps, slots, rejectInvalidBag(mod), options)),
  equals: (slots, otherArg) => internal.plainMonthDaysEqual(slots, toPlainMonthDaySlots(otherArg)),
  toPlainDate(slots, bag) {
    return createPlainDate(internal.plainMonthDayToPlainDate(internal.createNativeStandardOps, slots, this, bag));
  },
  toLocaleString(slots, locales, options) {
    const [format, epochMilli] = prepPlainMonthDayFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: internal.formatPlainMonthDayIso,
  toJSON: slots => internal.formatPlainMonthDayIso(slots),
  valueOf: neverValueOf
}, {
  from: (arg, options) => createPlainMonthDay(toPlainMonthDaySlots(arg, options))
}, internal.formatPlainMonthDayIso), [PlainYearMonth, createPlainYearMonth, getPlainYearMonthSlots] = createSlotClass(internal.PlainYearMonthBranding, internal.bindArgs(internal.constructPlainYearMonthSlots, internal.refineCalendarId), {
  ...calendarIdGetters,
  ...yearMonthGetters
}, {
  with: (slots, mod, options) => createPlainYearMonth(internal.plainYearMonthWithFields(internal.createNativeStandardOps, slots, rejectInvalidBag(mod), options)),
  add: (slots, durationArg, options) => createPlainYearMonth(internal.movePlainYearMonth(internal.createNativeStandardOps, 0, slots, toDurationSlots(durationArg), options)),
  subtract: (slots, durationArg, options) => createPlainYearMonth(internal.movePlainYearMonth(internal.createNativeStandardOps, 1, slots, toDurationSlots(durationArg), options)),
  until: (slots, otherArg, options) => createDuration(internal.diffPlainYearMonth(internal.createNativeStandardOps, 0, slots, toPlainYearMonthSlots(otherArg), options)),
  since: (slots, otherArg, options) => createDuration(internal.diffPlainYearMonth(internal.createNativeStandardOps, 1, slots, toPlainYearMonthSlots(otherArg), options)),
  equals: (slots, otherArg) => internal.plainYearMonthsEqual(slots, toPlainYearMonthSlots(otherArg)),
  toPlainDate(slots, bag) {
    return createPlainDate(internal.plainYearMonthToPlainDate(internal.createNativeStandardOps, slots, this, bag));
  },
  toLocaleString(slots, locales, options) {
    const [format, epochMilli] = prepPlainYearMonthFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: internal.formatPlainYearMonthIso,
  toJSON: slots => internal.formatPlainYearMonthIso(slots),
  valueOf: neverValueOf
}, {
  from: (arg, options) => createPlainYearMonth(toPlainYearMonthSlots(arg, options)),
  compare: (arg0, arg1) => internal.compareIsoDateFields(toPlainYearMonthSlots(arg0), toPlainYearMonthSlots(arg1))
}, internal.formatPlainYearMonthIso), [PlainDate, createPlainDate, getPlainDateSlots] = createSlotClass(internal.PlainDateBranding, internal.bindArgs(internal.constructPlainDateSlots, internal.refineCalendarId), {
  ...calendarIdGetters,
  ...dateGetters
}, {
  with: (slots, mod, options) => createPlainDate(internal.plainDateWithFields(internal.createNativeStandardOps, slots, rejectInvalidBag(mod), options)),
  withCalendar: (slots, calendarArg) => createPlainDate(internal.slotsWithCalendarId(slots, refineCalendarArg(calendarArg))),
  add: (slots, durationArg, options) => createPlainDate(internal.movePlainDate(internal.createNativeStandardOps, 0, slots, toDurationSlots(durationArg), options)),
  subtract: (slots, durationArg, options) => createPlainDate(internal.movePlainDate(internal.createNativeStandardOps, 1, slots, toDurationSlots(durationArg), options)),
  until: (slots, otherArg, options) => createDuration(internal.diffPlainDates(internal.createNativeStandardOps, 0, slots, toPlainDateSlots(otherArg), options)),
  since: (slots, otherArg, options) => createDuration(internal.diffPlainDates(internal.createNativeStandardOps, 1, slots, toPlainDateSlots(otherArg), options)),
  equals: (slots, otherArg) => internal.plainDatesEqual(slots, toPlainDateSlots(otherArg)),
  toZonedDateTime(slots, options) {
    const optionsObj = internal.isObjectLike(options) ? options : {
      timeZone: options
    };
    return createZonedDateTime(internal.plainDateToZonedDateTime(refineTimeZoneArg, toPlainTimeSlots, internal.queryNativeTimeZone, slots, optionsObj));
  },
  toPlainDateTime: (slots, plainTimeArg) => createPlainDateTime(internal.plainDateToPlainDateTime(slots, optionalToPlainTimeFields(plainTimeArg))),
  toPlainYearMonth(slots) {
    return createPlainYearMonth(internal.plainDateToPlainYearMonth(internal.createNativeStandardOps, slots, this));
  },
  toPlainMonthDay(slots) {
    return createPlainMonthDay(internal.plainDateToPlainMonthDay(internal.createNativeStandardOps, slots, this));
  },
  toLocaleString(slots, locales, options) {
    const [format, epochMilli] = prepPlainDateFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: internal.formatPlainDateIso,
  toJSON: slots => internal.formatPlainDateIso(slots),
  valueOf: neverValueOf
}, {
  from: (arg, options) => createPlainDate(toPlainDateSlots(arg, options)),
  compare: (arg0, arg1) => internal.compareIsoDateFields(toPlainDateSlots(arg0), toPlainDateSlots(arg1))
}, internal.formatPlainDateIso), [ZonedDateTime, createZonedDateTime] = createSlotClass(internal.ZonedDateTimeBranding, internal.bindArgs(internal.constructZonedDateTimeSlots, internal.refineCalendarId, internal.refineTimeZoneId), {
  ...epochGetters,
  ...calendarIdGetters,
  ...adaptDateMethods(dateGetters),
  ...adaptDateMethods(timeGetters),
  offset: slots => internal.formatOffsetNano(slotsToIso(slots).offsetNanoseconds),
  offsetNanoseconds: slots => slotsToIso(slots).offsetNanoseconds,
  timeZoneId: slots => slots.timeZone,
  hoursInDay: slots => internal.computeZonedHoursInDay(internal.queryNativeTimeZone, slots)
}, {
  with: (slots, mod, options) => createZonedDateTime(internal.zonedDateTimeWithFields(internal.createNativeStandardOps, internal.queryNativeTimeZone, slots, rejectInvalidBag(mod), options)),
  withCalendar: (slots, calendarArg) => createZonedDateTime(internal.slotsWithCalendarId(slots, refineCalendarArg(calendarArg))),
  withTimeZone: (slots, timeZoneArg) => createZonedDateTime(internal.slotsWithTimeZoneId(slots, refineTimeZoneArg(timeZoneArg))),
  withPlainTime: (slots, plainTimeArg) => createZonedDateTime(internal.zonedDateTimeWithPlainTime(internal.queryNativeTimeZone, slots, optionalToPlainTimeFields(plainTimeArg))),
  add: (slots, durationArg, options) => createZonedDateTime(internal.moveZonedDateTime(internal.createNativeStandardOps, internal.queryNativeTimeZone, 0, slots, toDurationSlots(durationArg), options)),
  subtract: (slots, durationArg, options) => createZonedDateTime(internal.moveZonedDateTime(internal.createNativeStandardOps, internal.queryNativeTimeZone, 1, slots, toDurationSlots(durationArg), options)),
  until: (slots, otherArg, options) => createDuration(internal.createDurationSlots(internal.diffZonedDateTimes(internal.createNativeStandardOps, internal.queryNativeTimeZone, 0, slots, toZonedDateTimeSlots(otherArg), options))),
  since: (slots, otherArg, options) => createDuration(internal.createDurationSlots(internal.diffZonedDateTimes(internal.createNativeStandardOps, internal.queryNativeTimeZone, 1, slots, toZonedDateTimeSlots(otherArg), options))),
  round: (slots, options) => createZonedDateTime(internal.roundZonedDateTime(internal.queryNativeTimeZone, slots, options)),
  startOfDay: slots => createZonedDateTime(internal.computeZonedStartOfDay(internal.queryNativeTimeZone, slots)),
  equals: (slots, otherArg) => internal.zonedDateTimesEqual(slots, toZonedDateTimeSlots(otherArg)),
  toInstant: slots => createInstant(internal.zonedDateTimeToInstant(slots)),
  toPlainDateTime: slots => createPlainDateTime(internal.zonedDateTimeToPlainDateTime(internal.queryNativeTimeZone, slots)),
  toPlainDate: slots => createPlainDate(internal.zonedDateTimeToPlainDate(internal.queryNativeTimeZone, slots)),
  toPlainTime: slots => createPlainTime(internal.zonedDateTimeToPlainTime(internal.queryNativeTimeZone, slots)),
  toLocaleString(slots, locales, options = {}) {
    const [format, epochMilli] = prepZonedDateTimeFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: (slots, options) => internal.formatZonedDateTimeIso(internal.queryNativeTimeZone, slots, options),
  toJSON: slots => internal.formatZonedDateTimeIso(internal.queryNativeTimeZone, slots),
  valueOf: neverValueOf,
  getTimeZoneTransition(slots, options) {
    const {timeZone: timeZoneId, epochNanoseconds: epochNano} = slots, direction = internal.refineDirectionOptions(options), newEpochNano = internal.queryNativeTimeZone(timeZoneId).getTransition(epochNano, direction);
    return newEpochNano ? createZonedDateTime({
      ...slots,
      epochNanoseconds: newEpochNano
    }) : null;
  }
}, {
  from: (arg, options) => createZonedDateTime(toZonedDateTimeSlots(arg, options)),
  compare: (arg0, arg1) => internal.compareZonedDateTimes(toZonedDateTimeSlots(arg0), toZonedDateTimeSlots(arg1))
}, (slots => internal.formatZonedDateTimeIso(internal.queryNativeTimeZone, slots))), [Instant, createInstant, getInstantSlots] = createSlotClass(internal.InstantBranding, internal.constructInstantSlots, epochGetters, {
  add: (slots, durationArg) => createInstant(internal.moveInstant(0, slots, toDurationSlots(durationArg))),
  subtract: (slots, durationArg) => createInstant(internal.moveInstant(1, slots, toDurationSlots(durationArg))),
  until: (slots, otherArg, options) => createDuration(internal.diffInstants(0, slots, toInstantSlots(otherArg), options)),
  since: (slots, otherArg, options) => createDuration(internal.diffInstants(1, slots, toInstantSlots(otherArg), options)),
  round: (slots, options) => createInstant(internal.roundInstant(slots, options)),
  equals: (slots, otherArg) => internal.instantsEqual(slots, toInstantSlots(otherArg)),
  toZonedDateTimeISO: (slots, timeZoneArg) => createZonedDateTime(internal.instantToZonedDateTime(slots, refineTimeZoneArg(timeZoneArg))),
  toLocaleString(slots, locales, options) {
    const [format, epochMilli] = prepInstantFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: (slots, options) => internal.formatInstantIso(refineTimeZoneArg, internal.queryNativeTimeZone, slots, options),
  toJSON: slots => internal.formatInstantIso(refineTimeZoneArg, internal.queryNativeTimeZone, slots),
  valueOf: neverValueOf
}, {
  from: arg => createInstant(toInstantSlots(arg)),
  fromEpochMilliseconds: epochMilli => createInstant(internal.epochMilliToInstant(epochMilli)),
  fromEpochNanoseconds: epochNano => createInstant(internal.epochNanoToInstant(epochNano)),
  compare: (a, b) => internal.compareInstants(toInstantSlots(a), toInstantSlots(b))
}, (slots => internal.formatInstantIso(refineTimeZoneArg, internal.queryNativeTimeZone, slots))), Now = Object.defineProperties({}, {
  ...internal.createStringTagDescriptors("Temporal.Now"),
  ...internal.createPropDescriptors({
    timeZoneId: () => internal.getCurrentTimeZoneId(),
    instant: () => createInstant(internal.createInstantSlots(internal.getCurrentEpochNano())),
    zonedDateTimeISO: (timeZoneArg = internal.getCurrentTimeZoneId()) => createZonedDateTime(internal.createZonedDateTimeSlots(internal.getCurrentEpochNano(), refineTimeZoneArg(timeZoneArg), internal.isoCalendarId)),
    plainDateTimeISO: (timeZoneArg = internal.getCurrentTimeZoneId()) => createPlainDateTime(internal.createPlainDateTimeSlots(internal.getCurrentIsoDateTime(internal.queryNativeTimeZone(refineTimeZoneArg(timeZoneArg))), internal.isoCalendarId)),
    plainDateISO: (timeZoneArg = internal.getCurrentTimeZoneId()) => createPlainDate(internal.createPlainDateSlots(internal.getCurrentIsoDateTime(internal.queryNativeTimeZone(refineTimeZoneArg(timeZoneArg))), internal.isoCalendarId)),
    plainTimeISO: (timeZoneArg = internal.getCurrentTimeZoneId()) => createPlainTime(internal.createPlainTimeSlots(internal.getCurrentIsoDateTime(internal.queryNativeTimeZone(refineTimeZoneArg(timeZoneArg)))))
  })
}), Temporal = Object.defineProperties({}, {
  ...internal.createStringTagDescriptors("Temporal"),
  ...internal.createPropDescriptors({
    PlainYearMonth: PlainYearMonth,
    PlainMonthDay: PlainMonthDay,
    PlainDate: PlainDate,
    PlainTime: PlainTime,
    PlainDateTime: PlainDateTime,
    ZonedDateTime: ZonedDateTime,
    Instant: Instant,
    Duration: Duration,
    Now: Now
  })
}), DateTimeFormat = function() {
  function DateTimeFormatFunc(locales, options) {
    return new DateTimeFormatNew(locales, options);
  }
  function DateTimeFormatNew(locales, options = Object.create(null)) {
    internalsMap.set(this, ((locales, options) => {
      const rawFormat = new internal.RawDateTimeFormat(locales, options), resolveOptions = rawFormat.resolvedOptions(), resolvedLocale = resolveOptions.locale, copiedOptions = internal.pluckProps(Object.keys(options), resolveOptions), queryFormatPrepperForBranding = internal.memoize(createFormatPrepperForBranding), prepFormat = (isRange, ...formattables) => {
        if (isRange) {
          if (2 !== formattables.length) {
            throw new TypeError(internal.mismatchingFormatTypes);
          }
          for (const formattable of formattables) {
            if (void 0 === formattable) {
              throw new TypeError(internal.mismatchingFormatTypes);
            }
          }
        }
        isRange || void 0 !== formattables[0] || (formattables = []);
        const formattableEssences = formattables.map((formattable => getSlots(formattable) || Number(formattable)));
        let overallBranding, i = 0;
        for (const formattableEssence of formattableEssences) {
          const slotsBranding = "object" == typeof formattableEssence ? formattableEssence.branding : void 0;
          if (i++ && slotsBranding !== overallBranding) {
            throw new TypeError(internal.mismatchingFormatTypes);
          }
          overallBranding = slotsBranding;
        }
        return overallBranding ? queryFormatPrepperForBranding(overallBranding)(resolvedLocale, copiedOptions, ...formattableEssences) : [ rawFormat, ...formattableEssences ];
      };
      return prepFormat.rawFormat = rawFormat, prepFormat;
    })(locales, options));
  }
  const members = internal.RawDateTimeFormat.prototype, memberDescriptors = Object.getOwnPropertyDescriptors(members), classDescriptors = Object.getOwnPropertyDescriptors(internal.RawDateTimeFormat);
  for (const memberName in memberDescriptors) {
    const memberDescriptor = memberDescriptors[memberName], formatLikeMethod = memberName.startsWith("format") && createFormatMethod(memberName);
    "function" == typeof memberDescriptor.value ? memberDescriptor.value = "constructor" === memberName ? DateTimeFormatFunc : formatLikeMethod || createProxiedMethod(memberName) : formatLikeMethod && (memberDescriptor.get = function() {
      if (!internalsMap.has(this)) {
        throw new TypeError(internal.invalidCallingContext);
      }
      return (...args) => formatLikeMethod.apply(this, args);
    }, Object.defineProperties(memberDescriptor.get, internal.createNameDescriptors(`get ${memberName}`)));
  }
  return classDescriptors.prototype.value = DateTimeFormatNew.prototype = Object.create({}, memberDescriptors), 
  Object.defineProperties(DateTimeFormatFunc, classDescriptors), DateTimeFormatFunc;
}(), internalsMap = new WeakMap, IntlExtended = Object.defineProperties(Object.create(Intl), internal.createPropDescriptors({
  DateTimeFormat: DateTimeFormat
}));

exports.DateTimeFormat = DateTimeFormat, exports.IntlExtended = IntlExtended, exports.Temporal = Temporal, 
exports.toTemporalInstant = function() {
  const epochMilli = Date.prototype.valueOf.call(this);
  return createInstant(internal.createInstantSlots(internal.numberToBigNano(internal.requireNumberIsInteger(epochMilli), internal.nanoInMilli)));
};


/***/ }),

/***/ 99:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function clampProp(props, propName, min, max, overflow) {
  return clampEntity(propName, ((props, propName) => {
    const propVal = props[propName];
    if (void 0 === propVal) {
      throw new TypeError(missingField(propName));
    }
    return propVal;
  })(props, propName), min, max, overflow);
}

function clampEntity(entityName, num, min, max, overflow, choices) {
  const clamped = clampNumber(num, min, max);
  if (overflow && num !== clamped) {
    throw new RangeError(numberOutOfRange(entityName, num, min, max, choices));
  }
  return clamped;
}

function isObjectLike(arg) {
  return null !== arg && /object|function/.test(typeof arg);
}

function memoize(generator, MapClass = Map) {
  const map = new MapClass;
  return (key, ...otherArgs) => {
    if (map.has(key)) {
      return map.get(key);
    }
    const val = generator(key, ...otherArgs);
    return map.set(key, val), val;
  };
}

function createPropDescriptors(propVals, readonly) {
  return mapProps((value => ({
    value: value,
    configurable: 1,
    writable: !readonly
  })), propVals);
}

function zipProps(propNamesRev, args) {
  const res = {};
  let i = propNamesRev.length;
  for (const arg of args) {
    res[propNamesRev[--i]] = arg;
  }
  return res;
}

function mapProps(transformer, props, extraArg) {
  const res = {};
  for (const propName in props) {
    res[propName] = transformer(props[propName], propName, extraArg);
  }
  return res;
}

function mapPropNames(generator, propNames, extraArg) {
  const props = {};
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    props[propName] = generator(propName, i, extraArg);
  }
  return props;
}

function remapProps(oldNames, newNames, oldProps) {
  const newProps = {};
  for (let i = 0; i < oldNames.length; i++) {
    newProps[newNames[i]] = oldProps[oldNames[i]];
  }
  return newProps;
}

function pluckProps(propNames, props) {
  const res = Object.create(null);
  for (const propName of propNames) {
    res[propName] = props[propName];
  }
  return res;
}

function hasAnyPropsByName(props, names) {
  for (const name of names) {
    if (name in props) {
      return 1;
    }
  }
  return 0;
}

function allPropsEqual(propNames, props0, props1) {
  for (const propName of propNames) {
    if (props0[propName] !== props1[propName]) {
      return 0;
    }
  }
  return 1;
}

function zeroOutProps(propNames, clearUntilI, props) {
  const copy = {
    ...props
  };
  for (let i = 0; i < clearUntilI; i++) {
    copy[propNames[i]] = 0;
  }
  return copy;
}

function bindArgs(f, ...boundArgs) {
  return (...dynamicArgs) => f(...boundArgs, ...dynamicArgs);
}

function noop() {}

function capitalize(s) {
  return s[0].toUpperCase() + s.substring(1);
}

function sortStrings(strs) {
  return strs.slice().sort();
}

function padNumber(digits, num) {
  return String(num).padStart(digits, "0");
}

function compareNumbers(a, b) {
  return Math.sign(a - b);
}

function clampNumber(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function divModFloor(num, divisor) {
  return [ Math.floor(num / divisor), modFloor(num, divisor) ];
}

function modFloor(num, divisor) {
  return (num % divisor + divisor) % divisor;
}

function divModTrunc(num, divisor) {
  return [ divTrunc(num, divisor), modTrunc(num, divisor) ];
}

function divTrunc(num, divisor) {
  return Math.trunc(num / divisor) || 0;
}

function modTrunc(num, divisor) {
  return num % divisor || 0;
}

function hasHalf(num) {
  return .5 === Math.abs(num % 1);
}

function givenFieldsToBigNano(fields, largestUnit, fieldNames) {
  let timeNano = 0, days = 0;
  for (let unit = 0; unit <= largestUnit; unit++) {
    const fieldVal = fields[fieldNames[unit]], unitNano = unitNanoMap[unit], unitInDay = nanoInUtcDay / unitNano, [unitDays, leftoverUnits] = divModTrunc(fieldVal, unitInDay);
    timeNano += leftoverUnits * unitNano, days += unitDays;
  }
  const [timeDays, leftoverNano] = divModTrunc(timeNano, nanoInUtcDay);
  return [ days + timeDays, leftoverNano ];
}

function nanoToGivenFields(nano, largestUnit, fieldNames) {
  const fields = {};
  for (let unit = largestUnit; unit >= 0; unit--) {
    const divisor = unitNanoMap[unit];
    fields[fieldNames[unit]] = divTrunc(nano, divisor), nano = modTrunc(nano, divisor);
  }
  return fields;
}

function requirePositiveInteger(arg) {
  return requireNumberIsPositive(requireInteger(arg));
}

function requireInteger(arg) {
  return requireNumberIsInteger(requireNumber(arg));
}

function requirePropDefined(optionName, optionVal) {
  if (null == optionVal) {
    throw new RangeError(missingField(optionName));
  }
  return optionVal;
}

function requireObjectLike(arg) {
  if (!isObjectLike(arg)) {
    throw new TypeError(invalidObject);
  }
  return arg;
}

function requireType(typeName, arg, entityName = typeName) {
  if (typeof arg !== typeName) {
    throw new TypeError(invalidEntity(entityName, arg));
  }
  return arg;
}

function requireNumberIsInteger(num, entityName = "number") {
  if (!Number.isInteger(num)) {
    throw new RangeError(expectedInteger(entityName, num));
  }
  return num || 0;
}

function requireNumberIsPositive(num, entityName = "number") {
  if (num <= 0) {
    throw new RangeError(expectedPositive(entityName, num));
  }
  return num;
}

function toString(arg) {
  if ("symbol" == typeof arg) {
    throw new TypeError(forbiddenSymbolToString);
  }
  return String(arg);
}

function toStringViaPrimitive(arg, entityName) {
  return isObjectLike(arg) ? String(arg) : requireString(arg, entityName);
}

function toBigInt(bi) {
  if ("string" == typeof bi) {
    return BigInt(bi);
  }
  if ("bigint" != typeof bi) {
    throw new TypeError(invalidBigInt(bi));
  }
  return bi;
}

function toNumber(arg, entityName = "number") {
  if ("bigint" == typeof arg) {
    throw new TypeError(forbiddenBigIntToNumber(entityName));
  }
  if (arg = Number(arg), !Number.isFinite(arg)) {
    throw new RangeError(expectedFinite(entityName, arg));
  }
  return arg;
}

function toInteger(arg, entityName) {
  return Math.trunc(toNumber(arg, entityName)) || 0;
}

function toStrictInteger(arg, entityName) {
  return requireNumberIsInteger(toNumber(arg, entityName), entityName);
}

function toPositiveInteger(arg, entityName) {
  return requireNumberIsPositive(toInteger(arg, entityName), entityName);
}

function createBigNano(days, timeNano) {
  let [extraDays, newTimeNano] = divModTrunc(timeNano, nanoInUtcDay), newDays = days + extraDays;
  const newDaysSign = Math.sign(newDays);
  return newDaysSign && newDaysSign === -Math.sign(newTimeNano) && (newDays -= newDaysSign, 
  newTimeNano += newDaysSign * nanoInUtcDay), [ newDays, newTimeNano ];
}

function addBigNanos(a, b, sign = 1) {
  return createBigNano(a[0] + b[0] * sign, a[1] + b[1] * sign);
}

function moveBigNano(a, b) {
  return createBigNano(a[0], a[1] + b);
}

function diffBigNanos(a, b) {
  return addBigNanos(b, a, -1);
}

function compareBigNanos(a, b) {
  return compareNumbers(a[0], b[0]) || compareNumbers(a[1], b[1]);
}

function bigNanoOutside(subject, rangeStart, rangeEndExcl) {
  return -1 === compareBigNanos(subject, rangeStart) || 1 === compareBigNanos(subject, rangeEndExcl);
}

function bigIntToBigNano(num, multiplierNano = 1) {
  const wholeInDay = BigInt(nanoInUtcDay / multiplierNano);
  return [ Number(num / wholeInDay), Number(num % wholeInDay) * multiplierNano ];
}

function numberToBigNano(num, multiplierNano = 1) {
  const wholeInDay = nanoInUtcDay / multiplierNano, [days, remainder] = divModTrunc(num, wholeInDay);
  return [ days, remainder * multiplierNano ];
}

function bigNanoToBigInt(bigNano, divisorNano = 1) {
  const [days, timeNano] = bigNano, whole = Math.floor(timeNano / divisorNano), wholeInDay = nanoInUtcDay / divisorNano;
  return BigInt(days) * BigInt(wholeInDay) + BigInt(whole);
}

function bigNanoToNumber(bigNano, divisorNano = 1, exact) {
  const [days, timeNano] = bigNano, [whole, remainderNano] = divModTrunc(timeNano, divisorNano);
  return days * (nanoInUtcDay / divisorNano) + (whole + (exact ? remainderNano / divisorNano : 0));
}

function bigNanoToExactDays(bigNano) {
  return bigNano[0] + bigNano[1] / nanoInUtcDay;
}

function divModBigNano(bigNano, divisorNano, divModFunc = divModFloor) {
  const [days, timeNano] = bigNano, [whole, remainderNano] = divModFunc(timeNano, divisorNano);
  return [ days * (nanoInUtcDay / divisorNano) + whole, remainderNano ];
}

function checkIsoYearMonthInBounds(isoFields) {
  return clampProp(isoFields, "isoYear", isoYearMin, isoYearMax, 1), isoFields.isoYear === isoYearMin ? clampProp(isoFields, "isoMonth", 4, 12, 1) : isoFields.isoYear === isoYearMax && clampProp(isoFields, "isoMonth", 1, 9, 1), 
  isoFields;
}

function checkIsoDateInBounds(isoFields) {
  return checkIsoDateTimeInBounds({
    ...isoFields,
    ...isoTimeFieldDefaults,
    isoHour: 12
  }), isoFields;
}

function checkIsoDateTimeInBounds(isoFields) {
  const isoYear = clampProp(isoFields, "isoYear", isoYearMin, isoYearMax, 1), nudge = isoYear === isoYearMin ? 1 : isoYear === isoYearMax ? -1 : 0;
  return nudge && checkEpochNanoInBounds(isoToEpochNano({
    ...isoFields,
    isoDay: isoFields.isoDay + nudge,
    isoNanosecond: isoFields.isoNanosecond - nudge
  })), isoFields;
}

function checkEpochNanoInBounds(epochNano) {
  if (!epochNano || bigNanoOutside(epochNano, epochNanoMin, epochNanoMax)) {
    throw new RangeError(outOfBoundsDate);
  }
  return epochNano;
}

function isoTimeFieldsToNano(isoTimeFields) {
  return givenFieldsToBigNano(isoTimeFields, 5, isoTimeFieldNamesAsc)[1];
}

function nanoToIsoTimeAndDay(nano) {
  const [dayDelta, timeNano] = divModFloor(nano, nanoInUtcDay);
  return [ nanoToGivenFields(timeNano, 5, isoTimeFieldNamesAsc), dayDelta ];
}

function epochNanoToSec(epochNano) {
  return epochNanoToSecMod(epochNano)[0];
}

function epochNanoToSecMod(epochNano) {
  return divModBigNano(epochNano, nanoInSec);
}

function isoToEpochMilli(isoDateTimeFields) {
  return isoArgsToEpochMilli(isoDateTimeFields.isoYear, isoDateTimeFields.isoMonth, isoDateTimeFields.isoDay, isoDateTimeFields.isoHour, isoDateTimeFields.isoMinute, isoDateTimeFields.isoSecond, isoDateTimeFields.isoMillisecond);
}

function isoToEpochNano(isoFields) {
  const epochMilli = isoToEpochMilli(isoFields);
  if (void 0 !== epochMilli) {
    const [days, milliRemainder] = divModTrunc(epochMilli, milliInDay);
    return [ days, milliRemainder * nanoInMilli + (isoFields.isoMicrosecond || 0) * nanoInMicro + (isoFields.isoNanosecond || 0) ];
  }
}

function isoToEpochNanoWithOffset(isoFields, offsetNano) {
  const [newIsoTimeFields, dayDelta] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(isoFields) - offsetNano);
  return checkEpochNanoInBounds(isoToEpochNano({
    ...isoFields,
    isoDay: isoFields.isoDay + dayDelta,
    ...newIsoTimeFields
  }));
}

function isoArgsToEpochSec(...args) {
  return isoArgsToEpochMilli(...args) / milliInSec;
}

function isoArgsToEpochMilli(...args) {
  const [legacyDate, daysNudged] = isoToLegacyDate(...args), epochMilli = legacyDate.valueOf();
  if (!isNaN(epochMilli)) {
    return epochMilli - daysNudged * milliInDay;
  }
}

function isoToLegacyDate(isoYear, isoMonth = 1, isoDay = 1, isoHour = 0, isoMinute = 0, isoSec = 0, isoMilli = 0) {
  const daysNudged = isoYear === isoYearMin ? 1 : isoYear === isoYearMax ? -1 : 0, legacyDate = new Date;
  return legacyDate.setUTCHours(isoHour, isoMinute, isoSec, isoMilli), legacyDate.setUTCFullYear(isoYear, isoMonth - 1, isoDay + daysNudged), 
  [ legacyDate, daysNudged ];
}

function epochNanoToIso(epochNano, offsetNano) {
  let [days, timeNano] = moveBigNano(epochNano, offsetNano);
  timeNano < 0 && (timeNano += nanoInUtcDay, days -= 1);
  const [timeMilli, nanoRemainder] = divModFloor(timeNano, nanoInMilli), [isoMicrosecond, isoNanosecond] = divModFloor(nanoRemainder, nanoInMicro);
  return epochMilliToIso(days * milliInDay + timeMilli, isoMicrosecond, isoNanosecond);
}

function epochMilliToIso(epochMilli, isoMicrosecond = 0, isoNanosecond = 0) {
  const daysOver = Math.ceil(Math.max(0, Math.abs(epochMilli) - maxMilli) / milliInDay) * Math.sign(epochMilli), legacyDate = new Date(epochMilli - daysOver * milliInDay);
  return zipProps(isoDateTimeFieldNamesAsc, [ legacyDate.getUTCFullYear(), legacyDate.getUTCMonth() + 1, legacyDate.getUTCDate() + daysOver, legacyDate.getUTCHours(), legacyDate.getUTCMinutes(), legacyDate.getUTCSeconds(), legacyDate.getUTCMilliseconds(), isoMicrosecond, isoNanosecond ]);
}

function hashIntlFormatParts(intlFormat, epochMilli) {
  if (epochMilli < -maxMilli) {
    throw new RangeError(outOfBoundsDate);
  }
  const parts = intlFormat.formatToParts(epochMilli), hash = {};
  for (const part of parts) {
    hash[part.type] = part.value;
  }
  return hash;
}

function computeIsoDay(isoFields) {
  return isoFields.isoDay;
}

function computeIsoDateParts(isoFields) {
  return [ isoFields.isoYear, isoFields.isoMonth, isoFields.isoDay ];
}

function computeIsoMonthCodeParts(_isoYear, isoMonth) {
  return [ isoMonth, 0 ];
}

function computeIsoYearMonthForMonthDay(monthCodeNumber, isLeapMonth) {
  if (!isLeapMonth) {
    return [ isoEpochFirstLeapYear, monthCodeNumber ];
  }
}

function computeIsoFieldsFromParts(year, month, day) {
  return {
    isoYear: year,
    isoMonth: month,
    isoDay: day
  };
}

function computeIsoDaysInWeek() {
  return 7;
}

function computeIsoMonthsInYear() {
  return isoMonthsInYear;
}

function computeIsoDaysInMonth(isoYear, isoMonth) {
  switch (isoMonth) {
   case 2:
    return computeIsoInLeapYear(isoYear) ? 29 : 28;

   case 4:
   case 6:
   case 9:
   case 11:
    return 30;
  }
  return 31;
}

function computeIsoDaysInYear(isoYear) {
  return computeIsoInLeapYear(isoYear) ? 366 : 365;
}

function computeIsoInLeapYear(isoYear) {
  return isoYear % 4 == 0 && (isoYear % 100 != 0 || isoYear % 400 == 0);
}

function computeIsoDayOfWeek(isoDateFields) {
  const [legacyDate, daysNudged] = isoToLegacyDate(isoDateFields.isoYear, isoDateFields.isoMonth, isoDateFields.isoDay);
  return modFloor(legacyDate.getUTCDay() - daysNudged, 7) || 7;
}

function computeIsoEraParts(isoFields) {
  return this.id === gregoryCalendarId ? (({isoYear: isoYear}) => isoYear < 1 ? [ "gregory-inverse", 1 - isoYear ] : [ "gregory", isoYear ])(isoFields) : "japanese" === this.id ? queryJapaneseEraParts(isoFields) : [];
}

function checkIsoDateTimeFields(isoDateTimeFields) {
  return checkIsoDateFields(isoDateTimeFields), constrainIsoTimeFields(isoDateTimeFields, 1), 
  isoDateTimeFields;
}

function checkIsoDateFields(isoInternals) {
  return constrainIsoDateFields(isoInternals, 1), isoInternals;
}

function isIsoDateFieldsValid(isoFields) {
  return allPropsEqual(isoDateFieldNamesAsc, isoFields, constrainIsoDateFields(isoFields));
}

function constrainIsoDateFields(isoFields, overflow) {
  const {isoYear: isoYear} = isoFields, isoMonth = clampProp(isoFields, "isoMonth", 1, computeIsoMonthsInYear(), overflow);
  return {
    isoYear: isoYear,
    isoMonth: isoMonth,
    isoDay: clampProp(isoFields, "isoDay", 1, computeIsoDaysInMonth(isoYear, isoMonth), overflow)
  };
}

function constrainIsoTimeFields(isoTimeFields, overflow) {
  return zipProps(isoTimeFieldNamesAsc, [ clampProp(isoTimeFields, "isoHour", 0, 23, overflow), clampProp(isoTimeFields, "isoMinute", 0, 59, overflow), clampProp(isoTimeFields, "isoSecond", 0, 59, overflow), clampProp(isoTimeFields, "isoMillisecond", 0, 999, overflow), clampProp(isoTimeFields, "isoMicrosecond", 0, 999, overflow), clampProp(isoTimeFields, "isoNanosecond", 0, 999, overflow) ]);
}

function refineOverflowOptions(options) {
  return void 0 === options ? 0 : refineOverflow(requireObjectLike(options));
}

function refineZonedFieldOptions(options, defaultOffsetDisambig = 0) {
  options = normalizeOptions(options);
  const epochDisambig = refineEpochDisambig(options), offsetDisambig = refineOffsetDisambig(options, defaultOffsetDisambig);
  return [ refineOverflow(options), offsetDisambig, epochDisambig ];
}

function refineDiffOptions(roundingModeInvert, options, defaultLargestUnit, maxUnit = 9, minUnit = 0, defaultRoundingMode = 4) {
  options = normalizeOptions(options);
  let largestUnit = refineLargestUnit(options, maxUnit, minUnit), roundingInc = parseRoundingIncInteger(options), roundingMode = refineRoundingMode(options, defaultRoundingMode);
  const smallestUnit = refineSmallestUnit(options, maxUnit, minUnit, 1);
  return null == largestUnit ? largestUnit = Math.max(defaultLargestUnit, smallestUnit) : checkLargestSmallestUnit(largestUnit, smallestUnit), 
  roundingInc = refineRoundingInc(roundingInc, smallestUnit, 1), roundingModeInvert && (roundingMode = (roundingMode => roundingMode < 4 ? (roundingMode + 2) % 4 : roundingMode)(roundingMode)), 
  [ largestUnit, smallestUnit, roundingInc, roundingMode ];
}

function refineRoundingOptions(options, maxUnit = 6, solarMode) {
  let roundingInc = parseRoundingIncInteger(options = normalizeOptionsOrString(options, smallestUnitStr));
  const roundingMode = refineRoundingMode(options, 7);
  let smallestUnit = refineSmallestUnit(options, maxUnit);
  return smallestUnit = requirePropDefined(smallestUnitStr, smallestUnit), roundingInc = refineRoundingInc(roundingInc, smallestUnit, void 0, solarMode), 
  [ smallestUnit, roundingInc, roundingMode ];
}

function refineRoundingMathOptions(smallestUnit, options, allowManyLargeUnits) {
  let roundingInc = parseRoundingIncInteger(options = normalizeOptionsOrString(options, roundingModeName));
  const roundingMode = refineRoundingMode(options, 7);
  return roundingInc = refineRoundingInc(roundingInc, smallestUnit, allowManyLargeUnits), 
  [ roundingInc, roundingMode ];
}

function refineDateDisplayOptions(options) {
  return refineCalendarDisplay(normalizeOptions(options));
}

function refineTimeDisplayOptions(options, maxSmallestUnit) {
  return refineTimeDisplayTuple(normalizeOptions(options), maxSmallestUnit);
}

function refineTimeDisplayTuple(options, maxSmallestUnit = 4) {
  const subsecDigits = refineSubsecDigits(options);
  return [ refineRoundingMode(options, 4), ...refineSmallestUnitAndSubsecDigits(refineSmallestUnit(options, maxSmallestUnit), subsecDigits) ];
}

function refineSmallestUnitAndSubsecDigits(smallestUnit, subsecDigits) {
  return null != smallestUnit ? [ unitNanoMap[smallestUnit], smallestUnit < 4 ? 9 - 3 * smallestUnit : -1 ] : [ void 0 === subsecDigits ? 1 : 10 ** (9 - subsecDigits), subsecDigits ];
}

function parseRoundingIncInteger(options) {
  const roundingInc = options[roundingIncName];
  return void 0 === roundingInc ? 1 : toInteger(roundingInc, roundingIncName);
}

function refineRoundingInc(roundingInc, smallestUnit, allowManyLargeUnits, solarMode) {
  const upUnitNano = solarMode ? nanoInUtcDay : unitNanoMap[smallestUnit + 1];
  if (upUnitNano) {
    const unitNano = unitNanoMap[smallestUnit];
    if (upUnitNano % ((roundingInc = clampEntity(roundingIncName, roundingInc, 1, upUnitNano / unitNano - (solarMode ? 0 : 1), 1)) * unitNano)) {
      throw new RangeError(invalidEntity(roundingIncName, roundingInc));
    }
  } else {
    roundingInc = clampEntity(roundingIncName, roundingInc, 1, allowManyLargeUnits ? 10 ** 9 : 1, 1);
  }
  return roundingInc;
}

function refineSubsecDigits(options) {
  let subsecDigits = options[subsecDigitsName];
  if (void 0 !== subsecDigits) {
    if ("number" != typeof subsecDigits) {
      if ("auto" === toString(subsecDigits)) {
        return;
      }
      throw new RangeError(invalidEntity(subsecDigitsName, subsecDigits));
    }
    subsecDigits = clampEntity(subsecDigitsName, Math.floor(subsecDigits), 0, 9, 1);
  }
  return subsecDigits;
}

function normalizeOptions(options) {
  return void 0 === options ? {} : requireObjectLike(options);
}

function normalizeOptionsOrString(options, optionName) {
  return "string" == typeof options ? {
    [optionName]: options
  } : requireObjectLike(options);
}

function fabricateOverflowOptions(overflow) {
  return {
    overflow: overflowMapNames[overflow]
  };
}

function refineUnitOption(optionName, options, maxUnit = 9, minUnit = 0, ensureDefined) {
  let unitStr = options[optionName];
  if (void 0 === unitStr) {
    return ensureDefined ? minUnit : void 0;
  }
  if (unitStr = toString(unitStr), "auto" === unitStr) {
    return ensureDefined ? minUnit : null;
  }
  let unit = unitNameMap[unitStr];
  if (void 0 === unit && (unit = durationFieldIndexes[unitStr]), void 0 === unit) {
    throw new RangeError(invalidChoice(optionName, unitStr, unitNameMap));
  }
  return clampEntity(optionName, unit, minUnit, maxUnit, 1, unitNamesAsc), unit;
}

function refineChoiceOption(optionName, enumNameMap, options, defaultChoice = 0) {
  const enumArg = options[optionName];
  if (void 0 === enumArg) {
    return defaultChoice;
  }
  const enumStr = toString(enumArg), enumNum = enumNameMap[enumStr];
  if (void 0 === enumNum) {
    throw new RangeError(invalidChoice(optionName, enumStr, enumNameMap));
  }
  return enumNum;
}

function checkLargestSmallestUnit(largestUnit, smallestUnit) {
  if (smallestUnit > largestUnit) {
    throw new RangeError(flippedSmallestLargestUnit);
  }
}

function createInstantSlots(epochNano) {
  return {
    branding: InstantBranding,
    epochNanoseconds: epochNano
  };
}

function createZonedDateTimeSlots(epochNano, timeZoneId, calendarId) {
  return {
    branding: ZonedDateTimeBranding,
    calendar: calendarId,
    timeZone: timeZoneId,
    epochNanoseconds: epochNano
  };
}

function createPlainDateTimeSlots(isoFields, calendar = isoFields.calendar) {
  return {
    branding: PlainDateTimeBranding,
    calendar: calendar,
    ...pluckProps(isoDateTimeFieldNamesAlpha, isoFields)
  };
}

function createPlainDateSlots(isoFields, calendar = isoFields.calendar) {
  return {
    branding: PlainDateBranding,
    calendar: calendar,
    ...pluckProps(isoDateFieldNamesAlpha, isoFields)
  };
}

function createPlainYearMonthSlots(isoFields, calendar = isoFields.calendar) {
  return {
    branding: PlainYearMonthBranding,
    calendar: calendar,
    ...pluckProps(isoDateFieldNamesAlpha, isoFields)
  };
}

function createPlainMonthDaySlots(isoFields, calendar = isoFields.calendar) {
  return {
    branding: PlainMonthDayBranding,
    calendar: calendar,
    ...pluckProps(isoDateFieldNamesAlpha, isoFields)
  };
}

function createPlainTimeSlots(isoFields) {
  return {
    branding: PlainTimeBranding,
    ...pluckProps(isoTimeFieldNamesAlpha, isoFields)
  };
}

function createDurationSlots(durationFields) {
  return {
    branding: DurationBranding,
    sign: computeDurationSign(durationFields),
    ...pluckProps(durationFieldNamesAlpha, durationFields)
  };
}

function getEpochMilli(slots) {
  return divModBigNano(slots.epochNanoseconds, nanoInMilli)[0];
}

function extractEpochNano(slots) {
  return slots.epochNanoseconds;
}

function totalRelativeDuration(durationFields, endEpochNano, totalUnit, calendarOps, marker, markerToEpochNano, moveMarker) {
  const sign = computeDurationSign(durationFields), [epochNano0, epochNano1] = clampRelativeDuration(calendarOps, clearDurationFields(totalUnit, durationFields), totalUnit, sign, marker, markerToEpochNano, moveMarker), frac = computeEpochNanoFrac(endEpochNano, epochNano0, epochNano1);
  return durationFields[durationFieldNamesAsc[totalUnit]] + frac * sign;
}

function totalDayTimeDuration(durationFields, totalUnit) {
  return bigNanoToNumber(durationFieldsToBigNano(durationFields), unitNanoMap[totalUnit], 1);
}

function clampRelativeDuration(calendarOps, durationFields, clampUnit, clampDistance, marker, markerToEpochNano, moveMarker) {
  const unitName = durationFieldNamesAsc[clampUnit], durationPlusDistance = {
    ...durationFields,
    [unitName]: durationFields[unitName] + clampDistance
  }, marker0 = moveMarker(calendarOps, marker, durationFields), marker1 = moveMarker(calendarOps, marker, durationPlusDistance);
  return [ markerToEpochNano(marker0), markerToEpochNano(marker1) ];
}

function computeEpochNanoFrac(epochNanoProgress, epochNano0, epochNano1) {
  const denom = bigNanoToNumber(diffBigNanos(epochNano0, epochNano1));
  if (!denom) {
    throw new RangeError(invalidProtocolResults);
  }
  return bigNanoToNumber(diffBigNanos(epochNano0, epochNanoProgress)) / denom;
}

function alignZonedEpoch(computeAlignment, timeZoneOps, slots) {
  return getStartOfDayInstantFor(timeZoneOps, computeAlignment(zonedEpochSlotsToIso(slots, timeZoneOps)));
}

function roundZonedEpochToInterval(computeInterval, timeZoneOps, slots, roundingMode) {
  const isoSlots = zonedEpochSlotsToIso(slots, timeZoneOps), [isoFields0, isoFields1] = computeInterval(isoSlots), epochNano = slots.epochNanoseconds, epochNano0 = getStartOfDayInstantFor(timeZoneOps, isoFields0), epochNano1 = getStartOfDayInstantFor(timeZoneOps, isoFields1);
  if (bigNanoOutside(epochNano, epochNano0, epochNano1)) {
    throw new RangeError(invalidProtocolResults);
  }
  return roundWithMode(computeEpochNanoFrac(epochNano, epochNano0, epochNano1), roundingMode) ? epochNano1 : epochNano0;
}

function roundDateTime(isoFields, smallestUnit, roundingInc, roundingMode) {
  return roundDateTimeToNano(isoFields, computeNanoInc(smallestUnit, roundingInc), roundingMode);
}

function roundDateTimeToNano(isoFields, nanoInc, roundingMode) {
  const [roundedIsoFields, dayDelta] = roundTimeToNano(isoFields, nanoInc, roundingMode);
  return checkIsoDateTimeInBounds({
    ...moveByDays(isoFields, dayDelta),
    ...roundedIsoFields
  });
}

function roundTimeToNano(isoFields, nanoInc, roundingMode) {
  return nanoToIsoTimeAndDay(roundByInc(isoTimeFieldsToNano(isoFields), nanoInc, roundingMode));
}

function roundToMinute(offsetNano) {
  return roundByInc(offsetNano, nanoInMinute, 7);
}

function computeNanoInc(smallestUnit, roundingInc) {
  return unitNanoMap[smallestUnit] * roundingInc;
}

function computeDayInterval(isoFields) {
  const isoFields0 = computeDayFloor(isoFields);
  return [ isoFields0, moveByDays(isoFields0, 1) ];
}

function computeDayFloor(isoFields) {
  return clearIsoFields(6, isoFields);
}

function roundDayTimeDurationByInc(durationFields, nanoInc, roundingMode) {
  const maxUnit = Math.min(getMaxDurationUnit(durationFields), 6);
  return nanoToDurationDayTimeFields(roundBigNanoByInc(durationFieldsToBigNano(durationFields, maxUnit), nanoInc, roundingMode), maxUnit);
}

function roundRelativeDuration(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, marker, markerToEpochNano, moveMarker) {
  if (0 === smallestUnit && 1 === roundingInc) {
    return durationFields;
  }
  const nudgeFunc = isUniformUnit(smallestUnit, marker) ? isZonedEpochSlots(marker) && smallestUnit < 6 && largestUnit >= 6 ? nudgeZonedTimeDuration : nudgeDayTimeDuration : nudgeRelativeDuration;
  let [roundedDurationFields, roundedEpochNano, grewBigUnit] = nudgeFunc(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, marker, markerToEpochNano, moveMarker);
  return grewBigUnit && 7 !== smallestUnit && (roundedDurationFields = ((durationFields, endEpochNano, largestUnit, smallestUnit, calendarOps, marker, markerToEpochNano, moveMarker) => {
    const sign = computeDurationSign(durationFields);
    for (let currentUnit = smallestUnit + 1; currentUnit <= largestUnit; currentUnit++) {
      if (7 === currentUnit && 7 !== largestUnit) {
        continue;
      }
      const baseDurationFields = clearDurationFields(currentUnit, durationFields);
      baseDurationFields[durationFieldNamesAsc[currentUnit]] += sign;
      const beyondThresholdNano = bigNanoToNumber(diffBigNanos(markerToEpochNano(moveMarker(calendarOps, marker, baseDurationFields)), endEpochNano));
      if (beyondThresholdNano && Math.sign(beyondThresholdNano) !== sign) {
        break;
      }
      durationFields = baseDurationFields;
    }
    return durationFields;
  })(roundedDurationFields, roundedEpochNano, largestUnit, Math.max(6, smallestUnit), calendarOps, marker, markerToEpochNano, moveMarker)), 
  roundedDurationFields;
}

function roundBigNano(bigNano, smallestUnit, roundingInc, roundingMode, useDayOrigin) {
  return 6 === smallestUnit ? [ roundByInc(bigNanoToExactDays(bigNano), roundingInc, roundingMode), 0 ] : roundBigNanoByInc(bigNano, computeNanoInc(smallestUnit, roundingInc), roundingMode, useDayOrigin);
}

function roundBigNanoByInc(bigNano, nanoInc, roundingMode, useDayOrigin) {
  let [days, timeNano] = bigNano;
  useDayOrigin && timeNano < 0 && (timeNano += nanoInUtcDay, days -= 1);
  const [dayDelta, roundedTimeNano] = divModFloor(roundByInc(timeNano, nanoInc, roundingMode), nanoInUtcDay);
  return createBigNano(days + dayDelta, roundedTimeNano);
}

function roundByInc(num, inc, roundingMode) {
  return roundWithMode(num / inc, roundingMode) * inc;
}

function roundWithMode(num, roundingMode) {
  return roundingModeFuncs[roundingMode](num);
}

function nudgeDayTimeDuration(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode) {
  const sign = computeDurationSign(durationFields), bigNano = durationFieldsToBigNano(durationFields), roundedBigNano = roundBigNano(bigNano, smallestUnit, roundingInc, roundingMode), nanoDiff = diffBigNanos(bigNano, roundedBigNano), expandedBigUnit = Math.sign(roundedBigNano[0] - bigNano[0]) === sign, roundedDayTimeFields = nanoToDurationDayTimeFields(roundedBigNano, Math.min(largestUnit, 6));
  return [ {
    ...durationFields,
    ...roundedDayTimeFields
  }, addBigNanos(endEpochNano, nanoDiff), expandedBigUnit ];
}

function nudgeZonedTimeDuration(durationFields, endEpochNano, _largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, marker, markerToEpochNano, moveMarker) {
  const sign = computeDurationSign(durationFields) || 1, timeNano = bigNanoToNumber(durationFieldsToBigNano(durationFields, 5)), nanoInc = computeNanoInc(smallestUnit, roundingInc);
  let roundedTimeNano = roundByInc(timeNano, nanoInc, roundingMode);
  const [dayEpochNano0, dayEpochNano1] = clampRelativeDuration(calendarOps, {
    ...durationFields,
    ...durationTimeFieldDefaults
  }, 6, sign, marker, markerToEpochNano, moveMarker), beyondDayNano = roundedTimeNano - bigNanoToNumber(diffBigNanos(dayEpochNano0, dayEpochNano1));
  let dayDelta = 0;
  beyondDayNano && Math.sign(beyondDayNano) !== sign ? endEpochNano = moveBigNano(dayEpochNano0, roundedTimeNano) : (dayDelta += sign, 
  roundedTimeNano = roundByInc(beyondDayNano, nanoInc, roundingMode), endEpochNano = moveBigNano(dayEpochNano1, roundedTimeNano));
  const durationTimeFields = nanoToDurationTimeFields(roundedTimeNano);
  return [ {
    ...durationFields,
    ...durationTimeFields,
    days: durationFields.days + dayDelta
  }, endEpochNano, Boolean(dayDelta) ];
}

function nudgeRelativeDuration(durationFields, endEpochNano, _largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, marker, markerToEpochNano, moveMarker) {
  const sign = computeDurationSign(durationFields), smallestUnitFieldName = durationFieldNamesAsc[smallestUnit], baseDurationFields = clearDurationFields(smallestUnit, durationFields);
  7 === smallestUnit && (durationFields = {
    ...durationFields,
    weeks: durationFields.weeks + Math.trunc(durationFields.days / 7)
  });
  const truncedVal = divTrunc(durationFields[smallestUnitFieldName], roundingInc) * roundingInc;
  baseDurationFields[smallestUnitFieldName] = truncedVal;
  const [epochNano0, epochNano1] = clampRelativeDuration(calendarOps, baseDurationFields, smallestUnit, roundingInc * sign, marker, markerToEpochNano, moveMarker), exactVal = truncedVal + computeEpochNanoFrac(endEpochNano, epochNano0, epochNano1) * sign * roundingInc, roundedVal = roundByInc(exactVal, roundingInc, roundingMode), expanded = Math.sign(roundedVal - exactVal) === sign;
  return baseDurationFields[smallestUnitFieldName] = roundedVal, [ baseDurationFields, expanded ? epochNano1 : epochNano0, expanded ];
}

function formatDateLikeIso(calendarId, formatSimple, isoFields, calendarDisplay) {
  const showCalendar = calendarDisplay > 1 || 0 === calendarDisplay && calendarId !== isoCalendarId;
  return 1 === calendarDisplay ? calendarId === isoCalendarId ? formatSimple(isoFields) : formatIsoDateFields(isoFields) : showCalendar ? formatIsoDateFields(isoFields) + formatCalendarId(calendarId, 2 === calendarDisplay) : formatSimple(isoFields);
}

function formatDurationFragments(fragObj) {
  const parts = [];
  for (const fragName in fragObj) {
    const fragVal = fragObj[fragName];
    fragVal && parts.push(fragVal, fragName);
  }
  return parts.join("");
}

function formatIsoDateTimeFields(isoDateTimeFields, subsecDigits) {
  return formatIsoDateFields(isoDateTimeFields) + "T" + formatIsoTimeFields(isoDateTimeFields, subsecDigits);
}

function formatIsoDateFields(isoDateFields) {
  return formatIsoYearMonthFields(isoDateFields) + "-" + padNumber2(isoDateFields.isoDay);
}

function formatIsoYearMonthFields(isoDateFields) {
  const {isoYear: isoYear} = isoDateFields;
  return (isoYear < 0 || isoYear > 9999 ? getSignStr(isoYear) + padNumber(6, Math.abs(isoYear)) : padNumber(4, isoYear)) + "-" + padNumber2(isoDateFields.isoMonth);
}

function formatIsoMonthDayFields(isoDateFields) {
  return padNumber2(isoDateFields.isoMonth) + "-" + padNumber2(isoDateFields.isoDay);
}

function formatIsoTimeFields(isoTimeFields, subsecDigits) {
  const parts = [ padNumber2(isoTimeFields.isoHour), padNumber2(isoTimeFields.isoMinute) ];
  return -1 !== subsecDigits && parts.push(padNumber2(isoTimeFields.isoSecond) + ((isoMillisecond, isoMicrosecond, isoNanosecond, subsecDigits) => formatSubsecNano(isoMillisecond * nanoInMilli + isoMicrosecond * nanoInMicro + isoNanosecond, subsecDigits))(isoTimeFields.isoMillisecond, isoTimeFields.isoMicrosecond, isoTimeFields.isoNanosecond, subsecDigits)), 
  parts.join(":");
}

function formatOffsetNano(offsetNano, offsetDisplay = 0) {
  if (1 === offsetDisplay) {
    return "";
  }
  const [hour, nanoRemainder0] = divModFloor(Math.abs(offsetNano), nanoInHour), [minute, nanoRemainder1] = divModFloor(nanoRemainder0, nanoInMinute), [second, nanoRemainder2] = divModFloor(nanoRemainder1, nanoInSec);
  return getSignStr(offsetNano) + padNumber2(hour) + ":" + padNumber2(minute) + (second || nanoRemainder2 ? ":" + padNumber2(second) + formatSubsecNano(nanoRemainder2) : "");
}

function formatCalendar(calendarId, calendarDisplay) {
  return 1 !== calendarDisplay && (calendarDisplay > 1 || 0 === calendarDisplay && calendarId !== isoCalendarId) ? formatCalendarId(calendarId, 2 === calendarDisplay) : "";
}

function formatCalendarId(calendarId, isCritical) {
  return "[" + (isCritical ? "!" : "") + "u-ca=" + calendarId + "]";
}

function formatSubsecNano(totalNano, subsecDigits) {
  let s = padNumber(9, totalNano);
  return s = void 0 === subsecDigits ? s.replace(trailingZerosRE, "") : s.slice(0, subsecDigits), 
  s ? "." + s : "";
}

function getSignStr(num) {
  return num < 0 ? "-" : "+";
}

function formatDurationNumber(n, force) {
  return n || force ? n.toLocaleString("fullwide", {
    useGrouping: 0
  }) : "";
}

function getMatchingInstantFor(timeZoneOps, isoFields, offsetNano, offsetDisambig = 0, epochDisambig = 0, epochFuzzy, hasZ) {
  if (void 0 !== offsetNano && 1 === offsetDisambig && (1 === offsetDisambig || hasZ)) {
    return isoToEpochNanoWithOffset(isoFields, offsetNano);
  }
  const possibleEpochNanos = timeZoneOps.getPossibleInstantsFor(isoFields);
  if (void 0 !== offsetNano && 3 !== offsetDisambig) {
    const matchingEpochNano = ((possibleEpochNanos, isoDateTimeFields, offsetNano, fuzzy) => {
      const zonedEpochNano = isoToEpochNano(isoDateTimeFields);
      fuzzy && (offsetNano = roundToMinute(offsetNano));
      for (const possibleEpochNano of possibleEpochNanos) {
        let possibleOffsetNano = bigNanoToNumber(diffBigNanos(possibleEpochNano, zonedEpochNano));
        if (fuzzy && (possibleOffsetNano = roundToMinute(possibleOffsetNano)), possibleOffsetNano === offsetNano) {
          return possibleEpochNano;
        }
      }
    })(possibleEpochNanos, isoFields, offsetNano, epochFuzzy);
    if (void 0 !== matchingEpochNano) {
      return matchingEpochNano;
    }
    if (0 === offsetDisambig) {
      throw new RangeError(invalidOffsetForTimeZone);
    }
  }
  return hasZ ? isoToEpochNano(isoFields) : getSingleInstantFor(timeZoneOps, isoFields, epochDisambig, possibleEpochNanos);
}

function getSingleInstantFor(timeZoneOps, isoFields, disambig = 0, possibleEpochNanos = timeZoneOps.getPossibleInstantsFor(isoFields)) {
  if (1 === possibleEpochNanos.length) {
    return possibleEpochNanos[0];
  }
  if (1 === disambig) {
    throw new RangeError(ambigOffset);
  }
  if (possibleEpochNanos.length) {
    return possibleEpochNanos[3 === disambig ? 1 : 0];
  }
  const zonedEpochNano = isoToEpochNano(isoFields), gapNano = ((timeZoneOps, zonedEpochNano) => {
    const startOffsetNano = timeZoneOps.getOffsetNanosecondsFor(moveBigNano(zonedEpochNano, -nanoInUtcDay));
    return (gapNano => {
      if (gapNano > nanoInUtcDay) {
        throw new RangeError(outOfBoundsDstGap);
      }
      return gapNano;
    })(timeZoneOps.getOffsetNanosecondsFor(moveBigNano(zonedEpochNano, nanoInUtcDay)) - startOffsetNano);
  })(timeZoneOps, zonedEpochNano), shiftNano = gapNano * (2 === disambig ? -1 : 1);
  return (possibleEpochNanos = timeZoneOps.getPossibleInstantsFor(epochNanoToIso(zonedEpochNano, shiftNano)))[2 === disambig ? 0 : possibleEpochNanos.length - 1];
}

function getStartOfDayInstantFor(timeZoneOps, isoFields) {
  const possibleEpochNanos = timeZoneOps.getPossibleInstantsFor(isoFields);
  if (possibleEpochNanos.length) {
    return possibleEpochNanos[0];
  }
  const zonedEpochNanoDayBefore = moveBigNano(isoToEpochNano(isoFields), -nanoInUtcDay);
  return timeZoneOps.getTransition(zonedEpochNanoDayBefore, 1);
}

function moveZonedEpochs(timeZoneOps, calendarOps, slots, durationFields, options) {
  const timeOnlyNano = durationFieldsToBigNano(durationFields, 5);
  let epochNano = slots.epochNanoseconds;
  if (durationHasDateParts(durationFields)) {
    const isoDateTimeFields = zonedEpochSlotsToIso(slots, timeZoneOps);
    epochNano = addBigNanos(getSingleInstantFor(timeZoneOps, {
      ...moveDate(calendarOps, isoDateTimeFields, {
        ...durationFields,
        ...durationTimeFieldDefaults
      }, options),
      ...pluckProps(isoTimeFieldNamesAsc, isoDateTimeFields)
    }), timeOnlyNano);
  } else {
    epochNano = addBigNanos(epochNano, timeOnlyNano), refineOverflowOptions(options);
  }
  return {
    epochNanoseconds: checkEpochNanoInBounds(epochNano)
  };
}

function moveDateTime(calendarOps, isoDateTimeFields, durationFields, options) {
  const [movedIsoTimeFields, dayDelta] = moveTime(isoDateTimeFields, durationFields);
  return checkIsoDateTimeInBounds({
    ...moveDate(calendarOps, isoDateTimeFields, {
      ...durationFields,
      ...durationTimeFieldDefaults,
      days: durationFields.days + dayDelta
    }, options),
    ...movedIsoTimeFields
  });
}

function moveDate(calendarOps, isoDateFields, durationFields, options) {
  if (durationFields.years || durationFields.months || durationFields.weeks) {
    return calendarOps.dateAdd(isoDateFields, durationFields, options);
  }
  refineOverflowOptions(options);
  const days = durationFields.days + durationFieldsToBigNano(durationFields, 5)[0];
  return days ? checkIsoDateInBounds(moveByDays(isoDateFields, days)) : isoDateFields;
}

function moveToDayOfMonthUnsafe(calendarOps, isoFields, dayOfMonth = 1) {
  return moveByDays(isoFields, dayOfMonth - calendarOps.day(isoFields));
}

function moveTime(isoFields, durationFields) {
  const [durDays, durTimeNano] = durationFieldsToBigNano(durationFields, 5), [newIsoFields, overflowDays] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(isoFields) + durTimeNano);
  return [ newIsoFields, durDays + overflowDays ];
}

function nativeDateAdd(isoDateFields, durationFields, options) {
  const overflow = refineOverflowOptions(options);
  let epochMilli, {years: years, months: months, weeks: weeks, days: days} = durationFields;
  if (days += durationFieldsToBigNano(durationFields, 5)[0], years || months) {
    epochMilli = nativeYearMonthAdd(this, isoDateFields, years, months, overflow);
  } else {
    if (!weeks && !days) {
      return isoDateFields;
    }
    epochMilli = isoToEpochMilli(isoDateFields);
  }
  if (void 0 === epochMilli) {
    throw new RangeError(outOfBoundsDate);
  }
  return epochMilli += (7 * weeks + days) * milliInDay, checkIsoDateInBounds(epochMilliToIso(epochMilli));
}

function nativeYearMonthAdd(moveOps, isoDateFields, years, months, overflow) {
  let [year, month, day] = moveOps.dateParts(isoDateFields);
  if (years) {
    const [monthCodeNumber, isLeapMonth] = moveOps.monthCodeParts(year, month);
    year += years, month = monthCodeNumberToMonth(monthCodeNumber, isLeapMonth, moveOps.leapMonth(year)), 
    month = clampEntity("month", month, 1, moveOps.monthsInYearPart(year), overflow);
  }
  return months && ([year, month] = moveOps.monthAdd(year, month, months)), day = clampEntity("day", day, 1, moveOps.daysInMonthParts(year, month), overflow), 
  moveOps.epochMilli(year, month, day);
}

function isoMonthAdd(year, month, monthDelta) {
  return year += divTrunc(monthDelta, isoMonthsInYear), (month += modTrunc(monthDelta, isoMonthsInYear)) < 1 ? (year--, 
  month += isoMonthsInYear) : month > isoMonthsInYear && (year++, month -= isoMonthsInYear), 
  [ year, month ];
}

function intlMonthAdd(year, month, monthDelta) {
  if (monthDelta) {
    if (month += monthDelta, !Number.isSafeInteger(month)) {
      throw new RangeError(outOfBoundsDate);
    }
    if (monthDelta < 0) {
      for (;month < 1; ) {
        month += computeIntlMonthsInYear.call(this, --year);
      }
    } else {
      let monthsInYear;
      for (;month > (monthsInYear = computeIntlMonthsInYear.call(this, year)); ) {
        month -= monthsInYear, year++;
      }
    }
  }
  return [ year, month ];
}

function moveByDays(isoFields, days) {
  return days ? {
    ...isoFields,
    ...epochMilliToIso(isoToEpochMilli(isoFields) + days * milliInDay)
  } : isoFields;
}

function createMarkerSystem(getCalendarOps, getTimeZoneOps, relativeToSlots) {
  const calendarOps = getCalendarOps(relativeToSlots.calendar);
  return isZonedEpochSlots(relativeToSlots) ? [ relativeToSlots, calendarOps, getTimeZoneOps(relativeToSlots.timeZone) ] : [ {
    ...relativeToSlots,
    ...isoTimeFieldDefaults
  }, calendarOps ];
}

function createMarkerToEpochNano(timeZoneOps) {
  return timeZoneOps ? extractEpochNano : isoToEpochNano;
}

function createMoveMarker(timeZoneOps) {
  return timeZoneOps ? bindArgs(moveZonedEpochs, timeZoneOps) : moveDateTime;
}

function createDiffMarkers(timeZoneOps) {
  return timeZoneOps ? bindArgs(diffZonedEpochsExact, timeZoneOps) : diffDateTimesExact;
}

function isZonedEpochSlots(marker) {
  return marker && marker.epochNanoseconds;
}

function isUniformUnit(unit, marker) {
  return unit <= 6 - (isZonedEpochSlots(marker) ? 1 : 0);
}

function negateDuration(slots) {
  return createDurationSlots(negateDurationFields(slots));
}

function negateDurationFields(fields) {
  const res = {};
  for (const fieldName of durationFieldNamesAsc) {
    res[fieldName] = -1 * fields[fieldName] || 0;
  }
  return res;
}

function computeDurationSign(fields, fieldNames = durationFieldNamesAsc) {
  let sign = 0;
  for (const fieldName of fieldNames) {
    const fieldSign = Math.sign(fields[fieldName]);
    if (fieldSign) {
      if (sign && sign !== fieldSign) {
        throw new RangeError(forbiddenDurationSigns);
      }
      sign = fieldSign;
    }
  }
  return sign;
}

function checkDurationUnits(fields) {
  for (const calendarUnit of durationCalendarFieldNamesAsc) {
    clampEntity(calendarUnit, fields[calendarUnit], -maxCalendarUnit, maxCalendarUnit, 1);
  }
  return checkDurationTimeUnit(bigNanoToNumber(durationFieldsToBigNano(fields), nanoInSec)), 
  fields;
}

function checkDurationTimeUnit(n) {
  if (!Number.isSafeInteger(n)) {
    throw new RangeError(outOfBoundsDuration);
  }
}

function durationFieldsToBigNano(fields, largestUnit = 6) {
  return givenFieldsToBigNano(fields, largestUnit, durationFieldNamesAsc);
}

function nanoToDurationDayTimeFields(bigNano, largestUnit = 6) {
  const [days, timeNano] = bigNano, dayTimeFields = nanoToGivenFields(timeNano, largestUnit, durationFieldNamesAsc);
  if (dayTimeFields[durationFieldNamesAsc[largestUnit]] += days * (nanoInUtcDay / unitNanoMap[largestUnit]), 
  !Number.isFinite(dayTimeFields[durationFieldNamesAsc[largestUnit]])) {
    throw new RangeError(outOfBoundsDate);
  }
  return dayTimeFields;
}

function nanoToDurationTimeFields(nano, largestUnit = 5) {
  return nanoToGivenFields(nano, largestUnit, durationFieldNamesAsc);
}

function durationHasDateParts(fields) {
  return Boolean(computeDurationSign(fields, durationDateFieldNamesAsc));
}

function getMaxDurationUnit(fields) {
  let unit = 9;
  for (;unit > 0 && !fields[durationFieldNamesAsc[unit]]; unit--) {}
  return unit;
}

function createSplitTuple(startEpochSec, endEpochSec) {
  return [ startEpochSec, endEpochSec ];
}

function computePeriod(epochSec) {
  const startEpochSec = Math.floor(epochSec / periodDur) * periodDur;
  return [ startEpochSec, startEpochSec + periodDur ];
}

function parseOffsetNano(s) {
  const offsetNano = parseOffsetNanoMaybe(s);
  if (void 0 === offsetNano) {
    throw new RangeError(failedParse(s));
  }
  return offsetNano;
}

function parsePlainDate(s, isPlainYearMonth, isPlainMonthDay) {
  let organized = parseDateTimeLike(requireString(s));
  if (!organized || organized.hasZ) {
    throw new RangeError(failedParse(s));
  }
  return isPlainYearMonth ? organized.calendar === isoCalendarId && (organized = -271821 === organized.isoYear && 4 === organized.isoMonth ? {
    ...organized,
    isoDay: 20,
    ...isoTimeFieldDefaults
  } : {
    ...organized,
    isoDay: 1,
    ...isoTimeFieldDefaults
  }) : isPlainMonthDay && organized.calendar === isoCalendarId && (organized = {
    ...organized,
    isoYear: isoEpochFirstLeapYear
  }), createPlainDateSlots(organized.hasTime ? finalizeDateTime(organized) : finalizeDate(organized));
}

function requireIsoCalendar(organized) {
  if (organized.calendar !== isoCalendarId) {
    throw new RangeError(invalidSubstring(organized.calendar));
  }
}

function finalizeZonedDateTime(organized, offsetNano, offsetDisambig = 0, epochDisambig = 0) {
  const timeZoneId = resolveTimeZoneId(organized.timeZone), timeZoneImpl = queryNativeTimeZone(timeZoneId);
  let epochNano;
  return checkIsoDateTimeFields(organized), epochNano = organized.hasTime ? getMatchingInstantFor(timeZoneImpl, organized, offsetNano, offsetDisambig, epochDisambig, !timeZoneImpl.offsetNano, organized.hasZ) : getStartOfDayInstantFor(timeZoneImpl, organized), 
  createZonedDateTimeSlots(epochNano, timeZoneId, resolveCalendarId(organized.calendar));
}

function finalizeDateTime(organized) {
  return resolveSlotsCalendar(checkIsoDateTimeInBounds(checkIsoDateTimeFields(organized)));
}

function finalizeDate(organized) {
  return resolveSlotsCalendar(checkIsoDateInBounds(checkIsoDateFields(organized)));
}

function resolveSlotsCalendar(organized) {
  return {
    ...organized,
    calendar: resolveCalendarId(organized.calendar)
  };
}

function parseDateTimeLike(s) {
  const parts = dateTimeRegExp.exec(s);
  return parts ? (parts => {
    const zOrOffset = parts[10], hasZ = "Z" === (zOrOffset || "").toUpperCase();
    return {
      isoYear: organizeIsoYearParts(parts),
      isoMonth: parseInt(parts[4]),
      isoDay: parseInt(parts[5]),
      ...organizeTimeParts(parts.slice(5)),
      ...organizeAnnotationParts(parts[16]),
      hasTime: Boolean(parts[6]),
      hasZ: hasZ,
      offset: hasZ ? void 0 : zOrOffset
    };
  })(parts) : void 0;
}

function parseYearMonthOnly(s) {
  const parts = yearMonthRegExp.exec(s);
  return parts ? (parts => ({
    isoYear: organizeIsoYearParts(parts),
    isoMonth: parseInt(parts[4]),
    isoDay: 1,
    ...organizeAnnotationParts(parts[5])
  }))(parts) : void 0;
}

function parseMonthDayOnly(s) {
  const parts = monthDayRegExp.exec(s);
  return parts ? (parts => ({
    isoYear: isoEpochFirstLeapYear,
    isoMonth: parseInt(parts[1]),
    isoDay: parseInt(parts[2]),
    ...organizeAnnotationParts(parts[3])
  }))(parts) : void 0;
}

function parseOffsetNanoMaybe(s, onlyHourMinute) {
  const parts = offsetRegExp.exec(s);
  return parts ? ((parts, onlyHourMinute) => {
    const firstSubMinutePart = parts[4] || parts[5];
    if (onlyHourMinute && firstSubMinutePart) {
      throw new RangeError(invalidSubstring(firstSubMinutePart));
    }
    return (offsetNano => {
      if (Math.abs(offsetNano) >= nanoInUtcDay) {
        throw new RangeError(outOfBoundsOffset);
      }
      return offsetNano;
    })((parseInt0(parts[2]) * nanoInHour + parseInt0(parts[3]) * nanoInMinute + parseInt0(parts[4]) * nanoInSec + parseSubsecNano(parts[5] || "")) * parseSign(parts[1]));
  })(parts, onlyHourMinute) : void 0;
}

function organizeIsoYearParts(parts) {
  const yearSign = parseSign(parts[1]), year = parseInt(parts[2] || parts[3]);
  if (yearSign < 0 && !year) {
    throw new RangeError(invalidSubstring(-0));
  }
  return yearSign * year;
}

function organizeTimeParts(parts) {
  const isoSecond = parseInt0(parts[3]);
  return {
    ...nanoToIsoTimeAndDay(parseSubsecNano(parts[4] || ""))[0],
    isoHour: parseInt0(parts[1]),
    isoMinute: parseInt0(parts[2]),
    isoSecond: 60 === isoSecond ? 59 : isoSecond
  };
}

function organizeAnnotationParts(s) {
  let calendarIsCritical, timeZoneId;
  const calendarIds = [];
  if (s.replace(annotationRegExp, ((whole, criticalStr, mainStr) => {
    const isCritical = Boolean(criticalStr), [val, name] = mainStr.split("=").reverse();
    if (name) {
      if ("u-ca" === name) {
        calendarIds.push(val), calendarIsCritical || (calendarIsCritical = isCritical);
      } else if (isCritical || /[A-Z]/.test(name)) {
        throw new RangeError(invalidSubstring(whole));
      }
    } else {
      if (timeZoneId) {
        throw new RangeError(invalidSubstring(whole));
      }
      timeZoneId = val;
    }
    return "";
  })), calendarIds.length > 1 && calendarIsCritical) {
    throw new RangeError(invalidSubstring(s));
  }
  return {
    timeZone: timeZoneId,
    calendar: calendarIds[0] || isoCalendarId
  };
}

function parseSubsecNano(fracStr) {
  return parseInt(fracStr.padEnd(9, "0"));
}

function createRegExp(meat) {
  return new RegExp(`^${meat}$`, "i");
}

function parseSign(s) {
  return s && "+" !== s ? -1 : 1;
}

function parseInt0(s) {
  return void 0 === s ? 0 : parseInt(s);
}

function resolveTimeZoneId(id) {
  const essence = getTimeZoneEssence(id);
  return "number" == typeof essence ? formatOffsetNano(essence) : essence ? (id => {
    if (badCharactersRegExp.test(id)) {
      throw new RangeError(invalidTimeZone(id));
    }
    if (icuRegExp.test(id)) {
      throw new RangeError(forbiddenIcuTimeZone);
    }
    return id.toLowerCase().split("/").map(((part, partI) => (part.length <= 3 || /\d/.test(part)) && !/etc|yap/.test(part) ? part.toUpperCase() : part.replace(/baja|dumont|[a-z]+/g, ((a, i) => a.length <= 2 && !partI || "in" === a || "chat" === a ? a.toUpperCase() : a.length > 2 || !i ? capitalize(a).replace(/island|noronha|murdo|rivadavia|urville/, capitalize) : a)))).join("/");
  })(id) : utcTimeZoneId;
}

function getTimeZoneAtomic(id) {
  const essence = getTimeZoneEssence(id);
  return "number" == typeof essence ? essence : essence ? essence.resolvedOptions().timeZone : utcTimeZoneId;
}

function getTimeZoneEssence(id) {
  const offsetNano = parseOffsetNanoMaybe(id = id.toUpperCase(), 1);
  return void 0 !== offsetNano ? offsetNano : id !== utcTimeZoneId ? queryTimeZoneIntlFormat(id) : void 0;
}

function compareInstants(instantSlots0, instantSlots1) {
  return compareBigNanos(instantSlots0.epochNanoseconds, instantSlots1.epochNanoseconds);
}

function compareZonedDateTimes(zonedDateTimeSlots0, zonedDateTimeSlots1) {
  return compareBigNanos(zonedDateTimeSlots0.epochNanoseconds, zonedDateTimeSlots1.epochNanoseconds);
}

function compareIsoDateTimeFields(isoFields0, isoFields1) {
  return compareIsoDateFields(isoFields0, isoFields1) || compareIsoTimeFields(isoFields0, isoFields1);
}

function compareIsoDateFields(isoFields0, isoFields1) {
  return compareNumbers(isoToEpochMilli(isoFields0), isoToEpochMilli(isoFields1));
}

function compareIsoTimeFields(isoFields0, isoFields1) {
  return compareNumbers(isoTimeFieldsToNano(isoFields0), isoTimeFieldsToNano(isoFields1));
}

function isTimeZoneIdsEqual(a, b) {
  if (a === b) {
    return 1;
  }
  try {
    return getTimeZoneAtomic(a) === getTimeZoneAtomic(b);
  } catch (_a) {}
}

function diffDateLike(invert, getCalendarOps, startIsoFields, endIsoFields, largestUnit, smallestUnit, roundingInc, roundingMode, smallestPrecision = 6) {
  const startEpochNano = isoToEpochNano(startIsoFields), endEpochNano = isoToEpochNano(endIsoFields);
  if (void 0 === startEpochNano || void 0 === endEpochNano) {
    throw new RangeError(outOfBoundsDate);
  }
  let durationFields;
  if (compareBigNanos(endEpochNano, startEpochNano)) {
    if (6 === largestUnit) {
      durationFields = diffEpochNanos(startEpochNano, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode);
    } else {
      const calendarOps = getCalendarOps();
      durationFields = calendarOps.dateUntil(startIsoFields, endIsoFields, largestUnit), 
      smallestUnit === smallestPrecision && 1 === roundingInc || (durationFields = roundRelativeDuration(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, startIsoFields, isoToEpochNano, moveDate));
    }
  } else {
    durationFields = durationFieldDefaults;
  }
  return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}

function diffZonedEpochsExact(timeZoneOps, calendarOps, slots0, slots1, largestUnit, origOptions) {
  const sign = compareBigNanos(slots1.epochNanoseconds, slots0.epochNanoseconds);
  return sign ? largestUnit < 6 ? diffEpochNanosExact(slots0.epochNanoseconds, slots1.epochNanoseconds, largestUnit) : diffZonedEpochsBig(calendarOps, timeZoneOps, slots0, slots1, sign, largestUnit, origOptions) : durationFieldDefaults;
}

function diffDateTimesExact(calendarOps, startIsoFields, endIsoFields, largestUnit, origOptions) {
  const startEpochNano = isoToEpochNano(startIsoFields), endEpochNano = isoToEpochNano(endIsoFields), sign = compareBigNanos(endEpochNano, startEpochNano);
  return sign ? largestUnit <= 6 ? diffEpochNanosExact(startEpochNano, endEpochNano, largestUnit) : diffDateTimesBig(calendarOps, startIsoFields, endIsoFields, sign, largestUnit, origOptions) : durationFieldDefaults;
}

function diffZonedEpochsBig(calendarOps, timeZoneOps, slots0, slots1, sign, largestUnit, origOptions) {
  const [isoFields0, isoFields1, remainderNano] = prepareZonedEpochDiff(timeZoneOps, slots0, slots1, sign);
  var startIsoFields, endIsoFields;
  return {
    ...6 === largestUnit ? (startIsoFields = isoFields0, endIsoFields = isoFields1, 
    {
      ...durationFieldDefaults,
      days: diffDays(startIsoFields, endIsoFields)
    }) : calendarOps.dateUntil(isoFields0, isoFields1, largestUnit, origOptions),
    ...nanoToDurationTimeFields(remainderNano)
  };
}

function diffDateTimesBig(calendarOps, startIsoFields, endIsoFields, sign, largestUnit, origOptions) {
  const [startIsoDate, endIsoDate, timeNano] = ((startIsoDateTime, endIsoDateTime, sign) => {
    let endIsoDate = endIsoDateTime, timeDiffNano = diffTimes(startIsoDateTime, endIsoDateTime);
    return Math.sign(timeDiffNano) === -sign && (endIsoDate = moveByDays(endIsoDateTime, -sign), 
    timeDiffNano += nanoInUtcDay * sign), [ startIsoDateTime, endIsoDate, timeDiffNano ];
  })(startIsoFields, endIsoFields, sign);
  return {
    ...calendarOps.dateUntil(startIsoDate, endIsoDate, largestUnit, origOptions),
    ...nanoToDurationTimeFields(timeNano)
  };
}

function prepareZonedEpochDiff(timeZoneOps, slots0, slots1, sign) {
  function updateMid() {
    return midIsoFields = {
      ...moveByDays(endIsoFields, dayCorrection++ * -sign),
      ...startIsoTimeFields
    }, midEpochNano = getSingleInstantFor(timeZoneOps, midIsoFields), compareBigNanos(endEpochNano, midEpochNano) === -sign;
  }
  const startIsoFields = zonedEpochSlotsToIso(slots0, timeZoneOps), startIsoTimeFields = pluckProps(isoTimeFieldNamesAsc, startIsoFields), endIsoFields = zonedEpochSlotsToIso(slots1, timeZoneOps), endEpochNano = slots1.epochNanoseconds;
  let dayCorrection = 0;
  const timeDiffNano = diffTimes(startIsoFields, endIsoFields);
  let midIsoFields, midEpochNano;
  if (Math.sign(timeDiffNano) === -sign && dayCorrection++, updateMid() && (-1 === sign || updateMid())) {
    throw new RangeError(invalidProtocolResults);
  }
  const remainderNano = bigNanoToNumber(diffBigNanos(midEpochNano, endEpochNano));
  return [ startIsoFields, midIsoFields, remainderNano ];
}

function diffEpochNanos(startEpochNano, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode) {
  return {
    ...durationFieldDefaults,
    ...nanoToDurationDayTimeFields(roundBigNano(diffBigNanos(startEpochNano, endEpochNano), smallestUnit, roundingInc, roundingMode), largestUnit)
  };
}

function diffEpochNanosExact(startEpochNano, endEpochNano, largestUnit) {
  return {
    ...durationFieldDefaults,
    ...nanoToDurationDayTimeFields(diffBigNanos(startEpochNano, endEpochNano), largestUnit)
  };
}

function diffDays(startIsoFields, endIsoFields) {
  return diffEpochMilliByDay(isoToEpochMilli(startIsoFields), isoToEpochMilli(endIsoFields));
}

function diffEpochMilliByDay(epochMilli0, epochMilli1) {
  return Math.trunc((epochMilli1 - epochMilli0) / milliInDay);
}

function diffTimes(isoTime0, isoTime1) {
  return isoTimeFieldsToNano(isoTime1) - isoTimeFieldsToNano(isoTime0);
}

function nativeDateUntil(startIsoFields, endIsoFields, largestUnit) {
  if (largestUnit <= 7) {
    let weeks = 0, days = diffDays({
      ...startIsoFields,
      ...isoTimeFieldDefaults
    }, {
      ...endIsoFields,
      ...isoTimeFieldDefaults
    });
    return 7 === largestUnit && ([weeks, days] = divModTrunc(days, 7)), {
      ...durationFieldDefaults,
      weeks: weeks,
      days: days
    };
  }
  const yearMonthDayStart = this.dateParts(startIsoFields), yearMonthDayEnd = this.dateParts(endIsoFields);
  let [years, months, days] = ((calendarNative, year0, month0, day0, year1, month1, day1) => {
    let yearDiff = year1 - year0, monthDiff = month1 - month0, dayDiff = day1 - day0;
    if (yearDiff || monthDiff) {
      const sign = Math.sign(yearDiff || monthDiff);
      let daysInMonth1 = calendarNative.daysInMonthParts(year1, month1), dayCorrect = 0;
      if (Math.sign(dayDiff) === -sign) {
        const origDaysInMonth1 = daysInMonth1;
        [year1, month1] = calendarNative.monthAdd(year1, month1, -sign), yearDiff = year1 - year0, 
        monthDiff = month1 - month0, daysInMonth1 = calendarNative.daysInMonthParts(year1, month1), 
        dayCorrect = sign < 0 ? -origDaysInMonth1 : daysInMonth1;
      }
      if (dayDiff = day1 - Math.min(day0, daysInMonth1) + dayCorrect, yearDiff) {
        const [monthCodeNumber0, isLeapYear0] = calendarNative.monthCodeParts(year0, month0), [monthCodeNumber1, isLeapYear1] = calendarNative.monthCodeParts(year1, month1);
        if (monthDiff = monthCodeNumber1 - monthCodeNumber0 || Number(isLeapYear1) - Number(isLeapYear0), 
        Math.sign(monthDiff) === -sign) {
          const monthCorrect = sign < 0 && -calendarNative.monthsInYearPart(year1);
          yearDiff = (year1 -= sign) - year0, monthDiff = month1 - monthCodeNumberToMonth(monthCodeNumber0, isLeapYear0, calendarNative.leapMonth(year1)) + (monthCorrect || calendarNative.monthsInYearPart(year1));
        }
      }
    }
    return [ yearDiff, monthDiff, dayDiff ];
  })(this, ...yearMonthDayStart, ...yearMonthDayEnd);
  return 8 === largestUnit && (months += this.monthsInYearSpan(years, yearMonthDayStart[0]), 
  years = 0), {
    ...durationFieldDefaults,
    years: years,
    months: months,
    days: days
  };
}

function computeIsoMonthsInYearSpan(yearDelta) {
  return yearDelta * isoMonthsInYear;
}

function computeIntlMonthsInYearSpan(yearDelta, yearStart) {
  const yearEnd = yearStart + yearDelta, yearSign = Math.sign(yearDelta), yearCorrection = yearSign < 0 ? -1 : 0;
  let months = 0;
  for (let year = yearStart; year !== yearEnd; year += yearSign) {
    months += computeIntlMonthsInYear.call(this, year + yearCorrection);
  }
  return months;
}

function getCommonCalendarId(a, b) {
  if (a !== b) {
    throw new RangeError(mismatchingCalendars);
  }
  return a;
}

function getCommonTimeZoneId(a, b) {
  if (!isTimeZoneIdsEqual(a, b)) {
    throw new RangeError(mismatchingTimeZones);
  }
  return a;
}

function computeNativeWeekOfYear(isoFields) {
  return this.weekParts(isoFields)[0];
}

function computeNativeYearOfWeek(isoFields) {
  return this.weekParts(isoFields)[1];
}

function computeNativeInLeapYear(isoFields) {
  const [year] = this.dateParts(isoFields);
  return this.inLeapYearPart(year);
}

function computeNativeMonthsInYear(isoFields) {
  const [year] = this.dateParts(isoFields);
  return this.monthsInYearPart(year);
}

function computeNativeDaysInMonth(isoFields) {
  const [year, month] = this.dateParts(isoFields);
  return this.daysInMonthParts(year, month);
}

function computeNativeDaysInYear(isoFields) {
  const [year] = this.dateParts(isoFields);
  return this.daysInYearPart(year);
}

function computeNativeDayOfYear(isoFields) {
  const [year] = this.dateParts(isoFields);
  return diffEpochMilliByDay(this.epochMilli(year), isoToEpochMilli(isoFields)) + 1;
}

function parseMonthCode(monthCode) {
  const m = monthCodeRegExp.exec(monthCode);
  if (!m) {
    throw new RangeError(invalidMonthCode(monthCode));
  }
  return [ parseInt(m[1]), Boolean(m[2]) ];
}

function formatMonthCode(monthCodeNumber, isLeapMonth) {
  return "M" + padNumber2(monthCodeNumber) + (isLeapMonth ? "L" : "");
}

function monthCodeNumberToMonth(monthCodeNumber, isLeapMonth, leapMonth) {
  return monthCodeNumber + (isLeapMonth || leapMonth && monthCodeNumber >= leapMonth ? 1 : 0);
}

function monthToMonthCodeNumber(month, leapMonth) {
  return month - (leapMonth && month >= leapMonth ? 1 : 0);
}

function eraYearToYear(eraYear, eraOrigin) {
  return (eraOrigin + eraYear) * (Math.sign(eraOrigin) || 1) || 0;
}

function getCalendarEraOrigins(native) {
  return eraOriginsByCalendarId[getCalendarIdBase(native)];
}

function getCalendarLeapMonthMeta(native) {
  return leapMonthMetas[getCalendarIdBase(native)];
}

function getCalendarIdBase(native) {
  return computeCalendarIdBase(native.id || isoCalendarId);
}

function createIntlFieldCache(epochMilliToIntlFields) {
  return memoize((isoDateFields => {
    const epochMilli = isoToEpochMilli(isoDateFields);
    return epochMilliToIntlFields(epochMilli);
  }), WeakMap);
}

function createIntlYearDataCache(epochMilliToIntlFields) {
  const yearCorrection = epochMilliToIntlFields(0).year - isoEpochOriginYear;
  return memoize((year => {
    let intlFields, epochMilli = isoArgsToEpochMilli(year - yearCorrection), iterations = 0;
    const millisReversed = [], monthStringsReversed = [];
    do {
      epochMilli += 400 * milliInDay;
    } while ((intlFields = epochMilliToIntlFields(epochMilli)).year <= year);
    do {
      if (epochMilli += (1 - intlFields.day) * milliInDay, intlFields.year === year && (millisReversed.push(epochMilli), 
      monthStringsReversed.push(intlFields.monthString)), epochMilli -= milliInDay, ++iterations > 100 || epochMilli < -maxMilli) {
        throw new RangeError(invalidProtocolResults);
      }
    } while ((intlFields = epochMilliToIntlFields(epochMilli)).year >= year);
    return {
      monthEpochMillis: millisReversed.reverse(),
      monthStringToIndex: mapPropNamesToIndex(monthStringsReversed.reverse())
    };
  }));
}

function parseIntlYear(intlParts, calendarIdBase) {
  let era, eraYear, year = parseIntlPartsYear(intlParts);
  if (intlParts.era) {
    const eraOrigins = eraOriginsByCalendarId[calendarIdBase], eraRemaps = eraRemapsByCalendarId[calendarIdBase] || {};
    void 0 !== eraOrigins && (era = "islamic" === calendarIdBase ? "ah" : intlParts.era.normalize("NFD").toLowerCase().replace(/[^a-z0-9]/g, ""), 
    "bc" === era || "b" === era ? era = "bce" : "ad" === era || "a" === era ? era = "ce" : "beforeroc" === era && (era = "broc"), 
    era = eraRemaps[era] || era, eraYear = year, year = eraYearToYear(eraYear, eraOrigins[era] || 0));
  }
  return {
    era: era,
    eraYear: eraYear,
    year: year
  };
}

function parseIntlPartsYear(intlParts) {
  return parseInt(intlParts.relatedYear || intlParts.year);
}

function computeIntlDay(isoFields) {
  return this.queryFields(isoFields).day;
}

function computeIntlDateParts(isoFields) {
  const {year: year, monthString: monthString, day: day} = this.queryFields(isoFields), {monthStringToIndex: monthStringToIndex} = this.queryYearData(year);
  return [ year, monthStringToIndex[monthString] + 1, day ];
}

function computeIsoFieldsFromIntlParts(year, month, day) {
  return epochMilliToIso(computeIntlEpochMilli.call(this, year, month, day));
}

function computeIntlEpochMilli(year, month = 1, day = 1) {
  return this.queryYearData(year).monthEpochMillis[month - 1] + (day - 1) * milliInDay;
}

function computeIntlMonthCodeParts(year, month) {
  const leapMonth = computeIntlLeapMonth.call(this, year);
  return [ monthToMonthCodeNumber(month, leapMonth), leapMonth === month ];
}

function computeIntlLeapMonth(year) {
  const currentMonthStrings = queryMonthStrings(this, year), prevMonthStrings = queryMonthStrings(this, year - 1), currentLength = currentMonthStrings.length;
  if (currentLength > prevMonthStrings.length) {
    const leapMonthMeta = getCalendarLeapMonthMeta(this);
    if (leapMonthMeta < 0) {
      return -leapMonthMeta;
    }
    for (let i = 0; i < currentLength; i++) {
      if (currentMonthStrings[i] !== prevMonthStrings[i]) {
        return i + 1;
      }
    }
  }
}

function computeIntlInLeapYear(year) {
  const days = computeIntlDaysInYear.call(this, year);
  return days > computeIntlDaysInYear.call(this, year - 1) && days > computeIntlDaysInYear.call(this, year + 1);
}

function computeIntlDaysInYear(year) {
  return diffEpochMilliByDay(computeIntlEpochMilli.call(this, year), computeIntlEpochMilli.call(this, year + 1));
}

function computeIntlDaysInMonth(year, month) {
  const {monthEpochMillis: monthEpochMillis} = this.queryYearData(year);
  let nextMonth = month + 1, nextMonthEpochMilli = monthEpochMillis;
  return nextMonth > monthEpochMillis.length && (nextMonth = 1, nextMonthEpochMilli = this.queryYearData(year + 1).monthEpochMillis), 
  diffEpochMilliByDay(monthEpochMillis[month - 1], nextMonthEpochMilli[nextMonth - 1]);
}

function computeIntlMonthsInYear(year) {
  return this.queryYearData(year).monthEpochMillis.length;
}

function computeIntlEraParts(isoFields) {
  const intlFields = this.queryFields(isoFields);
  return [ intlFields.era, intlFields.eraYear ];
}

function computeIntlYearMonthForMonthDay(monthCodeNumber, isLeapMonth, day) {
  const startIsoYear = this.id && "chinese" === computeCalendarIdBase(this.id) ? ((monthCodeNumber, isLeapMonth, day) => {
    if (isLeapMonth) {
      switch (monthCodeNumber) {
       case 1:
        return 1651;

       case 2:
        return day < 30 ? 1947 : 1765;

       case 3:
        return day < 30 ? 1966 : 1955;

       case 4:
        return day < 30 ? 1963 : 1944;

       case 5:
        return day < 30 ? 1971 : 1952;

       case 6:
        return day < 30 ? 1960 : 1941;

       case 7:
        return day < 30 ? 1968 : 1938;

       case 8:
        return day < 30 ? 1957 : 1718;

       case 9:
        return 1832;

       case 10:
        return 1870;

       case 11:
        return 1814;

       case 12:
        return 1890;
      }
    }
    return 1972;
  })(monthCodeNumber, isLeapMonth, day) : isoEpochFirstLeapYear;
  let [startYear, startMonth, startDay] = computeIntlDateParts.call(this, {
    isoYear: startIsoYear,
    isoMonth: isoMonthsInYear,
    isoDay: 31
  });
  const startYearLeapMonth = computeIntlLeapMonth.call(this, startYear), startMonthIsLeap = startMonth === startYearLeapMonth;
  1 === (compareNumbers(monthCodeNumber, monthToMonthCodeNumber(startMonth, startYearLeapMonth)) || compareNumbers(Number(isLeapMonth), Number(startMonthIsLeap)) || compareNumbers(day, startDay)) && startYear--;
  for (let yearMove = 0; yearMove < 100; yearMove++) {
    const tryYear = startYear - yearMove, tryLeapMonth = computeIntlLeapMonth.call(this, tryYear), tryMonth = monthCodeNumberToMonth(monthCodeNumber, isLeapMonth, tryLeapMonth);
    if (isLeapMonth === (tryMonth === tryLeapMonth) && day <= computeIntlDaysInMonth.call(this, tryYear, tryMonth)) {
      return [ tryYear, tryMonth ];
    }
  }
}

function queryMonthStrings(intlCalendar, year) {
  return Object.keys(intlCalendar.queryYearData(year).monthStringToIndex);
}

function resolveCalendarId(id) {
  if ((id = id.toLowerCase()) !== isoCalendarId && id !== gregoryCalendarId) {
    const canonId = queryCalendarIntlFormat(id).resolvedOptions().calendar;
    if (computeCalendarIdBase(id) !== computeCalendarIdBase(canonId)) {
      throw new RangeError(invalidCalendar(id));
    }
    return canonId;
  }
  return id;
}

function computeCalendarIdBase(id) {
  return "islamicc" === id && (id = "islamic"), id.split("-")[0];
}

function createNativeOpsCreator(isoOps, intlOps) {
  return calendarId => calendarId === isoCalendarId ? isoOps : calendarId === gregoryCalendarId || "japanese" === calendarId ? Object.assign(Object.create(isoOps), {
    id: calendarId
  }) : Object.assign(Object.create(intlOps), queryIntlCalendar(calendarId));
}

function refineCalendarFields(calendarOps, bag, validFieldNames, requiredFieldNames = [], forcedValidFieldNames = []) {
  return refineFields(bag, [ ...calendarOps.fields(validFieldNames), ...forcedValidFieldNames ].sort(), requiredFieldNames);
}

function refineFields(bag, validFieldNames, requiredFieldNames, disallowEmpty = !requiredFieldNames) {
  const res = {};
  let prevFieldName, anyMatching = 0;
  for (const fieldName of validFieldNames) {
    if (fieldName === prevFieldName) {
      throw new RangeError(duplicateFields(fieldName));
    }
    if ("constructor" === fieldName || "__proto__" === fieldName) {
      throw new RangeError(forbiddenField(fieldName));
    }
    let fieldVal = bag[fieldName];
    if (void 0 !== fieldVal) {
      anyMatching = 1, builtinRefiners[fieldName] && (fieldVal = builtinRefiners[fieldName](fieldVal, fieldName)), 
      res[fieldName] = fieldVal;
    } else if (requiredFieldNames) {
      if (requiredFieldNames.includes(fieldName)) {
        throw new TypeError(missingField(fieldName));
      }
      res[fieldName] = timeFieldDefaults[fieldName];
    }
    prevFieldName = fieldName;
  }
  if (disallowEmpty && !anyMatching) {
    throw new TypeError(noValidFields(validFieldNames));
  }
  return res;
}

function refineTimeBag(fields, overflow) {
  return constrainIsoTimeFields(timeFieldsToIso({
    ...timeFieldDefaults,
    ...fields
  }), overflow);
}

function convertToPlainMonthDay(calendarOps, input) {
  const fields = refineCalendarFields(calendarOps, input, monthCodeDayFieldNames);
  return calendarOps.monthDayFromFields(fields);
}

function convertToPlainYearMonth(calendarOps, input, options) {
  const fields = refineCalendarFields(calendarOps, input, yearMonthCodeFieldNames);
  return calendarOps.yearMonthFromFields(fields, options);
}

function convertToIso(calendarOps, input, inputFieldNames, extra, extraFieldNames) {
  input = pluckProps(inputFieldNames = calendarOps.fields(inputFieldNames), input), 
  extra = refineFields(extra, extraFieldNames = calendarOps.fields(extraFieldNames), []);
  let mergedFields = calendarOps.mergeFields(input, extra);
  return mergedFields = refineFields(mergedFields, [ ...inputFieldNames, ...extraFieldNames ].sort(), []), 
  calendarOps.dateFromFields(mergedFields);
}

function nativeDateFromFields(fields, options) {
  const overflow = refineOverflowOptions(options), year = refineYear(this, fields), month = refineMonth(this, fields, year, overflow), day = refineDay(this, fields, month, year, overflow);
  return createPlainDateSlots(checkIsoDateInBounds(this.isoFields(year, month, day)), this.id || isoCalendarId);
}

function nativeYearMonthFromFields(fields, options) {
  const overflow = refineOverflowOptions(options), year = refineYear(this, fields), month = refineMonth(this, fields, year, overflow);
  return createPlainYearMonthSlots(checkIsoYearMonthInBounds(this.isoFields(year, month, 1)), this.id || isoCalendarId);
}

function nativeMonthDayFromFields(fields, options) {
  const overflow = refineOverflowOptions(options);
  let day, monthCodeNumber, isLeapMonth, yearMaybe = void 0 !== fields.eraYear || void 0 !== fields.year ? refineYear(this, fields) : void 0;
  const isIso = !this.id;
  if (void 0 === yearMaybe && isIso && (yearMaybe = isoEpochFirstLeapYear), void 0 !== yearMaybe) {
    const month = refineMonth(this, fields, yearMaybe, overflow);
    day = refineDay(this, fields, month, yearMaybe, overflow);
    const leapMonth = this.leapMonth(yearMaybe);
    monthCodeNumber = monthToMonthCodeNumber(month, leapMonth), isLeapMonth = month === leapMonth;
  } else {
    if (void 0 === fields.monthCode) {
      throw new TypeError(missingMonth);
    }
    if ([monthCodeNumber, isLeapMonth] = parseMonthCode(fields.monthCode), this.id && this.id !== gregoryCalendarId && "japanese" !== this.id) {
      if (this.id && "coptic" === computeCalendarIdBase(this.id) && 0 === overflow) {
        const maxLengthOfMonthCodeInAnyYear = isLeapMonth || 13 !== monthCodeNumber ? 30 : 6;
        day = fields.day, day = clampNumber(day, 1, maxLengthOfMonthCodeInAnyYear);
      } else if (this.id && "chinese" === computeCalendarIdBase(this.id) && 0 === overflow) {
        const maxLengthOfMonthCodeInAnyYear = !isLeapMonth || 1 !== monthCodeNumber && 9 !== monthCodeNumber && 10 !== monthCodeNumber && 11 !== monthCodeNumber && 12 !== monthCodeNumber ? 30 : 29;
        day = fields.day, day = clampNumber(day, 1, maxLengthOfMonthCodeInAnyYear);
      } else {
        day = fields.day;
      }
    } else {
      day = refineDay(this, fields, refineMonth(this, fields, isoEpochFirstLeapYear, overflow), isoEpochFirstLeapYear, overflow);
    }
  }
  const res = this.yearMonthForMonthDay(monthCodeNumber, isLeapMonth, day);
  if (!res) {
    throw new RangeError("Cannot guess year");
  }
  const [finalYear, finalMonth] = res;
  return createPlainMonthDaySlots(checkIsoDateInBounds(this.isoFields(finalYear, finalMonth, day)), this.id || isoCalendarId);
}

function nativeFieldsMethod(fieldNames) {
  return getCalendarEraOrigins(this) && fieldNames.includes("year") ? [ ...fieldNames, ...eraYearFieldNames ] : fieldNames;
}

function nativeMergeFields(baseFields, additionalFields) {
  const merged = Object.assign(Object.create(null), baseFields);
  return spliceFields(merged, additionalFields, monthFieldNames), getCalendarEraOrigins(this) && (spliceFields(merged, additionalFields, allYearFieldNames), 
  "japanese" === this.id && spliceFields(merged, additionalFields, monthDayFieldNames, eraYearFieldNames)), 
  merged;
}

function refineYear(calendarNative, fields) {
  const eraOrigins = getCalendarEraOrigins(calendarNative), eraRemaps = eraRemapsByCalendarId[calendarNative.id || ""] || {};
  let {era: era, eraYear: eraYear, year: year} = fields;
  if (void 0 !== era || void 0 !== eraYear) {
    if (void 0 === era || void 0 === eraYear) {
      throw new TypeError(mismatchingEraParts);
    }
    if (!eraOrigins) {
      throw new RangeError(forbiddenEraParts);
    }
    const eraOrigin = eraOrigins[eraRemaps[era] || era];
    if (void 0 === eraOrigin) {
      throw new RangeError(invalidEra(era));
    }
    const yearByEra = eraYearToYear(eraYear, eraOrigin);
    if (void 0 !== year && year !== yearByEra) {
      throw new RangeError(mismatchingYearAndEra);
    }
    year = yearByEra;
  } else if (void 0 === year) {
    throw new TypeError(missingYear(eraOrigins));
  }
  return year;
}

function refineMonth(calendarNative, fields, year, overflow) {
  let {month: month, monthCode: monthCode} = fields;
  if (void 0 !== monthCode) {
    const monthByCode = ((calendarNative, monthCode, year, overflow) => {
      const leapMonth = calendarNative.leapMonth(year), [monthCodeNumber, wantsLeapMonth] = parseMonthCode(monthCode);
      let month = monthCodeNumberToMonth(monthCodeNumber, wantsLeapMonth, leapMonth);
      if (wantsLeapMonth) {
        const leapMonthMeta = getCalendarLeapMonthMeta(calendarNative);
        if (void 0 === leapMonthMeta) {
          throw new RangeError(invalidLeapMonth);
        }
        if (leapMonthMeta > 0) {
          if (month > leapMonthMeta) {
            throw new RangeError(invalidLeapMonth);
          }
          if (void 0 === leapMonth) {
            if (1 === overflow) {
              throw new RangeError(invalidLeapMonth);
            }
            month--;
          }
        } else {
          if (month !== -leapMonthMeta) {
            throw new RangeError(invalidLeapMonth);
          }
          if (void 0 === leapMonth && 1 === overflow) {
            throw new RangeError(invalidLeapMonth);
          }
        }
      }
      return month;
    })(calendarNative, monthCode, year, overflow);
    if (void 0 !== month && month !== monthByCode) {
      throw new RangeError(mismatchingMonthAndCode);
    }
    month = monthByCode, overflow = 1;
  } else if (void 0 === month) {
    throw new TypeError(missingMonth);
  }
  return clampEntity("month", month, 1, calendarNative.monthsInYearPart(year), overflow);
}

function refineDay(calendarNative, fields, month, year, overflow) {
  return clampProp(fields, "day", 1, calendarNative.daysInMonthParts(year, month), overflow);
}

function spliceFields(dest, additional, allPropNames, deletablePropNames) {
  let anyMatching = 0;
  const nonMatchingPropNames = [];
  for (const propName of allPropNames) {
    void 0 !== additional[propName] ? anyMatching = 1 : nonMatchingPropNames.push(propName);
  }
  if (Object.assign(dest, additional), anyMatching) {
    for (const deletablePropName of deletablePropNames || nonMatchingPropNames) {
      delete dest[deletablePropName];
    }
  }
}

function computeDateEssentials(slots) {
  const calendarOps = createNativePartOps(slots.calendar), [year, month, day] = calendarOps.dateParts(slots), [monthCodeNumber, isLeapMonth] = calendarOps.monthCodeParts(year, month);
  return {
    year: year,
    monthCode: formatMonthCode(monthCodeNumber, isLeapMonth),
    day: day
  };
}

function createOptionsTransformer(standardNames, fallbacks, exclusions) {
  const excludedNameSet = new Set(exclusions);
  return (options, strictOptions) => {
    const hasAnyExclusions = exclusions && hasAnyPropsByName(options, exclusions);
    if (!hasAnyPropsByName(options = ((propNames, props) => {
      const filteredProps = {};
      for (const propName in props) {
        propNames.has(propName) || (filteredProps[propName] = props[propName]);
      }
      return filteredProps;
    })(excludedNameSet, options), standardNames)) {
      if (strictOptions && hasAnyExclusions) {
        throw new TypeError("Invalid formatting options");
      }
      options = {
        ...fallbacks,
        ...options
      };
    }
    return exclusions && (options.timeZone = utcTimeZoneId, [ "full", "long" ].includes(options.timeStyle) && (options.timeStyle = "medium")), 
    options;
  };
}

function createFormatForPrep(forcedTimeZoneId, locales, options, transformOptions, strictOptions) {
  if (options = transformOptions(options, strictOptions), forcedTimeZoneId) {
    if (void 0 !== options.timeZone) {
      throw new TypeError(forbiddenFormatTimeZone);
    }
    options.timeZone = forcedTimeZoneId;
  }
  return new RawDateTimeFormat(locales, options);
}

function toEpochMillis(config, resolvedOptions, slotsList) {
  const [, slotsToEpochMilli, strictCalendarCheck] = config;
  return slotsList.map((slots => (slots.calendar && ((internalCalendarId, resolvedCalendarId, strictCalendarCheck) => {
    if ((strictCalendarCheck || internalCalendarId !== isoCalendarId) && internalCalendarId !== resolvedCalendarId) {
      throw new RangeError(mismatchingCalendars);
    }
  })(slots.calendar, resolvedOptions.calendar, strictCalendarCheck), slotsToEpochMilli(slots, resolvedOptions))));
}

function getPreferredCalendarId(a, b) {
  if (a === b) {
    return a;
  }
  if (a === b || a === isoCalendarId) {
    return b;
  }
  if (b === isoCalendarId) {
    return a;
  }
  throw new RangeError(mismatchingCalendars);
}

function getCurrentEpochNano() {
  return numberToBigNano(Date.now(), nanoInMilli);
}

const expectedInteger = (entityName, num) => `Non-integer ${entityName}: ${num}`, expectedPositive = (entityName, num) => `Non-positive ${entityName}: ${num}`, expectedFinite = (entityName, num) => `Non-finite ${entityName}: ${num}`, forbiddenBigIntToNumber = entityName => `Cannot convert bigint to ${entityName}`, invalidBigInt = arg => `Invalid bigint: ${arg}`, forbiddenSymbolToString = "Cannot convert Symbol to string", invalidObject = "Invalid object", numberOutOfRange = (entityName, val, min, max, choices) => choices ? numberOutOfRange(entityName, choices[val], choices[min], choices[max]) : invalidEntity(entityName, val) + `; must be between ${min}-${max}`, invalidEntity = (fieldName, val) => `Invalid ${fieldName}: ${val}`, missingField = fieldName => `Missing ${fieldName}`, forbiddenField = fieldName => `Invalid field ${fieldName}`, duplicateFields = fieldName => `Duplicate field ${fieldName}`, noValidFields = validFields => "No valid fields: " + validFields.join(), invalidChoice = (fieldName, val, choiceMap) => invalidEntity(fieldName, val) + "; must be " + Object.keys(choiceMap).join(), forbiddenEraParts = "Forbidden era/eraYear", mismatchingEraParts = "Mismatching era/eraYear", mismatchingYearAndEra = "Mismatching year/eraYear", invalidEra = era => `Invalid era: ${era}`, missingYear = allowEra => "Missing year" + (allowEra ? "/era/eraYear" : ""), invalidMonthCode = monthCode => `Invalid monthCode: ${monthCode}`, mismatchingMonthAndCode = "Mismatching month/monthCode", missingMonth = "Missing month/monthCode", invalidLeapMonth = "Invalid leap month", invalidProtocolResults = "Invalid protocol results", invalidCalendar = calendarId => invalidEntity("Calendar", calendarId), mismatchingCalendars = "Mismatching Calendars", invalidTimeZone = calendarId => invalidEntity("TimeZone", calendarId), mismatchingTimeZones = "Mismatching TimeZones", forbiddenIcuTimeZone = "Forbidden ICU TimeZone", outOfBoundsOffset = "Out-of-bounds offset", outOfBoundsDstGap = "Out-of-bounds TimeZone gap", invalidOffsetForTimeZone = "Invalid TimeZone offset", ambigOffset = "Ambiguous offset", outOfBoundsDate = "Out-of-bounds date", outOfBoundsDuration = "Out-of-bounds duration", forbiddenDurationSigns = "Cannot mix duration signs", flippedSmallestLargestUnit = "smallestUnit > largestUnit", failedParse = s => `Cannot parse: ${s}`, invalidSubstring = substring => `Invalid substring: ${substring}`, forbiddenFormatTimeZone = "Cannot specify TimeZone", mapPropNamesToIndex = bindArgs(mapPropNames, ((_propVal, i) => i)), mapPropNamesToConstant = bindArgs(mapPropNames, ((_propVal, _i, constant) => constant)), padNumber2 = bindArgs(padNumber, 2), unitNameMap = {
  nanosecond: 0,
  microsecond: 1,
  millisecond: 2,
  second: 3,
  minute: 4,
  hour: 5,
  day: 6,
  week: 7,
  month: 8,
  year: 9
}, unitNamesAsc = Object.keys(unitNameMap), milliInDay = 864e5, milliInSec = 1e3, nanoInMicro = 1e3, nanoInMilli = 1e6, nanoInSec = 1e9, nanoInMinute = 6e10, nanoInHour = 36e11, nanoInUtcDay = 864e11, unitNanoMap = [ 1, nanoInMicro, nanoInMilli, nanoInSec, nanoInMinute, nanoInHour, nanoInUtcDay ], timeFieldNamesAsc = unitNamesAsc.slice(0, 6), timeFieldNamesAlpha = sortStrings(timeFieldNamesAsc), timeZoneFieldNames = [ "timeZone" ], timeAndOffsetFieldNames = [ ...timeFieldNamesAsc, "offset" ], timeAndZoneFieldNames = [ ...timeAndOffsetFieldNames, ...timeZoneFieldNames ], eraYearFieldNames = [ "era", "eraYear" ], allYearFieldNames = [ ...eraYearFieldNames, "year" ], yearFieldNames = [ "year" ], monthCodeFieldNames = [ "monthCode" ], monthFieldNames = [ "month", ...monthCodeFieldNames ], dayFieldNames = [ "day" ], yearMonthFieldNames = [ ...monthFieldNames, ...yearFieldNames ], yearMonthCodeFieldNames = [ ...monthCodeFieldNames, ...yearFieldNames ], dateFieldNamesAlpha = [ ...dayFieldNames, ...yearMonthFieldNames ], monthDayFieldNames = [ ...dayFieldNames, ...monthFieldNames ], monthCodeDayFieldNames = [ ...dayFieldNames, ...monthCodeFieldNames ], timeFieldDefaults = mapPropNamesToConstant(timeFieldNamesAsc, 0), isoCalendarId = "iso8601", gregoryCalendarId = "gregory", eraOriginsByCalendarId = {
  [gregoryCalendarId]: {
    "gregory-inverse": -1,
    gregory: 0
  },
  japanese: {
    "japanese-inverse": -1,
    japanese: 0,
    meiji: 1867,
    taisho: 1911,
    showa: 1925,
    heisei: 1988,
    reiwa: 2018
  },
  ethiopic: {
    ethioaa: 0,
    ethiopic: 5500
  },
  coptic: {
    "coptic-inverse": -1,
    coptic: 0
  },
  roc: {
    "roc-inverse": -1,
    roc: 0
  },
  buddhist: {
    be: 0
  },
  islamic: {
    ah: 0
  },
  indian: {
    saka: 0
  },
  persian: {
    ap: 0
  }
}, eraRemapsByCalendarId = {
  [gregoryCalendarId]: {
    bce: "gregory-inverse",
    ce: "gregory"
  },
  japanese: {
    bce: "japanese-inverse",
    ce: "japanese"
  },
  ethiopic: {
    era0: "ethioaa",
    era1: "ethiopic"
  },
  coptic: {
    era0: "coptic-inverse",
    era1: "coptic"
  },
  roc: {
    broc: "roc-inverse",
    minguo: "roc"
  }
}, leapMonthMetas = {
  chinese: 13,
  dangi: 13,
  hebrew: -6
}, requireString = bindArgs(requireType, "string"), requireBoolean = bindArgs(requireType, "boolean"), requireNumber = bindArgs(requireType, "number"), durationFieldNamesAsc = unitNamesAsc.map((unitName => unitName + "s")), durationFieldNamesAlpha = sortStrings(durationFieldNamesAsc), durationTimeFieldNamesAsc = durationFieldNamesAsc.slice(0, 6), durationDateFieldNamesAsc = durationFieldNamesAsc.slice(6), durationCalendarFieldNamesAsc = durationDateFieldNamesAsc.slice(1), durationFieldIndexes = mapPropNamesToIndex(durationFieldNamesAsc), durationFieldDefaults = mapPropNamesToConstant(durationFieldNamesAsc, 0), durationTimeFieldDefaults = mapPropNamesToConstant(durationTimeFieldNamesAsc, 0), clearDurationFields = bindArgs(zeroOutProps, durationFieldNamesAsc), isoTimeFieldNamesAsc = [ "isoNanosecond", "isoMicrosecond", "isoMillisecond", "isoSecond", "isoMinute", "isoHour" ], isoDateFieldNamesAsc = [ "isoDay", "isoMonth", "isoYear" ], isoDateTimeFieldNamesAsc = [ ...isoTimeFieldNamesAsc, ...isoDateFieldNamesAsc ], isoDateFieldNamesAlpha = sortStrings(isoDateFieldNamesAsc), isoTimeFieldNamesAlpha = sortStrings(isoTimeFieldNamesAsc), isoDateTimeFieldNamesAlpha = sortStrings(isoDateTimeFieldNamesAsc), isoTimeFieldDefaults = mapPropNamesToConstant(isoTimeFieldNamesAlpha, 0), clearIsoFields = bindArgs(zeroOutProps, isoDateTimeFieldNamesAsc), maxMilli = 1e8 * milliInDay, epochNanoMax = [ 1e8, 0 ], epochNanoMin = [ -1e8, 0 ], isoYearMax = 275760, isoYearMin = -271821, RawDateTimeFormat = Intl.DateTimeFormat, isoEpochOriginYear = 1970, isoEpochFirstLeapYear = 1972, isoMonthsInYear = 12, primaryJapaneseEraMilli = isoArgsToEpochMilli(1868, 9, 8), queryJapaneseEraParts = memoize((isoFields => {
  const epochMilli = isoToEpochMilli(isoFields);
  if (epochMilli < primaryJapaneseEraMilli) {
    const {isoYear: isoYear} = isoFields;
    return isoYear < 1 ? [ "japanese-inverse", 1 - isoYear ] : [ "japanese", isoYear ];
  }
  const intlParts = hashIntlFormatParts(queryCalendarIntlFormat("japanese"), epochMilli), {era: era, eraYear: eraYear} = parseIntlYear(intlParts, "japanese");
  return [ era, eraYear ];
}), WeakMap), smallestUnitStr = "smallestUnit", roundingModeName = "roundingMode", roundingIncName = "roundingIncrement", subsecDigitsName = "fractionalSecondDigits", overflowMap = {
  constrain: 0,
  reject: 1
}, overflowMapNames = Object.keys(overflowMap), directionMap = {
  previous: -1,
  next: 1
}, refineSmallestUnit = bindArgs(refineUnitOption, smallestUnitStr), refineLargestUnit = bindArgs(refineUnitOption, "largestUnit"), refineTotalUnit = bindArgs(refineUnitOption, "unit"), refineOverflow = bindArgs(refineChoiceOption, "overflow", overflowMap), refineEpochDisambig = bindArgs(refineChoiceOption, "disambiguation", {
  compatible: 0,
  reject: 1,
  earlier: 2,
  later: 3
}), refineOffsetDisambig = bindArgs(refineChoiceOption, "offset", {
  reject: 0,
  use: 1,
  prefer: 2,
  ignore: 3
}), refineCalendarDisplay = bindArgs(refineChoiceOption, "calendarName", {
  auto: 0,
  never: 1,
  critical: 2,
  always: 3
}), refineTimeZoneDisplay = bindArgs(refineChoiceOption, "timeZoneName", {
  auto: 0,
  never: 1,
  critical: 2
}), refineOffsetDisplay = bindArgs(refineChoiceOption, "offset", {
  auto: 0,
  never: 1
}), refineRoundingMode = bindArgs(refineChoiceOption, roundingModeName, {
  floor: 0,
  halfFloor: 1,
  ceil: 2,
  halfCeil: 3,
  trunc: 4,
  halfTrunc: 5,
  expand: 6,
  halfExpand: 7,
  halfEven: 8
}), PlainYearMonthBranding = "PlainYearMonth", PlainMonthDayBranding = "PlainMonthDay", PlainDateBranding = "PlainDate", PlainDateTimeBranding = "PlainDateTime", PlainTimeBranding = "PlainTime", ZonedDateTimeBranding = "ZonedDateTime", InstantBranding = "Instant", DurationBranding = "Duration", roundingModeFuncs = [ Math.floor, num => hasHalf(num) ? Math.floor(num) : Math.round(num), Math.ceil, num => hasHalf(num) ? Math.ceil(num) : Math.round(num), Math.trunc, num => hasHalf(num) ? Math.trunc(num) || 0 : Math.round(num), num => num < 0 ? Math.floor(num) : Math.ceil(num), num => Math.sign(num) * Math.round(Math.abs(num)) || 0, num => hasHalf(num) ? (num = Math.trunc(num) || 0) + num % 2 : Math.round(num) ], utcTimeZoneId = "UTC", periodDur = 5184e3, minPossibleTransition = isoArgsToEpochSec(1847), maxPossibleTransition = isoArgsToEpochSec((() => {
  const currentDate = new Date;
  return (0 === currentDate.getTime() ? 2040 : currentDate.getUTCFullYear()) + 10;
})()), trailingZerosRE = /0+$/, zonedEpochSlotsToIso = memoize(((slots, getTimeZoneOps) => {
  const {epochNanoseconds: epochNanoseconds} = slots, offsetNanoseconds = (getTimeZoneOps.getOffsetNanosecondsFor ? getTimeZoneOps : getTimeZoneOps(slots.timeZone)).getOffsetNanosecondsFor(epochNanoseconds), isoDateTimeFields = epochNanoToIso(epochNanoseconds, offsetNanoseconds);
  return {
    calendar: slots.calendar,
    ...isoDateTimeFields,
    offsetNanoseconds: offsetNanoseconds
  };
}), WeakMap), maxCalendarUnit = 2 ** 32 - 1, queryNativeTimeZone = memoize((timeZoneId => {
  const essence = getTimeZoneEssence(timeZoneId);
  return "object" == typeof essence ? new IntlTimeZone(essence) : new FixedTimeZone(essence || 0);
}));

class FixedTimeZone {
  constructor(offsetNano) {
    this.offsetNano = offsetNano;
  }
  getOffsetNanosecondsFor() {
    return this.offsetNano;
  }
  getPossibleInstantsFor(isoDateTimeFields) {
    return (isoFields => {
      const bigNano = isoToEpochNano({
        ...isoFields,
        ...isoTimeFieldDefaults
      });
      if (!bigNano || Math.abs(bigNano[0]) > 1e8) {
        throw new RangeError(outOfBoundsDate);
      }
    })(isoDateTimeFields), [ isoToEpochNanoWithOffset(isoDateTimeFields, this.offsetNano) ];
  }
  getTransition() {}
}

class IntlTimeZone {
  constructor(format) {
    this.tzStore = (computeOffsetSec => {
      function getOffsetSec(epochSec) {
        const clampedEpochSec = clampNumber(epochSec, minTransition, maxTransition), [startEpochSec, endEpochSec] = computePeriod(clampedEpochSec), startOffsetSec = getSample(startEpochSec), endOffsetSec = getSample(endEpochSec);
        return startOffsetSec === endOffsetSec ? startOffsetSec : pinch(getSplit(startEpochSec, endEpochSec), startOffsetSec, endOffsetSec, epochSec);
      }
      function pinch(split, startOffsetSec, endOffsetSec, forEpochSec) {
        let offsetSec, splitDurSec;
        for (;(void 0 === forEpochSec || void 0 === (offsetSec = forEpochSec < split[0] ? startOffsetSec : forEpochSec >= split[1] ? endOffsetSec : void 0)) && (splitDurSec = split[1] - split[0]); ) {
          const middleEpochSec = split[0] + Math.floor(splitDurSec / 2);
          computeOffsetSec(middleEpochSec) === endOffsetSec ? split[1] = middleEpochSec : split[0] = middleEpochSec + 1;
        }
        return offsetSec;
      }
      const getSample = memoize(computeOffsetSec), getSplit = memoize(createSplitTuple);
      let minTransition = minPossibleTransition, maxTransition = maxPossibleTransition;
      return {
        getPossibleEpochSec(zonedEpochSec) {
          const wideOffsetSec0 = getOffsetSec(zonedEpochSec - 86400), wideOffsetSec1 = getOffsetSec(zonedEpochSec + 86400), wideUtcEpochSec0 = zonedEpochSec - wideOffsetSec0, wideUtcEpochSec1 = zonedEpochSec - wideOffsetSec1;
          if (wideOffsetSec0 === wideOffsetSec1) {
            return [ wideUtcEpochSec0 ];
          }
          const narrowOffsetSec0 = getOffsetSec(wideUtcEpochSec0);
          return narrowOffsetSec0 === getOffsetSec(wideUtcEpochSec1) ? [ zonedEpochSec - narrowOffsetSec0 ] : wideOffsetSec0 > wideOffsetSec1 ? [ wideUtcEpochSec0, wideUtcEpochSec1 ] : [];
        },
        getOffsetSec: getOffsetSec,
        getTransition(epochSec, direction) {
          const clampedEpochSec = clampNumber(epochSec, minTransition, maxTransition);
          let [startEpochSec, endEpochSec] = computePeriod(clampedEpochSec);
          const inc = periodDur * direction, inBounds = direction < 0 ? () => endEpochSec > minTransition || (minTransition = clampedEpochSec, 
          0) : () => startEpochSec < maxTransition || (maxTransition = clampedEpochSec, 0);
          for (;inBounds(); ) {
            const startOffsetSec = getSample(startEpochSec), endOffsetSec = getSample(endEpochSec);
            if (startOffsetSec !== endOffsetSec) {
              const split = getSplit(startEpochSec, endEpochSec);
              pinch(split, startOffsetSec, endOffsetSec);
              const transitionEpochSec = split[0];
              if ((compareNumbers(transitionEpochSec, epochSec) || 1) === direction) {
                return transitionEpochSec;
              }
            }
            startEpochSec += inc, endEpochSec += inc;
          }
        }
      };
    })((format => epochSec => {
      const intlParts = hashIntlFormatParts(format, epochSec * milliInSec);
      return isoArgsToEpochSec(parseIntlPartsYear(intlParts), parseInt(intlParts.month), parseInt(intlParts.day), parseInt(intlParts.hour), parseInt(intlParts.minute), parseInt(intlParts.second)) - epochSec;
    })(format));
  }
  getOffsetNanosecondsFor(epochNano) {
    return this.tzStore.getOffsetSec(epochNanoToSec(epochNano)) * nanoInSec;
  }
  getPossibleInstantsFor(isoFields) {
    const [zonedEpochSec, subsecNano] = [ isoArgsToEpochSec((isoDateTimeFields = isoFields).isoYear, isoDateTimeFields.isoMonth, isoDateTimeFields.isoDay, isoDateTimeFields.isoHour, isoDateTimeFields.isoMinute, isoDateTimeFields.isoSecond), isoDateTimeFields.isoMillisecond * nanoInMilli + isoDateTimeFields.isoMicrosecond * nanoInMicro + isoDateTimeFields.isoNanosecond ];
    var isoDateTimeFields;
    return this.tzStore.getPossibleEpochSec(zonedEpochSec).map((epochSec => checkEpochNanoInBounds(moveBigNano(numberToBigNano(epochSec, nanoInSec), subsecNano))));
  }
  getTransition(epochNano, direction) {
    const [epochSec, subsecNano] = epochNanoToSecMod(epochNano), resEpochSec = this.tzStore.getTransition(epochSec + (direction > 0 || subsecNano ? 1 : 0), direction);
    if (void 0 !== resEpochSec) {
      return numberToBigNano(resEpochSec, nanoInSec);
    }
  }
}

const timeRegExpStr = "(\\d{2})(?::?(\\d{2})(?::?(\\d{2})(?:[.,](\\d{1,9}))?)?)?", offsetRegExpStr = "([+-])" + timeRegExpStr, dateTimeRegExpStr = "(?:(?:([+-])(\\d{6}))|(\\d{4}))-?(\\d{2})-?(\\d{2})(?:[T ]" + timeRegExpStr + "(Z|" + offsetRegExpStr + ")?)?", yearMonthRegExp = createRegExp("(?:(?:([+-])(\\d{6}))|(\\d{4}))-?(\\d{2})((?:\\[(!?)([^\\]]*)\\]){0,9})"), monthDayRegExp = createRegExp("(?:--)?(\\d{2})-?(\\d{2})((?:\\[(!?)([^\\]]*)\\]){0,9})"), dateTimeRegExp = createRegExp(dateTimeRegExpStr + "((?:\\[(!?)([^\\]]*)\\]){0,9})"), timeRegExp = createRegExp("T?" + timeRegExpStr + "(?:" + offsetRegExpStr + ")?((?:\\[(!?)([^\\]]*)\\]){0,9})"), offsetRegExp = createRegExp(offsetRegExpStr), annotationRegExp = new RegExp("\\[(!?)([^\\]]*)\\]", "g"), durationRegExp = createRegExp("([+-])?P(\\d+Y)?(\\d+M)?(\\d+W)?(\\d+D)?(?:T(?:(\\d+)(?:[.,](\\d{1,9}))?H)?(?:(\\d+)(?:[.,](\\d{1,9}))?M)?(?:(\\d+)(?:[.,](\\d{1,9}))?S)?)?"), queryTimeZoneIntlFormat = memoize((id => new RawDateTimeFormat("en", {
  calendar: isoCalendarId,
  timeZone: id,
  era: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: 0
}))), icuRegExp = /^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/, badCharactersRegExp = /[^\w\/:+-]+/, monthCodeRegExp = /^M(\d{2})(L?)$/, queryIntlCalendar = memoize((calendarId => {
  function epochMilliToIntlFields(epochMilli) {
    return ((intlParts, calendarIdBase) => ({
      ...parseIntlYear(intlParts, calendarIdBase),
      monthString: intlParts.month,
      day: parseInt(intlParts.day)
    }))(hashIntlFormatParts(intlFormat, epochMilli), calendarIdBase);
  }
  const intlFormat = queryCalendarIntlFormat(calendarId), calendarIdBase = computeCalendarIdBase(calendarId);
  return {
    id: calendarId,
    queryFields: createIntlFieldCache(epochMilliToIntlFields),
    queryYearData: createIntlYearDataCache(epochMilliToIntlFields)
  };
})), queryCalendarIntlFormat = memoize((id => new RawDateTimeFormat("en", {
  calendar: id,
  timeZone: utcTimeZoneId,
  era: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour12: 0
}))), nativeYearMonthRefineBase = {
  yearMonthFromFields: nativeYearMonthFromFields,
  fields: nativeFieldsMethod
}, nativeDateRefineBase = {
  dateFromFields: nativeDateFromFields,
  fields: nativeFieldsMethod
}, nativeMonthDayRefineBase = {
  monthDayFromFields: nativeMonthDayFromFields,
  fields: nativeFieldsMethod
}, nativeMoveBase = {
  dateAdd: nativeDateAdd
}, nativeDiffBase = {
  dateAdd: nativeDateAdd,
  dateUntil: nativeDateUntil
}, nativeStandardBase = {
  dateAdd: nativeDateAdd,
  dateUntil: nativeDateUntil,
  dateFromFields: nativeDateFromFields,
  yearMonthFromFields: nativeYearMonthFromFields,
  monthDayFromFields: nativeMonthDayFromFields,
  fields: nativeFieldsMethod,
  mergeFields: nativeMergeFields,
  inLeapYear: computeNativeInLeapYear,
  monthsInYear: computeNativeMonthsInYear,
  daysInMonth: computeNativeDaysInMonth,
  daysInYear: computeNativeDaysInYear,
  dayOfYear: computeNativeDayOfYear,
  era(isoFields) {
    return this.eraParts(isoFields)[0];
  },
  eraYear(isoFields) {
    return this.eraParts(isoFields)[1];
  },
  monthCode(isoFields) {
    const [year, month] = this.dateParts(isoFields), [monthCodeNumber, isLeapMonth] = this.monthCodeParts(year, month);
    return formatMonthCode(monthCodeNumber, isLeapMonth);
  },
  dayOfWeek: computeIsoDayOfWeek,
  daysInWeek: computeIsoDaysInWeek
}, isoYearMonthRefineDeps = {
  leapMonth: noop,
  monthsInYearPart: computeIsoMonthsInYear,
  isoFields: computeIsoFieldsFromParts
}, isoMonthDayRefineDeps = {
  ...{
    ...isoYearMonthRefineDeps,
    daysInMonthParts: computeIsoDaysInMonth
  },
  yearMonthForMonthDay: computeIsoYearMonthForMonthDay
}, isoYearMonthRefineOps = {
  ...nativeYearMonthRefineBase,
  ...isoYearMonthRefineDeps
}, isoDateRefineOps = {
  ...nativeDateRefineBase,
  ...isoMonthDayRefineDeps
}, isoMonthDayRefineOps = {
  ...nativeMonthDayRefineBase,
  ...isoMonthDayRefineDeps
}, isoYearMonthModOps = {
  ...isoYearMonthRefineOps,
  mergeFields: nativeMergeFields
}, isoDateModOps = {
  ...isoDateRefineOps,
  mergeFields: nativeMergeFields
}, isoMonthDayModOps = {
  ...isoMonthDayRefineOps,
  mergeFields: nativeMergeFields
}, isoConvertOps = {
  dateParts: computeIsoDateParts,
  epochMilli: isoArgsToEpochMilli,
  monthAdd: isoMonthAdd
}, isoMoveOpsOnly = {
  ...isoConvertOps,
  monthCodeParts: computeIsoMonthCodeParts,
  monthsInYearPart: computeIsoMonthsInYear,
  daysInMonthParts: computeIsoDaysInMonth,
  leapMonth: noop
}, isoMoveOps = {
  ...nativeMoveBase,
  ...isoMoveOpsOnly
}, isoDiffOps = {
  ...nativeDiffBase,
  ...isoMoveOpsOnly,
  monthsInYearSpan: computeIsoMonthsInYearSpan
}, isoDayOps = {
  day: computeIsoDay
}, isoYearMonthMoveOps = {
  ...isoMoveOps,
  ...isoDayOps
}, isoYearMonthDiffOps = {
  ...isoDiffOps,
  ...isoDayOps
}, isoPartOps = {
  dateParts: computeIsoDateParts,
  eraParts: computeIsoEraParts,
  monthCodeParts: computeIsoMonthCodeParts
}, isoInLeapYearOps = {
  inLeapYear: computeNativeInLeapYear,
  dateParts: computeIsoDateParts,
  inLeapYearPart: computeIsoInLeapYear
}, isoMonthsInYearOps = {
  monthsInYear: computeNativeMonthsInYear,
  dateParts: computeIsoDateParts,
  monthsInYearPart: computeIsoMonthsInYear
}, isoDaysInMonthOps = {
  daysInMonth: computeNativeDaysInMonth,
  dateParts: computeIsoDateParts,
  daysInMonthParts: computeIsoDaysInMonth
}, isoDaysInYearOps = {
  daysInYear: computeNativeDaysInYear,
  dateParts: computeIsoDateParts,
  daysInYearPart: computeIsoDaysInYear
}, isoDayOfYearOps = {
  dayOfYear: computeNativeDayOfYear,
  dateParts: computeIsoDateParts,
  epochMilli: isoArgsToEpochMilli
}, isoWeekOps = {
  ...isoDayOfYearOps,
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek,
  weekParts(isoDateFields) {
    function computeWeekShift(yDayOfWeek) {
      return (7 - yDayOfWeek < minDaysInWeek ? 7 : 0) - yDayOfWeek;
    }
    function computeWeeksInYear(delta) {
      const daysInYear = computeIsoDaysInYear(yearOfWeek + delta), sign = delta || 1, y1WeekShift = computeWeekShift(modFloor(y0DayOfWeek + daysInYear * sign, 7));
      return weeksInYear = (daysInYear + (y1WeekShift - y0WeekShift) * sign) / 7;
    }
    const minDaysInWeek = this.id ? 1 : 4, isoDayOfWeek = computeIsoDayOfWeek(isoDateFields), isoDayOfYear = this.dayOfYear(isoDateFields), dayOfWeek = modFloor(isoDayOfWeek - 1, 7), dayOfYear = isoDayOfYear - 1, y0DayOfWeek = modFloor(dayOfWeek - dayOfYear, 7), y0WeekShift = computeWeekShift(y0DayOfWeek);
    let weeksInYear, weekOfYear = Math.floor((dayOfYear - y0WeekShift) / 7) + 1, yearOfWeek = isoDateFields.isoYear;
    return weekOfYear ? weekOfYear > computeWeeksInYear(0) && (weekOfYear = 1, yearOfWeek++) : (weekOfYear = computeWeeksInYear(-1), 
    yearOfWeek--), [ weekOfYear, yearOfWeek, weeksInYear ];
  }
}, isoMonthDayParseOps = {
  dateParts: computeIsoDateParts,
  monthCodeParts: computeIsoMonthCodeParts,
  yearMonthForMonthDay: computeIsoYearMonthForMonthDay,
  isoFields: computeIsoFieldsFromParts
}, isoStandardOps = {
  ...nativeStandardBase,
  ...isoWeekOps,
  dateParts: computeIsoDateParts,
  eraParts: computeIsoEraParts,
  monthCodeParts: computeIsoMonthCodeParts,
  yearMonthForMonthDay: computeIsoYearMonthForMonthDay,
  inLeapYearPart: computeIsoInLeapYear,
  leapMonth: noop,
  monthsInYearPart: computeIsoMonthsInYear,
  monthsInYearSpan: computeIsoMonthsInYearSpan,
  daysInMonthParts: computeIsoDaysInMonth,
  daysInYearPart: computeIsoDaysInYear,
  isoFields: computeIsoFieldsFromParts,
  epochMilli: isoArgsToEpochMilli,
  monthAdd: isoMonthAdd,
  year(isoFields) {
    return isoFields.isoYear;
  },
  month(isoFields) {
    return isoFields.isoMonth;
  },
  day: computeIsoDay
}, intlYearMonthRefineDeps = {
  leapMonth: computeIntlLeapMonth,
  monthsInYearPart: computeIntlMonthsInYear,
  isoFields: computeIsoFieldsFromIntlParts
}, intlDateRefineDeps = {
  ...intlYearMonthRefineDeps,
  daysInMonthParts: computeIntlDaysInMonth
}, intlMonthDayRefineDeps = {
  ...intlDateRefineDeps,
  yearMonthForMonthDay: computeIntlYearMonthForMonthDay
}, intlYearMonthRefineOps = {
  ...nativeYearMonthRefineBase,
  ...intlYearMonthRefineDeps
}, intlDateRefineOps = {
  ...nativeDateRefineBase,
  ...intlDateRefineDeps
}, intlMonthDayRefineOps = {
  ...nativeMonthDayRefineBase,
  ...intlMonthDayRefineDeps
}, intlYearMonthModOps = {
  ...intlYearMonthRefineOps,
  mergeFields: nativeMergeFields
}, intlDateModOps = {
  ...intlDateRefineOps,
  mergeFields: nativeMergeFields
}, intlMonthDayModOps = {
  ...intlMonthDayRefineOps,
  mergeFields: nativeMergeFields
}, intlConvertOps = {
  dateParts: computeIntlDateParts,
  epochMilli: computeIntlEpochMilli,
  monthAdd: intlMonthAdd
}, intlMoveOpsOnly = {
  ...intlConvertOps,
  monthCodeParts: computeIntlMonthCodeParts,
  monthsInYearPart: computeIntlMonthsInYear,
  daysInMonthParts: computeIntlDaysInMonth,
  leapMonth: computeIntlLeapMonth
}, intlMoveOps = {
  ...nativeMoveBase,
  ...intlMoveOpsOnly
}, intlDiffOps = {
  ...nativeDiffBase,
  ...intlMoveOpsOnly,
  monthsInYearSpan: computeIntlMonthsInYearSpan
}, intlDayOps = {
  day: computeIntlDay
}, intlYearMonthMoveOps = {
  ...intlMoveOps,
  ...intlDayOps
}, intlYearMonthDiffOps = {
  ...intlDiffOps,
  ...intlDayOps
}, intlPartOps = {
  dateParts: computeIntlDateParts,
  eraParts: computeIntlEraParts,
  monthCodeParts: computeIntlMonthCodeParts
}, intlInLeapYearOps = {
  inLeapYear: computeNativeInLeapYear,
  dateParts: computeIntlDateParts,
  inLeapYearPart: computeIntlInLeapYear
}, intlMonthsInYearOps = {
  monthsInYear: computeNativeMonthsInYear,
  dateParts: computeIntlDateParts,
  monthsInYearPart: computeIntlMonthsInYear
}, intlDaysInMonthOps = {
  daysInMonth: computeNativeDaysInMonth,
  dateParts: computeIntlDateParts,
  daysInMonthParts: computeIntlDaysInMonth
}, intlDaysInYearOps = {
  daysInYear: computeNativeDaysInYear,
  dateParts: computeIntlDateParts,
  daysInYearPart: computeIntlDaysInYear
}, intlDayOfYearOps = {
  dayOfYear: computeNativeDayOfYear,
  dateParts: computeIntlDateParts,
  epochMilli: computeIntlEpochMilli
}, intlWeekOps = {
  ...intlDayOfYearOps,
  weekParts() {
    return [];
  },
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek
}, intlMonthDayParseOps = {
  dateParts: computeIntlDateParts,
  monthCodeParts: computeIntlMonthCodeParts,
  yearMonthForMonthDay: computeIntlYearMonthForMonthDay,
  isoFields: computeIsoFieldsFromIntlParts
}, intlStandardOps = {
  ...nativeStandardBase,
  ...intlWeekOps,
  dateParts: computeIntlDateParts,
  eraParts: computeIntlEraParts,
  monthCodeParts: computeIntlMonthCodeParts,
  yearMonthForMonthDay: computeIntlYearMonthForMonthDay,
  inLeapYearPart: computeIntlInLeapYear,
  leapMonth: computeIntlLeapMonth,
  monthsInYearPart: computeIntlMonthsInYear,
  monthsInYearSpan: computeIntlMonthsInYearSpan,
  daysInMonthParts: computeIntlDaysInMonth,
  daysInYearPart: computeIntlDaysInYear,
  isoFields: computeIsoFieldsFromIntlParts,
  epochMilli: computeIntlEpochMilli,
  monthAdd: intlMonthAdd,
  year(isoFields) {
    return this.queryFields(isoFields).year;
  },
  month(isoFields) {
    const {year: year, monthString: monthString} = this.queryFields(isoFields), {monthStringToIndex: monthStringToIndex} = this.queryYearData(year);
    return monthStringToIndex[monthString] + 1;
  },
  day: computeIntlDay
}, createNativeYearMonthRefineOps = createNativeOpsCreator(isoYearMonthRefineOps, intlYearMonthRefineOps), createNativeDateRefineOps = createNativeOpsCreator(isoDateRefineOps, intlDateRefineOps), createNativeMonthDayRefineOps = createNativeOpsCreator(isoMonthDayRefineOps, intlMonthDayRefineOps), createNativeYearMonthModOps = createNativeOpsCreator(isoYearMonthModOps, intlYearMonthModOps), createNativeDateModOps = createNativeOpsCreator(isoDateModOps, intlDateModOps), createNativeMonthDayModOps = createNativeOpsCreator(isoMonthDayModOps, intlMonthDayModOps), createNativeConvertOps = createNativeOpsCreator(isoConvertOps, intlConvertOps), createNativeMoveOps = createNativeOpsCreator(isoMoveOps, intlMoveOps), createNativeDiffOps = createNativeOpsCreator(isoDiffOps, intlDiffOps), createNativeDayOps = createNativeOpsCreator(isoDayOps, intlDayOps), createNativeYearMonthMoveOps = createNativeOpsCreator(isoYearMonthMoveOps, intlYearMonthMoveOps), createNativeYearMonthDiffOps = createNativeOpsCreator(isoYearMonthDiffOps, intlYearMonthDiffOps), createNativePartOps = createNativeOpsCreator(isoPartOps, intlPartOps), createNativeInLeapYearOps = createNativeOpsCreator(isoInLeapYearOps, intlInLeapYearOps), createNativeMonthsInYearOps = createNativeOpsCreator(isoMonthsInYearOps, intlMonthsInYearOps), createNativeDaysInMonthOps = createNativeOpsCreator(isoDaysInMonthOps, intlDaysInMonthOps), createNativeDaysInYearOps = createNativeOpsCreator(isoDaysInYearOps, intlDaysInYearOps), createNativeDayOfYearOps = createNativeOpsCreator(isoDayOfYearOps, intlDayOfYearOps), createNativeWeekOps = createNativeOpsCreator(isoWeekOps, intlWeekOps), createNativeMonthDayParseOps = createNativeOpsCreator(isoMonthDayParseOps, intlMonthDayParseOps), createNativeStandardOps = createNativeOpsCreator(isoStandardOps, intlStandardOps), builtinRefiners = {
  ...{
    era: toStringViaPrimitive,
    eraYear: toInteger,
    year: toInteger,
    month: toPositiveInteger,
    monthCode(monthCode) {
      const s = toStringViaPrimitive(monthCode);
      return parseMonthCode(s), s;
    },
    day: toPositiveInteger
  },
  ...mapPropNamesToConstant(timeFieldNamesAsc, toInteger),
  ...mapPropNamesToConstant(durationFieldNamesAsc, toStrictInteger),
  ...{
    offset(offsetString) {
      const s = toStringViaPrimitive(offsetString);
      return parseOffsetNano(s), s;
    }
  }
}, timeFieldsToIso = bindArgs(remapProps, timeFieldNamesAsc, isoTimeFieldNamesAsc), isoTimeFieldsToCal = bindArgs(remapProps, isoTimeFieldNamesAsc, timeFieldNamesAsc), timeZoneNameStrs = [ "timeZoneName" ], monthDayFallbacks = {
  month: "numeric",
  day: "numeric"
}, yearMonthFallbacks = {
  year: "numeric",
  month: "numeric"
}, dateFallbacks = {
  ...yearMonthFallbacks,
  day: "numeric"
}, timeFallbacks = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
}, dateTimeFallbacks = {
  ...dateFallbacks,
  ...timeFallbacks
}, zonedFallbacks = {
  ...dateTimeFallbacks,
  timeZoneName: "short"
}, yearMonthFallbackNames = Object.keys(yearMonthFallbacks), monthDayFallbackNames = Object.keys(monthDayFallbacks), dateFallbackNames = Object.keys(dateFallbacks), timeFallbackNames = Object.keys(timeFallbacks), dateStyleNames = [ "dateStyle" ], yearMonthStandardNames = [ ...yearMonthFallbackNames, ...dateStyleNames ], monthDayStandardNames = [ ...monthDayFallbackNames, ...dateStyleNames ], dateStandardNames = [ ...dateFallbackNames, ...dateStyleNames, "weekday" ], timeStandardNames = [ ...timeFallbackNames, "dayPeriod", "timeStyle", "fractionalSecondDigits" ], dateTimeStandardNames = [ ...dateStandardNames, ...timeStandardNames ], dateExclusions = [ ...timeZoneNameStrs, ...timeStandardNames ], timeExclusions = [ ...timeZoneNameStrs, ...dateStandardNames ], yearMonthExclusions = [ ...timeZoneNameStrs, "day", "weekday", ...timeStandardNames ], monthDayExclusions = [ ...timeZoneNameStrs, "year", "weekday", ...timeStandardNames ], transformInstantOptions = createOptionsTransformer(dateTimeStandardNames, dateTimeFallbacks), transformZonedOptions = createOptionsTransformer(dateTimeStandardNames, zonedFallbacks), transformDateTimeOptions = createOptionsTransformer(dateTimeStandardNames, dateTimeFallbacks, timeZoneNameStrs), transformDateOptions = createOptionsTransformer(dateStandardNames, dateFallbacks, dateExclusions), transformTimeOptions = createOptionsTransformer(timeStandardNames, timeFallbacks, timeExclusions), transformYearMonthOptions = createOptionsTransformer(yearMonthStandardNames, yearMonthFallbacks, yearMonthExclusions), transformMonthDayOptions = createOptionsTransformer(monthDayStandardNames, monthDayFallbacks, monthDayExclusions), emptyOptions = {}, nonBuggyIsoResolve = new RawDateTimeFormat(void 0, {
  calendar: isoCalendarId
}).resolvedOptions().calendar === isoCalendarId, instantConfig = [ transformInstantOptions, getEpochMilli ], zonedConfig = [ transformZonedOptions, getEpochMilli, 0, (slots0, slots1) => {
  const timeZoneId = slots0.timeZone;
  if (slots1 && slots1.timeZone !== timeZoneId) {
    throw new RangeError(mismatchingTimeZones);
  }
  return timeZoneId;
} ], dateTimeConfig = [ transformDateTimeOptions, isoToEpochMilli ], dateConfig = [ transformDateOptions, isoToEpochMilli ], timeConfig = [ transformTimeOptions, isoFields => isoTimeFieldsToNano(isoFields) / nanoInMilli ], yearMonthConfig = [ transformYearMonthOptions, isoToEpochMilli, nonBuggyIsoResolve ], monthDayConfig = [ transformMonthDayOptions, isoToEpochMilli, nonBuggyIsoResolve ];

exports.DurationBranding = DurationBranding, exports.InstantBranding = InstantBranding, 
exports.PlainDateBranding = PlainDateBranding, exports.PlainDateTimeBranding = PlainDateTimeBranding, 
exports.PlainMonthDayBranding = PlainMonthDayBranding, exports.PlainTimeBranding = PlainTimeBranding, 
exports.PlainYearMonthBranding = PlainYearMonthBranding, exports.RawDateTimeFormat = RawDateTimeFormat, 
exports.ZonedDateTimeBranding = ZonedDateTimeBranding, exports.absDuration = slots => -1 === slots.sign ? negateDuration(slots) : slots, 
exports.addBigNanos = addBigNanos, exports.addDurations = (refineRelativeTo, getCalendarOps, getTimeZoneOps, doSubtract, slots, otherSlots, options) => {
  const relativeToSlots = refineRelativeTo(normalizeOptions(options).relativeTo), maxUnit = Math.max(getMaxDurationUnit(slots), getMaxDurationUnit(otherSlots));
  if (isUniformUnit(maxUnit, relativeToSlots)) {
    return createDurationSlots(checkDurationUnits(((a, b, largestUnit, doSubtract) => {
      const combined = addBigNanos(durationFieldsToBigNano(a), durationFieldsToBigNano(b), doSubtract ? -1 : 1);
      if (!Number.isFinite(combined[0])) {
        throw new RangeError(outOfBoundsDate);
      }
      return {
        ...durationFieldDefaults,
        ...nanoToDurationDayTimeFields(combined, largestUnit)
      };
    })(slots, otherSlots, maxUnit, doSubtract)));
  }
  if (!relativeToSlots) {
    throw new RangeError("Missing relativeTo");
  }
  doSubtract && (otherSlots = negateDurationFields(otherSlots));
  const [marker, calendarOps, timeZoneOps] = createMarkerSystem(getCalendarOps, getTimeZoneOps, relativeToSlots), moveMarker = createMoveMarker(timeZoneOps), diffMarkers = createDiffMarkers(timeZoneOps), midMarker = moveMarker(calendarOps, marker, slots);
  return createDurationSlots(diffMarkers(calendarOps, marker, moveMarker(calendarOps, midMarker, otherSlots), maxUnit));
}, exports.alignZonedEpoch = alignZonedEpoch, exports.bigNanoToExactDays = bigNanoToExactDays, 
exports.bigNanoToNumber = bigNanoToNumber, exports.bindArgs = bindArgs, exports.buildZonedIsoFields = (getTimeZoneOps, zonedDateTimeSlots) => {
  const isoFields = zonedEpochSlotsToIso(zonedDateTimeSlots, getTimeZoneOps);
  return {
    calendar: zonedDateTimeSlots.calendar,
    ...pluckProps(isoDateTimeFieldNamesAlpha, isoFields),
    offset: formatOffsetNano(isoFields.offsetNanoseconds),
    timeZone: zonedDateTimeSlots.timeZone
  };
}, exports.checkEpochNanoInBounds = checkEpochNanoInBounds, exports.checkIsoDateInBounds = checkIsoDateInBounds, 
exports.checkIsoDateTimeInBounds = checkIsoDateTimeInBounds, exports.clampEntity = clampEntity, 
exports.clearIsoFields = clearIsoFields, exports.compareBigNanos = compareBigNanos, 
exports.compareDurations = (refineRelativeTo, getCalendarOps, getTimeZoneOps, durationSlots0, durationSlots1, options) => {
  const relativeToSlots = refineRelativeTo(normalizeOptions(options).relativeTo), maxUnit = Math.max(getMaxDurationUnit(durationSlots0), getMaxDurationUnit(durationSlots1));
  if (allPropsEqual(durationFieldNamesAsc, durationSlots0, durationSlots1)) {
    return 0;
  }
  if (isUniformUnit(maxUnit, relativeToSlots)) {
    return compareBigNanos(durationFieldsToBigNano(durationSlots0), durationFieldsToBigNano(durationSlots1));
  }
  if (!relativeToSlots) {
    throw new RangeError("Missing relativeTo");
  }
  const [marker, calendarOps, timeZoneOps] = createMarkerSystem(getCalendarOps, getTimeZoneOps, relativeToSlots), markerToEpochNano = createMarkerToEpochNano(timeZoneOps), moveMarker = createMoveMarker(timeZoneOps);
  return compareBigNanos(markerToEpochNano(moveMarker(calendarOps, marker, durationSlots0)), markerToEpochNano(moveMarker(calendarOps, marker, durationSlots1)));
}, exports.compareInstants = compareInstants, exports.compareIsoDateFields = compareIsoDateFields, 
exports.compareIsoDateTimeFields = compareIsoDateTimeFields, exports.compareIsoTimeFields = compareIsoTimeFields, 
exports.compareZonedDateTimes = compareZonedDateTimes, exports.computeDayFloor = computeDayFloor, 
exports.computeEpochNanoFrac = computeEpochNanoFrac, exports.computeIsoDayOfWeek = computeIsoDayOfWeek, 
exports.computeIsoDaysInWeek = computeIsoDaysInWeek, exports.computeZonedHoursInDay = (getTimeZoneOps, slots) => {
  const timeZoneOps = getTimeZoneOps(slots.timeZone), isoFields = zonedEpochSlotsToIso(slots, timeZoneOps), [isoFields0, isoFields1] = computeDayInterval(isoFields), hoursExact = bigNanoToNumber(diffBigNanos(getStartOfDayInstantFor(timeZoneOps, isoFields0), getStartOfDayInstantFor(timeZoneOps, isoFields1)), nanoInHour, 1);
  if (hoursExact <= 0) {
    throw new RangeError(invalidProtocolResults);
  }
  return hoursExact;
}, exports.computeZonedStartOfDay = (getTimeZoneOps, slots) => {
  const {timeZone: timeZone, calendar: calendar} = slots;
  return createZonedDateTimeSlots(alignZonedEpoch(computeDayFloor, getTimeZoneOps(timeZone), slots), timeZone, calendar);
}, exports.constructDurationSlots = (years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, microseconds = 0, nanoseconds = 0) => createDurationSlots(checkDurationUnits(mapProps(toStrictInteger, zipProps(durationFieldNamesAsc, [ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds ])))), 
exports.constructInstantSlots = epochNano => createInstantSlots(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(epochNano)))), 
exports.constructPlainDateSlots = (refineCalendarArg, isoYear, isoMonth, isoDay, calendarArg = isoCalendarId) => createPlainDateSlots(checkIsoDateInBounds(checkIsoDateFields(mapProps(toInteger, {
  isoYear: isoYear,
  isoMonth: isoMonth,
  isoDay: isoDay
}))), refineCalendarArg(calendarArg)), exports.constructPlainDateTimeSlots = (refineCalendarArg, isoYear, isoMonth, isoDay, isoHour = 0, isoMinute = 0, isoSecond = 0, isoMillisecond = 0, isoMicrosecond = 0, isoNanosecond = 0, calendarArg = isoCalendarId) => createPlainDateTimeSlots(checkIsoDateTimeInBounds(checkIsoDateTimeFields(mapProps(toInteger, zipProps(isoDateTimeFieldNamesAsc, [ isoYear, isoMonth, isoDay, isoHour, isoMinute, isoSecond, isoMillisecond, isoMicrosecond, isoNanosecond ])))), refineCalendarArg(calendarArg)), 
exports.constructPlainMonthDaySlots = (refineCalendarArg, isoMonth, isoDay, calendarArg = isoCalendarId, referenceIsoYear = isoEpochFirstLeapYear) => {
  const isoMonthInt = toInteger(isoMonth), isoDayInt = toInteger(isoDay), calendarId = refineCalendarArg(calendarArg);
  return createPlainMonthDaySlots(checkIsoDateInBounds(checkIsoDateFields({
    isoYear: toInteger(referenceIsoYear),
    isoMonth: isoMonthInt,
    isoDay: isoDayInt
  })), calendarId);
}, exports.constructPlainTimeSlots = (isoHour = 0, isoMinute = 0, isoSecond = 0, isoMillisecond = 0, isoMicrosecond = 0, isoNanosecond = 0) => createPlainTimeSlots(constrainIsoTimeFields(mapProps(toInteger, zipProps(isoTimeFieldNamesAsc, [ isoHour, isoMinute, isoSecond, isoMillisecond, isoMicrosecond, isoNanosecond ])), 1)), 
exports.constructPlainYearMonthSlots = (refineCalendarArg, isoYear, isoMonth, calendarArg = isoCalendarId, referenceIsoDay = 1) => {
  const isoYearInt = toInteger(isoYear), isoMonthInt = toInteger(isoMonth), calendarId = refineCalendarArg(calendarArg);
  return createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields({
    isoYear: isoYearInt,
    isoMonth: isoMonthInt,
    isoDay: toInteger(referenceIsoDay)
  })), calendarId);
}, exports.constructZonedDateTimeSlots = (refineCalendarArg, refineTimeZoneArg, epochNano, timeZoneArg, calendarArg = isoCalendarId) => createZonedDateTimeSlots(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(epochNano))), refineTimeZoneArg(timeZoneArg), refineCalendarArg(calendarArg)), 
exports.createDurationSlots = createDurationSlots, exports.createFormatForPrep = createFormatForPrep, 
exports.createFormatPrepper = (config, queryFormat = createFormatForPrep, strictOptions = 0) => {
  const [transformOptions, , , getForcedTimeZoneId] = config;
  return (locales, options = emptyOptions, ...slotsList) => {
    const subformat = queryFormat(getForcedTimeZoneId && getForcedTimeZoneId(...slotsList), locales, options, transformOptions, strictOptions), resolvedOptions = subformat.resolvedOptions();
    return [ subformat, ...toEpochMillis(config, resolvedOptions, slotsList) ];
  };
}, exports.createGetterDescriptors = getters => mapProps((getter => ({
  get: getter,
  configurable: 1
})), getters), exports.createInstantSlots = createInstantSlots, exports.createNameDescriptors = name => createPropDescriptors({
  name: name
}, 1), exports.createNativeConvertOps = createNativeConvertOps, exports.createNativeDateModOps = createNativeDateModOps, 
exports.createNativeDateRefineOps = createNativeDateRefineOps, exports.createNativeDayOfYearOps = createNativeDayOfYearOps, 
exports.createNativeDayOps = createNativeDayOps, exports.createNativeDaysInMonthOps = createNativeDaysInMonthOps, 
exports.createNativeDaysInYearOps = createNativeDaysInYearOps, exports.createNativeDiffOps = createNativeDiffOps, 
exports.createNativeInLeapYearOps = createNativeInLeapYearOps, exports.createNativeMonthDayModOps = createNativeMonthDayModOps, 
exports.createNativeMonthDayParseOps = createNativeMonthDayParseOps, exports.createNativeMonthDayRefineOps = createNativeMonthDayRefineOps, 
exports.createNativeMonthsInYearOps = createNativeMonthsInYearOps, exports.createNativeMoveOps = createNativeMoveOps, 
exports.createNativePartOps = createNativePartOps, exports.createNativeStandardOps = createNativeStandardOps, 
exports.createNativeWeekOps = createNativeWeekOps, exports.createNativeYearMonthDiffOps = createNativeYearMonthDiffOps, 
exports.createNativeYearMonthModOps = createNativeYearMonthModOps, exports.createNativeYearMonthMoveOps = createNativeYearMonthMoveOps, 
exports.createNativeYearMonthRefineOps = createNativeYearMonthRefineOps, exports.createPlainDateSlots = createPlainDateSlots, 
exports.createPlainDateTimeSlots = createPlainDateTimeSlots, exports.createPlainTimeSlots = createPlainTimeSlots, 
exports.createPropDescriptors = createPropDescriptors, exports.createStringTagDescriptors = value => ({
  [Symbol.toStringTag]: {
    value: value,
    configurable: 1
  }
}), exports.createZonedDateTimeSlots = createZonedDateTimeSlots, exports.dateConfig = dateConfig, 
exports.dateTimeConfig = dateTimeConfig, exports.diffBigNanos = diffBigNanos, exports.diffInstants = (invert, instantSlots0, instantSlots1, options) => {
  const optionsTuple = refineDiffOptions(invert, options, 3, 5), durationFields = diffEpochNanos(instantSlots0.epochNanoseconds, instantSlots1.epochNanoseconds, ...optionsTuple);
  return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}, exports.diffPlainDateTimes = (getCalendarOps, invert, plainDateTimeSlots0, plainDateTimeSlots1, options) => {
  const calendarId = getCommonCalendarId(plainDateTimeSlots0.calendar, plainDateTimeSlots1.calendar), [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, options, 6), startEpochNano = isoToEpochNano(plainDateTimeSlots0), endEpochNano = isoToEpochNano(plainDateTimeSlots1), sign = compareBigNanos(endEpochNano, startEpochNano);
  let durationFields;
  if (sign) {
    if (largestUnit <= 6) {
      durationFields = diffEpochNanos(startEpochNano, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode);
    } else {
      const calendarOps = getCalendarOps(calendarId);
      durationFields = diffDateTimesBig(calendarOps, plainDateTimeSlots0, plainDateTimeSlots1, sign, largestUnit, options), 
      durationFields = roundRelativeDuration(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, plainDateTimeSlots0, isoToEpochNano, moveDateTime);
    }
  } else {
    durationFields = durationFieldDefaults;
  }
  return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}, exports.diffPlainDates = (getCalendarOps, invert, plainDateSlots0, plainDateSlots1, options) => {
  const calendarId = getCommonCalendarId(plainDateSlots0.calendar, plainDateSlots1.calendar);
  return diffDateLike(invert, (() => getCalendarOps(calendarId)), plainDateSlots0, plainDateSlots1, ...refineDiffOptions(invert, options, 6, 9, 6));
}, exports.diffPlainTimes = (invert, plainTimeSlots0, plainTimeSlots1, options) => {
  const [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, options, 5, 5), timeDiffNano = roundByInc(diffTimes(plainTimeSlots0, plainTimeSlots1), computeNanoInc(smallestUnit, roundingInc), roundingMode), durationFields = {
    ...durationFieldDefaults,
    ...nanoToDurationTimeFields(timeDiffNano, largestUnit)
  };
  return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}, exports.diffPlainYearMonth = (getCalendarOps, invert, plainYearMonthSlots0, plainYearMonthSlots1, options) => {
  const calendarId = getCommonCalendarId(plainYearMonthSlots0.calendar, plainYearMonthSlots1.calendar), optionsTuple = refineDiffOptions(invert, options, 9, 9, 8), calendarOps = getCalendarOps(calendarId), firstOfMonth0 = moveToDayOfMonthUnsafe(calendarOps, plainYearMonthSlots0), firstOfMonth1 = moveToDayOfMonthUnsafe(calendarOps, plainYearMonthSlots1);
  return firstOfMonth0.isoYear === firstOfMonth1.isoYear && firstOfMonth0.isoMonth === firstOfMonth1.isoMonth && firstOfMonth0.isoDay === firstOfMonth1.isoDay ? createDurationSlots(durationFieldDefaults) : diffDateLike(invert, (() => calendarOps), checkIsoDateInBounds(firstOfMonth0), checkIsoDateInBounds(firstOfMonth1), ...optionsTuple, 8);
}, exports.diffZonedDateTimes = (getCalendarOps, getTimeZoneOps, invert, slots0, slots1, options) => {
  const calendarId = getCommonCalendarId(slots0.calendar, slots1.calendar), [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, options, 5), epochNano0 = slots0.epochNanoseconds, epochNano1 = slots1.epochNanoseconds, sign = compareBigNanos(epochNano1, epochNano0);
  let durationFields;
  if (sign) {
    if (largestUnit < 6) {
      durationFields = diffEpochNanos(epochNano0, epochNano1, largestUnit, smallestUnit, roundingInc, roundingMode);
    } else {
      const timeZoneOps = getTimeZoneOps(getCommonTimeZoneId(slots0.timeZone, slots1.timeZone)), calendarOps = getCalendarOps(calendarId);
      durationFields = diffZonedEpochsBig(calendarOps, timeZoneOps, slots0, slots1, sign, largestUnit, options), 
      durationFields = roundRelativeDuration(durationFields, epochNano1, largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, slots0, extractEpochNano, bindArgs(moveZonedEpochs, timeZoneOps));
    }
  } else {
    durationFields = durationFieldDefaults;
  }
  return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}, exports.durationFieldNamesAsc = durationFieldNamesAsc, exports.durationWithFields = (slots, fields) => {
  return createDurationSlots((initialFields = slots, modFields = fields, checkDurationUnits({
    ...initialFields,
    ...refineFields(modFields, durationFieldNamesAlpha)
  })));
  var initialFields, modFields;
}, exports.epochMicroToInstant = epochMicro => createInstantSlots(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(epochMicro), nanoInMicro))), 
exports.epochMilliToInstant = epochMilli => createInstantSlots(checkEpochNanoInBounds(numberToBigNano(toStrictInteger(epochMilli), nanoInMilli))), 
exports.epochMilliToIso = epochMilliToIso, exports.epochNanoToInstant = epochNano => createInstantSlots(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(epochNano)))), 
exports.epochNanoToIso = epochNanoToIso, exports.epochSecToInstant = epochSec => createInstantSlots(checkEpochNanoInBounds(numberToBigNano(toStrictInteger(epochSec), nanoInSec))), 
exports.extractEpochNano = extractEpochNano, exports.forbiddenValueOf = "Cannot use valueOf", 
exports.formatDurationIso = (slots, options) => {
  const [roundingMode, nanoInc, subsecDigits] = refineTimeDisplayOptions(options, 3);
  return nanoInc > 1 && checkDurationUnits(slots = {
    ...slots,
    ...roundDayTimeDurationByInc(slots, nanoInc, roundingMode)
  }), ((durationSlots, subsecDigits) => {
    const {sign: sign} = durationSlots, abs = -1 === sign ? negateDurationFields(durationSlots) : durationSlots, {hours: hours, minutes: minutes} = abs, [wholeSec, subsecNano] = divModBigNano(durationFieldsToBigNano(abs, 3), nanoInSec, divModTrunc);
    checkDurationTimeUnit(wholeSec);
    const subsecNanoString = formatSubsecNano(subsecNano, subsecDigits), forceSec = subsecDigits >= 0 || !sign || subsecNanoString;
    return (sign < 0 ? "-" : "") + "P" + formatDurationFragments({
      Y: formatDurationNumber(abs.years),
      M: formatDurationNumber(abs.months),
      W: formatDurationNumber(abs.weeks),
      D: formatDurationNumber(abs.days)
    }) + (hours || minutes || wholeSec || forceSec ? "T" + formatDurationFragments({
      H: formatDurationNumber(hours),
      M: formatDurationNumber(minutes),
      S: formatDurationNumber(wholeSec, forceSec) + subsecNanoString
    }) : "");
  })(slots, subsecDigits);
}, exports.formatInstantIso = (refineTimeZoneString, getTimeZoneOps, instantSlots, options) => {
  const [timeZoneArg, roundingMode, nanoInc, subsecDigits] = (options => {
    const timeDisplayTuple = refineTimeDisplayTuple(options = normalizeOptions(options));
    return [ options.timeZone, ...timeDisplayTuple ];
  })(options), providedTimeZone = void 0 !== timeZoneArg;
  return ((providedTimeZone, timeZoneOps, epochNano, roundingMode, nanoInc, subsecDigits) => {
    epochNano = roundBigNanoByInc(epochNano, nanoInc, roundingMode, 1);
    const offsetNano = timeZoneOps.getOffsetNanosecondsFor(epochNano);
    return formatIsoDateTimeFields(epochNanoToIso(epochNano, offsetNano), subsecDigits) + (providedTimeZone ? formatOffsetNano(roundToMinute(offsetNano)) : "Z");
  })(providedTimeZone, getTimeZoneOps(providedTimeZone ? refineTimeZoneString(timeZoneArg) : utcTimeZoneId), instantSlots.epochNanoseconds, roundingMode, nanoInc, subsecDigits);
}, exports.formatMonthCode = formatMonthCode, exports.formatOffsetNano = formatOffsetNano, 
exports.formatPlainDateIso = (plainDateSlots, options) => {
  return calendarId = plainDateSlots.calendar, isoFields = plainDateSlots, calendarDisplay = refineDateDisplayOptions(options), 
  formatIsoDateFields(isoFields) + formatCalendar(calendarId, calendarDisplay);
  var calendarId, isoFields, calendarDisplay;
}, exports.formatPlainDateTimeIso = (plainDateTimeSlots0, options) => {
  const [a, b, c, d] = (options => (options = normalizeOptions(options), [ refineCalendarDisplay(options), ...refineTimeDisplayTuple(options) ]))(options);
  return calendarId = plainDateTimeSlots0.calendar, calendarDisplay = a, subsecDigits = d, 
  formatIsoDateTimeFields(roundDateTimeToNano(plainDateTimeSlots0, c, b), subsecDigits) + formatCalendar(calendarId, calendarDisplay);
  var calendarId, calendarDisplay, subsecDigits;
}, exports.formatPlainMonthDayIso = (plainMonthDaySlots, options) => formatDateLikeIso(plainMonthDaySlots.calendar, formatIsoMonthDayFields, plainMonthDaySlots, refineDateDisplayOptions(options)), 
exports.formatPlainTimeIso = (slots, options) => {
  const [a, b, c] = refineTimeDisplayOptions(options);
  return subsecDigits = c, formatIsoTimeFields(roundTimeToNano(slots, b, a)[0], subsecDigits);
  var subsecDigits;
}, exports.formatPlainYearMonthIso = (plainYearMonthSlots, options) => formatDateLikeIso(plainYearMonthSlots.calendar, formatIsoYearMonthFields, plainYearMonthSlots, refineDateDisplayOptions(options)), 
exports.formatZonedDateTimeIso = (getTimeZoneOps, zonedDateTimeSlots0, options) => {
  const [a, b, c, d, e, f] = (options => {
    options = normalizeOptions(options);
    const calendarDisplay = refineCalendarDisplay(options), subsecDigits = refineSubsecDigits(options), offsetDisplay = refineOffsetDisplay(options), roundingMode = refineRoundingMode(options, 4), smallestUnit = refineSmallestUnit(options, 4);
    return [ calendarDisplay, refineTimeZoneDisplay(options), offsetDisplay, roundingMode, ...refineSmallestUnitAndSubsecDigits(smallestUnit, subsecDigits) ];
  })(options);
  return ((getTimeZoneOps, calendarId, timeZoneId, epochNano, calendarDisplay, timeZoneDisplay, offsetDisplay, roundingMode, nanoInc, subsecDigits) => {
    epochNano = roundBigNanoByInc(epochNano, nanoInc, roundingMode, 1);
    const offsetNano = getTimeZoneOps(timeZoneId).getOffsetNanosecondsFor(epochNano);
    return formatIsoDateTimeFields(epochNanoToIso(epochNano, offsetNano), subsecDigits) + formatOffsetNano(roundToMinute(offsetNano), offsetDisplay) + ((timeZoneId, timeZoneDisplay) => 1 !== timeZoneDisplay ? "[" + (2 === timeZoneDisplay ? "!" : "") + timeZoneId + "]" : "")(timeZoneId, timeZoneDisplay) + formatCalendar(calendarId, calendarDisplay);
  })(getTimeZoneOps, zonedDateTimeSlots0.calendar, zonedDateTimeSlots0.timeZone, zonedDateTimeSlots0.epochNanoseconds, a, b, c, d, e, f);
}, exports.getCommonCalendarId = getCommonCalendarId, exports.getCommonTimeZoneId = getCommonTimeZoneId, 
exports.getCurrentEpochNano = getCurrentEpochNano, exports.getCurrentIsoDateTime = timeZoneOps => {
  const epochNano = getCurrentEpochNano();
  return epochNanoToIso(epochNano, timeZoneOps.getOffsetNanosecondsFor(epochNano));
}, exports.getCurrentTimeZoneId = () => (new RawDateTimeFormat).resolvedOptions().timeZone, 
exports.getDurationBlank = slots => !slots.sign, exports.getEpochMicro = slots => bigNanoToBigInt(slots.epochNanoseconds, nanoInMicro), 
exports.getEpochMilli = getEpochMilli, exports.getEpochNano = slots => bigNanoToBigInt(slots.epochNanoseconds), 
exports.getEpochSec = slots => epochNanoToSec(slots.epochNanoseconds), exports.getSingleInstantFor = getSingleInstantFor, 
exports.identity = arg => arg, exports.instantConfig = instantConfig, exports.instantToZonedDateTime = (instantSlots, timeZoneId, calendarId = isoCalendarId) => createZonedDateTimeSlots(instantSlots.epochNanoseconds, timeZoneId, calendarId), 
exports.instantsEqual = (instantSlots0, instantSlots1) => !compareInstants(instantSlots0, instantSlots1), 
exports.invalidBag = "Invalid bag", exports.invalidCalendar = invalidCalendar, exports.invalidCallingContext = "Invalid calling context", 
exports.invalidFormatType = branding => `Cannot format ${branding}`, exports.invalidTimeZone = invalidTimeZone, 
exports.isObjectLike = isObjectLike, exports.isoCalendarId = isoCalendarId, exports.isoDateFieldNamesAlpha = isoDateFieldNamesAlpha, 
exports.isoTimeFieldDefaults = isoTimeFieldDefaults, exports.isoTimeFieldNamesAsc = isoTimeFieldNamesAsc, 
exports.isoTimeFieldsToCal = isoTimeFieldsToCal, exports.isoToEpochNano = isoToEpochNano, 
exports.mapPropNames = mapPropNames, exports.mapProps = mapProps, exports.memoize = memoize, 
exports.mismatchingFormatTypes = "Mismatching types for formatting", exports.monthDayConfig = monthDayConfig, 
exports.moveBigNano = moveBigNano, exports.moveByDays = moveByDays, exports.moveDateTime = moveDateTime, 
exports.moveInstant = (doSubtract, instantSlots, durationSlots) => createInstantSlots(checkEpochNanoInBounds(addBigNanos(instantSlots.epochNanoseconds, (fields => {
  if (durationHasDateParts(fields)) {
    throw new RangeError("Cannot use large units");
  }
  return durationFieldsToBigNano(fields, 5);
})(doSubtract ? negateDurationFields(durationSlots) : durationSlots)))), exports.movePlainDate = (getCalendarOps, doSubtract, plainDateSlots, durationSlots, options) => {
  const {calendar: calendar} = plainDateSlots;
  return createPlainDateSlots(moveDate(getCalendarOps(calendar), plainDateSlots, doSubtract ? negateDurationFields(durationSlots) : durationSlots, options), calendar);
}, exports.movePlainDateTime = (getCalendarOps, doSubtract, plainDateTimeSlots, durationSlots, options = Object.create(null)) => {
  const {calendar: calendar} = plainDateTimeSlots;
  return createPlainDateTimeSlots(moveDateTime(getCalendarOps(calendar), plainDateTimeSlots, doSubtract ? negateDurationFields(durationSlots) : durationSlots, options), calendar);
}, exports.movePlainTime = (doSubtract, slots, durationSlots) => createPlainTimeSlots(moveTime(slots, doSubtract ? negateDurationFields(durationSlots) : durationSlots)[0]), 
exports.movePlainYearMonth = (getCalendarOps, doSubtract, plainYearMonthSlots, durationSlots, options) => {
  const calendarId = plainYearMonthSlots.calendar, calendarOps = getCalendarOps(calendarId);
  let isoDateFields = checkIsoDateInBounds(moveToDayOfMonthUnsafe(calendarOps, plainYearMonthSlots));
  doSubtract && (durationSlots = negateDuration(durationSlots)), durationSlots.sign < 0 && (isoDateFields = calendarOps.dateAdd(isoDateFields, {
    ...durationFieldDefaults,
    months: 1
  }), isoDateFields = moveByDays(isoDateFields, -1));
  const movedIsoDateFields = calendarOps.dateAdd(isoDateFields, durationSlots, options);
  return createPlainYearMonthSlots(moveToDayOfMonthUnsafe(calendarOps, movedIsoDateFields), calendarId);
}, exports.moveToDayOfMonthUnsafe = moveToDayOfMonthUnsafe, exports.moveZonedDateTime = (getCalendarOps, getTimeZoneOps, doSubtract, zonedDateTimeSlots, durationSlots, options = Object.create(null)) => {
  const timeZoneOps = getTimeZoneOps(zonedDateTimeSlots.timeZone), calendarOps = getCalendarOps(zonedDateTimeSlots.calendar);
  return {
    ...zonedDateTimeSlots,
    ...moveZonedEpochs(timeZoneOps, calendarOps, zonedDateTimeSlots, doSubtract ? negateDurationFields(durationSlots) : durationSlots, options)
  };
}, exports.moveZonedEpochs = moveZonedEpochs, exports.nanoInHour = nanoInHour, exports.nanoInMicro = nanoInMicro, 
exports.nanoInMilli = nanoInMilli, exports.nanoInMinute = nanoInMinute, exports.nanoInSec = nanoInSec, 
exports.nanoInUtcDay = nanoInUtcDay, exports.nativeYearMonthAdd = nativeYearMonthAdd, 
exports.negateDuration = negateDuration, exports.numberToBigNano = numberToBigNano, 
exports.parseCalendarId = s => {
  const res = parseDateTimeLike(s) || parseYearMonthOnly(s) || parseMonthDayOnly(s);
  return res ? res.calendar : s;
}, exports.parseDuration = s => {
  const parsed = (s => {
    const parts = durationRegExp.exec(s);
    return parts ? (parts => {
      function parseUnit(wholeStr, fracStr, timeUnit) {
        let leftoverUnits = 0, wholeUnits = 0;
        if (timeUnit && ([leftoverUnits, leftoverNano] = divModFloor(leftoverNano, unitNanoMap[timeUnit])), 
        void 0 !== wholeStr) {
          if (hasAnyFrac) {
            throw new RangeError(invalidSubstring(wholeStr));
          }
          wholeUnits = (s => {
            const n = parseInt(s);
            if (!Number.isFinite(n)) {
              throw new RangeError(invalidSubstring(s));
            }
            return n;
          })(wholeStr), hasAny = 1, fracStr && (leftoverNano = parseSubsecNano(fracStr) * (unitNanoMap[timeUnit] / nanoInSec), 
          hasAnyFrac = 1);
        }
        return leftoverUnits + wholeUnits;
      }
      let hasAny = 0, hasAnyFrac = 0, leftoverNano = 0, durationFields = {
        ...zipProps(durationFieldNamesAsc, [ parseUnit(parts[2]), parseUnit(parts[3]), parseUnit(parts[4]), parseUnit(parts[5]), parseUnit(parts[6], parts[7], 5), parseUnit(parts[8], parts[9], 4), parseUnit(parts[10], parts[11], 3) ]),
        ...nanoToGivenFields(leftoverNano, 2, durationFieldNamesAsc)
      };
      if (!hasAny) {
        throw new RangeError(noValidFields(durationFieldNamesAsc));
      }
      return parseSign(parts[1]) < 0 && (durationFields = negateDurationFields(durationFields)), 
      durationFields;
    })(parts) : void 0;
  })(requireString(s));
  if (!parsed) {
    throw new RangeError(failedParse(s));
  }
  return createDurationSlots(checkDurationUnits(parsed));
}, exports.parseInstant = s => {
  const organized = parseDateTimeLike(s = toStringViaPrimitive(s));
  if (!organized) {
    throw new RangeError(failedParse(s));
  }
  let offsetNano;
  if (organized.hasZ) {
    offsetNano = 0;
  } else {
    if (!organized.offset) {
      throw new RangeError(failedParse(s));
    }
    offsetNano = parseOffsetNano(organized.offset);
  }
  return organized.timeZone && parseOffsetNanoMaybe(organized.timeZone, 1), createInstantSlots(isoToEpochNanoWithOffset(checkIsoDateTimeFields(organized), offsetNano));
}, exports.parsePlainDate = parsePlainDate, exports.parsePlainDateTime = s => {
  const organized = parseDateTimeLike(requireString(s));
  if (!organized || organized.hasZ) {
    throw new RangeError(failedParse(s));
  }
  return createPlainDateTimeSlots(finalizeDateTime(organized));
}, exports.parsePlainMonthDay = (getCalendarOps, s) => {
  const organized = parseMonthDayOnly(requireString(s));
  if (organized) {
    return requireIsoCalendar(organized), createPlainMonthDaySlots(checkIsoDateFields(organized));
  }
  const dateSlots = parsePlainDate(s, 0, 1), {calendar: calendar} = dateSlots, calendarOps = getCalendarOps(calendar), [origYear, origMonth, day] = calendarOps.dateParts(dateSlots), [monthCodeNumber, isLeapMonth] = calendarOps.monthCodeParts(origYear, origMonth), [year, month] = calendarOps.yearMonthForMonthDay(monthCodeNumber, isLeapMonth, day);
  return createPlainMonthDaySlots(checkIsoDateInBounds(calendarOps.isoFields(year, month, day)), calendar);
}, exports.parsePlainTime = s => {
  let altParsed, organized = (s => {
    const parts = timeRegExp.exec(s);
    return parts ? (organizeAnnotationParts(parts[10]), organizeTimeParts(parts)) : void 0;
  })(requireString(s));
  if (!organized) {
    if (organized = parseDateTimeLike(s), !organized) {
      throw new RangeError(failedParse(s));
    }
    if (!organized.hasTime) {
      throw new RangeError(failedParse(s));
    }
    if (organized.hasZ) {
      throw new RangeError(invalidSubstring("Z"));
    }
    requireIsoCalendar(organized);
  }
  if ((altParsed = parseYearMonthOnly(s)) && isIsoDateFieldsValid(altParsed)) {
    throw new RangeError(failedParse(s));
  }
  if ((altParsed = parseMonthDayOnly(s)) && isIsoDateFieldsValid(altParsed)) {
    throw new RangeError(failedParse(s));
  }
  return createPlainTimeSlots(constrainIsoTimeFields(organized, 1));
}, exports.parsePlainYearMonth = (getCalendarOps, s) => {
  const organized = parseYearMonthOnly(requireString(s));
  if (organized) {
    return requireIsoCalendar(organized), createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields(organized)));
  }
  const isoSlots = parsePlainDate(s, 1);
  return createPlainYearMonthSlots(moveToDayOfMonthUnsafe(getCalendarOps(isoSlots.calendar), isoSlots));
}, exports.parseRelativeToSlots = s => {
  const organized = parseDateTimeLike(requireString(s));
  if (!organized) {
    throw new RangeError(failedParse(s));
  }
  if (organized.timeZone) {
    return finalizeZonedDateTime(organized, organized.offset ? parseOffsetNano(organized.offset) : void 0);
  }
  if (organized.hasZ) {
    throw new RangeError(failedParse(s));
  }
  return finalizeDate(organized);
}, exports.parseTimeZoneId = s => {
  const parsed = parseDateTimeLike(s);
  return parsed && (parsed.timeZone || parsed.hasZ && utcTimeZoneId || parsed.offset) || s;
}, exports.parseZonedDateTime = (s, options) => {
  const organized = parseDateTimeLike(requireString(s));
  if (!organized || !organized.timeZone) {
    throw new RangeError(failedParse(s));
  }
  const {offset: offset} = organized, offsetNano = offset ? parseOffsetNano(offset) : void 0, [, offsetDisambig, epochDisambig] = refineZonedFieldOptions(options);
  return finalizeZonedDateTime(organized, offsetNano, offsetDisambig, epochDisambig);
}, exports.plainDateTimeToPlainMonthDay = (getCalendarOps, plainDateTimeSlots, plainDateFields) => convertToPlainMonthDay(getCalendarOps(plainDateTimeSlots.calendar), plainDateFields), 
exports.plainDateTimeToPlainYearMonth = (getCalendarOps, plainDateTimeSlots, plainDateFields) => {
  const calendarOps = getCalendarOps(plainDateTimeSlots.calendar);
  return createPlainYearMonthSlots({
    ...plainDateTimeSlots,
    ...convertToPlainYearMonth(calendarOps, plainDateFields)
  });
}, exports.plainDateTimeToZonedDateTime = (getTimeZoneOps, plainDateTimeSlots, timeZoneId, options) => createZonedDateTimeSlots(checkEpochNanoInBounds(((getTimeZoneOps, timeZoneId, isoFields, options) => {
  const epochDisambig = (options => refineEpochDisambig(normalizeOptions(options)))(options);
  return getSingleInstantFor(getTimeZoneOps(timeZoneId), isoFields, epochDisambig);
})(getTimeZoneOps, timeZoneId, plainDateTimeSlots, options)), timeZoneId, plainDateTimeSlots.calendar), 
exports.plainDateTimeWithFields = (getCalendarOps, plainDateTimeSlots, modFields, options) => {
  const calendarOps = getCalendarOps(plainDateTimeSlots.calendar), validFieldNames = [ ...calendarOps.fields(dateFieldNamesAlpha), ...timeFieldNamesAsc ].sort(), origFields = {
    ...computeDateEssentials(slots = plainDateTimeSlots),
    hour: slots.isoHour,
    minute: slots.isoMinute,
    second: slots.isoSecond,
    millisecond: slots.isoMillisecond,
    microsecond: slots.isoMicrosecond,
    nanosecond: slots.isoNanosecond
  };
  var slots;
  const partialFields = refineFields(modFields, validFieldNames), overflow = refineOverflowOptions(options), mergedCalendarFields = calendarOps.mergeFields(origFields, partialFields), mergedAllFields = {
    ...origFields,
    ...partialFields
  };
  return createPlainDateTimeSlots(checkIsoDateTimeInBounds({
    ...calendarOps.dateFromFields(mergedCalendarFields, fabricateOverflowOptions(overflow)),
    ...constrainIsoTimeFields(timeFieldsToIso(mergedAllFields), overflow)
  }));
}, exports.plainDateTimeWithPlainDate = (plainDateTimeSlots, plainDateSlots) => createPlainDateTimeSlots({
  ...plainDateTimeSlots,
  ...plainDateSlots
}, getPreferredCalendarId(plainDateTimeSlots.calendar, plainDateSlots.calendar)), 
exports.plainDateTimeWithPlainTime = (plainDateTimeSlots, plainTimeSlots = isoTimeFieldDefaults) => createPlainDateTimeSlots(checkIsoDateTimeInBounds({
  ...plainDateTimeSlots,
  ...plainTimeSlots
})), exports.plainDateTimesEqual = (plainDateTimeSlots0, plainDateTimeSlots1) => !compareIsoDateTimeFields(plainDateTimeSlots0, plainDateTimeSlots1) && plainDateTimeSlots0.calendar === plainDateTimeSlots1.calendar, 
exports.plainDateToPlainDateTime = (plainDateSlots, plainTimeFields = isoTimeFieldDefaults) => createPlainDateTimeSlots(checkIsoDateTimeInBounds({
  ...plainDateSlots,
  ...plainTimeFields
})), exports.plainDateToPlainMonthDay = (getCalendarOps, plainDateSlots, plainDateFields) => convertToPlainMonthDay(getCalendarOps(plainDateSlots.calendar), plainDateFields), 
exports.plainDateToPlainYearMonth = (getCalendarOps, plainDateSlots, plainDateFields) => convertToPlainYearMonth(getCalendarOps(plainDateSlots.calendar), plainDateFields), 
exports.plainDateToZonedDateTime = (refineTimeZoneString, refinePlainTimeArg, getTimeZoneOps, plainDateSlots, options) => {
  const timeZoneId = refineTimeZoneString(options.timeZone), plainTimeArg = options.plainTime, isoTimeFields = void 0 !== plainTimeArg ? refinePlainTimeArg(plainTimeArg) : void 0, timeZoneOps = getTimeZoneOps(timeZoneId);
  let epochNano;
  return epochNano = isoTimeFields ? getSingleInstantFor(timeZoneOps, {
    ...plainDateSlots,
    ...isoTimeFields
  }) : getStartOfDayInstantFor(timeZoneOps, {
    ...plainDateSlots,
    ...isoTimeFieldDefaults
  }), createZonedDateTimeSlots(epochNano, timeZoneId, plainDateSlots.calendar);
}, exports.plainDateWithFields = (getCalendarOps, plainDateSlots, modFields, options) => {
  const calendarOps = getCalendarOps(plainDateSlots.calendar), validFieldNames = calendarOps.fields(dateFieldNamesAlpha).sort(), origFields = computeDateEssentials(plainDateSlots), partialFields = refineFields(modFields, validFieldNames), mergedFields = calendarOps.mergeFields(origFields, partialFields);
  return calendarOps.dateFromFields(mergedFields, options);
}, exports.plainDatesEqual = (plainDateSlots0, plainDateSlots1) => !compareIsoDateFields(plainDateSlots0, plainDateSlots1) && plainDateSlots0.calendar === plainDateSlots1.calendar, 
exports.plainMonthDayToPlainDate = (getCalendarOps, plainMonthDaySlots, plainMonthDayFields, bag) => ((calendarOps, input, bag) => convertToIso(calendarOps, input, monthCodeDayFieldNames, requireObjectLike(bag), yearFieldNames))(getCalendarOps(plainMonthDaySlots.calendar), plainMonthDayFields, bag), 
exports.plainMonthDayWithFields = (getCalendarOps, plainMonthDaySlots, modFields, options) => {
  const calendarOps = getCalendarOps(plainMonthDaySlots.calendar), validFieldNames = calendarOps.fields(dateFieldNamesAlpha).sort(), origFields = (slots => {
    const calendarOps = createNativePartOps(slots.calendar), [year, month, day] = calendarOps.dateParts(slots), [monthCodeNumber, isLeapMonth] = calendarOps.monthCodeParts(year, month);
    return {
      monthCode: formatMonthCode(monthCodeNumber, isLeapMonth),
      day: day
    };
  })(plainMonthDaySlots), partialFields = refineFields(modFields, validFieldNames), mergedFields = calendarOps.mergeFields(origFields, partialFields);
  return calendarOps.monthDayFromFields(mergedFields, options);
}, exports.plainMonthDaysEqual = (plainMonthDaySlots0, plainMonthDaySlots1) => !compareIsoDateFields(plainMonthDaySlots0, plainMonthDaySlots1) && plainMonthDaySlots0.calendar === plainMonthDaySlots1.calendar, 
exports.plainTimeToPlainDateTime = (plainTimeSlots0, plainDateSlots1) => createPlainDateTimeSlots(checkIsoDateTimeInBounds({
  ...plainTimeSlots0,
  ...plainDateSlots1
})), exports.plainTimeToZonedDateTime = (refineTimeZoneString, refinePlainDateArg, getTimeZoneOps, slots, options) => {
  const refinedOptions = requireObjectLike(options), plainDateSlots = refinePlainDateArg(refinedOptions.plainDate), timeZoneId = refineTimeZoneString(refinedOptions.timeZone);
  return createZonedDateTimeSlots(getSingleInstantFor(getTimeZoneOps(timeZoneId), {
    ...plainDateSlots,
    ...slots
  }), timeZoneId, plainDateSlots.calendar);
}, exports.plainTimeWithFields = (initialFields, mod, options) => createPlainTimeSlots(((initialFields, modFields, options) => refineTimeBag({
  ...pluckProps(timeFieldNamesAlpha, initialFields),
  ...refineFields(modFields, timeFieldNamesAlpha)
}, refineOverflowOptions(options)))(initialFields, mod, options)), exports.plainTimesEqual = (plainTimeSlots0, plainTimeSlots1) => !compareIsoTimeFields(plainTimeSlots0, plainTimeSlots1), 
exports.plainYearMonthToPlainDate = (getCalendarOps, plainYearMonthSlots, plainYearMonthFields, bag) => ((calendarOps, input, bag) => convertToIso(calendarOps, input, yearMonthCodeFieldNames, requireObjectLike(bag), dayFieldNames))(getCalendarOps(plainYearMonthSlots.calendar), plainYearMonthFields, bag), 
exports.plainYearMonthWithFields = (getCalendarOps, plainYearMonthSlots, modFields, options) => {
  const calendarOps = getCalendarOps(plainYearMonthSlots.calendar), validFieldNames = calendarOps.fields(yearMonthFieldNames).sort(), origFields = (slots => {
    const calendarOps = createNativePartOps(slots.calendar), [year, month] = calendarOps.dateParts(slots), [monthCodeNumber, isLeapMonth] = calendarOps.monthCodeParts(year, month);
    return {
      year: year,
      monthCode: formatMonthCode(monthCodeNumber, isLeapMonth)
    };
  })(plainYearMonthSlots), partialFields = refineFields(modFields, validFieldNames), mergedFields = calendarOps.mergeFields(origFields, partialFields);
  return calendarOps.yearMonthFromFields(mergedFields, options);
}, exports.plainYearMonthsEqual = (plainYearMonthSlots0, plainYearMonthSlots1) => !compareIsoDateFields(plainYearMonthSlots0, plainYearMonthSlots1) && plainYearMonthSlots0.calendar === plainYearMonthSlots1.calendar, 
exports.pluckProps = pluckProps, exports.prepareZonedEpochDiff = prepareZonedEpochDiff, 
exports.queryNativeTimeZone = queryNativeTimeZone, exports.refineCalendarId = id => resolveCalendarId(requireString(id)), 
exports.refineDirectionOptions = options => {
  const normalizedOptions = normalizeOptionsOrString(options, "direction"), res = refineChoiceOption("direction", directionMap, normalizedOptions, 0);
  if (!res) {
    throw new RangeError(invalidEntity("direction", res));
  }
  return res;
}, exports.refineDurationBag = bag => {
  const durationFields = refineFields(bag, durationFieldNamesAlpha);
  return createDurationSlots(checkDurationUnits({
    ...durationFieldDefaults,
    ...durationFields
  }));
}, exports.refineMaybeZonedDateTimeBag = (refineTimeZoneString, getTimeZoneOps, calendarOps, bag) => {
  const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, [], timeAndZoneFieldNames);
  if (void 0 !== fields.timeZone) {
    const isoDateFields = calendarOps.dateFromFields(fields), isoTimeFields = refineTimeBag(fields), timeZoneId = refineTimeZoneString(fields.timeZone);
    return {
      epochNanoseconds: getMatchingInstantFor(getTimeZoneOps(timeZoneId), {
        ...isoDateFields,
        ...isoTimeFields
      }, void 0 !== fields.offset ? parseOffsetNano(fields.offset) : void 0),
      timeZone: timeZoneId
    };
  }
  return {
    ...calendarOps.dateFromFields(fields),
    ...isoTimeFieldDefaults
  };
}, exports.refineOverflowOptions = refineOverflowOptions, exports.refinePlainDateBag = (calendarOps, bag, options, requireFields = []) => {
  const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, requireFields);
  return calendarOps.dateFromFields(fields, options);
}, exports.refinePlainDateTimeBag = (calendarOps, bag, options) => {
  const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, [], timeFieldNamesAsc), overflow = refineOverflowOptions(options);
  return createPlainDateTimeSlots(checkIsoDateTimeInBounds({
    ...calendarOps.dateFromFields(fields, fabricateOverflowOptions(overflow)),
    ...refineTimeBag(fields, overflow)
  }));
}, exports.refinePlainMonthDayBag = (calendarOps, calendarAbsent, bag, options) => {
  const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, dayFieldNames);
  return calendarAbsent && void 0 !== fields.month && void 0 === fields.monthCode && void 0 === fields.year && (fields.year = isoEpochFirstLeapYear), 
  calendarOps.monthDayFromFields(fields, options);
}, exports.refinePlainTimeBag = (bag, options) => createPlainTimeSlots(refineTimeBag(refineFields(bag, timeFieldNamesAlpha, [], 1), refineOverflowOptions(options))), 
exports.refinePlainYearMonthBag = (calendarOps, bag, options, requireFields) => {
  const fields = refineCalendarFields(calendarOps, bag, yearMonthFieldNames, requireFields);
  return calendarOps.yearMonthFromFields(fields, options);
}, exports.refineTimeZoneId = id => resolveTimeZoneId(requireString(id)), exports.refineUnitDiffOptions = (smallestUnit, options) => void 0 !== options ? refineRoundingMathOptions(smallestUnit, options, 1) : [], 
exports.refineUnitRoundOptions = (smallestUnit, options) => void 0 !== options ? refineRoundingMathOptions(smallestUnit, options) : [ 1, 7 ], 
exports.refineZonedDateTimeBag = (refineTimeZoneString, getTimeZoneOps, calendarOps, calendarId, bag, options) => {
  const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, timeZoneFieldNames, timeAndZoneFieldNames), timeZoneId = refineTimeZoneString(fields.timeZone), [overflow, offsetDisambig, epochDisambig] = refineZonedFieldOptions(options), isoDateFields = calendarOps.dateFromFields(fields, fabricateOverflowOptions(overflow)), isoTimeFields = refineTimeBag(fields, overflow);
  return createZonedDateTimeSlots(getMatchingInstantFor(getTimeZoneOps(timeZoneId), {
    ...isoDateFields,
    ...isoTimeFields
  }, void 0 !== fields.offset ? parseOffsetNano(fields.offset) : void 0, offsetDisambig, epochDisambig), timeZoneId, calendarId);
}, exports.refineZonedFieldOptions = refineZonedFieldOptions, exports.requireBoolean = requireBoolean, 
exports.requireInteger = requireInteger, exports.requireIntegerOrUndefined = input => {
  if (void 0 !== input) {
    return requireInteger(input);
  }
}, exports.requireNumberIsInteger = requireNumberIsInteger, exports.requireObjectLike = requireObjectLike, 
exports.requirePositiveInteger = requirePositiveInteger, exports.requirePositiveIntegerOrUndefined = input => {
  if (void 0 !== input) {
    return requirePositiveInteger(input);
  }
}, exports.requireString = requireString, exports.requireStringOrUndefined = input => {
  if (void 0 !== input) {
    return requireString(input);
  }
}, exports.resolveCalendarId = resolveCalendarId, exports.resolveTimeZoneId = resolveTimeZoneId, 
exports.roundBigNanoByInc = roundBigNanoByInc, exports.roundByInc = roundByInc, 
exports.roundDuration = (refineRelativeTo, getCalendarOps, getTimeZoneOps, slots, options) => {
  const durationLargestUnit = getMaxDurationUnit(slots), [largestUnit, smallestUnit, roundingInc, roundingMode, relativeToSlots] = ((options, defaultLargestUnit, refineRelativeTo) => {
    options = normalizeOptionsOrString(options, smallestUnitStr);
    let largestUnit = refineLargestUnit(options);
    const relativeToInternals = refineRelativeTo(options.relativeTo);
    let roundingInc = parseRoundingIncInteger(options);
    const roundingMode = refineRoundingMode(options, 7);
    let smallestUnit = refineSmallestUnit(options);
    if (void 0 === largestUnit && void 0 === smallestUnit) {
      throw new RangeError("Required smallestUnit or largestUnit");
    }
    if (null == smallestUnit && (smallestUnit = 0), null == largestUnit && (largestUnit = Math.max(smallestUnit, defaultLargestUnit)), 
    checkLargestSmallestUnit(largestUnit, smallestUnit), roundingInc = refineRoundingInc(roundingInc, smallestUnit, 1), 
    roundingInc > 1 && smallestUnit > 5 && largestUnit !== smallestUnit) {
      throw new RangeError("For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit");
    }
    return [ largestUnit, smallestUnit, roundingInc, roundingMode, relativeToInternals ];
  })(options, durationLargestUnit, refineRelativeTo), maxUnit = Math.max(durationLargestUnit, largestUnit);
  if (!relativeToSlots && maxUnit <= 6) {
    return createDurationSlots(checkDurationUnits(((durationFields, largestUnit, smallestUnit, roundingInc, roundingMode) => {
      const roundedBigNano = roundBigNano(durationFieldsToBigNano(durationFields), smallestUnit, roundingInc, roundingMode);
      return {
        ...durationFieldDefaults,
        ...nanoToDurationDayTimeFields(roundedBigNano, largestUnit)
      };
    })(slots, largestUnit, smallestUnit, roundingInc, roundingMode)));
  }
  if (!isZonedEpochSlots(relativeToSlots) && !slots.sign) {
    return slots;
  }
  if (!relativeToSlots) {
    throw new RangeError("Missing relativeTo");
  }
  const [marker, calendarOps, timeZoneOps] = createMarkerSystem(getCalendarOps, getTimeZoneOps, relativeToSlots), markerToEpochNano = createMarkerToEpochNano(timeZoneOps), moveMarker = createMoveMarker(timeZoneOps), diffMarkers = createDiffMarkers(timeZoneOps), endMarker = moveMarker(calendarOps, marker, slots);
  isZonedEpochSlots(relativeToSlots) || (checkIsoDateTimeInBounds(marker), checkIsoDateTimeInBounds(endMarker));
  let balancedDuration = diffMarkers(calendarOps, marker, endMarker, largestUnit);
  const origSign = slots.sign, balancedSign = computeDurationSign(balancedDuration);
  if (origSign && balancedSign && origSign !== balancedSign) {
    throw new RangeError(invalidProtocolResults);
  }
  return balancedDuration = roundRelativeDuration(balancedDuration, markerToEpochNano(endMarker), largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, marker, markerToEpochNano, moveMarker), 
  createDurationSlots(balancedDuration);
}, exports.roundInstant = (instantSlots, options) => {
  const [smallestUnit, roundingInc, roundingMode] = refineRoundingOptions(options, 5, 1);
  return createInstantSlots(roundBigNano(instantSlots.epochNanoseconds, smallestUnit, roundingInc, roundingMode, 1));
}, exports.roundPlainDateTime = (slots, options) => createPlainDateTimeSlots(roundDateTime(slots, ...refineRoundingOptions(options)), slots.calendar), 
exports.roundPlainTime = (slots, options) => {
  const [a, b, c] = refineRoundingOptions(options, 5);
  var roundingMode;
  return createPlainTimeSlots((roundingMode = c, roundTimeToNano(slots, computeNanoInc(a, b), roundingMode)[0]));
}, exports.roundWithMode = roundWithMode, exports.roundZonedDateTime = (getTimeZoneOps, slots, options) => {
  let {epochNanoseconds: epochNanoseconds, timeZone: timeZone, calendar: calendar} = slots;
  const [smallestUnit, roundingInc, roundingMode] = refineRoundingOptions(options);
  if (0 === smallestUnit && 1 === roundingInc) {
    return slots;
  }
  const timeZoneOps = getTimeZoneOps(timeZone);
  if (6 === smallestUnit) {
    epochNanoseconds = roundZonedEpochToInterval(computeDayInterval, timeZoneOps, slots, roundingMode);
  } else {
    const offsetNano = timeZoneOps.getOffsetNanosecondsFor(epochNanoseconds);
    epochNanoseconds = getMatchingInstantFor(timeZoneOps, roundDateTime(epochNanoToIso(epochNanoseconds, offsetNano), smallestUnit, roundingInc, roundingMode), offsetNano, 2, 0, 1);
  }
  return createZonedDateTimeSlots(epochNanoseconds, timeZone, calendar);
}, exports.roundZonedEpochToInterval = roundZonedEpochToInterval, exports.slotsWithCalendarId = (slots, calendarId) => ({
  ...slots,
  calendar: calendarId
}), exports.slotsWithTimeZoneId = (slots, timeZoneId) => ({
  ...slots,
  timeZone: timeZoneId
}), exports.timeConfig = timeConfig, exports.timeFieldNamesAsc = timeFieldNamesAsc, 
exports.toInteger = toInteger, exports.toStrictInteger = toStrictInteger, exports.totalDuration = (refineRelativeTo, getCalendarOps, getTimeZoneOps, slots, options) => {
  const maxDurationUnit = getMaxDurationUnit(slots), [totalUnit, relativeToSlots] = ((options, refineRelativeTo) => {
    const relativeToInternals = refineRelativeTo((options = normalizeOptionsOrString(options, "unit")).relativeTo);
    let totalUnit = refineTotalUnit(options);
    return totalUnit = requirePropDefined("unit", totalUnit), [ totalUnit, relativeToInternals ];
  })(options, refineRelativeTo), maxUnit = Math.max(totalUnit, maxDurationUnit);
  if (!relativeToSlots && isUniformUnit(maxUnit, relativeToSlots)) {
    return totalDayTimeDuration(slots, totalUnit);
  }
  if (!relativeToSlots) {
    throw new RangeError("Missing relativeTo");
  }
  if (!slots.sign) {
    return 0;
  }
  const [marker, calendarOps, timeZoneOps] = createMarkerSystem(getCalendarOps, getTimeZoneOps, relativeToSlots), markerToEpochNano = createMarkerToEpochNano(timeZoneOps), moveMarker = createMoveMarker(timeZoneOps), diffMarkers = createDiffMarkers(timeZoneOps), endMarker = moveMarker(calendarOps, marker, slots);
  isZonedEpochSlots(relativeToSlots) || (checkIsoDateTimeInBounds(marker), checkIsoDateTimeInBounds(endMarker));
  const balancedDuration = diffMarkers(calendarOps, marker, endMarker, totalUnit);
  return isUniformUnit(totalUnit, relativeToSlots) ? totalDayTimeDuration(balancedDuration, totalUnit) : totalRelativeDuration(balancedDuration, markerToEpochNano(endMarker), totalUnit, calendarOps, marker, markerToEpochNano, moveMarker);
}, exports.totalRelativeDuration = totalRelativeDuration, exports.unsupportedWeekNumbers = "Calendar week operations forbidden", 
exports.yearMonthConfig = yearMonthConfig, exports.zonedConfig = zonedConfig, exports.zonedDateTimeToInstant = zonedDateTimeSlots0 => createInstantSlots(zonedDateTimeSlots0.epochNanoseconds), 
exports.zonedDateTimeToPlainDate = (getTimeZoneOps, zonedDateTimeSlots0) => createPlainDateSlots(zonedEpochSlotsToIso(zonedDateTimeSlots0, getTimeZoneOps)), 
exports.zonedDateTimeToPlainDateTime = (getTimeZoneOps, zonedDateTimeSlots0) => createPlainDateTimeSlots(zonedEpochSlotsToIso(zonedDateTimeSlots0, getTimeZoneOps)), 
exports.zonedDateTimeToPlainMonthDay = (getCalendarOps, zonedDateTimeSlots0, zonedDateTimeFields) => convertToPlainMonthDay(getCalendarOps(zonedDateTimeSlots0.calendar), zonedDateTimeFields), 
exports.zonedDateTimeToPlainTime = (getTimeZoneOps, zonedDateTimeSlots0) => createPlainTimeSlots(zonedEpochSlotsToIso(zonedDateTimeSlots0, getTimeZoneOps)), 
exports.zonedDateTimeToPlainYearMonth = (getCalendarOps, zonedDateTimeSlots0, zonedDateTimeFields) => convertToPlainYearMonth(getCalendarOps(zonedDateTimeSlots0.calendar), zonedDateTimeFields), 
exports.zonedDateTimeWithFields = (getCalendarOps, getTimeZoneOps, zonedDateTimeSlots, modFields, options) => {
  const {calendar: calendar, timeZone: timeZone} = zonedDateTimeSlots, calendarOps = getCalendarOps(calendar), timeZoneOps = getTimeZoneOps(timeZone), validFieldNames = [ ...calendarOps.fields(dateFieldNamesAlpha), ...timeAndOffsetFieldNames ].sort(), origFields = (slots => {
    const isoFields = zonedEpochSlotsToIso(slots, queryNativeTimeZone), offsetString = formatOffsetNano(isoFields.offsetNanoseconds), calendarOps = createNativePartOps(slots.calendar), [year, month, day] = calendarOps.dateParts(isoFields), [monthCodeNumber, isLeapMonth] = calendarOps.monthCodeParts(year, month), monthCode = formatMonthCode(monthCodeNumber, isLeapMonth);
    return {
      ...isoTimeFieldsToCal(isoFields),
      year: year,
      monthCode: monthCode,
      day: day,
      offset: offsetString
    };
  })(zonedDateTimeSlots), partialFields = refineFields(modFields, validFieldNames), mergedCalendarFields = calendarOps.mergeFields(origFields, partialFields), mergedAllFields = {
    ...origFields,
    ...partialFields
  }, [overflow, offsetDisambig, epochDisambig] = refineZonedFieldOptions(options, 2);
  return createZonedDateTimeSlots(getMatchingInstantFor(timeZoneOps, {
    ...calendarOps.dateFromFields(mergedCalendarFields, fabricateOverflowOptions(overflow)),
    ...constrainIsoTimeFields(timeFieldsToIso(mergedAllFields), overflow)
  }, parseOffsetNano(mergedAllFields.offset), offsetDisambig, epochDisambig), timeZone, calendar);
}, exports.zonedDateTimeWithPlainDate = (getTimeZoneOps, zonedDateTimeSlots, plainDateSlots) => {
  const timeZoneId = zonedDateTimeSlots.timeZone, timeZoneOps = getTimeZoneOps(timeZoneId), isoFields = {
    ...zonedEpochSlotsToIso(zonedDateTimeSlots, timeZoneOps),
    ...plainDateSlots
  }, calendar = getPreferredCalendarId(zonedDateTimeSlots.calendar, plainDateSlots.calendar);
  return createZonedDateTimeSlots(getMatchingInstantFor(timeZoneOps, isoFields, isoFields.offsetNanoseconds, 2), timeZoneId, calendar);
}, exports.zonedDateTimeWithPlainTime = (getTimeZoneOps, zonedDateTimeSlots, plainTimeSlots) => {
  const timeZoneId = zonedDateTimeSlots.timeZone, timeZoneOps = getTimeZoneOps(timeZoneId), isoFields = {
    ...zonedEpochSlotsToIso(zonedDateTimeSlots, timeZoneOps),
    ...plainTimeSlots || isoTimeFieldDefaults
  };
  let epochNano;
  return epochNano = plainTimeSlots ? getMatchingInstantFor(timeZoneOps, isoFields, isoFields.offsetNanoseconds, 2) : getStartOfDayInstantFor(timeZoneOps, isoFields), 
  createZonedDateTimeSlots(epochNano, timeZoneId, zonedDateTimeSlots.calendar);
}, exports.zonedDateTimesEqual = (zonedDateTimeSlots0, zonedDateTimeSlots1) => !compareZonedDateTimes(zonedDateTimeSlots0, zonedDateTimeSlots1) && !!isTimeZoneIdsEqual(zonedDateTimeSlots0.timeZone, zonedDateTimeSlots1.timeZone) && zonedDateTimeSlots0.calendar === zonedDateTimeSlots1.calendar, 
exports.zonedEpochSlotsToIso = zonedEpochSlotsToIso;


/***/ }),

/***/ 645:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
var __webpack_unused_export__;


var classApi = __nccwpck_require__(256);

__webpack_unused_export__ = classApi.IntlExtended, exports.fE = classApi.Temporal, __webpack_unused_export__ = classApi.toTemporalInstant;


/***/ }),

/***/ 706:
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"(GMT+10:00) Canberra, Melbourne, Sydney":{"iana":["Australia/Sydney"]},"(UTC) Casablanca":{"iana":["Africa/Casablanca"]},"(UTC) Coordinated Universal Time":{"iana":["Etc/UTC"]},"(UTC) Greenwich Mean Time: Dublin, Edinburgh, Lisbon, London":{"iana":["Europe/London"]},"(UTC) Monrovia, Reykjavik":{"iana":["Atlantic/Reykjavik"]},"(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna":{"iana":["Europe/Berlin"]},"(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague":{"iana":["Europe/Budapest"]},"(UTC+01:00) Brussels, Copenhagen, Madrid, Paris":{"iana":["Europe/Paris"]},"(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb":{"iana":["Europe/Warsaw"]},"(UTC+01:00) West Central Africa":{"iana":["Africa/Lagos"]},"(UTC+02:00) Amman":{"iana":["Asia/Amman"]},"(UTC+02:00) Athens, Bucharest, Istanbul":{"iana":["Europe/Bucharest"]},"(UTC+02:00) Beirut":{"iana":["Asia/Beirut"]},"(UTC+02:00) Cairo":{"iana":["Africa/Cairo"]},"(UTC+02:00) Harare, Pretoria":{"iana":["Africa/Johannesburg"]},"(UTC+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius":{"iana":["Europe/Kiev"]},"(UTC+02:00) Jerusalem":{"iana":["Asia/Jerusalem"]},"(UTC+02:00) Minsk":{"iana":["Europe/Chisinau"]},"(UTC+02:00) Windhoek":{"iana":["Africa/Windhoek"]},"(UTC+03:00) Baghdad":{"iana":["Asia/Baghdad"]},"(UTC+03:00) Kuwait, Riyadh":{"iana":["Asia/Riyadh"]},"(UTC+03:00) Moscow, St. Petersburg, Volgograd":{"iana":["Europe/Moscow"]},"(UTC+03:00) Nairobi":{"iana":["Africa/Nairobi"]},"(UTC+03:00) Tbilisi":{"iana":["Asia/Tbilisi"]},"(UTC+03:30) Tehran":{"iana":["Asia/Tehran"]},"(UTC+04:00) Abu Dhabi, Muscat":{"iana":["Asia/Dubai"]},"(UTC+04:00) Baku":{"iana":["Asia/Baku"]},"(UTC+04:00) Baku, Tbilisi, Yerevan":{"iana":["Asia/Yerevan"]},"(UTC+04:00) Port Louis":{"iana":["Indian/Mauritius"]},"(UTC+04:00) Yerevan":{"iana":["Asia/Yerevan"]},"(UTC+04:30) Kabul":{"iana":["Asia/Kabul"]},"(UTC+05:00) Ekaterinburg":{"iana":["Asia/Yekaterinburg"]},"(UTC+05:00) Islamabad, Karachi":{"iana":["Asia/Karachi"]},"(UTC+05:00) Tashkent":{"iana":["Asia/Tashkent"]},"(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi":{"iana":["Asia/Calcutta"]},"(UTC+05:45) Kathmandu":{"iana":["Asia/Katmandu"]},"(UTC+06:00) Almaty, Novosibirsk":{"iana":["Asia/Novosibirsk"]},"(UTC+06:00) Astana, Dhaka":{"iana":["Asia/Bishkek"]},"(UTC+06:00) Sri Jayawardenepura":{"iana":["Asia/Colombo"]},"(UTC+06:30) Yangon (Rangoon)":{"iana":["Asia/Rangoon"]},"(UTC+07:00) Bangkok, Hanoi, Jakarta":{"iana":["Asia/Bangkok"]},"(UTC+07:00) Krasnoyarsk":{"iana":["Asia/Krasnoyarsk"]},"(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi":{"iana":["Asia/Shanghai"]},"(UTC+08:00) Irkutsk, Ulaanbaatar":{"iana":["Asia/Irkutsk"]},"(UTC+08:00) Kuala Lumpur, Singapore":{"iana":["Asia/Singapore"]},"(UTC+08:00) Perth":{"iana":["Australia/Perth"]},"(UTC+08:00) Taipei":{"iana":["Asia/Taipei"]},"(UTC+09:00) Osaka, Sapporo, Tokyo":{"iana":["Asia/Tokyo"]},"(UTC+09:00) Seoul":{"iana":["Asia/Seoul"]},"(UTC+09:00) Yakutsk":{"iana":["Asia/Yakutsk"]},"(UTC+09:30) Adelaide":{"iana":["Australia/Adelaide"]},"(UTC+09:30) Darwin":{"iana":["Australia/Darwin"]},"(UTC+10:00) Brisbane":{"iana":["Australia/Brisbane"]},"(UTC+10:00) Canberra, Melbourne, Sydney":{"iana":["Australia/Sydney"]},"(UTC+10:00) Guam, Port Moresby":{"iana":["Pacific/Port_Moresby"]},"(UTC+10:00) Hobart":{"iana":["Australia/Hobart"]},"(UTC+10:00) Vladivostok":{"iana":["Asia/Vladivostok"]},"(UTC+11:00) Magadan, Solomon Islands, New Caledonia":{"iana":["Pacific/Guadalcanal"]},"(UTC+12:00) Auckland, Wellington":{"iana":["Pacific/Auckland"]},"(UTC+12:00) Fiji, Kamchatka, Marshall Is.":{"iana":["Pacific/Fiji"]},"(UTC+12:00) Petropavlovsk-Kamchatsky":{"iana":["Asia/Kamchatka"]},"(UTC+13:00) Nuku\'alofa":{"iana":["Pacific/Tongatapu"]},"(UTC-01:00) Azores":{"iana":["Atlantic/Azores"]},"(UTC-01:00) Cape Verde Islands":{"iana":["Atlantic/Cape_Verde"]},"(UTC-02:00) Mid-Atlantic":{"iana":["Etc/GMT+2"]},"(UTC-03:00) Brasilia":{"iana":["America/Sao_Paulo"]},"(UTC-03:00) Buenos Aires":{"iana":["America/Buenos_Aires"]},"(UTC-03:00) Georgetown":{"iana":["America/Cayenne"]},"(UTC-03:00) Greenland":{"iana":["America/Godthab"]},"(UTC-03:00) Montevideo":{"iana":["America/Montevideo"]},"(UTC-03:30) Newfoundland":{"iana":["America/St_Johns"]},"(UTC-04:00) Asuncion":{"iana":["America/Asuncion"]},"(UTC-04:00) Atlantic Time (Canada)":{"iana":["America/Halifax"]},"(UTC-04:00) Georgetown, La Paz, San Juan":{"iana":["America/La_Paz"]},"(UTC-04:00) Manaus":{"iana":["America/Cuiaba"]},"(UTC-04:00) Santiago":{"iana":["America/Santiago"]},"(UTC-04:30) Caracas":{"iana":["America/Caracas"]},"(UTC-05:00) Bogota, Lima, Quito":{"iana":["America/Bogota"]},"(UTC-05:00) Eastern Time (US & Canada)":{"iana":["America/New_York"]},"(UTC-05:00) Eastern Time (US and Canada)":{"iana":["America/New_York"]},"(UTC-05:00) Indiana (East)":{"iana":["America/Indianapolis"]},"(UTC-06:00) Central America":{"iana":["America/Guatemala"]},"(UTC-06:00) Central Time (US & Canada)":{"iana":["America/Chicago"]},"(UTC-06:00) Central Time (US and Canada)":{"iana":["America/Chicago"]},"(UTC-06:00) Guadalajara, Mexico City, Monterrey":{"iana":["America/Mexico_City"]},"(UTC-06:00) Guadalajara, Mexico City, Monterrey - New":{"iana":["America/Mexico_City"]},"(UTC-06:00) Saskatchewan":{"iana":["America/Regina"]},"(UTC-07:00) Arizona":{"iana":["America/Phoenix"]},"(UTC-07:00) Chihuahua, La Paz, Mazatlan":{"iana":["America/Mazatlan"]},"(UTC-07:00) Chihuahua, La Paz, Mazatlan - New":{"iana":["America/Mazatlan"]},"(UTC-07:00) Mountain Time (US & Canada)":{"iana":["America/Denver"]},"(UTC-07:00) Mountain Time (US and Canada)":{"iana":["America/Denver"]},"(UTC-08:00) Pacific Time (US & Canada); Tijuana":{"iana":["America/Los_Angeles"]},"(UTC-08:00) Pacific Time (US and Canada); Tijuana":{"iana":["America/Los_Angeles"]},"(UTC-08:00) Tijuana, Baja California":{"iana":["America/Tijuana"]},"(UTC-09:00) Alaska":{"iana":["America/Anchorage"]},"(UTC-10:00) Hawaii":{"iana":["Pacific/Honolulu"]},"(UTC-11:00) Midway Island, Samoa":{"iana":["Pacific/Apia"]},"(UTC-12:00) International Date Line West":{"iana":["Etc/GMT+12"]},"AUS Central Standard Time":{"iana":["Australia/Darwin"]},"AUS Eastern Standard Time":{"iana":["Australia/Sydney"]},"Afghanistan Standard Time":{"iana":["Asia/Kabul"]},"Alaskan Standard Time":{"iana":["America/Anchorage"]},"Aleutian Standard Time":{"iana":["America/Adak"]},"Altai Standard Time":{"iana":["Asia/Barnaul"]},"Arab Standard Time":{"iana":["Asia/Riyadh"]},"Arabian Standard Time":{"iana":["Asia/Dubai"]},"Arabic Standard Time":{"iana":["Asia/Baghdad"]},"Argentina Standard Time":{"iana":["America/Buenos_Aires"]},"Astrakhan Standard Time":{"iana":["Europe/Astrakhan"]},"Atlantic Standard Time":{"iana":["America/Halifax"]},"Aus Central W. Standard Time":{"iana":["Australia/Eucla"]},"Azerbaijan Standard Time":{"iana":["Asia/Baku"]},"Azores Standard Time":{"iana":["Atlantic/Azores"]},"Bahia Standard Time":{"iana":["America/Bahia"]},"Bangladesh Standard Time":{"iana":["Asia/Dhaka"]},"Belarus Standard Time":{"iana":["Europe/Minsk"]},"Bougainville Standard Time":{"iana":["Pacific/Bougainville"]},"Canada Central Standard Time":{"iana":["America/Regina"]},"Cape Verde Standard Time":{"iana":["Atlantic/Cape_Verde"]},"Caucasus Standard Time":{"iana":["Asia/Yerevan"]},"Cen. Australia Standard Time":{"iana":["Australia/Adelaide"]},"Central America Standard Time":{"iana":["America/Guatemala"]},"Central Asia Standard Time":{"iana":["Asia/Bishkek"]},"Central Brazilian Standard Time":{"iana":["America/Cuiaba"]},"Central Europe Standard Time":{"iana":["Europe/Budapest"]},"Central European Standard Time":{"iana":["Europe/Warsaw"]},"Central Pacific Standard Time":{"iana":["Pacific/Guadalcanal"]},"Central Standard Time":{"iana":["America/Chicago"]},"Central Standard Time (Mexico)":{"iana":["America/Mexico_City"]},"Chatham Islands Standard Time":{"iana":["Pacific/Chatham"]},"China Standard Time":{"iana":["Asia/Shanghai"]},"Cuba Standard Time":{"iana":["America/Havana"]},"Dateline Standard Time":{"iana":["Etc/GMT+12"]},"E. Africa Standard Time":{"iana":["Africa/Nairobi"]},"E. Australia Standard Time":{"iana":["Australia/Brisbane"]},"E. Europe Standard Time":{"iana":["Europe/Chisinau"]},"E. South America Standard Time":{"iana":["America/Sao_Paulo"]},"Easter Island Standard Time":{"iana":["Pacific/Easter"]},"Eastern Standard Time":{"iana":["America/New_York"]},"Eastern Standard Time (Mexico)":{"iana":["America/Cancun"]},"Egypt Standard Time":{"iana":["Africa/Cairo"]},"Ekaterinburg Standard Time":{"iana":["Asia/Yekaterinburg"]},"FLE Standard Time":{"iana":["Europe/Kiev"]},"Fiji Standard Time":{"iana":["Pacific/Fiji"]},"GMT Standard Time":{"iana":["Europe/London"]},"GTB Standard Time":{"iana":["Europe/Bucharest"]},"Georgian Standard Time":{"iana":["Asia/Tbilisi"]},"Greenland Standard Time":{"iana":["America/Godthab"]},"Greenwich Standard Time":{"iana":["Atlantic/Reykjavik"]},"Haiti Standard Time":{"iana":["America/Port-au-Prince"]},"Hawaiian Standard Time":{"iana":["Pacific/Honolulu"]},"India Standard Time":{"iana":["Asia/Calcutta"]},"Iran Standard Time":{"iana":["Asia/Tehran"]},"Israel Standard Time":{"iana":["Asia/Jerusalem"]},"Jordan Standard Time":{"iana":["Asia/Amman"]},"Kaliningrad Standard Time":{"iana":["Europe/Kaliningrad"]},"Korea Standard Time":{"iana":["Asia/Seoul"]},"Libya Standard Time":{"iana":["Africa/Tripoli"]},"Line Islands Standard Time":{"iana":["Pacific/Kiritimati"]},"Lord Howe Standard Time":{"iana":["Australia/Lord_Howe"]},"Magadan Standard Time":{"iana":["Asia/Magadan"]},"Magallanes Standard Time":{"iana":["America/Punta_Arenas"]},"Marquesas Standard Time":{"iana":["Pacific/Marquesas"]},"Mauritius Standard Time":{"iana":["Indian/Mauritius"]},"Middle East Standard Time":{"iana":["Asia/Beirut"]},"Montevideo Standard Time":{"iana":["America/Montevideo"]},"Morocco Standard Time":{"iana":["Africa/Casablanca"]},"Mountain Standard Time":{"iana":["America/Denver"]},"Mountain Standard Time (Mexico)":{"iana":["America/Mazatlan"]},"Myanmar Standard Time":{"iana":["Asia/Rangoon"]},"N. Central Asia Standard Time":{"iana":["Asia/Novosibirsk"]},"Namibia Standard Time":{"iana":["Africa/Windhoek"]},"Nepal Standard Time":{"iana":["Asia/Katmandu"]},"New Zealand Standard Time":{"iana":["Pacific/Auckland"]},"Newfoundland Standard Time":{"iana":["America/St_Johns"]},"Norfolk Standard Time":{"iana":["Pacific/Norfolk"]},"North Asia East Standard Time":{"iana":["Asia/Irkutsk"]},"North Asia Standard Time":{"iana":["Asia/Krasnoyarsk"]},"North Korea Standard Time":{"iana":["Asia/Pyongyang"]},"Omsk Standard Time":{"iana":["Asia/Omsk"]},"Pacific SA Standard Time":{"iana":["America/Santiago"]},"Pacific Standard Time":{"iana":["America/Los_Angeles"]},"Pacific Standard Time (Mexico)":{"iana":["America/Tijuana"]},"Pakistan Standard Time":{"iana":["Asia/Karachi"]},"Paraguay Standard Time":{"iana":["America/Asuncion"]},"Qyzylorda Standard Time":{"iana":["Asia/Qyzylorda"]},"Romance Standard Time":{"iana":["Europe/Paris"]},"Russia Time Zone 10":{"iana":["Asia/Srednekolymsk"]},"Russia Time Zone 11":{"iana":["Asia/Kamchatka"]},"Russia Time Zone 3":{"iana":["Europe/Samara"]},"Russian Standard Time":{"iana":["Europe/Moscow"]},"SA Eastern Standard Time":{"iana":["America/Cayenne"]},"SA Pacific Standard Time":{"iana":["America/Bogota"]},"SA Western Standard Time":{"iana":["America/La_Paz"]},"SE Asia Standard Time":{"iana":["Asia/Bangkok"]},"Saint Pierre Standard Time":{"iana":["America/Miquelon"]},"Sakhalin Standard Time":{"iana":["Asia/Sakhalin"]},"Samoa Standard Time":{"iana":["Pacific/Apia"]},"Sao Tome Standard Time":{"iana":["Africa/Sao_Tome"]},"Saratov Standard Time":{"iana":["Europe/Saratov"]},"Singapore Standard Time":{"iana":["Asia/Singapore"]},"South Africa Standard Time":{"iana":["Africa/Johannesburg"]},"South Sudan Standard Time":{"iana":["Africa/Juba"]},"Sri Lanka Standard Time":{"iana":["Asia/Colombo"]},"Sudan Standard Time":{"iana":["Africa/Khartoum"]},"Syria Standard Time":{"iana":["Asia/Damascus"]},"Taipei Standard Time":{"iana":["Asia/Taipei"]},"Tasmania Standard Time":{"iana":["Australia/Hobart"]},"Tocantins Standard Time":{"iana":["America/Araguaina"]},"Tokyo Standard Time":{"iana":["Asia/Tokyo"]},"Tomsk Standard Time":{"iana":["Asia/Tomsk"]},"Tonga Standard Time":{"iana":["Pacific/Tongatapu"]},"Transbaikal Standard Time":{"iana":["Asia/Chita"]},"Turkey Standard Time":{"iana":["Europe/Istanbul"]},"Turks And Caicos Standard Time":{"iana":["America/Grand_Turk"]},"US Eastern Standard Time":{"iana":["America/Indianapolis"]},"US Mountain Standard Time":{"iana":["America/Phoenix"]},"UTC":{"iana":["Etc/UTC"]},"UTC+12":{"iana":["Etc/GMT-12"]},"UTC+13":{"iana":["Etc/GMT-13"]},"UTC-02":{"iana":["Etc/GMT+2"]},"UTC-08":{"iana":["Etc/GMT+8"]},"UTC-09":{"iana":["Etc/GMT+9"]},"UTC-11":{"iana":["Etc/GMT+11"]},"Ulaanbaatar Standard Time":{"iana":["Asia/Ulaanbaatar"]},"Venezuela Standard Time":{"iana":["America/Caracas"]},"Vladivostok Standard Time":{"iana":["Asia/Vladivostok"]},"Volgograd Standard Time":{"iana":["Europe/Volgograd"]},"W. Australia Standard Time":{"iana":["Australia/Perth"]},"W. Central Africa Standard Time":{"iana":["Africa/Lagos"]},"W. Europe Standard Time":{"iana":["Europe/Berlin"]},"W. Mongolia Standard Time":{"iana":["Asia/Hovd"]},"West Asia Standard Time":{"iana":["Asia/Tashkent"]},"West Bank Standard Time":{"iana":["Asia/Hebron"]},"West Pacific Standard Time":{"iana":["Pacific/Port_Moresby"]},"Yakutsk Standard Time":{"iana":["Asia/Yakutsk"]},"Yukon Standard Time":{"iana":["America/Whitehorse"]}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const ical = __nccwpck_require__(168);

const urls = [
    "https://calendar.google.com/calendar/ical/gaguman1twtch%40gmail.com/private-a18011f5b7c889181af371ea20feaf37/basic.ics",
    "https://calendar.google.com/calendar/ical/k0cgnd8vrqqih5vkf0097o5r1k5cbrb4%40import.calendar.google.com/public/basic.ics"
];

async function getCalendar() {
    console.log("EVENTOS DEL CALENDARIO PARA HOY Y MAÑANA:\\n");
    let allEvents = [];
    
    // Rango de fechas a buscar (hoy y mañana)
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
    
    for (const url of urls) {
        try {
            const data = await ical.async.fromURL(url);
            for (const k in data) {
                const event = data[k];
                if (event.type === 'VEVENT') {
                    // Manejar eventos recurrentes
                    if (typeof event.rrule !== 'undefined') {
                        const dates = event.rrule.between(startOfToday, endOfTomorrow);
                        if (dates.length > 0) {
                            for (const date of dates) {
                                allEvents.push({
                                    summary: event.summary,
                                    start: date,
                                    end: new Date(date.getTime() + (event.end - event.start))
                                });
                            }
                        }
                    } else {
                        // Eventos normales
                        if (event.start >= startOfToday && event.start < endOfTomorrow) {
                            allEvents.push({
                                summary: event.summary,
                                start: event.start,
                                end: event.end
                            });
                        }
                    }
                }
            }
        } catch (e) {
            console.error("Error cargando un calendario.");
        }
    }
    
    if (allEvents.length === 0) {
        console.log("No tienes eventos programados para hoy ni mañana.");
        return;
    }
    
    // Ordenar por fecha
    allEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
    
    for (const ev of allEvents) {
        const dateStr = ev.start.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
        const timeStr = ev.start.getHours() === 0 && ev.start.getMinutes() === 0 ? "Todo el día" : ev.start.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        console.log(`- [${dateStr} a las ${timeStr}] ${ev.summary}`);
    }
}

getCalendar();

module.exports = __webpack_exports__;
/******/ })()
;