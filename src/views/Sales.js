import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  CardTitle,
  Button,
} from "reactstrap";
import { fetchProducts, fetchSalesData } from "components/Api/FetchFunctions";
import FilterForm from "./../components/Forms/FilterForms";
import BarcodeScanner from "components/Barcode/ScannerCode";
import SaleModal from "modals/SaleModal";
import { number } from "prop-types";

const SalesPage = () => {
  // States for product search and sales data
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [codeFilter, setCodeFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sales, setSales] = useState([]);

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
  const salesColumns = [
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

  const salesTableHeaders = [
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
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const fetchedSalesData = await fetchSalesData(formattedDate);
        setSales(fetchedSalesData);
        if (!products.length) {
          const fetchedProducts = await fetchProducts("sales", formattedDate);
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedDate]);

  // Handlers
  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleProductSelection = (productId) => {
    const updatedPrintProducts = filteredProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, selected: !product.selected };
      }
      return product;
    });
    setFilteredProducts(updatedPrintProducts);
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

  const handleAllProductSelection = () => {
    const allSelected = filteredProducts.every((product) => product.selected);
    const updatedPrintProducts = filteredProducts.map((product) => ({
      ...product,
      selected: !allSelected,
    }));
    setFilteredProducts(updatedPrintProducts);
  };
  const handleSale = () => {
    const selected = filteredProducts.filter((product) => product.selected);
    setSelectedProducts(selected);
    setShowSaleModal(true);
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
        console.log("Sale Data:", data);
        setShowSaleModal(false); // Close the modal after handling the sale data
      } else {
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
        <Card>
          <CardHeader>
            {/* <h5 className="card-category">Sales</h5> */}
            <Row>
              <Col className="text-left" sm="3">
                <h5 className="card-category">Sales</h5>

                {/* <h5 className="card-category">CMS</h5> */}
                <CardTitle tag="h2">Products</CardTitle>
              </Col>
              <Col sm="12" className="text-center">
                <Button onClick={handlePreviousDay}>&lt;</Button>
                <span className="mx-1">{selectedDate.toDateString()}</span>
                <Button onClick={handleNextDay}>&gt;</Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table className="tablesorter productsTable" responsive>
              <thead className="text-primary">
                <tr>
                  {salesTableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr key={index}>
                    {salesColumns.map((key, index) => (
                      <td className={key} key={index}>
                        {sale[key]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td colSpan={salesColumns.length - 1}></td>
                  {/* <td>Total Sale Price:</td> */}
                  <td className="text-success text-right">
                    {/* Calculate and display total sale price */}
                    {sales
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

        {showSaleModal && (
          <SaleModal
            selectedProducts={selectedProducts}
            // banks={banks} // Pass banks data if available
            toggle={() => setShowSaleModal(!showSaleModal)}
            sellProducts={sellProducts}
            setSales={setSales}
          />
        )}
      </div>
    </>
  );
};

export default SalesPage;
