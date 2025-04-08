import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WordListService } from './word-list.service';
import { TimerService } from './timer.service';
import { StatsService } from './stats.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  words: string[] = [];
  wordsTyped: string[] = [];
  wordSubject = new BehaviorSubject<string[]>([]);
  currentInput: string = '';
  letterStatus: { correct: boolean | null }[][] = [];
  currentWordIndex: number = 0;
  gameStarted: boolean = false;

  public wordListService = inject(WordListService);
  public timerService = inject(TimerService);
  public statsService = inject(StatsService);

  constructor() {}

  getWords() {
    return this.wordSubject.asObservable();
  }

  getRandomWords(count?: number): void {
    this.words = this.wordListService.getRandomWord(count);
    this.letterStatus = this.words.map((word) =>
      word.split('').map(() => ({ correct: null }))
    );
    this.wordSubject.next(this.words);
  }

  loadGameWords(count?: number): void {
    this.wordListService.loadWords().subscribe({
      next: () => {
        this.getRandomWords(count);
      },
      error: (err) => {
        console.error('Error loading words: ', err);
      },
    });
  }

  getCurrentWord(): string {
    return this.words[this.currentWordIndex] || '';
  }

  updateUserInput(input: string): void {
    this.currentInput = input;
    const currentWord = this.getCurrentWord();
    const inputLetters = this.currentInput.split('');
    inputLetters.forEach((letter, index) => {
      if (letter === currentWord[index]) {
        this.letterStatus[this.currentWordIndex][index] = { correct: true };
      } else {
        this.letterStatus[this.currentWordIndex][index] = { correct: false };
      }
    });
  }

  startGame(): void {
    if (this.gameStarted) return;
    this.gameStarted = true;
    this.timerService.start();
  }

  endGame(): void {
    if (this.gameStarted) return;
    this.gameStarted = false;
    this.timerService.stop();
    const elapsedTime = this.timerService.getElapsedTimeInSeconds();
    if (this.words.length === this.wordsTyped.length) {
      this.statsService.calculateStats(
        elapsedTime,
        this.words,
        this.wordsTyped
      );
    }
  }

  clearGameData(): void {
    this.currentInput = '';
    this.currentWordIndex = 0;
    this.wordsTyped = [];
  }

  restGame(): void {
    this.endGame();
    this.clearGameData();
    this.getRandomWords();
    this.timerService.restart();
    this.gameStarted = true;
  }

  private markSkippedLettersAsIncorrect(): void {
    const currentWord = this.getCurrentWord();
    const inputLength = this.currentInput.length;

    if (inputLength < currentWord.length) {
      for (let i = inputLength; i < currentWord.length; i++) {
        this.letterStatus[this.currentWordIndex][i] = { correct: false };
      }
    }
  }

  private isLastWord(): boolean {
    return this.currentWordIndex >= this.words.length - 1;
  }

  private advanceToNextWord(): void {
    this.currentWordIndex++;
    this.currentInput = '';
  }

  onNextWord(): void {
    this.wordsTyped.push(this.currentInput);
    this.markSkippedLettersAsIncorrect();
    if (this.isLastWord()) {
      this.restGame();
    } else {
      this.advanceToNextWord();
    }
  }

  removeLastCharacterStyling(): void {
    const typedLetterIndex = this.currentInput.length - 1;
    if (typedLetterIndex < 0) return;
    this.letterStatus[this.currentWordIndex][typedLetterIndex] = {
      correct: null,
    };
  }

  removeAllStylingFromCurrentWord(): void {
    const currenWordLength = this.getCurrentWord().length;
    for (let i = 0; i < currenWordLength; i++) {
      this.letterStatus[this.currentWordIndex][i] = { correct: null };
    }
  }
}
