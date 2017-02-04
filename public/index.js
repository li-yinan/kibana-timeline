import 'plugins/G_Timeline/G_Timeline_vis_controller.js';
// import 'plugins/G-timeline/prelert_swimlane_vis/prelert_swimlane_vis.less';

import visTypes from 'ui/registry/vis_types';
import TemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';

visTypes.register(GTimelineVisProvider);

function GTimelineVisProvider(Private) {
  const TemplateVisType = Private(TemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);

  return new TemplateVisType({
    name : 'G_Timeline',
    title : 'G_Timeline',
    icon : 'fa-bars',
    description : 'graphql timeline',
    template : require('plugins/G_Timeline/templates/index.html'),
    params : {
    },
    schemas : new Schemas([ {
      group : 'metrics',
      name : 'metric',
      title : 'Value',
      min : 1,
      max : 1,
      aggFilter : [ 'count', 'avg', 'sum', 'min', 'max', 'cardinality' ]
    }, {
      group : 'buckets',
      name : 'viewBy',
      icon : 'fa fa-eye',
      title : 'View by',
      mustBeFirst : true,
      min : 0,
      max : 1,
      aggFilter : 'terms'
    }, {
      group : 'buckets',
      name : 'timeSplit',
      icon : 'fa fa-th',
      title : 'Time field',
      min : 1,
      max : 1,
      aggFilter : 'date_histogram'
    } ])
  });
};
