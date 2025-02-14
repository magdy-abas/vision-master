import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';
import { Iproduct } from '../interfaces/iproduct';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdctsService {
  private prodctsCollection = collection(this.firestore, 'prodcts');

  constructor(private firestore: Firestore, private storage: Storage) {}

  addProduct(
    product: Iproduct,
    mainImage: File,
    secondaryImages: File[]
  ): Observable<any> {
    const mainImageRef = ref(this.storage, `products/main/${mainImage.name}`);

    const mainImageTask = uploadBytes(mainImageRef, mainImage).then(
      (snapshot) => {
        return getDownloadURL(snapshot.ref);
      }
    );

    const secondaryImageTasks = secondaryImages.map((file) => {
      const secondaryImageRef = ref(
        this.storage,
        `products/secondary/${file.name}`
      );
      return uploadBytes(secondaryImageRef, file).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      });
    });

    return from(
      Promise.all([mainImageTask, ...secondaryImageTasks]).then(
        (downloadURLs) => {
          product.image = downloadURLs[0];
          product.secondaryImages = downloadURLs.slice(1);

          return addDoc(this.prodctsCollection, product);
        }
      )
    );
  }

  removeProduct(productId: string): Observable<void> {
    const docRef = doc(this.firestore, 'prodcts/' + productId);

    return from(
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const productData = docSnap.data() as Iproduct;

          const mainImageRef = ref(this.storage, productData.image);
          const mainImageDeleteTask = deleteObject(mainImageRef);

          const secondaryImageDeleteTasks = productData.secondaryImages.map(
            (imageUrl: string) => {
              const secondaryImageRef = ref(this.storage, imageUrl);
              return deleteObject(secondaryImageRef);
            }
          );

          return Promise.all([
            mainImageDeleteTask,
            ...secondaryImageDeleteTasks,
          ]).then(() => {
            return deleteDoc(docRef);
          });
        } else {
          throw new Error('Product not found');
        }
      })
    );
  }

  getprodcts(): Observable<Iproduct[]> {
    return collectionData(this.prodctsCollection, {
      idField: 'id',
    }) as Observable<Iproduct[]>;
  }

  getSpacificProduct(productId: string): Observable<Iproduct | undefined> {
    const docRef = doc(this.firestore, 'prodcts/' + productId);

    return from(
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          return docSnap.data() as Iproduct;
        } else {
          throw new Error('Product not found');
        }
      })
    );
  }
}
