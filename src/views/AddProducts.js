/* eslint-disable no-throw-literal */
import NotificationAlert from "react-notification-alert";
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
import Alert from "../components/Alert/alert";

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
  const notificationAlertRef = React.useRef(null);
  const [code, setCode] = useState("");
  const [brand, setBrand] = useState(0);
  const [type, setType] = useState(0);
  const [color, setColor] = useState(0);
  const [stockPrice, setStockPrice] = useState(0);
  const [importPrice, setImportPrice] = useState(0);
  const [sizes, setSizes] = useState({});
  const [brandOptions, setBrandOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
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

        setBrandOptions(brandData.data.data);
        setColorOptions(colorData.data.data);
        setTypeOptions(typeData.data.data);
        setBrand(brandData.data.data[0].id);
        setType(colorData.data.data[0].id);
        setColor(typeData.data.data[0].id);
        const initialSizes = {};
        numberData.data.data.forEach((number) => {
          initialSizes[number.number] = 0;
        });
        setSizes(initialSizes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchDataFromAPIs();
  }, []); // Empty dependency array to execute only once when mounted

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

      if (!code) throw { message: "Code input is empty!" };
      if (!brand) throw { message: "Please select the brand!" };
      if (!type) throw { message: "Please select the type!" };
      if (!color) throw { message: "Please select the color!" };
      if (!importPrice) throw { message: "Import price input is empty" };
      if (!stockPrice) throw { message: "Stock price input is empty!" };

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

      setCode("");
      setBrand(brandOptions[0]);
      setColor(colorOptions[0]);
      setImportPrice(0);
      setStockPrice(0);
      setType(0);

      const options = Alert("tr", 200, "Product was added successfully");
      notificationAlertRef.current.notificationAlert(options);
    } catch (error) {
      const options = Alert("tr", 400, error.message);
      notificationAlertRef.current.notificationAlert(options);
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
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
                      <label>Import Price</label>
                      <Input
                        type="number"
                        value={importPrice}
                        onChange={handleImportPriceChange}
                      />
                    </FormGroup>
                  </Col>
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
