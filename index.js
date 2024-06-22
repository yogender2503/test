const express=require("express")
const app=express();
const zod=require("zod")
const port=3000;
const schema=zod.string();

//Middleware
function namemiddleware(req,res,next){
    const username=req.headers.username
    const name=schema.safeParse(username)

    const pass=req.headers.pass 
    const password=schema.safeParse(pass)

    if(!name.success || name.data !== "abcd" || !password.success || password.data !== "1234")
        {
            res.status(400).json({
                msg:"INVALID CRED"
            });
        }
        else{
            next();
        }
}

app.use(express.json());

app.get("/",namemiddleware,(req,res)=>{
    res.send("you are a valid user")
});


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

