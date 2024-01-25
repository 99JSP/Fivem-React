import React from 'react'
import { usePageContext } from '../../App'
import { fetchNui, useNuiQuery } from '../../utils/nui'
import { useExitListener } from '../../utils/exitListener'

const HelloWorldPage = () => {
  const { closePage } = usePageContext()

  const query = useNuiQuery('getDemoData', null, {
    demo: true,
    inBrowser: true,
  })

  async function close() {
    closePage('HelloWorld')
    await fetchNui('closeMenu')
  }

  useExitListener(async () => {
    await close()
  })

  return (
    <div className='grid align-items h-screen place-content-center p-10 text-white'>
      <div className='bg-slate-700 p-12'>
        <h1>Hello FiveM!</h1>

        {query.isSuccess && <span>{JSON.stringify(query.data)}</span>}
        {query.isLoading && <span>loading</span>}

        <br />
        <button onClick={close}>Close</button>
      </div>
    </div>
  )
}

export default HelloWorldPage
