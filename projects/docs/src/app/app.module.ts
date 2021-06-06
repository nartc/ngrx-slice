import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {
  TUI_DOC_EXAMPLE_TEXTS,
  TUI_DOC_TITLE,
  TuiDocMainModule,
} from '@taiga-ui/addon-doc';

// noinspection ES6UnusedImports
import {} from 'highlight.js';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    TuiDocMainModule,
    StoreModule.forRoot({}),
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        // @ts-ignore
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          xml: () => import('highlight.js/lib/languages/xml')
        },
      },
    },
    {
      provide: TUI_DOC_TITLE,
      useValue: 'NgRX Slice | ',
    },
    {
      provide: TUI_DOC_EXAMPLE_TEXTS,
      useValue: ['Content'],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
