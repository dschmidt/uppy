import { h } from 'preact'

import { UIPlugin } from '@uppy/core'
import { Provider } from '@uppy/companion-client'
import { ProviderViews } from '@uppy/provider-views'

import packageJson from '../package.json'
import locale from './locale.js'

export default class WebDAV extends UIPlugin {
  static VERSION = packageJson.version

  constructor (uppy, opts) {
    super(uppy, opts)
    this.id = this.opts.id || 'WebDAV'
    Provider.initPlugin(this, opts)
    this.icon = () => (
      <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 132.6422 93.377481" enable-background="new 0 0 196.6 72" xmlSpace="preserve" inkscape:version="0.92.3 (2405546, 2018-03-11)" sodipodi:docname="nextcloud-logo-inverted.svg" width="141.485" height="99.602654" inkscape:export-filename="nextcloud-logo-inverted.png" inkscape:export-xdpi="299.75104" inkscape:export-ydpi="299.75104"><metadata id="metadata20"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title /></cc:Work></rdf:RDF></metadata><defs id="defs18"><clipPath clipPathUnits="userSpaceOnUse" id="clipPath8812"><circle id="circle8814" cx="95.669289" cy="95.669296" r="79.724197" style="fill:#00080d;fill-opacity:1;stroke-width:1" /></clipPath></defs><sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1920" inkscape:window-height="1046" id="namedview16" showgrid="false" inkscape:zoom="2.8284271" inkscape:cx="41.308994" inkscape:cy="33.920203" inkscape:current-layer="Layer_1" fit-margin-top="10" fit-margin-left="10" fit-margin-right="10" fit-margin-bottom="10" inkscape:window-x="0" inkscape:window-y="34" inkscape:window-maximized="1" units="px" inkscape:snap-bbox="true" inkscape:bbox-paths="true" inkscape:bbox-nodes="true" inkscape:snap-bbox-edge-midpoints="true" inkscape:snap-bbox-midpoints="true" inkscape:snap-page="true" /><path inkscape:connector-curvature="0" id="path1052" d="m 66.407896,9.375 c -11.805271,0 -21.811217,8.003196 -24.912392,18.846621 -2.695245,-5.751517 -8.535934,-9.780938 -15.263394,-9.780938 -9.25185,0 -16.85711,7.605263 -16.85711,16.857108 0,9.251833 7.60526,16.860567 16.85711,16.860567 6.72746,0 12.568149,-4.031885 15.263395,-9.784412 3.101175,10.84425 13.10712,18.850106 24.912391,18.850106 11.717964,0 21.67289,-7.885111 24.853382,-18.607048 2.745036,5.621934 8.513436,9.541354 15.145342,9.541354 9.25185,0 16.86057,-7.608734 16.86057,-16.860567 0,-9.251845 -7.60872,-16.857108 -16.86057,-16.857108 -6.631906,0 -12.400306,3.916965 -15.145342,9.537891 C 88.080786,17.257475 78.12586,9.375 66.407896,9.375 Z m 0,9.895518 c 8.911648,0 16.030748,7.115653 16.030748,16.027273 0,8.911605 -7.1191,16.030737 -16.030748,16.030737 -8.911593,0 -16.027247,-7.119132 -16.027247,-16.030737 0,-8.91162 7.115653,-16.027271 16.027247,-16.027273 z M 26.23211,28.336202 c 3.90438,0 6.96505,3.057188 6.96505,6.961589 0,3.904386 -3.06067,6.965049 -6.96505,6.965049 -3.90439,0 -6.96161,-3.060663 -6.96161,-6.965049 0,-3.904401 3.05722,-6.961589 6.96161,-6.961589 z m 80.17451,0 c 3.90442,0 6.96506,3.057188 6.96506,6.961589 0,3.904386 -3.06066,6.965049 -6.96506,6.965049 -3.90436,0 -6.961576,-3.060663 -6.961576,-6.965049 0,-3.904401 3.057226,-6.961589 6.961576,-6.961589 z" style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;baseline-shift:baseline;text-anchor:start;white-space:normal;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill:#0082c9;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:5.56590033;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" inkscape:export-filename="Nextcloud Hub logo variants.png" inkscape:export-xdpi="300" inkscape:export-ydpi="300" /><path style="fill:#0082c9;fill-opacity:1;stroke-width:0.47038522" d="m 21.235693,69.043756 c -0.32926,0 -0.47147,0.187936 -0.47147,0.517242 V 83.20368 c 0,0.32927 0.14221,0.51495 0.47147,0.51495 h 0.37763 c 0.32927,0 0.51494,-0.18568 0.51494,-0.51495 V 71.874833 l 7.4473,11.557727 c 0.0324,0.0505 0.0677,0.0842 0.10299,0.12123 0.0106,0.0125 0.0179,0.0256 0.0298,0.0366 0.0317,0.0289 0.0665,0.044 0.10065,0.0618 0.019,0.01 0.0338,0.0247 0.055,0.032 0.0148,0.005 0.0304,0.002 0.0458,0.006 0.0525,0.0135 0.10618,0.0275 0.16936,0.0275 h 0.37534 c 0.32926,0 0.47146,-0.18567 0.47146,-0.51495 V 69.560768 c 0,-0.329305 -0.1422,-0.517241 -0.47146,-0.517241 h -0.37534 c -0.32929,0 -0.51724,0.187936 -0.51724,0.517241 V 80.89011 l -7.4473,-11.557716 c -0.0254,-0.03939 -0.0561,-0.06339 -0.0847,-0.0939 -0.086,-0.121611 -0.2222,-0.194545 -0.41654,-0.194545 z m 89.420157,0.187676 c -0.32926,0 -0.18767,0.187956 -0.18767,0.517241 v 4.657417 c 0,0.47037 0.0456,0.79872 0.0456,0.79872 h -0.0456 c 0,0 -0.89419,-2.06893 -3.38722,-2.06893 -2.72821,0 -4.65771,2.16372 -4.56357,5.36231 0,3.19862 1.74024,5.41041 4.51551,5.41041 2.68118,0 3.5749,-2.16508 3.5749,-2.16508 h 0.048 c 0,0 -0.0939,0.28283 -0.0939,0.65913 v 0.79874 c 0,0.32926 0.18796,0.47148 0.51726,0.47148 h 0.32955 c 0.32927,0 0.46917,-0.18798 0.46917,-0.51724 V 69.748673 c 0,-0.329285 -0.51754,-0.517241 -0.84681,-0.517241 z m -36.549859,0.0481 c -0.329276,0 -0.13961,0.187976 -0.13961,0.517241 V 81.32017 c 0,2.25783 1.503766,2.54039 2.350463,2.54039 0.376301,0 0.517217,-0.18796 0.517217,-0.51721 v -0.32958 c 0,-0.32926 -0.188212,-0.46918 -0.423394,-0.46918 -0.470405,-0.047 -1.080249,-0.18887 -1.080249,-1.50594 V 69.79677 c 0,-0.329266 -0.517531,-0.517241 -0.846807,-0.517241 z M 57.220266,70.50169 c -0.32927,0 -0.517238,0.187975 -0.517238,0.51724 v 2.44659 1.17638 5.31423 c 0,2.44599 1.365105,3.81064 3.622946,3.81064 0.42334,0 0.563011,-0.13993 0.563011,-0.46918 v -0.2838 c 0,-0.37629 -0.139671,-0.47024 -0.563011,-0.51724 -0.799652,-0.047 -2.258905,-0.32912 -2.258905,-2.72809 v -5.17464 h 2.117009 c 0.329268,0 0.517238,-0.1399 0.517238,-0.46918 v -0.1419 c 0,-0.32926 -0.18797,-0.51722 -0.517238,-0.51722 h -2.117009 v -2.44659 c 0,-0.329265 -0.139909,-0.51724 -0.469177,-0.51724 z m -18.734963,2.63427 c -2.82229,0 -5.08192,2.02359 -5.12888,5.41037 0,3.19859 2.35289,5.40809 5.41039,5.40809 1.646328,0 2.86852,-0.70495 3.432986,-1.12831 0.23526,-0.18814 0.283014,-0.42392 0.141896,-0.65912 l -0.141896,-0.23346 c -0.141115,-0.28223 -0.374612,-0.33005 -0.656846,-0.14188 -0.470383,0.37629 -1.413295,0.94064 -2.730371,0.94064 -2.116709,0 -3.951319,-1.50604 -3.998279,-4.14019 h 7.479331 c 0.282247,0 0.517238,-0.23501 0.517238,-0.51725 0,-2.9634 -1.550291,-4.93889 -4.325569,-4.93889 z m 29.223883,0 c -3.057482,0 -5.409203,2.25755 -5.456161,5.45614 0,3.1986 2.352896,5.41039 5.410387,5.41039 1.881541,0 3.151307,-0.89493 3.668718,-1.31828 0.235262,-0.2352 0.280729,-0.42265 0.139619,-0.7049 L 71.33213,81.79165 c -0.188136,-0.28225 -0.376902,-0.33005 -0.659131,-0.14191 -0.470383,0.42334 -1.457552,1.08255 -2.915751,1.08255 -2.257826,0 -4.046348,-1.69419 -4.046348,-4.14019 0,-2.49302 1.788522,-4.18596 4.046348,-4.18596 1.223008,0 2.115816,0.61137 2.58618,0.94065 0.282241,0.18807 0.516748,0.18838 0.704913,-0.0938 l 0.1419,-0.23572 c 0.235271,-0.28224 0.187125,-0.51677 -0.0481,-0.7049 -0.517422,-0.42337 -1.645515,-1.17638 -3.432986,-1.17638 z m 15.899301,0 c -3.010451,0 -5.456156,2.30482 -5.456156,5.36231 0,3.10451 2.445705,5.45615 5.456156,5.45615 3.010478,0 5.456168,-2.35164 5.456168,-5.45615 0,-3.05749 -2.44569,-5.36231 -5.456168,-5.36231 z m -30.429991,0.15793 c -0.11518,0.0184 -0.226037,0.0959 -0.331857,0.22197 l -1.904164,2.26805 -1.423546,1.69818 -2.158205,-2.57015 -1.169505,-1.39608 c -0.105876,-0.12611 -0.225795,-0.19525 -0.350163,-0.20597 -0.124354,-0.01 -0.253796,0.0361 -0.379919,0.14189 l -0.288371,0.24258 c -0.252223,0.21167 -0.23901,0.44583 -0.02745,0.69807 l 1.904166,2.26803 1.579172,1.88357 -2.311543,2.75326 c -0.0024,0.002 -0.0035,0.005 -0.0046,0.006 l -1.167215,1.38923 c -0.211653,0.25223 -0.188132,0.51842 0.06408,0.73009 l 0.288368,0.2403 c 0.252239,0.21164 0.481813,0.15841 0.693465,-0.0939 l 1.901876,-2.26806 1.425834,-1.69818 2.158204,2.57244 c 10e-4,0.002 0.0035,0.004 0.0046,0.005 l 1.164928,1.3915 c 0.211652,0.25223 0.477834,0.27337 0.730081,0.0617 l 0.288371,-0.2403 c 0.252237,-0.21165 0.239134,-0.44581 0.02746,-0.69805 l -1.904161,-2.27034 -1.579177,-1.88129 2.311546,-2.75554 c 0.0024,-0.002 0.0035,-0.004 0.0046,-0.006 l 1.167214,-1.38921 c 0.211651,-0.25224 0.188132,-0.51844 -0.06408,-0.73009 l -0.288371,-0.2403 c -0.126112,-0.10587 -0.246408,-0.14655 -0.361607,-0.12815 z m 38.662308,0.0779 c -0.32928,0 -0.47148,0.18796 -0.47148,0.51723 v 6.06722 c 0,2.6812 1.9757,3.99829 4.42169,3.99829 2.446,0 4.421696,-1.31709 4.421696,-3.99829 v -6.06723 c 0.047,-0.32926 -0.13991,-0.51723 -0.469176,-0.51723 h -0.37763 c -0.32927,0 -0.51724,0.18797 -0.51724,0.51723 v 5.69189 c 0,1.59931 -1.035,3.05766 -3.05765,3.05766 -1.9756,0 -3.05763,-1.45835 -3.05763,-3.05766 v -5.69189 c 0,-0.32926 -0.18797,-0.51723 -0.51726,-0.51723 z m -53.403561,0.94063 c 1.505226,0 2.82161,1.08155 2.915753,3.24531 h -6.490633 c 0.32927,-2.11674 1.83447,-3.24531 3.57488,-3.24531 z m 45.171244,0.0939 c 2.210809,0 3.998303,1.74023 3.998303,4.09214 0,2.44598 -1.787494,4.23401 -3.998303,4.23401 -2.210781,0 -3.999385,-1.83505 -4.046332,-4.23401 0,-2.30488 1.835551,-4.09214 4.046332,-4.09214 z m 23.566303,0 c 2.21082,0 3.29339,2.02346 3.29339,4.1402 0,2.9634 -1.60102,4.18595 -3.34144,4.18595 -1.92856,0 -3.24413,-1.6459 -3.29108,-4.18595 0,-2.63415 1.50465,-4.1402 3.33913,-4.1402 z" id="path1174" inkscape:connector-curvature="0" /></svg>
    )

    this.defaultLocale = locale

    this.i18nInit()
    this.title = 'WebDAV' // this.i18n('pluginNameWebdav')

    this.provider = new Provider(uppy, {
      companionUrl: this.opts.companionUrl,
      companionHeaders: this.opts.companionHeaders,
      companionKeysParams: this.opts.companionKeysParams,
      companionCookiesRule: this.opts.companionCookiesRule,
      provider: 'webdav',
      pluginId: this.id,
    })

    this.onFirstRender = this.onFirstRender.bind(this)
    this.render = this.render.bind(this)
  }

  install () {
    this.view = new ProviderViews(this, {
      provider: this.provider,
      viewType: 'list',
      showTitles: true,
      showFilter: true,
      showBreadcrumbs: true,
      authInputs: [
        {
          name: 'subdomain',
          label: 'WebDAV URL',
          description: 'Please provide a URL to a Nextcloud server.',
          serialize: (value) => new URL(value).host || value,
        },
      ],
    })

    const { target } = this.opts
    if (target) {
      this.mount(target, this)
    }
  }

  uninstall () {
    this.view.tearDown()
    this.unmount()
  }

  onFirstRender () {
    return Promise.all([
      this.provider.fetchPreAuthToken(),
      this.view.getFolder(),
    ])
  }

  render (state) {
    return this.view.render(state)
  }
}
