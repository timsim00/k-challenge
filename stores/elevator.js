module.exports = store

function store (state, emitter) {
  state.elevator = {
    elevators: [],
    floors: [],
    requests: []
  }

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
          destination_floor: 1,
          occupied: false  //false if doors close and no destination floor is requested.
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
      /*
      This logic needs to implement #7, to send the correct elevator:
      When an elevator request is made, the unoccupied elevator closest to it will answer the
      call, unless an occupied elevator is moving and will pass that floor on its way. The
      exception is that if an unoccupied elevator is already stopped at that floor, then it will
      always have the highest priority answering that call.
      */
      
    })

    emitter.on('elevator:go', function (data) {
      /*
      This logic will update elevators[i] state (direction, destination_floor, closest_floor, tripCnt)
      Displaying the current elevator state is trivial at this point.
      */
    })

  })
}
