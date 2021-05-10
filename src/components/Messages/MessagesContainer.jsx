/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {sendMessage} from "../../reducers/dialogsReducer";
import {connect} from "react-redux";
import Messages from "./Messages";
import withAuthRedirect from "../../Hocs/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return (
        {dialogsPage: state.dialogsPage}
    );
};

let ComposedComponent = compose(withAuthRedirect)(Messages);

export default connect(mapStateToProps, {sendMessage})(ComposedComponent);