import React, { CSSProperties } from 'react'
import './Button.css'

const Button = ({type = "contained", children}) => {
  return <div className={`custom-btn custom-btn-${type}`}>{children}</div>
}

export default Button