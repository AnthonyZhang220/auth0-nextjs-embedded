"use client";

import { useState, useEffect, useCallback } from "react";
import Auth0Service from "../service/Auth0Service";
import type {
	Auth0Error,
	Auth0Result,
	Auth0ParseHashError,
	Auth0DecodedHash,
	Auth0UserProfile,
	LoginOptions,
	DbSignUpOptions,
	ChangePasswordOptions,
	CheckSessionOptions,
	ParseHashOptions,
	LogoutOptions,
} from "auth0-js";
import {
	Auth0Config,
	Auth0User,
	Auth0Hook,
	Auth0SocialProvider,
} from "../types";

const useAuth0 = (options: Auth0Config): Auth0Hook => {
	const [auth, setAuth] = useState<Auth0Service | null>(null);
	const [user, setUser] = useState<Auth0UserProfile | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [error, setError] = useState<Auth0Error | null>(null);

	const initAuth0 = useCallback(async () => {
		if (typeof window !== "undefined") {
			const authInstance = Auth0Service.getInstance();
			await authInstance.init(options);
			setAuth(authInstance);
			console.log("Auth0 Service Initialized on Client!");
		}
	}, [options]);

	const signupAndAuthorize = async (signUpForm: DbSignUpOptions) => {
		setIsLoading(true);

		auth?.auth0?.signupAndAuthorize(
			signUpForm,
			async (error: Auth0Error | null) => {
				if (error) {
					setError(error);
					return;
				}
			}
		);
		setIsLoading(false);
	};

	const signup = async (signUpForm: DbSignUpOptions) => {
		setIsLoading(true);
		// Handle signup logic
		auth?.auth0?.signup(signUpForm, async (error: Auth0Error | null) => {
			if (error) {
				setError(error);
				return;
			}
		});
		setIsLoading(false);
	};

	const loginWithSocialProvider = async (
		provider: Auth0SocialProvider | string
	) => {
		auth?.auth0?.authorize({ connection: provider });
	};

	const login = async (loginForm: LoginOptions) => {
		setIsLoading(true);
		// Handle login logic
		auth?.auth0?.login(
			loginForm,
			async (error: Auth0Error | null, user: Auth0UserProfile) => {
				if (error) {
					setError(error);
					return;
				}
				setUser(user);
			}
		);
		setIsLoading(false);
	};

	const logout = async (logoutOptions: LogoutOptions) => {
		setIsLoading(true);
		setIsAuthenticated(false);
		auth?.auth0?.logout(logoutOptions);
		setIsLoading(false);
	};

	const parseHash = async (
		hashOptions: ParseHashOptions | Record<string, never>
	) => {
		setIsLoading(true);
		// handle hash parsing logic
		auth?.auth0?.parseHash(
			hashOptions,
			(
				error: Auth0ParseHashError | null,
				authResult: Auth0DecodedHash | null
			) => {
				if (error) {
					setError(error);
					return;
				}

				if (authResult) {
					const { accessToken } = authResult;

					if (accessToken) {
						auth?.auth0?.client.userInfo(
							accessToken,
							async (error: Auth0Error | null, user: Auth0UserProfile) => {
								if (error) {
									setError(error);
								}
								setUser(user);
							}
						);
					}
				}
			}
		);
		setIsLoading(false);
	};

	const checkSession = async (checkSessionOptions: CheckSessionOptions) => {
		setIsLoading(true);
		//handle checksession logic
		auth?.auth0?.checkSession(
			checkSessionOptions,
			async (error: Auth0Error | null, authResult: Auth0Result) => {
				if (error) {
					setError(error);
				}

				if (authResult) {
					const { accessToken } = authResult;
					if (accessToken) {
						auth?.auth0?.client.userInfo(
							accessToken,
							async (error: Auth0Error | null, user: Auth0User) => {
								if (error) {
									setError(error);
								}
								setUser(user);
								setIsAuthenticated(true);
							}
						);
					}
				}
			}
		);
		setIsLoading(false);
	};

	const passwordReset = async (resetForm: ChangePasswordOptions) => {
		setIsLoading(true);
		auth?.auth0?.changePassword(
			resetForm,
			async (error: Auth0Error | null, res: string) => {
				if (error) {
					setError(error);
					return;
				}

				if (res) {
					setUser(user);
				}

				setIsLoading(false);
			}
		);
	};

	const handleAuthentication = async (
		checkSessionOptions: CheckSessionOptions
	) => {
		setIsLoading(true);
		auth?.auth0?.checkSession(
			checkSessionOptions,
			(error: Auth0Error | null, authRes: Auth0Result | null) => {
				if (error) {
					setError(error);
					setIsLoading(false);
				}

				if (authRes && authRes.accessToken) {
					auth?.auth0?.client.userInfo(
						authRes.accessToken,
						(error: Auth0Error | null, profile: Auth0User) => {
							if (error) {
								setError(error);
							}

							setUser(profile);
							setIsAuthenticated(true);
							setIsLoading(false);
						}
					);
				}
			}
		);
	};

	useEffect(() => {
		initAuth0();
	}, [initAuth0]);

	return {
		auth,
		user,
		signupAndAuthorize,
		signup,
		login,
		logout,
		passwordReset,
		isAuthenticated,
		isLoading,
		error,
		loginWithSocialProvider,
		parseHash,
		checkSession,
		handleAuthentication,
	};
};

export default useAuth0;
