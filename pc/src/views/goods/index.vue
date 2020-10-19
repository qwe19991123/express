<template>
  <div class="app-container">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <!-- 商品名称 过滤首位空格-->
      <el-input class="filter-item" v-model="listQuery.skuName" placeholder="回车搜索商品名称" style="width:200px"
        @keyup.enter.native="handleFilter" />

      <!-- 商品状态 -->
      <el-select v-model="listQuery.skuStatus" clearable placeholder="请选择商品状态" style="width:160px">
        <el-option v-for="(item,index) in skuStatusMapper" :key="index+item" :label="item" :value="index">
        </el-option>
      </el-select>
      <el-input class="filter-item" v-model="listQuery.skuAd" placeholder="广告词搜索" style="width:200px" />
      <!-- 查询按钮 -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>

    <!-- 搜索条件结束 -->
    <div class="opertator-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate()">
        添加
      </el-button>
    </div>

    <!-- table 主体 具备如下：
      等待动画
      数据绑定
      等待提示
      边框
      列宽度自适应
      高亮当前行
     -->
    <el-table v-loading="listLoading" :data="list.slice((listQuery.pageNum-1)*listQuery.pageSize,listQuery.pageNum*listQuery.pageSize)" element-loading-text="数据加载中...." border fit highlight-current-row
      style="width:100%">
      <!-- 如果没有特殊要求，每条数据的id是不方便在前台展示的，前台的id是指展现列表中的索引 -->
      <el-table-column align="center" label="id" width="95" type="index">
      </el-table-column>
      <!-- 商品 附带展示是否被删除 -->
      <el-table-column label="商品名称" min-width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.skuName}}</span>
          <el-tag type="info" v-if="scope.row.isDelete === '0'" effect='plain'>{{scope.row.isDelete | isDelFilter}}
          </el-tag>
        </template>
      </el-table-column>

      <!-- 定价 标点符号一定要是英文半角的 显示金额右对齐才好看-->
      <el-table-column label="定价(￥)" width="70" align="right">
        <!-- 添加点击事件，点击后可以对比显示售价和定价 -->
        <template slot-scope="scope">
          <span>{{ scope.row.costPrice}}</span>
        </template>
      </el-table-column>

      <!-- 广告词 -->
      <el-table-column label="广告词" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.skuAd}}
        </template>
      </el-table-column>

      <!-- 商品状态 -->
      <el-table-column class-name="status-col" prop="skuSatus" label="商品状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.skuStatus | statusTypeFilter">{{ scope.row.skuStatus| skuStatusFilter}}</el-tag>
        </template>
      </el-table-column>

      <!-- 创建事件 -->
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <!-- 点击显示所有相关时间 -->
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{scope.row.createdTime | datetimeFilter}}</span>
        </template>
      </el-table-column>

      <!-- 创建人 -->
      <el-table-column align="center" prop="skuName" label="创建人" width="80">
      </el-table-column>

      <!-- 书号 -->
      <el-table-column align="center" prop="ISBN" label="书号" width="100">
      </el-table-column>

      <!-- 操作栏  根据当前行的不同状态操作过滤 多个按钮 左对齐好看-->
      <el-table-column align="left" prop="created_at" label="操作" width="250">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button type="primary" size="mini" @click="handleupdate(scope.row)">编辑</el-button>

          <!-- 发布 -->
          <el-button v-if="scope.row.skuStatus == '2'" type="success" size="mini" @click="handlePutway(scope.row,'0')">
            发布</el-button>

          <!-- 下架 -->
          <el-button v-if="scope.row.skuStatus == '0'" size="mini" @click="handlePutway(scope.row,'1')">下架</el-button>

          <!-- 上架 -->
          <el-button v-if="scope.row.skuStatus == '1'" type="warning" size="mini" @click="handlePutway(scope.row,'0')">
            上架</el-button>

          <!-- 删除 -->
          <el-button v-if="scope.row.isDelete !== '0'" type="danger" size="mini" @click="deletdate(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- table主体结束 -->
    <!-- 分页 -->
    <Pagination :limit.sync="listQuery.pageSize" :page.sync="listQuery.pageNum" :total="total" @pagination="fetchData" />


    <!--
      1.有哪些是子组件自有的
      2.有哪些是从父组件向子组件传递的
      2.有哪些是从子组件向父组件传递的
      -->

    <!-- 组件 -->
    <AddOrEidtDialog :addFormVisible.sync="addFormVisible" :addFormStatus="addFormStatus" @fetch="fetchData"
      :updateGoods="currentRow" />

  </div>
</template>

