import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cartSlice'


export default function Card(props) {
    const dispatch = useDispatch()

    function handleAddToCart(product) {
        console.log(product)
        dispatch(addToCart(product))
    }



    return (
        <div className="card shadow-lg mx-2 my-4" style={{ width: "10rem", height: "13rem", marginTop: "8rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <img src={props.foodImage} className="card-img-top card-image" alt="..." />

            <h6 className="card-title card-text text-center my-3">{props.foodName}</h6>
            <p>Price: {props.foodPrice}$</p>
            {/* <button className='cart-add' onClick={handleAdd}><i class="fa-solid fa-plus"></i></button> */}
            <button className='cart-add' onClick={() => { handleAddToCart(props.foodData) }}>Add To Cart</button>
        </div>

    )
}
