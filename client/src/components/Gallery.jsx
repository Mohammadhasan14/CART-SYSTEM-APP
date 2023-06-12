import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EditFood from './EditFood';
import DeleteFood from './DeleteFood';


export default function Gallery() {
  const [foodData, setFoodData] = useState('')
  const [foodEdit, setFoodEdit] = useState([]);
  const [foodDelete, setFoodDelete] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => {
        console.log(res.data)
        setFoodData(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  console.log('foodData', foodData)

  function handleEdit(index) {
    setIsEditing(true);
    setIsAdding(false);
    const edit = foodData[index];
    setFoodEdit(edit);
    console.log('edit',edit)
  }

  function handleDelete(index) {
    const remove = foodData[index];
    setFoodDelete(remove);
    console.log("remove", remove)
  }

  function handleAdd (){
    setIsAdding(true);
    setIsEditing(false);
  }

  const handleSaveButtonClick = () => {
    setIsEditing(false);
    setIsAdding(false);
  };

  return (
    <>
      <div className='onlargeViewport'>
        <div className='container container-fluid align-items-center'>
          <div class="row justify-content-center mt-2">
            <div class="col-lg-10 center">
              <div class="card-style mb-30">
                <h4 class="mb-10">Food Table</h4>
                <p class="text-sm mb-20 mb-4">
                  Foods <code>name, Image URL</code>  and their <code>status</code>  info.
                </p>
                <div class="table-wrapper table-responsive" style={{ height: "400px", overflowY: "auto" }}>
                  <table class=" table table-hover">
                    <thead>
                      <tr>
                        <th><h6>ID</h6></th>
                        <th><h6>Food Name</h6></th>
                        <th><h6>Food URL</h6></th>
                        <th><h6>Status</h6></th>
                        <th><h6>Price</h6></th>
                        <th><h6>Action</h6></th>
                      </tr>
                    </thead>
                    <tbody>
                      {foodData && foodData.map((data, index) => (<tr>
                        <td class="min-width">
                          <p>{index + 1}</p>
                        </td>
                        <td class="min-width">
                          <p>{data?.name}</p>
                        </td>
                        <td class="min-width">
                          <p>{data?.url}</p>
                        </td>
                        <td class="min-width">
                          <span class={
                            data?.status === "Available" ? "status-btn success-btn" :
                              data?.status === "Not_Available" ? "status-btn close-btn" :  "status-btn close-btn"
                          }>{data?.status}</span>
                        </td>
                        <td class="min-width">
                          <p>{data?.price}</p>
                        </td>
                        <td>
                          <button type="button" onClick={() => { handleEdit(index) }} className="btn btn-primary btn-sm rounded-4 me-1" data-bs-toggle="modal" data-bs-target="#editCustomer">Edit</button>
                          <EditFood
                            editItem={foodEdit}
                            isEditing={isEditing}
                            isAdding={isAdding}
                            onSave={handleSaveButtonClick}
                          />
                          <button type="button" onClick={() => { handleDelete(index) }} className="btn btn-danger btn-sm rounded-4" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
                          <DeleteFood
                            deleteItem={foodDelete}
                          />
                        </td>
                      </tr>))}
                    </tbody>
                  </table>
                </div>
                <button className="btn btn-add-food mt-3 rounded-5 search-btn" onClick={handleAdd} data-bs-toggle="modal" data-bs-target="#editCustomer" type="submit">Add Food</button>
                <EditFood
                 isEditing={isEditing}
                 isAdding={isAdding}
                 onSave={handleSaveButtonClick}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
      
    </>
  )
}



{/* <div class="action">
<i className="fa-solid text-info-emphasis edit-btn add-delete-btn fa-pen-to-square" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => handleClickEdit(index)}></i>
<EditEmployee
  isTrue={stateEdit}
  editData={tableIndexEdit}
/>

<i className="fa-solid text-danger-emphasis add-delete-btn fa-trash" type="button" data-bs-toggle="modal" onClick={() => handleClickDelete(index)} data-bs-target="#exampleModal2"></i>
<DeleteEmployee
  deleteData={tableIndexDelete}
/>

</div> */}