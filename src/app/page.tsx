"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth0 } from "..";

export default function Home() {
	const router = useRouter();
	const {
		auth,
		user,
		login,
		signupAndAuthorize,
		logout,
		isLoading,
		error,
		parseHash,
		checkSession,
		handleAuthentication,
	} = useAuth0({
		//replace with your domain from Auth0 dashboard
		domain: "dev-2r05j8sske6or34p.us.auth0.com",
		//replace with your clientID from Auth0 dashboard
		clientID: "RJ993Enlpcpd3nDrnS57mOPShUHUiCwt",
		redirectUri: "http://localhost:3000/",
		responseType: "token",
		scope: "openid profile email",
	});

	const [formData, setFormData] = useState({
		username: "",
		password: "",
		email: "",
	});

	// useEffect(() => {
	// 	handleAuthentication({});
	// }, [auth]);

	useEffect(()=>{
		console.log(window, auth)
	},[auth, typeof window])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		console.log(name, value);
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	if (error) {
		return (
			<div className="flex-col p-1">
				<h1 className="">{error?.description}</h1>
				<button onClick={() => router.back()}>Go back</button>
			</div>
		);
	}

	return (
		<div>
			{user && (
				<div>
					<h1>{user?.name}</h1>
				</div>
			)}
			<form className="flex-col">
				<div className="p-2">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
					/>
				</div>
				<div className="p-2">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<div className="p-2">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<button
					className="p-2"
					type="button"
					onClick={() =>
						login({ username: formData.email, password: formData.password })
					}
				>
					Login
				</button>
				<button
					type="button"
					onClick={() =>
						signupAndAuthorize({
							username: formData.username,
							password: formData.password,
							connection: "Username-Password-Authentication",
							email: formData.email,
						})
					}
				>
					Sign Up
				</button>
			</form>
			<div>
				<button type="button" onClick={() => logout({ returnTo: "/" })}>
					Logout
				</button>
			</div>
		</div>
	);
}
