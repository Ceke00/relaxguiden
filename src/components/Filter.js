import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const Filter = ({
  categories,
  languages,
  selectedCategories,
  selectedTime,
  selectedLanguage,
  onFilterChange,
  onResetFilters,
}) => {
  const handleCategoryChange = (category) => {
    onFilterChange("categories", category);
  };

  const handleTimeChange = (e) => {
    onFilterChange("time", e.target.value);
  };

  const handleLanguageChange = (e) => {
    onFilterChange("language", e.target.value);
  };

  return (
    <Form>
      <Row className="mb-3 gy-3 gap-3 filter-row d-flex align-items-end">
        <Col
          lg={5}
          md={12}
          sm={12}
          xs={12}
          className="d-flex flex-column align-self-end"
        >
          <Form.Group>
            <Form.Label className="fw-semibold" htmlFor="category-select">Kategori</Form.Label>
            <div id="category-select" className="category-buttons gap-2 d-flex flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={
                    selectedCategories.includes(category.value)
                      ? "light"
                      : "outline-light"
                  }
                  active={selectedCategories.includes(category.value)}
                  onClick={() => handleCategoryChange(category.value)}
                 
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </Form.Group>
        </Col>
        <Col lg={2} md={3} sm={4} xs={12} className="d-flex flex-column">
          <Form.Group>
            <Form.Label className="fw-semibold" htmlFor="time-select">Tid</Form.Label>
            <Form.Select
              id="time-select"
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-auto"
            >
              <option value="all">Alla</option>
              <option value="5">Max 5 min</option>
              <option value="10">Max 10 min</option>
              <option value="20">Max 20 min</option>
              <option value="more">Mer än 20 min</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={2} md={3} sm={4} xs={12} className="d-flex flex-column">
          <Form.Group>
            <Form.Label className="fw-semibold" htmlFor="language-select">Språk</Form.Label>
            <Form.Select
              id="language-select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="w-auto"
            >
              <option value="all">Alla</option>
              {languages.map((language) => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={2} md={2} sm={3} xs={12} className="d-flex align-self-end">
          <Button variant="danger" onClick={onResetFilters} className="w-auto">
            Nollställ
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
