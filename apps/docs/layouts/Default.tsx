import { useEffect, FC } from 'react'
import Head from 'next/head'
import NavBar from '../components/Navigation/NavBar'
import SideBar from '../components/Navigation/SideBar'
import Footer from '../components/Footer'
import TableOfContents from '~/components/TableOfContents'

interface Props {
  meta: { title: string; description?: string; hide_table_of_contents?: boolean }
  children: any
  toc?: any
  menuItems: any
  currentPage: string
}

const Layout: FC<Props> = ({ meta, children, toc, menuItems, currentPage }) => {
  useEffect(() => {
    const key = localStorage.getItem('supabaseDarkMode')
    if (!key) {
      // Default to dark mode if no preference config
      document.documentElement.className = 'dark'
    } else {
      document.documentElement.className = key === 'true' ? 'dark' : ''
    }
  }, [])

  const hasTableOfContents =
    toc !== undefined && toc.json.filter((item) => item.lvl !== 1 && item.lvl <= 3).length > 0

  return (
    <>
      <Head>
        <title>{meta?.title} | Supabase</title>
        <meta name="description" content={meta?.description} />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/docs/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta?.title} />
        <meta property="og:description" content={meta?.description} />
        <meta property="og:title" content={meta?.title} />
      </Head>

      <main>
        <NavBar currentPage={currentPage} />
        <div className="flex w-full flex-row">
          <SideBar menuItems={menuItems} />
          <div className="docs-width grid grid-cols-12 gap-4 justify-between p-4 pb-8 w-full">
            <div
              className={`${
                meta?.hide_table_of_contents || !hasTableOfContents
                  ? 'col-span-10 2xl:col-span-8'
                  : 'col-span-9'
              } py-4 px-8`}
            >
              <article className="prose dark:prose-dark dark:bg-scale-200 width-full mt-8">
                {children}
              </article>
            </div>
            {hasTableOfContents && !meta?.hide_table_of_contents && (
              <div className="border-scale-400 dark:bg-scale-200 thin-scrollbar table-of-contents-height overflow-y-auto sticky col-span-3 border-l px-2">
                <TableOfContents toc={toc} />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Layout
