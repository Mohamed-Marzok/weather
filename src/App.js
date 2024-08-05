import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { blue, indigo } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./weatherSlice";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
  palette: {
    primary: blue,
    secondary: indigo,
  },
});

function App() {
  const isLoading = useSelector((state) => state.weather.isLoading);
  const weather = useSelector((state) => state.weather.weather);
  console.log(weather);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeather());
  }, []);
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState("");
  // const [weather, setTempForm] = useState({
  //   temp: null,
  //   tempMin: null,
  //   tempMax: null,
  //   description: "",
  //   icon: "",
  // });
  let [lang, setLang] = useState("en");
  const handelLanguage = function () {
    if (lang === "ar") {
      i18n.changeLanguage("en");
      setLang("en");
      moment.locale("en");
    } else {
      i18n.changeLanguage("ar");
      setLang("ar");
      moment.locale("ar");
    }
  };
  useEffect(() => {
    setDate(moment().format("Do  MMMM  YYYY h:mm a"));
  }, [lang]);
  // useEffect(() => {
  //   let cancelAxios = null;
  //   axios
  //     .get(
  //       "https://api.openweathermap.org/data/2.5/weather?lat=30.7327&lon=31.7195&appid=bf4607506d31251ba45192322f6cb9b5",
  //       {
  //         cancelToken: new axios.CancelToken((c) => {
  //           cancelAxios = c;
  //         }),
  //       }
  //     )
  //     .then(function (response) {
  //       console.log(response);
  //       setTempForm({
  //         ...weather,
  //         temp: Math.round(response.data.main.temp - 273),
  //         tempMin: Math.round(response.data.main.temp_min - 273),
  //         tempMax: Math.round(response.data.main.temp_max - 273),
  //         icon: response.data.weather[0].icon,
  //         description: response.data.weather[0].description,
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return () => {
  //     cancelAxios();
  //   };
  // }, []);
  return (
    <div className={"App"}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{ marginTop: "200px" }}>
          <Card
            dir={lang === "ar" ? "rtl" : "ltr"}
            sx={{
              minWidth: 275,
              borderRadius: "10px",
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid>
                  <Typography
                    sx={{
                      fontSize: "50px",
                      fontWeight: "500",
                    }}
                    color={"primary.main"}
                  >
                    {t("Zagazig")}
                  </Typography>
                </Grid>
                <Grid sx={{ alignSelf: "end" }}>
                  <Typography color={"primary.light"}>{date} </Typography>
                </Grid>
              </Grid>
              <Divider />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid container spacing={2} style={{ flexGrow: "1" }}>
                  <Grid>
                    {isLoading ? (
                      <CircularProgress sx={{ marginTop: "25px" }} />
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "80px",
                          fontWeight: "600",
                        }}
                        color={"secondary"}
                      >
                        {weather.temp}
                      </Typography>
                    )}
                  </Grid>
                  <Grid sx={{ alignSelf: "end" }}>
                    <img
                      style={{ width: "100px" }}
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "400",
                      }}
                      color={"secondary.light"}
                    >
                      {t(weather.description)}
                    </Typography>
                  </Grid>
                  <Grid xs={12}>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                    >
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "400",
                          padding: "5px",
                        }}
                        color={"secondary.dark"}
                      >
                        {t("min")}:<span> {weather.tempMin}</span>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          padding: "5px",
                          fontWeight: "400",
                        }}
                        color={"primary.dark"}
                      >
                        {t("max")}:<span>{weather.tempMax}</span>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>

                <div style={{ alignSelf: "center" }}>
                  <img
                    style={{ width: "100px" }}
                    src="https://cdn.pixabay.com/photo/2024/02/05/03/10/sun-8553511_1280.jpg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Button
            variant="text"
            sx={{ float: lang === "ar" ? "left" : "right", marginTop: "5px" }}
            onClick={handelLanguage}
          >
            {lang === "en" ? "Arabic" : "انجليزي"}
          </Button>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
