import { Component, OnInit } from '@angular/core';

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
  public activeLink = this.links[0];
  public ngOnInit(): void {}
}
