const render = require('react-dom').render
const h = require('react-hyperscript')

const DropMenu = require('./')

var body = document.querySelector('body')
const container = document.createElement('div')
body.appendChild(container)

let isOpen = false

function reRender() {
  render(
    h('section', {
      style: {
        margin: 0,
        padding: 0,
      }
    }, [
      h('div', {
        style: {
          background: 'blue',
        }
      }, h('button', {
          onClick(event) {
            event.preventDefault()
            event.stopPropagation()
            isOpen = !isOpen       // For example by toggling the `isOpen` property.
            reRender()
          },
        }, isOpen ? 'Close' : 'Open')
      ),
      h(DropMenu, {
        isOpen, // Dictates whether dropped down or not
        onClickOutside(event) {  // Handle click outside events yourself,
          isOpen = false // For example by toggling the `isOpen` property.
          reRender()
        },
      }, [
      h('ol', {
        style: {
          background: 'grey',
          margin: '0px',
          padding: '0px',
        }
      }, [
        h('li', 'Item one'),
        h('li', 'Item two'),
        h('li', 'Item three'),
      ]),
    ]),
    h('p', 'Click the button to show the menu!'),
  ]),
  container)
}

reRender()
