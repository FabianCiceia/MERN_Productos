import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Manager = ({useListaActualizada}) => {
    //Para la Alerta

    //para cargar a la  base de datos 
    const baseURL = "http://localhost:8000/api/products/new";
    function updatePost(pront) {
        axios
        .post(`${baseURL}`, pront)
        .then((response) => {
            useListaActualizada(true);
            Swal.fire({
                icon: "success",
                title: `${response.data.product.title} fue agregado`,
            });
        })
        .catch(err => {
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
    const onSubmit = (values,  { resetForm }) => {
        resetForm();
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
            
            <Form className="mb-3">
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Title:</label>
                    <Field  className="form-control" type="text" id="title" name="title" />
                    <ErrorMessage  className="text-danger" n name="title" component="div" />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="price">Price:</label>
                    <Field  className="form-control" type="text" id="price" name="price" />
                    <ErrorMessage className="text-danger" name="price" component="div" />
                </div>
                <div  className="form-group mb-3">
                    <label className="form-label" htmlFor="description">Description:</label>
                    <Field  className="form-control" type="text" id="description" name="description" />
                    <ErrorMessage className="text-danger" name="description" component="div" />
                </div>
                <div>
                    <button className="btn btn-primary" type="submit">load product</button>
                </div>
            </Form>
        </Formik>
    );
};

export default Manager;
