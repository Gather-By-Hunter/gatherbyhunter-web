import { HomeStore } from "@stores/home/HomeStore.ts";
import { RentalStore } from "@stores/rental/RentalStore.ts";
import { Stores } from "@stores/Stores.ts";

export class Context {
  private static _instance: Context | undefined;

  private _stores: Stores;

  constructor() {
    this._stores = {
      rental: new RentalStore([], [], [], [], {}, {}, {}, {}),
      home: new HomeStore([]),
    };
  }

  public static get instance(): Context {
    if (!Context._instance) {
      Context._instance = new Context();
    }
    return Context._instance;
  }

  public stores(): Stores {
    return this._stores;
  }
}
