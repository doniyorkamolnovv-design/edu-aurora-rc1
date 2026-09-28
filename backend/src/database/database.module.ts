import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule], inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      const url = process.env.DATABASE_URL;
      const prod = process.env.NODE_ENV === 'production';
      return {
        type: 'postgres' as const,
        ...(url ? { url } : {
          host: config.get<string>('database.host'), port: config.get<number>('database.port'),
          username: config.get<string>('database.username'), password: config.get<string>('database.password'),
          database: config.get<string>('database.name'),
        }),
        autoLoadEntities: true,
        synchronize: process.env.DB_SYNCHRONIZE === 'true' || !prod,
        ssl: url && prod ? { rejectUnauthorized: false } : false,
      };
    },
  })],
})
export class DatabaseModule {}
