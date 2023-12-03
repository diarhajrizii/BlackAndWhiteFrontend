import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function AddProducts() {
  const [code, setCode] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("gjysem-cizme");
  const [color, setColor] = useState("black");
  const [stockPrice, setStockPrice] = useState(0);
  const [importPrice, setImportPrice] = useState(0);
  const [sizes, setSizes] = useState({
    36: 0,
    37: 0,
    38: 0,
    39: 0,
    40: 0,
    41: 0,
  });

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleStockPriceChange = (e) => {
    setStockPrice(parseFloat(e.target.value));
  };

  const handleImportPriceChange = (e) => {
    setImportPrice(parseFloat(e.target.value));
  };

  const handleSizeQuantityChange = (e, size) => {
    const newSize = { ...sizes, [size]: parseInt(e.target.value, 10) };
    setSizes(newSize);
  };

  const handleSave = () => {
    // Prepare the data object for each size quantity
    const sizesData = Object.keys(sizes).map((size) => ({
      size: parseInt(size, 10),
      quantity: sizes[size],
    }));

    // Prepare the data object for the entire product
    const data = {
      code,
      brand,
      type,
      color,
      stockPrice,
      importPrice,
      sizes: sizesData,
    };

    // Send data to the API endpoint
    fetch("/api/v1/products/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Handle the response
        console.log("Product added successfully!", response);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error adding product:", error);
      });
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              {/* <h5 className="title"></h5> */}
              <h5 className="card-category">Add Product</h5>
              <CardTitle tag="h2">Products</CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Code</label>
                      <Input
                        type="text"
                        value={code}
                        onChange={handleCodeChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Brand</label>
                      <Input
                        type="text"
                        value={brand}
                        onChange={handleBrandChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Type</label>
                      <Input
                        type="select"
                        value={type}
                        onChange={handleTypeChange}
                      >
                        <option value="gjysem-cizme">Gjysem-Cizme</option>
                        <option value="cizme">Cizme</option>
                        <option value="sandalle">Sandalle</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Color</label>
                      <Input
                        type="select"
                        value={color}
                        onChange={handleColorChange}
                      >
                        <option value="black">Black</option>
                        <option value="green">Green</option>
                        <option value="white">White</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Stock Price</label>
                      <Input
                        type="number"
                        value={stockPrice}
                        onChange={handleStockPriceChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Import Price</label>
                      <Input
                        type="number"
                        value={importPrice}
                        onChange={handleImportPriceChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  {Object.keys(sizes).map((size) => (
                    <Col md="2" key={size}>
                      <FormGroup>
                        <label>Size {size}</label>
                        <Input
                          type="number"
                          value={sizes[size]}
                          onChange={(e) => handleSizeQuantityChange(e, size)}
                        />
                      </FormGroup>
                    </Col>
                  ))}
                </Row>
              </Form>
            </CardBody>
            <CardFooter style={{ textAlign: "right" }}>
              <Button className="btn-fill" color="primary" onClick={handleSave}>
                Save
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AddProducts;
