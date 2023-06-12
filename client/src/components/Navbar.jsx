import { useSelector } from 'react-redux'
import React, { useState } from 'react'


export default function Navbar() {
    const {cartTotalQuantity} = useSelector(state => state.cart)

    return (
        <>
            <nav className="navbar navbar-expand-lg rounded mb-5" aria-label="Thirteenth navbar example">
                <div className="container-fluid">
                    <button className="navbar-toggler text-color" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fa-solid fa-bars"></i>

                    </button>
                    <a className="navbar-brand col-md-6 text-center text-md-start logo" href="/">Bite Bliss</a>
                    <a className="navbar-brand col-md-5 text-center text-md-start cart d-lg-none text-color" href="/cart"><i class="fa-sharp fa-solid fa-cart-shopping position-relative"><span class="position-absolute cart-badge top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                        <p className='mt-1'>{cartTotalQuantity}</p>
                    </span></i></a>


                    <div className="collapse navbar-collapse d-lg-flex flex-lg-column" id="navbarsExample11">
                        {/* d-none to show a tag only on large viewport */}
                        {/* <a className="navbar-brand col-lg-12 ms-2 d-none logo" href="/">Epic Eats</a> */}
                        <ul className="navbar-nav col-lg-1">
                            {/* d-lg-none to show a tag only on small viewport */}
                            <li className="nav-item mx-auto my-3 ">
                                <a className="nav-link my-button-class" id='home' href="/">Home</a>
                            </li>
                            <li className="nav-item mx-auto my-3">
                                <a className="nav-link my-button-class" href="/about">About</a>
                            </li>
                            <li className="nav-item mx-auto my-2">
                                <a className="nav-link my-button-class" href="/services">Services</a>
                            </li>
                            <li className="nav-item mx-auto my-2">
                                <a className="nav-link my-button-class" href="/cuisine">Cuisine</a>
                            </li>
                            <li className="nav-item mx-auto my-3">
                                <a className="nav-link my-button-class" href="/gallery">Admin</a>
                            </li>
                            <li className="nav-item mx-auto my-2">
                                <a className="nav-link my-button-class" href="/contact">Contact</a>
                            </li>
                            <li className="nav-item mx-auto my-2">
                                <a className="nav-link my-button-class" href="/book">Book</a>
                            </li>
                            <li className="nav-item mx-auto my-3">
                                <a className="nav-link my-button-class position-relative" href="/cart">Cart
                                    <span class="position-absolute ms-3 translate-middle badge rounded-pill bg-secondary">
                                        {cartTotalQuantity}
                                        <span class="visually-hidden">unread messages</span>
                                    </span></a>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>



        </>

    )
}



