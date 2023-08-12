import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState,useRef } from 'react';
import { updateSearchResults, setSearchResults,setDisplaySearchResults } from '../redux/searchResultsSlice'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

let SelectionForm=()=>{
    const dispatch=useDispatch();
    const [country,setCountry]=useState('All')
    const [media,setMedia]=useState('All')
    const [searchText,setSearchText]=useState('')
    const country_dd_SelectRef=useRef(null);
    const media_dd_SelectRef=useRef(null);
    const searchText_SelectRef=useRef(null);

    const [show, setShow] = useState(false);
    const [displaySpinner, setSpinnerDisplay] = useState("none");

  
    ///appleResources?term=fresh+prince&country=us&media=tvShow
    //create url using the user's input saved in the useState vars
    const createUrl=()=>{
        let localUrl="/appleResources"

        searchText!=""? 
        (()=>{
            localUrl+=localUrl.includes("?") ? "&" : "?";
            localUrl+='term='+formatSearchText(searchText)
        })()
        :
        console.log(searchText=="");

        country!="All"? 
        (()=>{
            localUrl+=localUrl.includes("?") ? "&" : "?";
            localUrl+='country='+country
        })()
        :
        console.log(country=="All");

        media!="All"? 
        (()=>{
            localUrl+=localUrl.includes("?") ? "&" : "?";
            localUrl+='media='+media
        })()
        :
        console.log(media=="All");

        console.log("localUrl : "+localUrl);

        return localUrl;

    }

    //process the user input to remove white spaces
    const formatSearchText=(searchStr)=>{
        searchStr.trimStart();
        searchStr.trimEnd();
        searchStr= searchStr.replaceAll(" ","+");
        return searchStr;
    }

    //make api get request with user input as query params , if request succcessfull then save to global redux , so other sibling components can use this data as well.
    const makeApiCall=(e)=>{
        e.preventDefault(); // Prevent default form submission behavior
        setSpinnerDisplay("")
        searchText!="" || (searchText=="" && country!="All" && media!="All") ?
        (()=>{
            fetch(createUrl())
            .then((res)=>{
                console.log("res1 : "+JSON.stringify(res))
                return res.json();
            })
            .then((res)=>{
                console.log("res2 : "+JSON.stringify(res))
                res.resultCount>0 ?
                (()=>{
                    dispatch(setSearchResults({searchResults:res.results}))
                })()
                :
                setShow(true)
                
                setSpinnerDisplay("none")
            })
            .catch((err)=>{
                console.log("err : "+JSON.stringify(err))
                 setSpinnerDisplay("none")
                 alert("Issue retreiving data")
            })
        })()
        :
        (()=>{
            setSpinnerDisplay("none")
            alert("Please provide us with a bit more detial")
        })()
            
    }

    return(<>
    
    <Form data-bs-theme="dark">
        <Row className="mb-3" data-bs-theme="dark">
            <Form.Group as={Col} controlId="formGridCity" data-bs-theme="dark">
                <Form.Label>Search Text</Form.Label>
                <Form.Control ref={searchText_SelectRef} onChange={()=>{ setSearchText(searchText_SelectRef.current.value) }}  placeholder='Search here...' />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Country</Form.Label>
                <Form.Select ref={country_dd_SelectRef} defaultValue="All" onChange={()=>{ setCountry(country_dd_SelectRef.current.value)}} >
                    <option>All</option>
                    <option>US</option>
                    <option>UK</option>
                    <option>ZA</option>
                </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Media Type</Form.Label>
                <Form.Select ref={media_dd_SelectRef} defaultValue="All" onChange={()=>{ setMedia(media_dd_SelectRef.current.value)}}>
                    <option>All</option>
                    <option>movie</option>
                    <option>podcast</option>
                    <option>music</option>
                    <option>music video</option>
                    <option>audio book</option>
                    <option>short film</option>
                    <option>tv show</option>
                    <option>software</option>
                    <option>ebook</option>
                </Form.Select>
            </Form.Group>
        </Row>  
        <Row>
            <Col>
                <Button variant="primary" onClick={makeApiCall} type="submit">
                    Submit
                </Button>
            </Col>
        </Row>
        <Row>
            <Col>
                <Spinner animation="border" style={{display:displaySpinner}} variant="success" />
            </Col>
             {/* <h1>{media}  {country}  {searchText}</h1> */}
        </Row>
        
    </Form>
        <Modal
            show={show}
            onHide={()=>{setShow(false)}}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>No Resources found</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                No resources found for your search of : {searchText}. Kindly try again with new input for search.,
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setShow(false)}}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default SelectionForm;