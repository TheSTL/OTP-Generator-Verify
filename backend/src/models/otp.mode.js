import Sequelize from 'sequelize'
import {sequelize} from '../config/database'


const Otp=sequelize.define('otp',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    otp:{
        type:Sequelize.INTEGER,
        unique: true
    },
    mobileNo:{
        type:Sequelize.STRING,
    }

},{ tableName: 'otp',timestamps: true,})

export {
    Otp
}
