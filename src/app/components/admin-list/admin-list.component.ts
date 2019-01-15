import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  public userList;
  public editModal: boolean = false;
  public userForm;
  public states;

  constructor(private form: FormBuilder, private us: UserService) {
    this.states = this.us.getStates();
    this.createForm();
  }

  ngOnInit() {
    this.getList();
  }

  createForm(){
    this.userForm = this.form.group({
      id: "",
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      age_group: "0",
      state: "",
      zip: "",
      newsletter: false
    });
  }

  getList(){
    this.us.getUserList().subscribe(data => {
      this.userList = data;
    });
    console.log(this.userList);
  }

  editUser(objVal){
    this.editModal = true;
    this.userForm.patchValue({
      id: objVal['id'],
      firstname: objVal['firstname'],
      lastname: objVal['lastname'],
      email: objVal['email'],
      phone: objVal['phone'],
      age_group: objVal['age_group'],
      state: objVal['state'],
      zip: objVal['zip'],
      newsletter: objVal['zip']
    })
  }

  updateUser(){
    this.us.editUser(this.userForm.value).subscribe(data => {
      if (data['message'] == "success"){
        this.userForm.reset({
          id: "",
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          age_group: "0",
          state: "",
          zip: "",
          newsletter: false
        });
        this.getList();
        this.editModal = false;
      }
    });
  }

  deleteUser(obj){
    this.us.deleteUser(obj).subscribe(data => {
      if (data['message'] == "success"){
        console.log(data);
        this.getList();
      }
    });
  }

}
