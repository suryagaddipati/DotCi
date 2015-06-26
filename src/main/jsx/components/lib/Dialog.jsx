import React from 'react';
import CustomAttributes from './../mixins/CustomAttributes.jsx';
import Loading from  './../mixins/Loading.jsx';
export default React.createClass({
  mixins: [CustomAttributes],
  getInitialState(){
    return {showing: false};
  },
  render(){
    return <paper-dialog  ref="ca-dialog" onClick={this._onClick} >
      <h2>{this.props.heading}</h2>
      <paper-dialog-scrollable>
        {this.state.showing?this.props.children:this._loading()}
      </paper-dialog-scrollable>
      {this.props.noButtons? "": this._buttons()}
    </paper-dialog>;
  },
  _loading(){
    <Loading/>;
  },
  _buttons(){
    return <div className="buttons">
      <paper-button ref="ca-1" attrs={{"dialog-dismiss": true}}>Cancel</paper-button>
      <paper-button  ref="ca-2" attrs={{ "dialog-confirm": true}}>Accept</paper-button>
    </div>
  },
  show(){
    this.setState({showing: true});
    const dialog = this.refs['ca-dialog'];
    dialog.getDOMNode().toggle();
  },
  _onClick(e){
    if(e.target.parentElement && e.target.parentElement.getAttribute('dialog-confirm')){
      this.props.onSave(e);
    }
  }
});