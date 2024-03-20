import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Manager.css'
import axios from "axios";
import Swal from 'sweetalert2'



const Manager = () => {

    //Para la Alerta

    //para cargar a la  base de datos 
    const baseURL = "http://localhost:8000/api/products/new";
    function updatePost(pront) {
        axios
        .post(`${baseURL}`, pront)
        .then((response) => {
            console.log(response.data);
            Swal.fire({
                icon: "success",
                title: `${response.data.title} fue agregado`,
            });
        })
        .catch(err => {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: `${err.response.data.error.message}`,
            });
            setError(err.response.data.error.message);
        })
    }

    //Para el Formik
    const initialValues = {
        title: '',
        price: '',
        description: '',
    };
    const onSubmit = (values) => {
        console.log(values);
        updatePost(values);

    };
    const validationSchema = Yup.object({
        title: Yup.string().required(),
        price: Yup.number().required().positive().integer(),
        description: Yup.string().required(),
    });




    return (
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >   
            
            <Form>
                <div className='form'>
                    <label className='form-label' htmlFor="title">Title:</label>
                    <Field type="text" id="title" name="title" />
                </div>
                <div className="error-message">
                    <ErrorMessage name="title" component="div" />
                </div>
                <div className='form'>
                    <label className='form-label' htmlFor="price">Price:</label>
                    <Field type="text" id="price" name="price" />
                </div>
                <div className="error-message">
                    <ErrorMessage name="price" component="div" />
                </div>
                <div className='form'>
                    <label className='form-label' htmlFor="description">Description:</label>
                    <Field type="text" id="description" name="description" />
                </div>
                <div className="error-message">
                    <ErrorMessage name="description" component="div" />
                </div>
                <div>
                    <button className='form-button' type="submit">load product</button>
                </div>
            </Form>
        </Formik>
    );
};

export default Manager;
