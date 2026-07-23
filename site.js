(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  var revealItems = document.querySelectorAll(".page-title, .page-lead, .section, .contact-grid, .media-grid, .stack-list");

  if (!reduceMotion && "IntersectionObserver" in window) {
    root.classList.add("has-site-motion");
    revealItems.forEach(function (item, index) {
      item.classList.add("site-reveal");
      item.style.setProperty("--reveal-delay", Math.min(index * 55, 220) + "ms");
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5%" });

    revealItems.forEach(function (item) { observer.observe(item); });
  }

  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".card, .media-card, .stack-item, .interest, .contact-list li, .form").forEach(function (card) {
      card.classList.add("interactive-card");
      card.addEventListener("pointermove", function (event) {
        var rect = card.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--card-x", (x * 3).toFixed(2) + "deg");
        card.style.setProperty("--card-y", (y * -3).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--card-x", "0deg");
        card.style.setProperty("--card-y", "0deg");
      });
    });
  }

  // Ticker Interactivity: Pause auto-scrolling on touch/hover so visitors can easily select & click items
  var tickerContainers = document.querySelectorAll(".news-ticker-wrapper, .published-marquee-container, .auto-scroll-track-wrapper");
  tickerContainers.forEach(function (container) {
    var track = container.querySelector(".news-ticker-track, .published-marquee-track, .auto-scroll-track");
    if (!track) return;

    var pauseTrack = function () {
      track.style.animationPlayState = "paused";
    };
    var resumeTrack = function () {
      track.style.animationPlayState = "running";
    };

    container.addEventListener("mouseenter", pauseTrack);
    container.addEventListener("mouseleave", resumeTrack);
    container.addEventListener("touchstart", pauseTrack, { passive: true });
    container.addEventListener("focusin", pauseTrack);
    container.addEventListener("focusout", resumeTrack);
  });
})();
