// modal.js
import React, { useState, useEffect } from "react";
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
import "./modal.css";
import {
  saveColorData,
  saveBrandData,
  saveSpecificTypeData,
  saveNumberData,
  editBrandData,
  editColorData,
  editNumberData,
  editTypeData,
  saveLocationsData,
  editLocationData,
} from "../api.js"; // Import API functions
import Alert from "../components/Alert/alert";

const AddItemModal = ({
  modalOpen,
  toggleModal,
  itemType,
  addNewItem,
  setTableData,
  editItemData,
  setEditItemData,
  notificationAlertRef,
  tableData,
  // updateModalData, // Receive the function to update modal data
}) => {
  let modalTitle = "";
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(editItemData); // Update formData when editItemData changes
  }, [editItemData]);

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
    case "types":
      modalTitle = "Add New Type";
      break;
    case "locations":
      modalTitle = "Add New Location";
      break;
    default:
      modalTitle = "";
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItemData({ ...editItemData, [name]: value }); // Update the modal data
  };

  const updateItemProperty = (formData, tableData) => {
    const updatedItems = tableData.map((item) => {
      if (item.id === formData.id) {
        const updatedItem = { ...item }; // Create a new object to hold the updated values
        const keys = Object.keys(formData);

        for (let j = 0; j < keys.length; j++) {
          const element = keys[j];
          updatedItem[element] = formData[element];
        }

        return updatedItem; // Return the updated item
      }

      return item;
    });

    setTableData(updatedItems);
    toggleModal();
    const options = Alert(
      200,
      `Item of ${itemType} with ID:${formData.id} has updated successfully`
    );
    notificationAlertRef.current.notificationAlert(options);
  };

  const handleSubmit = async () => {
    try {
      let data;
      if (!editItemData.id) {
        switch (itemType) {
          case "brands":
            data = await saveBrandData(formData);
            break;
          case "colors":
            data = await saveColorData(formData);
            break;
          case "numbers":
            data = await saveNumberData(formData);
            break;
          case "types":
            data = await saveSpecificTypeData(formData);
            break;
          case "locations":
            data = await saveLocationsData(formData);
            break;
          default:
            break;
        }
        const newObj = { id: data.data, ...formData };
        addNewItem(newObj);
      } else {
        switch (itemType) {
          case "brands":
            data = await editBrandData(formData);
            break;
          case "colors":
            data = await editColorData(formData);
            break;
          case "numbers":
            data = await editNumberData(formData);
            break;
          case "types":
            data = await editTypeData(formData);
            break;
          case "locations":
            data = await editLocationData(formData);
            break;
          default:
            break;
        }
        updateItemProperty(formData, tableData);
      }
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
                <Label for="type">Type</Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  value={editItemData.type || "shoes"}
                  onChange={handleInputChange}
                >
                  <option value="shoes">Shoes</option>
                  <option value="textile">Textile</option>
                </Input>
                <Label for="brandName">Brand Name</Label>
                <Input
                  type="text"
                  name="brandName"
                  id="brandName"
                  value={editItemData.brandName || ""}
                  placeholder="Enter Brand Name"
                  onChange={handleInputChange}
                />
                <Label for="stateName">Manufacturing Country</Label>
                <Input
                  type="text"
                  name="produced"
                  id="stateName"
                  value={editItemData.produced || ""}
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
                  value={editItemData.colorName || ""}
                  placeholder="Enter basic color name"
                  onChange={handleInputChange}
                />
                <Label for="albanian">Albanian Name</Label>
                <Input
                  type="text"
                  name="albanianName"
                  id="albanianName"
                  value={editItemData.albanianName || ""}
                  placeholder="Enter albanian color name"
                  onChange={handleInputChange}
                />
                <Label for="englishName">English Name</Label>
                <Input
                  type="text"
                  name="englishName"
                  id="englishName"
                  value={editItemData.englishName || ""}
                  placeholder="Enter english color name"
                  onChange={handleInputChange}
                />
                <Label for="turkishName">Turkish Name</Label>
                <Input
                  type="text"
                  name="turkishName"
                  id="turkishName"
                  value={editItemData.turkishName || ""}
                  placeholder="Enter turkish name"
                  onChange={handleInputChange}
                />
              </FormGroup>
            </>
          )}
          {itemType === "numbers" && (
            <>
              <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  value={editItemData.type || "shoes"}
                  onChange={handleInputChange}
                >
                  <option value="shoes">Shoes</option>
                  <option value="textile">Textile</option>
                </Input>
                <Label for="number">Number</Label>
                <Input
                  type="text"
                  name="number"
                  id="number"
                  value={editItemData.number || ""}
                  placeholder="Enter Number"
                  onChange={handleInputChange}
                />
              </FormGroup>
            </>
          )}
          {itemType === "types" && (
            <>
              <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  value={editItemData.type || "shoes"}
                  onChange={handleInputChange}
                >
                  <option value="shoes">Shoes</option>
                  <option value="textile">Textile</option>
                </Input>
                <Label for="specificType">Specific Type</Label>
                <Input
                  type="text"
                  name="specificType"
                  id="specificType"
                  value={editItemData.specificType || ""}
                  placeholder="Enter Type"
                  onChange={handleInputChange}
                />
              </FormGroup>
            </>
          )}
          {itemType === "locations" && (
            <>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={editItemData.name || ""}
                  placeholder="Enter Name"
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
