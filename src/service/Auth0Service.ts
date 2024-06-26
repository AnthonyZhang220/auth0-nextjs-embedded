import { Auth0Config } from "../types";

class Auth0Service {
	private static instance: Auth0Service | null = null;

	private isBrowser = typeof window !== "undefined";
	public auth0?: import("auth0-js").WebAuth;

	private constructor() {}

	public static getInstance(): Auth0Service {
		if (!Auth0Service.instance) {
			Auth0Service.instance = new Auth0Service();
		}
		return Auth0Service.instance;
	}

	public init = async (options: Auth0Config) => {
		if (this.isBrowser) {
			try {
				const { WebAuth } = await import("auth0-js");
				this.auth0 = new WebAuth(options);
			} catch (error) {
				console.error("Error initializing Auth0:", error);
			}
		} else {
			console.warn("Auth0-js is not supported in a Node.js environment.");
		}
	};
}

export default Auth0Service;
