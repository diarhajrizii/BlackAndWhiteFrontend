import React, { useState, useEffect, useRef } from "react";
import "../assets/css/print-products.css";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";
import TransferItemsModal from "../modals/transferModal";
import PrintContainer from "components/Print/PrintContainer";
import BarcodeScanner from "components/Barcode/ScannerCode";
import { fetchProducts, fetchLocations } from "components/Api/FetchFunctions";
import FilterForm from "./../components/Forms/FilterForms";
import NotificationComponent from "../components/Alert/alert";

const ProductList = () => {
  // State declarations
  const notificationComponentRef = useRef(new NotificationComponent());
  const [products, setProducts] = useState([]);
  const [printProducts, setPrintProducts] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [codeFilter, setCodeFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [locationsData, setLocationsData] = useState([]);

  // Constants
  const columns = [
    "id",
    "brand",
    "color",
    "number",
    "specific_type",
    "code",
    "location",
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
    "Locations",
    "Quantity",
    "Price",
  ];

  // Use Effect to fetch products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await fetchProducts("productList");
        const fetchedLocations = await fetchLocations();
        setProducts(fetchedProducts);
        setLocationsData(fetchedLocations);
      } catch (error) {
        console.error(error);
        notificationComponentRef.current.showNotification(
          "Error on fetching data",
          "danger"
        );
      }
    };

    fetchData();
  }, []);

  const openTransferModal = () => {
    if (filteredProducts.length !== 0) {
      setTransferModalOpen(true);
    } else {
      notificationComponentRef.current.showNotification(
        "Please select a product to transfer",
        "danger"
      );
    }
  };

  // Handlers
  const handleProductSelection = (productId) => {
    const updatedPrintProducts = printProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, selected: !product.selected };
      }
      return product;
    });
    setPrintProducts(updatedPrintProducts);
    setFilteredProducts(updatedPrintProducts);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
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
    setPrintProducts(updatedFilteredProducts);
  };

  const handleAllProductSelection = () => {
    const allSelected = printProducts.every((product) => product.selected);
    const updatedPrintProducts = printProducts.map((product) => ({
      ...product,
      selected: !allSelected,
    }));
    setFilteredProducts(updatedPrintProducts);
    setPrintProducts(updatedPrintProducts);
  };

  const selectAll = () => {
    setFilteredProducts(products);
    setPrintProducts(products);
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
    const startDateObject = startDate ? new Date(startDate) : null;
    const endDateObject = endDate ? new Date(endDate) : null;

    const filtered = products.filter((product) => {
      const productDate = new Date(product.date);
      const startDateCondition =
        !startDateObject || productDate >= startDateObject;
      const endDateCondition = !endDateObject || productDate <= endDateObject;

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
      return (
        startDateCondition &&
        endDateCondition &&
        codeCondition &&
        brandCondition
      );
    });
    if (!scannedCode) {
      setFilteredProducts(filtered);
      setPrintProducts(filtered);
    } else {
      handleBarcodeData(filtered);
    }
  };

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
              <Col className="text-right" sm="6">
                <PrintContainer printProducts={printProducts} />
              </Col>
              <Col sm="12">
                <FilterForm
                  startDate={startDate}
                  endDate={endDate}
                  codeFilter={codeFilter}
                  brandFilter={brandFilter}
                  handleStartDateChange={handleStartDateChange}
                  handleEndDateChange={handleEndDateChange}
                  handleCodeFilterChange={handleCodeFilterChange}
                  handleBrandFilterChange={handleBrandFilterChange}
                  handleSubmit={handleSubmit}
                  openTransferModal={openTransferModal}
                  selectAll={selectAll}
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
                      checked={printProducts.every(
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
                          printProducts.find((p) => p.id === product.id)
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
        <TransferItemsModal
          modalOpen={transferModalOpen}
          notificationComponentRef={notificationComponentRef}
          toggleModal={() => setTransferModalOpen(!transferModalOpen)}
          productsData={printProducts}
          locationsData={locationsData}
          setFilteredProducts={setFilteredProducts}
        />
      </div>
    </>
  );
};

export default ProductList;
