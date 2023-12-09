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
          const fetchedProducts = responseData.data.data;
          setProducts(fetchedProducts);
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
                    {/* <td align="right" key={index}>
                      <Button color="link" onClick={() => openEditModal(item)}>
                        <i className="tim-icons icon-pencil" />
                        <span className="d-lg-none d-md-block">Edit</span>
                      </Button>
                      <Button
                        color="link"
                        onClick={() => openDeleteModal(item)}
                      >
                        <i className="tim-icons icon-trash-simple" />
                        <span className="d-lg-none d-md-block">Delete</span>
                      </Button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <div className="page d-none" id="print-section">
          {products.map((product, index) => (
            <div key={index} className="grid-item">
              <Row className="parentRow">
                <Col className="colorColumn" md="9">
                  {product.color}
                </Col>
                <Col className="numberColumn" md="2">
                  {product.number}
                </Col>
                <Col className="barcode-container" md="12">
                  <Barcode
                    value={product.barcode}
                    text={product.code}
                    fontOptions="bold italic"
                    width={0.8}
                    height={30}
                    format="CODE128"
                    displayValue={false}
                    font="monospace"
                    textAlign="center"
                    textPosition="bottom"
                  />
                </Col>
                <Col className="codeColumn" md="9">
                  {product.code}
                </Col>
                <Col className="priceColumn" md="2">
                  {product.price}€
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
