import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { useSelector } from 'react-redux'
import { useState,useRef,useEffect } from 'react';

let SearchResultsTable=()=>{
    let rowCount=-1;
    console.log("SearchResultsTable")
    const latestSearchedResults=useSelector((state)=>{return state.searchedResults.searchResults})
    console.log(typeof(latestSearchedResults))
    console.log(latestSearchedResults)
    const apiResultsReturnLimit=10;//should dynamically get value from backend and use on component init.

    //api call to post a new fav item to the backend
    const addOneFav=(resource,refObj)=>{
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(resource),
        };
        fetch('/appleFavourites',options)
        .then((res)=>{
            console.log("res1 : "+JSON.stringify(res))
            return res.json();
        })
        .then((res)=>{
            console.log("res2 : "+JSON.stringify(res))
            console.log(refObj)
            refObj.current.disabled=true;
        })
        .catch((err)=>{
            console.log("err : "+JSON.stringify(err))
        })
    }

    return(<>
        <h1>Search Results</h1>
        {/* <h1>Search Results {latestSearchedResults.length}</h1> */}
        <Table responsive striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>URL</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
               
                {      
                    latestSearchedResults.map((element)=>{
                        console.log(element)
                        rowCount+=1;
                        return(
                            <tr>
                                <td>{element.kind != undefined? element.kind: element.wrapperType }</td> 
                                <td>{element.trackName != undefined? element.trackName: element.collectionName}</td> 
                                <td><a href={element.previewUrl?element.previewUrl:element.trackViewUrl}>Preview URL</a></td> 
                                <td>{element.shortDescription?element.shortDescription:"No Description Provided"}</td> 
                                <td>{element.trackPrice?element.trackPrice:element.collectionPrice}</td>  
                                <td><Button id={rowCount} key={rowCount}  onClick={()=>{addOneFav(element);  }}  variant="secondary">Add to Favs</Button></td>
                                
                            </tr>
                        )
                    })
                }
               

            </tbody>
        </Table>
    </>)
}

export default SearchResultsTable;