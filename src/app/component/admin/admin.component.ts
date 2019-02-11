import { LoginService } from './../../services/login.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserInterface } from 'src/app/models/user-interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from  'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public myUser : UserInterface = {};
  public addUser : UserInterface = {};

  public agregadoInfo : number = 0;
  public erro : boolean = false;

  public estudiantes : UserInterface[];
  public profesores : UserInterface[];

  public uploadPercent : Observable<number>; // esto es para ver el porsentaje la subida de img 
  public urlImg : Observable<string>;

  @ViewChild('imgUser') imgUser : ElementRef;
  constructor(private userServ: LoginService, private myImg: AngularFireStorage) { }

  //funciones para Upload Imagen en Firebase----------------------------------------------------------
  uploadImg(event){

    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const pathFile = 'upload/perfil_' + id;
    const ref = this.myImg.ref(pathFile);
    const task = this.myImg.upload(pathFile,file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImg = ref.getDownloadURL())).subscribe();
  }
  //----------------------------------------------------------------------------------------------------
  
  // funciones de Estudiantes -------------------------------------------------------------------------
  public getAllEstu(grado : string){

    this.userServ.getAllUsers('estudiante', 'grado', grado).subscribe(data =>{
      console.log(data);

      this.estudiantes = data;
    });
  }

  guardaData(alumno: UserInterface){
    this.addUser = alumno;
  }
  //----------------------------------------------------------------------------------------------------------

  // funciones de Profesores -------------------------------------------------------------------------
  public getAllProf(){

    this.userServ.getAllProf('profesor').subscribe(data =>{
      console.log(data);

      this.profesores = data;
    });
  }
  //----------------------------------------------------------------------------------------------------------

  eliminaData(id : string){
    
    if(confirm("Seguro que desea Eliminar a este Usuario?")){
      this.userServ.deleteUsers(id);
    }
  }

  public guardarUsuarios(){

    if(this.addUser.cargo == null ||
      this.addUser.cedula == null ||
      this.addUser.nombres == null ||
      this.addUser.password == null ||
      this.addUser.edad == null){
      
      this.erro = true;
    }else{
      
      if(this.addUser.id == null){

        this.addUser.urlImg = this.imgUser.nativeElement.value;
        console.log(this.addUser);
        this.userServ.addUser(this.addUser);
        this.addUser = {};

      }else{
        this.userServ.updateUser(this.addUser);
        this.addUser = {};

      }
    }
  }

  public selectCargo(){
    console.log("Cambio a : " + this.addUser.cargo);

    if(this.addUser.cargo == "estudiante"){
      this.agregadoInfo = 1;
      this.addUser.materia = "";

    }else if(this.addUser.cargo == "profesor"){
      this.agregadoInfo = 2;
      this.addUser.grado = "";
    
    }else{
      this.addUser.materia = "";
      this.addUser.grado = "";
      this.agregadoInfo = 0;
    }
  }

  public cancelbtn(){
    this.addUser = {};
  }

  ngOnInit() {

    this.myUser = this.userServ.myCurrentUser;
  }

}
