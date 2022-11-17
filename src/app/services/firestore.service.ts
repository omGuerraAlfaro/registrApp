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


  getCollectionParams<tipo>(path: string, params: string, value: string) {
    const dataCollection: AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path
      , ref => ref.where(params, '==', value));
    return dataCollection.valueChanges();
  }
}