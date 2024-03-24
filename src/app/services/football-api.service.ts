import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballApiService {
  private countriesUrl = 'https://v3.football.api-sports.io/countries';
  private teamsUrl = 'https://v3.football.api-sports.io/teams';
  private apiUrl = 'https://v3.football.api-sports.io/';
  private apiKey = 'e1c5db33da82c5fa1afe29e56cb54784'; // PAID API KEY
  // private apiKey = '6ae42d3f26c91461e5ff653bc02e2777'; // Replace with your actual API key
  // private apiKey = '381188fca01e45de8a3619f44d52019d'; // Replace with your actual API key
  // private apiKey = 'c5178804670e296d63009f71b78c455e'; // Replace with your actual API key
  // private apiKey = '8d16421443mshb02d5a47df624a4p175c59jsnff2e34b37dbc'; // Replace with your actual API key
  // private apiKey = '2ed988260c392b6232f95ead443f60c0'; // Replace with your actual API key
  // private apiKey = '6ac86a08a75b1b279dde2d81296f78ca'; // Replace with your actual API key

  constructor(private http: HttpClient) { }

  getTeams(): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    return this.http.get<any>(this.teamsUrl + '?id=33', { headers });
  }

  getCountries(): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    return this.http.get<any>(this.countriesUrl, { headers });
  }

  getTeamsByCountry(selectedCountryCode: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const params = new HttpParams().set('country', selectedCountryCode);

    return this.http.get<any>(this.teamsUrl, { headers, params });
  }

  getStandings(leagueId: any, season: any): Observable<any> {
    const apiUrl = `${this.apiUrl}standings?league=${leagueId}&season=${season}`;
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    return this.http.get<any>(apiUrl, { headers });
  }

  // getTopScorersPlayers
  getTopScorersPlayers(leagueId: any, season: any): Observable<any> {
    const apiUrl = `${this.apiUrl}players/topscorers?season=${season}&league=${leagueId}`;
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    return this.http.get<any>(apiUrl, { headers });
  }

  getSeasons(): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    return this.http.get<any>(this.apiUrl + 'leagues/seasons', { headers });
  }


  // getLeagues
  getLeagues(): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    return this.http.get<any>(this.apiUrl + 'leagues', { headers });
  }

  getMatchDetails(): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    return this.http.get<any>(this.apiUrl + '/fixtures?live=all', { headers });
  }

  getPlayerStatistics(fixtureId: string): Observable<any> {

    let apiPlayerUrl = 'https://v3.football.api-sports.io/fixtures/players';

    const apiUrl = `${this.apiUrl}fixtures/players?fixture=${fixtureId}`;
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    return this.http.get<any>(apiUrl, { headers });
  }

}
