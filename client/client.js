
class Item extends React.Component {
    constructor(){
        super();
        this.state = {name:'Oreos',number:0}
    }


   increment= ()=>{
    this.setState((state)=>{
        return {number:state.number+1}
    })
   } 
   decrement=()=>{
    if(this.state.number > 0){
    this.setState((state)=>{
        return {number:state.number-1}
    })

    }
   } 

    render() {
        this.postState = postData.bind(this, '',this.state)
        return (
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Oreos</h5>
                    <p className="card-text">This item is 1</p>
                    <a className="btn btn-primary" onClick={this.decrement}>-</a>
                    <p className="card-text">{this.state.number}</p>
                    <a className="btn btn-primary" onClick={this.increment}>+</a>
                    <a className="btn btn-primary" onClick={this.postState}>Checkout</a>
                </div>
            </div>
        )
    }
}
ReactDOM.render(
    <Root ><Item/></Root>,
    document.getElementById('root')
);



function Root(props) {
    return (
        <div className="container-fluid ">
            {props.children}
        </div>)
}

// document.getElementById('checkout').onclick = ()=>postData('',{key:'value'})
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}