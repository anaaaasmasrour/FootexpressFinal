import { Component, OnInit } from '@angular/core';
import { FootballApiService } from '../services/football-api.service';

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.css']
})
export class PlayerStatisticsComponent implements OnInit {
  playerStatistics: any[] | undefined; // Declare playerStatistics property

  pageSizeOptions: number[] = [10, 15, 20, 50];
  pageSize = 10;
  currentPage = 0;
  totalItems = 0;
  fixtures: any;
  matchDetails: any;
  topScorers: any;
  seasons: any;
  selectedSeason: string = '2019';
  leagues: any[] = [];
  selectedLeague: string = '39';


  constructor(private footballApiService: FootballApiService) { }

  ngOnInit(): void {
    // Call the method to fetch player statistics
    // this.fetchPlayerStatistics();
    this.fetchSeasons();
    this.fetchLeagues();
  }

  fetchSeasons() {
    this.footballApiService.getSeasons()
      .subscribe((data: any) => {
        this.seasons = data.response;
      });
  }

  fetchLeagues() {
    this.footballApiService.getLeagues()
      .subscribe((data: any) => {
        this.leagues = data.response;
        if (this.leagues.length > 0) {
          this.selectedLeague = this.leagues[0].league.name;
        }
      });
  }

  onSeasonChange(event: any) {

    this.selectedSeason = event.target.value;
    console.log(this.selectedSeason);
    this.fetchTopScorersPlayers();

  }

  onLeagueChange(event: any) {
    this.selectedLeague = event.target.value;

    console.log(this.selectedLeague);
    this.fetchTopScorersPlayers();
  }

  fetchTopScorersPlayers() {
    this.footballApiService.getTopScorersPlayers(this.selectedLeague, this.selectedSeason)
      .subscribe((data: any) => {
        this.topScorers = data.response;
      });
  }


  // fetchPlayerStatistics() {
  //   // Call your service method to fetch player statistics
  //   this.footballApiService.getPlayerStatistics('1040235')
  //     .subscribe((data: any) => {
  //       // Assign the retrieved player statistics to the playerStatistics property
  //       this.playerStatistics = data.response[0];
  //       console.log(this.playerStatistics);
  //     });
  // }

  // fetchPlayerStatistics() {
  //   this.footballApiService.getPlayerStatistics('1040235')
  //     .subscribe((data: any) => {
  //       this.playerStatistics = data.response;
  //     });
  // }
}
