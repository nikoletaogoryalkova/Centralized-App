import { changeMessageStatus, getMyConversations } from '../../../requester';

import Pagination from '../../common/pagination/Pagination';
import NoEntriesMessage from '../common/NoEntriesMessage';
import MessagesItem from './MessagesItem';
import React from 'react';

export default class MessagesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      messages: [],
      currentPage: 1,
      totalElements: 0,
    };

    this.changeMessageFlag = this.changeMessageFlag.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    getMyConversations('?page=0').then(data => {
      console.log(data)
      this.setState({ messages: data.content, loading: false, totalElements: data.totalElements });
    });
  }

  changeMessageFlag(id, unread) {
    let conversationObj = {
      conversationId: id,
      unread: unread === 'true' ? 'false' : 'true'
    };

    changeMessageStatus(conversationObj).then(() => {
      let messages = this.state.messages;

      let message = messages.find(x => x.id === id);
      let messageIndex = messages.findIndex(x => x.id === id);

      message.unread = unread === 'true' ? 'false' : 'true';

      messages = messages.filter(x => x.id !== id);
      messages.splice(messageIndex, 0, message);

      this.setState({ messages: messages });
    });
  }

  onPageChange(page) {
    this.setState({
      currentPage: page,
      loading: true
    });

    getMyConversations(`?page=${page - 1}`).then(data => {
      this.setState({
        messages: data.content,
        totalElements: data.totalElements,
        loading: false
      });
    });
  }

  renderMessages() {
    if (!this.state.messages) {
      return;
    }

    if (this.state.messages.length === 0) {
      return (
        <div style={{ marginBottom: '10px' }}>
          <NoEntriesMessage text="You don&#39;t have any messages" />
        </div>
      );
    }

    return (
      <div>
        {this.state.messages.map((message, i) => {
          return <MessagesItem message={message} changeMessageFlag={this.changeMessageFlag} key={i} />;
        })}
        <Pagination
          loading={this.state.totalElements === 0}
          onPageChange={this.onPageChange}
          currentPage={this.state.currentPage}
          totalElements={this.state.totalElements}
        />
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return <div className="loader"></div>;
    }

    return (
      <div>
        {/* <section id="profile-messages-hosting"> */}
        <div className="container">
          {this.renderMessages()}
        </div>
        {/* </section> */}
      </div>
    );
  }
}