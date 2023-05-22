import { Inter } from 'next/font/google'
import NavBar from '@/components/input/nav/NavBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <NavBar />
    </>
  )
}
