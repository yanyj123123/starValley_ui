<template>
    <div>
        <el-container style="height: 700px; border: 1px solid #eee">
            <el-header style="font-size:40px;background-color:rgb(238, 241, 246)">智能学习辅助系统</el-header>
                <el-container>
                <el-aside width="230px" style="height:700px;border: 1px solid #eee">

                <el-menu :default-openeds="['1', '3']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>系统信息管理</template>

                    <el-menu-item index="1-1">部门管理</el-menu-item>
                    <el-menu-item index="1-2">员工管理</el-menu-item>

                </el-submenu>
                
                </el-menu>
            </el-aside>

                <el-main>
                    <!-- 表单 -->
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="searchForm.name" placeholder="姓名人"></el-input>
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

                <el-form-item>
                    <el-button type="primary" @click="onSubmit()" >查询</el-button>
                </el-form-item>

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

                

                <el-table :data="tableData" border >
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column label="图像" width="180">
                    <template slot-scope="scope">
                        <img :src="scope.row.image" width="100px" height="70px">
                    </template>
                </el-table-column>


                <el-table-column label="性别" width="140">
                    <template slot-scope="scope">
                        {{ scope.row.gender==1?'男':'女' }}
                    </template>
                </el-table-column>

                <el-table-column prop="job" label="职位" width="140"></el-table-column>
                <el-table-column prop="entrydate" label="入职日期" width="180"></el-table-column>
                <el-table-column prop="updatetime" label="最后操作时间" width="230"></el-table-column>
                <el-table-column label="操作" >
                    <el-button type="primary" size="mini">编辑</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </el-table-column>
                    
                </el-table>
                <br>
                <!-- <el-pagination  background layout="sizes, prev, pager, next"  :total="1000"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
                </el-pagination> -->

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
            dialogTableVisible:false
        }
    },
    methods:{
        onSubmit:function(){
            
            var tag=0;
            for(var i=0;i<this.tableData.length;i++){
                if(this.searchForm.name==this.tableData[i].name){
                    //
                    /* alert(JSON.stringify(this.tableData[i]));  */
                    this.tableDataTemp[0].tName=this.tableData[i].name;
                    this.tableDataTemp[0].tJob=this.tableData[i].job;
                    this.tableDataTemp[0].tGender=this.tableData[i].gender
                    //alert(JSON.stringify(this.tableDataTemp)); 
                    tag=1;
                }
            }
            if(tag==1){
                this.dialogTableVisible=true;
            }
            if(tag==0){
               alert(this.searchForm.name+"查无此人")
                
            }
            
        },
        cancel(){
        this.dialogTableVisible=false;
        },
        ok(){
        console.log(this.dialogTableVisible);
        this.dialogTableVisible=false;
        }

    },
    
    
    handleSizeChange:function(val){
            alert("每页记录数变化"+val)
        },
    handleCurrentChange:function(val){
            alert("页码变化"+val)
        },
    mounted(){
        axios.get("http://yapi.smart-xwork.cn/mock/221617/emp/list").then(result=>{
            this.tableData=result.data.data
        })
    }
    
}
</script>
<style>

</style>
