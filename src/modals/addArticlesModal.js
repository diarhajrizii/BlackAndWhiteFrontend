// addArticlesModal.js
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

const AddArticlesModal = ({
  modalOpen,
  toggleModal,
  addNewItem,
  failedItem,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    administrationNumber: "",
  });

  const saveArticlesData = async (articlesData) => {
    try {
      const response = await fetch("/api/v1/administration/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articlesData),
      });

      const responseData = await response.json();

      return responseData; // Return response data if needed
    } catch (error) {
      console.error("Error saving administration article", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Validation logic can be added here

      // Call the addNewItem function with the form data
      const { data } = await saveArticlesData(formData);
      addNewItem({
        id: data,
        articles_id: formData.administrationNumber,
        name: formData.name,
        quantity: 0,
      });

      // Reset the form data
      setFormData({ name: "", administrationNumber: "" });

      // Close the modal
      toggleModal("articles");
    } catch (error) {
      failedItem("Error saving article data");
      console.log(error);
    }
  };

  return (
    <Modal
      className="record-sale-modal"
      isOpen={modalOpen}
      toggle={toggleModal}
    >
      <ModalHeader toggle={toggleModal}>Add Articles</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Article Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Article Name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="administrationNumber">Administration Number</Label>
            <Input
              type="text"
              name="administrationNumber"
              id="administrationNumber"
              value={formData.administrationNumber}
              onChange={handleInputChange}
              placeholder="Enter Administration Number"
            />
          </FormGroup>
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

export default AddArticlesModal;
