import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { StatsComponent } from './stats/stats.component';
import { InputRowComponent } from './input-row/input-row.component';
import { WordDisplayComponent } from './word-display/word-display.component';
import { GameService } from '../../_services/game/game.service';

@Component({
  selector: 'app-typing-test',
  imports: [
    CommonModule,
    StatsComponent,
    InputRowComponent,
    WordDisplayComponent,
  ],
  templateUrl: './typing-test.component.html',
  styleUrl: './typing-test.component.scss',
})
export class TypingTestComponent implements OnInit, OnDestroy {
  public gameService = inject(GameService);

  ngOnInit(): void {
    this.gameService.getWords().subscribe();
  }

  ngOnDestroy(): void {
    this.gameService.resetGame();
    console.log('Game rest on component distuction');
  }
}
