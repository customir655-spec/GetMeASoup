"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import Payment_Page from '../components/payment_page'
const page =  ({params}) => {
 

  return (
    <>

   <Payment_Page params={params}> </Payment_Page>
    </>
  )
}

export default page