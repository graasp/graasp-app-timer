import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import { AppState } from '../../config/AppState';

const styles = theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
  },
});

export class ImageManager extends Component {
  state = AppState;

  handlePopoverOpen = (event) => {
    const val = event.currentTarget;
    this.setState({ anchorElCarotid: val });
  };

  handlePopoverClose = () => {
    this.setState({ anchorElCarotid: null });
  };

  handleHeartPopoverOpen = (event) => {
    const val = event.currentTarget;
    this.setState({ anchorElHeart: val });
  };

  handleHeartPopoverClose = () => {
    this.setState({ anchorElHeart: null });
  };

  handleSympateticPopoverOpen = (event) => {
    const val = event.currentTarget;
    this.setState({ anchorElSympatetic: val });
  };

  handleSympateticPopoverClose = () => {
    this.setState({ anchorElSympatetic: null });
  };

  handleParaSympaPopoverOpen = (event) => {
    const val = event.currentTarget;
    this.setState({ anchorElParaSympa: val });
  };

  handleParaSympaPopoverClose = () => {
    this.setState({ anchorElParaSympa: null });
  };

  handleHeringPopoverOpen = (event) => {
    const val = event.currentTarget;
    this.setState({ anchorElHering: val });
  };

  handleHeringPopoverClose = () => {
    this.setState({ anchorElHering: null });
  };

  handleBulbPopoverOpen = (event) => {
    const val = event.currentTarget;
    this.setState({ anchorElBulb: val });
  };

  handleBulbPopoverClose = () => {
    this.setState({ anchorElBulb: null });
  };

  handleSpinalPopoverOpen = (event) => {
    const val = event.currentTarget;
    this.setState({ anchorElSpinal: val });
  };

  handleSpinalPopoverClose = () => {
    this.setState({ anchorElSpinal: null });
  };

