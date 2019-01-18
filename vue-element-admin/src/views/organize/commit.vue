<template>
    <div>
        <ve-line :data="chartData"></ve-line>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Commit",
  data: function() {
    return {
      chartData: {
        columns: ["月份", "提交次数", "下单用户", "下单率"],
        rows: [
          { 月份: "1/1", 提交次数: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 月份: "1/2", 提交次数: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 月份: "1/3", 提交次数: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 月份: "1/4", 提交次数: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 月份: "1/5", 提交次数: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 月份: "1/6", 提交次数: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    };
  },
//   computed: {
//     ...mapState({
//       commits: state => state.list.commitData
//     })
//   },
//   created() {
//     this.Commits();
//   },
//   methods: {
//     ...mapActions({
//       Commits: "list/Commits"
//     })
//   },
  created(){
    //   console.log('Data',this.commits)
    fetch('http://123.206.55.50:15000/users/commit')
    .then(res=>res.json())
    .then(body=>{
        let data=body[0].commit;
        data.forEach((item,index) => {
            let date=item.date;
            for(let i=1;i<=12;i++){
              item[`${i}月`]=body[i-1].commit[date-1] && body[i-1].commit[date-1].commit
            }
            delete item.commit
        });
        this.chartData={
            columns:['date','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            rows:data
        }
    })
  }
};
</script>

<style>
</style>
