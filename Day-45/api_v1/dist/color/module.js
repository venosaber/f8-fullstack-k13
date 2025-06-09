"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database.module");
const providers_1 = require("./providers");
const service_1 = require("./service");
const controller_1 = require("./controller");
let ColorModule = class ColorModule {
};
exports.ColorModule = ColorModule;
exports.ColorModule = ColorModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: [
            ...providers_1.colorProviders,
            service_1.ColorService,
        ],
        controllers: [controller_1.ColorController]
    })
], ColorModule);
//# sourceMappingURL=module.js.map