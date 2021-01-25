import React from 'react'

export default function Message({ color, msg, showTime }) {
    return (
        <div style={{ margin: '0.3em' }}>
            <span style={{ color, fontWeight: 'bold' }}>
                {msg.name}
                {showTime ? (
                    <span style={{ fontSize: '0.5em', marginLeft: '1em' }}>
                        [{msg.time}]
                    </span>
                ) : null}
                :
            </span>
            <span style={{ marginLeft: '0.5em' }}>{msg.msg}</span>
        </div>
    )
}
