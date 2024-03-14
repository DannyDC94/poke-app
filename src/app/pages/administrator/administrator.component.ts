import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {
  loadData = false;
  pokemonData: any[] = [];
  filteredPokemons: any[]  = [];
  selectedPokemons: any[]  = [];
  searchControl = new FormControl('');

  constructor(private svcPokemon: PokemonService) { }

  ngOnInit(): void {
    this.loadData = false;
    this.svcPokemon.getPokemons().subscribe({
      next: pokemonData => {
        pokemonData.forEach((pokemonResponse) => {
          this.pokemonData = pokemonResponse;
          this.filteredPokemons = pokemonResponse.slice(0, 9);
          console.log(this.pokemonData);
          this.loadData = true;
        })
      },
      error: err => {},
      complete: () => {

      }
    });
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filterPokemons(searchTerm);
    });
  }

  getListPokemon(pokemon: any): void {
    const index = this.selectedPokemons.findIndex(p => p.id === pokemon.id);
    if (index !== -1) {
      this.selectedPokemons.splice(index, 1);
      pokemon.selected = false;
    } else {
      if (this.selectedPokemons.length >= 3) return;
      this.selectedPokemons.push(pokemon);
      pokemon.selected = true;
    }
  }

  isSelected(pokemon: any): boolean {
    return this.selectedPokemons.some(p => p.id === pokemon.id);
  }

  filterPokemons(searchTerm: string): void {
    this.filteredPokemons = this.pokemonData.filter(pokemon =>
      pokemon['name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon['id'].toString() === searchTerm
    ).slice(0, 9);
  }

}
