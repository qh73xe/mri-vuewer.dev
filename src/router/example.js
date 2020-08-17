import GetVideoInfoInput from "@/views/example/GetVideoInfoInput/GetVideoInfoInput.vue";
import Current from "@/views/example/Current.vue";
import VideoRegister from "@/views/example/VideoRegister";
import WindowCard from "@/views/example/WindowCard";

const basename = "example";
const components = [Current, VideoRegister, GetVideoInfoInput, WindowCard];
export default components.map(x => {
  return {
    path: `/${basename}/${x.name}`,
    name: `${x.name}`,
    component: x,
    develop: true
  };
});
