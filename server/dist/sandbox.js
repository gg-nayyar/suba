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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
function verifyAccessToken(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, node_fetch_1.default)(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
            const data = yield response.json();
            if (data.error_description) {
                throw new Error(`Error verifying access token: ${data.error_description}`);
            }
            // Token is valid, data will include information about the token
            return data;
        }
        catch (error) {
            console.error('Error verifying access token:', error);
            return null;
        }
    });
}
console.log(verifyAccessToken("ya29.a0AcM612z1BtA2Vb9HILd9jvoIQHpBX-2n75xqrg_-2AFvxE9xXV1fK4M0lVyXSH3YwES80UnU3e9b2n1iBp5zvvqiyJCz1c8JmOM8iX3KrHhhfuRm-JaRsD4_rI_ySzsMmoFOpk-XF1zlfvmLzCDrL8aThH4DvIhuuycaCgYKAZwSARMSFQHGX2Mi7tMTBa5JGzfD6bhStNS8Tg0170"));
