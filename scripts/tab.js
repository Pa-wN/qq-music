function initTab({link : $links, view : $view}) {
    var currentEl = $links.firstElementChild
    $links.addEventListener('click',(event) => {
        if (event.target === currentEl) return;
        event.target.classList.add('active');
        $view.querySelector(`[data-view = '${event.target.dataset.to}']`).classList.add('show')
        currentEl.classList.remove('active');
        $view.querySelector(`[data-view = '${currentEl.dataset.to}']`).classList.remove('show')
        currentEl = event.target;
    })
    
}