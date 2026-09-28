/* =========================================================
   LALITH — script.js
   Vanilla JS, zero dependencies. Four small modules:
   0. Theme toggle (light ↔ JARVIS), persisted to localStorage
   1. Scroll reveal (IntersectionObserver)
   2. Active nav link on scroll (IntersectionObserver)
   3. JARVIS status ticker (types the status feed values)
   Every feature degrades gracefully: if JS is off, all
   content is already present in the HTML.
   ========================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 0. Theme toggle (light ↔ JARVIS) ---------- */

  var THEME_KEY = "lalith-theme";
  var themeToggle = document.querySelector(".theme-toggle");

  if (themeToggle) {
    var initialDark = document.documentElement.getAttribute("data-theme") === "jarvis";
    themeToggle.setAttribute("aria-checked", initialDark ? "true" : "false");

    themeToggle.addEventListener("click", function () {
      var isDark = document.documentElement.getAttribute("data-theme") === "jarvis";
      setTheme(isDark ? "light" : "jarvis");
    });
  }

  function setTheme(theme) {
    if (theme === "jarvis") {
      document.documentElement.setAttribute("data-theme", "jarvis");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-checked", theme === "jarvis" ? "true" : "false");
    }
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  /* ---------- 1. Scroll reveal ---------- */

  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---------- 2. Active nav link on scroll ---------- */

  var navLinks = document.querySelectorAll(".nav-links a");
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var isActive = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("is-active", isActive);
          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, { rootMargin: "-35% 0px -60% 0px" });

    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* ---------- 3. JARVIS status ticker ---------- */

  var rows = Array.prototype.slice.call(document.querySelectorAll("[data-tick]"));
  var TYPE_MS = 40;

  if (reduceMotion || !rows.length) {
    return; // values are already in the HTML
  }

  var rowIndex = 0;

  function typeRow(row, done) {
    var text = row.getAttribute("data-tick");
    var i = 0;

    row.textContent = "";

    function step() {
      if (i < text.length) {
        row.textContent = text.slice(0, i + 1) + "\u25AE"; // block cursor while typing
        i += 1;
        setTimeout(step, TYPE_MS);
      } else {
        row.textContent = text;
        done();
      }
    }

    step();
  }

  function typeNext() {
    if (rowIndex < rows.length) {
      typeRow(rows[rowIndex], typeNext);
      rowIndex += 1;
    } else {
      scheduleCycle();
    }
  }

  // STATUS row keeps cycling through suits-up states.
  var statusRow = document.querySelector("[data-cycle]");
  var cycleValues = statusRow ? statusRow.getAttribute("data-cycle").split("|") : [];
  var cycleIndex = 0;

  function scheduleCycle() {
    if (!statusRow || cycleValues.length < 2) return;

    setTimeout(function () {
      cycleIndex = (cycleIndex + 1) % cycleValues.length;
      statusRow.setAttribute("data-tick", cycleValues[cycleIndex]);
      typeRow(statusRow, scheduleCycle);
    }, 4200);
  }

  typeNext();
})();
