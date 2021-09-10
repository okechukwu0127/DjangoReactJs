import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import HomeIcon from "@material-ui/icons/Home";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";


import {
  
  Link,
} from "react-router-dom";

export default class ListNotePage extends Component {
  constructor(props) {
    super(props);

    this.state = { allNotes: null };
  }
  componentDidMount() {
    this.handleNotedpadAllRecord();
  }

  handleNotedpadAllRecord = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    console.log(this.state);

    fetch("/api/home", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ allNotes: data }));
  };

  render() {
    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
      root: {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);

    //const classes = useStyles();
    const bull = (
      <span
        style={{
          display: "inline-block",
          margin: "0 2px",
          transform: "scale(0.8)",
        }}
      >
        •
      </span>
    );

    return (
      <div
        style={{
         
          width: "100%",

          /* justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          border: "1px solid red",
          width: "100%", */
        }}
      >
        <div style={{ marginLeft: "9.1%",  marginTop: 50 }}>
          <BottomNavigation
            //value={value}
            onChange={(event, newValue) => {
              // setValue(newValue);
            }}
            showLabels
            style={{ width: 500 }}
          >
            <BottomNavigationAction href="/" label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction
              href="/add-note"
              label="Add Note"
              icon={<PersonAddIcon />}
            />
            <BottomNavigationAction label="Exit" icon={<LockOpenIcon />} />
          </BottomNavigation>
        </div>

        <Card
          style={{
            maxWidth: 775,
            // alignSelf: "center",
            // marginLeft: "25%",
            marginTop: 30,
          }}
        >
          <CardContent>
            <div style={{ alignSelf: "center" }}>
              <h3>LIST NOTEPAD </h3>
            </div>
            <hr style={{ border: "0.5px solid #ccc" }} />

            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">ID#</StyledTableCell>
                    <StyledTableCell align="left">Title</StyledTableCell>
                    <StyledTableCell align="left">Owner</StyledTableCell>

                    <StyledTableCell align="left">Created Date</StyledTableCell>
                    <StyledTableCell align="left"> </StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {this.state.allNotes &&
                    this.state.allNotes.map((row) => {
                      return (
                        <StyledTableRow key={row.note_id}>
                          <StyledTableCell component="th" scope="row">
                            {row.note_id}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.title}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.owner}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {new Date(
                              Date.parse(row.created_at)
                            ).toLocaleDateString("zh-Hans-CN", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </StyledTableCell>

                          <StyledTableCell align="left">
                            <Link to={"/edit-note/" + row.note_id}>
                              <IconButton aria-label="share">
                                <EditIcon />
                              </IconButton>
                            </Link>

                            <IconButton aria-label="share">
                              <DeleteSweepIcon />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          <CardActions
            style={{ textAlign: "right", padding: 20 }}
          ></CardActions>
        </Card>
      </div>
    );
  }
}
