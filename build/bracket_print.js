/* Bracket Print resides under the LGPL v3

  Brackit print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

  Copyright (C) 2017  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file is a part of Brackit print

 Brackit Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Brackit print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

  Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com> */

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

/*Bracket Print resides under the LGPL v3

  Brackit print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

  Copyright (C) 2017  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file is a part of Brackit print

 Brackit Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Brackit print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

  Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com> */

/* Bracket Print resides under the LGPL v3

  Brackit print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

  Copyright (C) 2017  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file is a part of Brackit print

 Brackit Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Brackit print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

	Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com> */

/* Generated by Brace_UMD 0.6.1 */
if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define("serializer", [ "require" ], function(t) {
    return function(t, e, i, n, r) {
        var s, o = "";
        var a = this.style_map[this.platform].denote_line;
        if (typeof n !== "number" || !this._cache) this._cache = [];
        e = typeof e === "string" && e || this.style_map[this.platform].denote_space + this.style_map[this.platform].denote_space;
        i = i || "";
        if (this.compression > 3) {
            e = "";
            s = "";
            o = "";
        } else if (this.compression === 3) {
            e = "";
            s = this.style_map[this.platform].denote_space;
            o = this.style_map[this.platform].denote_space;
        } else if (this.compression === 2) {
            s = this.style_map[this.platform].denote_space;
            o = this.style_map[this.platform].denote_line;
        } else {
            s = this.style_map[this.platform].denote_space;
            o = this.style_map[this.platform].denote_line;
        }
        if (t instanceof this.parent) {
            this.append_string("string", t);
        } else if (t === null) {
            this.append_string("null", "null");
        } else if (typeof t === "boolean") {
            this.append_string("boolean", t);
        } else if (t !== t) {
            this.append_string("nan", "NaN");
        } else if (t instanceof Error) {
            var l = t.stack.split(/[\n,\r]/).slice(1).map(function(t) {
                return t.replace(/^\s*/, this.compression < 4 && i + e || " ");
            }, this);
            this.append_string("namespace", "Error");
            this.append_string("colon", ":" + s);
            this.append_string("string", i + t.message + o);
            this.append_string("function_body", l.join(o));
        } else if (typeof t === "undefined") {
            this.append_string("undefined", "undefined");
        } else if ((!this.enumerate_all || this.value_buffer) && typeof Buffer !== "undefined" && t instanceof Buffer) {
            this.append_string("string", t.toString());
        } else if (typeof t === "object" || typeof t === "function") {
            if (!this.append_string()) return;
            var h = !this.enumerate_all && Object.keys || Object.getOwnPropertyNames;
            var p = h(t), c = false;
            n = n || 0;
            this._cache[n] = this._cache[n] || [];
            if (typeof t.valueOf === "function" && t.valueOf() !== t) {
                c = true;
            } else {
                this._cache[n].push(t);
            }
            for (var f = 0; f < n; f++) {
                for (var _ = 0; _ < this._cache[f].length; _++) {
                    if (typeof t === "object" && t === this._cache[f][_]) {
                        var m = "<..circular duplicate of:";
                        var u = h(this._cache[f][_]);
                        u.unshift("");
                        u = u.join(" " + (this._cache[f - 1] && this._cache[f - 1][_] || "<-"));
                        if (m.length + u.length > 75) u = u.substr(0, 71 - m.length) + "..";
                        this.append_string("namespace", m);
                        this.append_string("function_body", u);
                        this.append_string("namespace", ">");
                        return;
                    }
                }
            }
            var d = t.constructor === Array;
            if (typeof t === "function") {
                var g = t.toString().match(/function(?:\ |[\n,\r])*(\S*)\(([^\)]*)\)(?:\ |[\n,\r])*\{((?:.|[\n,\r])*)\}(?:\ |[\n,\r])*/i) || [];
                var b = g[1] || "";
                var y = g[2] || "";
                var v = g[3] || "";
                this.append_string("namespace", "function ");
                this.append_string("string", b);
                var j = y.split(",");
                this.append_string("parenthesis", "(" + (j[0] && s || ""));
                j.forEach(function(t) {
                    this.append_string("variable", t);
                    this.append_string("comma", ",");
                }, this);
                this.remove_call(-1);
                this.append_string("parenthesis", (j[0] && s || "") + ")" + s);
                this.append_string("bracket", "{" + s);
                if (this.truncate_function) {
                    this.append_string("function_body", s + "..." + s);
                } else {
                    var O = true;
                    if (!/[\n,\r]/.test(v)) v = a + v + a;
                    var w = Infinity, q = Infinity;
                    if (this.indent_function) {
                        (v.match(/^\s+/gm) || []).forEach(function(t) {
                            w = Math.min((t.match(/\t/g) || []).length, w);
                            q = Math.min((t.match(/\ /g) || []).length, q);
                        });
                    }
                    var k = true;
                    v.replace(/(^.*)([\n,\r]+)/gm, function() {
                        var t = /\S/.test(arguments[1]);
                        if (this.compression >= 4 && !t) return "";
                        if (t) k = false;
                        if ((this.compression === 2 || this.compression === 3) && /[\n,\r]{3,}/.test(arguments[2])) arguments[2] = a + a;
                        if (t) this.append_string("indent", i + e);
                        O = false;
                        var n = (arguments[2].match(/[\n,\r]/g) || []).reduce(function(t, e, i, n) {
                            if (n.length - 1 !== i) {
                                O = true;
                                return t + a;
                            }
                            return t;
                        }, a);
                        var r = w, s = q;
                        if (this.compression >= 0 && k) this.append_string("function_body", arguments[1].replace(/^[\t,\n,\r,\s]+/, "")); else if (this.indent_function) {
                            this.append_string("function_body", arguments[1].replace(/\t/g, function(t) {
                                if (--r > 0) return "";
                                return t;
                            }).replace(/\ /g, function(t) {
                                if (--s > 0) return "";
                                return t;
                            }));
                        }
                        this.append_string("indent", n);
                        return arguments[0];
                    }.bind(this));
                    if (!O) this.remove_call(-1);
                }
            } else {
                this.append_string(d && "brace" || "bracket", d && "[" || "{" + (this.compression < 3 && this.style_map[this.platform].denote_space || ""));
            }
            var P = 1;
            if (!p.length) {
                if (typeof t.__proto__ === "object" && h(t.__proto__).length) {
                    this.append_string("indent", o + i + e);
                    this._serializer("__proto__", undefined, undefined, n, true);
                    this.append_string("colon", ":" + s);
                    if (!this._serializer(t.__proto__, e, i + e, n + 1)) return false;
                }
                if (c) {
                    this.append_string("indent", o + i + e);
                    this.append_string("namespace", "[[PrimitiveValue]]");
                    this.append_string("colon", ":" + s);
                    if (!this._serializer(t.valueOf(), e, i + e, n + 1)) return false;
                    this.append_string("comma", "," + s);
                    if (typeof t.length !== "undefined") {
                        this.append_string("indent", o + i + e);
                        this.append_string("string", "length");
                        this.append_string("colon", ":" + s);
                        if (!this._serializer(t.length, e, i + e, n + 1)) return false;
                        this.append_string("comma", "," + s);
                    }
                    this.remove_call(-1);
                }
                this.append_string("indent", o + i);
                this.append_string(d && "brace" || "bracket", d && "]" || "}");
                this.append_string("comma", "," + s);
            }
            for (var _ = 0; _ < p.length; _++) {
                var z = p[_];
                if (this.plain.length >= this.character_limit) return;
                var S = !!(typeof t[z] === "object" && t[z] !== null && t[z] !== undefined && h(t[z]).length);
                if (P !== 1 && this.compression < 2) this.append_string("indent", o + i + e);
                if (P === 1 || S) {
                    this.append_string("indent", o + i + e);
                    if (P === 1 && typeof t.valueOf === "function" && t.valueOf() !== t) {
                        this.append_string("namespace", "[[PrimitiveValue]]");
                        this.append_string("colon", ":" + s);
                        if (!this._serializer(t.valueOf(), e, i + e, n + 1)) return false;
                        this.append_string("comma", "," + o);
                        this.append_string("indent", s);
                    }
                }
                if (!d) {
                    if (!this._serializer(z, undefined, undefined, n, true)) return false;
                    this.append_string("colon", ":" + s);
                }
                if (n < this.depth_limit - 1 || !S) {
                    if (!this._serializer(t[z], e, i + e, n + 1)) return false;
                } else {
                    var I = h(t[z]).length;
                    this.append_string("namespace", new this.parent({
                        style: false
                    }).add("<..", d && "Array" || "object", " with ", I, " propert").add(I === 1 && "y" || "ies", ">"));
                }
                this.append_string("comma", "," + s);
                if (P === p.length) {
                    if (c && typeof t.length !== "undefined") {
                        this.append_string("indent", o + i + e);
                        this._serializer("length", undefined, undefined, n, true);
                        this.append_string("colon", ":" + s);
                        if (!this._serializer(t.length, e, i + e, n + 1)) return false;
                        this.append_string("comma", "," + s);
                    }
                    this.remove_call(-1);
                    if (t.__proto__ && typeof t.__proto__ === "object" && Object.keys(t.__proto__).length) {
                        this.append_string("comma", "," + s);
                        this.append_string("indent", o + i + e);
                        this._serializer("__proto__", undefined, undefined, n, true);
                        this.append_string("colon", ":" + s);
                        if (!this._serializer(t.__proto__, e, i + e, n + 1)) return false;
                    }
                    this.append_string("indent", o + i);
                    this.append_string(d && "brace" || "bracket", d && "]" || "}");
                    this.append_string("comma", "," + s);
                }
                P++;
            }
            this.remove_call(-1);
        } else if (typeof t === "number") {
            this.append_string("number", t);
        } else if (typeof t === "string") {
            if (this._cache.length) {
                if (!r || this.quote_qualifier) this.append_string("quote", this.denote_quoting);
                this.append_string("string", t);
                if (!r || this.quote_qualifier) this.append_string("quote", this.denote_quoting);
            } else {
                this.append_string("string", t);
            }
        } else {
            this.append_string("namespace", t);
        }
        if (this._cache.length && typeof n !== "number") this._cache = [];
        return true;
    };
});

