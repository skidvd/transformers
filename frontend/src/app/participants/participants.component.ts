import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ParticipantsState} from '../store/state/participants.state';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/state/app.state';
import {selectAutobots, selectDecepticons} from '../store/selectors/participants.selectors';
import {TransformerBand} from '../models/transformerBand';
import {distinctUntilChanged, tap} from 'rxjs/operators';
import {Transformer} from '../models/transformer';
import {BeginWar} from '../store/actions/war.actions';
import {TransformerWar} from '../models/transformerWar';
import {warState} from '../store/selectors/war.selectors';
import {WarState} from '../store/state/war.state';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantsComponent implements OnInit, OnDestroy {
  public autobots: Transformer[];
  public decepticons: Transformer[];
  public currentWarState: WarState;

  public autobots$ = this.store.pipe(
    select(selectAutobots),
    distinctUntilChanged(),
    tap((autobots: Transformer[]) => {
      this.autobots = autobots;
    })
  );
  public decepticons$ = this.store.pipe(
    select(selectDecepticons),
    distinctUntilChanged(),
    tap((decepticons: Transformer[]) => {
      this.decepticons = decepticons;
    })
  );

  private war$ = this.store.pipe(
      select(warState),
      distinctUntilChanged()
    )
    .subscribe((currentWarState: WarState) => {
      this.currentWarState = currentWarState;
      this.changeDetectorRef.markForCheck();
    });

  public readonly autobotsBand = TransformerBand.A;
  public readonly decepticonsBand = TransformerBand.D;

  constructor(private store: Store<AppState>,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  public goToWar() {
    this.store.dispatch(new BeginWar({
      autobots: this.autobots,
      decepticons: this.decepticons
    } as TransformerWar));
  }

  ngOnDestroy(): void {
    this.war$.unsubscribe();
  }
}
