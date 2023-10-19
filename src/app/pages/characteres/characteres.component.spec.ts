import { Router } from '@angular/router';
import { PagesService } from '../services/pages.service';
import { CharacteresComponent } from './characteres.component';
import { statusType } from '../models/pages.model';
import { of } from 'rxjs';
import { fakeAsync, flush } from '@angular/core/testing';

describe('CharacteresComponent', () => {
  let component: CharacteresComponent;

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  }

  const mockPagesService = {
    getCharacteres: jasmine.createSpy('getCharacteres'),
    addFavorite: jasmine.createSpy('addFavorite')
  }
  

  beforeEach(() => {
    component = new CharacteresComponent(
     <PagesService>(<unknown>mockPagesService),
     <Router>(<unknown>mockRouter),
    )
 });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test OnInit', fakeAsync(() => {
    const statusMock: statusType = 'Alive';

    const mockGetCharacteresPayload = [
      {
        id: 1,
        name: 'Name',
        status: statusMock,
        image: 'img.png'
      },
      {
        id: 2,
        name: 'Name 2',
        status: statusMock,
        image: 'img2.png'
      }
    ]

    mockPagesService.getCharacteres.and.returnValue(of(mockGetCharacteresPayload))
    component.ngOnInit();
    flush();
    component.characteres$.subscribe(res => {
  
      expect(res[1].name).toBe('Name 2');
    })

  }));

  it('should create', fakeAsync(() => {
    const statusMock: statusType = 'Alive';
    mockPagesService.addFavorite.and.returnValue(of(true))
    component.addFavorite({
      id: 1,
      name: 'Name',
      status: statusMock,
      image: 'img.png'
    });
    flush();
    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
  }));

});
