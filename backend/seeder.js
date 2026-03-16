const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Movie = require("./models/Movie");

dotenv.config();
connectDB();

const movies = [
    {
        title: "Leo",
        description: "Action thriller starring Vijay.",
        duration: 164,
        language: "Tamil",
        genre: "Action",
        releaseDate: new Date("2023-10-19"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Jailer",
        description: "Mass action drama starring Rajinikanth.",
        duration: 168,
        language: "Tamil",
        genre: "Action",
        releaseDate: new Date("2023-08-10"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Vikram",
        description: "Spy action thriller.",
        duration: 175,
        language: "Tamil",
        genre: "Action",
        releaseDate: new Date("2022-06-03"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Master",
        description: "College action drama.",
        duration: 179,
        language: "Tamil",
        genre: "Action",
        releaseDate: new Date("2021-01-13"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Beast",
        description: "Hostage action thriller.",
        duration: 155,
        language: "Tamil",
        genre: "Thriller",
        releaseDate: new Date("2022-04-13"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Doctor",
        description: "Dark comedy action film.",
        duration: 150,
        language: "Tamil",
        genre: "Comedy",
        releaseDate: new Date("2021-10-09"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Bigil",
        description: "Sports action drama.",
        duration: 177,
        language: "Tamil",
        genre: "Sports",
        releaseDate: new Date("2019-10-25"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Thunivu",
        description: "Bank heist action film.",
        duration: 146,
        language: "Tamil",
        genre: "Action",
        releaseDate: new Date("2023-01-11"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "RRR",
        description: "Epic period action drama.",
        duration: 187,
        language: "Telugu",
        genre: "Action",
        releaseDate: new Date("2022-03-25"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "KGF Chapter 1",
        description: "Mass action entertainer.",
        duration: 156,
        language: "Kannada",
        genre: "Action",
        releaseDate: new Date("2018-12-21"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "KGF Chapter 2",
        description: "Sequel action drama.",
        duration: 168,
        language: "Kannada",
        genre: "Action",
        releaseDate: new Date("2022-04-14"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Pushpa",
        description: "Smuggling action drama.",
        duration: 179,
        language: "Telugu",
        genre: "Action",
        releaseDate: new Date("2021-12-17"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Sarkar",
        description: "Political action film.",
        duration: 163,
        language: "Tamil",
        genre: "Action",
        releaseDate: new Date("2018-11-06"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Darbar",
        description: "Police action drama.",
        duration: 159,
        language: "Tamil",
        genre: "Action",
        releaseDate: new Date("2020-01-09"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Soorarai Pottru",
        description: "Inspirational biopic drama.",
        duration: 153,
        language: "Tamil",
        genre: "Drama",
        releaseDate: new Date("2020-11-12"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Kaithi",
        description: "Night action thriller.",
        duration: 145,
        language: "Tamil",
        genre: "Thriller",
        releaseDate: new Date("2019-10-25"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "96",
        description: "Romantic drama film.",
        duration: 158,
        language: "Tamil",
        genre: "Romance",
        releaseDate: new Date("2018-10-04"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Theri",
        description: "Family action entertainer.",
        duration: 157,
        language: "Tamil",
        genre: "Action",
        releaseDate: new Date("2016-04-14"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Mersal",
        description: "Medical action drama.",
        duration: 172,
        language: "Tamil",
        genre: "Action",
        releaseDate: new Date("2017-10-18"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Enthiran",
        description: "Sci-fi action film.",
        duration: 171,
        language: "Tamil",
        genre: "Sci-Fi",
        releaseDate: new Date("2010-10-01"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Petta",
        description: "Mass commercial entertainer.",
        duration: 172,
        language: "Tamil",
        genre: "Action",
        releaseDate: new Date("2019-01-10"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Anniyan",
        description: "Psychological thriller.",
        duration: 181,
        language: "Tamil",
        genre: "Thriller",
        releaseDate: new Date("2005-06-17"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Ghilli",
        description: "Sports action film.",
        duration: 160,
        language: "Tamil",
        genre: "Action",
        releaseDate: new Date("2004-04-17"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Sivaji",
        description: "Social action drama.",
        duration: 185,
        language: "Tamil",
        genre: "Drama",
        releaseDate: new Date("2007-06-15"),
        poster: "https://via.placeholder.com/300x400",
    },
    {
        title: "Indian",
        description: "Vigilante thriller.",
        duration: 185,
        language: "Tamil",
        genre: "Thriller",
        releaseDate: new Date("1996-05-09"),
        poster: "https://via.placeholder.com/300x400",
    },
];

const importData = async () => {
    try {
        await Movie.deleteMany();
        await Movie.insertMany(movies);
        console.log("✅ 25 Movies Inserted Successfully!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

importData();