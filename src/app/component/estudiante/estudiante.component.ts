import { MateriasService } from './../../services/materias.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserInterface } from 'src/app/models/user-interface';
import { NotaInterface } from 'src/app/models/notas-interface';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  public myUser : UserInterface = {};
  public estudiantes : NotaInterface[];

  constructor(private userServ: LoginService, private NotaServ: MateriasService) { }

  getAllEstu(){
    this.NotaServ.getNotasEstudianteE(this.myUser.cedula).subscribe(data =>{
      if(data){
        console.log(data);
        this.estudiantes = data;
      }
    });
  }

  ngOnInit() {

    this.myUser = this.userServ.myCurrentUser;
    this.getAllEstu();
  }

}