import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { SectionComponent } from './components/section/section.component';
import { SocialCardComponent } from './components/social-card/social-card.component';
import { KnowledgeComponent } from './components/knowledge/knowledge.component';
import { CardProjectComponent } from './components/card-project/card-project.component';
import { LoginComponent } from './components/login/login.component';
import { ButtonEditComponent } from './components/button-edit/button-edit.component';
import { FormAboutMeComponent } from './components/form-about-me/form-about-me.component';
import { FormKnowledgeComponent } from './components/form-knowledge/form-knowledge.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingService } from './service/spinner/loading.service';
import { FormProjectsComponent } from './components/form-projects/form-projects.component';
import { FormContactComponent } from './components/form-contact/form-contact.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    SectionComponent,
    SocialCardComponent,
    KnowledgeComponent,
    CardProjectComponent,
    LoginComponent,
    ButtonEditComponent,
    FormAboutMeComponent,
    FormKnowledgeComponent,
    SpinnerComponent,
    FormProjectsComponent,
    FormContactComponent,
    EditComponent,
    DeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
