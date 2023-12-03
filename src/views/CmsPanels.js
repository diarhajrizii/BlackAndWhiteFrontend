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
import AddItemModal from "../modals/modal.js"; // Import the AddItemModal component

function CMSPanel() {
  const [tableData, setTableData] = useState([]);
  const [activeButton, setActiveButton] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItemType, setModalItemType] = useState("");

  const fetchTableData = async (button) => {
    try {
      const response = await fetch(`/api/v1/cms/${button}`);
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
    fetchTableData("brands"); // Set default table to "brands"
  }, []); // Empty dependency array to run this effect only once

  const handleButtonClick = (button) => {
    if (button !== activeButton) {
      fetchTableData(button);
    }
  };

  // ... existing functions (fetchTableData, handleButtonClick, renderTableHeaders)

  const toggleModal = (itemType) => {
    setModalItemType(itemType);
    setModalOpen(!modalOpen);
  };

  const renderTableHeaders = () => {
    switch (activeButton) {
      case "colors":
        return ["ID", "Color Name", "Albanian", "English", "Turkish", ""];
      case "brands":
        return ["ID", "Brand Name", "Produced", ""];
      case "numbers":
        return ["ID", "Number", ""];
      default:
        return [];
    }
  };
  return (
    <>
      <div className="content">
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
                  <Button
                    tag="label"
                    color="info"
                    size="sm"
                    className={classNames("btn-simple", {
                      active: activeButton === "brands",
                    })}
                    onClick={() => handleButtonClick("brands")}
                  >
                    Brands
                  </Button>
                  <Button
                    tag="label"
                    color="info"
                    size="sm"
                    className={classNames("btn-simple", {
                      active: activeButton === "colors",
                    })}
                    onClick={() => handleButtonClick("colors")}
                  >
                    Colors
                  </Button>
                  <Button
                    tag="label"
                    color="info"
                    size="sm"
                    className={classNames("btn-simple", {
                      active: activeButton === "numbers",
                    })}
                    onClick={() => handleButtonClick("numbers")}
                  >
                    Numbers
                  </Button>
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
                      <Button color="link">
                        <i class="tim-icons icon-pencil"></i>
                        <span className="d-lg-none d-md-block">Edit</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
      <Button
        color="primary"
        onClick={() => toggleModal(activeButton)}
        className="float-right"
      >
        Add
      </Button>
      <AddItemModal
        modalOpen={modalOpen}
        toggleModal={() => toggleModal(activeButton)}
        itemType={modalItemType}
      />
    </>
  );
}

export default CMSPanel;
