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


  return (
    <div className="navbar">

      <p><Tooltip title="Home" ><HomeTwoToneIcon />
      </Tooltip></p>


      <p><Tooltip title='Categories'>
        <CategoryTwoToneIcon /></Tooltip>
      </p>


      <p>
        <Tooltip title='Products' >
          <Inventory2TwoToneIcon />
        </Tooltip>
      </p>


      <p className="logout">
        <Tooltip title='Logout'>
          <LogoutTwoToneIcon />
        </Tooltip>
      </p>


    </div>
  )

}

export default Navbar