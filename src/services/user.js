import {LOGIN, ROUTES, OAUTH2LOGIN} from '@/services/api'
import {request, METHOD, removeAuthorization} from '@/utils/request'
/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
  console.log(LOGIN)
  return request(LOGIN, METHOD.POST, {
    name: name,
    password: password
  })
}

export function go2oauth() {
  window.location.href = 'https://open-oauth.jd.com/oauth2/to_login?app_key=9EC9D9B8866839CDD5B0910C73249FA8&response_type=code&scope=snsapi_base&redirect_uri=http://cjpg.tbhelper.com/callback/oauth2';
}

export async function getRoutesConfig() {
  return request(ROUTES, METHOD.GET)
}

export async function getAccessToken(code, state) {
  return request(OAUTH2LOGIN, METHOD.POST, {
    code: code,
    state: state
  })
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}
export default {
  login,
  logout,
  go2oauth,
  getAccessToken,
  getRoutesConfig
}
