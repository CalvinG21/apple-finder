import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState,useEffect } from 'react';


let Favourites=()=>{
    const [favs,setFavs]=useState([])
    const [updatedFavz,setUpdatedFavz]=useState(0)
     //USEeFFECT to perform get api of all favz from backend on component init
    useEffect(()=>{
        getAllFavs();
    },[])

    //useEffect  triggered whenever an update/deletion is made to a favourite item
    useEffect(()=>{
        updatedFavz>0?
        (()=>{
            //wait a bit to avoid trying to access resource thats is use on backend
            setTimeout(() => {
                 getAllFavs();
            }, 500);          
        })()
        :console.log("")
    },[updatedFavz])

    //api to request all fav items 
    const getAllFavs=()=>{
        fetch('/appleFavourites')
        .then((res)=>{
            console.log("res1111 : "+JSON.stringify(res))
            return res.json();
        })
        .then((res)=>{
            console.log("res222 : "+JSON.stringify(res))
            setFavs(res.favs)
        })
        .catch((err)=>{
            console.log("err : "+JSON.stringify(err))
        })
    }

    //api to delete a fav item
    const deleteOneFav=(resource)=>{
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },      
        };
        fetch('/appleFavourites/'+resource.fav_id,options)
        .then((res)=>{
            console.log("res1 : "+JSON.stringify(res))
            return res.json();
        })
        .then((res)=>{
            console.log("res2 : "+JSON.stringify(res))
            setUpdatedFavz((prevState)=>{return prevState+=1})
        })
        
        .catch((err)=>{
            console.log("err : "+JSON.stringify(err))
            alert("Failed to delete the item. Try agian later...")
        })

    }

    return(<>
    <h1>Favourites : {favs.length}</h1>
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
                    favs.map((element)=>{
                        //console.log(element)
                        return(
                            <tr>
                                <td>{element.kind != undefined? element.kind: element.wrapperType }</td> 
                                <td>{element.trackName != undefined? element.trackName: element.collectionName}</td> 
                                <td>{element.previewUrl?element.previewUrl:element.trackViewUrl}</td> 
                                <td>{element.shortDescription?element.shortDescription:"No Description Provided"}</td> 
                                <td>{element.trackPrice?element.trackPrice:element.collectionPrice}</td>  
                                <td><Button onClick={()=>{ deleteOneFav(element)}}  variant="danger">Delete</Button></td>
                            </tr>)
                    })
                }
            </tbody>
        </Table>
    </>)
}

export default Favourites;