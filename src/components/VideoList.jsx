import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Button } from "react-bootstrap";
import * as Dialog from "@radix-ui/react-dialog";
import VideoCard from "./VideoCard";
import Filter from "./Filter";
import "./VideoList.scss";
import { Helmet } from "react-helmet";
import CloseIcon from "../icons/CloseIcon";

const VideoList = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTime, setSelectedTime] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const lastOpenerRef = useRef(null);

  const handleOpenInfo = (video) => (event) => {
    setSelectedVideo(video);
    lastOpenerRef.current = event.currentTarget;
    setShowInfoModal(true);
  };

  const openVideoModal = () => {
    setShowInfoModal(false);
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  // Return focus to last opener when modals close
  useEffect(() => {
    if (!showInfoModal && !showVideoModal && lastOpenerRef.current) {
      lastOpenerRef.current.focus();
    }
  }, [showInfoModal, showVideoModal]);

  // Filtering logic
  useEffect(() => {
    let filtered = videos;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((video) =>
        selectedCategories.includes(video.category)
      );
    }

    if (selectedTime !== "all") {
      filtered = filtered.filter((video) => {
        const [minutes, seconds] = video.length.split(":").map(Number);
        const total = minutes * 60 + seconds;

        if (selectedTime === "5") return total <= 5 * 60;
        if (selectedTime === "10") return total <= 10 * 60;
        if (selectedTime === "20") return total <= 20 * 60;
        if (selectedTime === "more") return total > 20 * 60;
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
    <>
      <Helmet>
        <title>Videotips Relaxguiden</title>
      </Helmet>

      <div className="mb-5 intro" id="main-content" tabIndex="-1">
        <h1>Videotips</h1>
        <p>
          Behöver du en paus? Här kan du filtrera fram den typ av återhämtning
          som passar dig just nu. Relax!
        </p>
      </div>

      <Filter
        categories={categories}
        languages={languages}
        selectedCategories={selectedCategories}
        selectedTime={selectedTime}
        selectedLanguage={selectedLanguage}
        onFilterChange={(type, value) => {
          if (type === "categories") {
            setSelectedCategories((prev) =>
              prev.includes(value)
                ? prev.filter((c) => c !== value)
                : [...prev, value]
            );
          } else if (type === "time") {
            setSelectedTime(value);
          } else if (type === "language") {
            setSelectedLanguage(value);
          }
        }}
        onResetFilters={() => {
          setSelectedCategories([]);
          setSelectedTime("all");
          setSelectedLanguage("all");
        }}
      />
      <div aria-live="polite" className="visually-hidden">
        {filteredVideos.length === 0
          ? "Inga matchande videor hittades. Justera filtren!"
          : `${filteredVideos.length} videor hittades.`}
      </div>

      {filteredVideos.length === 0 ? (
        <p className="text-warning mt-4 fw-medium fs-5">
          Inga matchande videor hittades. Justera filtren!
        </p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          {filteredVideos.map((video) => (
            <Col key={video.id}>
              <button
                className="p-0 border-0 bg-transparent w-100 h-100 button-focus btn"
                lang={video.language}
                onClick={handleOpenInfo(video)}
              >
                <VideoCard video={video} />
              </button>
            </Col>
          ))}
        </Row>
      )}

      {/* info dialog */}
      <Dialog.Root open={showInfoModal} onOpenChange={setShowInfoModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="rg-dialog-overlay" />

          <Dialog.Content
            className="rg-dialog-content"
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              lastOpenerRef.current?.focus();
            }}
          >
            <Dialog.Title
              className="rg-dialog-title"
              lang={selectedVideo?.language === "en" ? "en" : "sv"}
            >
              {selectedVideo?.title}
            </Dialog.Title>

            <Dialog.Description className="rg-dialog-description">
              <p>Längd: {selectedVideo?.length}</p>
              <p lang={selectedVideo?.language === "en" ? "en" : "sv"}>
                {selectedVideo?.description}
              </p>
            </Dialog.Description>

            <Button onClick={openVideoModal} className="button-focus">
              Starta videon
            </Button>
            <Dialog.Close asChild>
              <button
                className="rg-dialog-close button-focus"
                aria-label="Stäng dialog"
              >
                <CloseIcon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* video dialog */}
      <Dialog.Root open={showVideoModal} onOpenChange={setShowVideoModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="rg-dialog-overlay" />
          <Dialog.Content
            className="rg-dialog-content rg-dialog-video"
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              lastOpenerRef.current?.focus();
            }}
          >
            <Dialog.Title
              className="rg-dialog-title"
              lang={selectedVideo?.language === "en" ? "en" : "sv"}
            >
              {selectedVideo?.title}
            </Dialog.Title>
            <div className="video-wrapper">
              <iframe
                src={selectedVideo?.link.replace("watch?v=", "embed/")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Videospelare för ${selectedVideo?.title}`}
              ></iframe>
            </div>
            <Dialog.Close asChild>
              <button
                className="rg-dialog-close button-focus"
                aria-label="Stäng dialog"
              >
                <CloseIcon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default VideoList;
