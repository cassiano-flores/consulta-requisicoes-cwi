export function filtarPorAnoERetornarNome(series, ano) {

  const series_ano = []
  for (let i = 0; i < series.length; i++) {
    if (series[i].anoEstreia == ano) {
      series_ano.push(series[i].titulo)
    }
  }

  return series_ano
}

export function verificarSeAtorEstaEmSeriado(series, nomeAtor) {

  const elenco = series.elenco

  for (let i = 0; i < elenco.length; i++) {
    if (elenco[i] == nomeAtor) {
      return true
    }
  }

  return false
}

export function calcularMediaTotalDeEpisodios(series) {

  let media = 0

  for (let i = 0; i < series.length; i++) {
    media += series[i].numeroEpisodios
  }

  const resultado = media/series.length
  return resultado
}

export function agruparTituloDasSeriesPorPropriedade(series, propriedade) {
  
  return series.reduce((acc, item) => {

    if (!acc[item[propriedade]]) acc[item[propriedade]] = []
    acc[item[propriedade]].push(item.titulo)
    return acc
  }, {})
}
