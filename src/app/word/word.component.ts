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

  ngOnInit(): void {
    this.wordService.getWords()
    .subscribe({
      next: (words) => this.words = words,
      error: (err) => console.log("Error fetching words: "+err)
    })
  }

}
