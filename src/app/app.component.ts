import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  season = '';
  percentagePassed: number | string = 'Loading ...';

  ngOnInit() {
    this.setPercentage();
    setInterval(this.setPercentage, 6000);
  }

  setSeason = () => {
    const now = moment();

    switch (now.month()) {
      case 11:
      case 0:
      case 1:
        this.season = 'iarna';
        break;
      case 2:
      case 3:
      case 4:
        this.season = 'primavara';
        break;
      case 5:
      case 6:
      case 7:
        this.season = 'vara';
        break;
      default:
        this.season = 'toamna';
    }
  };

  setPercentage = () => {
    this.setSeason();

    const now = moment(new Date());

    const { start, end } = this.seasonInterval(now);

    const seasonDurationInMinutes = moment.duration(end.diff(start)).asHours();
    const howMuchPassedInMinutes = moment.duration(now.diff(start)).asHours();

    this.percentagePassed = `${((howMuchPassedInMinutes * 100) / seasonDurationInMinutes).toFixed(2)} %`;
  };

  isWinter = (date: moment.Moment): boolean => {
    return [11, 0, 1].includes(date.month());
  };

  isSpring = (date: moment.Moment): boolean => {
    return [2, 3, 4].includes(date.month());
  };

  isSummer = (date: moment.Moment): boolean => {
    return [5, 6, 7].includes(date.month());
  };

  isAutumn = (date: moment.Moment): boolean => {
    return [8, 9, 10].includes(date.month());
  };

  seasonInterval = (now: moment.Moment): { start: moment.Moment; end: moment.Moment } => {
    if (this.isSpring(now)) {
      return { start: now.clone().set('month', 2).startOf('M'), end: now.clone().set('month', 4).endOf('M') };
    }
    if (this.isSummer(now)) {
      return { start: now.clone().set('month', 5).startOf('M'), end: now.clone().set('month', 7).endOf('M') };
    }
    if (this.isAutumn(now)) {
      return { start: now.clone().set('month', 8).startOf('M'), end: now.clone().set('month', 10).endOf('M') };
    }

    if (now.month() === 11) {
      return {
        start: now.clone().startOf('M'),
        end: now.clone().add(1, 'y').set('month', 1).endOf('M')
      };
    }

    return {
      start: now.clone().subtract(1, 'y').set('month', 11).startOf('M'),
      end: now.clone().set('month', 1).endOf('M')
    };
  };
}
