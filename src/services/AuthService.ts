import { Router } from "src/core/Router/Router";
import AuthApi from "src/shared/api/AuthApi";
import { LoginDto } from "src/shared/api/models";
import { Routes } from "src/shared/navigation/routes";

const authApi = new AuthApi();
const router = new Router();

export const login = async(data: LoginDto) => {
    await authApi.login(data);
    // const currentUser = await getCurrentUser();
    // window.store?.set({
    //     currentUser
    // });
    router.go(Routes.Chats);
};