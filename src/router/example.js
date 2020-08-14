import VideoImageConverter from "@/views/example/VideoImageConverter";
import GetVideoInfoInput from "@/views/example/GetVideoInfoInput/GetVideoInfoInput.vue";
const basename = "example";
const components = [VideoImageConverter, GetVideoInfoInput];
export default components.map(x => {
  return {
    path: `/${basename}/${x.name}`,
    name: `${x.name}`,
    component: x,
    develop: true
  };
});
