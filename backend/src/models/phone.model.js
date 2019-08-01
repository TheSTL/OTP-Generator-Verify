import Sequelize from 'sequelize'
import {sequelize} from '../config/database'

const PhoneNo=sequelize.define('phone',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    mobileNo:{
        type:Sequelize.STRING
    },
    count:{
        type:Sequelize.INTEGER
    },
    verified:{
        type:Sequelize.TINYINT(1),
        defaultValue:0
    },
    lastFive:{
        type:Sequelize.STRING,
    }

},{ tableName: 'phone',timestamps: true,})

export{
    PhoneNo
}