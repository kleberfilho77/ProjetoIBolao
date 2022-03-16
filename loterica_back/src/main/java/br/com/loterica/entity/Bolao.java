package br.com.loterica.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import br.com.loterica.type.TipoModalidade;

@Entity
@Table(name="bolao")
public class Bolao implements java.io.Serializable{
 
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long id;
	@Enumerated(EnumType.STRING)
	@Column(name="tipo_modalidade")
	private TipoModalidade tipoModalidade; 	
	@Column(name="numero_sorteio")
	private Integer numeroSorteio;
	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern="dd/MM/yyyy")
	@Column(name="data_bolao")
	private java.util.Date dataBolao;
	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name="data_sorteio")
	private java.util.Date dataSorteio;
	@Column(name="horario_sorteio")
	private String horarioSorteio;
//	@JsonFormat(pattern="HH:mm:ss")
//	@Temporal(TemporalType.TIME)
	@Column(name="horario_fechamento")
	private String horarioFechamento;
	@Column(name="qtd_dezenas")
	private Integer qtdDezenas;

	@Column(name="valor_cota")
    private Double valorCota;
 
	@Column(name="qtd_jogos")
 	private Integer qtdJogos;
	
	@Column(name="qtd_cotas_disponiveis")
 	private Integer qtdCotasDisponiveis;
 	
	@Column(name="qtd_cotas")
 	private Integer qtdCotas;
	
 	@Column(name="premio_previsto")
	private Double premioPrevisto;
 	
 	private String status;
	
 	private String imgpath;
     
    @OneToMany(mappedBy="bolao",cascade= {CascadeType.ALL})
    @JsonManagedReference(value="cotas")
    private  List<Cota> cotas = new ArrayList<Cota>(); 
    
    
    @JsonIgnore
    @JsonManagedReference(value="bolao_combo")
	@OneToMany(mappedBy="bolao", cascade= {CascadeType.ALL})
	private List<BolaoCombo>  bolaoCombo;
    
 
	
	public Bolao(Long id, TipoModalidade tipoModalidade, Integer numeroSorteio, Date dataBolao, Date dataSorteio,
			String horarioSorteio, String horarioFechamento, Integer qtdDezenas, Double valorCota, Integer qtdJogos,
			Integer qtdCotasDisponiveis, Integer qtdCotas, Double premioPrevisto, String status, String imgpath, List<Cota> cotas,
			List<BolaoCombo> bolaoCombo) {
		super();
		this.id = id;
		this.tipoModalidade = tipoModalidade;
		this.numeroSorteio = numeroSorteio;
		this.dataBolao = dataBolao;
		this.dataSorteio = dataSorteio;
		this.horarioSorteio = horarioSorteio;
		this.horarioFechamento = horarioFechamento;
		this.qtdDezenas = qtdDezenas;
		this.valorCota = valorCota;
		this.qtdJogos = qtdJogos;
		this.qtdCotasDisponiveis = qtdCotasDisponiveis;
		this.qtdCotas = qtdCotas;
		this.premioPrevisto = premioPrevisto;
		this.status = status;
		this.imgpath = imgpath;
		this.cotas = cotas;
		this.bolaoCombo = bolaoCombo;
	}

	
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	public String getHorarioSorteio() {
		return horarioSorteio;
	}



	public void setHorarioSorteio(String horarioSorteio) {
		this.horarioSorteio = horarioSorteio;
	}



	public Integer getQtdCotasDisponiveis() {
		return qtdCotasDisponiveis;
	}



	public String getImgpath() {
		return imgpath;
	}



	public void setImgpath(String imgpath) {
		this.imgpath = imgpath;
	}



	public void setQtdCotasDisponiveis(Integer qtdCotasDisponiveis) {
		this.qtdCotasDisponiveis = qtdCotasDisponiveis;
	}



	public Bolao() {
	}
  


	public List<BolaoCombo> getBolaoCombo() {
		return bolaoCombo;
	}




	public void setBolaoCombo(List<BolaoCombo> bolaoCombo) {
		this.bolaoCombo = bolaoCombo;
	}


	@Override
	public String toString() {
		return "Bolao [id=" + id + ", tipoModalidade=" + tipoModalidade + ", numeroSorteio=" + numeroSorteio
				+ ", dataBolao=" + dataBolao + ", dataSorteio=" + dataSorteio + ", horarioSorteio=" + horarioSorteio
				+ ", horarioFechamento=" + horarioFechamento + ", qtdDezenas=" + qtdDezenas + ", valorCota=" + valorCota
				+ ", qtdJogos=" + qtdJogos + ", qtdCotasDisponiveis=" + qtdCotasDisponiveis + ", qtdCotas=" + qtdCotas
				+ ", premioPrevisto=" + premioPrevisto + ", status=\" + status + \", imgpath=" + imgpath + ", cotas=" + cotas + ", bolaoCombo="
				+ bolaoCombo + "]";
	}



	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public TipoModalidade getTipoModalidade() {
		return tipoModalidade;
	}


	public void setTipoModalidade(TipoModalidade tipoModalidade) {
		this.tipoModalidade = tipoModalidade;
	}


	public Integer getNumeroSorteio() {
		return numeroSorteio;
	}


	public void setNumeroSorteio(Integer numeroSorteio) {
		this.numeroSorteio = numeroSorteio;
	}


	public java.util.Date getDataBolao() {
		return dataBolao;
	}


	public void setDataBolao(java.util.Date dataBolao) {
		this.dataBolao = dataBolao;
	}


	public java.util.Date getDataSorteio() {
		return dataSorteio;
	}


	public void setDataSorteio(java.util.Date dataSorteio) {
		this.dataSorteio = dataSorteio;
	}


	public String getHorarioFechamento() {
		return horarioFechamento;
	}


	public void setHorarioFechamento(String horarioFechamento) {
		this.horarioFechamento = horarioFechamento;
	}


	public Integer getQtdDezenas() {
		return qtdDezenas;
	}

	public void setQtdDezenas(Integer qtdDezenas) {
		this.qtdDezenas = qtdDezenas;
	}

 	public Integer getQtdJogos() {
		return qtdJogos;
	}


	public void setQtdJogos(Integer qtdJogos) {
		this.qtdJogos = qtdJogos;
	}

 

	public Double getPremioPrevisto() {
		return premioPrevisto;
	}


	public void setPremioPrevisto(Double premioPrevisto) {
		this.premioPrevisto = premioPrevisto;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getQtdCotas() {
		return qtdCotas;
	}

	public void setQtdCotas(Integer qtdCotas) {
		this.qtdCotas = qtdCotas;
	}

	public List<Cota> getCotas() {
		return cotas;
	}

	public void setCotas(List<Cota> cotas) {
		this.cotas = cotas;
	}
 
	public void addCota(Cota cota) {
		cotas.add(cota);
		
	}


	public Double getValorCota() {
		return valorCota;
	}


	public void setValorCota(Double valorCota) {
		this.valorCota = valorCota;
	}



}
