(() => {
  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l = fs.length;
      var k = xs.length;
      var result = new Array(l * k);
      var n = 0;
      for (var i = 0; i < l; i++) {
        var f = fs[i];
        for (var j = 0; j < k; j++) {
          result[n++] = f(xs[j]);
        }
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b) {
      return function(a2) {
        return f(a2)(b);
      };
    };
  };
  var $$const = function(a2) {
    return function(v) {
      return a2;
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var applyArray = {
    apply: arrayApply,
    Functor0: function() {
      return functorArray;
    }
  };
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map8 = map(dictApply.Functor0());
    return function(a2) {
      return function(b) {
        return apply1(map8($$const(identity2))(a2))(b);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    var pure1 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply2(pure1(f))(a2);
      };
    };
  };

  // output/Control.Bind/foreign.js
  var arrayBind = function(arr) {
    return function(f) {
      var result = [];
      for (var i = 0, l = arr.length; i < l; i++) {
        Array.prototype.push.apply(result, f(arr[i]));
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count, value2) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value2);
  };
  var replicatePolyfill = function(count, value2) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count; i++) {
      result[n++] = value2;
    }
    return result;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var indexImpl = function(just, nothing, xs, i) {
    return i < 0 || i >= xs.length ? nothing : just(xs[i]);
  };
  var findIndexImpl = function(just, nothing, f, xs) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (f(xs[i])) return just(i);
    }
    return nothing;
  };
  var filterImpl = function(f, xs) {
    return xs.filter(f);
  };
  var sliceImpl = function(s, e, l) {
    return l.slice(s, e);
  };
  var unsafeIndexImpl = function(xs, n) {
    return xs[n];
  };

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0) return ys;
      if (ys.length === 0) return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind3 = bind(dictMonad.Bind1());
    var pure4 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind3(f)(function(f$prime) {
          return bind3(a2)(function(a$prime) {
            return pure4(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq3) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq3 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordCharImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqCharImpl = refEq;

  // output/Data.Eq/index.js
  var eqInt = {
    eq: eqIntImpl
  };
  var eqChar = {
    eq: eqCharImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eq2 = /* @__PURE__ */ eq(eqBoolean);
  var notEq = function(dictEq) {
    var eq3 = eq(dictEq);
    return function(x) {
      return function(y) {
        return eq2(eq3(x)(y))(false);
      };
    };
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };

  // output/Data.Semiring/index.js
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };

  // output/Data.Ring/index.js
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };

  // output/Data.Ord/index.js
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var ordChar = /* @__PURE__ */ function() {
    return {
      compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqChar;
      }
    };
  }();

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var boundedChar = {
    top: topChar,
    bottom: bottomChar,
    Ord0: function() {
      return ordChar;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(
      /[\0-\x1F\x7F"\\]/g,
      // eslint-disable-line no-control-regex
      function(c, i) {
        switch (c) {
          case '"':
          case "\\":
            return "\\" + c;
          case "\x07":
            return "\\a";
          case "\b":
            return "\\b";
          case "\f":
            return "\\f";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "	":
            return "\\t";
          case "\v":
            return "\\v";
        }
        var k = i + 1;
        var empty4 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
        return "\\" + c.charCodeAt(0).toString(10) + empty4;
      }
    ) + '"';
  };

  // output/Data.Show/index.js
  var showUnit = {
    show: function(v) {
      return "unit";
    }
  };
  var showString = {
    show: showStringImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var fromMaybe = function(a2) {
    return maybe(a2)(identity3);
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0) return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0) return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };
  var div = function(dict) {
    return dict.div;
  };

  // output/Data.Monoid/index.js
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/foreign.js
  var pureE = function(a2) {
    return function() {
      return a2;
    };
  };
  var bindE = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name2, moduleName, init3) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2) return val;
      if (state2 === 1) throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init3();
      state2 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var write = function(val) {
    return function(ref) {
      return function() {
        ref.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$new = _new;

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b) {
    return !b;
  };

  // output/Data.HeytingAlgebra/index.js
  var not = function(dict) {
    return dict.not;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a2) {
      return function(b) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a2))(b);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond2 = applySecond(dictApplicative.Apply0());
    var pure4 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr2 = foldr(dictFoldable);
      return function(f) {
        return foldr2(function($454) {
          return applySecond2(f($454));
        })(pure4(unit));
      };
    };
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr2 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append3 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldr2(function(x) {
          return function(acc) {
            return append3(f(x))(acc);
          };
        })(mempty2);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };

  // output/Data.Function.Uncurried/foreign.js
  var runFn2 = function(fn) {
    return function(a2) {
      return function(b) {
        return fn(a2, b);
      };
    };
  };
  var runFn3 = function(fn) {
    return function(a2) {
      return function(b) {
        return function(c) {
          return fn(a2, b, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a2) {
      return function(b) {
        return function(c) {
          return function(d) {
            return fn(a2, b, c, d);
          };
        };
      };
    };
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = /* @__PURE__ */ function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b) {
        return [a2, b];
      };
    }
    function array3(a2) {
      return function(b) {
        return function(c) {
          return [a2, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map8) {
        return function(pure4) {
          return function(f) {
            return function(array) {
              function go(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure4([]);
                  case 1:
                    return map8(array1)(f(array[bot]));
                  case 2:
                    return apply2(map8(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map8(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply2(map8(concat2)(go(bot, pivot)))(go(pivot, top3));
                }
              }
              return go(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse2 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse2(dictApplicative)(identity4);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };
  var sequence = function(dict) {
    return dict.sequence;
  };

  // output/Data.Array/index.js
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var unsafeIndex = function() {
    return runFn2(unsafeIndexImpl);
  };
  var unsafeIndex1 = /* @__PURE__ */ unsafeIndex();
  var slice = /* @__PURE__ */ runFn3(sliceImpl);
  var singleton2 = function(a2) {
    return [a2];
  };
  var index = /* @__PURE__ */ function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  }();
  var head = function(xs) {
    return index(xs)(0);
  };
  var findIndex = /* @__PURE__ */ function() {
    return runFn4(findIndexImpl)(Just.create)(Nothing.value);
  }();
  var find2 = function(f) {
    return function(xs) {
      return map2(unsafeIndex1(xs))(findIndex(f)(xs));
    };
  };
  var filter = /* @__PURE__ */ runFn2(filterImpl);
  var concatMap = /* @__PURE__ */ flip(/* @__PURE__ */ bind(bindArray));

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };
  var toStringAs = function(radix2) {
    return function(i) {
      return i.toString(radix2);
    };
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var floor = Math.floor;

  // output/Data.Int/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var radix = function(n) {
    if (n >= 2 && n <= 36) {
      return new Just(n);
    }
    ;
    if (otherwise) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 198, column 1 - line 198, column 28): " + [n.constructor.name]);
  };
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var floor2 = function($39) {
    return unsafeClamp(floor($39));
  };

  // output/Data.String.Common/foreign.js
  var split = function(sep) {
    return function(s) {
      return s.split(sep);
    };
  };
  var toLower = function(s) {
    return s.toLowerCase();
  };
  var toUpper = function(s) {
    return s.toUpperCase();
  };
  var joinWith = function(s) {
    return function(xs) {
      return xs.join(s);
    };
  };

  // output/Data.String.Common/index.js
  var $$null = function(s) {
    return s === "";
  };

  // output/Data.String.Regex/foreign.js
  var regexImpl = function(left) {
    return function(right) {
      return function(s1) {
        return function(s2) {
          try {
            return right(new RegExp(s1, s2));
          } catch (e) {
            return left(e.message);
          }
        };
      };
    };
  };
  var _replaceBy = function(just) {
    return function(nothing) {
      return function(r) {
        return function(f) {
          return function(s) {
            return s.replace(r, function(match) {
              var groups = [];
              var group4, i = 1;
              while (typeof (group4 = arguments[i++]) !== "number") {
                groups.push(group4 == null ? nothing : just(group4));
              }
              return f(match)(groups);
            });
          };
        };
      };
    };
  };

  // output/Data.String.CodeUnits/foreign.js
  var singleton3 = function(c) {
    return c;
  };
  var length2 = function(s) {
    return s.length;
  };
  var drop = function(n) {
    return function(s) {
      return s.substring(n);
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i) {
    return function(s) {
      if (i >= 0 && i < s.length) return s.charAt(i);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Data.String.Regex.Flags/index.js
  var global = {
    global: true,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    sticky: false,
    unicode: false
  };

  // output/Data.String.Regex/index.js
  var replace$prime = /* @__PURE__ */ function() {
    return _replaceBy(Just.create)(Nothing.value);
  }();
  var renderFlags = function(v) {
    return function() {
      if (v.global) {
        return "g";
      }
      ;
      return "";
    }() + (function() {
      if (v.ignoreCase) {
        return "i";
      }
      ;
      return "";
    }() + (function() {
      if (v.multiline) {
        return "m";
      }
      ;
      return "";
    }() + (function() {
      if (v.dotAll) {
        return "s";
      }
      ;
      return "";
    }() + (function() {
      if (v.sticky) {
        return "y";
      }
      ;
      return "";
    }() + function() {
      if (v.unicode) {
        return "u";
      }
      ;
      return "";
    }()))));
  };
  var regex = function(s) {
    return function(f) {
      return regexImpl(Left.create)(Right.create)(s)(renderFlags(f));
    };
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Effect.Random/foreign.js
  var random = Math.random;

  // output/Effect.Random/index.js
  var randomInt = function(low) {
    return function(high) {
      return function __do3() {
        var n = random();
        var asNumber = (toNumber(high) - toNumber(low) + 1) * n + toNumber(low);
        return floor2(asNumber);
      };
    };
  };

  // output/Data.UUID.Random/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var map3 = /* @__PURE__ */ map(functorArray);
  var append1 = /* @__PURE__ */ append(semigroupArray);
  var sequence2 = /* @__PURE__ */ sequence(traversableArray);
  var UUIDv4 = /* @__PURE__ */ function() {
    function UUIDv42(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    UUIDv42.create = function(value0) {
      return function(value1) {
        return new UUIDv42(value0, value1);
      };
    };
    return UUIDv42;
  }();
  var eqUUIDv4 = {
    eq: function(v) {
      return function(v1) {
        return v.value0 === v1.value0;
      };
    }
  };
  var hexRadix = /* @__PURE__ */ fromJust2(/* @__PURE__ */ radix(16));
  var render = function(is) {
    var chunk = function(i) {
      return function(j) {
        return joinWith("")(map3(toStringAs(hexRadix))(slice(i)(j)(is)));
      };
    };
    return joinWith("-")([chunk(0)(8), chunk(8)(12), chunk(12)(16), chunk(16)(20), chunk(20)(32)]);
  };
  var unsafeFromInts = function(is) {
    return new UUIDv4(render(is), is);
  };
  var make$prime = function(dictApplicative) {
    var pure1 = pure(dictApplicative);
    var map1 = map(dictApplicative.Apply0().Functor0());
    var sequence12 = sequence2(dictApplicative);
    return function(rand) {
      var y = [rand(8)(11)];
      var x = [rand(0)(15)];
      var x3 = append1(x)(append1(x)(x));
      var x4 = append1(x3)(x);
      var x8 = append1(x4)(x4);
      var x12 = append1(x8)(x4);
      var uuid = append1(x8)(append1(x4)(append1([pure1(4)])(append1(x3)(append1(y)(append1(x3)(x12))))));
      return map1(unsafeFromInts)(sequence12(uuid));
    };
  };
  var make$prime1 = /* @__PURE__ */ make$prime(applicativeEffect);
  var make = function(dictMonadEffect) {
    return liftEffect(dictMonadEffect)(make$prime1(randomInt));
  };

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler(error3) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error3) {
        setTimeout(function() {
          throw error3;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error3) {
        return left(error3);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error3) {
        k(left(error3))();
        return nonCanceler;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size3 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size3 !== 0) {
          size3--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i, tmp;
          if (size3 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size3) % limit] = cb;
          size3++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error3) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step = aff;
      var fail = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run4(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step = bhead(step);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail = util.left(e);
                step = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step)) {
                status = RETURN;
                fail = step;
                step = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step = util.fromRight(step);
              }
              break;
            case CONTINUE:
              switch (step.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step._2;
                  status = CONTINUE;
                  step = step._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step = util.right(step._1);
                  } else {
                    status = STEP_BIND;
                    step = step._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step = runSync(util.left, util.right, step._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step = runAsync(util.left, step._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step = result2;
                        run4(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail = util.left(step._1);
                  step = null;
                  break;
                // Enqueue the Catch so that we can call the error handler later on
                // in case of an exception.
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step = step._1;
                  break;
                // Enqueue the Bracket so that we can call the appropriate handlers
                // after resource acquisition.
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step = step._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step._1) {
                    tmp.run();
                  }
                  step = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step = sequential2(util, supervisor, step._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step = interrupt || fail || step;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  // We cannot recover from an unmasked interrupt. Otherwise we should
                  // continue stepping, or run the exception handler if an exception
                  // was raised.
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail) {
                      status = CONTINUE;
                      step = attempt._2(util.fromLeft(fail));
                      fail = null;
                    }
                    break;
                  // We cannot resume from an unmasked interrupt or exception.
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step = util.fromRight(step);
                    }
                    break;
                  // If we have a bracket, we should enqueue the handlers,
                  // and continue with the success branch only if the fiber has
                  // not been interrupted. If the bracket acquisition failed, we
                  // should not run either.
                  case BRACKET:
                    bracketCount--;
                    if (fail === null) {
                      result = util.fromRight(step);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step = attempt._3(result);
                      }
                    }
                    break;
                  // Enqueue the appropriate handler. We increase the bracket count
                  // because it should not be cancelled.
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail) {
                      step = attempt._1.failed(util.fromLeft(fail))(attempt._2);
                    } else {
                      step = attempt._1.completed(util.fromRight(step))(attempt._2);
                    }
                    fail = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail), attempts, interrupt);
                    status = CONTINUE;
                    step = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step = attempt._1;
                    fail = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step));
                }
              }
              joins = null;
              if (interrupt && fail) {
                setTimeout(function() {
                  throw util.fromLeft(fail);
                }, 0);
              } else if (util.isLeft(step) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join3) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join3.rethrow;
            join3.handler(step)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join3;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill(error3, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error3);
              status = COMPLETED;
              step = interrupt;
              run4(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error3);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step(error3)), attempts, interrupt);
                }
                status = RETURN;
                step = null;
                fail = null;
                run4(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error3);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step = null;
                fail = null;
              }
          }
          return canceler;
        };
      }
      function join2(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run4(runTick);
          }
          return canceler;
        };
      }
      return {
        kill,
        join: join2,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run4(runTick);
              });
            } else {
              run4(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill(error3, par2, cb2) {
        var step = par2;
        var head2 = null;
        var tail2 = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop: while (true) {
          tmp = null;
          switch (step.tag) {
            case FORKED:
              if (step._3 === EMPTY) {
                tmp = fibers[step._1];
                kills2[count++] = tmp.kill(error3, function(result) {
                  return function() {
                    count--;
                    if (count === 0) {
                      cb2(result)();
                    }
                  };
                });
              }
              if (head2 === null) {
                break loop;
              }
              step = head2._2;
              if (tail2 === null) {
                head2 = null;
              } else {
                head2 = tail2._1;
                tail2 = tail2._2;
              }
              break;
            case MAP:
              step = step._2;
              break;
            case APPLY:
            case ALT:
              if (head2) {
                tail2 = new Aff2(CONS, head2, tail2);
              }
              head2 = step;
              step = step._1;
              break;
          }
        }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join2(result, head2, tail2) {
        var fail, step, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail = result;
          step = null;
        } else {
          step = result;
          fail = null;
        }
        loop: while (true) {
          lhs = null;
          rhs = null;
          tmp = null;
          kid = null;
          if (interrupt !== null) {
            return;
          }
          if (head2 === null) {
            cb(fail || step)();
            return;
          }
          if (head2._3 !== EMPTY) {
            return;
          }
          switch (head2.tag) {
            case MAP:
              if (fail === null) {
                head2._3 = util.right(head2._1(util.fromRight(step)));
                step = head2._3;
              } else {
                head2._3 = fail;
              }
              break;
            case APPLY:
              lhs = head2._1._3;
              rhs = head2._2._3;
              if (fail) {
                head2._3 = fail;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, fail === lhs ? head2._2 : head2._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join2(fail, null, null);
                    } else {
                      join2(fail, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              } else if (lhs === EMPTY || rhs === EMPTY) {
                return;
              } else {
                step = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                head2._3 = step;
              }
              break;
            case ALT:
              lhs = head2._1._3;
              rhs = head2._2._3;
              if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                return;
              }
              if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                fail = step === lhs ? rhs : lhs;
                step = null;
                head2._3 = fail;
              } else {
                head2._3 = step;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, step === lhs ? head2._2 : head2._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join2(step, null, null);
                    } else {
                      join2(step, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              }
              break;
          }
          if (tail2 === null) {
            head2 = null;
          } else {
            head2 = tail2._1;
            tail2 = tail2._2;
          }
        }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join2(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run4() {
        var status = CONTINUE;
        var step = par;
        var head2 = null;
        var tail2 = null;
        var tmp, fid;
        loop: while (true) {
          tmp = null;
          fid = null;
          switch (status) {
            case CONTINUE:
              switch (step.tag) {
                case MAP:
                  if (head2) {
                    tail2 = new Aff2(CONS, head2, tail2);
                  }
                  head2 = new Aff2(MAP, step._1, EMPTY, EMPTY);
                  step = step._2;
                  break;
                case APPLY:
                  if (head2) {
                    tail2 = new Aff2(CONS, head2, tail2);
                  }
                  head2 = new Aff2(APPLY, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                case ALT:
                  if (head2) {
                    tail2 = new Aff2(CONS, head2, tail2);
                  }
                  head2 = new Aff2(ALT, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                default:
                  fid = fiberId++;
                  status = RETURN;
                  tmp = step;
                  step = new Aff2(FORKED, fid, new Aff2(CONS, head2, tail2), EMPTY);
                  tmp = Fiber(util, supervisor, tmp);
                  tmp.onComplete({
                    rethrow: false,
                    handler: resolve(step)
                  })();
                  fibers[fid] = tmp;
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
              }
              break;
            case RETURN:
              if (head2 === null) {
                break loop;
              }
              if (head2._1 === EMPTY) {
                head2._1 = step;
                status = CONTINUE;
                step = head2._2;
                head2._2 = EMPTY;
              } else {
                head2._2 = step;
                step = head2;
                if (tail2 === null) {
                  head2 = null;
                } else {
                  head2 = tail2._1;
                  tail2 = tail2._2;
                }
              }
          }
        }
        root = step;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error3, cb2) {
        interrupt = util.left(error3);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill(error3, root, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler;
            };
          });
        };
      }
      run4();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential2(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value2) {
          return Aff.Pure(f(value2));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  var _liftEffect = Aff.Sync;
  var makeAff = Aff.Async;
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _sequential = Aff.Seq;

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function message(e) {
    return e.message;
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Effect.Exception/index.js
  var $$throw = function($4) {
    return throwException(error($4));
  };

  // output/Control.Monad.Error.Class/index.js
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    var catchError1 = catchError(dictMonadError);
    var Monad0 = dictMonadError.MonadThrow0().Monad0();
    var map8 = map(Monad0.Bind1().Apply0().Functor0());
    var pure4 = pure(Monad0.Applicative0());
    return function(a2) {
      return catchError1(map8(Right.create)(a2))(function($52) {
        return pure4(Left.create($52));
      });
    };
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy2 = function(name2, moduleName, init3) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2) return val;
      if (state2 === 1) throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init3();
      state2 = 2;
      return val;
    };
  };
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var functorAff = {
    map: _map
  };
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do3() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindAff);
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
  var runAff = function(k) {
    return function(aff) {
      return launchAff(bindFlipped2(function($83) {
        return liftEffect2(k($83));
      })($$try2(aff)));
    };
  };
  var runAff_ = function(k) {
    return function(aff) {
      return $$void2(runAff(k)(aff));
    };
  };

  // output/Effect.Console/foreign.js
  var log2 = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/Flame.Application.Internal.Dom/foreign.js
  function querySelector_(selector) {
    return document.querySelector(selector);
  }
  function createWindowListener_(eventName, updater) {
    window.addEventListener(eventName, function(event) {
      updater(event)();
    });
  }
  function createDocumentListener_(eventName, updater) {
    document.addEventListener(eventName, function(event) {
      updater(event)();
    });
  }
  function createCustomListener_(eventName, updater) {
    document.addEventListener(eventName, function(event) {
      updater(event.detail)();
    });
  }

  // output/Data.Nullable/foreign.js
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Effect.Uncurried/foreign.js
  var runEffectFn1 = function runEffectFn12(fn) {
    return function(a2) {
      return function() {
        return fn(a2);
      };
    };
  };
  var runEffectFn2 = function runEffectFn22(fn) {
    return function(a2) {
      return function(b) {
        return function() {
          return fn(a2, b);
        };
      };
    };
  };
  var runEffectFn4 = function runEffectFn42(fn) {
    return function(a2) {
      return function(b) {
        return function(c) {
          return function(d) {
            return function() {
              return fn(a2, b, c, d);
            };
          };
        };
      };
    };
  };

  // output/Flame.Application.Internal.Dom/index.js
  var querySelector = function(selector) {
    return function __do3() {
      var selected = querySelector_(selector);
      return toMaybe(selected);
    };
  };
  var createWindowListener = /* @__PURE__ */ runEffectFn2(createWindowListener_);
  var createDocumentListener = /* @__PURE__ */ runEffectFn2(createDocumentListener_);
  var createCustomListener = /* @__PURE__ */ runEffectFn2(createCustomListener_);

  // output/Flame.Html.Attribute.Internal/foreign.js
  var classData = 2;
  var propertyData = 3;
  function createProperty(name2) {
    return function(value2) {
      return [propertyData, name2, value2];
    };
  }
  function createClass(array) {
    return [classData, array];
  }

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _singleton = function(fallback) {
    return hasFromCodePoint ? String.fromCodePoint : fallback;
  };

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }

  // output/Data.Enum/index.js
  var bottom1 = /* @__PURE__ */ bottom(boundedChar);
  var top1 = /* @__PURE__ */ top(boundedChar);
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var toEnumWithDefaults = function(dictBoundedEnum) {
    var toEnum1 = toEnum(dictBoundedEnum);
    var fromEnum1 = fromEnum(dictBoundedEnum);
    var bottom22 = bottom(dictBoundedEnum.Bounded0());
    return function(low) {
      return function(high) {
        return function(x) {
          var v = toEnum1(x);
          if (v instanceof Just) {
            return v.value0;
          }
          ;
          if (v instanceof Nothing) {
            var $140 = x < fromEnum1(bottom22);
            if ($140) {
              return low;
            }
            ;
            return high;
          }
          ;
          throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
        };
      };
    };
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a2) {
        return toEnum$prime(fromEnum$prime(a2) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a2) {
        return toEnum$prime(fromEnum$prime(a2) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v) {
    if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
      return new Just(fromCharCode(v));
    }
    ;
    return Nothing.value;
  };
  var enumChar = {
    succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
    pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
    Ord0: function() {
      return ordChar;
    }
  };
  var boundedEnumChar = /* @__PURE__ */ function() {
    return {
      cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
      toEnum: charToEnum,
      fromEnum: toCharCode,
      Bounded0: function() {
        return boundedChar;
      },
      Enum1: function() {
        return enumChar;
      }
    };
  }();

  // output/Data.String.CodePoints/index.js
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var div2 = /* @__PURE__ */ div(euclideanRingInt);
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var unsurrogate = function(lead) {
    return function(trail) {
      return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
  };
  var isTrail = function(cu) {
    return 56320 <= cu && cu <= 57343;
  };
  var isLead = function(cu) {
    return 55296 <= cu && cu <= 56319;
  };
  var uncons = function(s) {
    var v = length2(s);
    if (v === 0) {
      return Nothing.value;
    }
    ;
    if (v === 1) {
      return new Just({
        head: fromEnum2(charAt(0)(s)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum2(charAt(1)(s));
    var cu0 = fromEnum2(charAt(0)(s));
    var $43 = isLead(cu0) && isTrail(cu1);
    if ($43) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop(2)(s)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop(1)(s)
    });
  };
  var fromCharCode2 = /* @__PURE__ */ function() {
    var $75 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
    return function($76) {
      return singleton3($75($76));
    };
  }();
  var singletonFallback = function(v) {
    if (v <= 65535) {
      return fromCharCode2(v);
    }
    ;
    var lead = div2(v - 65536 | 0)(1024) + 55296 | 0;
    var trail = mod2(v - 65536 | 0)(1024) + 56320 | 0;
    return fromCharCode2(lead) + fromCharCode2(trail);
  };
  var singleton4 = /* @__PURE__ */ _singleton(singletonFallback);

  // output/Foreign.Object/foreign.js
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Flame.Html.Attribute.Internal/index.js
  var fromJust3 = /* @__PURE__ */ fromJust();
  var crashWith3 = /* @__PURE__ */ crashWith();
  var show2 = /* @__PURE__ */ show(showString);
  var map4 = /* @__PURE__ */ map(functorArray);
  var toClassListString = {
    to: /* @__PURE__ */ function() {
      var $46 = filter(function() {
        var $49 = not(heytingAlgebraBoolean);
        return function($50) {
          return $49($$null($50));
        };
      }());
      var $47 = split(" ");
      return function($48) {
        return $46($47($48));
      };
    }()
  };
  var value = /* @__PURE__ */ createProperty("value");
  var type$prime = /* @__PURE__ */ createProperty("type");
  var to = function(dict) {
    return dict.to;
  };
  var placeholder = /* @__PURE__ */ createProperty("placeholder");
  var caseify = function(name$prime) {
    if (name$prime === toUpper(name$prime)) {
      return toLower(name$prime);
    }
    ;
    if (otherwise) {
      var v = fromJust3(uncons(name$prime));
      var replacer = function($133) {
        return $$const(function(v1) {
          return "-" + v1;
        }(toLower($133)));
      };
      var regex2 = function() {
        var v1 = regex("[A-Z]")(global);
        if (v1 instanceof Right) {
          return v1.value0;
        }
        ;
        if (v1 instanceof Left) {
          return crashWith3(show2(v1.value0));
        }
        ;
        throw new Error("Failed pattern match at Flame.Html.Attribute.Internal (line 90, column 40 - line 92, column 57): " + [v1.constructor.name]);
      }();
      var hyphenated = replace$prime(regex2)(replacer)(v.tail);
      return toLower(singleton4(v.head)) + hyphenated;
    }
    ;
    throw new Error("Failed pattern match at Flame.Html.Attribute.Internal (line 83, column 1 - line 83, column 26): " + [name$prime.constructor.name]);
  };
  var class$prime = function(dictToClassList) {
    var $134 = map4(caseify);
    var $135 = to(dictToClassList);
    return function($136) {
      return createClass($134($135($136)));
    };
  };
  var booleanToFalsyString = function(v) {
    if (v) {
      return "true";
    }
    ;
    if (!v) {
      return "";
    }
    ;
    throw new Error("Failed pattern match at Flame.Html.Attribute.Internal (line 66, column 7 - line 68, column 23): " + [v.constructor.name]);
  };
  var checked = /* @__PURE__ */ function() {
    var $140 = createProperty("checked");
    return function($141) {
      return $140(booleanToFalsyString($141));
    };
  }();
  var disabled = /* @__PURE__ */ function() {
    var $148 = createProperty("disabled");
    return function($149) {
      return $148(booleanToFalsyString($149));
    };
  }();

  // output/Flame.Html.Element/foreign.js
  var textNode = 1;
  var elementNode = 2;
  var styleData = 1;
  var classData2 = 2;
  var propertyData2 = 3;
  var attributeData = 4;
  var keyData = 7;
  function createElementNode(tag) {
    return function(nodeData) {
      return function(potentialChildren) {
        let children = potentialChildren, text2 = void 0;
        if (potentialChildren.length === 1 && potentialChildren[0].nodeType == textNode) {
          children = void 0;
          text2 = potentialChildren[0].text;
        }
        return {
          nodeType: elementNode,
          node: void 0,
          tag,
          nodeData: fromNodeData(nodeData),
          children,
          text: text2
        };
      };
    };
  }
  function createSingleElementNode(tag) {
    return function(nodeData) {
      return {
        nodeType: elementNode,
        node: void 0,
        tag,
        nodeData: fromNodeData(nodeData)
      };
    };
  }
  function text(value2) {
    return {
      nodeType: textNode,
      node: void 0,
      text: value2
    };
  }
  function fromNodeData(allData) {
    let nodeData = {};
    if (allData !== void 0)
      for (let data of allData) {
        let dataOne = data[1];
        switch (data[0]) {
          case styleData:
            if (nodeData.styles === void 0)
              nodeData.styles = {};
            for (let key in dataOne)
              nodeData.styles[key] = dataOne[key];
            break;
          case classData2:
            if (nodeData.classes === void 0)
              nodeData.classes = [];
            nodeData.classes = nodeData.classes.concat(dataOne);
            break;
          case propertyData2:
            if (nodeData.properties === void 0)
              nodeData.properties = {};
            nodeData.properties[dataOne] = data[2];
            break;
          case attributeData:
            if (nodeData.attributes === void 0)
              nodeData.attributes = {};
            nodeData.attributes[dataOne] = data[2];
            break;
          case keyData:
            nodeData.key = dataOne;
            break;
          default:
            if (nodeData.events === void 0)
              nodeData.events = {};
            if (nodeData.events[dataOne] === void 0)
              nodeData.events[dataOne] = [];
            nodeData.events[dataOne].push(data[2]);
        }
      }
    return nodeData;
  }

  // output/Flame.Html.Element/index.js
  var toNodeNodeDataNodeData = {
    toNode: singleton2
  };
  var toNodeHtmlHtml = {
    toNode: singleton2
  };
  var toNode = function(dict) {
    return dict.toNode;
  };
  var toNodeArray = function(dictToNode) {
    return {
      toNode: concatMap(toNode(dictToNode))
    };
  };
  var createElement$prime = function(tag) {
    return function(dictToNode) {
      var toNode1 = toNode(dictToNode);
      return function(nodeData) {
        return createSingleElementNode(tag)(toNode1(nodeData));
      };
    };
  };
  var i$prime = function(dictToNode) {
    return createElement$prime("i")(dictToNode);
  };
  var input = function(dictToNode) {
    return createElement$prime("input")(dictToNode);
  };
  var createElement = function(tag) {
    return function(dictToNode) {
      var toNode1 = toNode(dictToNode);
      return function(dictToNode1) {
        var toNode2 = toNode(dictToNode1);
        return function(nodeData) {
          return function(children) {
            return createElementNode(tag)(toNode1(nodeData))(toNode2(children));
          };
        };
      };
    };
  };
  var div3 = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("div")(dictToNode)(dictToNode1);
    };
  };
  var h1 = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("h1")(dictToNode)(dictToNode1);
    };
  };
  var label = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("label")(dictToNode)(dictToNode1);
    };
  };
  var li = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("li")(dictToNode)(dictToNode1);
    };
  };
  var span = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("span")(dictToNode)(dictToNode1);
    };
  };
  var ul = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("ul")(dictToNode)(dictToNode1);
    };
  };
  var button = function(dictToNode) {
    return function(dictToNode1) {
      return createElement("button")(dictToNode)(dictToNode1);
    };
  };

  // output/Flame.Renderer.String/foreign.js
  var reUnescapedHtml = /[&<>"']/g;
  var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  // output/Flame.Renderer.Internal.Dom/foreign.js
  var namespace = "http://www.w3.org/2000/svg";
  var eventPrefix = "__flame_";
  var eventPostfix = "updater";
  var textNode2 = 1;
  var elementNode2 = 2;
  var svgNode = 3;
  var fragmentNode = 4;
  var lazyNode = 5;
  var managedNode = 6;
  var nonBubblingEvents = ["focus", "blur", "scroll", "load", "unload"];
  function start_(eventWrapper, root, updater, html) {
    return new F(eventWrapper, root, updater, html, false);
  }
  function startFrom_(eventWrapper, root, updater, html) {
    return new F(eventWrapper, root, updater, html, true);
  }
  function resume_(f, html) {
    f.resume(html);
  }
  function F(eventWrapper, root, updater, html, isDry) {
    this.eventWrapper = eventWrapper;
    this.applicationEvents = /* @__PURE__ */ new Map();
    this.root = root;
    this.updater = updater;
    this.cachedHtml = html.node === void 0 ? html : shallowCopy(html);
    if (isDry)
      this.hydrate(this.root, this.cachedHtml);
    else
      this.createAllNodes(this.root, this.cachedHtml);
  }
  F.prototype.hydrate = function(parent, html, referenceNode) {
    switch (html.nodeType) {
      case lazyNode:
        html.node = parent;
        html.rendered = html.render(html.arg);
        html.render = void 0;
        this.hydrate(parent, html.rendered);
        break;
      case textNode2:
        html.node = parent;
        break;
      case managedNode:
        this.createAllNodes(parent, html, referenceNode);
        break;
      default:
        if (html.nodeType === fragmentNode)
          html.node = document.createDocumentFragment();
        else {
          html.node = parent;
          if (html.nodeData.events !== void 0)
            this.createAllEvents(parent, html);
        }
        let htmlChildrenLength;
        if (html.text === void 0 && html.children !== void 0 && (htmlChildrenLength = html.children.length) > 0) {
          let childNodes = parent.childNodes;
          for (let i = 0, cni = 0; i < htmlChildrenLength; ++i, ++cni) {
            let c = html.children[i] = html.children[i].node === void 0 ? html.children[i] : shallowCopy(html.children[i]);
            if (childNodes[cni] === void 0)
              this.createAllNodes(parent, c);
            else {
              if (c.nodeType === fragmentNode) {
                let fragmentChildrenLength = c.children.length;
                c.node = document.createDocumentFragment();
                for (let j = 0; j < fragmentChildrenLength; ++j) {
                  let cf = c.children[j] = c.children[j].node === void 0 ? c.children[j] : shallowCopy(c.children[j]);
                  this.hydrate(childNodes[cni++], cf);
                }
                cni--;
              } else if (c.nodeType === managedNode)
                this.hydrate(parent, c, childNodes[cni]);
              else
                this.hydrate(childNodes[cni], c);
            }
          }
        }
    }
  };
  function shallowCopy(origin) {
    switch (origin.nodeType) {
      case textNode2:
        return {
          nodeType: textNode2,
          node: void 0,
          text: origin.text
        };
      case fragmentNode:
        return {
          nodeType: fragmentNode,
          node: void 0,
          children: origin.children
        };
      case lazyNode:
        return {
          nodeType: lazyNode,
          node: void 0,
          nodeData: origin.nodeData,
          render: origin.render,
          arg: origin.arg,
          rendered: void 0,
          messageMapper: origin.messageMapper
        };
      case managedNode:
        return {
          nodeType: managedNode,
          node: void 0,
          nodeData: origin.nodeData,
          createNode: origin.createNode,
          updateNode: origin.updateNode,
          arg: origin.arg,
          messageMapper: origin.messageMapper
        };
      default:
        return {
          nodeType: origin.nodeType,
          node: void 0,
          tag: origin.tag,
          nodeData: origin.nodeData,
          children: origin.children,
          text: origin.text,
          messageMapper: origin.messageMapper
        };
    }
  }
  F.prototype.createAllNodes = function(parent, html, referenceNode) {
    let node = this.createNode(html);
    if (html.text !== void 0)
      node.textContent = html.text;
    else {
      if (html.children !== void 0)
        this.createChildrenNodes(node, html.children);
      else if (html.rendered !== void 0) {
        if (html.messageMapper !== void 0)
          lazyMessageMap(html.messageMapper, html.rendered);
        if (html.rendered.text !== void 0) {
          node.textContent = html.rendered.text;
        } else if (html.rendered.children !== void 0)
          this.createChildrenNodes(node, html.rendered.children);
      }
    }
    parent.insertBefore(node, referenceNode);
  };
  F.prototype.checkCreateAllNodes = function(parent, html, referenceNode) {
    if (html.node !== void 0)
      html = shallowCopy(html);
    this.createAllNodes(parent, html, referenceNode);
    return html;
  };
  F.prototype.createChildrenNodes = function(parent, children) {
    let childrenLength = children.length;
    for (let i = 0; i < childrenLength; ++i) {
      let html = children[i] = children[i].node === void 0 ? children[i] : shallowCopy(children[i]);
      this.checkCreateAllNodes(parent, html, null);
    }
  };
  F.prototype.createNode = function(html) {
    switch (html.nodeType) {
      case lazyNode:
        html.rendered = html.render(html.arg);
        html.render = void 0;
        return html.node = this.createNode(html.rendered);
      case textNode2:
        return html.node = document.createTextNode(html.text);
      case elementNode2:
        return html.node = this.createElement(html);
      case svgNode:
        return html.node = this.createSvg(html);
      case fragmentNode:
        return html.node = document.createDocumentFragment();
      case managedNode:
        return html.node = this.createManagedNode(html);
    }
  };
  F.prototype.createElement = function(html) {
    let element = document.createElement(html.tag);
    this.createNodeData(element, html, false);
    return element;
  };
  F.prototype.createSvg = function(html) {
    let svg = document.createElementNS(namespace, html.tag);
    this.createNodeData(svg, html, true);
    return svg;
  };
  F.prototype.createManagedNode = function(html) {
    let node = html.createNode(html.arg)();
    html.createNode = void 0;
    this.createNodeData(node, html, node instanceof SVGElement || node.nodeName.toLowerCase() === "svg");
    return node;
  };
  F.prototype.createNodeData = function(node, html, isSvg) {
    if (html.nodeData.styles !== void 0)
      createStyles(node, html.nodeData.styles);
    if (html.nodeData.classes !== void 0 && html.nodeData.classes.length > 0)
      createClasses(node, html.nodeData.classes, isSvg);
    if (html.nodeData.attributes !== void 0)
      createAttributes(node, html.nodeData.attributes);
    if (html.nodeData.properties !== void 0)
      for (let key in html.nodeData.properties)
        node[key] = html.nodeData.properties[key];
    if (html.nodeData.events !== void 0)
      this.createAllEvents(node, html);
  };
  function createStyles(node, styles) {
    for (let key in styles)
      node.style.setProperty(key, styles[key]);
  }
  function createClasses(node, classes, isSvg) {
    let joined = classes.join(" ");
    if (isSvg)
      node.setAttribute("class", joined);
    else
      node.className = joined;
  }
  function createAttributes(node, attributes) {
    for (let key in attributes)
      node.setAttribute(key, attributes[key]);
  }
  F.prototype.createAllEvents = function(node, html) {
    for (let key in html.nodeData.events)
      this.createEvent(node, key, html);
  };
  F.prototype.createEvent = function(node, name2, html) {
    let handlers = html.nodeData.events[name2], eventKey = eventPrefix + name2;
    if (nonBubblingEvents.includes(name2)) {
      let runNonBubblingEvent = this.runNonBubblingEvent(handlers, html.messageMapper);
      node[eventKey] = runNonBubblingEvent;
      node.addEventListener(name2, runNonBubblingEvent, false);
    } else {
      node[eventKey] = handlers;
      if (html.messageMapper !== void 0)
        node[eventKey + eventPostfix] = html.messageMapper;
      let synthetic = this.applicationEvents.get(name2);
      if (synthetic === void 0) {
        let runEvent = this.runEvent.bind(this);
        this.root.addEventListener(name2, runEvent, false);
        this.applicationEvents.set(name2, {
          count: 1,
          handler: runEvent
        });
      } else
        synthetic.count++;
    }
  };
  F.prototype.runNonBubblingEvent = function(handlers, messageMapper2) {
    return function(event) {
      this.runHandlers(handlers, messageMapper2, event);
    }.bind(this);
  };
  F.prototype.runEvent = function(event) {
    let node = event.target, eventKey = eventPrefix + event.type;
    while (node !== this.root) {
      let handlers = node[eventKey];
      if (handlers !== void 0) {
        this.runHandlers(handlers, node[eventKey + eventPostfix], event);
        return;
      }
      node = node.parentNode;
    }
  };
  F.prototype.runHandlers = function(handlers, messageMapper2, event) {
    let handlersLength = handlers.length;
    for (let i = 0; i < handlersLength; ++i) {
      let h = handlers[i], maybeMessage = typeof h === "function" ? h(event)() : this.eventWrapper(h);
      this.updater(messageMapper2 === void 0 ? maybeMessage : messageMapper2(maybeMessage))();
    }
    event.stopPropagation();
  };
  F.prototype.resume = function(updatedHtml) {
    this.cachedHtml = this.updateAllNodes(this.root, this.cachedHtml, updatedHtml);
  };
  F.prototype.updateAllNodes = function(parent, currentHtml2, updatedHtml) {
    if (updatedHtml.node !== void 0)
      updatedHtml = shallowCopy(updatedHtml);
    if (currentHtml2.tag !== updatedHtml.tag || currentHtml2.nodeType !== updatedHtml.nodeType) {
      if (currentHtml2.nodeType === fragmentNode) {
        this.createAllNodes(parent, updatedHtml, firstFragmentChildNode(currentHtml2.children));
        removeFragmentChildren(parent, currentHtml2.children);
      } else {
        this.createAllNodes(parent, updatedHtml, currentHtml2.node);
        parent.removeChild(currentHtml2.node);
      }
    } else {
      updatedHtml.node = currentHtml2.node;
      switch (updatedHtml.nodeType) {
        case lazyNode:
          if (updatedHtml.arg !== currentHtml2.arg) {
            updatedHtml.rendered = updatedHtml.render(updatedHtml.arg);
            if (updatedHtml.messageMapper !== void 0)
              lazyMessageMap(updatedHtml.messageMapper, updatedHtml.rendered);
            this.updateAllNodes(parent, currentHtml2.rendered, updatedHtml.rendered);
          } else
            updatedHtml.rendered = currentHtml2.rendered;
          updatedHtml.render = void 0;
          break;
        case managedNode:
          let node = updatedHtml.updateNode(currentHtml2.node)(currentHtml2.arg)(updatedHtml.arg)(), isSvg = node instanceof SVGElement || node.nodeName.toLowerCase() === "svg";
          if (node !== currentHtml2.node || node.nodeType !== currentHtml2.node.nodeType || node.nodeName !== currentHtml2.node.nodeName) {
            this.createNodeData(node, updatedHtml, isSvg);
            parent.insertBefore(node, currentHtml2.node);
            parent.removeChild(currentHtml2.node);
          } else
            this.updateNodeData(node, currentHtml2.nodeData, updatedHtml, isSvg);
          updatedHtml.node = node;
          break;
        //text nodes can have only their textContent changed
        case textNode2:
          if (updatedHtml.text !== currentHtml2.text)
            updatedHtml.node.textContent = updatedHtml.text;
          break;
        //parent instead of currentHtml.node, as fragments nodes only count for their children
        case fragmentNode:
          this.updateChildrenNodes(parent, currentHtml2, updatedHtml);
          break;
        //the usual case, element/svg to be patched
        default:
          this.updateNodeData(currentHtml2.node, currentHtml2.nodeData, updatedHtml, updatedHtml.nodeType == svgNode);
          if ((updatedHtml.text !== void 0 || updatedHtml.children === void 0 && currentHtml2.text != void 0) && !hasInnerHtml(updatedHtml.nodeData) && updatedHtml.text != currentHtml2.node.textContent)
            currentHtml2.node.textContent = updatedHtml.text;
          else
            this.updateChildrenNodes(currentHtml2.node, currentHtml2, updatedHtml);
      }
    }
    return updatedHtml;
  };
  function firstFragmentChildNode(children) {
    let childrenLength = children.length;
    for (let i = 0; i < childrenLength; ++i) {
      if (children[i].nodeType === fragmentNode)
        return firstFragmentChildNode(children[i].children);
      return children[i].node;
    }
    return void 0;
  }
  function removeFragmentChildren(parent, children) {
    let childrenLength = children.length;
    for (let i = 0; i < childrenLength; ++i)
      if (children[i].nodeType === fragmentNode)
        removeFragmentChildren(children[i].children);
      else
        parent.removeChild(children[i].node);
  }
  function clearNode(node) {
    node.textContent = "";
  }
  F.prototype.updateChildrenNodes = function(parent, currentHtml2, updatedHtml) {
    let currentChildren = currentHtml2.children, updatedChildren = updatedHtml.children;
    if (currentChildren === void 0 || currentChildren.length === 0) {
      let updatedChildrenLength;
      if (updatedChildren !== void 0 && (updatedChildrenLength = updatedChildren.length) > 0) {
        if (currentHtml2.text !== void 0 || hasInnerHtml(currentHtml2.nodeData))
          clearNode(parent);
        for (let i = 0; i < updatedChildrenLength; ++i)
          updatedChildren[i] = this.checkCreateAllNodes(parent, updatedChildren[i]);
      }
    } else if (updatedChildren === void 0 || updatedChildren.length === 0) {
      if (currentChildren !== void 0 && (currentChildren.length > 0 || currentHtml2.text !== void 0) && !hasInnerHtml(updatedHtml.nodeData))
        clearNode(parent);
    } else if (currentChildren[0].nodeData !== void 0 && currentChildren[0].nodeData.key !== void 0 && updatedChildren[0].nodeData !== void 0 && updatedChildren[0].nodeData.key !== void 0)
      this.updateKeyedChildrenNodes(parent, currentChildren, updatedChildren);
    else
      this.updateNonKeyedChildrenNodes(parent, currentChildren, updatedChildren);
  };
  function hasInnerHtml(parentNodeData) {
    return parentNodeData !== void 0 && parentNodeData.properties !== void 0 && parentNodeData.properties.innerHTML !== void 0;
  }
  F.prototype.updateKeyedChildrenNodes = function(parent, currentChildren, updatedChildren) {
    let currentStart = 0, updatedStart = 0, currentEnd = currentChildren.length - 1, updatedEnd = updatedChildren.length - 1;
    let afterNode, currentStartNode = currentChildren[currentStart].node, updatedStartNode = currentStartNode, currentEndNode = currentChildren[currentEnd].node;
    let loop = true;
    fixes: while (loop) {
      loop = false;
      let currentHtml2 = currentChildren[currentStart], updatedHtml = updatedChildren[updatedStart];
      while (currentHtml2.nodeData.key === updatedHtml.nodeData.key) {
        updatedHtml = this.updateAllNodes(parent, currentHtml2, updatedHtml);
        updatedStartNode = currentStartNode = currentHtml2.node.nextSibling;
        currentStart++;
        updatedStart++;
        if (currentEnd < currentStart || updatedEnd < updatedStart)
          break fixes;
        currentHtml2 = currentChildren[currentStart];
        updatedHtml = updatedChildren[updatedStart];
      }
      currentHtml2 = currentChildren[currentEnd];
      updatedHtml = updatedChildren[updatedEnd];
      while (currentHtml2.nodeData.key === updatedHtml.nodeData.key) {
        updatedHtml = this.updateAllNodes(parent, currentHtml2, updatedHtml);
        afterNode = currentEndNode;
        currentEndNode = currentEndNode.previousSibling;
        currentEnd--;
        updatedEnd--;
        if (currentEnd < currentStart || updatedEnd < updatedStart)
          break fixes;
        currentHtml2 = currentChildren[currentEnd];
        updatedHtml = updatedChildren[updatedEnd];
      }
      currentHtml2 = currentChildren[currentEnd];
      updatedHtml = updatedChildren[updatedStart];
      while (currentHtml2.nodeData.key === updatedHtml.nodeData.key) {
        loop = true;
        updatedHtml = this.updateAllNodes(parent, currentHtml2, updatedHtml);
        currentEndNode = currentHtml2.node.previousSibling;
        parent.insertBefore(currentHtml2.node, updatedStartNode);
        updatedStart++;
        currentEnd--;
        if (currentEnd < currentStart || updatedEnd < updatedStart)
          break fixes;
        currentHtml2 = currentChildren[currentEnd];
        updatedHtml = updatedChildren[updatedStart];
      }
      currentHtml2 = currentChildren[currentStart];
      updatedHtml = updatedChildren[updatedEnd];
      while (currentHtml2.nodeData.key === updatedHtml.nodeData.key) {
        loop = true;
        updatedHtml = this.updateAllNodes(parent, currentHtml2, updatedHtml);
        parent.insertBefore(currentHtml2.node, afterNode);
        afterNode = currentHtml2.node;
        currentStart++;
        updatedEnd--;
        if (currentEnd < currentStart || updatedEnd < updatedStart)
          break fixes;
        currentHtml2 = currentChildren[currentStart];
        updatedHtml = updatedChildren[updatedEnd];
      }
    }
    if (updatedEnd < updatedStart)
      while (currentStart <= currentEnd) {
        parent.removeChild(currentChildren[currentEnd].node);
        currentEnd--;
      }
    else if (currentEnd < currentStart)
      while (updatedStart <= updatedEnd) {
        updatedChildren[updatedStart] = this.checkCreateAllNodes(parent, updatedChildren[updatedStart], afterNode);
        updatedStart++;
      }
    else {
      let P = new Int32Array(updatedEnd + 1 - updatedStart);
      let I = /* @__PURE__ */ new Map();
      for (let i = updatedStart; i <= updatedEnd; i++) {
        P[i] = -1;
        I.set(updatedChildren[i].nodeData.key, i);
      }
      let reusingNodes = updatedStart + updatedChildren.length - 1 - updatedEnd, toRemove = [];
      for (let i = currentStart; i <= currentEnd; i++)
        if (I.has(currentChildren[i].nodeData.key)) {
          P[I.get(currentChildren[i].nodeData.key)] = i;
          reusingNodes++;
        } else
          toRemove.push(i);
      if (reusingNodes === 0) {
        parent.textContent = "";
        for (let i = updatedStart; i <= updatedEnd; i++)
          updatedChildren[i] = this.checkCreateAllNodes(parent, updatedChildren[i]);
      } else {
        let toRemoveLength = toRemove.length;
        for (let i = 0; i < toRemoveLength; i++)
          parent.removeChild(currentChildren[toRemove[i]].node);
        let longestSeq = longestSubsequence(P, updatedStart), seqIndex = longestSeq.length - 1;
        for (let i = updatedEnd; i >= updatedStart; i--) {
          if (longestSeq[seqIndex] === i) {
            currentHtml = currentChildren[P[longestSeq[seqIndex]]];
            updatedChildren[i] = this.updateAllNodes(parent, currentHtml, updatedChildren[i]);
            afterNode = currentHtml.node;
            seqIndex--;
          } else {
            if (P[i] === -1) {
              updatedChildren[i] = this.checkCreateAllNodes(parent, updatedChildren[i], afterNode);
              afterNode = updatedChildren[i].node;
            } else {
              currentHtml = currentChildren[P[i]];
              updatedChildren[i] = this.updateAllNodes(parent, currentHtml, updatedChildren[i]);
              parent.insertBefore(currentHtml.node, afterNode);
              afterNode = currentHtml.node;
            }
          }
        }
      }
    }
  };
  function longestSubsequence(ns, updatedStart) {
    let seq = [], is = [], l = -1, i, len, pre = new Int32Array(ns.length);
    for (i = updatedStart, len = ns.length; i < len; i++) {
      let n = ns[i];
      if (n < 0)
        continue;
      let j = findGreatestIndex(seq, n);
      if (j !== -1)
        pre[i] = is[j];
      if (j === l) {
        l++;
        seq[l] = n;
        is[l] = i;
      } else if (n < seq[j + 1]) {
        seq[j + 1] = n;
        is[j + 1] = i;
      }
    }
    for (i = is[l]; l >= 0; i = pre[i], l--)
      seq[l] = i;
    return seq;
  }
  function findGreatestIndex(seq, n) {
    let lo = -1, hi = seq.length;
    if (hi > 0 && seq[hi - 1] <= n)
      return hi - 1;
    while (hi - lo > 1) {
      let mid = Math.floor((lo + hi) / 2);
      if (seq[mid] > n)
        hi = mid;
      else
        lo = mid;
    }
    return lo;
  }
  F.prototype.updateNonKeyedChildrenNodes = function(parent, currentChildren, updatedChildren) {
    let currentChildrenLength = currentChildren.length, updatedChildrenLength = updatedChildren.length, commonLength = Math.min(currentChildrenLength, updatedChildrenLength);
    for (let i = 0; i < commonLength; ++i)
      updatedChildren[i] = this.updateAllNodes(parent, currentChildren[i], updatedChildren[i]);
    if (currentChildrenLength < updatedChildrenLength)
      for (let i = commonLength; i < updatedChildrenLength; ++i)
        updatedChildren[i] = this.checkCreateAllNodes(parent, updatedChildren[i]);
    else if (currentChildrenLength > updatedChildrenLength)
      for (let i = commonLength; i < currentChildrenLength; ++i)
        parent.removeChild(currentChildren[i].node);
  };
  F.prototype.updateNodeData = function(node, currentNodeData, updatedHtml, isSvg) {
    updateStyles(node, currentNodeData.styles, updatedHtml.nodeData.styles);
    updateAttributes(node, currentNodeData.attributes, updatedHtml.nodeData.attributes);
    updateClasses(node, currentNodeData.classes, updatedHtml.nodeData.classes, isSvg);
    updateProperties(node, currentNodeData.properties, updatedHtml.nodeData.properties);
    this.updateEvents(node, currentNodeData.events, updatedHtml);
  };
  function updateStyles(node, currentStyles, updatedStyles) {
    if (currentStyles === void 0) {
      if (updatedStyles !== void 0)
        createStyles(node, updatedStyles);
    } else if (updatedStyles === void 0) {
      if (currentStyles !== void 0)
        node.removeAttribute("style");
    } else {
      let matchCount = 0;
      for (let key in currentStyles) {
        let current = currentStyles[key], updated = updatedStyles[key], hasUpdated = updatedStyles[key] !== void 0;
        if (hasUpdated)
          matchCount++;
        if (current !== updated)
          if (hasUpdated)
            node.style.setProperty(key, updated);
          else
            node.style.removeProperty(key);
      }
      let newKeys = Object.keys(updatedStyles), newKeysLength = newKeys.length;
      for (let i = 0; matchCount < newKeysLength && i < newKeysLength; ++i) {
        let key = newKeys[i];
        if (currentStyles[key] === void 0) {
          let updated = updatedStyles[key];
          ++matchCount;
          node.style.setProperty(key, updated);
        }
      }
    }
  }
  function updateClasses(node, currentClasses, updatedClasses, isSvg) {
    let classUpdated = updatedClasses !== void 0 && updatedClasses.length > 0;
    if (currentClasses !== void 0 && currentClasses.length > 0 && !classUpdated)
      createClasses(node, [], isSvg);
    else if (classUpdated)
      createClasses(node, updatedClasses, isSvg);
  }
  function updateAttributes(node, currentAttributes, updatedAttributes) {
    if (currentAttributes === void 0) {
      if (updatedAttributes !== void 0)
        createAttributes(node, updatedAttributes);
    } else if (updatedAttributes === void 0) {
      if (currentAttributes !== void 0)
        for (let key in currentAttributes)
          node.removeAttribute(key);
    } else {
      let matchCount = 0;
      for (let key in currentAttributes) {
        let current = currentAttributes[key], updated = updatedAttributes[key], hasUpdated = updated !== void 0;
        if (hasUpdated)
          matchCount++;
        if (current !== updated)
          if (hasUpdated)
            node.setAttribute(key, updated);
          else
            node.removeAttribute(key);
      }
      let newKeys = Object.keys(updatedAttributes), newKeysLength = newKeys.length;
      for (let i = 0; matchCount < newKeysLength && i < newKeysLength; ++i) {
        let key = newKeys[i];
        if (currentAttributes[key] === void 0) {
          let updated = updatedAttributes[key];
          ++matchCount;
          node.setAttribute(key, updated);
        }
      }
    }
  }
  function updateProperties(node, currentProperties, updatedProperties) {
    let addAll = currentProperties === void 0, removeAll = updatedProperties === void 0;
    if (addAll) {
      if (!removeAll)
        for (let key in updatedProperties)
          node[key] = updatedProperties[key];
    } else if (removeAll) {
      if (!addAll)
        for (let key in currentProperties)
          node.removeAttribute(key);
    } else {
      let matchCount = 0;
      for (let key in currentProperties) {
        let current = currentProperties[key], updated = updatedProperties[key], hasUpdated = updated !== void 0;
        if (hasUpdated)
          matchCount++;
        if (current !== updated)
          if (hasUpdated)
            node[key] = updated;
          else
            node.removeAttribute(key);
      }
      let newKeys = Object.keys(updatedProperties), newKeysLength = newKeys.length;
      for (let i = 0; matchCount < newKeysLength && i < newKeysLength; ++i) {
        let key = newKeys[i];
        if (currentProperties[key] === void 0) {
          let updated = updatedProperties[key];
          ++matchCount;
          node[key] = updated;
        }
      }
    }
  }
  F.prototype.updateEvents = function(node, currentEvents, updatedHtml) {
    let updatedEvents = updatedHtml.nodeData.events;
    if (currentEvents === void 0) {
      if (updatedEvents !== void 0)
        this.createAllEvents(node, updatedHtml);
    } else if (updatedEvents === void 0) {
      if (currentEvents !== void 0)
        for (let key in currentEvents)
          this.removeEvent(node, key);
    } else {
      let matchCount = 0;
      for (let key in currentEvents) {
        let current = currentEvents[key], updated = updatedEvents[key], hasUpdated = false;
        if (updated === void 0)
          this.removeEvent(node, key);
        else {
          let currentLength = current.length, updatedLength = updated.length;
          if (currentLength != updatedLength)
            hasUpdated = true;
          else {
            for (let i = 0; i < currentLength; ++i)
              if (current[i] != updated[i]) {
                hasUpdated = true;
                break;
              }
          }
        }
        if (hasUpdated) {
          matchCount++;
          this.removeEvent(node, key);
          this.createEvent(node, key, updatedHtml);
        }
      }
      let newKeys = Object.keys(updatedEvents), newKeysLength = newKeys.length;
      for (let i = 0; matchCount < newKeysLength && i < newKeysLength; ++i) {
        let key = newKeys[i];
        if (currentEvents[key] === void 0) {
          ++matchCount;
          this.createEvent(node, key, updatedHtml);
        }
      }
    }
  };
  F.prototype.removeEvent = function(node, name2) {
    let eventKey = eventPrefix + name2;
    if (nonBubblingEvents.includes(name2)) {
      let runNonBubblingEvent = node[eventKey];
      node.removeEventListener(name2, runNonBubblingEvent, false);
    } else {
      let count = --this.applicationEvents.get(name2).count;
      if (count === 0) {
        this.root.removeEventListener(name2, this.applicationEvents.get(name2).handler, false);
        this.applicationEvents.delete(name2);
      }
    }
    node[eventKey + eventPostfix] = void 0;
    node[eventKey] = void 0;
  };
  function lazyMessageMap(mapper, html) {
    html.messageMapper = mapper;
    if (html.children !== void 0 && html.children.length > 0)
      for (let i = 0; i < html.children.length; ++i)
        lazyMessageMap(mapper, html.children[i]);
  }

  // output/Flame.Renderer.Internal.Dom/index.js
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var resume = /* @__PURE__ */ runEffectFn2(resume_);
  var maybeUpdater = function(updater) {
    return function(v) {
      if (v instanceof Just) {
        return updater(v.value0);
      }
      ;
      return pure2(unit);
    };
  };
  var start = function(parent) {
    return function(updater) {
      return runEffectFn4(start_)(Just.create)(parent)(maybeUpdater(updater));
    };
  };
  var startFrom = function(parent) {
    return function(updater) {
      return runEffectFn4(startFrom_)(Just.create)(parent)(maybeUpdater(updater));
    };
  };

  // output/Flame.Subscription.Internal.Listener/foreign.js
  var applicationIds = /* @__PURE__ */ new Set();
  function checkApplicationId_(id3) {
    if (applicationIds.has(id3))
      throw `Error mounting application: id ${id3} already registered!`;
    applicationIds.add(id3);
  }

  // output/Flame.Types/index.js
  var Window = /* @__PURE__ */ function() {
    function Window2() {
    }
    ;
    Window2.value = new Window2();
    return Window2;
  }();
  var Document = /* @__PURE__ */ function() {
    function Document2() {
    }
    ;
    Document2.value = new Document2();
    return Document2;
  }();
  var Custom = /* @__PURE__ */ function() {
    function Custom2() {
    }
    ;
    Custom2.value = new Custom2();
    return Custom2;
  }();

  // output/Foreign/foreign.js
  var isArray = Array.isArray || function(value2) {
    return Object.prototype.toString.call(value2) === "[object Array]";
  };

  // output/Foreign/index.js
  var unsafeFromForeign = unsafeCoerce2;

  // output/Flame.Subscription.Internal.Listener/index.js
  var createSubscription = function(updater) {
    return function(v) {
      if (v.value0 instanceof Window) {
        return createWindowListener(v.value1.value0)(function($13) {
          return updater(v.value1.value1.value0($13));
        });
      }
      ;
      if (v.value0 instanceof Document) {
        return createDocumentListener(v.value1.value0)(function($14) {
          return updater(v.value1.value1.value0($14));
        });
      }
      ;
      if (v.value0 instanceof Custom) {
        return createCustomListener(v.value1.value0)(function($15) {
          return updater(v.value1.value1.value0($15));
        });
      }
      ;
      throw new Error("Failed pattern match at Flame.Subscription.Internal.Listener (line 31, column 83 - line 34, column 75): " + [v.value0.constructor.name]);
    };
  };
  var checkApplicationId = /* @__PURE__ */ runEffectFn1(checkApplicationId_);
  var createMessageListener = function(appId) {
    return function(updater) {
      return function __do3() {
        checkApplicationId(appId)();
        return createCustomListener(appId)(function($16) {
          return updater(unsafeFromForeign($16));
        })();
      };
    };
  };

  // output/Flame.Application.Effectful/index.js
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableArray);
  var map5 = /* @__PURE__ */ map(functorMaybe);
  var showId = function(dictShow) {
    var show3 = show(dictShow);
    return function(v) {
      return show3(v);
    };
  };
  var run3 = function(parent) {
    return function(isResumed) {
      return function(appId) {
        return function(v) {
          return function __do3() {
            var modelState = $$new(v.init.value0)();
            var renderingState = $$new(21)();
            var render3 = function(recordUpdate) {
              return function __do4() {
                var model = read(modelState)();
                var rendering2 = read(renderingState)();
                var updatedModel = recordUpdate(model);
                resume(rendering2)(v.view(updatedModel))();
                return write(updatedModel)(modelState)();
              };
            };
            var renderFromUpdate = function(recordUpdate) {
              return liftEffect3(render3(recordUpdate));
            };
            var runUpdate = function(message2) {
              return function __do4() {
                var model = read(modelState)();
                return runAff_(either(function($72) {
                  return log2(message($72));
                })(render3))(v.update({
                  display: renderFromUpdate,
                  model,
                  message: message2
                }))();
              };
            };
            var rendering = function() {
              if (isResumed) {
                return startFrom(parent)(runUpdate)(v.view(v.init.value0))();
              }
              ;
              return start(parent)(runUpdate)(v.view(v.init.value0))();
            }();
            write(rendering)(renderingState)();
            (function() {
              if (v.init.value1 instanceof Nothing) {
                return unit;
              }
              ;
              if (v.init.value1 instanceof Just) {
                return runUpdate(v.init.value1.value0)();
              }
              ;
              throw new Error("Failed pattern match at Flame.Application.Effectful (line 167, column 7 - line 169, column 45): " + [v.init.value1.constructor.name]);
            })();
            (function() {
              if (appId instanceof Nothing) {
                return unit;
              }
              ;
              if (appId instanceof Just) {
                return createMessageListener(appId.value0)(runUpdate)();
              }
              ;
              throw new Error("Failed pattern match at Flame.Application.Effectful (line 172, column 7 - line 174, column 62): " + [appId.constructor.name]);
            })();
            return traverse_2(createSubscription(runUpdate))(v.subscribe)();
          };
        };
      };
    };
  };
  var noAppId = /* @__PURE__ */ function() {
    return Nothing.value;
  }();
  var mountWith = function(dictShow) {
    var showId1 = showId(dictShow);
    return function(v) {
      return function(appId) {
        return function(application) {
          return function __do3() {
            var maybeElement = querySelector(v)();
            if (maybeElement instanceof Just) {
              return run3(maybeElement.value0)(false)(map5(showId1)(appId))(application)();
            }
            ;
            if (maybeElement instanceof Nothing) {
              return $$throw("Error mounting application")();
            }
            ;
            throw new Error("Failed pattern match at Flame.Application.Effectful (line 134, column 7 - line 136, column 62): " + [maybeElement.constructor.name]);
          };
        };
      };
    };
  };
  var mountWith1 = /* @__PURE__ */ mountWith(showUnit);
  var mount_ = function(selector) {
    return mountWith1(selector)(noAppId);
  };

  // output/Flame.Html.Event/foreign.js
  var messageEventData = 5;
  var rawEventData = 6;
  function createEvent_(name2) {
    return function(message2) {
      return [messageEventData, name2, message2];
    };
  }
  function createRawEvent_(name2) {
    return function(handler) {
      return [rawEventData, name2, handler];
    };
  }
  function nodeValue_(event) {
    if (event.target.contentEditable === true || event.target.contentEditable === "true" || event.target.contentEditable === "")
      return event.target.innerText;
    return event.target.value;
  }

  // output/Flame.Html.Event/index.js
  var map6 = /* @__PURE__ */ map(functorEffect);
  var nodeValue = /* @__PURE__ */ runEffectFn1(nodeValue_);
  var createRawEvent = function(name2) {
    return function(handler) {
      return createRawEvent_(name2)(handler);
    };
  };
  var onInput = function(constructor) {
    var handler = function(event) {
      return map6(function($6) {
        return Just.create(constructor($6));
      })(nodeValue(event));
    };
    return createRawEvent("input")(handler);
  };
  var createEvent = function(name2) {
    return function(message2) {
      return createEvent_(name2)(message2);
    };
  };
  var onClick = /* @__PURE__ */ createEvent("click");

  // output/Htmls/index.js
  var toClassListClasses = {
    to: function(v) {
      return v;
    }
  };

  // output/Main/index.js
  var toNodeArray2 = /* @__PURE__ */ toNodeArray(toNodeNodeDataNodeData);
  var toNodeArray1 = /* @__PURE__ */ toNodeArray(toNodeHtmlHtml);
  var li2 = /* @__PURE__ */ li(toNodeArray2)(toNodeArray1);
  var class$prime2 = /* @__PURE__ */ class$prime(toClassListString);
  var div4 = /* @__PURE__ */ div3(toNodeArray2)(toNodeArray1);
  var class$prime1 = /* @__PURE__ */ class$prime(toClassListClasses);
  var input2 = /* @__PURE__ */ input(toNodeArray2);
  var button2 = /* @__PURE__ */ button(toNodeArray2)(toNodeArray1);
  var label2 = /* @__PURE__ */ label(toNodeArray2)(toNodeArray1);
  var span4 = /* @__PURE__ */ span(toNodeArray2)(toNodeArray1);
  var pure3 = /* @__PURE__ */ pure(applicativeAff);
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var bind2 = /* @__PURE__ */ bind(bindAff);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var make2 = /* @__PURE__ */ make(monadEffectEffect);
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var map7 = /* @__PURE__ */ map(functorArray);
  var eq12 = /* @__PURE__ */ eq(eqUUIDv4);
  var notEq2 = /* @__PURE__ */ notEq(eqUUIDv4);
  var fromJust4 = /* @__PURE__ */ fromJust();
  var i$prime2 = /* @__PURE__ */ i$prime(toNodeArray2);
  var ul2 = /* @__PURE__ */ ul(toNodeArray2)(/* @__PURE__ */ toNodeArray(toNodeArray1));
  var All = /* @__PURE__ */ function() {
    function All2() {
    }
    ;
    All2.value = new All2();
    return All2;
  }();
  var Active = /* @__PURE__ */ function() {
    function Active2() {
    }
    ;
    Active2.value = new Active2();
    return Active2;
  }();
  var Completed = /* @__PURE__ */ function() {
    function Completed2() {
    }
    ;
    Completed2.value = new Completed2();
    return Completed2;
  }();
  var SetNewTodo = /* @__PURE__ */ function() {
    function SetNewTodo2(value0) {
      this.value0 = value0;
    }
    ;
    SetNewTodo2.create = function(value0) {
      return new SetNewTodo2(value0);
    };
    return SetNewTodo2;
  }();
  var AddNewTodo = /* @__PURE__ */ function() {
    function AddNewTodo2() {
    }
    ;
    AddNewTodo2.value = new AddNewTodo2();
    return AddNewTodo2;
  }();
  var ToggleCompleted = /* @__PURE__ */ function() {
    function ToggleCompleted2(value0) {
      this.value0 = value0;
    }
    ;
    ToggleCompleted2.create = function(value0) {
      return new ToggleCompleted2(value0);
    };
    return ToggleCompleted2;
  }();
  var DeleteTodo = /* @__PURE__ */ function() {
    function DeleteTodo2(value0) {
      this.value0 = value0;
    }
    ;
    DeleteTodo2.create = function(value0) {
      return new DeleteTodo2(value0);
    };
    return DeleteTodo2;
  }();
  var CancelEdit = /* @__PURE__ */ function() {
    function CancelEdit2(value0) {
      this.value0 = value0;
    }
    ;
    CancelEdit2.create = function(value0) {
      return new CancelEdit2(value0);
    };
    return CancelEdit2;
  }();
  var ApplyEdit = /* @__PURE__ */ function() {
    function ApplyEdit2(value0) {
      this.value0 = value0;
    }
    ;
    ApplyEdit2.create = function(value0) {
      return new ApplyEdit2(value0);
    };
    return ApplyEdit2;
  }();
  var StartEdit = /* @__PURE__ */ function() {
    function StartEdit2(value0) {
      this.value0 = value0;
    }
    ;
    StartEdit2.create = function(value0) {
      return new StartEdit2(value0);
    };
    return StartEdit2;
  }();
  var SetEditDescription = /* @__PURE__ */ function() {
    function SetEditDescription2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    SetEditDescription2.create = function(value0) {
      return function(value1) {
        return new SetEditDescription2(value0, value1);
      };
    };
    return SetEditDescription2;
  }();
  var SetFilter = /* @__PURE__ */ function() {
    function SetFilter2(value0) {
      this.value0 = value0;
    }
    ;
    SetFilter2.create = function(value0) {
      return new SetFilter2(value0);
    };
    return SetFilter2;
  }();
  var viewTodo = function(todo) {
    return li2([class$prime2("py-4")])([div4([class$prime1(["flex", "items-center"])])([input2([class$prime1(["h-4", "w-4", "text-teal-600", "focus:ring-teal-500", "border-gray-300", "rounded"]), type$prime("checkbox"), checked(todo.completed), onClick(new ToggleCompleted(todo.id))]), button2([class$prime1(["h-8", "w-8", "text-teal-600", "focus:ring-teal-500", "rounded"]), onClick(new DeleteTodo(todo.id))])([text("X")]), label2([class$prime1(["ml-3", "block", "text-gray-900"])])([span4([class$prime1(["text-lg", "font-medium"])])([text(todo.description)])])])]);
  };
  var update = function(v) {
    if (v.message instanceof SetNewTodo) {
      return pure3(function(v1) {
        return {
          filterType: v.model.filterType,
          todoBeingEdited: v.model.todoBeingEdited,
          todoList: v.model.todoList,
          newTodo: v.message.value0
        };
      });
    }
    ;
    if (v.message instanceof AddNewTodo) {
      if (v.model.newTodo === "") {
        return pure3(identity5);
      }
      ;
      if (otherwise) {
        return bind2(liftEffect4(make2))(function(newTodoId) {
          return pure3(function(v1) {
            return {
              filterType: v.model.filterType,
              todoBeingEdited: v.model.todoBeingEdited,
              newTodo: "",
              todoList: append2(v.model.todoList)([{
                id: newTodoId,
                description: v.model.newTodo,
                completed: false
              }])
            };
          });
        });
      }
      ;
    }
    ;
    if (v.message instanceof ToggleCompleted) {
      return pure3(function(v1) {
        return {
          filterType: v.model.filterType,
          newTodo: v.model.newTodo,
          todoBeingEdited: v.model.todoBeingEdited,
          todoList: map7(function(todo) {
            var $70 = eq12(todo.id)(v.message.value0);
            if ($70) {
              return {
                id: todo.id,
                description: todo.description,
                completed: !todo.completed
              };
            }
            ;
            return todo;
          })(v.model.todoList)
        };
      });
    }
    ;
    if (v.message instanceof DeleteTodo) {
      return pure3(function(v1) {
        return {
          filterType: v.model.filterType,
          newTodo: v.model.newTodo,
          todoBeingEdited: v.model.todoBeingEdited,
          todoList: filter(function(todo) {
            return notEq2(todo.id)(v.message.value0);
          })(v.model.todoList)
        };
      });
    }
    ;
    if (v.message instanceof CancelEdit) {
      return pure3(function(v1) {
        return {
          filterType: v.model.filterType,
          newTodo: v.model.newTodo,
          todoList: v.model.todoList,
          todoBeingEdited: []
        };
      });
    }
    ;
    if (v.message instanceof ApplyEdit) {
      var tbe = fromJust4(head(filter(function(todo) {
        return eq12(todo.id)(v.message.value0);
      })(v.model.todoBeingEdited)));
      var newTbe = filter(function(t) {
        return notEq2(t.id)(v.message.value0);
      })(v.model.todoBeingEdited);
      return pure3(function(v1) {
        return {
          filterType: v.model.filterType,
          newTodo: v.model.newTodo,
          todoList: map7(function(todo) {
            var $74 = eq12(todo.id)(tbe.id);
            if ($74) {
              return {
                id: todo.id,
                completed: todo.completed,
                description: tbe.description
              };
            }
            ;
            return todo;
          })(v.model.todoList),
          todoBeingEdited: newTbe
        };
      });
    }
    ;
    if (v.message instanceof StartEdit) {
      var desc = function() {
        var $91 = map7(function(todo) {
          return todo.description;
        });
        return function($92) {
          return fromJust4(head($91($92)));
        };
      }()(filter(function(todo) {
        return eq12(todo.id)(v.message.value0);
      })(v.model.todoList));
      return pure3(function(v1) {
        return {
          filterType: v.model.filterType,
          newTodo: v.model.newTodo,
          todoList: v.model.todoList,
          todoBeingEdited: append2([{
            id: v.message.value0,
            description: desc,
            hasUpdate: false
          }])(v.model.todoBeingEdited)
        };
      });
    }
    ;
    if (v.message instanceof SetEditDescription) {
      var todoBeingEdited = fromJust4(head(filter(function(todo) {
        return eq12(todo.id)(v.message.value0);
      })(v.model.todoBeingEdited)));
      var originalTodo = function($94) {
        return fromJust4(head($94));
      }(filter(function(todo) {
        return eq12(todo.id)(todoBeingEdited.id);
      })(v.model.todoList));
      var changed = v.message.value1 !== originalTodo.description;
      var newTodoBeingEdited = map7(function(t) {
        var $77 = eq12(t.id)(v.message.value0);
        if ($77) {
          return {
            id: t.id,
            description: v.message.value1,
            hasUpdate: changed
          };
        }
        ;
        return t;
      })(v.model.todoBeingEdited);
      return pure3(function(v1) {
        return {
          filterType: v.model.filterType,
          newTodo: v.model.newTodo,
          todoList: v.model.todoList,
          todoBeingEdited: newTodoBeingEdited
        };
      });
    }
    ;
    if (v.message instanceof SetFilter) {
      return pure3(function(v1) {
        return {
          newTodo: v.model.newTodo,
          todoBeingEdited: v.model.todoBeingEdited,
          todoList: v.model.todoList,
          filterType: v.message.value0
        };
      });
    }
    ;
    throw new Error("Failed pattern match at Main (line 73, column 29 - line 142, column 57): " + [v.message.constructor.name]);
  };
  var subscribe = [];
  var inputField = function(model) {
    return div4([class$prime1(["w-full", "max-w-sm", "mx-auto", "px-4", "py-2"])])([div4([class$prime1(["flex", "items-center", "border-b-2", "border-teal-500", "py-2"])])([input2([class$prime1(["appearance-none", "bg-transparent", "border-none", "w-full", "text-gray-700", "mr-3", "py-1", "px-2", "leading-tight", "focus:outline-none"]), type$prime("text"), placeholder("Add a new todo"), value(model.newTodo), onInput(SetNewTodo.create)]), button2([class$prime1(["flex-shrink-0", "bg-teal-500", "hover:bg-teal-700", "border-teal-500", "hover:border-teal-700", "text-sm", "border-4", "text-white", "py-1", "px-2", "rounded"]), onClick(AddNewTodo.value)])([text("Add")])])]);
  };
  var initGen = function __do() {
    var uuid01 = make2();
    var uuid02 = make2();
    return new Tuple({
      todoList: [{
        id: uuid01,
        description: "Buy milk",
        completed: false
      }, {
        id: uuid02,
        description: "Do laundry",
        completed: true
      }],
      newTodo: "",
      todoBeingEdited: [],
      filterType: All.value
    }, Nothing.value);
  };
  var editTodo = function(todo) {
    return div4([class$prime2("box")])([div4([class$prime2("field"), class$prime2("is-grouped")])([div4([class$prime2("control"), class$prime2("is-expanded")])([input2([class$prime2("input"), class$prime2("is-medium"), value(todo.description), onInput(SetEditDescription.create(todo.id))])]), div4([class$prime2("control"), class$prime2("buttons")])([button2([class$prime2("button"), class$prime2("is-primary"), onClick(new ApplyEdit(todo.id)), disabled(!todo.hasUpdate)])([i$prime2([class$prime2("fa"), class$prime2("fa-save")])]), button2([class$prime2("button"), class$prime2("is-warning"), onClick(new CancelEdit(todo.id))])([i$prime2([class$prime2("fa"), class$prime2("fa-arrow-right")])])])])]);
  };
  var viewTodoList = function(model) {
    var shouldRenderTodo = function(todo) {
      if (model.filterType instanceof All) {
        return true;
      }
      ;
      if (model.filterType instanceof Active) {
        return !todo.completed;
      }
      ;
      if (model.filterType instanceof Completed) {
        return todo.completed;
      }
      ;
      throw new Error("Failed pattern match at Main (line 246, column 29 - line 249, column 34): " + [model.filterType.constructor.name]);
    };
    var todos = filter(shouldRenderTodo)(model.todoList);
    var renderTodo = function(todo) {
      if (model.todoBeingEdited.length === 0) {
        return viewTodo(todo);
      }
      ;
      var v = find2(function(tbe) {
        return eq12(tbe.id)(todo.id);
      })(model.todoBeingEdited);
      if (v instanceof Just) {
        return editTodo(v.value0);
      }
      ;
      if (v instanceof Nothing) {
        return viewTodo(todo);
      }
      ;
      throw new Error("Failed pattern match at Main (line 242, column 15 - line 244, column 33): " + [v.constructor.name]);
    };
    return ul2([class$prime1(["divide-y", "divide-gray-200", "px-4"])])([map7(renderTodo)(todos)]);
  };
  var appTitle = /* @__PURE__ */ div4([/* @__PURE__ */ class$prime1(["px-4", "py-2"])])([/* @__PURE__ */ h1(toNodeArray2)(toNodeArray1)([/* @__PURE__ */ class$prime1(["text-gray-800", "font-bold", "text-2xl", "uppercase"])])([/* @__PURE__ */ text("Flame Todo List")])]);
  var view = function(model) {
    return div4([class$prime1(["max-w-md", "mx-auto", "bg-white", "shadow-lg", "rounded-lg", "overflow-hidden", "mt-16"])])([appTitle, inputField(model), viewTodoList(model)]);
  };
  var main = function __do2() {
    var init3 = initGen();
    return mount_("main")({
      init: init3,
      view,
      update,
      subscribe
    })();
  };

  // <stdin>
  main();
})();
