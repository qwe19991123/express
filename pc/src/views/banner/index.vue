<template>
  <div class="container">
    <!-- 筛选 -->
    <div class="search-container">
      <el-radio-group @change="handleSwichRadio" v-model="radioLabel">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="已启用"></el-radio-button>
        <el-radio-button label="已禁用"></el-radio-button>

      </el-radio-group>

    </div>

    <!-- 图片墙 -->
    <!-- TODO:mock图片上传 -->
    <!-- TODO:联调时实际地址 -->
   <el-upload action="http://localhost:3000/goods/uploadImage" list-type="picture-card" :file-list="list"
      :on-preview="handlePicPreview" :on-remove="handleRemove" :on-success="handleOnSuccess">

      <!-- 添加按钮 -->
      <i slot="default" class="el-icon-plus"></i>
      <!-- 自定义样式 -->
      <div slot-scope="{file}" slot="file" style="width:100%">
        <el-card :body-style="{padding:'0px',height:'100%'}">
          <el-image :class="{'disable-img':(file.picStatus == '2')}" class="image" :src="file.url" fit="cover">
          </el-image>
          <div style="padding: 10px;">
            <span class="img-id">{{file.id}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ file.updatedTime | datetimerFilter }}</time>
              <span class="pic-status">{{file.picStatus | picStatusFilter}}</span>
            </div>
          </div>
        </el-card>

        <!-- 悬停菜单 -->
        <span class="el-upload-list__item-actions">
          <!-- 预览 -->
          <span @click="handlePicPreview(file)" class="el-upload-list__item-preview">
            <i class="el-icon-zoom-in"></i>
          </span>

          <!-- 启用 -->
          <span v-if="file.picStatus == '2'" @click="handleUpdatePic(file,'1')" class="el-upload-list__item-preview">
            <i class="el-icon-video-play"></i>
          </span>


          <!-- 禁用 -->
          <span v-if="file.picStatus == '1'" @click="handleUpdatePic(file,'2')" class="el-upload-list__item-preview">
            <i class="el-icon-video-pause"></i>
          </span>

          <!-- 删除 -->
          <span @click="handleDeletePic(file)" class="el-upload-list__item-preview">
            <i class="el-icon-delete"></i>
          </span>

        </span>

      </div>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
  import {
    getList,
    addPic,
    updatePic,
    deletepic
  } from '@/api/banner'
// import { uploadImage } from '@/api/goods'
  // 引入日期处理插件
  import moment from 'moment'
  import {
    message
  } from 'element-ui';
  // 图片状态码表
  var picStatusMapper = [{
      key: '1',
      value: '已启用'
    },
    {
      key: '2',
      value: '已禁用'
    },
  ];

  var picStatusTypeKeyValue = picStatusMapper.reduce(
    (acc, cur) => {
      acc[cur.key] = cur.value;
      return acc
    }, {}
  )
  //   console.log(picStatusTypeKryvalue);


  export default {
    name: "banner",
    filters: {
      datetimerFilter(datetime) {
        // 期望的格式，20/05/20
        return moment(datetime).format('YY/M/DD')
      },

      //  图片状态过滤
      picStatusFilter(key) {
        return picStatusTypeKeyValue[parseInt(key)]
      }
    },
    data() {
      return {
        list: [],
        lisQuery: {
          picStatus: undefined
        },

        dialogImageUrl: '',
        dialogVisible: false,

        // 筛选
        radioLabel: '全部',
        picStatusTypeKeyValue: picStatusTypeKeyValue
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getList(this.lisQuery).then(response => {
          //   请求数据映射
          this.list = [];
          response.data.forEach(item => {
            this.list.push({
              id: item.id,
              name: item.name,
              url: item.images,
              picStatus: item.status,
              isDelete: item.isDelete,
              createdTime: item.createdTime,
              createdby: item.createdby,
              updatedTime: item.updatedTime,
              updatedby: item.updatedby
            })
          })
        })
      },

      // 预览
      handlePicPreview(file) {
        console.log(file);

        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      //   删除
      handleRemove(file) {
        console.log(file);
        debugger
      },

      // 修改图片状态
      handleUpdatePic(file, stus) {
        var O_parma = {
          id: file.id,
          picStatus: stus,
          loginAccount:loginAccount
        }
        var   d_parma = {
          id: file.id,
          picStatus: null,
          loginAccount:loginAccount
        }
        // TODO:判断只是为了模拟数据， 联调时删除

        if (stus) {
          // 修改
          updatePic(O_parma).then(response => {
            // TODO：联调时删除
            // 提示成功
            this.$notify({
              title: '成功',
              message: response.msg,
              type: 'success'
            })
            // TODO:联调时使用
           this.fetchData()
          })
        } else {
          // 修改状态
          // console.log(O_parma);
          updatePic(d_parma).then(response => {

            // 提示成功
            this.$notify({
              title: '成功',
              message: response.msg,
              type: 'success'
            })
            // TODO:联调时使用
           this.fetchData()
          })
        }
      },
      //删除
      handleDeletePic(file){
        deletepic({id:file.id}).then(response=>{
            this.$notify({
              title: '删除成功',
              message: response.msg,
              type: 'success'
            })
            this.fetchData()
        })
      },
      // 上传图片回调
      handleOnSuccess(response) {
        // console.log(response.data);

        var _url = response.data
        // var _url1 = 'http://'+_url.slice(0,25)+'/'+_url.slice(25)
        var _params = {
                picUrl:_url,
                status:1,
                loginAccount:loginAccount
        }
        // 调用新增图片接口
        addPic(_params).then(response => {
          // 提示信息
          this.$notify({
            title: '成功',
            message: response.msg,
            type: 'success'
          })
          //  TODO:联调时使用
           this.fetchData();
        })

      },
      // 筛选
      handleSwichRadio(label) {
        if (label == '全部') {
          this.lisQuery.picStatus = undefined
        }
        for (var key in this.picStatusTypeKeyValue) {
          if (picStatusTypeKeyValue[key] == label) {
            this.lisQuery.picStatus = key;
          }
        }
        this.fetchData();
      }
    }
  }

</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .img-id {
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    width: 100% !important;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .pic-status {
    font-size: 12px;
    /* 自己调过来 */
    font-weight: bold;
    text-align: right;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 80px;
    display: block;
  }

  .disable-img {
    filter: grayscale(100%);
    filter: gray;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>
