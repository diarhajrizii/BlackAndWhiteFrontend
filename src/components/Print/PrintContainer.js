import React from "react";
import Barcode from "react-barcode";
import { Row, Col, Button } from "reactstrap";
import image from "../../Kepuce3.jpg";

const PrintContainer = ({ printProducts }) => {
  const selectedProducts = React.useMemo(
    () => printProducts.filter((product) => product.selected),
    [printProducts]
  );

  const barcodeOptions = {
    width: 0.8,
    height: 20,
    format: "CODE128",
    fontSize: 15,
    fontOptions: "bold italic",
    background: "transparent",
    font: "monospace",
    textAlign: "center",
    textPosition: "bottom",
  };

  const handlePrint = () => {
    try {
      if (selectedProducts.length === 0) {
        alert("No products selected for printing");
        return;
      }

      const printContents = document.getElementById("print-section").innerHTML;
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
            height: calc(100% / 7 - 1px);
            // border: 1px solid black;
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            page-break-inside: avoid;
            padding: 20px;
          }
        
          .imageContainer{}

          .imageContainer img{
            padding: 1px;
            height: 37px;
            border: 1px dashed black;
            width: 70px;
            margin: 2px;
          }

          .parentRow {
            width: 100%;
            text-align: center;
          }
        
          .grid-item .row div {
            // margin-top: 2px;
            // margin-bottom: 2px;
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
            justify-content: end;
            align-items: center;
            text-align: center;
          }
          .numberColumn div {
            font-size: 25px;
            font-weight: 900;
            border: 1px solid black;
            color: black;
            margin: 1px;
            padding: 0px 3px 0px 3px;
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
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 300);
    } catch (error) {
      console.error("Printing failed:", error);
      alert("Printing failed. Please try again.");
    }
  };

  return (
    <div>
      <Button
        color="info"
        size="sm"
        onClick={handlePrint}
        disabled={selectedProducts.length === 0}
      >
        Print ({selectedProducts.length})
      </Button>

      <div className="page d-none" id="print-section">
        {selectedProducts.map((product, index) => (
          <div key={`${product.code}-${index}`} className="grid-item">
            <Row className="parentRow">
              <Col className="codeColumn text-left" md="8">
                {product.code}
              </Col>
              <Col className="imageContainer" md="4">
                <img alt="product" src={image} />
              </Col>

              <Col className="colorColumn" md="9">
                {product.color}
              </Col>
              <Col className="numberColumn" md="3">
                <div>{product.number}</div>
              </Col>

              <Col className="barcode-container" md="12">
                <Barcode
                  value={product.barcode}
                  text={`${product.price}€`}
                  {...barcodeOptions}
                />
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrintContainer;
