import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import states from '../common/data/usa-states';

@Component({
  selector: 'app-dialog-address',
  templateUrl: './dialog-address.component.html',
  styleUrls: ['./dialog-address.component.scss']
})
export class DialogAddressComponent implements OnInit {
    address_info: FormGroup;
    states = states;

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.address_info = this.fb.group({
            address: ['', [Validators.required]],
            apt: ['', [Validators.required]],
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            zip: ['', [Validators.required]],
        });
    }

    addClient() {}
}
