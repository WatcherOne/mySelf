import React from 'react'
import ReactDOM from 'react-dom'
import Header from 'user/header'
import SinglePhoto from 'common/single_photo'
import './index.scss'
import imageDatas from './handle/image_data.js'

const constant = {
  centerPos: {
    left: 0,
    right: 0
  },
  hPosRange: {   // 水平方向的取值范围
    leftSecX: [0,0],
    rightSecX: [0,0],
    y: [0,0]
  },
  vPosRange: {   // 垂直方向的取值范围
    x: [0,0],
    topY: [0,0]
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsArrangeArr: []
    };
  }

  // 获取区间内的随机值
  getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low)
  }

  // 重新布局所有图片，指定居中排布哪个图片
  rearrange(centerIndex) {
    const imgsArrangeArr = this.state.imgsArrangeArr,
          centerPos = constant.centerPos,
          hPosRange = constant.hPosRange,
          vPosRange = constant.vPosRange,
          hPosRangeLeftSecX = hPosRange.leftSecX,
          hPosRangeRightSecX = hPosRange.rightSecX,
          hPosRangeY = hPosRange.y,
          vPosRangeTopY = vPosRange.topY,
          vPosRangeX = vPosRange.x,
          topImgNum = Math.ceil(Math.random() * 2); // 取一个或者不取

    let imgsArrangeTopArr = [],
        topImgSpliceIndex = 0,
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

    // 居中操作
    imgsArrangeCenterArr[0].pos = centerPos;
    // 取出要布局上侧图片状态信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
    // 布局上部图片
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index].pos = {
        top: this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
      }
    })
    // 布局左右两侧图片
    for(let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLORX = null;
      // 前半部分布局左边, 右半部分布局右边
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX
      } else {
        hPosRangeLORX = hPosRangeRightSecX
      }
      imgsArrangeArr[i].pos = {
        top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        left: this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
      }
    }
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0])
    this.setState({ imgsArrangeArr })
  }

  // 组件加载以后，为每张图片计算其位置范围
  componentDidMount() {
    // 首先拿到舞台大小
    const stageDOM = ReactDOM.findDOMNode(this.refs.stage),
          stageW = stageDOM.scrollWidth,
          stageH = stageDOM.scrollHeight,
          halfStageW = Math.ceil(stageW/2),
          halfStageH = Math.ceil(stageH/2);
    // 拿到一个imgFigure大小
    const imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
          imgW = imgFigureDOM.scrollWidth,
          imgH = imgFigureDOM.scrollHeight,
          halfimgW = Math.ceil(imgW/2),
          halfimgH = Math.ceil(imgH/2);
    // 计算中心图片的位置点
    constant.centerPos = {
      left: halfStageW - halfimgW,
      top: halfStageH - halfimgH
    }
    // 计算左侧、右侧区域图片排布位置的取值范围
    constant.hPosRange.leftSecX[0] = - halfimgW
    constant.hPosRange.leftSecX[1] = halfStageW - halfimgW * 3
    constant.hPosRange.rightSecX[0] = halfStageW + halfimgW
    constant.hPosRange.rightSecX[1] = stageW - halfimgW
    constant.hPosRange.y[0] = - halfimgH
    constant.hPosRange.y[1] = stageH - halfimgH
    // 计算上侧区域图片排布位置的取值范围
    constant.vPosRange.topY[0] = - halfimgH
    constant.vPosRange.topY[1] = halfStageH - halfimgH * 3
    constant.vPosRange.x[0] = halfStageW - imgW
    constant.vPosRange.x[1] = halfStageW
    // 设置第一张图片居中
    this.rearrange(0);
  }

  render() {
    const imageFigures = [];
    const controllerUnits = [];
    imageDatas.forEach( (value, index) => {
      if (!this.state.imgsArrangeArr[index]) {
        // 初始化定位到左上角
        this.state.imgsArrangeArr[index] = {
          pos: { left: 0, top: 0 }
        }
      }
      imageFigures.push(<SinglePhoto data={value} key={index} ref={`imgFigure${index}`} arrange={this.state.imgsArrangeArr[index]}/>)
    })
    return (
      <div className='user-photo'>
        <Header selected='menu2'/>
        <section className='stage' ref='stage'>
          <section className='img-sec'>
            {imageFigures}
          </section>
          <nav className='controller-nav'>
            {controllerUnits}
          </nav>
        </section>
      </div>
    )
  }
}