import { Method } from 'axios';

export abstract class HttpFetchDto {
  abstract method: Method;

  abstract url: string;

  abstract paramsDto: any;

  abstract queryDto: any;

  abstract bodyDto: any;

  abstract responseDto: any;

  get interpolationUrl(): string {
    if (this.paramsDto) {
      Object.keys(this.paramsDto).forEach((key) => {
        this.url = this.url.replace(`:${key}`, this.paramsDto[key]);
      });
    }

    let queryString = '';
    if (this.queryDto) {
      queryString = Object.keys(this.queryDto)
        .map((key) => `${key}=${this.queryDto[key]}`)
        .join('&');
      queryString = `?${queryString}`;
    }

    return this.url + queryString;
  }
}