if ("function" != typeof define) var define = require("amdefine")(module);

define("brace_prototype/brace_prototype", [], function() {
    return function(t) {
        if ("object" != typeof t) return !!console.warn("Brace prototype must be passed an Object to assign additional members.") || t;
        var e = {};
        for (var i in t) e[i] = null;
        var n = function(t) {
            if (this.hasOwnProperty(t)) {
                if ("function" == typeof Object.getPrototypeOf) return !!Object.getPrototypeOf(this)[t] && delete this[t] || !0;
                for (var e = this.__proto__; e; e = e.__proto__) if (t in e) return delete this[t] || !0;
            }
            return !1;
        };
        return t.clear = function() {
            if (!arguments.length) for (var t in e) n.call(this, t);
            for (var i in arguments) arguments[i] in e ? n.call(this, arguments[i]) : console.log("The qualifier", arguments[i], "was passed to a brace prototype instance which does not have it listed.", "You should either: insert the qualifier to the constructor Object parameter or add the qualifier with the add_qualifier member.");
        }, t.extend = function(t) {
            return Object.getOwnPropertyNames(t).forEach(function(e) {
                var i = Object.getOwnPropertyDescriptor(t, e);
                Object.defineProperty(this, e, i);
            }, this), this;
        }, t.proto_extend = function(e) {
            return Object.getOwnPropertyNames(e).forEach(function(t) {
                var i = Object.getOwnPropertyDescriptor(e, t);
                Object.defineProperty(this, t, i);
            }, t), t;
        }, t.add_qualifier = function(i) {
            e[i] = null, t[i] = t[i] || null;
        }, t.remove_qualifier = function(t) {
            delete e[t];
        }, t.list = function() {
            return e;
        }, t;
    };
});

