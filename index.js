const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
var Raphael = require('raphael')
const findDOMNode = require('react-dom').findDOMNode

module.exports = MenuDroppoComponent


inherits(MenuDroppoComponent, Component)
function MenuDroppoComponent() {
  Component.call(this)
}

MenuDroppoComponent.prototype.render = function() {
  const isOpen = this.props.isOpen
  const speed = this.props.speed || '300ms'

  const message = isOpen ? 'Open' : 'Closed'

  this.manageListeners()

  return (
    h('.menu-droppo', {
      style: {
        position: 'absolute',
        overflow: 'hidden',
      },
    },

    h('.menu-droppo-slidey-bit', {
      style: {
        transition: `transform ${speed} ease-in-out`,
        transform:  `translateY(${ isOpen ? 0 : -100 }%)`,
        zIndex: this.props.zIndex || '1',
        position: 'relative',
      },
    }, [ this.props.children ])
    )
  )
}

MenuDroppoComponent.prototype.manageListeners = function() {
  const isOpen = this.props.isOpen
  const onClickOutside = this.props.onClickOutside

  if (isOpen) {
    this.outsideClickHandler = onClickOutside
  } else if (isOpen) {
    this.outsideClickHandler = null
  }
}

MenuDroppoComponent.prototype.componentDidMount = function() {
  window.addEventListener('click', this.windowWasClicked.bind(this))
  var container = findDOMNode(this)
  this.container = container
}

MenuDroppoComponent.prototype.componentWillUnmount = function() {
  window.removeEventListener('click', this.windowWasClicked.bind(this))
}

MenuDroppoComponent.prototype.windowWasClicked = function(event) {
  const target = event.target
  const container = findDOMNode(this)
  const isOpen = this.props.isOpen

  if (target !== container && !isDescendant(this.container, event.target)) {
    this.outsideClickHandler(event)
  }
}

function isDescendant(parent, child) {
   var node = child.parentNode;
   while (node != null) {
     if (node == parent) {
       return true;
     }
     node = node.parentNode;
   }
   return false;
}

