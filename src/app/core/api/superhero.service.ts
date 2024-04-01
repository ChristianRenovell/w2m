import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { SuperHeroModel } from './superhero.model';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';
import { superHeroMock } from './superHeroMock';

@Injectable({
  providedIn: 'root',
})
export class SuperheroService {
  private http = inject(HttpClient);
  private superHeroMock: SuperHeroModel[] = superHeroMock;

  // INFO: Example of a call to a real api and mapping of received data, Enable this call to check cache operation.
  // getAllSuperHeroes(): Observable<SuperHeroModel[]> {
  //   return this.http
  //     .get<SuperHeroModel[]>(environments.superHeroApiUrl + '/all.json')
  //     .pipe(
  //       map((response) => {
  //         return response.map((hero: any) => {
  //           return this.mapSuperHeroRequest(hero);
  //         });
  //       })
  //     );
  // }

  getAllSuperHeroes(): Observable<SuperHeroModel[]> {
    console.log('- this is a simulation of an api call get a superheroes.');
    return of(this.superHeroMock).pipe(delay(1000));
  }

  getSuperHeroeById(id: number): Observable<SuperHeroModel | SuperHeroModel[]> {
    console.log(id);
    console.log('- this is a simulation of an api call get a superhero by ID.');
    const result = this.superHeroMock.find((hero) => hero.id === id);
    return of(result ? result : []).pipe(delay(1000));
  }

  editSeperHero(req: SuperHeroModel): Observable<SuperHeroModel[]> {
    console.log(req);
    console.log('- this is a simulation of an api call edit a superhero.');
    return of(this.heroMockEdit(req)).pipe(delay(1000));
  }

  createSuperHeroe(req: SuperHeroModel): Observable<SuperHeroModel[]> {
    console.log(req);
    console.log(
      '- this is a simulation of an api call create for a superhero.'
    );
    req.id = this.superHeroMock.length + 1;
    this.superHeroMock.unshift(req);
    return of(this.superHeroMock).pipe(delay(1000));
  }

  deleteSuperHero(id: string): Observable<boolean> {
    const indice = this.superHeroMock.findIndex(
      (superheroe) => superheroe.id === parseInt(id)
    );
    if (indice !== -1) {
      this.superHeroMock.splice(indice, 1);
      return of(true).pipe(delay(1000));
    } else {
      return of(false).pipe(delay(1000));
    }
  }

  getSuperHeroeBySeach(name: string): Observable<SuperHeroModel[]> {
    console.log(name);
    console.log(
      '- this is a simulation of an api call looking for a superhero.'
    );
    return of(this.heroMockResult(this.superHeroMock, name)).pipe(delay(1000));
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

  heroMockEdit(newDate: SuperHeroModel): SuperHeroModel[] {
    const indexHeroUpdate = this.superHeroMock.findIndex(
      (hero) => hero.id === newDate.id
    );
    if (indexHeroUpdate !== -1) {
      this.superHeroMock[indexHeroUpdate] = newDate;
    }
    return this.superHeroMock;
  }
}
