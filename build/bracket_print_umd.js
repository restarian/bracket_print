/* Brace Prototype resides under the MIT license

Copyright (c) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

Brace Prototype is a javascript which adds member data to object prototypes to control properties within the chain.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 this file is part of the Brace prototype 

 Author: Robert Steckroth, Bustout, <RobertSteckroth@gmail.com> */

/* Bracket Print resides under the LGPL v3 Copyright (c) 2020 Robert Steckroth, Bust0ut <RobertSteckroth@gmail.com>

Bracket print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

 this file is a part of Bracket Print

 Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 Bracket Print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

/* Generated by Brace_UMD 0.8.7 */
!function(e,t,n,i){var r,o,s,a={e:'object'==typeof module&&'filename'in module&&'exports'in module,requirejs:n,define:t,i:'object'==typeof i&&i||{},r:function(){var e={define:!this.i.auto_anonymous&&this.define||this.t,requirejs:this.requirejs||this.o,require:this.requirejs||this.e&&module.require||this.factory,factory:this.factory};this.i.force_type in e&&(e.requirejs=e.require=e.define=e.factory=e[this.i.force_type]),r=e.define,o=e.requirejs,s=e.require},n:!1,factory:function(t,n,i,r){t&&t.constructor===Array?(i,i=n,n=t,t=''):'string'!=typeof t&&(n,i=t,n=['require'],t='');var o=[],s=a.e&&module.require||e.require,l='';if(n.every(function(t){return t=t.replace(/^\.[\/,\\]/,''),o.push('require'===t&&s||e[t]),'require'===t||t in e||(l=t),!l}),!0!==a.n){if(!t)return a.n=!0,void(l?console.log('The amd factory attempted to load the',t||'anonymous','module that specified a dependency which was not defined:',l):a.e?module.exports=i.apply(i.prototype,o):i.apply(i.prototype,o));a.n=t}a.e?module.exports[t]=i.apply(i.prototype,o):e[t]=i.apply(i.prototype,o)},f:['config','nextTick','version','jsExtRegExp','isBrowser','s','toUrl','undef','defined','specified','onError','createNode','load','exec'],u:['amd','require'],t:function(){if(a.e&&!a.define)try{a.define=module.require('amdefine')(module);for(var e in a.define)a.t[e]=a.define[e]}catch(e){}var t=a.define||a.factory;t==a.define&&a.i.auto_anonymous?!0!==a.n&&'string'==typeof arguments[0]?a.n=arguments[0]:'string'!=typeof arguments[0]&&(a.n=!0):(a.t=t,a.r()),t.apply(t.prototype,arguments)},o:function(){if(a.e)try{a.requirejs=module.require('requirejs')}catch(e){}a.o=a.requirejs||a.factory,a.r(),a.o.apply(a.o.prototype,arguments)}};for(var l in a.u)a.t.__defineGetter__(a.u[l],function(e){if(a.e&&!a.define)try{a.define=module.require('amdefine')(module);for(var t in a.define)delete this[t],this[t]=a.define[t];return a.define[e]}catch(e){}}.bind(null,a.u[l]));if(!o)for(var l in a.f)a.o.__defineGetter__(a.f[l],function(e){if(a.e)try{return a.requirejs=module.require('requirejs'),a.o=a.requirejs,a.r(),a.requirejs[e]}catch(e){return}}.bind(null,a.f[l]));if(a.r(),r('serializer',['require'],function(e){return function(e,t,n,i,r){var o,s='',a=this.style_map[this.platform].denote_line||'\n',l=this.style_map[this.platform].denote_space||' ',h=this.style_map[this.platform].denote_tab||'\t';if('number'==typeof i&&this._cache||(this._cache=[]),t='string'==typeof t&&t||l+l,n=n||'',this.compression>3?(t='',o='',s=''):3===this.compression?(t='',o=l,s=l):(this.compression,o=l,s=a),e instanceof this.parent)this.append_string('string',e);else if(null===e)this.append_string('null','null');else if('boolean'==typeof e)this.append_string('boolean',e);else if(e!==e)this.append_string('nan','NaN');else if(e instanceof Error){var p=e.stack.split(/\r\n|\n/).slice(1).map(function(e){return e.replace(/^\s*/,this.compression<4&&n+t||' ')},this);this.append_string('namespace','Error'),this.append_string('colon',':'+o),this.append_string('string',n+e.message+s),this.append_string('function_body',p.join(s))}else if(void 0===e)this.append_string('undefined','undefined');else if((!this.enumerate_all||this.value_buffer)&&'undefined'!=typeof Buffer&&e instanceof Buffer)this.append_string('string',e.toString());else if(/object|function/.test(typeof e)){if(!this.append_string())return;var c=!1,_=!this.enumerate_all&&Object.keys||Object.getOwnPropertyNames;i=i||0,this._cache[i]=this._cache[i]||[],this._cache[i].push(e);for(var f=0;f<i;f++)for(var u=0;u<this._cache[f].length;u++)if('object'==typeof e&&e===this._cache[f][u]){if(this.append_string('function_body','CIRCULAR DUPLICATE'+o),this.append_string('colon','>'+o),this.append_string('namespace','Object'),!this.append_string('parenthesis','('))return!1;for(var d=0,m=Object.keys(this._cache[f][u]),g=0;g<m.length;g++){if(d+=m[g].length+3,this.append_string('string',m[g]),d>50){this.append_string('string',', ..');break}this.append_string('comma',', ')}return this.append_string('parenthesis',')')}'function'==typeof e.valueOf&&e.valueOf()!==e&&(c=!0);var b=e instanceof Array,y=!1;if('function'==typeof e){y=!0;var v=e.toString();v=e.hasOwnProperty('prototype')?e.toString().match(/function\s*([^\(]*)\(([^\)]*)\)\s*\{((?:.|[\n,\r\n])*)\}/im):['','','..arrow functions not supported in this version'];var j=(v[1]||'').replace(/\s+$/,''),q=v[2]||'',O=v[3]||'';this.append_string('namespace','function'),j&&this.append_string('string',l+j);var w=q.replace(/\t/g,'').replace(/ *, */g,',').split(',');this.append_string('parenthesis','('+(w[0]&&this.compression<3&&o||'')),w.forEach(function(e){this.append_string('parameter',e),this.append_string('comma',','+o)},this),this.remove_call(-1),this.append_string('parenthesis',(w[0]&&this.compression<3&&o||'')+')'+(this.compression<5&&l||'')),this.append_string('bracket','{'+(4===this.compression&&l||''));var I=!1;if(this.truncate_function)this.append_string('function_body',(this.compression<4&&l||'')+'...'+(this.compression<3&&a||this.compression<5&&l||''));else{var P=1/0,k=1/0;this.shift_function_body&&O.replace(/^[^(?:\n|\r\n)]+/,'').replace(/^(\s+)\S+.*$/gm,function(e,t){P=Math.min((t.match(/\t/g)||[]).length,P),k=Math.min((t.match(/ /g)||[]).length,k)}),this.compression>2?(O=O.replace(/^\s*/,'').replace(/\s*$/,''),3===this.compression&&this.append_string('indent',a)):(O=O.replace(/^\s*(?:\n|\r\n)/,'').replace(/\s*$/,''),this.append_string('indent',a),this.shift_function_body&&this.append_string('indent',n)),O=O.replace(/^(\s*)(\S+.*$)/gm,function(e,t,i){if(t=t.replace(/[^(?:\n|\r\n)]*(?:\n|\r\n)/g,function(){return this.append_string('indent',a),''}.bind(this)),i){i=i.replace(/\s*$/,'');var r=P,o=k;this.shift_function_body&&(t=t.replace(/\t/g,function(e){return r-- >0?'':e}),t=t.replace(/ /g,function(e){return o-- >0?'':e})),'\t'!==a&&(t=t.replace(/\t/g,h)),' '!==l&&(t=t.replace(/ /g,l)),/^\n$|^\r\n$/.test(a)||(t=t.replace(/\n|\r\n/g,a))}return t&&this.append_string('indent',(this.shift_function_body&&n||'')+t),i&&this.append_string('function_body',i),I=!0,''}.bind(this)),I&&(this.compression<4?this.append_string('indent',a):4===this.compression&&this.append_string('indent',l))}}else this.append_string(b&&'brace'||'bracket',b&&'['||'{'+(this.compression<3&&l||''));var E=_(e);if(!E.length){if('object'==typeof e.__proto__&&_(e.__proto__).length&&(this.append_string('indent',s+n+t),this._serializer('__proto__',void 0,void 0,i,!0),this.append_string('colon',':'+o),!this._serializer(e.__proto__,t,n+t,i+1)))return!1;if(c){if(this.append_string('indent',s+n+t),this.append_string('namespace','PRIMITIVE VALUE'+o),this.append_string('colon','>'+o),!this._serializer(e.valueOf(),t,n+t,i+1))return!1;if(this.append_string('comma',','+o),void 0!==e.length){if(this.append_string('indent',s+n+t),this.append_string('string','length'),this.append_string('colon',':'+o),!this._serializer(e.length,t,n+t,i+1))return!1;this.append_string('comma',','+o)}this.remove_call(-1)}this.append_string('indent',(!y&&this.compression<3&&s||'')+n),this.append_string(b&&'brace'||'bracket',b&&']'||'}'),this.append_string('comma',','+o)}for(var T=!1,x=1;x<E.length+1;x++){var S=E[x-1];if(!/^callee$|^caller$|^arguments$/.test(S)){if(!this.append_string())return!1;var B=T;if(T=!('object'!=typeof e[S]||null===e[S]||void 0===e[S]||!_(e[S]).length),1===this.compression?this.append_string('indent',s+n+t):2===this.compression&&(1===x||T||B)&&this.append_string('indent',s+n+t),1===x&&'function'==typeof e.valueOf&&e.valueOf()!==e){if(this.append_string('function_body','PRIMITIVE VALUE'+o),this.append_string('colon','>'+o),!this._serializer(e.valueOf(),t,n+t,i+1))return!1;this.append_string('comma',','+o),this.compression<3&&this.append_string('indent',s+n+t)}if(!b){if(!this._serializer(S,void 0,void 0,i,!0))return!1;this.append_string('colon',':'+o)}if(i<this.depth_limit-1||!T){if(!this._serializer(e[S],t,n+t,i+1))return!1}else{var z=_(e[S]).length;this.append_string('function_body','OBJECT WITH '+z+' PROPERT'+(1===z&&'Y'||'IES'))}if(this.append_string('comma',','+o),x===E.length){if(c&&void 0!==e.length){if(this.compression<2&&this.append_string('indent',s+n+t),this._serializer('length',void 0,void 0,i,!0),this.append_string('colon',':'+o),!this._serializer(e.length,t,n+t,i+1))return!1;this.append_string('comma',','+o)}if(this.remove_call(-1),e.__proto__&&'object'==typeof e.__proto__&&Object.keys(e.__proto__).length&&(this.append_string('comma',','+o),this.append_string('indent',s+n+t),this._serializer('__proto__',void 0,void 0,i,!0),this.append_string('colon',':'+o),!this._serializer(e.__proto__,t,n+t,i+1)))return!1;this.append_string('indent',(this.compression<3&&s||'')+n),this.append_string(b&&'brace'||'bracket',b&&']'||'}'),this.append_string('comma',','+o)}}}this.remove_call(-1)}else'number'==typeof e?this.append_string('number',e):'string'==typeof e?this._cache.length?(r&&!this.quote_qualifier||this.append_string('quote',this.denote_quoting),this.append_string('string',e),r&&!this.quote_qualifier||this.append_string('quote',this.denote_quoting)):this.append_string('string',e):this.append_string('namespace',e);return this._cache.length&&'number'!=typeof i&&(this._cache=[]),!0}}),'function'!=typeof r)var r=s('amdefine')(module);r('brace_prototype',[],function(){return function(e){if('object'!=typeof e)return!!console.log('Brace prototype must be passed an Object to assign additional members.')||e;var t={},n={};Object.getOwnPropertyNames(e).forEach(function(e){t[e]=null});var i=function(e){if(this.hasOwnProperty(e)){if('function'==typeof Object.getPrototypeOf)return!!Object.getPrototypeOf(this)[e]&&delete this[e]||!0;for(var t=this.__proto__;t;t=t.__proto__)if(e in t)return delete this[e]||!0}return!1};return e.clear=function(){if(!arguments.length){for(var e in t)i.call(this,e);for(var e in n)i.call(this,e)}for(var r in arguments)arguments[r]in t||arguments[r]in n?i.call(this,arguments[r]):console.log('The qualifier',arguments[r],'was passed to a brace prototype instance which does not have it listed.','You should either: insert the qualifier to the constructor Object parameter or add the qualifier with the add_qualifier member.')},e.extend=function(e){return Object.getOwnPropertyNames(e).forEach(function(t){var n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(this,t,n)},this),this},e.proto_extend=function(t){return Object.getOwnPropertyNames(t).forEach(function(e){var n=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(this,e,n)},e),e},e.add_qualifier=function(n){t[n]=null,e[n]=e[n]||null},e.add_hidden_qualifier=function(t){n[t]=null,e[t]=e[t]||null},e.remove_qualifier=function(e){delete t[e]},e.list=function(){return t},e}}),r('proto_object',['./serializer','brace_prototype'],function(e,t){var n=t({style:!0,title:!0,log_title:'',title_stamp:function(){return new Date},auto_hyphen_title:!0,theme:'light',compression:2,indentation_string:'   ',platform:('function'==typeof s&&!1===s.isBrowser||'object'==typeof module&&'object'==typeof module.exports)&&'terminal'||'browser',depth_limit:800,character_limit:Math.pow(2,25),style_character_limit:Math.pow(2,28),truncate_function:!1,shift_function_body:!0,enumerate_all:!1,value_buffer:!0,denote_quoting:'"',quote_qualifier:!1,level:1,internal_level:!1,get log_level(){return this._log_level},set log_level(e){if('all'===e||''===e)return this._log_level=[-1/0,1/0];'[object Array]'===Object.prototype.toString.call(e)?e.length%2&&e.pop():e=[e];var t=[];e.join('-').replace(/\ +/g,'').replace(/\-\-([^\-]{1})/g,'-minus$1').replace(/^\-/,'minus').split(',').forEach(function(e){if(e){var n=e.split('-');n.length<2&&n.push(n[0]);for(var i=0;i<n.length;i+=2){var r=/minus/.test(n[0]),o=/minus/.test(n[1]);if(/Infinity/.test(n[i])?n[i]=1/0:n[i]=parseInt(n[i].replace(/minus/,'')),/Infinity/.test(n[i])?n[i+1]=1/0:n[i+1]=parseInt(n[i+1].replace(/minus/,'')),n[i]!==n[i]||n[i+1]!==n[i+1])return void(this._is_error||new this.parent({_is_error:!0},this,{log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The value set to log_level can not be parsed as an integer:',n));r&&(n[i]*=-1),o&&(n[i+1]*=-1)}t=t.concat(n)}},this),this._log_level=t}});return n.add_hidden_qualifier('_log_level'),n.extend({_serializer:e,_log_level:[-1/0,1/0],toStyleString:function(){var e=this.formated;arguments.length&&(e=this._print_command(this._last_command||'space').apply(this,arguments).formated);var t,n;return(n=this.currentTheme)&&(t=this.currentPlatform)?(n.open_with||t.open_with||'')+e+(n.close_with||t.close_with||''):''},toString:function(){var e=this.plain;return arguments.length&&(e=this._print_command(this._last_command||'space').apply(this,arguments).plain),e},option:function(){var e=this._is_chained&&this||new this.parent(this),t=!1,n=function(e){for(var i,r=0;r<e.length;r++)if('[object Arguments]'===Object.prototype.toString.call(e[r]))n(e[r]);else if('object'==typeof e[r]||'string'==typeof e[r])if('string'==typeof(i=e[r]))t=!0,this.log_title=i;else{'_is_error'in i&&(this._is_error=i._is_error,delete i._is_error);for(var o in i)o in this.list()?!i.hasOwnProperty(o)||'log_title'===o&&t||(this[o]=i[o]):this._is_error||i instanceof this.parent||new this.parent({_is_error:!0},this,{log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).s('Option',o,'is not a bracket print option. Reference the brace prototype module for option configurations.').line(Object.keys(this.list())).log()}else if(!this._is_error){new this.parent({_is_error:!0},this,{log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The parameter passed in to option',typeof e[r],e[r],'is not accepted. See docs for more information.');continue}}.bind(e);return n(arguments),e},spawn:function(){return new this.parent(this,arguments)},get empty(){return function(){return this.remove_call(0),this.option.apply(this,arguments)}.bind(this)},get s(){return this._print_command('space')},get space(){return this._print_command('space')},get tab(){return this._print_command('tab')},get t(){return this._print_command('tab')},get line(){return this._print_command('line')},get l(){return this._print_command('line')},get add(){return this._print_command('add')},get a(){return this._print_command('add')},_print_command:function(e){var t=this._is_chained&&this||new this.parent(this);return t._is_chained=!0,t._last_command=e,function(){if(!arguments.length)return this.style&&this.currentTheme,this;for(var e=0;e<this.log_level.length;e+=2)if(parseInt(this.level)>=this.log_level[e]&&parseInt(this.level)<=this.log_level[e+1])return this._chain.apply(this,arguments);return this}.bind(t)},get _chain(){return function(){var e;if(!(e=this.currentPlatform))return this;var t=this.indentation_string;'\t'!==e.denote_tab&&(t=t.replace(/\t/g,e.denote_tab)),/^\n$|^\r\n$/.test(e.denote_line)||(t=t.replace(/\r\n|\n/g,e.denote_line)),' '!==e.denote_space&&(t=t.replace(/ /g,e.denote_space));for(var n=0;n<arguments.length&&(this.plain.length&&void 0!==e['denote_'+this._last_command]&&(this.plain+=e['denote_'+this._last_command],this.formated+=e['denote_'+this._last_command]),this._serializer(arguments[n],t));n++);return this}},_title:function(){var e='';if(this.title){var t='function'==typeof this.title_stamp&&this.title_stamp()||'string'==typeof this.title_stamp&&this.title_stamp||'';e='['+(this.log_title||'')+(this.auto_hyphen_title&&this.log_title&&t&&' - '||'')+t+'] '}return e},get log(){var e=this._is_chained&&this||new this.parent(this);return e._is_chained=!0,function(){for(var e=!1,t=0;t<this.log_level.length;t+=2)if(this.level>=this.log_level[t]&&this.level<=this.log_level[t+1]){e=!0;break}if(!e||this.style&&!this.currentTheme)return this;if(arguments.length>0&&(this[this._last_command]?this[this._last_command].apply(this,arguments):this.space.apply(this,arguments)),this.style){var n,i,r=[];if(!(i=this.currentTheme)||!(n=this.currentPlatform))return this;if(this.title){var o=n.format(i.title||i.base||'',this._title(),n.format.length>=3&&r||void 0);console.log.apply(console,this._apply_arguments.concat([o+this.toStyleString()],r))}else console.log.apply(console,this._apply_arguments.concat([this.toStyleString()],r))}else console.log(this._title()+this.plain);return this}.bind(e)},get log_false(){return function(){return this.log.apply(this,arguments),!1}.bind(this)},get log_true(){return function(){return this.log.apply(this,arguments),!0}.bind(this)},get log_undefined(){return function(){this.log.apply(this,arguments)}.bind(this)},get log_null(){return function(){return this.log.apply(this,arguments),null}.bind(this)},get log_empty(){return function(){return this.log.apply(this,arguments),''}.bind(this)}})}),r('style_map',[],function(){return{none:{denote_line:'\n',denote_tab:'\t',denote_space:' '},browser:{denote_line:'\n',denote_tab:'\t;',denote_space:' ',denote_add:'',import_theme_from:'html',default_theme:'light_1',format:function(e,t,n){return n.push(e),'%c'+t}},html:{denote_line:'<br>',denote_tab:'&#09;',denote_space:'&nbsp;',denote_add:'',default_theme:'light_1',format:function(e,t){return'<span style=\''+e+';\'>'+t+'</span>'},theme:{light_1:{quote:'color: #454343;',number:'color: green',string:'color: #b91db3',function_body:'color: #656565',nan:'color: #249e93',null:'color: #249e93',boolean:'color: red',comma:'color: #323232',undefined:'color: #f4d400',scope_container:'color: #286f4f',colon:'color: #363533',namespace:'color: #690900',indent:'color: #c2bab8',title:'color: #0a0a0a',variable:'color: #4a6a27'},light_2:{open_with:'<span style=\'font-weight: bold\'>',close_with:'</span>',quote:'color: #454343',number:'color: green',string:'color: #b91db3',function_body:'color: #656565',nan:'color: #249e93',null:'color: #249e93',boolean:'color: red',comma:'color: #323232',undefined:'color: #f4d400',scope_container:'color: #286f4f',colon:'color: #363533',namespace:'color: #690900',indent:'color: #c2bab8',title:'color: #0a0a0a',variable:'color: #4a6a27'},dark_1:{quote:'color: #d2d2d2',number:'color: green',string:'color: #e9e9e9',function_body:'color: #a7a7a7',nan:'color: yellow',null:'color: #5bc3ba',boolean:'color: red',comma:'color: #787878',undefined:'color: #e9d234',scope_container:'color: #80ab96',colon:'color: #dfd9b3',namespace:'color: #e05c50',indent:'color: #373332',title:'color: #f2f2f2',variable:'color: #baeb83'},dark_2:{open_with:'<span style=\'font-weight: bold\'>',close_with:'</span>',quote:'color: #d2d2d2',number:'color: green',string:'color: #e9e9e9',function_body:'color: #a7a7a7',nan:'color: yellow',null:'color: #5bc3ba',boolean:'color: red',comma:'color: #787878',undefined:'color: #e9d234',scope_container:'color: #80ab96',colon:'color: #dfd9b3',namespace:'color: #e05c50',indent:'color: #373332',title:'color: #f2f2f2',variable:'color: #baeb83'}}},terminal:{denote_line:'\n',denote_tab:'\t',denote_space:' ',close_with:'[0m',default_theme:'dark_1',format:function(e,t){return e+t},theme:{light_1:{base:'[0;35m',quote:'[0;34m',number:'[0;32m',string:'[0;35m',function_body:'[0;37m',nan:'[0;33m',null:'[0;36m',boolean:'[0;31m',comma:'[0;37m',undefined:'[0;32m',parenthesis:'[0;36m',bracket:'[0;36m',brace:'[0;36m',colon:'[0;37m',namespace:'[0;31m',indent:'[0;37m',title:'[0;33m',parameter:'[0;34m'},light_2:{base:'[1;35m',quote:'[1;34m',number:'[1;37m',string:'[1;35m',function_body:'[1;37m',nan:'[1;36m',null:'[1;36m',boolean:'[1;31m',comma:'[1;37m',undefined:'[1;36m',parenthesis:'[1;36m',bracket:'[1;36m',brace:'[1;36m',colon:'[1;37m',namespace:'[1;31m',indent:'[1;37m',title:'[1;37m',parameter:'[1;34m'},dark_1:{base:'[0;30m',quote:'[0;32m',number:'[0;32m',string:'[0;35m',function_body:'[0;31m',nan:'[0;33m',null:'[0;36m',boolean:'[0;31m',comma:'[0;30m',undefined:'[0;32m',bracket:'[0;36m',brace:'[0;36m',colon:'[0;30m',namespace:'[0;35m',indent:'[0;50m',title:'[0;34m',parameter:'[0;34m'},dark_2:{base:'[1;30m',quote:'[1;32m',number:'[1;32m',string:'[1;35m',function_body:'[1;30m',nan:'[1;33m',null:'[1;36m',boolean:'[1;31m',comma:'[1;30m',undefined:'[1;32m',bracket:'[1;36m',brace:'[1;36m',colon:'[1;30m',namespace:'[1;35m',indent:'[1;50m',title:'[1;34m',parameter:'[1;34m'}}}}}),r('bracket_print',['./proto_object','./style_map'],function(e,t){var n=function(){var e;if(!(this instanceof(e=n)))return new(Array.prototype.slice.call(arguments).reduce(function(e,t){return e=e.bind(e.prototype,t)},e));this._is_chained=!0,this.option(arguments),this._is_chained=!1,this._last_command=null,this._apply_arguments=[],this._plain_index=[],this._formated_index=[],this.formated='',this.plain=''};return n.prototype=e,n.prototype.parent=n,e.style_map=t,e.__defineGetter__('currentPlatform',function(){return'object'!=typeof this.style_map[this.platform]||null===this.style_map[this.platform]?(this._is_error||new this.parent({_is_error:!0},this,{style:!1,platform:'none',log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The requested platform',this.platform,'is not included in the style mapping.'),null):this.style_map[this.platform]}),e.__defineGetter__('currentTheme',function(){var e,t;if(!(e=this.currentPlatform))return null;var n=this.platform;if(e.import_theme_from){if(!e.import_theme_from in this.style_map)return this._is_error||new this.parent({_is_error:!0},this,{style:!1,log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The requested import theme',currentPlatform.import_theme_from,'is not included in the style mapping in platform',n),null;t=this.style_map[e.import_theme_from].theme,n=e.import_theme_from}else t=e.theme;if('object'!=typeof t)return this._is_error||new this.parent({_is_error:!0},this,{style:!1,log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The theme',this.theme,'is not found in the platform',n),null;if(this.theme+'_'+this.level in t)t=t[this.theme+'_'+this.level];else{if(!('default_theme'in e))return this._is_error||new this.parent({_is_error:!0},this,{style:!1,log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The theme',e.default_theme,'specified is not found in the',n,'style mapping.'),null;if(!(e.default_theme in t))return this._is_error||new this.parent({_is_error:!0},this,{style:!1,log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The default theme',e.default_theme,'specified is not found in the',n,'style mapping.'),null;t=t[e.default_theme]}return'object'!=typeof t?(this._is_error||new this.parent({_is_error:!0},this,{style:!1,log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The theme specified is not found in the',n,'style mapping.'),null):t}),e.remove_call=function(){this.currentPlatform.format&&this.currentPlatform.format.length>=3&&this._apply_arguments.splice.apply(this._apply_arguments,arguments);var e=this._formated_index.splice.apply(this._formated_index,arguments)[0]||0,t=this._plain_index.splice.apply(this._plain_index,arguments)[0]||0;return this.formated=this.formated.substr(0,e),this.plain=this.plain.substr(0,t),null},e.append_string=function(e,t){if(this.plain.length===this.character_limit)return!1;if(!arguments.length)return!0;var n='string'==typeof t&&t||String(t);if(!n)return!0;var i=' <..output truncated>';if(i=this.character_limit>3*i.length&&i||'',this.plain.length+n.length>this.character_limit-i.length&&(n=n.substr(0,this.character_limit-this.plain.length-i.length)+i),this.plain.length>=this.character_limit)return!1;if(this._plain_index.push(this.plain.length),this.plain+=n,this.style){var r,o;if(!(o=this.currentTheme)||!(r=this.currentPlatform))return'';this._formated_index.push(this.formated.length);var s;if(!(s=e in o&&o[e]||o.base))return new this.parent(this,{style:!1,log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log_true('There is not a style value set for',e,'in platform',this.platform);this.formated+=r.format(s,n,r.format.length>=3&&this._apply_arguments||void 0)}else if(this.formated.length){var o=this.currentTheme||{},r=this.currentPlatform||{};this.formated+=(o.close_with||r.close_with||'')+n+(o.open_with||r.open_with||'')}else this.formated+=n;return!0},n}),a.n.length&&r([a.n],function(e){return e})}(this,'function'==typeof define&&define||void 0,'function'==typeof requirejs&&requirejs||void 0,{auto_anonymous:!0});