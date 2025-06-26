import { Card, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Index() {
  return (
    <Container className='flex flex-col items-center justify-center min-h-screen bg-gray-900'>
        <Card className='flex flex-col items-center justify-center   text-wrap w-1/2  p-4 rounded-lg  shadow-lg mx-auto bg-gray-200 border-[10px] animate-wiggle animate-border'>
            <div className='rounded-lg flex flex-col items-center justify-center p-4 animate-bg-text transition-colors'>
            <Typography className='text-2xl font-bold ' variant='h5'>Welcome to File Upload</Typography>
            <Typography className='' variant='body1'>This is a simple file upload application.</Typography>
            <Typography  variant='body1'>You can upload files and manage them easily.</Typography>
            <Typography  variant='body1'>A secure and role-based file-sharing application built with Spring Boot, allowing users to upload, share, and access files with controlled permissions. Every file accessible for 24 h</Typography>
            <p className='text-lg'>Get started by clicking the button below.</p>
            <Link to="/file" className='text-blue-500 p-2 bg-transparent text-blue-600 hover:text-white rounded-2xl mt-2 hover:bg-blue-700 duration-300 border border-blue-600'>Go to File Upload</Link>
            </div>
        </Card>
    </Container>
  )
}

export default Index