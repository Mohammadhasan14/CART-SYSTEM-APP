import React, { useEffect, useState } from 'react';
import axios from 'axios'

export default function Book() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/order');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log('data', data)

  function handleDelete (data) {
    console.log('for delete: ',data)
    axios.delete('http://localhost:5000/deletecustomer' ,{ data: data} )
    .then(res =>console.log(res.data))
    .catch( error => console.log(error))
     window.location.reload();
 }


  return (
    <div className='onlargeViewport'>
      <h3 className='ms-5 mt-5'>Orders Booked</h3>
      <div className='ms-5 my-5'>
        <table class="table table-responsive">
          <thead>
            <tr>

              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Amount Total</th>
              <th scope="col">Status</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            
              {data && data.map((data, index) => {
                return (
                  <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.amount_total}</td>
                    <td>{data.status}</td>
                    <td><button className="btn btn-danger btn-sm rounded-4 me-1" onClick={()=> handleDelete(data)}>Delete</button></td>
                    </tr>
                  </>
                )
              })}

            
          </tbody>
        </table>
      </div>
    </div>

  )
}
