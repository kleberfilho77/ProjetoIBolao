import { OrdemPagamentoService } from './service/ordempagamentoservice';
import { MovimentacaoService } from './service/movimentacaoservice';
import { CadMetasService } from './service/cadmetasservice';
import { UsuarioClienteFinalService } from './service/usuarioclientefinalservice';
import { DatePipe } from '@angular/common';
import { LoginService } from './service/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,  LOCALE_ID} from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule, ROUTES } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { HomeComponent } from './home/home.component';
import { APP_BASE_HREF } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CadastrobolaoComponent } from './cadastrobolao/cadastrobolao.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CadastrometasComponent } from './cadastrometas/cadastrometas.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { PrimeNGConfig } from 'primeng/api';
import { CadastrousuarioComponent } from './cadastrousuario/cadastrousuario.component';
import { CadastrocomboComponent } from './cadastrocombo/cadastrocombo.component';
import { TransferenciacotaComponent } from './transferenciacota/transferenciacota.component';
import { PainelvendedoraComponent } from './painelvendedora/painelvendedora.component';
import { PrestacontasComponent } from './prestacontas/prestacontas.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { InstitucionalComponent } from './institucional/institucional.component';
import { UsuarioUnidadeLotericaService } from './service/usuariounidadelotericaservice';
import { UsuariounidadelotericaComponent } from './usuariounidadeloterica/usuariounidadeloterica.component';

