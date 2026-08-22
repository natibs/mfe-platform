import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RemoteEntryComponent } from './app';

describe('RemoteEntryComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoteEntryComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RemoteEntryComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
