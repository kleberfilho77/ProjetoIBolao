package br.com.loterica.dto;

public class TransferenciaDto {

	
	private Long idUsuarioVendedorDe;
	private Long idUsuarioVendedorPara;
	private Long idCotaDe;
	private Long idCotaPara;
	private Integer quantidadeTransferencia;
	
	public TransferenciaDto() {
		// TODO Auto-generated constructor stub
	}

	public TransferenciaDto(Long idUsuarioVendedorDe, Long idUsuarioVendedorPara, Long idCotaDe, Long idCotaPara,
			Integer quantidadeTransferencia) {
		super();
		this.idUsuarioVendedorDe = idUsuarioVendedorDe;
		this.idUsuarioVendedorPara = idUsuarioVendedorPara;
		this.idCotaDe = idCotaDe;
		this.idCotaPara = idCotaPara;
		this.quantidadeTransferencia = quantidadeTransferencia;
	}

	public Long getIdUsuarioVendedorDe() {
		return idUsuarioVendedorDe;
	}

	public void setIdUsuarioVendedorDe(Long idUsuarioVendedorDe) {
		this.idUsuarioVendedorDe = idUsuarioVendedorDe;
	}

	public Long getIdUsuarioVendedorPara() {
		return idUsuarioVendedorPara;
	}

	public void setIdUsuarioVendedorPara(Long idUsuarioVendedorPara) {
		this.idUsuarioVendedorPara = idUsuarioVendedorPara;
	}

	public Long getIdCotaDe() {
		return idCotaDe;
	}

	public void setIdCotaDe(Long idCotaDe) {
		this.idCotaDe = idCotaDe;
	}

	public Long getIdCotaPara() {
		return idCotaPara;
	}

	public void setIdCotaPara(Long idCotaPara) {
		this.idCotaPara = idCotaPara;
	}

	public Integer getQuantidadeTransferencia() {
		return quantidadeTransferencia;
	}

	public void setQuantidadeTransferencia(Integer quantidadeTransferencia) {
		this.quantidadeTransferencia = quantidadeTransferencia;
	}

	@Override
	public String toString() {
		return "TransferenciaDto [idUsuarioVendedorDe=" + idUsuarioVendedorDe + ", idUsuarioVendedorPara="
				+ idUsuarioVendedorPara + ", idCotaDe=" + idCotaDe + ", idCotaPara=" + idCotaPara
				+ ", quantidadeTransferencia=" + quantidadeTransferencia + "]";
	}
	
	 
	
	
	 
}
