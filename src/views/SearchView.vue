<!-- <template>
    <div>
        Search Page
        <div >
            {{ userInfo }}
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default{
    data(){
        return{
            userInfo:null
        }
    },


    async created() {
    try {
      const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2NDRmZTcxMmIyNzc0ZWIzNDZhNmMwNWYiLCJpYXQiOjE2ODMwNTA1MzksIm5iZiI6MTY4MzA1MDUzOSwianRpIjoiZjc4MDZhMzEtMmJjMC00Yjc1LTliZjMtN2Q0MDNkMGEwNzcxIiwiZXhwIjoxNjgzMDUwNTk5LCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOmZhbHNlfQ.QMi-g4AM5sdhWsixObb35P0d4POE_OtpxvTBd2w5C6_HwINMVbZz3enm-aXuwtColXEZw1JV2YHDb0mWXXeZSw`
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get(`https://slight-api-86967ce77eee.herokuapp.com/api/user/me`, config)
      this.userInfo = response.data
      console.log('response.data', response);

    } catch (e) {
      this.errors.push(e)
    }
  }
}
</script> -->