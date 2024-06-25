import { Box, Typography } from '@mui/material'
import { FC } from 'react'

const AboutPage: FC = () => {
  return (
    <Box>
      <Typography variant="h1">FAF cars</Typography>
      <Typography variant="body1" whiteSpace="pre-wrap" pt={5}>
        FAF cars is a personal project. Initially made for a WEB TUM laboratory
        work, it evolved into a fully-featured project. This is a car selling
        platform. Built on react, typescript, vite, material ui stack for
        front-end and .NET and postgres for back-end.
      </Typography>
    </Box>
  )
}

export default AboutPage
