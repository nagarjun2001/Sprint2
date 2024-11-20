import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadEmployeeData } from "../../../redux/actions/Admin/Employee/CreateBulkEmployeeActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import excelImage from "../../../assets/excel.png";
import employeeTemplate from "../../../assets/Final_Template_Bulk_Employee.xlsx";
import DuplicateModal from "./DuplicateModal";
import Navbar from "../../NavbarComponent/AdminNavbar"; // Importing the Navbar
 
// Helper function to convert header to a key for the object
const convertHeaderToKey = (header) => {
  const headerMapping = {
    "Employee Name": "employeeName",
    "Employee Email": "employeeEmail",
    "Role": "role",
    "Work Location": "workLocation",
    "Manager Name": "managerName",
    "Manager Email": "managerEmail",
  };
  return headerMapping[header] || header.toLowerCase().replace(/\s+./g, (x) => x.charAt(1).toUpperCase());
};
 
// Validation for the uploaded data
const validateExcelData = (data) => {
  const errors = [];
  const requiredFields = ["employeeName", "employeeEmail", "role", "workLocation", "managerName", "managerEmail"];
  const invalidRecords = [];
 
  data.forEach((row, index) => {
    const rowNum = index + 1;
    let hasError = false;
 
    requiredFields.forEach((field) => {
      if (!row[field]) {
        errors.push(`Row ${rowNum}: ${field} is required`);
        hasError = true;
      }
    });
 
    // Check email format validity
    if (row.employeeEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.employeeEmail)) {
      errors.push(`Row ${rowNum}: Invalid Employee Email format`);
      hasError = true;
    }
    if (row.managerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.managerEmail)) {
      errors.push(`Row ${rowNum}: Invalid Manager Email format`);
      hasError = true;
    }
 
    // If the row has errors, add it to invalid records
    if (hasError) {
      invalidRecords.push(row);
    }
  });
 
  return { errors, isValid: errors.length === 0, invalidRecords };
};
 
// Convert Excel to JSON
const convertExcelToJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          defval: "",
          header: 1,
          blankrows: false,
        });
 
        const headers = jsonData[0];
        const formattedData = jsonData.slice(1).map((row) => {
          const rowData = {};
          headers.forEach((header, index) => {
            const key = convertHeaderToKey(header);
            rowData[key] = row[index] || "";
          });
          return Object.fromEntries(Object.entries(rowData).filter(([key, value]) => value !== "")); // remove empty values
        }).filter((row) => Object.keys(row).length > 0); // remove empty rows
 
        if (formattedData.length === 0) {
          reject(new Error("No valid records found in the spreadsheet"));
          return;
        }
 
        const validationResult = validateExcelData(formattedData);
        if (validationResult.errors.length > 0) {
          reject(new Error(validationResult.errors.join("\n")));
          return;
        }
 
        resolve({
          data: formattedData,
          invalidRecords: validationResult.invalidRecords, // invalid rows for preview
        });
      } catch (error) {
        reject(new Error(`Failed to parse Excel file: ${error.message}`));
      }
    };
    reader.onerror = (error) => {
      reject(new Error(`Error reading file: ${error.message}`));
    };
    reader.readAsArrayBuffer(file);
  });
};
 
// Helper function to find duplicates based on employeeEmail
const findDuplicates = (data) => {
  const seen = new Map();
  const duplicates = [];
 
  data.forEach((item, index) => {
    if (seen.has(item.employeeEmail)) {
      duplicates.push({
        original: seen.get(item.employeeEmail),
        duplicate: item,
      });
    } else {
      seen.set(item.employeeEmail, item);
    }
  });
 
  return duplicates;
};
 
