import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
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

import { Link } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import { green, purple } from "@material-ui/core/colors";
import { isEmpty, isArray, isObject, size } from "lodash";
import Alert from "@material-ui/lab/Alert";


export default class AddEditNotePage extends Component {
  constructor(props) {
    super(props);

    this.state = { title: null, content: null, owner: null, EditNotes: null };

    this.NoteId = this.props.match.params.note_id;

    if (this.NoteId) {
      this.handleGetNotepadByNoteId(this.NoteId);
    }
  }

  handleGetNotepadByNoteId = (note_id) => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    console.log(this.state);

    fetch("/api/get-note?note_id=" + note_id, requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ EditNotes: data }));
  };

  handleNotepadButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        owner: this.state.owner,
      }),
    };
    console.log(this.state);

    fetch("/api/add-note", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  handleButtonUpdateNotepadPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        owner: this.state.owner,
      }),
    };
    console.log(this.state);

    fetch("/api/update-note", requestOptions)
      .then((response) => response.json())
      .then((data) =>  this.props.history.push('/edit-note/'+this.NoteId));
  };

  render() {
    //const classes = useStyles();

    let title = null;
    let message = null;
    let owner = null;

    if (isObject(this.state.EditNotes)) {
      title = this.state.EditNotes.title;
      message = this.state.EditNotes.message;
      owner = this.state.EditNotes.owner;
    }

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
          marginLeft: "13.1%",
          /* justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          border: "1px solid red",
          width: "100%", */
        }}
      >
        <div style={{ marginLeft: "-8.1%", marginTop: 50 }}>
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

        {isObject(this.state.EditNotes) ? (
          size(this.state.EditNotes) == 1 ? (
            <Alert
              severity="warning"
              style={{ marginTop: 20 }}
              action={
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button color="inherit" size="small">
                    Cancel
                  </Button>
                </Link>
              }
            >
              NotePad {this.NoteId} does not exist{" "}
            </Alert>
          ) : null
        ) : null}

        <Card
          style={{
            maxWidth: 475,
            display: size(this.state.EditNotes) == 1 ? "none" : "block",

            //alignSelf: "center",
            // marginLeft: "35%",
            marginTop: 30,
          }}
        >
          <CardContent>
            <div style={{ alignSelf: "center" }}>
              <h3>
                {this.NoteId ? "EDIT" : "ADD"} NOTEPAD CONTENT {}{" "}
              </h3>
            </div>
            <hr style={{ border: "0.5px solid #ccc" }} />
            <form noValidate autoComplete="off">
              <TextField
                id="standard-full-width"
                label={"Title"}
                style={{ margin: 8, marginTop: "25px!important", width: "95%" }}
                placeholder="Enter Note Title"
                //helperText="Title of your note"
                helperText={title}
                fullWidth
                variant="outlined"
                //value={title}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(text) => {
                  //alert("::" + text.target.value);
                  this.setState({ title: text.target.value });
                }}
              />

              <TextField
                id="outlined-multiline-static"
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                // defaultValue={message}
                helperText={message}
                style={{ width: 97 + "%", marginTop: 40 }}
                placeholder="Message"
                onChange={(text) =>
                  this.setState({ content: text.target.value })
                }
              />

              <FormControl style={{ width: "97%", marginTop: 20 }}>
                <InputLabel htmlFor="grouped-native-select">Owner</InputLabel>
                <Select
                  native
                  //defaultValue={owner}
                  //helperText={owner}
                  id="grouped-native-select"
                  onChange={(text) =>
                    this.setState({ owner: text.target.value })
                  }
                >
                  <option aria-label="None" value="" />

                  <option value={"Eze"}>Eze</option>
                  <option value={"Godwin"}>Godwin</option>
                  <option value={"Usman"}>Usman</option>
                </Select>
                {isObject(this.state.EditNotes) ? (
                  <FormHelperText>{owner}</FormHelperText>
                ) : null}
              </FormControl>
            </form>
          </CardContent>
          <CardActions style={{ textAlign: "right", padding: 20 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="outlined" size="large" color="secondary">
                Cancel
              </Button>
            </Link>

            {this.NoteId ? (
              <Button
                style={{ backgroundColor: green[500] }}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  this.handleButtonUpdateNotepadPressed();
                }}
                startIcon={<SaveIcon />}
              >
                Update{" "}
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => {
                  this.handleNotepadButtonPressed();
                }}
              >
                Save{" "}
              </Button>
            )}
          </CardActions>
        </Card>
      </div>
    );
  }
}
