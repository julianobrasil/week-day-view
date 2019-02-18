import {Pipe, PipeTransform} from '@angular/core';

import {WEEKDAYS} from '../../../../../shared';

@Pipe({
  name: 'weekdayNumber2Text',
})
export class WeekdayNumber2TextPipe implements PipeTransform {
  transform(dayNumber: number): string {
    return WEEKDAYS[dayNumber];
  }
}
