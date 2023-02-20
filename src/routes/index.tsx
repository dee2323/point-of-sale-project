import React from 'react'
import Login from '../views/logIn';
import POS from '../views/posPage';
import ProductsPage from '../views/Products';
import { Routes, Route } from 'react-router-dom'
import AuthProvider from '../context/auth';
import PrivateRoute from '../context/PrivateRoute';
import CategoryPage from '../views/category';
const Router: React.FC = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <POS />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <PrivateRoute>
                            <ProductsPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/category"
                    element={
                        <PrivateRoute>
                            <CategoryPage />
                        </PrivateRoute>
                    }
                />
            </Routes></AuthProvider>
    )
}

export default Router