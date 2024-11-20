
import React, { useState } from 'react';

const DuplicateModal = ({ isOpen, duplicates, onClose, onConfirmSelection }) => {
  // State to store individual email selections in a key-value format (email: 'original' or 'duplicate')
  const [selections, setSelections] = useState({});
  const [selectionError, setSelectionError] = useState(false); // Error state to show message if no selection is made

  // If modal is not open, return null to hide it
  if (!isOpen) return null;

  // Handle the selection of a record (either original or duplicate) for a specific email
  const handleSelection = (email, recordType) => {
    setSelections((prevSelections) => {
      const newSelections = { ...prevSelections };
      if (newSelections[email] === recordType) {
        delete newSelections[email]; // Deselect if clicked again
      } else {
        newSelections[email] = recordType; // Set the selected record type for this email
      }
      return newSelections;
    });
  };

  // Handle confirm submission of the selected records
  const handleConfirm = () => {
    // Check if any selection has been made
    if (Object.keys(selections).length === 0) {
      // If no selections, show the error message
      setSelectionError(true);
      return; // Prevent data submission
    }

    // If there are selections, proceed to prepare the final data
    const finalData = duplicates.map((dup) => {
      const selectedType = selections[dup.employeeEmail];

      if (selectedType) {
        // Return the original or duplicate record based on the selection
        return selectedType === 'original' ? dup.original : dup.duplicate;
      }
      return null; // If no selection was made for this email, return null
    }).filter(Boolean); // Filter out null values

    // Pass the final selected data to the parent
    onConfirmSelection(finalData);

    // Close modal after submission
    onClose();
  };

  const renderRecordDetails = (record, email, recordType) => {
    const isChecked = selections[email] === recordType;
    return (
      <tr className={recordType === 'original' ? 'bg-white border-b' : 'bg-gray-100 border-b'}>
        <td className="py-3 px-4">{record.employeeName}</td>
        <td className="py-3 px-4">{record.employeeEmail}</td>
        <td className="py-3 px-4">{record.role}</td>
        <td className="py-3 px-4">{record.workLocation}</td>
        <td className="py-3 px-4">{record.managerName}</td>
        <td className="py-3 px-4">{record.managerEmail}</td>
        <td className="py-3 px-4 text-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleSelection(email, recordType)}
          />
        </td>
      </tr>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-3/4 max-w-6xl shadow-lg overflow-y-auto h-auto max-h-[90vh]">
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Duplicate Employee Records Found</h3>

        {/* Show an error message if no records are selected */}
        {selectionError && (
          <div className="text-red-500 text-center mb-4">
            Please select at least one record (either original or duplicate) before confirming.
          </div>
        )}

        <table className="min-w-full table-auto border-collapse mb-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left text-gray-700">Employee Name</th>
              <th className="py-3 px-4 text-left text-gray-700">Email</th>
              <th className="py-3 px-4 text-left text-gray-700">Role</th>
              <th className="py-3 px-4 text-left text-gray-700">Work Location</th>
              <th className="py-3 px-4 text-left text-gray-700">Manager Name</th>
              <th className="py-3 px-4 text-left text-gray-700">Manager Email</th>
              <th className="py-3 px-4 text-left text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {duplicates.map((dup, index) => (
              <React.Fragment key={index}>
                <tr className="bg-white border-b">
                  <td className="py-3 px-4 font-semibold" colSpan="7">Original Record</td>
                </tr>
                {renderRecordDetails(dup.original, dup.employeeEmail, 'original')}

                <tr className="bg-white border-b">
                  <td className="py-3 px-4 font-semibold" colSpan="7">Duplicate Record</td>
                </tr>
                {renderRecordDetails(dup.duplicate, dup.employeeEmail, 'duplicate')}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => {
              // Close the modal without sending any data to the parent
              onClose();
            }}
            className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition-all duration-200"
          >
            Close
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateModal;
