const path =require('path');
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack');


const  server={
    entry:{
     "server":  './src/index.js'
    },
    target:'node',
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules: [       
            {            
                     test: /\.js$/,      
                      exclude: /node_modules/,        
                      use: ["babel-loader"],       
             } ,
          ]
    },
    externals:[nodeExternals() ],
    plugins:[
      new Dotenv(),

    ]
}

module.exports=server