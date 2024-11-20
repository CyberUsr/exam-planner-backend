import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global ValidationPipe with advanced options
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes unexpected properties from the request
      forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are included
      transform: true, // Automatically transforms payloads to DTO instances
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('University Database API')
    .setDescription('API documentation for the University Database System')
    .setVersion('1.0')
    .addBearerAuth() // Adds a Bearer token authentication option in Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start server
  const port = 3003; // Ensure we listen on the correct port
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api`);
}

bootstrap();
