import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ImagePlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { relacionamento } from '../data/relacionamento.js'

function FotoAno({ src, ano, indice, parte }) {
  const [falhou, setFalhou] = useState(false)
  const destinoCarta = parte ? `/historia/${ano}/${parte}` : `/historia/${ano}`

  if (!src || falhou) {
    return (
      <Link className="year-photo__placeholder" to={destinoCarta} aria-label={`Abrir a carta de ${ano}`}>
        <ImagePlus size={25} strokeWidth={1.4} aria-hidden="true" />
        <span>FOTO DE {ano}</span>
        <small>ABRIR CARTA E ÁUDIO ↗</small>
      </Link>
    )
  }

  return (
    <Link
      className="year-photo__link"
      to={destinoCarta}
      aria-label={`Abrir a carta de ${ano}`}
    >
      <img
        className="year-photo__image"
        src={src}
        alt={`${ano}, foto ${indice + 1}`}
        onError={() => setFalhou(true)}
      />
      <span className="year-photo__open">ABRIR CARTA ↗</span>
    </Link>
  )
}

export default function Historia() {
  const reduzirMovimento = useReducedMotion()

  return (
    <main className="story-page">
      <div className="hero__grain" aria-hidden="true" />
      <header className="story-top">
        <Link className="wordmark" to="/" aria-label="Voltar ao início">G<span>/</span>N</Link>
        <span className="top-label"><i /> 2021—2026 <b>•</b> NOSSA HISTÓRIA</span>
      </header>

      <section className="story-heading">
        <motion.p
          className="story-kicker"
          initial={reduzirMovimento ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ARQUIVO PARTICULAR <span>—</span> SÓ NOSSO
        </motion.p>
        <motion.h1
          initial={reduzirMovimento ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduzirMovimento ? 0 : 0.1, duration: reduzirMovimento ? 0 : 0.7 }}
        >
          Nossa história<br /><em>ano a ano.</em>
        </motion.h1>
        <p className="story-intro">Seis anos de memórias, recomeços e conquistas. Cada foto guarda uma carta nossa.</p>
      </section>

      <section className="year-gallery" aria-label="Fotos organizadas por ano">
        {relacionamento.momentos.map((momento, indice) => {
          const fotos = momento.fotos.length ? momento.fotos : ['']

          return (
            <motion.article
              className="year-card"
              key={momento.ano}
              initial={reduzirMovimento ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: reduzirMovimento ? 0 : (indice % 3) * 0.08, duration: reduzirMovimento ? 0 : 0.5 }}
            >
              <div className="year-card__heading">
                <span>ANO</span>
                <h2>{momento.ano}</h2>
              </div>
              <div className="year-card__photos">
                {fotos.map((foto, fotoIndice) => (
                  <div className="year-photo" key={`${momento.ano}-${fotoIndice}`}>
                    <FotoAno
                      src={foto}
                      ano={momento.ano}
                      indice={fotoIndice}
                      parte={momento.cartas.length > 1 ? fotoIndice + 1 : undefined}
                    />
                  </div>
                ))}
              </div>
            </motion.article>
          )
        })}
      </section>

      <footer className="story-footer">
        <p>2021—2026 <span>•</span> CADA FOTO GUARDA UMA LEMBRANÇA</p>
        <Link to="/" className="back-link"><ArrowLeft size={15} aria-hidden="true" /> Voltar ao início</Link>
      </footer>
    </main>
  )
}
