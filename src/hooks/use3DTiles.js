// import URL from '@/assets/model/tileset.json'
import { Cesium3DTileset } from 'cesium'
// import * as Cesium from 'cesium'
export default function(){
  // console.dir(URL)
  let model = new Cesium3DTileset({
    url: '/model/tileset.json',
    maximumScreenSpaceError:1,
  })
  return model
}