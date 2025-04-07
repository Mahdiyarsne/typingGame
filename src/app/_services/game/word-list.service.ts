import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordListService {
  private filePath = 'englis-1k.txt';
  private loadedWords: string[] = [];
  private defaultWordCount = 25;
  private http = inject(HttpClient);

  loadWords(): Observable<string[]> {
    return this.http.get(this.filePath, { responseType: 'text' }).pipe(
      map((data) =>
        data
          .split('\n')
          .map((word) => word.trim())
          .filter((word) => word.length > 0)
      ),
      tap((words) => {
        this.loadedWords = words;
      })
    );
  }

  getRandomIndices(count: number): Set<number> {
    if (count > this.loadedWords.length) {
      throw new Error('Request number of indices exceeds the available words.');
    }

    const randomIndices = new Set<number>();

    while (randomIndices.size < count) {
      const randomIndex = Math.floor(Math.random() * this.loadedWords.length);
      randomIndices.add(randomIndex);
    }

    return randomIndices;
  }

  getRandomWord(count?: number): string[] {
    if (this.loadedWords.length === 0) {
      throw new Error('Words have not been loaded.call loadWords() first.');
    }

    const effectiveCount = count ?? this.defaultWordCount;
    const randomIndices = this.getRandomIndices(effectiveCount);
    const result: string[] = [];

    randomIndices.forEach((index) => {
      result.push(this.loadedWords[index]);
    });

    return result;
  }
}
