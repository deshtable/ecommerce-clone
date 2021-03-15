class CreateAccount extends React.Component {
  constructor() {
    super();
    this.state = { firstName: "", lastName: "", email: "", password: "" };
    this.postData = postData.bind(this, "/createAccount");
  }
  setFirstName = (event) => {
    this.setState({ firstName: event.target.value });
  };
  setLastName = (event) => {
    this.setState({ lastName: event.target.value });
  };

  setEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  setPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div>
        <label>First Name</label>
        <input
          value={this.state.firstName}
          onChange={this.setFirstName}
          name="First Name"
          id="firstName"
          type="text"
          style={{ display: "block" }}
        ></input>
        <label>Last Name</label>
        <input
          value={this.state.lastName}
          onChange={this.setLastName}
          name="Last Name"
          id="lastName"
          type="text"
          style={{ display: "block" }}
        ></input>
        <label>Email</label>
        <input
          value={this.state.email}
          onChange={this.setEmail}
          name="email"
          id="email"
          type="text"
          style={{ display: "block" }}
        ></input>

        <label>Password</label>
        <input
          value={this.state.password}
          onChange={this.setPassword}
          name="password"
          id="password"
          type="text"
          style={{ display: "block" }}
        ></input>
        <button onClick={this.postData.bind(this, this.state, false)}>
          Create!
        </button>
        <a href="/login">To Login</a>
      </div>
    );
  }
}

function Root(props) {
  return <div className="container-fluid ">{props.children}</div>;
}

ReactDOM.render(
  <Root>
    <CreateAccount />
  </Root>,
  document.getElementById("root")
);
async function postData(url = "", data = {}, getResponse = true) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  try {
    const res = await response.json();
    if (res.alreadyExists) {
      window.alert("Failed!");
    } else {
      window.alert("Success!");
    }
  } catch (err) {
    // console.log("Error");
  }
}
