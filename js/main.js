/* ===========================================================
   ParkTracker — Interactions & animations
   JS natif, sans dépendances
   =========================================================== */
(function () {
  "use strict";

  /* ---------- Header qui se fond au scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  /* ---------- Apparitions au scroll (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---------- Parallax léger sur le hero ---------- */
  var phone = document.querySelector("[data-parallax]");
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (phone && !reduceMotion) {
    var ticking = false;
    // Parallax au scroll
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            var y = window.scrollY;
            if (y < 900) {
              phone.style.transform =
                "translateY(" + y * -0.06 + "px) rotateX(" +
                Math.min(y * 0.01, 6) + "deg)";
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    // Légère inclinaison au mouvement de souris (desktop)
    var hero = document.querySelector(".hero");
    if (hero && window.matchMedia("(pointer:fine)").matches) {
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect();
        var cx = (e.clientX - r.left) / r.width - 0.5;
        var cy = (e.clientY - r.top) / r.height - 0.5;
        phone.style.transform =
          "rotateY(" + cx * 8 + "deg) rotateX(" + cy * -8 + "deg)";
      });
      hero.addEventListener("mouseleave", function () {
        phone.style.transform = "";
      });
    }
  }

  /* ---------- FAQ accordéon ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      // Ferme les autres
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          var oa = other.querySelector(".faq-a");
          if (oa) oa.style.maxHeight = null;
          var oq = other.querySelector(".faq-q");
          if (oq) oq.setAttribute("aria-expanded", "false");
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        a.style.maxHeight = null;
        q.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Année dynamique dans le footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
