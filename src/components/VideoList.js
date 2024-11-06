import React, { useState, useEffect } from "react";
import { Col, Row, Modal, Button, CloseButton } from "react-bootstrap";
import VideoCard from "./VideoCard";
import Filter from "./Filter";
import "./VideoList.scss";

const VideoList = ({ videos }) => {
  // State for modals and selected video
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // State for filters
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTime, setSelectedTime] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const openFirstModal = (video) => {
    setSelectedVideo(video);
    setShowFirstModal(true);
  };

  const closeFirstModal = () => {
    setShowFirstModal(false);
  };

  const openSecondModal = () => {
    setShowFirstModal(false);
    setShowSecondModal(true);
  };

  const closeSecondModal = () => {
    setShowSecondModal(false);
  };

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    if (type === "categories") {
      setSelectedCategories((prev) =>
        prev.includes(value)
          ? prev.filter((cat) => cat !== value)
          : [...prev, value]
      );
    } else if (type === "time") {
      setSelectedTime(value);
    } else if (type === "language") {
      setSelectedLanguage(value);
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedTime("all");
    setSelectedLanguage("all");
  };

  // Filter videos based on selected filters
  useEffect(() => {
    let filtered = videos;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((video) =>
        selectedCategories.includes(video.category)
      );
    }

    if (selectedTime !== "all") {
      filtered = filtered.filter((video) => {
        const videoLength = parseInt(video.length.split(":")[0], 10);
        if (selectedTime === "5") return videoLength <= 5;
        if (selectedTime === "10") return videoLength <= 10;
        if (selectedTime === "20") return videoLength <= 20;
        if (selectedTime === "more") return videoLength > 20;
        return true;
      });
    }

    if (selectedLanguage !== "all") {
      filtered = filtered.filter(
        (video) => video.language === selectedLanguage
      );
    }

    setFilteredVideos(filtered);
  }, [videos, selectedCategories, selectedTime, selectedLanguage]);

  const categories = [
    { value: "music", label: "Musik" },
    { value: "yoga", label: "Yoga" },
    { value: "relax", label: "Avspänning" },
    { value: "meditation", label: "Meditation" },
  ];

  const languages = [
    { value: "sv", label: "Svenska" },
    { value: "en", label: "Engelska" },
  ];

  return (
    <div>
      <div className="mb-5 intro">
        <h1>Videotips</h1>
        <p>Behöver du en paus? Här kan du filtrera fram den typ av återhämtning som passar dig just nu. Relax!</p>
      </div>
      <Filter
        categories={categories}
        languages={languages}
        selectedCategories={selectedCategories}
        selectedTime={selectedTime}
        selectedLanguage={selectedLanguage}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {filteredVideos.length===0?(<p className="text-warning mt-4 fw-medium fs-5">Inga matchande viedeor hittades. Justera filtren!</p>):(
      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        {filteredVideos.map((video) => (
          <Col key={video.id}>
            <VideoCard video={video} onClick={() => openFirstModal(video)} />
          </Col>
        ))}
      </Row>)}

      {/* backdrop makes click outside modal, close modal */}
      <Modal
        show={showFirstModal}
        onHide={closeFirstModal}
        backdrop={true}
        keyboard={true}
      >
        <Modal.Header>
          <Modal.Title>{selectedVideo?.title}</Modal.Title>
          <CloseButton
            onClick={closeFirstModal}
            variant="white"
            className="button-focus"
          />
        </Modal.Header>
        <Modal.Body>
          <p>Längd: {selectedVideo?.length}</p>
          <p>Beskrivning: {selectedVideo?.description}</p>
          <Button onClick={openSecondModal} className="button-focus">
            Se video
          </Button>
        </Modal.Body>
      </Modal>

      <Modal
        show={showSecondModal}
        onHide={closeSecondModal}
        size="lg"
        centered
        backdrop={true}
        keyboard={true}
      >
        <Modal.Header>
          <Modal.Title>{selectedVideo?.title}</Modal.Title>
          <CloseButton
            onClick={closeSecondModal}
            variant="white"
            className="button-focus"
          />
        </Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            height="500"
            src={selectedVideo?.link.replace("watch?v=", "embed/")}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`Videospelare för ${selectedVideo?.title}`}
          ></iframe>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VideoList;
