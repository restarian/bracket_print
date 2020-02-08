/* Brace Umd resided under the MIT License Copyright (c) 2020 Robert Steckroth <RobertSteckroth@gmail.com>

  Brace Umd is a unified module definition script to use when defining javascript modules.

  this file is a part of Brace Umd

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
SOFTWARE. */
/* Generated by Brace_UMD 0.10.3 */
!function(d,e,r,i){var define,requirejs,require,umd={commonjs_available:'object'==typeof module&&'filename'in module&&'exports'in module,requirejs:r,define:e,data:'object'==typeof i?i:{},set_global:function(){var e={define:!this.data.auto_anonymous&&this.define||this.define_proxy,requirejs:this.requirejs||this.requirejs_proxy,require:this.requirejs||this.commonjs_available&&module.require||this.factory,factory:this.factory};this.data.force_type in e&&(e.requirejs=e.require=e.define=e.factory=e[this.data.force_type]),define=e.define,requirejs=e.requirejs,require=e.require},_last_define_id:!1,factory:function(e,r,i,o){e&&e.constructor===Array?(o=i,i=r,r=e,e=''):'string'!=typeof e&&(o=r,i=e,r=['require'],e='');var t=[],n=umd.commonjs_available&&module.require||d.require,a='';if(r.every(function(e){return e=e.replace(/^\.[\/,\\]/,''),t.push('require'===e&&n||d[e]),'require'===e||e in d||(a=e),!a}),!0!==umd._last_define_id){if(!e)return umd._last_define_id=!0,void(a?console.log('The amd factory attempted to load the',e||'anonymous','module that specified a dependency which was not defined:',a):umd.commonjs_available?module.exports=i.apply(i.prototype,t):i.apply(i.prototype,t));umd._last_define_id=e}umd.commonjs_available?module.exports[e]=i.apply(i.prototype,t):d[e]=i.apply(i.prototype,t)},requirejs_proxy_key:['config','nextTick','version','jsExtRegExp','isBrowser','s','toUrl','undef','defined','specified','onError','createNode','load','exec'],define_proxy_key:['amd','require'],define_proxy:function(){if(umd.commonjs_available&&!umd.define)try{for(var e in umd.define=module.require('amdefine')(module),umd.define)umd.define_proxy[e]=umd.define[e]}catch(e){}var r=umd.define||umd.factory;r==umd.define&&umd.data.auto_anonymous?!0!==umd._last_define_id&&'string'==typeof arguments[0]?umd._last_define_id=arguments[0]:'string'!=typeof arguments[0]&&(umd._last_define_id=!0):(umd.define_proxy=r,umd.set_global()),r.apply(r.prototype,arguments)},requirejs_proxy:function(){if(umd.commonjs_available)try{umd.requirejs=module.require('requirejs')}catch(e){}umd.requirejs_proxy=umd.requirejs||umd.factory,umd.set_global(),umd.requirejs_proxy.apply(umd.requirejs_proxy.prototype,arguments)}};for(var o in umd.define_proxy_key)umd.define_proxy.__defineGetter__(umd.define_proxy_key[o],function(e){if(umd.commonjs_available&&!umd.define)try{for(var r in umd.define=module.require('amdefine')(module),umd.define)delete this[r],this[r]=umd.define[r];return umd.define[e]}catch(e){}}.bind(null,umd.define_proxy_key[o]));if(!requirejs)for(var o in umd.requirejs_proxy_key)umd.requirejs_proxy.__defineGetter__(umd.requirejs_proxy_key[o],function(e){if(umd.commonjs_available)try{return umd.requirejs=module.require('requirejs'),umd.requirejs_proxy=umd.requirejs,umd.set_global(),umd.requirejs[e]}catch(e){return}}.bind(null,umd.requirejs_proxy_key[o]));umd.set_global();
/* Brace Option resides under the MIT license  Copyright (c) 2020 Robert Steckroth <RobertSteckroth@gmail.com>

Brace Option adds member data to object prototypes to control properties within the chain.

 this file is part of the Brace Option 

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
SOFTWARE. */

/* Generated by Brace_UMD 0.10.1 */
if('function'!=typeof define)var define=require('amdefine')(module);define('brace_option',[],function(){return function(e,t){if(t=t&&t.parent&&t instanceof t.parent?t.spawn(t.log_title+' -> brace_option'):console,'object'!=typeof e)return t.log('Constructor must passed an Object to assign additional members.')||e;var r='function'==typeof Object.getPrototypeOf,n={},i={};Object.getOwnPropertyNames(e).forEach(function(e){n[e]=null});var o=function(e){if(this.hasOwnProperty(e)){if(r)return e in Object.getPrototypeOf(this)&&delete this[e]||!0;for(var t=this.__proto__;t;t=t.__proto__)if(e in t)return delete this[e]||!0}return!1};return e.clear=function(){if(!arguments.length){for(var e in n)o.call(this,e);for(var e in i)o.call(this,e)}for(var r in arguments)arguments[r]in n||arguments[r]in i?o.call(this,arguments[r]):t.log('The qualifier',arguments[r],'was passed to a brace prototype instance which does not have it listed.','You should either: insert the qualifier to the constructor Object parameter or add the qualifier with the add_qualifier member.')},e.extend=function(e){return Object.getOwnPropertyNames(e).forEach(function(t){var r=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(this,t,r)},this),this},e.proto_extend=function(t){return Object.getOwnPropertyNames(t).forEach(function(e){var r=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(this,e,r)},e),e},e.add_qualifier=function(t){n[t]=null,e[t]=e[t]||null},e.add_hidden_qualifier=function(t){i[t]=null,e[t]=e[t]||null},e.remove_qualifier=function(e){delete n[e]},e.list=function(){return n},e}});
/* Bracket Print resides under the LGPL v3 Copyright (c) 2020 Robert Steckroth, Bust0ut <RobertSteckroth@gmail.com>

Bracket print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

 this file is a part of Bracket Print

 Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 Bracket Print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

/* Generated by Brace_UMD 0.10.3 */
define('serializer',[],function(){return function(t,e,n,i,r){var s,o='',l=this.style_map[this.platform].denote_line||'\n',a=this.style_map[this.platform].denote_space||' ',h=this.style_map[this.platform].denote_tab||'\t';if('number'==typeof i&&this._cache||(this._cache=[]),e='string'==typeof e&&e||a+a,n=n||'',this.compression>3?(e='',s=''):3===this.compression?(e='',s=a,o=a):(this.compression,s=a,o=l),t instanceof this.parent)this.append_string('string',t);else if(null===t)this.append_string('null','null');else if('boolean'==typeof t)this.append_string('boolean',t);else if(t!==t)this.append_string('nan','NaN');else if(t instanceof Error){var p=t.stack.split(/\r\n|\n/).slice(1).map(function(t){return t.replace(/^\s*/,this.compression<4&&n+e||' ')},this);this.append_string('namespace','Error'),this.append_string('colon',':'+s),this.append_string('string',n+t.message+o),this.append_string('function_body',p.join(o))}else if(void 0===t)this.append_string('undefined','undefined');else if((!this.enumerate_all||this.value_buffer)&&'undefined'!=typeof Buffer&&t instanceof Buffer)this.append_string('string',t.toString());else if(/object|function/.test(typeof t)){if(!this.append_string())return;var c=!1,_=!this.enumerate_all&&Object.keys||Object.getOwnPropertyNames;i=i||0,this._cache[i]=this._cache[i]||[],this._cache[i].push(t);for(var m=0;m<i;m++)for(var d=0;d<this._cache[m].length;d++)if('object'==typeof t&&t===this._cache[m][d]){if(this.append_string('function_body','CIRCULAR DUPLICATE'+s),this.append_string('colon','>'+s),this.append_string('namespace','Object'),!this.append_string('parenthesis','('))return!1;for(var f=0,u=Object.keys(this._cache[m][d]),g=0;g<u.length;g++){if(f+=u[g].length+3,this.append_string('string',u[g]),f>50){this.append_string('string',', ..');break}this.append_string('comma',', ')}return this.append_string('parenthesis',')')}'function'==typeof t.valueOf&&t.valueOf()!==t&&(c=!0);var b=t instanceof Array,v=!1,y='{';if('function'==typeof t){v=!0;var j,I,w,O,k,q=!1;f_msg=t.toString();var P=f_msg.match(/^\s*([^\(]*)/);P&&(I=P[1]),I?(j=f_msg.match(/(\S+)\s*([^\(]*)\(([^\)]*)\)\s*\{((?:.|[\n,\r\n])*)\}/im),q=!0,I=j[1],w=j[2].replace(/\s+$/,''),O=j[3],k=j[4]):(j=f_msg.match(/\ *([^\=]*)\s*\=\>\s*([\{,\(]{0,1})((?:.|[\n,\r\n])*)/im),I='arrow',q=/^\s*\(/.test(j[1]),O=j[1].replace(/^\s*\(\s*/,'').replace(/\s*\)\s*$/,''),y=j[2],k='{'===y?j[3].replace(/\}\s*$/g,''):j[3].replace(/\)\s*$/g,'')),'arrow'!==I&&this.append_string('namespace',I),w&&this.append_string('string',a+w);var E=O.replace(/\t/g,'').replace(/ *, */g,',').replace(/\s*$/,'').split(',');if(q&&this.append_string('parenthesis','('+(E[0]&&this.compression<3&&a||'')),E.forEach(function(t){this.append_string('parameter',t),this.append_string('comma',','+s)},this),E.length&&this.remove_call(-1),q&&this.append_string('parenthesis',(E[0]&&this.compression<3&&a||'')+')'+(this.compression<5&&a||'')),'arrow'==I&&this.append_string('parameter','=>'+(this.compression<5&&a||'')),'('===y?this.append_string('parenthesis','('+('('!==y&&4===this.compression&&a||'')):this.append_string('bracket','{'+(4===this.compression&&a||'')),'('!==y&&this.truncate_function)this.append_string('function_body',(this.compression<4&&a||'')+'...'+(this.compression<3&&l||this.compression<5&&a||''));else{var T=1/0,$=1/0;this.shift_function_body&&k.replace(/^[^(?:\n|\r\n)]+/,'').replace(/^(\s+)\S+.*$/gm,function(t,e){T=Math.min((e.match(/\t/g)||[]).length,T),$=Math.min((e.match(/ /g)||[]).length,$)}),'('!==y&&(this.compression>2?(k=k.replace(/^\s*/,'').replace(/\s*$/,''),3===this.compression&&this.append_string('indent',l)):(k=k.replace(/^\s*(?:\n|\r\n)/,'').replace(/\s*$/,''),this.append_string('indent',l),this.shift_function_body&&this.append_string('indent',n)));var S=!0;k=k.replace(/^(\s*)(\S+.*$)/gm,function(t,e,i){if(S||this.append_string('indent',l),S=!1,e=e.replace(/[^(?:\n|\r\n)]*(?:\n|\r\n)/g,function(){return this.append_string('indent',l),''}.bind(this)),i){i=i.replace(/\s*$/,'');var r=T,s=$;this.shift_function_body&&(e=e.replace(/\t/g,function(t){return r-- >0?'':t}),e=e.replace(/ /g,function(t){return s-- >0?'':t})),'\t'!==l&&(e=e.replace(/\t/g,h)),' '!==a&&(e=e.replace(/ /g,a)),/^\n$|^\r\n$/.test(l)||(e=e.replace(/\n|\r\n/g,l))}return e&&this.append_string('indent',(this.shift_function_body&&n||'')+e),i&&this.append_string('function_body',i),''}.bind(this)),S||'('===y||(this.compression<4?this.append_string('indent',l):4===this.compression&&this.append_string('indent',a))}}else this.append_string(b&&'brace'||'bracket',b&&'['||'{'+(this.compression<3&&a||''));var z=_(t);if(!z.length){if('object'==typeof t.__proto__&&_(t.__proto__).length&&(this.append_string('indent',o+n+e),this._serializer('__proto__',void 0,void 0,i,!0),this.append_string('colon',':'+s),!this._serializer(t.__proto__,e,n+e,i+1)))return!1;if(c){if(this.append_string('indent',o+n+e),this.append_string('namespace','PRIMITIVE VALUE'+s),this.append_string('colon','>'+s),!this._serializer(t.valueOf(),e,n+e,i+1))return!1;if(this.append_string('comma',','+s),void 0!==t.length){if(this.append_string('indent',o+n+e),this.append_string('string','length'),this.append_string('colon',':'+s),!this._serializer(t.length,e,n+e,i+1))return!1;this.append_string('comma',','+s)}this.remove_call(-1)}this.append_string('indent',(!v&&this.compression<3&&o||'')+('('!==y&&n||'')),v?'('===y?this.append_string('parenthesis',')'):this.append_string('bracket','}'):this.append_string(b&&'brace'||'bracket',b&&']'||'}'),this.append_string('comma',','+s)}for(var B=!1,x=1;x<z.length+1;x++){var A=z[x-1];if(!/^callee$|^caller$|^arguments$/.test(A)){if(!this.append_string())return!1;var R=B;if(B=!('object'!=typeof t[A]||null===t[A]||void 0===t[A]||!_(t[A]).length),1===this.compression?this.append_string('indent',o+n+e):2===this.compression&&(1===x||B||R)&&this.append_string('indent',o+n+e),1===x&&'function'==typeof t.valueOf&&t.valueOf()!==t){if(this.append_string('function_body','PRIMITIVE VALUE'+s),this.append_string('colon','>'+s),!this._serializer(t.valueOf(),e,n+e,i+1))return!1;this.append_string('comma',','+s),this.compression<3&&this.append_string('indent',o+n+e)}if(!b){if(!this._serializer(A,void 0,void 0,i,!0))return!1;this.append_string('colon',':'+s)}if(i<this.depth_limit-1||!B){if(!this._serializer(t[A],e,n+e,i+1))return!1}else{var M=_(t[A]).length;this.append_string('function_body','OBJECT WITH '+M+' PROPERT'+(1===M&&'Y'||'IES'))}if(this.append_string('comma',','+s),x===z.length){if(c&&void 0!==t.length){if(this.compression<2&&this.append_string('indent',o+n+e),this._serializer('length',void 0,void 0,i,!0),this.append_string('colon',':'+s),!this._serializer(t.length,e,n+e,i+1))return!1;this.append_string('comma',','+s)}if(this.remove_call(-1),t.__proto__&&'object'==typeof t.__proto__&&Object.keys(t.__proto__).length&&(this.append_string('comma',','+s),this.append_string('indent',o+n+e),this._serializer('__proto__',void 0,void 0,i,!0),this.append_string('colon',':'+s),!this._serializer(t.__proto__,e,n+e,i+1)))return!1;this.append_string('indent',(this.compression<3&&o||'')+n),this.append_string(b&&'brace'||'bracket',b&&']'||'}'),this.append_string('comma',','+s)}}}this.remove_call(-1)}else if('number'==typeof t)this.append_string('number',t);else if('string'==typeof t){var C=/\S/.test(this.denote_quoting);this._cache.length?((C&&!r||this.quote_qualifier)&&this.append_string('quote',this.denote_quoting),this.append_string('string',C&&this.ensure_escape&&t.replace(RegExp('([^\\\\])'+this.denote_quoting,'g'),'$1\\'+this.denote_quoting)||t),(C&&!r||this.quote_qualifier)&&this.append_string('quote',this.denote_quoting)):this.append_string('string',t)}else this.append_string('namespace',t);return this._cache.length&&'number'!=typeof i&&(this._cache=[]),!0}}),define('proto_object',['./serializer','brace_option'],function(t,e){var n=e({style:!0,title:!0,log_title:'',title_stamp:function(){return new Date},auto_hyphen_title:!0,theme:'light',compression:2,indentation_string:'   ',platform:('function'==typeof require&&!1===require.isBrowser||'object'==typeof module&&'object'==typeof module.exports)&&'terminal'||'browser',depth_limit:800,character_limit:Math.pow(2,25),style_character_limit:Math.pow(2,28),truncate_function:!1,shift_function_body:!0,enumerate_all:!1,ensure_escape:!0,value_buffer:!0,denote_quoting:'"',quote_qualifier:!1,level:1,internal_level:!1,get log_level(){return this._log_level},set log_level(t){if('all'===t||''===t)return this._log_level=[-1/0,1/0];'[object Array]'===Object.prototype.toString.call(t)?t.length%2&&t.pop():t=[t];var e=[];t.join('-').replace(/\ +/g,'').replace(/\-\-([^\-]{1})/g,'-minus$1').replace(/^\-/,'minus').split(',').forEach(function(t){if(t){var n=t.split('-');n.length<2&&n.push(n[0]);for(var i=0;i<n.length;i+=2){var r=/minus/.test(n[0]),s=/minus/.test(n[1]);if(/Infinity/.test(n[i])?n[i]=1/0:n[i]=parseInt(n[i].replace(/minus/,'')),/Infinity/.test(n[i])?n[i+1]=1/0:n[i+1]=parseInt(n[i+1].replace(/minus/,'')),n[i]!==n[i]||n[i+1]!==n[i+1])return void(this._is_error||new this.parent({_is_error:!0},this,{log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The value set to log_level can not be parsed as an integer:',n));r&&(n[i]*=-1),s&&(n[i+1]*=-1)}e=e.concat(n)}},this),this._log_level=e}});return n.add_hidden_qualifier('_log_level'),n.extend({_serializer:t,_log_level:[-1/0,1/0],toStyleString:function(){var t=this.formated;arguments.length&&(t=this._print_command(this._last_command||'space').apply(this,arguments).formated);var e,n;return(n=this.currentTheme)&&(e=this.currentPlatform)?(n.open_with||e.open_with||'')+t+(n.close_with||e.close_with||''):''},toString:function(){var t=this.plain;return arguments.length&&(t=this._print_command(this._last_command||'space').apply(this,arguments).plain),t},option:function(){var t=this._is_chained&&this||new this.parent(this),e=!1,n=function(t){for(var i,r=0;r<t.length;r++)if('[object Arguments]'===Object.prototype.toString.call(t[r]))n(t[r]);else if('object'==typeof t[r]||'string'==typeof t[r])if('string'==typeof(i=t[r]))e=!0,this.log_title=i;else{'_is_error'in i&&(this._is_error=i._is_error,delete i._is_error);for(var s in i)s in this.list()?!i.hasOwnProperty(s)||'log_title'===s&&e||(this[s]=i[s]):this._is_error||i instanceof this.parent||new this.parent({_is_error:!0},this,{log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).s('Option',s,'is not a bracket print option. Reference the Brace Option module for option configurations.').line(Object.keys(this.list())).log()}else if(!this._is_error){new this.parent({_is_error:!0},this,{log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The parameter passed in to option',typeof t[r],t[r],'is not accepted. See docs for more information.');continue}}.bind(t);return n(arguments),t},spawn:function(){return new this.parent(this,arguments)},get empty(){return function(){return this.remove_call(0),this.option.apply(this,arguments)}.bind(this)},get s(){return this._print_command('space')},get space(){return this._print_command('space')},get tab(){return this._print_command('tab')},get t(){return this._print_command('tab')},get line(){return this._print_command('line')},get l(){return this._print_command('line')},get add(){return this._print_command('add')},get a(){return this._print_command('add')},_print_command:function(t){var e=this._is_chained&&this||new this.parent(this);return e._is_chained=!0,e._last_command=t,function(){if(!arguments.length)return this.style&&this.currentTheme,this;for(var t=0;t<this.log_level.length;t+=2)if(parseInt(this.level)>=this.log_level[t]&&parseInt(this.level)<=this.log_level[t+1])return this._chain.apply(this,arguments);return this}.bind(e)},get _chain(){return function(){var t;if(!(t=this.currentPlatform))return this;var e=this.indentation_string;'\t'!==t.denote_tab&&(e=e.replace(/\t/g,t.denote_tab)),/^\n$|^\r\n$/.test(t.denote_line)||(e=e.replace(/\r\n|\n/g,t.denote_line)),' '!==t.denote_space&&(e=e.replace(/ /g,t.denote_space));for(var n=0;n<arguments.length&&(this.plain.length&&void 0!==t['denote_'+this._last_command]&&(this.plain+=t['denote_'+this._last_command],this.formated+=t['denote_'+this._last_command]),this._serializer(arguments[n],e));n++);return this}},_title:function(){var t='';if(this.title){var e='function'==typeof this.title_stamp&&this.title_stamp()||'string'==typeof this.title_stamp&&this.title_stamp||'';t='['+(this.log_title||'')+(this.auto_hyphen_title&&this.log_title&&e&&' - '||'')+e+'] '}return t},get log(){var t=this._is_chained&&this||new this.parent(this);return t._is_chained=!0,function(){for(var t=!1,e=0;e<this.log_level.length;e+=2)if(this.level>=this.log_level[e]&&this.level<=this.log_level[e+1]){t=!0;break}if(!t||this.style&&!this.currentTheme)return this;if(arguments.length>0&&(this[this._last_command]?this[this._last_command].apply(this,arguments):this.space.apply(this,arguments)),this.style){var n,i,r=[];if(!(i=this.currentTheme)||!(n=this.currentPlatform))return this;if(this.title){var s=n.format(i.title||i.base||'',this._title(),n.format.length>=3&&r||void 0);console.log.apply(console,this._apply_arguments.concat([s+this.toStyleString()],r))}else console.log.apply(console,this._apply_arguments.concat([this.toStyleString()],r))}else console.log(this._title()+this.plain);return this}.bind(t)},get log_false(){return function(){return this.log.apply(this,arguments),!1}.bind(this)},get log_true(){return function(){return this.log.apply(this,arguments),!0}.bind(this)},get log_undefined(){return function(){this.log.apply(this,arguments)}.bind(this)},get log_null(){return function(){return this.log.apply(this,arguments),null}.bind(this)},get log_empty(){return function(){return this.log.apply(this,arguments),''}.bind(this)}})}),define('style_map',[],function(){return{none:{denote_line:'\n',denote_tab:'\t',denote_space:' '},browser:{denote_line:'\n',denote_tab:'\t;',denote_space:' ',denote_add:'',import_theme_from:'html',default_theme:'light_1',format:function(t,e,n){return n.push(t),'%c'+e}},html:{denote_line:'<br>',denote_tab:'&#09;',denote_space:'&nbsp;',denote_add:'',default_theme:'light_1',format:function(t,e){return'<span style=\''+t+';\'>'+e+'</span>'},theme:{light_1:{quote:'color: #454343;',number:'color: green',string:'color: #b91db3',function_body:'color: #656565',nan:'color: #249e93',null:'color: #249e93',boolean:'color: red',comma:'color: #323232',undefined:'color: #f4d400',scope_container:'color: #286f4f',colon:'color: #363533',namespace:'color: #690900',indent:'color: #c2bab8',title:'color: #0a0a0a',variable:'color: #4a6a27'},light_2:{open_with:'<span style=\'font-weight: bold\'>',close_with:'</span>',quote:'color: #454343',number:'color: green',string:'color: #b91db3',function_body:'color: #656565',nan:'color: #249e93',null:'color: #249e93',boolean:'color: red',comma:'color: #323232',undefined:'color: #f4d400',scope_container:'color: #286f4f',colon:'color: #363533',namespace:'color: #690900',indent:'color: #c2bab8',title:'color: #0a0a0a',variable:'color: #4a6a27'},dark_1:{quote:'color: #d2d2d2',number:'color: green',string:'color: #e9e9e9',function_body:'color: #a7a7a7',nan:'color: yellow',null:'color: #5bc3ba',boolean:'color: red',comma:'color: #787878',undefined:'color: #e9d234',scope_container:'color: #80ab96',colon:'color: #dfd9b3',namespace:'color: #e05c50',indent:'color: #373332',title:'color: #f2f2f2',variable:'color: #baeb83'},dark_2:{open_with:'<span style=\'font-weight: bold\'>',close_with:'</span>',quote:'color: #d2d2d2',number:'color: green',string:'color: #e9e9e9',function_body:'color: #a7a7a7',nan:'color: yellow',null:'color: #5bc3ba',boolean:'color: red',comma:'color: #787878',undefined:'color: #e9d234',scope_container:'color: #80ab96',colon:'color: #dfd9b3',namespace:'color: #e05c50',indent:'color: #373332',title:'color: #f2f2f2',variable:'color: #baeb83'}}},terminal:{denote_line:'\n',denote_tab:'\t',denote_space:' ',close_with:'[0m',default_theme:'dark_1',format:function(t,e){return t+e},theme:{light_1:{base:'[0;35m',quote:'[0;34m',number:'[0;32m',string:'[0;35m',function_body:'[0;37m',nan:'[0;33m',null:'[0;36m',boolean:'[0;31m',comma:'[0;37m',undefined:'[0;32m',parenthesis:'[0;36m',bracket:'[0;36m',brace:'[0;36m',colon:'[0;37m',namespace:'[0;31m',indent:'[0;37m',title:'[0;33m',parameter:'[0;34m'},light_2:{base:'[1;35m',quote:'[1;34m',number:'[1;37m',string:'[1;35m',function_body:'[1;37m',nan:'[1;36m',null:'[1;36m',boolean:'[1;31m',comma:'[1;37m',undefined:'[1;36m',parenthesis:'[1;36m',bracket:'[1;36m',brace:'[1;36m',colon:'[1;37m',namespace:'[1;31m',indent:'[1;37m',title:'[1;37m',parameter:'[1;34m'},dark_1:{base:'[0;30m',quote:'[0;32m',number:'[0;32m',string:'[0;35m',function_body:'[0;31m',nan:'[0;33m',null:'[0;36m',boolean:'[0;31m',comma:'[0;30m',undefined:'[0;32m',bracket:'[0;36m',brace:'[0;36m',colon:'[0;30m',namespace:'[0;35m',indent:'[0;50m',title:'[0;34m',parameter:'[0;34m'},dark_2:{base:'[1;30m',quote:'[1;32m',number:'[1;32m',string:'[1;35m',function_body:'[1;30m',nan:'[1;33m',null:'[1;36m',boolean:'[1;31m',comma:'[1;30m',undefined:'[1;32m',bracket:'[1;36m',brace:'[1;36m',colon:'[1;30m',namespace:'[1;35m',indent:'[1;50m',title:'[1;34m',parameter:'[1;34m'}}}}}),define('bracket_print',['./proto_object','./style_map'],function(t,e){var n=function(){var t;if(!(this instanceof(t=n)))return new(Array.prototype.slice.call(arguments).reduce(function(t,e){return t=t.bind(t.prototype,e)},t));this._is_chained=!0,this.option(arguments),this._is_chained=!1,this._last_command=null,this._apply_arguments=[],this._plain_index=[],this._formated_index=[],this.formated='',this.plain=''};return n.prototype=t,n.prototype.parent=n,t.style_map=e,t.__defineGetter__('currentPlatform',function(){return'object'!=typeof this.style_map[this.platform]||null===this.style_map[this.platform]?(this._is_error||new this.parent({_is_error:!0},this,{style:!1,platform:'none',log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The requested platform',this.platform,'is not included in the style mapping.'),null):this.style_map[this.platform]}),t.__defineGetter__('currentTheme',function(){var t,e;if(!(t=this.currentPlatform))return null;var n=this.platform;if(t.import_theme_from){if(!t.import_theme_from in this.style_map)return this._is_error||new this.parent({_is_error:!0},this,{style:!1,log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The requested import theme',currentPlatform.import_theme_from,'is not included in the style mapping in platform',n),null;e=this.style_map[t.import_theme_from].theme,n=t.import_theme_from}else e=t.theme;if('object'!=typeof e)return this._is_error||new this.parent({_is_error:!0},this,{style:!1,log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The theme',this.theme,'is not found in the platform',n),null;if(this.theme+'_'+this.level in e)e=e[this.theme+'_'+this.level];else{if(!('default_theme'in t))return this._is_error||new this.parent({_is_error:!0},this,{style:!1,log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The theme',t.default_theme,'specified is not found in the',n,'style mapping.'),null;if(!(t.default_theme in e))return this._is_error||new this.parent({_is_error:!0},this,{style:!1,log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The default theme',t.default_theme,'specified is not found in the',n,'style mapping.'),null;e=e[t.default_theme]}return'object'!=typeof e?(this._is_error||new this.parent({_is_error:!0},this,{style:!1,log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log('The theme specified is not found in the',n,'style mapping.'),null):e}),t.remove_call=function(){this.currentPlatform.format&&this.currentPlatform.format.length>=3&&this._apply_arguments.splice.apply(this._apply_arguments,arguments);var t=this._formated_index.splice.apply(this._formated_index,arguments)[0]||0,e=this._plain_index.splice.apply(this._plain_index,arguments)[0]||0;return this.formated=this.formated.substr(0,t),this.plain=this.plain.substr(0,e),null},t.append_string=function(t,e){if(this.plain.length===this.character_limit)return!1;if(!arguments.length)return!0;var n='string'==typeof e&&e||String(e);if(!n)return!0;var i=' <..output truncated>';if(i=this.character_limit>3*i.length&&i||'',this.plain.length+n.length>this.character_limit-i.length&&(n=n.substr(0,this.character_limit-this.plain.length-i.length)+i),this.plain.length>=this.character_limit)return!1;if(this._plain_index.push(this.plain.length),this.plain+=n,this.style){var r,s;if(!(s=this.currentTheme)||!(r=this.currentPlatform))return'';this._formated_index.push(this.formated.length);var o;if(!(o=t in s&&s[t]||s.base))return new this.parent(this,{style:!1,log_title:'Bracket Print Error',level:parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level}).log_true('There is not a style value set for',t,'in platform',this.platform);this.formated+=r.format(o,n,r.format.length>=3&&this._apply_arguments||void 0)}else if(this.formated.length){var s=this.currentTheme||{},r=this.currentPlatform||{};this.formated+=(s.close_with||r.close_with||'')+n+(s.open_with||r.open_with||'')}else this.formated+=n;return!0},n});
;umd._last_define_id.length&&define([umd._last_define_id],function(e){return e})}(this,'function'==typeof define&&define||void 0,'function'==typeof requirejs&&requirejs||void 0,{"auto_anonymous":true});
