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

const RecordSaleModal = ({
  modalOpen,
  toggleModal,
  addNewItem,
  administrationSalesData,
  failedItem,
}) => {
  const [formData, setFormData] = useState({
    articleId: "", // Updated the state to hold the selected article's ID
    price: "",
    article_name: "",
  });

  const RecordSaleData = async (articlesData) => {
    try {
      const response = await fetch("/api/v1/administration/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articlesData),
      });
      const responseData = await response.json();
      // Handle response data if needed
      return responseData; // Return response data if needed
    } catch (error) {
      console.error("Error saving brand data:", error);
      // Handle errors
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is the article select
    if (name === "articleId") {
      // Find the selected article based on the value
      const selectedArticle = administrationSalesData.find(
        (article) => article.id === Number(value)
      );

      setFormData({
        ...formData,
        articleId: Number(value),
        price: formData.price,
        article_name: selectedArticle ? selectedArticle.name : "", // Set the article_name
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      // Validation logic can be added here

      const {
        data: { createdAt, saleInsertID },
      } = await RecordSaleData(formData);

      // Call the addNewItem function with the form data
      addNewItem({
        id: saleInsertID,
        name: formData.article_name,
        price: formData.price,
        date: createdAt,
      });

      // Reset the form data
      setFormData({ articleId: "", price: "" });

      // Close the modal
      toggleModal("articles");
    } catch (error) {
      failedItem("Error on recording new administration sale");
      console.log(error);
    }
  };

  return (
    <Modal
      className="record-sale-modal"
      isOpen={modalOpen}
      toggle={toggleModal}
    >
      <ModalHeader toggle={toggleModal}>Record Sale</ModalHeader>
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
            <Label for="price">Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter Price"
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

export default RecordSaleModal;
