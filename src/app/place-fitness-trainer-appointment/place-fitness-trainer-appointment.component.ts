import { Component, OnInit} from '@angular/core';
import {  FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import {UserService} from "../_services/user.service";
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html',
  styleUrls: ['./place-fitness-trainer-appointment.component.css']
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  

  fitnessForm: FormGroup;
  
  constructor(private fb:FormBuilder,private userservice:UserService) { }
  

  ngOnInit() {

    this.fitnessForm=this.fb.group({
      firstname:['',
          [Validators.required,
           Validators.pattern('^[a-zA-Z]*$')]],

      lastname:['',
          [Validators.required,
           Validators.pattern('^[a-zA-Z]*$')]],

      email:['',
          [Validators.required,
           Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],

      phonenumber:['',
          [Validators.required,
           Validators.pattern('^[0-9]*$'),
           Validators.minLength(10),
           Validators.maxLength(10)]],

      age:['',
          [Validators.required,
           Validators.min(18),
           Validators.max(60)]],

      streetaddress:['',
          Validators.required],

      city:['',
          Validators.required],

      state:['',
          Validators.required],

      country:['',
          Validators.required],

      pincode:['',
          [Validators.required,
           Validators.pattern('^[0-9]*$'),
           Validators.minLength(6),
           Validators.maxLength(6)]],

      physiotherapist:['',Validators.required],
      trainerpreference:['',Validators.required],
      packages:['',Validators.required],
      inr:['',Validators.required],
      paisa:['',Validators.required]
      

    })
    
  }

  setInputValue(packagevalue:string){
    if(packagevalue==="basic")
    {
      this.fitnessForm.patchValue({
        inr:1000,
        paisa:10
      })  
    }

    else if(packagevalue==="premium")
    {
      this.fitnessForm.patchValue({
        inr:2000,
        paisa:20
      })
    }
    else if(packagevalue==="platinum")
    {
      this.fitnessForm.patchValue({
        inr:3000,
        paisa:30
      })
    }
  }
  onSubmit() {
    console.log(this.fitnessForm.value);
    this.userservice.postfitnessdata(this.fitnessForm.value).subscribe((response)=>console.log("user registered"));
  }

  get firstname() { 
    return this.fitnessForm.get('firstname'); 
  }
  get lastname() {
    return this.fitnessForm.get("lastname");
  }
  get email(){
    return this.fitnessForm.get("email");
  }
  get phonenumber(){
    return this.fitnessForm.get("phonenumber");
  }
  get age(){
    return this.fitnessForm.get("age");
  }
  get streetaddress(){
    return this.fitnessForm.get("streetaddress");
  }
  get city(){
    return this.fitnessForm.get("city");
  }
  get state(){
    return this.fitnessForm.get("state");
  }
  get country(){
    return this.fitnessForm.get("country");
  }
  get pincode(){
    return this.fitnessForm.get("pincode");
  }

  get physiotherapist(){
    return this.fitnessForm.get("physiotherapist");
  }

  get trainerpreference(){
    return this.fitnessForm.get("trainerpreference");
  }

  get packages(){
    return this.fitnessForm.get("packages");
  }

  get inr(){
    return this.fitnessForm.get("inr");
  }

  get paisa(){
    return this.fitnessForm.get("paisa");
  }
}
