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
      style="width:1360px"
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
        prop="userAccount"
      >
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
      <!-- 手机号 -->
      <el-table-column
      align="center"
      label="手机号"
      width="100"
      prop="phone"
      >
      </el-table-column>
      <!-- 身份证 -->
      <el-table-column
      align="center"
      label="身份证"
      width="200"
      prop="idCard"
      >
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
      align="center"
      label="操作"
      width="300"
      >
      <template slot-scope="scope">
        <el-button
        size="mini"
        type="primary"
        @click="handleDetail(scope.row)"
        >详情</el-button>
        <el-button
        size="mini"
        type="warning"
        @click="handleChange(scope.row)"
        >修改</el-button><el-button
        size="mini"
        type="danger"
        @click="handleDelete(scope.row)"
        >删除</el-button>
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
      <p><span>手机号：</span>{{ customer.phone }}</p>
      <p><span>身份证：</span>{{ customer.idCard }}</p>
      <p><span>用户密码：</span>{{ customer.password }}</p>
      <p><span>用户id：</span>{{ customer.id }}</p>
      <p style="visibility:hidden"><span>用户id：</span>{{ customer.id }}</p>
    </div>
    <div slot="footer">
     <el-button
      type="primary"
      @click="dialogVis = false"
     >关闭</el-button>
    </div>
    </el-dialog>
        <!-- 修改弹窗 -->
    <el-dialog
    title="修改信息"
    :visible.sync="dialogVis1"
    >
    <el-form
            class="customer"
            ref="form"
            :model="customer"
            :rules="formRules"
            label-width="110px"
     >
            <el-form-item label="用户账号" style="width:49%" prop="userAccount">
              <el-input v-model="customer.userAccount"></el-input>
            </el-form-item>
            <el-form-item label="用户姓名" style="width:49%" prop="userName">
              <el-input v-model="customer.userName"></el-input>
            </el-form-item>
            <el-form-item label="用户性别" style="width:49%" prop="userSex">
              <el-select v-model="customer.userSex">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
                <el-option label="未知" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号" style="width:49%" prop="phone">
              <el-input v-model="customer.phone"></el-input>
            </el-form-item>
            <el-form-item label="身份证" style="width:49%" prop="idCard">
              <el-input v-model="customer.idCard"></el-input>
            </el-form-item>
            <el-form-item label="密码" style="width:49%" prop="password">
              <el-input v-model="customer.password"></el-input>
            </el-form-item>
            <el-form-item label="id" style="width:49%" prop="id">
              <el-input v-model="customer.id"></el-input>
            </el-form-item>
            <el-form-item label="id" style="width:49%;visibility:hidden" prop="id">
              <el-input v-model="customer.id"></el-input>
            </el-form-item>
            <el-form-item style="margin-left: auto;">
              <el-button  @click="dialogVis = false">取消</el-button>
              <el-button type="primary" @click="submit">确定</el-button>
            </el-form-item>

          </el-form>
    </el-dialog>
  </div>
</template>

<script>
var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
import { getList, getCustomerDetail,deleteCustomer,updateCustomerById } from '@/api/user'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'appUser',
  filters: {
    // 性别过滤
    sexFilter(code) {
      return ['女', '男', '未知'][parseInt(code)]
    },
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
        userAccount:'',
        userName:'',
        isAdmin: '1'
      },
      // 用户详情
      customer: {},
      dialogVis: false,
      dialogVis1: false,
      formRules:{
        userAccount:[
          {
            required:true,
            message:'请输入账号',
            trigger:'blur'
          }
        ],
        userName:[
          {
            required:true,
            message:'请输入姓名',
            trigger:'blur'
          }
        ],
        userSex:[
          {
            required:true,
            message:'请输入性别',
            trigger:'blur'
          }
        ],
        phone:[
          {
            required:true,
            message:'请输入手机',
            trigger:'blur'
          }
        ],
        idCard:[
          {
            required:true,
            message:'请输入身份证',
            trigger:'blur'
          }
        ],
        password:[
          {
            required:true,
            message:'请输入密码',
            trigger:'blur'
          }
        ],
        id:[
          {
            required:true,
            message:'请输入id',
            trigger:'blur'
          }
        ],
      }
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
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.fetchData()
    },
    handleDetail(row) {
      var _params = {
          id:row.id,
          isAdmin:1
      }
      getCustomerDetail(_params).then(response => {
        this.customer = response.data[0]
        this.dialogVis = true
      })
    },
    handleDelete(row){
      var _params = {
          id:row.id,
          isAdmin:1
      }
      deleteCustomer(_params).then(response => {
         this.$notify({
              title:'删除成功',
              message:response.msg,
              type:'success',
            });
            this.fetchData()
      })
    },
    handleChange(row){
       var _params = {
          id:row.id,
          isAdmin:1
      }
      getCustomerDetail(_params).then(response => {
        this.customer = response.data[0]
        this.dialogVis1 = true
      })
    },
    submit(){
      var _params = {
        userAccount:this.customer.userAccount,
        userName:this.customer.userName,
        userSex:this.customer.userSex,
        phone:this.customer.phone,
        idCard:this.customer.idCard,
        password:this.customer.password,
        isAdmin:"1",
        loginAccount:loginAccount,
        id:this.customer.id,
      }
      updateCustomerById(_params).then(response=>{
          this.$notify({
                      title:'修改成功',
                      message:response.msg,
                      type:'success',
                    });
                    this.dialogVis = false
            this.fetchData()
            this.dialogVis1 = false
      })
    },

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
.filter-container{
    padding: 20px;
  }
._table{
    margin:0 16px;
  }

</style>
