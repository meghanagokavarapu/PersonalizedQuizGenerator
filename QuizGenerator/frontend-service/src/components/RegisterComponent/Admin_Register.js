import { useFormik } from 'formik';
import {
    MDBCol,
    MDBContainer,
    MDBRow
} from 'mdb-react-ui-kit';
import React from 'react';
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import '../../css/style.css';

export default function Register() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            pharmaname: '',
            licensenumber: '',
            phone: '',
            email: '',
            streetname: '',
            city: '',
            state: '',
            postalcode: '',
            country: '',
            password: '',
            confirmpassword: '',
        },
        onSubmit: async (values) => {
            try {
                console.log(values);
                const response = await fetch('http://localhost:3000/api/v1/user-service/user/save/pharma-register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const responseJson = await response.json();
                console.log("data :", responseJson);

                if (responseJson.status === 200) {
                    alert("Pharma registered successfully!!!");
                    navigate("/login");
                    return;
                }

                if (responseJson.status === 500) {
                    alert(responseJson.message);
                    navigate("/pharma-register");
                    return;
                }
            } catch (error) {
                console.error("Error during login:", error);
                alert("An error occurred. Please try again later.");
            }
        },
        onChange: values => {

            console.log("I am doing change ...")

        },
        validationSchema: yup.object().shape({
            pharmaname: yup.string()
                .matches(/^[A-Za-z\s]+$/, 'Pharma Name can only contain alphabets')
                .min(3, 'Pharma Name is too short')
                .max(10, 'Pharma Name is too long')
                .required('Pharma Name cannot be left blank'),
            licensenumber: yup.string()
                .required('License Number cannot be left blank'),
            phone: yup.string()
                .matches(/^[0-9]+$/, 'Phone can only contain numbers')
                .required('Phone cannot be left blank'),
            email: yup.string()
                .email('Invalid Email Address')
                .required('Email cannot be left blank'),
            streetname: yup.string()
                .matches(/^[A-Za-z\s]+$/, 'Street Name can only contain alphabets')
                .required('Street Name cannot be left blank'),
            city: yup.string()
                .matches(/^[A-Za-z\s]+$/, 'City Name can only contain alphabets')
                .required('City Name cannot be left blank'),
            state: yup.string()
                .matches(/^[A-Za-z\s]+$/, 'State Name can only contain alphabets')
                .required('State Name cannot be left blank'),
            postalcode: yup.string()
                .matches(/^\d{6}$/, 'Postal Code must be a 6-digit number')
                .required('Postal Code cannot be left blank'),
            country: yup.string()
                .matches(/^[A-Za-z\s]+$/, 'Country Name can only contain alphabets')
                .required('Country cannot be left blank'),
            password: yup.string()
                .min(6, 'Password should be at least 6 characters')
                .required('Password cannot be left blank'),
            confirmpassword: yup.string()
                .min(6, 'Password should be at least 6 characters')
                .required('Confirm Password cannot be left blank')
                .test('confirmpassword', 'Password & confirm password should be same', function (cpass) {
                    if (this.parent.password == cpass) {
                        return true;
                    }
                    return false;
                })
        }),
    });

    const handleNavigateHome = () => {
        navigate("/");
    }
    
    return (
            <MDBContainer fluid className='p-4 registration-container'>
                <MDBRow>
                    <MDBCol md='7' className='register-container'>
                        <h5 className="my-7 display-6 fw-bold ls-tight px-4">
                            Best profits for <br />
                            <span className="text-primary">your prime expansion</span>
                        </h5>
                        <img src="./images/signup.jpg" className="pharma-register-img" alt="Sample image" />
                    </MDBCol>
                    <MDBCol md='5' className='register flex-left'>
                        <form onSubmit={formik.handleSubmit} className="w-75 mx-auto" >
                            <div className="mt-2">
                                <input id="pharmaname" name="pharmaname" type="text" value={formik.values.pharmaname} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-m" placeholder="Pharma Name" />
                                {formik.errors.pharmaname && formik.touched.pharmaname ? <span className="text-danger custom-text-danger">{formik.errors.pharmaname}</span> : null}
                            </div>
                            <div className="mt-3">
                                <input id="licensenumber" name="licensenumber" type="text" value={formik.values.licensenumber} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control  form-control-m" placeholder="License Number" />
                                {formik.errors.licensenumber && formik.touched.licensenumber ? <span className="text-danger custom-text-danger">{formik.errors.licensenumber}</span> : null}
                            </div>
                            <div className="mt-3">
                                <input id="phone" name="phone" type="text" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control  form-control-m" placeholder="Phone" />
                                {formik.errors.phone && formik.touched.phone ? <span className="text-danger custom-text-danger">{formik.errors.phone}</span> : null}
                            </div>
                            <div className="mt-3">
                                <input id="email" name="email" type="text" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control  form-control-m" placeholder="Email" />
                                {formik.errors.email && formik.touched.email ? <span className="text-danger custom-text-danger">{formik.errors.email}</span> : null}
                            </div>
                            <div className="mt-3">
                                <input id="streetname" name="streetname" type="text" value={formik.values.streetname} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control  form-control-m" placeholder="Street Name" />
                                {formik.errors.streetname && formik.touched.streetname ? <span className="text-danger custom-text-danger">{formik.errors.streetname}</span> : null}
                            </div>
                            <div className="mt-3">
                                <input id="city" name="city" type="text" value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control  form-control-m" placeholder="City Name" />
                                {formik.errors.city && formik.touched.city ? <span className="text-danger custom-text-danger">{formik.errors.city}</span> : null}
                            </div>
                            <div className="mt-3">
                                <input id="state" name="state" type="text" value={formik.values.state} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control  form-control-m" placeholder="State Name" />
                                {formik.errors.state && formik.touched.state ? <span className="text-danger custom-text-danger">{formik.errors.state}</span> : null}
                            </div>
                            <div className="mt-3">
                                <input id="postalcode" name="postalcode" type="text" value={formik.values.postalcode} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control  form-control-m" placeholder="Postal Code" />
                                {formik.errors.postalcode && formik.touched.postalcode ? <span className="text-danger custom-text-danger">{formik.errors.postalcode}</span> : null}
                            </div>
                            <div className="mt-3">
                                <input id="country" name="country" type="text" value={formik.values.country} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control  form-control-m" placeholder="Country" />
                                {formik.errors.country && formik.touched.country ? <span className="text-danger custom-text-danger">{formik.errors.country}</span> : null}
                            </div>
                            <div className="mt-3">
                                <input id="password" name="password" type="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control  form-control-m" placeholder="Password" />
                                {formik.errors.password && formik.touched.password ? <span className="text-danger custom-text-danger">{formik.errors.password}</span> : null}
                            </div>
                            <div className="mt-3">
                                <input id="confirmpassword" name="confirmpassword" type="password" value={formik.values.confirmpassword} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control  form-control-m" placeholder="Confirm Password" />
                                {formik.errors.confirmpassword && formik.touched.confirmpassword ? <span className="text-danger custom-text-danger">{formik.errors.confirmpassword}</span> : null}
                            </div>

                            <div className="mt-5 signup-button d-flex justify-content-end">
                                <button class="btn btn-primary  mb-0 px-5 me-4" type="submit">Pharmacy Register</button>
                                <button type="button" className="btn btn-primary" onClick={handleNavigateHome}>Home Page</button>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
    )
}