import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AppConfig from 'src/config/appConfig';
import DatabaseConfig from 'src/config/databaseConfig';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService<AppConfig>,
    private dbConfig: ConfigService<DatabaseConfig>,
  ) {}

  getHello(): string {
    let port = this.configService.get('PORT', { infer: true });
    let pw = this.dbConfig.get('DATABASE_PASSWORD', {
      infer: true,
    });
    let url = this.dbConfig.get('DB_URL', { infer: true });

    console.log(`PORT: ${port}`);
    console.log(`db url: ${url}`);
    console.log(`password: ${pw}`);

    return 'Hello World!';
  }
}
