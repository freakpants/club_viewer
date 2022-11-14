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
import $ from "jquery";
import {
  BronzeCommon,
  BronzeRare,
  SilverCommon,
  SilverRare,
  GoldCommon,
  GoldRare,
} from "./CardBackgrounds";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
      singleCountryView: false,
      singleCountryId: 0,
      singleCountryPlayers: [],
      users: [],
      selectedUserId: 0,
      selectedUserName: "",
      tradeablePlayersByValue: [],
      countryListExpanded: false,
      leagueListExpanded: false,
      clubListExpanded: false,
      rarities: [],
      wcPlayers: [],
    };

    this.expandNation = this.expandNation.bind(this);
    this.multiCountryView = this.multiCountryView.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.getPlayersForUser = this.getPlayersForUser.bind(this);
    this.toggleCountryList = this.toggleCountryList.bind(this);
    this.toggleLeagueList = this.toggleLeagueList.bind(this);
    this.toggleClubList = this.toggleClubList.bind(this);
  }

  toggleClubList() {
    this.setState({ clubListExpanded: !this.state.clubListExpanded });
  }

  toggleLeagueList() {
    this.setState({ leagueListExpanded: !this.state.leagueListExpanded });
  }

  toggleCountryList() {
    this.setState({ countryListExpanded: !this.state.countryListExpanded });
  }

  handleUserChange(event) {
    // console.log("setting user to: ");
    // console.log(event.target.value);
    this.setState({ selectedUserId: event.target.value }, () => {
      // set the username base on the id
      let selectedUserName = this.state.users.filter(
        (user) => user.id === this.state.selectedUserId
      )[0].name;
      this.setState({ selectedUserName: selectedUserName });
      this.getPlayersForUser();
    });
  }

  componentDidMount() {
    // get list of users
    axios
      .get(process.env.REACT_APP_AJAXSERVER + "getUsers.php")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    // get rarities
    axios
      .get(process.env.REACT_APP_AJAXSERVER + "getRarities.php")
      .then((response) => {
        console.log(response.data);
        this.setState({ rarities: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    // get wc players
    axios
      .get(process.env.REACT_APP_AJAXSERVER + "getWcPlayers.php")
      .then((response) => {
        console.log(response.data);
        this.setState({ wcPlayers: response.data });
      });
  }

  getPlayersForUser() {
    // console.log("getting players for user: " + this.state.selectedUserId);
    axios
      .post(
        process.env.REACT_APP_AJAXSERVER +
          "getOwnedPlayers.php" +
          "?user_id=" +
          this.state.selectedUserId
      )
      .then((response) => {
        // manipulate the response here
        let players = response.data;
        // console.log(players);
        let nationsCount = [];
        let leaguesCount = [];
        let clubsCount = [];
        this.setState({ players: players });
        let mostExpensiveTradeablePlayer = "";
        let mostExpensiveLoanPlayer = "";
        let mostExpensiveUntradeablePlayer = "";
        players.forEach((player) => {
          // console.log(player);
          if (mostExpensiveTradeablePlayer === "") {
            // setting fake 0 coins player
            const fakePlayer = {
              name: "Fake",
              console_price: 0,
            };

            mostExpensiveTradeablePlayer = fakePlayer;
            mostExpensiveLoanPlayer = fakePlayer;
            mostExpensiveUntradeablePlayer = fakePlayer;
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
              current_price >
                parseInt(mostExpensiveTradeablePlayer.console_price)
            ) {
              mostExpensiveTradeablePlayer = player;
            }
          }

          if (player.rating < 65) {
            if (player.rareflag === "0") {
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
            if (player.rareflag === "0") {
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
            if (player.rareflag === "0") {
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

        console.log(players);

        this.setState({ tradeablePlayersByValue: players });

        this.setState({
          mostExpensiveTradeablePlayer: mostExpensiveTradeablePlayer,
          mostExpensiveUntradeablePlayer: mostExpensiveUntradeablePlayer,
          mostExpensiveLoanPlayer: mostExpensiveLoanPlayer,
        });
      });
  }

  multiCountryView() {
    this.setState({ singleCountryView: false, countryListExpanded: true });
  }

  expandNation(nationId) {
    // console.log("Click happened");
    // set singleCountryView in state to true
    this.setState({
      singleCountryView: true,
      singleCountryId: nationId,
      countryListExpanded: false,
    });
    // filter players array to only include players from that nation
    let singleCountryPlayers = this.state.players.filter(
      (player) => player.nationId === nationId
    );
    // order players by rating
    singleCountryPlayers.sort((a, b) => b.rating - a.rating);

    // set singleCountryPlayers in state to filtered array
    this.setState({ singleCountryPlayers: singleCountryPlayers });
  }

  render() {
    const theme = createTheme({
      typography: {
        fontFamily: "Matroska",
        fontSize: 12,
      },
    });

    /* 
          <FormGroup>
  <FormControlLabel control={<Checkbox />} label="Untradeable" />
</FormGroup> */

    let tradeablePlayersByValue = this.state.players.filter(
      (player) => player.untradeable === "0"
    );
    tradeablePlayersByValue.sort((a, b) => b.console_price - a.console_price);

    let untradeablePlayersByValue = this.state.players.filter(
      (player) => player.untradeable === "1" && player.loaned === "0"
    );
    untradeablePlayersByValue.sort((a, b) => b.console_price - a.console_price);

    let loanedPlayersByValue = this.state.players.filter(
      (player) => player.loaned === "1"
    );
    loanedPlayersByValue.sort((a, b) => b.console_price - a.console_price);

    // filter untradeable players by rareflag
    untradeablePlayersByValue = untradeablePlayersByValue.filter(
      (player) => player.rareflag === "128"
    );

    let singleCountryWcPlayers = this.state.wcPlayers.filter(
      (player) => player.nationId === this.state.singleCountryId
    );

    // check if the players in singleCountryWcPLayers are in the players array
    singleCountryWcPlayers.forEach((wcPlayer) => {
      let player = this.state.players.find(
        (player) => player.definitionId === wcPlayer.definitionId
      );
      if (player) {
        wcPlayer.exists = true;
      }
    });

    return (
      <ThemeProvider theme={theme}>
        <div id="top"></div>
        <div id="bottom"></div>

        {this.state.users.length > 0 && (
          <Box sx={{ width: "100vw", textAlign: "center" }}>
            <FormControl
              variant="outlined"
              style={{ zIndex: 2, width: "300px", marginTop: "20px" }}
            >
              <InputLabel id="user-select-label">User</InputLabel>
              <Select
                defaultValue=""
                labelId="user-select-label"
                id="user-select"
                value={this.state.selectedUser}
                onChange={this.handleUserChange}
                label="Club"
              >
                {this.state.users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {this.state.selectedUserId !== 0 && (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography variant="h1" gutterBottom>
              {this.state.selectedUserName}'s
              <br />
              Club
            </Typography>

            <Typography variant="h2" gutterBottom>
              {this.state.players.length} Players
            </Typography>

            <Typography
              variant="h2"
              gutterBottom
              onClick={this.toggleCountryList}
            >
              {this.state.nationsCount.length} Countries
            </Typography>

            {this.state.countryListExpanded && (
              <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                  <Grid container>
                    {this.state.nationsCount.map((nation) => (
                      <Grid key={nation.nationId} item xs={1}>
                        <Nation
                          onClick={this.expandNation}
                          nationId={nation.nationId}
                          count={nation.count}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            )}

            {this.state.singleCountryView && (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Nation
                  onClick={this.multiCountryView}
                  nationId={this.state.singleCountryId}
                />
              </Box>
            )}
            {this.state.singleCountryView && (
              <div className={"cardContainer"}>
                {singleCountryWcPlayers.map((player) => {
                  return player.exists ? (

                      <PlayerCard
                      key={player.definitionId}
                        badge={true}
                        small={true}
                        player={player}
                        rarities={this.state.rarities}
                        style={{
                          transform: "scale(.4)",
                          width: "160px",
                          height: "145px",
                          marginBottom: "28.8px",
                          WebkitTransformOriginX: "left",
                          WebkitTransformOriginY: "top",
                        }}
                      />
                  ) : (
                    <div
                      key={player.definitionId}
                      className={"card__wrapper"}
                      style={{
                        transform: "scale(.4)",
                        width: "160px",
                        height: "145px",
                        marginBottom: "28.8px",
                        WebkitTransformOriginX: "left",
                        WebkitTransformOriginY: "top",
                      }}
                    >
                        <div className={"card__wrapper__item placeholder"}>
                          <img
                            classNAme={"card__wrapper__item__bg"}
                            src={
                              "https://freakpants.ch/fut/php/cards/placeholder.png"
                            }
                          />

                          <div class="card__wrapper__item__ratings">
                            <span class="card__wrapper__item__ratings__position">
                              {player.mainPosition}
                            </span>
                          </div>
                          <div className={"card__wrapper__item__name"}>
                            {player.knownAs !== "" && player.knownAs !== "---"
                              ? player.knownAs
                              : player.lastName}
                          </div>
                        </div>
                      </div>
                  );
                })}
              </div>
            )}
            <Typography
              variant="h2"
              gutterBottom
              onClick={this.toggleLeagueList}
            >
              {this.state.leaguesCount.length} Leagues
            </Typography>

            {this.state.leagueListExpanded && (
              <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                  <Grid container>
                    {this.state.leaguesCount.map((league) => (
                      <Grid key={league.leagueId} item xs={1}>
                        <League
                          leagueId={league.leagueId}
                          count={league.count}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            )}

            <Typography variant="h2" gutterBottom onClick={this.toggleClubList}>
              {this.state.clubsCount.length} Clubs
            </Typography>

            {this.state.clubListExpanded && (
              <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                  <Grid container>
                    {this.state.clubsCount.map((club) => (
                      <Grid key={club.teamId} item xs={1}>
                        <Club teamId={club.teamId} count={club.count} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            )}

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
                Tradeable players by value
              </Typography>
            </Box>

            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              {tradeablePlayersByValue.map((player) => (
                <Grid key={player.definitionId} item xs={2}>
                  <PlayerCard player={player} rarities={this.state.rarities} />
                </Grid>
              ))}
            </Grid>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            ></Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h4" gutterBottom>
                Untradeable players by value
              </Typography>
            </Box>

            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              {untradeablePlayersByValue.map((player) => (
                <Grid key={player.definitionId} item xs={2}>
                  <PlayerCard player={player} rarities={this.state.rarities} />
                </Grid>
              ))}
            </Grid>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            ></Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h4" gutterBottom>
                Loans by value
              </Typography>
            </Box>

            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              {loanedPlayersByValue.map((player) => (
                <Grid key={player.definitionId} item xs={2}>
                  <PlayerCard player={player} rarities={this.state.rarities} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </ThemeProvider>
    );
  }
}
export default App;
