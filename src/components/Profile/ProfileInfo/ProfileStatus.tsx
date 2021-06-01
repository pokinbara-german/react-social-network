import React, {ChangeEvent} from "react";
import styles from './ProfileInfo.module.css';

type propsType = {
    status: string,
    updateStatus: (status: string) => void
}

type stateType = {
    isStatusEditing: boolean,
    status: string
}

class ProfileStatus extends React.Component<propsType, stateType> {
    state = {
        isStatusEditing: false,
        status: this.props.status
    }

    componentDidUpdate(prevProps: propsType, prevState: stateType, snapshot: any) {
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

    onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
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