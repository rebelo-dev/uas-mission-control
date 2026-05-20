import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  /*app.enableCors({
     origin: (origin, callback) => {
       if (!origin) return callback(null, true);
 
       if (origin.includes("vercel.app") || origin === "http://localhost:5173") {
         return callback(null, true);
       }
 
       return callback(new Error("Not allowed by CORS"));
     },
     methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
   });*/
  app.enableCors({
    origin: (origin, callback) => {
      const currentOrigin = origin || "";

      if (!origin) {
        return callback(null, true);
      }

      if (currentOrigin.includes("vercel.app") || currentOrigin === "http://localhost:5173") {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
