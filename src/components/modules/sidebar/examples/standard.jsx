import React from 'react';
import Sidebar from '../sidebar';
import Button from '../../../elements/button/button';

class MySidebar extends React.Component {
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
                  labeled
                  menu
                  push
                >
                  <a className="item"><i className="home icon"></i> Home </a>
                  <a className="item"><i className="block layout icon"></i> Topics </a>
                  <a className="item"><i className="smile icon"></i> Friends </a>
                  <a className="item"><i className="calendar icon"></i> History </a>
                </Sidebar>
            </div>
        );
    }
}

<MySidebar />
