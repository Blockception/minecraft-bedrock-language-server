"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizationRegistry = void 0;
exports.createDefaultOptimizationRegistry = createDefaultOptimizationRegistry;
exports.traverseAndOptimize = traverseAndOptimize;
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const rules_1 = require("./rules");
/**
 * Creates and returns the default optimization registry with all built-in rules
 */
function createDefaultOptimizationRegistry() {
    const registry = new OptimizationRegistry();
    // Register all default categories
    registry.registerCategory((0, rules_1.createConstantFoldingCategory)());
    registry.registerCategory((0, rules_1.createIdentityOperationsCategory)());
    registry.registerCategory((0, rules_1.createConstantResultCategory)());
    registry.registerCategory((0, rules_1.createRedundantComparisonCategory)());
    registry.registerCategory((0, rules_1.createDoubleNegationCategory)());
    registry.registerCategory((0, rules_1.createRedundantUnaryCategory)());
    registry.registerCategory((0, rules_1.createConstantConditionCategory)());
    registry.registerCategory((0, rules_1.createSelfCancellationCategory)());
    registry.registerCategory((0, rules_1.createSelfDivisionCategory)());
    registry.registerCategory((0, rules_1.createDivisionByZeroCategory)());
    return registry;
}
/**
 * Registry of all optimization rules
 */
class OptimizationRegistry {
    categories = [];
    /**
     * Registers a new category of optimization rules
     */
    registerCategory(category) {
        this.categories.push(category);
    }
    /**
     * Gets all registered optimization rules across all categories
     */
    getAllRules() {
        return this.categories.flatMap((cat) => cat.rules);
    }
    /**
     * Gets all registered categories
     */
    getCategories() {
        return this.categories;
    }
    /**
     * Checks a node against all registered rules and reports diagnostics
     */
    checkNode(node, diagnoser) {
        for (const rule of this.getAllRules()) {
            let result = rule.getOptimizations(node);
            if (result == null)
                continue;
            if (!Array.isArray(result)) {
                result = [result];
            }
            for (const optimizedNode of result) {
                const data = optimizedNode.replacement !== undefined ? { replacement: optimizedNode.replacement } : undefined;
                diagnoser.add(node.position, optimizedNode.message, optimizedNode.severity ?? rule.severity, optimizedNode.code ?? rule.code, data);
            }
        }
    }
}
exports.OptimizationRegistry = OptimizationRegistry;
/**
 * Traverses an expression tree and applies optimization rules to each node
 */
function traverseAndOptimize(expression, registry, diagnoser) {
    (0, bc_minecraft_molang_1.walk)(expression, (node) => {
        registry.checkNode(node, diagnoser);
    });
}
//# sourceMappingURL=registry.js.map