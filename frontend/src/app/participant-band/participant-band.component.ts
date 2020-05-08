import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {TransformerBand} from '../models/transformerBand';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ConfirmationData} from '../confirm-dialog/confirmation-data';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {distinctUntilChanged, filter, take, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Transformer} from '../models/transformer';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/state/app.state';
import {AddParticipant, RemoveParticipant, UpdateParticipant} from '../store/actions/participants.actions';
import {EditParticipantDialogComponent} from '../edit-participant/edit-participant-dialog.component';
import {WarState} from '../store/state/war.state';
import {warState} from '../store/selectors/war.selectors';

@Component({
  selector: 'app-participant-band',
  templateUrl: './participant-band.component.html',
  styleUrls: ['./participant-band.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantBandComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public transformers: Transformer[];

  @Input()
  private band: TransformerBand;

  public currentWarState: WarState;
  public displayedColumns: string[] = ['name', 'strength', 'intelligence', 'speed', 'endurance',
                                       'rank', 'courage', 'firepower', 'skill', 'actions'];
  public dataSource: MatTableDataSource<Transformer>;

  private war$ = this.store.pipe(
    select(warState),
    distinctUntilChanged()
  )
    .subscribe((currentWarState: WarState) => {
      this.currentWarState = currentWarState;
      this.changeDetectorRef.markForCheck();
    });

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private store: Store<AppState>,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) {
    console.log(`Start with transformers: ${JSON.stringify(this.transformers)}`);
    this.dataSource = new MatTableDataSource(this.transformers);
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public remove(transformer: Transformer) {
    if (this.currentWarState) {
      return;
    }

    const dialogData = {
      title: 'Remove Transformer',
      prompt: `Are you sure that you want to remove the ${transformer.name} transformer?  This cannot be undone.`
    } as ConfirmationData;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((dialogResult: boolean) => dialogResult),
        tap(() => {
          this.store.dispatch(new RemoveParticipant(transformer));
        }),
        take(1)
      )
      .subscribe();
  }

  public add() {
    if (this.currentWarState) {
      return;
    }

    const dialogRef = this.dialog.open(EditParticipantDialogComponent, {
      maxWidth: '600px',
      data: {
        band: this.band
      } as Transformer,
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((dialogResult: any) => {
          return dialogResult && dialogResult.id ? dialogResult : false;
        }),
        tap((transformer: Transformer) => {
          this.store.dispatch(new AddParticipant(transformer));
        }),
        take(1)
      )
      .subscribe();
  }

  public edit(transformer: Transformer) {
    if (this.currentWarState) {
      return;
    }

    const dialogRef = this.dialog.open(EditParticipantDialogComponent, {
      maxWidth: '600px',
      data: transformer,
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((dialogResult: any) => {
          return dialogResult && dialogResult.id ? dialogResult : false;
        }),
        tap((updateTransformer: Transformer) => {
          this.store.dispatch(new UpdateParticipant(updateTransformer));
        }),
        take(1)
      )
      .subscribe();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.transformers) {
      this.dataSource = new MatTableDataSource(this.transformers);
      this.dataSource.sort = this.sort;
      this.changeDetectorRef.markForCheck();
    }
  }
  ngOnDestroy(): void {
    this.war$.unsubscribe();
  }
}
