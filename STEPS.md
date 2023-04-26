1 - Crear un proyecto de firebase

2 - Instalar firebase en el proyecto con npm i firebase

3 - Crear la colección en Firebase

4 - Crear el acceso a firestore

const db = getFirestore(app);

5 - Crear la referencia para consultar la base de datos

```js
export const usersCollectionReference = collection(db, 'users');
```