define("brace_prototype", [ "brace_prototype/brace_prototype" ], function(t) {
    return t;
});

if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define("proto_object", [ "./serializer", "brace_prototype" ], function(t, e) {
    var i = e({
        style: true,
        title: true,
        log_title: "",
        title_stamp: function() {
            return new Date();
        },
        theme: "dark",
        compression: 2,
        indentation_string: "    ",
        platform: (typeof require == "function" && require.isBrowser === false || typeof module === "object" && typeof module.exports === "object") && "terminal" || "browser",
        depth_limit: 800,
        character_limit: Math.pow(2, 25),
        style_character_limit: Math.pow(2, 28),
        truncate_function: false,
        indent_function: true,
        enumerate_all: false,
        value_buffer: true,
        denote_quoting: '"',
        quote_qualifier: false,
        level: 1,
        internal_level: false
    });
    i.add_qualifier("log_level");
    return i.proto_extend({
        _serializer: t,
        get log_level() {
            return this._log_level;
        },
        set log_level(t) {
            if (t === "all" || t === "") return this._log_level = [ -Infinity, Infinity ];
            if (Object.prototype.toString.call(t) === "[object Array]") {
                if (t.length % 2) t.pop();
            } else {
                t = [ t ];
            }
            t = t.join("-");
            this._log_level = parsed = [];
            t.toString().replace(/\ +/g, "").replace(/\-\-([^\-]{1})/g, "-minus$1").replace(/^\-/, "minus").split(",").forEach(function(t) {
                if (!t) return;
                var e = t.split("-");
                if (e.length < 2) e.push(e[0]);
                for (var i = 0; i < e.length; i += 2) {
                    var n = /minus/.test(e[0]), r = /minus/.test(e[1]);
                    if (/Infinity/.test(e[i])) e[i] = Infinity; else e[i] = parseInt(e[i].replace(/minus/, ""));
                    if (/Infinity/.test(e[i])) e[i + 1] = Infinity; else e[i + 1] = parseInt(e[i + 1].replace(/minus/, ""));
                    if (e[i] !== e[i] || e[i + 1] !== e[i + 1]) return new this.parent(this, {
                        level: this.internal_level || this.level,
                        log_title: "Bracket Print Error"
                    }).log("The value set to log_level can not be parsed as an integer:", e);
                    if (n) e[i] *= -1;
                    if (r) e[i + 1] *= -1;
                }
                parsed = parsed.concat(e);
            });
            this._log_level = parsed;
        },
        _log_level: [ -Infinity, Infinity ],
        toStyleString: function() {
            var t = this.formated;
            if (arguments.length) t = this._print_command(this._last_command || "space").apply(this, arguments).formated;
            var e = this.style_map[this.platform];
            var i = e.theme[this.theme + "_" + this.level];
            return (i && i.open_with || e && e.open_with || "") + t + (i && i.close_with || e && e.close_with || "");
        },
        toString: function() {
            var t = this.plain;
            if (arguments.length) t = this._print_command(this._last_command || "space").apply(this, arguments).plain;
            return t;
        },
        option: function() {
            var t = this._is_chained && this || new this.parent(this);
            var e = false;
            var i = function(t) {
                var n;
                for (var r = 0; r < t.length; r++) {
                    if (Object.prototype.toString.call(t[r]) === "[object Arguments]") {
                        i(t[r]);
                    } else if (typeof t[r] === "object" || typeof t[r] === "string") {
                        n = t[r];
                        if (typeof n === "string") {
                            e = true;
                            this.log_title = n;
                        } else {
                            for (var s in n) {
                                if (s in this.list()) {
                                    if (s !== "log_title" || !e) this[s] = n[s];
                                } else if (!(n instanceof this.parent)) {
                                    return new this.parent(this, {
                                        level: this.internal_level || this.level,
                                        log_title: "Bracket Print Error"
                                    }).s("Option", s, "is not a brackit print option. Reference the brace prototype module for option configurations.").line(Object.keys(this.list())).log();
                                }
                            }
                        }
                    } else {
                        return new this.parent(this, {
                            level: this.internal_level || this.level,
                            log_title: "Bracket Print Error"
                        }).log("The parameter passed in as an option", typeof t[r], t[r], "is not accepted. See docs for more information.");
                        continue;
                    }
                }
            }.bind(t);
            i(arguments);
            return t;
        },
        spawn: function() {
            return new this.parent(this, arguments);
        },
        get empty() {
            return function() {
                this.remove_call(0);
                return this.option.apply(this, arguments);
            }.bind(this);
        },
        get s() {
            return this._print_command("space");
        },
        get space() {
            return this._print_command("space");
        },
        get tab() {
            return this._print_command("tab");
        },
        get t() {
            return this._print_command("tab");
        },
        get line() {
            return this._print_command("line");
        },
        get l() {
            return this._print_command("line");
        },
        get add() {
            return this._print_command("add");
        },
        get a() {
            return this._print_command("add");
        },
        _print_command: function(t) {
            var e = this._is_chained && this || new this.parent(this);
            e._is_chained = true;
            e._last_command = t;
            return function() {
                if (!arguments.length) return this;
                for (var t = 0; t < this.log_level.length; t += 2) if (parseInt(this.level) >= this.log_level[t] && parseInt(this.level) <= this.log_level[t + 1]) {
                    return this._chain.apply(this, arguments);
                }
                return this;
            }.bind(e);
        },
        get _chain() {
            return function() {
                var t = this.indentation_string.replace(/\t/g, this.style_map[this.platform].denote_tab).replace(/\n/g, this.style_map[this.platform].denote_line).replace(/\ /g, this.style_map[this.platform].denote_space);
                for (var e = 0; e < arguments.length; e++) {
                    if (this.plain.length && typeof this.style_map[this.platform]["denote_" + this._last_command] !== "undefined") {
                        this.plain += this.style_map[this.platform]["denote_" + this._last_command];
                        this.formated += this.style_map[this.platform]["denote_" + this._last_command];
                    }
                    if (!this._serializer(arguments[e], t)) break;
                }
                return this;
            };
        },
        get log() {
            var t = this._is_chained && this || new this.parent(this);
            t._is_chained = true;
            return function() {
                var t = false;
                for (var e = 0; e < this.log_level.length; e += 2) if (this.level >= this.log_level[e] && this.level <= this.log_level[e + 1]) {
                    t = true;
                    break;
                }
                if (!t) return this;
                if (arguments.length > 0) {
                    if (this[this._last_command]) {
                        this[this._last_command].apply(this, arguments);
                    } else {
                        this.space.apply(this, arguments);
                    }
                }
                var i = this.theme + "_" + this.level, n = "", r, s, o;
                if (this.title && (this.log_title || this.title_stamp)) n = "[" + (this.log_title || "") + (this.log_title && " - " || "") + (this.title_stamp && (typeof this.title_stamp === "function" && this.title_stamp() || String(this.title_stamp)) || "") + "] ";
                if (this.style) {
                    s = this.style_map[this.platform].format.length >= 3, o = [];
                    r = n;
                    console.log.apply(console, this.apply_arguments.concat(o, [ r, this.toStyleString() ]));
                } else {
                    console.log(this.plain);
                }
                return this;
            }.bind(t);
        },
        get log_false() {
            return function() {
                this.log.apply(this, arguments);
                return false;
            }.bind(this);
        },
        get log_true() {
            return function() {
                this.log.apply(this, arguments);
                return true;
            }.bind(this);
        },
        get log_undefined() {
            return function() {
                this.log.apply(this, arguments);
                return undefined;
            }.bind(this);
        },
        get log_null() {
            return function() {
                this.log.apply(this, arguments);
                return null;
            }.bind(this);
        },
        get log_empty() {
            return function() {
                this.log.apply(this, arguments);
                return "";
            }.bind(this);
        }
    });
});

