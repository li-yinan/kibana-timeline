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
      name : 'Y-axis',
      title : 'Y-axis',
      min : 1,
      aggFilter : [ 'count', 'avg', 'sum', 'min', 'max', 'cardinality' ]
    }, {
      group : 'buckets',
      name : 'field',
      icon : 'fa fa-eye',
      title : 'field',
      mustBeFirst : true,
      min : 1,
      max : 1,
      aggFilter : 'terms'
    }])
  });
};