const CreateBulkEmployee = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [duplicateData, setDuplicateData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalData, setFinalData] = useState(null); // Holds the final selected data (unique + selected duplicates)
  const [invalidRecords, setInvalidRecords] = useState([]); // Holds invalid records
 
  // Handle file input change
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === "text/csv" || selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
      setFile(selectedFile);
      setError("");
      setValidationError("");
      try {
        const { data, invalidRecords } = await convertExcelToJson(selectedFile);
        const duplicates = findDuplicates(data);
        const uniqueData = data.filter(item => !duplicates.some(duplicate => duplicate.original.employeeEmail === item.employeeEmail));
 
        setParsedData(data);
        setDuplicateData(duplicates);
        setFinalData(uniqueData); // Only unique records are added to finalData initially.
        setInvalidRecords(invalidRecords); // Store invalid records
 
        if (duplicates.length > 0) {
          setIsModalOpen(true); // Show modal to resolve duplicates
        }
      } catch (err) {
        setError(err.message);
        setParsedData(null);
        setDuplicateData([]);
        setInvalidRecords([]);
      }
    } else {
      setError("Please upload a valid CSV or XLSX file.");
      setFile(null);
      setParsedData(null);
      setDuplicateData([]);
      setInvalidRecords([]);
    }
  };
 
  // Handle file drop
  const handleDrop = async (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile && (selectedFile.type === "text/csv" || selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
      setFile(selectedFile);
      setError("");
      setValidationError("");
      try {
        const { data, invalidRecords } = await convertExcelToJson(selectedFile);
        const duplicates = findDuplicates(data);
        const uniqueData = data.filter(item => !duplicates.some(duplicate => duplicate.original.employeeEmail === item.employeeEmail));
 
        setParsedData(data);
        setDuplicateData(duplicates);
        setFinalData(uniqueData); // Only unique records are added to finalData initially.
        setInvalidRecords(invalidRecords); // Store invalid records
 
        if (duplicates.length > 0) {
          setIsModalOpen(true); // Show modal to resolve duplicates
        }
      } catch (err) {
        setError(err.message);
        setParsedData(null);
        setDuplicateData([]);
        setInvalidRecords([]);
      }
    } else {
      setError("Please upload a valid CSV or XLSX file.");
      setFile(null);
      setParsedData(null);
      setDuplicateData([]);
      setInvalidRecords([]);
    }
  };
 
  // Handle submit action
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!finalData || finalData.length === 0) {
      setValidationError("No valid data has been uploaded. Please check the Excel file and update the values.");
      return;
    }
    dispatch(uploadEmployeeData(finalData)); // Submit final data
    setFile(null);
    setParsedData(null);
    setFinalData(null);
    setValidationError("");
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
  };
 
  const onConfirmSelection = (selectedData) => {
    // Append selected duplicates to the final data
    setFinalData(prevFinalData => [...prevFinalData, ...selectedData]);
 
    // Close the modal after confirmation
    setIsModalOpen(false);
  };
 
  const downloadTemplate = () => {
    const link = document.createElement("a");
    link.href = employeeTemplate;
    link.download = "employee_bulk_data_template.xlsx";
    link.click();
  };
 
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="max-w-2xl w-full mt-20 bg-white p-6 rounded shadow-lg mx-auto">
      <div className="flex justify-center mb-6">
          <h2 className="text-2xl font-semibold text-[#27235C]">Employee Bulk upload</h2>
        </div>
        {/* File Upload */}
        <div className="relative border-dashed border-2 p-6 text-center mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            onDrop={handleDrop}
            accept=".csv, .xlsx"
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer w-full h-full">
            {file ? (
              <>
                <img src={excelImage} alt="Excel File" className="w-16 h-16 mb-2" />
                <span className="text-black text-lg">{file.name}</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faArrowUpFromBracket} className="text-black text-6xl mb-2" />
                <span className="text-black text-lg">Click to Upload CSV or XLSX File</span>
                <span className="text-black text-sm">or drag and drop your CSV or XLSX file here</span>
              </>
            )}
          </label>
          {file && (
            <div className="flex items-center mt-4 text-gray-700">
              <FontAwesomeIcon
                icon={faTimes}
                className="text-red-500 cursor-pointer text-2xl font-bold"
                onClick={() => setFile(null)}
              />
            </div>
          )}
        </div>
 
        {validationError && <div className="text-red-500 mt-4">{validationError}</div>}
        {error && <div className="text-red-500 mt-4">{error}</div>}
 
        {/* Data Preview */}
        {finalData && finalData.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Preview Data</h3>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  {Object.keys(finalData[0]).map((key) => (
                    <th key={key} className="py-2 px-4 border-b text-left">{key.replace(/([A-Z])/g, ' $1').trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {finalData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                      <td key={idx} className="py-2 px-4 border-b">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
 
        {/* Invalid Records */}
        {invalidRecords.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4 text-center text-red-600">Invalid Records</h3>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-red-100">
                  {Object.keys(invalidRecords[0]).map((key) => (
                    <th key={key} className="py-2 px-4 border-b text-left">{key.replace(/([A-Z])/g, ' $1').trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invalidRecords.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                      <td key={idx} className="py-2 px-4 border-b">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
 
        {/* Download Template Button */}
        <div className="mt-4">
          <button
            onClick={downloadTemplate}
            className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Download Template
          </button>
        </div>
 
        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-900 text-white rounded hover:bg-blue-600"
          >
            Submit Data
          </button>
        </div>
 
        {/* Duplicate Modal */}
        <DuplicateModal
          isOpen={isModalOpen}
          duplicates={duplicateData}
          onClose={closeModal}
          onConfirmSelection={onConfirmSelection}
        />
      </div>
    </div>
  );
};
 
export default CreateBulkEmployee;