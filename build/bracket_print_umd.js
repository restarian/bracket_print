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

/* Bracket Print resides under the LGPL v3

  Bracket print is a printing and logging tool for javascript engines which supplies literal ECMA serialization.

  Copyright (C) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

 this file and all files in this directory are a part of Bracket print

 Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Bracket print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

	Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com> */

/* Generated by Brace_UMD 0.8.4 */
!function(e,i,r,t){var define,requirejs,require,umd={e:'object'==typeof module&&'filename'in module&&'exports'in module,requirejs:r,define:i,i:'object'==typeof t&&t||{},r:function(){var e={define:!this.i.auto_anonymous&&this.define||this.t,requirejs:this.requirejs||this.o,require:this.requirejs||this.e&&module.require||this.factory,factory:this.factory};this.i.force_type in e&&(e.requirejs=e.require=e.define=e.factory=e[this.i.force_type]),define=e.define,requirejs=e.requirejs,require=e.require},n:!1,factory:function(i,r,t,o){i&&i.constructor===Array?(t,t=r,r=i,i=''):'string'!=typeof i&&(r,t=i,r=['require'],i='');var n=[],f=umd.e&&module.require||e.require,u='';if(r.every(function(i){return i=i.replace(/^\.[\/,\\]/,''),n.push('require'===i&&f||e[i]),'require'===i||i in e||(u=i),!u}),!0!==umd.n){if(!i)return umd.n=!0,void(u?console.log('The amd factory attempted to load the',i||'anonymous','module that specified a dependency which was not defined:',u):umd.e?module.exports=t.apply(t.prototype,n):t.apply(t.prototype,n));umd.n=i}umd.e?module.exports[i]=t.apply(t.prototype,n):e[i]=t.apply(t.prototype,n)},f:['config','nextTick','version','jsExtRegExp','isBrowser','s','toUrl','undef','defined','specified','onError','createNode','load','exec'],u:['amd','require'],t:function(){if(umd.e&&!umd.define)try{umd.define=module.require('amdefine')(module);for(var e in umd.define)umd.t[e]=umd.define[e]}catch(e){}var i=umd.define||umd.factory;i==umd.define&&umd.i.auto_anonymous?!0!==umd.n&&'string'==typeof arguments[0]?umd.n=arguments[0]:'string'!=typeof arguments[0]&&(umd.n=!0):(umd.t=i,umd.r()),i.apply(i.prototype,arguments)},o:function(){if(umd.e)try{umd.requirejs=module.require('requirejs')}catch(e){}umd.o=umd.requirejs||umd.factory,umd.r(),umd.o.apply(umd.o.prototype,arguments)}};for(var o in umd.u)umd.t.__defineGetter__(umd.u[o],function(e){if(umd.e&&!umd.define)try{umd.define=module.require('amdefine')(module);for(var i in umd.define)delete this[i],this[i]=umd.define[i];return umd.define[e]}catch(e){}}.bind(null,umd.u[o]));if(!requirejs)for(var o in umd.f)umd.o.__defineGetter__(umd.f[o],function(e){if(umd.e)try{return umd.requirejs=module.require('requirejs'),umd.o=umd.requirejs,umd.r(),umd.requirejs[e]}catch(e){return}}.bind(null,umd.f[o]));if(umd.r(),define('serializer',['require'],function(require){return function(msg,indent_string,previous_indent,level,is_qualifier){var compress_separator,line_separator='',denote_line=this.style_map[this.platform].denote_line||'\n',denote_space=this.style_map[this.platform].denote_space||' ',denote_tab=this.style_map[this.platform].denote_tab||'\t';if('number'==typeof level&&this._cache||(this._cache=[]),indent_string='string'==typeof indent_string&&indent_string||denote_space+denote_space,previous_indent=previous_indent||'',this.compression>3?(indent_string='',compress_separator='',line_separator=''):3===this.compression?(indent_string='',compress_separator=denote_space,line_separator=denote_space):(this.compression,compress_separator=denote_space,line_separator=denote_line),msg instanceof this.parent)this.append_string('string',msg);else if(null===msg)this.append_string('null','null');else if('boolean'==typeof msg)this.append_string('boolean',msg);else if(msg!==msg)this.append_string('nan','NaN');else if(msg instanceof Error){var stack_string=msg.stack.split(/[\n,\r]/).slice(1).map(function(val){return val.replace(/^\s*/,this.compression<4&&previous_indent+indent_string||' ')},this);this.append_string('namespace','Error'),this.append_string('colon',':'+compress_separator),this.append_string('string',previous_indent+msg.message+line_separator),this.append_string('function_body',stack_string.join(line_separator))}else if(void 0===msg)this.append_string('undefined','undefined');else if((!this.enumerate_all||this.value_buffer)&&'undefined'!=typeof Buffer&&msg instanceof Buffer)this.append_string('string',msg.toString());else if('object'==typeof msg||'function'==typeof msg){if(!this.append_string())return;var key_grab=!this.enumerate_all&&Object.keys||Object.getOwnPropertyNames,keys=key_grab(msg),is_primitive_object=!1;level=level||0,this._cache[level]=this._cache[level]||[],'function'==typeof msg.valueOf&&msg.valueOf()!==msg?is_primitive_object=!0:this._cache[level].push(msg);for(var n=0;n<level;n++)for(var x=0;x<this._cache[n].length;x++)if('object'==typeof msg&&msg===this._cache[n][x]){var circ_text='<..circular duplicate of:',obj_qualifier=key_grab(this._cache[n][x]);return obj_qualifier.unshift(''),obj_qualifier=obj_qualifier.join(' '+(this._cache[n-1]&&this._cache[n-1][x]||'<-')),circ_text.length+obj_qualifier.length>75&&(obj_qualifier=obj_qualifier.substr(0,71-circ_text.length)+'..'),this.append_string('namespace',circ_text),this.append_string('function_body',obj_qualifier),void this.append_string('namespace','>')}var is_array=msg.constructor===Array;if('function'==typeof msg){var f_str=msg.toString().match(/function(?: |[\n,\r])*(\S*)\(([^\)]*)\)(?: |[\n,\r,\t])*\{((?:.|[\n,\r])*)\}(?: |[\n,\r])*/i)||[],f_name=f_str[1]||'',f_parameter=f_str[2]||'',f_body=f_str[3]||'',f_name=f_str[1]||'';this.append_string('namespace','function'+(!f_name&&this.compression<3&&denote_space||'')),f_name&&this.append_string('string',denote_space+f_name);var param=f_parameter.replace(/\t/g,'').replace(/ *, */g,',').split(',');if(this.append_string('parenthesis','('+(param[0]&&this.compression<3&&compress_separator||'')),param.forEach(function(val){this.append_string('parameter',val),this.append_string('comma',','+(this.compression<4&&compress_separator||''))},this),this.remove_call(-1),this.append_string('parenthesis',(param[0]&&this.compression<3&&compress_separator||'')+')'+compress_separator),this.append_string('bracket','{'),this.truncate_function)this.append_string('function_body',compress_separator+'...');else{f_body=f_body.replace(/[\t, ]+$/,'').replace(/[\t, ]+([\n,\r]+)/g,'$1');var min_tab=999999999,min_space=999999999;this.compression<4&&(f_body.match(/^\s+/gm)||[]).forEach(function(match){min_tab=Math.min((match.match(/\t/g)||[]).length,min_tab),min_space=Math.min((match.match(/\ /g)||[]).length,min_space)}),this.compression<4&&!/^[\t, ]*[\n,\r]/.test(f_body)&&this.append_string('indent',denote_line);var first_iteration=!0;f_body=f_body.replace(/(^.*)([\n,\r]*)/gm,function(){1===this.compression?max_blank_line=2:2===this.compression?max_blank_line=1:this.compression>=3&&(max_blank_line=0);var newline=arguments[2].replace(/[\n,\r]/g,function(){return--max_blank_line>-2?denote_line:''});this.compression>3&&first_iteration&&!(first_iteration=!1)&&(newline=''),'\n'!==denote_line&&(f_body=f_body.replace(/[\n,\r]/g,denote_line)),this.shift_function_body&&this.append_string('indent',previous_indent+indent_string);var min_t=min_tab,min_s=min_space,body=arguments[1].replace(/^([ ,\t]+)(.*)/,function(full,indent,text){return indent.replace(/\t/g,function(){return--min_t>-1?'':denote_tab})+text}).replace(/^([ ,\t]+)(.*)/,function(full,indent,text){return indent.replace(/ /g,function(){return--min_s>-1?'':denote_space})+text});return'\t'!==denote_line&&(body=body.replace(/\t/g,denote_tab)),' '!==denote_space&&(body=body.replace(/ /g,denote_space)),this.append_string('function_body',body),this.append_string('indent',newline),''}.bind(this))}}else this.append_string(is_array&&'brace'||'bracket',is_array&&'['||'{'+(this.compression<3&&denote_space||''));var cnt=1;if(!keys.length){if('object'==typeof msg.__proto__&&key_grab(msg.__proto__).length&&(this.append_string('indent',line_separator+previous_indent+indent_string),this._serializer('__proto__',void 0,void 0,level,!0),this.append_string('colon',':'+compress_separator),!this._serializer(msg.__proto__,indent_string,previous_indent+indent_string,level+1)))return!1;if(is_primitive_object){if(this.append_string('indent',line_separator+previous_indent+indent_string),this.append_string('namespace','[[PrimitiveValue]]'),this.append_string('colon',':'+compress_separator),!this._serializer(msg.valueOf(),indent_string,previous_indent+indent_string,level+1))return!1;if(this.append_string('comma',','+compress_separator),void 0!==msg.length){if(this.append_string('indent',line_separator+previous_indent+indent_string),this.append_string('string','length'),this.append_string('colon',':'+compress_separator),!this._serializer(msg.length,indent_string,previous_indent+indent_string,level+1))return!1;this.append_string('comma',','+compress_separator)}this.remove_call(-1)}this.append_string('indent',(this.compression<3&&line_separator||'')+previous_indent),this.append_string(is_array&&'brace'||'bracket',is_array&&']'||'}'),this.append_string('comma',','+compress_separator)}for(var x=0;x<keys.length;x++){var o=keys[x];if(this.plain.length>=this.character_limit)return;var is_property_based=!('object'!=typeof msg[o]||null===msg[o]||void 0===msg[o]||!key_grab(msg[o]).length);if(1!==cnt&&this.compression<2&&this.append_string('indent',line_separator+previous_indent+indent_string),(1===cnt||is_property_based)&&(this.append_string('indent',line_separator+previous_indent+indent_string),1===cnt&&'function'==typeof msg.valueOf&&msg.valueOf()!==msg)){if(this.append_string('namespace','[[PrimitiveValue]]'),this.append_string('colon',':'+compress_separator),!this._serializer(msg.valueOf(),indent_string,previous_indent+indent_string,level+1))return!1;this.append_string('comma',','+line_separator),this.append_string('indent',compress_separator)}if(!is_array){if(!this._serializer(o,void 0,void 0,level,!0))return!1;this.append_string('colon',':'+compress_separator)}if(level<this.depth_limit-1||!is_property_based){if(!this._serializer(msg[o],indent_string,previous_indent+indent_string,level+1))return!1}else{var len=key_grab(msg[o]).length;this.append_string('namespace',new this.parent({style:!1}).add('<..',is_array&&'Array'||'object',' with ',len,' propert').add(1===len&&'y'||'ies','>'))}if(this.append_string('comma',','+compress_separator),cnt===keys.length){if(is_primitive_object&&void 0!==msg.length){if(this.append_string('indent',line_separator+previous_indent+indent_string),this._serializer('length',void 0,void 0,level,!0),this.append_string('colon',':'+compress_separator),!this._serializer(msg.length,indent_string,previous_indent+indent_string,level+1))return!1;this.append_string('comma',','+compress_separator)}if(this.remove_call(-1),msg.__proto__&&'object'==typeof msg.__proto__&&Object.keys(msg.__proto__).length&&(this.append_string('comma',','+compress_separator),this.append_string('indent',line_separator+previous_indent+indent_string),this._serializer('__proto__',void 0,void 0,level,!0),this.append_string('colon',':'+compress_separator),!this._serializer(msg.__proto__,indent_string,previous_indent+indent_string,level+1)))return!1;this.append_string('indent',line_separator+previous_indent),this.append_string(is_array&&'brace'||'bracket',is_array&&']'||'}'),this.append_string('comma',','+compress_separator)}cnt++}this.remove_call(-1)}else'number'==typeof msg?this.append_string('number',msg):'string'==typeof msg?this._cache.length?(is_qualifier&&!this.quote_qualifier||this.append_string('quote',this.denote_quoting),this.append_string('string',msg),is_qualifier&&!this.quote_qualifier||this.append_string('quote',this.denote_quoting)):this.append_string('string',msg):this.append_string('namespace',msg);return this._cache.length&&'number'!=typeof level&&(this._cache=[]),!0}}),'function'!=typeof define)var define=require('amdefine')(module);define('brace_prototype',[],function(){return function(e){if('object'!=typeof e)return!!console.log('Brace prototype must be passed an Object to assign additional members.')||e;var t={},r={};Object.getOwnPropertyNames(e).forEach(function(e){t[e]=null});var n=function(e){if(this.hasOwnProperty(e)){if('function'==typeof Object.getPrototypeOf)return!!Object.getPrototypeOf(this)[e]&&delete this[e]||!0;for(var t=this.__proto__;t;t=t.__proto__)if(e in t)return delete this[e]||!0}return!1};return e.clear=function(){if(!arguments.length){for(var e in t)n.call(this,e);for(var e in r)n.call(this,e)}for(var i in arguments)arguments[i]in t||arguments[i]in r?n.call(this,arguments[i]):console.log('The qualifier',arguments[i],'was passed to a brace prototype instance which does not have it listed.','You should either: insert the qualifier to the constructor Object parameter or add the qualifier with the add_qualifier member.')},e.extend=function(e){return Object.getOwnPropertyNames(e).forEach(function(t){var r=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(this,t,r)},this),this},e.proto_extend=function(t){return Object.getOwnPropertyNames(t).forEach(function(e){var r=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(this,e,r)},e),e},e.add_qualifier=function(r){t[r]=null,e[r]=e[r]||null},e.add_hidden_qualifier=function(t){r[t]=null,e[t]=e[t]||null},e.remove_qualifier=function(e){delete t[e]},e.list=function(){return t},e}}),define('proto_object',['./serializer','brace_prototype'],function(serializer,brace_prototype){var brace_proto=brace_prototype({style:!0,title:!0,log_title:'',title_stamp:function(){return new Date},auto_hyphen_title:!0,theme:'dark',compression:2,indentation_string:'    ',platform:('function'==typeof require&&!1===require.isBrowser||'object'==typeof module&&'object'==typeof module.exports)&&'terminal'||'browser',depth_limit:800,character_limit:Math.pow(2,25),style_character_limit:Math.pow(2,28),truncate_function:!1,shift_function_body:!0,enumerate_all:!1,value_buffer:!0,denote_quoting:'"',quote_qualifier:!1,level:1,internal_level:!1,get log_level(){return this._log_level},set log_level(value){if('all'===value||''===value)return this._log_level=[-1/0,1/0];'[object Array]'===Object.prototype.toString.call(value)?value.length%2&&value.pop():value=[value],value=value.join('-'),this._log_level=parsed=[],value.toString().replace(/\ +/g,'').replace(/\-\-([^\-]{1})/g,'-minus$1').replace(/^\-/,'minus').split(',').forEach(function(val){if(val){var range=val.split('-');range.length<2&&range.push(range[0]);for(var x=0;x<range.length;x+=2){var first_is_negative=/minus/.test(range[0]),second_is_negative=/minus/.test(range[1]);if(/Infinity/.test(range[x])?range[x]=1/0:range[x]=parseInt(range[x].replace(/minus/,'')),/Infinity/.test(range[x])?range[x+1]=1/0:range[x+1]=parseInt(range[x+1].replace(/minus/,'')),range[x]!==range[x]||range[x+1]!==range[x+1])return new this.parent(this,{level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log('The value set to log_level can not be parsed as an integer:',range);first_is_negative&&(range[x]*=-1),second_is_negative&&(range[x+1]*=-1)}parsed=parsed.concat(range)}}),this._log_level=parsed}});return brace_proto.add_hidden_qualifier('_log_level'),brace_proto.extend({_serializer:serializer,_log_level:[-1/0,1/0],toStyleString:function(){var formated=this.formated;arguments.length&&(formated=this._print_command(this._last_command||'space').apply(this,arguments).formated);var platform,theme;return(theme=this.current_theme)&&(platform=this.current_platform)?(theme.open_with||platform.open_with||'')+formated+(theme.close_with||platform.close_with||''):''},toString:function(){var plain=this.plain;return arguments.length&&(plain=this._print_command(this._last_command||'space').apply(this,arguments).plain),plain},option:function(){var print=this._is_chained&&this||new this.parent(this),contained_string_title=!1,parse_args=function(args){for(var opt,x=0;x<args.length;x++)if('[object Arguments]'===Object.prototype.toString.call(args[x]))parse_args(args[x]);else{if('object'!=typeof args[x]&&'string'!=typeof args[x])return new this.parent(this,{level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log('The parameter passed in to option',typeof args[x],args[x],'is not accepted. See docs for more information.');if('string'==typeof(opt=args[x]))contained_string_title=!0,this.log_title=opt;else for(var n in opt)n in this.list()?!opt.hasOwnProperty(n)||'log_title'===n&&contained_string_title||(this[n]=opt[n]):opt instanceof this.parent||new this.parent(this,{level:this.internal_level||this.level,log_title:'Bracket Print Error'}).s('Option',n,'is not a bracket print option. Reference the brace prototype module for option configurations.').line(Object.keys(this.list())).log()}}.bind(print);return parse_args(arguments),print},spawn:function(){return new this.parent(this,arguments)},get empty(){return function(){return this.remove_call(0),this.option.apply(this,arguments)}.bind(this)},get s(){return this._print_command('space')},get space(){return this._print_command('space')},get tab(){return this._print_command('tab')},get t(){return this._print_command('tab')},get line(){return this._print_command('line')},get l(){return this._print_command('line')},get add(){return this._print_command('add')},get a(){return this._print_command('add')},_print_command:function(call_name){var print=this._is_chained&&this||new this.parent(this);return print._is_chained=!0,print._last_command=call_name,function(){if(!arguments.length)return this.current_theme,this;for(var x=0;x<this.log_level.length;x+=2)if(parseInt(this.level)>=this.log_level[x]&&parseInt(this.level)<=this.log_level[x+1])return this._chain.apply(this,arguments);return this}.bind(print)},get _chain(){return function(){var platform;if(!(platform=this.current_platform))return this;var indentation=this.indentation_string;platform.denote_tab&&(indentation=indentation.replace(/\t/g,platform.denote_tab)),platform.denote_line&&(indentation=indentation.replace(/[\n,\r]/g,platform.denote_line)),platform.denote_space&&(indentation=indentation.replace(/ /g,platform.denote_space));for(var i=0;i<arguments.length&&(this.plain.length&&void 0!==platform['denote_'+this._last_command]&&(this.plain+=platform['denote_'+this._last_command],this.formated+=platform['denote_'+this._last_command]),this._serializer(arguments[i],indentation));i++);return this}},_title:function(){var title='';if(this.title){var title_stamp='function'==typeof this.title_stamp&&this.title_stamp()||'string'==typeof this.title_stamp&&this.title_stamp||'';title='['+(this.log_title||'')+(this.auto_hyphen_title&&this.log_title&&title_stamp&&' - '||'')+title_stamp+'] '}return title},get log(){var print=this._is_chained&&this||new this.parent(this);return print._is_chained=!0,function(){for(var in_range=!1,x=0;x<this.log_level.length;x+=2)if(this.level>=this.log_level[x]&&this.level<=this.log_level[x+1]){in_range=!0;break}if(!in_range)return this;if(arguments.length>0&&(this[this._last_command]?this[this._last_command].apply(this,arguments):this.space.apply(this,arguments)),this.style){var platform,theme,tmp_apply_args=[];if(!(theme=this.current_theme)||!(platform=this.current_platform))return this;if(this.title){var formated_title=platform.format(theme.title||theme.base||'',this._title(),platform.format.length>=3&&tmp_apply_args||void 0);console.log.apply(console,this.apply_arguments.concat([formated_title+this.toStyleString()],tmp_apply_args))}else console.log.apply(console,this.apply_arguments.concat([this.toStyleString()],tmp_apply_args))}else console.log(this._title()+this.plain);return this}.bind(print)},get log_false(){return function(){return this.log.apply(this,arguments),!1}.bind(this)},get log_true(){return function(){return this.log.apply(this,arguments),!0}.bind(this)},get log_undefined(){return function(){this.log.apply(this,arguments)}.bind(this)},get log_null(){return function(){return this.log.apply(this,arguments),null}.bind(this)},get log_empty(){return function(){return this.log.apply(this,arguments),''}.bind(this)}})}),define('style_map',[],function(){return{none:{denote_line:'\n',denote_tab:'\t',denote_space:' '},browser:{denote_line:'\n',denote_tab:'\t;',denote_space:' ',denote_add:'',import_theme_from:'html',default_theme:'light_1',format:function(style_value,str,apply_args){return apply_args.push(style_value),'%c'+str}},html:{denote_line:'<br>',denote_tab:'&#09;',denote_space:'&nbsp;',denote_add:'',default_theme:'light_1',format:function(color_value,str){return'<span style=\''+color_value+';\'>'+str+'</span>'},theme:{light_1:{quote:'color: #454343;',number:'color: green',string:'color: #b91db3',function_body:'color: #656565',nan:'color: #249e93',null:'color: #249e93',boolean:'color: red',comma:'color: #323232',undefined:'color: #f4d400',scope_container:'color: #286f4f',colon:'color: #363533',namespace:'color: #690900',indent:'color: #c2bab8',title:'color: #0a0a0a',variable:'color: #4a6a27'},light_2:{open_with:'<span style=\'font-weight: bold\'>',close_with:'</span>',quote:'color: #454343',number:'color: green',string:'color: #b91db3',function_body:'color: #656565',nan:'color: #249e93',null:'color: #249e93',boolean:'color: red',comma:'color: #323232',undefined:'color: #f4d400',scope_container:'color: #286f4f',colon:'color: #363533',namespace:'color: #690900',indent:'color: #c2bab8',title:'color: #0a0a0a',variable:'color: #4a6a27'},dark_1:{quote:'color: #d2d2d2',number:'color: green',string:'color: #e9e9e9',function_body:'color: #a7a7a7',nan:'color: yellow',null:'color: #5bc3ba',boolean:'color: red',comma:'color: #787878',undefined:'color: #e9d234',scope_container:'color: #80ab96',colon:'color: #dfd9b3',namespace:'color: #e05c50',indent:'color: #373332',title:'color: #f2f2f2',variable:'color: #baeb83'},dark_2:{open_with:'<span style=\'font-weight: bold\'>',close_with:'</span>',quote:'color: #d2d2d2',number:'color: green',string:'color: #e9e9e9',function_body:'color: #a7a7a7',nan:'color: yellow',null:'color: #5bc3ba',boolean:'color: red',comma:'color: #787878',undefined:'color: #e9d234',scope_container:'color: #80ab96',colon:'color: #dfd9b3',namespace:'color: #e05c50',indent:'color: #373332',title:'color: #f2f2f2',variable:'color: #baeb83'}}},terminal:{denote_line:'\n',denote_tab:'\t',denote_space:' ',close_with:'[0m',default_theme:'dark_1',format:function(style_value,val){return style_value+val},theme:{light_1:{base:'[0;35m',quote:'[0;30m',number:'[0;32m',string:'[0;35m',function_body:'[0;37m',nan:'[0;33m',null:'[0;36m',boolean:'[0;31m',comma:'[0;37m',undefined:'[0;32m',parenthesis:'[0;36m',bracket:'[0;36m',brace:'[0;36m',colon:'[0;37m',namespace:'[0;31m',indent:'[0;37m',title:'[0;33m',parameter:'[0;34m'},light_2:{base:'[1;35m',quote:'[1;30m',number:'[1;32m',string:'[1;35m',function_body:'[1;37m',nan:'[1;33m',null:'[1;36m',boolean:'[1;31m',comma:'[1;30m',undefined:'[1;32m',parenthesis:'[1;36m',bracket:'[1;36m',brace:'[1;36m',colon:'[1;37m',namespace:'[0;31m',indent:'[1;37m',title:'[1;33m',parameter:'[1;34m'},dark_1:{base:'[0;36m',quote:'[0;37m',number:'[0;32m',string:'[0;31m',function_body:'[0;97m',nan:'[0;33m',null:'[0;36m',boolean:'[0;31m',comma:'[0;37m',undefined:'[0;32m',bracket:'[0;36m',brace:'[0;36m',colon:'[0;37m',namespace:'[0;35m',indent:'[0;50m',title:'[0;33m',parameter:'[0;34m'},dark_2:{base:'[1;36m',quote:'[1;37m',number:'[1;32m',string:'[1;31m',function_body:'[1;37m',nan:'[1;33m',null:'[1;36m',boolean:'[1;31m',comma:'[1;37m',undefined:'[1;32m',bracket:'[1;36m',brace:'[1;36m',colon:'[1;37m',namespace:'[1;35m',indent:'[1;30m',title:'[1;33m',parameter:'[1;34m'}}}}}),define('bracket_print',['./proto_object','./style_map'],function(obj,style_map){var Print=function(){var call_instance;if(!(this instanceof(call_instance=Print)))return new(Array.prototype.slice.call(arguments).reduce(function(accumulator,value){return accumulator=accumulator.bind(accumulator.prototype,value)},call_instance));this._is_chained=!0,this.option(arguments),this._is_chained=!1,this._last_command=null,this.apply_arguments=[],this.formated='',this.plain='',this.plain_index=[],this.formated_index=[]};return Print.prototype=obj,Print.prototype.parent=Print,obj.style_map=style_map,obj.__defineGetter__('current_platform',function(){return'object'!=typeof this.style_map[this.platform]?new this.parent(this,{style:!1,platform:'none',level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_null('The requested platform',this.platform,'is not included in the style mapping.'):this.style_map[this.platform]}),obj.__defineGetter__('current_theme',function(){var platform,theme;if(!(platform=this.current_platform))return null;var platform_name=this.platform;if(platform.import_theme_from){if(!platform.import_theme_from in this.style_map)return new this.parent(this,{style:!1,level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_null('The requested import theme',current_platform.import_theme_from,'is not included in the style mapping.');theme=this.style_map[platform.import_theme_from].theme,platform_name=platform.import_theme_from}else theme=platform.theme;var level_theme=this.theme+'_'+this.level;if('object'!=typeof theme)return new this.parent(this,{style:!1,level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_null('The theme',level_theme,'is not found in the platform',platform_name);if(this.theme+'_'+this.level in theme)theme=theme[this.theme+'_'+this.level];else{if(!('default_theme'in platform))return new this.parent(this,{style:!1,level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_null('The theme',platform.default_theme,'specified is not found in the',platform_name,'style mapping.');if(!(platform.default_theme in theme))return new this.parent(this,{style:!1,level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_null('The default theme',platform.default_theme,'specified is not found in the',platform_name,'style mapping.');theme=theme[platform.default_theme]}return'object'!=typeof theme?new this.parent(this,{style:!1,level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_null('The theme specified is not found in the',platform_name,'style mapping.'):theme}),obj.remove_call=function(){this.current_platform.format&&this.current_platform.format.length>=3&&this.apply_arguments.splice.apply(this.apply_arguments,arguments);var formated_index=this.formated_index.splice.apply(this.formated_index,arguments)[0]||0,plain_index=this.plain_index.splice.apply(this.plain_index,arguments)[0]||0;return this.formated=this.formated.substr(0,formated_index),this.plain=this.plain.substr(0,plain_index),null},obj.append_string=function(style_name,str){if(this.plain.length===this.character_limit)return!1;if(!arguments.length)return!0;var plain='string'==typeof str&&str||String(str);if(!plain)return!0;var truncated_msg=' <..output truncated>';if(truncated_msg=this.character_limit>3*truncated_msg.length&&truncated_msg||'',this.plain.length+plain.length>this.character_limit-truncated_msg.length&&(plain=plain.substr(0,this.character_limit-this.plain.length-truncated_msg.length)+truncated_msg),this.plain.length>=this.character_limit)return!1;this.plain_index.push(this.plain.length),this.plain+=plain;var platform=theme={};if(this.style){if(!(theme=this.current_theme)||!(platform=this.current_platform))return'';this.formated_index.push(this.formated.length);var style_value;if(!(style_value=style_name in theme&&theme[style_name]||theme.base))return new this.parent(this,{style:!1,level:this.internal_level||this.level,log_title:'Bracket Print Error'}).log_true('There is not a style value set for',style_name,'in platform',this.platform);this.formated+=platform.format(style_value,plain,platform.format.length>=3&&this.apply_arguments||void 0)}else this.formated.length?this.formated+=(theme.close_with||platform.close_with||'')+plain+(theme.open_with||platform.open_with||''):this.formated+=plain;return!0},Print}),umd.n.length&&define([umd.n],function(e){return e})}(this,'function'==typeof define&&define||void 0,'function'==typeof requirejs&&requirejs||void 0,{auto_anonymous:!0});