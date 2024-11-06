import React from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import relax_small from '../images/relaxing_384.webp'; 
import relax_big from '../images/relaxing_512.webp'; 

function Home() {
  return (
    <div>
      <Container>
        <Row className="align-items-center gap-3">
          <Col xs={12} md={6} className="text-center">
            <picture>
              <source srcSet={relax_big} media="(min-width: 1200px)" />
              <img
                src={relax_small}
                alt="Avlsappnad figur med lotusblomma i knäet"
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
              <h1>Relaxguiden &ndash; en paus i vardagen</h1>
              <p>
                Känner du dig stressad eller behöver en paus? Med Relaxguiden
                kan du enkelt hitta utvalda YouTube-klipp som hjälper dig att
                slappna av, oavsett om du vill meditera, lyssna på lugnande
                musik eller bara ta en kort paus. Filtrera klippen efter tid,
                språk och kategori för att hitta det som passar dig bäst.
              </p>
              <Link to="/videotips" className="btn btn-primary">
                Utforska våra videotips →
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
