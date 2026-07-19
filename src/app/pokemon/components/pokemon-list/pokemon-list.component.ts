import { Component, signal, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../../common/models/pokemon/pokemon.model';
import { ToastService } from '../../../common/services/toast/toast.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { MatIcon } from '@angular/material/icon';

class PokemonRow {
  id: number = 0;
  name: string = "";
  height: number = 0;
  weight: number = 0;
  types: string[] = [];
  hp: number = 0;
  attack: number = 0;
  defense: number = 0;
  specialAttack: number = 0;
  specialDefense: number = 0;
  speed: number = 0;
  get total() {
    return this.hp + this.attack + this.defense + this.specialAttack + this.specialDefense + this.specialAttack;
  }
  sprite: string = "";
}

interface Filter {
  name?: string;
  types: string[]
}


@Component({
  selector: 'app-pokemon-list',
  standalone:true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatSelectModule,
    MatFormFieldModule, MatInputModule, MatSidenavModule, NgxEchartsDirective, MatIcon],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {

  pokemonSub?: Subscription;
  pokemonsLoading = signal<boolean>(false);
  pokemons = signal<PokemonRow[]>([]);

  selectedPokemon = signal<PokemonRow | null>(null);

  dataSource = new MatTableDataSource<PokemonRow>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterDetails: Filter = { types: [], name: undefined };

  pokemonTypes: string[] = [];

  searchChanged = new Subject<string>();


  displayedColumns: string[] =
    [
      "id",
      "sprite",
      "name",
      "height",
      "weight",
      "types",
      "hp",
      "attack",
      "defense",
      "specialAttack",
      "specialDefense",
      "speed",
      "total",
    ];

  constructor(private pokemonService: PokemonService, private toastService: ToastService) { }

  private getPokemons() {
    this.pokemonsLoading.set(true);
    this.pokemonSub?.unsubscribe();

    // TODO: Add loading page
    this.pokemonSub = this.pokemonService.getPokemons().subscribe(result => {
      this.pokemonsLoading.set(false);

      if (result.successful == false) {
        this.toastService.showError(result.errorMessage!, {
          callback: () => this.getPokemons(),
          message: "Retry"
        });

        return;
      }

      this.pokemons.set(result.data?.pokemon_v2_pokemon.map<PokemonRow>((x) => {
        var pokemon: PokemonRow = new PokemonRow();

        pokemon.id = x.id;
        pokemon.name = x.name;
        pokemon.height = x.height;
        pokemon.weight = x.weight;
        pokemon.types = x.pokemon_v2_pokemontypes.map(y => y.pokemon_v2_type.name);
        pokemon.hp = x.pokemon_v2_pokemonstats.find(y => y.pokemon_v2_stat.name == "hp")?.base_stat ?? 0;
        pokemon.attack = x.pokemon_v2_pokemonstats.find(y => y.pokemon_v2_stat.name == "attack")?.base_stat ?? 0;
        pokemon.defense = x.pokemon_v2_pokemonstats.find(y => y.pokemon_v2_stat.name == "defense")?.base_stat ?? 0;
        pokemon.specialAttack = x.pokemon_v2_pokemonstats.find(y => y.pokemon_v2_stat.name == "special-attack")?.base_stat ?? 0;
        pokemon.specialDefense = x.pokemon_v2_pokemonstats.find(y => y.pokemon_v2_stat.name == "special-defense")?.base_stat ?? 0;
        pokemon.speed = x.pokemon_v2_pokemonstats.find(y => y.pokemon_v2_stat.name == "speed")?.base_stat ?? 0;
        pokemon.sprite = x.pokemon_v2_pokemonsprites.find(x => true)?.sprites.front_default ?? "";


        return pokemon;
      }) ?? []);
      this.dataSource.data = this.pokemons();
      this.pokemonTypes = [...new Set(this.pokemons().flatMap(x => x.types))];
    });
  }

  ngOnInit(): void {
    this.getPokemons();
    this.searchChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.filterTableByName(value);
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (pokemon, filter) => {

      return (this.filterDetails.name == undefined || pokemon.name.includes(this.filterDetails.name))
        && (this.filterDetails.types.length === 0 || pokemon.types.some(type => this.filterDetails.types.includes(type)));
    };
  }

  ngOnDestroy(): void {
    this.pokemonSub?.unsubscribe();
    this.searchChanged?.unsubscribe();
  }

  filterTableByType(types: string[]) {
    this.filterDetails.types = types;
    this.dataSource.filter = JSON.stringify(this.filterDetails);
  }

  filterTableByName(name: string) {
    this.filterDetails.name = name;
    this.dataSource.filter = JSON.stringify(this.filterDetails);
  }



  radarOption: EChartsOption = {
    animation: true,
    animationDuration: 800,

    radar: {
      indicator: [
        { name: 'HP', max: 200 },
        { name: 'Attack', max: 200 },
        { name: 'Defense', max: 200 },
        { name: 'Sp.Atk', max: 200 },
        { name: 'Sp.Def', max: 200 },
        { name: 'Speed', max: 200 }
      ]
    },

    series: [
      {
        type: 'radar',
        data: []
      }
    ]
  };

  selectPokemon(pokemon: PokemonRow | null) {
    this.selectedPokemon.set(pokemon);
    this.radarOption = {
      ...this.radarOption,
      series: [
        {
          type: 'radar',
          data: [
            {
              name: pokemon?.name,
              value: [
                pokemon?.hp ?? 0,
                pokemon?.attack ?? 0,
                pokemon?.defense ?? 0,
                pokemon?.specialAttack ?? 0,
                pokemon?.specialDefense ?? 0,
                pokemon?.speed ?? 0
              ]
            }
          ]
        }
      ]
    };
  }

}
