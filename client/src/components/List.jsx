import axios from "axios";
import React, { useState } from "react";
import Product from './Product'
import {Link} from "react-router-dom";
const baseURL = "http://localhost:8000/api/products/title";

export default function App() {
    const [titles, setTitles] = React.useState(null);
    const [url , setUrl ] = useState("/product/2")
    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
        setTitles(response.data);
        });
    }, []);

    if (!titles) return null;
    return (
        <div className="List">
            <h1>All Products:</h1>
            {
                titles.products.map((data, i) => (
                    <Link to={`/product/${data.id}`} key={i} >{data.title}</Link>
                ))
            }
        </div>
    );
}