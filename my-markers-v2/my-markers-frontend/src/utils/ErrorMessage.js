class ErrorMessage {
    constructor() {
        this.defaultErrorMessage = '일시적인 오류가 발생했습니다.';
        this.loginErrorMessageMap = {
            '50': '일시적인 오류가 발생했습니다.',
            '41': '존재하지 않는 ID 입니다.',
            '42': '비밀번호가 맞지 않습니다.'
        };
        this.signinErrorMessageMap = {
            '50': '일시적인 오류가 발생했습니다.',
            '41': '사용할 수 없는 ID 형식입니다.',
            '42': '사용할 수 없는 EMAIL 형식입니다.',
            '43': '이미 존재하는 ID 입니다.',
            '44': '사용할 수 없는 비밀번호 길이입니다.'
        }
        this.deleteUserErrorMessageMap = {
            '50': '일시적인 오류가 발생했습니다.',
            '41': '존재하지 않는 ID 입니다.',
            '42': '비밀번호가 맞지 않습니다.'
        }
        this.updateUserErrorMessageMap = {
            '41': '존재하지 않는 ID 입니다.',
            '42': '비밀번호가 맞지 않습니다.',
            '43': '사용할 수 없는 EMAIL 형식입니다.',
            '44': '사용할 수 없는 비밀번호 길이입니다.'
        }
        this.getLoginErrorMessage = this.getLoginErrorMessage.bind(this);
        this.getSignInErrorMessage = this.getSignInErrorMessage.bind(this);
        this.getDeleteUserErrorMessage = this.getDeleteUserErrorMessage.bind(this);
        this.getUpdateUserErrorMessage = this.getUpdateUserErrorMessage.bind(this);
    }

    getLoginErrorMessage(errorCode) {
        if (this.loginErrorMessageMap.hasOwnProperty(errorCode)) {
            return this.loginErrorMessageMap[errorCode];
        } else {
            return this.defaultErrorMessage;
        }
    }

    getSignInErrorMessage(errorCode) {
        if (this.signinErrorMessageMap.hasOwnProperty(errorCode)) {
            return this.signinErrorMessageMap[errorCode];
        } else {
            return this.defaultErrorMessage;
        }
    }

    getDeleteUserErrorMessage(errorCode) {
        if (this.deleteUserErrorMessageMap.hasOwnProperty(errorCode)) {
            return this.deleteUserErrorMessageMap[errorCode];
        } else {
            return this.defaultErrorMessage;
        }
    }

    getUpdateUserErrorMessage(errorCode) {
        if (this.updateUserErrorMessageMap.hasOwnProperty(errorCode)) {
            return this.updateUserErrorMessageMap[errorCode];
        } else {
            return this.defaultErrorMessage;
        }
    }
}

export default new ErrorMessage();
