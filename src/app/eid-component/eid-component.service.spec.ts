import { TestBed } from '@angular/core/testing';
import { EidComponentService } from './eid-component.service';


describe('MenuService', () => {
  let service: EidComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EidComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
