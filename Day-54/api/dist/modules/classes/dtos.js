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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassRes = exports.ClassReq = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ClassReq {
    name;
    code;
    users;
}
exports.ClassReq = ClassReq;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Class 1',
        description: 'Class name',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClassReq.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A001',
        description: 'Class code',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClassReq.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1, 2, 3],
        description: 'List of user IDs associated with the class',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.Min)(1, { each: true }),
    __metadata("design:type", Array)
], ClassReq.prototype, "users", void 0);
class ClassRes {
    id;
    name;
    code;
    users;
}
exports.ClassRes = ClassRes;
//# sourceMappingURL=dtos.js.map