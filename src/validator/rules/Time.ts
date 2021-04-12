import { Rule } from './Rule';
import dayjs from 'dayjs';
export class TimeRule extends Rule {
  defaultMessage = '{{field}} must contain valid time';
  public async check(value: any = this.component.dataValue) {
    if (this.component.isEmpty(value)) return true;
    return dayjs(value, this.component.component.format).isValid();
  }
};
