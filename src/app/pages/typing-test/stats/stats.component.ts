import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Stats } from '../../../_models/stats.model';
import { StatsService } from '../../../_services/game/stats.service';

@Component({
  selector: 'app-stats',
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent implements OnInit, AfterViewInit {
  showContent: boolean = false;
  private statsService = inject(StatsService);
  showStats = true;
  stats: Stats = {
    cleanSpeed: 0,
    rawSpeed: 0,
    accuracy: 0,
    allLetters: 0,
    allWords: 0,
    incorrectLetters: 0,
    incorrectWords: 0,
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    },30);
  }

  ngOnInit(): void {
    this.statsService.stats$.subscribe((newStat: Stats) => {
      this.stats = newStat;
    });
  }

  toggleStats(): void {
    this.showStats = !this.showStats;
  }
}
