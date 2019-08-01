import{PhoneNo,Otp } from '../models'

import Nexmo from 'nexmo'

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_SECRET,
});

const sendOtp = async(req,res,next)=>{
    try{
    const {number} = req.body ;

    // add phone ,count to phone db
    let phone= await PhoneNo.findOne({where:{mobileNo:number}});
    if(!phone){        
      phone= new PhoneNo({
        mobileNo: number,
        verified:0,
        count:1,
        lastFive:Date.now() 
        })
    }
    else{

        Otp.destroy({where:{
            mobileNo:number
        }})

        const dates= phone.lastFive.split(';');
        
        if(dates.length>=5){
            const msec=(Date.now()- parseInt(dates[0]) );
            const minute=Math.floor(msec / 1000 / 60);
            if(minute<=5){
                return res.json({
                    err:'5 minute 5 Otp limit. Wait'
                })
            }else{
                phone.count++;
                phone.lastFive=Date.now();
            }
        }
        else{
            phone.count++;
            phone.lastFive=`${phone.lastFive};${Date.now()}`;
        }
        
    }
    
    

    


    //new opt generate to otp db 
    let  otpfind,randomOtp;
    while(true){
    randomOtp=Math.floor( Math.random() * (10000 - 1000) + 1000);
     otpfind= await Otp.findOne({where:{otp:randomOtp}} );
    if(!otpfind){
        otpfind= new Otp({
            otp:randomOtp,
            mobileNo:number
        })
        setTimeout(()=>{
            otpfind.destroy();
        },1000*60*5);
        break;
    }
    }


    

const from = 'Nexmo';
const to = number;
const text = `Verification code :- ${randomOtp}`;

nexmo.message.sendSms(from, to, text,(err, responseData) => {
    if (err) {
      next(err);
    } else {
        phone.save();
        otpfind.save()
        res.json({
            msg:'OTP is send Successfuly',
            success:true
        })    }
  });

   
    
    }
    catch(err){
        next(err);
    }
}

const verify = async(req,res,next)=>{
    try{
    const {number,pin}= req.body;
    const checkOtp= await Otp.findOne({where:{otp:pin , mobileNo:number }});
    if(!checkOtp){
       throw new Error('Invalid Otp')
    }
    else{
        const findPhone = await PhoneNo.findOne({ where:{ mobileNo:checkOtp.mobileNo } })    
        findPhone.verified=1;
        findPhone.save();
        checkOtp.destroy();

        return res.json({
            msg:'OTP is verified',
            success:true
        })
    }
    }
    catch(err){
        next(err);
    }

}


export{
    sendOtp,
    verify
}
