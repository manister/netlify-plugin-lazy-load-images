const initialiseLazyLoad = () => {
  const lazyImages: NodeListOf<HTMLImageElement | HTMLSourceElement> = document.querySelectorAll("[data-lazy-src], [data-lazy-srcset]")
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target as (HTMLImageElement | HTMLSourceElement);
          if (lazyImage.dataset.lazySrc) {
            lazyImage.src = lazyImage.dataset.lazySrc;
            lazyImage.removeAttribute("data-lazy-src");
          }
          if (lazyImage.dataset.lazySrcset) {
            lazyImage.srcset = lazyImage.dataset.lazySrcset;
            lazyImage.removeAttribute("data-lazy-srcset");
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
      if (lazyImage.dataset.lazySrc) {
        lazyImage.src = lazyImage.dataset.lazySrc;
      }
      lazyImage.removeAttribute("lazy-src");
    })
  }
}

export default initialiseLazyLoad