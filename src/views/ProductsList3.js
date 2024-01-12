import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Label,
  Input,
  FormGroup,
} from "reactstrap";

const useBarcodeScanner = (callback) => {
  useEffect(() => {
    let scannedCode = "";

    const handleBarcodeScanner = (event) => {
      if (event.key === "Enter" && scannedCode.length > 0) {
        console.log("Scanned barcode:", scannedCode);

        if (typeof callback === "function") {
          callback(scannedCode);
        }

        scannedCode = "";
      } else if (event.key !== "Enter" && event.key.length === 1) {
        scannedCode += event.key;
      }
    };

    document.addEventListener("keydown", handleBarcodeScanner);
    return () => {
      document.removeEventListener("keydown", handleBarcodeScanner);
    };
  }, [callback]);
};

const ProductList = () => {
  const [product, setProduct] = useState(null);
  const [barcode, setBarcode] = useState("");
  console.log(barcode);
  const handleBarcodeScanner = async (e) => {
    try {
      const response = await fetch(`/api/v1/products/products/${barcode}`);
      if (response.ok) {
        const productData = await response.json();
        setProduct(productData);
      } else {
        throw new Error("Failed to fetch product data");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      // Handle errors or show a message to the user
    }
  };

  const handleBarcodeScan = (scannedValue) => {
    setBarcode(scannedValue);
  };

  useBarcodeScanner(handleBarcodeScan);

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">CMS</h5>
              <CardTitle tag="h2">Product Details</CardTitle>
            </Col>
            <Col className="text-right" sm="6">
              <Button color="info" size="sm" onClick={handleBarcodeScan}>
                Scan Barcode
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label for="barcode">Barcode</Label>
                <Input
                  type="text"
                  id="barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          {product && (
            <div>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              {/* Display other product details as needed */}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductList;
