import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Input,
  FormGroup,
  Form,
  Label,
  CardTitle,
} from "reactstrap";
import Barcode from "react-barcode";

const SalesPage = () => {
  // States for product search and sales data
  const [products, setProducts] = useState([]);
  const [codeFilter, setCodeFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sales, setSales] = useState([]);

  // Constants
  const columns = ["id", "brand", "color", "number", "type", "code", "price"];
  const tableHeaders = [
    "ID",
    "Brand",
    "Color",
    "Number",
    "Type",
    "Code",
    "Price",
  ];
  const salesColumns = [
    "id",
    "brand_name",
    "color_name",
    "number",
    "product_type",
    "code",
    "product_price",
    "sale_price",
    "payment_type",
    "bank_name",
  ];

  const salesTableHeaders = [
    "ID",
    "Brand",
    "Color",
    "Number",
    "Type",
    "Code",
    "Price",
    "Sale Price",
    "Payment Type",
    "Bank Name",
  ];

  // Fetch products function (similar to ProductList fetchProducts)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/v1/products/products");
        if (response.ok) {
          const responseData = await response.json();
          const fetchedProducts = responseData.data.data.map((product) => ({
            ...product,
            selected: false,
          }));
          setProducts(fetchedProducts);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle errors or show a message to the user
      }
    };
    fetchProducts();
    fetchSalesData();
  }, []);

  // Handlers
  const handleProductSelection = (productId) => {
    const updatedPrintProducts = filteredProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, selected: !product.selected };
      }
      return product;
    });
    setFilteredProducts(updatedPrintProducts);
  };

  const handleCodeFilterChange = (event) => {
    setCodeFilter(event.target.value);
  };

  const handleBrandFilterChange = (event) => {
    setBrandFilter(event.target.value);
  };

  const handleBarcodeData = (filtered) => {
    // Check if items already exist based on unique identifiers (e.g., ID)
    const existingIds = filteredProducts.map((item) => item.id);
    const newItems = filtered.filter((item) => !existingIds.includes(item.id));

    // Merge new items into filteredProducts
    const updatedFilteredProducts = [...filteredProducts, ...newItems];
    setFilteredProducts(updatedFilteredProducts);
  };
  const handleBarcodeScan = (scannedValue) => {
    const syntheticEvent = {
      preventDefault: () => {}, // Add event methods you need to use
      target: {
        value: scannedValue, // Pass scanned value if needed
        barcode: scannedValue,
      },
    };

    handleSubmit(syntheticEvent);
  };

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

  useBarcodeScanner(handleBarcodeScan);

  const handleSubmit = (event) => {
    event.preventDefault();
    const scannedCode = event?.target?.barcode;

    const filtered = products.filter((product) => {
      const codeCondition =
        !codeFilter ||
        product.code.toLowerCase().includes(codeFilter.toLowerCase());
      const brandCondition =
        !brandFilter ||
        product.brand.toLowerCase().includes(brandFilter.toLowerCase());
      if (scannedCode) {
        const barcodeCondition = scannedCode === product.barcode;
        return barcodeCondition;
      }
      return codeCondition && brandCondition;
    });
    if (!scannedCode) {
      setFilteredProducts(filtered);
    } else {
      handleBarcodeData(filtered);
    }
  };

  const handleAllProductSelection = () => {
    const allSelected = filteredProducts.every((product) => product.selected);
    const updatedPrintProducts = filteredProducts.map((product) => ({
      ...product,
      selected: !allSelected,
    }));
    setFilteredProducts(updatedPrintProducts);
  };

  // Fetch sales data from "/api/v1/transactions"
  const fetchSalesData = async () => {
    try {
      const response = await fetch("/api/v1/transactions");
      if (response.ok) {
        const responseData = await response.json();
        setSales(responseData.data.data); // Assuming the response provides an array of sales data
      } else {
        throw new Error("Failed to fetch sales data");
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
      // Handle errors or show a message to the user
    }
  };

  // Function to handle the sale button click
  const handleSale = () => {
    // Logic for sale operation
    // ...
  };

  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <Row>
              <Col className="text-left" sm="6">
                <h5 className="card-category">CMS</h5>
                <CardTitle tag="h2">Products</CardTitle>
              </Col>
              <Col sm="12">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="codeFilter">Code Filter</Label>
                        <Input
                          type="text"
                          id="codeFilter"
                          value={codeFilter}
                          onChange={handleCodeFilterChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="brandFilter">Brand Filter</Label>
                        <Input
                          type="text"
                          id="brandFilter"
                          value={brandFilter}
                          onChange={handleBrandFilterChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" style={{ textAlign: "end" }}>
                      <Button size="sm" color="primary" type="submit">
                        Filter
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table className="tablesorter productsTable" responsive>
              <thead className="text-primary">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                  <th>
                    <input
                      type="checkbox"
                      checked={filteredProducts.every(
                        (product) => product.selected
                      )}
                      onChange={handleAllProductSelection}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={index}>
                    {columns.map((key, index) => (
                      <td className={key} key={index}>
                        {product[key]}
                      </td>
                    ))}
                    <td>
                      <input
                        type="checkbox"
                        checked={
                          filteredProducts.find((p) => p.id === product.id)
                            ?.selected
                        }
                        onChange={() => handleProductSelection(product.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h5 className="card-category">Sales</h5>
          </CardHeader>
          <CardBody>
            <Table>
              <tr>
                {salesTableHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.transaction_id}>
                    {salesColumns.map((key, index) => (
                      <td className={key} key={index}>
                        {sale[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default SalesPage;
