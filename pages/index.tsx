import { Box, Flex, Text } from '@chakra-ui/layout'
import { GetServerSideProps } from 'next'
import { Image } from '@chakra-ui/react'
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
