import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import "./modal.css"; // You can create a separate CSS file for SaleModal styles

const SaleModal = ({ selectedProducts, toggle, sellProducts }) => {
  const [saleData, setSaleData] = useState(
    selectedProducts.map((product) => ({
      regular_price: product.price,
      id: product.id,
      price: "",
      paymentType: "cash",
      bank: "",
      type: product.type,
      sale_type: "store",
    }))
  );

  const handleSellProducts = () => {
    sellProducts(saleData);
  };

  const handleInputChange = (event, productId, field) => {
    const updatedSaleData = saleData.map((product) => {
      if (product.id === productId) {
        return { ...product, [field]: event.target.value };
      }
      return product;
    });

    setSaleData(updatedSaleData);
  };

  return (
    <Modal isOpen={true} toggle={toggle} className="add-item-modal">
      <ModalHeader toggle={toggle}>Sale Modal</ModalHeader>
      <ModalBody>
        {selectedProducts.map((product) => (
          <div key={product.id} className="sale-item">
            <Row>
              <Col sm="12">
                <h5>
                  Model: <b>{product.code}</b> Regular Price:
                  <b> {product.price}€</b>
                </h5>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for={`price_${product.id}`}>Price</Label>
                  <Input
                    type="text"
                    id={`price_${product.id}`}
                    value={
                      saleData.find((item) => item.id === product.id)?.price ||
                      ""
                    }
                    onChange={(e) => handleInputChange(e, product.id, "price")}
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for={`paymentType_${product.id}`}>Payment Type</Label>
                  <Input
                    type="select"
                    id={`paymentType_${product.id}`}
                    value={
                      saleData.find((item) => item.id === product.id)
                        ?.paymentType || "cash"
                    }
                    onChange={(e) =>
                      handleInputChange(e, product.id, "paymentType")
                    }
                  >
                    <option value="cash">Cash</option>
                    <option value="bank">Bank</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for={`sale_${product.id}`}>Sale Type</Label>
                  <Input
                    type="select"
                    id={`sale_${product.id}`}
                    value={
                      saleData.find((item) => item.id === product.id)
                        ?.sale_type || "store"
                    }
                    onChange={(e) =>
                      handleInputChange(e, product.id, "sale_type")
                    }
                  >
                    <option value="store">Store</option>
                    <option value="online">Online</option>
                  </Input>
                </FormGroup>
              </Col>
              {saleData.find((item) => item.id === product.id)?.paymentType ===
                "bank" && (
                <Col sm="12">
                  <FormGroup>
                    <Label for={`bank_${product.id}`}>Bank</Label>
                    <Input
                      type="select"
                      id={`bank_${product.id}`}
                      value={
                        saleData.find((item) => item.id === product.id)?.bank ||
                        ""
                      }
                      onChange={(e) => handleInputChange(e, product.id, "bank")}
                    >
                      <option value="NLB">NLB</option>
                      <option value="PCB">PCB</option>
                      <option value="TEB">TEB</option>
                    </Input>
                  </FormGroup>
                </Col>
              )}
            </Row>
          </div>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSellProducts}>
          Sell
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SaleModal;
