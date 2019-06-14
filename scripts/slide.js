class Slider {
    constructor({ $el : $elWrap, interval = 4000 , slides}) {
        this.$elWrap = $elWrap
        this.slides = slides
        this.length = slides.length;
        this.index = 1;
        this.interval = interval;
        this.rander()
        this.move()
    }
    rander() {
        this.$elWrap.innerHTML = `<ul class="slide-content"></ul> `
        this.$el = this.$elWrap.firstElementChild
        this.$el.style.width = `${this.length *  100}%`
        this.$el.innerHTML = this.slides.map((slide) => {
            return `<li class="slide-item"><img src="${slide.picUrl}" alt=""></li>`
        }).join("")
    }
    move() {
        setInterval(() => {
            if (this.index === this.length) {
                this.index = 0;
            }
            this.$el.style.transform = `translate(-${this.index++ / this.length * 100}%)`
        }, this.interval)
    }
}