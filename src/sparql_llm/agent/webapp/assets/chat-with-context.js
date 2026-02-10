const fr = (s, e) => s === e, hr = Symbol("solid-track"), yn = {
  equals: fr
};
let $s = zs;
const ft = 1, Tn = 2, Ds = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var me = null;
let zn = null, pr = null, fe = null, Re = null, nt = null, Mn = 0;
function xn(s, e) {
  const t = fe, n = me, r = s.length === 0, i = e === void 0 ? n : e, o = r ? Ds : {
    owned: null,
    cleanups: null,
    context: i ? i.context : null,
    owner: i
  }, l = r ? s : () => s(() => tn(() => en(o)));
  me = o, fe = null;
  try {
    return sn(l, !0);
  } finally {
    fe = t, me = n;
  }
}
function ze(s, e) {
  e = e ? Object.assign({}, yn, e) : yn;
  const t = {
    value: s,
    observers: null,
    observerSlots: null,
    comparator: e.equals || void 0
  }, n = (r) => (typeof r == "function" && (r = r(t.value)), Bs(t, r));
  return [Ps.bind(t), n];
}
function Be(s, e, t) {
  const n = Qn(s, e, !1, ft);
  nn(n);
}
function hs(s, e, t) {
  $s = mr;
  const n = Qn(s, e, !1, ft);
  n.user = !0, nt ? nt.push(n) : nn(n);
}
function Vt(s, e, t) {
  t = t ? Object.assign({}, yn, t) : yn;
  const n = Qn(s, e, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = t.equals || void 0, nn(n), Ps.bind(n);
}
function tn(s) {
  if (fe === null) return s();
  const e = fe;
  fe = null;
  try {
    return s();
  } finally {
    fe = e;
  }
}
function gr(s) {
  return me === null || (me.cleanups === null ? me.cleanups = [s] : me.cleanups.push(s)), s;
}
function Ps() {
  if (this.sources && this.state)
    if (this.state === ft) nn(this);
    else {
      const s = Re;
      Re = null, sn(() => Sn(this), !1), Re = s;
    }
  if (fe) {
    const s = this.observers ? this.observers.length : 0;
    fe.sources ? (fe.sources.push(this), fe.sourceSlots.push(s)) : (fe.sources = [this], fe.sourceSlots = [s]), this.observers ? (this.observers.push(fe), this.observerSlots.push(fe.sources.length - 1)) : (this.observers = [fe], this.observerSlots = [fe.sources.length - 1]);
  }
  return this.value;
}
function Bs(s, e, t) {
  let n = s.value;
  return (!s.comparator || !s.comparator(n, e)) && (s.value = e, s.observers && s.observers.length && sn(() => {
    for (let r = 0; r < s.observers.length; r += 1) {
      const i = s.observers[r], o = zn && zn.running;
      o && zn.disposed.has(i), (o ? !i.tState : !i.state) && (i.pure ? Re.push(i) : nt.push(i), i.observers && Us(i)), o || (i.state = ft);
    }
    if (Re.length > 1e6)
      throw Re = [], new Error();
  }, !1)), e;
}
function nn(s) {
  if (!s.fn) return;
  en(s);
  const e = Mn;
  dr(
    s,
    s.value,
    e
  );
}
function dr(s, e, t) {
  let n;
  const r = me, i = fe;
  fe = me = s;
  try {
    n = s.fn(e);
  } catch (o) {
    return s.pure && (s.state = ft, s.owned && s.owned.forEach(en), s.owned = null), s.updatedAt = t + 1, Hs(o);
  } finally {
    fe = i, me = r;
  }
  (!s.updatedAt || s.updatedAt <= t) && (s.updatedAt != null && "observers" in s ? Bs(s, n) : s.value = n, s.updatedAt = t);
}
function Qn(s, e, t, n = ft, r) {
  const i = {
    fn: s,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: me,
    context: me ? me.context : null,
    pure: t
  };
  return me === null || me !== Ds && (me.owned ? me.owned.push(i) : me.owned = [i]), i;
}
function An(s) {
  if (s.state === 0) return;
  if (s.state === Tn) return Sn(s);
  if (s.suspense && tn(s.suspense.inFallback)) return s.suspense.effects.push(s);
  const e = [s];
  for (; (s = s.owner) && (!s.updatedAt || s.updatedAt < Mn); )
    s.state && e.push(s);
  for (let t = e.length - 1; t >= 0; t--)
    if (s = e[t], s.state === ft)
      nn(s);
    else if (s.state === Tn) {
      const n = Re;
      Re = null, sn(() => Sn(s, e[0]), !1), Re = n;
    }
}
function sn(s, e) {
  if (Re) return s();
  let t = !1;
  e || (Re = []), nt ? t = !0 : nt = [], Mn++;
  try {
    const n = s();
    return br(t), n;
  } catch (n) {
    t || (nt = null), Re = null, Hs(n);
  }
}
function br(s) {
  if (Re && (zs(Re), Re = null), s) return;
  const e = nt;
  nt = null, e.length && sn(() => $s(e), !1);
}
function zs(s) {
  for (let e = 0; e < s.length; e++) An(s[e]);
}
function mr(s) {
  let e, t = 0;
  for (e = 0; e < s.length; e++) {
    const n = s[e];
    n.user ? s[t++] = n : An(n);
  }
  for (e = 0; e < t; e++) An(s[e]);
}
function Sn(s, e) {
  s.state = 0;
  for (let t = 0; t < s.sources.length; t += 1) {
    const n = s.sources[t];
    if (n.sources) {
      const r = n.state;
      r === ft ? n !== e && (!n.updatedAt || n.updatedAt < Mn) && An(n) : r === Tn && Sn(n, e);
    }
  }
}
function Us(s) {
  for (let e = 0; e < s.observers.length; e += 1) {
    const t = s.observers[e];
    t.state || (t.state = Tn, t.pure ? Re.push(t) : nt.push(t), t.observers && Us(t));
  }
}
function en(s) {
  let e;
  if (s.sources)
    for (; s.sources.length; ) {
      const t = s.sources.pop(), n = s.sourceSlots.pop(), r = t.observers;
      if (r && r.length) {
        const i = r.pop(), o = t.observerSlots.pop();
        n < r.length && (i.sourceSlots[o] = n, r[n] = i, t.observerSlots[n] = o);
      }
    }
  if (s.tOwned) {
    for (e = s.tOwned.length - 1; e >= 0; e--) en(s.tOwned[e]);
    delete s.tOwned;
  }
  if (s.owned) {
    for (e = s.owned.length - 1; e >= 0; e--) en(s.owned[e]);
    s.owned = null;
  }
  if (s.cleanups) {
    for (e = s.cleanups.length - 1; e >= 0; e--) s.cleanups[e]();
    s.cleanups = null;
  }
  s.state = 0;
}
function _r(s) {
  return s instanceof Error ? s : new Error(typeof s == "string" ? s : "Unknown error", {
    cause: s
  });
}
function Hs(s, e = me) {
  throw _r(s);
}
const wr = Symbol("fallback");
function ps(s) {
  for (let e = 0; e < s.length; e++) s[e]();
}
function xr(s, e, t = {}) {
  let n = [], r = [], i = [], o = 0, l = e.length > 1 ? [] : null;
  return gr(() => ps(i)), () => {
    let f = s() || [], h = f.length, g, p;
    return f[hr], tn(() => {
      let R, L, x, Z, te, ne, j, I, X;
      if (h === 0)
        o !== 0 && (ps(i), i = [], n = [], r = [], o = 0, l && (l = [])), t.fallback && (n = [wr], r[0] = xn((we) => (i[0] = we, t.fallback())), o = 1);
      else if (o === 0) {
        for (r = new Array(h), p = 0; p < h; p++)
          n[p] = f[p], r[p] = xn(M);
        o = h;
      } else {
        for (x = new Array(h), Z = new Array(h), l && (te = new Array(h)), ne = 0, j = Math.min(o, h); ne < j && n[ne] === f[ne]; ne++) ;
        for (j = o - 1, I = h - 1; j >= ne && I >= ne && n[j] === f[I]; j--, I--)
          x[I] = r[j], Z[I] = i[j], l && (te[I] = l[j]);
        for (R = /* @__PURE__ */ new Map(), L = new Array(I + 1), p = I; p >= ne; p--)
          X = f[p], g = R.get(X), L[p] = g === void 0 ? -1 : g, R.set(X, p);
        for (g = ne; g <= j; g++)
          X = n[g], p = R.get(X), p !== void 0 && p !== -1 ? (x[p] = r[g], Z[p] = i[g], l && (te[p] = l[g]), p = L[p], R.set(X, p)) : i[g]();
        for (p = ne; p < h; p++)
          p in x ? (r[p] = x[p], i[p] = Z[p], l && (l[p] = te[p], l[p](p))) : r[p] = xn(M);
        r = r.slice(0, o = h), n = f.slice(0);
      }
      return r;
    });
    function M(R) {
      if (i[p] = R, l) {
        const [L, x] = ze(p);
        return l[p] = x, e(f[p], L);
      }
      return e(f[p]);
    }
  };
}
function Nt(s, e) {
  return tn(() => s(e || {}));
}
function Lt(s) {
  const e = "fallback" in s && {
    fallback: () => s.fallback
  };
  return Vt(xr(() => s.each, s.children, e || void 0));
}
function kr(s, e, t) {
  let n = t.length, r = e.length, i = n, o = 0, l = 0, f = e[r - 1].nextSibling, h = null;
  for (; o < r || l < i; ) {
    if (e[o] === t[l]) {
      o++, l++;
      continue;
    }
    for (; e[r - 1] === t[i - 1]; )
      r--, i--;
    if (r === o) {
      const g = i < n ? l ? t[l - 1].nextSibling : t[i - l] : f;
      for (; l < i; ) s.insertBefore(t[l++], g);
    } else if (i === l)
      for (; o < r; )
        (!h || !h.has(e[o])) && e[o].remove(), o++;
    else if (e[o] === t[i - 1] && t[l] === e[r - 1]) {
      const g = e[--r].nextSibling;
      s.insertBefore(t[l++], e[o++].nextSibling), s.insertBefore(t[--i], g), e[r] = t[i];
    } else {
      if (!h) {
        h = /* @__PURE__ */ new Map();
        let p = l;
        for (; p < i; ) h.set(t[p], p++);
      }
      const g = h.get(e[o]);
      if (g != null)
        if (l < g && g < i) {
          let p = o, M = 1, R;
          for (; ++p < r && p < i && !((R = h.get(e[p])) == null || R !== g + M); )
            M++;
          if (M > g - l) {
            const L = e[o];
            for (; l < g; ) s.insertBefore(t[l++], L);
          } else s.replaceChild(t[l++], e[o++]);
        } else o++;
      else e[o++].remove();
    }
  }
}
const gs = "_$DX_DELEGATE";
function ve(s, e, t, n) {
  let r;
  const i = () => {
    const l = document.createElement("template");
    return l.innerHTML = s, l.content.firstChild;
  }, o = () => (r || (r = i())).cloneNode(!0);
  return o.cloneNode = o, o;
}
function Er(s, e = window.document) {
  const t = e[gs] || (e[gs] = /* @__PURE__ */ new Set());
  for (let n = 0, r = s.length; n < r; n++) {
    const i = s[n];
    t.has(i) || (t.add(i), e.addEventListener(i, yr));
  }
}
function de(s, e, t) {
  t == null ? s.removeAttribute(e) : s.setAttribute(e, t);
}
function It(s, e) {
  e == null ? s.removeAttribute("class") : s.className = e;
}
function ds(s, e, t) {
  return tn(() => s(e, t));
}
function be(s, e, t, n) {
  if (t !== void 0 && !n && (n = []), typeof e != "function") return Rn(s, e, n, t);
  Be((r) => Rn(s, e(), r, t), n);
}
function yr(s) {
  let e = s.target;
  const t = `$$${s.type}`, n = s.target, r = s.currentTarget, i = (f) => Object.defineProperty(s, "target", {
    configurable: !0,
    value: f
  }), o = () => {
    const f = e[t];
    if (f && !e.disabled) {
      const h = e[`${t}Data`];
      if (h !== void 0 ? f.call(e, h, s) : f.call(e, s), s.cancelBubble) return;
    }
    return e.host && typeof e.host != "string" && !e.host._$host && e.contains(s.target) && i(e.host), !0;
  }, l = () => {
    for (; o() && (e = e._$host || e.parentNode || e.host); ) ;
  };
  if (Object.defineProperty(s, "currentTarget", {
    configurable: !0,
    get() {
      return e || document;
    }
  }), s.composedPath) {
    const f = s.composedPath();
    i(f[0]);
    for (let h = 0; h < f.length - 2 && (e = f[h], !!o()); h++) {
      if (e._$host) {
        e = e._$host, l();
        break;
      }
      if (e.parentNode === r)
        break;
    }
  } else l();
  i(n);
}
function Rn(s, e, t, n, r) {
  for (; typeof t == "function"; ) t = t();
  if (e === t) return t;
  const i = typeof e, o = n !== void 0;
  if (s = o && t[0] && t[0].parentNode || s, i === "string" || i === "number") {
    if (i === "number" && (e = e.toString(), e === t))
      return t;
    if (o) {
      let l = t[0];
      l && l.nodeType === 3 ? l.data !== e && (l.data = e) : l = document.createTextNode(e), t = $t(s, t, n, l);
    } else
      t !== "" && typeof t == "string" ? t = s.firstChild.data = e : t = s.textContent = e;
  } else if (e == null || i === "boolean")
    t = $t(s, t, n);
  else {
    if (i === "function")
      return Be(() => {
        let l = e();
        for (; typeof l == "function"; ) l = l();
        t = Rn(s, l, t, n);
      }), () => t;
    if (Array.isArray(e)) {
      const l = [], f = t && Array.isArray(t);
      if (Yn(l, e, t, r))
        return Be(() => t = Rn(s, l, t, n, !0)), () => t;
      if (l.length === 0) {
        if (t = $t(s, t, n), o) return t;
      } else f ? t.length === 0 ? bs(s, l, n) : kr(s, t, l) : (t && $t(s), bs(s, l));
      t = l;
    } else if (e.nodeType) {
      if (Array.isArray(t)) {
        if (o) return t = $t(s, t, n, e);
        $t(s, t, null, e);
      } else t == null || t === "" || !s.firstChild ? s.appendChild(e) : s.replaceChild(e, s.firstChild);
      t = e;
    }
  }
  return t;
}
function Yn(s, e, t, n) {
  let r = !1;
  for (let i = 0, o = e.length; i < o; i++) {
    let l = e[i], f = t && t[s.length], h;
    if (!(l == null || l === !0 || l === !1)) if ((h = typeof l) == "object" && l.nodeType)
      s.push(l);
    else if (Array.isArray(l))
      r = Yn(s, l, f) || r;
    else if (h === "function")
      if (n) {
        for (; typeof l == "function"; ) l = l();
        r = Yn(
          s,
          Array.isArray(l) ? l : [l],
          Array.isArray(f) ? f : [f]
        ) || r;
      } else
        s.push(l), r = !0;
    else {
      const g = String(l);
      f && f.nodeType === 3 && f.data === g ? s.push(f) : s.push(document.createTextNode(g));
    }
  }
  return r;
}
function bs(s, e, t = null) {
  for (let n = 0, r = e.length; n < r; n++) s.insertBefore(e[n], t);
}
function $t(s, e, t, n) {
  if (t === void 0) return s.textContent = "";
  const r = n || document.createTextNode("");
  if (e.length) {
    let i = !1;
    for (let o = e.length - 1; o >= 0; o--) {
      const l = e[o];
      if (r !== l) {
        const f = l.parentNode === s;
        !i && !o ? f ? s.replaceChild(r, l) : s.insertBefore(r, t) : f && l.remove();
      } else i = !0;
    }
  } else s.insertBefore(r, t);
  return [r];
}
function Tr(s) {
  return Object.keys(s).reduce((t, n) => {
    const r = s[n];
    return t[n] = Object.assign({}, r), js(r.value) && !Cr(r.value) && !Array.isArray(r.value) && (t[n].value = Object.assign({}, r.value)), Array.isArray(r.value) && (t[n].value = r.value.slice(0)), t;
  }, {});
}
function Ar(s) {
  return s ? Object.keys(s).reduce((t, n) => {
    const r = s[n];
    return t[n] = js(r) && "value" in r ? r : {
      value: r
    }, t[n].attribute || (t[n].attribute = vr(n)), t[n].parse = "parse" in t[n] ? t[n].parse : typeof t[n].value != "string", t;
  }, {}) : {};
}
function Sr(s) {
  return Object.keys(s).reduce((t, n) => (t[n] = s[n].value, t), {});
}
function Rr(s, e) {
  const t = Tr(e);
  return Object.keys(e).forEach((r) => {
    const i = t[r], o = s.getAttribute(i.attribute), l = s[r];
    o != null && (i.value = i.parse ? Fs(o) : o), l != null && (i.value = Array.isArray(l) ? l.slice(0) : l), i.reflect && ms(s, i.attribute, i.value, !!i.parse), Object.defineProperty(s, r, {
      get() {
        return i.value;
      },
      set(f) {
        const h = i.value;
        i.value = f, i.reflect && ms(this, i.attribute, i.value, !!i.parse);
        for (let g = 0, p = this.__propertyChangedCallbacks.length; g < p; g++)
          this.__propertyChangedCallbacks[g](r, f, h);
      },
      enumerable: !0,
      configurable: !0
    });
  }), t;
}
function Fs(s) {
  if (s)
    try {
      return JSON.parse(s);
    } catch {
      return s;
    }
}
function ms(s, e, t, n) {
  if (t == null || t === !1) return s.removeAttribute(e);
  let r = n ? JSON.stringify(t) : t;
  s.__updating[e] = !0, r === "true" && (r = ""), s.setAttribute(e, r), Promise.resolve().then(() => delete s.__updating[e]);
}
function vr(s) {
  return s.replace(/\.?([A-Z]+)/g, (e, t) => "-" + t.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function js(s) {
  return s != null && (typeof s == "object" || typeof s == "function");
}
function Cr(s) {
  return Object.prototype.toString.call(s) === "[object Function]";
}
function Or(s) {
  return typeof s == "function" && s.toString().indexOf("class") === 0;
}
let Qt;
function Mr() {
  Object.defineProperty(Qt, "renderRoot", {
    value: Qt
  });
}
function Nr(s, e) {
  const t = Object.keys(e);
  return class extends s {
    static get observedAttributes() {
      return t.map((r) => e[r].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized) return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Rr(this, e);
      const r = Sr(this.props), i = this.Component, o = Qt;
      try {
        Qt = this, this.__initialized = !0, Or(i) ? new i(r, {
          element: this
        }) : i(r, {
          element: this
        });
      } finally {
        Qt = o;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected) return;
      this.__propertyChangedCallbacks.length = 0;
      let r = null;
      for (; r = this.__releaseCallbacks.pop(); ) r(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(r, i, o) {
      if (this.__initialized && !this.__updating[r] && (r = this.lookupProp(r), r in e)) {
        if (o == null && !this[r]) return;
        this[r] = e[r].parse ? Fs(o) : o;
      }
    }
    lookupProp(r) {
      if (e)
        return t.find((i) => r === i || r === e[i].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(r) {
      this.__releaseCallbacks.push(r);
    }
    addPropertyChangedCallback(r) {
      this.__propertyChangedCallbacks.push(r);
    }
  };
}
function Lr(s, e = {}, t = {}) {
  const {
    BaseElement: n = HTMLElement,
    extension: r,
    customElements: i = window.customElements
  } = t;
  return (o) => {
    let l = i.get(s);
    return l ? (l.prototype.Component = o, l) : (l = Nr(n, Ar(e)), l.prototype.Component = o, l.prototype.registeredTag = s, i.define(s, l, r), l);
  };
}
function Ir(s) {
  const e = Object.keys(s), t = {};
  for (let n = 0; n < e.length; n++) {
    const [r, i] = ze(s[e[n]]);
    Object.defineProperty(t, e[n], {
      get: r,
      set(o) {
        i(() => o);
      }
    });
  }
  return t;
}
function $r(s) {
  if (s.assignedSlot && s.assignedSlot._$owner) return s.assignedSlot._$owner;
  let e = s.parentNode;
  for (; e && !e._$owner && !(e.assignedSlot && e.assignedSlot._$owner); )
    e = e.parentNode;
  return e && e.assignedSlot ? e.assignedSlot._$owner : s._$owner;
}
function Dr(s) {
  return (e, t) => {
    const { element: n } = t;
    return xn((r) => {
      const i = Ir(e);
      n.addPropertyChangedCallback((l, f) => i[l] = f), n.addReleaseCallback(() => {
        n.renderRoot.textContent = "", r();
      });
      const o = s(i, t);
      return be(n.renderRoot, o);
    }, $r(n));
  };
}
function Pr(s, e, t) {
  return arguments.length === 2 && (t = e, e = {}), Lr(s, e)(Dr(t));
}
function Jn() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
let Et = Jn();
function Gs(s) {
  Et = s;
}
const Jt = { exec: () => null };
function Y(s, e = "") {
  let t = typeof s == "string" ? s : s.source;
  const n = {
    replace: (r, i) => {
      let o = typeof i == "string" ? i : i.source;
      return o = o.replace(Me.caret, "$1"), t = t.replace(r, o), n;
    },
    getRegex: () => new RegExp(t, e)
  };
  return n;
}
const Me = {
  codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
  outputLinkReplace: /\\([\[\]])/g,
  indentCodeCompensation: /^(\s+)(?:```)/,
  beginningSpace: /^\s+/,
  endingHash: /#$/,
  startingSpaceChar: /^ /,
  endingSpaceChar: / $/,
  nonSpaceChar: /[^ ]/,
  newLineCharGlobal: /\n/g,
  tabCharGlobal: /\t/g,
  multipleSpaceGlobal: /\s+/g,
  blankLine: /^[ \t]*$/,
  doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
  blockquoteStart: /^ {0,3}>/,
  blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
  blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
  listReplaceTabs: /^\t+/,
  listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
  listIsTask: /^\[[ xX]\] /,
  listReplaceTask: /^\[[ xX]\] +/,
  anyLine: /\n.*\n/,
  hrefBrackets: /^<(.*)>$/,
  tableDelimiter: /[:|]/,
  tableAlignChars: /^\||\| *$/g,
  tableRowBlankLine: /\n[ \t]*$/,
  tableAlignRight: /^ *-+: *$/,
  tableAlignCenter: /^ *:-+: *$/,
  tableAlignLeft: /^ *:-+ *$/,
  startATag: /^<a /i,
  endATag: /^<\/a>/i,
  startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
  endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
  startAngleBracket: /^</,
  endAngleBracket: />$/,
  pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
  unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
  escapeTest: /[&<>"']/,
  escapeReplace: /[&<>"']/g,
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
  caret: /(^|[^\[])\^/g,
  percentDecode: /%25/g,
  findPipe: /\|/g,
  splitPipe: / \|/,
  slashPipe: /\\\|/g,
  carriageReturn: /\r\n|\r/g,
  spaceLine: /^ +$/gm,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  listItemRegex: (s) => new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
  hrRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
  fencesBeginRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}(?:\`\`\`|~~~)`),
  headingBeginRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}#`),
  htmlBeginRegex: (s) => new RegExp(`^ {0,${Math.min(3, s - 1)}}<(?:[a-z].*>|!--)`, "i")
}, Br = /^(?:[ \t]*(?:\n|$))+/, zr = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Ur = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, rn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Hr = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, qs = /(?:[*+-]|\d{1,9}[.)])/, Ws = Y(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, qs).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), es = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Fr = /^[^\n]+/, ts = /(?!\s*\])(?:\\.|[^\[\]\\])+/, jr = Y(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ts).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Gr = Y(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, qs).getRegex(), Nn = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ns = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, qr = Y("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ns).replace("tag", Nn).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Ks = Y(es).replace("hr", rn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Nn).getRegex(), Wr = Y(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ks).getRegex(), ss = {
  blockquote: Wr,
  code: zr,
  def: jr,
  fences: Ur,
  heading: Hr,
  hr: rn,
  html: qr,
  lheading: Ws,
  list: Gr,
  newline: Br,
  paragraph: Ks,
  table: Jt,
  text: Fr
}, _s = Y("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", rn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Nn).getRegex(), Kr = {
  ...ss,
  table: _s,
  paragraph: Y(es).replace("hr", rn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", _s).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Nn).getRegex()
}, Yr = {
  ...ss,
  html: Y(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ns).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Jt,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: Y(es).replace("hr", rn).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Ws).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Ys = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Zr = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Zs = /^( {2,}|\\)\n(?!\s*$)/, Xr = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Ln = /[\p{P}\p{S}]/u, rs = /[\s\p{P}\p{S}]/u, Xs = /[^\s\p{P}\p{S}]/u, Vr = Y(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, rs).getRegex(), Qr = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, Jr = Y(/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, "u").replace(/punct/g, Ln).getRegex(), ei = Y("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Xs).replace(/punctSpace/g, rs).replace(/punct/g, Ln).getRegex(), ti = Y("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Xs).replace(/punctSpace/g, rs).replace(/punct/g, Ln).getRegex(), ni = Y(/\\(punct)/, "gu").replace(/punct/g, Ln).getRegex(), si = Y(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), ri = Y(ns).replace("(?:-->|$)", "-->").getRegex(), ii = Y("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", ri).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), vn = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, oi = Y(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", vn).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Vs = Y(/^!?\[(label)\]\[(ref)\]/).replace("label", vn).replace("ref", ts).getRegex(), Qs = Y(/^!?\[(ref)\](?:\[\])?/).replace("ref", ts).getRegex(), li = Y("reflink|nolink(?!\\()", "g").replace("reflink", Vs).replace("nolink", Qs).getRegex(), is = {
  _backpedal: Jt,
  // only used for GFM url
  anyPunctuation: ni,
  autolink: si,
  blockSkip: Qr,
  br: Zs,
  code: Zr,
  del: Jt,
  emStrongLDelim: Jr,
  emStrongRDelimAst: ei,
  emStrongRDelimUnd: ti,
  escape: Ys,
  link: oi,
  nolink: Qs,
  punctuation: Vr,
  reflink: Vs,
  reflinkSearch: li,
  tag: ii,
  text: Xr,
  url: Jt
}, ai = {
  ...is,
  link: Y(/^!?\[(label)\]\((.*?)\)/).replace("label", vn).getRegex(),
  reflink: Y(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", vn).getRegex()
}, Zn = {
  ...is,
  escape: Y(Ys).replace("])", "~|])").getRegex(),
  url: Y(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, ci = {
  ...Zn,
  br: Y(Zs).replace("{2,}", "*").getRegex(),
  text: Y(Zn.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, mn = {
  normal: ss,
  gfm: Kr,
  pedantic: Yr
}, Gt = {
  normal: is,
  gfm: Zn,
  breaks: ci,
  pedantic: ai
}, ui = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, ws = (s) => ui[s];
function Qe(s, e) {
  if (e) {
    if (Me.escapeTest.test(s))
      return s.replace(Me.escapeReplace, ws);
  } else if (Me.escapeTestNoEncode.test(s))
    return s.replace(Me.escapeReplaceNoEncode, ws);
  return s;
}
function xs(s) {
  try {
    s = encodeURI(s).replace(Me.percentDecode, "%");
  } catch {
    return null;
  }
  return s;
}
function ks(s, e) {
  const t = s.replace(Me.findPipe, (i, o, l) => {
    let f = !1, h = o;
    for (; --h >= 0 && l[h] === "\\"; )
      f = !f;
    return f ? "|" : " |";
  }), n = t.split(Me.splitPipe);
  let r = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e)
    if (n.length > e)
      n.splice(e);
    else
      for (; n.length < e; )
        n.push("");
  for (; r < n.length; r++)
    n[r] = n[r].trim().replace(Me.slashPipe, "|");
  return n;
}
function qt(s, e, t) {
  const n = s.length;
  if (n === 0)
    return "";
  let r = 0;
  for (; r < n && s.charAt(n - r - 1) === e; )
    r++;
  return s.slice(0, n - r);
}
function fi(s, e) {
  if (s.indexOf(e[1]) === -1)
    return -1;
  let t = 0;
  for (let n = 0; n < s.length; n++)
    if (s[n] === "\\")
      n++;
    else if (s[n] === e[0])
      t++;
    else if (s[n] === e[1] && (t--, t < 0))
      return n;
  return -1;
}
function Es(s, e, t, n, r) {
  const i = e.href, o = e.title || null, l = s[1].replace(r.other.outputLinkReplace, "$1");
  if (s[0].charAt(0) !== "!") {
    n.state.inLink = !0;
    const f = {
      type: "link",
      raw: t,
      href: i,
      title: o,
      text: l,
      tokens: n.inlineTokens(l)
    };
    return n.state.inLink = !1, f;
  }
  return {
    type: "image",
    raw: t,
    href: i,
    title: o,
    text: l
  };
}
function hi(s, e, t) {
  const n = s.match(t.other.indentCodeCompensation);
  if (n === null)
    return e;
  const r = n[1];
  return e.split(`
`).map((i) => {
    const o = i.match(t.other.beginningSpace);
    if (o === null)
      return i;
    const [l] = o;
    return l.length >= r.length ? i.slice(r.length) : i;
  }).join(`
`);
}
class Cn {
  options;
  rules;
  // set by the lexer
  lexer;
  // set by the lexer
  constructor(e) {
    this.options = e || Et;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0)
      return {
        type: "space",
        raw: t[0]
      };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? n : qt(n, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const n = t[0], r = hi(n, t[3] || "", this.rules);
      return {
        type: "code",
        raw: n,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: r
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        const r = qt(n, "#");
        (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t)
      return {
        type: "hr",
        raw: qt(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = qt(t[0], `
`).split(`
`), r = "", i = "";
      const o = [];
      for (; n.length > 0; ) {
        let l = !1;
        const f = [];
        let h;
        for (h = 0; h < n.length; h++)
          if (this.rules.other.blockquoteStart.test(n[h]))
            f.push(n[h]), l = !0;
          else if (!l)
            f.push(n[h]);
          else
            break;
        n = n.slice(h);
        const g = f.join(`
`), p = g.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r = r ? `${r}
${g}` : g, i = i ? `${i}
${p}` : p;
        const M = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(p, o, !0), this.lexer.state.top = M, n.length === 0)
          break;
        const R = o.at(-1);
        if (R?.type === "code")
          break;
        if (R?.type === "blockquote") {
          const L = R, x = L.raw + `
` + n.join(`
`), Z = this.blockquote(x);
          o[o.length - 1] = Z, r = r.substring(0, r.length - L.raw.length) + Z.raw, i = i.substring(0, i.length - L.text.length) + Z.text;
          break;
        } else if (R?.type === "list") {
          const L = R, x = L.raw + `
` + n.join(`
`), Z = this.list(x);
          o[o.length - 1] = Z, r = r.substring(0, r.length - R.raw.length) + Z.raw, i = i.substring(0, i.length - L.raw.length) + Z.raw, n = x.substring(o.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: r,
        tokens: o,
        text: i
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim();
      const r = n.length > 1, i = {
        type: "list",
        raw: "",
        ordered: r,
        start: r ? +n.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
      const o = this.rules.other.listItemRegex(n);
      let l = !1;
      for (; e; ) {
        let h = !1, g = "", p = "";
        if (!(t = o.exec(e)) || this.rules.block.hr.test(e))
          break;
        g = t[0], e = e.substring(g.length);
        let M = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (ne) => " ".repeat(3 * ne.length)), R = e.split(`
`, 1)[0], L = !M.trim(), x = 0;
        if (this.options.pedantic ? (x = 2, p = M.trimStart()) : L ? x = t[1].length + 1 : (x = t[2].search(this.rules.other.nonSpaceChar), x = x > 4 ? 1 : x, p = M.slice(x), x += t[1].length), L && this.rules.other.blankLine.test(R) && (g += R + `
`, e = e.substring(R.length + 1), h = !0), !h) {
          const ne = this.rules.other.nextBulletRegex(x), j = this.rules.other.hrRegex(x), I = this.rules.other.fencesBeginRegex(x), X = this.rules.other.headingBeginRegex(x), we = this.rules.other.htmlBeginRegex(x);
          for (; e; ) {
            const xe = e.split(`
`, 1)[0];
            let $;
            if (R = xe, this.options.pedantic ? (R = R.replace(this.rules.other.listReplaceNesting, "  "), $ = R) : $ = R.replace(this.rules.other.tabCharGlobal, "    "), I.test(R) || X.test(R) || we.test(R) || ne.test(R) || j.test(R))
              break;
            if ($.search(this.rules.other.nonSpaceChar) >= x || !R.trim())
              p += `
` + $.slice(x);
            else {
              if (L || M.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || I.test(M) || X.test(M) || j.test(M))
                break;
              p += `
` + R;
            }
            !L && !R.trim() && (L = !0), g += xe + `
`, e = e.substring(xe.length + 1), M = $.slice(x);
          }
        }
        i.loose || (l ? i.loose = !0 : this.rules.other.doubleBlankLine.test(g) && (l = !0));
        let Z = null, te;
        this.options.gfm && (Z = this.rules.other.listIsTask.exec(p), Z && (te = Z[0] !== "[ ] ", p = p.replace(this.rules.other.listReplaceTask, ""))), i.items.push({
          type: "list_item",
          raw: g,
          task: !!Z,
          checked: te,
          loose: !1,
          text: p,
          tokens: []
        }), i.raw += g;
      }
      const f = i.items.at(-1);
      f && (f.raw = f.raw.trimEnd(), f.text = f.text.trimEnd()), i.raw = i.raw.trimEnd();
      for (let h = 0; h < i.items.length; h++)
        if (this.lexer.state.top = !1, i.items[h].tokens = this.lexer.blockTokens(i.items[h].text, []), !i.loose) {
          const g = i.items[h].tokens.filter((M) => M.type === "space"), p = g.length > 0 && g.some((M) => this.rules.other.anyLine.test(M.raw));
          i.loose = p;
        }
      if (i.loose)
        for (let h = 0; h < i.items.length; h++)
          i.items[h].loose = !0;
      return i;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t)
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: t[0]
      };
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: n,
        raw: t[0],
        href: r,
        title: i
      };
    }
  }
  table(e) {
    const t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2]))
      return;
    const n = ks(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], o = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (n.length === r.length) {
      for (const l of r)
        this.rules.other.tableAlignRight.test(l) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(l) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(l) ? o.align.push("left") : o.align.push(null);
      for (let l = 0; l < n.length; l++)
        o.header.push({
          text: n[l],
          tokens: this.lexer.inline(n[l]),
          header: !0,
          align: o.align[l]
        });
      for (const l of i)
        o.rows.push(ks(l, o.header.length).map((f, h) => ({
          text: f,
          tokens: this.lexer.inline(f),
          header: !1,
          align: o.align[h]
        })));
      return o;
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1])
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0])
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t)
      return {
        type: "escape",
        raw: t[0],
        text: t[1]
      };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: t[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: t[0]
      };
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const n = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
        if (!this.rules.other.endAngleBracket.test(n))
          return;
        const o = qt(n.slice(0, -1), "\\");
        if ((n.length - o.length) % 2 === 0)
          return;
      } else {
        const o = fi(t[2], "()");
        if (o > -1) {
          const f = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + o;
          t[2] = t[2].substring(0, o), t[0] = t[0].substring(0, f).trim(), t[3] = "";
        }
      }
      let r = t[2], i = "";
      if (this.options.pedantic) {
        const o = this.rules.other.pedanticHrefTitle.exec(r);
        o && (r = o[1], i = o[3]);
      } else
        i = t[3] ? t[3].slice(1, -1) : "";
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), Es(t, {
        href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
        title: i && i.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer, this.rules);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      const r = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t[r.toLowerCase()];
      if (!i) {
        const o = n[0].charAt(0);
        return {
          type: "text",
          raw: o,
          text: o
        };
      }
      return Es(n, i, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let r = this.rules.inline.emStrongLDelim.exec(e);
    if (!r || r[3] && n.match(this.rules.other.unicodeAlphaNumeric))
      return;
    if (!(r[1] || r[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const o = [...r[0]].length - 1;
      let l, f, h = o, g = 0;
      const p = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (p.lastIndex = 0, t = t.slice(-1 * e.length + o); (r = p.exec(t)) != null; ) {
        if (l = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !l)
          continue;
        if (f = [...l].length, r[3] || r[4]) {
          h += f;
          continue;
        } else if ((r[5] || r[6]) && o % 3 && !((o + f) % 3)) {
          g += f;
          continue;
        }
        if (h -= f, h > 0)
          continue;
        f = Math.min(f, f + h + g);
        const M = [...r[0]][0].length, R = e.slice(0, o + r.index + M + f);
        if (Math.min(o, f) % 2) {
          const x = R.slice(1, -1);
          return {
            type: "em",
            raw: R,
            text: x,
            tokens: this.lexer.inlineTokens(x)
          };
        }
        const L = R.slice(2, -2);
        return {
          type: "strong",
          raw: R,
          text: L,
          tokens: this.lexer.inlineTokens(L)
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(this.rules.other.newLineCharGlobal, " ");
      const r = this.rules.other.nonSpaceChar.test(n), i = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return r && i && (n = n.substring(1, n.length - 1)), {
        type: "codespan",
        raw: t[0],
        text: n
      };
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t)
      return {
        type: "br",
        raw: t[0]
      };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2])
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let n, r;
      return t[2] === "@" ? (n = t[1], r = "mailto:" + n) : (n = t[1], r = n), {
        type: "link",
        raw: t[0],
        text: n,
        href: r,
        tokens: [
          {
            type: "text",
            raw: n,
            text: n
          }
        ]
      };
    }
  }
  url(e) {
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let n, r;
      if (t[2] === "@")
        n = t[0], r = "mailto:" + n;
      else {
        let i;
        do
          i = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
        while (i !== t[0]);
        n = t[0], t[1] === "www." ? r = "http://" + t[0] : r = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: n,
        href: r,
        tokens: [
          {
            type: "text",
            raw: n,
            text: n
          }
        ]
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      const n = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        escaped: n
      };
    }
  }
}
class je {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(e) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || Et, this.options.tokenizer = this.options.tokenizer || new Cn(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const t = {
      other: Me,
      block: mn.normal,
      inline: Gt.normal
    };
    this.options.pedantic ? (t.block = mn.pedantic, t.inline = Gt.pedantic) : this.options.gfm && (t.block = mn.gfm, this.options.breaks ? t.inline = Gt.breaks : t.inline = Gt.gfm), this.tokenizer.rules = t;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: mn,
      inline: Gt
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, t) {
    return new je(t).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, t) {
    return new je(t).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(Me.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      const n = this.inlineQueue[t];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], n = !1) {
    for (this.options.pedantic && (e = e.replace(Me.tabCharGlobal, "    ").replace(Me.spaceLine, "")); e; ) {
      let r;
      if (this.options.extensions?.block?.some((o) => (r = o.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), !0) : !1))
        continue;
      if (r = this.tokenizer.space(e)) {
        e = e.substring(r.raw.length);
        const o = t.at(-1);
        r.raw.length === 1 && o !== void 0 ? o.raw += `
` : t.push(r);
        continue;
      }
      if (r = this.tokenizer.code(e)) {
        e = e.substring(r.raw.length);
        const o = t.at(-1);
        o?.type === "paragraph" || o?.type === "text" ? (o.raw += `
` + r.raw, o.text += `
` + r.text, this.inlineQueue.at(-1).src = o.text) : t.push(r);
        continue;
      }
      if (r = this.tokenizer.fences(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.heading(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.hr(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.blockquote(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.list(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.html(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.def(e)) {
        e = e.substring(r.raw.length);
        const o = t.at(-1);
        o?.type === "paragraph" || o?.type === "text" ? (o.raw += `
` + r.raw, o.text += `
` + r.raw, this.inlineQueue.at(-1).src = o.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
          href: r.href,
          title: r.title
        });
        continue;
      }
      if (r = this.tokenizer.table(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.lheading(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      let i = e;
      if (this.options.extensions?.startBlock) {
        let o = 1 / 0;
        const l = e.slice(1);
        let f;
        this.options.extensions.startBlock.forEach((h) => {
          f = h.call({ lexer: this }, l), typeof f == "number" && f >= 0 && (o = Math.min(o, f));
        }), o < 1 / 0 && o >= 0 && (i = e.substring(0, o + 1));
      }
      if (this.state.top && (r = this.tokenizer.paragraph(i))) {
        const o = t.at(-1);
        n && o?.type === "paragraph" ? (o.raw += `
` + r.raw, o.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : t.push(r), n = i.length !== e.length, e = e.substring(r.raw.length);
        continue;
      }
      if (r = this.tokenizer.text(e)) {
        e = e.substring(r.raw.length);
        const o = t.at(-1);
        o?.type === "text" ? (o.raw += `
` + r.raw, o.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : t.push(r);
        continue;
      }
      if (e) {
        const o = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(o);
          break;
        } else
          throw new Error(o);
      }
    }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, t = []) {
    let n = e, r = null;
    if (this.tokens.links) {
      const l = Object.keys(this.tokens.links);
      if (l.length > 0)
        for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null; )
          l.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; )
      n = n.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null; )
      n = n.slice(0, r.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let i = !1, o = "";
    for (; e; ) {
      i || (o = ""), i = !1;
      let l;
      if (this.options.extensions?.inline?.some((h) => (l = h.call({ lexer: this }, e, t)) ? (e = e.substring(l.raw.length), t.push(l), !0) : !1))
        continue;
      if (l = this.tokenizer.escape(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.tag(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.link(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(l.raw.length);
        const h = t.at(-1);
        l.type === "text" && h?.type === "text" ? (h.raw += l.raw, h.text += l.text) : t.push(l);
        continue;
      }
      if (l = this.tokenizer.emStrong(e, n, o)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.codespan(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.br(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.del(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.autolink(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (!this.state.inLink && (l = this.tokenizer.url(e))) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      let f = e;
      if (this.options.extensions?.startInline) {
        let h = 1 / 0;
        const g = e.slice(1);
        let p;
        this.options.extensions.startInline.forEach((M) => {
          p = M.call({ lexer: this }, g), typeof p == "number" && p >= 0 && (h = Math.min(h, p));
        }), h < 1 / 0 && h >= 0 && (f = e.substring(0, h + 1));
      }
      if (l = this.tokenizer.inlineText(f)) {
        e = e.substring(l.raw.length), l.raw.slice(-1) !== "_" && (o = l.raw.slice(-1)), i = !0;
        const h = t.at(-1);
        h?.type === "text" ? (h.raw += l.raw, h.text += l.text) : t.push(l);
        continue;
      }
      if (e) {
        const h = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(h);
          break;
        } else
          throw new Error(h);
      }
    }
    return t;
  }
}
class On {
  options;
  parser;
  // set by the parser
  constructor(e) {
    this.options = e || Et;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    const r = (t || "").match(Me.notSpaceStart)?.[0], i = e.replace(Me.endingNewline, "") + `
`;
    return r ? '<pre><code class="language-' + Qe(r) + '">' + (n ? i : Qe(i, !0)) + `</code></pre>
` : "<pre><code>" + (n ? i : Qe(i, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    const t = e.ordered, n = e.start;
    let r = "";
    for (let l = 0; l < e.items.length; l++) {
      const f = e.items[l];
      r += this.listitem(f);
    }
    const i = t ? "ol" : "ul", o = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + i + o + `>
` + r + "</" + i + `>
`;
  }
  listitem(e) {
    let t = "";
    if (e.task) {
      const n = this.checkbox({ checked: !!e.checked });
      e.loose ? e.tokens[0]?.type === "paragraph" ? (e.tokens[0].text = n + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = n + " " + Qe(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
        type: "text",
        raw: n + " ",
        text: n + " ",
        escaped: !0
      }) : t += n + " ";
    }
    return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", n = "";
    for (let i = 0; i < e.header.length; i++)
      n += this.tablecell(e.header[i]);
    t += this.tablerow({ text: n });
    let r = "";
    for (let i = 0; i < e.rows.length; i++) {
      const o = e.rows[i];
      n = "";
      for (let l = 0; l < o.length; l++)
        n += this.tablecell(o[l]);
      r += this.tablerow({ text: n });
    }
    return r && (r = `<tbody>${r}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + r + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    const t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
    return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${Qe(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    const r = this.parser.parseInline(n), i = xs(e);
    if (i === null)
      return r;
    e = i;
    let o = '<a href="' + e + '"';
    return t && (o += ' title="' + Qe(t) + '"'), o += ">" + r + "</a>", o;
  }
  image({ href: e, title: t, text: n }) {
    const r = xs(e);
    if (r === null)
      return Qe(n);
    e = r;
    let i = `<img src="${e}" alt="${n}"`;
    return t && (i += ` title="${Qe(t)}"`), i += ">", i;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : Qe(e.text);
  }
}
class os {
  // no need for block level renderers
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
}
class Ge {
  options;
  renderer;
  textRenderer;
  constructor(e) {
    this.options = e || Et, this.options.renderer = this.options.renderer || new On(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new os();
  }
  /**
   * Static Parse Method
   */
  static parse(e, t) {
    return new Ge(t).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, t) {
    return new Ge(t).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, t = !0) {
    let n = "";
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      if (this.options.extensions?.renderers?.[i.type]) {
        const l = i, f = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (f !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(l.type)) {
          n += f || "";
          continue;
        }
      }
      const o = i;
      switch (o.type) {
        case "space": {
          n += this.renderer.space(o);
          continue;
        }
        case "hr": {
          n += this.renderer.hr(o);
          continue;
        }
        case "heading": {
          n += this.renderer.heading(o);
          continue;
        }
        case "code": {
          n += this.renderer.code(o);
          continue;
        }
        case "table": {
          n += this.renderer.table(o);
          continue;
        }
        case "blockquote": {
          n += this.renderer.blockquote(o);
          continue;
        }
        case "list": {
          n += this.renderer.list(o);
          continue;
        }
        case "html": {
          n += this.renderer.html(o);
          continue;
        }
        case "paragraph": {
          n += this.renderer.paragraph(o);
          continue;
        }
        case "text": {
          let l = o, f = this.renderer.text(l);
          for (; r + 1 < e.length && e[r + 1].type === "text"; )
            l = e[++r], f += `
` + this.renderer.text(l);
          t ? n += this.renderer.paragraph({
            type: "paragraph",
            raw: f,
            text: f,
            tokens: [{ type: "text", raw: f, text: f, escaped: !0 }]
          }) : n += f;
          continue;
        }
        default: {
          const l = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent)
            return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return n;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, t = this.renderer) {
    let n = "";
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      if (this.options.extensions?.renderers?.[i.type]) {
        const l = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (l !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
          n += l || "";
          continue;
        }
      }
      const o = i;
      switch (o.type) {
        case "escape": {
          n += t.text(o);
          break;
        }
        case "html": {
          n += t.html(o);
          break;
        }
        case "link": {
          n += t.link(o);
          break;
        }
        case "image": {
          n += t.image(o);
          break;
        }
        case "strong": {
          n += t.strong(o);
          break;
        }
        case "em": {
          n += t.em(o);
          break;
        }
        case "codespan": {
          n += t.codespan(o);
          break;
        }
        case "br": {
          n += t.br(o);
          break;
        }
        case "del": {
          n += t.del(o);
          break;
        }
        case "text": {
          n += t.text(o);
          break;
        }
        default: {
          const l = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent)
            return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return n;
  }
}
class kn {
  options;
  block;
  constructor(e) {
    this.options = e || Et;
  }
  static passThroughHooks = /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ]);
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? je.lex : je.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? Ge.parse : Ge.parseInline;
  }
}
class pi {
  defaults = Jn();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = Ge;
  Renderer = On;
  TextRenderer = os;
  Lexer = je;
  Tokenizer = Cn;
  Hooks = kn;
  constructor(...e) {
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, t) {
    let n = [];
    for (const r of e)
      switch (n = n.concat(t.call(this, r)), r.type) {
        case "table": {
          const i = r;
          for (const o of i.header)
            n = n.concat(this.walkTokens(o.tokens, t));
          for (const o of i.rows)
            for (const l of o)
              n = n.concat(this.walkTokens(l.tokens, t));
          break;
        }
        case "list": {
          const i = r;
          n = n.concat(this.walkTokens(i.items, t));
          break;
        }
        default: {
          const i = r;
          this.defaults.extensions?.childTokens?.[i.type] ? this.defaults.extensions.childTokens[i.type].forEach((o) => {
            const l = i[o].flat(1 / 0);
            n = n.concat(this.walkTokens(l, t));
          }) : i.tokens && (n = n.concat(this.walkTokens(i.tokens, t)));
        }
      }
    return n;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      const r = { ...n };
      if (r.async = this.defaults.async || r.async || !1, n.extensions && (n.extensions.forEach((i) => {
        if (!i.name)
          throw new Error("extension name required");
        if ("renderer" in i) {
          const o = t.renderers[i.name];
          o ? t.renderers[i.name] = function(...l) {
            let f = i.renderer.apply(this, l);
            return f === !1 && (f = o.apply(this, l)), f;
          } : t.renderers[i.name] = i.renderer;
        }
        if ("tokenizer" in i) {
          if (!i.level || i.level !== "block" && i.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const o = t[i.level];
          o ? o.unshift(i.tokenizer) : t[i.level] = [i.tokenizer], i.start && (i.level === "block" ? t.startBlock ? t.startBlock.push(i.start) : t.startBlock = [i.start] : i.level === "inline" && (t.startInline ? t.startInline.push(i.start) : t.startInline = [i.start]));
        }
        "childTokens" in i && i.childTokens && (t.childTokens[i.name] = i.childTokens);
      }), r.extensions = t), n.renderer) {
        const i = this.defaults.renderer || new On(this.defaults);
        for (const o in n.renderer) {
          if (!(o in i))
            throw new Error(`renderer '${o}' does not exist`);
          if (["options", "parser"].includes(o))
            continue;
          const l = o, f = n.renderer[l], h = i[l];
          i[l] = (...g) => {
            let p = f.apply(i, g);
            return p === !1 && (p = h.apply(i, g)), p || "";
          };
        }
        r.renderer = i;
      }
      if (n.tokenizer) {
        const i = this.defaults.tokenizer || new Cn(this.defaults);
        for (const o in n.tokenizer) {
          if (!(o in i))
            throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o))
            continue;
          const l = o, f = n.tokenizer[l], h = i[l];
          i[l] = (...g) => {
            let p = f.apply(i, g);
            return p === !1 && (p = h.apply(i, g)), p;
          };
        }
        r.tokenizer = i;
      }
      if (n.hooks) {
        const i = this.defaults.hooks || new kn();
        for (const o in n.hooks) {
          if (!(o in i))
            throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o))
            continue;
          const l = o, f = n.hooks[l], h = i[l];
          kn.passThroughHooks.has(o) ? i[l] = (g) => {
            if (this.defaults.async)
              return Promise.resolve(f.call(i, g)).then((M) => h.call(i, M));
            const p = f.call(i, g);
            return h.call(i, p);
          } : i[l] = (...g) => {
            let p = f.apply(i, g);
            return p === !1 && (p = h.apply(i, g)), p;
          };
        }
        r.hooks = i;
      }
      if (n.walkTokens) {
        const i = this.defaults.walkTokens, o = n.walkTokens;
        r.walkTokens = function(l) {
          let f = [];
          return f.push(o.call(this, l)), i && (f = f.concat(i.call(this, l))), f;
        };
      }
      this.defaults = { ...this.defaults, ...r };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return je.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return Ge.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (n, r) => {
      const i = { ...r }, o = { ...this.defaults, ...i }, l = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === !0 && i.async === !1)
        return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n > "u" || n === null)
        return l(new Error("marked(): input parameter is undefined or null"));
      if (typeof n != "string")
        return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
      o.hooks && (o.hooks.options = o, o.hooks.block = e);
      const f = o.hooks ? o.hooks.provideLexer() : e ? je.lex : je.lexInline, h = o.hooks ? o.hooks.provideParser() : e ? Ge.parse : Ge.parseInline;
      if (o.async)
        return Promise.resolve(o.hooks ? o.hooks.preprocess(n) : n).then((g) => f(g, o)).then((g) => o.hooks ? o.hooks.processAllTokens(g) : g).then((g) => o.walkTokens ? Promise.all(this.walkTokens(g, o.walkTokens)).then(() => g) : g).then((g) => h(g, o)).then((g) => o.hooks ? o.hooks.postprocess(g) : g).catch(l);
      try {
        o.hooks && (n = o.hooks.preprocess(n));
        let g = f(n, o);
        o.hooks && (g = o.hooks.processAllTokens(g)), o.walkTokens && this.walkTokens(g, o.walkTokens);
        let p = h(g, o);
        return o.hooks && (p = o.hooks.postprocess(p)), p;
      } catch (g) {
        return l(g);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const r = "<p>An error occurred:</p><pre>" + Qe(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(r) : r;
      }
      if (t)
        return Promise.reject(n);
      throw n;
    };
  }
}
const kt = new pi();
function H(s, e) {
  return kt.parse(s, e);
}
H.options = H.setOptions = function(s) {
  return kt.setOptions(s), H.defaults = kt.defaults, Gs(H.defaults), H;
};
H.getDefaults = Jn;
H.defaults = Et;
H.use = function(...s) {
  return kt.use(...s), H.defaults = kt.defaults, Gs(H.defaults), H;
};
H.walkTokens = function(s, e) {
  return kt.walkTokens(s, e);
};
H.parseInline = kt.parseInline;
H.Parser = Ge;
H.parser = Ge.parse;
H.Renderer = On;
H.TextRenderer = os;
H.Lexer = je;
H.lexer = je.lex;
H.Tokenizer = Cn;
H.Hooks = kn;
H.parse = H;
H.options;
H.setOptions;
H.use;
H.walkTokens;
H.parseInline;
Ge.parse;
je.lex;
/*! @license DOMPurify 3.2.4 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.4/LICENSE */
const {
  entries: Js,
  setPrototypeOf: ys,
  isFrozen: gi,
  getPrototypeOf: di,
  getOwnPropertyDescriptor: bi
} = Object;
let {
  freeze: Ne,
  seal: qe,
  create: er
} = Object, {
  apply: Xn,
  construct: Vn
} = typeof Reflect < "u" && Reflect;
Ne || (Ne = function(e) {
  return e;
});
qe || (qe = function(e) {
  return e;
});
Xn || (Xn = function(e, t, n) {
  return e.apply(t, n);
});
Vn || (Vn = function(e, t) {
  return new e(...t);
});
const _n = Le(Array.prototype.forEach), mi = Le(Array.prototype.lastIndexOf), Ts = Le(Array.prototype.pop), Wt = Le(Array.prototype.push), _i = Le(Array.prototype.splice), En = Le(String.prototype.toLowerCase), Un = Le(String.prototype.toString), As = Le(String.prototype.match), Kt = Le(String.prototype.replace), wi = Le(String.prototype.indexOf), xi = Le(String.prototype.trim), Ze = Le(Object.prototype.hasOwnProperty), Oe = Le(RegExp.prototype.test), Yt = ki(TypeError);
function Le(s) {
  return function(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
      n[r - 1] = arguments[r];
    return Xn(s, e, n);
  };
}
function ki(s) {
  return function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return Vn(s, t);
  };
}
function P(s, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : En;
  ys && ys(s, null);
  let n = e.length;
  for (; n--; ) {
    let r = e[n];
    if (typeof r == "string") {
      const i = t(r);
      i !== r && (gi(e) || (e[n] = i), r = i);
    }
    s[r] = !0;
  }
  return s;
}
function Ei(s) {
  for (let e = 0; e < s.length; e++)
    Ze(s, e) || (s[e] = null);
  return s;
}
function xt(s) {
  const e = er(null);
  for (const [t, n] of Js(s))
    Ze(s, t) && (Array.isArray(n) ? e[t] = Ei(n) : n && typeof n == "object" && n.constructor === Object ? e[t] = xt(n) : e[t] = n);
  return e;
}
function Zt(s, e) {
  for (; s !== null; ) {
    const n = bi(s, e);
    if (n) {
      if (n.get)
        return Le(n.get);
      if (typeof n.value == "function")
        return Le(n.value);
    }
    s = di(s);
  }
  function t() {
    return null;
  }
  return t;
}
const Ss = Ne(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Hn = Ne(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Fn = Ne(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), yi = Ne(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), jn = Ne(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Ti = Ne(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Rs = Ne(["#text"]), vs = Ne(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Gn = Ne(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Cs = Ne(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), wn = Ne(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Ai = qe(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Si = qe(/<%[\w\W]*|[\w\W]*%>/gm), Ri = qe(/\$\{[\w\W]*/gm), vi = qe(/^data-[\-\w.\u00B7-\uFFFF]+$/), Ci = qe(/^aria-[\-\w]+$/), tr = qe(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Oi = qe(/^(?:\w+script|data):/i), Mi = qe(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), nr = qe(/^html$/i), Ni = qe(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Os = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Ci,
  ATTR_WHITESPACE: Mi,
  CUSTOM_ELEMENT: Ni,
  DATA_ATTR: vi,
  DOCTYPE_NAME: nr,
  ERB_EXPR: Si,
  IS_ALLOWED_URI: tr,
  IS_SCRIPT_OR_DATA: Oi,
  MUSTACHE_EXPR: Ai,
  TMPLIT_EXPR: Ri
});
const Xt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Li = function() {
  return typeof window > "u" ? null : window;
}, Ii = function(e, t) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let n = null;
  const r = "data-tt-policy-suffix";
  t && t.hasAttribute(r) && (n = t.getAttribute(r));
  const i = "dompurify" + (n ? "#" + n : "");
  try {
    return e.createPolicy(i, {
      createHTML(o) {
        return o;
      },
      createScriptURL(o) {
        return o;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + i + " could not be created."), null;
  }
}, Ms = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function sr() {
  let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Li();
  const e = (y) => sr(y);
  if (e.version = "3.2.4", e.removed = [], !s || !s.document || s.document.nodeType !== Xt.document || !s.Element)
    return e.isSupported = !1, e;
  let {
    document: t
  } = s;
  const n = t, r = n.currentScript, {
    DocumentFragment: i,
    HTMLTemplateElement: o,
    Node: l,
    Element: f,
    NodeFilter: h,
    NamedNodeMap: g = s.NamedNodeMap || s.MozNamedAttrMap,
    HTMLFormElement: p,
    DOMParser: M,
    trustedTypes: R
  } = s, L = f.prototype, x = Zt(L, "cloneNode"), Z = Zt(L, "remove"), te = Zt(L, "nextSibling"), ne = Zt(L, "childNodes"), j = Zt(L, "parentNode");
  if (typeof o == "function") {
    const y = t.createElement("template");
    y.content && y.content.ownerDocument && (t = y.content.ownerDocument);
  }
  let I, X = "";
  const {
    implementation: we,
    createNodeIterator: xe,
    createDocumentFragment: $,
    getElementsByTagName: ke
  } = t, {
    importNode: he
  } = n;
  let le = Ms();
  e.isSupported = typeof Js == "function" && typeof j == "function" && we && we.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: ht,
    ERB_EXPR: st,
    TMPLIT_EXPR: Ee,
    DATA_ATTR: rt,
    ARIA_ATTR: Dt,
    IS_SCRIPT_OR_DATA: yt,
    ATTR_WHITESPACE: Je,
    CUSTOM_ELEMENT: Tt
  } = Os;
  let {
    IS_ALLOWED_URI: pt
  } = Os, A = null;
  const V = P({}, [...Ss, ...Hn, ...Fn, ...jn, ...Rs]);
  let F = null;
  const ye = P({}, [...vs, ...Gn, ...Cs, ...wn]);
  let G = Object.seal(er(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), Ue = null, z = null, Q = !0, D = !0, J = !1, We = !0, Te = !1, Ce = !0, q = !1, ae = !1, Ke = !1, it = !1, At = !1, St = !1, Pt = !0, on = !1;
  const In = "user-content-";
  let Rt = !0, Ie = !1, et = {}, $e = null;
  const gt = P({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let Bt = null;
  const ln = P({}, ["audio", "video", "img", "source", "image", "track"]);
  let zt = null;
  const an = P({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), vt = "http://www.w3.org/1998/Math/MathML", Ct = "http://www.w3.org/2000/svg", He = "http://www.w3.org/1999/xhtml";
  let ot = He, Ut = !1, Ht = null;
  const Ft = P({}, [vt, Ct, He], Un);
  let dt = P({}, ["mi", "mo", "mn", "ms", "mtext"]), bt = P({}, ["annotation-xml"]);
  const $n = P({}, ["title", "style", "font", "a", "script"]);
  let lt = null;
  const at = ["application/xhtml+xml", "text/html"], a = "text/html";
  let u = null, m = null;
  const C = t.createElement("form"), oe = function(c) {
    return c instanceof RegExp || c instanceof Function;
  }, se = function() {
    let c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(m && m === c)) {
      if ((!c || typeof c != "object") && (c = {}), c = xt(c), lt = // eslint-disable-next-line unicorn/prefer-includes
      at.indexOf(c.PARSER_MEDIA_TYPE) === -1 ? a : c.PARSER_MEDIA_TYPE, u = lt === "application/xhtml+xml" ? Un : En, A = Ze(c, "ALLOWED_TAGS") ? P({}, c.ALLOWED_TAGS, u) : V, F = Ze(c, "ALLOWED_ATTR") ? P({}, c.ALLOWED_ATTR, u) : ye, Ht = Ze(c, "ALLOWED_NAMESPACES") ? P({}, c.ALLOWED_NAMESPACES, Un) : Ft, zt = Ze(c, "ADD_URI_SAFE_ATTR") ? P(xt(an), c.ADD_URI_SAFE_ATTR, u) : an, Bt = Ze(c, "ADD_DATA_URI_TAGS") ? P(xt(ln), c.ADD_DATA_URI_TAGS, u) : ln, $e = Ze(c, "FORBID_CONTENTS") ? P({}, c.FORBID_CONTENTS, u) : gt, Ue = Ze(c, "FORBID_TAGS") ? P({}, c.FORBID_TAGS, u) : {}, z = Ze(c, "FORBID_ATTR") ? P({}, c.FORBID_ATTR, u) : {}, et = Ze(c, "USE_PROFILES") ? c.USE_PROFILES : !1, Q = c.ALLOW_ARIA_ATTR !== !1, D = c.ALLOW_DATA_ATTR !== !1, J = c.ALLOW_UNKNOWN_PROTOCOLS || !1, We = c.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Te = c.SAFE_FOR_TEMPLATES || !1, Ce = c.SAFE_FOR_XML !== !1, q = c.WHOLE_DOCUMENT || !1, it = c.RETURN_DOM || !1, At = c.RETURN_DOM_FRAGMENT || !1, St = c.RETURN_TRUSTED_TYPE || !1, Ke = c.FORCE_BODY || !1, Pt = c.SANITIZE_DOM !== !1, on = c.SANITIZE_NAMED_PROPS || !1, Rt = c.KEEP_CONTENT !== !1, Ie = c.IN_PLACE || !1, pt = c.ALLOWED_URI_REGEXP || tr, ot = c.NAMESPACE || He, dt = c.MATHML_TEXT_INTEGRATION_POINTS || dt, bt = c.HTML_INTEGRATION_POINTS || bt, G = c.CUSTOM_ELEMENT_HANDLING || {}, c.CUSTOM_ELEMENT_HANDLING && oe(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (G.tagNameCheck = c.CUSTOM_ELEMENT_HANDLING.tagNameCheck), c.CUSTOM_ELEMENT_HANDLING && oe(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (G.attributeNameCheck = c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), c.CUSTOM_ELEMENT_HANDLING && typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (G.allowCustomizedBuiltInElements = c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Te && (D = !1), At && (it = !0), et && (A = P({}, Rs), F = [], et.html === !0 && (P(A, Ss), P(F, vs)), et.svg === !0 && (P(A, Hn), P(F, Gn), P(F, wn)), et.svgFilters === !0 && (P(A, Fn), P(F, Gn), P(F, wn)), et.mathMl === !0 && (P(A, jn), P(F, Cs), P(F, wn))), c.ADD_TAGS && (A === V && (A = xt(A)), P(A, c.ADD_TAGS, u)), c.ADD_ATTR && (F === ye && (F = xt(F)), P(F, c.ADD_ATTR, u)), c.ADD_URI_SAFE_ATTR && P(zt, c.ADD_URI_SAFE_ATTR, u), c.FORBID_CONTENTS && ($e === gt && ($e = xt($e)), P($e, c.FORBID_CONTENTS, u)), Rt && (A["#text"] = !0), q && P(A, ["html", "head", "body"]), A.table && (P(A, ["tbody"]), delete Ue.tbody), c.TRUSTED_TYPES_POLICY) {
        if (typeof c.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Yt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof c.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Yt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        I = c.TRUSTED_TYPES_POLICY, X = I.createHTML("");
      } else
        I === void 0 && (I = Ii(R, r)), I !== null && typeof X == "string" && (X = I.createHTML(""));
      Ne && Ne(c), m = c;
    }
  }, k = P({}, [...Hn, ...Fn, ...yi]), w = P({}, [...jn, ...Ti]), v = function(c) {
    let d = j(c);
    (!d || !d.tagName) && (d = {
      namespaceURI: ot,
      tagName: "template"
    });
    const E = En(c.tagName), U = En(d.tagName);
    return Ht[c.namespaceURI] ? c.namespaceURI === Ct ? d.namespaceURI === He ? E === "svg" : d.namespaceURI === vt ? E === "svg" && (U === "annotation-xml" || dt[U]) : !!k[E] : c.namespaceURI === vt ? d.namespaceURI === He ? E === "math" : d.namespaceURI === Ct ? E === "math" && bt[U] : !!w[E] : c.namespaceURI === He ? d.namespaceURI === Ct && !bt[U] || d.namespaceURI === vt && !dt[U] ? !1 : !w[E] && ($n[E] || !k[E]) : !!(lt === "application/xhtml+xml" && Ht[c.namespaceURI]) : !1;
  }, W = function(c) {
    Wt(e.removed, {
      element: c
    });
    try {
      j(c).removeChild(c);
    } catch {
      Z(c);
    }
  }, re = function(c, d) {
    try {
      Wt(e.removed, {
        attribute: d.getAttributeNode(c),
        from: d
      });
    } catch {
      Wt(e.removed, {
        attribute: null,
        from: d
      });
    }
    if (d.removeAttribute(c), c === "is")
      if (it || At)
        try {
          W(d);
        } catch {
        }
      else
        try {
          d.setAttribute(c, "");
        } catch {
        }
  }, ct = function(c) {
    let d = null, E = null;
    if (Ke)
      c = "<remove></remove>" + c;
    else {
      const ce = As(c, /^[\r\n\t ]+/);
      E = ce && ce[0];
    }
    lt === "application/xhtml+xml" && ot === He && (c = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + c + "</body></html>");
    const U = I ? I.createHTML(c) : c;
    if (ot === He)
      try {
        d = new M().parseFromString(U, lt);
      } catch {
      }
    if (!d || !d.documentElement) {
      d = we.createDocument(ot, "template", null);
      try {
        d.documentElement.innerHTML = Ut ? X : U;
      } catch {
      }
    }
    const pe = d.body || d.documentElement;
    return c && E && pe.insertBefore(t.createTextNode(E), pe.childNodes[0] || null), ot === He ? ke.call(d, q ? "html" : "body")[0] : q ? d.documentElement : pe;
  }, Ot = function(c) {
    return xe.call(
      c.ownerDocument || c,
      c,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT | h.SHOW_PROCESSING_INSTRUCTION | h.SHOW_CDATA_SECTION,
      null
    );
  }, mt = function(c) {
    return c instanceof p && (typeof c.nodeName != "string" || typeof c.textContent != "string" || typeof c.removeChild != "function" || !(c.attributes instanceof g) || typeof c.removeAttribute != "function" || typeof c.setAttribute != "function" || typeof c.namespaceURI != "string" || typeof c.insertBefore != "function" || typeof c.hasChildNodes != "function");
  }, cn = function(c) {
    return typeof l == "function" && c instanceof l;
  };
  function De(y, c, d) {
    _n(y, (E) => {
      E.call(e, c, d, m);
    });
  }
  const un = function(c) {
    let d = null;
    if (De(le.beforeSanitizeElements, c, null), mt(c))
      return W(c), !0;
    const E = u(c.nodeName);
    if (De(le.uponSanitizeElement, c, {
      tagName: E,
      allowedTags: A
    }), c.hasChildNodes() && !cn(c.firstElementChild) && Oe(/<[/\w]/g, c.innerHTML) && Oe(/<[/\w]/g, c.textContent) || c.nodeType === Xt.progressingInstruction || Ce && c.nodeType === Xt.comment && Oe(/<[/\w]/g, c.data))
      return W(c), !0;
    if (!A[E] || Ue[E]) {
      if (!Ue[E] && hn(E) && (G.tagNameCheck instanceof RegExp && Oe(G.tagNameCheck, E) || G.tagNameCheck instanceof Function && G.tagNameCheck(E)))
        return !1;
      if (Rt && !$e[E]) {
        const U = j(c) || c.parentNode, pe = ne(c) || c.childNodes;
        if (pe && U) {
          const ce = pe.length;
          for (let Ae = ce - 1; Ae >= 0; --Ae) {
            const Fe = x(pe[Ae], !0);
            Fe.__removalCount = (c.__removalCount || 0) + 1, U.insertBefore(Fe, te(c));
          }
        }
      }
      return W(c), !0;
    }
    return c instanceof f && !v(c) || (E === "noscript" || E === "noembed" || E === "noframes") && Oe(/<\/no(script|embed|frames)/i, c.innerHTML) ? (W(c), !0) : (Te && c.nodeType === Xt.text && (d = c.textContent, _n([ht, st, Ee], (U) => {
      d = Kt(d, U, " ");
    }), c.textContent !== d && (Wt(e.removed, {
      element: c.cloneNode()
    }), c.textContent = d)), De(le.afterSanitizeElements, c, null), !1);
  }, fn = function(c, d, E) {
    if (Pt && (d === "id" || d === "name") && (E in t || E in C))
      return !1;
    if (!(D && !z[d] && Oe(rt, d))) {
      if (!(Q && Oe(Dt, d))) {
        if (!F[d] || z[d]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(hn(c) && (G.tagNameCheck instanceof RegExp && Oe(G.tagNameCheck, c) || G.tagNameCheck instanceof Function && G.tagNameCheck(c)) && (G.attributeNameCheck instanceof RegExp && Oe(G.attributeNameCheck, d) || G.attributeNameCheck instanceof Function && G.attributeNameCheck(d)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            d === "is" && G.allowCustomizedBuiltInElements && (G.tagNameCheck instanceof RegExp && Oe(G.tagNameCheck, E) || G.tagNameCheck instanceof Function && G.tagNameCheck(E)))
          ) return !1;
        } else if (!zt[d]) {
          if (!Oe(pt, Kt(E, Je, ""))) {
            if (!((d === "src" || d === "xlink:href" || d === "href") && c !== "script" && wi(E, "data:") === 0 && Bt[c])) {
              if (!(J && !Oe(yt, Kt(E, Je, "")))) {
                if (E)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, hn = function(c) {
    return c !== "annotation-xml" && As(c, Tt);
  }, jt = function(c) {
    De(le.beforeSanitizeAttributes, c, null);
    const {
      attributes: d
    } = c;
    if (!d || mt(c))
      return;
    const E = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: F,
      forceKeepAttr: void 0
    };
    let U = d.length;
    for (; U--; ) {
      const pe = d[U], {
        name: ce,
        namespaceURI: Ae,
        value: Fe
      } = pe, _t = u(ce);
      let ue = ce === "value" ? Fe : xi(Fe);
      if (E.attrName = _t, E.attrValue = ue, E.keepAttr = !0, E.forceKeepAttr = void 0, De(le.uponSanitizeAttribute, c, E), ue = E.attrValue, on && (_t === "id" || _t === "name") && (re(ce, c), ue = In + ue), Ce && Oe(/((--!?|])>)|<\/(style|title)/i, ue)) {
        re(ce, c);
        continue;
      }
      if (E.forceKeepAttr || (re(ce, c), !E.keepAttr))
        continue;
      if (!We && Oe(/\/>/i, ue)) {
        re(ce, c);
        continue;
      }
      Te && _n([ht, st, Ee], (b) => {
        ue = Kt(ue, b, " ");
      });
      const pn = u(c.nodeName);
      if (fn(pn, _t, ue)) {
        if (I && typeof R == "object" && typeof R.getAttributeType == "function" && !Ae)
          switch (R.getAttributeType(pn, _t)) {
            case "TrustedHTML": {
              ue = I.createHTML(ue);
              break;
            }
            case "TrustedScriptURL": {
              ue = I.createScriptURL(ue);
              break;
            }
          }
        try {
          Ae ? c.setAttributeNS(Ae, ce, ue) : c.setAttribute(ce, ue), mt(c) ? W(c) : Ts(e.removed);
        } catch {
        }
      }
    }
    De(le.afterSanitizeAttributes, c, null);
  }, Mt = function y(c) {
    let d = null;
    const E = Ot(c);
    for (De(le.beforeSanitizeShadowDOM, c, null); d = E.nextNode(); )
      De(le.uponSanitizeShadowNode, d, null), un(d), jt(d), d.content instanceof i && y(d.content);
    De(le.afterSanitizeShadowDOM, c, null);
  };
  return e.sanitize = function(y) {
    let c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, d = null, E = null, U = null, pe = null;
    if (Ut = !y, Ut && (y = "<!-->"), typeof y != "string" && !cn(y))
      if (typeof y.toString == "function") {
        if (y = y.toString(), typeof y != "string")
          throw Yt("dirty is not a string, aborting");
      } else
        throw Yt("toString is not a function");
    if (!e.isSupported)
      return y;
    if (ae || se(c), e.removed = [], typeof y == "string" && (Ie = !1), Ie) {
      if (y.nodeName) {
        const Fe = u(y.nodeName);
        if (!A[Fe] || Ue[Fe])
          throw Yt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (y instanceof l)
      d = ct("<!---->"), E = d.ownerDocument.importNode(y, !0), E.nodeType === Xt.element && E.nodeName === "BODY" || E.nodeName === "HTML" ? d = E : d.appendChild(E);
    else {
      if (!it && !Te && !q && // eslint-disable-next-line unicorn/prefer-includes
      y.indexOf("<") === -1)
        return I && St ? I.createHTML(y) : y;
      if (d = ct(y), !d)
        return it ? null : St ? X : "";
    }
    d && Ke && W(d.firstChild);
    const ce = Ot(Ie ? y : d);
    for (; U = ce.nextNode(); )
      un(U), jt(U), U.content instanceof i && Mt(U.content);
    if (Ie)
      return y;
    if (it) {
      if (At)
        for (pe = $.call(d.ownerDocument); d.firstChild; )
          pe.appendChild(d.firstChild);
      else
        pe = d;
      return (F.shadowroot || F.shadowrootmode) && (pe = he.call(n, pe, !0)), pe;
    }
    let Ae = q ? d.outerHTML : d.innerHTML;
    return q && A["!doctype"] && d.ownerDocument && d.ownerDocument.doctype && d.ownerDocument.doctype.name && Oe(nr, d.ownerDocument.doctype.name) && (Ae = "<!DOCTYPE " + d.ownerDocument.doctype.name + `>
` + Ae), Te && _n([ht, st, Ee], (Fe) => {
      Ae = Kt(Ae, Fe, " ");
    }), I && St ? I.createHTML(Ae) : Ae;
  }, e.setConfig = function() {
    let y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    se(y), ae = !0;
  }, e.clearConfig = function() {
    m = null, ae = !1;
  }, e.isValidAttribute = function(y, c, d) {
    m || se({});
    const E = u(y), U = u(c);
    return fn(E, U, d);
  }, e.addHook = function(y, c) {
    typeof c == "function" && Wt(le[y], c);
  }, e.removeHook = function(y, c) {
    if (c !== void 0) {
      const d = mi(le[y], c);
      return d === -1 ? void 0 : _i(le[y], d, 1)[0];
    }
    return Ts(le[y]);
  }, e.removeHooks = function(y) {
    le[y] = [];
  }, e.removeAllHooks = function() {
    le = Ms();
  }, e;
}
var qn = sr();
function $i(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Wn, Ns;
function Di() {
  if (Ns) return Wn;
  Ns = 1;
  function s(a) {
    return a instanceof Map ? a.clear = a.delete = a.set = function() {
      throw new Error("map is read-only");
    } : a instanceof Set && (a.add = a.clear = a.delete = function() {
      throw new Error("set is read-only");
    }), Object.freeze(a), Object.getOwnPropertyNames(a).forEach((u) => {
      const m = a[u], C = typeof m;
      (C === "object" || C === "function") && !Object.isFrozen(m) && s(m);
    }), a;
  }
  class e {
    /**
     * @param {CompiledMode} mode
     */
    constructor(u) {
      u.data === void 0 && (u.data = {}), this.data = u.data, this.isMatchIgnored = !1;
    }
    ignoreMatch() {
      this.isMatchIgnored = !0;
    }
  }
  function t(a) {
    return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function n(a, ...u) {
    const m = /* @__PURE__ */ Object.create(null);
    for (const C in a)
      m[C] = a[C];
    return u.forEach(function(C) {
      for (const oe in C)
        m[oe] = C[oe];
    }), /** @type {T} */
    m;
  }
  const r = "</span>", i = (a) => !!a.scope, o = (a, { prefix: u }) => {
    if (a.startsWith("language:"))
      return a.replace("language:", "language-");
    if (a.includes(".")) {
      const m = a.split(".");
      return [
        `${u}${m.shift()}`,
        ...m.map((C, oe) => `${C}${"_".repeat(oe + 1)}`)
      ].join(" ");
    }
    return `${u}${a}`;
  };
  class l {
    /**
     * Creates a new HTMLRenderer
     *
     * @param {Tree} parseTree - the parse tree (must support `walk` API)
     * @param {{classPrefix: string}} options
     */
    constructor(u, m) {
      this.buffer = "", this.classPrefix = m.classPrefix, u.walk(this);
    }
    /**
     * Adds texts to the output stream
     *
     * @param {string} text */
    addText(u) {
      this.buffer += t(u);
    }
    /**
     * Adds a node open to the output stream (if needed)
     *
     * @param {Node} node */
    openNode(u) {
      if (!i(u)) return;
      const m = o(
        u.scope,
        { prefix: this.classPrefix }
      );
      this.span(m);
    }
    /**
     * Adds a node close to the output stream (if needed)
     *
     * @param {Node} node */
    closeNode(u) {
      i(u) && (this.buffer += r);
    }
    /**
     * returns the accumulated buffer
    */
    value() {
      return this.buffer;
    }
    // helpers
    /**
     * Builds a span element
     *
     * @param {string} className */
    span(u) {
      this.buffer += `<span class="${u}">`;
    }
  }
  const f = (a = {}) => {
    const u = { children: [] };
    return Object.assign(u, a), u;
  };
  class h {
    constructor() {
      this.rootNode = f(), this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    /** @param {Node} node */
    add(u) {
      this.top.children.push(u);
    }
    /** @param {string} scope */
    openNode(u) {
      const m = f({ scope: u });
      this.add(m), this.stack.push(m);
    }
    closeNode() {
      if (this.stack.length > 1)
        return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode(); ) ;
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    /**
     * @typedef { import("./html_renderer").Renderer } Renderer
     * @param {Renderer} builder
     */
    walk(u) {
      return this.constructor._walk(u, this.rootNode);
    }
    /**
     * @param {Renderer} builder
     * @param {Node} node
     */
    static _walk(u, m) {
      return typeof m == "string" ? u.addText(m) : m.children && (u.openNode(m), m.children.forEach((C) => this._walk(u, C)), u.closeNode(m)), u;
    }
    /**
     * @param {Node} node
     */
    static _collapse(u) {
      typeof u != "string" && u.children && (u.children.every((m) => typeof m == "string") ? u.children = [u.children.join("")] : u.children.forEach((m) => {
        h._collapse(m);
      }));
    }
  }
  class g extends h {
    /**
     * @param {*} options
     */
    constructor(u) {
      super(), this.options = u;
    }
    /**
     * @param {string} text
     */
    addText(u) {
      u !== "" && this.add(u);
    }
    /** @param {string} scope */
    startScope(u) {
      this.openNode(u);
    }
    endScope() {
      this.closeNode();
    }
    /**
     * @param {Emitter & {root: DataNode}} emitter
     * @param {string} name
     */
    __addSublanguage(u, m) {
      const C = u.root;
      m && (C.scope = `language:${m}`), this.add(C);
    }
    toHTML() {
      return new l(this, this.options).value();
    }
    finalize() {
      return this.closeAllNodes(), !0;
    }
  }
  function p(a) {
    return a ? typeof a == "string" ? a : a.source : null;
  }
  function M(a) {
    return x("(?=", a, ")");
  }
  function R(a) {
    return x("(?:", a, ")*");
  }
  function L(a) {
    return x("(?:", a, ")?");
  }
  function x(...a) {
    return a.map((m) => p(m)).join("");
  }
  function Z(a) {
    const u = a[a.length - 1];
    return typeof u == "object" && u.constructor === Object ? (a.splice(a.length - 1, 1), u) : {};
  }
  function te(...a) {
    return "(" + (Z(a).capture ? "" : "?:") + a.map((C) => p(C)).join("|") + ")";
  }
  function ne(a) {
    return new RegExp(a.toString() + "|").exec("").length - 1;
  }
  function j(a, u) {
    const m = a && a.exec(u);
    return m && m.index === 0;
  }
  const I = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  function X(a, { joinWith: u }) {
    let m = 0;
    return a.map((C) => {
      m += 1;
      const oe = m;
      let se = p(C), k = "";
      for (; se.length > 0; ) {
        const w = I.exec(se);
        if (!w) {
          k += se;
          break;
        }
        k += se.substring(0, w.index), se = se.substring(w.index + w[0].length), w[0][0] === "\\" && w[1] ? k += "\\" + String(Number(w[1]) + oe) : (k += w[0], w[0] === "(" && m++);
      }
      return k;
    }).map((C) => `(${C})`).join(u);
  }
  const we = /\b\B/, xe = "[a-zA-Z]\\w*", $ = "[a-zA-Z_]\\w*", ke = "\\b\\d+(\\.\\d+)?", he = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", le = "\\b(0b[01]+)", ht = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", st = (a = {}) => {
    const u = /^#![ ]*\//;
    return a.binary && (a.begin = x(
      u,
      /.*\b/,
      a.binary,
      /\b.*/
    )), n({
      scope: "meta",
      begin: u,
      end: /$/,
      relevance: 0,
      /** @type {ModeCallback} */
      "on:begin": (m, C) => {
        m.index !== 0 && C.ignoreMatch();
      }
    }, a);
  }, Ee = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, rt = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [Ee]
  }, Dt = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [Ee]
  }, yt = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, Je = function(a, u, m = {}) {
    const C = n(
      {
        scope: "comment",
        begin: a,
        end: u,
        contains: []
      },
      m
    );
    C.contains.push({
      scope: "doctag",
      // hack to avoid the space from being included. the space is necessary to
      // match here to prevent the plain text rule below from gobbling up doctags
      begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
      end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
      excludeBegin: !0,
      relevance: 0
    });
    const oe = te(
      // list of common 1 and 2 letter words in English
      "I",
      "a",
      "is",
      "so",
      "us",
      "to",
      "at",
      "if",
      "in",
      "it",
      "on",
      // note: this is not an exhaustive list of contractions, just popular ones
      /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
      // contractions - can't we'd they're let's, etc
      /[A-Za-z]+[-][a-z]+/,
      // `no-way`, etc.
      /[A-Za-z][a-z]{2,}/
      // allow capitalized words at beginning of sentences
    );
    return C.contains.push(
      {
        // TODO: how to include ", (, ) without breaking grammars that use these for
        // comment delimiters?
        // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
        // ---
        // this tries to find sequences of 3 english words in a row (without any
        // "programming" type syntax) this gives us a strong signal that we've
        // TRULY found a comment - vs perhaps scanning with the wrong language.
        // It's possible to find something that LOOKS like the start of the
        // comment - but then if there is no readable text - good chance it is a
        // false match and not a comment.
        //
        // for a visual example please see:
        // https://github.com/highlightjs/highlight.js/issues/2827
        begin: x(
          /[ ]+/,
          // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
          "(",
          oe,
          /[.]?[:]?([.][ ]|[ ])/,
          "){3}"
        )
        // look for 3 words in a row
      }
    ), C;
  }, Tt = Je("//", "$"), pt = Je("/\\*", "\\*/"), A = Je("#", "$"), V = {
    scope: "number",
    begin: ke,
    relevance: 0
  }, F = {
    scope: "number",
    begin: he,
    relevance: 0
  }, ye = {
    scope: "number",
    begin: le,
    relevance: 0
  }, G = {
    scope: "regexp",
    begin: /\/(?=[^/\n]*\/)/,
    end: /\/[gimuy]*/,
    contains: [
      Ee,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [Ee]
      }
    ]
  }, Ue = {
    scope: "title",
    begin: xe,
    relevance: 0
  }, z = {
    scope: "title",
    begin: $,
    relevance: 0
  }, Q = {
    // excludes method names from keyword processing
    begin: "\\.\\s*" + $,
    relevance: 0
  };
  var J = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    APOS_STRING_MODE: rt,
    BACKSLASH_ESCAPE: Ee,
    BINARY_NUMBER_MODE: ye,
    BINARY_NUMBER_RE: le,
    COMMENT: Je,
    C_BLOCK_COMMENT_MODE: pt,
    C_LINE_COMMENT_MODE: Tt,
    C_NUMBER_MODE: F,
    C_NUMBER_RE: he,
    END_SAME_AS_BEGIN: function(a) {
      return Object.assign(
        a,
        {
          /** @type {ModeCallback} */
          "on:begin": (u, m) => {
            m.data._beginMatch = u[1];
          },
          /** @type {ModeCallback} */
          "on:end": (u, m) => {
            m.data._beginMatch !== u[1] && m.ignoreMatch();
          }
        }
      );
    },
    HASH_COMMENT_MODE: A,
    IDENT_RE: xe,
    MATCH_NOTHING_RE: we,
    METHOD_GUARD: Q,
    NUMBER_MODE: V,
    NUMBER_RE: ke,
    PHRASAL_WORDS_MODE: yt,
    QUOTE_STRING_MODE: Dt,
    REGEXP_MODE: G,
    RE_STARTERS_RE: ht,
    SHEBANG: st,
    TITLE_MODE: Ue,
    UNDERSCORE_IDENT_RE: $,
    UNDERSCORE_TITLE_MODE: z
  });
  function We(a, u) {
    a.input[a.index - 1] === "." && u.ignoreMatch();
  }
  function Te(a, u) {
    a.className !== void 0 && (a.scope = a.className, delete a.className);
  }
  function Ce(a, u) {
    u && a.beginKeywords && (a.begin = "\\b(" + a.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", a.__beforeBegin = We, a.keywords = a.keywords || a.beginKeywords, delete a.beginKeywords, a.relevance === void 0 && (a.relevance = 0));
  }
  function q(a, u) {
    Array.isArray(a.illegal) && (a.illegal = te(...a.illegal));
  }
  function ae(a, u) {
    if (a.match) {
      if (a.begin || a.end) throw new Error("begin & end are not supported with match");
      a.begin = a.match, delete a.match;
    }
  }
  function Ke(a, u) {
    a.relevance === void 0 && (a.relevance = 1);
  }
  const it = (a, u) => {
    if (!a.beforeMatch) return;
    if (a.starts) throw new Error("beforeMatch cannot be used with starts");
    const m = Object.assign({}, a);
    Object.keys(a).forEach((C) => {
      delete a[C];
    }), a.keywords = m.keywords, a.begin = x(m.beforeMatch, M(m.begin)), a.starts = {
      relevance: 0,
      contains: [
        Object.assign(m, { endsParent: !0 })
      ]
    }, a.relevance = 0, delete m.beforeMatch;
  }, At = [
    "of",
    "and",
    "for",
    "in",
    "not",
    "or",
    "if",
    "then",
    "parent",
    // common variable name
    "list",
    // common variable name
    "value"
    // common variable name
  ], St = "keyword";
  function Pt(a, u, m = St) {
    const C = /* @__PURE__ */ Object.create(null);
    return typeof a == "string" ? oe(m, a.split(" ")) : Array.isArray(a) ? oe(m, a) : Object.keys(a).forEach(function(se) {
      Object.assign(
        C,
        Pt(a[se], u, se)
      );
    }), C;
    function oe(se, k) {
      u && (k = k.map((w) => w.toLowerCase())), k.forEach(function(w) {
        const v = w.split("|");
        C[v[0]] = [se, on(v[0], v[1])];
      });
    }
  }
  function on(a, u) {
    return u ? Number(u) : In(a) ? 0 : 1;
  }
  function In(a) {
    return At.includes(a.toLowerCase());
  }
  const Rt = {}, Ie = (a) => {
    console.error(a);
  }, et = (a, ...u) => {
    console.log(`WARN: ${a}`, ...u);
  }, $e = (a, u) => {
    Rt[`${a}/${u}`] || (console.log(`Deprecated as of ${a}. ${u}`), Rt[`${a}/${u}`] = !0);
  }, gt = new Error();
  function Bt(a, u, { key: m }) {
    let C = 0;
    const oe = a[m], se = {}, k = {};
    for (let w = 1; w <= u.length; w++)
      k[w + C] = oe[w], se[w + C] = !0, C += ne(u[w - 1]);
    a[m] = k, a[m]._emit = se, a[m]._multi = !0;
  }
  function ln(a) {
    if (Array.isArray(a.begin)) {
      if (a.skip || a.excludeBegin || a.returnBegin)
        throw Ie("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), gt;
      if (typeof a.beginScope != "object" || a.beginScope === null)
        throw Ie("beginScope must be object"), gt;
      Bt(a, a.begin, { key: "beginScope" }), a.begin = X(a.begin, { joinWith: "" });
    }
  }
  function zt(a) {
    if (Array.isArray(a.end)) {
      if (a.skip || a.excludeEnd || a.returnEnd)
        throw Ie("skip, excludeEnd, returnEnd not compatible with endScope: {}"), gt;
      if (typeof a.endScope != "object" || a.endScope === null)
        throw Ie("endScope must be object"), gt;
      Bt(a, a.end, { key: "endScope" }), a.end = X(a.end, { joinWith: "" });
    }
  }
  function an(a) {
    a.scope && typeof a.scope == "object" && a.scope !== null && (a.beginScope = a.scope, delete a.scope);
  }
  function vt(a) {
    an(a), typeof a.beginScope == "string" && (a.beginScope = { _wrap: a.beginScope }), typeof a.endScope == "string" && (a.endScope = { _wrap: a.endScope }), ln(a), zt(a);
  }
  function Ct(a) {
    function u(k, w) {
      return new RegExp(
        p(k),
        "m" + (a.case_insensitive ? "i" : "") + (a.unicodeRegex ? "u" : "") + (w ? "g" : "")
      );
    }
    class m {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      // @ts-ignore
      addRule(w, v) {
        v.position = this.position++, this.matchIndexes[this.matchAt] = v, this.regexes.push([v, w]), this.matchAt += ne(w) + 1;
      }
      compile() {
        this.regexes.length === 0 && (this.exec = () => null);
        const w = this.regexes.map((v) => v[1]);
        this.matcherRe = u(X(w, { joinWith: "|" }), !0), this.lastIndex = 0;
      }
      /** @param {string} s */
      exec(w) {
        this.matcherRe.lastIndex = this.lastIndex;
        const v = this.matcherRe.exec(w);
        if (!v)
          return null;
        const W = v.findIndex((ct, Ot) => Ot > 0 && ct !== void 0), re = this.matchIndexes[W];
        return v.splice(0, W), Object.assign(v, re);
      }
    }
    class C {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      // @ts-ignore
      getMatcher(w) {
        if (this.multiRegexes[w]) return this.multiRegexes[w];
        const v = new m();
        return this.rules.slice(w).forEach(([W, re]) => v.addRule(W, re)), v.compile(), this.multiRegexes[w] = v, v;
      }
      resumingScanAtSamePosition() {
        return this.regexIndex !== 0;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      // @ts-ignore
      addRule(w, v) {
        this.rules.push([w, v]), v.type === "begin" && this.count++;
      }
      /** @param {string} s */
      exec(w) {
        const v = this.getMatcher(this.regexIndex);
        v.lastIndex = this.lastIndex;
        let W = v.exec(w);
        if (this.resumingScanAtSamePosition() && !(W && W.index === this.lastIndex)) {
          const re = this.getMatcher(0);
          re.lastIndex = this.lastIndex + 1, W = re.exec(w);
        }
        return W && (this.regexIndex += W.position + 1, this.regexIndex === this.count && this.considerAll()), W;
      }
    }
    function oe(k) {
      const w = new C();
      return k.contains.forEach((v) => w.addRule(v.begin, { rule: v, type: "begin" })), k.terminatorEnd && w.addRule(k.terminatorEnd, { type: "end" }), k.illegal && w.addRule(k.illegal, { type: "illegal" }), w;
    }
    function se(k, w) {
      const v = (
        /** @type CompiledMode */
        k
      );
      if (k.isCompiled) return v;
      [
        Te,
        // do this early so compiler extensions generally don't have to worry about
        // the distinction between match/begin
        ae,
        vt,
        it
      ].forEach((re) => re(k, w)), a.compilerExtensions.forEach((re) => re(k, w)), k.__beforeBegin = null, [
        Ce,
        // do this later so compiler extensions that come earlier have access to the
        // raw array if they wanted to perhaps manipulate it, etc.
        q,
        // default to 1 relevance if not specified
        Ke
      ].forEach((re) => re(k, w)), k.isCompiled = !0;
      let W = null;
      return typeof k.keywords == "object" && k.keywords.$pattern && (k.keywords = Object.assign({}, k.keywords), W = k.keywords.$pattern, delete k.keywords.$pattern), W = W || /\w+/, k.keywords && (k.keywords = Pt(k.keywords, a.case_insensitive)), v.keywordPatternRe = u(W, !0), w && (k.begin || (k.begin = /\B|\b/), v.beginRe = u(v.begin), !k.end && !k.endsWithParent && (k.end = /\B|\b/), k.end && (v.endRe = u(v.end)), v.terminatorEnd = p(v.end) || "", k.endsWithParent && w.terminatorEnd && (v.terminatorEnd += (k.end ? "|" : "") + w.terminatorEnd)), k.illegal && (v.illegalRe = u(
        /** @type {RegExp | string} */
        k.illegal
      )), k.contains || (k.contains = []), k.contains = [].concat(...k.contains.map(function(re) {
        return ot(re === "self" ? k : re);
      })), k.contains.forEach(function(re) {
        se(
          /** @type Mode */
          re,
          v
        );
      }), k.starts && se(k.starts, w), v.matcher = oe(v), v;
    }
    if (a.compilerExtensions || (a.compilerExtensions = []), a.contains && a.contains.includes("self"))
      throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    return a.classNameAliases = n(a.classNameAliases || {}), se(
      /** @type Mode */
      a
    );
  }
  function He(a) {
    return a ? a.endsWithParent || He(a.starts) : !1;
  }
  function ot(a) {
    return a.variants && !a.cachedVariants && (a.cachedVariants = a.variants.map(function(u) {
      return n(a, { variants: null }, u);
    })), a.cachedVariants ? a.cachedVariants : He(a) ? n(a, { starts: a.starts ? n(a.starts) : null }) : Object.isFrozen(a) ? n(a) : a;
  }
  var Ut = "11.10.0";
  class Ht extends Error {
    constructor(u, m) {
      super(u), this.name = "HTMLInjectionError", this.html = m;
    }
  }
  const Ft = t, dt = n, bt = Symbol("nomatch"), $n = 7, lt = function(a) {
    const u = /* @__PURE__ */ Object.create(null), m = /* @__PURE__ */ Object.create(null), C = [];
    let oe = !0;
    const se = "Could not find the language '{}', did you forget to load/include a language module?", k = { disableAutodetect: !0, name: "Plain text", contains: [] };
    let w = {
      ignoreUnescapedHTML: !1,
      throwUnescapedHTML: !1,
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      cssSelector: "pre code",
      languages: null,
      // beta configuration options, subject to change, welcome to discuss
      // https://github.com/highlightjs/highlight.js/issues/1086
      __emitter: g
    };
    function v(b) {
      return w.noHighlightRe.test(b);
    }
    function W(b) {
      let S = b.className + " ";
      S += b.parentNode ? b.parentNode.className : "";
      const B = w.languageDetectRe.exec(S);
      if (B) {
        const ee = U(B[1]);
        return ee || (et(se.replace("{}", B[1])), et("Falling back to no-highlight mode for this block.", b)), ee ? B[1] : "no-highlight";
      }
      return S.split(/\s+/).find((ee) => v(ee) || U(ee));
    }
    function re(b, S, B) {
      let ee = "", ge = "";
      typeof S == "object" ? (ee = b, B = S.ignoreIllegals, ge = S.language) : ($e("10.7.0", "highlight(lang, code, ...args) has been deprecated."), $e("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), ge = b, ee = S), B === void 0 && (B = !0);
      const Ye = {
        code: ee,
        language: ge
      };
      ue("before:highlight", Ye);
      const ut = Ye.result ? Ye.result : ct(Ye.language, Ye.code, B);
      return ut.code = Ye.code, ue("after:highlight", ut), ut;
    }
    function ct(b, S, B, ee) {
      const ge = /* @__PURE__ */ Object.create(null);
      function Ye(_, T) {
        return _.keywords[T];
      }
      function ut() {
        if (!O.keywords) {
          _e.addText(ie);
          return;
        }
        let _ = 0;
        O.keywordPatternRe.lastIndex = 0;
        let T = O.keywordPatternRe.exec(ie), N = "";
        for (; T; ) {
          N += ie.substring(_, T.index);
          const K = Ve.case_insensitive ? T[0].toLowerCase() : T[0], Se = Ye(O, K);
          if (Se) {
            const [tt, cr] = Se;
            if (_e.addText(N), N = "", ge[K] = (ge[K] || 0) + 1, ge[K] <= $n && (bn += cr), tt.startsWith("_"))
              N += T[0];
            else {
              const ur = Ve.classNameAliases[tt] || tt;
              Xe(T[0], ur);
            }
          } else
            N += T[0];
          _ = O.keywordPatternRe.lastIndex, T = O.keywordPatternRe.exec(ie);
        }
        N += ie.substring(_), _e.addText(N);
      }
      function gn() {
        if (ie === "") return;
        let _ = null;
        if (typeof O.subLanguage == "string") {
          if (!u[O.subLanguage]) {
            _e.addText(ie);
            return;
          }
          _ = ct(O.subLanguage, ie, !0, fs[O.subLanguage]), fs[O.subLanguage] = /** @type {CompiledMode} */
          _._top;
        } else
          _ = mt(ie, O.subLanguage.length ? O.subLanguage : null);
        O.relevance > 0 && (bn += _.relevance), _e.__addSublanguage(_._emitter, _.language);
      }
      function Pe() {
        O.subLanguage != null ? gn() : ut(), ie = "";
      }
      function Xe(_, T) {
        _ !== "" && (_e.startScope(T), _e.addText(_), _e.endScope());
      }
      function ls(_, T) {
        let N = 1;
        const K = T.length - 1;
        for (; N <= K; ) {
          if (!_._emit[N]) {
            N++;
            continue;
          }
          const Se = Ve.classNameAliases[_[N]] || _[N], tt = T[N];
          Se ? Xe(tt, Se) : (ie = tt, ut(), ie = ""), N++;
        }
      }
      function as(_, T) {
        return _.scope && typeof _.scope == "string" && _e.openNode(Ve.classNameAliases[_.scope] || _.scope), _.beginScope && (_.beginScope._wrap ? (Xe(ie, Ve.classNameAliases[_.beginScope._wrap] || _.beginScope._wrap), ie = "") : _.beginScope._multi && (ls(_.beginScope, T), ie = "")), O = Object.create(_, { parent: { value: O } }), O;
      }
      function cs(_, T, N) {
        let K = j(_.endRe, N);
        if (K) {
          if (_["on:end"]) {
            const Se = new e(_);
            _["on:end"](T, Se), Se.isMatchIgnored && (K = !1);
          }
          if (K) {
            for (; _.endsParent && _.parent; )
              _ = _.parent;
            return _;
          }
        }
        if (_.endsWithParent)
          return cs(_.parent, T, N);
      }
      function rr(_) {
        return O.matcher.regexIndex === 0 ? (ie += _[0], 1) : (Bn = !0, 0);
      }
      function ir(_) {
        const T = _[0], N = _.rule, K = new e(N), Se = [N.__beforeBegin, N["on:begin"]];
        for (const tt of Se)
          if (tt && (tt(_, K), K.isMatchIgnored))
            return rr(T);
        return N.skip ? ie += T : (N.excludeBegin && (ie += T), Pe(), !N.returnBegin && !N.excludeBegin && (ie = T)), as(N, _), N.returnBegin ? 0 : T.length;
      }
      function or(_) {
        const T = _[0], N = S.substring(_.index), K = cs(O, _, N);
        if (!K)
          return bt;
        const Se = O;
        O.endScope && O.endScope._wrap ? (Pe(), Xe(T, O.endScope._wrap)) : O.endScope && O.endScope._multi ? (Pe(), ls(O.endScope, _)) : Se.skip ? ie += T : (Se.returnEnd || Se.excludeEnd || (ie += T), Pe(), Se.excludeEnd && (ie = T));
        do
          O.scope && _e.closeNode(), !O.skip && !O.subLanguage && (bn += O.relevance), O = O.parent;
        while (O !== K.parent);
        return K.starts && as(K.starts, _), Se.returnEnd ? 0 : T.length;
      }
      function lr() {
        const _ = [];
        for (let T = O; T !== Ve; T = T.parent)
          T.scope && _.unshift(T.scope);
        _.forEach((T) => _e.openNode(T));
      }
      let dn = {};
      function us(_, T) {
        const N = T && T[0];
        if (ie += _, N == null)
          return Pe(), 0;
        if (dn.type === "begin" && T.type === "end" && dn.index === T.index && N === "") {
          if (ie += S.slice(T.index, T.index + 1), !oe) {
            const K = new Error(`0 width match regex (${b})`);
            throw K.languageName = b, K.badRule = dn.rule, K;
          }
          return 1;
        }
        if (dn = T, T.type === "begin")
          return ir(T);
        if (T.type === "illegal" && !B) {
          const K = new Error('Illegal lexeme "' + N + '" for mode "' + (O.scope || "<unnamed>") + '"');
          throw K.mode = O, K;
        } else if (T.type === "end") {
          const K = or(T);
          if (K !== bt)
            return K;
        }
        if (T.type === "illegal" && N === "")
          return 1;
        if (Pn > 1e5 && Pn > T.index * 3)
          throw new Error("potential infinite loop, way more iterations than matches");
        return ie += N, N.length;
      }
      const Ve = U(b);
      if (!Ve)
        throw Ie(se.replace("{}", b)), new Error('Unknown language: "' + b + '"');
      const ar = Ct(Ve);
      let Dn = "", O = ee || ar;
      const fs = {}, _e = new w.__emitter(w);
      lr();
      let ie = "", bn = 0, wt = 0, Pn = 0, Bn = !1;
      try {
        if (Ve.__emitTokens)
          Ve.__emitTokens(S, _e);
        else {
          for (O.matcher.considerAll(); ; ) {
            Pn++, Bn ? Bn = !1 : O.matcher.considerAll(), O.matcher.lastIndex = wt;
            const _ = O.matcher.exec(S);
            if (!_) break;
            const T = S.substring(wt, _.index), N = us(T, _);
            wt = _.index + N;
          }
          us(S.substring(wt));
        }
        return _e.finalize(), Dn = _e.toHTML(), {
          language: b,
          value: Dn,
          relevance: bn,
          illegal: !1,
          _emitter: _e,
          _top: O
        };
      } catch (_) {
        if (_.message && _.message.includes("Illegal"))
          return {
            language: b,
            value: Ft(S),
            illegal: !0,
            relevance: 0,
            _illegalBy: {
              message: _.message,
              index: wt,
              context: S.slice(wt - 100, wt + 100),
              mode: _.mode,
              resultSoFar: Dn
            },
            _emitter: _e
          };
        if (oe)
          return {
            language: b,
            value: Ft(S),
            illegal: !1,
            relevance: 0,
            errorRaised: _,
            _emitter: _e,
            _top: O
          };
        throw _;
      }
    }
    function Ot(b) {
      const S = {
        value: Ft(b),
        illegal: !1,
        relevance: 0,
        _top: k,
        _emitter: new w.__emitter(w)
      };
      return S._emitter.addText(b), S;
    }
    function mt(b, S) {
      S = S || w.languages || Object.keys(u);
      const B = Ot(b), ee = S.filter(U).filter(ce).map(
        (Pe) => ct(Pe, b, !1)
      );
      ee.unshift(B);
      const ge = ee.sort((Pe, Xe) => {
        if (Pe.relevance !== Xe.relevance) return Xe.relevance - Pe.relevance;
        if (Pe.language && Xe.language) {
          if (U(Pe.language).supersetOf === Xe.language)
            return 1;
          if (U(Xe.language).supersetOf === Pe.language)
            return -1;
        }
        return 0;
      }), [Ye, ut] = ge, gn = Ye;
      return gn.secondBest = ut, gn;
    }
    function cn(b, S, B) {
      const ee = S && m[S] || B;
      b.classList.add("hljs"), b.classList.add(`language-${ee}`);
    }
    function De(b) {
      let S = null;
      const B = W(b);
      if (v(B)) return;
      if (ue(
        "before:highlightElement",
        { el: b, language: B }
      ), b.dataset.highlighted) {
        console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", b);
        return;
      }
      if (b.children.length > 0 && (w.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(b)), w.throwUnescapedHTML))
        throw new Ht(
          "One of your code blocks includes unescaped HTML.",
          b.innerHTML
        );
      S = b;
      const ee = S.textContent, ge = B ? re(ee, { language: B, ignoreIllegals: !0 }) : mt(ee);
      b.innerHTML = ge.value, b.dataset.highlighted = "yes", cn(b, B, ge.language), b.result = {
        language: ge.language,
        // TODO: remove with version 11.0
        re: ge.relevance,
        relevance: ge.relevance
      }, ge.secondBest && (b.secondBest = {
        language: ge.secondBest.language,
        relevance: ge.secondBest.relevance
      }), ue("after:highlightElement", { el: b, result: ge, text: ee });
    }
    function un(b) {
      w = dt(w, b);
    }
    const fn = () => {
      Mt(), $e("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    function hn() {
      Mt(), $e("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let jt = !1;
    function Mt() {
      if (document.readyState === "loading") {
        jt = !0;
        return;
      }
      document.querySelectorAll(w.cssSelector).forEach(De);
    }
    function y() {
      jt && Mt();
    }
    typeof window < "u" && window.addEventListener && window.addEventListener("DOMContentLoaded", y, !1);
    function c(b, S) {
      let B = null;
      try {
        B = S(a);
      } catch (ee) {
        if (Ie("Language definition for '{}' could not be registered.".replace("{}", b)), oe)
          Ie(ee);
        else
          throw ee;
        B = k;
      }
      B.name || (B.name = b), u[b] = B, B.rawDefinition = S.bind(null, a), B.aliases && pe(B.aliases, { languageName: b });
    }
    function d(b) {
      delete u[b];
      for (const S of Object.keys(m))
        m[S] === b && delete m[S];
    }
    function E() {
      return Object.keys(u);
    }
    function U(b) {
      return b = (b || "").toLowerCase(), u[b] || u[m[b]];
    }
    function pe(b, { languageName: S }) {
      typeof b == "string" && (b = [b]), b.forEach((B) => {
        m[B.toLowerCase()] = S;
      });
    }
    function ce(b) {
      const S = U(b);
      return S && !S.disableAutodetect;
    }
    function Ae(b) {
      b["before:highlightBlock"] && !b["before:highlightElement"] && (b["before:highlightElement"] = (S) => {
        b["before:highlightBlock"](
          Object.assign({ block: S.el }, S)
        );
      }), b["after:highlightBlock"] && !b["after:highlightElement"] && (b["after:highlightElement"] = (S) => {
        b["after:highlightBlock"](
          Object.assign({ block: S.el }, S)
        );
      });
    }
    function Fe(b) {
      Ae(b), C.push(b);
    }
    function _t(b) {
      const S = C.indexOf(b);
      S !== -1 && C.splice(S, 1);
    }
    function ue(b, S) {
      const B = b;
      C.forEach(function(ee) {
        ee[B] && ee[B](S);
      });
    }
    function pn(b) {
      return $e("10.7.0", "highlightBlock will be removed entirely in v12.0"), $e("10.7.0", "Please use highlightElement now."), De(b);
    }
    Object.assign(a, {
      highlight: re,
      highlightAuto: mt,
      highlightAll: Mt,
      highlightElement: De,
      // TODO: Remove with v12 API
      highlightBlock: pn,
      configure: un,
      initHighlighting: fn,
      initHighlightingOnLoad: hn,
      registerLanguage: c,
      unregisterLanguage: d,
      listLanguages: E,
      getLanguage: U,
      registerAliases: pe,
      autoDetection: ce,
      inherit: dt,
      addPlugin: Fe,
      removePlugin: _t
    }), a.debugMode = function() {
      oe = !1;
    }, a.safeMode = function() {
      oe = !0;
    }, a.versionString = Ut, a.regex = {
      concat: x,
      lookahead: M,
      either: te,
      optional: L,
      anyNumberOfTimes: R
    };
    for (const b in J)
      typeof J[b] == "object" && s(J[b]);
    return Object.assign(a, J), a;
  }, at = lt({});
  return at.newInstance = () => lt({}), Wn = at, at.HighlightJS = at, at.default = at, Wn;
}
var Pi = /* @__PURE__ */ Di();
const Kn = /* @__PURE__ */ $i(Pi), Bi = {
  label: "Run or edit the query",
  title: "Open the SPARQL query in an editor in a new tab"
};
function zi(s, e = "") {
  return `https://sib-swiss.github.io/sparql-editor/?${e ? `endpoint=${e}&` : ""}query=${encodeURIComponent(s)}`;
}
const Ui = `chat-with-context {
  button:hover {
    filter: brightness(90%);
  }
}
.iconBtn {
  filter: invert(44%) sepia(22%) saturate(496%) hue-rotate(176deg) brightness(93%) contrast(79%);
}`;
function Hi(s) {
  var e = {
    keyword: "base|10 prefix|10 @base|10 @prefix|10",
    literal: "true|0 false|0",
    built_in: "a|0"
  }, t = {
    // https://www.w3.org/TR/turtle/#grammar-production-IRIREF
    className: "literal",
    relevance: 1,
    // XML tags look also like relative IRIs
    begin: /</,
    end: />/,
    // eslint-disable-next-line no-control-regex
    illegal: /[^\x00-\x20<>"{}|^`]/
    // TODO: https://www.w3.org/TR/turtle/#grammar-production-UCHAR
  }, n = "A-Za-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�က0-F", r = n + "_", i = "-" + r + "0-9·̀-ͯ‿-⁀", o = "_:[" + r + "0-9]([" + i + ".]*[" + i + "])?", l = "[" + n + "]([" + i + ".]*[" + i + "])?", f = "%[0-9A-Fa-f][0-9A-Fa-f]", h = "\\\\[_~.!$&'()*+,;=/?#@%-]", g = f + "|" + h, p = "(" + l + ")?:", M = "([" + r + ":0-9]|" + g + ")([" + i + ".:]|" + g + ")*([" + i + ":]|" + g + ")?", R = p + M, L = p + "(" + M + ")?", x = {
    begin: L,
    relevance: 0,
    className: "symbol"
  }, Z = {
    begin: o,
    relevance: 10,
    className: "template-variable"
  }, te = {
    begin: /@[a-zA-Z]+([a-zA-Z0-9-]+)*/,
    className: "type",
    relevance: 5
    // also catches objectivec keywords like: @protocol, @optional
  }, ne = {
    begin: "\\^\\^" + R,
    className: "type",
    relevance: 10
  }, j = {
    begin: /'''/,
    end: /'''/,
    className: "string",
    relevance: 0
  }, I = {
    begin: /"""/,
    end: /"""/,
    className: "string",
    relevance: 0
  }, X = JSON.parse(JSON.stringify(s.APOS_STRING_MODE));
  X.relevance = 0;
  var we = JSON.parse(JSON.stringify(s.QUOTE_STRING_MODE));
  we.relevance = 0;
  var xe = JSON.parse(JSON.stringify(s.C_NUMBER_MODE));
  return xe.relevance = 0, {
    case_insensitive: !0,
    keywords: e,
    aliases: ["turtle", "ttl", "n3", "ntriples", "shex", "trig"],
    contains: [
      te,
      ne,
      t,
      Z,
      x,
      j,
      I,
      // order matters
      X,
      we,
      xe,
      s.HASH_COMMENT_MODE
    ],
    exports: {
      LANGTAG: te,
      DATATYPE: ne,
      IRI_LITERAL: t,
      BLANK_NODE: Z,
      PNAME: x,
      TRIPLE_APOS_STRING: j,
      TRIPLE_QUOTE_STRING: I,
      APOS_STRING_LITERAL: X,
      QUOTE_STRING_LITERAL: we,
      NUMBER: xe,
      KEYWORDS: e
    }
  };
}
function Fi(s) {
  var e = s.getLanguage("ttl").exports, t = {
    keyword: "base|10 prefix|10 @base|10 @prefix|10 add all as|0 ask bind by|0 clear construct|10 copymove create data default define delete describe distinct drop exists filter from|0 graph|10 group having in|0 insert limit load minus named|10 not offset optional order reduced select|0 service silent to union using values where with|0",
    function: "abs asc avg bound ceil coalesce concat containsstrbefore count dayhours desc encode_for_uri floor group_concat if|0 iri isblank isiri isliteral isnumeric isuri langdatatype langmatches lcase max md5 min|0 minutes month now rand regex replace round sameterm sample seconds separator sha1 sha256 sha384 sha512 str strafter strdt strends strlang strlen strstarts struuid substr sum then timezone tz ucase uribnode uuid year",
    literal: "true|0 false|0",
    built_in: "a|0"
  }, n = {
    className: "variable",
    begin: "[?$]" + s.IDENT_RE,
    relevance: 0
  }, r = {
    begin: /"""\s*\{/,
    // TODO why can't I write (?=\{)
    end: /"""/,
    subLanguage: "json",
    excludeBegin: !0,
    excludeEnd: !0,
    relevance: 0
  }, i = {
    begin: /'''\s*\{/,
    // TODO why can't I write (?=\{)
    end: /'''/,
    subLanguage: "json",
    excludeBegin: !0,
    excludeEnd: !0,
    relevance: 0
  };
  return {
    case_insensitive: !0,
    keywords: t,
    aliases: ["sparql", "rql", "rq", "ru"],
    contains: [
      e.LANGTAG,
      e.DATATYPE,
      e.IRI_LITERAL,
      e.BLANK_NODE,
      e.PNAME,
      n,
      r,
      // order matters
      i,
      e.TRIPLE_QUOTE_STRING,
      e.TRIPLE_APOS_STRING,
      e.QUOTE_STRING_LITERAL,
      e.APOS_STRING_LITERAL,
      e.NUMBER,
      s.HASH_COMMENT_MODE
    ]
  };
}
const ji = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20class='lucide%20lucide-arrow-up-icon%20lucide-arrow-up'%3e%3cpath%20d='m5%2012%207-7%207%207'/%3e%3cpath%20d='M12%2019V5'/%3e%3c/svg%3e", Ls = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20class='feather%20feather-x'%3e%3cline%20x1='18'%20y1='6'%20x2='6'%20y2='18'%3e%3c/line%3e%3cline%20x1='6'%20y1='6'%20x2='18'%20y2='18'%3e%3c/line%3e%3c/svg%3e", Gi = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20class='feather%20feather-edit'%3e%3cpath%20d='M11%204H4a2%202%200%200%200-2%202v14a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2v-7'%3e%3c/path%3e%3cpath%20d='M18.5%202.5a2.121%202.121%200%200%201%203%203L12%2015l-4%201%201-4%209.5-9.5z'%3e%3c/path%3e%3c/svg%3e", qi = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20class='feather%20feather-square'%3e%3crect%20x='3'%20y='3'%20width='18'%20height='18'%20rx='2'%20ry='2'%3e%3c/rect%3e%3c/svg%3e", Wi = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20class='feather%20feather-thumbs-down'%3e%3cpath%20d='M10%2015v4a3%203%200%200%200%203%203l4-9V2H5.72a2%202%200%200%200-2%201.7l-1.38%209a2%202%200%200%200%202%202.3zm7-13h2.67A2.31%202.31%200%200%201%2022%204v7a2.31%202.31%200%200%201-2.33%202H17'%3e%3c/path%3e%3c/svg%3e", Ki = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20class='feather%20feather-thumbs-up'%3e%3cpath%20d='M14%209V5a3%203%200%200%200-3-3l-4%209v11h11.28a2%202%200%200%200%202-1.7l1.38-9a2%202%200%200%200-2-2.3zM7%2022H4a2%202%200%200%201-2-2v-7a2%202%200%200%201%202-2h3'%3e%3c/path%3e%3c/svg%3e";
class Yi {
  constructor({ apiUrl: e = "", apiKey: t = "", model: n = "" }) {
    this.abortRequest = () => {
      this.abortController.abort(), this.abortController = new AbortController();
    }, this.lastMsg = () => this.messages()[this.messages().length - 1], this.scrollToInput = () => {
    }, this.appendMessage = (o, l = "assistant") => {
      const [f, h] = ze(o), [g, p] = ze([]), [M, R] = ze([]), L = { content: f, setContent: h, steps: g, setSteps: p, role: l, links: M, setLinks: R };
      this.setMessages((x) => [...x, L]);
    }, this.appendContentToLastMsg = (o, l = !1) => {
      this.lastMsg().setContent((f) => f + (l ? `

` : "") + o), this.onMessageUpdate();
    }, this.appendStepToLastMsg = (o, l, f = "", h = []) => {
      this.lastMsg().setSteps((g) => [...g, { node_id: o, label: l, details: f, substeps: h }]), this.scrollToInput(), this.onMessageUpdate();
    }, this.apiUrl = e, this.apiKey = t, this.model = n;
    const [r, i] = ze([]);
    this.messages = r, this.setMessages = i, this.abortController = new AbortController(), this.onMessageUpdate = () => {
    };
  }
}
async function Zi(s, e) {
  s.appendMessage(e, "user"), await Vi(s);
}
async function Xi(s, e) {
  if (e.event === "error")
    throw new Error(`An error occurred. Please try again. ${e.data.error}: ${e.data.message}`);
  if (e.event === "updates")
    for (const t of Object.keys(e.data)) {
      const n = e.data[t];
      if (n) {
        if (n.steps)
          for (const r of n.steps)
            r.type === "recall" ? s.appendMessage("", "assistant") : r.fixed_message && s.lastMsg().setContent(r.fixed_message), s.appendStepToLastMsg(t, r.label, r.details, r.substeps);
        n.structured_output && n.structured_output.sparql_query && s.lastMsg().setLinks([
          {
            url: zi(
              n.structured_output.sparql_query,
              n.structured_output.sparql_endpoint_url
            ),
            ...Bi
          }
        ]);
      }
    }
  if (e.event === "messages") {
    const [t, n] = e.data;
    if (n.structured_output_format) return;
    if (t.content && t.type === "tool") {
      const r = t.name ? t.name.replace(/_/g, " ").replace(/^\w/, (o) => o.toUpperCase()) : "Tool", i = t.name.includes("resources") ? "📚" : t.name.includes("execute") ? "📡" : "🔧";
      s.appendMessage("", "assistant"), s.appendStepToLastMsg(n.langgraph_node, `${i} ${r}`, t.content);
    } else t.content === "</think>" && t.type === "AIMessageChunk" ? (s.appendContentToLastMsg(t.content), s.appendStepToLastMsg(n.langgraph_node, "💭 Thought process", s.lastMsg().content()), s.lastMsg().setContent("")) : t.content && t.type === "AIMessageChunk" && n.langgraph_node === "call_model" && s.appendContentToLastMsg(t.content);
  }
}
async function Vi(s) {
  const e = await fetch(`${s.apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${s.apiKey}`
    },
    signal: s.abortController.signal,
    body: JSON.stringify({
      messages: s.messages().map(({ content: i, role: o }) => ({ content: i(), role: o })),
      stream: !0,
      ...s.model ? { model: s.model } : {}
    })
  });
  s.appendMessage("", "assistant");
  const t = e.body?.getReader(), n = new TextDecoder("utf-8");
  let r = "";
  for (; ; )
    if (t) {
      const { value: i, done: o } = await t.read();
      if (o) break;
      const l = n.decode(i, { stream: !0 });
      r += l;
      let f = r.split(`
`);
      r = f.pop() || "";
      for (const h of f.filter((g) => g.trim() !== "")) {
        if (h === "data: [DONE]") return;
        if (h.startsWith("data: "))
          try {
            const g = JSON.parse(h.substring(6));
            Xi(s, g);
          } catch (g) {
            console.log("Error parsing line", g, h);
          }
      }
    }
}
var Qi = /* @__PURE__ */ ve('<div><style></style><div></div><form class="p-2 flex"><div class="container flex mx-auto max-w-5xl items-start space-x-2"><div class="relative flex-grow"><textarea autofocus class="w-full px-4 pr-14 py-2 h-auto border border-slate-400 bg-slate-200 dark:bg-slate-700 dark:border-slate-500 rounded-3xl focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-400 overflow-y-hidden resize-none"placeholder="Ask your question"rows=1></textarea><button type=submit></button></div><div class="flex-shrink-0 self-start mt-1"><button title="Start a new conversation"class="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-sm"type=button aria-label="Start a new conversation"><img alt="Start a new conversation"class="iconBtn w-4 h-4">'), Ji = /* @__PURE__ */ ve('<div><div><div class="flex flex-col items-start"></div><article class="prose max-w-full">'), Is = /* @__PURE__ */ ve('<button class="text-gray-600 ml-8 mb-4 px-3 py-1 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">'), eo = /* @__PURE__ */ ve('<dialog class="bg-white dark:bg-gray-800 m-3 rounded-3xl shadow-md w-full"><button class="fixed top-2 right-8 m-3 px-2 text-xl text-slate-500 bg-gray-200 dark:bg-gray-700 rounded-3xl"title="Close documents details"><img alt="Close the dialog"class=iconBtn></button><article class="prose max-w-full p-3"><div class="flex space-x-2 mb-4">'), to = /* @__PURE__ */ ve("<button>"), no = /* @__PURE__ */ ve('<article class="prose max-w-full">'), so = /* @__PURE__ */ ve('<dialog class="bg-white dark:bg-gray-800 m-3 rounded-3xl shadow-md w-full"><button class="fixed top-2 right-8 m-3 px-2 text-xl text-slate-500 bg-gray-200 dark:bg-gray-700 rounded-3xl"title="Close step details"><img alt="Close the dialog"class=iconBtn></button><article class="prose max-w-full p-6">'), ro = /* @__PURE__ */ ve('<p class="text-gray-400 ml-8 mb-4">'), io = /* @__PURE__ */ ve('<a target=_blank class=hover:text-inherit><button class="my-3 mr-1 px-3 py-1 text-sm bg-gray-300 dark:bg-gray-700 rounded-3xl align-middle">'), oo = /* @__PURE__ */ ve('<button class="mr-1 my-3 px-3 py-1 text-sm hover:bg-gray-300 dark:hover:bg-gray-800 rounded-3xl align-middle"title="Report a good response"><img alt="Thumbs up"height=20px width=20px class=iconBtn>'), lo = /* @__PURE__ */ ve('<button class="my-3 px-3 py-1 text-sm hover:bg-gray-300 dark:hover:bg-gray-800 rounded-3xl align-middle"title="Report a bad response"><img alt="Thumbs down"height=20px width=20px class=iconBtn>'), ao = /* @__PURE__ */ ve('<div class=text-center><div class="bg-orange-300 p-2 text-orange-900 text-sm rounded-3xl font-semibold mb-2 inline-block">'), co = /* @__PURE__ */ ve('<img alt="Stop generation"class="iconBtn w-4 h-4">'), uo = /* @__PURE__ */ ve('<img alt="Send question"class="iconBtn w-4 h-4">'), fo = /* @__PURE__ */ ve('<div class="py-2 px-4 justify-center items-center text-sm flex flex-col space-y-2">'), ho = /* @__PURE__ */ ve('<button class="px-5 py-2.5 bg-slate-200 text-slate-600 rounded-3xl">');
Pr("chat-with-context", {
  chatEndpoint: "",
  examples: "",
  apiKey: "",
  feedbackEndpoint: "",
  model: ""
}, (s) => {
  Mr(), Kn.registerLanguage("ttl", Hi), Kn.registerLanguage("sparql", Fi);
  const [e, t] = ze([]), [n, r] = ze(""), [i, o] = ze(!1), [l, f] = ze(""), [h, g] = ze(""), [p, M] = ze(""), [R, L] = ze(!1), x = new Yi({});
  let Z, te;
  H.use({
    gfm: !0
    // Includes autolinker
  }), hs(() => {
    s.chatEndpoint === "" && r("Please provide an API URL for the chat component to work."), x.apiUrl = s.chatEndpoint, x.apiKey = s.apiKey, x.model = s.model, x.scrollToInput = () => {
    }, x.onMessageUpdate = () => I(), t(s.examples.split(",").map(($) => $.trim())), M(s.feedbackEndpoint), xe();
  });
  const ne = ($) => {
    f($), document.getElementById($).showModal(), history.pushState({
      dialogOpen: !0
    }, ""), document.body.style.overflow = "hidden", I();
  }, j = () => {
    document.body.style.overflow = "";
    const $ = document.getElementById(l());
    $ && $.close(), f("");
  };
  hs(() => {
    window.addEventListener("popstate", ($) => {
      l() && ($.preventDefault(), j());
    });
  });
  const I = () => {
    document.querySelectorAll("pre code:not(.hljs)").forEach(($) => {
      Kn.highlightElement($);
    });
  };
  async function X($) {
    if (!$.trim() || i()) return;
    te.value = "", o(!0), r(""), setTimeout(() => xe(), 0);
    const ke = Date.now();
    try {
      await Zi(x, $);
    } catch (he) {
      he instanceof Error && he.name !== "AbortError" && (console.error("An error occurred when querying the API:", he), r("An error occurred when querying the API. Please try again or contact an admin."));
    }
    o(!1), L(!1), I(), x.scrollToInput(), console.log(`Request completed in ${(Date.now() - ke) / 1e3} seconds`);
  }
  function we($) {
    fetch(p(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        like: $,
        messages: x.messages().map((ke) => ({
          role: ke.role,
          content: ke.content(),
          steps: ke.steps().map((he) => ({
            label: he.label,
            details: he.details,
            node_id: he.node_id,
            substeps: he.substeps
          }))
        }))
      })
    }), L(!0);
  }
  function xe() {
    const $ = window.scrollX || window.pageXOffset, ke = window.scrollY || window.pageYOffset;
    te.style.height = "auto", te.style.height = te.scrollHeight + "px", window.scrollTo($, ke), setTimeout(() => window.scrollTo($, ke), 0);
  }
  return (() => {
    var $ = Qi(), ke = $.firstChild, he = ke.nextSibling, le = he.nextSibling, ht = le.firstChild, st = ht.firstChild, Ee = st.firstChild, rt = Ee.nextSibling, Dt = st.nextSibling, yt = Dt.firstChild, Je = yt.firstChild;
    be(ke, Ui);
    var Tt = Z;
    typeof Tt == "function" ? ds(Tt, he) : Z = he, be(he, Nt(Lt, {
      get each() {
        return x.messages();
      },
      children: (A, V) => (() => {
        var F = Ji(), ye = F.firstChild, G = ye.firstChild, Ue = G.nextSibling;
        return be(G, Nt(Lt, {
          get each() {
            return A.steps();
          },
          children: (z, Q) => z.substeps && z.substeps.length > 0 ? [(() => {
            var D = Is();
            return D.$$click = () => {
              g(z.substeps?.[0]?.label || ""), ne(`step-dialog-${V()}-${Q()}`);
            }, be(D, () => z.label), Be(() => de(D, "title", `Click to see the documents used to generate the response

Node: ${z.node_id}`)), D;
          })(), (() => {
            var D = eo(), J = D.firstChild, We = J.firstChild, Te = J.nextSibling, Ce = Te.firstChild;
            return D.addEventListener("close", () => j()), J.$$click = () => j(), de(We, "src", Ls), be(Ce, Nt(Lt, {
              get each() {
                return z.substeps.map((q) => q.label);
              },
              children: (q) => (() => {
                var ae = to();
                return ae.$$click = () => {
                  g(q), I();
                }, de(ae, "title", `Show ${q}`), be(ae, q), Be(() => It(ae, `px-4 py-2 rounded-lg transition-all ${h() === q ? "bg-gray-600 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`)), ae;
              })()
            })), be(Te, Nt(Lt, {
              get each() {
                return z.substeps.filter((q) => q.label === h());
              },
              children: (q) => (() => {
                var ae = no();
                return Be(() => ae.innerHTML = qn.sanitize(H.parse(q.details), {
                  ADD_TAGS: ["think"]
                })), ae;
              })()
            }), null), Be((q) => {
              var ae = `step-dialog-${V()}-${Q()}`, Ke = `close-dialog-${V()}-${Q()}`;
              return ae !== q.e && de(D, "id", q.e = ae), Ke !== q.t && de(J, "id", q.t = Ke), q;
            }, {
              e: void 0,
              t: void 0
            }), D;
          })()] : z.details ? [(() => {
            var D = Is();
            return D.$$click = () => {
              ne(`step-dialog-${V()}-${Q()}`);
            }, be(D, () => z.label), Be(() => de(D, "title", `Click to see the documents used to generate the response

Node: ${z.node_id}`)), D;
          })(), (() => {
            var D = so(), J = D.firstChild, We = J.firstChild, Te = J.nextSibling;
            return D.addEventListener("close", () => j()), J.$$click = () => j(), de(We, "src", Ls), Be((Ce) => {
              var q = `step-dialog-${V()}-${Q()}`, ae = `close-dialog-${V()}-${Q()}`, Ke = qn.sanitize(H.parse(z.details), {
                ADD_TAGS: ["think"]
              });
              return q !== Ce.e && de(D, "id", Ce.e = q), ae !== Ce.t && de(J, "id", Ce.t = ae), Ke !== Ce.a && (Te.innerHTML = Ce.a = Ke), Ce;
            }, {
              e: void 0,
              t: void 0,
              a: void 0
            }), D;
          })()] : (
            // Display basic step without details
            (() => {
              var D = ro();
              return be(D, () => z.label), Be(() => de(D, "title", `Node: ${z.node_id}`)), D;
            })()
          )
        })), be(ye, Nt(Lt, {
          get each() {
            return A.links();
          },
          children: (z) => (() => {
            var Q = io(), D = Q.firstChild;
            return be(D, () => z.label), Be((J) => {
              var We = z.url, Te = z.title;
              return We !== J.e && de(Q, "href", J.e = We), Te !== J.t && de(Q, "title", J.t = Te), J;
            }, {
              e: void 0,
              t: void 0
            }), Q;
          })()
        }), null), be(ye, (() => {
          var z = Vt(() => !!(p() && A.role === "assistant" && V() === x.messages().length - 1 && x.lastMsg().content() && !R()));
          return () => z() && [(() => {
            var Q = oo(), D = Q.firstChild;
            return Q.$$click = () => we(!0), de(D, "src", Ki), Q;
          })(), (() => {
            var Q = lo(), D = Q.firstChild;
            return Q.$$click = () => we(!1), de(D, "src", Wi), Q;
          })()];
        })(), null), Be((z) => {
          var Q = `w-full flex flex-col flex-grow ${A.role === "user" ? "items-end" : ""}`, D = `py-2.5 mb-2 ${A.role === "user" ? "bg-gray-300 rounded-3xl px-5" : ""}`, J = qn.sanitize(H.parse(A.content()), {
            ADD_TAGS: ["think"]
          });
          return Q !== z.e && It(F, z.e = Q), D !== z.t && It(ye, z.t = D), J !== z.a && (Ue.innerHTML = z.a = J), z;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), F;
      })()
    })), be($, (() => {
      var A = Vt(() => !!n());
      return () => A() && (() => {
        var V = ao(), F = V.firstChild;
        return be(F, n), V;
      })();
    })(), le), le.addEventListener("submit", (A) => {
      A.preventDefault(), A.type === "submit" && A.submitter && i() && x.abortRequest(), X(te.value);
    }), Ee.$$input = () => xe(), Ee.$$keydown = (A) => {
      A.key === "Enter" && !A.shiftKey && (A.preventDefault(), X(te.value));
    };
    var pt = te;
    return typeof pt == "function" ? ds(pt, Ee) : te = Ee, Ee.style.setProperty("overflow-anchor", "none"), be(rt, (() => {
      var A = Vt(() => !!i());
      return () => A() ? (() => {
        var V = co();
        return de(V, "src", qi), V;
      })() : (() => {
        var V = uo();
        return de(V, "src", ji), V;
      })();
    })()), yt.$$click = () => x.setMessages([]), de(Je, "src", Gi), be($, (() => {
      var A = Vt(() => x.messages().length < 1);
      return () => A() && (() => {
        var V = fo();
        return be(V, Nt(Lt, {
          get each() {
            return e();
          },
          children: (F) => (() => {
            var ye = ho();
            return ye.$$click = () => X(F), be(ye, F), ye;
          })()
        })), V;
      })();
    })(), null), Be((A) => {
      var V = `chat-with-context w-full h-full flex flex-col ${x.messages().length === 0 ? "justify-center" : ""}`, F = `overflow-y-auto ${x.messages().length !== 0 ? "flex-grow" : ""}`, ye = i() ? "Stop generation" : "Send question", G = `absolute right-2 top-1 w-8 h-8 flex items-center justify-center rounded-full text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-sm ${i() ? "loading-spark" : ""}`, Ue = i() ? "Stop generation" : "Send question";
      return V !== A.e && It($, A.e = V), F !== A.t && It(he, A.t = F), ye !== A.a && de(rt, "title", A.a = ye), G !== A.o && It(rt, A.o = G), Ue !== A.i && de(rt, "aria-label", A.i = Ue), A;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0
    }), $;
  })();
});
Er(["keydown", "input", "click"]);
//# sourceMappingURL=chat-with-context.js.map
