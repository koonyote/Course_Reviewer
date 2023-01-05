import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Label } from "@mui/icons-material";

export default function Add_Course(props) {
  const { classes } = props;
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <h1>Add Course</h1>
        <Grid item xs={1}>
          <Card style={{ backgroundColor: "#ADD3F3" }}>
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                ></Typography>
                <Typography variant="body2" color="text.secondary">
                  <Box m={2} pt={3}>
                   <label>asd</label>
                    
                    
                    <TextField
                      required
                      fullWidth
                      id="username"
                      name="username"
                      autoComplete="username"
                      style={{ backgroundColor: "white", borderRadius: "30px" }}
                      sx={{ border: "none", "& fieldset": { border: "none" } }}
                    />
                    
                  </Box>
                  <Box m={2} pt={3}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="ชื่อวิชา TH"
                      name="username"
                      autoComplete="username"
                      style={{ backgroundColor: "white", borderRadius: "30px" }}
                      sx={{ border: "none", "& fieldset": { border: "none" } }}
                    />
                  </Box>
                  <Box m={2} pt={3}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="ชื่อวิชา EN"
                      name="username"
                      autoComplete="username"
                      style={{ backgroundColor: "white", borderRadius: "30px" }}
                      sx={{ border: "none", "& fieldset": { border: "none" } }}
                    />
                  </Box>
                  <Box m={2} pt={3}>
                    <TextField
                      fullWidth
                      id="username"
                      label="รายละเอียด"
                      name="username"
                      autoComplete="username"
                      style={{ backgroundColor: "white", borderRadius: "30px" }}
                      sx={{ border: "none", "& fieldset": { border: "none" } }}
                    />
                  </Box>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
