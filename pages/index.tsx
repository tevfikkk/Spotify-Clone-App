import { Box, Flex, Text } from '@chakra-ui/layout'
import { GetServerSideProps } from 'next'
import { Image } from '@chakra-ui/react'
import Head from 'next/head'
import GradientLayout from '../components/gradientLayout'
import prisma from '../lib/prisma'
import { useMe } from '../lib/hooks'

const Home = ({ artists }) => {
  const { user } = useMe()

  return (
    <Box>
      <Head>
        <title>Trax Home Page</title>
        <meta property='og:title' content='My page title' key='title' />
      </Head>
      <GradientLayout
        color='blue'
        roundImage
        subtitle='profile'
        title={`${user?.firstName} ${user?.lastName}`}
        description={`${user?.playlistsCount} public playlists`}
        image='/kaido.png'>
        <Box color='white' paddingX='40px'>
          <Box marginBottom='50px'>
            <Text fontSize='2xl' fontWeight='bold'>
              Top artist this month
            </Text>
            <Text fontSize='md' fontWeight='bold'>
              Only visible to you
            </Text>
          </Box>
          <Flex>
            {artists.map(artist => (
              <Box paddingX='10px' width='20%'>
                <Box
                  bg='blue.900'
                  boxShadow='dark-lg'
                  borderRadius='10px'
                  padding='15px'
                  width='100%'>
                  <Image src='./artistsPics/cortana.png' borderRadius='100%' />
                  <Box marginTop='10px'>
                    <Text fontSize='large'>{artist.name}</Text>
                    <Text fontSize='x-small'>Artist</Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      </GradientLayout>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})
  return {
    props: { artists },
  }
}

export default Home
