import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrackersHomeComponent } from './crackers-home.component';

describe('CrackersHomeComponent', () => {
  let component: CrackersHomeComponent;
  let fixture: ComponentFixture<CrackersHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrackersHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrackersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
