import CASAuthentication from "cas-authentication";
import { CAS } from "../../config";

const cas = new CASAuthentication({
  cas_version: CAS.VERSION,
  cas_url: CAS.URL,
  service_url: CAS.DEV_MODE ? CAS.SERVICE_URL_DEV : CAS.SERVICE_URL,
  is_dev_mode: CAS.DEV_MODE,
  dev_mode_user: CAS.DEV_USER,
  dev_mode_info: CAS.DEV_USERINFO,
  session_name: CAS.SESSION_NAME,
  session_info: CAS.SESSION_INFO,
  destroy_session: CAS.DESTROY_SESSION
});

export default cas;
