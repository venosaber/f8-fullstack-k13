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
exports.ClassController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("./services");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("./dtos");
let ClassController = class ClassController {
    classService;
    constructor(classService) {
        this.classService = classService;
    }
    get() {
        return this.classService.get();
    }
    create(newClass) {
        return this.classService.create(newClass);
    }
    update(id, curClass) {
        return this.classService.update(id, curClass);
    }
    delete(id) {
        return this.classService.delete(id);
    }
};
exports.ClassController = ClassController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ClassController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ClassReq]),
    __metadata("design:returntype", dtos_1.ClassRes)
], ClassController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.ClassReq]),
    __metadata("design:returntype", dtos_1.ClassRes)
], ClassController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassController.prototype, "delete", null);
exports.ClassController = ClassController = __decorate([
    (0, swagger_1.ApiTags)('Class'),
    (0, common_1.Controller)('/classes'),
    __metadata("design:paramtypes", [services_1.ClassService])
], ClassController);
//# sourceMappingURL=controllers.js.map