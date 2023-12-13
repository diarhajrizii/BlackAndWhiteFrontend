import React, { useState, useCallback } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
} from "reactstrap";
import "./modal.css";
import { transferProducts } from "../api.js";
import Alert from "../components/Alert/alert";

const TransferModal = ({
  modalOpen,
  productsData,
  toggleModal,
  locationsData,
  notificationAlertRef,
}) => {
  const [location, setLocation] = useState("");

  const selectedProductIds = productsData
    .filter((product) => product.selected)
    .map((product) => product.id);

  const handleTransfer = async () => {
    try {
      if (!location) throw new Error("Please select location!");
      if (selectedProductIds.length === 0)
        throw new Error("Please select products!");

      const response = await transferProducts(selectedProductIds, location);
      if (!response.success) throw new Error(response.message);

      toggleModal();
      const options = Alert(
        200,
        `Products with those IDs ${selectedProductIds.join(
          ", "
        )} have been transferred successfully`
      );
      notificationAlertRef.current.notificationAlert(options);
    } catch (error) {
      const options = Alert(400, `${error}`);
      notificationAlertRef.current.notificationAlert(options);
      console.error("Error saving data:", error.message);
    }
  };

  const handleTransferChange = useCallback((e) => {
    setLocation(e.target.value);
  }, []);

  return (
    <Modal className="add-item-modal" isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Transfer Products</ModalHeader>
      <ModalBody>
        <h4>Where do you want to transfer these products?</h4>
        <FormGroup>
          <label>Location</label>
          <Input type="select" value={location} onChange={handleTransferChange}>
            {locationsData.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleTransfer}>
          Transfer
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TransferModal;
