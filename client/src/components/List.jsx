import axios from "axios";
import React, { useState } from "react";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const baseURL = "http://localhost:8000/api/products";

export default function List({listaActualizada, useListaActualizada}) {
    const [titles, setTitles] = React.useState(null);
    const [url , setUrl ] = useState("/product/2")
    React.useEffect(() => {
        axios.get(`${baseURL}/title`).then((response) => {
        setTitles(response.data);
        });
        useListaActualizada(false);
    }, [listaActualizada]);

    const delet = (id) =>{
        Swal.fire({
            title: "Deseas eliminar el producto",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Cancelar",
            denyButtonText: `Eliminar`,
            reverseButtons: true
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            // if (result.isConfirmed) {
            // } else 
            if (result.isDenied) {
                axios.delete(`${baseURL}/delete/${id}`)
                .then((response) => {
                    if(response.data.result.deletedCount){
                        Swal.fire("El producto fue eliminado", "", "success");
                        useListaActualizada(true);
                    }else{
                        Swal.fire("El producto no pudo ser eliminado", "", "error");
                    }
                });
            
            }
        });
    }
    if (!titles) return null;
    return (
        <div className="list-group list-group-flush">
            <h1 >All Products:</h1>
            {
                titles.products.map((data, i) => (
                    <div key={i}  className="list-group-item d-flex justify-content-between " >
                        <Link className="fw-bold " to={`/product/${data.id}`} >{data.title}</Link>
                        <button className="btn btn-danger m-2" onClick={()=>{delet(data.id);}} >Delete</button>
                    </div>
                ))
            }
        </div>
    );
}