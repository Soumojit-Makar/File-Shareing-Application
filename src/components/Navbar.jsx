import { Link, useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../helper/auth";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { DoorBackOutlined, FileCopySharp, Home, Login, Logout, NewReleases, People, PersonAdd, SignpostOutlined, Upload } from "@mui/icons-material";

function Navbar() {
  const userContext=useContext(UserContext);
  const redirect=useNavigate();
  const logoutHandaler=()=>{
    userContext.logout();
    redirect("/")
    toast.success("User Logout!!")
  }
  return (
    <nav className="flex justify-between p-5 contain-content items-center  bg-gray-800 text-white pb-2">
      <h2 className="text-2xl justify-center items-center contain-content"> <FileCopySharp/> MyApp</h2>
      <ul className="flex space-x-4 align-middle justify-center items-center">
        <li  ><Link to="/" className="hover:text-gray-400"><Home/> Home</Link></li>
        {!isUserLoggedIn()?(
          <>
        <li><Link to="/register" className="hover:text-gray-400"><PersonAdd/> Register</Link></li>
        <li><Link to="/login" className="hover:text-gray-400"><Login/> Login</Link></li>
        </>
        ):(
            <> 
            <li><Link to="/profile" className="hover:text-gray-400"><People/> Profile</Link></li>
            <li><Link to="/file" className="hover:text-gray-400"><Upload/> Upload</Link></li>
            <li>
              <Button type="button" variant="outlined" color="error" size="small" onClick={logoutHandaler}>
                <Logout/>
              </Button>
            </li>
            </>
        )
        }
      </ul>
    </nav>
  );
}

export default Navbar;