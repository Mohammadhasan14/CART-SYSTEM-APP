const mongoose = require('mongoose');

main().then(()=>{
    console.log('MongoDB connection is ready...')
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/foodDetails');

}


const foodSchema = new mongoose.Schema({
    name: String,
    url: String,
    status: String,
    price: Number
})

module.exports.Food = mongoose.model('Food', foodSchema)



