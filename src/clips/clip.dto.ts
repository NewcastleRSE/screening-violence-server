// data transfer object for a single clip ith language specific fields

export class ClipDto {
  _id: string;
  name: string;
  shortid: string;
  url: string;
  location: string;
  displayLocation: string;
  filmmaker: string;
  duration: number;
  tags: [string];
  thumbnail: string;
 description: string;
}
