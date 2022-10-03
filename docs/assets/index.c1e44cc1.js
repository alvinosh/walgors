(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) l(r);
  new MutationObserver((r) => {
    for (const o of r)
      if (o.type === 'childList')
        for (const s of o.addedNodes)
          s.tagName === 'LINK' && s.rel === 'modulepreload' && l(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const o = {};
    return (
      r.integrity && (o.integrity = r.integrity),
      r.referrerpolicy && (o.referrerPolicy = r.referrerpolicy),
      r.crossorigin === 'use-credentials'
        ? (o.credentials = 'include')
        : r.crossorigin === 'anonymous'
        ? (o.credentials = 'omit')
        : (o.credentials = 'same-origin'),
      o
    );
  }
  function l(r) {
    if (r.ep) return;
    r.ep = !0;
    const o = n(r);
    fetch(r.href, o);
  }
})();
let g;
const T = new Array(32).fill(void 0);
T.push(void 0, null, !0, !1);
function Xe(t) {
  return T[t];
}
let te = T.length;
function at(t) {
  t < 36 || ((T[t] = te), (te = t));
}
function ct(t) {
  const e = Xe(t);
  return at(t), e;
}
const Ke = new TextDecoder('utf-8', { ignoreBOM: !0, fatal: !0 });
Ke.decode();
let ue = new Uint8Array();
function ne() {
  return ue.byteLength === 0 && (ue = new Uint8Array(g.memory.buffer)), ue;
}
function Re(t, e) {
  return Ke.decode(ne().subarray(t, t + e));
}
let _e = new Int32Array();
function ge() {
  return _e.byteLength === 0 && (_e = new Int32Array(g.memory.buffer)), _e;
}
function ft(t, e) {
  return ne().subarray(t / 1, t / 1 + e);
}
function ye(t, e) {
  if (!(t instanceof e)) throw new Error(`expected instance of ${e.name}`);
  return t.ptr;
}
function ut(t) {
  te === T.length && T.push(T.length + 1);
  const e = te;
  return (te = T[e]), (T[e] = t), e;
}
let Ce = 0;
const de = new TextEncoder('utf-8'),
  _t =
    typeof de.encodeInto == 'function'
      ? function (t, e) {
          return de.encodeInto(t, e);
        }
      : function (t, e) {
          const n = de.encode(t);
          return e.set(n), { read: t.length, written: n.length };
        };
