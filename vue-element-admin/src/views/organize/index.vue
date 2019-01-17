<template>
    <div>
        <h1>{{this.$route.path}}</h1>
        <div class="block">
            <el-tree
                :data="newData"
                show-checkbox
                ref="tree"
                node-key="id"
                draggable=""
                default-expand-all
                :expand-on-click-node="false"
            >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.data.name }}</span>
                    <span>
                        <el-button
                            type="text"
                            size="mini"
                            v-permission="['staff']"
                            @click="() => append(node,data)"
                        >Append</el-button>
                        <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <el-dialog title="添加职位" :visible.sync="dialogVisible">
            <el-form>
                <el-form-item label="名称">
                    <el-input v-model="temp" placeholder="请输入你要添加的职位"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      temp: "",
      current: {},
      newData: [],
      organize: [
        {
          id: 1,
          name: "***事业部",
          parentid: ""
        },
        {
          id: 2,
          name: "***事业部",
          parentid: ""
        },
        {
          id: 3,
          name: "总经办",
          parentid: ""
        },
        {
          id: 4,
          name: "技术研发",
          parentid: 1
        },
        {
          id: 5,
          name: "产品研发",
          parentid: 1
        },
        {
          id: 6,
          name: "市场渠道",
          parentid: 1
        },
        {
          id: 7,
          name: "商业合作",
          parentid: 1
        },
        {
          id: 8,
          name: "前端开发",
          parentid: 4
        },
        {
          id: 9,
          name: "后端开发",
          parentid: 4
        },
        {
          id: 10,
          name: "ios开发",
          parentid: 4
        },
        {
          id: 11,
          name: "android开发",
          parentid: 4
        },
        {
          id: 12,
          name: "测试",
          parentid: 4
        },
        {
          id: 13,
          name: "运维",
          parentid: 4
        },
        {
          id: 14,
          name: "设计",
          parentid: 4
        },
        {
          id: 15,
          name: "产品",
          parentid: 5
        },
        {
          id: 16,
          name: "运营",
          parentid: 5
        },
        {
          id: 17,
          name: "产品总监",
          parentid: 15
        },
        {
          id: 18,
          name: "产品经理",
          parentid: 15
        },
        {
          id: 19,
          name: "资深前端开发",
          parentid: 8
        },
        {
          id: 20,
          name: "高级前端开发",
          parentid: 8
        },
        {
          id: 21,
          name: "初级前端开发",
          parentid: 8
        },
        {
          id: 22,
          name: "孙月",
          parentid: 20
        }
      ]
    };
  },
  computed: {
    data() {
      return this.formatData(this.organize);
    }
  },
  methods: {
    formatData(arr) {
      let newArr = [];
      arr.forEach(item => {
        if (!item.parentid) {
          newArr.push(item);
        } else {
          this.findItem(newArr, item);
        }
      });
      this.newData = newArr;
      // return newArr;
    },
    //递归查找当前项的父元素
    findItem(arr, item) {
      arr.forEach(value => {
        if (value.id == item.parentid) {
          if (value.children) {
            value.children.push(item);
          } else {
            value.children = [item];
          }
        } else if (value.children) {
          this.findItem(value.children, item);
        }
      });
    },
    append(node, data) {
      console.log("node", node, data);
      this.dialogVisible = true;
      this.current = {
        node,
        data
      };
    },
    remove(node, data) {
      this.$refs.tree.remove(node);
    },
    addSubmit() {
      this.dialogVisible = false;
      if (this.temp) {
        let newData = {
          id: this.organize[this.organize.length - 1].id + 1,
          name: this.temp,
          parentid: this.current.data.id
        };
        this.organize.push(newData)
        this.$refs.tree.append(newData,this.current.node)
        this.temp=''
      }
    }
  },
  created() {
    this.formatData(this.organize);
  }
};
</script>

<style>
</style>
