import { DataSource, type DataSourceOptions, type EntityTarget, type ObjectLiteral, type QueryRunner,Repository } from "typeorm";

export class DbConnection {
    public static instance: DbConnection;
    private client!: DataSource;
    private manager?: QueryRunner;

    constructor(
    ){}

    public static getInstance(): DbConnection{
        if(!this.instance){
            this.instance = new DbConnection();
        }
        return this.instance;
    }

    public async connect(config: DataSourceOptions){
        this.client = new DataSource(config);
        return this.client.initialize();
    }

    public getCollection<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T>{
        if(!this.client?.isInitialized){
            throw new Error("Database not connected.");
        }

        if (this.manager) {
            return this.manager.manager.getRepository(entity);
        }

        return this.client.getRepository(entity);
    }

    public async disconnect(): Promise<void>{
        if(this.client && this.client.isInitialized){
            this.client.destroy();
        }
    }
}