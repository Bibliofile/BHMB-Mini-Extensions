(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@bhmb/bot')) :
  typeof define === 'function' && define.amd ? define(['@bhmb/bot'], factory) :
  (factory(global['@bhmb/bot']));
}(this, (function (bot) { 'use strict';
  const MessageBot = bot.MessageBot

  const page = `
    <template>
      <div class="box">
        <div class="columns">
          <div class="column is-narrow">
            <p class="has-text-weight-bold">Message</p>
          </div>
          <div class="column">
            <textarea class="textarea is-small is-fluid" data-target="message"></textarea>
          </div>
          <div class="column is-narrow">
            <button class="button is-small is-danger is-outlined" data-do="delete">Delete</button>
          </div>
        </div>
      </div>
    </template>
    <div class="container is-widescreen">
      <section class="section is-small">
        <span class="button is-primary is-adding-message">+</span>
        <h3 class="title is-4">Message of the day</h3>
        <ul>
          <li>These messages will be sent at most once per day per player when a player joins the world.</li>
          <li>If you have more than one message, the first one will be sent the first time they join, the second the next... etc.</li>
          <li>{{NAME}}, {{Name}}, and {{name}} in the message will be replaced with the user's name.</li>
        </ul>
      </section>
      <div class="messages-container"></div>
    </div>
  `

  MessageBot.registerExtension('bibliofile/motd', (ex, world) => {
    window.motd = ex
    const getDate = () => new Date().toDateString()
    let lastDay = ex.storage.get('day', getDate())
    function onJoin(player) {
      // Reset joins?
      if (lastDay !== getDate()) { ex.storage.set('players', {}) }
      lastDay = getDate()

      const joins = ex.storage.get('players', {})[player.name] || 0
      ex.storage.with('players', {}, p => { p[player.name] = joins + 1 })
      const messages = ex.storage.get('messages', [])
      if (joins >= messages.length) return

      ex.bot.send(messages[joins].message, { name: player.name })
    }
    world.onJoin.sub(onJoin)

    ex.remove = () => world.onJoin.unsub(onJoin)

    const ui = ex.bot.getExports('ui')
    if (!ui) return

    const tab = ui.addTab('MOTD', 'messages')
    tab.innerHTML = page
    const template = tab.querySelector('template')
    const root = tab.querySelector('.messages-container')

    function addMessage(msg = { message: '' }) {
      ui.buildTemplate(template, root, [ { selector: '[data-target=message]', value: msg.message }])
    }
    ex.storage.get('messages', []).forEach(addMessage)
    tab.querySelector('.is-adding-message').addEventListener('click', () => addMessage())
    tab.addEventListener('click', event => {
      const target = event.target
      if (target.matches('[data-do=delete]')) {
        target.parentElement.parentElement.parentElement.remove()
        save()
      }
    })
    tab.addEventListener('input', save)

    function save() {
      const messages = Array.from(root.querySelectorAll('[data-target=message]'))
        .map(el => ({ message: el.value }))
      ex.storage.set('messages', messages)
    }

    ex.remove = () => {
      ui.removeTab(tab)
      world.onJoin.unsub(onJoin)
    }
  })
})))
