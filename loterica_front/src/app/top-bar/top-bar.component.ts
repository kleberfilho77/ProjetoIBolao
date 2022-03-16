import { PrepagamentoComponent } from './../prepagamento/prepagamento.component';
import { ListametasComponent } from './../listametas/listametas.component';
import { ListavendedoresComponent } from './../listavendedores/listavendedores.component';
import { InstitucionalComponent } from './../institucional/institucional.component';
import { TransferenciacotaComponent } from './../transferenciacota/transferenciacota.component';
import { PrestacontasComponent } from '../prestacontas/prestacontas.component';
import { CadastrousuarioComponent } from './../cadastrousuario/cadastrousuario.component';
import { HomeComponent } from './../home/home.component';
import { PainelvendedoraComponent } from './../painelvendedora/painelvendedora.component';
import { Component, OnInit } from '@angular/core';
import { CadastrobolaoComponent } from '../cadastrobolao/cadastrobolao.component';
import { CadastrocomboComponent } from '../cadastrocombo/cadastrocombo.component';
import { CadastrometasComponent } from '../cadastrometas/cadastrometas.component';
import { IndicesComponent } from '../indices/indices.component';
import { ListacotasComponent } from '../listacotas/listacotas.component';
import { ListaboloesComponent } from '../listaboloes/listaboloes.component';
import { ListausuariosComponent } from '../listausuarios/listausuarios.component';
import { PagamentoComponent } from '../pagamento/pagamento.component';
import { ExtratolotericaComponent } from '../extratoloterica/extratoloterica.component';
import { ExtratovendedoraComponent } from '../extratovendedora/extratovendedora.component';
import { BemvindoComponent } from '../bemvindo/bemvindo.component';
import { ListacomboComponent } from '../listacombo/listacombo.component';
import { DetalhesbolaoComponent } from '../detalhesbolao/detalhesbolao.component';
import { DetalhescomboComponent } from '../detalhescombo/detalhescombo.component';
import { DetalhesClienteComponent } from '../detalhescliente/detalhescliente.component';
import { DetalhesvendedorComponent } from '../detalhesvendedor/detalhesvendedor.component';
import { DetalhesadministradorComponent } from '../detalhesadministrador/detalhesadministrador.component';
import { Router } from '@angular/router';
import { VendaspendentesComponent } from '../vendaspendentes/vendaspendentes.component';
import { CadastrobolaovendedorComponent } from '../cadastrobolaovendedor/cadastrobolaovendedor.component';
import { PagamentoareceberComponent } from '../pagamentoareceber/pagamentoareceber.component';
import { DetalhesprestacontasComponent } from '../detalhesprestacontas/detalhesprestacontas.component';
import { TemplatesComponent } from '../templates/templates.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  nomeutil : string;
  

  constructor(private router: Router, private pv : PainelvendedoraComponent, private ho : HomeComponent, private dtb : DetalhesbolaoComponent,
    private dtuc : DetalhesClienteComponent, private dtuv : DetalhesvendedorComponent, private dtc : DetalhescomboComponent, private dpc : DetalhesprestacontasComponent,
    private dtua : DetalhesadministradorComponent, private lcb : ListacomboComponent, private vp: VendaspendentesComponent,
    private cb : CadastrobolaoComponent, private cbv : CadastrobolaovendedorComponent, private cc : CadastrocomboComponent, private bv : BemvindoComponent,
    private cm : CadastrometasComponent, private cu : CadastrousuarioComponent, private ev : ExtratovendedoraComponent,
    private pc : PrestacontasComponent, private tc : TransferenciacotaComponent, private el : ExtratolotericaComponent,
    private ins : InstitucionalComponent, private ind : IndicesComponent, private pre : PrepagamentoComponent, private tmp : TemplatesComponent,
    private lco : ListacotasComponent, private lbo : ListaboloesComponent, private pg : PagamentoComponent,  private par : PagamentoareceberComponent,
    private lusu : ListausuariosComponent, private lvnd : ListavendedoresComponent, private lmet : ListametasComponent) {
  }

  ngOnInit() {

    if(localStorage.getItem("perfil") == 'ADMINISTRADOR' ||
    localStorage.getItem("perfil") == 'VENDEDOR' || 
   localStorage.getItem("perfil") == 'LOTERICA'){
     
   }else{
     this.router.navigate(['/login']);
   }

    if(localStorage.getItem("nome").indexOf(" ") == -1){
      this.nomeutil = localStorage.getItem("nome");
    }else{

    this.nomeutil = localStorage.getItem("nome").substring(0,localStorage.getItem("nome").indexOf(" "));
    }
  }

  public togglarprinc(){
    if(localStorage.getItem("flag") == "true"){
      localStorage.setItem("flag", "false");
      this.pv.nave = "false";
      this.bv.nave = "false";
      this.ho.nave = "false";
      this.cb.nave = "false";
      this.cbv.nave = "false";
      this.cc.nave = "false";
      this.cm.nave = "false";
      this.cu.nave = "false";
      this.pc.nave = "false";
      this.ev.nave = "false";
      this.tc.nave = "false";
      this.ins.nave = "false";
      this.ind.nave = "false";
      this.lco.nave = "false";
      this.lcb.nave = "false";
      this.lbo.nave = "false";
      this.lusu.nave = "false";
      this.lvnd.nave = "false";
      this.lmet.nave = "false";
      this.vp.nave = "false";
      this.pg.nave = "false";
      this.par.nave = "false";
      this.pre.nave = "false";
      this.el.nave = "false";
      this.dtb.nave = "false";
      this.dtc.nave = "false";
      this.dpc.nave = "false";
      this.dtuc.nave = "false";
      this.dtuv.nave = "false";
      this.dtua.nave = "false";
      this.tmp.nave = "false";
    }else{
      localStorage.setItem("flag", "true");
      this.pv.nave = "true";
      this.bv.nave = "true";
      this.ho.nave = "true";
      this.cb.nave = "true";
      this.cbv.nave = "true";
      this.cc.nave = "true";
      this.cm.nave = "true";
      this.cu.nave = "true";
      this.pc.nave = "true";
      this.ev.nave = "true";
      this.tc.nave = "true";
      this.ins.nave = "true";
      this.ind.nave = "true";
      this.lco.nave = "true";
      this.lcb.nave = "true";
      this.lbo.nave = "true";
      this.lusu.nave = "true";
      this.lvnd.nave = "true";
      this.lmet.nave = "true";
      this.vp.nave = "true";
      this.pg.nave = "true";
      this.par.nave = "true";
      this.pre.nave = "true";
      this.el.nave = "true";
      this.dtb.nave = "true";
      this.dtc.nave = "true";
      this.dpc.nave = "true";
      this.dtuc.nave = "true";
      this.dtuv.nave = "true";
      this.dtua.nave = "true";
      this.tmp.nave = "true";
    }

}

}
