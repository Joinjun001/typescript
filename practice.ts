// 다양한 기능이 있는 Dict class를 ts로 구현해보자.
// abstract를 이용해서 먼저 구상함.
// 내가 헷갈렷던건, Word를 class로 구상했어야됏다.
// 빈 배열을 만들때는 생성자로 생성할 필요없음!

type Words = {
  [key: string]: string;
};

class Word {
  constructor(public term: string, public def: string) {}
}

abstract class dictFunction {
  abstract add(word: Word): void;
  abstract delete(word: Word): void;
  abstract update(word: Word): void;
  abstract showAll(word: Word): void;
  abstract count(): number;
  abstract upsert(word: Word): void;
}

class Dict extends dictFunction {
  private words: { [key: string]: string } = {};

  add(word: Word): void {
    this.words[word.term] = word.def;
  }
  delete(word: Word): void {
    delete this.words[word.term];
  }
  update(word: Word): void {
    this.words[word.term] = word.def;
  }

  showAll(): void {
    console.log(this.words);
  }

  count(): number {
    return Object.keys(this.words).length;
  }

  upsert(word: Word): void {
    if (this.words[word.term]) {
      this.update(word);
    } else {
      this.add(word);
    }
  }
}

const myDict = new Dict();
const word1 = new Word("apple", "A fruit");
const word2 = new Word(
  "book",
  "A written or printed work consisting of pages glued or sewn together along one side and bound in covers."
);
const word3 = new Word(
  "computer",
  "An electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program."
);

myDict.add(word1);
myDict.add(word2);
myDict.add(word3);

console.log(`Words count: ${myDict.count()}`);
myDict.showAll();

myDict.delete(word2);
console.log(`Words count: ${myDict.count()}`);
myDict.showAll();

myDict.upsert(
  new Word(
    "apple",
    "A round fruit with red or green skin and a white interior."
  )
);
console.log(`Words count: ${myDict.count()}`);
myDict.showAll();
