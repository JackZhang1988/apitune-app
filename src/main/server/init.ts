import log from 'electron-log/main'
import * as http from 'http'

import { handleRequest } from './app'
import { onConnect } from './on-connect'
import { onUpgrade } from './on-upgrade'

process.on('uncaughtException', (e) => {
  log.error('Server uncaughtException', e)
})

process.on('unhandledRejection', (e) => {
  log.error('Server unhandledRejection', e)
})

export let httpServer: http.Server

export function initServer(
  port,
  success?: (newHttpServer: http.Server) => void,
  fail?: (e: Error) => void
) {
  const newHttpServer = http.createServer({
    insecureHTTPParser: true
  })

  newHttpServer.on('request', handleRequest)
  newHttpServer.on('connect', onConnect)
  newHttpServer.on('upgrade', onUpgrade)
  newHttpServer
    .listen(port, '0.0.0.0', () => {
      log.info(`Apitune proxy server is listening on port ${port}`)
      httpServer = newHttpServer
      success && success(newHttpServer)
    })
    .on('error', (e) => {
      log.error('Apitune proxy server start fail', e)
      fail && fail(e)
    })
  return newHttpServer
}

function stopServer(oldServer: http.Server, newHttpServer?: http.Server) {
  oldServer.close(() => {
    newHttpServer && (httpServer = newHttpServer)
  })
}

export function changeServerPort(port: number, sucess?: () => void, fail?: (e: Error) => void) {
  const oldServer = httpServer
  initServer(
    port,
    (newHttpServer: http.Server) => {
      stopServer(oldServer, newHttpServer)
      sucess && sucess()
    },
    fail
  )
}
