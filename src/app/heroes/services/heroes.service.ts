import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../interface/heroes.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]> {

    return this.http.get<Heroe[]>('http://localhost:3000/heroes')
  }

  getHeroePorId( id: string): Observable<Heroe>{

    return this.http.get<Heroe>(`http://localhost:3000/heroes/${id}`)
  }
  getSugerencias(termino:string):Observable<Heroe[]> {

    return this.http.get<Heroe[]>(`http://localhost:3000/heroes?q=${ termino }&_limit=6`)
  }

  agregarHeroe( heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`http://localhost:3000/heroes`,heroe)
  }
  actualizarHeroe( heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`http://localhost:3000/heroes/${heroe.id}`,heroe)
  }

  BorrarHeroe( id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/heroes/${id}`)
  }

}
