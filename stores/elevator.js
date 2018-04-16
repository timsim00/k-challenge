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
          current_floor: 1,
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

      let alreadyThere = floorHasElevator(data.id)
      if (alreadyThere) {
        //use alreadyThere.id for this service request
      } else {
        let approaching = approachingElevator(data)
        if (approaching) {
          //use approaching.id for this service request
        } else {
          let closest = findClosest(data.id)
          //use closest.id for this service request
        }
      }
    })

    emitter.on('elevator:go', function (data) {
      /*
      This logic will update elevators[i] state (direction, destination_floor, current_floor, tripCnt)
      Displaying the current elevator state is trivial at this point.
      */

      if (state.elevator.elevators[data.elevatorId].tripCnt > 100) {
        emitter.emit('elevator:maintain', data.elevatorId)
      }
    })

  })

  function floorHasElevator (id) {
    // map.filter through elevators:
    // is there an elevator stopped at this floor? if so, return it, else return null.
  }

  function approachingElevator (data) {
    // data = {id, direction}
    // iterate through elevators:
    // is there an approaching elevator? if so, return it, else return null.
  }

  function findClosest (id) {
    // iterate through elevators:
    // find the closest, unoccupied elevator.
  }

}
