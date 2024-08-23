import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  constructor (
    private confirmationService: ConfirmationService
  ) { }
  db_itens = [];
  ngOnInit(): void {
    this.db_itens = JSON.parse(localStorage.getItem('db_itens'));
  }

  edit(itemData) {

  }
  delete(itemData) {
    this.confirmationService.confirm({
      header: 'Deseja excluir este item?',
      message: 'esta açao não pode ser revertida',
      accept: () => {
        //Actual logic to perform a confirmation
      }
    });
  }

}
