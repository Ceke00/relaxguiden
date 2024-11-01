import Home from "./components/Home";
import About from "./components/About";
import VideoList from "./components/VideoList";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";
import { Container } from "react-bootstrap";
import NavMenu from "./components/NavMenu";

import "./custom.scss";

function App() {
  return (
    <Router>
      <NavMenu />

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/videolist" element={<VideoList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
