(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@bhmb/bot')) :
    typeof define === 'function' && define.amd ? define(['@bhmb/bot'], factory) :
    (factory(global['@bhmb/bot']));
}(this, (function(bot) {
  'use strict';
  const MessageBot = bot.MessageBot

  function random(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  function roll(args) {
    args = args.trim();
    if (/^\d+$/.test(args)) {
      return Array.from({
          length: Math.min(parseInt(args, 10), 10)
        })
        .map(() => random(6))
        .join(", ");
    }

    if (/^\d+d\d+$/.test(args)) {
      const max = Math.min(+args.substr(args.indexOf("d") + 1), 10000);
      return Array.from({
          length: Math.min(parseInt(args, 10), 10)
        })
        .map(() => random(max + 1))
        .join(", ");
    }

    return random(6).toString();
  }

  MessageBot.registerExtension('bibliofile/dice', (ex, world) => {
    world.addCommand('roll', (player, args) => {
      ex.bot.send(`\u{1F3B2} ${player.name} rolled... ${roll(args)}`);
    });

    ex.remove = () => world.removeCommand('roll');
  });
})));
