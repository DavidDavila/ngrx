import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Json2htmlComponent } from './json2html.component';

describe('Json2htmlComponent', () => {
  let component: Json2htmlComponent;
  let fixture: ComponentFixture<Json2htmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Json2htmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Json2htmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
