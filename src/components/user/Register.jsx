
import React, { useState } from "react";
import { TextField, Button, Container, Card, CardContent, Typography } from "@mui/material";
import { registerUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const redirect= useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    about: "",
    gender: "",

  });
  const [loading, setLoading] = useState(false);
  const clearData = () => {
    setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        about: "",
        gender: "",
    });
    };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    registerUser(formData)
    .then((res) => {
      console.log(res);
      toast.success("Registration Successful ! Please Login, to continue");
      redirect("/login");
    })
    .catch((err) => {
      // console.log(err.response.data);
      toast.error("Registration Failed ! Please try again");
    })
    .finally(() => {
      setLoading(false);
      clearData();
    }
    );
  };

  return (
    <Container maxWidth="sm" className="flex items-center justify-center min-h-screen  p-4">
      <Card className="pt-2 w-full text-center p-6 shadow-lg border-[10px] animate-wiggle animate-border" variant="elevation"  >
        <CardContent className="w-full space-y-4 " >
          <Typography variant="h5" className="font-semibold mb-8 p-4 ">
            Register
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4 p-2">
            <div className="space-y-4">
                <div>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    
                    name="name"
                    className="p-2"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                </div>
            <div>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              className="p-2"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            </div>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
                className="p-4 mb-7"
                
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            </div>
            <div className="space-y-4">
                <div>
                <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    className="p-2"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                </div>
            </div>
            <div className="space-y-4">
                <div>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              className="p-2"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            </div>
            </div>
            <div className="space-y-4">
                <div>
                <TextField
                  label="Gender"
                  variant="outlined"
                  fullWidth
                  className="p-2"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                />
                </div>
            </div>

            <div className="space-y-4">
            <div>
            <TextField
                label="About"
                variant="outlined"
                rows={2}
                multiline
                fullWidth
                className="p-2"
                name="about"
                value={formData.about}
                onChange={handleChange}
                required
            />
            </div>
            </div>
            <div className="flex justify-center items-center space-x-4">
                <div>
                    <Button type="submit" disabled={loading} variant="contained"  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                    Register
                    </Button>
                </div>
                <div>
                    <Button 
                    type="reset" 
                    variant="contained"  
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                    onClick={clearData}>
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

export default Register;
