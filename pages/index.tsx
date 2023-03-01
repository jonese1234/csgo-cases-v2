import type { NextPage, NextComponentType } from 'next'
import Head from 'next/head'
import CaseTable from '../components/CaseTable/CaseTable'
import styles from '../styles/index.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.background}>
      <Head>
        <title>CS:GO Case ROIs</title>
        <meta name="description" content="CS:GO Case ROIs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <div className={styles.tableheader}>
          <h1>CS:GO Case ROIs</h1>
          <div className={styles.lowercap}><b>Double click a row to open up more details about that case.</b></div>
          <div className={styles.lowercap}>How this table was calculated can be <a href="https://github.com/jonese1234/Csgo-Case-Data#how-the-statistics-for-the-csgo-case-details-are-calculated" target="_blank" rel="noopener noreferrer">found here.</a></div>
          <br/>
        </div>
        <CaseTable/>
      </main>

    </div>
  )
}

export default Home
