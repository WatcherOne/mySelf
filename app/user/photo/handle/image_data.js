import imageSrc from './image_src.js'

function getImageURL(imageDataArr) {
  for (let i=0, j=imageDataArr.length; i < j; i++) {
    const singleImageData = imageDataArr[i];
    singleImageData.imageURL = require(`common/images/${singleImageData.fileName}`)
    imageDataArr[i] = singleImageData;
  }
  return imageDataArr;
}

export default getImageURL(imageSrc)