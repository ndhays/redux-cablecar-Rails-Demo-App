
import React from 'react';

export default class Message extends React.Component {
  render() {
    return (
      <div style={{ margin: '0.3em' }}>
        <span style={{ color: this.props.color, fontWeight: 'bold' }}>
          {this.props.msg.name}
          { this.props.showTime ? (
            <span style={{ fontSize: '0.5em', marginLeft: '1em' }}>[{this.props.msg.time}]</span>
          ) : null }:
        </span>
        <span style={{ marginLeft: '0.5em' }}>{this.props.msg.msg}</span>
      </div>
    );
  }
}
