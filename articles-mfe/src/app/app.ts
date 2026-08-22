import { Component } from '@angular/core';
import { NatiUiHeadingDirective } from 'ui-components';

interface Article {
  id: string;
  title: string;
  excerpt: string;
}

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Building micro frontends with Native Federation',
    excerpt: 'How the shell orchestrates independently deployed Angular applications.',
  },
  {
    id: '2',
    title: 'Signals everywhere',
    excerpt: 'Why this whole platform is built on signal-based state, top to bottom.',
  },
  {
    id: '3',
    title: 'Sharing a design system across repos',
    excerpt: 'Publishing ui-components once and linking it into every microfrontend.',
  },
];

@Component({
  imports: [NatiUiHeadingDirective],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class RemoteEntryComponent {
  protected readonly articles = ARTICLES;
}
