import { ServerPromiseResp, ServerUtils } from '@project-error/pe-utils'

const rpc = new ServerUtils()

rpc.onNetPromise('test', (req, resp) => {
  const player = req.source

  const respObj: ServerPromiseResp<any> = {
    status: 'ok',
    data: {
      helloFrom: 'server',
      player,
    },
  }
  resp(respObj)
})

console.log('Server works!')
