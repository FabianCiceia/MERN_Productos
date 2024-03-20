import axios from "axios";
import React from "react";
import './List.css'
import { useParams } from "react-router"; //Top of App.js
const baseURL = "http://localhost:8000/api/products/";
import {Link} from "react-router-dom";

export default function App(props) {
    const { id } = useParams(); 
    const [product, setTitles] = React.useState(null);
    React.useEffect(() => {
        axios.get(`${baseURL}${id}`).then((response) => {
        setTitles(response.data.product);
        });
    }, []);

    if (!product) return null;

    return (
        <div>
            <h1>{product.title}</h1>
            <h2>Precio: {product.price}</h2>
            <p>{product.description}</p>
            <Link to="../">Regresar</Link>
        </div>
    );
}