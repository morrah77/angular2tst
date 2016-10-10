/* tslint:disable:no-unused-variable */
import {AppComponent} from './app.component';

import {TestBed, async} from '@angular/core/testing';

import {By}             from '@angular/platform-browser';


describe('AppComponent with TCB', function () {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [AppComponent]});
  });

  it('should instantiate component', () => {

    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(AppComponent);
      expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });

  });

  it('should have expected <h1> text', () => {

    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(AppComponent);

      fixture.detectChanges();

      //let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works

      // take first H1 element and check it
      let h1 = fixture.debugElement.query(By.css('h1')).nativeElement;

      expect(h1.innerText).toMatch(/foo/i, '<h1> should be "FB posts"');
    });
  });

  it('should have expected messages about access token', () => {

    TestBed.compileComponents().then(async(() => {
      let fixture = TestBed.createComponent(AppComponent);

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        //let h2 = fixture.nativeElement.querySelector('h2');  // first H2 on the page in native JS syntax
        //let h2 = fixture.debugElement.query(el => el.name === 'h2').nativeElement;
        let h2 = fixture.debugElement.query(By.css('h2')).nativeElement;
        //window.console.dir(h2);
        expect(h2.innerText).toMatch(/foo/i, '<h2> should match "token"');
      });

    }));
  });

});
