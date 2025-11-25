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
exports.AppService = exports.DataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let DataService = class DataService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getFormattedChartData() {
        const result = await this.dataSource.query("WITH Recursive emps AS (" +
            "SELECT id, name, description, manager_id, 1 AS level " +
            "FROM orgchart WHERE manager_id = 0 " +
            "UNION ALL " +
            "SELECT o.id, o.name, o.description, o.manager_id, e.level + 1 AS level " +
            "FROM orgchart o INNER JOIN emps e ON o.manager_id = e.id ) " +
            "SELECT id, name, description, manager_id, level " +
            "FROM emps ORDER BY level;");
        return result;
    }
    async deleteAssociatedRec(id) {
        await this.dataSource.query("DELETE FROM orgchart WHERE manager_id IN (" +
            "WITH Recursive emps AS (" +
            "SELECT id " +
            "FROM orgchart WHERE manager_id = " + id + " " +
            "UNION ALL " +
            "SELECT o.id " +
            "FROM orgchart o INNER JOIN emps e ON o.manager_id = e.id ) " +
            "SELECT id FROM emps)");
        await this.dataSource.query("DELETE FROM orgchart WHERE manager_id=" + id);
    }
};
exports.DataService = DataService;
exports.DataService = DataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], DataService);
class AppService {
    getHello() {
        return 'Hello World!';
    }
}
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map