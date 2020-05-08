import {Injectable} from '@angular/core';
import {TransformerBattle} from './models/transformerBattle';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TransformerBand} from './models/transformerBand';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor(private http: HttpClient) { }

  public fightBattle(battle: TransformerBattle): Observable<TransformerBattle> {
console.log(`Fighting battle... ${JSON.stringify(battle)}`);
    return this.http
      .post<{ winner: string }>('http://localhost:4000/battle/victor', battle)
      .pipe(
        map((battleResult) => {
console.log(`battleResult: ${JSON.stringify(battleResult)}`);
          const updatedBattle = {
            ...battle
          };
          if (battleResult.winner === 'T') {
            updatedBattle.winner = 'T';
          } else {
            updatedBattle.winner = battleResult.winner === 'A' ? TransformerBand.A : TransformerBand.D;
          }
          return updatedBattle;
        })
      );
  }
}
