import { TestBed } from '@angular/core/testing';
import { RemoteEntryComponent } from './app';

describe('RemoteEntryComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoteEntryComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RemoteEntryComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
