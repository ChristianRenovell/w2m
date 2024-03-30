import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environments } from 'src/environment/environment';
import { map } from 'rxjs/internal/operators/map';
import { SuperHeroModel } from './superhero.model';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';
import { superHeroMock, superHeroSingleMock } from './superHeroMock';

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

  getSuperHeroeById(id: number): Observable<SuperHeroModel> {
    console.log(id);
    console.log('- this is a simulation of an api call get a superhero by ID.');
    return of(superHeroSingleMock).pipe(delay(1000));
  }

  editSeperHero(req: SuperHeroModel) {
    console.log(req);
    console.log('- this is a simulation of an api call edit a superhero.');
    return of(true).pipe(delay(1000));
  }

  createSuperHeroe(req: SuperHeroModel) {
    console.log(req);
    console.log(
      '- this is a simulation of an api call create for a superhero.'
    );
    return of(true).pipe(delay(1000));
  }

  getSuperHeroeBySeach(name: string): Observable<SuperHeroModel[]> {
    console.log(name);
    console.log(
      '- this is a simulation of an api call looking for a superhero.'
    );
    return of(this.heroMockResult(superHeroMock, name)).pipe(delay(1000));
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

  heroMockResult(array: SuperHeroModel[], name: string): SuperHeroModel[] {
    name = name.toLowerCase();
    return array.filter((hero) => hero.name.toLowerCase().includes(name));
  }
}
