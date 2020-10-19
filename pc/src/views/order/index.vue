<template>
  <div class="table_container">
    <!-- 搜索栏 -->
    <div class="filter-container">
      <el-form :model="listQuery" ref="" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="下单人">
              <el-input v-model="listQuery.orderUserName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下单编码">
              <el-input v-model="listQuery.orderCode" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下单人手机">
              <el-input v-model="listQuery.phone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单状态">
              <el-select :clearable="true" placeholder="请选择" style="width:100%" v-model="listQuery.orderStatus">
                <el-option :key="index+item" :label="item.text" :value="index"
                  v-for="(item,index) in orderStatusMapper"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="订单时间">
              <el-col :span="11">
                <el-date-picker type="datetime" placeholder="开始时间" v-model="listQuery.orderStartTime"
                  value-format="yyyy-MM-dd HH:mm:ss" style="width:100%">
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align:center">至</el-col>
              <el-col :span="11">
                <el-date-picker type="datetime" placeholder="结束" v-model="listQuery.orderEndTime"
                  value-format="yyyy-MM-dd HH:mm:ss" style="width:100%">
                </el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="filter-bottom">
          <el-col :span="16">
            <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询
            </el-button>
            <el-button type="primary" icon="el-icon-refresh-left" @click="handleRest">重置
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- table -->
    <el-table class="_table" :data="list.slice((listQuery.pageNum-1)*listQuery.pageSize,listQuery.pageNum*listQuery.pageSize)" element-loading-text="数据加载中" fit highlight-current-row style="width:1460px"
      v-loading="listLoading">
      <!-- id -->
      <el-table-column align="center" label="#" type="index" width="60">
      </el-table-column>
      <!-- 订单编号 -->
      <el-table-column align="center" label="订单编号" width="400" prop="uuid">
      </el-table-column>
      <!-- 下单人姓名 -->
      <el-table-column align="center" label="姓名" width="100" prop="userName">
      </el-table-column>
      <!-- 订单状态 -->
      <el-table-column align="center" label="订单状态" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.orderStatus | orderStatusTypeFilter">
            {{ scope.row.orderStatus | orderStatusTextFilter}}</el-tag>
        </template>
      </el-table-column>
      <!-- 商家编码 -->
      <el-table-column align="center" label="商家" width="150">
          <template slot-scope="scope">
            {{scope.row.businessCode | businessCodeFilter}}
          </template>
      </el-table-column>
      <!-- 订单人电话 -->
      <el-table-column align="center" label="电话" width="200" prop="phone">
      </el-table-column>
      <!-- 创建时间 -->
      <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          {{scope.row.createdTime | createdTimeFilter}}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination :limit.sync="listQuery.pageSize" :page.sync="listQuery.pageNum" :total="total" @pagination="fetchData"
      v-show="total>0" />
    <!-- 详情弹窗 -->
    <el-dialog title="订单详情" :visible.sync="dialogVis">
      <el-table :data="order" style="width: 100%">
        <el-table-column prop="skuName" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="imagePath" label="图片" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.images.split(',')[0]" min-width="70" height="70" />
          </template>
        </el-table-column>
        <el-table-column prop="userAccount" label="购买人账号">
        </el-table-column>
        <el-table-column prop="phone" label="电话">
        </el-table-column>
         <el-table-column prop="costPrice" label="商品价格">
           <template slot-scope="scope">
             ￥{{scope.row.salePrice}}
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button type="primary" @click="dialogVis = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getList,
    listOrderDetails
  } from '@/api/order'
  import Pagination from '@/components/Pagination'
  import moment from 'moment'
  // 订单状态码表
  var orderStatusMapper = [{
      text: "已下单",
      tag: ""
    },
    {
      text: "已发货",
      tag: "success"
    },
    {
      text: "已完成未评价",
      tag: "warning"
    },
    {
      text: "已评价",
      tag: "info"
    },
    {
      text: "已取消",
      tag: "danger"
    }
  ]
  export default {
    name: "order",
    components: {
      Pagination
    },
    filters: {
      orderStatusTextFilter(code) {
        return orderStatusMapper[parseInt(code)].text
      },
      orderStatusTypeFilter(code) {
        return orderStatusMapper[parseInt(code)].tag
      },
      orderDelFileter(code) {
        return ['已删除', '未删除'][parseInt(code)]
      },
      createdTimeFilter(code) {
        return moment(code).format('YYYY-MM-DD')
      },
      businessCodeFilter(code) {
          return ['新华书店', '当当书店'][parseInt(code)-1]
          //可以优化 查询商家信息 返回数组
      }

    },
    data() {
      return {
        list: [],
        listLoading: true,
        total: 0,
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          orderUserName: undefined,
          orderCode: undefined,
          orderStatus: undefined,
          phone: undefined,
          orderStartTime: undefined,
          orderEndTime: undefined,
          isAdmin:1
        },
        orderStatusMapper: orderStatusMapper,
        // 商品详情
        order: [],
        dialogVis: false
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        var _params = {
          userName: this.listQuery.orderUserName,
          phone: this.listQuery.phone,
          orderCode: this.listQuery.orderCode,
          orderStatus: this.listQuery.orderStatus,
          orderStartTime: this.listQuery.orderStartTime,
          orderEndTime:this.listQuery.orderEndTime,
          isAdmin:1
        }
        getList(_params).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      // 查询按钮
      handleFilter() {
        this.listQuery.pageNum = 1
        this.fetchData()
      },
      handleRest() {
        this.listQuery = Object.assign(this.listQuery, {
          pageNum: 1,
          pageSize: 10,
          orderUserName: undefined,
          orderCode: undefined,
          orderStatus: undefined,
          phone: undefined,
          orderStartTime: undefined,
          orderEndTime: undefined
        })
      },
      handleDetail(row) {
        var _params = {
          orderCode: row.skuCode
        }
        listOrderDetails(_params).then(response => {
          console.log(response);
          this.order = response.data
          this.dialogVis = true

        })
      }
    }

  }
</script>

<style lang="scss" scoped>
  .order {
    font-size: 20px;
    margin-left: 50px;
  }

  .filter-container {
    padding: 20px 20px 20px 0;
  }

  .filter-bottom {
    padding-left: 40px;
  }

  ._table {
    margin: 0 20px;
  }
</style>
