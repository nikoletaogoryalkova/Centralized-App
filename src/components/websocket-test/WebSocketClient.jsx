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
            messages: [...prevState.messages, msg.msg]
        }));
    }

    sendMessage() {
        try {
            const msg = {
                'message': msg,
            };

            this.clientRef.sendMessage('/app/all', JSON.stringify(msg));
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
        this.setState({ clientConnected: false, messages: [] });
    }

    componentWillMount() {
        // Fetch('/history', {
        //     method: 'GET'
        // }).then((response) => {
        //     this.setState({ messages: response.body });
        // });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        console.log(this.clientRef)
        const wsSourceUrl = 'http://localhost:8080/handler';
        return (
            <div>
                <div>
                    <button onClick={this.connect}>connect</button>
                    <button onClick={this.disconnect}>disconnect</button>
                </div>
                {this.state.clientConnected && 
                    <div>
                        <input type="text" value={this.state.message} onChange={this.onChange.bind(this)} name="message"/>
                        <button onClick={this.sendMessage}>send</button>
                    </div>
                }
                
                <div>{this.state.messages && this.state.messages.map((msg, i) => { return (<div key={i}>{msg}</div>); })}</div>
                <SockJsClient url={wsSourceUrl} topics={['/user/topic/all']}
                    onMessage={this.onMessageReceive} ref={(client) => { this.clientRef = client; }}
                    onConnect={() => { this.setState({ clientConnected: true }); }}
                    onDisconnect={() => { this.setState({ clientConnected: false }); }}
                    // withCredentials='false'    
                    debug={false} />
            </div>
        );
    }
}
