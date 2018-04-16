module.exports = store

function store (state, emitter) {
  state.elevator = {list: []}

  emitter.on('DOMContentLoaded', function () {

    emitter.on('elevator:init', function (count) {
      //update some state
      emitter.emit('render')
    })

    emitter.on('elevator:start', function (count) {
      //update some state
      emitter.emit('render')
    })

  })
}
