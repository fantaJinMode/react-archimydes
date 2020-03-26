import {
    SAVE_CREATE_USER_START,
    SAVE_CREATE_USER_SUCCESS,
    CREATE_USER_SAVE_ERROR
} from "./constant";
import { CREATE_USER_SAVE_SUCCESS_MSG } from "../common/constants";
import { createNewUserApi } from "../api/createUser";
import { inviteUser } from "../api/inviteUser";

const saveCreateUserStart = () => ({
    type: SAVE_CREATE_USER_START,
});

const saveCreateUserSuccess = json => ({
    type: SAVE_CREATE_USER_SUCCESS,
    saveResponse: json.data,
    successMsg: CREATE_USER_SAVE_SUCCESS_MSG
});

const saveCreateUserError = (error, type) => {
    if(type === 'invite') {
        return {
            type: CREATE_USER_SAVE_ERROR,
            errorMsg: error.data && error.errorMessage.message
        }
    }
    else {
        return {
            type: CREATE_USER_SAVE_ERROR,
            errorMsg: error.data && error.data.errorMessage
        }
    }
   
};

export const createNewUser = (data, invite) => {
    return async (dispatch) => {
        dispatch(saveCreateUserStart());
        try {
            const response = await createNewUserApi(data);

            if (invite) {
                try {
                    const inviteResponse = await inviteUser({
                        userId: response.data._id,
                        userRole: response.data.userRoles[0],
                        resend: false
                    });
                }
                
                catch(error) {
                    dispatch(saveCreateUserError(error.response, 'invite'));
                    return error;
                }
            }

            dispatch(saveCreateUserSuccess(response));
            return response;
        } catch (error) {
            dispatch(saveCreateUserError(error.response));
            return error;
        }
    }
};
