var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
const actors = require('./actors');
module.exports = {
    getAll: function (req, res) {
        Movie.find()
            .populate('actors')
            .exec(function (err, movies) {
                if (err) return res.status(400).json(err);
                res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndDelete({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    addActor: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.mId }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    deleteActor: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.mId }, req.params, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.params.aId }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                let index = movie.actors.indexOf(actor._id);
                movie.actors.splice(index, 1);

                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    }, 
    getBetweenYears: function (req, res) {
        let query = {
            $and: [
                { "year": { $gte: req.params.year1 } },
                { "year": { $lte: req.params.year2 } }
            ]
        };

        Movie.find(query)
            .populate('actors')
            .exec(function (err, movies) {
                if (err) return res.status(400).json(err);
                if (!movies) return res.status(404).json();
                res.json(movies);
            });
    },
    deleteBetweenYears: function (req, res) {
        let query = {
            $and: [
                { year: { $gte: req.body.year1 } },
                { year: { $lte: req.body.year2 } }
            ]
        };

        Movie.deleteMany(query, function (err, movies) {
            if (err) return res.status(400).json(err);
            if (!movies) return res.status(404).json();
            res.json(movies);
        });
    }
};