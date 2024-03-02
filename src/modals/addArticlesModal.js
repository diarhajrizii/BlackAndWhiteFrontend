import React, { useEffect, useState } from "react";
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
  editItemData,
  setEditItemData,
  tableData,
  setTableData,
  notificationMessage,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    article_id: "",
  });
  useEffect(() => {
    if (editItemData.id) {
      setFormData({
        name: editItemData.name || "",
        article_id: editItemData.article_id || "",
      });
    } else {
      setFormData({
        name: "",
        article_id: "",
      });
    }
  }, [editItemData]);

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

  const updateArticlesData = async (id, articlesData) => {
    try {
      const response = await fetch(`/api/v1/administration/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articlesData),
      });

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error updating administration article", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Validation logic can be added here

      if (editItemData.id) {
        const response = await updateArticlesData(editItemData.id, formData);
        if (response.success) {
          // Update the table data with the edited item
          const updatedTableData = tableData.map((item) =>
            item.id === editItemData.id ? { ...item, ...formData } : item
          );
          setTableData(updatedTableData);
          // Show success notification
          notificationMessage("Article Item updated successfully", "success");

          setEditItemData({});
          // Reset the form data
          setFormData({ name: "", article_id: "" });
        } else {
          notificationMessage("danger", "Error updating article data");
        }
      } else {
        // Adding new item
        const { data } = await saveArticlesData(formData);
        addNewItem({
          id: data,
          article_id: formData.article_id,
          name: formData.name,
          quantity: 0,
        });
        // Reset the form data
        setFormData({ name: "", article_id: "" });
      }

      // Close the modal
      toggleModal("articles");
    } catch (error) {
      notificationMessage("danger", "Error saving article data");
      console.log(error);
    }
  };

  return (
    <Modal
      className="record-sale-modal"
      isOpen={modalOpen}
      toggle={toggleModal}
    >
      <ModalHeader toggle={toggleModal}>
        {editItemData.id ? "Edit Article" : "Add Articles"}
      </ModalHeader>
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
            <Label for="article_id">Administration Number</Label>
            <Input
              type="text"
              name="article_id"
              id="article_id"
              value={formData.article_id}
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
