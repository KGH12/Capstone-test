import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    isLoggedIn: false,
    userInfo: null,
    isPwConfirm: false,   // 회원정보 수정시 사용할 비밀번호 확인 여부
    isLoading: true, // 로딩 상태
};

let userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        // 로딩 상태 설정
        setUserLoading(state, action) {
            state.isLoading = action.payload;
          },
        // 로그인 액션
        login(state, action) {
            state.isLoggedIn = true;
            state.userInfo = action.payload; // payload는 로그인한 사용자 정보를 포함
            state.isPwConfirm = false;
            state.isLoading = false;
        },
        // 로그아웃 액션
        logout(state) {
            state.isLoggedIn = false;
            state.userInfo = null;
            state.isPwConfirm = false;
            state.isLoading = false;
        },
        // 프로필 업데이트 액션
        updateProfile(state, action) {
            if (state.isLoggedIn && state.userInfo) {
                state.userInfo = { ...state.userInfo, ...action.payload }; // payload는 업데이트할 사용자 정보를 포함
                state.isPwConfirm = false;
            }
        },
        // 회원정보 수정 시 비밀번호 확인 액션
        pwConfirm(state, action) {
            state.isPwConfirm = true;
        },
        // 회원정보 수정 완료 시 isPwConfirm 초기화
        pwConfirmReset(state, action) {
            state.isPwConfirm = false;
        }
    }
})

export let { setUserLoading, login, logout, updateProfile, pwConfirm, pwConfirmReset } = userSlice.actions;

export default userSlice;