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
} from "reactstrap";
import Barcode from "react-barcode"; // Import the Barcode component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [printProducts, setPrintProducts] = useState([]);
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
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/v1/products/products");
        if (response.ok) {
          const responseData = await response.json();
          const fetchedProducts = responseData.data.data.map((product) => ({
            ...product,
            selected: true,
          }));
          setProducts(fetchedProducts);
          setPrintProducts(fetchedProducts);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors or show a message to the user
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelection = (productId) => {
    const updatedPrintProducts = printProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, selected: !product.selected };
      }
      return product;
    });
    setPrintProducts(updatedPrintProducts);
  };

  const handleAllProductSelection = () => {
    const allSelected = printProducts.every((product) => product.selected);
    const updatedPrintProducts = printProducts.map((product) => ({
      ...product,
      selected: !allSelected,
    }));
    setPrintProducts(updatedPrintProducts);
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
                {products.map((product, index) => (
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
