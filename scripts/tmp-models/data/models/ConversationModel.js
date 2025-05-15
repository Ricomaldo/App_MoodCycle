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
var ConversationModel = function () {
    var _a;
    var _classSuper = watermelondb_1.Model;
    var _context_decorators;
    var _context_initializers = [];
    var _context_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _lastMessageDate_decorators;
    var _lastMessageDate_initializers = [];
    var _lastMessageDate_extraInitializers = [];
    var _messages_decorators;
    var _messages_initializers = [];
    var _messages_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(ConversationModel, _super);
            function ConversationModel() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.context = __runInitializers(_this, _context_initializers, void 0);
                _this.startDate = (__runInitializers(_this, _context_extraInitializers), __runInitializers(_this, _startDate_initializers, void 0));
                _this.lastMessageDate = (__runInitializers(_this, _startDate_extraInitializers), __runInitializers(_this, _lastMessageDate_initializers, void 0));
                _this.messages = (__runInitializers(_this, _lastMessageDate_extraInitializers), __runInitializers(_this, _messages_initializers, void 0));
                __runInitializers(_this, _messages_extraInitializers);
                return _this;
            }
            return ConversationModel;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _context_decorators = [(0, decorators_1.field)('context')];
            _startDate_decorators = [(0, decorators_1.date)('start_date')];
            _lastMessageDate_decorators = [(0, decorators_1.date)('last_message_date')];
            _messages_decorators = [(0, decorators_1.children)('messages')];
            __esDecorate(null, null, _context_decorators, { kind: "field", name: "context", static: false, private: false, access: { has: function (obj) { return "context" in obj; }, get: function (obj) { return obj.context; }, set: function (obj, value) { obj.context = value; } }, metadata: _metadata }, _context_initializers, _context_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _lastMessageDate_decorators, { kind: "field", name: "lastMessageDate", static: false, private: false, access: { has: function (obj) { return "lastMessageDate" in obj; }, get: function (obj) { return obj.lastMessageDate; }, set: function (obj, value) { obj.lastMessageDate = value; } }, metadata: _metadata }, _lastMessageDate_initializers, _lastMessageDate_extraInitializers);
            __esDecorate(null, null, _messages_decorators, { kind: "field", name: "messages", static: false, private: false, access: { has: function (obj) { return "messages" in obj; }, get: function (obj) { return obj.messages; }, set: function (obj, value) { obj.messages = value; } }, metadata: _metadata }, _messages_initializers, _messages_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.table = 'conversations',
        _a;
}();
exports.default = ConversationModel;
