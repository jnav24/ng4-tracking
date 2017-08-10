export class Users {
    constructor(
        public email: string,
        public first_name: string,
        public last_name: string,
        public image: string,
        public active: boolean,
        public remember_me: boolean,
        public token: string
    ) {}
}