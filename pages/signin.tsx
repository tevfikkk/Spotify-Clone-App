import Head from 'next/head'
import AuthForm from '../components/authForm'

const Signin = () => {
  return (
    <>
      <Head>
        <title>Trax | Sign In</title>
      </Head>
      <AuthForm mode='signin' />
    </>
  )
}

Signin.authPage = true

export default Signin
