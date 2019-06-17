import axios from "axios";
import Alert from '../components/Alert';
import SettingProvider from '../components/SettingProvider'

class AutenticationHelper {
    async createUser(user) {
        const sp = new SettingProvider();
        const baseUrl = (await sp.getBaseUrl()) + (await sp.getSuffixApi());
        const badRequestMsg = "Nie udało się utworzyć konta, sprawdż czy adres email poprawny i hasło zawiera conajmniej 6 znaków (w tym znaków specjalnych, liczb)";
        let createUserUrl = baseUrl + "Account/Register"
        let data = (await axios.post(createUserUrl, user).catch(e => Alert(badRequestMsg)));
        if(data == null)
            return null;
        return data.data;
    };

    async getToken(user) {
        const sp = new SettingProvider();
        const url = (await sp.getBaseUrl()) + "Token";
        let data = null;
        try {
            data = (await axios({
                url: url,
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: "username=" + encodeURIComponent(user.login) +
                "&password=" + encodeURIComponent(user.password) +
                "&grant_type=password"
            }));
        } catch(e) {
            data = e.response.data;
        }
        if(data == null)
            return null;
        if(data.error_description != null) {
            return {
                data: null,
                msg: data.error_description
            }
        }
        return {
            data: data.data,
            msg: null
        }
    }
}
   
export default AutenticationHelper