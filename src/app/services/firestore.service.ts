import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:AngularFirestore) { }


  createDoc(){
    this.firestore.collection('asignatura')
  }
  getColletcion(){
      return this.firestore.collection('asignatura').snapshotChanges()
    }
}