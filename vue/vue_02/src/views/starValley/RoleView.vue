<template>
    <div>
        <el-container style="height: 700px; border: 1px solid #eee">
            <el-header style="font-size:40px;background-color:rgb(238, 241, 246)">星露谷物语</el-header>
                <el-container>
                <el-aside width="140px" style="height:700px;border: 1px solid #eee">

                <el-menu :default-openeds="['1', '3']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>基本信息</template>

                    <el-menu-item index="1-1">
                        <router-link to="/role" >
                          主要npc  
                        </router-link>
                    </el-menu-item>
                    <el-menu-item  index="1-2">
                        <router-link  to="/dept">
                          动物  
                        </router-link>
                    </el-menu-item>

                </el-submenu>
                
                </el-menu>
            </el-aside>

                <el-main>
                    <!-- 表单 -->
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="searchName" placeholder="姓名人"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="searchForm.gender" placeholder="性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-date-picker  
                v-model="searchForm.entrydate" 
                type="daterange"  
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>



                <!-- 按照名字查询 -->
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()" >查询</el-button>
                </el-form-item>




                <el-button type="warning" @click="addRole()" >添加</el-button>
                <!-- Table -->
                

                
            
                </el-form>

                <el-dialog title="详细信息" :visible.sync="dialogTableVisible" width="900px">
                <el-table :data="tableDataTemp">
                    <el-table-column property="tName" label="姓名" width="150"></el-table-column>
                    <el-table-column property="tGender" label="性别" width="200"></el-table-column>
                    <el-table-column property="tJob" label="职位"></el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="ok()">确 定</el-button>
                </span>
                </el-dialog>

                <el-dialog title="详细信息" :visible.sync="dialogTableVisibleAdd" width="600px">
                <el-table :data="tableDataCur">
                    
                    <el-table-column prop="CName" label="姓名" width="150">
                        
                        
                        
                    </el-table-column>
                    <el-table-column prop="CGender" label="性别" width="200">
                        
                        
                    </el-table-column>
                    <el-table-column prop="CJob" label="是否已婚">  
                    </el-table-column>
                    <el-table-column prop="CJob" label="爱好">  
                    </el-table-column>
                    <el-table-column prop="CJob" label="工作">      
                    </el-table-column>
                    
                </el-table>
                <span slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="ok()">确 定</el-button>
                </span>
                </el-dialog>

                <!-- 人物详细 -->
                <el-dialog title="详细信息" :visible.sync="dialogVisibleMore" width="30%">
                    <span v-bind="roleMoreInform">{{ roleMoreInform }}}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancel()">取 消</el-button>
                        <el-button type="primary" @click="ok()">确 定</el-button>
                    </span>
                </el-dialog>




                <!-- 增加人物 -->
                <el-dialog title="人物添加" :visible.sync="dialogVisibleAddRole" width="30%">
                    <el-form :data="addRoleForm" label-width="80px">
                    <el-form-item label="姓名">
                        <el-input v-model="addRoleForm.name"></el-input>
                    </el-form-item>

                    <el-form-item label="图像">
                        <el-input v-model="addRoleForm.img"></el-input>
                    </el-form-item>

                    <el-form-item label="性别" size="small">
                        <el-select v-model="addRoleForm.gender" placeholder="请选择性别">
                            <el-option label="男" value=1></el-option>
                            <el-option label="女" value=2></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="是否已婚" size="small">
                        <el-select v-model="addRoleForm.isMarried" placeholder="请选择">
                            <el-option label="已婚" value=1></el-option>
                            <el-option label="未婚" value=0></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="爱好">
                        <el-input v-model="addRoleForm.hobby"></el-input>
                    </el-form-item>

                    <el-form-item label="工作">
                        <el-input v-model="addRoleForm.job"></el-input>
                    </el-form-item>

                    <el-form-item label="生日">
                        <el-input v-model="addRoleForm.birthday"></el-input>
                    </el-form-item>

                    <el-form-item label="描述">
                        <el-input v-model="addRoleForm.description"></el-input>
                    </el-form-item>
                
                    <el-form-item>
                        <el-button type="primary" @click="subAddRole">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                    </el-form>
                </el-dialog>




                <el-table :data="roleData" border >
                <el-table-column prop="name" label="姓名" width="100" >
                    <template slot-scope="scope">
                        <span v-show="!(scope.row.roleEditFlag)">{{scope.row.name}}</span>
                        <el-input v-show="scope.row.roleEditFlag"
                                    v-model="scope.row.name">
                        </el-input>
                    </template>

                </el-table-column>

                <el-table-column label="图像" width="140">
                    <template slot-scope="scope">
                        <img :src= "scope.row.img" width="100px" height="70px">
                    </template>
                </el-table-column>


                <el-table-column label="性别" width="40">
                    <template slot-scope="scope">
                        {{ scope.row.gender==1?'男':'女' }}
                    </template>
                </el-table-column>

                <el-table-column label="婚姻状况" width="50">
                    <template slot-scope="scope">
                        {{ scope.row.isMarried==1?'已婚':'未婚' }}
                    </template>
                </el-table-column>

                <!-- <el-table-column prop="isMarried" label="是否已婚" width="40"></el-table-column> -->
                <el-table-column prop="hobby" label="爱好" width="140"></el-table-column>
                <el-table-column prop="job" label="工作" width="140"></el-table-column>
                <el-table-column prop="birthday" label="生日" width="150"></el-table-column>
                <el-table-column label="描述" width="130">
                <template slot-scope="scope">   
                <el-button type="primary" size="mini" @click="moreInform(scope.$index, scope.row)">详细</el-button>
                </template>
                </el-table-column>
                <el-table-column label="操作" >
                <template slot-scope="scope">   
                <el-button v-if="!scope.row.roleEditFlag" type="primary" size="mini" @click="updateRole(scope.$index, scope.row)">修改</el-button>
                <el-button v-if="scope.row.roleEditFlag" type="primary" size="mini" @click="saveUpdateRole(scope.$index, scope.row)">保存</el-button>
                <el-button v-if="!scope.row.roleEditFlag" type="danger" size="mini" @click="deleteRoleByName(scope.$index,scope.row)">删除</el-button>
                <el-button v-if="scope.row.roleEditFlag" type="danger" size="mini" @click="cancelUpdate(scope.$index,scope.row)">取消</el-button>

                </template>
                </el-table-column>
                </el-table>
                <br>

                <!-- 分页-->
                  <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[3, 4, 5, 6]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalData">
                  </el-pagination>

                </el-main>

                </el-container>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios';



