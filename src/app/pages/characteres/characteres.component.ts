import { Component } from '@angular/core';
import { IRickMortyApiCharacters } from '../models/pages.model';
import { Observable } from 'rxjs';
import { PagesService } from '../services/pages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characteres',
  templateUrl: './characteres.component.html',
  styleUrls: ['./characteres.component.scss']
})
export class CharacteresComponent {
  public characteres$: Observable<IRickMortyApiCharacters[]> = new Observable();

  constructor(
    private _characteresService:PagesService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.characteres$ = this._characteresService.getCharacteres();
  }

  addFavorite(character:IRickMortyApiCharacters){
    this.router.navigateByUrl('/pages/favorites')
  }
}
