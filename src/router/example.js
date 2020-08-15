import GetVideoInfoInput from "@/views/example/GetVideoInfoInput/GetVideoInfoInput.vue";
import Current from "@/views/example/Current.vue";
import VideoRegister from "@/views/example/VideoRegister";
const basename = "example";
const components = [Current, VideoRegister, GetVideoInfoInput];
export default components.map(x => {
  return {
    path: `/${basename}/${x.name}`,
    name: `${x.name}`,
    component: x,
    develop: true
  };
});
