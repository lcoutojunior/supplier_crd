import Head from 'next/head'
import Navbar from '../Components/Navbar/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Supplier Technologies</title>
        <meta name="description" content="Carbon data Analylitcs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
        Supplier System
    </>
  )
}
