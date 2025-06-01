// Lazy loading for images with Intersection Observer fallback,
// now with <picture> element and data-srcset support.
export function initLazyLoading() {
    // Check for native lazy loading support for the <img> element itself
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported for <img>
        // Handle images (both standalone and within <picture>)
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            // If the img has data-src, set it
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }

            // Check if this img is inside a <picture> element
            const parentPicture = img.parentElement;
            if (parentPicture && parentPicture.tagName === 'PICTURE') {
                const sources = parentPicture.querySelectorAll('source[data-srcset]');
                sources.forEach(source => {
                    source.srcset = source.dataset.srcset;
                    source.removeAttribute('data-srcset');
                });
            }
        });
    } else {
        // Fallback to Intersection Observer for browsers that don't support native lazy loading
        // Target <img> elements for observation, whether standalone or in <picture>
        // Query for <img> tags that are either standalone with data-src or direct children of <picture>
        const lazyImages = document.querySelectorAll('img[data-src]:not(picture img), picture > img');
        if (lazyImages.length === 0) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const parentPicture = img.parentElement;

                    // If inside a <picture> element, update its <source> siblings first
                    if (parentPicture && parentPicture.tagName === 'PICTURE') {
                        const sources = parentPicture.querySelectorAll('source[data-srcset]');
                        sources.forEach(source => {
                            if (source.dataset.srcset) {
                                source.srcset = source.dataset.srcset;
                                source.removeAttribute('data-srcset');
                            }
                        });
                    }

                    // Set the src for the <img> tag itself from data-src
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }

                    // Optional: remove 'loading' attribute if it was part of a convention
                    // if (img.hasAttribute('loading')) {
                    //     img.removeAttribute('loading');
                    // }
                    observer.unobserve(img); // Stop observing the image once loaded
                }
            });
        }, {
            rootMargin: '0px 0px 50px 0px', // Start loading images 50px before they enter the viewport
            threshold: 0.01
        });

        lazyImages.forEach(img => {
            // Ensure we're observing the <img> tag
            imageObserver.observe(img);
        });
    }
}
