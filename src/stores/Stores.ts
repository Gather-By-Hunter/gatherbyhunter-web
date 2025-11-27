import { RentalStore } from "./rental/index.ts";
import { HomeStore } from "./home/index.ts";

export interface Stores {
  rental: RentalStore;
  home: HomeStore;
}
