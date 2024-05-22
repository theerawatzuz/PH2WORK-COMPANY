import Layout from "../components/Layout"
import '../styles/global.css'
import React, { useEffect, useState ,useRef} from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Resultreport() {

  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const searchTermRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isTyping && searchTermRef.current) { 
      searchTermRef.current.focus();
    }
  }, [isTyping]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsTyping(true);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey[300], 0.5),
    '&:hover': {
      backgroundColor: alpha(theme.palette.grey[300], 0.8),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));


  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const BoldTableCell = styled(TableCell)`
  font-weight: bold;
`;

  useEffect(() => {
    axios.get('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-1-dwdap/endpoint/crmGetAllData')
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setData(response.data); 
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredData = data.filter((row) =>
    (row.priority && row.priority.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (row.department && row.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (row.category && row.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (row.name && row.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (row.lastName && row.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (row.phoneNumber && row.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (`${new Date(row.receivingDate).toLocaleDateString()} ${new Date(row.receivingTime).toLocaleTimeString()}`.toLowerCase().includes(searchTerm.toLowerCase()))
  );



  return (
    <Layout>
      <React.Fragment>
        <Container maxWidth="lg">
          <Box sx={{ bgcolor: 'white', height: '100vh' , mt:3 , flexGrow: 1}}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item xs={12} sm={8} md={8}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 , justifyContent: { xs: 'center', sm: 'flex-start' }}}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontWeight: activeIndex === 0 ? 'bold' : 'light',
                        '&:hover': { fontWeight: 'bold' },
                        cursor: 'pointer',
                      }}
                      onClick={() => handleItemClick(0)}
                    >
                      All
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontWeight: activeIndex === 1 ? 'bold' : 'light',
                        '&:hover': { fontWeight: 'bold' },
                        cursor: 'pointer',
                      }}
                      onClick={() => handleItemClick(1)}
                    >
                      Day
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontWeight: activeIndex === 2 ? 'bold' : 'light',
                        '&:hover': { fontWeight: 'bold' },
                        cursor: 'pointer',
                      }}
                      onClick={() => handleItemClick(2)}
                    >
                      Week
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontWeight: activeIndex === 3 ? 'bold' : 'light',
                        '&:hover': { fontWeight: 'bold' },
                        cursor: 'pointer',
                      }}
                      onClick={() => handleItemClick(3)}
                    >
                      Year
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-end' }}}>
                  <Box>
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        ref={searchTermRef} 
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </Search>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
            <TableContainer component={Paper} sx={{ mt: 2 }} stickyHeader={true}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ position: 'sticky', top: 0 }}>
                  <TableRow>
                    <BoldTableCell align="center">Priority</BoldTableCell>
                    <BoldTableCell align="center">Date&Time</BoldTableCell>
                    <BoldTableCell align="center">Department</BoldTableCell>
                    <BoldTableCell align="center">Category</BoldTableCell>
                    <BoldTableCell align="center">Name</BoldTableCell>
                    <BoldTableCell align="center">Last name</BoldTableCell>
                    <BoldTableCell align="center">Phone</BoldTableCell>
                    <BoldTableCell align="center">Action</BoldTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row) => (
                    <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center">{row.priority}</TableCell>
                      <TableCell align="center">{`${new Date(row.receivingDate).toLocaleDateString()} ${new Date(row.receivingTime).toLocaleTimeString()}`}</TableCell>
                      <TableCell align="center">{row.department}</TableCell>
                      <TableCell align="center">{row.category}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.lastName}</TableCell>
                      <TableCell align="center">{row.phoneNumber}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup variant="contained" disabled size="small" aria-label="small primary button group">
                          <Button color="success" >ACCEPT</Button>
                          <Button color="error">DELETE</Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Box>
          </Box>
        </Container>
      </React.Fragment>
    </Layout>
  )
}

export default Resultreport;
