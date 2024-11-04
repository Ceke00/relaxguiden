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
import videoData from "./data/videos.json";

function App() {

  return (
    <Router>
      <NavMenu />

      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/videolist" element={<VideoList videos={videoData.videos} />} />
         
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
