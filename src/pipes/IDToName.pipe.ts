import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'IDToName' })
export class IDToNamePipe implements PipeTransform {
    
    transform(value: any, ...args: any[]) {
        throw new Error("Method not implemented.");
    }
   
    constructor() {
       
    }
    
    
   
}