  render() {
    const {
      anchorElCarotid,
      anchorElHeart,
      anchorElSympatetic,
      anchorElParaSympa,
      anchorElHering,
      anchorElBulb,
      anchorElSpinal,
    } = this.state;
    const open = Boolean(anchorElCarotid);
    const openHeart = Boolean(anchorElHeart);
    const openSympatetic = Boolean(anchorElSympatetic);
    const openParaSympa = Boolean(anchorElParaSympa);
    const openHering = Boolean(anchorElHering);
    const openBulb = Boolean(anchorElBulb);
    const openSpinal = Boolean(anchorElSpinal);
    const {
      classes,
      showNerve,
      handleToggleNerveSection,
      t,
    } = this.props;

    return (
      <div className="Image-container">
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorElCarotid}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <h6>
            <b>
              {t('Carotid Sinus')}
              :
            </b>
            <br />
            {t('Carotid Sinus Role Explanation One')}
            <br />
            {t('Carotid Sinus Role Explanation Two')}
          </h6>
        </Popover>
        <Popover
          id="heart-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openHeart}
          anchorEl={anchorElHeart}
          anchorOrigin={{
            vertical: 'right',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handleHeartPopoverClose}
          disableRestoreFocus
        >
          <h6>
            <b>
              {t('Heart')}
              :
            </b>
            <br />
            {t('Heart Role Explanation One')}
            <br />
            {t('Heart Role Explanation Two')}
            <br />
            {t('Heart Role Explanation Three')}
          </h6>
        </Popover>
        <Popover
          id="sympathetic-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openSympatetic}
          anchorEl={anchorElSympatetic}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'middle',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handleSympateticPopoverClose}
          disableRestoreFocus
        >
          <h6>
            <b>
              {t('Sympathetic Nerve')}
              :
            </b>
            <br />
            {t('Sympathetic Nerve Role Explanation One')}
            <br />
            {t('Sympathetic Nerve Role Explanation Two')}
          </h6>
        </Popover>
        <Popover
          id="para-sympathetic-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openParaSympa}
          anchorEl={anchorElParaSympa}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handleParaSympaPopoverClose}
          disableRestoreFocus
        >
          <h6>
            <b>
              {t('Para Sympathetic Nerve')}
              :
            </b>
            <br />
            {t('ParaSympathetic Nerve Role Explanation One')}
            <br />
            {t('ParaSympathetic Nerve Role Explanation Two')}
          </h6>
        </Popover>
        <Popover
          id="hering-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openHering}
          anchorEl={anchorElHering}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handleHeringPopoverClose}
          disableRestoreFocus
        >
          <h6>
            <b>
              {t('Hering Nerve')}
              :
            </b>
            <br />
            {t('Hering Nerve Role Explanation One')}
            <br />
            {t('Hering Nerve Role Explanation Two')}
          </h6>
        </Popover>
        <Popover
          id="bulb-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openBulb}
          anchorEl={anchorElBulb}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handleBulbPopoverClose}
          disableRestoreFocus
        >
          <h6>
            <b>
              {t('Spinal Bulb')}
              :
            </b>
            <br />
            {t('Spinal Bulb Role Explanation One')}
            <br />
            {t('Spinal Bulb Role Explanation Two')}
          </h6>
        </Popover>
        <Popover
          id="spinal-cord-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openSpinal}
          anchorEl={anchorElSpinal}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handleSpinalPopoverClose}
          disableRestoreFocus
        >
          <h6>
            <b>
              {t('Spinal cord')}
              :
            </b>
            <br />
            {t('Spinal Cord Role Explanation One')}
            <br />
            {t('Spinal Cord Role Explanation Two')}
            <br />
            {t('Spinal Cord Role Explanation Three')}
          </h6>
        </Popover>
        <svg xmlns="http://www.w3.org/2000/svg" width="60%" height="100%" viewBox="285 131 758 562" version="1.1">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="y">
              <g id="regions" transform="translate(721.000000, 193.000000)" fill="#000000">
                <path
                  d="M204.390692,140.837642 C193.794802,130.413726 178.036316,132.288692 168.310526,143.873301 L164.50142,148.404468 L160.692314,143.873301 C150.98586,132.288692 135.208038,130.413726 124.612148,140.837642 C112.469413,152.801709 111.83134,174.274531 122.697927,187.243043 L160.112247,231.840441 C162.529192,234.719853 166.454312,234.719853 168.871258,231.840441 L206.285577,187.243043 C217.1715,174.274531 216.533427,152.801709 204.390692,140.837642 Z"
                  id="heart"
                  fillRule="nonzero"
                  className={showNerve ? 'heart heart-enable' : 'heart'}
                  aria-owns={open ? 'heart-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handleHeartPopoverOpen}
                  onMouseLeave={this.handleHeartPopoverClose}
                />
                <path
                  d="M185.471,139.46 C185.571,143.159 185.904,151.681 186.013,153.666 C182.5,151.167 167.501,136.166 164.834,131 C162.167,125.834 156.334,126 152.834,130 C149.334,134 133.03,151.226 121.849,154.28 C122.347,149.918 123.301,141.914 123.641,139.143 C130.587,139.719 145.667,120.833 147.667,109.166 C149.667,97.499 150.001,77.666 149.167,45.999 C153.5,42.666 156.167,39.166 165.167,47.832 C165.5,57.165 164.834,94.008 165.334,98.336 C165.834,102.664 169.941,122.421 185.471,139.46 Z"
                  id="heart-head"
                />
                <path
                  d="M189.25,90 C193.897,77.183 202.665,73.238 212.75,80 C223.75,87.375 234.286,97.849 241.398,108.109 C275.375,157.125 272.875,201.5 272,217.375 C271.181,232.247 265.333,257.167 253.5,244.25 C242.389,232.121 221.25,221.75 209.75,221.5 C198.25,221.25 197.36,216.236 194.75,211.5 C186.667,196.833 181.334,111.833 189.25,90 Z M101,83.25 C112.207,75.906 129.692,76.207 128.75,92.5 C127.5,114.125 119.836,162.477 120.25,175.5 C120.75,191.25 127.25,199.75 123.75,206.25 C120.25,212.75 116.498,211.506 108,211.75 C81.875,212.5 67.25,229.5 63.25,236 C59.25,242.5 53.437,243.267 50.5,237.75 C32,203 55.605,113 101,83.25 Z"
                  id="lung"
                  fillRule="nonzero"
                />
                <path
                  d="M255.667,80 C236.362,67.478 217.125,57.625 189.375,73.75 C186.75,59.875 190.668,6.667 191.334,0.667 C190.027,0.667 187.129,0.833 184,0.688 C183.978,5.688 181.071,62.459 180.562,68.563 C179.249,84.313 177.937,83.313 173.562,87.813 C175.812,71.25 181.625,27.563 181.143,0.507 C178.562,0.563 175.809,0.755 173.937,0.625 C174.666,22.75 165.166,74.5 164.083,95.167 C162.951,96.537 160.29,99.118 158.666,100.284 C143.25,77.75 138.196,26 135.917,2 C130.584,2 125.917,2 121.334,2 C121.584,23 125.251,54.333 128.786,75.284 C111,64.125 86.478,68.75 77,73.142 C62.115,80.04 42.385,94.689 27.656,116.066 C16.433,132.355 9.008,151.494 0.25,171.103 C3.5,178.353 8.75,183.422 10.75,184.172 C12.5,176.422 50.658,78.378 92.5,78.375 C121.667,78.373 131.76,96.051 133.25,104.513 C134.108,109.384 133.616,115.793 132.65,121.997 C135.416,122.666 142.5,124.75 145.583,129.916 C150.416,127.416 158,126.166 164.188,128.232 C167.986,122.856 171.271,120.189 173.185,122.897 C177.935,121.825 182.191,121.219 185.464,121.092 C185.521,119.114 185.499,117.25 184.374,115.875 C183.249,114.5 180.424,111.014 180.249,107 C179.999,101.25 186.711,94.352 196.808,87.25 C202.646,83.145 212.743,80.112 217.915,80.333 C233.5,81 256.485,94.725 270.346,109.698 C293.916,135.161 307.086,170.088 312.333,179.166 C316.333,175.166 318.332,170.666 320.332,163.999 C316.667,155 292.666,104 255.667,80 Z M140,82.333 L136.833,66.333 L141.583,83.833 L140,82.333 Z M144.333,96.417 C147.75,100 148.333,101.584 150.166,104.417 C147.75,104.417 145.833,99.667 144.333,96.417 Z M205.875,451.875 C197.375,438.75 177.5,412.875 174.625,409.125 C171.75,405.375 171.125,402.125 169.875,389.5 C168.625,376.875 171.089,361.284 171.5,355.5 C175.146,304.243 179.449,266.042 181.137,217.878 C176.417,218.698 167.75,217.375 164.262,215.836 C158,268.75 159.5,360.5 152.875,386.25 C148.75,377.75 151.5,254 145.863,209.025 C133.601,202.3 131.725,196.95 130.5,194.833 C129.125,195.041 127.521,194.213 126.548,193.599 C132.25,230.749 138,365.249 132.125,397.874 C129.731,411.166 127.875,417.124 116,437.749 C104.125,458.374 98.449,481.249 98.5,490.124 C98.519,493.412 101.295,494.515 104,494.749 C108,500.124 114,498.293 114.5,495.499 C117.085,481.055 135.222,446.017 136.375,443.999 C138.875,439.624 145.875,424.374 156.375,418.749 C170.125,426.499 183.25,444.374 191.625,457.874 C200,471.374 206.625,493.749 207.25,494.874 C207.875,495.999 209.75,497.124 214.375,495.124 C226,497.874 224.125,493.499 223,490.749 C221.875,487.999 214.375,465 205.875,451.875 Z"
                  id="grouped-organs"
                  fillRule="nonzero"
                />
                <path
                  d="M167,18.833 C169.334,19.333 173.253,20.429 171.461,34.515 C170.594,41.334 169.771,47.833 165.167,47.833 C162.163,45.199 157,39.666 149.167,46 C148.375,46.875 147.364,47.016 146.447,46.573 C143.697,45.245 141.625,40.292 141.5,32.167 C141.333,21.334 142.667,19.167 146.5,19.667 C147.833,22.167 148,24.834 151,25.334 C154,25.834 152.667,28.167 155.5,28.167 C158.333,28.167 157.582,26.5 160.291,26.167 C163,25.834 166.666,25.667 167,18.833 Z"
                  id="trach"
                />
              </g>
              <g id="cord" transform="translate(853.000000, 131.000000)" fill="#000000">
                <rect
                  id="Cord-left"
                  transform="translate(13.989828, 13.277775) rotate(-50.000000) translate(-13.989828, -13.277775) "
                  x="10.9898282"
                  y="-2.22222497"
                  width="6"
                  height="31"
                />
                <rect
                  id="Cord-right"
                  transform="translate(34.805707, 12.697709) rotate(50.000000) translate(-34.805707, -12.697709) "
                  x="31.805707"
                  y="-2.80229112"
                  width="6"
                  height="31"
                />
                <ellipse
                  id="Cord-node"
                  cx="24.5"
                  cy="32.5"
                  rx="10.5"
                  ry="15.5"
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handlePopoverOpen}
                  onMouseLeave={this.handlePopoverClose}
                />
                <polygon
                  id="Cord-tige"
                  points="21 45 28 45 28 163 21 156"
                />
              </g>
              <g id="bulbe" transform="translate(285.000000, 178.000000)" fill="#000000">
                <rect
                  id="Bulbe-tige"
                  x="63"
                  y="137"
                  width="20"
                  height="274"
                  aria-owns={open ? 'spinal-cord-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handleSpinalPopoverOpen}
                  onMouseLeave={this.handleSpinalPopoverClose}
                />
                <polygon
                  id="Bulbe-node"
                  points="73 78 91.0700738 101.147931 84.1679198 138.602069 61.8320802 138.602069 54.9299262 101.147931"
                  aria-owns={open ? 'bulb-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handleBulbPopoverOpen}
                  onMouseLeave={this.handleBulbPopoverClose}
                />
                <path
                  d="M13.144543,29.2260182 C23.464256,17.8265723 31.7043304,11.3244942 37.8647661,9.71978412 C41.3811017,8.8038263 56.7612146,-4.45065276 65.0110214,1.55550009 C68.1023554,3.80610115 70.3597135,9.27723304 71.7830957,17.9688958 L72.7830957,29.2260182 C72.260374,35.8867464 72.3232619,43.6673872 72.9717593,52.5679406 C73.2992944,57.0633221 73.4614021,63.092833 73.4580825,70.6564732 L73.4580723,70.6564732 C73.449798,89.508989 58.3079968,104.86296 39.4574212,105.133549 C39.4574212,105.133549 39.4574212,105.133549 39.4574212,105.133549 C29.7389556,105.273052 23.0817378,100.20279 18.7692877,97.3115778 C10.6911419,91.8957163 6.42292466,87.1620603 5.96463601,83.1106098 L5.96463763,83.1106096 C5.946703,82.9520604 5.90985943,82.7962271 5.85489277,82.6464334 C2.45681283,73.3860734 0.757772855,65.3633246 0.757772855,58.5781871 C0.757772855,51.7346074 4.88669622,41.9505511 13.144543,29.2260182 Z"
                  id="Bulbe-left"
                />
                <path
                  d="M84.3867701,29.2265056 C94.7064832,17.8270597 102.946558,11.3249817 109.106993,9.72027153 C112.623329,8.80431371 128.003442,-4.45016534 136.253249,1.55598751 C139.344583,3.80658857 141.601941,9.27772046 143.025323,17.9693832 L144.025323,29.2265056 C143.502601,35.8872338 143.565489,43.6678746 144.213986,52.568428 C144.541522,57.0638095 144.703629,63.0933204 144.70031,70.6569606 L144.700299,70.6569606 C144.692025,89.5094764 129.550224,104.863448 110.699648,105.134036 C110.699648,105.134036 110.699648,105.134036 110.699648,105.134036 C100.981183,105.273539 94.3239649,100.203277 90.0115148,97.3120652 C81.933369,91.8962037 77.6651518,87.1625477 77.2068632,83.1110972 L77.2068648,83.1110971 C77.1889301,82.9525479 77.1520866,82.7967145 77.0971199,82.6469208 C73.69904,73.3865608 72,65.363812 72,58.5786745 C72,51.7350948 76.1289234,41.9510385 84.3867701,29.2265056 Z"
                  id="Bulbe-right"
                  transform="translate(108.350180, 52.568428) scale(-1, 1) translate(-108.350180, -52.568428) "
                />
                <path
                  d="M32.2378108,113.057627 C39.0245148,108.509974 43.3857675,105.315526 45.3215688,103.474284 C48.7112732,100.250157 48.1665323,94.5513862 49.7559882,94.1350061 C56.9861901,92.240954 62.0146831,103.395417 64.8678845,105.567854 C68.3435908,108.214268 66.2283031,121.251632 59.6615646,127.639096 C58.3258682,128.938327 55.5371306,127.455529 51.2953517,123.190701 L32.2378108,113.057627 Z"
                  id="Bulbe-node-left"
                  transform="translate(49.381095, 111.006830) scale(-1, 1) rotate(62.000000) translate(-49.381095, -111.006830) "
                />
                <path
                  d="M79.9922168,113.209433 C86.7789207,108.66178 91.1401734,105.467332 93.0759747,103.62609 C96.4656791,100.401963 95.9209382,94.7031922 97.5103941,94.2868121 C104.740596,92.3927601 109.769089,103.547223 112.62229,105.71966 C116.097997,108.366074 113.982709,121.403438 107.415971,127.790902 C106.080274,129.090133 103.291537,127.607335 99.0497576,123.342507 L79.9922168,113.209433 Z"
                  id="Bulbe-node-right"
                  transform="translate(97.135501, 111.158636) rotate(62.000000) translate(-97.135501, -111.158636) "
                />
              </g>

              <g id="nerfs" transform="translate(367.000000, 164.000000)" stroke="#000000" strokeLinecap="square">
                { showNerve ? (
                  <path
                    d="M0,354.5 C58.3611069,326.381281 102.220033,312.554262 131.57678,313.01894 C139.172562,313.139171 145.797472,314.216185 151.451508,316.24998 C165.507964,321.306183 195.627428,329.546195 230.667286,338.064814 C293.531219,353.347807 372.23235,369.527545 402.427182,369.827807 C405.337815,369.856751 402.427182,369.360181 411.717364,369.827807 C495.487829,374.044437 536.117961,330.935168 533.607759,240.5"
                    id="Nerf-bottom-dashed"
                    strokeDasharray="10"
                  />
                )
                  : (
                    <path
                      d="M0,354.5 C73.4614954,319.105827 123.945331,306.355821 151.451508,316.24998 C190.726221,330.377361 355.40199,369.360181 402.427182,369.827807 C405.337815,369.856751 402.427182,369.360181 411.717364,369.827807 C495.487829,374.044437 536.117961,330.935168 533.607759,240.5"
                      id="Nerf-bottom"
                      className={showNerve ? 'pressure pressure-enable-nerf-bottom' : 'pressure'}
                      aria-owns={open ? 'heart-over-popover' : undefined}
                      aria-haspopup="true"
                      onMouseEnter={this.handleSympateticPopoverOpen}
                      onMouseLeave={this.handleSympateticPopoverClose}
                    />
                  )
                }
                <path
                  d="M6,144.667697 C78.3727655,167.882776 127.400481,173.703318 153.083145,162.129322 C210.598203,136.209931 237.427604,42.9124286 290.169964,30.4188092 C378.239534,9.55687407 449.571546,-0.418340872 504.166,0.493164386"
                  id="Nerf-top"
                  aria-owns={open ? 'hering-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handleHeringPopoverOpen}
                  onMouseLeave={this.handleHeringPopoverClose}
                />
                <path
                  d="M0,151 C55.6789905,172.110115 91.9312161,188.280617 108.756677,199.511509 C225.421418,277.384504 285.412144,327.511561 347.093554,336.112003 C403.507106,343.977931 449.967399,317.805424 475.346,247.00965 C480.927788,231.438777 485.756788,199.969584 489.833,152.602069"
                  id="Nerf-mid"
                  aria-owns={open ? 'para-sympathetic-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handleParaSympaPopoverOpen}
                  onMouseLeave={this.handleParaSympaPopoverClose}
                />
              </g>
              <g id="cut-solid" transform="translate(464.500000, 501.000000) scale(-1, 1) rotate(-115.000000) translate(-464.500000, -501.000000) translate(437.000000, 466.000000)" fill="#000000" fillRule="nonzero">
                <path
                  d="M34.1370209,35 L54.5681617,8.9953125 C55.1439461,8.2625 55.1439461,7.075 54.5681617,6.34375 C50.5413535,1.21875 44.0112947,1.21875 39.9844865,6.34375 L25.8034922,24.39375 L22.7514662,20.509375 C23.2805987,18.803125 23.5715601,16.9453125 23.5715601,15 C23.5715601,6.715625 18.2949682,0 11.7857801,0 C5.27659195,0 1.74464592e-15,6.715625 1.74464592e-15,15 C1.74464592e-15,23.284375 5.27659195,30 11.7857801,30 C12.3431492,30 12.8894692,29.95 13.4259678,29.8546875 L17.4687359,35 L13.4259678,40.1453125 C12.8894692,40.05 12.3419216,40 11.7857801,40 C5.27659195,40 0,46.715625 0,55 C0,63.284375 5.27659195,70 11.7857801,70 C18.2949682,70 23.5715601,63.284375 23.5715601,55 C23.5715601,53.0546875 23.2805987,51.196875 22.7514662,49.490625 L25.8034922,45.60625 L39.9844865,63.65625 C44.0112947,68.78125 50.5413535,68.78125 54.5681617,63.65625 C55.1439461,62.925 55.1439461,61.7375 54.5681617,61.0046875 L34.1370209,35 Z M11.7857801,20 C9.62014297,20 7.8571867,17.75625 7.8571867,15 C7.8571867,12.24375 9.62014297,10 11.7857801,10 C13.9514171,10 15.7143734,12.24375 15.7143734,15 C15.7143734,17.75625 13.9514171,20 11.7857801,20 Z M11.7857801,60 C9.62014297,60 7.8571867,57.75625 7.8571867,55 C7.8571867,52.24375 9.62014297,50 11.7857801,50 C13.9514171,50 15.7143734,52.24375 15.7143734,55 C15.7143734,57.75625 13.9514171,60 11.7857801,60 Z"
                  id="Shape"
                  onClick={handleToggleNerveSection}
                  className={showNerve ? 'scissors scissors-enable' : 'scissors'}
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

ImageManager.propTypes = {
  handleToggleNerveSection: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  showNerve: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  showNerve: state.layout.showNerve,
});

const ConnectedComponent = connect(mapStateToProps)(ImageManager);

const StyledComponent = withStyles(styles)(ConnectedComponent);

export default withTranslation()(StyledComponent);
