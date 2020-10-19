<template>
  <div class="table_container">
    <!-- 查询条件 -->
    <div class="filter-container">
      <!-- 用户账号 -->
      <el-input
        placeholder="用户账号"
        style="width:200px"
        v-model="listQuery.userAccount"
      />
      <!-- 用户名 -->
      <el-input
        placeholder="用户名"
        style="width:200px"
        v-model="listQuery.userName"
      />
      <!-- 查询按钮 -->
      <el-button
       @click="handleFilter"
       type="primary"
       icon="el-icon-search"
      >查询</el-button>
    </div>
    <!-- table -->
    <el-table
    class="_table"
      :data="list"
      element-loading-text="数据加载中"
      stripe
      fit
      highlight-current-row
      style="width:1160px"
      v-loading="listLoading"
    >
      <!-- id -->
      <el-table-column
        align="center"
        label="#"
        type="index"
        width="60"
      >
      </el-table-column>
      <!-- 用户账号 -->
      <el-table-column
        align="center"
        label="用户账号"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.userAccount }}</span>
          <!-- 是否已删除 -->
          <el-tag type="info" v-if="scope.row.isDelete === '1'">
            {{ scope.row.isDelete | isDelFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 用户姓名 -->
      <el-table-column
        align="left"
        label="用户姓名"
        width="100"
        prop="userName"
      >
      </el-table-column>
      <!-- 用户性别 -->
      <el-table-column
        align="center"
        label="用户姓别"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.userSex | sexFilter }}</span>
        </template>
      </el-table-column>
      <!-- email -->
      <el-table-column
        align="center"
        label="手机号"
        width="200"
        prop="phone"
      >
      </el-table-column>
      <!-- 积分金额 -->
      <el-table-column
        align="center"
        label="积分金额"
        width="100"
        prop="frontScore"
      >
      </el-table-column>

      <!-- 创建时间 -->
      <el-table-column
      align="center"
      label="创建时间"
      width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | createdTimeFilter }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
      align="center"
      label="操作"
      width="100"
      >
      <template slot-scope="scope">
        <el-button
        size="mini"
        type="primary"
        @click="handleDetail(scope.row)"
        >详情</el-button>
      </template>
      </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination
      :limit.sync="listQuery.pageSize"
      :page.sync="listQuery.pageNum"
      :total="total"
      @pagination="fetchData"
      v-show="total>0"
    />
    <!-- 详情弹窗 -->
    <el-dialog
    title="用户详情"
    :visible.sync="dialogVis"
    >
    <div class="customer">
      <p><span>用户名：</span>{{ customer.userName }}</p>
      <p><span>用户账号：</span>{{ customer.userAccount }}</p>
      <p><span>用户性别：</span>{{ customer.userSex | sexFilter }}</p>
      <p><span>用户邮箱：</span>{{ customer.email }}</p>
      <p><span>积分金额：</span>{{ customer.score }}</p>
      <p><span>创建人：</span>{{ customer.createdBy }}</p>
      <p><span>手机号：</span>{{ customer.phone }}</p>
      <p><span>身份证：</span>{{ customer.idCard }}</p>
      <p><span>用户密码：</span>{{ customer.password }}</p>
      <p><span>用户id：</span>{{ customer.id }}</p>
      <p><span>更新时间：</span>{{ customer.createdTime | createdTimeFilter}}</p>
      <p><span>更新人：</span>{{ customer.createdBy }}</p>
    </div>
    <div slot="footer">
     <el-button
      type="primary"
      @click="dialogVis = false"
     >关闭</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getCustomerDetail } from '@/api/appUser'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'appUser',
  filters: {
    isDelFilter(code) {
      return ['未删除', '已删除'][parseInt(code)]
    },
    // 性别过滤
    sexFilter(code) {
      return ['女', '男', '未知'][parseInt(code)]
    },
    createdTimeFilter(code){
       return moment(code).format('YYYY-MM-DD');
    }

  },
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        userAccount: undefined,
        userName: undefined,
        // 是否是pc端用户 此页面只用于展示app端
        isAdmin: '0'
      },
      // 用户详情
      customer: {},
      dialogVis: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listQuery.pageNum = parseInt(response.data.pageNum)
        this.listQuery.pageSize = parseInt(response.data.pageSize)
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.fetchData()
    },
    handleDetail(row) {
      var _params ={
        id:row.id,
        isAdmin:0
      }
      getCustomerDetail(_params).then(response => {
        console.log(response);
        this.customer = response.data[0]
        this.dialogVis = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.customer{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  p{
    align-items: center;
    width: 40%;
    font-size: 20px;
  }
}
.customer::after{
  content: '';
  display: block;
  width: 35%;
}
  .filter-container{
    padding: 20px;
  }
  ._table{
    margin:0 16px;
  }
</style>
