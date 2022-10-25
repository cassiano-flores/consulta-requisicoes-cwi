import axios from 'axios'

import {
  verificarSeAtorEstaEmSeriado,
  filtarPorAnoERetornarNome,
  calcularMediaTotalDeEpisodios,
  agruparTituloDasSeriesPorPropriedade,
} from '../src/metodos'

let dadosApi

beforeAll(async () => {
  dadosApi = (await axios.get('https://gustavobuttenbender.github.io/film-array/data/films.json')).data
})


describe('suite de testes', () => {

  it('Deve filtrar as series com ano de estreia maior ou igual a 2010 e retornar uma listagem com os nomes', () => {
    const listagem_esperada = [
      [ 'The Walking Dead', '10 Days Why' ],
      [ 'Game Of Thrones' ],
      [ 'Narcos' ],
      [ 'Stranger Things', 'Westworld' ],
      [ 'Mr. Robot' ],
      [ 'Gus and Will The Masters of the Wizards' ]
    ]
    const listagem_obtida = []

    for (let i = 2010; i <= 2022; i++) {
      let elemento = filtarPorAnoERetornarNome(dadosApi, i)
      if (elemento[0]) {
        listagem_obtida.push(elemento)
      }
    }
    expect(listagem_obtida).toStrictEqual(listagem_esperada)
  })


  it('Deve retornar true ao procurar ator que está em elenco', () => {
    const resultado = verificarSeAtorEstaEmSeriado(dadosApi[0], 'Winona Ryder')

    expect(resultado).toBeTruthy()
  })


  it('Deve retornar false ao procurar ator que não participa de elenco', () => {
    const resultado = verificarSeAtorEstaEmSeriado(dadosApi[1], 'Winona Ryder')

    expect(resultado).toBeFalsy()
  })


  it('Deve calcular corretamente a media total de episódios de todas as series', () => {
    const media_esperada = 35.8
    const media_obtida = calcularMediaTotalDeEpisodios(dadosApi)
    
    expect(media_obtida).toBe(media_esperada)
  })


  it('Deve agrupar corretamente em um objeto os titulos das series baseado na Distribuidora', () => {
    const agrupamento_esperado = {
      Netflix: [ 'Stranger Things', 'Narcos' ],
      HBO: [ 'Game Of Thrones', 'Band of Brothers', 'Westworld' ],
      AMC: [ 'The Walking Dead', 'Breaking Bad' ],
      CWI: [ 'Gus and Will The Masters of the Wizards' ],
      JS: [ '10 Days Why' ],
      'USA Network': [ 'Mr. Robot' ]
    }

    const agrupamento_obtido = agruparTituloDasSeriesPorPropriedade(dadosApi, 'distribuidora')

    expect(agrupamento_obtido).toStrictEqual(agrupamento_esperado)
  })
})
