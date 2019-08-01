import axios from 'axios'

const location='http://localhost:3000/api'

const call = (method,path,data)=>{
const response= axios[method](location+path,data);
return response
}

export default {
    call
}