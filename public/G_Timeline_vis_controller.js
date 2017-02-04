import angular from 'angular';
import _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import numeral from 'numeral';

import 'ui/courier';
import 'ui/timefilter';
import 'ui/directives/inequality';
import chrome from 'ui/chrome';
import uiModules from 'ui/modules';

const module = uiModules.get('G_Timeline_vis/G_Timeline_vis', ['kibana']);
module.controller('G_Timeline_vis_controller', function ($scope, courier) {
    console.log($scope);

  // Re-render the swimlane when either the data (esResponse) or one
  // of the view options (vis.params), such as band thresholds, change.
  // $scope.$watchMulti(['esResponse', 'vis.params'], function ([resp]) {

  //   if (!resp) {
  //     $scope._previousHoverPoint = null;
  //     return;
  //   }

  //   if (resp.hits.total !== 0) {
  //     // Remove ng-hide from the parent div as that has display:none,
  //     // resulting in the flot chart labels falling inside the chart area on first render.
  //     let ngHideContainer = $('prl-swimlane-vis').closest('.ng-hide');
  //     ngHideContainer.removeClass('ng-hide');
  //   }

  //   // Process the aggregations in the ES response.
  //   $scope.processAggregations(resp.aggregations);

  //   syncViewControls();

  //   // Tell the swimlane directive to render.
  //   $scope.$emit('render');

  // });

  // $scope.processAggregations = function (aggregations) {
  //   let dataByViewBy = {};

  //   if (aggregations &&
  //     ($scope.vis.aggs.bySchemaName.metric !== undefined) &&
  //     ($scope.vis.aggs.bySchemaName.timeSplit !== undefined)) {
  //     // Retrieve the visualization aggregations.
  //     let metricsAgg = $scope.vis.aggs.bySchemaName.metric[0];
  //     let timeAgg = $scope.vis.aggs.bySchemaName.timeSplit[0];
  //     let timeAggId = timeAgg.id;

  //     if ($scope.vis.aggs.bySchemaName.viewBy !== undefined) {
  //       // Get the buckets of the viewBy aggregation.
  //       let viewByAgg = $scope.vis.aggs.bySchemaName.viewBy[0];
  //       let viewByBuckets = aggregations[viewByAgg.id].buckets;
  //       _.each(viewByBuckets, function (bucket) {
  //         // There will be 1 bucket for each 'view by' value.
  //         let viewByValue = bucket.key;
  //         let timesForViewBy = {};
  //         dataByViewBy[viewByValue] = timesForViewBy;

  //         let bucketsForViewByValue = bucket[timeAggId].buckets;
  //         _.each(bucketsForViewByValue, function (valueBucket) {
  //           // time is the 'valueBucket' key.
  //           timesForViewBy[valueBucket.key] = {
  //             value: metricsAgg.getValue(valueBucket)
  //           };
  //         });
  //       });
  //     } else {
  //       // No 'View by' selected - compile data for a single swimlane
  //       // showing the time bucketed metric value.
  //       let timesForViewBy = {};
  //       let buckets = aggregations[timeAggId].buckets;
  //       _.each(buckets, function (bucket) {
  //         timesForViewBy[bucket.key] = { value: metricsAgg.getValue(bucket) };
  //       });

  //       // Use the metric label as the swimlane label.
  //       dataByViewBy[metricsAgg.makeLabel()] = timesForViewBy;
  //     }

  //   }

  //   $scope.metricsData = dataByViewBy;

  // };

  // function syncViewControls() {
  //   // Synchronize the Interval control to match the aggregation run in the view,
  //   // e.g. if being edited via the Kibana Visualization tab sidebar.
  //   if ($scope.vis.aggs.length === 0 || $scope.vis.aggs.bySchemaName.timeSplit === undefined) {
  //     return;
  //   }

  //   // Retrieve the visualization aggregations.
  //   let timeAgg = $scope.vis.aggs.bySchemaName.timeSplit[0];

  //   // Update the scope 'interval' field.
  //   let aggInterval = _.get(timeAgg, ['params', 'interval', 'val']);
  //   if (aggInterval === 'custom') {
  //     aggInterval = _.get(timeAgg, ['params', 'customInterval']);
  //   }

  //   let scopeInterval = $scope.vis.params.interval.val;
  //   if (scopeInterval && scopeInterval === 'custom') {
  //     scopeInterval = $scope.vis.params.interval.customInterval;
  //   }

  //   let setToInterval = _.findWhere($scope.vis.type.params.intervalOptions, {val: aggInterval});
  //   if (!setToInterval) {
  //     setToInterval = _.findWhere($scope.vis.type.params.intervalOptions, {customInterval: aggInterval});
  //   }
  //   if (!setToInterval) {
  //     // e.g. if running inside the Kibana Visualization tab will need to add an extra option in.
  //     setToInterval = {};

  //     if (_.get(timeAgg, ['params', 'interval', 'val']) !== 'custom') {
  //       setToInterval.val = _.get(timeAgg, ['params', 'interval', 'val']);
  //       setToInterval.display = 'Custom: ' + _.get(timeAgg, ['params', 'interval', 'val']);
  //     } else {
  //       setToInterval.val = 'custom';
  //       setToInterval.customInterval = _.get(timeAgg, ['params', 'customInterval']);
  //       setToInterval.display = 'Custom: ' + _.get(timeAgg, ['params', 'customInterval']);
  //     }

  //     $scope.vis.type.params.intervalOptions.push(setToInterval);
  //   }


  //   // Set the flags which indicate if the interval has been scaled.
  //   // e.g. if requesting points at 5 min interval would result in too many buckets being returned.
  //   let timeBucketsInterval = timeAgg.buckets.getInterval();
  //   setToInterval.scaled = timeBucketsInterval.scaled;
  //   setToInterval.scale = timeBucketsInterval.scale;
  //   setToInterval.description = timeBucketsInterval.description;

  //   $scope.vis.params.interval = setToInterval;
  // }

  // $scope.updateViewState = function () {
  //   // Set up the visualization in response to a change in the Interval control.
  //   setupVisualization()
  //   .then(function () {
  //     // Re-run the dashboard search.
  //     return courier.fetch();
  //   })
  //   .catch(function (error) {
  //     console.log('Error updating swimlane visualization with new view state.', error);
  //   });
  // };

  // function setupVisualization() {
  //   // Set the params of the time aggregation to the selected 'interval' field.
  //   if ($scope.vis) {
  //     // Set the aggregation interval of the 'timeSplit' aggregation.
  //     let visState = $scope.vis.getState();
  //     let timeAgg = _.find(visState.aggs, { 'schema': 'timeSplit' });
  //     timeAgg.params.interval = $scope.vis.params.interval.val;
  //     if ($scope.vis.params.interval.val === 'custom') {
  //       timeAgg.params.customInterval = $scope.vis.params.interval.customInterval;
  //     }

  //     $scope.vis.setState(visState);

  //     // Update the time interval of the 'editable vis'
  //     // i.e. if visualization is being viewed in the Kibana Visualize view,
  //     // we need to update the configurations for the aggregations in the editor sidebar.
  //     let editableVis = $scope.vis.getEditableVis();
  //     if (editableVis) {
  //       let editableVisState = editableVis.getState();
  //       let editableTimeAgg = _.find(editableVisState.aggs, { 'schema': 'timeSplit' });
  //       editableTimeAgg.params.interval = $scope.vis.params.interval.val;
  //       if ($scope.vis.params.interval.val === 'custom') {
  //         editableTimeAgg.params.customInterval = $scope.vis.params.interval.customInterval;
  //       }

  //       editableVis.setState(editableVisState);
  //     }

  //     return Promise.resolve($scope.vis);
  //   }

  // }

  // $scope.prelertLogoSrc = chrome.getBasePath() + '/plugins/prelert_swimlane_vis/prelert_logo_24.png';

})
// .directive('prlSwimlaneVis', function ($compile, timefilter) {
// 
//   function link(scope, element, attrs) {
// 
//     scope._previousHoverPoint = null;
//     scope._influencerHoverScope = null;
// 
//     scope.$on('render',function (event, d) {
//       if (scope.vis.aggs.length !== 0 && scope.vis.aggs.bySchemaName.timeSplit !== undefined) {
//         renderSwimlane();
//       }
//     });
// 
//     function renderSwimlane() {
// 
//       let chartData = scope.metricsData || [];
//       let allSeries = [];
// 
//       // Create a series for each severity color band,
//       // plus an 'unknown' series for scores less than the 'low' threshold.
//       const colorBands = ['#e6e6e6', '#d2e9f7', '#8bc8fb', '#ffdd00', '#ff7e00', '#fe5050'];
//       const seriesLabels = ['unknown','low','warning','minor','major','critical'];
//       _.each(colorBands, function (color, i) {
//         let series = {};
//         series.label = seriesLabels[i];
//         series.color = color;
//         series.points = { fillColor: color, show: true, radius: 5, symbol: drawChartSymbol,  lineWidth: 1 };
//         series.data = [];
//         series.shadowSize = 0;
//         allSeries.push(series);
//       });
// 
//       // Sort the lane labels in reverse so that the order is a-z from the top.
//       chartData = sortChartDataByLaneLabel(chartData);
//       let laneIds = _.keys(chartData);
// 
//       let laneIndex = 0;
//       _.each(chartData, function (bucketsForViewByValue, viewByValue) {
// 
//         laneIndex = laneIds.indexOf(viewByValue);
// 
//         _.each(bucketsForViewByValue, function (dataForTime, time) {
//           const value = dataForTime.value;
// 
//           const pointData = new Array();
//           pointData[0] = moment(Number(time));
//           pointData[1] = laneIndex + 0.5;
//           // Store the score in an additional object property for each point.
//           pointData[2] = {score: value};
// 
//           const seriesIndex = getSeriesIndex(value);
//           allSeries[seriesIndex].data.push(pointData);
//         });
//       });
// 
//       // Extract the bounds of the time filter so we can set the x-axis min and max.
//       // If no min/max supplied, Flot will automatically set them according to the data values.
//       const bounds = timefilter.getActiveBounds();
//       let earliest = null;
//       let latest = null;
//       if (bounds) {
//         let timeAgg = scope.vis.aggs.bySchemaName.timeSplit[0];
//         let aggInterval = timeAgg.buckets.getInterval();
// 
//         // Elasticsearch aggregation returns points at start of bucket,
//         // so set the x-axis min to the start of the aggregation interval.
//         earliest = moment(bounds.min).startOf(aggInterval.description).valueOf();
//         latest = moment(bounds.max).valueOf();
//       }
// 
// 
//       const options = {
//         xaxis: {
//           mode: 'time',
//           timeformat: '%d %b %H:%M',
//           tickFormatter: function (v, axis) {
//             // Only show time if tick spacing is less than a day.
//             const tickGap = (axis.max - axis.min) / 10000;  // Approx 10 ticks, convert to sec.
//             if (tickGap < 86400) {
//               return moment(v).format('MMM D HH:mm');
//             } else {
//               return moment(v).format('MMM D YYYY');
//             }
//           },
//           min: _.isUndefined(earliest) ? null : earliest,
//           max: _.isUndefined(latest) ? null : latest,
//           color: '#d5d5d5'
//         },
//         yaxis: {
//           min: 0,
//           color: null,
//           tickColor: null,
//           tickLength: 0,
//         },
//         grid: {
//           backgroundColor: null,
//           borderWidth: 1,
//           hoverable: true,
//           clickable: false,
//           borderColor: '#cccccc',
//           color: null,
//         },
//         legend : {
//           show: false
//         },
//         selection: {
//           mode: 'x',
//           color: '#bbbbbb'
//         }
//       };
// 
//       // Set the alternate lane marking color depending on whether Kibana dark theme is being used.
//       const alternateLaneColor = element.closest('.theme-dark').length === 0 ? '#f5f5f5' : '#4a4a4a';
// 
//       options.yaxis.max = laneIds.length;
//       options.yaxis.ticks = [];
//       options.grid.markings = [];
// 
//       let yaxisMarking;
//       _.each(laneIds, function (labelId, i) {
//         let labelText = labelId;
// 
//         // Crop 'viewBy' labels over 27 chars of more so that the y-axis labels don't take up too much width.
//         labelText = (labelText.length < 28 ? labelText : labelText.substring(0, 25) + '...');
//         let tick = [i + 0.5, labelText];
//         options.yaxis.ticks.push(tick);
// 
//         // Set up marking effects for each lane.
//         if (i > 0) {
//           yaxisMarking = {};
//           yaxisMarking.from = i;
//           yaxisMarking.to = i + 0.03;
//           options.grid.markings.push({yaxis: yaxisMarking, color: '#d5d5d5'});
//         }
// 
//         if (i % 2 !== 0) {
//           yaxisMarking = {};
//           yaxisMarking.from = i + 0.03;
//           yaxisMarking.to = i + 1;
//           options.grid.markings.push({yaxis: yaxisMarking, color: alternateLaneColor});
//         }
//       });
// 
//       // Adjust height of element according to the number of lanes, allow for height of axis labels.
//       // Uses hardcoded height for each lane of 32px, with the chart symbols having a height of 28px.
//       element.height((laneIds.length * 32) + 50);
// 
//       // Draw the plot.
//       const plot = $.plot(element, allSeries, options);
// 
//       // Add tooltips to the y-axis labels to display the full 'viewBy' field
//       // - useful for cases where a long text value has been cropped.
//       // NB. requires z-index set in CSS so that hover is picked up on label.
//       const yAxisLabelDivs = $('.flot-y-axis', angular.element(element)).find('.flot-tick-label');
//       _.each(laneIds, function (labelId, i) {
//         const labelText = labelId;
//         $(yAxisLabelDivs[i]).attr('title', labelText);
//       });
// 
//       // Show tooltips on point hover.
//       element.unbind('plothover');
//       element.bind('plothover', function (event, pos, item) {
//         if (item) {
//           element.addClass('prl-swimlane-vis-point-over ');
//           if (scope._previousHoverPoint !== item.dataIndex) {
//             scope._previousHoverPoint = item.dataIndex;
//             $('.prl-swimlane-vis-tooltip').remove();
//             if (scope._influencerHoverScope) {
//               scope._influencerHoverScope.$destroy();
//             }
// 
//             const laneIndex = item.series.data[item.dataIndex][1] - 0.5;
//             const laneLabel = laneIds[laneIndex];
//             showTooltip(item, laneLabel);
//           }
//         } else {
//           element.removeClass('prl-swimlane-vis-point-over ');
//           $('.prl-swimlane-vis-tooltip').remove();
//           scope._previousHoverPoint = null;
//           if (scope._influencerHoverScope) {
//             scope._influencerHoverScope.$destroy();
//           }
//         }
//       });
// 
//       // Set the Kibana timefilter if the user selects a range on the chart.
//       element.unbind('plotselected');
//       element.bind('plotselected', function (event, ranges) {
//         let zoomFrom = ranges.xaxis.from;
//         let zoomTo = ranges.xaxis.to;
// 
//         // Aggregation returns points at start of bucket, so make sure the time
//         // range zoomed in to covers the full aggregation interval.
//         const timeAgg = scope.vis.aggs.bySchemaName.timeSplit[0];
//         const aggIntervalMs = timeAgg.buckets.getInterval().asMilliseconds();
// 
//         // Add a bit of extra padding before start time.
//         zoomFrom = zoomFrom - (aggIntervalMs / 4);
//         zoomTo = zoomTo + aggIntervalMs;
// 
//         timefilter.time.from = moment.utc(zoomFrom);
//         timefilter.time.to = moment.utc(zoomTo);
//         timefilter.time.mode = 'absolute';
//       });
// 
//     }
// 
//     function getSeriesIndex(value) {
//       // Maps value to the index of the series used for values in that range.
//       // Uses the five colour bands configured in the visualization options,
//       // plus an 'unknown' series for scores less than the 'low' threshold.
//       if (value < scope.vis.params.lowThreshold) {
//         return 0; // 'Unknown' for numbers less than low threshold.
//       }
//       if (value < scope.vis.params.warningThreshold) {
//         return 1;
//       }
//       if (value < scope.vis.params.minorThreshold) {
//         return 2;
//       }
//       if (value < scope.vis.params.majorThreshold) {
//         return 3;
//       }
//       if (value < scope.vis.params.criticalThreshold) {
//         return 4;
//       }
//       if (value >= scope.vis.params.criticalThreshold) {
//         return 5;
//       }
//     }
// 
//     function sortChartDataByLaneLabel(list) {
//       // Sorts chart data according to lane label.
//       let keys = _.sortBy(_.keys(list), function (key) {
//         return key;
//       });
// 
//       // Reverse so that the order is a-z from the top.
//       keys = keys.reverse();
// 
//       return _.object(keys, _.map(keys, function (key) {
//         return list[key];
//       }));
//     }
// 
//     function drawChartSymbol(ctx, x, y, radius, shadow) {
//       const size = radius * Math.sqrt(Math.PI) / 2;
//       ctx.rect(x - size, y - 14, size + size, 28);
//     }
// 
//     function showTooltip(item, laneLabel) {
//       const pointTime = item.datapoint[0];
//       const dataModel = item.series.data[item.dataIndex][2];
//       const score = parseInt(dataModel.score);
//       const metricsAgg = scope.vis.aggs.bySchemaName.metric[0];
//       const metricLabel = metricsAgg.makeLabel();
//       const displayScore = numeral(dataModel.score).format(scope.vis.params.tooltipNumberFormat);
// 
//       // Display date using same format as used in Kibana visualizations.
//       const formattedDate = moment(pointTime).format('MMMM Do YYYY, HH:mm');
//       let contents = formattedDate + '<br/><hr/>';
// 
//       contents += (metricLabel + ': ' + displayScore);
// 
//       const x = item.pageX;
//       const y = item.pageY;
//       const offset = 5;
//       $('<div class="prl-swimlane-vis-tooltip">' + contents + '</div>').css({
//         'position': 'absolute',
//         'display': 'none',
//         'z-index': 1,
//         'top': y + offset,
//         'left': x + offset
//       }).appendTo('body').fadeIn(200);
// 
//       // Position the tooltip.
//       const $win = $(window);
//       const winHeight = $win.height();
//       const yOffset = window.pageYOffset;
//       const width = $('.prl-swimlane-vis-tooltip').outerWidth(true);
//       const height = $('.prl-swimlane-vis-tooltip').outerHeight(true);
// 
//       $('.prl-swimlane-vis-tooltip').css('left', x + offset + width > $win.width() ? x - offset - width : x + offset);
//       $('.prl-swimlane-vis-tooltip').css('top', y + height < winHeight + yOffset ? y : y - height);
// 
//     }
//   }
// 
//   return {
//     link: link
//   };
// });
