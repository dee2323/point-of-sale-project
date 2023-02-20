import React from 'react'
import './style.scss'
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { Tooltip } from '@mui/material';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import { NavLink } from 'react-router-dom'
import {
  signOut
} from "firebase/auth";
import { auth } from "../../config/firebase/firebase";


const Navbar: React.FC = () => {
  const handleLogout = async () => {
    try
    {
      await signOut(auth);



    } catch (error)
    {
      //   console.log(error.message);
    }
  };

  return (
    <div className="navbar">
      <NavLink to='/'>
        <p><Tooltip title="Home" ><HomeTwoToneIcon />
        </Tooltip></p>
      </NavLink>
      <NavLink to='/category'>
        <p><Tooltip title='Categories'>
          <CategoryTwoToneIcon /></Tooltip>
        </p>
      </NavLink>
      <NavLink to='/products'>
        <p>
          <Tooltip title='Products' >
            <Inventory2TwoToneIcon />
          </Tooltip>
        </p>
      </NavLink>
      <NavLink to='/login'>
        <p className="logout" onClick={handleLogout}>
          <Tooltip title='Logout'>
            <LogoutTwoToneIcon />
          </Tooltip>
        </p>
      </NavLink>

    </div>
  )

}

export default Navbar