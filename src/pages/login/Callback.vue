<template>
<div></div>
</template>
<script>
import {getAccessToken, getRoutesConfig} from '@/services/user'
import {setAuthorization} from '@/utils/request'
import {loadRoutes} from '@/utils/routerUtil'
import {mapMutations} from 'vuex'

export default {
  name: 'callback',
  created () {
    const code = this.$route.query.code
    const state = this.$route.query.state || ''
    const shopId = this.$route.query.shopId || ''
    const platform = this.$route.params.platform || 'ks'

    console.log( code + state + shopId + platform)

    getAccessToken(code, state).then(this.afterLogin)

  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    afterLogin(res) {
      const loginRes = res.data
      if (loginRes.code >= 0) {
        const {user, permissions, roles} = loginRes.data
        this.setUser(user)
        this.setPermissions(permissions)
        this.setRoles(roles)
        setAuthorization({token: loginRes.data.token, expireAt: new Date(loginRes.data.expireAt)})
        // 获取路由配置
        getRoutesConfig().then(result => {
          const routesConfig = result.data.data
          loadRoutes({router: this.$router, store: this.$store, i18n: this.$i18n}, routesConfig)
          this.$router.push('/dashboard/workplace')
          this.$message.success(loginRes.message, 3)
        })
      } else {
        this.error = loginRes.message
      }
    }
  }
}
</script>
