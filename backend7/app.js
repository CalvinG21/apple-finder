let express=require('express');
let app=express();
const axios = require('axios');
let appleSearchUrl='https://itunes.apple.com/search';
let helmet =require("helmet");
const { v4: uuidv4 } = require('uuid'); // Import the v4 function from the uuid package
const path = require('path');
const cors = require("cors");

//if in production deployment
if (process.env.NODE_ENV === 'production'){
    console.log(__dirname)
    //C:\Users\calvin.govindsamy\Desktop\webDev\CA22100005951 (1)\3 - Full Stack Web Development\fullstack101\backend7
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('/',(req,res)=> {res.sendFile(path.resolve(__dirname,'frontend', 'build','index.html'));console.log("hava hava")});
}
//cors middleware
app.use(cors({
	origin:"https://buster-beans-c9b79e95e191.herokuapp.com/",
	credentials:true
}))

//response limit
let searchLimit=10;

const port = process.env.PORT || 3001
const fs = require('fs')

//built in express midlleware to parse 'form data' sent in request body
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//built in express midlleware to parse 'json data' sent in request body
app.use(express.json());

//Helmet helps secure Express apps by setting HTTP response headers.
// Use Helmet!
app.use(helmet());

//helper functions

//returns all items stored as favourite
function getFavs(){
    try {
        const content = fs.readFileSync('favourites.json')
        return JSON.parse(content)
    }catch(e){ // file non-existent
        fs.writeFileSync('favourites.json', '[]')
        return []
    }
}

//save item as favourite/push a item to the favourites array
function addFav(fav){
    const favz = getFavs()
    fav.fav_id=uuidv4(); // Generate a unique ID
    favz.push(fav)
    fs.writeFileSync('favourites.json', JSON.stringify(favz))
}

//remove a item as favourites
function deleteFav(specificId){
    const favz = getFavs()
    const indexToDelete = favz.findIndex((item) =>{return item.fav_id === specificId});

    if (indexToDelete !== -1) {
        favz.splice(indexToDelete, 1);
        console.log(`Object with id ${specificId} deleted.`);
        fs.writeFileSync('favourites.json', JSON.stringify(favz))
        return true
    } 
    else {
        console.log(`Object with id ${specificId} not found.`);
        return false;
    }
}


//routes
app.get("/appleResources",(req,res)=>{
    let localUrl=appleSearchUrl;
    req.query.term? 
    (()=>{
        localUrl+=localUrl.includes("?") ? "&" : "?";
        localUrl+='term='+req.query.term
    })()
    :
    console.log("No term query param");

    req.query.country? 
    (()=>{
        localUrl+=localUrl.includes("?") ? "&" : "?";
        localUrl+='country='+req.query.country
    })()
    :
    console.log("No country query param");

    req.query.media? 
    (()=>{
        localUrl+=localUrl.includes("?") ? "&" : "?";
        localUrl+='media='+req.query.media
    })()
    :
    console.log("No media query param");

    req.query.entity? 
    (()=>{
        localUrl+=localUrl.includes("?") ? "&" : "?";
        localUrl+='entity='+req.query.entity
    })()
    :
    console.log("No entity query param");

    localUrl+="&limit="+searchLimit;

    axios.get(localUrl)
    .then((response)=>{
        console.log(response.data)
        res.json(response.data);
    })
    .catch ((error)=> {
        console.error('Error making API call:', error);
        res.status(500).json({ error: 'An error occurred while making the API call' });
    });

})

app.get("/appleFavourites",(req,res)=>{
    req.query.id? null : res.json({favs:getFavs()});
})

app.post("/appleFavourites",(req,res)=>{
    console.log("req.body")
    console.log(req.body)
    try{
        addFav(req.body);
        res.json({result:"added faaaarn",favz:getFavs().length})
    }
    catch{
        res.json({result:"added floooop"})
    }
    
})

app.delete("/appleFavourites/:id",(req,res)=>{
    deleteFav(req.params.id) ?
    res.status(201).json({deleted:"success"})
    :
    res.status(501).json({deleted:"Fail"});
})


//set app to listen on port
app.listen(port,()=>{console.log("express web server listening on port:"+port)})
