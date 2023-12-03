import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { saveColorData, saveBrandData, saveNumberData } from "../api.js"; // Import API functions

import "./modal.css"; // Importing the CSS file

const AddItemModal = ({ modalOpen, toggleModal, itemType }) => {
  const [formData, setFormData] = useState({}); // State to hold form data

  let modalTitle = "";

  switch (itemType) {
    case "brands":
      modalTitle = "Add New Brand";
      break;
    case "colors":
      modalTitle = "Add New Color";
      break;
    case "numbers":
      modalTitle = "Add New Number";
      break;
    default:
      modalTitle = "";
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      switch (itemType) {
        case "brands":
          await saveBrandData(formData);
          break;
        case "colors":
          await saveColorData(formData);
          break;
        case "numbers":
          await saveNumberData(formData);
          break;
        default:
          break;
      }
      setFormData({});
      toggleModal();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Modal className="add-item-modal" isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>
      <ModalBody>
        <Form>
          {itemType === "brands" && (
            <>
              <FormGroup>
                <Label for="brandName">Brand Name</Label>
                <Input
                  type="text"
                  name="brandName"
                  id="brandName"
                  placeholder="Enter Brand Name"
                  onChange={handleInputChange}
                />
                <Label for="stateName">Manufacturing Country</Label>
                <Input
                  type="text"
                  name="stateName"
                  id="stateName"
                  placeholder="Enter Manufacturing Country name"
                  onChange={handleInputChange}
                />
              </FormGroup>
            </>
          )}
          {itemType === "colors" && (
            <>
              <FormGroup>
                <Label for="colorName">Color Name</Label>
                <Input
                  type="text"
                  name="colorName"
                  id="colorName"
                  placeholder="Enter basic color name"
                  onChange={handleInputChange}
                />
                <Label for="albanian">Albanian Name</Label>
                <Input
                  type="text"
                  name="albanianName"
                  id="albanianName"
                  placeholder="Enter albanian color name"
                  onChange={handleInputChange}
                />
                <Label for="englishName">English Name</Label>
                <Input
                  type="text"
                  name="englishName"
                  id="englishName"
                  placeholder="Enter english color name"
                  onChange={handleInputChange}
                />
                <Label for="turkishName">Turkish Name</Label>
                <Input
                  type="text"
                  name="turkishName"
                  id="turkishName"
                  placeholder="Enter turkish name"
                  onChange={handleInputChange}
                />
              </FormGroup>
            </>
          )}
          {itemType === "numbers" && (
            <>
              <FormGroup>
                <Label for="number">Number</Label>
                <Input
                  type="text"
                  name="number"
                  id="number"
                  placeholder="Enter Number"
                  onChange={handleInputChange}
                />
              </FormGroup>
            </>
          )}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddItemModal;
