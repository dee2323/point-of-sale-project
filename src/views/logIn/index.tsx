import React from "react";
import Button from "../../components/common/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "./style.scss";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try
            {
                await signInWithEmailAndPassword(auth, values.email, values.password);
                navigate("/");
            } catch (error)
            {
                setFieldError("password", "Invalid email or password");
            }
            setSubmitting(false);
        },
    });

    return (
        <div className="background">
            <div className="login-container">
                <div className="left-side">
                    <img src="./images/shop.jpg" />
                    <h2>Get started</h2>
                    <p>use for your sales bussnise</p>
                </div>
                <div className="right-side">
                    <form onSubmit={formik.handleSubmit}>
                        <h2>Get started</h2>
                        <p>please login with your Email and use for your sales bussnise</p>
                        <input
                            type="text"
                            placeholder="Email"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p className="erro">{formik.errors.email}</p>
                        ) : null}
                        <input
                            type="password"
                            placeholder="password"
                            {...formik.getFieldProps("password")}
                        />
                        <Button text="login" onClick={() => { }} />
                    </form>
                    <p className="error">{formik.errors.password}</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