<script>
  import moment from 'moment'
  // 商品接口
  import {
    getList,
    deletGood,
    findGood,
    updateSkuStus
  } from '@/api/goods'

  // 添加编辑弹窗
  import AddOrEidtDialog from './AddOrEidtDialog'

  // 分页
  import Pagination from '@/components/Pagination'

  // 各种码表
  // 商品状态码表
  var skuStatusMapper = ["在售", "已下架", "未发布"];

  export default {
    components: {
      Pagination,
      AddOrEidtDialog
    },
    filters: {
      // 商品状态样式
      statusTypeFilter(status) {
        const statusTypeMap = ['success', 'danger', 'info']

        return statusTypeMap[status]
      },
      // 商品状态码表
      skuStatusFilter(code) {
        var skuStatus = ["在售", "已下架", "未发布"]
        return skuStatus[parseInt(code)]

      },
      // 是否删除
      isDelFilter(flag) {
        var isDelMap = ["已删除", "未删除"]
        return isDelMap[parseInt(flag)]
      },

      skuStatusMapper(status) {
        return skuStatusMapper[parseInt(status)]
      },
      // 时间格式化
      datetimeFilter(datetime) {
        return moment(datetime).format("YYYY-MM-DD")
      }
    },
    data() {
      return {
        list: null,
        listLoading: true,
        // 关于分页
        total: 0,
        // 查询条件
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          // 可增加其他搜索条件
          skuAd:undefined,
          skuName: undefined,
          skuStatus: undefined
        },
        // 商品状态码表
        skuStatusMapper,
        // 添加弹窗的数据
        // 弹窗的状态
        addFormStatus: '',
        //弹窗的可见性
        addFormVisible: false,
        DeleteVisible: false,

        currentRow: null
      }

    },
    // 在组件加载完毕之后
    created() {
      // 获取table数据
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
          this.skuStatus=undefined
        })
      },
      handleFilter() {
        // alert(123);
        // 跳转到第一页
        this.listQuery.page = 1
        this.fetchData()
      },

      // 页面当中的方法是操作dom,一般以handle(点击添加按钮)
      handleCreate() {
        // 弹出模拟窗
        this.addFormStatus ='create';
        this.addFormVisible = true;
      },

      // 编辑按钮
      handleupdate(row) {
        var _parmas = {
          skuCode: row.skuCode
        }
        // 调用详情接口
        findGood(_parmas).then(response => {
          // 向下传递数据
          this.currentRow = response.data[0]
          //  console.log(this.currentRow);
          //  debugger
          // 改变弹窗状态
          this.addFormStatus = 'update';
          this.addFormVisible = true;
        })
      },

      //删除按钮
      deletdate(row) {
        var _parmas = {
          skuCode: row.skuCode
        }
        // 调用删除接口
        deletGood(_parmas).then(response => {
          // 成功：写个假操作
          // TODO：连调时删除
          // var _index = this.list.indexOf(row);
          // this.list.splice(_index, 1);
          // TODO：联调时打开
          this.fetchData()
          //  提示信息
          this.$notify({
            title: '成功',
            message: response.msg,
            type: 'success',
          })
        })
      },


      // TODO:联调时删除
      // fakeAddGoods(goodData) {
      //   this.list.unshift(goodData)
      // },
      // TODO：联调时删除
      // fakeUpdataGood(data) {
      //   // 从前台模拟模拟数据的修改，TODO：调用时删除
      //   this.list.forEach(item => {
      //     //使用商品的唯一标识
      //     if (item.skuCode === data.skuCode) {
      //       var _index = this.list.indexOf(item);
      //       // 对数组的指定位置元素进行替换
      //       this.list.splice(_index, 1, data)
      //     }
      //   });
      // },

      // 修改商品状态
      handlePutway(row,status) {
        var _parmas = {
          skuCode: row.skuCode,
          status: status
        }
        // 调用修改商品状态接口
        updateSkuStus(_parmas).then(response => {
          // TODO:前台模拟更新状态
          // console.log(response.data);
          // debugger
          // this.list.forEach(item => {
          //   //使用商品的唯一标识
          //   if (item.skuCode === row.skuCode) {
          //     var _index = this.list.indexOf(item);
          //     // 对数组的指定位置元素进行替换
          //     this.list[_index].skuStatus = status
          //   }
          // });
          // TODO:联调时打开
          this.fetchData()
          // 提示信息
          this.$notify({
            title: '成功',
            message: response.msg,
            type: 'success',
          })
        })
      }

    },

  }

</script>

<style lang="scss" scoped>
  .filter-container {
    // border: 1px red solid;
    // height: 100px;
    padding: 10px 0 20px 0;
  }

  .opertator-container {
    margin-bottom: 6px
  }

  // .filter-item{

  // }

</style>
