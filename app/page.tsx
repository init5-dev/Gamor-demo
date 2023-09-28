import Navbar from '@/components/navbar'
import Image from 'next/image'
import MainBoard from '@/components/mainboard'
import rooms from '@/data/games.json'
import { UserButton } from "@clerk/nextjs";

export default async function Home() {

  console.log(typeof rooms)

  return (
    <>
    <UserButton afterSignOutUrl="/"/>
      <MainBoard rooms={[...rooms]}/>
    </>
  )
}