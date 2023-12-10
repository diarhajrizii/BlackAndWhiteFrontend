import React, { useState, useEffect } from "react";
import "../assets/css/print-products.css"; // Import the CSS module
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
import Barcode from "react-barcode"; // Import the Barcode component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [printProducts, setPrintProducts] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [codeFilter, setCodeFilter] = useState(""); // State for code filter
  const [brandFilter, setBrandFilter] = useState(""); // State for brand filter
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products
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

  useEffect(() => {
    fetchProducts();
  }, []);

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
  const handleSubmit = (event) => {
    event.preventDefault();
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

      return (
        startDateCondition &&
        endDateCondition &&
        codeCondition &&
        brandCondition
      );
    });

    setFilteredProducts(filtered);
    setPrintProducts(filtered);
  };

  const handlePrint = () => {
    const printContents = document.getElementById("print-section").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
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
                  Print All
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
                      height={30}
                      format="CODE128"
                      // displayValue={false}
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
    </>
  );
};

export default ProductList;
