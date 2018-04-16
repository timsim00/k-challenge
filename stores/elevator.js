module.exports = store

function store (state, emitter) {
  state.elevator = {list: []}

  emitter.on('DOMContentLoaded', function () {

    emitter.on('elevator:init', function (data) {
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
          location: 1,
          direction: 'none',
          closest_floor: 1,
          destination_floor: 1
        })
      }
      //initialize floors
      s.floors = []
      for (let i = 0; i < data.floorCount; i++) {
        s.floors.push({
          name: `Floor ${i+1}`,
          id: i+1,
          location: 1,
          request_up: false,
          request_down: false
        })
      }
      emitter.emit('render')
    })

    emitter.on('elevator:call', function (data) {

    })

    emitter.on('elevator:go', function (data) {

    })

  })
}
