import type { NextPage, NextComponentType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import CaseTable from '../components/CaseTable/CaseTable'
import styles from '../styles/index.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.background}>
      <Head>
        <title>CSGO Weapon Case Details</title>
        <meta name="description" content="CSGO Weapon Case Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.container}>
        <div className={styles.tableheader}>
          <h1>Csgo Weapon Case Details</h1>
          <div className={styles.lowercap}>How this table was calculated can be <a href="https://github.com/jonese1234/Csgo-Case-Data#how-the-statistics-for-the-csgo-case-details-are-calculated" target="_blank" rel="noopener noreferrer">found here.</a></div>
          <br/>
        </div>
        <CaseTable/>
      </main>

    </div>
  )
}

export default Home
