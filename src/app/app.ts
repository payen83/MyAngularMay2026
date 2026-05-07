import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Toolbar } from "./components/toolbar/toolbar";
import { Data } from './services/data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, MatButtonModule, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  public pageTitle: string = 'Home';

  constructor(private data: Data){}

  ngOnInit(): void {
    this.data.observeEvent().subscribe((data: any)=>{
      this.pageTitle = data;
    })
  }

  saveData(){
    let age: number = 20;  
  }


}
