import { Component, OnInit } from '@angular/core';
import { differenceInMinutes } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  startDate = new Date('2021-12-01T00:00:00');
  endDate = new Date('2022-03-01T00:00:00');
  totalWinterTimeInMinutes: number = 0;
  passedWinterTimeInMinutes: number = 0;
  percentagePassed = '';

  ngOnInit() {
    this.totalWinterTimeInMinutes = differenceInMinutes(this.startDate, this.endDate);
    setInterval(() => {
      const currentDate = new Date();
      this.passedWinterTimeInMinutes = differenceInMinutes(this.startDate, currentDate);
      this.percentagePassed = `${((this.passedWinterTimeInMinutes * 100) / this.totalWinterTimeInMinutes).toFixed(2)} %`;
    }, 1000);
  }
}
