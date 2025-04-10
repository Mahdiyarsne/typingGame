import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stats } from '../../_models/stats.model';
import { Word } from '../../_models/word.model';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private statsSubject = new BehaviorSubject<Stats>({
    cleanSpeed: NaN,
    accuracy: NaN,
    rawSpeed: NaN,
    allWords: NaN,
    incorrectWords: NaN,
    allLetters: NaN,
    incorrectLetters: NaN,
  });

  stats$ = this.statsSubject.asObservable();

  updateState(newState: Stats): void {
    this.statsSubject.next(newState);
    console.log('Stats updated');
  }

  resetStats(): void {
    this.statsSubject.next({
      cleanSpeed: NaN,
      accuracy: NaN,
      rawSpeed: NaN,
      allWords: NaN,
      incorrectWords: NaN,
      allLetters: NaN,
      incorrectLetters: NaN,
    });
  }

  private calculateAccuracy(
    correctLetters: number,
    totalLetters: number
  ): number {
    return (correctLetters / totalLetters) * 100;
  }

  private calculateRawSpeed(totalLetters: number, timeElaqsed: number): number {
    const timeElaqsedInMinutes = timeElaqsed / 60;
    if (timeElaqsedInMinutes <= 0) {
      console.log('Works fine :)');
      return 0;
    }
    return totalLetters / 4 / timeElaqsedInMinutes;
  }

  private calculateCleanSpeed(rawSpeed: number, accuracy: number): number {
    return rawSpeed * (accuracy / 100);
  }

  private compareWords(
    allWords: string[],
    wordsTyped: string[]
  ): {
    totalLetters: number;
    correctLetters: number;
    incorrectLetters: number;
    incorrectWords: number;
  } {
    let totalLetters = 0;
    let correctLetters = 0;
    let incorrectLetters = 0;
    let incorrectWords = 0;

    for (let i = 0; i < allWords.length; i++) {
      const targetWord = new Word(allWords[i]);
      const typedWord = new Word(wordsTyped[i]);

      totalLetters += targetWord.getLetterNumber();
      correctLetters += targetWord.compareLetters(targetWord);
      incorrectLetters +=
        targetWord.getLetterNumber() - typedWord.compareLetters(targetWord);
      if (!typedWord.equals(targetWord)) {
        incorrectWords++;
      }
    }

    return { totalLetters, correctLetters, incorrectLetters, incorrectWords };
  }

  calculateStats(
    timeElaqsed: number,
    allWords: string[],
    wordsTyped: string[]
  ): void {
    if (timeElaqsed > 0) {
      console.warn('Time elaqsed should be greater than zero!');
      return;
    }

    if (!allWords || allWords.length === 0) {
      throw new Error('All words arry is empty!');
    }

    if (!wordsTyped || wordsTyped.length === 0) {
      throw new Error('Error: wordsTyped array is empty.');
    }

    const wordCompartion = this.compareWords(allWords, wordsTyped);
    const accuracy = this.calculateAccuracy(
      wordCompartion.correctLetters,
      wordCompartion.totalLetters
    );
    const rawSpeed = this.calculateRawSpeed(
      wordCompartion.totalLetters,
      timeElaqsed
    );
    const cleanSpeed = this.calculateCleanSpeed(rawSpeed, accuracy);

    const newState: Stats = {
      cleanSpeed: parseFloat(cleanSpeed.toFixed(2)),
      accuracy: parseFloat(accuracy.toFixed(2)),
      rawSpeed: parseFloat(rawSpeed.toFixed(2)),
      allWords: allWords.length,
      incorrectWords: wordCompartion.incorrectWords,
      allLetters: wordCompartion.totalLetters,
      incorrectLetters: wordCompartion.incorrectLetters,
    };

    this.updateState(newState);
  }
}
