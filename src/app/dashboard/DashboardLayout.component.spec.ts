import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAIN_TABS } from '../shared/constants/modelTabs';
import { DashboardLayoutComponent } from './DashboardLayout.component';

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with modelTab', () => {
    expect(component.modelTab).toEqual(MAIN_TABS);
  });
});
