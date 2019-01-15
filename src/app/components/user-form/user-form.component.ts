import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public userForm;
  public message: boolean = false;
  public states;

  constructor(private form: FormBuilder, private us: UserService) {
    this.states = this.us.getStates();
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
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

  submitForm(){
    this.message = false;
    if (this.userForm.valid){
      this.us.createUser(this.userForm.value).subscribe(response =>{
        if (response["message"]=="success"){
            this.message = true
        }
      });
    }
  }

}
