import React from 'react'

export default function Book() {
  return (
    <div className='onlargeViewport'>
      <div className="cart-container">
        <h2 className='my-4'>Placed Product</h2>
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
          </div>
          <div className="cart-items">
          </div>
        </div>
      </div>
    </div>
  )
}
