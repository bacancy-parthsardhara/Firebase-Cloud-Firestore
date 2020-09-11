import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  createNewStudent(record) {
    return this.firestore.collection('students').add(record);
  }

  readStudents() {
    return this.firestore.collection('students').snapshotChanges();
  }

  updateStudent(recordID,record){
    this.firestore.doc('students/' + recordID).update(record);
  }

  deleteStudent(record_id) {
    this.firestore.doc('students/' + record_id).delete();
  }
}