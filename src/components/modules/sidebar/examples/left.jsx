import React from 'react';
import Sidebar from '../sidebar';
import Button from '../../../elements/button/button';

class LeftSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    onCloseModal() {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.setState({ visible: true })}>Open sidebar</Button>
                <Sidebar
                  onRequestClose={this.onCloseModal.bind(this)}
                  visible={this.state.visible}
                  left
                  vertical
                  inverted
                  menu
                >
                  <a className="item" style={{ width: '260px' }}>Home </a>
                  <a className="item">Topics </a>
                  <a className="item">Friends </a>
                  <a className="item">History </a>
                </Sidebar>
            </div>
        );
    }
}

<LeftSidebar />
