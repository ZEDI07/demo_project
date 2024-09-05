require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
const controller  = require('./model/products/product.controller');

app.use(express.json())
app.get('/api/products',controller.getProducts);

app.listen(PORT,()=>{
    console.log('server is running');
})