if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define("style_map", [ "require" ], function(t) {
    return {
        browser: {
            denote_line: "\n",
            denote_tab: "\t;",
            denote_space: " ",
            denote_add: "",
            use_theme_from: "html",
            default_theme: "light_1",
            format: function(t, e, i) {
                i.push(t);
                return "%c" + e;
            }
        },
        html: {
            denote_line: "<br>",
            denote_tab: "&#09;",
            denote_space: "&nbsp;",
            denote_add: "",
            default_theme: "light_1",
            format: function(t, e) {
                return "<span style='" + t + ";'>" + e + "</span>";
            },
            theme: {
                light_1: {
                    quote: "color: #454343;",
                    number: "color: green",
                    string: "color: #b91db3",
                    function_body: "color: #656565",
                    nan: "color: #249e93",
                    null: "color: #249e93",
                    boolean: "color: red",
                    comma: "color: #323232",
                    undefined: "color: #f4d400",
                    scope_container: "color: #286f4f",
                    colon: "color: #363533",
                    namespace: "color: #690900",
                    indent: "color: #c2bab8",
                    title: "color: #0a0a0a",
                    variable: "color: #4a6a27"
                },
                light_2: {
                    open_with: "<span style='font-weight: bold'>",
                    close_with: "</span>",
                    quote: "color: #454343",
                    number: "color: green",
                    string: "color: #b91db3",
                    function_body: "color: #656565",
                    nan: "color: #249e93",
                    null: "color: #249e93",
                    boolean: "color: red",
                    comma: "color: #323232",
                    undefined: "color: #f4d400",
                    scope_container: "color: #286f4f",
                    colon: "color: #363533",
                    namespace: "color: #690900",
                    indent: "color: #c2bab8",
                    title: "color: #0a0a0a",
                    variable: "color: #4a6a27"
                },
                dark_1: {
                    quote: "color: #d2d2d2",
                    number: "color: green",
                    string: "color: #e9e9e9",
                    function_body: "color: #a7a7a7",
                    nan: "color: yellow",
                    null: "color: #5bc3ba",
                    boolean: "color: red",
                    comma: "color: #787878",
                    undefined: "color: #e9d234",
                    scope_container: "color: #80ab96",
                    colon: "color: #dfd9b3",
                    namespace: "color: #e05c50",
                    indent: "color: #373332",
                    title: "color: #f2f2f2",
                    variable: "color: #baeb83"
                },
                dark_2: {
                    open_with: "<span style='font-weight: bold'>",
                    close_with: "</span>",
                    quote: "color: #d2d2d2",
                    number: "color: green",
                    string: "color: #e9e9e9",
                    function_body: "color: #a7a7a7",
                    nan: "color: yellow",
                    null: "color: #5bc3ba",
                    boolean: "color: red",
                    comma: "color: #787878",
                    undefined: "color: #e9d234",
                    scope_container: "color: #80ab96",
                    colon: "color: #dfd9b3",
                    namespace: "color: #e05c50",
                    indent: "color: #373332",
                    title: "color: #f2f2f2",
                    variable: "color: #baeb83"
                }
            }
        },
        terminal: {
            denote_line: "\n",
            denote_tab: "\t;",
            denote_space: " ",
            close_with: "[0m",
            default_theme: "dark_1",
            format: function(t, e) {
                return t + e;
            },
            theme: {
                light_1: {
                    base: "[0;35m",
                    quote: "[0;30m",
                    number: "[0;32m",
                    string: "[0;35m",
                    function_body: "[0;37m",
                    nan: "[0;33m",
                    null: "[0;36m",
                    boolean: "[0;31m",
                    comma: "[0;37m",
                    undefined: "[0;32m",
                    parenthesis: "[0;36m",
                    bracket: "[0;36m",
                    brace: "[0;36m",
                    colon: "[0;37m",
                    namespace: "[0;31m",
                    indent: "[0;37m",
                    title: "[0;35m",
                    parameter: "[0;34m"
                },
                light_2: {
                    base: "[1;35m",
                    quote: "[1;30m",
                    number: "[1;32m",
                    string: "[1;35m",
                    function_body: "[1;37m",
                    nan: "[1;33m",
                    null: "[1;36m",
                    boolean: "[1;31m",
                    comma: "[1;30m",
                    undefined: "[1;32m",
                    parenthesis: "[1;36m",
                    bracket: "[1;36m",
                    brace: "[1;36m",
                    colon: "[1;37m",
                    namespace: "[0;31m",
                    indent: "[1;37m",
                    title: "[1;32m",
                    parameter: "[1;34m"
                },
                dark_1: {
                    base: "[0;36m",
                    quote: "[0;37m",
                    number: "[0;32m",
                    string: "[0;31m",
                    function_body: "[0;30m",
                    nan: "[0;33m",
                    null: "[0;36m",
                    boolean: "[0;31m",
                    comma: "[0;37m",
                    undefined: "[0;32m",
                    bracket: "[0;36m",
                    brace: "[0;36m",
                    colon: "[0;37m",
                    namespace: "[0;31m",
                    indent: "[0;30m",
                    title: "[0;37m",
                    parameter: "[0;34m"
                },
                dark_2: {
                    base: "[1;36m",
                    quote: "[1;37m",
                    number: "[1;32m",
                    string: "[1;35m",
                    function_body: "[1;30m",
                    nan: "[1;33m",
                    null: "[1;36m",
                    boolean: "[1;31m",
                    comma: "[0;37m",
                    undefined: "[1;32m",
                    bracket: "[1;36m",
                    brace: "[1;36m",
                    colon: "[1;37m",
                    namespace: "[1;31m",
                    indent: "[1;30m",
                    title: "[1;37m",
                    parameter: "[1;34m"
                }
            }
        }
    };
});

