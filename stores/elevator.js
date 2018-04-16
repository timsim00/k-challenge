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

      //initialize elevators
      s.elevators = []
      for (let i = 0; i < data.elevatorCount; i++) {
        s.elevators.push({
          name: `Elevator ${i}`,
          id: i,
          tripCnt: 0,
          location: 1
        })
      }
      //initialize floors
      s.floors = []
      for (let i = 0; i < data.floorCount; i++) {
        s.floors.push({
          name: `Floor ${i+1}`,
          id: i+1,
          location: 1
        })
      }
      emitter.emit('render')
    })

  })
}
