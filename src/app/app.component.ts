import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'QCS-admin-panel';
  public links = [
    { path: 'cleanit/upload', label: 'Upload' },
    { path: 'cleanit/uploads-list', label: 'List Of Uploads' },
  ];
  public activeLink: any;

  constructor(private router: Router) {}
  public ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const path = event.url.replace(/\//, '');
        this.activeLink = this.links.find(link => link.path === path);
      }
    });
  }
}
