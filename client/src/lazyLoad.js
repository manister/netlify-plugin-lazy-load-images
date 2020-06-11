document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = [...document.querySelectorAll("[data-lazy-src], [data-lazy-srcset]")];
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          if (lazyImage.dataset.lazySrc) {
            lazyImage.src = lazyImage.dataset.lazySrc;
            lazyImage.removeAttribute("lazy-src");
          }
          if (lazyImage.dataset.lazySrcset) {
            lazyImage.srcset = lazyImage.dataset.lazySrcset;
            lazyImage.removeAttribute("lazy-srcset");
          }
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    lazyImages.forEach(function (lazyImage) {
      //instantly replace
      lazyImage.src = lazyImage.dataset.lazySrc;
      lazyImage.removeAttribute("lazy-src");
    })
  }
});