import Auth0Service from "@/service/Auth0Service";
import type {
	Auth0Error,
	Auth0UserProfile,
	AuthOptions,
	ChangePasswordOptions,
	CheckSessionOptions,
	DbSignUpOptions,
	LoginOptions,
	LogoutOptions,
	ParseHashOptions,
} from "auth0-js";

export interface Auth0User extends Auth0UserProfile {}

export interface Auth0Config extends AuthOptions {}

export interface Auth0Hook {
	auth: Auth0Service | null;
	user: Auth0User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: Auth0Error | null;
	signupAndAuthorize: (signUpForm: DbSignUpOptions) => Promise<void>;
	signup: (signUpForm: DbSignUpOptions) => Promise<void>;
	login: (loginForm: LoginOptions) => Promise<void>;
	loginWithSocialProvider: (provider: Auth0SocialProvider) => Promise<void>;
	logout: (logoutOptions: LogoutOptions) => Promise<void>;
	parseHash: (hashOptions: ParseHashOptions) => Promise<void>;
	passwordReset: (resetForm: ChangePasswordOptions) => Promise<void>;
	checkSession: (checkSessionOptions: CheckSessionOptions) => Promise<void>;
	handleAuthentication: (hashOptions: ParseHashOptions) => Promise<void>;
}

export type Auth0SocialProvider = "google-oauth2" | "linkedin" | "windowslive" | "github" | "facebook" | "apple" | string;
