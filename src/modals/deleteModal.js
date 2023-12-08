import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./modal.css";
import { deleteItem } from "../api.js"; // Import API functions
import Alert from "../components/Alert/alert";

const deleteItemModal = ({
  modalOpen,
  toggleModal,
  itemType,
  setTableData,
  editItemData,
  setEditItemData,
  tableData,
  notificationAlertRef,
  // updateModalData, // Receive the function to update modal data
}) => {
  let modalTitle = "";
  let name = "";

  switch (itemType) {
    case "brands":
      modalTitle = "Delete Brand";
      name = "brand";
      break;
    case "colors":
      modalTitle = "Delete Color";
      name = "color";
      break;
    case "numbers":
      modalTitle = "Delete Number";
      name = "number";
      break;
    case "types":
      modalTitle = "Delete Type";
      name = "type";
      break;
    default:
      modalTitle = "";
      name = "";
  }

  const handleSubmit = async () => {
    try {
      const deletedID = editItemData.id;
      await deleteItem(name, { id: deletedID });

      let filteredProducts = tableData.filter(
        (product) => product.id !== deletedID
      );

      setTableData(filteredProducts);
      setEditItemData({});
      toggleModal();
      const options = Alert(
        200,
        `Item of ${itemType} with ID:${deletedID} Has deleted successfully`
      );
      notificationAlertRef.current.notificationAlert(options);
    } catch (error) {
      const options = Alert(400, `${error}`);
      notificationAlertRef.current.notificationAlert(options);
      console.error("Error saving data:", error);
    }
  };

  return (
    <Modal className="add-item-modal" isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>
      <ModalBody>
        <h4>Do you want to delete this {name} ?</h4>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleSubmit}>
          Delete
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default deleteItemModal;
