import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TabViewComponent } from './tab-view.component';
import { Router } from '@angular/router';
import { NavigationTabViewService } from '../../services/navigationTabView.services';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

describe('TabViewComponent', () => {
  let component: TabViewComponent;
  let fixture: ComponentFixture<TabViewComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let navigationTabViewServiceSpy: jasmine.SpyObj<NavigationTabViewService>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const navigationTabViewServiceSpyObj = jasmine.createSpyObj(
      'NavigationTabViewService',
      ['navigationTabViewObservable']
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpyObj },
        {
          provide: NavigationTabViewService,
          useValue: navigationTabViewServiceSpyObj,
        },
        { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      ],
    });

    fixture = TestBed.createComponent(TabViewComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    navigationTabViewServiceSpy = TestBed.inject(
      NavigationTabViewService
    ) as jasmine.SpyObj<NavigationTabViewService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize activeIndex to 0', () => {
    expect(component.activeIndex).toBe(0);
  });

  it('should update activeIndex on navigationTabViewService change', () => {
    const expectedIndex = 2;
    navigationTabViewServiceSpy.navigationTabViewObservable.and.returnValue(
      of(expectedIndex)
    );

    fixture.detectChanges();

    expect(component.activeIndex).toBe(expectedIndex);
  });

  it('should navigate on tab change', () => {
    const expectedIndex = 1;
    const expectedRedirectUrl = 'some-url';
    component.modeloTab = [
      { redirect: 'url1', header: 'tab 1' },
      { redirect: expectedRedirectUrl, header: 'tab 2' },
    ];

    component.onTabChange({ index: expectedIndex });

    expect(component.activeIndex).toBe(expectedIndex);
    expect(routerSpy.navigate).toHaveBeenCalledWith([expectedRedirectUrl]);
  });

  class MockChangeDetectorRef {
    markForCheck() {}
  }
});
