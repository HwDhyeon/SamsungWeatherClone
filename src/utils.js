export class DateUtil {
  #weekdays = [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ];

  constructor(timestamp = null) {
    this.date = timestamp ? new Date(timestamp) : new Date();
    this.years = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.days = this.date.getDate();
    this.weekday = this.date.getDay();
    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();
  }

  getWeekDay() {
    return this.#weekdays[this.weekday];
  }

  formatHours() {
    if (this.hours < 12) {
      return `오전 ${this.hours ? this.hours : 12}`;
    } else if (this.hours > 12) {
      return `오후 ${this.hours - 12}`;
    } else {
      return `오후 12`;
    }
  }

  formatMinutes() {
    if (this.minutes < 10) {
      minutes = '0' + this.minutes;
    } else {
      minutes = this.minutes;
    }

    return minutes;
  }
}

export const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
