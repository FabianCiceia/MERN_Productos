import axios from "axios";
import React from "react";
import Swal from 'sweetalert2';
import { useParams } from "react-router"; 
import { useNavigate} from "react-router-dom";
const baseURL = "http://localhost:8000/api/products";
import {Link} from "react-router-dom";
// import "./Product.css"
export default function Product(props) {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [product, setProduct] = React.useState(null);
    React.useEffect(() => {
        axios.get(`${baseURL}/${id}`).then((response) => {
            setProduct(response.data.product);
        });
    }, []);

    if (!product) return null;

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
                        navigate("../");
                    }else{
                        Swal.fire("El producto no pudo ser eliminado", "", "error");
                    }
                });
            
            }
        });
    }

    return (
        <div className="product">
            <h1 className="product-title">{product.title}</h1>
            <h2 className="product-price">Precio: {product.price}</h2>
            <p className="product-description">{product.description}</p>
            <button onClick={()=>delet(id)}>Eliminar</button>
            <Link to="../">Regresar</Link>
        </div>
    );
}