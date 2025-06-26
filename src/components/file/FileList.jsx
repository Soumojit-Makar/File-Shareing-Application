import React, { useState, useEffect } from "react";
import { Container, Card, CardContent, Typography, Button, Box, TextField, Pagination, CircularProgress } from "@mui/material";
import { Delete, DeleteOutline, DownhillSkiing, Download } from "@mui/icons-material";
import { deleteFileToServer, getFiles, searchFile } from "../../services/FileService";
import { toast } from "react-toastify";

const FileList = () => {
  const [files, setFiles] = useState([
    
  ]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("fileName");
  const [sortDir, setSortDir] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      pageNumber,
      pageSize,
      sortBy,
      sortDir,
      ...(keyword && { keyword }),
    });

    try {
      // const response = await fetch(`/file/search?${queryParams.toString()}`);
      // const data = await response.json();
      const data = {
        content: [
          { id: 1, fileName: "file1.txt" },
          { id: 2, fileName: "file2.txt" },
          { id: 3, fileName: "file3.txt" },
          { id: 4, fileName: "file4.txt" },
          { id: 5, fileName: "file5.txt" },
          { id: 6, fileName: "file6.txt" },
          { id: 7, fileName: "file7.txt" },
          { id: 8, fileName: "file8.txt" },
          { id: 9, fileName: "file9.txt" },
          { id: 10, fileName: "file10.txt" },
        ],
        totalPages: 2,
        totalElements: 10,
      };
      setFiles(data.content
      );
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  // const deleteFile = (fileId) => {
    // try {
    //   const response = await fetch(`/file/${fileId}`, {
    //     method: "DELETE",
    //   });
    //   if (response.status === 202) {
    //     fetchFiles(); // Reload files after deletion
    //   }
  //   // } catch (error) {
  //   //   console.error("Error deleting file:", error);
  //   // }
  //   setLoading(true)
  //   deleteFileToServer(fileId)
  //   .then((response)=>{
  //     console.log(response.data)
  //   })
  //   .catch((err)=>{
  //     toast.error("Can not delete file !!")
  //   })
  //   .finally(()=>{
  //     setLoading(false)
  //   })
  // };
  const handleDeleteFile = (fileId) => {
    setLoading(true);
    deleteFileToServer(fileId)
      .then((res) => {
        toast.success("File deleted!");
        // fetchFiles(); // reload list
      })
      .catch((err) => {
        console.error(err);
        toast.error("Cannot delete file.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true)
    if(keyword==""){
      getFiles(pageNumber)
      .then((response)=>{
        console.log(response.data)
        setFiles(response.data.content)
        setPageNumber(response.data.pageNumber)
        setPageSize(response.data.pageSize)
        setTotalElements(response.data.totalElements)
        setTotalPages(response.data.totalPages)
  
      })
      .catch((err)=>[
        // console.log(err)
      ])
      .finally(()=>{
          setLoading(false)
      })
    }else{
      searchFile(keyword,pageNumber)
      .then((response)=>{
        console.log(response.data)
        setFiles(response.data.content)
        setPageNumber(response.data.pageNumber)
        setPageSize(response.data.pageSize)
        setTotalElements(response.data.totalElements)
        setTotalPages(response.data.totalPages)
  
      })
      .catch((err)=>[
        // console.log(err)
      ])
      .finally(()=>{
          setLoading(false)
      })
    }
  }, [pageNumber, pageSize, sortBy, sortDir, keyword]);

  return (
      <Card className="w-full p-6 shadow-lg">
        <CardContent>
          <Typography variant="h5" className="font-semibold mb-4">
            File List
          </Typography>

          {/* Search Box */}
          <Box className="mb-4">
            <TextField
              label="Search Files"
              variant="outlined"
              fullWidth
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Box>
          {files.length>0?(
            <>
          {/* Files List */}
          {loading ? (
            <CircularProgress />
          ) : (
            <Box className="mb-4">
              {files.map((file) => (
                <Box key={file.fileId} className="flex justify-between items-center mb-2">
                  <Typography variant="body1">{file.fileName}</Typography>
                  <Button href={file.url} startIcon={<Download/>} color="primary" variant="outlined">
                    Download
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteFile(file.fileId)}
                  >
                    Delete
                  </Button>
                </Box>
              ))}
            </Box>
          )}
          </>
        ):(
          <Typography variant="body1" color="error" align="center">Not Found</Typography>
        )}

          {/* Pagination */}
          <Box className="mt-4 flex justify-center">
            <Pagination
              count={totalPages}
              page={pageNumber + 1}
              onChange={(_, newPage) => setPageNumber(newPage - 1)}
              siblingCount={2}
              color="primary"
            />
          </Box>

          {/* Pagination and File Count */}
          <Box className="mt-2 text-center">
            <Typography variant="body2">
              Showing {pageNumber * pageSize + 1} -{" "}
              {Math.min((pageNumber + 1) * pageSize, totalElements)} of {totalElements} files
            </Typography>
          </Box>
        </CardContent>
      </Card>
  );
};

export default FileList;
