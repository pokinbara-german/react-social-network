import React from "react";
import styles from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {
    state = {
        isStatusEditing: false,
        status: this.props.status
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status});
        }
    }

    toggleEditing = () => {
        let newValue = !this.state.isStatusEditing;
        this.setState({isStatusEditing: newValue});

        if (!newValue) {
            this.props.updateStatus(this.state.status);
        }
    }

    onStatusChange = (event) => {
        this.setState({status: event.target.value});
    }

    render() {
        let statusText = this.props.status || 'No status';

        return this.state.isStatusEditing
            ? <input autoFocus={true}
                     onBlur={this.toggleEditing}
                     onChange={this.onStatusChange}
                     className={styles.statusInput}
                     value={this.state.status}
            />
            : <div onClick={this.toggleEditing}>{statusText}</div>;
    }
}

export default ProfileStatus;