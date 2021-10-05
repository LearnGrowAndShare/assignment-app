import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModule } from './loading/loading.module';
import { PaginationModule } from './pagination/pagination.module';
import { CardsModule } from './cards/cards.module';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  imports: [CommonModule, NavigationModule, LoadingModule, PaginationModule, CardsModule],
  exports: [LoadingModule, NavigationModule, PaginationModule, CardsModule],
})
export class SharedModule {}
