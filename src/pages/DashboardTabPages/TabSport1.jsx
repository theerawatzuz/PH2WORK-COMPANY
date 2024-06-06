import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

//Game Status
const GameStatus = "Enabled"

//Percentage
const PercentShowing = "50"

//AmountBaht
const AmountBaht = "100,000.00"

export default function TabSport1() {
  const [selectedButton, setSelectedButton] = useState('เดี่ยว');

  const handleButtonClick = (value) => {
    setSelectedButton(value);
  };

  const buttonStyles = (buttonValue) => ({
    backgroundColor: selectedButton === buttonValue ? 'primary.main' : 'inherit',
    color: selectedButton === buttonValue ? 'white' : 'inherit',
    '&:hover': {
      backgroundColor: selectedButton === buttonValue ? 'primary.dark' : 'primary.light',
      color: selectedButton === buttonValue ? 'white' : 'primary.main',
    },
  });

  return (
    <div>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          {/* Select */}
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button
              sx={buttonStyles('เดี่ยว')}
              onClick={() => handleButtonClick('เดี่ยว')}
            >
              เดี่ยว
            </Button>
            <Button
              sx={buttonStyles('พาร์เลย์')}
              onClick={() => handleButtonClick('พาร์เลย์')}
            >
              พาร์เลย์
            </Button>
            <Button
              sx={buttonStyles('คอมโบ')}
              onClick={() => handleButtonClick('คอมโบ')}
            >
              คอมโบ
            </Button>
          </ButtonGroup>
        </Box>

        {/* Select1 */}
        {selectedButton === 'เดี่ยว' && (
          <Box sx={{mt:2, display: "flex" , flexDirection: 'column', gap: 2}}>
            <Typography color="green">
              สถานะ : <b>{GameStatus}</b>
            </Typography>
            <Box sx={{display: 'flex', gap: 2}}>
              <Box sx={{display: 'flex', width: 1/3, bgcolor: "grey.400", borderRadius: '16px', p: 2 , gap: 2 }}>
                <Box sx={{width: 1, display: "flex" , flexDirection: 'column', gap: 1}}>
                    <Typography variant='h6'>
                      <b>ตั้งค่าหุ้นส่วน 1</b>
                    </Typography>
                    <Typography variant='subtitle1' color="primary">
                      <b>กีฬา</b>
                    </Typography>
                    
                    {/* //PercentSpace */}
                    <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle2'>
                        <b>ต่อสู้</b>
                      </Typography>
                      <Typography variant='subtitle2'>
                        <b>{PercentShowing}%</b>
                      </Typography>
                    </Box>
                    <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle2'>
                        <b>เอาส่วนที่เหลือ</b>
                      </Typography>
                      <Typography variant='subtitle2'>
                        <b>{PercentShowing}%</b>
                      </Typography>
                    </Box>
                    <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle2'>
                        <b>บังคับถือ</b>
                      </Typography>
                      <Typography variant='subtitle2'>
                        <b>{PercentShowing}%</b>
                      </Typography>
                    </Box>
                </Box>
                     <Divider orientation="vertical" flexItem sx={{ height: 1, width: 2,  alignSelf: 'center', mx: 1, mr:2, bgcolor: 'black' }} />
                <Box sx={{width: 1, display: "flex" , flexDirection: 'column', gap: 1}}>
                    <Typography variant='h6'>
                      <b>ตั้งค่าหุ้นส่วน 2</b>
                    </Typography>
                    <Typography variant='subtitle1' color="primary">
                      <b>กีฬาสด</b>
                    </Typography>
                    
                    {/* //PercentSpace */}
                    <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle2'>
                        <b>ต่อสู้</b>
                      </Typography>
                      <Typography variant='subtitle2'>
                        <b>{PercentShowing}%</b>
                      </Typography>
                    </Box>
                    <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle2'>
                        <b>เอาส่วนที่เหลือ</b>
                      </Typography>
                      <Typography variant='subtitle2'>
                        <b>{PercentShowing}%</b>
                      </Typography>
                    </Box>
                    <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle2'>
                        <b>บังคับถือ</b>
                      </Typography>
                      <Typography variant='subtitle2'>
                        <b>{PercentShowing}%</b>
                      </Typography>
                    </Box>
                </Box>
              </Box>
              <Box sx={{ width: 1/3, bgcolor: "grey.400", borderRadius: '16px', p: 2, display: "flex" , flexDirection: 'column', gap: 1}}>
                  <Typography variant='h6'>
                    <b>คอมมิชชั่น</b>
                  </Typography>
                  {/* <Typography variant='subtitle1' color="primary">
                    <b>กีฬา</b>
                  </Typography> */}
                  
                  {/* //PercentSpace */ }
                  <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle2'>
                      <b>ต่อสู้</b>
                    </Typography>
                    <Typography variant='subtitle2'>
                      <b>{PercentShowing}%</b>
                    </Typography>
                  </Box>
                  {/* <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle2'>
                      <b>เอาส่วนที่เหลือ</b>
                    </Typography>
                    <Typography variant='subtitle2'>
                      <b>{PercentShowing}%</b>
                    </Typography>
                  </Box>
                  <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle2'>
                      <b>บังคับถือ</b>
                    </Typography>
                    <Typography variant='subtitle2'>
                      <b>{PercentShowing}%</b>
                    </Typography>
                  </Box> */}
              </Box>
              <Box sx={{display: 'flex', width: 1/3, bgcolor: "grey.400", borderRadius: '16px', p: 2 , gap: 2 }}>
                <Box sx={{width: 1, display: "flex" , flexDirection: 'column', gap: 1}}>
                    <Typography variant='h6'>
                      <b>ลิมิต</b>
                    </Typography>
                    <Typography variant='subtitle1' color="primary">
                      <b>สูงสุดต่อรายการ</b>
                    </Typography>
                    
                    {/* //PercentSpace */}
                    <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle2'>
                        <b>ต่อสู้</b>
                      </Typography>
                      <Typography variant='subtitle2'>
                        <b>{AmountBaht} บาท</b>
                      </Typography>
                    </Box>
                    <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle2'>
                        <b>เอาส่วนที่เหลือ</b>
                      </Typography>
                      <Typography variant='subtitle2'>
                        <b>{AmountBaht} บาท</b>
                      </Typography>
                    </Box>
                    <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle2'>
                        <b>บังคับถือ</b>
                      </Typography>
                      <Typography variant='subtitle2'>
                        <b>{AmountBaht} บาท</b>
                      </Typography>
                    </Box>
                </Box>
                     <Divider orientation="vertical" flexItem sx={{ height: 1, width: 2,  alignSelf: 'center', mx: 1, mr:2, bgcolor: 'black' }} />
                <Box sx={{width: 1, display: "flex" , flexDirection: 'column', gap: 1}}>
                    <Typography variant='h6'>
                      {/* <b>ตั้งค่าหุ้นส่วน 2</b> */}
                    </Typography>
                    <Typography variant='subtitle1' color="primary">
                      <b>สูงสุดต่อรายการ/เกม</b>
                    </Typography>
                    
                    {/* //PercentSpace */}
                    <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle2'>
                        <b>ต่อสู้</b>
                      </Typography>
                      <Typography variant='subtitle2'>
                        <b>{AmountBaht} บาท</b>
                      </Typography>
                    </Box>
                    <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle2'>
                        <b>เอาส่วนที่เหลือ</b>
                      </Typography>
                      <Typography variant='subtitle2'>
                        <b>{AmountBaht} บาท</b>
                      </Typography>
                    </Box>
                    {/* <Box sx={{display :'flex', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle2'>
                        <b>บังคับถือ</b>
                      </Typography>
                      <Typography variant='subtitle2'>
                        <b>{PercentShowing}%</b>
                      </Typography>
                    </Box> */}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {selectedButton === 'พาร์เลย์' && (
          <Box>
            Select2 work
          </Box>
        )}
        {selectedButton === 'คอมโบ' && (
          <Box>
            Select3 work
          </Box>
        )}
      </Box>
    </div>
  );
}
