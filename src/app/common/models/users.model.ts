export class Users {
    constructor(
        public email: string,
        public first_name: string,
        public last_name: string,
        public username: string,
        public image: string,
        public active: boolean,
        public token: string
    ) {}
}