<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column label="头像" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="width:100%">
        </template>
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="propfile" label="简介" width="140"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="100"></el-table-column>
      <el-table-column prop="address" label="地址" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
            <el-form :model="currentUser" :rules="Rules" ref="form">
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="username">
                <el-input v-model="currentUser.username"></el-input>
              </el-form-item>
              <el-form-item label="头像" :label-width="formLabelWidth">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="简介" :label-width="formLabelWidth" prop="profile">
                <el-input v-model="currentUser.profile"></el-input>
              </el-form-item>
              <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="currentUser.phone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="currentUser.email"></el-input>
              </el-form-item>
              <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
                <el-input v-model="currentUser.address"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="Submit">确 定</el-button>
            </div>
          </el-dialog>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleChange"
      :current-page="current"
      layout="prev, pager, next"
      :total="100"
      style="margin-left:40%"
    ></el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "User",
  data() {
    const propfileValidator = (rule, value, callback) => {
      if (!value || value.length < 10) {
        callback(new Error("个人简介字数过少"));
      } else {
        callback();
      }
    };
    const phoneValidator = (rule, value, callback) => {
      if (
        !/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[89])[0-9]{8}$/.test(
          value
        )
      ) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    const emailValidator = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        callback(new Error("请输入正确的邮箱地址"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      current: 1,
      currentUser: {},
      imageUrl: "",
      Rules: {
        username: [
          { trigger: "blur", required: true, message: "用户名须必填" }
        ],
        propfile: [
          { trigger: "blur", required: true, validator: propfileValidator }
        ],
        phone: [{ trigger: "blur", required: true, validator: phoneValidator }],
        email: [{ trigger: "blur", required: true, validator: emailValidator }],
        address: [{ trigger: "blur", required: true, message: "地址必填" }]
      }
    };
  },
  computed: {
    ...mapState({
      tableData: state => state.list.list
    })
  },
  created() {
    this.getUserList();
  },
  methods: {
    ...mapActions({
      getUserList: "list/getUserList",
      updateUserInfo: "list/updateUserInfo"
    }),
    handleEdit(index, row) {
      this.currentUser = row;
      this.dialogFormVisible = true;
      console.log(index, row, this.currentUser);
    },
    handleDelete(index, row) {
      this.dialogVisible = true;
      console.log(index, row);
    },
    handleChange(page) {
      console.log("page", page);
      this.current = page;
      this.getUserList({ page });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {},
    Submit() {
      this.dialogFormVisible = false;
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log("current", this.currentUser);
          let {
            id,
            username,
            profile,
            email,
            phone,
            address
          } = this.currentUser;
          this.updateUserInfo({
            id,
            username,
            profile,
            email,
            phone,
            address
          })
            .then(res => {
              console.log("res", res);
              this.$message({
                message: res,
                center: true,
                type: "success"
              });
              this.getUserList({ page: this.current });
            })
            .catch(error => {
              this.$message({
                message: error,
                center: true,
                type: "error"
              });
            });
        }
      });
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 24px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
