import Home from "./components/Home";
import About from "./components/About";
import VideoList from "./components/VideoList";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavMenu from "./components/NavMenu";
import "./custom.scss";
import videoData from "./data/videos.json";
import Footer from "./components/Footer";
import ErrorMessage from "./components/ErrorMessage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <NavMenu />

      <Container className="my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/videotips"
            element={<VideoList videos={videoData.videos} />}
          />
          <Route path="/*" element={<ErrorMessage />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
