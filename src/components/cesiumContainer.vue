<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import { onMounted } from "vue"
import useViewer from "@/hooks/useViewer"
import use3Dtils from "@/hooks/use3DTiles"
import useJson from "@/hooks/useJson"
import useFenceng from "@/hooks/useFenceng"
import useHandler from "@/hooks/useHandler"
export default {
  name: "CesiumViewer",
  setup() {
    onMounted(() => {
      // 初始化viewer
      let viewer = useViewer();
      // 导入3dtiles模型
      let model = use3Dtils();
      viewer.scene.primitives.add(model);
      viewer.zoomTo(model);
      // 导入楼层的json信息
      let json = useJson();
      for (let i = 0; i < json.length; i++) {
        let floor = json[i];
        let id = floor.id;
        // 构造分层的实体
        useFenceng(viewer, id, 3.0, i);
			}
      // 控制鼠标点击事件
      useHandler(viewer);

    })
  },
};
</script>
<style>
  @import url('cesium/widgets.css');
  html,
  body,
  #cesiumContainer {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
