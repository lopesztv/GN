let audioAtual = null
let faixaAtual = ''

export async function tocarFaixa(faixa) {
  if (!faixa) return false

  if (!audioAtual || faixaAtual !== faixa) {
    audioAtual?.pause()
    audioAtual = new Audio(faixa)
    audioAtual.loop = true
    faixaAtual = faixa
  }

  try {
    await audioAtual.play()
    return true
  } catch {
    return false
  }
}

export function pausarFaixa() {
  audioAtual?.pause()
}

export function faixaEstaTocando(faixa) {
  return Boolean(audioAtual && faixaAtual === faixa && !audioAtual.paused)
}
