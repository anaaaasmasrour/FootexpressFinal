import { Component, OnInit } from '@angular/core';
import { FootballApiService } from '../services/football-api.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {
  standings: any;
  seasons: any;
  selectedSeason: string = '';
  leagues: any[] = [];
  selectedLeague: string = '';

  constructor(private footballApiService: FootballApiService) { }

  ngOnInit(): void {

      // Optionally, you can dynamically load the widget script here
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://widgets.api-sports.io/2.0.3/widgets.js';
      document.body.appendChild(script);


    // // Fetch initial standings data
    // this.fetchStandings('39', '2019');
    // // Optionally, fetch seasons data
    // this.fetchSeasons();
    // // Fetch leagues data
    // this.fetchLeagues();
  }

  fetchStandings(leagueId: any, season: any) {
    this.footballApiService.getStandings(leagueId, season)
      .subscribe((data: any) => {
        this.standings = data.response;
        console.log(this.standings);
      });
  }

  fetchSeasons() {
    this.footballApiService.getSeasons()
      .subscribe((data: any) => {
        // Process data to get seasons list
        this.seasons = data.response;
      });
  }

  fetchLeagues() {
    // this.footballApiService.getLeagues()
    //   .subscribe((data: any) => {
    //     this.leagues = data.response;
    //     // Optionally, set a default selected league
    //     if (this.leagues.length > 0) {
    //       this.selectedLeague = this.leagues[0].league.name;
    //       // Fetch standings for the selected league
    //       this.fetchStandings(this.leagues[0].league.id, this.selectedSeason);
    //     }
    //   });
  }

  onSeasonChange(event: any) {
    console.log(event.target.value);

    // Handle season change event
    this.selectedSeason = event.target.value;
    // Fetch standings for the selected season and league
    this.fetchStandings(this.selectedLeague, event.target.value);
  }

  onLeagueChange(event: any) {
    // Handle league change event
    this.selectedLeague = event.target.value;
    // Fetch standings for the selected league and season
    this.fetchStandings(this.selectedLeague, this.selectedSeason);
  }
}
