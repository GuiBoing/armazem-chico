import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  constructor() { }
  db_itens = [];

  ngOnInit(): void {
    this.db_itens = JSON.parse(localStorage.getItem('db_itens'))
  }

}
