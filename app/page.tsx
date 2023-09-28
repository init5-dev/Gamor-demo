import Categories from '@/components/categories';
import MainBoard from '@/components/mainboard'
import rooms from '@/data/games.json'
import categories from '@/data/categories.json'

export default async function Home() {


  return (
    <>
      <MainBoard rooms={[...rooms]}/>
      <Categories categories={[...categories]} />
    </>
  )
}