import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParticipantsComponent } from './participants/participants.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {appReducers} from './store/reducers/app.reducers';
import {MatExpansionModule} from '@angular/material/expansion';
import { ParticipantBandComponent } from './participant-band/participant-band.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {EditParticipantDialogComponent} from './edit-participant/edit-participant-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { WarStateComponent } from './war-state/war-state.component';
import {BattleService} from './battle.service';
import {WarEffects} from './store/effects/war.effects';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ParticipantsComponent,
    ParticipantBandComponent,
    ConfirmDialogComponent,
    EditParticipantDialogComponent,
    WarStateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([WarEffects]),
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatSliderModule,
    HttpClientModule
  ],
  providers: [BattleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
