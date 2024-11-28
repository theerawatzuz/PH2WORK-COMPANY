import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Switch,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function TabSlot() {
  const [exclusiveEnabled, setExclusiveEnabled] = useState(false);
  const [vVipEnabled, setVVipEnabled] = useState(false);
  const [vipEnabled, setVipEnabled] = useState(false);

  const [exclusivePercentage, setExclusivePercentage] = useState(88);
  const [vVipPercentage, setVVipPercentage] = useState(87);
  const [vipPercentage, setVipPercentage] = useState(80);

  const [exclusiveReleasePercentage, setExclusiveReleasePercentage] =
    useState(0);
  const [exclusiveRemainingPercentage, setExclusiveRemainingPercentage] =
    useState(0);
  const [exclusiveForcedPercentage, setExclusiveForcedPercentage] = useState(0);

  const [vVipReleasePercentage, setVVipReleasePercentage] = useState(0);
  const [vVipRemainingPercentage, setVVipRemainingPercentage] = useState(0);
  const [vVipForcedPercentage, setVVipForcedPercentage] = useState(0);

  const [vipReleasePercentage, setVipReleasePercentage] = useState(0);
  const [vipRemainingPercentage, setVipRemainingPercentage] = useState(0);
  const [vipForcedPercentage, setVipForcedPercentage] = useState(0);

  const handleExclusiveSwitch = (event) => {
    setExclusiveEnabled(event.target.checked);
  };

  const handleVVipSwitch = (event) => {
    setVVipEnabled(event.target.checked);
  };

  const handleVipSwitch = (event) => {
    setVipEnabled(event.target.checked);
  };

  // Game lists for "Exclusive", "VVip", and "Vip"
  const exclusiveGames = [
    "Askmeslot",
    "Askmebet",
    "Askmeplay",
    "PragmaticPlay Slot",
    "Microgaming Slot",
    "CQ9",
    "Advantplay",
    "Evoplay",
    "ACE333",
    "Dragon Gaming",
  ];

  const vVipGames = [
    "Spinix",
    "Skywind",
    "Sexy Slot",
    "PG Soft",
    "Simple Play",
    "MannaPlay",
    "I8",
    "Mega7",
    "BigPot",
    "Rich88",
  ];

  const vipGames = [
    "Funky Game",
    "Ameba",
    "Live22",
    "Gioco Plus",
    "Wazdan",
    "Funta Gaming",
    "SlotXO",
    "Ultimate Play Gaming",
    "YGG",
    "Creative Gaming",
  ];

  return (
    <Container>
      <Grid container spacing={3}>
        {/* Exclusive Section */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Game List Section (Left) */}
            <Grid item xs={6}>
              <Paper
                elevation={3}
                style={{
                  padding: "16px",
                  backgroundColor: "grey",
                  color: "white",
                }}
              >
                <Typography variant="h6">Exclusive</Typography>

                {/* Game List */}
                <List>
                  {exclusiveGames.map((game, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={game} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Settings Section (Right) */}
            <Grid item xs={6}>
              <Paper elevation={3} style={{ padding: "16px" }}>
                <Typography variant="h6">ตั้งค่าหุ้นส่วน</Typography>
                <Switch
                  checked={exclusiveEnabled}
                  onChange={handleExclusiveSwitch}
                />

                <FormControl
                  fullWidth
                  margin="normal"
                  disabled={!exclusiveEnabled}
                >
                  <InputLabel>ถือสู้</InputLabel>
                  <Select
                    value={exclusivePercentage}
                    onChange={(e) => setExclusivePercentage(e.target.value)}
                  >
                    {[...Array(101).keys()].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="body2" color="textSecondary">
                  Your % got forced to {exclusivePercentage}
                </Typography>

                <FormControl
                  fullWidth
                  margin="normal"
                  disabled={!exclusiveEnabled}
                >
                  <InputLabel>ปล่อย</InputLabel>
                  <Select
                    value={exclusiveReleasePercentage}
                    onChange={(e) =>
                      setExclusiveReleasePercentage(e.target.value)
                    }
                  >
                    {[...Array(101).keys()].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  margin="normal"
                  disabled={!exclusiveEnabled}
                >
                  <InputLabel>เอาส่วนที่เหลือ</InputLabel>
                  <Select
                    value={exclusiveRemainingPercentage}
                    onChange={(e) =>
                      setExclusiveRemainingPercentage(e.target.value)
                    }
                  >
                    {[...Array(101).keys()].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  margin="normal"
                  disabled={!exclusiveEnabled}
                >
                  <InputLabel>บังคับถือ</InputLabel>
                  <Select
                    value={exclusiveForcedPercentage}
                    onChange={(e) =>
                      setExclusiveForcedPercentage(e.target.value)
                    }
                  >
                    {[...Array(101).keys()].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* VVip Section */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Game List Section (Left) */}
            <Grid item xs={6}>
              <Paper
                elevation={3}
                style={{
                  padding: "16px",
                  backgroundColor: "grey",
                  color: "white",
                }}
              >
                <Typography variant="h6">VVip</Typography>

                {/* Game List */}
                <List>
                  {vVipGames.map((game, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={game} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Settings Section (Right) */}
            <Grid item xs={6}>
              <Paper elevation={3} style={{ padding: "16px" }}>
                <Typography variant="h6">ตั้งค่าหุ้นส่วน</Typography>
                <Switch checked={vVipEnabled} onChange={handleVVipSwitch} />

                <FormControl fullWidth margin="normal" disabled={!vVipEnabled}>
                  <InputLabel>ถือสู้</InputLabel>
                  <Select
                    value={vVipPercentage}
                    onChange={(e) => setVVipPercentage(e.target.value)}
                  >
                    {[...Array(101).keys()].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="body2" color="textSecondary">
                  Your % got forced to {vVipPercentage}
                </Typography>

                <FormControl fullWidth margin="normal" disabled={!vVipEnabled}>
                  <InputLabel>ปล่อย</InputLabel>
                  <Select
                    value={vVipReleasePercentage}
                    onChange={(e) => setVVipReleasePercentage(e.target.value)}
                  >
                    {[...Array(101).keys()].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" disabled={!vVipEnabled}>
                  <InputLabel>เอาส่วนที่เหลือ</InputLabel>
                  <Select
                    value={vVipRemainingPercentage}
                    onChange={(e) => setVVipRemainingPercentage(e.target.value)}
                  >
                    {[...Array(101).keys()].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" disabled={!vVipEnabled}>
                  <InputLabel>บังคับถือ</InputLabel>
                  <Select
                    value={vVipForcedPercentage}
                    onChange={(e) => setVVipForcedPercentage(e.target.value)}
                  >
                    {[...Array(101).keys()].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Vip Section */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Game List Section (Left) */}
            <Grid item xs={6}>
              <Paper
                elevation={3}
                style={{
                  padding: "16px",
                  backgroundColor: "grey",
                  color: "white",
                }}
              >
                <Typography variant="h6">Vip</Typography>

                {/* Game List */}
                <List>
                  {vipGames.map((game, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={game} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Settings Section (Right) */}
            <Grid item xs={6}>
              <Paper elevation={3} style={{ padding: "16px" }}>
                <Typography variant="h6">ตั้งค่าหุ้นส่วน</Typography>
                <Switch checked={vipEnabled} onChange={handleVipSwitch} />

                <FormControl fullWidth margin="normal" disabled={!vipEnabled}>
                  <InputLabel>ถือสู้</InputLabel>
                  <Select
                    value={vipPercentage}
                    onChange={(e) => setVipPercentage(e.target.value)}
                  >
                    {[...Array(101).keys()].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="body2" color="textSecondary">
                  Your % got forced to {vipPercentage}
                </Typography>

                <FormControl fullWidth margin="normal" disabled={!vipEnabled}>
                  <InputLabel>ปล่อย</InputLabel>
                  <Select
                    value={vipReleasePercentage}
                    onChange={(e) => setVipReleasePercentage(e.target.value)}
                  >
                    {[...Array(101).keys()].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" disabled={!vipEnabled}>
                  <InputLabel>เอาส่วนที่เหลือ</InputLabel>
                  <Select
                    value={vipRemainingPercentage}
                    onChange={(e) => setVipRemainingPercentage(e.target.value)}
                  >
                    {[...Array(101).keys()].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" disabled={!vipEnabled}>
                  <InputLabel>บังคับถือ</InputLabel>
                  <Select
                    value={vipForcedPercentage}
                    onChange={(e) => setVipForcedPercentage(e.target.value)}
                  >
                    {[...Array(101).keys()].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}%
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TabSlot;
