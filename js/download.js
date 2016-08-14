/*
* MDAT Calendar component
*
* Copyright (c) 2015 MIT Hyperstudio
* Christopher York, 08/2015
*
*/

var hg = require('mercury')
var h = require('mercury').h

const Chart = require('./chart')

const vdom = require('virtual-dom')

const svg_size = [1250, 515]

function Download() {
  return hg.state({})
}

Download.render = function(state, lang) {
  // TODO.  more performant to avoid creating DOM elements?
  let svg_vnode = Chart.render(state.chart, state.query, state.cube_data, svg_size, lang)
  let svg_elem = vdom.create(svg_vnode)
  let svg_xml = '<?xml version="1.0" standalone="no"?>\n' +
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + svg_size[0] +'" height="' + svg_size[1] + '">\n' +
        svg_elem.innerHTML +
        '</svg>'
  let svg_base64 = encodeURIComponent(window.btoa(svg_xml))

  return h('a.download', { download: 'cfrp-chart.svg', href: 'data:image/svg+xml;base64,' + svg_base64 },
    h('span.fa.fa-chevron-down'))

}

export default Download