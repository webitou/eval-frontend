import { Pipe, PipeTransform } from '@angular/core';
import { daysOfWeek } from '../../_core/constants/constants';

@Pipe({
  name: 'dayOfWeek'
})

export class DayOfWeekPipe implements PipeTransform {

  transform(value: number): string {
    return (daysOfWeek.find(day => day.id === value) || { name: '' }).name;
  }
}
