import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import meditation_small from "../images/meditation_384.webp";
import meditation_big from "../images/meditation_512.webp";
import { Helmet } from "react-helmet";

function About() {
  return (
    <>
      <Helmet>
        <title>Om Relaxguiden | Vi hjälper dig att må bra</title>
        <meta
          name="description"
          content="Vi vill hjälpa dig att hitta rätt avslappningsövningar så att du kan varva ner i vardagen. Relaxguiden är en gratis resurs som filtrerar utvalda YouTube-videor efter kategori, längd och språk."
        />
        <meta
          property="og:title"
          content="Om Relaxguiden | Vi hjälper dig att må bra"
        />
        <meta
          property="og:description"
          content="Vi vill hjälpa dig att hitta rätt avslappningsövningar så att du kan varva ner i vardagen. Relaxguiden är en gratis resurs som filtrerar utvalda YouTube-videor efter kategori, längd och språk."
        />
        <meta
          property="og:image"
          content="https://relaxguiden.vercel.app/og-image.jpg"
        />
        <link rel="canonical" href="https://relaxguiden.vercel.app/about" />
      </Helmet>
      <Container id="main-content" tabIndex="-1">
        <Row className="align-items-center gap-3">
          <Col xs={12} md={6} className="text-center">
            <picture>
              <source srcSet={meditation_big} media="(min-width: 1200px)" />
              <img
                src={meditation_small}
                alt="Figur mediterar bredvid lotusblomma"
                className="img-fluid"
              />
            </picture>
          </Col>
          <Col
            xs={12}
            md={5}
            className="d-flex justify-content-center align-items-center"
          >
            <div>
              <h1>Om Relaxguiden</h1>
              <p>
                Syftet med Relaxguiden är att göra det enkelt att hitta bra
                videor för återhämtning. I en stressig vardag är det viktigt att
                kunna ta en paus och slappna av för att förbättra både mental
                och fysisk hälsa.
              </p>
              <p>
                Med Relaxguiden kan du enkelt filtrera och hitta gratis
                YouTube-klipp som hjälper dig att varva ner, oavsett om du vill
                meditera, lyssna på lugnande musik eller bara ta en kort paus.
                Att prioritera avkoppling är avgörande för att må bra och
                hantera livets utmaningar på ett balanserat sätt.{" "}
              </p>
              <Link to="/videotips" className="btn btn-primary">
                Utforska våra videotips →
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default About;
