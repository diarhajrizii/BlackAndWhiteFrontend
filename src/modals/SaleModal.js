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
  const [paymentTypes, setPaymentTypes] = useState({});

  const handleSellProducts = () => {
    const updatedSaleData = selectedProducts.map((product) => {
      const price = document.getElementById(`price_${product.id}`).value;
      const paymentType = paymentTypes[product.id] || "cash";
      const bank = paymentType === "bank" ? "NLB" : "";
      return {
        id: product.id,
        regular_price: product.price,
        price,
        paymentType,
        bank,
      };
    });

    sellProducts(updatedSaleData);
  };

  const handlePaymentTypeChange = (event, productId) => {
    const paymentType = event.target.value;
    setPaymentTypes((prevPaymentTypes) => ({
      ...prevPaymentTypes,
      [productId]: paymentType,
    }));
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
              <Col sm="6">
                <FormGroup>
                  <Label for={`price_${product.id}`}>Price</Label>
                  <Input type="text" id={`price_${product.id}`} />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label for={`paymentType_${product.id}`}>Payment Type</Label>
                  <Input
                    type="select"
                    id={`paymentType_${product.id}`}
                    onChange={(e) => handlePaymentTypeChange(e, product.id)}
                  >
                    <option value="cash">Cash</option>
                    <option value="bank">Bank</option>
                  </Input>
                </FormGroup>
              </Col>
              {paymentTypes[product.id] === "bank" && (
                <Col sm="6">
                  <FormGroup>
                    <Label for={`bank_${product.id}`}>Bank</Label>
                    <Input type="select" id={`bank_${product.id}`}>
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
