import React from 'react'
import { Link } from 'react-router-dom'
import "./ErrorMessage.scss"

function ErrorMessage() {
  return (
    <div>
      <h1>Ooops!</h1>
      <p>
        Något blev fel. Prova igen med{" "}
        <Link className="custom-link text-light link-offset-2" to="/">
          Relaxguidens startsida.
        </Link>
      </p>
    </div>
  );
}

export default ErrorMessage
