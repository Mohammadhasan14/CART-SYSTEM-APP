import React, { useState } from 'react'
import axios from 'axios'
import _ from 'lodash'
import Card from './Card'
import { useGetAllProductsQuery } from '../features/productsApi'

export default function Search() {
    const {data, error, isLoading} = useGetAllProductsQuery()

    const [foodData, setFoodData] = useState('')
    const [searchKeyword, setSearchKeyword] = useState()


    function handleSearch(event) {
        setFoodData('')     /// this line is to empty foodData otherwise it will post response request during change of a search keyword also
        const query = event.target.value;
        setSearchKeyword(query);

        console.log("query onchange ", query);

    }


    console.log(searchKeyword)
    console.log('foodData',foodData)

    //////////////////////////// useEffect to send data of a search keyword to server to check if data matches ////////////////////////////////////////


    function handleClick(e) {
        e.preventDefault()

        console.log(searchKeyword);
        searchKeyword && (async function getData() {
            try {
                const data = { searchKeyword };
                const response = await axios.post('http://localhost:5000/foodData', data);
                console.log('response.data', response.data)
                setFoodData(response.data)

                console.log('searchKeyword', searchKeyword)

            } catch (error) {
                console.error(error);
            }
        })()
    }

    console.log("foodData", foodData)

    ////////////////// code for search  and a matching card of a searchKeyword ///////////////////////////////

    return (
        <>
            <div className="container search">
                <br />
                <div className="row justify-end">
                    <div className="col-6 col-md-8 col-lg-4 ">
                        <form className="card ">
                            <div className="card-body row">
                                <div className="col">
                                    <input name="search" value={searchKeyword} onChange={handleSearch} className="form-control form-control-sm form-control-borderless" type="search" placeholder="Search..." />
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-sm search-btn" onClick={handleClick} type="submit">Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div >
            
            {searchKeyword && searchKeyword.length > 0 ?
                    (<div className='food-card row search-data'>
                        
                        {foodData && foodData.map((data, index) => {
                            return (
                                <Card
                                    foodName={data?.name}
                                    foodImage={data?.url}
                                    foodPrice={data?.price}
                                />
                            )
                        })
                        }
                    </div>) : (<div className='food-card row search-data'>
                    
                        {isLoading ? <p>Loading...</p> : error ? <p>An error occured...</p> : data && data.map((data, index) => {
                            return (
                                <Card
                                    foodName={data?.name}
                                    foodImage={data?.url}
                                    foodPrice={data?.price}
                                    foodData={data}
                                />
                            )
                        })
                        }
                    </div>)
                }

        </>
    )
}
