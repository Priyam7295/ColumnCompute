import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Homepage.css";
import "./App.css";
import Papa from 'papaparse';
import GraphImage from "./assets/rb_17893.png";
import Navbar2 from "./components/Navbar2.jsx";
import { createClient } from "@supabase/supabase-js";
import swal from "sweetalert";
import { use } from "react";

const FileUpload = () => {
  const { user, isAuthenticated } = useAuth0();
  const [file, setFile] = useState(null);
  const [c3Data, setC3Data] = useState([]);
  const [c4Data, setC4Data] = useState([]);
  const [error, setError] = useState("");
  const [operation, setOperation] = useState("Mean");
  const [loading, setLoading] = useState(false);
  const [showGraph, setShowGraph] = useState(false); // Corrected default value
  const [c3nans, setC3nans] = useState();
  const [c4nans, setC4nans] = useState();
  const [c3list, setC3list] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [data, setData] = useState();
  const [isc3dataerror, setIsc3dataerror] = useState(false);
  const [isc4dataerror, setIsc4dataerror] = useState(false);
  const [columnC3, setColumnC3] = useState([]); // Initialize as an empty array
  const [c3Values, setc3Values] = useState([]); // Initialize as an empty array
  const [c4Values, setc4Values] = useState([]); // Initialize as an empty array

  const [anyOneAbsent, setAnyOneAbsent] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior
    setError(""); // Clear any previous errors
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false); // Set dragging state to false
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];

    // Acceptable MIME types for CSV and Excel files
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel", // Old Excel format
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // New Excel format
    ];

    if (droppedFile && !allowedTypes.includes(droppedFile.type)) {
      setError("Only CSV and Excel (XLSX) files are allowed.");
      setFile(null);
    } else {
      setFile(droppedFile);
      setError("");
      // Display filename in textarea
      e.target.value = droppedFile.name; // Set textarea value to filename
    }
    setIsDragging(false); // Reset dragging state after drop
    swal({
      // title: "File In",
      text: "File uploaded!",
      icon: "success",
      button: "Continue",
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // setFile(selectedFile);

    // Acceptable MIME types for CSV and Excel files
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel", // Old Excel format
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // New Excel format
    ];

    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      setError("Only CSV and Excel (XLSX) files are allowed.");
      setFile(null);
    } else {
      setError("");
      setFile(selectedFile);
    }


    
  };


  const showC3=()=>{
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data.map((row) => {
          return Object.fromEntries(
            Object.entries(row).map(([key, value]) => {
              const parsedValue = value;
              return [key, isNaN(parsedValue) ? null : parsedValue];
            })
          );
        });
        setData(data);

      },
    });
   

    const dataLength = data.length;  // Calculate the length once
    const c3Values = [];
    for (let i = 0; i < dataLength-1; i++) {
      const row = data[i];
      if (row.C3 && row.C3.trim() !== '') {  
        c3Values.push(row.C3);
        c3Values.push(" ");
      } else {
        // console.log("Nan");
        c3Values.push("Nan");  
        c3Values.push(" ");
      }
    }

    setc3Values(c3Values);
  }
  
  const showC4=()=>{
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data.map((row) => {
          return Object.fromEntries(
            Object.entries(row).map(([key, value]) => {
              const parsedValue = value;
              return [key, isNaN(parsedValue) ? null : parsedValue];
            })
          );
        });
        setData(data);
        
      },
    });
    
    
    const dataLength = data.length;  
    const c4Values=[]
    for (let i = 0; i < dataLength-1; i++) {
      const row = data[i];
      if (row.C4 && row.C4.trim() !== '') {  
        c4Values.push(row.C4); 
        c4Values.push(" ");
      } else {
        c4Values.push("Nan"); 
        c4Values.push(" ");
        
      }
    }
    setc4Values(c4Values);
    
  }

  useEffect(() => {
    console.log("File state updated:", file);
  }, [file]);

  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a CSV file to upload.");
      return;
    }

    const upload_uri = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    console.log(upload_uri);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("operation", operation);
    formData.append("email", user.email);
    formData.append("auth", user.sub);
    setLoading(true);
    try {
      const response = await axios.post(
        `${upload_uri}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from flask", response.data);
      console.log("Data type of the response:", typeof response.data);

      const { c3, c4, c3nans, c4nans } = response.data;
      setC3Data(c3 || []);
      setC4Data(c4 || []);
      setC3nans(c3nans);
      setC4nans(c4nans);
      setC3list(response.data.C3data);

      console.log(c3);
      console.log(c4);
      if (c3 == -1) {
        setIsc3dataerror(true);
      }
      if (c4 == -1) setIsc4dataerror(true);

      setError("");
    } catch (error) {
      if (error.response.status === 400) {
        setAnyOneAbsent(true);
      }
      setError("There was an issue uploading the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowColumnC1 = () => {
    const extractedData = data.map((row) => row.C1); // Assuming the column name is 'C1'
    setColumnC3(extractedData); // Update state to display C1 column
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  // Handle histogram button click
  const handleHistogramClick = () => {
    setShowGraph(true); // Show graph when button is clicked
  };

  return (
    <div className="container">
      <Navbar2 />

      <div className="main_box">
        <div className="upload_section">
          <div className="entry1">
            <h1 className="upload_csv">Upload CSV File</h1>
            <input
              className="fileupl"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />

            {error && <p className="error">{error}</p>}

            <div className="or">OR</div>

            <div
              className="drag-drop-area"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <textarea
                readOnly
                defaultValue=""
                className={isDragging ? "dragging" : ""}
              />
            </div>

            <div className="warning">
              <div className="warning_message">
                {isc3dataerror && (
                  <div className="warning_box">
                    <p className="warning_text">
                      <strong>Column C3:</strong> Data type is incompatible for
                      mathematical operations.
                    </p>
                  </div>
                )}
                {isc4dataerror && (
                  <div className="warning_box">
                    <p className="warning_text">
                      <strong>Column C4:</strong> Data type is incompatible for
                      mathematical operations.
                    </p>
                  </div>
                )}

                {anyOneAbsent && (
                  <div className="warning_box">
                    <p className="warning_text">
                      Ensure both C3 and C4 columns are present.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="result1">
            <div className="operation_section">
              <label htmlFor="operation" className="operation_label">
                Choose Operation:
              </label>
              <select
                id="operation"
                value={operation}
                onChange={handleOperationChange}
                className="operation_dropdown"
              >
                <option value="Sum">Sum</option>
                <option value="Mean">Mean</option>
                <option value="Std_deviation">Standard Deviation</option>
                <option value="Variance">Variance</option>
              </select>

              <div className="results">
                <h3>{operation}</h3>
                <div className="result-container">
                  <div>C3</div>
                  <div className="values_got">{c3Data}</div>
                  <div>C4</div>
                  <div className="values_got">{c4Data}</div>
                </div>
              </div>

              <div className="nan_section">
                <h3>NOTE:</h3>
                <div>
                  <span className="point">.</span>Rejecting Nan values
                </div>
                <div>
                  <span className="point">.</span> -1 indicates the datatype is
                  not float/integer
                </div>
                <div>Number of nans in C3: {c3nans}</div>
                <div>Number of nans in C4: {c4nans}</div>
              </div>
            </div>
          </div>
          <div>
            <button
              className="upload_button"
              onClick={handleFileUpload}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>

      <div className="sec-2">
        <button className="extract_cols" onClick={showC3}>Click here to Extract Columns</button>
        <br />
        <button className="showw" onClick={showC3}>View C3</button>
        <div className="scroll-container" >

            {c3Values}
        </div>
        

        <button className="showw" onClick={showC4}>View C4</button>
        <div className="scroll-container" >
          {c4Values}
        </div>
      </div>
      
    </div>
  );
};

export default FileUpload;
