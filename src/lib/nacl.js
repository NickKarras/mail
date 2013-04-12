var nacl = (function(window, document) {
	var Module = {};
	var nacl_raw = Module;

	function ba(d) {
		throw d
	}
	var ga = void 0,
		la = !0,
		a = null,
		b = !1,
		g;
	try {
		this.Module = Module
	} catch (na) {
		this.Module = Module = {}
	}
	var oa = "object" === typeof process && "function" === typeof require,
		pa = "object" === typeof window,
		wa = "function" === typeof importScripts,
		xa = !pa && !oa && !wa;
	if (oa) {
		Module.print = (function(d) {
			process.stdout.write(d + "\n")
		});
		Module.printErr = (function(d) {
			process.stderr.write(d + "\n")
		});
		var ya = require("fs"),
			za = require("path");
		Module.read = (function(d) {
			var d = za.normalize(d),
				c = ya.readFileSync(d).toString();
			!c && d != za.resolve(d) && (d = path.join(__dirname, "..", "src", d), c = ya.readFileSync(d).toString());
			return c
		});
		Module.load = (function(d) {
			Da(read(d))
		});
		Module.arguments || (Module.arguments = process.argv.slice(2))
	}
	xa && (Module.print = print, "undefined" != typeof printErr && (Module.printErr = printErr), Module.read = "undefined" != typeof read ? read : (function(d) {
		snarf(d)
	}), Module.arguments || ("undefined" != typeof scriptArgs ? Module.arguments = scriptArgs : "undefined" != typeof arguments && (Module.arguments = arguments)));
	pa && !wa && (Module.print || (Module.print = (function(d) {
		console.log(d)
	})), Module.printErr || (Module.printErr = (function(d) {
		console.log(d)
	})));
	if (pa || wa) {
		Module.read = (function(d) {
			var c = new XMLHttpRequest;
			c.open("GET", d, b);
			c.send(a);
			return c.responseText
		}), Module.arguments || "undefined" != typeof arguments && (Module.arguments = arguments)
	}
	wa && (Module.print || (Module.print = (function() {})), Module.load = importScripts);
	!wa && !pa && !oa && !xa && ba("Unknown runtime environment. Where are we?");

	function Da(d) {
		eval.call(a, d)
	}
	"undefined" == !Module.load && Module.read && (Module.load = (function(d) {
		Da(Module.read(d))
	}));
	Module.print || (Module.print = (function() {}));
	Module.printErr || (Module.printErr = Module.print);
	Module.arguments || (Module.arguments = []);
	Module.print = Module.print;
	Module.u = Module.printErr;
	Module.preRun || (Module.preRun = []);
	Module.postRun || (Module.postRun = []);
	var Ma;

	function Oa() {
		var d = [],
			c = 0;
		this.qa = (function(e) {
			e &= 255;
			c && (d.push(e), c--);
			if (0 == d.length) {
				if (128 > e) {
					return String.fromCharCode(e)
				}
				d.push(e);
				c = 191 < e && 224 > e ? 1 : 2;
				return ""
			}
			if (0 < c) {
				return ""
			}
			var e = d[0],
				f = d[1],
				h = d[2],
				e = 191 < e && 224 > e ? String.fromCharCode((e & 31) << 6 | f & 63) : String.fromCharCode((e & 15) << 12 | (f & 63) << 6 | h & 63);
			d.length = 0;
			return e
		});
		this.Ha = (function(c) {
			for (var c = unescape(encodeURIComponent(c)), d = [], h = 0; h < c.length; h++) {
				d.push(c.charCodeAt(h))
			}
			return d
		})
	}

	function Pa(d) {
		var c = n;
		n = n + d | 0;
		n = n + 3 >> 2 << 2;
		return c
	}

	function Qa(d) {
		var c = Ra;
		Ra = Ra + d | 0;
		Ra = Ra + 3 >> 2 << 2;
		if (Ra >= Sa) {
			for (; Sa <= Ra;) {
				Sa = 2 * Sa + 4095 >> 12 << 12
			}
			var d = s,
				e = new ArrayBuffer(Sa);
			Module.HEAP8 = s = new Int8Array(e);
			Module.HEAP16 = Ta = new Int16Array(e);
			Module.HEAP32 = D = new Int32Array(e);
			Module.HEAPU8 = kc = new Uint8Array(e);
			Module.HEAPU16 = pd = new Uint16Array(e);
			Module.HEAPU32 = ij = new Uint32Array(e);
			Module.HEAPF32 = jj = new Float32Array(e);
			Module.HEAPF64 = kj = new Float64Array(e);
			s.set(d)
		}
		return c
	}
	var lj = 4,
		mj = {}, rj, sj;

	function vj(d) {
		Module.print(d + ":\n" + Error().stack);
		ba("Assertion: " + d)
	}

	function H(d, c) {
		d || vj("Assertion failed: " + c)
	}
	var wj = this;
	Module.ccall = (function(d, c, e, f) {
		return xj(yj(d), c, e, f)
	});

	function yj(d) {
		try {
			var c = eval("_" + d)
		} catch (e) {
			try {
				c = wj.Module["_" + d]
			} catch (f) {}
		}
		H(c, "Cannot call unknown function " + d + " (perhaps LLVM optimizations or closure removed it?)");
		return c
	}

	function xj(d, c, e, f) {
		function h(c, d) {
			if ("string" == d) {
				if (c === a || c === ga || 0 === c) {
					return 0
				}
				i || (i = n);
				var e = Pa(c.length + 1);
				Oj(c, e);
				return e
			}
			return "array" == d ? (i || (i = n), e = Pa(c.length), Pj(c, e), e) : c
		}
		var i = 0,
			j = 0,
			f = f ? f.map((function(c) {
				return h(c, e[j++])
			})) : [];
		d = d.apply(a, f);
		"string" == c ? c = Qj(d) : (H("array" != c), c = d);
		i && (n = i);
		return c
	}
	Module.cwrap = (function(d, c, e) {
		var f = yj(d);
		return (function() {
			return xj(f, c, e, Array.prototype.slice.call(arguments))
		})
	});

	function fk(d, c, e) {
		e = e || "i8";
		"*" === e.charAt(e.length - 1) && (e = "i32");
		switch (e) {
			case "i1":
				s[d] = c;
				break;
			case "i8":
				s[d] = c;
				break;
			case "i16":
				Ta[d >> 1] = c;
				break;
			case "i32":
				D[d >> 2] = c;
				break;
			case "i64":
				rj = [c >>> 0, Math.min(Math.floor(c / 4294967296), 4294967295)];
				D[d >> 2] = rj[0];
				D[d + 4 >> 2] = rj[1];
				break;
			case "float":
				jj[d >> 2] = c;
				break;
			case "double":
				kj[I >> 3] = c;
				D[d >> 2] = D[I >> 2];
				D[d + 4 >> 2] = D[I + 4 >> 2];
				break;
			default:
				vj("invalid type for setValue: " + e)
		}
	}
	Module.setValue = fk;
	Module.getValue = (function(d, c) {
		c = c || "i8";
		"*" === c.charAt(c.length - 1) && (c = "i32");
		switch (c) {
			case "i1":
				return s[d];
			case "i8":
				return s[d];
			case "i16":
				return Ta[d >> 1];
			case "i32":
				return D[d >> 2];
			case "i64":
				return D[d >> 2];
			case "float":
				return jj[d >> 2];
			case "double":
				return D[I >> 2] = D[d >> 2], D[I + 4 >> 2] = D[d + 4 >> 2], kj[I >> 3];
			default:
				vj("invalid type for setValue: " + c)
		}
		return a
	});
	var gk = 2,
		K = 3;
	Module.ALLOC_NORMAL = 0;
	Module.ALLOC_STACK = 1;
	Module.ALLOC_STATIC = gk;
	Module.ALLOC_NONE = K;

	function M(d, c, e, f) {
		var h, i;
		"number" === typeof d ? (h = la, i = d) : (h = b, i = d.length);
		var j = "string" === typeof c ? c : a,
			e = e == K ? f : [hk, Pa, Qa][e === ga ? gk : e](Math.max(i, j ? 1 : c.length));
		if (h) {
			return ik(e, 0, i), e
		}
		for (f = 0; f < i;) {
			var l = d[f];
			"function" === typeof l && (l = mj.Sa(l));
			h = j || c[f];
			0 === h ? f++ : ("i64" == h && (h = "i32"), fk(e + f, l, h), 1 == lj ? h = 1 : (l = {
				"%i1": 1,
				"%i8": 1,
				"%i16": 2,
				"%i32": 4,
				"%i64": 8,
				"%float": 4,
				"%double": 8
			}["%" + h], l || ("*" == h.charAt(h.length - 1) ? l = lj : "i" == h[0] && (h = parseInt(h.substr(1)), H(0 == h % 8), l = h / 8)), h = l), f += h)
		}
		return e
	}
	Module.allocate = M;

	function Qj(d, c) {
		for (var e = new Oa, f = "undefined" == typeof c, h = "", i = 0, j;;) {
			j = kc[d + i];
			if (f && 0 == j) {
				break
			}
			h += e.qa(j);
			i += 1;
			if (!f && i == c) {
				break
			}
		}
		return h
	}
	Module.Pointer_stringify = Qj;
	Module.Array_stringify = (function(d) {
		for (var c = "", e = 0; e < d.length; e++) {
			c += String.fromCharCode(d[e])
		}
		return c
	});
	var tk = 4096,
		s, kc, Ta, pd, D, ij, jj, kj, n, Ra, uk = Module.TOTAL_STACK || 5242880,
		Sa = Module.TOTAL_MEMORY || 16777216;
	H( !! Int32Array && !! Float64Array && !! (new Int32Array(1)).subarray && !! (new Int32Array(1)).set, "Cannot fallback to non-typed array case: Code is too specialized");
	var vk = new ArrayBuffer(Sa);
	s = new Int8Array(vk);
	Ta = new Int16Array(vk);
	D = new Int32Array(vk);
	kc = new Uint8Array(vk);
	pd = new Uint16Array(vk);
	ij = new Uint32Array(vk);
	jj = new Float32Array(vk);
	kj = new Float64Array(vk);
	D[0] = 255;
	H(255 === kc[0] && 0 === kc[3], "Typed arrays 2 must be run on a little-endian system");
	Module.HEAP = ga;
	Module.HEAP8 = s;
	Module.HEAP16 = Ta;
	Module.HEAP32 = D;
	Module.HEAPU8 = kc;
	Module.HEAPU16 = pd;
	Module.HEAPU32 = ij;
	Module.HEAPF32 = jj;
	Module.HEAPF64 = kj;
	n = 4 * Math.ceil(.25);
	var I, wk = M(12, "i8", 1);
	I = 8 * Math.ceil(wk / 8);
	H(0 == I % 8);
	Ra = uk;
	H(Ra < Sa);
	M(xk("(null)"), "i8", 1);

	function yk(d) {
		for (; 0 < d.length;) {
			var c = d.shift(),
				e = c.T;
			if ("number" === typeof e) {
				if (c.O === ga) {
					zk[e]()
				} else {
					(c = [c.O]) && c.length ? zk[e].apply(a, c) : zk[e]()
				}
			} else {
				e(c.O === ga ? a : c.O)
			}
		}
	}
	var Ak = [],
		Bk = [],
		Ck = [];
	Module.String_len = (function(d) {
		for (var c = d; s[c++];) {}
		return c - d - 1
	});

	function xk(d, c, e) {
		d = (new Oa).Ha(d);
		e && (d.length = e);
		c || d.push(0);
		return d
	}
	Module.intArrayFromString = xk;
	Module.intArrayToString = (function(d) {
		for (var c = [], e = 0; e < d.length; e++) {
			var f = d[e];
			255 < f && (f &= 255);
			c.push(String.fromCharCode(f))
		}
		return c.join("")
	});

	function Oj(d, c, e) {
		d = xk(d, e);
		for (e = 0; e < d.length;) {
			s[c + e] = d[e], e += 1
		}
	}
	Module.writeStringToMemory = Oj;

	function Pj(d, c) {
		for (var e = 0; e < d.length; e++) {
			s[c + e] = d[e]
		}
	}
	Module.writeArrayToMemory = Pj;
	var Dk = 0,
		Ek = {}, Gk = b,
		Hk = a;

	function Ik(d) {
		Dk++;
		Module.monitorRunDependencies && Module.monitorRunDependencies(Dk);
		d ? (H(!Ek[d]), Ek[d] = 1, Hk === a && "undefined" !== typeof setInterval && (Hk = setInterval((function() {
			var c = b,
				d;
			for (d in Ek) {
				c || (c = la, Module.u("still waiting on run dependencies:")), Module.u("dependency: " + d)
			}
			c && Module.u("(end of list)")
		}), 6e3))) : Module.u("warning: run dependency added without ID")
	}
	Module.addRunDependency = Ik;

	function Jk(d) {
		Dk--;
		Module.monitorRunDependencies && Module.monitorRunDependencies(Dk);
		d ? (H(Ek[d]), delete Ek[d]) : Module.u("warning: run dependency removed without ID");
		0 == Dk && (Hk !== a && (clearInterval(Hk), Hk = a), !Gk && Kk && Lk())
	}
	Module.removeRunDependency = Jk;
	Module.preloadedImages = {};
	Module.preloadedAudios = {};
	H(Ra == uk);
	H(uk == uk);
	Ra += 2156;
	H(Ra < Sa);
	var Mk, Nk;
	M([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107], "i8", K, 5242880);
	M([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107], "i8", K, 5242896);
	M([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107], "i8", K, 5242912);
	M([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107], "i8", K, 5242928);
	M([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107], "i8", K, 5242944);
	M([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107], "i8", K, 5242960);
	M([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107], "i8", K, 5242976);
	M([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107], "i8", K, 5242992);
	M([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107], "i8", K, 5243008);
	M(16, "i8", K, 5243024);
	M([27, 0, 0, 0, 19, 0, 0, 0, 44, 0, 0, 0, 10, 0, 0, 0, 163, 0, 0, 0, 229, 0, 0, 0, 156, 0, 0, 0, 237, 0, 0, 0, 167, 0, 0, 0, 41, 0, 0, 0, 99, 0, 0, 0, 8, 0, 0, 0, 93, 0, 0, 0, 33, 0, 0, 0, 6, 0, 0, 0, 33, 0, 0, 0, 235, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 15, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], K, 5243040);
	M(24, "i8", K, 5243172);
	M([19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], K, 5243196);
	M([5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 252, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], K, 5243324);
	M([237, 0, 0, 0, 211, 0, 0, 0, 245, 0, 0, 0, 92, 0, 0, 0, 26, 0, 0, 0, 99, 0, 0, 0, 18, 0, 0, 0, 88, 0, 0, 0, 214, 0, 0, 0, 156, 0, 0, 0, 247, 0, 0, 0, 162, 0, 0, 0, 222, 0, 0, 0, 249, 0, 0, 0, 222, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], K, 5243392);
	M([106, 9, 230, 103, 243, 188, 201, 8, 187, 103, 174, 133, 132, 202, 167, 59, 60, 110, 243, 114, 254, 148, 248, 43, 165, 79, 245, 58, 95, 29, 54, 241, 81, 14, 82, 127, 173, 230, 130, 209, 155, 5, 104, 140, 43, 62, 108, 31, 31, 131, 217, 171, 251, 65, 189, 107, 91, 224, 205, 25, 19, 126, 33, 121], "i8", K, 5243520);
	M([106, 9, 230, 103, 187, 103, 174, 133, 60, 110, 243, 114, 165, 79, 245, 58, 81, 14, 82, 127, 155, 5, 104, 140, 31, 131, 217, 171, 91, 224, 205, 25], "i8", K, 5243584);
	M([106, 9, 230, 103, 243, 188, 201, 8, 187, 103, 174, 133, 132, 202, 167, 59, 60, 110, 243, 114, 254, 148, 248, 43, 165, 79, 245, 58, 95, 29, 54, 241, 81, 14, 82, 127, 173, 230, 130, 209, 155, 5, 104, 140, 43, 62, 108, 31, 31, 131, 217, 171, 251, 65, 189, 107, 91, 224, 205, 25, 19, 126, 33, 121], "i8", K, 5243616);
	M([106, 9, 230, 103, 187, 103, 174, 133, 60, 110, 243, 114, 165, 79, 245, 58, 81, 14, 82, 127, 155, 5, 104, 140, 31, 131, 217, 171, 91, 224, 205, 25], "i8", K, 5243680);
	M([246, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 63], "i8", K, 5243712);
	M([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "i8", K, 5243744);
	M([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "i8", K, 5243776);
	M(32, "i8", K, 5243808);
	M(32, "i8", K, 5243840);
	M([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "i8", K, 5243872);
	M([88, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102], "i8", K, 5243904);
	M([26, 213, 37, 143, 96, 45, 86, 201, 178, 167, 37, 149, 96, 199, 44, 105, 92, 220, 214, 253, 49, 226, 164, 192, 254, 83, 110, 205, 211, 54, 105, 33], "i8", K, 5243936);
	M([163, 221, 183, 165, 179, 138, 222, 109, 245, 82, 81, 119, 128, 159, 240, 32, 125, 227, 171, 100, 142, 78, 234, 102, 101, 118, 139, 215, 15, 95, 135, 103], "i8", K, 5243968);
	M([163, 120, 89, 19, 202, 77, 235, 117, 171, 216, 65, 65, 77, 10, 112, 0, 152, 232, 121, 119, 121, 64, 199, 140, 115, 254, 111, 43, 238, 108, 3, 82], "i8", K, 5244e3);
	M([3, 2, 1, 0, 7, 6, 5, 4, 11, 10, 9, 8, 15, 14, 13, 12], "i8", K, 5244032);
	M([15, 10, 5, 0, 14, 9, 4, 3, 13, 8, 7, 2, 12, 11, 6, 1], "i8", K, 5244048);
	M([1, 2, 3, 0, 6, 7, 4, 5, 11, 8, 9, 10, 12, 13, 14, 15], "i8", K, 5244064);
	M([0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8], "i8", K, 5244080);
	M([12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3], "i8", K, 5244096);
	M([15, 11, 7, 3, 14, 10, 6, 2, 13, 9, 5, 1, 12, 8, 4, 0], "i8", K, 5244112);
	M([3, 3, 3, 3, 7, 7, 7, 7, 11, 11, 11, 11, 15, 15, 15, 15], "i8", K, 5244128);
	M([252645135, 0, 0, 0, 252645135, 0, 0, 0, 252645135, 0, 0, 0, 252645135, 0, 0, 0], ["i64", 0, 0, 0, "i32", 0, 0, 0, "i64", 0, 0, 0, "i32", 0, 0, 0], K, 5244144);
	M([858993459, 0, 0, 0, 858993459, 0, 0, 0, 858993459, 0, 0, 0, 858993459, 0, 0, 0], ["i64", 0, 0, 0, "i32", 0, 0, 0, "i64", 0, 0, 0, "i32", 0, 0, 0], K, 5244160);
	M([1431655765, 0, 0, 0, 1431655765, 0, 0, 0, 1431655765, 0, 0, 0, 1431655765, 0, 0, 0], ["i64", 0, 0, 0, "i32", 0, 0, 0, "i64", 0, 0, 0, "i32", 0, 0, 0], K, 5244176);
	M([253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 15], "i8", K, 5244192);
	M([254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 15], "i8", K, 5244224);
	M([251, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 31], "i8", K, 5244256);
	M([9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "i8", K, 5244288);
	M([115, 116, 100, 58, 58, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0], "i8", K, 5244320);
	M([105, 110, 32, 117, 115, 101, 32, 98, 121, 116, 101, 115, 32, 32, 32, 32, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", K, 5244336);
	M([98, 97, 100, 95, 97, 114, 114, 97, 121, 95, 110, 101, 119, 95, 108, 101, 110, 103, 116, 104, 0], "i8", K, 5244364);
	M([115, 121, 115, 116, 101, 109, 32, 98, 121, 116, 101, 115, 32, 32, 32, 32, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", K, 5244388);
	M([109, 97, 120, 32, 115, 121, 115, 116, 101, 109, 32, 98, 121, 116, 101, 115, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", K, 5244416);
	M(468, "i8", K, 5244444);
	M([0, 0, 0, 0, 5245004, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0], K, 5244912);
	M(1, "i8", K, 5244932);
	M([0, 0, 0, 0, 5245016, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0], K, 5244936);
	M(1, "i8", K, 5244956);
	M([83, 116, 57, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0], "i8", K, 5244960);
	M([83, 116, 50, 48, 98, 97, 100, 95, 97, 114, 114, 97, 121, 95, 110, 101, 119, 95, 108, 101, 110, 103, 116, 104, 0], "i8", K, 5244976);
	M(12, "i8", K, 5245004);
	M([0, 0, 0, 0, 0, 0, 0, 0, 5245004, 0, 0, 0], ["*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0], K, 5245016);
	M(1, "i8", K, 5245028);
	M(4, "i8", K, 5245032);
	D[1311230] = 4;
	D[1311231] = 10;
	D[1311232] = 6;
	D[1311236] = 12;
	D[1311237] = 2;
	D[1311238] = 8;
	Nk = M([2, 0, 0, 0], ["i8*", 0, 0, 0], gk);
	D[1311251] = Nk + 8 | 0;
	D[1311252] = 5244960;
	D[1311253] = ga;
	D[1311254] = Nk + 8 | 0;
	D[1311255] = 5244976;
	var Ok = {
		crypto: a
	};

	function Pk(d, c, e) {
		e && ba({
			message: "_randombytes count overflow"
		});
		kc.set(Ok.crypto.randomBytes(c), d);
		return 0
	}
	Module._randombytes = Pk;

	function ik(d, c, e) {
		if (20 <= e) {
			for (e = d + e; d % 4;) {
				s[d++] = c
			}
			0 > c && (c += 256);
			for (var d = d >> 2, f = e >> 2, h = c | c << 8 | c << 16 | c << 24; d < f;) {
				D[d++] = h
			}
			for (d <<= 2; d < e;) {
				s[d++] = c
			}
		} else {
			for (; e--;) {
				s[d++] = c
			}
		}
	}

	function O() {
		ba("abort() at " + Error().stack)
	}
	var Qk = 22;

	function Rk(d) {
		Sk || (Sk = M([0], "i32", gk));
		D[Sk >> 2] = d
	}
	var Sk, Tk = M(1, "i32*", 1),
		Uk = M(1, "i32*", 1);
	Mk = M(1, "i32*", 1);
	var Vk = M(1, "i32*", 1),
		Wk = 2,
		Xk = [a],
		Yk = la;

	function Zk(d, c) {
		if ("string" !== typeof d) {
			return a
		}
		c === ga && (c = "/");
		d && "/" == d[0] && (c = "");
		for (var e = (c + "/" + d).split("/").reverse(), f = [""]; e.length;) {
			var h = e.pop();
			"" == h || "." == h || (".." == h ? 1 < f.length && f.pop() : f.push(h))
		}
		return 1 == f.length ? "/" : f.join("/")
	}

	function $k(d, c, e) {
		var f = {
			Ea: b,
			S: b,
			error: 0,
			name: a,
			path: a,
			object: a,
			na: b,
			pa: a,
			oa: a
		}, d = Zk(d);
		if ("/" == d) {
			f.Ea = la, f.S = f.na = la, f.name = "/", f.path = f.pa = "/", f.object = f.oa = al
		} else {
			if (d !== a) {
				for (var e = e || 0, d = d.slice(1).split("/"), h = al, i = [""]; d.length;) {
					1 == d.length && h.B && (f.na = la, f.pa = 1 == i.length ? "/" : i.join("/"), f.oa = h, f.name = d[0]);
					var j = d.shift();
					if (h.B) {
						if (h.ra) {
							if (!h.i.hasOwnProperty(j)) {
								f.error = 2;
								break
							}
						} else {
							f.error = 13;
							break
						}
					} else {
						f.error = 20;
						break
					}
					h = h.i[j];
					if (h.link && !(c && 0 == d.length)) {
						if (40 < e) {
							f.error = 40;
							break
						}
						f = Zk(h.link, i.join("/"));
						f = $k([f].concat(d).join("/"), c, e + 1);
						break
					}
					i.push(j);
					0 == d.length && (f.S = la, f.path = i.join("/"), f.object = h)
				}
			}
		}
		return f
	}

	function bl(d) {
		cl();
		d = $k(d, ga);
		if (d.S) {
			return d.object
		}
		Rk(d.error);
		return a
	}

	function dl(d, c, e, f, h) {
		d || (d = "/");
		"string" === typeof d && (d = bl(d));
		d || (Rk(13), ba(Error("Parent path must exist.")));
		d.B || (Rk(20), ba(Error("Parent must be a folder.")));
		!d.write && !Yk && (Rk(13), ba(Error("Parent folder must be writeable.")));
		if (!c || "." == c || ".." == c) {
			Rk(2), ba(Error("Name must not be empty."))
		}
		d.i.hasOwnProperty(c) && (Rk(17), ba(Error("Can't overwrite object.")));
		d.i[c] = {
			ra: f === ga ? la : f,
			write: h === ga ? b : h,
			timestamp: Date.now(),
			Da: Wk++
		};
		for (var i in e) {
			e.hasOwnProperty(i) && (d.i[c][i] = e[i])
		}
		return d.i[c]
	}

	function el(d, c, e, f) {
		return dl(d, c, {
			B: la,
			w: b,
			i: {}
		}, e, f)
	}

	function fl(d, c, e, f) {
		d = bl(d);
		d === a && ba(Error("Invalid parent."));
		for (c = c.split("/").reverse(); c.length;) {
			var h = c.pop();
			h && (d.i.hasOwnProperty(h) || el(d, h, e, f), d = d.i[h])
		}
		return d
	}

	function gl(d, c, e, f, h) {
		e.B = b;
		return dl(d, c, e, f, h)
	}

	function hl(d, c, e, f, h) {
		if ("string" === typeof e) {
			for (var i = Array(e.length), j = 0, l = e.length; j < l; ++j) {
				i[j] = e.charCodeAt(j)
			}
			e = i
		}
		e = {
			w: b,
			i: e.subarray ? e.subarray(0) : e
		};
		return gl(d, c, e, f, h)
	}

	function il(d, c, e, f) {
		!e && !f && ba(Error("A device must have at least one callback defined."));
		return gl(d, c, {
			w: la,
			input: e,
			H: f
		}, Boolean(e), Boolean(f))
	}

	function cl() {
		al || (al = {
			ra: la,
			write: la,
			B: la,
			w: b,
			timestamp: Date.now(),
			Da: 1,
			i: {}
		})
	}
	var jl, al;

	function kl() {
		switch (8) {
			case 8:
				return tk;
			case 54:
				;
			case 56:
				;
			case 21:
				;
			case 61:
				;
			case 63:
				;
			case 22:
				;
			case 67:
				;
			case 23:
				;
			case 24:
				;
			case 25:
				;
			case 26:
				;
			case 27:
				;
			case 69:
				;
			case 28:
				;
			case 101:
				;
			case 70:
				;
			case 71:
				;
			case 29:
				;
			case 30:
				;
			case 199:
				;
			case 75:
				;
			case 76:
				;
			case 32:
				;
			case 43:
				;
			case 44:
				;
			case 80:
				;
			case 46:
				;
			case 47:
				;
			case 45:
				;
			case 48:
				;
			case 49:
				;
			case 42:
				;
			case 82:
				;
			case 33:
				;
			case 7:
				;
			case 108:
				;
			case 109:
				;
			case 107:
				;
			case 112:
				;
			case 119:
				;
			case 121:
				return 200809;
			case 13:
				;
			case 104:
				;
			case 94:
				;
			case 95:
				;
			case 34:
				;
			case 35:
				;
			case 77:
				;
			case 81:
				;
			case 83:
				;
			case 84:
				;
			case 85:
				;
			case 86:
				;
			case 87:
				;
			case 88:
				;
			case 89:
				;
			case 90:
				;
			case 91:
				;
			case 94:
				;
			case 95:
				;
			case 110:
				;
			case 111:
				;
			case 113:
				;
			case 114:
				;
			case 115:
				;
			case 116:
				;
			case 117:
				;
			case 118:
				;
			case 120:
				;
			case 40:
				;
			case 16:
				;
			case 79:
				;
			case 19:
				return -1;
			case 92:
				;
			case 93:
				;
			case 5:
				;
			case 72:
				;
			case 6:
				;
			case 74:
				;
			case 92:
				;
			case 93:
				;
			case 96:
				;
			case 97:
				;
			case 98:
				;
			case 99:
				;
			case 102:
				;
			case 103:
				;
			case 105:
				return 1;
			case 38:
				;
			case 66:
				;
			case 50:
				;
			case 51:
				;
			case 4:
				return 1024;
			case 15:
				;
			case 64:
				;
			case 41:
				return 32;
			case 55:
				;
			case 37:
				;
			case 17:
				return 2147483647;
			case 18:
				;
			case 1:
				return 47839;
			case 59:
				;
			case 57:
				return 99;
			case 68:
				;
			case 58:
				return 2048;
			case 0:
				return 2097152;
			case 3:
				return 65536;
			case 14:
				return 32768;
			case 73:
				return 32767;
			case 39:
				return 16384;
			case 60:
				return 1e3;
			case 106:
				return 700;
			case 52:
				return 256;
			case 62:
				return 255;
			case 2:
				return 100;
			case 65:
				return 64;
			case 36:
				return 20;
			case 100:
				return 16;
			case 20:
				return 6;
			case 53:
				return 4
		}
		Rk(Qk);
		return -1
	}

	function ll(d) {
		ml || (Ra = Ra + 4095 >> 12 << 12, ml = la);
		var c = Ra;
		0 != d && Qa(d);
		return c
	}
	var ml, nl = b,
		ol, pl, ql, rl;
	Module.RandomBytes = Ok;
	Ak.unshift({
		T: (function() {
			if (!Module.noFSInit && !jl) {
				var d, c, e, f = (function(d) {
					d === a || 10 === d ? (c.I(c.buffer.join("")), c.buffer = []) : c.buffer.push(l.qa(d))
				});
				H(!jl, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
				jl = la;
				cl();
				d = d || Module.stdin;
				c = c || Module.stdout;
				e = e || Module.stderr;
				var h = la,
					i = la,
					j = la;
				d || (h = b, d = (function() {
					if (!d.P || !d.P.length) {
						var c;
						"undefined" != typeof window && "function" == typeof window.prompt ? (c = window.prompt("Input: "), c === a && (c = String.fromCharCode(0))) : "function" == typeof readline && (c = readline());
						c || (c = "");
						d.P = xk(c + "\n", la)
					}
					return d.P.shift()
				}));
				var l = new Oa;
				c || (i = b, c = f);
				c.I || (c.I = Module.print);
				c.buffer || (c.buffer = []);
				e || (j = b, e = f);
				e.I || (e.I = Module.print);
				e.buffer || (e.buffer = []);
				try {
					el("/", "tmp", la, la)
				} catch (p) {}
				var f = el("/", "dev", la, la),
					q = il(f, "stdin", d),
					m = il(f, "stdout", a, c);
				e = il(f, "stderr", a, e);
				il(f, "tty", d, c);
				Xk[1] = {
					path: "/dev/stdin",
					object: q,
					position: 0,
					ha: la,
					ja: b,
					fa: b,
					ia: !h,
					error: b,
					da: b,
					sa: []
				};
				Xk[2] = {
					path: "/dev/stdout",
					object: m,
					position: 0,
					ha: b,
					ja: la,
					fa: b,
					ia: !i,
					error: b,
					da: b,
					sa: []
				};
				Xk[3] = {
					path: "/dev/stderr",
					object: e,
					position: 0,
					ha: b,
					ja: la,
					fa: b,
					ia: !j,
					error: b,
					da: b,
					sa: []
				};
				H(128 > Math.max(Tk, Uk, Mk));
				D[Tk >> 2] = 1;
				D[Uk >> 2] = 2;
				D[Mk >> 2] = 3;
				fl("/", "dev/shm/tmp", la, la);
				for (h = Xk.length; h < Math.max(Tk, Uk, Mk) + 4; h++) {
					Xk[h] = a
				}
				Xk[Tk] = Xk[1];
				Xk[Uk] = Xk[2];
				Xk[Mk] = Xk[3];
				M([M([0, 0, 0, 0, Tk, 0, 0, 0, Uk, 0, 0, 0, Mk, 0, 0, 0], "void*", gk)], "void*", K, Vk)
			}
		})
	});
	Bk.push({
		T: (function() {
			Yk = b
		})
	});
	Ck.push({
		T: (function() {
			jl && (Xk[2] && 0 < Xk[2].object.H.buffer.length && Xk[2].object.H(10), Xk[3] && 0 < Xk[3].object.H.buffer.length && Xk[3].object.H(10))
		})
	});
	Module.FS_createFolder = el;
	Module.FS_createPath = fl;
	Module.FS_createDataFile = hl;
	Module.FS_createPreloadedFile = (function(d, c, e, f, h, i, j, l) {
		function p(c) {
			return {
				jpg: "image/jpeg",
				png: "image/png",
				bmp: "image/bmp",
				ogg: "audio/ogg",
				wav: "audio/wav",
				mp3: "audio/mpeg"
			}[c.substr(-3)]
		}

		function q(e) {
			function m(e) {
				l || hl(d, c, e, f, h);
				i && i();
				Jk("cp " + k)
			}
			var p = b;
			Module.preloadPlugins.forEach((function(c) {
				!p && c.canHandle(k) && (c.handle(e, k, m, (function() {
					j && j();
					Jk("cp " + k)
				})), p = la)
			}));
			p || m(e)
		}
		if (!ol) {
			ol = la;
			try {
				new Blob, pl = la
			} catch (m) {
				pl = b, console.log("warning: no blob constructor, cannot create blobs with mimetypes")
			}
			ql = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : !pl ? console.log("warning: no BlobBuilder") : a;
			rl = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : console.log("warning: cannot create object URLs");
			Module.preloadPlugins || (Module.preloadPlugins = []);
			Module.preloadPlugins.push({
				canHandle: (function(c) {
					return c.substr(-4) in {
						".jpg": 1,
						".png": 1,
						".bmp": 1
					}
				}),
				handle: (function(c, d, e, f) {
					var i = a;
					if (pl) {
						try {
							i = new Blob([c], {
								type: p(d)
							})
						} catch (h) {
							var j = "Blob constructor present but fails: " + h + "; falling back to blob builder";
							Ma || (Ma = {});
							Ma[j] || (Ma[j] = 1, Module.u(j))
						}
					}
					i || (i = new ql, i.append((new Uint8Array(c)).buffer), i = i.getBlob());
					var k = rl.createObjectURL(i);
					H("string" == typeof k, "createObjectURL must return a url as a string");
					var l = new Image;
					l.onload = (function() {
						H(l.complete, "Image " + d + " could not be decoded");
						var f = document.createElement("canvas");
						f.width = l.width;
						f.height = l.height;
						f.getContext("2d").drawImage(l, 0, 0);
						Module.preloadedImages[d] = f;
						rl.revokeObjectURL(k);
						e && e(c)
					});
					l.onerror = (function() {
						console.log("Image " + k + " could not be decoded");
						f && f()
					});
					l.src = k
				})
			});
			Module.preloadPlugins.push({
				canHandle: (function(c) {
					return c.substr(-4) in {
						".ogg": 1,
						".wav": 1,
						".mp3": 1
					}
				}),
				handle: (function(c, d, e, f) {
					function i(f) {
						j || (j = la, Module.preloadedAudios[d] = f, e && e(c))
					}

					function h() {
						j || (j = la, Module.preloadedAudios[d] = new Audio, f && f())
					}
					var j = b;
					if (pl) {
						try {
							var k = new Blob([c], {
								type: p(d)
							})
						} catch (l) {
							return h()
						}
						k = rl.createObjectURL(k);
						H("string" == typeof k, "createObjectURL must return a url as a string");
						var m = new Audio;
						m.addEventListener("canplaythrough", (function() {
							i(m)
						}), b);
						m.onerror = (function() {
							if (!j) {
								console.log("warning: browser could not fully decode audio " + d + ", trying slower base64 approach");
								for (var e = "", f = 0, h = 0, k = 0; k < c.length; k++) {
									f = f << 8 | c[k];
									for (h += 8; 6 <= h;) {
										var l = f >> h - 6 & 63,
											h = h - 6,
											e = e + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [l]
									}
								}
								2 == h ? (e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(f & 3) << 4], e += "==") : 4 == h && (e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(f & 15) << 2], e += "=");
								m.src = "data:audio/x-" + d.substr(-3) + ";base64," + e;
								i(m)
							}
						});
						m.src = k;
						setTimeout((function() {
							i(m)
						}), 1e4)
					} else {
						return h()
					}
				})
			})
		}
		for (var k, r = [d, c], t = r[0], v = 1; v < r.length; v++) {
			"/" != t[t.length - 1] && (t += "/"), t += r[v]
		}
		"/" == t[0] && (t = t.substr(1));
		k = t;
		Ik("cp " + k);
		if ("string" == typeof e) {
			var u = j,
				w = (function() {
					u ? u() : ba('Loading data file "' + e + '" failed.')
				}),
				x = new XMLHttpRequest;
			x.open("GET", e, la);
			x.responseType = "arraybuffer";
			x.onload = (function() {
				if (200 == x.status) {
					var c = x.response;
					H(c, 'Loading data file "' + e + '" failed (no arrayBuffer).');
					c = new Uint8Array(c);
					q(c);
					Jk("al " + e)
				} else {
					w()
				}
			});
			x.onerror = w;
			x.send(a);
			Ik("al " + e)
		} else {
			q(e)
		}
	});
	Module.FS_createLazyFile = (function(d, c, e, f, h) {
		if ("undefined" !== typeof XMLHttpRequest) {
			wa || ba("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
			var i = (function(c, d) {
				this.length = d;
				this.A = c;
				this.C = []
			});
			i.prototype.La = (function(c) {
				this.Ta = c
			});
			var j = new XMLHttpRequest;
			j.open("HEAD", e, b);
			j.send(a);
			200 <= j.status && 300 > j.status || 304 === j.status || ba(Error("Couldn't load " + e + ". Status: " + j.status));
			var l = Number(j.getResponseHeader("Content-length")),
				p, q = 1048576;
			if (!((p = j.getResponseHeader("Accept-Ranges")) && "bytes" === p)) {
				q = l
			}
			var m = new i(q, l);
			m.La((function(c) {
				var d = c * m.A,
					f = (c + 1) * m.A - 1,
					f = Math.min(f, l - 1);
				if ("undefined" === typeof m.C[c]) {
					var i = m.C;
					d > f && ba(Error("invalid range (" + d + ", " + f + ") or no bytes requested!"));
					f > l - 1 && ba(Error("only " + l + " bytes available! programmer error!"));
					var h = new XMLHttpRequest;
					h.open("GET", e, b);
					l !== q && h.setRequestHeader("Range", "bytes=" + d + "-" + f);
					"undefined" != typeof Uint8Array && (h.responseType = "arraybuffer");
					h.overrideMimeType && h.overrideMimeType("text/plain; charset=x-user-defined");
					h.send(a);
					200 <= h.status && 300 > h.status || 304 === h.status || ba(Error("Couldn't load " + e + ". Status: " + h.status));
					d = h.response !== ga ? new Uint8Array(h.response || []) : xk(h.responseText || "", la);
					i[c] = d
				}
				"undefined" === typeof m.C[c] && ba(Error("doXHR failed!"));
				return m.C[c]
			}));
			i = {
				w: b,
				i: m
			}
		} else {
			i = {
				w: b,
				url: e
			}
		}
		return gl(d, c, i, f, h)
	});
	Module.FS_createLink = (function(d, c, e, f, h) {
		return gl(d, c, {
			w: b,
			link: e
		}, f, h)
	});
	Module.FS_createDevice = il;
	Rk(0);
	M(12, "void*", gk);
	Module.requestFullScreen = (function() {
		function d() {}

		function c() {
			var c = b;
			if ((document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.fullScreenElement || document.fullscreenElement) === e) {
				e.Ka = e.requestPointerLock || e.mozRequestPointerLock || e.webkitRequestPointerLock, e.Ka(), c = la
			}
			if (Module.onFullScreen) {
				Module.onFullScreen(c)
			}
		}
		var e = Module.canvas;
		document.addEventListener("fullscreenchange", c, b);
		document.addEventListener("mozfullscreenchange", c, b);
		document.addEventListener("webkitfullscreenchange", c, b);
		document.addEventListener("pointerlockchange", d, b);
		document.addEventListener("mozpointerlockchange", d, b);
		document.addEventListener("webkitpointerlockchange", d, b);
		e.Ja = e.requestFullScreen || e.mozRequestFullScreen || (e.webkitRequestFullScreen ? (function() {
			e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
		}) : a);
		e.Ja()
	});
	Module.requestAnimationFrame = (function(d) {
		window.requestAnimationFrame || (window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || window.setTimeout);
		window.requestAnimationFrame(d)
	});
	Module.pauseMainLoop = (function() {});
	Module.resumeMainLoop = (function() {
		nl && (nl = b, a())
	});
	var zk = [0, 0, sl, 0, tl, 0, ul, 0, wl, 0, xl, 0, yl, 0];

	function zl(d, c) {
		return d >>> ((32 - c | 0) >>> 0) | d << c
	}

	function Al(d, c) {
		return d >>> ((32 - c | 0) >>> 0) | d << c
	}

	function Bl(d) {
		return kc[d + 1 | 0] << 8 | kc[d] | kc[d + 2 | 0] << 16 | kc[d + 3 | 0] << 24
	}

	function Cl(d, c) {
		s[d] = c & 255;
		s[d + 1 | 0] = c >>> 8 & 255;
		s[d + 2 | 0] = c >>> 16 & 255;
		s[d + 3 | 0] = c >>> 24 & 255
	}

	function Dl(d) {
		return kc[d + 1 | 0] << 8 | kc[d] | kc[d + 2 | 0] << 16 | kc[d + 3 | 0] << 24
	}

	function El(d, c) {
		s[d] = c & 255;
		s[d + 1 | 0] = c >>> 8 & 255;
		s[d + 2 | 0] = c >>> 16 & 255;
		s[d + 3 | 0] = c >>> 24 & 255
	}
	Module._crypto_sign_keypair_from_raw_sk = (function(d, c) {
		var e = n;
		n = n + 640 | 0;
		var f = e + 128;
		s[c] &= -8;
		var h = c + 31 | 0;
		s[h] = s[h] & 63 | 64;
		Fl(e, c);
		Gl(f, e);
		Hl(d, f);
		n = e;
		return 0
	});

	function Il(d, c, e, f, h) {
		var i = 0,
			j = n;
		n = n + 64 | 0;
		for (i = 2;;) {
			switch (i) {
				case 2:
					var l = j,
						p = l | 0,
						q = n;
					n = n + 256 | 0;
					var m = q | 0;
					Jl(p, 5243616, 64);
					var k = (R.add(e, f, 128, 0), D[I >> 2]),
						r = D[I + 4 >> 2],
						t = 0,
						i = 3;
					break;
				case 3:
					s[q + t | 0] = s[h + t | 0] ^ 54;
					i = t + 1 | 0;
					32 == (i | 0) ? i = 4 : (t = i, i = 3);
					break;
				case 4:
					ik(q + 32 | 0, 54, 96);
					var v = l | 0,
						u = q | 0;
					Kl(v, u, 128, 0);
					Kl(v, c, e, f);
					var w = e & 127,
						x = f & 0,
						z = w,
						i = 0 == (w | 0) & 0 == (x | 0) ? 5 : 6;
					break;
				case 5:
					s[q + z | 0] = -128;
					var C = (R.add(w, x, 1, 0), D[I >> 2]),
						i = 7;
					break;
				case 6:
					var A = e & 127;
					Jl(m, c + (e - A | 0) | 0, A);
					s[q + z | 0] = -128;
					i = 0 > x >>> 0 | 0 == x >>> 0 & 112 > w >>> 0;
					A = (R.add(w, x, 1, 0), D[I >> 2]);
					i ? (C = A, i = 7) : i = 8;
					break;
				case 7:
					i = 119 > C >>> 0 ? 9 : 10;
					break;
				case 8:
					i = 247 > A >>> 0 ? 11 : 12;
					break;
				case 9:
					var i = e & 127,
						y = i + 1 | 0;
					ik(q + (i + 1 | 0) | 0, 0, (119 < (i + 2 | 0) >>> 0 ? y : 118) - i | 0);
					i = 10;
					break;
				case 10:
					s[q + 119 | 0] = (r >>> 29 | 0) & 255;
					s[q + 120 | 0] = (r >>> 21 | 0) & 255;
					s[q + 121 | 0] = (r >>> 13 | 0) & 255;
					s[q + 122 | 0] = (r >>> 5 | 0) & 255;
					s[q + 123 | 0] = (k >>> 29 | r << 3) & 255;
					s[q + 124 | 0] = (k >>> 21 | r << 11) & 255;
					s[q + 125 | 0] = (k >>> 13 | r << 19) & 255;
					s[q + 126 | 0] = (k >>> 5 | r << 27) & 255;
					s[q + 127 | 0] = (k << 3 | 0) & 255;
					Kl(v, u, 128, 0);
					var E = 0,
						i = 13;
					break;
				case 11:
					i = e & 127;
					ik(q + (i + 1 | 0) | 0, 0, 246 - i | 0);
					i = 12;
					break;
				case 12:
					s[q + 247 | 0] = (r >>> 29 | 0) & 255;
					s[q + 248 | 0] = (r >>> 21 | 0) & 255;
					s[q + 249 | 0] = (r >>> 13 | 0) & 255;
					s[q + 250 | 0] = (r >>> 5 | 0) & 255;
					s[q + 251 | 0] = (k >>> 29 | r << 3) & 255;
					s[q + 252 | 0] = (k >>> 21 | r << 11) & 255;
					s[q + 253 | 0] = (k >>> 13 | r << 19) & 255;
					s[q + 254 | 0] = (k >>> 5 | r << 27) & 255;
					s[q + 255 | 0] = (k << 3 | 0) & 255;
					Kl(v, u, 256, 0);
					E = 0;
					i = 13;
					break;
				case 13:
					s[q + E | 0] = s[h + E | 0] ^ 92;
					i = E + 1 | 0;
					32 == (i | 0) ? i = 14 : (E = i, i = 13);
					break;
				case 14:
					return ik(q + 32 | 0, 92, 96), Jl(q + 128 | 0, p, 64), Jl(p, 5243616, 64), ik(q + 192 | 0, 0, 64), s[q + 192 | 0] = -128, s[q + 254 | 0] = 6, Kl(v, u, 256, 0), Jl(d, p, 32), n = j, 0;
				default:
					H(0, "bad label: " + i)
			}
		}
	}
	Module._crypto_auth_hmacsha512256 = Il;
	Il.X = 1;
	Module._crypto_auth_hmacsha512256_verify = (function(d, c, e, f, h) {
		var i = n;
		n = n + 32 | 0;
		var j = i | 0;
		Il(j, c, e, f, h);
		d = Ll(d, j);
		n = i;
		return d
	});
	Module._crypto_box_curve25519xsalsa20poly1305_afternm = (function(d, c, e, f, h, i) {
		return Ml(d, c, e, f, h, i)
	});
	Module._crypto_box_curve25519xsalsa20poly1305_open_afternm = (function(d, c, e, f, h, i) {
		return Nl(d, c, e, f, h, i)
	});

	function Ol(d, c, e) {
		var f = n;
		n = n + 32 | 0;
		var h = f | 0;
		Pl(h, e, c);
		Ql(d, 5243024, h, 5243008);
		n = f;
		return 0
	}
	Module._crypto_box_curve25519xsalsa20poly1305_beforenm = Ol;
	Module._crypto_box_curve25519xsalsa20poly1305 = (function(d, c, e, f, h, i, j) {
		var l = n;
		n = n + 32 | 0;
		var p = l | 0;
		Ol(p, i, j);
		d = Ml(d, c, e, f, h, p);
		n = l;
		return d
	});
	Module._crypto_box_curve25519xsalsa20poly1305_open = (function(d, c, e, f, h, i, j) {
		var l = n;
		n = n + 32 | 0;
		var p = l | 0;
		Ol(p, i, j);
		d = Nl(d, c, e, f, h, p);
		n = l;
		return d
	});
	Module._crypto_box_curve25519xsalsa20poly1305_keypair = (function(d, c) {
		Pk(c, 32, 0);
		Rl(d, c);
		return 0
	});

	function Ql(d, c, e, f) {
		for (var h = 0, h = 2;;) {
			switch (h) {
				case 2:
					var i = Bl(f),
						j = f + 4 | 0,
						l = Bl(j),
						p = Bl(c),
						q = c + 4 | 0,
						m = Bl(q),
						k = c + 8 | 0,
						r = Bl(k),
						t = c + 12 | 0,
						v = Bl(t),
						u = f + 8 | 0,
						w = Bl(u),
						x = f + 12 | 0,
						z = Bl(x),
						C = Bl(e + 20 | 0),
						A = Bl(e + 16 | 0),
						y = w,
						E = v,
						G = r,
						F = m,
						B = p,
						J = l,
						N = Bl(e + 12 | 0),
						V = Bl(e + 8 | 0),
						L = Bl(e + 4 | 0),
						da = Bl(e),
						Z = i,
						ea = Bl(e + 24 | 0),
						W = Bl(e + 28 | 0),
						$ = z,
						ha = 20,
						h = 3;
					break;
				case 3:
					var ja = zl(Z + C | 0, 7) ^ N,
						Y = zl(ja + Z | 0, 9) ^ G,
						aa = zl(Y + ja | 0, 13) ^ C,
						ia = zl(aa + Y | 0, 18) ^ Z,
						ca = zl(da + J | 0, 7) ^ E,
						ma = zl(ca + J | 0, 9) ^ ea,
						h = zl(ma + ca | 0, 13) ^ da,
						T = zl(h + ma | 0, 18) ^ J,
						Q = zl(B + y | 0, 7) ^ W,
						fa = zl(Q + y | 0, 9) ^ L,
						ta = zl(fa + Q | 0, 13) ^ B,
						P = zl(ta + fa | 0, 18) ^ y,
						qa = zl($ + A | 0, 7) ^ V,
						ua = zl(qa + $ | 0, 9) ^ F,
						ra = zl(ua + qa | 0, 13) ^ A,
						sa = zl(ra + ua | 0, 18) ^ $,
						h = zl(qa + ia | 0, 7) ^ h,
						fa = zl(h + ia | 0, 9) ^ fa,
						qa = zl(fa + h | 0, 13) ^ qa,
						ia = zl(qa + fa | 0, 18) ^ ia,
						ta = zl(T + ja | 0, 7) ^ ta,
						ua = zl(ta + T | 0, 9) ^ ua,
						ja = zl(ua + ta | 0, 13) ^ ja,
						T = zl(ja + ua | 0, 18) ^ T,
						ra = zl(P + ca | 0, 7) ^ ra,
						Y = zl(ra + P | 0, 9) ^ Y,
						ca = zl(Y + ra | 0, 13) ^ ca,
						P = zl(ca + Y | 0, 18) ^ P,
						aa = zl(sa + Q | 0, 7) ^ aa,
						ma = zl(aa + sa | 0, 9) ^ ma,
						Q = zl(ma + aa | 0, 13) ^ Q,
						sa = zl(Q + ma | 0, 18) ^ sa,
						Ca = ha - 2 | 0;
					0 < (Ca | 0) ? (C = aa, A = ra, y = P, E = ca, G = Y, F = ua, B = ta, J = T, N = ja, V = qa, L = fa, da = h, Z = ia, ea = ma, W = Q, $ = sa, ha = Ca, h = 3) : h = 4;
					break;
				case 4:
					return e = (T + l | 0) - Bl(j) | 0, u = (P + w | 0) - Bl(u) | 0, x = (sa + z | 0) - Bl(x) | 0, c = (ta + p | 0) - Bl(c) | 0, q = (ua + m | 0) - Bl(q) | 0, k = (Y + r | 0) - Bl(k) | 0, t = (ca + v | 0) - Bl(t) | 0, Cl(d, (ia + i | 0) - Bl(f) | 0), Cl(d + 4 | 0, e), Cl(d + 8 | 0, u), Cl(d + 12 | 0, x), Cl(d + 16 | 0, c), Cl(d + 20 | 0, q), Cl(d + 24 | 0, k), Cl(d + 28 | 0, t), 0;
				default:
					H(0, "bad label: " + h)
			}
		}
	}
	Ql.X = 1;

	function Sl(d, c, e, f) {
		for (var h = 0, h = 2;;) {
			switch (h) {
				case 2:
					var i = Dl(f),
						j = Dl(e),
						l = Dl(e + 4 | 0),
						p = Dl(e + 8 | 0),
						q = Dl(e + 12 | 0),
						m = Dl(f + 4 | 0),
						k = Dl(c),
						r = Dl(c + 4 | 0),
						t = Dl(c + 8 | 0),
						v = Dl(c + 12 | 0),
						u = Dl(f + 8 | 0),
						w = Dl(e + 16 | 0),
						x = Dl(e + 20 | 0),
						z = Dl(e + 24 | 0),
						C = Dl(e + 28 | 0),
						A = Dl(f + 12 | 0),
						y = x,
						E = w,
						G = u,
						F = v,
						B = t,
						J = r,
						N = k,
						V = m,
						L = q,
						da = p,
						Z = l,
						ea = j,
						W = i,
						$ = z,
						ha = C,
						ja = A,
						Y = 20,
						h = 3;
					break;
				case 3:
					var aa = Al(W + y | 0, 7) ^ L,
						ia = Al(aa + W | 0, 9) ^ B,
						ca = Al(ia + aa | 0, 13) ^ y,
						ma = Al(ca + ia | 0, 18) ^ W,
						T = Al(ea + V | 0, 7) ^ F,
						Q = Al(T + V | 0, 9) ^ $,
						fa = Al(Q + T | 0, 13) ^ ea,
						ta = Al(fa + Q | 0, 18) ^ V,
						P = Al(N + G | 0, 7) ^ ha,
						qa = Al(P + G | 0, 9) ^ Z,
						ua = Al(qa + P | 0, 13) ^ N,
						ra = Al(ua + qa | 0, 18) ^ G,
						sa = Al(ja + E | 0, 7) ^ da,
						Ca = Al(sa + ja | 0, 9) ^ J,
						Ga = Al(Ca + sa | 0, 13) ^ E,
						Aa = Al(Ga + Ca | 0, 18) ^ ja,
						fa = Al(sa + ma | 0, 7) ^ fa,
						qa = Al(fa + ma | 0, 9) ^ qa,
						sa = Al(qa + fa | 0, 13) ^ sa,
						ma = Al(sa + qa | 0, 18) ^ ma,
						ua = Al(ta + aa | 0, 7) ^ ua,
						Ca = Al(ua + ta | 0, 9) ^ Ca,
						aa = Al(Ca + ua | 0, 13) ^ aa,
						ta = Al(aa + Ca | 0, 18) ^ ta,
						Ga = Al(ra + T | 0, 7) ^ Ga,
						ia = Al(Ga + ra | 0, 9) ^ ia,
						T = Al(ia + Ga | 0, 13) ^ T,
						ra = Al(T + ia | 0, 18) ^ ra,
						ca = Al(Aa + P | 0, 7) ^ ca,
						Q = Al(ca + Aa | 0, 9) ^ Q,
						P = Al(Q + ca | 0, 13) ^ P,
						Aa = Al(P + Q | 0, 18) ^ Aa,
						h = Y - 2 | 0;
					0 < (h | 0) ? (y = ca, E = Ga, G = ra, F = T, B = ia, J = Ca, N = ua, V = ta, L = aa, da = sa, Z = qa, ea = fa, W = ma, $ = Q, ha = P, ja = Aa, Y = h, h = 3) : h = 4;
					break;
				case 4:
					return c = fa + j | 0, l = qa + l | 0, p = sa + p | 0, q = aa + q | 0, m = ta + m | 0, k = ua + k | 0, r = Ca + r | 0, t = ia + t | 0, v = T + v | 0, u = ra + u | 0, w = Ga + w | 0, x = ca + x | 0, z = Q + z | 0, C = P + C | 0, A = Aa + A | 0, El(d, ma + i | 0), El(d + 4 | 0, c), El(d + 8 | 0, l), El(d + 12 | 0, p), El(d + 16 | 0, q), El(d + 20 | 0, m), El(d + 24 | 0, k), El(d + 28 | 0, r), El(d + 32 | 0, t), El(d + 36 | 0, v), El(d + 40 | 0, u), El(d + 44 | 0, w), El(d + 48 | 0, x), El(d + 52 | 0, z), El(d + 56 | 0, C), El(d + 60 | 0, A), 0;
				default:
					H(0, "bad label: " + h)
			}
		}
	}
	Sl.X = 1;

	function Tl(d, c, e, f) {
		var h = 0,
			i = n;
		n = n + 64 | 0;
		for (h = 2;;) {
			switch (h) {
				case 2:
					var j = i,
						l = j | 0,
						p = n;
					n = n + 256 | 0;
					Jl(l, 5243520, 64);
					j |= 0;
					Kl(j, c, e, f);
					var q = e & 127,
						m = f & 0,
						k = q,
						h = 0 == (q | 0) & 0 == (m | 0) ? 3 : 4;
					break;
				case 3:
					s[p + k | 0] = -128;
					var r = (R.add(q, m, 1, 0), D[I >> 2]),
						h = 5;
					break;
				case 4:
					var t = e & 127;
					Jl(p | 0, c + (e - t | 0) | 0, t);
					s[p + k | 0] = -128;
					h = 0 > m >>> 0 | 0 == m >>> 0 & 112 > q >>> 0;
					t = (R.add(q, m, 1, 0), D[I >> 2]);
					h ? (r = t, h = 5) : h = 6;
					break;
				case 5:
					h = 119 > r >>> 0 ? 7 : 8;
					break;
				case 6:
					h = 247 > t >>> 0 ? 9 : 10;
					break;
				case 7:
					var h = e & 127,
						v = h + 1 | 0;
					ik(p + (h + 1 | 0) | 0, 0, (119 < (h + 2 | 0) >>> 0 ? v : 118) - h | 0);
					h = 8;
					break;
				case 8:
					s[p + 119 | 0] = (f >>> 29 | 0) & 255;
					s[p + 120 | 0] = (f >>> 21 | 0) & 255;
					s[p + 121 | 0] = (f >>> 13 | 0) & 255;
					s[p + 122 | 0] = (f >>> 5 | 0) & 255;
					s[p + 123 | 0] = (e >>> 29 | f << 3) & 255;
					s[p + 124 | 0] = (e >>> 21 | f << 11) & 255;
					s[p + 125 | 0] = (e >>> 13 | f << 19) & 255;
					s[p + 126 | 0] = (e >>> 5 | f << 27) & 255;
					s[p + 127 | 0] = (e << 3 | 0) & 255;
					Kl(j, p | 0, 128, 0);
					h = 11;
					break;
				case 9:
					h = e & 127;
					ik(p + (h + 1 | 0) | 0, 0, 246 - h | 0);
					h = 10;
					break;
				case 10:
					s[p + 247 | 0] = (f >>> 29 | 0) & 255;
					s[p + 248 | 0] = (f >>> 21 | 0) & 255;
					s[p + 249 | 0] = (f >>> 13 | 0) & 255;
					s[p + 250 | 0] = (f >>> 5 | 0) & 255;
					s[p + 251 | 0] = (e >>> 29 | f << 3) & 255;
					s[p + 252 | 0] = (e >>> 21 | f << 11) & 255;
					s[p + 253 | 0] = (e >>> 13 | f << 19) & 255;
					s[p + 254 | 0] = (e >>> 5 | f << 27) & 255;
					s[p + 255 | 0] = (e << 3 | 0) & 255;
					Kl(j, p | 0, 256, 0);
					h = 11;
					break;
				case 11:
					return Jl(d, l, 64), n = i, 0;
				default:
					H(0, "bad label: " + h)
			}
		}
	}
	Module._crypto_hash_sha512 = Tl;
	Tl.X = 1;

	function Kl(d, c, e, f) {
		for (var h = 0, h = 2;;) {
			switch (h) {
				case 2:
					var i = Ul(d),
						j = sj,
						l = d + 8 | 0,
						p = Ul(l),
						q = sj,
						m = d + 16 | 0,
						k = Ul(m),
						r = sj,
						t = d + 24 | 0,
						v = Ul(t),
						u = sj,
						w = d + 32 | 0,
						x = Ul(w),
						z = sj,
						C = d + 40 | 0,
						A = Ul(C),
						y = sj,
						E = d + 48 | 0,
						G = Ul(E),
						F = sj,
						B = d + 56 | 0,
						J = Ul(B),
						N = sj;
					if (0 < f >>> 0 | 0 == f >>> 0 & 127 < e >>> 0) {
						var V = N,
							L = J,
							da = F,
							Z = G,
							ea = y,
							W = A,
							$ = z,
							ha = x,
							ja = u,
							Y = v,
							aa = r,
							ia = k,
							ca = q,
							ma = p,
							T = j,
							Q = i,
							fa = f,
							ta = e,
							P = c,
							h = 3
					} else {
						var qa = N,
							ua = J,
							ra = F,
							sa = G,
							Ca = y,
							Ga = A,
							Aa = z,
							ka = x,
							lc = u,
							Ba = v,
							kd = r,
							ac = k,
							ld = q,
							md = p,
							Ja = j,
							zj = i,
							h = 4
					}
					break;
				case 3:
					var Aj = Ul(P),
						qd = sj,
						Ua = Ul(P + 8 | 0),
						mc = sj,
						nc = Ul(P + 16 | 0),
						bc = sj,
						cc = Ul(P + 24 | 0),
						Va = sj,
						dc = Ul(P + 32 | 0),
						Ea = sj,
						ec = Ul(P + 40 | 0),
						fc = sj,
						$a = Ul(P + 48 | 0),
						Wa = sj,
						gc = Ul(P + 56 | 0),
						hc = sj,
						Xa = Ul(P + 64 | 0),
						ab = sj,
						Ka = Ul(P + 72 | 0),
						bb = sj,
						cb = Ul(P + 80 | 0),
						db = sj,
						Ha = Ul(P + 88 | 0),
						Ya = sj,
						La = Ul(P + 96 | 0),
						Za = sj,
						ic = Ul(P + 104 | 0),
						eb = sj,
						Na = Ul(P + 112 | 0),
						Fa = sj,
						Ia = Ul(P + 120 | 0),
						va = sj,
						Rj = (ha >>> 18 | $ << 14 | 0) ^ ($ >>> 9 | 0 | ha << 23 | 0) ^ (ha >>> 14 | $ << 18 | 0),
						Sj = ($ >>> 18 | 0 | ha << 14 | 0) ^ (0 | $ << 23 | ha >>> 9) ^ ($ >>> 14 | 0 | ha << 18 | 0),
						jk = ha & W ^ Z & (ha ^ -1),
						kk = $ & ea ^ da & ($ ^ -1),
						Bj = (R.add(L, V, -685199838, 1116352408), D[I >> 2]),
						Cj = (R.add(Bj, D[I + 4 >> 2], jk, kk), D[I >> 2]),
						nd = (R.add(Cj, D[I + 4 >> 2], Rj, Sj), D[I >> 2]),
						oc = (R.add(nd, D[I + 4 >> 2], Aj, qd), D[I >> 2]),
						Dj = D[I + 4 >> 2],
						lk = (T >>> 2 | 0 | Q << 30 | 0) ^ (T >>> 7 | 0 | Q << 25 | 0) ^ (Q >>> 28 | T << 4 | 0),
						mk = (0 | T << 30 | Q >>> 2) ^ (0 | T << 25 | Q >>> 7) ^ (T >>> 28 | 0 | Q << 4 | 0),
						nk = Q & ma,
						Fk = T & ca,
						qt = (Q ^ ma) & ia ^ nk,
						rt = (T ^ ca) & aa ^ Fk,
						rd = (R.add(oc, Dj, Y, ja), D[I >> 2]),
						sd = D[I + 4 >> 2],
						st = (R.add(lk, mk, qt, rt), D[I >> 2]),
						td = (R.add(st, D[I + 4 >> 2], oc, Dj), D[I >> 2]),
						ud = D[I + 4 >> 2],
						tt = (rd >>> 18 | sd << 14 | 0) ^ (sd >>> 9 | 0 | rd << 23 | 0) ^ (rd >>> 14 | sd << 18 | 0),
						ut = (sd >>> 18 | 0 | rd << 14 | 0) ^ (0 | sd << 23 | rd >>> 9) ^ (sd >>> 14 | 0 | rd << 18 | 0),
						vt = rd & ha ^ W & (rd ^ -1),
						wt = sd & $ ^ ea & (sd ^ -1),
						xt = (R.add(Z, da, 602891725, 1899447441), D[I >> 2]),
						yt = (R.add(xt, D[I + 4 >> 2], Ua, mc), D[I >> 2]),
						zt = (R.add(yt, D[I + 4 >> 2], vt, wt), D[I >> 2]),
						om = (R.add(zt, D[I + 4 >> 2], tt, ut), D[I >> 2]),
						pm = D[I + 4 >> 2],
						At = (ud >>> 2 | 0 | td << 30 | 0) ^ (ud >>> 7 | 0 | td << 25 | 0) ^ (td >>> 28 | ud << 4 | 0),
						Bt = (0 | ud << 30 | td >>> 2) ^ (0 | ud << 25 | td >>> 7) ^ (ud >>> 28 | 0 | td << 4 | 0),
						qm = td & Q,
						rm = ud & T,
						Ct = td & ma ^ nk ^ qm,
						Dt = ud & ca ^ Fk ^ rm,
						vd = (R.add(om, pm, ia, aa), D[I >> 2]),
						wd = D[I + 4 >> 2],
						Et = (R.add(At, Bt, Ct, Dt), D[I >> 2]),
						xd = (R.add(Et, D[I + 4 >> 2], om, pm), D[I >> 2]),
						yd = D[I + 4 >> 2],
						Ft = (vd >>> 18 | wd << 14 | 0) ^ (wd >>> 9 | 0 | vd << 23 | 0) ^ (vd >>> 14 | wd << 18 | 0),
						Gt = (wd >>> 18 | 0 | vd << 14 | 0) ^ (0 | wd << 23 | vd >>> 9) ^ (wd >>> 14 | 0 | vd << 18 | 0),
						Ht = vd & rd ^ ha & (vd ^ -1),
						It = wd & sd ^ $ & (wd ^ -1),
						Jt = (R.add(W, ea, -330482897, -1245643825), D[I >> 2]),
						Kt = (R.add(Jt, D[I + 4 >> 2], nc, bc), D[I >> 2]),
						Lt = (R.add(Kt, D[I + 4 >> 2], Ht, It), D[I >> 2]),
						sm = (R.add(Lt, D[I + 4 >> 2], Ft, Gt), D[I >> 2]),
						tm = D[I + 4 >> 2],
						Mt = (yd >>> 2 | 0 | xd << 30 | 0) ^ (yd >>> 7 | 0 | xd << 25 | 0) ^ (xd >>> 28 | yd << 4 | 0),
						Nt = (0 | yd << 30 | xd >>> 2) ^ (0 | yd << 25 | xd >>> 7) ^ (yd >>> 28 | 0 | xd << 4 | 0),
						um = xd & td,
						vm = yd & ud,
						Ot = xd & Q ^ qm ^ um,
						Pt = yd & T ^ rm ^ vm,
						zd = (R.add(sm, tm, ma, ca), D[I >> 2]),
						Ad = D[I + 4 >> 2],
						Qt = (R.add(Mt, Nt, Ot, Pt), D[I >> 2]),
						Bd = (R.add(Qt, D[I + 4 >> 2], sm, tm), D[I >> 2]),
						Cd = D[I + 4 >> 2],
						Rt = (zd >>> 18 | Ad << 14 | 0) ^ (Ad >>> 9 | 0 | zd << 23 | 0) ^ (zd >>> 14 | Ad << 18 | 0),
						St = (Ad >>> 18 | 0 | zd << 14 | 0) ^ (0 | Ad << 23 | zd >>> 9) ^ (Ad >>> 14 | 0 | zd << 18 | 0),
						Tt = zd & vd ^ rd & (zd ^ -1),
						Ut = Ad & wd ^ sd & (Ad ^ -1),
						Vt = (R.add(ha, $, -2121671748, -373957723), D[I >> 2]),
						Wt = (R.add(Vt, D[I + 4 >> 2], cc, Va), D[I >> 2]),
						Xt = (R.add(Wt, D[I + 4 >> 2], Tt, Ut), D[I >> 2]),
						wm = (R.add(Xt, D[I + 4 >> 2], Rt, St), D[I >> 2]),
						xm = D[I + 4 >> 2],
						Yt = (Cd >>> 2 | 0 | Bd << 30 | 0) ^ (Cd >>> 7 | 0 | Bd << 25 | 0) ^ (Bd >>> 28 | Cd << 4 | 0),
						Zt = (0 | Cd << 30 | Bd >>> 2) ^ (0 | Cd << 25 | Bd >>> 7) ^ (Cd >>> 28 | 0 | Bd << 4 | 0),
						ym = Bd & xd,
						zm = Cd & yd,
						$t = Bd & td ^ um ^ ym,
						au = Cd & ud ^ vm ^ zm,
						Dd = (R.add(wm, xm, Q, T), D[I >> 2]),
						Ed = D[I + 4 >> 2],
						bu = (R.add(Yt, Zt, $t, au), D[I >> 2]),
						Fd = (R.add(bu, D[I + 4 >> 2], wm, xm), D[I >> 2]),
						Gd = D[I + 4 >> 2],
						cu = (Dd >>> 18 | Ed << 14 | 0) ^ (Ed >>> 9 | 0 | Dd << 23 | 0) ^ (Dd >>> 14 | Ed << 18 | 0),
						du = (Ed >>> 18 | 0 | Dd << 14 | 0) ^ (0 | Ed << 23 | Dd >>> 9) ^ (Ed >>> 14 | 0 | Dd << 18 | 0),
						eu = Dd & zd ^ vd & (Dd ^ -1),
						fu = Ed & Ad ^ wd & (Ed ^ -1),
						gu = (R.add(rd, sd, -213338824, 961987163), D[I >> 2]),
						hu = (R.add(gu, D[I + 4 >> 2], dc, Ea), D[I >> 2]),
						iu = (R.add(hu, D[I + 4 >> 2], eu, fu), D[I >> 2]),
						Am = (R.add(iu, D[I + 4 >> 2], cu, du), D[I >> 2]),
						Bm = D[I + 4 >> 2],
						ju = (Gd >>> 2 | 0 | Fd << 30 | 0) ^ (Gd >>> 7 | 0 | Fd << 25 | 0) ^ (Fd >>> 28 | Gd << 4 | 0),
						ku = (0 | Gd << 30 | Fd >>> 2) ^ (0 | Gd << 25 | Fd >>> 7) ^ (Gd >>> 28 | 0 | Fd << 4 | 0),
						Cm = Fd & Bd,
						Dm = Gd & Cd,
						lu = Fd & xd ^ ym ^ Cm,
						mu = Gd & yd ^ zm ^ Dm,
						Hd = (R.add(Am, Bm, td, ud), D[I >> 2]),
						Id = D[I + 4 >> 2],
						nu = (R.add(ju, ku, lu, mu), D[I >> 2]),
						Jd = (R.add(nu, D[I + 4 >> 2], Am, Bm), D[I >> 2]),
						Kd = D[I + 4 >> 2],
						ou = (Hd >>> 18 | Id << 14 | 0) ^ (Id >>> 9 | 0 | Hd << 23 | 0) ^ (Hd >>> 14 | Id << 18 | 0),
						pu = (Id >>> 18 | 0 | Hd << 14 | 0) ^ (0 | Id << 23 | Hd >>> 9) ^ (Id >>> 14 | 0 | Hd << 18 | 0),
						qu = Hd & Dd ^ zd & (Hd ^ -1),
						ru = Id & Ed ^ Ad & (Id ^ -1),
						su = (R.add(ec, fc, -1241133031, 1508970993), D[I >> 2]),
						tu = (R.add(su, D[I + 4 >> 2], vd, wd), D[I >> 2]),
						uu = (R.add(tu, D[I + 4 >> 2], qu, ru), D[I >> 2]),
						Em = (R.add(uu, D[I + 4 >> 2], ou, pu), D[I >> 2]),
						Fm = D[I + 4 >> 2],
						vu = (Kd >>> 2 | 0 | Jd << 30 | 0) ^ (Kd >>> 7 | 0 | Jd << 25 | 0) ^ (Jd >>> 28 | Kd << 4 | 0),
						wu = (0 | Kd << 30 | Jd >>> 2) ^ (0 | Kd << 25 | Jd >>> 7) ^ (Kd >>> 28 | 0 | Jd << 4 | 0),
						Gm = Jd & Fd,
						Hm = Kd & Gd,
						xu = Jd & Bd ^ Cm ^ Gm,
						yu = Kd & Cd ^ Dm ^ Hm,
						Ld = (R.add(Em, Fm, xd, yd), D[I >> 2]),
						Md = D[I + 4 >> 2],
						zu = (R.add(vu, wu, xu, yu), D[I >> 2]),
						Nd = (R.add(zu, D[I + 4 >> 2], Em, Fm), D[I >> 2]),
						Od = D[I + 4 >> 2],
						Au = (Ld >>> 18 | Md << 14 | 0) ^ (Md >>> 9 | 0 | Ld << 23 | 0) ^ (Ld >>> 14 | Md << 18 | 0),
						Bu = (Md >>> 18 | 0 | Ld << 14 | 0) ^ (0 | Md << 23 | Ld >>> 9) ^ (Md >>> 14 | 0 | Ld << 18 | 0),
						Cu = Ld & Hd ^ Dd & (Ld ^ -1),
						Du = Md & Id ^ Ed & (Md ^ -1),
						Eu = (R.add($a, Wa, -1357295717, -1841331548), D[I >> 2]),
						Fu = (R.add(Eu, D[I + 4 >> 2], zd, Ad), D[I >> 2]),
						Gu = (R.add(Fu, D[I + 4 >> 2], Cu, Du), D[I >> 2]),
						Im = (R.add(Gu, D[I + 4 >> 2], Au, Bu), D[I >> 2]),
						Jm = D[I + 4 >> 2],
						Hu = (Od >>> 2 | 0 | Nd << 30 | 0) ^ (Od >>> 7 | 0 | Nd << 25 | 0) ^ (Nd >>> 28 | Od << 4 | 0),
						Iu = (0 | Od << 30 | Nd >>> 2) ^ (0 | Od << 25 | Nd >>> 7) ^ (Od >>> 28 | 0 | Nd << 4 | 0),
						Km = Nd & Jd,
						Lm = Od & Kd,
						Ju = Nd & Fd ^ Gm ^ Km,
						Ku = Od & Gd ^ Hm ^ Lm,
						Pd = (R.add(Im, Jm, Bd, Cd), D[I >> 2]),
						Qd = D[I + 4 >> 2],
						Lu = (R.add(Hu, Iu, Ju, Ku), D[I >> 2]),
						Rd = (R.add(Lu, D[I + 4 >> 2], Im, Jm), D[I >> 2]),
						Sd = D[I + 4 >> 2],
						Mu = (Pd >>> 18 | Qd << 14 | 0) ^ (Qd >>> 9 | 0 | Pd << 23 | 0) ^ (Pd >>> 14 | Qd << 18 | 0),
						Nu = (Qd >>> 18 | 0 | Pd << 14 | 0) ^ (0 | Qd << 23 | Pd >>> 9) ^ (Qd >>> 14 | 0 | Pd << 18 | 0),
						Ou = Pd & Ld ^ Hd & (Pd ^ -1),
						Pu = Qd & Md ^ Id & (Qd ^ -1),
						Qu = (R.add(gc, hc, -630357736, -1424204075), D[I >> 2]),
						Ru = (R.add(Qu, D[I + 4 >> 2], Dd, Ed), D[I >> 2]),
						Su = (R.add(Ru, D[I + 4 >> 2], Ou, Pu), D[I >> 2]),
						Mm = (R.add(Su, D[I + 4 >> 2], Mu, Nu), D[I >> 2]),
						Nm = D[I + 4 >> 2],
						Tu = (Sd >>> 2 | 0 | Rd << 30 | 0) ^ (Sd >>> 7 | 0 | Rd << 25 | 0) ^ (Rd >>> 28 | Sd << 4 | 0),
						Uu = (0 | Sd << 30 | Rd >>> 2) ^ (0 | Sd << 25 | Rd >>> 7) ^ (Sd >>> 28 | 0 | Rd << 4 | 0),
						Om = Rd & Nd,
						Pm = Sd & Od,
						Vu = Rd & Jd ^ Km ^ Om,
						Wu = Sd & Kd ^ Lm ^ Pm,
						Td = (R.add(Mm, Nm, Fd, Gd), D[I >> 2]),
						Ud = D[I + 4 >> 2],
						Xu = (R.add(Tu, Uu, Vu, Wu), D[I >> 2]),
						Vd = (R.add(Xu, D[I + 4 >> 2], Mm, Nm), D[I >> 2]),
						Wd = D[I + 4 >> 2],
						Yu = (Td >>> 18 | Ud << 14 | 0) ^ (Ud >>> 9 | 0 | Td << 23 | 0) ^ (Td >>> 14 | Ud << 18 | 0),
						Zu = (Ud >>> 18 | 0 | Td << 14 | 0) ^ (0 | Ud << 23 | Td >>> 9) ^ (Ud >>> 14 | 0 | Td << 18 | 0),
						$u = Td & Pd ^ Ld & (Td ^ -1),
						av = Ud & Qd ^ Md & (Ud ^ -1),
						bv = (R.add(Xa, ab, -1560083902, -670586216), D[I >> 2]),
						cv = (R.add(bv, D[I + 4 >> 2], Hd, Id), D[I >> 2]),
						dv = (R.add(cv, D[I + 4 >> 2], $u, av), D[I >> 2]),
						Qm = (R.add(dv, D[I + 4 >> 2], Yu, Zu), D[I >> 2]),
						Rm = D[I + 4 >> 2],
						ev = (Wd >>> 2 | 0 | Vd << 30 | 0) ^ (Wd >>> 7 | 0 | Vd << 25 | 0) ^ (Vd >>> 28 | Wd << 4 | 0),
						fv = (0 | Wd << 30 | Vd >>> 2) ^ (0 | Wd << 25 | Vd >>> 7) ^ (Wd >>> 28 | 0 | Vd << 4 | 0),
						Sm = Vd & Rd,
						Tm = Wd & Sd,
						gv = Vd & Nd ^ Om ^ Sm,
						hv = Wd & Od ^ Pm ^ Tm,
						Xd = (R.add(Qm, Rm, Jd, Kd), D[I >> 2]),
						Yd = D[I + 4 >> 2],
						iv = (R.add(ev, fv, gv, hv), D[I >> 2]),
						Zd = (R.add(iv, D[I + 4 >> 2], Qm, Rm), D[I >> 2]),
						$d = D[I + 4 >> 2],
						jv = (Xd >>> 18 | Yd << 14 | 0) ^ (Yd >>> 9 | 0 | Xd << 23 | 0) ^ (Xd >>> 14 | Yd << 18 | 0),
						kv = (Yd >>> 18 | 0 | Xd << 14 | 0) ^ (0 | Yd << 23 | Xd >>> 9) ^ (Yd >>> 14 | 0 | Xd << 18 | 0),
						lv = Xd & Td ^ Pd & (Xd ^ -1),
						mv = Yd & Ud ^ Qd & (Yd ^ -1),
						nv = (R.add(Ka, bb, 1164996542, 310598401), D[I >> 2]),
						ov = (R.add(nv, D[I + 4 >> 2], Ld, Md), D[I >> 2]),
						pv = (R.add(ov, D[I + 4 >> 2], lv, mv), D[I >> 2]),
						Um = (R.add(pv, D[I + 4 >> 2], jv, kv), D[I >> 2]),
						Vm = D[I + 4 >> 2],
						qv = ($d >>> 2 | 0 | Zd << 30 | 0) ^ ($d >>> 7 | 0 | Zd << 25 | 0) ^ (Zd >>> 28 | $d << 4 | 0),
						rv = (0 | $d << 30 | Zd >>> 2) ^ (0 | $d << 25 | Zd >>> 7) ^ ($d >>> 28 | 0 | Zd << 4 | 0),
						Wm = Zd & Vd,
						Xm = $d & Wd,
						sv = Zd & Rd ^ Sm ^ Wm,
						tv = $d & Sd ^ Tm ^ Xm,
						ae = (R.add(Um, Vm, Nd, Od), D[I >> 2]),
						be = D[I + 4 >> 2],
						uv = (R.add(qv, rv, sv, tv), D[I >> 2]),
						ce = (R.add(uv, D[I + 4 >> 2], Um, Vm), D[I >> 2]),
						de = D[I + 4 >> 2],
						vv = (ae >>> 18 | be << 14 | 0) ^ (be >>> 9 | 0 | ae << 23 | 0) ^ (ae >>> 14 | be << 18 | 0),
						wv = (be >>> 18 | 0 | ae << 14 | 0) ^ (0 | be << 23 | ae >>> 9) ^ (be >>> 14 | 0 | ae << 18 | 0),
						xv = ae & Xd ^ Td & (ae ^ -1),
						yv = be & Yd ^ Ud & (be ^ -1),
						zv = (R.add(cb, db, 1323610764, 607225278), D[I >> 2]),
						Av = (R.add(zv, D[I + 4 >> 2], Pd, Qd), D[I >> 2]),
						Bv = (R.add(Av, D[I + 4 >> 2], xv, yv), D[I >> 2]),
						Ym = (R.add(Bv, D[I + 4 >> 2], vv, wv), D[I >> 2]),
						Zm = D[I + 4 >> 2],
						Cv = (de >>> 2 | 0 | ce << 30 | 0) ^ (de >>> 7 | 0 | ce << 25 | 0) ^ (ce >>> 28 | de << 4 | 0),
						Dv = (0 | de << 30 | ce >>> 2) ^ (0 | de << 25 | ce >>> 7) ^ (de >>> 28 | 0 | ce << 4 | 0),
						$m = ce & Zd,
						an = de & $d,
						Ev = ce & Vd ^ Wm ^ $m,
						Fv = de & Wd ^ Xm ^ an,
						ee = (R.add(Ym, Zm, Rd, Sd), D[I >> 2]),
						fe = D[I + 4 >> 2],
						Gv = (R.add(Cv, Dv, Ev, Fv), D[I >> 2]),
						ge = (R.add(Gv, D[I + 4 >> 2], Ym, Zm), D[I >> 2]),
						he = D[I + 4 >> 2],
						Hv = (ee >>> 18 | fe << 14 | 0) ^ (fe >>> 9 | 0 | ee << 23 | 0) ^ (ee >>> 14 | fe << 18 | 0),
						Iv = (fe >>> 18 | 0 | ee << 14 | 0) ^ (0 | fe << 23 | ee >>> 9) ^ (fe >>> 14 | 0 | ee << 18 | 0),
						Jv = ee & ae ^ Xd & (ee ^ -1),
						Kv = fe & be ^ Yd & (fe ^ -1),
						Lv = (R.add(Ha, Ya, -704662302, 1426881987), D[I >> 2]),
						Mv = (R.add(Lv, D[I + 4 >> 2], Td, Ud), D[I >> 2]),
						Nv = (R.add(Mv, D[I + 4 >> 2], Jv, Kv), D[I >> 2]),
						bn = (R.add(Nv, D[I + 4 >> 2], Hv, Iv), D[I >> 2]),
						cn = D[I + 4 >> 2],
						Ov = (he >>> 2 | 0 | ge << 30 | 0) ^ (he >>> 7 | 0 | ge << 25 | 0) ^ (ge >>> 28 | he << 4 | 0),
						Pv = (0 | he << 30 | ge >>> 2) ^ (0 | he << 25 | ge >>> 7) ^ (he >>> 28 | 0 | ge << 4 | 0),
						dn = ge & ce,
						en = he & de,
						Qv = ge & Zd ^ $m ^ dn,
						Rv = he & $d ^ an ^ en,
						ie = (R.add(bn, cn, Vd, Wd), D[I >> 2]),
						je = D[I + 4 >> 2],
						Sv = (R.add(Ov, Pv, Qv, Rv), D[I >> 2]),
						ke = (R.add(Sv, D[I + 4 >> 2], bn, cn), D[I >> 2]),
						le = D[I + 4 >> 2],
						Tv = (ie >>> 18 | je << 14 | 0) ^ (je >>> 9 | 0 | ie << 23 | 0) ^ (ie >>> 14 | je << 18 | 0),
						Uv = (je >>> 18 | 0 | ie << 14 | 0) ^ (0 | je << 23 | ie >>> 9) ^ (je >>> 14 | 0 | ie << 18 | 0),
						Vv = ie & ee ^ ae & (ie ^ -1),
						Wv = je & fe ^ be & (je ^ -1),
						Xv = (R.add(La, Za, -226784913, 1925078388), D[I >> 2]),
						Yv = (R.add(Xv, D[I + 4 >> 2], Xd, Yd), D[I >> 2]),
						Zv = (R.add(Yv, D[I + 4 >> 2], Vv, Wv), D[I >> 2]),
						fn = (R.add(Zv, D[I + 4 >> 2], Tv, Uv), D[I >> 2]),
						gn = D[I + 4 >> 2],
						$v = (le >>> 2 | 0 | ke << 30 | 0) ^ (le >>> 7 | 0 | ke << 25 | 0) ^ (ke >>> 28 | le << 4 | 0),
						aw = (0 | le << 30 | ke >>> 2) ^ (0 | le << 25 | ke >>> 7) ^ (le >>> 28 | 0 | ke << 4 | 0),
						hn = ke & ge,
						jn = le & he,
						bw = ke & ce ^ dn ^ hn,
						cw = le & de ^ en ^ jn,
						me = (R.add(fn, gn, Zd, $d), D[I >> 2]),
						ne = D[I + 4 >> 2],
						dw = (R.add($v, aw, bw, cw), D[I >> 2]),
						oe = (R.add(dw, D[I + 4 >> 2], fn, gn), D[I >> 2]),
						pe = D[I + 4 >> 2],
						ew = (me >>> 18 | ne << 14 | 0) ^ (ne >>> 9 | 0 | me << 23 | 0) ^ (me >>> 14 | ne << 18 | 0),
						fw = (ne >>> 18 | 0 | me << 14 | 0) ^ (0 | ne << 23 | me >>> 9) ^ (ne >>> 14 | 0 | me << 18 | 0),
						gw = me & ie ^ ee & (me ^ -1),
						hw = ne & je ^ fe & (ne ^ -1),
						iw = (R.add(ic, eb, 991336113, -2132889090), D[I >> 2]),
						jw = (R.add(iw, D[I + 4 >> 2], ae, be), D[I >> 2]),
						kw = (R.add(jw, D[I + 4 >> 2], gw, hw), D[I >> 2]),
						kn = (R.add(kw, D[I + 4 >> 2], ew, fw), D[I >> 2]),
						ln = D[I + 4 >> 2],
						lw = (pe >>> 2 | 0 | oe << 30 | 0) ^ (pe >>> 7 | 0 | oe << 25 | 0) ^ (oe >>> 28 | pe << 4 | 0),
						mw = (0 | pe << 30 | oe >>> 2) ^ (0 | pe << 25 | oe >>> 7) ^ (pe >>> 28 | 0 | oe << 4 | 0),
						mn = oe & ke,
						nn = pe & le,
						nw = oe & ge ^ hn ^ mn,
						ow = pe & he ^ jn ^ nn,
						qe = (R.add(kn, ln, ce, de), D[I >> 2]),
						re = D[I + 4 >> 2],
						pw = (R.add(lw, mw, nw, ow), D[I >> 2]),
						se = (R.add(pw, D[I + 4 >> 2], kn, ln), D[I >> 2]),
						te = D[I + 4 >> 2],
						qw = (qe >>> 18 | re << 14 | 0) ^ (re >>> 9 | 0 | qe << 23 | 0) ^ (qe >>> 14 | re << 18 | 0),
						rw = (re >>> 18 | 0 | qe << 14 | 0) ^ (0 | re << 23 | qe >>> 9) ^ (re >>> 14 | 0 | qe << 18 | 0),
						sw = qe & me ^ ie & (qe ^ -1),
						tw = re & ne ^ je & (re ^ -1),
						uw = (R.add(Na, Fa, 633803317, -1680079193), D[I >> 2]),
						vw = (R.add(uw, D[I + 4 >> 2], ee, fe), D[I >> 2]),
						ww = (R.add(vw, D[I + 4 >> 2], sw, tw), D[I >> 2]),
						on = (R.add(ww, D[I + 4 >> 2], qw, rw), D[I >> 2]),
						pn = D[I + 4 >> 2],
						xw = (te >>> 2 | 0 | se << 30 | 0) ^ (te >>> 7 | 0 | se << 25 | 0) ^ (se >>> 28 | te << 4 | 0),
						yw = (0 | te << 30 | se >>> 2) ^ (0 | te << 25 | se >>> 7) ^ (te >>> 28 | 0 | se << 4 | 0),
						qn = se & oe,
						rn = te & pe,
						zw = se & ke ^ mn ^ qn,
						Aw = te & le ^ nn ^ rn,
						ue = (R.add(on, pn, ge, he), D[I >> 2]),
						ve = D[I + 4 >> 2],
						Bw = (R.add(xw, yw, zw, Aw), D[I >> 2]),
						we = (R.add(Bw, D[I + 4 >> 2], on, pn), D[I >> 2]),
						xe = D[I + 4 >> 2],
						Cw = (ue >>> 18 | ve << 14 | 0) ^ (ve >>> 9 | 0 | ue << 23 | 0) ^ (ue >>> 14 | ve << 18 | 0),
						Dw = (ve >>> 18 | 0 | ue << 14 | 0) ^ (0 | ve << 23 | ue >>> 9) ^ (ve >>> 14 | 0 | ue << 18 | 0),
						Ew = ue & qe ^ me & (ue ^ -1),
						Fw = ve & re ^ ne & (ve ^ -1),
						Gw = (R.add(Ia, va, -815192428, -1046744716), D[I >> 2]),
						Hw = (R.add(Gw, D[I + 4 >> 2], ie, je), D[I >> 2]),
						Iw = (R.add(Hw, D[I + 4 >> 2], Ew, Fw), D[I >> 2]),
						sn = (R.add(Iw, D[I + 4 >> 2], Cw, Dw), D[I >> 2]),
						tn = D[I + 4 >> 2],
						Jw = (xe >>> 2 | 0 | we << 30 | 0) ^ (xe >>> 7 | 0 | we << 25 | 0) ^ (we >>> 28 | xe << 4 | 0),
						Kw = (0 | xe << 30 | we >>> 2) ^ (0 | xe << 25 | we >>> 7) ^ (xe >>> 28 | 0 | we << 4 | 0),
						un = we & se,
						vn = xe & te,
						Lw = we & oe ^ qn ^ un,
						Mw = xe & pe ^ rn ^ vn,
						ye = (R.add(sn, tn, ke, le), D[I >> 2]),
						ze = D[I + 4 >> 2],
						Nw = (R.add(Jw, Kw, Lw, Mw), D[I >> 2]),
						Ae = (R.add(Nw, D[I + 4 >> 2], sn, tn), D[I >> 2]),
						Be = D[I + 4 >> 2],
						Ow = (Fa >>> 29 | 0 | Na << 3 | 0) ^ (Na >>> 6 | Fa << 26) ^ (Na >>> 19 | Fa << 13 | 0),
						Pw = (0 | Fa << 3 | Na >>> 29) ^ (Fa >>> 6 | 0) ^ (Fa >>> 19 | 0 | Na << 13 | 0),
						Qw = (R.add((Ua >>> 8 | mc << 24 | 0) ^ (Ua >>> 7 | mc << 25) ^ (Ua >>> 1 | mc << 31 | 0), (mc >>> 8 | 0 | Ua << 24 | 0) ^ (mc >>> 7 | 0) ^ (mc >>> 1 | 0 | Ua << 31 | 0), Aj, qd), D[I >> 2]),
						Rw = (R.add(Qw, D[I + 4 >> 2], Ka, bb), D[I >> 2]),
						pc = (R.add(Rw, D[I + 4 >> 2], Ow, Pw), D[I >> 2]),
						fb = D[I + 4 >> 2],
						Sw = (va >>> 29 | 0 | Ia << 3 | 0) ^ (Ia >>> 6 | va << 26) ^ (Ia >>> 19 | va << 13 | 0),
						Tw = (0 | va << 3 | Ia >>> 29) ^ (va >>> 6 | 0) ^ (va >>> 19 | 0 | Ia << 13 | 0),
						Uw = (R.add((nc >>> 8 | bc << 24 | 0) ^ (nc >>> 7 | bc << 25) ^ (nc >>> 1 | bc << 31 | 0), (bc >>> 8 | 0 | nc << 24 | 0) ^ (bc >>> 7 | 0) ^ (bc >>> 1 | 0 | nc << 31 | 0), Ua, mc), D[I >> 2]),
						Vw = (R.add(Uw, D[I + 4 >> 2], cb, db), D[I >> 2]),
						qc = (R.add(Vw, D[I + 4 >> 2], Sw, Tw), D[I >> 2]),
						gb = D[I + 4 >> 2],
						Ww = (fb >>> 29 | 0 | pc << 3 | 0) ^ (pc >>> 6 | fb << 26) ^ (pc >>> 19 | fb << 13 | 0),
						Xw = (0 | fb << 3 | pc >>> 29) ^ (fb >>> 6 | 0) ^ (fb >>> 19 | 0 | pc << 13 | 0),
						Yw = (R.add((cc >>> 8 | Va << 24 | 0) ^ (cc >>> 7 | Va << 25) ^ (cc >>> 1 | Va << 31 | 0), (Va >>> 8 | 0 | cc << 24 | 0) ^ (Va >>> 7 | 0) ^ (Va >>> 1 | 0 | cc << 31 | 0), nc, bc), D[I >> 2]),
						Zw = (R.add(Yw, D[I + 4 >> 2], Ha, Ya), D[I >> 2]),
						rc = (R.add(Zw, D[I + 4 >> 2], Ww, Xw), D[I >> 2]),
						hb = D[I + 4 >> 2],
						$w = (gb >>> 29 | 0 | qc << 3 | 0) ^ (qc >>> 6 | gb << 26) ^ (qc >>> 19 | gb << 13 | 0),
						ax = (0 | gb << 3 | qc >>> 29) ^ (gb >>> 6 | 0) ^ (gb >>> 19 | 0 | qc << 13 | 0),
						bx = (R.add((dc >>> 8 | Ea << 24 | 0) ^ (dc >>> 7 | Ea << 25) ^ (dc >>> 1 | Ea << 31 | 0), (Ea >>> 8 | 0 | dc << 24 | 0) ^ (Ea >>> 7 | 0) ^ (Ea >>> 1 | 0 | dc << 31 | 0), cc, Va), D[I >> 2]),
						cx = (R.add(bx, D[I + 4 >> 2], La, Za), D[I >> 2]),
						sc = (R.add(cx, D[I + 4 >> 2], $w, ax), D[I >> 2]),
						ib = D[I + 4 >> 2],
						dx = (hb >>> 29 | 0 | rc << 3 | 0) ^ (rc >>> 6 | hb << 26) ^ (rc >>> 19 | hb << 13 | 0),
						ex = (0 | hb << 3 | rc >>> 29) ^ (hb >>> 6 | 0) ^ (hb >>> 19 | 0 | rc << 13 | 0),
						fx = (R.add((ec >>> 8 | fc << 24 | 0) ^ (ec >>> 7 | fc << 25) ^ (ec >>> 1 | fc << 31 | 0), (fc >>> 8 | 0 | ec << 24 | 0) ^ (fc >>> 7 | 0) ^ (fc >>> 1 | 0 | ec << 31 | 0), dc, Ea), D[I >> 2]),
						gx = (R.add(fx, D[I + 4 >> 2], ic, eb), D[I >> 2]),
						tc = (R.add(gx, D[I + 4 >> 2], dx, ex), D[I >> 2]),
						jb = D[I + 4 >> 2],
						hx = (ib >>> 29 | 0 | sc << 3 | 0) ^ (sc >>> 6 | ib << 26) ^ (sc >>> 19 | ib << 13 | 0),
						ix = (0 | ib << 3 | sc >>> 29) ^ (ib >>> 6 | 0) ^ (ib >>> 19 | 0 | sc << 13 | 0),
						jx = (R.add(($a >>> 8 | Wa << 24 | 0) ^ ($a >>> 7 | Wa << 25) ^ ($a >>> 1 | Wa << 31 | 0), (Wa >>> 8 | 0 | $a << 24 | 0) ^ (Wa >>> 7 | 0) ^ (Wa >>> 1 | 0 | $a << 31 | 0), ec, fc), D[I >> 2]),
						kx = (R.add(jx, D[I + 4 >> 2], Na, Fa), D[I >> 2]),
						uc = (R.add(kx, D[I + 4 >> 2], hx, ix), D[I >> 2]),
						kb = D[I + 4 >> 2],
						lx = (jb >>> 29 | 0 | tc << 3 | 0) ^ (tc >>> 6 | jb << 26) ^ (tc >>> 19 | jb << 13 | 0),
						mx = (0 | jb << 3 | tc >>> 29) ^ (jb >>> 6 | 0) ^ (jb >>> 19 | 0 | tc << 13 | 0),
						nx = (R.add((gc >>> 8 | hc << 24 | 0) ^ (gc >>> 7 | hc << 25) ^ (gc >>> 1 | hc << 31 | 0), (hc >>> 8 | 0 | gc << 24 | 0) ^ (hc >>> 7 | 0) ^ (hc >>> 1 | 0 | gc << 31 | 0), $a, Wa), D[I >> 2]),
						ox = (R.add(nx, D[I + 4 >> 2], Ia, va), D[I >> 2]),
						vc = (R.add(ox, D[I + 4 >> 2], lx, mx), D[I >> 2]),
						lb = D[I + 4 >> 2],
						px = (kb >>> 29 | 0 | uc << 3 | 0) ^ (uc >>> 6 | kb << 26) ^ (uc >>> 19 | kb << 13 | 0),
						qx = (0 | kb << 3 | uc >>> 29) ^ (kb >>> 6 | 0) ^ (kb >>> 19 | 0 | uc << 13 | 0),
						rx = (R.add((Xa >>> 8 | ab << 24 | 0) ^ (Xa >>> 7 | ab << 25) ^ (Xa >>> 1 | ab << 31 | 0), (ab >>> 8 | 0 | Xa << 24 | 0) ^ (ab >>> 7 | 0) ^ (ab >>> 1 | 0 | Xa << 31 | 0), gc, hc), D[I >> 2]),
						sx = (R.add(rx, D[I + 4 >> 2], pc, fb), D[I >> 2]),
						wc = (R.add(sx, D[I + 4 >> 2], px, qx), D[I >> 2]),
						mb = D[I + 4 >> 2],
						tx = (lb >>> 29 | 0 | vc << 3 | 0) ^ (vc >>> 6 | lb << 26) ^ (vc >>> 19 | lb << 13 | 0),
						ux = (0 | lb << 3 | vc >>> 29) ^ (lb >>> 6 | 0) ^ (lb >>> 19 | 0 | vc << 13 | 0),
						vx = (R.add((Ka >>> 8 | bb << 24 | 0) ^ (Ka >>> 7 | bb << 25) ^ (Ka >>> 1 | bb << 31 | 0), (bb >>> 8 | 0 | Ka << 24 | 0) ^ (bb >>> 7 | 0) ^ (bb >>> 1 | 0 | Ka << 31 | 0), Xa, ab), D[I >> 2]),
						wx = (R.add(vx, D[I + 4 >> 2], qc, gb), D[I >> 2]),
						xc = (R.add(wx, D[I + 4 >> 2], tx, ux), D[I >> 2]),
						nb = D[I + 4 >> 2],
						xx = (mb >>> 29 | 0 | wc << 3 | 0) ^ (wc >>> 6 | mb << 26) ^ (wc >>> 19 | mb << 13 | 0),
						yx = (0 | mb << 3 | wc >>> 29) ^ (mb >>> 6 | 0) ^ (mb >>> 19 | 0 | wc << 13 | 0),
						zx = (R.add((cb >>> 8 | db << 24 | 0) ^ (cb >>> 7 | db << 25) ^ (cb >>> 1 | db << 31 | 0), (db >>> 8 | 0 | cb << 24 | 0) ^ (db >>> 7 | 0) ^ (db >>> 1 | 0 | cb << 31 | 0), Ka, bb), D[I >> 2]),
						Ax = (R.add(zx, D[I + 4 >> 2], rc, hb), D[I >> 2]),
						yc = (R.add(Ax, D[I + 4 >> 2], xx, yx), D[I >> 2]),
						ob = D[I + 4 >> 2],
						Bx = (nb >>> 29 | 0 | xc << 3 | 0) ^ (xc >>> 6 | nb << 26) ^ (xc >>> 19 | nb << 13 | 0),
						Cx = (0 | nb << 3 | xc >>> 29) ^ (nb >>> 6 | 0) ^ (nb >>> 19 | 0 | xc << 13 | 0),
						Dx = (R.add((Ha >>> 8 | Ya << 24 | 0) ^ (Ha >>> 7 | Ya << 25) ^ (Ha >>> 1 | Ya << 31 | 0), (Ya >>> 8 | 0 | Ha << 24 | 0) ^ (Ya >>> 7 | 0) ^ (Ya >>> 1 | 0 | Ha << 31 | 0), cb, db), D[I >> 2]),
						Ex = (R.add(Dx, D[I + 4 >> 2], sc, ib), D[I >> 2]),
						zc = (R.add(Ex, D[I + 4 >> 2], Bx, Cx), D[I >> 2]),
						pb = D[I + 4 >> 2],
						Fx = (ob >>> 29 | 0 | yc << 3 | 0) ^ (yc >>> 6 | ob << 26) ^ (yc >>> 19 | ob << 13 | 0),
						Gx = (0 | ob << 3 | yc >>> 29) ^ (ob >>> 6 | 0) ^ (ob >>> 19 | 0 | yc << 13 | 0),
						Hx = (R.add((La >>> 8 | Za << 24 | 0) ^ (La >>> 7 | Za << 25) ^ (La >>> 1 | Za << 31 | 0), (Za >>> 8 | 0 | La << 24 | 0) ^ (Za >>> 7 | 0) ^ (Za >>> 1 | 0 | La << 31 | 0), Ha, Ya), D[I >> 2]),
						Ix = (R.add(Hx, D[I + 4 >> 2], tc, jb), D[I >> 2]),
						Ac = (R.add(Ix, D[I + 4 >> 2], Fx, Gx), D[I >> 2]),
						qb = D[I + 4 >> 2],
						Jx = (pb >>> 29 | 0 | zc << 3 | 0) ^ (zc >>> 6 | pb << 26) ^ (zc >>> 19 | pb << 13 | 0),
						Kx = (0 | pb << 3 | zc >>> 29) ^ (pb >>> 6 | 0) ^ (pb >>> 19 | 0 | zc << 13 | 0),
						Lx = (R.add((ic >>> 8 | eb << 24 | 0) ^ (ic >>> 7 | eb << 25) ^ (ic >>> 1 | eb << 31 | 0), (eb >>> 8 | 0 | ic << 24 | 0) ^ (eb >>> 7 | 0) ^ (eb >>> 1 | 0 | ic << 31 | 0), La, Za), D[I >> 2]),
						Mx = (R.add(Lx, D[I + 4 >> 2], uc, kb), D[I >> 2]),
						Bc = (R.add(Mx, D[I + 4 >> 2], Jx, Kx), D[I >> 2]),
						rb = D[I + 4 >> 2],
						Nx = (qb >>> 29 | 0 | Ac << 3 | 0) ^ (Ac >>> 6 | qb << 26) ^ (Ac >>> 19 | qb << 13 | 0),
						Ox = (0 | qb << 3 | Ac >>> 29) ^ (qb >>> 6 | 0) ^ (qb >>> 19 | 0 | Ac << 13 | 0),
						Px = (R.add((Na >>> 8 | Fa << 24 | 0) ^ (Na >>> 7 | Fa << 25) ^ (Na >>> 1 | Fa << 31 | 0), (Fa >>> 8 | 0 | Na << 24 | 0) ^ (Fa >>> 7 | 0) ^ (Fa >>> 1 | 0 | Na << 31 | 0), ic, eb), D[I >> 2]),
						Qx = (R.add(Px, D[I + 4 >> 2], vc, lb), D[I >> 2]),
						Cc = (R.add(Qx, D[I + 4 >> 2], Nx, Ox), D[I >> 2]),
						sb = D[I + 4 >> 2],
						Rx = (rb >>> 29 | 0 | Bc << 3 | 0) ^ (Bc >>> 6 | rb << 26) ^ (Bc >>> 19 | rb << 13 | 0),
						Sx = (0 | rb << 3 | Bc >>> 29) ^ (rb >>> 6 | 0) ^ (rb >>> 19 | 0 | Bc << 13 | 0),
						Tx = (R.add((Ia >>> 8 | va << 24 | 0) ^ (Ia >>> 7 | va << 25) ^ (Ia >>> 1 | va << 31 | 0), (va >>> 8 | 0 | Ia << 24 | 0) ^ (va >>> 7 | 0) ^ (va >>> 1 | 0 | Ia << 31 | 0), Na, Fa), D[I >> 2]),
						Ux = (R.add(Tx, D[I + 4 >> 2], wc, mb), D[I >> 2]),
						Dc = (R.add(Ux, D[I + 4 >> 2], Rx, Sx), D[I >> 2]),
						tb = D[I + 4 >> 2],
						Vx = (sb >>> 29 | 0 | Cc << 3 | 0) ^ (Cc >>> 6 | sb << 26) ^ (Cc >>> 19 | sb << 13 | 0),
						Wx = (0 | sb << 3 | Cc >>> 29) ^ (sb >>> 6 | 0) ^ (sb >>> 19 | 0 | Cc << 13 | 0),
						Xx = (R.add((pc >>> 8 | fb << 24 | 0) ^ (pc >>> 7 | fb << 25) ^ (pc >>> 1 | fb << 31 | 0), (fb >>> 8 | 0 | pc << 24 | 0) ^ (fb >>> 7 | 0) ^ (fb >>> 1 | 0 | pc << 31 | 0), Ia, va), D[I >> 2]),
						Yx = (R.add(Xx, D[I + 4 >> 2], xc, nb), D[I >> 2]),
						Ec = (R.add(Yx, D[I + 4 >> 2], Vx, Wx), D[I >> 2]),
						ub = D[I + 4 >> 2],
						Zx = (ye >>> 18 | ze << 14 | 0) ^ (ze >>> 9 | 0 | ye << 23 | 0) ^ (ye >>> 14 | ze << 18 | 0),
						$x = (ze >>> 18 | 0 | ye << 14 | 0) ^ (0 | ze << 23 | ye >>> 9) ^ (ze >>> 14 | 0 | ye << 18 | 0),
						ay = ye & ue ^ qe & (ye ^ -1),
						by = ze & ve ^ re & (ze ^ -1),
						cy = (R.add(pc, fb, -1628353838, -459576895), D[I >> 2]),
						dy = (R.add(cy, D[I + 4 >> 2], me, ne), D[I >> 2]),
						ey = (R.add(dy, D[I + 4 >> 2], ay, by), D[I >> 2]),
						wn = (R.add(ey, D[I + 4 >> 2], Zx, $x), D[I >> 2]),
						xn = D[I + 4 >> 2],
						fy = (Be >>> 2 | 0 | Ae << 30 | 0) ^ (Be >>> 7 | 0 | Ae << 25 | 0) ^ (Ae >>> 28 | Be << 4 | 0),
						gy = (0 | Be << 30 | Ae >>> 2) ^ (0 | Be << 25 | Ae >>> 7) ^ (Be >>> 28 | 0 | Ae << 4 | 0),
						yn = Ae & we,
						zn = Be & xe,
						hy = Ae & se ^ un ^ yn,
						iy = Be & te ^ vn ^ zn,
						Ce = (R.add(wn, xn, oe, pe), D[I >> 2]),
						De = D[I + 4 >> 2],
						jy = (R.add(fy, gy, hy, iy), D[I >> 2]),
						Ee = (R.add(jy, D[I + 4 >> 2], wn, xn), D[I >> 2]),
						Fe = D[I + 4 >> 2],
						ky = (Ce >>> 18 | De << 14 | 0) ^ (De >>> 9 | 0 | Ce << 23 | 0) ^ (Ce >>> 14 | De << 18 | 0),
						ly = (De >>> 18 | 0 | Ce << 14 | 0) ^ (0 | De << 23 | Ce >>> 9) ^ (De >>> 14 | 0 | Ce << 18 | 0),
						my = Ce & ye ^ ue & (Ce ^ -1),
						ny = De & ze ^ ve & (De ^ -1),
						oy = (R.add(qc, gb, 944711139, -272742522), D[I >> 2]),
						py = (R.add(oy, D[I + 4 >> 2], qe, re), D[I >> 2]),
						qy = (R.add(py, D[I + 4 >> 2], my, ny), D[I >> 2]),
						An = (R.add(qy, D[I + 4 >> 2], ky, ly), D[I >> 2]),
						Bn = D[I + 4 >> 2],
						ry = (Fe >>> 2 | 0 | Ee << 30 | 0) ^ (Fe >>> 7 | 0 | Ee << 25 | 0) ^ (Ee >>> 28 | Fe << 4 | 0),
						sy = (0 | Fe << 30 | Ee >>> 2) ^ (0 | Fe << 25 | Ee >>> 7) ^ (Fe >>> 28 | 0 | Ee << 4 | 0),
						Cn = Ee & Ae,
						Dn = Fe & Be,
						ty = Ee & we ^ yn ^ Cn,
						uy = Fe & xe ^ zn ^ Dn,
						Ge = (R.add(An, Bn, se, te), D[I >> 2]),
						He = D[I + 4 >> 2],
						vy = (R.add(ry, sy, ty, uy), D[I >> 2]),
						Ie = (R.add(vy, D[I + 4 >> 2], An, Bn), D[I >> 2]),
						Je = D[I + 4 >> 2],
						wy = (Ge >>> 18 | He << 14 | 0) ^ (He >>> 9 | 0 | Ge << 23 | 0) ^ (Ge >>> 14 | He << 18 | 0),
						xy = (He >>> 18 | 0 | Ge << 14 | 0) ^ (0 | He << 23 | Ge >>> 9) ^ (He >>> 14 | 0 | Ge << 18 | 0),
						yy = Ge & Ce ^ ye & (Ge ^ -1),
						zy = He & De ^ ze & (He ^ -1),
						Ay = (R.add(rc, hb, -1953704523, 264347078), D[I >> 2]),
						By = (R.add(Ay, D[I + 4 >> 2], ue, ve), D[I >> 2]),
						Cy = (R.add(By, D[I + 4 >> 2], yy, zy), D[I >> 2]),
						En = (R.add(Cy, D[I + 4 >> 2], wy, xy), D[I >> 2]),
						Fn = D[I + 4 >> 2],
						Dy = (Je >>> 2 | 0 | Ie << 30 | 0) ^ (Je >>> 7 | 0 | Ie << 25 | 0) ^ (Ie >>> 28 | Je << 4 | 0),
						Ey = (0 | Je << 30 | Ie >>> 2) ^ (0 | Je << 25 | Ie >>> 7) ^ (Je >>> 28 | 0 | Ie << 4 | 0),
						Gn = Ie & Ee,
						Hn = Je & Fe,
						Fy = Ie & Ae ^ Cn ^ Gn,
						Gy = Je & Be ^ Dn ^ Hn,
						Ke = (R.add(En, Fn, we, xe), D[I >> 2]),
						Le = D[I + 4 >> 2],
						Hy = (R.add(Dy, Ey, Fy, Gy), D[I >> 2]),
						Me = (R.add(Hy, D[I + 4 >> 2], En, Fn), D[I >> 2]),
						Ne = D[I + 4 >> 2],
						Iy = (Ke >>> 18 | Le << 14 | 0) ^ (Le >>> 9 | 0 | Ke << 23 | 0) ^ (Ke >>> 14 | Le << 18 | 0),
						Jy = (Le >>> 18 | 0 | Ke << 14 | 0) ^ (0 | Le << 23 | Ke >>> 9) ^ (Le >>> 14 | 0 | Ke << 18 | 0),
						Ky = Ke & Ge ^ Ce & (Ke ^ -1),
						Ly = Le & He ^ De & (Le ^ -1),
						My = (R.add(sc, ib, 2007800933, 604807628), D[I >> 2]),
						Ny = (R.add(My, D[I + 4 >> 2], ye, ze), D[I >> 2]),
						Oy = (R.add(Ny, D[I + 4 >> 2], Ky, Ly), D[I >> 2]),
						In = (R.add(Oy, D[I + 4 >> 2], Iy, Jy), D[I >> 2]),
						Jn = D[I + 4 >> 2],
						Py = (Ne >>> 2 | 0 | Me << 30 | 0) ^ (Ne >>> 7 | 0 | Me << 25 | 0) ^ (Me >>> 28 | Ne << 4 | 0),
						Qy = (0 | Ne << 30 | Me >>> 2) ^ (0 | Ne << 25 | Me >>> 7) ^ (Ne >>> 28 | 0 | Me << 4 | 0),
						Kn = Me & Ie,
						Ln = Ne & Je,
						Ry = Me & Ee ^ Gn ^ Kn,
						Sy = Ne & Fe ^ Hn ^ Ln,
						Oe = (R.add(In, Jn, Ae, Be), D[I >> 2]),
						Pe = D[I + 4 >> 2],
						Ty = (R.add(Py, Qy, Ry, Sy), D[I >> 2]),
						Qe = (R.add(Ty, D[I + 4 >> 2], In, Jn), D[I >> 2]),
						Re = D[I + 4 >> 2],
						Uy = (Oe >>> 18 | Pe << 14 | 0) ^ (Pe >>> 9 | 0 | Oe << 23 | 0) ^ (Oe >>> 14 | Pe << 18 | 0),
						Vy = (Pe >>> 18 | 0 | Oe << 14 | 0) ^ (0 | Pe << 23 | Oe >>> 9) ^ (Pe >>> 14 | 0 | Oe << 18 | 0),
						Wy = Oe & Ke ^ Ge & (Oe ^ -1),
						Xy = Pe & Le ^ He & (Pe ^ -1),
						Yy = (R.add(tc, jb, 1495990901, 770255983), D[I >> 2]),
						Zy = (R.add(Yy, D[I + 4 >> 2], Ce, De), D[I >> 2]),
						$y = (R.add(Zy, D[I + 4 >> 2], Wy, Xy), D[I >> 2]),
						Mn = (R.add($y, D[I + 4 >> 2], Uy, Vy), D[I >> 2]),
						Nn = D[I + 4 >> 2],
						az = (Re >>> 2 | 0 | Qe << 30 | 0) ^ (Re >>> 7 | 0 | Qe << 25 | 0) ^ (Qe >>> 28 | Re << 4 | 0),
						bz = (0 | Re << 30 | Qe >>> 2) ^ (0 | Re << 25 | Qe >>> 7) ^ (Re >>> 28 | 0 | Qe << 4 | 0),
						On = Qe & Me,
						Pn = Re & Ne,
						cz = Qe & Ie ^ Kn ^ On,
						dz = Re & Je ^ Ln ^ Pn,
						Se = (R.add(Mn, Nn, Ee, Fe), D[I >> 2]),
						Te = D[I + 4 >> 2],
						ez = (R.add(az, bz, cz, dz), D[I >> 2]),
						Ue = (R.add(ez, D[I + 4 >> 2], Mn, Nn), D[I >> 2]),
						Ve = D[I + 4 >> 2],
						fz = (Se >>> 18 | Te << 14 | 0) ^ (Te >>> 9 | 0 | Se << 23 | 0) ^ (Se >>> 14 | Te << 18 | 0),
						gz = (Te >>> 18 | 0 | Se << 14 | 0) ^ (0 | Te << 23 | Se >>> 9) ^ (Te >>> 14 | 0 | Se << 18 | 0),
						hz = Se & Oe ^ Ke & (Se ^ -1),
						iz = Te & Pe ^ Le & (Te ^ -1),
						jz = (R.add(uc, kb, 1856431235, 1249150122), D[I >> 2]),
						kz = (R.add(jz, D[I + 4 >> 2], Ge, He), D[I >> 2]),
						lz = (R.add(kz, D[I + 4 >> 2], hz, iz), D[I >> 2]),
						Qn = (R.add(lz, D[I + 4 >> 2], fz, gz), D[I >> 2]),
						Rn = D[I + 4 >> 2],
						mz = (Ve >>> 2 | 0 | Ue << 30 | 0) ^ (Ve >>> 7 | 0 | Ue << 25 | 0) ^ (Ue >>> 28 | Ve << 4 | 0),
						nz = (0 | Ve << 30 | Ue >>> 2) ^ (0 | Ve << 25 | Ue >>> 7) ^ (Ve >>> 28 | 0 | Ue << 4 | 0),
						Sn = Ue & Qe,
						Tn = Ve & Re,
						oz = Ue & Me ^ On ^ Sn,
						pz = Ve & Ne ^ Pn ^ Tn,
						We = (R.add(Qn, Rn, Ie, Je), D[I >> 2]),
						Xe = D[I + 4 >> 2],
						qz = (R.add(mz, nz, oz, pz), D[I >> 2]),
						Ye = (R.add(qz, D[I + 4 >> 2], Qn, Rn), D[I >> 2]),
						Ze = D[I + 4 >> 2],
						rz = (We >>> 18 | Xe << 14 | 0) ^ (Xe >>> 9 | 0 | We << 23 | 0) ^ (We >>> 14 | Xe << 18 | 0),
						sz = (Xe >>> 18 | 0 | We << 14 | 0) ^ (0 | Xe << 23 | We >>> 9) ^ (Xe >>> 14 | 0 | We << 18 | 0),
						tz = We & Se ^ Oe & (We ^ -1),
						uz = Xe & Te ^ Pe & (Xe ^ -1),
						vz = (R.add(vc, lb, -1119749164, 1555081692), D[I >> 2]),
						wz = (R.add(vz, D[I + 4 >> 2], Ke, Le), D[I >> 2]),
						xz = (R.add(wz, D[I + 4 >> 2], tz, uz), D[I >> 2]),
						Un = (R.add(xz, D[I + 4 >> 2], rz, sz), D[I >> 2]),
						Vn = D[I + 4 >> 2],
						yz = (Ze >>> 2 | 0 | Ye << 30 | 0) ^ (Ze >>> 7 | 0 | Ye << 25 | 0) ^ (Ye >>> 28 | Ze << 4 | 0),
						zz = (0 | Ze << 30 | Ye >>> 2) ^ (0 | Ze << 25 | Ye >>> 7) ^ (Ze >>> 28 | 0 | Ye << 4 | 0),
						Wn = Ye & Ue,
						Xn = Ze & Ve,
						Az = Ye & Qe ^ Sn ^ Wn,
						Bz = Ze & Re ^ Tn ^ Xn,
						$e = (R.add(Un, Vn, Me, Ne), D[I >> 2]),
						af = D[I + 4 >> 2],
						Cz = (R.add(yz, zz, Az, Bz), D[I >> 2]),
						bf = (R.add(Cz, D[I + 4 >> 2], Un, Vn), D[I >> 2]),
						cf = D[I + 4 >> 2],
						Dz = ($e >>> 18 | af << 14 | 0) ^ (af >>> 9 | 0 | $e << 23 | 0) ^ ($e >>> 14 | af << 18 | 0),
						Ez = (af >>> 18 | 0 | $e << 14 | 0) ^ (0 | af << 23 | $e >>> 9) ^ (af >>> 14 | 0 | $e << 18 | 0),
						Fz = $e & We ^ Se & ($e ^ -1),
						Gz = af & Xe ^ Te & (af ^ -1),
						Hz = (R.add(wc, mb, -2096016459, 1996064986), D[I >> 2]),
						Iz = (R.add(Hz, D[I + 4 >> 2], Oe, Pe), D[I >> 2]),
						Jz = (R.add(Iz, D[I + 4 >> 2], Fz, Gz), D[I >> 2]),
						Yn = (R.add(Jz, D[I + 4 >> 2], Dz, Ez), D[I >> 2]),
						Zn = D[I + 4 >> 2],
						Kz = (cf >>> 2 | 0 | bf << 30 | 0) ^ (cf >>> 7 | 0 | bf << 25 | 0) ^ (bf >>> 28 | cf << 4 | 0),
						Lz = (0 | cf << 30 | bf >>> 2) ^ (0 | cf << 25 | bf >>> 7) ^ (cf >>> 28 | 0 | bf << 4 | 0),
						$n = bf & Ye,
						ao = cf & Ze,
						Mz = bf & Ue ^ Wn ^ $n,
						Nz = cf & Ve ^ Xn ^ ao,
						df = (R.add(Yn, Zn, Qe, Re), D[I >> 2]),
						ef = D[I + 4 >> 2],
						Oz = (R.add(Kz, Lz, Mz, Nz), D[I >> 2]),
						ff = (R.add(Oz, D[I + 4 >> 2], Yn, Zn), D[I >> 2]),
						gf = D[I + 4 >> 2],
						Pz = (df >>> 18 | ef << 14 | 0) ^ (ef >>> 9 | 0 | df << 23 | 0) ^ (df >>> 14 | ef << 18 | 0),
						Qz = (ef >>> 18 | 0 | df << 14 | 0) ^ (0 | ef << 23 | df >>> 9) ^ (ef >>> 14 | 0 | df << 18 | 0),
						Rz = df & $e ^ We & (df ^ -1),
						Sz = ef & af ^ Xe & (ef ^ -1),
						Tz = (R.add(xc, nb, -295247957, -1740746414), D[I >> 2]),
						Uz = (R.add(Tz, D[I + 4 >> 2], Se, Te), D[I >> 2]),
						Vz = (R.add(Uz, D[I + 4 >> 2], Rz, Sz), D[I >> 2]),
						bo = (R.add(Vz, D[I + 4 >> 2], Pz, Qz), D[I >> 2]),
						co = D[I + 4 >> 2],
						Wz = (gf >>> 2 | 0 | ff << 30 | 0) ^ (gf >>> 7 | 0 | ff << 25 | 0) ^ (ff >>> 28 | gf << 4 | 0),
						Xz = (0 | gf << 30 | ff >>> 2) ^ (0 | gf << 25 | ff >>> 7) ^ (gf >>> 28 | 0 | ff << 4 | 0),
						eo = ff & bf,
						fo = gf & cf,
						Yz = ff & Ye ^ $n ^ eo,
						Zz = gf & Ze ^ ao ^ fo,
						hf = (R.add(bo, co, Ue, Ve), D[I >> 2]),
						jf = D[I + 4 >> 2],
						$z = (R.add(Wz, Xz, Yz, Zz), D[I >> 2]),
						kf = (R.add($z, D[I + 4 >> 2], bo, co), D[I >> 2]),
						lf = D[I + 4 >> 2],
						aA = (hf >>> 18 | jf << 14 | 0) ^ (jf >>> 9 | 0 | hf << 23 | 0) ^ (hf >>> 14 | jf << 18 | 0),
						bA = (jf >>> 18 | 0 | hf << 14 | 0) ^ (0 | jf << 23 | hf >>> 9) ^ (jf >>> 14 | 0 | hf << 18 | 0),
						cA = hf & df ^ $e & (hf ^ -1),
						dA = jf & ef ^ af & (jf ^ -1),
						eA = (R.add(yc, ob, 766784016, -1473132947), D[I >> 2]),
						fA = (R.add(eA, D[I + 4 >> 2], We, Xe), D[I >> 2]),
						gA = (R.add(fA, D[I + 4 >> 2], cA, dA), D[I >> 2]),
						go = (R.add(gA, D[I + 4 >> 2], aA, bA), D[I >> 2]),
						ho = D[I + 4 >> 2],
						hA = (lf >>> 2 | 0 | kf << 30 | 0) ^ (lf >>> 7 | 0 | kf << 25 | 0) ^ (kf >>> 28 | lf << 4 | 0),
						iA = (0 | lf << 30 | kf >>> 2) ^ (0 | lf << 25 | kf >>> 7) ^ (lf >>> 28 | 0 | kf << 4 | 0),
						io = kf & ff,
						jo = lf & gf,
						jA = kf & bf ^ eo ^ io,
						kA = lf & cf ^ fo ^ jo,
						mf = (R.add(go, ho, Ye, Ze), D[I >> 2]),
						nf = D[I + 4 >> 2],
						lA = (R.add(hA, iA, jA, kA), D[I >> 2]),
						of = (R.add(lA, D[I + 4 >> 2], go, ho), D[I >> 2]),
						pf = D[I + 4 >> 2],
						mA = (mf >>> 18 | nf << 14 | 0) ^ (nf >>> 9 | 0 | mf << 23 | 0) ^ (mf >>> 14 | nf << 18 | 0),
						nA = (nf >>> 18 | 0 | mf << 14 | 0) ^ (0 | nf << 23 | mf >>> 9) ^ (nf >>> 14 | 0 | mf << 18 | 0),
						oA = mf & hf ^ df & (mf ^ -1),
						pA = nf & jf ^ ef & (nf ^ -1),
						qA = (R.add(zc, pb, -1728372417, -1341970488), D[I >> 2]),
						rA = (R.add(qA, D[I + 4 >> 2], $e, af), D[I >> 2]),
						sA = (R.add(rA, D[I + 4 >> 2], oA, pA), D[I >> 2]),
						ko = (R.add(sA, D[I + 4 >> 2], mA, nA), D[I >> 2]),
						lo = D[I + 4 >> 2],
						tA = (pf >>> 2 | 0 | of << 30 | 0) ^ (pf >>> 7 | 0 | of << 25 | 0) ^ (of >>> 28 | pf << 4 | 0),
						uA = (0 | pf << 30 | of >>> 2) ^ (0 | pf << 25 | of >>> 7) ^ (pf >>> 28 | 0 | of << 4 | 0),
						mo = of & kf,
						no = pf & lf,
						vA = of & ff ^ io ^ mo,
						wA = pf & gf ^ jo ^ no,
						qf = (R.add(ko, lo, bf, cf), D[I >> 2]),
						rf = D[I + 4 >> 2],
						xA = (R.add(tA, uA, vA, wA), D[I >> 2]),
						sf = (R.add(xA, D[I + 4 >> 2], ko, lo), D[I >> 2]),
						tf = D[I + 4 >> 2],
						yA = (qf >>> 18 | rf << 14 | 0) ^ (rf >>> 9 | 0 | qf << 23 | 0) ^ (qf >>> 14 | rf << 18 | 0),
						zA = (rf >>> 18 | 0 | qf << 14 | 0) ^ (0 | rf << 23 | qf >>> 9) ^ (rf >>> 14 | 0 | qf << 18 | 0),
						AA = qf & mf ^ hf & (qf ^ -1),
						BA = rf & nf ^ jf & (rf ^ -1),
						CA = (R.add(Ac, qb, -1091629340, -1084653625), D[I >> 2]),
						DA = (R.add(CA, D[I + 4 >> 2], df, ef), D[I >> 2]),
						EA = (R.add(DA, D[I + 4 >> 2], AA, BA), D[I >> 2]),
						oo = (R.add(EA, D[I + 4 >> 2], yA, zA), D[I >> 2]),
						po = D[I + 4 >> 2],
						FA = (tf >>> 2 | 0 | sf << 30 | 0) ^ (tf >>> 7 | 0 | sf << 25 | 0) ^ (sf >>> 28 | tf << 4 | 0),
						GA = (0 | tf << 30 | sf >>> 2) ^ (0 | tf << 25 | sf >>> 7) ^ (tf >>> 28 | 0 | sf << 4 | 0),
						qo = sf & of,
						ro = tf & pf,
						HA = sf & kf ^ mo ^ qo,
						IA = tf & lf ^ no ^ ro,
						uf = (R.add(oo, po, ff, gf), D[I >> 2]),
						vf = D[I + 4 >> 2],
						JA = (R.add(FA, GA, HA, IA), D[I >> 2]),
						wf = (R.add(JA, D[I + 4 >> 2], oo, po), D[I >> 2]),
						xf = D[I + 4 >> 2],
						KA = (uf >>> 18 | vf << 14 | 0) ^ (vf >>> 9 | 0 | uf << 23 | 0) ^ (uf >>> 14 | vf << 18 | 0),
						LA = (vf >>> 18 | 0 | uf << 14 | 0) ^ (0 | vf << 23 | uf >>> 9) ^ (vf >>> 14 | 0 | uf << 18 | 0),
						MA = uf & qf ^ mf & (uf ^ -1),
						NA = vf & rf ^ nf & (vf ^ -1),
						OA = (R.add(Bc, rb, 1034457026, -958395405), D[I >> 2]),
						PA = (R.add(OA, D[I + 4 >> 2], hf, jf), D[I >> 2]),
						QA = (R.add(PA, D[I + 4 >> 2], MA, NA), D[I >> 2]),
						so = (R.add(QA, D[I + 4 >> 2], KA, LA), D[I >> 2]),
						to = D[I + 4 >> 2],
						RA = (xf >>> 2 | 0 | wf << 30 | 0) ^ (xf >>> 7 | 0 | wf << 25 | 0) ^ (wf >>> 28 | xf << 4 | 0),
						SA = (0 | xf << 30 | wf >>> 2) ^ (0 | xf << 25 | wf >>> 7) ^ (xf >>> 28 | 0 | wf << 4 | 0),
						uo = wf & sf,
						vo = xf & tf,
						TA = wf & of ^ qo ^ uo,
						UA = xf & pf ^ ro ^ vo,
						yf = (R.add(so, to, kf, lf), D[I >> 2]),
						zf = D[I + 4 >> 2],
						VA = (R.add(RA, SA, TA, UA), D[I >> 2]),
						Af = (R.add(VA, D[I + 4 >> 2], so, to), D[I >> 2]),
						Bf = D[I + 4 >> 2],
						WA = (yf >>> 18 | zf << 14 | 0) ^ (zf >>> 9 | 0 | yf << 23 | 0) ^ (yf >>> 14 | zf << 18 | 0),
						XA = (zf >>> 18 | 0 | yf << 14 | 0) ^ (0 | zf << 23 | yf >>> 9) ^ (zf >>> 14 | 0 | yf << 18 | 0),
						YA = yf & uf ^ qf & (yf ^ -1),
						ZA = zf & vf ^ rf & (zf ^ -1),
						$A = (R.add(Cc, sb, -1828018395, -710438585), D[I >> 2]),
						aB = (R.add($A, D[I + 4 >> 2], mf, nf), D[I >> 2]),
						bB = (R.add(aB, D[I + 4 >> 2], YA, ZA), D[I >> 2]),
						wo = (R.add(bB, D[I + 4 >> 2], WA, XA), D[I >> 2]),
						xo = D[I + 4 >> 2],
						cB = (Bf >>> 2 | 0 | Af << 30 | 0) ^ (Bf >>> 7 | 0 | Af << 25 | 0) ^ (Af >>> 28 | Bf << 4 | 0),
						dB = (0 | Bf << 30 | Af >>> 2) ^ (0 | Bf << 25 | Af >>> 7) ^ (Bf >>> 28 | 0 | Af << 4 | 0),
						yo = Af & wf,
						zo = Bf & xf,
						eB = Af & sf ^ uo ^ yo,
						fB = Bf & tf ^ vo ^ zo,
						Cf = (R.add(wo, xo, of, pf), D[I >> 2]),
						Df = D[I + 4 >> 2],
						gB = (R.add(cB, dB, eB, fB), D[I >> 2]),
						Ef = (R.add(gB, D[I + 4 >> 2], wo, xo), D[I >> 2]),
						Ff = D[I + 4 >> 2],
						hB = (Cf >>> 18 | Df << 14 | 0) ^ (Df >>> 9 | 0 | Cf << 23 | 0) ^ (Cf >>> 14 | Df << 18 | 0),
						iB = (Df >>> 18 | 0 | Cf << 14 | 0) ^ (0 | Df << 23 | Cf >>> 9) ^ (Df >>> 14 | 0 | Cf << 18 | 0),
						jB = Cf & yf ^ uf & (Cf ^ -1),
						kB = Df & zf ^ vf & (Df ^ -1),
						lB = (R.add(Dc, tb, -536640913, 113926993), D[I >> 2]),
						mB = (R.add(lB, D[I + 4 >> 2], qf, rf), D[I >> 2]),
						nB = (R.add(mB, D[I + 4 >> 2], jB, kB), D[I >> 2]),
						Ao = (R.add(nB, D[I + 4 >> 2], hB, iB), D[I >> 2]),
						Bo = D[I + 4 >> 2],
						oB = (Ff >>> 2 | 0 | Ef << 30 | 0) ^ (Ff >>> 7 | 0 | Ef << 25 | 0) ^ (Ef >>> 28 | Ff << 4 | 0),
						pB = (0 | Ff << 30 | Ef >>> 2) ^ (0 | Ff << 25 | Ef >>> 7) ^ (Ff >>> 28 | 0 | Ef << 4 | 0),
						Co = Ef & Af,
						Do = Ff & Bf,
						qB = Ef & wf ^ yo ^ Co,
						rB = Ff & xf ^ zo ^ Do,
						Gf = (R.add(Ao, Bo, sf, tf), D[I >> 2]),
						Hf = D[I + 4 >> 2],
						sB = (R.add(oB, pB, qB, rB), D[I >> 2]),
						If = (R.add(sB, D[I + 4 >> 2], Ao, Bo), D[I >> 2]),
						Jf = D[I + 4 >> 2],
						tB = (Gf >>> 18 | Hf << 14 | 0) ^ (Hf >>> 9 | 0 | Gf << 23 | 0) ^ (Gf >>> 14 | Hf << 18 | 0),
						uB = (Hf >>> 18 | 0 | Gf << 14 | 0) ^ (0 | Hf << 23 | Gf >>> 9) ^ (Hf >>> 14 | 0 | Gf << 18 | 0),
						vB = Gf & Cf ^ yf & (Gf ^ -1),
						wB = Hf & Df ^ zf & (Hf ^ -1),
						xB = (R.add(Ec, ub, 168717936, 338241895), D[I >> 2]),
						yB = (R.add(xB, D[I + 4 >> 2], uf, vf), D[I >> 2]),
						zB = (R.add(yB, D[I + 4 >> 2], vB, wB), D[I >> 2]),
						Eo = (R.add(zB, D[I + 4 >> 2], tB, uB), D[I >> 2]),
						Fo = D[I + 4 >> 2],
						AB = (Jf >>> 2 | 0 | If << 30 | 0) ^ (Jf >>> 7 | 0 | If << 25 | 0) ^ (If >>> 28 | Jf << 4 | 0),
						BB = (0 | Jf << 30 | If >>> 2) ^ (0 | Jf << 25 | If >>> 7) ^ (Jf >>> 28 | 0 | If << 4 | 0),
						Go = If & Ef,
						Ho = Jf & Ff,
						CB = If & Af ^ Co ^ Go,
						DB = Jf & Bf ^ Do ^ Ho,
						Kf = (R.add(Eo, Fo, wf, xf), D[I >> 2]),
						Lf = D[I + 4 >> 2],
						EB = (R.add(AB, BB, CB, DB), D[I >> 2]),
						Mf = (R.add(EB, D[I + 4 >> 2], Eo, Fo), D[I >> 2]),
						Nf = D[I + 4 >> 2],
						FB = (tb >>> 29 | 0 | Dc << 3 | 0) ^ (Dc >>> 6 | tb << 26) ^ (Dc >>> 19 | tb << 13 | 0),
						GB = (0 | tb << 3 | Dc >>> 29) ^ (tb >>> 6 | 0) ^ (tb >>> 19 | 0 | Dc << 13 | 0),
						HB = (R.add((qc >>> 8 | gb << 24 | 0) ^ (qc >>> 7 | gb << 25) ^ (qc >>> 1 | gb << 31 | 0), (gb >>> 8 | 0 | qc << 24 | 0) ^ (gb >>> 7 | 0) ^ (gb >>> 1 | 0 | qc << 31 | 0), pc, fb), D[I >> 2]),
						IB = (R.add(HB, D[I + 4 >> 2], yc, ob), D[I >> 2]),
						Fc = (R.add(IB, D[I + 4 >> 2], FB, GB), D[I >> 2]),
						vb = D[I + 4 >> 2],
						JB = (ub >>> 29 | 0 | Ec << 3 | 0) ^ (Ec >>> 6 | ub << 26) ^ (Ec >>> 19 | ub << 13 | 0),
						KB = (0 | ub << 3 | Ec >>> 29) ^ (ub >>> 6 | 0) ^ (ub >>> 19 | 0 | Ec << 13 | 0),
						LB = (R.add((rc >>> 8 | hb << 24 | 0) ^ (rc >>> 7 | hb << 25) ^ (rc >>> 1 | hb << 31 | 0), (hb >>> 8 | 0 | rc << 24 | 0) ^ (hb >>> 7 | 0) ^ (hb >>> 1 | 0 | rc << 31 | 0), qc, gb), D[I >> 2]),
						MB = (R.add(LB, D[I + 4 >> 2], zc, pb), D[I >> 2]),
						Gc = (R.add(MB, D[I + 4 >> 2], JB, KB), D[I >> 2]),
						wb = D[I + 4 >> 2],
						NB = (vb >>> 29 | 0 | Fc << 3 | 0) ^ (Fc >>> 6 | vb << 26) ^ (Fc >>> 19 | vb << 13 | 0),
						OB = (0 | vb << 3 | Fc >>> 29) ^ (vb >>> 6 | 0) ^ (vb >>> 19 | 0 | Fc << 13 | 0),
						PB = (R.add((sc >>> 8 | ib << 24 | 0) ^ (sc >>> 7 | ib << 25) ^ (sc >>> 1 | ib << 31 | 0), (ib >>> 8 | 0 | sc << 24 | 0) ^ (ib >>> 7 | 0) ^ (ib >>> 1 | 0 | sc << 31 | 0), rc, hb), D[I >> 2]),
						QB = (R.add(PB, D[I + 4 >> 2], Ac, qb), D[I >> 2]),
						Hc = (R.add(QB, D[I + 4 >> 2], NB, OB), D[I >> 2]),
						xb = D[I + 4 >> 2],
						RB = (wb >>> 29 | 0 | Gc << 3 | 0) ^ (Gc >>> 6 | wb << 26) ^ (Gc >>> 19 | wb << 13 | 0),
						SB = (0 | wb << 3 | Gc >>> 29) ^ (wb >>> 6 | 0) ^ (wb >>> 19 | 0 | Gc << 13 | 0),
						TB = (R.add((tc >>> 8 | jb << 24 | 0) ^ (tc >>> 7 | jb << 25) ^ (tc >>> 1 | jb << 31 | 0), (jb >>> 8 | 0 | tc << 24 | 0) ^ (jb >>> 7 | 0) ^ (jb >>> 1 | 0 | tc << 31 | 0), sc, ib), D[I >> 2]),
						UB = (R.add(TB, D[I + 4 >> 2], Bc, rb), D[I >> 2]),
						Ic = (R.add(UB, D[I + 4 >> 2], RB, SB), D[I >> 2]),
						yb = D[I + 4 >> 2],
						VB = (xb >>> 29 | 0 | Hc << 3 | 0) ^ (Hc >>> 6 | xb << 26) ^ (Hc >>> 19 | xb << 13 | 0),
						WB = (0 | xb << 3 | Hc >>> 29) ^ (xb >>> 6 | 0) ^ (xb >>> 19 | 0 | Hc << 13 | 0),
						XB = (R.add((uc >>> 8 | kb << 24 | 0) ^ (uc >>> 7 | kb << 25) ^ (uc >>> 1 | kb << 31 | 0), (kb >>> 8 | 0 | uc << 24 | 0) ^ (kb >>> 7 | 0) ^ (kb >>> 1 | 0 | uc << 31 | 0), tc, jb), D[I >> 2]),
						YB = (R.add(XB, D[I + 4 >> 2], Cc, sb), D[I >> 2]),
						Jc = (R.add(YB, D[I + 4 >> 2], VB, WB), D[I >> 2]),
						zb = D[I + 4 >> 2],
						ZB = (yb >>> 29 | 0 | Ic << 3 | 0) ^ (Ic >>> 6 | yb << 26) ^ (Ic >>> 19 | yb << 13 | 0),
						$B = (0 | yb << 3 | Ic >>> 29) ^ (yb >>> 6 | 0) ^ (yb >>> 19 | 0 | Ic << 13 | 0),
						aC = (R.add((vc >>> 8 | lb << 24 | 0) ^ (vc >>> 7 | lb << 25) ^ (vc >>> 1 | lb << 31 | 0), (lb >>> 8 | 0 | vc << 24 | 0) ^ (lb >>> 7 | 0) ^ (lb >>> 1 | 0 | vc << 31 | 0), uc, kb), D[I >> 2]),
						bC = (R.add(aC, D[I + 4 >> 2], Dc, tb), D[I >> 2]),
						Kc = (R.add(bC, D[I + 4 >> 2], ZB, $B), D[I >> 2]),
						Ab = D[I + 4 >> 2],
						cC = (zb >>> 29 | 0 | Jc << 3 | 0) ^ (Jc >>> 6 | zb << 26) ^ (Jc >>> 19 | zb << 13 | 0),
						dC = (0 | zb << 3 | Jc >>> 29) ^ (zb >>> 6 | 0) ^ (zb >>> 19 | 0 | Jc << 13 | 0),
						eC = (R.add((wc >>> 8 | mb << 24 | 0) ^ (wc >>> 7 | mb << 25) ^ (wc >>> 1 | mb << 31 | 0), (mb >>> 8 | 0 | wc << 24 | 0) ^ (mb >>> 7 | 0) ^ (mb >>> 1 | 0 | wc << 31 | 0), vc, lb), D[I >> 2]),
						fC = (R.add(eC, D[I + 4 >> 2], Ec, ub), D[I >> 2]),
						Lc = (R.add(fC, D[I + 4 >> 2], cC, dC), D[I >> 2]),
						Bb = D[I + 4 >> 2],
						gC = (Ab >>> 29 | 0 | Kc << 3 | 0) ^ (Kc >>> 6 | Ab << 26) ^ (Kc >>> 19 | Ab << 13 | 0),
						hC = (0 | Ab << 3 | Kc >>> 29) ^ (Ab >>> 6 | 0) ^ (Ab >>> 19 | 0 | Kc << 13 | 0),
						iC = (R.add((xc >>> 8 | nb << 24 | 0) ^ (xc >>> 7 | nb << 25) ^ (xc >>> 1 | nb << 31 | 0), (nb >>> 8 | 0 | xc << 24 | 0) ^ (nb >>> 7 | 0) ^ (nb >>> 1 | 0 | xc << 31 | 0), wc, mb), D[I >> 2]),
						jC = (R.add(iC, D[I + 4 >> 2], Fc, vb), D[I >> 2]),
						Mc = (R.add(jC, D[I + 4 >> 2], gC, hC), D[I >> 2]),
						Cb = D[I + 4 >> 2],
						kC = (Bb >>> 29 | 0 | Lc << 3 | 0) ^ (Lc >>> 6 | Bb << 26) ^ (Lc >>> 19 | Bb << 13 | 0),
						lC = (0 | Bb << 3 | Lc >>> 29) ^ (Bb >>> 6 | 0) ^ (Bb >>> 19 | 0 | Lc << 13 | 0),
						mC = (R.add((yc >>> 8 | ob << 24 | 0) ^ (yc >>> 7 | ob << 25) ^ (yc >>> 1 | ob << 31 | 0), (ob >>> 8 | 0 | yc << 24 | 0) ^ (ob >>> 7 | 0) ^ (ob >>> 1 | 0 | yc << 31 | 0), xc, nb), D[I >> 2]),
						nC = (R.add(mC, D[I + 4 >> 2], Gc, wb), D[I >> 2]),
						Nc = (R.add(nC, D[I + 4 >> 2], kC, lC), D[I >> 2]),
						Db = D[I + 4 >> 2],
						oC = (Cb >>> 29 | 0 | Mc << 3 | 0) ^ (Mc >>> 6 | Cb << 26) ^ (Mc >>> 19 | Cb << 13 | 0),
						pC = (0 | Cb << 3 | Mc >>> 29) ^ (Cb >>> 6 | 0) ^ (Cb >>> 19 | 0 | Mc << 13 | 0),
						qC = (R.add((zc >>> 8 | pb << 24 | 0) ^ (zc >>> 7 | pb << 25) ^ (zc >>> 1 | pb << 31 | 0), (pb >>> 8 | 0 | zc << 24 | 0) ^ (pb >>> 7 | 0) ^ (pb >>> 1 | 0 | zc << 31 | 0), yc, ob), D[I >> 2]),
						rC = (R.add(qC, D[I + 4 >> 2], Hc, xb), D[I >> 2]),
						Oc = (R.add(rC, D[I + 4 >> 2], oC, pC), D[I >> 2]),
						Eb = D[I + 4 >> 2],
						sC = (Db >>> 29 | 0 | Nc << 3 | 0) ^ (Nc >>> 6 | Db << 26) ^ (Nc >>> 19 | Db << 13 | 0),
						tC = (0 | Db << 3 | Nc >>> 29) ^ (Db >>> 6 | 0) ^ (Db >>> 19 | 0 | Nc << 13 | 0),
						uC = (R.add((Ac >>> 8 | qb << 24 | 0) ^ (Ac >>> 7 | qb << 25) ^ (Ac >>> 1 | qb << 31 | 0), (qb >>> 8 | 0 | Ac << 24 | 0) ^ (qb >>> 7 | 0) ^ (qb >>> 1 | 0 | Ac << 31 | 0), zc, pb), D[I >> 2]),
						vC = (R.add(uC, D[I + 4 >> 2], Ic, yb), D[I >> 2]),
						Pc = (R.add(vC, D[I + 4 >> 2], sC, tC), D[I >> 2]),
						Fb = D[I + 4 >> 2],
						wC = (Eb >>> 29 | 0 | Oc << 3 | 0) ^ (Oc >>> 6 | Eb << 26) ^ (Oc >>> 19 | Eb << 13 | 0),
						xC = (0 | Eb << 3 | Oc >>> 29) ^ (Eb >>> 6 | 0) ^ (Eb >>> 19 | 0 | Oc << 13 | 0),
						yC = (R.add((Bc >>> 8 | rb << 24 | 0) ^ (Bc >>> 7 | rb << 25) ^ (Bc >>> 1 | rb << 31 | 0), (rb >>> 8 | 0 | Bc << 24 | 0) ^ (rb >>> 7 | 0) ^ (rb >>> 1 | 0 | Bc << 31 | 0), Ac, qb), D[I >> 2]),
						zC = (R.add(yC, D[I + 4 >> 2], Jc, zb), D[I >> 2]),
						Qc = (R.add(zC, D[I + 4 >> 2], wC, xC), D[I >> 2]),
						Gb = D[I + 4 >> 2],
						AC = (Fb >>> 29 | 0 | Pc << 3 | 0) ^ (Pc >>> 6 | Fb << 26) ^ (Pc >>> 19 | Fb << 13 | 0),
						BC = (0 | Fb << 3 | Pc >>> 29) ^ (Fb >>> 6 | 0) ^ (Fb >>> 19 | 0 | Pc << 13 | 0),
						CC = (R.add((Cc >>> 8 | sb << 24 | 0) ^ (Cc >>> 7 | sb << 25) ^ (Cc >>> 1 | sb << 31 | 0), (sb >>> 8 | 0 | Cc << 24 | 0) ^ (sb >>> 7 | 0) ^ (sb >>> 1 | 0 | Cc << 31 | 0), Bc, rb), D[I >> 2]),
						DC = (R.add(CC, D[I + 4 >> 2], Kc, Ab), D[I >> 2]),
						Rc = (R.add(DC, D[I + 4 >> 2], AC, BC), D[I >> 2]),
						Hb = D[I + 4 >> 2],
						EC = (Gb >>> 29 | 0 | Qc << 3 | 0) ^ (Qc >>> 6 | Gb << 26) ^ (Qc >>> 19 | Gb << 13 | 0),
						FC = (0 | Gb << 3 | Qc >>> 29) ^ (Gb >>> 6 | 0) ^ (Gb >>> 19 | 0 | Qc << 13 | 0),
						GC = (R.add((Dc >>> 8 | tb << 24 | 0) ^ (Dc >>> 7 | tb << 25) ^ (Dc >>> 1 | tb << 31 | 0), (tb >>> 8 | 0 | Dc << 24 | 0) ^ (tb >>> 7 | 0) ^ (tb >>> 1 | 0 | Dc << 31 | 0), Cc, sb), D[I >> 2]),
						HC = (R.add(GC, D[I + 4 >> 2], Lc, Bb), D[I >> 2]),
						Sc = (R.add(HC, D[I + 4 >> 2], EC, FC), D[I >> 2]),
						Ib = D[I + 4 >> 2],
						IC = (Hb >>> 29 | 0 | Rc << 3 | 0) ^ (Rc >>> 6 | Hb << 26) ^ (Rc >>> 19 | Hb << 13 | 0),
						JC = (0 | Hb << 3 | Rc >>> 29) ^ (Hb >>> 6 | 0) ^ (Hb >>> 19 | 0 | Rc << 13 | 0),
						KC = (R.add((Ec >>> 8 | ub << 24 | 0) ^ (Ec >>> 7 | ub << 25) ^ (Ec >>> 1 | ub << 31 | 0), (ub >>> 8 | 0 | Ec << 24 | 0) ^ (ub >>> 7 | 0) ^ (ub >>> 1 | 0 | Ec << 31 | 0), Dc, tb), D[I >> 2]),
						LC = (R.add(KC, D[I + 4 >> 2], Mc, Cb), D[I >> 2]),
						Tc = (R.add(LC, D[I + 4 >> 2], IC, JC), D[I >> 2]),
						Jb = D[I + 4 >> 2],
						MC = (Ib >>> 29 | 0 | Sc << 3 | 0) ^ (Sc >>> 6 | Ib << 26) ^ (Sc >>> 19 | Ib << 13 | 0),
						NC = (0 | Ib << 3 | Sc >>> 29) ^ (Ib >>> 6 | 0) ^ (Ib >>> 19 | 0 | Sc << 13 | 0),
						OC = (R.add((Fc >>> 8 | vb << 24 | 0) ^ (Fc >>> 7 | vb << 25) ^ (Fc >>> 1 | vb << 31 | 0), (vb >>> 8 | 0 | Fc << 24 | 0) ^ (vb >>> 7 | 0) ^ (vb >>> 1 | 0 | Fc << 31 | 0), Ec, ub), D[I >> 2]),
						PC = (R.add(OC, D[I + 4 >> 2], Nc, Db), D[I >> 2]),
						Uc = (R.add(PC, D[I + 4 >> 2], MC, NC), D[I >> 2]),
						Kb = D[I + 4 >> 2],
						QC = (Kf >>> 18 | Lf << 14 | 0) ^ (Lf >>> 9 | 0 | Kf << 23 | 0) ^ (Kf >>> 14 | Lf << 18 | 0),
						RC = (Lf >>> 18 | 0 | Kf << 14 | 0) ^ (0 | Lf << 23 | Kf >>> 9) ^ (Lf >>> 14 | 0 | Kf << 18 | 0),
						SC = Kf & Gf ^ Cf & (Kf ^ -1),
						TC = Lf & Hf ^ Df & (Lf ^ -1),
						UC = (R.add(Fc, vb, 1188179964, 666307205), D[I >> 2]),
						VC = (R.add(UC, D[I + 4 >> 2], yf, zf), D[I >> 2]),
						WC = (R.add(VC, D[I + 4 >> 2], SC, TC), D[I >> 2]),
						Io = (R.add(WC, D[I + 4 >> 2], QC, RC), D[I >> 2]),
						Jo = D[I + 4 >> 2],
						XC = (Nf >>> 2 | 0 | Mf << 30 | 0) ^ (Nf >>> 7 | 0 | Mf << 25 | 0) ^ (Mf >>> 28 | Nf << 4 | 0),
						YC = (0 | Nf << 30 | Mf >>> 2) ^ (0 | Nf << 25 | Mf >>> 7) ^ (Nf >>> 28 | 0 | Mf << 4 | 0),
						Ko = Mf & If,
						Lo = Nf & Jf,
						ZC = Mf & Ef ^ Go ^ Ko,
						$C = Nf & Ff ^ Ho ^ Lo,
						Of = (R.add(Io, Jo, Af, Bf), D[I >> 2]),
						Pf = D[I + 4 >> 2],
						aD = (R.add(XC, YC, ZC, $C), D[I >> 2]),
						Qf = (R.add(aD, D[I + 4 >> 2], Io, Jo), D[I >> 2]),
						Rf = D[I + 4 >> 2],
						bD = (Of >>> 18 | Pf << 14 | 0) ^ (Pf >>> 9 | 0 | Of << 23 | 0) ^ (Of >>> 14 | Pf << 18 | 0),
						cD = (Pf >>> 18 | 0 | Of << 14 | 0) ^ (0 | Pf << 23 | Of >>> 9) ^ (Pf >>> 14 | 0 | Of << 18 | 0),
						dD = Of & Kf ^ Gf & (Of ^ -1),
						eD = Pf & Lf ^ Hf & (Pf ^ -1),
						fD = (R.add(Gc, wb, 1546045734, 773529912), D[I >> 2]),
						gD = (R.add(fD, D[I + 4 >> 2], Cf, Df), D[I >> 2]),
						hD = (R.add(gD, D[I + 4 >> 2], dD, eD), D[I >> 2]),
						Mo = (R.add(hD, D[I + 4 >> 2], bD, cD), D[I >> 2]),
						No = D[I + 4 >> 2],
						iD = (Rf >>> 2 | 0 | Qf << 30 | 0) ^ (Rf >>> 7 | 0 | Qf << 25 | 0) ^ (Qf >>> 28 | Rf << 4 | 0),
						jD = (0 | Rf << 30 | Qf >>> 2) ^ (0 | Rf << 25 | Qf >>> 7) ^ (Rf >>> 28 | 0 | Qf << 4 | 0),
						Oo = Qf & Mf,
						Po = Rf & Nf,
						kD = Qf & If ^ Ko ^ Oo,
						lD = Rf & Jf ^ Lo ^ Po,
						Sf = (R.add(Mo, No, Ef, Ff), D[I >> 2]),
						Tf = D[I + 4 >> 2],
						mD = (R.add(iD, jD, kD, lD), D[I >> 2]),
						Uf = (R.add(mD, D[I + 4 >> 2], Mo, No), D[I >> 2]),
						Vf = D[I + 4 >> 2],
						nD = (Sf >>> 18 | Tf << 14 | 0) ^ (Tf >>> 9 | 0 | Sf << 23 | 0) ^ (Sf >>> 14 | Tf << 18 | 0),
						oD = (Tf >>> 18 | 0 | Sf << 14 | 0) ^ (0 | Tf << 23 | Sf >>> 9) ^ (Tf >>> 14 | 0 | Sf << 18 | 0),
						pD = Sf & Of ^ Kf & (Sf ^ -1),
						qD = Tf & Pf ^ Lf & (Tf ^ -1),
						rD = (R.add(Hc, xb, 1522805485, 1294757372), D[I >> 2]),
						sD = (R.add(rD, D[I + 4 >> 2], Gf, Hf), D[I >> 2]),
						tD = (R.add(sD, D[I + 4 >> 2], pD, qD), D[I >> 2]),
						Qo = (R.add(tD, D[I + 4 >> 2], nD, oD), D[I >> 2]),
						Ro = D[I + 4 >> 2],
						uD = (Vf >>> 2 | 0 | Uf << 30 | 0) ^ (Vf >>> 7 | 0 | Uf << 25 | 0) ^ (Uf >>> 28 | Vf << 4 | 0),
						vD = (0 | Vf << 30 | Uf >>> 2) ^ (0 | Vf << 25 | Uf >>> 7) ^ (Vf >>> 28 | 0 | Uf << 4 | 0),
						So = Uf & Qf,
						To = Vf & Rf,
						wD = Uf & Mf ^ Oo ^ So,
						xD = Vf & Nf ^ Po ^ To,
						Wf = (R.add(Qo, Ro, If, Jf), D[I >> 2]),
						Xf = D[I + 4 >> 2],
						yD = (R.add(uD, vD, wD, xD), D[I >> 2]),
						Yf = (R.add(yD, D[I + 4 >> 2], Qo, Ro), D[I >> 2]),
						Zf = D[I + 4 >> 2],
						zD = (Wf >>> 18 | Xf << 14 | 0) ^ (Xf >>> 9 | 0 | Wf << 23 | 0) ^ (Wf >>> 14 | Xf << 18 | 0),
						AD = (Xf >>> 18 | 0 | Wf << 14 | 0) ^ (0 | Xf << 23 | Wf >>> 9) ^ (Xf >>> 14 | 0 | Wf << 18 | 0),
						BD = Wf & Sf ^ Of & (Wf ^ -1),
						CD = Xf & Tf ^ Pf & (Xf ^ -1),
						DD = (R.add(Ic, yb, -1651133473, 1396182291), D[I >> 2]),
						ED = (R.add(DD, D[I + 4 >> 2], Kf, Lf), D[I >> 2]),
						FD = (R.add(ED, D[I + 4 >> 2], BD, CD), D[I >> 2]),
						Uo = (R.add(FD, D[I + 4 >> 2], zD, AD), D[I >> 2]),
						Vo = D[I + 4 >> 2],
						GD = (Zf >>> 2 | 0 | Yf << 30 | 0) ^ (Zf >>> 7 | 0 | Yf << 25 | 0) ^ (Yf >>> 28 | Zf << 4 | 0),
						HD = (0 | Zf << 30 | Yf >>> 2) ^ (0 | Zf << 25 | Yf >>> 7) ^ (Zf >>> 28 | 0 | Yf << 4 | 0),
						Wo = Yf & Uf,
						Xo = Zf & Vf,
						ID = Yf & Qf ^ So ^ Wo,
						JD = Zf & Rf ^ To ^ Xo,
						$f = (R.add(Uo, Vo, Mf, Nf), D[I >> 2]),
						ag = D[I + 4 >> 2],
						KD = (R.add(GD, HD, ID, JD), D[I >> 2]),
						bg = (R.add(KD, D[I + 4 >> 2], Uo, Vo), D[I >> 2]),
						cg = D[I + 4 >> 2],
						LD = ($f >>> 18 | ag << 14 | 0) ^ (ag >>> 9 | 0 | $f << 23 | 0) ^ ($f >>> 14 | ag << 18 | 0),
						MD = (ag >>> 18 | 0 | $f << 14 | 0) ^ (0 | ag << 23 | $f >>> 9) ^ (ag >>> 14 | 0 | $f << 18 | 0),
						ND = $f & Wf ^ Sf & ($f ^ -1),
						OD = ag & Xf ^ Tf & (ag ^ -1),
						PD = (R.add(Jc, zb, -1951439906, 1695183700), D[I >> 2]),
						QD = (R.add(PD, D[I + 4 >> 2], Of, Pf), D[I >> 2]),
						RD = (R.add(QD, D[I + 4 >> 2], ND, OD), D[I >> 2]),
						Yo = (R.add(RD, D[I + 4 >> 2], LD, MD), D[I >> 2]),
						Zo = D[I + 4 >> 2],
						SD = (cg >>> 2 | 0 | bg << 30 | 0) ^ (cg >>> 7 | 0 | bg << 25 | 0) ^ (bg >>> 28 | cg << 4 | 0),
						TD = (0 | cg << 30 | bg >>> 2) ^ (0 | cg << 25 | bg >>> 7) ^ (cg >>> 28 | 0 | bg << 4 | 0),
						$o = bg & Yf,
						ap = cg & Zf,
						UD = bg & Uf ^ Wo ^ $o,
						VD = cg & Vf ^ Xo ^ ap,
						dg = (R.add(Yo, Zo, Qf, Rf), D[I >> 2]),
						eg = D[I + 4 >> 2],
						WD = (R.add(SD, TD, UD, VD), D[I >> 2]),
						fg = (R.add(WD, D[I + 4 >> 2], Yo, Zo), D[I >> 2]),
						gg = D[I + 4 >> 2],
						XD = (dg >>> 18 | eg << 14 | 0) ^ (eg >>> 9 | 0 | dg << 23 | 0) ^ (dg >>> 14 | eg << 18 | 0),
						YD = (eg >>> 18 | 0 | dg << 14 | 0) ^ (0 | eg << 23 | dg >>> 9) ^ (eg >>> 14 | 0 | dg << 18 | 0),
						ZD = dg & $f ^ Wf & (dg ^ -1),
						$D = eg & ag ^ Xf & (eg ^ -1),
						aE = (R.add(Kc, Ab, 1014477480, 1986661051), D[I >> 2]),
						bE = (R.add(aE, D[I + 4 >> 2], Sf, Tf), D[I >> 2]),
						cE = (R.add(bE, D[I + 4 >> 2], ZD, $D), D[I >> 2]),
						bp = (R.add(cE, D[I + 4 >> 2], XD, YD), D[I >> 2]),
						cp = D[I + 4 >> 2],
						dE = (gg >>> 2 | 0 | fg << 30 | 0) ^ (gg >>> 7 | 0 | fg << 25 | 0) ^ (fg >>> 28 | gg << 4 | 0),
						eE = (0 | gg << 30 | fg >>> 2) ^ (0 | gg << 25 | fg >>> 7) ^ (gg >>> 28 | 0 | fg << 4 | 0),
						dp = fg & bg,
						ep = gg & cg,
						fE = fg & Yf ^ $o ^ dp,
						gE = gg & Zf ^ ap ^ ep,
						hg = (R.add(bp, cp, Uf, Vf), D[I >> 2]),
						ig = D[I + 4 >> 2],
						hE = (R.add(dE, eE, fE, gE), D[I >> 2]),
						jg = (R.add(hE, D[I + 4 >> 2], bp, cp), D[I >> 2]),
						kg = D[I + 4 >> 2],
						iE = (hg >>> 18 | ig << 14 | 0) ^ (ig >>> 9 | 0 | hg << 23 | 0) ^ (hg >>> 14 | ig << 18 | 0),
						jE = (ig >>> 18 | 0 | hg << 14 | 0) ^ (0 | ig << 23 | hg >>> 9) ^ (ig >>> 14 | 0 | hg << 18 | 0),
						kE = hg & dg ^ $f & (hg ^ -1),
						lE = ig & eg ^ ag & (ig ^ -1),
						mE = (R.add(Lc, Bb, 1206759142, -2117940946), D[I >> 2]),
						nE = (R.add(mE, D[I + 4 >> 2], Wf, Xf), D[I >> 2]),
						oE = (R.add(nE, D[I + 4 >> 2], kE, lE), D[I >> 2]),
						fp = (R.add(oE, D[I + 4 >> 2], iE, jE), D[I >> 2]),
						gp = D[I + 4 >> 2],
						pE = (kg >>> 2 | 0 | jg << 30 | 0) ^ (kg >>> 7 | 0 | jg << 25 | 0) ^ (jg >>> 28 | kg << 4 | 0),
						qE = (0 | kg << 30 | jg >>> 2) ^ (0 | kg << 25 | jg >>> 7) ^ (kg >>> 28 | 0 | jg << 4 | 0),
						hp = jg & fg,
						ip = kg & gg,
						rE = jg & bg ^ dp ^ hp,
						sE = kg & cg ^ ep ^ ip,
						lg = (R.add(fp, gp, Yf, Zf), D[I >> 2]),
						mg = D[I + 4 >> 2],
						tE = (R.add(pE, qE, rE, sE), D[I >> 2]),
						ng = (R.add(tE, D[I + 4 >> 2], fp, gp), D[I >> 2]),
						og = D[I + 4 >> 2],
						uE = (lg >>> 18 | mg << 14 | 0) ^ (mg >>> 9 | 0 | lg << 23 | 0) ^ (lg >>> 14 | mg << 18 | 0),
						vE = (mg >>> 18 | 0 | lg << 14 | 0) ^ (0 | mg << 23 | lg >>> 9) ^ (mg >>> 14 | 0 | lg << 18 | 0),
						wE = lg & hg ^ dg & (lg ^ -1),
						xE = mg & ig ^ eg & (mg ^ -1),
						yE = (R.add(Mc, Cb, 344077627, -1838011259), D[I >> 2]),
						zE = (R.add(yE, D[I + 4 >> 2], $f, ag), D[I >> 2]),
						AE = (R.add(zE, D[I + 4 >> 2], wE, xE), D[I >> 2]),
						jp = (R.add(AE, D[I + 4 >> 2], uE, vE), D[I >> 2]),
						kp = D[I + 4 >> 2],
						BE = (og >>> 2 | 0 | ng << 30 | 0) ^ (og >>> 7 | 0 | ng << 25 | 0) ^ (ng >>> 28 | og << 4 | 0),
						CE = (0 | og << 30 | ng >>> 2) ^ (0 | og << 25 | ng >>> 7) ^ (og >>> 28 | 0 | ng << 4 | 0),
						lp = ng & jg,
						mp = og & kg,
						DE = ng & fg ^ hp ^ lp,
						EE = og & gg ^ ip ^ mp,
						pg = (R.add(jp, kp, bg, cg), D[I >> 2]),
						qg = D[I + 4 >> 2],
						FE = (R.add(BE, CE, DE, EE), D[I >> 2]),
						rg = (R.add(FE, D[I + 4 >> 2], jp, kp), D[I >> 2]),
						sg = D[I + 4 >> 2],
						GE = (pg >>> 18 | qg << 14 | 0) ^ (qg >>> 9 | 0 | pg << 23 | 0) ^ (pg >>> 14 | qg << 18 | 0),
						HE = (qg >>> 18 | 0 | pg << 14 | 0) ^ (0 | qg << 23 | pg >>> 9) ^ (qg >>> 14 | 0 | pg << 18 | 0),
						IE = pg & lg ^ hg & (pg ^ -1),
						JE = qg & mg ^ ig & (qg ^ -1),
						KE = (R.add(Nc, Db, 1290863460, -1564481375), D[I >> 2]),
						LE = (R.add(KE, D[I + 4 >> 2], dg, eg), D[I >> 2]),
						ME = (R.add(LE, D[I + 4 >> 2], IE, JE), D[I >> 2]),
						np = (R.add(ME, D[I + 4 >> 2], GE, HE), D[I >> 2]),
						op = D[I + 4 >> 2],
						NE = (sg >>> 2 | 0 | rg << 30 | 0) ^ (sg >>> 7 | 0 | rg << 25 | 0) ^ (rg >>> 28 | sg << 4 | 0),
						OE = (0 | sg << 30 | rg >>> 2) ^ (0 | sg << 25 | rg >>> 7) ^ (sg >>> 28 | 0 | rg << 4 | 0),
						pp = rg & ng,
						qp = sg & og,
						PE = rg & jg ^ lp ^ pp,
						QE = sg & kg ^ mp ^ qp,
						tg = (R.add(np, op, fg, gg), D[I >> 2]),
						ug = D[I + 4 >> 2],
						RE = (R.add(NE, OE, PE, QE), D[I >> 2]),
						vg = (R.add(RE, D[I + 4 >> 2], np, op), D[I >> 2]),
						wg = D[I + 4 >> 2],
						SE = (tg >>> 18 | ug << 14 | 0) ^ (ug >>> 9 | 0 | tg << 23 | 0) ^ (tg >>> 14 | ug << 18 | 0),
						TE = (ug >>> 18 | 0 | tg << 14 | 0) ^ (0 | ug << 23 | tg >>> 9) ^ (ug >>> 14 | 0 | tg << 18 | 0),
						UE = tg & pg ^ lg & (tg ^ -1),
						VE = ug & qg ^ mg & (ug ^ -1),
						WE = (R.add(Oc, Eb, -1136513023, -1474664885), D[I >> 2]),
						XE = (R.add(WE, D[I + 4 >> 2], hg, ig), D[I >> 2]),
						YE = (R.add(XE, D[I + 4 >> 2], UE, VE), D[I >> 2]),
						rp = (R.add(YE, D[I + 4 >> 2], SE, TE), D[I >> 2]),
						sp = D[I + 4 >> 2],
						ZE = (wg >>> 2 | 0 | vg << 30 | 0) ^ (wg >>> 7 | 0 | vg << 25 | 0) ^ (vg >>> 28 | wg << 4 | 0),
						$E = (0 | wg << 30 | vg >>> 2) ^ (0 | wg << 25 | vg >>> 7) ^ (wg >>> 28 | 0 | vg << 4 | 0),
						tp = vg & rg,
						up = wg & sg,
						aF = vg & ng ^ pp ^ tp,
						bF = wg & og ^ qp ^ up,
						xg = (R.add(rp, sp, jg, kg), D[I >> 2]),
						yg = D[I + 4 >> 2],
						cF = (R.add(ZE, $E, aF, bF), D[I >> 2]),
						zg = (R.add(cF, D[I + 4 >> 2], rp, sp), D[I >> 2]),
						Ag = D[I + 4 >> 2],
						dF = (xg >>> 18 | yg << 14 | 0) ^ (yg >>> 9 | 0 | xg << 23 | 0) ^ (xg >>> 14 | yg << 18 | 0),
						eF = (yg >>> 18 | 0 | xg << 14 | 0) ^ (0 | yg << 23 | xg >>> 9) ^ (yg >>> 14 | 0 | xg << 18 | 0),
						fF = xg & tg ^ pg & (xg ^ -1),
						gF = yg & ug ^ qg & (yg ^ -1),
						hF = (R.add(Pc, Fb, -789014639, -1035236496), D[I >> 2]),
						iF = (R.add(hF, D[I + 4 >> 2], lg, mg), D[I >> 2]),
						jF = (R.add(iF, D[I + 4 >> 2], fF, gF), D[I >> 2]),
						vp = (R.add(jF, D[I + 4 >> 2], dF, eF), D[I >> 2]),
						wp = D[I + 4 >> 2],
						kF = (Ag >>> 2 | 0 | zg << 30 | 0) ^ (Ag >>> 7 | 0 | zg << 25 | 0) ^ (zg >>> 28 | Ag << 4 | 0),
						lF = (0 | Ag << 30 | zg >>> 2) ^ (0 | Ag << 25 | zg >>> 7) ^ (Ag >>> 28 | 0 | zg << 4 | 0),
						xp = zg & vg,
						yp = Ag & wg,
						mF = zg & rg ^ tp ^ xp,
						nF = Ag & sg ^ up ^ yp,
						Bg = (R.add(vp, wp, ng, og), D[I >> 2]),
						Cg = D[I + 4 >> 2],
						oF = (R.add(kF, lF, mF, nF), D[I >> 2]),
						Dg = (R.add(oF, D[I + 4 >> 2], vp, wp), D[I >> 2]),
						Eg = D[I + 4 >> 2],
						pF = (Bg >>> 18 | Cg << 14 | 0) ^ (Cg >>> 9 | 0 | Bg << 23 | 0) ^ (Bg >>> 14 | Cg << 18 | 0),
						qF = (Cg >>> 18 | 0 | Bg << 14 | 0) ^ (0 | Cg << 23 | Bg >>> 9) ^ (Cg >>> 14 | 0 | Bg << 18 | 0),
						rF = Bg & xg ^ tg & (Bg ^ -1),
						sF = Cg & yg ^ ug & (Cg ^ -1),
						tF = (R.add(Qc, Gb, 106217008, -949202525), D[I >> 2]),
						uF = (R.add(tF, D[I + 4 >> 2], pg, qg), D[I >> 2]),
						vF = (R.add(uF, D[I + 4 >> 2], rF, sF), D[I >> 2]),
						zp = (R.add(vF, D[I + 4 >> 2], pF, qF), D[I >> 2]),
						Ap = D[I + 4 >> 2],
						wF = (Eg >>> 2 | 0 | Dg << 30 | 0) ^ (Eg >>> 7 | 0 | Dg << 25 | 0) ^ (Dg >>> 28 | Eg << 4 | 0),
						xF = (0 | Eg << 30 | Dg >>> 2) ^ (0 | Eg << 25 | Dg >>> 7) ^ (Eg >>> 28 | 0 | Dg << 4 | 0),
						Bp = Dg & zg,
						Cp = Eg & Ag,
						yF = Dg & vg ^ xp ^ Bp,
						zF = Eg & wg ^ yp ^ Cp,
						Fg = (R.add(zp, Ap, rg, sg), D[I >> 2]),
						Gg = D[I + 4 >> 2],
						AF = (R.add(wF, xF, yF, zF), D[I >> 2]),
						Hg = (R.add(AF, D[I + 4 >> 2], zp, Ap), D[I >> 2]),
						Ig = D[I + 4 >> 2],
						BF = (Fg >>> 18 | Gg << 14 | 0) ^ (Gg >>> 9 | 0 | Fg << 23 | 0) ^ (Fg >>> 14 | Gg << 18 | 0),
						CF = (Gg >>> 18 | 0 | Fg << 14 | 0) ^ (0 | Gg << 23 | Fg >>> 9) ^ (Gg >>> 14 | 0 | Fg << 18 | 0),
						DF = Fg & Bg ^ xg & (Fg ^ -1),
						EF = Gg & Cg ^ yg & (Gg ^ -1),
						FF = (R.add(Rc, Hb, -688958952, -778901479), D[I >> 2]),
						GF = (R.add(FF, D[I + 4 >> 2], tg, ug), D[I >> 2]),
						HF = (R.add(GF, D[I + 4 >> 2], DF, EF), D[I >> 2]),
						Dp = (R.add(HF, D[I + 4 >> 2], BF, CF), D[I >> 2]),
						Ep = D[I + 4 >> 2],
						IF = (Ig >>> 2 | 0 | Hg << 30 | 0) ^ (Ig >>> 7 | 0 | Hg << 25 | 0) ^ (Hg >>> 28 | Ig << 4 | 0),
						JF = (0 | Ig << 30 | Hg >>> 2) ^ (0 | Ig << 25 | Hg >>> 7) ^ (Ig >>> 28 | 0 | Hg << 4 | 0),
						Fp = Hg & Dg,
						Gp = Ig & Eg,
						KF = Hg & zg ^ Bp ^ Fp,
						LF = Ig & Ag ^ Cp ^ Gp,
						Jg = (R.add(Dp, Ep, vg, wg), D[I >> 2]),
						Kg = D[I + 4 >> 2],
						MF = (R.add(IF, JF, KF, LF), D[I >> 2]),
						Lg = (R.add(MF, D[I + 4 >> 2], Dp, Ep), D[I >> 2]),
						Mg = D[I + 4 >> 2],
						NF = (Jg >>> 18 | Kg << 14 | 0) ^ (Kg >>> 9 | 0 | Jg << 23 | 0) ^ (Jg >>> 14 | Kg << 18 | 0),
						OF = (Kg >>> 18 | 0 | Jg << 14 | 0) ^ (0 | Kg << 23 | Jg >>> 9) ^ (Kg >>> 14 | 0 | Jg << 18 | 0),
						PF = Jg & Fg ^ Bg & (Jg ^ -1),
						QF = Kg & Gg ^ Cg & (Kg ^ -1),
						RF = (R.add(Sc, Ib, 1432725776, -694614492), D[I >> 2]),
						SF = (R.add(RF, D[I + 4 >> 2], xg, yg), D[I >> 2]),
						TF = (R.add(SF, D[I + 4 >> 2], PF, QF), D[I >> 2]),
						Hp = (R.add(TF, D[I + 4 >> 2], NF, OF), D[I >> 2]),
						Ip = D[I + 4 >> 2],
						UF = (Mg >>> 2 | 0 | Lg << 30 | 0) ^ (Mg >>> 7 | 0 | Lg << 25 | 0) ^ (Lg >>> 28 | Mg << 4 | 0),
						VF = (0 | Mg << 30 | Lg >>> 2) ^ (0 | Mg << 25 | Lg >>> 7) ^ (Mg >>> 28 | 0 | Lg << 4 | 0),
						Jp = Lg & Hg,
						Kp = Mg & Ig,
						WF = Lg & Dg ^ Fp ^ Jp,
						XF = Mg & Eg ^ Gp ^ Kp,
						Ng = (R.add(Hp, Ip, zg, Ag), D[I >> 2]),
						Og = D[I + 4 >> 2],
						YF = (R.add(UF, VF, WF, XF), D[I >> 2]),
						Pg = (R.add(YF, D[I + 4 >> 2], Hp, Ip), D[I >> 2]),
						Qg = D[I + 4 >> 2],
						ZF = (Ng >>> 18 | Og << 14 | 0) ^ (Og >>> 9 | 0 | Ng << 23 | 0) ^ (Ng >>> 14 | Og << 18 | 0),
						$F = (Og >>> 18 | 0 | Ng << 14 | 0) ^ (0 | Og << 23 | Ng >>> 9) ^ (Og >>> 14 | 0 | Ng << 18 | 0),
						aG = Ng & Jg ^ Fg & (Ng ^ -1),
						bG = Og & Kg ^ Gg & (Og ^ -1),
						cG = (R.add(Tc, Jb, 1467031594, -200395387), D[I >> 2]),
						dG = (R.add(cG, D[I + 4 >> 2], Bg, Cg), D[I >> 2]),
						eG = (R.add(dG, D[I + 4 >> 2], aG, bG), D[I >> 2]),
						Lp = (R.add(eG, D[I + 4 >> 2], ZF, $F), D[I >> 2]),
						Mp = D[I + 4 >> 2],
						fG = (Qg >>> 2 | 0 | Pg << 30 | 0) ^ (Qg >>> 7 | 0 | Pg << 25 | 0) ^ (Pg >>> 28 | Qg << 4 | 0),
						gG = (0 | Qg << 30 | Pg >>> 2) ^ (0 | Qg << 25 | Pg >>> 7) ^ (Qg >>> 28 | 0 | Pg << 4 | 0),
						Np = Pg & Lg,
						Op = Qg & Mg,
						hG = Pg & Hg ^ Jp ^ Np,
						iG = Qg & Ig ^ Kp ^ Op,
						Rg = (R.add(Lp, Mp, Dg, Eg), D[I >> 2]),
						Sg = D[I + 4 >> 2],
						jG = (R.add(fG, gG, hG, iG), D[I >> 2]),
						Tg = (R.add(jG, D[I + 4 >> 2], Lp, Mp), D[I >> 2]),
						Ug = D[I + 4 >> 2],
						kG = (Rg >>> 18 | Sg << 14 | 0) ^ (Sg >>> 9 | 0 | Rg << 23 | 0) ^ (Rg >>> 14 | Sg << 18 | 0),
						lG = (Sg >>> 18 | 0 | Rg << 14 | 0) ^ (0 | Sg << 23 | Rg >>> 9) ^ (Sg >>> 14 | 0 | Rg << 18 | 0),
						mG = Rg & Ng ^ Jg & (Rg ^ -1),
						nG = Sg & Og ^ Kg & (Sg ^ -1),
						oG = (R.add(Uc, Kb, 851169720, 275423344), D[I >> 2]),
						pG = (R.add(oG, D[I + 4 >> 2], Fg, Gg), D[I >> 2]),
						qG = (R.add(pG, D[I + 4 >> 2], mG, nG), D[I >> 2]),
						Pp = (R.add(qG, D[I + 4 >> 2], kG, lG), D[I >> 2]),
						Qp = D[I + 4 >> 2],
						rG = (Ug >>> 2 | 0 | Tg << 30 | 0) ^ (Ug >>> 7 | 0 | Tg << 25 | 0) ^ (Tg >>> 28 | Ug << 4 | 0),
						sG = (0 | Ug << 30 | Tg >>> 2) ^ (0 | Ug << 25 | Tg >>> 7) ^ (Ug >>> 28 | 0 | Tg << 4 | 0),
						Rp = Tg & Pg,
						Sp = Ug & Qg,
						tG = Tg & Lg ^ Np ^ Rp,
						uG = Ug & Mg ^ Op ^ Sp,
						Vg = (R.add(Pp, Qp, Hg, Ig), D[I >> 2]),
						Wg = D[I + 4 >> 2],
						vG = (R.add(rG, sG, tG, uG), D[I >> 2]),
						Xg = (R.add(vG, D[I + 4 >> 2], Pp, Qp), D[I >> 2]),
						Yg = D[I + 4 >> 2],
						wG = (Jb >>> 29 | 0 | Tc << 3 | 0) ^ (Tc >>> 6 | Jb << 26) ^ (Tc >>> 19 | Jb << 13 | 0),
						xG = (0 | Jb << 3 | Tc >>> 29) ^ (Jb >>> 6 | 0) ^ (Jb >>> 19 | 0 | Tc << 13 | 0),
						yG = (R.add((Gc >>> 8 | wb << 24 | 0) ^ (Gc >>> 7 | wb << 25) ^ (Gc >>> 1 | wb << 31 | 0), (wb >>> 8 | 0 | Gc << 24 | 0) ^ (wb >>> 7 | 0) ^ (wb >>> 1 | 0 | Gc << 31 | 0), Fc, vb), D[I >> 2]),
						zG = (R.add(yG, D[I + 4 >> 2], Oc, Eb), D[I >> 2]),
						Vc = (R.add(zG, D[I + 4 >> 2], wG, xG), D[I >> 2]),
						Lb = D[I + 4 >> 2],
						AG = (Kb >>> 29 | 0 | Uc << 3 | 0) ^ (Uc >>> 6 | Kb << 26) ^ (Uc >>> 19 | Kb << 13 | 0),
						BG = (0 | Kb << 3 | Uc >>> 29) ^ (Kb >>> 6 | 0) ^ (Kb >>> 19 | 0 | Uc << 13 | 0),
						CG = (R.add((Hc >>> 8 | xb << 24 | 0) ^ (Hc >>> 7 | xb << 25) ^ (Hc >>> 1 | xb << 31 | 0), (xb >>> 8 | 0 | Hc << 24 | 0) ^ (xb >>> 7 | 0) ^ (xb >>> 1 | 0 | Hc << 31 | 0), Gc, wb), D[I >> 2]),
						DG = (R.add(CG, D[I + 4 >> 2], Pc, Fb), D[I >> 2]),
						Wc = (R.add(DG, D[I + 4 >> 2], AG, BG), D[I >> 2]),
						Mb = D[I + 4 >> 2],
						EG = (Lb >>> 29 | 0 | Vc << 3 | 0) ^ (Vc >>> 6 | Lb << 26) ^ (Vc >>> 19 | Lb << 13 | 0),
						FG = (0 | Lb << 3 | Vc >>> 29) ^ (Lb >>> 6 | 0) ^ (Lb >>> 19 | 0 | Vc << 13 | 0),
						GG = (R.add((Ic >>> 8 | yb << 24 | 0) ^ (Ic >>> 7 | yb << 25) ^ (Ic >>> 1 | yb << 31 | 0), (yb >>> 8 | 0 | Ic << 24 | 0) ^ (yb >>> 7 | 0) ^ (yb >>> 1 | 0 | Ic << 31 | 0), Hc, xb), D[I >> 2]),
						HG = (R.add(GG, D[I + 4 >> 2], Qc, Gb), D[I >> 2]),
						Xc = (R.add(HG, D[I + 4 >> 2], EG, FG), D[I >> 2]),
						Nb = D[I + 4 >> 2],
						IG = (Mb >>> 29 | 0 | Wc << 3 | 0) ^ (Wc >>> 6 | Mb << 26) ^ (Wc >>> 19 | Mb << 13 | 0),
						JG = (0 | Mb << 3 | Wc >>> 29) ^ (Mb >>> 6 | 0) ^ (Mb >>> 19 | 0 | Wc << 13 | 0),
						KG = (R.add((Jc >>> 8 | zb << 24 | 0) ^ (Jc >>> 7 | zb << 25) ^ (Jc >>> 1 | zb << 31 | 0), (zb >>> 8 | 0 | Jc << 24 | 0) ^ (zb >>> 7 | 0) ^ (zb >>> 1 | 0 | Jc << 31 | 0), Ic, yb), D[I >> 2]),
						LG = (R.add(KG, D[I + 4 >> 2], Rc, Hb), D[I >> 2]),
						Yc = (R.add(LG, D[I + 4 >> 2], IG, JG), D[I >> 2]),
						Ob = D[I + 4 >> 2],
						MG = (Nb >>> 29 | 0 | Xc << 3 | 0) ^ (Xc >>> 6 | Nb << 26) ^ (Xc >>> 19 | Nb << 13 | 0),
						NG = (0 | Nb << 3 | Xc >>> 29) ^ (Nb >>> 6 | 0) ^ (Nb >>> 19 | 0 | Xc << 13 | 0),
						OG = (R.add((Kc >>> 8 | Ab << 24 | 0) ^ (Kc >>> 7 | Ab << 25) ^ (Kc >>> 1 | Ab << 31 | 0), (Ab >>> 8 | 0 | Kc << 24 | 0) ^ (Ab >>> 7 | 0) ^ (Ab >>> 1 | 0 | Kc << 31 | 0), Jc, zb), D[I >> 2]),
						PG = (R.add(OG, D[I + 4 >> 2], Sc, Ib), D[I >> 2]),
						Zc = (R.add(PG, D[I + 4 >> 2], MG, NG), D[I >> 2]),
						Pb = D[I + 4 >> 2],
						QG = (Ob >>> 29 | 0 | Yc << 3 | 0) ^ (Yc >>> 6 | Ob << 26) ^ (Yc >>> 19 | Ob << 13 | 0),
						RG = (0 | Ob << 3 | Yc >>> 29) ^ (Ob >>> 6 | 0) ^ (Ob >>> 19 | 0 | Yc << 13 | 0),
						SG = (R.add((Lc >>> 8 | Bb << 24 | 0) ^ (Lc >>> 7 | Bb << 25) ^ (Lc >>> 1 | Bb << 31 | 0), (Bb >>> 8 | 0 | Lc << 24 | 0) ^ (Bb >>> 7 | 0) ^ (Bb >>> 1 | 0 | Lc << 31 | 0), Kc, Ab), D[I >> 2]),
						TG = (R.add(SG, D[I + 4 >> 2], Tc, Jb), D[I >> 2]),
						$c = (R.add(TG, D[I + 4 >> 2], QG, RG), D[I >> 2]),
						Qb = D[I + 4 >> 2],
						UG = (Pb >>> 29 | 0 | Zc << 3 | 0) ^ (Zc >>> 6 | Pb << 26) ^ (Zc >>> 19 | Pb << 13 | 0),
						VG = (0 | Pb << 3 | Zc >>> 29) ^ (Pb >>> 6 | 0) ^ (Pb >>> 19 | 0 | Zc << 13 | 0),
						WG = (R.add((Mc >>> 8 | Cb << 24 | 0) ^ (Mc >>> 7 | Cb << 25) ^ (Mc >>> 1 | Cb << 31 | 0), (Cb >>> 8 | 0 | Mc << 24 | 0) ^ (Cb >>> 7 | 0) ^ (Cb >>> 1 | 0 | Mc << 31 | 0), Lc, Bb), D[I >> 2]),
						XG = (R.add(WG, D[I + 4 >> 2], Uc, Kb), D[I >> 2]),
						ad = (R.add(XG, D[I + 4 >> 2], UG, VG), D[I >> 2]),
						Rb = D[I + 4 >> 2],
						YG = (Qb >>> 29 | 0 | $c << 3 | 0) ^ ($c >>> 6 | Qb << 26) ^ ($c >>> 19 | Qb << 13 | 0),
						ZG = (0 | Qb << 3 | $c >>> 29) ^ (Qb >>> 6 | 0) ^ (Qb >>> 19 | 0 | $c << 13 | 0),
						$G = (R.add((Nc >>> 8 | Db << 24 | 0) ^ (Nc >>> 7 | Db << 25) ^ (Nc >>> 1 | Db << 31 | 0), (Db >>> 8 | 0 | Nc << 24 | 0) ^ (Db >>> 7 | 0) ^ (Db >>> 1 | 0 | Nc << 31 | 0), Mc, Cb), D[I >> 2]),
						aH = (R.add($G, D[I + 4 >> 2], Vc, Lb), D[I >> 2]),
						bd = (R.add(aH, D[I + 4 >> 2], YG, ZG), D[I >> 2]),
						Sb = D[I + 4 >> 2],
						bH = (Rb >>> 29 | 0 | ad << 3 | 0) ^ (ad >>> 6 | Rb << 26) ^ (ad >>> 19 | Rb << 13 | 0),
						cH = (0 | Rb << 3 | ad >>> 29) ^ (Rb >>> 6 | 0) ^ (Rb >>> 19 | 0 | ad << 13 | 0),
						dH = (R.add((Oc >>> 8 | Eb << 24 | 0) ^ (Oc >>> 7 | Eb << 25) ^ (Oc >>> 1 | Eb << 31 | 0), (Eb >>> 8 | 0 | Oc << 24 | 0) ^ (Eb >>> 7 | 0) ^ (Eb >>> 1 | 0 | Oc << 31 | 0), Nc, Db), D[I >> 2]),
						eH = (R.add(dH, D[I + 4 >> 2], Wc, Mb), D[I >> 2]),
						cd = (R.add(eH, D[I + 4 >> 2], bH, cH), D[I >> 2]),
						Tb = D[I + 4 >> 2],
						fH = (Sb >>> 29 | 0 | bd << 3 | 0) ^ (bd >>> 6 | Sb << 26) ^ (bd >>> 19 | Sb << 13 | 0),
						gH = (0 | Sb << 3 | bd >>> 29) ^ (Sb >>> 6 | 0) ^ (Sb >>> 19 | 0 | bd << 13 | 0),
						hH = (R.add((Pc >>> 8 | Fb << 24 | 0) ^ (Pc >>> 7 | Fb << 25) ^ (Pc >>> 1 | Fb << 31 | 0), (Fb >>> 8 | 0 | Pc << 24 | 0) ^ (Fb >>> 7 | 0) ^ (Fb >>> 1 | 0 | Pc << 31 | 0), Oc, Eb), D[I >> 2]),
						iH = (R.add(hH, D[I + 4 >> 2], Xc, Nb), D[I >> 2]),
						dd = (R.add(iH, D[I + 4 >> 2], fH, gH), D[I >> 2]),
						Ub = D[I + 4 >> 2],
						jH = (Tb >>> 29 | 0 | cd << 3 | 0) ^ (cd >>> 6 | Tb << 26) ^ (cd >>> 19 | Tb << 13 | 0),
						kH = (0 | Tb << 3 | cd >>> 29) ^ (Tb >>> 6 | 0) ^ (Tb >>> 19 | 0 | cd << 13 | 0),
						lH = (R.add((Qc >>> 8 | Gb << 24 | 0) ^ (Qc >>> 7 | Gb << 25) ^ (Qc >>> 1 | Gb << 31 | 0), (Gb >>> 8 | 0 | Qc << 24 | 0) ^ (Gb >>> 7 | 0) ^ (Gb >>> 1 | 0 | Qc << 31 | 0), Pc, Fb), D[I >> 2]),
						mH = (R.add(lH, D[I + 4 >> 2], Yc, Ob), D[I >> 2]),
						ed = (R.add(mH, D[I + 4 >> 2], jH, kH), D[I >> 2]),
						Vb = D[I + 4 >> 2],
						nH = (Ub >>> 29 | 0 | dd << 3 | 0) ^ (dd >>> 6 | Ub << 26) ^ (dd >>> 19 | Ub << 13 | 0),
						oH = (0 | Ub << 3 | dd >>> 29) ^ (Ub >>> 6 | 0) ^ (Ub >>> 19 | 0 | dd << 13 | 0),
						pH = (R.add((Rc >>> 8 | Hb << 24 | 0) ^ (Rc >>> 7 | Hb << 25) ^ (Rc >>> 1 | Hb << 31 | 0), (Hb >>> 8 | 0 | Rc << 24 | 0) ^ (Hb >>> 7 | 0) ^ (Hb >>> 1 | 0 | Rc << 31 | 0), Qc, Gb), D[I >> 2]),
						qH = (R.add(pH, D[I + 4 >> 2], Zc, Pb), D[I >> 2]),
						fd = (R.add(qH, D[I + 4 >> 2], nH, oH), D[I >> 2]),
						Wb = D[I + 4 >> 2],
						rH = (Vb >>> 29 | 0 | ed << 3 | 0) ^ (ed >>> 6 | Vb << 26) ^ (ed >>> 19 | Vb << 13 | 0),
						sH = (0 | Vb << 3 | ed >>> 29) ^ (Vb >>> 6 | 0) ^ (Vb >>> 19 | 0 | ed << 13 | 0),
						tH = (R.add((Sc >>> 8 | Ib << 24 | 0) ^ (Sc >>> 7 | Ib << 25) ^ (Sc >>> 1 | Ib << 31 | 0), (Ib >>> 8 | 0 | Sc << 24 | 0) ^ (Ib >>> 7 | 0) ^ (Ib >>> 1 | 0 | Sc << 31 | 0), Rc, Hb), D[I >> 2]),
						uH = (R.add(tH, D[I + 4 >> 2], $c, Qb), D[I >> 2]),
						gd = (R.add(uH, D[I + 4 >> 2], rH, sH), D[I >> 2]),
						Xb = D[I + 4 >> 2],
						vH = (Wb >>> 29 | 0 | fd << 3 | 0) ^ (fd >>> 6 | Wb << 26) ^ (fd >>> 19 | Wb << 13 | 0),
						wH = (0 | Wb << 3 | fd >>> 29) ^ (Wb >>> 6 | 0) ^ (Wb >>> 19 | 0 | fd << 13 | 0),
						xH = (R.add((Tc >>> 8 | Jb << 24 | 0) ^ (Tc >>> 7 | Jb << 25) ^ (Tc >>> 1 | Jb << 31 | 0), (Jb >>> 8 | 0 | Tc << 24 | 0) ^ (Jb >>> 7 | 0) ^ (Jb >>> 1 | 0 | Tc << 31 | 0), Sc, Ib), D[I >> 2]),
						yH = (R.add(xH, D[I + 4 >> 2], ad, Rb), D[I >> 2]),
						hd = (R.add(yH, D[I + 4 >> 2], vH, wH), D[I >> 2]),
						Yb = D[I + 4 >> 2],
						zH = (Xb >>> 29 | 0 | gd << 3 | 0) ^ (gd >>> 6 | Xb << 26) ^ (gd >>> 19 | Xb << 13 | 0),
						AH = (0 | Xb << 3 | gd >>> 29) ^ (Xb >>> 6 | 0) ^ (Xb >>> 19 | 0 | gd << 13 | 0),
						BH = (R.add((Uc >>> 8 | Kb << 24 | 0) ^ (Uc >>> 7 | Kb << 25) ^ (Uc >>> 1 | Kb << 31 | 0), (Kb >>> 8 | 0 | Uc << 24 | 0) ^ (Kb >>> 7 | 0) ^ (Kb >>> 1 | 0 | Uc << 31 | 0), Tc, Jb), D[I >> 2]),
						CH = (R.add(BH, D[I + 4 >> 2], bd, Sb), D[I >> 2]),
						id = (R.add(CH, D[I + 4 >> 2], zH, AH), D[I >> 2]),
						Zb = D[I + 4 >> 2],
						DH = (Yb >>> 29 | 0 | hd << 3 | 0) ^ (hd >>> 6 | Yb << 26) ^ (hd >>> 19 | Yb << 13 | 0),
						EH = (0 | Yb << 3 | hd >>> 29) ^ (Yb >>> 6 | 0) ^ (Yb >>> 19 | 0 | hd << 13 | 0),
						FH = (R.add((Vc >>> 8 | Lb << 24 | 0) ^ (Vc >>> 7 | Lb << 25) ^ (Vc >>> 1 | Lb << 31 | 0), (Lb >>> 8 | 0 | Vc << 24 | 0) ^ (Lb >>> 7 | 0) ^ (Lb >>> 1 | 0 | Vc << 31 | 0), Uc, Kb), D[I >> 2]),
						GH = (R.add(FH, D[I + 4 >> 2], cd, Tb), D[I >> 2]),
						jd = (R.add(GH, D[I + 4 >> 2], DH, EH), D[I >> 2]),
						$b = D[I + 4 >> 2],
						HH = (Vg >>> 18 | Wg << 14 | 0) ^ (Wg >>> 9 | 0 | Vg << 23 | 0) ^ (Vg >>> 14 | Wg << 18 | 0),
						IH = (Wg >>> 18 | 0 | Vg << 14 | 0) ^ (0 | Wg << 23 | Vg >>> 9) ^ (Wg >>> 14 | 0 | Vg << 18 | 0),
						JH = Vg & Rg ^ Ng & (Vg ^ -1),
						KH = Wg & Sg ^ Og & (Wg ^ -1),
						LH = (R.add(Vc, Lb, -1194143544, 430227734), D[I >> 2]),
						MH = (R.add(LH, D[I + 4 >> 2], Jg, Kg), D[I >> 2]),
						NH = (R.add(MH, D[I + 4 >> 2], JH, KH), D[I >> 2]),
						Tp = (R.add(NH, D[I + 4 >> 2], HH, IH), D[I >> 2]),
						Up = D[I + 4 >> 2],
						OH = (Yg >>> 2 | 0 | Xg << 30 | 0) ^ (Yg >>> 7 | 0 | Xg << 25 | 0) ^ (Xg >>> 28 | Yg << 4 | 0),
						PH = (0 | Yg << 30 | Xg >>> 2) ^ (0 | Yg << 25 | Xg >>> 7) ^ (Yg >>> 28 | 0 | Xg << 4 | 0),
						Vp = Xg & Tg,
						Wp = Yg & Ug,
						QH = Xg & Pg ^ Rp ^ Vp,
						RH = Yg & Qg ^ Sp ^ Wp,
						Zg = (R.add(Tp, Up, Lg, Mg), D[I >> 2]),
						$g = D[I + 4 >> 2],
						SH = (R.add(OH, PH, QH, RH), D[I >> 2]),
						ah = (R.add(SH, D[I + 4 >> 2], Tp, Up), D[I >> 2]),
						bh = D[I + 4 >> 2],
						TH = (Zg >>> 18 | $g << 14 | 0) ^ ($g >>> 9 | 0 | Zg << 23 | 0) ^ (Zg >>> 14 | $g << 18 | 0),
						UH = ($g >>> 18 | 0 | Zg << 14 | 0) ^ (0 | $g << 23 | Zg >>> 9) ^ ($g >>> 14 | 0 | Zg << 18 | 0),
						VH = Zg & Vg ^ Rg & (Zg ^ -1),
						WH = $g & Wg ^ Sg & ($g ^ -1),
						XH = (R.add(Wc, Mb, 1363258195, 506948616), D[I >> 2]),
						YH = (R.add(XH, D[I + 4 >> 2], Ng, Og), D[I >> 2]),
						ZH = (R.add(YH, D[I + 4 >> 2], VH, WH), D[I >> 2]),
						Xp = (R.add(ZH, D[I + 4 >> 2], TH, UH), D[I >> 2]),
						Yp = D[I + 4 >> 2],
						$H = (bh >>> 2 | 0 | ah << 30 | 0) ^ (bh >>> 7 | 0 | ah << 25 | 0) ^ (ah >>> 28 | bh << 4 | 0),
						aI = (0 | bh << 30 | ah >>> 2) ^ (0 | bh << 25 | ah >>> 7) ^ (bh >>> 28 | 0 | ah << 4 | 0),
						Zp = ah & Xg,
						$p = bh & Yg,
						bI = ah & Tg ^ Vp ^ Zp,
						cI = bh & Ug ^ Wp ^ $p,
						ch = (R.add(Xp, Yp, Pg, Qg), D[I >> 2]),
						dh = D[I + 4 >> 2],
						dI = (R.add($H, aI, bI, cI), D[I >> 2]),
						eh = (R.add(dI, D[I + 4 >> 2], Xp, Yp), D[I >> 2]),
						fh = D[I + 4 >> 2],
						eI = (ch >>> 18 | dh << 14 | 0) ^ (dh >>> 9 | 0 | ch << 23 | 0) ^ (ch >>> 14 | dh << 18 | 0),
						fI = (dh >>> 18 | 0 | ch << 14 | 0) ^ (0 | dh << 23 | ch >>> 9) ^ (dh >>> 14 | 0 | ch << 18 | 0),
						gI = ch & Zg ^ Vg & (ch ^ -1),
						hI = dh & $g ^ Wg & (dh ^ -1),
						iI = (R.add(Xc, Nb, -544281703, 659060556), D[I >> 2]),
						jI = (R.add(iI, D[I + 4 >> 2], Rg, Sg), D[I >> 2]),
						kI = (R.add(jI, D[I + 4 >> 2], gI, hI), D[I >> 2]),
						aq = (R.add(kI, D[I + 4 >> 2], eI, fI), D[I >> 2]),
						bq = D[I + 4 >> 2],
						lI = (fh >>> 2 | 0 | eh << 30 | 0) ^ (fh >>> 7 | 0 | eh << 25 | 0) ^ (eh >>> 28 | fh << 4 | 0),
						mI = (0 | fh << 30 | eh >>> 2) ^ (0 | fh << 25 | eh >>> 7) ^ (fh >>> 28 | 0 | eh << 4 | 0),
						cq = eh & ah,
						dq = fh & bh,
						nI = eh & Xg ^ Zp ^ cq,
						oI = fh & Yg ^ $p ^ dq,
						gh = (R.add(aq, bq, Tg, Ug), D[I >> 2]),
						hh = D[I + 4 >> 2],
						pI = (R.add(lI, mI, nI, oI), D[I >> 2]),
						ih = (R.add(pI, D[I + 4 >> 2], aq, bq), D[I >> 2]),
						jh = D[I + 4 >> 2],
						qI = (gh >>> 18 | hh << 14 | 0) ^ (hh >>> 9 | 0 | gh << 23 | 0) ^ (gh >>> 14 | hh << 18 | 0),
						rI = (hh >>> 18 | 0 | gh << 14 | 0) ^ (0 | hh << 23 | gh >>> 9) ^ (hh >>> 14 | 0 | gh << 18 | 0),
						sI = gh & ch ^ Zg & (gh ^ -1),
						tI = hh & dh ^ $g & (hh ^ -1),
						uI = (R.add(Yc, Ob, -509917016, 883997877), D[I >> 2]),
						vI = (R.add(uI, D[I + 4 >> 2], Vg, Wg), D[I >> 2]),
						wI = (R.add(vI, D[I + 4 >> 2], sI, tI), D[I >> 2]),
						eq = (R.add(wI, D[I + 4 >> 2], qI, rI), D[I >> 2]),
						fq = D[I + 4 >> 2],
						xI = (jh >>> 2 | 0 | ih << 30 | 0) ^ (jh >>> 7 | 0 | ih << 25 | 0) ^ (ih >>> 28 | jh << 4 | 0),
						yI = (0 | jh << 30 | ih >>> 2) ^ (0 | jh << 25 | ih >>> 7) ^ (jh >>> 28 | 0 | ih << 4 | 0),
						gq = ih & eh,
						hq = jh & fh,
						zI = ih & ah ^ cq ^ gq,
						AI = jh & bh ^ dq ^ hq,
						kh = (R.add(eq, fq, Xg, Yg), D[I >> 2]),
						lh = D[I + 4 >> 2],
						BI = (R.add(xI, yI, zI, AI), D[I >> 2]),
						mh = (R.add(BI, D[I + 4 >> 2], eq, fq), D[I >> 2]),
						nh = D[I + 4 >> 2],
						CI = (kh >>> 18 | lh << 14 | 0) ^ (lh >>> 9 | 0 | kh << 23 | 0) ^ (kh >>> 14 | lh << 18 | 0),
						DI = (lh >>> 18 | 0 | kh << 14 | 0) ^ (0 | lh << 23 | kh >>> 9) ^ (lh >>> 14 | 0 | kh << 18 | 0),
						EI = kh & gh ^ ch & (kh ^ -1),
						FI = lh & hh ^ dh & (lh ^ -1),
						GI = (R.add(Zc, Pb, -976659869, 958139571), D[I >> 2]),
						HI = (R.add(GI, D[I + 4 >> 2], Zg, $g), D[I >> 2]),
						II = (R.add(HI, D[I + 4 >> 2], EI, FI), D[I >> 2]),
						iq = (R.add(II, D[I + 4 >> 2], CI, DI), D[I >> 2]),
						jq = D[I + 4 >> 2],
						JI = (nh >>> 2 | 0 | mh << 30 | 0) ^ (nh >>> 7 | 0 | mh << 25 | 0) ^ (mh >>> 28 | nh << 4 | 0),
						KI = (0 | nh << 30 | mh >>> 2) ^ (0 | nh << 25 | mh >>> 7) ^ (nh >>> 28 | 0 | mh << 4 | 0),
						kq = mh & ih,
						lq = nh & jh,
						LI = mh & eh ^ gq ^ kq,
						MI = nh & fh ^ hq ^ lq,
						oh = (R.add(iq, jq, ah, bh), D[I >> 2]),
						ph = D[I + 4 >> 2],
						NI = (R.add(JI, KI, LI, MI), D[I >> 2]),
						qh = (R.add(NI, D[I + 4 >> 2], iq, jq), D[I >> 2]),
						rh = D[I + 4 >> 2],
						OI = (oh >>> 18 | ph << 14 | 0) ^ (ph >>> 9 | 0 | oh << 23 | 0) ^ (oh >>> 14 | ph << 18 | 0),
						PI = (ph >>> 18 | 0 | oh << 14 | 0) ^ (0 | ph << 23 | oh >>> 9) ^ (ph >>> 14 | 0 | oh << 18 | 0),
						QI = oh & kh ^ gh & (oh ^ -1),
						RI = ph & lh ^ hh & (ph ^ -1),
						SI = (R.add($c, Qb, -482243893, 1322822218), D[I >> 2]),
						TI = (R.add(SI, D[I + 4 >> 2], ch, dh), D[I >> 2]),
						UI = (R.add(TI, D[I + 4 >> 2], QI, RI), D[I >> 2]),
						mq = (R.add(UI, D[I + 4 >> 2], OI, PI), D[I >> 2]),
						nq = D[I + 4 >> 2],
						VI = (rh >>> 2 | 0 | qh << 30 | 0) ^ (rh >>> 7 | 0 | qh << 25 | 0) ^ (qh >>> 28 | rh << 4 | 0),
						WI = (0 | rh << 30 | qh >>> 2) ^ (0 | rh << 25 | qh >>> 7) ^ (rh >>> 28 | 0 | qh << 4 | 0),
						oq = qh & mh,
						pq = rh & nh,
						XI = qh & ih ^ kq ^ oq,
						YI = rh & jh ^ lq ^ pq,
						sh = (R.add(mq, nq, eh, fh), D[I >> 2]),
						th = D[I + 4 >> 2],
						ZI = (R.add(VI, WI, XI, YI), D[I >> 2]),
						uh = (R.add(ZI, D[I + 4 >> 2], mq, nq), D[I >> 2]),
						vh = D[I + 4 >> 2],
						$I = (sh >>> 18 | th << 14 | 0) ^ (th >>> 9 | 0 | sh << 23 | 0) ^ (sh >>> 14 | th << 18 | 0),
						aJ = (th >>> 18 | 0 | sh << 14 | 0) ^ (0 | th << 23 | sh >>> 9) ^ (th >>> 14 | 0 | sh << 18 | 0),
						bJ = sh & oh ^ kh & (sh ^ -1),
						cJ = th & ph ^ lh & (th ^ -1),
						dJ = (R.add(ad, Rb, 2003034995, 1537002063), D[I >> 2]),
						eJ = (R.add(dJ, D[I + 4 >> 2], gh, hh), D[I >> 2]),
						fJ = (R.add(eJ, D[I + 4 >> 2], bJ, cJ), D[I >> 2]),
						qq = (R.add(fJ, D[I + 4 >> 2], $I, aJ), D[I >> 2]),
						rq = D[I + 4 >> 2],
						gJ = (vh >>> 2 | 0 | uh << 30 | 0) ^ (vh >>> 7 | 0 | uh << 25 | 0) ^ (uh >>> 28 | vh << 4 | 0),
						hJ = (0 | vh << 30 | uh >>> 2) ^ (0 | vh << 25 | uh >>> 7) ^ (vh >>> 28 | 0 | uh << 4 | 0),
						sq = uh & qh,
						tq = vh & rh,
						iJ = uh & mh ^ oq ^ sq,
						jJ = vh & nh ^ pq ^ tq,
						wh = (R.add(qq, rq, ih, jh), D[I >> 2]),
						xh = D[I + 4 >> 2],
						kJ = (R.add(gJ, hJ, iJ, jJ), D[I >> 2]),
						yh = (R.add(kJ, D[I + 4 >> 2], qq, rq), D[I >> 2]),
						zh = D[I + 4 >> 2],
						lJ = (wh >>> 18 | xh << 14 | 0) ^ (xh >>> 9 | 0 | wh << 23 | 0) ^ (wh >>> 14 | xh << 18 | 0),
						mJ = (xh >>> 18 | 0 | wh << 14 | 0) ^ (0 | xh << 23 | wh >>> 9) ^ (xh >>> 14 | 0 | wh << 18 | 0),
						nJ = wh & sh ^ oh & (wh ^ -1),
						oJ = xh & th ^ ph & (xh ^ -1),
						pJ = (R.add(bd, Sb, -692930397, 1747873779), D[I >> 2]),
						qJ = (R.add(pJ, D[I + 4 >> 2], kh, lh), D[I >> 2]),
						rJ = (R.add(qJ, D[I + 4 >> 2], nJ, oJ), D[I >> 2]),
						uq = (R.add(rJ, D[I + 4 >> 2], lJ, mJ), D[I >> 2]),
						vq = D[I + 4 >> 2],
						sJ = (zh >>> 2 | 0 | yh << 30 | 0) ^ (zh >>> 7 | 0 | yh << 25 | 0) ^ (yh >>> 28 | zh << 4 | 0),
						tJ = (0 | zh << 30 | yh >>> 2) ^ (0 | zh << 25 | yh >>> 7) ^ (zh >>> 28 | 0 | yh << 4 | 0),
						wq = yh & uh,
						xq = zh & vh,
						uJ = yh & qh ^ sq ^ wq,
						vJ = zh & rh ^ tq ^ xq,
						Ah = (R.add(uq, vq, mh, nh), D[I >> 2]),
						Bh = D[I + 4 >> 2],
						wJ = (R.add(sJ, tJ, uJ, vJ), D[I >> 2]),
						Ch = (R.add(wJ, D[I + 4 >> 2], uq, vq), D[I >> 2]),
						Dh = D[I + 4 >> 2],
						xJ = (Ah >>> 18 | Bh << 14 | 0) ^ (Bh >>> 9 | 0 | Ah << 23 | 0) ^ (Ah >>> 14 | Bh << 18 | 0),
						yJ = (Bh >>> 18 | 0 | Ah << 14 | 0) ^ (0 | Bh << 23 | Ah >>> 9) ^ (Bh >>> 14 | 0 | Ah << 18 | 0),
						zJ = Ah & wh ^ sh & (Ah ^ -1),
						AJ = Bh & xh ^ th & (Bh ^ -1),
						BJ = (R.add(cd, Tb, 1575990012, 1955562222), D[I >> 2]),
						CJ = (R.add(BJ, D[I + 4 >> 2], oh, ph), D[I >> 2]),
						DJ = (R.add(CJ, D[I + 4 >> 2], zJ, AJ), D[I >> 2]),
						yq = (R.add(DJ, D[I + 4 >> 2], xJ, yJ), D[I >> 2]),
						zq = D[I + 4 >> 2],
						EJ = (Dh >>> 2 | 0 | Ch << 30 | 0) ^ (Dh >>> 7 | 0 | Ch << 25 | 0) ^ (Ch >>> 28 | Dh << 4 | 0),
						FJ = (0 | Dh << 30 | Ch >>> 2) ^ (0 | Dh << 25 | Ch >>> 7) ^ (Dh >>> 28 | 0 | Ch << 4 | 0),
						Aq = Ch & yh,
						Bq = Dh & zh,
						GJ = Ch & uh ^ wq ^ Aq,
						HJ = Dh & vh ^ xq ^ Bq,
						Eh = (R.add(yq, zq, qh, rh), D[I >> 2]),
						Fh = D[I + 4 >> 2],
						IJ = (R.add(EJ, FJ, GJ, HJ), D[I >> 2]),
						Gh = (R.add(IJ, D[I + 4 >> 2], yq, zq), D[I >> 2]),
						Hh = D[I + 4 >> 2],
						JJ = (Eh >>> 18 | Fh << 14 | 0) ^ (Fh >>> 9 | 0 | Eh << 23 | 0) ^ (Eh >>> 14 | Fh << 18 | 0),
						KJ = (Fh >>> 18 | 0 | Eh << 14 | 0) ^ (0 | Fh << 23 | Eh >>> 9) ^ (Fh >>> 14 | 0 | Eh << 18 | 0),
						LJ = Eh & Ah ^ wh & (Eh ^ -1),
						MJ = Fh & Bh ^ xh & (Fh ^ -1),
						NJ = (R.add(dd, Ub, 1125592928, 2024104815), D[I >> 2]),
						OJ = (R.add(NJ, D[I + 4 >> 2], sh, th), D[I >> 2]),
						PJ = (R.add(OJ, D[I + 4 >> 2], LJ, MJ), D[I >> 2]),
						Cq = (R.add(PJ, D[I + 4 >> 2], JJ, KJ), D[I >> 2]),
						Dq = D[I + 4 >> 2],
						QJ = (Hh >>> 2 | 0 | Gh << 30 | 0) ^ (Hh >>> 7 | 0 | Gh << 25 | 0) ^ (Gh >>> 28 | Hh << 4 | 0),
						RJ = (0 | Hh << 30 | Gh >>> 2) ^ (0 | Hh << 25 | Gh >>> 7) ^ (Hh >>> 28 | 0 | Gh << 4 | 0),
						Eq = Gh & Ch,
						Fq = Hh & Dh,
						SJ = Gh & yh ^ Aq ^ Eq,
						TJ = Hh & zh ^ Bq ^ Fq,
						Ih = (R.add(Cq, Dq, uh, vh), D[I >> 2]),
						Jh = D[I + 4 >> 2],
						UJ = (R.add(QJ, RJ, SJ, TJ), D[I >> 2]),
						Kh = (R.add(UJ, D[I + 4 >> 2], Cq, Dq), D[I >> 2]),
						Lh = D[I + 4 >> 2],
						VJ = (Ih >>> 18 | Jh << 14 | 0) ^ (Jh >>> 9 | 0 | Ih << 23 | 0) ^ (Ih >>> 14 | Jh << 18 | 0),
						WJ = (Jh >>> 18 | 0 | Ih << 14 | 0) ^ (0 | Jh << 23 | Ih >>> 9) ^ (Jh >>> 14 | 0 | Ih << 18 | 0),
						XJ = Ih & Eh ^ Ah & (Ih ^ -1),
						YJ = Jh & Fh ^ Bh & (Jh ^ -1),
						ZJ = (R.add(ed, Vb, -1578062990, -2067236844), D[I >> 2]),
						$J = (R.add(ZJ, D[I + 4 >> 2], wh, xh), D[I >> 2]),
						aK = (R.add($J, D[I + 4 >> 2], XJ, YJ), D[I >> 2]),
						Gq = (R.add(aK, D[I + 4 >> 2], VJ, WJ), D[I >> 2]),
						Hq = D[I + 4 >> 2],
						bK = (Lh >>> 2 | 0 | Kh << 30 | 0) ^ (Lh >>> 7 | 0 | Kh << 25 | 0) ^ (Kh >>> 28 | Lh << 4 | 0),
						cK = (0 | Lh << 30 | Kh >>> 2) ^ (0 | Lh << 25 | Kh >>> 7) ^ (Lh >>> 28 | 0 | Kh << 4 | 0),
						Iq = Kh & Gh,
						Jq = Lh & Hh,
						dK = Kh & Ch ^ Eq ^ Iq,
						eK = Lh & Dh ^ Fq ^ Jq,
						Mh = (R.add(Gq, Hq, yh, zh), D[I >> 2]),
						Nh = D[I + 4 >> 2],
						fK = (R.add(bK, cK, dK, eK), D[I >> 2]),
						Oh = (R.add(fK, D[I + 4 >> 2], Gq, Hq), D[I >> 2]),
						Ph = D[I + 4 >> 2],
						gK = (Mh >>> 18 | Nh << 14 | 0) ^ (Nh >>> 9 | 0 | Mh << 23 | 0) ^ (Mh >>> 14 | Nh << 18 | 0),
						hK = (Nh >>> 18 | 0 | Mh << 14 | 0) ^ (0 | Nh << 23 | Mh >>> 9) ^ (Nh >>> 14 | 0 | Mh << 18 | 0),
						iK = Mh & Ih ^ Eh & (Mh ^ -1),
						jK = Nh & Jh ^ Fh & (Nh ^ -1),
						kK = (R.add(fd, Wb, 442776044, -1933114872), D[I >> 2]),
						lK = (R.add(kK, D[I + 4 >> 2], Ah, Bh), D[I >> 2]),
						mK = (R.add(lK, D[I + 4 >> 2], iK, jK), D[I >> 2]),
						Kq = (R.add(mK, D[I + 4 >> 2], gK, hK), D[I >> 2]),
						Lq = D[I + 4 >> 2],
						nK = (Ph >>> 2 | 0 | Oh << 30 | 0) ^ (Ph >>> 7 | 0 | Oh << 25 | 0) ^ (Oh >>> 28 | Ph << 4 | 0),
						oK = (0 | Ph << 30 | Oh >>> 2) ^ (0 | Ph << 25 | Oh >>> 7) ^ (Ph >>> 28 | 0 | Oh << 4 | 0),
						Mq = Oh & Kh,
						Nq = Ph & Lh,
						pK = Oh & Gh ^ Iq ^ Mq,
						qK = Ph & Hh ^ Jq ^ Nq,
						Qh = (R.add(Kq, Lq, Ch, Dh), D[I >> 2]),
						Rh = D[I + 4 >> 2],
						rK = (R.add(nK, oK, pK, qK), D[I >> 2]),
						Sh = (R.add(rK, D[I + 4 >> 2], Kq, Lq), D[I >> 2]),
						Th = D[I + 4 >> 2],
						sK = (Qh >>> 18 | Rh << 14 | 0) ^ (Rh >>> 9 | 0 | Qh << 23 | 0) ^ (Qh >>> 14 | Rh << 18 | 0),
						tK = (Rh >>> 18 | 0 | Qh << 14 | 0) ^ (0 | Rh << 23 | Qh >>> 9) ^ (Rh >>> 14 | 0 | Qh << 18 | 0),
						uK = Qh & Mh ^ Ih & (Qh ^ -1),
						vK = Rh & Nh ^ Jh & (Rh ^ -1),
						wK = (R.add(gd, Xb, 593698344, -1866530822), D[I >> 2]),
						xK = (R.add(wK, D[I + 4 >> 2], Eh, Fh), D[I >> 2]),
						yK = (R.add(xK, D[I + 4 >> 2], uK, vK), D[I >> 2]),
						Oq = (R.add(yK, D[I + 4 >> 2], sK, tK), D[I >> 2]),
						Pq = D[I + 4 >> 2],
						zK = (Th >>> 2 | 0 | Sh << 30 | 0) ^ (Th >>> 7 | 0 | Sh << 25 | 0) ^ (Sh >>> 28 | Th << 4 | 0),
						AK = (0 | Th << 30 | Sh >>> 2) ^ (0 | Th << 25 | Sh >>> 7) ^ (Th >>> 28 | 0 | Sh << 4 | 0),
						Qq = Sh & Oh,
						Rq = Th & Ph,
						BK = Sh & Kh ^ Mq ^ Qq,
						CK = Th & Lh ^ Nq ^ Rq,
						Uh = (R.add(Oq, Pq, Gh, Hh), D[I >> 2]),
						Vh = D[I + 4 >> 2],
						DK = (R.add(zK, AK, BK, CK), D[I >> 2]),
						Wh = (R.add(DK, D[I + 4 >> 2], Oq, Pq), D[I >> 2]),
						Xh = D[I + 4 >> 2],
						EK = (Uh >>> 18 | Vh << 14 | 0) ^ (Vh >>> 9 | 0 | Uh << 23 | 0) ^ (Uh >>> 14 | Vh << 18 | 0),
						FK = (Vh >>> 18 | 0 | Uh << 14 | 0) ^ (0 | Vh << 23 | Uh >>> 9) ^ (Vh >>> 14 | 0 | Uh << 18 | 0),
						GK = Uh & Qh ^ Mh & (Uh ^ -1),
						HK = Vh & Rh ^ Nh & (Vh ^ -1),
						IK = (R.add(hd, Yb, -561857047, -1538233109), D[I >> 2]),
						JK = (R.add(IK, D[I + 4 >> 2], Ih, Jh), D[I >> 2]),
						KK = (R.add(JK, D[I + 4 >> 2], GK, HK), D[I >> 2]),
						Sq = (R.add(KK, D[I + 4 >> 2], EK, FK), D[I >> 2]),
						Tq = D[I + 4 >> 2],
						LK = (Xh >>> 2 | 0 | Wh << 30 | 0) ^ (Xh >>> 7 | 0 | Wh << 25 | 0) ^ (Wh >>> 28 | Xh << 4 | 0),
						MK = (0 | Xh << 30 | Wh >>> 2) ^ (0 | Xh << 25 | Wh >>> 7) ^ (Xh >>> 28 | 0 | Wh << 4 | 0),
						Uq = Wh & Sh,
						Vq = Xh & Th,
						NK = Wh & Oh ^ Qq ^ Uq,
						OK = Xh & Ph ^ Rq ^ Vq,
						Yh = (R.add(Sq, Tq, Kh, Lh), D[I >> 2]),
						Zh = D[I + 4 >> 2],
						PK = (R.add(LK, MK, NK, OK), D[I >> 2]),
						$h = (R.add(PK, D[I + 4 >> 2], Sq, Tq), D[I >> 2]),
						ai = D[I + 4 >> 2],
						QK = (Yh >>> 18 | Zh << 14 | 0) ^ (Zh >>> 9 | 0 | Yh << 23 | 0) ^ (Yh >>> 14 | Zh << 18 | 0),
						RK = (Zh >>> 18 | 0 | Yh << 14 | 0) ^ (0 | Zh << 23 | Yh >>> 9) ^ (Zh >>> 14 | 0 | Yh << 18 | 0),
						SK = Yh & Uh ^ Qh & (Yh ^ -1),
						TK = Zh & Vh ^ Rh & (Zh ^ -1),
						UK = (R.add(id, Zb, -1295615723, -1090935817), D[I >> 2]),
						VK = (R.add(UK, D[I + 4 >> 2], Mh, Nh), D[I >> 2]),
						WK = (R.add(VK, D[I + 4 >> 2], SK, TK), D[I >> 2]),
						Wq = (R.add(WK, D[I + 4 >> 2], QK, RK), D[I >> 2]),
						Xq = D[I + 4 >> 2],
						XK = (ai >>> 2 | 0 | $h << 30 | 0) ^ (ai >>> 7 | 0 | $h << 25 | 0) ^ ($h >>> 28 | ai << 4 | 0),
						YK = (0 | ai << 30 | $h >>> 2) ^ (0 | ai << 25 | $h >>> 7) ^ (ai >>> 28 | 0 | $h << 4 | 0),
						Yq = $h & Wh,
						Zq = ai & Xh,
						ZK = $h & Sh ^ Uq ^ Yq,
						$K = ai & Th ^ Vq ^ Zq,
						bi = (R.add(Wq, Xq, Oh, Ph), D[I >> 2]),
						ci = D[I + 4 >> 2],
						aL = (R.add(XK, YK, ZK, $K), D[I >> 2]),
						di = (R.add(aL, D[I + 4 >> 2], Wq, Xq), D[I >> 2]),
						ei = D[I + 4 >> 2],
						bL = (bi >>> 18 | ci << 14 | 0) ^ (ci >>> 9 | 0 | bi << 23 | 0) ^ (bi >>> 14 | ci << 18 | 0),
						cL = (ci >>> 18 | 0 | bi << 14 | 0) ^ (0 | ci << 23 | bi >>> 9) ^ (ci >>> 14 | 0 | bi << 18 | 0),
						dL = bi & Yh ^ Uh & (bi ^ -1),
						eL = ci & Zh ^ Vh & (ci ^ -1),
						fL = (R.add(jd, $b, -479046869, -965641998), D[I >> 2]),
						gL = (R.add(fL, D[I + 4 >> 2], Qh, Rh), D[I >> 2]),
						hL = (R.add(gL, D[I + 4 >> 2], dL, eL), D[I >> 2]),
						$q = (R.add(hL, D[I + 4 >> 2], bL, cL), D[I >> 2]),
						ar = D[I + 4 >> 2],
						iL = (ei >>> 2 | 0 | di << 30 | 0) ^ (ei >>> 7 | 0 | di << 25 | 0) ^ (di >>> 28 | ei << 4 | 0),
						jL = (0 | ei << 30 | di >>> 2) ^ (0 | ei << 25 | di >>> 7) ^ (ei >>> 28 | 0 | di << 4 | 0),
						br = di & $h,
						cr = ei & ai,
						kL = di & Wh ^ Yq ^ br,
						lL = ei & Xh ^ Zq ^ cr,
						fi = (R.add($q, ar, Sh, Th), D[I >> 2]),
						gi = D[I + 4 >> 2],
						mL = (R.add(iL, jL, kL, lL), D[I >> 2]),
						hi = (R.add(mL, D[I + 4 >> 2], $q, ar), D[I >> 2]),
						ii = D[I + 4 >> 2],
						nL = (Zb >>> 29 | 0 | id << 3 | 0) ^ (id >>> 6 | Zb << 26) ^ (id >>> 19 | Zb << 13 | 0),
						oL = (0 | Zb << 3 | id >>> 29) ^ (Zb >>> 6 | 0) ^ (Zb >>> 19 | 0 | id << 13 | 0),
						pL = (R.add((Wc >>> 8 | Mb << 24 | 0) ^ (Wc >>> 7 | Mb << 25) ^ (Wc >>> 1 | Mb << 31 | 0), (Mb >>> 8 | 0 | Wc << 24 | 0) ^ (Mb >>> 7 | 0) ^ (Mb >>> 1 | 0 | Wc << 31 | 0), Vc, Lb), D[I >> 2]),
						qL = (R.add(pL, D[I + 4 >> 2], dd, Ub), D[I >> 2]),
						od = (R.add(qL, D[I + 4 >> 2], nL, oL), D[I >> 2]),
						jc = D[I + 4 >> 2],
						rL = ($b >>> 29 | 0 | jd << 3 | 0) ^ (jd >>> 6 | $b << 26) ^ (jd >>> 19 | $b << 13 | 0),
						sL = (0 | $b << 3 | jd >>> 29) ^ ($b >>> 6 | 0) ^ ($b >>> 19 | 0 | jd << 13 | 0),
						tL = (R.add((Xc >>> 8 | Nb << 24 | 0) ^ (Xc >>> 7 | Nb << 25) ^ (Xc >>> 1 | Nb << 31 | 0), (Nb >>> 8 | 0 | Xc << 24 | 0) ^ (Nb >>> 7 | 0) ^ (Nb >>> 1 | 0 | Xc << 31 | 0), Wc, Mb), D[I >> 2]),
						uL = (R.add(tL, D[I + 4 >> 2], ed, Vb), D[I >> 2]),
						Tj = (R.add(uL, D[I + 4 >> 2], rL, sL), D[I >> 2]),
						Ej = D[I + 4 >> 2],
						vL = (jc >>> 29 | 0 | od << 3 | 0) ^ (od >>> 6 | jc << 26) ^ (od >>> 19 | jc << 13 | 0),
						wL = (0 | jc << 3 | od >>> 29) ^ (jc >>> 6 | 0) ^ (jc >>> 19 | 0 | od << 13 | 0),
						xL = (R.add((Yc >>> 8 | Ob << 24 | 0) ^ (Yc >>> 7 | Ob << 25) ^ (Yc >>> 1 | Ob << 31 | 0), (Ob >>> 8 | 0 | Yc << 24 | 0) ^ (Ob >>> 7 | 0) ^ (Ob >>> 1 | 0 | Yc << 31 | 0), Xc, Nb), D[I >> 2]),
						yL = (R.add(xL, D[I + 4 >> 2], fd, Wb), D[I >> 2]),
						Uj = (R.add(yL, D[I + 4 >> 2], vL, wL), D[I >> 2]),
						Fj = D[I + 4 >> 2],
						zL = (Ej >>> 29 | 0 | Tj << 3 | 0) ^ (Tj >>> 6 | Ej << 26) ^ (Tj >>> 19 | Ej << 13 | 0),
						AL = (0 | Ej << 3 | Tj >>> 29) ^ (Ej >>> 6 | 0) ^ (Ej >>> 19 | 0 | Tj << 13 | 0),
						BL = (R.add((Zc >>> 8 | Pb << 24 | 0) ^ (Zc >>> 7 | Pb << 25) ^ (Zc >>> 1 | Pb << 31 | 0), (Pb >>> 8 | 0 | Zc << 24 | 0) ^ (Pb >>> 7 | 0) ^ (Pb >>> 1 | 0 | Zc << 31 | 0), Yc, Ob), D[I >> 2]),
						CL = (R.add(BL, D[I + 4 >> 2], gd, Xb), D[I >> 2]),
						Vj = (R.add(CL, D[I + 4 >> 2], zL, AL), D[I >> 2]),
						Gj = D[I + 4 >> 2],
						DL = (Fj >>> 29 | 0 | Uj << 3 | 0) ^ (Uj >>> 6 | Fj << 26) ^ (Uj >>> 19 | Fj << 13 | 0),
						EL = (0 | Fj << 3 | Uj >>> 29) ^ (Fj >>> 6 | 0) ^ (Fj >>> 19 | 0 | Uj << 13 | 0),
						FL = (R.add(($c >>> 8 | Qb << 24 | 0) ^ ($c >>> 7 | Qb << 25) ^ ($c >>> 1 | Qb << 31 | 0), (Qb >>> 8 | 0 | $c << 24 | 0) ^ (Qb >>> 7 | 0) ^ (Qb >>> 1 | 0 | $c << 31 | 0), Zc, Pb), D[I >> 2]),
						GL = (R.add(FL, D[I + 4 >> 2], hd, Yb), D[I >> 2]),
						Wj = (R.add(GL, D[I + 4 >> 2], DL, EL), D[I >> 2]),
						Hj = D[I + 4 >> 2],
						HL = (Gj >>> 29 | 0 | Vj << 3 | 0) ^ (Vj >>> 6 | Gj << 26) ^ (Vj >>> 19 | Gj << 13 | 0),
						IL = (0 | Gj << 3 | Vj >>> 29) ^ (Gj >>> 6 | 0) ^ (Gj >>> 19 | 0 | Vj << 13 | 0),
						JL = (R.add((ad >>> 8 | Rb << 24 | 0) ^ (ad >>> 7 | Rb << 25) ^ (ad >>> 1 | Rb << 31 | 0), (Rb >>> 8 | 0 | ad << 24 | 0) ^ (Rb >>> 7 | 0) ^ (Rb >>> 1 | 0 | ad << 31 | 0), $c, Qb), D[I >> 2]),
						KL = (R.add(JL, D[I + 4 >> 2], id, Zb), D[I >> 2]),
						Xj = (R.add(KL, D[I + 4 >> 2], HL, IL), D[I >> 2]),
						Ij = D[I + 4 >> 2],
						LL = (Hj >>> 29 | 0 | Wj << 3 | 0) ^ (Wj >>> 6 | Hj << 26) ^ (Wj >>> 19 | Hj << 13 | 0),
						ML = (0 | Hj << 3 | Wj >>> 29) ^ (Hj >>> 6 | 0) ^ (Hj >>> 19 | 0 | Wj << 13 | 0),
						NL = (R.add((bd >>> 8 | Sb << 24 | 0) ^ (bd >>> 7 | Sb << 25) ^ (bd >>> 1 | Sb << 31 | 0), (Sb >>> 8 | 0 | bd << 24 | 0) ^ (Sb >>> 7 | 0) ^ (Sb >>> 1 | 0 | bd << 31 | 0), ad, Rb), D[I >> 2]),
						OL = (R.add(NL, D[I + 4 >> 2], jd, $b), D[I >> 2]),
						Yj = (R.add(OL, D[I + 4 >> 2], LL, ML), D[I >> 2]),
						Jj = D[I + 4 >> 2],
						PL = (Ij >>> 29 | 0 | Xj << 3 | 0) ^ (Xj >>> 6 | Ij << 26) ^ (Xj >>> 19 | Ij << 13 | 0),
						QL = (0 | Ij << 3 | Xj >>> 29) ^ (Ij >>> 6 | 0) ^ (Ij >>> 19 | 0 | Xj << 13 | 0),
						RL = (R.add((cd >>> 8 | Tb << 24 | 0) ^ (cd >>> 7 | Tb << 25) ^ (cd >>> 1 | Tb << 31 | 0), (Tb >>> 8 | 0 | cd << 24 | 0) ^ (Tb >>> 7 | 0) ^ (Tb >>> 1 | 0 | cd << 31 | 0), bd, Sb), D[I >> 2]),
						SL = (R.add(RL, D[I + 4 >> 2], od, jc), D[I >> 2]),
						Zj = (R.add(SL, D[I + 4 >> 2], PL, QL), D[I >> 2]),
						Kj = D[I + 4 >> 2],
						TL = (Jj >>> 29 | 0 | Yj << 3 | 0) ^ (Yj >>> 6 | Jj << 26) ^ (Yj >>> 19 | Jj << 13 | 0),
						UL = (0 | Jj << 3 | Yj >>> 29) ^ (Jj >>> 6 | 0) ^ (Jj >>> 19 | 0 | Yj << 13 | 0),
						VL = (R.add((dd >>> 8 | Ub << 24 | 0) ^ (dd >>> 7 | Ub << 25) ^ (dd >>> 1 | Ub << 31 | 0), (Ub >>> 8 | 0 | dd << 24 | 0) ^ (Ub >>> 7 | 0) ^ (Ub >>> 1 | 0 | dd << 31 | 0), cd, Tb), D[I >> 2]),
						WL = (R.add(VL, D[I + 4 >> 2], Tj, Ej), D[I >> 2]),
						$j = (R.add(WL, D[I + 4 >> 2], TL, UL), D[I >> 2]),
						Lj = D[I + 4 >> 2],
						XL = (Kj >>> 29 | 0 | Zj << 3 | 0) ^ (Zj >>> 6 | Kj << 26) ^ (Zj >>> 19 | Kj << 13 | 0),
						YL = (0 | Kj << 3 | Zj >>> 29) ^ (Kj >>> 6 | 0) ^ (Kj >>> 19 | 0 | Zj << 13 | 0),
						ZL = (R.add((ed >>> 8 | Vb << 24 | 0) ^ (ed >>> 7 | Vb << 25) ^ (ed >>> 1 | Vb << 31 | 0), (Vb >>> 8 | 0 | ed << 24 | 0) ^ (Vb >>> 7 | 0) ^ (Vb >>> 1 | 0 | ed << 31 | 0), dd, Ub), D[I >> 2]),
						$L = (R.add(ZL, D[I + 4 >> 2], Uj, Fj), D[I >> 2]),
						ok = (R.add($L, D[I + 4 >> 2], XL, YL), D[I >> 2]),
						ak = D[I + 4 >> 2],
						aM = (Lj >>> 29 | 0 | $j << 3 | 0) ^ ($j >>> 6 | Lj << 26) ^ ($j >>> 19 | Lj << 13 | 0),
						bM = (0 | Lj << 3 | $j >>> 29) ^ (Lj >>> 6 | 0) ^ (Lj >>> 19 | 0 | $j << 13 | 0),
						cM = (R.add((fd >>> 8 | Wb << 24 | 0) ^ (fd >>> 7 | Wb << 25) ^ (fd >>> 1 | Wb << 31 | 0), (Wb >>> 8 | 0 | fd << 24 | 0) ^ (Wb >>> 7 | 0) ^ (Wb >>> 1 | 0 | fd << 31 | 0), ed, Vb), D[I >> 2]),
						dM = (R.add(cM, D[I + 4 >> 2], Vj, Gj), D[I >> 2]),
						pk = (R.add(dM, D[I + 4 >> 2], aM, bM), D[I >> 2]),
						bk = D[I + 4 >> 2],
						eM = (ak >>> 29 | 0 | ok << 3 | 0) ^ (ok >>> 6 | ak << 26) ^ (ok >>> 19 | ak << 13 | 0),
						fM = (0 | ak << 3 | ok >>> 29) ^ (ak >>> 6 | 0) ^ (ak >>> 19 | 0 | ok << 13 | 0),
						gM = (R.add((gd >>> 8 | Xb << 24 | 0) ^ (gd >>> 7 | Xb << 25) ^ (gd >>> 1 | Xb << 31 | 0), (Xb >>> 8 | 0 | gd << 24 | 0) ^ (Xb >>> 7 | 0) ^ (Xb >>> 1 | 0 | gd << 31 | 0), fd, Wb), D[I >> 2]),
						hM = (R.add(gM, D[I + 4 >> 2], Wj, Hj), D[I >> 2]),
						qk = (R.add(hM, D[I + 4 >> 2], eM, fM), D[I >> 2]),
						ck = D[I + 4 >> 2],
						iM = (bk >>> 29 | 0 | pk << 3 | 0) ^ (pk >>> 6 | bk << 26) ^ (pk >>> 19 | bk << 13 | 0),
						jM = (0 | bk << 3 | pk >>> 29) ^ (bk >>> 6 | 0) ^ (bk >>> 19 | 0 | pk << 13 | 0),
						kM = (R.add((hd >>> 8 | Yb << 24 | 0) ^ (hd >>> 7 | Yb << 25) ^ (hd >>> 1 | Yb << 31 | 0), (Yb >>> 8 | 0 | hd << 24 | 0) ^ (Yb >>> 7 | 0) ^ (Yb >>> 1 | 0 | hd << 31 | 0), gd, Xb), D[I >> 2]),
						lM = (R.add(kM, D[I + 4 >> 2], Xj, Ij), D[I >> 2]),
						rk = (R.add(lM, D[I + 4 >> 2], iM, jM), D[I >> 2]),
						dk = D[I + 4 >> 2],
						mM = (ck >>> 29 | 0 | qk << 3 | 0) ^ (qk >>> 6 | ck << 26) ^ (qk >>> 19 | ck << 13 | 0),
						nM = (0 | ck << 3 | qk >>> 29) ^ (ck >>> 6 | 0) ^ (ck >>> 19 | 0 | qk << 13 | 0),
						oM = (R.add((id >>> 8 | Zb << 24 | 0) ^ (id >>> 7 | Zb << 25) ^ (id >>> 1 | Zb << 31 | 0), (Zb >>> 8 | 0 | id << 24 | 0) ^ (Zb >>> 7 | 0) ^ (Zb >>> 1 | 0 | id << 31 | 0), hd, Yb), D[I >> 2]),
						pM = (R.add(oM, D[I + 4 >> 2], Yj, Jj), D[I >> 2]),
						sk = (R.add(pM, D[I + 4 >> 2], mM, nM), D[I >> 2]),
						ek = D[I + 4 >> 2],
						qM = (dk >>> 29 | 0 | rk << 3 | 0) ^ (rk >>> 6 | dk << 26) ^ (rk >>> 19 | dk << 13 | 0),
						rM = (0 | dk << 3 | rk >>> 29) ^ (dk >>> 6 | 0) ^ (dk >>> 19 | 0 | rk << 13 | 0),
						sM = (jd >>> 8 | $b << 24 | 0) ^ (jd >>> 7 | $b << 25) ^ (jd >>> 1 | $b << 31 | 0),
						tM = ($b >>> 8 | 0 | jd << 24 | 0) ^ ($b >>> 7 | 0) ^ ($b >>> 1 | 0 | jd << 31 | 0),
						uM = (ek >>> 29 | 0 | sk << 3 | 0) ^ (sk >>> 6 | ek << 26) ^ (sk >>> 19 | ek << 13 | 0),
						vM = (0 | ek << 3 | sk >>> 29) ^ (ek >>> 6 | 0) ^ (ek >>> 19 | 0 | sk << 13 | 0),
						wM = (od >>> 8 | jc << 24 | 0) ^ (od >>> 7 | jc << 25) ^ (od >>> 1 | jc << 31 | 0),
						xM = (jc >>> 8 | 0 | od << 24 | 0) ^ (jc >>> 7 | 0) ^ (jc >>> 1 | 0 | od << 31 | 0),
						yM = (fi >>> 18 | gi << 14 | 0) ^ (gi >>> 9 | 0 | fi << 23 | 0) ^ (fi >>> 14 | gi << 18 | 0),
						zM = (gi >>> 18 | 0 | fi << 14 | 0) ^ (0 | gi << 23 | fi >>> 9) ^ (gi >>> 14 | 0 | fi << 18 | 0),
						AM = fi & bi ^ Yh & (fi ^ -1),
						BM = gi & ci ^ Zh & (gi ^ -1),
						CM = (R.add(od, jc, -366583396, -903397682), D[I >> 2]),
						DM = (R.add(CM, D[I + 4 >> 2], Uh, Vh), D[I >> 2]),
						EM = (R.add(DM, D[I + 4 >> 2], AM, BM), D[I >> 2]),
						dr = (R.add(EM, D[I + 4 >> 2], yM, zM), D[I >> 2]),
						er = D[I + 4 >> 2],
						FM = (ii >>> 2 | 0 | hi << 30 | 0) ^ (ii >>> 7 | 0 | hi << 25 | 0) ^ (hi >>> 28 | ii << 4 | 0),
						GM = (0 | ii << 30 | hi >>> 2) ^ (0 | ii << 25 | hi >>> 7) ^ (ii >>> 28 | 0 | hi << 4 | 0),
						fr = hi & di,
						gr = ii & ei,
						HM = hi & $h ^ br ^ fr,
						IM = ii & ai ^ cr ^ gr,
						ji = (R.add(dr, er, Wh, Xh), D[I >> 2]),
						ki = D[I + 4 >> 2],
						JM = (R.add(FM, GM, HM, IM), D[I >> 2]),
						li = (R.add(JM, D[I + 4 >> 2], dr, er), D[I >> 2]),
						mi = D[I + 4 >> 2],
						KM = (ji >>> 18 | ki << 14 | 0) ^ (ki >>> 9 | 0 | ji << 23 | 0) ^ (ji >>> 14 | ki << 18 | 0),
						LM = (ki >>> 18 | 0 | ji << 14 | 0) ^ (0 | ki << 23 | ji >>> 9) ^ (ki >>> 14 | 0 | ji << 18 | 0),
						MM = ji & fi ^ bi & (ji ^ -1),
						NM = ki & gi ^ ci & (ki ^ -1),
						OM = (R.add(Tj, Ej, 566280711, -779700025), D[I >> 2]),
						PM = (R.add(OM, D[I + 4 >> 2], Yh, Zh), D[I >> 2]),
						QM = (R.add(PM, D[I + 4 >> 2], MM, NM), D[I >> 2]),
						hr = (R.add(QM, D[I + 4 >> 2], KM, LM), D[I >> 2]),
						ir = D[I + 4 >> 2],
						RM = (mi >>> 2 | 0 | li << 30 | 0) ^ (mi >>> 7 | 0 | li << 25 | 0) ^ (li >>> 28 | mi << 4 | 0),
						SM = (0 | mi << 30 | li >>> 2) ^ (0 | mi << 25 | li >>> 7) ^ (mi >>> 28 | 0 | li << 4 | 0),
						jr = li & hi,
						kr = mi & ii,
						TM = li & di ^ fr ^ jr,
						UM = mi & ei ^ gr ^ kr,
						ni = (R.add(hr, ir, $h, ai), D[I >> 2]),
						oi = D[I + 4 >> 2],
						VM = (R.add(RM, SM, TM, UM), D[I >> 2]),
						pi = (R.add(VM, D[I + 4 >> 2], hr, ir), D[I >> 2]),
						qi = D[I + 4 >> 2],
						WM = (ni >>> 18 | oi << 14 | 0) ^ (oi >>> 9 | 0 | ni << 23 | 0) ^ (ni >>> 14 | oi << 18 | 0),
						XM = (oi >>> 18 | 0 | ni << 14 | 0) ^ (0 | oi << 23 | ni >>> 9) ^ (oi >>> 14 | 0 | ni << 18 | 0),
						YM = ni & ji ^ fi & (ni ^ -1),
						ZM = oi & ki ^ gi & (oi ^ -1),
						$M = (R.add(Uj, Fj, -840897762, -354779690), D[I >> 2]),
						aN = (R.add($M, D[I + 4 >> 2], bi, ci), D[I >> 2]),
						bN = (R.add(aN, D[I + 4 >> 2], YM, ZM), D[I >> 2]),
						lr = (R.add(bN, D[I + 4 >> 2], WM, XM), D[I >> 2]),
						mr = D[I + 4 >> 2],
						cN = (qi >>> 2 | 0 | pi << 30 | 0) ^ (qi >>> 7 | 0 | pi << 25 | 0) ^ (pi >>> 28 | qi << 4 | 0),
						dN = (0 | qi << 30 | pi >>> 2) ^ (0 | qi << 25 | pi >>> 7) ^ (qi >>> 28 | 0 | pi << 4 | 0),
						nr = pi & li,
						or = qi & mi,
						eN = pi & hi ^ jr ^ nr,
						fN = qi & ii ^ kr ^ or,
						ri = (R.add(lr, mr, di, ei), D[I >> 2]),
						si = D[I + 4 >> 2],
						gN = (R.add(cN, dN, eN, fN), D[I >> 2]),
						ti = (R.add(gN, D[I + 4 >> 2], lr, mr), D[I >> 2]),
						ui = D[I + 4 >> 2],
						hN = (ri >>> 18 | si << 14 | 0) ^ (si >>> 9 | 0 | ri << 23 | 0) ^ (ri >>> 14 | si << 18 | 0),
						iN = (si >>> 18 | 0 | ri << 14 | 0) ^ (0 | si << 23 | ri >>> 9) ^ (si >>> 14 | 0 | ri << 18 | 0),
						jN = ri & ni ^ ji & (ri ^ -1),
						kN = si & oi ^ ki & (si ^ -1),
						lN = (R.add(Vj, Gj, -294727304, -176337025), D[I >> 2]),
						mN = (R.add(lN, D[I + 4 >> 2], fi, gi), D[I >> 2]),
						nN = (R.add(mN, D[I + 4 >> 2], jN, kN), D[I >> 2]),
						pr = (R.add(nN, D[I + 4 >> 2], hN, iN), D[I >> 2]),
						qr = D[I + 4 >> 2],
						oN = (ui >>> 2 | 0 | ti << 30 | 0) ^ (ui >>> 7 | 0 | ti << 25 | 0) ^ (ti >>> 28 | ui << 4 | 0),
						pN = (0 | ui << 30 | ti >>> 2) ^ (0 | ui << 25 | ti >>> 7) ^ (ui >>> 28 | 0 | ti << 4 | 0),
						rr = ti & pi,
						sr = ui & qi,
						qN = ti & li ^ nr ^ rr,
						rN = ui & mi ^ or ^ sr,
						vi = (R.add(pr, qr, hi, ii), D[I >> 2]),
						wi = D[I + 4 >> 2],
						sN = (R.add(oN, pN, qN, rN), D[I >> 2]),
						xi = (R.add(sN, D[I + 4 >> 2], pr, qr), D[I >> 2]),
						yi = D[I + 4 >> 2],
						tN = (vi >>> 18 | wi << 14 | 0) ^ (wi >>> 9 | 0 | vi << 23 | 0) ^ (vi >>> 14 | wi << 18 | 0),
						uN = (wi >>> 18 | 0 | vi << 14 | 0) ^ (0 | wi << 23 | vi >>> 9) ^ (wi >>> 14 | 0 | vi << 18 | 0),
						vN = vi & ri ^ ni & (vi ^ -1),
						wN = wi & si ^ oi & (wi ^ -1),
						xN = (R.add(Wj, Hj, 1914138554, 116418474), D[I >> 2]),
						yN = (R.add(xN, D[I + 4 >> 2], ji, ki), D[I >> 2]),
						zN = (R.add(yN, D[I + 4 >> 2], vN, wN), D[I >> 2]),
						tr = (R.add(zN, D[I + 4 >> 2], tN, uN), D[I >> 2]),
						ur = D[I + 4 >> 2],
						AN = (yi >>> 2 | 0 | xi << 30 | 0) ^ (yi >>> 7 | 0 | xi << 25 | 0) ^ (xi >>> 28 | yi << 4 | 0),
						BN = (0 | yi << 30 | xi >>> 2) ^ (0 | yi << 25 | xi >>> 7) ^ (yi >>> 28 | 0 | xi << 4 | 0),
						vr = xi & ti,
						wr = yi & ui,
						CN = xi & pi ^ rr ^ vr,
						DN = yi & qi ^ sr ^ wr,
						zi = (R.add(tr, ur, li, mi), D[I >> 2]),
						Ai = D[I + 4 >> 2],
						EN = (R.add(AN, BN, CN, DN), D[I >> 2]),
						Bi = (R.add(EN, D[I + 4 >> 2], tr, ur), D[I >> 2]),
						Ci = D[I + 4 >> 2],
						FN = (zi >>> 18 | Ai << 14 | 0) ^ (Ai >>> 9 | 0 | zi << 23 | 0) ^ (zi >>> 14 | Ai << 18 | 0),
						GN = (Ai >>> 18 | 0 | zi << 14 | 0) ^ (0 | Ai << 23 | zi >>> 9) ^ (Ai >>> 14 | 0 | zi << 18 | 0),
						HN = zi & vi ^ ri & (zi ^ -1),
						IN = Ai & wi ^ si & (Ai ^ -1),
						JN = (R.add(Xj, Ij, -1563912026, 174292421), D[I >> 2]),
						KN = (R.add(JN, D[I + 4 >> 2], ni, oi), D[I >> 2]),
						LN = (R.add(KN, D[I + 4 >> 2], HN, IN), D[I >> 2]),
						xr = (R.add(LN, D[I + 4 >> 2], FN, GN), D[I >> 2]),
						yr = D[I + 4 >> 2],
						MN = (Ci >>> 2 | 0 | Bi << 30 | 0) ^ (Ci >>> 7 | 0 | Bi << 25 | 0) ^ (Bi >>> 28 | Ci << 4 | 0),
						NN = (0 | Ci << 30 | Bi >>> 2) ^ (0 | Ci << 25 | Bi >>> 7) ^ (Ci >>> 28 | 0 | Bi << 4 | 0),
						zr = Bi & xi,
						Ar = Ci & yi,
						ON = Bi & ti ^ vr ^ zr,
						PN = Ci & ui ^ wr ^ Ar,
						Di = (R.add(xr, yr, pi, qi), D[I >> 2]),
						Ei = D[I + 4 >> 2],
						QN = (R.add(MN, NN, ON, PN), D[I >> 2]),
						Fi = (R.add(QN, D[I + 4 >> 2], xr, yr), D[I >> 2]),
						Gi = D[I + 4 >> 2],
						RN = (Di >>> 18 | Ei << 14 | 0) ^ (Ei >>> 9 | 0 | Di << 23 | 0) ^ (Di >>> 14 | Ei << 18 | 0),
						SN = (Ei >>> 18 | 0 | Di << 14 | 0) ^ (0 | Ei << 23 | Di >>> 9) ^ (Ei >>> 14 | 0 | Di << 18 | 0),
						TN = Di & zi ^ vi & (Di ^ -1),
						UN = Ei & Ai ^ wi & (Ei ^ -1),
						VN = (R.add(Yj, Jj, -1090974290, 289380356), D[I >> 2]),
						WN = (R.add(VN, D[I + 4 >> 2], ri, si), D[I >> 2]),
						XN = (R.add(WN, D[I + 4 >> 2], TN, UN), D[I >> 2]),
						Br = (R.add(XN, D[I + 4 >> 2], RN, SN), D[I >> 2]),
						Cr = D[I + 4 >> 2],
						YN = (Gi >>> 2 | 0 | Fi << 30 | 0) ^ (Gi >>> 7 | 0 | Fi << 25 | 0) ^ (Fi >>> 28 | Gi << 4 | 0),
						ZN = (0 | Gi << 30 | Fi >>> 2) ^ (0 | Gi << 25 | Fi >>> 7) ^ (Gi >>> 28 | 0 | Fi << 4 | 0),
						Dr = Fi & Bi,
						Er = Gi & Ci,
						$N = Fi & xi ^ zr ^ Dr,
						aO = Gi & yi ^ Ar ^ Er,
						Hi = (R.add(Br, Cr, ti, ui), D[I >> 2]),
						Ii = D[I + 4 >> 2],
						bO = (R.add(YN, ZN, $N, aO), D[I >> 2]),
						Ji = (R.add(bO, D[I + 4 >> 2], Br, Cr), D[I >> 2]),
						Ki = D[I + 4 >> 2],
						cO = (Hi >>> 18 | Ii << 14 | 0) ^ (Ii >>> 9 | 0 | Hi << 23 | 0) ^ (Hi >>> 14 | Ii << 18 | 0),
						dO = (Ii >>> 18 | 0 | Hi << 14 | 0) ^ (0 | Ii << 23 | Hi >>> 9) ^ (Ii >>> 14 | 0 | Hi << 18 | 0),
						eO = Hi & Di ^ zi & (Hi ^ -1),
						fO = Ii & Ei ^ Ai & (Ii ^ -1),
						gO = (R.add(Zj, Kj, 320620315, 460393269), D[I >> 2]),
						hO = (R.add(gO, D[I + 4 >> 2], vi, wi), D[I >> 2]),
						iO = (R.add(hO, D[I + 4 >> 2], eO, fO), D[I >> 2]),
						Fr = (R.add(iO, D[I + 4 >> 2], cO, dO), D[I >> 2]),
						Gr = D[I + 4 >> 2],
						jO = (Ki >>> 2 | 0 | Ji << 30 | 0) ^ (Ki >>> 7 | 0 | Ji << 25 | 0) ^ (Ji >>> 28 | Ki << 4 | 0),
						kO = (0 | Ki << 30 | Ji >>> 2) ^ (0 | Ki << 25 | Ji >>> 7) ^ (Ki >>> 28 | 0 | Ji << 4 | 0),
						Hr = Ji & Fi,
						Ir = Ki & Gi,
						lO = Ji & Bi ^ Dr ^ Hr,
						mO = Ki & Ci ^ Er ^ Ir,
						Li = (R.add(Fr, Gr, xi, yi), D[I >> 2]),
						Mi = D[I + 4 >> 2],
						nO = (R.add(jO, kO, lO, mO), D[I >> 2]),
						Ni = (R.add(nO, D[I + 4 >> 2], Fr, Gr), D[I >> 2]),
						Oi = D[I + 4 >> 2],
						oO = (Li >>> 18 | Mi << 14 | 0) ^ (Mi >>> 9 | 0 | Li << 23 | 0) ^ (Li >>> 14 | Mi << 18 | 0),
						pO = (Mi >>> 18 | 0 | Li << 14 | 0) ^ (0 | Mi << 23 | Li >>> 9) ^ (Mi >>> 14 | 0 | Li << 18 | 0),
						qO = Li & Hi ^ Di & (Li ^ -1),
						rO = Mi & Ii ^ Ei & (Mi ^ -1),
						sO = (R.add($j, Lj, 587496836, 685471733), D[I >> 2]),
						tO = (R.add(sO, D[I + 4 >> 2], zi, Ai), D[I >> 2]),
						uO = (R.add(tO, D[I + 4 >> 2], qO, rO), D[I >> 2]),
						Jr = (R.add(uO, D[I + 4 >> 2], oO, pO), D[I >> 2]),
						Kr = D[I + 4 >> 2],
						vO = (Oi >>> 2 | 0 | Ni << 30 | 0) ^ (Oi >>> 7 | 0 | Ni << 25 | 0) ^ (Ni >>> 28 | Oi << 4 | 0),
						wO = (0 | Oi << 30 | Ni >>> 2) ^ (0 | Oi << 25 | Ni >>> 7) ^ (Oi >>> 28 | 0 | Ni << 4 | 0),
						Lr = Ni & Ji,
						Mr = Oi & Ki,
						xO = Ni & Fi ^ Hr ^ Lr,
						yO = Oi & Gi ^ Ir ^ Mr,
						Pi = (R.add(Jr, Kr, Bi, Ci), D[I >> 2]),
						Qi = D[I + 4 >> 2],
						zO = (R.add(vO, wO, xO, yO), D[I >> 2]),
						Ri = (R.add(zO, D[I + 4 >> 2], Jr, Kr), D[I >> 2]),
						Si = D[I + 4 >> 2],
						AO = (Pi >>> 18 | Qi << 14 | 0) ^ (Qi >>> 9 | 0 | Pi << 23 | 0) ^ (Pi >>> 14 | Qi << 18 | 0),
						BO = (Qi >>> 18 | 0 | Pi << 14 | 0) ^ (0 | Qi << 23 | Pi >>> 9) ^ (Qi >>> 14 | 0 | Pi << 18 | 0),
						CO = Pi & Li ^ Hi & (Pi ^ -1),
						DO = Qi & Mi ^ Ii & (Qi ^ -1),
						EO = (R.add(ok, ak, 1086792851, 852142971), D[I >> 2]),
						FO = (R.add(EO, D[I + 4 >> 2], Di, Ei), D[I >> 2]),
						GO = (R.add(FO, D[I + 4 >> 2], CO, DO), D[I >> 2]),
						Nr = (R.add(GO, D[I + 4 >> 2], AO, BO), D[I >> 2]),
						Or = D[I + 4 >> 2],
						HO = (Si >>> 2 | 0 | Ri << 30 | 0) ^ (Si >>> 7 | 0 | Ri << 25 | 0) ^ (Ri >>> 28 | Si << 4 | 0),
						IO = (0 | Si << 30 | Ri >>> 2) ^ (0 | Si << 25 | Ri >>> 7) ^ (Si >>> 28 | 0 | Ri << 4 | 0),
						Pr = Ri & Ni,
						Qr = Si & Oi,
						JO = Ri & Ji ^ Lr ^ Pr,
						KO = Si & Ki ^ Mr ^ Qr,
						Ti = (R.add(Nr, Or, Fi, Gi), D[I >> 2]),
						Ui = D[I + 4 >> 2],
						LO = (R.add(HO, IO, JO, KO), D[I >> 2]),
						Vi = (R.add(LO, D[I + 4 >> 2], Nr, Or), D[I >> 2]),
						Wi = D[I + 4 >> 2],
						MO = (Ti >>> 18 | Ui << 14 | 0) ^ (Ui >>> 9 | 0 | Ti << 23 | 0) ^ (Ti >>> 14 | Ui << 18 | 0),
						NO = (Ui >>> 18 | 0 | Ti << 14 | 0) ^ (0 | Ui << 23 | Ti >>> 9) ^ (Ui >>> 14 | 0 | Ti << 18 | 0),
						OO = Ti & Pi ^ Li & (Ti ^ -1),
						PO = Ui & Qi ^ Mi & (Ui ^ -1),
						QO = (R.add(pk, bk, 365543100, 1017036298), D[I >> 2]),
						RO = (R.add(QO, D[I + 4 >> 2], Hi, Ii), D[I >> 2]),
						SO = (R.add(RO, D[I + 4 >> 2], OO, PO), D[I >> 2]),
						Rr = (R.add(SO, D[I + 4 >> 2], MO, NO), D[I >> 2]),
						Sr = D[I + 4 >> 2],
						TO = (Wi >>> 2 | 0 | Vi << 30 | 0) ^ (Wi >>> 7 | 0 | Vi << 25 | 0) ^ (Vi >>> 28 | Wi << 4 | 0),
						UO = (0 | Wi << 30 | Vi >>> 2) ^ (0 | Wi << 25 | Vi >>> 7) ^ (Wi >>> 28 | 0 | Vi << 4 | 0),
						Tr = Vi & Ri,
						Ur = Wi & Si,
						VO = Vi & Ni ^ Pr ^ Tr,
						WO = Wi & Oi ^ Qr ^ Ur,
						Xi = (R.add(Rr, Sr, Ji, Ki), D[I >> 2]),
						Yi = D[I + 4 >> 2],
						XO = (R.add(TO, UO, VO, WO), D[I >> 2]),
						Zi = (R.add(XO, D[I + 4 >> 2], Rr, Sr), D[I >> 2]),
						$i = D[I + 4 >> 2],
						YO = (Xi >>> 18 | Yi << 14 | 0) ^ (Yi >>> 9 | 0 | Xi << 23 | 0) ^ (Xi >>> 14 | Yi << 18 | 0),
						ZO = (Yi >>> 18 | 0 | Xi << 14 | 0) ^ (0 | Yi << 23 | Xi >>> 9) ^ (Yi >>> 14 | 0 | Xi << 18 | 0),
						$O = Xi & Ti ^ Pi & (Xi ^ -1),
						aP = Yi & Ui ^ Qi & (Yi ^ -1),
						bP = (R.add(qk, ck, -1676669620, 1126000580), D[I >> 2]),
						cP = (R.add(bP, D[I + 4 >> 2], Li, Mi), D[I >> 2]),
						dP = (R.add(cP, D[I + 4 >> 2], $O, aP), D[I >> 2]),
						Vr = (R.add(dP, D[I + 4 >> 2], YO, ZO), D[I >> 2]),
						Wr = D[I + 4 >> 2],
						eP = ($i >>> 2 | 0 | Zi << 30 | 0) ^ ($i >>> 7 | 0 | Zi << 25 | 0) ^ (Zi >>> 28 | $i << 4 | 0),
						fP = (0 | $i << 30 | Zi >>> 2) ^ (0 | $i << 25 | Zi >>> 7) ^ ($i >>> 28 | 0 | Zi << 4 | 0),
						Xr = Zi & Vi,
						Yr = $i & Wi,
						gP = Zi & Ri ^ Tr ^ Xr,
						hP = $i & Si ^ Ur ^ Yr,
						aj = (R.add(Vr, Wr, Ni, Oi), D[I >> 2]),
						bj = D[I + 4 >> 2],
						iP = (R.add(eP, fP, gP, hP), D[I >> 2]),
						cj = (R.add(iP, D[I + 4 >> 2], Vr, Wr), D[I >> 2]),
						dj = D[I + 4 >> 2],
						jP = (aj >>> 18 | bj << 14 | 0) ^ (bj >>> 9 | 0 | aj << 23 | 0) ^ (aj >>> 14 | bj << 18 | 0),
						kP = (bj >>> 18 | 0 | aj << 14 | 0) ^ (0 | bj << 23 | aj >>> 9) ^ (bj >>> 14 | 0 | aj << 18 | 0),
						lP = aj & Xi ^ Ti & (aj ^ -1),
						mP = bj & Yi ^ Ui & (bj ^ -1),
						nP = (R.add(rk, dk, -885112138, 1288033470), D[I >> 2]),
						oP = (R.add(nP, D[I + 4 >> 2], Pi, Qi), D[I >> 2]),
						pP = (R.add(oP, D[I + 4 >> 2], lP, mP), D[I >> 2]),
						Zr = (R.add(pP, D[I + 4 >> 2], jP, kP), D[I >> 2]),
						$r = D[I + 4 >> 2],
						qP = (dj >>> 2 | 0 | cj << 30 | 0) ^ (dj >>> 7 | 0 | cj << 25 | 0) ^ (cj >>> 28 | dj << 4 | 0),
						rP = (0 | dj << 30 | cj >>> 2) ^ (0 | dj << 25 | cj >>> 7) ^ (dj >>> 28 | 0 | cj << 4 | 0),
						as = cj & Zi,
						bs = dj & $i,
						sP = cj & Vi ^ Xr ^ as,
						tP = dj & Wi ^ Yr ^ bs,
						ej = (R.add(Zr, $r, Ri, Si), D[I >> 2]),
						fj = D[I + 4 >> 2],
						uP = (R.add(qP, rP, sP, tP), D[I >> 2]),
						gj = (R.add(uP, D[I + 4 >> 2], Zr, $r), D[I >> 2]),
						hj = D[I + 4 >> 2],
						vP = (ej >>> 18 | fj << 14 | 0) ^ (fj >>> 9 | 0 | ej << 23 | 0) ^ (ej >>> 14 | fj << 18 | 0),
						wP = (fj >>> 18 | 0 | ej << 14 | 0) ^ (0 | fj << 23 | ej >>> 9) ^ (fj >>> 14 | 0 | ej << 18 | 0),
						xP = ej & aj ^ Xi & (ej ^ -1),
						yP = fj & bj ^ Yi & (fj ^ -1),
						zP = (R.add(sk, ek, -60457430, 1501505948), D[I >> 2]),
						AP = (R.add(zP, D[I + 4 >> 2], Ti, Ui), D[I >> 2]),
						BP = (R.add(AP, D[I + 4 >> 2], xP, yP), D[I >> 2]),
						cs = (R.add(BP, D[I + 4 >> 2], vP, wP), D[I >> 2]),
						ds = D[I + 4 >> 2],
						CP = (hj >>> 2 | 0 | gj << 30 | 0) ^ (hj >>> 7 | 0 | gj << 25 | 0) ^ (gj >>> 28 | hj << 4 | 0),
						DP = (0 | hj << 30 | gj >>> 2) ^ (0 | hj << 25 | gj >>> 7) ^ (hj >>> 28 | 0 | gj << 4 | 0),
						es = gj & cj,
						fs = hj & dj,
						EP = gj & Zi ^ as ^ es,
						FP = hj & $i ^ bs ^ fs,
						nj = (R.add(cs, ds, Vi, Wi), D[I >> 2]),
						oj = D[I + 4 >> 2],
						GP = (R.add(CP, DP, EP, FP), D[I >> 2]),
						pj = (R.add(GP, D[I + 4 >> 2], cs, ds), D[I >> 2]),
						qj = D[I + 4 >> 2],
						HP = (nj >>> 18 | oj << 14 | 0) ^ (oj >>> 9 | 0 | nj << 23 | 0) ^ (nj >>> 14 | oj << 18 | 0),
						IP = (oj >>> 18 | 0 | nj << 14 | 0) ^ (0 | oj << 23 | nj >>> 9) ^ (oj >>> 14 | 0 | nj << 18 | 0),
						JP = nj & ej ^ aj & (nj ^ -1),
						KP = oj & fj ^ bj & (oj ^ -1),
						LP = (R.add(id, Zb, 987167468, 1607167915), D[I >> 2]),
						MP = (R.add(LP, D[I + 4 >> 2], sM, tM), D[I >> 2]),
						NP = (R.add(MP, D[I + 4 >> 2], Zj, Kj), D[I >> 2]),
						OP = (R.add(NP, D[I + 4 >> 2], qM, rM), D[I >> 2]),
						PP = (R.add(OP, D[I + 4 >> 2], Xi, Yi), D[I >> 2]),
						QP = (R.add(PP, D[I + 4 >> 2], JP, KP), D[I >> 2]),
						gs = (R.add(QP, D[I + 4 >> 2], HP, IP), D[I >> 2]),
						hs = D[I + 4 >> 2],
						RP = (qj >>> 2 | 0 | pj << 30 | 0) ^ (qj >>> 7 | 0 | pj << 25 | 0) ^ (pj >>> 28 | qj << 4 | 0),
						SP = (0 | qj << 30 | pj >>> 2) ^ (0 | qj << 25 | pj >>> 7) ^ (qj >>> 28 | 0 | pj << 4 | 0),
						is = pj & gj,
						js = qj & hj,
						TP = pj & cj ^ es ^ is,
						UP = qj & dj ^ fs ^ js,
						tj = (R.add(gs, hs, Zi, $i), D[I >> 2]),
						uj = D[I + 4 >> 2],
						VP = (R.add(RP, SP, TP, UP), D[I >> 2]),
						Mj = (R.add(VP, D[I + 4 >> 2], gs, hs), D[I >> 2]),
						Nj = D[I + 4 >> 2],
						WP = (tj >>> 18 | uj << 14 | 0) ^ (uj >>> 9 | 0 | tj << 23 | 0) ^ (tj >>> 14 | uj << 18 | 0),
						XP = (uj >>> 18 | 0 | tj << 14 | 0) ^ (0 | uj << 23 | tj >>> 9) ^ (uj >>> 14 | 0 | tj << 18 | 0),
						YP = tj & nj ^ ej & (tj ^ -1),
						ZP = uj & oj ^ fj & (uj ^ -1),
						$P = (R.add(jd, $b, 1246189591, 1816402316), D[I >> 2]),
						aQ = (R.add($P, D[I + 4 >> 2], wM, xM), D[I >> 2]),
						bQ = (R.add(aQ, D[I + 4 >> 2], $j, Lj), D[I >> 2]),
						cQ = (R.add(bQ, D[I + 4 >> 2], uM, vM), D[I >> 2]),
						dQ = (R.add(cQ, D[I + 4 >> 2], aj, bj), D[I >> 2]),
						eQ = (R.add(dQ, D[I + 4 >> 2], YP, ZP), D[I >> 2]),
						ks = (R.add(eQ, D[I + 4 >> 2], WP, XP), D[I >> 2]),
						ls = D[I + 4 >> 2],
						fQ = (Nj >>> 2 | 0 | Mj << 30 | 0) ^ (Nj >>> 7 | 0 | Mj << 25 | 0) ^ (Mj >>> 28 | Nj << 4 | 0),
						gQ = (0 | Nj << 30 | Mj >>> 2) ^ (0 | Nj << 25 | Mj >>> 7) ^ (Nj >>> 28 | 0 | Mj << 4 | 0),
						hQ = (R.add(Mj & (pj ^ gj) ^ is, Nj & (qj ^ hj) ^ js, Q, T), D[I >> 2]),
						iQ = (R.add(hQ, D[I + 4 >> 2], fQ, gQ), D[I >> 2]),
						ms = (R.add(iQ, D[I + 4 >> 2], ks, ls), D[I >> 2]),
						ns = D[I + 4 >> 2],
						os = (R.add(Mj, Nj, ma, ca), D[I >> 2]),
						ps = D[I + 4 >> 2],
						qs = (R.add(pj, qj, ia, aa), D[I >> 2]),
						rs = D[I + 4 >> 2],
						ss = (R.add(gj, hj, Y, ja), D[I >> 2]),
						ts = D[I + 4 >> 2],
						jQ = (R.add(cj, dj, ha, $), D[I >> 2]),
						us = (R.add(jQ, D[I + 4 >> 2], ks, ls), D[I >> 2]),
						vs = D[I + 4 >> 2],
						ws = (R.add(tj, uj, W, ea), D[I >> 2]),
						xs = D[I + 4 >> 2],
						ys = (R.add(nj, oj, Z, da), D[I >> 2]),
						zs = D[I + 4 >> 2],
						As = (R.add(ej, fj, L, V), D[I >> 2]),
						Bs = D[I + 4 >> 2],
						kQ = P + 128 | 0,
						Cs = (R.add(ta, fa, -128, -1), D[I >> 2]),
						vl = D[I + 4 >> 2];
					0 < vl >>> 0 | 0 == vl >>> 0 & 127 < Cs >>> 0 ? (V = Bs, L = As, da = zs, Z = ys, ea = xs, W = ws, $ = vs, ha = us, ja = ts, Y = ss, aa = rs, ia = qs, ca = ps, ma = os, T = ns, Q = ms, fa = vl, ta = Cs, P = kQ, h = 3) : (qa = Bs, ua = As, ra = zs, sa = ys, Ca = xs, Ga = ws, Aa = vs, ka = us, lc = ts, Ba = ss, kd = rs, ac = qs, ld = ps, md = os, Ja = ns, zj = ms, h = 4);
					break;
				case 4:
					return Vl(d, zj, Ja), Vl(l, md, ld), Vl(m, ac, kd), Vl(t, Ba, lc), Vl(w, ka, Aa), Vl(C, Ga, Ca), Vl(E, sa, ra), Vl(B, ua, qa), 0;
				default:
					H(0, "bad label: " + h)
			}
		}
	}
	Module._crypto_hashblocks_sha512 = Kl;
	Kl.X = 1;

	function Ul(d) {
		var c = kc[d + 6 | 0],
			e = kc[d + 5 | 0],
			f = kc[d + 4 | 0];
		return sj = 0 | c >>> 24 | (0 | e >>> 16) | (0 | f >>> 8) | kc[d + 3 | 0] | kc[d + 2 | 0] << 8 | 0 | kc[d + 1 | 0] << 16 | 0 | kc[d] << 24 | 0, c << 8 | 0 | kc[d + 7 | 0] | (e << 16 | 0) | (f << 24 | 0) | 0
	}
	Ul.X = 1;

	function Vl(d, c, e) {
		s[d + 7 | 0] = c & 255;
		s[d + 6 | 0] = (c >>> 8 | e << 24) & 255;
		s[d + 5 | 0] = (c >>> 16 | e << 16) & 255;
		s[d + 4 | 0] = (c >>> 24 | e << 8) & 255;
		s[d + 3 | 0] = e & 255;
		s[d + 2 | 0] = (e >>> 8 | 0) & 255;
		s[d + 1 | 0] = (e >>> 16 | 0) & 255;
		s[d] = (e >>> 24 | 0) & 255
	}

	function Wl(d, c) {
		for (var e = 0, e = 2;;) {
			switch (e) {
				case 2:
					var f = 0,
						h = 0,
						e = 3;
					break;
				case 3:
					var e = d + (f << 2) | 0,
						i = (D[e >> 2] + h | 0) + D[(c + (f << 2) | 0) >> 2] | 0;
					D[e >> 2] = i & 255;
					e = i >>> 8;
					i = f + 1 | 0;
					17 == (i | 0) ? e = 4 : (f = i, h = e, e = 3);
					break;
				case 4:
					return;
				default:
					H(0, "bad label: " + e)
			}
		}
	}

	function Xl(d) {
		var c = D[d >> 2];
		D[d >> 2] = c & 255;
		var e = d + 4 | 0,
			c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 8 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 12 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 16 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 20 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 24 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 28 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 32 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 36 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 40 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 44 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 48 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 52 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 56 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 60 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 255;
		e = d + 64 | 0;
		c = D[e >> 2] + (c >>> 8) | 0;
		D[e >> 2] = c & 3;
		var f = D[d >> 2] + 5 * (c >>> 2) | 0;
		D[d >> 2] = f & 255;
		c = d + 4 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		c = d + 8 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		c = d + 12 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		c = d + 16 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		c = d + 20 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		c = d + 24 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		c = d + 28 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		c = d + 32 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		c = d + 36 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		c = d + 40 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		c = d + 44 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		c = d + 48 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		c = d + 52 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		c = d + 56 | 0;
		f = D[c >> 2] + (f >>> 8) | 0;
		D[c >> 2] = f & 255;
		d = d + 60 | 0;
		c = D[d >> 2] + (f >>> 8) | 0;
		D[d >> 2] = c & 255;
		D[e >> 2] = D[e >> 2] + (c >>> 8) | 0
	}
	Xl.X = 1;

	function Yl(d, c, e, f, h) {
		var i = 0,
			j = n;
		n = n + 136 | 0;
		for (i = 2;;) {
			switch (i) {
				case 2:
					var l = j,
						p = j + 68,
						i = p,
						q = n;
					n = n + 68 | 0;
					var m = l | 0;
					D[m >> 2] = s[h] & 255;
					D[(l + 4 | 0) >> 2] = s[h + 1 | 0] & 255;
					D[(l + 8 | 0) >> 2] = s[h + 2 | 0] & 255;
					D[(l + 12 | 0) >> 2] = s[h + 3 | 0] & 15;
					D[(l + 16 | 0) >> 2] = s[h + 4 | 0] & 252;
					D[(l + 20 | 0) >> 2] = s[h + 5 | 0] & 255;
					D[(l + 24 | 0) >> 2] = s[h + 6 | 0] & 255;
					D[(l + 28 | 0) >> 2] = s[h + 7 | 0] & 15;
					D[(l + 32 | 0) >> 2] = s[h + 8 | 0] & 252;
					D[(l + 36 | 0) >> 2] = s[h + 9 | 0] & 255;
					D[(l + 40 | 0) >> 2] = s[h + 10 | 0] & 255;
					D[(l + 44 | 0) >> 2] = s[h + 11 | 0] & 15;
					D[(l + 48 | 0) >> 2] = s[h + 12 | 0] & 252;
					D[(l + 52 | 0) >> 2] = s[h + 13 | 0] & 255;
					D[(l + 56 | 0) >> 2] = s[h + 14 | 0] & 255;
					D[(l + 60 | 0) >> 2] = s[h + 15 | 0] & 15;
					D[(l + 64 | 0) >> 2] = 0;
					for (var i = i >> 2, k = i + 17; i < k; i++) {
						D[i] = 0
					}
					l = q;
					i = 0 == (e | 0) & 0 == (f | 0) ? 7 : 3;
					break;
				case 3:
					var r = p | 0,
						t = q | 0,
						v = f,
						u = e,
						w = c,
						i = 4;
					break;
				case 4:
					i = l >> 2;
					for (k = i + 17; i < k; i++) {
						D[i] = 0
					}
					if (0 == (u | 0) & 0 == (v | 0)) {
						var x = 0,
							z = 0,
							C = 0,
							i = 6
					} else {
						var A = 0,
							i = 5
					}
					break;
				case 5:
					D[(q + (A << 2) | 0) >> 2] = s[w + A | 0] & 255;
					k = i = A + 1 | 0;
					16 > i >>> 0 & (0 < v >>> 0 | 0 == v >>> 0 & k >>> 0 < u >>> 0) ? (A = i, i = 5) : (x = i, z = 0, C = k, i = 6);
					break;
				case 6:
					D[(q + (x << 2) | 0) >> 2] = 1;
					var i = w + x | 0,
						k = (R.p(u, v, C, z), D[I >> 2]),
						y = D[I + 4 >> 2];
					Wl(r, t);
					a: {
						var E = r,
							G = m,
							F = 0,
							B = n;
						n = n + 68 | 0;
						for (F = 2;;) {
							switch (F) {
								case 2:
									var J = B,
										N = 0,
										V = 1,
										F = 3;
									break;
								case 3:
									var L = 0,
										da = 0,
										F = 4;
									break;
								case 4:
									var Z = (D[(G + ((N - L | 0) << 2) | 0) >> 2] * D[(E + (L << 2) | 0) >> 2] | 0) + da | 0,
										F = L + 1 | 0;
									(F | 0) == (V | 0) ? F = 5 : (L = F, da = Z, F = 4);
									break;
								case 5:
									var ea = N + 1 | 0;
									if (17 > ea >>> 0) {
										F = 6
									} else {
										var W = Z,
											F = 8
									}
									break;
								case 6:
									var $ = N + 17 | 0,
										ha = ea,
										ja = Z,
										F = 7;
									break;
								case 7:
									var F = ((320 * D[(E + (ha << 2) | 0) >> 2] | 0) * D[(G + (($ - ha | 0) << 2) | 0) >> 2] | 0) + ja | 0,
										Y = ha + 1 | 0;
									17 == (Y | 0) ? (W = F, F = 8) : (ha = Y, ja = F, F = 7);
									break;
								case 8:
									D[(J + (N << 2) | 0) >> 2] = W;
									F = V + 1 | 0;
									18 == (F | 0) ? F = 9 : (N = ea, V = F, F = 3);
									break;
								case 9:
									G = J >> 2;
									F = E >> 2;
									for (Y = G + 17; G < Y; G++, F++) {
										D[F] = D[G]
									}
									Xl(E);
									n = B;
									break a;
								default:
									H(0, "bad label: " + F)
							}
						}
					}(u | 0) == (C | 0) & (v | 0) == (z | 0) ? i = 7 : (v = y, u = k, w = i, i = 4);
					break;
				case 7:
					c = p | 0;
					a: {
						e = c;
						m = 0;
						f = n;
						for (m = 2;;) {
							switch (m) {
								case 2:
									var aa = e,
										ia = n;
									n = n + 68 | 0;
									for (var aa = aa >> 2, ca = ia >> 2, m = aa + 17; aa < m; aa++, ca++) {
										D[ca] = D[aa]
									}
									Wl(e, 5243324);
									aa = -(D[(e + 64 | 0) >> 2] >>> 7) | 0;
									ca = 0;
									m = 3;
									break;
								case 3:
									m = e + (ca << 2) | 0;
									r = D[m >> 2];
									D[m >> 2] = (r ^ D[(ia + (ca << 2) | 0) >> 2]) & aa ^ r;
									m = ca + 1 | 0;
									17 == (m | 0) ? m = 4 : (ca = m, m = 3);
									break;
								case 4:
									n = f;
									break a;
								default:
									H(0, "bad label: " + m)
							}
						}
					}
					D[(q | 0) >> 2] = s[h + 16 | 0] & 255;
					D[(q + 4 | 0) >> 2] = s[h + 17 | 0] & 255;
					D[(q + 8 | 0) >> 2] = s[h + 18 | 0] & 255;
					D[(q + 12 | 0) >> 2] = s[h + 19 | 0] & 255;
					D[(q + 16 | 0) >> 2] = s[h + 20 | 0] & 255;
					D[(q + 20 | 0) >> 2] = s[h + 21 | 0] & 255;
					D[(q + 24 | 0) >> 2] = s[h + 22 | 0] & 255;
					D[(q + 28 | 0) >> 2] = s[h + 23 | 0] & 255;
					D[(q + 32 | 0) >> 2] = s[h + 24 | 0] & 255;
					D[(q + 36 | 0) >> 2] = s[h + 25 | 0] & 255;
					D[(q + 40 | 0) >> 2] = s[h + 26 | 0] & 255;
					D[(q + 44 | 0) >> 2] = s[h + 27 | 0] & 255;
					D[(q + 48 | 0) >> 2] = s[h + 28 | 0] & 255;
					D[(q + 52 | 0) >> 2] = s[h + 29 | 0] & 255;
					D[(q + 56 | 0) >> 2] = s[h + 30 | 0] & 255;
					D[(q + 60 | 0) >> 2] = s[h + 31 | 0] & 255;
					D[(q + 64 | 0) >> 2] = 0;
					Wl(c, q | 0);
					s[d] = D[(p | 0) >> 2] & 255;
					s[d + 1 | 0] = D[(p + 4 | 0) >> 2] & 255;
					s[d + 2 | 0] = D[(p + 8 | 0) >> 2] & 255;
					s[d + 3 | 0] = D[(p + 12 | 0) >> 2] & 255;
					s[d + 4 | 0] = D[(p + 16 | 0) >> 2] & 255;
					s[d + 5 | 0] = D[(p + 20 | 0) >> 2] & 255;
					s[d + 6 | 0] = D[(p + 24 | 0) >> 2] & 255;
					s[d + 7 | 0] = D[(p + 28 | 0) >> 2] & 255;
					s[d + 8 | 0] = D[(p + 32 | 0) >> 2] & 255;
					s[d + 9 | 0] = D[(p + 36 | 0) >> 2] & 255;
					s[d + 10 | 0] = D[(p + 40 | 0) >> 2] & 255;
					s[d + 11 | 0] = D[(p + 44 | 0) >> 2] & 255;
					s[d + 12 | 0] = D[(p + 48 | 0) >> 2] & 255;
					s[d + 13 | 0] = D[(p + 52 | 0) >> 2] & 255;
					s[d + 14 | 0] = D[(p + 56 | 0) >> 2] & 255;
					s[d + 15 | 0] = D[(p + 60 | 0) >> 2] & 255;
					n = j;
					return 0;
				default:
					H(0, "bad label: " + i)
			}
		}
	}
	Module._crypto_onetimeauth_poly1305 = Yl;
	Yl.X = 1;

	function Zl(d, c, e, f, h) {
		var i = n;
		n = n + 16 | 0;
		var j = i | 0;
		Yl(j, c, e, f, h);
		d = $l(d, j);
		n = i;
		return d
	}
	Module._crypto_onetimeauth_poly1305_verify = Zl;

	function Rl(d, c) {
		Pl(d, c, 5244288);
		return 0
	}
	Module._crypto_scalarmult_curve25519_base = Rl;

	function Pl(d, c, e) {
		var f = 0,
			h = n;
		n = n + 416 | 0;
		for (f = 2;;) {
			switch (f) {
				case 2:
					var i = h,
						j = h + 384;
					Jl(j | 0, c, 32);
					var l = j | 0;
					s[l] &= -8;
					j = j + 31 | 0;
					s[j] = s[j] & 63 | 64;
					j = 0;
					f = 3;
					break;
				case 3:
					D[(i + (j << 2) | 0) >> 2] = s[e + j | 0] & 255;
					f = j + 1 | 0;
					32 == (f | 0) ? f = 4 : (j = f, f = 3);
					break;
				case 4:
					var p = i | 0;
					am(p, l);
					f = i + 128 | 0;
					bm(f, f);
					var q = i + 256 | 0;
					cm(q, p, f);
					a: {
						p = q;
						q = 0;
						f = n;
						for (q = 2;;) {
							switch (q) {
								case 2:
									var m = p,
										k = n;
									n = n + 128 | 0;
									for (var m = m >> 2, r = k >> 2, q = m + 32; m < q; m++, r++) {
										D[r] = D[m]
									}
									dm(p, p, 5243196);
									m = -(D[(p + 124 | 0) >> 2] >>> 7 & 1) | 0;
									r = 0;
									q = 3;
									break;
								case 3:
									var q = p + (r << 2) | 0,
										t = D[q >> 2];
									D[q >> 2] = (t ^ D[(k + (r << 2) | 0) >> 2]) & m ^ t;
									q = r + 1 | 0;
									32 == (q | 0) ? q = 4 : (r = q, q = 3);
									break;
								case 4:
									n = f;
									break a;
								default:
									H(0, "bad label: " + q)
							}
						}
					}
					p = 0;
					f = 5;
					break;
				case 5:
					s[d + p | 0] = D[(i + ((p + 64 | 0) << 2) | 0) >> 2] & 255;
					f = p + 1 | 0;
					32 == (f | 0) ? f = 6 : (p = f, f = 5);
					break;
				case 6:
					n = h;
					return;
				default:
					H(0, "bad label: " + f)
			}
		}
	}

	function am(d, c) {
		for (var e = 0, f = n, e = 2;;) {
			switch (e) {
				case 2:
					var h = d,
						i = n;
					n = n + 256 | 0;
					var j = i,
						l = n,
						p = n = n + 256 | 0,
						q = n = n + 256 | 0,
						m = n = n + 256 | 0,
						k = n = n + 256 | 0,
						r = n = n + 256 | 0,
						t = n = n + 256 | 0,
						v = n = n + 256 | 0,
						u = n = n + 256 | 0,
						w = n = n + 256 | 0,
						x = n = n + 256 | 0,
						z = n = n + 128 | 0,
						C = n = n + 128 | 0,
						A = n = n + 128 | 0;
					n = n + 128 | 0;
					for (var y = h >> 2, E = j >> 2, G = y + 32; y < G; y++, E++) {
						D[E] = D[y]
					}
					y = l;
					D[(i + 128 | 0) >> 2] = 1;
					E = (i + 132 | 0) >> 2;
					for (G = E + 31; E < G; E++) {
						D[E] = 0
					}
					j = l | 0;
					D[j >> 2] = 1;
					E = (l + 4 | 0) >> 2;
					for (G = E + 63; E < G; E++) {
						D[E] = 0
					}
					var l = p | 0,
						E = q | 0,
						i = i | 0,
						G = r | 0,
						p = p + 128 | 0,
						r = r + 128 | 0,
						F = t | 0,
						q = q + 128 | 0,
						t = t + 128 | 0,
						B = v | 0,
						v = v + 128 | 0,
						J = u | 0,
						u = u + 128 | 0,
						N = w | 0,
						w = w + 128 | 0,
						x = x | 0,
						z = z | 0,
						C = C | 0,
						A = A | 0,
						V = m | 0,
						m = m + 128 | 0,
						L = k | 0,
						k = k + 128 | 0,
						da = 254,
						e = 3;
					break;
				case 3:
					e = (s[c + ((da | 0) / 8 & -1) | 0] & 255) >>> ((da & 7) >>> 0) & 1;
					em(l, E, j, i, e);
					dm(G, l, p);
					fm(r, l, p);
					dm(F, E, q);
					fm(t, E, q);
					S(B, G);
					S(v, r);
					cm(J, F, r);
					cm(u, t, G);
					dm(N, J, u);
					fm(w, J, u);
					S(x, w);
					fm(z, B, v);
					a: {
						for (var Z = C, ea = z, W = 0, W = 2;;) {
							switch (W) {
								case 2:
									var $ = 0,
										ha = 0,
										W = 3;
									break;
								case 3:
									var ja = (121665 * D[(ea + ($ << 2) | 0) >> 2] | 0) + ha | 0;
									D[(Z + ($ << 2) | 0) >> 2] = ja & 255;
									ja >>>= 8;
									W = $ + 1 | 0;
									31 == (W | 0) ? W = 4 : ($ = W, ha = ja, W = 3);
									break;
								case 4:
									var Y = (121665 * D[(ea + 124 | 0) >> 2] | 0) + ja | 0;
									D[(Z + 124 | 0) >> 2] = Y & 127;
									var aa = 0,
										ia = Z,
										Y = D[Z >> 2] + (19 * (Y >>> 7) | 0) | 0,
										W = 5;
									break;
								case 5:
									D[ia >> 2] = Y & 255;
									var W = aa + 1 | 0,
										ca = Z + (W << 2) | 0,
										ma = D[ca >> 2] + (Y >>> 8) | 0;
									31 == (W | 0) ? W = 6 : (aa = W, ia = ca, Y = ma, W = 5);
									break;
								case 6:
									D[(Z + 124 | 0) >> 2] = ma;
									break a;
								default:
									H(0, "bad label: " + W)
							}
						}
					}
					dm(A, C, B);
					cm(V, B, v);
					cm(m, z, A);
					S(L, N);
					cm(k, x, d);
					em(j, i, V, L, e);
					e = da - 1 | 0;
					0 < (da | 0) ? (da = e, e = 3) : e = 4;
					break;
				case 4:
					y >>= 2;
					E = h >> 2;
					for (G = y + 64; y < G; y++, E++) {
						D[E] = D[y]
					}
					n = f;
					return;
				default:
					H(0, "bad label: " + e)
			}
		}
	}
	am.X = 1;

	function bm(d, c) {
		var e = 0,
			f = n;
		n = n + 1280 | 0;
		for (e = 2;;) {
			switch (e) {
				case 2:
					var h = f + 128,
						i = f + 256,
						j = f + 384,
						e = f + 512,
						l = f + 640,
						p = f + 768,
						q = f + 896,
						m = f + 1024,
						k = f + 1152,
						r = f | 0;
					S(r, c);
					k |= 0;
					S(k, r);
					m |= 0;
					S(m, k);
					h |= 0;
					cm(h, m, c);
					i |= 0;
					cm(i, h, r);
					S(m, i);
					j |= 0;
					cm(j, m, h);
					S(m, j);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					e |= 0;
					cm(e, m, j);
					S(m, e);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					l |= 0;
					cm(l, k, e);
					S(m, l);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					cm(m, k, l);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					p |= 0;
					cm(p, m, e);
					S(m, p);
					S(k, m);
					l = 2;
					e = 3;
					break;
				case 3:
					S(m, k);
					S(k, m);
					e = l + 2 | 0;
					50 > (e | 0) ? (l = e, e = 3) : e = 4;
					break;
				case 4:
					var t = q | 0;
					cm(t, k, p);
					S(k, t);
					S(m, k);
					var v = 2,
						e = 5;
					break;
				case 5:
					S(k, m);
					S(m, k);
					e = v + 2 | 0;
					100 > (e | 0) ? (v = e, e = 5) : e = 6;
					break;
				case 6:
					cm(k, m, t);
					S(m, k);
					S(k, m);
					var u = 2,
						e = 7;
					break;
				case 7:
					S(m, k);
					S(k, m);
					e = u + 2 | 0;
					50 > (e | 0) ? (u = e, e = 7) : e = 8;
					break;
				case 8:
					cm(m, k, p);
					S(k, m);
					S(m, k);
					S(k, m);
					S(m, k);
					S(k, m);
					cm(d, k, i);
					n = f;
					return;
				default:
					H(0, "bad label: " + e)
			}
		}
	}
	bm.X = 1;

	function dm(d, c, e) {
		for (var f = 0, f = 2;;) {
			switch (f) {
				case 2:
					var h = 0,
						i = 0,
						f = 3;
					break;
				case 3:
					var j = (D[(c + (h << 2) | 0) >> 2] + i | 0) + D[(e + (h << 2) | 0) >> 2] | 0;
					D[(d + (h << 2) | 0) >> 2] = j & 255;
					j >>>= 8;
					f = h + 1 | 0;
					31 == (f | 0) ? f = 4 : (h = f, i = j, f = 3);
					break;
				case 4:
					D[(d + 124 | 0) >> 2] = (D[(c + 124 | 0) >> 2] + j | 0) + D[(e + 124 | 0) >> 2] | 0;
					return;
				default:
					H(0, "bad label: " + f)
			}
		}
	}

	function gm(d) {
		for (var c = 0, c = 2;;) {
			switch (c) {
				case 2:
					var e = 0,
						f = 0,
						c = 3;
					break;
				case 3:
					var h = d + (e << 2) | 0,
						c = D[h >> 2] + f | 0;
					D[h >> 2] = c & 255;
					h = c >>> 8;
					c = e + 1 | 0;
					31 == (c | 0) ? c = 4 : (e = c, f = h, c = 3);
					break;
				case 4:
					var i = d + 124 | 0,
						j = D[i >> 2] + h | 0;
					D[i >> 2] = j & 127;
					var l = 0,
						j = 19 * (j >>> 7) | 0,
						c = 5;
					break;
				case 5:
					var p = d + (l << 2) | 0,
						c = D[p >> 2] + j | 0;
					D[p >> 2] = c & 255;
					p = c >>> 8;
					c = l + 1 | 0;
					31 == (c | 0) ? c = 6 : (l = c, j = p, c = 5);
					break;
				case 6:
					D[i >> 2] = D[i >> 2] + p | 0;
					return;
				default:
					H(0, "bad label: " + c)
			}
		}
	}

	function em(d, c, e, f, h) {
		for (var i = 0, i = 2;;) {
			switch (i) {
				case 2:
					var j = h - 1 | 0,
						l = 0,
						i = 3;
					break;
				case 3:
					var i = e + (l << 2) | 0,
						p = D[(f + (l << 2) | 0) >> 2],
						q = (p ^ D[i >> 2]) & j;
					D[(d + (l << 2) | 0) >> 2] = q ^ p;
					D[(c + (l << 2) | 0) >> 2] = q ^ D[i >> 2];
					i = l + 1 | 0;
					64 == (i | 0) ? i = 4 : (l = i, i = 3);
					break;
				case 4:
					return;
				default:
					H(0, "bad label: " + i)
			}
		}
	}

	function fm(d, c, e) {
		for (var f = 0, f = 2;;) {
			switch (f) {
				case 2:
					var h = 0,
						i = 218,
						f = 3;
					break;
				case 3:
					var j = ((i + 65280 | 0) + D[(c + (h << 2) | 0) >> 2] | 0) - D[(e + (h << 2) | 0) >> 2] | 0;
					D[(d + (h << 2) | 0) >> 2] = j & 255;
					j >>>= 8;
					f = h + 1 | 0;
					31 == (f | 0) ? f = 4 : (h = f, i = j, f = 3);
					break;
				case 4:
					D[(d + 124 | 0) >> 2] = (D[(c + 124 | 0) >> 2] + j | 0) - D[(e + 124 | 0) >> 2] | 0;
					return;
				default:
					H(0, "bad label: " + f)
			}
		}
	}

	function hm(d, c) {
		for (var e = 0, e = 2;;) {
			switch (e) {
				case 2:
					var f = 0,
						e = 3;
					break;
				case 3:
					D[(d + (f << 2) | 0) >> 2] = s[c + f | 0] & 255;
					e = f + 1 | 0;
					32 == (e | 0) ? e = 4 : (f = e, e = 3);
					break;
				case 4:
					f = d + 124 | 0;
					D[f >> 2] &= 127;
					return;
				default:
					H(0, "bad label: " + e)
			}
		}
	}

	function im(d, c) {
		for (var e = 0, e = 2;;) {
			switch (e) {
				case 2:
					var f = 0,
						e = 3;
					break;
				case 3:
					s[d + f | 0] = D[(c + (f << 2) | 0) >> 2] & 255;
					e = f + 1 | 0;
					32 == (e | 0) ? e = 4 : (f = e, e = 3);
					break;
				case 4:
					var h = d + 31 | 0,
						i = 30,
						j = 127 == s[h] << 24 >> 24 & 1,
						e = 5;
					break;
				case 5:
					var l = (-1 == s[d + i | 0] << 24 >> 24) << 31 >> 31 & j,
						e = i - 1 | 0;
					1 < (e | 0) ? (i = e, j = l, e = 5) : e = 6;
					break;
				case 6:
					var p = (236 < (s[d] & 255)) << 31 >> 31 & l;
					s[h] = ((-127 * p | 0) + (s[h] & 255) | 0) & 255;
					var q = -255 * p | 0,
						m = 30,
						e = 7;
					break;
				case 7:
					e = d + m | 0;
					s[e] = ((s[e] & 255) + q | 0) & 255;
					e = m - 1 | 0;
					0 < (e | 0) ? (m = e, e = 7) : e = 8;
					break;
				case 8:
					s[d] = ((s[d] & 255) + (-237 * p | 0) | 0) & 255;
					return;
				default:
					H(0, "bad label: " + e)
			}
		}
	}
	im.X = 1;

	function jm(d, c, e) {
		for (var f = 0, f = 2;;) {
			switch (f) {
				case 2:
					var h = e & 255,
						i = 1 - e & 255,
						j = 0,
						f = 3;
					break;
				case 3:
					f = d + (j << 2) | 0;
					D[f >> 2] = (D[(c + (j << 2) | 0) >> 2] * h | 0) + (D[f >> 2] * i | 0) | 0;
					f = j + 1 | 0;
					32 == (f | 0) ? f = 4 : (j = f, f = 3);
					break;
				case 4:
					return;
				default:
					H(0, "bad label: " + f)
			}
		}
	}

	function km(d) {
		for (var c = 0, c = 2;;) {
			switch (c) {
				case 2:
					var e = d + 124 | 0,
						f = 30,
						h = 127 == (D[e >> 2] | 0) & 1,
						c = 3;
					break;
				case 3:
					var i = (255 == (D[(d + (f << 2) | 0) >> 2] | 0)) << 31 >> 31 & h,
						c = f - 1 | 0;
					1 < (c | 0) ? (f = c, h = i, c = 3) : c = 4;
					break;
				case 4:
					var j = d | 0,
						l = (236 < D[j >> 2] >>> 0) << 31 >> 31 & i;
					D[e >> 2] = (-127 * l | 0) + D[e >> 2] | 0;
					var p = -255 * l | 0,
						q = 30,
						c = 5;
					break;
				case 5:
					c = d + (q << 2) | 0;
					D[c >> 2] = D[c >> 2] + p | 0;
					c = q - 1 | 0;
					0 < (c | 0) ? (q = c, c = 5) : c = 6;
					break;
				case 6:
					D[j >> 2] = D[j >> 2] + (-237 * l | 0) | 0;
					return;
				default:
					H(0, "bad label: " + c)
			}
		}
	}

	function lm(d) {
		for (var c = 0, c = 2;;) {
			switch (c) {
				case 2:
					var e = d + 124 | 0,
						f = d | 0,
						h = D[e >> 2],
						c = h >>> 7;
					D[e >> 2] = h & 127;
					D[f >> 2] = (19 * c | 0) + D[f >> 2] | 0;
					h = 0;
					c = 3;
					break;
				case 3:
					var c = d + (h << 2) | 0,
						i = h + 1 | 0,
						j = d + (i << 2) | 0;
					D[j >> 2] = D[j >> 2] + (D[c >> 2] >>> 8) | 0;
					D[c >> 2] &= 255;
					31 == (i | 0) ? c = 4 : (h = i, c = 3);
					break;
				case 4:
					var l = D[e >> 2],
						c = l >>> 7;
					D[e >> 2] = l & 127;
					D[f >> 2] = (19 * c | 0) + D[f >> 2] | 0;
					l = 0;
					c = 5;
					break;
				case 5:
					c = d + (l << 2) | 0;
					i = l + 1 | 0;
					j = d + (i << 2) | 0;
					D[j >> 2] = D[j >> 2] + (D[c >> 2] >>> 8) | 0;
					D[c >> 2] &= 255;
					31 == (i | 0) ? c = 6 : (l = i, c = 5);
					break;
				case 6:
					var p = D[e >> 2],
						c = p >>> 7;
					D[e >> 2] = p & 127;
					D[f >> 2] = (19 * c | 0) + D[f >> 2] | 0;
					p = 0;
					c = 7;
					break;
				case 7:
					c = d + (p << 2) | 0;
					i = p + 1 | 0;
					j = d + (i << 2) | 0;
					D[j >> 2] = D[j >> 2] + (D[c >> 2] >>> 8) | 0;
					D[c >> 2] &= 255;
					31 == (i | 0) ? c = 8 : (p = i, c = 7);
					break;
				case 8:
					var q = D[e >> 2],
						c = q >>> 7;
					D[e >> 2] = q & 127;
					D[f >> 2] = (19 * c | 0) + D[f >> 2] | 0;
					q = 0;
					c = 9;
					break;
				case 9:
					c = d + (q << 2) | 0;
					i = q + 1 | 0;
					j = d + (i << 2) | 0;
					D[j >> 2] = D[j >> 2] + (D[c >> 2] >>> 8) | 0;
					D[c >> 2] &= 255;
					31 == (i | 0) ? c = 10 : (q = i, c = 9);
					break;
				case 10:
					return;
				default:
					H(0, "bad label: " + c)
			}
		}
	}
	lm.X = 1;

	function cm(d, c, e) {
		for (var f = 0, f = 2;;) {
			switch (f) {
				case 2:
					var h = 0,
						i = 1,
						f = 3;
					break;
				case 3:
					var j = 0,
						l = 0,
						f = 4;
					break;
				case 4:
					var p = (D[(e + ((h - j | 0) << 2) | 0) >> 2] * D[(c + (j << 2) | 0) >> 2] | 0) + l | 0,
						f = j + 1 | 0;
					(f | 0) == (i | 0) ? f = 5 : (j = f, l = p, f = 4);
					break;
				case 5:
					var q = h + 1 | 0;
					if (32 > q >>> 0) {
						f = 6
					} else {
						var m = p,
							f = 8
					}
					break;
				case 6:
					var k = h + 32 | 0,
						r = q,
						t = p,
						f = 7;
					break;
				case 7:
					var f = ((38 * D[(c + (r << 2) | 0) >> 2] | 0) * D[(e + ((k - r | 0) << 2) | 0) >> 2] | 0) + t | 0,
						v = r + 1 | 0;
					32 == (v | 0) ? (m = f, f = 8) : (r = v, t = f, f = 7);
					break;
				case 8:
					D[(d + (h << 2) | 0) >> 2] = m;
					f = i + 1 | 0;
					33 == (f | 0) ? f = 9 : (h = q, i = f, f = 3);
					break;
				case 9:
					gm(d);
					return;
				default:
					H(0, "bad label: " + f)
			}
		}
	}

	function S(d, c) {
		for (var e = 0, e = 2;;) {
			switch (e) {
				case 2:
					var f = 0,
						e = 3;
					break;
				case 3:
					if (0 == (f | 0)) {
						var h = 0,
							i = 1,
							j = 32,
							e = 6
					} else {
						var l = 0,
							p = 0,
							q = f,
							e = 4
					}
					break;
				case 4:
					var m = (D[(c + (q << 2) | 0) >> 2] * D[(c + (l << 2) | 0) >> 2] | 0) + p | 0,
						e = l + 1 | 0,
						k = f - e | 0;
					e >>> 0 < k >>> 0 ? (l = e, p = m, q = k, e = 4) : e = 5;
					break;
				case 5:
					e = f + 1 | 0;
					k = f + 32 | 0;
					if (31 > e >>> 0) {
						h = m, i = e, j = k, e = 6
					} else {
						var r = m,
							t = e,
							e = 8
					}
					break;
				case 6:
					var v = i,
						u = h,
						w = 31,
						e = 7;
					break;
				case 7:
					var e = ((38 * D[(c + (v << 2) | 0) >> 2] | 0) * D[(c + (w << 2) | 0) >> 2] | 0) + u | 0,
						k = v + 1 | 0,
						x = j + (v ^ -1) | 0;
					k >>> 0 < x >>> 0 ? (v = k, u = e, w = x, e = 7) : (r = e, t = i, e = 8);
					break;
				case 8:
					var z = r << 1;
					if (0 == (f & 1 | 0)) {
						e = 9
					} else {
						var C = z,
							e = 10
					}
					break;
				case 9:
					e = f >>> 1;
					C = D[(c + (e << 2) | 0) >> 2];
					e = D[(c + ((e + 16 | 0) << 2) | 0) >> 2];
					C = ((C * C | 0) + z | 0) + ((38 * e | 0) * e | 0) | 0;
					e = 10;
					break;
				case 10:
					D[(d + (f << 2) | 0) >> 2] = C;
					32 == (t | 0) ? e = 11 : (f = t, e = 3);
					break;
				case 11:
					gm(d);
					return;
				default:
					H(0, "bad label: " + e)
			}
		}
	}
	S.X = 1;

	function Ml(d, c, e, f, h, i) {
		for (var j = 0, j = 2;;) {
			switch (j) {
				case 2:
					if (0 > f >>> 0 | 0 == f >>> 0 & 32 > e >>> 0) {
						var l = -1,
							j = 4
					} else {
						j = 3
					}
					break;
				case 3:
					mm(d, c, e, f, h, i);
					var j = d + 16 | 0,
						l = d + 32 | 0,
						p = (R.add(e, f, -32, -1), D[I >> 2]);
					Yl(j, l, p, D[I + 4 >> 2], d);
					j = d;
					for (l = j + 16; j < l; j++) {
						s[j] = 0
					}
					l = 0;
					j = 4;
					break;
				case 4:
					return l;
				default:
					H(0, "bad label: " + j)
			}
		}
	}
	Module._crypto_secretbox_xsalsa20poly1305 = Ml;

	function Nl(d, c, e, f, h, i) {
		var j = 0,
			l = n;
		n = n + 32 | 0;
		for (j = 2;;) {
			switch (j) {
				case 2:
					var p = l;
					if (0 > f >>> 0 | 0 == f >>> 0 & 32 > e >>> 0) {
						var q = -1,
							j = 5
					} else {
						j = 3
					}
					break;
				case 3:
					j = p | 0;
					nm(j, 32, 0, h, i);
					var m = c + 16 | 0,
						k = c + 32 | 0,
						r = (R.add(e, f, -32, -1), D[I >> 2]);
					0 == (Zl(m, k, r, D[I + 4 >> 2], j) | 0) ? j = 4 : (q = -1, j = 5);
					break;
				case 4:
					mm(d, c, e, f, h, i);
					ik(d, 0, 32);
					q = 0;
					j = 5;
					break;
				case 5:
					return n = l, q;
				default:
					H(0, "bad label: " + j)
			}
		}
	}
	Module._crypto_secretbox_xsalsa20poly1305_open = Nl;

	function Ds(d) {
		D[d >> 2] = 1;
		for (var d = (d + 4 | 0) >> 2, c = d + 31; d < c; d++) {
			D[d] = 0
		}
	}

	function Es(d, c, e) {
		var f = 0,
			h = n;
		n = n + 128 | 0;
		for (f = 2;;) {
			switch (f) {
				case 2:
					var i = h;
					D[(i | 0) >> 2] = D[(c | 0) >> 2] + 474 | 0;
					D[(i + 124 | 0) >> 2] = D[(c + 124 | 0) >> 2] + 254 | 0;
					var j = 1,
						f = 3;
					break;
				case 3:
					D[(i + (j << 2) | 0) >> 2] = D[(c + (j << 2) | 0) >> 2] + 510 | 0;
					f = j + 1 | 0;
					if (31 == (f | 0)) {
						var l = 0,
							f = 4
					} else {
						j = f, f = 3
					}
					break;
				case 4:
					D[(d + (l << 2) | 0) >> 2] = D[(i + (l << 2) | 0) >> 2] - D[(e + (l << 2) | 0) >> 2] | 0;
					f = l + 1 | 0;
					32 == (f | 0) ? f = 5 : (l = f, f = 4);
					break;
				case 5:
					lm(d);
					n = h;
					return;
				default:
					H(0, "bad label: " + f)
			}
		}
	}

	function Fs(d, c, e) {
		for (var f = 0, f = 2;;) {
			switch (f) {
				case 2:
					var h = 0,
						f = 3;
					break;
				case 3:
					D[(d + (h << 2) | 0) >> 2] = D[(e + (h << 2) | 0) >> 2] + D[(c + (h << 2) | 0) >> 2] | 0;
					f = h + 1 | 0;
					32 == (f | 0) ? f = 4 : (h = f, f = 3);
					break;
				case 4:
					lm(d);
					return;
				default:
					H(0, "bad label: " + f)
			}
		}
	}

	function Gs(d, c, e) {
		var f = 0,
			h = n;
		n = n + 252 | 0;
		for (f = 2;;) {
			switch (f) {
				case 2:
					for (var i = h, j = i >> 2, f = j + 63; j < f; j++) {
						D[j] = 0
					}
					j = 0;
					f = 3;
					break;
				case 3:
					var l = D[(c + (j << 2) | 0) >> 2],
						p = 0,
						f = 4;
					break;
				case 4:
					f = i + ((p + j | 0) << 2) | 0;
					D[f >> 2] = D[f >> 2] + (D[(e + (p << 2) | 0) >> 2] * l | 0) | 0;
					f = p + 1 | 0;
					32 == (f | 0) ? f = 5 : (p = f, f = 4);
					break;
				case 5:
					f = j + 1 | 0;
					if (32 == (f | 0)) {
						var q = 32,
							f = 6
					} else {
						j = f, f = 3
					}
					break;
				case 6:
					f = q - 32 | 0;
					D[(d + (f << 2) | 0) >> 2] = (38 * D[(i + (q << 2) | 0) >> 2] | 0) + D[(i + (f << 2) | 0) >> 2] | 0;
					f = q + 1 | 0;
					63 == (f | 0) ? f = 7 : (q = f, f = 6);
					break;
				case 7:
					D[(d + 124 | 0) >> 2] = D[(i + 124 | 0) >> 2];
					a: {
						c = 0;
						for (c = 2;;) {
							switch (c) {
								case 2:
									var m = d + 124 | 0,
										k = d | 0,
										r = D[m >> 2],
										c = r >>> 7;
									D[m >> 2] = r & 127;
									D[k >> 2] = (19 * c | 0) + D[k >> 2] | 0;
									r = 0;
									c = 3;
									break;
								case 3:
									c = d + (r << 2) | 0;
									e = r + 1 | 0;
									i = d + (e << 2) | 0;
									D[i >> 2] = D[i >> 2] + (D[c >> 2] >>> 8) | 0;
									D[c >> 2] &= 255;
									31 == (e | 0) ? c = 4 : (r = e, c = 3);
									break;
								case 4:
									var t = D[m >> 2],
										c = t >>> 7;
									D[m >> 2] = t & 127;
									D[k >> 2] = (19 * c | 0) + D[k >> 2] | 0;
									t = 0;
									c = 5;
									break;
								case 5:
									c = d + (t << 2) | 0;
									e = t + 1 | 0;
									i = d + (e << 2) | 0;
									D[i >> 2] = D[i >> 2] + (D[c >> 2] >>> 8) | 0;
									D[c >> 2] &= 255;
									31 == (e | 0) ? c = 6 : (t = e, c = 5);
									break;
								case 6:
									break a;
								default:
									H(0, "bad label: " + c)
							}
						}
					}
					n = h;
					return;
				default:
					H(0, "bad label: " + f)
			}
		}
	}

	function U(d, c) {
		Gs(d, c, c)
	}

	function Hs(d) {
		for (var c = 0, c = 2;;) {
			switch (c) {
				case 2:
					var e = 1,
						f = 1 == (D[(d | 0) >> 2] | 0) & 1,
						c = 3;
					break;
				case 3:
					var h = (0 == (D[(d + (e << 2) | 0) >> 2] | 0)) << 31 >> 31 & f,
						c = e + 1 | 0;
					32 == (c | 0) ? c = 4 : (e = c, f = h, c = 3);
					break;
				case 4:
					return h;
				default:
					H(0, "bad label: " + c)
			}
		}
	}

	function Is(d, c) {
		for (var e = 0, e = 2;;) {
			switch (e) {
				case 2:
					var f = 0,
						e = 3;
					break;
				case 3:
					s[d + f | 0] = D[(c + (f << 2) | 0) >> 2] & 255;
					e = f + 1 | 0;
					32 == (e | 0) ? e = 4 : (f = e, e = 3);
					break;
				case 4:
					return;
				default:
					H(0, "bad label: " + e)
			}
		}
	}

	function Js(d) {
		var c = 0,
			e = n;
		n = n + 32 | 0;
		for (c = 2;;) {
			switch (c) {
				case 2:
					var f = e,
						h = 0,
						i = 0,
						c = 3;
					break;
				case 3:
					var j = D[(d + (h << 2) | 0) >> 2],
						l = D[(5243392 + (h << 2) | 0) >> 2],
						p = j >>> 0 < (l + i | 0) >>> 0,
						c = p & 1;
					s[f + h | 0] = ((j - i | 0) - l | 0) & 255;
					j = h + 1 | 0;
					32 == (j | 0) ? c = 4 : (h = j, i = c, c = 3);
					break;
				case 4:
					var q = p & 1 ^ 1,
						m = 0,
						c = 5;
					break;
				case 5:
					c = d + (m << 2) | 0;
					D[c >> 2] = (s[f + m | 0] & 255 & (-q | 0)) + (D[c >> 2] & p << 31 >> 31) | 0;
					c = m + 1 | 0;
					32 == (c | 0) ? c = 6 : (m = c, c = 5);
					break;
				case 6:
					n = e;
					return;
				default:
					H(0, "bad label: " + c)
			}
		}
	}

	function Ks(d, c, e) {
		var f = 0,
			h = n;
		n = n + 2304 | 0;
		for (f = 2;;) {
			switch (f) {
				case 2:
					var i = h,
						j = h + 128,
						l = h + 2176;
					Ds(i);
					Ds(j | 0);
					for (var p = j + 128 | 0, f = c >> 2, q = p >> 2, m = f + 32; f < m; f++, q++) {
						D[q] = D[f]
					}
					var k = j + 256 | 0;
					U(k, j + 128 | 0);
					Gs(j + 384 | 0, k, p);
					k = j + 512 | 0;
					U(k, j + 256 | 0);
					Gs(j + 640 | 0, k, p);
					k = j + 768 | 0;
					U(k, j + 384 | 0);
					Gs(j + 896 | 0, k, p);
					k = j + 1024 | 0;
					U(k, j + 512 | 0);
					Gs(j + 1152 | 0, k, p);
					k = j + 1280 | 0;
					U(k, j + 640 | 0);
					Gs(j + 1408 | 0, k, p);
					k = j + 1536 | 0;
					U(k, j + 768 | 0);
					Gs(j + 1664 | 0, k, p);
					k = j + 1792 | 0;
					U(k, j + 896 | 0);
					Gs(j + 1920 | 0, k, p);
					var p = l,
						k = j,
						r = 32,
						f = 3;
					break;
				case 3:
					var t = e + (r - 1 | 0) | 0,
						v = j + 128 | 0,
						u = 4,
						f = 4;
					break;
				case 4:
					U(i, i);
					U(i, i);
					U(i, i);
					U(i, i);
					for (var w = (s[t] & 255) >>> (u >>> 0) & 15, f = k >> 2, q = p >> 2, m = f + 32; f < m; f++, q++) {
						D[q] = D[f]
					}
					jm(l, v, 1 == (w | 0) & 1);
					jm(l, j + 256 | 0, 2 == (w | 0) & 1);
					jm(l, j + 384 | 0, 3 == (w | 0) & 1);
					jm(l, j + 512 | 0, 4 == (w | 0) & 1);
					jm(l, j + 640 | 0, 5 == (w | 0) & 1);
					jm(l, j + 768 | 0, 6 == (w | 0) & 1);
					jm(l, j + 896 | 0, 7 == (w | 0) & 1);
					jm(l, j + 1024 | 0, 8 == (w | 0) & 1);
					jm(l, j + 1152 | 0, 9 == (w | 0) & 1);
					jm(l, j + 1280 | 0, 10 == (w | 0) & 1);
					jm(l, j + 1408 | 0, 11 == (w | 0) & 1);
					jm(l, j + 1536 | 0, 12 == (w | 0) & 1);
					jm(l, j + 1664 | 0, 13 == (w | 0) & 1);
					jm(l, j + 1792 | 0, 14 == (w | 0) & 1);
					jm(l, j + 1920 | 0, 15 == (w | 0) & 1);
					Gs(i, i, l);
					f = u - 4 | 0; - 1 < (f | 0) ? (u = f, f = 4) : f = 5;
					break;
				case 5:
					f = r - 1 | 0;
					0 < (f | 0) ? (r = f, f = 3) : f = 6;
					break;
				case 6:
					f = i >> 2;
					q = d >> 2;
					for (m = f + 32; f < m; f++, q++) {
						D[q] = D[f]
					}
					n = h;
					return;
				default:
					H(0, "bad label: " + f)
			}
		}
	}
	Ks.X = 1;

	function Ls(d, c, e) {
		var f = 0,
			h = n;
		n = n + 352 | 0;
		for (f = 2;;) {
			switch (f) {
				case 2:
					var i = h,
						j = h + 32,
						l = h + 64,
						p = h + 96,
						q = h + 224;
					a: {
						var m = c,
							k = 0,
							f = n;
						n = n + 160 | 0;
						for (k = 2;;) {
							switch (k) {
								case 2:
									var r = f + 32,
										k = f | 0;
									Jl(k, 5243712, 32);
									Ks(r, m, k);
									km(r);
									if (0 == (Hs(r) | 0)) {
										k = 3
									} else {
										var t = 1,
											k = 4
									}
									break;
								case 3:
									b: {
										t = r;
										k = 0;
										for (k = 2;;) {
											switch (k) {
												case 2:
													var v = 1,
														u = 0 == (D[(t | 0) >> 2] | 0) & 1,
														k = 3;
													break;
												case 3:
													var w = (0 == (D[(t + (v << 2) | 0) >> 2] | 0)) << 31 >> 31 & u,
														k = v + 1 | 0;
													32 == (k | 0) ? k = 4 : (v = k, u = w, k = 3);
													break;
												case 4:
													t = w;
													break b;
												default:
													H(0, "bad label: " + k)
											}
										}
										t = ga
									}
									t = 0 != (t | 0);
									k = 4;
									break;
								case 4:
									m = t & 1;
									n = f;
									f = m;
									break a;
								default:
									H(0, "bad label: " + k)
							}
						}
						f = ga
					}
					if (0 == (f | 0)) {
						var x = -1,
							f = 11
					} else {
						f = 3
					}
					break;
				case 3:
					f = i | 0;
					Jl(f, 5244256, 32);
					var z = j | 0;
					Jl(z, 5244224, 32);
					var C = l | 0;
					Jl(C, 5244192, 32);
					m = p >> 2;
					for (k = m + 32; m < k; m++) {
						D[m] = 0
					}
					Ks(q, c, f);
					km(q);
					if (0 == (Hs(q) | 0)) {
						var A = 0,
							f = 5
					} else {
						f = 4
					}
					break;
				case 4:
					Ks(d, c, z);
					f = 9;
					break;
				case 5:
					D[(q + (A << 2) | 0) >> 2] = D[(c + (A << 2) | 0) >> 2] << 2;
					f = A + 1 | 0;
					32 == (f | 0) ? f = 6 : (A = f, f = 5);
					break;
				case 6:
					Ks(q, q, C);
					var y = 0,
						f = 7;
					break;
				case 7:
					D[(d + (y << 2) | 0) >> 2] = D[(c + (y << 2) | 0) >> 2] << 1;
					f = y + 1 | 0;
					32 == (f | 0) ? f = 8 : (y = f, f = 7);
					break;
				case 8:
					Gs(d, d, q);
					f = 9;
					break;
				case 9:
					km(d);
					0 == ((D[(d | 0) >> 2] ^ e & 255) & 1 | 0) ? (x = 0, f = 11) : f = 10;
					break;
				case 10:
					Es(d, p, d);
					x = 0;
					f = 11;
					break;
				case 11:
					return n = h, x;
				default:
					H(0, "bad label: " + f)
			}
		}
	}
	Ls.X = 1;

	function Ms(d, c) {
		var e = 0,
			f = n;
		n = n + 1280 | 0;
		for (e = 2;;) {
			switch (e) {
				case 2:
					var h = f,
						e = f + 128,
						i = f + 256,
						j = f + 384,
						l = f + 512,
						p = f + 640,
						q = f + 768,
						m = f + 896,
						k = f + 1024,
						r = f + 1152;
					U(h, c);
					U(r, h);
					U(k, r);
					Gs(e, k, c);
					Gs(i, e, h);
					U(k, i);
					Gs(j, k, e);
					U(k, j);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					Gs(l, k, j);
					U(k, l);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					Gs(p, r, l);
					U(k, p);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					Gs(k, r, p);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					Gs(q, k, l);
					U(k, q);
					U(r, k);
					h = 2;
					e = 3;
					break;
				case 3:
					U(k, r);
					U(r, k);
					e = h + 2 | 0;
					50 > (e | 0) ? (h = e, e = 3) : e = 4;
					break;
				case 4:
					Gs(m, r, q);
					U(r, m);
					U(k, r);
					var t = 2,
						e = 5;
					break;
				case 5:
					U(r, k);
					U(k, r);
					e = t + 2 | 0;
					100 > (e | 0) ? (t = e, e = 5) : e = 6;
					break;
				case 6:
					Gs(r, k, m);
					U(k, r);
					U(r, k);
					var v = 2,
						e = 7;
					break;
				case 7:
					U(k, r);
					U(r, k);
					e = v + 2 | 0;
					50 > (e | 0) ? (v = e, e = 7) : e = 8;
					break;
				case 8:
					Gs(k, r, q);
					U(r, k);
					U(k, r);
					U(r, k);
					U(k, r);
					U(r, k);
					Gs(d, r, i);
					n = f;
					return;
				default:
					H(0, "bad label: " + e)
			}
		}
	}
	Ms.X = 1;

	function Ns(d, c) {
		var e = n;
		n = n + 256 | 0;
		var f = e + 128,
			h = d + 256 | 0;
		Ds(h);
		hm(f, 5244e3);
		var i = kc[c + 31 | 0] >>> 7,
			j = d + 128 | 0;
		hm(j, c);
		var l = d | 0;
		U(l, j);
		Gs(e, l, f);
		Es(l, l, h);
		Fs(e, h, e);
		Ms(e, e);
		Gs(l, l, e);
		f = Ls(l, l, i);
		Gs(d + 384 | 0, l, j);
		n = e;
		return f
	}

	function Hl(d, c) {
		var e = n;
		n = n + 384 | 0;
		var f = e + 128,
			h = e + 256;
		Ms(h, c + 256 | 0);
		Gs(e, c | 0, h);
		Gs(f, c + 128 | 0, h);
		im(d, f);
		f = h = n;
		n = n + 128 | 0;
		for (var i = e >> 2, j = f >> 2, l = i + 32; i < l; i++, j++) {
			D[j] = D[i]
		}
		km(f);
		n = h;
		h = d + 31 | 0;
		s[h] ^= (D[f >> 2] & 1) << 7;
		n = e
	}

	function Os(d, c, e) {
		var f = n;
		n = n + 768 | 0;
		var h = f + 128,
			i = f + 256,
			j = f + 384,
			l = f + 512,
			p = f + 640;
		hm(p, 5244e3);
		var q = c + 128 | 0,
			m = c | 0;
		Es(f, q, m);
		var k = e + 128 | 0,
			r = e | 0;
		Es(l, k, r);
		Gs(f, f, l);
		Fs(h, m, q);
		Fs(l, r, k);
		Gs(h, h, l);
		Gs(i, c + 384 | 0, e + 384 | 0);
		Gs(i, i, p);
		Fs(i, i, i);
		Gs(j, c + 256 | 0, e + 256 | 0);
		Fs(j, j, j);
		Es(d | 0, h, f);
		Es(d + 384 | 0, j, i);
		Fs(d + 128 | 0, j, i);
		Fs(d + 256 | 0, h, f);
		n = f
	}

	function Ps(d, c) {
		Qs(d, c);
		Gs(d + 384 | 0, c | 0, c + 256 | 0)
	}

	function Rs(d, c) {
		var e = n;
		n = n + 512 | 0;
		var f = e + 128,
			h = e + 256,
			i = e + 384,
			j = c | 0;
		U(e, j);
		var l = c + 128 | 0;
		U(f, l);
		U(h, c + 256 | 0);
		Fs(h, h, h);
		var p = n,
			q = n;
		n = n + 128 | 0;
		for (var m = e >> 2, k = q >> 2, r = m + 32; m < r; m++, k++) {
			D[k] = D[m]
		}
		m = i >> 2;
		for (k = m + 32; m < k; m++) {
			D[m] = 0
		}
		Es(i, i, q);
		n = p;
		p = d | 0;
		Fs(p, j, l);
		U(p, p);
		Es(p, p, e);
		Es(p, p, f);
		j = d + 128 | 0;
		Fs(j, i, f);
		Es(d + 384 | 0, j, h);
		Es(d + 256 | 0, i, f);
		n = e
	}

	function Ss(d, c, e) {
		var f = 0,
			h = n;
		n = n + 3616 | 0;
		for (f = 2;;) {
			switch (f) {
				case 2:
					var i = h,
						j = h + 512,
						l = h + 2560,
						p = h + 3072,
						q = h + 3584;
					hm(i | 0, 5243808);
					var m = i + 128 | 0;
					hm(m, 5243776);
					var k = i + 256 | 0;
					hm(k, 5243744);
					var r = i + 384 | 0;
					hm(r, 5243840);
					Is(q | 0, e);
					for (var t = j, v = i, f = v >> 2, u = t >> 2, w = f + 128; f < w; f++, u++) {
						D[u] = D[f]
					}
					for (var x = j + 512 | 0, z = x, f = c >> 2, u = z >> 2, w = f + 128; f < w; f++, u++) {
						D[u] = D[f]
					}
					Rs(p, j + 512 | 0);
					z = j + 1024 | 0;
					Ps(z, p);
					Os(p, z, x);
					Ps(j + 1536 | 0, p);
					var x = i,
						z = l,
						C = 32,
						f = 3;
					break;
				case 3:
					var A = s[q + (C - 1 | 0) | 0] & 255,
						y = 6,
						f = 4;
					break;
				case 4:
					Rs(p, x);
					Qs(x, p);
					Rs(p, x);
					Ps(i, p);
					for (var E = A >>> (y >>> 0) & 3, f = t >> 2, u = z >> 2, w = f + 128; f < w; f++, u++) {
						D[u] = D[f]
					}
					var G = 1,
						f = 5;
					break;
				case 5:
					f = l;
					u = j + (G << 9) | 0;
					w = (G | 0) == (E | 0) & 1;
					jm(f | 0, u | 0, w);
					jm(f + 128 | 0, u + 128 | 0, w);
					jm(f + 256 | 0, u + 256 | 0, w);
					jm(f + 384 | 0, u + 384 | 0, w);
					f = G + 1 | 0;
					4 == (f | 0) ? f = 6 : (G = f, f = 5);
					break;
				case 6:
					Os(p, i, l);
					f = 0 == (y | 0) ? 7 : 8;
					break;
				case 7:
					Ps(i, p);
					f = 9;
					break;
				case 8:
					Qs(x, p);
					f = y - 2 | 0; - 1 < (f | 0) ? (y = f, f = 4) : f = 9;
					break;
				case 9:
					f = C - 1 | 0;
					0 < (f | 0) ? (C = f, f = 3) : f = 10;
					break;
				case 10:
					c = d;
					f = v >> 2;
					u = c >> 2;
					for (w = f + 32; f < w; f++, u++) {
						D[u] = D[f]
					}
					v = d + 128 | 0;
					f = m >> 2;
					u = v >> 2;
					for (w = f + 32; f < w; f++, u++) {
						D[u] = D[f]
					}
					m = d + 256 | 0;
					f = k >> 2;
					u = m >> 2;
					for (w = f + 32; f < w; f++, u++) {
						D[u] = D[f]
					}
					d = d + 384 | 0;
					f = r >> 2;
					u = d >> 2;
					for (w = f + 32; f < w; f++, u++) {
						D[u] = D[f]
					}
					n = h;
					return;
				default:
					H(0, "bad label: " + f)
			}
		}
	}
	Ss.X = 1;

	function Qs(d, c) {
		var e = c + 384 | 0;
		Gs(d | 0, c | 0, e);
		var f = c + 128 | 0;
		Gs(d + 128 | 0, c + 256 | 0, f);
		Gs(d + 256 | 0, f, e)
	}

	function Gl(d, c) {
		var e = n;
		n = n + 512 | 0;
		hm(e | 0, 5243936);
		hm(e + 128 | 0, 5243904);
		hm(e + 256 | 0, 5243872);
		hm(e + 384 | 0, 5243968);
		Ss(d, e, c);
		n = e
	}

	function Fl(d, c) {
		var e = 0,
			f = n;
		n = n + 256 | 0;
		for (e = 2;;) {
			switch (e) {
				case 2:
					for (var h = f, i = h >> 2, e = i + 64; i < e; i++) {
						D[i] = 0
					}
					i = 0;
					e = 3;
					break;
				case 3:
					D[(h + (i << 2) | 0) >> 2] = s[c + i | 0] & 255;
					e = i + 1 | 0;
					32 == (e | 0) ? e = 4 : (i = e, e = 3);
					break;
				case 4:
					Ts(d, h | 0);
					n = f;
					return;
				default:
					H(0, "bad label: " + e)
			}
		}
	}

	function Ts(d, c) {
		var e = 0,
			f = n;
		n = n + 528 | 0;
		for (e = 2;;) {
			switch (e) {
				case 2:
					for (var h = f, i = f + 264, j = f + 396, e = h >> 2, l = e + 66; e < l; e++) {
						D[e] = 0
					}
					e = j >> 2;
					for (l = e + 33; e < l; e++) {
						D[e] = 0
					}
					var p = 0,
						e = 3;
					break;
				case 3:
					var q = 5243040 + (p << 2) | 0,
						m = 0,
						e = 4;
					break;
				case 4:
					var k = m + p | 0,
						e = 30 < (k | 0) ? 5 : 6;
					break;
				case 5:
					e = h + (k << 2) | 0;
					D[e >> 2] = D[e >> 2] + (D[(c + ((m + 31 | 0) << 2) | 0) >> 2] * D[q >> 2] | 0) | 0;
					e = 6;
					break;
				case 6:
					e = m + 1 | 0;
					33 == (e | 0) ? e = 7 : (m = e, e = 4);
					break;
				case 7:
					e = p + 1 | 0;
					33 == (e | 0) ? e = 8 : (p = e, e = 3);
					break;
				case 8:
					var e = c,
						r = i,
						t = h + 128 | 0,
						l = D[t >> 2] + (D[(h + 124 | 0) >> 2] >>> 8) | 0;
					D[t >> 2] = l;
					t = h + 132 | 0;
					D[t >> 2] = (l >>> 8) + D[t >> 2] | 0;
					t = e >> 2;
					e = r >> 2;
					for (l = t + 33; t < l; t++, e++) {
						D[e] = D[t]
					}
					r = 0;
					e = 9;
					break;
				case 9:
					var v = 5243392 + (r << 2) | 0,
						u = 0,
						e = 10;
					break;
				case 10:
					var w = u + r | 0,
						e = 33 > (w | 0) ? 11 : 12;
					break;
				case 11:
					e = j + (w << 2) | 0;
					D[e >> 2] = D[e >> 2] + (D[(h + ((u + 33 | 0) << 2) | 0) >> 2] * D[v >> 2] | 0) | 0;
					e = 12;
					break;
				case 12:
					e = u + 1 | 0;
					33 == (e | 0) ? e = 13 : (u = e, e = 10);
					break;
				case 13:
					e = r + 1 | 0;
					if (32 == (e | 0)) {
						var x = 0,
							e = 14
					} else {
						r = e, e = 9
					}
					break;
				case 14:
					e = j + (x << 2) | 0;
					l = x + 1 | 0;
					t = j + (l << 2) | 0;
					D[t >> 2] = D[t >> 2] + (D[e >> 2] >>> 8) | 0;
					D[e >> 2] &= 255;
					if (32 == (l | 0)) {
						var z = 0,
							C = 0,
							e = 15
					} else {
						x = l, e = 14
					}
					break;
				case 15:
					l = D[(i + (z << 2) | 0) >> 2];
					t = D[(j + (z << 2) | 0) >> 2];
					e = l >>> 0 < (t + C | 0) >>> 0 & 1;
					D[(d + (z << 2) | 0) >> 2] = ((l - C | 0) - t | 0) + (e << 8) | 0;
					l = z + 1 | 0;
					32 == (l | 0) ? e = 16 : (z = l, C = e, e = 15);
					break;
				case 16:
					Js(d);
					Js(d);
					n = f;
					return;
				default:
					H(0, "bad label: " + e)
			}
		}
	}
	Ts.X = 1;

	function Us(d, c) {
		var e = 0,
			f = n;
		n = n + 256 | 0;
		for (e = 2;;) {
			switch (e) {
				case 2:
					for (var h = f, i = h >> 2, e = i + 64; i < e; i++) {
						D[i] = 0
					}
					i = 0;
					e = 3;
					break;
				case 3:
					D[(h + (i << 2) | 0) >> 2] = s[c + i | 0] & 255;
					e = i + 1 | 0;
					64 == (e | 0) ? e = 4 : (i = e, e = 3);
					break;
				case 4:
					Ts(d, h | 0);
					n = f;
					return;
				default:
					H(0, "bad label: " + e)
			}
		}
	}
	Module._crypto_sign_edwards25519sha512batch_keypair = (function(d, c) {
		var e = n;
		n = n + 640 | 0;
		var f = e + 128;
		Pk(c, 32, 0);
		Tl(c, c, 32, 0);
		s[c] &= -8;
		var h = c + 31 | 0;
		s[h] = s[h] & 63 | 64;
		Fl(e, c);
		Gl(f, e);
		Hl(d, f);
		n = e;
		return 0
	});

	function Vs(d, c, e, f, h, i) {
		var j = 0,
			l = n;
		n = n + 928 | 0;
		for (j = 2;;) {
			switch (j) {
				case 2:
					var p = l,
						q = l + 128,
						m = l + 256,
						k = l + 384,
						r = l + 896,
						t = r | 0,
						v = n;
					n = n + 32 | 0;
					var u = v | 0,
						w = n,
						x = n = n + 64 | 0;
					n = n + 64 | 0;
					var j = (R.add(f, h, 64, 0), D[I >> 2]),
						z = D[I + 4 >> 2];
					D[(c | 0) >> 2] = j;
					D[(c + 4 | 0) >> 2] = z;
					if (0 == (f | 0) & 0 == (h | 0)) {
						var C = 0,
							A = 0,
							j = 4
					} else {
						var y = 0,
							E = 0,
							j = 3
					}
					break;
				case 3:
					j = s[e + E | 0];
					z = (R.add(E, y, 32, 0), D[I >> 2]);
					s[d + z | 0] = j;
					j = (R.add(E, y, 1, 0), D[I >> 2]);
					z = D[I + 4 >> 2];
					z >>> 0 < h >>> 0 | z >>> 0 == h >>> 0 & j >>> 0 < f >>> 0 ? (y = z, E = j, j = 3) : (A = C = 0, j = 4);
					break;
				case 4:
					j = (R.add(A, C, 32, 0), D[I >> 2]);
					s[d + A | 0] = s[i + j | 0];
					j = (R.add(A, C, 1, 0), D[I >> 2]);
					z = D[I + 4 >> 2];
					0 > z >>> 0 | 0 == z >>> 0 & 32 > j >>> 0 ? (C = z, A = j, j = 4) : j = 5;
					break;
				case 5:
					w |= 0;
					c = (R.add(f, h, 32, 0), D[I >> 2]);
					e = D[I + 4 >> 2];
					Tl(w, d, c, e);
					Us(p, w);
					Gl(k, p);
					Hl(r | 0, k);
					Jl(d, t, 32);
					k = x | 0;
					Tl(k, d, c, e);
					Us(q, k);
					a: {
						r = k = q;
						x = 0;
						t = n;
						n = n + 256 | 0;
						for (x = 2;;) {
							switch (x) {
								case 2:
									for (var G = t, F = G >> 2, x = F + 64; F < x; F++) {
										D[F] = 0
									}
									F = 0;
									x = 3;
									break;
								case 3:
									var B = D[(r + (F << 2) | 0) >> 2],
										J = 0,
										x = 4;
									break;
								case 4:
									x = G + ((J + F | 0) << 2) | 0;
									D[x >> 2] = D[x >> 2] + (D[(p + (J << 2) | 0) >> 2] * B | 0) | 0;
									x = J + 1 | 0;
									32 == (x | 0) ? x = 5 : (J = x, x = 4);
									break;
								case 5:
									x = F + 1 | 0;
									if (32 == (x | 0)) {
										var N = 0,
											x = 6
									} else {
										F = x, x = 3
									}
									break;
								case 6:
									x = G + (N << 2) | 0;
									c = N + 1 | 0;
									e = G + (c << 2) | 0;
									D[e >> 2] = D[e >> 2] + (D[x >> 2] >>> 8) | 0;
									D[x >> 2] &= 255;
									63 == (c | 0) ? x = 7 : (N = c, x = 6);
									break;
								case 7:
									Ts(k, G | 0);
									n = t;
									break a;
								default:
									H(0, "bad label: " + x)
							}
						}
					}
					Fl(m, i);
					a: {
						G = i = q;
						B = 0;
						for (B = 2;;) {
							switch (B) {
								case 2:
									var V = 0,
										B = 3;
									break;
								case 3:
									D[(i + (V << 2) | 0) >> 2] = D[(m + (V << 2) | 0) >> 2] + D[(G + (V << 2) | 0) >> 2] | 0;
									B = V + 1 | 0;
									if (32 == (B | 0)) {
										var L = 0,
											B = 4
									} else {
										V = B, B = 3
									}
									break;
								case 4:
									B = i + (L << 2) | 0;
									J = L + 1 | 0;
									N = i + (J << 2) | 0;
									D[N >> 2] = D[N >> 2] + (D[B >> 2] >>> 8) | 0;
									D[B >> 2] &= 255;
									31 == (J | 0) ? B = 5 : (L = J, B = 4);
									break;
								case 5:
									Js(i);
									break a;
								default:
									H(0, "bad label: " + B)
							}
						}
					}
					Is(v | 0, q);
					f = (R.add(f, h, 32, 0), D[I >> 2]);
					Jl(d + f | 0, u, 32);
					n = l;
					return 0;
				default:
					H(0, "bad label: " + j)
			}
		}
	}
	Module._crypto_sign_edwards25519sha512batch = Vs;
	Vs.X = 1;

	function Ws(d, c, e, f, h, i) {
		var j = 0,
			l = n;
		n = n + 1920 | 0;
		for (j = 2;;) {
			switch (j) {
				case 2:
					var p = l,
						q = l + 32,
						m = l + 64,
						k = l + 576,
						r = l + 1088,
						t = l + 1600,
						v = l + 1728,
						u = l + 1856;
					if (0 == (Ns(m, e) | 0)) {
						j = 3
					} else {
						var w = -1,
							j = 7
					}
					break;
				case 3:
					0 == (Ns(r, i) | 0) ? j = 4 : (w = -1, j = 7);
					break;
				case 4:
					var x = u | 0,
						z = (R.add(f, h, -32, -1), D[I >> 2]);
					Tl(x, e, z, D[I + 4 >> 2]);
					Us(t, x);
					Ss(m, m, t);
					var C = x = m,
						A = r,
						j = n;
					n = n + 512 | 0;
					Os(j, C, A);
					Ps(x, j);
					n = j;
					x = p | 0;
					Hl(x, m);
					Fl(v, e + z | 0);
					Gl(k, v);
					z = q | 0;
					Hl(z, k);
					C = (R.add(f, h, -64, -1), D[I >> 2]);
					A = D[I + 4 >> 2];
					if (0 == (C | 0) & 0 == (A | 0)) {
						j = 6
					} else {
						var y = 0,
							j = 5
					}
					break;
				case 5:
					s[d + y | 0] = s[e + (y + 32 | 0) | 0];
					var j = y + 1 | 0,
						E = 0 > (j | 0) ? -1 : 0;
					E >>> 0 < A >>> 0 | E >>> 0 == A >>> 0 & j >>> 0 < C >>> 0 ? (y = j, j = 5) : j = 6;
					break;
				case 6:
					D[(c | 0) >> 2] = C;
					D[(c + 4 | 0) >> 2] = A;
					w = Ll(x, z);
					j = 7;
					break;
				case 7:
					return n = l, w;
				default:
					H(0, "bad label: " + j)
			}
		}
	}
	Module._crypto_sign_edwards25519sha512batch_open = Ws;
	Ws.X = 1;

	function $l(d, c) {
		return ((((s[c + 1 | 0] ^ s[d + 1 | 0] | s[c] ^ s[d] | s[c + 2 | 0] ^ s[d + 2 | 0] | s[c + 3 | 0] ^ s[d + 3 | 0] | s[c + 4 | 0] ^ s[d + 4 | 0] | s[c + 5 | 0] ^ s[d + 5 | 0] | s[c + 6 | 0] ^ s[d + 6 | 0] | s[c + 7 | 0] ^ s[d + 7 | 0] | s[c + 8 | 0] ^ s[d + 8 | 0] | s[c + 9 | 0] ^ s[d + 9 | 0] | s[c + 10 | 0] ^ s[d + 10 | 0] | s[c + 11 | 0] ^ s[d + 11 | 0] | s[c + 12 | 0] ^ s[d + 12 | 0] | s[c + 13 | 0] ^ s[d + 13 | 0] | s[c + 14 | 0] ^ s[d + 14 | 0] | s[c + 15 | 0] ^ s[d + 15 | 0]) & 255) + 511 | 0) >>> 8 & 1) - 1 | 0
	}
	$l.X = 1;

	function Xs(d, c, e, f, h) {
		var i = 0,
			j = n;
		n = n + 16 | 0;
		for (i = 2;;) {
			switch (i) {
				case 2:
					var l = j,
						p = l,
						q = n;
					n = n + 64 | 0;
					i = 0 == (c | 0) & 0 == (e | 0) ? 9 : 3;
					break;
				case 3:
					var i = l | 0,
						m = f,
						k = m | 0,
						m = m + 4 | 0,
						m = kc[m] | kc[m + 1] << 8 | kc[m + 2] << 16 | kc[m + 3] << 24 | 0;
					D[(i | 0) >> 2] = kc[k] | kc[k + 1] << 8 | kc[k + 2] << 16 | kc[k + 3] << 24 | 0;
					D[(i + 4 | 0) >> 2] = m;
					i = l + 8 | 0;
					D[(i | 0) >> 2] = 0;
					D[(i + 4 | 0) >> 2] = 0;
					if (0 < e >>> 0 | 0 == e >>> 0 & 63 < c >>> 0) {
						i = 4
					} else {
						var r = d,
							t = e,
							v = c,
							i = 7
					}
					break;
				case 4:
					var u = l,
						w = l + 8 | 0,
						x = e,
						z = c,
						C = d,
						i = 5;
					break;
				case 5:
					Sl(C, u, h, 5242976);
					var A = (s[w] & 255) + 1 | 0;
					s[w] = A & 255;
					var y = p + 9 | 0,
						A = (s[y] & 255) + (A >>> 8) | 0;
					s[y] = A & 255;
					y = p + 10 | 0;
					A = (s[y] & 255) + (A >>> 8) | 0;
					s[y] = A & 255;
					y = p + 11 | 0;
					A = (s[y] & 255) + (A >>> 8) | 0;
					s[y] = A & 255;
					y = p + 12 | 0;
					A = (s[y] & 255) + (A >>> 8) | 0;
					s[y] = A & 255;
					y = p + 13 | 0;
					A = (s[y] & 255) + (A >>> 8) | 0;
					s[y] = A & 255;
					y = p + 14 | 0;
					A = (s[y] & 255) + (A >>> 8) | 0;
					s[y] = A & 255;
					y = p + 15 | 0;
					s[y] = ((s[y] & 255) + (A >>> 8) | 0) & 255;
					var y = (R.add(z, x, -64, -1), D[I >> 2]),
						A = D[I + 4 >> 2],
						E = C + 64 | 0;
					0 < A >>> 0 | 0 == A >>> 0 & 63 < y >>> 0 ? (x = A, z = y, C = E, i = 5) : i = 6;
					break;
				case 6:
					0 == (y | 0) & 0 == (A | 0) ? i = 9 : (r = E, t = A, v = y, i = 7);
					break;
				case 7:
					Sl(q | 0, l, h, 5242976);
					var G = 0,
						i = 8;
					break;
				case 8:
					s[r + G | 0] = s[q + G | 0];
					i = G + 1 | 0;
					k = 0 > (i | 0) ? -1 : 0;
					k >>> 0 < t >>> 0 | k >>> 0 == t >>> 0 & i >>> 0 < v >>> 0 ? (G = i, i = 8) : i = 9;
					break;
				case 9:
					return n = j, 0;
				default:
					H(0, "bad label: " + i)
			}
		}
	}
	Xs.X = 1;

	function Ys(d, c, e, f, h, i) {
		var j = 0,
			l = n;
		n = n + 16 | 0;
		for (j = 2;;) {
			switch (j) {
				case 2:
					var p = l,
						q = p,
						m = n;
					n = n + 64 | 0;
					j = 0 == (e | 0) & 0 == (f | 0) ? 11 : 3;
					break;
				case 3:
					var j = p | 0,
						k = h,
						r = k | 0,
						k = k + 4 | 0,
						k = kc[k] | kc[k + 1] << 8 | kc[k + 2] << 16 | kc[k + 3] << 24 | 0;
					D[(j | 0) >> 2] = kc[r] | kc[r + 1] << 8 | kc[r + 2] << 16 | kc[r + 3] << 24 | 0;
					D[(j + 4 | 0) >> 2] = k;
					j = p + 8 | 0;
					D[(j | 0) >> 2] = 0;
					D[(j + 4 | 0) >> 2] = 0;
					if (0 < f >>> 0 | 0 == f >>> 0 & 63 < e >>> 0) {
						j = 4
					} else {
						var t = d,
							v = c,
							u = f,
							w = e,
							j = 9
					}
					break;
				case 4:
					var x = m | 0,
						z = p,
						C = p + 8 | 0,
						A = f,
						y = e,
						E = c,
						G = d,
						j = 5;
					break;
				case 5:
					Sl(x, z, i, 5242960);
					var F = 0,
						j = 6;
					break;
				case 6:
					s[G + F | 0] = s[m + F | 0] ^ s[E + F | 0];
					j = F + 1 | 0;
					64 == (j | 0) ? j = 7 : (F = j, j = 6);
					break;
				case 7:
					var B = (s[C] & 255) + 1 | 0;
					s[C] = B & 255;
					var J = q + 9 | 0,
						B = (s[J] & 255) + (B >>> 8) | 0;
					s[J] = B & 255;
					J = q + 10 | 0;
					B = (s[J] & 255) + (B >>> 8) | 0;
					s[J] = B & 255;
					J = q + 11 | 0;
					B = (s[J] & 255) + (B >>> 8) | 0;
					s[J] = B & 255;
					J = q + 12 | 0;
					B = (s[J] & 255) + (B >>> 8) | 0;
					s[J] = B & 255;
					J = q + 13 | 0;
					B = (s[J] & 255) + (B >>> 8) | 0;
					s[J] = B & 255;
					J = q + 14 | 0;
					B = (s[J] & 255) + (B >>> 8) | 0;
					s[J] = B & 255;
					J = q + 15 | 0;
					s[J] = ((s[J] & 255) + (B >>> 8) | 0) & 255;
					var J = (R.add(y, A, -64, -1), D[I >> 2]),
						B = D[I + 4 >> 2],
						N = G + 64 | 0,
						V = E + 64 | 0;
					0 < B >>> 0 | 0 == B >>> 0 & 63 < J >>> 0 ? (A = B, y = J, E = V, G = N, j = 5) : j = 8;
					break;
				case 8:
					0 == (J | 0) & 0 == (B | 0) ? j = 11 : (t = N, v = V, u = B, w = J, j = 9);
					break;
				case 9:
					Sl(m | 0, p, i, 5242960);
					var L = 0,
						j = 10;
					break;
				case 10:
					s[t + L | 0] = s[m + L | 0] ^ s[v + L | 0];
					j = L + 1 | 0;
					r = 0 > (j | 0) ? -1 : 0;
					r >>> 0 < u >>> 0 | r >>> 0 == u >>> 0 & j >>> 0 < w >>> 0 ? (L = j, j = 10) : j = 11;
					break;
				case 11:
					return n = l, 0;
				default:
					H(0, "bad label: " + j)
			}
		}
	}
	Ys.X = 1;

	function nm(d, c, e, f, h) {
		var i = n;
		n = n + 32 | 0;
		var j = i | 0;
		Ql(j, f, h, 5242880);
		Xs(d, c, e, f + 16 | 0, j);
		n = i;
		return 0
	}
	Module._crypto_stream_xsalsa20 = nm;

	function mm(d, c, e, f, h, i) {
		var j = n;
		n = n + 32 | 0;
		var l = j | 0;
		Ql(l, h, i, 5242992);
		Ys(d, c, e, f, h + 16 | 0, l);
		n = j;
		return 0
	}
	Module._crypto_stream_xsalsa20_xor = mm;

	function Ll(d, c) {
		return ((((s[c + 1 | 0] ^ s[d + 1 | 0] | s[c] ^ s[d] | s[c + 2 | 0] ^ s[d + 2 | 0] | s[c + 3 | 0] ^ s[d + 3 | 0] | s[c + 4 | 0] ^ s[d + 4 | 0] | s[c + 5 | 0] ^ s[d + 5 | 0] | s[c + 6 | 0] ^ s[d + 6 | 0] | s[c + 7 | 0] ^ s[d + 7 | 0] | s[c + 8 | 0] ^ s[d + 8 | 0] | s[c + 9 | 0] ^ s[d + 9 | 0] | s[c + 10 | 0] ^ s[d + 10 | 0] | s[c + 11 | 0] ^ s[d + 11 | 0] | s[c + 12 | 0] ^ s[d + 12 | 0] | s[c + 13 | 0] ^ s[d + 13 | 0] | s[c + 14 | 0] ^ s[d + 14 | 0] | s[c + 15 | 0] ^ s[d + 15 | 0] | s[c + 16 | 0] ^ s[d + 16 | 0] | s[c + 17 | 0] ^ s[d + 17 | 0] | s[c + 18 | 0] ^ s[d + 18 | 0] | s[c + 19 | 0] ^ s[d + 19 | 0] | s[c + 20 | 0] ^ s[d + 20 | 0] | s[c + 21 | 0] ^ s[d + 21 | 0] | s[c + 22 | 0] ^ s[d + 22 | 0] | s[c + 23 | 0] ^ s[d + 23 | 0] | s[c + 24 | 0] ^ s[d + 24 | 0] | s[c + 25 | 0] ^ s[d + 25 | 0] | s[c + 26 | 0] ^ s[d + 26 | 0] | s[c + 27 | 0] ^ s[d + 27 | 0] | s[c + 28 | 0] ^ s[d + 28 | 0] | s[c + 29 | 0] ^ s[d + 29 | 0] | s[c + 30 | 0] ^ s[d + 30 | 0] | s[c + 31 | 0] ^ s[d + 31 | 0]) & 255) + 511 | 0) >>> 8 & 1) - 1 | 0
	}
	Ll.X = 1;

	function hk(d) {
		for (var c = 0, c = 2;;) {
			switch (c) {
				case 2:
					c = 245 > d >>> 0 ? 3 : 28;
					break;
				case 3:
					if (11 > d >>> 0) {
						var e = 16,
							c = 5
					} else {
						c = 4
					}
					break;
				case 4:
					e = (d + 11 | 0) & -8;
					c = 5;
					break;
				case 5:
					var f = e >>> 3,
						h = D[1311111],
						i = h >>> (f >>> 0),
						c = 0 == (i & 3 | 0) ? 12 : 6;
					break;
				case 6:
					var j = (i & 1 ^ 1) + f | 0,
						l = j << 1,
						p = 5244484 + (l << 2) | 0,
						l = 5244484 + ((l + 2 | 0) << 2) | 0,
						q = D[l >> 2],
						m = q + 8 | 0,
						k = D[m >> 2],
						c = (p | 0) == (k | 0) ? 7 : 8;
					break;
				case 7:
					D[1311111] = h & (1 << j ^ -1);
					c = 11;
					break;
				case 8:
					c = k >>> 0 < D[1311115] >>> 0 ? 10 : 9;
					break;
				case 9:
					D[l >> 2] = k;
					D[(k + 12 | 0) >> 2] = p;
					c = 11;
					break;
				case 10:
					O();
				case 11:
					var r = j << 3;
					D[(q + 4 | 0) >> 2] = r | 3;
					r = q + (r | 4) | 0;
					D[r >> 2] |= 1;
					r = m;
					c = 39;
					break;
				case 12:
					if (e >>> 0 > D[1311113] >>> 0) {
						c = 13
					} else {
						var t = e,
							c = 31
					}
					break;
				case 13:
					c = 0 == (i | 0) ? 26 : 14;
					break;
				case 14:
					var v = 2 << f,
						v = i << f & (v | -v | 0),
						u = (v & (-v | 0)) - 1 | 0,
						v = u >>> 12 & 16,
						w = u >>> (v >>> 0),
						u = w >>> 5 & 8,
						x = w >>> (u >>> 0),
						w = x >>> 2 & 4,
						z = x >>> (w >>> 0),
						x = z >>> 1 & 2,
						z = z >>> (x >>> 0),
						C = z >>> 1 & 1,
						v = (u | v | w | x | C) + (z >>> (C >>> 0)) | 0,
						w = v << 1,
						u = 5244484 + (w << 2) | 0,
						w = 5244484 + ((w + 2 | 0) << 2) | 0,
						x = D[w >> 2],
						z = x + 8 | 0,
						C = D[z >> 2],
						c = (u | 0) == (C | 0) ? 15 : 16;
					break;
				case 15:
					D[1311111] = h & (1 << v ^ -1);
					c = 19;
					break;
				case 16:
					c = C >>> 0 < D[1311115] >>> 0 ? 18 : 17;
					break;
				case 17:
					D[w >> 2] = C;
					D[(C + 12 | 0) >> 2] = u;
					c = 19;
					break;
				case 18:
					O();
				case 19:
					var A = v << 3,
						y = A - e | 0;
					D[(x + 4 | 0) >> 2] = e | 3;
					var c = x,
						E = c + e | 0;
					D[(c + (e | 4) | 0) >> 2] = y | 1;
					D[(c + A | 0) >> 2] = y;
					A = D[1311113];
					c = 0 == (A | 0) ? 25 : 20;
					break;
				case 20:
					var G = D[1311116],
						F = A >>> 2 & 1073741822,
						B = 5244484 + (F << 2) | 0,
						J = D[1311111],
						N = 1 << (A >>> 3),
						c = 0 == (J & N | 0) ? 21 : 22;
					break;
				case 21:
					D[1311111] = J | N;
					var V = B,
						c = 24;
					break;
				case 22:
					c = D[(5244484 + ((F + 2 | 0) << 2) | 0) >> 2];
					c >>> 0 < D[1311115] >>> 0 ? c = 23 : (V = c, c = 24);
					break;
				case 23:
					O();
				case 24:
					D[(5244484 + ((F + 2 | 0) << 2) | 0) >> 2] = G;
					D[(V + 12 | 0) >> 2] = G;
					D[(G + 8 | 0) >> 2] = V;
					D[(G + 12 | 0) >> 2] = B;
					c = 25;
					break;
				case 25:
					D[1311113] = y;
					D[1311116] = E;
					r = z;
					c = 39;
					break;
				case 26:
					0 == (D[1311112] | 0) ? (t = e, c = 31) : c = 27;
					break;
				case 27:
					c = Zs(e);
					0 == (c | 0) ? (t = e, c = 31) : (r = c, c = 39);
					break;
				case 28:
					4294967231 < d >>> 0 ? (t = -1, c = 31) : c = 29;
					break;
				case 29:
					var L = (d + 11 | 0) & -8;
					0 == (D[1311112] | 0) ? (t = L, c = 31) : c = 30;
					break;
				case 30:
					c = $s(L);
					0 == (c | 0) ? (t = L, c = 31) : (r = c, c = 39);
					break;
				case 31:
					var da = D[1311113],
						c = t >>> 0 > da >>> 0 ? 36 : 32;
					break;
				case 32:
					var Z = da - t | 0,
						ea = D[1311116],
						c = 15 < Z >>> 0 ? 33 : 34;
					break;
				case 33:
					c = ea;
					D[1311116] = c + t | 0;
					D[1311113] = Z;
					D[(c + (t + 4 | 0) | 0) >> 2] = Z | 1;
					D[(c + da | 0) >> 2] = Z;
					D[(ea + 4 | 0) >> 2] = t | 3;
					c = 35;
					break;
				case 34:
					D[1311113] = 0;
					D[1311116] = 0;
					D[(ea + 4 | 0) >> 2] = da | 3;
					c = ea + (da + 4 | 0) | 0;
					D[c >> 2] |= 1;
					c = 35;
					break;
				case 35:
					r = ea + 8 | 0;
					c = 39;
					break;
				case 36:
					var W = D[1311114],
						c = t >>> 0 < W >>> 0 ? 37 : 38;
					break;
				case 37:
					r = W - t | 0;
					D[1311114] = r;
					var $ = c = D[1311117];
					D[1311117] = $ + t | 0;
					D[($ + (t + 4 | 0) | 0) >> 2] = r | 1;
					D[(c + 4 | 0) >> 2] = t | 3;
					r = c + 8 | 0;
					c = 39;
					break;
				case 38:
					r = at(t);
					c = 39;
					break;
				case 39:
					return r;
				default:
					H(0, "bad label: " + c)
			}
		}
	}
	Module._malloc = hk;
	hk.X = 1;

	function Zs(d) {
		for (var c = 0, c = 2;;) {
			switch (c) {
				case 2:
					var e = D[1311112],
						f = (e & (-e | 0)) - 1 | 0,
						e = f >>> 12 & 16,
						h = f >>> (e >>> 0),
						f = h >>> 5 & 8,
						c = h >>> (f >>> 0),
						h = c >>> 2 & 4,
						i = c >>> (h >>> 0),
						c = i >>> 1 & 2,
						i = i >>> (c >>> 0),
						j = i >>> 1 & 1,
						e = f = h = D[(5244748 + (((f | e | h | c | j) + (i >>> (j >>> 0)) | 0) << 2) | 0) >> 2],
						h = (D[(h + 4 | 0) >> 2] & -8) - d | 0,
						c = 3;
					break;
				case 3:
					c = D[(f + 16 | 0) >> 2];
					if (0 == (c | 0)) {
						c = 4
					} else {
						var l = c,
							c = 5
					}
					break;
				case 4:
					c = D[(f + 20 | 0) >> 2];
					0 == (c | 0) ? c = 6 : (l = c, c = 5);
					break;
				case 5:
					c = (D[(l + 4 | 0) >> 2] & -8) - d | 0;
					h = (f = c >>> 0 < h >>> 0) ? c : h;
					e = f ? l : e;
					f = l;
					c = 3;
					break;
				case 6:
					var p = e,
						q = D[1311115],
						c = p >>> 0 < q >>> 0 ? 50 : 7;
					break;
				case 7:
					var m = c = p + d | 0,
						c = p >>> 0 < c >>> 0 ? 8 : 50;
					break;
				case 8:
					var k = D[(e + 24 | 0) >> 2],
						r = D[(e + 12 | 0) >> 2],
						c = (r | 0) == (e | 0) ? 12 : 9;
					break;
				case 9:
					var t = D[(e + 8 | 0) >> 2],
						c = t >>> 0 < q >>> 0 ? 11 : 10;
					break;
				case 10:
					D[(t + 12 | 0) >> 2] = r;
					D[(r + 8 | 0) >> 2] = t;
					var v = r,
						c = 20;
					break;
				case 11:
					O();
				case 12:
					c = e + 20 | 0;
					i = D[c >> 2];
					if (0 == (i | 0)) {
						c = 13
					} else {
						var u = c,
							w = i,
							c = 14
					}
					break;
				case 13:
					c = e + 16 | 0;
					i = D[c >> 2];
					0 == (i | 0) ? (v = 0, c = 20) : (u = c, w = i, c = 14);
					break;
				case 14:
					c = w + 20 | 0;
					if (0 == (D[c >> 2] | 0)) {
						c = 15
					} else {
						var x = c,
							c = 16
					}
					break;
				case 15:
					c = w + 16 | 0;
					0 == (D[c >> 2] | 0) ? c = 17 : (x = c, c = 16);
					break;
				case 16:
					w = D[x >> 2];
					u = x;
					c = 14;
					break;
				case 17:
					c = u >>> 0 < D[1311115] >>> 0 ? 19 : 18;
					break;
				case 18:
					D[u >> 2] = 0;
					v = w;
					c = 20;
					break;
				case 19:
					O();
				case 20:
					c = 0 == (k | 0) ? 40 : 21;
					break;
				case 21:
					var z = e + 28 | 0,
						C = 5244748 + (D[z >> 2] << 2) | 0,
						c = (e | 0) == (D[C >> 2] | 0) ? 22 : 24;
					break;
				case 22:
					D[C >> 2] = v;
					c = 0 == (v | 0) ? 23 : 30;
					break;
				case 23:
					D[1311112] &= 1 << D[z >> 2] ^ -1;
					c = 40;
					break;
				case 24:
					c = k >>> 0 < D[1311115] >>> 0 ? 28 : 25;
					break;
				case 25:
					var A = k + 16 | 0,
						c = (D[A >> 2] | 0) == (e | 0) ? 26 : 27;
					break;
				case 26:
					D[A >> 2] = v;
					c = 29;
					break;
				case 27:
					D[(k + 20 | 0) >> 2] = v;
					c = 29;
					break;
				case 28:
					O();
				case 29:
					c = 0 == (v | 0) ? 40 : 30;
					break;
				case 30:
					c = v >>> 0 < D[1311115] >>> 0 ? 39 : 31;
					break;
				case 31:
					D[(v + 24 | 0) >> 2] = k;
					var y = D[(e + 16 | 0) >> 2],
						c = 0 == (y | 0) ? 35 : 32;
					break;
				case 32:
					c = y >>> 0 < D[1311115] >>> 0 ? 34 : 33;
					break;
				case 33:
					D[(v + 16 | 0) >> 2] = y;
					D[(y + 24 | 0) >> 2] = v;
					c = 35;
					break;
				case 34:
					O();
				case 35:
					var E = D[(e + 20 | 0) >> 2],
						c = 0 == (E | 0) ? 40 : 36;
					break;
				case 36:
					c = E >>> 0 < D[1311115] >>> 0 ? 38 : 37;
					break;
				case 37:
					D[(v + 20 | 0) >> 2] = E;
					D[(E + 24 | 0) >> 2] = v;
					c = 40;
					break;
				case 38:
					O();
				case 39:
					O();
				case 40:
					c = 16 > h >>> 0 ? 41 : 42;
					break;
				case 41:
					c = h + d | 0;
					D[(e + 4 | 0) >> 2] = c | 3;
					c = p + (c + 4 | 0) | 0;
					D[c >> 2] |= 1;
					c = 49;
					break;
				case 42:
					D[(e + 4 | 0) >> 2] = d | 3;
					D[(p + (d + 4 | 0) | 0) >> 2] = h | 1;
					D[(p + (h + d | 0) | 0) >> 2] = h;
					var G = D[1311113],
						c = 0 == (G | 0) ? 48 : 43;
					break;
				case 43:
					var F = D[1311116],
						B = G >>> 2 & 1073741822,
						J = 5244484 + (B << 2) | 0,
						N = D[1311111],
						V = 1 << (G >>> 3),
						c = 0 == (N & V | 0) ? 44 : 45;
					break;
				case 44:
					D[1311111] = N | V;
					var L = J,
						c = 47;
					break;
				case 45:
					c = D[(5244484 + ((B + 2 | 0) << 2) | 0) >> 2];
					c >>> 0 < D[1311115] >>> 0 ? c = 46 : (L = c, c = 47);
					break;
				case 46:
					O();
				case 47:
					D[(5244484 + ((B + 2 | 0) << 2) | 0) >> 2] = F;
					D[(L + 12 | 0) >> 2] = F;
					D[(F + 8 | 0) >> 2] = L;
					D[(F + 12 | 0) >> 2] = J;
					c = 48;
					break;
				case 48:
					D[1311113] = h;
					D[1311116] = m;
					c = 49;
					break;
				case 49:
					return e + 8 | 0;
				case 50:
					O();
				default:
					H(0, "bad label: " + c)
			}
		}
	}
	Zs.X = 1;

	function at(d) {
		for (var c = 0, c = 2;;) {
			switch (c) {
				case 2:
					c = 0 == (D[1310793] | 0) ? 3 : 4;
					break;
				case 3:
					bt();
					c = 4;
					break;
				case 4:
					if (0 == (D[1311221] & 4 | 0)) {
						c = 5
					} else {
						var e = 0,
							c = 24
					}
					break;
				case 5:
					var f = D[1311117],
						c = 0 == (f | 0) ? 7 : 6;
					break;
				case 6:
					var h = ct(f),
						c = 0 == (h | 0) ? 7 : 12;
					break;
				case 7:
					var i = ll(0);
					if (-1 == (i | 0)) {
						var j = 0,
							c = 22
					} else {
						c = 8
					}
					break;
				case 8:
					var l = D[1310795],
						l = ((d + 47 | 0) + l | 0) & (-l | 0),
						p = i,
						q = D[1310794],
						m = q - 1 | 0;
					if (0 == (m & p | 0)) {
						var k = l,
							c = 10
					} else {
						c = 9
					}
					break;
				case 9:
					k = (l - p | 0) + ((m + p | 0) & (-q | 0)) | 0;
					c = 10;
					break;
				case 10:
					2147483647 > k >>> 0 ? c = 11 : (j = 0, c = 22);
					break;
				case 11:
					var r = ll(k),
						t = (r | 0) == (i | 0),
						v = t ? i : -1,
						t = t ? k : 0,
						u = k,
						c = 14;
					break;
				case 12:
					var w = D[1310795],
						w = (((d + 47 | 0) - D[1311114] | 0) + w | 0) & (-w | 0);
					2147483647 > w >>> 0 ? c = 13 : (j = 0, c = 22);
					break;
				case 13:
					r = ll(w);
					t = (v = (r | 0) == (D[(h | 0) >> 2] + D[(h + 4 | 0) >> 2] | 0)) ? w : 0;
					v = v ? r : -1;
					u = w;
					c = 14;
					break;
				case 14:
					var x = -u | 0;
					if (-1 == (v | 0)) {
						c = 15
					} else {
						var z = t,
							C = v,
							c = 27
					}
					break;
				case 15:
					if (-1 != (r | 0) & 2147483647 > u >>> 0) {
						c = 16
					} else {
						var A = u,
							c = 21
					}
					break;
				case 16:
					u >>> 0 < (d + 48 | 0) >>> 0 ? c = 17 : (A = u, c = 21);
					break;
				case 17:
					var y = D[1310795],
						y = (((d + 47 | 0) - u | 0) + y | 0) & (-y | 0);
					2147483647 > y >>> 0 ? c = 18 : (A = u, c = 21);
					break;
				case 18:
					c = -1 == (ll(y) | 0) ? 20 : 19;
					break;
				case 19:
					A = y + u | 0;
					c = 21;
					break;
				case 20:
					ll(x);
					j = t;
					c = 22;
					break;
				case 21:
					-1 == (r | 0) ? c = 23 : (z = A, C = r, c = 27);
					break;
				case 22:
					D[1311221] |= 4;
					e = j;
					c = 24;
					break;
				case 23:
					D[1311221] |= 4;
					e = t;
					c = 24;
					break;
				case 24:
					var E = D[1310795],
						E = ((d + 47 | 0) + E | 0) & (-E | 0),
						c = 2147483647 > E >>> 0 ? 25 : 50;
					break;
				case 25:
					var G = ll(E),
						F = ll(0),
						c = -1 != (F | 0) & -1 != (G | 0) & G >>> 0 < F >>> 0 ? 26 : 50;
					break;
				case 26:
					var B = F - G | 0,
						B = (c = B >>> 0 > (d + 40 | 0) >>> 0) ? B : e,
						c = c ? G : -1; - 1 == (c | 0) ? c = 50 : (z = B, C = c, c = 27);
					break;
				case 27:
					var J = D[1311219] + z | 0;
					D[1311219] = J;
					c = J >>> 0 > D[1311220] >>> 0 ? 28 : 29;
					break;
				case 28:
					D[1311220] = J;
					c = 29;
					break;
				case 29:
					if (0 == (D[1311117] | 0)) {
						c = 30
					} else {
						var N = 5244888,
							c = 33
					}
					break;
				case 30:
					c = D[1311115];
					c = 0 == (c | 0) | C >>> 0 < c >>> 0 ? 31 : 32;
					break;
				case 31:
					D[1311115] = C;
					c = 32;
					break;
				case 32:
					D[1311222] = C;
					D[1311223] = z;
					D[1311225] = 0;
					D[1311120] = D[1310793];
					D[1311119] = -1;
					a: {
						c = 0;
						for (c = 2;;) {
							switch (c) {
								case 2:
									var V = 0,
										c = 3;
									break;
								case 3:
									c = V << 1;
									B = 5244484 + (c << 2) | 0;
									D[(5244484 + ((c + 3 | 0) << 2) | 0) >> 2] = B;
									D[(5244484 + ((c + 2 | 0) << 2) | 0) >> 2] = B;
									c = V + 1 | 0;
									32 == (c | 0) ? c = 4 : (V = c, c = 3);
									break;
								case 4:
									break a;
								default:
									H(0, "bad label: " + c)
							}
						}
					}
					dt(C, z - 40 | 0);
					c = 48;
					break;
				case 33:
					c = 0 == (N | 0) ? 39 : 34;
					break;
				case 34:
					var L = D[(N | 0) >> 2],
						da = N + 4 | 0,
						Z = D[da >> 2],
						ea = L + Z | 0,
						c = (C | 0) == (ea | 0) ? 36 : 35;
					break;
				case 35:
					N = D[(N + 8 | 0) >> 2];
					c = 33;
					break;
				case 36:
					c = 0 == (D[(N + 12 | 0) >> 2] & 8 | 0) ? 37 : 39;
					break;
				case 37:
					c = D[1311117];
					c = c >>> 0 >= L >>> 0 & c >>> 0 < ea >>> 0 ? 38 : 39;
					break;
				case 38:
					D[da >> 2] = Z + z | 0;
					dt(D[1311117], D[1311114] + z | 0);
					c = 48;
					break;
				case 39:
					c = C >>> 0 < D[1311115] >>> 0 ? 40 : 41;
					break;
				case 40:
					D[1311115] = C;
					c = 41;
					break;
				case 41:
					var W = C + z | 0,
						$ = 5244888,
						c = 42;
					break;
				case 42:
					c = 0 == ($ | 0) ? 47 : 43;
					break;
				case 43:
					var ha = $ | 0,
						ja = D[ha >> 2],
						c = (ja | 0) == (W | 0) ? 45 : 44;
					break;
				case 44:
					$ = D[($ + 8 | 0) >> 2];
					c = 42;
					break;
				case 45:
					c = 0 == (D[($ + 12 | 0) >> 2] & 8 | 0) ? 46 : 47;
					break;
				case 46:
					D[ha >> 2] = C;
					var Y = $ + 4 | 0;
					D[Y >> 2] = D[Y >> 2] + z | 0;
					Y = et(C, ja, d);
					c = 51;
					break;
				case 47:
					ft(C, z);
					c = 48;
					break;
				case 48:
					var aa = D[1311114],
						c = aa >>> 0 > d >>> 0 ? 49 : 50;
					break;
				case 49:
					Y = aa - d | 0;
					D[1311114] = Y;
					B = c = D[1311117];
					D[1311117] = B + d | 0;
					D[(B + (d + 4 | 0) | 0) >> 2] = Y | 1;
					D[(c + 4 | 0) >> 2] = d | 3;
					Y = c + 8 | 0;
					c = 51;
					break;
				case 50:
					D[Sk >> 2] = 12;
					Y = 0;
					c = 51;
					break;
				case 51:
					return Y;
				default:
					H(0, "bad label: " + c)
			}
		}
	}
	at.X = 1;

	function $s(d) {
		for (var c = 0, c = 2;;) {
			switch (c) {
				case 2:
					var e = -d | 0,
						f = d >>> 8;
					if (0 == (f | 0)) {
						var h = 0,
							c = 5
					} else {
						c = 3
					}
					break;
				case 3:
					16777215 < d >>> 0 ? (h = 31, c = 5) : c = 4;
					break;
				case 4:
					var i = (f + 1048320 | 0) >>> 16 & 8,
						j = f << i,
						l = (j + 520192 | 0) >>> 16 & 4,
						p = j << l,
						q = (p + 245760 | 0) >>> 16 & 2,
						m = (14 - (l | i | q) | 0) + (p << q >>> 15) | 0,
						h = d >>> ((m + 7 | 0) >>> 0) & 1 | m << 1,
						c = 5;
					break;
				case 5:
					var k = D[(5244748 + (h << 2) | 0) >> 2];
					if (0 == (k | 0)) {
						var r = 0,
							t = e,
							v = 0,
							c = 12
					} else {
						c = 6
					}
					break;
				case 6:
					if (31 == (h | 0)) {
						var u = 0,
							c = 8
					} else {
						c = 7
					}
					break;
				case 7:
					u = 25 - (h >>> 1) | 0;
					c = 8;
					break;
				case 8:
					var w = 0,
						x = e,
						z = k,
						C = d << u,
						A = 0,
						c = 9;
					break;
				case 9:
					var y = D[(z + 4 | 0) >> 2] & -8,
						E = y - d | 0;
					if (E >>> 0 < x >>> 0) {
						c = 10
					} else {
						var G = w,
							F = x,
							c = 11
					}
					break;
				case 10:
					(y | 0) == (d | 0) ? (r = z, t = E, v = z, c = 12) : (G = z, F = E, c = 11);
					break;
				case 11:
					var B = D[(z + 20 | 0) >> 2],
						J = D[(z + 16 + (C >>> 31 << 2) | 0) >> 2],
						N = 0 == (B | 0) | (B | 0) == (J | 0) ? A : B,
						V = C << 1;
					0 == (J | 0) ? (r = G, t = F, v = N, c = 12) : (w = G, x = F, z = J, C = V, A = N, c = 9);
					break;
				case 12:
					if (0 == (v | 0) & 0 == (r | 0)) {
						c = 13
					} else {
						var L = v,
							c = 15
					}
					break;
				case 13:
					var da = 2 << h,
						Z = D[1311112] & (da | -da | 0);
					0 == (Z | 0) ? (L = v, c = 15) : c = 14;
					break;
				case 14:
					var ea = (Z & (-Z | 0)) - 1 | 0,
						W = ea >>> 12 & 16,
						$ = ea >>> (W >>> 0),
						ha = $ >>> 5 & 8,
						ja = $ >>> (ha >>> 0),
						Y = ja >>> 2 & 4,
						aa = ja >>> (Y >>> 0),
						ia = aa >>> 1 & 2,
						ca = aa >>> (ia >>> 0),
						ma = ca >>> 1 & 1,
						L = D[(5244748 + (((ha | W | Y | ia | ma) + (ca >>> (ma >>> 0)) | 0) << 2) | 0) >> 2],
						c = 15;
					break;
				case 15:
					if (0 == (L | 0)) {
						var T = t,
							Q = r,
							c = 18
					} else {
						var fa = L,
							ta = t,
							P = r,
							c = 16
					}
					break;
				case 16:
					var qa = (D[(fa + 4 | 0) >> 2] & -8) - d | 0,
						ua = qa >>> 0 < ta >>> 0,
						ra = ua ? qa : ta,
						sa = ua ? fa : P,
						Ca = D[(fa + 16 | 0) >> 2];
					0 == (Ca | 0) ? c = 17 : (fa = Ca, ta = ra, P = sa, c = 16);
					break;
				case 17:
					var Ga = D[(fa + 20 | 0) >> 2];
					0 == (Ga | 0) ? (T = ra, Q = sa, c = 18) : (fa = Ga, ta = ra, P = sa, c = 16);
					break;
				case 18:
					if (0 == (Q | 0)) {
						var Aa = 0,
							c = 81
					} else {
						c = 19
					}
					break;
				case 19:
					T >>> 0 < (D[1311113] - d | 0) >>> 0 ? c = 20 : (Aa = 0, c = 81);
					break;
				case 20:
					var ka = Q,
						lc = D[1311115],
						c = ka >>> 0 < lc >>> 0 ? 80 : 21;
					break;
				case 21:
					var Ba = ka + d | 0,
						kd = Ba,
						c = ka >>> 0 < Ba >>> 0 ? 22 : 80;
					break;
				case 22:
					var ac = D[(Q + 24 | 0) >> 2],
						ld = D[(Q + 12 | 0) >> 2],
						c = (ld | 0) == (Q | 0) ? 26 : 23;
					break;
				case 23:
					var md = D[(Q + 8 | 0) >> 2],
						c = md >>> 0 < lc >>> 0 ? 25 : 24;
					break;
				case 24:
					D[(md + 12 | 0) >> 2] = ld;
					D[(ld + 8 | 0) >> 2] = md;
					var Ja = ld,
						c = 34;
					break;
				case 25:
					O();
				case 26:
					var zj = Q + 20 | 0,
						Aj = D[zj >> 2];
					if (0 == (Aj | 0)) {
						c = 27
					} else {
						var qd = zj,
							Ua = Aj,
							c = 28
					}
					break;
				case 27:
					var mc = Q + 16 | 0,
						nc = D[mc >> 2];
					0 == (nc | 0) ? (Ja = 0, c = 34) : (qd = mc, Ua = nc, c = 28);
					break;
				case 28:
					var bc = Ua + 20 | 0;
					if (0 == (D[bc >> 2] | 0)) {
						c = 29
					} else {
						var cc = bc,
							c = 30
					}
					break;
				case 29:
					var Va = Ua + 16 | 0;
					0 == (D[Va >> 2] | 0) ? c = 31 : (cc = Va, c = 30);
					break;
				case 30:
					var dc = D[cc >> 2],
						qd = cc,
						Ua = dc,
						c = 28;
					break;
				case 31:
					c = qd >>> 0 < D[1311115] >>> 0 ? 33 : 32;
					break;
				case 32:
					D[qd >> 2] = 0;
					Ja = Ua;
					c = 34;
					break;
				case 33:
					O();
				case 34:
					c = 0 == (ac | 0) ? 54 : 35;
					break;
				case 35:
					var Ea = Q + 28 | 0,
						ec = 5244748 + (D[Ea >> 2] << 2) | 0,
						c = (Q | 0) == (D[ec >> 2] | 0) ? 36 : 38;
					break;
				case 36:
					D[ec >> 2] = Ja;
					c = 0 == (Ja | 0) ? 37 : 44;
					break;
				case 37:
					D[1311112] &= 1 << D[Ea >> 2] ^ -1;
					c = 54;
					break;
				case 38:
					c = ac >>> 0 < D[1311115] >>> 0 ? 42 : 39;
					break;
				case 39:
					var fc = ac + 16 | 0,
						c = (D[fc >> 2] | 0) == (Q | 0) ? 40 : 41;
					break;
				case 40:
					D[fc >> 2] = Ja;
					c = 43;
					break;
				case 41:
					D[(ac + 20 | 0) >> 2] = Ja;
					c = 43;
					break;
				case 42:
					O();
				case 43:
					c = 0 == (Ja | 0) ? 54 : 44;
					break;
				case 44:
					c = Ja >>> 0 < D[1311115] >>> 0 ? 53 : 45;
					break;
				case 45:
					D[(Ja + 24 | 0) >> 2] = ac;
					var $a = D[(Q + 16 | 0) >> 2],
						c = 0 == ($a | 0) ? 49 : 46;
					break;
				case 46:
					c = $a >>> 0 < D[1311115] >>> 0 ? 48 : 47;
					break;
				case 47:
					D[(Ja + 16 | 0) >> 2] = $a;
					D[($a + 24 | 0) >> 2] = Ja;
					c = 49;
					break;
				case 48:
					O();
				case 49:
					var Wa = D[(Q + 20 | 0) >> 2],
						c = 0 == (Wa | 0) ? 54 : 50;
					break;
				case 50:
					c = Wa >>> 0 < D[1311115] >>> 0 ? 52 : 51;
					break;
				case 51:
					D[(Ja + 20 | 0) >> 2] = Wa;
					D[(Wa + 24 | 0) >> 2] = Ja;
					c = 54;
					break;
				case 52:
					O();
				case 53:
					O();
				case 54:
					c = 16 > T >>> 0 ? 55 : 56;
					break;
				case 55:
					var gc = T + d | 0;
					D[(Q + 4 | 0) >> 2] = gc | 3;
					var hc = ka + (gc + 4 | 0) | 0;
					D[hc >> 2] |= 1;
					c = 79;
					break;
				case 56:
					D[(Q + 4 | 0) >> 2] = d | 3;
					D[(ka + (d + 4 | 0) | 0) >> 2] = T | 1;
					D[(ka + (T + d | 0) | 0) >> 2] = T;
					c = 256 > T >>> 0 ? 57 : 62;
					break;
				case 57:
					var Xa = T >>> 2 & 1073741822,
						ab = 5244484 + (Xa << 2) | 0,
						Ka = D[1311111],
						bb = 1 << (T >>> 3),
						c = 0 == (Ka & bb | 0) ? 58 : 59;
					break;
				case 58:
					D[1311111] = Ka | bb;
					var cb = ab,
						c = 61;
					break;
				case 59:
					var db = D[(5244484 + ((Xa + 2 | 0) << 2) | 0) >> 2];
					db >>> 0 < D[1311115] >>> 0 ? c = 60 : (cb = db, c = 61);
					break;
				case 60:
					O();
				case 61:
					D[(5244484 + ((Xa + 2 | 0) << 2) | 0) >> 2] = kd;
					D[(cb + 12 | 0) >> 2] = kd;
					D[(ka + (d + 8 | 0) | 0) >> 2] = cb;
					D[(ka + (d + 12 | 0) | 0) >> 2] = ab;
					c = 79;
					break;
				case 62:
					var Ha = Ba,
						Ya = T >>> 8;
					if (0 == (Ya | 0)) {
						var La = 0,
							c = 65
					} else {
						c = 63
					}
					break;
				case 63:
					16777215 < T >>> 0 ? (La = 31, c = 65) : c = 64;
					break;
				case 64:
					var Za = (Ya + 1048320 | 0) >>> 16 & 8,
						ic = Ya << Za,
						eb = (ic + 520192 | 0) >>> 16 & 4,
						Na = ic << eb,
						Fa = (Na + 245760 | 0) >>> 16 & 2,
						Ia = (14 - (eb | Za | Fa) | 0) + (Na << Fa >>> 15) | 0,
						La = T >>> ((Ia + 7 | 0) >>> 0) & 1 | Ia << 1,
						c = 65;
					break;
				case 65:
					var va = 5244748 + (La << 2) | 0;
					D[(ka + (d + 28 | 0) | 0) >> 2] = La;
					var Rj = ka + (d + 16 | 0) | 0;
					D[(ka + (d + 20 | 0) | 0) >> 2] = 0;
					D[Rj >> 2] = 0;
					var Sj = D[1311112],
						jk = 1 << La,
						c = 0 == (Sj & jk | 0) ? 66 : 67;
					break;
				case 66:
					D[1311112] = Sj | jk;
					D[va >> 2] = Ha;
					D[(ka + (d + 24 | 0) | 0) >> 2] = va;
					D[(ka + (d + 12 | 0) | 0) >> 2] = Ha;
					D[(ka + (d + 8 | 0) | 0) >> 2] = Ha;
					c = 79;
					break;
				case 67:
					var kk = D[va >> 2];
					if (31 == (La | 0)) {
						var Bj = 0,
							c = 69
					} else {
						c = 68
					}
					break;
				case 68:
					Bj = 25 - (La >>> 1) | 0;
					c = 69;
					break;
				case 69:
					var Cj = T << Bj,
						nd = kk,
						c = 70;
					break;
				case 70:
					c = (D[(nd + 4 | 0) >> 2] & -8 | 0) == (T | 0) ? 75 : 71;
					break;
				case 71:
					var oc = nd + 16 + (Cj >>> 31 << 2) | 0,
						Dj = D[oc >> 2],
						lk = Cj << 1;
					0 == (Dj | 0) ? c = 72 : (Cj = lk, nd = Dj, c = 70);
					break;
				case 72:
					c = oc >>> 0 < D[1311115] >>> 0 ? 74 : 73;
					break;
				case 73:
					D[oc >> 2] = Ha;
					D[(ka + (d + 24 | 0) | 0) >> 2] = nd;
					D[(ka + (d + 12 | 0) | 0) >> 2] = Ha;
					D[(ka + (d + 8 | 0) | 0) >> 2] = Ha;
					c = 79;
					break;
				case 74:
					O();
				case 75:
					var mk = nd + 8 | 0,
						nk = D[mk >> 2],
						Fk = D[1311115],
						c = nd >>> 0 < Fk >>> 0 ? 78 : 76;
					break;
				case 76:
					c = nk >>> 0 < Fk >>> 0 ? 78 : 77;
					break;
				case 77:
					D[(nk + 12 | 0) >> 2] = Ha;
					D[mk >> 2] = Ha;
					D[(ka + (d + 8 | 0) | 0) >> 2] = nk;
					D[(ka + (d + 12 | 0) | 0) >> 2] = nd;
					D[(ka + (d + 24 | 0) | 0) >> 2] = 0;
					c = 79;
					break;
				case 78:
					O();
				case 79:
					Aa = Q + 8 | 0;
					c = 81;
					break;
				case 80:
					O();
				case 81:
					return Aa;
				default:
					H(0, "bad label: " + c)
			}
		}
	}
	$s.X = 1;

	function gt(d) {
		for (var c = 0, c = 2;;) {
			switch (c) {
				case 2:
					c = 0 == (d | 0) ? 130 : 3;
					break;
				case 3:
					var e = d - 8 | 0,
						f = e,
						h = D[1311115],
						c = e >>> 0 < h >>> 0 ? 129 : 4;
					break;
				case 4:
					var i = D[(d - 4 | 0) >> 2],
						j = i & 3,
						c = 1 == (j | 0) ? 129 : 5;
					break;
				case 5:
					var l = i & -8,
						p = d + (l - 8 | 0) | 0,
						q = p;
					if (0 == (i & 1 | 0)) {
						c = 6
					} else {
						var m = f,
							k = l,
							c = 50
					}
					break;
				case 6:
					var r = D[e >> 2],
						c = 0 == (j | 0) ? 130 : 7;
					break;
				case 7:
					var t = -8 - r | 0,
						v = d + t | 0,
						u = v,
						w = r + l | 0,
						c = v >>> 0 < h >>> 0 ? 129 : 8;
					break;
				case 8:
					c = (u | 0) == (D[1311116] | 0) ? 48 : 9;
					break;
				case 9:
					var x = r >>> 3,
						c = 256 > r >>> 0 ? 10 : 16;
					break;
				case 10:
					var z = D[(d + (t + 8 | 0) | 0) >> 2],
						C = D[(d + (t + 12 | 0) | 0) >> 2],
						c = (z | 0) == (C | 0) ? 11 : 12;
					break;
				case 11:
					D[1311111] &= 1 << x ^ -1;
					m = u;
					k = w;
					c = 50;
					break;
				case 12:
					var A = 5244484 + ((r >>> 2 & 1073741822) << 2) | 0,
						c = (z | 0) != (A | 0) & z >>> 0 < h >>> 0 ? 15 : 13;
					break;
				case 13:
					c = (C | 0) == (A | 0) | C >>> 0 >= h >>> 0 ? 14 : 15;
					break;
				case 14:
					D[(z + 12 | 0) >> 2] = C;
					D[(C + 8 | 0) >> 2] = z;
					m = u;
					k = w;
					c = 50;
					break;
				case 15:
					O();
				case 16:
					var y = v,
						E = D[(d + (t + 24 | 0) | 0) >> 2],
						G = D[(d + (t + 12 | 0) | 0) >> 2],
						c = (G | 0) == (y | 0) ? 20 : 17;
					break;
				case 17:
					var F = D[(d + (t + 8 | 0) | 0) >> 2],
						c = F >>> 0 < h >>> 0 ? 19 : 18;
					break;
				case 18:
					D[(F + 12 | 0) >> 2] = G;
					D[(G + 8 | 0) >> 2] = F;
					var B = G,
						c = 28;
					break;
				case 19:
					O();
				case 20:
					var J = d + (t + 20 | 0) | 0,
						N = D[J >> 2];
					if (0 == (N | 0)) {
						c = 21
					} else {
						var V = J,
							L = N,
							c = 22
					}
					break;
				case 21:
					var da = d + (t + 16 | 0) | 0,
						Z = D[da >> 2];
					0 == (Z | 0) ? (B = 0, c = 28) : (V = da, L = Z, c = 22);
					break;
				case 22:
					var ea = L + 20 | 0;
					if (0 == (D[ea >> 2] | 0)) {
						c = 23
					} else {
						var W = ea,
							c = 24
					}
					break;
				case 23:
					var $ = L + 16 | 0;
					0 == (D[$ >> 2] | 0) ? c = 25 : (W = $, c = 24);
					break;
				case 24:
					var ha = D[W >> 2],
						V = W,
						L = ha,
						c = 22;
					break;
				case 25:
					c = V >>> 0 < D[1311115] >>> 0 ? 27 : 26;
					break;
				case 26:
					D[V >> 2] = 0;
					B = L;
					c = 28;
					break;
				case 27:
					O();
				case 28:
					0 == (E | 0) ? (m = u, k = w, c = 50) : c = 29;
					break;
				case 29:
					var ja = d + (t + 28 | 0) | 0,
						Y = 5244748 + (D[ja >> 2] << 2) | 0,
						c = (y | 0) == (D[Y >> 2] | 0) ? 30 : 32;
					break;
				case 30:
					D[Y >> 2] = B;
					c = 0 == (B | 0) ? 31 : 38;
					break;
				case 31:
					D[1311112] &= 1 << D[ja >> 2] ^ -1;
					m = u;
					k = w;
					c = 50;
					break;
				case 32:
					c = E >>> 0 < D[1311115] >>> 0 ? 36 : 33;
					break;
				case 33:
					var aa = E + 16 | 0,
						c = (D[aa >> 2] | 0) == (y | 0) ? 34 : 35;
					break;
				case 34:
					D[aa >> 2] = B;
					c = 37;
					break;
				case 35:
					D[(E + 20 | 0) >> 2] = B;
					c = 37;
					break;
				case 36:
					O();
				case 37:
					0 == (B | 0) ? (m = u, k = w, c = 50) : c = 38;
					break;
				case 38:
					c = B >>> 0 < D[1311115] >>> 0 ? 47 : 39;
					break;
				case 39:
					D[(B + 24 | 0) >> 2] = E;
					var ia = D[(d + (t + 16 | 0) | 0) >> 2],
						c = 0 == (ia | 0) ? 43 : 40;
					break;
				case 40:
					c = ia >>> 0 < D[1311115] >>> 0 ? 42 : 41;
					break;
				case 41:
					D[(B + 16 | 0) >> 2] = ia;
					D[(ia + 24 | 0) >> 2] = B;
					c = 43;
					break;
				case 42:
					O();
				case 43:
					var ca = D[(d + (t + 20 | 0) | 0) >> 2];
					0 == (ca | 0) ? (m = u, k = w, c = 50) : c = 44;
					break;
				case 44:
					c = ca >>> 0 < D[1311115] >>> 0 ? 46 : 45;
					break;
				case 45:
					D[(B + 20 | 0) >> 2] = ca;
					D[(ca + 24 | 0) >> 2] = B;
					m = u;
					k = w;
					c = 50;
					break;
				case 46:
					O();
				case 47:
					O();
				case 48:
					var ma = d + (l - 4 | 0) | 0;
					3 == (D[ma >> 2] & 3 | 0) ? c = 49 : (m = u, k = w, c = 50);
					break;
				case 49:
					D[1311113] = w;
					D[ma >> 2] &= -2;
					D[(d + (t + 4 | 0) | 0) >> 2] = w | 1;
					D[p >> 2] = w;
					c = 130;
					break;
				case 50:
					var T = m,
						c = T >>> 0 < p >>> 0 ? 51 : 129;
					break;
				case 51:
					var Q = d + (l - 4 | 0) | 0,
						fa = D[Q >> 2],
						c = 0 == (fa & 1 | 0) ? 129 : 52;
					break;
				case 52:
					c = 0 == (fa & 2 | 0) ? 53 : 103;
					break;
				case 53:
					c = (q | 0) == (D[1311117] | 0) ? 54 : 58;
					break;
				case 54:
					var ta = D[1311114] + k | 0;
					D[1311114] = ta;
					D[1311117] = m;
					D[(m + 4 | 0) >> 2] = ta | 1;
					c = (m | 0) == (D[1311116] | 0) ? 55 : 56;
					break;
				case 55:
					D[1311116] = 0;
					D[1311113] = 0;
					c = 56;
					break;
				case 56:
					c = ta >>> 0 > D[1311118] >>> 0 ? 57 : 130;
					break;
				case 57:
					ht(0);
					c = 130;
					break;
				case 58:
					c = (q | 0) == (D[1311116] | 0) ? 59 : 60;
					break;
				case 59:
					var P = D[1311113] + k | 0;
					D[1311113] = P;
					D[1311116] = m;
					D[(m + 4 | 0) >> 2] = P | 1;
					D[(T + P | 0) >> 2] = P;
					c = 130;
					break;
				case 60:
					var qa = (fa & -8) + k | 0,
						ua = fa >>> 3,
						c = 256 > fa >>> 0 ? 61 : 69;
					break;
				case 61:
					var ra = D[(d + l | 0) >> 2],
						sa = D[(d + (l | 4) | 0) >> 2],
						c = (ra | 0) == (sa | 0) ? 62 : 63;
					break;
				case 62:
					D[1311111] &= 1 << ua ^ -1;
					c = 101;
					break;
				case 63:
					var Ca = 5244484 + ((fa >>> 2 & 1073741822) << 2) | 0,
						c = (ra | 0) == (Ca | 0) ? 65 : 64;
					break;
				case 64:
					c = ra >>> 0 < D[1311115] >>> 0 ? 68 : 65;
					break;
				case 65:
					c = (sa | 0) == (Ca | 0) ? 67 : 66;
					break;
				case 66:
					c = sa >>> 0 < D[1311115] >>> 0 ? 68 : 67;
					break;
				case 67:
					D[(ra + 12 | 0) >> 2] = sa;
					D[(sa + 8 | 0) >> 2] = ra;
					c = 101;
					break;
				case 68:
					O();
				case 69:
					var Ga = p,
						Aa = D[(d + (l + 16 | 0) | 0) >> 2],
						ka = D[(d + (l | 4) | 0) >> 2],
						c = (ka | 0) == (Ga | 0) ? 73 : 70;
					break;
				case 70:
					var lc = D[(d + l | 0) >> 2],
						c = lc >>> 0 < D[1311115] >>> 0 ? 72 : 71;
					break;
				case 71:
					D[(lc + 12 | 0) >> 2] = ka;
					D[(ka + 8 | 0) >> 2] = lc;
					var Ba = ka,
						c = 81;
					break;
				case 72:
					O();
				case 73:
					var kd = d + (l + 12 | 0) | 0,
						ac = D[kd >> 2];
					if (0 == (ac | 0)) {
						c = 74
					} else {
						var ld = kd,
							md = ac,
							c = 75
					}
					break;
				case 74:
					var Ja = d + (l + 8 | 0) | 0,
						zj = D[Ja >> 2];
					0 == (zj | 0) ? (Ba = 0, c = 81) : (ld = Ja, md = zj, c = 75);
					break;
				case 75:
					var Aj = md + 20 | 0;
					if (0 == (D[Aj >> 2] | 0)) {
						c = 76
					} else {
						var qd = Aj,
							c = 77
					}
					break;
				case 76:
					var Ua = md + 16 | 0;
					0 == (D[Ua >> 2] | 0) ? c = 78 : (qd = Ua, c = 77);
					break;
				case 77:
					var mc = D[qd >> 2],
						ld = qd,
						md = mc,
						c = 75;
					break;
				case 78:
					c = ld >>> 0 < D[1311115] >>> 0 ? 80 : 79;
					break;
				case 79:
					D[ld >> 2] = 0;
					Ba = md;
					c = 81;
					break;
				case 80:
					O();
				case 81:
					c = 0 == (Aa | 0) ? 101 : 82;
					break;
				case 82:
					var nc = d + (l + 20 | 0) | 0,
						bc = 5244748 + (D[nc >> 2] << 2) | 0,
						c = (Ga | 0) == (D[bc >> 2] | 0) ? 83 : 85;
					break;
				case 83:
					D[bc >> 2] = Ba;
					c = 0 == (Ba | 0) ? 84 : 91;
					break;
				case 84:
					D[1311112] &= 1 << D[nc >> 2] ^ -1;
					c = 101;
					break;
				case 85:
					c = Aa >>> 0 < D[1311115] >>> 0 ? 89 : 86;
					break;
				case 86:
					var cc = Aa + 16 | 0,
						c = (D[cc >> 2] | 0) == (Ga | 0) ? 87 : 88;
					break;
				case 87:
					D[cc >> 2] = Ba;
					c = 90;
					break;
				case 88:
					D[(Aa + 20 | 0) >> 2] = Ba;
					c = 90;
					break;
				case 89:
					O();
				case 90:
					c = 0 == (Ba | 0) ? 101 : 91;
					break;
				case 91:
					c = Ba >>> 0 < D[1311115] >>> 0 ? 100 : 92;
					break;
				case 92:
					D[(Ba + 24 | 0) >> 2] = Aa;
					var Va = D[(d + (l + 8 | 0) | 0) >> 2],
						c = 0 == (Va | 0) ? 96 : 93;
					break;
				case 93:
					c = Va >>> 0 < D[1311115] >>> 0 ? 95 : 94;
					break;
				case 94:
					D[(Ba + 16 | 0) >> 2] = Va;
					D[(Va + 24 | 0) >> 2] = Ba;
					c = 96;
					break;
				case 95:
					O();
				case 96:
					var dc = D[(d + (l + 12 | 0) | 0) >> 2],
						c = 0 == (dc | 0) ? 101 : 97;
					break;
				case 97:
					c = dc >>> 0 < D[1311115] >>> 0 ? 99 : 98;
					break;
				case 98:
					D[(Ba + 20 | 0) >> 2] = dc;
					D[(dc + 24 | 0) >> 2] = Ba;
					c = 101;
					break;
				case 99:
					O();
				case 100:
					O();
				case 101:
					D[(m + 4 | 0) >> 2] = qa | 1;
					D[(T + qa | 0) >> 2] = qa;
					if ((m | 0) == (D[1311116] | 0)) {
						c = 102
					} else {
						var Ea = qa,
							c = 104
					}
					break;
				case 102:
					D[1311113] = qa;
					c = 130;
					break;
				case 103:
					D[Q >> 2] = fa & -2;
					D[(m + 4 | 0) >> 2] = k | 1;
					Ea = D[(T + k | 0) >> 2] = k;
					c = 104;
					break;
				case 104:
					c = 256 > Ea >>> 0 ? 105 : 110;
					break;
				case 105:
					var ec = Ea >>> 2 & 1073741822,
						fc = 5244484 + (ec << 2) | 0,
						$a = D[1311111],
						Wa = 1 << (Ea >>> 3),
						c = 0 == ($a & Wa | 0) ? 106 : 107;
					break;
				case 106:
					D[1311111] = $a | Wa;
					var gc = fc,
						c = 109;
					break;
				case 107:
					var hc = D[(5244484 + ((ec + 2 | 0) << 2) | 0) >> 2];
					hc >>> 0 < D[1311115] >>> 0 ? c = 108 : (gc = hc, c = 109);
					break;
				case 108:
					O();
				case 109:
					D[(5244484 + ((ec + 2 | 0) << 2) | 0) >> 2] = m;
					D[(gc + 12 | 0) >> 2] = m;
					D[(m + 8 | 0) >> 2] = gc;
					D[(m + 12 | 0) >> 2] = fc;
					c = 130;
					break;
				case 110:
					var Xa = m,
						ab = Ea >>> 8;
					if (0 == (ab | 0)) {
						var Ka = 0,
							c = 113
					} else {
						c = 111
					}
					break;
				case 111:
					16777215 < Ea >>> 0 ? (Ka = 31, c = 113) : c = 112;
					break;
				case 112:
					var bb = (ab + 1048320 | 0) >>> 16 & 8,
						cb = ab << bb,
						db = (cb + 520192 | 0) >>> 16 & 4,
						Ha = cb << db,
						Ya = (Ha + 245760 | 0) >>> 16 & 2,
						La = (14 - (db | bb | Ya) | 0) + (Ha << Ya >>> 15) | 0,
						Ka = Ea >>> ((La + 7 | 0) >>> 0) & 1 | La << 1,
						c = 113;
					break;
				case 113:
					var Za = 5244748 + (Ka << 2) | 0;
					D[(m + 28 | 0) >> 2] = Ka;
					D[(m + 20 | 0) >> 2] = 0;
					D[(m + 16 | 0) >> 2] = 0;
					var ic = D[1311112],
						eb = 1 << Ka,
						c = 0 == (ic & eb | 0) ? 114 : 115;
					break;
				case 114:
					D[1311112] = ic | eb;
					D[Za >> 2] = Xa;
					D[(m + 24 | 0) >> 2] = Za;
					D[(m + 12 | 0) >> 2] = m;
					D[(m + 8 | 0) >> 2] = m;
					c = 127;
					break;
				case 115:
					var Na = D[Za >> 2];
					if (31 == (Ka | 0)) {
						var Fa = 0,
							c = 117
					} else {
						c = 116
					}
					break;
				case 116:
					Fa = 25 - (Ka >>> 1) | 0;
					c = 117;
					break;
				case 117:
					var Ia = Ea << Fa,
						va = Na,
						c = 118;
					break;
				case 118:
					c = (D[(va + 4 | 0) >> 2] & -8 | 0) == (Ea | 0) ? 123 : 119;
					break;
				case 119:
					var Rj = va + 16 + (Ia >>> 31 << 2) | 0,
						Sj = D[Rj >> 2],
						jk = Ia << 1;
					0 == (Sj | 0) ? c = 120 : (Ia = jk, va = Sj, c = 118);
					break;
				case 120:
					c = Rj >>> 0 < D[1311115] >>> 0 ? 122 : 121;
					break;
				case 121:
					D[Rj >> 2] = Xa;
					D[(m + 24 | 0) >> 2] = va;
					D[(m + 12 | 0) >> 2] = m;
					D[(m + 8 | 0) >> 2] = m;
					c = 127;
					break;
				case 122:
					O();
				case 123:
					var kk = va + 8 | 0,
						Bj = D[kk >> 2],
						Cj = D[1311115],
						c = va >>> 0 < Cj >>> 0 ? 126 : 124;
					break;
				case 124:
					c = Bj >>> 0 < Cj >>> 0 ? 126 : 125;
					break;
				case 125:
					D[(Bj + 12 | 0) >> 2] = Xa;
					D[kk >> 2] = Xa;
					D[(m + 8 | 0) >> 2] = Bj;
					D[(m + 12 | 0) >> 2] = va;
					D[(m + 24 | 0) >> 2] = 0;
					c = 127;
					break;
				case 126:
					O();
				case 127:
					var nd = D[1311119] - 1 | 0;
					D[1311119] = nd;
					c = 0 == (nd | 0) ? 128 : 130;
					break;
				case 128:
					a: {
						for (var oc = 0, oc = 2;;) {
							switch (oc) {
								case 2:
									var Dj = 5244896,
										oc = 3;
									break;
								case 3:
									var lk = D[Dj >> 2],
										mk = lk + 8 | 0;
									0 == (lk | 0) ? oc = 4 : (Dj = mk, oc = 3);
									break;
								case 4:
									D[1311119] = -1;
									break a;
								default:
									H(0, "bad label: " + oc)
							}
						}
					}
					c = 130;
					break;
				case 129:
					O();
				case 130:
					return;
				default:
					H(0, "bad label: " + c)
			}
		}
	}
	Module._free = gt;
	gt.X = 1;

	function ht(d) {
		for (var c = 0, c = 2;;) {
			switch (c) {
				case 2:
					c = 0 == (D[1310793] | 0) ? 3 : 4;
					break;
				case 3:
					bt();
					c = 4;
					break;
				case 4:
					if (4294967232 > d >>> 0) {
						c = 5
					} else {
						var e = 0,
							c = 14
					}
					break;
				case 5:
					var f = D[1311117];
					0 == (f | 0) ? (e = 0, c = 14) : c = 6;
					break;
				case 6:
					var h = D[1311114],
						c = h >>> 0 > (d + 40 | 0) >>> 0 ? 7 : 12;
					break;
				case 7:
					var i = D[1310795],
						j = (Math.floor((((((-40 - d | 0) - 1 | 0) + h | 0) + i | 0) >>> 0) / (i >>> 0)) - 1 | 0) * i | 0,
						l = ct(f),
						c = 0 == (D[(l + 12 | 0) >> 2] & 8 | 0) ? 8 : 12;
					break;
				case 8:
					var p = ll(0),
						c = (p | 0) == (D[(l | 0) >> 2] + D[(l + 4 | 0) >> 2] | 0) ? 9 : 12;
					break;
				case 9:
					var q = -2147483648 - i | 0,
						c = ll(-(2147483646 < j >>> 0 ? q : j) | 0),
						q = ll(0),
						c = -1 != (c | 0) & q >>> 0 < p >>> 0 ? 10 : 12;
					break;
				case 10:
					var m = p - q | 0,
						c = (p | 0) == (q | 0) ? 12 : 11;
					break;
				case 11:
					e = l + 4 | 0;
					D[e >> 2] = D[e >> 2] - m | 0;
					D[1311219] = D[1311219] - m | 0;
					dt(D[1311117], D[1311114] - m | 0);
					e = (p | 0) != (q | 0);
					c = 14;
					break;
				case 12:
					D[1311114] >>> 0 > D[1311118] >>> 0 ? c = 13 : (e = 0, c = 14);
					break;
				case 13:
					D[1311118] = -1;
					e = 0;
					c = 14;
					break;
				case 14:
					return e & 1;
				default:
					H(0, "bad label: " + c)
			}
		}
	}
	ht.X = 1;
	Module._calloc = (function(d, c) {
		for (var e = 0, e = 2;;) {
			switch (e) {
				case 2:
					if (0 == (d | 0)) {
						var f = 0,
							e = 5
					} else {
						e = 3
					}
					break;
				case 3:
					var h = c * d | 0;
					65535 < (c | d) >>> 0 ? e = 4 : (f = h, e = 5);
					break;
				case 4:
					f = (Math.floor((h >>> 0) / (d >>> 0)) | 0) == (c | 0) ? h : -1;
					e = 5;
					break;
				case 5:
					var i = hk(f),
						e = 0 == (i | 0) ? 8 : 6;
					break;
				case 6:
					e = 0 == (D[(i - 4 | 0) >> 2] & 3 | 0) ? 8 : 7;
					break;
				case 7:
					ik(i, 0, f);
					e = 8;
					break;
				case 8:
					return i;
				default:
					H(0, "bad label: " + e)
			}
		}
	});

	function bt() {
		for (var d = 0, d = 2;;) {
			switch (d) {
				case 2:
					d = 0 == (D[1310793] | 0) ? 3 : 6;
					break;
				case 3:
					var c = kl(),
						d = 0 == ((c - 1 | 0) & c | 0) ? 5 : 4;
					break;
				case 4:
					O();
				case 5:
					D[1310795] = c;
					D[1310794] = c;
					D[1310796] = -1;
					D[1310797] = 2097152;
					D[1310798] = 0;
					D[1311221] = 0;
					d = Math.floor(Date.now() / 1e3);
					D[1310793] = d & -16 ^ 1431655768;
					d = 6;
					break;
				case 6:
					return;
				default:
					H(0, "bad label: " + d)
			}
		}
	}

	function ct(d) {
		for (var c = 0, c = 2;;) {
			switch (c) {
				case 2:
					var e = 5244888,
						c = 3;
					break;
				case 3:
					var f = D[(e | 0) >> 2],
						c = f >>> 0 > d >>> 0 ? 5 : 4;
					break;
				case 4:
					if ((f + D[(e + 4 | 0) >> 2] | 0) >>> 0 > d >>> 0) {
						var h = e,
							c = 6
					} else {
						c = 5
					}
					break;
				case 5:
					c = D[(e + 8 | 0) >> 2];
					0 == (c | 0) ? (h = 0, c = 6) : (e = c, c = 3);
					break;
				case 6:
					return h;
				default:
					H(0, "bad label: " + c)
			}
		}
	}

	function dt(d, c) {
		for (var e = 0, e = 2;;) {
			switch (e) {
				case 2:
					var f = d,
						h = d + 8 | 0;
					if (0 == (h & 7 | 0)) {
						var i = 0,
							e = 4
					} else {
						e = 3
					}
					break;
				case 3:
					i = (-h | 0) & 7;
					e = 4;
					break;
				case 4:
					e = c - i | 0;
					D[1311117] = f + i | 0;
					D[1311114] = e;
					D[(f + (i + 4 | 0) | 0) >> 2] = e | 1;
					D[(f + (c + 4 | 0) | 0) >> 2] = 40;
					D[1311118] = D[1310797];
					return;
				default:
					H(0, "bad label: " + e)
			}
		}
	}

	function et(d, c, e) {
		for (var f = 0, f = 2;;) {
			switch (f) {
				case 2:
					var h = d + 8 | 0;
					if (0 == (h & 7 | 0)) {
						var i = 0,
							f = 4
					} else {
						f = 3
					}
					break;
				case 3:
					i = (-h | 0) & 7;
					f = 4;
					break;
				case 4:
					var j = d + i | 0,
						l = c + 8 | 0;
					if (0 == (l & 7 | 0)) {
						var p = 0,
							f = 6
					} else {
						f = 5
					}
					break;
				case 5:
					p = (-l | 0) & 7;
					f = 6;
					break;
				case 6:
					var q = c + p | 0,
						m = q,
						k = i + e | 0,
						r = d + k | 0,
						t = r,
						v = (q - j | 0) - e | 0;
					D[(d + (i + 4 | 0) | 0) >> 2] = e | 3;
					f = (m | 0) == (D[1311117] | 0) ? 7 : 8;
					break;
				case 7:
					f = D[1311114] + v | 0;
					D[1311114] = f;
					D[1311117] = t;
					D[(d + (k + 4 | 0) | 0) >> 2] = f | 1;
					f = 76;
					break;
				case 8:
					f = (m | 0) == (D[1311116] | 0) ? 9 : 10;
					break;
				case 9:
					f = D[1311113] + v | 0;
					D[1311113] = f;
					D[1311116] = t;
					D[(d + (k + 4 | 0) | 0) >> 2] = f | 1;
					D[(d + (f + k | 0) | 0) >> 2] = f;
					f = 76;
					break;
				case 10:
					var u = D[(c + (p + 4 | 0) | 0) >> 2];
					if (1 == (u & 3 | 0)) {
						f = 11
					} else {
						var w = m,
							x = v,
							f = 53
					}
					break;
				case 11:
					var z = u & -8,
						C = u >>> 3,
						f = 256 > u >>> 0 ? 12 : 20;
					break;
				case 12:
					var A = D[(c + (p | 8) | 0) >> 2],
						y = D[(c + (p + 12 | 0) | 0) >> 2],
						f = (A | 0) == (y | 0) ? 13 : 14;
					break;
				case 13:
					D[1311111] &= 1 << C ^ -1;
					f = 52;
					break;
				case 14:
					var E = 5244484 + ((u >>> 2 & 1073741822) << 2) | 0,
						f = (A | 0) == (E | 0) ? 16 : 15;
					break;
				case 15:
					f = A >>> 0 < D[1311115] >>> 0 ? 19 : 16;
					break;
				case 16:
					f = (y | 0) == (E | 0) ? 18 : 17;
					break;
				case 17:
					f = y >>> 0 < D[1311115] >>> 0 ? 19 : 18;
					break;
				case 18:
					D[(A + 12 | 0) >> 2] = y;
					D[(y + 8 | 0) >> 2] = A;
					f = 52;
					break;
				case 19:
					O();
				case 20:
					var G = q,
						F = D[(c + (p | 24) | 0) >> 2],
						B = D[(c + (p + 12 | 0) | 0) >> 2],
						f = (B | 0) == (G | 0) ? 24 : 21;
					break;
				case 21:
					var J = D[(c + (p | 8) | 0) >> 2],
						f = J >>> 0 < D[1311115] >>> 0 ? 23 : 22;
					break;
				case 22:
					D[(J + 12 | 0) >> 2] = B;
					D[(B + 8 | 0) >> 2] = J;
					var N = B,
						f = 32;
					break;
				case 23:
					O();
				case 24:
					var V = p | 16,
						f = c + (V + 4 | 0) | 0,
						L = D[f >> 2];
					if (0 == (L | 0)) {
						f = 25
					} else {
						var da = f,
							Z = L,
							f = 26
					}
					break;
				case 25:
					f = c + V | 0;
					L = D[f >> 2];
					0 == (L | 0) ? (N = 0, f = 32) : (da = f, Z = L, f = 26);
					break;
				case 26:
					f = Z + 20 | 0;
					if (0 == (D[f >> 2] | 0)) {
						f = 27
					} else {
						var ea = f,
							f = 28
					}
					break;
				case 27:
					f = Z + 16 | 0;
					0 == (D[f >> 2] | 0) ? f = 29 : (ea = f, f = 28);
					break;
				case 28:
					Z = D[ea >> 2];
					da = ea;
					f = 26;
					break;
				case 29:
					f = da >>> 0 < D[1311115] >>> 0 ? 31 : 30;
					break;
				case 30:
					D[da >> 2] = 0;
					N = Z;
					f = 32;
					break;
				case 31:
					O();
				case 32:
					f = 0 == (F | 0) ? 52 : 33;
					break;
				case 33:
					var W = c + (p + 28 | 0) | 0,
						$ = 5244748 + (D[W >> 2] << 2) | 0,
						f = (G | 0) == (D[$ >> 2] | 0) ? 34 : 36;
					break;
				case 34:
					D[$ >> 2] = N;
					f = 0 == (N | 0) ? 35 : 42;
					break;
				case 35:
					D[1311112] &= 1 << D[W >> 2] ^ -1;
					f = 52;
					break;
				case 36:
					f = F >>> 0 < D[1311115] >>> 0 ? 40 : 37;
					break;
				case 37:
					var ha = F + 16 | 0,
						f = (D[ha >> 2] | 0) == (G | 0) ? 38 : 39;
					break;
				case 38:
					D[ha >> 2] = N;
					f = 41;
					break;
				case 39:
					D[(F + 20 | 0) >> 2] = N;
					f = 41;
					break;
				case 40:
					O();
				case 41:
					f = 0 == (N | 0) ? 52 : 42;
					break;
				case 42:
					f = N >>> 0 < D[1311115] >>> 0 ? 51 : 43;
					break;
				case 43:
					D[(N + 24 | 0) >> 2] = F;
					var ja = p | 16,
						Y = D[(c + ja | 0) >> 2],
						f = 0 == (Y | 0) ? 47 : 44;
					break;
				case 44:
					f = Y >>> 0 < D[1311115] >>> 0 ? 46 : 45;
					break;
				case 45:
					D[(N + 16 | 0) >> 2] = Y;
					D[(Y + 24 | 0) >> 2] = N;
					f = 47;
					break;
				case 46:
					O();
				case 47:
					var aa = D[(c + (ja + 4 | 0) | 0) >> 2],
						f = 0 == (aa | 0) ? 52 : 48;
					break;
				case 48:
					f = aa >>> 0 < D[1311115] >>> 0 ? 50 : 49;
					break;
				case 49:
					D[(N + 20 | 0) >> 2] = aa;
					D[(aa + 24 | 0) >> 2] = N;
					f = 52;
					break;
				case 50:
					O();
				case 51:
					O();
				case 52:
					x = z + v | 0;
					w = c + (z | p) | 0;
					f = 53;
					break;
				case 53:
					f = w + 4 | 0;
					D[f >> 2] &= -2;
					D[(d + (k + 4 | 0) | 0) >> 2] = x | 1;
					D[(d + (x + k | 0) | 0) >> 2] = x;
					f = 256 > x >>> 0 ? 54 : 59;
					break;
				case 54:
					var ia = x >>> 2 & 1073741822,
						ca = 5244484 + (ia << 2) | 0,
						ma = D[1311111],
						T = 1 << (x >>> 3),
						f = 0 == (ma & T | 0) ? 55 : 56;
					break;
				case 55:
					D[1311111] = ma | T;
					var Q = ca,
						f = 58;
					break;
				case 56:
					f = D[(5244484 + ((ia + 2 | 0) << 2) | 0) >> 2];
					f >>> 0 < D[1311115] >>> 0 ? f = 57 : (Q = f, f = 58);
					break;
				case 57:
					O();
				case 58:
					D[(5244484 + ((ia + 2 | 0) << 2) | 0) >> 2] = t;
					D[(Q + 12 | 0) >> 2] = t;
					D[(d + (k + 8 | 0) | 0) >> 2] = Q;
					D[(d + (k + 12 | 0) | 0) >> 2] = ca;
					f = 76;
					break;
				case 59:
					var fa = r,
						ta = x >>> 8;
					if (0 == (ta | 0)) {
						var P = 0,
							f = 62
					} else {
						f = 60
					}
					break;
				case 60:
					16777215 < x >>> 0 ? (P = 31, f = 62) : f = 61;
					break;
				case 61:
					var P = (ta + 1048320 | 0) >>> 16 & 8,
						L = ta << P,
						f = (L + 520192 | 0) >>> 16 & 4,
						L = L << f,
						qa = (L + 245760 | 0) >>> 16 & 2,
						P = (14 - (f | P | qa) | 0) + (L << qa >>> 15) | 0,
						P = x >>> ((P + 7 | 0) >>> 0) & 1 | P << 1,
						f = 62;
					break;
				case 62:
					var ua = 5244748 + (P << 2) | 0;
					D[(d + (k + 28 | 0) | 0) >> 2] = P;
					var ra = d + (k + 16 | 0) | 0;
					D[(d + (k + 20 | 0) | 0) >> 2] = 0;
					D[ra >> 2] = 0;
					var ra = D[1311112],
						sa = 1 << P,
						f = 0 == (ra & sa | 0) ? 63 : 64;
					break;
				case 63:
					D[1311112] = ra | sa;
					D[ua >> 2] = fa;
					D[(d + (k + 24 | 0) | 0) >> 2] = ua;
					D[(d + (k + 12 | 0) | 0) >> 2] = fa;
					D[(d + (k + 8 | 0) | 0) >> 2] = fa;
					f = 76;
					break;
				case 64:
					var Ca = D[ua >> 2];
					if (31 == (P | 0)) {
						var Ga = 0,
							f = 66
					} else {
						f = 65
					}
					break;
				case 65:
					Ga = 25 - (P >>> 1) | 0;
					f = 66;
					break;
				case 66:
					var Aa = x << Ga,
						ka = Ca,
						f = 67;
					break;
				case 67:
					f = (D[(ka + 4 | 0) >> 2] & -8 | 0) == (x | 0) ? 72 : 68;
					break;
				case 68:
					var lc = ka + 16 + (Aa >>> 31 << 2) | 0,
						f = D[lc >> 2],
						L = Aa << 1;
					0 == (f | 0) ? f = 69 : (Aa = L, ka = f, f = 67);
					break;
				case 69:
					f = lc >>> 0 < D[1311115] >>> 0 ? 71 : 70;
					break;
				case 70:
					D[lc >> 2] = fa;
					D[(d + (k + 24 | 0) | 0) >> 2] = ka;
					D[(d + (k + 12 | 0) | 0) >> 2] = fa;
					D[(d + (k + 8 | 0) | 0) >> 2] = fa;
					f = 76;
					break;
				case 71:
					O();
				case 72:
					var Ba = ka + 8 | 0,
						kd = D[Ba >> 2],
						ac = D[1311115],
						f = ka >>> 0 < ac >>> 0 ? 75 : 73;
					break;
				case 73:
					f = kd >>> 0 < ac >>> 0 ? 75 : 74;
					break;
				case 74:
					D[(kd + 12 | 0) >> 2] = fa;
					D[Ba >> 2] = fa;
					D[(d + (k + 8 | 0) | 0) >> 2] = kd;
					D[(d + (k + 12 | 0) | 0) >> 2] = ka;
					D[(d + (k + 24 | 0) | 0) >> 2] = 0;
					f = 76;
					break;
				case 75:
					O();
				case 76:
					return d + (i | 8) | 0;
				default:
					H(0, "bad label: " + f)
			}
		}
	}
	et.X = 1;

	function ul() {
		return 5244320
	}

	function wl() {
		return 5244364
	}

	function Jl(d, c, e) {
		for (var f = 0, f = 2;;) {
			switch (f) {
				case 2:
					if (0 == ((c ^ d) & 3 | 0)) {
						f = 3
					} else {
						var h = e,
							i = d,
							j = c,
							f = 9
					}
					break;
				case 3:
					f = 0 == (e | 0);
					if (0 == (d & 3 | 0) | f) {
						var l = c,
							p = d,
							q = e,
							m = f,
							f = 5
					} else {
						var k = c,
							r = d,
							t = e,
							f = 4
					}
					break;
				case 4:
					var f = k + 1 | 0,
						v = r + 1 | 0;
					s[r] = s[k];
					var u = t - 1 | 0,
						w = 0 == (u | 0);
					0 == (v & 3 | 0) | w ? (l = f, p = v, q = u, m = w, f = 5) : (k = f, r = v, t = u, f = 4);
					break;
				case 5:
					f = m ? 11 : 6;
					break;
				case 6:
					f = p;
					v = l;
					if (3 < q >>> 0) {
						var x = q,
							z = f,
							C = v,
							f = 7
					} else {
						var A = q,
							y = f,
							E = v,
							f = 8
					}
					break;
				case 7:
					f = C + 4 | 0;
					v = z + 4 | 0;
					D[z >> 2] = D[C >> 2];
					u = x - 4 | 0;
					3 < u >>> 0 ? (x = u, z = v, C = f, f = 7) : (A = u, y = v, E = f, f = 8);
					break;
				case 8:
					i = y;
					j = E;
					h = A;
					f = 9;
					break;
				case 9:
					if (0 == (h | 0)) {
						f = 11
					} else {
						var G = j,
							F = i,
							B = h,
							f = 10
					}
					break;
				case 10:
					f = G + 1 | 0;
					v = F + 1 | 0;
					s[F] = s[G];
					u = B - 1 | 0;
					0 == (u | 0) ? f = 11 : (G = f, F = v, B = u, f = 10);
					break;
				case 11:
					return d;
				default:
					H(0, "bad label: " + f)
			}
		}
	}
	Module._memcpy = Jl;
	Jl.X = 1;

	function tl() {}

	function it(d) {
		for (var c = 0, c = 2;;) {
			switch (c) {
				case 2:
					c = 0 == (d | 0) ? 4 : 3;
					break;
				case 3:
					gt(d);
					c = 4;
					break;
				case 4:
					return;
				default:
					H(0, "bad label: " + c)
			}
		}
	}

	function xl(d) {
		it(d)
	}

	function sl(d) {
		it(d)
	}

	function yl() {}

	function ft(d, c) {
		for (var e = 0, e = 2;;) {
			switch (e) {
				case 2:
					var f = D[1311117],
						h = f,
						i = ct(h),
						j = D[(i | 0) >> 2],
						i = D[(i + 4 | 0) >> 2],
						l = j + i | 0,
						p = j + (i - 39 | 0) | 0;
					if (0 == (p & 7 | 0)) {
						var q = 0,
							e = 4
					} else {
						e = 3
					}
					break;
				case 3:
					q = (-p | 0) & 7;
					e = 4;
					break;
				case 4:
					var m = j + ((i - 47 | 0) + q | 0) | 0,
						m = m >>> 0 < (f + 16 | 0) >>> 0 ? h : m,
						k = e = m + 8 | 0;
					dt(d, c - 40 | 0);
					D[(m + 4 | 0) >> 2] = 27;
					D[e >> 2] = D[1311222];
					D[e + 4 >> 2] = D[1311223];
					D[e + 8 >> 2] = D[1311224];
					D[e + 12 >> 2] = D[1311225];
					D[1311222] = d;
					D[1311223] = c;
					D[1311225] = 0;
					D[1311224] = k;
					e = m + 28 | 0;
					D[e >> 2] = 7;
					if ((m + 32 | 0) >>> 0 < l >>> 0) {
						var r = e,
							e = 5
					} else {
						e = 6
					}
					break;
				case 5:
					e = r + 4 | 0;
					D[e >> 2] = 7;
					(r + 8 | 0) >>> 0 < l >>> 0 ? (r = e, e = 5) : e = 6;
					break;
				case 6:
					e = (m | 0) == (h | 0) ? 30 : 7;
					break;
				case 7:
					var t = m - f | 0,
						e = h + t | 0,
						k = h + (t + 4 | 0) | 0;
					D[k >> 2] &= -2;
					D[(f + 4 | 0) >> 2] = t | 1;
					D[e >> 2] = t;
					e = 256 > t >>> 0 ? 8 : 13;
					break;
				case 8:
					var v = t >>> 2 & 1073741822,
						u = 5244484 + (v << 2) | 0,
						w = D[1311111],
						x = 1 << (t >>> 3),
						e = 0 == (w & x | 0) ? 9 : 10;
					break;
				case 9:
					D[1311111] = w | x;
					var z = u,
						e = 12;
					break;
				case 10:
					e = D[(5244484 + ((v + 2 | 0) << 2) | 0) >> 2];
					e >>> 0 < D[1311115] >>> 0 ? e = 11 : (z = e, e = 12);
					break;
				case 11:
					O();
				case 12:
					D[(5244484 + ((v + 2 | 0) << 2) | 0) >> 2] = f;
					D[(z + 12 | 0) >> 2] = f;
					D[(f + 8 | 0) >> 2] = z;
					D[(f + 12 | 0) >> 2] = u;
					e = 30;
					break;
				case 13:
					var C = f,
						A = t >>> 8;
					if (0 == (A | 0)) {
						var y = 0,
							e = 16
					} else {
						e = 14
					}
					break;
				case 14:
					16777215 < t >>> 0 ? (y = 31, e = 16) : e = 15;
					break;
				case 15:
					var y = (A + 1048320 | 0) >>> 16 & 8,
						k = A << y,
						e = (k + 520192 | 0) >>> 16 & 4,
						k = k << e,
						E = (k + 245760 | 0) >>> 16 & 2,
						y = (14 - (e | y | E) | 0) + (k << E >>> 15) | 0,
						y = t >>> ((y + 7 | 0) >>> 0) & 1 | y << 1,
						e = 16;
					break;
				case 16:
					var G = 5244748 + (y << 2) | 0;
					D[(f + 28 | 0) >> 2] = y;
					D[(f + 20 | 0) >> 2] = 0;
					D[(f + 16 | 0) >> 2] = 0;
					var F = D[1311112],
						B = 1 << y,
						e = 0 == (F & B | 0) ? 17 : 18;
					break;
				case 17:
					D[1311112] = F | B;
					D[G >> 2] = C;
					D[(f + 24 | 0) >> 2] = G;
					D[(f + 12 | 0) >> 2] = f;
					D[(f + 8 | 0) >> 2] = f;
					e = 30;
					break;
				case 18:
					var J = D[G >> 2];
					if (31 == (y | 0)) {
						var N = 0,
							e = 20
					} else {
						e = 19
					}
					break;
				case 19:
					N = 25 - (y >>> 1) | 0;
					e = 20;
					break;
				case 20:
					var V = t << N,
						L = J,
						e = 21;
					break;
				case 21:
					e = (D[(L + 4 | 0) >> 2] & -8 | 0) == (t | 0) ? 26 : 22;
					break;
				case 22:
					var da = L + 16 + (V >>> 31 << 2) | 0,
						e = D[da >> 2],
						k = V << 1;
					0 == (e | 0) ? e = 23 : (V = k, L = e, e = 21);
					break;
				case 23:
					e = da >>> 0 < D[1311115] >>> 0 ? 25 : 24;
					break;
				case 24:
					D[da >> 2] = C;
					D[(f + 24 | 0) >> 2] = L;
					D[(f + 12 | 0) >> 2] = f;
					D[(f + 8 | 0) >> 2] = f;
					e = 30;
					break;
				case 25:
					O();
				case 26:
					var Z = L + 8 | 0,
						ea = D[Z >> 2],
						W = D[1311115],
						e = L >>> 0 < W >>> 0 ? 29 : 27;
					break;
				case 27:
					e = ea >>> 0 < W >>> 0 ? 29 : 28;
					break;
				case 28:
					D[(ea + 12 | 0) >> 2] = C;
					D[Z >> 2] = C;
					D[(f + 8 | 0) >> 2] = ea;
					D[(f + 12 | 0) >> 2] = L;
					D[(f + 24 | 0) >> 2] = 0;
					e = 30;
					break;
				case 29:
					O();
				case 30:
					return;
				default:
					H(0, "bad label: " + e)
			}
		}
	}
	ft.X = 1;
	var R;

	function jt(d, c) {
		d != a && ("number" == typeof d ? this.k(d) : c == a && "string" != typeof d ? this.g(d, 256) : this.g(d, c))
	}

	function kt() {
		return new jt(a)
	}

	function lt(d, c) {
		var e = mt[d.charCodeAt(c)];
		return e == a ? -1 : e
	}

	function nt(d) {
		var c = kt();
		c.s(d);
		return c
	}

	function X(d, c) {
		this.d = d | 0;
		this.e = c | 0
	}
	X.Z = {};
	X.s = (function(d) {
		if (-128 <= d && 128 > d) {
			var c = X.Z[d];
			if (c) {
				return c
			}
		}
		c = new X(d | 0, 0 > d ? -1 : 0); - 128 <= d && 128 > d && (X.Z[d] = c);
		return c
	});
	X.k = (function(d) {
		return isNaN(d) || !isFinite(d) ? X.ZERO : d <= -X.aa ? X.MIN_VALUE : d + 1 >= X.aa ? X.MAX_VALUE : 0 > d ? X.k(-d).f() : new X(d % X.q | 0, d / X.q | 0)
	});
	X.o = (function(d, c) {
		return new X(d, c)
	});
	X.g = (function(d, c) {
		0 == d.length && ba(Error("number format error: empty string"));
		var e = c || 10;
		(2 > e || 36 < e) && ba(Error("radix out of range: " + e));
		if ("-" == d.charAt(0)) {
			return X.g(d.substring(1), e).f()
		}
		0 <= d.indexOf("-") && ba(Error('number format error: interior "-" character: ' + d));
		for (var f = X.k(Math.pow(e, 8)), h = X.ZERO, i = 0; i < d.length; i += 8) {
			var j = Math.min(8, d.length - i),
				l = parseInt(d.substring(i, i + j), e);
			8 > j ? (j = X.k(Math.pow(e, j)), h = h.multiply(j).add(X.k(l))) : (h = h.multiply(f), h = h.add(X.k(l)))
		}
		return h
	});
	X.L = 65536;
	X.Oa = 16777216;
	X.q = X.L * X.L;
	X.Pa = X.q / 2;
	X.Qa = X.q * X.L;
	X.va = X.q * X.q;
	X.aa = X.va / 2;
	X.ZERO = X.s(0);
	X.ONE = X.s(1);
	X.$ = X.s(-1);
	X.MAX_VALUE = X.o(-1, 2147483647);
	X.MIN_VALUE = X.o(0, -2147483648);
	X.ua = X.s(16777216);
	g = X.prototype;
	g.J = (function() {
		return this.e * X.q + this.Aa()
	});
	g.toString = (function(d) {
		d = d || 10;
		(2 > d || 36 < d) && ba(Error("radix out of range: " + d));
		if (this.t()) {
			return "0"
		}
		if (this.h()) {
			if (this.j(X.MIN_VALUE)) {
				var c = X.k(d),
					e = this.n(c),
					c = e.multiply(c).p(this);
				return e.toString(d) + c.d.toString(d)
			}
			return "-" + this.f().toString(d)
		}
		for (var e = X.k(Math.pow(d, 6)), c = this, f = "";;) {
			var h = c.n(e),
				i = c.p(h.multiply(e)).d.toString(d),
				c = h;
			if (c.t()) {
				return i + f
			}
			for (; 6 > i.length;) {
				i = "0" + i
			}
			f = "" + i + f
		}
	});
	g.Aa = (function() {
		return 0 <= this.d ? this.d : X.q + this.d
	});
	g.t = (function() {
		return 0 == this.e && 0 == this.d
	});
	g.h = (function() {
		return 0 > this.e
	});
	g.ga = (function() {
		return 1 == (this.d & 1)
	});
	g.j = (function(d) {
		return this.e == d.e && this.d == d.d
	});
	g.la = (function() {
		return 0 > this.Q(X.ua)
	});
	g.Ba = (function(d) {
		return 0 < this.Q(d)
	});
	g.Ca = (function(d) {
		return 0 <= this.Q(d)
	});
	g.Q = (function(d) {
		if (this.j(d)) {
			return 0
		}
		var c = this.h(),
			e = d.h();
		return c && !e ? -1 : !c && e ? 1 : this.p(d).h() ? -1 : 1
	});
	g.f = (function() {
		return this.j(X.MIN_VALUE) ? X.MIN_VALUE : this.Ga().add(X.ONE)
	});
	g.add = (function(d) {
		var c = this.e >>> 16,
			e = this.e & 65535,
			f = this.d >>> 16,
			h = d.e >>> 16,
			i = d.e & 65535,
			j = d.d >>> 16,
			l;
		l = 0 + ((this.d & 65535) + (d.d & 65535));
		d = 0 + (l >>> 16);
		d += f + j;
		f = 0 + (d >>> 16);
		f += e + i;
		e = 0 + (f >>> 16);
		e = e + (c + h) & 65535;
		return X.o((d & 65535) << 16 | l & 65535, e << 16 | f & 65535)
	});
	g.p = (function(d) {
		return this.add(d.f())
	});
	g.multiply = (function(d) {
		if (this.t() || d.t()) {
			return X.ZERO
		}
		if (this.j(X.MIN_VALUE)) {
			return d.ga() ? X.MIN_VALUE : X.ZERO
		}
		if (d.j(X.MIN_VALUE)) {
			return this.ga() ? X.MIN_VALUE : X.ZERO
		}
		if (this.h()) {
			return d.h() ? this.f().multiply(d.f()) : this.f().multiply(d).f()
		}
		if (d.h()) {
			return this.multiply(d.f()).f()
		}
		if (this.la() && d.la()) {
			return X.k(this.J() * d.J())
		}
		var c = this.e >>> 16,
			e = this.e & 65535,
			f = this.d >>> 16,
			h = this.d & 65535,
			i = d.e >>> 16,
			j = d.e & 65535,
			l = d.d >>> 16,
			d = d.d & 65535,
			p, q, m, k;
		k = 0 + h * d;
		m = 0 + (k >>> 16);
		m += f * d;
		q = 0 + (m >>> 16);
		m = (m & 65535) + h * l;
		q += m >>> 16;
		m &= 65535;
		q += e * d;
		p = 0 + (q >>> 16);
		q = (q & 65535) + f * l;
		p += q >>> 16;
		q &= 65535;
		q += h * j;
		p += q >>> 16;
		q &= 65535;
		p = p + (c * d + e * l + f * j + h * i) & 65535;
		return X.o(m << 16 | k & 65535, p << 16 | q)
	});
	g.n = (function(d) {
		d.t() && ba(Error("division by zero"));
		if (this.t()) {
			return X.ZERO
		}
		if (this.j(X.MIN_VALUE)) {
			if (d.j(X.ONE) || d.j(X.$)) {
				return X.MIN_VALUE
			}
			if (d.j(X.MIN_VALUE)) {
				return X.ONE
			}
			var c = this.Ma().n(d).shiftLeft(1);
			if (c.j(X.ZERO)) {
				return d.h() ? X.ONE : X.$
			}
			var e = this.p(d.multiply(c));
			return c.add(e.n(d))
		}
		if (d.j(X.MIN_VALUE)) {
			return X.ZERO
		}
		if (this.h()) {
			return d.h() ? this.f().n(d.f()) : this.f().n(d).f()
		}
		if (d.h()) {
			return this.n(d.f()).f()
		}
		for (var f = X.ZERO, e = this; e.Ca(d);) {
			for (var c = Math.max(1, Math.floor(e.J() / d.J())), h = Math.ceil(Math.log(c) / Math.LN2), h = 48 >= h ? 1 : Math.pow(2, h - 48), i = X.k(c), j = i.multiply(d); j.h() || j.Ba(e);) {
				c -= h, i = X.k(c), j = i.multiply(d)
			}
			i.t() && (i = X.ONE);
			f = f.add(i);
			e = e.p(j)
		}
		return f
	});
	g.ma = (function(d) {
		return this.p(this.n(d).multiply(d))
	});
	g.Ga = (function() {
		return X.o(~this.d, ~this.e)
	});
	g.shiftLeft = (function(d) {
		d &= 63;
		if (0 == d) {
			return this
		}
		var c = this.d;
		return 32 > d ? X.o(c << d, this.e << d | c >>> 32 - d) : X.o(0, c << d - 32)
	});
	g.Ma = (function() {
		var d;
		d = 1;
		if (0 == d) {
			return this
		}
		var c = this.e;
		return 32 > d ? X.o(this.d >>> d | c << 32 - d, c >> d) : X.o(c >> d - 32, 0 <= c ? 0 : -1)
	});
	g = jt.prototype;
	g.N = (function(d, c, e, f) {
		for (var h = 0, i = 0; 0 <= --f;) {
			var j = d * this[h++] + c[e] + i,
				i = Math.floor(j / 67108864);
			c[e++] = j & 67108863
		}
		return i
	});
	g.c = 26;
	g.m = 67108863;
	g.z = 67108864;
	g.ta = Math.pow(2, 52);
	g.W = 26;
	g.Y = 0;
	var mt = [],
		ot, pt;
	ot = 48;
	for (pt = 0; 9 >= pt; ++pt) {
		mt[ot++] = pt
	}
	ot = 97;
	for (pt = 10; 36 > pt; ++pt) {
		mt[ot++] = pt
	}
	ot = 65;
	for (pt = 10; 36 > pt; ++pt) {
		mt[ot++] = pt
	}
	g = jt.prototype;
	g.copyTo = (function(d) {
		for (var c = this.a - 1; 0 <= c; --c) {
			d[c] = this[c]
		}
		d.a = this.a;
		d.b = this.b
	});
	g.s = (function(d) {
		this.a = 1;
		this.b = 0 > d ? -1 : 0;
		0 < d ? this[0] = d : -1 > d ? this[0] = d + DV : this.a = 0
	});
	g.g = (function(d, c) {
		var e;
		if (16 == c) {
			e = 4
		} else {
			if (8 == c) {
				e = 3
			} else {
				if (256 == c) {
					e = 8
				} else {
					if (2 == c) {
						e = 1
					} else {
						if (32 == c) {
							e = 5
						} else {
							if (4 == c) {
								e = 2
							} else {
								this.za(d, c);
								return
							}
						}
					}
				}
			}
		}
		this.b = this.a = 0;
		for (var f = d.length, h = b, i = 0; 0 <= --f;) {
			var j = 8 == e ? d[f] & 255 : lt(d, f);
			0 > j ? "-" == d.charAt(f) && (h = la) : (h = b, 0 == i ? this[this.a++] = j : i + e > this.c ? (this[this.a - 1] |= (j & (1 << this.c - i) - 1) << i, this[this.a++] = j >> this.c - i) : this[this.a - 1] |= j << i, i += e, i >= this.c && (i -= this.c))
		}
		8 == e && 0 != (d[0] & 128) && (this.b = -1, 0 < i && (this[this.a - 1] |= (1 << this.c - i) - 1 << i));
		this.r();
		h && jt.ZERO.l(this, this)
	});
	g.r = (function() {
		for (var d = this.b & this.m; 0 < this.a && this[this.a - 1] == d;) {
			--this.a
		}
	});
	g.R = (function(d, c) {
		var e;
		for (e = this.a - 1; 0 <= e; --e) {
			c[e + d] = this[e]
		}
		for (e = d - 1; 0 <= e; --e) {
			c[e] = 0
		}
		c.a = this.a + d;
		c.b = this.b
	});
	g.xa = (function(d, c) {
		for (var e = d; e < this.a; ++e) {
			c[e - d] = this[e]
		}
		c.a = Math.max(this.a - d, 0);
		c.b = this.b
	});
	g.ka = (function(d, c) {
		var e = d % this.c,
			f = this.c - e,
			h = (1 << f) - 1,
			i = Math.floor(d / this.c),
			j = this.b << e & this.m,
			l;
		for (l = this.a - 1; 0 <= l; --l) {
			c[l + i + 1] = this[l] >> f | j, j = (this[l] & h) << e
		}
		for (l = i - 1; 0 <= l; --l) {
			c[l] = 0
		}
		c[i] = j;
		c.a = this.a + i + 1;
		c.b = this.b;
		c.r()
	});
	g.Ia = (function(d, c) {
		c.b = this.b;
		var e = Math.floor(d / this.c);
		if (e >= this.a) {
			c.a = 0
		} else {
			var f = d % this.c,
				h = this.c - f,
				i = (1 << f) - 1;
			c[0] = this[e] >> f;
			for (var j = e + 1; j < this.a; ++j) {
				c[j - e - 1] |= (this[j] & i) << h, c[j - e] = this[j] >> f
			}
			0 < f && (c[this.a - e - 1] |= (this.b & i) << h);
			c.a = this.a - e;
			c.r()
		}
	});
	g.l = (function(d, c) {
		for (var e = 0, f = 0, h = Math.min(d.a, this.a); e < h;) {
			f += this[e] - d[e], c[e++] = f & this.m, f >>= this.c
		}
		if (d.a < this.a) {
			for (f -= d.b; e < this.a;) {
				f += this[e], c[e++] = f & this.m, f >>= this.c
			}
			f += this.b
		} else {
			for (f += this.b; e < d.a;) {
				f -= d[e], c[e++] = f & this.m, f >>= this.c
			}
			f -= d.b
		}
		c.b = 0 > f ? -1 : 0; - 1 > f ? c[e++] = this.z + f : 0 < f && (c[e++] = f);
		c.a = e;
		c.r()
	});
	g.Fa = (function(d) {
		var c = lQ.K,
			e = this.abs(),
			f = c.abs(),
			h = e.a;
		for (d.a = h + f.a; 0 <= --h;) {
			d[h] = 0
		}
		for (h = 0; h < f.a; ++h) {
			d[h + e.a] = e.N(f[h], d, h, e.a)
		}
		d.b = 0;
		d.r();
		this.b != c.b && jt.ZERO.l(d, d)
	});
	g.v = (function(d, c, e) {
		var f = d.abs();
		if (!(0 >= f.a)) {
			var h = this.abs();
			if (h.a < f.a) {
				c != a && c.s(0), e != a && this.copyTo(e)
			} else {
				e == a && (e = kt());
				var i = kt(),
					j = this.b,
					d = d.b,
					l = f[f.a - 1],
					p = 1,
					q;
				if (0 != (q = l >>> 16)) {
					l = q, p += 16
				}
				if (0 != (q = l >> 8)) {
					l = q, p += 8
				}
				if (0 != (q = l >> 4)) {
					l = q, p += 4
				}
				if (0 != (q = l >> 2)) {
					l = q, p += 2
				}
				0 != l >> 1 && (p += 1);
				l = this.c - p;
				0 < l ? (f.ka(l, i), h.ka(l, e)) : (f.copyTo(i), h.copyTo(e));
				f = i.a;
				h = i[f - 1];
				if (0 != h) {
					q = h * (1 << this.W) + (1 < f ? i[f - 2] >> this.Y : 0);
					p = this.ta / q;
					q = (1 << this.W) / q;
					var m = 1 << this.Y,
						k = e.a,
						r = k - f,
						t = c == a ? kt() : c;
					i.R(r, t);
					0 <= e.D(t) && (e[e.a++] = 1, e.l(t, e));
					jt.ONE.R(f, t);
					for (t.l(i, i); i.a < f;) {
						i[i.a++] = 0
					}
					for (; 0 <= --r;) {
						var v = e[--k] == h ? this.m : Math.floor(e[k] * p + (e[k - 1] + m) * q);
						if ((e[k] += i.N(v, e, r, f)) < v) {
							i.R(r, t);
							for (e.l(t, e); e[k] < --v;) {
								e.l(t, e)
							}
						}
					}
					c != a && (e.xa(f, c), j != d && jt.ZERO.l(c, c));
					e.a = f;
					e.r();
					0 < l && e.Ia(l, e);
					0 > j && jt.ZERO.l(e, e)
				}
			}
		}
	});
	g.toString = (function(d) {
		if (0 > this.b) {
			return "-" + this.f().toString(d)
		}
		if (16 == d) {
			d = 4
		} else {
			if (8 == d) {
				d = 3
			} else {
				if (2 == d) {
					d = 1
				} else {
					if (32 == d) {
						d = 5
					} else {
						if (4 == d) {
							d = 2
						} else {
							return this.Na(d)
						}
					}
				}
			}
		}
		var c = (1 << d) - 1,
			e, f = b,
			h = "",
			i = this.a,
			j = this.c - i * this.c % d;
		if (0 < i--) {
			if (j < this.c && 0 < (e = this[i] >> j)) {
				f = la, h = "0123456789abcdefghijklmnopqrstuvwxyz".charAt(e)
			}
			for (; 0 <= i;) {
				j < d ? (e = (this[i] & (1 << j) - 1) << d - j, e |= this[--i] >> (j += this.c - d)) : (e = this[i] >> (j -= d) & c, 0 >= j && (j += this.c, --i)), 0 < e && (f = la), f && (h += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(e))
			}
		}
		return f ? h : "0"
	});
	g.f = (function() {
		var d = kt();
		jt.ZERO.l(this, d);
		return d
	});
	g.abs = (function() {
		return 0 > this.b ? this.f() : this
	});
	g.D = (function(d) {
		var c = this.b - d.b;
		if (0 != c) {
			return c
		}
		var e = this.a,
			c = e - d.a;
		if (0 != c) {
			return 0 > this.b ? -c : c
		}
		for (; 0 <= --e;) {
			if (0 != (c = this[e] - d[e])) {
				return c
			}
		}
		return 0
	});
	jt.ZERO = nt(0);
	jt.ONE = nt(1);
	g = jt.prototype;
	g.za = (function(d, c) {
		this.s(0);
		c == a && (c = 10);
		for (var e = this.A(c), f = Math.pow(c, e), h = b, i = 0, j = 0, l = 0; l < d.length; ++l) {
			var p = lt(d, l);
			0 > p ? "-" == d.charAt(l) && 0 == this.U() && (h = la) : (j = c * j + p, ++i >= e && (this.ca(f), this.ba(j), j = i = 0))
		}
		0 < i && (this.ca(Math.pow(c, i)), this.ba(j));
		h && jt.ZERO.l(this, this)
	});
	g.A = (function(d) {
		return Math.floor(Math.LN2 * this.c / Math.log(d))
	});
	g.U = (function() {
		return 0 > this.b ? -1 : 0 >= this.a || 1 == this.a && 0 >= this[0] ? 0 : 1
	});
	g.ca = (function(d) {
		this[this.a] = this.N(d - 1, this, 0, this.a);
		++this.a;
		this.r()
	});
	g.ba = (function(d) {
		var c = 0;
		if (0 != d) {
			for (; this.a <= c;) {
				this[this.a++] = 0
			}
			for (this[c] += d; this[c] >= this.z;) {
				this[c] -= this.z, ++c >= this.a && (this[this.a++] = 0), ++this[c]
			}
		}
	});
	g.Na = (function(d) {
		d == a && (d = 10);
		if (0 == this.U() || 2 > d || 36 < d) {
			return "0"
		}
		var c = this.A(d),
			c = Math.pow(d, c),
			e = nt(c),
			f = kt(),
			h = kt(),
			i = "";
		for (this.v(e, f, h); 0 < f.U();) {
			i = (c + h.ea()).toString(d).substr(1) + i, f.v(e, f, h)
		}
		return h.ea().toString(d) + i
	});
	g.ea = (function() {
		if (0 > this.b) {
			if (1 == this.a) {
				return this[0] - this.z
			}
			if (0 == this.a) {
				return -1
			}
		} else {
			if (1 == this.a) {
				return this[0]
			}
			if (0 == this.a) {
				return 0
			}
		}
		return (this[1] & (1 << 32 - this.c) - 1) << this.c | this[0]
	});
	g.M = (function(d, c) {
		for (var e = 0, f = 0, h = Math.min(d.a, this.a); e < h;) {
			f += this[e] + d[e], c[e++] = f & this.m, f >>= this.c
		}
		if (d.a < this.a) {
			for (f += d.b; e < this.a;) {
				f += this[e], c[e++] = f & this.m, f >>= this.c
			}
			f += this.b
		} else {
			for (f += this.b; e < d.a;) {
				f += d[e], c[e++] = f & this.m, f >>= this.c
			}
			f += d.b
		}
		c.b = 0 > f ? -1 : 0;
		0 < f ? c[e++] = f : -1 > f && (c[e++] = this.z + f);
		c.a = e;
		c.r()
	});
	var lQ = {
		add: (function(d, c, e, f) {
			d = (new X(d, c)).add(new X(e, f));
			D[I >> 2] = d.d;
			D[I + 4 >> 2] = d.e
		}),
		p: (function(d, c, e, f) {
			d = (new X(d, c)).p(new X(e, f));
			D[I >> 2] = d.d;
			D[I + 4 >> 2] = d.e
		}),
		multiply: (function(d, c, e, f) {
			d = (new X(d, c)).multiply(new X(e, f));
			D[I >> 2] = d.d;
			D[I + 4 >> 2] = d.e
		}),
		F: (function() {
			lQ.ya || (lQ.ya = la, lQ.K = new jt, lQ.K.g("4294967296", 10), lQ.V = new jt, lQ.V.g("18446744073709551616", 10), lQ.Va = new jt, lQ.Wa = new jt)
		}),
		G: (function(d, c) {
			var e = new jt;
			e.g(c.toString(), 10);
			var f = new jt;
			e.Fa(f);
			e = new jt;
			e.g(d.toString(), 10);
			var h = new jt;
			e.M(f, h);
			return h
		}),
		Ra: (function(d, c, e, f, h) {
			lQ.F();
			h ? (d = lQ.G(d >>> 0, c >>> 0), f = lQ.G(e >>> 0, f >>> 0), e = new jt, d.v(f, e, a), f = new jt, d = new jt, e.v(lQ.K, d, f), D[I >> 2] = parseInt(f.toString()) | 0, D[I + 4 >> 2] = parseInt(d.toString()) | 0) : (d = new X(d, c), f = new X(e, f), e = d.n(f), D[I >> 2] = e.d, D[I + 4 >> 2] = e.e)
		}),
		ma: (function(d, c, e, f, h) {
			lQ.F();
			h ? (d = lQ.G(d >>> 0, c >>> 0), f = lQ.G(e >>> 0, f >>> 0), e = new jt, d.v(f, a, e), f = new jt, d = new jt, e.v(lQ.K, d, f), D[I >> 2] = parseInt(f.toString()) | 0, D[I + 4 >> 2] = parseInt(d.toString()) | 0) : (d = new X(d, c), f = new X(e, f), e = d.ma(f), D[I >> 2] = e.d, D[I + 4 >> 2] = e.e)
		}),
		stringify: (function(d, c, e) {
			d = (new X(d, c)).toString();
			e && "-" == d[0] && (lQ.F(), e = new jt, e.g(d, 10), d = new jt, lQ.V.M(e, d), d = d.toString(10));
			return d
		}),
		g: (function(d, c, e, f, h) {
			lQ.F();
			var i = new jt;
			i.g(d, c);
			d = new jt;
			d.g(e, 10);
			e = new jt;
			e.g(f, 10);
			h && 0 > i.D(jt.ZERO) && (f = new jt, i.M(lQ.V, f), i = f);
			f = b;
			0 > i.D(d) ? (i = d, f = la) : 0 < i.D(e) && (i = e, f = la);
			i = X.g(i.toString());
			D[I >> 2] = i.d;
			D[I + 4 >> 2] = i.e;
			f && ba("range error")
		})
	};
	R = lQ;
	Module.wa = (function(d) {
		function c() {
			for (var c = 0; 3 > c; c++) {
				f.push(0)
			}
		}
		var e = d.length + 1,
			f = [M(xk("/bin/this.program"), "i8", gk)];
		c();
		for (var h = 0; h < e - 1; h += 1) {
			f.push(M(xk(d[h]), "i8", gk)), c()
		}
		f.push(0);
		f = M(f, "i32", gk);
		return Module._main(e, f, 0)
	});

	function Lk(d) {
		function c() {
			var c = 0;
			Gk = la;
			Module._main && (yk(Bk), c = Module.wa(d), Module.noExitRuntime || yk(Ck));
			if (Module.postRun) {
				for ("function" == typeof Module.postRun && (Module.postRun = [Module.postRun]); 0 < Module.postRun.length;) {
					Module.postRun.pop()()
				}
			}
			return c
		}
		d = d || Module.arguments;
		if (0 < Dk) {
			return Module.u("run() called, but dependencies remain, so not running"), 0
		}
		if (Module.preRun) {
			"function" == typeof Module.preRun && (Module.preRun = [Module.preRun]);
			var e = Module.preRun;
			Module.preRun = [];
			for (var f = e.length - 1; 0 <= f; f--) {
				e[f]()
			}
			if (0 < Dk) {
				return 0
			}
		}
		return Module.setStatus ? (Module.setStatus("Running..."), setTimeout((function() {
			setTimeout((function() {
				Module.setStatus("")
			}), 1);
			c()
		}), 1), 0) : c()
	}
	Module.run = Module.Ua = Lk;
	if (Module.preInit) {
		for ("function" == typeof Module.preInit && (Module.preInit = [Module.preInit]); 0 < Module.preInit.length;) {
			Module.preInit.pop()()
		}
	}
	yk(Ak);
	var Kk = la;
	Module.noInitialRun && (Kk = b);
	Kk && Lk();
	Module._crypto_auth_hmacsha256_BYTES = 32;
	Module._crypto_core_salsa2012_INPUTBYTES = 16;
	Module._crypto_box_curve25519xsalsa20poly1305_ZEROBYTES = 32;
	Module._crypto_core_salsa20_KEYBYTES = 32;
	Module._crypto_core_hsalsa20_OUTPUTBYTES = 32;
	Module._crypto_sign_edwards25519sha512batch_PUBLICKEYBYTES = 32;
	Module._crypto_secretbox_xsalsa20poly1305_ZEROBYTES = 32;
	Module._crypto_stream_salsa2012_NONCEBYTES = 8;
	Module._crypto_scalarmult_curve25519_SCALARBYTES = 32;
	Module._crypto_sign_edwards25519sha512batch_BYTES = 64;
	Module._crypto_auth_hmacsha512256_BYTES = 32;
	Module._crypto_core_salsa208_INPUTBYTES = 16;
	Module._crypto_stream_xsalsa20_KEYBYTES = 32;
	Module._crypto_stream_salsa2012_KEYBYTES = 32;
	Module._crypto_stream_salsa20_KEYBYTES = 32;
	Module._crypto_secretbox_xsalsa20poly1305_BOXZEROBYTES = 16;
	Module._crypto_core_salsa20_INPUTBYTES = 16;
	Module._crypto_hashblocks_sha256_BLOCKBYTES = 64;
	Module._crypto_onetimeauth_poly1305_KEYBYTES = 32;
	Module._crypto_auth_hmacsha512256_KEYBYTES = 32;
	Module._crypto_hash_sha256_BYTES = 32;
	Module._crypto_box_curve25519xsalsa20poly1305_BEFORENMBYTES = 32;
	Module._crypto_box_curve25519xsalsa20poly1305_PUBLICKEYBYTES = 32;
	Module._crypto_stream_salsa208_NONCEBYTES = 8;
	Module._crypto_scalarmult_curve25519_BYTES = 32;
	Module._crypto_hashblocks_sha512_STATEBYTES = 64;
	Module._crypto_stream_salsa20_NONCEBYTES = 8;
	Module._crypto_sign_edwards25519sha512batch_SECRETKEYBYTES = 64;
	Module._crypto_core_salsa208_OUTPUTBYTES = 64;
	Module._crypto_core_hsalsa20_INPUTBYTES = 16;
	Module._crypto_stream_aes128ctr_BEFORENMBYTES = 1408;
	Module._crypto_auth_hmacsha256_KEYBYTES = 32;
	Module._crypto_verify_32_BYTES = 32;
	Module._crypto_verify_16_BYTES = 16;
	Module._crypto_box_curve25519xsalsa20poly1305_NONCEBYTES = 24;
	Module._crypto_core_salsa2012_KEYBYTES = 32;
	Module._crypto_box_curve25519xsalsa20poly1305_BOXZEROBYTES = 16;
	Module._crypto_hashblocks_sha256_STATEBYTES = 32;
	Module._crypto_secretbox_xsalsa20poly1305_KEYBYTES = 32;
	Module._crypto_stream_xsalsa20_NONCEBYTES = 24;
	Module._crypto_onetimeauth_poly1305_BYTES = 16;
	Module._crypto_box_curve25519xsalsa20poly1305_SECRETKEYBYTES = 32;
	Module._crypto_hash_sha512_BYTES = 64;
	Module._crypto_core_salsa20_CONSTBYTES = 16;
	Module._crypto_core_salsa2012_CONSTBYTES = 16;
	Module._crypto_core_salsa2012_OUTPUTBYTES = 64;
	Module._crypto_core_salsa20_OUTPUTBYTES = 64;
	Module._crypto_core_hsalsa20_CONSTBYTES = 16;
	Module._crypto_stream_salsa208_KEYBYTES = 32;
	Module._crypto_stream_aes128ctr_NONCEBYTES = 16;
	Module._crypto_core_salsa208_CONSTBYTES = 16;
	Module._crypto_stream_aes128ctr_KEYBYTES = 16;
	Module._crypto_core_hsalsa20_KEYBYTES = 32;
	Module._crypto_secretbox_xsalsa20poly1305_NONCEBYTES = 24;
	Module._crypto_core_salsa208_KEYBYTES = 32;
	Module._crypto_hashblocks_sha512_BLOCKBYTES = 128;
	Module._crypto_hash_BYTES = Module._crypto_hash_sha512_BYTES;
	Module._crypto_sign = Module._crypto_sign_edwards25519sha512batch;
	Module._crypto_stream_xor_afternm = Module._crypto_stream_xsalsa20_xor_afternm;
	Module._crypto_box_PUBLICKEYBYTES = Module._crypto_box_curve25519xsalsa20poly1305_PUBLICKEYBYTES;
	Module._crypto_box_SECRETKEYBYTES = Module._crypto_box_curve25519xsalsa20poly1305_SECRETKEYBYTES;
	Module._crypto_box_open_afternm = Module._crypto_box_curve25519xsalsa20poly1305_open_afternm;
	Module._crypto_sign_SECRETKEYBYTES = Module._crypto_sign_edwards25519sha512batch_SECRETKEYBYTES;
	Module._crypto_box_beforenm = Module._crypto_box_curve25519xsalsa20poly1305_beforenm;
	Module._crypto_secretbox = Module._crypto_secretbox_xsalsa20poly1305;
	Module._crypto_hash = Module._crypto_hash_sha512;
	Module._crypto_sign_PUBLICKEYBYTES = Module._crypto_sign_edwards25519sha512batch_PUBLICKEYBYTES;
	Module._crypto_stream_xor = Module._crypto_stream_xsalsa20_xor;
	Module._crypto_box = Module._crypto_box_curve25519xsalsa20poly1305;
	Module._crypto_secretbox_ZEROBYTES = Module._crypto_secretbox_xsalsa20poly1305_ZEROBYTES;
	Module._crypto_box_ZEROBYTES = Module._crypto_box_curve25519xsalsa20poly1305_ZEROBYTES;
	Module._crypto_secretbox_KEYBYTES = Module._crypto_secretbox_xsalsa20poly1305_KEYBYTES;
	Module._crypto_stream_beforenm = Module._crypto_stream_xsalsa20_beforenm;
	Module._crypto_onetimeauth_verify = Module._crypto_onetimeauth_poly1305_verify;
	Module._crypto_box_BOXZEROBYTES = Module._crypto_box_curve25519xsalsa20poly1305_BOXZEROBYTES;
	Module._crypto_hashblocks = Module._crypto_hashblocks_sha512;
	Module._crypto_stream = Module._crypto_stream_xsalsa20;
	Module._crypto_onetimeauth_KEYBYTES = Module._crypto_onetimeauth_poly1305_KEYBYTES;
	Module._crypto_box_afternm = Module._crypto_box_curve25519xsalsa20poly1305_afternm;
	Module._crypto_secretbox_BOXZEROBYTES = Module._crypto_secretbox_xsalsa20poly1305_BOXZEROBYTES;
	Module._crypto_hashblocks_BLOCKBYTES = Module._crypto_hashblocks_sha512_BLOCKBYTES;
	Module._crypto_box_keypair = Module._crypto_box_curve25519xsalsa20poly1305_keypair;
	Module._crypto_auth = Module._crypto_auth_hmacsha512256;
	Module._crypto_box_BEFORENMBYTES = Module._crypto_box_curve25519xsalsa20poly1305_BEFORENMBYTES;
	Module._crypto_secretbox_NONCEBYTES = Module._crypto_secretbox_xsalsa20poly1305_NONCEBYTES;
	Module._crypto_stream_KEYBYTES = Module._crypto_stream_xsalsa20_KEYBYTES;
	Module._crypto_box_NONCEBYTES = Module._crypto_box_curve25519xsalsa20poly1305_NONCEBYTES;
	Module._crypto_auth_verify = Module._crypto_auth_hmacsha512256_verify;
	Module._crypto_secretbox_open = Module._crypto_secretbox_xsalsa20poly1305_open;
	Module._crypto_sign_BYTES = Module._crypto_sign_edwards25519sha512batch_BYTES;
	Module._crypto_hashblocks_STATEBYTES = Module._crypto_hashblocks_sha512_STATEBYTES;
	Module._crypto_auth_BYTES = Module._crypto_auth_hmacsha512256_BYTES;
	Module._crypto_stream_BEFORENMBYTES = Module._crypto_stream_xsalsa20_BEFORENMBYTES;
	Module._crypto_auth_KEYBYTES = Module._crypto_auth_hmacsha512256_KEYBYTES;
	Module._crypto_stream_afternm = Module._crypto_stream_xsalsa20_afternm;
	Module._crypto_sign_keypair = Module._crypto_sign_edwards25519sha512batch_keypair;
	Module._crypto_sign_open = Module._crypto_sign_edwards25519sha512batch_open;
	Module._crypto_onetimeauth_BYTES = Module._crypto_onetimeauth_poly1305_BYTES;
	Module._crypto_box_open = Module._crypto_box_curve25519xsalsa20poly1305_open;
	Module._crypto_stream_NONCEBYTES = Module._crypto_stream_xsalsa20_NONCEBYTES;
	Module._crypto_onetimeauth = Module._crypto_onetimeauth_poly1305



	var nacl = (function() {
		var exports = {};

		//---------------------------------------------------------------------------
		// Horrifying UTF-8 and hex codecs

		function encode_utf8(s) {
			return encode_latin1(unescape(encodeURIComponent(s)));
		}

		function encode_latin1(s) {
			var result = new Uint8Array(s.length);
			for (var i = 0; i < s.length; i++) {
				var c = s.charCodeAt(i);
				if ((c & 0xff) !== c) throw {
					message: "Cannot encode string in Latin1",
					str: s
				};
				result[i] = (c & 0xff);
			}
			return result;
		}

		function decode_utf8(bs) {
			return decodeURIComponent(escape(decode_latin1(bs)));
		}

		function decode_latin1(bs) {
			var encoded = [];
			for (var i = 0; i < bs.length; i++) {
				encoded.push(String.fromCharCode(bs[i]));
			}
			return encoded.join('');
		}

		function to_hex(bs) {
			var encoded = [];
			for (var i = 0; i < bs.length; i++) {
				encoded.push("0123456789abcdef" [(bs[i] >> 4) & 15]);
				encoded.push("0123456789abcdef" [bs[i] & 15]);
			}
			return encoded.join('');
		}

		//---------------------------------------------------------------------------

		function injectBytes(bs, leftPadding) {
			var p = leftPadding || 0;
			var address = nacl_raw._malloc(bs.length + p);
			nacl_raw.HEAPU8.set(bs, address + p);
			for (var i = address; i < address + p; i++) {
				nacl_raw.HEAPU8[i] = 0;
			}
			return address;
		}

		function check_injectBytes(function_name, what, thing, expected_length, leftPadding) {
			check_length(function_name, what, thing, expected_length);
			return injectBytes(thing, leftPadding);
		}

		function extractBytes(address, length) {
			var result = new Uint8Array(length);
			result.set(nacl_raw.HEAPU8.subarray(address, address + length));
			return result;
		}

		//---------------------------------------------------------------------------

		function check(function_name, result) {
			if (result !== 0) {
				throw {
					message: "nacl_raw." + function_name + " signalled an error"
				};
			}
		}

		function check_length(function_name, what, thing, expected_length) {
			if (thing.length !== expected_length) {
				throw {
					message: "nacl." + function_name + " expected " + expected_length + "-byte " + what + " but got length " + thing.length
				};
			}
		}

		function Target(length) {
			this.length = length;
			this.address = nacl_raw._malloc(length);
		}

		Target.prototype.extractBytes = function(offset) {
			var result = extractBytes(this.address + (offset || 0), this.length - (offset || 0));
			nacl_raw._free(this.address);
			this.address = null;
			return result;
		};

		function free_all(addresses) {
			for (var i = 0; i < addresses.length; i++) {
				nacl_raw._free(addresses[i]);
			}
		}

		//---------------------------------------------------------------------------
		// Boxing

		function crypto_box_keypair() {
			var pk = new Target(nacl_raw._crypto_box_PUBLICKEYBYTES);
			var sk = new Target(nacl_raw._crypto_box_SECRETKEYBYTES);
			check("_crypto_box_keypair", nacl_raw._crypto_box_keypair(pk.address, sk.address));
			return {
				boxPk: pk.extractBytes(),
				boxSk: sk.extractBytes()
			};
		}

		function crypto_box_random_nonce() {
			return nacl_raw.RandomBytes.crypto.randomBytes(nacl_raw._crypto_box_NONCEBYTES);
		}

		function crypto_box(msg, nonce, pk, sk) {
			var m = injectBytes(msg, nacl_raw._crypto_box_ZEROBYTES);
			var na = check_injectBytes("crypto_box", "nonce", nonce, nacl_raw._crypto_box_NONCEBYTES);
			var pka = check_injectBytes("crypto_box", "pk", pk, nacl_raw._crypto_box_PUBLICKEYBYTES);
			var ska = check_injectBytes("crypto_box", "sk", sk, nacl_raw._crypto_box_SECRETKEYBYTES);
			var c = new Target(msg.length + nacl_raw._crypto_box_ZEROBYTES);
			check("_crypto_box", nacl_raw._crypto_box(c.address, m, c.length, 0, na, pka, ska));
			free_all([m, na, pka, ska]);
			return c.extractBytes(nacl_raw._crypto_box_BOXZEROBYTES);
		}

		function crypto_box_open(ciphertext, nonce, pk, sk) {
			var c = injectBytes(ciphertext, nacl_raw._crypto_box_BOXZEROBYTES);
			var na = check_injectBytes("crypto_box_open",
				"nonce", nonce, nacl_raw._crypto_box_NONCEBYTES);
			var pka = check_injectBytes("crypto_box_open",
				"pk", pk, nacl_raw._crypto_box_PUBLICKEYBYTES);
			var ska = check_injectBytes("crypto_box_open",
				"sk", sk, nacl_raw._crypto_box_SECRETKEYBYTES);
			var m = new Target(ciphertext.length + nacl_raw._crypto_box_BOXZEROBYTES);
			check("_crypto_box_open", nacl_raw._crypto_box_open(m.address, c, m.length, 0, na, pka, ska));
			free_all([c, na, pka, ska]);
			return m.extractBytes(nacl_raw._crypto_box_ZEROBYTES);
		}

		function crypto_box_precompute(pk, sk) {
			var pka = check_injectBytes("crypto_box_precompute",
				"pk", pk, nacl_raw._crypto_box_PUBLICKEYBYTES);
			var ska = check_injectBytes("crypto_box_precompute",
				"sk", sk, nacl_raw._crypto_box_SECRETKEYBYTES);
			var k = new Target(nacl_raw._crypto_box_BEFORENMBYTES);
			check("_crypto_box_beforenm",
			nacl_raw._crypto_box_beforenm(k.address, pka, ska));
			free_all([pka, ska]);
			return {
				boxK: k.extractBytes()
			};
		}

		function crypto_box_precomputed(msg, nonce, state) {
			var m = injectBytes(msg, nacl_raw._crypto_box_ZEROBYTES);
			var na = check_injectBytes("crypto_box_precomputed",
				"nonce", nonce, nacl_raw._crypto_box_NONCEBYTES);
			var ka = check_injectBytes("crypto_box_precomputed",
				"boxK", state.boxK, nacl_raw._crypto_box_BEFORENMBYTES);
			var c = new Target(msg.length + nacl_raw._crypto_box_ZEROBYTES);
			check("_crypto_box_afternm",
			nacl_raw._crypto_box_afternm(c.address, m, c.length, 0, na, ka));
			free_all([m, na, ka]);
			return c.extractBytes(nacl_raw._crypto_box_BOXZEROBYTES);
		}

		function crypto_box_open_precomputed(ciphertext, nonce, state) {
			var c = injectBytes(ciphertext, nacl_raw._crypto_box_BOXZEROBYTES);
			var na = check_injectBytes("crypto_box_open_precomputed",
				"nonce", nonce, nacl_raw._crypto_box_NONCEBYTES);
			var ka = check_injectBytes("crypto_box_open_precomputed",
				"boxK", state.boxK, nacl_raw._crypto_box_BEFORENMBYTES);
			var m = new Target(ciphertext.length + nacl_raw._crypto_box_BOXZEROBYTES);
			check("_crypto_box_open_afternm",
			nacl_raw._crypto_box_open_afternm(m.address, c, m.length, 0, na, ka));
			free_all([c, na, ka]);
			return m.extractBytes(nacl_raw._crypto_box_ZEROBYTES);
		}

		//---------------------------------------------------------------------------
		// Hashing

		function crypto_hash(bs) {
			var address = injectBytes(bs);
			var hash = new Target(nacl_raw._crypto_hash_BYTES);
			check("_crypto_hash", nacl_raw._crypto_hash(hash.address, address, bs.length, 0));
			nacl_raw._free(address);
			return hash.extractBytes();
		}

		function crypto_hash_string(s) {
			return crypto_hash(encode_utf8(s));
		}

		//---------------------------------------------------------------------------
		// Symmetric-key encryption

		function crypto_stream_random_nonce() {
			return nacl_raw.RandomBytes.crypto.randomBytes(nacl_raw._crypto_stream_NONCEBYTES);
		}

		function crypto_stream(len, nonce, key) {
			var na = check_injectBytes("crypto_stream",
				"nonce", nonce, nacl_raw._crypto_stream_NONCEBYTES);
			var ka = check_injectBytes("crypto_stream",
				"key", key, nacl_raw._crypto_stream_KEYBYTES);
			var out = new Target(len);
			check("_crypto_stream", nacl_raw._crypto_stream(out.address, len, 0, na, ka));
			free_all([na, ka]);
			return out.extractBytes();
		}

		function crypto_stream_xor(msg, nonce, key) {
			var na = check_injectBytes("crypto_stream_xor",
				"nonce", nonce, nacl_raw._crypto_stream_NONCEBYTES);
			var ka = check_injectBytes("crypto_stream_xor",
				"key", key, nacl_raw._crypto_stream_KEYBYTES);
			var ma = injectBytes(msg);
			var out = new Target(msg.length);
			check("_crypto_stream_xor",
			nacl_raw._crypto_stream_xor(out.address, ma, msg.length, 0, na, ka));
			free_all([na, ka, ma]);
			return out.extractBytes();
		}

		//---------------------------------------------------------------------------
		// One-time authentication

		function crypto_onetimeauth(msg, key) {
			var ka = check_injectBytes("crypto_onetimeauth",
				"key", key, nacl_raw._crypto_onetimeauth_KEYBYTES);
			var ma = injectBytes(msg);
			var authenticator = new Target(nacl_raw._crypto_onetimeauth_BYTES);
			check("_crypto_onetimeauth",
			nacl_raw._crypto_onetimeauth(authenticator.address, ma, msg.length, 0, ka));
			free_all([ka, ma]);
			return authenticator.extractBytes();
		}

		function crypto_onetimeauth_verify(authenticator, msg, key) {
			if (authenticator.length != nacl_raw._crypto_onetimeauth_BYTES) return false;
			var ka = check_injectBytes("crypto_onetimeauth_verify",
				"key", key, nacl_raw._crypto_onetimeauth_KEYBYTES);
			var ma = injectBytes(msg);
			var aa = injectBytes(authenticator);
			var result = nacl_raw._crypto_onetimeauth_verify(aa, ma, msg.length, 0, ka);
			free_all([ka, ma, aa]);
			return (result == 0);
		}

		//---------------------------------------------------------------------------
		// Authentication

		function crypto_auth(msg, key) {
			var ka = check_injectBytes("crypto_auth", "key", key, nacl_raw._crypto_auth_KEYBYTES);
			var ma = injectBytes(msg);
			var authenticator = new Target(nacl_raw._crypto_auth_BYTES);
			check("_crypto_auth", nacl_raw._crypto_auth(authenticator.address, ma, msg.length, 0, ka));
			free_all([ka, ma]);
			return authenticator.extractBytes();
		}

		function crypto_auth_verify(authenticator, msg, key) {
			if (authenticator.length != nacl_raw._crypto_auth_BYTES) return false;
			var ka = check_injectBytes("crypto_auth_verify",
				"key", key, nacl_raw._crypto_auth_KEYBYTES);
			var ma = injectBytes(msg);
			var aa = injectBytes(authenticator);
			var result = nacl_raw._crypto_auth_verify(aa, ma, msg.length, 0, ka);
			free_all([ka, ma, aa]);
			return (result == 0);
		}

		//---------------------------------------------------------------------------
		// Authenticated symmetric-key encryption

		function crypto_secretbox_random_nonce() {
			return nacl_raw.RandomBytes.crypto.randomBytes(nacl_raw._crypto_secretbox_NONCEBYTES);
		}

		function crypto_secretbox(msg, nonce, key) {
			var m = injectBytes(msg, nacl_raw._crypto_secretbox_ZEROBYTES);
			var na = check_injectBytes("crypto_secretbox",
				"nonce", nonce, nacl_raw._crypto_secretbox_NONCEBYTES);
			var ka = check_injectBytes("crypto_secretbox",
				"key", key, nacl_raw._crypto_secretbox_KEYBYTES);
			var c = new Target(msg.length + nacl_raw._crypto_secretbox_ZEROBYTES);
			check("_crypto_secretbox", nacl_raw._crypto_secretbox(c.address, m, c.length, 0, na, ka));
			free_all([m, na, ka]);
			return c.extractBytes(nacl_raw._crypto_secretbox_BOXZEROBYTES);
		}

		function crypto_secretbox_open(ciphertext, nonce, key) {
			var c = injectBytes(ciphertext, nacl_raw._crypto_secretbox_BOXZEROBYTES);
			var na = check_injectBytes("crypto_secretbox_open",
				"nonce", nonce, nacl_raw._crypto_secretbox_NONCEBYTES);
			var ka = check_injectBytes("crypto_secretbox_open",
				"key", key, nacl_raw._crypto_secretbox_KEYBYTES);
			var m = new Target(ciphertext.length + nacl_raw._crypto_secretbox_BOXZEROBYTES);
			check("_crypto_secretbox_open",
			nacl_raw._crypto_secretbox_open(m.address, c, m.length, 0, na, ka));
			free_all([c, na, ka]);
			return m.extractBytes(nacl_raw._crypto_secretbox_ZEROBYTES);
		}

		//---------------------------------------------------------------------------
		// Signing

		function crypto_sign_keypair() {
			var pk = new Target(nacl_raw._crypto_sign_PUBLICKEYBYTES);
			var sk = new Target(nacl_raw._crypto_sign_SECRETKEYBYTES);
			check("_crypto_sign_keypair", nacl_raw._crypto_sign_keypair(pk.address, sk.address));
			return {
				signPk: pk.extractBytes(),
				signSk: sk.extractBytes()
			};
		}

		function crypto_sign(msg, sk) {
			var ma = injectBytes(msg);
			var ska = check_injectBytes("crypto_sign", "sk", sk, nacl_raw._crypto_sign_SECRETKEYBYTES);
			var sm = new Target(msg.length + nacl_raw._crypto_sign_BYTES);
			var smlen = new Target(8);
			check("_crypto_sign",
			nacl_raw._crypto_sign(sm.address, smlen.address, ma, msg.length, 0, ska));
			free_all([ma, ska]);
			sm.length = nacl_raw.HEAPU32[smlen.address >> 2];
			nacl_raw._free(smlen.address);
			return sm.extractBytes();
		}

		function crypto_sign_open(sm, pk) {
			var sma = injectBytes(sm);
			var pka = check_injectBytes("crypto_sign_open",
				"pk", pk, nacl_raw._crypto_sign_PUBLICKEYBYTES);
			var m = new Target(sm.length);
			var mlen = new Target(8);
			if (nacl_raw._crypto_sign_open(m.address, mlen.address, sma, sm.length, 0, pka) === 0) {
				free_all([sma, pka]);
				m.length = nacl_raw.HEAPU32[mlen.address >> 2];
				nacl_raw._free(mlen.address);
				return m.extractBytes();
			} else {
				free_all([sma, pka, m.address, mlen.address]);
				return null;
			}
		}

		//---------------------------------------------------------------------------
		// Keys

		function crypto_sign_keypair_from_seed(bs) {
			// Hash the bytes to get a secret key. This will be MODIFIED IN
			// PLACE by the call to crypto_sign_keypair_from_raw_sk below.
			var hash = new Uint8Array(crypto_hash(bs));
			var ska = injectBytes(hash.subarray(0, nacl_raw._crypto_sign_SECRETKEYBYTES));
			var pk = new Target(nacl_raw._crypto_sign_PUBLICKEYBYTES);
			check("_crypto_sign_keypair_from_raw_sk",
			nacl_raw._crypto_sign_keypair_from_raw_sk(pk.address, ska));
			var sk = extractBytes(ska, nacl_raw._crypto_sign_SECRETKEYBYTES);
			nacl_raw._free(ska);
			return {
				signPk: pk.extractBytes(),
				signSk: sk
			};
		}

		function crypto_box_keypair_from_seed(bs) {
			var hash = new Uint8Array(crypto_hash(bs));
			var ska = injectBytes(hash.subarray(0, nacl_raw._crypto_box_SECRETKEYBYTES));
			var pk = new Target(nacl_raw._crypto_box_PUBLICKEYBYTES);
			check("_crypto_scalarmult_curve25519_base",
			nacl_raw._crypto_scalarmult_curve25519_base(pk.address, ska));
			var sk = extractBytes(ska, nacl_raw._crypto_box_SECRETKEYBYTES);
			nacl_raw._free(ska);
			return {
				boxPk: pk.extractBytes(),
				boxSk: sk
			};
		}

		//---------------------------------------------------------------------------

		exports.crypto_auth_BYTES = nacl_raw._crypto_auth_BYTES;
		exports.crypto_auth_KEYBYTES = nacl_raw._crypto_auth_KEYBYTES;
		exports.crypto_box_BEFORENMBYTES = nacl_raw._crypto_box_BEFORENMBYTES;
		exports.crypto_box_BOXZEROBYTES = nacl_raw._crypto_box_BOXZEROBYTES;
		exports.crypto_box_NONCEBYTES = nacl_raw._crypto_box_NONCEBYTES;
		exports.crypto_box_PUBLICKEYBYTES = nacl_raw._crypto_box_PUBLICKEYBYTES;
		exports.crypto_box_SECRETKEYBYTES = nacl_raw._crypto_box_SECRETKEYBYTES;
		exports.crypto_box_ZEROBYTES = nacl_raw._crypto_box_ZEROBYTES;
		exports.crypto_hash_BYTES = nacl_raw._crypto_hash_BYTES;
		exports.crypto_hashblocks_BLOCKBYTES = nacl_raw._crypto_hashblocks_BLOCKBYTES;
		exports.crypto_hashblocks_STATEBYTES = nacl_raw._crypto_hashblocks_STATEBYTES;
		exports.crypto_onetimeauth_BYTES = nacl_raw._crypto_onetimeauth_BYTES;
		exports.crypto_onetimeauth_KEYBYTES = nacl_raw._crypto_onetimeauth_KEYBYTES;
		exports.crypto_secretbox_BOXZEROBYTES = nacl_raw._crypto_secretbox_BOXZEROBYTES;
		exports.crypto_secretbox_KEYBYTES = nacl_raw._crypto_secretbox_KEYBYTES;
		exports.crypto_secretbox_NONCEBYTES = nacl_raw._crypto_secretbox_NONCEBYTES;
		exports.crypto_secretbox_ZEROBYTES = nacl_raw._crypto_secretbox_ZEROBYTES;
		exports.crypto_sign_BYTES = nacl_raw._crypto_sign_BYTES;
		exports.crypto_sign_PUBLICKEYBYTES = nacl_raw._crypto_sign_PUBLICKEYBYTES;
		exports.crypto_sign_SECRETKEYBYTES = nacl_raw._crypto_sign_SECRETKEYBYTES;
		exports.crypto_stream_BEFORENMBYTES = nacl_raw._crypto_stream_BEFORENMBYTES;
		exports.crypto_stream_KEYBYTES = nacl_raw._crypto_stream_KEYBYTES;
		exports.crypto_stream_NONCEBYTES = nacl_raw._crypto_stream_NONCEBYTES;

		exports.encode_utf8 = encode_utf8;
		exports.encode_latin1 = encode_latin1;
		exports.decode_utf8 = decode_utf8;
		exports.decode_latin1 = decode_latin1;
		exports.to_hex = to_hex;

		exports.crypto_box_keypair = crypto_box_keypair;
		exports.crypto_box_random_nonce = crypto_box_random_nonce;
		exports.crypto_box = crypto_box;
		exports.crypto_box_open = crypto_box_open;
		exports.crypto_box_precompute = crypto_box_precompute;
		exports.crypto_box_precomputed = crypto_box_precomputed;
		exports.crypto_box_open_precomputed = crypto_box_open_precomputed;

		exports.crypto_stream_random_nonce = crypto_stream_random_nonce;
		exports.crypto_stream = crypto_stream;
		exports.crypto_stream_xor = crypto_stream_xor;

		exports.crypto_onetimeauth = crypto_onetimeauth;
		exports.crypto_onetimeauth_verify = crypto_onetimeauth_verify;

		exports.crypto_auth = crypto_auth;
		exports.crypto_auth_verify = crypto_auth_verify;

		exports.crypto_secretbox_random_nonce = crypto_secretbox_random_nonce;
		exports.crypto_secretbox = crypto_secretbox;
		exports.crypto_secretbox_open = crypto_secretbox_open;

		exports.crypto_sign_keypair = crypto_sign_keypair;
		exports.crypto_sign = crypto_sign;
		exports.crypto_sign_open = crypto_sign_open;

		exports.crypto_hash = crypto_hash;
		exports.crypto_hash_string = crypto_hash_string;

		exports.crypto_sign_keypair_from_seed = crypto_sign_keypair_from_seed;
		exports.crypto_box_keypair_from_seed = crypto_box_keypair_from_seed;

		return exports;
	})();
	var randomBytes;
	if (typeof module !== 'undefined' && module.exports) {
		// add node.js implementations
		var crypto = require('crypto');
		randomBytes = crypto.randomBytes;
	} else if (window && window.crypto && window.crypto.getRandomValues) {
		// add in-browser implementation
		randomBytes = function(count) {
			var bs = new Uint8Array(count);
			window.crypto.getRandomValues(bs);
			return bs;
		};
	} else {
		randomBytes = function(count) {
			throw {
				name: "No cryptographic random number generator",
				message: "Your browser does not support cryptographic random number generation."
			};
		};
	}

	nacl_raw.RandomBytes.crypto = {
		"randomBytes": randomBytes
	};
	nacl.random_bytes = randomBytes;
	nacl.nacl_raw = nacl_raw;
	return nacl;
})((typeof window !== 'undefined') ? window : null, (typeof document !== 'undefined') ? document : null);

// export common.js module to allow one js file for browser and node.js
if (typeof module !== 'undefined' && module.exports) {
	module.exports = nacl;
}