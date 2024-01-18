import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Button,
  CardTitle,
} from "reactstrap";

import ButtonGroupComponent from "components/Buttons/ButtonGroups";
import ProductForm from "components/Forms/ProductForm";
import NotificationComponent from "../components/Alert/alert";
import { fetchPanelData } from "api";

function AddProducts() {
  // Ref for the NotificationComponent
  const notificationComponentRef = useRef(new NotificationComponent());

  // State variables
  const [formData, setFormData] = useState({
    code: "",
    brand: 0,
    type: 0,
    color: 0,
    stockPrice: 0,
    importPrice: 0,
    sizes: {},
    productType: "shoes",
  });

  const [brandOptions, setBrandOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [activeButton, setActiveButton] = useState("");

  // Fetch data from APIs on component mount
  useEffect(() => {
    fetchDataFromAPIs("shoes");
  }, []);

  // Function to fetch data from APIs
  const fetchDataFromAPIs = async (button) => {
    try {
      const filterType = button !== "accessories" ? `?type=${button}` : "";
      const [brandData, colorData, numberData, typeData] = await Promise.all([
        fetchPanelData(`/api/v1/panels/brands${filterType}`),
        fetchPanelData("/api/v1/panels/colors"),
        fetchPanelData(`/api/v1/panels/numbers${filterType}`),
        fetchPanelData(`/api/v1/panels/types${filterType}`),
      ]);

      // Update state with fetched data
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
        productType: button,
      }));
      setActiveButton(button);
    } catch (error) {
      console.error("Error fetching data:", error);
      setActiveButton("shoes");
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "code" ? value : parseInt(value, 10),
    }));
  };

  // Handle size quantity change
  const handleSizeQuantityChange = (e, size) => {
    const newSize = { ...formData.sizes, [size]: parseInt(e.target.value, 10) };
    setFormData((prevData) => ({
      ...prevData,
      sizes: newSize,
    }));
  };

  // Handle button click to switch product type
  const handleButtonClick = (button) => {
    if (button !== activeButton) {
      fetchDataFromAPIs(button);
    }
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      // Validate required fields
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

      // Prepare sizes data
      const sizesData = Object.entries(formData.sizes).map(
        ([size, quantity]) => ({
          size: size,
          quantity: parseInt(quantity, 10),
        })
      );

      // Prepare data to be sent to the API
      const data = { ...formData, sizes: sizesData };

      // Send POST request to the API
      const response = await fetch("/api/v1/products/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Parse the response data
      const returnData = await response.json();

      // Check for success in the response
      if (!returnData.success) {
        throw new Error(returnData.message);
      }

      // Reset form data and show success notification
      setFormData((prevData) => ({
        ...prevData,
        code: "",
        brand: brandOptions[0],
        color: colorOptions[0],
        importPrice: 0,
        stockPrice: 0,
        type: 0,
      }));

      notificationComponentRef.current.showNotification(
        "Product added successfully",
        "success"
      );
    } catch (error) {
      // Handle errors and show error notification
      const errorMessage = error.message || "Error adding product";
      console.error(errorMessage);
      notificationComponentRef.current.showNotification(errorMessage, "danger");
    }
  };

  return (
    <div className="content">
      {/* NotificationComponent for displaying alerts */}
      <NotificationComponent ref={notificationComponentRef} />

      {/* Product entry form */}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <h5 className="card-category">Add Product</h5>
                  <CardTitle tag="h2">Products</CardTitle>
                </Col>
                <Col sm="6">
                  {/* ButtonGroupComponent for switching product types */}
                  <ButtonGroupComponent
                    activeButton={activeButton}
                    onButtonClick={handleButtonClick}
                  />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {/* Form for entering product details */}
              <ProductForm
                formData={formData}
                brandOptions={brandOptions}
                colorOptions={colorOptions}
                typeOptions={typeOptions}
                handleChange={handleChange}
                handleSizeQuantityChange={handleSizeQuantityChange}
              />
            </CardBody>
            <CardFooter style={{ textAlign: "right" }}>
              {/* Save button to submit the form */}
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
