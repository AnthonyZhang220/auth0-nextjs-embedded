import { useAuth0 } from "../src";
import { renderHook } from "@testing-library/react";

const domain: string = "";
const clientID: string = "";

describe("Hook Test", () => {
	test("login", async () => {
		const { result } = renderHook(() => useAuth0({ domain, clientID }));
		expect(result.current.error).toBe(null);
	});

	test("signup", async () => {
		const { result } = renderHook(() => useAuth0({ domain, clientID }));
		expect(result.current.error).toBe(null);
	});
});
