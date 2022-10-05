const mongoose = require('mongoose');
const Campground = require('../models/campgrounds');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i<400; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() *20) +10;
        const camp = new Campground({
            author: '6336b6a5937192f5efc3c315',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, cupiditate mollitia sint sunt officia assumenda non temporibus. Earum, suscipit atque officiis expedita sunt quaerat praesentium iusto delectus similique nam maxime!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dpzicivui/image/upload/v1664700015/YelpCamp/diojcewywwfxd00kbd5v.jpg',
                  filename: 'YelpCamp/diojcewywwfxd00kbd5v',
                },
                {
                  url: 'https://res.cloudinary.com/dpzicivui/image/upload/v1664700033/YelpCamp/fvi2s3loqxavjgtnp1jh.jpg',
                  filename: 'YelpCamp/fvi2s3loqxavjgtnp1jh',
                }
              ]
        })
        await camp.save()
    }
    
}

seedDB()
    .then(() => {
        mongoose.connection.close()
    })