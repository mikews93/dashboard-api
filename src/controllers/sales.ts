import { sales } from "db/models/sales";
import { DefaultController } from "shared/utils/controllers";

export const salesController = new DefaultController("/sales", sales).server;
