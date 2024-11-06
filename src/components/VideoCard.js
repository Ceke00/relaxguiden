import React from "react";
import { Card, Button } from "react-bootstrap";
import { PiFlowerLotus } from "react-icons/pi";
import { GrYoga } from "react-icons/gr";
import { TbUserPause } from "react-icons/tb";
import "./VideoList.scss";
import { GiMeditation } from "react-icons/gi";
import { IoMdMusicalNotes } from "react-icons/io";

const VideoCard = ({ video, onClick }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "music":
        return <IoMdMusicalNotes className="category-icon" />;
      case "yoga":
        return <GrYoga className="category-icon" />;
      case "relax":
        return <PiFlowerLotus className="category-icon" />;
      case "meditation":
        return <GiMeditation className="category-icon" />;
      default:
        return <TbUserPause className="category-icon" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "music":
        return "var(--primary)";
      case "yoga":
        return "var(--danger)";
      case "relax":
        return "var(--info)";
      case "meditation":
        return "var(--secondary)";
      default:
        return "var(--dark)";
    }
  };

  return (
    <Button
      className="p-0 border-0 bg-transparent w-100 h-100 button-focus"
      onClick={onClick}
    >
      <Card className="h-100 cursor-pointer video-card rounded-4 shadow-sm">
        <div
          className="category-icon-container d-flex justify-content-center align-items-center rounded-top-4"
          style={{
            backgroundColor: getCategoryColor(video.category),
          }}
        >
          {getCategoryIcon(video.category)}
        </div>
        <Card.Body className="text-left d-flex flex-column">
          <Card.Title>{video.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {video.author}
          </Card.Subtitle>
          <Card.Text className="fs-6 mt-auto">
            Längd: {video.length} minuter
          </Card.Text>
        </Card.Body>
      </Card>
    </Button>
  );
};

export default VideoCard;
