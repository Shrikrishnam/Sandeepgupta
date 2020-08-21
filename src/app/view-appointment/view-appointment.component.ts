import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {
  appointments: Object;
  constructor(private userservice:UserService) { }

  

  ngOnInit() {
    this.getfitness();
  }
  
  getfitness() {
      this.userservice.getfitnessdata().subscribe((response)=>this.appointments=response);
  }
}
