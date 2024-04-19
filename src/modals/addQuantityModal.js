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

const AddQuantityModal = ({
  modalOpen,
  toggleModal,
  updateQuantity,
  administrationSalesData,
  notificationMessage,
}) => {
  const [formData, setFormData] = useState({
    articleId: "",
    quantity: 0,
  });

  const insertQuantityData = async ({ articleId, quantity }) => {
    try {
      const response = await fetch("/api/v1/administration/add-quantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          article_id: articleId,
          added_quantity: quantity,
        }),
      });
      const responseData = await response.json();
      // Handle response data if needed
      return responseData; // Return response data if needed
    } catch (error) {
      console.error("Error on updating quantity of article", error);
      // Handle errors
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await insertQuantityData(formData);

      updateQuantity(formData.articleId, formData.quantity);

      // Reset the form data
      setFormData({ articleId: "", quantity: "" });

      // Close the modal
      toggleModal("quantity");
    } catch (error) {
      notificationMessage("danger", "Error on updating quantity of article");
      console.log(error);
    }
    setFormData({ articleId: "", quantity: 0 });

    // Close the modal
    toggleModal();
  };
  return (
    <Modal
      className="record-sale-modal"
      isOpen={modalOpen}
      toggle={toggleModal}
    >
      <ModalHeader toggle={toggleModal}>Add Quantity</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="articleId">Select Article</Label>
            <Input
              type="select"
              name="articleId"
              id="articleId"
              value={formData.articleId}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select an article
              </option>
              {administrationSalesData.map((article) => (
                <option key={article.id} value={article.id}>
                  {article.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="quantity">Quantity</Label>
            <Input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter Quantity"
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

export default AddQuantityModal;
