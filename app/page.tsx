import Navbar from '@/components/navbar'
import Image from 'next/image'
import MainBoard from '@/components/mainboard'
import rooms from '@/data/games.json'


export default async function Home() {

  console.log(typeof rooms)

  return (
    <>
      <MainBoard rooms={[...rooms]}/>
    </>
  )
}
