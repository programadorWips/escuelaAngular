import { NotaInterface } from 'src/app/models/notas-interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private notasCollection : AngularFirestoreCollection<NotaInterface>;
  private notas : Observable<NotaInterface[]>;

  public myCurrentUser : NotaInterface = {};
  private notasDoc : AngularFirestoreDocument<NotaInterface>;

  constructor(private fireDB: AngularFirestore ) {

    this.notasCollection = this.fireDB.collection<NotaInterface>("notas"); 
    this.notas = this.notasCollection.valueChanges();

   }

  public getNotasMateria(materia: string){

    this.notasCollection = this.fireDB.collection<NotaInterface>("notas", ref => ref.where('materia', '==', materia)); 
    this.notas = this.notasCollection.valueChanges();

    return this.notas = this.notasCollection.snapshotChanges().pipe(map(changes =>{
      return changes.map(action => {
        const data = action.payload.doc.data() as NotaInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

public getNotasEstudiante(cedula: string){

  this.notasCollection = this.fireDB.collection<NotaInterface>("notas", ref => ref.where('cedulaEstudiante', '==', cedula)); 
  this.notas = this.notasCollection.valueChanges();

  return this.notas = this.notasCollection.snapshotChanges().pipe(map(changes =>{
    return changes.map(action => {
      const data = action.payload.doc.data() as NotaInterface;
      data.id = action.payload.doc.id;
      return data;
    });
  }));
}

  public addNotas(newUser: NotaInterface){

    this.notasCollection.add(newUser).then(data => {
      alert("Se a Almacenado con Exito en la Base de datos.");
    }).catch(err=> console.log(err));

  }

  public updateNotas(updateNotas: NotaInterface){

    let idNotas = updateNotas.id;  // primero agarra el id de la collection
    this.notasDoc = this.fireDB.doc<NotaInterface>(`notas/${idNotas}`); // segundo mete la colection con ese id dentro de una variable AngularFirestoreDocument<BookInterface>
    this.notasDoc.update(updateNotas).then(data => {
      alert("Se a Actualizado con Exito en la Base de datos.");
    });

  }
}
