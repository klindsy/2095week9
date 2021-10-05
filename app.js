//https://hub.packtpub.com/building-movie-api-express/
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actors');
const movies = require('./routers/movies');
let path = require('path');
const app = express();

app.set('PORT',8080);

// let ip = process.argv[2];

app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);      // populates, Q7
app.post('/actors', actors.createOne);
app.get('/actors/mostmovies', actors.mostMovies);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/cascadeDeleteMovies/:id', actors.cascadeDeleteMovies);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:aId/:mId', actors.deleteMovie);

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);      // populates, Q8
app.get('/movies/:year1/:year2', movies.getBetweenYears);
app.get('/movies/:id', movies.getOne);
app.post('/movies', movies.createOne);
app.post('/movies/:mId/actors', movies.addActor);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/deleteBetweenYears', movies.deleteBetweenYears);     // sent through body in JSON format, Q9
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/:mId/:aId', movies.deleteActor);

app.listen(app.get('PORT'), () => {
    console.log(`Listening on port: ${app.get('PORT')}`);
})