import React from 'react'
import axios from 'axios'

export default function DeleteFood(props) {

  function handleDelete () {
    console.log('for delete: ',props.deleteItem) 
    props.deleteItem && axios.delete('http://localhost:5000/delete' ,{ data: props.deleteItem } )
    .then(res =>console.log(res.data))
    .catch( error => console.log(error))
     window.location.reload();
 }

 console.log('props.deleteItem', props.deleteItem)
 
  return (
    <>
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirmation</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete ?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary rounded-4 " data-bs-dismiss="modal">No</button>
              <button type="button" class="btn btn-danger rounded-4 " data-bs-dismiss="modal" onClick={handleDelete}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}