import React, { Component } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import BronzeCommon from "./cards/cards_bg_e_1_0_1.png";
import BronzeRare from "./cards/cards_bg_e_1_1_1.png";
import SilverCommon from "./cards/cards_bg_e_1_0_2.png";
import SilverRare from "./cards/cards_bg_e_1_1_2.png";
import GoldCommon from "./cards/cards_bg_e_1_0_3.png";
import GoldRare from "./cards/cards_bg_e_1_1_3.png";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

/* https://cdn.futbin.com/content/fifa23/img/nation/38.png */
const Nation = (props) => {
  let imageLink =
    "https://cdn.futbin.com/content/fifa23/img/nation/" +
    props.nationId +
    ".png";
  return (
    <Card elevation={0} style={{ width: "70px", height: "90px" }}>
      <div style={{ position: "relative" }}>
        <CardMedia
          style={{ width: "70px" }}
          component="img"
          image={imageLink}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50px",
            left: "0px",
          }}
        >
          <Typography
            style={{
              color: "black",
              fontFamily: "UltimateTeamCondensed",
              fontSize: "2rem",
              fontWeight: 700,
            }}
            variant="h6"
            component="div"
            gutterBottom
          >
            {props.count}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

const League = (props) => {
  let imageLink =
    "https://cdn.futbin.com/content/fifa23/img/league/" +
    props.leagueId +
    ".png";
  return (
    <Card elevation={0} style={{ width: "70px", height: "110px", background: "black", marginBottom: "10px" }}>
      <div style={{ position: "relative" }}>
        <CardMedia
          style={{ width: "70px" }}
          component="img"
          image={imageLink}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "60px",
            left: "0px",
          }}
        >
          <Typography
            style={{
              color: "white",
              fontFamily: "UltimateTeamCondensed",
              fontSize: "2rem",
              fontWeight: 700,
            }}
            variant="h6"
            component="div"
            gutterBottom
          >
            {props.count}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

const SimpleCard = (props) => {
  return (
    <Card elevation={0} style={{ width: "175px" }}>
      <div style={{ position: "relative" }}>
        <CardMedia
          style={{ width: "175px" }}
          component="img"
          image={props.cardType}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "60px",
            left: "0px",
          }}
        >
          <Typography
            style={{
              color: props.textColor,
              fontFamily: "UltimateTeamCondensed",
              fontSize: "4rem",
              fontWeight: 700,
            }}
            variant="h6"
            component="div"
            gutterBottom
          >
            {props.cardAmount}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      bronze: 0,
      bronzeCommon: 0,
      bronzeRare: 0,
      silver: 0,
      silverCommon: 0,
      silverRare: 0,
      gold: 0,
      goldCommon: 0,
      goldRare: 0,
      untradeable: 0,
      tradeable: 0,
      nationsCount: [],
      leaguesCount: [],
    };

    axios.post("http://localhost/fut/getOwnedPlayers.php").then((response) => {
      // manipulate the response here
      let players = response.data;
      let nationsCount = [];
      let leaguesCount = [];
      console.log(players);
      this.setState({ players: players });
      players.forEach((player) => {
        if (player.rating < 65) {
          if (player.rareflag == 0) {
            this.setState((prevState) => ({
              bronzeCommon: prevState.bronzeCommon + 1,
            }));
          } else {
            this.setState((prevState) => ({
              bronzeRare: prevState.bronzeRare + 1,
            }));
          }
          this.setState((prevState) => ({
            bronze: prevState.bronze + 1,
          }));
        } else if (player.rating < 75) {
          if (player.rareflag == 0) {
            this.setState((prevState) => ({
              silverCommon: prevState.silverCommon + 1,
            }));
          } else {
            this.setState((prevState) => ({
              silverRare: prevState.silverRare + 1,
            }));
          }
          this.setState((prevState) => ({
            silver: prevState.silver + 1,
          }));
        } else {
          if (player.rareflag == 0) {
            this.setState((prevState) => ({
              goldCommon: prevState.goldCommon + 1,
            }));
          } else {
            this.setState((prevState) => ({
              goldRare: prevState.goldRare + 1,
            }));
          }
          this.setState((prevState) => ({
            gold: prevState.gold + 1,
          }));
        }
        if (player.untradeable === "1") {
          this.setState((prevState) => ({
            untradeable: prevState.untradeable + 1,
          }));
        } else {
          this.setState((prevState) => ({
            tradeable: prevState.tradeable + 1,
          }));
        }
        // if nation id already exists in array, increment count
        if (nationsCount[player.nationId]) {
          nationsCount[player.nationId] += 1;
        } else {
          // else create new object with nation id and count
          nationsCount[player.nationId] = 1;
        }

        // if league id already exists in array, increment count
        if (leaguesCount[player.leagueId]) {
          leaguesCount[player.leagueId] += 1;
        } else {
          // else create new object with league id and count
          leaguesCount[player.leagueId] = 1;
        }

      });

      // go through each nation and add it to a new array
      let nations = [];
      for (let nation in nationsCount) {
        nations.push({
          nationId: nation,
          count: nationsCount[nation],
        });
      }
      // sort array by count
      nations.sort((a, b) => b.count - a.count);
      this.setState({ nationsCount: nations });

      // go through each league and add it to a new array
      let leagues = [];
      for (let league in leaguesCount) {
        leagues.push({
          leagueId: league,
          count: leaguesCount[league],
        });
      }
      // sort array by count
      leagues.sort((a, b) => b.count - a.count);
      this.setState({ leaguesCount: leagues });
    });
  }

  render() {
    const theme = createTheme({
      typography: {
        fontFamily: "Matroska",
        fontSize: 12,
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant="h1" gutterBottom>
            FUTCoder's
            <br />
            Club
          </Typography>

          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Grid container>
                {this.state.nationsCount.map((nation) => (
                  <Grid item xs={1}>
                    <Nation nationId={nation.nationId} count={nation.count} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Grid container>
                {this.state.leaguesCount.map((league) => (
                  <Grid item xs={1}>
                    <League leagueId={league.leagueId} count={league.count} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={BronzeCommon}
                        cardAmount={this.state.bronzeCommon}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={BronzeRare}
                        cardAmount={this.state.bronzeRare}
                      />
                    </Grid>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={BronzeCommon}
                        cardAmount={this.state.bronze}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={SilverCommon}
                        cardAmount={this.state.silverCommon}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={SilverRare}
                        cardAmount={this.state.silverRare}
                      />
                    </Grid>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={SilverCommon}
                        cardAmount={this.state.silver}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={GoldCommon}
                        cardAmount={this.state.goldCommon}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={GoldRare}
                        cardAmount={this.state.goldRare}
                      />
                    </Grid>
                    <Grid item xs={3}></Grid>

                    <Grid item xs={6}>
                      <SimpleCard
                        textColor={"rgb(58,39,23)"}
                        cardType={GoldCommon}
                        cardAmount={this.state.gold}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    );
  }
}
export default App;
