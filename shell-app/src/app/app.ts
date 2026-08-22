import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RemoteOutletComponent } from './remote-outlet/remote-outlet.component';

@Component({
  imports: [RouterOutlet, RemoteOutletComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
