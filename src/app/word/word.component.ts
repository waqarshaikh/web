import { LoggingInterceptor } from './logging.interceptor';
import { WordService } from './word.service';
import { Word } from './models/word.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  constructor(private wordService: WordService) { }

  words: Word[] = [];
  value: string = "";
  message: any = ""

  ngOnInit(): void {
    this.getAllWords()
  }

  saveWord(){
    console.log(this.words);

    let id = this.words ? this.words[this.words.length-1].id + 1: 0;
    let word = new Word(id, this.value);
    this.wordService.saveWord(word).subscribe({
      next: () => {
        this.getAllWords()
        this.wordService.message.subscribe((message)=>{
            this.message = message;
        });
      },
      error: (err) => console.log("Error saving words: "+err)
    })
  }

  getAllWords(){
    this.wordService.getWords()
    .subscribe({
      next: (words) => {this.words = words
        this.wordService.message.subscribe((message)=>{
          this.message = message;
      });
      },
      error: (err) => console.log("Error fetching words: "+err)
    })
  }

  deleteWord(id: number){
    this.wordService.deleteWord(id)
    .subscribe({
      next: () => {
        this.getAllWords()
        this.wordService.message.subscribe((message)=>{
            this.message = message;
        });
      },
      error: (err) => console.log("Error fetching words: "+err)
    })
  }

}
