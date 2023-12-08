import React, { useState, useEffect } from "react";
import classNames from "classnames";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import AddItemModal from "../modals/modal.js";
import DeleteItemModal from "../modals/deleteModal.js";
import NotificationAlert from "react-notification-alert";
import Alert from "../components/Alert/alert.js";

function CMSPanel() {
  const notificationAlertRef = React.useRef(null);
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
      setTableData(responseData.success ? responseData.data.data : []);
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
    const options = Alert(
      200,
      `A new item has added to ${modalItemType} successfully`
    );
    notificationAlertRef.current.notificationAlert(options);
  };

  const renderTableHeaders = () => {
    switch (activeButton) {
      case "colors":
        return ["ID", "Color Name", "Albanian", "English", "Turkish", ""];
      case "brands":
        return ["ID", "Brand Name", "Produced", ""];
      case "numbers":
        return ["ID", "Number", ""];
      case "types":
        return ["ID", "Type", ""];
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
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">CMS</h5>
              <CardTitle tag="h2">CMS Panel</CardTitle>
            </Col>
            <Col sm="6">
              <ButtonGroup
                className="btn-group-toggle float-right"
                data-toggle="buttons"
              >
                {["brands", "colors", "numbers", "types"].map((button) => (
                  <Button
                    key={button}
                    tag="label"
                    color="info"
                    size="sm"
                    className={classNames("btn-simple", {
                      active: activeButton === button,
                    })}
                    onClick={() => handleButtonClick(button)}
                  >
                    {button.charAt(0).toUpperCase() + button.slice(1)}
                  </Button>
                ))}
              </ButtonGroup>
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
        notificationAlertRef={notificationAlertRef}
        addNewItem={addNewItem}
        setTableData={setTableData}
        tableData={tableData}
        editItemData={editItemData}
        setEditItemData={setEditItemData}
      />
      <DeleteItemModal
        modalOpen={deleteModalOpen}
        notificationAlertRef={notificationAlertRef}
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
