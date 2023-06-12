import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Success() {
  const { session_id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make a request to your server to retrieve the session details
    axios
      .get(`/session/${session_id}`)
      .then((response) => {
        const sessionData = response.data.session;
        setOrder(sessionData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error retrieving session details:", error);
        setError("Error retrieving order details.");
        setLoading(false);
      });
  }, [session_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="onlargeViewport">
        <div>{error}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="onlargeViewport">
        <div>Error retrieving order details.</div>
      </div>
    );
  }

  // Render the order details on the success page
  return (
    <div className="onlargeViewport">
      <div>
        <h1>Order Placed Successfully</h1>
        <p>Order ID: {order.id}</p>
        <p>Customer Name: {order.customer.name}</p>
        <p>Customer Email: {order.customer.email}</p>
        <p>Order Total: {order.amount_total}</p>
        {/* Render other order details as needed */}
      </div>
    </div>
  );
}





























// import React from 'react'

// export default function Success() {
//   return (
//     <div className='onlargeViewport'>
//       <div class="container mt-5 pt-5">
//         <div class="row">
//           <div class="col-md-6 offset-md-3">
//             <div class="text-center">
//               <h1 class="display-4">Payment Successful</h1>
//               <p class="lead">Thank you for your purchase!</p>
//               <p>Your payment has been successfully processed.</p>
//               <a href="/" class="btn btn-primary">Continue Shopping</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
