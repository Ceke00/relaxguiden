import React from "react";
import { Link } from "react-router-dom";
import "./ErrorMessage.scss";
import Helmet from "react-helmet";

function ErrorMessage() {
  return (
    <>
      <Helmet>
        <title>Felsida Relaxguiden</title>
      </Helmet>
      <h1>Ooops!</h1>
      <p>
        Något blev fel. Prova igen med{" "}
        <Link className="custom-link text-light link-offset-2" to="/">
          Relaxguidens startsida.
        </Link>
      </p>
    </>
  );
}

export default ErrorMessage;