export default {
    data(){
        return{
            tableData:[],
            roleData:[],
            searchForm:{
                name:"",
                gender:"",
                entrydate:[]
            },
            tableDataTemp:[{
                tName:"",
                tGender:"",
                tJob:""
            }],
            tableDataCur:[{
                CName:"",
                CGender:"",
                CJob:""
            }],
            roleMoreInform:[],
            addRoleForm:[{
                name:"",
                img:"",
                gender:"",
                isMarried:"",
                hobby:"",
                job:"",
                birthday:"",
                description:""
            }],
            searchName:"",
            dialogTableVisible:false,
            dialogTableVisibleAdd:false,
            dialogVisibleMore:false,
            dialogVisibleAddRole:false,
            test:false,
            totalData:0,
            currentPage:1,
            pageSizes:[3,4,5,6],
            pageSize:3
        }
    },
    methods:{
        onSubmit:function(){
            axios({
                            url:"http://localhost:8080/role/searchByName",
                            method:"post",
                            contentType:"application/json",
                            params:{
                                name:this.searchName
                            }
                        }).then(result=>{
                            this.roleData=result.data
                            console.log(this.tableData) 
                        });            
            
        },
        cancel(){
        this.dialogTableVisibleAdd=false;
        this.dialogTableVisible=false;
        this.dialogVisibleMore=false;
        this.dialogVisibleAddRole=false;
        },
        ok(){
        this.dialogTableVisibleAdd=false;
        //console.log(this.dialogTableVisible);
        this.dialogTableVisible=false;
        this.dialogVisibleMore=false;
        this.dialogVisibleAddRole=false;
        },
        add(){
            this.tableDataCur=this.tableData;
            this.dialogTableVisibleAdd=true;
        },
        updateRole(index,row){
        row.roleEditFlag=true;
        this.$set(row,row.roleEditFlag,true);
        console.log(row.name)
            
         

           
        },
        moreInform(index,row){
            this.dialogVisibleMore=true;
            this.roleMoreInform=row.description;
            console.log(row.img);
        },
        addRole(){
            this.dialogVisibleAddRole=true;
        },
        subAddRole(){
            console.log(this.addRoleForm.name);
            axios({
                            url:"http://localhost:8080/role/addRole",
                            method:"post",
                            contentType:"application/json",
                            data:{
                                name:this.addRoleForm.name,
                                img:this.addRoleForm.img,
                                gender:this.addRoleForm.gender,
                                isMarried:this.addRoleForm.isMarried,
                                hobby:this.addRoleForm.hobby,
                                job:this.addRoleForm.job,
                                birthday:this.addRoleForm.birthday,
                                description:this.addRoleForm.description
                            }
                        });
            this.dialogVisibleAddRole=false;
            location.reload();
        },
        saveUpdateRole(index,row){
            row.roleEditFlag=false;
            this.$set(row,row.roleEditFlag,false),
            console.log(row),
            axios({
                            url:"http://localhost:8080/role/updateRole",
                            method:"post",
                            contentType:"application/json",
                            data:{
                                id:row.id,
                                name:row.name,
                                img:row.img,
                                gender:row.gender,
                                isMarried:row.isMarried,
                                hobby:row.hobby,
                                job:row.job,
                                birthday:row.birthday,
                                description:row.description
                            },
                            
                        });
            location.reload();
            //delete row.roleEditFlag
            //console.log(row)
        },
        deleteRoleByName(index,row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                        axios({               
                                url:"http://localhost:8080/role/deleteById",
                                method:"post",
                                contentType:"application/json",
                                params:{
                                        id:row.id
                                        }
                                });
                                console.log(row)
                                location.reload();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
          });          
        });
            
        },
      handleSizeChange:function(val){
        this.pageSize=val;
        //this.$set(this.pageSize,val);
        //console.log(this.pageSize)
        axios({
          url:"http://localhost:8080/role",
          method:"post",
          contentType:"application/json",
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,

          }
        }).then(result=>{
          //console.log(result.data.role,length);
          this.roleData=result.data.role;
          this.totalData=result.data.total;
          for(var i=0;i<this.roleData.length;i++){
            this.roleData[i].roleEditFlag=false
          }
        })
      },
      handleCurrentChange:function(val){
        this.currentPage=val;
        axios({
          url:"http://localhost:8080/role",
          method:"post",
          contentType:"application/json",
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,

          }
        }).then(result=>{
          //console.log(result.data.role,length);
          this.roleData=result.data.role;
          this.totalData=result.data.total;
          for(var i=0;i<this.roleData.length;i++){
            this.roleData[i].roleEditFlag=false
          }
        })
      }
    },
    

    updated(){
        //location.reload();
    },
    mounted(){
      axios({
        url:"http://localhost:8080/role",
        method:"post",
        contentType:"application/json",
        params: {
          page: this.currentPage,
          pageSize: this.pageSize,

        }
          }).then(result=>{
              console.log(this.pageSizes);
            this.roleData=result.data.role;
            this.totalData=result.data.total;
            for(var i=0;i<this.roleData.length;i++){
                this.roleData[i].roleEditFlag=false
            }
        })
    }
    
}
</script>
<style>

</style>
