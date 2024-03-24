import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FootballApiService } from '../services/football-api.service';

@Component({
  selector: 'app-match-calendar',
  templateUrl: './match-calendar.component.html',
  styleUrls: ['./match-calendar.component.css']
})
export class MatchCalendarComponent implements OnInit {
  fixtures: any[] | undefined;

  // fixtures:any = [
  //   {
  //     date: '2024-03-25',
  //     time: '15:00',
  //     league: { name: 'Premier League' },
  //     teams: {
  //       home: { name: 'Manchester United' },
  //       away: { name: 'Liverpool' }
  //     }
  //   },
  //   {
  //     date: '2024-03-26',
  //     time: '14:30',
  //     league: { name: 'La Liga' },
  //     teams: {
  //       home: { name: 'Real Madrid' },
  //       away: { name: 'Barcelona' }
  //     }
  //   },
  //   {
  //     date: '2024-03-27',
  //     time: '16:45',
  //     league: { name: 'Serie A' },
  //     teams: {
  //       home: { name: 'Juventus' },
  //       away: { name: 'AC Milan' }
  //     }
  //   }
  // ];



  constructor(private footballApiService: FootballApiService) { }

  ngOnInit(): void {
    this.fetchFixtures();
  }

  fetchFixtures() {
    this.footballApiService.getMatchDetails()
      .subscribe((data: any) => {
        this.fixtures = data.response;
        console.log(this.fixtures);
      });
  }
}
