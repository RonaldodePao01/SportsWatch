// importing useEffect, useRef and useState
import React, { useEffect, useRef, useState } from "react";

// main function
function GetMatches() {
  // making instances of useRef
  const newUsername = useRef("");
  const newPassword = useRef("");
  const oldUsername = useRef("");
  const oldPassword = useRef("");
  const newShort = useRef("");
  const newLong = useRef("");
  const newTeams = useRef("");
  const newDate = useRef("");
  const newTime = useRef("");
  const updatedShort = useRef("");
  const updatedLong = useRef("");
  const updatedTeams = useRef("");
  const updatedDate = useRef("");
  const updatedTime = useRef("");
  // setting state
  const [matches, setMatches] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [favouritePage, setFavouritePage] = useState(false);
  const [favourite, setFavourite] = useState([]);
  let favouriteArr = [];

  // calling the newUser function with the POST operation
  function newUser() {
    // getting the sign up information from the input fields values
    let data = {
      username: newUsername.current.value,
      password: newPassword.current.value,
    };
    // calling the fetch
    fetch("/newUser", {
      // POST operation
      method: "POST",
      // specidying the content type
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // sending alerts for different errors
          if (result.msg === "AccFound") {
            alert("Username unavailable");
          }
          if (result.msg === "noChar") {
            alert("Enter a password when signing up");
          }
          if (result.msg === "gmail") {
            alert("Email needs to end with @gmail.com");
          }
          if (
            result.msg !== "AccFound" &&
            result.msg !== "gmail" &&
            result.msg !== "noChar"
          ) {
            // alert when sign up is successful
            alert("User added, sign in to access your account");
            // nullifying the input fields
            newUsername.current.value = "";
            newPassword.current.value = "";
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  // login function
  function login() {
    let data = {
      username: oldUsername.current.value,
      password: oldPassword.current.value,
    };
    // calling the login endpoint with the POST operation
    fetch("login", {
      // POST method
      method: "POST",
      // specifying the content type
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // alerts that are displayed when errors occur
          if (result.msg === "noMatch") {
            alert("Username or password is incorrect");
          } else if (result.msg === "notFound") {
            alert("Account does not exist");
          } else {
            // setting the loggedIn state to be true
            setLoggedIn(true);
            // setting local storage
            localStorage.setItem("token", JSON.stringify(result.token));
            localStorage.setItem("username", JSON.stringify(result.user));
            localStorage.setItem("admin", JSON.stringify(result.admin));

            if (localStorage.hasOwnProperty("username")) {
              // getting the token from localStorage
              let token = JSON.parse(localStorage.getItem("token"));
              // calling the allMatches endpoint
              fetch("allMatches", {
                //   specifying the headers for the request containing the token and content type
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((result) => {
                  // setting the matches state to the result of allMatches
                  setMatches(result);
                });
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  // function to log a user out
  function handleLogOut() {
    // setting loggedIn state
    setLoggedIn(false);
    // setting favouritePage state to false
    setFavouritePage(false);
    // clearing local storage
    localStorage.clear();
  }

  // function to add a fixture to to the "favourites" tab
  function handleFavourite(e) {
    favouriteArr.push(matches[e.target.parentElement.id]);
    setFavourite((favourite) => [...favourite, ...favouriteArr]);
  }
  // function to remove a fixture from the "favourites" tab
  function removeFavourite(e) {
    let favArr = favourite;
    // splicing the favourite from the favArr
    favArr.splice(e.target.parentElement.id, 1);
    // setting the favourite state
    setFavourite([...favArr]);
  }

  // useEffect on the favourite state so the page will refresh when the state changes
  useEffect(() => {
    setFavourite(favourite);
  }, [favourite]);

  // function to change tabs to switch between home and favourites
  function showFavourites() {
    // setting the state of favouritesPage and LoggedIn to the opposite of what their current value is
    setFavouritePage(!favouritePage);
    setLoggedIn(!loggedIn);
  }

  // function to add an event/fixture
  function addEvent() {
    // saving the data from the input fields as an object to send over to the endpoint
    let data = {
      short: newShort.current.value,
      teams: newTeams.current.value,
      long: newLong.current.value,
      date: newDate.current.value,
      time: newTime.current.value,
    };
    // if statement to check if all inputs have values
    if (
      newShort.current.value !== "" &&
      newTeams.current.value !== "" &&
      newLong.current.value !== "" &&
      newDate.current.value !== "" &&
      newTime.current.value !== ""
    ) {
      // calling the newMatch endpoint
      fetch("newMatch", {
        // POST method
        method: "POST",
        // specifying the content type
        headers: {
          "Content-type": "application/json",
        },
        // sending over the object through the body
        body: JSON.stringify(data),
      }).then((res) => res.json());
    } else {
      alert("All input fields must be filled in");
    }
  }

  // function to update information about a fixture
  function handleUpdate(e) {
    // saving the input fields values as an object
    let data = {
      _id: matches[e.target.parentElement.id]._id,
      newShort: updatedShort.current.value,
      newTeams: updatedTeams.current.value,
      newLong: updatedLong.current.value,
      newDate: updatedDate.current.value,
      newTime: updatedTime.current.value,
    };
    // getting the token from localStorage
    let token = JSON.parse(localStorage.getItem("token"));
    if (
      newShort.current.value !== "" &&
      newTeams.current.value !== "" &&
      newLong.current.value !== "" &&
      newDate.current.value !== "" &&
      newTime.current.value !== ""
    ) {
      // calling the updateMatch endpoint
      fetch("updateMatch", {
        // PUT method
        method: "PUT",
        //   specifying the headers for the request containing the token and content type
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        // sending over the data through the body
        body: JSON.stringify(data),
      }).then((res) => res.json());
    }
    alert("All input fields must be filled in");
  }

  // function to delete a fixture
  function handleDelete(e) {
    // saving the fixtures id as an object
    let data = {
      _id: matches[e.target.parentElement.id]._id,
    };
    // getting the token from localStorage
    let token = JSON.parse(localStorage.getItem("token"));
    // calling the fetch endpoint
    fetch("deleteMatch", {
      // DELETE method
      method: "DELETE",
      //   specifying the headers for the request containing the token and content type
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      // sending over the data through the body
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  // Conditional rendering for the favourites page
  if (favouritePage && !loggedIn) {
    return (
      <div>
        <div className="nav">
          <div>
            <h4 className="name">SportsWatch</h4>
          </div>

          <div>
            {/* log out button with the handleLogOut function */}
            <button className="logout-btn" onClick={handleLogOut}>
              Log out
            </button>
          </div>
        </div>
        <ul>
          <div className="spacing"></div>
          {/* home button with the showFavourites function*/}
          <button className="favourites" onClick={showFavourites}>
            Home
          </button>
          <h1 className="fav-heading">Favourites</h1>
          {/* mapping through the favourite state to get all favourited fixtures */}
          {favourite.map((item, index) => {
            return (
              <div key={index} className="match-card">
                <li id={index}>
                  <h3>{item.short}</h3>
                  <h2>{item.teams}</h2>
                  <h4>{item.long}</h4>
                  <div className="space">
                    <h3 className="date">{item.date}</h3>
                    <h3 className="date"> {item.time}</h3>
                  </div>
                  {/* remove from favourites button calling the removeFavourite function*/}
                  <button onClick={removeFavourite}>
                    Remove from favourites
                  </button>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
  //conditional rendering for the admin page
  if (JSON.parse(localStorage.getItem("admin")) && loggedIn) {
    return (
      <div>
        <div className="nav">
          <div>
            <h4 className="name">SportsWatch</h4>
          </div>
          <h4 className="admin">Admin</h4>
          <div>
            {/* log out button with handleLogOut function */}
            <button className="logout-btn admin-logout" onClick={handleLogOut}>
              Log out
            </button>
          </div>
        </div>
        <div className="admin-spacing"></div>
        <h1 className="welcome-back">Welcome back</h1>

        <div className="add-event">
          <h1>Add new event</h1>
          <input ref={newShort} placeholder="short"></input>
          <input ref={newTeams} placeholder="teams"></input>
          <div></div>
          <textarea
            ref={newLong}
            className="long-input"
            placeholder="long"
          ></textarea>
          <div></div>
          <input ref={newDate} placeholder="date"></input>
          <input ref={newTime} placeholder="time"></input>
          <div>
            {/* add event with addEvent function attached */}
            <button onClick={addEvent}>Submit</button>
          </div>
        </div>

        <ul>
          {/* mapping through the matches state to display all of the fixtures */}
          {matches.map((item, index) => {
            return (
              <div key={index} className="match-card">
                <li id={index}>
                  <input ref={updatedShort} defaultValue={item.short}></input>
                  <input ref={updatedTeams} defaultValue={item.teams}></input>
                  <textarea
                    ref={updatedLong}
                    className="long-input"
                    defaultValue={item.long}
                  ></textarea>
                  <div>
                    <input ref={updatedDate} defaultValue={item.date}></input>
                    <input ref={updatedTime} defaultValue={item.time}></input>
                  </div>
                  {/* update button with handleUpdate function */}
                  <button className="pad" onClick={handleUpdate}>
                    Update
                  </button>
                  {/* delete button with handleDelete function */}
                  <button className="pad" onClick={handleDelete}>
                    Delete
                  </button>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }

  //conditional rendering for the home page
  if (loggedIn) {
    // getting the username from localStorage
    let user = JSON.parse(
      localStorage.getItem("username").split("@gmail.com").join("")
    );
    return (
      <div>
        <div className="nav">
          <div>
            <h4 className="name">SportsWatch</h4>
          </div>
          <div>
            <div>
              <h5>{user}</h5>
            </div>
            {/* log out button with handleLogOut function */}
            <button className="logout-btn" onClick={handleLogOut}>
              Log out
            </button>
          </div>
        </div>
        <div className="spacing"></div>
        {/* favourites button with showFavourites function */}
        <button className="favourites" onClick={showFavourites}>
          Favourites
        </button>
        <h1 className="welcome-back">Welcome back, {user}</h1>

        <ul>
          {/* mapping through the matches state to display all the fixtures */}
          {matches.map((item, index) => {
            return (
              <div key={index} className="match-card">
                <li id={index}>
                  <h3>{item.short}</h3>
                  <h2>{item.teams}</h2>
                  <h4>{item.long}</h4>
                  <div className="space">
                    <h3 className="date">{item.date}</h3>
                    <h3 className="date"> {item.time}</h3>
                  </div>
                  {/* add to favourites button with handleFavourites function */}
                  <button onClick={handleFavourite}>Add to favourites</button>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }

  //conditional rendering for the login page
  if (!favouritePage && !loggedIn) {
    return (
      <div className="flex">
        <div className="login-card">
          <div className="welcome">
            <h1>Welcome to SportsWatch</h1>
          </div>
          <h2>Log in to access your account</h2>
          <input ref={oldUsername} placeholder="Username"></input>
          <input
            type="password"
            ref={oldPassword}
            placeholder="Password"
          ></input>
          <div>
            {/* log in button with login function */}
            <button onClick={login}>Log in</button>
          </div>

          <div>
            <h2>Sign up</h2>
            <input ref={newUsername} placeholder="Username"></input>
            <input
              type="password"
              ref={newPassword}
              placeholder="Password"
            ></input>
            <div>
              {/* sign up button with newUser function */}
              <button onClick={newUser}>Sign up</button>
            </div>
          </div>
        </div>
        <div className="lrg-heading">
          <h1>Get the </h1>
          <h1>latest</h1>
          <h1>sporting</h1>
          <h1>fixtures</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Log in to access your account</h1>
        <input ref={oldUsername} placeholder="Username"></input>
        <input ref={oldPassword} placeholder="Password"></input>
        {/* submit button with login function */}
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <h1>Sign up</h1>
        <input ref={newUsername} placeholder="Username"></input>
        <input ref={newPassword} placeholder="Password"></input>
        {/* submit button with newUser function */}
        <button onClick={newUser}>Submit</button>
      </div>
    </div>
  );
}

// exporting the component
export default GetMatches;
