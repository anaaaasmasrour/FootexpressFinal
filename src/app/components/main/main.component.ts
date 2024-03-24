import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FootballApiService } from 'src/app/services/football-api.service';


export interface AgencyComponent {
  title: string;
  abbreviation: string;
  website: string;
  submission_address: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['title', 'website', 'address'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  pageSizeOptions: number[] = [10, 15, 20, 50];
  pageSize = 10;
  currentPage = 0;
  totalItems = 0;
  fixtures: any;
  matchDetails: any;
  standings: any;
  seasons: any;
  selectedSeason: string = '2019';
  leagues: any[] = [];
  selectedLeague: string = '39';

  constructor(private footballApiService: FootballApiService,private renderer: Renderer2
              ) {}

  ngOnInit() {
    this.fetchMatchDetails();
    this.fetchSeasons();
    this.fetchLeagues();


  }

  fetchStandings() {
    this.footballApiService.getStandings(this.selectedLeague, this.selectedSeason)
      .subscribe((data: any) => {
        this.standings = data.response;
      });
  }

  fetchMatchDetails() {
    this.footballApiService.getMatchDetails()
      .subscribe((data: any) => {
        this.fixtures = data.response;
        const randomNumber = Math.floor(Math.random() * 6);
        this.matchDetails = data.response[randomNumber];

      });
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
    this.fetchStandings();
    this.reloadWidget();

  }

  onLeagueChange(event: any) {
    this.selectedLeague = event.target.value;

    console.log(this.selectedLeague);
    this.fetchStandings();
    this.reloadWidget();
  }


   // Method to reload the widget
   reloadWidget() {
    const widgetContainer = document.getElementById('widget-container');
    const widget = document.getElementById('wg-api-football-standings');

    if (widget && widgetContainer) {
      // Remove the widget
      widgetContainer.removeChild(widget);

      // Create a new widget element
      const newWidget = this.renderer.createElement('div');
      this.renderer.setAttribute(newWidget, 'id', 'wg-api-football-standings');
      this.renderer.setAttribute(newWidget, 'data-host', 'v3.football.api-sports.io');
      this.renderer.setAttribute(newWidget, 'data-league', this.selectedLeague); // Set selected league
      this.renderer.setAttribute(newWidget, 'data-season', this.selectedSeason); // Set selected season
      // Add other attributes...

      // Append the new widget to the container
      this.renderer.appendChild(widgetContainer, newWidget);
    }

    this.loadScript('https://widgets.api-sports.io/2.0.3/widgets.js');
  }


  loadScript(src: string) {
    const script = this.renderer.createElement('script');
    script.type = 'module';
    script.src = src;
    this.renderer.appendChild(document.body, script);
  }
}
