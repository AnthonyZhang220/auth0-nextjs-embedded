"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Auth0Service_1 = __importDefault(require("../service/Auth0Service"));
function useAuth0(options) {
    const [auth, setAuth] = (0, react_1.useState)(Auth0Service_1.default.getInstance());
    const [user, setUser] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [isAuthenticated, setIsAuthenticated] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const signupAndAuthorize = (signUpForm) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        setIsLoading(true);
        // Handle signup logic
        (_a = auth.auth0) === null || _a === void 0 ? void 0 : _a.signup(signUpForm, (error, result) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                setError(error);
                return;
            }
            yield login({
                username: signUpForm.email,
                password: signUpForm.password,
            });
        }));
        setIsLoading(false);
    });
    const loginWithSocialProvider = (provider) => __awaiter(this, void 0, void 0, function* () {
        var _b;
        (_b = auth.auth0) === null || _b === void 0 ? void 0 : _b.authorize({ connection: provider });
    });
    const login = (loginForm) => __awaiter(this, void 0, void 0, function* () {
        var _c;
        setIsLoading(true);
        // Handle login logic
        (_c = auth.auth0) === null || _c === void 0 ? void 0 : _c.login(loginForm, (error, user) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                setError(error);
                return;
            }
            setUser(user);
        }));
        setIsLoading(false);
    });
    const logout = (logoutOptions) => __awaiter(this, void 0, void 0, function* () {
        var _d;
        setIsLoading(true);
        setIsAuthenticated(false);
        (_d = auth.auth0) === null || _d === void 0 ? void 0 : _d.logout(logoutOptions);
        setIsLoading(false);
    });
    const parseHash = (hash) => __awaiter(this, void 0, void 0, function* () {
        var _e;
        setIsLoading(true);
        // handle hash parsing logic
        (_e = auth.auth0) === null || _e === void 0 ? void 0 : _e.parseHash(hash, (error, authResult) => {
            var _a;
            if (error) {
                setError(error);
                return;
            }
            if (authResult) {
                const { accessToken } = authResult;
                if (accessToken) {
                    (_a = auth.auth0) === null || _a === void 0 ? void 0 : _a.client.userInfo(accessToken, (error, user) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            setError(error);
                        }
                        setUser(user);
                    }));
                }
            }
        });
        setIsLoading(false);
    });
    const checkSession = (checkSessionForm) => __awaiter(this, void 0, void 0, function* () {
        var _f;
        //handle checksession logic
        (_f = auth.auth0) === null || _f === void 0 ? void 0 : _f.checkSession(checkSessionForm, (error, authResult) => __awaiter(this, void 0, void 0, function* () {
            var _g;
            if (error) {
                setError(error);
            }
            if (authResult) {
                const { accessToken } = authResult;
                if (accessToken) {
                    (_g = auth.auth0) === null || _g === void 0 ? void 0 : _g.client.userInfo(accessToken, (error, user) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            setError(error);
                        }
                        setUser(user);
                        setIsAuthenticated(true);
                    }));
                }
            }
        }));
    });
    const revalidate = (checkSessionForm) => __awaiter(this, void 0, void 0, function* () {
        var _h;
        setIsLoading(true);
        (_h = auth.auth0) === null || _h === void 0 ? void 0 : _h.checkSession(checkSessionForm, (error, authResult) => __awaiter(this, void 0, void 0, function* () {
            var _j;
            if (error) {
                setError(error);
            }
            if (authResult) {
                const { accessToken } = authResult;
                if (accessToken) {
                    (_j = auth.auth0) === null || _j === void 0 ? void 0 : _j.client.userInfo(accessToken, (error, user) => {
                        if (error) {
                            setError(error);
                        }
                        setUser(user);
                        setIsAuthenticated(true);
                    });
                }
            }
            setIsLoading(false);
        }));
    });
    const passwordReset = (resetForm) => __awaiter(this, void 0, void 0, function* () {
        var _k;
        setIsLoading(true);
        (_k = auth.auth0) === null || _k === void 0 ? void 0 : _k.changePassword(resetForm, (error, res) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                setError(error);
            }
            if (res) {
                setUser(user);
            }
            setIsLoading(false);
        }));
    });
    const initAuth0 = () => __awaiter(this, void 0, void 0, function* () {
        const auth = Auth0Service_1.default.getInstance();
        const Auth0Client = yield auth.init(options);
        setAuth(auth);
    });
    (0, react_1.useEffect)(() => {
        initAuth0();
        const handleAuthentication = () => {
            var _a;
            (_a = auth.auth0) === null || _a === void 0 ? void 0 : _a.parseHash((error, authRes) => {
                var _a;
                if (authRes && authRes.accessToken && authRes.idToken) {
                    (_a = auth === null || auth === void 0 ? void 0 : auth.auth0) === null || _a === void 0 ? void 0 : _a.client.userInfo(authRes.accessToken, (error, profile) => {
                        if (error) {
                            setError(error);
                        }
                        else {
                            setUser(profile);
                            setIsAuthenticated(true);
                        }
                        setIsLoading(false);
                    });
                }
                else if (error) {
                    setError(error);
                    setIsLoading(false);
                }
            });
        };
        if (window.location.hash && auth) {
            handleAuthentication();
        }
        return () => {
            handleAuthentication();
        };
    }, [typeof window]);
    return {
        user,
        signupAndAuthorize,
        login,
        logout,
        passwordReset,
        isAuthenticated,
        isLoading,
        error,
        loginWithSocialProvider,
        parseHash,
        revalidate,
        checkSession,
    };
}
exports.default = useAuth0;
