import { Component, OnInit } from '@angular/core';
import { FootballApiService } from '../services/football-api.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
  fixtures: any;
  matchDetails: any;

  constructor(private footballApiService: FootballApiService) { }

  ngOnInit(): void {
    // Fetch match details
    this.fetchMatchDetails();
  }

  fetchMatchDetails() {
    this.footballApiService.getMatchDetails()
      .subscribe((data: any) => {
        this.fixtures = data.response;
        this.matchDetails = data.response[0];
        console.log(this.fixtures);
      });
  }
}
