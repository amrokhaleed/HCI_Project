import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  CVsLocation = 'CVs/';
  imagesLocation='Images';

  constructor(private storage: AngularFireStorage) {}

  uploadimage(file: File, filePath: string): Promise<string>{
    return new Promise<string>((resolve, reject) => {
      const pictureRef = this.storage.ref(this.imagesLocation + filePath);
      pictureRef.put(file).snapshotChanges().pipe(
        finalize(() => {
          pictureRef.getDownloadURL().subscribe(
            (url: string) => {
              resolve(url);
            },
            (error: any) => {
              reject(error);
            }
          );
        })
      ).subscribe();
    });
  }


  
  uploadFile(file: File, filePath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const pictureRef = this.storage.ref(this.CVsLocation + filePath);
      pictureRef.put(file).snapshotChanges().pipe(
        finalize(() => {
          pictureRef.getDownloadURL().subscribe(
            (url: string) => {
              resolve(url);
            },
            (error: any) => {
              reject(error);
            }
          );
        })
      ).subscribe();
    });
  }
}
