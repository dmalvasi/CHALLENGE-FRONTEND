import React from 'react'
import {Link} from 'react-router-dom'

const Error404 = (props) => {
  return (
    <div>
      <h1>La pagina no existe</h1>
      <Link to='/'>Home</Link>
    </div>
  )
}

export default Error404;