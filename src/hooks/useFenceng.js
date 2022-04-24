import {
  Math,
  Color,
  Matrix3,
  Matrix4,
  Cartesian3,
  ClassificationPrimitive,
  GeometryInstance,
  BoxGeometry,
  PerInstanceColorAppearance,
  ColorGeometryInstanceAttribute,
  ShowGeometryInstanceAttribute,
  ClassificationType,
  HeadingPitchRoll,
  Transforms
} from 'cesium'
let hpr = []
const SIZE = {
  length: 50,
  width: 25,
  height: 3
};
const CENTER = new Cartesian3(
  -2292089.6274041295,
  5002485.121394477,
  3214420.6850761026
);
var modelMatrix = new Transforms.eastNorthUpToFixedFrame(CENTER);
var hprRotation = Matrix3.fromHeadingPitchRoll(
  new HeadingPitchRoll(Math.toRadians(-1), 0.0, 0.0)//水平方向的旋转角
);
export default function (viewer, floorID, height, i) {
  if(i == 0) {
    height = -1.1
  }else{
    height = 3.0
  }
  hpr[i] = Matrix4.fromRotationTranslation(
    hprRotation,
    new Cartesian3(0.0, 0.0, height) //楼层高度上的偏移
  );
  Matrix4.multiply(modelMatrix, hpr[i], modelMatrix);
  viewer.scene.primitives.add(
    new ClassificationPrimitive({
      geometryInstances: new GeometryInstance({
        geometry: BoxGeometry.fromDimensions({
          vertexFormat: PerInstanceColorAppearance.VERTEX_FORMAT,
          dimensions: new Cartesian3(SIZE.length, SIZE.width, SIZE.height),//长宽高
        }),
        modelMatrix: modelMatrix,
        attributes: {
          color: ColorGeometryInstanceAttribute.fromColor(
            new Color(0.0, 0.0, 0.0, 0.0)//设置高亮颜色
          ),
          show: new ShowGeometryInstanceAttribute(true),//设置初始化后是否显示
        },
        id: floorID,
      }),
      classificationType: ClassificationType.CESIUM_3D_TILE,//只绘制在3dtiles上
    })
  );
}