import { ClientUtils, RegisterNuiCB } from '@project-error/pe-utils'

const rpc = new ClientUtils()

async function main() {
  const res = await rpc.emitNetPromise('test', {
    hello: 'from client',
  })

  console.log(res)
}

RegisterCommand(
  'nuitest',
  () => {
    SendNUIMessage({
      action: 'openPage',
      data: {
        pageName: 'HelloWorld',
      },
    })

    SetNuiFocus(true, true)
  },
  false,
)

RegisterNuiCB('closeMenu', (_, cb) => {
  SetNuiFocus(false, false)
  SendNUIMessage({
    action: 'closePage',
    data: {
      pageName: 'HelloWorld',
    },
  })

  cb(true)
})

RegisterNuiCB('getDemoData', (data, cb) => {
  console.log(data)

  cb({ demo: true, inBrowser: false })
})

main()
