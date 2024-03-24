import { Component, OnInit } from '@angular/core';
import { FootballApiService } from '../../services/football-api.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {
  countries: any[] | undefined;
  teams: any[]| undefined;
  selectedCountryCode: string | undefined;

  constructor(private footballApiService: FootballApiService) { }
  ngOnInit(): void {

    this.getCountries();


    // this.footballApiService.getTeams().subscribe(
    //   (response) => {
    //     this.teams = response.response;
    //   },
    //   (error) => {
    //     console.error('Error fetching teams:', error);
    //   }
    // );
  }

  getCountries() {
    this.footballApiService.getCountries().subscribe(
      (response) => {
        this.countries = response.response;
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  onCountrySelect(countryCode:string | undefined) {
    this.selectedCountryCode = countryCode;
    this.getTeamsByCountry();
  }

  getTeamsByCountry() {
    if (this.selectedCountryCode) {
      this.footballApiService.getTeamsByCountry(this.selectedCountryCode).subscribe(
        (response) => {
          this.teams = response.response;
        },
        (error) => {
          console.error('Error fetching teams:', error);
        }
      );
    }
  }
}
