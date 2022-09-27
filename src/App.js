import React, { Component } from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Nation from "./Nation";
import League from "./League";
import Club from "./Club";
import SimpleCard from "./SimpleCard";
import PlayerCard from "./PlayerCard";
import Typography from "@mui/material/Typography";
import { BronzeCommon, BronzeRare, SilverCommon, SilverRare, GoldCommon, GoldRare } from "./CardBackgrounds";

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
      clubsCount: [],
      mostExpensiveTradeablePlayer: "",
      mostExpensiveUntradeablePlayer: "",
      mostExpensiveLoanPlayer: "",
    };

    this.expandNation = this.expandNation.bind(this);


    axios.post(process.env.REACT_APP_AJAXSERVER + "getOwnedPlayers.php").then((response) => {
      // manipulate the response here
      let players = response.data;
      console.log(players);
      let nationsCount = [];
      let leaguesCount = [];
      let clubsCount = [];
      this.setState({ players: players });
      let mostExpensiveTradeablePlayer = "";
      let mostExpensiveLoanPlayer = "";
      let mostExpensiveUntradeablePlayer = "";
      players.forEach((player) => {
        if (mostExpensiveTradeablePlayer === "") {
          mostExpensiveTradeablePlayer = player;
          mostExpensiveLoanPlayer = player;
          mostExpensiveUntradeablePlayer = player;
        } else {
          let current_price = parseInt(player.console_price);
          if (
            player.loaned === "1" &&
            current_price > parseInt(mostExpensiveLoanPlayer.console_price)
          ) {
            mostExpensiveLoanPlayer = player;
          }

          if (
            player.untradeable === "1" &&
            player.loaned === "0" &&
            current_price >
              parseInt(mostExpensiveUntradeablePlayer.console_price)
          ) {
            mostExpensiveUntradeablePlayer = player;
          }

          if (
            player.untradeable === "0" &&
            current_price > parseInt(mostExpensiveTradeablePlayer.console_price)
          ) {
            mostExpensiveTradeablePlayer = player;
          }
        }

        if (player.rating < 65) {
          if (player.rareflag === 0) {
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
          if (player.rareflag === 0) {
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
          if (player.rareflag === 0) {
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

        // if club id already exists in array, increment count
        if (clubsCount[player.teamId]) {
          clubsCount[player.teamId] += 1;
        } else {
          // else create new object with club id and count
          clubsCount[player.teamId] = 1;
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

      // go through each club and add it to a new array
      let clubs = [];
      for (let club in clubsCount) {
        clubs.push({
          teamId: club,
          count: clubsCount[club],
        });
      }
      // sort array by count
      clubs.sort((a, b) => b.count - a.count);
      this.setState({ clubsCount: clubs });

      this.setState({
        mostExpensiveTradeablePlayer: mostExpensiveTradeablePlayer,
        mostExpensiveUntradeablePlayer: mostExpensiveUntradeablePlayer,
        mostExpensiveLoanPlayer: mostExpensiveLoanPlayer,
      });
    });
  }

  expandNation(){
    console.log('Click happened');
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
        <div id="top"></div>
        <div id="bottom"></div>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant="h1" gutterBottom>
            FUTCoder's
            <br />
            Club
          </Typography>

          <Typography variant="h2" gutterBottom>
            {this.state.players.length} Players
          </Typography>

          <Typography variant="h2" gutterBottom>
          {this.state.nationsCount.length} Countries
          </Typography>

          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Grid container>
                {this.state.nationsCount.map((nation) => (
                  <Grid item xs={1}>
                    <Nation onClick={this.expandNation} nationId={nation.nationId} count={nation.count} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Typography variant="h2" gutterBottom>
            {this.state.leaguesCount.length} Leagues
          </Typography>

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

          <Typography variant="h2" gutterBottom>
            {this.state.clubsCount.length} Clubs
          </Typography>

          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Grid container>
                {this.state.clubsCount.map((club) => (
                  <Grid item xs={1}>
                    <Club teamId={club.teamId} count={club.count} />
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

          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Most expensive tradeable player
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <PlayerCard player={this.state.mostExpensiveTradeablePlayer} />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Most expensive untradeable player
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <PlayerCard player={this.state.mostExpensiveUntradeablePlayer} />
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Most expensive loan player
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <PlayerCard player={this.state.mostExpensiveLoanPlayer} />
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}
export default App;
