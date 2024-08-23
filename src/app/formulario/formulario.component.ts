import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor () { }
  items;
  today = new Date();
  msgs = [];
  isValidadeVencida: boolean = false;
  formGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.max(50)]),
    marca: new FormControl(''),
    escala: new FormControl({ label: 'Litro', value: 'Lt' }, Validators.required),
    quantidade: new FormControl(0, Validators.required),
    valor: new FormControl(0, Validators.required),
    dt_fabricacao: new FormControl(new Date(), Validators.required),
    isPerecivel: new FormControl(false),
    dt_validade: new FormControl(null),
  });


  ngOnInit(): void {
    this.items = [
      { label: 'Litro', value: 'Lt' },
      { label: 'Quilograma', value: 'Kg' },
      { label: 'Unidade', value: 'Un' }
    ];

    this.formGroup.controls['isPerecivel'].valueChanges.subscribe(v => {
      if (v) {
        this.formGroup.get('dt_validade').setValidators(Validators.required);
      } else {
        this.formGroup.get('dt_validade').clearValidators();
        this.formGroup.get('dt_validade').setValue(null);
      }
      this.formGroup.get('dt_validade').updateValueAndValidity();
    });

    this.formGroup.controls['dt_validade'].valueChanges.subscribe(v => {
      if (v != null && v < new Date()) {
        this.isValidadeVencida = true;
        this.msgs.push({ severity: 'error', summary: 'Produto vencido', detail: 'produto com validade já ultrapassada' });
      } else {
        this.isValidadeVencida = false;
      }
    });
  }


  get escalaSelect() {
    return this.formGroup.controls['escala'].value;
  }

  get isMobile() {
    return window.matchMedia("(max-width: 700px)").matches;
  }

  enviar() {
    this.formGroup.markAllAsTouched();
    this.formGroup.markAsDirty();
    if (this.formGroup.valid && !this.isValidadeVencida) {
      this.msgs.push({ severity: 'sucess', summary: 'Sucesso!', detail: 'item registrado com sucesso' });
      let data = this.formGroup.getRawValue();
      let arrayDB = JSON.parse(localStorage.getItem('db_itens')) || [];
      data.codigo = arrayDB.length + 1;
      arrayDB.push(data);
      let stringToSave = JSON.stringify(arrayDB);
      localStorage.setItem('db_itens', stringToSave);
      this.formGroup.reset();
    } else {
      this.msgs.push({ severity: 'warn', summary: 'Formulario com erro', detail: 'verifique os campos com erro' });

    }
  }

}
