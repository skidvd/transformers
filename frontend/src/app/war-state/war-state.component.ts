import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/state/app.state';
import {WarState} from '../store/state/war.state';
import {warState} from '../store/selectors/war.selectors';
import {distinctUntilChanged} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {TransformerBattle} from '../models/transformerBattle';
import {FightBattle, NextWar} from '../store/actions/war.actions';
import {TransformerBand} from '../models/transformerBand';
import {WarResults} from '../models/warResults';

@Component({
  selector: 'app-war-state',
  templateUrl: './war-state.component.html',
  styleUrls: ['./war-state.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarStateComponent implements OnInit, OnDestroy {
  public currentWarState: WarState;

  public displayedColumns: string[] = ['autobotName', 'autobotRank', 'decepticonName', 'decepticonRank', 'winner'];
  public dataSource: MatTableDataSource<TransformerBattle>;

  public warResults: WarResults;

  private battlesLaunched = false;

  private war$ = this.store.pipe(
      select(warState),
      distinctUntilChanged(),
    )
    .subscribe((currentWarState: WarState) => {
      // console.log(`     ...Got new warState ${JSON.stringify(currentWarState, undefined, '\t')}!`);
      this.currentWarState = currentWarState;
      if (!this.battlesLaunched && !this.currentWarState.isCompleted) {
        this.currentWarState.battles.forEach((battle) => {
          this.store.dispatch(new FightBattle(battle));
        });
        this.battlesLaunched = true;
      }
      if (currentWarState && currentWarState.isCompleted) {
        if (!this.battlesLaunched) {
          // the sentinel battle (Optimus Prime v Predaking) has ended the game)
          this.warResults = {
            totalBattles: currentWarState.battles.length,
            winningTeam: 'Tie/Draw - Special Rule: Game Ending Battle',
            winningSurvivors: [],
            loosingSurvivors: [],
          };
        } else {
          const autobotCasualties = currentWarState.battles
            .filter((battle) => battle.winner === TransformerBand.D || battle.winner === 'T')
            .map((battle) => battle.autobot.id);
          const decepticonCasualties = currentWarState.battles
            .filter((battle) => battle.winner === TransformerBand.A || battle.winner === 'T')
            .map((battle) => battle.decepticon.id);
          const autobotSurvivorNames = currentWarState.autobots
            .filter((t) => autobotCasualties.indexOf(t.id) < 0)
            .map((t) => t.name);
          const decepticonSurvivorNames = currentWarState.decepticons
            .filter((t) => decepticonCasualties.indexOf(t.id) < 0)
            .map((t) => t.name);
          const winningTeam = currentWarState.eliminatedAutobots === currentWarState.eliminatedDecepticons ? 'Tie/Draw' :
            currentWarState.eliminatedDecepticons > currentWarState.eliminatedAutobots ? TransformerBand.A : TransformerBand.D;
          this.warResults = {
            totalBattles: currentWarState.battles.length,
            winningTeam,
            winningSurvivors: winningTeam === TransformerBand.A || winningTeam === 'Tie/Draw' ? autobotSurvivorNames : decepticonSurvivorNames,
            loosingSurvivors: winningTeam === TransformerBand.A || winningTeam === 'Tie/Draw' ? decepticonSurvivorNames : autobotSurvivorNames,
          };
        }
      }
      if (!currentWarState) {
        delete this.warResults;
      }
      this.dataSource = new MatTableDataSource(currentWarState ? currentWarState.battles : undefined);
      this.changeDetectorRef.markForCheck();
    });

  constructor(private store: Store<AppState>,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  public nextWar() {
    this.store.dispatch(new NextWar());
  }

  ngOnDestroy(): void {
    this.war$.unsubscribe();
  }
}
