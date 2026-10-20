/* Fanaka | mobile submenu, service preselect, goal finder, hero cube parallax */
(() => {
  const d = document, $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => [...c.querySelectorAll(s)];
  $$(".chev").forEach(b => b.addEventListener("click", () => { const w = b.closest(".dd-wrap"), o = w.classList.toggle("open"); b.setAttribute("aria-expanded", o); }));
  const sv = new URLSearchParams(location.search).get("service"), sel = $("#s");
  if (sv && sel) { const o = $$("option", sel).find(x => x.dataset.slug === sv); if (o) sel.value = o.value; }
  $$("[data-quiz]").forEach(b => b.addEventListener("click", () => {
    $$("[data-quiz]").forEach(x => x.setAttribute("aria-pressed", x === b));
    $$(".qp").forEach((p, i) => p.classList.toggle("on", i == b.dataset.quiz));
  }));
  const cw = $(".cubew");
  if (cw && matchMedia("(pointer:fine)").matches) addEventListener("pointermove", e => {
    cw.style.setProperty("--cy", ((e.clientX / innerWidth - .5) * 24) + "deg");
    cw.style.setProperty("--cx", ((.5 - e.clientY / innerHeight) * 16) + "deg");
  });
})();
