import { HomeStore } from "@stores/home/HomeStore.ts";
import { RentalStore } from "@stores/rental/RentalStore.ts";
import { Stores } from "@stores/Stores.ts";

// @ts-ignore
const ASSET_BUCKET_URL = import.meta.env.VITE_ASSETS_BUCKET_URL;

// @ts-ignore
console.log(import.meta.env);

export class Context {
  private static _instance: Context | undefined;

  private _stores: Stores;

  constructor() {
    this._stores = {
      rental: new RentalStore([], [], [], [], {}, {}, {}, {}),
      home: new HomeStore([
        {
          id: 1,
          url: `${ASSET_BUCKET_URL}/photos/featured/IMG_9338.jpg`,
          alt: "",
          objectPosition: "center 75%",
        },
        {
          id: 2,
          url: `${ASSET_BUCKET_URL}/photos/featured/IMG_9341.jpg`,
          alt: "",
          objectPosition: "center 80%",
        },
        {
          id: 4,
          url: `${ASSET_BUCKET_URL}/photos/featured/IMG_9514.jpg`,
          alt: "",
          objectPosition: "center 75%",
        },
        {
          id: 5,
          url: `${ASSET_BUCKET_URL}/photos/featured/IMG_9525.jpg`,
          alt: "",
          objectPosition: "center 50%",
        },
        {
          id: 6,
          url: `${ASSET_BUCKET_URL}/photos/featured/IMG_1539.jpeg`,
          alt: "",
          objectPosition: "center 70%",
        },
        {
          id: 7,
          url: `${ASSET_BUCKET_URL}/photos/featured/IMG_1540.jpeg`,
          alt: "",
          objectPosition: "center 50%",
        },
        {
          id: 8,
          url: `${ASSET_BUCKET_URL}/photos/featured/IMG_1545.jpeg`,
          alt: "",
          objectPosition: "center 50%",
        },
        {
          id: 9,
          url: `${ASSET_BUCKET_URL}/photos/featured/IMG_1546.jpeg`,
          alt: "",
          objectPosition: "center 50%",
        },
        {
          id: 10,
          url: `${ASSET_BUCKET_URL}/photos/featured/IMG_1549.jpeg`,
          alt: "",
          objectPosition: "center 40%",
        },
        {
          id: 11,
          url: `${ASSET_BUCKET_URL}/photos/featured/IMG_1551.jpeg`,
          alt: "",
          objectPosition: "center 50%",
        },
      ]),
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
