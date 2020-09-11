import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  title = 'Firestore CRUD Operations Students App';

  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.readStudents().subscribe(data => {
      console.log("inside ge the data: ", data);
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address'],
        };
      })
      console.log(this.students);

    });
  }

  CreateRecord() {
    let record = {};
    record['Name'] = this.studentName;
    record['Age'] = this.studentAge;
    record['Address'] = this.studentAddress;
    this.crudService.createNewStudent(record).then(resp => {
      this.studentName = "";
      this.studentAge = undefined;
      this.studentAddress = "";
      console.log("inside create record",resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.crudService.deleteStudent(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Age'] = recordRow.EditAge;
    record['Address'] = recordRow.EditAddress;
    this.crudService.updateStudent(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
