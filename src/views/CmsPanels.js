import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import AddItemModal from "../modals/addItemsModal.js";
import DeleteItemModal from "../modals/deleteModal.js";
import ButtonGroupComponent from "components/Buttons/ButtonGroups.js";
import NotificationComponent from "../components/Alert/alert.js";

function CMSPanel() {
  const notificationComponentRef = useRef(new NotificationComponent());
  const [tableData, setTableData] = useState([]);
  const [activeButton, setActiveButton] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalItemType, setModalItemType] = useState("");
  const [editItemData, setEditItemData] = useState({});

  const fetchTableData = async (button) => {
    try {
      const response = await fetch(`/api/v1/panels/${button}`);
      const responseData = await response.json();
      setTableData(responseData.success ? responseData.data : []);
      setActiveButton(button);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTableData([]);
      setActiveButton("");
    }
  };

  useEffect(() => {
    fetchTableData("brands");
  }, []);

  const handleButtonClick = (button) => {
    if (button !== activeButton) {
      fetchTableData(button);
    }
  };

  const toggleModal = (itemType) => {
    setEditItemData({});
    setModalItemType(itemType);
    setModalOpen(!modalOpen);
  };

  const addNewItem = (formData) => {
    const updatedTableData = [...tableData, formData];
    setTableData(updatedTableData);
    toggleModal();
    notificationComponentRef.current.showNotification(
      `A new item has added to ${modalItemType} successfully`,
      "success"
    );
  };

  const renderTableHeaders = () => {
    switch (activeButton) {
      case "colors":
        return ["ID", "Color Name", "Albanian", "English", "Turkish", ""];
      case "brands":
        return ["ID", "Brand Name", "Produced", "Type", ""];
      case "numbers":
        return ["ID", "Number", "Type", ""];
      case "types":
        return ["ID", "Specific Type", "Type", ""];
      case "Locations":
        return ["ID", "Locations", ""];
      default:
        return [];
    }
  };

  const openEditModal = (item) => {
    setModalItemType(activeButton);
    setEditItemData(item);
    setModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setModalItemType(activeButton);
    setEditItemData(item);
    setDeleteModalOpen(true);
  };

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationComponent ref={notificationComponentRef} />
      </div>
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">CMS</h5>
              <CardTitle tag="h2">CMS Panel</CardTitle>
            </Col>
            <Col sm="6">
              <ButtonGroupComponent
                activeButton={activeButton}
                onButtonClick={handleButtonClick}
                buttons={["brands", "colors", "numbers", "types", "locations"]}
              />
            </Col>
            <Col sm="12">
              <Button
                color="primary"
                onClick={() => toggleModal(activeButton)}
                className="float-right"
              >
                Add
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table className="tablesorter" responsive>
            <thead className="text-primary">
              <tr>
                {renderTableHeaders().map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  {Object.keys(item).map((key, index) => (
                    <td key={index}>{item[key]}</td>
                  ))}
                  <td align="right" key={index}>
                    <Button color="link" onClick={() => openEditModal(item)}>
                      <i className="tim-icons icon-pencil" />
                      <span className="d-lg-none d-md-block">Edit</span>
                    </Button>
                    <Button color="link" onClick={() => openDeleteModal(item)}>
                      <i className="tim-icons icon-trash-simple" />
                      <span className="d-lg-none d-md-block">Delete</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <AddItemModal
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        itemType={modalItemType}
        notificationComponentRef={notificationComponentRef}
        addNewItem={addNewItem}
        setTableData={setTableData}
        tableData={tableData}
        editItemData={editItemData}
        setEditItemData={setEditItemData}
      />
      <DeleteItemModal
        modalOpen={deleteModalOpen}
        notificationComponentRef={notificationComponentRef}
        toggleModal={() => setDeleteModalOpen(!deleteModalOpen)}
        itemType={modalItemType}
        setTableData={setTableData}
        tableData={tableData}
        editItemData={editItemData}
        setEditItemData={setEditItemData}
      />
    </div>
  );
}

export default CMSPanel;
