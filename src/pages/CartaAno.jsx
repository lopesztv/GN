import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Heart } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { relacionamento } from '../data/relacionamento.js'

export default function CartaAno() {
  const { ano } = useParams()
  const momento = relacionamento.momentos.find((item) => item.ano === ano)
  const reduzirMovimento = useReducedMotion()

  if (!momento) {
    return (
      <main className="letter-page">
        <Link className="back-link" to="/historia">
          <ArrowLeft size={15} /> Voltar à nossa história
        </Link>
        <h1>Este ano ainda não está aqui.</h1>
      </main>
    )
  }

  return (
    <main className="letter-page">
      <div className="hero__grain" aria-hidden="true" />
      <header className="story-top">
        <Link className="wordmark" to="/" aria-label="Voltar ao início">G<span>/</span>N</Link>
        <span className="top-label"><i /> CARTA PARTICULAR <b>•</b> {momento.ano}</span>
      </header>
      <motion.article
        className="letter-card"
        initial={reduzirMovimento ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduzirMovimento ? 0 : 0.55 }}
      >
        <p className="story-kicker">UM RECADO NO TEMPO <span>—</span> SÓ NOSSO</p>
        <p className="letter-year">{momento.ano}</p>
        <h1>Para você,<br /><em>com amor.</em></h1>
        <div className="letter-divider"><Heart size={16} fill="currentColor" /></div>
        <p className="letter-copy">{momento.carta || 'Esta carta está esperando pelas suas palavras. Edite o campo “carta” deste ano em src/data/relacionamento.js para guardar aqui a sua mensagem.'}</p>
        <p className="letter-signoff">Com todo o meu amor,<br /><span>sempre ao seu lado.</span></p>
        <Link to="/historia" className="back-link"><ArrowLeft size={15} aria-hidden="true" /> Voltar às fotos</Link>
      </motion.article>
    </main>
  )
}
