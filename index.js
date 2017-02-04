
export default function (kibana) {
  return new kibana.Plugin({
    name: 'G-Timeline',
    require: ['elasticsearch'],

    uiExports: {
      
      visTypes: ['plugins/G_Timeline/index']
    }

  });
};
