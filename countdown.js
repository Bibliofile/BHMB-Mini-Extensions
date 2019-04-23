// Updated version of Jemni's countdown extension originally for the MB 5

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@bhmb/bot')) :
  typeof define === 'function' && define.amd ? define(['@bhmb/bot'], factory) :
  (factory(global['@bhmb/bot']));
}(this, (function (bot) { 'use strict';
  const MessageBot = bot.MessageBot

  MessageBot.registerExtension('bibliofile/countdown', (ex, world) => {
    // Countdown, one per server
    let countdownId = null

    const tick = left => {
      countdownId = setTimeout(() => {
        if (left <= 0) {
          countdownId = null
          ex.bot.send('>>> GO <<<')
        } else {
          ex.bot.send('>>> ' + left)
          tick(left - 1)
        }
      }, 5000)
    }

    world.addCommand('count', (_player, args) => {
      let times = parseInt(args, 10)
      times = times > 0 && times < 11 ? times : 3
      if (countdownId) return // already running
      ex.bot.send('Get ready!')
      tick(times)
    })
    
    world.addCommand('reset', player => {
      clearTimeout(countdownId)
      countdownId = null
    })

    // Timer, per user
    const timers = {}

    world.addCommand('timer', (player, args) => {
      if (timers[player.name]) return // Already running
      ex.bot.send(`Started {{Name}}'s timer`, { name: player.name })
      timers[player.name] = Date.now()
    })

    world.addCommand('done', player => {
      if (!timers[player.name]) return // Not started
      const timerStart = timers[player.name]
      delete timers[player.name]

      let seconds = Math.floor((Date.now() - timerStart) / 1000)
      const minutes = Math.floor(seconds / 60)
      seconds = seconds - minutes * 60
      seconds = seconds < 10 ? '0' + seconds : seconds

      ex.bot.send(`Stopped {{Name}}'s timer at: {{time}}`, {
        name: player.name,
        time: `${minutes}:${seconds}`
      })
    })

    ex.remove = () => {
      ['count', 'reset', 'timer', 'done'].forEach(command => world.removeCommand(command))
    }
  })
})))
