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
exports.StudentRes = exports.StudentReq = exports.Avata = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class Avata {
    id;
    url;
    payload;
}
exports.Avata = Avata;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Avata ID (nullable)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({
        allowNaN: false,
        allowInfinity: false,
    }, { message: 'ID must be a valid number' }),
    __metadata("design:type", Object)
], Avata.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://avatars.githubusercontent.com/u/10000000?v=4',
        description: 'Avata URL (can be empty)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Avata.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'payload',
        description: 'Avata payload (can be empty)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Avata.prototype, "payload", void 0);
class StudentReq {
    name;
    email;
    school;
    parent_name;
    parent_phone;
    avata;
}
exports.StudentReq = StudentReq;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Nguyen Van A',
        description: 'Student name',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    __metadata("design:type", String)
], StudentReq.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'nva@gmail.com',
        description: `Student's email address. Must be unique.`,
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], StudentReq.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Dang Tran Con',
        description: `Student's school`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StudentReq.prototype, "school", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Ngo Thu Quynh',
        description: `Student's parent's name`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StudentReq.prototype, "parent_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '0909090909',
        description: `Student's parent's phone number`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StudentReq.prototype, "parent_phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Avata,
        description: `Student's avata`,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Avata),
    __metadata("design:type", Avata)
], StudentReq.prototype, "avata", void 0);
class StudentRes {
    id;
    name;
    email;
    school;
    parent_name;
    parent_phone;
    avata;
}
exports.StudentRes = StudentRes;
//# sourceMappingURL=dtos.js.map