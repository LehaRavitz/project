import { Time } from "@angular/common/src/i18n/locale_data_api";

export class scheduleTeacher {
    constructor(
        public BeginningTime?: Date,
        public EndTime?:Date,
        public IdTeacher?:number,
        public DayOfWeek?:string
       
    ){}

}
