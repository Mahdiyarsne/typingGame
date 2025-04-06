import { Injectable } from '@angular/core';
import { LeaderboardEntry } from '../_models/leaderboard-entry.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  mockLeaderboard: LeaderboardEntry[] = [
    { username: 'user14', cleanSpeed: 97, rawSpeed: 120, accuracy: 99 },
    { username: 'user5', cleanSpeed: 95, rawSpeed: 120, accuracy: 97 },
    { username: 'user12', cleanSpeed: 93, rawSpeed: 125, accuracy: 98 },
    { username: 'user10', cleanSpeed: 92, rawSpeed: 110, accuracy: 99 },
    { username: 'user8', cleanSpeed: 91, rawSpeed: 115, accuracy: 98 },
    { username: 'user2', cleanSpeed: 90, rawSpeed: 110, accuracy: 96 },
    { username: 'user15', cleanSpeed: 88, rawSpeed: 106, accuracy: 94 },
    { username: 'user7', cleanSpeed: 88, rawSpeed: 105, accuracy: 97 },
    { username: 'user4', cleanSpeed: 85, rawSpeed: 105, accuracy: 98 },
    { username: 'user11', cleanSpeed: 85, rawSpeed: 100, accuracy: 95 },
    { username: 'user9', cleanSpeed: 83, rawSpeed: 102, accuracy: 96 },
    { username: 'user1', cleanSpeed: 80, rawSpeed: 100, accuracy: 95 },
    { username: 'user13', cleanSpeed: 79, rawSpeed: 95, accuracy: 91 },
    { username: 'user26', cleanSpeed: 78, rawSpeed: 98, accuracy: 94 },
    { username: 'user16', cleanSpeed: 75, rawSpeed: 95, accuracy: 92 },
    { username: 'user23', cleanSpeed: 88, rawSpeed: 105, accuracy: 97 },
    { username: 'user14', cleanSpeed: 85, rawSpeed: 105, accuracy: 98 },
    { username: 'user10', cleanSpeed: 85, rawSpeed: 100, accuracy: 95 },
    { username: 'user17', cleanSpeed: 83, rawSpeed: 102, accuracy: 96 },
    { username: 'user19', cleanSpeed: 80, rawSpeed: 100, accuracy: 95 },
    { username: 'user18', cleanSpeed: 79, rawSpeed: 95, accuracy: 91 },
    { username: 'user15', cleanSpeed: 78, rawSpeed: 98, accuracy: 94 },
    { username: 'user20', cleanSpeed: 75, rawSpeed: 95, accuracy: 92 },
  ];

  getLeaderBoard(start: number, limit: number): Observable<LeaderboardEntry[]> {
    const startIndex = start;
    const endIUndex = start + limit;
    const leaderboardSlice = this.mockLeaderboard.slice(startIndex, endIUndex);
    return of(leaderboardSlice);
  }

  getCount() :Observable<{totalRecords:number}> {
    const totalRecords = this.mockLeaderboard.length;
    return of({totalRecords});
  }
}
