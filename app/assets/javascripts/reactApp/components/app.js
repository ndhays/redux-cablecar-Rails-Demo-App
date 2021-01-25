import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import {
    CircularProgress,
    RaisedButton,
    Paper,
    LinearProgress,
    TextField,
} from 'material-ui'
import Message from './message'
import colors from '../colors'

const style = {
    height: '50vh',
    margin: '20px auto',
    width: '50vh',
}

function App({ cablecar, connected, messages, getRecentMsgs, sendMsg }) {
    let messagesEnd = useRef()
    const [msg, setMsg] = useState('')
    const [showTimes, setShowTimes] = useState(false)

    function scrollToBottom() {
        messagesEnd.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (connected) getRecentMsgs()
    }, [connected])

    useEffect(() => {
        scrollToBottom()
    })

    function renderSpacer() {
        return <div style={{ height: '15em' }}></div>
    }

    function renderMessages() {
        return messages.map((msg, idx) => (
            <Message
                key={'msg' + idx}
                color={getColor(msg.name)}
                msg={msg}
                showTime={showTimes}
            />
        ))
    }

    function getColor(name) {
        let i = 0
        let x = 1
        while (i < name.length) {
            x = x * (name.charCodeAt(i) || 1)
            i++
        }
        let color = colors[x % 82]
        return color
    }

    function submit(event) {
        if (event.key == 'Enter') {
            sendMsg(msg)
            setMsg('')
        }
    }

    return (
        <div>
            {!connected ? (
                <div>
                    <LinearProgress mode="indeterminate" />
                    <h3>(the React App begins here)</h3>
                    <h3 style={{ color: 'yellow' }}>
                        redux-cablecar Connecting...
                    </h3>
                </div>
            ) : (
                <div>
                    <h3>(the React App begins here)</h3>
                    <h3 style={{ color: 'lightgreen' }}>
                        redux-cablecar Connected. Open multiple private windows
                        to add users to the chat.
                    </h3>
                </div>
            )}

            <Paper
                style={{ margin: '2em', padding: '1em', position: 'relative' }}
                zDepth={4}
            >
                {connected ? (
                    <div
                        style={{
                            position: 'absolute',
                            top: '1em',
                            left: '1em',
                        }}
                    >
                        <RaisedButton
                            label={
                                showTimes
                                    ? 'Hide Timestamps'
                                    : 'Show Timestamps'
                            }
                            onClick={() => setShowTimes(!showTimes)}
                        />

                        <RaisedButton
                            label={'Delete All Messages'}
                            onClick={() =>
                                cablecar.perform('clear_all_messages')
                            }
                        />
                    </div>
                ) : null}

                <div style={{ height: '15em', overflow: 'scroll' }}>
                    {!connected ? (
                        <CircularProgress style={{ marginTop: '7em' }} />
                    ) : messages.length < 12 ? (
                        renderSpacer()
                    ) : null}

                    {renderMessages()}

                    <div
                        ref={(r) => {
                            messagesEnd = r
                        }}
                    ></div>
                </div>

                {connected ? (
                    <TextField
                        hintText="Your message"
                        fullWidth={true}
                        onChange={(event, m) => {
                            setMsg(m)
                        }}
                        onKeyDown={submit}
                        value={msg}
                    />
                ) : null}
            </Paper>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        connected: state.connected,
        messages: state.msgs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRecentMsgs: () => dispatch({ type: 'GET_RECENT_MSGS' }),
        sendMsg: (msg) =>
            dispatch({
                type: 'NEW_MSG',
                payload: { msg },
            }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
