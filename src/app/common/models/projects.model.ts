export class Projects {
	constructor(
		public clients_id: string,
		public name: string,
		public budget: string,
		public rate: string,
		public description: string,
		public active: boolean,
		public time_left: string
	) {}
}