function dt(t, e, n) {
  if (n === void 0) {
    const i = de.encode(t),
      f = e(i.length);
    return (
      ne()
        .subarray(f, f + i.length)
        .set(i),
      (Ce = i.length),
      f
    );
  }
  let l = t.length,
    r = e(l);
  const o = ne();
  let s = 0;
  for (; s < l; s++) {
    const i = t.charCodeAt(s);
    if (i > 127) break;
    o[r + s] = i;
  }
  if (s !== l) {
    s !== 0 && (t = t.slice(s)), (r = n(r, l, (l = s + t.length * 3)));
    const i = ne().subarray(r + s, r + l);
    s += _t(t, i).written;
  }
  return (Ce = s), r;
}
const y = Object.freeze({
  Empty: 0,
  0: 'Empty',
  Path: 1,
  1: 'Path',
  Wall: 2,
  2: 'Wall',
  Start: 3,
  3: 'Start',
  End: 4,
  4: 'End',
  Open: 5,
  5: 'Open',
  Closed: 6,
  6: 'Closed'
});
class le {
  static __wrap(e) {
    const n = Object.create(le.prototype);
    return (n.ptr = e), n;
  }
  __destroy_into_raw() {
    const e = this.ptr;
    return (this.ptr = 0), e;
  }
  free() {
    const e = this.__destroy_into_raw();
    g.__wbg_astar_free(e);
  }
  static new(e) {
    ye(e, Y);
    const n = g.astar_new(e.ptr);
    return le.__wrap(n);
  }
  do_path(e) {
    return ye(e, Y), g.astar_do_path(this.ptr, e.ptr) !== 0;
  }
  tick(e) {
    return ye(e, Y), g.astar_tick(this.ptr, e.ptr) !== 0;
  }
}
class Y {
  static __wrap(e) {
    const n = Object.create(Y.prototype);
    return (n.ptr = e), n;
  }
  __destroy_into_raw() {
    const e = this.ptr;
    return (this.ptr = 0), e;
  }
  free() {
    const e = this.__destroy_into_raw();
    g.__wbg_world_free(e);
  }
  get width() {
    return g.__wbg_get_world_width(this.ptr) >>> 0;
  }
  set width(e) {
    g.__wbg_set_world_width(this.ptr, e);
  }
  get height() {
    return g.__wbg_get_world_height(this.ptr) >>> 0;
  }
  set height(e) {
    g.__wbg_set_world_height(this.ptr, e);
  }
  get start() {
    return g.__wbg_get_world_start(this.ptr) >>> 0;
  }
  set start(e) {
    g.__wbg_set_world_start(this.ptr, e);
  }
  get end() {
    return g.__wbg_get_world_end(this.ptr) >>> 0;
  }
  set end(e) {
    g.__wbg_set_world_end(this.ptr, e);
  }
  static new(e, n, l, r, o, s) {
    const i = g.world_new(e, n, l, r, o, s);
    return Y.__wrap(i);
  }
  dist(e, n) {
    return g.world_dist(this.ptr, e, n);
  }
  set_start(e) {
    g.world_set_start(this.ptr, e);
  }
  set_end(e) {
    g.world_set_end(this.ptr, e);
  }
  set_empty(e) {
    g.world_set_empty(this.ptr, e);
  }
  set_wall(e) {
    g.world_set_wall(this.ptr, e);
  }
  set_open(e) {
    g.world_set_open(this.ptr, e);
  }
  set_closed(e) {
    g.world_set_closed(this.ptr, e);
  }
  set_path(e) {
    g.world_set_path(this.ptr, e);
  }
  clear() {
    g.world_clear(this.ptr);
  }
  get_width() {
    return g.__wbg_get_world_width(this.ptr) >>> 0;
  }
  get_height() {
    return g.__wbg_get_world_height(this.ptr) >>> 0;
  }
  get_world() {
    try {
      const r = g.__wbindgen_add_to_stack_pointer(-16);
      g.world_get_world(r, this.ptr);
      var e = ge()[r / 4 + 0],
        n = ge()[r / 4 + 1],
        l = ft(e, n).slice();
      return g.__wbindgen_free(e, n * 1), l;
    } finally {
      g.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
async function ht(t, e) {
  if (typeof Response == 'function' && t instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == 'function')
      try {
        return await WebAssembly.instantiateStreaming(t, e);
      } catch (l) {
        if (t.headers.get('Content-Type') != 'application/wasm')
          console.warn(
            '`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n',
            l
          );
        else throw l;
      }
    const n = await t.arrayBuffer();
    return await WebAssembly.instantiate(n, e);
  } else {
    const n = await WebAssembly.instantiate(t, e);
    return n instanceof WebAssembly.Instance ? { instance: n, module: t } : n;
  }
}
function mt() {
  const t = {};
  return (
    (t.wbg = {}),
    (t.wbg.__wbg_new_abda76e883ba8a5f = function () {
      const e = new Error();
      return ut(e);
    }),
    (t.wbg.__wbg_stack_658279fe44541cf6 = function (e, n) {
      const l = Xe(n).stack,
        r = dt(l, g.__wbindgen_malloc, g.__wbindgen_realloc),
        o = Ce;
      (ge()[e / 4 + 1] = o), (ge()[e / 4 + 0] = r);
    }),
    (t.wbg.__wbg_error_f851667af71bcfc6 = function (e, n) {
      try {
        console.error(Re(e, n));
      } finally {
        g.__wbindgen_free(e, n);
      }
    }),
    (t.wbg.__wbindgen_object_drop_ref = function (e) {
      ct(e);
    }),
    (t.wbg.__wbindgen_throw = function (e, n) {
      throw new Error(Re(e, n));
    }),
    t
  );
}
function gt(t, e) {
  return (
    (g = t.exports),
    (Ze.__wbindgen_wasm_module = e),
    (_e = new Int32Array()),
    (ue = new Uint8Array()),
    g
  );
}
async function Ze(t) {
  typeof t > 'u' && (t = new URL('/wasm_bg.c4bb9028.wasm', self.location));
  const e = mt();
  (typeof t == 'string' ||
    (typeof Request == 'function' && t instanceof Request) ||
    (typeof URL == 'function' && t instanceof URL)) &&
    (t = fetch(t));
  const { instance: n, module: l } = await ht(await t, e);
  return gt(n, l);
}
function A() {}
const Ge = (t) => t;
function Je(t) {
  return t();
}
function We() {
  return Object.create(null);
}
function B(t) {
  t.forEach(Je);
}
function Qe(t) {
  return typeof t == 'function';
}
function D(t, e) {
  return t != t
    ? e == e
    : t !== e || (t && typeof t == 'object') || typeof t == 'function';
}
function wt(t) {
  return Object.keys(t).length === 0;
}
function pt(t, ...e) {
  if (t == null) return A;
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function $e(t, e, n) {
  t.$$.on_destroy.push(pt(e, n));
}
const xe = typeof window < 'u';
let yt = xe ? () => window.performance.now() : () => Date.now(),
  ze = xe ? (t) => requestAnimationFrame(t) : A;
const G = new Set();
function et(t) {
  G.forEach((e) => {
    e.c(t) || (G.delete(e), e.f());
  }),
    G.size !== 0 && ze(et);
}
function bt(t) {
  let e;
  return (
    G.size === 0 && ze(et),
    {
      promise: new Promise((n) => {
        G.add((e = { c: t, f: n }));
      }),
      abort() {
        G.delete(e);
      }
    }
  );
}
function v(t, e) {
  t.appendChild(e);
}
function tt(t) {
  if (!t) return document;
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
  return e && e.host ? e : t.ownerDocument;
}
function vt(t) {
  const e = k('style');
  return kt(tt(t), e), e.sheet;
}
function kt(t, e) {
  return v(t.head || t, e), e.sheet;
}
function L(t, e, n) {
  t.insertBefore(e, n || null);
}
function S(t) {
  t.parentNode.removeChild(t);
}
function nt(t, e) {
  for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
}
function k(t) {
  return document.createElement(t);
}
function J(t) {
  return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function Pe(t) {
  return document.createTextNode(t);
}
function Q() {
  return Pe(' ');
}
function Et() {
  return Pe('');
}
function M(t, e, n, l) {
  return t.addEventListener(e, n, l), () => t.removeEventListener(e, n, l);
}
function _(t, e, n) {
  n == null
    ? t.removeAttribute(e)
    : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function Ct(t) {
  return Array.from(t.childNodes);
}
function b(t, e, n) {
  t.classList[n ? 'add' : 'remove'](e);
}
function St(t, e, { bubbles: n = !1, cancelable: l = !1 } = {}) {
  const r = document.createEvent('CustomEvent');
  return r.initCustomEvent(t, n, l, e), r;
}
const we = new Map();
let pe = 0;
function Ot(t) {
  let e = 5381,
    n = t.length;
  for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
  return e >>> 0;
}
function At(t, e) {
  const n = { stylesheet: vt(e), rules: {} };
  return we.set(t, n), n;
}
function Ne(t, e, n, l, r, o, s, i = 0) {
  const f = 16.666 / l;
  let c = `{
`;
  for (let C = 0; C <= 1; C += f) {
    const z = e + (n - e) * o(C);
    c +=
      C * 100 +
      `%{${s(z, 1 - z)}}
`;
  }
  const d =
      c +
      `100% {${s(n, 1 - n)}}
}`,
    a = `__svelte_${Ot(d)}_${i}`,
    u = tt(t),
    { stylesheet: m, rules: w } = we.get(u) || At(u, t);
  w[a] ||
    ((w[a] = !0), m.insertRule(`@keyframes ${a} ${d}`, m.cssRules.length));
  const E = t.style.animation || '';
  return (
    (t.style.animation = `${
      E ? `${E}, ` : ''
    }${a} ${l}ms linear ${r}ms 1 both`),
    (pe += 1),
    a
  );
}
function Lt(t, e) {
  const n = (t.style.animation || '').split(', '),
    l = n.filter(
      e ? (o) => o.indexOf(e) < 0 : (o) => o.indexOf('__svelte') === -1
    ),
    r = n.length - l.length;
  r && ((t.style.animation = l.join(', ')), (pe -= r), pe || zt());
}
function zt() {
  ze(() => {
    pe ||
      (we.forEach((t) => {
        const { ownerNode: e } = t.stylesheet;
        e && S(e);
      }),
      we.clear());
  });
}
let Me;
function re(t) {
  Me = t;
}
function be(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((l) => l.call(this, e));
}
const ee = [],
  je = [],
  he = [],
  Te = [],
  Pt = Promise.resolve();
let Se = !1;
function Mt() {
  Se || ((Se = !0), Pt.then(rt));
}
function $(t) {
  he.push(t);
}
const ve = new Set();
let ae = 0;
function rt() {
  const t = Me;
  do {
    for (; ae < ee.length; ) {
      const e = ee[ae];
      ae++, re(e), Rt(e.$$);
    }
    for (re(null), ee.length = 0, ae = 0; je.length; ) je.pop()();
    for (let e = 0; e < he.length; e += 1) {
      const n = he[e];
      ve.has(n) || (ve.add(n), n());
    }
    he.length = 0;
  } while (ee.length);
  for (; Te.length; ) Te.pop()();
  (Se = !1), ve.clear(), re(t);
}
function Rt(t) {
  if (t.fragment !== null) {
    t.update(), B(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, e),
      t.after_update.forEach($);
  }
}
let x;
function Wt() {
  return (
    x ||
      ((x = Promise.resolve()),
      x.then(() => {
        x = null;
      })),
    x
  );
}
function ke(t, e, n) {
  t.dispatchEvent(St(`${e ? 'intro' : 'outro'}${n}`));
}
const me = new Set();
let I;
function Nt() {
  I = { r: 0, c: [], p: I };
}
function jt() {
  I.r || B(I.c), (I = I.p);
}
function P(t, e) {
  t && t.i && (me.delete(t), t.i(e));
}
function N(t, e, n, l) {
  if (t && t.o) {
    if (me.has(t)) return;
    me.add(t),
      I.c.push(() => {
        me.delete(t), l && (n && t.d(1), l());
      }),
      t.o(e);
  } else l && l();
}
const Tt = { duration: 0 };
function Ie(t, e, n, l) {
  let r = e(t, n),
    o = l ? 0 : 1,
    s = null,
    i = null,
    f = null;
  function c() {
    f && Lt(t, f);
  }
  function d(u, m) {
    const w = u.b - o;
    return (
      (m *= Math.abs(w)),
      {
        a: o,
        b: u.b,
        d: w,
        duration: m,
        start: u.start,
        end: u.start + m,
        group: u.group
      }
    );
  }
  function a(u) {
    const {
        delay: m = 0,
        duration: w = 300,
        easing: E = Ge,
        tick: C = A,
        css: z
      } = r || Tt,
      R = { start: yt() + m, b: u };
    u || ((R.group = I), (I.r += 1)),
      s || i
        ? (i = R)
        : (z && (c(), (f = Ne(t, o, u, w, m, E, z))),
          u && C(0, 1),
          (s = d(R, w)),
          $(() => ke(t, u, 'start')),
          bt((j) => {
            if (
              (i &&
                j > i.start &&
                ((s = d(i, w)),
                (i = null),
                ke(t, s.b, 'start'),
                z && (c(), (f = Ne(t, o, s.b, s.duration, 0, E, r.css)))),
              s)
            ) {
              if (j >= s.end)
                C((o = s.b), 1 - o),
                  ke(t, s.b, 'end'),
                  i || (s.b ? c() : --s.group.r || B(s.group.c)),
                  (s = null);
              else if (j >= s.start) {
                const F = j - s.start;
                (o = s.a + s.d * E(F / s.duration)), C(o, 1 - o);
              }
            }
            return !!(s || i);
          }));
  }
  return {
    run(u) {
      Qe(r)
        ? Wt().then(() => {
            (r = r()), a(u);
          })
        : a(u);
    },
    end() {
      c(), (s = i = null);
    }
  };
}
function V(t) {
  t && t.c();
}
function q(t, e, n, l) {
  const { fragment: r, on_mount: o, on_destroy: s, after_update: i } = t.$$;
  r && r.m(e, n),
    l ||
      $(() => {
        const f = o.map(Je).filter(Qe);
        s ? s.push(...f) : B(f), (t.$$.on_mount = []);
      }),
    i.forEach($);
}
function U(t, e) {
  const n = t.$$;
  n.fragment !== null &&
    (B(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []));
}
function It(t, e) {
  t.$$.dirty[0] === -1 && (ee.push(t), Mt(), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function X(t, e, n, l, r, o, s, i = [-1]) {
  const f = Me;
  re(t);
  const c = (t.$$ = {
    fragment: null,
    ctx: null,
    props: o,
    update: A,
    not_equal: r,
    bound: We(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (f ? f.$$.context : [])),
    callbacks: We(),
    dirty: i,
    skip_bound: !1,
    root: e.target || f.$$.root
  });
  s && s(c.root);
  let d = !1;
  if (
    ((c.ctx = n
      ? n(t, e.props || {}, (a, u, ...m) => {
          const w = m.length ? m[0] : u;
          return (
            c.ctx &&
              r(c.ctx[a], (c.ctx[a] = w)) &&
              (!c.skip_bound && c.bound[a] && c.bound[a](w), d && It(t, a)),
            u
          );
        })
      : []),
    c.update(),
    (d = !0),
    B(c.before_update),
    (c.fragment = l ? l(c.ctx) : !1),
    e.target)
  ) {
    if (e.hydrate) {
      const a = Ct(e.target);
      c.fragment && c.fragment.l(a), a.forEach(S);
    } else c.fragment && c.fragment.c();
    e.intro && P(t.$$.fragment),
      q(t, e.target, e.anchor, e.customElement),
      rt();
  }
  re(f);
}
class K {
  $destroy() {
    U(this, 1), (this.$destroy = A);
  }
  $on(e, n) {
    const l = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return (
      l.push(n),
      () => {
        const r = l.indexOf(n);
        r !== -1 && l.splice(r, 1);
      }
    );
  }
  $set(e) {
    this.$$set &&
      !wt(e) &&
      ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
  }
}
const Z = [];
function lt(t, e = A) {
  let n;
  const l = new Set();
  function r(i) {
    if (D(t, i) && ((t = i), n)) {
      const f = !Z.length;
      for (const c of l) c[1](), Z.push(c, t);
      if (f) {
        for (let c = 0; c < Z.length; c += 2) Z[c][0](Z[c + 1]);
        Z.length = 0;
      }
    }
  }
  function o(i) {
    r(i(t));
  }
  function s(i, f = A) {
    const c = [i, f];
    return (
      l.add(c),
      l.size === 1 && (n = e(r) || A),
      i(t),
      () => {
        l.delete(c), l.size === 0 && (n(), (n = null));
      }
    );
  }
  return { set: r, update: o, subscribe: s };
}
const Oe = lt(y.Start),
  H = lt();
function qe(t, e, n) {
  const l = t.slice();
  return (l[4] = e[n]), l;
}
function Ue(t) {
  let e,
    n,
    l,
    r,
    o = t[4].name + '',
    s,
    i,
    f,
    c;
  function d() {
    return t[3](t[4]);
  }
  return {
    c() {
      (e = k('li')),
        (n = k('div')),
        (l = Q()),
        (r = k('p')),
        (s = Pe(o)),
        (i = Q()),
        _(n, 'class', 'icon ' + t[4].class + ' svelte-u9p6u'),
        _(r, 'class', 'svelte-u9p6u'),
        _(e, 'class', 'option svelte-u9p6u'),
        b(e, 'active', t[4].cell === t[0]);
    },
    m(a, u) {
      L(a, e, u),
        v(e, n),
        v(e, l),
        v(e, r),
        v(r, s),
        v(e, i),
        f || ((c = M(e, 'click', d)), (f = !0));
    },
    p(a, u) {
      (t = a), u & 3 && b(e, 'active', t[4].cell === t[0]);
    },
    d(a) {
      a && S(e), (f = !1), c();
    }
  };
}
function qt(t) {
  let e,
    n = t[1],
    l = [];
  for (let r = 0; r < n.length; r += 1) l[r] = Ue(qe(t, n, r));
  return {
    c() {
      e = k('ul');
      for (let r = 0; r < l.length; r += 1) l[r].c();
      _(e, 'class', 'container svelte-u9p6u');
    },
    m(r, o) {
      L(r, e, o);
      for (let s = 0; s < l.length; s += 1) l[s].m(e, null);
    },
    p(r, [o]) {
      if (o & 7) {
        n = r[1];
        let s;
        for (s = 0; s < n.length; s += 1) {
          const i = qe(r, n, s);
          l[s] ? l[s].p(i, o) : ((l[s] = Ue(i)), l[s].c(), l[s].m(e, null));
        }
        for (; s < l.length; s += 1) l[s].d(1);
        l.length = n.length;
      }
    },
    i: A,
    o: A,
    d(r) {
      r && S(e), nt(l, r);
    }
  };
}
function Ut(t, e, n) {
  let l;
  $e(t, Oe, (i) => n(0, (l = i)));
  let r = [
    { name: 'Eraser', cell: y.Empty, class: 'eraser' },
    { name: 'Start', cell: y.Start, class: 'start' },
    { name: 'End', cell: y.End, class: 'end' },
    { name: 'Wall', cell: y.Wall, class: 'wall' }
  ];
  const o = (i) => {
    Oe.set(i);
  };
  return [
    l,
    r,
    o,
    (i) => {
      o(i.cell);
    }
  ];
}
class Bt extends K {
  constructor(e) {
    super(), X(this, e, Ut, qt, D, {});
  }
}
var W;
(function (t) {
  (t[(t.RESET = 0)] = 'RESET'),
    (t[(t.STEP = 1)] = 'STEP'),
    (t[(t.PAUSE = 2)] = 'PAUSE'),
    (t[(t.PLAY = 3)] = 'PLAY');
})(W || (W = {}));
function Be(t, { delay: e = 0, duration: n = 400, easing: l = Ge } = {}) {
  const r = +getComputedStyle(t).opacity;
  return { delay: e, duration: n, easing: l, css: (o) => `opacity: ${o * r}` };
}
function Ft(t) {
  let e, n, l, r, o, s;
  return {
    c() {
      (e = k('div')),
        _(e, 'class', 'cell svelte-1vegyd6'),
        _(
          e,
          'style',
          (n = `
    width: ${t[1]}px;
    height:  ${t[1]}px;
  `)
        ),
        b(e, 'empty', t[0] === y.Empty),
        b(e, 'path', t[0] === y.Path),
        b(e, 'wall', t[0] === y.Wall),
        b(e, 'start', t[0] === y.Start),
        b(e, 'end', t[0] === y.End),
        b(e, 'open', t[0] === y.Open),
        b(e, 'closed', t[0] === y.Closed),
        b(e, 'animate', t[0] !== y.Empty);
    },
    m(i, f) {
      L(i, e, f),
        (r = !0),
        o ||
          ((s = [
            M(e, 'click', t[2]),
            M(e, 'mouseover', t[3]),
            M(e, 'focus', t[4])
          ]),
          (o = !0));
    },
    p(i, [f]) {
      (!r ||
        (f & 2 &&
          n !==
            (n = `
    width: ${i[1]}px;
    height:  ${i[1]}px;
  `))) &&
        _(e, 'style', n),
        (!r || f & 1) && b(e, 'empty', i[0] === y.Empty),
        (!r || f & 1) && b(e, 'path', i[0] === y.Path),
        (!r || f & 1) && b(e, 'wall', i[0] === y.Wall),
        (!r || f & 1) && b(e, 'start', i[0] === y.Start),
        (!r || f & 1) && b(e, 'end', i[0] === y.End),
        (!r || f & 1) && b(e, 'open', i[0] === y.Open),
        (!r || f & 1) && b(e, 'closed', i[0] === y.Closed),
        (!r || f & 1) && b(e, 'animate', i[0] !== y.Empty);
    },
    i(i) {
      r ||
        ($(() => {
          l || (l = Ie(e, Be, {}, !0)), l.run(1);
        }),
        (r = !0));
    },
    o(i) {
      l || (l = Ie(e, Be, {}, !1)), l.run(0), (r = !1);
    },
    d(i) {
      i && S(e), i && l && l.end(), (o = !1), B(s);
    }
  };
}
function Ht(t, e, n) {
  let { cell: l } = e,
    { size: r = 10 } = e;
  function o(f) {
    be.call(this, t, f);
  }
  function s(f) {
    be.call(this, t, f);
  }
  function i(f) {
    be.call(this, t, f);
  }
  return (
    (t.$$set = (f) => {
      'cell' in f && n(0, (l = f.cell)), 'size' in f && n(1, (r = f.size));
    }),
    [l, r, o, s, i]
  );
}
class Yt extends K {
  constructor(e) {
    super(), X(this, e, Ht, Ft, D, { cell: 0, size: 1 });
  }
}
function Fe(t, e, n) {
  const l = t.slice();
  return (l[22] = e[n]), (l[24] = n), l;
}
function He(t) {
  let e, n;
  function l() {
    return t[7](t[24]);
  }
  function r() {
    return t[8](t[24]);
  }
  return (
    (e = new Yt({ props: { cell: t[22], size: Ae } })),
    e.$on('click', l),
    e.$on('mouseover', r),
    {
      c() {
        V(e.$$.fragment);
      },
      m(o, s) {
        q(e, o, s), (n = !0);
      },
      p(o, s) {
        t = o;
        const i = {};
        s & 8 && (i.cell = t[22]), e.$set(i);
      },
      i(o) {
        n || (P(e.$$.fragment, o), (n = !0));
      },
      o(o) {
        N(e.$$.fragment, o), (n = !1);
      },
      d(o) {
        U(e, o);
      }
    }
  );
}
function Vt(t) {
  let e, n, l, r, o;
  $(t[6]);
  let s = t[3],
    i = [];
  for (let c = 0; c < s.length; c += 1) i[c] = He(Fe(t, s, c));
  const f = (c) =>
    N(i[c], 1, 1, () => {
      i[c] = null;
    });
  return {
    c() {
      e = k('div');
      for (let c = 0; c < i.length; c += 1) i[c].c();
      _(e, 'class', 'container svelte-oqozf9'),
        _(
          e,
          'style',
          (n = `
  grid-template-columns:repeat(${t[2].get_width()}, auto);
  grid-template-rows:repeat(${t[2].get_height()}, auto);
`)
        );
    },
    m(c, d) {
      L(c, e, d);
      for (let a = 0; a < i.length; a += 1) i[a].m(e, null);
      (l = !0),
        r ||
          ((o = [
            M(window, 'mousedown', t[4]),
            M(window, 'mouseup', t[4]),
            M(window, 'mousemove', t[4]),
            M(window, 'resize', t[6])
          ]),
          (r = !0));
    },
    p(c, [d]) {
      if (d & 40) {
        s = c[3];
        let a;
        for (a = 0; a < s.length; a += 1) {
          const u = Fe(c, s, a);
          i[a]
            ? (i[a].p(u, d), P(i[a], 1))
            : ((i[a] = He(u)), i[a].c(), P(i[a], 1), i[a].m(e, null));
        }
        for (Nt(), a = s.length; a < i.length; a += 1) f(a);
        jt();
      }
      (!l ||
        (d & 4 &&
          n !==
            (n = `
  grid-template-columns:repeat(${c[2].get_width()}, auto);
  grid-template-rows:repeat(${c[2].get_height()}, auto);
`))) &&
        _(e, 'style', n);
    },
    i(c) {
      if (!l) {
        for (let d = 0; d < s.length; d += 1) P(i[d]);
        l = !0;
      }
    },
    o(c) {
      i = i.filter(Boolean);
      for (let d = 0; d < i.length; d += 1) N(i[d]);
      l = !1;
    },
    d(c) {
      c && S(e), nt(i, c), (r = !1), B(o);
    }
  };
}
const Ae = 50,
  ce = 6;
function Dt(t, e, n) {
  let l;
  $e(t, Oe, (p) => n(14, (l = p)));
  let r = Y.new(10, 10, 1, 1, 8, 8),
    o = r.get_world(),
    s,
    i = !1,
    f = !1,
    c = !1;
  function d(p, O, h, st, it, ot) {
    n(2, (r = Y.new(p, O, h, st, it, ot))), n(3, (o = r.get_world()));
  }
  function a() {
    (i = !1),
      (f = !1),
      (c = !1),
      (s = void 0),
      r.clear(),
      n(3, (o = r.get_world()));
  }
  function u() {
    for (a(), s = le.new(r); !s.tick(r); );
    n(3, (o = r.get_world())),
      (f = !0),
      (s = void 0),
      n(3, (o = r.get_world()));
  }
  function m(p = !1) {
    s == null && (r.clear(), (s = le.new(r))),
      p && c && !f && s.tick(r) && (f = !0),
      n(3, (o = r.get_world()));
    let O = !1;
    !c &&
      !f &&
      ((O = s.tick(r)), O ? (f = !0) : requestAnimationFrame(() => m()));
  }
  function w() {
    m(!0);
  }
  function E() {
    c = !0;
  }
  function C() {
    c = !1;
  }
  let z = 0,
    R = 0;
  const j = (p) => {
    i = ((p.buttons !== void 0 ? p.buttons : p.which) & 1) === 1;
  };
  H.subscribe((p) => {
    switch (p) {
      case W.RESET:
        a();
        break;
      case W.PLAY:
        C(), m();
        break;
      case W.PAUSE:
        E();
        break;
      case W.STEP:
        w();
        break;
    }
  });
  const F = (p, O) => {
    if (!(O && !i)) {
      switch (l) {
        case y.Start:
          r.set_start(p);
          break;
        case y.End:
          r.set_end(p);
          break;
        case y.Wall:
          r.set_wall(p);
          break;
        case y.Empty:
          r.set_empty(p);
          break;
      }
      f && u(), n(3, (o = r.get_world()));
    }
  };
  function se() {
    n(0, (z = window.innerHeight)), n(1, (R = window.innerWidth));
  }
  const ie = (p) => {
      F(p, !1);
    },
    oe = (p) => {
      F(p, !0);
    };
  return (
    (t.$$.update = () => {
      if (t.$$.dirty & 3) {
        let p = Math.ceil(R / Ae),
          O = Math.ceil(z / Ae);
        p >= 1 && O >= 1 && d(p, O, ce - 1, ce - 1, p - ce, O - ce);
      }
    }),
    [z, R, r, o, j, F, se, ie, oe]
  );
}
class Xt extends K {
  constructor(e) {
    super(), X(this, e, Dt, Vt, D, {});
  }
}
const fe = parseFloat;
function Le(t, e = ';') {
  let n;
  if (Array.isArray(t)) n = t.filter((l) => l);
  else {
    n = [];
    for (const l in t) t[l] && n.push(`${l}:${t[l]}`);
  }
  return n.join(e);
}
function Kt(t, e, n, l) {
  let r, o;
  const s = '1em';
  let i,
    f,
    c,
    d = '-.125em';
  const a = 'visible';
  return (
    l && ((c = 'center'), (o = '1.25em')),
    n && (r = n),
    e &&
      (e == 'lg'
        ? ((f = '1.33333em'), (i = '.75em'), (d = '-.225em'))
        : e == 'xs'
        ? (f = '.75em')
        : e == 'sm'
        ? (f = '.875em')
        : (f = e.replace('x', 'em'))),
    Le([
      Le({
        float: r,
        width: o,
        height: s,
        'line-height': i,
        'font-size': f,
        'text-align': c,
        'vertical-align': d,
        'transform-origin': 'center',
        overflow: a
      }),
      t
    ])
  );
}
function Zt(t, e, n, l, r, o = 1, s = '', i = '') {
  let f = 1,
    c = 1;
  return (
    r &&
      (r == 'horizontal'
        ? (f = -1)
        : r == 'vertical'
        ? (c = -1)
        : (f = c = -1)),
    Le(
      [
        `translate(${fe(e) * o}${s},${fe(n) * o}${s})`,
        `scale(${f * fe(t)},${c * fe(t)})`,
        l && `rotate(${l}${i})`
      ],
      ' '
    )
  );
}
function Ye(t) {
  let e, n, l, r, o, s, i, f;
  function c(u, m) {
    return typeof u[10][4] == 'string' ? Jt : Gt;
  }
  let d = c(t),
    a = d(t);
  return {
    c() {
      (e = J('svg')),
        (n = J('g')),
        (l = J('g')),
        a.c(),
        _(l, 'transform', t[12]),
        _(
          n,
          'transform',
          (r = 'translate(' + t[10][0] / 2 + ' ' + t[10][1] / 2 + ')')
        ),
        _(n, 'transform-origin', (o = t[10][0] / 4 + ' 0')),
        _(e, 'id', (s = t[1] || void 0)),
        _(e, 'class', (i = 'svelte-fa ' + t[0] + ' svelte-1cj2gr0')),
        _(e, 'style', t[11]),
        _(e, 'viewBox', (f = '0 0 ' + t[10][0] + ' ' + t[10][1])),
        _(e, 'aria-hidden', 'true'),
        _(e, 'role', 'img'),
        _(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        b(e, 'pulse', t[4]),
        b(e, 'spin', t[3]);
    },
    m(u, m) {
      L(u, e, m), v(e, n), v(n, l), a.m(l, null);
    },
    p(u, m) {
      d === (d = c(u)) && a
        ? a.p(u, m)
        : (a.d(1), (a = d(u)), a && (a.c(), a.m(l, null))),
        m & 4096 && _(l, 'transform', u[12]),
        m & 1024 &&
          r !== (r = 'translate(' + u[10][0] / 2 + ' ' + u[10][1] / 2 + ')') &&
          _(n, 'transform', r),
        m & 1024 &&
          o !== (o = u[10][0] / 4 + ' 0') &&
          _(n, 'transform-origin', o),
        m & 2 && s !== (s = u[1] || void 0) && _(e, 'id', s),
        m & 1 &&
          i !== (i = 'svelte-fa ' + u[0] + ' svelte-1cj2gr0') &&
          _(e, 'class', i),
        m & 2048 && _(e, 'style', u[11]),
        m & 1024 &&
          f !== (f = '0 0 ' + u[10][0] + ' ' + u[10][1]) &&
          _(e, 'viewBox', f),
        m & 17 && b(e, 'pulse', u[4]),
        m & 9 && b(e, 'spin', u[3]);
    },
    d(u) {
      u && S(e), a.d();
    }
  };
}
function Gt(t) {
  let e, n, l, r, o, s, i, f, c, d;
  return {
    c() {
      (e = J('path')),
        (s = J('path')),
        _(e, 'd', (n = t[10][4][0])),
        _(e, 'fill', (l = t[6] || t[2] || 'currentColor')),
        _(e, 'fill-opacity', (r = t[9] != !1 ? t[7] : t[8])),
        _(
          e,
          'transform',
          (o = 'translate(' + t[10][0] / -2 + ' ' + t[10][1] / -2 + ')')
        ),
        _(s, 'd', (i = t[10][4][1])),
        _(s, 'fill', (f = t[5] || t[2] || 'currentColor')),
        _(s, 'fill-opacity', (c = t[9] != !1 ? t[8] : t[7])),
        _(
          s,
          'transform',
          (d = 'translate(' + t[10][0] / -2 + ' ' + t[10][1] / -2 + ')')
        );
    },
    m(a, u) {
      L(a, e, u), L(a, s, u);
    },
    p(a, u) {
      u & 1024 && n !== (n = a[10][4][0]) && _(e, 'd', n),
        u & 68 && l !== (l = a[6] || a[2] || 'currentColor') && _(e, 'fill', l),
        u & 896 &&
          r !== (r = a[9] != !1 ? a[7] : a[8]) &&
          _(e, 'fill-opacity', r),
        u & 1024 &&
          o !==
            (o = 'translate(' + a[10][0] / -2 + ' ' + a[10][1] / -2 + ')') &&
          _(e, 'transform', o),
        u & 1024 && i !== (i = a[10][4][1]) && _(s, 'd', i),
        u & 36 && f !== (f = a[5] || a[2] || 'currentColor') && _(s, 'fill', f),
        u & 896 &&
          c !== (c = a[9] != !1 ? a[8] : a[7]) &&
          _(s, 'fill-opacity', c),
        u & 1024 &&
          d !==
            (d = 'translate(' + a[10][0] / -2 + ' ' + a[10][1] / -2 + ')') &&
          _(s, 'transform', d);
    },
    d(a) {
      a && S(e), a && S(s);
    }
  };
}
function Jt(t) {
  let e, n, l, r;
  return {
    c() {
      (e = J('path')),
        _(e, 'd', (n = t[10][4])),
        _(e, 'fill', (l = t[2] || t[5] || 'currentColor')),
        _(
          e,
          'transform',
          (r = 'translate(' + t[10][0] / -2 + ' ' + t[10][1] / -2 + ')')
        );
    },
    m(o, s) {
      L(o, e, s);
    },
    p(o, s) {
      s & 1024 && n !== (n = o[10][4]) && _(e, 'd', n),
        s & 36 && l !== (l = o[2] || o[5] || 'currentColor') && _(e, 'fill', l),
        s & 1024 &&
          r !==
            (r = 'translate(' + o[10][0] / -2 + ' ' + o[10][1] / -2 + ')') &&
          _(e, 'transform', r);
    },
    d(o) {
      o && S(e);
    }
  };
}
function Qt(t) {
  let e,
    n = t[10][4] && Ye(t);
  return {
    c() {
      n && n.c(), (e = Et());
    },
    m(l, r) {
      n && n.m(l, r), L(l, e, r);
    },
    p(l, [r]) {
      l[10][4]
        ? n
          ? n.p(l, r)
          : ((n = Ye(l)), n.c(), n.m(e.parentNode, e))
        : n && (n.d(1), (n = null));
    },
    i: A,
    o: A,
    d(l) {
      n && n.d(l), l && S(e);
    }
  };
}
function $t(t, e, n) {
  let { class: l = '' } = e,
    { id: r = '' } = e,
    { style: o = '' } = e,
    { icon: s } = e,
    { size: i = '' } = e,
    { color: f = '' } = e,
    { fw: c = !1 } = e,
    { pull: d = '' } = e,
    { scale: a = 1 } = e,
    { translateX: u = 0 } = e,
    { translateY: m = 0 } = e,
    { rotate: w = '' } = e,
    { flip: E = !1 } = e,
    { spin: C = !1 } = e,
    { pulse: z = !1 } = e,
    { primaryColor: R = '' } = e,
    { secondaryColor: j = '' } = e,
    { primaryOpacity: F = 1 } = e,
    { secondaryOpacity: se = 0.4 } = e,
    { swapOpacity: ie = !1 } = e,
    oe,
    p,
    O;
  return (
    (t.$$set = (h) => {
      'class' in h && n(0, (l = h.class)),
        'id' in h && n(1, (r = h.id)),
        'style' in h && n(13, (o = h.style)),
        'icon' in h && n(14, (s = h.icon)),
        'size' in h && n(15, (i = h.size)),
        'color' in h && n(2, (f = h.color)),
        'fw' in h && n(16, (c = h.fw)),
        'pull' in h && n(17, (d = h.pull)),
        'scale' in h && n(18, (a = h.scale)),
        'translateX' in h && n(19, (u = h.translateX)),
        'translateY' in h && n(20, (m = h.translateY)),
        'rotate' in h && n(21, (w = h.rotate)),
        'flip' in h && n(22, (E = h.flip)),
        'spin' in h && n(3, (C = h.spin)),
        'pulse' in h && n(4, (z = h.pulse)),
        'primaryColor' in h && n(5, (R = h.primaryColor)),
        'secondaryColor' in h && n(6, (j = h.secondaryColor)),
        'primaryOpacity' in h && n(7, (F = h.primaryOpacity)),
        'secondaryOpacity' in h && n(8, (se = h.secondaryOpacity)),
        'swapOpacity' in h && n(9, (ie = h.swapOpacity));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 16384 && n(10, (oe = (s && s.icon) || [0, 0, '', [], ''])),
        t.$$.dirty & 237568 && n(11, (p = Kt(o, i, d, c))),
        t.$$.dirty & 8126464 && n(12, (O = Zt(a, u, m, w, E, 512)));
    }),
    [l, r, f, C, z, R, j, F, se, ie, oe, p, O, o, s, i, c, d, a, u, m, w, E]
  );
}
class Ee extends K {
  constructor(e) {
    super(),
      X(this, e, $t, Qt, D, {
        class: 0,
        id: 1,
        style: 13,
        icon: 14,
        size: 15,
        color: 2,
        fw: 16,
        pull: 17,
        scale: 18,
        translateX: 19,
        translateY: 20,
        rotate: 21,
        flip: 22,
        spin: 3,
        pulse: 4,
        primaryColor: 5,
        secondaryColor: 6,
        primaryOpacity: 7,
        secondaryOpacity: 8,
        swapOpacity: 9
      });
  }
}
var Ve = {
    prefix: 'fas',
    iconName: 'pause',
    icon: [
      320,
      512,
      [9208],
      'f04c',
      'M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z'
    ]
  },
  xt = {
    prefix: 'fas',
    iconName: 'arrow-rotate-right',
    icon: [
      512,
      512,
      [8635, 'arrow-right-rotate', 'arrow-rotate-forward', 'redo'],
      'f01e',
      'M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z'
    ]
  },
  en = {
    prefix: 'fas',
    iconName: 'arrow-rotate-left',
    icon: [
      512,
      512,
      [
        8634,
        'arrow-left-rotate',
        'arrow-rotate-back',
        'arrow-rotate-backward',
        'undo'
      ],
      'f0e2',
      'M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z'
    ]
  },
  De = {
    prefix: 'fas',
    iconName: 'play',
    icon: [
      384,
      512,
      [9654],
      'f04b',
      'M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z'
    ]
  };
function tn(t) {
  let e, n, l, r, o, s, i, f, c, d, a, u, m;
  return (
    (r = new Ee({
      props: {
        style: 'font-size: 2rem; color: #ff6363; cursor: pointer;',
        icon: en
      }
    })),
    (i = new Ee({
      props: {
        style: 'font-size: 2rem; color: #ff6363; cursor: pointer;',
        icon: t[0] ? Ve : De
      }
    })),
    (d = new Ee({
      props: {
        style: 'font-size: 2rem; color: #ff6363; cursor: pointer;',
        icon: xt
      }
    })),
    {
      c() {
        (e = k('div')),
          (n = k('div')),
          (l = k('div')),
          V(r.$$.fragment),
          (o = Q()),
          (s = k('div')),
          V(i.$$.fragment),
          (f = Q()),
          (c = k('div')),
          V(d.$$.fragment),
          _(l, 'class', 'icon svelte-1m6qc18'),
          _(s, 'class', 'icon svelte-1m6qc18'),
          _(c, 'class', 'icon svelte-1m6qc18'),
          _(n, 'class', 'buttons svelte-1m6qc18'),
          _(e, 'class', 'container svelte-1m6qc18');
      },
      m(w, E) {
        L(w, e, E),
          v(e, n),
          v(n, l),
          q(r, l, null),
          v(n, o),
          v(n, s),
          q(i, s, null),
          v(n, f),
          v(n, c),
          q(d, c, null),
          (a = !0),
          u ||
            ((m = [
              M(l, 'click', t[4]),
              M(s, 'click', t[5]),
              M(c, 'click', t[6])
            ]),
            (u = !0));
      },
      p(w, [E]) {
        const C = {};
        E & 1 && (C.icon = w[0] ? Ve : De), i.$set(C);
      },
      i(w) {
        a ||
          (P(r.$$.fragment, w),
          P(i.$$.fragment, w),
          P(d.$$.fragment, w),
          (a = !0));
      },
      o(w) {
        N(r.$$.fragment, w), N(i.$$.fragment, w), N(d.$$.fragment, w), (a = !1);
      },
      d(w) {
        w && S(e), U(r), U(i), U(d), (u = !1), B(m);
      }
    }
  );
}
function nn(t, e, n) {
  let l = !1;
  const r = () => {
      H.set(null), H.set(W.RESET);
    },
    o = () => {
      H.set(null), l ? H.set(W.PAUSE) : H.set(W.PLAY), n(0, (l = !l));
    },
    s = () => {
      H.set(null), H.set(W.STEP);
    };
  return [l, r, o, s, () => r(), () => o(), () => s()];
}
class rn extends K {
  constructor(e) {
    super(), X(this, e, nn, tn, D, {});
  }
}
function ln(t) {
  let e, n, l, r, o, s, i, f, c, d;
  return (
    (n = new Xt({})),
    (s = new Bt({})),
    (c = new rn({})),
    {
      c() {
        (e = k('div')),
          V(n.$$.fragment),
          (l = Q()),
          (r = k('div')),
          (o = k('div')),
          V(s.$$.fragment),
          (i = Q()),
          (f = k('div')),
          V(c.$$.fragment),
          _(e, 'class', 'fixed world svelte-4561as'),
          _(o, 'class', 'selector svelte-4561as'),
          _(f, 'class', 'toolbar svelte-4561as'),
          _(r, 'class', 'fixed window svelte-4561as');
      },
      m(a, u) {
        L(a, e, u),
          q(n, e, null),
          L(a, l, u),
          L(a, r, u),
          v(r, o),
          q(s, o, null),
          v(r, i),
          v(r, f),
          q(c, f, null),
          (d = !0);
      },
      p: A,
      i(a) {
        d ||
          (P(n.$$.fragment, a),
          P(s.$$.fragment, a),
          P(c.$$.fragment, a),
          (d = !0));
      },
      o(a) {
        N(n.$$.fragment, a), N(s.$$.fragment, a), N(c.$$.fragment, a), (d = !1);
      },
      d(a) {
        a && S(e), U(n), a && S(l), a && S(r), U(s), U(c);
      }
    }
  );
}
class sn extends K {
  constructor(e) {
    super(), X(this, e, null, ln, D, {});
  }
}
function on(t) {
  let e, n, l;
  return (
    (n = new sn({})),
    {
      c() {
        (e = k('main')), V(n.$$.fragment);
      },
      m(r, o) {
        L(r, e, o), q(n, e, null), (l = !0);
      },
      p: A,
      i(r) {
        l || (P(n.$$.fragment, r), (l = !0));
      },
      o(r) {
        N(n.$$.fragment, r), (l = !1);
      },
      d(r) {
        r && S(e), U(n);
      }
    }
  );
}
class an extends K {
  constructor(e) {
    super(), X(this, e, null, on, D, {});
  }
}
const cn = async () => {
  const t = performance.now();
  await Ze();
  const e = performance.now();
  return (
    console.log(`Call to wasm init took ${e - t} milliseconds`),
    new an({ target: document.getElementById('app') })
  );
};
cn();
