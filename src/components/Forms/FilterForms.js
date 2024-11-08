import React from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";

const FilterForm = ({
  startDate,
  endDate,
  codeFilter,
  brandFilter,
  handleStartDateChange,
  handleEndDateChange,
  handleCodeFilterChange,
  handleBrandFilterChange,
  handleSubmit,
  openTransferModal,
  selectAll,
  handleSale,
  resetFilteredProducts,
}) => (
  <Form onSubmit={handleSubmit}>
    {startDate !== undefined && endDate !== undefined && (
      <Row>
        <Col sm="6">
          <FormGroup>
            <Label for="startDate">Start Date</Label>
            <Input
              type="date"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label for="endDate">End Date</Label>
            <Input
              type="date"
              id="endDate"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </FormGroup>
        </Col>
      </Row>
    )}

    <Row>
      <Col sm="6">
        <FormGroup>
          <Label for="codeFilter">Code Filter</Label>
          <Input
            type="text"
            id="codeFilter"
            value={codeFilter}
            onChange={handleCodeFilterChange}
          />
        </FormGroup>
      </Col>
      <Col sm="6">
        <FormGroup>
          <Label for="brandFilter">Brand Filter</Label>
          <Input
            type="text"
            id="brandFilter"
            value={brandFilter}
            onChange={handleBrandFilterChange}
          />
        </FormGroup>
      </Col>
      <Col sm="12" style={{ textAlign: "end" }}>
        {openTransferModal !== undefined && (
          <Button color="success" size="sm" onClick={openTransferModal}>
            Transfer
          </Button>
        )}
        {selectAll !== undefined && (
          <Button color="secondary" size="sm" onClick={selectAll}>
            Show All
          </Button>
        )}
        {handleSale !== undefined && (
          <Button size="sm" color="success" onClick={handleSale}>
            Sell
          </Button>
        )}
        <Button size="sm" color="primary" type="submit">
          Filter
        </Button>
        {resetFilteredProducts !== undefined && (
          <Button size="sm" color="danger" onClick={resetFilteredProducts}>
            Reset
          </Button>
        )}
      </Col>
    </Row>
  </Form>
);

export default FilterForm;
