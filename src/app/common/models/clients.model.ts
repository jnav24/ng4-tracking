import {ClientAddress} from './client-address.model';
import {ClientContact} from './client-contact.model';

export class Clients {
	  constructor(
        public uid: string,
		    public name: string,
        public address_info: ClientAddress[],
        public contact_info: ClientContact[],
		    public description: string,
	  ) {}
}
