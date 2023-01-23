import * as React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import config from "../config.json";
import CircularProgress from "@mui/material/CircularProgress";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarsIcon from "@mui/icons-material/Stars";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import SaveIcon from "@mui/icons-material/Save";
import LinearProgress from '@mui/material/LinearProgress';
import Navbar from "./Navbar";
import domain_server from "../config.json";

export default function Rating_page() {
  const [canAddScore, setCan ] = React.useState();
  useEffect(() => {
    const api = async () => {
      const token = localStorage.getItem("token");
      const pathUrlCourseId = window.location.pathname.split("/");
      const API = await fetch(`${domain_server.domain}/rating/${pathUrlCourseId[2]}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "*",
          "User-Agent": "Custom",
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      const data = await API.json();
      if (API.status === 200) {
        const my = data[0]
        setBenefit(my.benefit);
        setKnowledge(my.knowledge);
        setSatisfaction(my.satisfaction);
        setTeacher(my.teacher);
        setTeaching(my.teaching);
        setCan(false)
      } else setCan(true)
    };
    window.setTimeout(() => {
      api();
    }, 1000);
  }, []);

  const labels = {
    1: "Useless+",

    2: "Poor+",

    3: "Ok+",

    4: "Good+",

    5: "Excellent+",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const [knowledge, setKnowledge] = React.useState(0);
  const [benefit, setBenefit] = React.useState(0);
  const [teaching, setTeaching] = React.useState(0);
  const [teacher, setTeacher] = React.useState(0);
  const [satisfaction, setSatisfaction] = React.useState(0);

  const [hover1, setHover1] = React.useState(-1);
  const [hover2, setHover2] = React.useState(-1);
  const [hover3, setHover3] = React.useState(-1);
  const [hover4, setHover4] = React.useState(-1);
  const [hover5, setHover5] = React.useState(-1);

  const location_url = window.location.pathname.split("/");
  const course_id = location_url[2];
  async function handle_bt_save() {
    if (
      knowledge <= 0 ||
      knowledge == null ||
      benefit <= 0 ||
      benefit == null ||
      teaching <= 0 ||
      teaching == null ||
      teacher <= 0 ||
      teacher == null ||
      satisfaction <= 0 ||
      satisfaction == null
    ) {
      alert("กรุณากรอกข้อมูลให้ครบ");
    } else if (!course_id) return;
    else if (canAddScore) return; 
    else {
      const token = localStorage.getItem("token");
      const API = await fetch(`${config.domain}/add-score`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "*",
          "User-Agent": "Custom",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          course_id: course_id,
          knowledge: knowledge,
          benefit: benefit,
          teaching: teaching,
          teacher: teacher,
          satisfaction: satisfaction,
        }),
      });
      const data = await API.json();
      if (API.status === 200) {
        window.location.replace(`/home`);
        alert("ให้คะแนนสำเร็จ");
      } else {
        alert("ให้คะแนนไม่สำเร็จ")
      }
    }
  }
  return (
    <>
      <Navbar></Navbar>
      <Container
        sx={{
          py: 8,
          border: 0,
          borderRadius: 3,
          boxShadow: 10,
          marginBottom: 10,
          marginTop: 2,
        }}
        maxWidth="md"
      >
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          textAlign={"center"}
          href="#"
        >
          Rating Score
        </Typography>
        <Grid container rowSpacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <Card_knowledge />
            <Card_benefit />
            <Card_teaching />
            <Card_teacher />
            <Card_satisfaction />{" "}
            {
              (canAddScore) ? <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                endIcon={<SaveIcon />}
                onClick={handle_bt_save}
                disabled={!canAddScore}
              >
                Save
              </Button>
            </div> : <LinearProgress />
            }
          </Grid>
        </Grid>
      </Container>
    </>
  );

  function Card_knowledge() {
    return (
      <Box sx={{ my: 1 }}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            border: 0,
          }}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              paddingTop: 0.5,
            }}
            style={{ backgroundColor: "#DCDCDC" }}
          >
            <StarsIcon size="large" sx={{ pb: 1, paddingLeft: 2 }} />
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              href="#"
              sx={{ paddingLeft: 1 }}
            >
              ด้านความรู้
            </Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
                ml: "auto",
              }}
            >
              <Rating
                name="hover-feedback"
                value={knowledge}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setKnowledge(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover1(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {knowledge !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover1 !== -1 ? hover1 : knowledge]}
                </Box>
              )}
            </Box>
          </Card>

          <CardContent style={{ backgroundColor: "#F2F2F2" }}>
            <Typography sx={{ pt: 2 }}>
              A job description is a useful, plain-language tool that explains
              the tasks, duties, function and responsibilities of a position. It
              details who performs a specific type of work, how that work is to
              be completed, and the frequency and the purpose of the work as it
              relates to the organization's mission and goals.
            </Typography>
          </CardContent>
          {/* <CircularProgress size={100} sx={{ margin: 2 }} /> */}
        </Card>
      </Box>
    );
  }
  function Card_benefit() {
    return (
      <Box sx={{ my: 1 }}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            border: 0,
          }}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              paddingTop: 0.5,
            }}
            style={{ backgroundColor: "#DCDCDC" }}
          >
            <StarsIcon size="large" sx={{ pb: 1, paddingLeft: 2 }} />
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              href="#"
              sx={{ paddingLeft: 1 }}
            >
              ด้านต่อยอดความรู้
            </Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
                ml: "auto",
              }}
            >
              <Rating
                name="hover-feedback"
                value={benefit}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setBenefit(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover2(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {benefit !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover2 !== -1 ? hover2 : benefit]}
                </Box>
              )}
            </Box>
          </Card>

          <CardContent style={{ backgroundColor: "#F2F2F2" }}>
            <Typography sx={{ pt: 2 }}>
              A job description is a useful, plain-language tool that explains
              the tasks, duties, function and responsibilities of a position. It
              details who performs a specific type of work, how that work is to
              be completed, and the frequency and the purpose of the work as it
              relates to the organization's mission and goals.
            </Typography>
          </CardContent>
          {/* <CircularProgress size={100} sx={{ margin: 2 }} /> */}
        </Card>
      </Box>
    );
  }
  function Card_teaching() {
    return (
      <Box sx={{ my: 1 }}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            border: 0,
          }}
        >
          <Card
            style={{ backgroundColor: "#DCDCDC" }}
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              paddingTop: 0.5,
            }}
          >
            <StarsIcon size="large" sx={{ pb: 1, paddingLeft: 2 }} />
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              href="#"
              sx={{ paddingLeft: 1 }}
            >
              ด้านการสอน
            </Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
                ml: "auto",
              }}
            >
              <Rating
                name="hover-feedback"
                value={teaching}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setTeaching(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover3(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {teaching !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover3 !== -1 ? hover3 : teaching]}
                </Box>
              )}
            </Box>
          </Card>

          <CardContent style={{ backgroundColor: "#F2F2F2" }}>
            <Typography sx={{ pt: 2 }}>
              A job description is a useful, plain-language tool that explains
              the tasks, duties, function and responsibilities of a position. It
              details who performs a specific type of work, how that work is to
              be completed, and the frequency and the purpose of the work as it
              relates to the organization's mission and goals.
            </Typography>
          </CardContent>
          {/* <CircularProgress size={100} sx={{ margin: 2 }} /> */}
        </Card>
      </Box>
    );
  }
  function Card_teacher() {
    return (
      <Box sx={{ my: 1 }}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            border: 0,
          }}
        >
          <Card
            style={{ backgroundColor: "#DCDCDC" }}
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              paddingTop: 0.5,
            }}
          >
            <StarsIcon size="large" sx={{ pb: 1, paddingLeft: 2 }} />
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              href="#"
              sx={{ paddingLeft: 1 }}
            >
              ด้านอาจารย์
            </Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
                ml: "auto",
              }}
            >
              <Rating
                name="hover-feedback"
                value={teacher}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setTeacher(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover4(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {teacher !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover4 !== -1 ? hover4 : teacher]}
                </Box>
              )}
            </Box>
          </Card>

          <CardContent style={{ backgroundColor: "#F2F2F2" }}>
            <Typography sx={{ pt: 2 }}>
              A job description is a useful, plain-language tool that explains
              the tasks, duties, function and responsibilities of a position. It
              details who performs a specific type of work, how that work is to
              be completed, and the frequency and the purpose of the work as it
              relates to the organization's mission and goals.
            </Typography>
          </CardContent>
          {/* <CircularProgress size={100} sx={{ margin: 2 }} /> */}
        </Card>
      </Box>
    );
  }
  function Card_satisfaction() {
    return (
      <Box sx={{ my: 1 }}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            border: 0,
          }}
        >
          <Card
            style={{ backgroundColor: "#DCDCDC" }}
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              paddingTop: 0.5,
            }}
          >
            <StarsIcon size="large" sx={{ pb: 1, paddingLeft: 2 }} />
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              href="#"
              sx={{ paddingLeft: 1 }}
            >
              ด้านความพึงพอใจ
            </Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
                ml: "auto",
              }}
            >
              <Rating
                name="hover-feedback"
                value={satisfaction}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setSatisfaction(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover5(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {satisfaction !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover5 !== -1 ? hover5 : satisfaction]}
                </Box>
              )}
            </Box>
          </Card>

          <CardContent style={{ backgroundColor: "#F2F2F2" }}>
            <Typography sx={{ pt: 2 }}>
              A job description is a useful, plain-language tool that explains
              the tasks, duties, function and responsibilities of a position. It
              details who performs a specific type of work, how that work is to
              be completed, and the frequency and the purpose of the work as it
              relates to the organization's mission and goals.
            </Typography>
          </CardContent>
          {/* <CircularProgress size={100} sx={{ margin: 2 }} /> */}
        </Card>
      </Box>
    );
  }
}
