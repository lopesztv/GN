import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { relacionamento } from '../data/relacionamento.js'
import { faixaEstaTocando, pausarFaixa, tocarFaixa } from '../utils/playerMusica.js'

export default function Inicio() {
  const [indiceFoto, setIndiceFoto] = useState(0)
  const reduzirMovimento = useReducedMotion()
  const navigate = useNavigate()
  const fotos = relacionamento.momentos.flatMap((momento) =>
    momento.fotos.map((foto, indice) => ({
      ano: momento.ano,
      src: foto,
      enquadramento: momento.enquadramentos?.[indice] || '50% 50%',
      musica: momento.musicas?.[indice] || '',
    })),
  )
  const fotoAtual = fotos[indiceFoto]
  const [musicaTocando, setMusicaTocando] = useState(() =>
    faixaEstaTocando(fotoAtual?.musica),
  )

  async function tocarMusica(faixa) {
    const tocou = await tocarFaixa(faixa)
    setMusicaTocando(tocou)
    return tocou
  }

  async function alternarMusica() {
    if (!fotoAtual?.musica) return

    if (faixaEstaTocando(fotoAtual.musica)) {
      pausarFaixa()
      setMusicaTocando(false)
      return
    }

    await tocarMusica(fotoAtual.musica)
  }

  function mudarFoto(direcao) {
    const proximoIndice = (indiceFoto + direcao + fotos.length) % fotos.length
    const continuarTocando = faixaEstaTocando(fotoAtual?.musica)

    pausarFaixa()
    setMusicaTocando(false)
    setIndiceFoto(proximoIndice)

    if (continuarTocando && fotos[proximoIndice].musica) {
      tocarMusica(fotos[proximoIndice].musica)
    }
  }

  async function iniciarHistoria() {
    let erroDeAudio = false

    if (fotoAtual?.musica) {
      erroDeAudio = !(await tocarMusica(fotoAtual.musica))
    }

    navigate('/historia', { state: { erroDeAudio } })
  }

  const transicao = reduzirMovimento ? { duration: 0 } : { duration: 0.9, ease: 'easeOut' }

  return (
    <main className="hero">
      <div className="hero__grain" aria-hidden="true" />
      <div className="hero__glow hero__glow--one" aria-hidden="true" />
      <div className="hero__glow hero__glow--two" aria-hidden="true" />

      <header className="hero__top">
        <a className="wordmark" href="/" aria-label="Nossa História, início">G<span>/</span>N</a>
        <span className="top-label"><i /> NOSSA HISTÓRIA <b>•</b> 2021–2026</span>
      </header>

      <motion.div
        className="hero__content"
        initial={reduzirMovimento ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transicao}
      >
        <section className="hero__copy" aria-label="Abertura da nossa história">
          <motion.p
            className="hero__pretitle"
            initial={reduzirMovimento ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transicao, delay: reduzirMovimento ? 0 : 0.25 }}
          >
            <span className="live-dot" /> para você, {relacionamento.nome}
          </motion.p>

          <motion.h1
            initial={reduzirMovimento ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transicao, delay: reduzirMovimento ? 0 : 0.4 }}
          >
            Nossa <em>história</em><span className="title-period">.</span>
          </motion.h1>

          <motion.p
            className="hero__phrase"
            initial={reduzirMovimento ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transicao, delay: reduzirMovimento ? 0 : 0.65 }}
          >
            {relacionamento.fraseInicial.split('\n').map((linha, indice) => (
              <span key={indice}>{linha}</span>
            ))}
          </motion.p>

          <motion.button
            className="start-button"
            type="button"
            onClick={iniciarHistoria}
            whileHover={reduzirMovimento ? undefined : { scale: 1.025 }}
            whileTap={reduzirMovimento ? undefined : { scale: 0.98 }}
            aria-label="Começar nossa história"
          >
            <span className="start-button__icon"><Play size={15} fill="currentColor" aria-hidden="true" /></span>
            <span>Dar play na nossa história</span>
          </motion.button>
        </section>

        <motion.div
          className="tape-art"
          initial={reduzirMovimento ? false : { opacity: 0, rotate: 7, scale: 0.92 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ ...transicao, delay: reduzirMovimento ? 0 : 0.35 }}
        >
          <div className="memory-photo-frame">
            <span className="memory-photo-frame__orbit" />
            <button
              className="memory-photo-button"
              type="button"
              onClick={alternarMusica}
              disabled={!fotoAtual?.musica}
              aria-label={musicaTocando ? `Pausar a música de ${fotoAtual.ano}` : `Tocar a música de ${fotoAtual.ano}`}
            >
              <img
                className="memory-photo"
                src={fotoAtual.src}
                alt={`Foto de vocês do ano ${fotoAtual.ano}.`}
                style={{ objectPosition: fotoAtual.enquadramento }}
              />
              <span className="memory-photo-button__control" aria-hidden="true">
                {musicaTocando ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
              </span>
            </button>
            <button
              className="memory-photo-nav memory-photo-nav--previous"
              type="button"
              onClick={() => mudarFoto(-1)}
              aria-label="Ver foto anterior"
            >
              <ArrowLeft size={19} aria-hidden="true" />
            </button>
            <button
              className="memory-photo-nav memory-photo-nav--next"
              type="button"
              onClick={() => mudarFoto(1)}
              aria-label="Ver próxima foto"
            >
              <ArrowRight size={19} aria-hidden="true" />
            </button>
            <span className="memory-photo-frame__caption">
              {fotoAtual.musica ? (
                musicaTocando ? `TOCANDO • ${fotoAtual.ano}` : `OUVIR MÚSICA • ${fotoAtual.ano}`
              ) : (
                `MÚSICA A ADICIONAR • ${fotoAtual.ano}`
              )}{' '}
              <b>✦</b>
            </span>
          </div>
          <span className="memory-photo-count" aria-live="polite">
            {indiceFoto + 1} / {fotos.length}
          </span>
          <div className="tape-art__orbit" />
          <div className="cassette">
            <div className="cassette__screw cassette__screw--one" />
            <div className="cassette__screw cassette__screw--two" />
            <div className="cassette__label">
              <span className="cassette__tiny">SIDE A <b>✳</b> FOR YOU</span>
              <strong>LOVE<br />TAPE</strong>
              <span className="cassette__line" />
              <span className="cassette__serial">Nº 001 — PLAY ONLY</span>
            </div>
            <div className="cassette__window">
              <span className="cassette__reel" /><span className="cassette__tape" /><span className="cassette__reel" />
            </div>
            <div className="cassette__bottom"><i /><i /><i /><i /><i /></div>
          </div>
          <span className="art-caption">UMA EDIÇÃO SÓ NOSSA <b>↗</b></span>
          <span className="art-star art-star--one">✳</span>
          <span className="art-star art-star--two">✦</span>
        </motion.div>
      </motion.div>

      <div className="hero__footer" aria-hidden="true">
        <span>NOSSA HISTÓRIA ▶ 2021–2026</span>
        <span>FEITO COM AMOR <b>♥</b></span>
      </div>
    </main>
  )
}
