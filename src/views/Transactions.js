import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  CardTitle,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import {
  fetchProducts,
  fetchTransactionsData,
  fetchTransactionsTypes,
} from "components/Api/FetchFunctions";
import FilterForm from "./../components/Forms/FilterForms";
import BarcodeScanner from "components/Barcode/ScannerCode";
import SaleModal from "modals/SaleModal";
import NotificationComponent from "components/Alert/alert";
import AddItemModal from "modals/addTransactionModal";

const Transactions = () => {
  // States for product search and sales data
  const notificationComponentRef = useRef(new NotificationComponent());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editItemData, setEditItemData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [codeFilter, setCodeFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [transactionsType, setTransactionsType] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Constants
  const columns = [
    "id",
    "brand",
    "color",
    "number",
    "specific_type",
    "code",
    "quantity",
    "price",
  ];
  const tableHeaders = [
    "ID",
    "Brand",
    "Color",
    "Number",
    "Type",
    "Code",
    "Quantity",
    "Price",
  ];
  const transactionsColumns = [
    "id",
    "brand_name",
    "color_name",
    "number",
    "product_specific_types",
    "code",
    "product_price",
    "payment_type",
    "bank_name",
    "sale_price",
  ];

  const transactionsTableHeaders = [
    "ID",
    "Brand",
    "Color",
    "Number",
    "Type",
    "Code",
    "Price",
    "Payment Type",
    "Bank Name",
    "Sale Price",
  ];

  const [selectedProducts, setSelectedProducts] = useState([]); // State to store selected products
  const [showSaleModal, setShowSaleModal] = useState(false); // State to control the sale modal visibility

  // Fetch products function (similar to ProductList fetchProducts)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedSalesData = await fetchTransactionsData(startDate);
        setTableData(fetchedSalesData);
        if (!products.length) {
          const fetchedProducts = await fetchProducts("sales", startDate);
          setProducts(fetchedProducts);
        }
        const fetchedTransactionsType = await fetchTransactionsTypes();
        setTransactionsType(fetchedTransactionsType);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [startDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    setSelectedDate(event.target.value);
  };

  const resetFilteredProducts = () => {
    setBrandFilter("");
    setCodeFilter("");
    setFilteredProducts([]);
  };

  const removeSalesProduct = (saleData) => {
    saleData.map((saleProduct) => {
      // Reset FilteredProducts if needed
      // setFilteredProducts([]);
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== saleProduct.id)
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== saleProduct.id)
      );
    });
  };

  const handleProductSelection = (productId) => {
    const updatedFilteredProducts = filteredProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, selected: !product.selected };
      }
      return product;
    });
    setFilteredProducts(updatedFilteredProducts);
  };

  const handleCodeFilterChange = (event) => {
    setCodeFilter(event.target.value);
  };

  const handleBrandFilterChange = (event) => {
    setBrandFilter(event.target.value);
  };

  const handleBarcodeData = (filtered) => {
    // Check if items already exist based on unique identifiers (e.g., ID)
    const existingIds = filteredProducts.map((item) => item.id);
    const newItems = filtered.filter((item) => !existingIds.includes(item.id));

    // Merge new items into filteredProducts
    const updatedFilteredProducts = [...filteredProducts, ...newItems];
    setFilteredProducts(updatedFilteredProducts);
  };

  const handleBarcodeScanned = (scannedValue) => {
    const syntheticEvent = {
      preventDefault: () => {}, // Add event methods you need to use
      target: {
        value: scannedValue, // Pass scanned value if needed
        barcode: scannedValue,
      },
    };

    handleSubmit(syntheticEvent);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const scannedCode = event?.target?.barcode;

    const filtered = products.filter((product) => {
      const codeCondition =
        !codeFilter ||
        product.code.toLowerCase().includes(codeFilter.toLowerCase());
      const brandCondition =
        !brandFilter ||
        product.brand.toLowerCase().includes(brandFilter.toLowerCase());
      if (scannedCode) {
        const barcodeCondition = scannedCode === product.barcode;
        return barcodeCondition;
      }
      return codeCondition && brandCondition;
    });
    if (!scannedCode) {
      setFilteredProducts(filtered);
    } else {
      handleBarcodeData(filtered);
    }
  };

  const toggleModal = (itemType) => {
    setEditItemData({});
    // setModalItemType(itemType);
    setModalOpen(!modalOpen);
  };

  const handleAllProductSelection = () => {
    const allSelected = filteredProducts.every((product) => product.selected);
    const updatedFilteredProducts = filteredProducts.map((product) => ({
      ...product,
      selected: !allSelected,
    }));
    setFilteredProducts(updatedFilteredProducts);
  };
  const handleSale = () => {
    const selected = filteredProducts.filter((product) => product.selected);
    setSelectedProducts(selected);
    setShowSaleModal(true);
  };

  const addNewItem = (formData) => {
    // const updatedTableData = [...tableData, formData];
    // setTableData(updatedTableData);
    toggleModal();
    notificationComponentRef.current.showNotification(
      // `A new item has added to ${modalItemType} successfully`,
      "success"
    );
  };

  const openEditModal = (item) => {
    console.log(item, "Item");
    setEditItemData(item);
    setModalOpen(true);
  };

  const sellProducts = async (saleData) => {
    try {
      const response = await fetch("/api/v1/products/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleData),
      });

      if (response.ok) {
        const data = await response.json();
        setShowSaleModal(false); // Close the modal after handling the sale data
        removeSalesProduct(saleData);

        notificationComponentRef.current.showNotification(
          `${
            saleData?.length > 1 ? "Products are" : "Product is"
          } register to sales successfully`,
          "success"
        );
      } else {
        notificationComponentRef.current.showNotification(
          `Error selling products`,
          "danger"
        );
        throw new Error("Failed to sell products");
      }
    } catch (error) {
      console.error("Error selling products:", error);
      // Handle error scenario, e.g., display an error message to the user
    }
  };

  // ... (existing code)

  return (
    <>
      <div className="content">
        <BarcodeScanner onBarcodeScanned={handleBarcodeScanned} />
        <NotificationComponent ref={notificationComponentRef} />
        <Card>
          <CardHeader>
            <Row>
              <Col className="text-left" sm="6">
                <h5 className="card-category">CMS</h5>
                <CardTitle tag="h2">Products</CardTitle>
              </Col>
              <Col sm="12">
                <FilterForm
                  codeFilter={codeFilter}
                  brandFilter={brandFilter}
                  handleCodeFilterChange={handleCodeFilterChange}
                  handleBrandFilterChange={handleBrandFilterChange}
                  handleSubmit={handleSubmit}
                  handleSale={handleSale}
                  resetFilteredProducts={resetFilteredProducts}
                />
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table className="tablesorter productsTable" responsive>
              <thead className="text-primary">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                  <th>
                    <input
                      type="checkbox"
                      checked={filteredProducts.every(
                        (product) => product.selected
                      )}
                      onChange={handleAllProductSelection}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={index}>
                    {columns.map((key, index) => (
                      <td className={key} key={index}>
                        {product[key]}
                      </td>
                    ))}
                    <td>
                      <input
                        type="checkbox"
                        checked={
                          filteredProducts.find((p) => p.id === product.id)
                            ?.selected
                        }
                        onChange={() => handleProductSelection(product.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Row>
              <Col className="text-left" sm="3">
                <h5 className="card-category">Transactions</h5>
                <CardTitle tag="h2">Products</CardTitle>
              </Col>
              <Col sm="9">
                <Button
                  color="primary"
                  onClick={() => toggleModal()}
                  className="float-right"
                >
                  Add
                </Button>
              </Col>
              <Col sm="12" className="text-center">
                <Col sm="6">
                  <FormGroup>
                    <Label for="startDate">Start Date</Label>
                    <Input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={handleStartDateChange}
                    />
                  </FormGroup>
                </Col>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table className="tablesorter productsTable" responsive>
              <thead className="text-primary">
                <tr>
                  {transactionsTableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((sale, index) => (
                  <tr key={index}>
                    {transactionsColumns.map((key, index) => (
                      <td className={key} key={index}>
                        {sale[key]}
                      </td>
                    ))}
                    <td align="right" key={index}>
                      <Button color="link" onClick={() => openEditModal(sale)}>
                        <i className="tim-icons icon-pencil" />
                        <span className="d-lg-none d-md-block">Edit</span>
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={transactionsColumns.length - 1}></td>
                  {/* <td>Total Sale Price:</td> */}
                  <td className="text-success text-right">
                    {/* Calculate and display total sale price */}
                    {tableData
                      .reduce(
                        (total, sale) =>
                          Number(total) + Number(sale.sale_price || 0),
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>

        <AddItemModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          // itemType={modalItemType}
          // notificationComponentRef={notificationComponentRef}
          transactionsType={transactionsType}
          addNewItem={addNewItem}
          setTableData={setTableData}
          tableData={tableData}
          editItemData={editItemData}
          setEditItemData={setEditItemData}
        />

        {/* {showSaleModal && (
          <SaleModal
            selectedProducts={selectedProducts}
            // banks={banks} // Pass banks data if available
            toggle={() => setShowSaleModal(!showSaleModal)}
            sellProducts={sellProducts}
            setSales={setSales}
          />
        )} */}
      </div>
    </>
  );
};

export default Transactions;
