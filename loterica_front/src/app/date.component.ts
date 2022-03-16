import { DatePipe } from '@angular/common';
import { PipeTransform, Pipe } from '@angular/core';
import { Constants } from './constants';



@Pipe({
    name:'dateTimeFormat'
})
export class DateTimePipe extends DatePipe implements PipeTransform{
    transform(value: any, args?:any):any{
        return super.transform(value, Constants.DATE_TIME_FMT)
    }
}