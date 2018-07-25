import React from 'react'
import Bars from 'react-icons/lib/fa/bars'

const BurgerMenu = (props) => {
  let className = 'burger-menu no-focus-outline'
  props.isTabPressed && (className = 'burger-menu')

  return (
    <button
      onClick={() => props.onMenuClick()}
      className={className}>
      <Bars/>
    </button>
  )
}

export default BurgerMenu
