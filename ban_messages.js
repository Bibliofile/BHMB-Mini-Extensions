(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@bhmb/bot')) :
  typeof define === 'function' && define.amd ? define(['@bhmb/bot'], factory) :
  (factory(global['@bhmb/bot']));
}(this, (function (bot) { 'use strict';
  const MessageBot = bot.MessageBot
  
  MessageBot.registerExtension('bibliofile/ban_messages', (ex, world) => {
    function listener({ player, message }) {
      if (!message.toLocaleUpperCase().startsWith('/BAN ')) return
      const banned = message.substr(5)
      if (!player.isStaff) return
      if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(banned)) return
      ex.bot.send(`{{Name}} banned {{banned}}`, { name: player.name, banned })
    }

    world.onMessage.sub(listener)

    ex.remove = () => world.onMessage.unsub(listener)
  })
  
})))
