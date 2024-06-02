import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//icon
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpIcon from '@mui/icons-material/Help';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.black,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    fontWeight: `bold`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderButtom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  [`&.${tableCellClasses.footer}`]: {
    fontSize: 14,
    color: theme.palette.common.black,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderButtom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
    fontWeight: `bold`,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

function createData(num, provider, amount, realAmount, winloseRate, houseEdge, memberWinlose, memberCom, memberSum, providerWinlose, providerCom, providerSum, ambaapiWinlose, ambapiCom, ambapiSum) {
  return { num, provider, amount, realAmount, winloseRate, houseEdge, memberWinlose, memberCom, memberSum, providerWinlose, providerCom, providerSum, ambaapiWinlose, ambapiCom, ambapiSum };
}

const rows = [
  createData('1', "PG Soft", 1, 2, 3,4 ,5 ,6 ,7 ,8 ,9, 10,11,12,13),
  createData('2', "PG Soft", 1, 2, 3,4 ,5 ,6 ,7 ,8 ,9, 10,11,12,13),
  createData('3', "PG Soft", 1, 2, 3,4 ,5 ,6 ,7 ,8 ,9, 10,11,12,13),
  createData('4', "PG Soft", 1, 2, 3,4 ,5 ,6 ,7 ,8 ,9, 10,11,12,13),
];

function LoseWinProvider() {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  return (
    <Box sx={{ gap: 2, display :'flex', flexDirection: 'column'}}>
    <Typography variant="h4">
      แพ้/ชนะ
    </Typography>
  {/* SearchHeader */}
    <Box sx={{bgcolor: 'white', p: 2, boxShadow: 1, display: 'flex', flexDirection: 'column', gap: 2}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap : 2, alignItems: 'center'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="จากวันที่" />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="ถึงวันที่" />
            </DemoContainer>
          </LocalizationProvider>
          <Button variant="contained">ค้นหา</Button>
          <Button variant="contained" color="success">ทั้งหมด</Button>
          <Divider orientation="vertical" flexItem sx={{ height: 28, width: 2,  alignSelf: 'center', mx: 1, mr:2, bgcolor: 'grey' }} />
          <ButtonGroup variant="contained" aria-label="GroupSelect">
            <Button>วันนี้</Button>
            <Button>อาทิตย์นี้</Button>
            <Button>เดือนนี้</Button>
        </ButtonGroup>
        </Box>
        <Typography variant="subtitle1" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
          <HelpOutlineIcon fontSize="small" />นโยบายข้อมูล
        </Typography>
      </Box>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
        <TableRow>
            <StyledTableCell align="center" rowSpan={2}>ลำดับ</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>ผูัให้บริการ</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>จำนวนเดิมพัน</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>ยอดเงินเดิมพันจริง</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>ชนะ/แพ้ 100%</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>House edge</StyledTableCell>
            <StyledTableCell align="center" colSpan={3}>สมาชิก</StyledTableCell>
            <StyledTableCell align="center" colSpan={3}>บริษัท</StyledTableCell>
            <StyledTableCell align="center" colSpan={3}>Amb Api</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell align="center">ชนะ/แพ้</StyledTableCell>
            <StyledTableCell align="center">คอม</StyledTableCell>
            <StyledTableCell align="center">ยอดรวม</StyledTableCell>
            <StyledTableCell align="center">ชนะ/แพ้</StyledTableCell>
            <StyledTableCell align="center">คอม</StyledTableCell>
            <StyledTableCell align="center">ยอดรวม</StyledTableCell>
            <StyledTableCell align="center">ชนะ/แพ้</StyledTableCell>
            <StyledTableCell align="center">คอม</StyledTableCell>
            <StyledTableCell align="center">ยอดรวม</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.num}>
              <StyledTableCell component="th" scope="row" align='center'>
                {row.num}
              </StyledTableCell>
              <StyledTableCell align="left">{row.provider}</StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell align="right">{row.realAmount}</StyledTableCell>
              <StyledTableCell align="right">{row.winloseRate}</StyledTableCell>
              <StyledTableCell align="right">{row.houseEdge}</StyledTableCell>
              <StyledTableCell align="right">{row.memberWinlose}</StyledTableCell>
              <StyledTableCell align="right">{row.memberCom}</StyledTableCell>
              <StyledTableCell align="right">{row.memberSum}</StyledTableCell>
              <StyledTableCell align="right">{row.providerWinlose}</StyledTableCell>
              <StyledTableCell align="right">{row.providerCom}</StyledTableCell>
              <StyledTableCell align="right">{row.providerSum}</StyledTableCell>
              <StyledTableCell align="right">{row.ambaapiWinlose}</StyledTableCell>
              <StyledTableCell align="right">{row.ambapiCom}</StyledTableCell>
              <StyledTableCell align="right">{row.ambapiSum}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow sx={{bgcolor: 'grey.400'}}>
            <StyledTableCell align="center" colSpan={6}>รวม (บาท)</StyledTableCell>
            <StyledTableCell align="right">สมาชิก รวม</StyledTableCell>
            <StyledTableCell align="right">สมาชิก คอม รวม</StyledTableCell>
            <StyledTableCell align="right">สมาชิก ยอดรวม</StyledTableCell>
            <StyledTableCell align="right">บริษัท ชนะ/แพ้ รวม</StyledTableCell>
            <StyledTableCell align="right">บริษัท คอม รวม</StyledTableCell>
            <StyledTableCell align="right">บริษัท ยอดรวม</StyledTableCell>
            <StyledTableCell align="right">Amb Api ชนะ/แพ้ รวม</StyledTableCell>
            <StyledTableCell align="right">Amb Api คอม รวม</StyledTableCell>
            <StyledTableCell align="right">Amb Api ยอดรวม</StyledTableCell>
          </TableRow>
          <TableRow sx={{bgcolor: 'grey.500'}}>
            <StyledTableCell align="center" colSpan={6}>รวม (ดอลล่าห์)</StyledTableCell>
            <StyledTableCell align="right">สมาชิก รวม</StyledTableCell>
            <StyledTableCell align="right">สมาชิก คอม รวม</StyledTableCell>
            <StyledTableCell align="right">สมาชิก ยอดรวม</StyledTableCell>
            <StyledTableCell align="right">บริษัท ชนะ/แพ้ รวม</StyledTableCell>
            <StyledTableCell align="right">บริษัท คอม รวม</StyledTableCell>
            <StyledTableCell align="right">บริษัท ยอดรวม</StyledTableCell>
            <StyledTableCell align="right">Amb Api ชนะ/แพ้ รวม</StyledTableCell>
            <StyledTableCell align="right">Amb Api คอม รวม</StyledTableCell>
            <StyledTableCell align="right">Amb Api ยอดรวม</StyledTableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Box>
  
    
  </Box>
  )
}

export default LoseWinProvider
