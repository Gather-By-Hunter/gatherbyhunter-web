export interface HomePhoto {
  id: number;
  url: string;
  alt: string;
}

export class HomeStore {
  private _featuredPhotos: HomePhoto[];

  constructor(featuredPhotos: HomePhoto[]) {
    this._featuredPhotos = featuredPhotos;
  }

  featuredPhotos() {
    return this._featuredPhotos;
  }
}
