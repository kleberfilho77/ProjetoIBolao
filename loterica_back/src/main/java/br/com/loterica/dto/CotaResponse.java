package br.com.loterica.dto;

public class CotaResponse {

	
	private Long idCota;
	private Long idBolao;
	private Long idUsuario;
	private String nome;
	
	
	
	public CotaResponse() {
		// TODO Auto-generated constructor stub
	}
	
	
	public CotaResponse(Long idCota, Long idBolao, Long idUsuario, String nome) {
		super();
		this.idCota = idCota;
		this.idBolao = idBolao;
		this.idUsuario = idUsuario;
		this.nome = nome;
	}

	
	

	@Override
	public String toString() {
		return "CotaResponse [idCota=" + idCota + ", idBolao=" + idBolao + ", idUsuario=" + idUsuario + ", nome=" + nome
				+ "]";
	}


	public Long getIdCota() {
		return idCota;
	}
	public void setIdCota(Long idCota) {
		this.idCota = idCota;
	}
	public Long getIdBolao() {
		return idBolao;
	}
	public void setIdBolao(Long idBolao) {
		this.idBolao = idBolao;
	}
	public Long getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	
	
	
	
}
