import {
  defined,
  ScreenSpaceEventType,
  ScreenSpaceEventHandler,
} from 'cesium'
var currentObjectId;
var currentPrimitive;
var currentColor;
var currentShow;
var attributes;
var visibility = 'hidden';
export default function (viewer) {
  var handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (click) {
    var pickedObject = viewer.scene.pick(click.position);
    if (defined(pickedObject) && defined(pickedObject.id)) {
      visibility = 'hidden';
      //判断鼠标点击的位置是不是上次点击的位置
      if (pickedObject.id === currentObjectId) {
        return;
      }
      //如果不是，则把上次位置的信息清除，包括高亮显示
      if (defined(currentObjectId)) {
        attributes = currentPrimitive.getGeometryInstanceAttributes(currentObjectId);
        attributes.color = currentColor;
        attributes.show = currentShow;
        currentObjectId = undefined;
        currentPrimitive = undefined;
        currentColor = undefined;
        currentShow = undefined;
      }
    }
    //判断是不是点到建筑物上
    if (
      defined(pickedObject) &&
      defined(pickedObject.primitive) &&
      defined(pickedObject.id) &&
      defined(pickedObject.primitive.getGeometryInstanceAttributes)
    ) {
      currentObjectId = pickedObject.id;
      // console.log(currentObjectId);
      currentPrimitive = pickedObject.primitive;
      attributes = currentPrimitive.getGeometryInstanceAttributes(currentObjectId);
      currentColor = attributes.color;
      currentShow = attributes.show;
      // if (inputs[1].checked) {
      if (true) {
        // let i = currentObjectId.substring(5) - 1;
        attributes.color = [255, 0, 0, 128];
        attributes.show = [1];
        // document.getElementById("id").innerText = currentObjectId;
        // document.getElementById("floor").innerText = excelData[i].floor;
        // document.getElementById("room").innerText = excelData[i].room;
        // document.getElementById("man").innerText = excelData[i].man;
        // document.getElementById("other").innerText = excelData[i].other;
        visibility = 'visible';
        // console.log(visibility);
      }
    } else if (defined(currentObjectId)) {
      attributes = currentPrimitive.getGeometryInstanceAttributes(currentObjectId);
      attributes.color = currentColor;
      attributes.show = currentShow;
      currentObjectId = undefined;
      currentPrimitive = undefined;
      currentColor = undefined;
      visibility = 'hidden';
    }
    // PopUp.style.visibility = visibility;

  }, ScreenSpaceEventType.LEFT_CLICK)
  return handler
}