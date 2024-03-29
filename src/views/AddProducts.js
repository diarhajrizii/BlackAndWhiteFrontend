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

import {
  useFetchBrandsQuery,
  useFetchColorsQuery,
  useFetchNumbersQuery,
  useFetchTypesQuery,
  useAddProductMutation,
} from "apiSlice"; // Adjust the path accordingly
import AccessoriesForm from "components/Forms/AccessoriesForm";

function AddProducts() {
  // Ref for the NotificationComponent
  const notificationComponentRef = useRef();

  // State variables
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    brand: 0,
    type: 0,
    color: 0,
    stockPrice: 0,
    importPrice: 0,
    sizes: {},
    productType: "shoes",
  });

  const [activeButton, setActiveButton] = useState("shoes");

  // RTK Query hooks
  const { data: brandOptions } = useFetchBrandsQuery(activeButton);
  const { data: colorOptions } = useFetchColorsQuery();
  const { data: typeOptions } = useFetchTypesQuery(activeButton);
  const { data: numberData } = useFetchNumbersQuery(activeButton);

  useEffect(() => {
    if (
      (brandOptions?.data && colorOptions?.data && typeOptions?.data,
      numberData?.data)
    ) {
      // Set default values for brand, color, and type
      setFormData((prevData) => ({
        ...prevData,
        brand: brandOptions.data[0]?.id || 0, // Set the first brand option as default, or 0 if no options
        type: typeOptions.data[0]?.id || 0, // Set the first type option as default, or 0 if no options
        color: colorOptions.data[0]?.id || 0, // Set the first color option as default, or 0 if no options
        sizes: Object.fromEntries(
          numberData?.data.map((number) => [number.number, 0])
        ),
        productType: activeButton,
      }));
    }
  }, [brandOptions, colorOptions, typeOptions]);

  // // Function to fetch data from APIs
  const fetchDataFromAPIs = async (button) => {
    try {
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
      [name]: name === "code" || name === "name" ? value : parseInt(value, 10),
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

  // RTK Query Mutation
  // const addProductMutation = useAddProductMutation();

  // Handle save button click
  const handleSave = async () => {
    try {
      // Validate required fields
      let requiredFields = [
        "code",
        "brand",
        "type",
        "color",
        "stockPrice",
        "importPrice",
      ];

      if (activeButton === "accessories") {
        requiredFields = [
          "code",
          "brand",
          "name",
          "stockPrice",
          "importPrice",
          "quantity",
        ];
      }

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
        importPrice: 0,
        stockPrice: 0,
        name: "",
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

  const numberObject = numberData
    ? Object.fromEntries(numberData?.data.map((number) => [number.number, 0]))
    : null;

  const isDataLoaded =
    brandOptions && colorOptions && typeOptions && numberObject;

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
                    onButtonClick={fetchDataFromAPIs}
                    buttons={["shoes", "textile", "accessories"]}
                  />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {isDataLoaded &&
                activeButton &&
                activeButton !== "accessories" && (
                  <ProductForm
                    formData={formData}
                    brandOptions={brandOptions?.data}
                    colorOptions={colorOptions?.data}
                    typeOptions={typeOptions?.data}
                    handleChange={handleChange}
                    numberOptions={numberObject}
                    handleSizeQuantityChange={handleSizeQuantityChange}
                    productType={activeButton}
                  />
                )}
              {isDataLoaded &&
                activeButton &&
                activeButton === "accessories" && (
                  <AccessoriesForm
                    formData={formData}
                    brandOptions={brandOptions?.data}
                    handleChange={handleChange}
                  />
                )}
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
