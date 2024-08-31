import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    // จำลองการตรวจสอบ
    if (username === 'test1' && password === 'test1') {
      // สร้าง token จำลอง
      const fakeToken = 'fake_token_' + Math.random().toString(36).substr(2);
      localStorage.setItem('authToken', fakeToken);
      localStorage.setItem('userName', username)
      // นำทางไปยังหน้า main
      navigate('/main');
    } else {
      setError('ยูเซอร์เนม/เบอร์มือถือ หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography component="h1" variant="h4">
          <b>เข้าสู่ระบบ</b>
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 4, p: 3, boxShadow: 3, width: 4 / 6, bgcolor: "white" }}
        >
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="ยูเซอร์เนม/เบอร์มือถือ"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="รหัสผ่าน"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="จดจำการเข้าสู่ระบบ"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ล็อคอิน
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ลืมรหัสผ่าน?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;