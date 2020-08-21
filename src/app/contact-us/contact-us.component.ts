import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../_services';

export class Contact {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: number,
    public email: string,
    public message: string
  ) { }
}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  @Output() contactdata = new EventEmitter<Contact>();
  contactForm: FormGroup;
  public obj: any = {};
  constructor(private fb: FormBuilder, private userservice:UserService) { }


  ngOnInit() {
    this.contactForm = this.fb.group({
      firstname: ["", 
        [Validators.required]],

      lastname: ["", 
        [Validators.required]],

      phonenumber: ["", 
        [Validators.required,
         Validators.pattern('^[0-9]*$'),
         Validators.minLength(10),
         Validators.maxLength(10)]],

      email: ["", 
        [Validators.required,
         Validators.pattern("[^ @]*@[^ @]*")]],

      message:["",
        [Validators.required]]
    });
  }

  onSubmit() {
    this.userservice.postcontactusdata(this.contactForm.value).subscribe((response)=>console.log("contact saved"));
    
    this.obj = { ...this.contactForm.value, ...this.obj };
    this.contactForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
      this.contactForm.value
    );

    if (this.contactForm.valid) {
      this.contactdata.emit(
        new Contact(
          this.contactForm.value.firstname,
          this.contactForm.value.lastname,
          this.contactForm.value.phonenumber,
          this.contactForm.value.email,
          this.contactForm.value.message
        )
      );
    }
  }
  get firstname(){
    return this.contactForm.get('firstname');
  }

  get lastname(){
    return this.contactForm.get('lastname');
  }

  get phonenumber(){
    return this.contactForm.get('phonenumber');
  }
  get email(){
    return this.contactForm.get('email');
  }

  get message(){
    return this.contactForm.get('message');
  }
}
