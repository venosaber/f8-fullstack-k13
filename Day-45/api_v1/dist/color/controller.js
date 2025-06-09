"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
const dto_1 = require("./dto");
let ColorController = class ColorController {
    colorService;
    constructor(colorService) {
        this.colorService = colorService;
    }
    getColor() {
        return this.colorService.getList();
    }
    createColor(createColorDto) {
        return this.colorService.create(createColorDto);
    }
    updateColor(id, updateColorDto) {
        return this.colorService.updateOne(id, updateColorDto);
    }
    deleteColor(id) {
        return this.colorService.softDelete(id);
    }
};
exports.ColorController = ColorController;
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "getColor", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateColorDto]),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "createColor", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateColorDto]),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "updateColor", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "deleteColor", null);
exports.ColorController = ColorController = __decorate([
    (0, common_1.Controller)('colors'),
    __metadata("design:paramtypes", [service_1.ColorService])
], ColorController);
//# sourceMappingURL=controller.js.map