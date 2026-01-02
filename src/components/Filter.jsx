import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./Filter.scss";

const Filter = ({
  categories,
  languages,
  selectedCategories,
  selectedTime,
  selectedLanguage,
  onFilterChange,
  onResetFilters,
}) => {
  //sending type and value to handleFilterChange in VideoList
  const handleCategoryChange = (category) => {
    onFilterChange("categories", category);
  };

  const handleTimeChange = (e) => {
    onFilterChange("time", e.target.value);
  };

  const handleLanguageChange = (e) => {
    onFilterChange("language", e.target.value);
  };

  //Get label for aria-live region
  const getCategoryLabel = (value) => {
    const match = categories.find((c) => c.value === value);
    return match ? match.label : value;
  };
//Get label for aria-live region
  const getLanguageLabel = (value) => {
    const match = languages.find((l) => l.value === value);
    return match ? match.label : value;
  };



  return (
    <>
      <Form aria-label="Filtrera vilka videor som ska visas i sökresultatet">
        <Row className="mb-3 gy-3 gap-3 filter-row d-flex align-items-end">
          <Col
            lg={5}
            md={12}
            sm={12}
            xs={12}
            className="d-flex flex-column align-self-end"
          >
            <Form.Group>
              <Form.Label className="fw-semibold" htmlFor="category-select">
                Kategori
              </Form.Label>
              <div
                id="category-select"
                role="group"
                aria-label="Filtrera efter kategori"
                className="category-buttons gap-2 d-flex flex-wrap"
              >
                {categories.map((category) => (
                  <Button
                    type="button"
                    className="btn"
                    key={category.value}
                    active={selectedCategories.includes(category.value)}
                    onClick={() => handleCategoryChange(category.value)}
                    aria-pressed={selectedCategories.includes(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </Form.Group>
          </Col>
          <Col lg={2} md={3} sm={4} xs={12} className="d-flex flex-column">
            <Form.Group>
              <Form.Label className="fw-semibold" htmlFor="time-select">
                Tid
              </Form.Label>
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
              <Form.Label className="fw-semibold" htmlFor="language-select">
                Språk
              </Form.Label>
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
            <Button
              variant="danger"
              onClick={onResetFilters}
              className="w-auto"
              aria-label="Nollställ filter"
            >
              Nollställ
            </Button>
          </Col>
        </Row>
      </Form>
      <div aria-live="polite" className="visually-hidden">
        {selectedCategories.length === 0 &&
          selectedTime === "all" &&
          selectedLanguage === "all" &&
          "Inga filter valda."}

        {selectedCategories.length > 0 &&
          `Valda kategorier: ${selectedCategories
            .map(getCategoryLabel)
            .join(", ")}`}

        {selectedTime !== "all" &&
          `. Vald tid: ${
            selectedTime === "more"
              ? "Mer än 20 min"
              : `Max ${selectedTime} min`
          }`}

        {selectedLanguage !== "all" &&
          `. Valda språk: ${getLanguageLabel(selectedLanguage)}`}
      </div>
    </>
  );
};

export default Filter;
