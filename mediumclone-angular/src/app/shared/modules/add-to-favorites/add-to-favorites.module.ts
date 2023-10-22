import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { AddToFavoritesComponent } from './components/add-to-favorites/add-to-favorites.component';
import { AddToFavoritesService } from './services/add-to-favorites.service';
import { AddToFavoritesEffect } from './store/effects/add-to-favorites.effects';

@NgModule({
  declarations: [AddToFavoritesComponent],
  imports: [CommonModule, EffectsModule.forFeature(AddToFavoritesEffect)],
  exports: [AddToFavoritesComponent],
  providers: [AddToFavoritesService],
})
export class AddToFavoritesModule {}
