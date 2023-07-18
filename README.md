# Next.js OpenJira App
Para correr local, se necesita la base de datos
```

docker-compose up -d
```

* El -d, significa __detached__
```
MongoDB Url local:
```
mongodb://localhost:27017/entriesdb

```
* npm install
* npm dev
```
## Configurar variables de entorno
Renombrar el archivo __.env.template__ a __.env__

## LLenar la base de datos con informacion de prueba

Llamara:
```http://localhost:3000/api/seed```