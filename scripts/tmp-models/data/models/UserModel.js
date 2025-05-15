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
var UserModel = function () {
    var _a;
    var _classSuper = watermelondb_1.Model;
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _passwordHash_decorators;
    var _passwordHash_initializers = [];
    var _passwordHash_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _lastLogin_decorators;
    var _lastLogin_initializers = [];
    var _lastLogin_extraInitializers = [];
    var _profile_decorators;
    var _profile_initializers = [];
    var _profile_extraInitializers = [];
    var _preferences_decorators;
    var _preferences_initializers = [];
    var _preferences_extraInitializers = [];
    var _engagement_decorators;
    var _engagement_initializers = [];
    var _engagement_extraInitializers = [];
    var _cycles_decorators;
    var _cycles_initializers = [];
    var _cycles_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(UserModel, _super);
            function UserModel() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.email = __runInitializers(_this, _email_initializers, void 0);
                _this.passwordHash = (__runInitializers(_this, _email_extraInitializers), __runInitializers(_this, _passwordHash_initializers, void 0));
                _this.createdAt = (__runInitializers(_this, _passwordHash_extraInitializers), __runInitializers(_this, _createdAt_initializers, void 0));
                _this.lastLogin = (__runInitializers(_this, _createdAt_extraInitializers), __runInitializers(_this, _lastLogin_initializers, void 0));
                _this.profile = (__runInitializers(_this, _lastLogin_extraInitializers), __runInitializers(_this, _profile_initializers, void 0));
                _this.preferences = (__runInitializers(_this, _profile_extraInitializers), __runInitializers(_this, _preferences_initializers, void 0));
                _this.engagement = (__runInitializers(_this, _preferences_extraInitializers), __runInitializers(_this, _engagement_initializers, void 0));
                _this.cycles = (__runInitializers(_this, _engagement_extraInitializers), __runInitializers(_this, _cycles_initializers, void 0));
                __runInitializers(_this, _cycles_extraInitializers);
                return _this;
            }
            return UserModel;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _email_decorators = [(0, decorators_1.field)('email')];
            _passwordHash_decorators = [(0, decorators_1.field)('password_hash')];
            _createdAt_decorators = [(0, decorators_1.date)('created_at')];
            _lastLogin_decorators = [(0, decorators_1.date)('last_login')];
            _profile_decorators = [(0, decorators_1.json)('profile', function (json) { return json || {}; })];
            _preferences_decorators = [(0, decorators_1.json)('preferences', function (json) { return json || {}; })];
            _engagement_decorators = [(0, decorators_1.json)('engagement', function (json) { return json || {}; })];
            _cycles_decorators = [(0, decorators_1.children)('cycles')];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _passwordHash_decorators, { kind: "field", name: "passwordHash", static: false, private: false, access: { has: function (obj) { return "passwordHash" in obj; }, get: function (obj) { return obj.passwordHash; }, set: function (obj, value) { obj.passwordHash = value; } }, metadata: _metadata }, _passwordHash_initializers, _passwordHash_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _lastLogin_decorators, { kind: "field", name: "lastLogin", static: false, private: false, access: { has: function (obj) { return "lastLogin" in obj; }, get: function (obj) { return obj.lastLogin; }, set: function (obj, value) { obj.lastLogin = value; } }, metadata: _metadata }, _lastLogin_initializers, _lastLogin_extraInitializers);
            __esDecorate(null, null, _profile_decorators, { kind: "field", name: "profile", static: false, private: false, access: { has: function (obj) { return "profile" in obj; }, get: function (obj) { return obj.profile; }, set: function (obj, value) { obj.profile = value; } }, metadata: _metadata }, _profile_initializers, _profile_extraInitializers);
            __esDecorate(null, null, _preferences_decorators, { kind: "field", name: "preferences", static: false, private: false, access: { has: function (obj) { return "preferences" in obj; }, get: function (obj) { return obj.preferences; }, set: function (obj, value) { obj.preferences = value; } }, metadata: _metadata }, _preferences_initializers, _preferences_extraInitializers);
            __esDecorate(null, null, _engagement_decorators, { kind: "field", name: "engagement", static: false, private: false, access: { has: function (obj) { return "engagement" in obj; }, get: function (obj) { return obj.engagement; }, set: function (obj, value) { obj.engagement = value; } }, metadata: _metadata }, _engagement_initializers, _engagement_extraInitializers);
            __esDecorate(null, null, _cycles_decorators, { kind: "field", name: "cycles", static: false, private: false, access: { has: function (obj) { return "cycles" in obj; }, get: function (obj) { return obj.cycles; }, set: function (obj, value) { obj.cycles = value; } }, metadata: _metadata }, _cycles_initializers, _cycles_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.table = 'users',
        _a;
}();
exports.default = UserModel;
