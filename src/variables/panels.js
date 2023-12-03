import React, { useState } from "react";

function Panels() {
  const [activeButton, setActiveButton] = useState("colors");
  const [tableData, setTableData] = useState([]);

  const handleButtonClick = async (button) => {
    setActiveButton(button);
    try {
      let response;
      switch (button) {
        case "colors":
          response = await fetch("/api/v1/cms/colors");
          break;
        case "brands":
          response = await fetch("/api/v1/cms/brands");
          break;
        case "numbers":
          response = await fetch("/api/v1/cms/numbers");
          break;
        default:
          break;
      }
      const responseData = await response.json();
      setTableData(responseData.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTableData([]);
    }
  };

  const renderTable = () => {
    switch (activeButton) {
      case "colors":
        return (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Albanian</th>
                <th>English</th>
                <th>Turkish</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.sq}</td>
                  <td>{item.en}</td>
                  <td>{item.tr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "brands":
        return (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand Name</th>
                <th>Produced</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.produced}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "numbers":
        return (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Number</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <button onClick={() => handleButtonClick("colors")}>Colors</button>
      <button onClick={() => handleButtonClick("brands")}>Brands</button>
      <button onClick={() => handleButtonClick("numbers")}>Numbers</button>
      {renderTable()}
    </div>
  );
}

export default Panels;
