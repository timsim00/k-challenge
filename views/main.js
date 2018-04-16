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

          ${showFloors()}

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
        Start Elevators
      </button>

    </div>
    `

    function onStart () {
      let elevatorCount = document.getElementById('elevatorCount').value
      let floorCount = document.getElementById('floorCount').value
      emit('elevator:start', {elevatorCount, floorCount})
    }
  }

  function showFloors () {

    function oneFloor(item) {
      return html`
      <div>
        <button id="btnFloor${item.id}" data-id=${item.id} data-direction="UP" onclick=${onFloorService} class="avenir f5 link dim br2 ph3 pv2 mb2 dib ml3-ns">
          ${item.name} -GO UP-
        </button>
        <button id="btnFloor${item.id}" data-id=${item.id} data-direction="DOWN" onclick=${onFloorService} class="avenir f5 link dim br2 ph3 pv2 mb2 dib ml3-ns">
          ${item.name} -GO DOWN-
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

    function onFloorService(e) {
      let data = e.target.dataset
      emit('elevator:floor-service', data)
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


}
