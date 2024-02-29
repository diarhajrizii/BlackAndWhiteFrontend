// AdministrationPanel.js
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
import AddAdministrationModal from "../modals/addArticlesModal.js";
import AddQuantityModal from "../modals/addQuantityModal.js";
import RecordSaleModal from "../modals/recordSaleModal.js";
import ButtonGroupComponent from "components/Buttons/ButtonGroups.js";
import NotificationComponent from "../components/Alert/alert.js";

function AdministrationPanel() {
  const notificationComponentRef = useRef(new NotificationComponent());
  const [tableData, setTableData] = useState([]);
  const [activeButton, setActiveButton] = useState("");
  const [articlesModalOpen, setArticlesModalOpen] = useState(false);
  const [quantityModalOpen, setQuantityModalOpen] = useState(false);
  const [salesModalOpen, setSalesModalOpen] = useState(false);
  const [editItemData, setEditItemData] = useState({});
  const [administrationSalesData, setAdministrationSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTableData("sales");
  }, []);

  const fetchTableData = async (button) => {
    try {
      setActiveButton(button);
      setIsLoading(true);
      setTableData([]);
      const articles = await fetch(
        `/api/v1/administration/articles?type=${button}`
      );
      const articlesData = await articles.json();
      const data = articlesData.data;
      setAdministrationSalesData(data);
      if (button === "sales") {
        const sales = await fetch(`/api/v1/administration/sales`);
        const salesData = await sales.json();
        setTableData(salesData.success ? salesData.data : []);
      } else {
        setTableData(articlesData.success ? data : []);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTableData([]);
      setIsLoading(false);
    }
  };

  const handleButtonClick = (button) => {
    if (button !== activeButton) {
      fetchTableData(button);
    }
  };

  const toggleModal = (itemType) => {
    console.log(itemType);
    if (itemType === "articles") {
      setArticlesModalOpen(true);
    } else if (itemType === "quantity") {
      setQuantityModalOpen(true);
    } else {
      setSalesModalOpen(true);
    }
    setEditItemData({});
    // setModalOpen(!modalOpen);
  };

  const addNewItem = (formData) => {
    const updatedTableData = [...tableData, formData];
    setTableData(updatedTableData);
    notificationComponentRef.current.showNotification(
      `A new item has added to successfully`,
      "success"
    );
  };

  const failedItem = (message) => {
    notificationComponentRef.current.showNotification(message, "danger");
  };

  const updateQuantity = (productId, quantityToAdd) => {
    const productIndex = tableData.findIndex(
      (product) => product.id === Number(productId)
    );

    // Create a new array with the updated quantity
    const updatedProducts = [...tableData];
    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      quantity: updatedProducts[productIndex].quantity + Number(quantityToAdd),
    };
    // Update the state with the new array
    setTableData(updatedProducts);
  };

  const renderTableHeaders = () => {
    // Adjust headers based on the active button
    switch (activeButton) {
      case "articles":
        return ["ID", "Article ID", "Name", "Quantity", ""];
      case "quantity":
        return ["ID", "Article Name", "Quantity", ""];
      case "sales":
        return ["ID", "Article Name", "Selling Price", "Sale Date", ""];
      default:
        return [];
    }
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
              <h5 className="card-category">Administration</h5>
              <CardTitle tag="h2">Administration Panel</CardTitle>
            </Col>
            <Col sm="6">
              <ButtonGroupComponent
                activeButton={activeButton}
                onButtonClick={handleButtonClick}
                buttons={["sales", "articles", "quantity"]}
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
                {!isLoading
                  ? renderTableHeaders().map((header, index) => (
                      <th key={index}>{header}</th>
                    ))
                  : ""}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  {Object.keys(item).map((key, index) => (
                    <td key={index}>{item[key]}</td>
                  ))}
                  <td align="right" key={index}>
                    {/* Buttons for editing and deleting (similar to CMSPanel) */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <AddQuantityModal
        modalOpen={quantityModalOpen}
        administrationSalesData={administrationSalesData}
        toggleModal={() => setQuantityModalOpen(!quantityModalOpen)}
        updateQuantity={updateQuantity}
        notificationComponentRef={notificationComponentRef}
        failedItem={failedItem}
      />
      <AddAdministrationModal
        modalOpen={articlesModalOpen}
        toggleModal={() => setArticlesModalOpen(!articlesModalOpen)}
        addNewItem={addNewItem}
        setTableData={setTableData}
        tableData={tableData}
        editItemData={editItemData}
        setEditItemData={setEditItemData}
        notificationComponentRef={notificationComponentRef}
        failedItem={failedItem}
      />
      <RecordSaleModal
        modalOpen={salesModalOpen}
        administrationSalesData={administrationSalesData}
        toggleModal={() => setSalesModalOpen(!salesModalOpen)}
        addNewItem={addNewItem}
        notificationComponentRef={notificationComponentRef}
        failedItem={failedItem}
      />
    </div>
  );
}

export default AdministrationPanel;
