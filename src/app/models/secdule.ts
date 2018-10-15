import { TimeSpan } from "../time-span";
export class Schedule {
    constructor(
        public BeginningTime?: number,
        public idSubject?: Int32Array,

        public EndTime?: number,
        public IdTeacher?: number,
        public DayOfWeek?: number
    ) { }
}
