import Sequelize from 'sequelize'
import {sequelize} from '../config/database'

const Admin = sequelize.define('admin',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    }
},{ tableName: 'admin',timestamps: false,})

export {
    Admin
}