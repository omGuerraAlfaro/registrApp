import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }


  createDoc() {
    this.firestore.collection('asignatura')
  }
  getColletcion() {
    return this.firestore.collection('asignatura').snapshotChanges()
  }

  createDoc2() {
    this.firestore.collection('clases');
  }
  getCollection2() {
    return this.firestore.collection('clases').snapshotChanges();
  }

  insertColectionAsignatura(data: any){
    const { idlottie, totalclases, seccion } = data as Record<string, unknown>;
    console.log(data);
    const code = {
      code: data.code, idlottie, totalclases, seccion
    };
    return this.firestore.collection('clases').doc('asignaturas').update({code});
  }


  getCollectionParams<tipo>(path: string, params: string, value: string) {
    const dataCollection: AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path
      , ref => ref.where(params, '==', value));
    return dataCollection.valueChanges();
  }
}