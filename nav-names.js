window['@bhmb/bot'].MessageBot.registerExtension('bibliofile/nav-names', (ex, world) => {
    const create = (...cls) => {
        const el = document.createElement('div')
        el.classList.add(...cls)
        return el
    }

    const bar = document.querySelector('.navbar.is-primary')
    const menu = bar.appendChild(create('navbar-menu'))
    const end = menu.appendChild(create('navbar-end'))
    const playerContainer = end.appendChild(create('navbar-item'))

    const rebuildPlayerList = () => {
        console.log('Rebuild')
        while (playerContainer.firstChild) playerContainer.firstChild.remove()
        world.online.forEach(name => {
            const div = playerContainer.appendChild(create('player'))
            div.style.paddingLeft = '1em'
            div.textContent = name
            console.log('name', name)
        })
    }

    world.onJoin.sub(rebuildPlayerList)
    world.onLeave.sub(rebuildPlayerList)
    rebuildPlayerList()

    ex.remove = () => {
        world.onJoin.unsub(rebuildPlayerList)
        world.onLeave.unsub(rebuildPlayerList)
        menu.remove()
    }
})
