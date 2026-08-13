(function () {
  "use strict";
  if (document.querySelector(".course-family-nav")) return;
  const root = new URL("../", document.currentScript.src);
  const path = location.pathname.toLowerCase();
  const isHome = path === root.pathname.toLowerCase() || path.endsWith("/index.html");
  const nav = document.createElement("nav");
  nav.className = "course-family-nav screen-only";
  nav.setAttribute("aria-label", "Small Box course navigation");
  const inner = document.createElement("div"); inner.className = "course-family-nav__inner";
  const brand = document.createElement("a"); brand.className = "course-family-nav__brand"; brand.href = new URL("index.html", root).href; brand.innerHTML = '<span class="course-family-nav__mark" aria-hidden="true">SB</span><span>Small Box</span>';
  const links = document.createElement("div"); links.className = "course-family-nav__links";
  const items = [
    ["Course", "index.html", isHome], ["Modules", "index.html#course-map-title", /\/weeks\d+-\d+\//.test(path)],
    ["Video learning", "youtube-library/video-library.html", path.includes("/youtube-library/")], ["Busy Work", "https://stevencowell.github.io/busy-worksheets/?library=timber", false, true],
    ["My folio", "smallbox-folio.html", path.endsWith("/smallbox-folio.html")], ["Main Menu", "https://stevencowell.github.io/Main-Page/", false, true]
  ];
  items.forEach(([label, href, current, external]) => { const link = document.createElement("a"); link.textContent = label; link.href = external ? href : new URL(href, root).href; if (current) link.setAttribute("aria-current", "page"); links.append(link); });
  inner.append(brand, links); nav.append(inner); document.body.prepend(nav); document.documentElement.classList.add("has-course-family-nav");
})();
