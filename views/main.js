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

          <br>
        </section>

        <section class="fl mw6 w-50-m w-third-l pa3">
          <h2>Elevator Simulation</h2>

          <p>

          </p>

          <ul>
            <li>Elevator 1</li>
            <li>Elevator 2</li>
          </ul>

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
    let isDisabled = state.elevator.list && state.elevator.list.length < 0
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
      emit('elevator:start')
    }
  }


}
