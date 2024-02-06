import useScanDetection from "use-scan-detection-react18";

const ScannerCode = ({ onBarcodeScanned }) => {
  useScanDetection({
    onComplete: (code) => {
      console.log({ code });
      if (code) {
        onBarcodeScanned(code);
      } else {
        return null;
      }
    },
  });
};

export default ScannerCode;
