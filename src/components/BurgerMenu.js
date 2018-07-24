import React from 'react'
import Bars from 'react-icons/lib/fa/bars'

const BurgerMenu = (props) => {
  return (
    <a
      onClick={() => props.onMenuClick()}
      className='burger-menu'>
      <Bars/>
    </a>
  )
}

export default BurgerMenu
