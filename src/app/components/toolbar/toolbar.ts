import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Data } from '../../services/data';

interface menuItem {
  title: string,
  route: string
}

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {

  public menu: menuItem[] = [
    { title: 'Home', route: '/home' },
    { title: 'Calculator', route: '/calculator' },
    { title: 'Todo', route: '/todo' },
    { title: 'Reports', route: '/reports' },
  ]

  constructor(private router: Router, private data: Data) {
  }

  navigatePage(item: any) {
    this.router.navigateByUrl(item.route);
    this.data.publishEvent(item.title);
  }

}
