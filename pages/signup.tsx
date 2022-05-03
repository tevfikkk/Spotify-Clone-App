import Head from 'next/head'
import AuthForm from '../components/authForm'

const Signup = () => {
  return (
    <>
      <Head>
        <title>Trax | Sign Up</title>
      </Head>
      <AuthForm mode='signup' />
    </>
  )
}

Signup.authPage = true

export default Signup
