function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequired76b;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequired76b=o);var i,u=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,f=/^0b[01]+$/i,c=/^0o[0-7]+$/i,l=parseInt,s="object"==typeof t&&t&&t.Object===Object&&t,d="object"==typeof self&&self&&self.Object===Object&&self,p=s||d||Function("return this")(),v=Object.prototype.toString,y=Math.max,b=Math.min,m=function(){return p.Date.now()};function g(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function w(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==v.call(e)}(e))return NaN;if(g(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=g(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(u,"");var n=f.test(e);return n||c.test(e)?l(e.slice(2),n?2:8):a.test(e)?NaN:+e}i=function(e,t,n){var r,o,i,u,a,f,c=0,l=!1,s=!1,d=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function p(t){var n=r,i=o;return r=o=void 0,c=t,u=e.apply(i,n)}function v(e){return c=e,a=setTimeout(x,t),l?p(e):u}function h(e){var n=e-f;return void 0===f||n>=t||n<0||s&&e-c>=i}function x(){var e=m();if(h(e))return O(e);a=setTimeout(x,function(e){var n=t-(e-f);return s?b(n,i-(e-c)):n}(e))}function O(e){return a=void 0,d&&r?p(e):(r=o=void 0,u)}function T(){var e=m(),n=h(e);if(r=arguments,o=this,f=e,n){if(void 0===a)return v(f);if(s)return a=setTimeout(x,t),p(f)}return void 0===a&&(a=setTimeout(x,t)),u}return t=w(t)||0,g(n)&&(l=!!n.leading,i=(s="maxWait"in n)?y(w(n.maxWait)||0,t):i,d="trailing"in n?!!n.trailing:d),T.cancel=function(){void 0!==a&&clearTimeout(a),c=0,r=f=o=a=void 0},T.flush=function(){return void 0===a?u:O(m())},T};var h=o("kvr73"),x=o("2nhTy"),O=o("g4lwF");const T=document.querySelector("#search-box"),j=document.querySelector(".gallery"),M=new(0,h.default);async function N(){M.query=T.value.trim();const e=await q();(0,x.default)(e.total_results,20).on("afterMove",S)}async function S(e){M.page=e.page;await q()}async function q(){let e;try{e=M.query?await M.fetchFilms():await M.fetchPopular(),console.log(e),j.innerHTML=(0,O.createMarkup)(e.results),localStorage.setItem("LS",JSON.stringify(e.results))}catch(e){console.log(e)}return e}T.addEventListener("input",e(i)(N,300)),N(),o("dmm04");
//# sourceMappingURL=index.50ce14dd.js.map