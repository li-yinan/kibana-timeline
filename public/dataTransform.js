/**
 * @file 对elasticsearch查出来的聚合数据进行处理
 * 
 * @author liyinan
 * @version 1.0
 * @date 2017-02-05
 */

/**
 * 这个函数负责数据格式转换，主要完成以下几件事
 * 1. 把graphql的字段名整理为echarts需要的格式
 * 2. 把每个字段的耗时整理为echarts需要的格式
 * 3. 把每个字段的起始时间整理为echarts需要的格式
 *
 * @param {Object} data elasticsearch查询出的聚合数据
 *
 * @return {Object} echarts的配置信息
 */
export function transform(data) {
    let visAggs = data.vis.aggs;
    let aggregations = data.esResponse.aggregations;

    let bucketsId = visAggs.bySchemaGroup['buckets'][0].id;
    let durationId = visAggs.bySchemaName['Y-axis'][0].id;
    let startTimeId = visAggs.bySchemaName['Y-axis'][1].id;

    let buckets = aggregations[bucketsId].buckets;

    buckets.sort(bucket => bucket[startTimeId].value);

    let fieldNames = buckets.map(bucket => bucket.key);

    let startTime = buckets.map(bucket => bucket[startTimeId].value)

    let duration = buckets.map(bucket => bucket[durationId].value)

    return {
        fieldNames,
        startTime,
        duration
    };
}
