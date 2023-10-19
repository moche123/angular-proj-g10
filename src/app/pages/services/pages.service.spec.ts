import { HttpClient } from '@angular/common/http';
import { PagesService } from './pages.service';
import { of } from 'rxjs';
import { statusType } from '../models/pages.model';

describe('PagesService', () => {
  let service: PagesService;

  const mockHttpClient = {
    get: jasmine.createSpy('get'),
    post: jasmine.createSpy('post'),
  }

  beforeEach(() => {
     service = new PagesService(
      <HttpClient>(<unknown>mockHttpClient),
     )
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should test getCharacteres correctly', () => {
    const statusMock: statusType = 'Alive';
    const objReturnItem = {
      id: 1,
      name: 'Name',
      status: statusMock,
      image: 'img.png'
    }
    const objReturnItem2 = {
      id: 2,
      name: 'Name 2',
      status: statusMock,
      image: 'img.png'
    }

    const objReturn =  {
      info: {
          count: 0,
          pages: 0,
          next: '',
          prev: ''
      },
      results: [
        objReturnItem,
        objReturnItem2
      ]
    }

    mockHttpClient.get.and.returnValue(of(objReturn));
    const charactersObs$ = service.getCharacteres();

    charactersObs$.subscribe( (res) => {

      expect(res[0]).toEqual(objReturnItem);
    } )

  });


  it('should test getCharacteres with empty resutls', () => {

    const objReturn =  {
      info: {
          count: 0,
          pages: 0,
          next: '',
          prev: ''
      },
      results: []
    }

    mockHttpClient.get.and.returnValue(of(objReturn));
    const charactersObs$ = service.getCharacteres();

    charactersObs$.subscribe( (res) => {
      expect(res).toBe(0);
    } )

  });


  it('should test addFavorite', () => {

    const objReturn =  {
      ok: true
    }

    mockHttpClient.post.and.returnValue(of(objReturn));
    const charactersObs$ = service.addFavorite({});

    charactersObs$.subscribe( (res) => {
      
      expect(res).toBe(true);
    } )

  });

});
