import React from 'react'

export default function Success() {
  return (
    <div className='onlargeViewport'>
      <div class="container mt-5 pt-5">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="text-center">
              <h1 class="display-4">Payment Successful</h1>
              <p class="lead">Thank you for your purchase!</p>
              <p>Your payment has been successfully processed.</p>
              <a href="/" class="btn btn-primary">Continue Shopping</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
