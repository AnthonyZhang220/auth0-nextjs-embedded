"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const react_1 = require("@testing-library/react");
const domain = "";
const clientID = "";
describe("Hook Test", () => {
    test("login", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = (0, react_1.renderHook)(() => (0, src_1.useAuth0)({ domain, clientID }));
        expect(result.current.error).toBe(null);
    }));
    test("signup", () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = (0, react_1.renderHook)(() => (0, src_1.useAuth0)({ domain, clientID }));
        expect(result.current.error).toBe(null);
    }));
});
