import { Component } from '@angular/core';
import { Heroe, Publisher } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }

  `]
})
export class AgregarComponent {

  constructor( private HeroesService: HeroesService,
               private activatedRoute:ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog ){}


  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return;
    }

    this.activatedRoute.params
    .pipe( switchMap( ({id}) => this.HeroesService.getHeroePorId(id) ))
    .subscribe( heroe => this.heroe = heroe)
  }

  heroe:Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance:'',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  publishers = [
    {
      id: 'Dc Comics',
      desc: 'DC - COMICS'
    },
    {
      id: 'Marvel Comics',
      desc: 'MARVEL - COMICS'
    },
  ]

  guardar(){
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.HeroesService.actualizarHeroe( this.heroe )
        .subscribe( heroe => {
          this.mostarSnackBar('Registro Actualizado')
        }
        )
    } else {

      this.HeroesService.agregarHeroe(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar',heroe.id])
          this.mostarSnackBar('Registro Creado')

        })
    }


  }

  borrar() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe,
    })

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.HeroesService.BorrarHeroe(this.heroe.id!)
          .subscribe( res => {
          this.router.navigate(['/heroes']);
          })
        }
      }

    )


  }

  mostarSnackBar( mensaje: string){
    this.snackBar.open(mensaje , 'OK!', {
      duration: 2500
    })
  }

}
