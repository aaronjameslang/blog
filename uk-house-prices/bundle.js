/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const highcharts_1 = __importDefault(__webpack_require__(1));
const simple_statistics_1 = __webpack_require__(2);
const uk_data_json_1 = __importDefault(__webpack_require__(3));
const ukData10y = (function () {
    const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.2425;
    const last = uk_data_json_1.default[uk_data_json_1.default.length - 1];
    const dawn = last[0] - (MS_PER_YEAR * 10);
    return uk_data_json_1.default.filter(([x, y]) => x >= dawn);
})();
const baseOptions = {
    chart: {
        zoomType: 'x'
    },
    legend: {
        enabled: false
    },
    series: [{
            data: uk_data_json_1.default,
            name: 'Average UK House Price',
            type: 'spline'
        }],
    title: {
        text: undefined // 'UK House Prices'
    },
    tooltip: {
        shared: true,
        valueDecimals: 2,
        valuePrefix: "£"
    },
    xAxis: {
        title: { text: 'Date' },
        type: 'datetime'
    },
    yAxis: {
        title: { text: 'GBP' }
    },
};
function calcExpTrend(data) {
    const logData = data.map(([x, y]) => [x, Math.log(y)]);
    const { m, b } = (0, simple_statistics_1.linearRegression)(logData);
    const x2y = (0, simple_statistics_1.linearRegressionLine)({ m, b });
    const logTrend = data.map(([x, y]) => [x, x2y(x)]);
    const trend = logTrend.map(([x, y]) => [x, Math.exp(y)]);
    return trend;
}
function formatCurrency3sf(value) {
    value = Number.parseFloat(value.toPrecision(3));
    return value.toLocaleString('en-GB', {
        style: 'currency', currency: 'GBP'
    });
}
function formatDate(ms) {
    return new Date(ms).toLocaleDateString(undefined, {
        year: 'numeric', month: 'short'
    });
}
const options = {
    simple: Object.assign({}, baseOptions),
    log: Object.assign(Object.assign({}, baseOptions), { series: [{
                data: uk_data_json_1.default,
                name: 'Price Average',
                type: 'spline'
            }, {
                data: calcExpTrend(uk_data_json_1.default),
                name: 'Price Trend',
                type: 'line',
                dashStyle: 'Dash'
            }], yAxis: {
            title: { text: 'log(GBP)' },
            type: 'logarithmic'
        } }),
    'log-10y': Object.assign(Object.assign({}, baseOptions), { series: [{
                data: ukData10y,
                name: 'Price Average',
                type: 'spline'
            }, {
                data: calcExpTrend(ukData10y),
                name: 'Price Trend',
                type: 'line',
                dashStyle: 'Dash'
            }], yAxis: {
            title: { text: 'log(GBP)' },
            type: 'logarithmic'
        } })
};
function render() {
    const $ = ([id]) => { var _a; return (_a = document.getElementById(id)) !== null && _a !== void 0 ? _a : document.createElement('p'); };
    for (const key in options) {
        highcharts_1.default.chart(`chart-${key}`, options[key]);
    }
    const last = ukData10y[ukData10y.length - 1];
    const point10y = ukData10y[0];
    const decadePcr = last[1] / point10y[1];
    const annualPcr = Math.pow(decadePcr, 1 / 10);
    $ `date-last`.innerText = formatDate(last[0]);
    $ `date-10y`.innerText = formatDate(point10y[0]);
    $ `price-last`.innerHTML = formatCurrency3sf(last[1]);
    $ `price-10y`.innerHTML = formatCurrency3sf(point10y[1]);
    $ `decade-pr`.innerHTML = (decadePcr * 100 - 100).toPrecision(3);
    $ `annual-pr`.innerHTML = (annualPcr * 100 - 100).toPrecision(3);
}
document.addEventListener('DOMContentLoaded', render);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 Highcharts JS v9.3.2 (2021-11-29)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(Z,M){ true&&module.exports?(M["default"]=M,module.exports=Z.document?M(Z):M): true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return M(Z)}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):(0)})("undefined"!==typeof window?window:this,function(Z){function M(v,a,z,F){v.hasOwnProperty(a)||(v[a]=F.apply(null,z))}var a={};M(a,"Core/Globals.js",[],function(){var v="undefined"!==typeof Z?Z:"undefined"!==typeof window?window:
{},a;(function(a){a.SVG_NS="http://www.w3.org/2000/svg";a.product="Highcharts";a.version="9.3.2";a.win=v;a.doc=a.win.document;a.svg=a.doc&&a.doc.createElementNS&&!!a.doc.createElementNS(a.SVG_NS,"svg").createSVGRect;a.userAgent=a.win.navigator&&a.win.navigator.userAgent||"";a.isChrome=-1!==a.userAgent.indexOf("Chrome");a.isFirefox=-1!==a.userAgent.indexOf("Firefox");a.isMS=/(edge|msie|trident)/i.test(a.userAgent)&&!a.win.opera;a.isSafari=!a.isChrome&&-1!==a.userAgent.indexOf("Safari");a.isTouchDevice=
/(Mobile|Android|Windows Phone)/.test(a.userAgent);a.isWebKit=-1!==a.userAgent.indexOf("AppleWebKit");a.deg2rad=2*Math.PI/360;a.hasBidiBug=a.isFirefox&&4>parseInt(a.userAgent.split("Firefox/")[1],10);a.hasTouch=!!a.win.TouchEvent;a.marginNames=["plotTop","marginRight","marginBottom","plotLeft"];a.noop=function(){};a.supportsPassiveEvents=function(){var v=!1;if(!a.isMS){var u=Object.defineProperty({},"passive",{get:function(){v=!0}});a.win.addEventListener&&a.win.removeEventListener&&(a.win.addEventListener("testPassive",
a.noop,u),a.win.removeEventListener("testPassive",a.noop,u))}return v}();a.charts=[];a.dateFormats={};a.seriesTypes={};a.symbolSizes={};a.chartCount=0})(a||(a={}));"";return a});M(a,"Core/Utilities.js",[a["Core/Globals.js"]],function(a){function v(m,b,d,g){var D=b?"Highcharts error":"Highcharts warning";32===m&&(m=D+": Deprecated member");var x=n(m),c=x?D+" #"+m+": www.highcharts.com/errors/"+m+"/":m.toString();if("undefined"!==typeof g){var r="";x&&(c+="?");B(g,function(m,b){r+="\n - "+b+": "+m;
x&&(c+=encodeURI(b)+"="+encodeURI(m))});c+=r}J(a,"displayError",{chart:d,code:m,message:c,params:g},function(){if(b)throw Error(c);l.console&&-1===v.messages.indexOf(c)&&console.warn(c)});v.messages.push(c)}function z(m,b){var d={};B(m,function(D,x){if(H(m[x],!0)&&!m.nodeType&&b[x])D=z(m[x],b[x]),Object.keys(D).length&&(d[x]=D);else if(H(m[x])||m[x]!==b[x])d[x]=m[x]});return d}function F(m,b){return parseInt(m,b||10)}function y(m){return"string"===typeof m}function G(m){m=Object.prototype.toString.call(m);
return"[object Array]"===m||"[object Array Iterator]"===m}function H(m,b){return!!m&&"object"===typeof m&&(!b||!G(m))}function A(m){return H(m)&&"number"===typeof m.nodeType}function q(m){var b=m&&m.constructor;return!(!H(m,!0)||A(m)||!b||!b.name||"Object"===b.name)}function n(m){return"number"===typeof m&&!isNaN(m)&&Infinity>m&&-Infinity<m}function k(m){return"undefined"!==typeof m&&null!==m}function e(m,b,d){var D;y(b)?k(d)?m.setAttribute(b,d):m&&m.getAttribute&&((D=m.getAttribute(b))||"class"!==
b||(D=m.getAttribute(b+"Name"))):B(b,function(b,d){k(b)?m.setAttribute(d,b):m.removeAttribute(d)});return D}function c(b,d){var m;b||(b={});for(m in d)b[m]=d[m];return b}function h(){for(var b=arguments,d=b.length,x=0;x<d;x++){var g=b[x];if("undefined"!==typeof g&&null!==g)return g}}function f(b,d){a.isMS&&!a.svg&&d&&"undefined"!==typeof d.opacity&&(d.filter="alpha(opacity="+100*d.opacity+")");c(b.style,d)}function w(b,d){return 1E14<b?b:parseFloat(b.toPrecision(d||14))}function p(b,d,x){var m=a.getStyle||
p;if("width"===d)return d=Math.min(b.offsetWidth,b.scrollWidth),x=b.getBoundingClientRect&&b.getBoundingClientRect().width,x<d&&x>=d-1&&(d=Math.floor(x)),Math.max(0,d-(m(b,"padding-left",!0)||0)-(m(b,"padding-right",!0)||0));if("height"===d)return Math.max(0,Math.min(b.offsetHeight,b.scrollHeight)-(m(b,"padding-top",!0)||0)-(m(b,"padding-bottom",!0)||0));l.getComputedStyle||v(27,!0);if(b=l.getComputedStyle(b,void 0)){var g=b.getPropertyValue(d);h(x,"opacity"!==d)&&(g=F(g))}return g}function B(b,d,
g){for(var m in b)Object.hasOwnProperty.call(b,m)&&d.call(g||b[m],b[m],m,b)}function t(b,d,g){function m(d,m){var L=b.removeEventListener||a.removeEventListenerPolyfill;L&&L.call(b,d,m,!1)}function x(g){var x;if(b.nodeName){if(d){var L={};L[d]=!0}else L=g;B(L,function(b,d){if(g[d])for(x=g[d].length;x--;)m(d,g[d][x].fn)})}}var D="function"===typeof b&&b.prototype||b;if(Object.hasOwnProperty.call(D,"hcEvents")){var l=D.hcEvents;d?(D=l[d]||[],g?(l[d]=D.filter(function(b){return g!==b.fn}),m(d,g)):(x(l),
l[d]=[])):(x(l),delete D.hcEvents)}}function J(b,d,g,l){g=g||{};if(r.createEvent&&(b.dispatchEvent||b.fireEvent&&b!==a)){var m=r.createEvent("Events");m.initEvent(d,!0,!0);g=c(m,g);b.dispatchEvent?b.dispatchEvent(g):b.fireEvent(d,g)}else if(b.hcEvents){g.target||c(g,{preventDefault:function(){g.defaultPrevented=!0},target:b,type:d});m=[];for(var x=b,D=!1;x.hcEvents;)Object.hasOwnProperty.call(x,"hcEvents")&&x.hcEvents[d]&&(m.length&&(D=!0),m.unshift.apply(m,x.hcEvents[d])),x=Object.getPrototypeOf(x);
D&&m.sort(function(b,d){return b.order-d.order});m.forEach(function(d){!1===d.fn.call(b,g)&&g.preventDefault()})}l&&!g.defaultPrevented&&l.call(b,g)}var C=a.charts,r=a.doc,l=a.win;(v||(v={})).messages=[];Math.easeInOutSine=function(b){return-.5*(Math.cos(Math.PI*b)-1)};var b=Array.prototype.find?function(b,d){return b.find(d)}:function(b,d){var m,g=b.length;for(m=0;m<g;m++)if(d(b[m],m))return b[m]};B({map:"map",each:"forEach",grep:"filter",reduce:"reduce",some:"some"},function(b,d){a[d]=function(m){var g;
v(32,!1,void 0,(g={},g["Highcharts."+d]="use Array."+b,g));return Array.prototype[b].apply(m,[].slice.call(arguments,1))}});var g,d=function(){var b=Math.random().toString(36).substring(2,9)+"-",d=0;return function(){return"highcharts-"+(g?"":b)+d++}}();l.jQuery&&(l.jQuery.fn.highcharts=function(){var b=[].slice.call(arguments);if(this[0])return b[0]?(new (a[y(b[0])?b.shift():"Chart"])(this[0],b[0],b[1]),this):C[e(this[0],"data-highcharts-chart")]});b={addEvent:function(b,d,g,l){void 0===l&&(l={});
var m="function"===typeof b&&b.prototype||b;Object.hasOwnProperty.call(m,"hcEvents")||(m.hcEvents={});m=m.hcEvents;a.Point&&b instanceof a.Point&&b.series&&b.series.chart&&(b.series.chart.runTrackerClick=!0);var x=b.addEventListener||a.addEventListenerPolyfill;x&&x.call(b,d,g,a.supportsPassiveEvents?{passive:void 0===l.passive?-1!==d.indexOf("touch"):l.passive,capture:!1}:!1);m[d]||(m[d]=[]);m[d].push({fn:g,order:"number"===typeof l.order?l.order:Infinity});m[d].sort(function(b,d){return b.order-
d.order});return function(){t(b,d,g)}},arrayMax:function(b){for(var d=b.length,m=b[0];d--;)b[d]>m&&(m=b[d]);return m},arrayMin:function(b){for(var d=b.length,m=b[0];d--;)b[d]<m&&(m=b[d]);return m},attr:e,clamp:function(b,d,g){return b>d?b<g?b:g:d},cleanRecursively:z,clearTimeout:function(b){k(b)&&clearTimeout(b)},correctFloat:w,createElement:function(b,d,g,l,e){b=r.createElement(b);d&&c(b,d);e&&f(b,{padding:"0",border:"none",margin:"0"});g&&f(b,g);l&&l.appendChild(b);return b},css:f,defined:k,destroyObjectProperties:function(b,
d){B(b,function(m,g){m&&m!==d&&m.destroy&&m.destroy();delete b[g]})},discardElement:function(b){b&&b.parentElement&&b.parentElement.removeChild(b)},erase:function(b,d){for(var m=b.length;m--;)if(b[m]===d){b.splice(m,1);break}},error:v,extend:c,extendClass:function(b,d){var m=function(){};m.prototype=new b;c(m.prototype,d);return m},find:b,fireEvent:J,getMagnitude:function(b){return Math.pow(10,Math.floor(Math.log(b)/Math.LN10))},getNestedProperty:function(b,d){for(b=b.split(".");b.length&&k(d);){var m=
b.shift();if("undefined"===typeof m||"__proto__"===m)return;d=d[m];if(!k(d)||"function"===typeof d||"number"===typeof d.nodeType||d===l)return}return d},getStyle:p,inArray:function(b,d,g){v(32,!1,void 0,{"Highcharts.inArray":"use Array.indexOf"});return d.indexOf(b,g)},isArray:G,isClass:q,isDOMElement:A,isFunction:function(b){return"function"===typeof b},isNumber:n,isObject:H,isString:y,keys:function(b){v(32,!1,void 0,{"Highcharts.keys":"use Object.keys"});return Object.keys(b)},merge:function(){var b,
d=arguments,g={},l=function(b,d){"object"!==typeof b&&(b={});B(d,function(m,g){"__proto__"!==g&&"constructor"!==g&&(!H(m,!0)||q(m)||A(m)?b[g]=d[g]:b[g]=l(b[g]||{},m))});return b};!0===d[0]&&(g=d[1],d=Array.prototype.slice.call(d,2));var c=d.length;for(b=0;b<c;b++)g=l(g,d[b]);return g},normalizeTickInterval:function(b,d,g,l,c){var m=b;g=h(g,1);var r=b/g;d||(d=c?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===l&&(1===g?d=d.filter(function(b){return 0===b%1}):.1>=g&&(d=[1/g])));for(l=0;l<d.length&&
!(m=d[l],c&&m*g>=b||!c&&r<=(d[l]+(d[l+1]||d[l]))/2);l++);return m=w(m*g,-Math.round(Math.log(.001)/Math.LN10))},objectEach:B,offset:function(b){var d=r.documentElement;b=b.parentElement||b.parentNode?b.getBoundingClientRect():{top:0,left:0,width:0,height:0};return{top:b.top+(l.pageYOffset||d.scrollTop)-(d.clientTop||0),left:b.left+(l.pageXOffset||d.scrollLeft)-(d.clientLeft||0),width:b.width,height:b.height}},pad:function(b,d,g){return Array((d||2)+1-String(b).replace("-","").length).join(g||"0")+
b},pick:h,pInt:F,relativeLength:function(b,d,g){return/%$/.test(b)?d*parseFloat(b)/100+(g||0):parseFloat(b)},removeEvent:t,splat:function(b){return G(b)?b:[b]},stableSort:function(b,d){var g=b.length,m,l;for(l=0;l<g;l++)b[l].safeI=l;b.sort(function(b,g){m=d(b,g);return 0===m?b.safeI-g.safeI:m});for(l=0;l<g;l++)delete b[l].safeI},syncTimeout:function(b,d,g){if(0<d)return setTimeout(b,d,g);b.call(0,g);return-1},timeUnits:{millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,
year:314496E5},uniqueKey:d,useSerialIds:function(b){return g=h(b,g)},wrap:function(b,d,g){var m=b[d];b[d]=function(){var b=Array.prototype.slice.call(arguments),d=arguments,l=this;l.proceed=function(){m.apply(l,arguments.length?arguments:d)};b.unshift(m);b=g.apply(this,b);l.proceed=null;return b}}};"";return b});M(a,"Core/Chart/ChartDefaults.js",[],function(){return{panning:{enabled:!1,type:"x"},styledMode:!1,borderRadius:0,colorCount:10,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,
10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},zoomBySingleTouch:!1,width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"}});M(a,"Core/Color/Color.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,u){var v=u.isNumber,F=u.merge,y=u.pInt;u=function(){function u(v){this.rgba=[NaN,NaN,NaN,NaN];this.input=v;var A=a.Color;if(A&&A!==u)return new A(v);if(!(this instanceof u))return new u(v);this.init(v)}u.parse=function(a){return a?
new u(a):u.None};u.prototype.init=function(a){var A;if("object"===typeof a&&"undefined"!==typeof a.stops)this.stops=a.stops.map(function(e){return new u(e[1])});else if("string"===typeof a){this.input=a=u.names[a.toLowerCase()]||a;if("#"===a.charAt(0)){var q=a.length;var n=parseInt(a.substr(1),16);7===q?A=[(n&16711680)>>16,(n&65280)>>8,n&255,1]:4===q&&(A=[(n&3840)>>4|(n&3840)>>8,(n&240)>>4|n&240,(n&15)<<4|n&15,1])}if(!A)for(n=u.parsers.length;n--&&!A;){var k=u.parsers[n];(q=k.regex.exec(a))&&(A=k.parse(q))}}A&&
(this.rgba=A)};u.prototype.get=function(a){var A=this.input,q=this.rgba;if("object"===typeof A&&"undefined"!==typeof this.stops){var n=F(A);n.stops=[].slice.call(n.stops);this.stops.forEach(function(k,e){n.stops[e]=[n.stops[e][0],k.get(a)]});return n}return q&&v(q[0])?"rgb"===a||!a&&1===q[3]?"rgb("+q[0]+","+q[1]+","+q[2]+")":"a"===a?""+q[3]:"rgba("+q.join(",")+")":A};u.prototype.brighten=function(a){var A=this.rgba;if(this.stops)this.stops.forEach(function(n){n.brighten(a)});else if(v(a)&&0!==a)for(var q=
0;3>q;q++)A[q]+=y(255*a),0>A[q]&&(A[q]=0),255<A[q]&&(A[q]=255);return this};u.prototype.setOpacity=function(a){this.rgba[3]=a;return this};u.prototype.tweenTo=function(a,A){var q=this.rgba,n=a.rgba;if(!v(q[0])||!v(n[0]))return a.input||"none";a=1!==n[3]||1!==q[3];return(a?"rgba(":"rgb(")+Math.round(n[0]+(q[0]-n[0])*(1-A))+","+Math.round(n[1]+(q[1]-n[1])*(1-A))+","+Math.round(n[2]+(q[2]-n[2])*(1-A))+(a?","+(n[3]+(q[3]-n[3])*(1-A)):"")+")"};u.names={white:"#ffffff",black:"#000000"};u.parsers=[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
parse:function(a){return[y(a[1]),y(a[2]),y(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[y(a[1]),y(a[2]),y(a[3]),1]}}];u.None=new u("");return u}();"";return u});M(a,"Core/Color/Palettes.js",[],function(){return{colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" ")}});M(a,"Core/Time.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,u){var v=a.win,F=u.defined,y=
u.error,G=u.extend,H=u.isObject,A=u.merge,q=u.objectEach,n=u.pad,k=u.pick,e=u.splat,c=u.timeUnits,h=a.isSafari&&v.Intl&&v.Intl.DateTimeFormat.prototype.formatRange,f=a.isSafari&&v.Intl&&!v.Intl.DateTimeFormat.prototype.formatRange;u=function(){function w(c){this.options={};this.variableTimezone=this.useUTC=!1;this.Date=v.Date;this.getTimezoneOffset=this.timezoneOffsetFunction();this.update(c)}w.prototype.get=function(c,e){if(this.variableTimezone||this.timezoneOffset){var p=e.getTime(),f=p-this.getTimezoneOffset(e);
e.setTime(f);c=e["getUTC"+c]();e.setTime(p);return c}return this.useUTC?e["getUTC"+c]():e["get"+c]()};w.prototype.set=function(c,e,f){if(this.variableTimezone||this.timezoneOffset){if("Milliseconds"===c||"Seconds"===c||"Minutes"===c&&0===this.getTimezoneOffset(e)%36E5)return e["setUTC"+c](f);var p=this.getTimezoneOffset(e);p=e.getTime()-p;e.setTime(p);e["setUTC"+c](f);c=this.getTimezoneOffset(e);p=e.getTime()+c;return e.setTime(p)}return this.useUTC||h&&"FullYear"===c?e["setUTC"+c](f):e["set"+c](f)};
w.prototype.update=function(c){var e=k(c&&c.useUTC,!0);this.options=c=A(!0,this.options||{},c);this.Date=c.Date||v.Date||Date;this.timezoneOffset=(this.useUTC=e)&&c.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();this.variableTimezone=e&&!(!c.getTimezoneOffset&&!c.timezone)};w.prototype.makeTime=function(c,e,h,w,C,r){if(this.useUTC){var l=this.Date.UTC.apply(0,arguments);var b=this.getTimezoneOffset(l);l+=b;var g=this.getTimezoneOffset(l);b!==g?l+=g-b:b-36E5!==this.getTimezoneOffset(l-
36E5)||f||(l-=36E5)}else l=(new this.Date(c,e,k(h,1),k(w,0),k(C,0),k(r,0))).getTime();return l};w.prototype.timezoneOffsetFunction=function(){var c=this,e=this.options,f=e.getTimezoneOffset,h=e.moment||v.moment;if(!this.useUTC)return function(c){return 6E4*(new Date(c.toString())).getTimezoneOffset()};if(e.timezone){if(h)return function(c){return 6E4*-h.tz(c,e.timezone).utcOffset()};y(25)}return this.useUTC&&f?function(c){return 6E4*f(c.valueOf())}:function(){return 6E4*(c.timezoneOffset||0)}};w.prototype.dateFormat=
function(c,e,f){if(!F(e)||isNaN(e))return a.defaultOptions.lang&&a.defaultOptions.lang.invalidDate||"";c=k(c,"%Y-%m-%d %H:%M:%S");var p=this,h=new this.Date(e),r=this.get("Hours",h),l=this.get("Day",h),b=this.get("Date",h),g=this.get("Month",h),d=this.get("FullYear",h),m=a.defaultOptions.lang,D=m&&m.weekdays,x=m&&m.shortWeekdays;h=G({a:x?x[l]:D[l].substr(0,3),A:D[l],d:n(b),e:n(b,2," "),w:l,b:m.shortMonths[g],B:m.months[g],m:n(g+1),o:g+1,y:d.toString().substr(2,2),Y:d,H:n(r),k:r,I:n(r%12||12),l:r%
12||12,M:n(this.get("Minutes",h)),p:12>r?"AM":"PM",P:12>r?"am":"pm",S:n(h.getSeconds()),L:n(Math.floor(e%1E3),3)},a.dateFormats);q(h,function(b,d){for(;-1!==c.indexOf("%"+d);)c=c.replace("%"+d,"function"===typeof b?b.call(p,e):b)});return f?c.substr(0,1).toUpperCase()+c.substr(1):c};w.prototype.resolveDTLFormat=function(c){return H(c,!0)?c:(c=e(c),{main:c[0],from:c[1],to:c[2]})};w.prototype.getTimeTicks=function(e,h,f,w){var p=this,r=[],l={},b=new p.Date(h),g=e.unitRange,d=e.count||1,m;w=k(w,1);if(F(h)){p.set("Milliseconds",
b,g>=c.second?0:d*Math.floor(p.get("Milliseconds",b)/d));g>=c.second&&p.set("Seconds",b,g>=c.minute?0:d*Math.floor(p.get("Seconds",b)/d));g>=c.minute&&p.set("Minutes",b,g>=c.hour?0:d*Math.floor(p.get("Minutes",b)/d));g>=c.hour&&p.set("Hours",b,g>=c.day?0:d*Math.floor(p.get("Hours",b)/d));g>=c.day&&p.set("Date",b,g>=c.month?1:Math.max(1,d*Math.floor(p.get("Date",b)/d)));if(g>=c.month){p.set("Month",b,g>=c.year?0:d*Math.floor(p.get("Month",b)/d));var D=p.get("FullYear",b)}g>=c.year&&p.set("FullYear",
b,D-D%d);g===c.week&&(D=p.get("Day",b),p.set("Date",b,p.get("Date",b)-D+w+(D<w?-7:0)));D=p.get("FullYear",b);w=p.get("Month",b);var x=p.get("Date",b),t=p.get("Hours",b);h=b.getTime();!p.variableTimezone&&p.useUTC||!F(f)||(m=f-h>4*c.month||p.getTimezoneOffset(h)!==p.getTimezoneOffset(f));h=b.getTime();for(b=1;h<f;)r.push(h),h=g===c.year?p.makeTime(D+b*d,0):g===c.month?p.makeTime(D,w+b*d):!m||g!==c.day&&g!==c.week?m&&g===c.hour&&1<d?p.makeTime(D,w,x,t+b*d):h+g*d:p.makeTime(D,w,x+b*d*(g===c.day?1:7)),
b++;r.push(h);g<=c.hour&&1E4>r.length&&r.forEach(function(b){0===b%18E5&&"000000000"===p.dateFormat("%H%M%S%L",b)&&(l[b]="day")})}r.info=G(e,{higherRanks:l,totalRange:g*d});return r};w.prototype.getDateFormat=function(e,h,f,w){var p=this.dateFormat("%m-%d %H:%M:%S.%L",h),r={millisecond:15,second:12,minute:9,hour:6,day:3},l="millisecond";for(b in c){if(e===c.week&&+this.dateFormat("%w",h)===f&&"00:00:00.000"===p.substr(6)){var b="week";break}if(c[b]>e){b=l;break}if(r[b]&&p.substr(r[b])!=="01-01 00:00:00.000".substr(r[b]))break;
"week"!==b&&(l=b)}if(b)var g=this.resolveDTLFormat(w[b]).main;return g};return w}();"";return u});M(a,"Core/DefaultOptions.js",[a["Core/Chart/ChartDefaults.js"],a["Core/Color/Color.js"],a["Core/Globals.js"],a["Core/Color/Palettes.js"],a["Core/Time.js"],a["Core/Utilities.js"]],function(a,u,z,F,y,G){u=u.parse;var v=G.merge,A={colors:F.colors,symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),
shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:{Date:void 0,getTimezoneOffset:void 0,timezone:void 0,timezoneOffset:0,useUTC:!0},chart:a,title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},
caption:{margin:15,text:"",align:"left",verticalAlign:"bottom"},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,className:"highcharts-no-tooltip",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",cursor:"pointer",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},
itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:z.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",
minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",headerShape:"callout",hideDelay:500,padding:8,shape:"callout",shared:!1,snap:z.isTouchDevice?25:10,headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',backgroundColor:u("#f7f7f7").setOpacity(.85).get(),borderWidth:1,shadow:!0,stickOnContact:!1,
style:{color:"#333333",cursor:"default",fontSize:"12px",whiteSpace:"nowrap"},useHTML:!1},credits:{enabled:!0,href:"https://www.highcharts.com?credits",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};A.chart.styledMode=!1;"";var q=new y(v(A.global,A.time));a={defaultOptions:A,defaultTime:q,getOptions:function(){return A},setOptions:function(n){v(!0,A,n);if(n.time||n.global)z.time?z.time.update(v(A.global,A.time,
n.global,n.time)):z.time=q;return A}};"";return a});M(a,"Core/Animation/Fx.js",[a["Core/Color/Color.js"],a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,u,z){var v=a.parse,y=u.win,G=z.isNumber,H=z.objectEach;return function(){function a(a,n,k){this.pos=NaN;this.options=n;this.elem=a;this.prop=k}a.prototype.dSetter=function(){var a=this.paths,n=a&&a[0];a=a&&a[1];var k=this.now||0,e=[];if(1!==k&&n&&a)if(n.length===a.length&&1>k)for(var c=0;c<a.length;c++){for(var h=n[c],f=a[c],w=[],p=0;p<f.length;p++){var B=
h[p],t=f[p];G(B)&&G(t)&&("A"!==f[0]||4!==p&&5!==p)?w[p]=B+k*(t-B):w[p]=t}e.push(w)}else e=a;else e=this.toD||[];this.elem.attr("d",e,void 0,!0)};a.prototype.update=function(){var a=this.elem,n=this.prop,k=this.now,e=this.options.step;if(this[n+"Setter"])this[n+"Setter"]();else a.attr?a.element&&a.attr(n,k,null,!0):a.style[n]=k+this.unit;e&&e.call(a,k,this)};a.prototype.run=function(q,n,k){var e=this,c=e.options,h=function(c){return h.stopped?!1:e.step(c)},f=y.requestAnimationFrame||function(c){setTimeout(c,
13)},w=function(){for(var c=0;c<a.timers.length;c++)a.timers[c]()||a.timers.splice(c--,1);a.timers.length&&f(w)};q!==n||this.elem["forceAnimate:"+this.prop]?(this.startTime=+new Date,this.start=q,this.end=n,this.unit=k,this.now=this.start,this.pos=0,h.elem=this.elem,h.prop=this.prop,h()&&1===a.timers.push(h)&&f(w)):(delete c.curAnim[this.prop],c.complete&&0===Object.keys(c.curAnim).length&&c.complete.call(this.elem))};a.prototype.step=function(a){var n=+new Date,k=this.options,e=this.elem,c=k.complete,
h=k.duration,f=k.curAnim;if(e.attr&&!e.element)a=!1;else if(a||n>=h+this.startTime){this.now=this.end;this.pos=1;this.update();var w=f[this.prop]=!0;H(f,function(c){!0!==c&&(w=!1)});w&&c&&c.call(e);a=!1}else this.pos=k.easing((n-this.startTime)/h),this.now=this.start+(this.end-this.start)*this.pos,this.update(),a=!0;return a};a.prototype.initPath=function(a,n,k){function e(c,e){for(;c.length<J;){var l=c[0],b=e[J-c.length];b&&"M"===l[0]&&(c[0]="C"===b[0]?["C",l[1],l[2],l[1],l[2],l[1],l[2]]:["L",l[1],
l[2]]);c.unshift(l);w&&(l=c.pop(),c.push(c[c.length-1],l))}}function c(c,e){for(;c.length<J;)if(e=c[Math.floor(c.length/p)-1].slice(),"C"===e[0]&&(e[1]=e[5],e[2]=e[6]),w){var l=c[Math.floor(c.length/p)].slice();c.splice(c.length/2,0,e,l)}else c.push(e)}var h=a.startX,f=a.endX;k=k.slice();var w=a.isArea,p=w?2:1;n=n&&n.slice();if(!n)return[k,k];if(h&&f&&f.length){for(a=0;a<h.length;a++)if(h[a]===f[0]){var B=a;break}else if(h[0]===f[f.length-h.length+a]){B=a;var t=!0;break}else if(h[h.length-1]===f[f.length-
h.length+a]){B=h.length-a;break}"undefined"===typeof B&&(n=[])}if(n.length&&G(B)){var J=k.length+B*p;t?(e(n,k),c(k,n)):(e(k,n),c(n,k))}return[n,k]};a.prototype.fillSetter=function(){a.prototype.strokeSetter.apply(this,arguments)};a.prototype.strokeSetter=function(){this.elem.attr(this.prop,v(this.start).tweenTo(v(this.end),this.pos),void 0,!0)};a.timers=[];return a}()});M(a,"Core/Animation/AnimationUtilities.js",[a["Core/Animation/Fx.js"],a["Core/Utilities.js"]],function(a,u){function v(c){return q(c)?
n({duration:500,defer:0},c):{duration:c?500:0,defer:0}}function F(c,e){for(var h=a.timers.length;h--;)a.timers[h].elem!==c||e&&e!==a.timers[h].prop||(a.timers[h].stopped=!0)}var y=u.defined,G=u.getStyle,H=u.isArray,A=u.isNumber,q=u.isObject,n=u.merge,k=u.objectEach,e=u.pick;return{animate:function(c,e,f){var h,p="",B,t;if(!q(f)){var J=arguments;f={duration:J[2],easing:J[3],complete:J[4]}}A(f.duration)||(f.duration=400);f.easing="function"===typeof f.easing?f.easing:Math[f.easing]||Math.easeInOutSine;
f.curAnim=n(e);k(e,function(k,r){F(c,r);t=new a(c,f,r);B=void 0;"d"===r&&H(e.d)?(t.paths=t.initPath(c,c.pathArray,e.d),t.toD=e.d,h=0,B=1):c.attr?h=c.attr(r):(h=parseFloat(G(c,r))||0,"opacity"!==r&&(p="px"));B||(B=k);"string"===typeof B&&B.match("px")&&(B=B.replace(/px/g,""));t.run(h,B,p)})},animObject:v,getDeferredAnimation:function(c,e,f){var h=v(e),p=0,a=0;(f?[f]:c.series).forEach(function(c){c=v(c.options.animation);p=e&&y(e.defer)?h.defer:Math.max(p,c.duration+c.defer);a=Math.min(h.duration,c.duration)});
c.renderer.forExport&&(p=0);return{defer:Math.max(0,p-a),duration:Math.min(p,a)}},setAnimation:function(c,h){h.renderer.globalAnimation=e(c,h.options.chart.animation,!0)},stop:F}});M(a,"Core/Renderer/HTML/AST.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,u){var v=a.SVG_NS,F=u.attr,y=u.createElement,G=u.error,H=u.isFunction,A=u.isString,q=u.objectEach,n=u.splat,k=(u=a.win.trustedTypes)&&H(u.createPolicy)&&u.createPolicy("highcharts",{createHTML:function(c){return c}}),e=k?k.createHTML(""):
"";try{var c=!!(new DOMParser).parseFromString(e,"text/html")}catch(h){c=!1}H=function(){function h(c){this.nodes="string"===typeof c?this.parseMarkup(c):c}h.filterUserAttributes=function(c){q(c,function(e,p){var f=!0;-1===h.allowedAttributes.indexOf(p)&&(f=!1);-1!==["background","dynsrc","href","lowsrc","src"].indexOf(p)&&(f=A(e)&&h.allowedReferences.some(function(c){return 0===e.indexOf(c)}));f||(G("Highcharts warning: Invalid attribute '"+p+"' in config"),delete c[p])});return c};h.setElementHTML=
function(c,e){c.innerHTML=h.emptyHTML;e&&(new h(e)).addToDOM(c)};h.prototype.addToDOM=function(c){function e(c,f){var p;n(c).forEach(function(c){var t=c.tagName,r=c.textContent?a.doc.createTextNode(c.textContent):void 0;if(t)if("#text"===t)var l=r;else if(-1!==h.allowedTags.indexOf(t)){t=a.doc.createElementNS("svg"===t?v:f.namespaceURI||v,t);var b=c.attributes||{};q(c,function(c,d){"tagName"!==d&&"attributes"!==d&&"children"!==d&&"textContent"!==d&&(b[d]=c)});F(t,h.filterUserAttributes(b));r&&t.appendChild(r);
e(c.children||[],t);l=t}else G("Highcharts warning: Invalid tagName "+t+" in config");l&&f.appendChild(l);p=l});return p}return e(this.nodes,c)};h.prototype.parseMarkup=function(e){var h=[];e=e.trim();if(c)e=(new DOMParser).parseFromString(k?k.createHTML(e):e,"text/html");else{var p=y("div");p.innerHTML=e;e={body:p}}var f=function(c,e){var h=c.nodeName.toLowerCase(),r={tagName:h};"#text"===h&&(r.textContent=c.textContent||"");if(h=c.attributes){var l={};[].forEach.call(h,function(b){l[b.name]=b.value});
r.attributes=l}if(c.childNodes.length){var b=[];[].forEach.call(c.childNodes,function(c){f(c,b)});b.length&&(r.children=b)}e.push(r)};[].forEach.call(e.body.childNodes,function(c){return f(c,h)});return h};h.allowedAttributes="aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align textAnchor textLength title type valign width x x1 x2 y y1 y2 zIndex".split(" ");
h.allowedReferences="https:// http:// mailto: / ../ ./ #".split(" ");h.allowedTags="a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text".split(" ");h.emptyHTML=e;return h}();"";return H});M(a,"Core/FormatUtilities.js",
[a["Core/DefaultOptions.js"],a["Core/Utilities.js"]],function(a,u){function v(a,k,e,c){a=+a||0;k=+k;var h=F.lang,f=(a.toString().split(".")[1]||"").split("e")[0].length,w=a.toString().split("e"),p=k;if(-1===k)k=Math.min(f,20);else if(!H(k))k=2;else if(k&&w[1]&&0>w[1]){var B=k+ +w[1];0<=B?(w[0]=(+w[0]).toExponential(B).split("e")[0],k=B):(w[0]=w[0].split(".")[0]||0,a=20>k?(w[0]*Math.pow(10,w[1])).toFixed(k):0,w[1]=0)}B=(Math.abs(w[1]?w[0]:a)+Math.pow(10,-Math.max(k,f)-1)).toFixed(k);f=String(q(B));
var t=3<f.length?f.length%3:0;e=A(e,h.decimalPoint);c=A(c,h.thousandsSep);a=(0>a?"-":"")+(t?f.substr(0,t)+c:"");a=0>+w[1]&&!p?"0":a+f.substr(t).replace(/(\d{3})(?=\d)/g,"$1"+c);k&&(a+=e+B.slice(-k));w[1]&&0!==+a&&(a+="e"+w[1]);return a}var F=a.defaultOptions,y=a.defaultTime,G=u.getNestedProperty,H=u.isNumber,A=u.pick,q=u.pInt;return{dateFormat:function(a,k,e){return y.dateFormat(a,k,e)},format:function(a,k,e){var c="{",h=!1,f=/f$/,w=/\.([0-9])/,p=F.lang,B=e&&e.time||y;e=e&&e.numberFormatter||v;for(var t=
[];a;){var J=a.indexOf(c);if(-1===J)break;var C=a.slice(0,J);if(h){C=C.split(":");c=G(C.shift()||"",k);if(C.length&&"number"===typeof c)if(C=C.join(":"),f.test(C)){var r=parseInt((C.match(w)||["","-1"])[1],10);null!==c&&(c=e(c,r,p.decimalPoint,-1<C.indexOf(",")?p.thousandsSep:""))}else c=B.dateFormat(C,c);t.push(c)}else t.push(C);a=a.slice(J+1);c=(h=!h)?"}":"{"}t.push(a);return t.join("")},numberFormat:v}});M(a,"Core/Renderer/RendererUtilities.js",[a["Core/Utilities.js"]],function(a){var v=a.clamp,
z=a.pick,F=a.stableSort,y;(function(a){function u(a,q,n){var k=a,e=k.reducedLen||q,c=function(c,e){return(e.rank||0)-(c.rank||0)},h=function(c,e){return c.target-e.target},f,w=!0,p=[],B=0;for(f=a.length;f--;)B+=a[f].size;if(B>e){F(a,c);for(B=f=0;B<=e;)B+=a[f].size,f++;p=a.splice(f-1,a.length)}F(a,h);for(a=a.map(function(c){return{size:c.size,targets:[c.target],align:z(c.align,.5)}});w;){for(f=a.length;f--;)e=a[f],c=(Math.min.apply(0,e.targets)+Math.max.apply(0,e.targets))/2,e.pos=v(c-e.size*e.align,
0,q-e.size);f=a.length;for(w=!1;f--;)0<f&&a[f-1].pos+a[f-1].size>a[f].pos&&(a[f-1].size+=a[f].size,a[f-1].targets=a[f-1].targets.concat(a[f].targets),a[f-1].align=.5,a[f-1].pos+a[f-1].size>q&&(a[f-1].pos=q-a[f-1].size),a.splice(f,1),w=!0)}k.push.apply(k,p);f=0;a.some(function(c){var e=0;return(c.targets||[]).some(function(){k[f].pos=c.pos+e;if("undefined"!==typeof n&&Math.abs(k[f].pos-k[f].target)>n)return k.slice(0,f+1).forEach(function(c){return delete c.pos}),k.reducedLen=(k.reducedLen||q)-.1*
q,k.reducedLen>.1*q&&u(k,q,n),!0;e+=k[f].size;f++;return!1})});F(k,h);return k}a.distribute=u})(y||(y={}));return y});M(a,"Core/Renderer/SVG/SVGElement.js",[a["Core/Animation/AnimationUtilities.js"],a["Core/Renderer/HTML/AST.js"],a["Core/Color/Color.js"],a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,u,z,F,y){var v=a.animate,H=a.animObject,A=a.stop,q=F.deg2rad,n=F.doc,k=F.noop,e=F.svg,c=F.SVG_NS,h=F.win,f=y.addEvent,w=y.attr,p=y.createElement,B=y.css,t=y.defined,J=y.erase,C=y.extend,r=y.fireEvent,
l=y.isArray,b=y.isFunction,g=y.isNumber,d=y.isString,m=y.merge,D=y.objectEach,x=y.pick,I=y.pInt,P=y.syncTimeout,S=y.uniqueKey;a=function(){function a(){this.element=void 0;this.onEvents={};this.opacity=1;this.renderer=void 0;this.SVG_NS=c;this.symbolCustomAttribs="x y width height r start end innerR anchorX anchorY rounded".split(" ")}a.prototype._defaultGetter=function(b){b=x(this[b+"Value"],this[b],this.element?this.element.getAttribute(b):null,0);/^[\-0-9\.]+$/.test(b)&&(b=parseFloat(b));return b};
a.prototype._defaultSetter=function(b,d,c){c.setAttribute(d,b)};a.prototype.add=function(b){var d=this.renderer,c=this.element;b&&(this.parentGroup=b);this.parentInverted=b&&b.inverted;"undefined"!==typeof this.textStr&&"text"===this.element.nodeName&&d.buildText(this);this.added=!0;if(!b||b.handleZ||this.zIndex)var g=this.zIndexSetter();g||(b?b.element:d.box).appendChild(c);if(this.onAdd)this.onAdd();return this};a.prototype.addClass=function(b,d){var c=d?"":this.attr("class")||"";b=(b||"").split(/ /g).reduce(function(b,
d){-1===c.indexOf(d)&&b.push(d);return b},c?[c]:[]).join(" ");b!==c&&this.attr("class",b);return this};a.prototype.afterSetters=function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)};a.prototype.align=function(b,c,g){var m={},L=this.renderer,e=L.alignedObjects,l,a,E;if(b){if(this.alignOptions=b,this.alignByTranslate=c,!g||d(g))this.alignTo=l=g||"renderer",J(e,this),e.push(this),g=void 0}else b=this.alignOptions,c=this.alignByTranslate,l=this.alignTo;g=x(g,L[l],"scrollablePlotBox"===
l?L.plotBox:void 0,L);l=b.align;var r=b.verticalAlign;L=(g.x||0)+(b.x||0);e=(g.y||0)+(b.y||0);"right"===l?a=1:"center"===l&&(a=2);a&&(L+=(g.width-(b.width||0))/a);m[c?"translateX":"x"]=Math.round(L);"bottom"===r?E=1:"middle"===r&&(E=2);E&&(e+=(g.height-(b.height||0))/E);m[c?"translateY":"y"]=Math.round(e);this[this.placed?"animate":"attr"](m);this.placed=!0;this.alignAttr=m;return this};a.prototype.alignSetter=function(b){var d={left:"start",center:"middle",right:"end"};d[b]&&(this.alignValue=b,this.element.setAttribute("text-anchor",
d[b]))};a.prototype.animate=function(b,d,c){var g=this,m=H(x(d,this.renderer.globalAnimation,!0));d=m.defer;x(n.hidden,n.msHidden,n.webkitHidden,!1)&&(m.duration=0);0!==m.duration?(c&&(m.complete=c),P(function(){g.element&&v(g,b,m)},d)):(this.attr(b,void 0,c),D(b,function(b,d){m.step&&m.step.call(this,b,{prop:d,pos:1,elem:this})},this));return this};a.prototype.applyTextOutline=function(b){var d=this.element;-1!==b.indexOf("contrast")&&(b=b.replace(/contrast/g,this.renderer.getContrast(d.style.fill)));
var g=b.split(" ");b=g[g.length-1];if((g=g[0])&&"none"!==g&&F.svg){this.fakeTS=!0;this.ySetter=this.xSetter;g=g.replace(/(^[\d\.]+)(.*?)$/g,function(b,d,c){return 2*Number(d)+c});this.removeTextOutline();var m=n.createElementNS(c,"tspan");w(m,{"class":"highcharts-text-outline",fill:b,stroke:b,"stroke-width":g,"stroke-linejoin":"round"});[].forEach.call(d.childNodes,function(b){var d=b.cloneNode(!0);d.removeAttribute&&["fill","stroke","stroke-width","stroke"].forEach(function(b){return d.removeAttribute(b)});
m.appendChild(d)});var e=n.createElementNS(c,"tspan");e.textContent="\u200b";["x","y"].forEach(function(b){var c=d.getAttribute(b);c&&e.setAttribute(b,c)});m.appendChild(e);d.insertBefore(m,d.firstChild)}};a.prototype.attr=function(b,d,c,g){var m=this.element,e=this.symbolCustomAttribs,L,l=this,E,a;if("string"===typeof b&&"undefined"!==typeof d){var K=b;b={};b[K]=d}"string"===typeof b?l=(this[b+"Getter"]||this._defaultGetter).call(this,b,m):(D(b,function(d,c){E=!1;g||A(this,c);this.symbolName&&-1!==
e.indexOf(c)&&(L||(this.symbolAttr(b),L=!0),E=!0);!this.rotation||"x"!==c&&"y"!==c||(this.doTransform=!0);E||(a=this[c+"Setter"]||this._defaultSetter,a.call(this,d,c,m),!this.styledMode&&this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c)&&this.updateShadows(c,d,a))},this),this.afterSetters());c&&c.call(this);return l};a.prototype.clip=function(b){return this.attr("clip-path",b?"url("+this.renderer.url+"#"+b.id+")":"none")};a.prototype.crisp=function(b,d){d=d||b.strokeWidth||
0;var c=Math.round(d)%2/2;b.x=Math.floor(b.x||this.x||0)+c;b.y=Math.floor(b.y||this.y||0)+c;b.width=Math.floor((b.width||this.width||0)-2*c);b.height=Math.floor((b.height||this.height||0)-2*c);t(b.strokeWidth)&&(b.strokeWidth=d);return b};a.prototype.complexColor=function(b,d,c){var g=this.renderer,e,L,a,h,E,x,p,f,k,w,B=[],I;r(this.renderer,"complexColor",{args:arguments},function(){b.radialGradient?L="radialGradient":b.linearGradient&&(L="linearGradient");if(L){a=b[L];E=g.gradients;x=b.stops;k=c.radialReference;
l(a)&&(b[L]=a={x1:a[0],y1:a[1],x2:a[2],y2:a[3],gradientUnits:"userSpaceOnUse"});"radialGradient"===L&&k&&!t(a.gradientUnits)&&(h=a,a=m(a,g.getRadialAttr(k,h),{gradientUnits:"userSpaceOnUse"}));D(a,function(b,d){"id"!==d&&B.push(d,b)});D(x,function(b){B.push(b)});B=B.join(",");if(E[B])w=E[B].attr("id");else{a.id=w=S();var K=E[B]=g.createElement(L).attr(a).add(g.defs);K.radAttr=h;K.stops=[];x.forEach(function(b){0===b[1].indexOf("rgba")?(e=z.parse(b[1]),p=e.get("rgb"),f=e.get("a")):(p=b[1],f=1);b=g.createElement("stop").attr({offset:b[0],
"stop-color":p,"stop-opacity":f}).add(K);K.stops.push(b)})}I="url("+g.url+"#"+w+")";c.setAttribute(d,I);c.gradient=B;b.toString=function(){return I}}})};a.prototype.css=function(b){var d=this.styles,c={},g=this.element,m=["textOutline","textOverflow","width"],a="",l=!d;b&&b.color&&(b.fill=b.color);d&&D(b,function(b,g){d&&d[g]!==b&&(c[g]=b,l=!0)});if(l){d&&(b=C(d,c));if(b)if(null===b.width||"auto"===b.width)delete this.textWidth;else if("text"===g.nodeName.toLowerCase()&&b.width)var r=this.textWidth=
I(b.width);this.styles=b;r&&!e&&this.renderer.forExport&&delete b.width;if(g.namespaceURI===this.SVG_NS){var E=function(b,d){return"-"+d.toLowerCase()};D(b,function(b,d){-1===m.indexOf(d)&&(a+=d.replace(/([A-Z])/g,E)+":"+b+";")});a&&w(g,"style",a)}else B(g,b);this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),b&&b.textOutline&&this.applyTextOutline(b.textOutline))}return this};a.prototype.dashstyleSetter=function(b){var d=this["stroke-width"];"inherit"===d&&(d=1);if(b=b&&b.toLowerCase()){var c=
b.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(b=c.length;b--;)c[b]=""+I(c[b])*x(d,NaN);b=c.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",b)}};a.prototype.destroy=function(){var b=this,d=b.element||{},c=b.renderer,g=d.ownerSVGElement,m=c.isSVG&&"SPAN"===d.nodeName&&b.parentGroup||
void 0;d.onclick=d.onmouseout=d.onmouseover=d.onmousemove=d.point=null;A(b);if(b.clipPath&&g){var e=b.clipPath;[].forEach.call(g.querySelectorAll("[clip-path],[CLIP-PATH]"),function(b){-1<b.getAttribute("clip-path").indexOf(e.element.id)&&b.removeAttribute("clip-path")});b.clipPath=e.destroy()}if(b.stops){for(g=0;g<b.stops.length;g++)b.stops[g].destroy();b.stops.length=0;b.stops=void 0}b.safeRemoveChild(d);for(c.styledMode||b.destroyShadows();m&&m.div&&0===m.div.childNodes.length;)d=m.parentGroup,
b.safeRemoveChild(m.div),delete m.div,m=d;b.alignTo&&J(c.alignedObjects,b);D(b,function(d,c){b[c]&&b[c].parentGroup===b&&b[c].destroy&&b[c].destroy();delete b[c]})};a.prototype.destroyShadows=function(){(this.shadows||[]).forEach(function(b){this.safeRemoveChild(b)},this);this.shadows=void 0};a.prototype.destroyTextPath=function(b,d){var c=b.getElementsByTagName("text")[0];if(c){if(c.removeAttribute("dx"),c.removeAttribute("dy"),d.element.setAttribute("id",""),this.textPathWrapper&&c.getElementsByTagName("textPath").length){for(b=
this.textPathWrapper.element.childNodes;b.length;)c.appendChild(b[0]);c.removeChild(this.textPathWrapper.element)}}else if(b.getAttribute("dx")||b.getAttribute("dy"))b.removeAttribute("dx"),b.removeAttribute("dy");this.textPathWrapper&&(this.textPathWrapper=this.textPathWrapper.destroy())};a.prototype.dSetter=function(b,d,c){l(b)&&("string"===typeof b[0]&&(b=this.renderer.pathToSegments(b)),this.pathArray=b,b=b.reduce(function(b,d,c){return d&&d.join?(c?b+" ":"")+d.join(" "):(d||"").toString()},""));
/(NaN| {2}|^$)/.test(b)&&(b="M 0 0");this[d]!==b&&(c.setAttribute(d,b),this[d]=b)};a.prototype.fadeOut=function(b){var d=this;d.animate({opacity:0},{duration:x(b,150),complete:function(){d.attr({y:-9999}).hide()}})};a.prototype.fillSetter=function(b,d,c){"string"===typeof b?c.setAttribute(d,b):b&&this.complexColor(b,d,c)};a.prototype.getBBox=function(d,c){var g=this.renderer,m=this.element,e=this.styles,l=this.textStr,r=g.cache,h=g.cacheKeys,E=m.namespaceURI===this.SVG_NS;c=x(c,this.rotation,0);var p=
g.styledMode?m&&a.prototype.getStyle.call(m,"font-size"):e&&e.fontSize,f;if(t(l)){var D=l.toString();-1===D.indexOf("<")&&(D=D.replace(/[0-9]/g,"0"));D+=["",c,p,this.textWidth,e&&e.textOverflow,e&&e.fontWeight].join()}D&&!d&&(f=r[D]);if(!f){if(E||g.forExport){try{var k=this.fakeTS&&function(b){var d=m.querySelector(".highcharts-text-outline");d&&B(d,{display:b})};b(k)&&k("none");f=m.getBBox?C({},m.getBBox()):{width:m.offsetWidth,height:m.offsetHeight};b(k)&&k("")}catch(X){""}if(!f||0>f.width)f={width:0,
height:0}}else f=this.htmlGetBBox();g.isSVG&&(d=f.width,g=f.height,E&&(f.height=g={"11px,17":14,"13px,20":16}[(p||"")+","+Math.round(g)]||g),c&&(E=c*q,f.width=Math.abs(g*Math.sin(E))+Math.abs(d*Math.cos(E)),f.height=Math.abs(g*Math.cos(E))+Math.abs(d*Math.sin(E))));if(D&&(""===l||0<f.height)){for(;250<h.length;)delete r[h.shift()];r[D]||h.push(D);r[D]=f}}return f};a.prototype.getStyle=function(b){return h.getComputedStyle(this.element||this,"").getPropertyValue(b)};a.prototype.hasClass=function(b){return-1!==
(""+this.attr("class")).split(" ").indexOf(b)};a.prototype.hide=function(b){b?this.attr({y:-9999}):this.attr({visibility:"hidden"});return this};a.prototype.htmlGetBBox=function(){return{height:0,width:0,x:0,y:0}};a.prototype.init=function(b,d){this.element="span"===d?p(d):n.createElementNS(this.SVG_NS,d);this.renderer=b;r(this,"afterInit")};a.prototype.invert=function(b){this.inverted=b;this.updateTransform();return this};a.prototype.on=function(b,d){var c=this.onEvents;if(c[b])c[b]();c[b]=f(this.element,
b,d);return this};a.prototype.opacitySetter=function(b,d,c){this.opacity=b=Number(Number(b).toFixed(3));c.setAttribute(d,b)};a.prototype.removeClass=function(b){return this.attr("class",(""+this.attr("class")).replace(d(b)?new RegExp("(^| )"+b+"( |$)"):b," ").replace(/ +/g," ").trim())};a.prototype.removeTextOutline=function(){var b=this.element.querySelector("tspan.highcharts-text-outline");b&&this.safeRemoveChild(b)};a.prototype.safeRemoveChild=function(b){var d=b.parentNode;d&&d.removeChild(b)};
a.prototype.setRadialReference=function(b){var d=this.element.gradient&&this.renderer.gradients[this.element.gradient];this.element.radialReference=b;d&&d.radAttr&&d.animate(this.renderer.getRadialAttr(b,d.radAttr));return this};a.prototype.setTextPath=function(b,d){var c=this.element,e=this.text?this.text.element:c,a={textAnchor:"text-anchor"},l=!1,r=this.textPathWrapper,x=!r;d=m(!0,{enabled:!0,attributes:{dy:-5,startOffset:"50%",textAnchor:"middle"}},d);var E=u.filterUserAttributes(d.attributes);
if(b&&d&&d.enabled){r&&null===r.element.parentNode?(x=!0,r=r.destroy()):r&&this.removeTextOutline.call(r.parentGroup);this.options&&this.options.padding&&(E.dx=-this.options.padding);r||(this.textPathWrapper=r=this.renderer.createElement("textPath"),l=!0);var p=r.element;(d=b.element.getAttribute("id"))||b.element.setAttribute("id",d=S());if(x)for(e.setAttribute("y",0),g(E.dx)&&e.setAttribute("x",-E.dx),b=[].slice.call(e.childNodes),x=0;x<b.length;x++){var f=b[x];f.nodeType!==h.Node.TEXT_NODE&&"tspan"!==
f.nodeName||p.appendChild(f)}l&&r&&r.add({element:e});p.setAttributeNS("http://www.w3.org/1999/xlink","href",this.renderer.url+"#"+d);t(E.dy)&&(p.parentNode.setAttribute("dy",E.dy),delete E.dy);t(E.dx)&&(p.parentNode.setAttribute("dx",E.dx),delete E.dx);D(E,function(b,d){p.setAttribute(a[d]||d,b)});c.removeAttribute("transform");this.removeTextOutline.call(r);this.text&&!this.renderer.styledMode&&this.attr({fill:"none","stroke-width":0});this.applyTextOutline=this.updateTransform=k}else r&&(delete this.updateTransform,
delete this.applyTextOutline,this.destroyTextPath(c,b),this.updateTransform(),this.options&&this.options.rotation&&this.applyTextOutline(this.options.style.textOutline));return this};a.prototype.shadow=function(b,d,c){var g=[],m=this.element,e=this.oldShadowOptions,a={color:"#000000",offsetX:this.parentInverted?-1:1,offsetY:this.parentInverted?-1:1,opacity:.15,width:3},l=!1,E;!0===b?E=a:"object"===typeof b&&(E=C(a,b));E&&(E&&e&&D(E,function(b,d){b!==e[d]&&(l=!0)}),l&&this.destroyShadows(),this.oldShadowOptions=
E);if(!E)this.destroyShadows();else if(!this.shadows){var L=E.opacity/E.width;var r=this.parentInverted?"translate("+E.offsetY+", "+E.offsetX+")":"translate("+E.offsetX+", "+E.offsetY+")";for(a=1;a<=E.width;a++){var h=m.cloneNode(!1);var x=2*E.width+1-2*a;w(h,{stroke:b.color||"#000000","stroke-opacity":L*a,"stroke-width":x,transform:r,fill:"none"});h.setAttribute("class",(h.getAttribute("class")||"")+" highcharts-shadow");c&&(w(h,"height",Math.max(w(h,"height")-x,0)),h.cutHeight=x);d?d.element.appendChild(h):
m.parentNode&&m.parentNode.insertBefore(h,m);g.push(h)}this.shadows=g}return this};a.prototype.show=function(b){return this.attr({visibility:b?"inherit":"visible"})};a.prototype.strokeSetter=function(b,d,c){this[d]=b;this.stroke&&this["stroke-width"]?(a.prototype.fillSetter.call(this,this.stroke,"stroke",c),c.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===d&&0===b&&this.hasStroke?(c.removeAttribute("stroke"),this.hasStroke=!1):this.renderer.styledMode&&this["stroke-width"]&&
(c.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0)};a.prototype.strokeWidth=function(){if(!this.renderer.styledMode)return this["stroke-width"]||0;var b=this.getStyle("stroke-width"),d=0;if(b.indexOf("px")===b.length-2)d=I(b);else if(""!==b){var g=n.createElementNS(c,"rect");w(g,{width:b,"stroke-width":0});this.element.parentNode.appendChild(g);d=g.getBBox().width;g.parentNode.removeChild(g)}return d};a.prototype.symbolAttr=function(b){var d=this;"x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(c){d[c]=
x(b[c],d[c])});d.attr({d:d.renderer.symbols[d.symbolName](d.x,d.y,d.width,d.height,d)})};a.prototype.textSetter=function(b){b!==this.textStr&&(delete this.textPxLength,this.textStr=b,this.added&&this.renderer.buildText(this))};a.prototype.titleSetter=function(b){var d=this.element,c=d.getElementsByTagName("title")[0]||n.createElementNS(this.SVG_NS,"title");d.insertBefore?d.insertBefore(c,d.firstChild):d.appendChild(c);c.textContent=String(x(b,"")).replace(/<[^>]*>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,
">")};a.prototype.toFront=function(){var b=this.element;b.parentNode.appendChild(b);return this};a.prototype.translate=function(b,d){return this.attr({translateX:b,translateY:d})};a.prototype.updateShadows=function(b,d,c){var g=this.shadows;if(g)for(var m=g.length;m--;)c.call(g[m],"height"===b?Math.max(d-(g[m].cutHeight||0),0):"d"===b?this.d:d,b,g[m])};a.prototype.updateTransform=function(){var b=this.scaleX,d=this.scaleY,c=this.inverted,g=this.rotation,m=this.matrix,e=this.element,a=this.translateX||
0,l=this.translateY||0;c&&(a+=this.width,l+=this.height);a=["translate("+a+","+l+")"];t(m)&&a.push("matrix("+m.join(",")+")");c?a.push("rotate(90) scale(-1,1)"):g&&a.push("rotate("+g+" "+x(this.rotationOriginX,e.getAttribute("x"),0)+" "+x(this.rotationOriginY,e.getAttribute("y")||0)+")");(t(b)||t(d))&&a.push("scale("+x(b,1)+" "+x(d,1)+")");a.length&&e.setAttribute("transform",a.join(" "))};a.prototype.visibilitySetter=function(b,d,c){"inherit"===b?c.removeAttribute(d):this[d]!==b&&c.setAttribute(d,
b);this[d]=b};a.prototype.xGetter=function(b){"circle"===this.element.nodeName&&("x"===b?b="cx":"y"===b&&(b="cy"));return this._defaultGetter(b)};a.prototype.zIndexSetter=function(b,d){var c=this.renderer,g=this.parentGroup,m=(g||c).element||c.box,e=this.element;c=m===c.box;var a=!1;var l=this.added;var E;t(b)?(e.setAttribute("data-z-index",b),b=+b,this[d]===b&&(l=!1)):t(this[d])&&e.removeAttribute("data-z-index");this[d]=b;if(l){(b=this.zIndex)&&g&&(g.handleZ=!0);d=m.childNodes;for(E=d.length-1;0<=
E&&!a;E--){g=d[E];l=g.getAttribute("data-z-index");var r=!t(l);if(g!==e)if(0>b&&r&&!c&&!E)m.insertBefore(e,d[E]),a=!0;else if(I(l)<=b||r&&(!t(b)||0<=b))m.insertBefore(e,d[E+1]||null),a=!0}a||(m.insertBefore(e,d[c?3:0]||null),a=!0)}return a};return a}();a.prototype["stroke-widthSetter"]=a.prototype.strokeSetter;a.prototype.yGetter=a.prototype.xGetter;a.prototype.matrixSetter=a.prototype.rotationOriginXSetter=a.prototype.rotationOriginYSetter=a.prototype.rotationSetter=a.prototype.scaleXSetter=a.prototype.scaleYSetter=
a.prototype.translateXSetter=a.prototype.translateYSetter=a.prototype.verticalAlignSetter=function(b,d){this[d]=b;this.doTransform=!0};"";return a});M(a,"Core/Renderer/RendererRegistry.js",[a["Core/Globals.js"]],function(a){var v;(function(v){v.rendererTypes={};var u;v.getRendererType=function(a){void 0===a&&(a=u);return v.rendererTypes[a]||v.rendererTypes[u]};v.registerRendererType=function(y,z,H){v.rendererTypes[y]=z;if(!u||H)u=y,a.Renderer=z}})(v||(v={}));return v});M(a,"Core/Renderer/SVG/SVGLabel.js",
[a["Core/Renderer/SVG/SVGElement.js"],a["Core/Utilities.js"]],function(a,u){var v=this&&this.__extends||function(){var a=function(k,e){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,e){c.__proto__=e}||function(c,e){for(var a in e)e.hasOwnProperty(a)&&(c[a]=e[a])};return a(k,e)};return function(k,e){function c(){this.constructor=k}a(k,e);k.prototype=null===e?Object.create(e):(c.prototype=e.prototype,new c)}}(),F=u.defined,y=u.extend,G=u.isNumber,H=u.merge,A=u.pick,q=u.removeEvent;
return function(n){function k(e,c,a,f,w,p,B,t,J,C){var r=n.call(this)||this;r.paddingLeftSetter=r.paddingSetter;r.paddingRightSetter=r.paddingSetter;r.init(e,"g");r.textStr=c;r.x=a;r.y=f;r.anchorX=p;r.anchorY=B;r.baseline=J;r.className=C;r.addClass("button"===C?"highcharts-no-tooltip":"highcharts-label");C&&r.addClass("highcharts-"+C);r.text=e.text(void 0,0,0,t).attr({zIndex:1});var l;"string"===typeof w&&((l=/^url\((.*?)\)$/.test(w))||r.renderer.symbols[w])&&(r.symbolKey=w);r.bBox=k.emptyBBox;r.padding=
3;r.baselineOffset=0;r.needsBox=e.styledMode||l;r.deferredAttr={};r.alignFactor=0;return r}v(k,n);k.prototype.alignSetter=function(e){e={left:0,center:.5,right:1}[e];e!==this.alignFactor&&(this.alignFactor=e,this.bBox&&G(this.xSetting)&&this.attr({x:this.xSetting}))};k.prototype.anchorXSetter=function(e,c){this.anchorX=e;this.boxAttr(c,Math.round(e)-this.getCrispAdjust()-this.xSetting)};k.prototype.anchorYSetter=function(e,c){this.anchorY=e;this.boxAttr(c,e-this.ySetting)};k.prototype.boxAttr=function(e,
c){this.box?this.box.attr(e,c):this.deferredAttr[e]=c};k.prototype.css=function(e){if(e){var c={};e=H(e);k.textProps.forEach(function(a){"undefined"!==typeof e[a]&&(c[a]=e[a],delete e[a])});this.text.css(c);var h="width"in c;"fontSize"in c||"fontWeight"in c?this.updateTextPadding():h&&this.updateBoxSize()}return a.prototype.css.call(this,e)};k.prototype.destroy=function(){q(this.element,"mouseenter");q(this.element,"mouseleave");this.text&&this.text.destroy();this.box&&(this.box=this.box.destroy());
a.prototype.destroy.call(this)};k.prototype.fillSetter=function(e,c){e&&(this.needsBox=!0);this.fill=e;this.boxAttr(c,e)};k.prototype.getBBox=function(){this.textStr&&0===this.bBox.width&&0===this.bBox.height&&this.updateBoxSize();var e=this.padding,c=A(this.paddingLeft,e);return{width:this.width,height:this.height,x:this.bBox.x-c,y:this.bBox.y-e}};k.prototype.getCrispAdjust=function(){return this.renderer.styledMode&&this.box?this.box.strokeWidth()%2/2:(this["stroke-width"]?parseInt(this["stroke-width"],
10):0)%2/2};k.prototype.heightSetter=function(e){this.heightSetting=e};k.prototype.onAdd=function(){var e=this.textStr;this.text.add(this);this.attr({text:F(e)?e:"",x:this.x,y:this.y});this.box&&F(this.anchorX)&&this.attr({anchorX:this.anchorX,anchorY:this.anchorY})};k.prototype.paddingSetter=function(e,c){G(e)?e!==this[c]&&(this[c]=e,this.updateTextPadding()):this[c]=void 0};k.prototype.rSetter=function(e,c){this.boxAttr(c,e)};k.prototype.shadow=function(e){e&&!this.renderer.styledMode&&(this.updateBoxSize(),
this.box&&this.box.shadow(e));return this};k.prototype.strokeSetter=function(e,c){this.stroke=e;this.boxAttr(c,e)};k.prototype["stroke-widthSetter"]=function(e,c){e&&(this.needsBox=!0);this["stroke-width"]=e;this.boxAttr(c,e)};k.prototype["text-alignSetter"]=function(e){this.textAlign=e};k.prototype.textSetter=function(e){"undefined"!==typeof e&&this.text.attr({text:e});this.updateTextPadding()};k.prototype.updateBoxSize=function(){var e=this.text.element.style,c={},a=this.padding,f=this.bBox=G(this.widthSetting)&&
G(this.heightSetting)&&!this.textAlign||!F(this.text.textStr)?k.emptyBBox:this.text.getBBox();this.width=this.getPaddedWidth();this.height=(this.heightSetting||f.height||0)+2*a;e=this.renderer.fontMetrics(e&&e.fontSize,this.text);this.baselineOffset=a+Math.min((this.text.firstLineMetrics||e).b,f.height||Infinity);this.heightSetting&&(this.baselineOffset+=(this.heightSetting-e.h)/2);this.needsBox&&(this.box||(a=this.box=this.symbolKey?this.renderer.symbol(this.symbolKey):this.renderer.rect(),a.addClass(("button"===
this.className?"":"highcharts-label-box")+(this.className?" highcharts-"+this.className+"-box":"")),a.add(this)),a=this.getCrispAdjust(),c.x=a,c.y=(this.baseline?-this.baselineOffset:0)+a,c.width=Math.round(this.width),c.height=Math.round(this.height),this.box.attr(y(c,this.deferredAttr)),this.deferredAttr={})};k.prototype.updateTextPadding=function(){var a=this.text;this.updateBoxSize();var c=this.baseline?0:this.baselineOffset,h=A(this.paddingLeft,this.padding);F(this.widthSetting)&&this.bBox&&
("center"===this.textAlign||"right"===this.textAlign)&&(h+={center:.5,right:1}[this.textAlign]*(this.widthSetting-this.bBox.width));if(h!==a.x||c!==a.y)a.attr("x",h),a.hasBoxWidthChanged&&(this.bBox=a.getBBox(!0)),"undefined"!==typeof c&&a.attr("y",c);a.x=h;a.y=c};k.prototype.widthSetter=function(a){this.widthSetting=G(a)?a:void 0};k.prototype.getPaddedWidth=function(){var a=this.padding,c=A(this.paddingLeft,a);a=A(this.paddingRight,a);return(this.widthSetting||this.bBox.width||0)+c+a};k.prototype.xSetter=
function(a){this.x=a;this.alignFactor&&(a-=this.alignFactor*this.getPaddedWidth(),this["forceAnimate:x"]=!0);this.xSetting=Math.round(a);this.attr("translateX",this.xSetting)};k.prototype.ySetter=function(a){this.ySetting=this.y=Math.round(a);this.attr("translateY",this.ySetting)};k.emptyBBox={width:0,height:0,x:0,y:0};k.textProps="color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");return k}(a)});M(a,"Core/Renderer/SVG/Symbols.js",
[a["Core/Utilities.js"]],function(a){function v(a,q,n,k,e){var c=[];if(e){var h=e.start||0,f=H(e.r,n);n=H(e.r,k||n);var w=(e.end||0)-.001;k=e.innerR;var p=H(e.open,.001>Math.abs((e.end||0)-h-2*Math.PI)),B=Math.cos(h),t=Math.sin(h),J=Math.cos(w),C=Math.sin(w);h=H(e.longArc,.001>w-h-Math.PI?0:1);c.push(["M",a+f*B,q+n*t],["A",f,n,0,h,H(e.clockwise,1),a+f*J,q+n*C]);y(k)&&c.push(p?["M",a+k*J,q+k*C]:["L",a+k*J,q+k*C],["A",k,k,0,h,y(e.clockwise)?1-e.clockwise:0,a+k*B,q+k*t]);p||c.push(["Z"])}return c}function z(a,
q,n,k,e){return e&&e.r?F(a,q,n,k,e):[["M",a,q],["L",a+n,q],["L",a+n,q+k],["L",a,q+k],["Z"]]}function F(a,q,n,k,e){e=e&&e.r||0;return[["M",a+e,q],["L",a+n-e,q],["C",a+n,q,a+n,q,a+n,q+e],["L",a+n,q+k-e],["C",a+n,q+k,a+n,q+k,a+n-e,q+k],["L",a+e,q+k],["C",a,q+k,a,q+k,a,q+k-e],["L",a,q+e],["C",a,q,a,q,a+e,q]]}var y=a.defined,G=a.isNumber,H=a.pick;return{arc:v,callout:function(a,q,n,k,e){var c=Math.min(e&&e.r||0,n,k),h=c+6,f=e&&e.anchorX;e=e&&e.anchorY||0;var w=F(a,q,n,k,{r:c});if(!G(f))return w;a+f>=n?
e>q+h&&e<q+k-h?w.splice(3,1,["L",a+n,e-6],["L",a+n+6,e],["L",a+n,e+6],["L",a+n,q+k-c]):w.splice(3,1,["L",a+n,k/2],["L",f,e],["L",a+n,k/2],["L",a+n,q+k-c]):0>=a+f?e>q+h&&e<q+k-h?w.splice(7,1,["L",a,e+6],["L",a-6,e],["L",a,e-6],["L",a,q+c]):w.splice(7,1,["L",a,k/2],["L",f,e],["L",a,k/2],["L",a,q+c]):e&&e>k&&f>a+h&&f<a+n-h?w.splice(5,1,["L",f+6,q+k],["L",f,q+k+6],["L",f-6,q+k],["L",a+c,q+k]):e&&0>e&&f>a+h&&f<a+n-h&&w.splice(1,1,["L",f-6,q],["L",f,q-6],["L",f+6,q],["L",n-c,q]);return w},circle:function(a,
q,n,k){return v(a+n/2,q+k/2,n/2,k/2,{start:.5*Math.PI,end:2.5*Math.PI,open:!1})},diamond:function(a,q,n,k){return[["M",a+n/2,q],["L",a+n,q+k/2],["L",a+n/2,q+k],["L",a,q+k/2],["Z"]]},rect:z,roundedRect:F,square:z,triangle:function(a,q,n,k){return[["M",a+n/2,q],["L",a+n,q+k],["L",a,q+k],["Z"]]},"triangle-down":function(a,q,n,k){return[["M",a,q],["L",a+n,q],["L",a+n/2,q+k],["Z"]]}}});M(a,"Core/Renderer/SVG/TextBuilder.js",[a["Core/Renderer/HTML/AST.js"],a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,
u,z){var v=u.doc,y=u.SVG_NS,G=u.win,H=z.attr,A=z.isString,q=z.objectEach,n=z.pick;return function(){function k(a){var c=a.styles;this.renderer=a.renderer;this.svgElement=a;this.width=a.textWidth;this.textLineHeight=c&&c.lineHeight;this.textOutline=c&&c.textOutline;this.ellipsis=!(!c||"ellipsis"!==c.textOverflow);this.noWrap=!(!c||"nowrap"!==c.whiteSpace);this.fontSize=c&&c.fontSize}k.prototype.buildSVG=function(){var e=this.svgElement,c=e.element,h=e.renderer,f=n(e.textStr,"").toString(),k=-1!==f.indexOf("<"),
p=c.childNodes;h=this.width&&!e.added&&h.box;var B=/<br.*?>/g,t=[f,this.ellipsis,this.noWrap,this.textLineHeight,this.textOutline,this.fontSize,this.width].join();if(t!==e.textCache){e.textCache=t;delete e.actualWidth;for(t=p.length;t--;)c.removeChild(p[t]);k||this.ellipsis||this.width||-1!==f.indexOf(" ")&&(!this.noWrap||B.test(f))?""!==f&&(h&&h.appendChild(c),f=new a(f),this.modifyTree(f.nodes),f.addToDOM(e.element),this.modifyDOM(),this.ellipsis&&-1!==(c.textContent||"").indexOf("\u2026")&&e.attr("title",
this.unescapeEntities(e.textStr||"",["&lt;","&gt;"])),h&&h.removeChild(c)):c.appendChild(v.createTextNode(this.unescapeEntities(f)));A(this.textOutline)&&e.applyTextOutline&&e.applyTextOutline(this.textOutline)}};k.prototype.modifyDOM=function(){var a=this,c=this.svgElement,h=H(c.element,"x");c.firstLineMetrics=void 0;for(var f;f=c.element.firstChild;)if(/^[\s\u200B]*$/.test(f.textContent||" "))c.element.removeChild(f);else break;[].forEach.call(c.element.querySelectorAll("tspan.highcharts-br"),function(e,
p){e.nextSibling&&e.previousSibling&&(0===p&&1===e.previousSibling.nodeType&&(c.firstLineMetrics=c.renderer.fontMetrics(void 0,e.previousSibling)),H(e,{dy:a.getLineHeight(e.nextSibling),x:h}))});var k=this.width||0;if(k){var p=function(e,p){var f=e.textContent||"",r=f.replace(/([^\^])-/g,"$1- ").split(" "),l=!a.noWrap&&(1<r.length||1<c.element.childNodes.length),b=a.getLineHeight(p),g=0,d=c.actualWidth;if(a.ellipsis)f&&a.truncate(e,f,void 0,0,Math.max(0,k-parseInt(a.fontSize||12,10)),function(b,d){return b.substring(0,
d)+"\u2026"});else if(l){f=[];for(l=[];p.firstChild&&p.firstChild!==e;)l.push(p.firstChild),p.removeChild(p.firstChild);for(;r.length;)r.length&&!a.noWrap&&0<g&&(f.push(e.textContent||""),e.textContent=r.join(" ").replace(/- /g,"-")),a.truncate(e,void 0,r,0===g?d||0:0,k,function(b,d){return r.slice(0,d).join(" ").replace(/- /g,"-")}),d=c.actualWidth,g++;l.forEach(function(b){p.insertBefore(b,e)});f.forEach(function(d){p.insertBefore(v.createTextNode(d),e);d=v.createElementNS(y,"tspan");d.textContent=
"\u200b";H(d,{dy:b,x:h});p.insertBefore(d,e)})}},B=function(a){[].slice.call(a.childNodes).forEach(function(e){e.nodeType===G.Node.TEXT_NODE?p(e,a):(-1!==e.className.baseVal.indexOf("highcharts-br")&&(c.actualWidth=0),B(e))})};B(c.element)}};k.prototype.getLineHeight=function(a){var c;a=a.nodeType===G.Node.TEXT_NODE?a.parentElement:a;this.renderer.styledMode||(c=a&&/(px|em)$/.test(a.style.fontSize)?a.style.fontSize:this.fontSize||this.renderer.style.fontSize||12);return this.textLineHeight?parseInt(this.textLineHeight.toString(),
10):this.renderer.fontMetrics(c,a||this.svgElement.element).h};k.prototype.modifyTree=function(a){var c=this,e=function(h,k){var p=h.attributes;p=void 0===p?{}:p;var f=h.children,t=h.tagName,w=c.renderer.styledMode;if("b"===t||"strong"===t)w?p["class"]="highcharts-strong":p.style="font-weight:bold;"+(p.style||"");else if("i"===t||"em"===t)w?p["class"]="highcharts-emphasized":p.style="font-style:italic;"+(p.style||"");A(p.style)&&(p.style=p.style.replace(/(;| |^)color([ :])/,"$1fill$2"));"br"===t?
(p["class"]="highcharts-br",h.textContent="\u200b",(k=a[k+1])&&k.textContent&&(k.textContent=k.textContent.replace(/^ +/gm,""))):"a"===t&&f&&f.some(function(c){return"#text"===c.tagName})&&(h.children=[{children:f,tagName:"tspan"}]);"#text"!==t&&"a"!==t&&(h.tagName="tspan");h.attributes=p;f&&f.filter(function(c){return"#text"!==c.tagName}).forEach(e)};a.forEach(e)};k.prototype.truncate=function(a,c,h,f,k,p){var e=this.svgElement,t=e.renderer,w=e.rotation,n=[],r=h?1:0,l=(c||h||"").length,b=l,g,d=function(b,
d){d=d||b;var g=a.parentNode;if(g&&"undefined"===typeof n[d])if(g.getSubStringLength)try{n[d]=f+g.getSubStringLength(0,h?d+1:d)}catch(P){""}else t.getSpanWidth&&(a.textContent=p(c||h,b),n[d]=f+t.getSpanWidth(e,a));return n[d]};e.rotation=0;var m=d(a.textContent.length);if(f+m>k){for(;r<=l;)b=Math.ceil((r+l)/2),h&&(g=p(h,b)),m=d(b,g&&g.length-1),r===l?r=l+1:m>k?l=b-1:r=b;0===l?a.textContent="":c&&l===c.length-1||(a.textContent=g||p(c||h,b))}h&&h.splice(0,b);e.actualWidth=m;e.rotation=w};k.prototype.unescapeEntities=
function(a,c){q(this.renderer.escapes,function(e,f){c&&-1!==c.indexOf(e)||(a=a.toString().replace(new RegExp(e,"g"),f))});return a};return k}()});M(a,"Core/Renderer/SVG/SVGRenderer.js",[a["Core/Renderer/HTML/AST.js"],a["Core/Color/Color.js"],a["Core/Globals.js"],a["Core/Renderer/RendererRegistry.js"],a["Core/Renderer/SVG/SVGElement.js"],a["Core/Renderer/SVG/SVGLabel.js"],a["Core/Renderer/SVG/Symbols.js"],a["Core/Renderer/SVG/TextBuilder.js"],a["Core/Utilities.js"]],function(a,u,z,F,y,G,H,A,q){var n=
z.charts,k=z.deg2rad,e=z.doc,c=z.isFirefox,h=z.isMS,f=z.isWebKit,w=z.noop,p=z.SVG_NS,B=z.symbolSizes,t=z.win,J=q.addEvent,C=q.attr,r=q.createElement,l=q.css,b=q.defined,g=q.destroyObjectProperties,d=q.extend,m=q.isArray,D=q.isNumber,x=q.isObject,I=q.isString,P=q.merge,v=q.pick,O=q.pInt,U=q.uniqueKey,Y;z=function(){function L(b,d,a,c,g,m,e){this.width=this.url=this.style=this.isSVG=this.imgCount=this.height=this.gradients=this.globalAnimation=this.defs=this.chartIndex=this.cacheKeys=this.cache=this.boxWrapper=
this.box=this.alignedObjects=void 0;this.init(b,d,a,c,g,m,e)}L.prototype.init=function(b,d,a,g,m,E,L){var r=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}),K=r.element;L||r.css(this.getStyle(g));b.appendChild(K);C(b,"dir","ltr");-1===b.innerHTML.indexOf("xmlns")&&C(K,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=K;this.boxWrapper=r;this.alignedObjects=[];this.url=this.getReferenceURL();this.createElement("desc").add().element.appendChild(e.createTextNode("Created with Highcharts 9.3.2"));
this.defs=this.createElement("defs").add();this.allowHTML=E;this.forExport=m;this.styledMode=L;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(d,a,!1);var p;c&&b.getBoundingClientRect&&(d=function(){l(b,{left:0,top:0});p=b.getBoundingClientRect();l(b,{left:Math.ceil(p.left)-p.left+"px",top:Math.ceil(p.top)-p.top+"px"})},d(),this.unSubPixelFix=J(t,"resize",d))};L.prototype.definition=function(b){return(new a([b])).addToDOM(this.defs.element)};L.prototype.getReferenceURL=
function(){if((c||f)&&e.getElementsByTagName("base").length){if(!b(Y)){var d=U();d=(new a([{tagName:"svg",attributes:{width:8,height:8},children:[{tagName:"defs",children:[{tagName:"clipPath",attributes:{id:d},children:[{tagName:"rect",attributes:{width:4,height:4}}]}]},{tagName:"rect",attributes:{id:"hitme",width:8,height:8,"clip-path":"url(#"+d+")",fill:"rgba(0,0,0,0.001)"}}]}])).addToDOM(e.body);l(d,{position:"fixed",top:0,left:0,zIndex:9E5});var g=e.elementFromPoint(6,6);Y="hitme"===(g&&g.id);
e.body.removeChild(d)}if(Y)return t.location.href.split("#")[0].replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20")}return""};L.prototype.getStyle=function(b){return this.style=d({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},b)};L.prototype.setStyle=function(b){this.boxWrapper.css(this.getStyle(b))};L.prototype.isHidden=function(){return!this.boxWrapper.getBBox().width};L.prototype.destroy=function(){var b=this.defs;this.box=
null;this.boxWrapper=this.boxWrapper.destroy();g(this.gradients||{});this.gradients=null;b&&(this.defs=b.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null};L.prototype.createElement=function(b){var d=new this.Element;d.init(this,b);return d};L.prototype.getRadialAttr=function(b,d){return{cx:b[0]-b[2]/2+(d.cx||0)*b[2],cy:b[1]-b[2]/2+(d.cy||0)*b[2],r:(d.r||0)*b[2]}};L.prototype.buildText=function(b){(new A(b)).buildSVG()};L.prototype.getContrast=function(b){b=u.parse(b).rgba;
b[0]*=1;b[1]*=1.2;b[2]*=.5;return 459<b[0]+b[1]+b[2]?"#000000":"#FFFFFF"};L.prototype.button=function(b,c,g,m,e,l,L,r,p,x){var E=this.label(b,c,g,p,void 0,void 0,x,void 0,"button"),f=this.styledMode,K=0,D=e?P(e):{};b=D&&D.style||{};D=a.filterUserAttributes(D);E.attr(P({padding:8,r:2},D));if(!f){D=P({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},{style:b},D);var k=D.style;delete D.style;l=P(D,{fill:"#e6e6e6"},a.filterUserAttributes(l||
{}));var N=l.style;delete l.style;L=P(D,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},a.filterUserAttributes(L||{}));var w=L.style;delete L.style;r=P(D,{style:{color:"#cccccc"}},a.filterUserAttributes(r||{}));var t=r.style;delete r.style}J(E.element,h?"mouseover":"mouseenter",function(){3!==K&&E.setState(1)});J(E.element,h?"mouseout":"mouseleave",function(){3!==K&&E.setState(K)});E.setState=function(b){1!==b&&(E.state=K=b);E.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+
["normal","hover","pressed","disabled"][b||0]);f||E.attr([D,l,L,r][b||0]).css([k,N,w,t][b||0])};f||E.attr(D).css(d({cursor:"default"},k));return E.on("touchstart",function(b){return b.stopPropagation()}).on("click",function(b){3!==K&&m.call(E,b)})};L.prototype.crispLine=function(d,a,c){void 0===c&&(c="round");var g=d[0],m=d[1];b(g[1])&&g[1]===m[1]&&(g[1]=m[1]=Math[c](g[1])-a%2/2);b(g[2])&&g[2]===m[2]&&(g[2]=m[2]=Math[c](g[2])+a%2/2);return d};L.prototype.path=function(b){var a=this.styledMode?{}:
{fill:"none"};m(b)?a.d=b:x(b)&&d(a,b);return this.createElement("path").attr(a)};L.prototype.circle=function(b,d,a){b=x(b)?b:"undefined"===typeof b?{}:{x:b,y:d,r:a};d=this.createElement("circle");d.xSetter=d.ySetter=function(b,d,a){a.setAttribute("c"+d,b)};return d.attr(b)};L.prototype.arc=function(b,d,a,c,g,m){x(b)?(c=b,d=c.y,a=c.r,b=c.x):c={innerR:c,start:g,end:m};b=this.symbol("arc",b,d,a,a,c);b.r=a;return b};L.prototype.rect=function(b,d,a,c,g,m){g=x(b)?b.r:g;var e=this.createElement("rect");
b=x(b)?b:"undefined"===typeof b?{}:{x:b,y:d,width:Math.max(a,0),height:Math.max(c,0)};this.styledMode||("undefined"!==typeof m&&(b["stroke-width"]=m,b=e.crisp(b)),b.fill="none");g&&(b.r=g);e.rSetter=function(b,d,a){e.r=b;C(a,{rx:b,ry:b})};e.rGetter=function(){return e.r||0};return e.attr(b)};L.prototype.setSize=function(b,d,a){this.width=b;this.height=d;this.boxWrapper.animate({width:b,height:d},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:v(a,
!0)?void 0:0});this.alignElements()};L.prototype.g=function(b){var d=this.createElement("g");return b?d.attr({"class":"highcharts-"+b}):d};L.prototype.image=function(b,d,a,c,g,m){var e={preserveAspectRatio:"none"},l=function(b,d){b.setAttributeNS?b.setAttributeNS("http://www.w3.org/1999/xlink","href",d):b.setAttribute("hc-svg-href",d)};D(d)&&(e.x=d);D(a)&&(e.y=a);D(c)&&(e.width=c);D(g)&&(e.height=g);var E=this.createElement("image").attr(e);d=function(d){l(E.element,b);m.call(E,d)};m?(l(E.element,
"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),a=new t.Image,J(a,"load",d),a.src=b,a.complete&&d({})):l(E.element,b);return E};L.prototype.symbol=function(a,c,g,m,L,E){var p=this,h=/^url\((.*?)\)$/,x=h.test(a),f=!x&&(this.symbols[a]?a:"circle"),D=f&&this.symbols[f],k;if(D){"number"===typeof c&&(k=D.call(this.symbols,Math.round(c||0),Math.round(g||0),m||0,L||0,E));var K=this.path(k);p.styledMode||K.attr("fill","none");d(K,{symbolName:f||void 0,x:c,y:g,width:m,height:L});
E&&d(K,E)}else if(x){var w=a.match(h)[1];var t=K=this.image(w);t.imgwidth=v(B[w]&&B[w].width,E&&E.width);t.imgheight=v(B[w]&&B[w].height,E&&E.height);var I=function(b){return b.attr({width:b.width,height:b.height})};["width","height"].forEach(function(d){t[d+"Setter"]=function(d,a){var c=this["img"+a];this[a]=d;b(c)&&(E&&"within"===E.backgroundSize&&this.width&&this.height&&(c=Math.round(c*Math.min(this.width/this.imgwidth,this.height/this.imgheight))),this.element&&this.element.setAttribute(a,c),
this.alignByTranslate||(d=((this[a]||0)-c)/2,this.attr("width"===a?{translateX:d}:{translateY:d})))}});b(c)&&t.attr({x:c,y:g});t.isImg=!0;b(t.imgwidth)&&b(t.imgheight)?I(t):(t.attr({width:0,height:0}),r("img",{onload:function(){var b=n[p.chartIndex];0===this.width&&(l(this,{position:"absolute",top:"-999em"}),e.body.appendChild(this));B[w]={width:this.width,height:this.height};t.imgwidth=this.width;t.imgheight=this.height;t.element&&I(t);this.parentNode&&this.parentNode.removeChild(this);p.imgCount--;
if(!p.imgCount&&b&&!b.hasLoaded)b.onload()},src:w}),this.imgCount++)}return K};L.prototype.clipRect=function(b,d,a,c){var g=U()+"-",m=this.createElement("clipPath").attr({id:g}).add(this.defs);b=this.rect(b,d,a,c,0).add(m);b.id=g;b.clipPath=m;b.count=0;return b};L.prototype.text=function(d,a,c,g){var m={};if(g&&(this.allowHTML||!this.forExport))return this.html(d,a,c);m.x=Math.round(a||0);c&&(m.y=Math.round(c));b(d)&&(m.text=d);d=this.createElement("text").attr(m);if(!g||this.forExport&&!this.allowHTML)d.xSetter=
function(b,d,a){for(var c=a.getElementsByTagName("tspan"),g=a.getAttribute(d),m=0,e;m<c.length;m++)e=c[m],e.getAttribute(d)===g&&e.setAttribute(d,b);a.setAttribute(d,b)};return d};L.prototype.fontMetrics=function(b,d){b=!this.styledMode&&/px/.test(b)||!t.getComputedStyle?b||d&&d.style&&d.style.fontSize||this.style&&this.style.fontSize:d&&y.prototype.getStyle.call(d,"font-size");b=/px/.test(b)?O(b):12;d=24>b?b+3:Math.round(1.2*b);return{h:d,b:Math.round(.8*d),f:b}};L.prototype.rotCorr=function(b,d,
a){var c=b;d&&a&&(c=Math.max(c*Math.cos(d*k),4));return{x:-b/3*Math.sin(d*k),y:c}};L.prototype.pathToSegments=function(b){for(var d=[],a=[],c={A:8,C:7,H:2,L:3,M:3,Q:5,S:5,T:3,V:2},g=0;g<b.length;g++)I(a[0])&&D(b[g])&&a.length===c[a[0].toUpperCase()]&&b.splice(g,0,a[0].replace("M","L").replace("m","l")),"string"===typeof b[g]&&(a.length&&d.push(a.slice(0)),a.length=0),a.push(b[g]);d.push(a.slice(0));return d};L.prototype.label=function(b,d,a,c,g,m,e,l,L){return new G(this,b,d,a,c,g,m,e,l,L)};L.prototype.alignElements=
function(){this.alignedObjects.forEach(function(b){return b.align()})};return L}();d(z.prototype,{Element:y,SVG_NS:p,escapes:{"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},symbols:H,draw:w});F.registerRendererType("svg",z,!0);"";return z});M(a,"Core/Renderer/HTML/HTMLElement.js",[a["Core/Globals.js"],a["Core/Renderer/SVG/SVGElement.js"],a["Core/Utilities.js"]],function(a,u,z){var v=this&&this.__extends||function(){var a=function(c,e){a=Object.setPrototypeOf||{__proto__:[]}instanceof
Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&(a[e]=c[e])};return a(c,e)};return function(c,e){function p(){this.constructor=c}a(c,e);c.prototype=null===e?Object.create(e):(p.prototype=e.prototype,new p)}}(),y=a.isFirefox,G=a.isMS,H=a.isWebKit,A=a.win,q=z.css,n=z.defined,k=z.extend,e=z.pick,c=z.pInt;return function(a){function h(){return null!==a&&a.apply(this,arguments)||this}v(h,a);h.compose=function(a){if(-1===h.composedClasses.indexOf(a)){h.composedClasses.push(a);
var c=h.prototype,e=a.prototype;e.getSpanCorrection=c.getSpanCorrection;e.htmlCss=c.htmlCss;e.htmlGetBBox=c.htmlGetBBox;e.htmlUpdateTransform=c.htmlUpdateTransform;e.setSpanRotation=c.setSpanRotation}return a};h.prototype.getSpanCorrection=function(a,c,e){this.xCorr=-a*e;this.yCorr=-c};h.prototype.htmlCss=function(a){var c="SPAN"===this.element.tagName&&a&&"width"in a,h=e(c&&a.width,void 0);if(c){delete a.width;this.textWidth=h;var f=!0}a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow=
"hidden");this.styles=k(this.styles,a);q(this.element,a);f&&this.htmlUpdateTransform();return this};h.prototype.htmlGetBBox=function(){var a=this.element;return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}};h.prototype.htmlUpdateTransform=function(){if(this.added){var a=this.renderer,e=this.element,h=this.translateX||0,f=this.translateY||0,k=this.x||0,C=this.y||0,r=this.textAlign||"left",l={left:0,center:.5,right:1}[r],b=this.styles;b=b&&b.whiteSpace;q(e,{marginLeft:h,marginTop:f});
!a.styledMode&&this.shadows&&this.shadows.forEach(function(b){q(b,{marginLeft:h+1,marginTop:f+1})});this.inverted&&[].forEach.call(e.childNodes,function(b){a.invertChild(b,e)});if("SPAN"===e.tagName){var g=this.rotation,d=this.textWidth&&c(this.textWidth),m=[g,r,e.innerHTML,this.textWidth,this.textAlign].join(),D=void 0;D=!1;if(d!==this.oldTextWidth){if(this.textPxLength)var x=this.textPxLength;else q(e,{width:"",whiteSpace:b||"nowrap"}),x=e.offsetWidth;(d>this.oldTextWidth||x>d)&&(/[ \-]/.test(e.textContent||
e.innerText)||"ellipsis"===e.style.textOverflow)&&(q(e,{width:x>d||g?d+"px":"auto",display:"block",whiteSpace:b||"normal"}),this.oldTextWidth=d,D=!0)}this.hasBoxWidthChanged=D;m!==this.cTT&&(D=a.fontMetrics(e.style.fontSize,e).b,!n(g)||g===(this.oldRotation||0)&&r===this.oldAlign||this.setSpanRotation(g,l,D),this.getSpanCorrection(!n(g)&&this.textPxLength||e.offsetWidth,D,l,g,r));q(e,{left:k+(this.xCorr||0)+"px",top:C+(this.yCorr||0)+"px"});this.cTT=m;this.oldRotation=g;this.oldAlign=r}}else this.alignOnAdd=
!0};h.prototype.setSpanRotation=function(a,c,e){var h={},p=G&&!/Edge/.test(A.navigator.userAgent)?"-ms-transform":H?"-webkit-transform":y?"MozTransform":A.opera?"-o-transform":void 0;p&&(h[p]=h.transform="rotate("+a+"deg)",h[p+(y?"Origin":"-origin")]=h.transformOrigin=100*c+"% "+e+"px",q(this.element,h))};h.composedClasses=[];return h}(u)});M(a,"Core/Renderer/HTML/HTMLRenderer.js",[a["Core/Renderer/HTML/AST.js"],a["Core/Renderer/SVG/SVGElement.js"],a["Core/Renderer/SVG/SVGRenderer.js"],a["Core/Utilities.js"]],
function(a,u,z,F){var v=this&&this.__extends||function(){var a=function(k,e){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,e){a.__proto__=e}||function(a,e){for(var c in e)e.hasOwnProperty(c)&&(a[c]=e[c])};return a(k,e)};return function(k,e){function c(){this.constructor=k}a(k,e);k.prototype=null===e?Object.create(e):(c.prototype=e.prototype,new c)}}(),G=F.attr,H=F.createElement,A=F.extend,q=F.pick;return function(n){function k(){return null!==n&&n.apply(this,arguments)||this}
v(k,n);k.compose=function(a){-1===k.composedClasses.indexOf(a)&&(k.composedClasses.push(a),a.prototype.html=k.prototype.html);return a};k.prototype.html=function(e,c,h){var f=this.createElement("span"),k=f.element,p=f.renderer,n=p.isSVG,t=function(a,c){["opacity","visibility"].forEach(function(e){a[e+"Setter"]=function(l,b,g){var d=a.div?a.div.style:c;u.prototype[e+"Setter"].call(this,l,b,g);d&&(d[b]=l)}});a.addedSetters=!0};f.textSetter=function(c){c!==this.textStr&&(delete this.bBox,delete this.oldTextWidth,
a.setElementHTML(this.element,q(c,"")),this.textStr=c,f.doTransform=!0)};n&&t(f,f.element.style);f.xSetter=f.ySetter=f.alignSetter=f.rotationSetter=function(a,c){"align"===c?f.alignValue=f.textAlign=a:f[c]=a;f.doTransform=!0};f.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1)};f.attr({text:e,x:Math.round(c),y:Math.round(h)}).css({position:"absolute"});p.styledMode||f.css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});k.style.whiteSpace="nowrap";
f.css=f.htmlCss;n&&(f.add=function(a){var c=p.box.parentNode,e=[];if(this.parentGroup=a){var l=a.div;if(!l){for(;a;)e.push(a),a=a.parentGroup;e.reverse().forEach(function(b){function a(d,a){b[a]=d;"translateX"===a?r.left=d+"px":r.top=d+"px";b.doTransform=!0}var d=G(b.element,"class"),m=b.styles||{};l=b.div=b.div||H("div",d?{className:d}:void 0,{position:"absolute",left:(b.translateX||0)+"px",top:(b.translateY||0)+"px",display:b.display,opacity:b.opacity,cursor:m.cursor,pointerEvents:m.pointerEvents,
visibility:b.visibility},l||c);var r=l.style;A(b,{classSetter:function(b){return function(d){this.element.setAttribute("class",d);b.className=d}}(l),on:function(){e[0].div&&f.on.apply({element:e[0].div,onEvents:b.onEvents},arguments);return b},translateXSetter:a,translateYSetter:a});b.addedSetters||t(b)})}}else l=c;l.appendChild(k);f.added=!0;f.alignOnAdd&&f.htmlUpdateTransform();return f});return f};k.composedClasses=[];return k}(z)});M(a,"Core/Axis/AxisDefaults.js",[],function(){var a;(function(a){a.defaultXAxisOptions=
{alignTicks:!0,allowDecimals:void 0,panningEnabled:!0,zIndex:2,zoomEnabled:!0,dateTimeLabelFormats:{millisecond:{main:"%H:%M:%S.%L",range:!1},second:{main:"%H:%M:%S",range:!1},minute:{main:"%H:%M",range:!1},hour:{main:"%H:%M",range:!1},day:{main:"%e. %b"},week:{main:"%e. %b"},month:{main:"%b '%y"},year:{main:"%Y"}},endOnTick:!1,gridLineDashStyle:"Solid",gridZIndex:1,labels:{autoRotation:void 0,autoRotationLimit:80,distance:void 0,enabled:!0,indentation:10,overflow:"justify",padding:5,reserveSpace:void 0,
rotation:void 0,staggerLines:0,step:0,useHTML:!1,x:0,zIndex:7,style:{color:"#666666",cursor:"default",fontSize:"11px"}},maxPadding:.01,minorGridLineDashStyle:"Solid",minorTickLength:2,minorTickPosition:"outside",minPadding:.01,offset:void 0,opposite:!1,reversed:void 0,reversedStacks:!1,showEmpty:!0,showFirstLabel:!0,showLastLabel:!0,startOfWeek:1,startOnTick:!1,tickLength:10,tickPixelInterval:100,tickmarkPlacement:"between",tickPosition:"outside",title:{align:"middle",rotation:0,useHTML:!1,x:0,y:0,
style:{color:"#666666"}},type:"linear",uniqueNames:!0,visible:!0,minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",gridLineWidth:void 0,tickColor:"#ccd6eb"};a.defaultYAxisOptions={reversedStacks:!0,endOnTick:!0,maxPadding:.05,minPadding:.05,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{animation:{},allowOverlap:!1,enabled:!1,crop:!0,overflow:"justify",
formatter:function(){var a=this.axis.chart.numberFormatter;return a(this.total,-1)},style:{color:"#000000",fontSize:"11px",fontWeight:"bold",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0};a.defaultLeftAxisOptions={labels:{x:-15},title:{rotation:270}};a.defaultRightAxisOptions={labels:{x:15},title:{rotation:90}};a.defaultBottomAxisOptions={labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}};a.defaultTopAxisOptions={labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}}})(a||
(a={}));return a});M(a,"Core/Foundation.js",[a["Core/Utilities.js"]],function(a){var v=a.addEvent,z=a.isFunction,F=a.objectEach,y=a.removeEvent,G;(function(a){a.registerEventOptions=function(a,q){a.eventOptions=a.eventOptions||{};F(q.events,function(n,k){a.eventOptions[k]!==n&&(a.eventOptions[k]&&(y(a,k,a.eventOptions[k]),delete a.eventOptions[k]),z(n)&&(a.eventOptions[k]=n,v(a,k,n)))})}})(G||(G={}));return G});M(a,"Core/Axis/Tick.js",[a["Core/FormatUtilities.js"],a["Core/Globals.js"],a["Core/Utilities.js"]],
function(a,u,z){var v=u.deg2rad,y=z.clamp,G=z.correctFloat,H=z.defined,A=z.destroyObjectProperties,q=z.extend,n=z.fireEvent,k=z.isNumber,e=z.merge,c=z.objectEach,h=z.pick;u=function(){function f(a,c,e,h,f){this.isNewLabel=this.isNew=!0;this.axis=a;this.pos=c;this.type=e||"";this.parameters=f||{};this.tickmarkOffset=this.parameters.tickmarkOffset;this.options=this.parameters.options;n(this,"init");e||h||this.addLabel()}f.prototype.addLabel=function(){var c=this,e=c.axis,f=e.options,t=e.chart,J=e.categories,
C=e.logarithmic,r=e.names,l=c.pos,b=h(c.options&&c.options.labels,f.labels),g=e.tickPositions,d=l===g[0],m=l===g[g.length-1],D=(!b.step||1===b.step)&&1===e.tickInterval;g=g.info;var x=c.label,I;J=this.parameters.category||(J?h(J[l],r[l],l):l);C&&k(J)&&(J=G(C.lin2log(J)));if(e.dateTime)if(g){var P=t.time.resolveDTLFormat(f.dateTimeLabelFormats[!f.grid&&g.higherRanks[l]||g.unitName]);var v=P.main}else k(J)&&(v=e.dateTime.getXDateFormat(J,f.dateTimeLabelFormats||{}));c.isFirst=d;c.isLast=m;var O={axis:e,
chart:t,dateTimeLabelFormat:v,isFirst:d,isLast:m,pos:l,tick:c,tickPositionInfo:g,value:J};n(this,"labelFormat",O);var u=function(d){return b.formatter?b.formatter.call(d,d):b.format?(d.text=e.defaultLabelFormatter.call(d),a.format(b.format,d,t)):e.defaultLabelFormatter.call(d,d)};f=u.call(O,O);var A=P&&P.list;c.shortenLabel=A?function(){for(I=0;I<A.length;I++)if(q(O,{dateTimeLabelFormat:A[I]}),x.attr({text:u.call(O,O)}),x.getBBox().width<e.getSlotWidth(c)-2*b.padding)return;x.attr({text:""})}:void 0;
D&&e._addedPlotLB&&c.moveLabel(f,b);H(x)||c.movedLabel?x&&x.textStr!==f&&!D&&(!x.textWidth||b.style.width||x.styles.width||x.css({width:null}),x.attr({text:f}),x.textPxLength=x.getBBox().width):(c.label=x=c.createLabel({x:0,y:0},f,b),c.rotation=0)};f.prototype.createLabel=function(a,c,h){var f=this.axis,p=f.chart;if(a=H(c)&&h.enabled?p.renderer.text(c,a.x,a.y,h.useHTML).add(f.labelGroup):null)p.styledMode||a.css(e(h.style)),a.textPxLength=a.getBBox().width;return a};f.prototype.destroy=function(){A(this,
this.axis)};f.prototype.getPosition=function(a,c,e,h){var f=this.axis,p=f.chart,r=h&&p.oldChartHeight||p.chartHeight;a={x:a?G(f.translate(c+e,null,null,h)+f.transB):f.left+f.offset+(f.opposite?(h&&p.oldChartWidth||p.chartWidth)-f.right-f.left:0),y:a?r-f.bottom+f.offset-(f.opposite?f.height:0):G(r-f.translate(c+e,null,null,h)-f.transB)};a.y=y(a.y,-1E5,1E5);n(this,"afterGetPosition",{pos:a});return a};f.prototype.getLabelPosition=function(a,c,e,h,f,k,r,l){var b=this.axis,g=b.transA,d=b.isLinked&&b.linkedParent?
b.linkedParent.reversed:b.reversed,m=b.staggerLines,D=b.tickRotCorr||{x:0,y:0},x=h||b.reserveSpaceDefault?0:-b.labelOffset*("center"===b.labelAlign?.5:1),p={},t=f.y;H(t)||(t=0===b.side?e.rotation?-8:-e.getBBox().height:2===b.side?D.y+8:Math.cos(e.rotation*v)*(D.y-e.getBBox(!1,0).height/2));a=a+f.x+x+D.x-(k&&h?k*g*(d?-1:1):0);c=c+t-(k&&!h?k*g*(d?1:-1):0);m&&(e=r/(l||1)%m,b.opposite&&(e=m-e-1),c+=b.labelOffset/m*e);p.x=a;p.y=Math.round(c);n(this,"afterGetLabelPosition",{pos:p,tickmarkOffset:k,index:r});
return p};f.prototype.getLabelSize=function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0};f.prototype.getMarkPath=function(a,c,e,h,f,k){return k.crispLine([["M",a,c],["L",a+(f?0:-e),c+(f?e:0)]],h)};f.prototype.handleOverflow=function(a){var c=this.axis,e=c.options.labels,f=a.x,k=c.chart.chartWidth,n=c.chart.spacing,r=h(c.labelLeft,Math.min(c.pos,n[3]));n=h(c.labelRight,Math.max(c.isRadial?0:c.pos+c.len,k-n[1]));var l=this.label,b=this.rotation,g={left:0,center:.5,right:1}[c.labelAlign||
l.attr("align")],d=l.getBBox().width,m=c.getSlotWidth(this),D={},x=m,I=1,w;if(b||"justify"!==e.overflow)0>b&&f-g*d<r?w=Math.round(f/Math.cos(b*v)-r):0<b&&f+g*d>n&&(w=Math.round((k-f)/Math.cos(b*v)));else if(k=f+(1-g)*d,f-g*d<r?x=a.x+x*(1-g)-r:k>n&&(x=n-a.x+x*g,I=-1),x=Math.min(m,x),x<m&&"center"===c.labelAlign&&(a.x+=I*(m-x-g*(m-Math.min(d,x)))),d>x||c.autoRotation&&(l.styles||{}).width)w=x;w&&(this.shortenLabel?this.shortenLabel():(D.width=Math.floor(w)+"px",(e.style||{}).textOverflow||(D.textOverflow=
"ellipsis"),l.css(D)))};f.prototype.moveLabel=function(a,e){var h=this,f=h.label,k=h.axis,p=k.reversed,r=!1;f&&f.textStr===a?(h.movedLabel=f,r=!0,delete h.label):c(k.ticks,function(b){r||b.isNew||b===h||!b.label||b.label.textStr!==a||(h.movedLabel=b.label,r=!0,b.labelPos=h.movedLabel.xy,delete b.label)});if(!r&&(h.labelPos||f)){var l=h.labelPos||f.xy;f=k.horiz?p?0:k.width+k.left:l.x;k=k.horiz?l.y:p?k.width+k.left:0;h.movedLabel=h.createLabel({x:f,y:k},a,e);h.movedLabel&&h.movedLabel.attr({opacity:0})}};
f.prototype.render=function(a,c,e){var f=this.axis,k=f.horiz,p=this.pos,r=h(this.tickmarkOffset,f.tickmarkOffset);p=this.getPosition(k,p,r,c);r=p.x;var l=p.y;f=k&&r===f.pos+f.len||!k&&l===f.pos?-1:1;k=h(e,this.label&&this.label.newOpacity,1);e=h(e,1);this.isActive=!0;this.renderGridLine(c,e,f);this.renderMark(p,e,f);this.renderLabel(p,c,k,a);this.isNew=!1;n(this,"afterRender")};f.prototype.renderGridLine=function(a,c,e){var f=this.axis,k=f.options,p={},r=this.pos,l=this.type,b=h(this.tickmarkOffset,
f.tickmarkOffset),g=f.chart.renderer,d=this.gridLine,m=k.gridLineWidth,D=k.gridLineColor,x=k.gridLineDashStyle;"minor"===this.type&&(m=k.minorGridLineWidth,D=k.minorGridLineColor,x=k.minorGridLineDashStyle);d||(f.chart.styledMode||(p.stroke=D,p["stroke-width"]=m||0,p.dashstyle=x),l||(p.zIndex=1),a&&(c=0),this.gridLine=d=g.path().attr(p).addClass("highcharts-"+(l?l+"-":"")+"grid-line").add(f.gridGroup));if(d&&(e=f.getPlotLinePath({value:r+b,lineWidth:d.strokeWidth()*e,force:"pass",old:a})))d[a||this.isNew?
"attr":"animate"]({d:e,opacity:c})};f.prototype.renderMark=function(a,c,e){var f=this.axis,k=f.options,p=f.chart.renderer,r=this.type,l=f.tickSize(r?r+"Tick":"tick"),b=a.x;a=a.y;var g=h(k["minor"!==r?"tickWidth":"minorTickWidth"],!r&&f.isXAxis?1:0);k=k["minor"!==r?"tickColor":"minorTickColor"];var d=this.mark,m=!d;l&&(f.opposite&&(l[0]=-l[0]),d||(this.mark=d=p.path().addClass("highcharts-"+(r?r+"-":"")+"tick").add(f.axisGroup),f.chart.styledMode||d.attr({stroke:k,"stroke-width":g})),d[m?"attr":"animate"]({d:this.getMarkPath(b,
a,l[0],d.strokeWidth()*e,f.horiz,p),opacity:c}))};f.prototype.renderLabel=function(a,c,e,f){var p=this.axis,n=p.horiz,r=p.options,l=this.label,b=r.labels,g=b.step;p=h(this.tickmarkOffset,p.tickmarkOffset);var d=a.x;a=a.y;var m=!0;l&&k(d)&&(l.xy=a=this.getLabelPosition(d,a,l,n,b,p,f,g),this.isFirst&&!this.isLast&&!r.showFirstLabel||this.isLast&&!this.isFirst&&!r.showLastLabel?m=!1:!n||b.step||b.rotation||c||0===e||this.handleOverflow(a),g&&f%g&&(m=!1),m&&k(a.y)?(a.opacity=e,l[this.isNewLabel?"attr":
"animate"](a),this.isNewLabel=!1):(l.attr("y",-9999),this.isNewLabel=!0))};f.prototype.replaceMovedLabel=function(){var a=this.label,c=this.axis,e=c.reversed;if(a&&!this.isNew){var f=c.horiz?e?c.left:c.width+c.left:a.xy.x;e=c.horiz?a.xy.y:e?c.width+c.top:c.top;a.animate({x:f,y:e,opacity:0},void 0,a.destroy);delete this.label}c.isDirty=!0;this.label=this.movedLabel;delete this.movedLabel};return f}();"";return u});M(a,"Core/Axis/Axis.js",[a["Core/Animation/AnimationUtilities.js"],a["Core/Axis/AxisDefaults.js"],
a["Core/Color/Color.js"],a["Core/DefaultOptions.js"],a["Core/Foundation.js"],a["Core/Globals.js"],a["Core/Axis/Tick.js"],a["Core/Utilities.js"]],function(a,u,z,F,y,G,H,A){var q=a.animObject,n=F.defaultOptions,k=y.registerEventOptions,e=G.deg2rad,c=A.arrayMax,h=A.arrayMin,f=A.clamp,w=A.correctFloat,p=A.defined,B=A.destroyObjectProperties,t=A.erase,J=A.error,C=A.extend,r=A.fireEvent,l=A.getMagnitude,b=A.isArray,g=A.isNumber,d=A.isString,m=A.merge,D=A.normalizeTickInterval,x=A.objectEach,I=A.pick,P=
A.relativeLength,v=A.removeEvent,O=A.splat,U=A.syncTimeout;a=function(){function a(b,d){this.zoomEnabled=this.width=this.visible=this.userOptions=this.translationSlope=this.transB=this.transA=this.top=this.ticks=this.tickRotCorr=this.tickPositions=this.tickmarkOffset=this.tickInterval=this.tickAmount=this.side=this.series=this.right=this.positiveValuesOnly=this.pos=this.pointRangePadding=this.pointRange=this.plotLinesAndBandsGroups=this.plotLinesAndBands=this.paddedTicks=this.overlap=this.options=
this.offset=this.names=this.minPixelPadding=this.minorTicks=this.minorTickInterval=this.min=this.maxLabelLength=this.max=this.len=this.left=this.labelFormatter=this.labelEdge=this.isLinked=this.height=this.hasVisibleSeries=this.hasNames=this.eventOptions=this.coll=this.closestPointRange=this.chart=this.categories=this.bottom=this.alternateBands=void 0;this.init(b,d)}a.prototype.init=function(b,d){var a=d.isX;this.chart=b;this.horiz=b.inverted&&!this.isZAxis?!a:a;this.isXAxis=a;this.coll=this.coll||
(a?"xAxis":"yAxis");r(this,"init",{userOptions:d});this.opposite=I(d.opposite,this.opposite);this.side=I(d.side,this.side,this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(d);var c=this.options,e=c.labels,m=c.type;this.userOptions=d;this.minPixelPadding=0;this.reversed=I(c.reversed,this.reversed);this.visible=c.visible;this.zoomEnabled=c.zoomEnabled;this.hasNames="category"===m||!0===c.categories;this.categories=c.categories||this.hasNames;this.names||(this.names=[],this.names.keys=
{});this.plotLinesAndBandsGroups={};this.positiveValuesOnly=!!this.logarithmic;this.isLinked=p(c.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=c.minRange||c.maxZoom;this.range=c.range;this.offset=c.offset||0;this.min=this.max=null;d=I(c.crosshair,O(b.options.tooltip.crosshairs)[a?0:1]);this.crosshair=!0===d?{}:d;-1===b.axes.indexOf(this)&&(a?b.axes.splice(b.xAxis.length,0,this):b.axes.push(this),
b[this.coll].push(this));this.series=this.series||[];b.inverted&&!this.isZAxis&&a&&"undefined"===typeof this.reversed&&(this.reversed=!0);this.labelRotation=g(e.rotation)?e.rotation:void 0;k(this,c);r(this,"afterInit")};a.prototype.setOptions=function(b){this.options=m(u.defaultXAxisOptions,"yAxis"===this.coll&&u.defaultYAxisOptions,[u.defaultTopAxisOptions,u.defaultRightAxisOptions,u.defaultBottomAxisOptions,u.defaultLeftAxisOptions][this.side],m(n[this.coll],b));r(this,"afterSetOptions",{userOptions:b})};
a.prototype.defaultLabelFormatter=function(b){var d=this.axis;b=this.chart.numberFormatter;var a=g(this.value)?this.value:NaN,c=d.chart.time,e=this.dateTimeLabelFormat,m=n.lang,l=m.numericSymbols;m=m.numericSymbolMagnitude||1E3;var f=d.logarithmic?Math.abs(a):d.tickInterval,h=l&&l.length;if(d.categories)var r=""+this.value;else if(e)r=c.dateFormat(e,a);else if(h&&1E3<=f)for(;h--&&"undefined"===typeof r;)d=Math.pow(m,h+1),f>=d&&0===10*a%d&&null!==l[h]&&0!==a&&(r=b(a/d,-1)+l[h]);"undefined"===typeof r&&
(r=1E4<=Math.abs(a)?b(a,-1):b(a,-1,void 0,""));return r};a.prototype.getSeriesExtremes=function(){var b=this,d=b.chart,a;r(this,"getSeriesExtremes",null,function(){b.hasVisibleSeries=!1;b.dataMin=b.dataMax=b.threshold=null;b.softThreshold=!b.isXAxis;b.stacking&&b.stacking.buildStacks();b.series.forEach(function(c){if(c.visible||!d.options.chart.ignoreHiddenSeries){var e=c.options,m=e.threshold;b.hasVisibleSeries=!0;b.positiveValuesOnly&&0>=m&&(m=null);if(b.isXAxis){if(e=c.xData,e.length){e=b.logarithmic?
e.filter(b.validatePositiveValue):e;a=c.getXExtremes(e);var l=a.min;var f=a.max;g(l)||l instanceof Date||(e=e.filter(g),a=c.getXExtremes(e),l=a.min,f=a.max);e.length&&(b.dataMin=Math.min(I(b.dataMin,l),l),b.dataMax=Math.max(I(b.dataMax,f),f))}}else if(c=c.applyExtremes(),g(c.dataMin)&&(l=c.dataMin,b.dataMin=Math.min(I(b.dataMin,l),l)),g(c.dataMax)&&(f=c.dataMax,b.dataMax=Math.max(I(b.dataMax,f),f)),p(m)&&(b.threshold=m),!e.softThreshold||b.positiveValuesOnly)b.softThreshold=!1}})});r(this,"afterGetSeriesExtremes")};
a.prototype.translate=function(b,d,a,c,e,m){var l=this.linkedParent||this,f=c&&l.old?l.old.min:l.min,r=l.minPixelPadding;e=(l.isOrdinal||l.brokenAxis&&l.brokenAxis.hasBreaks||l.logarithmic&&e)&&l.lin2val;var h=1,k=0;c=c&&l.old?l.old.transA:l.transA;c||(c=l.transA);a&&(h*=-1,k=l.len);l.reversed&&(h*=-1,k-=h*(l.sector||l.len));d?(b=(b*h+k-r)/c+f,e&&(b=l.lin2val(b))):(e&&(b=l.val2lin(b)),b=g(f)?h*(b-f)*c+k+h*r+(g(m)?c*m:0):void 0);return b};a.prototype.toPixels=function(b,d){return this.translate(b,
!1,!this.horiz,null,!0)+(d?0:this.pos)};a.prototype.toValue=function(b,d){return this.translate(b-(d?0:this.pos),!0,!this.horiz,null,!0)};a.prototype.getPlotLinePath=function(b){function d(b,d,a){if("pass"!==n&&b<d||b>a)n?b=f(b,d,a):B=!0;return b}var a=this,c=a.chart,e=a.left,m=a.top,l=b.old,h=b.value,k=b.lineWidth,x=l&&c.oldChartHeight||c.chartHeight,D=l&&c.oldChartWidth||c.chartWidth,L=a.transB,p=b.translatedValue,n=b.force,t,C,w,q,B;b={value:h,lineWidth:k,old:l,force:n,acrossPanes:b.acrossPanes,
translatedValue:p};r(this,"getPlotLinePath",b,function(b){p=I(p,a.translate(h,null,null,l));p=f(p,-1E5,1E5);t=w=Math.round(p+L);C=q=Math.round(x-p-L);g(p)?a.horiz?(C=m,q=x-a.bottom,t=w=d(t,e,e+a.width)):(t=e,w=D-a.right,C=q=d(C,m,m+a.height)):(B=!0,n=!1);b.path=B&&!n?null:c.renderer.crispLine([["M",t,C],["L",w,q]],k||1)});return b.path};a.prototype.getLinearTickPositions=function(b,d,a){var c=w(Math.floor(d/b)*b);a=w(Math.ceil(a/b)*b);var e=[],g;w(c+b)===c&&(g=20);if(this.single)return[d];for(d=c;d<=
a;){e.push(d);d=w(d+b,g);if(d===m)break;var m=d}return e};a.prototype.getMinorTickInterval=function(){var b=this.options;return!0===b.minorTicks?I(b.minorTickInterval,"auto"):!1===b.minorTicks?null:b.minorTickInterval};a.prototype.getMinorTickPositions=function(){var b=this.options,d=this.tickPositions,a=this.minorTickInterval,c=this.pointRangePadding||0,e=this.min-c;c=this.max+c;var g=c-e,m=[];if(g&&g/a<this.len/3){var l=this.logarithmic;if(l)this.paddedTicks.forEach(function(b,d,c){d&&m.push.apply(m,
l.getLogTickPositions(a,c[d-1],c[d],!0))});else if(this.dateTime&&"auto"===this.getMinorTickInterval())m=m.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(a),e,c,b.startOfWeek));else for(b=e+(d[0]-e)%a;b<=c&&b!==m[0];b+=a)m.push(b)}0!==m.length&&this.trimTicks(m);return m};a.prototype.adjustForMinRange=function(){var b=this.options,d=this.logarithmic,a=this.min,e=this.max,g=0,m,l,f,r;this.isXAxis&&"undefined"===typeof this.minRange&&!d&&(p(b.min)||p(b.max)||p(b.floor)||p(b.ceiling)?
this.minRange=null:(this.series.forEach(function(b){f=b.xData;r=b.xIncrement?1:f.length-1;if(1<f.length)for(m=r;0<m;m--)if(l=f[m]-f[m-1],!g||l<g)g=l}),this.minRange=Math.min(5*g,this.dataMax-this.dataMin)));if(e-a<this.minRange){var k=this.dataMax-this.dataMin>=this.minRange;var x=this.minRange;var D=(x-e+a)/2;D=[a-D,I(b.min,a-D)];k&&(D[2]=this.logarithmic?this.logarithmic.log2lin(this.dataMin):this.dataMin);a=c(D);e=[a+x,I(b.max,a+x)];k&&(e[2]=d?d.log2lin(this.dataMax):this.dataMax);e=h(e);e-a<x&&
(D[0]=e-x,D[1]=I(b.min,e-x),a=c(D))}this.min=a;this.max=e};a.prototype.getClosest=function(){var b;this.categories?b=1:this.series.forEach(function(d){var a=d.closestPointRange,c=d.visible||!d.chart.options.chart.ignoreHiddenSeries;!d.noSharedTooltip&&p(a)&&c&&(b=p(b)?Math.min(b,a):a)});return b};a.prototype.nameToX=function(d){var a=b(this.categories),c=a?this.categories:this.names,e=d.options.x;d.series.requireSorting=!1;p(e)||(e=this.options.uniqueNames?a?c.indexOf(d.name):I(c.keys[d.name],-1):
d.series.autoIncrement());if(-1===e){if(!a)var g=c.length}else g=e;"undefined"!==typeof g&&(this.names[g]=d.name,this.names.keys[d.name]=g);return g};a.prototype.updateNames=function(){var b=this,d=this.names;0<d.length&&(Object.keys(d.keys).forEach(function(b){delete d.keys[b]}),d.length=0,this.minRange=this.userMinRange,(this.series||[]).forEach(function(d){d.xIncrement=null;if(!d.points||d.isDirtyData)b.max=Math.max(b.max,d.xData.length-1),d.processData(),d.generatePoints();d.data.forEach(function(a,
c){if(a&&a.options&&"undefined"!==typeof a.name){var e=b.nameToX(a);"undefined"!==typeof e&&e!==a.x&&(a.x=e,d.xData[c]=e)}})}))};a.prototype.setAxisTranslation=function(){var b=this,a=b.max-b.min,c=b.linkedParent,e=!!b.categories,g=b.isXAxis,m=b.axisPointRange||0,l=0,f=0,h=b.transA;if(g||e||m){var k=b.getClosest();c?(l=c.minPointOffset,f=c.pointRangePadding):b.series.forEach(function(a){var c=e?1:g?I(a.options.pointRange,k,0):b.axisPointRange||0,h=a.options.pointPlacement;m=Math.max(m,c);if(!b.single||
e)a=a.is("xrange")?!g:g,l=Math.max(l,a&&d(h)?0:c/2),f=Math.max(f,a&&"on"===h?0:c)});c=b.ordinal&&b.ordinal.slope&&k?b.ordinal.slope/k:1;b.minPointOffset=l*=c;b.pointRangePadding=f*=c;b.pointRange=Math.min(m,b.single&&e?1:a);g&&(b.closestPointRange=k)}b.translationSlope=b.transA=h=b.staticScale||b.len/(a+f||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=h*l;r(this,"afterSetAxisTranslation")};a.prototype.minFromRange=function(){return this.max-this.range};a.prototype.setTickInterval=function(b){var d=
this.chart,a=this.logarithmic,c=this.options,e=this.isXAxis,m=this.isLinked,f=c.tickPixelInterval,h=this.categories,k=this.softThreshold,x=c.maxPadding,L=c.minPadding,n=g(c.tickInterval)&&0<=c.tickInterval?c.tickInterval:void 0,t=g(this.threshold)?this.threshold:null;this.dateTime||h||m||this.getTickAmount();var C=I(this.userMin,c.min);var q=I(this.userMax,c.max);if(m){this.linkedParent=d[this.coll][c.linkedTo];var B=this.linkedParent.getExtremes();this.min=I(B.min,B.dataMin);this.max=I(B.max,B.dataMax);
c.type!==this.linkedParent.options.type&&J(11,1,d)}else{if(k&&p(t))if(this.dataMin>=t)B=t,L=0;else if(this.dataMax<=t){var P=t;x=0}this.min=I(C,B,this.dataMin);this.max=I(q,P,this.dataMax)}a&&(this.positiveValuesOnly&&!b&&0>=Math.min(this.min,I(this.dataMin,this.min))&&J(10,1,d),this.min=w(a.log2lin(this.min),16),this.max=w(a.log2lin(this.max),16));this.range&&p(this.max)&&(this.userMin=this.min=C=Math.max(this.dataMin,this.minFromRange()),this.userMax=q=this.max,this.range=null);r(this,"foundExtremes");
this.beforePadding&&this.beforePadding();this.adjustForMinRange();!(h||this.axisPointRange||this.stacking&&this.stacking.usePercentage||m)&&p(this.min)&&p(this.max)&&(d=this.max-this.min)&&(!p(C)&&L&&(this.min-=d*L),!p(q)&&x&&(this.max+=d*x));g(this.userMin)||(g(c.softMin)&&c.softMin<this.min&&(this.min=C=c.softMin),g(c.floor)&&(this.min=Math.max(this.min,c.floor)));g(this.userMax)||(g(c.softMax)&&c.softMax>this.max&&(this.max=q=c.softMax),g(c.ceiling)&&(this.max=Math.min(this.max,c.ceiling)));k&&
p(this.dataMin)&&(t=t||0,!p(C)&&this.min<t&&this.dataMin>=t?this.min=this.options.minRange?Math.min(t,this.max-this.minRange):t:!p(q)&&this.max>t&&this.dataMax<=t&&(this.max=this.options.minRange?Math.max(t,this.min+this.minRange):t));g(this.min)&&g(this.max)&&!this.chart.polar&&this.min>this.max&&(p(this.options.min)?this.max=this.min:p(this.options.max)&&(this.min=this.max));this.tickInterval=this.min===this.max||"undefined"===typeof this.min||"undefined"===typeof this.max?1:m&&this.linkedParent&&
!n&&f===this.linkedParent.options.tickPixelInterval?n=this.linkedParent.tickInterval:I(n,this.tickAmount?(this.max-this.min)/Math.max(this.tickAmount-1,1):void 0,h?1:(this.max-this.min)*f/Math.max(this.len,f));if(e&&!b){var v=this.min!==(this.old&&this.old.min)||this.max!==(this.old&&this.old.max);this.series.forEach(function(b){b.forceCrop=b.forceCropping&&b.forceCropping();b.processData(v)});r(this,"postProcessData",{hasExtemesChanged:v})}this.setAxisTranslation();r(this,"initialAxisTranslation");
this.pointRange&&!n&&(this.tickInterval=Math.max(this.pointRange,this.tickInterval));b=I(c.minTickInterval,this.dateTime&&!this.series.some(function(b){return b.noSharedTooltip})?this.closestPointRange:0);!n&&this.tickInterval<b&&(this.tickInterval=b);this.dateTime||this.logarithmic||n||(this.tickInterval=D(this.tickInterval,void 0,l(this.tickInterval),I(c.allowDecimals,.5>this.tickInterval||void 0!==this.tickAmount),!!this.tickAmount));this.tickAmount||(this.tickInterval=this.unsquish());this.setTickPositions()};
a.prototype.setTickPositions=function(){var b=this.options,d=b.tickPositions,a=this.getMinorTickInterval(),c=this.hasVerticalPanning(),e="colorAxis"===this.coll,g=(e||!c)&&b.startOnTick;c=(e||!c)&&b.endOnTick;e=b.tickPositioner;this.tickmarkOffset=this.categories&&"between"===b.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===a&&this.tickInterval?this.tickInterval/5:a;this.single=this.min===this.max&&p(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==
b.allowDecimals);this.tickPositions=a=d&&d.slice();!a&&(this.ordinal&&this.ordinal.positions||!((this.max-this.min)/this.tickInterval>Math.max(2*this.len,200))?a=this.dateTime?this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval,b.units),this.min,this.max,b.startOfWeek,this.ordinal&&this.ordinal.positions,this.closestPointRange,!0):this.logarithmic?this.logarithmic.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,
this.max):(a=[this.min,this.max],J(19,!1,this.chart)),a.length>this.len&&(a=[a[0],a.pop()],a[0]===a[1]&&(a.length=1)),this.tickPositions=a,e&&(e=e.apply(this,[this.min,this.max])))&&(this.tickPositions=a=e);this.paddedTicks=a.slice(0);this.trimTicks(a,g,c);this.isLinked||(this.single&&2>a.length&&!this.categories&&!this.series.some(function(b){return b.is("heatmap")&&"between"===b.options.pointPlacement})&&(this.min-=.5,this.max+=.5),d||e||this.adjustTickAmount());r(this,"afterSetTickPositions")};
a.prototype.trimTicks=function(b,d,a){var c=b[0],e=b[b.length-1],g=!this.isOrdinal&&this.minPointOffset||0;r(this,"trimTicks");if(!this.isLinked){if(d&&-Infinity!==c)this.min=c;else for(;this.min-g>b[0];)b.shift();if(a)this.max=e;else for(;this.max+g<b[b.length-1];)b.pop();0===b.length&&p(c)&&!this.options.tickPositions&&b.push((e+c)/2)}};a.prototype.alignToOthers=function(){var b={},d=this.options,a;!1!==this.chart.options.chart.alignTicks&&d.alignTicks&&!1!==d.startOnTick&&!1!==d.endOnTick&&!this.logarithmic&&
this.chart[this.coll].forEach(function(d){var c=d.options;c=[d.horiz?c.left:c.top,c.width,c.height,c.pane].join();d.series.length&&(b[c]?a=!0:b[c]=1)});return a};a.prototype.getTickAmount=function(){var b=this.options,d=b.tickPixelInterval,a=b.tickAmount;!p(b.tickInterval)&&!a&&this.len<d&&!this.isRadial&&!this.logarithmic&&b.startOnTick&&b.endOnTick&&(a=2);!a&&this.alignToOthers()&&(a=Math.ceil(this.len/d)+1);4>a&&(this.finalTickAmt=a,a=5);this.tickAmount=a};a.prototype.adjustTickAmount=function(){var b=
this.options,d=this.tickInterval,a=this.tickPositions,c=this.tickAmount,e=this.finalTickAmt,m=a&&a.length,l=I(this.threshold,this.softThreshold?0:null);if(this.hasData()&&g(this.min)&&g(this.max)){if(m<c){for(;a.length<c;)a.length%2||this.min===l?a.push(w(a[a.length-1]+d)):a.unshift(w(a[0]-d));this.transA*=(m-1)/(c-1);this.min=b.startOnTick?a[0]:Math.min(this.min,a[0]);this.max=b.endOnTick?a[a.length-1]:Math.max(this.max,a[a.length-1])}else m>c&&(this.tickInterval*=2,this.setTickPositions());if(p(e)){for(d=
b=a.length;d--;)(3===e&&1===d%2||2>=e&&0<d&&d<b-1)&&a.splice(d,1);this.finalTickAmt=void 0}}};a.prototype.setScale=function(){var b=!1,d=!1;this.series.forEach(function(a){b=b||a.isDirtyData||a.isDirty;d=d||a.xAxis&&a.xAxis.isDirty||!1});this.setAxisSize();var a=this.len!==(this.old&&this.old.len);a||b||d||this.isLinked||this.forceRedraw||this.userMin!==(this.old&&this.old.userMin)||this.userMax!==(this.old&&this.old.userMax)||this.alignToOthers()?(this.stacking&&this.stacking.resetStacks(),this.forceRedraw=
!1,this.getSeriesExtremes(),this.setTickInterval(),this.isDirty||(this.isDirty=a||this.min!==(this.old&&this.old.min)||this.max!==(this.old&&this.old.max))):this.stacking&&this.stacking.cleanStacks();b&&this.panningState&&(this.panningState.isDirty=!0);r(this,"afterSetScale")};a.prototype.setExtremes=function(b,d,a,c,e){var g=this,m=g.chart;a=I(a,!0);g.series.forEach(function(b){delete b.kdTree});e=C(e,{min:b,max:d});r(g,"setExtremes",e,function(){g.userMin=b;g.userMax=d;g.eventArgs=e;a&&m.redraw(c)})};
a.prototype.zoom=function(b,d){var a=this,c=this.dataMin,e=this.dataMax,g=this.options,m=Math.min(c,I(g.min,c)),l=Math.max(e,I(g.max,e));b={newMin:b,newMax:d};r(this,"zoom",b,function(b){var d=b.newMin,g=b.newMax;if(d!==a.min||g!==a.max)a.allowZoomOutside||(p(c)&&(d<m&&(d=m),d>l&&(d=l)),p(e)&&(g<m&&(g=m),g>l&&(g=l))),a.displayBtn="undefined"!==typeof d||"undefined"!==typeof g,a.setExtremes(d,g,!1,void 0,{trigger:"zoom"});b.zoomed=!0});return b.zoomed};a.prototype.setAxisSize=function(){var b=this.chart,
d=this.options,a=d.offsets||[0,0,0,0],c=this.horiz,e=this.width=Math.round(P(I(d.width,b.plotWidth-a[3]+a[1]),b.plotWidth)),g=this.height=Math.round(P(I(d.height,b.plotHeight-a[0]+a[2]),b.plotHeight)),m=this.top=Math.round(P(I(d.top,b.plotTop+a[0]),b.plotHeight,b.plotTop));d=this.left=Math.round(P(I(d.left,b.plotLeft+a[3]),b.plotWidth,b.plotLeft));this.bottom=b.chartHeight-g-m;this.right=b.chartWidth-e-d;this.len=Math.max(c?e:g,0);this.pos=c?d:m};a.prototype.getExtremes=function(){var b=this.logarithmic;
return{min:b?w(b.lin2log(this.min)):this.min,max:b?w(b.lin2log(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}};a.prototype.getThreshold=function(b){var d=this.logarithmic,a=d?d.lin2log(this.min):this.min;d=d?d.lin2log(this.max):this.max;null===b||-Infinity===b?b=a:Infinity===b?b=d:a>b?b=a:d<b&&(b=d);return this.translate(b,0,1,0,1)};a.prototype.autoLabelAlign=function(b){var d=(I(b,0)-90*this.side+720)%360;b={align:"center"};r(this,"autoLabelAlign",
b,function(b){15<d&&165>d?b.align="right":195<d&&345>d&&(b.align="left")});return b.align};a.prototype.tickSize=function(b){var d=this.options,a=I(d["tick"===b?"tickWidth":"minorTickWidth"],"tick"===b&&this.isXAxis&&!this.categories?1:0),c=d["tick"===b?"tickLength":"minorTickLength"];if(a&&c){"inside"===d[b+"Position"]&&(c=-c);var e=[c,a]}b={tickSize:e};r(this,"afterTickSize",b);return b.tickSize};a.prototype.labelMetrics=function(){var b=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize,
this.ticks[b]&&this.ticks[b].label)};a.prototype.unsquish=function(){var b=this.options.labels,d=this.horiz,a=this.tickInterval,c=this.len/(((this.categories?1:0)+this.max-this.min)/a),m=b.rotation,l=this.labelMetrics(),f=Math.max(this.max-this.min,0),h=function(b){var d=b/(c||1);d=1<d?Math.ceil(d):1;d*a>f&&Infinity!==b&&Infinity!==c&&f&&(d=Math.ceil(f/a));return w(d*a)},r=a,k,x,D=Number.MAX_VALUE;if(d){if(!b.staggerLines&&!b.step)if(g(m))var p=[m];else c<b.autoRotationLimit&&(p=b.autoRotation);p&&
p.forEach(function(b){if(b===m||b&&-90<=b&&90>=b){x=h(Math.abs(l.h/Math.sin(e*b)));var d=x+Math.abs(b/360);d<D&&(D=d,k=b,r=x)}})}else b.step||(r=h(l.h));this.autoRotation=p;this.labelRotation=I(k,g(m)?m:0);return r};a.prototype.getSlotWidth=function(b){var d=this.chart,a=this.horiz,c=this.options.labels,e=Math.max(this.tickPositions.length-(this.categories?0:1),1),m=d.margin[3];if(b&&g(b.slotWidth))return b.slotWidth;if(a&&2>c.step)return c.rotation?0:(this.staggerLines||1)*this.len/e;if(!a){b=c.style.width;
if(void 0!==b)return parseInt(String(b),10);if(m)return m-d.spacing[3]}return.33*d.chartWidth};a.prototype.renderUnsquish=function(){var b=this.chart,a=b.renderer,c=this.tickPositions,e=this.ticks,g=this.options.labels,m=g.style,l=this.horiz,f=this.getSlotWidth(),h=Math.max(1,Math.round(f-2*g.padding)),r={},k=this.labelMetrics(),x=m.textOverflow,D=0;d(g.rotation)||(r.rotation=g.rotation||0);c.forEach(function(b){b=e[b];b.movedLabel&&b.replaceMovedLabel();b&&b.label&&b.label.textPxLength>D&&(D=b.label.textPxLength)});
this.maxLabelLength=D;if(this.autoRotation)D>h&&D>k.h?r.rotation=this.labelRotation:this.labelRotation=0;else if(f){var p=h;if(!x){var n="clip";for(h=c.length;!l&&h--;){var I=c[h];if(I=e[I].label)I.styles&&"ellipsis"===I.styles.textOverflow?I.css({textOverflow:"clip"}):I.textPxLength>f&&I.css({width:f+"px"}),I.getBBox().height>this.len/c.length-(k.h-k.f)&&(I.specificTextOverflow="ellipsis")}}}r.rotation&&(p=D>.5*b.chartHeight?.33*b.chartHeight:D,x||(n="ellipsis"));if(this.labelAlign=g.align||this.autoLabelAlign(this.labelRotation))r.align=
this.labelAlign;c.forEach(function(b){var d=(b=e[b])&&b.label,a=m.width,c={};d&&(d.attr(r),b.shortenLabel?b.shortenLabel():p&&!a&&"nowrap"!==m.whiteSpace&&(p<d.textPxLength||"SPAN"===d.element.tagName)?(c.width=p+"px",x||(c.textOverflow=d.specificTextOverflow||n),d.css(c)):d.styles&&d.styles.width&&!c.width&&!a&&d.css({width:null}),delete d.specificTextOverflow,b.rotation=r.rotation)},this);this.tickRotCorr=a.rotCorr(k.b,this.labelRotation||0,0!==this.side)};a.prototype.hasData=function(){return this.series.some(function(b){return b.hasData()})||
this.options.showEmpty&&p(this.min)&&p(this.max)};a.prototype.addTitle=function(b){var d=this.chart.renderer,a=this.horiz,c=this.opposite,e=this.options.title,g=this.chart.styledMode,l;this.axisTitle||((l=e.textAlign)||(l=(a?{low:"left",middle:"center",high:"right"}:{low:c?"right":"left",middle:"center",high:c?"left":"right"})[e.align]),this.axisTitle=d.text(e.text||"",0,0,e.useHTML).attr({zIndex:7,rotation:e.rotation,align:l}).addClass("highcharts-axis-title"),g||this.axisTitle.css(m(e.style)),this.axisTitle.add(this.axisGroup),
this.axisTitle.isNew=!0);g||e.style.width||this.isRadial||this.axisTitle.css({width:this.len+"px"});this.axisTitle[b?"show":"hide"](b)};a.prototype.generateTick=function(b){var d=this.ticks;d[b]?d[b].addLabel():d[b]=new H(this,b)};a.prototype.getOffset=function(){var b=this,d=this,a=d.chart,c=d.horiz,e=d.options,g=d.side,m=d.ticks,l=d.tickPositions,f=d.coll,h=d.axisParent,k=a.renderer,D=a.inverted&&!d.isZAxis?[1,0,3,2][g]:g,n=d.hasData(),t=e.title,C=e.labels,q=a.axisOffset;a=a.clipOffset;var w=[-1,
1,1,-1][g],B=e.className,P,J=0,ja=0,ca=0;d.showAxis=P=n||e.showEmpty;d.staggerLines=d.horiz&&C.staggerLines||void 0;if(!d.axisGroup){var v=function(d,a,c){return k.g(d).attr({zIndex:c}).addClass("highcharts-"+f.toLowerCase()+a+" "+(b.isRadial?"highcharts-radial-axis"+a+" ":"")+(B||"")).add(h)};d.gridGroup=v("grid","-grid",e.gridZIndex);d.axisGroup=v("axis","",e.zIndex);d.labelGroup=v("axis-labels","-labels",C.zIndex)}n||d.isLinked?(l.forEach(function(b){d.generateTick(b)}),d.renderUnsquish(),d.reserveSpaceDefault=
0===g||2===g||{1:"left",3:"right"}[g]===d.labelAlign,I(C.reserveSpace,"center"===d.labelAlign?!0:null,d.reserveSpaceDefault)&&l.forEach(function(b){ca=Math.max(m[b].getLabelSize(),ca)}),d.staggerLines&&(ca*=d.staggerLines),d.labelOffset=ca*(d.opposite?-1:1)):x(m,function(b,d){b.destroy();delete m[d]});if(t&&t.text&&!1!==t.enabled&&(d.addTitle(P),P&&!1!==t.reserveSpace)){d.titleOffset=J=d.axisTitle.getBBox()[c?"height":"width"];var O=t.offset;ja=p(O)?0:I(t.margin,c?5:10)}d.renderLine();d.offset=w*
I(e.offset,q[g]?q[g]+(e.margin||0):0);d.tickRotCorr=d.tickRotCorr||{x:0,y:0};t=0===g?-d.labelMetrics().h:2===g?d.tickRotCorr.y:0;n=Math.abs(ca)+ja;ca&&(n=n-t+w*(c?I(C.y,d.tickRotCorr.y+8*w):C.x));d.axisTitleMargin=I(O,n);d.getMaxLabelDimensions&&(d.maxLabelDimensions=d.getMaxLabelDimensions(m,l));"colorAxis"!==f&&(c=this.tickSize("tick"),q[g]=Math.max(q[g],(d.axisTitleMargin||0)+J+w*d.offset,n,l&&l.length&&c?c[0]+w*d.offset:0),e=!d.axisLine||e.offset?0:2*Math.floor(d.axisLine.strokeWidth()/2),a[D]=
Math.max(a[D],e));r(this,"afterGetOffset")};a.prototype.getLinePath=function(b){var d=this.chart,a=this.opposite,c=this.offset,e=this.horiz,g=this.left+(a?this.width:0)+c;c=d.chartHeight-this.bottom-(a?this.height:0)+c;a&&(b*=-1);return d.renderer.crispLine([["M",e?this.left:g,e?c:this.top],["L",e?d.chartWidth-this.right:g,e?c:d.chartHeight-this.bottom]],b)};a.prototype.renderLine=function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
this.chart.styledMode||this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))};a.prototype.getTitlePosition=function(){var b=this.horiz,d=this.left,a=this.top,c=this.len,e=this.options.title,g=b?d:a,m=this.opposite,l=this.offset,f=e.x,h=e.y,k=this.axisTitle,x=this.chart.renderer.fontMetrics(e.style.fontSize,k);k=Math.max(k.getBBox(null,0).height-x.h-1,0);c={low:g+(b?0:c),middle:g+c/2,high:g+(b?c:0)}[e.align];d=(b?a+this.height:d)+(b?1:-1)*(m?-1:1)*this.axisTitleMargin+
[-k,k,x.f,-k][this.side];b={x:b?c+f:d+(m?this.width:0)+l+f,y:b?d+h-(m?this.height:0)+l:c+h};r(this,"afterGetTitlePosition",{titlePosition:b});return b};a.prototype.renderMinorTick=function(b,d){var a=this.minorTicks;a[b]||(a[b]=new H(this,b,"minor"));d&&a[b].isNew&&a[b].render(null,!0);a[b].render(null,!1,1)};a.prototype.renderTick=function(b,d,a){var c=this.ticks;if(!this.isLinked||b>=this.min&&b<=this.max||this.grid&&this.grid.isColumn)c[b]||(c[b]=new H(this,b)),a&&c[b].isNew&&c[b].render(d,!0,
-1),c[b].render(d)};a.prototype.render=function(){var b=this,d=b.chart,a=b.logarithmic,c=b.options,e=b.isLinked,m=b.tickPositions,l=b.axisTitle,f=b.ticks,h=b.minorTicks,k=b.alternateBands,D=c.stackLabels,p=c.alternateGridColor,n=b.tickmarkOffset,I=b.axisLine,t=b.showAxis,C=q(d.renderer.globalAnimation),w,B;b.labelEdge.length=0;b.overlap=!1;[f,h,k].forEach(function(b){x(b,function(b){b.isActive=!1})});if(b.hasData()||e){var P=b.chart.hasRendered&&b.old&&g(b.old.min);b.minorTickInterval&&!b.categories&&
b.getMinorTickPositions().forEach(function(d){b.renderMinorTick(d,P)});m.length&&(m.forEach(function(d,a){b.renderTick(d,a,P)}),n&&(0===b.min||b.single)&&(f[-1]||(f[-1]=new H(b,-1,null,!0)),f[-1].render(-1)));p&&m.forEach(function(c,e){B="undefined"!==typeof m[e+1]?m[e+1]+n:b.max-n;0===e%2&&c<b.max&&B<=b.max+(d.polar?-n:n)&&(k[c]||(k[c]=new G.PlotLineOrBand(b)),w=c+n,k[c].options={from:a?a.lin2log(w):w,to:a?a.lin2log(B):B,color:p,className:"highcharts-alternate-grid"},k[c].render(),k[c].isActive=
!0)});b._addedPlotLB||(b._addedPlotLB=!0,(c.plotLines||[]).concat(c.plotBands||[]).forEach(function(d){b.addPlotBandOrLine(d)}))}[f,h,k].forEach(function(b){var a=[],c=C.duration;x(b,function(b,d){b.isActive||(b.render(d,!1,0),b.isActive=!1,a.push(d))});U(function(){for(var d=a.length;d--;)b[a[d]]&&!b[a[d]].isActive&&(b[a[d]].destroy(),delete b[a[d]])},b!==k&&d.hasRendered&&c?c:0)});I&&(I[I.isPlaced?"animate":"attr"]({d:this.getLinePath(I.strokeWidth())}),I.isPlaced=!0,I[t?"show":"hide"](t));l&&t&&
(c=b.getTitlePosition(),g(c.y)?(l[l.isNew?"attr":"animate"](c),l.isNew=!1):(l.attr("y",-9999),l.isNew=!0));D&&D.enabled&&b.stacking&&b.stacking.renderStackTotals();b.old={len:b.len,max:b.max,min:b.min,transA:b.transA,userMax:b.userMax,userMin:b.userMin};b.isDirty=!1;r(this,"afterRender")};a.prototype.redraw=function(){this.visible&&(this.render(),this.plotLinesAndBands.forEach(function(b){b.render()}));this.series.forEach(function(b){b.isDirty=!0})};a.prototype.getKeepProps=function(){return this.keepProps||
a.keepProps};a.prototype.destroy=function(b){var d=this,a=d.plotLinesAndBands,c=this.eventOptions;r(this,"destroy",{keepEvents:b});b||v(d);[d.ticks,d.minorTicks,d.alternateBands].forEach(function(b){B(b)});if(a)for(b=a.length;b--;)a[b].destroy();"axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(b){d[b]&&(d[b]=d[b].destroy())});for(var e in d.plotLinesAndBandsGroups)d.plotLinesAndBandsGroups[e]=d.plotLinesAndBandsGroups[e].destroy();x(d,function(b,a){-1===
d.getKeepProps().indexOf(a)&&delete d[a]});this.eventOptions=c};a.prototype.drawCrosshair=function(b,d){var a=this.crosshair,c=I(a&&a.snap,!0),e=this.chart,g,m=this.cross;r(this,"drawCrosshair",{e:b,point:d});b||(b=this.cross&&this.cross.e);if(a&&!1!==(p(d)||!c)){c?p(d)&&(g=I("colorAxis"!==this.coll?d.crosshairPos:null,this.isXAxis?d.plotX:this.len-d.plotY)):g=b&&(this.horiz?b.chartX-this.pos:this.len-b.chartY+this.pos);if(p(g)){var l={value:d&&(this.isXAxis?d.x:I(d.stackY,d.y)),translatedValue:g};
e.polar&&C(l,{isCrosshair:!0,chartX:b&&b.chartX,chartY:b&&b.chartY,point:d});l=this.getPlotLinePath(l)||null}if(!p(l)){this.hideCrosshair();return}c=this.categories&&!this.isRadial;m||(this.cross=m=e.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(c?"category ":"thin ")+(a.className||"")).attr({zIndex:I(a.zIndex,2)}).add(),e.styledMode||(m.attr({stroke:a.color||(c?z.parse("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":I(a.width,1)}).css({"pointer-events":"none"}),
a.dashStyle&&m.attr({dashstyle:a.dashStyle})));m.show().attr({d:l});c&&!a.width&&m.attr({"stroke-width":this.transA});this.cross.e=b}else this.hideCrosshair();r(this,"afterDrawCrosshair",{e:b,point:d})};a.prototype.hideCrosshair=function(){this.cross&&this.cross.hide();r(this,"afterHideCrosshair")};a.prototype.hasVerticalPanning=function(){var b=this.chart.options.chart.panning;return!!(b&&b.enabled&&/y/.test(b.type))};a.prototype.validatePositiveValue=function(b){return g(b)&&0<b};a.prototype.update=
function(b,d){var a=this.chart;b=m(this.userOptions,b);this.destroy(!0);this.init(a,b);a.isDirtyBox=!0;I(d,!0)&&a.redraw()};a.prototype.remove=function(b){for(var d=this.chart,a=this.coll,c=this.series,e=c.length;e--;)c[e]&&c[e].remove(!1);t(d.axes,this);t(d[a],this);d[a].forEach(function(b,d){b.options.index=b.userOptions.index=d});this.destroy();d.isDirtyBox=!0;I(b,!0)&&d.redraw()};a.prototype.setTitle=function(b,d){this.update({title:b},d)};a.prototype.setCategories=function(b,d){this.update({categories:b},
d)};a.defaultOptions=u.defaultXAxisOptions;a.keepProps="extKey hcEvents names series userMax userMin".split(" ");return a}();"";return a});M(a,"Core/Axis/DateTimeAxis.js",[a["Core/Utilities.js"]],function(a){var v=a.addEvent,z=a.getMagnitude,F=a.normalizeTickInterval,y=a.timeUnits,G;(function(a){function u(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)}function q(a){"datetime"!==a.userOptions.type?this.dateTime=void 0:this.dateTime||(this.dateTime=new k(this))}var n=[];a.compose=
function(a){-1===n.indexOf(a)&&(n.push(a),a.keepProps.push("dateTime"),a.prototype.getTimeTicks=u,v(a,"init",q));return a};var k=function(){function a(a){this.axis=a}a.prototype.normalizeTimeTickInterval=function(a,e){var c=e||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];e=c[c.length-1];var h=y[e[0]],k=e[1],n;for(n=0;n<c.length&&!(e=c[n],h=y[e[0]],
k=e[1],c[n+1]&&a<=(h*k[k.length-1]+y[c[n+1][0]])/2);n++);h===y.year&&a<5*h&&(k=[1,2,5]);a=F(a/h,k,"year"===e[0]?Math.max(z(a/h),1):1);return{unitRange:h,count:a,unitName:e[0]}};a.prototype.getXDateFormat=function(a,e){var c=this.axis;return c.closestPointRange?c.chart.time.getDateFormat(c.closestPointRange,a,c.options.startOfWeek,e)||e.year:e.day};return a}();a.Additions=k})(G||(G={}));return G});M(a,"Core/Axis/LogarithmicAxis.js",[a["Core/Utilities.js"]],function(a){var v=a.addEvent,z=a.getMagnitude,
F=a.normalizeTickInterval,y=a.pick,G;(function(a){function u(a){var c=this.logarithmic;"logarithmic"!==a.userOptions.type?this.logarithmic=void 0:c||(this.logarithmic=new k(this))}function q(){var a=this.logarithmic;a&&(this.lin2val=function(c){return a.lin2log(c)},this.val2lin=function(c){return a.log2lin(c)})}var n=[];a.compose=function(a){-1===n.indexOf(a)&&(n.push(a),a.keepProps.push("logarithmic"),v(a,"init",u),v(a,"afterInit",q));return a};var k=function(){function a(a){this.axis=a}a.prototype.getLogTickPositions=
function(a,e,f,k){var c=this.axis,h=c.len,n=c.options,q=[];k||(this.minorAutoInterval=void 0);if(.5<=a)a=Math.round(a),q=c.getLinearTickPositions(a,e,f);else if(.08<=a){var C=Math.floor(e),r,l=n=void 0;for(h=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];C<f+1&&!l;C++){var b=h.length;for(r=0;r<b&&!l;r++){var g=this.log2lin(this.lin2log(C)*h[r]);g>e&&(!k||n<=f)&&"undefined"!==typeof n&&q.push(n);n>f&&(l=!0);n=g}}}else e=this.lin2log(e),f=this.lin2log(f),a=k?c.getMinorTickInterval():n.tickInterval,
a=y("auto"===a?null:a,this.minorAutoInterval,n.tickPixelInterval/(k?5:1)*(f-e)/((k?h/c.tickPositions.length:h)||1)),a=F(a,void 0,z(a)),q=c.getLinearTickPositions(a,e,f).map(this.log2lin),k||(this.minorAutoInterval=a/5);k||(c.tickInterval=a);return q};a.prototype.lin2log=function(a){return Math.pow(10,a)};a.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};return a}();a.Additions=k})(G||(G={}));return G});M(a,"Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js",[a["Core/Utilities.js"]],function(a){var v=
a.erase,z=a.extend,F=a.isNumber,y;(function(a){var u=[],A;a.compose=function(a,k){A||(A=a);-1===u.indexOf(k)&&(u.push(k),z(k.prototype,q.prototype));return k};var q=function(){function a(){}a.prototype.getPlotBandPath=function(a,e,c){void 0===c&&(c=this.options);var h=this.getPlotLinePath({value:e,force:!0,acrossPanes:c.acrossPanes}),f=[],k=this.horiz;e=!F(this.min)||!F(this.max)||a<this.min&&e<this.min||a>this.max&&e>this.max;a=this.getPlotLinePath({value:a,force:!0,acrossPanes:c.acrossPanes});c=
1;if(a&&h){if(e){var p=a.toString()===h.toString();c=0}for(e=0;e<a.length;e+=2){var n=a[e],t=a[e+1],q=h[e],C=h[e+1];"M"!==n[0]&&"L"!==n[0]||"M"!==t[0]&&"L"!==t[0]||"M"!==q[0]&&"L"!==q[0]||"M"!==C[0]&&"L"!==C[0]||(k&&q[1]===n[1]?(q[1]+=c,C[1]+=c):k||q[2]!==n[2]||(q[2]+=c,C[2]+=c),f.push(["M",n[1],n[2]],["L",t[1],t[2]],["L",C[1],C[2]],["L",q[1],q[2]],["Z"]));f.isFlat=p}}return f};a.prototype.addPlotBand=function(a){return this.addPlotBandOrLine(a,"plotBands")};a.prototype.addPlotLine=function(a){return this.addPlotBandOrLine(a,
"plotLines")};a.prototype.addPlotBandOrLine=function(a,e){var c=this,h=this.userOptions,f=new A(this,a);this.visible&&(f=f.render());if(f){this._addedPlotLB||(this._addedPlotLB=!0,(h.plotLines||[]).concat(h.plotBands||[]).forEach(function(a){c.addPlotBandOrLine(a)}));if(e){var k=h[e]||[];k.push(a);h[e]=k}this.plotLinesAndBands.push(f)}return f};a.prototype.removePlotBandOrLine=function(a){var e=this.plotLinesAndBands,c=this.options,h=this.userOptions;if(e){for(var f=e.length;f--;)e[f].id===a&&e[f].destroy();
[c.plotLines||[],h.plotLines||[],c.plotBands||[],h.plotBands||[]].forEach(function(c){for(f=c.length;f--;)(c[f]||{}).id===a&&v(c,c[f])})}};a.prototype.removePlotBand=function(a){this.removePlotBandOrLine(a)};a.prototype.removePlotLine=function(a){this.removePlotBandOrLine(a)};return a}()})(y||(y={}));return y});M(a,"Core/Axis/PlotLineOrBand/PlotLineOrBand.js",[a["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"],a["Core/Utilities.js"]],function(a,u){var v=u.arrayMax,F=u.arrayMin,y=u.defined,G=u.destroyObjectProperties,
H=u.erase,A=u.fireEvent,q=u.merge,n=u.objectEach,k=u.pick;u=function(){function e(a,e){this.axis=a;e&&(this.options=e,this.id=e.id)}e.compose=function(c){return a.compose(e,c)};e.prototype.render=function(){A(this,"render");var a=this,e=a.axis,f=e.horiz,w=e.logarithmic,p=a.options,B=p.color,t=k(p.zIndex,0),v=p.events,C={},r=e.chart.renderer,l=p.label,b=a.label,g=p.to,d=p.from,m=p.value,D=a.svgElem,x=[],I=y(d)&&y(g);x=y(m);var P=!D,S={"class":"highcharts-plot-"+(I?"band ":"line ")+(p.className||"")},
O=I?"bands":"lines";w&&(d=w.log2lin(d),g=w.log2lin(g),m=w.log2lin(m));e.chart.styledMode||(x?(S.stroke=B||"#999999",S["stroke-width"]=k(p.width,1),p.dashStyle&&(S.dashstyle=p.dashStyle)):I&&(S.fill=B||"#e6ebf5",p.borderWidth&&(S.stroke=p.borderColor,S["stroke-width"]=p.borderWidth)));C.zIndex=t;O+="-"+t;(w=e.plotLinesAndBandsGroups[O])||(e.plotLinesAndBandsGroups[O]=w=r.g("plot-"+O).attr(C).add());P&&(a.svgElem=D=r.path().attr(S).add(w));if(x)x=e.getPlotLinePath({value:m,lineWidth:D.strokeWidth(),
acrossPanes:p.acrossPanes});else if(I)x=e.getPlotBandPath(d,g,p);else return;!a.eventsAdded&&v&&(n(v,function(b,d){D.on(d,function(b){v[d].apply(a,[b])})}),a.eventsAdded=!0);(P||!D.d)&&x&&x.length?D.attr({d:x}):D&&(x?(D.show(!0),D.animate({d:x})):D.d&&(D.hide(),b&&(a.label=b=b.destroy())));l&&(y(l.text)||y(l.formatter))&&x&&x.length&&0<e.width&&0<e.height&&!x.isFlat?(l=q({align:f&&I&&"center",x:f?!I&&4:10,verticalAlign:!f&&I&&"middle",y:f?I?16:10:I?6:-4,rotation:f&&!I&&90},l),this.renderLabel(l,x,
I,t)):b&&b.hide();return a};e.prototype.renderLabel=function(a,e,f,k){var c=this.axis,h=c.chart.renderer,n=this.label;n||(this.label=n=h.text(this.getLabelText(a),0,0,a.useHTML).attr({align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(f?"band":"line")+"-label "+(a.className||""),zIndex:k}).add(),c.chart.styledMode||n.css(q({textOverflow:"ellipsis"},a.style)));k=e.xBounds||[e[0][1],e[1][1],f?e[2][1]:e[0][1]];e=e.yBounds||[e[0][2],e[1][2],f?e[2][2]:e[0][2]];f=F(k);h=F(e);n.align(a,
!1,{x:f,y:h,width:v(k)-f,height:v(e)-h});n.alignValue&&"left"!==n.alignValue||n.css({width:(90===n.rotation?c.height-(n.alignAttr.y-c.top):c.width-(n.alignAttr.x-c.left))+"px"});n.show(!0)};e.prototype.getLabelText=function(a){return y(a.formatter)?a.formatter.call(this):a.text};e.prototype.destroy=function(){H(this.axis.plotLinesAndBands,this);delete this.axis;G(this)};return e}();"";"";return u});M(a,"Core/Tooltip.js",[a["Core/FormatUtilities.js"],a["Core/Globals.js"],a["Core/Renderer/RendererUtilities.js"],
a["Core/Renderer/RendererRegistry.js"],a["Core/Utilities.js"]],function(a,u,z,F,y){var v=a.format,H=u.doc,A=z.distribute,q=y.addEvent,n=y.clamp,k=y.css,e=y.defined,c=y.discardElement,h=y.extend,f=y.fireEvent,w=y.isArray,p=y.isNumber,B=y.isString,t=y.merge,J=y.pick,C=y.splat,r=y.syncTimeout;a=function(){function a(b,a){this.allowShared=!0;this.container=void 0;this.crosshairs=[];this.distance=0;this.isHidden=!0;this.isSticky=!1;this.now={};this.options={};this.outside=!1;this.chart=b;this.init(b,a)}
a.prototype.applyFilter=function(){var b=this.chart;b.renderer.definition({tagName:"filter",attributes:{id:"drop-shadow-"+b.index,opacity:.5},children:[{tagName:"feGaussianBlur",attributes:{"in":"SourceAlpha",stdDeviation:1}},{tagName:"feOffset",attributes:{dx:1,dy:1}},{tagName:"feComponentTransfer",children:[{tagName:"feFuncA",attributes:{type:"linear",slope:.3}}]},{tagName:"feMerge",children:[{tagName:"feMergeNode"},{tagName:"feMergeNode",attributes:{"in":"SourceGraphic"}}]}]})};a.prototype.bodyFormatter=
function(b){return b.map(function(b){var a=b.series.tooltipOptions;return(a[(b.point.formatPrefix||"point")+"Formatter"]||b.point.tooltipFormatter).call(b.point,a[(b.point.formatPrefix||"point")+"Format"]||"")})};a.prototype.cleanSplit=function(b){this.chart.series.forEach(function(a){var d=a&&a.tt;d&&(!d.isActive||b?a.tt=d.destroy():d.isActive=!1)})};a.prototype.defaultFormatter=function(b){var a=this.points||C(this);var d=[b.tooltipFooterHeaderFormatter(a[0])];d=d.concat(b.bodyFormatter(a));d.push(b.tooltipFooterHeaderFormatter(a[0],
!0));return d};a.prototype.destroy=function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(!0),this.tt=this.tt.destroy());this.renderer&&(this.renderer=this.renderer.destroy(),c(this.container));y.clearTimeout(this.hideTimer);y.clearTimeout(this.tooltipTimeout)};a.prototype.getAnchor=function(b,a){var d=this.chart,c=d.pointer,e=d.inverted,g=d.plotTop,l=d.plotLeft,f,r,h=0,k=0;b=C(b);this.followPointer&&a?("undefined"===typeof a.chartX&&(a=c.normalize(a)),c=[a.chartX-
l,a.chartY-g]):b[0].tooltipPos?c=b[0].tooltipPos:(b.forEach(function(b){f=b.series.yAxis;r=b.series.xAxis;h+=b.plotX||0;k+=b.plotLow?(b.plotLow+(b.plotHigh||0))/2:b.plotY||0;r&&f&&(e?(h+=g+d.plotHeight-r.len-r.pos,k+=l+d.plotWidth-f.len-f.pos):(h+=r.pos-l,k+=f.pos-g))}),h/=b.length,k/=b.length,c=[e?d.plotWidth-k:h,e?d.plotHeight-h:k],this.shared&&1<b.length&&a&&(e?c[0]=a.chartX-l:c[1]=a.chartY-g));return c.map(Math.round)};a.prototype.getLabel=function(){var b=this,a=this.chart.styledMode,d=this.options,
c=this.split&&this.allowShared,l="tooltip"+(e(d.className)?" "+d.className:""),f=d.style.pointerEvents||(!this.followPointer&&d.stickOnContact?"auto":"none"),r=function(){b.inContact=!0},h=function(a){var d=b.chart.hoverSeries;b.inContact=b.shouldStickOnContact()&&b.chart.pointer.inClass(a.relatedTarget,"highcharts-tooltip");if(!b.inContact&&d&&d.onMouseOut)d.onMouseOut()},p,n=this.chart.renderer;if(b.label){var t=!b.label.hasClass("highcharts-label");(c&&!t||!c&&t)&&b.destroy()}if(!this.label){if(this.outside){t=
this.chart.options.chart.style;var C=F.getRendererType();this.container=p=u.doc.createElement("div");p.className="highcharts-tooltip-container";k(p,{position:"absolute",top:"1px",pointerEvents:f,zIndex:Math.max(this.options.style.zIndex||0,(t&&t.zIndex||0)+3)});q(p,"mouseenter",r);q(p,"mouseleave",h);u.doc.body.appendChild(p);this.renderer=n=new C(p,0,0,t,void 0,void 0,n.styledMode)}c?this.label=n.g(l):(this.label=n.label("",0,0,d.shape,void 0,void 0,d.useHTML,void 0,l).attr({padding:d.padding,r:d.borderRadius}),
a||this.label.attr({fill:d.backgroundColor,"stroke-width":d.borderWidth}).css(d.style).css({pointerEvents:f}).shadow(d.shadow));a&&d.shadow&&(this.applyFilter(),this.label.attr({filter:"url(#drop-shadow-"+this.chart.index+")"}));if(b.outside&&!b.split){var B=this.label,w=B.xSetter,v=B.ySetter;B.xSetter=function(a){w.call(B,b.distance);p.style.left=a+"px"};B.ySetter=function(a){v.call(B,b.distance);p.style.top=a+"px"}}this.label.on("mouseenter",r).on("mouseleave",h).attr({zIndex:8}).add()}return this.label};
a.prototype.getPosition=function(b,a,d){var c=this.chart,e=this.distance,g={},l=c.inverted&&d.h||0,f=this.outside,r=f?H.documentElement.clientWidth-2*e:c.chartWidth,h=f?Math.max(H.body.scrollHeight,H.documentElement.scrollHeight,H.body.offsetHeight,H.documentElement.offsetHeight,H.documentElement.clientHeight):c.chartHeight,k=c.pointer.getChartPosition(),p=function(g){var m="x"===g;return[g,m?r:h,m?b:a].concat(f?[m?b*k.scaleX:a*k.scaleY,m?k.left-e+(d.plotX+c.plotLeft)*k.scaleX:k.top-e+(d.plotY+c.plotTop)*
k.scaleY,0,m?r:h]:[m?b:a,m?d.plotX+c.plotLeft:d.plotY+c.plotTop,m?c.plotLeft:c.plotTop,m?c.plotLeft+c.plotWidth:c.plotTop+c.plotHeight])},n=p("y"),t=p("x"),C;p=!!d.negative;!c.polar&&c.hoverSeries&&c.hoverSeries.yAxis&&c.hoverSeries.yAxis.reversed&&(p=!p);var q=!this.followPointer&&J(d.ttBelow,!c.inverted===p),B=function(b,a,d,c,m,r,h){var x=f?"y"===b?e*k.scaleY:e*k.scaleX:e,D=(d-c)/2,p=c<m-e,E=m+e+c<a,n=m-x-d+D;m=m+x-D;if(q&&E)g[b]=m;else if(!q&&p)g[b]=n;else if(p)g[b]=Math.min(h-c,0>n-l?n:n-l);
else if(E)g[b]=Math.max(r,m+l+d>a?m:m+l);else return!1},w=function(b,a,d,c,m){var l;m<e||m>a-e?l=!1:g[b]=m<d/2?1:m>a-c/2?a-c-2:m-d/2;return l},E=function(b){var a=n;n=t;t=a;C=b},T=function(){!1!==B.apply(0,n)?!1!==w.apply(0,t)||C||(E(!0),T()):C?g.x=g.y=0:(E(!0),T())};(c.inverted||1<this.len)&&E();T();return g};a.prototype.hide=function(b){var a=this;y.clearTimeout(this.hideTimer);b=J(b,this.options.hideDelay);this.isHidden||(this.hideTimer=r(function(){a.getLabel().fadeOut(b?void 0:b);a.isHidden=
!0},b))};a.prototype.init=function(b,a){this.chart=b;this.options=a;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=a.split&&!b.inverted&&!b.polar;this.shared=a.shared||this.split;this.outside=J(a.outside,!(!b.scrollablePixelsX&&!b.scrollablePixelsY))};a.prototype.shouldStickOnContact=function(){return!(this.followPointer||!this.options.stickOnContact)};a.prototype.isStickyOnContact=function(){return!(!this.shouldStickOnContact()||!this.inContact)};a.prototype.move=function(b,a,
d,c){var e=this,g=e.now,m=!1!==e.options.animation&&!e.isHidden&&(1<Math.abs(b-g.x)||1<Math.abs(a-g.y)),l=e.followPointer||1<e.len;h(g,{x:m?(2*g.x+b)/3:b,y:m?(g.y+a)/2:a,anchorX:l?void 0:m?(2*g.anchorX+d)/3:d,anchorY:l?void 0:m?(g.anchorY+c)/2:c});e.getLabel().attr(g);e.drawTracker();m&&(y.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(b,a,d,c)},32))};a.prototype.refresh=function(b,a){var d=this.chart,c=this.options,e=C(b),g=e[0],l=[],r=c.formatter||this.defaultFormatter,
h=this.shared,k=d.styledMode,p={};if(c.enabled){y.clearTimeout(this.hideTimer);this.allowShared=!(!w(b)&&b.series&&b.series.noSharedTooltip);this.followPointer=!this.split&&g.series.tooltipOptions.followPointer;b=this.getAnchor(b,a);var n=b[0],t=b[1];h&&this.allowShared?(d.pointer.applyInactiveState(e),e.forEach(function(b){b.setState("hover");l.push(b.getLabelConfig())}),p={x:g.category,y:g.y},p.points=l):p=g.getLabelConfig();this.len=l.length;r=r.call(p,this);h=g.series;this.distance=J(h.tooltipOptions.distance,
16);if(!1===r)this.hide();else{if(this.split&&this.allowShared)this.renderSplit(r,e);else{var q=n,B=t;a&&d.pointer.isDirectTouch&&(q=a.chartX-d.plotLeft,B=a.chartY-d.plotTop);if(d.polar||!1===h.options.clip||e.some(function(b){return b.series.shouldShowTooltip(q,B)}))a=this.getLabel(),c.style.width&&!k||a.css({width:this.chart.spacingBox.width+"px"}),a.attr({text:r&&r.join?r.join(""):r}),a.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+J(g.colorIndex,h.colorIndex)),k||a.attr({stroke:c.borderColor||
g.color||h.color||"#666666"}),this.updatePosition({plotX:n,plotY:t,negative:g.negative,ttBelow:g.ttBelow,h:b[2]||0});else{this.hide();return}}this.isHidden&&this.label&&this.label.attr({opacity:1}).show();this.isHidden=!1}f(this,"refresh")}};a.prototype.renderSplit=function(b,a){function d(b,a,d,e,g){void 0===g&&(g=!0);d?(a=X?0:G,b=n(b-e/2,N.left,N.right-e-(c.outside?R:0))):(a-=z,b=g?b-e-y:b+y,b=n(b,g?b:N.left,N.right));return{x:b,y:a}}var c=this,e=c.chart,g=c.chart,l=g.chartWidth,f=g.chartHeight,
r=g.plotHeight,k=g.plotLeft,p=g.plotTop,t=g.pointer,C=g.scrollablePixelsY;C=void 0===C?0:C;var q=g.scrollablePixelsX,w=g.scrollingContainer;w=void 0===w?{scrollLeft:0,scrollTop:0}:w;var v=w.scrollLeft;w=w.scrollTop;var u=g.styledMode,y=c.distance,E=c.options,T=c.options.positioner,N=c.outside&&"number"!==typeof q?H.documentElement.getBoundingClientRect():{left:v,right:v+l,top:w,bottom:w+f},V=c.getLabel(),W=this.renderer||e.renderer,X=!(!e.xAxis[0]||!e.xAxis[0].opposite);e=t.getChartPosition();var R=
e.left;e=e.top;var z=p+w,aa=0,G=r-C;B(b)&&(b=[!1,b]);b=b.slice(0,a.length+1).reduce(function(b,e,g){if(!1!==e&&""!==e){g=a[g-1]||{isHeader:!0,plotX:a[0].plotX,plotY:r,series:{}};var m=g.isHeader,l=m?c:g.series;e=e.toString();var f=l.tt,h=g.isHeader;var x=g.series;var D="highcharts-color-"+J(g.colorIndex,x.colorIndex,"none");f||(f={padding:E.padding,r:E.borderRadius},u||(f.fill=E.backgroundColor,f["stroke-width"]=E.borderWidth),f=W.label("",0,0,E[h?"headerShape":"shape"],void 0,void 0,E.useHTML).addClass((h?
"highcharts-tooltip-header ":"")+"highcharts-tooltip-box "+D).attr(f).add(V));f.isActive=!0;f.attr({text:e});u||f.css(E.style).shadow(E.shadow).attr({stroke:E.borderColor||g.color||x.color||"#333333"});l=l.tt=f;h=l.getBBox();e=h.width+l.strokeWidth();m&&(aa=h.height,G+=aa,X&&(z-=aa));x=g.plotX;x=void 0===x?0:x;D=g.plotY;D=void 0===D?0:D;f=g.series;if(g.isHeader){x=k+x;var t=p+r/2}else{var I=f.xAxis,C=f.yAxis;x=I.pos+n(x,-y,I.len+y);f.shouldShowTooltip(0,C.pos-p+D,{ignoreX:!0})&&(t=C.pos+D)}x=n(x,
N.left-y,N.right+y);"number"===typeof t?(h=h.height+1,D=T?T.call(c,e,h,g):d(x,t,m,e),b.push({align:T?0:void 0,anchorX:x,anchorY:t,boxWidth:e,point:g,rank:J(D.rank,m?1:0),size:h,target:D.y,tt:l,x:D.x})):l.isActive=!1}return b},[]);!T&&b.some(function(b){var a=(c.outside?R:0)+b.anchorX;return a<N.left&&a+b.boxWidth<N.right?!0:a<R-N.left+b.boxWidth&&N.right-a>a})&&(b=b.map(function(b){var a=d(b.anchorX,b.anchorY,b.point.isHeader,b.boxWidth,!1);return h(b,{target:a.y,x:a.x})}));c.cleanSplit();A(b,G);
var F=R,ba=R;b.forEach(function(b){var a=b.x,d=b.boxWidth;b=b.isHeader;b||(c.outside&&R+a<F&&(F=R+a),!b&&c.outside&&F+d>ba&&(ba=R+a))});b.forEach(function(b){var a=b.x,d=b.anchorX,e=b.pos,g=b.point.isHeader;e={visibility:"undefined"===typeof e?"hidden":"inherit",x:a,y:e+z,anchorX:d,anchorY:b.anchorY};if(c.outside&&a<d){var m=R-F;0<m&&(g||(e.x=a+m,e.anchorX=d+m),g&&(e.x=(ba-F)/2,e.anchorX=d+m))}b.tt.attr(e)});b=c.container;C=c.renderer;c.outside&&b&&C&&(g=V.getBBox(),C.setSize(g.width+g.x,g.height+
g.y,!1),b.style.left=F+"px",b.style.top=e+"px")};a.prototype.drawTracker=function(){if(this.followPointer||!this.options.stickOnContact)this.tracker&&this.tracker.destroy();else{var b=this.chart,a=this.label,d=this.shared?b.hoverPoints:b.hoverPoint;if(a&&d){var c={x:0,y:0,width:0,height:0};d=this.getAnchor(d);var e=a.getBBox();d[0]+=b.plotLeft-a.translateX;d[1]+=b.plotTop-a.translateY;c.x=Math.min(0,d[0]);c.y=Math.min(0,d[1]);c.width=0>d[0]?Math.max(Math.abs(d[0]),e.width-d[0]):Math.max(Math.abs(d[0]),
e.width);c.height=0>d[1]?Math.max(Math.abs(d[1]),e.height-Math.abs(d[1])):Math.max(Math.abs(d[1]),e.height);this.tracker?this.tracker.attr(c):(this.tracker=a.renderer.rect(c).addClass("highcharts-tracker").add(a),b.styledMode||this.tracker.attr({fill:"rgba(0,0,0,0)"}))}}};a.prototype.styledModeFormat=function(b){return b.replace('style="font-size: 10px"','class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,'class="highcharts-color-{$1.colorIndex}"')};a.prototype.tooltipFooterHeaderFormatter=
function(b,a){var d=b.series,c=d.tooltipOptions,e=d.xAxis,g=e&&e.dateTime;e={isFooter:a,labelConfig:b};var l=c.xDateFormat,r=c[a?"footerFormat":"headerFormat"];f(this,"headerFormatter",e,function(a){g&&!l&&p(b.key)&&(l=g.getXDateFormat(b.key,c.dateTimeLabelFormats));g&&l&&(b.point&&b.point.tooltipDateKeys||["key"]).forEach(function(b){r=r.replace("{point."+b+"}","{point."+b+":"+l+"}")});d.chart.styledMode&&(r=this.styledModeFormat(r));a.text=v(r,{point:b,series:d},this.chart)});return e.text};a.prototype.update=
function(b){this.destroy();t(!0,this.chart.options.tooltip.userOptions,b);this.init(this.chart,t(!0,this.options,b))};a.prototype.updatePosition=function(b){var a=this.chart,d=this.options,c=a.pointer,e=this.getLabel();c=c.getChartPosition();var l=(d.positioner||this.getPosition).call(this,e.width,e.height,b),f=b.plotX+a.plotLeft;b=b.plotY+a.plotTop;if(this.outside){d=d.borderWidth+2*this.distance;this.renderer.setSize(e.width+d,e.height+d,!1);if(1!==c.scaleX||1!==c.scaleY)k(this.container,{transform:"scale("+
c.scaleX+", "+c.scaleY+")"}),f*=c.scaleX,b*=c.scaleY;f+=c.left-l.x;b+=c.top-l.y}this.move(Math.round(l.x),Math.round(l.y||0),f,b)};return a}();"";return a});M(a,"Core/Series/Point.js",[a["Core/Renderer/HTML/AST.js"],a["Core/Animation/AnimationUtilities.js"],a["Core/DefaultOptions.js"],a["Core/FormatUtilities.js"],a["Core/Utilities.js"]],function(a,u,z,F,y){var v=u.animObject,H=z.defaultOptions,A=F.format,q=y.addEvent,n=y.defined,k=y.erase,e=y.extend,c=y.fireEvent,h=y.getNestedProperty,f=y.isArray,
w=y.isFunction,p=y.isNumber,B=y.isObject,t=y.merge,J=y.objectEach,C=y.pick,r=y.syncTimeout,l=y.removeEvent,b=y.uniqueKey;u=function(){function g(){this.colorIndex=this.category=void 0;this.formatPrefix="point";this.id=void 0;this.isNull=!1;this.percentage=this.options=this.name=void 0;this.selected=!1;this.total=this.series=void 0;this.visible=!0;this.x=void 0}g.prototype.animateBeforeDestroy=function(){var b=this,a={x:b.startXPos,opacity:0},c=b.getGraphicalProps();c.singular.forEach(function(d){b[d]=
b[d].animate("dataLabel"===d?{x:b[d].startXPos,y:b[d].startYPos,opacity:0}:a)});c.plural.forEach(function(a){b[a].forEach(function(a){a.element&&a.animate(e({x:b.startXPos},a.startYPos?{x:a.startXPos,y:a.startYPos}:{}))})})};g.prototype.applyOptions=function(b,a){var d=this.series,c=d.options.pointValKey||d.pointValKey;b=g.prototype.optionsToObject.call(this,b);e(this,b);this.options=this.options?e(this.options,b):b;b.group&&delete this.group;b.dataLabels&&delete this.dataLabels;c&&(this.y=g.prototype.getNestedProperty.call(this,
c));this.formatPrefix=(this.isNull=C(this.isValid&&!this.isValid(),null===this.x||!p(this.y)))?"null":"point";this.selected&&(this.state="select");"name"in this&&"undefined"===typeof a&&d.xAxis&&d.xAxis.hasNames&&(this.x=d.xAxis.nameToX(this));"undefined"===typeof this.x&&d?this.x="undefined"===typeof a?d.autoIncrement():a:p(b.x)&&d.options.relativeXValue&&(this.x=d.autoIncrement(b.x));return this};g.prototype.destroy=function(){function b(){if(a.graphic||a.dataLabel||a.dataLabels)l(a),a.destroyElements();
for(h in a)a[h]=null}var a=this,c=a.series,e=c.chart;c=c.options.dataSorting;var g=e.hoverPoints,f=v(a.series.chart.renderer.globalAnimation),h;a.legendItem&&e.legend.destroyItem(a);g&&(a.setState(),k(g,a),g.length||(e.hoverPoints=null));if(a===e.hoverPoint)a.onMouseOut();c&&c.enabled?(this.animateBeforeDestroy(),r(b,f.duration)):b();e.pointCount--};g.prototype.destroyElements=function(b){var a=this;b=a.getGraphicalProps(b);b.singular.forEach(function(b){a[b]=a[b].destroy()});b.plural.forEach(function(b){a[b].forEach(function(b){b.element&&
b.destroy()});delete a[b]})};g.prototype.firePointEvent=function(b,a,e){var d=this,g=this.series.options;(g.point.events[b]||d.options&&d.options.events&&d.options.events[b])&&d.importEvents();"click"===b&&g.allowPointSelect&&(e=function(b){d.select&&d.select(null,b.ctrlKey||b.metaKey||b.shiftKey)});c(d,b,a,e)};g.prototype.getClassName=function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+
("undefined"!==typeof this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")};g.prototype.getGraphicalProps=function(b){var a=this,d=[],c={singular:[],plural:[]},e;b=b||{graphic:1,dataLabel:1};b.graphic&&d.push("graphic","upperGraphic","shadowGroup");b.dataLabel&&d.push("dataLabel","dataLabelUpper","connector");for(e=d.length;e--;){var g=d[e];a[g]&&
c.singular.push(g)}["dataLabel","connector"].forEach(function(d){var e=d+"s";b[d]&&a[e]&&c.plural.push(e)});return c};g.prototype.getLabelConfig=function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}};g.prototype.getNestedProperty=function(b){if(b)return 0===b.indexOf("custom.")?h(b,this.options):this[b]};g.prototype.getZone=function(){var b=this.series,
a=b.zones;b=b.zoneAxis||"y";var c,e=0;for(c=a[e];this[b]>=c.value;)c=a[++e];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=c&&c.color&&!this.options.color?c.color:this.nonZonedColor;return c};g.prototype.hasNewShapeType=function(){return(this.graphic&&(this.graphic.symbolName||this.graphic.element.nodeName))!==this.shapeType};g.prototype.init=function(a,e,g){this.series=a;this.applyOptions(e,g);this.id=n(this.id)?this.id:b();this.resolveColor();a.chart.pointCount++;c(this,"afterInit");
return this};g.prototype.optionsToObject=function(b){var a=this.series,d=a.options.keys,c=d||a.pointArrayMap||["y"],e=c.length,l={},r=0,h=0;if(p(b)||null===b)l[c[0]]=b;else if(f(b))for(!d&&b.length>e&&(a=typeof b[0],"string"===a?l.name=b[0]:"number"===a&&(l.x=b[0]),r++);h<e;)d&&"undefined"===typeof b[r]||(0<c[h].indexOf(".")?g.prototype.setNestedProperty(l,b[r],c[h]):l[c[h]]=b[r]),r++,h++;else"object"===typeof b&&(l=b,b.dataLabels&&(a._hasPointLabels=!0),b.marker&&(a._hasPointMarkers=!0));return l};
g.prototype.resolveColor=function(){var b=this.series,a=b.chart.styledMode;var c=b.chart.options.chart.colorCount;delete this.nonZonedColor;if(b.options.colorByPoint){if(!a){c=b.options.colors||b.chart.options.colors;var e=c[b.colorCounter];c=c.length}a=b.colorCounter;b.colorCounter++;b.colorCounter===c&&(b.colorCounter=0)}else a||(e=b.color),a=b.colorIndex;this.colorIndex=C(this.options.colorIndex,a);this.color=C(this.options.color,e)};g.prototype.setNestedProperty=function(b,a,c){c.split(".").reduce(function(b,
d,c,e){b[d]=e.length-1===c?a:B(b[d],!0)?b[d]:{};return b[d]},b);return b};g.prototype.tooltipFormatter=function(b){var a=this.series,d=a.tooltipOptions,c=C(d.valueDecimals,""),e=d.valuePrefix||"",g=d.valueSuffix||"";a.chart.styledMode&&(b=a.chart.tooltip.styledModeFormat(b));(a.pointArrayMap||["y"]).forEach(function(a){a="{point."+a;if(e||g)b=b.replace(RegExp(a+"}","g"),e+a+"}"+g);b=b.replace(RegExp(a+"}","g"),a+":,."+c+"f}")});return A(b,{point:this,series:this.series},a.chart)};g.prototype.update=
function(b,a,c,e){function d(){g.applyOptions(b);var d=m&&g.hasDummyGraphic;d=null===g.y?!d:d;m&&d&&(g.graphic=m.destroy(),delete g.hasDummyGraphic);B(b,!0)&&(m&&m.element&&b&&b.marker&&"undefined"!==typeof b.marker.symbol&&(g.graphic=m.destroy()),b&&b.dataLabels&&g.dataLabel&&(g.dataLabel=g.dataLabel.destroy()),g.connector&&(g.connector=g.connector.destroy()));h=g.index;l.updateParallelArrays(g,h);r.data[h]=B(r.data[h],!0)||B(b,!0)?g.options:C(b,r.data[h]);l.isDirty=l.isDirtyData=!0;!l.fixedBox&&
l.hasCartesianSeries&&(f.isDirtyBox=!0);"point"===r.legendType&&(f.isDirtyLegend=!0);a&&f.redraw(c)}var g=this,l=g.series,m=g.graphic,f=l.chart,r=l.options,h;a=C(a,!0);!1===e?d():g.firePointEvent("update",{options:b},d)};g.prototype.remove=function(b,a){this.series.removePoint(this.series.data.indexOf(this),b,a)};g.prototype.select=function(b,a){var d=this,c=d.series,e=c.chart;this.selectedStaging=b=C(b,!d.selected);d.firePointEvent(b?"select":"unselect",{accumulate:a},function(){d.selected=d.options.selected=
b;c.options.data[c.data.indexOf(d)]=d.options;d.setState(b&&"select");a||e.getSelectedPoints().forEach(function(b){var a=b.series;b.selected&&b!==d&&(b.selected=b.options.selected=!1,a.options.data[a.data.indexOf(b)]=b.options,b.setState(e.hoverPoints&&a.options.inactiveOtherPoints?"inactive":""),b.firePointEvent("unselect"))})});delete this.selectedStaging};g.prototype.onMouseOver=function(b){var a=this.series.chart,d=a.pointer;b=b?d.normalize(b):d.getChartCoordinatesFromPoint(this,a.inverted);d.runPointActions(b,
this)};g.prototype.onMouseOut=function(){var b=this.series.chart;this.firePointEvent("mouseOut");this.series.options.inactiveOtherPoints||(b.hoverPoints||[]).forEach(function(b){b.setState()});b.hoverPoints=b.hoverPoint=null};g.prototype.importEvents=function(){if(!this.hasImportedEvents){var b=this,a=t(b.series.options.point,b.options).events;b.events=a;J(a,function(a,d){w(a)&&q(b,d,a)});this.hasImportedEvents=!0}};g.prototype.setState=function(b,g){var d=this.series,l=this.state,m=d.options.states[b||
"normal"]||{},f=H.plotOptions[d.type].marker&&d.options.marker,r=f&&!1===f.enabled,h=f&&f.states&&f.states[b||"normal"]||{},k=!1===h.enabled,n=this.marker||{},t=d.chart,q=f&&d.markerAttribs,w=d.halo,B,v=d.stateMarkerGraphic;b=b||"";if(!(b===this.state&&!g||this.selected&&"select"!==b||!1===m.enabled||b&&(k||r&&!1===h.enabled)||b&&n.states&&n.states[b]&&!1===n.states[b].enabled)){this.state=b;q&&(B=d.markerAttribs(this,b));if(this.graphic&&!this.hasDummyGraphic){l&&this.graphic.removeClass("highcharts-point-"+
l);b&&this.graphic.addClass("highcharts-point-"+b);if(!t.styledMode){var J=d.pointAttribs(this,b);var E=C(t.options.chart.animation,m.animation);d.options.inactiveOtherPoints&&p(J.opacity)&&((this.dataLabels||[]).forEach(function(b){b&&b.animate({opacity:J.opacity},E)}),this.connector&&this.connector.animate({opacity:J.opacity},E));this.graphic.animate(J,E)}B&&this.graphic.animate(B,C(t.options.chart.animation,h.animation,f.animation));v&&v.hide()}else{if(b&&h){l=n.symbol||d.symbol;v&&v.currentSymbol!==
l&&(v=v.destroy());if(B)if(v)v[g?"animate":"attr"]({x:B.x,y:B.y});else l&&(d.stateMarkerGraphic=v=t.renderer.symbol(l,B.x,B.y,B.width,B.height).add(d.markerGroup),v.currentSymbol=l);!t.styledMode&&v&&"inactive"!==this.state&&v.attr(d.pointAttribs(this,b))}v&&(v[b&&this.isInside?"show":"hide"](),v.element.point=this,v.addClass(this.getClassName(),!0))}m=m.halo;B=(v=this.graphic||v)&&v.visibility||"inherit";m&&m.size&&v&&"hidden"!==B&&!this.isCluster?(w||(d.halo=w=t.renderer.path().add(v.parentGroup)),
w.show()[g?"animate":"attr"]({d:this.haloPath(m.size)}),w.attr({"class":"highcharts-halo highcharts-color-"+C(this.colorIndex,d.colorIndex)+(this.className?" "+this.className:""),visibility:B,zIndex:-1}),w.point=this,t.styledMode||w.attr(e({fill:this.color||d.color,"fill-opacity":m.opacity},a.filterUserAttributes(m.attributes||{})))):w&&w.point&&w.point.haloPath&&w.animate({d:w.point.haloPath(0)},null,w.hide);c(this,"afterSetState",{state:b})}};g.prototype.haloPath=function(b){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-
b,this.plotY-b,2*b,2*b)};return g}();"";return u});M(a,"Core/Pointer.js",[a["Core/Color/Color.js"],a["Core/Globals.js"],a["Core/Tooltip.js"],a["Core/Utilities.js"]],function(a,u,z,F){var v=a.parse,G=u.charts,H=u.noop,A=F.addEvent,q=F.attr,n=F.css,k=F.defined,e=F.extend,c=F.find,h=F.fireEvent,f=F.isNumber,w=F.isObject,p=F.objectEach,B=F.offset,t=F.pick,J=F.splat;a=function(){function a(a,c){this.lastValidTouch={};this.pinchDown=[];this.runChartClick=!1;this.eventsToUnbind=[];this.chart=a;this.hasDragged=
!1;this.options=c;this.init(a,c)}a.prototype.applyInactiveState=function(a){var c=[],b;(a||[]).forEach(function(a){b=a.series;c.push(b);b.linkedParent&&c.push(b.linkedParent);b.linkedSeries&&(c=c.concat(b.linkedSeries));b.navigatorSeries&&c.push(b.navigatorSeries)});this.chart.series.forEach(function(b){-1===c.indexOf(b)?b.setState("inactive",!0):b.options.inactiveOtherPoints&&b.setAllPointsToState("inactive")})};a.prototype.destroy=function(){var c=this;this.eventsToUnbind.forEach(function(a){return a()});
this.eventsToUnbind=[];u.chartCount||(a.unbindDocumentMouseUp&&(a.unbindDocumentMouseUp=a.unbindDocumentMouseUp()),a.unbindDocumentTouchEnd&&(a.unbindDocumentTouchEnd=a.unbindDocumentTouchEnd()));clearInterval(c.tooltipTimeout);p(c,function(a,b){c[b]=void 0})};a.prototype.drag=function(a){var c=this.chart,b=c.options.chart,e=this.zoomHor,d=this.zoomVert,m=c.plotLeft,f=c.plotTop,h=c.plotWidth,r=c.plotHeight,k=this.mouseDownX||0,p=this.mouseDownY||0,n=w(b.panning)?b.panning&&b.panning.enabled:b.panning,
t=b.panKey&&a[b.panKey+"Key"],q=a.chartX,B=a.chartY,C=this.selectionMarker;if(!C||!C.touch)if(q<m?q=m:q>m+h&&(q=m+h),B<f?B=f:B>f+r&&(B=f+r),this.hasDragged=Math.sqrt(Math.pow(k-q,2)+Math.pow(p-B,2)),10<this.hasDragged){var J=c.isInsidePlot(k-m,p-f,{visiblePlotOnly:!0});!c.hasCartesianSeries&&!c.mapView||!this.zoomX&&!this.zoomY||!J||t||C||(this.selectionMarker=C=c.renderer.rect(m,f,e?1:h,d?1:r,0).attr({"class":"highcharts-selection-marker",zIndex:7}).add(),c.styledMode||C.attr({fill:b.selectionMarkerFill||
v("#335cad").setOpacity(.25).get()}));C&&e&&(e=q-k,C.attr({width:Math.abs(e),x:(0<e?0:e)+k}));C&&d&&(e=B-p,C.attr({height:Math.abs(e),y:(0<e?0:e)+p}));J&&!C&&n&&c.pan(a,b.panning)}};a.prototype.dragStart=function(a){var c=this.chart;c.mouseIsDown=a.type;c.cancelClick=!1;c.mouseDownX=this.mouseDownX=a.chartX;c.mouseDownY=this.mouseDownY=a.chartY};a.prototype.drop=function(a){var c=this,b=this.chart,g=this.hasPinched;if(this.selectionMarker){var d=this.selectionMarker,m=d.attr?d.attr("x"):d.x,r=d.attr?
d.attr("y"):d.y,p=d.attr?d.attr("width"):d.width,t=d.attr?d.attr("height"):d.height,q={originalEvent:a,xAxis:[],yAxis:[],x:m,y:r,width:p,height:t},B=!!b.mapView;if(this.hasDragged||g)b.axes.forEach(function(b){if(b.zoomEnabled&&k(b.min)&&(g||c[{xAxis:"zoomX",yAxis:"zoomY"}[b.coll]])&&f(m)&&f(r)){var d=b.horiz,e="touchend"===a.type?b.minPixelPadding:0,l=b.toValue((d?m:r)+e);d=b.toValue((d?m+p:r+t)-e);q[b.coll].push({axis:b,min:Math.min(l,d),max:Math.max(l,d)});B=!0}}),B&&h(b,"selection",q,function(a){b.zoom(e(a,
g?{animation:!1}:null))});f(b.index)&&(this.selectionMarker=this.selectionMarker.destroy());g&&this.scaleGroups()}b&&f(b.index)&&(n(b.container,{cursor:b._cursor}),b.cancelClick=10<this.hasDragged,b.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])};a.prototype.findNearestKDPoint=function(a,c,b){var e=this.chart,d=e.hoverPoint;e=e.tooltip;if(d&&e&&e.isStickyOnContact())return d;var l;a.forEach(function(a){var d=!(a.noSharedTooltip&&c)&&0>a.options.findNearestPointBy.indexOf("y");a=
a.searchPoint(b,d);if((d=w(a,!0)&&a.series)&&!(d=!w(l,!0))){d=l.distX-a.distX;var e=l.dist-a.dist,g=(a.series.group&&a.series.group.zIndex)-(l.series.group&&l.series.group.zIndex);d=0<(0!==d&&c?d:0!==e?e:0!==g?g:l.series.index>a.series.index?-1:1)}d&&(l=a)});return l};a.prototype.getChartCoordinatesFromPoint=function(a,c){var b=a.series,e=b.xAxis;b=b.yAxis;var d=a.shapeArgs;if(e&&b){var l=t(a.clientX,a.plotX),h=a.plotY||0;a.isNode&&d&&f(d.x)&&f(d.y)&&(l=d.x,h=d.y);return c?{chartX:b.len+b.pos-h,chartY:e.len+
e.pos-l}:{chartX:l+e.pos,chartY:h+b.pos}}if(d&&d.x&&d.y)return{chartX:d.x,chartY:d.y}};a.prototype.getChartPosition=function(){if(this.chartPosition)return this.chartPosition;var a=this.chart.container,c=B(a);this.chartPosition={left:c.left,top:c.top,scaleX:1,scaleY:1};var b=a.offsetWidth;a=a.offsetHeight;2<b&&2<a&&(this.chartPosition.scaleX=c.width/b,this.chartPosition.scaleY=c.height/a);return this.chartPosition};a.prototype.getCoordinates=function(a){var c={xAxis:[],yAxis:[]};this.chart.axes.forEach(function(b){c[b.isXAxis?
"xAxis":"yAxis"].push({axis:b,value:b.toValue(a[b.horiz?"chartX":"chartY"])})});return c};a.prototype.getHoverData=function(a,e,b,g,d,m){var l=[];g=!(!g||!a);var f={chartX:m?m.chartX:void 0,chartY:m?m.chartY:void 0,shared:d};h(this,"beforeGetHoverData",f);var r=e&&!e.stickyTracking?[e]:b.filter(function(b){return f.filter?f.filter(b):b.visible&&!(!d&&b.directTouch)&&t(b.options.enableMouseTracking,!0)&&b.stickyTracking});var k=g||!m?a:this.findNearestKDPoint(r,d,m);e=k&&k.series;k&&(d&&!e.noSharedTooltip?
(r=b.filter(function(b){return f.filter?f.filter(b):b.visible&&!(!d&&b.directTouch)&&t(b.options.enableMouseTracking,!0)&&!b.noSharedTooltip}),r.forEach(function(b){var a=c(b.points,function(b){return b.x===k.x&&!b.isNull});w(a)&&(b.chart.isBoosting&&(a=b.getPoint(a)),l.push(a))})):l.push(k));f={hoverPoint:k};h(this,"afterGetHoverData",f);return{hoverPoint:f.hoverPoint,hoverSeries:e,hoverPoints:l}};a.prototype.getPointFromEvent=function(a){a=a.target;for(var c;a&&!c;)c=a.point,a=a.parentNode;return c};
a.prototype.onTrackerMouseOut=function(a){a=a.relatedTarget||a.toElement;var c=this.chart.hoverSeries;this.isDirectTouch=!1;if(!(!c||!a||c.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+c.index)&&this.inClass(a,"highcharts-tracker")))c.onMouseOut()};a.prototype.inClass=function(a,c){for(var b;a;){if(b=q(a,"class")){if(-1!==b.indexOf(c))return!0;if(-1!==b.indexOf("highcharts-container"))return!1}a=a.parentNode}};a.prototype.init=function(a,c){this.options=
c;this.chart=a;this.runChartClick=!(!c.chart.events||!c.chart.events.click);this.pinchDown=[];this.lastValidTouch={};z&&(a.tooltip=new z(a,c.tooltip),this.followTouchMove=t(c.tooltip.followTouchMove,!0));this.setDOMEvents()};a.prototype.normalize=function(a,c){var b=a.touches,g=b?b.length?b.item(0):t(b.changedTouches,a.changedTouches)[0]:a;c||(c=this.getChartPosition());b=g.pageX-c.left;g=g.pageY-c.top;b/=c.scaleX;g/=c.scaleY;return e(a,{chartX:Math.round(b),chartY:Math.round(g)})};a.prototype.onContainerClick=
function(a){var c=this.chart,b=c.hoverPoint;a=this.normalize(a);var g=c.plotLeft,d=c.plotTop;c.cancelClick||(b&&this.inClass(a.target,"highcharts-tracker")?(h(b.series,"click",e(a,{point:b})),c.hoverPoint&&b.firePointEvent("click",a)):(e(a,this.getCoordinates(a)),c.isInsidePlot(a.chartX-g,a.chartY-d,{visiblePlotOnly:!0})&&h(c,"click",a)))};a.prototype.onContainerMouseDown=function(a){var c=1===((a.buttons||a.button)&1);a=this.normalize(a);if(u.isFirefox&&0!==a.button)this.onContainerMouseMove(a);
if("undefined"===typeof a.button||c)this.zoomOption(a),c&&a.preventDefault&&a.preventDefault(),this.dragStart(a)};a.prototype.onContainerMouseLeave=function(c){var e=G[t(a.hoverChartIndex,-1)],b=this.chart.tooltip;b&&b.shouldStickOnContact()&&this.inClass(c.relatedTarget,"highcharts-tooltip-container")||(c=this.normalize(c),e&&(c.relatedTarget||c.toElement)&&(e.pointer.reset(),e.pointer.chartPosition=void 0),b&&!b.isHidden&&this.reset())};a.prototype.onContainerMouseEnter=function(a){delete this.chartPosition};
a.prototype.onContainerMouseMove=function(a){var c=this.chart;a=this.normalize(a);this.setHoverChartIndex();a.preventDefault||(a.returnValue=!1);("mousedown"===c.mouseIsDown||this.touchSelect(a))&&this.drag(a);c.openMenu||!this.inClass(a.target,"highcharts-tracker")&&!c.isInsidePlot(a.chartX-c.plotLeft,a.chartY-c.plotTop,{visiblePlotOnly:!0})||(this.inClass(a.target,"highcharts-no-tooltip")?this.reset(!1,0):this.runPointActions(a))};a.prototype.onDocumentTouchEnd=function(c){var e=G[t(a.hoverChartIndex,
-1)];e&&e.pointer.drop(c)};a.prototype.onContainerTouchMove=function(a){if(this.touchSelect(a))this.onContainerMouseMove(a);else this.touch(a)};a.prototype.onContainerTouchStart=function(a){if(this.touchSelect(a))this.onContainerMouseDown(a);else this.zoomOption(a),this.touch(a,!0)};a.prototype.onDocumentMouseMove=function(a){var c=this.chart,b=this.chartPosition;a=this.normalize(a,b);var e=c.tooltip;!b||e&&e.isStickyOnContact()||c.isInsidePlot(a.chartX-c.plotLeft,a.chartY-c.plotTop,{visiblePlotOnly:!0})||
this.inClass(a.target,"highcharts-tracker")||this.reset()};a.prototype.onDocumentMouseUp=function(c){var e=G[t(a.hoverChartIndex,-1)];e&&e.pointer.drop(c)};a.prototype.pinch=function(a){var c=this,b=c.chart,g=c.pinchDown,d=a.touches||[],m=d.length,f=c.lastValidTouch,k=c.hasZoom,p={},r=1===m&&(c.inClass(a.target,"highcharts-tracker")&&b.runTrackerClick||c.runChartClick),n={},q=c.selectionMarker;1<m?c.initiated=!0:1===m&&this.followTouchMove&&(c.initiated=!1);k&&c.initiated&&!r&&!1!==a.cancelable&&
a.preventDefault();[].map.call(d,function(b){return c.normalize(b)});"touchstart"===a.type?([].forEach.call(d,function(b,a){g[a]={chartX:b.chartX,chartY:b.chartY}}),f.x=[g[0].chartX,g[1]&&g[1].chartX],f.y=[g[0].chartY,g[1]&&g[1].chartY],b.axes.forEach(function(a){if(a.zoomEnabled){var d=b.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,e=a.toPixels(Math.min(t(a.options.min,a.dataMin),a.dataMin)),g=a.toPixels(Math.max(t(a.options.max,a.dataMax),a.dataMax)),m=Math.max(e,g);d.min=Math.min(a.pos,Math.min(e,
g)-c);d.max=Math.max(a.pos+a.len,m+c)}}),c.res=!0):c.followTouchMove&&1===m?this.runPointActions(c.normalize(a)):g.length&&(h(b,"touchpan",{originalEvent:a},function(){q||(c.selectionMarker=q=e({destroy:H,touch:!0},b.plotBox));c.pinchTranslate(g,d,p,q,n,f);c.hasPinched=k;c.scaleGroups(p,n)}),c.res&&(c.res=!1,this.reset(!1,0)))};a.prototype.pinchTranslate=function(a,c,b,e,d,m){this.zoomHor&&this.pinchTranslateDirection(!0,a,c,b,e,d,m);this.zoomVert&&this.pinchTranslateDirection(!1,a,c,b,e,d,m)};a.prototype.pinchTranslateDirection=
function(a,c,b,e,d,m,f,h){var g=this.chart,l=a?"x":"y",k=a?"X":"Y",p="chart"+k,r=a?"width":"height",n=g["plot"+(a?"Left":"Top")],t=g.inverted,x=g.bounds[a?"h":"v"],q=1===c.length,D=c[0][p],B=!q&&c[1][p];c=function(){"number"===typeof v&&20<Math.abs(D-B)&&(C=h||Math.abs(N-v)/Math.abs(D-B));E=(n-N)/C+D;w=g["plot"+(a?"Width":"Height")]/C};var w,E,C=h||1,N=b[0][p],v=!q&&b[1][p];c();b=E;if(b<x.min){b=x.min;var J=!0}else b+w>x.max&&(b=x.max-w,J=!0);J?(N-=.8*(N-f[l][0]),"number"===typeof v&&(v-=.8*(v-f[l][1])),
c()):f[l]=[N,v];t||(m[l]=E-n,m[r]=w);m=t?1/C:C;d[r]=w;d[l]=b;e[t?a?"scaleY":"scaleX":"scale"+k]=C;e["translate"+k]=m*n+(N-m*D)};a.prototype.reset=function(a,c){var b=this.chart,e=b.hoverSeries,d=b.hoverPoint,m=b.hoverPoints,f=b.tooltip,l=f&&f.shared?m:d;a&&l&&J(l).forEach(function(b){b.series.isCartesian&&"undefined"===typeof b.plotX&&(a=!1)});if(a)f&&l&&J(l).length&&(f.refresh(l),f.shared&&m?m.forEach(function(b){b.setState(b.state,!0);b.series.isCartesian&&(b.series.xAxis.crosshair&&b.series.xAxis.drawCrosshair(null,
b),b.series.yAxis.crosshair&&b.series.yAxis.drawCrosshair(null,b))}):d&&(d.setState(d.state,!0),b.axes.forEach(function(b){b.crosshair&&d.series[b.coll]===b&&b.drawCrosshair(null,d)})));else{if(d)d.onMouseOut();m&&m.forEach(function(b){b.setState()});if(e)e.onMouseOut();f&&f.hide(c);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());b.axes.forEach(function(b){b.hideCrosshair()});this.hoverX=b.hoverPoints=b.hoverPoint=null}};a.prototype.runPointActions=function(e,f){var b=this.chart,
g=b.tooltip&&b.tooltip.options.enabled?b.tooltip:void 0,d=g?g.shared:!1,m=f||b.hoverPoint,l=m&&m.series||b.hoverSeries;f=this.getHoverData(m,l,b.series,(!e||"touchmove"!==e.type)&&(!!f||l&&l.directTouch&&this.isDirectTouch),d,e);m=f.hoverPoint;l=f.hoverSeries;var h=f.hoverPoints;f=l&&l.tooltipOptions.followPointer&&!l.tooltipOptions.split;d=d&&l&&!l.noSharedTooltip;if(m&&(m!==b.hoverPoint||g&&g.isHidden)){(b.hoverPoints||[]).forEach(function(b){-1===h.indexOf(b)&&b.setState()});if(b.hoverSeries!==
l)l.onMouseOver();this.applyInactiveState(h);(h||[]).forEach(function(b){b.setState("hover")});b.hoverPoint&&b.hoverPoint.firePointEvent("mouseOut");if(!m.series)return;b.hoverPoints=h;b.hoverPoint=m;m.firePointEvent("mouseOver");g&&g.refresh(d?h:m,e)}else f&&g&&!g.isHidden&&(m=g.getAnchor([{}],e),b.isInsidePlot(m[0],m[1],{visiblePlotOnly:!0})&&g.updatePosition({plotX:m[0],plotY:m[1]}));this.unDocMouseMove||(this.unDocMouseMove=A(b.container.ownerDocument,"mousemove",function(b){var d=G[a.hoverChartIndex];
if(d)d.pointer.onDocumentMouseMove(b)}),this.eventsToUnbind.push(this.unDocMouseMove));b.axes.forEach(function(a){var d=t((a.crosshair||{}).snap,!0),g;d&&((g=b.hoverPoint)&&g.series[a.coll]===a||(g=c(h,function(b){return b.series[a.coll]===a})));g||!d?a.drawCrosshair(e,g):a.hideCrosshair()})};a.prototype.scaleGroups=function(a,c){var b=this.chart;b.series.forEach(function(e){var d=a||e.getPlotBox();e.group&&(e.xAxis&&e.xAxis.zoomEnabled||b.mapView)&&(e.group.attr(d),e.markerGroup&&(e.markerGroup.attr(d),
e.markerGroup.clip(c?b.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d))});b.clipRect.attr(c||b.clipBox)};a.prototype.setDOMEvents=function(){var c=this,e=this.chart.container,b=e.ownerDocument;e.onmousedown=this.onContainerMouseDown.bind(this);e.onmousemove=this.onContainerMouseMove.bind(this);e.onclick=this.onContainerClick.bind(this);this.eventsToUnbind.push(A(e,"mouseenter",this.onContainerMouseEnter.bind(this)));this.eventsToUnbind.push(A(e,"mouseleave",this.onContainerMouseLeave.bind(this)));
a.unbindDocumentMouseUp||(a.unbindDocumentMouseUp=A(b,"mouseup",this.onDocumentMouseUp.bind(this)));for(var g=this.chart.renderTo.parentElement;g&&"BODY"!==g.tagName;)this.eventsToUnbind.push(A(g,"scroll",function(){delete c.chartPosition})),g=g.parentElement;u.hasTouch&&(this.eventsToUnbind.push(A(e,"touchstart",this.onContainerTouchStart.bind(this),{passive:!1})),this.eventsToUnbind.push(A(e,"touchmove",this.onContainerTouchMove.bind(this),{passive:!1})),a.unbindDocumentTouchEnd||(a.unbindDocumentTouchEnd=
A(b,"touchend",this.onDocumentTouchEnd.bind(this),{passive:!1})))};a.prototype.setHoverChartIndex=function(){var c=this.chart,e=u.charts[t(a.hoverChartIndex,-1)];if(e&&e!==c)e.pointer.onContainerMouseLeave({relatedTarget:!0});e&&e.mouseIsDown||(a.hoverChartIndex=c.index)};a.prototype.touch=function(a,c){var b=this.chart,e;this.setHoverChartIndex();if(1===a.touches.length)if(a=this.normalize(a),(e=b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop,{visiblePlotOnly:!0}))&&!b.openMenu){c&&this.runPointActions(a);
if("touchmove"===a.type){c=this.pinchDown;var d=c[0]?4<=Math.sqrt(Math.pow(c[0].chartX-a.chartX,2)+Math.pow(c[0].chartY-a.chartY,2)):!1}t(d,!0)&&this.pinch(a)}else c&&this.reset();else 2===a.touches.length&&this.pinch(a)};a.prototype.touchSelect=function(a){return!(!this.chart.options.chart.zoomBySingleTouch||!a.touches||1!==a.touches.length)};a.prototype.zoomOption=function(a){var c=this.chart,b=c.options.chart;c=c.inverted;var e=b.zoomType||"";/touch/.test(a.type)&&(e=t(b.pinchType,e));this.zoomX=
a=/x/.test(e);this.zoomY=b=/y/.test(e);this.zoomHor=a&&!c||b&&c;this.zoomVert=b&&!c||a&&c;this.hasZoom=a||b};return a}();"";return a});M(a,"Core/MSPointer.js",[a["Core/Globals.js"],a["Core/Pointer.js"],a["Core/Utilities.js"]],function(a,u,z){function v(){var a=[];a.item=function(a){return this[a]};c(f,function(c){a.push({pageX:c.pageX,pageY:c.pageY,target:c.target})});return a}function y(a,c,e,f){var h=H[u.hoverChartIndex||NaN];"touch"!==a.pointerType&&a.pointerType!==a.MSPOINTER_TYPE_TOUCH||!h||
(h=h.pointer,f(a),h[c]({type:e,target:a.currentTarget,preventDefault:q,touches:v()}))}var G=this&&this.__extends||function(){var a=function(c,e){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&(a[e]=c[e])};return a(c,e)};return function(c,e){function f(){this.constructor=c}a(c,e);c.prototype=null===e?Object.create(e):(f.prototype=e.prototype,new f)}}(),H=a.charts,A=a.doc,q=a.noop,n=a.win,k=z.addEvent,e=z.css,
c=z.objectEach,h=z.removeEvent,f={},w=!!n.PointerEvent;return function(c){function p(){return null!==c&&c.apply(this,arguments)||this}G(p,c);p.isRequired=function(){return!(a.hasTouch||!n.PointerEvent&&!n.MSPointerEvent)};p.prototype.batchMSEvents=function(a){a(this.chart.container,w?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,w?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(A,w?"pointerup":"MSPointerUp",this.onDocumentPointerUp)};p.prototype.destroy=
function(){this.batchMSEvents(h);c.prototype.destroy.call(this)};p.prototype.init=function(a,f){c.prototype.init.call(this,a,f);this.hasZoom&&e(a.container,{"-ms-touch-action":"none","touch-action":"none"})};p.prototype.onContainerPointerDown=function(a){y(a,"onContainerTouchStart","touchstart",function(a){f[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})};p.prototype.onContainerPointerMove=function(a){y(a,"onContainerTouchMove","touchmove",function(a){f[a.pointerId]={pageX:a.pageX,
pageY:a.pageY};f[a.pointerId].target||(f[a.pointerId].target=a.currentTarget)})};p.prototype.onDocumentPointerUp=function(a){y(a,"onDocumentTouchEnd","touchend",function(a){delete f[a.pointerId]})};p.prototype.setDOMEvents=function(){c.prototype.setDOMEvents.call(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(k)};return p}(u)});M(a,"Core/Legend/Legend.js",[a["Core/Animation/AnimationUtilities.js"],a["Core/FormatUtilities.js"],a["Core/Globals.js"],a["Core/Series/Point.js"],a["Core/Renderer/RendererUtilities.js"],
a["Core/Utilities.js"]],function(a,u,z,F,y,G){var v=a.animObject,A=a.setAnimation,q=u.format;a=z.isFirefox;var n=z.marginNames;z=z.win;var k=y.distribute,e=G.addEvent,c=G.createElement,h=G.css,f=G.defined,w=G.discardElement,p=G.find,B=G.fireEvent,t=G.isNumber,J=G.merge,C=G.pick,r=G.relativeLength,l=G.stableSort,b=G.syncTimeout;y=G.wrap;G=function(){function a(b,a){this.allItems=[];this.contentGroup=this.box=void 0;this.display=!1;this.group=void 0;this.offsetWidth=this.maxLegendWidth=this.maxItemWidth=
this.legendWidth=this.legendHeight=this.lastLineHeight=this.lastItemY=this.itemY=this.itemX=this.itemMarginTop=this.itemMarginBottom=this.itemHeight=this.initialItemY=0;this.options={};this.padding=0;this.pages=[];this.proximate=!1;this.scrollGroup=void 0;this.widthOption=this.totalItemWidth=this.titleHeight=this.symbolWidth=this.symbolHeight=0;this.chart=b;this.init(b,a)}a.prototype.init=function(b,a){this.chart=b;this.setOptions(a);a.enabled&&(this.render(),e(this.chart,"endResize",function(){this.legend.positionCheckboxes()}),
this.proximate?this.unchartrender=e(this.chart,"render",function(){this.legend.proximatePositions();this.legend.positionItems()}):this.unchartrender&&this.unchartrender())};a.prototype.setOptions=function(b){var a=C(b.padding,8);this.options=b;this.chart.styledMode||(this.itemStyle=b.itemStyle,this.itemHiddenStyle=J(this.itemStyle,b.itemHiddenStyle));this.itemMarginTop=b.itemMarginTop||0;this.itemMarginBottom=b.itemMarginBottom||0;this.padding=a;this.initialItemY=a-5;this.symbolWidth=C(b.symbolWidth,
16);this.pages=[];this.proximate="proximate"===b.layout&&!this.chart.inverted;this.baseline=void 0};a.prototype.update=function(b,a){var c=this.chart;this.setOptions(J(!0,this.options,b));this.destroy();c.isDirtyLegend=c.isDirtyBox=!0;C(a,!0)&&c.redraw();B(this,"afterUpdate")};a.prototype.colorizeItem=function(b,a){b.legendGroup[a?"removeClass":"addClass"]("highcharts-legend-item-hidden");if(!this.chart.styledMode){var c=this.options,d=b.legendItem,e=b.legendLine,g=b.legendSymbol,f=this.itemHiddenStyle.color;
c=a?c.itemStyle.color:f;var m=a?b.color||f:f,h=b.options&&b.options.marker,l={fill:m};d&&d.css({fill:c,color:c});e&&e.attr({stroke:m});g&&(h&&g.isMarker&&(l=b.pointAttribs(),a||(l.stroke=l.fill=f)),g.attr(l))}B(this,"afterColorizeItem",{item:b,visible:a})};a.prototype.positionItems=function(){this.allItems.forEach(this.positionItem,this);this.chart.isResizing||this.positionCheckboxes()};a.prototype.positionItem=function(b){var a=this,c=this.options,d=c.symbolPadding,e=!c.rtl,g=b._legendItemPos;c=
g[0];g=g[1];var h=b.checkbox,l=b.legendGroup;l&&l.element&&(d={translateX:e?c:this.legendWidth-c-2*d-4,translateY:g},e=function(){B(a,"afterPositionItem",{item:b})},f(l.translateY)?l.animate(d,void 0,e):(l.attr(d),e()));h&&(h.x=c,h.y=g)};a.prototype.destroyItem=function(b){var a=b.checkbox;["legendItem","legendLine","legendSymbol","legendGroup"].forEach(function(a){b[a]&&(b[a]=b[a].destroy())});a&&w(b.checkbox)};a.prototype.destroy=function(){function b(b){this[b]&&(this[b]=this[b].destroy())}this.getAllItems().forEach(function(a){["legendItem",
"legendGroup"].forEach(b,a)});"clipRect up down pager nav box title group".split(" ").forEach(b,this);this.display=null};a.prototype.positionCheckboxes=function(){var b=this.group&&this.group.alignAttr,a=this.clipHeight||this.legendHeight,c=this.titleHeight;if(b){var e=b.translateY;this.allItems.forEach(function(d){var g=d.checkbox;if(g){var f=e+c+g.y+(this.scrollOffset||0)+3;h(g,{left:b.translateX+d.checkboxOffset+g.x-20+"px",top:f+"px",display:this.proximate||f>e-6&&f<e+a-6?"":"none"})}},this)}};
a.prototype.renderTitle=function(){var b=this.options,a=this.padding,c=b.title,e=0;c.text&&(this.title||(this.title=this.chart.renderer.label(c.text,a-3,a-4,null,null,null,b.useHTML,null,"legend-title").attr({zIndex:1}),this.chart.styledMode||this.title.css(c.style),this.title.add(this.group)),c.width||this.title.css({width:this.maxLegendWidth+"px"}),b=this.title.getBBox(),e=b.height,this.offsetWidth=b.width,this.contentGroup.attr({translateY:e}));this.titleHeight=e};a.prototype.setText=function(b){var a=
this.options;b.legendItem.attr({text:a.labelFormat?q(a.labelFormat,b,this.chart):a.labelFormatter.call(b)})};a.prototype.renderItem=function(b){var a=this.chart,c=a.renderer,d=this.options,e=this.symbolWidth,g=d.symbolPadding||0,f=this.itemStyle,h=this.itemHiddenStyle,l="horizontal"===d.layout?C(d.itemDistance,20):0,k=!d.rtl,p=!b.series,n=!p&&b.series.drawLegendSymbol?b.series:b,r=n.options,t=this.createCheckboxForItem&&r&&r.showCheckbox,q=d.useHTML,w=b.options.className,E=b.legendItem;r=e+g+l+(t?
20:0);E||(b.legendGroup=c.g("legend-item").addClass("highcharts-"+n.type+"-series highcharts-color-"+b.colorIndex+(w?" "+w:"")+(p?" highcharts-series-"+b.index:"")).attr({zIndex:1}).add(this.scrollGroup),b.legendItem=E=c.text("",k?e+g:-g,this.baseline||0,q),a.styledMode||E.css(J(b.visible?f:h)),E.attr({align:k?"left":"right",zIndex:2}).add(b.legendGroup),this.baseline||(this.fontMetrics=c.fontMetrics(a.styledMode?12:f.fontSize,E),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,E.attr("y",this.baseline),
this.symbolHeight=d.symbolHeight||this.fontMetrics.f,d.squareSymbol&&(this.symbolWidth=C(d.symbolWidth,Math.max(this.symbolHeight,16)),r=this.symbolWidth+g+l+(t?20:0),k&&E.attr("x",this.symbolWidth+g))),n.drawLegendSymbol(this,b),this.setItemEvents&&this.setItemEvents(b,E,q));t&&!b.checkbox&&this.createCheckboxForItem&&this.createCheckboxForItem(b);this.colorizeItem(b,b.visible);!a.styledMode&&f.width||E.css({width:(d.itemWidth||this.widthOption||a.spacingBox.width)-r+"px"});this.setText(b);a=E.getBBox();
c=this.fontMetrics&&this.fontMetrics.h||0;b.itemWidth=b.checkboxOffset=d.itemWidth||b.legendItemWidth||a.width+r;this.maxItemWidth=Math.max(this.maxItemWidth,b.itemWidth);this.totalItemWidth+=b.itemWidth;this.itemHeight=b.itemHeight=Math.round(b.legendItemHeight||(a.height>1.5*c?a.height:c))};a.prototype.layoutItem=function(b){var a=this.options,c=this.padding,d="horizontal"===a.layout,e=b.itemHeight,g=this.itemMarginBottom,f=this.itemMarginTop,h=d?C(a.itemDistance,20):0,l=this.maxLegendWidth;a=a.alignColumns&&
this.totalItemWidth>l?this.maxItemWidth:b.itemWidth;d&&this.itemX-c+a>l&&(this.itemX=c,this.lastLineHeight&&(this.itemY+=f+this.lastLineHeight+g),this.lastLineHeight=0);this.lastItemY=f+this.itemY+g;this.lastLineHeight=Math.max(e,this.lastLineHeight);b._legendItemPos=[this.itemX,this.itemY];d?this.itemX+=a:(this.itemY+=f+e+g,this.lastLineHeight=e);this.offsetWidth=this.widthOption||Math.max((d?this.itemX-c-(b.checkbox?0:h):a)+c,this.offsetWidth)};a.prototype.getAllItems=function(){var b=[];this.chart.series.forEach(function(a){var c=
a&&a.options;a&&C(c.showInLegend,f(c.linkedTo)?!1:void 0,!0)&&(b=b.concat(a.legendItems||("point"===c.legendType?a.data:a)))});B(this,"afterGetAllItems",{allItems:b});return b};a.prototype.getAlignment=function(){var b=this.options;return this.proximate?b.align.charAt(0)+"tv":b.floating?"":b.align.charAt(0)+b.verticalAlign.charAt(0)+b.layout.charAt(0)};a.prototype.adjustMargins=function(b,a){var c=this.chart,d=this.options,e=this.getAlignment();e&&[/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/].forEach(function(g,
h){g.test(e)&&!f(b[h])&&(c[n[h]]=Math.max(c[n[h]],c.legend[(h+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][h]*d[h%2?"x":"y"]+C(d.margin,12)+a[h]+(c.titleOffset[h]||0)))})};a.prototype.proximatePositions=function(){var b=this.chart,a=[],c="left"===this.options.align;this.allItems.forEach(function(d){var e;var g=c;if(d.yAxis){d.xAxis.options.reversed&&(g=!g);d.points&&(e=p(g?d.points:d.points.slice(0).reverse(),function(b){return t(b.plotY)}));g=this.itemMarginTop+d.legendItem.getBBox().height+this.itemMarginBottom;
var f=d.yAxis.top-b.plotTop;d.visible?(e=e?e.plotY:d.yAxis.height,e+=f-.3*g):e=f+d.yAxis.height;a.push({target:e,size:g,item:d})}},this);k(a,b.plotHeight).forEach(function(a){a.item._legendItemPos&&(a.item._legendItemPos[1]=b.plotTop-b.spacing[0]+a.pos)})};a.prototype.render=function(){var b=this.chart,a=b.renderer,c=this.options,e=this.padding,g=this.getAllItems(),f=this.group,h=this.box;this.itemX=e;this.itemY=this.initialItemY;this.lastItemY=this.offsetWidth=0;this.widthOption=r(c.width,b.spacingBox.width-
e);var k=b.spacingBox.width-2*e-c.x;-1<["rm","lm"].indexOf(this.getAlignment().substring(0,2))&&(k/=2);this.maxLegendWidth=this.widthOption||k;f||(this.group=f=a.g("legend").addClass(c.className||"").attr({zIndex:7}).add(),this.contentGroup=a.g().attr({zIndex:1}).add(f),this.scrollGroup=a.g().add(this.contentGroup));this.renderTitle();l(g,function(b,a){return(b.options&&b.options.legendIndex||0)-(a.options&&a.options.legendIndex||0)});c.reversed&&g.reverse();this.allItems=g;this.display=k=!!g.length;
this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;g.forEach(this.renderItem,this);g.forEach(this.layoutItem,this);g=(this.widthOption||this.offsetWidth)+e;var p=this.lastItemY+this.lastLineHeight+this.titleHeight;p=this.handleOverflow(p);p+=e;h||(this.box=h=a.rect().addClass("highcharts-legend-box").attr({r:c.borderRadius}).add(f),h.isNew=!0);b.styledMode||h.attr({stroke:c.borderColor,"stroke-width":c.borderWidth||0,fill:c.backgroundColor||"none"}).shadow(c.shadow);0<g&&
0<p&&(h[h.isNew?"attr":"animate"](h.crisp.call({},{x:0,y:0,width:g,height:p},h.strokeWidth())),h.isNew=!1);h[k?"show":"hide"]();b.styledMode&&"none"===f.getStyle("display")&&(g=p=0);this.legendWidth=g;this.legendHeight=p;k&&this.align();this.proximate||this.positionItems();B(this,"afterRender")};a.prototype.align=function(b){void 0===b&&(b=this.chart.spacingBox);var a=this.chart,c=this.options,d=b.y;/(lth|ct|rth)/.test(this.getAlignment())&&0<a.titleOffset[0]?d+=a.titleOffset[0]:/(lbh|cb|rbh)/.test(this.getAlignment())&&
0<a.titleOffset[2]&&(d-=a.titleOffset[2]);d!==b.y&&(b=J(b,{y:d}));this.group.align(J(c,{width:this.legendWidth,height:this.legendHeight,verticalAlign:this.proximate?"top":c.verticalAlign}),!0,b)};a.prototype.handleOverflow=function(b){var a=this,c=this.chart,d=c.renderer,e=this.options,g=e.y,f="top"===e.verticalAlign,h=this.padding,l=e.maxHeight,k=e.navigation,p=C(k.animation,!0),n=k.arrowSize||12,r=this.pages,t=this.allItems,q=function(b){"number"===typeof b?v.attr({height:b}):v&&(a.clipRect=v.destroy(),
a.contentGroup.clip());a.contentGroup.div&&(a.contentGroup.div.style.clip=b?"rect("+h+"px,9999px,"+(h+b)+"px,0)":"auto")},w=function(b){a[b]=d.circle(0,0,1.3*n).translate(n/2,n/2).add(N);c.styledMode||a[b].attr("fill","rgba(0,0,0,0.0001)");return a[b]},E,B;g=c.spacingBox.height+(f?-g:g)-h;var N=this.nav,v=this.clipRect;"horizontal"!==e.layout||"middle"===e.verticalAlign||e.floating||(g/=2);l&&(g=Math.min(g,l));r.length=0;b&&0<g&&b>g&&!1!==k.enabled?(this.clipHeight=E=Math.max(g-20-this.titleHeight-
h,0),this.currentPage=C(this.currentPage,1),this.fullHeight=b,t.forEach(function(b,a){var c=b._legendItemPos[1],d=Math.round(b.legendItem.getBBox().height),e=r.length;if(!e||c-r[e-1]>E&&(B||c)!==r[e-1])r.push(B||c),e++;b.pageIx=e-1;B&&(t[a-1].pageIx=e-1);a===t.length-1&&c+d-r[e-1]>E&&d<=E&&(r.push(c),b.pageIx=e);c!==B&&(B=c)}),v||(v=a.clipRect=d.clipRect(0,h,9999,0),a.contentGroup.clip(v)),q(E),N||(this.nav=N=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,n,n).add(N),w("upTracker").on("click",
function(){a.scroll(-1,p)}),this.pager=d.text("",15,10).addClass("highcharts-legend-navigation"),c.styledMode||this.pager.css(k.style),this.pager.add(N),this.down=d.symbol("triangle-down",0,0,n,n).add(N),w("downTracker").on("click",function(){a.scroll(1,p)})),a.scroll(0),b=g):N&&(q(),this.nav=N.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return b};a.prototype.scroll=function(a,c){var d=this,e=this.chart,g=this.pages,f=g.length,h=this.clipHeight,l=this.options.navigation,m=this.pager,
k=this.padding,p=this.currentPage+a;p>f&&(p=f);0<p&&("undefined"!==typeof c&&A(c,e),this.nav.attr({translateX:k,translateY:h+this.padding+7+this.titleHeight,visibility:"visible"}),[this.up,this.upTracker].forEach(function(b){b.attr({"class":1===p?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})}),m.attr({text:p+"/"+f}),[this.down,this.downTracker].forEach(function(b){b.attr({x:18+this.pager.getBBox().width,"class":p===f?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})},
this),e.styledMode||(this.up.attr({fill:1===p?l.inactiveColor:l.activeColor}),this.upTracker.css({cursor:1===p?"default":"pointer"}),this.down.attr({fill:p===f?l.inactiveColor:l.activeColor}),this.downTracker.css({cursor:p===f?"default":"pointer"})),this.scrollOffset=-g[p-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),this.currentPage=p,this.positionCheckboxes(),a=v(C(c,e.renderer.globalAnimation,!0)),b(function(){B(d,"afterScroll",{currentPage:p})},a.duration))};a.prototype.setItemEvents=
function(b,a,c){var d=this,e=d.chart.renderer.boxWrapper,g=b instanceof F,f="highcharts-legend-"+(g?"point":"series")+"-active",h=d.chart.styledMode,l=function(a){d.allItems.forEach(function(c){b!==c&&[c].concat(c.linkedSeries||[]).forEach(function(b){b.setState(a,!g)})})};(c?[a,b.legendSymbol]:[b.legendGroup]).forEach(function(c){if(c)c.on("mouseover",function(){b.visible&&l("inactive");b.setState("hover");b.visible&&e.addClass(f);h||a.css(d.options.itemHoverStyle)}).on("mouseout",function(){d.chart.styledMode||
a.css(J(b.visible?d.itemStyle:d.itemHiddenStyle));l("");e.removeClass(f);b.setState()}).on("click",function(a){var c=function(){b.setVisible&&b.setVisible();l(b.visible?"inactive":"")};e.removeClass(f);a={browserEvent:a};b.firePointEvent?b.firePointEvent("legendItemClick",a,c):B(b,"legendItemClick",a,c)})})};a.prototype.createCheckboxForItem=function(b){b.checkbox=c("input",{type:"checkbox",className:"highcharts-legend-checkbox",checked:b.selected,defaultChecked:b.selected},this.options.itemCheckboxStyle,
this.chart.container);e(b.checkbox,"click",function(a){B(b.series||b,"checkboxClick",{checked:a.target.checked,item:b},function(){b.select()})})};return a}();(/Trident\/7\.0/.test(z.navigator&&z.navigator.userAgent)||a)&&y(G.prototype,"positionItem",function(b,a){var c=this,d=function(){a._legendItemPos&&b.call(c,a)};d();c.bubbleLegend||setTimeout(d)});"";return G});M(a,"Core/Series/SeriesRegistry.js",[a["Core/Globals.js"],a["Core/DefaultOptions.js"],a["Core/Series/Point.js"],a["Core/Utilities.js"]],
function(a,u,z,F){var v=u.defaultOptions,G=F.error,H=F.extendClass,A=F.merge,q;(function(n){function k(a,c){var e=v.plotOptions||{},f=c.defaultOptions;c.prototype.pointClass||(c.prototype.pointClass=z);c.prototype.type=a;f&&(e[a]=f);n.seriesTypes[a]=c}n.seriesTypes=a.seriesTypes;n.getSeries=function(a,c){void 0===c&&(c={});var e=a.options.chart;e=c.type||e.type||e.defaultSeriesType||"";var f=n.seriesTypes[e];n||G(17,!0,a,{missingModuleFor:e});e=new f;"function"===typeof e.init&&e.init(a,c);return e};
n.registerSeriesType=k;n.seriesType=function(a,c,h,f,q){var e=v.plotOptions||{};c=c||"";e[a]=A(e[c],h);k(a,H(n.seriesTypes[c]||function(){},f));n.seriesTypes[a].prototype.type=a;q&&(n.seriesTypes[a].prototype.pointClass=H(z,q));return n.seriesTypes[a]}})(q||(q={}));return q});M(a,"Core/Chart/Chart.js",[a["Core/Animation/AnimationUtilities.js"],a["Core/Axis/Axis.js"],a["Core/FormatUtilities.js"],a["Core/Foundation.js"],a["Core/Globals.js"],a["Core/Legend/Legend.js"],a["Core/MSPointer.js"],a["Core/DefaultOptions.js"],
a["Core/Pointer.js"],a["Core/Renderer/RendererRegistry.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Renderer/SVG/SVGRenderer.js"],a["Core/Time.js"],a["Core/Utilities.js"],a["Core/Renderer/HTML/AST.js"]],function(a,u,z,F,y,G,H,A,q,n,k,e,c,h,f){var w=a.animate,p=a.animObject,B=a.setAnimation,t=z.numberFormat,v=F.registerEventOptions,C=y.charts,r=y.doc,l=y.marginNames,b=y.svg,g=y.win,d=A.defaultOptions,m=A.defaultTime,D=k.seriesTypes,x=h.addEvent,I=h.attr,P=h.cleanRecursively,S=h.createElement,O=
h.css,U=h.defined,Y=h.discardElement,L=h.erase,K=h.error,M=h.extend,da=h.find,Q=h.fireEvent,ea=h.getStyle,E=h.isArray,T=h.isNumber,N=h.isObject,V=h.isString,W=h.merge,X=h.objectEach,R=h.pick,fa=h.pInt,aa=h.relativeLength,ia=h.removeEvent,ha=h.splat,ba=h.syncTimeout,ka=h.uniqueKey;a=function(){function a(b,a,c){this.series=this.renderTo=this.renderer=this.pointer=this.pointCount=this.plotWidth=this.plotTop=this.plotLeft=this.plotHeight=this.plotBox=this.options=this.numberFormatter=this.margin=this.legend=
this.labelCollectors=this.isResizing=this.index=this.eventOptions=this.container=this.colorCounter=this.clipBox=this.chartWidth=this.chartHeight=this.bounds=this.axisOffset=this.axes=void 0;this.sharedClips={};this.yAxis=this.xAxis=this.userOptions=this.titleOffset=this.time=this.symbolCounter=this.spacingBox=this.spacing=void 0;this.getArgs(b,a,c)}a.chart=function(b,c,d){return new a(b,c,d)};a.prototype.getArgs=function(b,a,c){V(b)||b.nodeName?(this.renderTo=b,this.init(a,c)):this.init(b,a)};a.prototype.init=
function(b,a){var e=b.plotOptions||{};Q(this,"init",{args:arguments},function(){var g=W(d,b),f=g.chart;X(g.plotOptions,function(b,a){N(b)&&(b.tooltip=e[a]&&W(e[a].tooltip)||void 0)});g.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;this.userOptions=b;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=a;this.isResizing=0;this.options=g;this.axes=[];this.series=[];this.time=b.time&&Object.keys(b.time).length?new c(b.time):y.time;
this.numberFormatter=f.numberFormatter||t;this.styledMode=f.styledMode;this.hasCartesianSeries=f.showAxes;this.index=C.length;C.push(this);y.chartCount++;v(this,f);this.xAxis=[];this.yAxis=[];this.pointCount=this.colorCounter=this.symbolCounter=0;Q(this,"afterInit");this.firstRender()})};a.prototype.initSeries=function(b){var a=this.options.chart;a=b.type||a.type||a.defaultSeriesType;var c=D[a];c||K(17,!0,this,{missingModuleFor:a});a=new c;"function"===typeof a.init&&a.init(this,b);return a};a.prototype.setSeriesData=
function(){this.getSeriesOrderByLinks().forEach(function(b){b.points||b.data||!b.enabledDataSorting||b.setData(b.options.data,!1)})};a.prototype.getSeriesOrderByLinks=function(){return this.series.concat().sort(function(b,a){return b.linkedSeries.length||a.linkedSeries.length?a.linkedSeries.length-b.linkedSeries.length:0})};a.prototype.orderSeries=function(b){var a=this.series;b=b||0;for(var c=a.length;b<c;++b)a[b]&&(a[b].index=b,a[b].name=a[b].getName())};a.prototype.isInsidePlot=function(b,a,c){void 0===
c&&(c={});var d=this.inverted,e=this.plotBox,g=this.plotLeft,f=this.plotTop,h=this.scrollablePlotBox,l=0;var k=0;c.visiblePlotOnly&&this.scrollingContainer&&(k=this.scrollingContainer,l=k.scrollLeft,k=k.scrollTop);var m=c.series;e=c.visiblePlotOnly&&h||e;h=c.inverted?a:b;a=c.inverted?b:a;b={x:h,y:a,isInsidePlot:!0};if(!c.ignoreX){var p=m&&(d?m.yAxis:m.xAxis)||{pos:g,len:Infinity};h=c.paneCoordinates?p.pos+h:g+h;h>=Math.max(l+g,p.pos)&&h<=Math.min(l+g+e.width,p.pos+p.len)||(b.isInsidePlot=!1)}!c.ignoreY&&
b.isInsidePlot&&(d=m&&(d?m.xAxis:m.yAxis)||{pos:f,len:Infinity},c=c.paneCoordinates?d.pos+a:f+a,c>=Math.max(k+f,d.pos)&&c<=Math.min(k+f+e.height,d.pos+d.len)||(b.isInsidePlot=!1));Q(this,"afterIsInsidePlot",b);return b.isInsidePlot};a.prototype.redraw=function(b){Q(this,"beforeRedraw");var a=this.hasCartesianSeries?this.axes:this.colorAxis||[],c=this.series,d=this.pointer,e=this.legend,g=this.userOptions.legend,f=this.renderer,h=f.isHidden(),l=[],k=this.isDirtyBox,m=this.isDirtyLegend;this.setResponsive&&
this.setResponsive(!1);B(this.hasRendered?b:!1,this);h&&this.temporaryDisplay();this.layOutTitles();for(b=c.length;b--;){var p=c[b];if(p.options.stacking||p.options.centerInCategory){var n=!0;if(p.isDirty){var E=!0;break}}}if(E)for(b=c.length;b--;)p=c[b],p.options.stacking&&(p.isDirty=!0);c.forEach(function(b){b.isDirty&&("point"===b.options.legendType?("function"===typeof b.updateTotals&&b.updateTotals(),m=!0):g&&(g.labelFormatter||g.labelFormat)&&(m=!0));b.isDirtyData&&Q(b,"updatedData")});m&&e&&
e.options.enabled&&(e.render(),this.isDirtyLegend=!1);n&&this.getStacks();a.forEach(function(b){b.updateNames();b.setScale()});this.getMargins();a.forEach(function(b){b.isDirty&&(k=!0)});a.forEach(function(b){var a=b.min+","+b.max;b.extKey!==a&&(b.extKey=a,l.push(function(){Q(b,"afterSetExtremes",M(b.eventArgs,b.getExtremes()));delete b.eventArgs}));(k||n)&&b.redraw()});k&&this.drawChartBox();Q(this,"predraw");c.forEach(function(b){(k||b.isDirty)&&b.visible&&b.redraw();b.isDirtyData=!1});d&&d.reset(!0);
f.draw();Q(this,"redraw");Q(this,"render");h&&this.temporaryDisplay(!0);l.forEach(function(b){b.call()})};a.prototype.get=function(b){function a(a){return a.id===b||a.options&&a.options.id===b}for(var c=this.series,d=da(this.axes,a)||da(this.series,a),e=0;!d&&e<c.length;e++)d=da(c[e].points||[],a);return d};a.prototype.getAxes=function(){var b=this,a=this.options,c=a.xAxis=ha(a.xAxis||{});a=a.yAxis=ha(a.yAxis||{});Q(this,"getAxes");c.forEach(function(b,a){b.index=a;b.isX=!0});a.forEach(function(b,
a){b.index=a});c.concat(a).forEach(function(a){new u(b,a)});Q(this,"afterGetAxes")};a.prototype.getSelectedPoints=function(){return this.series.reduce(function(b,a){a.getPointsCollection().forEach(function(a){R(a.selectedStaging,a.selected)&&b.push(a)});return b},[])};a.prototype.getSelectedSeries=function(){return this.series.filter(function(b){return b.selected})};a.prototype.setTitle=function(b,a,c){this.applyDescription("title",b);this.applyDescription("subtitle",a);this.applyDescription("caption",
void 0);this.layOutTitles(c)};a.prototype.applyDescription=function(b,a){var c=this,d="title"===b?{color:"#333333",fontSize:this.options.isStock?"16px":"18px"}:{color:"#666666"};d=this.options[b]=W(!this.styledMode&&{style:d},this.options[b],a);var e=this[b];e&&a&&(this[b]=e=e.destroy());d&&!e&&(e=this.renderer.text(d.text,0,0,d.useHTML).attr({align:d.align,"class":"highcharts-"+b,zIndex:d.zIndex||4}).add(),e.update=function(a){c[{title:"setTitle",subtitle:"setSubtitle",caption:"setCaption"}[b]](a)},
this.styledMode||e.css(d.style),this[b]=e)};a.prototype.layOutTitles=function(b){var a=[0,0,0],c=this.renderer,d=this.spacingBox;["title","subtitle","caption"].forEach(function(b){var e=this[b],g=this.options[b],f=g.verticalAlign||"top";b="title"===b?"top"===f?-3:0:"top"===f?a[0]+2:0;var h;if(e){this.styledMode||(h=g.style&&g.style.fontSize);h=c.fontMetrics(h,e).b;e.css({width:(g.width||d.width+(g.widthAdjust||0))+"px"});var l=Math.round(e.getBBox(g.useHTML).height);e.align(M({y:"bottom"===f?h:b+
h,height:l},g),!1,"spacingBox");g.floating||("top"===f?a[0]=Math.ceil(a[0]+l):"bottom"===f&&(a[2]=Math.ceil(a[2]+l)))}},this);a[0]&&"top"===(this.options.title.verticalAlign||"top")&&(a[0]+=this.options.title.margin);a[2]&&"bottom"===this.options.caption.verticalAlign&&(a[2]+=this.options.caption.margin);var e=!this.titleOffset||this.titleOffset.join(",")!==a.join(",");this.titleOffset=a;Q(this,"afterLayOutTitles");!this.isDirtyBox&&e&&(this.isDirtyBox=this.isDirtyLegend=e,this.hasRendered&&R(b,!0)&&
this.isDirtyBox&&this.redraw())};a.prototype.getChartSize=function(){var b=this.options.chart,a=b.width;b=b.height;var c=this.renderTo;U(a)||(this.containerWidth=ea(c,"width"));U(b)||(this.containerHeight=ea(c,"height"));this.chartWidth=Math.max(0,a||this.containerWidth||600);this.chartHeight=Math.max(0,aa(b,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))};a.prototype.temporaryDisplay=function(b){var a=this.renderTo;if(b)for(;a&&a.style;)a.hcOrigStyle&&(O(a,a.hcOrigStyle),delete a.hcOrigStyle),
a.hcOrigDetached&&(r.body.removeChild(a),a.hcOrigDetached=!1),a=a.parentNode;else for(;a&&a.style;){r.body.contains(a)||a.parentNode||(a.hcOrigDetached=!0,r.body.appendChild(a));if("none"===ea(a,"display",!1)||a.hcOricDetached)a.hcOrigStyle={display:a.style.display,height:a.style.height,overflow:a.style.overflow},b={display:"block",overflow:"hidden"},a!==this.renderTo&&(b.height=0),O(a,b),a.offsetWidth||a.style.setProperty("display","block","important");a=a.parentNode;if(a===r.body)break}};a.prototype.setClassName=
function(b){this.container.className="highcharts-container "+(b||"")};a.prototype.getContainer=function(){var a=this.options,c=a.chart,d=ka(),g,h=this.renderTo;h||(this.renderTo=h=c.renderTo);V(h)&&(this.renderTo=h=r.getElementById(h));h||K(13,!0,this);var l=fa(I(h,"data-highcharts-chart"));T(l)&&C[l]&&C[l].hasRendered&&C[l].destroy();I(h,"data-highcharts-chart",this.index);h.innerHTML=f.emptyHTML;c.skipClone||h.offsetWidth||this.temporaryDisplay();this.getChartSize();l=this.chartWidth;var k=this.chartHeight;
O(h,{overflow:"hidden"});this.styledMode||(g=M({position:"relative",overflow:"hidden",width:l+"px",height:k+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)",userSelect:"none","touch-action":"manipulation",outline:"none"},c.style||{}));this.container=d=S("div",{id:d},g,h);this._cursor=d.style.cursor;this.renderer=new (c.renderer||!b?n.getRendererType(c.renderer):e)(d,l,k,void 0,c.forExport,a.exporting&&a.exporting.allowHTML,this.styledMode);B(void 0,
this);this.setClassName(c.className);if(this.styledMode)for(var m in a.defs)this.renderer.definition(a.defs[m]);else this.renderer.setStyle(c.style);this.renderer.chartIndex=this.index;Q(this,"afterGetContainer")};a.prototype.getMargins=function(b){var a=this.spacing,c=this.margin,d=this.titleOffset;this.resetMargins();d[0]&&!U(c[0])&&(this.plotTop=Math.max(this.plotTop,d[0]+a[0]));d[2]&&!U(c[2])&&(this.marginBottom=Math.max(this.marginBottom,d[2]+a[2]));this.legend&&this.legend.display&&this.legend.adjustMargins(c,
a);Q(this,"getMargins");b||this.getAxisMargins()};a.prototype.getAxisMargins=function(){var b=this,a=b.axisOffset=[0,0,0,0],c=b.colorAxis,d=b.margin,e=function(b){b.forEach(function(b){b.visible&&b.getOffset()})};b.hasCartesianSeries?e(b.axes):c&&c.length&&e(c);l.forEach(function(c,e){U(d[e])||(b[c]+=a[e])});b.setChartSize()};a.prototype.reflow=function(b){var a=this,c=a.options.chart,d=a.renderTo,e=U(c.width)&&U(c.height),f=c.width||ea(d,"width");c=c.height||ea(d,"height");d=b?b.target:g;delete a.pointer.chartPosition;
if(!e&&!a.isPrinting&&f&&c&&(d===g||d===r)){if(f!==a.containerWidth||c!==a.containerHeight)h.clearTimeout(a.reflowTimeout),a.reflowTimeout=ba(function(){a.container&&a.setSize(void 0,void 0,!1)},b?100:0);a.containerWidth=f;a.containerHeight=c}};a.prototype.setReflow=function(b){var a=this;!1===b||this.unbindReflow?!1===b&&this.unbindReflow&&(this.unbindReflow=this.unbindReflow()):(this.unbindReflow=x(g,"resize",function(b){a.options&&a.reflow(b)}),x(this,"destroy",this.unbindReflow))};a.prototype.setSize=
function(b,a,c){var d=this,e=d.renderer;d.isResizing+=1;B(c,d);c=e.globalAnimation;d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;"undefined"!==typeof b&&(d.options.chart.width=b);"undefined"!==typeof a&&(d.options.chart.height=a);d.getChartSize();d.styledMode||(c?w:O)(d.container,{width:d.chartWidth+"px",height:d.chartHeight+"px"},c);d.setChartSize(!0);e.setSize(d.chartWidth,d.chartHeight,c);d.axes.forEach(function(b){b.isDirty=!0;b.setScale()});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();
d.getMargins();d.redraw(c);d.oldChartHeight=null;Q(d,"resize");ba(function(){d&&Q(d,"endResize",null,function(){--d.isResizing})},p(c).duration)};a.prototype.setChartSize=function(b){var a=this.inverted,c=this.renderer,d=this.chartWidth,e=this.chartHeight,g=this.options.chart,f=this.spacing,h=this.clipOffset,l,k,m,p;this.plotLeft=l=Math.round(this.plotLeft);this.plotTop=k=Math.round(this.plotTop);this.plotWidth=m=Math.max(0,Math.round(d-l-this.marginRight));this.plotHeight=p=Math.max(0,Math.round(e-
k-this.marginBottom));this.plotSizeX=a?p:m;this.plotSizeY=a?m:p;this.plotBorderWidth=g.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:f[3],y:f[0],width:d-f[3]-f[1],height:e-f[0]-f[2]};this.plotBox=c.plotBox={x:l,y:k,width:m,height:p};a=2*Math.floor(this.plotBorderWidth/2);d=Math.ceil(Math.max(a,h[3])/2);e=Math.ceil(Math.max(a,h[0])/2);this.clipBox={x:d,y:e,width:Math.floor(this.plotSizeX-Math.max(a,h[1])/2-d),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(a,h[2])/2-e))};b||(this.axes.forEach(function(b){b.setAxisSize();
b.setAxisTranslation()}),c.alignElements());Q(this,"afterSetChartSize",{skipAxes:b})};a.prototype.resetMargins=function(){Q(this,"resetMargins");var b=this,a=b.options.chart;["margin","spacing"].forEach(function(c){var d=a[c],e=N(d)?d:[d,d,d,d];["Top","Right","Bottom","Left"].forEach(function(d,g){b[c][g]=R(a[c+d],e[g])})});l.forEach(function(a,c){b[a]=R(b.margin[c],b.spacing[c])});b.axisOffset=[0,0,0,0];b.clipOffset=[0,0,0,0]};a.prototype.drawChartBox=function(){var b=this.options.chart,a=this.renderer,
c=this.chartWidth,d=this.chartHeight,e=this.styledMode,g=this.plotBGImage,f=b.backgroundColor,h=b.plotBackgroundColor,l=b.plotBackgroundImage,k=this.plotLeft,m=this.plotTop,p=this.plotWidth,n=this.plotHeight,E=this.plotBox,r=this.clipRect,t=this.clipBox,q=this.chartBackground,N=this.plotBackground,w=this.plotBorder,B,C="animate";q||(this.chartBackground=q=a.rect().addClass("highcharts-background").add(),C="attr");if(e)var x=B=q.strokeWidth();else{x=b.borderWidth||0;B=x+(b.shadow?8:0);f={fill:f||"none"};
if(x||q["stroke-width"])f.stroke=b.borderColor,f["stroke-width"]=x;q.attr(f).shadow(b.shadow)}q[C]({x:B/2,y:B/2,width:c-B-x%2,height:d-B-x%2,r:b.borderRadius});C="animate";N||(C="attr",this.plotBackground=N=a.rect().addClass("highcharts-plot-background").add());N[C](E);e||(N.attr({fill:h||"none"}).shadow(b.plotShadow),l&&(g?(l!==g.attr("href")&&g.attr("href",l),g.animate(E)):this.plotBGImage=a.image(l,k,m,p,n).add()));r?r.animate({width:t.width,height:t.height}):this.clipRect=a.clipRect(t);C="animate";
w||(C="attr",this.plotBorder=w=a.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());e||w.attr({stroke:b.plotBorderColor,"stroke-width":b.plotBorderWidth||0,fill:"none"});w[C](w.crisp({x:k,y:m,width:p,height:n},-w.strokeWidth()));this.isDirtyBox=!1;Q(this,"afterDrawChartBox")};a.prototype.propFromSeries=function(){var b=this,a=b.options.chart,c=b.options.series,d,e,g;["inverted","angular","polar"].forEach(function(f){e=D[a.type||a.defaultSeriesType];g=a[f]||e&&e.prototype[f];for(d=c&&
c.length;!g&&d--;)(e=D[c[d].type])&&e.prototype[f]&&(g=!0);b[f]=g})};a.prototype.linkSeries=function(){var b=this,a=b.series;a.forEach(function(b){b.linkedSeries.length=0});a.forEach(function(a){var c=a.options.linkedTo;V(c)&&(c=":previous"===c?b.series[a.index-1]:b.get(c))&&c.linkedParent!==a&&(c.linkedSeries.push(a),a.linkedParent=c,c.enabledDataSorting&&a.setDataSortingOptions(),a.visible=R(a.options.visible,c.options.visible,a.visible))});Q(this,"afterLinkSeries")};a.prototype.renderSeries=function(){this.series.forEach(function(b){b.translate();
b.render()})};a.prototype.renderLabels=function(){var b=this,a=b.options.labels;a.items&&a.items.forEach(function(c){var d=M(a.style,c.style),e=fa(d.left)+b.plotLeft,g=fa(d.top)+b.plotTop+12;delete d.left;delete d.top;b.renderer.text(c.html,e,g).attr({zIndex:2}).css(d).add()})};a.prototype.render=function(){var b=this.axes,a=this.colorAxis,c=this.renderer,d=this.options,e=function(b){b.forEach(function(b){b.visible&&b.render()})},g=0;this.setTitle();this.legend=new G(this,d.legend);this.getStacks&&
this.getStacks();this.getMargins(!0);this.setChartSize();d=this.plotWidth;b.some(function(b){if(b.horiz&&b.visible&&b.options.labels.enabled&&b.series.length)return g=21,!0});var f=this.plotHeight=Math.max(this.plotHeight-g,0);b.forEach(function(b){b.setScale()});this.getAxisMargins();var h=1.1<d/this.plotWidth,l=1.05<f/this.plotHeight;if(h||l)b.forEach(function(b){(b.horiz&&h||!b.horiz&&l)&&b.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries?e(b):a&&a.length&&e(a);
this.seriesGroup||(this.seriesGroup=c.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0};a.prototype.addCredits=function(b){var a=this,c=W(!0,this.options.credits,b);c.enabled&&!this.credits&&(this.credits=this.renderer.text(c.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){c.href&&(g.location.href=c.href)}).attr({align:c.position.align,zIndex:8}),a.styledMode||
this.credits.css(c.style),this.credits.add().align(c.position),this.credits.update=function(b){a.credits=a.credits.destroy();a.addCredits(b)})};a.prototype.destroy=function(){var b=this,a=b.axes,c=b.series,d=b.container,e=d&&d.parentNode,g;Q(b,"destroy");b.renderer.forExport?L(C,b):C[b.index]=void 0;y.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");ia(b);for(g=a.length;g--;)a[g]=a[g].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(g=c.length;g--;)c[g]=
c[g].destroy();"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});d&&(d.innerHTML=f.emptyHTML,ia(d),e&&Y(d));X(b,function(a,c){delete b[c]})};a.prototype.firstRender=function(){var b=this,a=b.options;if(!b.isReadyToRender||b.isReadyToRender()){b.getContainer();b.resetMargins();b.setChartSize();b.propFromSeries();
b.getAxes();(E(a.series)?a.series:[]).forEach(function(a){b.initSeries(a)});b.linkSeries();b.setSeriesData();Q(b,"beforeRender");q&&(H.isRequired()?b.pointer=new H(b,a):b.pointer=new q(b,a));b.render();b.pointer.getChartPosition();if(!b.renderer.imgCount&&!b.hasLoaded)b.onload();b.temporaryDisplay(!0)}};a.prototype.onload=function(){this.callbacks.concat([this.callback]).forEach(function(b){b&&"undefined"!==typeof this.index&&b.apply(this,[this])},this);Q(this,"load");Q(this,"render");U(this.index)&&
this.setReflow(this.options.chart.reflow);this.hasLoaded=!0};a.prototype.addSeries=function(b,a,c){var d=this,e;b&&(a=R(a,!0),Q(d,"addSeries",{options:b},function(){e=d.initSeries(b);d.isDirtyLegend=!0;d.linkSeries();e.enabledDataSorting&&e.setData(b.data,!1);Q(d,"afterAddSeries",{series:e});a&&d.redraw(c)}));return e};a.prototype.addAxis=function(b,a,c,d){return this.createAxis(a?"xAxis":"yAxis",{axis:b,redraw:c,animation:d})};a.prototype.addColorAxis=function(b,a,c){return this.createAxis("colorAxis",
{axis:b,redraw:a,animation:c})};a.prototype.createAxis=function(b,a){b=new u(this,W(a.axis,{index:this[b].length,isX:"xAxis"===b}));R(a.redraw,!0)&&this.redraw(a.animation);return b};a.prototype.showLoading=function(b){var a=this,c=a.options,d=c.loading,e=function(){g&&O(g,{left:a.plotLeft+"px",top:a.plotTop+"px",width:a.plotWidth+"px",height:a.plotHeight+"px"})},g=a.loadingDiv,h=a.loadingSpan;g||(a.loadingDiv=g=S("div",{className:"highcharts-loading highcharts-loading-hidden"},null,a.container));
h||(a.loadingSpan=h=S("span",{className:"highcharts-loading-inner"},null,g),x(a,"redraw",e));g.className="highcharts-loading";f.setElementHTML(h,R(b,c.lang.loading,""));a.styledMode||(O(g,M(d.style,{zIndex:10})),O(h,d.labelStyle),a.loadingShown||(O(g,{opacity:0,display:""}),w(g,{opacity:d.style.opacity||.5},{duration:d.showDuration||0})));a.loadingShown=!0;e()};a.prototype.hideLoading=function(){var b=this.options,a=this.loadingDiv;a&&(a.className="highcharts-loading highcharts-loading-hidden",this.styledMode||
w(a,{opacity:0},{duration:b.loading.hideDuration||100,complete:function(){O(a,{display:"none"})}}));this.loadingShown=!1};a.prototype.update=function(b,a,d,e){var g=this,f={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle",caption:"setCaption"},h=b.isResponsiveOptions,l=[],k,p;Q(g,"update",{options:b});h||g.setResponsive(!1,!0);b=P(b,g.options);g.userOptions=W(g.userOptions,b);var n=b.chart;if(n){W(!0,g.options.chart,n);"className"in n&&g.setClassName(n.className);"reflow"in n&&g.setReflow(n.reflow);
if("inverted"in n||"polar"in n||"type"in n){g.propFromSeries();var E=!0}"alignTicks"in n&&(E=!0);"events"in n&&v(this,n);X(n,function(b,a){-1!==g.propsRequireUpdateSeries.indexOf("chart."+a)&&(k=!0);-1!==g.propsRequireDirtyBox.indexOf(a)&&(g.isDirtyBox=!0);-1!==g.propsRequireReflow.indexOf(a)&&(h?g.isDirtyBox=!0:p=!0)});!g.styledMode&&n.style&&g.renderer.setStyle(g.options.chart.style||{})}!g.styledMode&&b.colors&&(this.options.colors=b.colors);b.time&&(this.time===m&&(this.time=new c(b.time)),W(!0,
g.options.time,b.time));X(b,function(a,c){if(g[c]&&"function"===typeof g[c].update)g[c].update(a,!1);else if("function"===typeof g[f[c]])g[f[c]](a);else"colors"!==c&&-1===g.collectionsWithUpdate.indexOf(c)&&W(!0,g.options[c],b[c]);"chart"!==c&&-1!==g.propsRequireUpdateSeries.indexOf(c)&&(k=!0)});this.collectionsWithUpdate.forEach(function(a){if(b[a]){var c=[];g[a].forEach(function(b,a){b.options.isInternal||c.push(R(b.options.index,a))});ha(b[a]).forEach(function(b,e){var f=U(b.id),h;f&&(h=g.get(b.id));
!h&&g[a]&&(h=g[a][c?c[e]:e])&&f&&U(h.options.id)&&(h=void 0);h&&h.coll===a&&(h.update(b,!1),d&&(h.touched=!0));!h&&d&&g.collectionsWithInit[a]&&(g.collectionsWithInit[a][0].apply(g,[b].concat(g.collectionsWithInit[a][1]||[]).concat([!1])).touched=!0)});d&&g[a].forEach(function(b){b.touched||b.options.isInternal?delete b.touched:l.push(b)})}});l.forEach(function(b){b.chart&&b.remove&&b.remove(!1)});E&&g.axes.forEach(function(b){b.update({},!1)});k&&g.getSeriesOrderByLinks().forEach(function(b){b.chart&&
b.update({},!1)},this);E=n&&n.width;n=n&&(V(n.height)?aa(n.height,E||g.chartWidth):n.height);p||T(E)&&E!==g.chartWidth||T(n)&&n!==g.chartHeight?g.setSize(E,n,e):R(a,!0)&&g.redraw(e);Q(g,"afterUpdate",{options:b,redraw:a,animation:e})};a.prototype.setSubtitle=function(b,a){this.applyDescription("subtitle",b);this.layOutTitles(a)};a.prototype.setCaption=function(b,a){this.applyDescription("caption",b);this.layOutTitles(a)};a.prototype.showResetZoom=function(){function b(){a.zoomOut()}var a=this,c=d.lang,
e=a.options.chart.resetZoomButton,g=e.theme,f=g.states,h="chart"===e.relativeTo||"spacingBox"===e.relativeTo?null:"scrollablePlotBox";Q(this,"beforeShowResetZoom",null,function(){a.resetZoomButton=a.renderer.button(c.resetZoom,null,null,b,g,f&&f.hover).attr({align:e.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(e.position,!1,h)});Q(this,"afterShowResetZoom")};a.prototype.zoomOut=function(){Q(this,"selection",{resetSelection:!0},this.zoom)};a.prototype.zoom=
function(b){var a=this,c=a.pointer,d=a.inverted?c.mouseDownX:c.mouseDownY,e=!1,g;!b||b.resetSelection?(a.axes.forEach(function(b){g=b.zoom()}),c.initiated=!1):b.xAxis.concat(b.yAxis).forEach(function(b){var f=b.axis,h=a.inverted?f.left:f.top,l=a.inverted?h+f.width:h+f.height,k=f.isXAxis,m=!1;if(!k&&d>=h&&d<=l||k||!U(d))m=!0;c[k?"zoomX":"zoomY"]&&m&&(g=f.zoom(b.min,b.max),f.displayBtn&&(e=!0))});var f=a.resetZoomButton;e&&!f?a.showResetZoom():!e&&N(f)&&(a.resetZoomButton=f.destroy());g&&a.redraw(R(a.options.chart.animation,
b&&b.animation,100>a.pointCount))};a.prototype.pan=function(b,a){var c=this,d=c.hoverPoints;a="object"===typeof a?a:{enabled:a,type:"x"};var e=c.options.chart,g=c.options.mapNavigation&&c.options.mapNavigation.enabled;e&&e.panning&&(e.panning=a);var f=a.type,h;Q(this,"pan",{originalEvent:b},function(){d&&d.forEach(function(b){b.setState()});var a=c.xAxis;"xy"===f?a=a.concat(c.yAxis):"y"===f&&(a=c.yAxis);var e={};a.forEach(function(a){if(a.options.panningEnabled&&!a.options.isInternal){var d=a.horiz,
l=b[d?"chartX":"chartY"];d=d?"mouseDownX":"mouseDownY";var k=c[d],m=a.minPointOffset||0,p=a.reversed&&!c.inverted||!a.reversed&&c.inverted?-1:1,n=a.getExtremes(),E=a.toValue(k-l,!0)+m*p,r=a.toValue(k+a.len-l,!0)-(m*p||a.isXAxis&&a.pointRangePadding||0),t=r<E;p=a.hasVerticalPanning();k=t?r:E;E=t?E:r;var q=a.panningState;!p||a.isXAxis||q&&!q.isDirty||a.series.forEach(function(b){var a=b.getProcessedData(!0);a=b.getExtremes(a.yData,!0);q||(q={startMin:Number.MAX_VALUE,startMax:-Number.MAX_VALUE});T(a.dataMin)&&
T(a.dataMax)&&(q.startMin=Math.min(R(b.options.threshold,Infinity),a.dataMin,q.startMin),q.startMax=Math.max(R(b.options.threshold,-Infinity),a.dataMax,q.startMax))});p=Math.min(R(q&&q.startMin,n.dataMin),m?n.min:a.toValue(a.toPixels(n.min)-a.minPixelPadding));r=Math.max(R(q&&q.startMax,n.dataMax),m?n.max:a.toValue(a.toPixels(n.max)+a.minPixelPadding));a.panningState=q;a.isOrdinal||(m=p-k,0<m&&(E+=m,k=p),m=E-r,0<m&&(E=r,k-=m),a.series.length&&k!==n.min&&E!==n.max&&k>=p&&E<=r&&(a.setExtremes(k,E,!1,
!1,{trigger:"pan"}),c.resetZoomButton||g||k===p||E===r||!f.match("y")||(c.showResetZoom(),a.displayBtn=!1),h=!0),e[d]=l)}});X(e,function(b,a){c[a]=b});h&&c.redraw(!1);O(c.container,{cursor:"move"})})};return a}();M(a.prototype,{callbacks:[],collectionsWithInit:{xAxis:[a.prototype.addAxis,[!0]],yAxis:[a.prototype.addAxis,[!1]],series:[a.prototype.addSeries]},collectionsWithUpdate:["xAxis","yAxis","series"],propsRequireDirtyBox:"backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireReflow:"margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ")});"";return a});M(a,"Core/Legend/LegendSymbol.js",[a["Core/Utilities.js"]],function(a){var v=a.merge,z=a.pick,F;(function(a){a.drawLineMarker=function(a){var u=this.options,A=a.symbolWidth,q=a.symbolHeight,n=q/2,k=this.chart.renderer,
e=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var c={},h=u.marker;this.chart.styledMode||(c={"stroke-width":u.lineWidth||0},u.dashStyle&&(c.dashstyle=u.dashStyle));this.legendLine=k.path([["M",0,a],["L",A,a]]).addClass("highcharts-graph").attr(c).add(e);h&&!1!==h.enabled&&A&&(u=Math.min(z(h.radius,n),n),0===this.symbol.indexOf("url")&&(h=v(h,{width:q,height:q}),u=0),this.legendSymbol=A=k.symbol(this.symbol,A/2-u,a-u,2*u,2*u,h).addClass("highcharts-point").add(e),A.isMarker=!0)};a.drawRectangle=
function(a,v){var u=a.symbolHeight,q=a.options.squareSymbol;v.legendSymbol=this.chart.renderer.rect(q?(a.symbolWidth-u)/2:0,a.baseline-u+1,q?u:a.symbolWidth,u,z(a.options.symbolRadius,u/2)).addClass("highcharts-point").attr({zIndex:3}).add(v.legendGroup)}})(F||(F={}));return F});M(a,"Core/Series/SeriesDefaults.js",[],function(){return{lineWidth:2,allowPointSelect:!1,crisp:!0,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{enabledThreshold:2,lineColor:"#ffffff",lineWidth:0,radius:4,states:{normal:{animation:!0},
hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{animation:{},align:"center",defer:!0,formatter:function(){var a=this.series.chart.numberFormatter;return"number"!==typeof this.y?"":a(this.y,-1)},padding:5,style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0},cropThreshold:300,opacity:1,pointRange:0,softThreshold:!0,states:{normal:{animation:!0},
hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{animation:{duration:0}},inactive:{animation:{duration:50},opacity:.2}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"}});M(a,"Core/Series/Series.js",[a["Core/Animation/AnimationUtilities.js"],a["Core/DefaultOptions.js"],a["Core/Foundation.js"],a["Core/Globals.js"],a["Core/Legend/LegendSymbol.js"],a["Core/Series/Point.js"],a["Core/Series/SeriesDefaults.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Renderer/SVG/SVGElement.js"],
a["Core/Utilities.js"]],function(a,u,z,F,y,G,H,A,q,n){var k=a.animObject,e=a.setAnimation,c=u.defaultOptions,h=z.registerEventOptions,f=F.hasTouch,w=F.svg,p=F.win,B=A.seriesTypes,t=n.addEvent,v=n.arrayMax,C=n.arrayMin,r=n.clamp,l=n.cleanRecursively,b=n.correctFloat,g=n.defined,d=n.erase,m=n.error,D=n.extend,x=n.find,I=n.fireEvent,P=n.getNestedProperty,S=n.isArray,O=n.isNumber,U=n.isString,Y=n.merge,L=n.objectEach,K=n.pick,M=n.removeEvent,da=n.splat,Q=n.syncTimeout;a=function(){function a(){this.zones=
this.yAxis=this.xAxis=this.userOptions=this.tooltipOptions=this.processedYData=this.processedXData=this.points=this.options=this.linkedSeries=this.index=this.eventsToUnbind=this.eventOptions=this.data=this.chart=this._i=void 0}a.prototype.init=function(a,b){I(this,"init",{options:b});var c=this,d=a.series;this.eventsToUnbind=[];c.chart=a;c.options=c.setOptions(b);b=c.options;c.linkedSeries=[];c.bindAxes();D(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});h(this,b);var e=
b.events;if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();c.parallelArrays.forEach(function(a){c[a+"Data"]||(c[a+"Data"]=[])});c.isCartesian&&(a.hasCartesianSeries=!0);var g;d.length&&(g=d[d.length-1]);c._i=K(g&&g._i,-1)+1;c.opacity=c.options.opacity;a.orderSeries(this.insert(d));b.dataSorting&&b.dataSorting.enabled?c.setDataSortingOptions():c.points||c.data||c.setData(b.data,!1);I(this,"afterInit")};a.prototype.is=function(a){return B[a]&&
this instanceof B[a]};a.prototype.insert=function(a){var b=this.options.index,c;if(O(b)){for(c=a.length;c--;)if(b>=K(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return K(c,a.length-1)};a.prototype.bindAxes=function(){var a=this,b=a.options,c=a.chart,d;I(this,"bindAxes",null,function(){(a.axisTypes||[]).forEach(function(e){var g=0;c[e].forEach(function(c){d=c.options;if(b[e]===g&&!d.isInternal||"undefined"!==typeof b[e]&&b[e]===d.id||"undefined"===
typeof b[e]&&0===d.index)a.insert(c.series),a[e]=c,c.isDirty=!0;d.isInternal||g++});a[e]||a.optionalAxis===e||m(18,!0,c)})});I(this,"afterBindAxes")};a.prototype.updateParallelArrays=function(a,b){var c=a.series,d=arguments,e=O(b)?function(d){var e="y"===d&&c.toYData?c.toYData(a):a[d];c[d+"Data"][b]=e}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))};c.parallelArrays.forEach(e)};a.prototype.hasData=function(){return this.visible&&"undefined"!==typeof this.dataMax&&
"undefined"!==typeof this.dataMin||this.visible&&this.yData&&0<this.yData.length};a.prototype.autoIncrement=function(a){var b=this.options,c=b.pointIntervalUnit,d=b.relativeXValue,e=this.chart.time,g=this.xIncrement,f;g=K(g,b.pointStart,0);this.pointInterval=f=K(this.pointInterval,b.pointInterval,1);d&&O(a)&&(f*=a);c&&(b=new e.Date(g),"day"===c?e.set("Date",b,e.get("Date",b)+f):"month"===c?e.set("Month",b,e.get("Month",b)+f):"year"===c&&e.set("FullYear",b,e.get("FullYear",b)+f),f=b.getTime()-g);if(d&&
O(a))return g+f;this.xIncrement=g+f;return g};a.prototype.setDataSortingOptions=function(){var a=this.options;D(this,{requireSorting:!1,sorted:!1,enabledDataSorting:!0,allowDG:!1});g(a.pointRange)||(a.pointRange=1)};a.prototype.setOptions=function(a){var b=this.chart,d=b.options,e=d.plotOptions,f=b.userOptions||{};a=Y(a);b=b.styledMode;var h={plotOptions:e,userOptions:a};I(this,"setOptions",h);var l=h.plotOptions[this.type],k=f.plotOptions||{};this.userOptions=h.userOptions;f=Y(l,e.series,f.plotOptions&&
f.plotOptions[this.type],a);this.tooltipOptions=Y(c.tooltip,c.plotOptions.series&&c.plotOptions.series.tooltip,c.plotOptions[this.type].tooltip,d.tooltip.userOptions,e.series&&e.series.tooltip,e[this.type].tooltip,a.tooltip);this.stickyTracking=K(a.stickyTracking,k[this.type]&&k[this.type].stickyTracking,k.series&&k.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:f.stickyTracking);null===l.marker&&delete f.marker;this.zoneAxis=f.zoneAxis;e=this.zones=(f.zones||[]).slice();
!f.negativeColor&&!f.negativeFillColor||f.zones||(d={value:f[this.zoneAxis+"Threshold"]||f.threshold||0,className:"highcharts-negative"},b||(d.color=f.negativeColor,d.fillColor=f.negativeFillColor),e.push(d));e.length&&g(e[e.length-1].value)&&e.push(b?{}:{color:this.color,fillColor:this.fillColor});I(this,"afterSetOptions",{options:f});return f};a.prototype.getName=function(){return K(this.options.name,"Series "+(this.index+1))};a.prototype.getCyclic=function(a,b,c){var d=this.chart,e=this.userOptions,
f=a+"Index",h=a+"Counter",l=c?c.length:K(d.options.chart[a+"Count"],d[a+"Count"]);if(!b){var k=K(e[f],e["_"+f]);g(k)||(d.series.length||(d[h]=0),e["_"+f]=k=d[h]%l,d[h]+=1);c&&(b=c[k])}"undefined"!==typeof k&&(this[f]=k);this[a]=b};a.prototype.getColor=function(){this.chart.styledMode?this.getCyclic("color"):this.options.colorByPoint?this.color="#cccccc":this.getCyclic("color",this.options.color||c.plotOptions[this.type].color,this.chart.options.colors)};a.prototype.getPointsCollection=function(){return(this.hasGroupedData?
this.points:this.data)||[]};a.prototype.getSymbol=function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)};a.prototype.findPointIndex=function(a,b){var c=a.id,d=a.x,e=this.points,g=this.options.dataSorting,f,h;if(c)g=this.chart.get(c),g instanceof G&&(f=g);else if(this.linkedParent||this.enabledDataSorting||this.options.relativeXValue)if(f=function(b){return!b.touched&&b.index===a.index},g&&g.matchByName?f=function(b){return!b.touched&&b.name===a.name}:this.options.relativeXValue&&
(f=function(b){return!b.touched&&b.options.x===a.x}),f=x(e,f),!f)return;if(f){var l=f&&f.index;"undefined"!==typeof l&&(h=!0)}"undefined"===typeof l&&O(d)&&(l=this.xData.indexOf(d,b));-1!==l&&"undefined"!==typeof l&&this.cropped&&(l=l>=this.cropStart?l-this.cropStart:l);!h&&O(l)&&e[l]&&e[l].touched&&(l=void 0);return l};a.prototype.updateData=function(a,b){var c=this.options,d=c.dataSorting,e=this.points,f=[],h=this.requireSorting,l=a.length===e.length,k,m,p,n=!0;this.xIncrement=null;a.forEach(function(a,
b){var m=g(a)&&this.pointClass.prototype.optionsToObject.call({series:this},a)||{},n=m.x;if(m.id||O(n)){if(m=this.findPointIndex(m,p),-1===m||"undefined"===typeof m?f.push(a):e[m]&&a!==c.data[m]?(e[m].update(a,!1,null,!1),e[m].touched=!0,h&&(p=m+1)):e[m]&&(e[m].touched=!0),!l||b!==m||d&&d.enabled||this.hasDerivedData)k=!0}else f.push(a)},this);if(k)for(a=e.length;a--;)(m=e[a])&&!m.touched&&m.remove&&m.remove(!1,b);else!l||d&&d.enabled?n=!1:(a.forEach(function(a,b){a!==e[b].y&&e[b].update&&e[b].update(a,
!1,null,!1)}),f.length=0);e.forEach(function(a){a&&(a.touched=!1)});if(!n)return!1;f.forEach(function(a){this.addPoint(a,!1,null,null,!1)},this);null===this.xIncrement&&this.xData&&this.xData.length&&(this.xIncrement=v(this.xData),this.autoIncrement());return!0};a.prototype.setData=function(a,b,c,d){var e=this,g=e.points,f=g&&g.length||0,h=e.options,l=e.chart,k=h.dataSorting,p=e.xAxis,n=h.turboThreshold,r=this.xData,E=this.yData,t=e.pointArrayMap;t=t&&t.length;var q=h.keys,w,B=0,C=1,x=null;a=a||[];
var v=a.length;b=K(b,!0);k&&k.enabled&&(a=this.sortData(a));!1!==d&&v&&f&&!e.cropped&&!e.hasGroupedData&&e.visible&&!e.isSeriesBoosting&&(w=this.updateData(a,c));if(!w){e.xIncrement=null;e.colorCounter=0;this.parallelArrays.forEach(function(a){e[a+"Data"].length=0});if(n&&v>n)if(x=e.getFirstValidPoint(a),O(x))for(c=0;c<v;c++)r[c]=this.autoIncrement(),E[c]=a[c];else if(S(x))if(t)if(x.length===t)for(c=0;c<v;c++)r[c]=this.autoIncrement(),E[c]=a[c];else for(c=0;c<v;c++)d=a[c],r[c]=d[0],E[c]=d.slice(1,
t+1);else if(q&&(B=q.indexOf("x"),C=q.indexOf("y"),B=0<=B?B:0,C=0<=C?C:1),1===x.length&&(C=0),B===C)for(c=0;c<v;c++)r[c]=this.autoIncrement(),E[c]=a[c][C];else for(c=0;c<v;c++)d=a[c],r[c]=d[B],E[c]=d[C];else m(12,!1,l);else for(c=0;c<v;c++)"undefined"!==typeof a[c]&&(d={series:e},e.pointClass.prototype.applyOptions.apply(d,[a[c]]),e.updateParallelArrays(d,c));E&&U(E[0])&&m(14,!0,l);e.data=[];e.options.data=e.userOptions.data=a;for(c=f;c--;)g[c]&&g[c].destroy&&g[c].destroy();p&&(p.minRange=p.userMinRange);
e.isDirty=l.isDirtyBox=!0;e.isDirtyData=!!g;c=!1}"point"===h.legendType&&(this.processData(),this.generatePoints());b&&l.redraw(c)};a.prototype.sortData=function(a){var b=this,c=b.options.dataSorting.sortKey||"y",d=function(a,b){return g(b)&&a.pointClass.prototype.optionsToObject.call({series:a},b)||{}};a.forEach(function(c,e){a[e]=d(b,c);a[e].index=e},this);a.concat().sort(function(a,b){a=P(c,a);b=P(c,b);return b<a?-1:b>a?1:0}).forEach(function(a,b){a.x=b},this);b.linkedSeries&&b.linkedSeries.forEach(function(b){var c=
b.options,e=c.data;c.dataSorting&&c.dataSorting.enabled||!e||(e.forEach(function(c,g){e[g]=d(b,c);a[g]&&(e[g].x=a[g].x,e[g].index=g)}),b.setData(e,!1))});return a};a.prototype.getProcessedData=function(a){var b=this.xAxis,c=this.options,d=c.cropThreshold,e=a||this.getExtremesFromAll||c.getExtremesFromAll,g=this.isCartesian;a=b&&b.val2lin;c=!(!b||!b.logarithmic);var f=0,h=this.xData,l=this.yData,k=this.requireSorting;var p=!1;var n=h.length;if(b){p=b.getExtremes();var r=p.min;var E=p.max;p=b.categories&&
!b.names.length}if(g&&this.sorted&&!e&&(!d||n>d||this.forceCrop))if(h[n-1]<r||h[0]>E)h=[],l=[];else if(this.yData&&(h[0]<r||h[n-1]>E)){var t=this.cropData(this.xData,this.yData,r,E);h=t.xData;l=t.yData;f=t.start;t=!0}for(d=h.length||1;--d;)if(b=c?a(h[d])-a(h[d-1]):h[d]-h[d-1],0<b&&("undefined"===typeof q||b<q))var q=b;else 0>b&&k&&!p&&(m(15,!1,this.chart),k=!1);return{xData:h,yData:l,cropped:t,cropStart:f,closestPointRange:q}};a.prototype.processData=function(a){var b=this.xAxis;if(this.isCartesian&&
!this.isDirty&&!b.isDirty&&!this.yAxis.isDirty&&!a)return!1;a=this.getProcessedData();this.cropped=a.cropped;this.cropStart=a.cropStart;this.processedXData=a.xData;this.processedYData=a.yData;this.closestPointRange=this.basePointRange=a.closestPointRange;I(this,"afterProcessData")};a.prototype.cropData=function(a,b,c,d,e){var g=a.length,f,h=0,l=g;e=K(e,this.cropShoulder);for(f=0;f<g;f++)if(a[f]>=c){h=Math.max(0,f-e);break}for(c=f;c<g;c++)if(a[c]>d){l=c+e;break}return{xData:a.slice(h,l),yData:b.slice(h,
l),start:h,end:l}};a.prototype.generatePoints=function(){var a=this.options,b=a.data,c=this.processedXData,d=this.processedYData,e=this.pointClass,g=c.length,f=this.cropStart||0,h=this.hasGroupedData,l=a.keys,k=[];a=a.dataGrouping&&a.dataGrouping.groupAll?f:0;var m,p,n=this.data;if(!n&&!h){var r=[];r.length=b.length;n=this.data=r}l&&h&&(this.options.keys=!1);for(p=0;p<g;p++){r=f+p;if(h){var t=(new e).init(this,[c[p]].concat(da(d[p])));t.dataGroup=this.groupMap[a+p];t.dataGroup.options&&(t.options=
t.dataGroup.options,D(t,t.dataGroup.options),delete t.dataLabels)}else(t=n[r])||"undefined"===typeof b[r]||(n[r]=t=(new e).init(this,b[r],c[p]));t&&(t.index=h?a+p:r,k[p]=t)}this.options.keys=l;if(n&&(g!==(m=n.length)||h))for(p=0;p<m;p++)p!==f||h||(p+=g),n[p]&&(n[p].destroyElements(),n[p].plotX=void 0);this.data=n;this.points=k;I(this,"afterGeneratePoints")};a.prototype.getXExtremes=function(a){return{min:C(a),max:v(a)}};a.prototype.getExtremes=function(a,b){var c=this.xAxis,d=this.yAxis,e=this.processedXData||
this.xData,g=[],f=this.requireSorting?this.cropShoulder:0;d=d?d.positiveValuesOnly:!1;var h,l=0,k=0,m=0;a=a||this.stackedYData||this.processedYData||[];var p=a.length;if(c){var n=c.getExtremes();l=n.min;k=n.max}for(h=0;h<p;h++){var r=e[h];n=a[h];var t=(O(n)||S(n))&&(n.length||0<n||!d);r=b||this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||!c||(e[h+f]||r)>=l&&(e[h-f]||r)<=k;if(t&&r)if(t=n.length)for(;t--;)O(n[t])&&(g[m++]=n[t]);else g[m++]=n}a={activeYData:g,dataMin:C(g),dataMax:v(g)};
I(this,"afterGetExtremes",{dataExtremes:a});return a};a.prototype.applyExtremes=function(){var a=this.getExtremes();this.dataMin=a.dataMin;this.dataMax=a.dataMax;return a};a.prototype.getFirstValidPoint=function(a){for(var b=a.length,c=0,d=null;null===d&&c<b;)d=a[c],c++;return d};a.prototype.translate=function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,c=a.stacking,d=this.xAxis,e=d.categories,f=this.enabledDataSorting,h=this.yAxis,l=this.points,k=l.length,m=
this.pointPlacementToXValue(),p=!!m,n=a.threshold,t=a.startFromThreshold?n:0,q=this.zoneAxis||"y",w,B,C=Number.MAX_VALUE;for(w=0;w<k;w++){var x=l[w],v=x.x,u=void 0,D=void 0,J=x.y,A=x.low,y=c&&h.stacking&&h.stacking.stacks[(this.negStacks&&J<(t?0:n)?"-":"")+this.stackKey];if(h.positiveValuesOnly&&!h.validatePositiveValue(J)||d.positiveValuesOnly&&!d.validatePositiveValue(v))x.isNull=!0;x.plotX=B=b(r(d.translate(v,0,0,0,1,m,"flags"===this.type),-1E5,1E5));if(c&&this.visible&&y&&y[v]){var z=this.getStackIndicator(z,
v,this.index);x.isNull||(u=y[v],D=u.points[z.key])}S(D)&&(A=D[0],J=D[1],A===t&&z.key===y[v].base&&(A=K(O(n)&&n,h.min)),h.positiveValuesOnly&&0>=A&&(A=null),x.total=x.stackTotal=u.total,x.percentage=u.total&&x.y/u.total*100,x.stackY=J,this.irregularWidths||u.setOffset(this.pointXOffset||0,this.barW||0));x.yBottom=g(A)?r(h.translate(A,0,1,0,1),-1E5,1E5):null;this.dataModify&&(J=this.dataModify.modifyValue(J,w));x.plotY=void 0;O(J)&&(u=h.translate(J,!1,!0,!1,!0),"undefined"!==typeof u&&(x.plotY=r(u,
-1E5,1E5)));x.isInside=this.isPointInside(x);x.clientX=p?b(d.translate(v,0,0,0,1,m)):B;x.negative=x[q]<(a[q+"Threshold"]||n||0);x.category=e&&"undefined"!==typeof e[x.x]?e[x.x]:x.x;if(!x.isNull&&!1!==x.visible){"undefined"!==typeof F&&(C=Math.min(C,Math.abs(B-F)));var F=B}x.zone=this.zones.length?x.getZone():void 0;!x.graphic&&this.group&&f&&(x.isNew=!0)}this.closestPointRangePx=C;I(this,"afterTranslate")};a.prototype.getValidPoints=function(a,b,c){var d=this.chart;return(a||this.points||[]).filter(function(a){return b&&
!d.isInsidePlot(a.plotX,a.plotY,{inverted:d.inverted})?!1:!1!==a.visible&&(c||!a.isNull)})};a.prototype.getClipBox=function(){var a=this.chart,b=this.xAxis,c=this.yAxis,d=Y(a.clipBox);b&&b.len!==a.plotSizeX&&(d.width=b.len);c&&c.len!==a.plotSizeY&&(d.height=c.len);return d};a.prototype.getSharedClipKey=function(){return this.sharedClipKey=(this.options.xAxis||0)+","+(this.options.yAxis||0)};a.prototype.setClip=function(){var a=this.chart,b=this.group,c=this.markerGroup,d=a.sharedClips;a=a.renderer;
var e=this.getClipBox(),g=this.getSharedClipKey(),f=d[g];f?f.animate(e):d[g]=f=a.clipRect(e);b&&b.clip(!1===this.options.clip?void 0:f);c&&c.clip()};a.prototype.animate=function(a){var b=this.chart,c=this.group,d=this.markerGroup,e=b.inverted,g=k(this.options.animation),f=[this.getSharedClipKey(),g.duration,g.easing,g.defer].join(),h=b.sharedClips[f],l=b.sharedClips[f+"m"];if(a&&c)g=this.getClipBox(),h?h.attr("height",g.height):(g.width=0,e&&(g.x=b.plotHeight),h=b.renderer.clipRect(g),b.sharedClips[f]=
h,l=b.renderer.clipRect({x:e?(b.plotSizeX||0)+99:-99,y:e?-b.plotLeft:-b.plotTop,width:99,height:e?b.chartWidth:b.chartHeight}),b.sharedClips[f+"m"]=l),c.clip(h),d&&d.clip(l);else if(h&&!h.hasClass("highcharts-animating")){b=this.getClipBox();var m=g.step;d&&d.element.childNodes.length&&(g.step=function(a,b){m&&m.apply(b,arguments);l&&l.element&&l.attr(b.prop,"width"===b.prop?a+99:a)});h.addClass("highcharts-animating").animate(b,g)}};a.prototype.afterAnimate=function(){var a=this;this.setClip();L(this.chart.sharedClips,
function(b,c,d){b&&!a.chart.container.querySelector('[clip-path="url(#'+b.id+')"]')&&(b.destroy(),delete d[c])});this.finishedAnimating=!0;I(this,"afterAnimate")};a.prototype.drawPoints=function(){var a=this.points,b=this.chart,c=this.options.marker,d=this[this.specialGroup]||this.markerGroup,e=this.xAxis,g=K(c.enabled,!e||e.isRadial?!0:null,this.closestPointRangePx>=c.enabledThreshold*c.radius),f,h;if(!1!==c.enabled||this._hasPointMarkers)for(f=0;f<a.length;f++){var l=a[f];var k=(h=l.graphic)?"animate":
"attr";var m=l.marker||{};var p=!!l.marker;if((g&&"undefined"===typeof m.enabled||m.enabled)&&!l.isNull&&!1!==l.visible){var n=K(m.symbol,this.symbol,"rect");var r=this.markerAttribs(l,l.selected&&"select");this.enabledDataSorting&&(l.startXPos=e.reversed?-(r.width||0):e.width);var t=!1!==l.isInside;h?h[t?"show":"hide"](t).animate(r):t&&(0<(r.width||0)||l.hasImage)&&(l.graphic=h=b.renderer.symbol(n,r.x,r.y,r.width,r.height,p?m:c).add(d),this.enabledDataSorting&&b.hasRendered&&(h.attr({x:l.startXPos}),
k="animate"));h&&"animate"===k&&h[t?"show":"hide"](t).animate(r);if(h&&!b.styledMode)h[k](this.pointAttribs(l,l.selected&&"select"));h&&h.addClass(l.getClassName(),!0)}else h&&(l.graphic=h.destroy())}};a.prototype.markerAttribs=function(a,b){var c=this.options,d=c.marker,e=a.marker||{},g=e.symbol||d.symbol,f=K(e.radius,d.radius);b&&(d=d.states[b],b=e.states&&e.states[b],f=K(b&&b.radius,d&&d.radius,f+(d&&d.radiusPlus||0)));a.hasImage=g&&0===g.indexOf("url");a.hasImage&&(f=0);a={x:c.crisp?Math.floor(a.plotX-
f):a.plotX-f,y:a.plotY-f};f&&(a.width=a.height=2*f);return a};a.prototype.pointAttribs=function(a,b){var c=this.options.marker,d=a&&a.options,e=d&&d.marker||{},g=d&&d.color,f=a&&a.color,h=a&&a.zone&&a.zone.color,l=this.color;a=K(e.lineWidth,c.lineWidth);d=1;l=g||h||f||l;g=e.fillColor||c.fillColor||l;f=e.lineColor||c.lineColor||l;b=b||"normal";c=c.states[b]||{};b=e.states&&e.states[b]||{};a=K(b.lineWidth,c.lineWidth,a+K(b.lineWidthPlus,c.lineWidthPlus,0));g=b.fillColor||c.fillColor||g;f=b.lineColor||
c.lineColor||f;d=K(b.opacity,c.opacity,d);return{stroke:f,"stroke-width":a,fill:g,opacity:d}};a.prototype.destroy=function(a){var b=this,c=b.chart,e=/AppleWebKit\/533/.test(p.navigator.userAgent),g=b.data||[],f,h,l,k;I(b,"destroy");this.removeEvents(a);(b.axisTypes||[]).forEach(function(a){(k=b[a])&&k.series&&(d(k.series,b),k.isDirty=k.forceRedraw=!0)});b.legendItem&&b.chart.legend.destroyItem(b);for(h=g.length;h--;)(l=g[h])&&l.destroy&&l.destroy();b.clips&&b.clips.forEach(function(a){return a.destroy()});
n.clearTimeout(b.animationTimeout);L(b,function(a,b){a instanceof q&&!a.survive&&(f=e&&"group"===b?"hide":"destroy",a[f]())});c.hoverSeries===b&&(c.hoverSeries=void 0);d(c.series,b);c.orderSeries();L(b,function(c,d){a&&"hcEvents"===d||delete b[d]})};a.prototype.applyZones=function(){var a=this,b=this.chart,c=b.renderer,d=this.zones,e=this.clips||[],g=this.graph,f=this.area,h=Math.max(b.chartWidth,b.chartHeight),l=this[(this.zoneAxis||"y")+"Axis"],k=b.inverted,m,p,n,t,q,x,w,B,C=!1;if(d.length&&(g||
f)&&l&&"undefined"!==typeof l.min){var v=l.reversed;var u=l.horiz;g&&!this.showLine&&g.hide();f&&f.hide();var D=l.getExtremes();d.forEach(function(d,E){m=v?u?b.plotWidth:0:u?0:l.toPixels(D.min)||0;m=r(K(p,m),0,h);p=r(Math.round(l.toPixels(K(d.value,D.max),!0)||0),0,h);C&&(m=p=l.toPixels(D.max));t=Math.abs(m-p);q=Math.min(m,p);x=Math.max(m,p);l.isXAxis?(n={x:k?x:q,y:0,width:t,height:h},u||(n.x=b.plotHeight-n.x)):(n={x:0,y:k?x:q,width:h,height:t},u&&(n.y=b.plotWidth-n.y));k&&c.isVML&&(n=l.isXAxis?{x:0,
y:v?q:x,height:n.width,width:b.chartWidth}:{x:n.y-b.plotLeft-b.spacingBox.x,y:0,width:n.height,height:b.chartHeight});e[E]?e[E].animate(n):e[E]=c.clipRect(n);w=a["zone-area-"+E];B=a["zone-graph-"+E];g&&B&&B.clip(e[E]);f&&w&&w.clip(e[E]);C=d.value>D.max;a.resetZones&&0===p&&(p=void 0)});this.clips=e}else a.visible&&(g&&g.show(!0),f&&f.show(!0))};a.prototype.invertGroups=function(a){function b(){["group","markerGroup"].forEach(function(b){c[b]&&(d.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),
c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(c.isRadialSeries?!1:a))})}var c=this,d=c.chart;c.xAxis&&(c.eventsToUnbind.push(t(d,"resize",b)),b(),c.invertGroups=b)};a.prototype.plotGroup=function(a,b,c,d,e){var f=this[a],h=!f;c={visibility:c,zIndex:d||.1};"undefined"===typeof this.opacity||this.chart.styledMode||"inactive"===this.state||(c.opacity=this.opacity);h&&(this[a]=f=this.chart.renderer.g().add(e));f.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+
"-series "+(g(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(f.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);f.attr(c)[h?"attr":"animate"](this.getPlotBox());return f};a.prototype.getPlotBox=function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}};a.prototype.removeEvents=function(a){a||M(this);this.eventsToUnbind.length&&(this.eventsToUnbind.forEach(function(a){a()}),
this.eventsToUnbind.length=0)};a.prototype.render=function(){var a=this,b=a.chart,c=a.options,d=k(c.animation),e=a.visible?"inherit":"hidden",g=c.zIndex,f=a.hasRendered,h=b.seriesGroup,l=b.inverted;b=!a.finishedAnimating&&b.renderer.isSVG?d.duration:0;I(this,"render");var m=a.plotGroup("group","series",e,g,h);a.markerGroup=a.plotGroup("markerGroup","markers",e,g,h);!1!==c.clip&&a.setClip();a.animate&&b&&a.animate(!0);m.inverted=K(a.invertible,a.isCartesian)?l:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());
a.visible&&a.drawPoints();a.drawDataLabels&&a.drawDataLabels();a.redrawPoints&&a.redrawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(l);a.animate&&b&&a.animate();f||(b&&d.defer&&(b+=d.defer),a.animationTimeout=Q(function(){a.afterAnimate()},b||0));a.isDirty=!1;a.hasRendered=!0;I(a,"afterRender")};a.prototype.redraw=function(){var a=this.chart,b=this.isDirty||this.isDirtyData,c=this.group,d=this.xAxis,e=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,
height:a.plotHeight}),c.animate({translateX:K(d&&d.left,a.plotLeft),translateY:K(e&&e.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree};a.prototype.searchPoint=function(a,b){var c=this.xAxis,d=this.yAxis,e=this.chart.inverted;return this.searchKDTree({clientX:e?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:e?d.len-a.chartX+d.pos:a.chartY-d.pos},b,a)};a.prototype.buildKDTree=function(a){function b(a,d,e){var g=a&&a.length;if(g){var f=c.kdAxisArray[d%e];a.sort(function(a,b){return a[f]-
b[f]});g=Math.floor(g/2);return{point:a[g],left:b(a.slice(0,g),d+1,e),right:b(a.slice(g+1),d+1,e)}}}this.buildingKdTree=!0;var c=this,d=-1<c.options.findNearestPointBy.indexOf("y")?2:1;delete c.kdTree;Q(function(){c.kdTree=b(c.getValidPoints(null,!c.directTouch),d,d);c.buildingKdTree=!1},c.options.kdNow||a&&"touchstart"===a.type?0:1)};a.prototype.searchKDTree=function(a,b,c){function d(a,b,c,k){var m=b.point,p=e.kdAxisArray[c%k],n=m,r=g(a[f])&&g(m[f])?Math.pow(a[f]-m[f],2):null;var t=g(a[h])&&g(m[h])?
Math.pow(a[h]-m[h],2):null;t=(r||0)+(t||0);m.dist=g(t)?Math.sqrt(t):Number.MAX_VALUE;m.distX=g(r)?Math.sqrt(r):Number.MAX_VALUE;p=a[p]-m[p];t=0>p?"left":"right";r=0>p?"right":"left";b[t]&&(t=d(a,b[t],c+1,k),n=t[l]<n[l]?t:m);b[r]&&Math.sqrt(p*p)<n[l]&&(a=d(a,b[r],c+1,k),n=a[l]<n[l]?a:n);return n}var e=this,f=this.kdAxisArray[0],h=this.kdAxisArray[1],l=b?"distX":"dist";b=-1<e.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree(c);if(this.kdTree)return d(a,
this.kdTree,b,b)};a.prototype.pointPlacementToXValue=function(){var a=this.options,b=a.pointRange,c=this.xAxis;a=a.pointPlacement;"between"===a&&(a=c.reversed?-.5:.5);return O(a)?a*(b||c.pointRange):0};a.prototype.isPointInside=function(a){var b=this.chart,c=this.xAxis,d=this.yAxis;return"undefined"!==typeof a.plotY&&"undefined"!==typeof a.plotX&&0<=a.plotY&&a.plotY<=(d?d.len:b.plotHeight)&&0<=a.plotX&&a.plotX<=(c?c.len:b.plotWidth)};a.prototype.drawTracker=function(){var a=this,b=a.options,c=b.trackByArea,
d=[].concat(c?a.areaPath:a.graphPath),e=a.chart,g=e.pointer,h=e.renderer,l=e.options.tooltip.snap,m=a.tracker,k=function(b){if(e.hoverSeries!==a)a.onMouseOver()},p="rgba(192,192,192,"+(w?.0001:.002)+")";m?m.attr({d:d}):a.graph&&(a.tracker=h.path(d).attr({visibility:a.visible?"visible":"hidden",zIndex:2}).addClass(c?"highcharts-tracker-area":"highcharts-tracker-line").add(a.group),e.styledMode||a.tracker.attr({"stroke-linecap":"round","stroke-linejoin":"round",stroke:p,fill:c?p:"none","stroke-width":a.graph.strokeWidth()+
(c?0:2*l)}),[a.tracker,a.markerGroup,a.dataLabelsGroup].forEach(function(a){if(a&&(a.addClass("highcharts-tracker").on("mouseover",k).on("mouseout",function(a){g.onTrackerMouseOut(a)}),b.cursor&&!e.styledMode&&a.css({cursor:b.cursor}),f))a.on("touchstart",k)}));I(this,"afterDrawTracker")};a.prototype.addPoint=function(a,b,c,d,e){var g=this.options,f=this.data,h=this.chart,l=this.xAxis;l=l&&l.hasNames&&l.names;var m=g.data,k=this.xData,p;b=K(b,!0);var n={series:this};this.pointClass.prototype.applyOptions.apply(n,
[a]);var r=n.x;var t=k.length;if(this.requireSorting&&r<k[t-1])for(p=!0;t&&k[t-1]>r;)t--;this.updateParallelArrays(n,"splice",t,0,0);this.updateParallelArrays(n,t);l&&n.name&&(l[r]=n.name);m.splice(t,0,a);p&&(this.data.splice(t,0,null),this.processData());"point"===g.legendType&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(n,"shift"),m.shift()));!1!==e&&I(this,"addPoint",{point:n});this.isDirtyData=this.isDirty=!0;b&&h.redraw(d)};a.prototype.removePoint=
function(a,b,c){var d=this,g=d.data,f=g[a],h=d.points,l=d.chart,k=function(){h&&h.length===g.length&&h.splice(a,1);g.splice(a,1);d.options.data.splice(a,1);d.updateParallelArrays(f||{series:d},"splice",a,1);f&&f.destroy();d.isDirty=!0;d.isDirtyData=!0;b&&l.redraw()};e(c,l);b=K(b,!0);f?f.firePointEvent("remove",null,k):k()};a.prototype.remove=function(a,b,c,d){function e(){g.destroy(d);f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();K(a,!0)&&f.redraw(b)}var g=this,f=g.chart;!1!==c?I(g,"remove",null,
e):e()};a.prototype.update=function(a,b){a=l(a,this.userOptions);I(this,"update",{options:a});var c=this,d=c.chart,e=c.userOptions,g=c.initialType||c.type,f=d.options.plotOptions,h=B[g].prototype,k=c.finishedAnimating&&{animation:!1},p={},n,r=["eventOptions","navigatorSeries","baseSeries"],t=a.type||e.type||d.options.chart.type,q=!(this.hasDerivedData||t&&t!==this.type||"undefined"!==typeof a.pointStart||"undefined"!==typeof a.pointInterval||"undefined"!==typeof a.relativeXValue||c.hasOptionChanged("dataGrouping")||
c.hasOptionChanged("pointStart")||c.hasOptionChanged("pointInterval")||c.hasOptionChanged("pointIntervalUnit")||c.hasOptionChanged("keys"));t=t||g;q&&(r.push("data","isDirtyData","points","processedXData","processedYData","xIncrement","cropped","_hasPointMarkers","_hasPointLabels","clips","nodes","layout","mapMap","mapData","minY","maxY","minX","maxX"),!1!==a.visible&&r.push("area","graph"),c.parallelArrays.forEach(function(a){r.push(a+"Data")}),a.data&&(a.dataSorting&&D(c.options.dataSorting,a.dataSorting),
this.setData(a.data,!1)));a=Y(e,k,{index:"undefined"===typeof e.index?c.index:e.index,pointStart:K(f&&f.series&&f.series.pointStart,e.pointStart,c.xData[0])},!q&&{data:c.options.data},a);q&&a.data&&(a.data=c.options.data);r=["group","markerGroup","dataLabelsGroup","transformGroup"].concat(r);r.forEach(function(a){r[a]=c[a];delete c[a]});f=!1;if(B[t]){if(f=t!==c.type,c.remove(!1,!1,!1,!0),f)if(Object.setPrototypeOf)Object.setPrototypeOf(c,B[t].prototype);else{k=Object.hasOwnProperty.call(c,"hcEvents")&&
c.hcEvents;for(n in h)c[n]=void 0;D(c,B[t].prototype);k?c.hcEvents=k:delete c.hcEvents}}else m(17,!0,d,{missingModuleFor:t});r.forEach(function(a){c[a]=r[a]});c.init(d,a);if(q&&this.points){var x=c.options;!1===x.visible?(p.graphic=1,p.dataLabel=1):c._hasPointLabels||(a=x.marker,h=x.dataLabels,!a||!1!==a.enabled&&(e.marker&&e.marker.symbol)===a.symbol||(p.graphic=1),h&&!1===h.enabled&&(p.dataLabel=1));this.points.forEach(function(a){a&&a.series&&(a.resolveColor(),Object.keys(p).length&&a.destroyElements(p),
!1===x.showInLegend&&a.legendItem&&d.legend.destroyItem(a))},this)}c.initialType=g;d.linkSeries();f&&c.linkedSeries.length&&(c.isDirtyData=!0);I(this,"afterUpdate");K(b,!0)&&d.redraw(q?void 0:!1)};a.prototype.setName=function(a){this.name=this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0};a.prototype.hasOptionChanged=function(a){var b=this.options[a],c=this.chart.options.plotOptions,d=this.userOptions[a];return d?b!==d:b!==K(c&&c[this.type]&&c[this.type][a],c&&c.series&&c.series[a],
b)};a.prototype.onMouseOver=function(){var a=this.chart,b=a.hoverSeries;a.pointer.setHoverChartIndex();if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&I(this,"mouseOver");this.setState("hover");a.hoverSeries=this};a.prototype.onMouseOut=function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&I(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();b.series.forEach(function(a){a.setState("",
!0)})};a.prototype.setState=function(a,b){var c=this,d=c.options,e=c.graph,g=d.inactiveOtherPoints,f=d.states,h=K(f[a||"normal"]&&f[a||"normal"].animation,c.chart.options.chart.animation),l=d.lineWidth,k=0,m=d.opacity;a=a||"";if(c.state!==a&&([c.group,c.markerGroup,c.dataLabelsGroup].forEach(function(b){b&&(c.state&&b.removeClass("highcharts-series-"+c.state),a&&b.addClass("highcharts-series-"+a))}),c.state=a,!c.chart.styledMode)){if(f[a]&&!1===f[a].enabled)return;a&&(l=f[a].lineWidth||l+(f[a].lineWidthPlus||
0),m=K(f[a].opacity,m));if(e&&!e.dashstyle)for(d={"stroke-width":l},e.animate(d,h);c["zone-graph-"+k];)c["zone-graph-"+k].animate(d,h),k+=1;g||[c.group,c.markerGroup,c.dataLabelsGroup,c.labelBySeries].forEach(function(a){a&&a.animate({opacity:m},h)})}b&&g&&c.points&&c.setAllPointsToState(a||void 0)};a.prototype.setAllPointsToState=function(a){this.points.forEach(function(b){b.setState&&b.setState(a)})};a.prototype.setVisible=function(a,b){var c=this,d=c.chart,e=c.legendItem,g=d.options.chart.ignoreHiddenSeries,
f=c.visible,h=(c.visible=a=c.options.visible=c.userOptions.visible="undefined"===typeof a?!f:a)?"show":"hide";["group","dataLabelsGroup","markerGroup","tracker","tt"].forEach(function(a){if(c[a])c[a][h]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&d.series.forEach(function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});c.linkedSeries.forEach(function(b){b.setVisible(a,!1)});g&&(d.isDirtyBox=!0);
I(c,h);!1!==b&&d.redraw()};a.prototype.show=function(){this.setVisible(!0)};a.prototype.hide=function(){this.setVisible(!1)};a.prototype.select=function(a){this.selected=a=this.options.selected="undefined"===typeof a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);I(this,a?"select":"unselect")};a.prototype.shouldShowTooltip=function(a,b,c){void 0===c&&(c={});c.series=this;c.visiblePlotOnly=!0;return this.chart.isInsidePlot(a,b,c)};a.defaultOptions=H;return a}();D(a.prototype,{axisTypes:["xAxis",
"yAxis"],coll:"series",colorCounter:0,cropShoulder:1,directTouch:!1,drawLegendSymbol:y.drawLineMarker,isCartesian:!0,kdAxisArray:["clientX","plotY"],parallelArrays:["x","y"],pointClass:G,requireSorting:!0,sorted:!0});A.series=a;"";"";return a});M(a,"Extensions/ScrollablePlotArea.js",[a["Core/Animation/AnimationUtilities.js"],a["Core/Axis/Axis.js"],a["Core/Chart/Chart.js"],a["Core/Series/Series.js"],a["Core/Renderer/RendererRegistry.js"],a["Core/Utilities.js"]],function(a,u,z,F,y,G){var v=a.stop,A=
G.addEvent,q=G.createElement,n=G.merge,k=G.pick;A(z,"afterSetChartSize",function(a){var c=this.options.chart.scrollablePlotArea,e=c&&c.minWidth;c=c&&c.minHeight;if(!this.renderer.forExport){if(e){if(this.scrollablePixelsX=e=Math.max(0,e-this.chartWidth)){this.scrollablePlotBox=this.renderer.scrollablePlotBox=n(this.plotBox);this.plotBox.width=this.plotWidth+=e;this.inverted?this.clipBox.height+=e:this.clipBox.width+=e;var f={1:{name:"right",value:e}}}}else c&&(this.scrollablePixelsY=e=Math.max(0,
c-this.chartHeight))&&(this.scrollablePlotBox=this.renderer.scrollablePlotBox=n(this.plotBox),this.plotBox.height=this.plotHeight+=e,this.inverted?this.clipBox.width+=e:this.clipBox.height+=e,f={2:{name:"bottom",value:e}});f&&!a.skipAxes&&this.axes.forEach(function(a){f[a.side]?a.getPlotLinePath=function(){var c=f[a.side].name,e=this[c];this[c]=e-f[a.side].value;var h=u.prototype.getPlotLinePath.apply(this,arguments);this[c]=e;return h}:(a.setAxisSize(),a.setAxisTranslation())})}});A(z,"render",function(){this.scrollablePixelsX||
this.scrollablePixelsY?(this.setUpScrolling&&this.setUpScrolling(),this.applyFixed()):this.fixedDiv&&this.applyFixed()});z.prototype.setUpScrolling=function(){var a=this,c={WebkitOverflowScrolling:"touch",overflowX:"hidden",overflowY:"hidden"};this.scrollablePixelsX&&(c.overflowX="auto");this.scrollablePixelsY&&(c.overflowY="auto");this.scrollingParent=q("div",{className:"highcharts-scrolling-parent"},{position:"relative"},this.renderTo);this.scrollingContainer=q("div",{className:"highcharts-scrolling"},
c,this.scrollingParent);A(this.scrollingContainer,"scroll",function(){a.pointer&&delete a.pointer.chartPosition});this.innerContainer=q("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null};z.prototype.moveFixedElements=function(){var a=this.container,c=this.fixedRenderer,h=".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
f;this.scrollablePixelsX&&!this.inverted?f=".highcharts-yaxis":this.scrollablePixelsX&&this.inverted?f=".highcharts-xaxis":this.scrollablePixelsY&&!this.inverted?f=".highcharts-xaxis":this.scrollablePixelsY&&this.inverted&&(f=".highcharts-yaxis");f&&h.push(f+":not(.highcharts-radial-axis)",f+"-labels:not(.highcharts-radial-axis-labels)");h.forEach(function(e){[].forEach.call(a.querySelectorAll(e),function(a){(a.namespaceURI===c.SVG_NS?c.box:c.box.parentNode).appendChild(a);a.style.pointerEvents="auto"})})};
z.prototype.applyFixed=function(){var a=!this.fixedDiv,c=this.options.chart,h=c.scrollablePlotArea,f=y.getRendererType();a?(this.fixedDiv=q("div",{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:(c.style&&c.style.zIndex||0)+2,top:0},null,!0),this.scrollingContainer&&this.scrollingContainer.parentNode.insertBefore(this.fixedDiv,this.scrollingContainer),this.renderTo.style.overflow="visible",this.fixedRenderer=c=new f(this.fixedDiv,this.chartWidth,this.chartHeight,
this.options.chart.style),this.scrollableMask=c.path().attr({fill:this.options.chart.backgroundColor||"#fff","fill-opacity":k(h.opacity,.85),zIndex:-1}).addClass("highcharts-scrollable-mask").add(),A(this,"afterShowResetZoom",this.moveFixedElements),A(this,"afterDrilldown",this.moveFixedElements),A(this,"afterLayOutTitles",this.moveFixedElements)):this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);if(this.scrollableDirty||a)this.scrollableDirty=!1,this.moveFixedElements();c=this.chartWidth+
(this.scrollablePixelsX||0);f=this.chartHeight+(this.scrollablePixelsY||0);v(this.container);this.container.style.width=c+"px";this.container.style.height=f+"px";this.renderer.boxWrapper.attr({width:c,height:f,viewBox:[0,0,c,f].join(" ")});this.chartBackground.attr({width:c,height:f});this.scrollingContainer.style.height=this.chartHeight+"px";a&&(h.scrollPositionX&&(this.scrollingContainer.scrollLeft=this.scrollablePixelsX*h.scrollPositionX),h.scrollPositionY&&(this.scrollingContainer.scrollTop=this.scrollablePixelsY*
h.scrollPositionY));f=this.axisOffset;a=this.plotTop-f[0]-1;h=this.plotLeft-f[3]-1;c=this.plotTop+this.plotHeight+f[2]+1;f=this.plotLeft+this.plotWidth+f[1]+1;var n=this.plotLeft+this.plotWidth-(this.scrollablePixelsX||0),p=this.plotTop+this.plotHeight-(this.scrollablePixelsY||0);a=this.scrollablePixelsX?[["M",0,a],["L",this.plotLeft-1,a],["L",this.plotLeft-1,c],["L",0,c],["Z"],["M",n,a],["L",this.chartWidth,a],["L",this.chartWidth,c],["L",n,c],["Z"]]:this.scrollablePixelsY?[["M",h,0],["L",h,this.plotTop-
1],["L",f,this.plotTop-1],["L",f,0],["Z"],["M",h,p],["L",h,this.chartHeight],["L",f,this.chartHeight],["L",f,p],["Z"]]:[["M",0,0]];"adjustHeight"!==this.redrawTrigger&&this.scrollableMask.attr({d:a})};A(u,"afterInit",function(){this.chart.scrollableDirty=!0});A(F,"show",function(){this.chart.scrollableDirty=!0});""});M(a,"Core/Axis/StackingAxis.js",[a["Core/Animation/AnimationUtilities.js"],a["Core/Axis/Axis.js"],a["Core/Utilities.js"]],function(a,u,z){var v=a.getDeferredAnimation,y=z.addEvent,G=
z.destroyObjectProperties,H=z.fireEvent,A=z.isNumber,q=z.objectEach,n;(function(a){function e(){var a=this.stacking;if(a){var c=a.stacks;q(c,function(a,e){G(a);c[e]=null});a&&a.stackTotalGroup&&a.stackTotalGroup.destroy()}}function c(){this.stacking||(this.stacking=new f(this))}var h=[];a.compose=function(a){-1===h.indexOf(a)&&(h.push(a),y(a,"init",c),y(a,"destroy",e));return a};var f=function(){function a(a){this.oldStacks={};this.stacks={};this.stacksTouched=0;this.axis=a}a.prototype.buildStacks=
function(){var a=this.axis,c=a.series,e=a.options.reversedStacks,f=c.length,h;if(!a.isXAxis){this.usePercentage=!1;for(h=f;h--;){var k=c[e?h:f-h-1];k.setStackedPoints();k.setGroupedPoints()}for(h=0;h<f;h++)c[h].modifyStacks();H(a,"afterBuildStacks")}};a.prototype.cleanStacks=function(){if(!this.axis.isXAxis){if(this.oldStacks)var a=this.stacks=this.oldStacks;q(a,function(a){q(a,function(a){a.cumulative=a.total})})}};a.prototype.resetStacks=function(){var a=this,c=a.stacks;a.axis.isXAxis||q(c,function(c){q(c,
function(e,f){A(e.touched)&&e.touched<a.stacksTouched?(e.destroy(),delete c[f]):(e.total=null,e.cumulative=null)})})};a.prototype.renderStackTotals=function(){var a=this.axis,c=a.chart,e=c.renderer,f=this.stacks;a=v(c,a.options.stackLabels&&a.options.stackLabels.animation||!1);var h=this.stackTotalGroup=this.stackTotalGroup||e.g("stack-labels").attr({visibility:"visible",zIndex:6,opacity:0}).add();h.translate(c.plotLeft,c.plotTop);q(f,function(a){q(a,function(a){a.render(h)})});h.animate({opacity:1},
a)};return a}();a.Additions=f})(n||(n={}));return n});M(a,"Extensions/Stacking.js",[a["Core/Axis/Axis.js"],a["Core/Chart/Chart.js"],a["Core/FormatUtilities.js"],a["Core/Globals.js"],a["Core/Series/Series.js"],a["Core/Axis/StackingAxis.js"],a["Core/Utilities.js"]],function(a,u,z,F,y,G,H){var v=z.format,q=H.correctFloat,n=H.defined,k=H.destroyObjectProperties,e=H.isArray,c=H.isNumber,h=H.objectEach,f=H.pick,w=function(){function a(a,c,e,f,h){var l=a.chart.inverted;this.axis=a;this.isNegative=e;this.options=
c=c||{};this.x=f;this.total=null;this.points={};this.hasValidPoints=!1;this.stack=h;this.rightCliff=this.leftCliff=0;this.alignOptions={align:c.align||(l?e?"left":"right":"center"),verticalAlign:c.verticalAlign||(l?"middle":e?"bottom":"top"),y:c.y,x:c.x};this.textAlign=c.textAlign||(l?e?"right":"left":"center")}a.prototype.destroy=function(){k(this,this.axis)};a.prototype.render=function(a){var c=this.axis.chart,e=this.options,h=e.format;h=h?v(h,this,c):e.formatter.call(this);this.label?this.label.attr({text:h,
visibility:"hidden"}):(this.label=c.renderer.label(h,null,null,e.shape,null,null,e.useHTML,!1,"stack-labels"),h={r:e.borderRadius||0,text:h,rotation:e.rotation,padding:f(e.padding,5),visibility:"hidden"},c.styledMode||(h.fill=e.backgroundColor,h.stroke=e.borderColor,h["stroke-width"]=e.borderWidth,this.label.css(e.style)),this.label.attr(h),this.label.added||this.label.add(a));this.label.labelrank=c.plotSizeY};a.prototype.setOffset=function(a,e,h,k,p){var l=this.axis,b=l.chart;k=l.translate(l.stacking.usePercentage?
100:k?k:this.total,0,0,0,1);h=l.translate(h?h:0);h=n(k)&&Math.abs(k-h);a=f(p,b.xAxis[0].translate(this.x))+a;l=n(k)&&this.getStackBox(b,this,a,k,e,h,l);e=this.label;h=this.isNegative;a="justify"===f(this.options.overflow,"justify");var g=this.textAlign;e&&l&&(p=e.getBBox(),k=e.padding,g="left"===g?b.inverted?-k:k:"right"===g?p.width:b.inverted&&"center"===g?p.width/2:b.inverted?h?p.width+k:-k:p.width/2,h=b.inverted?p.height/2:h?-k:p.height,this.alignOptions.x=f(this.options.x,0),this.alignOptions.y=
f(this.options.y,0),l.x-=g,l.y-=h,e.align(this.alignOptions,null,l),b.isInsidePlot(e.alignAttr.x+g-this.alignOptions.x,e.alignAttr.y+h-this.alignOptions.y)?e.show():(e.alignAttr.y=-9999,a=!1),a&&y.prototype.justifyDataLabel.call(this.axis,e,this.alignOptions,e.alignAttr,p,l),e.attr({x:e.alignAttr.x,y:e.alignAttr.y}),f(!a&&this.options.crop,!0)&&((b=c(e.x)&&c(e.y)&&b.isInsidePlot(e.x-k+e.width,e.y)&&b.isInsidePlot(e.x+k,e.y))||e.hide()))};a.prototype.getStackBox=function(a,c,e,f,h,l,b){var g=c.axis.reversed,
d=a.inverted,k=b.height+b.pos-(d?a.plotLeft:a.plotTop);c=c.isNegative&&!g||!c.isNegative&&g;return{x:d?c?f-b.right:f-l+b.pos-a.plotLeft:e+a.xAxis[0].transB-a.plotLeft,y:d?b.height-e-h:c?k-f-l:k-f,width:d?l:h,height:d?h:l}};return a}();u.prototype.getStacks=function(){var a=this,c=a.inverted;a.yAxis.forEach(function(a){a.stacking&&a.stacking.stacks&&a.hasVisibleSeries&&(a.stacking.oldStacks=a.stacking.stacks)});a.series.forEach(function(e){var h=e.xAxis&&e.xAxis.options||{};!e.options.stacking||!0!==
e.visible&&!1!==a.options.chart.ignoreHiddenSeries||(e.stackKey=[e.type,f(e.options.stack,""),c?h.top:h.left,c?h.height:h.width].join())})};G.compose(a);y.prototype.setGroupedPoints=function(){var a=this.yAxis.stacking;this.options.centerInCategory&&(this.is("column")||this.is("columnrange"))&&!this.options.stacking&&1<this.chart.series.length?y.prototype.setStackedPoints.call(this,"group"):a&&h(a.stacks,function(c,e){"group"===e.slice(-5)&&(h(c,function(a){return a.destroy()}),delete a.stacks[e])})};
y.prototype.setStackedPoints=function(a){var c=a||this.options.stacking;if(c&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var h=this.processedXData,k=this.processedYData,p=[],r=k.length,l=this.options,b=l.threshold,g=f(l.startFromThreshold&&b,0);l=l.stack;a=a?this.type+","+c:this.stackKey;var d="-"+a,m=this.negStacks,v=this.yAxis,x=v.stacking.stacks,u=v.stacking.oldStacks,A,y;v.stacking.stacksTouched+=1;for(y=0;y<r;y++){var z=h[y];var F=k[y];var H=this.getStackIndicator(H,
z,this.index);var G=H.key;var K=(A=m&&F<(g?0:b))?d:a;x[K]||(x[K]={});x[K][z]||(u[K]&&u[K][z]?(x[K][z]=u[K][z],x[K][z].total=null):x[K][z]=new w(v,v.options.stackLabels,A,z,l));K=x[K][z];null!==F?(K.points[G]=K.points[this.index]=[f(K.cumulative,g)],n(K.cumulative)||(K.base=G),K.touched=v.stacking.stacksTouched,0<H.index&&!1===this.singleStacks&&(K.points[G][0]=K.points[this.index+","+z+",0"][0])):K.points[G]=K.points[this.index]=null;"percent"===c?(A=A?a:d,m&&x[A]&&x[A][z]?(A=x[A][z],K.total=A.total=
Math.max(A.total,K.total)+Math.abs(F)||0):K.total=q(K.total+(Math.abs(F)||0))):"group"===c?(e(F)&&(F=F[0]),null!==F&&(K.total=(K.total||0)+1)):K.total=q(K.total+(F||0));K.cumulative="group"===c?(K.total||1)-1:f(K.cumulative,g)+(F||0);null!==F&&(K.points[G].push(K.cumulative),p[y]=K.cumulative,K.hasValidPoints=!0)}"percent"===c&&(v.stacking.usePercentage=!0);"group"!==c&&(this.stackedYData=p);v.stacking.oldStacks={}}};y.prototype.modifyStacks=function(){var a=this,c=a.stackKey,e=a.yAxis.stacking.stacks,
f=a.processedXData,h,k=a.options.stacking;a[k+"Stacker"]&&[c,"-"+c].forEach(function(c){for(var b=f.length,g,d;b--;)if(g=f[b],h=a.getStackIndicator(h,g,a.index,c),d=(g=e[c]&&e[c][g])&&g.points[h.key])a[k+"Stacker"](d,g,b)})};y.prototype.percentStacker=function(a,c,e){c=c.total?100/c.total:0;a[0]=q(a[0]*c);a[1]=q(a[1]*c);this.stackedYData[e]=a[1]};y.prototype.getStackIndicator=function(a,c,e,f){!n(a)||a.x!==c||f&&a.key!==f?a={x:c,index:0,key:f}:a.index++;a.key=[e,c,a.index].join();return a};F.StackItem=
w;"";return F.StackItem});M(a,"Series/Line/LineSeries.js",[a["Core/Series/Series.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,u,z){var v=this&&this.__extends||function(){var a=function(v,q){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,k){a.__proto__=k}||function(a,k){for(var e in k)k.hasOwnProperty(e)&&(a[e]=k[e])};return a(v,q)};return function(v,q){function n(){this.constructor=v}a(v,q);v.prototype=null===q?Object.create(q):(n.prototype=q.prototype,
new n)}}(),y=z.defined,G=z.merge;z=function(u){function A(){var a=null!==u&&u.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}v(A,u);A.prototype.drawGraph=function(){var a=this,n=this.options,k=(this.gappedPath||this.getGraphPath).call(this),e=this.chart.styledMode,c=[["graph","highcharts-graph"]];e||c[0].push(n.lineColor||this.color||"#cccccc",n.dashStyle);c=a.getZonesGraphs(c);c.forEach(function(c,f){var h=c[0],p=a[h],q=p?"animate":"attr";p?(p.endX=a.preventGraphAnimation?
null:k.xMap,p.animate({d:k})):k.length&&(a[h]=p=a.chart.renderer.path(k).addClass(c[1]).attr({zIndex:1}).add(a.group));p&&!e&&(h={stroke:c[2],"stroke-width":n.lineWidth,fill:a.fillGraph&&a.color||"none"},c[3]?h.dashstyle=c[3]:"square"!==n.linecap&&(h["stroke-linecap"]=h["stroke-linejoin"]="round"),p[q](h).shadow(2>f&&n.shadow));p&&(p.startX=k.xMap,p.isArea=k.isArea)})};A.prototype.getGraphPath=function(a,n,k){var e=this,c=e.options,h=[],f=[],q,p=c.step;a=a||e.points;var v=a.reversed;v&&a.reverse();
(p={right:1,center:2}[p]||p&&3)&&v&&(p=4-p);a=this.getValidPoints(a,!1,!(c.connectNulls&&!n&&!k));a.forEach(function(t,v){var w=t.plotX,r=t.plotY,l=a[v-1];(t.leftCliff||l&&l.rightCliff)&&!k&&(q=!0);t.isNull&&!y(n)&&0<v?q=!c.connectNulls:t.isNull&&!n?q=!0:(0===v||q?v=[["M",t.plotX,t.plotY]]:e.getPointSpline?v=[e.getPointSpline(a,t,v)]:p?(v=1===p?[["L",l.plotX,r]]:2===p?[["L",(l.plotX+w)/2,l.plotY],["L",(l.plotX+w)/2,r]]:[["L",w,l.plotY]],v.push(["L",w,r])):v=[["L",w,r]],f.push(t.x),p&&(f.push(t.x),
2===p&&f.push(t.x)),h.push.apply(h,v),q=!1)});h.xMap=f;return e.graphPath=h};A.prototype.getZonesGraphs=function(a){this.zones.forEach(function(n,k){k=["zone-graph-"+k,"highcharts-graph highcharts-zone-graph-"+k+" "+(n.className||"")];this.chart.styledMode||k.push(n.color||this.color,n.dashStyle||this.options.dashStyle);a.push(k)},this);return a};A.defaultOptions=G(a.defaultOptions,{});return A}(a);u.registerSeriesType("line",z);"";return z});M(a,"Series/Area/AreaSeries.js",[a["Core/Color/Color.js"],
a["Core/Legend/LegendSymbol.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,u,z,F){var v=this&&this.__extends||function(){var a=function(e,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&(a[e]=c[e])};return a(e,c)};return function(e,c){function h(){this.constructor=e}a(e,c);e.prototype=null===c?Object.create(c):(h.prototype=c.prototype,new h)}}(),G=a.parse,H=z.seriesTypes.line;a=
F.extend;var A=F.merge,q=F.objectEach,n=F.pick;F=function(a){function e(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.options=void 0;c.points=void 0;return c}v(e,a);e.prototype.drawGraph=function(){this.areaPath=[];a.prototype.drawGraph.apply(this);var c=this,e=this.areaPath,f=this.options,k=[["area","highcharts-area",this.color,f.fillColor]];this.zones.forEach(function(a,e){k.push(["zone-area-"+e,"highcharts-area highcharts-zone-area-"+e+" "+a.className,a.color||c.color,a.fillColor||
f.fillColor])});k.forEach(function(a){var h=a[0],k=c[h],p=k?"animate":"attr",q={};k?(k.endX=c.preventGraphAnimation?null:e.xMap,k.animate({d:e})):(q.zIndex=0,k=c[h]=c.chart.renderer.path(e).addClass(a[1]).add(c.group),k.isArea=!0);c.chart.styledMode||(q.fill=n(a[3],G(a[2]).setOpacity(n(f.fillOpacity,.75)).get()));k[p](q);k.startX=e.xMap;k.shiftUnit=f.step?2:1})};e.prototype.getGraphPath=function(a){var c=H.prototype.getGraphPath,e=this.options,k=e.stacking,p=this.yAxis,q,t=[],v=[],u=this.index,r=
p.stacking.stacks[this.stackKey],l=e.threshold,b=Math.round(p.getThreshold(e.threshold));e=n(e.connectNulls,"percent"===k);var g=function(c,d,e){var g=a[c];c=k&&r[g.x].points[u];var f=g[e+"Null"]||0;e=g[e+"Cliff"]||0;g=!0;if(e||f){var h=(f?c[0]:c[1])+e;var n=c[0]+e;g=!!f}else!k&&a[d]&&a[d].isNull&&(h=n=l);"undefined"!==typeof h&&(v.push({plotX:m,plotY:null===h?b:p.getThreshold(h),isNull:g,isCliff:!0}),t.push({plotX:m,plotY:null===n?b:p.getThreshold(n),doCurve:!1}))};a=a||this.points;k&&(a=this.getStackPoints(a));
for(q=0;q<a.length;q++){k||(a[q].leftCliff=a[q].rightCliff=a[q].leftNull=a[q].rightNull=void 0);var d=a[q].isNull;var m=n(a[q].rectPlotX,a[q].plotX);var D=k?n(a[q].yBottom,b):b;if(!d||e)e||g(q,q-1,"left"),d&&!k&&e||(v.push(a[q]),t.push({x:q,plotX:m,plotY:D})),e||g(q,q+1,"right")}q=c.call(this,v,!0,!0);t.reversed=!0;d=c.call(this,t,!0,!0);(D=d[0])&&"M"===D[0]&&(d[0]=["L",D[1],D[2]]);d=q.concat(d);d.length&&d.push(["Z"]);c=c.call(this,v,!1,e);d.xMap=q.xMap;this.areaPath=d;return c};e.prototype.getStackPoints=
function(a){var c=this,e=[],k=[],p=this.xAxis,v=this.yAxis,t=v.stacking.stacks[this.stackKey],u={},C=v.series,r=C.length,l=v.options.reversedStacks?1:-1,b=C.indexOf(c);a=a||this.points;if(this.options.stacking){for(var g=0;g<a.length;g++)a[g].leftNull=a[g].rightNull=void 0,u[a[g].x]=a[g];q(t,function(a,b){null!==a.total&&k.push(b)});k.sort(function(a,b){return a-b});var d=C.map(function(a){return a.visible});k.forEach(function(a,g){var f=0,h,m;if(u[a]&&!u[a].isNull)e.push(u[a]),[-1,1].forEach(function(e){var f=
1===e?"rightNull":"leftNull",n=0,p=t[k[g+e]];if(p)for(var q=b;0<=q&&q<r;){var v=C[q].index;h=p.points[v];h||(v===c.index?u[a][f]=!0:d[q]&&(m=t[a].points[v])&&(n-=m[1]-m[0]));q+=l}u[a][1===e?"rightCliff":"leftCliff"]=n});else{for(var q=b;0<=q&&q<r;){if(h=t[a].points[C[q].index]){f=h[1];break}q+=l}f=n(f,0);f=v.translate(f,0,1,0,1);e.push({isNull:!0,plotX:p.translate(a,0,0,0,1),x:a,plotY:f,yBottom:f})}})}return e};e.defaultOptions=A(H.defaultOptions,{threshold:0});return e}(H);a(F.prototype,{singleStacks:!1,
drawLegendSymbol:u.drawRectangle});z.registerSeriesType("area",F);"";return F});M(a,"Series/Spline/SplineSeries.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,u){var v=this&&this.__extends||function(){var a=function(v,q){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,k){a.__proto__=k}||function(a,k){for(var e in k)k.hasOwnProperty(e)&&(a[e]=k[e])};return a(v,q)};return function(v,q){function n(){this.constructor=v}a(v,q);v.prototype=null===q?Object.create(q):
(n.prototype=q.prototype,new n)}}(),F=a.seriesTypes.line,y=u.merge,G=u.pick;u=function(a){function u(){var q=null!==a&&a.apply(this,arguments)||this;q.data=void 0;q.options=void 0;q.points=void 0;return q}v(u,a);u.prototype.getPointSpline=function(a,n,k){var e=n.plotX||0,c=n.plotY||0,h=a[k-1];k=a[k+1];if(h&&!h.isNull&&!1!==h.doCurve&&!n.isCliff&&k&&!k.isNull&&!1!==k.doCurve&&!n.isCliff){a=h.plotY||0;var f=k.plotX||0;k=k.plotY||0;var q=0;var p=(1.5*e+(h.plotX||0))/2.5;var v=(1.5*c+a)/2.5;f=(1.5*e+
f)/2.5;var t=(1.5*c+k)/2.5;f!==p&&(q=(t-v)*(f-e)/(f-p)+c-t);v+=q;t+=q;v>a&&v>c?(v=Math.max(a,c),t=2*c-v):v<a&&v<c&&(v=Math.min(a,c),t=2*c-v);t>k&&t>c?(t=Math.max(k,c),v=2*c-t):t<k&&t<c&&(t=Math.min(k,c),v=2*c-t);n.rightContX=f;n.rightContY=t}n=["C",G(h.rightContX,h.plotX,0),G(h.rightContY,h.plotY,0),G(p,e,0),G(v,c,0),e,c];h.rightContX=h.rightContY=void 0;return n};u.defaultOptions=y(F.defaultOptions);return u}(F);a.registerSeriesType("spline",u);"";return u});M(a,"Series/AreaSpline/AreaSplineSeries.js",
[a["Series/Area/AreaSeries.js"],a["Series/Spline/SplineSeries.js"],a["Core/Legend/LegendSymbol.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,u,z,F,y){var v=this&&this.__extends||function(){var a=function(k,e){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,e){a.__proto__=e}||function(a,e){for(var c in e)e.hasOwnProperty(c)&&(a[c]=e[c])};return a(k,e)};return function(k,e){function c(){this.constructor=k}a(k,e);k.prototype=null===e?Object.create(e):
(c.prototype=e.prototype,new c)}}(),H=a.prototype,A=y.extend,q=y.merge;y=function(n){function k(){var a=null!==n&&n.apply(this,arguments)||this;a.data=void 0;a.points=void 0;a.options=void 0;return a}v(k,n);k.defaultOptions=q(u.defaultOptions,a.defaultOptions);return k}(u);A(y.prototype,{getGraphPath:H.getGraphPath,getStackPoints:H.getStackPoints,drawGraph:H.drawGraph,drawLegendSymbol:z.drawRectangle});F.registerSeriesType("areaspline",y);"";return y});M(a,"Series/Column/ColumnSeries.js",[a["Core/Animation/AnimationUtilities.js"],
a["Core/Color/Color.js"],a["Core/Globals.js"],a["Core/Legend/LegendSymbol.js"],a["Core/Series/Series.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,u,z,F,y,G,H){var v=this&&this.__extends||function(){var a=function(c,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return a(c,b)};return function(c,b){function e(){this.constructor=c}a(c,b);c.prototype=null===b?Object.create(b):
(e.prototype=b.prototype,new e)}}(),q=a.animObject,n=u.parse,k=z.hasTouch;a=z.noop;var e=H.clamp,c=H.css,h=H.defined,f=H.extend,w=H.fireEvent,p=H.isArray,B=H.isNumber,t=H.merge,J=H.pick,C=H.objectEach;H=function(a){function l(){var b=null!==a&&a.apply(this,arguments)||this;b.borderWidth=void 0;b.data=void 0;b.group=void 0;b.options=void 0;b.points=void 0;return b}v(l,a);l.prototype.animate=function(a){var b=this,c=this.yAxis,h=b.options,l=this.chart.inverted,k={},n=l?"translateX":"translateY";if(a)k.scaleY=
.001,a=e(c.toPixels(h.threshold),c.pos,c.pos+c.len),l?k.translateX=a-c.len:k.translateY=a,b.clipBox&&b.setClip(),b.group.attr(k);else{var p=Number(b.group.attr(n));b.group.animate({scaleY:1},f(q(b.options.animation),{step:function(a,d){b.group&&(k[n]=p+d.pos*(c.pos-p),b.group.attr(k))}}))}};l.prototype.init=function(b,c){a.prototype.init.apply(this,arguments);var d=this;b=d.chart;b.hasRendered&&b.series.forEach(function(a){a.type===d.type&&(a.isDirty=!0)})};l.prototype.getColumnMetrics=function(){var a=
this,c=a.options,d=a.xAxis,e=a.yAxis,f=d.options.reversedStacks;f=d.reversed&&!f||!d.reversed&&f;var h={},l,k=0;!1===c.grouping?k=1:a.chart.series.forEach(function(b){var c=b.yAxis,d=b.options;if(b.type===a.type&&(b.visible||!a.chart.options.chart.ignoreHiddenSeries)&&e.len===c.len&&e.pos===c.pos){if(d.stacking&&"group"!==d.stacking){l=b.stackKey;"undefined"===typeof h[l]&&(h[l]=k++);var g=h[l]}else!1!==d.grouping&&(g=k++);b.columnIndex=g}});var n=Math.min(Math.abs(d.transA)*(d.ordinal&&d.ordinal.slope||
c.pointRange||d.closestPointRange||d.tickInterval||1),d.len),p=n*c.groupPadding,r=(n-2*p)/(k||1);c=Math.min(c.maxPointWidth||d.len,J(c.pointWidth,r*(1-2*c.pointPadding)));a.columnMetrics={width:c,offset:(r-c)/2+(p+((a.columnIndex||0)+(f?1:0))*r-n/2)*(f?-1:1),paddedWidth:r,columnCount:k};return a.columnMetrics};l.prototype.crispCol=function(a,c,d,e){var b=this.chart,g=this.borderWidth,f=-(g%2?.5:0);g=g%2?.5:1;b.inverted&&b.renderer.isVML&&(g+=1);this.options.crisp&&(d=Math.round(a+d)+f,a=Math.round(a)+
f,d-=a);e=Math.round(c+e)+g;f=.5>=Math.abs(c)&&.5<e;c=Math.round(c)+g;e-=c;f&&e&&(--c,e+=1);return{x:a,y:c,width:d,height:e}};l.prototype.adjustForMissingColumns=function(a,c,d,e){var b=this,g=this.options.stacking;if(!d.isNull&&1<e.columnCount){var f=0,h=0;C(this.yAxis.stacking&&this.yAxis.stacking.stacks,function(a){if("number"===typeof d.x&&(a=a[d.x.toString()])){var c=a.points[b.index],e=a.total;g?(c&&(f=h),a.hasValidPoints&&h++):p(c)&&(f=c[1],h=e||0)}});a=(d.plotX||0)+((h-1)*e.paddedWidth+c)/
2-c-f*e.paddedWidth}return a};l.prototype.translate=function(){var a=this,c=a.chart,d=a.options,f=a.dense=2>a.closestPointRange*a.xAxis.transA;f=a.borderWidth=J(d.borderWidth,f?0:1);var l=a.xAxis,k=a.yAxis,n=d.threshold,p=a.translatedThreshold=k.getThreshold(n),r=J(d.minPointLength,5),q=a.getColumnMetrics(),t=q.width,v=a.pointXOffset=q.offset,u=a.dataMin,w=a.dataMax,C=a.barW=Math.max(t,1+2*f);c.inverted&&(p-=.5);d.pointPadding&&(C=Math.ceil(C));y.prototype.translate.apply(a);a.points.forEach(function(b){var g=
J(b.yBottom,p),f=999+Math.abs(g),m=b.plotX||0;f=e(b.plotY,-f,k.len+f);var x=Math.min(f,g),D=Math.max(f,g)-x,y=t,A=m+v,z=C;r&&Math.abs(D)<r&&(D=r,m=!k.reversed&&!b.negative||k.reversed&&b.negative,B(n)&&B(w)&&b.y===n&&w<=n&&(k.min||0)<n&&(u!==w||(k.max||0)<=n)&&(m=!m),x=Math.abs(x-p)>r?g-r:p-(m?r:0));h(b.options.pointWidth)&&(y=z=Math.ceil(b.options.pointWidth),A-=Math.round((y-t)/2));d.centerInCategory&&(A=a.adjustForMissingColumns(A,y,b,q));b.barX=A;b.pointWidth=y;b.tooltipPos=c.inverted?[e(k.len+
k.pos-c.plotLeft-f,k.pos-c.plotLeft,k.len+k.pos-c.plotLeft),l.len+l.pos-c.plotTop-A-z/2,D]:[l.left-c.plotLeft+A+z/2,e(f+k.pos-c.plotTop,k.pos-c.plotTop,k.len+k.pos-c.plotTop),D];b.shapeType=a.pointClass.prototype.shapeType||"rect";b.shapeArgs=a.crispCol.apply(a,b.isNull?[A,p,z,0]:[A,x,z,D])})};l.prototype.drawGraph=function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")};l.prototype.pointAttribs=function(a,c){var b=this.options,e=this.pointAttrToOptions||{},g=e.stroke||
"borderColor",f=e["stroke-width"]||"borderWidth",h=a&&a.color||this.color,l=a&&a[g]||b[g]||h;e=a&&a.options.dashStyle||b.dashStyle;var k=a&&a[f]||b[f]||this[f]||0,p=J(a&&a.opacity,b.opacity,1);if(a&&this.zones.length){var r=a.getZone();h=a.options.color||r&&(r.color||a.nonZonedColor)||this.color;r&&(l=r.borderColor||l,e=r.dashStyle||e,k=r.borderWidth||k)}c&&a&&(a=t(b.states[c],a.options.states&&a.options.states[c]||{}),c=a.brightness,h=a.color||"undefined"!==typeof c&&n(h).brighten(a.brightness).get()||
h,l=a[g]||l,k=a[f]||k,e=a.dashStyle||e,p=J(a.opacity,p));g={fill:h,stroke:l,"stroke-width":k,opacity:p};e&&(g.dashstyle=e);return g};l.prototype.drawPoints=function(){var a=this,c=this.chart,d=a.options,e=c.renderer,f=d.animationLimit||250,h;a.points.forEach(function(b){var g=b.graphic,l=!!g,k=g&&c.pointCount<f?"animate":"attr";if(B(b.plotY)&&null!==b.y){h=b.shapeArgs;g&&b.hasNewShapeType()&&(g=g.destroy());a.enabledDataSorting&&(b.startXPos=a.xAxis.reversed?-(h?h.width||0:0):a.xAxis.width);g||(b.graphic=
g=e[b.shapeType](h).add(b.group||a.group))&&a.enabledDataSorting&&c.hasRendered&&c.pointCount<f&&(g.attr({x:b.startXPos}),l=!0,k="animate");if(g&&l)g[k](t(h));if(d.borderRadius)g[k]({r:d.borderRadius});c.styledMode||g[k](a.pointAttribs(b,b.selected&&"select")).shadow(!1!==b.allowShadow&&d.shadow,null,d.stacking&&!d.borderRadius);g&&(g.addClass(b.getClassName(),!0),g.attr({visibility:b.visible?"inherit":"hidden"}))}else g&&(b.graphic=g.destroy())})};l.prototype.drawTracker=function(){var a=this,e=
a.chart,d=e.pointer,f=function(a){var b=d.getPointFromEvent(a);"undefined"!==typeof b&&(d.isDirectTouch=!0,b.onMouseOver(a))},h;a.points.forEach(function(a){h=p(a.dataLabels)?a.dataLabels:a.dataLabel?[a.dataLabel]:[];a.graphic&&(a.graphic.element.point=a);h.forEach(function(b){b.div?b.div.point=a:b.element.point=a})});a._hasTracking||(a.trackerGroups.forEach(function(b){if(a[b]){a[b].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){d.onTrackerMouseOut(a)});if(k)a[b].on("touchstart",
f);!e.styledMode&&a.options.cursor&&a[b].css(c).css({cursor:a.options.cursor})}}),a._hasTracking=!0);w(this,"afterDrawTracker")};l.prototype.remove=function(){var a=this,c=a.chart;c.hasRendered&&c.series.forEach(function(b){b.type===a.type&&(b.isDirty=!0)});y.prototype.remove.apply(a,arguments)};l.defaultOptions=t(y.defaultOptions,{borderRadius:0,centerInCategory:!1,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},
select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:void 0,verticalAlign:void 0,y:void 0},startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"});return l}(y);f(H.prototype,{cropShoulder:0,directTouch:!0,drawLegendSymbol:F.drawRectangle,getSymbol:a,negStacks:!0,trackerGroups:["group","dataLabelsGroup"]});G.registerSeriesType("column",H);"";"";return H});M(a,"Core/Series/DataLabel.js",[a["Core/Animation/AnimationUtilities.js"],a["Core/FormatUtilities.js"],
a["Core/Utilities.js"]],function(a,u,z){var v=a.getDeferredAnimation,y=u.format,G=z.defined,H=z.extend,A=z.fireEvent,q=z.isArray,n=z.merge,k=z.objectEach,e=z.pick,c=z.splat,h;(function(a){function f(a,b,c,d,f){var g=this,h=this.chart,l=this.isCartesian&&h.inverted,k=this.enabledDataSorting,m=e(a.dlBox&&a.dlBox.centerX,a.plotX,-9999),n=e(a.plotY,-9999),p=b.getBBox(),r=c.rotation,q=c.align,t=h.isInsidePlot(m,Math.round(n),{inverted:l,paneCoordinates:!0,series:g}),v=function(c){k&&g.xAxis&&!u&&g.setDataLabelStartPos(a,
b,f,t,c)},u="justify"===e(c.overflow,k?"none":"justify"),w=this.visible&&!1!==a.visible&&(a.series.forceDL||k&&!u||t||e(c.inside,!!this.options.stacking)&&d&&h.isInsidePlot(m,l?d.x+1:d.y+d.height-1,{inverted:l,paneCoordinates:!0,series:g}));if(w){var C=h.renderer.fontMetrics(h.styledMode?void 0:c.style.fontSize,b).b;d=H({x:l?this.yAxis.len-n:m,y:Math.round(l?this.xAxis.len-m:n),width:0,height:0},d);H(c,{width:p.width,height:p.height});r?(u=!1,m=h.renderer.rotCorr(C,r),m={x:d.x+(c.x||0)+d.width/2+
m.x,y:d.y+(c.y||0)+{top:0,middle:.5,bottom:1}[c.verticalAlign]*d.height},v(m),b[f?"attr":"animate"](m).attr({align:q}),v=(r+720)%360,v=180<v&&360>v,"left"===q?m.y-=v?p.height:0:"center"===q?(m.x-=p.width/2,m.y-=p.height/2):"right"===q&&(m.x-=p.width,m.y-=v?0:p.height),b.placed=!0,b.alignAttr=m):(v(d),b.align(c,void 0,d),m=b.alignAttr);u&&0<=d.height?this.justifyDataLabel(b,c,m,p,d,f):e(c.crop,!0)&&(w=h.isInsidePlot(m.x,m.y,{paneCoordinates:!0,series:g})&&h.isInsidePlot(m.x+p.width,m.y+p.height,{paneCoordinates:!0,
series:g}));if(c.shape&&!r)b[f?"attr":"animate"]({anchorX:l?h.plotWidth-a.plotY:a.plotX,anchorY:l?h.plotHeight-a.plotX:a.plotY})}f&&k&&(b.placed=!1);w||k&&!u||(b.hide(!0),b.placed=!1)}function h(a,b){var c=b.filter;return c?(b=c.operator,a=a[c.property],c=c.value,">"===b&&a>c||"<"===b&&a<c||">="===b&&a>=c||"<="===b&&a<=c||"=="===b&&a==c||"==="===b&&a===c?!0:!1):!0}function u(){var a=this,b=a.chart,g=a.options,d=a.points,f=a.hasRendered||0,n=b.renderer,p=g.dataLabels,r,t=p.animation;t=p.defer?v(b,
t,a):{defer:0,duration:0};p=z(z(b.options.plotOptions&&b.options.plotOptions.series&&b.options.plotOptions.series.dataLabels,b.options.plotOptions&&b.options.plotOptions[a.type]&&b.options.plotOptions[a.type].dataLabels),p);A(this,"drawDataLabels");if(q(p)||p.enabled||a._hasPointLabels){var u=a.plotGroup("dataLabelsGroup","data-labels",f?"inherit":"hidden",p.zIndex||6);u.attr({opacity:+f});!f&&(f=a.dataLabelsGroup)&&(a.visible&&u.show(!0),f[g.animation?"animate":"attr"]({opacity:1},t));d.forEach(function(d){r=
c(z(p,d.dlOptions||d.options&&d.options.dataLabels));r.forEach(function(c,f){var l=c.enabled&&(!d.isNull||d.dataLabelOnNull)&&h(d,c),m=d.connectors?d.connectors[f]:d.connector,p=d.dataLabels?d.dataLabels[f]:d.dataLabel,r=e(c.distance,d.labelDistance),q=!p;if(l){var t=d.getLabelConfig();var v=e(c[d.formatPrefix+"Format"],c.format);t=G(v)?y(v,t,b):(c[d.formatPrefix+"Formatter"]||c.formatter).call(t,c);v=c.style;var w=c.rotation;b.styledMode||(v.color=e(c.color,v.color,a.color,"#000000"),"contrast"===
v.color?(d.contrastColor=n.getContrast(d.color||a.color),v.color=!G(r)&&c.inside||0>r||g.stacking?d.contrastColor:"#000000"):delete d.contrastColor,g.cursor&&(v.cursor=g.cursor));var C={r:c.borderRadius||0,rotation:w,padding:c.padding,zIndex:1};b.styledMode||(C.fill=c.backgroundColor,C.stroke=c.borderColor,C["stroke-width"]=c.borderWidth);k(C,function(a,b){"undefined"===typeof a&&delete C[b]})}!p||l&&G(t)&&!!p.div===!!c.useHTML||(d.dataLabel=p=d.dataLabel&&d.dataLabel.destroy(),d.dataLabels&&(1===
d.dataLabels.length?delete d.dataLabels:delete d.dataLabels[f]),f||delete d.dataLabel,m&&(d.connector=d.connector.destroy(),d.connectors&&(1===d.connectors.length?delete d.connectors:delete d.connectors[f])));l&&G(t)&&(p?C.text=t:(d.dataLabels=d.dataLabels||[],p=d.dataLabels[f]=w?n.text(t,0,-9999,c.useHTML).addClass("highcharts-data-label"):n.label(t,0,-9999,c.shape,null,null,c.useHTML,null,"data-label"),f||(d.dataLabel=p),p.addClass(" highcharts-data-label-color-"+d.colorIndex+" "+(c.className||
"")+(c.useHTML?" highcharts-tracker":""))),p.options=c,p.attr(C),b.styledMode||p.css(v).shadow(c.shadow),p.added||p.add(u),c.textPath&&!c.useHTML&&(p.setTextPath(d.getDataLabelPath&&d.getDataLabelPath(p)||d.graphic,c.textPath),d.dataLabelPath&&!c.textPath.enabled&&(d.dataLabelPath=d.dataLabelPath.destroy())),a.alignDataLabel(d,p,c,null,q))})})}A(this,"afterDrawDataLabels")}function t(a,b,c,d,e,f){var g=this.chart,h=b.align,k=b.verticalAlign,l=a.box?0:a.padding||0,m=b.x;m=void 0===m?0:m;var n=b.y;
n=void 0===n?0:n;var p=(c.x||0)+l;if(0>p){"right"===h&&0<=m?(b.align="left",b.inside=!0):m-=p;var r=!0}p=(c.x||0)+d.width-l;p>g.plotWidth&&("left"===h&&0>=m?(b.align="right",b.inside=!0):m+=g.plotWidth-p,r=!0);p=c.y+l;0>p&&("bottom"===k&&0<=n?(b.verticalAlign="top",b.inside=!0):n-=p,r=!0);p=(c.y||0)+d.height-l;p>g.plotHeight&&("top"===k&&0>=n?(b.verticalAlign="bottom",b.inside=!0):n+=g.plotHeight-p,r=!0);r&&(b.x=m,b.y=n,a.placed=!f,a.align(b,void 0,e));return r}function z(a,b){var c=[],d;if(q(a)&&
!q(b))c=a.map(function(a){return n(a,b)});else if(q(b)&&!q(a))c=b.map(function(b){return n(a,b)});else if(q(a)||q(b))for(d=Math.max(a.length,b.length);d--;)c[d]=n(a[d],b[d]);else c=n(a,b);return c}function C(a,b,c,d,e){var g=this.chart,f=g.inverted,h=this.xAxis,k=h.reversed,l=f?b.height/2:b.width/2;a=(a=a.pointWidth)?a/2:0;b.startXPos=f?e.x:k?-l-a:h.width-l+a;b.startYPos=f?k?this.yAxis.height-l+a:-l-a:e.y;d?"hidden"===b.visibility&&(b.show(),b.attr({opacity:0}).animate({opacity:1})):b.attr({opacity:1}).animate({opacity:0},
void 0,b.hide);g.hasRendered&&(c&&b.attr({x:b.startXPos,y:b.startYPos}),b.placed=!0)}var r=[];a.compose=function(a){if(-1===r.indexOf(a)){var b=a.prototype;r.push(a);b.alignDataLabel=f;b.drawDataLabels=u;b.justifyDataLabel=t;b.setDataLabelStartPos=C}}})(h||(h={}));"";return h});M(a,"Series/Column/ColumnDataLabel.js",[a["Core/Series/DataLabel.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,u,z){var v=u.series,y=z.merge,G=z.pick,H;(function(u){function q(a,e,c,h,f){var k=
this.chart.inverted,n=a.series,q=(n.xAxis?n.xAxis.len:this.chart.plotSizeX)||0;n=(n.yAxis?n.yAxis.len:this.chart.plotSizeY)||0;var t=a.dlBox||a.shapeArgs,u=G(a.below,a.plotY>G(this.translatedThreshold,n)),C=G(c.inside,!!this.options.stacking);t&&(h=y(t),0>h.y&&(h.height+=h.y,h.y=0),t=h.y+h.height-n,0<t&&t<h.height&&(h.height-=t),k&&(h={x:n-h.y-h.height,y:q-h.x-h.width,width:h.height,height:h.width}),C||(k?(h.x+=u?0:h.width,h.width=0):(h.y+=u?h.height:0,h.height=0)));c.align=G(c.align,!k||C?"center":
u?"right":"left");c.verticalAlign=G(c.verticalAlign,k||C?"middle":u?"top":"bottom");v.prototype.alignDataLabel.call(this,a,e,c,h,f);c.inside&&a.contrastColor&&e.css({color:a.contrastColor})}var n=[];u.compose=function(k){a.compose(v);-1===n.indexOf(k)&&(n.push(k),k.prototype.alignDataLabel=q)}})(H||(H={}));return H});M(a,"Series/Bar/BarSeries.js",[a["Series/Column/ColumnSeries.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,u,z){var v=this&&this.__extends||function(){var a=
function(v,q){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,k){a.__proto__=k}||function(a,k){for(var e in k)k.hasOwnProperty(e)&&(a[e]=k[e])};return a(v,q)};return function(v,q){function n(){this.constructor=v}a(v,q);v.prototype=null===q?Object.create(q):(n.prototype=q.prototype,new n)}}(),y=z.extend,G=z.merge;z=function(u){function y(){var a=null!==u&&u.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}v(y,u);y.defaultOptions=G(a.defaultOptions,
{});return y}(a);y(z.prototype,{inverted:!0});u.registerSeriesType("bar",z);"";return z});M(a,"Series/Scatter/ScatterSeries.js",[a["Series/Column/ColumnSeries.js"],a["Series/Line/LineSeries.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,u,z,F){var v=this&&this.__extends||function(){var a=function(n,k){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&(a[e]=c[e])};return a(n,k)};return function(n,
k){function e(){this.constructor=n}a(n,k);n.prototype=null===k?Object.create(k):(e.prototype=k.prototype,new e)}}(),G=F.addEvent,H=F.extend,A=F.merge;F=function(a){function n(){var k=null!==a&&a.apply(this,arguments)||this;k.data=void 0;k.options=void 0;k.points=void 0;return k}v(n,a);n.prototype.applyJitter=function(){var a=this,e=this.options.jitter,c=this.points.length;e&&this.points.forEach(function(h,f){["x","y"].forEach(function(k,n){var p="plot"+k.toUpperCase();if(e[k]&&!h.isNull){var q=a[k+
"Axis"];var v=e[k]*q.transA;if(q&&!q.isLog){var u=Math.max(0,h[p]-v);q=Math.min(q.len,h[p]+v);n=1E4*Math.sin(f+n*c);h[p]=u+(q-u)*(n-Math.floor(n));"x"===k&&(h.clientX=h.plotX)}}})})};n.prototype.drawGraph=function(){this.options.lineWidth?a.prototype.drawGraph.call(this):this.graph&&(this.graph=this.graph.destroy())};n.defaultOptions=A(u.defaultOptions,{lineWidth:0,findNearestPointBy:"xy",jitter:{x:0,y:0},marker:{enabled:!0},tooltip:{headerFormat:'<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}});return n}(u);H(F.prototype,{drawTracker:a.prototype.drawTracker,sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1});G(F,"afterTranslate",function(){this.applyJitter()});z.registerSeriesType("scatter",F);"";return F});M(a,"Series/CenteredUtilities.js",[a["Core/Globals.js"],a["Core/Series/Series.js"],a["Core/Utilities.js"]],function(a,u,z){var v=a.deg2rad,y=z.isNumber,
G=z.pick,H=z.relativeLength,A;(function(a){a.getCenter=function(){var a=this.options,k=this.chart,e=2*(a.slicedOffset||0),c=k.plotWidth-2*e,h=k.plotHeight-2*e,f=a.center,q=Math.min(c,h),p=a.size,v=a.innerSize||0;"string"===typeof p&&(p=parseFloat(p));"string"===typeof v&&(v=parseFloat(v));a=[G(f[0],"50%"),G(f[1],"50%"),G(p&&0>p?void 0:a.size,"100%"),G(v&&0>v?void 0:a.innerSize||0,"0%")];!k.angular||this instanceof u||(a[3]=0);for(f=0;4>f;++f)p=a[f],k=2>f||2===f&&/%$/.test(p),a[f]=H(p,[c,h,q,a[2]][f])+
(k?e:0);a[3]>a[2]&&(a[3]=a[2]);return a};a.getStartAndEndRadians=function(a,k){a=y(a)?a:0;k=y(k)&&k>a&&360>k-a?k:a+360;return{start:v*(a+-90),end:v*(k+-90)}}})(A||(A={}));"";return A});M(a,"Series/Pie/PiePoint.js",[a["Core/Animation/AnimationUtilities.js"],a["Core/Series/Point.js"],a["Core/Utilities.js"]],function(a,u,z){var v=this&&this.__extends||function(){var a=function(e,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&
(a[e]=c[e])};return a(e,c)};return function(e,c){function h(){this.constructor=e}a(e,c);e.prototype=null===c?Object.create(c):(h.prototype=c.prototype,new h)}}(),y=a.setAnimation,G=z.addEvent,H=z.defined;a=z.extend;var A=z.isNumber,q=z.pick,n=z.relativeLength;u=function(a){function e(){var c=null!==a&&a.apply(this,arguments)||this;c.labelDistance=void 0;c.options=void 0;c.series=void 0;return c}v(e,a);e.prototype.getConnectorPath=function(){var a=this.labelPosition,e=this.series.options.dataLabels,
f=this.connectorShapes,k=e.connectorShape;f[k]&&(k=f[k]);return k.call(this,{x:a.final.x,y:a.final.y,alignment:a.alignment},a.connectorPosition,e)};e.prototype.getTranslate=function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}};e.prototype.haloPath=function(a){var c=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.x,c.y,c.r+a,c.r+a,{innerR:c.r-1,start:c.start,end:c.end})};e.prototype.init=function(){var c=this;a.prototype.init.apply(this,
arguments);this.name=q(this.name,"Slice");var e=function(a){c.slice("select"===a.type)};G(this,"select",e);G(this,"unselect",e);return this};e.prototype.isValid=function(){return A(this.y)&&0<=this.y};e.prototype.setVisible=function(a,e){var c=this,h=this.series,k=h.chart,n=h.options.ignoreHiddenPoint;e=q(e,n);a!==this.visible&&(this.visible=this.options.visible=a="undefined"===typeof a?!this.visible:a,h.options.data[h.data.indexOf(this)]=this.options,["graphic","dataLabel","connector","shadowGroup"].forEach(function(e){if(c[e])c[e][a?
"show":"hide"](a)}),this.legendItem&&k.legend.colorizeItem(this,a),a||"hover"!==this.state||this.setState(""),n&&(h.isDirty=!0),e&&k.redraw())};e.prototype.slice=function(a,e,f){var c=this.series;y(f,c.chart);q(e,!0);this.sliced=this.options.sliced=H(a)?a:!this.sliced;c.options.data[c.data.indexOf(this)]=this.options;this.graphic&&this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())};return e}(u);a(u.prototype,{connectorShapes:{fixedOffset:function(a,
e,c){var h=e.breakAt;e=e.touchingSliceAt;return[["M",a.x,a.y],c.softConnector?["C",a.x+("left"===a.alignment?-5:5),a.y,2*h.x-e.x,2*h.y-e.y,h.x,h.y]:["L",h.x,h.y],["L",e.x,e.y]]},straight:function(a,e){e=e.touchingSliceAt;return[["M",a.x,a.y],["L",e.x,e.y]]},crookedLine:function(a,e,c){e=e.touchingSliceAt;var h=this.series,f=h.center[0],k=h.chart.plotWidth,p=h.chart.plotLeft;h=a.alignment;var q=this.shapeArgs.r;c=n(c.crookDistance,1);k="left"===h?f+q+(k+p-f-q)*(1-c):p+(f-q)*c;c=["L",k,a.y];f=!0;if("left"===
h?k>a.x||k<e.x:k<a.x||k>e.x)f=!1;a=[["M",a.x,a.y]];f&&a.push(c);a.push(["L",e.x,e.y]);return a}}});return u});M(a,"Series/Pie/PieSeries.js",[a["Series/CenteredUtilities.js"],a["Series/Column/ColumnSeries.js"],a["Core/Globals.js"],a["Core/Legend/LegendSymbol.js"],a["Series/Pie/PiePoint.js"],a["Core/Series/Series.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Renderer/SVG/Symbols.js"],a["Core/Utilities.js"]],function(a,u,z,F,y,G,H,A,q){var n=this&&this.__extends||function(){var a=function(c,e){a=Object.setPrototypeOf||
{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&(a[e]=c[e])};return a(c,e)};return function(c,e){function f(){this.constructor=c}a(c,e);c.prototype=null===e?Object.create(e):(f.prototype=e.prototype,new f)}}(),k=a.getStartAndEndRadians;z=z.noop;var e=q.clamp,c=q.extend,h=q.fireEvent,f=q.merge,v=q.pick,p=q.relativeLength;q=function(a){function c(){var c=null!==a&&a.apply(this,arguments)||this;c.center=void 0;c.data=void 0;c.maxLabelDistance=
void 0;c.options=void 0;c.points=void 0;return c}n(c,a);c.prototype.animate=function(a){var c=this,e=c.points,f=c.startAngleRad;a||e.forEach(function(a){var b=a.graphic,d=a.shapeArgs;b&&d&&(b.attr({r:v(a.startR,c.center&&c.center[3]/2),start:f,end:f}),b.animate({r:d.r,start:d.start,end:d.end},c.options.animation))})};c.prototype.drawEmpty=function(){var a=this.startAngleRad,c=this.endAngleRad,e=this.options;if(0===this.total&&this.center){var f=this.center[0];var b=this.center[1];this.graph||(this.graph=
this.chart.renderer.arc(f,b,this.center[1]/2,0,a,c).addClass("highcharts-empty-series").add(this.group));this.graph.attr({d:A.arc(f,b,this.center[2]/2,0,{start:a,end:c,innerR:this.center[3]/2})});this.chart.styledMode||this.graph.attr({"stroke-width":e.borderWidth,fill:e.fillColor||"none",stroke:e.color||"#cccccc"})}else this.graph&&(this.graph=this.graph.destroy())};c.prototype.drawPoints=function(){var a=this.chart.renderer;this.points.forEach(function(c){c.graphic&&c.hasNewShapeType()&&(c.graphic=
c.graphic.destroy());c.graphic||(c.graphic=a[c.shapeType](c.shapeArgs).add(c.series.group),c.delayedRendering=!0)})};c.prototype.generatePoints=function(){a.prototype.generatePoints.call(this);this.updateTotals()};c.prototype.getX=function(a,c,f){var h=this.center,b=this.radii?this.radii[f.index]||0:h[2]/2;a=Math.asin(e((a-h[1])/(b+f.labelDistance),-1,1));return h[0]+(c?-1:1)*Math.cos(a)*(b+f.labelDistance)+(0<f.labelDistance?(c?-1:1)*this.options.dataLabels.padding:0)};c.prototype.hasData=function(){return!!this.processedXData.length};
c.prototype.redrawPoints=function(){var a=this,c=a.chart,e=c.renderer,h=a.options.shadow,b,g,d,k;this.drawEmpty();!h||a.shadowGroup||c.styledMode||(a.shadowGroup=e.g("shadow").attr({zIndex:-1}).add(a.group));a.points.forEach(function(l){var m={};g=l.graphic;if(!l.isNull&&g){var n=void 0;k=l.shapeArgs;b=l.getTranslate();c.styledMode||(n=l.shadowGroup,h&&!n&&(n=l.shadowGroup=e.g("shadow").add(a.shadowGroup)),n&&n.attr(b),d=a.pointAttribs(l,l.selected&&"select"));l.delayedRendering?(g.setRadialReference(a.center).attr(k).attr(b),
c.styledMode||g.attr(d).attr({"stroke-linejoin":"round"}).shadow(h,n),l.delayedRendering=!1):(g.setRadialReference(a.center),c.styledMode||f(!0,m,d),f(!0,m,k,b),g.animate(m));g.attr({visibility:l.visible?"inherit":"hidden"});g.addClass(l.getClassName(),!0)}else g&&(l.graphic=g.destroy())})};c.prototype.sortByAngle=function(a,c){a.sort(function(a,e){return"undefined"!==typeof a.angle&&(e.angle-a.angle)*c})};c.prototype.translate=function(a){this.generatePoints();var c=this.options,e=c.slicedOffset,
f=e+(c.borderWidth||0),b=k(c.startAngle,c.endAngle),g=this.startAngleRad=b.start;b=(this.endAngleRad=b.end)-g;var d=this.points,m=c.dataLabels.distance;c=c.ignoreHiddenPoint;var n=d.length,q,t=0;a||(this.center=a=this.getCenter());for(q=0;q<n;q++){var u=d[q];var w=g+t*b;!u.isValid()||c&&!u.visible||(t+=u.percentage/100);var y=g+t*b;var B={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*w)/1E3,end:Math.round(1E3*y)/1E3};u.shapeType="arc";u.shapeArgs=B;u.labelDistance=v(u.options.dataLabels&&
u.options.dataLabels.distance,m);u.labelDistance=p(u.labelDistance,B.r);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,u.labelDistance);y=(y+w)/2;y>1.5*Math.PI?y-=2*Math.PI:y<-Math.PI/2&&(y+=2*Math.PI);u.slicedTranslation={translateX:Math.round(Math.cos(y)*e),translateY:Math.round(Math.sin(y)*e)};B=Math.cos(y)*a[2]/2;var A=Math.sin(y)*a[2]/2;u.tooltipPos=[a[0]+.7*B,a[1]+.7*A];u.half=y<-Math.PI/2||y>Math.PI/2?1:0;u.angle=y;w=Math.min(f,u.labelDistance/5);u.labelPosition={natural:{x:a[0]+B+
Math.cos(y)*u.labelDistance,y:a[1]+A+Math.sin(y)*u.labelDistance},"final":{},alignment:0>u.labelDistance?"center":u.half?"right":"left",connectorPosition:{breakAt:{x:a[0]+B+Math.cos(y)*w,y:a[1]+A+Math.sin(y)*w},touchingSliceAt:{x:a[0]+B,y:a[1]+A}}}}h(this,"afterTranslate")};c.prototype.updateTotals=function(){var a=this.points,c=a.length,e=this.options.ignoreHiddenPoint,f,b=0;for(f=0;f<c;f++){var g=a[f];!g.isValid()||e&&!g.visible||(b+=g.y)}this.total=b;for(f=0;f<c;f++)g=a[f],g.percentage=0<b&&(g.visible||
!e)?g.y/b*100:0,g.total=b};c.defaultOptions=f(G.defaultOptions,{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{allowOverlap:!0,connectorPadding:5,connectorShape:"fixedOffset",crookDistance:"70%",distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},softConnector:!0,x:0},fillColor:void 0,ignoreHiddenPoint:!0,inactiveOtherPoints:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",
borderWidth:1,lineWidth:void 0,states:{hover:{brightness:.1}}});return c}(G);c(q.prototype,{axisTypes:[],directTouch:!0,drawGraph:void 0,drawLegendSymbol:F.drawRectangle,drawTracker:u.prototype.drawTracker,getCenter:a.getCenter,getSymbol:z,isCartesian:!1,noSharedTooltip:!0,pointAttribs:u.prototype.pointAttribs,pointClass:y,requireSorting:!1,searchPoint:z,trackerGroups:["group","dataLabelsGroup"]});H.registerSeriesType("pie",q);"";return q});M(a,"Series/Pie/PieDataLabel.js",[a["Core/Series/DataLabel.js"],
a["Core/Globals.js"],a["Core/Renderer/RendererUtilities.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,u,z,F,y){var v=u.noop,H=z.distribute,A=F.series,q=y.arrayMax,n=y.clamp,k=y.defined,e=y.merge,c=y.pick,h=y.relativeLength,f;(function(f){function p(){var a=this,f=a.data,b=a.chart,g=a.options.dataLabels||{},d=g.connectorPadding,h=b.plotWidth,n=b.plotHeight,p=b.plotLeft,v=Math.round(b.chartWidth/3),t=a.center,u=t[2]/2,w=t[1],C=[[],[]],y=[0,0,0,0],B=a.dataLabelPositioners,
z,F,G,J,M,E,T,N,V,W,X,R;a.visible&&(g.enabled||a._hasPointLabels)&&(f.forEach(function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),A.prototype.drawDataLabels.apply(a),f.forEach(function(a){a.dataLabel&&(a.visible?(C[a.half].push(a),a.dataLabel._pos=null,!k(g.style.width)&&!k(a.options.dataLabels&&a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>v&&(a.dataLabel.css({width:Math.round(.7*
v)+"px"}),a.dataLabel.shortened=!0)):(a.dataLabel=a.dataLabel.destroy(),a.dataLabels&&1===a.dataLabels.length&&delete a.dataLabels))}),C.forEach(function(e,f){var l=e.length,m=[],r;if(l){a.sortByAngle(e,f-.5);if(0<a.maxLabelDistance){var q=Math.max(0,w-u-a.maxLabelDistance);var v=Math.min(w+u+a.maxLabelDistance,b.plotHeight);e.forEach(function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,w-u-a.labelDistance),a.bottom=Math.min(w+u+a.labelDistance,b.plotHeight),r=a.dataLabel.getBBox().height||
21,a.distributeBox={target:a.labelPosition.natural.y-a.top+r/2,size:r,rank:a.y},m.push(a.distributeBox))});q=v+r-q;H(m,q,q/5)}for(X=0;X<l;X++){z=e[X];E=z.labelPosition;J=z.dataLabel;W=!1===z.visible?"hidden":"inherit";V=q=E.natural.y;m&&k(z.distributeBox)&&("undefined"===typeof z.distributeBox.pos?W="hidden":(T=z.distributeBox.size,V=B.radialDistributionY(z)));delete z.positionIndex;if(g.justify)N=B.justify(z,u,t);else switch(g.alignTo){case "connectors":N=B.alignToConnectors(e,f,h,p);break;case "plotEdges":N=
B.alignToPlotEdges(J,f,h,p);break;default:N=B.radialDistributionX(a,z,V,q)}J._attr={visibility:W,align:E.alignment};R=z.options.dataLabels||{};J._pos={x:N+c(R.x,g.x)+({left:d,right:-d}[E.alignment]||0),y:V+c(R.y,g.y)-10};E.final.x=N;E.final.y=V;c(g.crop,!0)&&(M=J.getBBox().width,q=null,N-M<d&&1===f?(q=Math.round(M-N+d),y[3]=Math.max(q,y[3])):N+M>h-d&&0===f&&(q=Math.round(N+M-h+d),y[1]=Math.max(q,y[1])),0>V-T/2?y[0]=Math.max(Math.round(-V+T/2),y[0]):V+T/2>n&&(y[2]=Math.max(Math.round(V+T/2-n),y[2])),
J.sideOverflow=q)}}}),0===q(y)||this.verifyDataLabelOverflow(y))&&(this.placeDataLabels(),this.points.forEach(function(d){R=e(g,d.options.dataLabels);if(F=c(R.connectorWidth,1)){var f;G=d.connector;if((J=d.dataLabel)&&J._pos&&d.visible&&0<d.labelDistance){W=J._attr.visibility;if(f=!G)d.connector=G=b.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+d.colorIndex+(d.className?" "+d.className:"")).add(a.dataLabelsGroup),b.styledMode||G.attr({"stroke-width":F,stroke:R.connectorColor||
d.color||"#666666"});G[f?"attr":"animate"]({d:d.getConnectorPath()});G.attr("visibility",W)}else G&&(d.connector=G.destroy())}}))}function u(){this.points.forEach(function(a){var c=a.dataLabel,b;c&&a.visible&&((b=c._pos)?(c.sideOverflow&&(c._attr.width=Math.max(c.getBBox().width-c.sideOverflow,0),c.css({width:c._attr.width+"px",textOverflow:(this.options.dataLabels.style||{}).textOverflow||"ellipsis"}),c.shortened=!0),c.attr(c._attr),c[c.moved?"animate":"attr"](b),c.moved=!0):c&&c.attr({y:-9999}));
delete a.distributeBox},this)}function t(a){var c=this.center,b=this.options,e=b.center,d=b.minSize||80,f=null!==b.size;if(!f){if(null!==e[0])var k=Math.max(c[2]-Math.max(a[1],a[3]),d);else k=Math.max(c[2]-a[1]-a[3],d),c[0]+=(a[3]-a[1])/2;null!==e[1]?k=n(k,d,c[2]-Math.max(a[0],a[2])):(k=n(k,d,c[2]-a[0]-a[2]),c[1]+=(a[0]-a[2])/2);k<c[2]?(c[2]=k,c[3]=Math.min(h(b.innerSize||0,k),k),this.translate(c),this.drawDataLabels&&this.drawDataLabels()):f=!0}return f}var w=[],C={radialDistributionY:function(a){return a.top+
a.distributeBox.pos},radialDistributionX:function(a,c,b,e){return a.getX(b<c.top+2||b>c.bottom-2?e:b,c.half,c)},justify:function(a,c,b){return b[0]+(a.half?-1:1)*(c+a.labelDistance)},alignToPlotEdges:function(a,c,b,e){a=a.getBBox().width;return c?a+e:b-a-e},alignToConnectors:function(a,c,b,e){var d=0,g;a.forEach(function(a){g=a.dataLabel.getBBox().width;g>d&&(d=g)});return c?d+e:b-d-e}};f.compose=function(c){a.compose(A);-1===w.indexOf(c)&&(w.push(c),c=c.prototype,c.dataLabelPositioners=C,c.alignDataLabel=
v,c.drawDataLabels=p,c.placeDataLabels=u,c.verifyDataLabelOverflow=t)}})(f||(f={}));return f});M(a,"Extensions/OverlappingDataLabels.js",[a["Core/Chart/Chart.js"],a["Core/Utilities.js"]],function(a,u){function v(a,k){var e=!1;if(a){var c=a.newOpacity;a.oldOpacity!==c&&(a.alignAttr&&a.placed?(a[c?"removeClass":"addClass"]("highcharts-data-label-hidden"),e=!0,a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,function(){k.styledMode||a.css({pointerEvents:c?"auto":"none"})}),y(k,"afterHideOverlappingLabel")):
a.attr({opacity:c}));a.isOld=!0}return e}var F=u.addEvent,y=u.fireEvent,G=u.isArray,H=u.isNumber,A=u.objectEach,q=u.pick;F(a,"render",function(){var a=this,k=[];(this.labelCollectors||[]).forEach(function(a){k=k.concat(a())});(this.yAxis||[]).forEach(function(a){a.stacking&&a.options.stackLabels&&!a.options.stackLabels.allowOverlap&&A(a.stacking.stacks,function(a){A(a,function(a){a.label&&"hidden"!==a.label.visibility&&k.push(a.label)})})});(this.series||[]).forEach(function(e){var c=e.options.dataLabels;
e.visible&&(!1!==c.enabled||e._hasPointLabels)&&(c=function(c){return c.forEach(function(c){c.visible&&(G(c.dataLabels)?c.dataLabels:c.dataLabel?[c.dataLabel]:[]).forEach(function(e){var f=e.options;e.labelrank=q(f.labelrank,c.labelrank,c.shapeArgs&&c.shapeArgs.height);f.allowOverlap?(e.oldOpacity=e.opacity,e.newOpacity=1,v(e,a)):k.push(e)})})},c(e.nodes||[]),c(e.points))});this.hideOverlappingLabels(k)});a.prototype.hideOverlappingLabels=function(a){var k=this,e=a.length,c=k.renderer,h,f,n,p=!1;
var q=function(a){var e,f=a.box?0:a.padding||0,b=e=0,g;if(a&&(!a.alignAttr||a.placed)){var d=a.alignAttr||{x:a.attr("x"),y:a.attr("y")};var h=a.parentGroup;a.width||(e=a.getBBox(),a.width=e.width,a.height=e.height,e=c.fontMetrics(null,a.element).h);var k=a.width-2*f;(g={left:"0",center:"0.5",right:"1"}[a.alignValue])?b=+g*k:H(a.x)&&Math.round(a.x)!==a.translateX&&(b=a.x-a.translateX);return{x:d.x+(h.translateX||0)+f-(b||0),y:d.y+(h.translateY||0)+f-e,width:a.width-2*f,height:a.height-2*f}}};for(f=
0;f<e;f++)if(h=a[f])h.oldOpacity=h.opacity,h.newOpacity=1,h.absoluteBox=q(h);a.sort(function(a,c){return(c.labelrank||0)-(a.labelrank||0)});for(f=0;f<e;f++){var t=(q=a[f])&&q.absoluteBox;for(h=f+1;h<e;++h){var u=(n=a[h])&&n.absoluteBox;!t||!u||q===n||0===q.newOpacity||0===n.newOpacity||u.x>=t.x+t.width||u.x+u.width<=t.x||u.y>=t.y+t.height||u.y+u.height<=t.y||((q.labelrank<n.labelrank?q:n).newOpacity=0)}}a.forEach(function(a){v(a,k)&&(p=!0)});p&&y(k,"afterHideAllOverlappingLabels")}});M(a,"Core/Responsive.js",
[a["Core/Utilities.js"]],function(a){var v=a.extend,z=a.find,F=a.isArray,y=a.isObject,G=a.merge,H=a.objectEach,A=a.pick,q=a.splat,n=a.uniqueKey,k;(function(a){var c=[];a.compose=function(a){-1===c.indexOf(a)&&(c.push(a),v(a.prototype,e.prototype));return a};var e=function(){function a(){}a.prototype.currentOptions=function(a){function c(a,f,h,k){var b;H(a,function(a,d){if(!k&&-1<e.collectionsWithUpdate.indexOf(d)&&f[d])for(a=q(a),h[d]=[],b=0;b<Math.max(a.length,f[d].length);b++)f[d][b]&&(void 0===
a[b]?h[d][b]=f[d][b]:(h[d][b]={},c(a[b],f[d][b],h[d][b],k+1)));else y(a)?(h[d]=F(a)?[]:{},c(a,f[d]||{},h[d],k+1)):h[d]="undefined"===typeof f[d]?null:f[d]})}var e=this,f={};c(a,this.options,f,0);return f};a.prototype.matchResponsiveRule=function(a,c){var e=a.condition;(e.callback||function(){return this.chartWidth<=A(e.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=A(e.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=A(e.minWidth,0)&&this.chartHeight>=A(e.minHeight,0)}).call(this)&&c.push(a._id)};a.prototype.setResponsive=
function(a,c){var e=this,f=this.options.responsive,h=this.currentResponsive,k=[];!c&&f&&f.rules&&f.rules.forEach(function(a){"undefined"===typeof a._id&&(a._id=n());e.matchResponsiveRule(a,k)},this);c=G.apply(void 0,k.map(function(a){return z((f||{}).rules||[],function(c){return c._id===a})}).map(function(a){return a&&a.chartOptions}));c.isResponsiveOptions=!0;k=k.toString()||void 0;k!==(h&&h.ruleIds)&&(h&&this.update(h.undoOptions,a,!0),k?(h=this.currentOptions(c),h.isResponsiveOptions=!0,this.currentResponsive=
{ruleIds:k,mergedOptions:c,undoOptions:h},this.update(c,a,!0)):this.currentResponsive=void 0)};return a}()})(k||(k={}));"";"";return k});M(a,"masters/highcharts.src.js",[a["Core/Globals.js"],a["Core/Utilities.js"],a["Core/DefaultOptions.js"],a["Core/Animation/Fx.js"],a["Core/Animation/AnimationUtilities.js"],a["Core/Renderer/HTML/AST.js"],a["Core/FormatUtilities.js"],a["Core/Renderer/RendererUtilities.js"],a["Core/Renderer/SVG/SVGElement.js"],a["Core/Renderer/SVG/SVGRenderer.js"],a["Core/Renderer/HTML/HTMLElement.js"],
a["Core/Renderer/HTML/HTMLRenderer.js"],a["Core/Axis/Axis.js"],a["Core/Axis/DateTimeAxis.js"],a["Core/Axis/LogarithmicAxis.js"],a["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"],a["Core/Axis/Tick.js"],a["Core/Tooltip.js"],a["Core/Series/Point.js"],a["Core/Pointer.js"],a["Core/MSPointer.js"],a["Core/Legend/Legend.js"],a["Core/Chart/Chart.js"],a["Core/Series/Series.js"],a["Core/Series/SeriesRegistry.js"],a["Series/Column/ColumnSeries.js"],a["Series/Column/ColumnDataLabel.js"],a["Series/Pie/PieSeries.js"],
a["Series/Pie/PieDataLabel.js"],a["Core/Series/DataLabel.js"],a["Core/Responsive.js"],a["Core/Color/Color.js"],a["Core/Time.js"]],function(a,u,z,F,y,G,H,A,q,n,k,e,c,h,f,w,p,B,t,J,C,r,l,b,g,d,m,D,x,I,M,S,O){a.animate=y.animate;a.animObject=y.animObject;a.getDeferredAnimation=y.getDeferredAnimation;a.setAnimation=y.setAnimation;a.stop=y.stop;a.timers=F.timers;a.AST=G;a.Axis=c;a.Chart=l;a.chart=l.chart;a.Fx=F;a.Legend=r;a.PlotLineOrBand=w;a.Point=t;a.Pointer=C.isRequired()?C:J;a.Series=b;a.SVGElement=
q;a.SVGRenderer=n;a.Tick=p;a.Time=O;a.Tooltip=B;a.Color=S;a.color=S.parse;e.compose(n);k.compose(q);a.defaultOptions=z.defaultOptions;a.getOptions=z.getOptions;a.time=z.defaultTime;a.setOptions=z.setOptions;a.dateFormat=H.dateFormat;a.format=H.format;a.numberFormat=H.numberFormat;a.addEvent=u.addEvent;a.arrayMax=u.arrayMax;a.arrayMin=u.arrayMin;a.attr=u.attr;a.clearTimeout=u.clearTimeout;a.correctFloat=u.correctFloat;a.createElement=u.createElement;a.css=u.css;a.defined=u.defined;a.destroyObjectProperties=
u.destroyObjectProperties;a.discardElement=u.discardElement;a.distribute=A.distribute;a.erase=u.erase;a.error=u.error;a.extend=u.extend;a.extendClass=u.extendClass;a.find=u.find;a.fireEvent=u.fireEvent;a.getMagnitude=u.getMagnitude;a.getStyle=u.getStyle;a.inArray=u.inArray;a.isArray=u.isArray;a.isClass=u.isClass;a.isDOMElement=u.isDOMElement;a.isFunction=u.isFunction;a.isNumber=u.isNumber;a.isObject=u.isObject;a.isString=u.isString;a.keys=u.keys;a.merge=u.merge;a.normalizeTickInterval=u.normalizeTickInterval;
a.objectEach=u.objectEach;a.offset=u.offset;a.pad=u.pad;a.pick=u.pick;a.pInt=u.pInt;a.relativeLength=u.relativeLength;a.removeEvent=u.removeEvent;a.seriesType=g.seriesType;a.splat=u.splat;a.stableSort=u.stableSort;a.syncTimeout=u.syncTimeout;a.timeUnits=u.timeUnits;a.uniqueKey=u.uniqueKey;a.useSerialIds=u.useSerialIds;a.wrap=u.wrap;m.compose(d);I.compose(b);h.compose(c);f.compose(c);x.compose(D);w.compose(c);M.compose(l);return a});a["masters/highcharts.src.js"]._modules=a;return a["masters/highcharts.src.js"]});
//# sourceMappingURL=highcharts.js.map

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({ value: true }));

/**
 * [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
 * is a simple way to find a fitted line
 * between a set of coordinates. This algorithm finds the slope and y-intercept of a regression line
 * using the least sum of squares.
 *
 * @param {Array<Array<number>>} data an array of two-element of arrays,
 * like `[[0, 1], [2, 3]]`
 * @returns {Object} object containing slope and intersect of regression line
 * @example
 * linearRegression([[0, 0], [1, 1]]); // => { m: 1, b: 0 }
 */
function linearRegression(data) {
    var m, b;

    // Store data length in a local variable to reduce
    // repeated object property lookups
    var dataLength = data.length;

    //if there's only one point, arbitrarily choose a slope of 0
    //and a y-intercept of whatever the y of the initial point is
    if (dataLength === 1) {
        m = 0;
        b = data[0][1];
    } else {
        // Initialize our sums and scope the `m` and `b`
        // variables that define the line.
        var sumX = 0,
            sumY = 0,
            sumXX = 0,
            sumXY = 0;

        // Use local variables to grab point values
        // with minimal object property lookups
        var point, x, y;

        // Gather the sum of all x values, the sum of all
        // y values, and the sum of x^2 and (x*y) for each
        // value.
        //
        // In math notation, these would be SS_x, SS_y, SS_xx, and SS_xy
        for (var i = 0; i < dataLength; i++) {
            point = data[i];
            x = point[0];
            y = point[1];

            sumX += x;
            sumY += y;

            sumXX += x * x;
            sumXY += x * y;
        }

        // `m` is the slope of the regression line
        m =
            (dataLength * sumXY - sumX * sumY) /
            (dataLength * sumXX - sumX * sumX);

        // `b` is the y-intercept of the line.
        b = sumY / dataLength - (m * sumX) / dataLength;
    }

    // Return both values as an object.
    return {
        m: m,
        b: b
    };
}

/**
 * Given the output of `linearRegression`: an object
 * with `m` and `b` values indicating slope and intercept,
 * respectively, generate a line function that translates
 * x values into y values.
 *
 * @param {Object} mb object with `m` and `b` members, representing
 * slope and intersect of desired line
 * @returns {Function} method that computes y-value at any given
 * x-value on the line.
 * @example
 * var l = linearRegressionLine(linearRegression([[0, 0], [1, 1]]));
 * l(0) // = 0
 * l(2) // = 2
 * linearRegressionLine({ b: 0, m: 1 })(1); // => 1
 * linearRegressionLine({ b: 1, m: 1 })(1); // => 2
 */
function linearRegressionLine(mb /*: { b: number, m: number }*/) {
    // Return a function that computes a `y` value for each
    // x value it is given, based on the values of `b` and `a`
    // that we just computed.
    return function (x) {
        return mb.b + mb.m * x;
    };
}

/**
 * Our default sum is the [Kahan-Babuska algorithm](https://pdfs.semanticscholar.org/1760/7d467cda1d0277ad272deb2113533131dc09.pdf).
 * This method is an improvement over the classical
 * [Kahan summation algorithm](https://en.wikipedia.org/wiki/Kahan_summation_algorithm).
 * It aims at computing the sum of a list of numbers while correcting for
 * floating-point errors. Traditionally, sums are calculated as many
 * successive additions, each one with its own floating-point roundoff. These
 * losses in precision add up as the number of numbers increases. This alternative
 * algorithm is more accurate than the simple way of calculating sums by simple
 * addition.
 *
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * @param {Array<number>} x input
 * @return {number} sum of all input numbers
 * @example
 * sum([1, 2, 3]); // => 6
 */
function sum(x) {
    // If the array is empty, we needn't bother computing its sum
    if (x.length === 0) {
        return 0;
    }

    // Initializing the sum as the first number in the array
    var sum = x[0];

    // Keeping track of the floating-point error correction
    var correction = 0;

    var transition;

    for (var i = 1; i < x.length; i++) {
        transition = sum + x[i];

        // Here we need to update the correction in a different fashion
        // if the new absolute value is greater than the absolute sum
        if (Math.abs(sum) >= Math.abs(x[i])) {
            correction += sum - transition + x[i];
        } else {
            correction += x[i] - transition + sum;
        }

        sum = transition;
    }

    // Returning the corrected sum
    return sum + correction;
}

/**
 * The mean, _also known as average_,
 * is the sum of all values over the number of values.
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * @param {Array<number>} x sample of one or more data points
 * @throws {Error} if the length of x is less than one
 * @returns {number} mean
 * @example
 * mean([0, 10]); // => 5
 */
function mean(x) {
    if (x.length === 0) {
        throw new Error("mean requires at least one data point");
    }

    return sum(x) / x.length;
}

/**
 * The sum of deviations to the Nth power.
 * When n=2 it's the sum of squared deviations.
 * When n=3 it's the sum of cubed deviations.
 *
 * @param {Array<number>} x
 * @param {number} n power
 * @returns {number} sum of nth power deviations
 *
 * @example
 * var input = [1, 2, 3];
 * // since the variance of a set is the mean squared
 * // deviations, we can calculate that with sumNthPowerDeviations:
 * sumNthPowerDeviations(input, 2) / input.length;
 */
function sumNthPowerDeviations(x, n) {
    var meanValue = mean(x);
    var sum = 0;
    var tempValue;
    var i;

    // This is an optimization: when n is 2 (we're computing a number squared),
    // multiplying the number by itself is significantly faster than using
    // the Math.pow method.
    if (n === 2) {
        for (i = 0; i < x.length; i++) {
            tempValue = x[i] - meanValue;
            sum += tempValue * tempValue;
        }
    } else {
        for (i = 0; i < x.length; i++) {
            sum += Math.pow(x[i] - meanValue, n);
        }
    }

    return sum;
}

/**
 * The [variance](http://en.wikipedia.org/wiki/Variance)
 * is the sum of squared deviations from the mean.
 *
 * This is an implementation of variance, not sample variance:
 * see the `sampleVariance` method if you want a sample measure.
 *
 * @param {Array<number>} x a population of one or more data points
 * @returns {number} variance: a value greater than or equal to zero.
 * zero indicates that all values are identical.
 * @throws {Error} if x's length is 0
 * @example
 * variance([1, 2, 3, 4, 5, 6]); // => 2.9166666666666665
 */
function variance(x) {
    if (x.length === 0) {
        throw new Error("variance requires at least one data point");
    }

    // Find the mean of squared deviations between the
    // mean value and each value.
    return sumNthPowerDeviations(x, 2) / x.length;
}

/**
 * The [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
 * is the square root of the variance. This is also known as the population
 * standard deviation. It's useful for measuring the amount
 * of variation or dispersion in a set of values.
 *
 * Standard deviation is only appropriate for full-population knowledge: for
 * samples of a population, {@link sampleStandardDeviation} is
 * more appropriate.
 *
 * @param {Array<number>} x input
 * @returns {number} standard deviation
 * @example
 * variance([2, 4, 4, 4, 5, 5, 7, 9]); // => 4
 * standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]); // => 2
 */
function standardDeviation(x) {
    if (x.length === 1) {
        return 0;
    }
    var v = variance(x);
    return Math.sqrt(v);
}

/**
 * The [R Squared](http://en.wikipedia.org/wiki/Coefficient_of_determination)
 * value of data compared with a function `f`
 * is the sum of the squared differences between the prediction
 * and the actual value.
 *
 * @param {Array<Array<number>>} x input data: this should be doubly-nested
 * @param {Function} func function called on `[i][0]` values within the dataset
 * @returns {number} r-squared value
 * @example
 * var samples = [[0, 0], [1, 1]];
 * var regressionLine = linearRegressionLine(linearRegression(samples));
 * rSquared(samples, regressionLine); // = 1 this line is a perfect fit
 */
function rSquared(x, func) {
    if (x.length < 2) {
        return 1;
    }

    // Compute the average y value for the actual
    // data set in order to compute the
    // _total sum of squares_
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i][1];
    }
    var average = sum / x.length;

    // Compute the total sum of squares - the
    // squared difference between each point
    // and the average of all points.
    var sumOfSquares = 0;
    for (var j = 0; j < x.length; j++) {
        sumOfSquares += Math.pow(average - x[j][1], 2);
    }

    // Finally estimate the error: the squared
    // difference between the estimate and the actual data
    // value at each point.
    var err = 0;
    for (var k = 0; k < x.length; k++) {
        err += Math.pow(x[k][1] - func(x[k][0]), 2);
    }

    // As the error grows larger, its ratio to the
    // sum of squares increases and the r squared
    // value grows lower.
    return 1 - err / sumOfSquares;
}

/**
 * The [mode](https://en.wikipedia.org/wiki/Mode_%28statistics%29) is the number
 * that appears in a list the highest number of times.
 * There can be multiple modes in a list: in the event of a tie, this
 * algorithm will return the most recently seen mode.
 *
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * This runs in `O(n)` because the input is sorted.
 *
 * @param {Array<number>} sorted a sample of one or more data points
 * @returns {number} mode
 * @throws {Error} if sorted is empty
 * @example
 * modeSorted([0, 0, 1]); // => 0
 */
function modeSorted(sorted) {
    // Handle edge cases:
    // The mode of an empty list is undefined
    if (sorted.length === 0) {
        throw new Error("mode requires at least one data point");
    } else if (sorted.length === 1) {
        return sorted[0];
    }

    // This assumes it is dealing with an array of size > 1, since size
    // 0 and 1 are handled immediately. Hence it starts at index 1 in the
    // array.
    var last = sorted[0],
        // store the mode as we find new modes
        value = NaN,
        // store how many times we've seen the mode
        maxSeen = 0,
        // how many times the current candidate for the mode
        // has been seen
        seenThis = 1;

    // end at sorted.length + 1 to fix the case in which the mode is
    // the highest number that occurs in the sequence. the last iteration
    // compares sorted[i], which is undefined, to the highest number
    // in the series
    for (var i = 1; i < sorted.length + 1; i++) {
        // we're seeing a new number pass by
        if (sorted[i] !== last) {
            // the last number is the new mode since we saw it more
            // often than the old one
            if (seenThis > maxSeen) {
                maxSeen = seenThis;
                value = last;
            }
            seenThis = 1;
            last = sorted[i];
            // if this isn't a new number, it's one more occurrence of
            // the potential mode
        } else {
            seenThis++;
        }
    }
    return value;
}

/**
 * Sort an array of numbers by their numeric value, ensuring that the
 * array is not changed in place.
 *
 * This is necessary because the default behavior of .sort
 * in JavaScript is to sort arrays as string values
 *
 *     [1, 10, 12, 102, 20].sort()
 *     // output
 *     [1, 10, 102, 12, 20]
 *
 * @param {Array<number>} x input array
 * @return {Array<number>} sorted array
 * @private
 * @example
 * numericSort([3, 2, 1]) // => [1, 2, 3]
 */
function numericSort(x) {
    return (
        x
            // ensure the array is not changed in-place
            .slice()
            // comparator function that treats input as numeric
            .sort(function (a, b) {
                return a - b;
            })
    );
}

/**
 * The [mode](https://en.wikipedia.org/wiki/Mode_%28statistics%29) is the number
 * that appears in a list the highest number of times.
 * There can be multiple modes in a list: in the event of a tie, this
 * algorithm will return the most recently seen mode.
 *
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * This runs in `O(n log(n))` because it needs to sort the array internally
 * before running an `O(n)` search to find the mode.
 *
 * @param {Array<number>} x input
 * @returns {number} mode
 * @example
 * mode([0, 0, 1]); // => 0
 */
function mode(x) {
    // Sorting the array lets us iterate through it below and be sure
    // that every time we see a new number it's new and we'll never
    // see the same number twice
    return modeSorted(numericSort(x));
}

/* globals Map: false */

/**
 * The [mode](https://en.wikipedia.org/wiki/Mode_%28statistics%29) is the number
 * that appears in a list the highest number of times.
 * There can be multiple modes in a list: in the event of a tie, this
 * algorithm will return the most recently seen mode.
 *
 * modeFast uses a Map object to keep track of the mode, instead of the approach
 * used with `mode`, a sorted array. As a result, it is faster
 * than `mode` and supports any data type that can be compared with `==`.
 * It also requires a
 * [JavaScript environment with support for Map](https://kangax.github.io/compat-table/es6/#test-Map),
 * and will throw an error if Map is not available.
 *
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * @param {Array<*>} x a sample of one or more data points
 * @returns {?*} mode
 * @throws {ReferenceError} if the JavaScript environment doesn't support Map
 * @throws {Error} if x is empty
 * @example
 * modeFast(['rabbits', 'rabbits', 'squirrels']); // => 'rabbits'
 */
function modeFast(x) {
    // This index will reflect the incidence of different values, indexing
    // them like
    // { value: count }
    var index = new Map();

    // A running `mode` and the number of times it has been encountered.
    var mode;
    var modeCount = 0;

    for (var i = 0; i < x.length; i++) {
        var newCount = index.get(x[i]);
        if (newCount === undefined) {
            newCount = 1;
        } else {
            newCount++;
        }
        if (newCount > modeCount) {
            mode = x[i];
            modeCount = newCount;
        }
        index.set(x[i], newCount);
    }

    if (modeCount === 0) {
        throw new Error("mode requires at last one data point");
    }

    return mode;
}

/**
 * The min is the lowest number in the array.
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * @param {Array<number>} x sample of one or more data points
 * @throws {Error} if the length of x is less than one
 * @returns {number} minimum value
 * @example
 * min([1, 5, -10, 100, 2]); // => -10
 */
function min(x) {
    if (x.length === 0) {
        throw new Error("min requires at least one data point");
    }

    var value = x[0];
    for (var i = 1; i < x.length; i++) {
        if (x[i] < value) {
            value = x[i];
        }
    }
    return value;
}

/**
 * This computes the maximum number in an array.
 *
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * @param {Array<number>} x sample of one or more data points
 * @returns {number} maximum value
 * @throws {Error} if the length of x is less than one
 * @example
 * max([1, 2, 3, 4]);
 * // => 4
 */
function max(x) {
    if (x.length === 0) {
        throw new Error("max requires at least one data point");
    }

    var value = x[0];
    for (var i = 1; i < x.length; i++) {
        if (x[i] > value) {
            value = x[i];
        }
    }
    return value;
}

/**
 * This computes the minimum & maximum number in an array.
 *
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * @param {Array<number>} x sample of one or more data points
 * @returns {Array<number>} minimum & maximum value
 * @throws {Error} if the length of x is less than one
 * @example
 * extent([1, 2, 3, 4]);
 * // => [1, 4]
 */
function extent(x) {
    if (x.length === 0) {
        throw new Error("extent requires at least one data point");
    }

    var min = x[0];
    var max = x[0];
    for (var i = 1; i < x.length; i++) {
        if (x[i] > max) {
            max = x[i];
        }
        if (x[i] < min) {
            min = x[i];
        }
    }
    return [min, max];
}

/**
 * The minimum is the lowest number in the array. With a sorted array,
 * the first element in the array is always the smallest, so this calculation
 * can be done in one step, or constant time.
 *
 * @param {Array<number>} x input
 * @returns {number} minimum value
 * @example
 * minSorted([-100, -10, 1, 2, 5]); // => -100
 */
function minSorted(x) {
    return x[0];
}

/**
 * The maximum is the highest number in the array. With a sorted array,
 * the last element in the array is always the largest, so this calculation
 * can be done in one step, or constant time.
 *
 * @param {Array<number>} x input
 * @returns {number} maximum value
 * @example
 * maxSorted([-100, -10, 1, 2, 5]); // => 5
 */
function maxSorted(x) {
    return x[x.length - 1];
}

/**
 * The extent is the lowest & highest number in the array. With a sorted array,
 * the first element in the array is always the lowest while the last element is always the largest, so this calculation
 * can be done in one step, or constant time.
 *
 * @param {Array<number>} x input
 * @returns {Array<number>} minimum & maximum value
 * @example
 * extentSorted([-100, -10, 1, 2, 5]); // => [-100, 5]
 */
function extentSorted(x) {
    return [x[0], x[x.length - 1]];
}

/**
 * The simple [sum](https://en.wikipedia.org/wiki/Summation) of an array
 * is the result of adding all numbers together, starting from zero.
 *
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * @param {Array<number>} x input
 * @return {number} sum of all input numbers
 * @example
 * sumSimple([1, 2, 3]); // => 6
 */
function sumSimple(x) {
    var value = 0;
    for (var i = 0; i < x.length; i++) {
        value += x[i];
    }
    return value;
}

/**
 * The [product](https://en.wikipedia.org/wiki/Product_(mathematics)) of an array
 * is the result of multiplying all numbers together, starting using one as the multiplicative identity.
 *
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * @param {Array<number>} x input
 * @return {number} product of all input numbers
 * @example
 * product([1, 2, 3, 4]); // => 24
 */
function product(x) {
    var value = 1;
    for (var i = 0; i < x.length; i++) {
        value *= x[i];
    }
    return value;
}

/**
 * This is the internal implementation of quantiles: when you know
 * that the order is sorted, you don't need to re-sort it, and the computations
 * are faster.
 *
 * @param {Array<number>} x sample of one or more data points
 * @param {number} p desired quantile: a number between 0 to 1, inclusive
 * @returns {number} quantile value
 * @throws {Error} if p ix outside of the range from 0 to 1
 * @throws {Error} if x is empty
 * @example
 * quantileSorted([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5); // => 9
 */
function quantileSorted(x, p) {
    var idx = x.length * p;
    if (x.length === 0) {
        throw new Error("quantile requires at least one data point.");
    } else if (p < 0 || p > 1) {
        throw new Error("quantiles must be between 0 and 1");
    } else if (p === 1) {
        // If p is 1, directly return the last element
        return x[x.length - 1];
    } else if (p === 0) {
        // If p is 0, directly return the first element
        return x[0];
    } else if (idx % 1 !== 0) {
        // If p is not integer, return the next element in array
        return x[Math.ceil(idx) - 1];
    } else if (x.length % 2 === 0) {
        // If the list has even-length, we'll take the average of this number
        // and the next value, if there is one
        return (x[idx - 1] + x[idx]) / 2;
    } else {
        // Finally, in the simple case of an integer value
        // with an odd-length list, return the x value at the index.
        return x[idx];
    }
}

/**
 * Rearrange items in `arr` so that all items in `[left, k]` range are the smallest.
 * The `k`-th element will have the `(k - left + 1)`-th smallest value in `[left, right]`.
 *
 * Implements Floyd-Rivest selection algorithm https://en.wikipedia.org/wiki/Floyd-Rivest_algorithm
 *
 * @param {Array<number>} arr input array
 * @param {number} k pivot index
 * @param {number} [left] left index
 * @param {number} [right] right index
 * @returns {void} mutates input array
 * @example
 * var arr = [65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39];
 * quickselect(arr, 8);
 * // = [39, 28, 28, 33, 21, 12, 22, 50, 53, 56, 59, 65, 90, 77, 95]
 */
function quickselect(arr, k, left, right) {
    left = left || 0;
    right = right || arr.length - 1;

    while (right > left) {
        // 600 and 0.5 are arbitrary constants chosen in the original paper to minimize execution time
        if (right - left > 600) {
            var n = right - left + 1;
            var m = k - left + 1;
            var z = Math.log(n);
            var s = 0.5 * Math.exp((2 * z) / 3);
            var sd = 0.5 * Math.sqrt((z * s * (n - s)) / n);
            if (m - n / 2 < 0) { sd *= -1; }
            var newLeft = Math.max(left, Math.floor(k - (m * s) / n + sd));
            var newRight = Math.min(
                right,
                Math.floor(k + ((n - m) * s) / n + sd)
            );
            quickselect(arr, k, newLeft, newRight);
        }

        var t = arr[k];
        var i = left;
        var j = right;

        swap(arr, left, k);
        if (arr[right] > t) { swap(arr, left, right); }

        while (i < j) {
            swap(arr, i, j);
            i++;
            j--;
            while (arr[i] < t) { i++; }
            while (arr[j] > t) { j--; }
        }

        if (arr[left] === t) { swap(arr, left, j); }
        else {
            j++;
            swap(arr, j, right);
        }

        if (j <= k) { left = j + 1; }
        if (k <= j) { right = j - 1; }
    }
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

/**
 * The [quantile](https://en.wikipedia.org/wiki/Quantile):
 * this is a population quantile, since we assume to know the entire
 * dataset in this library. This is an implementation of the
 * [Quantiles of a Population](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population)
 * algorithm from wikipedia.
 *
 * Sample is a one-dimensional array of numbers,
 * and p is either a decimal number from 0 to 1 or an array of decimal
 * numbers from 0 to 1.
 * In terms of a k/q quantile, p = k/q - it's just dealing with fractions or dealing
 * with decimal values.
 * When p is an array, the result of the function is also an array containing the appropriate
 * quantiles in input order
 *
 * @param {Array<number>} x sample of one or more numbers
 * @param {Array<number> | number} p the desired quantile, as a number between 0 and 1
 * @returns {number} quantile
 * @example
 * quantile([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5); // => 9
 */
function quantile(x, p) {
    var copy = x.slice();

    if (Array.isArray(p)) {
        // rearrange elements so that each element corresponding to a requested
        // quantile is on a place it would be if the array was fully sorted
        multiQuantileSelect(copy, p);
        // Initialize the result array
        var results = [];
        // For each requested quantile
        for (var i = 0; i < p.length; i++) {
            results[i] = quantileSorted(copy, p[i]);
        }
        return results;
    } else {
        var idx = quantileIndex(copy.length, p);
        quantileSelect(copy, idx, 0, copy.length - 1);
        return quantileSorted(copy, p);
    }
}

function quantileSelect(arr, k, left, right) {
    if (k % 1 === 0) {
        quickselect(arr, k, left, right);
    } else {
        k = Math.floor(k);
        quickselect(arr, k, left, right);
        quickselect(arr, k + 1, k + 1, right);
    }
}

function multiQuantileSelect(arr, p) {
    var indices = [0];
    for (var i = 0; i < p.length; i++) {
        indices.push(quantileIndex(arr.length, p[i]));
    }
    indices.push(arr.length - 1);
    indices.sort(compare);

    var stack = [0, indices.length - 1];

    while (stack.length) {
        var r = Math.ceil(stack.pop());
        var l = Math.floor(stack.pop());
        if (r - l <= 1) { continue; }

        var m = Math.floor((l + r) / 2);
        quantileSelect(
            arr,
            indices[m],
            Math.floor(indices[l]),
            Math.ceil(indices[r])
        );

        stack.push(l, m, m, r);
    }
}

function compare(a, b) {
    return a - b;
}

function quantileIndex(len, p) {
    var idx = len * p;
    if (p === 1) {
        // If p is 1, directly return the last index
        return len - 1;
    } else if (p === 0) {
        // If p is 0, directly return the first index
        return 0;
    } else if (idx % 1 !== 0) {
        // If index is not integer, return the next index in array
        return Math.ceil(idx) - 1;
    } else if (len % 2 === 0) {
        // If the list has even-length, we'll return the middle of two indices
        // around quantile to indicate that we need an average value of the two
        return idx - 0.5;
    } else {
        // Finally, in the simple case of an integer index
        // with an odd-length list, return the index
        return idx;
    }
}

/* eslint no-bitwise: 0 */

/**
 * This function returns the quantile in which one would find the given value in
 * the given array. With a sorted array, leveraging binary search, we can find
 * this information in logarithmic time.
 *
 * @param {Array<number>} x input
 * @returns {number} value value
 * @example
 * quantileRankSorted([1, 2, 3, 4], 3); // => 0.75
 * quantileRankSorted([1, 2, 3, 3, 4], 3); // => 0.7
 * quantileRankSorted([1, 2, 3, 4], 6); // => 1
 * quantileRankSorted([1, 2, 3, 3, 5], 4); // => 0.8
 */
function quantileRankSorted(x, value) {
    // Value is lesser than any value in the array
    if (value < x[0]) {
        return 0;
    }

    // Value is greater than any value in the array
    if (value > x[x.length - 1]) {
        return 1;
    }

    var l = lowerBound(x, value);

    // Value is not in the array
    if (x[l] !== value) {
        return l / x.length;
    }

    l++;

    var u = upperBound(x, value);

    // The value exists only once in the array
    if (u === l) {
        return l / x.length;
    }

    // Here, we are basically computing the mean of the range of indices
    // containing our searched value. But, instead, of initializing an
    // array and looping over it, there is a dedicated math formula that
    // we apply below to get the result.
    var r = u - l + 1;
    var sum = (r * (u + l)) / 2;
    var mean = sum / r;

    return mean / x.length;
}

function lowerBound(x, value) {
    var mid = 0;
    var lo = 0;
    var hi = x.length;

    while (lo < hi) {
        mid = (lo + hi) >>> 1;

        if (value <= x[mid]) {
            hi = mid;
        } else {
            lo = -~mid;
        }
    }

    return lo;
}

function upperBound(x, value) {
    var mid = 0;
    var lo = 0;
    var hi = x.length;

    while (lo < hi) {
        mid = (lo + hi) >>> 1;

        if (value >= x[mid]) {
            lo = -~mid;
        } else {
            hi = mid;
        }
    }

    return lo;
}

/**
 * This function returns the quantile in which one would find the given value in
 * the given array. It will copy and sort your array before each run, so
 * if you know your array is already sorted, you should use `quantileRankSorted`
 * instead.
 *
 * @param {Array<number>} x input
 * @returns {number} value value
 * @example
 * quantileRank([4, 3, 1, 2], 3); // => 0.75
 * quantileRank([4, 3, 2, 3, 1], 3); // => 0.7
 * quantileRank([2, 4, 1, 3], 6); // => 1
 * quantileRank([5, 3, 1, 2, 3], 4); // => 0.8
 */
function quantileRank(x, value) {
    // Cloning and sorting the array
    var sortedCopy = numericSort(x);

    return quantileRankSorted(sortedCopy, value);
}

/**
 * The [Interquartile range](http://en.wikipedia.org/wiki/Interquartile_range) is
 * a measure of statistical dispersion, or how scattered, spread, or
 * concentrated a distribution is. It's computed as the difference between
 * the third quartile and first quartile.
 *
 * @param {Array<number>} x sample of one or more numbers
 * @returns {number} interquartile range: the span between lower and upper quartile,
 * 0.25 and 0.75
 * @example
 * interquartileRange([0, 1, 2, 3]); // => 2
 */
function interquartileRange(x) {
    // Interquartile range is the span between the upper quartile,
    // at `0.75`, and lower quartile, `0.25`
    var q1 = quantile(x, 0.75);
    var q2 = quantile(x, 0.25);

    if (typeof q1 === "number" && typeof q2 === "number") {
        return q1 - q2;
    }
}

/**
 * The [median](http://en.wikipedia.org/wiki/Median) is
 * the middle number of a list. This is often a good indicator of 'the middle'
 * when there are outliers that skew the `mean()` value.
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * The median isn't necessarily one of the elements in the list: the value
 * can be the average of two elements if the list has an even length
 * and the two central values are different.
 *
 * @param {Array<number>} x input
 * @returns {number} median value
 * @example
 * median([10, 2, 5, 100, 2, 1]); // => 3.5
 */
function median(x) {
    return +quantile(x, 0.5);
}

/**
 * The [Median Absolute Deviation](http://en.wikipedia.org/wiki/Median_absolute_deviation) is
 * a robust measure of statistical
 * dispersion. It is more resilient to outliers than the standard deviation.
 *
 * @param {Array<number>} x input array
 * @returns {number} median absolute deviation
 * @example
 * medianAbsoluteDeviation([1, 1, 2, 2, 4, 6, 9]); // => 1
 */
function medianAbsoluteDeviation(x) {
    var medianValue = median(x);
    var medianAbsoluteDeviations = [];

    // Make a list of absolute deviations from the median
    for (var i = 0; i < x.length; i++) {
        medianAbsoluteDeviations.push(Math.abs(x[i] - medianValue));
    }

    // Find the median value of that list
    return median(medianAbsoluteDeviations);
}

/**
 * Split an array into chunks of a specified size. This function
 * has the same behavior as [PHP's array_chunk](http://php.net/manual/en/function.array-chunk.php)
 * function, and thus will insert smaller-sized chunks at the end if
 * the input size is not divisible by the chunk size.
 *
 * `x` is expected to be an array, and `chunkSize` a number.
 * The `x` array can contain any kind of data.
 *
 * @param {Array} x a sample
 * @param {number} chunkSize size of each output array. must be a positive integer
 * @returns {Array<Array>} a chunked array
 * @throws {Error} if chunk size is less than 1 or not an integer
 * @example
 * chunk([1, 2, 3, 4, 5, 6], 2);
 * // => [[1, 2], [3, 4], [5, 6]]
 */
function chunk(x, chunkSize) {
    // a list of result chunks, as arrays in an array
    var output = [];

    // `chunkSize` must be zero or higher - otherwise the loop below,
    // in which we call `start += chunkSize`, will loop infinitely.
    // So, we'll detect and throw in that case to indicate
    // invalid input.
    if (chunkSize < 1) {
        throw new Error("chunk size must be a positive number");
    }

    if (Math.floor(chunkSize) !== chunkSize) {
        throw new Error("chunk size must be an integer");
    }

    // `start` is the index at which `.slice` will start selecting
    // new array elements
    for (var start = 0; start < x.length; start += chunkSize) {
        // for each chunk, slice that part of the array and add it
        // to the output. The `.slice` function does not change
        // the original array.
        output.push(x.slice(start, start + chunkSize));
    }
    return output;
}

/**
 * Sampling with replacement is a type of sampling that allows the same
 * item to be picked out of a population more than once.
 *
 * @param {Array<*>} x an array of any kind of value
 * @param {number} n count of how many elements to take
 * @param {Function} [randomSource=Math.random] an optional entropy source that
 * returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)
 * @return {Array} n sampled items from the population
 * @example
 * var values = [1, 2, 3, 4];
 * sampleWithReplacement(values, 2); // returns 2 random values, like [2, 4];
 */
function sampleWithReplacement(x, n, randomSource) {
    if (x.length === 0) {
        return [];
    }

    // a custom random number source can be provided if you want to use
    // a fixed seed or another random number generator, like
    // [random-js](https://www.npmjs.org/package/random-js)
    randomSource = randomSource || Math.random;

    var length = x.length;
    var sample = [];

    for (var i = 0; i < n; i++) {
        var index = Math.floor(randomSource() * length);

        sample.push(x[index]);
    }

    return sample;
}

/**
 * A [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
 * in-place - which means that it **will change the order of the original
 * array by reference**.
 *
 * This is an algorithm that generates a random [permutation](https://en.wikipedia.org/wiki/Permutation)
 * of a set.
 *
 * @param {Array} x sample of one or more numbers
 * @param {Function} [randomSource=Math.random] an optional entropy source that
 * returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)
 * @returns {Array} x
 * @example
 * var x = [1, 2, 3, 4];
 * shuffleInPlace(x);
 * // x is shuffled to a value like [2, 1, 4, 3]
 */
function shuffleInPlace(x, randomSource) {
    // a custom random number source can be provided if you want to use
    // a fixed seed or another random number generator, like
    // [random-js](https://www.npmjs.org/package/random-js)
    randomSource = randomSource || Math.random;

    // store the current length of the x to determine
    // when no elements remain to shuffle.
    var length = x.length;

    // temporary is used to hold an item when it is being
    // swapped between indices.
    var temporary;

    // The index to swap at each stage.
    var index;

    // While there are still items to shuffle
    while (length > 0) {
        // choose a random index within the subset of the array
        // that is not yet shuffled
        index = Math.floor(randomSource() * length--);

        // store the value that we'll move temporarily
        temporary = x[length];

        // swap the value at `x[length]` with `x[index]`
        x[length] = x[index];
        x[index] = temporary;
    }

    return x;
}

/**
 * A [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
 * is a fast way to create a random permutation of a finite set. This is
 * a function around `shuffle_in_place` that adds the guarantee that
 * it will not modify its input.
 *
 * @param {Array} x sample of 0 or more numbers
 * @param {Function} [randomSource=Math.random] an optional entropy source that
 * returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)
 * @return {Array} shuffled version of input
 * @example
 * var shuffled = shuffle([1, 2, 3, 4]);
 * shuffled; // = [2, 3, 1, 4] or any other random permutation
 */
function shuffle(x, randomSource) {
    // slice the original array so that it is not modified
    var sample = x.slice();

    // and then shuffle that shallow-copied array, in place
    return shuffleInPlace(sample, randomSource);
}

/**
 * Create a [simple random sample](http://en.wikipedia.org/wiki/Simple_random_sample)
 * from a given array of `n` elements.
 *
 * The sampled values will be in any order, not necessarily the order
 * they appear in the input.
 *
 * @param {Array<any>} x input array. can contain any type
 * @param {number} n count of how many elements to take
 * @param {Function} [randomSource=Math.random] an optional entropy source that
 * returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)
 * @return {Array} subset of n elements in original array
 *
 * @example
 * var values = [1, 2, 4, 5, 6, 7, 8, 9];
 * sample(values, 3); // returns 3 random values, like [2, 5, 8];
 */
function sample(x, n, randomSource) {
    // shuffle the original array using a fisher-yates shuffle
    var shuffled = shuffle(x, randomSource);

    // and then return a subset of it - the first `n` elements.
    return shuffled.slice(0, n);
}

/**
 * Create a new column x row matrix.
 *
 * @private
 * @param {number} columns
 * @param {number} rows
 * @return {Array<Array<number>>} matrix
 * @example
 * makeMatrix(10, 10);
 */
function makeMatrix(columns, rows) {
    var matrix = [];
    for (var i = 0; i < columns; i++) {
        var column = [];
        for (var j = 0; j < rows; j++) {
            column.push(0);
        }
        matrix.push(column);
    }
    return matrix;
}

/**
 * For a sorted input, counting the number of unique values
 * is possible in constant time and constant memory. This is
 * a simple implementation of the algorithm.
 *
 * Values are compared with `===`, so objects and non-primitive objects
 * are not handled in any special way.
 *
 * @param {Array<*>} x an array of any kind of value
 * @returns {number} count of unique values
 * @example
 * uniqueCountSorted([1, 2, 3]); // => 3
 * uniqueCountSorted([1, 1, 1]); // => 1
 */
function uniqueCountSorted(x) {
    var uniqueValueCount = 0,
        lastSeenValue;
    for (var i = 0; i < x.length; i++) {
        if (i === 0 || x[i] !== lastSeenValue) {
            lastSeenValue = x[i];
            uniqueValueCount++;
        }
    }
    return uniqueValueCount;
}

/**
 * Generates incrementally computed values based on the sums and sums of
 * squares for the data array
 *
 * @private
 * @param {number} j
 * @param {number} i
 * @param {Array<number>} sums
 * @param {Array<number>} sumsOfSquares
 * @return {number}
 * @example
 * ssq(0, 1, [-1, 0, 2], [1, 1, 5]);
 */
function ssq(j, i, sums, sumsOfSquares) {
    var sji; // s(j, i)
    if (j > 0) {
        var muji = (sums[i] - sums[j - 1]) / (i - j + 1); // mu(j, i)
        sji =
            sumsOfSquares[i] - sumsOfSquares[j - 1] - (i - j + 1) * muji * muji;
    } else {
        sji = sumsOfSquares[i] - (sums[i] * sums[i]) / (i + 1);
    }
    if (sji < 0) {
        return 0;
    }
    return sji;
}

/**
 * Function that recursively divides and conquers computations
 * for cluster j
 *
 * @private
 * @param {number} iMin Minimum index in cluster to be computed
 * @param {number} iMax Maximum index in cluster to be computed
 * @param {number} cluster Index of the cluster currently being computed
 * @param {Array<Array<number>>} matrix
 * @param {Array<Array<number>>} backtrackMatrix
 * @param {Array<number>} sums
 * @param {Array<number>} sumsOfSquares
 */
function fillMatrixColumn(
    iMin,
    iMax,
    cluster,
    matrix,
    backtrackMatrix,
    sums,
    sumsOfSquares
) {
    if (iMin > iMax) {
        return;
    }

    // Start at midpoint between iMin and iMax
    var i = Math.floor((iMin + iMax) / 2);

    matrix[cluster][i] = matrix[cluster - 1][i - 1];
    backtrackMatrix[cluster][i] = i;

    var jlow = cluster; // the lower end for j

    if (iMin > cluster) {
        jlow = Math.max(jlow, backtrackMatrix[cluster][iMin - 1] || 0);
    }
    jlow = Math.max(jlow, backtrackMatrix[cluster - 1][i] || 0);

    var jhigh = i - 1; // the upper end for j
    if (iMax < matrix[0].length - 1) {
        jhigh = Math.min(jhigh, backtrackMatrix[cluster][iMax + 1] || 0);
    }

    var sji;
    var sjlowi;
    var ssqjlow;
    var ssqj;
    for (var j = jhigh; j >= jlow; --j) {
        sji = ssq(j, i, sums, sumsOfSquares);

        if (sji + matrix[cluster - 1][jlow - 1] >= matrix[cluster][i]) {
            break;
        }

        // Examine the lower bound of the cluster border
        sjlowi = ssq(jlow, i, sums, sumsOfSquares);

        ssqjlow = sjlowi + matrix[cluster - 1][jlow - 1];

        if (ssqjlow < matrix[cluster][i]) {
            // Shrink the lower bound
            matrix[cluster][i] = ssqjlow;
            backtrackMatrix[cluster][i] = jlow;
        }
        jlow++;

        ssqj = sji + matrix[cluster - 1][j - 1];
        if (ssqj < matrix[cluster][i]) {
            matrix[cluster][i] = ssqj;
            backtrackMatrix[cluster][i] = j;
        }
    }

    fillMatrixColumn(
        iMin,
        i - 1,
        cluster,
        matrix,
        backtrackMatrix,
        sums,
        sumsOfSquares
    );
    fillMatrixColumn(
        i + 1,
        iMax,
        cluster,
        matrix,
        backtrackMatrix,
        sums,
        sumsOfSquares
    );
}

/**
 * Initializes the main matrices used in Ckmeans and kicks
 * off the divide and conquer cluster computation strategy
 *
 * @private
 * @param {Array<number>} data sorted array of values
 * @param {Array<Array<number>>} matrix
 * @param {Array<Array<number>>} backtrackMatrix
 */
function fillMatrices(data, matrix, backtrackMatrix) {
    var nValues = matrix[0].length;

    // Shift values by the median to improve numeric stability
    var shift = data[Math.floor(nValues / 2)];

    // Cumulative sum and cumulative sum of squares for all values in data array
    var sums = [];
    var sumsOfSquares = [];

    // Initialize first column in matrix & backtrackMatrix
    for (var i = 0, shiftedValue = (void 0); i < nValues; ++i) {
        shiftedValue = data[i] - shift;
        if (i === 0) {
            sums.push(shiftedValue);
            sumsOfSquares.push(shiftedValue * shiftedValue);
        } else {
            sums.push(sums[i - 1] + shiftedValue);
            sumsOfSquares.push(
                sumsOfSquares[i - 1] + shiftedValue * shiftedValue
            );
        }

        // Initialize for cluster = 0
        matrix[0][i] = ssq(0, i, sums, sumsOfSquares);
        backtrackMatrix[0][i] = 0;
    }

    // Initialize the rest of the columns
    var iMin;
    for (var cluster = 1; cluster < matrix.length; ++cluster) {
        if (cluster < matrix.length - 1) {
            iMin = cluster;
        } else {
            // No need to compute matrix[K-1][0] ... matrix[K-1][N-2]
            iMin = nValues - 1;
        }

        fillMatrixColumn(
            iMin,
            nValues - 1,
            cluster,
            matrix,
            backtrackMatrix,
            sums,
            sumsOfSquares
        );
    }
}

/**
 * Ckmeans clustering is an improvement on heuristic-based clustering
 * approaches like Jenks. The algorithm was developed in
 * [Haizhou Wang and Mingzhou Song](http://journal.r-project.org/archive/2011-2/RJournal_2011-2_Wang+Song.pdf)
 * as a [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming) approach
 * to the problem of clustering numeric data into groups with the least
 * within-group sum-of-squared-deviations.
 *
 * Minimizing the difference within groups - what Wang & Song refer to as
 * `withinss`, or within sum-of-squares, means that groups are optimally
 * homogenous within and the data is split into representative groups.
 * This is very useful for visualization, where you may want to represent
 * a continuous variable in discrete color or style groups. This function
 * can provide groups that emphasize differences between data.
 *
 * Being a dynamic approach, this algorithm is based on two matrices that
 * store incrementally-computed values for squared deviations and backtracking
 * indexes.
 *
 * This implementation is based on Ckmeans 3.4.6, which introduced a new divide
 * and conquer approach that improved runtime from O(kn^2) to O(kn log(n)).
 *
 * Unlike the [original implementation](https://cran.r-project.org/web/packages/Ckmeans.1d.dp/index.html),
 * this implementation does not include any code to automatically determine
 * the optimal number of clusters: this information needs to be explicitly
 * provided.
 *
 * ### References
 * _Ckmeans.1d.dp: Optimal k-means Clustering in One Dimension by Dynamic
 * Programming_ Haizhou Wang and Mingzhou Song ISSN 2073-4859
 *
 * from The R Journal Vol. 3/2, December 2011
 * @param {Array<number>} x input data, as an array of number values
 * @param {number} nClusters number of desired classes. This cannot be
 * greater than the number of values in the data array.
 * @returns {Array<Array<number>>} clustered input
 * @throws {Error} if the number of requested clusters is higher than the size of the data
 * @example
 * ckmeans([-1, 2, -1, 2, 4, 5, 6, -1, 2, -1], 3);
 * // The input, clustered into groups of similar numbers.
 * //= [[-1, -1, -1, -1], [2, 2, 2], [4, 5, 6]]);
 */
function ckmeans(x, nClusters) {
    if (nClusters > x.length) {
        throw new Error(
            "cannot generate more classes than there are data values"
        );
    }

    var sorted = numericSort(x);
    // we'll use this as the maximum number of clusters
    var uniqueCount = uniqueCountSorted(sorted);

    // if all of the input values are identical, there's one cluster
    // with all of the input in it.
    if (uniqueCount === 1) {
        return [sorted];
    }

    // named 'S' originally
    var matrix = makeMatrix(nClusters, sorted.length);
    // named 'J' originally
    var backtrackMatrix = makeMatrix(nClusters, sorted.length);

    // This is a dynamic programming way to solve the problem of minimizing
    // within-cluster sum of squares. It's similar to linear regression
    // in this way, and this calculation incrementally computes the
    // sum of squares that are later read.
    fillMatrices(sorted, matrix, backtrackMatrix);

    // The real work of Ckmeans clustering happens in the matrix generation:
    // the generated matrices encode all possible clustering combinations, and
    // once they're generated we can solve for the best clustering groups
    // very quickly.
    var clusters = [];
    var clusterRight = backtrackMatrix[0].length - 1;

    // Backtrack the clusters from the dynamic programming matrix. This
    // starts at the bottom-right corner of the matrix (if the top-left is 0, 0),
    // and moves the cluster target with the loop.
    for (var cluster = backtrackMatrix.length - 1; cluster >= 0; cluster--) {
        var clusterLeft = backtrackMatrix[cluster][clusterRight];

        // fill the cluster from the sorted input by taking a slice of the
        // array. the backtrack matrix makes this easy - it stores the
        // indexes where the cluster should start and end.
        clusters[cluster] = sorted.slice(clusterLeft, clusterRight + 1);

        if (cluster > 0) {
            clusterRight = clusterLeft - 1;
        }
    }

    return clusters;
}

/**
 * Given an array of x, this will find the extent of the
 * x and return an array of breaks that can be used
 * to categorize the x into a number of classes. The
 * returned array will always be 1 longer than the number of
 * classes because it includes the minimum value.
 *
 * @param {Array<number>} x an array of number values
 * @param {number} nClasses number of desired classes
 * @returns {Array<number>} array of class break positions
 * @example
 * equalIntervalBreaks([1, 2, 3, 4, 5, 6], 4); // => [1, 2.25, 3.5, 4.75, 6]
 */
function equalIntervalBreaks(x, nClasses) {
    if (x.length < 2) {
        return x;
    }

    var theMin = min(x);
    var theMax = max(x);

    // the first break will always be the minimum value
    // in the xset
    var breaks = [theMin];

    // The size of each break is the full range of the x
    // divided by the number of classes requested
    var breakSize = (theMax - theMin) / nClasses;

    // In the case of nClasses = 1, this loop won't run
    // and the returned breaks will be [min, max]
    for (var i = 1; i < nClasses; i++) {
        breaks.push(breaks[0] + breakSize * i);
    }

    // the last break will always be the
    // maximum.
    breaks.push(theMax);

    return breaks;
}

/**
 * [Sample covariance](https://en.wikipedia.org/wiki/Sample_mean_and_covariance) of two datasets:
 * how much do the two datasets move together?
 * x and y are two datasets, represented as arrays of numbers.
 *
 * @param {Array<number>} x a sample of two or more data points
 * @param {Array<number>} y a sample of two or more data points
 * @throws {Error} if x and y do not have equal lengths
 * @throws {Error} if x or y have length of one or less
 * @returns {number} sample covariance
 * @example
 * sampleCovariance([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1]); // => -3.5
 */
function sampleCovariance(x, y) {
    // The two datasets must have the same length which must be more than 1
    if (x.length !== y.length) {
        throw new Error("sampleCovariance requires samples with equal lengths");
    }

    if (x.length < 2) {
        throw new Error(
            "sampleCovariance requires at least two data points in each sample"
        );
    }

    // determine the mean of each dataset so that we can judge each
    // value of the dataset fairly as the difference from the mean. this
    // way, if one dataset is [1, 2, 3] and [2, 3, 4], their covariance
    // does not suffer because of the difference in absolute values
    var xmean = mean(x);
    var ymean = mean(y);
    var sum = 0;

    // for each pair of values, the covariance increases when their
    // difference from the mean is associated - if both are well above
    // or if both are well below
    // the mean, the covariance increases significantly.
    for (var i = 0; i < x.length; i++) {
        sum += (x[i] - xmean) * (y[i] - ymean);
    }

    // this is Bessels' Correction: an adjustment made to sample statistics
    // that allows for the reduced degree of freedom entailed in calculating
    // values from samples rather than complete populations.
    var besselsCorrection = x.length - 1;

    // the covariance is weighted by the length of the datasets.
    return sum / besselsCorrection;
}

/**
 * The [sample variance](https://en.wikipedia.org/wiki/Variance#Sample_variance)
 * is the sum of squared deviations from the mean. The sample variance
 * is distinguished from the variance by the usage of [Bessel's Correction](https://en.wikipedia.org/wiki/Bessel's_correction):
 * instead of dividing the sum of squared deviations by the length of the input,
 * it is divided by the length minus one. This corrects the bias in estimating
 * a value from a set that you don't know if full.
 *
 * References:
 * * [Wolfram MathWorld on Sample Variance](http://mathworld.wolfram.com/SampleVariance.html)
 *
 * @param {Array<number>} x a sample of two or more data points
 * @throws {Error} if the length of x is less than 2
 * @return {number} sample variance
 * @example
 * sampleVariance([1, 2, 3, 4, 5]); // => 2.5
 */
function sampleVariance(x) {
    if (x.length < 2) {
        throw new Error("sampleVariance requires at least two data points");
    }

    var sumSquaredDeviationsValue = sumNthPowerDeviations(x, 2);

    // this is Bessels' Correction: an adjustment made to sample statistics
    // that allows for the reduced degree of freedom entailed in calculating
    // values from samples rather than complete populations.
    var besselsCorrection = x.length - 1;

    // Find the mean value of that list
    return sumSquaredDeviationsValue / besselsCorrection;
}

/**
 * The [sample standard deviation](http://en.wikipedia.org/wiki/Standard_deviation#Sample_standard_deviation)
 * is the square root of the sample variance.
 *
 * @param {Array<number>} x input array
 * @returns {number} sample standard deviation
 * @example
 * sampleStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9]).toFixed(2);
 * // => '2.14'
 */
function sampleStandardDeviation(x) {
    var sampleVarianceX = sampleVariance(x);
    return Math.sqrt(sampleVarianceX);
}

/**
 * The [correlation](http://en.wikipedia.org/wiki/Correlation_and_dependence) is
 * a measure of how correlated two datasets are, between -1 and 1
 *
 * @param {Array<number>} x first input
 * @param {Array<number>} y second input
 * @returns {number} sample correlation
 * @example
 * sampleCorrelation([1, 2, 3, 4, 5, 6], [2, 2, 3, 4, 5, 60]).toFixed(2);
 * // => '0.69'
 */
function sampleCorrelation(x, y) {
    var cov = sampleCovariance(x, y);
    var xstd = sampleStandardDeviation(x);
    var ystd = sampleStandardDeviation(y);

    return cov / xstd / ystd;
}

/**
 * The [rank correlation](https://en.wikipedia.org/wiki/Rank_correlation) is
 * a measure of the strength of monotonic relationship between two arrays
 *
 * @param {Array<number>} x first input
 * @param {Array<number>} y second input
 * @returns {number} sample rank correlation
 */
function sampleRankCorrelation(x, y) {
    var xIndexes = x
        .map(function (value, index) { return [value, index]; })
        .sort(function (a, b) { return a[0] - b[0]; })
        .map(function (pair) { return pair[1]; });
    var yIndexes = y
        .map(function (value, index) { return [value, index]; })
        .sort(function (a, b) { return a[0] - b[0]; })
        .map(function (pair) { return pair[1]; });

    // At this step, we have an array of indexes
    // that map from sorted numbers to their original indexes. We reverse
    // that so that it is an array of the sorted destination index.
    var xRanks = Array(xIndexes.length);
    var yRanks = Array(xIndexes.length);
    for (var i = 0; i < xIndexes.length; i++) {
        xRanks[xIndexes[i]] = i;
        yRanks[yIndexes[i]] = i;
    }

    return sampleCorrelation(xRanks, yRanks);
}

/**
 * [Skewness](http://en.wikipedia.org/wiki/Skewness) is
 * a measure of the extent to which a probability distribution of a
 * real-valued random variable "leans" to one side of the mean.
 * The skewness value can be positive or negative, or even undefined.
 *
 * Implementation is based on the adjusted Fisher-Pearson standardized
 * moment coefficient, which is the version found in Excel and several
 * statistical packages including Minitab, SAS and SPSS.
 *
 * @since 4.1.0
 * @param {Array<number>} x a sample of 3 or more data points
 * @returns {number} sample skewness
 * @throws {Error} if x has length less than 3
 * @example
 * sampleSkewness([2, 4, 6, 3, 1]); // => 0.590128656384365
 */
function sampleSkewness(x) {
    if (x.length < 3) {
        throw new Error("sampleSkewness requires at least three data points");
    }

    var meanValue = mean(x);
    var tempValue;
    var sumSquaredDeviations = 0;
    var sumCubedDeviations = 0;

    for (var i = 0; i < x.length; i++) {
        tempValue = x[i] - meanValue;
        sumSquaredDeviations += tempValue * tempValue;
        sumCubedDeviations += tempValue * tempValue * tempValue;
    }

    // this is Bessels' Correction: an adjustment made to sample statistics
    // that allows for the reduced degree of freedom entailed in calculating
    // values from samples rather than complete populations.
    var besselsCorrection = x.length - 1;

    // Find the mean value of that list
    var theSampleStandardDeviation = Math.sqrt(
        sumSquaredDeviations / besselsCorrection
    );

    var n = x.length;
    var cubedS = Math.pow(theSampleStandardDeviation, 3);

    return (n * sumCubedDeviations) / ((n - 1) * (n - 2) * cubedS);
}

/**
 * [Kurtosis](http://en.wikipedia.org/wiki/Kurtosis) is
 * a measure of the heaviness of a distribution's tails relative to its
 * variance. The kurtosis value can be positive or negative, or even undefined.
 *
 * Implementation is based on Fisher's excess kurtosis definition and uses
 * unbiased moment estimators. This is the version found in Excel and available
 * in several statistical packages, including SAS and SciPy.
 *
 * @param {Array<number>} x a sample of 4 or more data points
 * @returns {number} sample kurtosis
 * @throws {Error} if x has length less than 4
 * @example
 * sampleKurtosis([1, 2, 2, 3, 5]); // => 1.4555765595463122
 */
function sampleKurtosis(x) {
    var n = x.length;

    if (n < 4) {
        throw new Error("sampleKurtosis requires at least four data points");
    }

    var meanValue = mean(x);
    var tempValue;
    var secondCentralMoment = 0;
    var fourthCentralMoment = 0;

    for (var i = 0; i < n; i++) {
        tempValue = x[i] - meanValue;
        secondCentralMoment += tempValue * tempValue;
        fourthCentralMoment += tempValue * tempValue * tempValue * tempValue;
    }

    return (
        ((n - 1) / ((n - 2) * (n - 3))) *
        ((n * (n + 1) * fourthCentralMoment) /
            (secondCentralMoment * secondCentralMoment) -
            3 * (n - 1))
    );
}

/**
 * Implementation of [Heap's Algorithm](https://en.wikipedia.org/wiki/Heap%27s_algorithm)
 * for generating permutations.
 *
 * @param {Array} elements any type of data
 * @returns {Array<Array>} array of permutations
 */
function permutationsHeap(elements) {
    var indexes = new Array(elements.length);
    var permutations = [elements.slice()];

    for (var i = 0; i < elements.length; i++) {
        indexes[i] = 0;
    }

    for (var i$1 = 0; i$1 < elements.length; ) {
        if (indexes[i$1] < i$1) {
            // At odd indexes, swap from indexes[i] instead
            // of from the beginning of the array
            var swapFrom = 0;
            if (i$1 % 2 !== 0) {
                swapFrom = indexes[i$1];
            }

            // swap between swapFrom and i, using
            // a temporary variable as storage.
            var temp = elements[swapFrom];
            elements[swapFrom] = elements[i$1];
            elements[i$1] = temp;

            permutations.push(elements.slice());
            indexes[i$1]++;
            i$1 = 0;
        } else {
            indexes[i$1] = 0;
            i$1++;
        }
    }

    return permutations;
}

/**
 * Implementation of Combinations
 * Combinations are unique subsets of a collection - in this case, k x from a collection at a time.
 * https://en.wikipedia.org/wiki/Combination
 * @param {Array} x any type of data
 * @param {int} k the number of objects in each group (without replacement)
 * @returns {Array<Array>} array of permutations
 * @example
 * combinations([1, 2, 3], 2); // => [[1,2], [1,3], [2,3]]
 */

function combinations(x, k) {
    var i;
    var subI;
    var combinationList = [];
    var subsetCombinations;
    var next;

    for (i = 0; i < x.length; i++) {
        if (k === 1) {
            combinationList.push([x[i]]);
        } else {
            subsetCombinations = combinations(x.slice(i + 1, x.length), k - 1);
            for (subI = 0; subI < subsetCombinations.length; subI++) {
                next = subsetCombinations[subI];
                next.unshift(x[i]);
                combinationList.push(next);
            }
        }
    }
    return combinationList;
}

/**
 * Implementation of [Combinations](https://en.wikipedia.org/wiki/Combination) with replacement
 * Combinations are unique subsets of a collection - in this case, k x from a collection at a time.
 * 'With replacement' means that a given element can be chosen multiple times.
 * Unlike permutation, order doesn't matter for combinations.
 *
 * @param {Array} x any type of data
 * @param {int} k the number of objects in each group (without replacement)
 * @returns {Array<Array>} array of permutations
 * @example
 * combinationsReplacement([1, 2], 2); // => [[1, 1], [1, 2], [2, 2]]
 */
function combinationsReplacement(x, k) {
    var combinationList = [];

    for (var i = 0; i < x.length; i++) {
        if (k === 1) {
            // If we're requested to find only one element, we don't need
            // to recurse: just push `x[i]` onto the list of combinations.
            combinationList.push([x[i]]);
        } else {
            // Otherwise, recursively find combinations, given `k - 1`. Note that
            // we request `k - 1`, so if you were looking for k=3 combinations, we're
            // requesting k=2. This -1 gets reversed in the for loop right after this
            // code, since we concatenate `x[i]` onto the selected combinations,
            // bringing `k` back up to your requested level.
            // This recursion may go many levels deep, since it only stops once
            // k=1.
            var subsetCombinations = combinationsReplacement(
                x.slice(i, x.length),
                k - 1
            );

            for (var j = 0; j < subsetCombinations.length; j++) {
                combinationList.push([x[i]].concat(subsetCombinations[j]));
            }
        }
    }

    return combinationList;
}

/**
 * When adding a new value to a list, one does not have to necessary
 * recompute the mean of the list in linear time. They can instead use
 * this function to compute the new mean by providing the current mean,
 * the number of elements in the list that produced it and the new
 * value to add.
 *
 * @since 2.5.0
 * @param {number} mean current mean
 * @param {number} n number of items in the list
 * @param {number} newValue the added value
 * @returns {number} the new mean
 *
 * @example
 * addToMean(14, 5, 53); // => 20.5
 */
function addToMean(mean, n, newValue) {
    return mean + (newValue - mean) / (n + 1);
}

/**
 * When combining two lists of values for which one already knows the means,
 * one does not have to necessary recompute the mean of the combined lists in
 * linear time. They can instead use this function to compute the combined
 * mean by providing the mean & number of values of the first list and the mean
 * & number of values of the second list.
 *
 * @since 3.0.0
 * @param {number} mean1 mean of the first list
 * @param {number} n1 number of items in the first list
 * @param {number} mean2 mean of the second list
 * @param {number} n2 number of items in the second list
 * @returns {number} the combined mean
 *
 * @example
 * combineMeans(5, 3, 4, 3); // => 4.5
 */
function combineMeans(mean1, n1, mean2, n2) {
    return (mean1 * n1 + mean2 * n2) / (n1 + n2);
}

/**
 * When combining two lists of values for which one already knows the variances,
 * one does not have to necessary recompute the variance of the combined lists
 * in linear time. They can instead use this function to compute the combined
 * variance by providing the variance, mean & number of values of the first list
 * and the variance, mean & number of values of the second list.
 *
 * @since 3.0.0
 * @param {number} variance1 variance of the first list
 * @param {number} mean1 mean of the first list
 * @param {number} n1 number of items in the first list
 * @param {number} variance2 variance of the second list
 * @param {number} mean2 mean of the second list
 * @param {number} n2 number of items in the second list
 * @returns {number} the combined mean
 *
 * @example
 * combineVariances(14 / 3, 5, 3, 8 / 3, 4, 3); // => 47 / 12
 */
function combineVariances(variance1, mean1, n1, variance2, mean2, n2) {
    var newMean = combineMeans(mean1, n1, mean2, n2);

    return (
        (n1 * (variance1 + Math.pow(mean1 - newMean, 2)) +
            n2 * (variance2 + Math.pow(mean2 - newMean, 2))) /
        (n1 + n2)
    );
}

/**
 * The [Geometric Mean](https://en.wikipedia.org/wiki/Geometric_mean) is
 * a mean function that is more useful for numbers in different
 * ranges.
 *
 * This is the nth root of the input numbers multiplied by each other.
 *
 * The geometric mean is often useful for
 * **[proportional growth](https://en.wikipedia.org/wiki/Geometric_mean#Proportional_growth)**: given
 * growth rates for multiple years, like _80%, 16.66% and 42.85%_, a simple
 * mean will incorrectly estimate an average growth rate, whereas a geometric
 * mean will correctly estimate a growth rate that, over those years,
 * will yield the same end value.
 *
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * @param {Array<number>} x sample of one or more data points
 * @returns {number} geometric mean
 * @throws {Error} if x is empty
 * @throws {Error} if x contains a negative number
 * @example
 * var growthRates = [1.80, 1.166666, 1.428571];
 * var averageGrowth = ss.geometricMean(growthRates);
 * var averageGrowthRates = [averageGrowth, averageGrowth, averageGrowth];
 * var startingValue = 10;
 * var startingValueMean = 10;
 * growthRates.forEach(function(rate) {
 *   startingValue *= rate;
 * });
 * averageGrowthRates.forEach(function(rate) {
 *   startingValueMean *= rate;
 * });
 * startingValueMean === startingValue;
 */
function geometricMean(x) {
    if (x.length === 0) {
        throw new Error("geometricMean requires at least one data point");
    }

    // the starting value.
    var value = 1;

    for (var i = 0; i < x.length; i++) {
        // the geometric mean is only valid for positive numbers
        if (x[i] < 0) {
            throw new Error(
                "geometricMean requires only non-negative numbers as input"
            );
        }

        // repeatedly multiply the value by each number
        value *= x[i];
    }

    return Math.pow(value, 1 / x.length);
}

/**
 * The [log average](https://en.wikipedia.org/wiki/https://en.wikipedia.org/wiki/Geometric_mean#Relationship_with_logarithms)
 * is an equivalent way of computing the geometric mean of an array suitable for large or small products.
 *
 * It's found by calculating the average logarithm of the elements and exponentiating.
 *
 * @param {Array<number>} x sample of one or more data points
 * @returns {number} geometric mean
 * @throws {Error} if x is empty
 * @throws {Error} if x contains a negative number
 */
function logAverage(x) {
    if (x.length === 0) {
        throw new Error("logAverage requires at least one data point");
    }

    var value = 0;
    for (var i = 0; i < x.length; i++) {
        if (x[i] < 0) {
            throw new Error(
                "logAverage requires only non-negative numbers as input"
            );
        }
        value += Math.log(x[i]);
    }

    return Math.exp(value / x.length);
}

/**
 * The [Harmonic Mean](https://en.wikipedia.org/wiki/Harmonic_mean) is
 * a mean function typically used to find the average of rates.
 * This mean is calculated by taking the reciprocal of the arithmetic mean
 * of the reciprocals of the input numbers.
 *
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * @param {Array<number>} x sample of one or more data points
 * @returns {number} harmonic mean
 * @throws {Error} if x is empty
 * @throws {Error} if x contains a negative number
 * @example
 * harmonicMean([2, 3]).toFixed(2) // => '2.40'
 */
function harmonicMean(x) {
    if (x.length === 0) {
        throw new Error("harmonicMean requires at least one data point");
    }

    var reciprocalSum = 0;

    for (var i = 0; i < x.length; i++) {
        // the harmonic mean is only valid for positive numbers
        if (x[i] <= 0) {
            throw new Error(
                "harmonicMean requires only positive numbers as input"
            );
        }

        reciprocalSum += 1 / x[i];
    }

    // divide n by the reciprocal sum
    return x.length / reciprocalSum;
}

/**
 * The mean, _also known as average_,
 * is the sum of all values over the number of values.
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * The simple mean uses the successive addition method internally
 * to calculate it's result. Errors in floating-point addition are
 * not accounted for, so if precision is required, the standard {@link mean}
 * method should be used instead.
 *
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 *
 * @param {Array<number>} x sample of one or more data points
 * @throws {Error} if the length of x is less than one
 * @returns {number} mean
 * @example
 * mean([0, 10]); // => 5
 */
function meanSimple(x) {
    if (x.length === 0) {
        throw new Error("meanSimple requires at least one data point");
    }

    return sumSimple(x) / x.length;
}

/**
 * The [median](http://en.wikipedia.org/wiki/Median) is
 * the middle number of a list. This is often a good indicator of 'the middle'
 * when there are outliers that skew the `mean()` value.
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * The median isn't necessarily one of the elements in the list: the value
 * can be the average of two elements if the list has an even length
 * and the two central values are different.
 *
 * @param {Array<number>} sorted input
 * @returns {number} median value
 * @example
 * medianSorted([10, 2, 5, 100, 2, 1]); // => 52.5
 */
function medianSorted(sorted) {
    return quantileSorted(sorted, 0.5);
}

/**
 * When removing a value from a list, one does not have to necessary
 * recompute the mean of the list in linear time. They can instead use
 * this function to compute the new mean by providing the current mean,
 * the number of elements in the list that produced it and the value to remove.
 *
 * @since 3.0.0
 * @param {number} mean current mean
 * @param {number} n number of items in the list
 * @param {number} value the value to remove
 * @returns {number} the new mean
 *
 * @example
 * subtractFromMean(20.5, 6, 53); // => 14
 */
function subtractFromMean(mean, n, value) {
    return (mean * n - value) / (n - 1);
}

/**
 * The Root Mean Square (RMS) is
 * a mean function used as a measure of the magnitude of a set
 * of numbers, regardless of their sign.
 * This is the square root of the mean of the squares of the
 * input numbers.
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * @param {Array<number>} x a sample of one or more data points
 * @returns {number} root mean square
 * @throws {Error} if x is empty
 * @example
 * rootMeanSquare([-1, 1, -1, 1]); // => 1
 */
function rootMeanSquare(x) {
    if (x.length === 0) {
        throw new Error("rootMeanSquare requires at least one data point");
    }

    var sumOfSquares = 0;
    for (var i = 0; i < x.length; i++) {
        sumOfSquares += Math.pow(x[i], 2);
    }

    return Math.sqrt(sumOfSquares / x.length);
}

/**
 * The`coefficient of variation`_ is the ratio of the standard deviation to the mean.
 * .._`coefficient of variation`: https://en.wikipedia.org/wiki/Coefficient_of_variation
 *
 *
 * @param {Array} x input
 * @returns {number} coefficient of variation
 * @example
 * coefficientOfVariation([1, 2, 3, 4]).toFixed(3); // => 0.516
 * coefficientOfVariation([1, 2, 3, 4, 5]).toFixed(3); // => 0.527
 * coefficientOfVariation([-1, 0, 1, 2, 3, 4]).toFixed(3); // => 1.247
 */
function coefficientOfVariation(x) {
    return sampleStandardDeviation(x) / mean(x);
}

/**
 * This is to compute [a one-sample t-test](https://en.wikipedia.org/wiki/Student%27s_t-test#One-sample_t-test), comparing the mean
 * of a sample to a known value, x.
 *
 * in this case, we're trying to determine whether the
 * population mean is equal to the value that we know, which is `x`
 * here. Usually the results here are used to look up a
 * [p-value](http://en.wikipedia.org/wiki/P-value), which, for
 * a certain level of significance, will let you determine that the
 * null hypothesis can or cannot be rejected.
 *
 * @param {Array<number>} x sample of one or more numbers
 * @param {number} expectedValue expected value of the population mean
 * @returns {number} value
 * @example
 * tTest([1, 2, 3, 4, 5, 6], 3.385).toFixed(2); // => '0.16'
 */
function tTest(x, expectedValue) {
    // The mean of the sample
    var sampleMean = mean(x);

    // The standard deviation of the sample
    var sd = standardDeviation(x);

    // Square root the length of the sample
    var rootN = Math.sqrt(x.length);

    // returning the t value
    return (sampleMean - expectedValue) / (sd / rootN);
}

/**
 * This is to compute [two sample t-test](http://en.wikipedia.org/wiki/Student's_t-test).
 * Tests whether "mean(X)-mean(Y) = difference", (
 * in the most common case, we often have `difference == 0` to test if two samples
 * are likely to be taken from populations with the same mean value) with
 * no prior knowledge on standard deviations of both samples
 * other than the fact that they have the same standard deviation.
 *
 * Usually the results here are used to look up a
 * [p-value](http://en.wikipedia.org/wiki/P-value), which, for
 * a certain level of significance, will let you determine that the
 * null hypothesis can or cannot be rejected.
 *
 * `diff` can be omitted if it equals 0.
 *
 * [This is used to reject](https://en.wikipedia.org/wiki/Exclusion_of_the_null_hypothesis)
 * a null hypothesis that the two populations that have been sampled into
 * `sampleX` and `sampleY` are equal to each other.
 *
 * @param {Array<number>} sampleX a sample as an array of numbers
 * @param {Array<number>} sampleY a sample as an array of numbers
 * @param {number} [difference=0]
 * @returns {number|null} test result
 *
 * @example
 * tTestTwoSample([1, 2, 3, 4], [3, 4, 5, 6], 0); // => -2.1908902300206643
 */
function tTestTwoSample(sampleX, sampleY, difference) {
    var n = sampleX.length;
    var m = sampleY.length;

    // If either sample doesn't actually have any values, we can't
    // compute this at all, so we return `null`.
    if (!n || !m) {
        return null;
    }

    // default difference (mu) is zero
    if (!difference) {
        difference = 0;
    }

    var meanX = mean(sampleX);
    var meanY = mean(sampleY);
    var sampleVarianceX = sampleVariance(sampleX);
    var sampleVarianceY = sampleVariance(sampleY);

    if (
        typeof meanX === "number" &&
        typeof meanY === "number" &&
        typeof sampleVarianceX === "number" &&
        typeof sampleVarianceY === "number"
    ) {
        var weightedVariance =
            ((n - 1) * sampleVarianceX + (m - 1) * sampleVarianceY) /
            (n + m - 2);

        return (
            (meanX - meanY - difference) /
            Math.sqrt(weightedVariance * (1 / n + 1 / m))
        );
    }
}

/**
 * This function calculates the Wilcoxon rank sum statistic for the first sample
 * with respect to the second. The Wilcoxon rank sum test is a non-parametric
 * alternative to the t-test which is equivalent to the
 * [Mann-Whitney U test](https://en.wikipedia.org/wiki/Mann%E2%80%93Whitney_U_test).
 * The statistic is calculated by pooling all the observations together, ranking them,
 * and then summing the ranks associated with one of the samples. If this rank sum is
 * sufficiently large or small we reject the hypothesis that the two samples come
 * from the same distribution in favor of the alternative that one is shifted with
 * respect to the other.
 *
 * @param {Array<number>} sampleX a sample as an array of numbers
 * @param {Array<number>} sampleY a sample as an array of numbers
 * @returns {number} rank sum for sampleX
 *
 * @example
 * wilcoxonRankSum([1, 4, 8], [9, 12, 15]); // => 6
 */
function wilcoxonRankSum(sampleX, sampleY) {
    if (!sampleX.length || !sampleY.length) {
        throw new Error("Neither sample can be empty");
    }

    var pooledSamples = sampleX
        .map(function (x) { return ({ label: "x", value: x }); })
        .concat(sampleY.map(function (y) { return ({ label: "y", value: y }); }))
        .sort(function (a, b) { return a.value - b.value; });

    for (var rank = 0; rank < pooledSamples.length; rank++) {
        pooledSamples[rank].rank = rank;
    }

    var tiedRanks = [pooledSamples[0].rank];
    for (var i = 1; i < pooledSamples.length; i++) {
        if (pooledSamples[i].value === pooledSamples[i - 1].value) {
            tiedRanks.push(pooledSamples[i].rank);
            if (i === pooledSamples.length - 1) {
                replaceRanksInPlace(pooledSamples, tiedRanks);
            }
        } else if (tiedRanks.length > 1) {
            replaceRanksInPlace(pooledSamples, tiedRanks);
        } else {
            tiedRanks = [pooledSamples[i].rank];
        }
    }

    function replaceRanksInPlace(pooledSamples, tiedRanks) {
        var average = (tiedRanks[0] + tiedRanks[tiedRanks.length - 1]) / 2;
        for (var i = 0; i < tiedRanks.length; i++) {
            pooledSamples[tiedRanks[i]].rank = average;
        }
    }

    var rankSum = 0;

    for (var i$1 = 0; i$1 < pooledSamples.length; i$1++) {
        var sample = pooledSamples[i$1];
        if (sample.label === "x") {
            rankSum += sample.rank + 1;
        }
    }

    return rankSum;
}

/**
 * [Bayesian Classifier](http://en.wikipedia.org/wiki/Naive_Bayes_classifier)
 *
 * This is a naïve bayesian classifier that takes
 * singly-nested objects.
 *
 * @class
 * @example
 * var bayes = new BayesianClassifier();
 * bayes.train({
 *   species: 'Cat'
 * }, 'animal');
 * var result = bayes.score({
 *   species: 'Cat'
 * })
 * // result
 * // {
 * //   animal: 1
 * // }
 */
var BayesianClassifier = function BayesianClassifier() {
    // The number of items that are currently
    // classified in the model
    this.totalCount = 0;
    // Every item classified in the model
    this.data = {};
};

/**
 * Train the classifier with a new item, which has a single
 * dimension of Javascript literal keys and values.
 *
 * @param {Object} item an object with singly-deep properties
 * @param {string} category the category this item belongs to
 * @return {undefined} adds the item to the classifier
 */
BayesianClassifier.prototype.train = function train (item, category) {
    // If the data object doesn't have any values
    // for this category, create a new object for it.
    if (!this.data[category]) {
        this.data[category] = {};
    }

    // Iterate through each key in the item.
    for (var k in item) {
        var v = item[k];
        // Initialize the nested object `data[category][k][item[k]]`
        // with an object of keys that equal 0.
        if (this.data[category][k] === undefined) {
            this.data[category][k] = {};
        }
        if (this.data[category][k][v] === undefined) {
            this.data[category][k][v] = 0;
        }

        // And increment the key for this key/value combination.
        this.data[category][k][v]++;
    }

    // Increment the number of items classified
    this.totalCount++;
};

/**
 * Generate a score of how well this item matches all
 * possible categories based on its attributes
 *
 * @param {Object} item an item in the same format as with train
 * @returns {Object} of probabilities that this item belongs to a
 * given category.
 */
BayesianClassifier.prototype.score = function score (item) {
    // Initialize an empty array of odds per category.
    var odds = {};
    var category;
    // Iterate through each key in the item,
    // then iterate through each category that has been used
    // in previous calls to `.train()`
    for (var k in item) {
        var v = item[k];
        for (category in this.data) {
            // Create an empty object for storing key - value combinations
            // for this category.
            odds[category] = {};

            // If this item doesn't even have a property, it counts for nothing,
            // but if it does have the property that we're looking for from
            // the item to categorize, it counts based on how popular it is
            // versus the whole population.
            if (this.data[category][k]) {
                odds[category][k + "_" + v] =
                    (this.data[category][k][v] || 0) / this.totalCount;
            } else {
                odds[category][k + "_" + v] = 0;
            }
        }
    }

    // Set up a new object that will contain sums of these odds by category
    var oddsSums = {};

    for (category in odds) {
        // Tally all of the odds for each category-combination pair -
        // the non-existence of a category does not add anything to the
        // score.
        oddsSums[category] = 0;
        for (var combination in odds[category]) {
            oddsSums[category] += odds[category][combination];
        }
    }

    return oddsSums;
};

/**
 * This is a single-layer [Perceptron Classifier](http://en.wikipedia.org/wiki/Perceptron) that takes
 * arrays of numbers and predicts whether they should be classified
 * as either 0 or 1 (negative or positive examples).
 * @class
 * @example
 * // Create the model
 * var p = new PerceptronModel();
 * // Train the model with input with a diagonal boundary.
 * for (var i = 0; i < 5; i++) {
 *     p.train([1, 1], 1);
 *     p.train([0, 1], 0);
 *     p.train([1, 0], 0);
 *     p.train([0, 0], 0);
 * }
 * p.predict([0, 0]); // 0
 * p.predict([0, 1]); // 0
 * p.predict([1, 0]); // 0
 * p.predict([1, 1]); // 1
 */
var PerceptronModel = function PerceptronModel() {
    // The weights, or coefficients of the model;
    // weights are only populated when training with data.
    this.weights = [];
    // The bias term, or intercept; it is also a weight but
    // it's stored separately for convenience as it is always
    // multiplied by one.
    this.bias = 0;
};
/**
 * **Predict**: Use an array of features with the weight array and bias
 * to predict whether an example is labeled 0 or 1.
 *
 * @param {Array<number>} features an array of features as numbers
 * @returns {number} 1 if the score is over 0, otherwise 0
 */
PerceptronModel.prototype.predict = function predict (features) {
    // Only predict if previously trained
    // on the same size feature array(s).
    if (features.length !== this.weights.length) {
        return null;
    }

    // Calculate the sum of features times weights,
    // with the bias added (implicitly times one).
    var score = 0;
    for (var i = 0; i < this.weights.length; i++) {
        score += this.weights[i] * features[i];
    }
    score += this.bias;

    // Classify as 1 if the score is over 0, otherwise 0.
    if (score > 0) {
        return 1;
    } else {
        return 0;
    }
};

/**
 * **Train** the classifier with a new example, which is
 * a numeric array of features and a 0 or 1 label.
 *
 * @param {Array<number>} features an array of features as numbers
 * @param {number} label either 0 or 1
 * @returns {PerceptronModel} this
 */
PerceptronModel.prototype.train = function train (features, label) {
    // Require that only labels of 0 or 1 are considered.
    if (label !== 0 && label !== 1) {
        return null;
    }
    // The length of the feature array determines
    // the length of the weight array.
    // The perceptron will continue learning as long as
    // it keeps seeing feature arrays of the same length.
    // When it sees a new data shape, it initializes.
    if (features.length !== this.weights.length) {
        this.weights = features;
        this.bias = 1;
    }
    // Make a prediction based on current weights.
    var prediction = this.predict(features);
    // Update the weights if the prediction is wrong.
    if (typeof prediction === "number" && prediction !== label) {
        var gradient = label - prediction;
        for (var i = 0; i < this.weights.length; i++) {
            this.weights[i] += gradient * features[i];
        }
        this.bias += gradient;
    }
    return this;
};

/**
 * We use `ε`, epsilon, as a stopping criterion when we want to iterate
 * until we're "close enough". Epsilon is a very small number: for
 * simple statistics, that number is **0.0001**
 *
 * This is used in calculations like the binomialDistribution, in which
 * the process of finding a value is [iterative](https://en.wikipedia.org/wiki/Iterative_method):
 * it progresses until it is close enough.
 *
 * Below is an example of using epsilon in [gradient descent](https://en.wikipedia.org/wiki/Gradient_descent),
 * where we're trying to find a local minimum of a function's derivative,
 * given by the `fDerivative` method.
 *
 * @example
 * // From calculation, we expect that the local minimum occurs at x=9/4
 * var x_old = 0;
 * // The algorithm starts at x=6
 * var x_new = 6;
 * var stepSize = 0.01;
 *
 * function fDerivative(x) {
 *   return 4 * Math.pow(x, 3) - 9 * Math.pow(x, 2);
 * }
 *
 * // The loop runs until the difference between the previous
 * // value and the current value is smaller than epsilon - a rough
 * // meaure of 'close enough'
 * while (Math.abs(x_new - x_old) > ss.epsilon) {
 *   x_old = x_new;
 *   x_new = x_old - stepSize * fDerivative(x_old);
 * }
 *
 * console.log('Local minimum occurs at', x_new);
 */
var epsilon = 0.0001;

/**
 * A [Factorial](https://en.wikipedia.org/wiki/Factorial), usually written n!, is the product of all positive
 * integers less than or equal to n. Often factorial is implemented
 * recursively, but this iterative approach is significantly faster
 * and simpler.
 *
 * @param {number} n input, must be an integer number 1 or greater
 * @returns {number} factorial: n!
 * @throws {Error} if n is less than 0 or not an integer
 * @example
 * factorial(5); // => 120
 */
function factorial(n) {
    // factorial is mathematically undefined for negative numbers
    if (n < 0) {
        throw new Error("factorial requires a non-negative value");
    }

    if (Math.floor(n) !== n) {
        throw new Error("factorial requires an integer input");
    }

    // typically you'll expand the factorial function going down, like
    // 5! = 5 * 4 * 3 * 2 * 1. This is going in the opposite direction,
    // counting from 2 up to the number in question, and since anything
    // multiplied by 1 is itself, the loop only needs to start at 2.
    var accumulator = 1;
    for (var i = 2; i <= n; i++) {
        // for each number up to and including the number `n`, multiply
        // the accumulator my that number.
        accumulator *= i;
    }
    return accumulator;
}

/**
 * Compute the [gamma function](https://en.wikipedia.org/wiki/Gamma_function) of a value using Nemes' approximation.
 * The gamma of n is equivalent to (n-1)!, but unlike the factorial function, gamma is defined for all real n except zero
 * and negative integers (where NaN is returned). Note, the gamma function is also well-defined for complex numbers,
 * though this implementation currently does not handle complex numbers as input values.
 * Nemes' approximation is defined [here](https://arxiv.org/abs/1003.6020) as Theorem 2.2.
 * Negative values use [Euler's reflection formula](https://en.wikipedia.org/wiki/Gamma_function#Properties) for computation.
 *
 * @param {number} n Any real number except for zero and negative integers.
 * @returns {number} The gamma of the input value.
 *
 * @example
 * gamma(11.5); // 11899423.084037038
 * gamma(-11.5); // 2.29575810481609e-8
 * gamma(5); // 24
 */
function gamma(n) {
    if (Number.isInteger(n)) {
        if (n <= 0) {
            // gamma not defined for zero or negative integers
            return NaN;
        } else {
            // use factorial for integer inputs
            return factorial(n - 1);
        }
    }

    // Decrement n, because approximation is defined for n - 1
    n--;

    if (n < 0) {
        // Use Euler's reflection formula for negative inputs
        // see:  https://en.wikipedia.org/wiki/Gamma_function#Properties
        return Math.PI / (Math.sin(Math.PI * -n) * gamma(-n));
    } else {
        // Nemes' expansion approximation
        var seriesCoefficient =
            Math.pow(n / Math.E, n) * Math.sqrt(2 * Math.PI * (n + 1 / 6));

        var seriesDenom = n + 1 / 4;

        var seriesExpansion =
            1 +
            1 / 144 / Math.pow(seriesDenom, 2) -
            1 / 12960 / Math.pow(seriesDenom, 3) -
            257 / 207360 / Math.pow(seriesDenom, 4) -
            52 / 2612736 / Math.pow(seriesDenom, 5) +
            5741173 / 9405849600 / Math.pow(seriesDenom, 6) +
            37529 / 18811699200 / Math.pow(seriesDenom, 7);

        return seriesCoefficient * seriesExpansion;
    }
}

// Define series coefficients
var COEFFICIENTS = [
    0.99999999999999709182,
    57.156235665862923517,
    -59.597960355475491248,
    14.136097974741747174,
    -0.49191381609762019978,
    0.33994649984811888699e-4,
    0.46523628927048575665e-4,
    -0.98374475304879564677e-4,
    0.15808870322491248884e-3,
    -0.21026444172410488319e-3,
    0.2174396181152126432e-3,
    -0.16431810653676389022e-3,
    0.84418223983852743293e-4,
    -0.2619083840158140867e-4,
    0.36899182659531622704e-5
];

var g = 607 / 128;
var LOGSQRT2PI = Math.log(Math.sqrt(2 * Math.PI));

/**
 * Compute the logarithm of the [gamma function](https://en.wikipedia.org/wiki/Gamma_function) of a value using Lanczos' approximation.
 * This function takes as input any real-value n greater than 0.
 * This function is useful for values of n too large for the normal gamma function (n > 165).
 * The code is based on Lanczo's Gamma approximation, defined [here](http://my.fit.edu/~gabdo/gamma.txt).
 *
 * @param {number} n Any real number greater than zero.
 * @returns {number} The logarithm of gamma of the input value.
 *
 * @example
 * gammaln(500); // 2605.1158503617335
 * gammaln(2.4); // 0.21685932244884043
 */
function gammaln(n) {
    // Return infinity if value not in domain
    if (n <= 0) {
        return Infinity;
    }

    // Decrement n, because approximation is defined for n - 1
    n--;

    // Create series approximation
    var a = COEFFICIENTS[0];

    for (var i = 1; i < 15; i++) {
        a += COEFFICIENTS[i] / (n + i);
    }

    var tmp = g + 0.5 + n;

    // Return natural logarithm of gamma(n)
    return LOGSQRT2PI + Math.log(a) - tmp + (n + 0.5) * Math.log(tmp);
}

/**
 * The [Bernoulli distribution](http://en.wikipedia.org/wiki/Bernoulli_distribution)
 * is the probability discrete
 * distribution of a random variable which takes value 1 with success
 * probability `p` and value 0 with failure
 * probability `q` = 1 - `p`. It can be used, for example, to represent the
 * toss of a coin, where "1" is defined to mean "heads" and "0" is defined
 * to mean "tails" (or vice versa). It is
 * a special case of a Binomial Distribution
 * where `n` = 1.
 *
 * @param {number} p input value, between 0 and 1 inclusive
 * @returns {number[]} values of bernoulli distribution at this point
 * @throws {Error} if p is outside 0 and 1
 * @example
 * bernoulliDistribution(0.3); // => [0.7, 0.3]
 */
function bernoulliDistribution(p) /*: number[] */ {
    // Check that `p` is a valid probability (0 ≤ p ≤ 1)
    if (p < 0 || p > 1) {
        throw new Error(
            "bernoulliDistribution requires probability to be between 0 and 1 inclusive"
        );
    }

    return [1 - p, p];
}

/**
 * The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution) is the discrete probability
 * distribution of the number of successes in a sequence of n independent yes/no experiments, each of which yields
 * success with probability `probability`. Such a success/failure experiment is also called a Bernoulli experiment or
 * Bernoulli trial; when trials = 1, the Binomial Distribution is a Bernoulli Distribution.
 *
 * @param {number} trials number of trials to simulate
 * @param {number} probability
 * @returns {number[]} output
 */
function binomialDistribution(trials, probability) /*: ?number[] */ {
    // Check that `p` is a valid probability (0 ≤ p ≤ 1),
    // that `n` is an integer, strictly positive.
    if (probability < 0 || probability > 1 || trials <= 0 || trials % 1 !== 0) {
        return undefined;
    }

    // We initialize `x`, the random variable, and `accumulator`, an accumulator
    // for the cumulative distribution function to 0. `distribution_functions`
    // is the object we'll return with the `probability_of_x` and the
    // `cumulativeProbability_of_x`, as well as the calculated mean &
    // variance. We iterate until the `cumulativeProbability_of_x` is
    // within `epsilon` of 1.0.
    var x = 0;
    var cumulativeProbability = 0;
    var cells = [];
    var binomialCoefficient = 1;

    // This algorithm iterates through each potential outcome,
    // until the `cumulativeProbability` is very close to 1, at
    // which point we've defined the vast majority of outcomes
    do {
        // a [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function)
        cells[x] =
            binomialCoefficient *
            Math.pow(probability, x) *
            Math.pow(1 - probability, trials - x);
        cumulativeProbability += cells[x];
        x++;
        binomialCoefficient = (binomialCoefficient * (trials - x + 1)) / x;
        // when the cumulativeProbability is nearly 1, we've calculated
        // the useful range of this distribution
    } while (cumulativeProbability < 1 - epsilon);

    return cells;
}

/**
 * The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution)
 * is a discrete probability distribution that expresses the probability
 * of a given number of events occurring in a fixed interval of time
 * and/or space if these events occur with a known average rate and
 * independently of the time since the last event.
 *
 * The Poisson Distribution is characterized by the strictly positive
 * mean arrival or occurrence rate, `λ`.
 *
 * @param {number} lambda location poisson distribution
 * @returns {number[]} values of poisson distribution at that point
 */
function poissonDistribution(lambda) /*: ?number[] */ {
    // Check that lambda is strictly positive
    if (lambda <= 0) {
        return undefined;
    }

    // our current place in the distribution
    var x = 0;
    // and we keep track of the current cumulative probability, in
    // order to know when to stop calculating chances.
    var cumulativeProbability = 0;
    // the calculated cells to be returned
    var cells = [];
    var factorialX = 1;

    // This algorithm iterates through each potential outcome,
    // until the `cumulativeProbability` is very close to 1, at
    // which point we've defined the vast majority of outcomes
    do {
        // a [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function)
        cells[x] = (Math.exp(-lambda) * Math.pow(lambda, x)) / factorialX;
        cumulativeProbability += cells[x];
        x++;
        factorialX *= x;
        // when the cumulativeProbability is nearly 1, we've calculated
        // the useful range of this distribution
    } while (cumulativeProbability < 1 - epsilon);

    return cells;
}

/**
 * **Percentage Points of the χ2 (Chi-Squared) Distribution**
 *
 * The [χ2 (Chi-Squared) Distribution](http://en.wikipedia.org/wiki/Chi-squared_distribution) is used in the common
 * chi-squared tests for goodness of fit of an observed distribution to a theoretical one, the independence of two
 * criteria of classification of qualitative data, and in confidence interval estimation for a population standard
 * deviation of a normal distribution from a sample standard deviation.
 *
 * Values from Appendix 1, Table III of William W. Hines & Douglas C. Montgomery, "Probability and Statistics in
 * Engineering and Management Science", Wiley (1980).
 */
var chiSquaredDistributionTable = {
    1: {
        0.995: 0,
        0.99: 0,
        0.975: 0,
        0.95: 0,
        0.9: 0.02,
        0.5: 0.45,
        0.1: 2.71,
        0.05: 3.84,
        0.025: 5.02,
        0.01: 6.63,
        0.005: 7.88
    },
    2: {
        0.995: 0.01,
        0.99: 0.02,
        0.975: 0.05,
        0.95: 0.1,
        0.9: 0.21,
        0.5: 1.39,
        0.1: 4.61,
        0.05: 5.99,
        0.025: 7.38,
        0.01: 9.21,
        0.005: 10.6
    },
    3: {
        0.995: 0.07,
        0.99: 0.11,
        0.975: 0.22,
        0.95: 0.35,
        0.9: 0.58,
        0.5: 2.37,
        0.1: 6.25,
        0.05: 7.81,
        0.025: 9.35,
        0.01: 11.34,
        0.005: 12.84
    },
    4: {
        0.995: 0.21,
        0.99: 0.3,
        0.975: 0.48,
        0.95: 0.71,
        0.9: 1.06,
        0.5: 3.36,
        0.1: 7.78,
        0.05: 9.49,
        0.025: 11.14,
        0.01: 13.28,
        0.005: 14.86
    },
    5: {
        0.995: 0.41,
        0.99: 0.55,
        0.975: 0.83,
        0.95: 1.15,
        0.9: 1.61,
        0.5: 4.35,
        0.1: 9.24,
        0.05: 11.07,
        0.025: 12.83,
        0.01: 15.09,
        0.005: 16.75
    },
    6: {
        0.995: 0.68,
        0.99: 0.87,
        0.975: 1.24,
        0.95: 1.64,
        0.9: 2.2,
        0.5: 5.35,
        0.1: 10.65,
        0.05: 12.59,
        0.025: 14.45,
        0.01: 16.81,
        0.005: 18.55
    },
    7: {
        0.995: 0.99,
        0.99: 1.25,
        0.975: 1.69,
        0.95: 2.17,
        0.9: 2.83,
        0.5: 6.35,
        0.1: 12.02,
        0.05: 14.07,
        0.025: 16.01,
        0.01: 18.48,
        0.005: 20.28
    },
    8: {
        0.995: 1.34,
        0.99: 1.65,
        0.975: 2.18,
        0.95: 2.73,
        0.9: 3.49,
        0.5: 7.34,
        0.1: 13.36,
        0.05: 15.51,
        0.025: 17.53,
        0.01: 20.09,
        0.005: 21.96
    },
    9: {
        0.995: 1.73,
        0.99: 2.09,
        0.975: 2.7,
        0.95: 3.33,
        0.9: 4.17,
        0.5: 8.34,
        0.1: 14.68,
        0.05: 16.92,
        0.025: 19.02,
        0.01: 21.67,
        0.005: 23.59
    },
    10: {
        0.995: 2.16,
        0.99: 2.56,
        0.975: 3.25,
        0.95: 3.94,
        0.9: 4.87,
        0.5: 9.34,
        0.1: 15.99,
        0.05: 18.31,
        0.025: 20.48,
        0.01: 23.21,
        0.005: 25.19
    },
    11: {
        0.995: 2.6,
        0.99: 3.05,
        0.975: 3.82,
        0.95: 4.57,
        0.9: 5.58,
        0.5: 10.34,
        0.1: 17.28,
        0.05: 19.68,
        0.025: 21.92,
        0.01: 24.72,
        0.005: 26.76
    },
    12: {
        0.995: 3.07,
        0.99: 3.57,
        0.975: 4.4,
        0.95: 5.23,
        0.9: 6.3,
        0.5: 11.34,
        0.1: 18.55,
        0.05: 21.03,
        0.025: 23.34,
        0.01: 26.22,
        0.005: 28.3
    },
    13: {
        0.995: 3.57,
        0.99: 4.11,
        0.975: 5.01,
        0.95: 5.89,
        0.9: 7.04,
        0.5: 12.34,
        0.1: 19.81,
        0.05: 22.36,
        0.025: 24.74,
        0.01: 27.69,
        0.005: 29.82
    },
    14: {
        0.995: 4.07,
        0.99: 4.66,
        0.975: 5.63,
        0.95: 6.57,
        0.9: 7.79,
        0.5: 13.34,
        0.1: 21.06,
        0.05: 23.68,
        0.025: 26.12,
        0.01: 29.14,
        0.005: 31.32
    },
    15: {
        0.995: 4.6,
        0.99: 5.23,
        0.975: 6.27,
        0.95: 7.26,
        0.9: 8.55,
        0.5: 14.34,
        0.1: 22.31,
        0.05: 25,
        0.025: 27.49,
        0.01: 30.58,
        0.005: 32.8
    },
    16: {
        0.995: 5.14,
        0.99: 5.81,
        0.975: 6.91,
        0.95: 7.96,
        0.9: 9.31,
        0.5: 15.34,
        0.1: 23.54,
        0.05: 26.3,
        0.025: 28.85,
        0.01: 32,
        0.005: 34.27
    },
    17: {
        0.995: 5.7,
        0.99: 6.41,
        0.975: 7.56,
        0.95: 8.67,
        0.9: 10.09,
        0.5: 16.34,
        0.1: 24.77,
        0.05: 27.59,
        0.025: 30.19,
        0.01: 33.41,
        0.005: 35.72
    },
    18: {
        0.995: 6.26,
        0.99: 7.01,
        0.975: 8.23,
        0.95: 9.39,
        0.9: 10.87,
        0.5: 17.34,
        0.1: 25.99,
        0.05: 28.87,
        0.025: 31.53,
        0.01: 34.81,
        0.005: 37.16
    },
    19: {
        0.995: 6.84,
        0.99: 7.63,
        0.975: 8.91,
        0.95: 10.12,
        0.9: 11.65,
        0.5: 18.34,
        0.1: 27.2,
        0.05: 30.14,
        0.025: 32.85,
        0.01: 36.19,
        0.005: 38.58
    },
    20: {
        0.995: 7.43,
        0.99: 8.26,
        0.975: 9.59,
        0.95: 10.85,
        0.9: 12.44,
        0.5: 19.34,
        0.1: 28.41,
        0.05: 31.41,
        0.025: 34.17,
        0.01: 37.57,
        0.005: 40
    },
    21: {
        0.995: 8.03,
        0.99: 8.9,
        0.975: 10.28,
        0.95: 11.59,
        0.9: 13.24,
        0.5: 20.34,
        0.1: 29.62,
        0.05: 32.67,
        0.025: 35.48,
        0.01: 38.93,
        0.005: 41.4
    },
    22: {
        0.995: 8.64,
        0.99: 9.54,
        0.975: 10.98,
        0.95: 12.34,
        0.9: 14.04,
        0.5: 21.34,
        0.1: 30.81,
        0.05: 33.92,
        0.025: 36.78,
        0.01: 40.29,
        0.005: 42.8
    },
    23: {
        0.995: 9.26,
        0.99: 10.2,
        0.975: 11.69,
        0.95: 13.09,
        0.9: 14.85,
        0.5: 22.34,
        0.1: 32.01,
        0.05: 35.17,
        0.025: 38.08,
        0.01: 41.64,
        0.005: 44.18
    },
    24: {
        0.995: 9.89,
        0.99: 10.86,
        0.975: 12.4,
        0.95: 13.85,
        0.9: 15.66,
        0.5: 23.34,
        0.1: 33.2,
        0.05: 36.42,
        0.025: 39.36,
        0.01: 42.98,
        0.005: 45.56
    },
    25: {
        0.995: 10.52,
        0.99: 11.52,
        0.975: 13.12,
        0.95: 14.61,
        0.9: 16.47,
        0.5: 24.34,
        0.1: 34.28,
        0.05: 37.65,
        0.025: 40.65,
        0.01: 44.31,
        0.005: 46.93
    },
    26: {
        0.995: 11.16,
        0.99: 12.2,
        0.975: 13.84,
        0.95: 15.38,
        0.9: 17.29,
        0.5: 25.34,
        0.1: 35.56,
        0.05: 38.89,
        0.025: 41.92,
        0.01: 45.64,
        0.005: 48.29
    },
    27: {
        0.995: 11.81,
        0.99: 12.88,
        0.975: 14.57,
        0.95: 16.15,
        0.9: 18.11,
        0.5: 26.34,
        0.1: 36.74,
        0.05: 40.11,
        0.025: 43.19,
        0.01: 46.96,
        0.005: 49.65
    },
    28: {
        0.995: 12.46,
        0.99: 13.57,
        0.975: 15.31,
        0.95: 16.93,
        0.9: 18.94,
        0.5: 27.34,
        0.1: 37.92,
        0.05: 41.34,
        0.025: 44.46,
        0.01: 48.28,
        0.005: 50.99
    },
    29: {
        0.995: 13.12,
        0.99: 14.26,
        0.975: 16.05,
        0.95: 17.71,
        0.9: 19.77,
        0.5: 28.34,
        0.1: 39.09,
        0.05: 42.56,
        0.025: 45.72,
        0.01: 49.59,
        0.005: 52.34
    },
    30: {
        0.995: 13.79,
        0.99: 14.95,
        0.975: 16.79,
        0.95: 18.49,
        0.9: 20.6,
        0.5: 29.34,
        0.1: 40.26,
        0.05: 43.77,
        0.025: 46.98,
        0.01: 50.89,
        0.005: 53.67
    },
    40: {
        0.995: 20.71,
        0.99: 22.16,
        0.975: 24.43,
        0.95: 26.51,
        0.9: 29.05,
        0.5: 39.34,
        0.1: 51.81,
        0.05: 55.76,
        0.025: 59.34,
        0.01: 63.69,
        0.005: 66.77
    },
    50: {
        0.995: 27.99,
        0.99: 29.71,
        0.975: 32.36,
        0.95: 34.76,
        0.9: 37.69,
        0.5: 49.33,
        0.1: 63.17,
        0.05: 67.5,
        0.025: 71.42,
        0.01: 76.15,
        0.005: 79.49
    },
    60: {
        0.995: 35.53,
        0.99: 37.48,
        0.975: 40.48,
        0.95: 43.19,
        0.9: 46.46,
        0.5: 59.33,
        0.1: 74.4,
        0.05: 79.08,
        0.025: 83.3,
        0.01: 88.38,
        0.005: 91.95
    },
    70: {
        0.995: 43.28,
        0.99: 45.44,
        0.975: 48.76,
        0.95: 51.74,
        0.9: 55.33,
        0.5: 69.33,
        0.1: 85.53,
        0.05: 90.53,
        0.025: 95.02,
        0.01: 100.42,
        0.005: 104.22
    },
    80: {
        0.995: 51.17,
        0.99: 53.54,
        0.975: 57.15,
        0.95: 60.39,
        0.9: 64.28,
        0.5: 79.33,
        0.1: 96.58,
        0.05: 101.88,
        0.025: 106.63,
        0.01: 112.33,
        0.005: 116.32
    },
    90: {
        0.995: 59.2,
        0.99: 61.75,
        0.975: 65.65,
        0.95: 69.13,
        0.9: 73.29,
        0.5: 89.33,
        0.1: 107.57,
        0.05: 113.14,
        0.025: 118.14,
        0.01: 124.12,
        0.005: 128.3
    },
    100: {
        0.995: 67.33,
        0.99: 70.06,
        0.975: 74.22,
        0.95: 77.93,
        0.9: 82.36,
        0.5: 99.33,
        0.1: 118.5,
        0.05: 124.34,
        0.025: 129.56,
        0.01: 135.81,
        0.005: 140.17
    }
};

/**
 * The [χ2 (Chi-Squared) Goodness-of-Fit Test](http://en.wikipedia.org/wiki/Goodness_of_fit#Pearson.27s_chi-squared_test)
 * uses a measure of goodness of fit which is the sum of differences between observed and expected outcome frequencies
 * (that is, counts of observations), each squared and divided by the number of observations expected given the
 * hypothesized distribution. The resulting χ2 statistic, `chiSquared`, can be compared to the chi-squared distribution
 * to determine the goodness of fit. In order to determine the degrees of freedom of the chi-squared distribution, one
 * takes the total number of observed frequencies and subtracts the number of estimated parameters. The test statistic
 * follows, approximately, a chi-square distribution with (k − c) degrees of freedom where `k` is the number of non-empty
 * cells and `c` is the number of estimated parameters for the distribution.
 *
 * @param {Array<number>} data
 * @param {Function} distributionType a function that returns a point in a distribution:
 * for instance, binomial, bernoulli, or poisson
 * @param {number} significance
 * @returns {number} chi squared goodness of fit
 * @example
 * // Data from Poisson goodness-of-fit example 10-19 in William W. Hines & Douglas C. Montgomery,
 * // "Probability and Statistics in Engineering and Management Science", Wiley (1980).
 * var data1019 = [
 *     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 *     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 *     1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
 *     2, 2, 2, 2, 2, 2, 2, 2, 2,
 *     3, 3, 3, 3
 * ];
 * ss.chiSquaredGoodnessOfFit(data1019, ss.poissonDistribution, 0.05); //= false
 */
function chiSquaredGoodnessOfFit(data, distributionType, significance) {
    // Estimate from the sample data, a weighted mean.
    var inputMean = mean(data);
    // Calculated value of the χ2 statistic.
    var chiSquared = 0;
    // Number of hypothesized distribution parameters estimated, expected to be supplied in the distribution test.
    // Lose one degree of freedom for estimating `lambda` from the sample data.
    var c = 1;
    // The hypothesized distribution.
    // Generate the hypothesized distribution.
    var hypothesizedDistribution = distributionType(inputMean);
    var observedFrequencies = [];
    var expectedFrequencies = [];

    // Create an array holding a histogram from the sample data, of
    // the form `{ value: numberOfOcurrences }`
    for (var i = 0; i < data.length; i++) {
        if (observedFrequencies[data[i]] === undefined) {
            observedFrequencies[data[i]] = 0;
        }
        observedFrequencies[data[i]]++;
    }

    // The histogram we created might be sparse - there might be gaps
    // between values. So we iterate through the histogram, making
    // sure that instead of undefined, gaps have 0 values.
    for (var i$1 = 0; i$1 < observedFrequencies.length; i$1++) {
        if (observedFrequencies[i$1] === undefined) {
            observedFrequencies[i$1] = 0;
        }
    }

    // Create an array holding a histogram of expected data given the
    // sample size and hypothesized distribution.
    for (var k in hypothesizedDistribution) {
        if (k in observedFrequencies) {
            expectedFrequencies[+k] = hypothesizedDistribution[k] * data.length;
        }
    }

    // Working backward through the expected frequencies, collapse classes
    // if less than three observations are expected for a class.
    // This transformation is applied to the observed frequencies as well.
    for (var k$1 = expectedFrequencies.length - 1; k$1 >= 0; k$1--) {
        if (expectedFrequencies[k$1] < 3) {
            expectedFrequencies[k$1 - 1] += expectedFrequencies[k$1];
            expectedFrequencies.pop();

            observedFrequencies[k$1 - 1] += observedFrequencies[k$1];
            observedFrequencies.pop();
        }
    }

    // Iterate through the squared differences between observed & expected
    // frequencies, accumulating the `chiSquared` statistic.
    for (var k$2 = 0; k$2 < observedFrequencies.length; k$2++) {
        chiSquared +=
            Math.pow(observedFrequencies[k$2] - expectedFrequencies[k$2], 2) /
            expectedFrequencies[k$2];
    }

    // Calculate degrees of freedom for this test and look it up in the
    // `chiSquaredDistributionTable` in order to
    // accept or reject the goodness-of-fit of the hypothesized distribution.
    // Degrees of freedom, calculated as (number of class intervals -
    // number of hypothesized distribution parameters estimated - 1)
    var degreesOfFreedom = observedFrequencies.length - c - 1;
    return (
        chiSquaredDistributionTable[degreesOfFreedom][significance] < chiSquared
    );
}

var SQRT_2PI$1 = Math.sqrt(2 * Math.PI);

/**
 * [Well-known kernels](https://en.wikipedia.org/wiki/Kernel_(statistics)#Kernel_functions_in_common_use)
 * @private
 */
var kernels = {
    /**
     * The gaussian kernel.
     * @private
     */
    gaussian: function (u) {
        return Math.exp(-0.5 * u * u) / SQRT_2PI$1;
    }
};

/**
 * Well known bandwidth selection methods
 * @private
 */
var bandwidthMethods = {
    /**
     * The ["normal reference distribution"
     * rule-of-thumb](https://stat.ethz.ch/R-manual/R-devel/library/MASS/html/bandwidth.nrd.html),
     * a commonly used version of [Silverman's
     * rule-of-thumb](https://en.wikipedia.org/wiki/Kernel_density_estimation#A_rule-of-thumb_bandwidth_estimator).
     * @private
     */
    nrd: function (x) {
        var s = sampleStandardDeviation(x);
        var iqr = interquartileRange(x);
        if (typeof iqr === "number") {
            s = Math.min(s, iqr / 1.34);
        }
        return 1.06 * s * Math.pow(x.length, -0.2);
    }
};

/**
 * [Kernel density estimation](https://en.wikipedia.org/wiki/Kernel_density_estimation)
 * is a useful tool for, among other things, estimating the shape of the
 * underlying probability distribution from a sample.
 *
 * @name kernelDensityEstimation
 * @param X sample values
 * @param kernel The kernel function to use. If a function is provided, it should return non-negative values and integrate to 1. Defaults to 'gaussian'.
 * @param bandwidthMethod The "bandwidth selection" method to use, or a fixed bandwidth value. Defaults to "nrd", the commonly-used ["normal reference distribution" rule-of-thumb](https://stat.ethz.ch/R-manual/R-devel/library/MASS/html/bandwidth.nrd.html).
 * @returns {Function} An estimated [probability density function](https://en.wikipedia.org/wiki/Probability_density_function) for the given sample. The returned function runs in `O(X.length)`.
 */
function kernelDensityEstimation(X, kernel, bandwidthMethod) {
    var kernelFn;
    if (kernel === undefined) {
        kernelFn = kernels.gaussian;
    } else if (typeof kernel === "string") {
        if (!kernels[kernel]) {
            throw new Error('Unknown kernel "' + kernel + '"');
        }
        kernelFn = kernels[kernel];
    } else {
        kernelFn = kernel;
    }

    var bandwidth;
    if (typeof bandwidthMethod === "undefined") {
        bandwidth = bandwidthMethods.nrd(X);
    } else if (typeof bandwidthMethod === "string") {
        if (!bandwidthMethods[bandwidthMethod]) {
            throw new Error(
                'Unknown bandwidth method "' + bandwidthMethod + '"'
            );
        }
        bandwidth = bandwidthMethods[bandwidthMethod](X);
    } else {
        bandwidth = bandwidthMethod;
    }

    return function (x) {
        var i = 0;
        var sum = 0;
        for (i = 0; i < X.length; i++) {
            sum += kernelFn((x - X[i]) / bandwidth);
        }
        return sum / bandwidth / X.length;
    };
}

/**
 * The [Z-Score, or Standard Score](http://en.wikipedia.org/wiki/Standard_score).
 *
 * The standard score is the number of standard deviations an observation
 * or datum is above or below the mean. Thus, a positive standard score
 * represents a datum above the mean, while a negative standard score
 * represents a datum below the mean. It is a dimensionless quantity
 * obtained by subtracting the population mean from an individual raw
 * score and then dividing the difference by the population standard
 * deviation.
 *
 * The z-score is only defined if one knows the population parameters;
 * if one only has a sample set, then the analogous computation with
 * sample mean and sample standard deviation yields the
 * Student's t-statistic.
 *
 * @param {number} x
 * @param {number} mean
 * @param {number} standardDeviation
 * @return {number} z score
 * @example
 * zScore(78, 80, 5); // => -0.4
 */
function zScore(x, mean, standardDeviation) {
    return (x - mean) / standardDeviation;
}

var SQRT_2PI = Math.sqrt(2 * Math.PI);

function cumulativeDistribution(z) {
    var sum = z,
        tmp = z;

    // 15 iterations are enough for 4-digit precision
    for (var i = 1; i < 15; i++) {
        tmp *= (z * z) / (2 * i + 1);
        sum += tmp;
    }
    return (
        Math.round((0.5 + (sum / SQRT_2PI) * Math.exp((-z * z) / 2)) * 1e4) /
        1e4
    );
}

/**
 * A standard normal table, also called the unit normal table or Z table,
 * is a mathematical table for the values of Φ (phi), which are the values of
 * the [cumulative distribution function](https://en.wikipedia.org/wiki/Normal_distribution#Cumulative_distribution_function)
 * of the normal distribution. It is used to find the probability that a
 * statistic is observed below, above, or between values on the standard
 * normal distribution, and by extension, any normal distribution.
 */
var standardNormalTable = [];

for (var z = 0; z <= 3.09; z += 0.01) {
    standardNormalTable.push(cumulativeDistribution(z));
}

/**
 * **[Cumulative Standard Normal Probability](http://en.wikipedia.org/wiki/Standard_normal_table)**
 *
 * Since probability tables cannot be
 * printed for every normal distribution, as there are an infinite variety
 * of normal distributions, it is common practice to convert a normal to a
 * standard normal and then use the standard normal table to find probabilities.
 *
 * You can use `.5 + .5 * errorFunction(x / Math.sqrt(2))` to calculate the probability
 * instead of looking it up in a table.
 *
 * @param {number} z
 * @returns {number} cumulative standard normal probability
 */
function cumulativeStdNormalProbability(z) {
    // Calculate the position of this value.
    var absZ = Math.abs(z);
    // Each row begins with a different
    // significant digit: 0.5, 0.6, 0.7, and so on. Each value in the table
    // corresponds to a range of 0.01 in the input values, so the value is
    // multiplied by 100.
    var index = Math.min(
        Math.round(absZ * 100),
        standardNormalTable.length - 1
    );

    // The index we calculate must be in the table as a positive value,
    // but we still pay attention to whether the input is positive
    // or negative, and flip the output value as a last step.
    if (z >= 0) {
        return standardNormalTable[index];
    } else {
        // due to floating-point arithmetic, values in the table with
        // 4 significant figures can nevertheless end up as repeating
        // fractions when they're computed here.
        return +(1 - standardNormalTable[index]).toFixed(4);
    }
}

/**
 * **[Logistic Cumulative Distribution Function](https://en.wikipedia.org/wiki/Logistic_distribution)**
 *
 * @param {number} x
 * @returns {number} cumulative standard logistic probability
 */
function cumulativeStdLogisticProbability(x) {
    return 1 / (Math.exp(-x) + 1);
}

/**
 * **[Gaussian error function](http://en.wikipedia.org/wiki/Error_function)**
 *
 * The `errorFunction(x/(sd * Math.sqrt(2)))` is the probability that a value in a
 * normal distribution with standard deviation sd is within x of the mean.
 *
 * This function returns a numerical approximation to the exact value.
 * It uses Horner's method to evaluate the polynomial of τ (tau).
 *
 * @param {number} x input
 * @return {number} error estimation
 * @example
 * errorFunction(1).toFixed(2); // => '0.84'
 */
function errorFunction(x) {
    var t = 1 / (1 + 0.5 * Math.abs(x));
    var tau =
        t *
        Math.exp(
            -x * x +
                ((((((((0.17087277 * t - 0.82215223) * t + 1.48851587) * t -
                    1.13520398) *
                    t +
                    0.27886807) *
                    t -
                    0.18628806) *
                    t +
                    0.09678418) *
                    t +
                    0.37409196) *
                    t +
                    1.00002368) *
                    t -
                1.26551223
        );
    if (x >= 0) {
        return 1 - tau;
    } else {
        return tau - 1;
    }
}

/**
 * The Inverse [Gaussian error function](http://en.wikipedia.org/wiki/Error_function)
 * returns a numerical approximation to the value that would have caused
 * `errorFunction()` to return x.
 *
 * @param {number} x value of error function
 * @returns {number} estimated inverted value
 */
function inverseErrorFunction(x) {
    var a = (8 * (Math.PI - 3)) / (3 * Math.PI * (4 - Math.PI));

    var inv = Math.sqrt(
        Math.sqrt(
            Math.pow(2 / (Math.PI * a) + Math.log(1 - x * x) / 2, 2) -
                Math.log(1 - x * x) / a
        ) -
            (2 / (Math.PI * a) + Math.log(1 - x * x) / 2)
    );

    if (x >= 0) {
        return inv;
    } else {
        return -inv;
    }
}

/**
 * The [Probit](http://en.wikipedia.org/wiki/Probit)
 * is the inverse of cumulativeStdNormalProbability(),
 * and is also known as the normal quantile function.
 *
 * It returns the number of standard deviations from the mean
 * where the p'th quantile of values can be found in a normal distribution.
 * So, for example, probit(0.5 + 0.6827/2) ≈ 1 because 68.27% of values are
 * normally found within 1 standard deviation above or below the mean.
 *
 * @param {number} p
 * @returns {number} probit
 */
function probit(p) {
    if (p === 0) {
        p = epsilon;
    } else if (p >= 1) {
        p = 1 - epsilon;
    }
    return Math.sqrt(2) * inverseErrorFunction(2 * p - 1);
}

/**
 * The [Logit](https://en.wikipedia.org/wiki/Logit)
 * is the inverse of cumulativeStdLogisticProbability,
 * and is also known as the logistic quantile function.
 *
 * @param {number} p
 * @returns {number} logit
 */
function logit(p) {
    if (p <= 0 || p >= 1) {
        throw new Error("p must be strictly between zero and one");
    }
    return Math.log(p / (1 - p));
}

/**
 * Conducts a [permutation test](https://en.wikipedia.org/wiki/Resampling_(statistics)#Permutation_tests)
 * to determine if two data sets are *significantly* different from each other, using
 * the difference of means between the groups as the test statistic.
 * The function allows for the following hypotheses:
 * - two_tail = Null hypothesis: the two distributions are equal.
 * - greater = Null hypothesis: observations from sampleX tend to be smaller than those from sampleY.
 * - less = Null hypothesis: observations from sampleX tend to be greater than those from sampleY.
 * [Learn more about one-tail vs two-tail tests.](https://en.wikipedia.org/wiki/One-_and_two-tailed_tests)
 *
 * @param {Array<number>} sampleX first dataset (e.g. treatment data)
 * @param {Array<number>} sampleY second dataset (e.g. control data)
 * @param {string} alternative alternative hypothesis, either 'two_sided' (default), 'greater', or 'less'
 * @param {number} k number of values in permutation distribution.
 * @param {Function} [randomSource=Math.random] an optional entropy source
 * @returns {number} p-value The probability of observing the difference between groups (as or more extreme than what we did), assuming the null hypothesis.
 *
 * @example
 * var control = [2, 5, 3, 6, 7, 2, 5];
 * var treatment = [20, 5, 13, 12, 7, 2, 2];
 * permutationTest(control, treatment); // ~0.1324
 */
function permutationTest(sampleX, sampleY, alternative, k, randomSource) {
    // Set default arguments
    if (k === undefined) {
        k = 10000;
    }
    if (alternative === undefined) {
        alternative = "two_side";
    }
    if (
        alternative !== "two_side" &&
        alternative !== "greater" &&
        alternative !== "less"
    ) {
        throw new Error(
            "`alternative` must be either 'two_side', 'greater', or 'less'"
        );
    }

    // get means for each sample
    var meanX = mean(sampleX);
    var meanY = mean(sampleY);

    // calculate initial test statistic. This will be our point of comparison with
    // the generated test statistics.
    var testStatistic = meanX - meanY;

    // create test-statistic distribution
    var testStatDsn = new Array(k);

    // combine datsets so we can easily shuffle later
    var allData = sampleX.concat(sampleY);
    var midIndex = Math.floor(allData.length / 2);

    for (var i = 0; i < k; i++) {
        // 1. shuffle data assignments
        shuffleInPlace(allData, randomSource);
        var permLeft = allData.slice(0, midIndex);
        var permRight = allData.slice(midIndex, allData.length);

        // 2.re-calculate test statistic
        var permTestStatistic = mean(permLeft) - mean(permRight);

        // 3. store test statistic to build test statistic distribution
        testStatDsn[i] = permTestStatistic;
    }

    // Calculate p-value depending on alternative
    // For this test, we calculate the percentage of 'extreme' test statistics (subject to our hypothesis)
    // more info on permutation test p-value calculations: https://onlinecourses.science.psu.edu/stat464/node/35
    var numExtremeTStats = 0;
    if (alternative === "two_side") {
        for (var i$1 = 0; i$1 <= k; i$1++) {
            if (Math.abs(testStatDsn[i$1]) >= Math.abs(testStatistic)) {
                numExtremeTStats += 1;
            }
        }
    } else if (alternative === "greater") {
        for (var i$2 = 0; i$2 <= k; i$2++) {
            if (testStatDsn[i$2] >= testStatistic) {
                numExtremeTStats += 1;
            }
        }
    } else {
        // alternative === 'less'
        for (var i$3 = 0; i$3 <= k; i$3++) {
            if (testStatDsn[i$3] <= testStatistic) {
                numExtremeTStats += 1;
            }
        }
    }

    return numExtremeTStats / k;
}

/**
 * [Sign](https://en.wikipedia.org/wiki/Sign_function) is a function
 * that extracts the sign of a real number
 *
 * @param {number} x input value
 * @returns {number} sign value either 1, 0 or -1
 * @throws {TypeError} if the input argument x is not a number
 * @private
 *
 * @example
 * sign(2); // => 1
 */
function sign(x) {
    if (typeof x === "number") {
        if (x < 0) {
            return -1;
        } else if (x === 0) {
            return 0;
        } else {
            return 1;
        }
    } else {
        throw new TypeError("not a number");
    }
}

/**
 * [Bisection method](https://en.wikipedia.org/wiki/Bisection_method) is a root-finding
 * method that repeatedly bisects an interval to find the root.
 *
 * This function returns a numerical approximation to the exact value.
 *
 * @param {Function} func input function
 * @param {number} start - start of interval
 * @param {number} end - end of interval
 * @param {number} maxIterations - the maximum number of iterations
 * @param {number} errorTolerance - the error tolerance
 * @returns {number} estimated root value
 * @throws {TypeError} Argument func must be a function
 *
 * @example
 * bisect(Math.cos,0,4,100,0.003); // => 1.572265625
 */
function bisect(func, start, end, maxIterations, errorTolerance) {
    if (typeof func !== "function")
        { throw new TypeError("func must be a function"); }

    for (var i = 0; i < maxIterations; i++) {
        var output = (start + end) / 2;

        if (
            func(output) === 0 ||
            Math.abs((end - start) / 2) < errorTolerance
        ) {
            return output;
        }

        if (sign(func(output)) === sign(func(start))) {
            start = output;
        } else {
            end = output;
        }
    }

    throw new Error("maximum number of iterations exceeded");
}

/**
 * Calculate Euclidean distance between two points.
 * @param {Array<number>} left First N-dimensional point.
 * @param {Array<number>} right Second N-dimensional point.
 * @returns {number} Distance.
 */
function euclideanDistance(left, right) {
    var sum = 0;
    for (var i = 0; i < left.length; i++) {
        var diff = left[i] - right[i];
        sum += diff * diff;
    }
    return Math.sqrt(sum);
}

/**
 * @typedef {Object} kMeansReturn
 * @property {Array<number>} labels The labels.
 * @property {Array<Array<number>>} centroids The cluster centroids.
 */

/**
 * Perform k-means clustering.
 *
 * @param {Array<Array<number>>} points N-dimensional coordinates of points to be clustered.
 * @param {number} numCluster How many clusters to create.
 * @param {Function} randomSource An optional entropy source that generates uniform values in [0, 1).
 * @return {kMeansReturn} Labels (same length as data) and centroids (same length as numCluster).
 * @throws {Error} If any centroids wind up friendless (i.e., without associated points).
 *
 * @example
 * kMeansCluster([[0.0, 0.5], [1.0, 0.5]], 2); // => {labels: [0, 1], centroids: [[0.0, 0.5], [1.0 0.5]]}
 */
function kMeansCluster(points, numCluster, randomSource) {
    if ( randomSource === void 0 ) randomSource = Math.random;

    var oldCentroids = null;
    var newCentroids = sample(points, numCluster, randomSource);
    var labels = null;
    var change = Number.MAX_VALUE;
    while (change !== 0) {
        labels = labelPoints(points, newCentroids);
        oldCentroids = newCentroids;
        newCentroids = calculateCentroids(points, labels, numCluster);
        change = calculateChange(newCentroids, oldCentroids);
    }
    return {
        labels: labels,
        centroids: newCentroids
    };
}

/**
 * Label each point according to which centroid it is closest to.
 *
 * @private
 * @param {Array<Array<number>>} points Array of XY coordinates.
 * @param {Array<Array<number>>} centroids Current centroids.
 * @return {Array<number>} Group labels.
 */
function labelPoints(points, centroids) {
    return points.map(function (p) {
        var minDist = Number.MAX_VALUE;
        var label = -1;
        for (var i = 0; i < centroids.length; i++) {
            var dist = euclideanDistance(p, centroids[i]);
            if (dist < minDist) {
                minDist = dist;
                label = i;
            }
        }
        return label;
    });
}

/**
 * Calculate centroids for points given labels.
 *
 * @private
 * @param {Array<Array<number>>} points Array of XY coordinates.
 * @param {Array<number>} labels Which groups points belong to.
 * @param {number} numCluster Number of clusters being created.
 * @return {Array<Array<number>>} Centroid for each group.
 * @throws {Error} If any centroids wind up friendless (i.e., without associated points).
 */
function calculateCentroids(points, labels, numCluster) {
    // Initialize accumulators.
    var dimension = points[0].length;
    var centroids = makeMatrix(numCluster, dimension);
    var counts = Array(numCluster).fill(0);

    // Add points to centroids' accumulators and count points per centroid.
    var numPoints = points.length;
    for (var i = 0; i < numPoints; i++) {
        var point = points[i];
        var label = labels[i];
        var current = centroids[label];
        for (var j = 0; j < dimension; j++) {
            current[j] += point[j];
        }
        counts[label] += 1;
    }

    // Rescale centroids, checking for any that have no points.
    for (var i$1 = 0; i$1 < numCluster; i$1++) {
        if (counts[i$1] === 0) {
            throw new Error(("Centroid " + i$1 + " has no friends"));
        }
        var centroid = centroids[i$1];
        for (var j$1 = 0; j$1 < dimension; j$1++) {
            centroid[j$1] /= counts[i$1];
        }
    }

    return centroids;
}

/**
 * Calculate the difference between old centroids and new centroids.
 *
 * @private
 * @param {Array<Array<number>>} left One list of centroids.
 * @param {Array<Array<number>>} right Another list of centroids.
 * @return {number} Distance between centroids.
 */
function calculateChange(left, right) {
    var total = 0;
    for (var i = 0; i < left.length; i++) {
        total += euclideanDistance(left[i], right[i]);
    }
    return total;
}

/**
 * Calculate the [silhouette values](https://en.wikipedia.org/wiki/Silhouette_(clustering))
 * for clustered data.
 *
 * @param {Array<Array<number>>} points N-dimensional coordinates of points.
 * @param {Array<number>} labels Labels of points. This must be the same length as `points`,
 * and values must lie in [0..G-1], where G is the number of groups.
 * @return {Array<number>} The silhouette value for each point.
 *
 * @example
 * silhouette([[0.25], [0.75]], [0, 0]); // => [1.0, 1.0]
 */
function silhouette(points, labels) {
    if (points.length !== labels.length) {
        throw new Error("must have exactly as many labels as points");
    }
    var groupings = createGroups(labels);
    var distances = calculateAllDistances(points);
    var result = [];
    for (var i = 0; i < points.length; i++) {
        var s = 0;
        if (groupings[labels[i]].length > 1) {
            var a = meanDistanceFromPointToGroup(
                i,
                groupings[labels[i]],
                distances
            );
            var b = meanDistanceToNearestGroup(
                i,
                labels,
                groupings,
                distances
            );
            s = (b - a) / Math.max(a, b);
        }
        result.push(s);
    }
    return result;
}

/**
 * Create a lookup table mapping group IDs to point IDs.
 *
 * @private
 * @param {Array<number>} labels Labels of points. This must be the same length as `points`,
 * and values must lie in [0..G-1], where G is the number of groups.
 * @return {Array<Array<number>>} An array of length G, each of whose entries is an array
 * containing the indices of the points in that group.
 */
function createGroups(labels) {
    var numGroups = 1 + max(labels);
    var result = Array(numGroups);
    for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        if (result[label] === undefined) {
            result[label] = [];
        }
        result[label].push(i);
    }
    return result;
}

/**
 * Create a lookup table of all inter-point distances.
 *
 * @private
 * @param {Array<Array<number>>} points N-dimensional coordinates of points.
 * @return {Array<Array<number>>} A symmetric square array of inter-point distances
 * (zero on the diagonal).
 */
function calculateAllDistances(points) {
    var numPoints = points.length;
    var result = makeMatrix(numPoints, numPoints);
    for (var i = 0; i < numPoints; i++) {
        for (var j = 0; j < i; j++) {
            result[i][j] = euclideanDistance(points[i], points[j]);
            result[j][i] = result[i][j];
        }
    }
    return result;
}

/**
 * Calculate the mean distance between this point and all the points in the
 * nearest group (as determined by which point in another group is closest).
 *
 * @private
 * @param {number} which The index of this point.
 * @param {Array<number>} labels Labels of points.
 * @param {Array<Array<number>>} groupings An array whose entries are arrays
 * containing the indices of the points in that group.
 * @param {Array<Array<number>>} distances A symmetric square array of inter-point
 * distances.
 * @return {number} The mean distance from this point to others in the nearest
 * group.
 */
function meanDistanceToNearestGroup(which, labels, groupings, distances) {
    var label = labels[which];
    var result = Number.MAX_VALUE;
    for (var i = 0; i < groupings.length; i++) {
        if (i !== label) {
            var d = meanDistanceFromPointToGroup(
                which,
                groupings[i],
                distances
            );
            if (d < result) {
                result = d;
            }
        }
    }
    return result;
}

/**
 * Calculate the mean distance between a point and all the points in a group
 * (possibly its own).
 *
 * @private
 * @param {number} which The index of this point.
 * @param {Array<number>} group The indices of all the points in the group in
 * question.
 * @param {Array<Array<number>>} distances A symmetric square array of inter-point
 * distances.
 * @return {number} The mean distance from this point to others in the
 * specified group.
 */
function meanDistanceFromPointToGroup(which, group, distances) {
    var total = 0;
    for (var i = 0; i < group.length; i++) {
        total += distances[which][group[i]];
    }
    return total / group.length;
}

/**
 * Calculate the [silhouette metric](https://en.wikipedia.org/wiki/Silhouette_(clustering))
 * for a set of N-dimensional points arranged in groups. The metric is the largest
 * individual silhouette value for the data.
 *
 * @param {Array<Array<number>>} points N-dimensional coordinates of points.
 * @param {Array<number>} labels Labels of points. This must be the same length as `points`,
 * and values must lie in [0..G-1], where G is the number of groups.
 * @return {number} The silhouette metric for the groupings.
 *
 * @example
 * silhouetteMetric([[0.25], [0.75]], [0, 0]); // => 1.0
 */
function silhouetteMetric(points, labels) {
    var values = silhouette(points, labels);
    return max(values);
}

/**
 * Relative error.
 *
 * This is more difficult to calculate than it first appears [1,2].  The usual
 * formula for the relative error between an actual value A and an expected
 * value E is `|(A-E)/E|`, but:
 *
 * 1. If the expected value is 0, any other value has infinite relative error,
 *    which is counter-intuitive: if the expected voltage is 0, getting 1/10th
 *    of a volt doesn't feel like an infinitely large error.
 *
 * 2. This formula does not satisfy the mathematical definition of a metric [3].
 *    [4] solved this problem by defining the relative error as `|ln(|A/E|)|`,
 *    but that formula only works if all values are positive: for example, it
 *    reports the relative error of -10 and 10 as 0.
 *
 * Our implementation sticks with convention and returns:
 *
 * - 0 if the actual and expected values are both zero
 * - Infinity if the actual value is non-zero and the expected value is zero
 * - `|(A-E)/E|` in all other cases
 *
 * [1] https://math.stackexchange.com/questions/677852/how-to-calculate-relative-error-when-true-value-is-zero
 * [2] https://en.wikipedia.org/wiki/Relative_change_and_difference
 * [3] https://en.wikipedia.org/wiki/Metric_(mathematics)#Definition
 * [4] F.W.J. Olver: "A New Approach to Error Arithmetic." SIAM Journal on
 *     Numerical Analysis, 15(2), 1978, 10.1137/0715024.
 *
 * @param {number} actual The actual value.
 * @param {number} expected The expected value.
 * @return {number} The relative error.
 */
function relativeError(actual, expected) {
    if (actual === 0 && expected === 0) {
        return 0;
    }
    return Math.abs((actual - expected) / expected);
}

/**
 * Approximate equality.
 *
 * @param {number} actual The value to be tested.
 * @param {number} expected The reference value.
 * @param {number} tolerance The acceptable relative difference.
 * @return {boolean} Whether numbers are within tolerance.
 */
function approxEqual(actual, expected, tolerance) {
    if ( tolerance === void 0 ) tolerance = epsilon;

    return relativeError(actual, expected) <= tolerance;
}

exports.BayesianClassifier = BayesianClassifier;
exports.PerceptronModel = PerceptronModel;
exports.addToMean = addToMean;
exports.approxEqual = approxEqual;
exports.average = mean;
exports.averageSimple = meanSimple;
exports.bayesian = BayesianClassifier;
exports.bernoulliDistribution = bernoulliDistribution;
exports.binomialDistribution = binomialDistribution;
exports.bisect = bisect;
exports.chiSquaredDistributionTable = chiSquaredDistributionTable;
exports.chiSquaredGoodnessOfFit = chiSquaredGoodnessOfFit;
exports.chunk = chunk;
exports.ckmeans = ckmeans;
exports.coefficientOfVariation = coefficientOfVariation;
exports.combinations = combinations;
exports.combinationsReplacement = combinationsReplacement;
exports.combineMeans = combineMeans;
exports.combineVariances = combineVariances;
exports.cumulativeStdLogisticProbability = cumulativeStdLogisticProbability;
exports.cumulativeStdNormalProbability = cumulativeStdNormalProbability;
exports.epsilon = epsilon;
exports.equalIntervalBreaks = equalIntervalBreaks;
exports.erf = errorFunction;
exports.errorFunction = errorFunction;
exports.extent = extent;
exports.extentSorted = extentSorted;
exports.factorial = factorial;
exports.gamma = gamma;
exports.gammaln = gammaln;
exports.geometricMean = geometricMean;
exports.harmonicMean = harmonicMean;
exports.interquartileRange = interquartileRange;
exports.inverseErrorFunction = inverseErrorFunction;
exports.iqr = interquartileRange;
exports.kMeansCluster = kMeansCluster;
exports.kde = kernelDensityEstimation;
exports.kernelDensityEstimation = kernelDensityEstimation;
exports.linearRegression = linearRegression;
exports.linearRegressionLine = linearRegressionLine;
exports.logAverage = logAverage;
exports.logit = logit;
exports.mad = medianAbsoluteDeviation;
exports.max = max;
exports.maxSorted = maxSorted;
exports.mean = mean;
exports.meanSimple = meanSimple;
exports.median = median;
exports.medianAbsoluteDeviation = medianAbsoluteDeviation;
exports.medianSorted = medianSorted;
exports.min = min;
exports.minSorted = minSorted;
exports.mode = mode;
exports.modeFast = modeFast;
exports.modeSorted = modeSorted;
exports.numericSort = numericSort;
exports.perceptron = PerceptronModel;
exports.permutationTest = permutationTest;
exports.permutationsHeap = permutationsHeap;
exports.poissonDistribution = poissonDistribution;
exports.probit = probit;
exports.product = product;
exports.quantile = quantile;
exports.quantileRank = quantileRank;
exports.quantileRankSorted = quantileRankSorted;
exports.quantileSorted = quantileSorted;
exports.quickselect = quickselect;
exports.rSquared = rSquared;
exports.relativeError = relativeError;
exports.rms = rootMeanSquare;
exports.rootMeanSquare = rootMeanSquare;
exports.sample = sample;
exports.sampleCorrelation = sampleCorrelation;
exports.sampleCovariance = sampleCovariance;
exports.sampleKurtosis = sampleKurtosis;
exports.sampleRankCorrelation = sampleRankCorrelation;
exports.sampleSkewness = sampleSkewness;
exports.sampleStandardDeviation = sampleStandardDeviation;
exports.sampleVariance = sampleVariance;
exports.sampleWithReplacement = sampleWithReplacement;
exports.shuffle = shuffle;
exports.shuffleInPlace = shuffleInPlace;
exports.sign = sign;
exports.silhouette = silhouette;
exports.silhouetteMetric = silhouetteMetric;
exports.standardDeviation = standardDeviation;
exports.standardNormalTable = standardNormalTable;
exports.subtractFromMean = subtractFromMean;
exports.sum = sum;
exports.sumNthPowerDeviations = sumNthPowerDeviations;
exports.sumSimple = sumSimple;
exports.tTest = tTest;
exports.tTestTwoSample = tTestTwoSample;
exports.uniqueCountSorted = uniqueCountSorted;
exports.variance = variance;
exports.wilcoxonRankSum = wilcoxonRankSum;
exports.zScore = zScore;
//# sourceMappingURL=simple-statistics.js.map


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = JSON.parse('[[-55296000000,3594.602239],[-52704000000,3594.602239],[-50025600000,3594.602239],[-47433600000,3716.453163],[-44755200000,3716.453163],[-42076800000,3716.453163],[-39484800000,3696.144675],[-36806400000,3696.144675],[-34214400000,3696.144675],[-31536000000,3757.070137],[-28857600000,3757.070137],[-26438400000,3757.070137],[-23760000000,3817.995599],[-21168000000,3817.995599],[-18489600000,3817.995599],[-15897600000,3858.612573],[-13219200000,3858.612573],[-10540800000,3858.612573],[-7948800000,3899.229548],[-5270400000,3899.229548],[-2678400000,3899.229548],[0,3919.538035],[2678400000,3919.538035],[5097600000,3919.538035],[7776000000,3980.463497],[10368000000,3980.463497],[13046400000,3980.463497],[15638400000,4163.239882],[18316800000,4163.239882],[20995200000,4163.239882],[23587200000,4163.239882],[26265600000,4163.239882],[28857600000,4163.239882],[31536000000,4264.782318],[34214400000,4264.782318],[36633600000,4264.782318],[39312000000,4386.633241],[41904000000,4386.633241],[44582400000,4386.633241],[47174400000,4650.643575],[49852800000,4650.643575],[52531200000,4650.643575],[55123200000,4853.728447],[57801600000,4853.728447],[60393600000,4853.728447],[63072000000,5158.355756],[65750400000,5158.355756],[68256000000,5158.355756],[70934400000,5645.759449],[73526400000,5645.759449],[76204800000,5645.759449],[78796800000,6498.715913],[81475200000,6498.715913],[84153600000,6498.715913],[86745600000,6965.811119],[89424000000,6965.811119],[92016000000,6965.811119],[94694400000,7757.842121],[97372800000,7757.842121],[99792000000,7757.842121],[102470400000,8143.703378],[105062400000,8143.703378],[107740800000,8143.703378],[110332800000,8692.032534],[113011200000,8692.032534],[115689600000,8692.032534],[118281600000,8793.57497],[120960000000,8793.57497],[123552000000,8793.57497],[126230400000,8915.425893],[128908800000,8915.425893],[131328000000,8915.425893],[134006400000,8935.73438],[136598400000,8935.73438],[139276800000,8935.73438],[141868800000,9016.968329],[144547200000,9016.968329],[147225600000,9016.968329],[149817600000,9138.819253],[152496000000,9138.819253],[155088000000,9138.819253],[157766400000,9179.436227],[160444800000,9179.436227],[162864000000,9179.436227],[165542400000,9423.138074],[168134400000,9423.138074],[170812800000,9423.138074],[173404800000,9707.456895],[176083200000,9707.456895],[178761600000,9707.456895],[181353600000,9808.999331],[184032000000,9808.999331],[186624000000,9808.999331],[189302400000,10012.0842],[191980800000,10012.0842],[194486400000,10012.0842],[197164800000,10276.09454],[199756800000,10276.09454],[202435200000,10276.09454],[205027200000,10519.79638],[207705600000,10519.79638],[210384000000,10519.79638],[212976000000,10682.26428],[215654400000,10682.26428],[218246400000,10682.26428],[220924800000,10763.49823],[223603200000,10763.49823],[226022400000,10763.49823],[228700800000,10925.96613],[231292800000,10925.96613],[233971200000,10925.96613],[236563200000,11250.90192],[239241600000,11250.90192],[241920000000,11250.90192],[244512000000,11596.14621],[247190400000,11596.14621],[249782400000,11596.14621],[252460800000,11860.15654],[255139200000,11860.15654],[257558400000,11860.15654],[260236800000,12428.79418],[262828800000,12428.79418],[265507200000,12428.79418],[268099200000,13302.05913],[270777600000,13302.05913],[273456000000,13302.05913],[276048000000,14236.24955],[278726400000,14236.24955],[281318400000,14236.24955],[283996800000,14987.66357],[286675200000,14987.66357],[289094400000,14987.66357],[291772800000,16145.24735],[294364800000,16145.24735],[297043200000,16145.24735],[299635200000,17384.06507],[302313600000,17384.06507],[304992000000,17384.06507],[307584000000,18541.64884],[310262400000,18541.64884],[312854400000,18541.64884],[315532800000,19272.75438],[318211200000,19272.75438],[320716800000,19272.75438],[323395200000,20044.47689],[325987200000,20044.47689],[328665600000,20044.47689],[331257600000,20856.81638],[333936000000,20856.81638],[336614400000,20856.81638],[339206400000,20897.43336],[341884800000,20897.43336],[344476800000,20897.43336],[347155200000,20938.05033],[349833600000,20938.05033],[352252800000,20938.05033],[354931200000,21506.68797],[357523200000,21506.68797],[360201600000,21506.68797],[362793600000,21851.93226],[365472000000,21851.93226],[368150400000,21851.93226],[370742400000,21425.45403],[373420800000,21425.45403],[376012800000,21425.45403],[378691200000,20897.43336],[381369600000,20897.43336],[383788800000,20897.43336],[386467200000,21811.31528],[389059200000,21811.31528],[391737600000,21811.31528],[394329600000,22359.64444],[397008000000,22359.64444],[399686400000,22359.64444],[402278400000,22684.58023],[404956800000,22684.58023],[407548800000,22684.58023],[410227200000,23354.76031],[412905600000,23354.76031],[415324800000,23354.76031],[418003200000,24167.0998],[420595200000,24167.0998],[423273600000,24167.0998],[425865600000,25182.52416],[428544000000,25182.52416],[431222400000,25182.52416],[433814400000,25385.60904],[436492800000,25385.60904],[439084800000,25385.60904],[441763200000,25588.69391],[444441600000,25588.69391],[446947200000,25588.69391],[449625600000,26401.0334],[452217600000,26401.0334],[454896000000,26401.0334],[457488000000,27416.45776],[460166400000,27416.45776],[462844800000,27416.45776],[465436800000,27822.6275],[468115200000,27822.6275],[470707200000,27822.6275],[473385600000,27822.6275],[476064000000,27822.6275],[478483200000,27822.6275],[481161600000,28838.05186],[483753600000,28838.05186],[486432000000,28838.05186],[489024000000,29447.30648],[491702400000,29447.30648],[494380800000,29447.30648],[496972800000,30462.73084],[499651200000,30462.73084],[502243200000,30462.73084],[504921600000,31071.98546],[507600000000,31071.98546],[510019200000,31071.98546],[512697600000,32493.57956],[515289600000,32493.57956],[517968000000,32493.57956],[520560000000,33915.17367],[523238400000,33915.17367],[525916800000,33915.17367],[528508800000,34930.59803],[531187200000,34930.59803],[533779200000,34930.59803],[536457600000,35946.02239],[539136000000,35946.02239],[541555200000,35946.02239],[544233600000,37570.70137],[546825600000,37570.70137],[549504000000,37570.70137],[552096000000,39398.46522],[554774400000,39398.46522],[557452800000,39398.46522],[560044800000,41731.76712],[562723200000,41731.76712],[565315200000,41731.76712],[567993600000,43482.75035],[570672000000,43482.75035],[573177600000,43482.75035],[575856000000,46109.22521],[578448000000,46109.22521],[581126400000,46109.22521],[583718400000,52237.66653],[586396800000,52237.66653],[589075200000,52237.66653],[591667200000,55447.80246],[594345600000,55447.80246],[596937600000,55447.80246],[599616000000,56615.12462],[602294400000,56615.12462],[604713600000,56615.12462],[607392000000,58657.93839],[609984000000,58657.93839],[612662400000,58657.93839],[615254400000,60700.75217],[617932800000,60700.75217],[620611200000,60700.75217],[623203200000,59533.43001],[625881600000,59533.43001],[628473600000,59533.43001],[631152000000,58249.72479],[633830400000,58249.72479],[636249600000,58249.72479],[638928000000,57726.00099],[641520000000,57726.00099],[644198400000,57726.00099],[646790400000,58773.44859],[649468800000,58773.44859],[652147200000,58773.44859],[654739200000,57900.57559],[657417600000,57900.57559],[660009600000,57900.57559],[662688000000,57085.89412],[665366400000,57085.89412],[667785600000,57085.89412],[670464000000,56853.12799],[673056000000,56853.12799],[675734400000,56853.12799],[678326400000,57958.76712],[681004800000,57958.76712],[683683200000,57958.76712],[686275200000,57435.04332],[688953600000,57435.04332],[691545600000,57435.04332],[694224000000,56503.97879],[696902400000,56503.97879],[699408000000,56503.97879],[702086400000,55165.57353],[704678400000,55165.57353],[707356800000,55165.57353],[709948800000,55328.30383],[712627200000,55328.30383],[715305600000,55328.30383],[717897600000,53212.80986],[720576000000,53212.80986],[723168000000,53212.80986],[725846400000,53484.02704],[728524800000,53484.02704],[730944000000,53484.02704],[733622400000,53917.97452],[736214400000,53917.97452],[738892800000,53917.97452],[741484800000,55057.08666],[744163200000,55057.08666],[746841600000,55057.08666],[749433600000,54026.46139],[752112000000,54026.46139],[754704000000,54026.46139],[757382400000,54623.13917],[760060800000,54623.13917],[762480000000,54623.13917],[765158400000,55382.54727],[767750400000,55382.54727],[770428800000,55382.54727],[773020800000,56304.68566],[775699200000,56304.68566],[778377600000,56304.68566],[780969600000,55924.98162],[783648000000,55924.98162],[786240000000,55924.98162],[788918400000,55436.7907],[791596800000,55436.7907],[794016000000,55436.7907],[796694400000,56033.46849],[799286400000,56033.46849],[801964800000,56033.46849],[804556800000,56521.6594],[807235200000,56521.6594],[809913600000,56521.6594],[812505600000,55762.25131],[815184000000,55762.25131],[817776000000,55762.25131],[820454400000,56575.90284],[823132800000,56575.90284],[825638400000,56575.90284],[828316800000,56630.14627],[830908800000,56630.14627],[833587200000,56630.14627],[836179200000,58854.12711],[838857600000,58854.12711],[841536000000,58854.12711],[844128000000,59884.75238],[846806400000,59884.75238],[849398400000,59884.75238],[852076800000,60698.40391],[854755200000,60698.40391],[857174400000,60698.40391],[859852800000,61946.00292],[862444800000,61946.00292],[865123200000,61946.00292],[867715200000,65092.12215],[870393600000,65092.12215],[873072000000,65092.12215],[875664000000,64603.93124],[878342400000,64603.93124],[880934400000,64603.93124],[883612800000,66231.23429],[886291200000,66231.23429],[888710400000,66231.23429],[891388800000,69757.05758],[893980800000,69757.05758],[896659200000,69757.05758],[899251200000,72794.68994],[901929600000,72794.68994],[904608000000,72794.68994],[907200000000,72469.22933],[909878400000,72469.22933],[912470400000,72469.22933],[915148800000,72903.17681],[917827200000,72903.17681],[920246400000,72903.17681],[922924800000,75995.05261],[925516800000,75995.05261],[928195200000,75995.05261],[930787200000,80443.0143],[933465600000,80443.0143],[936144000000,80443.0143],[938736000000,82504.26483],[941414400000,82504.26483],[944006400000,82504.26483],[946684800000,84619.7588],[949363200000,84619.7588],[951868800000,84619.7588],[954547200000,89230.45079],[957139200000,89230.45079],[959817600000,89230.45079],[962409600000,90911.99728],[965088000000,90911.99728],[967766400000,90911.99728],[970358400000,93624.16903],[973036800000,93624.16903],[975628800000,93624.16903],[978307200000,93135.97812],[980985600000,93135.97812],[983404800000,93135.97812],[986083200000,96499.07109],[988675200000,96499.07109],[991353600000,96499.07109],[993945600000,99970.65094],[996624000000,99970.65094],[999302400000,99970.65094],[1001894400000,97963.64384],[1004572800000,97963.64384],[1007164800000,97963.64384],[1009843200000,97623.26629],[1012521600000,101164.0065],[1014940800000,104704.7467],[1017619200000,106121.0428],[1020211200000,108852.471],[1022889600000,113303.6873],[1025481600000,114214.1634],[1028160000000,116743.2635],[1030838400000,119575.8557],[1033430400000,120486.3318],[1036108800000,121700.2998],[1038700800000,125746.8601],[1041379200000,124836.384],[1044057600000,123521.252],[1046476800000,126151.5161],[1049155200000,129186.4363],[1051747200000,128275.9603],[1054425600000,128579.4523],[1057017600000,130805.0604],[1059696000000,133131.8326],[1062374400000,132727.1765],[1064966400000,135053.9487],[1067644800000,133536.4886],[1070236800000,136166.7528],[1072915200000,136976.0648],[1075593600000,135660.9327],[1078099200000,135964.4248],[1080777600000,142135.4292],[1083369600000,143855.2173],[1086048000000,146384.3174],[1088640000000,149520.4016],[1091318400000,151240.1897],[1093996800000,150936.6977],[1096588800000,152049.5018],[1099267200000,151847.1738],[1101859200000,150734.3697],[1104537600000,150633.2057],[1107216000000,150488.4315],[1109635200000,151723.0387],[1112313600000,153880.3389],[1114905600000,155532.5123],[1117584000000,156767.0554],[1120176000000,158785.7129],[1122854400000,159431.3031],[1125532800000,159183.1158],[1128124800000,158864.53],[1130803200000,159337.332],[1133395200000,160208.9727],[1136073600000,159969.9131],[1138752000000,160231.2181],[1141171200000,161530.5709],[1143849600000,165041.6836],[1146441600000,166605.7664],[1149120000000,168184.132],[1151712000000,170604.4111],[1154390400000,172036.6496],[1157068800000,172738.0135],[1159660800000,173749.7836],[1162339200000,174644.4066],[1164931200000,176819.0361],[1167609600000,176757.9355],[1170288000000,177261.0648],[1172707200000,178636.4297],[1175385600000,182242.6417],[1177977600000,184330.399],[1180656000000,186348.1192],[1183248000000,188691.0297],[1185926400000,189785.659],[1188604800000,190031.91],[1191196800000,189588.8194],[1193875200000,189489.2023],[1196467200000,189193.4909],[1199145600000,185781.6316],[1201824000000,184184.6548],[1204329600000,182844.7577],[1207008000000,183147.8404],[1209600000000,184267.3681],[1212278400000,181830.6502],[1214870400000,179845.201],[1217548800000,176092.3571],[1220227200000,171659.5213],[1222819200000,168177.1013],[1225497600000,163446.9347],[1228089600000,160954.2262],[1230768000000,157233.924],[1233446400000,155417.3852],[1235865600000,154452.3806],[1238544000000,155852.1556],[1241136000000,158004.4662],[1243814400000,159561.0605],[1246406400000,162423.2686],[1249084800000,164025.3201],[1251763200000,165313.7701],[1254355200000,166424.9027],[1257033600000,166986.1487],[1259625600000,168081.6091],[1262304000000,167468.9299],[1264982400000,167887.6822],[1267401600000,167877.9508],[1270080000000,170027.8904],[1272672000000,170845.9251],[1275350400000,171688.537],[1277942400000,173427.1067],[1280620800000,173417.4578],[1283299200000,172972.0443],[1285891200000,171044.7244],[1288569600000,169013.1436],[1291161600000,168702.7214],[1293840000000,167300.2404],[1296518400000,166415.1603],[1298937600000,165648.5379],[1301616000000,168218.06],[1304208000000,167469.7143],[1306886400000,167752.9093],[1309478400000,169865.8121],[1312156800000,169968.016],[1314835200000,169543.5734],[1317427200000,167673.168],[1320105600000,167756.8878],[1322697600000,167047.7706],[1325376000000,165908.4809],[1328054400000,165457.0798],[1330560000000,165947.3274],[1333238400000,167854.0205],[1335830400000,168395.3676],[1338508800000,170049.1636],[1341100800000,170701.1966],[1343779200000,170902.3776],[1346457600000,170295.1292],[1349049600000,169089.5181],[1351728000000,169227.2509],[1354320000000,168842.8434],[1356998400000,167715.5946],[1359676800000,167682.4598],[1362096000000,168681.4684],[1364774400000,170335.3686],[1367366400000,171233.7538],[1370044800000,172654.5105],[1372636800000,174592.2607],[1375315200000,175982.2931],[1377993600000,176097.8275],[1380585600000,175378.3971],[1383264000000,176351.5657],[1385856000000,177970.632],[1388534400000,178182.1947],[1391212800000,178921.4398],[1393632000000,179536.8481],[1396310400000,183531.6143],[1398902400000,185476.4913],[1401580800000,187077.4797],[1404172800000,189709.2488],[1406851200000,191932.1115],[1409529600000,192138.056],[1412121600000,191854.5777],[1414800000000,191209.195],[1417392000000,191669.3105],[1420070400000,190664.9416],[1422748800000,190827.1002],[1425168000000,191537.2634],[1427846400000,193224.7186],[1430438400000,195313.124],[1433116800000,196802.4578],[1435708800000,200141.5615],[1438387200000,201973.3647],[1441065600000,202388.7291],[1443657600000,202664.3387],[1446336000000,204223.2345],[1448928000000,204920.2481],[1451606400000,205464.2926],[1454284800000,205555.4075],[1456790400000,207667.1658],[1459468800000,208443.2286],[1462060800000,210872.4183],[1464739200000,212886.5299],[1467331200000,215126.9772],[1470009600000,215144.9613],[1472688000000,214816.236],[1475280000000,214106.8334],[1477958400000,215113.0566],[1480550400000,215499.8314],[1483228800000,215242.5623],[1485907200000,215697.4753],[1488326400000,215236.3504],[1491004800000,218641.5946],[1493596800000,219953.663],[1496275200000,221833.4783],[1498867200000,224719.137],[1501545600000,225738.1678],[1504224000000,224895.0198],[1506816000000,225092.3259],[1509494400000,224452.6722],[1512086400000,225329.9776],[1514764800000,224543.7559],[1517443200000,225131.191],[1519862400000,223772.1802],[1522540800000,225910.188],[1525132800000,226833.8665],[1527811200000,228355.3098],[1530403200000,231187.016],[1533081600000,231897.7019],[1535760000000,231454.2502],[1538352000000,231211.2302],[1541030400000,230224.3035],[1543622400000,229729.2591],[1546300800000,228314.4927],[1548979200000,227738.4642],[1551398400000,227103.9623],[1554076800000,228749.3498],[1556668800000,229061.1192],[1559347200000,230049.0452],[1561939200000,232618.1464],[1564617600000,233366.1371],[1567296000000,233536.15],[1569888000000,232919.4018],[1572566400000,232096.426],[1575158400000,231792.2947],[1577836800000,231939.909],[1580515200000,230609.0017],[1583020800000,232683.8062],[1585699200000,230317.758],[1588291200000,231507.7098],[1590969600000,234703.2452],[1593561600000,236686.9285],[1596240000000,238997.6916],[1598918400000,241541.4024],[1601510400000,243821.2247],[1604188800000,246519.9346],[1606780800000,248500.6663],[1609459200000,248846.2671],[1612137600000,249946.9414],[1614556800000,253508.0875],[1617235200000,250724.0725],[1619827200000,252590.6345],[1622505600000,264205.0734],[1625097600000,254034.5741],[1627776000000,263337.4435],[1630454400000,269944.9776]]');

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;