import { createContext, useContext, useEffect, useState } from 'react'
import { appPages } from './pages'
import { debugData } from './utils/nui'

interface PageState {
  name: string
  component: () => JSX.Element
}

interface PageContext {
  openPage: (page: string) => void
  closePage: (page: string) => void
}

const PageContext = createContext({})
export const usePageContext = () => useContext(PageContext) as PageContext

debugData(
  [
    {
      action: 'openPage',
      data: {
        pageName: 'HelloWorld',
      },
    },
  ],
  200,
)

function App() {
  const [pages, setPages] = useState<PageState[]>([])

  function openPage(pageName: string) {
    type ObjectKey = keyof typeof appPages
    const key = pageName as ObjectKey

    if (!pageName || !appPages[key]) return
    if (pages.find((page) => page.name === pageName)) return

    const newPages = pages.concat({ name: pageName, component: appPages[key] })
    setPages(newPages)
  }

  function closePage(pageName: string) {
    const newPages = pages.filter((page) => page.name !== pageName)
    setPages(newPages)
  }

  function handleMessage(event: { data: any }) {
    const data = event.data

    if (data.action == 'openPage') {
      openPage(data.data.pageName)
    } else if (data.action == 'closePage') {
      closePage(data.data.pageName)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const pagesMapped = pages.map((page) => {
    const Page = page.component
    return <Page key={page.name} />
  })

  return <PageContext.Provider value={{ openPage, closePage }}>{pagesMapped}</PageContext.Provider>
}

export default App
