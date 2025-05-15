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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.realmConfig = exports.Message = exports.Conversation = exports.WisdomItem = exports.Symptom = exports.DailyEntry = exports.Cycle = exports.User = void 0;
var realm_1 = __importDefault(require("realm"));
// Schéma User
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.schema = {
        name: 'User',
        primaryKey: 'id',
        properties: {
            id: 'string',
            email: 'string',
            name: 'string?',
            createdAt: 'date',
            updatedAt: 'date',
            preferences: 'mixed?',
            cycles: { type: 'linkingObjects', objectType: 'Cycle', property: 'user' },
        },
    };
    return User;
}(realm_1.default.Object));
exports.User = User;
// Schéma Cycle
var Cycle = /** @class */ (function (_super) {
    __extends(Cycle, _super);
    function Cycle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cycle.schema = {
        name: 'Cycle',
        primaryKey: 'id',
        properties: {
            id: 'string',
            startDate: 'date',
            endDate: 'date?',
            user: { type: 'linkingObjects', objectType: 'User', property: 'cycles' },
            dailyEntries: { type: 'linkingObjects', objectType: 'DailyEntry', property: 'cycle' },
            symptoms: { type: 'list', objectType: 'Symptom' },
            createdAt: 'date',
            updatedAt: 'date',
        },
    };
    return Cycle;
}(realm_1.default.Object));
exports.Cycle = Cycle;
// Schéma DailyEntry
var DailyEntry = /** @class */ (function (_super) {
    __extends(DailyEntry, _super);
    function DailyEntry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailyEntry.schema = {
        name: 'DailyEntry',
        primaryKey: 'id',
        properties: {
            id: 'string',
            date: 'date',
            mood: 'int?',
            notes: 'string?',
            cycle: { type: 'linkingObjects', objectType: 'Cycle', property: 'dailyEntries' },
            symptoms: { type: 'list', objectType: 'Symptom' },
            createdAt: 'date',
            updatedAt: 'date',
        },
    };
    return DailyEntry;
}(realm_1.default.Object));
exports.DailyEntry = DailyEntry;
// Schéma Symptom
var Symptom = /** @class */ (function (_super) {
    __extends(Symptom, _super);
    function Symptom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Symptom.schema = {
        name: 'Symptom',
        primaryKey: 'id',
        properties: {
            id: 'string',
            name: 'string',
            intensity: 'int?',
            notes: 'string?',
            cycle: { type: 'linkingObjects', objectType: 'Cycle', property: 'symptoms' },
            dailyEntry: { type: 'linkingObjects', objectType: 'DailyEntry', property: 'symptoms' },
            createdAt: 'date',
            updatedAt: 'date',
        },
    };
    return Symptom;
}(realm_1.default.Object));
exports.Symptom = Symptom;
// Schéma WisdomItem
var WisdomItem = /** @class */ (function (_super) {
    __extends(WisdomItem, _super);
    function WisdomItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WisdomItem.schema = {
        name: 'WisdomItem',
        primaryKey: 'id',
        properties: {
            id: 'string',
            title: 'string',
            content: 'string',
            category: 'string?',
            tags: 'string[]',
            createdAt: 'date',
            updatedAt: 'date',
        },
    };
    return WisdomItem;
}(realm_1.default.Object));
exports.WisdomItem = WisdomItem;
// Schéma Conversation
var Conversation = /** @class */ (function (_super) {
    __extends(Conversation, _super);
    function Conversation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Conversation.schema = {
        name: 'Conversation',
        primaryKey: 'id',
        properties: {
            id: 'string',
            messages: { type: 'list', objectType: 'Message' },
            createdAt: 'date',
            updatedAt: 'date',
        },
    };
    return Conversation;
}(realm_1.default.Object));
exports.Conversation = Conversation;
// Schéma Message
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message.schema = {
        name: 'Message',
        primaryKey: 'id',
        properties: {
            id: 'string',
            content: 'string',
            role: 'string',
            conversation: { type: 'linkingObjects', objectType: 'Conversation', property: 'messages' },
            createdAt: 'date',
        },
    };
    return Message;
}(realm_1.default.Object));
exports.Message = Message;
// Configuration de la base de données Realm
exports.realmConfig = {
    schema: [User, Cycle, DailyEntry, Symptom, WisdomItem, Conversation, Message],
    schemaVersion: 1,
    deleteRealmIfMigrationNeeded: true, // À utiliser uniquement en développement
};
