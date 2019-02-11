import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule } from '@angular/forms';

//Material Dising Angular
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatSelectModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';

//--------------------------------------------------------------------------------
import { environment } from './../environments/environment';
import { HomeComponent } from './component/home/home.component';
import { AdminComponent } from './component/admin/admin.component';
import { EstudianteComponent } from './component/estudiante/estudiante.component';
import { ProfesorComponent } from './component/profesor/profesor.component';
import { MisionComponent } from './component/vistas/mision/mision.component';
import { InstitucionComponent } from './component/vistas/institucion/institucion.component';
import { ReglamentosComponent } from './component/vistas/reglamentos/reglamentos.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PiepaginaComponent } from './component/piepagina/piepagina.component';
import { Err404Component } from './component/err404/err404.component'; // para guardar imagenes

// Google Map 
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

//Base de Datos Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    EstudianteComponent,
    ProfesorComponent,
    MisionComponent,
    InstitucionComponent,
    ReglamentosComponent,
    NavbarComponent,
    PiepaginaComponent,
    Err404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyCWiqYMl8EhQzpt74NIuHlwi2irUb3-5UM'
    })

  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
