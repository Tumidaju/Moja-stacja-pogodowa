import axios from "axios";
import TokenInfo from '../components/TokenInfo';
import SettingProvider from '../components/SettingProvider'
import RestHelper from '../components/RestHelper';

class WidgetsService {
    async getWidgets() {
        const tokenInfo = new TokenInfo();
        const restHelper = new RestHelper();

        const userId = await tokenInfo.getUserId();

        const widgets = await restHelper.postWithToken("Widgets/GetWidgets", {Id: userId});
        return widgets;
    }
}

export default WidgetsService;