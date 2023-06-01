import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interface/heroes.interface';

@Pipe({
  name: 'imagenPipe'
})
export class ImagenPipePipe implements PipeTransform {

  transform(heroe: Heroe): string {
    return( heroe)
    ? `../../../assets/heroes/${heroe.id}.jpg`
    : `../../../assets/no-image.png`
  }

}
