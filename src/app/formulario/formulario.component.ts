import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    nomeInput: new FormControl('', [Validators.required, Validators.max(50)]),
    marcaInput: new FormControl(''),
    escalaSelect: new FormControl({ label: 'Litro', value: 'Lt' }, Validators.required),
    quantidadeInput: new FormControl(0, Validators.required),
    valorInput: new FormControl(0, Validators.required),
    perecivelCheck: new FormControl(false),
    fabricacaoCalendario: new FormControl(new Date(), Validators.required),
    validadeCalendario: new FormControl(null),
  });


  ngOnInit(): void {
    this.items = [
      { label: 'Litro', value: 'Lt' },
      { label: 'Quilograma', value: 'Kg' },
      { label: 'Unidade', value: 'Un' }
    ];

    this.formGroup.controls['perecivelCheck'].valueChanges.subscribe(v => {
      if (v) {
        this.formGroup.get('validadeCalendario').setValidators(Validators.required);
      } else {
        this.formGroup.get('validadeCalendario').clearValidators();
        this.formGroup.get('validadeCalendario').setValue(null);
      }
      this.formGroup.get('validadeCalendario').updateValueAndValidity();
    });

    this.formGroup.controls['validadeCalendario'].valueChanges.subscribe(v => {
      if (v != null && v < new Date()) {
        this.isValidadeVencida = true;
        this.msgs.push({ severity: 'error', summary: 'Produto vencido', detail: 'produto com validadde já ultrapassada' });
      } else {
        this.isValidadeVencida = false;
      }
    });
  }


  get escalaSelect() {
    return this.formGroup.controls['escalaSelect'].value;
  }

  get isMobile() {
    return window.matchMedia("(max-width: 700px)").matches;
  }

  enviar() {
    this.formGroup.markAllAsTouched();
    this.formGroup.markAsDirty();
    if (this.formGroup.valid && !this.isValidadeVencida) {
      console.log(this.formGroup.getRawValue());
    } else {
      this.msgs.push({ severity: 'warn', summary: 'Formulario com erro', detail: 'verifique os campos com erro' });

    }
  }

}
