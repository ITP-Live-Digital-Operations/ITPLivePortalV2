import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDemographicsComponent } from './profile-demographics.component';

describe('ProfileDemographicsComponent', () => {
  let component: ProfileDemographicsComponent;
  let fixture: ComponentFixture<ProfileDemographicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDemographicsComponent]
    });
    fixture = TestBed.createComponent(ProfileDemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
