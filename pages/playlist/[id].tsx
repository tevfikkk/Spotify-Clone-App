import { FC } from 'react'
import Head from 'next/head'
import GradientLayout from '../../components/gradientLayout'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'
import SongTable from '../../components/songsTable'

const getBGColor = (id: any) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow',
  ]

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist: FC = ({ playlist }: any) => {
  const color = getBGColor(playlist.id)
  return (
    <div>
      <Head>
        <title>Trax | Playlist</title>
        <meta property='og:title' content='My page title' key='title' />
      </Head>
      <GradientLayout
        color={color}
        roundImage={false}
        title={playlist.name}
        subtitle='playlist'
        description={`${playlist.songs.length} songs`}
        image={`https://picsum.photos/400?random=${playlist.id}`}>
        <SongTable songs={playlist.songs} />
      </GradientLayout>
    </div>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  let user: any

  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN)
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })

  return {
    props: { playlist },
  }
}

export default Playlist
