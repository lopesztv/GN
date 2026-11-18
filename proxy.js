import { timingSafeEqual } from 'node:crypto'
import { next } from '@vercel/functions'

function correspondeComSeguranca(valor, esperado) {
  const valorBuffer = Buffer.from(valor)
  const esperadoBuffer = Buffer.from(esperado)

  return (
    valorBuffer.length === esperadoBuffer.length &&
    timingSafeEqual(valorBuffer, esperadoBuffer)
  )
}

export default function proxy(request) {
  const usuarioEsperado = process.env.SITE_USERNAME
  const senhaEsperada = process.env.SITE_PASSWORD

  if (!usuarioEsperado || !senhaEsperada) {
    return new Response('A proteção deste site ainda não foi configurada.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const autorizacao = request.headers.get('authorization') || ''
  const [esquema, credenciaisCodificadas] = autorizacao.split(' ')

  if (esquema === 'Basic' && credenciaisCodificadas) {
    const credenciais = Buffer.from(credenciaisCodificadas, 'base64').toString('utf8')
    const separador = credenciais.indexOf(':')

    if (separador >= 0) {
      const usuario = credenciais.slice(0, separador)
      const senha = credenciais.slice(separador + 1)

      if (
        correspondeComSeguranca(usuario, usuarioEsperado) &&
        correspondeComSeguranca(senha, senhaEsperado)
      ) {
        return next()
      }
    }
  }

  return new Response('Entre para acessar Nossa História.', {
    status: 401,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'WWW-Authenticate': 'Basic realm="Nossa História", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  })
}
