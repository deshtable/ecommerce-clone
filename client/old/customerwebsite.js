class ItemList extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      Oreo: 0,
      "Fruit Punch": 0,
      Butter: 0,
      Bujhi: 0,
    };
  }

  updateAmount = (name, amount) => {
    const newState = {};
    newState[name] = amount;
    this.setState(newState);
  };

  render() {
    this.postState = postData.bind(this, "/checkout", {
      ...this.state,
      ...this.props,
    });
    const items = [];
    for (const item in this.state) {
      items.push(
        <div key={item} className="col-sm">
          <Item
            name={item}
            amount={this.state[item]}
            update={this.updateAmount}
          />
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">{items}</div>
        <a className="btn btn-primary" onClick={this.postState}>
          Checkout
        </a>
      </div>
    );
  }
}

class Item extends React.Component {
  increment = () => {
    this.props.update(this.props.name, this.props.amount + 1);
  };
  decrement = () => {
    this.props.update(this.props.name, this.props.amount - 1);
  };

  render() {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{this.props.name}</h5>
          <p className="card-text">This item is 1</p>
          <a className="btn btn-primary" onClick={this.decrement}>
            -
          </a>
          <p className="card-text">{this.props.amount}</p>
          <a className="btn btn-primary" onClick={this.increment}>
            +
          </a>
        </div>
      </div>
    );
  }
}

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
async function postJSON(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
}
