// ProductForm.js

import React from "react";
import { FormGroup, Form, Input, Row, Col } from "reactstrap";

function AccessoriesForm({ formData, brandOptions, handleChange }) {
  return (
    <>
      <Form>
        <Row>
          <Col md="6">
            <FormGroup>
              <label>Code</label>
              <Input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label>Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label>Brand</label>
              <Input
                type="select"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              >
                {brandOptions.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.brandName}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label>Import Price</label>
              <Input
                type="number"
                name="importPrice"
                value={formData.importPrice}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label>Stock Price</label>
              <Input
                type="number"
                name="stockPrice"
                value={formData.stockPrice}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label>Quantity</label>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default AccessoriesForm;
