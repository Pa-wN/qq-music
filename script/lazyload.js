export default function lazyLoad(images) {
    var imgs = Array.from(images)
    if ('IntersectionObserver' in window) {
        var observe = new IntersectionObserver(
            function (entries) {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        loadImg(entry.target)
                        observe.unobserve(entry.target)
                    }
                })
            }
        )
        imgs.forEach((img) => {
            observe.observe(img)
        })
    } else {
        throttleLazyloadFn = throttle(onScrollFn, 100);
        window.addEventListener('scroll', throttleLazyloadFn)
        window.dispatchEvent(new Event('scroll'))
    }

    function loadImg($el) {
        $el.src = $el.dataset.lazyload
    }
    function onScrollFn() {
        if (imgs.length === 0) {
            window.removeEventListener('scroll', throttleLazyloadFn)
        }
        imgs = imgs.filter((img) => {
            if (inViewport(img)) {
                loadImg(img)
                return false;
            }
            return true;
        })
    }
    function inViewport($el) {
        let wWidth = window.innerWidth
        let wHeight = window.innerHeight
        return (
            $el.getBoundingClientRect().top <= wHeight &&
            $el.getBoundingClientRect().bottom >= 0 &&
            $el.getBoundingClientRect().left <= wWidth &&
            $el.getBoundingClientRect().right >= 0
        )
    }
    function throttle(func, wait) {
        var prev, time
        return function fn() {
            var curr = Date.now()
            var diff = curr - prev
            if (!prev || diff >= wait) {
                func()
                prev = curr
            } else if (diff < wait) {
                clearTimeout(time)
                time = setTimeout(func, wait - diff)
            }
        }
    }
}
