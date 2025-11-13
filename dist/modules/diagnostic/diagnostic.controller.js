"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitDiagnostic = void 0;
const diagnostic_service_1 = require("./diagnostic.service");
const submitDiagnostic = async (req, res) => {
    try {
        const { correctAnswers } = req.body;
        const userId = req.user.sub;
        const result = await diagnostic_service_1.diagnosticService.saveResult(userId, correctAnswers);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.submitDiagnostic = submitDiagnostic;
