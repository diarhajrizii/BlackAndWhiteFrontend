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
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import ButtonGroupComponent from "components/Buttons/ButtonGroups";
import ProductForm from "components/Forms/ProductForm";
import NotificationComponent from "../components/Alert/alert";

import {
  useFetchBrandsQuery,
  useFetchColorsQuery,
  useFetchNumbersQuery,
  useFetchTypesQuery,
} from "apiSlice";
import AccessoriesForm from "components/Forms/AccessoriesForm";

function AddProducts() {
  const notificationComponentRef = useRef();

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
    quantity: 0,
  });

  const [activeButton, setActiveButton] = useState("shoes");
  const [missingData, setMissingData] = useState({
    brands: false,
    colors: false,
    types: false,
  });

  // RTK Query hooks
  const { data: brandOptions } = useFetchBrandsQuery(activeButton);
  const { data: colorOptions } = useFetchColorsQuery();
  const { data: typeOptions } = useFetchTypesQuery(activeButton);
  const { data: numberData } = useFetchNumbersQuery(activeButton);

  // Set default values when data loads
  useEffect(() => {
    const hasBrands = brandOptions?.data?.length > 0;
    const hasColors = colorOptions?.data?.length > 0;
    const hasTypes =
      activeButton === "accessories" ? true : typeOptions?.data?.length > 0;

    setMissingData({
      brands: !hasBrands,
      colors: activeButton === "accessories" ? false : !hasColors,
      types: activeButton === "accessories" ? false : !hasTypes,
    });

    if (
      hasBrands &&
      (activeButton === "accessories" || (hasColors && hasTypes)) &&
      numberData?.data
    ) {
      setFormData((prevData) => ({
        ...prevData,
        brand: brandOptions.data[0]?.id || 0,
        type: activeButton === "accessories" ? 0 : typeOptions.data[0]?.id || 0,
        color:
          activeButton === "accessories" ? 0 : colorOptions.data[0]?.id || 0,
        sizes: Object.fromEntries(
          numberData.data.map((number) => [number.number, 0])
        ),
        productType: activeButton,
      }));
    }
  }, [
    brandOptions?.data,
    colorOptions?.data,
    typeOptions?.data,
    numberData?.data,
    activeButton,
  ]);

  const fetchDataFromAPIs = async (button) => {
    try {
      setActiveButton(button);
    } catch (error) {
      console.error("Error fetching data:", error);
      setActiveButton("shoes");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "code" || name === "name" ? value : parseInt(value, 10),
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

      // Validate required fields
      requiredFields.forEach((key) => {
        if (!formData[key] && formData[key] === 0) {
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

      const returnData = await response.json();

      if (!returnData.success) {
        throw new Error(returnData.message);
      }

      // Reset form data
      setFormData({
        code: "",
        name: "",
        brand: brandOptions?.data[0]?.id || 0,
        type: typeOptions?.data[0]?.id || 0,
        color: colorOptions?.data[0]?.id || 0,
        stockPrice: 0,
        importPrice: 0,
        sizes: Object.fromEntries(
          numberData?.data?.map((number) => [number.number, 0]) || {}
        ),
        productType: activeButton,
        quantity: 0,
      });

      notificationComponentRef.current.showNotification(
        "Product added successfully",
        "success"
      );
    } catch (error) {
      const errorMessage = error.message || "Error adding product";
      console.error(errorMessage);
      notificationComponentRef.current.showNotification(errorMessage, "danger");
    }
  };

  const isDataLoaded =
    brandOptions &&
    colorOptions &&
    (activeButton === "accessories" || typeOptions) &&
    numberData;

  return (
    <div className="content">
      <NotificationComponent ref={notificationComponentRef} />

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
                  <ButtonGroupComponent
                    activeButton={activeButton}
                    onButtonClick={fetchDataFromAPIs}
                    buttons={["shoes", "textile", "accessories"]}
                  />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {/* Missing data alerts */}
              {missingData.brands && (
                <Alert color="danger">
                  No brands found. Please{" "}
                  <Link to="/admin/cms">add brands in the CMS Panel</Link>.
                </Alert>
              )}
              {missingData.colors && activeButton !== "accessories" && (
                <Alert color="danger">
                  No colors found. Please{" "}
                  <Link to="/admin/cms">add colors in the CMS Panel</Link>.
                </Alert>
              )}
              {missingData.types && activeButton !== "accessories" && (
                <Alert color="danger">
                  No types found. Please{" "}
                  <Link to="/admin/cms">
                    Add product types in the CMS Panel
                  </Link>
                  .
                </Alert>
              )}

              {isDataLoaded &&
                activeButton &&
                activeButton !== "accessories" && (
                  <ProductForm
                    formData={formData}
                    brandOptions={brandOptions?.data || []}
                    colorOptions={colorOptions?.data || []}
                    typeOptions={typeOptions?.data || []}
                    handleChange={handleChange}
                    numberOptions={Object.fromEntries(
                      numberData?.data?.map((number) => [number.number, 0]) ||
                        {}
                    )}
                    handleSizeQuantityChange={handleSizeQuantityChange}
                    productType={activeButton}
                    disabled={
                      missingData.brands ||
                      missingData.colors ||
                      missingData.types
                    }
                  />
                )}
              {isDataLoaded && activeButton === "accessories" && (
                <AccessoriesForm
                  formData={formData}
                  brandOptions={brandOptions?.data || []}
                  handleChange={handleChange}
                  disabled={missingData.brands}
                />
              )}
            </CardBody>
            <CardFooter style={{ textAlign: "right" }}>
              <Button
                className="btn-fill"
                color="primary"
                onClick={handleSave}
                disabled={
                  missingData.brands ||
                  (activeButton !== "accessories" &&
                    (missingData.colors || missingData.types))
                }
              >
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
