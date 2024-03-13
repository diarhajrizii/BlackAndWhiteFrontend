import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Row, Col, Button } from "reactstrap";

const YearDatePicker = ({ onYearsChange }) => {
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [endYear, setEndYear] = useState(null);
  const [showEndYear, setShowEndYear] = useState(false);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5; // Last 5 years
    const futureYears = Array.from(
      { length: 6 },
      (_, index) => startYear + index
    );

    setYears(futureYears);
  }, []);

  const handleStartYearChange = (event) => {
    const newStartYear = parseInt(event.target.value, 10);
    setStartYear(newStartYear);

    if (showEndYear && endYear !== null && endYear <= newStartYear) {
      setEndYear(null);
    }

    onYearsChange(
      showEndYear
        ? Array.from(
            { length: endYear - newStartYear + 1 },
            (_, index) => newStartYear + index
          )
        : [newStartYear]
    );
  };

  const handleEndYearChange = (event) => {
    const newEndYear = parseInt(event.target.value, 10);
    setEndYear(newEndYear);
    onYearsChange(
      Array.from(
        { length: newEndYear - startYear + 1 },
        (_, index) => startYear + index
      )
    );
  };

  const toggleEndYear = () => {
    setShowEndYear(!showEndYear);
    if (!showEndYear) {
      setEndYear(null); // Reset the endYear when hiding the End Year dropdown
    }
  };

  return (
    <Row>
      <Col sm="5">
        <FormGroup>
          <Label for="startYear">{showEndYear ? "Start Year:" : "Year:"}</Label>
          <Input
            type="select"
            id="startYear"
            onChange={handleStartYearChange}
            value={startYear}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>

      <Col sm="2">
        <Label> {""} </Label>
        <Button color="primary" size="sm" onClick={toggleEndYear}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"
            />
          </svg>
        </Button>
      </Col>

      <Col sm="5">
        <FormGroup>
          {showEndYear && (
            <>
              <Label for="endYear">End Year:</Label>
              <Input
                type="select"
                id="endYear"
                onChange={handleEndYearChange}
                value={endYear || ""}
              >
                {years
                  .filter((year) => year >= startYear)
                  .map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
              </Input>
            </>
          )}
        </FormGroup>
      </Col>
    </Row>
  );
};

export default YearDatePicker;
