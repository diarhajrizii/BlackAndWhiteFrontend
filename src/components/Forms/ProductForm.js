// ProductForm.js

import React from "react";
import { FormGroup, Input, Form, Row, Col } from "reactstrap";

function ProductForm({
  formData,
  brandOptions,
  colorOptions,
  typeOptions,
  handleChange,
  handleSizeQuantityChange,
  numberOptions,
}) {
  return (
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
      </Row>
      <Row>
        <Col md="6">
          <FormGroup>
            <label>Type</label>
            <Input
              type="select"
              name="type"
              value={formData.specificType}
              onChange={handleChange}
            >
              {typeOptions.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.specificType}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label>Color</label>
            <Input
              type="select"
              name="color"
              value={formData.color}
              onChange={handleChange}
            >
              {colorOptions.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.colorName}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>

      <Row>
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
      </Row>

      <Row>
        {Object.keys(numberOptions).map((size) => (
          <Col md="2" key={size}>
            <FormGroup>
              <label>Size {size}</label>
              <Input
                type="number"
                value={formData.sizes[size]}
                onChange={(e) => handleSizeQuantityChange(e, size)}
              />
            </FormGroup>
          </Col>
        ))}
      </Row>
    </Form>
  );
}

export default ProductForm;
