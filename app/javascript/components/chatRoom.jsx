import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import {
    CircularProgress,
    Button,
    Paper,
    LinearProgress,
    TextField,
} from '@material-ui/core'
import Message from './message'
import colors from '../lib/colors'

const style = {
    height: '50vh',
    margin: '20px auto',
    width: '50vh',
}

function ChatRoom({ cablecar, connected, messages, getRecentMsgs, sendMsg }) {
    let msgBoxRef = useRef(null)
    const [msg, setMsg] = useState('')
    const [showTimes, setShowTimes] = useState(false)

    function scrollToBottom() {
        if (msgBoxRef) {
            msgBoxRef.scrollTo({ top: msgBoxRef.scrollHeight, behavior: 'smooth' })
        }
    }

    useEffect(() => {
        if (connected.MainChannel) getRecentMsgs()
    }, [connected.MainChannel])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

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
            {!connected.MainChannel ? (
                <div>
                    <LinearProgress mode="indeterminate" />
                    <h3>(the React App begins here)</h3>
                    <h3 style={{ color: 'yellow' }}>
                        MainChannel Connecting...
                    </h3>
                </div>
            ) : (
                    <div>
                        <h3>(the React App begins here)</h3>
                        <h3 style={{ color: 'lightgreen' }}>
                            MainChannel Connected. Open multiple private windows
                            to add users to the chat.
                    </h3>
                    </div>
                )}
                {!connected.OtherChannel ? (
                <div><h3 style={{ color: 'yellow' }}>
                        OtherChannel Connecting...
                    </h3>
                </div>
            ) : (
                    <div>
                        <h3 style={{ color: 'lightgreen' }}>
                            OtherChannel Connected
                        </h3>
                    </div>
                )}

            <Paper
                style={{ margin: '2em', padding: '1em', position: 'relative' }}
            >
                {connected.MainChannel ? (
                    <div
                        style={{
                            position: 'absolute',
                            top: '1em',
                            left: '1em',
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => setShowTimes(!showTimes)}
                        >{showTimes
                            ? 'Hide Timestamps'
                            : 'Show Timestamps'}</Button>

                        <Button
                            variant="contained"
                            onClick={() =>
                                cablecar.perform('clear_all_messages')
                            }
                        >Delete All Messages</Button>
                    </div>
                ) : null}

                <div
                    ref={(r) => msgBoxRef = r}
                    style={{ height: '15em', overflowY: 'scroll' }}>
                    {!connected.MainChannel ? (
                        <CircularProgress style={{ marginTop: '7em' }} />
                    ) : messages.length < 12 ? (
                        renderSpacer()
                    ) : null}
                    {renderMessages()}

                    
                </div>

                {connected.MainChannel ? (
                    <TextField
                        helperText="Your message"
                        fullWidth={true}
                        onChange={(event) => {
                            setMsg(event.target.value)
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
