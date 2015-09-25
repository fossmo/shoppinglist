import React, { Component, PropTypes } from 'react';

class Grocery extends Component {
  constructor(){
    super();
    this.state = {};
    this.state.grocery = [];
  }
  render() {
    const { addGrocery, grocery } = this.props;
    return (
      <div className="content content-pad content-pad-top">
        <input type="text" name="groceryItem" onChange={this.updateGroceryItem.bind(this)} value={this.state.groit}> </input>
        <button className="mainbtn" onClick={this.addItem.bind(this)}>Legg til</button>
        {this.props.grocery.map(function(data, i){
          return (
            <div className="item" onClick={this.removeGrocery.bind(this, i)}>{data}</div>
          );
        }.bind(this))}
      </div>
    );
  }

  addItem(){
    this.props.addGrocery(this.state.groit);
    this.setState({groit:''});
  }

  updateGroceryItem(e){
    this.setState({groit: e.target.value});
    console.log(e.target.value);
  }

  removeGrocery(index){
    this.props.removeGrocery(index);
    this.forceUpdate();
  }

}

Grocery.propTypes = {
  addGrocery: PropTypes.func.isRequired,
  grocery: PropTypes.array.isRequired
};

export default Grocery;
