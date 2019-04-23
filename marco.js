(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@bhmb/bot')) :
  typeof define === 'function' && define.amd ? define(['@bhmb/bot'], factory) :
  (factory(global['@bhmb/bot']));
}(this, (function (bot) { 'use strict';
  const MessageBot = bot.MessageBot
  MessageBot.registerExtension('bibliofile/marcopolo', function(ex, world) {
    world.addCommand('marco', function(player, args) {
      ex.bot.send('Polo!')
    })

    ex.remove = function() {
      world.removeCommand('marco')
    }
  })
})))
