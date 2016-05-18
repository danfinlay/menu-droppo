const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
var Raphael = require('raphael')

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
        transition: `transform ${speed} ease-in-out`,
        transform:  `translateY(${ isOpen ? 0 : -100 }%)`,
        zIndex: this.props.zIndex || '-1',
        position: 'relative',
      },
    }, [ this.props.children ])
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
