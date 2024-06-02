import { Box } from '@mui/material'
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import ButtonGroup from '@mui/material/ButtonGroup';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//icon
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CachedIcon from '@mui/icons-material/Cached';

const UserName = "ผู้ใช้งาน"

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
  
  function createData(num, user, rank, ID, status, amountSaving, lastLogin) {
    return { num, user, rank, ID, status, amountSaving, lastLogin };
  }
  
  const rows = [
    createData('1', "PG Soft", "Agent", 1234567, "Active", 999.00, "2-Jun-2024"),
    createData('2', "PG Soft", "Agent", 1234567, "Active", 999.00, "2-Jun-2024"),
    createData('3', "PG Soft", "Agent", 1234567, "Active", 999.00, "2-Jun-2024"),

  ];

function ListNameAgent() {
    const [activeButtons, setActiveButtons] = useState(
        rows.map(() => 'เปิด')
      );
    
      const handleButtonClick = (index, value) => {
        const newActiveButtons = [...activeButtons];
        newActiveButtons[index] = value;
        setActiveButtons(newActiveButtons);
      };

  return (
    <Box sx={{ gap: 2, display :'flex', flexDirection: 'column', bgcolor:'background.paper'}}>
      <Typography variant="h4">
        รายชื่อเอเย่นต์/สมาชิก
      </Typography>
      <Box sx={{bgcolor: 'white', p: 2, boxShadow: 1, gap: 2, display: 'flex', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
            <TextField id="outlined-basic" label="กรอกชื่อผู้ใช้" variant="outlined" />
            <Button variant="contained">ค้นหา</Button>
        </Box>
        <Box sx={{display: 'flex' , justifyContent: 'space-between'}}>

        <Typography variant="subtitle1">
            <Box sx={{ bgcolor: '#eeeeee', display: 'inline-block', p: 1 ,borderRadius: '10px'}}>
                <b>ดาวไลน์ปัจจุบัน : </b> {UserName}
            </Box>
            </Typography>

            ฺ<Button  startIcon={<CachedIcon />}>
            <b>รีเซ็ต</b>
            </Button>

        </Box>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
        <TableRow>
            <StyledTableCell align="center" rowSpan={2}>ลำดับ</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>ชื่อผู้ใช้งาน</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>ระดับ</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>ชื่อ</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>เบอร์โทรศัพท์</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>แก้ไข</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>ดู</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>สถานะ</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>ยอดเงิน (บาท)</StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>เข้าใช้งานล่าสุด</StyledTableCell>
          </TableRow>
  
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.num}>
              <StyledTableCell component="th" scope="row" align='center'>
                {row.num}
              </StyledTableCell>
              <StyledTableCell align="left">{row.user}</StyledTableCell>
              <StyledTableCell align="center">{row.rank}</StyledTableCell>
              <StyledTableCell align="center">{row.ID}</StyledTableCell>
              <StyledTableCell align="center">
              {/* <ButtonGroup variant="contained" aria-label="ManageUserStatus">
                      <Button
                        color="success"
                        variant={activeButtons[index] === 'เปิด' ? 'contained' : 'outlined'}
                        onClick={() => handleButtonClick(index, 'เปิด')}
                      >
                        เปิด
                      </Button>
                      <Button
                        color="error"
                        variant={activeButtons[index] === 'ระงับ' ? 'contained' : 'outlined'}
                        onClick={() => handleButtonClick(index, 'ระงับ')}
                      >
                        ระงับ
                      </Button>
                    </ButtonGroup> */}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button>
                    <EditIcon/>
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
              <Button>
                    <VisibilityIcon/>
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
              <Typography variant="subtitle1">
                    <Box sx={{color: "green"}}>
                        <b> {row.status}</b>
                    </Box>
            </Typography>
               
                </StyledTableCell>
              <StyledTableCell align="right">{row.amountSaving}</StyledTableCell>
              <StyledTableCell align="right">{row.lastLogin}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>

      </Box>
    </Box>
  )
}

export default ListNameAgent
