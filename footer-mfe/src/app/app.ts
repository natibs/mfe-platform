import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class RemoteEntryComponent {
  protected readonly year = new Date().getFullYear();
}
