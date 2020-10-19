<template>
  <div class="home-container">
    <h2>后台管理系统</h2>
    <el-row class="_card" type="flex" justify="space-around">
      <el-col :span="6">
        <el-card class="box-card">
          <div  class="text item">
            <div class="header-item">
              商品事项
            </div>
            <div class="content-item">
               今日新增商品
            <span>{{dayData.goodsNum}}</span>
            </div>
            <div class="content-item">
               本月新增商品
               <span>{{mouthData.goodsNum}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div  class="text item">
            <div class="header-item">
              订单事项
            </div>
            <div class="content-item">
               今日新增订单
            <span>{{dayData.orderNum}}</span>
            </div>
            <div class="content-item">
               本月新增订单
               <span>{{mouthData.orderNum}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div  class="text item">
            <div class="header-item">
              用户事项
            </div>
            <div class="content-item">
               今日新增用户
            <span>{{dayData.customerNum}}</span>
            </div>
            <div class="content-item">
               本月新增用户
               <span>{{mouthData.customerNum}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="_card" id="_chart" type="flex" justify="space-around">
      <el-col :span="10">
        <el-card>
          <div class="chart" id="homeChart"></div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card>
          <div class="chart" id="homeChart1"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
var echarts = require('echarts')
import {getMouthList ,getDayList,findCateNum,findMatterOrderWeek} from '@/api/home'
export default {
  name: 'home',
    data(){
    return{
         mouthData:{

         },
         dayData:{

         },
         cateList:[

         ]
         ,
         weekData:{

         }
    }
  },
  created(){
    this.fetchData()
  },
  methods:{
     fetchData(){
         getMouthList().then(response=>{
           this.mouthData=response.data
         })
         getDayList().then(response=>{
           this.dayData=response.data
         }),
         findCateNum().then(response=>{
           console.log(response);
           this.cateList=response.data
         }),
         findMatterOrderWeek().then(response=>{
           this.weekData=response.data
         })
     }
  },
  mounted() {
    setTimeout(() => {
                 // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('homeChart'))
    var myChart1 = echarts.init(document.getElementById('homeChart1'))
    // 绘制图表
    myChart.setOption({
      title: {
        text: '本周订单情况汇总'
      },
      tooltip: {},
      xAxis: {
        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六','星期日']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [this.weekData.mondayNum, this.weekData.tuesdayNum, this.weekData.wednesdayNum, this.weekData.thursdayNum, this.weekData.fridayNum, this.weekData.saturdayNum,this.weekData.sundayNum]
      }]
    })

    myChart1.setOption({
      title: {
        text: '商品分类情况'
      },
      series : [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data:[
                {value:Object.values(this.cateList[0]), name:Object.keys(this.cateList[0])},
                {value:Object.values(this.cateList[1]), name:Object.keys(this.cateList[1])},

            ]
        }
    ]
    })

            }, 1000)
  }
}
</script>

<style lang="scss" scoped>
   h2 {
    margin: 50px;
   }
   .chart{
     display: inline-block;
     width: 400px;
     height: 400px;
   }
   .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
  ._card {
    margin: 50px 0;
  }
  #_chart{
    text-align: center;
  }
  .header-item{
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #f6f6f6;
    padding-bottom: 10px;
  }
  .content-item{
    color: rgb(188, 188, 188);
    margin-top: 20px;
    span{
      font-size: 25px;
      margin-left: 100px;
      color:#93d0cc
    }
  }

</style>
