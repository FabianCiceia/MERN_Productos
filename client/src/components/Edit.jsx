import React from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from "react-router";
// import './Manager.css'


import "./Product.css"
export default function Edit(props) {
    const { id } = useParams(); 
    //para cargar a la  base de datos 
    const baseURL = `http://localhost:8000/api/products/`;
    const [product, setProduct] = React.useState(null);
    React.useEffect(() => {
        axios.get(`${baseURL}${id}`).then((response) => {
        setProduct(response.data.product);
        });
        
    }, []);
    if (!product) return null;
    function updatePost(pront) {
        axios
        .put(`${baseURL}update/${id}`, pront)
        .then((response) => {
            Swal.fire({
                icon: "success",
                title: `${response.data.product.title} fue editado correctamente`,
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
        title: product.title,
        price: product.price,
        description: product.description,
    };
    const onSubmit = (values,  { resetForm }) => {
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
            <Form className="">
                <h1 className="">Editar producto</h1>
                <div className='input-group mb-3'>
                    <label className='input-group-text' htmlFor="title">Title:</label>
                    <Field className="form-control" type="text" id="title" name="title" />
                </div>
                <div className="error-message">
                    <ErrorMessage name="title" component="div" />
                </div>
                <div className='form'>
                    <label className='input-group-text' htmlFor="price">Price:</label>
                    <Field className="form-control" type="text" id="price" name="price" />
                </div>
                <div className="error-message">
                    <ErrorMessage name="price" component="div" />
                </div>
                <div className='form'>
                    <label className='input-group-text' htmlFor="description">Description:</label>
                    <Field className="form-control" type="text" id="description" name="description" />
                </div>
                <div className="error-message">
                    <ErrorMessage name="description" component="div" />
                </div>
                <div>
                    <button class="btn btn-primary" type="submit">Edit product</button>
                </div>
            </Form>
        </Formik>
    );
}