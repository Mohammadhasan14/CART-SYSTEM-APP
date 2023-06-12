import React from 'react'

export default function PayButton({cartItems}) {
    const handleCheckOut = ()=>{
        console.log('cartItems',cartItems)
        fetch("http://localhost:5000/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems
          }),
        })
          .then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
          })
          .then(({ url }) => {
            window.location = url
          })
          .catch(e => {
            console.error(e.error)
          })
    }

  return (
    <button onClick={handleCheckOut}>Check Out</button>
  )
}
