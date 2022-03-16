import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CadastrometasComponent } from './cadastrometas/cadastrometas.component';
import { CadastrobolaoComponent } from './cadastrobolao/cadastrobolao.component';
import { CadastrocomboComponent } from './cadastrocombo/cadastrocombo.component';
import { CadastrousuarioComponent } from './cadastrousuario/cadastrousuario.component';
import { PrestacontasComponent } from './prestacontas/prestacontas.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PainelvendedoraComponent } from './painelvendedora/painelvendedora.component';
import { TransferenciacotaComponent } from './transferenciacota/transferenciacota.component';
import { InstitucionalComponent } from './institucional/institucional.component';
import { UsuarioequipeadminComponent } from './usuarioequipeadmin/usuarioequipeadmin.component';
import { UsuarioequipevendedorComponent } from './usuarioequipevendedor/usuarioequipevendedor.component';
import { IndicesComponent } from './indices/indices.component';
import { PoliticaComponent } from './politica/politica.component';
import { ListausuariosComponent } from './listausuarios/listausuarios.component';
import { ListavendedoresComponent } from './listavendedores/listavendedores.component';
import { ListaboloesComponent } from './listaboloes/listaboloes.component';
import { ListacotasComponent } from './listacotas/listacotas.component';
import { TermosusoComponent } from './termosuso/termosuso.component';
import { ListametasComponent } from './listametas/listametas.component';
import { DetalhesClienteComponent } from './detalhescliente/detalhescliente.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { PrepagamentoComponent } from './prepagamento/prepagamento.component';
import { ExtratolotericaComponent } from './extratoloterica/extratoloterica.component';
import { ExtratovendedoraComponent } from './extratovendedora/extratovendedora.component';
import { DetalhesbolaoComponent } from './detalhesbolao/detalhesbolao.component';
import { BemvindoComponent } from './bemvindo/bemvindo.component';
import { ListacomboComponent } from './listacombo/listacombo.component';
import { DetalhescomboComponent } from './detalhescombo/detalhescombo.component';
import { DetalhesvendedorComponent } from './detalhesvendedor/detalhesvendedor.component';
import { DetalhesadministradorComponent } from './detalhesadministrador/detalhesadministrador.component';
import { VendaspendentesComponent } from './vendaspendentes/vendaspendentes.component';
import { LinkexpiradoComponent } from './linkexpirado/linkexpirado.component';
import { CadastrobolaovendedorComponent } from './cadastrobolaovendedor/cadastrobolaovendedor.component';
import { DetalhesextratoComponent } from './detalhesextrato/detalhesextrato.component';
import { DetalhesprestacontasComponent } from './detalhesprestacontas/detalhesprestacontas.component';
import { TemplatesComponent } from './templates/templates.component';



const routes: Routes = [
  { path:'', redirectTo: 'home',  pathMatch: 'full'},
  { path:'home', component: HomeComponent },
  { path:'bemvindo', component: BemvindoComponent },
  { path:'index',component:AppComponent},
  { path:'login', component: LoginComponent },
  { path:'cadastrobolao', component: CadastrobolaoComponent },
  { path:'cadastrobolaovendedor', component: CadastrobolaovendedorComponent },
  { path:'cadastrousuario',component:CadastrousuarioComponent},
  { path:'cadastrocombo',component:CadastrocomboComponent},
  { path:'cadastrometas', component: CadastrometasComponent },
  { path:'institucional', component: InstitucionalComponent },
  { path:'indices', component: IndicesComponent },
  { path:'transferenciacota', component:TransferenciacotaComponent},
  { path:'painelvendedora', component:PainelvendedoraComponent},
  { path: 'listausuarios', component: ListausuariosComponent },
  { path: 'listavendedores', component: ListavendedoresComponent },
  { path: 'listaboloes', component: ListaboloesComponent },
  { path: 'listacotas', component: ListacotasComponent },
  { path: 'listametas', component: ListametasComponent },
  { path: 'listacombos', component: ListacomboComponent },
  { path: 'prestacontas', component:PrestacontasComponent},
  { path: 'extratovendedora', component:ExtratovendedoraComponent},
  { path: 'vendaspendentes', component:VendaspendentesComponent},
  { path: 'usuarioequipeadmin', component: UsuarioequipeadminComponent },
  { path: 'usuarioequipevendedor', component: UsuarioequipevendedorComponent },
  { path: 'politica', component: PoliticaComponent },
  { path: 'pagamento', component: PagamentoComponent },
  { path: 'prepagamento', component: PrepagamentoComponent },
  { path: 'detalhesbolao', component: DetalhesbolaoComponent },
  { path: 'detalhesvendedor', component: DetalhesvendedorComponent },
  { path: 'detalhesadministrador', component: DetalhesadministradorComponent },
  { path: 'detalhescombo', component: DetalhescomboComponent },
  { path: 'detalhesprestacontas', component: DetalhesprestacontasComponent },
  { path: 'detalhescliente', component: DetalhesClienteComponent },
  { path: 'detalhesextrato', component: DetalhesextratoComponent },
  { path: 'termosuso', component: TermosusoComponent },
  { path: 'extratoloterica', component: ExtratolotericaComponent },
  { path: 'linkexpirado', component: LinkexpiradoComponent},
  { path: 'templates', component: TemplatesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
