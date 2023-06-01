import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interface/heroes.interface';
import { switchMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      witdth:100%;
      border-radius: 5px;
    }
  `]
})
export class HeroeComponent {

  heroe!: Heroe;

  constructor( private activatedRoute: ActivatedRoute,
                private HeroesService:HeroesService,
                private router:Router ){}

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.HeroesService.getHeroePorId(id))
    )
    .subscribe( heroe => this.heroe = heroe )

  }


  regresar(){
    this.router.navigate(['heroes/listado'])
  }
}
