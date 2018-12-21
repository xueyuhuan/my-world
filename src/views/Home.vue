<template>
    <div id="home">
        <el-card shadow="hover" id="base" class="base">
            <header slot="header"><i class="fa fa-address-card-o fa-fw"></i>{{base.title}}</header>
            <h4>{{base.name}}<i class="fa fa-mars"></i></h4>
            <p>{{base.exp}}年工作经验 / {{base.edu}} / {{base.age}}岁</p>
            <p><i class="fa fa-mobile"></i>{{base.phone}}<i class="fa fa-envelope-o"></i>{{base.email}}</p>
        </el-card>
        <el-card shadow="hover" id="des" class="des">
            <header slot="header"><i class="fa fa-user-o fa-fw"></i>{{des.title}}</header>
            <el-tag size="medium">vue</el-tag>
            <el-tag size="medium" type="success">web前端</el-tag>
            <el-tag size="medium" type="info">学习</el-tag>
            <p v-html="des.content"></p>
        </el-card>
        <el-card shadow="hover" id="word" class="word">
            <header slot="header"><i class="fa fa-building-o fa-fw"></i>{{word.title}}</header>
            <el-collapse>
                <el-collapse-item v-for="(i,index) in word.list" :key="index" :name="index">
                    <header slot="title"><img :src="i.img" alt="logo"/>{{i.name}} / {{i.dept}}</header>
                    <el-tag v-for="j in i.tag" :key="j" size="medium" type="info">{{j}}</el-tag>
                    <el-alert type="success" :closable="false">
                        <div slot="title">{{i.job}}</div>
                        <time>{{i.timerange[0]}}-{{i.timerange[1]}}</time>
                    </el-alert>
                    <p v-html="i.content"></p>
                </el-collapse-item>
            </el-collapse>
        </el-card>
        <el-card shadow="hover" id="project" class="project">
            <header slot="header"><i class="fa fa-cubes fa-fw"></i>{{project.title}}</header>
            <ul>
                <li v-for="(i,index) in project.list" :key="index">
                    <h5>{{i.name}}</h5>
                    <el-button size="medium" type="text">{{i.company}}</el-button>
                    <el-alert type="info" :title="i.summary" :closable="false"></el-alert>
                    <p v-html="i.content"></p>
                </li>
            </ul>
        </el-card>
        <el-card shadow="hover" id="edu" class="edu">
            <header slot="header"><i class="fa fa-university fa-fw"></i>{{edu.title}}</header>
            <el-table :data="edu.list" size="medium" border>
                <el-table-column
                        label="学校"
                        width="120">
                    <template slot-scope="scope">
                        <el-button size="medium" type="text">{{ scope.row.school}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="专业" width="150" prop="major"></el-table-column>
                <el-table-column
                        label="学历"
                        width="80">
                    <template slot-scope="scope">
                        <el-tag size="medium" type="success">{{ scope.row.edu}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="在校时间">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.timerange[0]}}-{{scope.row.timerange[1]}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card shadow="hover" id="pic" class="pic">
            <header slot="header"><i class="fa fa-picture-o fa-fw"></i>{{pic.title}}</header>
            <el-carousel :interval="5000" type="card" height="500px">
                <el-carousel-item v-for="item in 6" :key="item">
                    <img :src="'images/'+item+'.png'" alt="图片作品"/>
                </el-carousel-item>
            </el-carousel>
        </el-card>
        <el-card shadow="hover" class="map">
            <header slot="header"><i class="fa fa-map fa-fw"></i>地图</header>
            <div id="map" style="height: 500px"></div>
        </el-card>
        <el-card shadow="hover" class="code">
            <header slot="header"><i class="fa fa-code fa-fw"></i>代码</header>
            <el-form :model="str" ref="str" :rules="strRules" label-width="80px">
                <el-form-item label="字符比较" prop="first">
                    <el-input v-model="str.first" placeholder="第一个"></el-input>
                </el-form-item>
                <el-form-item label=" "  prop="second">
                    <el-input v-model="str.second" placeholder="第二个"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input disabled v-model="str.result" placeholder="结果"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium" type="primary" @click="codeStr('str')">计算</el-button>
                </el-form-item>
                <el-form-item>
                    <pre>
                    let arr1=this.str.first.split(' ');
                    let arr2=this.str.second.split(' ');
                    for(let i in arr1){
                        for(let j in arr2){
                            if(arr1[i]===arr2[j]){
                                this.str.result=arr1[i];
                                return;
                            }
                        }
                    }
                    </pre>
                </el-form-item>
            </el-form>
            <el-form :model="num" disabled label-width="80px">
                <el-form-item label="整数分解">
                    <el-input-number v-model="num.number" :min="1" :max="10000"></el-input-number>
                    <el-input type="textarea" :autosize="{ minRows: 2}" disabled v-model="num.result" placeholder="结果"></el-input>
                </el-form-item>
            </el-form>
        </el-card>
        <el-dialog
                title="添加新的旅游计划"
                :visible.sync="dialogVisible"
                width="30%">
            <el-input v-model="newpaln" placeholder="请输入..."></el-input>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addPlan">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
// @ is an alias to /src
import echarts from 'echarts'
import '../../node_modules/echarts/map/js/china.js' // 引入中国地图数据

export default {
    name: 'home',
    data(){
        return{
            base:{
                title:'基本资料',
                name:'何语秋',
                exp:'3',
                edu:'本科',
                age:'24',
                phone:'18140514042',
                email:'501946152@qq.com'
            },
            des:{
                title:'自我描述',
                content:'有近三年web前端工作经验，计算机专业毕业，热爱该行业，乐于学习新的知识与技术。 <br>有vue框架项目经验，能独立搭建开发vue spa<br>熟悉移动端页面布局，可做到设计图像素级还原。<br>熟知ps的基本操作。<br>'
            },
            word:{
                title:'工作经历',
                list:[
                    {
                        name:'武汉青贝科技有限公司',
                        img:'//www.lgstatic.com/i/image/M00/48/68/CgqKkVeTbWOAV5MnAAA0S7aIzoI575.png',
                        dept:'研发部',
                        job:'web前端',
                        timerange:['2018.05','2018.12'],
                        tag:['vue','移动端','Web前端'],
                        content:'将门户使用vue重构，并做成了响应式。其中部分功能组件（如日期范围选择）使用element-ui，封装axios进行请求。此外使用了vuedraggable实现拖拽，为业务需求重写封装了一个日历组件<br/>' +
                            '使用vue-cli+element-ui根据原型搭建六小成长档案spa，使用echarts实现雷达图等图表，并与后台对接数据，根据角色动态挂载路由<br/>' +
                            '运用vue-cli+element-ui根据需求构建华师留管项目原型和spa'
                    },
                    {
                        name:'烨飞麟（北京）体育科技有限公司',
                        img:'//www.lgstatic.com/i/image3/M00/02/CC/CgpOIFpdWpWAeVyxAABL3FLTZKg232.png',
                        dept:'研发部',
                        job:'web前端',
                        timerange:['2017.12','2018.02'],
                        tag:['前端开发'],
                        content:'公司总后台管理系统（vue）部分模块的开发'
                    },
                    {
                        name:'武汉联合药业有限责任公司',
                        img:'//www.lgstatic.com/i/image/M00/00/D0/CgqKkVZWojCAKf_2AAAcVXNHQbk761.jpg',
                        dept:'信息推广中心研发部',
                        job:'web前端',
                        timerange:['2015.12','2017.09'],
                        tag:['HTML5','Node.js','移动端'],
                        content:'负责公司会员系统（微信web）及相关h5活动制作<br/>' +
                            '维护和开发公司官网、产品网站'
                    },
                ],
            },
            project:{
                title:'项目经验',
                list:[
                    {
                        name:'成长档案',
                        company:'武汉青贝科技有限公司',
                        timerange:['2018.11','2018.12'],
                        summary:'基于原型图使用element-ui构建的spa页面',
                        content:'vue-cli+axios搭建框架，根据角色动态挂载路由，使用echarts实现雷达图等图表，完成所有功能（包括与后台对接数据 ）'
                    },
                    {
                        name:'门户重构',
                        company:'武汉青贝科技有限公司',
                        timerange:['2018.06','2018.07'],
                        summary:'根据公司已有上线门户（angularjs）重构为vue版本spa',
                        content:'使用vue-cli搭建整体框架，对原有门户进行了优化重构，一套代使用vue-cli搭建整体框架，并完成百分之八十以上的页面和功能。同时对原有门户进行了优化重构，一套代码实现pc、mobile的响应式。其中部分功能组件（如日期范围选择）使用element-ui，封装axios进行请求。此外使用了vuedraggable实现拖拽，为业务需求重写封装了一个日历组件'
                    }
                ]
            },
            edu:{
                title:'教育经历',
                list:[
                    {
                        school:'武汉传媒学院',
                        timerange:['2012','2016'],
                        edu:'本科',
                        major:'计算机科学与技术',
                    }
                ]
            },
            pic:{
                title:'图片作品',
            },
            str:{
                first:'',
                second:'',
                result:''
            },
            strRules:{
                first: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                second: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
            },
            num:{
                number:1,
                result:'',
            },
            plan: [
                {name: '北京',value: ''},
                {name: '天津',value: ''},
                {name: '上海',value: ''},
                {name: '重庆',value: ''},
                {name: '河北',value: '计划1'},
                {name: '河南',value: ''},
                {name: '云南',value: '计划2'},
                {name: '辽宁',value: '计划3'},
                {name: '黑龙江',value: ''},
                {name: '湖南',value: '计划4'},
                {name: '安徽',value: ''},
                {name: '山东',value: ''},
                {name: '新疆',value: ''},
                {name: '江苏',value: ''},
                {name: '浙江',value: ''},
                {name: '江西',value: ''},
                {name: '湖北',value: ''},
                {name: '广西',value: ''},
                {name: '甘肃',value: ''},
                {name: '山西',value: ''},
                {name: '内蒙古',value: ''},
                {name: '陕西',value: ''},
                {name: '吉林',value: ''},
                {name: '福建',value: ''},
                {name: '贵州',value: ''},
                {name: '广东',value: ''},
                {name: '青海',value: ''},
                {name: '西藏',value: ''},
                {name: '四川',value: ''},
                {name: '宁夏',value: ''},
                {name: '海南',value: ''},
                {name: '台湾',value: ''},
                {name: '香港',value: ''},
                {name: '澳门',value: ''}
            ],
            name:'',
            newpaln:'',
            dialogVisible: false
        }
    },
    mounted(){
      this.drawMap();
    },
    methods:{
        drawMap(){
            let _this=this;
            let map=echarts.init(document.getElementById('map'));
            let option={
                backgroundColor: "#009688",
                tooltip: {
                    formatter: function (params) {
                        return params.data.value;
                    }
                }, // 鼠标移到图里面的浮动提示框
                geo: { // 这个是重点配置区
                    map: 'china', // 表示中国地图
                    label: {
                        normal: {
                            show: true, // 是否显示对应地名
                            textStyle: {
                                color: 'rgba(0,0,0,0.4)'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(0, 0, 0, 0.2)'
                        },
                        emphasis: {
                            areaColor: null,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 20,
                            borderWidth: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
                series: [
                    {
                        type: 'map',
                        geoIndex: 0,
                        data:this.plan
                    }
                ]
            };
            map.setOption(option);
            map.on('click',function (params) {
                console.log(params);
                if(params.data.value===''){
                    _this.name=params.data.name;
                    _this.newpaln='';
                    _this.dialogVisible=true;
                }
            })
        },
        addPlan(){
            if(this.newpaln!==''){
                console.log(this.name)
                for(let i in this.plan){
                    if(this.plan[i].name===this.name){
                        this.plan[i].value=this.newpaln;
                        this.drawMap();
                    }
                }
                this.dialogVisible=false;
                this.$message.success('已添加'+this.name+'的旅游计划')
            }
            else this.$message.error('请输入计划');
        },
        codeStr(formName){
            this.str.result='';
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let arr1=this.str.first.split(' ');
                    let arr2=this.str.second.split(' ');
                    for(let i in arr1){
                        for(let j in arr2){
                            if(arr1[i]===arr2[j]){
                                this.str.result=arr1[i];
                                return;
                            }
                        }
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss">
    #home{
        padding-top: 60px;
        .el-card{
            @extend %width;
            margin-bottom: 10px;
            header{
                i{
                    color: #409EFF;
                    margin-right: 5px;
                }
            }
            .el-tag{
                margin-right: 10px;
            }
            .el-collapse-item{
                header{
                    @include flex;
                    img{
                        width: 30px;
                        margin: 5px 10px;
                    }
                }
            }
        }
        p{
            font-size: 14px;
            color: #333;
            line-height: 20px;
            margin: 6px 0 0 0;
            i{
                margin-right: 5px;
                &.fa-mobile{
                    font-size: 18px;
                }
                &.fa-envelope-o{
                    margin-left: 20px;
                }
            }
        }
        .base{
            h4{
                @include flex;
                margin: 0 0 20px 0;
                i{
                    font-size: 12px;
                    color: hotpink;
                    margin-left: 5px;
                }
            }
        }
        .word{
            .el-alert{
                margin:  10px 0;
            }
        }
        .project{
            li{
                margin-bottom: 20px;
                &:last-child{margin: 0}
                h5{
                    margin: 0;
                }
            }
        }
        .pic{
            img{
                height: 500px;
            }
        }
        .code{
            .el-card__body{
                @include flex(space-between,flex-start);
                .el-form{
                    flex:1;
                    /*.el-input{*/
                        /*margin-bottom: 10px;*/
                    /*}*/
                }
            }
        }
    }
</style>
