module.exports = store

function store (state, emitter) {
  state.elevator = {list: []}

  emitter.on('DOMContentLoaded', function () {

    emitter.on('elevator:start', function (data) {
      //update some state
      console.log('start ENTER', data)
      var s = state.elevator
      s.elevatorCount = data.elevatorCount
      s.floorCount = data.floorCount
      s.list = []
      for (let i = 0; i < data.elevatorCount; i++) {
        s.list.push({
          name: `Elevator ${i}`,
          id: i,
          tripCnt: 0
        })
      }
      emitter.emit('render')
    })

  })
}
