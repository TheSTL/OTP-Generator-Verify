import Dotenv from 'dotenv'
Dotenv.config()
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt'


import Routers from './routes'
import {sequelize} from './config/database'
import {Admin} from './models'



const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())

app.use('/api',Routers)

app.use((err,req,res,next)=>{
    res.json({
        err:err.message || 'Something went wrong',
        success:false
    })
})
sequelize.sync()
.then(()=>{
    console.log('Databse has benn synced')
    Admin.findAll().then( async (list)=>{
        if(list.length==0){
            const hash= await bcrypt.hash('admin',10);
            
            Admin.create({
                username:'admin',
                password:hash
            })
        }
    })

})
.catch((err)=>console.log(err))


app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
    
    
})