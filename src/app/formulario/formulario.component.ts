import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Navigation } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor (
    private activatedRoute: ActivatedRoute
  ) { }
  items;
  today = new Date();
  msgs = [];
  isValidadeVencida: boolean = false;
  editCodigo: number;
  formGroup = new FormGroup({
    codigo: new FormControl(),
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
    this.activatedRoute.params.subscribe(routeParams => {
      if (routeParams && routeParams.codigo) {
        this.editCodigo = routeParams.codigo;
        let arrayDB = JSON.parse(localStorage.getItem('db_itens')) || [];
        let loadedData = arrayDB.find(item => item.codigo == routeParams.codigo);
        // PATCHVALUE N DEU CERTO this.formGroup.patchValue(this.removeEmpty(loadedData));
        Object.keys(this.formGroup.controls).forEach((element) => {
          let value = loadedData[element];
          if (element.startsWith('dt_')) {
            value = new Date(value);
          }
          if (loadedData[element] !== null) {
            this.formGroup.get(element).setValue(value);
          }
        });
      }
    });
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
      let arrayDB = JSON.parse(localStorage.getItem('db_itens')) || [];
      this.formGroup.get('codigo').setValue(arrayDB.length + 1);
      let data = this.formGroup.getRawValue();
      if (this.editCodigo) {
        data.codigo = this.editCodigo;
        arrayDB[arrayDB.findIndex(item => item.codigo == this.editCodigo)] = data;
      } else {
        arrayDB.push(data);
      }
      let stringToSave = JSON.stringify(arrayDB);
      localStorage.setItem('db_itens', stringToSave);
      this.msgs.push({ severity: 'success', summary: 'Sucesso!', detail: `item ${this.editCodigo?'editado':'registrado'} com sucesso` });
      this.formGroup.reset(
        {
          nome: '',
          marca: '',
          escala: { label: 'Litro', value: 'Lt' },
          quantidade: 0,
          valor: 0,
          dt_fabricacao: new Date(),
          isPerecivel: false,
          dt_validade: null,
        }
      );
    } else {
      this.msgs.push({ severity: 'warn', summary: 'Formulario com erro', detail: 'verifique os campos com erro' });
    }
  }


  removeEmpty(obj) {
    return Object.entries(obj)
      .filter(([_, v]) => v != null)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  }

}
