import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import { removePlayer } from "../../actions/PlayerActions";


const SeasonGamePlayerRow = (props) => {

  const dispatch = useDispatch();
  const appState = useSelector((state) => state);

  
  
  return (
    <>
    <FormControlLabel  control={<Checkbox name="players" size="small" value={props.players} onChange={props.onChange} />} label={props.players}  /> 
    <br />
    </>
  )
};

export default SeasonGamePlayerRow;