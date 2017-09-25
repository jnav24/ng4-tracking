import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import states from '../common/data/usa-states';
import {ClientsService} from "../common/services/clients.service";
import {SignInService} from "../sign-in/sign-in.service";

@Component({
  selector: 'app-dialog-address',
  templateUrl: './dialog-address.component.html',
  styleUrls: ['./dialog-address.component.scss']
})
export class DialogAddressComponent implements OnInit {
    address_info: FormGroup;
    states = states;

    constructor(
        private fb: FormBuilder,
        private signinService: SignInService,
        private clientsService: ClientsService
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

    async addAddress() {
        try {
            await this.clientsService.addAddress(
                this.signinService.uid,
                this.address_info.value.address,
                this.address_info.value.apt,
                this.address_info.value.city,
                this.address_info.value.state,
                this.address_info.value.zip,
            );
        }
        catch (err) {
            console.log(err);
        }
    }
}
