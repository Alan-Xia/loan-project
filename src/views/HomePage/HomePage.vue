<template>
  <div class="home">
    <ul class="clear">
      <li class="fl" v-for="(it,index) in list" :key="index" :style="{backgroundColor:it.bgColor}">
        <p class="title">{{it.name}}</p>
        <countTo :startVal='0' class="content" :endVal='it.number' :duration='it.duration'></countTo>
      </li>
    </ul>
    <div class="charts" ref="mycharts"></div>
    <div class="main clear">
      <div class="fl data" ref="data"></div>
      <div class="fl building" ref="building"></div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import echarts from 'echarts'
  export default {
    data() {
      return {
        list: [
          {name:'最高可借金额',bgColor:'#67ca3a',number:13594,duration:2000},
          {name:'回报率',bgColor:'#f60',number:9833,duration:3000},
          {name:'业绩领跑',bgColor:'#f56c6c',number:8888,duration:1500},
          {name:'安稳底薪站队',bgColor:'#409eff',number:6666,duration:3500}
        ],
        charts: '',
        data: '',
        build: ''
      }
    },
    methods: {
      initChart(){ 
        this.charts = echarts.init(this.$refs.mycharts)
        var option = {
          title: {
              left: 'center',
              text: '大数据量面积图',
          },
          xAxis: {
              type: 'category',
              data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320,732,890,634,1238,1200],
              type: 'line',
              areaStyle: {}
          }]
        }
        this.charts.setOption(option)
      },
      initData () {
        this.data = echarts.init(this.$refs.data)
        var options = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [192,168,600,1000,1180,993,630],
              type: 'bar',
              barGap:'-100%',
              barCategoryGap:'40%',
              itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#61A0A8'},
                            {offset: 0.5, color: '#2F4554'},
                            {offset: 1, color: '#C23531'}
                        ]
                    )
                }
              }
          }]            
        }
       this.data.setOption(options)
      },
      initBuild () {
        this.build = echarts.init(this.$refs.building)
        var arr1 = [63,0,0,53,80,80]
        var arr2 = [0,63,80,85,72,74]
        var arr3 = [70,73,65,85,68,72]
        var option = {
        radar: [
          {
            indicator: [
              {text: 'ThemeRiver', max: 100},
              {text: 'Calendar', max: 100},
              {text: 'Custom', max: 100},
              {text: 'PictorialBar', max: 100},
              {text: 'Funnel', max: 100},
              {text: 'Gauge', max: 100}
            ],
            center: ['50%','54%'],//调整雷达图的位置
            radius: 80,//半径，可放大放小雷达图
            axisLine: {//坐标轴线相关设置
                show: true,
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine : {
              show : true,
              lineStyle : {
                  width : 1,
                  color : '#fff' // 图表背景网格线的颜色
              }
            },
            splitArea: {
                show: false,
            },
            name: {
              rich: {
                a: {
                    color: '#999',
                    lineHeight: 20
                },
              },
              formatter: (a)=>{
                  return `{a|${a}}`
              }
            }
        },
          ],
          series: [
            {
                type: 'radar',
                symbol: 'none',//去掉拐点的圈
                data: [
                  {
                    value: arr1,
                    name: 'ThemeRiver',
                    areaStyle: {
                        normal: {
                            color: '#C23531'
                        }
                    },
                    lineStyle: {
                        color:"rgba(255,255,255,0)"
                    },
                  },{
                    value: arr2,
                    name:'Custom',
                    areaStyle: {
                        normal: {
                            color: '#2F4554' // 图表中各个图区域的颜色
                        }
                    },
                    lineStyle: {
                        color:"rgba(255,255,255,0)" // 图表中各个图区域的边框线颜色
                    },
                  },{
                    value: arr3,
                    name:'Funnel',
                    areaStyle: {
                        normal: {
                            color: '#61A0A8' // 图表中各个图区域的颜色
                        }
                    },
                    lineStyle: {
                        color:"rgba(255,255,255,0)" // 图表中各个图区域的边框线颜色
                    },
                  }
                ]
            },
          ]
        };
        this.build.setOption(option)
      }
    },
    components: {
      CountTo
    },
    mounted () {
      this.initChart()
      this.initData()
      this.initBuild()
    }
  }
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>