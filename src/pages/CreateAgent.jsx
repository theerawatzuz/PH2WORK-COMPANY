import { Box } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Divider } from '@mui/material';
import Button from '@mui/material/Button';


//icon
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import KeyIcon from '@mui/icons-material/Key';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

//State
const user = "ผู้ใช้งาน"
const userStatus = "Enabled"


function CreateAgent() {

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ gap: 3}}>
    <Typography variant="h4">
      CREATE AGENT
    </Typography>
    <Box sx={{}}>
      <Box sx={{boxShadow: 1 , mt: 2, p: 2, display: 'flex', width: 2/4, bgcolor:'white'}}>
        <Box>
            <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1},
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2
            }}
            noValidate
            autoComplete="off"
          >
            <TextField sx={{ m: 1, width: 2/4 }} id="username" label="username" variant="outlined" margin="normal"/>
            <FormControl sx={{ m: 1, width: 2/4 }} variant="outlined" margin="normal">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            {/* <IconButton color="primary" variant="contained" aria-label="generate">
            <AutoAwesomeIcon />
          </IconButton> */}
          <Button variant="contained" color="success">
            generate
          </Button>
            {/* <Button variant="contained" color="success">Generate</Button> */}

          </Box>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1},
              display: 'flex',
              justifyContent: 'left',
            }}
            noValidate
            autoComplete="off"
          >          
            <TextField sx={{ m: 1, width: 2/4 }} id="displayname" label="Display Name" variant="outlined" margin="normal" />
            <TextField sx={{ m: 1, width: 2/4 }} id="prefixname" label="Prefix Name" variant="outlined" margin="normal" helperText="Maximum 3 letters"
            inputProps={{ maxLength: 3 }}
            />
          </Box>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1},
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center'
            }}
            noValidate
            autoComplete="off"
          >          
            <TextField sx={{ m: 1}} fullWidth  id="website" label="Website Name" variant="outlined" margin="normal" />
          </Box>

          </Box>
          
      
      </Box>

    </Box>
    
  </Box>
  )
}

export default CreateAgent
