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
exports.OrgChartController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orgchart_entity_1 = require("../entities/orgchart.entity");
const app_service_1 = require("../app.service");
let OrgChartController = class OrgChartController {
    orgChartRepository;
    dataService;
    constructor(orgChartRepository, dataService) {
        this.orgChartRepository = orgChartRepository;
        this.dataService = dataService;
    }
    async getFormattedData() {
        return await this.dataService.getFormattedChartData();
    }
    async getAllChart() {
        return await this.orgChartRepository.find();
    }
    async getChartById(id) {
        return await this.orgChartRepository.findOneBy({ id: id });
    }
    async deleteChart(id) {
        await this.orgChartRepository.delete(id);
        await this.dataService.deleteAssociatedRec(id);
    }
    async createChart(orgchart) {
        return await this.orgChartRepository.save(orgchart);
    }
    async updateChart(id, orgchart) {
        await this.orgChartRepository.update(id, orgchart);
        return await this.orgChartRepository.findOneBy({ id: id });
    }
};
exports.OrgChartController = OrgChartController;
__decorate([
    (0, common_1.Get)('data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrgChartController.prototype, "getFormattedData", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrgChartController.prototype, "getAllChart", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrgChartController.prototype, "getChartById", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrgChartController.prototype, "deleteChart", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orgchart_entity_1.OrgChart]),
    __metadata("design:returntype", Promise)
], OrgChartController.prototype, "createChart", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, orgchart_entity_1.OrgChart]),
    __metadata("design:returntype", Promise)
], OrgChartController.prototype, "updateChart", null);
exports.OrgChartController = OrgChartController = __decorate([
    (0, common_1.Controller)("orgchart"),
    __param(0, (0, typeorm_1.InjectRepository)(orgchart_entity_1.OrgChart)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        app_service_1.DataService])
], OrgChartController);
//# sourceMappingURL=orgchart.controller.js.map