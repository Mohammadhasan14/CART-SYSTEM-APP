import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function EditFood({isEditing, isAdding, onSave, editItem}) {
    const [userInput, setUserInput] = useState({
        name: "",
        url: "",
        status: "",
        price: ""
    })

    console.log('isEditing',isEditing)
    console.log('isAdding',isAdding)

    useEffect(() => {
        if (isEditing && editItem) {
          setUserInput(editItem);
        } else if (isAdding) {
          setUserInput({
            name: '',
            url: '',
            status: '',
            price: ''
          });
        }
      }, [isEditing, isAdding, editItem]);

   

    console.log('editItemsss', editItem)
    console.log('userInput', userInput)

    function handleSubmit() {
        
        axios.post('http://localhost:5000/edit', userInput)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(err => console.log(err));
        console.log('handlesubmit: ', userInput)
        onSave()
    }

    function handleChanges(e) {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setUserInput(() => {
            return { ...userInput, [name]: newValue }
        })
        
    }

    function handleSubmitAdd(e) {
        var form = document.getElementById('food-form');

        if (form.checkValidity() === false) {
            return null
        } else {
        axios.post('http://localhost:5000/addmore', userInput)
            .then(res => {
                console.log(res)
                window.location.reload();
            })
            .catch((err) => console.log(err))
        console.log('handlesubmit: ', userInput)
        }
        onSave()
    }

    console.log('userInputchanges', userInput);
    
    return (
        <>
            <div class="modal fade" id="editCustomer" tabindex="-1" aria-labelledby="editCustomer" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Make changes</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id='food-form' class="row g-3 needs-validation" novalidate>
                                <div class="col-md-4">
                                    <label for="validationCustom01" class="form-label">Food Name: </label>
                                    <input type="text" class="form-control" onChange={handleChanges} name='name' id="validationCustom01" value={userInput.name} required />
                                    <div class="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <br />
                                <div class="col-md-4">
                                    <label for="validationCustom02" class="form-label">Image URL</label>
                                    <input type="text" class="form-control" onChange={handleChanges} name='url' id="validationCustom02" value={userInput.url} required />
                                    <div class="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label for="validationCustom03" class="form-label">Status</label>
                                    <select class="form-select" id="validationCustom03" onChange={handleChanges} name='status' value={userInput.status} required>
                                        <option selected disabled value="">Choose...</option>
                                        <option>Available</option>
                                        <option>Not_Available</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please select a valid state.
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <label for="validationCustom04" class="form-label">Price</label>
                                    <input type="text" class="form-control" onChange={handleChanges} name='price' id="validationCustom04" value={userInput.price} required />
                                    <div class="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary rounded-4 " onClick={onSave} data-bs-dismiss="modal">Cancel</button>
                                    {isAdding ? <button type="button" class="btn btn-primary reload-page rounded-4 "  onClick={handleSubmitAdd}>Save</button>:
                                    <button type="button" class="btn btn-primary reload-page rounded-4 " data-bs-dismiss="modal" onClick={handleSubmit}>Save changes</button>
                                    }
                                </div>
                                    
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
