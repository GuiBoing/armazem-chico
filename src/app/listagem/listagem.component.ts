import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  constructor (
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  db_itens = [];
  msgs = [];
  ngOnInit(): void {
    this.db_itens = JSON.parse(localStorage.getItem('db_itens'));
  }

  edit(itemData) {
    this.router.navigate(['/formulario', itemData.codigo]);

  }
  delete(itemData) {
    this.confirmationService.confirm({
      header: 'Deseja excluir este item?',
      message: `Excluir item ${itemData.codigo}-${itemData.nome}? Esta ação não pode ser revertida`,
      accept: () => {
        const index = this.db_itens.findIndex(value => value.codigo === itemData.item);
        this.db_itens.splice(index+1, 1);
        localStorage.setItem('db_itens', JSON.stringify(this.db_itens));
        this.cd.detectChanges();
        this.msgs.push({ severity: 'sucess', summary: 'Item excluido', detail: `o item ${itemData.codigo}-${itemData.nome} foi apagado com sucesso!` });
      }
    });
  }

  cadastrar() {
    this.router.navigate(['/formulario']);
  }

}
