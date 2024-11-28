import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";
import Switch from "@mui/material/Switch";
import { Typography, Select, MenuItem } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

//Percentage
const PercentShowing = "50";

//AmountBaht
const AmountBaht = "100,000.00";

export default function TabSport() {
  const [percentFight, setFightPercent] = useState(0);
  const [percentAmount, setAmountPercent] = useState(0);
  const [percentHeld, setHeldPercent] = useState(0);
  const [percentRealFight, setRealFightPercent] = useState(0);
  const [percentRealAmount, setRealAmountPercent] = useState(0);
  const [percentRealHeld, setRealHeldPercent] = useState(0);
  const [percentCommission, setCommissionPercent] = useState(0);
  const [percentFree, setFreePercent] = useState(0);
  const [percentRealFree, setRealFreePercent] = useState(0);
  const [selectedButton, setSelectedButton] = useState("เดี่ยว");
  const [checked, setDisabled] = React.useState(true);
  const handleButtonClick = (value) => {
    setSelectedButton(value);
  };

  const handleFightChange = (event) => {
    setFightPercent(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmountPercent(event.target.value);
  };
  const handleHeldChange = (event) => {
    setHeldPercent(event.target.value);
  };
  const handleRealFightChange = (event) => {
    setRealFightPercent(event.target.value);
  };
  const handleRealAmountChange = (event) => {
    setRealAmountPercent(event.target.value);
  };
  const handleRealHeldChange = (event) => {
    setRealHeldPercent(event.target.value);
  };
  const handleCommissionChange = (event) => {
    setCommissionPercent(event.target.value);
  };
  const handleFreeChange = (event) => {
    setFreePercent(event.target.value);
  };
  const handleRealFreeChange = (event) => {
    setRealFreePercent(event.target.value);
  };

  //switch
  const handleDisabledChange = (event) => {
    setDisabled(event.target.checked);
  };

  const buttonStyles = (buttonValue) => ({
    backgroundColor:
      selectedButton === buttonValue ? "primary.main" : "inherit",
    color: selectedButton === buttonValue ? "white" : "inherit",
    "&:hover": {
      backgroundColor:
        selectedButton === buttonValue ? "primary.dark" : "primary.light",
      color: selectedButton === buttonValue ? "white" : "primary.main",
    },
  });

  return (
    <div>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          {/* Select */}
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button
              sx={buttonStyles("เดี่ยว")}
              onClick={() => handleButtonClick("เดี่ยว")}
            >
              เดี่ยว
            </Button>
            <Button
              sx={buttonStyles("พาร์เลย์")}
              onClick={() => handleButtonClick("พาร์เลย์")}
            >
              พาร์เลย์
            </Button>
            <Button
              sx={buttonStyles("คอมโบ")}
              onClick={() => handleButtonClick("คอมโบ")}
            >
              คอมโบ
            </Button>
          </ButtonGroup>
        </Box>

        {/* Select1 */}
        {selectedButton === "เดี่ยว" && (
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              สถานะ :
              <Typography color="grey">
                <b>Disabled</b>
              </Typography>
              <Switch
                checked={checked}
                onChange={handleDisabledChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Typography color="green">
                <b>Enabled</b>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  width: (5 / 12) * 100 + "%",
                  bgcolor: "grey.400",
                  borderRadius: "16px",
                  p: 2,
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">
                    <b>ตั้งค่าหุ้นส่วน 1</b>
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    <b>กีฬา</b>
                  </Typography>

                  {/* //PercentSpace */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>ต่อสู้</b>
                    </Typography>
                    <Typography variant="subtitle2">
                      <b>
                        <Select
                          disabled={!checked}
                          sx={{ bgcolor: "white" }}
                          value={percentFight}
                          onChange={handleFightChange}
                          size="small"
                        >
                          {[...Array(101).keys()].map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}%
                            </MenuItem>
                          ))}
                        </Select>
                      </b>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>ปล่อย</b>
                    </Typography>
                    <Typography variant="subtitle2">
                      <b>
                        <Select
                          disabled={!checked}
                          sx={{ bgcolor: "white" }}
                          value={percentFree}
                          onChange={handleFreeChange}
                          size="small"
                        >
                          {[...Array(101).keys()].map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}%
                            </MenuItem>
                          ))}
                        </Select>
                      </b>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>เอาส่วนที่เหลือ</b>
                    </Typography>
                    <Typography variant="subtitle2">
                      <b>
                        <Select
                          disabled={!checked}
                          sx={{ bgcolor: "white" }}
                          value={percentAmount}
                          onChange={handleAmountChange}
                          size="small"
                        >
                          {[...Array(101).keys()].map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}%
                            </MenuItem>
                          ))}
                        </Select>
                      </b>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>บังคับถือ</b>
                    </Typography>
                    <Typography variant="subtitle2">
                      <b>
                        <Select
                          disabled={!checked}
                          sx={{ bgcolor: "white" }}
                          value={percentHeld}
                          onChange={handleHeldChange}
                          size="small"
                        >
                          {[...Array(101).keys()].map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}%
                            </MenuItem>
                          ))}
                        </Select>
                      </b>
                    </Typography>
                  </Box>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    height: 1,
                    width: 2,
                    alignSelf: "center",
                    mx: 1,
                    mr: 2,
                    bgcolor: "black",
                  }}
                />
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">
                    <b>ตั้งค่าหุ้นส่วน 2</b>
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    <b>กีฬาสด</b>
                  </Typography>

                  {/* //PercentSpace */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>ต่อสู้</b>
                    </Typography>
                    <Typography variant="subtitle2">
                      <b>
                        <Select
                          disabled={!checked}
                          sx={{ bgcolor: "white" }}
                          value={percentRealFight}
                          onChange={handleRealFightChange}
                          size="small"
                        >
                          {[...Array(101).keys()].map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}%
                            </MenuItem>
                          ))}
                        </Select>
                      </b>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>ปล่อย</b>
                    </Typography>
                    <Typography variant="subtitle2">
                      <b>
                        <Select
                          disabled={!checked}
                          sx={{ bgcolor: "white" }}
                          value={percentRealFree}
                          onChange={handleRealFreeChange}
                          size="small"
                        >
                          {[...Array(101).keys()].map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}%
                            </MenuItem>
                          ))}
                        </Select>
                      </b>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>เอาส่วนที่เหลือ</b>
                    </Typography>
                    <Typography variant="subtitle2">
                      <b>
                        <Select
                          disabled={!checked}
                          sx={{ bgcolor: "white" }}
                          value={percentRealAmount}
                          onChange={handleRealAmountChange}
                          size="small"
                        >
                          {[...Array(101).keys()].map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}%
                            </MenuItem>
                          ))}
                        </Select>
                      </b>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>บังคับถือ</b>
                    </Typography>
                    <Typography variant="subtitle2">
                      <b>
                        <Select
                          disabled={!checked}
                          sx={{ bgcolor: "white" }}
                          value={percentRealHeld}
                          onChange={handleRealHeldChange}
                          size="small"
                        >
                          {[...Array(101).keys()].map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}%
                            </MenuItem>
                          ))}
                        </Select>
                      </b>
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: 5 / 12,
                  bgcolor: "grey.400",
                  borderRadius: "16px",
                  p: 2,
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">
                    <b>ลิมิต</b>
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    <b>สูงสุดต่อรายการ</b>
                  </Typography>

                  {/* //PercentSpace */}
                  <Box
                    sx={{
                      display: "grid",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>ต่อสู้</b>
                    </Typography>
                    <OutlinedInput
                      disabled={!checked}
                      id="fight-input"
                      sx={{ bgcolor: "white" }}
                      endAdornment={
                        <InputAdornment position="end">บาท</InputAdornment>
                      }
                      aria-describedby="fight-input"
                      inputProps={{
                        "aria-label": "bath",
                      }}
                      size="small"
                      onChange={(event) => {
                        const value = event.target.value.replace(/[^\d]/g, "");
                        const number = parseInt(value, 10);
                        if (!isNaN(number)) {
                          event.target.value = number.toLocaleString("th-TH");
                        }
                      }}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>เอาส่วนที่เหลือ</b>
                    </Typography>
                    <OutlinedInput
                      disabled={!checked}
                      id="fight-input"
                      sx={{ bgcolor: "white" }}
                      endAdornment={
                        <InputAdornment position="end">บาท</InputAdornment>
                      }
                      aria-describedby="fight-input"
                      inputProps={{
                        "aria-label": "bath",
                      }}
                      size="small"
                      onChange={(event) => {
                        const value = event.target.value.replace(/[^\d]/g, "");
                        const number = parseInt(value, 10);
                        if (!isNaN(number)) {
                          event.target.value = number.toLocaleString("th-TH");
                        }
                      }}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>บังคับถือ</b>
                    </Typography>
                    <OutlinedInput
                      disabled={!checked}
                      id="fight-input"
                      sx={{ bgcolor: "white" }}
                      endAdornment={
                        <InputAdornment position="end">บาท</InputAdornment>
                      }
                      aria-describedby="fight-input"
                      inputProps={{
                        "aria-label": "bath",
                      }}
                      size="small"
                      onChange={(event) => {
                        const value = event.target.value.replace(/[^\d]/g, "");
                        const number = parseInt(value, 10);
                        if (!isNaN(number)) {
                          event.target.value = number.toLocaleString("th-TH");
                        }
                      }}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Box>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    height: 1,
                    width: 2,
                    alignSelf: "center",
                    mx: 1,
                    mr: 2,
                    bgcolor: "black",
                  }}
                />
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">
                    {/* <b>ตั้งค่าหุ้นส่วน 2</b> */}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    <b>สูงสุดต่อรายการ/เกม</b>
                  </Typography>

                  {/* //PercentSpace */}
                  <Box
                    sx={{
                      display: "grid",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>ต่อสู้</b>
                    </Typography>
                    <OutlinedInput
                      disabled={!checked}
                      id="fight-input"
                      sx={{ bgcolor: "white" }}
                      endAdornment={
                        <InputAdornment position="end">บาท</InputAdornment>
                      }
                      aria-describedby="fight-input"
                      inputProps={{
                        "aria-label": "bath",
                      }}
                      size="small"
                      onChange={(event) => {
                        const value = event.target.value.replace(/[^\d]/g, "");
                        const number = parseInt(value, 10);
                        if (!isNaN(number)) {
                          event.target.value = number.toLocaleString("th-TH");
                        }
                      }}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <b>เอาส่วนที่เหลือ</b>
                    </Typography>
                    <OutlinedInput
                      disabled={!checked}
                      id="fight-input"
                      sx={{ bgcolor: "white" }}
                      endAdornment={
                        <InputAdornment position="end">บาท</InputAdornment>
                      }
                      aria-describedby="fight-input"
                      inputProps={{
                        "aria-label": "bath",
                      }}
                      size="small"
                      onChange={(event) => {
                        const value = event.target.value.replace(/[^\d]/g, "");
                        const number = parseInt(value, 10);
                        if (!isNaN(number)) {
                          event.target.value = number.toLocaleString("th-TH");
                        }
                      }}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: 2 / 12,
                  bgcolor: "grey.400",
                  borderRadius: "16px",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="h6">
                  <b>คอมมิชชั่น</b>
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle2">
                    <b>ต่อสู้</b>
                  </Typography>
                  <Typography variant="subtitle2">
                    <b>
                      <Select
                        disabled={!checked}
                        sx={{ bgcolor: "white" }}
                        value={percentCommission}
                        onChange={handleCommissionChange}
                        size="small"
                      >
                        {[...Array(101).keys()].map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}%
                          </MenuItem>
                        ))}
                      </Select>
                    </b>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {selectedButton === "พาร์เลย์" && <Box>Select2 work</Box>}
        {selectedButton === "คอมโบ" && <Box>Select3 work</Box>}
      </Box>
    </div>
  );
}
