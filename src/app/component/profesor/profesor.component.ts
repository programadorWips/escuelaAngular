import { MateriasService } from './../../services/materias.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';
import { UserInterface } from 'src/app/models/user-interface';
import { NotaInterface } from 'src/app/models/notas-interface';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  public myUser : UserInterface = {};
  public estudInfo : UserInterface = {};
  public estudiantes : UserInterface[];

  public misNotas : NotaInterface = {};
  public comprobacionDeNotas : NotaInterface = {};
  public allNotasMateria : NotaInterface[];


  constructor(private userServ: LoginService, private notaServ: MateriasService) { }

  guardarNotas(){

    console.log(this.estudInfo.id);

    this.misNotas.nombreEstudiante = this.estudInfo.nombres;
    this.misNotas.cedulaEstudiante = this.estudInfo.cedula;
    this.misNotas.grado = this.estudInfo.grado;
    this.misNotas.nombreProfesor = this.myUser.nombres;
    this.misNotas.cedulaProfesor = this.myUser.cedula;
    this.misNotas.materia = this.myUser.materia;

    this.getNotaVerificada(this.misNotas.cedulaEstudiante, this.misNotas.grado,this.misNotas.materia).subscribe(data =>{
        
      if(data[0]){
        console.log(data[0]);
        this.comprobacionDeNotas = data[0];

        this.misNotas.id = this.comprobacionDeNotas.id;

        this.notaServ.updateNotas(this.misNotas);
        this.estudInfo = {};
      }
      else{

        if(this.estudInfo.id == null){

          this.notaServ.addNotas(this.misNotas);
        }
        this.comprobacionDeNotas = {};
      }
    });
    

  }

  //-------------------------- opcion de tabla de estudiante -----------------------------------
  getAllEstu(grado : string){
    this.userServ.getAllUsers('estudiante','grado', grado).subscribe(data =>{
      if(data){
        console.log(data);
        this.estudiantes = data;
      }
    });
  }

  guardaData(alumno : UserInterface){

    this.estudInfo.nombres = alumno.nombres;
    this.estudInfo.cedula = alumno.cedula;
    this.estudInfo.grado = alumno.grado;
    this.estudInfo.nombres = alumno.nombres;
    this.estudInfo.cedula = alumno.cedula;
    this.estudInfo.materia = alumno.materia;
  }
  //----------------------------------------------------------------------------------

  getallNotasM(){
    this.notaServ.getNotasMateria(this.myUser.materia).subscribe( data => {
      if(data){
        console.log(data);
        this.allNotasMateria = data;
      }
    });
  }

  getNotaVerificada(cedula: string, grado: string, materia: string){
    return this.notaServ.getNotasEstudiante(cedula,grado,materia);
  }

  resetAll(){
    this.estudInfo = {};
  }

  guardaDataNota(notasUpdate : NotaInterface){
    this.estudInfo.id = notasUpdate.id;
    this.estudInfo.nombres = notasUpdate.nombreEstudiante;
    this.estudInfo.cedula = notasUpdate.cedulaEstudiante;
    this.estudInfo.grado = notasUpdate.grado;
    this.misNotas.nota = notasUpdate.nota;
  }

  ngOnInit() {

    this.myUser = this.userServ.myCurrentUser;


  }

}
