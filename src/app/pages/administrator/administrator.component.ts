import {Component, OnDestroy, OnInit} from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})

export class AdministratorComponent implements OnInit, OnDestroy {
  loadData = false;
  loadDetailData = false;
  pokemonData: any[] = [];
  filteredPokemons: any[]  = [];
  selectedPokemons: any[]  = [];
  user: any;
  searchControl = new FormControl('');

  private pokemonSubscription: Subscription;

  constructor(
    private svcPokemon: PokemonService,
    private router: Router
  ) {
    this.pokemonSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.loadData = false;
    this.loadDetailData = false;
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo)
      this.user = JSON.parse(userInfo);
    this.pokemonSubscription = this.svcPokemon.getPokemons().subscribe({
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

  sendPokemons() {
    this.loadDetailData = true;
  }

  backButton() {
    if (this.loadDetailData) {
      this.loadDetailData = false;
    } else {
      localStorage.removeItem('userInfo');
      this.router.navigate(['/register'], { replaceUrl: true });
    }
  }

  ngOnDestroy() {
    if (this.pokemonSubscription) {
      this.pokemonSubscription.unsubscribe();
    }
  }

}
