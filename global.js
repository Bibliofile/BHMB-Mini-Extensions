(function (global, factory) {
  factory(global['@bhmb/bot'], global)
}(this, (function (bot, global) { 'use strict';
  const MessageBot = bot.MessageBot
  MessageBot.registerExtension('bibliofile/global', ex => {
    global.bot = ex.bot;
    global.ex = ex;
    ex.remove = () => {
      delete global.bot;
      delete global.ex;
    }
  })
})))
