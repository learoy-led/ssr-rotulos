import { Injectable } from '@angular/core';
import { PlatformService } from '../core/services/platform.service';

@Injectable({
  providedIn: 'root'
})
export class GoboStorageService {

   private dbName = 'rotulosLearoyDB';
  private storeName = 'goboFiles';

constructor(private platformService: PlatformService) {}

  private openDB(): Promise<IDBDatabase> {

    if (!this.platformService.isBrowser()) {
      return Promise.reject(
        new Error('IndexedDB solo está disponible en el navegador')
      );
    }

    return new Promise((resolve, reject) => {

      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };

      request.onsuccess = () => resolve(request.result);

      request.onerror = () => reject(request.error);
    });
  }


  async saveFile(key: string, file: File): Promise<void> {

    const db = await this.openDB();

    return new Promise((resolve, reject) => {

      const transaction = db.transaction(
        this.storeName,
        'readwrite'
      );

      const store = transaction.objectStore(this.storeName);

      store.put(file, key);

      transaction.oncomplete = () => resolve();

      transaction.onerror = () => reject(transaction.error);
    });
  }


  async getFile(key: string): Promise<File | undefined> {

    const db = await this.openDB();

    return new Promise((resolve, reject) => {

      const transaction = db.transaction(
        this.storeName,
        'readonly'
      );

      const store = transaction.objectStore(this.storeName);

      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);

      request.onerror = () => reject(request.error);
    });
  }

   async deleteFile(key: string): Promise<void> {

    const db = await this.openDB();

    return new Promise((resolve, reject) => {

      const transaction = db.transaction(
        this.storeName,
        'readwrite'
      );

      const store = transaction.objectStore(this.storeName);

      store.delete(key);

      transaction.oncomplete = () => resolve();

      transaction.onerror = () => reject(transaction.error);
    });
  }

}
