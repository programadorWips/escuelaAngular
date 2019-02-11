import { UserInterface } from './../models/user-interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLogid : boolean = false;

  private UsersCollection : AngularFirestoreCollection<UserInterface>;
  private users : Observable<UserInterface[]>;

  public myCurrentUser : UserInterface = {};
  private userDoc : AngularFirestoreDocument<UserInterface>;

  constructor(private fireDB: AngularFirestore ) {

    this.UsersCollection = this.fireDB.collection<UserInterface>("users"); 
    this.users = this.UsersCollection.valueChanges();

   }

  public getAllUsers(cargo: string, selecion: string, respuesta: string){

    this.UsersCollection = this.fireDB.collection<UserInterface>("users", ref => ref.where('cargo', '==', cargo).where(selecion, '==', respuesta)); 
    this.users = this.UsersCollection.valueChanges();

    return this.users = this.UsersCollection.snapshotChanges().pipe(map(changes =>{
      return changes.map(action => {
        const data = action.payload.doc.data() as UserInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  public getAllProf(cargo: string){

    this.UsersCollection = this.fireDB.collection<UserInterface>("users", ref => ref.where('cargo', '==', cargo)); 
    this.users = this.UsersCollection.valueChanges();

    return this.users = this.UsersCollection.snapshotChanges().pipe(map(changes =>{
      return changes.map(action => {
        const data = action.payload.doc.data() as UserInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  public getUserLogin(usuario: string, password: string){

    this.UsersCollection = this.fireDB.collection("users", ref => ref.where('cedula', '==', usuario).where('password', '==', password));
    return this.users = this.UsersCollection.valueChanges();

  }

  public addUser(newUser: UserInterface){

    this.UsersCollection.add(newUser).then(data => {
      alert("Se a Almacenado con Exito en la Base de datos.");
    }).catch(err=> console.log(err));

  }

  public updateUser(updateUser: UserInterface){

    let idUser = updateUser.id;  // primero agarra el id de la collection
    this.userDoc = this.fireDB.doc<UserInterface>(`users/${idUser}`); // segundo mete la colection con ese id dentro de una variable AngularFirestoreDocument<BookInterface>
    this.userDoc.update(updateUser); // ella viene con la funcion update y como parametro pones la interfase

  }

  public deleteUsers(idUser: string){

    this.userDoc = this.fireDB.doc<UserInterface>(`users/${idUser}`);
    this.userDoc.delete();

  }



}
