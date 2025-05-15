"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
var watermelondb_1 = require("@nozbe/watermelondb");
var decorators_1 = require("@nozbe/watermelondb/decorators");
var CycleModel = function () {
    var _a;
    var _classSuper = watermelondb_1.Model;
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _phase_decorators;
    var _phase_initializers = [];
    var _phase_extraInitializers = [];
    var _averageLength_decorators;
    var _averageLength_initializers = [];
    var _averageLength_extraInitializers = [];
    var _isCurrent_decorators;
    var _isCurrent_initializers = [];
    var _isCurrent_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _entries_decorators;
    var _entries_initializers = [];
    var _entries_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(CycleModel, _super);
            function CycleModel() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.userId = __runInitializers(_this, _userId_initializers, void 0);
                _this.startDate = (__runInitializers(_this, _userId_extraInitializers), __runInitializers(_this, _startDate_initializers, void 0));
                _this.endDate = (__runInitializers(_this, _startDate_extraInitializers), __runInitializers(_this, _endDate_initializers, void 0));
                _this.phase = (__runInitializers(_this, _endDate_extraInitializers), __runInitializers(_this, _phase_initializers, void 0));
                _this.averageLength = (__runInitializers(_this, _phase_extraInitializers), __runInitializers(_this, _averageLength_initializers, void 0));
                _this.isCurrent = (__runInitializers(_this, _averageLength_extraInitializers), __runInitializers(_this, _isCurrent_initializers, void 0));
                _this.createdAt = (__runInitializers(_this, _isCurrent_extraInitializers), __runInitializers(_this, _createdAt_initializers, void 0));
                _this.updatedAt = (__runInitializers(_this, _createdAt_extraInitializers), __runInitializers(_this, _updatedAt_initializers, void 0));
                _this.entries = (__runInitializers(_this, _updatedAt_extraInitializers), __runInitializers(_this, _entries_initializers, void 0));
                __runInitializers(_this, _entries_extraInitializers);
                return _this;
            }
            return CycleModel;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _userId_decorators = [(0, decorators_1.field)('user_id')];
            _startDate_decorators = [(0, decorators_1.date)('start_date')];
            _endDate_decorators = [(0, decorators_1.date)('end_date')];
            _phase_decorators = [(0, decorators_1.field)('phase')];
            _averageLength_decorators = [(0, decorators_1.field)('average_length')];
            _isCurrent_decorators = [(0, decorators_1.field)('is_current')];
            _createdAt_decorators = [(0, decorators_1.date)('created_at')];
            _updatedAt_decorators = [(0, decorators_1.date)('updated_at')];
            _entries_decorators = [(0, decorators_1.children)('daily_entries')];
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            __esDecorate(null, null, _phase_decorators, { kind: "field", name: "phase", static: false, private: false, access: { has: function (obj) { return "phase" in obj; }, get: function (obj) { return obj.phase; }, set: function (obj, value) { obj.phase = value; } }, metadata: _metadata }, _phase_initializers, _phase_extraInitializers);
            __esDecorate(null, null, _averageLength_decorators, { kind: "field", name: "averageLength", static: false, private: false, access: { has: function (obj) { return "averageLength" in obj; }, get: function (obj) { return obj.averageLength; }, set: function (obj, value) { obj.averageLength = value; } }, metadata: _metadata }, _averageLength_initializers, _averageLength_extraInitializers);
            __esDecorate(null, null, _isCurrent_decorators, { kind: "field", name: "isCurrent", static: false, private: false, access: { has: function (obj) { return "isCurrent" in obj; }, get: function (obj) { return obj.isCurrent; }, set: function (obj, value) { obj.isCurrent = value; } }, metadata: _metadata }, _isCurrent_initializers, _isCurrent_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, null, _entries_decorators, { kind: "field", name: "entries", static: false, private: false, access: { has: function (obj) { return "entries" in obj; }, get: function (obj) { return obj.entries; }, set: function (obj, value) { obj.entries = value; } }, metadata: _metadata }, _entries_initializers, _entries_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.table = 'cycles',
        _a;
}();
exports.default = CycleModel;
