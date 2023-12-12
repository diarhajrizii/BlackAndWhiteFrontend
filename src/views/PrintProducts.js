import React, { useState, useEffect } from "react";
import "../assets/css/print-products.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
  Label,
  Input,
  FormGroup,
  Form,
} from "reactstrap";
import Barcode from "react-barcode";

const ProductList = () => {
  // State declarations
  const [products, setProducts] = useState([]);
  const [printProducts, setPrintProducts] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [codeFilter, setCodeFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  // Use Effect to fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products function
  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/v1/products/products`);
      if (response.ok) {
        const responseData = await response.json();
        const fetchedProducts = responseData.data.data.map((product) => ({
          ...product,
          selected: true,
        }));
        setProducts(fetchedProducts);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors or show a message to the user
    }
  };

  // Handlers
  const handleProductSelection = (productId) => {
    const updatedPrintProducts = printProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, selected: !product.selected };
      }
      return product;
    });
    setPrintProducts(updatedPrintProducts);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
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
    setPrintProducts(updatedFilteredProducts);
  };

  const handleAllProductSelection = () => {
    const allSelected = printProducts.every((product) => product.selected);
    const updatedPrintProducts = printProducts.map((product) => ({
      ...product,
      selected: !allSelected,
    }));
    setPrintProducts(updatedPrintProducts);
  };

  const selectAll = () => {
    setFilteredProducts(products);
    setPrintProducts(products);
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
    const startDateObject = startDate ? new Date(startDate) : null;
    const endDateObject = endDate ? new Date(endDate) : null;

    const filtered = products.filter((product) => {
      const productDate = new Date(product.date);
      const startDateCondition =
        !startDateObject || productDate >= startDateObject;
      const endDateCondition = !endDateObject || productDate <= endDateObject;

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
      return (
        startDateCondition &&
        endDateCondition &&
        codeCondition &&
        brandCondition
      );
    });
    if (!scannedCode) {
      setFilteredProducts(filtered);
      setPrintProducts(filtered);
    } else {
      handleBarcodeData(filtered);
    }
  };

  const handlePrint = () => {
    const printContents = document.getElementById("print-section").innerHTML;
    // const originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
        <style>
          .page {
            width: 279mm; /* A4 width */
            height: 210mm; /* A4 height */
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            display: block !important;
          }

          .grid-item {
            width: calc(100% / 3);
            height: calc(100% / 7);
            border: 1px solid black;
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            page-break-inside: avoid;
            padding: 8px;
          }
        
          .parentRow {
            width: 100%;
            text-align: center;
          }
        
          .grid-item .row div {
            margin-top: 2px;
            margin-bottom: 2px;
          }
        
          .codeColumn {
            text-align: start;
            color: black;
            font-size: 35px;
            font-weight: bold;
          }
        
          .colorColumn {
            text-align: start;
            font-size: x-large;
            font-weight: bold;
            color: black;
          }
        
          .numberColumn {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 1px;
            color: black;
            font-size: 20px;
            font-weight: 800;
            border: 1px solid black;
            margin-left: 5px;
          }
        
          .priceColumn {
            display: flex;
            text-align: center;
            justify-content: center;
            align-items: center;
            color: black;
          }

          body {
            width: 210mm; /* A4 width */
            height: 297mm; /* A4 height */
            margin: 0;
            padding: 0;
            flex-wrap: wrap;
            background-color: white !important;
          }
          .col-md-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-md-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-md-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-md-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-md-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-md-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-md-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-md-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-md-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-md-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-md-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-md-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.text-center{text-align: center}.row{display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;}
        
          .barcode-container {
            overflow-y: auto;
            overflow-x: hidden;
            width: 100%;
          }
        
          .barcode-container rect {
          }
        </style>
          <title>Print Section</title>
        </head>
        <body>${printContents}</body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
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
              <Col className="text-right" sm="6">
                <Button
                  tag="label"
                  color="info"
                  size="sm"
                  onClick={handlePrint}
                >
                  Print
                </Button>
              </Col>
              <Col sm="12">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="startDate">Start Date</Label>
                        <Input
                          type="date"
                          id="startDate"
                          value={startDate}
                          onChange={handleStartDateChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="endDate">End Date</Label>
                        <Input
                          type="date"
                          id="endDate"
                          value={endDate}
                          onChange={handleEndDateChange}
                        />
                      </FormGroup>
                    </Col>
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
                      <Button color="secondary" size="sm" onClick={selectAll}>
                        Show All
                      </Button>
                      <Button size="sm" color="primary" type="submit">
                        Filter
                      </Button>
                      <Button color="secondary" size="sm">
                        Transfer Products
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
                      checked={printProducts.every(
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
                          printProducts.find((p) => p.id === product.id)
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
        <div className="page d-none" id="print-section">
          <div>
            {printProducts
              .filter((product) => product.selected)
              .map((product, index) => (
                <div key={index} className="grid-item">
                  <Row className="parentRow">
                    <Col className="codeColumn text-center" md="12">
                      {product.code}
                    </Col>
                    <Col className="colorColumn" md="9">
                      {product.color}
                    </Col>
                    <Col className="numberColumn" md="2">
                      {product.number}
                    </Col>
                    <Col className="barcode-container" md="12">
                      <Barcode
                        value={product.barcode}
                        text={product.price + "€"}
                        fontOptions="bold italic"
                        width={0.8}
                        height={20}
                        format="CODE128"
                        fontSize={parseInt("15px", 10)}
                        background="transparent"
                        font="monospace"
                        textAlign="center"
                        textPosition="bottom"
                      />
                    </Col>
                  </Row>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
