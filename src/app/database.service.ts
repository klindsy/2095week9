import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})

export class DatabaseService {

  constructor(private http: HttpClient) { }

  result: any;

  // Actors

  getActors() {
    return this.http.get("/actors");
  }

  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }

  createActor(data: any) {
    return this.http.post("/actors", data, httpOptions);
  }

  updateActor(id: string, data: any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteActor(id: string) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }


  // Movies

  getMovies() {
    return this.http.get("/movies");
  }

  getMovie(title: string) {
    let url = "/movie/" + title;
    return this.http.get(url);
  }

  createMovie(data: any) {
    return this.http.post("/movies", data, httpOptions);
  }

  deleteMovie(id: string) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }

  deleteMovies(aYear1: number, aYear2: number) {
    let url = "/movies/deleteBetweenYears";

    let years = { year1: aYear1, year2: aYear2 };
    let moviesDeleteOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
      body: years,
    };

    return this.http.delete(url, moviesDeleteOptions);
  }

  updateMovie(id: string, actorId: string) {
    let url = "/movies/" + id + "/actors";

    let body = { id: actorId };

    return this.http.post(url, body, httpOptions);
  }
  
}