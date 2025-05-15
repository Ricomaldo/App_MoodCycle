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
var DailyEntryModel = function () {
    var _a;
    var _classSuper = watermelondb_1.Model;
    var _cycle_decorators;
    var _cycle_initializers = [];
    var _cycle_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _mood_decorators;
    var _mood_initializers = [];
    var _mood_extraInitializers = [];
    var _symptoms_decorators;
    var _symptoms_initializers = [];
    var _symptoms_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _flow_decorators;
    var _flow_initializers = [];
    var _flow_extraInitializers = [];
    var _temperature_decorators;
    var _temperature_initializers = [];
    var _temperature_extraInitializers = [];
    var _cervicalMucus_decorators;
    var _cervicalMucus_initializers = [];
    var _cervicalMucus_extraInitializers = [];
    var _intercourse_decorators;
    var _intercourse_initializers = [];
    var _intercourse_extraInitializers = [];
    var _contraception_decorators;
    var _contraception_initializers = [];
    var _contraception_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(DailyEntryModel, _super);
            function DailyEntryModel() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.cycle = __runInitializers(_this, _cycle_initializers, void 0);
                _this.date = (__runInitializers(_this, _cycle_extraInitializers), __runInitializers(_this, _date_initializers, void 0));
                _this.mood = (__runInitializers(_this, _date_extraInitializers), __runInitializers(_this, _mood_initializers, void 0));
                _this.symptoms = (__runInitializers(_this, _mood_extraInitializers), __runInitializers(_this, _symptoms_initializers, void 0));
                _this.notes = (__runInitializers(_this, _symptoms_extraInitializers), __runInitializers(_this, _notes_initializers, void 0));
                _this.flow = (__runInitializers(_this, _notes_extraInitializers), __runInitializers(_this, _flow_initializers, void 0));
                _this.temperature = (__runInitializers(_this, _flow_extraInitializers), __runInitializers(_this, _temperature_initializers, void 0));
                _this.cervicalMucus = (__runInitializers(_this, _temperature_extraInitializers), __runInitializers(_this, _cervicalMucus_initializers, void 0));
                _this.intercourse = (__runInitializers(_this, _cervicalMucus_extraInitializers), __runInitializers(_this, _intercourse_initializers, void 0));
                _this.contraception = (__runInitializers(_this, _intercourse_extraInitializers), __runInitializers(_this, _contraception_initializers, void 0));
                __runInitializers(_this, _contraception_extraInitializers);
                return _this;
            }
            return DailyEntryModel;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _cycle_decorators = [(0, decorators_1.relation)('cycles', 'cycle_id')];
            _date_decorators = [(0, decorators_1.date)('date')];
            _mood_decorators = [(0, decorators_1.field)('mood')];
            _symptoms_decorators = [(0, decorators_1.json)('symptoms', function (json) { return json || []; })];
            _notes_decorators = [(0, decorators_1.field)('notes')];
            _flow_decorators = [(0, decorators_1.field)('flow')];
            _temperature_decorators = [(0, decorators_1.field)('temperature')];
            _cervicalMucus_decorators = [(0, decorators_1.field)('cervical_mucus')];
            _intercourse_decorators = [(0, decorators_1.field)('intercourse')];
            _contraception_decorators = [(0, decorators_1.field)('contraception')];
            __esDecorate(null, null, _cycle_decorators, { kind: "field", name: "cycle", static: false, private: false, access: { has: function (obj) { return "cycle" in obj; }, get: function (obj) { return obj.cycle; }, set: function (obj, value) { obj.cycle = value; } }, metadata: _metadata }, _cycle_initializers, _cycle_extraInitializers);
            __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
            __esDecorate(null, null, _mood_decorators, { kind: "field", name: "mood", static: false, private: false, access: { has: function (obj) { return "mood" in obj; }, get: function (obj) { return obj.mood; }, set: function (obj, value) { obj.mood = value; } }, metadata: _metadata }, _mood_initializers, _mood_extraInitializers);
            __esDecorate(null, null, _symptoms_decorators, { kind: "field", name: "symptoms", static: false, private: false, access: { has: function (obj) { return "symptoms" in obj; }, get: function (obj) { return obj.symptoms; }, set: function (obj, value) { obj.symptoms = value; } }, metadata: _metadata }, _symptoms_initializers, _symptoms_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, null, _flow_decorators, { kind: "field", name: "flow", static: false, private: false, access: { has: function (obj) { return "flow" in obj; }, get: function (obj) { return obj.flow; }, set: function (obj, value) { obj.flow = value; } }, metadata: _metadata }, _flow_initializers, _flow_extraInitializers);
            __esDecorate(null, null, _temperature_decorators, { kind: "field", name: "temperature", static: false, private: false, access: { has: function (obj) { return "temperature" in obj; }, get: function (obj) { return obj.temperature; }, set: function (obj, value) { obj.temperature = value; } }, metadata: _metadata }, _temperature_initializers, _temperature_extraInitializers);
            __esDecorate(null, null, _cervicalMucus_decorators, { kind: "field", name: "cervicalMucus", static: false, private: false, access: { has: function (obj) { return "cervicalMucus" in obj; }, get: function (obj) { return obj.cervicalMucus; }, set: function (obj, value) { obj.cervicalMucus = value; } }, metadata: _metadata }, _cervicalMucus_initializers, _cervicalMucus_extraInitializers);
            __esDecorate(null, null, _intercourse_decorators, { kind: "field", name: "intercourse", static: false, private: false, access: { has: function (obj) { return "intercourse" in obj; }, get: function (obj) { return obj.intercourse; }, set: function (obj, value) { obj.intercourse = value; } }, metadata: _metadata }, _intercourse_initializers, _intercourse_extraInitializers);
            __esDecorate(null, null, _contraception_decorators, { kind: "field", name: "contraception", static: false, private: false, access: { has: function (obj) { return "contraception" in obj; }, get: function (obj) { return obj.contraception; }, set: function (obj, value) { obj.contraception = value; } }, metadata: _metadata }, _contraception_initializers, _contraception_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.table = 'daily_entries',
        _a;
}();
exports.default = DailyEntryModel;
