import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import DeleteConfirmation from "./DeleteConfirmation";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Fab,
  Avatar,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import { removeSeasonGame } from "../../actions/SeasonGameActions";


const SeasonGameRow = (props) => {

  const dispatch = useDispatch();
  const appState = useSelector((state) => state);
  const removeSingleSeasonGame = (id) => {
    dispatch(removeSeasonGame(appState.login.token, id))

  };

  const seasonGames = [props.seasonGames]
  /*let playerList;
  for (let i = 0; i < players.length; i++) {
      playerList = players[i]
  }
  console.log(playerList)

  let img = "http:\\\\localhost:3000\\" + props.image*/

  if (appState.login.admin) {

    return (


      <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto", backgroundColor: "#A60201", color: "#73c6b6" }}>
        <CardHeader
          action={
            <>
              {/*<Fab sx={{ bgcolor: green[500], marginRight: 1 }} aria-label="edit" size="small" component={Link} to={"/seasongames/editSeasonGame/" + props.id} >
                <EditIcon />
          </Fab>*/}
              <DeleteConfirmation id={props.id} game={props.game} token={appState.login.token} />
            </>
          }
          title={props.season} 
        />
        <CardContent>
          <Typography variant="h4" component="pre">
            {props.game}
          </Typography>
          <Typography variant="body1" component="pre">
            {props.finalresult}
          </Typography>
          <Typography variant="h5" component="pre" sx={{ marginTop: 3 }} >
            Pelaajat:
          </Typography>
          <Typography variant="body1" component="pre" sx={{ marginTop: 3 }} >
            {props.players}
          </Typography>
          <Typography variant="h5" component="pre" sx={{ marginTop: 3 }} >
            Maalintekijät:
          </Typography>
          <Typography variant="body1" component="pre" sx={{ marginTop: 3 }} >
            {props.goalmakers}
          </Typography>
          <Typography variant="body1" component="pre" sx={{ marginTop: 3 }} >
            Lisätietoa pelistä: {props.description}
          </Typography>
        </CardContent>
      </Card>
    )
  } else {
    return (
      <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto", backgroundColor: "#A60201", color: "#73c6b6" }}>
        <CardHeader
          title={props.season}
        />
        <CardContent>
          <Typography variant="h4" component="pre">

          </Typography>
          <Typography variant="body1" component="pre">
            {props.finalresult}
          </Typography>
          <Typography variant="body1" component="pre" sx={{ marginTop: 3 }} >
            {props.players}
          </Typography>
        </CardContent>
      </Card>
    )
  }
};

export default SeasonGameRow;