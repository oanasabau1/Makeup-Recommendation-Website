import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const [reportFormat, setReportFormat] = useState('csv');
  const [userReportFormat, setUserReportFormat] = useState('csv');

  const handleDownloadReport = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/saveProducts`, {
        params: { format: reportFormat },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `makeup_products.${reportFormat}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const handleDownloadUserReport = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/saveUsers`, {
        params: { format: userReportFormat },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `users.${userReportFormat}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Page</h1>
      <div className="admin-buttons">
        <Link to="/addProduct">
          <button className="admin-button">Add Product</button>
        </Link>
        <div className="dropdown-container">
          <label htmlFor="reportFormat">Download Report about Makeup Products in format:</label>
          <select
            id="reportFormat"
            value={reportFormat}
            onChange={(e) => setReportFormat(e.target.value)}
            className="dropdown-select"
          >
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
            <option value="xml">XML</option>
          </select>
          <button onClick={handleDownloadReport} className="download-button">Download</button>
        </div>
        <div className="dropdown-container">
          <label htmlFor="userReportFormat">Download Report about Users in format:</label>
          <select
            id="userReportFormat"
            value={userReportFormat}
            onChange={(e) => setUserReportFormat(e.target.value)}
            className="dropdown-select"
          >
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
            <option value="xml">XML</option>
          </select>
          <button onClick={handleDownloadUserReport} className="download-button">Download</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
