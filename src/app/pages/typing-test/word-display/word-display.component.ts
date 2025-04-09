import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { GameService } from '../../../_services/game/game.service';

@Component({
  selector: 'app-word-display',
  imports: [CommonModule],
  templateUrl: './word-display.component.html',
  styleUrl: './word-display.component.scss',
})
export class WordDisplayComponent implements AfterViewInit {
  showContent: boolean = false;
  public gameService = inject(GameService);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 10);
  }
}
