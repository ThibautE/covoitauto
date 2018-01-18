import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  today : Date;
  var1 : string;
  myDate : string;
  newDate : string;
  dateCmp : number;
  dateCmp2 : any[] = [];
  dateF : any;

  users: Object[] = [
    {"nom":"Durand", "prenom":"Delphine", "mail":"d.durand@gmail", "adresse":"rue rue", "ville":"Aubenas", "age":"29", "tel":"0605040302"},
    {"nom":"Durand", "prenom":"Julien", "mail":"jp.durand@gmail", "adresse":"rue rue", "ville":"Aubenas", "age":"29", "tel":"0605040302"},
    {"nom":"Durand", "prenom":"Paul", "mail":"p.durand@gmail", "adresse":"rue rue", "ville":"Aubenas", "age":"29", "tel":"0605040302"},
    {"nom":"Durand", "prenom":"Marie", "mail":"m.durand@gmail", "adresse":"rue rue", "ville":"Aubenas", "age":"29", "tel":"0605040302"},
  ];

  constructor() { }

  ngOnInit() {
  }

  deleteUser(){
    
  }


}


