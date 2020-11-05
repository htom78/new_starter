<template>
  <div class="test">
    <div>
      其他登录方式
      <a-icon class="icon" type="alipay-circle"  @click="onTest" />
    </div>
  </div>
</template>


<script>
import {TEST} from '@/services/api'
import {request, METHOD} from '@/utils/request'

export default {
  name: 'Test',
  data () {
    return {
      loading: true
    }
  },
  created() {
    setTimeout(() => this.loading = !this.loading, 1000)
  },
  methods: {
    onTest() {
      request(TEST, METHOD.POST, {}).then(res => {
        console.log(res)
      })
      //console.log(ret)
    }
  }
}
</script>
