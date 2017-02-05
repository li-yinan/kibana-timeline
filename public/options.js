export var options = {
    title: {
        text: 'graphql 查询耗时'
        // subtext: 'From ExcelHome',
        // sublink: 'http://e.weibo.com/1341556070/AjQH99che'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        } // ,
        // formatter: function (params) {
        //     var tar = params[1];
        //     return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        // }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: {
        type : 'category',
        splitLine: {show:false},
        // inverse: true,
        data : ['房租','水电费','交通费','伙食费','日用品数','总费用']
    },
    xAxis: {
        position: 'top',
        type : 'value'
    },
    series: [
        {
            name: '起始时间',
            type: 'bar',
            stack:  '总量',
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [1700, 1400, 1200, 300, 0, 0]
        },
        {
            name: '查询耗时',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'inside'
                }
            },
            data:[1200, 300, 200, 900, 300, 2900]
        }
    ]
};

