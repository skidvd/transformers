import {Injectable} from '@angular/core';
import {TransformerBattle} from './models/transformerBattle';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TransformerBand} from './models/transformerBand';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  // Note: This URL should probably be calculated or retrieved from an env config.  However, it is
  // not for simplification purposes as it is not really important to the exercise at hand.
  private readonly BACKEND_URL = 'http://localhost:4000/battle/victor';

  constructor(private http: HttpClient) { }

  public fightBattle(battle: TransformerBattle): Observable<TransformerBattle> {
    return this.http
      .post<{ winner: string }>(this.BACKEND_URL, battle)
      .pipe(
        map((battleResult) => {
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
