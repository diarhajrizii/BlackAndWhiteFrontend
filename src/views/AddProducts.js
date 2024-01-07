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
import NotificationAlert from "react-notification-alert";
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

    return await response.json();
  } catch (error) {
    console.error("Error fetching panel data:", error);
    return [];
  }
}

function AddProducts() {
  const notificationAlertRef = React.useRef(null);
  const [formData, setFormData] = useState({
    code: "",
    brand: 0,
    type: 0,
    color: 0,
    stockPrice: 0,
    importPrice: 0,
    sizes: {},
  });
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
        setFormData((prevData) => ({
          ...prevData,
          brand: brandData.data.data[0]?.id || 0,
          type: colorData.data.data[0]?.id || 0,
          color: typeData.data.data[0]?.id || 0,
          sizes: Object.fromEntries(
            numberData.data.data.map((number) => [number.number, 0])
          ),
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchDataFromAPIs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "code" ? value : parseInt(value, 10),
    }));
  };

  const handleSizeQuantityChange = (e, size) => {
    const newSize = { ...formData.sizes, [size]: parseInt(e.target.value, 10) };
    setFormData((prevData) => ({
      ...prevData,
      sizes: newSize,
    }));
  };

  const handleSave = async () => {
    try {
      const requiredFields = [
        "code",
        "brand",
        "type",
        "color",
        "stockPrice",
        "importPrice",
      ];
      requiredFields.forEach((key) => {
        if (!formData[key]) {
          throw new Error(
            `${key.charAt(0).toUpperCase() + key.slice(1)} is required!`
          );
        }
      });

      const sizesData = Object.entries(formData.sizes).map(
        ([size, quantity]) => ({
          size: parseInt(size, 10),
          quantity: parseInt(quantity, 10),
        })
      );

      const data = { ...formData, sizes: sizesData };

      const response = await fetch("/api/v1/products/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const returnData = await response.json();

      if (!returnData.success) {
        throw new Error(returnData.message);
      }

      setFormData((prevData) => ({
        ...prevData,
        code: "",
        brand: brandOptions[0],
        color: colorOptions[0],
        importPrice: 0,
        stockPrice: 0,
        type: 0,
      }));

      const options = Alert(200, "Product was added successfully");
      notificationAlertRef.current.notificationAlert(options);
    } catch (error) {
      const errorMessage = error.message || "Error adding product";
      console.error(errorMessage);
      const options = Alert(400, errorMessage);
      notificationAlertRef.current.notificationAlert(options);
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
                        value={formData.type}
                        onChange={handleChange}
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
                  {Object.keys(formData.sizes).map((size) => (
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
