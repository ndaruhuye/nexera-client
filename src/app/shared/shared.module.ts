import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { CardComponent } from './components/card/card.component';
import { TextComponent } from './components/text/text.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { AnimationDirective } from './directives/animation.directive';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    CardComponent,
    TextComponent,
    LoaderComponent,
    AlertComponent,

    // directives
    AnimationDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    ButtonComponent,
    InputComponent,
    CardComponent,
    TextComponent,
    LoaderComponent,
    AlertComponent,

    // directives
    AnimationDirective
  ],
})
export class SharedModule {}
