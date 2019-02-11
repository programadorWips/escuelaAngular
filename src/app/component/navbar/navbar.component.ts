import { Router } from '@angular/router';
import { UserInterface } from './../../models/user-interface';
import { LoginService } from './../../services/login.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public usuario: string = "";
  public password: string = "";
  public myUser : UserInterface = {};
  public logado : boolean = false;

  @ViewChild('btnClose') btnClose : ElementRef;
  constructor(private userServ: LoginService, private router: Router) { }


  formLogin(){

    this.userServ.getUserLogin(this.usuario,this.password).subscribe(data =>{

      if(data[0]){
        console.log(data);
        this.myUser = data[0];
        this.btnClose.nativeElement.click();
        this.logado = true;

        this.userServ.isLogid = this.logado;
        this.userServ.myCurrentUser = data[0];
        
        if(data[0].cargo == "admin") this.router.navigate(['admin']);

        if(data[0].cargo == "estudiante") this.router.navigate(['estudiante']);

        if(data[0].cargo == "profesor") this.router.navigate(['profesor']);
      }
      else{
        alert("Ingreso algun dato erroneo o no se encuentra registrado.");
      }
    });
  }

  logout(){
    this.logado = false;
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
