
import React, { useContext, useState } from "react";
import { TextField, Button, Container, Card, CardContent, Typography } from "@mui/material";
import { loginUser } from "../../services/UserService";
import { toast } from "react-toastify";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const redirect=useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Login submitted", formData);
    setLoading(true);
    loginUser(formData)
    .then((response) => {
        console.log(response.data);
        userContext.login(response.data);
        toast.success("Login successful");
        redirect("/profile");
        
    })
    .catch((error) => {
        // console.error(error);
        toast.error("Login failed");
    })
    .finally(() => {
        clearData();
        setLoading(false);
    });
  };
  const clearData = () => {
    setFormData({
        username: "",
        password: "",
    });
    }


  return (
    <Container maxWidth="sm" className="flex items-center justify-center min-h-screen ">
      <Card className="w-full text-center p-6 shadow-lg border-[10px] animate-wiggle animate-border">
        <CardContent>
          <Typography variant="h5" className="font-semibold mb-4">
            Login
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            </div>
            <div>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            </div>
            <div className="flex justify-center space-x-2 items-center">
                <div>
                    <Button type="submit" disabled={loading} variant="contained" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                        Login
                    </Button>
                </div>
                <div>
                    <Button type="reset" variant="contained" className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition" onClick={clearData}>
                        Reset
                    </Button>
                </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
