import {ClientAddress} from "./client-address.model";
import {ClientContact} from "./client-contact.model";

export class Clients {
    constructor(
    	public uid: string,
		public name: string,
		public description: string,
		public image: string,
		public owner: string,
        public address: ClientAddress[],
        public contact_info: ClientContact[]
	) {}
}