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
	isAuthenticated: boolean;
	user: Auth0User | null;
	isLoading: boolean;
	error: Auth0Error | null;
	signupAndAuthorize: (signUpForm: DbSignUpOptions) => Promise<void>;
	login: (loginForm: LoginOptions) => Promise<void>;
	loginWithSocialProvider: (provider: Auth0SocialProvider) => Promise<void>;
	logout: (logoutOptions: LogoutOptions) => Promise<void>;
	parseHash: (hashOptions: ParseHashOptions) => Promise<void>;
	passwordReset: (resetForm: ChangePasswordOptions) => Promise<void>;
	revalidate: (checkSessionForm: CheckSessionOptions) => Promise<void>;
	checkSession: (checkSessionForm: CheckSessionOptions) => Promise<void>;
}

export type Auth0SocialProvider = "google-oauth2" | "linkedin";
