/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
export interface IRouteSchema {
    prefix: string;
}
export interface IDatabaseType {
    type: string;
    path: string;
    compatibility: string;
}

export interface IServerSchema {
    routes: IRouteSchema;
    dependencies: { nodeModules: boolean };
    databases: Array<IDatabaseType>;
}

export interface IPluginManifest {
    id: string;
    name: string;
    version: string;
    author: string;
    description?: string;
    server: IServerSchema;
}

export class Manifest {

    private _id: string;
    private _name: string;
    private _version: string;
    private _author: string;
    private _description: string;
    private _server: IServerSchema;
    private json: IPluginManifest;
    
	constructor(manifest: IPluginManifest) {
		this.json = manifest;
        this.id = manifest.id;
        this.version =  manifest.version;
        this.author = manifest.author;
        this.description = manifest.description;
        this.server = manifest.server;
	}

    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get version(): string {
        return this._version;
    }

    public set version(value: string) {
        this._version = value;
    }

    public get author(): string {
        return this._author;
    }

    public set author(value: string) {
        this._author = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get server(): IServerSchema {
		return this._server;
	}

	public set server(value: IServerSchema) {
		this._server = value;
	}

    public getDependencies() {
        return this.server.dependencies;
    }

    public validate() {
        //TODO: validate schema structure;
    }

    public static fromJSON(json: IPluginManifest | string): Manifest {
        if (typeof json === "string") {
            json = <IPluginManifest>JSON.parse(json);
        }
        return new Manifest(json);
    }
}