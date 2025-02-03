import React from 'react'

const Logo = ({width = "100px" , className}) => {
  return (
    <div className={`${width} ${className}`}>
      <img src="" alt="Logo for the site" />
    </div>
  )
}

export default Logo;