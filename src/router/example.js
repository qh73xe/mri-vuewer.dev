import VideoImageConverter from "@/views/example/VideoImageConverter";
const basename = "example";
const components = [VideoImageConverter];
export default components.map(x => {
  return {
    path: `/${basename}/${x.name}`,
    name: `${x.name}`,
    component: x,
    develop: true
  };
});
