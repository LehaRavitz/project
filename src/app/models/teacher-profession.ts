import { Teacher } from "./teacher";
import { Subject } from "./subject";


export class TeacherProfession {
    constructor(
        
        public IdTeacher?:Teacher,
        public IdSubject	?:Subject,
      
        
        public Price?:Int32Array,
        public LevelStudy?:string,
        public IdGrade	?:Int32Array,
        
        ){
        }
        
}
