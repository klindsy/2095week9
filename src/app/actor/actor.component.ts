import { Component, OnInit } from '@angular/core';

import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.onGetActors();
    this.onGetMovies();
  }

  // vars
  section = 1;

  // Actors
  actorsDB: any[] = [];
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  // Movies
  moviesDB: any[] = [];
  movieActorsDB: any[] = [];
  title: string = "";
  rYear: number = 0;
  movieId: string = "";
  aYear1: number = 0;
  aYear2: number = 0;

  // funcs
  changeSection(sectionId: number) {
    this.section = sectionId;
  }

  onGetActors() {
    this.dbService.getActors().subscribe( (data: any) => {
      this.actorsDB = data;
      this.section = 1
    });
  }

  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  onSelectUpdateActor(item: any) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  
  onDeleteActor(item: any) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";

    this.title = "";
    this.rYear = 0;
    this.movieId = "";
  }
  

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data;
      this.section = 5
    });
  }

  onSaveMovie() {
    let obj = { title: this.title, year: this.rYear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  onDeleteMovie(title: string) {
    //get id from title
    for (let index = 0; index < this.moviesDB.length; index++) {
      if (this.moviesDB[index].title === title) {
        this.movieId = this.moviesDB[index]._id;
      }
    }

    this.dbService.deleteMovie(this.movieId).subscribe(result => {
      this.onGetMovies();
    });
  }

  onDeleteMovies(aYear1: number, aYear2: number) {
    this.dbService.deleteMovies(aYear1, aYear2).subscribe(result => {
      this.onGetMovies();
    });
  }
  
  onSelectUpdateMovie() {
    //get movie id from title
    for (let index = 0; index < this.moviesDB.length; index++) {
      if (this.moviesDB[index].title === this.title) {
        this.movieId = this.moviesDB[index]._id;
      }
    }

    //get actor id from fullName
    for (let index = 0; index < this.actorsDB.length; index++) {
      if (this.actorsDB[index].fullName === this.fullName) {
        this.actorId = this.actorsDB[index]._id;
      }
    }

    this.dbService.updateMovie(this.movieId, this.actorId).subscribe(result => {
      this.onGetMovies();
    });

  }
}
