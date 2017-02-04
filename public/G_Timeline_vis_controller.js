import uiModules from 'ui/modules';
import echarts from 'echarts';
import {options} from './options';

const module = uiModules.get('G_Timeline_vis/G_Timeline_vis', ['kibana']);
module.controller('G_Timeline_vis_controller', function ($scope, courier) {
    console.log($scope);

  // Re-render the swimlane when either the data (esResponse) or one
  // of the view options (vis.params), such as band thresholds, change.
    $scope.$watchMulti(['esResponse', 'vis.params'], function ([resp]) {

        if (!resp) {
            $scope._previousHoverPoint = null;
            return;
        }
        // Tell the swimlane directive to render.
        $scope.$emit('render');

    });

})
.directive('gTimelineVis', function ($compile, timefilter) {

    function link(scope, element, attrs) {
        console.log(element);
 
        var timelineChart = echarts.init(element.get(0));
       
        scope._previousHoverPoint = null;
        scope._influencerHoverScope = null;
       
        scope.$on('render',function (event, d) {
            if (scope.vis.aggs.length !== 0) {
           
              renderTimeline();
            }
        });
       
        function renderTimeline() {
       
            let chartData = scope.metricsData || [];
            let allSeries = [];
           
            timelineChart.setOption(options);
            console.log('render timeline');
        }
 
    }
 
    return {
        replace : true,
        template: require('plugins/G_Timeline/templates/timeline.html'),
        link: link
    };
});
