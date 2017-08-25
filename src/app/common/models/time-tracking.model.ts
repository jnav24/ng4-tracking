export class TimeTracking {
	constructor(
		public projects_id: string,
		public start_time: Date,
		public end_time: Date,
		public description: string,
		public title: string
	) {}
}