
import React from "react";
//import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import { FaMusic, FaPrayingHands } from "react-icons/fa";
import { PiFlowerLotusBold } from "react-icons/pi";
import { GrYoga } from "react-icons/gr";
import { TbUserPause } from "react-icons/tb";
import "./VideoList.scss";
import { Link } from "react-router-dom";

const VideoList = ({ videos }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "music":
        return <FaMusic className="category-icon" />;
      case "yoga":
        return <GrYoga className="category-icon" />;
      case "relax":
        return <PiFlowerLotusBold className="category-icon" />;
      case "meditation":
        return <FaPrayingHands className="category-icon" />;
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
        return "#FFFFFF";
    }
  };

  return (

    <Row xs={1} md={2} lg={3} className="g-4">
      {videos.map((video) => (
        <Col key={video.id}>
          <Link
            to={`/video/${video.id}`}
            state={{ video }}
            className="text-decoration-none"
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
              <Card.Body>
                <Card.Title>{video.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {video.author}
                </Card.Subtitle>
                <Card.Text>{video.length}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default VideoList;
