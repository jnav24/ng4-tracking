import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientsService} from "../common/services/clients.service";
import {SignInService} from "../sign-in/sign-in.service";

@Component({
    selector: 'app-dialog-clients',
    templateUrl: './dialog-clients.component.html',
    styleUrls: ['./dialog-clients.component.scss']
})
export class DialogClientsComponent implements OnInit {
    new_client: FormGroup;

    constructor(
        private form: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private clientsService: ClientsService,
        private signinService: SignInService
    ) {}

    ngOnInit() {
        this.new_client = this.form.group({
            company_name: ['', []],
            company_description: ['', []],
        });
    }

    addClient() {
        this.clientsService.addClient(
            this.signinService.uid,
            this.new_client.value.company_name,
            this.new_client.value.company_description).then(result => {
            console.log(result.key);
        }).catch(e => {
            console.log(e)
        });
    }
}
