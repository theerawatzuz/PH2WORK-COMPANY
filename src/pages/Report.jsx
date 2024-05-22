import Layout from "../components/Layout";
import '../styles/global.css';
import React, { useState, useEffect, useRef  } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneCallbackOutlinedIcon from '@mui/icons-material/PhoneCallbackOutlined';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { Stack } from "@mui/material";
import TextField from '@mui/material/TextField';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import axios from "axios";
import Alert from '@mui/material/Alert';
import LeftNav from "../components/LeftNav";



function Report() {

  return (
    <Layout>
      <React.Fragment>
        <Box sx={{  height: '100vh'  ,mt: 2}}>
        
          <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1}}>
             
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    </Layout>
  );
}

export default Report;
