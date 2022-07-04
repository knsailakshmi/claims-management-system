import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsstatusComponent } from './claimsstatus.component';

describe('ClaimsstatusComponent', () => {
  let component: ClaimsstatusComponent;
  let fixture: ComponentFixture<ClaimsstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
