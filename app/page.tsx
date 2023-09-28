import MainBoard from '@/components/mainboard'
import rooms from '@/data/games.json'
import { UserButton } from "@clerk/nextjs";

export default async function Home() {


  return (
    <>
      <MainBoard rooms={[...rooms]}/>
    </>
  )
}