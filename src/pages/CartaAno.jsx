import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Heart } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { relacionamento } from '../data/relacionamento.js'

export default function CartaAno() {
  const { ano, parte } = useParams()
  const momento = relacionamento.momentos.find((item) => item.ano === ano)
  const indiceCarta = parte ? Number(parte) - 1 : 0
  const carta = momento?.cartas?.[indiceCarta]
  const identificadorCarta = parte ? `${ano} · PARTE ${parte}` : ano
  const reduzirMovimento = useReducedMotion()

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
        <p className="story-kicker">UM RECADO NO TEMPO <span>—</span> SÓ NOSSO</p>
        <p className="letter-year">{identificadorCarta}</p>
        <h1>Para você,<br /><em>com amor.</em></h1>
        <div className="letter-divider"><Heart size={16} fill="currentColor" /></div>
        <p className="letter-copy">{carta}</p>
        <p className="letter-signoff">Com todo o meu amor,<br /><span>sempre ao seu lado.</span></p>
        <Link to="/historia" className="back-link"><ArrowLeft size={15} aria-hidden="true" /> Voltar às fotos</Link>
      </motion.article>
    </main>
  )
}
