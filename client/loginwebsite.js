class Login extends React.Component {
    constructor() {
      super();
      this.state = { username: "", password: "" };
      this.postData = postData.bind(this, "/login");
    }
  
    setUsername = (event) => {
      this.setState({ username: event.target.value });
    };
  
    setPassword = (event) => {
      this.setState({ password: event.target.value });
    };
  
    render() {
      return (
        <div>
          <label>Username</label>
          <input
            value={this.state.username}
            onChange={this.setUsername}
            name="username"
            id="username"
            type="text"
          ></input>
  
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.setPassword}
            name="password"
            id="password"
            type="text"
          ></input>
          <button onClick={this.postData.bind(this, this.state)}>
            Create!!!
          </button>
        </div>
      );
    }
  }
  
  function Root(props) {
    return <div className="container-fluid ">{props.children}</div>;
  }
  
  ReactDOM.render(
    <Root>
      <ItemList />
      <Login />
    </Root>,
    document.getElementById("root")
  );
  
  // document.getElementById('checkout').onclick = ()=>postData('',{key:'value'})
  async function postData(url = "", data = {}) {
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
    return response.json(); // parses JSON response into native JavaScript objects
  }