import { UsuarioclientefinalComponent } from './usuarioclientefinal/usuarioclientefinal.component';
import { UsuarioEquipeAdminService } from './service/usuarioequipeadminservice';
import { UsuarioEquipeVendedorService } from './service/usuarioequipevendedorservice';
import { UsuarioequipevendedorComponent } from './usuarioequipevendedor/usuarioequipevendedor.component';
import { UsuarioequipeadminComponent } from './usuarioequipeadmin/usuarioequipeadmin.component';
import { CadComboService } from './service/cadcomboservice';
import { CadBolaoService } from './service/cadbolaoservice';
import { HomeService } from './service/homeservice';
import { PainelVendedoraService } from './service/painelvendedoraservice';
import { TransferenciaCotasService } from './service/transferenciadecotasservice';
import { BolaoService } from './service/bolaoservice';
import { EsqueciSenhaComponent } from './esquecisenha/esquecisenha.component';
import { RedefinirSenhaComponent } from './redefinirsenha/redefinirsenha.component';
import { IndicesComponent } from './indices/indices.component';
import { PoliticaComponent } from './politica/politica.component';
import { ListausuariosComponent } from './listausuarios/listausuarios.component';
import { ListaboloesComponent } from './listaboloes/listaboloes.component';
import { ListacotasComponent } from './listacotas/listacotas.component';
import { ListavendedoresComponent } from './listavendedores/listavendedores.component';
import { CotaService } from './service/cotaservice';
import { TermosusoComponent } from './termosuso/termosuso.component';
import { DateTimePipe } from './date.component';
import { ListametasComponent } from './listametas/listametas.component';
import { MetaVariavelService } from './service/metavariavelservice';
import { DetalhesClienteComponent } from './detalhescliente/detalhescliente.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { PagamentoService } from './service/pagamentoservice';
import { PrepagamentoComponent } from './prepagamento/prepagamento.component';
import { PagamentoaprovadoComponent } from './pagamentoaprovado/pagamentoaprovado.component';
import { PagamentorecusadoComponent } from './pagamentorecusado/pagamentorecusado.component';
import { NgxLoadingModule } from 'ngx-loading';
import { ExtratolotericaComponent } from './extratoloterica/extratoloterica.component'; 
import { ArquivoService } from './service/arquivoservice';
import { ExtratovendedoraComponent } from './extratovendedora/extratovendedora.component';
import { DetalhesbolaoComponent } from './detalhesbolao/detalhesbolao.component';
import { BemvindoComponent } from './bemvindo/bemvindo.component';
import { ListacomboComponent } from './listacombo/listacombo.component';
import { DetalhescomboComponent } from './detalhescombo/detalhescombo.component';
import { DetalhesvendedorComponent } from './detalhesvendedor/detalhesvendedor.component';
import { DetalhesadministradorComponent } from './detalhesadministrador/detalhesadministrador.component';
import { VendaspendentesComponent } from './vendaspendentes/vendaspendentes.component';
import { LinkexpiradoComponent } from './linkexpirado/linkexpirado.component';
import { BolaoComboService } from './service/bolaocomboservice';
import { CadastrobolaovendedorComponent } from './cadastrobolaovendedor/cadastrobolaovendedor.component';
import { PagamentoareceberComponent } from './pagamentoareceber/pagamentoareceber.component';
import { DetalhesextratoComponent } from './detalhesextrato/detalhesextrato.component';
import { PrestaContasService } from './service/prestacontasservice';
import { DetalhesprestacontasComponent } from './detalhesprestacontas/detalhesprestacontas.component';
import { FilestackModule } from '@filestack/angular';
import { EnviarwhatsComponent } from './enviarwhats/enviarwhats.component';
import { TemplatesComponent } from './templates/templates.component';
 

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path:'bemvindo', component: BemvindoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'index', component: AppComponent },
  { path: 'indices', component: IndicesComponent },
  { path: 'cadastrobolao', component: CadastrobolaoComponent },
  { path: 'cadastrobolaovendedor', component: CadastrobolaovendedorComponent },
  { path: 'cadastrousuario', component: CadastrousuarioComponent },
  { path: 'cadastrocombo', component: CadastrocomboComponent },
  { path: 'cadastrometas', component: CadastrometasComponent },
  { path: 'institucional', component: InstitucionalComponent },
  { path: 'transferenciacota', component: TransferenciacotaComponent },
  { path: 'painelvendedora', component: PainelvendedoraComponent },
  { path: 'listausuarios', component: ListausuariosComponent },
  { path: 'listavendedores', component: ListavendedoresComponent },
  { path: 'listaboloes', component: ListaboloesComponent },
  { path: 'listacotas', component: ListacotasComponent },
  { path: 'listametas', component: ListametasComponent },
  { path: 'listacombos', component: ListacomboComponent },
  { path: 'prestacontas', component: PrestacontasComponent },
  { path: 'extratovendedora', component: ExtratovendedoraComponent },
  { path: 'vendaspendentes', component: VendaspendentesComponent },
  { path: 'usuarioequipeadmin', component: UsuarioequipeadminComponent },
  { path: 'usuarioequipevendedor', component: UsuarioequipevendedorComponent },
  { path: 'esquecisenha', component: EsqueciSenhaComponent },
  { path: 'redefinirsenha', component: RedefinirSenhaComponent },
  { path: 'politica', component: PoliticaComponent },
  { path: 'termosuso', component: TermosusoComponent },
  { path: 'pagamento', component: PagamentoComponent },
  { path: 'prepagamento', component: PrepagamentoComponent },
  { path: 'pagamentoaprovado', component: PagamentoaprovadoComponent },
  { path: 'pagamentorecusado', component: PagamentorecusadoComponent },
  { path: 'detalhescliente', component: DetalhesClienteComponent },
  { path: 'detalhesbolao', component: DetalhesbolaoComponent },
  { path: 'detalhesvendedor', component: DetalhesvendedorComponent },
  { path: 'detalhesadministrador', component: DetalhesadministradorComponent },
  { path: 'detalhescombo', component: DetalhescomboComponent },
  { path: 'detalhesprestacontas', component: DetalhesprestacontasComponent },
  { path: 'detalhesextrato', component: DetalhesextratoComponent },
  { path: 'usuariounidadeloterica', component: UsuariounidadelotericaComponent },
  { path: 'extratoloterica', component: ExtratolotericaComponent },
  { path: 'linkexpirado', component: LinkexpiradoComponent},
  { path: 'pagamentoareceber', component: PagamentoareceberComponent},
  { path: 'enviarwhats', component: EnviarwhatsComponent},
  { path: 'templates', component: TemplatesComponent}


];

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    CadastrobolaoComponent,
    CadastrometasComponent,
    CadastrousuarioComponent,
    CadastrousuarioComponent,
    CadastrocomboComponent,
    InstitucionalComponent,
    TransferenciacotaComponent,
    PainelvendedoraComponent,
    PrestacontasComponent,
    TabBarComponent,
    TopBarComponent,
    UsuariounidadelotericaComponent,
    UsuarioequipeadminComponent,
    UsuarioequipevendedorComponent,
    UsuarioclientefinalComponent,
    EsqueciSenhaComponent,
    RedefinirSenhaComponent,
    IndicesComponent,
    PoliticaComponent,
    ListausuariosComponent,
    ListaboloesComponent,
    ListacotasComponent,
    ListavendedoresComponent,
    TermosusoComponent,
    DateTimePipe,
    ListametasComponent,
    DetalhesClienteComponent,
    PagamentoComponent,
    PrepagamentoComponent,
    PagamentoaprovadoComponent,
    PagamentorecusadoComponent,
    ExtratolotericaComponent,
    ExtratovendedoraComponent,
    DetalhesbolaoComponent,
    BemvindoComponent,
    ListacomboComponent,
    DetalhescomboComponent,
    DetalhesvendedorComponent,
    DetalhesadministradorComponent,
    VendaspendentesComponent,
    LinkexpiradoComponent,
    CadastrobolaovendedorComponent,
    PagamentoareceberComponent,
    DetalhesextratoComponent,
    DetalhesprestacontasComponent,
    EnviarwhatsComponent,
    TemplatesComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    DropdownModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    NgxLoadingModule.forRoot({}),
    NgxMaskModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    FilestackModule

  ],
  providers: [LoginService, PrimeNGConfig, TopBarComponent, PainelvendedoraComponent, PagamentoComponent, BemvindoComponent, TemplatesComponent,
    HomeComponent, CadastrobolaoComponent, CadastrocomboComponent, CadastrometasComponent, ExtratovendedoraComponent, BolaoComboService,
    CadastrousuarioComponent, PrestacontasComponent, TermosusoComponent,ListausuariosComponent, ListacomboComponent, DetalhesClienteComponent,
    ListaboloesComponent, PrepagamentoComponent, ListacotasComponent,ListavendedoresComponent, ListametasComponent, CadastrobolaovendedorComponent,
    TransferenciacotaComponent, InstitucionalComponent, IndicesComponent,PoliticaComponent, DetalhescomboComponent, VendaspendentesComponent,
    UsuarioUnidadeLotericaService,UsuarioEquipeAdminService,UsuarioEquipeVendedorService, ExtratolotericaComponent, PrestaContasService,
    UsuarioClienteFinalService,CadMetasService,CadComboService,CadBolaoService, OrdemPagamentoService, DetalhesvendedorComponent, DetalhesprestacontasComponent,
    HomeService,PainelVendedoraService,TransferenciaCotasService, ArquivoService, DetalhesbolaoComponent, DetalhesadministradorComponent,
    BolaoService, CotaService, MetaVariavelService, MovimentacaoService, PagamentoService, DetalhesextratoComponent , PagamentoareceberComponent,

    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: APP_BASE_HREF, useValue: '/' }
 
  ],

   bootstrap: [AppComponent]

})
export class AppModule { }
