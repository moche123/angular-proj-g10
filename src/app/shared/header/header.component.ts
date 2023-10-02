import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetinfoService } from '../services/getinfo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private router:Router, private _getInfoService: GetinfoService ){}
  userName:string = '';

  ngOnInit(){
    if(!localStorage.getItem('name')){
      
      console.log('THIS FLUX')
      this._getInfoService.getValue().subscribe( res => {
        if(res){
  
          this.userName=res;
        }
      } )
    }else{
      this.userName = localStorage.getItem('name') || 'User'
    }
  }

  closeSession(){
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }
}
