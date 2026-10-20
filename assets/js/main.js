/* Fanaka Noblewealth Advisory | site scripts (no dependencies) */
(() => {
  const d = document, root = d.body.dataset.root || "";
  const $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
               set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };
  const fine = matchMedia("(pointer:fine)").matches;
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ---- Language switcher (EN default, SW via data-sw attributes) ---- */
  function setLang(l) {
    d.documentElement.lang = l;
    $$("[data-sw]").forEach(el => {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      el.innerHTML = l === "sw" ? el.dataset.sw : el.dataset.en;
    });
    $$("[data-sw-ph]").forEach(el => {
      if (el.dataset.enPh === undefined) el.dataset.enPh = el.placeholder;
      el.placeholder = l === "sw" ? el.dataset.swPh : el.dataset.enPh;
    });
    $$(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.l === l));
    ls.set("fanaka_lang", l);
  }
  $$(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.l)));
  if (ls.get("fanaka_lang") === "sw") setLang("sw");

  /* ---- Header remains floating while its surface strengthens on scroll ---- */
  const hd = $(".hd");
  const onScroll = () => {
    const y = scrollY;
    hd.classList.toggle("solid", y > 40);
    $(".top").classList.toggle("on", y > 700);
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $(".burger").addEventListener("click", e => {
    const o = d.body.classList.toggle("nav-open"); e.currentTarget.setAttribute("aria-expanded", o);
  });
  $(".top").addEventListener("click", () => scrollTo({ top: 0 }));

  /* ---- 3D page transition ---- */
  const pt = $(".pt");
  requestAnimationFrame(() => setTimeout(() => pt.classList.add("open"), 60));
  addEventListener("pageshow", e => { if (e.persisted) pt.classList.add("open"); });
  d.addEventListener("click", e => {
    const a = e.target.closest("a[href]");
    if (!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey || reduce) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin && location.protocol !== "file:") return;
    if (u.protocol !== location.protocol || /^(mailto|tel):/.test(a.getAttribute("href")) || (u.pathname === location.pathname && u.hash)) return;
    e.preventDefault(); pt.classList.remove("open"); pt.classList.add("go");
    setTimeout(() => (location.href = a.href), 480);
  });

  /* ---- Scroll reveal ---- */
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("vis"); io.unobserve(x.target); } }), { threshold: .12 });
  $$(".rv").forEach(el => io.observe(el));

  /* ---- 3D tilt cards (mouse devices only) ---- */
  if (fine && !reduce) $$(".card.tilt").forEach(c => {
    c.addEventListener("pointermove", e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty("--ry", ((x - .5) * 10) + "deg"); c.style.setProperty("--rx", ((.5 - y) * 10) + "deg");
      c.style.setProperty("--mx", x * 100 + "%"); c.style.setProperty("--my", y * 100 + "%");
    });
    c.addEventListener("pointerleave", () => { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); });
  });

  /* ---- Hero video (uses assets/video/hero.mp4 when it exists; word-art plays until then) ---- */
  const v = $(".hero video");
  if (v) {
    const save = navigator.connection && navigator.connection.saveData;
    if (save || reduce) { v.remove(); } else {
      v.addEventListener("canplay", () => v.classList.add("ok"));
      v.play && v.play().catch(() => {});
    }
    const pb = $(".vpause");
    if (pb) pb.addEventListener("click", () => {
      const f = $(".hero iframe");
      if (v.paused) { v.play(); pb.dataset.p = ""; pb.textContent = "Pause"; if (f) f.style.visibility = "visible"; }
      else { v.pause(); pb.textContent = "Play"; }
    });
  }

  /* ---- Cookie consent ---- */
  const ck = $(".ck"), cm = $(".cm");
  const saved = () => { try { return JSON.parse(ls.get("fanaka_consent")); } catch (e) { return null; } };
  const save = (a, m) => {
    ls.set("fanaka_consent", JSON.stringify({ analytics: a, marketing: m, ts: Date.now(), v: 1 }));
    ck.classList.remove("on"); cm.classList.remove("on");
    /* Load analytics/marketing scripts here ONLY when a / m is true. */
  };
  if (!saved()) setTimeout(() => ck.classList.add("on"), 900);
  $$("[data-ck=all]").forEach(b => b.onclick = () => save(true, true));
  $$("[data-ck=none]").forEach(b => b.onclick = () => save(false, false));
  $$("[data-ck=manage]").forEach(b => b.onclick = () => { const s = saved() || {}; $("#ck-a").checked = !!s.analytics; $("#ck-m").checked = !!s.marketing; cm.classList.add("on"); });
  $("[data-ck=save]").onclick = () => save($("#ck-a").checked, $("#ck-m").checked);
  $$("[data-ck=open]").forEach(b => b.onclick = () => $("[data-ck=manage]").click());

  /* ---- Forms (swap the action URL for Formspree/Netlify later; see README) ---- */
  $$("form[data-form]").forEach(f => f.addEventListener("submit", async e => {
    e.preventDefault();
    if ($(".hp", f) && $(".hp", f).value) return;
    let ok = true;
    $$("[required]", f).forEach(i => { const bad = i.type === "checkbox" ? !i.checked : !i.value.trim() || (i.type === "email" && !/^\S+@\S+\.\S+$/.test(i.value)); i.classList.toggle("bad", bad); if (bad) ok = false; });
    if (!ok) { const b = $(".bad", f); b && b.focus(); return; }
    const act = f.getAttribute("action");
    if (act && /^https?:/.test(act)) { try { await fetch(act, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } }); } catch (x) {} }
    else if (f.dataset.mail) {
      const lines = [...new FormData(f).entries()].filter(([k]) => k !== "website").map(([k, v]) => k + ": " + v).join("\n");
      location.href = "mailto:" + f.dataset.mail + "?subject=" + encodeURIComponent(f.dataset.subject || "Enquiry") + "&body=" + encodeURIComponent(lines);
      await new Promise(r => setTimeout(r, 900));
    }
    location.href = root + "thank-you.html";
  }));

  /* ---- Savings growth calculator ---- */
  const calc = $("#calc");
  if (calc) {
    const f = n => Math.round(n).toLocaleString("en-KE");
    const run = () => {
      const p = +$("#c1").value || 0, m = +$("#c2").value || 0, r = (+$("#c3").value || 0) / 100 / 12, n = (+$("#c4").value || 0) * 12;
      const fv = r ? p * Math.pow(1 + r, n) + m * ((Math.pow(1 + r, n) - 1) / r) : p + m * n, put = p + m * n;
      $("#r1").textContent = "KES " + f(fv); $("#r2").textContent = "KES " + f(put); $("#r3").textContent = "KES " + f(fv - put);
    };
    $$("input", calc).forEach(i => i.addEventListener("input", run)); run();
  }
})();
