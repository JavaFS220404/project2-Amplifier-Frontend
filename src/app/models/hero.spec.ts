import { TestBed } from '@angular/core/testing';
import { HeroService } from '../services/hero.service';
import { Hero } from './hero';

describe('Hero', () => {
  let service:HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
