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
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handleChange"
            :current-page="current"
            pager-count='5'
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
    return {
      current: 1
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
      getUserList: "list/getUserList"
    }),
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleChange(page) {
      console.log("page", page);
      this.getUserList({page})
    }
  }
};
</script>

<style>
</style>
