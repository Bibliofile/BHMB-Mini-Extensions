// For Jemni
window['@bhmb/bot'].MessageBot.registerExtension('bibliofile/scroll-down', ex => {
    console.log('Will always scroll down')
    const list = document.querySelector('#console .chat')
    const observer = new MutationObserver(() => {
        setTimeout(() => list.scrollTop = list.scrollHeight, 100)
    })

    observer.observe(list, { childList: true, subtree: true })

    ex.remove = () => observer.disconnect()
})
