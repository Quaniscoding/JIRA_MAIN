import { http } from '../../../utils/baseUrl';
import { saveLocal, saveStringLocal } from '../../../utils/config';
import { DATA_USER, USER_LOGIN } from '../../../utils/constant';

export const callLogin = (userLogin) => async () => {
    try {
        const apiLogin = await http.post("user/signin", userLogin);
        saveStringLocal(USER_LOGIN, apiLogin.data.Token
        )
        saveLocal(DATA_USER, apiLogin.data.content)
        return true
    } catch (err) {
        return err
    }
}