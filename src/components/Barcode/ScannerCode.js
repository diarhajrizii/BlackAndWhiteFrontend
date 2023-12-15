import React, { useState, useEffect, useCallback } from "react";

const BarcodeScanner = ({ onBarcodeScanned }) => {
  const [scannedCode, setScannedCode] = useState("");

  const handleBarcodeScan = useCallback(
    (event) => {
      if (event.key === "Enter" && scannedCode.length > 0) {
        console.log("Scanned barcode:", scannedCode);

        if (typeof onBarcodeScanned === "function") {
          onBarcodeScanned(scannedCode);
        }

        setScannedCode("");
      } else if (event.key !== "Enter" && event.key.length === 1) {
        setScannedCode((prevCode) => prevCode + event.key);
      }
    },
    [scannedCode, onBarcodeScanned]
  );

  useEffect(() => {
    const eventListener = (event) => handleBarcodeScan(event);
    document.addEventListener("keydown", eventListener);

    return () => {
      document.removeEventListener("keydown", eventListener);
    };
  }, [handleBarcodeScan]);

  return null;
};

export default BarcodeScanner;
