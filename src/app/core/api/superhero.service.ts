import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environments } from 'src/environment/environment';
import { map } from 'rxjs/internal/operators/map';
import { SuperHeroModel } from './superhero.model';

@Injectable({
  providedIn: 'root',
})
export class SuperheroService {
  private http = inject(HttpClient);

  getAllSuperHeroes(): Observable<SuperHeroModel[]> {
    return this.http
      .get<SuperHeroModel[]>(environments.superHeroApiUrl + '/all.json')
      .pipe(
        map((response) => {
          return response.map((hero: any) => {
            return this.mapSuperHeroRequest(hero);
          });
        })
      );
  }

  getAllSuperHeroeById(id: number): Observable<SuperHeroModel> {
    return this.http
      .get<SuperHeroModel>(environments.superHeroApiUrl + `/id/${id}.json`)
      .pipe(
        map((response) => {
          return this.mapSuperHeroRequest(response);
        })
      );
  }

  mapSuperHeroRequest(hero: any): SuperHeroModel {
    return {
      id: hero.id,
      name: hero.name,
      fullName: hero.biography.fullName,
      height: hero.appearance.height[1],
      weight: hero.appearance.weight[1],
      power: hero.powerstats.power,
      strength: hero.powerstats.strength,
      speed: hero.powerstats.speed,
      images: hero.images.sm,
    };
  }
}
