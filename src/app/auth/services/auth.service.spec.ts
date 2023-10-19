/* eslint-disable @typescript-eslint/no-explicit-any */

import { GetinfoService } from 'src/app/shared/services/getinfo.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { fakeAsync, flush } from '@angular/core/testing';

describe('AuthService', () => {
  let service: AuthService;

  const store:any = {
    token: 'token1',
    userId: 'uid1',
    name: 'name1',
  };



  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
   
  };

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  }
  
  const mockHttpClient = {
    get: jasmine.createSpy('get'),
    post: jasmine.createSpy('post'),
  }

  const mockGetInfoService = {
    emitValue: jasmine.createSpy('emitValue')
  }

  beforeEach(() => {
    service = new AuthService(
     <Router>(<unknown>mockRouter),
     <HttpClient>(<unknown>mockHttpClient),
     <GetinfoService>(<unknown>mockGetInfoService),
    )
 });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  

    it('should test returnToLogin', () => {
      service.returnToLogin();
      // expect(mockRouter.navigateByUrl).toHaveBeenCalled();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/auth/login');
    });



  it('should test goToPages', () => {
    service.goToPages();
    // expect(mockRouter.navigateByUrl).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/pages/characters');
  });

 
  it('should test isLoggedIn', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);

    const resutlLoggedIn = service.isLoggedIn();

    flush();

    expect(resutlLoggedIn).toBe(true);
  }));

 


});
