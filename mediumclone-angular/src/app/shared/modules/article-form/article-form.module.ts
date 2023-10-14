import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendErrorsMessagesModule } from '../backend-errors-messages/backend-errors-messages.module';

@NgModule({
  declarations: [ArticleFormComponent],
  imports: [CommonModule, ReactiveFormsModule, BackendErrorsMessagesModule],
  exports: [ArticleFormComponent],
})
export class ArticleFormModule {}
