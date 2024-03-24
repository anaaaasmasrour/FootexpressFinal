import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { FormsModule } from '@angular/forms';
import { RankingsComponent } from './rankings/rankings.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { PlayerStatisticsComponent } from './player-statistics/player-statistics.component';
import { MatchCalendarComponent } from './match-calendar/match-calendar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'players', component: PlayerStatisticsComponent },
  { path: 'matches', component: MatchDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TeamInfoComponent,
    RankingsComponent,
    MatchDetailsComponent,
    PlayerStatisticsComponent,
    MatchCalendarComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
