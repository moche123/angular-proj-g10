/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { IRickMortyApiCharacters } from '../models/pages.model';
import { Observable } from 'rxjs';
import { PagesService } from '../services/pages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characteres',
  templateUrl: './characteres.component.html',
  styleUrls: ['./characteres.component.scss']
})
export class CharacteresComponent implements OnInit {
  public characteres$: Observable<any[]> = new Observable();

  constructor(
    private _characteresService:PagesService,
    private _router:Router
  ){}

  ngOnInit(): void {
    this.characteres$ = this._characteresService.getCharacteres();
  }

  addFavorite(character:IRickMortyApiCharacters){
    const body = {
      IdCharacter: character.id,
      IdUser: localStorage.getItem('userId'),
      nameCharacter: character.name,
      caracterUrlImagen: character.image,
      token: localStorage.getItem('token')
    }

    this._characteresService.addFavorite(body).subscribe(ok => {
      if(ok !== false && typeof(ok) === 'boolean' ){
        this._router.navigateByUrl('/pages/favorites');
      }
    })
  }
}
