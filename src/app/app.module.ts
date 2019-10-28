import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './features/details/details.component';
import { PokemonCardComponent } from './features/details/pokemon-card/pokemon-card.component';
import { FormComponent } from './features/home/form/form.component';
import { HomeComponent } from './features/home/home.component';
import { ListComponent } from './features/home/list/list.component';
import { PaginationComponent } from './features/home/list/pagination/pagination.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

@NgModule({
  declarations: [
    LoaderComponent,
    AppComponent,
    HomeComponent,
    DetailsComponent,
    FormComponent,
    ListComponent,
    PaginationComponent,
    PokemonCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
