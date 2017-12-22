/* Brace Prototype resides under the MIT license

Copyright (c) 2017 Robert Edward Steckroth <RobertSteckroth@gmail.com>

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

 this file is part of the Brace Prototype module
 Author: Robert Edward Steckroth II, Bustout, <RobertSteckroth@gmail.com> */

/* Bracket Print resides under the LGPL v3

  Bracket print is a printing and logging tool for javascript engines which supplies literal ECMA serialization.

  Copyright (C) 2018  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file and all files in this directory are a part of Bracket print

 Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Bracket print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

	Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com> */

/* Generated by Brace_UMD 0.7.4 */
if('function'!=typeof define)var define=require('amdefine')(module);if(define('serializer',['require'],function(t){return function(t,e,n,i,r){var o,s='',a=this.style_map[this.platform].denote_line||'\n',l=this.style_map[this.platform].denote_space||' ',h=this.style_map[this.platform].denote_tab||'\t';if('number'==typeof i&&this._cache||(this._cache=[]),e='string'==typeof e&&e||l+l,n=n||'',this.compression>3?(e='',o='',s=''):3===this.compression?(e='',o=l,s=l):(this.compression,o=l,s=a),t instanceof this.parent)this.append_string('string',t);else if(null===t)this.append_string('null','null');else if('boolean'==typeof t)this.append_string('boolean',t);else if(t!==t)this.append_string('nan','NaN');else if(t instanceof Error){var c=t.stack.split(/[\n,\r]/).slice(1).map(function(t){return t.replace(/^\s*/,this.compression<4&&n+e||' ')},this);this.append_string('namespace','Error'),this.append_string('colon',':'+o),this.append_string('string',n+t.message+s),this.append_string('function_body',c.join(s))}else if(void 0===t)this.append_string('undefined','undefined');else if((!this.enumerate_all||this.value_buffer)&&'undefined'!=typeof Buffer&&t instanceof Buffer)this.append_string('string',t.toString());else if('object'==typeof t||'function'==typeof t){if(!this.append_string())return;var p=!this.enumerate_all&&Object.keys||Object.getOwnPropertyNames,_=p(t),m=!1;i=i||0,this._cache[i]=this._cache[i]||[],'function'==typeof t.valueOf&&t.valueOf()!==t?m=!0:this._cache[i].push(t);for(var f=0;f<i;f++)for(var u=0;u<this._cache[f].length;u++)if('object'==typeof t&&t===this._cache[f][u]){var d='<..circular duplicate of:',g=p(this._cache[f][u]);return g.unshift(''),g=g.join(' '+(this._cache[f-1]&&this._cache[f-1][u]||'<-')),d.length+g.length>75&&(g=g.substr(0,71-d.length)+'..'),this.append_string('namespace',d),this.append_string('function_body',g),void this.append_string('namespace','>')}var b=t.constructor===Array;if('function'==typeof t){var v=t.toString().match(/function(?: |[\n,\r])*(\S*)\(([^\)]*)\)(?: |[\n,\r,\t])*\{((?:.|[\n,\r])*)\}(?: |[\n,\r])*/i)||[],y=v[1]||'',j=v[2]||'',w=v[3]||'',y=v[1]||'';this.append_string('namespace','function'+(!y&&this.compression<3&&l||'')),y&&this.append_string('string',l+y);var O=j.replace(/\t/g,'').replace(/ *, */g,',').split(',');if(this.append_string('parenthesis','('+(O[0]&&this.compression<3&&o||'')),O.forEach(function(t){this.append_string('parameter',t),this.append_string('comma',','+(this.compression<4&&o||''))},this),this.remove_call(-1),this.append_string('parenthesis',(O[0]&&this.compression<3&&o||'')+')'+o),this.append_string('bracket','{'),this.truncate_function)this.append_string('function_body',o+'...');else{w=w.replace(/[\t, ]+$/,'').replace(/[\t, ]+([\n,\r]+)/g,'$1');var q=999999999,k=999999999;this.compression<4&&(w.match(/^\s+/gm)||[]).forEach(function(t){q=Math.min((t.match(/\t/g)||[]).length,q),k=Math.min((t.match(/\ /g)||[]).length,k)}),this.compression<4&&!/^[\t, ]*[\n,\r]/.test(w)&&this.append_string('indent',a);var P=!0;w=w.replace(/(^.*)([\n,\r]*)/gm,function(){1===this.compression?max_blank_line=2:2===this.compression?max_blank_line=1:this.compression>=3&&(max_blank_line=0);var t=arguments[2].replace(/[\n,\r]/g,function(){return--max_blank_line>-2?a:''});this.compression>3&&P&&!(P=!1)&&(t=''),'\n'!==a&&(w=w.replace(/[\n,\r]/g,a)),this.shift_function_body&&this.append_string('indent',n+e);var i=q,r=k,o=arguments[1].replace(/^([ ,\t]+)(.*)/,function(t,e,n){return e.replace(/\t/g,function(){return--i>-1?'':h})+n}).replace(/^([ ,\t]+)(.*)/,function(t,e,n){return e.replace(/ /g,function(){return--r>-1?'':l})+n});return'\t'!==a&&(o=o.replace(/\t/g,h)),' '!==l&&(o=o.replace(/ /g,l)),this.append_string('function_body',o),this.append_string('indent',t),''}.bind(this))}}else this.append_string(b&&'brace'||'bracket',b&&'['||'{'+(this.compression<3&&l||''));var E=1;if(!_.length){if('object'==typeof t.__proto__&&p(t.__proto__).length&&(this.append_string('indent',s+n+e),this._serializer('__proto__',void 0,void 0,i,!0),this.append_string('colon',':'+o),!this._serializer(t.__proto__,e,n+e,i+1)))return!1;if(m){if(this.append_string('indent',s+n+e),this.append_string('namespace','[[PrimitiveValue]]'),this.append_string('colon',':'+o),!this._serializer(t.valueOf(),e,n+e,i+1))return!1;if(this.append_string('comma',','+o),void 0!==t.length){if(this.append_string('indent',s+n+e),this.append_string('string','length'),this.append_string('colon',':'+o),!this._serializer(t.length,e,n+e,i+1))return!1;this.append_string('comma',','+o)}this.remove_call(-1)}this.append_string('indent',(this.compression<3&&s||'')+n),this.append_string(b&&'brace'||'bracket',b&&']'||'}'),this.append_string('comma',','+o)}for(var u=0;u<_.length;u++){var x=_[u];if(this.plain.length>=this.character_limit)return;var z=!('object'!=typeof t[x]||null===t[x]||void 0===t[x]||!p(t[x]).length);if(1!==E&&this.compression<2&&this.append_string('indent',s+n+e),(1===E||z)&&(this.append_string('indent',s+n+e),1===E&&'function'==typeof t.valueOf&&t.valueOf()!==t)){if(this.append_string('namespace','[[PrimitiveValue]]'),this.append_string('colon',':'+o),!this._serializer(t.valueOf(),e,n+e,i+1))return!1;this.append_string('comma',','+s),this.append_string('indent',o)}if(!b){if(!this._serializer(x,void 0,void 0,i,!0))return!1;this.append_string('colon',':'+o)}if(i<this.depth_limit-1||!z){if(!this._serializer(t[x],e,n+e,i+1))return!1}else{var S=p(t[x]).length;this.append_string('namespace',new this.parent({style:!1}).add('<..',b&&'Array'||'object',' with ',S,' propert').add(1===S&&'y'||'ies','>'))}if(this.append_string('comma',','+o),E===_.length){if(m&&void 0!==t.length){if(this.append_string('indent',s+n+e),this._serializer('length',void 0,void 0,i,!0),this.append_string('colon',':'+o),!this._serializer(t.length,e,n+e,i+1))return!1;this.append_string('comma',','+o)}if(this.remove_call(-1),t.__proto__&&'object'==typeof t.__proto__&&Object.keys(t.__proto__).length&&(this.append_string('comma',','+o),this.append_string('indent',s+n+e),this._serializer('__proto__',void 0,void 0,i,!0),this.append_string('colon',':'+o),!this._serializer(t.__proto__,e,n+e,i+1)))return!1;this.append_string('indent',s+n),this.append_string(b&&'brace'||'bracket',b&&']'||'}'),this.append_string('comma',','+o)}E++}this.remove_call(-1)}else'number'==typeof t?this.append_string('number',t):'string'==typeof t?this._cache.length?(r&&!this.quote_qualifier||this.append_string('quote',this.denote_quoting),this.append_string('string',t),r&&!this.quote_qualifier||this.append_string('quote',this.denote_quoting)):this.append_string('string',t):this.append_string('namespace',t);return this._cache.length&&'number'!=typeof i&&(this._cache=[]),!0}}),'function'!=typeof define)var define=require('amdefine')(module);if(define('brace_prototype',[],function(){return function(t){if('object'!=typeof t)return!!console.warn('Brace prototype must be passed an Object to assign additional members.')||t;var e={},n={};Object.getOwnPropertyNames(t).forEach(function(t){e[t]=null});var i=function(t){if(this.hasOwnProperty(t)){if('function'==typeof Object.getPrototypeOf)return!!Object.getPrototypeOf(this)[t]&&delete this[t]||!0;for(var e=this.__proto__;e;e=e.__proto__)if(t in e)return delete this[t]||!0}return!1};return t.clear=function(){if(!arguments.length){for(var t in e)i.call(this,t);for(var t in n)i.call(this,t)}for(var r in arguments)arguments[r]in e?i.call(this,arguments[r]):console.log('The qualifier',arguments[r],'was passed to a brace prototype instance which does not have it listed.','You should either: insert the qualifier to the constructor Object parameter or add the qualifier with the add_qualifier member.')},t.extend=function(t){return Object.getOwnPropertyNames(t).forEach(function(e){var n=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(this,e,n)},this),this},t.proto_extend=function(e){return Object.getOwnPropertyNames(e).forEach(function(t){var n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(this,t,n)},t),t},t.add_qualifier=function(n){e[n]=null,t[n]=t[n]||null},t.add_hidden_qualifier=function(e){n[e]=null,t[e]=t[e]||null},t.remove_qualifier=function(t){delete e[t]},t.list=function(){return e},t}}),define('brace_prototype/brace_prototype_umd',function(){}),'function'!=typeof define)var define=require('amdefine')(module);if(define('proto_object',['./serializer','brace_prototype'],function(t,e){var n=e({style:!0,title:!0,log_title:'',title_stamp:function(){return new Date},auto_hyphen_title:!0,theme:'dark',compression:2,indentation_string:'    ',platform:('function'==typeof require&&!1===require.isBrowser||'object'==typeof module&&'object'==typeof module.exports)&&'terminal'||'browser',depth_limit:800,character_limit:Math.pow(2,25),style_character_limit:Math.pow(2,28),truncate_function:!1,shift_function_body:!0,enumerate_all:!1,value_buffer:!0,denote_quoting:'"',quote_qualifier:!1,level:1,internal_level:!1,get log_level(){return this._log_level},set log_level(t){if('all'===t||''===t)return this._log_level=[-1/0,1/0];'[object Array]'===Object.prototype.toString.call(t)?t.length%2&&t.pop():t=[t],t=t.join('-'),this._log_level=parsed=[],t.toString().replace(/\ +/g,'').replace(/\-\-([^\-]{1})/g,'-minus$1').replace(/^\-/,'minus').split(',').forEach(function(t){if(t){var e=t.split('-');e.length<2&&e.push(e[0]);for(var n=0;n<e.length;n+=2){var i=/minus/.test(e[0]),r=/minus/.test(e[1]);if(/Infinity/.test(e[n])?e[n]=1/0:e[n]=parseInt(e[n].replace(/minus/,'')),/Infinity/.test(e[n])?e[n+1]=1/0:e[n+1]=parseInt(e[n+1].replace(/minus/,'')),e[n]!==e[n]||e[n+1]!==e[n+1])return new this.parent(this,{level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log('The value set to log_level can not be parsed as an integer:',e);i&&(e[n]*=-1),r&&(e[n+1]*=-1)}parsed=parsed.concat(e)}}),this._log_level=parsed}});return n.add_hidden_qualifier('_log_level'),n.extend({_serializer:t,_log_level:[-1/0,1/0],toStyleString:function(){var t=this.formated;arguments.length&&(t=this._print_command(this._last_command||'space').apply(this,arguments).formated);var e,n;return(n=this.current_theme)&&(e=this.current_platform)?(n.open_with||e.open_with||'')+t+(n.close_with||e.close_with||''):''},toString:function(){var t=this.plain;return arguments.length&&(t=this._print_command(this._last_command||'space').apply(this,arguments).plain),t},option:function(){var t=this._is_chained&&this||new this.parent(this),e=!1,n=function(t){for(var i,r=0;r<t.length;r++)if('[object Arguments]'===Object.prototype.toString.call(t[r]))n(t[r]);else{if('object'!=typeof t[r]&&'string'!=typeof t[r])return new this.parent(this,{level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log('The parameter passed in as an option',typeof t[r],t[r],'is not accepted. See docs for more information.');if('string'==typeof(i=t[r]))e=!0,this.log_title=i;else for(var o in i)o in this.list()?'log_title'===o&&e||(this[o]=i[o]):i instanceof this.parent||new this.parent(this,{level:this.internal_level||this.level,log_title:'Bracket Print Error'}).s('Option',o,'is not a bracket print option. Reference the brace prototype module for option configurations.').line(Object.keys(this.list())).log()}}.bind(t);return n(arguments),t},spawn:function(){return new this.parent(this,arguments)},get empty(){return function(){return this.remove_call(0),this.option.apply(this,arguments)}.bind(this)},get s(){return this._print_command('space')},get space(){return this._print_command('space')},get tab(){return this._print_command('tab')},get t(){return this._print_command('tab')},get line(){return this._print_command('line')},get l(){return this._print_command('line')},get add(){return this._print_command('add')},get a(){return this._print_command('add')},_print_command:function(t){var e=this._is_chained&&this||new this.parent(this);return e._is_chained=!0,e._last_command=t,function(){if(!arguments.length)return this.current_theme,this;for(var t=0;t<this.log_level.length;t+=2)if(parseInt(this.level)>=this.log_level[t]&&parseInt(this.level)<=this.log_level[t+1])return this._chain.apply(this,arguments);return this}.bind(e)},get _chain(){return function(){var t;if(!(t=this.current_platform))return this;var e=this.indentation_string;t.denote_tab&&(e=e.replace(/\t/g,t.denote_tab)),t.denote_line&&(e=e.replace(/[\n,\r]/g,t.denote_line)),t.denote_space&&(e=e.replace(/ /g,t.denote_space));for(var n=0;n<arguments.length&&(this.plain.length&&void 0!==t['denote_'+this._last_command]&&(this.plain+=t['denote_'+this._last_command],this.formated+=t['denote_'+this._last_command]),this._serializer(arguments[n],e));n++);return this}},_title:function(){var t='';if(this.title){var e='function'==typeof this.title_stamp&&this.title_stamp()||'string'==typeof this.title_stamp&&this.title_stamp||'';t='['+(this.log_title||'')+(this.auto_hyphen_title&&this.log_title&&e&&' - '||'')+e+'] '}return t},get log(){var t=this._is_chained&&this||new this.parent(this);return t._is_chained=!0,function(){for(var t=!1,e=0;e<this.log_level.length;e+=2)if(this.level>=this.log_level[e]&&this.level<=this.log_level[e+1]){t=!0;break}if(!t)return this;if(arguments.length>0&&(this[this._last_command]?this[this._last_command].apply(this,arguments):this.space.apply(this,arguments)),this.style){var n,i,r=[];if(!(i=this.current_theme)||!(n=this.current_platform))return this;if(this.title){var o=n.format(i.title||i.base||'',this._title(),n.format.length>=3&&r||void 0);console.log.apply(console,this.apply_arguments.concat([o+this.toStyleString()],r))}else console.log.apply(console,this.apply_arguments.concat([this.toStyleString()],r))}else console.log(this._title()+this.plain);return this}.bind(t)},get log_false(){return function(){return this.log.apply(this,arguments),!1}.bind(this)},get log_true(){return function(){return this.log.apply(this,arguments),!0}.bind(this)},get log_undefined(){return function(){this.log.apply(this,arguments)}.bind(this)},get log_null(){return function(){return this.log.apply(this,arguments),null}.bind(this)},get log_empty(){return function(){return this.log.apply(this,arguments),''}.bind(this)}})}),'function'!=typeof define)var define=require('amdefine')(module);if(define('style_map',[],function(){return{none:{denote_line:'\n',denote_tab:'\t',denote_space:' '},browser:{denote_line:'\n',denote_tab:'\t;',denote_space:' ',denote_add:'',import_theme_from:'html',default_theme:'light_1',format:function(t,e,n){return n.push(t),'%c'+e}},html:{denote_line:'<br>',denote_tab:'&#09;',denote_space:'&nbsp;',denote_add:'',default_theme:'light_1',format:function(t,e){return'<span style=\''+t+';\'>'+e+'</span>'},theme:{light_1:{quote:'color: #454343;',number:'color: green',string:'color: #b91db3',function_body:'color: #656565',nan:'color: #249e93',null:'color: #249e93',boolean:'color: red',comma:'color: #323232',undefined:'color: #f4d400',scope_container:'color: #286f4f',colon:'color: #363533',namespace:'color: #690900',indent:'color: #c2bab8',title:'color: #0a0a0a',variable:'color: #4a6a27'},light_2:{open_with:'<span style=\'font-weight: bold\'>',close_with:'</span>',quote:'color: #454343',number:'color: green',string:'color: #b91db3',function_body:'color: #656565',nan:'color: #249e93',null:'color: #249e93',boolean:'color: red',comma:'color: #323232',undefined:'color: #f4d400',scope_container:'color: #286f4f',colon:'color: #363533',namespace:'color: #690900',indent:'color: #c2bab8',title:'color: #0a0a0a',variable:'color: #4a6a27'},dark_1:{quote:'color: #d2d2d2',number:'color: green',string:'color: #e9e9e9',function_body:'color: #a7a7a7',nan:'color: yellow',null:'color: #5bc3ba',boolean:'color: red',comma:'color: #787878',undefined:'color: #e9d234',scope_container:'color: #80ab96',colon:'color: #dfd9b3',namespace:'color: #e05c50',indent:'color: #373332',title:'color: #f2f2f2',variable:'color: #baeb83'},dark_2:{open_with:'<span style=\'font-weight: bold\'>',close_with:'</span>',quote:'color: #d2d2d2',number:'color: green',string:'color: #e9e9e9',function_body:'color: #a7a7a7',nan:'color: yellow',null:'color: #5bc3ba',boolean:'color: red',comma:'color: #787878',undefined:'color: #e9d234',scope_container:'color: #80ab96',colon:'color: #dfd9b3',namespace:'color: #e05c50',indent:'color: #373332',title:'color: #f2f2f2',variable:'color: #baeb83'}}},terminal:{denote_line:'\n',denote_tab:'\t',denote_space:' ',close_with:'[0m',default_theme:'dark_1',format:function(t,e){return t+e},theme:{light_1:{base:'[0;35m',quote:'[0;30m',number:'[0;32m',string:'[0;35m',function_body:'[0;37m',nan:'[0;33m',null:'[0;36m',boolean:'[0;31m',comma:'[0;37m',undefined:'[0;32m',parenthesis:'[0;36m',bracket:'[0;36m',brace:'[0;36m',colon:'[0;37m',namespace:'[0;31m',indent:'[0;37m',title:'[0;33m',parameter:'[0;34m'},light_2:{base:'[1;35m',quote:'[1;30m',number:'[1;32m',string:'[1;35m',function_body:'[1;37m',nan:'[1;33m',null:'[1;36m',boolean:'[1;31m',comma:'[1;30m',undefined:'[1;32m',parenthesis:'[1;36m',bracket:'[1;36m',brace:'[1;36m',colon:'[1;37m',namespace:'[0;31m',indent:'[1;37m',title:'[1;33m',parameter:'[1;34m'},dark_1:{base:'[0;36m',quote:'[0;37m',number:'[0;32m',string:'[0;31m',function_body:'[0;97m',nan:'[0;33m',null:'[0;36m',boolean:'[0;31m',comma:'[0;37m',undefined:'[0;32m',bracket:'[0;36m',brace:'[0;36m',colon:'[0;37m',namespace:'[0;35m',indent:'[0;50m',title:'[0;33m',parameter:'[0;34m'},dark_2:{base:'[1;36m',quote:'[1;37m',number:'[1;32m',string:'[1;31m',function_body:'[1;37m',nan:'[1;33m',null:'[1;36m',boolean:'[1;31m',comma:'[1;37m',undefined:'[1;32m',bracket:'[1;36m',brace:'[1;36m',colon:'[1;37m',namespace:'[1;35m',indent:'[1;30m',title:'[1;33m',parameter:'[1;34m'}}}}}),'function'!=typeof define)var define=require('amdefine')(module);define('bracket_print',['./proto_object','./style_map'],function(t,e){var n=function(){var t;if(!(this instanceof(t=n)))return new(Array.prototype.slice.call(arguments).reduce(function(t,e){return t=t.bind(t.prototype,e)},t));this._is_chained=!0,this.option(arguments),this._is_chained=!1,this._last_command=null,this.apply_arguments=[],this.formated='',this.plain='',this.plain_index=[],this.formated_index=[]};return n.prototype=t,n.prototype.parent=n,t.style_map=e,t.__defineGetter__('current_platform',function(){return'object'!=typeof this.style_map[this.platform]?new this.parent(this,{style:!1,platform:'none',level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_null('The requested platform',this.platform,'is not included in the style mapping.'):this.style_map[this.platform]}),t.__defineGetter__('current_theme',function(){var t,e;if(!(t=this.current_platform))return null;var n=this.platform;if(t.import_theme_from){if(!t.import_theme_from in this.style_map)return new this.parent(this,{style:!1,level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_null('The requested import theme',current_platform.import_theme_from,'is not included in the style mapping.');e=this.style_map[t.import_theme_from].theme,n=t.import_theme_from}else e=t.theme;var i=this.theme+'_'+this.level;if('object'!=typeof e)return new this.parent(this,{style:!1,level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_null('The theme',i,'is not found in the platform',n);if(this.theme+'_'+this.level in e)e=e[this.theme+'_'+this.level];else{if(!('default_theme'in t))return new this.parent(this,{style:!1,level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_null('The theme',t.default_theme,'specified is not found in the',n,'style mapping.');if(!(t.default_theme in e))return new this.parent(this,{style:!1,level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_null('The default theme',t.default_theme,'specified is not found in the',n,'style mapping.');e=e[t.default_theme]}return'object'!=typeof e?new this.parent(this,{style:!1,level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_null('The theme specified is not found in the',n,'style mapping.'):e}),t.remove_call=function(){this.current_platform.format&&this.current_platform.format.length>=3&&this.apply_arguments.splice.apply(this.apply_arguments,arguments);var t=this.formated_index.splice.apply(this.formated_index,arguments)[0]||0,e=this.plain_index.splice.apply(this.plain_index,arguments)[0]||0;return this.formated=this.formated.substr(0,t),this.plain=this.plain.substr(0,e),null},t.append_string=function(t,e){if(this.plain.length===this.character_limit)return!1;if(!arguments.length)return!0;var n='string'==typeof e&&e||String(e);if(!n)return!0;var i=' <..output truncated>';if(i=this.character_limit>3*i.length&&i||'',this.plain.length+n.length>this.character_limit-i.length&&(n=n.substr(0,this.character_limit-this.plain.length-i.length)+i),this.plain.length>=this.character_limit)return!1;this.plain_index.push(this.plain.length),this.plain+=n;var r=theme={};if(this.style){if(!(theme=this.current_theme)||!(r=this.current_platform))return'';this.formated_index.push(this.formated.length);var o;if(!(o=t in theme&&theme[t]||theme.base))return new this.parent(this,{style:!1,level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_true('There is not a style value set for',t,'in platform',this.platform);this.formated+=r.format(o,n,r.format.length>=3&&this.apply_arguments||void 0)}else this.formated.length?this.formated+=(theme.close_with||r.close_with||'')+n+(theme.open_with||r.open_with||''):this.formated+=n;return!0},n});