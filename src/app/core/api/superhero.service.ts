import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environments } from 'src/environment/environment';
import { map } from 'rxjs/internal/operators/map';
import { SuperHeroModel } from './superhero.model';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';
import { superHeroMock } from './superHeroMock';

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
    return this.http
      .get<SuperHeroModel>(environments.superHeroApiUrl + `/id/${id}.json`)
      .pipe(
        map((response) => {
          return this.mapSuperHeroRequest(response);
        })
      );
  }

  getSuperHeroeBySeach(name: string) {
    console.log(name);
    console.log(
      '- this is a simulation of an api call looking for a superhero.'
    );
    return of(this.randomHeroMock(superHeroMock)).pipe(delay(1000));
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

  randomHeroMock(array: any[]): any[] {
    const numPositions = Math.min(
      Math.floor(Math.random() * 5) + 1,
      array.length
    );
    const chosenPositions: any[] = [];
    const remainingIndices: number[] = Array.from(Array(array.length).keys());

    for (let i = 0; i < numPositions; i++) {
      const randomIndex = Math.floor(Math.random() * remainingIndices.length);
      const position = remainingIndices[randomIndex];
      chosenPositions.push(array[position]);
      remainingIndices.splice(randomIndex, 1);
    }

    return chosenPositions;
  }
}
