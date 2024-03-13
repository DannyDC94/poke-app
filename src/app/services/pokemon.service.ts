import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any[]> {
    // @ts-ignore
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
      .pipe(
        map((response: any) => {
          if (response && response.results) {
            const pokemonObservables = response.results.map((pokemon: any) => {
              return this.http.get<any>(pokemon.url);
            });
            return forkJoin(pokemonObservables);
          }
          return [];
        }),
        catchError((error: any) => {
          console.error('Error al obtener datos de Pokémon:', error);
          return of([]);
        })
      );
  }

}
