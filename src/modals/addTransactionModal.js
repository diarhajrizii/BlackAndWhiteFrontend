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
  useTransactionUpdateMutation,
  useAddTransactionMutation,
} from "apiSlice";

const AddTransactionModal = ({
  modalOpen,
  toggleModal,
  itemType,
  addNewItem,
  setTableData,
  editItemData = { type: "hehe" },
  setEditItemData,
  notificationComponentRef,
  tableData,
  transactionsType,
}) => {
  const [updateTransaction] = useTransactionUpdateMutation();
  const [addTransaction] = useAddTransactionMutation();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(editItemData); // Update formData when editItemData changes
  }, [editItemData]);

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
    notificationComponentRef.current.showNotification(
      `Item of ${itemType} with ID:${formData.id} has updated successfully`,
      "success"
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(false);
      console.log(formData);
      if (!editItemData.id) {
        const data = await addTransaction(formData);
        const newObj = { id: data.data.data, ...formData };
        addNewItem(newObj);
      } else {
        await updateTransaction(formData);
        updateItemProperty(formData, tableData);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.error("Error saving data:", error);
      setLoading(false);
    }
  };

  return (
    <Modal className="add-item-modal" isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Add New Transaction</ModalHeader>
      <ModalBody>
        <Form>
          <>
            <FormGroup>
              <Label for="subType">Transaction subType</Label>
              <Input
                type="select"
                name="subType"
                id="subType"
                value={editItemData.subType}
                onChange={handleInputChange}
              >
                {transactionsType.map((transaction) => (
                  <option value={transaction.id}>{transaction.name}</option>
                ))}
              </Input>
              <Label for="transaction_type">Transaction Type</Label>
              <Input
                type="select"
                name="transaction_type"
                id="transaction_type"
                value={editItemData.transaction_type}
                onChange={handleInputChange}
              >
                <option value="outcome">Outcome</option>
                <option value="income">Income</option>
              </Input>
              <Label for="payment_type">Payment Type</Label>
              <Input
                type="select"
                name="payment_type"
                id="payment_type"
                value={editItemData.payment_type}
                onChange={handleInputChange}
              >
                <option value="outcome">Bank</option>
                <option value="income">Cash</option>
              </Input>
              <Label for="sale_price">Price</Label>
              <Input
                type="number"
                name="sale_price"
                id="sale_price"
                value={editItemData.sale_price || ""}
                placeholder="Enter Price"
                onChange={handleInputChange}
              />
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={editItemData.description || ""}
                placeholder="Add Description"
                onChange={handleInputChange}
              />
            </FormGroup>
          </>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={handleSubmit}
          //  disabled={loading}
        >
          {/* {loading ? "Saving..." : "Save"} */}
          Save
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddTransactionModal;
