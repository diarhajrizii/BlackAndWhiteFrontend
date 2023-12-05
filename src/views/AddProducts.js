import showAlert from "../components/Alert/alert";
import React, { useState, useEffect } from "react";
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

async function fetchPanelData(endpoint) {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching panel data:", error);
    return [];
  }
}

function AddProducts() {
  const [code, setCode] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [stockPrice, setStockPrice] = useState(0);
  const [importPrice, setImportPrice] = useState(0);
  const [sizes, setSizes] = useState({});
  const [brandOptions, setBrandOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [numberOptions, setNumberOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  useEffect(() => {
    async function fetchDataFromAPIs() {
      try {
        const [brandData, colorData, numberData, typeData] = await Promise.all([
          fetchPanelData("/api/v1/panels/brands"),
          fetchPanelData("/api/v1/panels/colors"),
          fetchPanelData("/api/v1/panels/numbers"),
          fetchPanelData("/api/v1/panels/types"),
        ]);
        console.log(brandData.data.data);
        setBrandOptions(brandData.data.data);
        setColorOptions(colorData.data.data);
        setNumberOptions(numberData.data.data);
        setTypeOptions(typeData.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    const initialSizes = {};
    console.log(numberOptions);
    numberOptions.forEach((number) => {
      initialSizes[number.number] = 0; // Assuming number.id corresponds to sizes like 36, 37, etc.
    });
    setSizes(initialSizes);
    fetchDataFromAPIs();
  }, [numberOptions]);

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

  const handleSave = async () => {
    try {
      const sizesData = Object.keys(sizes).map((size) => ({
        size: parseInt(size, 10),
        quantity: sizes[size],
      }));

      const data = {
        code,
        brand,
        type,
        color,
        stockPrice,
        importPrice,
        sizes: sizesData,
      };

      const response = await fetch("/api/v1/products/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Product added successfully!", response);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
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
                        type="select"
                        value={brand}
                        onChange={handleBrandChange}
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
                        value={type}
                        onChange={handleTypeChange}
                      >
                        {typeOptions.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.type}
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
                        value={color}
                        onChange={handleColorChange}
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
