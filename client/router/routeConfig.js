import VideoNav from "./../components/video/VideoNav";
import { read } from "../api/api-media";

const routes = [
  {
    path: "/media/:mediaId",
    component: VideoNav,
    loadData: (params) => read(params),
  },
];

export default routes;
