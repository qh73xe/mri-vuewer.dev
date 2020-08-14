import VideoImageConverter from "@/views/example/VideoImageConverter";
import GetVideoInfoInput from "@/views/example/GetVideoInfoInput/GetVideoInfoInput.vue";
import Current from "@/views/example/Current.vue";
const basename = "example";
const components = [Current, VideoImageConverter, GetVideoInfoInput];
export default components.map(x => {
  return {
    path: `/${basename}/${x.name}`,
    name: `${x.name}`,
    component: x,
    develop: true
  };
});
