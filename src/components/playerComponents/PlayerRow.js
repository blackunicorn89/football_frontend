import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Fab,
  Avatar,
} from '@mui/material';
import { green } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import DeleteConfirmation from "../shared/components/DeleteConfirmation";

const PlayerRow = (props) => {

  const appState = useSelector((state) => state);
  let img = "http:\\\\localhost:3000\\" + props.image

  if (appState.login.admin) {

    return (

      <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto" }}>
        <CardHeader
          action={
            <>
              <Fab sx={{ bgcolor: green[500], marginRight: 1 }} aria-label="edit" size="small" component={Link} to={"/players/editplayer/" + props.id} >
                <EditIcon />
              </Fab>
              <DeleteConfirmation removeType="player" id={props.id} header={props.player_name} title="Haluatko varmasti poistaa seuraavan pelaajan?" token={appState.login.token} />
            </>
          }
          title={props.player_name}
        />
        <CardContent>
          <Avatar src={img} alt={props.player_name} variant="square" sx={{ width: 70, height: 70, marginBottom: 3 }}></Avatar>
          <Typography variant="h4" component="pre">
            {props.player_number}
          </Typography>
          <Typography variant="body1" component="pre">
            {props.position}
          </Typography>
          <Typography variant="body1" component="pre" sx={{ marginTop: 3 }} >
            Pisteet: {props.points}
          </Typography>
          <Typography variant="body1" component="pre" sx={{ marginTop: 3 }} >
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    )
  } else {
    return (
      <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto" }}>
        <CardHeader
          title={props.player_name}
        />
        <CardContent>
          <Avatar src={img} alt={props.player_name} variant="square" sx={{ width: 70, height: 70, marginBottom: 3 }}></Avatar>
          <Typography variant="h4" component="pre">
            {props.player_number}
          </Typography>
          <Typography variant="body1" component="pre">
            {props.position}
          </Typography>
          <Typography variant="body1" component="pre" sx={{ marginTop: 3 }} >
            Pisteet: {props.points}
          </Typography>
          <Typography variant="body1" component="pre" sx={{ marginTop: 3 }} >
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    )
  }
};
export default PlayerRow;