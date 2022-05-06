import { GetServerSideProps } from 'next'
import GradientLayout from '../components/gradientLayout'
import prisma from '../lib/prisma'

const Home = ({ artists }) => {
  return (
    <GradientLayout
      color='blue'
      roundImage
      subtitle='profile'
      title='Tevfik'
      description='15 public playlist'
      image='/kaido.png'>
      <div>
        Gay Kaido
        <div>
          {artists.map(artist => (
            <div>{artist.name}</div>
          ))}
        </div>
      </div>
    </GradientLayout>
  )
}

// a
export const getServerSideProps: GetServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists },
  }
}

export default Home
