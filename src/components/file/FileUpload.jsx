import React, {  useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Button, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileList from "./FileList";
import { uploadFileToServer } from "../../services/FileService";
import { getUserId,isUserLoggedIn } from "../../helper/auth";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";

const FileUploadHandler=()=>{
  
  const [selectedFile, setSelectedFile] = useState(null);
  // const [uploadResponse, setUploadResponse] = useState(null);
  const [preview, setPreview] = useState(null);
  

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Create a preview of the selected file
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Create a preview of the selected file
    }
  };

  const uploadFile = async () => {
   
    uploadFileToServer(selectedFile, getUserId()).then((response) => {
      // setUploadResponse(response.data);
      // console.log("File uploaded successfully:", response.data);
      toast.success("File uploaded successfully!");
      // setUploadResponse(response.data);

    }).catch((error) => {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file!");
    });
  

    // console.log(formData);
    // // Uncomment and replace with actual API endpoint
    // // try {
    // //   const response = await fetch("https://example.com/upload", {
    // //     method: "POST",
    // //     body: formData,
    // //   });
    // //   const result = await response.json();
    // //   setUploadResponse(result);
    // // } catch (error) {
    // //   console.error("Error uploading file:", error);
    // // }
  };
  
  return (
    
    <Container maxWidth="sm" className=" w-full flex items-center justify-center min-h-screen p-4 flex-col space-y-4 ">
      <Card className="w-full text-center p-6 shadow-lg justify-center items-center flex">  
        <CardContent className="w-full space-y-4">
          <Typography variant="h5" className="font-semibold mb-4">
            Upload a File
          </Typography>
          <Box
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-blue-500 p-6 cursor-pointer rounded-lg hover:bg-blue-50 transition mb-4"
          >
            <Typography variant="body2" className="text-gray-500">
              Drag & Drop a file here
            </Typography>
          </Box>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Choose File
            </Button>
          </label>
          
          {selectedFile && (
            <Typography variant="body2" className="mt-3 text-gray-700">
              Selected File: <span className="font-semibold">{selectedFile.name}</span>
            </Typography>
          )}

          {preview && selectedFile && (
            <Box className="mt-4">
              <Typography variant="body2" className="mb-2 text-gray-700">
                File Preview:
              </Typography>
              {selectedFile.type.startsWith("image/") ? (
                <img src={preview} alt="Preview" className="w-full h-auto" />
              ) : (
                <Typography variant="body2" className="text-gray-500">
                  No preview available for this file type.
                </Typography>
              )}
            </Box>
          )}

          <Button
            variant="contained"
            onClick={uploadFile}
            className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            disabled={!selectedFile}
          >
            Submit
          </Button>

          {/* {uploadResponse && (
            <Typography variant="body2" className="mt-3 text-green-600">
              File uploaded successfully: <span className="font-semibold">{uploadResponse.fileName}</span>
            </Typography>
          )} */}
        </CardContent>
      </Card>
        <FileList/>
    </Container>
  
  );
}
const FileUpload = () => {
  
  const redirect=useNavigate();
  useEffect(() => {
    if (!isUserLoggedIn){
      redirect("/login")
    }
    
  },[redirect]);
  return ( <>
  {isUserLoggedIn && (
    <FileUploadHandler/>
  )}
  </>
  );
};

export default FileUpload;
