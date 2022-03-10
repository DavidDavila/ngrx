import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EidComponent } from './eid-component.component';


describe('EidComponent', () => {
  let component: EidComponent;
  let fixture: ComponentFixture<EidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
