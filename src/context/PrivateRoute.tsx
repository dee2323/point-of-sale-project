
import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { AuthContext } from './auth';

interface Props {
  children: React.ReactElement | null;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { user }: any = useContext(AuthContext)

  return (
    user ? children : <Navigate to="/login" />
  )
}


export default PrivateRoute;