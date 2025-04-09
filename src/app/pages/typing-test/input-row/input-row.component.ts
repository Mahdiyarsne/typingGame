import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { GameService } from '../../../_services/game/game.service';

@Component({
  selector: 'app-input-row',
  imports: [CommonModule],
  templateUrl: './input-row.component.html',
  styleUrl: './input-row.component.scss',
})
export class InputRowComponent implements AfterViewInit {
  @ViewChild('wordInput') wordInput!: ElementRef<HTMLInputElement>;
  showCotent: boolean = false;
  private gameService = inject(GameService);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showCotent = true;
    }, 20);
  }

  resetInput(): void {
    if (this.wordInput) {
      this.wordInput.nativeElement.value = '';
    }
    this.gameService.updateUserInput('');
  }

  onInputChange(): void {
    const userInput = this.wordInput.nativeElement.value;
    this.gameService.updateUserInput(userInput);
  }

  onKeyDown(event: KeyboardEvent): void {
    const userInput = this.wordInput.nativeElement.value;

    if (!this.gameService.startGame) {
      this.gameService.startGame();
    }

    this.gameService.updateUserInput(userInput);

    if (event.key === ' ') {
      event.preventDefault();
      this.gameService.onNextWord();
      this.resetInput();
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      this.gameService.resetGame();
      this.resetInput();
      return;
    }

    if (event.key === 'Backspace' && event.ctrlKey) {
      this.gameService.removeAllStylingFromCurrentWord();
      this.resetInput();
    }

    if (event.key === 'Backspace') {
      this.gameService.removeLastCharacterStyling();
    }
  }

  onRedoCkick(): void {
    this.gameService.resetGame();
    this.resetInput();
  }
}
