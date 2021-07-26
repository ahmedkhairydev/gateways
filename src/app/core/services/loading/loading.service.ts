import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = new BehaviorSubject<boolean>(false);
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() { }

  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function');
    }

    /*
      * - If loading is true, add the provided url to the loadingMap with a true value, set isLoading value to true
      * - If loading is false, remove the loadingMap entry and only when the map is empty will we set isLoading to false
    */
    if (loading) {
      this.loadingMap.set(url, loading);
      this.isLoading.next(true);
    } else if (!loading && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }

    if (!this.loadingMap.size) {
      this.isLoading.next(false);
    }
  }
}
