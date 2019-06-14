class Loading {
    constructor() {
        this.$el = document.querySelector('.loading')
    }
    show() {
        this.$el.style.display = 'flex'
    }   
    hide() {
        this.$el.style.display = 'none'
    }
}