import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ActorComponent } from './actor/actor.component';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from './database.service';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

const routingTable: Routes = [
  // { path: '/listactors', component:ListActorsComponent },
  // { path: '/addactors', component:AddActorsComponent },
  // { path: '/deleteactors', component:DeleteActorsComponent },
  // { path: '**', redirectTo: '/listactors', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ActorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routingTable, {useHash: true})
  ],
  providers: [
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
