import{PhoneNo ,Admin} from '../models'
import bcrypt from 'bcrypt';


const login = async(req,res,next)=>{
    try{
    const {username,password}=req.body;
    const account = await Admin.findOne({where:{ username:username }});
    if(!account)  throw new Error('Invalid Username') ;
    if(!await bcrypt.compare(password,account.password)) throw new Error('Invalid Password');
    res.json({success:true})    

    }
    catch(err){
        next(err);
    }
}
const countUniqueNo= async(req,res,next)=>{
const count= await PhoneNo.count({distinct:true,col:'mobileNo'});
res.json(count)
}
const totalSms= async(req,res,next)=>{
    const count= await PhoneNo.sum('count')
    res.json(count)
}
const listUniqueNo= async(req,res,next)=>{
    const list= await PhoneNo.findAll({
        attributes:['mobileNo'],
        distinct:true
    })
    res.json(list)
}
const list = async(req,res,next)=>{
    const list= await PhoneNo.findAll({
        attributes:['mobileNo','count','verified'],
        distinct:true
    })
    res.json(list)
}

export{
    login,
    countUniqueNo,
    totalSms,
    listUniqueNo,
    list
}