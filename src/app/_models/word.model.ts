export class Word {
  letters: string[];

  constructor(public word: string) {
    this.letters = this.word.split('');
  }

  equals(otherWord: Word): boolean {
    return this.word === otherWord.word;
  }

  getLettersNumber(): number {
    return this.letters.length;
  }

  compareLetters(otherWord: Word): number {
    let correctLettersCount = 0;
    const lengthToCompare = Math.min(
      this.letters.length,
      otherWord.letters.length
    );

    for (let i = 0; i < lengthToCompare; i++) {
      if (this.letters[i] === otherWord.letters[i]) {
        correctLettersCount++;
      }
    }
    return correctLettersCount;
  }

  toString(){
    return this.word;
  }
}
