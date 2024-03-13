import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  constructor(private svcPokemon: PokemonService) { }

  ngOnInit(): void {
    this.svcPokemon.getPokemons().subscribe({
      next: value => {
        console.log(value);
      },
      error: err => {},
      complete: () => {}
    })
  }

}
