import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

function Header() {
  return (
		<AppBar>
			<Toolbar style={{justifyContent:"space-between"}}>
				<Typography>BMS-to-Excel-Converter</Typography>
				<Typography>Lahe Lahe</Typography>
			</Toolbar>
		</AppBar>
  )
}

export default Header