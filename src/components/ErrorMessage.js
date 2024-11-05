import React from 'react'
import { Link } from 'react-router-dom'

function ErrorMessage() {
  return (
    <div>
      <h1>Ooops!</h1>
      <p>Något blev fel. Prova igen med <Link to="/">Relaxguidens startsida.</Link></p>
    </div>
  )
}

export default ErrorMessage
