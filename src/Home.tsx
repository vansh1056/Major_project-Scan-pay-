import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Html5QrcodeScanner,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";
import {
  Printer,
  Upload,
  Camera,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;


// Tell PDF.js to use the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;


function Home() {
  const [printerIP, setPrinterIP] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error" | "printing">("idle");
  const [message, setMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const costPerPage = 2;
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    return () => {
      scannerRef.current?.clear().catch((err) => {
        console.warn("Scanner cleanup failed:", err);
      });
    };
  }, []);

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
        const ipRegex =
          /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (ipRegex.test(decodedText)) {
          setPrinterIP(decodedText);
          setStatus("success");
          setMessage("Printer connected via QR successfully!");
          scannerRef.current?.clear();
        } else {
          setStatus("error");
          setMessage("Invalid QR Code. Not a valid IP address.");
        }
      },
      (error) => {
        console.error("QR scan error:", error);
      }
    );

    setStatus("scanning");
    setMessage("Scanner started...");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type !== "application/pdf") {
        setStatus("error");
        setMessage("Only PDF files are allowed.");
        return;
      }

      setSelectedFile(file);
      setMessage(`Selected file: ${file.name}`);
      setStatus("idle");

      // Count pages
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const typedarray = new Uint8Array(reader.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
          setPageCount(pdf.numPages);
          const cost = pdf.numPages * costPerPage;
          setTotalCost(cost);
        } catch (err) {
          setStatus("error");
          setMessage("Failed to read PDF file.");
          console.error("PDF parsing error:", err);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const confirmPrint = () => {
    if (!selectedFile || !printerIP || !pageCount || !totalCost) {
      setStatus("error");
      setMessage("Complete all steps before printing.");
      return;
    }
    setShowModal(true);
  };

  const handlePrint = async () => {
    setShowModal(false);
    if (!selectedFile || !printerIP) {
      setStatus("error");
      setMessage("Please scan a QR code and select a PDF file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      setStatus("printing");
      setMessage("Sending print job...");

      await axios.post(`http://${printerIP}/print`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await axios.post(`http://${printerIP}:5000/print`, formData, {
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
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 relative">
        <div className="flex items-center justify-center mb-6">
          <Printer className="h-12 w-12 text-green-400" />
          <h1 className="text-2xl font-bold ml-3 text-gray-200">QR Printer Control</h1>
        </div>

        {/* QR Scanner */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-300">Scan Printer QR Code</h2>
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

        {/* File Upload */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-300">Select PDF File</h2>
          <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-700 rounded-lg border-2 border-dashed border-gray-500 cursor-pointer hover:bg-gray-600 transition">
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-400">
              {selectedFile ? selectedFile.name : "Select PDF file"}
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Page Count & Cost */}
        {pageCount !== null && totalCost !== null && (
          <div className="mb-6 text-center text-sm text-gray-300">
            <p>Pages: <strong>{pageCount}</strong></p>
            <p>Total Cost: <strong>₹{totalCost}</strong></p>
          </div>
        )}

        {/* Print Button */}
        <button
          onClick={confirmPrint}
          disabled={!selectedFile || !printerIP}
          className={`w-full py-2 px-4 rounded-md transition-transform transform ${
            !selectedFile || !printerIP
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white"
          }`}
        >
          Print Document
        </button>

        {/* Status Message */}
        {message && (
          <div
            className={`mt-4 p-2 rounded-md text-center text-sm font-medium ${
              status === "success"
                ? "bg-green-600 text-green-100"
                : status === "error"
                ? "bg-red-600 text-red-100"
                : status === "printing"
                ? "bg-blue-700 text-blue-100"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {status === "success" && <CheckCircle className="inline w-4 h-4 mr-2" />}
            {status === "error" && <AlertCircle className="inline w-4 h-4 mr-2" />}
            {message}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600 max-w-sm w-full">
              <h3 className="text-xl text-white font-semibold mb-4">Confirm Print</h3>
              <p className="text-gray-300 mb-2">
                File: <strong>{selectedFile?.name}</strong>
              </p>
              <p className="text-gray-300 mb-2">
                Pages: <strong>{pageCount ?? "Calculating..."}</strong>
              </p>
              <p className="text-gray-300 mb-4">
                Total Cost: <strong>₹{totalCost ?? "--"}</strong>
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handlePrint}
                  className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
                >
                  Yes, Print
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
