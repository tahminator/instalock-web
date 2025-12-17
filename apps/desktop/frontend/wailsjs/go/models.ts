export namespace main {
	
	export class AuthenticatePayload {
	    url: string;
	
	    static createFrom(source: any = {}) {
	        return new AuthenticatePayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	    }
	}
	export class FindNamePayload {
	    puuid: string;
	
	    static createFrom(source: any = {}) {
	        return new FindNamePayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.puuid = source["puuid"];
	    }
	}
	export class FindRankPayload {
	    puuid: string;
	
	    static createFrom(source: any = {}) {
	        return new FindRankPayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.puuid = source["puuid"];
	    }
	}
	export class Response {
	    Ok: boolean;
	    Text: string;
	
	    static createFrom(source: any = {}) {
	        return new Response(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Ok = source["Ok"];
	        this.Text = source["Text"];
	    }
	}

}

