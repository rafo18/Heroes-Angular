import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interface/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent {

  heroes: Heroe[] = []


  constructor( private HeroesService: HeroesService ){ }

  ngOnInit(): void {

    this.HeroesService.getHeroes()
    .subscribe( resp => {
      this.heroes = resp;
    })
  }

}
