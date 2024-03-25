import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    isLoggedIn: false,
    userInfo: null,
    pwConfirm: false,   // 회원정보 수정시 사용할 비밀번호 확인 여부
};

let userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        // 로그인 액션
        login(state, action) {
            state.isLoggedIn = true;
            state.userInfo = action.payload; // payload는 로그인한 사용자 정보를 포함
            state.pwConfirm = false;
        },
        // 로그아웃 액션
        logout(state) {
            state.isLoggedIn = false;
            state.userInfo = null;
            state.pwConfirm = false;
        },
        // 프로필 업데이트 액션
        updateProfile(state, action) {
            if (state.isLoggedIn && state.userInfo) {
                state.userInfo = { ...state.userInfo, ...action.payload }; // payload는 업데이트할 사용자 정보를 포함
                state.pwConfirm = false;
            }
        },
        // 회원정보 수정 시 비밀번호 확인 액션 추가하기.
    }
})

export let { login, logout, updateProfile } = userSlice.actions;

export default userSlice;