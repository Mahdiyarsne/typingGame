import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TypingTestComponent } from './pages/typing-test/typing-test.component';
import { AboutComponent } from './pages/about/about.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'typing_test', component: TypingTestComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'themes', component: ThemesComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent },

];
