import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent implements OnInit {

  @Input() pokemon: any;

  TYPES_POKEMON = {
    'grass': 'Planta',
    'fire': 'Fuego',
    'water': 'Agua',
    'electric': 'Eléctrico',
    'ice': 'Hielo',
    'flying': 'Volador',
    'rock': 'Roca',
    'ground': 'Tierra',
    'bug': 'Bicho',
    'poison': 'Veneno',
    'fighting': 'Lucha',
    'psychic': 'Psíquico',
    'dark': 'Oscuridad',
    'steel': 'Acero',
    'fairy': 'Hada',
    'dragon': 'Drágon',
  };

  TYPES_HABILITIES = {
    'hp': 'HP',
    'attack': 'Ataque',
    'defense': 'Defensa',
    'special-attack': 'Ataque Especial',
    'special-defense': 'Defensa Especial',
    'speed': 'Velocidad'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