if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define([ "require", "./proto_object", "./style_map" ], function(t, e, i) {
    var n = function() {
        var t;
        if (!(this instanceof (t = n))) return new (Array.prototype.slice.call(arguments).reduce(function(t, e) {
            return t = t.bind(t.prototype, e);
        }, t))();
        this._is_chained = true;
        this.option(arguments);
        this._is_chained = false;
        this._last_command = null;
        this.apply_arguments = [];
        this.formated = "";
        this.plain = "";
        this.plain_index = [];
        this.formated_index = [];
    };
    n.prototype = e;
    n.prototype.parent = n;
    e.style_map = i;
    e.remove_call = function() {
        var t = this.style_map[this.platform].format.length >= 3;
        if (t) this.apply_arguments.splice.apply(this.apply_arguments, arguments);
        var e = this.formated_index.splice.apply(this.formated_index, arguments)[0] || 0;
        var i = this.plain_index.splice.apply(this.plain_index, arguments)[0] || 0;
        var n = {
            formated: this.formated.substr(e),
            plain: this.plain.substr(i)
        };
        this.formated = this.formated.substr(0, e);
        this.plain = this.plain.substr(0, i);
        return n;
    };
    e.append_string = function(t, e) {
        if (this.plain.length === this.character_limit) return false; else if (!arguments.length) return true;
        var i = typeof e == "string" && e || String(e);
        var n = " <..output truncated>";
        n = this.character_limit > n.length * 3 && n || "";
        if (this.plain.length + i.length > this.character_limit - n.length) i = i.substr(0, this.character_limit - this.plain.length - n.length) + n;
        if (this.plain.length < this.character_limit) {
            this.plain_index.push(this.plain.length);
            this.plain += i;
            var r, s = this.style_map[this.platform].import_theme || this.platform;
            if (this.style_map[s].theme[this.theme + "_" + this.level]) r = this.theme + "_" + this.level; else if (this.style_map[this.platform].default_theme && this.style_map[s].theme[this.style_map[this.platform].default_theme]) r = this.style_map[s].default_theme; else r = Object.keys(this.style_map[s].theme)[0];
            if (!r) return new this.parent(this, {
                level: this.internal_level || this.level,
                log_title: "Bracket Print Error"
            }).log_true("The requested theme", r, "is not included.");
            if (this.style) {
                var o = this.style_map[this.platform].format.length >= 3;
                this.formated_index.push(this.formated.length);
                var a = t in this.style_map[s].theme[r] && this.style_map[s].theme[r][t] || this.style_map[s].theme[r].base || undefined;
                if (!a) return new this.parent(this, {
                    level: this.internal_level || this.level,
                    log_title: "Bracket Print Error"
                }).s("There is not a style value set for").a(s, ".", r, ".", a).s("or a").a(s, ".", r, ".base value.").log_true();
                this.formated += this.style_map[s].format(a, i, o && this.apply_arguments || undefined);
            } else {
                if (this.formated.length) {
                    var s = this.style_map[this.platform];
                    var l = s.theme[this.theme + "_" + this.level];
                    this.formated += (l && l.close_with || s && s.close_with || "") + i(l && l.open_with || s && s.open_with || "");
                } else this.formated += i;
            }
        } else {
            return false;
        }
        return true;
    };
    return n;
});