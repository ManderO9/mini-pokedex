import { Injectable } from '@angular/core';
import { GraphQLService } from '../../common/services/graphql/graphql.service';
import { PokemonListResponse } from '../../common/models/pokemon/pokemon.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../common/models/api/api.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  constructor(private graphQLService: GraphQLService) { }

  public getPokemons(): Observable<ApiResponse<PokemonListResponse>> {
    return this.graphQLService.query<PokemonListResponse>(`query{
        pokemon_v2_pokemon {
          id
          name
          height
          weight
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
          pokemon_v2_pokemonstats {
            base_stat
            pokemon_v2_stat {
              name
            }
          }
          pokemon_v2_pokemonsprites {
            sprites
          }
        }
      }
    `);
  }

}
