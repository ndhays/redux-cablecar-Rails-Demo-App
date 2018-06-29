
import React from 'react';
import { connect } from 'react-redux'
import {
  AppBar,
  CircularProgress,
  RaisedButton,
  MenuItem,
  Paper,
  LinearProgress,
  TextField
} from 'material-ui';
import Message from './message';
import colors from '../colors';

const style = {
  height: '50vh',
  margin: '20px auto',
  width: '50vh'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      showTimes: false
    };

    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.submit = this.submit.bind(this);
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div>
        { !this.props.connected ? (
          <div>
            <LinearProgress mode="indeterminate" />
            <h3 style={{ color: 'yellow' }}>redux-cablecar Connecting... (React App Here)</h3>
          </div>
        ) : (
          <div>
            <h3 style={{ color: 'lightgreen' }}>redux-cablecar Connected. (React App Here)</h3>
          </div>
        )}

        <Paper style={{ margin: '2em', padding: '1em', position: 'relative' }} zDepth={4}>
          { this.props.connected ? (
            <RaisedButton
              label={ this.state.showTimes ? "Hide Timestamps" : "Show Timestamps" }
              onClick={ () => this.setState({ showTimes: !this.state.showTimes })}
              style={{ position: 'absolute', top: '1em', left: '1em' }}
              />
          ) : null }

          <div style={{ height: '15em', overflow: 'scroll' }}>

            { !this.props.connected ? (
              <CircularProgress style={{ marginTop: '7em' }}/>
            ) : this.props.messages.length < 12 ? this.renderSpacer() : null }

            { this.renderMessages() }

            <div ref={(r) => { this.messagesEnd = r; }}></div>

          </div>

          { this.props.connected ? (
            <TextField
              hintText="Your message"
              fullWidth={true}
              onChange={(event, msg) => { this.setState({ msg }); }}
              onKeyDown={this.submit}
              value={this.state.msg}
            />
          ) : null}

        </Paper>

      </div>
    );
  }

  renderSpacer() {
    return <div style={{ height: '15em' }}></div>
  }

  renderMessages() {
    return this.props.messages.map((msg, idx) => (
      <Message
        key={'msg'+idx}
        color={this.getColor(msg.name)}
        msg={msg}
        showTime={this.state.showTimes} />
    ));
  }

  getColor(name) {
    let i = 0;
    let x = 1;
    while (i < name.length) {
      x = x * (name.charCodeAt(i) || 1);
      i++;
    }
    let color = colors[(x % 82)];
    return color;
  }

  submit(event) {
    if (event.key == 'Enter') {
      this.props.sendMsg(this.state.msg);
      this.setState({ msg: '' });
    }
  }

}

const mapStateToProps = state => {
  return {
    connected: state.connected,
    messages: state.msgs
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sendMsg: (msg) => dispatch({
      channel: 'MainChannel',
      type: 'NEW_MSG',
      msg
    }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
