import React, { useState, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Printer, Upload, CheckCircle, AlertCircle, Camera } from "lucide-react";
import axios from "axios";

function Home() {
  const [printerIP, setPrinterIP] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const startScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
    }

    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        supportedFormats: [Html5QrcodeSupportedFormats.QR_CODE],
      },
      false
    );

    scannerRef.current.render(
      (decodedText) => {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (ipRegex.test(decodedText)) {
          setPrinterIP(decodedText);
          setStatus("success");
          setMessage("QR Code scanned successfully!");
          scannerRef.current?.clear();
        } else {
          setStatus("error");
          setMessage("Invalid IP address format in QR code");
        }
      },
      (error) => {
        console.error("QR scan error:", error);
      }
    );

    setStatus("scanning");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handlePrint = async () => {
    if (!selectedFile || !printerIP) {
      setStatus("error");
      setMessage("Please scan a QR code and select a PDF file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      setStatus("idle");
      setMessage("Sending print job...");

      await axios.post(`http://${printerIP}/print`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("success");
      setMessage("Print job sent successfully!");
    } catch (error) {
      setStatus("error");
      setMessage("Failed to send print job. Please try again.");
      console.error("Print error:", error);
    }
  };

  return (
    <div className="h-full bg-gray-900 text-gray-100 p-8 flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
        <div className="flex items-center justify-center mb-6">
          <Printer className="h-12 w-12 text-green-400" />
          <h1 className="text-2xl font-bold ml-3 text-gray-200">QR Printer Control</h1>
        </div>

        {/* QR Scanner Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-300">1. Scan Printer QR Code</h2>
          {!printerIP && (
            <button
              onClick={startScanner}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              <Camera className="h-5 w-5 mr-2" /> Start Scanner
            </button>
          )}
          <div id="qr-reader" className="mt-4 border border-gray-600 rounded-lg p-2"></div>
          {printerIP && (
            <div className="mt-2 p-2 bg-gray-700 rounded-md text-center text-green-300">
              <p className="text-sm">Printer IP: {printerIP}</p>
            </div>
          )}
        </div>

        {/* File Upload Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-300">2. Select PDF File</h2>
          <div className="flex items-center justify-center w-full">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-700 rounded-lg border-2 border-dashed border-gray-500 cursor-pointer hover:bg-gray-600 transition">
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-400">
                {selectedFile ? selectedFile.name : "Select PDF file"}
              </span>
              <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
            </label>
          </div>
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          disabled={!selectedFile || !printerIP}
          className={`w-full py-2 px-4 rounded-md transition-transform transform ${
            !selectedFile || !printerIP
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white"
          }`}
        >
          Print Document
        </button>
      </div>
    </div>
  );
}

export default Home;
