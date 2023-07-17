var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(express.json)
app.use(bodyParser.urlencoded({
    extended:false
}))

mongoose.connect('mongodb://127.0.0.1:27017/restapi',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const sc=new mongoose.Schema({
    pname:String,
    ptype:String,
    price:String
});
const mo = mongoose.model('rest',sc);

//CREATE PRODUCT USING POST METHOD

app.post("/app",async(req,res)=>{
    const p1=await mo.create(req.body);
    res.status(200)
    res.json({success:true,product})
})


//READ PRODUCT DETAILS USING GET METHOD

app.get("/app/read",async(req,res)=>{
    const p2= await mo.find();
    res.status(200).json({success:true,p2})
    
});

//UPDATE PRODUCT USING PUT METHOD
app.put("/app/:id",async(req,res)=>{
    let p3=await mo.findById(req.params.id);
    p3=await mo.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        p3


    })
    
})

//DELETE PRODUCT USING DELETE METHOD
app.delete("/app/delete/:id",async(req,res)=>{
    const p4=await mo.findById(req.params.id);

    if(!p4){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    await mo.remove();

    res.status(200).json({
        success:true,
        message:"product is deleted successfully"
    
    })
})




app.get("/",(req,res)=>{
    res.send("hello this api will show you the product");
});

app.listen(5000,()=>{
    console.log("server is runing")
})

// JSON DATA
/* {
    "NAME":"kajus",
    "price":"2666666"
}
*/