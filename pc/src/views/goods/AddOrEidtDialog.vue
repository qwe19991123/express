<template>
  <div>
    <el-dialog :title="addFormStatus == 'create'?'新建商品':'编辑商品'" :visible.sync="visible" @close="closeDialog">
      <!-- 商品添加表单 -->
      <el-form :rules="rules" ref="goodsForm" label-width="100px" label-position="right" :model="goodsFormTemp">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称" prop="skuName">
              <el-input v-model="goodsFormTemp.skuName" placeholder="请输入20个字符以内的名称" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="ISBN" prop="isbn">
              <el-input v-model.number="goodsFormTemp.ISBN" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="商品分类">
              <!-- 用级联菜单显示商品类别层级 -->
              <el-cascader v-model="cateCascader.value" :options="cateCascader.options" @change="handleCascaderChange"
                style="width:100%">
              </el-cascader>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="广告词" prop="skuAd">
              <el-input type="textarea" v-model="goodsFormTemp.skuAd" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="商品介绍">
              <el-input type="textarea" v-model="goodsFormTemp.skuIntroduction" />
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item label="商家编码">
              <el-select v-model="goodsFormTemp.businessCode" @change="handleBusinessChange">
                <el-option :key="index" :label="item.business_name" :value="item.business_code"
                  v-for="(item,index) in businessCodeMapper">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="库存">
              <el-input v-model.number="goodsFormTemp.storeNum" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="商品图片" prop="storeNum">
              <el-upload :file-list="fileList" action="http://localhost:3000/goods/uploadImage"
                list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                :on-success="OnSuccess" :limit="5">
                <i class="el-icon-plus"></i>
              </el-upload>

              <!-- 展示图片弹窗 -->
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <!-- 定价 -->
            <el-form-item label="定价" prop="frontCostPrice">
              <el-input v-model.number="goodsFormTemp.frontCostPrice" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 售价 -->
            <el-form-item label="售价" prop="frontSalePrice">
              <el-input v-model.number="goodsFormTemp.frontSalePrice" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>

        </el-row>
        <el-row v-if="addFormStatus == 'create'">
          <el-col>
            <el-form-item label="商品状态" prop="">
              <el-radio-group v-model="goodsFormTemp.skuStatus">
                <el-radio :label="0">在售(已发布)</el-radio>
                <el-radio :label="2">未发布</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="addFormStatus == 'update'">
          <el-col :span="12">
            <!-- 浏览量 -->
            <el-form-item label="浏览量" prop="visiteNum">
              <el-input v-model.number="goodsFormTemp.visiteNum" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 销售量-->
            <el-form-item label="销售量" prop="saleNum">
              <el-input v-model.number="goodsFormTemp.saleNum" />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="addFormStatus == 'create'? createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // 商品接口
  import {
    addGood,
    updateGood,
    getBusiness,
    uploadImage
  } from '@/api/goods'

  // 商品类别接口
  import {
    getCate
  } from '@/api/cate'

  export default {
    name: 'AddOrEidtDialog',
    data() {
      return {
        visible: this.addFormVisible,

        // 表单数据绑定
        goodsFormTemp: {
          skuName: '',
          costPrice: '',
          skuAd: undefined,
          skuStatus: '',
          skuCode: '',
          salePrice: 0,
          frontCostPrice: 0,
          frontSalePrice: 0,
          saleNum: 0,
          ISBN: null,
          firstCateName: null,
          secondCateName: null,
          visiteNum: 0,
          skuIntroduction: undefined,
          businessCode: '',
          storeNum: 0,
          images: []
        },
        // 表单校验
        rules: {
          skuName: [{
              required: true,
              message: '请输入商品名称',
              trigger: 'blur'
            },
            {
              max: 20,
              message: '请输入商品名称过长',
              trigger: 'blur'
            }
          ],
          ISBN: [{
              required: true,
              message: '请输入ISBN码',
              trigger: 'blur'
            },
            {
              type: 'number',
              message: '必须为数字',
              trigger: 'blur'
            }
          ],
          storeNum: [{
              required: true,
              message: '请输入库存',
              trigger: 'blur'
            },
            {
              type: 'integer',
              message: '请输入正确的数字',
              trigger: 'blur'
            }
          ],
          visiteNum: [{
              required: true,
              message: '请输入浏览量',
              trigger: 'blur'
            },
            {
              type: 'integer',
              message: '请输入正确的数字',
              trigger: 'blur'
            }
          ],
          saleNum: [{
              required: true,
              message: '请输入销售量',
              trigger: 'blur'
            },
            {
              type: 'integer',
              message: '请输入正确的数字',
              trigger: 'blur'
            }
          ],
          skuStatus: [{
            required: true,
            message: '请选择商品状态',
            trigger: 'blur'
          }]
        },
        // 商品类别级联选择器
        cateCascader: {
          value: [],
          options: []
        },
        // 商家信息码表
        businessCodeMapper: [],
        // 用于展示图片
        fileList: [],
        // 图片预览
        dialogVisible: false,
        dialogImageUrl: '',

      }
    },
    props: {
      // 弹窗可见性
      addFormVisible: {
        type: Boolean,
        default: false
      },
      //弹窗的状态
      addFormStatus: {
        type: String,
        default: ''
      },
      //  编辑时，父组件传递数据
      updateGoods: {
        type: Object
      }
    },

    watch: {
      addFormVisible: function () {
        // 切换可见性
        this.visible = this.addFormVisible
        this.handleCreate()

        if (this.addFormStatus == 'update') {
          // 如果是更新的话，把数据绑定在表单上
          this.goodsFormTemp = Object.assign({}, this.updateGoods);
          this.fileList = this.goodsFormTemp.images.split(',').reduce((acc, cur, index) => {
            acc.push({
              name: index,
              url: cur
            })
            return acc
          }, [])
          // 取消校验
          this.$nextTick(() => {
            this.$refs.goodsForm.clearValidate()
          })
        }
      }
    },

    methods: {
      // 关闭窗口
      closeDialog() {
        // 向上传递可见性
        this.$emit('update:addFormVisible', false)
      },

      // 页面当中的获取码表和信息
      handleCreate() {
        // 重置表单内容
        this.resetGoodsTemp();
        // 获取商品分类
        getCate().then(response => {
          var cateData = response.data;
          // 将类别数据进行格式化
          this.cateCascader.options = cateData.reduce((acc, cur) => {
            // 子节点只取到2级菜单，便于app显示
            var _children = [];

            // 如果没有子节点就返回Null
            if (cur.attribute) {
              cur.attribute.forEach(item => {
                _children.push({
                  label: item.cateName,
                  value: item.cateName
                })
              })
            }
            acc.push({
              label: cur.cateName,
              value: cur.cateName,
              children: _children
            })
            return acc
          }, [])
        })

        // 查询全部
        getBusiness().then(response => {
          this.businessCodeMapper = response.data
        })

        // 禁用表单校验
        this.$nextTick(() => {
          // 在弹窗加载之初，是不需要进行校验
          // 找到form
          this.$refs.goodsForm.clearValidate();
        });
      },

      // 重置表单内容
      resetGoodsTemp() {
        this.goodsFormTemp = {
          skuName: '',
          costPrice: '',
          skuAd: undefined,
          skuStatus: '',
          skuCode: '',
          salePrice: '',
          frontCostPrice: '',
          frontSalePrice: '',
          saleNum: 0,
          ISBN: '',
          firstCateName: null,
          secondCateName: null,
          visiteNum: 0,
          skuIntroduction: undefined,
          businessCode: '',
          storeNum: 0,
          images: []
        }
      },

      // 商品类别选择
      handleCascaderChange(value) {
        this.goodsFormTemp.firstCateName = value[0]
        this.goodsFormTemp.secondCateName = value[1]
      },

      // 商家选择
      handleBusinessChange(value) {
        this.goodsFormTemp.businessCode = value
      },

      // 图片预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 图片删除
      handleRemove(file) {
        this.goodsFormTemp.images.forEach((item,index)=>{
            if(item==file.response.data){
              this.goodsFormTemp.images.splice(index,1)
            }
        })
      },
      // 图片上传
      OnSuccess(res) {
        this.goodsFormTemp.images.push(res.data)
      },

      // 新增商品
      createData() {
        this.$refs.goodsForm.validate(valid => {
          if (valid) {
            var goodData = {
              ...this.goodsFormTemp,
              costPrice: this.goodsFormTemp.frontCostPrice + '',
              salePrice: this.goodsFormTemp.frontSalePrice + '',
              saleNum: this.goodsFormTemp.saleNum + '',
              skuStatus: this.goodsFormTemp.skuStatus + '',
              storeNum: this.goodsFormTemp.storeNum + '',
              ISBN: this.goodsFormTemp.ISBN + '',
              business_code: this.goodsFormTemp.businessCode + ''
              // isDelete: this.goodsFormTemp.IsDelete + ""
            }
            // 调用请求接口
            addGood(goodData).then(
              response => {
                // 在前台中模拟一条数据，浏览器刷新后消失
                // TODO：联调时删除
                // this.$emit('fakeAddGoods', goodData)
                // 关闭弹窗
                this.closeDialog();

                // TODO:联调时打开
                this.$emit('fetch')

                // 提示信息
                this.$notify({
                  title: "成功",
                  message: response.msg,
                  type: 'success',
                })

              }
            )

          }

        })
      },

      // 更新数据
      updateData() {
        this.$refs.goodsForm.validate(valid => {
          if (valid) {
            // 复制一份
            var tempData = Object.assign(
              this.goodsFormTemp, {
                skuStatus: '0',
                costPrice: this.goodsFormTemp.frontCostPrice + '',
                salePrice: this.goodsFormTemp.frontSalePrice + '',
              }
            );
            // 请求接口
            updateGood(tempData).then(response => {
              // 从前台模拟模拟数据的修改，TODO：调用时删除
              // this.$emit('fakeUpdataGood', tempData)

              // 关闭弹窗
              this.closeDialog();

              // TODO:联调时打开
              this.$emit('fetch')

              // 提示信息
              this.$notify({
                title: '成功',
                message: response.msg,
                type: 'success',

              })
            })
          }
        })
      },


    }
  }

</script>

<style>

</style>
