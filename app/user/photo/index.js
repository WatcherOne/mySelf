import React from 'react'
import ReactDOM from 'react-dom'
import Header from 'user/header'
import imageDatas from './handle/image_data.js'
import SinglePhoto from 'common/single_photo'
import Controller from 'common/controller'
import './index.scss'

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
      imgsArrangeArr: [
        // {
        //   pos: { left: 0, top: 0 }, // 图片位置
        //   rotate: 0,                // 图片旋转角度
        //   isInverse: false          // 图片正负面，false正
        //   isCenter: false           // 图片是否居中，false不居中
        // }
      ]
    };
  }

  // 获取区间内的随机值
  getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low)
  }

  // 获取0-30度之间的任意正负值
  get30DegRangdom() {
    return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30)
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
          topImgNum = Math.floor(Math.random() * 2); // 取一个或者不取

    let imgsArrangeTopArr = [],
        topImgSpliceIndex = 0,
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

    // 居中 centerIndex 的图片，且不旋转
    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    }

    // 取出要布局上侧图片状态信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
    // 布局上部图片
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index] = {
        pos: {
          top: this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: this.get30DegRangdom(),
        isCenter: false
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
      imgsArrangeArr[i] = {
        pos: {
          top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: this.get30DegRangdom(),
        isCenter: false
      }
    }
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0])
    this.setState({ imgsArrangeArr })
  }

  /*
   * 翻转图片
   * @param index 输入当前被执行inverse操作的图片对应图片信息数组的index值
   * @return {function} 这是一个闭包函数，其内return一个真正被执行的函数
   */
  inverse(index) {
    return () => {
      const imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({ imgsArrangeArr })
    }
  }

  /*
   * 利用 rearrange函数，居中对应index的图片
   * @param index 需要被居中的图片对应的图片信息数组的index值
   * @return {function}
   */
  setCenter(index) {
    return () => {
      this.rearrange(index)
    }
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

  getImgData() {
    const imageFigures = []
    const controllerUnits = []
    imageDatas.forEach( (value, index) => {
      if (!this.state.imgsArrangeArr[index]) {
        // 初始化定位到左上角
        this.state.imgsArrangeArr[index] = {
          pos: { left: 0, top: 0 },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }
      imageFigures.push(<SinglePhoto key={index} data={value}
        ref={`imgFigure${index}`}
        arrange={this.state.imgsArrangeArr[index]}
        inverse={this.inverse(index)}
        setCenter={this.setCenter(index)}/>)
      controllerUnits.push(<Controller key={index}
        arrange={this.state.imgsArrangeArr[index]}
        inverse={this.inverse(index)}
        setCenter={this.setCenter(index)}/>)
    })
    return { imageFigures, controllerUnits }
  }

  render() {
    const { imageFigures, controllerUnits } = this.getImgData()
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