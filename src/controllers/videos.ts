import { videos } from "db/models/videos";
import { DefaultController } from "shared/utils/controllers";

export const videosController = new DefaultController("/videos", videos).server;
