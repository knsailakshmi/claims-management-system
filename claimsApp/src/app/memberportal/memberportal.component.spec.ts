import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberportalComponent } from './memberportal.component';

describe('MemberportalComponent', () => {
  let component: MemberportalComponent;
  let fixture: ComponentFixture<MemberportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberportalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
