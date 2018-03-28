import React from 'react';
import SockJsClient from 'react-stomp';
import Fetch from 'json-fetch';

export default class WebSocketClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientConnected: false,
            message: '',
            messages: []
        };

        this.onMessageReceive = this.onMessageReceive.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
    }

    onMessageReceive(msg) {
        this.setState(prevState => ({
            messages: [...prevState.messages, msg]
        }));
    }

    sendMessage() {
        try {
            this.clientRef.sendMessage('/all', JSON.stringify(this.state.message));
            this.setState({ message: '' });
        } catch (e) {
            console.log(e);
        }
    }

    connect() {
        this.clientRef.connect();
        this.setState({ clientConnected: true });
    }

    disconnect() {
        this.clientRef.disconnect();
        this.setState({ clientConnected: false });
    }

    componentWillMount() {
        // Fetch('/history', {
        //     method: 'GET'
        // }).then((response) => {
        //     this.setState({ messages: response.body });
        // });
    }

    render() {
        const wsSourceUrl = 'http://localhost:8080/handler';
        const headers = { 
            xhrFields: {
                withCredentials: false
            }, 
        };
        console.log(wsSourceUrl);
        return (
            <div>
                <div>{this.state.messages && this.state.messages.map((msg, i) => { return (<div key={i}>{msg}</div>); })}</div>
                <input type="text" name="message"/>
                <button onClick={this.sendMessage}>send</button>
                <button onClick={this.connect}>connect</button>
                <button onClick={this.disconnect}>disconnect</button>
                <SockJsClient url={wsSourceUrl} topics={['/user/topic/all']}
                    onMessage={this.onMessageReceive} ref={(client) => { this.clientRef = client; }}
                    onConnect={() => { this.setState({ clientConnected: true }); }}
                    onDisconnect={() => { this.setState({ clientConnected: false }); }}
                    headers={headers}
                    debug={false} />
            </div>
        );
    }
}
