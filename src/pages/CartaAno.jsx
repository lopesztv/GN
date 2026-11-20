import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Heart, Music2, Pause, Play } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { relacionamento } from '../data/relacionamento.js'
import { faixaEstaTocando, pausarFaixa, tocarFaixa } from '../utils/playerMusica.js'

export default function CartaAno() {
  const { ano, parte } = useParams()
  const momento = relacionamento.momentos.find((item) => item.ano === ano)
  const indiceCarta = parte ? Number(parte) - 1 : 0
  const carta = momento?.cartas?.[indiceCarta]
  const musica = momento?.musicas?.[indiceCarta] || ''
  const identificadorCarta = parte ? `${ano} · PARTE ${parte}` : ano
  const reduzirMovimento = useReducedMotion()
  const [musicaTocando, setMusicaTocando] = useState(false)

  useEffect(() => {
    if (!musica) return undefined

    let componenteAtivo = true
    const iniciarFaixa = async () => {
      const tocou = faixaEstaTocando(musica) || await tocarFaixa(musica)
      if (componenteAtivo) setMusicaTocando(tocou)
    }

    void iniciarFaixa()
    return () => {
      componenteAtivo = false
    }
  }, [musica])

  async function alternarMusica() {
    if (!musica) return

    if (faixaEstaTocando(musica)) {
      pausarFaixa()
      setMusicaTocando(false)
      return
    }

    setMusicaTocando(await tocarFaixa(musica))
  }

  if (!momento || !carta) {
    return (
      <main className="letter-page">
        <Link className="back-link" to="/historia">
          <ArrowLeft size={15} /> Voltar à nossa história
        </Link>
        <h1>Essa memória não foi encontrada.</h1>
      </main>
    )
  }

  return (
    <main className="letter-page">
      <div className="hero__grain" aria-hidden="true" />
      <header className="story-top">
        <Link className="wordmark" to="/" aria-label="Voltar ao início">G<span>/</span>N</Link>
        <span className="top-label"><i /> CARTA PARTICULAR <b>•</b> {identificadorCarta}</span>
      </header>
      <motion.article
        className="letter-card"
        initial={reduzirMovimento ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduzirMovimento ? 0 : 0.55 }}
      >
        <div className="letter-audio-bar">
          <span className="letter-audio-bar__icon" aria-hidden="true"><Music2 size={17} /></span>
          <div className="letter-audio-bar__track">
            <span>TRILHA DESTA MEMÓRIA</span>
            <strong>{identificadorCarta}</strong>
          </div>
          <span className="letter-audio-bar__status" aria-live="polite">
            {musicaTocando ? 'TOCANDO' : 'PAUSADA'}
          </span>
          <button
            className="letter-audio-bar__toggle"
            type="button"
            onClick={alternarMusica}
            disabled={!musica}
            aria-label={musicaTocando ? 'Pausar música desta carta' : 'Tocar música desta carta'}
          >
            {musicaTocando ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          </button>
        </div>
        <p className="story-kicker">UM RECADO NO TEMPO <span>—</span> SÓ NOSSO</p>
        <p className="letter-year">{identificadorCarta}</p>
        <h1>Para você,<br /><em>com amor.</em></h1>
        <div className="letter-divider"><Heart size={16} fill="currentColor" /></div>
        <p className="letter-copy">{carta}</p>
        <p className="letter-signoff">Com todo meu amor pa vc munina.</p>
        <Link to="/historia" className="back-link"><ArrowLeft size={15} aria-hidden="true" /> Voltar às fotos</Link>
      </motion.article>
    </main>
  )
}
