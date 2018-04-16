var html = require('choo/html')
const css = require('sheetify')

var TITLE = 'k-challenge - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
        <section class="fl mw6 w-50-m w-third-l pa3">
          <h2>Initialize Elavator</h2>
          ${initElevators()}

          <p>
            Call Elevator
            ${showFloors()}
          </p>

          <p>
            Set Destination Floor
            ${goToFloor()}
          </p>

          <br>
        </section>

        <section class="fl mw6 w-50-m w-third-l pa3">
          <h2>Elevator Simulation</h2>

          ${showElevators()}

          <br>
        </section>

      </main>
    </body>
  `

  function initElevators() {
    var disabledButton = css`
      .button-disabled {
        opacity: 0.65;
        cursor: not-allowed;
      }
    `
    let isDisabled = state.elevator.elevators && state.elevator.elevators.length < 0
    let btnState = isDisabled ? 'button-disabled bg-gray' : 'bg-blue pointer'
    return html`
    <div class="measure pb3 ${disabledButton}">
      <p>
        <label for="elevatorCount" class="f6 b db mb2">Number of Elevators</label>
        <input id="elevatorCount" type="number" value="1" min="1" class="ba b--black-20 pa2 mb2 db" />
      </p>
      <p>
        <label for="floorCount" class="f6 b db mb2">Number of Floors</label>
        <input id="floorCount" type="number" value="1" min="1" class="ba b--black-20 pa2 mb2 db" />
      </p>
      <button id="btnStart" disabled=${isDisabled} onclick=${onStart} class="${btnState} avenir f5 link dim br2 ph3 pv2 mb2 dib white ml3-ns">
        Initalize Elevators
      </button>

    </div>
    `

    function onStart () {
      let elevatorCount = document.getElementById('elevatorCount').value
      let floorCount = document.getElementById('floorCount').value
      emit('elevator:init', {elevatorCount, floorCount})
    }
  }

  function showFloors () {

    function oneFloor(item) {
      return html`
      <div>
        <button id="btnFloor${item.id}" data-id=${item.id} data-direction="UP" onclick=${onFloorCall} class="avenir f5 link dim br2 ph3 pv2 mb2 dib ml3-ns">
          ${item.name} [UP]
        </button>
        <button id="btnFloor${item.id}" data-id=${item.id} data-direction="DOWN" onclick=${onFloorCall} class="avenir f5 link dim br2 ph3 pv2 mb2 dib ml3-ns">
          ${item.name} [DOWN]
        </button>
      </div>
      `
    }

    var items = state.elevator.floors || []
    var nodes = items
      .map((item) => {
        return oneFloor(item)
      })

    return html`
    <ul>
      ${nodes}
    </ul>
    `

    function onFloorCall(e) {
      let data = e.target.dataset
      emit('elevator:call', data)
    }
  }

  function showElevators () {

    function oneElevator(item) {
      return html`
      <li>${item.name}</li>
      `
    }

    var items = state.elevator.elevators || []
    var nodes = items
      .map((item) => {
        return oneElevator(item)
      })

    return html`
    <ul>
      ${nodes}
    </ul>
    `
  }

  function goToFloor () {
    return html`
    <div class="measure pb3">
      <p>
        <label for="floorDest" class="f6 b db mb2">Destination Floor</label>
        <input id="floorDest" type="number" value="1" min="1" class="ba b--black-20 pa2 mb2 db" />
      </p>
      <button id="btnDest" onclick=${onDest} class="bg-blue pointer avenir f5 link dim br2 ph3 pv2 mb2 dib white ml3-ns">
        Go
      </button>

    </div>
    `

    function onDest(e) {
      let dest = document.getElementById('floorDest').value
      elevatorId = 1 //need a way to determine which elevator answered the request.
      emit('elevator:go', {dest, elevatorId})
    }
  }


}
